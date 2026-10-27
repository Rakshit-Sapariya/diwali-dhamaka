import React, { useState } from 'react';
import { DEMO_COUPONS } from '../../data/coupons';
import { useShop } from '../../context/ShopContext';
import { SparkleIcon } from '../common/DiyaMotif';
import { Copy, Check, Ticket } from 'lucide-react';

export const FestiveBanner: React.FC = () => {
  const { showToast } = useShop();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopiedCode(code);
    showToast(`Coupon code "${code}" copied to clipboard! Paste at checkout.`, 'success');
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <section className="py-14 bg-gradient-to-r from-[#141210] via-[#1A1612] to-[#141210] border-y border-[#F5C76A]/20 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#F5C76A_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5C76A]/10 border border-[#F5C76A]/30 text-xs font-bold text-[#F5C76A] uppercase tracking-wider mb-2">
            <Ticket className="w-3.5 h-3.5" />
            <span>Festive Shagun Vouchers</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            Unlock Instant Celebration Savings
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1.5">
            Apply these verified coupon vouchers directly in your cart to multiply your festive discounts.
          </p>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DEMO_COUPONS.slice(0, 3).map(coupon => (
            <div
              key={coupon.code}
              className="relative bg-[#121216] border border-white/10 hover:border-[#F5C76A]/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-black/70"
            >
              {/* Top Notch Cutouts for Ticket Feel */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#FF7A18] bg-[#FF7A18]/10 px-2 py-0.5 rounded border border-[#FF7A18]/20">
                    {coupon.discountType === 'percentage' ? `${coupon.discountValue}% OFF` : `FLAT ₹${coupon.discountValue} OFF`}
                  </span>
                  <h3 className="font-display font-bold text-white text-base mt-2">
                    {coupon.title}
                  </h3>
                </div>
                <SparkleIcon className="w-4 h-4 text-[#F5C76A] flex-shrink-0" />
              </div>

              <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                {coupon.description}
              </p>

              {/* Bottom Voucher Code Bar */}
              <div className="pt-3 border-t border-dashed border-white/10 flex items-center justify-between gap-2">
                <code className="text-sm font-mono font-bold text-[#F5C76A] bg-[#1A1A20] px-3 py-1.5 rounded-lg border border-white/10 tracking-wider">
                  {coupon.code}
                </code>

                <button
                  onClick={() => handleCopy(coupon.code)}
                  className="flex items-center gap-1.5 text-xs font-semibold bg-[#22222B] hover:bg-[#F5C76A] hover:text-[#09090B] text-zinc-200 px-3 py-2 rounded-xl border border-white/10 hover:border-[#F5C76A] transition-all active:scale-95"
                >
                  {copiedCode === coupon.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-zinc-500">
          Demo promotions are automatically calculated and subtracted from your cart subtotal. No account needed.
        </div>

      </div>
    </section>
  );
};
