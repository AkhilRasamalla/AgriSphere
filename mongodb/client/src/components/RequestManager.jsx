import React, { useEffect, useState } from "react";
import "./RequestManager.css";
import { useAuth } from "../context/AuthContext";

const RequestManager = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.email) return;

    const fetchRequests = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/requests/owner/${user.email}`
        );

        if (!res.ok) throw new Error("Failed to fetch requests");

        const data = await res.json();
        setRequests(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/requests/update/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status } : r))
      );
    } catch (err) {
      alert(err.message);
    }
  };

  if (!user) {
    return (
      <p style={{ textAlign: "center" }}>
        Please login to manage requests
      </p>
    );
  }

  if (loading) {
    return (
      <p style={{ textAlign: "center" }}>
        Loading requests...
      </p>
    );
  }

  return (
    <div className="page">
      <div className="request-manager-container">
        <h2>Manage Requests</h2>

        {error && <p className="error">{error}</p>}

        {requests.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--muted)" }}>
            No requests found.
          </p>
        ) : (
          <div className="request-list">
            {requests.map((request) => (
              <div className="request-card" key={request._id}>
                <p>
                  <strong>Requester:</strong> {request.requesterEmail}
                </p>
                <p>
                  <strong>Status:</strong> {request.status}
                </p>
                <p>
                  <strong>Seed:</strong>{" "}
                  {request.seedId?.seedName || "N/A"}
                </p>

                {request.status === "pending" && (
                  <div className="button-group">
                    <button
                      className="grant-button"
                      onClick={() =>
                        updateStatus(request._id, "granted")
                      }
                    >
                      Grant
                    </button>
                    <button
                      className="decline-button"
                      onClick={() =>
                        updateStatus(request._id, "declined")
                      }
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestManager;
