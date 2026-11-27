export type StoreSection = 'grocery' | 'meat';

export type GroceryCategory =
  | 'Fruits'
  | 'Vegetables'
  | 'Snacks'
  | 'Dairy & Bakery'
  | 'Staples & Beverages';

export type MeatCategory =
  | 'Chicken'
  | 'Mutton'
  | 'Fish & Seafood'
  | 'Marinades & Eggs';

export interface ProductVariant {
  id: string;
  label: string;
  cut?: string;
  weight: string;
  price: number;
  mrp?: number;
  pieces?: string;
}

export interface Product {
  id: string;
  name: string;
  section: StoreSection;
  division: string;
  category: GroceryCategory | MeatCategory;
  description: string;
  image: string;
  emoji: string;
  accentBg: string;
  badges: string[];
  origin: string;
  storageTemp: string;
  variants: ProductVariant[];
}

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  section: StoreSection;
  category: string;
  image: string;
  emoji: string;
  accentBg: string;
  variantId: string;
  variantLabel: string;
  cut?: string;
  weight: string;
  price: number;
  quantity: number;
  storageTemp: string;
  badges: string[];
}

export interface DeliverySlot {
  id: string;
  label: string;
  window: string;
  tag?: string;
}

export type ShipmentStatus =
  | 'Order Placed'
  | 'Hygiene & Quality Check'
  | 'Sealed & Packed'
  | 'Out for Delivery'
  | 'Delivered';

export interface OrderShipment {
  shipmentId: string;
  section: StoreSection;
  packagingType: string;
  tempRange: string;
  slotLabel: string;
  items: CartItem[];
  subtotal: number;
  status: ShipmentStatus;
  riderName: string;
  vehicleType: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  address: string;
  paymentMethod: string;
  grocerySubtotal: number;
  meatSubtotal: number;
  deliveryFee: number;
  combinedTotal: number;
  groceryShipment?: OrderShipment;
  meatShipment?: OrderShipment;
}

export interface DemoUser {
  name: string;
  email: string;
  phone: string;
}
