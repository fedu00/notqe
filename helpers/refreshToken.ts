import axios from "axios";
import { cookies } from "next/headers";

export default async function refreshToken() {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;
    const newToken = await axios.post(
      "http://localhost:3000/api/users/auth/refresh",
      { refreshToken: refreshToken },
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );
    return newToken.data.newAccessToken;
  } catch (error) {
    throw new Error("We can not refresh your token");
  }
}
