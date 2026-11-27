'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  COMBINED_DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
  SHIPMENT_STEPS,
} from '@/data/catalog';
import {
  CartItem,
  DemoUser,
  Order,
  OrderShipment,
  Product,
  ProductVariant,
  StoreSection,
} from '@/types/store';

export type AccountTab = 'account' | 'privacy' | 'history' | null;

interface PlaceOrderPayload {
  customerName: string;
  phone: string;
  address: string;
  paymentMethod: string;
  grocerySlotLabel?: string;
  meatSlotLabel?: string;
}

interface StoreContextValue {
  cart: CartItem[];
  groceryItems: CartItem[];
  meatItems: CartItem[];
  grocerySubtotal: number;
  meatSubtotal: number;
  combinedSubtotal: number;
  deliveryFee: number;
  combinedTotal: number;
  freeDeliveryRemaining: number;
  totalItemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, variant: ProductVariant) => void;
  updateQuantity: (key: string, delta: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
  orders: Order[];
  placeOrder: (payload: PlaceOrderPayload) => Order;
  advanceShipmentStatus: (orderId: string, section: StoreSection) => void;
  firstItemCelebrationKey: number;
  celebrationSection: StoreSection;
  user: DemoUser | null;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  activeAccountTab: AccountTab;
  setActiveAccountTab: (tab: AccountTab) => void;
  loginDemoCustomer: (name?: string, email?: string) => void;
  logout: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const CART_STORAGE_KEY = 'freshprime_cart_v1';
const ORDERS_STORAGE_KEY = 'freshprime_orders_v1';
const USER_STORAGE_KEY = 'freshprime_user_v1';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [firstItemCelebrationKey, setFirstItemCelebrationKey] = useState(0);
  const [celebrationSection, setCelebrationSection] = useState<StoreSection>('grocery');
  const [user, setUser] = useState<DemoUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeAccountTab, setActiveAccountTab] = useState<AccountTab>(null);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (savedOrders) {
        const parsed = JSON.parse(savedOrders);
        if (Array.isArray(parsed)) setOrders(parsed);
      }

      const savedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch {
      // Ignore storage errors
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore
    }
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // Ignore
    }
  }, [orders, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch {
      // Ignore
    }
  }, [user, hydrated]);

  const addToCart = (product: Product, variant: ProductVariant) => {
    const key = `${product.id}__${variant.id}`;
    setCart((prev) => {
      const wasEmpty = prev.reduce((s, i) => s + i.quantity, 0) === 0;
      if (wasEmpty) {
        setCelebrationSection(product.section);
        setFirstItemCelebrationKey((k) => k + 1);
      }

      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      const newItem: CartItem = {
        key,
        productId: product.id,
        name: product.name,
        section: product.section,
        category: product.category,
        image: product.image,
        emoji: product.emoji,
        accentBg: product.accentBg,
        variantId: variant.id,
        variantLabel: variant.label,
        cut: variant.cut,
        weight: variant.weight,
        price: variant.price,
        quantity: 1,
        storageTemp: product.storageTemp,
        badges: product.badges,
      };
      return [...prev, newItem];
    });
  };

  const updateQuantity = (key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (key: string) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
  };

  const clearCart = () => setCart([]);

  const loginDemoCustomer = (
    name = 'Priya Sharma',
    email = 'priya.sharma@freshprime.in'
  ) => {
    setUser({
      name,
      email,
      phone: '+91 98450 11223',
    });
    setIsAuthModalOpen(false);
    setActiveAccountTab('account');
  };

  const logout = () => {
    setUser(null);
    setActiveAccountTab(null);
  };

  const groceryItems = useMemo(
    () => cart.filter((item) => item.section === 'grocery'),
    [cart]
  );
  const meatItems = useMemo(
    () => cart.filter((item) => item.section === 'meat'),
    [cart]
  );

  const grocerySubtotal = useMemo(
    () => groceryItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [groceryItems]
  );
  const meatSubtotal = useMemo(
    () => meatItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [meatItems]
  );

  const combinedSubtotal = grocerySubtotal + meatSubtotal;
  const deliveryFee =
    combinedSubtotal === 0 || combinedSubtotal >= FREE_DELIVERY_THRESHOLD
      ? 0
      : COMBINED_DELIVERY_FEE;
  const combinedTotal = combinedSubtotal + deliveryFee;
  const freeDeliveryRemaining = Math.max(0, FREE_DELIVERY_THRESHOLD - combinedSubtotal);
  const totalItemCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const placeOrder = (payload: PlaceOrderPayload): Order => {
    const orderNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `ORD-${orderNum}`;

    const groceryShipment: OrderShipment | undefined =
      groceryItems.length > 0
        ? {
            shipmentId: `SHP-G-${orderNum}`,
            section: 'grocery',
            packagingType: 'Breathable Kraft & Fresh Produce Crate',
            tempRange: 'Ambient / 12–18°C',
            slotLabel: payload.grocerySlotLabel || 'Express Fresh (90 mins)',
            items: groceryItems,
            subtotal: grocerySubtotal,
            status: 'Order Placed',
            riderName: 'Ramesh K.',
            vehicleType: 'EV Basket Scooter',
          }
        : undefined;

    const meatShipment: OrderShipment | undefined =
      meatItems.length > 0
        ? {
            shipmentId: `SHP-M-${orderNum}`,
            section: 'meat',
            packagingType: 'Tamper-Proof Vacuum + Gel Ice Insulated Box',
            tempRange: 'Chilled 0–4°C',
            slotLabel: payload.meatSlotLabel || 'Cold-Chain Express (2 hrs)',
            items: meatItems,
            subtotal: meatSubtotal,
            status: 'Order Placed',
            riderName: 'Suresh V.',
            vehicleType: 'Chilled Cold-Box Van',
          }
        : undefined;

    const newOrder: Order = {
      id: orderId,
      createdAt:
        new Date().toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
        }) + ', Today',
      customerName: payload.customerName,
      phone: payload.phone,
      address: payload.address,
      paymentMethod: payload.paymentMethod,
      grocerySubtotal,
      meatSubtotal,
      deliveryFee,
      combinedTotal,
      groceryShipment,
      meatShipment,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const advanceShipmentStatus = (orderId: string, section: StoreSection) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const key = section === 'grocery' ? 'groceryShipment' : 'meatShipment';
        const shipment = order[key];
        if (!shipment) return order;
        const idx = SHIPMENT_STEPS.indexOf(shipment.status);
        const nextStatus =
          idx < SHIPMENT_STEPS.length - 1 ? SHIPMENT_STEPS[idx + 1] : shipment.status;
        return {
          ...order,
          [key]: { ...shipment, status: nextStatus },
        };
      })
    );
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        groceryItems,
        meatItems,
        grocerySubtotal,
        meatSubtotal,
        combinedSubtotal,
        deliveryFee,
        combinedTotal,
        freeDeliveryRemaining,
        totalItemCount,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        orders,
        placeOrder,
        advanceShipmentStatus,
        firstItemCelebrationKey,
        celebrationSection,
        user,
        isAuthModalOpen,
        setIsAuthModalOpen,
        activeAccountTab,
        setActiveAccountTab,
        loginDemoCustomer,
        logout,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used inside StoreProvider');
  }
  return ctx;
}
