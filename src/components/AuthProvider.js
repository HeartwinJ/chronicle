import React from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import AuthContext from "../common/AuthContext";
import AuthService from "../common/AuthService";

function AuthProvider(props) {
  const navigate = useNavigate();

  let signIn = (password) => {
    AuthService.signIn(password).then((response) => {
      localStorage.setItem("auth-token", response.data.token);
      navigate("/", { replace: true });
    });
  };

  let signOut = () => {
    localStorage.removeItem("auth-token");
    navigate("/");
  };

  let updateAuth = () => {
    AuthService.updateAuth().then((response) => {
      localStorage.setItem("auth-token", response.data.token);
    });
  };

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
