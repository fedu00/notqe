"use client";
import "./signup.scss";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/helpers/validateEmail";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import clientApi from "@/apiClients/clientApi";
import Loader from "@/components/Loader/Loader";
import Form from "@/components/Form/Form";
import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch";

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
  const [isLoading, setIsLoading] = useState(false);

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
        const response = await clientApi.post("/users/signup", user);
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
    <div className="signup">
      <ThemeSwitch positionFix={true} />
      <h2>Create Account</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <Form
          autoComplete={false}
          onSubmit={(event) => {
            event.preventDefault();
            handleSignup(event);
          }}
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
        </Form>
      )}
    </div>
  );
}
