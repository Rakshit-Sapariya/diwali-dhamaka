import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { QuickViewModal } from '../components/product/QuickViewModal';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Product } from '../types';
import { calculateDiscount } from '../utils/currency';
import { Flame, Sparkles, Zap, Gift, Tag, Clock } from 'lucide-react';

export const DealsPage: React.FC = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<string>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter products by campaign
  const dealProducts = PRODUCTS.filter(p => {
    // Only discounted products
    const hasDiscount = p.originalPrice > p.sellingPrice;
    if (!hasDiscount) return false;

    if (selectedCampaign === 'mega') {
      return calculateDiscount(p.originalPrice, p.sellingPrice) >= 45;
    }
    if (selectedCampaign === 'budget') {
      return p.sellingPrice <= 1999;
    }
    if (selectedCampaign === 'electronics') {
      return p.category === 'electronics';
    }
    if (selectedCampaign === 'decor') {
      return p.category === 'home-decor' || p.category === 'essentials';
    }
    if (selectedCampaign === 'gifts') {
      return p.category === 'gifts-hampers';
    }
    return true;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24">
      <Breadcrumbs items={[{ label: 'Diwali Deals & Offers' }]} />

      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#18120C] via-[#20180F] to-[#18120C] border border-[#F5C76A]/30 p-6 sm:p-10 my-4 shadow-2xl">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF7A18]/20 border border-[#FF7A18]/40 text-xs font-black text-[#FF7A18] uppercase tracking-wider">
            <Flame className="w-4 h-4 animate-pulse" />
            <span>MEGA FESTIVE CLEARANCE</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Deals of the Festival
          </h1>
          <p className="text-sm sm:text-base text-zinc-300">
            Unbeatable festive discounts on genuine electronics, pure ethnic garments, brass pooja essentials, and gourmet gift hampers. All prices backed by authentic discounts.
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <span className="bg-[#121216] text-[#F5C76A] border border-[#F5C76A]/40 px-3 py-1 rounded-lg font-mono font-bold">
              USE CODE: FESTIVE10 (10% OFF)
            </span>
            <span className="bg-[#121216] text-[#FF7A18] border border-[#FF7A18]/40 px-3 py-1 rounded-lg font-mono font-bold">
              USE CODE: DIWALI15 (15% OFF)
            </span>
          </div>
        </div>
      </div>

      {/* Campaign Nav Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto py-4 border-b border-white/10 scrollbar-none mb-8">
        {[
          { id: 'all', label: 'All Festive Deals', icon: Sparkles },
          { id: 'mega', label: '50% & Mega Discounts', icon: Flame },
          { id: 'budget', label: 'Under ₹1,999 Value Picks', icon: Tag },
          { id: 'electronics', label: 'Audio & Gadgets', icon: Zap },
          { id: 'decor', label: 'Diyas & Home Decor', icon: Gift },
          { id: 'gifts', label: 'Gift Boxes & Silver Coins', icon: Gift },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = selectedCampaign === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedCampaign(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#F5C76A] text-[#09090B] shadow-md'
                  : 'bg-[#121216] text-zinc-300 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Deals Count */}
      <div className="flex items-center justify-between mb-6 text-xs text-zinc-400">
        <span>
          Showing <span className="font-bold text-white">{dealProducts.length}</span> active discounted products
        </span>
        <span className="text-[#F5C76A] font-medium flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" /> Offers expire at the end of the Diwali campaign
        </span>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
        {dealProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={p => setQuickViewProduct(p)}
          />
        ))}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </main>
  );
};
