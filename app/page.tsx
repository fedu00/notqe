import "./mainPage.scss";
import Link from "next/link";
import TestAccountButton from "@/components/TestAccountButton/TestAccountButton";
import ThemeWrapper from "@/components/ThemeWrapper/ThemeWrapper";

export default function Home() {
  return (
    <ThemeWrapper>
      <div className="button-wrapper">
        <Link className="button-wrapper__link" href="/signup">
          sign up
        </Link>
        <Link className="button-wrapper__link" href="/login">
          log in
        </Link>
        <TestAccountButton />
      </div>
    </ThemeWrapper>
  );
}
