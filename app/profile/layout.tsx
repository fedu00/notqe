import Menu from "@/components/Menu/Menu";

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
