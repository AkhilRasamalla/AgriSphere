const mongoose = require("mongoose");

const cropPredictSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    N: { type: Number, required: true },
    P: { type: Number, required: true },
    K: { type: Number, required: true },
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    ph: { type: Number, required: true },
    rainfall: { type: Number, required: true },
    predictedCrop: { type: String, required: true },
    predictedPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CropPredict", cropPredictSchema);
