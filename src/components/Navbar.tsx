'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Leaf,
  Beef,
  PackageCheck,
  ShieldCheck,
  LogOut,
  User,
  Shield,
  History,
  ChevronDown,
  Compass,
  LogIn,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    setIsAuthModalOpen,
    setActiveAccountTab,
    logout,
  } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isGrocery = pathname === '/grocery';
  const isMeat = pathname === '/meat';

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleSignOut = () => {
    setIsMenuOpen(false);
    logout();
    router.push('/');
  };

  const initials = user
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'G';

  return (
    <header className="sticky top-0 z-40 border-b border-[#EBE7E0]/80 bg-[#FAF9F6]/90 backdrop-blur-md">
      {/* Top Hygiene Banner (shown only inside active shopping experience) */}
      {isAuthenticated && (
        <div className="bg-[#1C1917] px-4 py-1.5 text-center text-[11px] text-stone-200">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>
              <strong>Hygiene Guarantee:</strong> Grocery &amp; Meat are packed in separate zones and delivered in dedicated Ambient &amp; 0–4°C Chilled boxes.
            </span>
          </span>
        </div>
      )}

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
        {/* Brand */}
        <Link href={isAuthenticated ? '/grocery' : '/'} className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#1E5631] to-[#881337] text-xs font-bold tracking-tight text-white shadow-xs">
            FP
          </div>
          <div>
            <div className="text-base font-bold tracking-tight text-[#1C1917]">
              FreshPrime
            </div>
            <div className="text-[11px] font-medium text-[#78716C]">
              Botanical Market &amp; Artisan Butchery
            </div>
          </div>
        </Link>

        {/* Segmented Switch Button: visible only after user signs in */}
        {isAuthenticated && (
          <div
            className={`inline-flex items-center rounded-full border p-1 transition-colors duration-300 ${
              isMeat
                ? 'border-[#881337]/25 bg-[#FDF2F4]'
                : 'border-[#1E5631]/20 bg-[#F2F7F4]'
            }`}
            role="group"
            aria-label="Switch between Grocery and Meat sections"
          >
            <Link
              href="/grocery"
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                isGrocery
                  ? 'bg-[#1E5631] text-white shadow-sm'
                  : 'text-[#1E5631] hover:bg-[#1E5631]/10'
              }`}
            >
              <Leaf className="h-3.5 w-3.5" />
              <span>Grocery</span>
            </Link>

            <Link
              href="/meat"
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                isMeat
                  ? 'bg-[#881337] text-white shadow-sm'
                  : 'text-[#881337] hover:bg-[#881337]/10'
              }`}
            >
              <Beef className="h-3.5 w-3.5" />
              <span>Meat</span>
            </Link>
          </div>
        )}

        {/* Right Nav: Only Sign In when signed out; Orders + Avatar Dropdown when signed in */}
        <nav className="flex items-center gap-2">
          {isAuthenticated && (
            <Link
              href="/orders"
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium transition ${
                pathname === '/orders'
                  ? 'bg-[#1C1917] text-white'
                  : 'text-[#1C1917] hover:bg-white border border-transparent hover:border-[#EBE7E0]'
              }`}
            >
              <PackageCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </Link>
          )}

          {isAuthenticated ? (
            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-full border border-[#EBE7E0] bg-white py-1 pr-2.5 pl-1 text-xs font-semibold text-[#1C1917] shadow-xs transition hover:border-[#1C1917]/30 cursor-pointer"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#1E5631] to-[#881337] text-[11px] font-bold text-white">
                  {initials}
                </span>
                <span className="hidden sm:inline">
                  {user ? user.name.split(' ')[0] : 'Guest'}
                </span>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-[#78716C] transition-transform ${
                    isMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 z-50 mt-2 w-52 rounded-2xl border border-[#EBE7E0] bg-white/90 p-1.5 shadow-2xl backdrop-blur-xl">
                  {user ? (
                    <>
                      <div className="border-b border-[#EBE7E0] px-3 py-2">
                        <div className="truncate text-xs font-bold text-[#1C1917]">
                          {user.name}
                        </div>
                        <div className="truncate text-[10px] text-[#78716C]">
                          {user.email}
                        </div>
                      </div>

                      <div className="mt-1 space-y-0.5">
                        <button
                          type="button"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setActiveAccountTab('account');
                          }}
                          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-medium text-[#1C1917] hover:bg-[#FAF9F6] cursor-pointer"
                        >
                          <User className="h-3.5 w-3.5 text-[#1E5631]" />
                          <span>Account</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setActiveAccountTab('privacy');
                          }}
                          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-medium text-[#1C1917] hover:bg-[#FAF9F6] cursor-pointer"
                        >
                          <Shield className="h-3.5 w-3.5 text-[#1E5631]" />
                          <span>Privacy</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setActiveAccountTab('history');
                          }}
                          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-medium text-[#1C1917] hover:bg-[#FAF9F6] cursor-pointer"
                        >
                          <History className="h-3.5 w-3.5 text-[#881337]" />
                          <span>History</span>
                        </button>

                        <div className="my-1 h-px bg-[#EBE7E0]" />

                        <button
                          type="button"
                          onClick={handleSignOut}
                          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-semibold text-[#881337] hover:bg-[#FDF2F4] cursor-pointer"
                        >
                          <LogOut className="h-3.5 w-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="border-b border-[#EBE7E0] px-3 py-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#1C1917]">
                          <Compass className="h-3.5 w-3.5 text-[#881337]" />
                          <span>Guest Mode</span>
                        </div>
                        <div className="text-[10px] text-[#78716C]">
                          Browsing &amp; shopping as guest
                        </div>
                      </div>
                      <div className="mt-1 space-y-0.5">
                        <button
                          type="button"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsAuthModalOpen(true);
                          }}
                          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-semibold text-[#1E5631] hover:bg-[#F2F7F4] cursor-pointer"
                        >
                          <LogIn className="h-3.5 w-3.5" />
                          <span>Sign In / Sign Up</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleSignOut}
                          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-semibold text-[#881337] hover:bg-[#FDF2F4] cursor-pointer"
                        >
                          <LogOut className="h-3.5 w-3.5" />
                          <span>Exit Guest Mode</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="rounded-full border border-[#1C1917]/20 bg-white px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#1C1917] transition hover:bg-[#1C1917] hover:text-white cursor-pointer"
            >
              Sign In
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
