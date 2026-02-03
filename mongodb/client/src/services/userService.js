// mongodb/client/src/services/userService.js
import axios from "axios";

const API_BASE = "https://agrisphere-backend-xs0w.onrender.com";

// REGISTER
export const registerUser = async (formData) => {
  const res = await axios.post(
    `${API_BASE}/api/users/signup`,
    {
      username: formData.username,
      email: formData.email,
      password: formData.password
    }
  );
  return res.data;
};

// LOGIN (FIXED)
export const loginUser = async (formData) => {
  const res = await axios.post(
    `${API_BASE}/api/users/login`,
    {
      email: formData.email,
      password: formData.password
    }
  );
  return res.data;
};
