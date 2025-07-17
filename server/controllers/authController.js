// const { User } = require('../models/User');
const db = require('../models');
const User = db.User; // Ensure User model is imported correctly
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Replace with your secret key (keep it safe!)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login request received:', { email , password});

    
    
    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).send('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send('Invalid email or password');
    }

    //Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email }, // payload
      JWT_SECRET,
      { expiresIn: '1h' } // token expires in 1 hour
    );
    const data = {
      id: user.id,
      name: user.name,
      email: user.email
    }
    res.status(200).json({ message: 'Login successful', token, data});
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Internal Server Error');
  }
};

const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    console.log('Signup request received:', req.body);

    if (!email || !password || !name) {
      return res.status(400).send('Email, password, and name are required');
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).send('User already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({ email, password: hashedPassword, name });

    res.status(201).send('User created successfully');  
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  login,
  signup
};
