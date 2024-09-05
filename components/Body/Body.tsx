"use client";
import { Inter } from "next/font/google";
import "./Body.css";
import Menu from "../Menu/Menu";
import { useTheme } from "@/context/themeContext";

const inter = Inter({ subsets: ["latin"] });

export default function Body({ children }) {
  const { darkModeTheme } = useTheme();
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className} ${darkModeTheme && "body_dark"}`}>
        <Menu />
        <main>{children}</main>
      </body>
    </html>
  );
}
