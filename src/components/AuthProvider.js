import React from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import AuthContext from "../common/AuthContext";

function AuthProvider(props) {
  const navigate = useNavigate();

  const checkToken = () => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        return true;
      }
      localStorage.removeItem("auth-token");
    }
    return false;
  };

  let updateAuth = () => {
    axios
      .post(
        "http://localhost:3001/api/auth/refresh",
        {},
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      )
      .then((response) => {
        localStorage.setItem("auth-token", response.data.token);
      });
  };

  let signIn = (password) => {
    axios
      .post("http://localhost:3001/api/auth/login", { password: password })
      .then((response) => {
        localStorage.setItem("auth-token", response.data.token);
        navigate("/", { replace: true });
      });
  };

  let signOut = () => {
    localStorage.removeItem("auth-token");
    navigate("/");
  };

  let checkAuth = () => {
    const isLoggedIn = checkToken();
    if (isLoggedIn) {
      updateAuth();
    }
    return isLoggedIn;
  };

  let contextVal = { signIn, signOut, checkAuth };

  return (
    <AuthContext.Provider value={contextVal}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
