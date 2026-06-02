import { useState } from 'react';
import { Lock, X, Eye, EyeOff, Copy, Check } from 'lucide-react';

export const PasswordRevealModal = ({ open, ssid, onClose, onReveal }) => {
  const [adminPassword, setAdminPassword] = useState('');
  const [revealed, setRevealed] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const handleReveal = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const plain = await onReveal(adminPassword);
      setRevealed(plain);
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(revealed);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setAdminPassword('');
    setRevealed('');
    setShow(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-cyan-500/30 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-700/60 px-5 py-4">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-cyan-400" />
            <h2 className="font-semibold text-white">Credential vault</h2>
          </div>
          <button type="button" onClick={handleClose} className="text-slate-500 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-sm text-slate-400">
            SSID: <span className="text-white font-medium">{ssid}</span>
          </p>
          <p className="text-xs text-amber-400/90 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
            Re-enter your admin password to decrypt credentials. Access is logged.
          </p>

          {!revealed ? (
            <form onSubmit={handleReveal} className="space-y-3">
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Your login password"
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white"
                required
              />
              {error && <p className="text-xs text-rose-400">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-cyan-600 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {loading ? 'Verifying…' : 'Verify & reveal'}
              </button>
            </form>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800/80 px-3 py-2">
                <span className="flex-1 font-mono text-sm text-white">
                  {show ? revealed : '••••••••••••'}
                </span>
                <button type="button" onClick={() => setShow((v) => !v)} className="text-slate-400 hover:text-white">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                <button type="button" onClick={handleCopy} className="text-slate-400 hover:text-cyan-400">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-full rounded-lg border border-slate-600 py-2 text-sm text-slate-300"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
