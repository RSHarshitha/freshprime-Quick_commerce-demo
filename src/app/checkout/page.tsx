'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Leaf,
  Snowflake,
  ShieldCheck,
  CheckCircle2,
  Truck,
  Clock,
  ArrowRight,
  CreditCard,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import {
  GROCERY_DELIVERY_SLOTS,
  MEAT_DELIVERY_SLOTS,
} from '@/data/catalog';
import { Order } from '@/types/store';

export default function CheckoutPage() {
  const {
    groceryItems,
    meatItems,
    grocerySubtotal,
    meatSubtotal,
    deliveryFee,
    combinedTotal,
    placeOrder,
  } = useStore();

  const [customerName, setCustomerName] = useState('Priya Sharma');
  const [phone, setPhone] = useState('+91 98450 11223');
  const [address, setAddress] = useState(
    '14B, Greenwoods Apartments, Koramangala 4th Block, Bengaluru'
  );
  const [paymentMethod, setPaymentMethod] = useState('UPI (GPay / PhonePe)');
  const [grocerySlotId, setGrocerySlotId] = useState(GROCERY_DELIVERY_SLOTS[0].id);
  const [meatSlotId, setMeatSlotId] = useState(MEAT_DELIVERY_SLOTS[0].id);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const selectedGrocerySlot =
    GROCERY_DELIVERY_SLOTS.find((s) => s.id === grocerySlotId) || GROCERY_DELIVERY_SLOTS[0];
  const selectedMeatSlot =
    MEAT_DELIVERY_SLOTS.find((s) => s.id === meatSlotId) || MEAT_DELIVERY_SLOTS[0];

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (groceryItems.length === 0 && meatItems.length === 0) return;

    const order = placeOrder({
      customerName,
      phone,
      address,
      paymentMethod,
      grocerySlotLabel: `${selectedGrocerySlot.label} (${selectedGrocerySlot.window})`,
      meatSlotLabel: `${selectedMeatSlot.label} (${selectedMeatSlot.window})`,
    });
    setConfirmedOrder(order);
  };

  // Order Confirmation Screen
  if (confirmedOrder) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Order Confirmed · {confirmedOrder.id}
              </div>
              <h1 className="text-2xl font-extrabold text-stone-900">
                Thank you, {confirmedOrder.customerName}!
              </h1>
            </div>
          </div>

          <p className="mt-3 text-sm text-stone-600">
            Your order has been automatically split into{' '}
            <strong>
              {confirmedOrder.groceryShipment && confirmedOrder.meatShipment
                ? '2 separate hygiene-isolated shipments'
                : '1 dedicated shipment'}
            </strong>{' '}
            for zero cross-contamination.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {confirmedOrder.groceryShipment && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-emerald-800">
                    <Leaf className="h-4 w-4" /> Grocery Shipment
                  </span>
                  <span className="rounded-full bg-emerald-700 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                    {confirmedOrder.groceryShipment.shipmentId}
                  </span>
                </div>
                <div className="mt-2 text-xs text-emerald-900">
                  <div>
                    <strong>Packaging:</strong> {confirmedOrder.groceryShipment.packagingType}
                  </div>
                  <div className="mt-1">
                    <strong>Scheduled Slot:</strong> {confirmedOrder.groceryShipment.slotLabel}
                  </div>
                  <div className="mt-1">
                    <strong>Subtotal:</strong> ₹{confirmedOrder.groceryShipment.subtotal} (
                    {confirmedOrder.groceryShipment.items.length} item types)
                  </div>
                </div>
              </div>
            )}

            {confirmedOrder.meatShipment && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-rose-800">
                    <Snowflake className="h-4 w-4" /> Meat Cold-Chain Shipment
                  </span>
                  <span className="rounded-full bg-rose-700 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                    {confirmedOrder.meatShipment.shipmentId}
                  </span>
                </div>
                <div className="mt-2 text-xs text-rose-900">
                  <div>
                    <strong>Packaging:</strong> {confirmedOrder.meatShipment.packagingType}
                  </div>
                  <div className="mt-1">
                    <strong>Scheduled Slot:</strong> {confirmedOrder.meatShipment.slotLabel}
                  </div>
                  <div className="mt-1">
                    <strong>Subtotal:</strong> ₹{confirmedOrder.meatShipment.subtotal} (
                    {confirmedOrder.meatShipment.items.length} item types)
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-stone-100 p-4">
            <div className="text-sm">
              <span className="text-stone-600">Combined Total Paid ({confirmedOrder.paymentMethod}): </span>
              <span className="text-lg font-extrabold text-stone-900">
                ₹{confirmedOrder.combinedTotal}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/orders"
                className="inline-flex items-center gap-1.5 rounded-xl bg-stone-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-stone-800"
              >
                <span>Track Dual Shipments</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dispatch"
                className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-xs font-bold text-stone-800 hover:bg-stone-50"
              >
                <span>View in Dispatch Ops</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (groceryItems.length === 0 && meatItems.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-stone-900">Your cart is empty</h1>
        <p className="mt-2 text-sm text-stone-500">
          Add Grocery or Meat items to test the hygiene-separated checkout.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/grocery"
            className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Browse Grocery
          </Link>
          <Link
            href="/meat"
            className="rounded-xl bg-rose-700 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Browse Meat
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h1 className="text-2xl font-extrabold text-stone-900 sm:text-3xl">
          Hygiene-Separated Checkout
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Schedule independent delivery windows for your Grocery and Meat shipments with one combined fee.
        </p>

        <form onSubmit={handlePlaceOrder} className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Left 2 Columns: Slots & Address */}
          <div className="space-y-6 lg:col-span-2">
            {/* Independent Delivery Slots */}
            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
              <h2 className="flex items-center gap-2 text-base font-bold text-stone-900">
                <Clock className="h-5 w-5 text-stone-700" />
                <span>1. Independent Delivery Time-Slots</span>
              </h2>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {/* Grocery Slot Picker */}
                {groceryItems.length > 0 && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-emerald-900">
                      <Leaf className="h-4 w-4 text-emerald-700" />
                      <span>Grocery Delivery Slot</span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-emerald-700">
                      Ambient / Fresh Produce Bag ({groceryItems.length} items)
                    </p>
                    <div className="mt-3 space-y-2">
                      {GROCERY_DELIVERY_SLOTS.map((slot) => (
                        <label
                          key={slot.id}
                          className={`flex cursor-pointer items-start justify-between rounded-lg border p-2.5 text-xs transition ${
                            grocerySlotId === slot.id
                              ? 'border-emerald-700 bg-white ring-1 ring-emerald-700'
                              : 'border-emerald-100 bg-white/70 hover:bg-white'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <input
                              type="radio"
                              name="grocerySlot"
                              checked={grocerySlotId === slot.id}
                              onChange={() => setGrocerySlotId(slot.id)}
                              className="mt-0.5 accent-emerald-700"
                            />
                            <div>
                              <div className="font-semibold text-stone-900">{slot.label}</div>
                              <div className="text-stone-500">{slot.window}</div>
                            </div>
                          </div>
                          {slot.tag && (
                            <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                              {slot.tag}
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Meat Slot Picker */}
                {meatItems.length > 0 && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-rose-900">
                      <Snowflake className="h-4 w-4 text-rose-700" />
                      <span>Meat Cold-Chain Slot</span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-rose-700">
                      Chilled 0–4°C Insulated Box ({meatItems.length} items)
                    </p>
                    <div className="mt-3 space-y-2">
                      {MEAT_DELIVERY_SLOTS.map((slot) => (
                        <label
                          key={slot.id}
                          className={`flex cursor-pointer items-start justify-between rounded-lg border p-2.5 text-xs transition ${
                            meatSlotId === slot.id
                              ? 'border-rose-700 bg-white ring-1 ring-rose-700'
                              : 'border-rose-100 bg-white/70 hover:bg-white'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <input
                              type="radio"
                              name="meatSlot"
                              checked={meatSlotId === slot.id}
                              onChange={() => setMeatSlotId(slot.id)}
                              className="mt-0.5 accent-rose-700"
                            />
                            <div>
                              <div className="font-semibold text-stone-900">{slot.label}</div>
                              <div className="text-stone-500">{slot.window}</div>
                            </div>
                          </div>
                          {slot.tag && (
                            <span className="rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold text-rose-800">
                              {slot.tag}
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Address & Payment */}
            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
              <h2 className="flex items-center gap-2 text-base font-bold text-stone-900">
                <Truck className="h-5 w-5 text-stone-700" />
                <span>2. Delivery Details &amp; Payment</span>
              </h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-stone-700">Full Name</label>
                  <input
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700">Phone Number</label>
                  <input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="text-xs font-semibold text-stone-700">Delivery Address</label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none"
                />
              </div>

              <div className="mt-4">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-700">
                  <CreditCard className="h-4 w-4" /> Payment Method
                </label>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  {['UPI (GPay / PhonePe)', 'Credit / Debit Card', 'Cash on Delivery'].map(
                    (method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`rounded-xl border px-3 py-2 text-xs font-semibold transition cursor-pointer ${
                          paymentMethod === method
                            ? 'border-stone-900 bg-stone-900 text-white'
                            : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        {method}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Combined Bill Summary */}
          <div className="h-fit rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-bold text-stone-900">Order &amp; Hygiene Summary</h2>

            {groceryItems.length > 0 && (
              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/50 p-3">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                  <span className="inline-flex items-center gap-1">
                    <Leaf className="h-3.5 w-3.5" /> Grocery Shipment
                  </span>
                  <span>₹{grocerySubtotal}</span>
                </div>
                <ul className="mt-2 space-y-1 text-xs text-stone-600">
                  {groceryItems.map((i) => (
                    <li key={i.key} className="flex justify-between">
                      <span>
                        {i.name} × {i.quantity}
                      </span>
                      <span>₹{i.price * i.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {meatItems.length > 0 && (
              <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50/50 p-3">
                <div className="flex items-center justify-between text-xs font-bold text-rose-900">
                  <span className="inline-flex items-center gap-1">
                    <Snowflake className="h-3.5 w-3.5" /> Meat Cold-Chain Shipment
                  </span>
                  <span>₹{meatSubtotal}</span>
                </div>
                <ul className="mt-2 space-y-1 text-xs text-stone-600">
                  {meatItems.map((i) => (
                    <li key={i.key} className="flex justify-between">
                      <span>
                        {i.name} ({i.cut || i.weight}) × {i.quantity}
                      </span>
                      <span>₹{i.price * i.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-4 space-y-2 border-t border-stone-200 pt-3 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Combined Delivery Fee</span>
                <span className="font-semibold">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-lg font-extrabold text-stone-900">
                <span>Combined Total</span>
                <span>₹{combinedTotal}</span>
              </div>
            </div>

            <div className="mt-3 flex items-start gap-2 rounded-xl bg-stone-100 p-2.5 text-[11px] text-stone-600">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
              <span>
                100% isolated packaging: Grocery and Meat will arrive in separate sealed containers.
              </span>
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-xl bg-stone-900 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-stone-800 cursor-pointer"
            >
              Place Order · ₹{combinedTotal}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
