import React from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import AuthContext from "../common/AuthContext";
import AuthService from "../common/AuthService";

function AuthProvider(props) {
  const navigate = useNavigate();

  const signIn = (password) => {
    AuthService.signIn(password).then((response) => {
      localStorage.setItem("auth-token", response.data.token);
      navigate("/", { replace: true });
    });
  };

  const signOut = () => {
    localStorage.removeItem("auth-token");
    navigate("/");
  };

  const updateAuth = () => {
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

  const checkAuth = (shouldUpdate = true) => {
    const isLoggedIn = checkToken();
    if (isLoggedIn && shouldUpdate) {
      updateAuth();
    }
    return isLoggedIn;
  };

  const contextVal = { signIn, signOut, checkAuth };

  return (
    <AuthContext.Provider value={contextVal}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
