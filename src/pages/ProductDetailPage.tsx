import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useShop } from '../context/ShopContext';
import { formatINR, calculateDiscount, calculateSavings } from '../utils/currency';
import {
  Heart,
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  MapPin,
  Share2,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

interface ProductDetailPageProps {
  slug: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug }) => {
  const { addToCart, toggleWishlist, isInWishlist, showToast } = useShop();

  const product = PRODUCTS.find(p => p.slug === slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [pincode, setPincode] = useState('');
  const [deliveryEstimate, setDeliveryEstimate] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  if (!product) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-white mb-3">Product Not Found</h1>
        <p className="text-zinc-400 text-sm mb-6">
          The requested festive item may have been sold out or the link is expired.
        </p>
        <a
          href="#/shop"
          className="inline-flex items-center gap-2 bg-[#F5C76A] text-[#09090B] font-bold px-6 py-3 rounded-xl text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Shop
        </a>
      </main>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const discount = calculateDiscount(product.originalPrice, product.sellingPrice);
  const savings = calculateSavings(product.originalPrice, product.sellingPrice);
  const isOutOfStock = product.stockStatus === 'out_of_stock' || product.stockQuantity <= 0;

  // Related products from same category
  const relatedProducts = PRODUCTS.filter(
    p => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleVariantSelect = (variantName: string, option: string) => {
    setSelectedVariants(prev => ({ ...prev, [variantName]: option }));
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity, selectedVariants);
  };

  const handleCheckDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincode.trim();
    if (!/^\d{6}$/.test(cleanPin)) {
      showToast('Please enter a valid 6-digit Indian PIN code', 'error');
      return;
    }
    // Realistic delivery estimation logic
    const firstDigit = cleanPin.charAt(0);
    if (['1', '2', '4', '5', '6'].includes(firstDigit)) {
      setDeliveryEstimate(`Express Delivery by tomorrow to ${cleanPin} (Guaranteed for Diwali Pooja)`);
    } else {
      setDeliveryEstimate(`Standard Delivery within 2-3 business days to ${cleanPin}`);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      showToast('Product link copied to clipboard!', 'info');
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Shop', href: '#/shop' },
          { label: product.category.replace('-', ' '), href: `#/category/${product.category}` },
          { label: product.name },
        ]}
      />

      {/* Main Product Presentation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-4">
        
        {/* Left Column: Gallery (5 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-[#141419] border border-white/10 relative shadow-2xl">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-[#FF2D55] text-white text-xs font-black px-3 py-1 rounded-md shadow-lg uppercase tracking-wider">
                {discount}% OFF
              </span>
            )}

            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all ${
                isWishlisted
                  ? 'bg-[#FF2D55] text-white'
                  : 'bg-black/60 text-white hover:bg-black/80'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? 'border-[#F5C76A] ring-2 ring-[#F5C76A]/40'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information & Controls (7 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Header Brand & Title */}
          <div>
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-xs font-bold text-[#F5C76A] uppercase tracking-wider">
                {product.brand}
              </span>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{isCopied ? 'Link Copied' : 'Share'}</span>
              </button>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {product.name}
            </h1>

            {/* Rating & Review Counter */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1 bg-[#1A1A20] px-2.5 py-1 rounded-md text-xs font-bold text-white border border-white/5">
                <Star className="w-3.5 h-3.5 text-[#F5C76A] fill-current" />
                <span>{product.rating}</span>
              </div>
              <span className="text-xs text-zinc-400">
                {product.reviewCount} Verified Festive Reviews
              </span>
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Genuine Product
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-[#141419] border border-white/10 space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-black text-white">
                {formatINR(product.sellingPrice)}
              </span>
              {product.originalPrice > product.sellingPrice && (
                <>
                  <span className="text-sm text-zinc-500 line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                  <span className="bg-[#FF2D55] text-white text-xs font-black px-2 py-0.5 rounded">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            {savings > 0 && (
              <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                You save {formatINR(savings)} during Diwali Dhamaka!
              </div>
            )}
            <p className="text-[11px] text-zinc-500">
              Inclusive of all taxes. Free express shipping on orders above ₹999.
            </p>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {product.description}
          </p>

          {/* Variants Selection */}
          {product.variants && product.variants.map(v => (
            <div key={v.name} className="space-y-2">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Select {v.name}: <span className="text-[#F5C76A]">{selectedVariants[v.name] || v.options[0]}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {v.options.map(opt => {
                  const isSelected = (selectedVariants[v.name] || v.options[0]) === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleVariantSelect(v.name, opt)}
                      className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                        isSelected
                          ? 'border-[#F5C76A] bg-[#F5C76A]/10 text-[#F5C76A] shadow-sm'
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

          {/* Purchase Actions: Quantity + Add To Cart + Buy Now */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Quantity</span>
              <div className="flex items-center border border-white/10 rounded-xl bg-[#141419]">
                <button
                  type="button"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-10 h-10 flex items-center justify-center text-zinc-300 hover:text-white"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-white">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(q => Math.min(product.stockQuantity || 10, q + 1))}
                  aria-label="Increase quantity"
                  className="w-10 h-10 flex items-center justify-center text-zinc-300 hover:text-white"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-zinc-500">
                {product.stockQuantity > 0 ? `${product.stockQuantity} units available` : 'Out of stock'}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 min-h-[48px] flex items-center justify-center gap-2 font-black text-sm rounded-xl py-3 px-6 transition-all duration-200 active:scale-[0.98] ${
                  isOutOfStock
                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    : 'bg-[#F5C76A] hover:bg-[#FFB547] text-[#09090B] shadow-lg shadow-[#F5C76A]/20'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isOutOfStock ? 'Sold Out' : 'Add to Festive Cart'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (isOutOfStock) return;
                  addToCart(product, quantity, selectedVariants);
                  window.location.hash = '#/checkout';
                }}
                disabled={isOutOfStock}
                className={`flex-1 min-h-[48px] flex items-center justify-center gap-2 font-black text-sm rounded-xl py-3 px-6 transition-all duration-200 active:scale-[0.98] ${
                  isOutOfStock
                    ? 'bg-zinc-900 text-zinc-600 cursor-not-allowed border border-white/5'
                    : 'bg-[#FF7A18] hover:bg-[#E56605] text-white shadow-lg shadow-[#FF7A18]/20'
                }`}
              >
                <span>Buy Now with 1-Click</span>
              </button>
            </div>
          </div>

          {/* Delivery PIN Code Checker */}
          <div className="p-4 rounded-xl bg-[#121216] border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-300 uppercase">
              <MapPin className="w-4 h-4 text-[#F5C76A]" />
              <span>Check Delivery for Diwali Celebrations</span>
            </div>
            <form onSubmit={handleCheckDelivery} className="flex gap-2">
              <input
                type="text"
                value={pincode}
                onChange={e => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit PIN code (e.g. 110001)"
                className="flex-1 bg-[#1A1A20] border border-white/10 text-white placeholder-zinc-500 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[#F5C76A]"
              />
              <button
                type="submit"
                className="bg-[#1A1A20] hover:bg-white/10 text-white text-xs font-bold px-4 py-2 rounded-xl border border-white/10 transition-colors"
              >
                Check
              </button>
            </form>
            {deliveryEstimate && (
              <p className="text-xs text-emerald-400 font-medium pt-1">
                {deliveryEstimate}
              </p>
            )}
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
            <div className="p-3 bg-[#121216] rounded-xl border border-white/5">
              <Truck className="w-4 h-4 text-[#F5C76A] mx-auto mb-1" />
              <div className="text-[11px] font-semibold text-white">Diwali Express</div>
              <div className="text-[10px] text-zinc-500">Free over ₹999</div>
            </div>
            <div className="p-3 bg-[#121216] rounded-xl border border-white/5">
              <RotateCcw className="w-4 h-4 text-[#F5C76A] mx-auto mb-1" />
              <div className="text-[11px] font-semibold text-white">7 Days Return</div>
              <div className="text-[10px] text-zinc-500">Doorstep pickup</div>
            </div>
            <div className="p-3 bg-[#121216] rounded-xl border border-white/5">
              <ShieldCheck className="w-4 h-4 text-[#F5C76A] mx-auto mb-1" />
              <div className="text-[11px] font-semibold text-white">100% Genuine</div>
              <div className="text-[10px] text-zinc-500">Directly sourced</div>
            </div>
          </div>

        </div>
      </div>

      {/* Specifications & Technical Details */}
      <section className="mt-16 pt-10 border-t border-white/10">
        <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-6">
          Product Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between items-center p-3.5 rounded-xl bg-[#121216] border border-white/5 text-xs sm:text-sm"
            >
              <span className="text-zinc-400 font-medium">{key}</span>
              <span className="text-white font-semibold text-right">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products Carousel / Grid */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 pt-10 border-t border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                Frequently Paired With This
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                More festive selections from the {product.category.replace('-', ' ')} collection
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};
