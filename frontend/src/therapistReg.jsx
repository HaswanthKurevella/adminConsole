import React, { useState } from 'react';
import axios from 'axios';

const TherapiReg = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    qualification: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
  });

  const [passwordMatch, setPasswordMatch] = useState(true); // State to track password matching

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    try {
      // Send the form data to your server, which will save it to MongoDB Atlas
      await axios.post('http://localhost:8000/api/register', formData);

      // Clear the form after successful registration
      setFormData({
        username: '',
        email: '',
        qualification: '',
        password: '',
        confirmPassword: '',
        mobileNumber: '',
      });

      // Reset password matching state
      setPasswordMatch(true);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="registration-form">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="qualification">Qualification:</label>
          <input
            type="text"
            id="qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        {!passwordMatch && (
          <p className="error">Password and confirm password do not match.</p>
        )}
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default TherapiReg;
