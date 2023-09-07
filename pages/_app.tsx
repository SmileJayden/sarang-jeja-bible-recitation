import type { AppProps, NextWebVitalsMetric } from "next/app";
import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
  DehydratedState,
} from "react-query";
import { useRouter } from "next/router";
import { CssBaseline, GeistProvider, Page, Text } from "@geist-ui/react";
import { ReactQueryDevtools } from "react-query/devtools";
import { GoogleAnalytics, event } from "nextjs-google-analytics";
import HeadComp from "../components/head";
import { LinkPath } from "../constants/links";
import { subTitleByLinkPath, titleByLinkPath } from "../constants/titles";
import "../styles/globals.scss";
import Caption from "../components/caption";

export function reportWebVitals({
  id,
  name,
  label,
  value,
}: NextWebVitalsMetric) {
  event(name, {
    category: label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
    value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
    label: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate.
  });
}

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
  const router = useRouter();
  const path = router.pathname as LinkPath;

  const title = titleByLinkPath.get(path);
  const subTitle = subTitleByLinkPath.get(path);

  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { suspense: true } } })
  );

  return (
    <>
      <GoogleAnalytics trackPageViews />
      <GeistProvider>
        <HeadComp />
        <CssBaseline />
        <Page size={path === LinkPath.GUEST_BOARD ? "large" : "small"}>
          <Page.Header>
            {path !== LinkPath.HOME && <Caption />}
            <Text h2 style={{ textAlign: "center" }}>
              {title}
            </Text>
            {subTitle && (
              <Text h4 style={{ textAlign: "center" }}>
                {subTitle}
              </Text>
            )}
          </Page.Header>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
            {typeof window !== undefined && <ReactQueryDevtools />}
          </QueryClientProvider>
        </Page>
      </GeistProvider>
    </>
  );
}
