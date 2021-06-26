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

export const postCollectionPath = dev ? "/posts" : "/posts";

