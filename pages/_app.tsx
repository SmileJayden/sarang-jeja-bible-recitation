import "../styles/globals.scss";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { CssBaseline, GeistProvider, Link, Page, Text } from "@geist-ui/react";
import HeadComp from "../components/head";
import { LinkPath } from "../constants/links";
import {
  PageTitle,
  subTitleByLinkPath,
  titleByLinkPath,
} from "../constants/titles";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const path = router.pathname as LinkPath;

  const title = titleByLinkPath.get(path);
  const subTitle = subTitleByLinkPath.get(path);

  return (
    <GeistProvider>
      <HeadComp />
      <CssBaseline />
      <Page size={"small"}>
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
        <Component {...pageProps} />
      </Page>
    </GeistProvider>
  );
}

export default MyApp;
