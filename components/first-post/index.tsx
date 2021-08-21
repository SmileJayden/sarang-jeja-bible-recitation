import { useMemo } from "react";
import { Text } from "@geist-ui/react";
import queryString from "querystring";
import { useQuery } from "react-query";
import { PostResponse } from "../../types";
import { HttpMethod, QueryKeys } from "../../constants/http";

function FirstPost() {
  const {
    data: { posts },
  } = useQuery<{
    posts: PostResponse[];
  }>(QueryKeys.FIRST_POST, () => {
    const params = { count: 1 };
    return fetch(`/api/post?${queryString.stringify(params)}`, {
      method: HttpMethod.GET,
    }).then((res) => res.json());
  });
  const firstPost = useMemo(() => posts[0], [posts]);

  return (
    <Text
      p
      style={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "100%",
      }}
    >
      <Text span>최신 글: </Text>
      <Text
        span
        b
        style={{ overflowY: "scroll" }}
      >{`${firstPost.title} (by ${firstPost.author})`}</Text>
    </Text>
  );
}

export default FirstPost;
