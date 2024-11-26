import clientApi from "@/apiClients/clientApi";
import { cookies } from "next/headers";

export default async function refreshToken() {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;
    if (!refreshToken) {
      return { failedRefreshToken: true, error: "Token refresh failed." };
    }
    const newToken = await clientApi.post(
      "/users/auth/refresh",
      { refreshToken },
      {
        withCredentials: true,
      }
    );
    return newToken.data.newAccessToken;
  } catch (error) {
    return { failedRefreshToken: true, error: "Token refresh failed." };
  }
}
