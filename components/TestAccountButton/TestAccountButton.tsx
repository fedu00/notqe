"use client";
import { useRouter } from "next/navigation";
import Button from "../Button/Button";
import clientApi from "@/apiClients/clientApi";

const TEST_USER_ACCOUNT = {
  email: "test4@test4.pl",
  password: "test4",
};

export default function TestAccountButton() {
  const router = useRouter();

  const handleLoginTestAccount = async () => {
    try {
      const loggingUser = await clientApi.post(
        "/users/login",
        TEST_USER_ACCOUNT
      );
      if (loggingUser) {
        const userID = loggingUser.data.userID;
        router.push(`/profile/${userID}`);
      }
    } catch (error: any) {
      console.log("login failed", error.message);
    } finally {
    }
  };
  return (
    <Button
      text="try test account"
      grayButton
      onClick={handleLoginTestAccount}
    />
  );
}
