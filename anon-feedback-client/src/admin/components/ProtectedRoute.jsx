import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../../utils/auth.js";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");

  // No token or expired token → logout
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("adminToken");
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
