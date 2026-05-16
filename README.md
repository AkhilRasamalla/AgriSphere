# AgriSphere 🌾

> An AI-assisted smart agriculture platform providing real-time weather insights, crop predictions, and market price forecasts to help farmers make data-driven decisions.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen?style=for-the-badge)](https://agri-sphere-eight.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Source%20Code-black?style=for-the-badge&logo=github)](https://github.com/AkhilRasamalla/AgriSphere)
[![Stack](https://img.shields.io/badge/Stack-React%20%7C%20Node.js%20%7C%20Python%20%7C%20MongoDB-blue?style=for-the-badge)]()

---

## 📸 Preview

> _Add a screenshot of the dashboard here — the weather panel + crop recommendation UI_

---

## 🎯 What is AgriSphere?

AgriSphere is a full-stack web platform built to support farmers with intelligent, data-backed recommendations. It integrates a React frontend, Node.js backend, and Python-based ML models into a unified platform accessible from any device.

The platform combines real-time weather data, soil analysis, and machine learning crop predictions to give actionable insights — reducing guesswork for farmers dealing with climate variability.

**[→ See it live here](https://agri-sphere-eight.vercel.app/)**

---

## ✨ Features

### 🌤️ Real-Time Weather Dashboard
- Fetches live weather data (temperature, humidity, wind speed, precipitation) using the OpenWeatherMap API
- Location-aware via OpenCage geocoding API

### 🌱 AI-Powered Crop Prediction
- ML model analyzes soil nutrient levels (N, P, K), weather conditions, and resources
- Recommends the best crops to plant for current conditions
- Python Flask API serves the prediction model

### 💰 Crop Price Forecasting
- Forecasts market prices using historical data and demand trend analysis
- Helps farmers plan harvest timing and sales strategy

### 📅 Smart Planting Calendar
- Recommends optimal planting dates based on weather patterns and soil data
- Interactive calendar UI for schedule management

### 🌾 Seed Register & Exchange System
- Farmers can list seeds for sale or request seeds from others
- Automatic email notifications on request approval/decline

### 🔐 User Authentication
- Secure registration, login, and session management
- Role-aware navigation based on auth state

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, HTML5, CSS3 |
| Backend | Node.js, Express.js |
| ML / Analytics | Python, scikit-learn, Flask |
| Database | MongoDB |
| Weather API | OpenWeatherMap |
| Geocoding | OpenCage API |
| Deployment | Vercel (frontend) |

---

## 🏗️ Architecture

```
AgriSphere/
├── frontend/                   # React app
│   ├── src/
│   │   ├── components/         # Dashboard, weather card, crop card
│   │   ├── pages/              # Home, predict, calendar, seeds
│   │   └── services/           # API calls to backend & Python service
│
├── backend/                    # Node.js + Express API
│   ├── routes/                 # Weather, auth, seeds, planting
│   ├── models/                 # MongoDB schemas
│   └── server.js
│
└── crop-prediction-api/        # Python Flask ML service
    ├── model/                  # Trained scikit-learn model
    ├── app.py                  # Flask REST API
    └── requirements.txt
```

---

## 🚀 Run Locally

### Prerequisites
- Node.js v18+
- Python 3.9+
- MongoDB URI
- OpenWeatherMap API key
- OpenCage API key

### Backend
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
MONGODB_LINK=your_mongodb_uri
WEATHER_API_KEY=your_openweathermap_key
OPENCAGE_API_KEY=your_opencage_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

```bash
npm start
```

### Python ML Service
```bash
cd crop-prediction-api
pip install -r requirements.txt
python app.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🤖 ML Model Details

The crop prediction model is trained on agricultural datasets containing:
- Soil nutrient values (Nitrogen, Phosphorus, Potassium)
- Temperature and humidity ranges
- Rainfall data
- Regional crop yield history

Model type: Random Forest Classifier (via scikit-learn)
Served via: Python Flask REST API → consumed by Node.js backend

---

## 💡 What I Learned Building This

- Cross-service architecture: connecting React → Node.js → Python Flask in one platform
- Consuming and transforming third-party weather API data for UI display
- Integrating a trained ML model into a REST API with Flask
- Location-aware features using geocoding APIs
- Email notification system with Nodemailer

---

## 📈 Planned Improvements

- [ ] Mobile app version for field use
- [ ] Soil sensor IoT integration
- [ ] Multi-language support (regional Indian languages)
- [ ] Crop disease detection via image upload (CV model)
- [ ] Offline mode for low-connectivity farm areas

---

## 👨‍💻 Author

**Akhil Rasamalla**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://linkedin.com/in/akhilrasamalla)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=flat&logo=github)](https://github.com/AkhilRasamalla)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-orange?style=flat)](https://akhildev.vercel.app)

---

## 📄 License

MIT License
