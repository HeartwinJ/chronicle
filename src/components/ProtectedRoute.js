import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../common/AuthContext";

function ProtectedRoute(props) {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authRefreshInterval = setInterval(() => {
      console.log("Auth Refresh");
      if (!auth.checkAuth(false)) {
        navigate("/login", { replace: true });
      }
    }, 300000);

    return () => {
      clearInterval(authRefreshInterval);
    };
  }, [auth, navigate]);

  if (!auth.checkAuth()) {
    return <Navigate to="/login" replace />;
  }

  return <div className="h-full">{props.children}</div>;
}

export default ProtectedRoute;
