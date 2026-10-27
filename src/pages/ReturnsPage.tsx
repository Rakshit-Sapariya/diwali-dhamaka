import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { RotateCcw } from 'lucide-react';

export const ReturnsPage: React.FC = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24">
      <Breadcrumbs items={[{ label: 'Returns & Refunds' }]} />

      <div className="space-y-8 my-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <RotateCcw className="w-7 h-7 text-[#F5C76A]" />
            Returns & Refund Policy
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            7-Day Festive Satisfaction Guarantee &bull; Draft for Business Review
          </p>
        </div>

        <section className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <div className="p-4 rounded-xl bg-[#141419] border border-white/5 space-y-2">
            <h2 className="font-bold text-white text-sm">7-Day Hassle-Free Returns Window</h2>
            <p>
              We want you to celebrate Diwali with complete confidence. If any item arrives damaged, defective, or does not match its catalog description, you may initiate a return within 7 calendar days of delivery.
            </p>
          </div>

          <h3 className="text-sm font-bold text-white pt-2">Eligible Conditions:</h3>
          <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
            <li>Product must have original brand tags, seals, and festive packaging intact.</li>
            <li>For electronics (e.g. headphones, smartwatches), all cables, accessories, and user manuals must be returned.</li>
            <li>Ethnic wear must be unworn and unwashed.</li>
            <li>Perishable sweets and opened ghee wicks cannot be returned due to hygiene and food safety guidelines.</li>
          </ul>

          <h3 className="text-sm font-bold text-white pt-2">Refund Processing:</h3>
          <p>
            Upon receipt and quality inspection at our fulfillment hub, refunds are issued within 24–48 hours to the original simulated payment method.
          </p>
        </section>
      </div>
    </main>
  );
};
