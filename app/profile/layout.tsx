import Menu from "@/components/Menu/Menu";
import "./profile.css";

export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Menu />
      <main>{children}</main>
    </>
  );
}
