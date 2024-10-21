import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
    {
        senderId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        reciverId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
            minlength: [1, 'Message must be at least 1 characters long'],
            maxlength: [300, 'Message cannot be more than 300 characters']
        }
    },
    {
        timestamps: true,
    }
)

export const Message = mongoose.model("Message", messageSchema);