"use client";
import { Inter } from "next/font/google";
import "./Body.css";
import Menu from "../Menu/Menu";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const inter = Inter({ subsets: ["latin"] });

export default function Body({ children }) {
  const { ui } = useSelector((state: RootState) => state);
  const { darkModeTheme } = ui;
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className} ${darkModeTheme && "body_dark"}`}>
        <Menu />
        <main>{children}</main>
      </body>
    </html>
  );
}