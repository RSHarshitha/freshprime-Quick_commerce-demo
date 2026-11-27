'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  X,
  Leaf,
  Snowflake,
  Minus,
  Plus,
  Trash2,
  ShieldCheck,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { FREE_DELIVERY_THRESHOLD } from '@/data/catalog';
import { CartItem } from '@/types/store';

function CartItemRow({
  item,
  onUpdate,
  onRemove,
}: {
  item: CartItem;
  onUpdate: (key: string, delta: number) => void;
  onRemove: (key: string) => void;
}) {
  const isMeat = item.section === 'meat';
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-[#EBE7E0] bg-white p-2.5">
      <div className="flex items-center gap-2.5 min-w-0">
        <img
          src={item.image}
          alt={item.name}
          className="h-12 w-12 shrink-0 rounded-lg object-cover"
        />
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-[#1C1917]">{item.name}</div>
          <div className="text-xs text-[#78716C]">{item.variantLabel}</div>
          <div className="mt-0.5 text-xs font-bold text-[#1C1917]">
            ₹{item.price * item.quantity}
            <span className="ml-1 font-normal text-[#78716C]">
              (₹{item.price} × {item.quantity})
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <div
          className={`inline-flex items-center gap-1 rounded-lg border px-1.5 py-1 ${
            isMeat ? 'border-[#881337]/20 bg-[#FDF2F4]' : 'border-[#1E5631]/20 bg-[#F2F7F4]'
          }`}
        >
          <button
            type="button"
            onClick={() => onUpdate(item.key, -1)}
            className="p-0.5 text-[#1C1917] cursor-pointer"
            aria-label="Decrease quantity"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="min-w-[1.25rem] text-center text-xs font-bold text-[#1C1917]">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => onUpdate(item.key, 1)}
            className="p-0.5 text-[#1C1917] cursor-pointer"
            aria-label="Increase quantity"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => onRemove(item.key)}
          className="rounded-lg p-1.5 text-[#78716C] hover:bg-[#FAF9F6] hover:text-[#881337] cursor-pointer"
          aria-label="Remove item"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function CartDrawer() {
  const router = useRouter();
  const {
    isCartOpen,
    setIsCartOpen,
    groceryItems,
    meatItems,
    grocerySubtotal,
    meatSubtotal,
    combinedSubtotal,
    deliveryFee,
    combinedTotal,
    freeDeliveryRemaining,
    updateQuantity,
    removeFromCart,
    user,
    setIsAuthModalOpen,
  } = useStore();

  if (!isCartOpen) return null;

  const progressPercent = Math.min(
    100,
    Math.round((combinedSubtotal / FREE_DELIVERY_THRESHOLD) * 100)
  );

  const handleCheckout = () => {
    setIsCartOpen(false);
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#1C1917]/40 backdrop-blur-xs">
      <div className="flex h-full w-full max-w-md flex-col bg-[#FAF9F6] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EBE7E0] bg-white px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-[#1C1917]">Your Hygiene-Separated Cart</h2>
            <p className="text-xs text-[#78716C]">
              Grocery &amp; Meat are billed together, packed &amp; delivered separately
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="rounded-lg p-1.5 text-[#78716C] hover:bg-[#FAF9F6] cursor-pointer"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Free Delivery Progress */}
        {combinedSubtotal > 0 && (
          <div className="border-b border-[#EBE7E0] bg-white px-5 py-3">
            <div className="flex items-center justify-between text-xs font-medium">
              {freeDeliveryRemaining > 0 ? (
                <span className="text-[#1C1917]">
                  Add <strong>₹{freeDeliveryRemaining}</strong> more for{' '}
                  <span className="font-bold text-[#1E5631]">FREE combined delivery</span>
                </span>
              ) : (
                <span className="font-semibold text-[#1E5631]">
                  You unlocked FREE combined delivery!
                </span>
              )}
              <span className="text-[#78716C]">{progressPercent}%</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#EBE7E0]">
              <div
                className="h-full rounded-full bg-[#1E5631] transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Body */}
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {groceryItems.length === 0 && meatItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-[#78716C]">
              <ShoppingBag className="h-12 w-12 text-[#EBE7E0]" />
              <p className="mt-3 text-sm font-semibold text-[#1C1917]">Your cart is empty</p>
              <p className="mt-1 max-w-xs text-xs text-[#78716C]">
                Add items from Botanical Market or Artisan Butchery to see them grouped separately here.
              </p>
              <div className="mt-5 flex gap-2">
                <Link
                  href="/grocery"
                  onClick={() => setIsCartOpen(false)}
                  className="rounded-xl bg-[#1E5631] px-4 py-2 text-xs font-semibold text-white hover:bg-[#2D7A47]"
                >
                  Shop Grocery
                </Link>
                <Link
                  href="/meat"
                  onClick={() => setIsCartOpen(false)}
                  className="rounded-xl bg-[#881337] px-4 py-2 text-xs font-semibold text-white hover:bg-[#9F1239]"
                >
                  Shop Meat
                </Link>
              </div>
            </div>
          ) : (
            <>
              {groceryItems.length > 0 && (
                <div className="rounded-2xl border border-[#1E5631]/20 bg-[#F2F7F4] p-3">
                  <div className="mb-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1E5631] text-white">
                        <Leaf className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wide text-[#1E5631]">
                          Botanical Market ({groceryItems.reduce((s, i) => s + i.quantity, 0)})
                        </div>
                        <div className="text-[11px] text-[#78716C]">
                          Separate Ambient / Fresh Produce Bag
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-[#1C1917]">₹{grocerySubtotal}</div>
                  </div>

                  <div className="space-y-2">
                    {groceryItems.map((item) => (
                      <CartItemRow
                        key={item.key}
                        item={item}
                        onUpdate={updateQuantity}
                        onRemove={removeFromCart}
                      />
                    ))}
                  </div>
                </div>
              )}

              {meatItems.length > 0 && (
                <div className="rounded-2xl border border-[#881337]/20 bg-[#FDF2F4] p-3">
                  <div className="mb-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#881337] text-white">
                        <Snowflake className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wide text-[#881337]">
                          Artisan Butchery ({meatItems.reduce((s, i) => s + i.quantity, 0)})
                        </div>
                        <div className="text-[11px] text-[#78716C]">
                          Separate 0–4°C Vacuum + Ice Gel Box
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-[#1C1917]">₹{meatSubtotal}</div>
                  </div>

                  <div className="space-y-2">
                    {meatItems.map((item) => (
                      <CartItemRow
                        key={item.key}
                        item={item}
                        onUpdate={updateQuantity}
                        onRemove={removeFromCart}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Totals */}
        {combinedSubtotal > 0 && (
          <div className="border-t border-[#EBE7E0] bg-white p-4">
            <div className="space-y-1.5 text-xs">
              {grocerySubtotal > 0 && (
                <div className="flex justify-between text-[#1E5631]">
                  <span>Grocery Subtotal (Shipment 1)</span>
                  <span className="font-semibold">₹{grocerySubtotal}</span>
                </div>
              )}
              {meatSubtotal > 0 && (
                <div className="flex justify-between text-[#881337]">
                  <span>Meat &amp; Butcher Subtotal (Shipment 2)</span>
                  <span className="font-semibold">₹{meatSubtotal}</span>
                </div>
              )}
              <div className="flex justify-between text-[#78716C]">
                <span>Combined Delivery Fee (Covers both shipments)</span>
                <span className="font-semibold">
                  {deliveryFee === 0 ? (
                    <span className="text-[#1E5631]">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between border-t border-[#EBE7E0] pt-2 text-base font-extrabold text-[#1C1917]">
                <span>Combined Total</span>
                <span>₹{combinedTotal}</span>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#78716C]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#1E5631]" />
              <span>
                {user
                  ? 'Pick independent delivery slots on the next step'
                  : 'Sign in with 1-Click Demo Login on the next step'}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1C1917] px-4 py-3 text-sm font-bold text-white transition hover:bg-stone-800 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
