import Admin from "../models/Admin.js";
import College from "../models/College.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ================== SIGNUP ==================
export const signupAdmin = async (req, res) => {
  const { email, password, collegeName, collegeId } = req.body;

  if (!email || !password || !collegeName || !collegeId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const existingCollege = await College.findOne({ collegeId });
    if (existingCollege) {
      return res.status(400).json({ message: "College ID already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await College.create({ collegeId, collegeName });

    const admin = await Admin.create({
      email,
      password: hashedPassword,
      collegeId,
    });

    const token = jwt.sign(
      { id: admin._id, collegeId },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ token });
  } catch (err) {
      console.log("FULL ERROR:", err);
      console.log("ERROR RESPONSE:", err.response);
      console.log("ERROR DATA:", err.response?.data);

      setError(err.response?.data?.message || "Signup failed");
    }

};

// ================== LOGIN ==================
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, collegeId: admin.collegeId },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};
