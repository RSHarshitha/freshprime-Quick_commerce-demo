'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CATALOG_PRODUCTS } from '@/data/catalog';
import { CategoryCarousel } from '@/components/CategoryCarousel';
import { useStore } from '@/context/StoreContext';

const GROCERY_CATEGORY_SHOWCASE = [
  {
    category: 'Fruits',
    tagline: 'Orchard-picked & naturally ripened at dawn',
    bgImage:
      'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1400&q=70',
    tint: 'from-[#FAF9F6]/80 via-[#F2F7F4]/75 to-[#FAF9F6]/85',
  },
  {
    category: 'Vegetables',
    tagline: 'Pesticide-free greens & vine-ripened farm produce',
    bgImage:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1400&q=70',
    tint: 'from-[#FAF9F6]/80 via-emerald-50/75 to-[#FAF9F6]/85',
  },
  {
    category: 'Snacks',
    tagline: 'Small-batch roasted, baked & zero palm oil craft bites',
    bgImage:
      'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=1400&q=70',
    tint: 'from-[#FAF9F6]/80 via-amber-50/70 to-[#FAF9F6]/85',
  },
  {
    category: 'Dairy & Bakery',
    tagline: 'Chilled A2 Gir cow dairy & 36-hour fermented sourdough',
    bgImage:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1400&q=70',
    tint: 'from-[#FAF9F6]/80 via-stone-100/75 to-[#FAF9F6]/85',
  },
  {
    category: 'Staples & Beverages',
    tagline: 'Aged Dehradun grains, wood-pressed oils & cold-pressed juices',
    bgImage:
      'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=1400&q=70',
    tint: 'from-[#FAF9F6]/80 via-[#F2F7F4]/75 to-[#FAF9F6]/85',
  },
];

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, setIsAuthModalOpen } = useStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/grocery');
    }
  }, [isAuthenticated, router]);

  const allGrocery = CATALOG_PRODUCTS.filter((p) => p.section === 'grocery');
  const allMeat = CATALOG_PRODUCTS.filter((p) => p.section === 'meat');

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="bg-[#FAF9F6] text-[#1C1917]">
      {/* 1. LOAM-INSPIRED FULL-BLEED EDITORIAL HERO FOLD */}
      <section className="relative flex min-h-[76vh] items-center justify-center overflow-hidden border-b border-[#EBE7E0]">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1800&q=80"
          alt="Freshly harvested organic produce"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1917]/55 via-[#1C1917]/40 to-[#FAF9F6]" />

        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-200">
            Botanical Market &amp; Artisan Butchery
          </p>
          <h1
            className="mt-4 text-4xl font-medium leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
            style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
          >
            Harvested at Dawn.
            <br />
            Crafted for Your Table.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-stone-100/90 sm:text-base">
            Farm-direct produce, small-batch pantry provisions, and 0–4°C chilled butcher cuts—packed in separate hygienic zones and delivered in minutes.
          </p>
        </div>
      </section>

      {/* 2. LOAM-INSPIRED ASYMMETRICAL OVERLAPPING PHILOSOPHY BLOCK */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid items-center lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-[#EBE7E0] shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80"
                alt="Seasonal orchard fruits and vegetables"
                className="h-[380px] w-full object-cover sm:h-[460px]"
              />
            </div>
          </div>

          <div className="relative z-10 -mt-12 mx-3 rounded-3xl border border-[#EBE7E0] bg-[#FAF9F6]/95 p-8 shadow-xl backdrop-blur-md sm:p-10 lg:col-span-6 lg:col-start-7 lg:-ml-16 lg:mt-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#1E5631]">
              Dual-Zone Quick-Commerce
            </p>
            <h2
              className="mt-3 text-3xl font-medium leading-snug text-[#1C1917] sm:text-4xl"
              style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
            >
              Two isolated worlds, one effortless ritual.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#78716C]">
              Every order is physically separated at the source: dawn-picked greens and sourdough travel in breathable ambient crates, while antibiotic-free poultry, mutton, and coastal catch stay sealed at 0–4°C.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[#EBE7E0] pt-5 text-xs">
              <div>
                <div className="font-bold text-[#1E5631]">Botanical Market</div>
                <div className="mt-0.5 text-[#78716C]">Produce, Snacks, A2 Dairy &amp; Cold-Pressed</div>
              </div>
              <div>
                <div className="font-bold text-[#881337]">Artisan Butchery</div>
                <div className="mt-0.5 text-[#78716C]">Custom Cuts · Chilled 0–4°C</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GROCERY CATEGORY SHOWCASES WITH BLURRED CATEGORY BACKGROUNDS */}
      {GROCERY_CATEGORY_SHOWCASE.map((group) => {
        const items = allGrocery.filter((p) => p.category === group.category);
        if (items.length === 0) return null;

        return (
          <section
            key={group.category}
            className="relative overflow-hidden border-t border-[#EBE7E0]/80"
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <img
                src={group.bgImage}
                alt=""
                loading="lazy"
                className="h-full w-full scale-110 object-cover opacity-30 blur-2xl"
              />
              <div className={`absolute inset-0 bg-gradient-to-b ${group.tint}`} />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6">
              <div className="mb-7 max-w-xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#1E5631]">
                  Botanical Market
                </p>
                <h2
                  className="mt-1.5 text-3xl font-medium text-[#1C1917] sm:text-4xl"
                  style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
                >
                  {group.category}
                </h2>
                <p className="mt-1 text-sm text-[#78716C]">{group.tagline}</p>
              </div>

              <CategoryCarousel products={items} section="grocery" showcaseOnly />
            </div>
          </section>
        );
      })}

      {/* 4. ARTISAN BUTCHERY SHOWCASE WITH BLURRED MEAT BACKGROUND */}
      <section className="relative overflow-hidden border-t border-[#EBE7E0]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=1400&q=70"
            alt=""
            loading="lazy"
            className="h-full w-full scale-110 object-cover opacity-25 blur-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FDF2F4]/85 via-[#FAF9F6]/80 to-[#FAF9F6]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="mb-7 max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#881337]">
              Artisan Butchery · Chilled 0–4°C
            </p>
            <h2
              className="mt-1.5 text-3xl font-medium text-[#1C1917] sm:text-4xl"
              style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
            >
              Poultry, Mutton &amp; Coastal Catch
            </h2>
            <p className="mt-1 text-sm text-[#78716C]">
              Antibiotic-free farm poultry, pasture-raised goat &amp; daily-catch seafood.
            </p>
          </div>

          <CategoryCarousel products={allMeat} section="meat" showcaseOnly />
        </div>
      </section>

      {/* 5. QUIET EDITORIAL CLOSING FOLD */}
      <section className="border-t border-[#EBE7E0] bg-[#FAF9F6] py-20 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#78716C]">
            FreshPrime Quick-Commerce
          </p>
          <h2
            className="mt-3 text-3xl font-medium text-[#1C1917] sm:text-4xl"
            style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
          >
            Click any item above or sign in to begin shopping.
          </h2>
          <p className="mt-3 text-sm text-[#78716C]">
            Sign in, create an account, or explore freely in Guest Mode.
          </p>
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(true)}
            className="mt-7 rounded-full bg-[#1C1917] px-7 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#1E5631] cursor-pointer"
          >
            Enter Store
          </button>
        </div>
      </section>
    </div>
  );
}
