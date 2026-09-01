import React, { useState } from 'react';
import { X, Check, Shield, Cpu, Battery, Activity, Compass, Droplet } from 'lucide-react';
import { WATCH_PRODUCTS } from '../data/products';

interface SpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpecsModal: React.FC<SpecsModalProps> = ({ isOpen, onClose }) => {
  const [selectedWatchId, setSelectedWatchId] = useState('zero-one');

  if (!isOpen) return null;

  const currentWatch = WATCH_PRODUCTS.find((w) => w.id === selectedWatchId) || WATCH_PRODUCTS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#131313] border border-[#4c4546]/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-5 border-b border-[#4c4546]/20 bg-[#0e0e0e]">
          <div>
            <h2 className="font-['Hanken_Grotesk'] text-xl font-semibold text-white">
              Zero Master Specification Matrix
            </h2>
            <p className="font-['JetBrains_Mono'] text-xs text-[#988e90]">
              VERIFIED INDUSTRIAL HOROLOGY PARAMETERS
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#988e90] hover:text-white p-1 rounded-md hover:bg-[#2a2a2a] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Model Selector Bar */}
        <div className="flex border-b border-[#4c4546]/20 px-8 bg-[#1c1b1b]/60 gap-3 overflow-x-auto font-['JetBrains_Mono'] text-xs uppercase tracking-wider py-3">
          {WATCH_PRODUCTS.map((w) => (
            <button
              key={w.id}
              onClick={() => setSelectedWatchId(w.id)}
              className={`px-4 py-2 rounded transition-colors whitespace-nowrap ${
                selectedWatchId === w.id
                  ? 'bg-[#4b8eff] text-[#001a41] font-bold'
                  : 'bg-[#2a2a2a]/60 text-[#cfc4c5] hover:bg-[#353535]'
              }`}
            >
              {w.name}
            </button>
          ))}
        </div>

        {/* Specs Content */}
        <div className="p-8 overflow-y-auto space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-8 bg-[#1c1b1b] p-6 rounded-xl border border-white/5">
            <img
              src={currentWatch.image}
              alt={currentWatch.name}
              className="w-36 h-36 object-contain drop-shadow-xl"
            />
            <div className="space-y-2 text-center md:text-left">
              <span className="font-['JetBrains_Mono'] text-xs text-[#4b8eff] uppercase tracking-widest">
                {currentWatch.subtitle}
              </span>
              <h3 className="font-['Hanken_Grotesk'] text-2xl font-bold text-white">
                {currentWatch.name}
              </h3>
              <p className="text-sm font-['Inter'] text-[#cfc4c5] max-w-xl">
                {currentWatch.description}
              </p>
              <div className="font-['JetBrains_Mono'] text-lg text-white font-bold pt-1">
                ${currentWatch.price.toLocaleString()} USD
              </div>
            </div>
          </div>

          {/* Detailed Spec Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-['JetBrains_Mono'] text-xs">
            <div className="p-4 bg-[#1c1b1b]/80 rounded border border-white/5 space-y-1">
              <span className="text-[#988e90] block">CASE CHASSIS</span>
              <span className="text-white font-medium text-sm">{currentWatch.specs.material}</span>
            </div>
            <div className="p-4 bg-[#1c1b1b]/80 rounded border border-white/5 space-y-1">
              <span className="text-[#988e90] block">CRYSTAL & HARDNESS</span>
              <span className="text-white font-medium text-sm">{currentWatch.specs.glass} ({currentWatch.specs.mohsHardness})</span>
            </div>
            <div className="p-4 bg-[#1c1b1b]/80 rounded border border-white/5 space-y-1">
              <span className="text-[#988e90] block">NEURO-PROCESSOR</span>
              <span className="text-white font-medium text-sm">{currentWatch.specs.processor}</span>
            </div>
            <div className="p-4 bg-[#1c1b1b]/80 rounded border border-white/5 space-y-1">
              <span className="text-[#988e90] block">POWER DURATION</span>
              <span className="text-white font-medium text-sm">{currentWatch.specs.batteryLife}</span>
            </div>
            <div className="p-4 bg-[#1c1b1b]/80 rounded border border-white/5 space-y-1">
              <span className="text-[#988e90] block">WATER RESISTANCE DEPTH</span>
              <span className="text-white font-medium text-sm">{currentWatch.specs.waterResistance}</span>
            </div>
            <div className="p-4 bg-[#1c1b1b]/80 rounded border border-white/5 space-y-1">
              <span className="text-[#988e90] block">CONNECTIVITY & MESH</span>
              <span className="text-white font-medium text-sm">{currentWatch.specs.connectivity}</span>
            </div>
            <div className="p-4 bg-[#1c1b1b]/80 rounded border border-white/5 space-y-1">
              <span className="text-[#988e90] block">TOTAL WEIGHT</span>
              <span className="text-white font-medium text-sm">{currentWatch.specs.weight}</span>
            </div>
            <div className="p-4 bg-[#1c1b1b]/80 rounded border border-white/5 space-y-1">
              <span className="text-[#988e90] block">CHARGING RATE</span>
              <span className="text-white font-medium text-sm">{currentWatch.specs.chargingSpeed}</span>
            </div>
          </div>

          {/* Key Features Bullet List */}
          <div className="space-y-2">
            <h4 className="font-['JetBrains_Mono'] text-xs text-[#4b8eff] uppercase tracking-wider">
              Engineered Inclusions:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {currentWatch.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs font-['Inter'] text-[#cfc4c5]">
                  <Check className="w-4 h-4 text-[#4b8eff] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-8 py-4 border-t border-[#4c4546]/20 bg-[#0e0e0e]">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#4b8eff] text-[#001a41] hover:bg-[#adc6ff] transition-colors rounded font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-wider"
          >
            Close Specs
          </button>
        </div>
      </div>
    </div>
  );
};
