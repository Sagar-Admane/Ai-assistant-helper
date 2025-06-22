import mongoose from "mongoose"
import env from "dotenv"
env.config();
const MONGO_URI = process.env.MONGO; 

function connectDb(){
    const conn = mongoose.connect(MONGO_URI!);
    if(!conn){
        console.log("Unable to connect to mongodb");
    } else {
        console.log("Connected to DB");
    }
}

export default connectDb;