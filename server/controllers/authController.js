const db = require('../models');
const User = db.User;
const Token = db.Token;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const transporter = require('../utils/nodeMailer');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const JWT_RESET_PASSWORD_SECRET = process.env.JWT_RESET_PASSWORD_SECRET || 'your_reset_secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login request received:', { email, password });

    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }

    const user =  await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).send('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send('Invalid email or password');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    const data = {
      id: user.id,
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl
    };

    res.status(200).json({ message: 'Login successful', token, data });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Internal Server Error');
  }
};

const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    console.log('Signup request received:', req.body);

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      },
      token
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).send('Internal Server Error');
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Invalid email provided' });
    }

    const token = jwt.sign({ email }, JWT_RESET_PASSWORD_SECRET, { expiresIn: JWT_EXPIRES_IN });

    console.log(`Generated OTP: ${otp}`); // remove in production

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Forgot Your Password: E-commerce',
      text: `Your OTP is: ${otp}`
    });

    await Token.create({ userId: user.id, token, otp });

    res.status(200).json({
      message: `OTP sent to ${email}`,
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong ❌" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp, token } = req.body;

    const tokenData = await Token.findOne({ where: { token } });

    if (!tokenData) {
      return res.status(400).json({ message: "Invalid token" });
    }

    if (otp != tokenData.otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    res.status(200).json({ message: "OTP and token verified" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const {password, confirmPassword, token} = req.body
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const decoded = jwt.verify(token, JWT_RESET_PASSWORD_SECRET);
    const email = decoded.email;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await user.update({ password: hashedPassword });

    // Optionally delete token record after use
    await Token.destroy({ where: { token } });

    res.status(200).json({ message: 'Password changed successfully' });

  } catch (err) {
    console.error(err);
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    res.status(500).json({ message: 'Internal server error' });
  }
};


const uploadProfileImage = async (req, res) => {
  try {
    // Multer already populated this
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const { userId } = req.body; // Already validated by middleware
    const imageUrl = `uploads/profile/${req.file.filename}`;

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Invalid User' });
    }

    // Update imageUrl in DB
    await user.update({ imageUrl });

    res.status(200).json({
      message: 'Profile image uploaded successfully',
      data: {
        userId,
        imageUrl,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = {
  login,
  signup,
  forgotPassword,
  changePassword,
  verifyOtp,
  uploadProfileImage
};
