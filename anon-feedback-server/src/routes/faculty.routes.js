import express from "express";
import multer from "multer";
import csv from "csv-parser";
import fs from "fs";
import Faculty from "../models/Faculty.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

/*
  POST /api/faculty/upload
  Upload faculty CSV (admin only)
*/
router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  (req, res) => {
    console.log("REQ.FILE =", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // ✅ collegeId comes from admin token
    const { collegeId } = req.admin;

    const faculties = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => {
        if (row.facultyName && row.branch && row.section) {
          faculties.push({
            collegeId,
            facultyName: row.facultyName.trim(),
            branch: row.branch.trim(),
            section: row.section.trim(),
          });
        }
      })
      .on("end", async () => {
        try {
          if (!faculties.length) {
            fs.unlinkSync(req.file.path);
            return res
              .status(400)
              .json({ message: "No valid rows found in CSV" });
          }

          await Faculty.insertMany(faculties);

          fs.unlinkSync(req.file.path);

          res.json({
            message: "Faculty CSV uploaded successfully",
            inserted: faculties.length,
          });
        } catch (err) {
          console.error("DB ERROR:", err.message);
          fs.unlinkSync(req.file.path);
          res.status(500).json({ message: err.message });
        }
      });
  }
);

/*
  GET /api/faculty
  Fetch faculty by collegeId, branch, section
*/
router.get("/", async (req, res) => {
  const { collegeId, branch, section } = req.query;

  if (!collegeId || !branch || !section) {
    return res.json([]);
  }

  try {
    const faculty = await Faculty.find({
      collegeId,
      branch: branch.trim(),
      section: section.trim(),
    }).select("_id facultyName");

    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch faculty" });
  }
});


export default router;
