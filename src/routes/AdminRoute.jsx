import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { loading, dbUser } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (dbUser?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;