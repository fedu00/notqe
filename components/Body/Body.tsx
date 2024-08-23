"use client";
import { Inter } from "next/font/google";
import "./Body.css";
import Menu from "../Menu/Menu";
import { useDarkModeContext } from "@/context/userContext";

const inter = Inter({ subsets: ["latin"] });

export default function Body({ children }) {
  const { darkMode } = useDarkModeContext();
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className} ${darkMode && "body_dark"}`}>
        <Menu />
        <main>{children}</main>
      </body>
    </html>
  );
}
