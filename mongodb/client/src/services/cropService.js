import axios from "axios";

const ML_BASE =
  import.meta.env.MODE === "production"
    ? "https://agrisphere-ml.onrender.com"
    : "http://localhost:4000";

export const predictCrop = async (data) => {
  try {
    const response = await axios.post(
      `${ML_BASE}/predict`,
      {
        N: Number(data.N),
        P: Number(data.P),
        K: Number(data.K),
        temperature: Number(data.temperature),
        humidity: Number(data.humidity),
        ph: Number(data.ph),
        rainfall: Number(data.rainfall),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Crop prediction failed:", error.response?.data || error.message);
    throw error;
  }
};
