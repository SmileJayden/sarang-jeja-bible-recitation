import Link, { LinkProps } from "next/link";
import { Card, Grid } from "@geist-ui/react";

type LinkCard = {
  label: string;
  description: string;
  linkProps: LinkProps;
};

const linkCards: LinkCard[] = [
  {
    label: "📖 전체 말씀",
    description: "전체 말씀 보기",
    linkProps: {
      href: { pathname: "/all-verses" },
    },
  },
  {
    label: "🌈 주차 별로 보기 ",
    description: "제자 훈련 주차 별로 보기",
    linkProps: {
      href: { pathname: "/by-week" },
    },
  },
  {
    label: "☝️ 한 말씀 씩 시험",
    description: "한 말씀 씩 무작위로 외워보기",
    linkProps: {
      href: { pathname: "/test-random-each" },
    },
  },
  {
    label: "📝 전체 말씀 시험",
    description: "전체 말씀 외워보기",
    linkProps: {
      href: { pathname: "/test-all" },
    },
  },
  {
    label: "📝 모의 시험",
    description: "전체 말씀 중 무작위로 20개 풀어보기",
    linkProps: {
      href: { pathname: "/test-all", query: { count: 20 } },
    },
  },
  {
    label: "📜 방명록",
    description: "방명록 쓰러가기",
    linkProps: {
      href: { pathname: "/guest-board" },
    },
  },
];

export default function Home() {
  return (
    <>
      <main>
        <h1>💒 사랑의 교회 제자훈련️❤️</h1>
        <p>
          대학 4부 제자훈련 <br /> 암송시험 준비 홈페이지
        </p>
        <div>
          <Grid.Container gap={1}>
            {linkCards.map((card, i) => (
              <Grid xs={12}>
                <Link key={`link-card-${i}`} {...card.linkProps}>
                  <a>
                    <Card shadow width={"400px"}>
                      <h2>{card.label} &rarr;</h2>
                      <p>{card.description}</p>
                    </Card>
                  </a>
                </Link>
              </Grid>
            ))}
          </Grid.Container>
        </div>
      </main>
      <footer>
        <a
          href="mailto:wkdwodud07@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by
          <span>SmileJayden</span>
          <span style={{ marginLeft: 4 }}>🙂</span>
        </a>
      </footer>
    </>
  );
}
