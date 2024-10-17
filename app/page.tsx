"use client";
import "./mainPage.scss";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { login } from "@/redux/slices/authSlice/authSlice";
import Button from "@/components/Button/Button";
import axios from "axios";
import Loader from "@/components/Loader/Loader";

const TEST_USER_ACCOUNT = {
  email: "test4@test4.pl",
  password: "test4",
};

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const handleLoginTestAccount = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/login", TEST_USER_ACCOUNT);
      router.push("/profile");
      dispatch(login());
    } catch (error: any) {
      setIsLoading(false);
      console.log("login failed", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="main-page">
          <Button
            text="sign up"
            onClick={() => {
              router.push("/signup");
            }}
          />
          <Button
            text="log in"
            onClick={() => {
              router.push("/login");
            }}
          />
          <Button
            text="try test account"
            grayButton={true}
            onClick={handleLoginTestAccount}
          />
        </div>
      )}
    </div>
  );
}
