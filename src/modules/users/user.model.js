import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        accessGranted: {
            type: Boolean,
            default: true,
        },

        accessCodeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AccessCode",
            default: null
        },

        aiUsageToday: {
            type: Number,
            default: 0
        },

        lastUsageReset: {
            type: Date,
            default: Date.now
        },

        favoriteTools: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Tool"
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);