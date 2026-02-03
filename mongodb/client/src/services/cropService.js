import axios from "axios";

const API_BASE = "https://agrisphere-backend-xs0w.onrender.com";

export const predictCrop = async (data) => {
  try {
    const response = await axios.post(
      `${API_BASE}/api/crops/predict`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error predicting crop:",
      error.response?.data || error.message
    );
    throw error;
  }
};
