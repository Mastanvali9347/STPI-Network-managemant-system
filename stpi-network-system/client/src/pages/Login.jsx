import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../utils/constants';

export const LoginPage = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@stpi.com');
  const [password, setPassword] = useState('Admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(email.trim(), password);
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (err) {
      const msg =
        err.response?.data?.message || 'Invalid credentials. Check demo account below.';
      setError(msg);
    }
  };

  return (
    <div className="w-full transition-all duration-300">
      {/* Glassmorphism card */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-500/5 backdrop-blur-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25 transition-transform hover:scale-105">
            <Activity className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">STPI Smart Network</h1>
          <p className="mt-1 text-sm text-slate-400">Secure Admin Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-slate-400">
              Email address
            </label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-cyan-400" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-600/80 bg-slate-900/60 py-3 pl-10 pr-4 text-sm text-white outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                placeholder="admin@stpi.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-slate-400">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-cyan-400" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-600/80 bg-slate-900/60 py-3 pl-10 pr-12 text-sm text-white outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-800 hover:text-slate-200"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:opacity-95 hover:shadow-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <p className="mt-6 rounded-xl border border-white/5 bg-slate-900/40 p-3 text-center text-xs text-slate-500">
          Demo credentials (local development only):
          <br />
          <span className="text-slate-300">admin@stpi.com</span>
          {' · '}
          <span className="text-slate-300">Admin123</span>
        </p>
      </div>
    </div>
  );
};
