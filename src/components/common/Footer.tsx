import React from 'react';
import { DiyaIcon, SparkleIcon } from './DiyaMotif';
import { ShieldCheck, Truck, RotateCcw, Award, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#09090B] border-t border-white/10 text-zinc-400 text-sm mt-20 relative overflow-hidden">
      {/* Decorative Golden Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#F5C76A]/50 to-transparent" />

      {/* Trust Highlights Strip */}
      <div className="border-b border-white/5 py-8 bg-[#0D0D11]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#1A1A20] border border-white/10 rounded-xl text-[#F5C76A]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-semibold text-xs sm:text-sm">Diwali Rush Delivery</div>
              <div className="text-[11px] text-zinc-500">Free priority shipping over ₹999</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#1A1A20] border border-white/10 rounded-xl text-[#F5C76A]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-semibold text-xs sm:text-sm">100% Genuine Brands</div>
              <div className="text-[11px] text-zinc-500">Directly sourced festive stock</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#1A1A20] border border-white/10 rounded-xl text-[#F5C76A]">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-semibold text-xs sm:text-sm">7-Day Easy Returns</div>
              <div className="text-[11px] text-zinc-500">Hassle-free festive doorstep pickup</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#1A1A20] border border-white/10 rounded-xl text-[#F5C76A]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-semibold text-xs sm:text-sm">Festive Best Price</div>
              <div className="text-[11px] text-zinc-500">Verified discounts with zero markups</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1 — Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-[#1E1A16] border border-[#F5C76A]/40">
              <DiyaIcon className="w-6 h-6" />
            </div>
            <div className="font-display text-lg font-bold text-white tracking-tight">
              DIWALI <span className="text-[#FF7A18]">DHAMAKA</span>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-zinc-400">
            Light Up Your Celebrations. Unlock Extraordinary Deals. Diwali Dhamaka is India&rsquo;s curated festive shopping showcase uniting traditional craftsmanship with modern technology.
          </p>
          <div className="text-[11px] text-zinc-500 bg-[#121216] p-3 rounded-xl border border-white/5">
            <div className="text-[#F5C76A] font-semibold mb-0.5">Demo Prototype Disclaimer</div>
            This is an interactive concept demo for testing and evaluation. All pricing, coupons, and orders run in local simulated mode.
          </div>
        </div>

        {/* Column 2 — Shop */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-1.5">
            <SparkleIcon className="w-3.5 h-3.5 text-[#F5C76A]" />
            Festive Aisles
          </h3>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#/shop" className="hover:text-[#F5C76A] transition-colors">All Products Catalogue</a>
            </li>
            <li>
              <a href="#/category/electronics" className="hover:text-[#F5C76A] transition-colors">Electronics & Smart Gadgets</a>
            </li>
            <li>
              <a href="#/category/fashion" className="hover:text-[#F5C76A] transition-colors">Festive Ethnic Fashion</a>
            </li>
            <li>
              <a href="#/category/home-decor" className="hover:text-[#F5C76A] transition-colors">Brass Urli, Lamps & Diyas</a>
            </li>
            <li>
              <a href="#/category/gifts-hampers" className="hover:text-[#F5C76A] transition-colors">Royal Dry Fruit Gift Trunks</a>
            </li>
            <li>
              <a href="#/deals" className="hover:text-[#F5C76A] text-[#FF7A18] font-semibold transition-colors">Flash Deals of the Day &rarr;</a>
            </li>
          </ul>
        </div>

        {/* Column 3 — Help & Support */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
            Customer Support
          </h3>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#/track-order" className="hover:text-[#F5C76A] font-medium text-white transition-colors">Track Your Order</a>
            </li>
            <li>
              <a href="#/shipping" className="hover:text-[#F5C76A] transition-colors">Diwali Shipping & Delivery</a>
            </li>
            <li>
              <a href="#/returns" className="hover:text-[#F5C76A] transition-colors">7-Day Return Policy</a>
            </li>
            <li>
              <a href="#/faq" className="hover:text-[#F5C76A] transition-colors">Frequently Asked Questions</a>
            </li>
            <li>
              <a href="#/contact" className="hover:text-[#F5C76A] transition-colors">Contact Support Desk</a>
            </li>
          </ul>
        </div>

        {/* Column 4 — Legal & Company */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
            About & Trust
          </h3>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#/about" className="hover:text-[#F5C76A] transition-colors">About Diwali Dhamaka</a>
            </li>
            <li>
              <a href="#/privacy" className="hover:text-[#F5C76A] transition-colors">Privacy Policy (Draft)</a>
            </li>
            <li>
              <a href="#/terms" className="hover:text-[#F5C76A] transition-colors">Terms of Service (Draft)</a>
            </li>
            <li>
              <a href="#/wishlist" className="hover:text-[#F5C76A] transition-colors">My Festive Wishlist</a>
            </li>
            <li>
              <a href="#/cart" className="hover:text-[#F5C76A] transition-colors">Shopping Cart</a>
            </li>
          </ul>

          <div className="mt-5 pt-4 border-t border-white/5">
            <div className="text-[11px] text-zinc-500 mb-2 font-medium">Simulated Payment Partners</div>
            <div className="flex flex-wrap gap-1.5 text-[10px] font-bold text-zinc-300">
              <span className="px-2 py-1 bg-[#1A1A20] rounded border border-white/10">UPI</span>
              <span className="px-2 py-1 bg-[#1A1A20] rounded border border-white/10">RuPay</span>
              <span className="px-2 py-1 bg-[#1A1A20] rounded border border-white/10">Visa</span>
              <span className="px-2 py-1 bg-[#1A1A20] rounded border border-white/10">NetBanking</span>
              <span className="px-2 py-1 bg-[#1A1A20] rounded border border-white/10">COD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Footer */}
      <div className="border-t border-white/5 py-6 bg-[#060608]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            &copy; {currentYear} Diwali Dhamaka. Designed for India&rsquo;s Grand Festive Celebration.
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#FF2D55] fill-current" />
            <span>for auspicious festive celebrations</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
