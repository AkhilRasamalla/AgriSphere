// client/src/config/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000",
});

export default API;
