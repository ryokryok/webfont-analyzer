import type { AppProps } from "next/app";
import "./app.css.ts";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
