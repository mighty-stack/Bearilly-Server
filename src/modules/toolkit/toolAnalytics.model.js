import mongoose from "mongoose";

const toolAnalyticsSchema = new mongoose.Schema({
    toolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    eventName: {
        type: String,
        enum: ["tool_opened"],
        default: "tool_opened"
    },

    ipAddress:{
        type: String
    },

    userAgent:{
        type:String
    }
}, {
    timestamps: true
})

export default mongoose.model(
    "ToolAnalytics",
    toolAnalyticsSchema
)