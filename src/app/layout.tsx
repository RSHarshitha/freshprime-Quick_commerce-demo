import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Geist_Mono } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';
import { FloatingCart } from '@/components/FloatingCart';
import { FirstItemCelebration } from '@/components/FirstItemCelebration';
import { AuthModal } from '@/components/AuthModal';
import { AccountModal } from '@/components/AccountModal';
import { AdminSwitchPill } from '@/components/AdminSwitchPill';
import { Footer } from '@/components/Footer';

const jakartaSans = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FreshPrime | Botanical Market & Artisan Butchery',
  description:
    'Shop farm-fresh groceries and 0–4°C chilled butcher cuts in one cart with separate hygienic delivery.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${jakartaSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF9F6] text-[#1C1917]">
        <StoreProvider>
          <Navbar />
          <CartDrawer />
          <FloatingCart />
          <FirstItemCelebration />
          <AuthModal />
          <AccountModal />
          <AdminSwitchPill />
          <main className="flex-1">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
