/* eslint-disable react/prop-types */
import { useAuth } from "../../context/authContext";
import { Navigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Spinner animation="border" variant="danger" />;

  if (!user) return <Navigate to="/login" />;

  return children;
}
