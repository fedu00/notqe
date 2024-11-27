import "./mainPage.scss";
import Link from "next/link";
import TestAccountButton from "@/components/TestAccountButton/TestAccountButton";
import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch";

export default function Home() {
  return (
    <div className="main-page">
      <ThemeSwitch positionFix={true} />
      <div className="main-page__button-wrapper">
        <Link className="main-page__link" href="/signup">
          sign up
        </Link>
        <Link className="main-page__link" href="/login">
          log in
        </Link>
        <TestAccountButton />
      </div>
    </div>
  );
}
