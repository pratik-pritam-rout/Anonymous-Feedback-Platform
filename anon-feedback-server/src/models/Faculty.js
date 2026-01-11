import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
  {
    collegeId: {
      type: String,
      required: true,
    },
    facultyName: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Faculty", facultySchema);
