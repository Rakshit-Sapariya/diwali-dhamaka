import React from 'react';
import { SparkleIcon } from '../common/DiyaMotif';
import { ArrowRight, Zap, Gift, Home, Shirt } from 'lucide-react';

interface PromoCard {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  link: string;
  accent?: string;
  icon: React.ReactNode;
}

export const PromoOfferStrip: React.FC = () => {
  const promos: PromoCard[] = [
    {
      id: 'promo-1',
      title: 'Electronics Fest',
      subtitle: 'Audio, smartwatches & 4K projectors',
      badge: 'UP TO 50% OFF',
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
      link: '#/category/electronics',
      accent: '#FF7A18',
      icon: <Zap className="w-4 h-4 text-[#FF7A18]" />,
    },
    {
      id: 'promo-2',
      title: 'Ethnic Fashion',
      subtitle: 'Chanderi silk kurtas & zari lehengas',
      badge: 'NEW FESTIVE STYLES',
      image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=600&q=80',
      link: '#/category/fashion',
      accent: '#F5C76A',
      icon: <Shirt className="w-4 h-4 text-[#F5C76A]" />,
    },
    {
      id: 'promo-3',
      title: 'Home & Mandir Decor',
      subtitle: 'Moradabad brass urli & alpana diyas',
      badge: 'STARTS ₹499',
      image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=600&q=80',
      link: '#/category/home-decor',
      accent: '#FFB547',
      icon: <Home className="w-4 h-4 text-[#FFB547]" />,
    },
    {
      id: 'promo-4',
      title: 'Gifts Under ₹999',
      subtitle: 'Silver pooja coins & dry fruit hampers',
      badge: 'VALUE SPECIAL',
      image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=600&q=80',
      link: '#/category/gifts-hampers',
      accent: '#FF2D55',
      icon: <Gift className="w-4 h-4 text-[#FF2D55]" />,
    },
  ];

  return (
    <section aria-label="Festive Promotions" className="py-8 sm:py-12 bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {promos.map(item => (
            <a
              key={item.id}
              href={item.link}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#121216] p-5 flex flex-col justify-between hover:border-[#F5C76A]/50 transition-all duration-300 hover:shadow-xl hover:shadow-black/70 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C76A]"
            >
              {/* Background Glow Image with Dark Gradient Overlay */}
              <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-[#121216]/90 to-transparent" />
              </div>

              {/* Top Header Badge */}
              <div className="relative z-10 flex items-center justify-between mb-8">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-white/10 text-white border border-white/10">
                  {item.icon}
                  {item.badge}
                </span>
                <SparkleIcon className="w-3.5 h-3.5 text-[#F5C76A] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Bottom Details */}
              <div className="relative z-10 space-y-1">
                <h3 className="font-display text-lg font-bold text-white group-hover:text-[#F5C76A] transition-colors flex items-center justify-between">
                  <span>{item.title}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-[#F5C76A]" />
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-1">
                  {item.subtitle}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
