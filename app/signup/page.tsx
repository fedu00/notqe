"use client";
import "./signup.css";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/helpers/validateEmail";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import axios from "axios";
import Logo from "@/components/Logo/Logo";

type FullUserType = {
  username: string;
  email: string;
  password: string;
};
type UserErrorType = {
  username: boolean;
  email: boolean;
  password: boolean;
};

export default function SignUpPage() {
  const router = useRouter();
  const [showError, setShowError] = useState<UserErrorType>({
    username: false,
    email: false,
    password: false,
  });
  const [user, setUser] = useState<FullUserType>({
    username: "",
    email: "",
    password: "",
  });

  const handleSignup = async (event: FormEvent) => {
    event.preventDefault();

    const emailValidation: boolean = validateEmail(user.email);
    const passwordValidation: boolean = user.password.length >= 4;
    const usernameValidation: boolean = user.username.length >= 4;

    if (emailValidation && passwordValidation && usernameValidation) {
      try {
        const response = await axios.post("/api/users/signup", user);
        console.log("signup success", response);
        router.push("/login");
      } catch (error: any) {
        setShowError({ ...showError, email: true });
        console.log("signup error", error.message);
      }
    } else {
      setShowError({ username: true, email: true, password: true });
    }
  };
  return (
    <div className="signup-container">
      <Logo bigSize={true} />
      <h2>Create Account</h2>
      <form
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();
          handleSignup(event);
        }}
      >
        <Input
          type="text"
          value={user.username}
          onChange={(event) => {
            setUser({ ...user, username: event.target.value });
            setShowError({ ...showError, username: false });
          }}
          placeholder="username"
          showError={showError.username}
          errorMessage="wrong username"
        />
        <Input
          type="text"
          value={user.email}
          onChange={(event) => {
            setUser({ ...user, email: event.target.value });
            setShowError({ ...showError, email: false });
          }}
          placeholder="email"
          showError={showError.email}
          errorMessage="wrong email"
        />
        <Input
          type="password"
          value={user.password}
          onChange={(event) => {
            setUser({ ...user, password: event.target.value });
            setShowError({ ...showError, password: false });
          }}
          errorMessage="wrong password"
          placeholder="password"
          showError={showError.password}
        />
        <Button type="submit" text="create account" />
      </form>
    </div>
  );
}
