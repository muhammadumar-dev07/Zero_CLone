import React, { useState } from 'react';
import { Sparkles, Check, ShieldCheck, ArrowRight, RefreshCw, Cpu, Layers } from 'lucide-react';
import { WATCH_PRODUCTS } from '../data/products';
import { WatchProduct, CartItem } from '../types';

interface CustomStudioScreenProps {
  onAddToCart: (product: WatchProduct, customization: CartItem['customization']) => void;
  onSelectWatch: (watchId: string) => void;
}

export const CustomStudioScreen: React.FC<CustomStudioScreenProps> = ({
  onAddToCart,
  onSelectWatch,
}) => {
  const [selectedBaseId, setSelectedBaseId] = useState('zero-one');
  const [caseFinish, setCaseFinish] = useState('Aerospace Grade 5 Titanium');
  const [bezelAccent, setBezelAccent] = useState('Electric Zero Blue (#4b8eff)');
  const [strapChoice, setStrapChoice] = useState('Titanium Solid-Link Bracelet');
  const [engravingText, setEngravingText] = useState('A. VANCE • 001');
  const [isAllocating, setIsAllocating] = useState(false);

  const baseWatch = WATCH_PRODUCTS.find((w) => w.id === selectedBaseId) || WATCH_PRODUCTS[0];

  const caseFinishes = [
    { name: 'Aerospace Grade 5 Titanium', upcharge: 0, color: '#c6c6c6' },
    { name: 'Stealth DLC Matte Black', upcharge: 250, color: '#1a1a1a' },
    { name: 'Polished 904L Platinum Sheen', upcharge: 450, color: '#e5e2e1' },
    { name: 'Forged Monolithic Carbon', upcharge: 350, color: '#2a2a2a' },
  ];

  const bezelAccents = [
    { name: 'Electric Zero Blue (#4b8eff)', hex: '#4b8eff' },
    { name: 'Cyber Emerald (#10b981)', hex: '#10b981' },
    { name: 'Solar Amber (#f59e0b)', hex: '#f59e0b' },
    { name: 'Monochrome Silver (#ffffff)', hex: '#ffffff' },
  ];

  const strapChoices = [
    { name: 'Titanium Solid-Link Bracelet', upcharge: 150 },
    { name: 'Fluoroelastomer Tactical Band', upcharge: 0 },
    { name: 'Woven Carbon Fiber Mesh', upcharge: 120 },
    { name: 'Deep Sea Abyss Silicone', upcharge: 80 },
  ];

  const selectedCaseObj = caseFinishes.find((c) => c.name === caseFinish) || caseFinishes[0];
  const selectedStrapObj = strapChoices.find((s) => s.name === strapChoice) || strapChoices[0];

  const totalBespokePrice = baseWatch.price + selectedCaseObj.upcharge + selectedStrapObj.upcharge;

  const handleAddBespoke = () => {
    setIsAllocating(true);
    onAddToCart(
      {
        ...baseWatch,
        name: `Custom ${baseWatch.name}`,
        subtitle: `Bespoke Atelier Commission`,
        price: totalBespokePrice,
      },
      {
        caseFinish: caseFinish,
        strap: strapChoice,
        accentColor: bezelAccent,
        engravingText: engravingText || undefined,
      }
    );
    setTimeout(() => setIsAllocating(false), 2000);
  };

  return (
    <main className="w-full max-w-[1440px] mx-auto px-5 md:px-20 py-12 md:py-16 flex-grow">
      {/* Studio Header */}
      <div className="flex flex-col gap-4 mb-12 max-w-2xl">
        <div className="flex items-center gap-2 text-xs font-['JetBrains_Mono'] text-[#4b8eff] uppercase tracking-widest">
          <Sparkles className="w-4 h-4" />
          <span>Zero Bespoke Atelier Commission</span>
        </div>
        <h1 className="font-['Hanken_Grotesk'] text-4xl sm:text-5xl md:text-[64px] font-bold text-[#e5e2e1] tracking-tight leading-none">
          Custom Studio
        </h1>
        <p className="font-['Inter'] text-base md:text-lg text-[#cfc4c5]">
          Architect your own individual timepiece. Select metallurgy, luminescent dial spectrum, caseback laser inscription, and structural bracelet.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Interactive Visual Preview & Live Engraving Simulation */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center glass-panel p-8 rounded-2xl border border-white/10 relative min-h-[500px] overflow-hidden">
          {/* Accent Aura based on selected color */}
          <div
            className="absolute inset-0 opacity-20 blur-3xl rounded-full transition-colors duration-700"
            style={{
              backgroundColor: bezelAccents.find((b) => b.name === bezelAccent)?.hex || '#4b8eff',
            }}
          />

          {/* Watch Visual */}
          <div className="relative z-10 p-6 flex flex-col items-center">
            <img
              src={baseWatch.image}
              alt={baseWatch.name}
              className="max-h-80 md:max-h-96 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] transition-all duration-500 hover:scale-105"
            />

            {/* Inscribed Caseback Live Badge */}
            {engravingText && (
              <div className="mt-6 px-4 py-2 bg-[#0e0e0e]/80 border border-white/10 rounded-full font-['JetBrains_Mono'] text-xs text-[#e5e2e1] flex items-center gap-2 shadow-lg backdrop-blur-md">
                <span className="text-[#988e90]">CASEBACK:</span>
                <span className="text-[#4b8eff] tracking-widest font-bold">
                  &quot;{engravingText}&quot;
                </span>
              </div>
            )}
          </div>

          {/* Floating Atelier Spec Summary */}
          <div className="absolute top-4 left-4 font-['JetBrains_Mono'] text-[11px] text-[#988e90] space-y-0.5">
            <div>CHASSIS: {caseFinish.split(' ')[0]}</div>
            <div>BEZEL: {bezelAccent.split(' ')[0]}</div>
          </div>
          <div className="absolute top-4 right-4 font-['JetBrains_Mono'] text-[11px] text-[#4b8eff]">
            SERIAL: ZR-BESPOKE-2024
          </div>
        </div>

        {/* Right Column: Customization Controls */}
        <div className="lg:col-span-6 flex flex-col gap-8">
          {/* Step 1: Base Platform */}
          <div>
            <span className="font-['JetBrains_Mono'] text-xs text-[#4b8eff] uppercase tracking-widest block mb-3">
              01. Base Platform
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              {WATCH_PRODUCTS.map((w) => (
                <button
                  key={w.id}
                  onClick={() => setSelectedBaseId(w.id)}
                  className={`p-3 rounded-lg border transition-all text-left ${
                    selectedBaseId === w.id
                      ? 'border-[#4b8eff] bg-[#4b8eff]/10 text-white font-medium shadow-[0_0_15px_rgba(75,142,255,0.2)]'
                      : 'border-white/10 bg-[#1c1b1b] text-[#cfc4c5] hover:border-white/20'
                  }`}
                >
                  <p className="font-['Hanken_Grotesk'] text-sm font-semibold truncate">{w.name}</p>
                  <p className="font-['JetBrains_Mono'] text-[10px] text-[#988e90]">${w.price.toLocaleString()}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Metallurgy & Coating */}
          <div>
            <span className="font-['JetBrains_Mono'] text-xs text-[#4b8eff] uppercase tracking-widest block mb-3">
              02. Case Metallurgy & Finish
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-['JetBrains_Mono'] text-xs">
              {caseFinishes.map((finish) => (
                <button
                  key={finish.name}
                  onClick={() => setCaseFinish(finish.name)}
                  className={`p-3 rounded-lg border transition-all flex justify-between items-center ${
                    caseFinish === finish.name
                      ? 'border-[#4b8eff] bg-[#4b8eff]/10 text-white font-medium'
                      : 'border-white/10 bg-[#1c1b1b] text-[#cfc4c5] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span
                      className="w-3 h-3 rounded-full border border-white/20 shrink-0"
                      style={{ backgroundColor: finish.color }}
                    />
                    <span className="truncate">{finish.name}</span>
                  </div>
                  <span className="text-[#988e90] text-[11px] shrink-0">
                    {finish.upcharge > 0 ? `+$${finish.upcharge}` : 'INCL'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Luminescence / Dial Accent Color */}
          <div>
            <span className="font-['JetBrains_Mono'] text-xs text-[#4b8eff] uppercase tracking-widest block mb-3">
              03. Super-LumiNova® Spectrum
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {bezelAccents.map((acc) => (
                <button
                  key={acc.name}
                  onClick={() => setBezelAccent(acc.name)}
                  className={`p-3 rounded-lg border transition-all flex flex-col items-center gap-2 text-center ${
                    bezelAccent === acc.name
                      ? 'border-[#4b8eff] bg-[#4b8eff]/10 text-white font-medium'
                      : 'border-white/10 bg-[#1c1b1b] text-[#cfc4c5] hover:border-white/20'
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full shadow-md transition-transform"
                    style={{ backgroundColor: acc.hex }}
                  />
                  <span className="font-['JetBrains_Mono'] text-[10px] truncate w-full">
                    {acc.name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Bracelet Selection */}
          <div>
            <span className="font-['JetBrains_Mono'] text-xs text-[#4b8eff] uppercase tracking-widest block mb-3">
              04. Integrated Bracelet
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-['JetBrains_Mono'] text-xs">
              {strapChoices.map((s) => (
                <button
                  key={s.name}
                  onClick={() => setStrapChoice(s.name)}
                  className={`p-3 rounded-lg border transition-all flex justify-between items-center ${
                    strapChoice === s.name
                      ? 'border-[#4b8eff] bg-[#4b8eff]/10 text-white font-medium'
                      : 'border-white/10 bg-[#1c1b1b] text-[#cfc4c5] hover:border-white/20'
                  }`}
                >
                  <span className="truncate">{s.name}</span>
                  <span className="text-[#988e90] text-[11px] shrink-0">
                    {s.upcharge > 0 ? `+$${s.upcharge}` : 'INCL'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 5: Laser Inscription */}
          <div>
            <span className="font-['JetBrains_Mono'] text-xs text-[#4b8eff] uppercase tracking-widest block mb-2">
              05. Caseback Laser Inscription
            </span>
            <input
              type="text"
              maxLength={22}
              value={engravingText}
              onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
              placeholder="ENTER CUSTOM INSCRIPTION"
              className="w-full bg-[#1c1b1b] border border-white/10 rounded px-4 py-3 text-xs font-['JetBrains_Mono'] text-white placeholder-[#988e90] focus:border-[#4b8eff] outline-none"
            />
          </div>

          {/* Price & Allocation Action */}
          <div className="p-6 bg-[#131313] border border-white/10 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#988e90] uppercase block">
                Total Bespoke Valuation
              </span>
              <span className="font-['Hanken_Grotesk'] text-3xl font-bold text-white">
                ${totalBespokePrice.toLocaleString()} USD
              </span>
            </div>

            <button
              onClick={handleAddBespoke}
              className="w-full sm:w-auto px-8 py-4 bg-[#4b8eff] text-[#001a41] hover:bg-[#adc6ff] transition-all font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-widest rounded flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(75,142,255,0.4)]"
            >
              {isAllocating ? (
                <>
                  <Check className="w-4 h-4 text-[#001a41]" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <>
                  <span>Commission Timepiece</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
