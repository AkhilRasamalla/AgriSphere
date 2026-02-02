const cropsData = [
  // 🌾 CEREALS
  { name: "Rice", category: "Cereal", north: "Jun–Jul", south: "May–Jun", temp: "20–35°C", method: "Transplant", depth: "1–2 in", seed: "6 in", row: "8 in", maturity: 120 },
  { name: "Wheat", category: "Cereal", north: "Oct–Nov", south: "Nov", temp: "10–25°C", method: "Direct", depth: "1.5 in", seed: "4 in", row: "9 in", maturity: 110 },
  { name: "Maize", category: "Cereal", north: "Jun–Jul", south: "Jun", temp: "18–27°C", method: "Direct", depth: "2 in", seed: "8 in", row: "2 ft", maturity: 95 },
  { name: "Bajra", category: "Cereal", north: "Jul", south: "Jun", temp: "25–35°C", method: "Direct", depth: "1 in", seed: "6 in", row: "1.5 ft", maturity: 90 },
  { name: "Jowar", category: "Cereal", north: "Jun–Jul", south: "Jun", temp: "25–32°C", method: "Direct", depth: "1.5 in", seed: "6 in", row: "1.5 ft", maturity: 100 },
  { name: "Ragi", category: "Cereal", north: "Jun", south: "May", temp: "20–30°C", method: "Direct", depth: "1 in", seed: "6 in", row: "1 ft", maturity: 110 },
  { name: "Barley", category: "Cereal", north: "Oct", south: "Oct", temp: "12–25°C", method: "Direct", depth: "1.5 in", seed: "4 in", row: "9 in", maturity: 90 },
  { name: "Oats", category: "Cereal", north: "Oct", south: "Oct", temp: "10–25°C", method: "Direct", depth: "1.5 in", seed: "4 in", row: "9 in", maturity: 95 },

  // 🌱 PULSES
  { name: "Chickpea", category: "Pulse", north: "Oct–Nov", south: "Oct", temp: "20–25°C", method: "Direct", depth: "2 in", seed: "4 in", row: "1.5 ft", maturity: 100 },
  { name: "Pigeon Pea", category: "Pulse", north: "Jun", south: "Jun", temp: "20–30°C", method: "Direct", depth: "2 in", seed: "1 ft", row: "2 ft", maturity: 150 },
  { name: "Green Gram", category: "Pulse", north: "Jul", south: "Jun", temp: "25–35°C", method: "Direct", depth: "1.5 in", seed: "4 in", row: "1 ft", maturity: 70 },
  { name: "Black Gram", category: "Pulse", north: "Jul", south: "Jun", temp: "25–35°C", method: "Direct", depth: "1.5 in", seed: "4 in", row: "1 ft", maturity: 75 },
  { name: "Lentil", category: "Pulse", north: "Oct", south: "Oct", temp: "15–25°C", method: "Direct", depth: "1.5 in", seed: "4 in", row: "1 ft", maturity: 95 },
  { name: "Field Peas", category: "Pulse", north: "Oct", south: "Oct", temp: "15–20°C", method: "Direct", depth: "1.5 in", seed: "4 in", row: "1 ft", maturity: 90 },
  { name: "Cowpea", category: "Pulse", north: "Jun", south: "Jun", temp: "25–35°C", method: "Direct", depth: "1.5 in", seed: "6 in", row: "1.5 ft", maturity: 80 },
  { name: "Rajma", category: "Pulse", north: "Jun", south: "Jun", temp: "15–25°C", method: "Direct", depth: "1.5 in", seed: "6 in", row: "1.5 ft", maturity: 95 },

  // 🥕 VEGETABLES
  { name: "Tomato", category: "Vegetable", north: "Nov–Dec", south: "Jun–Jul", temp: "18–30°C", method: "Transplant", depth: "0.25 in", seed: "1 ft", row: "1.5 ft", maturity: 75 },
  { name: "Onion", category: "Vegetable", north: "Oct–Nov", south: "Oct", temp: "15–25°C", method: "Transplant", depth: "0.25 in", seed: "4 in", row: "1 ft", maturity: 110 },
  { name: "Potato", category: "Vegetable", north: "Oct–Nov", south: "Oct", temp: "15–25°C", method: "Direct", depth: "3 in", seed: "10 in", row: "2 ft", maturity: 90 },
  { name: "Brinjal", category: "Vegetable", north: "Jun", south: "May", temp: "20–30°C", method: "Transplant", depth: "0.25 in", seed: "1.5 ft", row: "2 ft", maturity: 90 },
  { name: "Cabbage", category: "Vegetable", north: "Sept–Oct", south: "Jun–Jul", temp: "10–20°C", method: "Transplant", depth: "0.25 in", seed: "1 ft", row: "1.5 ft", maturity: 95 },
  { name: "Cauliflower", category: "Vegetable", north: "Sept", south: "Jun", temp: "15–20°C", method: "Transplant", depth: "0.25 in", seed: "1 ft", row: "1.5 ft", maturity: 90 },
  { name: "Okra", category: "Vegetable", north: "Feb–Mar", south: "Jan", temp: "20–30°C", method: "Direct", depth: "1 in", seed: "12 in", row: "2 ft", maturity: 60 },
  { name: "Carrot", category: "Vegetable", north: "Oct", south: "Oct", temp: "15–25°C", method: "Direct", depth: "0.5 in", seed: "2 in", row: "1 ft", maturity: 75 },

  // 🍎 FRUITS
  { name: "Mango", category: "Fruit", north: "Jun–Jul", south: "Jun", temp: "24–30°C", method: "Sapling", depth: "2 ft", seed: "-", row: "10 m", maturity: 365 },
  { name: "Banana", category: "Fruit", north: "Jun–Jul", south: "Year-round", temp: "20–30°C", method: "Sapling", depth: "2 ft", seed: "-", row: "6 ft", maturity: 300 },
  { name: "Apple", category: "Fruit", north: "Dec–Jan", south: "-", temp: "10–20°C", method: "Sapling", depth: "2 ft", seed: "-", row: "4 m", maturity: 365 },
  { name: "Orange", category: "Fruit", north: "Jun", south: "Jun", temp: "20–30°C", method: "Sapling", depth: "2 ft", seed: "-", row: "5 m", maturity: 300 },
  { name: "Grapes", category: "Fruit", north: "Jan", south: "Jan", temp: "15–30°C", method: "Sapling", depth: "2 ft", seed: "-", row: "3 m", maturity: 200 },

  // 🌿 COMMERCIAL
  { name: "Sugarcane", category: "Commercial", north: "Feb–Mar", south: "Jan", temp: "20–35°C", method: "Setts", depth: "3 in", seed: "1 ft", row: "4 ft", maturity: 365 },
  { name: "Cotton", category: "Commercial", north: "Jun", south: "Jun", temp: "21–30°C", method: "Direct", depth: "1.5 in", seed: "1 ft", row: "3 ft", maturity: 180 }
];

export default cropsData;
