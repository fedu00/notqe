"use client";
import {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { DoneTasksType } from "@/types/doneTasksType";
import { DONE_TASKS_DATA } from "@/constans/constans";

interface ContextUserType {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  doneTasks: DoneTasksType;
  setDoneTasks: Dispatch<SetStateAction<DoneTasksType>>;
}

const UserContext = createContext<ContextUserType>({
  userId: "",
  setUserId: (): string => "",
  username: "",
  setUsername: (): string => "",
  email: "",
  setEmail: (): string => "",
  doneTasks: DONE_TASKS_DATA,
  setDoneTasks: (): DoneTasksType => DONE_TASKS_DATA,
});

export const ContextProvider = ({ children }: any) => {
  const [userId, setUserId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [doneTasks, setDoneTasks] = useState(DONE_TASKS_DATA);
  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        username,
        setUsername,
        email,
        setEmail,
        doneTasks,
        setDoneTasks,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
