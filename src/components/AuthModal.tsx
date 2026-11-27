'use client';

import { useState } from 'react';
import { X, Sparkles, ShieldCheck, UserCheck } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, loginDemoCustomer } = useStore();
  const [name, setName] = useState('Priya Sharma');
  const [email, setEmail] = useState('priya.sharma@freshbutcher.in');

  if (!isAuthModalOpen) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginDemoCustomer(name.trim() || 'Priya Sharma', email.trim() || 'priya@freshbutcher.in');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1917]/40 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-3xl border border-[#EBE7E0] bg-[#FAF9F6] p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#EBE7E0] bg-white px-2.5 py-0.5 text-[11px] font-semibold text-[#1E5631]">
              <ShieldCheck className="h-3.5 w-3.5" /> FreshPrime Account
            </span>
            <h2 className="mt-2 text-xl font-bold text-[#1C1917]">
              Sign in to continue
            </h2>
            <p className="mt-1 text-xs text-[#78716C]">
              Access saved addresses, hygiene-separated delivery slots, and live order tracking.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(false)}
            className="rounded-xl p-1.5 text-[#78716C] hover:bg-white hover:text-[#1C1917] cursor-pointer"
            aria-label="Close sign in"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 1-Click Demo Customer Login */}
        <button
          type="button"
          onClick={() => loginDemoCustomer()}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1E5631] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#2D7A47] cursor-pointer"
        >
          <Sparkles className="h-4 w-4" />
          <span>1-Click Demo Customer Login</span>
        </button>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#EBE7E0]" />
          <span className="text-[11px] font-medium text-[#78716C]">OR CUSTOMIZE DEMO PROFILE</span>
          <div className="h-px flex-1 bg-[#EBE7E0]" />
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-[#1C1917]">Customer Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#EBE7E0] bg-white px-3 py-2 text-sm text-[#1C1917] focus:border-[#1E5631] focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#1C1917]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#EBE7E0] bg-white px-3 py-2 text-sm text-[#1C1917] focus:border-[#1E5631] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#EBE7E0] bg-white px-4 py-2.5 text-xs font-bold text-[#1C1917] transition hover:bg-stone-100 cursor-pointer"
          >
            <UserCheck className="h-4 w-4 text-[#1E5631]" />
            <span>Sign In with Details</span>
          </button>
        </form>
      </div>
    </div>
  );
}
