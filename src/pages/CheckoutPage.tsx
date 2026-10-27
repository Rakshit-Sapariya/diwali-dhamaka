import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { CustomerAddress } from '../types';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { formatINR } from '../utils/currency';
import { ShieldCheck, Lock, ArrowLeft } from 'lucide-react';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi', 'Goa', 'Gujarat', 'Haryana',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab',
  'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal',
];

export const CheckoutPage: React.FC = () => {
  const { cart, cartCount, cartSubtotal, discountAmount, shippingFee, cartTotal, placeDemoOrder } = useShop();

  const [formData, setFormData] = useState<CustomerAddress>({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    locality: '',
    city: '',
    state: 'Delhi',
    pincode: '',
    instructions: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'COD'>('UPI');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-2">Your Cart is Empty</h1>
        <p className="text-zinc-400 text-sm mb-6">
          Add items to your festive shopping cart before proceeding to checkout.
        </p>
        <a
          href="#/shop"
          className="inline-flex items-center gap-2 bg-[#F5C76A] text-[#09090B] font-bold px-6 py-2.5 rounded-xl text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Go to Shop
        </a>
      </main>
    );
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required.';
    }
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Valid 10-digit phone number is required.';
    }
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'House/Flat & Street is required.';
    if (!formData.city.trim()) newErrors.city = 'City is required.';
    if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = 'Valid 6-digit Indian PIN code is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate realistic 1-second order processing
    setTimeout(() => {
      const order = placeDemoOrder(formData, paymentMethod);
      setIsSubmitting(false);
      window.location.hash = `#/order-success?orderId=${order.id}`;
    }, 900);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24">
      <Breadcrumbs
        items={[
          { label: 'Cart', href: '#/cart' },
          { label: 'Secure Checkout' },
        ]}
      />

      {/* Demo Mode Notice */}
      <div className="bg-[#1A1A20] border border-[#F5C76A]/30 rounded-2xl p-4 my-4 flex items-start gap-3 text-xs sm:text-sm">
        <ShieldCheck className="w-5 h-5 text-[#F5C76A] flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white uppercase tracking-wider">
            DEMO MODE &bull; SIMULATED CHECKOUT
          </span>
          <p className="text-zinc-400 text-xs mt-0.5">
            This checkout simulates order placement in your local session. No real card details or actual payment transactions are processed.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        
        {/* Left Form Column (7 cols) */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Step 1: Customer Contact */}
            <div className="p-6 rounded-2xl bg-[#121216] border border-white/10 space-y-4">
              <h2 className="font-display font-bold text-base text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F5C76A] text-[#09090B] font-bold text-xs flex items-center justify-center">
                  1
                </span>
                Customer Contact Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold text-zinc-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full bg-[#1A1A20] border ${errors.fullName ? 'border-[#FF2D55]' : 'border-white/10'} text-white rounded-xl px-3 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#F5C76A]`}
                  />
                  {errors.fullName && <p className="text-[11px] text-[#FF2D55] mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-zinc-300 mb-1">
                    Phone Number (10 Digits) *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                    placeholder="e.g. 9876543210"
                    className={`w-full bg-[#1A1A20] border ${errors.phone ? 'border-[#FF2D55]' : 'border-white/10'} text-white rounded-xl px-3 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#F5C76A]`}
                  />
                  {errors.phone && <p className="text-[11px] text-[#FF2D55] mt-1">{errors.phone}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-xs font-semibold text-zinc-300 mb-1">
                    Email Address (For Order Updates) *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. rahul.sharma@example.com"
                    className={`w-full bg-[#1A1A20] border ${errors.email ? 'border-[#FF2D55]' : 'border-white/10'} text-white rounded-xl px-3 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#F5C76A]`}
                  />
                  {errors.email && <p className="text-[11px] text-[#FF2D55] mt-1">{errors.email}</p>}
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div className="p-6 rounded-2xl bg-[#121216] border border-white/10 space-y-4">
              <h2 className="font-display font-bold text-base text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F5C76A] text-[#09090B] font-bold text-xs flex items-center justify-center">
                  2
                </span>
                Festive Delivery Address
              </h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="addressLine1" className="block text-xs font-semibold text-zinc-300 mb-1">
                    Flat / House No. / Building & Street *
                  </label>
                  <input
                    id="addressLine1"
                    type="text"
                    value={formData.addressLine1}
                    onChange={e => setFormData({ ...formData, addressLine1: e.target.value })}
                    placeholder="e.g. Flat 402, Shanti Vihar Apartments, MG Road"
                    className={`w-full bg-[#1A1A20] border ${errors.addressLine1 ? 'border-[#FF2D55]' : 'border-white/10'} text-white rounded-xl px-3 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#F5C76A]`}
                  />
                  {errors.addressLine1 && <p className="text-[11px] text-[#FF2D55] mt-1">{errors.addressLine1}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="locality" className="block text-xs font-semibold text-zinc-300 mb-1">
                      Locality / Landmark
                    </label>
                    <input
                      id="locality"
                      type="text"
                      value={formData.locality}
                      onChange={e => setFormData({ ...formData, locality: e.target.value })}
                      placeholder="e.g. Near Shiv Mandir"
                      className="w-full bg-[#1A1A20] border border-white/10 text-white rounded-xl px-3 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#F5C76A]"
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-xs font-semibold text-zinc-300 mb-1">
                      City *
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. New Delhi"
                      className={`w-full bg-[#1A1A20] border ${errors.city ? 'border-[#FF2D55]' : 'border-white/10'} text-white rounded-xl px-3 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#F5C76A]`}
                    />
                    {errors.city && <p className="text-[11px] text-[#FF2D55] mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-xs font-semibold text-zinc-300 mb-1">
                      State *
                    </label>
                    <select
                      id="state"
                      value={formData.state}
                      onChange={e => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-[#1A1A20] border border-white/10 text-white rounded-xl px-3 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#F5C76A]"
                    >
                      {INDIAN_STATES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="pincode" className="block text-xs font-semibold text-zinc-300 mb-1">
                      PIN Code (6 Digits) *
                    </label>
                    <input
                      id="pincode"
                      type="text"
                      value={formData.pincode}
                      onChange={e => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                      placeholder="e.g. 110001"
                      className={`w-full bg-[#1A1A20] border ${errors.pincode ? 'border-[#FF2D55]' : 'border-white/10'} text-white rounded-xl px-3 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#F5C76A]`}
                    />
                    {errors.pincode && <p className="text-[11px] text-[#FF2D55] mt-1">{errors.pincode}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="instructions" className="block text-xs font-semibold text-zinc-300 mb-1">
                    Special Delivery Instructions (Optional)
                  </label>
                  <input
                    id="instructions"
                    type="text"
                    value={formData.instructions}
                    onChange={e => setFormData({ ...formData, instructions: e.target.value })}
                    placeholder="e.g. Please ring doorbell twice, gift wrapped"
                    className="w-full bg-[#1A1A20] border border-white/10 text-white rounded-xl px-3 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#F5C76A]"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="p-6 rounded-2xl bg-[#121216] border border-white/10 space-y-4">
              <h2 className="font-display font-bold text-base text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F5C76A] text-[#09090B] font-bold text-xs flex items-center justify-center">
                  3
                </span>
                Payment Method (Simulated Demo)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'UPI', label: 'UPI / Instant QR', desc: 'Google Pay, PhonePe, Paytm simulation' },
                  { id: 'Card', label: 'Credit / Debit Card', desc: 'Visa, MasterCard, RuPay (Test Mode)' },
                  { id: 'NetBanking', label: 'Net Banking', desc: 'HDFC, SBI, ICICI, Axis Bank simulation' },
                  { id: 'COD', label: 'Cash on Delivery (COD)', desc: 'Pay cash when Diwali parcel arrives' },
                ].map(opt => (
                  <label
                    key={opt.id}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      paymentMethod === opt.id
                        ? 'border-[#F5C76A] bg-[#F5C76A]/10 text-white shadow-sm'
                        : 'border-white/10 bg-[#1A1A20] text-zinc-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs sm:text-sm">{opt.label}</span>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === opt.id}
                        onChange={() => setPaymentMethod(opt.id as any)}
                        className="accent-[#F5C76A]"
                      />
                    </div>
                    <span className="text-[11px] text-zinc-400">{opt.desc}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full min-h-[50px] flex items-center justify-center gap-2 bg-[#F5C76A] hover:bg-[#FFB547] text-[#09090B] font-black text-sm rounded-xl py-3.5 px-6 transition-all duration-200 active:scale-[0.98] shadow-xl shadow-[#F5C76A]/20 select-none ${
                isSubmitting ? 'opacity-70 cursor-wait' : ''
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>
                {isSubmitting
                  ? 'Confirming Your Festive Order...'
                  : `CONFIRM DEMO ORDER &bull; ${formatINR(cartTotal)}`}
              </span>
            </button>
          </form>
        </div>

        {/* Right Summary Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#141419] border border-white/10 space-y-4 sticky top-24">
            <h2 className="font-display font-bold text-base text-white border-b border-white/10 pb-3">
              Order Breakdown ({cartCount} Items)
            </h2>

            {/* Items list preview */}
            <div className="max-h-60 overflow-y-auto divide-y divide-white/5 pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 truncate">
                    <img
                      src={item.product.images[0]}
                      alt=""
                      className="w-10 h-10 object-cover rounded-lg bg-[#1A1A20] flex-shrink-0"
                    />
                    <div className="truncate">
                      <div className="font-semibold text-white truncate">{item.product.name}</div>
                      <div className="text-zinc-400 text-[11px]">Qty: {item.quantity}</div>
                    </div>
                  </div>
                  <div className="font-bold text-white flex-shrink-0">
                    {formatINR(item.product.sellingPrice * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Price lines */}
            <div className="pt-3 border-t border-white/10 space-y-2 text-xs sm:text-sm text-zinc-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-white">{formatINR(cartSubtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#F5C76A] font-medium">
                  <span>Festive Coupon Savings</span>
                  <span>- {formatINR(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-400 font-semibold">FREE</span>
                  ) : (
                    formatINR(shippingFee)
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between items-baseline text-base sm:text-lg font-black text-white">
                <span>Amount Payable</span>
                <span className="text-[#F5C76A] font-display">{formatINR(cartTotal)}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-zinc-500 text-center">
              <ShieldCheck className="w-4 h-4 text-[#F5C76A]" />
              <span>Tested & verified demo checkout workflow</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};
