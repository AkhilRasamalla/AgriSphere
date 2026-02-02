import axios from "axios";

const API_URL = "http://localhost:5000/api/users"; // BACKEND PORT

export const registerUser = async (userData) => {
  try {
    console.log("Calling signup API...");
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user", error.response?.data || error.message);
    throw new Error("Registration failed");
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Error logging in", error.response?.data || error.message);
    throw new Error("Login failed");
  }
};

export const getUserData = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};

export const updateUserData = async (userId, userData) => {
  const response = await axios.put(`${API_URL}/${userId}/preferences`, userData);
  return response.data;
};
