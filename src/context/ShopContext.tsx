import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Coupon, Order, CustomerAddress } from '../types';
import { PRODUCTS } from '../data/products';
import { DEMO_COUPONS } from '../data/coupons';

interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface ShopContextType {
  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  cartOriginalSubtotal: number;
  productSavings: number;
  discountAmount: number;
  shippingFee: number;
  freeShippingThreshold: number;
  cartTotal: number;
  addToCart: (product: Product, quantity?: number, selectedVariant?: Record<string, string>) => void;
  updateQuantity: (productId: string, quantity: number, selectedVariant?: Record<string, string>) => void;
  removeFromCart: (productId: string, selectedVariant?: Record<string, string>) => void;
  clearCart: () => void;

  // Wishlist
  wishlist: string[];
  wishlistCount: number;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  moveWishlistToCart: (productId: string) => void;

  // Coupon
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Orders
  orders: Order[];
  placeDemoOrder: (address: CustomerAddress, paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD') => Order;
  getOrderById: (orderId: string) => Order | undefined;

  // UI & Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (open: boolean) => void;
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'diwali_dhamaka_cart_v1';
const WISHLIST_STORAGE_KEY = 'diwali_dhamaka_wishlist_v1';
const ORDERS_STORAGE_KEY = 'diwali_dhamaka_orders_v1';
const COUPON_STORAGE_KEY = 'diwali_dhamaka_coupon_v1';

const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING_FEE = 99;

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // ─── 1. Persistent States ──────────────────────────────────────────
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Hydrate with latest product catalog data to prevent stale prices
        return parsed.map((item: CartItem) => {
          const fresh = PRODUCTS.find(p => p.id === item.productId);
          return fresh ? { ...item, product: fresh } : item;
        }).filter((item: CartItem) => Boolean(item.product));
      }
    } catch (e) {
      console.warn('Failed to parse cart storage:', e);
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    try {
      const saved = localStorage.getItem(COUPON_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.error('Storage save error (cart):', err);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (err) {
      console.error('Storage save error (wishlist):', err);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (err) {
      console.error('Storage save error (orders):', err);
    }
  }, [orders]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (err) {
      console.error('Storage save error (coupon):', err);
    }
  }, [appliedCoupon]);

  // Toast handler
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ id: Date.now(), message, type });
  };

  const dismissToast = () => {
    setToast(null);
  };

  // ─── 2. Cart Calculations ───────────────────────────────────────────
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotal = cart.reduce(
    (total, item) => total + item.product.sellingPrice * item.quantity,
    0
  );

  const cartOriginalSubtotal = cart.reduce(
    (total, item) => total + (item.product.originalPrice || item.product.sellingPrice) * item.quantity,
    0
  );

  const productSavings = Math.max(0, cartOriginalSubtotal - cartSubtotal);

  // Re-validate coupon if cart changes below threshold
  useEffect(() => {
    if (appliedCoupon && cartSubtotal < appliedCoupon.minimumPurchase) {
      setAppliedCoupon(null);
      showToast(`Coupon ${appliedCoupon.code} removed: Cart total below minimum ₹${appliedCoupon.minimumPurchase}`, 'info');
    }
  }, [cartSubtotal, appliedCoupon]);

  let discountAmount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minimumPurchase) {
    if (appliedCoupon.discountType === 'percentage') {
      const calculated = (cartSubtotal * appliedCoupon.discountValue) / 100;
      discountAmount = appliedCoupon.maximumDiscount 
        ? Math.min(calculated, appliedCoupon.maximumDiscount)
        : calculated;
    } else {
      discountAmount = appliedCoupon.discountValue;
    }
    // Don't allow discount to exceed subtotal
    discountAmount = Math.min(discountAmount, cartSubtotal);
  }

  const shippingFee = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0
    ? 0
    : STANDARD_SHIPPING_FEE;

  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  // ─── 3. Cart Actions ────────────────────────────────────────────────
  const areVariantsEqual = (
    v1?: Record<string, string>,
    v2?: Record<string, string>
  ) => {
    if (!v1 && !v2) return true;
    if (!v1 || !v2) return false;
    const keys1 = Object.keys(v1);
    const keys2 = Object.keys(v2);
    if (keys1.length !== keys2.length) return false;
    return keys1.every(k => v1[k] === v2[k]);
  };

  const addToCart = (
    product: Product,
    quantity: number = 1,
    selectedVariant?: Record<string, string>
  ) => {
    if (product.stockStatus === 'out_of_stock' || product.stockQuantity <= 0) {
      showToast(`${product.name} is currently out of stock`, 'error');
      return;
    }

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => item.productId === product.id && areVariantsEqual(item.selectedVariant, selectedVariant)
      );

      if (existingIndex > -1) {
        const currentQty = prevCart[existingIndex].quantity;
        const newQty = Math.min(currentQty + quantity, product.stockQuantity || 10);
        const updated = [...prevCart];
        updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
        return updated;
      } else {
        const safeQty = Math.min(quantity, product.stockQuantity || 10);
        return [...prevCart, { productId: product.id, product, quantity: safeQty, selectedVariant }];
      }
    });

    showToast(`Added "${product.name}" to your Diwali Cart!`, 'success');
  };

  const updateQuantity = (
    productId: string,
    quantity: number,
    selectedVariant?: Record<string, string>
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedVariant);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item => {
        if (item.productId === productId && areVariantsEqual(item.selectedVariant, selectedVariant)) {
          const maxAvailable = item.product.stockQuantity || 10;
          return { ...item, quantity: Math.min(quantity, maxAvailable) };
        }
        return item;
      })
    );
  };

  const removeFromCart = (
    productId: string,
    selectedVariant?: Record<string, string>
  ) => {
    setCart(prevCart =>
      prevCart.filter(
        item => !(item.productId === productId && areVariantsEqual(item.selectedVariant, selectedVariant))
      )
    );
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // ─── 4. Wishlist Actions ─────────────────────────────────────────────
  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const toggleWishlist = (productId: string) => {
    const product = PRODUCTS.find(p => p.id === productId);
    const productName = product ? product.name : 'Item';

    if (wishlist.includes(productId)) {
      setWishlist(prev => prev.filter(id => id !== productId));
      showToast(`Removed "${productName}" from Wishlist`, 'info');
    } else {
      setWishlist(prev => [...prev, productId]);
      showToast(`Saved "${productName}" to your Festive Wishlist!`, 'success');
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(id => id !== productId));
  };

  const moveWishlistToCart = (productId: string) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    addToCart(product, 1);
    removeFromWishlist(productId);
  };

  // ─── 5. Coupon Engine ────────────────────────────────────────────────
  const applyCoupon = (rawCode: string): { success: boolean; message: string } => {
    const code = rawCode.trim().toUpperCase();
    if (!code) {
      return { success: false, message: 'Please enter a coupon code.' };
    }

    const coupon = DEMO_COUPONS.find(c => c.code.toUpperCase() === code);
    if (!coupon) {
      return { success: false, message: `Invalid coupon "${code}". Try FESTIVE10 or DIWALI15.` };
    }

    if (!coupon.active) {
      return { success: false, message: `Coupon "${code}" has expired.` };
    }

    if (cartSubtotal < coupon.minimumPurchase) {
      return {
        success: false,
        message: `Cart total must be at least ₹${coupon.minimumPurchase} to use "${coupon.code}". (Current: ₹${cartSubtotal})`,
      };
    }

    // Category eligibility check
    if (coupon.eligibleCategories && coupon.eligibleCategories.length > 0) {
      const hasEligibleItem = cart.some(item =>
        coupon.eligibleCategories?.includes(item.product.category)
      );
      if (!hasEligibleItem) {
        return {
          success: false,
          message: `Coupon "${coupon.code}" is valid only for selected categories.`,
        };
      }
    }

    setAppliedCoupon(coupon);
    showToast(`Festive coupon "${coupon.code}" applied successfully!`, 'success');
    return { success: true, message: `Coupon "${coupon.code}" applied!` };
  };

  const removeCoupon = () => {
    if (appliedCoupon) {
      showToast(`Coupon ${appliedCoupon.code} removed`, 'info');
      setAppliedCoupon(null);
    }
  };

  // ─── 6. Demo Checkout & Orders ────────────────────────────────────────
  const placeDemoOrder = (
    address: CustomerAddress,
    paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD'
  ): Order => {
    const orderNumber = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      id: `DD-2026-${orderNumber}`,
      items: [...cart],
      customerAddress: address,
      subtotal: cartSubtotal,
      discount: discountAmount,
      couponCode: appliedCoupon?.code,
      shipping: shippingFee,
      total: cartTotal,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
      paymentMethod,
      paymentStatus: 'Simulated - Confirmed',
      demoMode: true,
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(
      o => o.id.trim().toLowerCase() === orderId.trim().toLowerCase()
    );
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,
        cartOriginalSubtotal,
        productSavings,
        discountAmount,
        shippingFee,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        cartTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        moveWishlistToCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        orders,
        placeDemoOrder,
        getOrderById,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        isMobileNavOpen,
        setIsMobileNavOpen,
        toast,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = (): ShopContextType => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
