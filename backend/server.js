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
    
    app.post('/register/:name/:age/:mail',async (req,res)=>{
        const details=await db.collection('col1').insertOne(
            {
                name:req.params.name,
                age:req.params.age,
                mail:req.params.mail,
            }
        );
        res.json(details);
    });
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}
)

