import type { AppProps } from "next/app";
import "../styles/app.css.ts";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
