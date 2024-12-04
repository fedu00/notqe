import clientWithTokenApi from "@/apiClients/clientWithTokenApi";

export async function getUserDetails() {
  try {
    const { data } = await clientWithTokenApi.get("/users/userDetails");
    return data.data;
  } catch (error) {
    console.log("getUserDetails error");
    return error;
  }
}
