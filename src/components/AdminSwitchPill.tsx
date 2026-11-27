'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Store } from 'lucide-react';

export function AdminSwitchPill() {
  const pathname = usePathname();
  const isAdmin = pathname === '/dispatch';

  return (
    <Link
      href={isAdmin ? '/' : '/dispatch'}
      className="fixed bottom-5 left-5 z-40 inline-flex items-center gap-2 rounded-full border border-[#EBE7E0] bg-white/90 py-1.5 pr-3.5 pl-1.5 text-xs font-semibold text-[#1C1917] shadow-md backdrop-blur-md transition hover:border-[#1C1917]/30 hover:bg-white"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#1E5631] to-[#881337] text-[10px] font-bold text-white">
        FP
      </span>
      {isAdmin ? (
        <>
          <Store className="h-3.5 w-3.5 text-[#1E5631]" />
          <span>Shopper View</span>
        </>
      ) : (
        <>
          <Shield className="h-3.5 w-3.5 text-[#881337]" />
          <span>Admin View</span>
        </>
      )}
    </Link>
  );
}
