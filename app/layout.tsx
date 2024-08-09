import { Inter } from "next/font/google";
import "./globals.css";
import { ContextDarkModeProvider } from "@/context/userContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContextDarkModeProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body className={inter.className}>{children}</body>
      </html>
    </ContextDarkModeProvider>
  );
}
