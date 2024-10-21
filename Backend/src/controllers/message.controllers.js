import { Message } from "../models/message.models.js";
import { User } from "../models/users.models.js";
import { Conversation } from "../models/conversation.models.js";
import { asyncHandler } from "../utills/AsyncHandlers.js";
import { ApiError } from "../utills/ApiErrors.js";
import { ApiResponse } from "../utills/ApiResponse.js";
import { io } from "../server.js";
import jwt from "jsonwebtoken";
import { isValidObjectId } from "mongoose";
import { getReciverId } from "../server.js";


const sendMessage = asyncHandler(async (req, res, next) => {

    const { reciverId } = req.params;
    const { message } = req.body;
    const senderId = req.user?._id;

    if (!message) {
        throw new ApiError(400, "message is required fields!");
    }

    if (!isValidObjectId(senderId) || !isValidObjectId(reciverId)) {
        throw new ApiError(400, "Invalid reciver or senderId");
    }

    const newMessage = await Message.create({
        senderId: senderId,
        reciverId: reciverId,
        message,
    });

    const allReadyExists = await Conversation.findOne({
        participants: { $all: [senderId, reciverId] }
    })

    if (!allReadyExists) {

        const createParticipants = await Conversation.create({
            participants: [senderId, reciverId],
            message: newMessage?._id
        });

    }
    else {
        allReadyExists.messages.push(newMessage?._id);

        await allReadyExists.save();
    }

    const ExistsReciver = getReciverId(reciverId);
    if (ExistsReciver) {
        io.to(ExistsReciver).emit("getMessage", newMessage);
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            "New message created succesfully!",
            newMessage,
        )
    )
})

const getAllMessage = asyncHandler(async (req, res, next) => {

    const { reciverId } = req.params;
    const senderId = req.user?._id;

    if (!isValidObjectId(senderId) || !isValidObjectId(reciverId)) {
        throw new ApiError(400, "Invalid reciver or senderId");
    }

    const findAllConversation = await Conversation.find({
        participants: { $all: [senderId, reciverId] }
    }).populate("messages");

    if (!findAllConversation) {
        throw new ApiError(401, "There is no conversation!");
    }

    console.log("All conversation: ", findAllConversation.length);

    return res.status(200).json(
        new ApiResponse(200,
            "All conversation fetch succesfully!",
            findAllConversation.length == 0 ? [] : findAllConversation
        )
    )


})


export {
    sendMessage,
    getAllMessage
}

