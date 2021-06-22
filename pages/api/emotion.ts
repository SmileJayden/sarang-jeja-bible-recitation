import firebase from "firebase/app";
import "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { postCollectionPath } from "../../constants/http";
import { HttpMethod } from "../../constants/http";

const firebaseConfig = {
  apiKey: "AIzaSyBMPluWY37TITVkGONGgnS1xW2q4kd3fX4",
  authDomain: "sarang-jeja-bible-recitation.firebaseapp.com",
  projectId: "sarang-jeja-bible-recitation",
  storageBucket: "sarang-jeja-bible-recitation.appspot.com",
  messagingSenderId: "650223408754",
  appId: "1:650223408754:web:dfed7c75693c14888d54eb",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = firebase.firestore();

  if (req.method === HttpMethod.PUT) {
    const parsedReqBody = { ...JSON.parse(req.body) };
    const postRef = db.collection(postCollectionPath).doc(parsedReqBody.postId);

    try {
      const transactionResult = await db.runTransaction(async (t) => {
        const doc = await t.get(postRef);
        const newEmotionCount =
          doc.data()[parsedReqBody.emotion] + parsedReqBody.incCount;
        t.update(postRef, {
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
