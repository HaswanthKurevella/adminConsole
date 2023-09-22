const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const TherapistModel = require("./therapist");
const app = express();
const bodyParser = require("body-parser");
const Feedback = require('./Feedback');
app.use(cors());
app.use(express.json());
const port = 8000;
const dbUrl =
  "mongodb+srv://munagalavamsi37:1234@cluster0.x3hwgmg.mongodb.net/adminConsole?retryWrites=true&w=majority";

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

app.post("/register", async (req, res) => {
  const { name, password } = req.body;
  try {
    const therapist = await TherapistModel.create({ name, password });
    res.status(200).json(therapist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/FbRecieved', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({}, { _id: 0, title: 1, description: 1 });
    res.json({ success: true, data: feedbacks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});




app.get("/", async (req, res) => {
  try {
    const therapists = await TherapistModel.find();
    res.status(200).json(therapists);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// app.post('/register',async (req,res)=>{
//     TherapistModel.create(req.body)
//     .then(therapists => res.json(therapists))
//     .catch(err => res.json('Error: ' + err));
// });
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
