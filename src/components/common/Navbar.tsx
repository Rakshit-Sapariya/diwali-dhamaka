import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES } from '../../data/categories';
import { DiyaIcon, SparkleIcon } from './DiyaMotif';
import { Search, Heart, ShoppingBag, Menu, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath }) => {
  const { cartCount, wishlistCount, setIsSearchOpen, setIsMobileNavOpen } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#/' },
    { label: 'Shop', href: '#/shop' },
    { label: 'Deals', href: '#/deals', badge: 'SALE' },
    { label: 'Gifts & Hampers', href: '#/category/gifts-hampers' },
    { label: 'Track Order', href: '#/track-order' },
  ];

  const isActive = (href: string) => {
    if (href === '#/' && (currentPath === '/' || currentPath === '')) return true;
    if (href !== '#/' && currentPath.startsWith(href.replace('#', ''))) return true;
    return false;
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#09090B]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40 py-2.5'
          : 'bg-[#09090B] border-b border-white/5 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: Mobile Menu Toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileNavOpen(true)}
            aria-label="Open mobile navigation menu"
            className="lg:hidden p-2 text-zinc-300 hover:text-white rounded-xl hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C76A]"
          >
            <Menu className="w-6 h-6" />
          </button>

          <a
            href="#/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C76A] rounded-xl px-1"
          >
            <div className="relative flex items-center justify-center p-1.5 rounded-xl bg-gradient-to-br from-[#1E1A16] to-[#141419] border border-[#F5C76A]/30 group-hover:border-[#F5C76A] transition-all shadow-sm shadow-[#FF7A18]/20">
              <DiyaIcon className="w-6 h-6 group-hover:scale-105 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-display text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-[#F5C76A] transition-colors">
                <span>DIWALI</span>
                <span className="text-[#FF7A18] font-black">DHAMAKA</span>
                <SparkleIcon className="w-3.5 h-3.5 text-[#F5C76A] hidden sm:inline" />
              </div>
              <p className="hidden md:block text-[10px] tracking-widest uppercase text-[#F5C76A]/80 font-medium -mt-1">
                Festive Shopping Destination
              </p>
            </div>
          </a>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                isActive(link.href)
                  ? 'text-[#F5C76A] bg-[#1A1A20] font-semibold shadow-inner'
                  : 'text-zinc-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="bg-[#FF2D55] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                  {link.badge}
                </span>
              )}
            </a>
          ))}

          {/* Categories Mega Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <button
              onClick={() => setIsMegaMenuOpen(prev => !prev)}
              aria-expanded={isMegaMenuOpen}
              className="px-3.5 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C76A]"
            >
              <span>Categories</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isMegaMenuOpen ? 'rotate-180 text-[#F5C76A]' : ''
                }`}
              />
            </button>

            {isMegaMenuOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[720px] z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="bg-[#121216] border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-xl grid grid-cols-2 gap-3">
                  {CATEGORIES.map(cat => (
                    <a
                      key={cat.id}
                      href={`#/category/${cat.slug}`}
                      onClick={() => setIsMegaMenuOpen(false)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#1A1A20] transition-colors border border-transparent hover:border-white/5 group"
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-12 h-12 rounded-lg object-cover border border-white/10 group-hover:border-[#F5C76A]/40 transition-colors"
                      />
                      <div className="overflow-hidden">
                        <div className="text-sm font-semibold text-white group-hover:text-[#F5C76A] transition-colors truncate">
                          {cat.name}
                        </div>
                        <div className="text-xs text-zinc-400 line-clamp-1">
                          {cat.tagline}
                        </div>
                      </div>
                    </a>
                  ))}
                  <div className="col-span-2 pt-2 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
                    <span>✨ Handpicked Diwali collections with guaranteed doorstep delivery</span>
                    <a
                      href="#/shop"
                      onClick={() => setIsMegaMenuOpen(false)}
                      className="font-semibold text-[#F5C76A] hover:underline"
                    >
                      Explore All Products &rarr;
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right: Search, Wishlist, Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search Diwali products"
            className="flex items-center gap-2 text-zinc-300 hover:text-white bg-[#16161C] hover:bg-[#202028] border border-white/10 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C76A]"
          >
            <Search className="w-4 h-4 text-[#F5C76A]" />
            <span className="hidden sm:inline text-zinc-400">Search products...</span>
            <kbd className="hidden md:inline-block bg-white/10 text-[10px] text-zinc-400 px-1.5 py-0.5 rounded border border-white/10">
              Ctrl+K
            </kbd>
          </button>

          {/* Wishlist Link */}
          <a
            href="#/wishlist"
            aria-label={`Wishlist with ${wishlistCount} items`}
            className="relative p-2.5 text-zinc-300 hover:text-[#F5C76A] hover:bg-white/5 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C76A]"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF2D55] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#09090B]">
                {wishlistCount}
              </span>
            )}
          </a>

          {/* Shopping Cart Link */}
          <a
            href="#/cart"
            aria-label={`Shopping Cart with ${cartCount} items`}
            className="relative flex items-center gap-2 bg-[#F5C76A] text-[#09090B] hover:bg-[#FFB547] active:scale-[0.98] font-bold px-3.5 py-2 rounded-xl text-sm transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C76A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            <span className="bg-[#09090B] text-[#F5C76A] text-xs font-black rounded-full px-2 py-0.5 min-w-[20px] text-center">
              {cartCount}
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};
