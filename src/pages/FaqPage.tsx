import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

export const FaqPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const faqs: FAQItem[] = [
    {
      category: 'delivery',
      q: 'Will my Diwali order arrive before Diwali night?',
      a: 'Yes. Orders placed with Express Shipping are prioritized through dedicated festive air cargo channels. Metro deliveries typically arrive within 24 to 48 hours. Enter your 6-digit PIN code on any product page for live route estimates.',
    },
    {
      category: 'delivery',
      q: 'What are the delivery charges?',
      a: 'Orders above ₹999 qualify for 100% Free Express Festive Delivery across India. For orders below ₹999, a nominal flat convenience fee of ₹99 applies.',
    },
    {
      category: 'coupons',
      q: 'How do I use Diwali promo coupons?',
      a: 'Enter code FESTIVE10 for 10% off on cart totals above ₹1,499, or DIWALI15 for 15% off on carts above ₹2,999 in the Coupon field on the Cart page. The system calculates the deduction immediately.',
    },
    {
      category: 'coupons',
      q: 'Can I apply multiple coupons on one order?',
      a: 'To maintain transparent pricing, our coupon engine allows one primary coupon voucher per order. However, coupon discounts stack on top of catalog sale prices!',
    },
    {
      category: 'orders',
      q: 'Is this checkout real or simulated?',
      a: 'This website is currently running in local prototype mode. The checkout process simulates realistic order generation (e.g. DD-2026-XXXX) and saves it to your local browser storage. No real money or bank account information is ever processed.',
    },
    {
      category: 'returns',
      q: 'What is the return policy for festive gifts and brass items?',
      a: 'We offer an easy 7-day festive return policy from the date of delivery. If an item arrives damaged or differs from specifications, you can initiate a hassle-free doorstep return pickup.',
    },
    {
      category: 'products',
      q: 'Are the brass and silver items certified authentic?',
      a: 'Yes! Our pooja coins are 99.9% fine silver with Govt BIS hallmarking. All Moradabad brass urli bowls are cast in heavy bell metal brass treated with tarnish-resistant protective lacquering.',
    },
  ];

  const filteredFaqs = faqs.filter(f => {
    const matchesCat = activeCategory === 'all' || f.category === activeCategory;
    const matchesSearch =
      !searchTerm.trim() ||
      f.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.a.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24">
      <Breadcrumbs items={[{ label: 'Frequently Asked Questions' }]} />

      <div className="text-center max-w-xl mx-auto my-6 space-y-2">
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white flex items-center justify-center gap-2">
          <HelpCircle className="w-7 h-7 text-[#F5C76A]" />
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Find instant answers to common questions regarding Diwali delivery, coupons, and authenticity.
        </p>
      </div>

      {/* Search Input */}
      <div className="max-w-md mx-auto relative mb-6">
        <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search questions (e.g. delivery, coupon)..."
          className="w-full bg-[#121216] border border-white/10 text-white placeholder-zinc-500 rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#F5C76A]"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {[
          { id: 'all', label: 'All Questions' },
          { id: 'delivery', label: 'Delivery & Shipping' },
          { id: 'coupons', label: 'Coupons & Savings' },
          { id: 'orders', label: 'Orders & Demo Mode' },
          { id: 'returns', label: 'Returns & Refunds' },
          { id: 'products', label: 'Product Quality' },
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeCategory === cat.id
                ? 'bg-[#F5C76A] text-[#09090B]'
                : 'bg-[#141419] text-zinc-300 hover:text-white border border-white/10'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Accordion FAQ Items */}
      <div className="space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#121216] border border-white/10 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-semibold text-xs sm:text-sm text-white hover:text-[#F5C76A] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#F5C76A] transition-transform flex-shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center text-zinc-400 text-xs">
            No questions matched your search query. Try typing another term.
          </div>
        )}
      </div>

      <div className="mt-12 p-6 rounded-2xl bg-[#141419] border border-white/10 text-center space-y-2">
        <h3 className="text-white font-bold text-sm">Still have questions?</h3>
        <p className="text-xs text-zinc-400">Our festive customer care desk is available from 9 AM to 9 PM IST.</p>
        <a
          href="#/contact"
          className="inline-block mt-2 text-xs font-bold text-[#F5C76A] hover:underline"
        >
          Contact Support Desk &rarr;
        </a>
      </div>
    </main>
  );
};
