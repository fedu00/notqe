"use client";
import "./globals.css";
import { Josefin_Sans } from "next/font/google";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import axios from "axios";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: "300",
});

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
    <main>
      <h1 className={josefin.className}>NOTQE</h1>
      <div>
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
    </main>
  );
}
