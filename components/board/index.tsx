import { useContext, useEffect, useState } from "react";
import { FireStoreContext } from "../../firebase";
import { Post, postCollectionPath } from "../../firebase/schemes";

export default function Board() {
  const context = useContext(FireStoreContext);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    console.log(context.firestore);
    // @ts-ignore
    context.firestore.collection(postCollectionPath).onSnapshot((x) => {
      console.log(
        x.docs.findIndex((y) => {
          console.log({ y }, y.data());
        })
      );
    });

    if (false)
      context.firestore
        .collection("posts")
        .add({
          title: "글제목",
          contents: "글 내용",
          author: "글쓴이",
          createdDt: new Date(),
          updatedDt: new Date(),
          deletedDt: new Date(),
        })
        .then((x) => {
          console.log(x);
        });
  }, []);

  return (
    <div>
      {posts.map((post, i) => {
        return <div key={`post-${i}`}>{post.contents}</div>;
      })}
    </div>
  );
}
