"use client";
import "./signup.css";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/helpers/validateEmail";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnChange =
    (field: keyof FullUserType) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUser((prev) => ({ ...prev, [field]: event.target.value }));
      setShowError((prev) => ({ ...prev, [field]: false }));
    };

  const usernameValidation = user.username.length >= 4;
  const emailValidation = validateEmail(user.email);
  const passwordValidation = user.password.length >= 4;

  const validateUserCredentials = (): boolean => {
    return usernameValidation && emailValidation && passwordValidation;
  };

  const checkUserSignupValidation = () => {
    setShowError({
      username: !usernameValidation,
      email: !emailValidation,
      password: !passwordValidation,
    });
  };

  const handleSignup = async (event: FormEvent) => {
    event.preventDefault();

    if (validateUserCredentials()) {
      try {
        setIsLoading(true);
        const response = await axios.post("/api/users/signup", user);
        console.log("signup success", response);
        router.push("/login");
      } catch (error: any) {
        setIsLoading(false);
        setShowError({ ...showError, email: true });
        console.log("signup error", error.message);
      }
    } else {
      checkUserSignupValidation();
    }
  };
  return (
    <div className={"signup_container"}>
      <h2>Create Account</h2>
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
          autoComplete="off"
          onSubmit={(event) => {
            event.preventDefault();
            handleSignup(event);
          }}
          className="signup_container_form"
        >
          <Input
            type="text"
            value={user.username}
            onChange={handleOnChange("username")}
            placeholder="username"
            showError={showError.username}
            errorMessage="wrong username"
          />
          <Input
            type="text"
            value={user.email}
            onChange={handleOnChange("email")}
            placeholder="email"
            showError={showError.email}
            errorMessage="wrong email"
          />
          <Input
            type="password"
            value={user.password}
            onChange={handleOnChange("password")}
            errorMessage="wrong password"
            placeholder="enter your password"
            showError={showError.password}
          />
          <Button type="submit" text="create account" />
        </form>
      )}
    </div>
  );
}
