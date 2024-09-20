"use client";
import "./login.scss";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/helpers/validateEmail";
import { useDispatch } from "react-redux";
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
  const [user, setUser] = useState<UserType>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleOnChange =
    (field: keyof UserType) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setUser((prev) => ({ ...prev, [field]: event.target.value }));
      setShowError(false);
    };

  const validateUserCredentials = (): boolean => {
    return validateEmail(user.email) && user.password.length >= 4;
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    if (validateUserCredentials()) {
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
    <div className="login_container">
      <h2>Login your account</h2>
      {isLoading ? (
        <ClipLoader
          color="#ffa868"
          loading={true}
          size={60}
          speedMultiplier={0.4}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <form onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="enter your email"
            value={user.email}
            onChange={handleOnChange("email")}
            errorMessage="invalid email"
            showError={showError}
          />
          <Input
            type="password"
            placeholder="enter your password"
            value={user.password}
            onChange={handleOnChange("password")}
            errorMessage="invalid password"
            showError={showError}
          />
          <Button text="log in" type="submit" />
        </form>
      )}
    </div>
  );
}
