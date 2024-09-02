"use client";
import "./login.css";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/helpers/validateEmail";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/store/authSlice";
import axios from "axios";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
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
  const dispatch = useDispatch();
  const { ui } = useSelector((state: RootState) => state);
  const { darkModeTheme } = ui;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    const emailValidation: boolean = validateEmail(user.email);
    const passwordValidation: boolean = user.password.length >= 4;

    if (emailValidation && passwordValidation) {
      try {
        setIsLoading(true);
        const response = await axios.post("/api/users/login", user);
        router.push("/profile");
        dispatch(login());
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
      className={`login_container ${darkModeTheme && "login_container_dark"} `}
    >
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
          className={"login_container_form"}
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
      )}
    </div>
  );
}
