import { initializeApp } from "firebase/app";
import {
  addDoc,
  doc,
  getFirestore,
  Timestamp,
  collection,
  where,
  getDocs,
  orderBy,
  query,
  limit,
  QueryConstraint,
  runTransaction,
} from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { postCollectionPath } from "../../constants/http";
import { PostDto, PostResponse } from "../../types";
import { HttpMethod } from "../../constants/http";
import { Emotion } from "../../constants/emotion";
import { firebaseConfig } from "../../constants/firebase";
import { CollectionReference } from "@firebase/firestore";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const postRef = collection(
    db,
    postCollectionPath
  ) as CollectionReference<PostDto>; // generic 지원 해줘...

  if (req.method === HttpMethod.GET) {
    const count = req.query.count;
    const queryConstraints: QueryConstraint[] = [
      where("deletedDt", "==", null),
      orderBy("updatedDt", "desc"),
    ];
    if (typeof count === "string") {
      queryConstraints.push(limit(parseInt(count)));
    }

    const snapshot = await getDocs(query(postRef, ...queryConstraints));

    const resultPosts: PostResponse[] = [];
    snapshot.forEach((doc) => {
      const postResponse = doc.data();
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
    await addDoc<PostDto>(postRef, {
      ...parsedReqBody,
      password: await bcrypt.hash(
        parsedReqBody.password,
        await bcrypt.genSalt(6)
      ),
      createdDt: Timestamp.fromDate(new Date()),
      updatedDt: Timestamp.fromDate(new Date()),
      deletedDt: null,
      ...Object.values(Emotion).reduce(
        (acc, emotion) => ({ ...acc, [emotion]: 0 }),
        {}
      ),
    } as PostDto);

    res.status(200);
    res.end();
    return;
  }

  if (req.method === HttpMethod.DELETE) {
    const parsedReqBody = { ...JSON.parse(req.body) };
    const targetPostRef = doc(postRef, parsedReqBody.postId);

    try {
      const transactionResult = await runTransaction(db, async (t) => {
        const targetPostDoc = await t.get(targetPostRef);
        if (!targetPostDoc.exists()) {
          throw "Document does not exist!";
        }

        const match = await bcrypt.compare(
          parsedReqBody.password,
          targetPostDoc.data().password
        );
        if (!match) throw new Error("비밀번호가 맞지 않습니다");

        await t.update(targetPostRef, {
          deletedDt: Timestamp.fromDate(new Date()),
        });
        return `[DELETE]: Post ${parsedReqBody.postId} delete success`;
      });
      console.info(transactionResult);
    } catch (e) {
      console.error("Transaction failure:", e);
    }

    res.status(200).json({
      message: `DELETE ${parsedReqBody.postId} post Success`,
    });
    res.end();
  }
};
