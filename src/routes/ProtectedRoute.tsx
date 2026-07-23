import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "../hooks/useAppSelector";
import { ROUTES } from "../utils/constants";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace />;
  }

  return children;
};

export default ProtectedRoute;
