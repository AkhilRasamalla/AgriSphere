import axios from "axios";

export const predictCrop = async (data) => {
  try {
    console.log("Sending data to backend:", data);

    const response = await axios.post(
      "http://localhost:5000/api/crops/predict",
      data,
      {
        headers: {
          "Content-Type": "application/json"
        }
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
