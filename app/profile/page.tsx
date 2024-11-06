import clientWithTokenApi from "@/apiClients/clientWithTokenApi";
import ProfilePageClient from "./ProfilePageClient";
import axios from "axios";
import { cookies } from "next/headers";

async function getUserDetails() {
  try {
    console.log("sprawdzam wew SSR", cookies().get("myCookie"));
    console.log("wywołuje zapytanie w stronie profilu");
    const firstResposne = await axios.get(
      "http://localhost:3000/api/users/read-cookie",
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );
    console.log("22222");
    // const response = await clientWithTokenApi.get("/users/userDetails");
    console.log("333333");
    // return response.data.data;
    return firstResposne;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("łerror");

      // throw new Error(
      //   `Failed to fetch user details: ${error.response?.status}`
      // );
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export default async function ProfilePage() {
  const user = await getUserDetails();

  return <ProfilePageClient user={"user"} />;
}
