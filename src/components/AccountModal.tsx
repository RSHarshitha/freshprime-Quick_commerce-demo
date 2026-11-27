'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  X,
  User,
  Shield,
  History,
  Phone,
  Mail,
  ShieldCheck,
  Leaf,
  Snowflake,
  ShoppingBag,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function AccountModal() {
  const {
    user,
    orders,
    activeAccountTab,
    setActiveAccountTab,
    logout,
  } = useStore();
  const [hygieneAlerts, setHygieneAlerts] = useState(true);
  const [saveOrderHistory, setSaveOrderHistory] = useState(true);

  if (!user || !activeAccountTab) return null;

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    /* Blurred-out background behind the centered glassy window */
    <div
      onClick={() => setActiveAccountTab(null)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1917]/30 p-4 backdrop-blur-md"
    >
      {/* Centered Glassy Window (does not cover full screen) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/70 bg-white/75 shadow-2xl backdrop-blur-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EBE7E0]/80 bg-white/50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E5631] to-[#881337] text-sm font-bold text-white shadow-sm">
              {initials}
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#1C1917]">{user.name}</h2>
              <p className="text-xs text-[#78716C]">{user.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActiveAccountTab(null)}
            className="rounded-xl p-1.5 text-[#78716C] hover:bg-white/80 hover:text-[#1C1917] cursor-pointer"
            aria-label="Close window"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-1.5 border-b border-[#EBE7E0]/70 bg-white/40 px-6 py-2.5">
          {[
            { id: 'account' as const, label: 'Account', icon: User },
            { id: 'privacy' as const, label: 'Privacy', icon: Shield },
            { id: 'history' as const, label: `History (${orders.length})`, icon: History },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeAccountTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveAccountTab(tab.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                  active
                    ? 'bg-[#1C1917] text-white shadow-xs'
                    : 'text-[#78716C] hover:bg-white/70 hover:text-[#1C1917]'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Body */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {activeAccountTab === 'account' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#EBE7E0] bg-white/80 p-4 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#78716C]">
                  Account Holder Details
                </div>
                <div className="flex items-center gap-2.5 text-sm text-[#1C1917]">
                  <User className="h-4 w-4 text-[#1E5631]" />
                  <span className="font-semibold">{user.name}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-[#1C1917]">
                  <Mail className="h-4 w-4 text-[#1E5631]" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-[#1C1917]">
                  <Phone className="h-4 w-4 text-[#881337]" />
                  <span>{user.phone}</span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-[#1E5631]/20 bg-[#F2F7F4]/80 p-4">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-5 w-5 text-[#1E5631]" />
                  <div>
                    <div className="text-xs font-bold text-[#1C1917]">
                      Dual-Zone Hygiene Profile Active
                    </div>
                    <div className="text-[11px] text-[#78716C]">
                      Grocery &amp; Meat always packed and delivered separately
                    </div>
                  </div>
                </div>
                <span className="rounded-full bg-[#1E5631] px-2.5 py-0.5 text-[10px] font-bold text-white">
                  VERIFIED
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => setActiveAccountTab('history')}
                  className="text-xs font-bold text-[#1E5631] hover:underline cursor-pointer"
                >
                  View Order History ({orders.length}) →
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-xl border border-[#881337]/25 bg-[#FDF2F4] px-3.5 py-1.5 text-xs font-bold text-[#881337] hover:bg-pink-100 cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}

          {activeAccountTab === 'privacy' && (
            <div className="space-y-3">
              <div className="rounded-2xl border border-[#EBE7E0] bg-white/80 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[#78716C]">
                  Privacy &amp; Cold-Chain Controls
                </div>
                <label className="mt-3 flex cursor-pointer items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-[#1C1917]">
                      Separate Cold-Chain Alerts
                    </div>
                    <div className="text-xs text-[#78716C]">
                      Notify separately for Ambient Grocery and 0–4°C Meat dispatch
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={hygieneAlerts}
                    onChange={(e) => setHygieneAlerts(e.target.checked)}
                    className="h-4 w-4 accent-[#1E5631]"
                  />
                </label>

                <label className="mt-4 flex cursor-pointer items-center justify-between gap-3 border-t border-[#EBE7E0] pt-3">
                  <div>
                    <div className="text-sm font-semibold text-[#1C1917]">
                      Save Local Order History
                    </div>
                    <div className="text-xs text-[#78716C]">
                      Keep placed orders stored in this browser for quick re-ordering
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={saveOrderHistory}
                    onChange={(e) => setSaveOrderHistory(e.target.checked)}
                    className="h-4 w-4 accent-[#1E5631]"
                  />
                </label>
              </div>
            </div>
          )}

          {activeAccountTab === 'history' && (
            <div className="space-y-3">
              {orders.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#EBE7E0] bg-white/70 p-8 text-center">
                  <ShoppingBag className="mx-auto h-9 w-9 text-[#78716C]/50" />
                  <div className="mt-2 text-sm font-bold text-[#1C1917]">
                    No Placed Orders Yet
                  </div>
                  <p className="mt-1 text-xs text-[#78716C]">
                    Complete a checkout to see your order history and dual-shipment breakdown here.
                  </p>
                  <Link
                    href="/orders"
                    onClick={() => setActiveAccountTab(null)}
                    className="mt-4 inline-block rounded-xl bg-[#1C1917] px-4 py-2 text-xs font-bold text-white"
                  >
                    Go to Order Panel
                  </Link>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-2xl border border-[#EBE7E0] bg-white/85 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-extrabold text-[#1C1917]">
                          {order.id}
                        </span>
                        <span className="ml-2 text-xs text-[#78716C]">
                          {order.createdAt}
                        </span>
                      </div>
                      <span className="text-sm font-extrabold text-[#1C1917]">
                        ₹{order.combinedTotal}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                      {order.groceryShipment && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#F2F7F4] px-2.5 py-0.5 font-semibold text-[#1E5631]">
                          <Leaf className="h-3 w-3" /> Grocery: ₹{order.grocerySubtotal} (
                          {order.groceryShipment.status})
                        </span>
                      )}
                      {order.meatShipment && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#FDF2F4] px-2.5 py-0.5 font-semibold text-[#881337]">
                          <Snowflake className="h-3 w-3" /> Meat: ₹{order.meatSubtotal} (
                          {order.meatShipment.status})
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
