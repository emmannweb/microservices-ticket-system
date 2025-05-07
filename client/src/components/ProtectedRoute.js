import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user")
    ? JSON.stringify(localStorage.getItem("user"))
    : null;
  return user ? children : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
