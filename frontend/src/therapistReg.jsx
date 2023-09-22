import React, { useEffect, useState } from 'react';
import "./styles/TherapistReg.css";

const TherapistForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    qualification: '',
    photo: null
  });
  const [image, setImage] = useState("");

  const [allImage,setAllImage]=useState([]); // creating state

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        [name]: file
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const convertToBase64 = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
  
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        console.log(base64String);
        setImage(base64String);
      };
  
      reader.onerror = (error) => {
        console.error('Error converting image to base64:', error);
      };
  
      reader.readAsDataURL(file);
    }
  };

  useEffect(()=>{
    getImage()
  },[])
  function uploadImage() {
    fetch("http://localhost:5000/upload-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*", // Add the allowed origin here
      },
      body: JSON.stringify({
        base64: image
      })
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error uploading image:', error));
  }

  // to get image 
function getImage() {
  fetch("http://localhost:5000/get-image", { 
    method: "GET",
  })
  .then((res) => res.json())
  .then((data) => { 
    console.log(data);
    setAllImage(data.data);
  })
  .catch((error) => console.error('Error fetching image:', error));
}


  const handleSubmit = async (e) => {a
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/therapists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
      console.log('Therapist registered:', data);
    } catch (error) {
      console.error('Error registering therapist:', error);
    }
  };
  return (
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
          {image && <img width={100} height={100} src={`data:image/png;base64,${image}`} alt="Uploaded" />}
          <button type="button" onClick={uploadImage}>Upload</button>
          {allImage.map(data=>{
            return(
              <img width={100} height={100} src={`data:image/png;base64,${data.image}`}/>
            )
          })}
        
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TherapistForm;
