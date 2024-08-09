"use client";
import styles from "./SwitchMode.module.css";
import MoonSvg from "../imagesComponents/MoonSvg";
import SunSvg from "../imagesComponents/SunSvg";
import { useDarkModeContext } from "@/context/userContext";

export default function SwitchMode() {
  const { darkMode, setDarkMode } = useDarkModeContext();

  return (
    <button
      className={`${styles.switch_btn} ${darkMode && styles.dark_btn} `}
      onClick={() => {
        setDarkMode(!darkMode);
      }}
    >
      <SunSvg className={styles.switch_btn_svg} darkMode={darkMode} />
      <MoonSvg className={styles.switch_btn_svg} />
      <div
        className={`${styles.icon_background} ${
          darkMode ? styles.dark : styles.light
        }`}
      ></div>
    </button>
  );
}
