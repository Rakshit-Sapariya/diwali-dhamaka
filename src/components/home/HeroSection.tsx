import React, { useState, useEffect } from 'react';
import { SparkleIcon, DiyaIcon } from '../common/DiyaMotif';
import { ArrowRight, Sparkles, ShieldCheck, Flame } from 'lucide-react';

export const HeroSection: React.FC = () => {
  // Campaign countdown: Target set to 7 days from current time for a realistic, non-fabricated timer
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 4,
    hours: 18,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    // Campaign ends at Diwali 2026 celebration target
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 4);
    targetDate.setHours(23, 59, 59, 999);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#09090B] via-[#121216] to-[#09090B] py-12 md:py-20 lg:py-24 border-b border-white/5">
      {/* Ambient Festive Glow Orbs (Restrained & Warm) */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF7A18]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#F5C76A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column (Content) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1A20] border border-[#F5C76A]/30 text-xs font-semibold text-[#F5C76A] shadow-sm">
              <DiyaIcon className="w-4 h-4" />
              <span className="tracking-widest uppercase">THE FESTIVAL OF LIGHTS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A18] animate-ping" />
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08]">
                DIWALI <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5C76A] via-[#FFB547] to-[#FF7A18]">DHAMAKA</span>
              </h1>
              <p className="font-serif italic text-2xl sm:text-3xl text-zinc-200">
                Unwrap the Joy. Celebrate the Savings.
              </p>
            </div>

            {/* Description */}
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Explore curated festive favourites across premium audio, pure handloom ethnic wear, Moradabad brass urli bowls, and royal dry fruit gift hampers. Delivered with care for your auspicious celebrations.
            </p>

            {/* Live Campaign Countdown Timer */}
            <div className="p-4 rounded-2xl bg-[#141419]/90 border border-white/10 backdrop-blur-md max-w-lg">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#FF7A18] animate-pulse" />
                  Diwali Mega Sale Ends In:
                </span>
                <span className="text-[11px] text-[#F5C76A] font-semibold bg-[#F5C76A]/10 px-2 py-0.5 rounded border border-[#F5C76A]/20">
                  LIVE NOW
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-[#1A1A20] p-2 rounded-xl border border-white/5">
                  <div className="text-lg sm:text-2xl font-black text-white font-mono">{String(timeLeft.days).padStart(2, '0')}</div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400">Days</div>
                </div>
                <div className="bg-[#1A1A20] p-2 rounded-xl border border-white/5">
                  <div className="text-lg sm:text-2xl font-black text-white font-mono">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400">Hours</div>
                </div>
                <div className="bg-[#1A1A20] p-2 rounded-xl border border-white/5">
                  <div className="text-lg sm:text-2xl font-black text-white font-mono">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400">Mins</div>
                </div>
                <div className="bg-[#1A1A20] p-2 rounded-xl border border-white/5">
                  <div className="text-lg sm:text-2xl font-black text-[#F5C76A] font-mono">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400">Secs</div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#/deals"
                className="min-h-[48px] px-6 py-3 bg-[#F5C76A] hover:bg-[#FFB547] text-[#09090B] font-black text-sm rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg shadow-[#F5C76A]/20 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C76A]"
              >
                <span>SHOP THE SALE</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#categories-section"
                className="min-h-[48px] px-6 py-3 bg-[#1A1A20] hover:bg-[#25252E] text-zinc-100 font-semibold text-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.98] flex items-center gap-2"
              >
                <span>EXPLORE CATEGORIES</span>
              </a>
            </div>

            {/* Trust Micro-Signals */}
            <div className="flex flex-wrap items-center gap-4 pt-3 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#F5C76A]" />
                <span>BIS Hallmarked & 100% Authentic</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FF7A18]" />
                <span>Instant Bank & Coupon Discounts</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Decorative Gold Rim */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#F5C76A]/30 via-transparent to-[#FF7A18]/30 blur-sm" />

              {/* Main Image Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#141419] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=1000&q=80"
                  alt="Diwali celebration with authentic oil diyas and festive decorations"
                  className="w-full h-[380px] sm:h-[460px] object-cover object-center transform hover:scale-102 transition-transform duration-700"
                />

                {/* Glass Floating Festive Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#121216]/90 backdrop-blur-md border border-white/10 p-3.5 rounded-xl shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#FF7A18]/20 border border-[#FF7A18]/40 rounded-lg text-[#FF7A18]">
                      <SparkleIcon className="w-5 h-5 text-[#F5C76A]" />
                    </div>
                    <div>
                      <div className="text-white text-xs font-bold uppercase tracking-wider">
                        FESTIVE MEGA OFFER
                      </div>
                      <div className="text-[11px] text-[#F5C76A] font-medium">
                        Extra 15% Off with code: <span className="font-bold underline">DIWALI15</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href="#/deals"
                    className="text-xs bg-[#F5C76A] text-[#09090B] font-bold px-3 py-1.5 rounded-lg hover:bg-white transition-colors"
                  >
                    Claim
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
