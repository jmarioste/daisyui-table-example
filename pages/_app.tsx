import "../styles/globals.css";
import type { AppProps } from "next/app";
import DrawerLayout from "../components/DrawerLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DrawerLayout>
      <Component {...pageProps} />
    </DrawerLayout>
  );
}

export default MyApp;
