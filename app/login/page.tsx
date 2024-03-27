"use client";
import "./login.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";

export default function LoginPage() {
  const router = useRouter();
  const [showError, setShowError] = useState(false);
  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", user);
      router.push("/profile");
    } catch (error: any) {
      setShowError(true);
      console.log("login failed", error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login your account</h2>
      <form
        onSubmit={(e) => {
          handleLogin(e);
        }}
      >
        <Input
          type="text"
          placeholder="enter your email"
          value={user.email}
          onChange={(e) => {
            setuser({ ...user, email: e.target.value });
            setShowError(false);
          }}
          errorMessage="invalid email"
          showError={showError}
        />
        <Input
          type="text"
          placeholder="enter your password"
          value={user.password}
          onChange={(e) => {
            setuser({ ...user, password: e.target.value });
            setShowError(false);
          }}
          errorMessage="invalid email"
          showError={showError}
        />
        <Button text="log in" type="submit" />
      </form>
    </div>
  );
}
