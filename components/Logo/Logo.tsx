import "./Logo.css";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: "200",
});

interface LogoType {
  bigSize?: boolean;
}

export default function Logo({ bigSize = false }: LogoType) {
  return (
    <h1
      className={`${josefin.className}  logo_h1 ${
        bigSize ? "big_logo" : "small_logo"
      }`}
    >
      NOTQE
    </h1>
  );
}
