const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const Seed = require("../models/Seed");

const router = express.Router();

/* =========================
   CREATE UPLOADS FOLDER
   ========================= */
const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/* =========================
   MULTER CONFIG
   ========================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* =========================
   REGISTER SEED
   ========================= */
router.post("/register", upload.single("image"), async (req, res) => {
  try {
    const {
      seedName,
      seedType,
      description,
      createdBy,
      createdByEmail,
    } = req.body;

    console.log("Incoming body:", req.body);

    // Basic validation
    if (!seedName || !seedType) {
      return res.status(400).json({ error: "Seed name and type required" });
    }

    if (!createdBy || !mongoose.Types.ObjectId.isValid(createdBy)) {
      return res.status(400).json({ error: "Invalid createdBy ID" });
    }

    if (!createdByEmail) {
      return res.status(400).json({ error: "Creator email required" });
    }

    const newSeed = new Seed({
      seedName,
      seedType,
      description,
      createdBy,
      createdByEmail,
      image: req.file ? `/uploads/${req.file.filename}` : "",
    });

    await newSeed.save();

    res.status(201).json(newSeed);
  } catch (error) {
    console.error("Seed registration error FULL:", error);
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   GET ALL SEEDS
   ========================= */
router.get("/", async (req, res) => {
  try {
    const seeds = await Seed.find({}).sort({ createdAt: -1 });
    res.status(200).json(seeds);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch seeds" });
  }
});

module.exports = router;
