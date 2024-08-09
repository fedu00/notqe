"use client";
import {
  useContext,
  createContext,
  useState,
  Dispatch,
  // useEffect,
  SetStateAction,
} from "react";

interface DarkModeContexType {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

const DarkModeContext = createContext<DarkModeContexType>({
  darkMode: false,
  setDarkMode: (): string => "",
});

export const ContextDarkModeProvider = ({ children }: any) => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  //do it only with optimization
  // useEffect(() => {
  //   const getBrowserTheme = window.matchMedia(
  //     "(prefers-color-scheme: dark)"
  //   ).matches;
  //   setDarkMode(getBrowserTheme);
  // }, []);

  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkModeContext = () => useContext(DarkModeContext);
