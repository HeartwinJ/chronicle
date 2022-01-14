import axios from "axios";

const baseUrl = "http://localhost:3001/api";

const getAllPosts = () => {
  return axios.get(`${baseUrl}/posts`, {
    headers: { "auth-token": localStorage.getItem("auth-token") },
  });
};

const getPost = (postId) => {
  return axios.get(`${baseUrl}/posts/${postId}`, {
    headers: { "auth-token": localStorage.getItem("auth-token") },
  });
};

const addPost = (postData) => {
  return axios.post(`${baseUrl}/posts`, postData, {
    headers: { "auth-token": localStorage.getItem("auth-token") },
  });
};

const editPost = (postId, postData) => {
  return axios.put(`${baseUrl}/posts/${postId}`, postData, {
    headers: { "auth-token": localStorage.getItem("auth-token") },
  });
};

const deletePost = (postId) => {
  return axios.delete(`${baseUrl}/posts/${postId}`, {
    headers: { "auth-token": localStorage.getItem("auth-token") },
  });
};

const PostsService = { getAllPosts, getPost, addPost, editPost, deletePost };

export default PostsService;
