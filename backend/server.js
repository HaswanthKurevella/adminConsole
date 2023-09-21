const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Atlas connection string (replace with your connection string)
const dbURI = 'mongodb+srv://munagalavamsi37:1234@cluster0.x3hwgmg.mongodb.net/adminConsole?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

// Define a Mongoose schema and model (e.g., Therapist)
const therapistSchema = new mongoose.Schema({
  username: String,
  mobileNumber: String,
  email: String,
  password: String,
  qualification: String,
});

const Therapist = mongoose.model('Therapist', therapistSchema);


   

// API endpoint to handle therapist registration
app.post('/api/register', async (req, res) => {
  try {
    const newTherapist = new Therapist(req.body);
    await newTherapist.save();
    res.status(201).json({ message: 'Therapist registered successfully' });
  } catch (error) {
    console.error('Error registering therapist:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the Express server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

