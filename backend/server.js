const mongoose = require('mongoose');
const express = require('express');

const app = express();  
const port = 5000;

const dbUrl = "mongodb+srv://munagalavamsi37:1234@cluster0.x3hwgmg.mongodb.net/?retryWrites=true&w=majority"
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(dbUrl, connectionParams)
    .then(() => {
        console.log('Connected to database ');
    }
    )
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    }
    )

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}
)
