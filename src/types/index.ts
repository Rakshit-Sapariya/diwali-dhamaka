export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface ProductVariant {
  name: string;
  options: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  shortDescription: string;
  category: string; // matches Category.slug
  images: string[];
  sellingPrice: number; // INR
  originalPrice: number; // INR
  stockStatus: StockStatus;
  stockQuantity: number;
  variants?: ProductVariant[];
  specifications: Record<string, string>;
  rating: number;
  reviewCount: number;
  tags: string[];
  featured?: boolean;
  isDealOfTheDay?: boolean;
  badge?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  accentColor?: string;
  itemCount?: number;
  featured?: boolean;
}

export type DiscountType = 'percentage' | 'flat';

export interface Coupon {
  code: string;
  title: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  minimumPurchase: number;
  maximumDiscount?: number;
  eligibleCategories?: string[];
  startsAt: string;
  expiresAt: string;
  active: boolean;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  selectedVariant?: Record<string, string>;
}

export interface CustomerAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  instructions?: string;
}

export type OrderStatus = 'Processing' | 'Confirmed' | 'Shipped' | 'Out for Delivery' | 'Delivered';

export interface Order {
  id: string;
  items: CartItem[];
  customerAddress: CustomerAddress;
  subtotal: number;
  discount: number;
  couponCode?: string;
  shipping: number;
  total: number;
  createdAt: string;
  status: OrderStatus;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD';
  paymentStatus: 'Simulated - Confirmed' | 'Pending';
  demoMode: true;
}

export interface FilterState {
  category: string;
  search: string;
  minPrice: number;
  maxPrice: number;
  rating: number;
  brands: string[];
  inStockOnly: boolean;
  dealsOnly: boolean;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'discount' | 'name';
}
