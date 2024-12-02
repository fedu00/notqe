"use client";
import "./Body.scss";
import { useTheme } from "@/context/themeContext";
import { Inter } from "next/font/google";
import clsx from "clsx";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Body({ children }) {
  const { theme } = useTheme();
  useEffect(() => {
    document.documentElement.setAttribute("theme-mode", theme);
  }, [theme]);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={clsx(inter.className, "body")}>
        <main>{children}</main>
      </body>
    </html>
  );
}
