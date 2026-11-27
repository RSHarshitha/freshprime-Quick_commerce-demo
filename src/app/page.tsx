import Link from 'next/link';
import {
  ArrowRight,
  Leaf,
  Beef,
  ShieldCheck,
  Snowflake,
  Truck,
  Sparkles,
} from 'lucide-react';
import { CATALOG_PRODUCTS } from '@/data/catalog';
import { CategoryCarousel } from '@/components/CategoryCarousel';

const GROCERY_CATEGORY_ORDER = [
  'Fruits',
  'Vegetables',
  'Snacks',
  'Dairy & Bakery',
  'Staples & Beverages',
];

export default function HomePage() {
  const allGrocery = CATALOG_PRODUCTS.filter((p) => p.section === 'grocery');
  const allMeat = CATALOG_PRODUCTS.filter((p) => p.section === 'meat');

  const groceryByCategory = GROCERY_CATEGORY_ORDER.map((category) => ({
    category,
    items: allGrocery.filter((p) => p.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="bg-[#FAF9F6]">
      {/* Hero Section */}
      <section className="border-b border-[#EBE7E0] bg-gradient-to-b from-[#F2F7F4]/60 via-[#FAF9F6] to-[#FAF9F6]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#EBE7E0] bg-white px-3.5 py-1 text-xs font-semibold text-[#1E5631] shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Dual-Zone Quick-Commerce · Separate Hygiene &amp; Cold-Chain</span>
          </div>

          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-[#1C1917] sm:text-5xl">
            Botanical Market &amp; Artisan Butchery —{' '}
            <span className="text-[#1E5631]">One Cart</span>,{' '}
            <span className="text-[#881337]">Separate Hygienic Delivery.</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm text-[#78716C] sm:text-base">
            Shop dawn-harvested produce, cold-pressed beverages, and custom-cut meats in one place. Your cart automatically separates Grocery and Meat subtotals, lets you pick independent delivery slots, and dispatches them in dedicated sealed containers.
          </p>

          {/* Dual Entry Cards */}
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Link
              href="/grocery"
              className="group relative overflow-hidden rounded-3xl border border-[#EBE7E0] bg-gradient-to-br from-[#F2F7F4] to-white p-6 shadow-sm transition hover:border-[#1E5631]/40 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#1E5631] border border-[#1E5631]/15">
                    <Leaf className="h-3.5 w-3.5" /> Ambient &amp; Fresh Produce Zone
                  </span>
                  <h2 className="mt-3 text-2xl font-bold text-[#1C1917]">
                    Botanical Market &amp; Pantry
                  </h2>
                  <p className="mt-1.5 text-sm text-[#78716C]">
                    Fruits &amp; vegetables, daily staples, A2 paneer &amp; cold-pressed beverages.
                  </p>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=240&q=80"
                  alt="Fresh produce"
                  className="h-20 w-20 shrink-0 rounded-2xl object-cover shadow-xs"
                />
              </div>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#1E5631] group-hover:translate-x-1 transition">
                <span>Enter Botanical Market</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>

            <Link
              href="/meat"
              className="group relative overflow-hidden rounded-3xl border border-[#EBE7E0] bg-gradient-to-br from-[#FDF2F4] to-white p-6 shadow-sm transition hover:border-[#881337]/40 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#881337] border border-[#881337]/15">
                    <Snowflake className="h-3.5 w-3.5" /> Chilled 0–4°C Cold-Chain Zone
                  </span>
                  <h2 className="mt-3 text-2xl font-bold text-[#1C1917]">
                    Artisan Butchery &amp; Seafood
                  </h2>
                  <p className="mt-1.5 text-sm text-[#78716C]">
                    Custom Curry Cut, Biryani Cut, Boneless &amp; Keema. Antibiotic-free, Halal &amp; vacuum-sealed.
                  </p>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=240&q=80"
                  alt="Artisan cuts"
                  className="h-20 w-20 shrink-0 rounded-2xl object-cover shadow-xs"
                />
              </div>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#881337] group-hover:translate-x-1 transition">
                <span>Enter Artisan Butchery</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          </div>

          {/* 3-Pillar Hygiene Strip */}
          <div className="mt-8 grid gap-4 rounded-2xl border border-[#EBE7E0] bg-white p-4 shadow-sm sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 shrink-0 text-[#1E5631]" />
              <div className="text-xs">
                <div className="font-bold text-[#1C1917]">Separate Packing Zones</div>
                <div className="text-[#78716C]">Zero cross-contact between veg &amp; raw meat</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Snowflake className="h-6 w-6 shrink-0 text-[#881337]" />
              <div className="text-xs">
                <div className="font-bold text-[#1C1917]">Independent Delivery Slots</div>
                <div className="text-[#78716C]">Pick separate times for Grocery &amp; Meat</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="h-6 w-6 shrink-0 text-[#B45309]" />
              <div className="text-xs">
                <div className="font-bold text-[#1C1917]">Single Combined Delivery Fee</div>
                <div className="text-[#78716C]">Free delivery above ₹499 combined order</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fresh Grocery Highlights Divided by Categories */}
      <section className="bg-gradient-to-b from-[#F2F7F4]/60 to-[#FAF9F6]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E5631]">
                <Leaf className="h-3.5 w-3.5" /> Botanical Market · Ambient &amp; Fresh
              </span>
              <h2 className="mt-1 text-2xl font-bold text-[#1C1917]">
                Fresh Grocery Highlights
              </h2>
            </div>
            <Link
              href="/grocery"
              className="inline-flex items-center gap-1 text-sm font-bold text-[#1E5631] hover:text-[#2D7A47]"
            >
              <span>View all {allGrocery.length} items</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-9">
            {groceryByCategory.map((group) => (
              <div key={group.category}>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#1C1917]">
                    {group.category}
                  </h3>
                  <span className="text-xs font-medium text-[#78716C]">
                    {group.items.length} item{group.items.length === 1 ? '' : 's'}
                  </span>
                </div>
                <CategoryCarousel products={group.items} section="grocery" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Meat Carousel */}
      <section className="border-t border-[#EBE7E0] bg-gradient-to-b from-[#FDF2F4]/70 to-[#FAF9F6]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#881337]">
                <Beef className="h-3.5 w-3.5" /> Artisan Butchery · Chilled 0–4°C
              </span>
              <h2 className="mt-1 text-2xl font-bold text-[#1C1917]">
                Butcher &amp; Meat Highlights
              </h2>
            </div>
            <Link
              href="/meat"
              className="inline-flex items-center gap-1 text-sm font-bold text-[#881337] hover:text-[#9F1239]"
            >
              <span>View all {allMeat.length} items</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <CategoryCarousel products={allMeat} section="meat" />
        </div>
      </section>
    </div>
  );
}
