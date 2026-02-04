import axios from "axios";

const API_BASE = "https://agrisphere-backend-xs0w.onrender.com";

export const predictCrop = async (data) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user._id) {
      throw new Error("User not logged in");
    }

    const payload = {
      ...data,
      user_id: user._id,
    };

    const response = await axios.post(
      `${API_BASE}/api/crops/predict`,
      payload,
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
