'use client';

import Link from 'next/link';
import {
  Leaf,
  Snowflake,
  Truck,
  CheckCircle2,
  FastForward,
  MapPin,
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { SHIPMENT_STEPS } from '@/data/catalog';
import { OrderShipment } from '@/types/store';

function ShipmentTrackerCard({
  shipment,
  orderId,
  onAdvance,
}: {
  shipment: OrderShipment;
  orderId: string;
  onAdvance: () => void;
}) {
  const isMeat = shipment.section === 'meat';
  const currentIndex = SHIPMENT_STEPS.indexOf(shipment.status);
  const isDelivered = shipment.status === 'Delivered';

  return (
    <div
      className={`rounded-2xl border p-4 ${
        isMeat
          ? 'border-[#881337]/20 bg-[#FDF2F4]/60'
          : 'border-[#1E5631]/20 bg-[#F2F7F4]/60'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-lg text-white ${
              isMeat ? 'bg-[#881337]' : 'bg-[#1E5631]'
            }`}
          >
            {isMeat ? <Snowflake className="h-4 w-4" /> : <Leaf className="h-4 w-4" />}
          </span>
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-[#1C1917]">
              {isMeat ? 'Meat Cold-Chain Shipment' : 'Fresh Grocery Shipment'}
            </div>
            <div className="text-[11px] text-[#78716C]">
              {shipment.shipmentId} · {shipment.tempRange}
            </div>
          </div>
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
            isDelivered
              ? 'bg-[#1E5631] text-white'
              : isMeat
              ? 'bg-pink-100 text-[#881337]'
              : 'bg-emerald-100 text-[#1E5631]'
          }`}
        >
          {shipment.status}
        </span>
      </div>

      {/* 5-step progress */}
      <div className="mt-4 grid grid-cols-5 gap-1.5">
        {SHIPMENT_STEPS.map((step, idx) => {
          const completed = idx <= currentIndex;
          return (
            <div key={step} className="text-center">
              <div
                className={`h-1.5 rounded-full transition-all ${
                  completed
                    ? isMeat
                      ? 'bg-[#881337]'
                      : 'bg-[#1E5631]'
                    : 'bg-[#EBE7E0]'
                }`}
              />
              <div
                className={`mt-1 text-[10px] leading-tight ${
                  completed ? 'font-semibold text-[#1C1917]' : 'text-[#78716C]'
                }`}
              >
                {step}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#EBE7E0] pt-3 text-xs text-[#78716C]">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-[#1C1917]">
            <Truck className="h-3.5 w-3.5" />
            <span>
              <strong>{shipment.riderName}</strong> · {shipment.vehicleType}
            </span>
          </div>
          <div>
            Slot: <strong className="text-[#1C1917]">{shipment.slotLabel}</strong> · Subtotal:{' '}
            <strong className="text-[#1C1917]">₹{shipment.subtotal}</strong>
          </div>
        </div>

        {!isDelivered ? (
          <button
            type="button"
            onClick={onAdvance}
            className="inline-flex items-center gap-1 rounded-lg border border-[#EBE7E0] bg-white px-2.5 py-1.5 text-[11px] font-semibold text-[#1C1917] shadow-xs hover:bg-stone-50 cursor-pointer"
            title={`Advance ${orderId} ${shipment.section} status`}
          >
            <FastForward className="h-3.5 w-3.5" />
            <span>Simulate Next Stage</span>
          </button>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1E5631]">
            <CheckCircle2 className="h-4 w-4" /> Delivered Safely
          </span>
        )}
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const {
    orders,
    advanceShipmentStatus,
    cart,
    groceryItems,
    meatItems,
    grocerySubtotal,
    meatSubtotal,
    deliveryFee,
    combinedTotal,
    updateQuantity,
    removeFromCart,
    user,
    setIsAuthModalOpen,
  } = useStore();

  const hasLiveCart = cart.length > 0;
  const hasPlacedOrders = orders.length > 0;

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1C1917] sm:text-3xl">
            Orders &amp; Dual-Shipment Tracking
          </h1>
          <p className="mt-1 text-sm text-[#78716C]">
            Live cart items update here on the spot; placed orders track Grocery and Meat shipments independently.
          </p>
        </div>

        {/* Empty State when neither live cart nor placed orders exist */}
        {!hasLiveCart && !hasPlacedOrders && (
          <div className="mt-8 rounded-3xl border border-dashed border-[#EBE7E0] bg-white p-12 text-center shadow-sm">
            <ShoppingBag className="mx-auto h-12 w-12 text-[#EBE7E0]" />
            <h2 className="mt-3 text-lg font-bold text-[#1C1917]">
              Your Order Panel is Empty
            </h2>
            <p className="mx-auto mt-1 max-w-md text-xs text-[#78716C]">
              Add products from Botanical Market (Grocery) or Artisan Butchery (Meat) to see your live order breakdown and totals update here on the spot.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <Link
                href="/grocery"
                className="rounded-xl bg-[#1E5631] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#2D7A47]"
              >
                Browse Grocery
              </Link>
              <Link
                href="/meat"
                className="rounded-xl bg-[#881337] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#9F1239]"
              >
                Browse Meat
              </Link>
            </div>
          </div>
        )}

        {/* LIVE ON-THE-SPOT CART ORDER PREVIEW */}
        {hasLiveCart && (
          <div className="mt-6 rounded-3xl border border-[#EBE7E0] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EBE7E0] pb-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#F2F7F4] px-3 py-1 text-[11px] font-bold text-[#1E5631]">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#1E5631]" />
                  <span>LIVE CART DRAFT · UPDATES ON THE SPOT</span>
                </div>
                <h2 className="mt-2 text-lg font-extrabold text-[#1C1917]">
                  Current Items Ready for Checkout
                </h2>
              </div>

              <div className="text-right">
                <div className="text-xs text-[#78716C]">
                  Delivery Fee: {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </div>
                <div className="text-2xl font-extrabold text-[#1C1917]">
                  ₹{combinedTotal}
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {groceryItems.length > 0 && (
                <div className="rounded-2xl border border-[#1E5631]/20 bg-[#F2F7F4]/60 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-[#1E5631]">
                      <Leaf className="h-4 w-4" /> Grocery ({groceryItems.reduce((s, i) => s + i.quantity, 0)})
                    </span>
                    <span className="text-sm font-extrabold text-[#1C1917]">
                      ₹{grocerySubtotal}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {groceryItems.map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between gap-2 rounded-xl border border-[#EBE7E0] bg-white p-2.5"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-10 w-10 shrink-0 rounded-lg object-cover"
                          />
                          <div className="min-w-0">
                            <div className="truncate text-xs font-bold text-[#1C1917]">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-[#78716C]">
                              {item.weight} · ₹{item.price * item.quantity}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.key, -1)}
                            className="rounded-md border border-[#EBE7E0] p-1 hover:bg-[#FAF9F6] cursor-pointer"
                            aria-label="Decrease"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-5 text-center text-xs font-bold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.key, 1)}
                            className="rounded-md border border-[#EBE7E0] p-1 hover:bg-[#FAF9F6] cursor-pointer"
                            aria-label="Increase"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.key)}
                            className="rounded-md p-1 text-[#78716C] hover:text-[#881337] cursor-pointer"
                            aria-label="Remove"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {meatItems.length > 0 && (
                <div className="rounded-2xl border border-[#881337]/20 bg-[#FDF2F4]/60 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-[#881337]">
                      <Snowflake className="h-4 w-4" /> Meat &amp; Butcher ({meatItems.reduce((s, i) => s + i.quantity, 0)})
                    </span>
                    <span className="text-sm font-extrabold text-[#1C1917]">
                      ₹{meatSubtotal}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {meatItems.map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between gap-2 rounded-xl border border-[#EBE7E0] bg-white p-2.5"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-10 w-10 shrink-0 rounded-lg object-cover"
                          />
                          <div className="min-w-0">
                            <div className="truncate text-xs font-bold text-[#1C1917]">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-[#78716C]">
                              {item.cut ? `${item.cut} · ` : ''}
                              {item.weight} · ₹{item.price * item.quantity}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.key, -1)}
                            className="rounded-md border border-[#EBE7E0] p-1 hover:bg-[#FAF9F6] cursor-pointer"
                            aria-label="Decrease"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-5 text-center text-xs font-bold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.key, 1)}
                            className="rounded-md border border-[#EBE7E0] p-1 hover:bg-[#FAF9F6] cursor-pointer"
                            aria-label="Increase"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.key)}
                            className="rounded-md p-1 text-[#78716C] hover:text-[#881337] cursor-pointer"
                            aria-label="Remove"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-end">
              {user ? (
                <Link
                  href="/checkout"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1C1917] px-5 py-2.5 text-xs font-bold text-white hover:bg-stone-800"
                >
                  <span>Proceed to Checkout (₹{combinedTotal})</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1C1917] px-5 py-2.5 text-xs font-bold text-white hover:bg-stone-800 cursor-pointer"
                >
                  <span>Sign In to Checkout (₹{combinedTotal})</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* PLACED ORDERS */}
        {hasPlacedOrders && (
          <div className="mt-6 space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-3xl border border-[#EBE7E0] bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#EBE7E0] pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-extrabold text-[#1C1917]">{order.id}</span>
                      <span className="rounded-full bg-[#FAF9F6] border border-[#EBE7E0] px-2.5 py-0.5 text-xs font-medium text-[#78716C]">
                        {order.createdAt}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-[#78716C]">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>
                        {order.customerName} · {order.address}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-[#78716C]">
                      Combined Total ({order.paymentMethod})
                    </div>
                    <div className="text-xl font-extrabold text-[#1C1917]">
                      ₹{order.combinedTotal}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {order.groceryShipment && (
                    <ShipmentTrackerCard
                      shipment={order.groceryShipment}
                      orderId={order.id}
                      onAdvance={() => advanceShipmentStatus(order.id, 'grocery')}
                    />
                  )}
                  {order.meatShipment && (
                    <ShipmentTrackerCard
                      shipment={order.meatShipment}
                      orderId={order.id}
                      onAdvance={() => advanceShipmentStatus(order.id, 'meat')}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
