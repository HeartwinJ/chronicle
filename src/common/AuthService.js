import axios from "axios";

const signIn = (password) => {
  return axios.post("http://localhost:3001/api/auth/login", {
    password: password,
  });
};

const updateAuth = () => {
  return axios.post(
    "http://localhost:3001/api/auth/refresh",
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
