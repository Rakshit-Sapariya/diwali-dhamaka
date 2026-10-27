import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Truck, Clock, ShieldCheck, MapPin } from 'lucide-react';

export const ShippingPage: React.FC = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24">
      <Breadcrumbs items={[{ label: 'Shipping & Delivery Policy' }]} />

      <div className="space-y-8 my-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Truck className="w-7 h-7 text-[#F5C76A]" />
            Diwali Shipping & Delivery Policy
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Last Updated for Diwali Festive Season 2026 &bull; Draft Policy for Demonstration
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#181820] border border-white/5 text-xs text-zinc-400">
          <strong className="text-[#F5C76A]">Policy Notice:</strong> The terms below are illustrative guidelines for this ecommerce demonstration. For production deployment, connect with your integrated 3PL logistics provider (e.g. Shiprocket, BlueDart, Delhivery).
        </div>

        <section className="space-y-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#F5C76A]" /> 1. Delivery Timelines
          </h2>
          <p>
            We recognize that gifts, diyas, and festive pooja items must reach your doorstep before celebrations commence. Standard delivery across Indian metro regions (Delhi NCR, Mumbai, Bengaluru, Chennai, Hyderabad, Kolkata) takes 1–2 business days. Tier-2 and Tier-3 cities receive delivery within 3–4 business days.
          </p>

          <h2 className="text-base font-bold text-white flex items-center gap-2 pt-4">
            <ShieldCheck className="w-4 h-4 text-[#F5C76A]" /> 2. Festive Free Delivery Threshold
          </h2>
          <p>
            All retail customer orders with a cart subtotal of ₹999 and above receive 100% Free Express Shipping automatically. Orders below ₹999 are charged a nominal shipping and packaging fee of ₹99.
          </p>

          <h2 className="text-base font-bold text-white flex items-center gap-2 pt-4">
            <MapPin className="w-4 h-4 text-[#F5C76A]" /> 3. Fragile Handcrafted Goods Packaging
          </h2>
          <p>
            Artisan brass urlis, fine porcelain lanterns, and terracotta diyas are packed in triple-wall drop-tested corrugated cartons with custom-moulded biodegradable foam cushioning to prevent transit breakages.
          </p>
        </section>
      </div>
    </main>
  );
};
