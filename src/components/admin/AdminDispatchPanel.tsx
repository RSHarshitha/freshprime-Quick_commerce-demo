'use client';

import { Leaf, Snowflake, FastForward, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { SHIPMENT_STEPS } from '@/data/catalog';

export function AdminDispatchPanel() {
  const {
    orders,
    advanceShipmentStatus,
    groceryItems,
    meatItems,
    grocerySubtotal,
    meatSubtotal,
  } = useStore();

  const groceryBatches = orders.filter((o) => o.groceryShipment);
  const meatBatches = orders.filter((o) => o.meatShipment);

  return (
    <div className="space-y-6">
      {/* Top Zone Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#EBE7E0] bg-white p-4 shadow-xs">
          <div className="text-xs font-medium text-[#78716C]">Placed Orders</div>
          <div className="mt-1 text-2xl font-extrabold text-[#1C1917]">{orders.length}</div>
          <div className="mt-1 text-[11px] text-[#78716C]">Auto-split by hygiene zone</div>
        </div>
        <div className="rounded-2xl border border-[#1E5631]/20 bg-[#F2F7F4] p-4 shadow-xs">
          <div className="text-xs font-medium text-[#1E5631]">Zone A · Grocery Batches</div>
          <div className="mt-1 text-2xl font-extrabold text-[#1E5631]">
            {groceryBatches.length + (groceryItems.length > 0 ? 1 : 0)}
          </div>
          <div className="mt-1 text-[11px] text-[#1E5631]/80">Ambient / 12-min EV scooters</div>
        </div>
        <div className="rounded-2xl border border-[#881337]/20 bg-[#FDF2F4] p-4 shadow-xs">
          <div className="text-xs font-medium text-[#881337]">Zone B · Cold-Chain Meat Batches</div>
          <div className="mt-1 text-2xl font-extrabold text-[#881337]">
            {meatBatches.length + (meatItems.length > 0 ? 1 : 0)}
          </div>
          <div className="mt-1 text-[11px] text-[#881337]/80">0–4°C Gel Boxes / Cold-Box Vans</div>
        </div>
      </div>

      {/* Split Fulfillment Queues Side-by-Side */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* ZONE A: GROCERY */}
        <div className="rounded-3xl border border-[#EBE7E0] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#EBE7E0] pb-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1E5631] text-white">
                <Leaf className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-[#1C1917]">
                  Zone A: Botanical Market Hub
                </h2>
                <p className="text-xs text-[#1E5631]">
                  Ambient / Fresh Produce Crates · EV Basket Scooters
                </p>
              </div>
            </div>
            <ShieldCheck className="h-5 w-5 text-[#1E5631]" />
          </div>

          <div className="mt-4 space-y-4">
            {groceryItems.length > 0 && (
              <div className="rounded-2xl border border-dashed border-[#1E5631]/40 bg-[#F2F7F4]/60 p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#1E5631]">
                    LIVE CART QUEUE (Pre-Checkout)
                  </span>
                  <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-[#1E5631]">
                    ₹{grocerySubtotal}
                  </span>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {groceryItems.map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center gap-2.5 rounded-xl border border-[#EBE7E0] bg-white p-2"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-11 w-11 shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <div className="truncate text-xs font-bold text-[#1C1917]">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-[#78716C]">
                          {item.weight} × {item.quantity} · ₹{item.price * item.quantity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {groceryBatches.length === 0 && groceryItems.length === 0 && (
              <div className="rounded-2xl border border-dashed border-[#EBE7E0] p-8 text-center text-xs text-[#78716C]">
                <ShoppingBag className="mx-auto mb-2 h-7 w-7 text-[#EBE7E0]" />
                No Grocery items queued yet.
              </div>
            )}

            {groceryBatches.map((order) => {
              const shp = order.groceryShipment!;
              const isDone = shp.status === SHIPMENT_STEPS[SHIPMENT_STEPS.length - 1];
              return (
                <div
                  key={shp.shipmentId}
                  className="rounded-2xl border border-[#1E5631]/15 bg-[#F2F7F4]/60 p-3.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-[#1E5631]">
                        {shp.shipmentId}
                      </span>
                      <span className="ml-2 text-xs text-[#78716C]">
                        (from {order.id} · {order.customerName})
                      </span>
                    </div>
                    <span className="rounded-full bg-[#1E5631] px-2.5 py-0.5 text-[11px] font-semibold text-white">
                      {shp.status}
                    </span>
                  </div>

                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {shp.items.map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center gap-2.5 rounded-xl border border-[#EBE7E0] bg-white p-2"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-11 w-11 shrink-0 rounded-lg object-cover"
                        />
                        <div className="min-w-0">
                          <div className="truncate text-xs font-bold text-[#1C1917]">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-[#78716C]">
                            {item.weight} × {item.quantity} · ₹{item.price * item.quantity}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#1C1917]">
                      Slot: {shp.slotLabel} · ₹{shp.subtotal}
                    </span>
                    {!isDone && (
                      <button
                        type="button"
                        onClick={() => advanceShipmentStatus(order.id, 'grocery')}
                        className="inline-flex items-center gap-1 rounded-lg bg-[#1E5631] px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-[#2D7A47] cursor-pointer"
                      >
                        <FastForward className="h-3 w-3" /> Advance Status
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ZONE B: MEAT COLD-CHAIN */}
        <div className="rounded-3xl border border-[#EBE7E0] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#EBE7E0] pb-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#881337] text-white">
                <Snowflake className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-[#1C1917]">
                  Zone B: Artisan Butchery Hub
                </h2>
                <p className="text-xs text-[#881337]">
                  Vacuum-Sealed 0–4°C Gel Boxes · Chilled Cold-Box Vans
                </p>
              </div>
            </div>
            <ShieldCheck className="h-5 w-5 text-[#881337]" />
          </div>

          <div className="mt-4 space-y-4">
            {meatItems.length > 0 && (
              <div className="rounded-2xl border border-dashed border-[#881337]/40 bg-[#FDF2F4]/60 p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#881337]">
                    LIVE CART QUEUE (Pre-Checkout)
                  </span>
                  <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-[#881337]">
                    ₹{meatSubtotal}
                  </span>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {meatItems.map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center gap-2.5 rounded-xl border border-[#EBE7E0] bg-white p-2"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-11 w-11 shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <div className="truncate text-xs font-bold text-[#1C1917]">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-[#78716C]">
                          {item.cut ? `${item.cut} · ` : ''}
                          {item.weight} × {item.quantity} · ₹{item.price * item.quantity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {meatBatches.length === 0 && meatItems.length === 0 && (
              <div className="rounded-2xl border border-dashed border-[#EBE7E0] p-8 text-center text-xs text-[#78716C]">
                <ShoppingBag className="mx-auto mb-2 h-7 w-7 text-[#EBE7E0]" />
                No Meat items queued yet.
              </div>
            )}

            {meatBatches.map((order) => {
              const shp = order.meatShipment!;
              const isDone = shp.status === SHIPMENT_STEPS[SHIPMENT_STEPS.length - 1];
              return (
                <div
                  key={shp.shipmentId}
                  className="rounded-2xl border border-[#881337]/15 bg-[#FDF2F4]/60 p-3.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-[#881337]">
                        {shp.shipmentId}
                      </span>
                      <span className="ml-2 text-xs text-[#78716C]">
                        (from {order.id} · {order.customerName})
                      </span>
                    </div>
                    <span className="rounded-full bg-[#881337] px-2.5 py-0.5 text-[11px] font-semibold text-white">
                      {shp.status}
                    </span>
                  </div>

                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {shp.items.map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center gap-2.5 rounded-xl border border-[#EBE7E0] bg-white p-2"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-11 w-11 shrink-0 rounded-lg object-cover"
                        />
                        <div className="min-w-0">
                          <div className="truncate text-xs font-bold text-[#1C1917]">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-[#78716C]">
                            {item.cut ? `${item.cut} · ` : ''}
                            {item.weight} × {item.quantity} · ₹{item.price * item.quantity}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#1C1917]">
                      Slot: {shp.slotLabel} · ₹{shp.subtotal}
                    </span>
                    {!isDone && (
                      <button
                        type="button"
                        onClick={() => advanceShipmentStatus(order.id, 'meat')}
                        className="inline-flex items-center gap-1 rounded-lg bg-[#881337] px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-[#9F1239] cursor-pointer"
                      >
                        <FastForward className="h-3 w-3" /> Advance Status
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
