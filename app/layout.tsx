import UserAuthProvider from "@/redux/UserAuthProvider";
import Body from "@/components/Body/Body";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserAuthProvider>
      <Body>{children}</Body>
    </UserAuthProvider>
  );
}
