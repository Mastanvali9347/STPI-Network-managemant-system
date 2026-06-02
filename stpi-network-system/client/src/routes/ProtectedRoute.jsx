import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../utils/constants';
import { AuthLoading } from '../components/AuthLoading';

/**
 * Guards dashboard routes — redirects unauthenticated users to login.
 */
export const ProtectedRoute = () => {
  const { isAuthenticated, initializing } = useAuth();

  if (initializing) {
    return <AuthLoading message="Verifying session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
};
