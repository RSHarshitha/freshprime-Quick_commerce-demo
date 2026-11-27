'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  Layers,
  TrendingUp,
  Users,
  Package,
  BarChart3,
  Megaphone,
  Settings,
  Download,
  Calendar,
  Search,
  Check,
} from 'lucide-react';
import { AdminDispatchPanel } from '@/components/admin/AdminDispatchPanel';
import {
  DashboardOverviewPanel,
  AdminSalesPanel,
  AdminCustomersPanel,
  AdminProductsPanel,
  AdminAnalyticsPanel,
  AdminMarketingPanel,
  AdminSettingsPanel,
} from '@/components/admin/AdminOverviewPanels';

type AdminTab =
  | 'dashboard'
  | 'dispatch'
  | 'sales'
  | 'customers'
  | 'products'
  | 'analytics'
  | 'marketing'
  | 'settings';

const NAV_ITEMS: { id: AdminTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'dispatch', label: 'Dispatch Ops', icon: Layers },
  { id: 'sales', label: 'Sales', icon: TrendingUp },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'marketing', label: 'Marketing', icon: Megaphone },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const TAB_TITLES: Record<AdminTab, string> = {
  dashboard: 'Good evening, Admin',
  dispatch: 'Dual-Zone Dispatch Ops',
  sales: 'Sales & Split Ledger',
  customers: 'Customer Directory',
  products: 'Catalog & SKUs',
  analytics: 'Quick-Commerce Analytics',
  marketing: 'Marketing & Campaigns',
  settings: 'Store & Hygiene Settings',
};

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1C1917]">
      <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row">
        {/* CONSTANT LEFT SIDEBAR */}
        <aside className="w-full shrink-0 border-b border-[#EBE7E0] bg-white px-4 py-5 lg:min-h-[calc(100vh-4rem)] lg:w-64 lg:border-r lg:border-b-0">
          <div className="mb-5 flex items-center justify-between px-2">
            <div>
              <div className="text-sm font-extrabold tracking-tight text-[#1C1917]">
                FreshPrime Business
              </div>
              <div className="text-[11px] font-medium text-[#78716C]">
                Quick-Commerce Admin
              </div>
            </div>
            <span className="rounded-lg bg-[#F2F7F4] px-2 py-0.5 text-[10px] font-bold text-[#1E5631]">
              LIVE
            </span>
          </div>

          <nav className="flex flex-row gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-xs font-semibold transition cursor-pointer ${
                    active
                      ? 'bg-[#FAF9F6] text-[#1C1917] shadow-xs ring-1 ring-[#EBE7E0]'
                      : 'text-[#78716C] hover:bg-[#FAF9F6]/60 hover:text-[#1C1917]'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      active ? 'text-[#1E5631]' : 'text-[#78716C]'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 p-5 sm:p-8">
          {/* Top Bar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-medium text-[#78716C]">
                FreshPrime Dual-Zone Operations
              </div>
              <h1 className="mt-0.5 text-2xl font-extrabold tracking-tight text-[#1C1917] sm:text-3xl">
                {TAB_TITLES[activeTab]}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-[#78716C]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search orders, products"
                  className="rounded-xl border border-[#EBE7E0] bg-white py-2 pr-3 pl-8 text-xs text-[#1C1917] placeholder:text-[#78716C] focus:outline-none"
                />
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-xl border border-[#EBE7E0] bg-white px-3 py-2 text-xs font-semibold text-[#1C1917]">
                <Calendar className="h-3.5 w-3.5 text-[#78716C]" />
                <span>Last 30 days</span>
              </span>

              <button
                type="button"
                onClick={handleExport}
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-amber-600 cursor-pointer"
              >
                {exported ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Exported</span>
                  </>
                ) : (
                  <>
                    <Download className="h-3.5 w-3.5" />
                    <span>Export report</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Active Tab View */}
          {activeTab === 'dashboard' && <DashboardOverviewPanel />}
          {activeTab === 'dispatch' && <AdminDispatchPanel />}
          {activeTab === 'sales' && <AdminSalesPanel />}
          {activeTab === 'customers' && <AdminCustomersPanel />}
          {activeTab === 'products' && <AdminProductsPanel />}
          {activeTab === 'analytics' && <AdminAnalyticsPanel />}
          {activeTab === 'marketing' && <AdminMarketingPanel />}
          {activeTab === 'settings' && <AdminSettingsPanel />}
        </div>
      </div>
    </div>
  );
}
