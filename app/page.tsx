"use client";
import "./mainPage.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDarkModeContext } from "@/context/userContext";
import { useDispatch } from "react-redux";
import { logIn } from "@/redux/authSlice";
import Button from "@/components/Button/Button";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { darkMode } = useDarkModeContext();
  const dispatch = useDispatch();

  const handleLoginTestAccount = async () => {
    const user = {
      email: "test@test.com",
      password: "test",
    };

    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/login", user);
      router.push("/profile");
      dispatch(logIn());
    } catch (error: any) {
      setIsLoading(false);
      console.log("login failed", error.message);
    }
  };

  return (
    <div className={`${"main_page_container"} ${darkMode && "dark_mode_bgc"} `}>
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
