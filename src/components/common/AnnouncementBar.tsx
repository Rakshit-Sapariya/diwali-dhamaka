import React, { useState } from 'react';
import { SparkleIcon } from './DiyaMotif';
import { Tag, Truck, X } from 'lucide-react';

export interface AnnouncementConfig {
  messages: {
    icon: 'sparkle' | 'truck' | 'tag';
    text: string;
    highlight?: string;
    linkHash?: string;
  }[];
}

export const DEFAULT_ANNOUNCEMENTS: AnnouncementConfig = {
  messages: [
    {
      icon: 'sparkle',
      text: 'DIWALI MEGA SALE — Discover Festive Deals Across Every Category',
      highlight: 'UP TO 50% OFF',
      linkHash: '#/deals',
    },
    {
      icon: 'tag',
      text: 'Use Code FESTIVE10 for extra 10% instant discount on orders above ₹1,499',
      highlight: 'CODE: FESTIVE10',
      linkHash: '#/deals',
    },
    {
      icon: 'truck',
      text: 'Guaranteed Express Delivery for Diwali Pooja on orders placed today',
      highlight: 'FREE DELIVERY > ₹999',
      linkHash: '#/shipping',
    },
  ],
};

export const AnnouncementBar: React.FC<{ config?: AnnouncementConfig }> = ({
  config = DEFAULT_ANNOUNCEMENTS,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || !config.messages.length) return null;

  const current = config.messages[currentIndex];

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % config.messages.length);
  };

  return (
    <aside
      aria-label="Festive Announcements"
      className="bg-[#0D0D11] border-b border-white/10 text-xs sm:text-sm py-2 px-3 sm:px-6 relative z-50 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left / Center Message Strip */}
        <div className="flex-1 flex items-center justify-center text-center gap-2 overflow-hidden">
          <span className="text-[#FF7A18] animate-pulse-subtle flex-shrink-0" aria-hidden="true">
            {current.icon === 'truck' ? (
              <Truck className="w-3.5 h-3.5" />
            ) : current.icon === 'tag' ? (
              <Tag className="w-3.5 h-3.5" />
            ) : (
              <SparkleIcon className="w-3.5 h-3.5 text-[#F5C76A]" />
            )}
          </span>

          <a
            href={current.linkHash || '#/deals'}
            className="text-zinc-300 hover:text-white transition-colors truncate tracking-wide font-medium flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F5C76A] rounded px-1"
          >
            <span className="truncate">{current.text}</span>
            {current.highlight && (
              <span className="hidden md:inline-block bg-[#F5C76A]/15 text-[#F5C76A] font-semibold text-[11px] px-2 py-0.5 rounded-full border border-[#F5C76A]/30 flex-shrink-0">
                {current.highlight}
              </span>
            )}
          </a>
        </div>

        {/* Controls: Rotate & Dismiss */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {config.messages.length > 1 && (
            <button
              onClick={handleNext}
              aria-label="Next announcement"
              className="text-zinc-400 hover:text-[#F5C76A] transition-colors p-1 rounded hover:bg-white/5 active:scale-95"
            >
              <span className="text-[11px] font-semibold hidden sm:inline text-zinc-400 hover:text-white">Next Deal &rarr;</span>
              <span className="sm:hidden text-xs">&rarr;</span>
            </button>
          )}

          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss announcement bar"
            className="text-zinc-500 hover:text-zinc-300 transition-colors p-1 rounded hover:bg-white/5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
