import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <div className="nav-title">AgriSphere</div>

        <div className="nav-links">
          <Link to="/">Home</Link>

          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}

          {user && (
            <>
              <Link to="/profile">Profile</Link>
              <Link to="/predict">Predict Crop</Link>
              <Link to="/weather">Weather</Link>
              <Link to="/farmDetails">Farm Details</Link>
              <Link to="/seedList">Seeds</Link>
              <Link to="/requestManager">Requests</Link>
              <Link to="/plantingCal">Planting Calendar</Link>
              <Link to="/crop-price">Crop Prices</Link>
            </>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {user && (
          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
