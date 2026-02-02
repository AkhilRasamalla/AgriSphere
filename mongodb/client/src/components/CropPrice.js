import React, { useState } from "react";
import data from "../data/crop_prices.json";
import "./CropPrice.css";

const CropPrice = () => {
  const crops = [...new Set(data.map(d => d.crop))];

  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("");
  const [result, setResult] = useState(null);

  const markets = selectedCrop
    ? [...new Set(data.filter(d => d.crop === selectedCrop).map(d => d.market))]
    : [];

  const analyse = () => {
    const rows = data.filter(
      d => d.crop === selectedCrop && d.market === selectedMarket
    );

    if (rows.length < 2) return;

    const prices = rows.map(r => r.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const avg = Math.round(prices.reduce((a,b)=>a+b,0)/prices.length);
    const netChange = prices[prices.length - 1] - prices[0];

    const bestDay = rows.reduce((a,b)=> b.price > a.price ? b : a);

    const advice =
      prices[prices.length - 1] < max
        ? "Hold stock. Prices dropped from recent peak."
        : "Sell now. Market at local peak.";

    setResult({
      rows,
      min,
      max,
      avg,
      netChange,
      bestDay,
      advice
    });
  };

  return (
    <div className="crop-price-page">
      <h2>Crop Price Intelligence</h2>

      <select value={selectedCrop} onChange={e => {
        setSelectedCrop(e.target.value);
        setSelectedMarket("");
        setResult(null);
      }}>
        <option value="">Select Crop</option>
        {crops.map(c => <option key={c}>{c}</option>)}
      </select>

      <select value={selectedMarket} onChange={e => {
        setSelectedMarket(e.target.value);
        setResult(null);
      }}>
        <option value="">Select Market</option>
        {markets.map(m => <option key={m}>{m}</option>)}
      </select>

      <button onClick={analyse} disabled={!selectedCrop || !selectedMarket}>
        Analyse
      </button>

      {result && (
        <>
          <div className="summary">
            <div>📈 Net Change: ₹{result.netChange}</div>
            <div>⬇ Lowest: ₹{result.min}</div>
            <div>⬆ Highest: ₹{result.max}</div>
            <div>📊 Average: ₹{result.avg}</div>
          </div>

          <div className="advice">
            🧠 {result.advice}  
            <br />
            📅 Best Sell Day: {result.bestDay.date} (₹{result.bestDay.price})
          </div>

          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Price (₹)</th>
              </tr>
            </thead>
            <tbody>
              {result.rows.map(r => (
                <tr key={r.date}>
                  <td>{r.date}</td>
                  <td>{r.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CropPrice;
