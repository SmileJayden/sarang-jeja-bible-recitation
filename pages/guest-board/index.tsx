import { GetStaticProps } from "next";
import {
  Badge,
  Card,
  Col,
  Divider,
  Grid,
  Page,
  Row,
  Spacer,
  Text,
} from "@geist-ui/react";
import { HeartFill } from "@geist-ui/react-icons";
import { useQuery } from "react-query";
import CreateBoardPostModal from "../../components/create-board-post-modal";
import BoardPostModal from "../../components/board-post-modal";
import { PostResponse } from "../../types";
import { useMemo, useState } from "react";
import { formatUnixTimestampToString } from "../../utils";
import { queryKeys } from "../../constants/http";
import { Emotion, iconColorByEmotion } from "../../constants/emotion";

function GuestBoard() {
  const { error, data, refetch, isLoading } = useQuery<{
    posts: PostResponse[];
  }>(queryKeys.POSTS, () =>
    fetch("/api/post", { method: "GET" }).then((res) => res.json())
  );

  const [modalVisible, setModalVisible] = useState(false);

  const [targetPostId, setTargetPostId] = useState<string | null>(null);
  const targetPost = useMemo(() => {
    return data?.posts?.find((p) => p.id === targetPostId) || null;
  }, [data, targetPostId]);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error;

  return (
    <Page.Content className={"contents-main"}>
      <Row justify={"center"}>
        <CreateBoardPostModal onSuccessProp={refetch} />
      </Row>
      <Spacer y={1} />
      <BoardPostModal
        post={targetPost}
        visible={modalVisible}
        onClose={async () => {
          await refetch();
          setModalVisible(false);
        }}
      />
      <Spacer y={1} />
      <Grid.Container gap={2}>
        {data.posts.map((post, i) => (
          <Grid key={`post-${i}-${post.id}`} lg={6} md={8} sm={12} xs={24}>
            <Card
              shadow
              style={{ position: "relative", cursor: "pointer" }}
              onClick={() => {
                setTargetPostId(post.id);
                setModalVisible(true);
              }}
            >
              <Card.Content style={{ padding: "16pt 8pt 5rem" }}>
                <Text b h4 style={{ overflowWrap: "break-word" }}>
                  {post.title}
                </Text>
                <Text
                  style={{
                    maxHeight: "240px",
                    overflowY: "scroll",
                    wordBreak: "break-all",
                  }}
                >
                  {post.contents}
                </Text>
              </Card.Content>
              <Card.Content
                style={{ padding: "8pt", position: "absolute", bottom: 0 }}
              >
                <Text
                  style={{
                    fontSize: "0.75rem",
                    marginBottom: 0,
                    color: "#888",
                    textAlign: "right",
                  }}
                >
                  {formatUnixTimestampToString(post.createdDt.seconds)}
                </Text>
                <Divider y={0} />
                <Row justify={"space-between"} align={"middle"}>
                  <Col>
                    <Text style={{ fontSize: "0.85rem", margin: "0.5rem 0" }}>
                      by {post.author}
                    </Text>
                  </Col>
                  <Col style={{ textAlign: "right", paddingRight: "12px" }}>
                    <Badge.Anchor placement={"bottomRight"}>
                      <Badge size="mini" style={{ userSelect: "none" }}>
                        {post[Emotion.LOVE_AND_BLESSING]}
                      </Badge>
                      <HeartFill
                        color={iconColorByEmotion.get(
                          Emotion.LOVE_AND_BLESSING
                        )}
                        size={"1.4rem"}
                      />
                    </Badge.Anchor>
                  </Col>
                </Row>
              </Card.Content>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </Page.Content>
  );
}

export default GuestBoard;
