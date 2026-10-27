import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { PromoOfferStrip } from '../components/home/PromoOfferStrip';
import { CategoryExplorer } from '../components/home/CategoryExplorer';
import { FeaturedDeals } from '../components/home/FeaturedDeals';
import { FestiveBanner } from '../components/home/FestiveBanner';

export const HomePage: React.FC = () => {
  return (
    <main id="main-content" className="min-h-screen">
      <HeroSection />
      <PromoOfferStrip />
      <FeaturedDeals />
      <CategoryExplorer />
      <FestiveBanner />
    </main>
  );
};
