import axios from "axios";

const baseUrl = "http://localhost:3001/api";

const signIn = (password) => {
  return axios.post(`${baseUrl}/auth/login`, {
    password: password,
  });
};

const updateAuth = () => {
  return axios.post(
    `${baseUrl}/auth/refresh`,
    {},
    {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    }
  );
};

const AuthService = { signIn, updateAuth };

export default AuthService;
