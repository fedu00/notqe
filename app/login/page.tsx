"use client";
import styles from "./login.module.css";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/helpers/validateEmail";
import { useDarkModeContext } from "@/context/userContext";
import SwitchMode from "@/components/SwitchMode/SwitchMode";
import axios from "axios";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Logo from "@/components/Logo/Logo";
import ClipLoader from "react-spinners/ClipLoader";

type UserType = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [showError, setShowError] = useState<boolean>(false);
  const [user, setuser] = useState<UserType>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { darkMode } = useDarkModeContext();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    const emailValidation: boolean = validateEmail(user.email);
    const passwordValidation: boolean = user.password.length >= 4;

    if (emailValidation && passwordValidation) {
      try {
        setIsLoading(true);
        const response = await axios.post("/api/users/login", user);
        router.push("/profile");
      } catch (error: any) {
        setIsLoading(false);
        setShowError(true);
        console.log("login failed", error.message);
      }
    } else {
      setShowError(true);
    }
  };

  return (
    <div
      className={`${styles.login_container} ${
        darkMode && styles.login_container_dark
      } `}
    >
      <SwitchMode />
      <Logo bigSize={true} />
      <h2>Login your account</h2>
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
        <form
          className={styles.login_container_form}
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
            darkMode={darkMode}
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
            darkMode={darkMode}
          />
          <Button text="log in" type="submit" />
        </form>
      )}
    </div>
  );
}
