import axios from "axios";

export const createClientApiWithToken = (token) => {
  const clientWithTokenApi = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  clientWithTokenApi.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      config.withCredentials = true;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return clientWithTokenApi;
};
