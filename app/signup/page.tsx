"use client";
import "./signup.css";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: "400",
});

export default function SignUpPage() {
  const router = useRouter();
  const [showError, setShowError] = useState({
    email: false,
    password: false,
  });
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSignup = async (e: any) => {
    e.preventDefault();
    if (user.email.length > 0 && user.password.length > 0) {
      try {
        const response = await axios.post("/api/users/signup", user);
        console.log("signup success", response);
        router.push("/login");
      } catch (error: any) {
        setShowError({ ...showError, email: true });
        console.log("signup error", error.message);
      }
    } else {
      setShowError({ email: true, password: true });
    }
  };
  return (
    <div className="signup-container">
      <h1 className={josefin.className}>NOTQE</h1>
      <h2>Create Account</h2>
      <form
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup(e);
        }}
      >
        <Input
          type="text"
          value={user.email}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
            setShowError({ ...showError, email: false });
          }}
          placeholder="email"
          showError={showError.email}
          errorMessage="wrong email"
        />
        <Input
          type="password"
          value={user.password}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
            setShowError({ ...showError, password: false });
          }}
          errorMessage="wrong password"
          placeholder="password"
          showError={showError.password}
        />
        <Button type="submit" text="create account" />
        <Button text="try test account" test={true} />
      </form>
    </div>
  );
}
