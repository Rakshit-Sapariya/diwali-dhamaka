import React, { useState } from 'react';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { QuickViewModal } from '../components/product/QuickViewModal';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Product } from '../types';
import { SparkleIcon } from '../components/common/DiyaMotif';
import { calculateDiscount } from '../utils/currency';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CategoryPageProps {
  slug: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ slug }) => {
  const [sortBy, setSortBy] = useState<string>('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const category = CATEGORIES.find(c => c.slug === slug);

  if (!category) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-2">Category Not Found</h1>
        <p className="text-zinc-400 text-sm mb-6">
          The festive category you are looking for does not exist or has been moved.
        </p>
        <a
          href="#/shop"
          className="inline-flex items-center gap-2 bg-[#F5C76A] text-[#09090B] font-bold px-6 py-2.5 rounded-xl text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Shop
        </a>
      </main>
    );
  }

  // Filter products by category
  let categoryProducts = PRODUCTS.filter(p => p.category === slug);

  // Apply sorting
  if (sortBy === 'price-low') {
    categoryProducts.sort((a, b) => a.sellingPrice - b.sellingPrice);
  } else if (sortBy === 'price-high') {
    categoryProducts.sort((a, b) => b.sellingPrice - a.sellingPrice);
  } else if (sortBy === 'rating') {
    categoryProducts.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'discount') {
    categoryProducts.sort((a, b) => {
      const discA = calculateDiscount(a.originalPrice, a.sellingPrice);
      const discB = calculateDiscount(b.originalPrice, b.sellingPrice);
      return discB - discA;
    });
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-20">
      <Breadcrumbs
        items={[
          { label: 'Shop', href: '#/shop' },
          { label: category.name },
        ]}
      />

      {/* Hero Category Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#141419] p-6 sm:p-10 my-4 shadow-2xl">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src={category.image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141419] via-[#141419]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5C76A]/10 border border-[#F5C76A]/30 text-xs font-semibold text-[#F5C76A] uppercase tracking-wider">
            <SparkleIcon className="w-3.5 h-3.5" />
            <span>Festive Showcase</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {category.name}
          </h1>
          <p className="text-[#FF7A18] font-medium text-sm sm:text-base">
            {category.tagline}
          </p>
          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      {/* Bar: Product Count & Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-white/10 mb-6">
        <div className="text-xs sm:text-sm text-zinc-400">
          Showing <span className="font-bold text-white">{categoryProducts.length}</span> products in {category.name}
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-xs text-zinc-400">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-[#121216] border border-white/10 text-zinc-200 text-xs sm:text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-[#F5C76A]"
          >
            <option value="featured">Featured Deals</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="discount">Highest Discount</option>
            <option value="rating">Top Customer Rated</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {categoryProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={p => setQuickViewProduct(p)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#121216] border border-white/10 rounded-2xl p-12 text-center space-y-4">
          <h2 className="text-lg font-bold text-white">No items in this category yet</h2>
          <p className="text-zinc-400 text-xs">Fresh festive stock is currently being unpacked.</p>
          <a
            href="#/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F5C76A] hover:underline"
          >
            Explore other festive aisles <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </main>
  );
};
