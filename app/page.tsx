"use client";
import "./mainPage.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { login } from "@/redux/store/authSlice";
import Button from "@/components/Button/Button";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { ui } = useSelector((state: RootState) => state);
  const { darkModeTheme } = ui;

  const handleLoginTestAccount = async () => {
    const user = {
      email: "test4@test4.pl",
      password: "test4",
    };

    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/login", user);
      router.push("/profile");
      dispatch(login());
    } catch (error: any) {
      setIsLoading(false);
      console.log("login failed", error.message);
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
