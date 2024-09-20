"use client";
import "./Body.scss";
import { useTheme } from "@/context/themeContext";
import { Inter } from "next/font/google";
import clsx from "clsx";
import Menu from "../Menu/Menu";

const inter = Inter({ subsets: ["latin"] });

export default function Body({ children }) {
  const { darkModeTheme } = useTheme();

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={clsx(inter.className, "body", darkModeTheme && "dark-mode")}
      >
        <Menu />
        <main>{children}</main>
      </body>
    </html>
  );
}
