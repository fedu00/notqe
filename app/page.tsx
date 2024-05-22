"use client";
import "./globals.css";
import "./mainPage.css";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import Logo from "@/components/Logo/Logo";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoginTestAccount = async () => {
    const user = {
      email: "test@test.com",
      password: "test",
    };
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/login", user);
      router.push("/profile");
    } catch (error: any) {
      setIsLoading(false);
      console.log("login failed", error.message);
    }
  };

  return (
    <main className="main_page_container">
      <Logo bigSize={true} />
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
        <div className="button_container">
          <Button
            text="signup"
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
    </main>
  );
}
