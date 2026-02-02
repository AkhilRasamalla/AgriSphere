const express = require("express");
const router = express.Router();
const Farm = require("../models/Farm");

router.post("/", async (req, res) => {
  try {
    const {
      user_id,
      location,
      crop_type,
      planting_schedule,
      soil_type,
      irrigation_system,
      size,
    } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "user_id is required" });
    }

    const newFarm = new Farm({
      user_id,
      location,
      cropType: crop_type,
      plantingDate: planting_schedule,
      soilType: soil_type,
      irrigationSystem: irrigation_system,
      size,
    });

    await newFarm.save();

    res.status(201).json({
      message: "Farm saved successfully",
      farm: newFarm,
    });
  } catch (error) {
    console.error("Farm save error:", error);
    res.status(500).json({
      error: "Failed to save farm",
      details: error.message,
    });
  }
});

module.exports = router;
