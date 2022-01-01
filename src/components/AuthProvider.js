import React from "react";
import AuthContext from "../common/AuthContext";

function AuthProvider(props) {
  let [isLoggedIn, setLoggedIn] = React.useState(false);

  let signIn = (password, callback) => {
    if (password === "test123$") {
      setLoggedIn(true);
      callback();
    }
  };

  let signOut = (callback) => {
    setLoggedIn(false);
    callback();
  };

  let contextVal = { isLoggedIn, signIn, signOut };

  return (
    <AuthContext.Provider value={contextVal}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
