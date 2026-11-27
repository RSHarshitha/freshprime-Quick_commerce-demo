'use client';

import { useState } from 'react';
import { Minus, Plus, ShieldCheck } from 'lucide-react';
import { Product } from '@/types/store';
import { useStore } from '@/context/StoreContext';

interface SmokeBurst {
  id: number;
  label: string;
}

export function ProductCard({
  product,
  showcaseOnly = false,
}: {
  product: Product;
  showcaseOnly?: boolean;
}) {
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0].id);
  const [smokeBursts, setSmokeBursts] = useState<SmokeBurst[]>([]);
  const { cart, addToCart, updateQuantity, setIsAuthModalOpen } = useStore();

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];

  const isMeat = product.section === 'meat';
  const cartKey = `${product.id}__${selectedVariant.id}`;
  const cartItem = cart.find((item) => item.key === cartKey);

  const savings =
    selectedVariant.mrp && selectedVariant.mrp > selectedVariant.price
      ? selectedVariant.mrp - selectedVariant.price
      : 0;

  const discount =
    selectedVariant.mrp && selectedVariant.mrp > selectedVariant.price
      ? Math.round((savings / selectedVariant.mrp) * 100)
      : 0;

  const triggerSmokeEffect = (label: string) => {
    const id = Date.now() + Math.random();
    setSmokeBursts((prev) => [...prev, { id, label }]);
    setTimeout(() => {
      setSmokeBursts((prev) => prev.filter((b) => b.id !== id));
    }, 680);
  };

  // Pure editorial showroom card on the landing page (no prices/rates, no + Add button)
  if (showcaseOnly) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsAuthModalOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsAuthModalOpen(true);
          }
        }}
        className="group flex h-full cursor-pointer flex-col justify-between rounded-2xl border border-white/80 bg-white/85 p-3.5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
      >
        <div>
          <div className="relative overflow-hidden rounded-xl bg-[#FAF9F6]">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-48 w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span
              className={`absolute top-2.5 left-2.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur-md ${
                isMeat
                  ? 'bg-white/90 text-[#881337]'
                  : 'bg-white/90 text-[#1E5631]'
              }`}
            >
              {product.category}
            </span>
          </div>

          <h3 className="mt-3 text-base font-bold tracking-tight text-[#1C1917]">
            {product.name}
          </h3>
          <p className="mt-0.5 truncate text-xs text-[#78716C]">
            {product.origin}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-[#EBE7E0]/80 pt-2.5">
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
              isMeat ? 'text-[#881337]' : 'text-[#1E5631]'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{product.badges[0]}</span>
          </span>
          <span className="text-[11px] font-semibold text-[#78716C] group-hover:text-[#1C1917]">
            Tap to view →
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-[#EBE7E0] bg-white p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div>
        {/* Crisp High-Res Food Photography */}
        <div className="relative overflow-hidden rounded-xl bg-[#FAF9F6]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-44 w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Subtle Top-Left Category Pill */}
          <span
            className={`absolute top-2.5 left-2.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur-md ${
              isMeat
                ? 'bg-white/90 text-[#881337]'
                : 'bg-white/90 text-[#1E5631]'
            }`}
          >
            {product.category}
          </span>

          {/* Clean Top-Right Discount Tag */}
          {discount > 0 && (
            <span className="absolute top-2.5 right-2.5 rounded-full bg-[#FEF3C7] px-2.5 py-0.5 text-[11px] font-bold text-[#B45309] shadow-xs">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Title & Concise 1-Line Subtitle */}
        <h3 className="mt-3 text-base font-bold tracking-tight text-[#1C1917]">
          {product.name}
        </h3>
        <p className="mt-0.5 truncate text-xs text-[#78716C]">
          {product.origin} · {product.badges[0]}
        </p>

        {/* Compact Pack Size / Cut Style Pills */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.variants.map((variant) => {
            const active = variant.id === selectedVariant.id;
            return (
              <button
                key={variant.id}
                type="button"
                onClick={() => setSelectedVariantId(variant.id)}
                className={`rounded-lg border px-2.5 py-1 text-left text-[11px] font-semibold transition cursor-pointer ${
                  active
                    ? isMeat
                      ? 'border-[#881337] bg-[#881337] text-white'
                      : 'border-[#1E5631] bg-[#1E5631] text-white'
                    : 'border-[#EBE7E0] bg-[#FAF9F6] text-[#1C1917] hover:border-[#78716C]/40'
                }`}
              >
                {variant.cut ? `${variant.cut} · ${variant.weight}` : variant.weight}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Row: Price + Add / Stepper */}
      <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#EBE7E0] pt-3">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold text-[#1C1917]">
              ₹{selectedVariant.price}
            </span>
            {selectedVariant.mrp && (
              <span className="text-xs text-[#78716C] line-through">
                ₹{selectedVariant.mrp}
              </span>
            )}
          </div>
          <div className="text-[11px] text-[#78716C]">
            {selectedVariant.pieces || selectedVariant.weight}
          </div>
        </div>

        <div className="relative">
          {/* Smoke / air-drop particles floating toward the cart */}
          {smokeBursts.map((burst) => (
            <span
              key={burst.id}
              className="pointer-events-none absolute -top-2 right-1 z-20 flex items-center justify-center"
            >
              <span
                className={`animate-smoke-ring absolute h-7 w-7 rounded-full ${
                  isMeat ? 'bg-[#881337]/30' : 'bg-[#1E5631]/30'
                }`}
              />
              <span
                className={`animate-smoke-drop relative rounded-full px-2 py-0.5 text-xs font-extrabold text-white shadow-sm ${
                  isMeat ? 'bg-[#881337]/85' : 'bg-[#1E5631]/85'
                }`}
              >
                {burst.label}
              </span>
            </span>
          ))}

          {cartItem ? (
            <div
              className={`inline-flex items-center gap-2 rounded-xl px-2 py-1.5 text-white shadow-sm ${
                isMeat ? 'bg-[#881337]' : 'bg-[#1E5631]'
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  updateQuantity(cartKey, -1);
                  triggerSmokeEffect('-1');
                }}
                className="rounded-lg p-1 transition hover:scale-110 hover:bg-white/20 active:scale-95 cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="min-w-[1.25rem] text-center text-sm font-bold">
                {cartItem.quantity}
              </span>
              <button
                type="button"
                onClick={() => {
                  updateQuantity(cartKey, 1);
                  triggerSmokeEffect('+1');
                }}
                className="rounded-lg p-1 transition hover:scale-125 hover:bg-white/25 active:scale-95 cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                addToCart(product, selectedVariant);
                triggerSmokeEffect('+1');
              }}
              className={`inline-flex items-center gap-1 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:shadow-md active:scale-95 cursor-pointer ${
                isMeat
                  ? 'bg-[#881337] hover:bg-[#9F1239]'
                  : 'bg-[#1E5631] hover:bg-[#2D7A47]'
              }`}
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
