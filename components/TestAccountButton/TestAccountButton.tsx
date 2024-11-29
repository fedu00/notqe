"use client";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { login } from "@/redux/slices/authSlice/authSlice";
import Button from "../Button/Button";
import clientApi from "@/apiClients/clientApi";

const TEST_USER_ACCOUNT = {
  email: "test4@test4.pl",
  password: "test4",
};

export default function TestAccountButton() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLoginTestAccount = async () => {
    try {
      const user = await clientApi.post("/users/login", TEST_USER_ACCOUNT);
      if (user) {
        const userID = user.data.userID;
        router.push(`/profile/${userID}`);
        dispatch(login());
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
