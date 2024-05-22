import { Inter } from "next/font/google";
import "./globals.css";
// import { ContextProvider } from "@/context/userContext";
//save this for future context

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        {/* <ContextProvider> */}
        {children}
        {/* </ContextProvider> */}
      </body>
    </html>
  );
}
