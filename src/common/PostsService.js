import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

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

const addPost = (title, content) => {
  return axios.post(
    `${baseUrl}/posts`,
    {
      title: title,
      content: content,
      timestamp: Date.now(),
    },
    {
      headers: { "auth-token": localStorage.getItem("auth-token") },
    }
  );
};

const editPost = (postId, title, content) => {
  return axios.put(
    `${baseUrl}/posts/${postId}`,
    {
      title: title,
      content: content,
      timestamp: Date.now(),
    },
    {
      headers: { "auth-token": localStorage.getItem("auth-token") },
    }
  );
};

const deletePost = (postId) => {
  return axios.delete(`${baseUrl}/posts/${postId}`, {
    headers: { "auth-token": localStorage.getItem("auth-token") },
  });
};

const PostsService = { getAllPosts, getPost, addPost, editPost, deletePost };

export default PostsService;
