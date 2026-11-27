'use client';

import { useEffect, useState } from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function FirstItemCelebration() {
  const { firstItemCelebrationKey, celebrationSection } = useStore();
  const [visibleKey, setVisibleKey] = useState(0);

  useEffect(() => {
    if (firstItemCelebrationKey === 0) return;
    setVisibleKey(firstItemCelebrationKey);
    const timer = setTimeout(() => {
      setVisibleKey(0);
    }, 1550);
    return () => clearTimeout(timer);
  }, [firstItemCelebrationKey]);

  if (visibleKey === 0) return null;

  const isMeat = celebrationSection === 'meat';

  return (
    <div
      key={visibleKey}
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden="true"
    >
      {/* Full-screen radial shimmer pulse */}
      <div
        className={`animate-shimmer-pulse absolute inset-0 ${
          isMeat
            ? 'bg-[radial-gradient(circle_at_center,rgba(253,242,244,0.65)_0%,rgba(136,19,55,0.12)_45%,transparent_75%)]'
            : 'bg-[radial-gradient(circle_at_center,rgba(242,247,244,0.7)_0%,rgba(30,86,49,0.14)_45%,transparent_75%)]'
        }`}
      />

      {/* Diagonal full-screen shimmer sweep */}
      <div
        className={`animate-shimmer-sweep absolute inset-y-0 left-0 w-2/3 ${
          isMeat
            ? 'bg-gradient-to-r from-transparent via-pink-200/45 to-transparent'
            : 'bg-gradient-to-r from-transparent via-emerald-200/45 to-transparent'
        }`}
      />

      {/* Editorial Toast Pill */}
      <div className="flex justify-center pt-20">
        <div
          className={`animate-celebration-banner inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 shadow-xl backdrop-blur-md ${
            isMeat
              ? 'border-[#881337]/25 bg-white/95 text-[#881337]'
              : 'border-[#1E5631]/25 bg-white/95 text-[#1E5631]'
          }`}
        >
          <Sparkles className="h-4 w-4 shrink-0" />
          <span className="text-xs font-bold tracking-wide sm:text-sm">
            First item added — your hygiene-separated cart is live!
          </span>
          <ShieldCheck className="h-4 w-4 shrink-0 opacity-80" />
        </div>
      </div>
    </div>
  );
}
