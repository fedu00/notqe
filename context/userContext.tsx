"use client";
import {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface ContextUserType {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}

const UserContext = createContext<ContextUserType>({
  email: "",
  setEmail: (): string => "",
});

export const ContextProvider = ({ children }: any) => {
  const [email, setEmail] = useState<string>("");
  return (
    <UserContext.Provider value={{ email, setEmail }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
