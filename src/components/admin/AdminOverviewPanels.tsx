'use client';

import { useState } from 'react';
import {
  Leaf,
  Snowflake,
  TrendingUp,
  Users,
  Search,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Tag,
} from 'lucide-react';
import {
  CATALOG_PRODUCTS,
  COMBINED_DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
} from '@/data/catalog';
import { useStore } from '@/context/StoreContext';

const MONTHLY_SALES = [
  { month: 'Jan', value: 48, amount: '₹4.8L' },
  { month: 'Feb', value: 64, amount: '₹6.4L' },
  { month: 'Mar', value: 72, amount: '₹7.2L' },
  { month: 'Apr', value: 54, amount: '₹5.4L' },
  { month: 'May', value: 68, amount: '₹6.8L' },
  { month: 'Jun', value: 44, amount: '₹4.4L' },
  { month: 'Jul', value: 61, amount: '₹6.1L' },
  { month: 'Aug', value: 89, amount: '₹8.9L' },
  { month: 'Sep', value: 66, amount: '₹6.6L' },
  { month: 'Oct', value: 78, amount: '₹7.8L' },
  { month: 'Nov', value: 52, amount: '₹5.2L' },
  { month: 'Dec', value: 74, amount: '₹7.4L' },
];

const REGION_HUBS = [
  { name: 'Indiranagar Hub', pct: 46, delta: '+8%', positive: true, revenue: '₹4.24L', color: 'bg-[#1E5631]' },
  { name: 'Koramangala Hub', pct: 28, delta: '+4%', positive: true, revenue: '₹2.58L', color: 'bg-amber-500' },
  { name: 'HSR Layout Hub', pct: 16, delta: '+12%', positive: true, revenue: '₹1.47L', color: 'bg-[#881337]' },
  { name: 'Whitefield Hub', pct: 10, delta: '-2%', positive: false, revenue: '₹0.92L', color: 'bg-stone-400' },
];

const DEMO_CUSTOMERS = [
  { name: 'Priya Sharma', email: 'priya.sharma@freshprime.in', zone: 'Koramangala', orders: 14, spent: '₹12,480', tag: 'VIP' },
  { name: 'Aarav Mehta', email: 'aarav.mehta@gmail.com', zone: 'Indiranagar', orders: 9, spent: '₹8,940', tag: 'Returning' },
  { name: 'Neha Kulkarni', email: 'neha.k@outlook.com', zone: 'HSR Layout', orders: 6, spent: '₹5,120', tag: 'Returning' },
  { name: 'Rohan Verma', email: 'rohan.v@yahoo.in', zone: 'Whitefield', orders: 2, spent: '₹1,640', tag: 'New' },
];

