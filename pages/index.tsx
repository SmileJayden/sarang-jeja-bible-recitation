import NextLink, { LinkProps } from "next/link";
import {
  Card,
  Grid,
  Text,
  Link,
  Page,
  Divider,
  Loading,
} from "@geist-ui/react";
import { LinkPath } from "../constants/links";
import firebase from "firebase";
import { firebaseConfig } from "../constants/firebase";
import { postCollectionPath } from "../constants/http";
import { useEffect, useState } from "react";
import { PostResponse } from "../types";

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
];

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const db = firebase.firestore();

export default function Home() {
  const [firstPost, setFirstPost] = useState<null | PostResponse>(null);

  useEffect(() => {
    db.collection(postCollectionPath)
      .where("deletedDt", "==", null)
      .orderBy("updatedDt", "desc")
      .limit(1)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const queryDocumentSnapshot = querySnapshot.docs[0];
          setFirstPost({ ...queryDocumentSnapshot.data() } as PostResponse);
        } else {
          setFirstPost(null);
        }
      });
  }, []);

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
                    <Text p>{description}</Text>
                  </Card>
                </Link>
              </NextLink>
            </Grid>
          ))}
          <Grid xs={24} sm={12} key={`link-card-post-board`}>
            <NextLink href={{ pathname: LinkPath.GUEST_BOARD }}>
              <Link style={{ width: "100%" }}>
                <Card shadow width={"100%"}>
                  <Text h3>📜 방명록 &rarr;</Text>
                  <Text
                    p
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                    }}
                  >
                    {firstPost ? (
                      <>
                        <Text span>최신 글: </Text>
                        <Text
                          span
                          b
                          style={{ overflowY: "scroll" }}
                        >{`${firstPost.title} (by ${firstPost.author})`}</Text>
                      </>
                    ) : (
                      <Loading />
                    )}
                  </Text>
                </Card>
              </Link>
            </NextLink>
          </Grid>
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
