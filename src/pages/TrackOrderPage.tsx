import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { formatINR } from '../utils/currency';
import { Search, PackageCheck, CheckCircle2, Clock, MapPin } from 'lucide-react';

export const TrackOrderPage: React.FC = () => {
  const { orders, getOrderById } = useShop();
  const [searchInput, setSearchInput] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/orderId=([^&]*)/);
    if (match && match[1]) {
      const id = decodeURIComponent(match[1]);
      setSearchInput(id);
      const found = getOrderById(id);
      setSearchedOrder(found || null);
      setHasSearched(true);
    } else if (orders.length > 0) {
      setSearchInput(orders[0].id);
      setSearchedOrder(orders[0]);
      setHasSearched(true);
    }
  }, [orders, getOrderById]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const found = getOrderById(searchInput.trim());
    setSearchedOrder(found || null);
    setHasSearched(true);
  };

  const steps = [
    { title: 'Order Confirmed', desc: 'Simulated payment verified & order recorded', completed: true, active: false },
    { title: 'Packed at Hub', desc: 'Handled with festive bubble wrap & gift packaging', completed: true, active: false },
    { title: 'In Transit', desc: 'Dispatched via Diwali Express Air Hub', completed: true, active: true },
    { title: 'Out for Delivery', desc: 'Delivery associate assigned for auspicious drop-off', completed: false, active: false },
    { title: 'Delivered', desc: 'Doorstep handoff with OTP verification', completed: false, active: false },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24">
      <Breadcrumbs items={[{ label: 'Track Order' }]} />

      <div className="text-center max-w-xl mx-auto my-6 space-y-2">
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white flex items-center justify-center gap-2">
          <PackageCheck className="w-7 h-7 text-[#F5C76A]" />
          Track Your Festive Shipment
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Enter your unique Diwali Dhamaka Order ID to inspect live simulated tracking checkpoints.
        </p>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleSearch} className="max-w-lg mx-auto flex gap-2 mb-10">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="e.g. DD-2026-12345"
            className="w-full bg-[#121216] border border-white/10 text-white placeholder-zinc-500 rounded-xl pl-10 pr-3 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#F5C76A]"
          />
        </div>
        <button
          type="submit"
          className="bg-[#F5C76A] hover:bg-[#FFB547] text-[#09090B] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-md active:scale-95"
        >
          Track Order
        </button>
      </form>

      {/* Results Display */}
      {searchedOrder ? (
        <div className="bg-[#121216] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-8 shadow-2xl">
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <span className="text-xs text-zinc-400">Tracking Shipment for:</span>
              <div className="font-mono text-lg sm:text-xl font-bold text-[#F5C76A]">
                {searchedOrder.id}
              </div>
            </div>
            <div className="text-xs text-zinc-300">
              Expected Delivery: <strong className="text-white">Tomorrow before 7:00 PM</strong>
            </div>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-lg self-start sm:self-auto">
              In Transit &bull; On Schedule
            </span>
          </div>

          {/* Stepper Timeline */}
          <div className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Shipment Status Timeline
            </h2>

            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  <div
                    className={`absolute -left-6 sm:-left-8 w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                      step.completed
                        ? 'bg-[#F5C76A] text-[#09090B] border-[#F5C76A]'
                        : 'bg-[#121216] text-zinc-500 border-white/20'
                    }`}
                  >
                    {step.completed ? <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : idx + 1}
                  </div>
                  <div>
                    <h3 className={`font-bold text-sm ${step.completed ? 'text-white' : 'text-zinc-500'}`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Destination Details & Items Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
            <div className="p-4 bg-[#181820] rounded-xl border border-white/5 space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5 mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#F5C76A]" /> Delivery Address
              </div>
              <div className="text-zinc-200 font-semibold">{searchedOrder.customerAddress.fullName}</div>
              <div className="text-zinc-400">{searchedOrder.customerAddress.addressLine1}</div>
              <div className="text-zinc-400">
                {searchedOrder.customerAddress.city}, {searchedOrder.customerAddress.state} — {searchedOrder.customerAddress.pincode}
              </div>
            </div>

            <div className="p-4 bg-[#181820] rounded-xl border border-white/5 space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5 mb-1.5">
                <PackageCheck className="w-3.5 h-3.5 text-[#F5C76A]" /> Order Summary
              </div>
              <div className="text-zinc-400">Total Items: <strong className="text-white">{searchedOrder.items.length} products</strong></div>
              <div className="text-zinc-400">Amount Paid: <strong className="text-[#F5C76A]">{formatINR(searchedOrder.total)}</strong></div>
              <div className="text-zinc-400">Mode: <strong>{searchedOrder.paymentMethod} (Simulated)</strong></div>
            </div>
          </div>

          <div className="text-center pt-2">
            <a
              href="#/shop"
              className="text-xs font-semibold text-[#F5C76A] hover:underline"
            >
              Shop More Diwali Collections &rarr;
            </a>
          </div>
        </div>
      ) : hasSearched ? (
        <div className="bg-[#121216] border border-white/10 rounded-2xl p-10 text-center space-y-4">
          <Clock className="w-10 h-10 text-zinc-500 mx-auto" />
          <h2 className="text-lg font-bold text-white">No Order Found Matching &ldquo;{searchInput}&rdquo;</h2>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Please check the Order ID entered. If you placed an order in this browser session, it should appear in your order history.
          </p>
          {orders.length > 0 && (
            <div className="pt-2">
              <span className="text-xs text-zinc-400 mr-2">Your recent orders:</span>
              {orders.map(o => (
                <button
                  key={o.id}
                  onClick={() => {
                    setSearchInput(o.id);
                    setSearchedOrder(o);
                  }}
                  className="text-xs font-mono font-bold text-[#F5C76A] underline mr-3"
                >
                  {o.id}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </main>
  );
};
