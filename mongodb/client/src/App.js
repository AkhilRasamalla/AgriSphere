import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

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
import Dashboard from "./components/Dashboard";

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

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/predict"
              element={
                <ProtectedRoute>
                  <CropPredictionForm />
                </ProtectedRoute>
              }
            />

            <Route
              path="/weather"
              element={
                <ProtectedRoute>
                  <Weather />
                </ProtectedRoute>
              }
            />

            <Route
              path="/farmDetails"
              element={
                <ProtectedRoute>
                  <FarmDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/plantingCal"
              element={
                <ProtectedRoute>
                  <PlantingCale />
                </ProtectedRoute>
              }
            />

            <Route
              path="/registerSeed"
              element={
                <ProtectedRoute>
                  <RegisterSeed />
                </ProtectedRoute>
              }
            />

            <Route
              path="/seedList"
              element={
                <ProtectedRoute>
                  <SeedList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/requests"
              element={
                <ProtectedRoute>
                  <RequestManager />
                </ProtectedRoute>
              }
            />

            <Route
              path="/crop-price"
              element={
                <ProtectedRoute>
                  <CropPrice />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
