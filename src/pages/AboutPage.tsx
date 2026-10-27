import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { DiyaIcon } from '../components/common/DiyaMotif';
import { ShieldCheck, Heart, Award, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24">
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      <div className="space-y-12 my-6">
        
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5C76A]/10 border border-[#F5C76A]/30 text-xs font-bold text-[#F5C76A] uppercase tracking-wider">
            <DiyaIcon className="w-4 h-4" />
            <span>FESTIVE HERITAGE & MODERN COMMERCE</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Illuminating Indian Celebrations
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-[#F5C76A]">
            &ldquo;Light Up Your Celebrations. Unlock Extraordinary Deals.&rdquo;
          </p>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Diwali Dhamaka was founded on a simple promise: to make Diwali preparation joyful, authentic, and affordable. We bring together Moradabad brass artisans, Varanasi handloom weavers, and tier-1 electronics manufacturers under one festive roof.
          </p>
        </div>

        {/* Visual Banner */}
        <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
          <img
            src="https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=1200&q=80"
            alt="Diwali celebration with oil diyas"
            className="w-full h-64 sm:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent" />
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#121216] border border-white/10 space-y-3">
            <div className="p-3 bg-[#1A1A20] w-fit rounded-xl border border-white/10 text-[#F5C76A]">
              <Award className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-white text-base">Direct Artisan Sourcing</h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every brass urli bowl, terracotta diya, and silk garment is sourced directly from indigenous crafts clusters with zero exploitative markups.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121216] border border-white/10 space-y-3">
            <div className="p-3 bg-[#1A1A20] w-fit rounded-xl border border-white/10 text-[#FF7A18]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-white text-base">Verified Honest Discounts</h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We reject artificial price inflation. All discounts are calculated against verified reference prices with zero hidden conditions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121216] border border-white/10 space-y-3">
            <div className="p-3 bg-[#1A1A20] w-fit rounded-xl border border-white/10 text-[#FF2D55]">
              <Heart className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-white text-base">Festive Care & Speed</h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We know your Diwali pooja cannot wait. Orders are packaged in auspicious gift boxes and dispatched with express priority.
            </p>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="p-6 rounded-2xl bg-[#141419] border border-[#F5C76A]/20 space-y-2 text-xs text-zinc-400">
          <div className="text-[#F5C76A] font-bold text-sm">Transparency & Prototype Notice</div>
          <p>
            This website represents the Diwali Dhamaka concept demonstration. All product details, pricing, reviews, and courier timelines are realistic demo data designed to showcase user journeys, cart mathematics, and design fidelity.
          </p>
        </div>

        <div className="text-center pt-4">
          <a
            href="#/shop"
            className="inline-flex items-center gap-2 bg-[#F5C76A] hover:bg-[#FFB547] text-[#09090B] font-bold text-sm px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-[#F5C76A]/20"
          >
            <span>Explore Our Festive Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </main>
  );
};
