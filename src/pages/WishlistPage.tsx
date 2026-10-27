import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { formatINR, calculateDiscount } from '../utils/currency';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist, moveWishlistToCart } = useShop();

  const wishlistedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24">
      <Breadcrumbs items={[{ label: 'Saved Wishlist' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4 mt-2">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Heart className="w-6 h-6 text-[#FF2D55] fill-current" />
            Your Festive Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {wishlistedProducts.length} items saved for your Diwali celebrations
          </p>
        </div>

        {wishlistedProducts.length > 0 && (
          <a
            href="#/shop"
            className="text-xs sm:text-sm text-[#F5C76A] hover:underline font-semibold"
          >
            Continue Browsing More Items &rarr;
          </a>
        )}
      </div>

      {wishlistedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-8">
          {wishlistedProducts.map(product => {
            const discount = calculateDiscount(product.originalPrice, product.sellingPrice);
            const isOutOfStock = product.stockStatus === 'out_of_stock';

            return (
              <div
                key={product.id}
                className="bg-[#121216] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#F5C76A]/40 transition-all shadow-lg"
              >
                <div className="relative aspect-square w-full bg-[#1A1A20]">
                  <a href={`#/product/${product.slug}`}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </a>
                  {discount > 0 && (
                    <span className="absolute top-3 left-3 bg-[#FF2D55] text-white text-[10px] font-black px-2 py-0.5 rounded shadow">
                      {discount}% OFF
                    </span>
                  )}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    aria-label={`Remove ${product.name} from wishlist`}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-zinc-300 hover:text-white hover:bg-black/90 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-zinc-400 hover:text-[#FF2D55]" />
                  </button>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-[#F5C76A] uppercase">
                      {product.brand}
                    </span>
                    <h3 className="font-semibold text-sm text-white line-clamp-1 mt-1">
                      <a href={`#/product/${product.slug}`} className="hover:text-[#F5C76A]">
                        {product.name}
                      </a>
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-white/5 mt-4 space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-bold text-white">
                        {formatINR(product.sellingPrice)}
                      </span>
                      {product.originalPrice > product.sellingPrice && (
                        <span className="text-xs text-zinc-500 line-through">
                          {formatINR(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => moveWishlistToCart(product.id)}
                      disabled={isOutOfStock}
                      className={`w-full min-h-[44px] flex items-center justify-center gap-2 font-bold text-xs py-2.5 px-3 rounded-xl transition-all ${
                        isOutOfStock
                          ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                          : 'bg-[#F5C76A] hover:bg-[#FFB547] text-[#09090B] active:scale-[0.98]'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{isOutOfStock ? 'Sold Out' : 'Move to Cart'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-[#121216] border border-white/10 rounded-2xl p-12 sm:p-16 text-center space-y-4 my-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#1A1A20] flex items-center justify-center text-zinc-400">
            <Heart className="w-8 h-8 text-[#FF2D55]" />
          </div>
          <h2 className="text-xl font-bold text-white">Your Wishlist is Empty</h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
            You haven&rsquo;t saved any festive items yet. Browse our curated Diwali collections and tap the heart icon on any product to save it here!
          </p>
          <a
            href="#/shop"
            className="inline-flex items-center gap-2 bg-[#F5C76A] text-[#09090B] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl hover:bg-[#FFB547] transition-all"
          >
            <span>Explore Diwali Sale</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </main>
  );
};
