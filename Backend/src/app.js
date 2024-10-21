
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app } from "./server.js";

// const app = express();
app.use(cors(
    // {
    //     origin: "*",
    //     credentials: true,
    // }
))
app.use(cookieParser());

app.use(express.urlencoded({ limit: "16kb", extended: true }))
app.use(express.json({ limit: "16kb" }));

app.use(express.static("public"));


// Router
import userRouter from "./routers/user.routers.js"

app.use("/api/v1", userRouter);

// message Router
import messageRouter from "./routers/message.routers.js";
import { server } from "./server.js";
app.use("/api/v1", messageRouter);

// last ma rakhene
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        message: err.message || 'An errors occurs',
        statusCode: err.statusCode || 500,
        data: null,
    })
});
export default app;