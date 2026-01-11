import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    collegeId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Faculty", "Management", "Infrastructure", "General"],
      required: true,
    },
    facultyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      default: null,
    },
    branch: String,
    section: String,
    rating: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);
