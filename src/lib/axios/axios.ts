import axios from "axios";
import { getCookie } from "../fetchingCookie";

export const toeflApi = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

toeflApi.interceptors.request.use(async(config) => {
  const {value : token} = await getCookie();
  if (token !== "") {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

toeflApi.interceptors.response.use((response) => {
  return response;
});
