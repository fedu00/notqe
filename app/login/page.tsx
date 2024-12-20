"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/helpers/validateEmail";
import clientApi from "@/apiClients/clientApi";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Loader from "@/components/Loader/Loader";
import Form from "@/components/Form/Form";
import ThemeWrapper from "@/components/ThemeWrapper/ThemeWrapper";

type UserType = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [showError, setShowError] = useState(false);
  const [user, setUser] = useState<UserType>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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
        const loggingUser = await clientApi.post("/users/login", user);
        if (loggingUser) {
          const userID = loggingUser.data.userID;
          router.push(`/profile/${userID}`);
        }
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
    <ThemeWrapper directionColumn>
      <h2>Login your account</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <Form onSubmit={handleLogin}>
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
        </Form>
      )}
    </ThemeWrapper>
  );
}
