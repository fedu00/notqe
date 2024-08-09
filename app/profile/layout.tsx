import Menu from "@/components/Menu/Menu";
import styles from "./profile.module.css";

export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Menu />
      {children}
    </>
  );
}
