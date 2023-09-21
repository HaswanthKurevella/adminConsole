import { MongoClient } from "mongodb";
let db;
async function connectToDB(cb) {
    const url = "mongodb+srv://munagalavamsi37:1234@cluster0.x3hwgmg.mongodb.net/?retryWrites=true&w=majority"
    const client = new MongoClient(url);
    await client.connect();
    db = client.db('tms')
    cb();
}
export { db, connectToDB };