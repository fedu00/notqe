import { ContextDarkModeProvider } from "@/context/userContext";
import UserAuthProvider from "@/redux/UserAuthProvider";
import Body from "@/components/Body/Body";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserAuthProvider>
      <ContextDarkModeProvider>
        <Body>{children}</Body>
      </ContextDarkModeProvider>
    </UserAuthProvider>
  );
}
