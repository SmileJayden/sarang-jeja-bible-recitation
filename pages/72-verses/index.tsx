import NextLink, { LinkProps } from "next/link";
import { Card, Grid, Text, Link, Page } from "@geist-ui/react";

type TopicCard = {
  label: string;
  description: string;
  linkProps: LinkProps;
};

const topicCards: TopicCard[] = [
  {
    label: "A. 새로운 삶",
    description: "새로운 삶에 대한 말씀",
    linkProps: {
      href: { pathname: "/72-verses/new-life" },
    },
  },
  {
    label: "B. 그리스도를 전파함",
    description: "그리스도를 전파함에 대한 말씀",
    linkProps: {
      href: { pathname: "/72-verses/proclaim-christ" },
    },
  },
  {
    label: "C. 하나님을 의뢰함",
    description: "하나님을 의뢰함에 대한 말씀",
    linkProps: {
      href: { pathname: "/72-verses/rely-on-god" },
    },
  },
  {
    label: "D. 그리스도 제자의 자격",
    description: "그리스도 제자의 자격에 대한 말씀",
    linkProps: {
      href: { pathname: "/72-verses/disciple-qualification" },
    },
  },
  {
    label: "E. 그리스도를 닮아감",
    description: "그리스도를 닮아감에 대한 말씀",
    linkProps: {
      href: { pathname: "/72-verses/be-like-christ" },
    },
  },
  {
    label: "F. 온전한 인격",
    description: "온전한 인격에 대한 말씀",
    linkProps: {
      href: { pathname: "/72-verses/complete-character" },
    },
  },
];

function Verses72() {
  return (
    <Page.Content className={"contents-main"}>
      <Grid.Container gap={3}>
        {topicCards.map(({ description, label, linkProps }, i) => (
          <Grid xs={24} sm={12} key={`topic-card-${i}`}>
            <NextLink {...linkProps}>
              <Link style={{ width: "100%" }}>
                <Card shadow width={"100%"}>
                  <Text h3>{label} &rarr;</Text>
                  <Text p>{description}</Text>
                </Card>
              </Link>
            </NextLink>
          </Grid>
        ))}
      </Grid.Container>
    </Page.Content>
  );
}

export default Verses72;
