import "./layoutStyles.scss";
import Menu from "@/components/Menu/Menu";

export default function DashboardLayout({ children, params }) {
  const { id } = params;
  return (
    <div className="dashboard">
      <Menu id={id} />
      <main>{children}</main>
    </div>
  );
}
