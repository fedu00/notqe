import clientWithTokenApi from "@/apiClients/clientWithTokenApi";
import axios from "axios";

export async function getUserDetails() {
  try {
    const response = await clientWithTokenApi.get("/users/userDetails");
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("getUserDetails ---> ERROR");
      throw new Error(
        `Failed to fetch user details: ${error.response?.status}`
      );
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
