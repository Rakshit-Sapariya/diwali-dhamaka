import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FileText } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24">
      <Breadcrumbs items={[{ label: 'Terms and Conditions' }]} />

      <div className="space-y-6 my-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <FileText className="w-7 h-7 text-[#F5C76A]" />
            Terms and Conditions
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Diwali Dhamaka Demo Terms of Service &bull; Marked for Legal Counsel Review
          </p>
        </div>

        <section className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <h2 className="text-base font-bold text-white">1. Nature of the Service</h2>
          <p>
            Diwali Dhamaka is an ecommerce shopping platform interface designed for festive product discovery, catalog browsing, shopping cart calculations, and simulated order placement.
          </p>

          <h2 className="text-base font-bold text-white pt-2">2. Pricing & Promotional Offers</h2>
          <p>
            All prices are shown in Indian Rupees (₹). Product discounts, strike-through original prices, and promotional coupons are illustrative demo values. Actual production deployments must validate inventory availability and finalize transaction amounts on a trusted server.
          </p>

          <h2 className="text-base font-bold text-white pt-2">3. Intellectual Property</h2>
          <p>
            All custom vector illustrations, brand marks, and layout architectures are original designs developed for the Diwali Dhamaka campaign.
          </p>
        </section>
      </div>
    </main>
  );
};
