import React, { useState } from "react";
import cropPrices from "../data/crop_prices.json";
import "./CropPriceDashboard.css";

const CropPriceDashboard = () => {
  const [crop, setCrop] = useState("");
  const [market, setMarket] = useState("");
  const [data, setData] = useState([]);

  const crops = [...new Set(cropPrices.map(d => d.crop))];
  const markets = [...new Set(
    cropPrices.filter(d => d.crop === crop).map(d => d.market)
  )];

  const analyse = () => {
    const filtered = cropPrices
      .filter(d => d.crop === crop && d.market === market)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    setData(filtered);
  };

  if (data.length === 0) {
    return (
      <div className="cp-dashboard">
        <h2>Crop Price Insights</h2>

        <select onChange={e => setCrop(e.target.value)}>
          <option>Select Crop</option>
          {crops.map(c => <option key={c}>{c}</option>)}
        </select>

        <select onChange={e => setMarket(e.target.value)}>
          <option>Select Market</option>
          {markets.map(m => <option key={m}>{m}</option>)}
        </select>

        <button onClick={analyse}>Analyse</button>
      </div>
    );
  }

  const latest = data[data.length - 1];
  const prev = data[data.length - 2];

  const maxPrice = Math.max(...data.map(d => d.price));
  const minPrice = Math.min(...data.map(d => d.price));
  const bestDay = data.find(d => d.price === maxPrice);

  const trend =
    latest.price > prev.price ? "⬆ Increasing" :
    latest.price < prev.price ? "⬇ Decreasing" :
    "➖ Stable";

  const recommendation =
    latest.price >= maxPrice - 10 ? "✅ SELL NOW" : "⏳ WAIT";

  return (
    <div className="cp-dashboard">
      <h2>Crop Price Insights</h2>

      <div className="cards">
        <div className="card">
          <h4>Current Price</h4>
          <p>₹{latest.price}</p>
          <small>{latest.date}</small>
        </div>

        <div className="card">
          <h4>Trend</h4>
          <p>{trend}</p>
        </div>

        <div className="card">
          <h4>Best Sell Price</h4>
          <p>₹{maxPrice}</p>
          <small>{bestDay.date}</small>
        </div>

        <div className="card">
          <h4>Volatility</h4>
          <p>₹{maxPrice - minPrice}</p>
        </div>
      </div>

      <div className="recommend">
        <strong>Recommendation:</strong> {recommendation}
      </div>
    </div>
  );
};

export default CropPriceDashboard;
