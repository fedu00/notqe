import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: "200",
});

interface LogoType {
  size?: number;
}

export default function Logo({ size }: LogoType) {
  return (
    <h1 style={{ fontSize: size + "px" }} className={josefin.className}>
      NOTQE
    </h1>
  );
}
