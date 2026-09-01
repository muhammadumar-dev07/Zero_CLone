import React, { useState } from 'react';
import { ShoppingBag, User, Menu, X, ShieldCheck } from 'lucide-react';
import { ActiveScreen } from '../types';

interface NavbarProps {
  activeScreen: ActiveScreen;
  setActiveScreen: (screen: ActiveScreen) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeScreen,
  setActiveScreen,
  cartCount,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

  const navLinks: { id: ActiveScreen; label: string }[] = [
    { id: 'collections', label: 'Collections' },
    { id: 'technology', label: 'Technology' },
    { id: 'custom', label: 'Custom' },
    { id: 'story', label: 'Story' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#131313]/85 backdrop-blur-xl border-b border-[#4c4546]/20 shadow-sm transition-all duration-300">
        <div className="flex justify-between items-center px-5 md:px-20 h-20 max-w-[1440px] mx-auto">
          {/* Brand Logo */}
          <button
            onClick={() => setActiveScreen('home')}
            className="font-['Hanken_Grotesk'] text-3xl md:text-[32px] font-semibold tracking-tighter text-[#e5e2e1] hover:opacity-80 transition-opacity flex items-center gap-2 cursor-pointer"
          >
            Zero
            <span className="w-1.5 h-1.5 rounded-full bg-[#4b8eff] shadow-[0_0_8px_rgba(75,142,255,0.8)]"></span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => {
              const isActive = activeScreen === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveScreen(link.id)}
                  className={`font-['Inter'] text-[16px] py-1 cursor-pointer transition-all duration-200 relative ${
                    isActive
                      ? 'text-[#e2e2e2] font-medium'
                      : 'text-[#cfc4c5] hover:text-[#e5e2e1]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c6c6c6] rounded-full animate-fadeIn" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-5">
            <button
              onClick={onOpenCart}
              className="text-[#cfc4c5] hover:text-[#e5e2e1] transition-colors p-2 relative rounded-md hover:bg-[#2a2a2a]/40 cursor-pointer"
              title="View Bag"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#4b8eff] text-[#001a41] text-[10px] font-['JetBrains_Mono'] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setShowAccountModal(true)}
              className="text-[#cfc4c5] hover:text-[#e5e2e1] transition-colors p-2 rounded-md hover:bg-[#2a2a2a]/40 cursor-pointer"
              title="Account & Atelier Member"
              aria-label="User profile"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#cfc4c5] hover:text-[#e5e2e1] p-2 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#131313] border-b border-[#4c4546]/30 px-6 py-6 flex flex-col gap-4 animate-fadeIn">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveScreen(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-lg font-['Inter'] py-2 ${
                  activeScreen === link.id
                    ? 'text-[#4b8eff] font-medium pl-2 border-l-2 border-[#4b8eff]'
                    : 'text-[#cfc4c5]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Atelier Member Dialog */}
      {showAccountModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel p-8 rounded-xl max-w-md w-full border border-white/10 relative shadow-2xl animate-scaleUp">
            <button
              onClick={() => setShowAccountModal(false)}
              className="absolute top-4 right-4 text-[#988e90] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#4b8eff]/10 border border-[#4b8eff]/30 flex items-center justify-center text-[#4b8eff]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-['Hanken_Grotesk'] text-xl font-semibold text-[#e5e2e1]">
                  Zero Concierge & Atelier
                </h3>
                <p className="text-xs font-['JetBrains_Mono'] text-[#988e90]">
                  VERIFIED HOROLOGY MEMBER
                </p>
              </div>
            </div>
            <p className="font-['Inter'] text-sm text-[#cfc4c5] mb-6 leading-relaxed">
              Welcome to the Zero Vault. Access your quantum cryptographic serial certificates, bespoke servicing requests, and priority reservation queue for limited edition titanium runs.
            </p>
            <div className="space-y-3 font-['JetBrains_Mono'] text-xs">
              <div className="flex justify-between p-3 rounded bg-[#1c1b1b] border border-white/5">
                <span className="text-[#988e90]">MEMBER ID</span>
                <span className="text-[#adc6ff]">ZR-8849-01</span>
              </div>
              <div className="flex justify-between p-3 rounded bg-[#1c1b1b] border border-white/5">
                <span className="text-[#988e90]">NEURAL TIER</span>
                <span className="text-[#4b8eff]">Founding Royale</span>
              </div>
              <div className="flex justify-between p-3 rounded bg-[#1c1b1b] border border-white/5">
                <span className="text-[#988e90]">GLOBAL WARRANTY</span>
                <span className="text-[#e5e2e1]">Lifetime Titanium Care</span>
              </div>
            </div>
            <button
              onClick={() => setShowAccountModal(false)}
              className="w-full mt-6 py-3 bg-[#4b8eff] text-[#001a41] font-['JetBrains_Mono'] text-xs font-bold tracking-widest uppercase rounded hover:bg-[#adc6ff] transition-colors"
            >
              Close Vault
            </button>
          </div>
        </div>
      )}
    </>
  );
};
