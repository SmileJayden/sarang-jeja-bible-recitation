export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum queryKeys {
  POSTS = "posts",
}

export enum mutationKeys {
  DELETE_POST = "delete-post",
  EDIT_EMOTION = "edit-emotion",
}

const dev = process.env.NODE_ENV !== "production";

export const postCollectionPath = dev ? "/posts-dev" : "/posts";

export const server = dev
  ? "http://localhost:3000"
  : "https://sarang-jeja-bible-recitation.vercel.app";
