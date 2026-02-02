import React, { useState } from "react";
import "../Stylesheets/PlantingCalendar.scss";
import crops from "../data/cropsData";

const PlantingCale = () => {
  const [search, setSearch] = useState("");

  const filtered = crops.filter(
    (crop) =>
      crop.name.toLowerCase().includes(search.toLowerCase()) ||
      crop.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="pc-root">
      <div className="pc-header">
        <h1>🌱 Planting Calendar</h1>
        <p>Crop planning based on season & sowing standards</p>
      </div>

      <input
        className="pc-search"
        type="text"
        placeholder="Search crop..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="pc-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Crop</th>
              <th>North India</th>
              <th>South India</th>
              <th>Temp</th>
              <th>Method</th>
              <th>Depth</th>
              <th>Seed</th>
              <th>Row</th>
              <th>Maturity</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((c, i) => (
              <tr key={i}>
                <td style={{ color: "#000", fontWeight: "700" }}>{c.name}</td>

                <td>{c.north}</td>
                <td>{c.south}</td>
                <td>{c.temp}</td>
                <td>
                  <span className={`badge ${c.method.toLowerCase()}`}>
                    {c.method}
                  </span>
                </td>
                <td>{c.depth}</td>
                <td>{c.seed}</td>
                <td>{c.row}</td>
                <td>
                  <div className="maturity">
                    <div
                      className="maturity-bar"
                      style={{ width: `${c.maturity}%` }}
                    />
                    <span>{c.maturity} days</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlantingCale;
