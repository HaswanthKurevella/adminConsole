import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./styles/TherapistReg.css";

const FbReceived = () => {
  const [feedbackData, setFeedbackData] = useState([]);
//   const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch feedback data from the server
    axios.get('http://localhost:8000/api/FbRecieved') // Removed the full URL, use relative path
      .then((response) => {
        setFeedbackData(response.data.data);
      })
      .catch((error) => {
        setError(error); // Store the error
      });
  }, []);

//   if (error) {
//     return <div>Error fetching feedback: {error.message}</div>;
//   }

  return (
    <div>
      <h1>Received Feedbacks</h1>
      <table className="feedback-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {feedbackData.map((feedback, index) => (
            <tr key={index}>
              <td>{feedback.title}</td>
              <td>{feedback.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FbReceived;
