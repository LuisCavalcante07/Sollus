import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connect(){
    await mongoose.connect("mongodb://127.0.0.1:27017/sollus")
        .then(() => console.log("MongoDB conectado"))
        .catch(err => console.log(err));
}