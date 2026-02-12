import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./SeedList.css";

const SeedList = () => {
  const { user } = useAuth();
  const [seeds, setSeeds] = useState([]);
  const [requested, setRequested] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/seeds")
      .then(res => res.json())
      .then(data => setSeeds(data))
      .catch(err => console.error(err));

    if (user?._id) {
      fetch(`http://localhost:4000/api/requests/requester/${user._id}`)
        .then(res => res.json())
        .then(data => setRequested(data.map(r => r.seedId)))
        .catch(err => console.error(err));
    }
  }, [user]);

  const requestSeed = async (seed) => {
    try {
      await fetch("http://localhost:4000/api/requests/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requesterId: user._id,
          requesterEmail: user.email,
          seedId: seed._id,
          seedOwnerEmail: seed.createdByEmail,
        }),
      });

      setRequested([...requested, seed._id]);
      alert("Request Sent Successfully 🌱");
    } catch (err) {
      alert("Failed to send request");
    }
  };

  if (seeds.length === 0) {
    return <h3 style={{ textAlign: "center" }}>No seeds available</h3>;
  }

  return (
    <div className="marketplace">
      <h2 className="market-title">🌱 Seed Marketplace</h2>

      <div className="seed-grid">
        {seeds.map(seed => (
          <div className="seed-card" key={seed._id}>
            <img
              src={`http://localhost:4000${seed.image}`}
              alt={seed.seedName}
            />

            <div className="seed-info">
              <h3>{seed.seedName}</h3>
              <p className="type">{seed.seedType}</p>
              <p>{seed.description}</p>
              <p className="seller">👨‍🌾 Farmer: {seed.createdByEmail}</p>

              <button
                className={
                  requested.includes(seed._id) ? "requested-btn" : ""
                }
                disabled={requested.includes(seed._id)}
                onClick={() => requestSeed(seed)}
              >
                {requested.includes(seed._id)
                  ? "Request Sent ✓"
                  : "Request Seed"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeedList;
