import { useCallback } from "react";
import { useMutation } from "react-query";
import { Divider, Grid, Modal, Row, Spacer, Text } from "@geist-ui/react";
import { HttpMethod, MutationKeys } from "../../constants/http";
import { PostResponse } from "../../types";
import { formatUnixTimestampToString } from "../../utils";
import { Emotion } from "../../constants/emotion";
import EachEmotion from "./each-emotion";
import PostDeleteButton from "./delete-button";
import { debounce } from "../../hooks";

type PostEmotionBody = {
  postId: string;
  emotion: Emotion;
  incCount: number;
};

type Props = {
  post: PostResponse | null;
  visible: boolean;
  onClose: () => void;
};

export default function BoardPostModal({ post, visible, onClose }: Props) {
  const { mutate: emitEmotionMutation } = useMutation<{}, {}, PostEmotionBody>(
    MutationKeys.EDIT_EMOTION,
    ({ postId, emotion, incCount }) =>
      fetch("/api/emotion", {
        method: HttpMethod.PUT,
        body: JSON.stringify({ postId, emotion, incCount }),
      }).then((res) => res.json())
  );

  const handleClickEmotionFactory = useCallback(
    (postId, emotion) => {
      let incCount = 0;
      const postMutation = debounce(() => {
        emitEmotionMutation({ postId, emotion, incCount });
        incCount = 0;
      }, 400);
      return () => {
        incCount++;
        postMutation();
      };
    },
    [post]
  );

  const handleSuccessDeletePost = () => {
    onClose();
  };

  if (!post) return <div />;

  return (
    <Modal open={visible} width={"60rem"} onClose={() => onClose()}>
      <Modal.Title>{post.title}</Modal.Title>
      <Modal.Subtitle>posted by {post.author}</Modal.Subtitle>
      <Modal.Content>
        <Row justify={"end"}>
          <PostDeleteButton
            postId={post.id}
            onSuccess={handleSuccessDeletePost}
          />
        </Row>
        <Spacer y={0.5} />
        <Text
          blockquote
          style={{
            whiteSpace: "pre-line",
            backgroundColor: "#fdfdfd",
            maxHeight: "45vh",
            overflowY: "scroll",
            marginTop: "0px",
          }}
        >
          {post.contents}
        </Text>
        <Text
          size={12}
          style={{ textAlign: "right", margin: 0, color: "#888" }}
        >
          게시 시간: {formatUnixTimestampToString(post.createdDt.seconds)}
        </Text>
        {/*<Text*/}
        {/*  size={12}*/}
        {/*  style={{ textAlign: "right", margin: 0, color: "#888" }}*/}
        {/*>*/}
        {/*  수정 시간: {formatUnixTimestampToString(post.updatedDt.seconds)}*/}
        {/*</Text>*/}
        <Spacer y={0.5} />
        <Divider y={0} />
        <Spacer y={0.5} />
        <Grid.Container gap={1}>
          {Object.values(Emotion).map((emotion, i) => {
            const onClickEmotion = handleClickEmotionFactory(post.id, emotion);
            return (
              <Grid
                style={{ textAlign: "center" }}
                key={`${post.id}-${emotion}-${i}`}
                xs={8}
                sm={4}
                justify={"center"}
              >
                <EachEmotion
                  emotion={emotion}
                  count={post[emotion]}
                  onClick={onClickEmotion}
                />
              </Grid>
            );
          })}
        </Grid.Container>
      </Modal.Content>
    </Modal>
  );
}
