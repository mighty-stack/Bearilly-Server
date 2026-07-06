import mongoose from "mongoose";

const accessCodeSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
        },
        status:{
            type:String,
            enum:["active","inactive"],
            default: "active",
        },

        UsageLimit:{
            type: Number,
            default: 1
        },

        UsageCount:{
            type: Number,
            default: 0
        },

        expiresAt: {
            type: Date,
            required: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("AccessCode", accessCodeSchema);