'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Leaf,
  Search,
  Snowflake,
  X,
  ChevronDown,
  SlidersHorizontal,
  ArrowUpDown,
} from 'lucide-react';
import {
  CATALOG_PRODUCTS,
  GROCERY_DIVISIONS,
  MEAT_DIVISIONS,
} from '@/data/catalog';
import { StoreSection } from '@/types/store';
import { ProductCard } from '@/components/ProductCard';

interface SectionCatalogProps {
  section: StoreSection;
}

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'discount-desc';

const SORT_LABELS: Record<SortOption, string> = {
  relevance: 'Relevance',
  'price-asc': 'Price - Low to High',
  'price-desc': 'Price - High to Low',
  'discount-desc': '% Off - High to Low',
};

export function SectionCatalog({ section }: SectionCatalogProps) {
  const isMeat = section === 'meat';
  const divisions = isMeat ? MEAT_DIVISIONS : GROCERY_DIVISIONS;

  const [selectedDivision, setSelectedDivision] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [onlyCleanBadge, setOnlyCleanBadge] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const searchBoxRef = useRef<HTMLDivElement>(null);
  const sortBoxRef = useRef<HTMLDivElement>(null);

  const sectionProducts = useMemo(
    () => CATALOG_PRODUCTS.filter((p) => p.section === section),
    [section]
  );

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(sectionProducts.map((p) => p.category)))],
    [sectionProducts]
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
      if (sortBoxRef.current && !sortBoxRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = sectionProducts.filter((p) => {
      const matchesDiv =
        selectedDivision === 'All' || p.division === selectedDivision;
      const matchesCat =
        selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.division.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.badges.some((b) => b.toLowerCase().includes(q));
      const v0 = p.variants[0];
      const hasDiscount = Boolean(v0.mrp && v0.mrp > v0.price);
      const matchesDiscount = !onlyDiscounted || hasDiscount;
      const matchesClean =
        !onlyCleanBadge ||
        p.badges.some((b) =>
          ['Organic', 'Antibiotic-Free', 'Pesticide-Free', 'Free-Range'].includes(b)
        );
      return (
        matchesDiv &&
        matchesCat &&
        matchesSearch &&
        matchesDiscount &&
        matchesClean
      );
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.variants[0].price - b.variants[0].price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.variants[0].price - a.variants[0].price);
    }
    if (sortBy === 'discount-desc') {
      const getPct = (p: (typeof list)[number]) => {
        const v = p.variants[0];
        return v.mrp && v.mrp > v.price ? ((v.mrp - v.price) / v.mrp) * 100 : 0;
      };
      return [...list].sort((a, b) => getPct(b) - getPct(a));
    }
    return list;
  }, [
    sectionProducts,
    selectedDivision,
    selectedCategory,
    searchQuery,
    onlyDiscounted,
    onlyCleanBadge,
    sortBy,
  ]);

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Section Hero Banner with Soft Surface Tint fading into #FAF9F6 */}
      <div
        className={`border-b border-[#EBE7E0] ${
          isMeat
            ? 'bg-gradient-to-b from-[#FDF2F4] to-[#FAF9F6]'
            : 'bg-gradient-to-b from-[#F2F7F4] to-[#FAF9F6]'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
              isMeat
                ? 'border-[#881337]/20 bg-white text-[#881337]'
                : 'border-[#1E5631]/20 bg-white text-[#1E5631]'
            }`}
          >
            {isMeat ? (
              <Snowflake className="h-3.5 w-3.5" />
            ) : (
              <Leaf className="h-3.5 w-3.5" />
            )}
            <span>
              {isMeat
                ? 'Artisan Butchery · Chilled 0–4°C Cold-Chain Delivery'
                : 'Botanical Market · Separate Ambient & Fresh Produce Bag'}
            </span>
          </div>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#1C1917] sm:text-4xl">
            {isMeat ? 'Artisan Butchery & Seafood' : 'Botanical Market & Pantry'}
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm text-[#78716C]">
            {isMeat
              ? 'Pasture-raised cuts, daily coastal catch, and custom butcher styles — vacuum-sealed with gel ice packs.'
              : 'Dawn-harvested produce, cold-pressed beverages, A2 dairy, and stone-ground Indian staples.'}
          </p>

          {/* Visual Category Divisions Strip (Reference Image 2) */}
          <div className="mt-6 grid gap-3.5 sm:grid-cols-3">
            {divisions.map((div) => {
              const active = selectedDivision === div.name;
              return (
                <button
                  key={div.name}
                  type="button"
                  onClick={() => {
                    setSelectedDivision(active ? 'All' : div.name);
                    setSelectedCategory('All');
                  }}
                  className={`group flex items-center gap-3.5 rounded-2xl border p-3 text-left transition cursor-pointer ${
                    active
                      ? isMeat
                        ? 'border-[#881337] bg-white shadow-md ring-1 ring-[#881337]/20'
                        : 'border-[#1E5631] bg-white shadow-md ring-1 ring-[#1E5631]/20'
                      : 'border-[#EBE7E0] bg-white/90 hover:border-[#78716C]/40 hover:bg-white shadow-sm'
                  }`}
                >
                  <img
                    src={div.image}
                    alt={div.name}
                    className="h-16 w-16 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold text-[#1C1917]">
                      {div.name}
                    </div>
                    <div className="mt-0.5 line-clamp-1 text-xs text-[#78716C]">
                      {div.subtitle}
                    </div>
                    <div
                      className={`mt-1 text-[11px] font-semibold ${
                        isMeat ? 'text-[#881337]' : 'text-[#1E5631]'
                      }`}
                    >
                      {active ? 'Showing division ×' : 'Explore division →'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content: Unified Search + Hide Filter + Sort + Sidebar + Grid */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Unified Search Box (opens Categories dropdown simultaneously on click/focus) */}
        <div ref={searchBoxRef} className="relative">
          <div className="flex items-center gap-2 rounded-2xl border border-[#EBE7E0] bg-white px-4 py-2.5 shadow-sm focus-within:border-[#1C1917]/40">
            <Search className="h-4 w-4 shrink-0 text-[#78716C]" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsSearchOpen(true)}
              onClick={() => setIsSearchOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setIsSearchOpen(false);
              }}
              placeholder={
                isMeat
                  ? 'Search chicken, mutton, prawns or click to browse categories...'
                  : 'Search tomatoes, cold-pressed juice, rice or click to browse categories...'
              }
              className="w-full bg-transparent text-sm text-[#1C1917] placeholder:text-[#78716C] focus:outline-none"
            />

            {selectedCategory !== 'All' && (
              <span
                className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold text-white ${
                  isMeat ? 'bg-[#881337]' : 'bg-[#1E5631]'
                }`}
              >
                {selectedCategory}
                <button
                  type="button"
                  onClick={() => setSelectedCategory('All')}
                  className="rounded-full p-0.5 hover:bg-white/20 cursor-pointer"
                  aria-label="Clear category"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="rounded-lg p-1 text-[#78716C] hover:bg-[#FAF9F6] cursor-pointer"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsSearchOpen((prev) => !prev)}
              className="inline-flex shrink-0 items-center gap-1 rounded-xl border border-[#EBE7E0] bg-[#FAF9F6] px-3 py-1 text-xs font-semibold text-[#1C1917] hover:bg-stone-100 cursor-pointer"
            >
              <span>Categories</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${
                  isSearchOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {isSearchOpen && (
            <div className="absolute right-0 left-0 z-30 mt-2 rounded-2xl border border-[#EBE7E0] bg-white p-4 shadow-xl">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#78716C]">
                  {isMeat ? 'Butchery Categories' : 'Botanical Market Categories'}
                </span>
                <span className="text-xs text-[#78716C]">
                  {filteredProducts.length} item{filteredProducts.length === 1 ? '' : 's'}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const active = selectedCategory === cat;
                  const count =
                    cat === 'All'
                      ? sectionProducts.length
                      : sectionProducts.filter((p) => p.category === cat).length;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSelectedDivision('All');
                        setIsSearchOpen(false);
                      }}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                        active
                          ? isMeat
                            ? 'bg-[#881337] text-white'
                            : 'bg-[#1E5631] text-white'
                          : 'border border-[#EBE7E0] bg-[#FAF9F6] text-[#1C1917] hover:bg-stone-100'
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                          active ? 'bg-white/20 text-white' : 'bg-white text-[#78716C]'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Filter Toggle (Left) + Result Count + Sort Dropdown (Right) — Reference Image 3 */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowSidebar((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-xl border border-[#EBE7E0] bg-white px-3.5 py-2 text-xs font-semibold text-[#1C1917] shadow-xs transition hover:border-[#1C1917]/30 cursor-pointer"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>{showSidebar ? 'Hide Filter' : 'Show Filter'}</span>
            </button>

            <span className="text-xs font-medium text-[#78716C]">
              Showing <strong className="text-[#1C1917]">{filteredProducts.length}</strong> products
              {selectedDivision !== 'All' && ` in ${selectedDivision}`}
            </span>
          </div>

          {/* Right-side Sort Dropdown */}
          <div ref={sortBoxRef} className="relative">
            <button
              type="button"
              onClick={() => setIsSortOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1C1917] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-stone-800 cursor-pointer"
            >
              <span>{SORT_LABELS[sortBy]}</span>
              <ArrowUpDown className="h-3.5 w-3.5" />
            </button>

            {isSortOpen && (
              <div className="absolute right-0 z-30 mt-2 w-52 rounded-2xl border border-[#EBE7E0] bg-white p-1.5 shadow-xl">
                {(Object.keys(SORT_LABELS) as SortOption[]).map((opt) => {
                  const active = sortBy === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSortBy(opt);
                        setIsSortOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-medium transition cursor-pointer ${
                        active
                          ? isMeat
                            ? 'bg-[#FDF2F4] font-bold text-[#881337]'
                            : 'bg-[#F2F7F4] font-bold text-[#1E5631]'
                          : 'text-[#1C1917] hover:bg-[#FAF9F6]'
                      }`}
                    >
                      <span>{SORT_LABELS[opt]}</span>
                      {active && <span className="text-[10px]">●</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar + Product Grid Layout (Reference Image 3) */}
        <div className="mt-5 flex flex-col gap-6 lg:flex-row">
          {showSidebar && (
            <aside className="w-full shrink-0 space-y-4 lg:w-64">
              {/* Shop by Category */}
              <div className="rounded-2xl border border-[#EBE7E0] bg-white p-4 shadow-sm">
                <h2 className="text-sm font-bold text-[#1C1917]">Shop by Category</h2>
                <div className="mt-3 space-y-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDivision('All');
                      setSelectedCategory('All');
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition cursor-pointer ${
                      selectedCategory === 'All' && selectedDivision === 'All'
                        ? isMeat
                          ? 'bg-[#FDF2F4] text-[#881337]'
                          : 'bg-[#F2F7F4] text-[#1E5631]'
                        : 'text-[#78716C] hover:bg-[#FAF9F6] hover:text-[#1C1917]'
                    }`}
                  >
                    <span>All {isMeat ? 'Butchery' : 'Grocery'}</span>
                    <span>{sectionProducts.length}</span>
                  </button>

                  {divisions.map((div) => (
                    <div key={div.name} className="border-t border-[#EBE7E0] pt-2.5">
                      <div className="px-2 text-[11px] font-bold uppercase tracking-wider text-[#78716C]">
                        {div.name}
                      </div>
                      <div className="mt-1.5 space-y-1">
                        {div.categories.map((cat) => {
                          const active = selectedCategory === cat;
                          const count = sectionProducts.filter(
                            (p) => p.category === cat
                          ).length;
                          return (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => {
                                setSelectedCategory(cat);
                                setSelectedDivision('All');
                              }}
                              className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition cursor-pointer ${
                                active
                                  ? isMeat
                                    ? 'bg-[#881337] text-white'
                                    : 'bg-[#1E5631] text-white'
                                  : 'text-[#1C1917] hover:bg-[#FAF9F6]'
                              }`}
                            >
                              <span>{cat}</span>
                              <span
                                className={`text-[11px] ${
                                  active ? 'text-white/80' : 'text-[#78716C]'
                                }`}
                              >
                                {count}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Refined by */}
              <div className="rounded-2xl border border-[#EBE7E0] bg-white p-4 shadow-sm">
                <h2 className="text-sm font-bold text-[#1C1917]">Refined by</h2>
                <div className="mt-3 space-y-2.5 text-xs">
                  <label className="flex cursor-pointer items-center gap-2 text-[#1C1917]">
                    <input
                      type="checkbox"
                      checked={onlyDiscounted}
                      onChange={(e) => setOnlyDiscounted(e.target.checked)}
                      className={isMeat ? 'accent-[#881337]' : 'accent-[#1E5631]'}
                    />
                    <span>Special Offers &amp; Savings</span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 text-[#1C1917]">
                    <input
                      type="checkbox"
                      checked={onlyCleanBadge}
                      onChange={(e) => setOnlyCleanBadge(e.target.checked)}
                      className={isMeat ? 'accent-[#881337]' : 'accent-[#1E5631]'}
                    />
                    <span>
                      {isMeat ? 'Antibiotic-Free & Free-Range' : 'Organic & Pesticide-Free'}
                    </span>
                  </label>
                </div>
              </div>
            </aside>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#EBE7E0] bg-white p-12 text-center text-sm text-[#78716C]">
                No products matched your current filters. Try clearing your search or category.
              </div>
            ) : (
              <div
                className={`grid gap-5 sm:grid-cols-2 ${
                  showSidebar ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
