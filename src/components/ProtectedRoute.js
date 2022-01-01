import { Navigate } from "react-router-dom";
import { useAuth } from "../common/AuthContext";

function ProtectedRoute(props) {
  let auth = useAuth();
  if (!auth.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <div className="h-full">{props.children}</div>;
}

export default ProtectedRoute;
