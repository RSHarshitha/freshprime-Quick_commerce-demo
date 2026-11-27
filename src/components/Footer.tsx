import Link from 'next/link';
import { ShieldCheck, Snowflake, Leaf } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-950 text-stone-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6">
        <div>
          <div className="text-lg font-bold text-white">FreshPrime</div>
          <p className="mt-2 text-sm text-stone-400">
            Dual-zone e-commerce demo built for separate hygiene handling: farm-fresh groceries and 0–4°C chilled butcher cuts in one seamless checkout.
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="font-semibold text-white">Explore Sections</div>
          <div className="flex flex-col gap-1.5">
            <Link href="/grocery" className="inline-flex items-center gap-1.5 hover:text-emerald-400">
              <Leaf className="h-3.5 w-3.5 text-emerald-400" /> Fresh Grocery Store
            </Link>
            <Link href="/meat" className="inline-flex items-center gap-1.5 hover:text-rose-400">
              <Snowflake className="h-3.5 w-3.5 text-rose-400" /> Meat &amp; Butcher Shop
            </Link>
            <Link href="/orders" className="hover:text-white">
              Orders &amp; Dual-Shipment Tracking
            </Link>
            <Link href="/dispatch" className="hover:text-white">
              Admin / Dispatch Split View
            </Link>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="font-semibold text-white">Hygiene &amp; Cold-Chain</div>
          <div className="flex items-start gap-2 text-stone-400">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            <span>
              Zero cross-contamination: separate packing hubs, separate sealed containers, and independent delivery slots with one combined fee.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
