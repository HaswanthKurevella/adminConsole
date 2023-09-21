import React, { useState } from 'react';
import "./styles/TherapistReg.css";

const TherapistForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    qualification: ''
    // Add other fields here as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
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
      {/* Add other fields here */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default TherapistForm;