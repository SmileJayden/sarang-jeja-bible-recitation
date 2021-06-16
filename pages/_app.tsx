import "../styles/globals.css";
import { GeistProvider, CssBaseline } from "@geist-ui/react";
import HeadComp from "../components/head";

function MyApp({ Component, pageProps }) {
  return (
    <GeistProvider>
      <HeadComp />
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  );
}

export default MyApp;
