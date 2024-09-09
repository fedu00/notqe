"use client";
import "./mainPage.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "@/context/themeContext";
import { login } from "@/redux/store/authSlice";
import Button from "@/components/Button/Button";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const TEST_USER_ACCOUNT = {
  email: "test4@test4.pl",
  password: "test4",
};

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { darkModeTheme } = useTheme();

  const dispatch = useDispatch();

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
    <div className={`main_page_container ${darkModeTheme && "dark_mode_bgc"} `}>
      {isLoading ? (
        <ClipLoader
          color={"#ffa868"}
          loading={true}
          size={60}
          speedMultiplier={0.4}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div className={"button_container"}>
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
            test={true}
            onClick={handleLoginTestAccount}
          />
        </div>
      )}
    </div>
  );
}
