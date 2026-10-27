import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../product/ProductCard';
import { QuickViewModal } from '../product/QuickViewModal';
import { Product } from '../../types';
import { Flame, ArrowRight } from 'lucide-react';

export const FeaturedDeals: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'budget' | 'electronics' | 'decor'>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter deals based on tab
  const deals = PRODUCTS.filter(p => {
    if (activeTab === 'budget') return p.sellingPrice <= 1999;
    if (activeTab === 'electronics') return p.category === 'electronics';
    if (activeTab === 'decor') return p.category === 'home-decor' || p.category === 'essentials';
    return p.featured || p.isDealOfTheDay;
  }).slice(0, 8);

  return (
    <section className="py-14 sm:py-20 bg-[#0C0C10] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#FF7A18] uppercase tracking-widest mb-1.5">
              <Flame className="w-4 h-4 text-[#FF7A18] animate-pulse" />
              <span>Limited-Time Festive Exclusives</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Deals Worth Celebrating
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">
              Discover festive favourites and special prices with verified discounts and same-week delivery.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-[#F5C76A] text-[#09090B] shadow-md'
                  : 'bg-[#1A1A20] text-zinc-300 hover:text-white border border-white/10'
              }`}
            >
              All Featured
            </button>
            <button
              onClick={() => setActiveTab('budget')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'budget'
                  ? 'bg-[#F5C76A] text-[#09090B] shadow-md'
                  : 'bg-[#1A1A20] text-zinc-300 hover:text-white border border-white/10'
              }`}
            >
              Under ₹1,999
            </button>
            <button
              onClick={() => setActiveTab('electronics')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'electronics'
                  ? 'bg-[#F5C76A] text-[#09090B] shadow-md'
                  : 'bg-[#1A1A20] text-zinc-300 hover:text-white border border-white/10'
              }`}
            >
              Tech & Audio
            </button>
            <button
              onClick={() => setActiveTab('decor')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'decor'
                  ? 'bg-[#F5C76A] text-[#09090B] shadow-md'
                  : 'bg-[#1A1A20] text-zinc-300 hover:text-white border border-white/10'
              }`}
            >
              Diyas & Decor
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {deals.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={p => setQuickViewProduct(p)}
            />
          ))}
        </div>

        {/* Bottom CTA to /deals */}
        <div className="mt-12 text-center">
          <a
            href="#/deals"
            className="inline-flex items-center gap-2 bg-[#1A1A20] hover:bg-[#F5C76A] text-zinc-100 hover:text-[#09090B] font-bold text-sm px-6 py-3 rounded-xl border border-white/10 hover:border-[#F5C76A] transition-all duration-200 active:scale-98 shadow-lg shadow-black/40"
          >
            <span>View All Festive Dhamaka Deals</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
};
