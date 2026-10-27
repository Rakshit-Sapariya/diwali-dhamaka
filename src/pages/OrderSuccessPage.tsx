import React, { useEffect, useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Order } from '../types';
import { formatINR } from '../utils/currency';
import { DiyaIcon } from '../components/common/DiyaMotif';
import { CheckCircle2, PackageCheck, Home, Truck } from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const { orders } = useShop();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/orderId=([^&]*)/);
    const orderId = match ? match[1] : null;

    if (orderId && orders.length > 0) {
      const found = orders.find(o => o.id === orderId);
      if (found) setOrder(found);
      else setOrder(orders[0]);
    } else if (orders.length > 0) {
      setOrder(orders[0]);
    }
  }, [orders]);

  if (!order) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-2">No Active Order Found</h1>
        <p className="text-zinc-400 text-sm mb-6">
          You don&rsquo;t have any active orders in this session yet.
        </p>
        <a
          href="#/shop"
          className="inline-flex items-center gap-2 bg-[#F5C76A] text-[#09090B] font-bold px-6 py-2.5 rounded-xl text-sm"
        >
          Explore Diwali Store
        </a>
      </main>
    );
  }

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 pb-24">
      {/* Celebration Header */}
      <div className="text-center space-y-4 mb-10">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/10">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5C76A]/10 border border-[#F5C76A]/30 text-xs font-bold text-[#F5C76A]">
          <DiyaIcon className="w-4 h-4" />
          <span>AUSPICIOUS CELEBRATION ORDER PLACED</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Thank You, {order.customerAddress.fullName}!
        </h1>
        <p className="text-sm text-zinc-300 max-w-lg mx-auto">
          Your festive order has been confirmed in simulated demo mode. We are preparing your celebration items for doorstep delivery.
        </p>
      </div>

      {/* Main Order Card */}
      <div className="bg-[#121216] border border-white/10 rounded-2xl overflow-hidden shadow-2xl space-y-6 p-6 sm:p-8">
        
        {/* Order Meta Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="text-xs text-zinc-400 font-medium">Order Identification Number:</div>
            <div className="text-lg sm:text-xl font-mono font-black text-[#F5C76A] tracking-wider">
              {order.id}
            </div>
          </div>
          <div className="sm:text-right">
            <div className="text-xs text-zinc-400 font-medium">Date & Time:</div>
            <div className="text-xs sm:text-sm text-white font-medium">{formattedDate}</div>
          </div>
          <span className="bg-[#1A1A20] text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-lg self-start sm:self-auto">
            {order.status}
          </span>
        </div>

        {/* Demo Mode Badge */}
        <div className="p-3 bg-[#1A1A20] rounded-xl border border-white/5 text-xs text-zinc-400 flex items-center justify-between">
          <span>Simulation Type: <strong>Local Demo Checkout</strong></span>
          <span>Payment: <strong>{order.paymentMethod} (Simulated)</strong></span>
        </div>

        {/* Items Table */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
            Purchased Festive Items ({order.items.length})
          </h2>
          <div className="divide-y divide-white/5 border-y border-white/5">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover bg-[#1A1A20]"
                  />
                  <div>
                    <div className="text-sm font-semibold text-white">{item.product.name}</div>
                    <div className="text-xs text-zinc-400">
                      Qty: {item.quantity} &bull; {formatINR(item.product.sellingPrice)} each
                    </div>
                  </div>
                </div>
                <div className="text-sm font-bold text-white">
                  {formatINR(item.product.sellingPrice * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Address and Calculation Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Shipping destination */}
          <div className="p-4 rounded-xl bg-[#181820] border border-white/5 space-y-1.5 text-xs">
            <div className="font-bold text-white text-sm flex items-center gap-1.5 mb-2">
              <Truck className="w-4 h-4 text-[#F5C76A]" /> Delivery Destination
            </div>
            <div className="text-zinc-200 font-semibold">{order.customerAddress.fullName}</div>
            <div className="text-zinc-400">{order.customerAddress.addressLine1}</div>
            {order.customerAddress.locality && (
              <div className="text-zinc-400">{order.customerAddress.locality}</div>
            )}
            <div className="text-zinc-400">
              {order.customerAddress.city}, {order.customerAddress.state} — {order.customerAddress.pincode}
            </div>
            <div className="text-zinc-400 pt-1">Phone: {order.customerAddress.phone}</div>
          </div>

          {/* Pricing Totals */}
          <div className="p-4 rounded-xl bg-[#181820] border border-white/5 space-y-2 text-xs">
            <div className="font-bold text-white text-sm mb-2">Financial Breakdown</div>
            <div className="flex justify-between text-zinc-400">
              <span>Cart Subtotal</span>
              <span className="text-white font-medium">{formatINR(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#F5C76A]">
                <span>Coupon Savings ({order.couponCode || 'PROMO'})</span>
                <span>- {formatINR(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-zinc-400">
              <span>Diwali Express Delivery</span>
              <span className="text-white font-medium">
                {order.shipping === 0 ? 'FREE' : formatINR(order.shipping)}
              </span>
            </div>
            <div className="pt-2 border-t border-white/10 flex justify-between font-black text-sm text-white">
              <span>Simulated Total</span>
              <span className="text-[#F5C76A] font-display text-base">{formatINR(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href={`#/track-order?orderId=${order.id}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F5C76A] hover:bg-[#FFB547] text-[#09090B] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-md"
          >
            <PackageCheck className="w-4 h-4" />
            <span>Track Order Delivery Status</span>
          </a>

          <a
            href="#/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1A1A20] hover:bg-white/10 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl border border-white/10 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Continue Festive Shopping</span>
          </a>
        </div>

      </div>
    </main>
  );
};
