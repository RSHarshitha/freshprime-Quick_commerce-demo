'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Sparkles, ShieldCheck, UserCheck, UserPlus, Compass } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function AuthModal() {
  const router = useRouter();
  const { isAuthModalOpen, setIsAuthModalOpen, loginDemoCustomer, enterGuestMode } = useStore();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('Priya Sharma');
  const [email, setEmail] = useState('priya.sharma@freshprime.in');
  const [phone, setPhone] = useState('+91 98450 11223');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginDemoCustomer(
      name.trim() || 'Priya Sharma',
      email.trim() || 'priya@freshprime.in',
      phone.trim() || '+91 98450 11223'
    );
    router.push('/grocery');
  };

  const handleDemoLogin = () => {
    loginDemoCustomer();
    router.push('/grocery');
  };

  const handleGuestMode = () => {
    enterGuestMode();
    router.push('/grocery');
  };

  return (
    <div
      onClick={() => setIsAuthModalOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1917]/35 p-4 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl border border-white/70 bg-white/80 p-6 shadow-2xl backdrop-blur-2xl"
      >
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#EBE7E0] bg-white/90 px-2.5 py-0.5 text-[11px] font-semibold text-[#1E5631]">
              <ShieldCheck className="h-3.5 w-3.5" /> FreshPrime Access
            </span>
            <h2 className="mt-2 text-xl font-bold text-[#1C1917]">
              {mode === 'login' ? 'Sign In or Log In' : 'Create FreshPrime Account'}
            </h2>
            <p className="mt-0.5 text-xs text-[#78716C]">
              Unlock instant 12–18 min shopping, live pricing, and hygiene-separated delivery.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(false)}
            className="rounded-xl p-1.5 text-[#78716C] hover:bg-white/80 hover:text-[#1C1917] cursor-pointer"
            aria-label="Close sign in"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mode Switcher: Log In | Sign Up */}
        <div className="mt-4 grid grid-cols-2 gap-1.5 rounded-2xl border border-[#EBE7E0] bg-white/60 p-1">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`rounded-xl py-1.5 text-xs font-bold transition cursor-pointer ${
              mode === 'login'
                ? 'bg-[#1C1917] text-white shadow-xs'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            Log In (Existing)
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`rounded-xl py-1.5 text-xs font-bold transition cursor-pointer ${
              mode === 'signup'
                ? 'bg-[#1C1917] text-white shadow-xs'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            Sign Up (New)
          </button>
        </div>

        {/* 1-Click Demo Customer Login */}
        <button
          type="button"
          onClick={handleDemoLogin}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1E5631] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#2D7A47] cursor-pointer"
        >
          <Sparkles className="h-4 w-4" />
          <span>1-Click Demo Customer Login</span>
        </button>

        <form onSubmit={handleSubmit} className="mt-4 space-y-2.5">
          {mode === 'signup' && (
            <div>
              <label className="text-xs font-semibold text-[#1C1917]">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#EBE7E0] bg-white/90 px-3 py-2 text-sm text-[#1C1917] focus:border-[#1E5631] focus:outline-none"
              />
            </div>
          )}
          <div>
            <label className="text-xs font-semibold text-[#1C1917]">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#EBE7E0] bg-white/90 px-3 py-2 text-sm text-[#1C1917] focus:border-[#1E5631] focus:outline-none"
            />
          </div>
          {mode === 'signup' && (
            <div>
              <label className="text-xs font-semibold text-[#1C1917]">Mobile Number</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#EBE7E0] bg-white/90 px-3 py-2 text-sm text-[#1C1917] focus:border-[#1E5631] focus:outline-none"
              />
            </div>
          )}

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#EBE7E0] bg-white/90 px-4 py-2.5 text-xs font-bold text-[#1C1917] transition hover:bg-white cursor-pointer"
          >
            {mode === 'login' ? (
              <>
                <UserCheck className="h-4 w-4 text-[#1E5631]" />
                <span>Log In to Shop</span>
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4 text-[#1E5631]" />
                <span>Create Account &amp; Shop</span>
              </>
            )}
          </button>
        </form>

        {/* Guest Mode Option */}
        <div className="mt-4 border-t border-[#EBE7E0]/80 pt-3">
          <button
            type="button"
            onClick={handleGuestMode}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#78716C]/40 bg-white/50 px-4 py-2 text-xs font-semibold text-[#1C1917] transition hover:bg-white cursor-pointer"
          >
            <Compass className="h-4 w-4 text-[#881337]" />
            <span>Continue in Guest Mode</span>
          </button>
        </div>
      </div>
    </div>
  );
}
