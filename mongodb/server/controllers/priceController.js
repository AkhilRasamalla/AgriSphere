const prices = require("../data/crop_prices.json");

const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

exports.getCrops = (_, res) => {
  res.json([...new Set(prices.map(p => p.crop))]);
};

exports.getMarkets = (req, res) => {
  const { crop } = req.params;
  res.json([...new Set(prices.filter(p => p.crop === crop).map(p => p.market))]);
};

exports.analyse = (req, res) => {
  const { crop, market } = req.params;

  const records = prices
    .filter(p => p.crop === crop && p.market === market)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const last7 = records.slice(-7);
  const values = last7.map(r => r.price);

  const trend =
    values[6] > values[5] ? "UP" :
    values[6] < values[5] ? "DOWN" : "STABLE";

  res.json({
    crop,
    market,
    unit: "₹ / quintal",
    todayPrice: values[6],
    average7Days: Math.round(avg(values)),
    predictedNextWeek:
      trend === "UP" ? values[6] + 50 :
      trend === "DOWN" ? values[6] - 50 : values[6],
    trend,
    recommendation:
      trend === "UP" ? "HOLD" :
      trend === "DOWN" ? "SELL" : "WAIT",
    history: last7
  });
};
