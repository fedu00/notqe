/** @type {import('next').NextConfig} */
import path from "path";

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(process.cwd(), "styles")],
    prependData: `@import 'utils/variables.scss';`,
  },
};

export default nextConfig;
