import { Emotion } from "../constants/emotion";

export interface IVerse {
  book: string;
  chapter: string;
  verse: string;
  contents: string;
  semester: number;
  week: number;
  group?: string;
}

export type PostDto = {
  title: string;
  contents: string;
  password: string;
  author: string;
  createdDt: { seconds: number; nanoseconds: number };
  updatedDt: { seconds: number; nanoseconds: number };
  deletedDt: { seconds: number; nanoseconds: number };
  [Emotion.LOVE_AND_BLESSING]: number;
  [Emotion.GOOD]: number;
  [Emotion.THUMBS_UP]: number;
  [Emotion.SAD]: number;
  [Emotion.CHEER_UP]: number;
  [Emotion.PRAY_WITH]: number;
};

export type PostResponse = PostDto & {
  id: string;
};

export type PostEmotionDto = {
  postId: string;
  emotion: Emotion;
  incCount: number;
};
