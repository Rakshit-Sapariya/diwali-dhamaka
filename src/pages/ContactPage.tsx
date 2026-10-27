import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24">
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      <div className="text-center max-w-xl mx-auto my-6 space-y-2">
        <h1 className="font-display text-3xl font-extrabold text-white">
          Festive Customer Support
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Have queries regarding bulk corporate Diwali hampers, order tracking, or festive return pickups? Our team is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
        
        {/* Contact Info (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-[#121216] border border-white/10 space-y-4 text-xs">
            <h2 className="font-bold text-white text-sm">Festive Helpdesk</h2>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#F5C76A] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-zinc-400">Email Enquiries</div>
                <div className="font-semibold text-white">support@diwalidhamaka.demo</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#F5C76A] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-zinc-400">Festive Hotline</div>
                <div className="font-semibold text-white">1800-DIWALI-DEMO (Mon–Sat, 9AM–9PM)</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#F5C76A] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-zinc-400">Fulfillment Hub</div>
                <div className="text-zinc-300">Plot 42, Udyog Vihar Phase IV, Gurugram, Haryana 122015</div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#181820] border border-white/5 text-[11px] text-zinc-400 space-y-1">
            <strong className="text-[#F5C76A]">Prototype Note:</strong>
            <p>
              This is a demo store environment. Form submissions simulate handling locally and do not transmit live emails.
            </p>
          </div>
        </div>

        {/* Form (7 cols) */}
        <div className="md:col-span-7">
          <div className="p-6 rounded-2xl bg-[#121216] border border-white/10">
            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Message Received!</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Thank you for reaching out, {formData.name}. In a production release, our festive support agent would respond to {formData.email} within 2 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="text-xs text-[#F5C76A] font-bold hover:underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="font-bold text-white text-sm mb-2">Send us a Message</h2>

                {error && (
                  <div className="p-3 rounded-xl bg-[#FF2D55]/10 border border-[#FF2D55]/30 text-xs text-[#FF2D55] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-zinc-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Priya Iyer"
                    className="w-full bg-[#1A1A20] border border-white/10 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#F5C76A]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-zinc-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. priya@example.com"
                    className="w-full bg-[#1A1A20] border border-white/10 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#F5C76A]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-zinc-300 mb-1">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Inquiry regarding Corporate Hamper Discount"
                    className="w-full bg-[#1A1A20] border border-white/10 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#F5C76A]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-zinc-300 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please specify your query..."
                    className="w-full bg-[#1A1A20] border border-white/10 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#F5C76A]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 bg-[#F5C76A] hover:bg-[#FFB547] text-[#09090B] font-bold text-xs py-2.5 px-4 rounded-xl transition-all active:scale-98 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Demo Message</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </main>
  );
};
