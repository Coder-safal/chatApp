
import app from "./app.js";
import { server } from "./server.js";
import dotenv from "dotenv";
const PORT = process.env.PORT || 3000;
import { connectDB } from "./db/index.db.js";

dotenv.config(
    {
        path: "./.env"
    }
)

connectDB().then(() => {

    try {
        server.listen(PORT, () => {
            console.log(`Server is lisinning at port ${PORT}`);
        })

        app.on("error", (err) => {
            console.log("Applaction not able to talk with Database!");
            throw err;
        })

    } catch (error) {
        console.log("Error while connecting Database!");
        throw error;
    }
})



