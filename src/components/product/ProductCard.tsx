import React, { useState } from 'react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { formatINR, calculateDiscount } from '../../utils/currency';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const discountPercent = calculateDiscount(product.originalPrice, product.sellingPrice);
  const isWishlisted = isInWishlist(product.id);
  const isOutOfStock = product.stockStatus === 'out_of_stock' || product.stockQuantity <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 600);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  const fallbackImageUrl = 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&q=80';

  return (
    <article
      className="group relative bg-[#121216] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#F5C76A]/40 hover:shadow-xl hover:shadow-black/60 hover:-translate-y-1"
    >
      {/* Top Media Area */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#1A1A20]">
        <a
          href={`#/product/${product.slug}`}
          className="block w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C76A] relative"
          aria-label={`View details for ${product.name}`}
        >
          <img
            src={imageError ? fallbackImageUrl : product.images[0]}
            alt={product.name}
            loading="lazy"
            decoding="async"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-black/20 opacity-40 group-hover:opacity-10 transition-opacity" />
        </a>

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {discountPercent > 0 && (
            <span className="bg-[#FF2D55] text-white text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-md shadow-md uppercase tracking-wider">
              {discountPercent}% OFF
            </span>
          )}
          {product.badge && (
            <span className="bg-[#121216]/90 backdrop-blur-md text-[#F5C76A] border border-[#F5C76A]/30 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist Button (Always accessible) */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className={`absolute top-2.5 right-2.5 z-10 min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center rounded-full backdrop-blur-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C76A] ${
            isWishlisted
              ? 'bg-[#FF2D55] text-white shadow-md'
              : 'bg-black/60 text-white/80 hover:text-white hover:bg-black/80'
          }`}
        >
          <Heart className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Trigger (Desktop hover) */}
        {onQuickView && (
          <button
            type="button"
            onClick={handleQuickView}
            aria-label={`Quick view of ${product.name}`}
            className="hidden md:flex absolute bottom-3 left-1/2 -translate-x-1/2 z-10 items-center gap-1.5 bg-[#121216]/90 backdrop-blur-md text-zinc-200 hover:text-white border border-white/10 px-3 py-1.5 rounded-xl text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 hover:border-[#F5C76A]/50 active:scale-95 shadow-lg"
          >
            <Eye className="w-3.5 h-3.5 text-[#F5C76A]" />
            <span>Quick View</span>
          </button>
        )}
      </div>

      {/* Card Content */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[#F5C76A] font-medium tracking-wide uppercase text-[10px] sm:text-xs">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 bg-[#1A1A20] px-1.5 py-0.5 rounded text-[11px] font-semibold text-zinc-300">
              <Star className="w-3 h-3 text-[#F5C76A] fill-current" />
              <span>{product.rating}</span>
              <span className="text-zinc-500 hidden sm:inline">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-semibold text-sm sm:text-base text-zinc-100 group-hover:text-[#F5C76A] transition-colors line-clamp-2 leading-snug mb-1">
            <a href={`#/product/${product.slug}`}>
              {product.name}
            </a>
          </h3>

          {/* Short attribute/description */}
          <p className="text-xs text-zinc-400 line-clamp-1 mb-3">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Action Area */}
        <div className="pt-2 border-t border-white/5 mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base sm:text-lg font-bold text-white tracking-tight">
              {formatINR(product.sellingPrice)}
            </span>
            {product.originalPrice > product.sellingPrice && (
              <span className="text-xs sm:text-sm text-zinc-500 line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Add to Cart CTA */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock || isAdding}
            aria-label={isOutOfStock ? `${product.name} is out of stock` : `Add ${product.name} to Cart`}
            className={`w-full min-h-[44px] flex items-center justify-center gap-2 font-semibold text-xs sm:text-sm rounded-xl py-2.5 px-3 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C76A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121216] select-none ${
              isOutOfStock
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-60'
                : isAdding
                ? 'bg-emerald-600 text-white'
                : 'bg-[#1A1A20] text-zinc-100 hover:bg-[#F5C76A] hover:text-[#09090B] border border-white/10 hover:border-[#F5C76A] active:scale-[0.98]'
            }`}
          >
            <ShoppingBag className="w-4 h-4 flex-shrink-0" />
            <span>
              {isOutOfStock ? 'Sold Out' : isAdding ? 'Added to Cart!' : 'Add to Cart'}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
};
