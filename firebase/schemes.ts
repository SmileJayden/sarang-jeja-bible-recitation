export const postCollectionPath = "/posts";

export type Post = {
  title: string;
  contents: string;
  password: string;
  author: string;
  createdDt: Date;
  updatedDt: Date;
  deletedDt: Date;
};
