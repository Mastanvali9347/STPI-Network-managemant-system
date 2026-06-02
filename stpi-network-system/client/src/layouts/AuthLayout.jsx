import { Outlet } from 'react-router-dom';

export const AuthLayout = () => (
  <div className="flex min-h-screen items-center justify-center bg-surface-900 p-4">
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -left-1/4 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute -right-1/4 bottom-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
    </div>
    <div className="relative w-full max-w-md">
      <Outlet />
    </div>
  </div>
);
