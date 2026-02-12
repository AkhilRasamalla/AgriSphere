import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [farm, setFarm] = useState(null);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    // Fetch Farm
    axios
      .get(`http://localhost:4000/api/farms/${user._id}`)
      .then((res) => setFarm(res.data))
      .catch(() => {});

    // Fetch Purchases
    axios
      .get(`http://localhost:4000/api/purchases/${user._id}`)
      .then((res) => setPurchases(res.data || []))
      .catch(() => {});
  }, [user]);

  const totalSpent = purchases.reduce(
    (acc, item) => acc + (item.totalPrice || 0),
    0
  );

  return (
    <div className="dashboard-page">
      <h1>🌾 Farmer Dashboard</h1>

      <div className="dashboard-grid">

        {/* FARM OVERVIEW */}
        <div className="card">
          <h3>Farm Overview</h3>

          {farm ? (
            <>
              <p><strong>Location:</strong> {farm.location}</p>
              <p><strong>Crop:</strong> {farm.cropType}</p>
              <p><strong>Soil:</strong> {farm.soilType}</p>
              <p><strong>Size:</strong> {farm.size} acres</p>

              <button onClick={() => navigate("/farmDetails")}>
                Update Farm
              </button>
            </>
          ) : (
            <button onClick={() => navigate("/farmDetails")}>
              Add Farm Details
            </button>
          )}
        </div>

        {/* PURCHASE ANALYTICS */}
        <div className="card">
          <h3>Purchase Analytics</h3>
          <p><strong>Total Orders:</strong> {purchases.length}</p>
          <p><strong>Total Spent:</strong> ₹{totalSpent}</p>

          {purchases.length > 0 && (
            <p>
              <strong>Last Purchase:</strong>{" "}
              {purchases[0].createdAt?.slice(0, 10)}
            </p>
          )}
        </div>

        {/* SMART INSIGHT */}
        <div className="card">
          <h3>Smart Insight</h3>

          {farm ? (
            <>
              <p>Current crop: <strong>{farm.cropType}</strong></p>
              <p>Market trend: Rising demand this week</p>
              <p>Suggestion: Monitor irrigation levels</p>
            </>
          ) : (
            <p>Add farm details to unlock insights</p>
          )}
        </div>

        {/* QUICK ACTIONS */}
        <div className="card">
          <h3>Quick Actions</h3>
          <div className="actions">
            <button onClick={() => navigate("/predict")}>
              Predict Crop
            </button>

            <button onClick={() => navigate("/weather")}>
              Check Weather
            </button>

            <button onClick={() => navigate("/seedlist")}>
              Marketplace
            </button>

            <button onClick={() => navigate("/farmDetails")}>
              Update Farm
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
