export const AuthLoading = ({ message = 'Loading...' }) => (
  <div className="flex min-h-screen items-center justify-center bg-surface-900">
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-10 py-8 backdrop-blur-xl">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-500/30 border-t-cyan-400" />
      <p className="text-sm text-slate-400">{message}</p>
    </div>
  </div>
);
