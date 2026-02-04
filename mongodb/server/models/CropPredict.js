const mongoose = require("mongoose");

const CropPredictSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    N: Number,
    P: Number,
    K: Number,
    temperature: Number,
    humidity: Number,
    ph: Number,
    rainfall: Number,
    predictedCrop: String,
    predictedPrice: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("CropPredict", CropPredictSchema);
