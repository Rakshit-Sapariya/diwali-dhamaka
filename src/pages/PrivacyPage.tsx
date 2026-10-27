import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Shield } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <div className="space-y-6 my-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Shield className="w-7 h-7 text-[#F5C76A]" />
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Effective Date: October 2026 &bull; Draft Document for Commercial Review
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#141419] border border-white/5 text-xs text-zinc-400">
          This draft policy describes how user information is handled in this demonstration application. In local demo mode, all cart data, addresses, and orders reside strictly inside your browser&rsquo;s local storage.
        </div>

        <section className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <h2 className="text-base font-bold text-white">1. Information We Collect</h2>
          <p>
            When simulating checkout, we collect name, shipping address, email, and phone number solely to construct your simulated order confirmation receipt and demonstrate tracking workflows.
          </p>

          <h2 className="text-base font-bold text-white pt-2">2. Zero Payment Data Storage</h2>
          <p>
            We do not collect, process, or store genuine bank account numbers, credit card numbers, or CVVs. All payment options are mocked to showcase checkout UX and flow transitions safely.
          </p>

          <h2 className="text-base font-bold text-white pt-2">3. Local Storage</h2>
          <p>
            Your cart items and saved wishlist identifiers are stored using standard HTML5 Web Storage (`localStorage`). You can clear this data anytime by clearing your browser cache or clicking &ldquo;Clear All Items&rdquo;.
          </p>
        </section>
      </div>
    </main>
  );
};
