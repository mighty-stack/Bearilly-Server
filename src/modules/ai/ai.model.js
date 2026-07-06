import mongoose from "mongoose";
import { required } from "zod/mini";

const aiMessageSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    role: {
        type : String,
        enum: [
            "user",
            "assistant"
        ],
        required: true,
    },

    content: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true
    }
)

export default mongoose.model(
    "AIMessage",
    aiMessageSchema
)