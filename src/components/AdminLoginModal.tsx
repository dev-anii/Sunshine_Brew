import React, { useState } from 'react';
import { Lock, Key, User, X, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'admin' && passcode.trim() === '1234') {
      setError('');
      onLoginSuccess();
    } else {
      setError('Invalid credentials. Use Username: admin and Passcode: 1234');
    }
  };

  const handleAutoFill = () => {
    setUsername('admin');
    setPasscode('1234');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-md glass-modal rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock Icon Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-cyan-500/20 border border-amber-500/40 mx-auto flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">Staff & Admin Portal</h3>
            <p className="text-xs text-slate-400 mt-1">
              Authorized access for Sunshine Cafe reservations & operations
            </p>
          </div>
        </div>

        {/* One-click Demo Auto-Fill Banner */}
        <div className="mt-5 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3">
          <div className="text-left">
            <p className="text-[11px] font-bold text-amber-400">Demo Testing Access</p>
            <p className="text-[10px] text-slate-300">Default: Username `admin` • Passcode `1234`</p>
          </div>
          <button
            type="button"
            onClick={handleAutoFill}
            className="shrink-0 px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors flex items-center gap-1 shadow-md shadow-amber-500/20"
          >
            <Sparkles className="w-3 h-3" />
            <span>Auto-Fill</span>
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-slate-900 border border-white/15 rounded-xl pl-10 pr-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Passcode
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={passcode}
                onChange={e => setPasscode(e.target.value)}
                placeholder="••••"
                className="w-full bg-slate-900 border border-white/15 rounded-xl pl-10 pr-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 tracking-widest"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn-amber-gold py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>Unlock Dashboard</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </form>

        <p className="text-[11px] text-center text-slate-500 mt-5">
          Confidential • Sunshine Cafe Operations System
        </p>
      </div>
    </div>
  );
};