export function DashboardOverviewPanel() {
  const { orders, combinedTotal } = useStore();
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  const liveOrderRevenue = orders.reduce((s, o) => s + o.combinedTotal, 0);
  const totalRevenue = 921200 + liveOrderRevenue + combinedTotal;
  const totalOrdersCount = 1660 + orders.length;
  const avgOrder = Math.round(totalRevenue / totalOrdersCount);

  return (
    <div className="space-y-6">
      {/* 4 KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-[#EBE7E0] bg-white p-5 shadow-xs">
          <div className="text-xs font-medium text-[#78716C]">Revenue</div>
          <div className="mt-2 text-2xl font-extrabold text-[#1C1917]">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <div className="mt-1.5 text-xs font-semibold text-[#1E5631]">
            Up 6.4% vs last month
          </div>
        </div>

        <div className="rounded-2xl border border-[#EBE7E0] bg-white p-5 shadow-xs">
          <div className="text-xs font-medium text-[#78716C]">Orders</div>
          <div className="mt-2 text-2xl font-extrabold text-[#1C1917]">
            {totalOrdersCount.toLocaleString('en-IN')}
          </div>
          <div className="mt-1.5 text-xs font-semibold text-[#1E5631]">
            Up 3.1% vs last month
          </div>
        </div>

        <div className="rounded-2xl border border-[#EBE7E0] bg-white p-5 shadow-xs">
          <div className="text-xs font-medium text-[#78716C]">Average order</div>
          <div className="mt-2 text-2xl font-extrabold text-[#1C1917]">₹{avgOrder}</div>
          <div className="mt-1.5 text-xs font-semibold text-[#881337]">
            Dual-zone basket avg
          </div>
        </div>

        <div className="rounded-2xl border border-[#EBE7E0] bg-white p-5 shadow-xs">
          <div className="text-xs font-medium text-[#78716C]">Returning customers</div>
          <div className="mt-2 text-2xl font-extrabold text-[#1C1917]">38%</div>
          <div className="mt-1.5 text-xs font-semibold text-[#1E5631]">
            Up 2.0 pts vs last month
          </div>
        </div>
      </div>

      {/* Sales Overview Bar Chart + Sales by Hub */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="rounded-3xl border border-[#EBE7E0] bg-white p-6 shadow-xs lg:col-span-7">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm font-bold text-[#1C1917]">Sales Overview</div>
              <div className="mt-1 text-2xl font-extrabold text-[#1C1917]">
                ₹2,47,800
              </div>
              <div className="mt-0.5 text-xs font-semibold text-[#1E5631]">
                From Last Year · +20%
              </div>
            </div>
            <span className="rounded-xl border border-[#EBE7E0] bg-[#FAF9F6] px-3 py-1.5 text-xs font-semibold text-[#1C1917]">
              This Year
            </span>
          </div>

          <div className="mt-8 flex h-52 items-end justify-between gap-2">
            {MONTHLY_SALES.map((m) => {
              const active = hoveredMonth === m.month;
              return (
                <div
                  key={m.month}
                  onMouseEnter={() => setHoveredMonth(m.month)}
                  onMouseLeave={() => setHoveredMonth(null)}
                  className="group flex flex-1 flex-col items-center gap-2"
                >
                  <div className="relative flex w-full flex-col items-center">
                    {active && (
                      <span className="absolute -top-7 rounded-lg bg-[#1C1917] px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                        {m.amount}
                      </span>
                    )}
                    <div
                      className={`w-full max-w-[28px] rounded-t-lg transition-all duration-200 ${
                        active
                          ? 'bg-[#1E5631]'
                          : 'bg-gradient-to-t from-amber-500/85 to-amber-300/80'
                      }`}
                      style={{ height: `${m.value * 1.7}px` }}
                    />
                  </div>
                  <span className="text-[11px] font-medium text-[#78716C]">{m.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-[#EBE7E0] bg-white p-6 shadow-xs lg:col-span-5">
          <div className="flex items-center justify-between">
            <div className="text-sm font-bold text-[#1C1917]">Sales by Dark-Store Hub</div>
            <span className="text-xs text-[#78716C]">This Month</span>
          </div>

          <div className="my-5 flex items-center justify-center">
            <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full border-[12px] border-[#1E5631] bg-[#FAF9F6] text-center shadow-inner">
              <span className="text-lg font-extrabold text-[#1C1917]">₹9.21L</span>
              <span className="text-[10px] font-medium text-[#78716C]">total sales</span>
            </div>
          </div>

          <div className="space-y-3">
            {REGION_HUBS.map((hub) => (
              <div key={hub.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1C1917]">
                    {hub.name} <span className="text-[#78716C]">{hub.pct}%</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                        hub.positive
                          ? 'bg-[#F2F7F4] text-[#1E5631]'
                          : 'bg-[#FDF2F4] text-[#881337]'
                      }`}
                    >
                      {hub.delta}
                    </span>
                    <span className="font-bold text-[#1C1917]">{hub.revenue}</span>
                  </div>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#FAF9F6]">
                  <div className={`h-full rounded-full ${hub.color}`} style={{ width: `${hub.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminSalesPanel() {
  const { orders } = useStore();
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#1E5631]/20 bg-[#F2F7F4] p-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#1E5631]">
            <Leaf className="h-4 w-4" /> Botanical Market Revenue Share
          </div>
          <div className="mt-2 text-2xl font-extrabold text-[#1C1917]">62% · ₹5.71L</div>
          <p className="mt-1 text-xs text-[#78716C]">Fruits, Vegetables, Snacks, Dairy &amp; Staples</p>
        </div>
        <div className="rounded-2xl border border-[#881337]/20 bg-[#FDF2F4] p-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#881337]">
            <Snowflake className="h-4 w-4" /> Artisan Butchery Revenue Share
          </div>
          <div className="mt-2 text-2xl font-extrabold text-[#1C1917]">38% · ₹3.50L</div>
          <p className="mt-1 text-xs text-[#78716C]">Chilled 0–4°C Poultry, Mutton &amp; Seafood</p>
        </div>
      </div>

      <div className="rounded-3xl border border-[#EBE7E0] bg-white p-5 shadow-xs">
        <h2 className="text-base font-bold text-[#1C1917]">Recent Orders &amp; Split Ledger</h2>
        {orders.length === 0 ? (
          <p className="mt-4 text-xs text-[#78716C]">
            No live orders placed in this session yet. Place an order from Checkout to see it appear here.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#EBE7E0] text-[#78716C]">
                  <th className="py-2.5 pr-4">Order ID</th>
                  <th className="py-2.5 pr-4">Customer</th>
                  <th className="py-2.5 pr-4">Grocery</th>
                  <th className="py-2.5 pr-4">Meat</th>
                  <th className="py-2.5 pr-4">Total</th>
                  <th className="py-2.5">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE7E0]">
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td className="py-3 pr-4 font-bold text-[#1C1917]">{o.id}</td>
                    <td className="py-3 pr-4">{o.customerName}</td>
                    <td className="py-3 pr-4 text-[#1E5631] font-semibold">₹{o.grocerySubtotal}</td>
                    <td className="py-3 pr-4 text-[#881337] font-semibold">₹{o.meatSubtotal}</td>
                    <td className="py-3 pr-4 font-bold text-[#1C1917]">₹{o.combinedTotal}</td>
                    <td className="py-3 text-[#78716C]">{o.paymentMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export function AdminCustomersPanel() {
  return (
    <div className="rounded-3xl border border-[#EBE7E0] bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-[#EBE7E0] pb-4">
        <div>
          <h2 className="text-base font-bold text-[#1C1917]">Customer Directory</h2>
          <p className="text-xs text-[#78716C]">Verified dual-zone quick-commerce households</p>
        </div>
        <Users className="h-5 w-5 text-[#1E5631]" />
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#EBE7E0] text-[#78716C]">
              <th className="py-2.5 pr-4">Customer</th>
              <th className="py-2.5 pr-4">Hub Zone</th>
              <th className="py-2.5 pr-4">Orders</th>
              <th className="py-2.5 pr-4">Total Spent</th>
              <th className="py-2.5">Segment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EBE7E0]">
            {DEMO_CUSTOMERS.map((c) => (
              <tr key={c.email}>
                <td className="py-3 pr-4">
                  <div className="font-bold text-[#1C1917]">{c.name}</div>
                  <div className="text-[11px] text-[#78716C]">{c.email}</div>
                </td>
                <td className="py-3 pr-4 text-[#1C1917]">{c.zone}</td>
                <td className="py-3 pr-4 font-semibold">{c.orders}</td>
                <td className="py-3 pr-4 font-bold text-[#1C1917]">{c.spent}</td>
                <td className="py-3">
                  <span className="rounded-full bg-[#F2F7F4] px-2.5 py-0.5 text-[11px] font-bold text-[#1E5631]">
                    {c.tag}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminProductsPanel() {
  const [query, setQuery] = useState('');
  const [sectionFilter, setSectionFilter] = useState<'all' | 'grocery' | 'meat'>('all');

  const items = CATALOG_PRODUCTS.filter((p) => {
    const matchSec = sectionFilter === 'all' || p.section === sectionFilter;
    const matchQ =
      !query.trim() ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase());
    return matchSec && matchQ;
  });

  return (
    <div className="rounded-3xl border border-[#EBE7E0] bg-white p-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EBE7E0] pb-4">
        <div>
          <h2 className="text-base font-bold text-[#1C1917]">
            Product Catalog ({items.length} SKUs)
          </h2>
          <p className="text-xs text-[#78716C]">
            25 Botanical Market items &amp; 8 Artisan Butchery items
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(['all', 'grocery', 'meat'] as const).map((sec) => (
            <button
              key={sec}
              type="button"
              onClick={() => setSectionFilter(sec)}
              className={`rounded-full px-3 py-1 text-xs font-semibold capitalize cursor-pointer ${
                sectionFilter === sec
                  ? 'bg-[#1C1917] text-white'
                  : 'border border-[#EBE7E0] bg-[#FAF9F6] text-[#78716C]'
              }`}
            >
              {sec}
            </button>
          ))}
          <div className="relative">
            <Search className="absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-[#78716C]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter catalog..."
              className="rounded-xl border border-[#EBE7E0] bg-[#FAF9F6] py-1.5 pr-3 pl-8 text-xs focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#EBE7E0] text-[#78716C]">
              <th className="py-2.5 pr-4">Product</th>
              <th className="py-2.5 pr-4">Zone</th>
              <th className="py-2.5 pr-4">Category</th>
              <th className="py-2.5 pr-4">Variants</th>
              <th className="py-2.5">Starting Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EBE7E0]">
            {items.map((p) => (
              <tr key={p.id}>
                <td className="py-2.5 pr-4">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-9 w-9 rounded-lg object-cover"
                    />
                    <span className="font-bold text-[#1C1917]">{p.name}</span>
                  </div>
                </td>
                <td className="py-2.5 pr-4">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                      p.section === 'meat'
                        ? 'bg-[#FDF2F4] text-[#881337]'
                        : 'bg-[#F2F7F4] text-[#1E5631]'
                    }`}
                  >
                    {p.section}
                  </span>
                </td>
                <td className="py-2.5 pr-4 text-[#78716C]">{p.category}</td>
                <td className="py-2.5 pr-4 font-medium">{p.variants.length} options</td>
                <td className="py-2.5 font-bold text-[#1C1917]">₹{p.variants[0].price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminAnalyticsPanel() {
  const categoryStats = [
    { name: 'Fruits', pct: 84, color: 'bg-[#1E5631]' },
    { name: 'Vegetables', pct: 91, color: 'bg-[#1E5631]' },
    { name: 'Snacks', pct: 72, color: 'bg-amber-500' },
    { name: 'Dairy & Bakery', pct: 78, color: 'bg-[#1E5631]' },
    { name: 'Staples & Beverages', pct: 68, color: 'bg-stone-600' },
    { name: 'Meat & Seafood', pct: 86, color: 'bg-[#881337]' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#EBE7E0] bg-white p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs text-[#78716C]">
            <Clock className="h-4 w-4 text-[#1E5631]" /> Avg Grocery Dispatch
          </div>
          <div className="mt-2 text-2xl font-extrabold text-[#1C1917]">11.4 mins</div>
          <div className="mt-1 text-xs font-semibold text-[#1E5631]">98.2% within 12-min SLA</div>
        </div>
        <div className="rounded-2xl border border-[#EBE7E0] bg-white p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs text-[#78716C]">
            <Snowflake className="h-4 w-4 text-[#881337]" /> Avg Cold-Chain Dispatch
          </div>
          <div className="mt-2 text-2xl font-extrabold text-[#1C1917]">16.8 mins</div>
          <div className="mt-1 text-xs font-semibold text-[#881337]">100% maintained at 0–4°C</div>
        </div>
        <div className="rounded-2xl border border-[#EBE7E0] bg-white p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs text-[#78716C]">
            <TrendingUp className="h-4 w-4 text-amber-600" /> Dual-Zone Basket Rate
          </div>
          <div className="mt-2 text-2xl font-extrabold text-[#1C1917]">64%</div>
          <div className="mt-1 text-xs text-[#78716C]">Orders containing both Grocery &amp; Meat</div>
        </div>
      </div>

      <div className="rounded-3xl border border-[#EBE7E0] bg-white p-6 shadow-xs">
        <h2 className="text-base font-bold text-[#1C1917]">Category Demand &amp; Sell-Through</h2>
        <div className="mt-5 space-y-3.5">
          {categoryStats.map((c) => (
            <div key={c.name} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#1C1917]">{c.name}</span>
                <span className="text-[#78716C]">{c.pct}%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#FAF9F6]">
                <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AdminMarketingPanel() {
  const [campaigns, setCampaigns] = useState([
    { code: 'FRESH499', title: 'Free Combined Delivery >= ₹499', reach: '12.4k users', active: true },
    { code: 'DAWN20', title: '20% Off Morning Harvest Produce', reach: '6.8k users', active: true },
    { code: 'CHILL04', title: 'Zero Cross-Contamination Cold-Chain Spotlight', reach: '9.1k users', active: false },
  ]);

  const toggleCampaign = (code: string) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.code === code ? { ...c, active: !c.active } : c))
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {campaigns.map((c) => (
        <div
          key={c.code}
          className="flex flex-col justify-between rounded-3xl border border-[#EBE7E0] bg-white p-5 shadow-xs"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#FEF3C7] px-2.5 py-0.5 text-[11px] font-bold text-[#B45309]">
                <Tag className="h-3 w-3" /> {c.code}
              </span>
              <span
                className={`text-[11px] font-bold ${
                  c.active ? 'text-[#1E5631]' : 'text-[#78716C]'
                }`}
              >
                {c.active ? '● Active' : '○ Paused'}
              </span>
            </div>
            <h3 className="mt-3 text-sm font-bold text-[#1C1917]">{c.title}</h3>
            <p className="mt-1 text-xs text-[#78716C]">Estimated reach: {c.reach}</p>
          </div>

          <button
            type="button"
            onClick={() => toggleCampaign(c.code)}
            className={`mt-4 w-full rounded-xl py-2 text-xs font-bold transition cursor-pointer ${
              c.active
                ? 'border border-[#EBE7E0] bg-[#FAF9F6] text-[#1C1917] hover:bg-stone-100'
                : 'bg-[#1E5631] text-white hover:bg-[#2D7A47]'
            }`}
          >
            {c.active ? 'Pause Campaign' : 'Activate Campaign'}
          </button>
        </div>
      ))}
    </div>
  );
}

export function AdminSettingsPanel() {
  const [strictIsolation, setStrictIsolation] = useState(true);
  const [autoSplit, setAutoSplit] = useState(true);
  const [saved, setSaved] = useState(false);

  return (
    <div className="max-w-2xl rounded-3xl border border-[#EBE7E0] bg-white p-6 shadow-xs space-y-5">
      <div className="flex items-center gap-2 border-b border-[#EBE7E0] pb-3">
        <ShieldCheck className="h-5 w-5 text-[#1E5631]" />
        <h2 className="text-base font-bold text-[#1C1917]">
          Dual-Zone Quick-Commerce Settings
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#EBE7E0] bg-[#FAF9F6] p-4">
          <div className="text-xs text-[#78716C]">Free Combined Delivery Threshold</div>
          <div className="mt-1 text-lg font-extrabold text-[#1C1917]">
            ₹{FREE_DELIVERY_THRESHOLD}
          </div>
        </div>
        <div className="rounded-2xl border border-[#EBE7E0] bg-[#FAF9F6] p-4">
          <div className="text-xs text-[#78716C]">Flat Combined Delivery Fee</div>
          <div className="mt-1 text-lg font-extrabold text-[#1C1917]">
            ₹{COMBINED_DELIVERY_FEE}
          </div>
        </div>
      </div>

      <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#EBE7E0] p-4">
        <div>
          <div className="text-sm font-bold text-[#1C1917]">
            Strict Zone A / Zone B Isolation
          </div>
          <div className="text-xs text-[#78716C]">
            Enforce separate crates &amp; 0–4°C insulated boxes on every order
          </div>
        </div>
        <input
          type="checkbox"
          checked={strictIsolation}
          onChange={(e) => setStrictIsolation(e.target.checked)}
          className="h-4 w-4 accent-[#1E5631]"
        />
      </label>

      <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#EBE7E0] p-4">
        <div>
          <div className="text-sm font-bold text-[#1C1917]">
            Auto-Split Checkout Orders
          </div>
          <div className="text-xs text-[#78716C]">
            Automatically generate independent Grocery &amp; Meat shipment IDs
          </div>
        </div>
        <input
          type="checkbox"
          checked={autoSplit}
          onChange={(e) => setAutoSplit(e.target.checked)}
          className="h-4 w-4 accent-[#1E5631]"
        />
      </label>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
          }}
          className="rounded-xl bg-[#1C1917] px-5 py-2.5 text-xs font-bold text-white hover:bg-stone-800 cursor-pointer"
        >
          Save Configuration
        </button>
        {saved && (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1E5631]">
            <CheckCircle2 className="h-4 w-4" /> Saved
          </span>
        )}
      </div>
    </div>
  );
}
