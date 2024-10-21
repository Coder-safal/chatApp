import mongoose from "mongoose";
// import { connectDB } from "../db.js";
import {DB_NAME} from "../constant.js"

const connectDB = async () => {

    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    } catch (error) {
        console.log("Errors while connect Database!");
        throw error;

    }

}

export { connectDB };
