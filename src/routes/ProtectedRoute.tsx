import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  isLoggedIn: boolean;
  redirectPath?: string;
}

const ProtectedRoute = ({ isLoggedIn, redirectPath = '/login' }: ProtectedRouteProps) => {
  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;