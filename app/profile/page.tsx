import { cookies } from "next/headers";
import ProfilePageClient from "./ProfilePageClient";
import axios from "axios";
import clientApi from "@/apiClients/clientApi";

async function getUserDetails() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  try {
    const response = await clientApi("/users/userDetails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to fetch user details: ${error.response?.status}`
      );
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export default async function ProfilePage() {
  const user = await getUserDetails();

  return <ProfilePageClient user={user} />;
}
