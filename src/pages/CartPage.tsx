import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { formatINR } from '../utils/currency';
import { DEMO_COUPONS } from '../data/coupons';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Ticket,
  CheckCircle2,
  X,
  ArrowLeft,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    productSavings,
    discountAmount,
    shippingFee,
    freeShippingThreshold,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (!couponInput.trim()) {
      setCouponError('Please enter a coupon code.');
      return;
    }
    const result = applyCoupon(couponInput);
    if (!result.success) {
      setCouponError(result.message);
    } else {
      setCouponInput('');
    }
  };

  const handleQuickCouponApply = (code: string) => {
    setCouponError(null);
    const result = applyCoupon(code);
    if (!result.success) {
      setCouponError(result.message);
    }
  };

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24">
      <Breadcrumbs items={[{ label: 'Shopping Cart' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4 mt-2">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-[#F5C76A]" />
            Your Festive Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {cartCount} items selected for celebration delivery
          </p>
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-zinc-400 hover:text-[#FF2D55] transition-colors flex items-center gap-1 self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear All Items
          </button>
        )}
      </div>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          
          {/* Left Column: Line Items (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Free Shipping Progress Indicator */}
            <div className="p-4 rounded-2xl bg-[#141419] border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#F5C76A]" />
                  {amountNeededForFreeShipping === 0 ? (
                    <span className="text-emerald-400 font-bold">
                      🎉 Congratulations! Free Express Diwali Shipping Unlocked!
                    </span>
                  ) : (
                    <span>
                      Add <strong className="text-[#F5C76A]">{formatINR(amountNeededForFreeShipping)}</strong> more to get Free Express Delivery
                    </span>
                  )}
                </span>
                <span className="text-[11px] font-bold text-zinc-400">
                  {freeShippingProgress}%
                </span>
              </div>
              <div className="w-full bg-[#1A1A20] rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#FF7A18] to-[#F5C76A] h-full rounded-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Line Items */}
            <div className="space-y-3">
              {cart.map((item, index) => {
                const lineSubtotal = item.product.sellingPrice * item.quantity;
                return (
                  <div
                    key={`${item.productId}-${JSON.stringify(item.selectedVariant)}-${index}`}
                    className="p-4 rounded-2xl bg-[#121216] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors hover:border-white/20"
                  >
                    <div className="flex items-center gap-4">
                      <a href={`#/product/${item.product.slug}`} className="flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-18 h-18 sm:w-20 sm:h-20 object-cover rounded-xl border border-white/10 bg-[#1A1A20]"
                        />
                      </a>
                      <div>
                        <div className="text-[10px] font-bold text-[#F5C76A] uppercase">
                          {item.product.brand}
                        </div>
                        <h2 className="font-bold text-sm text-white hover:text-[#F5C76A] transition-colors line-clamp-1">
                          <a href={`#/product/${item.product.slug}`}>
                            {item.product.name}
                          </a>
                        </h2>
                        {item.selectedVariant && (
                          <div className="text-xs text-zinc-400 mt-0.5">
                            {Object.entries(item.selectedVariant).map(([k, v]) => (
                              <span key={k} className="mr-2">{k}: <strong className="text-zinc-200">{v}</strong></span>
                            ))}
                          </div>
                        )}
                        <div className="text-xs text-zinc-400 mt-1">
                          Unit Price: <span className="text-white font-semibold">{formatINR(item.product.sellingPrice)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex items-center justify-between w-full sm:w-auto gap-4 self-end sm:self-center">
                      <div className="flex items-center border border-white/10 rounded-xl bg-[#1A1A20]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1, item.selectedVariant)}
                          aria-label="Decrease quantity"
                          className="w-8 h-8 flex items-center justify-center text-zinc-300 hover:text-white"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-bold text-xs text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1, item.selectedVariant)}
                          aria-label="Increase quantity"
                          className="w-8 h-8 flex items-center justify-center text-zinc-300 hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right min-w-[90px]">
                        <div className="text-sm font-bold text-white">
                          {formatINR(lineSubtotal)}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.productId, item.selectedVariant)}
                        aria-label={`Remove ${item.product.name} from cart`}
                        className="p-2 text-zinc-500 hover:text-[#FF2D55] transition-colors rounded-lg hover:bg-white/5"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <a
                href="#/shop"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F5C76A] hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
              </a>
            </div>
          </div>

          {/* Right Column: Order Summary & Coupon Engine (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Summary Box */}
            <div className="p-6 rounded-2xl bg-[#141419] border border-white/10 space-y-4">
              <h2 className="font-display font-bold text-base text-white border-b border-white/10 pb-3">
                Festive Order Summary
              </h2>

              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between text-zinc-300">
                  <span>Cart Subtotal ({cartCount} items)</span>
                  <span className="font-semibold text-white">{formatINR(cartSubtotal)}</span>
                </div>

                {productSavings > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Festive Catalogue Savings</span>
                    <span>- {formatINR(productSavings)}</span>
                  </div>
                )}

                {appliedCoupon && (
                  <div className="flex justify-between text-[#F5C76A] font-medium">
                    <span>Coupon ({appliedCoupon.code})</span>
                    <span>- {formatINR(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-300">
                  <span>Express Diwali Shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-400 font-semibold">FREE</span>
                    ) : (
                      formatINR(shippingFee)
                    )}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-between items-baseline">
                <div>
                  <div className="text-base sm:text-lg font-black text-white">Grand Total</div>
                  <div className="text-[11px] text-zinc-400">Inclusive of all Indian taxes</div>
                </div>
                <div className="text-2xl font-black text-[#F5C76A] font-display">
                  {formatINR(cartTotal)}
                </div>
              </div>

              {/* Checkout CTA */}
              <a
                href="#/checkout"
                className="w-full min-h-[48px] flex items-center justify-center gap-2 bg-[#F5C76A] hover:bg-[#FFB547] text-[#09090B] font-black text-sm rounded-xl py-3 px-4 transition-all duration-200 active:scale-[0.98] shadow-lg shadow-[#F5C76A]/20"
              >
                <span>PROCEED TO DEMO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="pt-2 text-[11px] text-zinc-500 text-center flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Simulated Secure Checkout &bull; No Real Card Required</span>
              </div>
            </div>

            {/* Coupon Engine Box */}
            <div className="p-5 rounded-2xl bg-[#121216] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <Ticket className="w-4 h-4 text-[#F5C76A]" />
                <span>Apply Festive Coupon Voucher</span>
              </div>

              {appliedCoupon ? (
                <div className="p-3 rounded-xl bg-[#F5C76A]/10 border border-[#F5C76A]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F5C76A]" />
                    <div>
                      <div className="text-xs font-bold text-white">
                        {appliedCoupon.code} Applied
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        {appliedCoupon.title}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    aria-label="Remove coupon"
                    className="p-1 text-zinc-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={e => {
                        setCouponInput(e.target.value);
                        setCouponError(null);
                      }}
                      placeholder="Enter coupon code (e.g. FESTIVE10)"
                      className="flex-1 bg-[#1A1A20] border border-white/10 text-white placeholder-zinc-500 text-xs rounded-xl px-3 py-2.5 uppercase tracking-wider focus:outline-none focus:border-[#F5C76A]"
                    />
                    <button
                      type="submit"
                      className="bg-[#1A1A20] hover:bg-[#F5C76A] hover:text-[#09090B] text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/10 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-xs text-[#FF2D55]">{couponError}</p>
                  )}
                </form>
              )}

              {/* Quick Coupon Codes */}
              <div className="pt-2 border-t border-white/5 space-y-1.5">
                <div className="text-[11px] font-semibold text-zinc-400">Available Demo Vouchers:</div>
                <div className="flex flex-wrap gap-1.5">
                  {DEMO_COUPONS.map(c => (
                    <button
                      key={c.code}
                      onClick={() => handleQuickCouponApply(c.code)}
                      className="text-[11px] bg-[#1A1A20] hover:bg-[#F5C76A] hover:text-[#09090B] text-zinc-300 font-mono font-bold px-2.5 py-1 rounded-lg border border-white/10 transition-colors"
                    >
                      {c.code}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* Empty Cart State */
        <div className="bg-[#121216] border border-white/10 rounded-2xl p-12 sm:p-16 text-center space-y-4 my-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#1A1A20] flex items-center justify-center text-zinc-400">
            <ShoppingBag className="w-8 h-8 text-[#F5C76A]" />
          </div>
          <h2 className="text-xl font-bold text-white">Your Shopping Cart is Empty</h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
            Your festive celebration basket is currently waiting to be filled. Explore our mega Diwali sale aisles and add your favourite products!
          </p>
          <a
            href="#/shop"
            className="inline-flex items-center gap-2 bg-[#F5C76A] text-[#09090B] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl hover:bg-[#FFB547] transition-all"
          >
            <span>Start Shopping Now</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </main>
  );
};
