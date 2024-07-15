import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI || "http://localhost:3001/";

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
