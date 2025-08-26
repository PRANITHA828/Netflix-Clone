
import { Navigate } from "react-router-dom";   
import Cookies from "js-cookie";

export default function ProtectedRoute({ element }) {
  const token = Cookies.get("jwt_token");

  return token ? element : <Navigate to="/login" replace />;
}
