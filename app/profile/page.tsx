import { cookies } from "next/headers";
import { createClientApiWithToken } from "@/apiClients/createClientApiWithToken";
import ProfilePageClient from "./ProfilePageClient";
import axios from "axios";

async function getUserDetails() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const clientWithTokenApi = createClientApiWithToken(token);
  try {
    const response = await clientWithTokenApi.get("/users/userDetails");
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
