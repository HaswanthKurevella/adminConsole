const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();  
const port = 5000;

const dbUrl = "mongodb+srv://munagalavamsi37:1234@cluster0.x3hwgmg.mongodb.net/?retryWrites=true&w=majority";
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

require("./imagedetails");
const Images = mongoose.model("ImageDetails");

app.use(cors());
app.use(express.json());

app.post("/upload-image", async (req, res) => {
  const { base64 } = req.body;
  try {
    await Images.create({ image: base64 });
    res.send({ Status: "ok" });
  } catch (error) {
    res.status(500).send({ Status: "error", data: error });
  }
});

app.get("/get-image", async (req, res) => {
  try {
    const data = await Images.find({});
    res.send({ status: "ok", data: data });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).send({ status: "error", data: error.message });
  }
});


mongoose.connect(dbUrl, connectionParams)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
