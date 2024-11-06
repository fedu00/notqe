import axios from "axios";
import { cookies } from "next/headers";

let isRefreshing = false; // Flaga informująca, czy trwa odświeżanie tokena
let refreshSubscribers = []; // Lista żądań oczekujących na odświeżenie tokena

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

// function onRefreshed(token) {
//   refreshSubscribers.forEach((cb) => cb(token));
//   refreshSubscribers = [];
// }

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
  (config) => {
    const token = cookies().get("token")?.value;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor odpowiedzi, który obsługuje błąd 401 i odświeża token
clientWithTokenApi.interceptors.response.use(
  (response) => response, // Jeśli odpowiedź jest prawidłowa, zwraca ją bez zmian
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;
    originalRequest._retry = originalRequest._retry || false;

    // Sprawdź, czy odpowiedź zwróciła błąd 401 (brak autoryzacji)
    if (response.status === 401 && !originalRequest._retry) {
      if (!isRefreshing) {
        isRefreshing = true;
        originalRequest._retry = true;
        try {
          const refreshToken = cookies().get("refreshToken")?.value;
          console.log("refreshToken in axios", refreshToken);

          // console.log("==============================================");
          // console.log("sprawdzam nowego cookies", cookies().get("testToken"));

          await axios.post(
            "http://localhost:3000/api/users/auth/refresh",
            {
              // "Access-Control-Allow-Origin": "http://localhost:3000",
              // "Access-Control-Allow-Credentials": "true",
            },
            {
              withCredentials: true,
              headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
              },
            }
          );
          // console.log("3.5");

          return clientWithTokenApi(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          return Promise.reject(refreshError); // Jeśli odświeżenie się nie uda, zwraca błąd
        }
      }

      // Oczekiwanie na nowy token przed ponownym wywołaniem żądania
      return new Promise((resolve) => {
        console.log("4");
        subscribeTokenRefresh((newToken) => {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          resolve(clientWithTokenApi(originalRequest));
        });
      });
    }
    return Promise.reject(error); // Zwrot pierwotnego błędu, jeśli nie jest to 401
  }
);

export default clientWithTokenApi;
