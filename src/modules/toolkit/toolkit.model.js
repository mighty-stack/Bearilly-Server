import mongoose from "mongoose";
import { required } from "zod/mini";

const toolKitSchema =  new mongoose.Schema(
    {
        toolName: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            required: true,
            enum : [
                "Video", "Design", "Audio", "Writing", "Productivity", "Marketing", "AI"
            ]
        },

        toolUrl: {
            type: String,
            required:true
        },

        logo: {
            type: String,
            default: "",
        },

        isFeatured : {
            type: Boolean,
            default: false
        },

        tags: {
            type: String,
            trim: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)

toolKitSchema.index({
    toolName: "text",
    description: "text",
    tags: "text"
})

export default mongoose.model(
    "ToolKit",
    toolKitSchema
)