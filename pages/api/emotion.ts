import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getFirestore,
  runTransaction,
  CollectionReference,
} from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { postCollectionPath } from "../../constants/http";
import { HttpMethod } from "../../constants/http";
import { firebaseConfig } from "../../constants/firebase";

import { PostDto, PostEmotionDto } from "../../types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const postRef = collection(
    db,
    postCollectionPath
  ) as CollectionReference<PostDto>; // generic 지원 해줘...

  if (req.method === HttpMethod.PUT) {
    const parsedReqBody = { ...JSON.parse(req.body) } as PostEmotionDto;
    const targetPostRef = doc(postRef, parsedReqBody.postId);

    try {
      const transactionResult = await runTransaction(db, async (t) => {
        const targetPostDoc = await t.get(targetPostRef);
        targetPostDoc.data();
        const newEmotionCount =
          (targetPostDoc.data()?.[parsedReqBody.emotion] ?? 0) +
          parsedReqBody.incCount;

        t.update(targetPostRef, {
          [parsedReqBody.emotion]: newEmotionCount,
        });
        return `[PUT]: Post ${parsedReqBody.postId} update ${parsedReqBody.emotion} Count ${parsedReqBody.incCount}+ Transaction success!`;
      });
      console.info(transactionResult);
    } catch (e) {
      console.error("Transaction failure:", e);
    }

    res.status(200).json({ status: "update Success" });
    res.end();
    return;
  }
};
