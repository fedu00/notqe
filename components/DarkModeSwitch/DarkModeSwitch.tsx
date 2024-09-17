"use client";
import "./DarkModeSwitch.scss";
import { FaRegMoon } from "react-icons/fa";
import { FaRegSun } from "react-icons/fa";
import { useTheme } from "@/context/themeContext";

export default function DarkModeSwitch() {
  const { darkModeTheme, toggleTheme } = useTheme();

  return (
    <div
      className={`switch-button ${
        darkModeTheme && "switch-button--dark-mode"
      } `}
      onClick={toggleTheme}
    >
      <FaRegSun
        className={"switch-button__icon-sun"}
        color={`${darkModeTheme ? "#fcbd90" : "#d0c2bd"}`}
        size={24}
      />
      <FaRegMoon
        className={"switch-button__icon-moon"}
        color={"#22252a"}
        size={24}
      />
      <div
        className={`switch-button__icon-background ${
          darkModeTheme
            ? "switch-button__icon-background--dark"
            : "switch-button__icon-background--light"
        }`}
      ></div>
    </div>
  );
}
