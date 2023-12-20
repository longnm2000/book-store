import axios from "axios";
const userToken = JSON.parse(localStorage.getItem("accessToken") || "{}");

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: "Bearer" + " " + userToken,
  },
});

export const axiosConfig = axios.create({
  baseURL: "http://localhost:3000",
});
