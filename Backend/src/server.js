import { Server } from "socket.io";
import { createServer } from 'node:http';
import express from "express"


const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5017",
        methods: ["GET", "POST"]
    }
});

export const getReciverId = (reciverId) => {
    return users[reciverId];
}

const users = {};
io.on('connection', (socket) => {
    // console.log("New users is connected succesfully!!");
    const userId = socket.handshake.query?.userId;

    // console.log("userId:", socket.handshake.query.userId);
    users[userId] = socket.id;
    // console.log(users);
    io.emit("getOnline", Object.keys(users));//it's gives keys in array forms

    socket.on('disconnect', () => {
        // console.log(" disconnected succesfully!");
        delete users[userId];
        io.emit("getOnline", Object.keys(users));//it's gives keys in array forms
    })
})

export { io, app, server };