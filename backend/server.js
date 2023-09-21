import express from 'express';
import cors from 'cors';
import { db, connectToDB } from "./db.js";
const app = express();
app.use(express.json())
app.use(cors());
app.get('/', (req, res) => {
    res.send("server running successfully")
})
connectToDB(() => {
    app.listen(8000, () => {
        console.log("server Running At Port 8000")
    })
})