import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/product/ProductCard';
import { QuickViewModal } from '../components/product/QuickViewModal';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Product } from '../types';
import { calculateDiscount } from '../utils/currency';
import { useShop } from '../context/ShopContext';
import { Search, SlidersHorizontal, X, RotateCcw, Check, Star } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { searchQuery, setSearchQuery } = useShop();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [dealsOnly, setDealsOnly] = useState<boolean>(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);

  // Sync search query from URL or context
  useEffect(() => {
    const hash = window.location.hash;
    const queryMatch = hash.match(/search=([^&]*)/);
    if (queryMatch && queryMatch[1]) {
      setSearchQuery(decodeURIComponent(queryMatch[1]));
    }
  }, [setSearchQuery]);

  // Extract unique brands
  const allBrands = useMemo(() => {
    return Array.from(new Set(PRODUCTS.map(p => p.brand))).sort();
  }, []);

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
    setItemsPerPage(8);
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedPriceRange('all');
    setSelectedRating(0);
    setInStockOnly(false);
    setDealsOnly(false);
    setSelectedBrands([]);
    setSearchQuery('');
    setSortBy('featured');
    setItemsPerPage(8);
  };

  // Filter and sort computation
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Price range
    if (selectedPriceRange === 'under-1000') {
      result = result.filter(p => p.sellingPrice < 1000);
    } else if (selectedPriceRange === '1000-2500') {
      result = result.filter(p => p.sellingPrice >= 1000 && p.sellingPrice <= 2500);
    } else if (selectedPriceRange === '2500-5000') {
      result = result.filter(p => p.sellingPrice > 2500 && p.sellingPrice <= 5000);
    } else if (selectedPriceRange === 'above-5000') {
      result = result.filter(p => p.sellingPrice > 5000);
    }

    // Rating
    if (selectedRating > 0) {
      result = result.filter(p => p.rating >= selectedRating);
    }

    // In stock
    if (inStockOnly) {
      result = result.filter(p => p.stockStatus !== 'out_of_stock' && p.stockQuantity > 0);
    }

    // Deals only
    if (dealsOnly) {
      result = result.filter(p => p.originalPrice > p.sellingPrice);
    }

    // Brands
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.sellingPrice - b.sellingPrice);
        break;
      case 'price-high':
        result.sort((a, b) => b.sellingPrice - a.sellingPrice);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        result.sort((a, b) => {
          const discA = calculateDiscount(a.originalPrice, a.sellingPrice);
          const discB = calculateDiscount(b.originalPrice, b.sellingPrice);
          return discB - discA;
        });
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [
    searchQuery,
    selectedCategory,
    selectedPriceRange,
    selectedRating,
    inStockOnly,
    dealsOnly,
    selectedBrands,
    sortBy,
  ]);

  const displayedProducts = filteredProducts.slice(0, itemsPerPage);
  const hasMore = itemsPerPage < filteredProducts.length;

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedPriceRange !== 'all' ? 1 : 0) +
    (selectedRating > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (dealsOnly ? 1 : 0) +
    selectedBrands.length +
    (searchQuery.trim() ? 1 : 0);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-20">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Festive Shop', href: '#/shop' }]} />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4 mt-2">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Diwali Festive Showcase
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Showing <span className="font-bold text-white">{filteredProducts.length}</span> curated festive products
          </p>
        </div>

        {/* Controls: Search, Sort & Mobile Filter Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Inline Search */}
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setItemsPerPage(8);
              }}
              placeholder="Search in shop..."
              className="w-full bg-[#121216] border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#F5C76A]"
            />
          </div>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            aria-label="Sort products by"
            className="bg-[#121216] border border-white/10 text-zinc-200 text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#F5C76A]"
          >
            <option value="featured">Sort by: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="discount">Biggest Discount</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Name: A to Z</option>
          </select>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-[#1A1A20] border border-white/10 text-white text-xs sm:text-sm px-3.5 py-2.5 rounded-xl font-medium"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#F5C76A]" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-[#F5C76A] text-[#09090B] font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-4">
          <span className="text-xs font-semibold text-zinc-400">Active Filters:</span>
          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center gap-1 text-xs bg-[#1A1A20] text-zinc-200 border border-white/10 px-2.5 py-1 rounded-full">
              Category: {CATEGORIES.find(c => c.slug === selectedCategory)?.name || selectedCategory}
              <button onClick={() => setSelectedCategory('all')} aria-label="Remove category filter">
                <X className="w-3 h-3 hover:text-white" />
              </button>
            </span>
          )}
          {selectedPriceRange !== 'all' && (
            <span className="inline-flex items-center gap-1 text-xs bg-[#1A1A20] text-zinc-200 border border-white/10 px-2.5 py-1 rounded-full">
              Price: {selectedPriceRange}
              <button onClick={() => setSelectedPriceRange('all')} aria-label="Remove price filter">
                <X className="w-3 h-3 hover:text-white" />
              </button>
            </span>
          )}
          {selectedRating > 0 && (
            <span className="inline-flex items-center gap-1 text-xs bg-[#1A1A20] text-zinc-200 border border-white/10 px-2.5 py-1 rounded-full">
              {selectedRating}★ & above
              <button onClick={() => setSelectedRating(0)} aria-label="Remove rating filter">
                <X className="w-3 h-3 hover:text-white" />
              </button>
            </span>
          )}
          {inStockOnly && (
            <span className="inline-flex items-center gap-1 text-xs bg-[#1A1A20] text-zinc-200 border border-white/10 px-2.5 py-1 rounded-full">
              In Stock Only
              <button onClick={() => setInStockOnly(false)} aria-label="Remove stock filter">
                <X className="w-3 h-3 hover:text-white" />
              </button>
            </span>
          )}
          {dealsOnly && (
            <span className="inline-flex items-center gap-1 text-xs bg-[#1A1A20] text-zinc-200 border border-white/10 px-2.5 py-1 rounded-full">
              On Sale Only
              <button onClick={() => setDealsOnly(false)} aria-label="Remove deals filter">
                <X className="w-3 h-3 hover:text-white" />
              </button>
            </span>
          )}
          {selectedBrands.map(b => (
            <span key={b} className="inline-flex items-center gap-1 text-xs bg-[#1A1A20] text-zinc-200 border border-white/10 px-2.5 py-1 rounded-full">
              {b}
              <button onClick={() => handleBrandToggle(b)} aria-label={`Remove brand ${b}`}>
                <X className="w-3 h-3 hover:text-white" />
              </button>
            </span>
          ))}
          {searchQuery && (
            <span className="inline-flex items-center gap-1 text-xs bg-[#1A1A20] text-zinc-200 border border-white/10 px-2.5 py-1 rounded-full">
              &ldquo;{searchQuery}&rdquo;
              <button onClick={() => setSearchQuery('')} aria-label="Clear search">
                <X className="w-3 h-3 hover:text-white" />
              </button>
            </span>
          )}
          <button
            onClick={clearAllFilters}
            className="text-xs text-[#FF2D55] hover:underline flex items-center gap-1 font-semibold ml-2"
          >
            <RotateCcw className="w-3 h-3" /> Clear All
          </button>
        </div>
      )}

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6 bg-[#121216] border border-white/10 p-5 rounded-2xl h-fit sticky top-20">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h2 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#F5C76A]" />
              Filter Products
            </h2>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-[#FF7A18] hover:underline"
              >
                Reset
              </button>
            )}
          </div>

          {/* Categories Filter */}
          <div>
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2.5">
              Categories
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-[#F5C76A] text-[#09090B] font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>All Categories</span>
                <span>{PRODUCTS.length}</span>
              </button>
              {CATEGORIES.map(cat => {
                const count = PRODUCTS.filter(p => p.category === cat.slug).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                      selectedCategory === cat.slug
                        ? 'bg-[#F5C76A] text-[#09090B] font-bold'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className="text-[11px] opacity-75">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2.5">
              Price Range
            </h3>
            <div className="space-y-1.5 text-xs text-zinc-300">
              {[
                { label: 'All Prices', val: 'all' },
                { label: 'Under ₹1,000', val: 'under-1000' },
                { label: '₹1,000 to ₹2,500', val: '1000-2500' },
                { label: '₹2,500 to ₹5,000', val: '2500-5000' },
                { label: 'Above ₹5,000', val: 'above-5000' },
              ].map(item => (
                <label key={item.val} className="flex items-center gap-2 cursor-pointer hover:text-white">
                  <input
                    type="radio"
                    name="price"
                    checked={selectedPriceRange === item.val}
                    onChange={() => setSelectedPriceRange(item.val)}
                    className="accent-[#F5C76A]"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2.5">
              Minimum Rating
            </h3>
            <div className="space-y-1.5 text-xs">
              {[4.8, 4.7, 4.5].map(rating => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setSelectedRating(selectedRating === rating ? 0 : rating)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border transition-colors ${
                    selectedRating === rating
                      ? 'border-[#F5C76A] bg-[#F5C76A]/10 text-[#F5C76A]'
                      : 'border-transparent text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-current text-[#F5C76A]" />
                    <span>{rating} Stars & Above</span>
                  </div>
                  {selectedRating === rating && <Check className="w-3.5 h-3.5 text-[#F5C76A]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Toggles */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
              <input
                type="checkbox"
                checked={dealsOnly}
                onChange={e => setDealsOnly(e.target.checked)}
                className="rounded accent-[#F5C76A]"
              />
              <span>Festive Deals & Offers Only</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={e => setInStockOnly(e.target.checked)}
                className="rounded accent-[#F5C76A]"
              />
              <span>In Stock Only</span>
            </label>
          </div>

          {/* Brands Filter */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2.5">
              Brands
            </h3>
            <div className="max-h-40 overflow-y-auto space-y-1.5 text-xs text-zinc-300 pr-1">
              {allBrands.map(brand => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer hover:text-white">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="rounded accent-[#F5C76A]"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <section className="lg:col-span-3">
          {displayedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-6">
                {displayedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={p => setQuickViewProduct(p)}
                  />
                ))}
              </div>

              {/* Load More Pagination */}
              {hasMore && (
                <div className="mt-12 text-center">
                  <button
                    onClick={() => setItemsPerPage(prev => prev + 6)}
                    className="min-h-[44px] px-8 py-3 bg-[#1A1A20] hover:bg-[#F5C76A] text-zinc-100 hover:text-[#09090B] font-bold text-xs sm:text-sm rounded-xl border border-white/10 hover:border-[#F5C76A] transition-all shadow-md active:scale-98"
                  >
                    Load More Festive Products ({filteredProducts.length - displayedProducts.length} Remaining)
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="bg-[#121216] border border-white/10 rounded-2xl p-12 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#1A1A20] flex items-center justify-center text-zinc-400">
                <Search className="w-8 h-8 text-[#F5C76A]" />
              </div>
              <h2 className="text-xl font-bold text-white">No Matching Festive Products Found</h2>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
                We couldn&rsquo;t find products matching your selected filters or search terms. Try clearing some filters or searching for general terms.
              </p>
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center gap-2 bg-[#F5C76A] text-[#09090B] font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl hover:bg-[#FFB547] transition-all"
              >
                <RotateCcw className="w-4 h-4" /> Reset All Filters
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filter Products"
          className="fixed inset-0 z-50 flex lg:hidden bg-black/80 backdrop-blur-sm"
        >
          <div className="w-4/5 max-w-sm bg-[#121216] border-r border-white/10 h-full p-5 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-display font-bold text-white text-base">Filter Products</span>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                aria-label="Close filters"
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Category</div>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full bg-[#1A1A20] border border-white/10 text-white rounded-xl p-2.5 text-xs"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Mobile Price */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Price</div>
              <div className="space-y-1 text-xs text-zinc-300">
                {[
                  { label: 'All Prices', val: 'all' },
                  { label: 'Under ₹1,000', val: 'under-1000' },
                  { label: '₹1,000 to ₹2,500', val: '1000-2500' },
                  { label: '₹2,500 to ₹5,000', val: '2500-5000' },
                  { label: 'Above ₹5,000', val: 'above-5000' },
                ].map(item => (
                  <label key={item.val} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="m-price"
                      checked={selectedPriceRange === item.val}
                      onChange={() => setSelectedPriceRange(item.val)}
                      className="accent-[#F5C76A]"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full bg-[#F5C76A] text-[#09090B] font-bold text-xs py-3 rounded-xl mt-4"
            >
              Apply Filters ({filteredProducts.length} Results)
            </button>
          </div>
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
