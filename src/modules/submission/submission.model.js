import mongoose from "mongoose";

const submissionSchema =
  new mongoose.Schema(
    {
      assessment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assessment",
        required: true,
      },

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      submissionType: {
        type: String,
        enum: [
          "File",
          "Google Drive",
          "Canva",
          "YouTube",
        ],
        required: true,
      },

      fileUrl: {
        type: String,
        default: "",
      },

      originalFileName: {
        type: String,
        default: "",
      },

      submissionId: {
        type: String,
        unique: true,
      },

      remarks: {
        type: String,
      },

      score: {
        type: Number,
      },

      feedback: {
        type: String,
      },

      status: {
        type: String,
        enum: [
          "Submitted",
          "Under Review",
          "Reviewed",
        ],
        default: "Submitted",
      },
    },
    {
      timestamps: true,
    }
  );



submissionSchema.index(
  {
    assessment: 1,
    user: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model(
  "Submission",
  submissionSchema
);