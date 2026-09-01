import React, { useState } from 'react';
import { Globe, Mail, Check, X, Shield, FileText, RefreshCw, HelpCircle, Lock } from 'lucide-react';

interface FooterProps {
  onOpenWhitepaper?: () => void;
  onOpenSpecs?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWhitepaper, onOpenSpecs }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
      setTimeout(() => {
        setNewsletterSubmitted(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  return (
    <>
      <footer className="bg-[#0e0e0e] w-full py-16 border-t border-[#4c4546]/20 transition-all duration-200 mt-auto">
        <div className="max-w-[1440px] mx-auto px-5 md:px-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Brand & Manifesto */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <div className="font-['Hanken_Grotesk'] text-2xl font-medium text-[#e5e2e1] tracking-tighter mb-3">
                Zero
              </div>
              <p className="text-[#cfc4c5] max-w-xs font-['Inter'] text-sm leading-relaxed mb-6">
                Engineered for precision. Designed for eternity. Merging high-fashion luxury with quantum-level neuro-kinetic horology.
              </p>
            </div>

            {/* Newsletter Subscription */}
            <form onSubmit={handleSubscribe} className="space-y-2 mb-6">
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#988e90] tracking-wider uppercase block">
                Privé Dispatch & Priority Allocation
              </span>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="bg-[#1c1b1b] border-b border-[#988e90]/40 focus:border-[#4b8eff] px-3 py-2 text-xs font-['Inter'] text-white placeholder-[#988e90] outline-none flex-grow rounded-none transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2a2a2a] hover:bg-[#4b8eff] hover:text-[#001a41] text-white font-['JetBrains_Mono'] text-xs uppercase tracking-wider transition-colors"
                >
                  {newsletterSubmitted ? <Check className="w-4 h-4 text-emerald-400" /> : 'Join'}
                </button>
              </div>
              {newsletterSubmitted && (
                <p className="text-[11px] font-['JetBrains_Mono'] text-emerald-400">
                  Allocation priority registered. Welcome to the ledger.
                </p>
              )}
            </form>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-8 flex flex-wrap gap-x-12 gap-y-6 md:justify-end items-start font-['JetBrains_Mono'] text-xs tracking-wider uppercase">
            <button
              onClick={() => (onOpenSpecs ? onOpenSpecs() : setActiveModal('specs'))}
              className="text-[#cfc4c5] hover:text-[#c6c6c6] transition-colors text-left py-1"
            >
              Technical Specs
            </button>
            <button
              onClick={() => setActiveModal('warranty')}
              className="text-[#cfc4c5] hover:text-[#c6c6c6] transition-colors text-left py-1"
            >
              Warranty
            </button>
            <button
              onClick={() => setActiveModal('sustainability')}
              className="text-[#cfc4c5] hover:text-[#c6c6c6] transition-colors text-left py-1"
            >
              Sustainability
            </button>
            <button
              onClick={() => setActiveModal('support')}
              className="text-[#cfc4c5] hover:text-[#c6c6c6] transition-colors text-left py-1"
            >
              Support
            </button>
            <button
              onClick={() => setActiveModal('privacy')}
              className="text-[#cfc4c5] hover:text-[#c6c6c6] transition-colors text-left py-1"
            >
              Privacy
            </button>
            {onOpenWhitepaper && (
              <button
                onClick={onOpenWhitepaper}
                className="text-[#4b8eff] hover:text-[#adc6ff] transition-colors text-left py-1"
              >
                Whitepaper
              </button>
            )}
          </div>

          {/* Bottom Copyright & Social Icons */}
          <div className="col-span-1 md:col-span-12 mt-8 pt-8 border-t border-[#4c4546]/15 text-[#988e90] font-['JetBrains_Mono'] text-xs flex flex-col sm:flex-row justify-between items-center gap-4">
            <span>© 2024 Zero Precision Engineering. All Rights Reserved.</span>
            <div className="flex items-center gap-6">
              <a
                href="#global"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveModal('global');
                }}
                className="hover:text-[#e5e2e1] transition-colors p-1"
                title="Global Distribution Hub"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="mailto:concierge@zero-horology.com"
                className="hover:text-[#e5e2e1] transition-colors p-1"
                title="Direct Concierge Channel"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Info Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel p-8 rounded-xl max-w-lg w-full border border-white/10 relative shadow-2xl animate-scaleUp max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-[#988e90] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === 'warranty' && (
              <div>
                <div className="flex items-center gap-3 mb-4 text-[#4b8eff]">
                  <Shield className="w-6 h-6" />
                  <h3 className="font-['Hanken_Grotesk'] text-xl font-semibold text-white">
                    5-Year Titanium Master Warranty
                  </h3>
                </div>
                <p className="text-sm font-['Inter'] text-[#cfc4c5] mb-4 leading-relaxed">
                  Every Zero timepiece is backed by our comprehensive 5-Year Global Master Warranty, covering all mechanical integrity, sapphire crystal sealing, solid-state battery retention (&gt;90%), and neural processor precision.
                </p>
                <ul className="space-y-2 text-xs font-['JetBrains_Mono'] text-[#988e90] list-disc list-inside">
                  <li>Zero-cost accidental bezel & strap replacement once per year</li>
                  <li>Complimentary hermetic pressure recertification at 24 months</li>
                  <li>Direct concierge door-to-door white glove pickup worldwide</li>
                </ul>
              </div>
            )}

            {activeModal === 'sustainability' && (
              <div>
                <div className="flex items-center gap-3 mb-4 text-[#4b8eff]">
                  <RefreshCw className="w-6 h-6" />
                  <h3 className="font-['Hanken_Grotesk'] text-xl font-semibold text-white">
                    Circular Metallurgy & Ethical Sourcing
                  </h3>
                </div>
                <p className="text-sm font-['Inter'] text-[#cfc4c5] mb-4 leading-relaxed">
                  100% of our Grade 5 titanium is sourced from certified aerospace recycling streams. Zero operates on a net-zero carbon foundry standard with fully closed-loop argon-inert melting crucibles.
                </p>
                <div className="p-4 rounded bg-[#1c1b1b] border border-white/5 space-y-2 text-xs font-['JetBrains_Mono']">
                  <div className="flex justify-between">
                    <span className="text-[#988e90]">RECYCLED TITANIUM MATRIX</span>
                    <span className="text-emerald-400">100.0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#988e90]">PACKAGING PLASTIC CONTENT</span>
                    <span className="text-emerald-400">0.0% (Mushroom Mycelium)</span>
                  </div>
                </div>
              </div>
            )}

            {activeModal === 'support' && (
              <div>
                <div className="flex items-center gap-3 mb-4 text-[#4b8eff]">
                  <HelpCircle className="w-6 h-6" />
                  <h3 className="font-['Hanken_Grotesk'] text-xl font-semibold text-white">
                    Zero Concierge & Master Watchmaker Support
                  </h3>
                </div>
                <p className="text-sm font-['Inter'] text-[#cfc4c5] mb-4 leading-relaxed">
                  Our team of horological engineers and biometric software specialists is on standby 24/7 across Geneva, Tokyo, and San Francisco.
                </p>
                <div className="space-y-3 font-['JetBrains_Mono'] text-xs">
                  <div className="p-3 bg-[#1c1b1b] rounded border border-white/5">
                    <span className="text-[#988e90] block mb-1">CONCIERGE HOTLINE</span>
                    <span className="text-white font-medium">+1 (800) 937-ZERO (9376)</span>
                  </div>
                  <div className="p-3 bg-[#1c1b1b] rounded border border-white/5">
                    <span className="text-[#988e90] block mb-1">DIRECT TELEMETRY SUPPORT</span>
                    <span className="text-[#4b8eff]">telemetry@zero-engineering.com</span>
                  </div>
                </div>
              </div>
            )}

            {activeModal === 'privacy' && (
              <div>
                <div className="flex items-center gap-3 mb-4 text-[#4b8eff]">
                  <Lock className="w-6 h-6" />
                  <h3 className="font-['Hanken_Grotesk'] text-xl font-semibold text-white">
                    Zero-Knowledge Biometric Encryption
                  </h3>
                </div>
                <p className="text-sm font-['Inter'] text-[#cfc4c5] mb-4 leading-relaxed">
                  Your neural biometric metrics, cardiovascular waveforms, and location history are processed entirely on-device inside the secure enclave of the Neural Sync™ coprocessor.
                </p>
                <p className="text-xs font-['JetBrains_Mono'] text-[#988e90]">
                  NO BIOMETRIC DATA EVER LEAVES YOUR TIMEPIECE WITHOUT EXPLICIT HARDWARE PASSKEY AUTHORIZATION.
                </p>
              </div>
            )}

            {activeModal === 'global' && (
              <div>
                <div className="flex items-center gap-3 mb-4 text-[#4b8eff]">
                  <Globe className="w-6 h-6" />
                  <h3 className="font-['Hanken_Grotesk'] text-xl font-semibold text-white">
                    Global Boutiques & Atelier Lounges
                  </h3>
                </div>
                <div className="space-y-3 text-xs font-['JetBrains_Mono'] text-[#cfc4c5]">
                  <div className="p-3 bg-[#1c1b1b] rounded">
                    <span className="text-white font-semibold">GENEVA ATELIER</span> — Rue du Rhône 42, 1204 Genève
                  </div>
                  <div className="p-3 bg-[#1c1b1b] rounded">
                    <span className="text-white font-semibold">TOKYO GINZA LOUNGE</span> — 6-10-1 Ginza, Chuo-ku, Tokyo
                  </div>
                  <div className="p-3 bg-[#1c1b1b] rounded">
                    <span className="text-white font-semibold">NEW YORK FIFTH AVE</span> — 712 5th Ave, New York, NY
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setActiveModal(null)}
              className="w-full mt-6 py-3 bg-[#2a2a2a] hover:bg-[#353535] text-white font-['JetBrains_Mono'] text-xs tracking-widest uppercase rounded transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </>
  );
};
