"use client";
import "./login.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/helpers/validateEmail";
import axios from "axios";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Logo from "@/components/Logo/Logo";

export default function LoginPage() {
  const router = useRouter();
  const [showError, setShowError] = useState(false);
  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (event: any) => {
    event.preventDefault();

    const emailValidation = validateEmail(user.email);
    const passwordValidation = user.password.length >= 4;

    if (emailValidation && passwordValidation) {
      try {
        const response = await axios.post("/api/users/login", user);
        router.push("/profile");
      } catch (error: any) {
        setShowError(true);
        console.log("login failed", error.message);
      }
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="login-container">
      <Logo bigSize={true} />
      <h2>Login your account</h2>
      <form
        onSubmit={(event) => {
          handleLogin(event);
        }}
      >
        <Input
          type="text"
          placeholder="enter your email"
          value={user.email}
          onChange={(event) => {
            setuser({ ...user, email: event.target.value });
            setShowError(false);
          }}
          errorMessage="invalid email"
          showError={showError}
        />
        <Input
          type="text"
          placeholder="enter your password"
          value={user.password}
          onChange={(event) => {
            setuser({ ...user, password: event.target.value });
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
