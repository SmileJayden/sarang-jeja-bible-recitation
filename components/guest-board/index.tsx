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
import { useQuery } from "react-query";
import CreateBoardPostModal from "../../components/create-board-post-modal";
import BoardPostModal from "../../components/board-post-modal";
import { PostResponse } from "../../types";
import { useMemo, useState } from "react";
import { formatUnixTimestampToString } from "../../utils";
import { HttpMethod, QueryKeys } from "../../constants/http";
import {
  Emotion,
  iconByEmotion,
  iconColorByEmotion,
} from "../../constants/emotion";

function GuestBoard() {
  const { data, refetch } = useQuery<{
    posts: PostResponse[];
  }>(QueryKeys.POSTS, () =>
    fetch("/api/post", { method: HttpMethod.GET }).then((res) => res.json())
  );

  const [modalVisible, setModalVisible] = useState(false);

  const [targetPostId, setTargetPostId] = useState<string | null>(null);
  const targetPost = useMemo(() => {
    return data?.posts?.find((p) => p.id === targetPostId) || null;
  }, [data, targetPostId]);

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
        {data.posts.map((post, i) => {
          let maxEmotion = Object.values(Emotion)
            .map((e) => ({
              emotion: e,
              count: post[e],
            }))
            .sort((x, y) => (x.count < y.count ? 1 : -1))[0];
          if (maxEmotion.count === 0)
            maxEmotion.emotion = Emotion.LOVE_AND_BLESSING;

          return (
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
                    <Col span={48}>
                      <Text
                        style={{
                          fontSize: "0.85rem",
                          margin: "0.5rem 0",
                        }}
                      >
                        by {post.author}
                      </Text>
                    </Col>
                    <Col style={{ textAlign: "right", paddingRight: "12px" }}>
                      <Badge.Anchor placement={"bottomRight"}>
                        <Badge size="mini" style={{ userSelect: "none" }}>
                          {maxEmotion.count}
                        </Badge>
                        {iconByEmotion.get(maxEmotion.emotion)({
                          color: iconColorByEmotion.get(maxEmotion.emotion),
                          size: "1.4rem",
                        })}
                      </Badge.Anchor>
                    </Col>
                  </Row>
                </Card.Content>
              </Card>
            </Grid>
          );
        })}
      </Grid.Container>
    </Page.Content>
  );
}

export default GuestBoard;
