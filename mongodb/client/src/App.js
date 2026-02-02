import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";
import CropPredictionForm from "./components/CropPredictionForm";
import Weather from "./components/Weather";
import AboutUs from "./components/AboutUs";
import FarmDetails from "./components/FarmDetail";
import PlantingCale from "./components/PlanttingCale";
import RegisterSeed from "./components/RegisterSeed";
import SeedList from "./components/SeedList";
import RequestManager from "./components/RequestManager";
import CropPrice from "./components/CropPrice";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/predict" element={<CropPredictionForm />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/farmDetails" element={<FarmDetails />} />
            <Route path="/plantingCal" element={<PlantingCale />} />
            <Route path="/registerSeed" element={<RegisterSeed />} />
            <Route path="/seedList" element={<SeedList />} />
            <Route path="/requestManager" element={<RequestManager />} />
            <Route path="/crop-price" element={<CropPrice />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
