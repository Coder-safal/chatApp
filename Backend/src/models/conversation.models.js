import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema(
    {
        participants: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User",
                required: true,
            }
        ],
        messages: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Message",
            }
        ]
    },
    {
        timestamps: true,
    }
)

export const Conversation = mongoose.model("Conversation", conversationSchema);