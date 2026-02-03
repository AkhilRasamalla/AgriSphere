const CropPredict = require("../models/CropPredict");

await CropPredict.create({
  user_id: req.body.user_id,   // must come from frontend
  N,
  P,
  K,
  temperature,
  humidity,
  ph,
  rainfall,
  predictedCrop: predicted_crop,
  predictedPrice: predicted_price
});
