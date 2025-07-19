import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/pages/admin/AdminSignup.css'

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      return setMessage('Please fill in all fields.');
    }

    if (password !== confirmPassword) {
      return setMessage('Passwords do not match.');
    }

    try {
      const res = await axios.post('/api/admin/signup', {
        name,
        email,
        password,
        role: 'admin'
      });

      setMessage('Admin registered successfully!');
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="admin-signup-container">
      <h2>Admin Signup</h2>
      {message && <p className="admin-message">{message}</p>}
      <form onSubmit={handleSubmit} className="admin-signup-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default AdminSignup;
