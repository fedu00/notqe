import axios from "axios";
import { cookies } from "next/headers";
import refreshToken from "@/helpers/refreshToken";
import { validateTokenExpiry } from "@/helpers/validateTokenExpiry";

const clientWithTokenApi = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Credentials": "true",
  },
  withCredentials: true,
  timeout: 30000,
});

clientWithTokenApi.interceptors.request.use(
  async (config) => {
    const token = cookies().get("token")?.value;
    if (token) {
      const isTokenExpired = validateTokenExpiry(token);
      if (!isTokenExpired) {
        config.headers["authorization"] = `Bearer ${token}`;
      } else {
        const refreshedToken = await refreshToken();
        config.headers["authorization"] = `Bearer ${refreshedToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default clientWithTokenApi;
