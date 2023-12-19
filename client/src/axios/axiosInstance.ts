import axios from "axios";
const userToken = JSON.parse(localStorage.getItem("accessToken") || "{}");

export const axiosInstance = axios.create({
  headers: {
    Authorization: "Bearer" + " " + userToken,
  },
});
