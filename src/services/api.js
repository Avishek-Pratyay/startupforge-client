import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
    baseURL: import.meta.env.VITE_API_URL,

  withCredentials: true,
});

export default api;