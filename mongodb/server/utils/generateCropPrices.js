const fs = require("fs");
const path = require("path");

const crops = {
  Rice: ["Guntur", "Raipur"],
  Wheat: ["Indore", "Ludhiana"],
  Maize: ["Davanagere", "Nizamabad"],
  Tomato: ["Kolar", "Madanapalle"],
  Onion: ["Lasalgaon", "Pimpalgaon"],
  Potato: ["Agra", "Hooghly"],
  Cotton: ["Adilabad", "Akola"],
  Groundnut: ["Rajkot", "Anantapur"],
  Sugarcane: ["Kolhapur", "Muzaffarnagar"],
  Chilli: ["Guntur", "Warangal"]
};

const basePrices = {
  Rice: 2100,
  Wheat: 2200,
  Maize: 1800,
  Tomato: 1200,
  Onion: 1900,
  Potato: 1600,
  Cotton: 6200,
  Groundnut: 5400,
  Sugarcane: 320,
  Chilli: 9000
};

const days = 30;
const data = [];

Object.keys(crops).forEach(crop => {
  crops[crop].forEach(market => {
    let price = basePrices[crop];

    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - i));

      price += Math.floor(Math.random() * 80 - 40); // realistic fluctuation

      data.push({
        crop,
        market,
        date: date.toISOString().split("T")[0],
        price: Math.max(price, 100)
      });
    }
  });
});

const outputPath = path.join(__dirname, "../data/crop_prices.json");
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

console.log("✅ crop_prices.json generated successfully");
