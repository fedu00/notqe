"use client";
import { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  darkModeTheme: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  darkModeTheme: true,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [darkModeTheme, setDarkModeTheme] = useState(false);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkModeTheme(prefersDarkMode);
  }, []);

  const toggleTheme = () => {
    setDarkModeTheme((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkModeTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
