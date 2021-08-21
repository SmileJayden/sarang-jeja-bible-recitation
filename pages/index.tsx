import { ReactNode, Suspense } from "react";
import NextLink, { LinkProps } from "next/link";
import dynamic from "next/dynamic";
import {
  Card,
  Grid,
  Text,
  Link,
  Page,
  Divider,
  Loading as GeistLoading,
} from "@geist-ui/react";
import { LinkPath } from "../constants/links";
const FirstPost = dynamic(() => import("../components/first-post"));

type LinkCard = {
  label: string;
  description: string | ReactNode;
  linkProps: LinkProps;
};

const linkCards: LinkCard[] = [
  {
    label: "📖 전체 말씀",
    description: "전체 말씀 보기",
    linkProps: {
      href: { pathname: LinkPath.ALL_VERSES },
    },
  },
  {
    label: "🌈 주차별로 보기 ",
    description: "제자 훈련 주차별로 보기",
    linkProps: {
      href: { pathname: LinkPath.BY_WEEK },
    },
  },
  {
    label: "☝️ 한 말씀씩 시험",
    description: "한 말씀씩 무작위로 외워보기",
    linkProps: {
      href: { pathname: LinkPath.TEST_RANDOM_EACH },
    },
  },
  {
    label: "📝 전체 말씀 시험",
    description: "전체 말씀 외워보기",
    linkProps: {
      href: { pathname: LinkPath.TEST_ALL },
    },
  },
  {
    label: "📝 모의 시험",
    description: "전체 말씀 중 무작위로 20개 풀어보기",
    linkProps: {
      href: { pathname: LinkPath.TEST_ALL, query: { count: 20 } },
    },
  },
  {
    label: "📜 방명록",
    description: <FirstPost />,
    linkProps: {
      href: { pathname: LinkPath.GUEST_BOARD },
    },
  },
];

function Loading() {
  return (
    <div style={{ marginTop: "1rem", height: "26px" }}>
      <GeistLoading />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Page.Content className={"contents-main"}>
        <Grid.Container gap={3}>
          {linkCards.map(({ description, label, linkProps }, i) => (
            <Grid xs={24} sm={12} key={`link-card-${i}`}>
              <NextLink {...linkProps}>
                <Link style={{ width: "100%" }}>
                  <Card shadow width={"100%"}>
                    <Text h3>{label} &rarr;</Text>
                    {typeof description === "string" ? (
                      <Text p>{description}</Text>
                    ) : (
                      <Suspense fallback={<Loading />}>
                        <FirstPost />
                      </Suspense>
                    )}
                  </Card>
                </Link>
              </NextLink>
            </Grid>
          ))}
        </Grid.Container>
      </Page.Content>
      <Page.Footer style={{ textAlign: "center" }}>
        <Divider />
        <Text p>
          Made by
          <Link
            href="https://github.com/smilejayden"
            target="_blank"
            rel="noopener noreferrer"
            color
            style={{ marginLeft: "8px" }}
          >
            <Text span>SmileJayden</Text>
            <Text span style={{ marginLeft: 4 }}>
              🙂
            </Text>
          </Link>
        </Text>
      </Page.Footer>
    </>
  );
}
