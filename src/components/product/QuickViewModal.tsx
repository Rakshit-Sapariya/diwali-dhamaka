import React, { useState } from 'react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { formatINR, calculateDiscount, calculateSavings } from '../../utils/currency';
import { X, Heart, ShoppingBag, Star, ArrowRight } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);
  const discount = calculateDiscount(product.originalPrice, product.sellingPrice);
  const savings = calculateSavings(product.originalPrice, product.sellingPrice);
  const isOutOfStock = product.stockStatus === 'out_of_stock';

  const handleVariantSelect = (variantName: string, option: string) => {
    setSelectedVariants(prev => ({ ...prev, [variantName]: option }));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariants);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Quick View: ${product.name}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#121216] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 text-zinc-300 hover:text-white hover:bg-black/90 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="md:w-1/2 p-5 bg-[#17171E] flex flex-col justify-between">
          <div className="aspect-square rounded-xl overflow-hidden bg-black/40 border border-white/5 mb-3">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-[#F5C76A]' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Actions */}
        <div className="md:w-1/2 p-6 overflow-y-auto space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[#F5C76A] font-semibold uppercase">{product.brand}</span>
              <div className="flex items-center gap-1 bg-[#1A1A20] px-2 py-0.5 rounded text-xs font-semibold text-zinc-300">
                <Star className="w-3.5 h-3.5 text-[#F5C76A] fill-current" />
                <span>{product.rating}</span>
                <span className="text-zinc-500">({product.reviewCount} reviews)</span>
              </div>
            </div>
            <h2 className="text-xl font-bold text-white leading-snug">{product.name}</h2>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 p-3 bg-[#1A1A20] rounded-xl border border-white/5">
            <span className="text-2xl font-black text-white">{formatINR(product.sellingPrice)}</span>
            {product.originalPrice > product.sellingPrice && (
              <>
                <span className="text-sm text-zinc-500 line-through">{formatINR(product.originalPrice)}</span>
                <span className="bg-[#FF2D55] text-white text-xs font-black px-2 py-0.5 rounded-md">
                  {discount}% OFF
                </span>
              </>
            )}
            {savings > 0 && (
              <span className="text-xs text-emerald-400 font-semibold ml-auto">
                Save {formatINR(savings)}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {product.description}
          </p>

          {/* Variants */}
          {product.variants && product.variants.map(v => (
            <div key={v.name} className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                {v.name}: <span className="text-white">{selectedVariants[v.name] || v.options[0]}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {v.options.map(opt => {
                  const isSelected = (selectedVariants[v.name] || v.options[0]) === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleVariantSelect(v.name, opt)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                        isSelected
                          ? 'border-[#F5C76A] bg-[#F5C76A]/10 text-[#F5C76A]'
                          : 'border-white/10 text-zinc-300 hover:border-white/30'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-zinc-400 uppercase">Quantity:</span>
            <div className="flex items-center border border-white/10 rounded-xl bg-[#1A1A20]">
              <button
                type="button"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-8 h-8 flex items-center justify-center text-zinc-300 hover:text-white"
              >
                -
              </button>
              <span className="w-10 text-center font-bold text-sm text-white">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(q => Math.min(product.stockQuantity || 10, q + 1))}
                className="w-8 h-8 flex items-center justify-center text-zinc-300 hover:text-white"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex-1 min-h-[44px] flex items-center justify-center gap-2 font-bold text-sm rounded-xl py-3 px-4 transition-all ${
                isOutOfStock
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  : 'bg-[#F5C76A] text-[#09090B] hover:bg-[#FFB547] active:scale-[0.98]'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isOutOfStock ? 'Currently Unavailable' : 'Add to Cart'}</span>
            </button>

            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              className={`p-3 rounded-xl border transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${
                isWishlisted
                  ? 'bg-[#FF2D55] text-white border-[#FF2D55]'
                  : 'border-white/10 text-zinc-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Full Page Link */}
          <div className="pt-2 text-center">
            <a
              href={`#/product/${product.slug}`}
              onClick={onClose}
              className="text-xs text-[#F5C76A] hover:underline inline-flex items-center gap-1 font-semibold"
            >
              View Full Product Specifications & Details <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
