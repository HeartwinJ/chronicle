import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

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
