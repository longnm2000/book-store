import axios from "axios";
const userToken = JSON.parse(localStorage.getItem("accessToken") || "{}");

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: "Bearer" + " " + userToken,
  },
});

export const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
