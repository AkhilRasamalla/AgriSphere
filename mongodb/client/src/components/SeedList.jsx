import React, { useEffect, useState } from 'react';
import './SeedList.css';
import { useAuth } from '../context/AuthContext';

const SeedList = () => {
  const { user } = useAuth();
  const user_id = user?._id;
  const user_email = user?.email;

  const [seeds, setSeeds] = useState([]);
  const [requestedSeeds, setRequestedSeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const seedRes = await fetch('http://localhost:5000/api/seeds/all');
        const seedsData = await seedRes.json();

        let requested = [];
        if (user_id) {
          const reqRes = await fetch(
            `http://localhost:5000/api/requests/requester/${user_id}`
          );
          requested = await reqRes.json();
        }

        setSeeds(seedsData);
        setRequestedSeeds(requested.map(r => r.seedId));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [user_id]);

  const handleRequest = async (seed) => {
    try {
      const res = await fetch('http://localhost:5000/api/requests/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requesterId: user_id,
          requesterEmail: user_email,
          seedId: seed._id,
          seedOwnerEmail: seed.createdByEmail,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert('Request sent');
      setRequestedSeeds([...requestedSeeds, seed._id]);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <h3 style={{ textAlign: 'center' }}>Loading...</h3>;

  return (
    <div className="seed-list-container">
      <h2 style={{ color: 'black' }}>Available Seeds</h2>

      {seeds.length === 0 ? (
        <p>No seeds available</p>
      ) : (
        <div className="seed-list">
          {seeds.map(seed => {
            const alreadyRequested = requestedSeeds.includes(seed._id);

            return (
              <div className="seed-card" key={seed._id}>
                <h3>{seed.seedName}</h3>
                <p><strong>Type:</strong> {seed.seedType}</p>
                <p><strong>Description:</strong> {seed.description}</p>
                <p><strong>Owner:</strong> {seed.createdByEmail}</p>

                <button
                  className="request-button"
                  disabled={alreadyRequested}
                  onClick={() => handleRequest(seed)}
                  style={{
                    backgroundColor: alreadyRequested ? '#aaa' : '#28a745',
                    cursor: alreadyRequested ? 'not-allowed' : 'pointer',
                  }}
                >
                  {alreadyRequested ? 'Request Pending' : 'Request Seed'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SeedList;
