import React, { useState } from 'react';
import "./styles/TherapistReg.css";
import axios from 'axios';

const TherapistReg = () => {
  const [formData, setFormData] = useState({
    username: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    qualification: '',
    photo: null
  });

  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const convertToBase64 = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        setFormData({ ...formData, photo: base64String });
      };

      reader.onerror = (error) => {
        console.error('Error converting image to base64:', error);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/register', formData);

      setFormData({
        username: '',
        email: '',
        qualification: '',
        password: '',
        confirmPassword: '',
        mobileNumber: '',
        photo: null
      });

      setPasswordMatch(true);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="therapist-form">
        <div className="column">
          <div>
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
          <div>
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
          <div>
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
        </div>
        <div className="column">
          <div>
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
          <div>
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
          <div>
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
        </div>
        <div className="column">
          <div>
            <label htmlFor="photo">Upload Photo:</label>
            <br />
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={convertToBase64}
            />
            {formData.photo && <img width={100} height={100} src={`data:image/png;base64,${formData.photo}`} alt="Uploaded" />}
          </div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default TherapistReg;