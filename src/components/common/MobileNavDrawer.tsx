import React, { useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES } from '../../data/categories';
import { DiyaIcon, SparkleIcon } from './DiyaMotif';
import { X, ShoppingBag, Search, ChevronRight } from 'lucide-react';

interface MobileNavDrawerProps {
  currentPath: string;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({ currentPath }) => {
  const { isMobileNavOpen, setIsMobileNavOpen, cartCount, wishlistCount, setIsSearchOpen } = useShop();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileNavOpen) {
        setIsMobileNavOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileNavOpen, setIsMobileNavOpen]);

  if (!isMobileNavOpen) return null;

  const handleLinkClick = () => {
    setIsMobileNavOpen(false);
  };

  const navLinks = [
    { label: 'Home', href: '#/' },
    { label: 'All Products', href: '#/shop' },
    { label: 'Deals & Offers', href: '#/deals', badge: '50% OFF' },
    { label: 'Saved Wishlist', href: '#/wishlist', count: wishlistCount },
    { label: 'Shopping Cart', href: '#/cart', count: cartCount },
    { label: 'Track Order', href: '#/track-order' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      className="fixed inset-0 z-50 lg:hidden flex"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsMobileNavOpen(false)}
      />

      {/* Drawer Container */}
      <div className="relative w-4/5 max-w-sm bg-[#121216] border-r border-white/10 h-full flex flex-col z-10 shadow-2xl animate-in slide-in-from-left duration-200">
        {/* Drawer Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#1E1A16] border border-[#F5C76A]/40 rounded-lg">
              <DiyaIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-bold text-white text-base">
                DIWALI <span className="text-[#FF7A18]">DHAMAKA</span>
              </div>
              <p className="text-[10px] text-[#F5C76A]">Festive Mega Sale 2026</p>
            </div>
          </div>
          <button
            onClick={() => setIsMobileNavOpen(false)}
            aria-label="Close navigation drawer"
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search quick button */}
        <div className="p-3 border-b border-white/5">
          <button
            onClick={() => {
              setIsMobileNavOpen(false);
              setIsSearchOpen(true);
            }}
            className="w-full flex items-center gap-2.5 bg-[#1A1A20] border border-white/10 text-zinc-400 hover:text-white px-3.5 py-2.5 rounded-xl text-sm"
          >
            <Search className="w-4 h-4 text-[#F5C76A]" />
            <span>Search products & categories...</span>
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Main Links */}
          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2 px-2">
              Menu Navigation
            </div>
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                className={`flex items-center justify-between p-2.5 rounded-xl text-sm font-medium transition-colors ${
                  currentPath === link.href.replace('#', '')
                    ? 'bg-[#1A1A20] text-[#F5C76A] font-semibold'
                    : 'text-zinc-200 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="bg-[#FF2D55] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
                {typeof link.count === 'number' && link.count > 0 && (
                  <span className="bg-[#F5C76A] text-[#09090B] text-xs font-bold px-2 py-0.5 rounded-full">
                    {link.count}
                  </span>
                )}
              </a>
            ))}
          </div>

          {/* Categories List */}
          <div className="space-y-1 pt-2 border-t border-white/10">
            <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2 px-2 flex items-center gap-1.5">
              <SparkleIcon className="w-3 h-3 text-[#F5C76A]" />
              Festive Categories
            </div>
            {CATEGORIES.map(cat => (
              <a
                key={cat.id}
                href={`#/category/${cat.slug}`}
                onClick={handleLinkClick}
                className="flex items-center justify-between p-2 rounded-xl text-xs sm:text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-7 h-7 rounded-md object-cover border border-white/10"
                  />
                  <span>{cat.name}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#F5C76A] transition-colors" />
              </a>
            ))}
          </div>

          {/* Quick Help & Info */}
          <div className="pt-2 border-t border-white/10 space-y-1 text-xs text-zinc-400">
            <a
              href="#/about"
              onClick={handleLinkClick}
              className="block p-2 hover:text-white rounded-lg hover:bg-white/5"
            >
              About Diwali Dhamaka
            </a>
            <a
              href="#/contact"
              onClick={handleLinkClick}
              className="block p-2 hover:text-white rounded-lg hover:bg-white/5"
            >
              Contact Customer Care
            </a>
            <a
              href="#/faq"
              onClick={handleLinkClick}
              className="block p-2 hover:text-white rounded-lg hover:bg-white/5"
            >
              FAQs & Delivery Timelines
            </a>
          </div>
        </div>

        {/* Drawer Footer with Cart CTA */}
        <div className="p-4 border-t border-white/10 bg-[#0E0E12]">
          <a
            href="#/cart"
            onClick={handleLinkClick}
            className="w-full flex items-center justify-center gap-2 bg-[#F5C76A] hover:bg-[#FFB547] text-[#09090B] font-bold py-2.5 px-4 rounded-xl text-sm transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Go to Cart ({cartCount})</span>
          </a>
        </div>
      </div>
    </div>
  );
};
