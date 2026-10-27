import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { formatINR } from '../../utils/currency';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery } = useShop();
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const normalized = searchTerm.trim().toLowerCase();
  const filteredProducts = normalized
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(normalized) ||
        p.brand.toLowerCase().includes(normalized) ||
        p.category.toLowerCase().includes(normalized) ||
        p.description.toLowerCase().includes(normalized) ||
        p.tags.some(t => t.toLowerCase().includes(normalized))
      ).slice(0, 6)
    : [];

  const handleSelectProduct = (slug: string) => {
    setIsSearchOpen(false);
    window.location.hash = `#/product/${slug}`;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setSearchQuery(searchTerm);
    setIsSearchOpen(false);
    window.location.hash = `#/shop?search=${encodeURIComponent(searchTerm)}`;
  };

  const popularSearches = ['Headphones', 'Brass Urli', 'Kurta Set', 'Air Fryer', 'Dry Fruits', 'Diyas'];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Product Search"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="w-full max-w-2xl bg-[#121216] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-white/10 px-4 py-3.5">
          <Search className="w-5 h-5 text-[#F5C76A] mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search festive electronics, ethnic wear, diyas, dry fruits..."
            className="w-full bg-transparent text-white placeholder-zinc-500 text-base focus:outline-none pr-8"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="p-1 text-zinc-400 hover:text-white mr-2"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="text-xs bg-white/10 text-zinc-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-white/10"
          >
            ESC
          </button>
        </form>

        {/* Popular Tags */}
        {!searchTerm && (
          <div className="p-5">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#F5C76A]" />
              Popular Diwali Searches
            </div>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchTerm(tag)}
                  className="text-xs font-medium bg-[#1A1A20] text-zinc-300 hover:text-[#F5C76A] hover:bg-white/5 border border-white/10 px-3 py-1.5 rounded-full transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live Search Results */}
        {searchTerm && (
          <div className="max-h-96 overflow-y-auto divide-y divide-white/5 p-2">
            {filteredProducts.length > 0 ? (
              <>
                <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Matching Festive Products ({filteredProducts.length})
                </div>
                {filteredProducts.map(product => (
                  <button
                    key={product.id}
                    onClick={() => handleSelectProduct(product.slug)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#1A1A20] transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg border border-white/10 bg-zinc-900"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=150&q=80';
                        }}
                      />
                      <div>
                        <div className="text-xs text-[#F5C76A] font-medium">{product.brand}</div>
                        <div className="text-sm font-semibold text-white group-hover:text-[#F5C76A] transition-colors line-clamp-1">
                          {product.name}
                        </div>
                        <div className="text-xs text-zinc-400 capitalize">{product.category.replace('-', ' ')}</div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-3">
                      <div className="text-sm font-bold text-white">{formatINR(product.sellingPrice)}</div>
                      {product.originalPrice > product.sellingPrice && (
                        <div className="text-xs text-zinc-500 line-through">
                          {formatINR(product.originalPrice)}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
                <div className="p-3 text-center">
                  <button
                    onClick={handleSearchSubmit}
                    className="text-xs font-semibold text-[#F5C76A] hover:text-[#FFB547] inline-flex items-center gap-1"
                  >
                    View all matching results in Shop <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="py-12 text-center px-4">
                <p className="text-zinc-400 text-sm">No festive products matched &ldquo;{searchTerm}&rdquo;</p>
                <p className="text-zinc-500 text-xs mt-1">Try searching for generic terms like &lsquo;sweets&rsquo;, &lsquo;lights&rsquo;, or &lsquo;watch&rsquo;.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
