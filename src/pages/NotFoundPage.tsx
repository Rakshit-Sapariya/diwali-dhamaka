import React from 'react';
import { DiyaIcon } from '../components/common/DiyaMotif';
import { Home, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <main className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-20 h-20 mx-auto rounded-3xl bg-[#1A1A20] border border-white/10 flex items-center justify-center shadow-xl">
        <DiyaIcon className="w-10 h-10 opacity-70" />
      </div>

      <div className="space-y-2">
        <div className="text-xs font-mono font-bold text-[#F5C76A] tracking-widest uppercase">
          ERROR 404 &bull; PAGE NOT FOUND
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
          This Festive Path Has Not Been Lit
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
          The page or product category you are seeking does not exist or has moved. Return to our main festive aisles to continue exploring our Diwali Mega Sale.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <a
          href="#/"
          className="inline-flex items-center gap-2 bg-[#F5C76A] hover:bg-[#FFB547] text-[#09090B] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-md active:scale-95"
        >
          <Home className="w-4 h-4" /> Return to Home
        </a>
        <a
          href="#/shop"
          className="inline-flex items-center gap-2 bg-[#1A1A20] hover:bg-white/10 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl border border-white/10 transition-all"
        >
          <Search className="w-4 h-4" /> Browse All Products
        </a>
      </div>
    </main>
  );
};
