import axios from "axios";

const API_BASE =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://agrisphere-backend-xs0w.onrender.com";

export const registerUser = async (formData) => {
  const res = await axios.post(`${API_BASE}/api/users/signup`, {
    username: formData.username,
    email: formData.email,
    password: formData.password,
  });
  return res.data;
};

export const loginUser = async (formData) => {
  const res = await axios.post(`${API_BASE}/api/users/login`, {
    email: formData.email,
    password: formData.password,
  });
  return res.data;
};
