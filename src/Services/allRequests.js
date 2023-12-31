import { base } from "./base";
import { req } from "./req";

export const signupUser = async (data) => {
  return await req("POST", `${base}/users/signup`, data, {});
};

export const loginUser = async (data) => {
  return await req("POST", `${base}/users/login`, data, {});
};

export const updateUser = async (id, reqBody, headers) => {
  return await req("PUT", `${base}/users/editProfile/${id}`, reqBody, headers);
};

export const postRequest = async (reqBody, headers) => {
  return await req("POST", `${base}/requests/postRequest`, reqBody, headers);
};

export const getAllPosts = async () => {
  return await req("GET", `${base}/requests`, "", {});
};

export const getUserPosts = async (id) => {
  return await req("GET", `${base}/requests/userRequests/${id}`, "", {});
};

export const deleteRequest = async (id, headers) => {
  return await req(
    "DELETE",
    `${base}/requests/deleteRequest/${id}`,
    {},
    headers
  );
};

export const getUser = async (id) => {
  return await req("get", `${base}/users/${id}`, "", {});
};

export const postReview = async (body, headers) => {
  return await req("POST", `${base}/reviews/postReview`, body, headers);
};

export const getReviews = async (id) => {
  return await req("GET", `${base}/reviews/${id}`, "", {});
};

export const updateRating = async (id, body, headers) => {
  return await req("PATCH", `${base}/users/updateRating/${id}`, body, headers);
};

export const postAppReview = async (id, body, headers) => {
  return await req(
    "POST",
    `${base}/appReviews/postAppReview/${id}`,
    body,
    headers
  );
};

export const getAppreviews = async () => {
  return await req("GET", `${base}/appReviews`, "", {});
};

export const getUserChats = async (id, headers) => {
  return await req("GET", `${base}/chats/${id}`, "", headers);
};

export const postChat = async (body, headers) => {
  return await req("POST", `${base}/chats`, body, headers);
};

export const getUsersChat = async (senderId, receiverId) => {
  return await req("GET", `${base}/chats/${senderId}/${receiverId}`, "", {});
};

export const getMessages = async (id, headers) => {
  return await req("GET", `${base}/messages/${id}`, "", headers);
};

export const addMessage = async (body, headers) => {
  return await req("POST", `${base}/messages`, body, headers);
};

export const createChat = async (body, headers) => {
  return await req("POST", `${base}/chats`, body, headers);
};
