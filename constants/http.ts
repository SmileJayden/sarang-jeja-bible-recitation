export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum QueryKeys {
  POSTS = "posts",
  FIRST_POST = "first-post",
}

export enum MutationKeys {
  DELETE_POST = "delete-post",
  EDIT_EMOTION = "edit-emotion",
}

const dev = process.env.NODE_ENV === "development";

export const postCollectionPath = dev ? "/posts" : "/posts";
