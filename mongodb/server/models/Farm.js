const mongoose = require("mongoose");

const FarmSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  cropType: {
    type: String,
    required: true,
  },
  plantingDate: {
    type: Date,
    required: true,
  },
  soilType: {
    type: String,
    required: true,
  },
  irrigationSystem: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Farm", FarmSchema);
