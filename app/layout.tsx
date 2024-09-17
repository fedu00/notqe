import UserAuthProvider from "@/redux/UserAuthProvider";
import { ThemeProvider } from "@/context/themeContext";
import Body from "@/components/Body/Body";
import "../styles/main.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserAuthProvider>
      <ThemeProvider>
        <Body>{children}</Body>
      </ThemeProvider>
    </UserAuthProvider>
  );
}
