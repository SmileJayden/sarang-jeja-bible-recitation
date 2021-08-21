import firebase from "firebase/app";
import "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { postCollectionPath } from "../../constants/http";
import { PostDto, PostResponse } from "../../types";
import { HttpMethod } from "../../constants/http";
import { Emotion } from "../../constants/emotion";
import { firebaseConfig } from "../../constants/firebase";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = firebase.firestore();

  if (req.method === HttpMethod.GET) {
    const count = req.query.count;

    let query = db
      .collection(postCollectionPath)
      .where("deletedDt", "==", null)
      .orderBy("updatedDt", "desc");
    if (typeof count === "string") query = query.limit(parseInt(count));
    const snapshot = await query.get();

    const resultPosts: PostResponse[] = [];
    snapshot.forEach((doc) => {
      const postResponse = doc.data() as Omit<PostResponse, "id">;
      resultPosts.push({ ...postResponse, id: doc.id });
    });

    res.status(200).json({
      posts: resultPosts,
    });
    res.end();
    return;
  }

  if (req.method === HttpMethod.POST) {
    const parsedReqBody = { ...JSON.parse(req.body) };
    const newPost = await db.collection(postCollectionPath).add({
      ...parsedReqBody,
      password: await bcrypt.hash(
        parsedReqBody.password,
        await bcrypt.genSalt(6)
      ),
      createdDt: firebase.firestore.Timestamp.fromDate(new Date()),
      updatedDt: new Date(),
      deletedDt: null,
      ...Object.values(Emotion).reduce(
        (acc, emotion) => ({ ...acc, [emotion]: 0 }),
        {}
      ),
    } as PostDto);
    res
      .status(200)
      .json({ post: await newPost.get().then((snapshot) => snapshot.data()) });
    res.end();
    return;
  }

  if (req.method === HttpMethod.DELETE) {
    const parsedReqBody = { ...JSON.parse(req.body) };

    const targetPostRef = await db
      .collection(postCollectionPath)
      .doc(parsedReqBody.postId);
    const doc = await targetPostRef.get();
    const data = doc.data();

    const match = await bcrypt.compare(parsedReqBody.password, data.password);
    if (!match) throw new Error("비밀번호가 맞지 않습니다");

    try {
      const transactionResult = await db.runTransaction(async (t) => {
        await t.update(targetPostRef, {
          deletedDt: new Date(),
        });
        return `[DELETE]: Post ${parsedReqBody.postId} delete success`;
      });
      console.info(transactionResult);
    } catch (e) {
      console.error("Transaction failure:", e);
    }

    res.status(200).json({
      deletedPost: doc.data(),
      message: `DELETE ${parsedReqBody.postId} post Success`,
    });
    res.end();
  }
};
