export const LoadingSpinner = ({ label = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-400">
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-500/30 border-t-cyan-400" />
    <span className="text-sm">{label}</span>
  </div>
);
