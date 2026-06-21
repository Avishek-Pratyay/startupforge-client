import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const FounderRoute = ({ children }) => {
  const { loading, dbUser } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (dbUser?.role !== "founder") {
    return <Navigate to="/" />;
  }

  return children;
};

export default FounderRoute;