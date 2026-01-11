import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
  {
    collegeId: { type: String, unique: true },
    collegeName: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("College", collegeSchema);
