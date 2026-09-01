import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Check,
  Cpu,
  Battery,
  Droplets,
  Radio,
  Image as ImageIcon,
  ShieldCheck,
  Activity,
  Compass,
  Sparkles,
  Layers,
  X,
  Share2
} from 'lucide-react';
import { WATCH_PRODUCTS } from '../data/products';
import { WatchProduct, CartItem } from '../types';

interface ProductDetailScreenProps {
  watchId: string;
  onBack: () => void;
  onAddToCart: (product: WatchProduct, customization?: CartItem['customization']) => void;
  onOpenSpecs: () => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  watchId,
  onBack,
  onAddToCart,
  onOpenSpecs,
}) => {
  const watch = WATCH_PRODUCTS.find((w) => w.id === watchId) || WATCH_PRODUCTS[0];

  // Customization state
  const [selectedCase, setSelectedCase] = useState('Aerospace Grade 5 Titanium');
  const [selectedStrap, setSelectedStrap] = useState('Titanium Link Bracelet');
  const [accentColor, setAccentColor] = useState('Zero Blue (#4b8eff)');
  const [engravingText, setEngravingText] = useState('');
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  // Live Watch Simulation State
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveHrv, setLiveHrv] = useState(98);
  const [liveAltitude, setLiveAltitude] = useState(14200);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const clockTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const telemetryTimer = setInterval(() => {
      setLiveHrv((prev) => 97 + Math.floor(Math.random() * 3));
      setLiveAltitude((prev) => 14200 + Math.floor(Math.random() * 20 - 10));
    }, 3000);

    return () => {
      clearInterval(clockTimer);
      clearInterval(telemetryTimer);
    };
  }, []);

  const handlePreOrder = () => {
    setAddedAnimation(true);
    onAddToCart(watch, {
      caseFinish: selectedCase,
      strap: selectedStrap,
      accentColor: accentColor,
      engravingText: engravingText || undefined,
    });
    setTimeout(() => setAddedAnimation(false), 2500);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const seconds = currentTime.getSeconds().toString().padStart(2, '0');

  return (
    <div className="w-full flex-grow relative overflow-hidden">
      {/* Back Navigation Bar */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-20 pt-8 pb-4 flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#cfc4c5] hover:text-[#4b8eff] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Collections</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 font-['JetBrains_Mono'] text-xs uppercase text-[#988e90] hover:text-white transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span>{copiedLink ? 'Link Copied' : 'Share Spec'}</span>
        </button>
      </div>

      {/* Main Hero Product Showcase Section (Matching Screen 3) */}
      <section className="relative min-h-[85vh] flex flex-col justify-center px-5 md:px-20 max-w-[1440px] mx-auto overflow-hidden">
        {/* Ambient radial blur glow */}
        <div className="absolute w-[500px] h-[500px] bg-[#4b8eff]/10 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center z-10 py-8">
          {/* Left Column: Product Info & Pre-Order */}
          <div className="md:col-span-6 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="font-['JetBrains_Mono'] text-xs text-[#4b8eff] tracking-widest uppercase font-medium">
                {watch.subtitle}
              </span>
              {watch.badge && (
                <span className="font-['JetBrains_Mono'] text-[10px] uppercase text-[#4b8eff] flex items-center gap-1.5 bg-[#4b8eff]/10 border border-[#4b8eff]/20 px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4b8eff] animate-pulse" />
                  {watch.badge}
                </span>
              )}
            </div>

            <h1 className="font-['Hanken_Grotesk'] text-4xl sm:text-5xl md:text-[68px] font-bold text-gradient leading-[1.1] tracking-tight">
              {watch.name}
            </h1>

            <div className="flex items-baseline gap-4">
              <span className="font-['Hanken_Grotesk'] text-3xl md:text-4xl font-bold text-white">
                ${watch.price.toLocaleString()}
              </span>
              <span className="font-['JetBrains_Mono'] text-xs text-[#988e90]">
                USD • INSURED EXPRESS WORLDWIDE
              </span>
            </div>

            <p className="font-['Inter'] text-base md:text-lg text-[#cfc4c5] max-w-lg leading-relaxed">
              {watch.description}
            </p>

            {/* Interactive Configuration Selectors */}
            <div className="space-y-4 pt-2 border-t border-[#4c4546]/20 max-w-lg">
              {/* Case Finish */}
              <div>
                <span className="font-['JetBrains_Mono'] text-xs text-[#988e90] uppercase tracking-wider block mb-2">
                  Case Architecture
                </span>
                <div className="grid grid-cols-3 gap-2 font-['JetBrains_Mono'] text-xs">
                  {['Aerospace Grade 5 Titanium', 'Stealth DLC Black', 'Polished Platinum'].map((finish) => (
                    <button
                      key={finish}
                      onClick={() => setSelectedCase(finish)}
                      className={`p-2.5 rounded border transition-all text-left text-[11px] ${
                        selectedCase === finish
                          ? 'border-[#4b8eff] bg-[#4b8eff]/10 text-white font-medium shadow-[0_0_10px_rgba(75,142,255,0.2)]'
                          : 'border-white/10 bg-[#1c1b1b] text-[#cfc4c5] hover:border-white/30'
                      }`}
                    >
                      {finish.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Strap Selection */}
              <div>
                <span className="font-['JetBrains_Mono'] text-xs text-[#988e90] uppercase tracking-wider block mb-2">
                  Integrated Band
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-['JetBrains_Mono'] text-xs">
                  {['Titanium Link', 'Fluoroelastomer', 'Carbon Weave', 'Deep Silicone'].map((strap) => (
                    <button
                      key={strap}
                      onClick={() => setSelectedStrap(strap)}
                      className={`p-2 rounded border transition-all text-center text-[10px] ${
                        selectedStrap === strap
                          ? 'border-[#4b8eff] bg-[#4b8eff]/10 text-white font-semibold'
                          : 'border-white/10 bg-[#1c1b1b] text-[#cfc4c5] hover:border-white/30'
                      }`}
                    >
                      {strap}
                    </button>
                  ))}
                </div>
              </div>

              {/* Laser Engraving Optional Text */}
              <div>
                <span className="font-['JetBrains_Mono'] text-xs text-[#988e90] uppercase tracking-wider block mb-1.5">
                  Bespoke Caseback Engraving (Optional)
                </span>
                <input
                  type="text"
                  maxLength={18}
                  placeholder="e.g. A. VANCE • GENEVA 2024"
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
                  className="w-full bg-[#1c1b1b] border border-white/10 rounded px-3 py-2 text-xs font-['JetBrains_Mono'] text-white placeholder-[#988e90] focus:border-[#4b8eff] outline-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <button
                onClick={handlePreOrder}
                className="px-8 py-4 bg-[#4b8eff] text-[#00285c] font-['JetBrains_Mono'] text-xs uppercase font-bold tracking-widest hover:bg-[#adc6ff] transition-all rounded-[2px] shadow-[0_0_30px_rgba(75,142,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4 text-[#00285c]" />
                    <span>Allocated to Bag</span>
                  </>
                ) : (
                  <span>Pre-Order Now</span>
                )}
              </button>

              <button
                onClick={() => setShowGalleryModal(true)}
                className="px-8 py-4 glass-panel text-[#e5e2e1] font-['JetBrains_Mono'] text-xs uppercase font-medium tracking-widest hover:bg-[#353535]/50 transition-colors rounded-[2px] flex items-center justify-center gap-2 cursor-pointer"
              >
                <ImageIcon className="w-4 h-4 text-[#4b8eff]" />
                <span>View Gallery</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual with Real-time Floating Telemetry */}
          <div className="md:col-span-6 relative flex justify-center items-center min-h-[440px] md:min-h-[600px]">
            {/* Watch Centerpiece */}
            <div className="relative z-10 flex flex-col items-center">
              <img
                src={watch.image}
                alt={watch.name}
                className="w-full max-w-md md:max-w-lg object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] hover:scale-105 transition-transform duration-500"
              />

              {/* Interactive Live Watch Face HUD Display under watch */}
              <div className="glass-panel px-6 py-3 rounded-full mt-4 flex items-center gap-6 border border-white/10 shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1] tracking-widest font-bold">
                    {hours}:{minutes}:{seconds}
                  </span>
                </div>
                <div className="h-3 w-px bg-white/20"></div>
                <div className="flex items-center gap-1.5 text-xs font-['JetBrains_Mono'] text-[#4b8eff]">
                  <Activity className="w-3.5 h-3.5" />
                  <span>HRV: {liveHrv}%</span>
                </div>
              </div>
            </div>

            {/* Floating Telemetry Box 1: HRV Sync (Top Left) */}
            <div className="absolute top-6 left-0 md:-left-4 glass-panel p-4 rounded-lg hidden sm:block border border-[#adc6ff]/20 shadow-xl animate-fadeIn">
              <div className="flex items-center gap-2 text-[10px] font-['JetBrains_Mono'] text-[#988e90] uppercase tracking-wider mb-1">
                <Activity className="w-3.5 h-3.5 text-[#4b8eff]" />
                <span>Biometric Coherence</span>
              </div>
              <p className="font-['Hanken_Grotesk'] text-xl font-bold text-white flex items-center gap-2">
                HRV SYNC {liveHrv}%
                <span className="text-xs font-['JetBrains_Mono'] text-emerald-400">+2%</span>
              </p>
            </div>

            {/* Floating Telemetry Box 2: Barometric Altitude (Bottom Right) */}
            <div className="absolute bottom-12 right-0 md:-right-4 glass-panel p-4 rounded-lg hidden sm:block border border-[#adc6ff]/20 shadow-xl animate-fadeIn">
              <div className="flex items-center gap-2 text-[10px] font-['JetBrains_Mono'] text-[#988e90] uppercase tracking-wider mb-1">
                <Compass className="w-3.5 h-3.5 text-[#4b8eff]" />
                <span>Barometric Sensor</span>
              </div>
              <p className="font-['Hanken_Grotesk'] text-xl font-bold text-white">
                ALTITUDE {liveAltitude.toLocaleString()} FT
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Precision Engineered Specs Section (Screen 3 Spec Grid) */}
      <section className="py-24 bg-[#0e0e0e] border-t border-[#4c4546]/20 relative">
        <div className="max-w-[1440px] mx-auto px-5 md:px-20">
          <div className="max-w-2xl mb-16">
            <h2 className="font-['Hanken_Grotesk'] text-3xl md:text-5xl font-bold text-[#e5e2e1] mb-4">
              Precision Engineered.
            </h2>
            <p className="font-['Inter'] text-base md:text-lg text-[#cfc4c5] leading-relaxed">
              Every component is calibrated to the micrometer. The {watch.name} is not just assembled; it is synthesized.
            </p>
          </div>

          {/* 4 Core Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 01. Processor */}
            <div className="glass-panel p-8 rounded-xl border border-white/10 hover:border-[#4b8eff]/40 transition-colors">
              <Cpu className="w-8 h-8 text-[#4b8eff] mb-6" />
              <p className="font-['JetBrains_Mono'] text-xs text-[#988e90] uppercase tracking-wider mb-2">
                01. Processor
              </p>
              <h3 className="font-['Hanken_Grotesk'] text-xl font-semibold text-white mb-2">
                {watch.specs.processor}
              </h3>
              <p className="text-xs font-['Inter'] text-[#cfc4c5] leading-relaxed">
                Processes continuous biological telemetry at 1,000Hz sampling rates with zero thermal dissipation.
              </p>
            </div>

            {/* 02. Battery */}
            <div className="glass-panel p-8 rounded-xl border border-white/10 hover:border-[#4b8eff]/40 transition-colors">
              <Battery className="w-8 h-8 text-[#4b8eff] mb-6" />
              <p className="font-['JetBrains_Mono'] text-xs text-[#988e90] uppercase tracking-wider mb-2">
                02. Battery
              </p>
              <h3 className="font-['Hanken_Grotesk'] text-xl font-semibold text-white mb-2">
                {watch.specs.batteryLife}
              </h3>
              <p className="text-xs font-['Inter'] text-[#cfc4c5] leading-relaxed">
                Solid-state graphene cell technology providing continuous tracking without nightly recharging cycles.
              </p>
            </div>

            {/* 03. Resistance */}
            <div className="glass-panel p-8 rounded-xl border border-white/10 hover:border-[#4b8eff]/40 transition-colors">
              <Droplets className="w-8 h-8 text-[#4b8eff] mb-6" />
              <p className="font-['JetBrains_Mono'] text-xs text-[#988e90] uppercase tracking-wider mb-2">
                03. Resistance
              </p>
              <h3 className="font-['Hanken_Grotesk'] text-xl font-semibold text-white mb-2">
                {watch.specs.waterResistance}
              </h3>
              <p className="text-xs font-['Inter'] text-[#cfc4c5] leading-relaxed">
                Hermetic vacuum sealing tested to 100 atmospheres of hydrostatic deep-sea pressure.
              </p>
            </div>

            {/* 04. Connectivity */}
            <div className="glass-panel p-8 rounded-xl border border-white/10 hover:border-[#4b8eff]/40 transition-colors">
              <Radio className="w-8 h-8 text-[#4b8eff] mb-6" />
              <p className="font-['JetBrains_Mono'] text-xs text-[#988e90] uppercase tracking-wider mb-2">
                04. Connectivity
              </p>
              <h3 className="font-['Hanken_Grotesk'] text-xl font-semibold text-white mb-2">
                {watch.specs.connectivity}
              </h3>
              <p className="text-xs font-['Inter'] text-[#cfc4c5] leading-relaxed">
                Sub-meter satellite positioning with encrypted zero-knowledge biometric sync mesh.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={onOpenSpecs}
              className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4b8eff] hover:text-[#adc6ff] transition-colors underline"
            >
              View Full Technical Spec Matrix →
            </button>
          </div>
        </div>
      </section>

      {/* High-Resolution Gallery Modal */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-2xl animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-[#0e0e0e] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
              <span className="font-['JetBrains_Mono'] text-xs text-white uppercase tracking-widest">
                {watch.name} — High Definition Macro Visuals
              </span>
              <button
                onClick={() => setShowGalleryModal(false)}
                className="text-[#988e90] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 flex items-center justify-center bg-[#080808] min-h-[400px]">
              <img
                src={watch.galleryImages[activeGalleryIndex] || watch.image}
                alt={watch.name}
                className="max-h-[480px] object-contain drop-shadow-[0_0_50px_rgba(75,142,255,0.3)] transition-all duration-300"
              />
            </div>

            {watch.galleryImages.length > 1 && (
              <div className="flex justify-center gap-4 p-4 border-t border-white/10 bg-[#131313]">
                {watch.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveGalleryIndex(idx)}
                    className={`w-16 h-16 rounded border p-1 bg-[#1c1b1b] transition-all ${
                      activeGalleryIndex === idx
                        ? 'border-[#4b8eff] scale-105'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
