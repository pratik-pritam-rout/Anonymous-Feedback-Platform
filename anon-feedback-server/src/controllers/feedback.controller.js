import Feedback from "../models/Feedback.js";

/* ================= SUBMIT FEEDBACK ================= */
export const submitFeedback = async (req, res) => {
  const {
    collegeId,
    category,
    facultyId,
    branch,
    section,
    rating,
    message,
  } = req.body;

  try {
    await Feedback.create({
      collegeId,
      category,
      facultyId: category === "Faculty" ? facultyId : null,
      branch: category === "Faculty" ? branch : null,
      section: category === "Faculty" ? section : null,
      rating,
      message,
    });

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Feedback submission failed" });
  }
};

/* ================= GET FEEDBACK FOR ADMIN ================= */
export const getFeedbackForCollege = async (req, res) => {
  const { collegeId } = req.admin;

  try {
    const feedback = await Feedback.find({ collegeId })
      .populate("facultyId", "facultyName branch section")
      .sort({ createdAt: -1 });

    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch feedback" });
  }
};
