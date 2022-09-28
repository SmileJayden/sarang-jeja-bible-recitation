import type { AppProps } from "next/app";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { CssBaseline, GeistProvider, Link, Page, Text } from "@geist-ui/react";
import { ReactQueryDevtools } from "react-query/devtools";
import HeadComp from "../components/head";
import { LinkPath } from "../constants/links";
import {
  PageTitle,
  subTitleByLinkPath,
  titleByLinkPath,
} from "../constants/titles";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const path = router.pathname as LinkPath;

  const title = titleByLinkPath.get(path);
  const subTitle = subTitleByLinkPath.get(path);

  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { suspense: true } } })
  );

  return (
    <GeistProvider>
      <HeadComp />
      <CssBaseline />
      <Page size={path === LinkPath.GUEST_BOARD ? "large" : "small"}>
        <Page.Header>
          {path !== LinkPath.HOME && (
            <NextLink href={"/"}>
              {/*TODO: position' fixed*/}
              <Link style={{ position: "absolute", top: 0 }}>
                <Text>{PageTitle.HOME}</Text>
              </Link>
            </NextLink>
          )}
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
  );
}

export default MyApp;
