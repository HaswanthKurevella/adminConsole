const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Feedback = require('./models/Feedback');
const app = express();
// Middleware
app.use(bodyParser.json());
app.use(cors());

const dbURI = 'mongodb+srv://munagalavamsi37:1234@cluster0.x3hwgmg.mongodb.net/adminConsole?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

require("./imagedetails");
const Images = mongoose.model("ImageDetails");

const therapistSchema = new mongoose.Schema({
  username: String,
  mobileNumber: String,
  email: String,
  password: String,
  qualification: String,
  photo: String
});

const Therapist = mongoose.model('Therapist', therapistSchema);

app.use(cors());
app.use(express.json());

app.post('/api/register', async (req, res) => {
  try {
    const { username, mobileNumber, email, password, qualification, photo } = req.body;

    const newTherapist = new Therapist({
      username,
      mobileNumber,
      email,
      password,
      qualification,
      photo,
    });
    await newTherapist.save();

    res.status(201).json({ message: 'Therapist registered successfully' });
  } catch (error) {
    console.error('Error registering therapist:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/get-feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({}, { _id: 0, title: 1, description: 1 });
    res.json({ success: true, data: feedbacks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/get-all-data", async (req, res) => {
  try {
    const data = await Therapist.find({});
    res.send({ status: "ok", data: data });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send({ status: "error", data: error.message });
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});