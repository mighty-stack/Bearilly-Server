import mongoose from "mongoose";
import { required, trim } from "zod/mini";

const assessmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: [
            "Content Creation", "Social Media", "Branding", "Video Editing", "Story Telling", "Monetization"
        ],
        required: true,
    },
    difficulty: {
        type: String,
        enum:[
            "Beginner", "Intermediate", "Advance"
        ],
        default: "Beginner"
    },
    resources: [
        {
            title: String,
            url: String
        }
    ],
    deadline: {
        type: Date,
        required: true,
    },
    maxScore:{
        type: Number,
        default: 100,
    },
    estimatedDuration: {
        type: Number, // minutes
        default: 60,
    },
    allowLateSubmission: {
        type: Boolean,
        default: false,
    },
    totalSubmissions: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: [
            "Draft", "Published", "Closed"
        ],
        default: "Draft"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        // ref: User,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
})

assessmentSchema.index({status: 1})
assessmentSchema.index({deadline: 1})
assessmentSchema.index({category: 1})
assessmentSchema.index({createAt: 1})

export default mongoose.model("Assessment", assessmentSchema)