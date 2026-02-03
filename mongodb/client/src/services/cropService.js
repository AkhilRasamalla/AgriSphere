import axios from "axios";

const API_BASE = "https://agrisphere-backend-xs0w.onrender.com";

export const predictCrop = async (formData, userId) => {
  const response = await axios.post(
    `${API_BASE}/api/crops/predict`,
    {
      ...formData,
      user_id: userId,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data;
};
