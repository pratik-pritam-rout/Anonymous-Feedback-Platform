import express from "express";
import { signupAdmin, loginAdmin } from "../controllers/admin.controller.js";
import authMiddleware from "../middleware/auth.js";
import { getFeedbackForCollege } from "../controllers/feedback.controller.js";

const router = express.Router();

router.post("/signup", signupAdmin);
router.post("/login", loginAdmin);

// protected
router.get("/feedback", authMiddleware, getFeedbackForCollege);

export default router;
