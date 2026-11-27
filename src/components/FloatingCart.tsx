'use client';

import { useState } from 'react';
import {
  ShoppingBag,
  X,
  Leaf,
  Snowflake,
  ArrowRight,
  ChevronLeft,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function FloatingCart() {
  const {
    groceryItems,
    meatItems,
    totalItemCount,
    combinedTotal,
    setIsCartOpen,
  } = useStore();
  const [isPeekOpen, setIsPeekOpen] = useState(false);

  if (totalItemCount === 0) return null;

  const groceryCount = groceryItems.reduce((s, i) => s + i.quantity, 0);
  const meatCount = meatItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <div
      onMouseLeave={() => setIsPeekOpen(false)}
      className="fixed right-5 bottom-5 z-40 flex items-end gap-3"
    >
      {/* Translucent floating scrollable list on the LEFT; closes when cursor leaves */}
      {isPeekOpen && (
        <div className="w-72 sm:w-80 rounded-2xl border border-[#EBE7E0] bg-white/85 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#EBE7E0] bg-[#1C1917]/90 px-3.5 py-2.5 text-white backdrop-blur-md">
            <div>
              <div className="text-xs font-bold">Added Items ({totalItemCount})</div>
              <div className="text-[10px] text-stone-300">
                Scroll to inspect · Move cursor away to close
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsPeekOpen(false)}
              className="rounded-lg p-1 text-stone-300 hover:bg-white/10 hover:text-white cursor-pointer"
              aria-label="Close quick list"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-64 overflow-y-auto divide-y divide-[#EBE7E0] p-2.5 space-y-2">
            {groceryItems.length > 0 && (
              <div className="pb-2">
                <div className="mb-1.5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#1E5631]">
                  <Leaf className="h-3 w-3" /> Grocery ({groceryCount})
                </div>
                <div className="space-y-1.5">
                  {groceryItems.map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between gap-2 rounded-lg border border-[#1E5631]/15 bg-[#F2F7F4]/80 px-2 py-1.5 text-xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-9 w-9 shrink-0 rounded-md object-cover"
                        />
                        <div className="truncate">
                          <div className="truncate font-semibold text-[#1C1917]">
                            {item.name}
                          </div>
                          <div className="text-[10px] text-[#78716C]">
                            {item.weight} × {item.quantity}
                          </div>
                        </div>
                      </div>
                      <span className="shrink-0 font-bold text-[#1C1917]">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {meatItems.length > 0 && (
              <div className="pt-1">
                <div className="mb-1.5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#881337]">
                  <Snowflake className="h-3 w-3" /> Meat &amp; Butcher ({meatCount})
                </div>
                <div className="space-y-1.5">
                  {meatItems.map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between gap-2 rounded-lg border border-[#881337]/15 bg-[#FDF2F4]/80 px-2 py-1.5 text-xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-9 w-9 shrink-0 rounded-md object-cover"
                        />
                        <div className="truncate">
                          <div className="truncate font-semibold text-[#1C1917]">
                            {item.name}
                          </div>
                          <div className="text-[10px] text-[#78716C]">
                            {item.cut ? `${item.cut} · ` : ''}
                            {item.weight} × {item.quantity}
                          </div>
                        </div>
                      </div>
                      <span className="shrink-0 font-bold text-[#1C1917]">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-[#EBE7E0] bg-white/75 p-2.5">
            <button
              type="button"
              onClick={() => {
                setIsPeekOpen(false);
                setIsCartOpen(true);
              }}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#1C1917] px-3 py-2 text-xs font-bold text-white hover:bg-stone-800 cursor-pointer"
            >
              <span>Open Full Cart &amp; Checkout (₹{combinedTotal})</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Translucent Floating Cart Pill */}
      <button
        type="button"
        onClick={() => setIsPeekOpen((prev) => !prev)}
        className="flex items-center gap-3 rounded-2xl border border-white/40 bg-[#1C1917]/80 px-4 py-3 text-white shadow-2xl backdrop-blur-md transition hover:bg-[#1C1917]/95 cursor-pointer"
      >
        <ChevronLeft
          className={`h-4 w-4 text-stone-300 transition-transform ${
            isPeekOpen ? 'rotate-180' : ''
          }`}
        />
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1E5631] text-white">
          <ShoppingBag className="h-4 w-4" />
        </div>
        <div className="text-left">
          <div className="text-xs font-bold">
            {totalItemCount} {totalItemCount === 1 ? 'Product' : 'Products'} in Cart
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-stone-200">
            {groceryCount > 0 && (
              <span className="text-emerald-300">G:{groceryCount}</span>
            )}
            {meatCount > 0 && (
              <span className="text-pink-300">M:{meatCount}</span>
            )}
            <span>· ₹{combinedTotal}</span>
          </div>
        </div>
      </button>
    </div>
  );
}
