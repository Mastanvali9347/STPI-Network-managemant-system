import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../utils/constants';
import { AuthLoading } from '../components/AuthLoading';

/**
 * Redirects authenticated users away from login to dashboard.
 */
export const PublicRoute = () => {
  const { isAuthenticated, initializing } = useAuth();

  if (initializing) {
    return <AuthLoading message="Loading..." />;
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
};
