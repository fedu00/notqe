import styles from "./Logo.module.css";
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
      className={`${josefin.className}  ${styles.logo_h1} ${
        bigSize ? styles.big_logo : styles.small_logo
      }`}
    >
      NOTQE
    </h1>
  );
}
