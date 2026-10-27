import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { SparkleIcon } from '../common/DiyaMotif';
import { ArrowUpRight } from 'lucide-react';

export const CategoryExplorer: React.FC = () => {
  return (
    <section id="categories-section" className="py-14 sm:py-20 bg-[#09090B] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#F5C76A] uppercase tracking-widest mb-2">
              <SparkleIcon className="w-3.5 h-3.5" />
              <span>Auspicious Selections</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Explore Festive Categories
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-xl">
              From glowing hand-carved brass diyas to next-gen noise-cancelling headphones, find everything you need to brighten your Diwali.
            </p>
          </div>

          <a
            href="#/shop"
            className="text-xs sm:text-sm font-semibold text-[#F5C76A] hover:text-[#FFB547] inline-flex items-center gap-1 group self-start md:self-auto"
          >
            <span>View All Aisles</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* 8-Card Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {CATEGORIES.map(category => (
            <a
              key={category.id}
              href={`#/category/${category.slug}`}
              className="group relative rounded-2xl overflow-hidden bg-[#121216] border border-white/10 hover:border-[#F5C76A]/40 transition-all duration-300 hover:shadow-xl hover:shadow-black/60 flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C76A]"
            >
              {/* Image Frame */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#1A1A20] relative">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent opacity-80" />
                
                {/* Product Count Pill */}
                {category.itemCount && (
                  <span className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/10">
                    {category.itemCount} Items
                  </span>
                )}
              </div>

              {/* Text Info */}
              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-white group-hover:text-[#F5C76A] transition-colors leading-snug">
                    {category.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#FF7A18] font-medium mt-0.5">
                    {category.tagline}
                  </p>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-1 hidden sm:block">
                    {category.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-zinc-400 group-hover:text-white transition-colors">
                  <span>Browse Category</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#F5C76A] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
