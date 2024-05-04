"use client";
import "./globals.css";
import "./mainPage.css";
import Button from "@/components/Button/Button";
import Logo from "@/components/Logo/Logo";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const router = useRouter();

  const handleLoginTestAccount = async () => {
    const user = {
      email: "test@test.com",
      password: "test",
    };
    try {
      const response = await axios.post("/api/users/login", user);
      router.push("/profile");
    } catch (error: any) {
      console.log("login failed", error.message);
    }
  };

  return (
    <main className="main_page_container">
      <Logo bigSize={true} />
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
      </div>
      <Button
        text="try test account"
        test={true}
        onClick={handleLoginTestAccount}
      />
    </main>
  );
}
