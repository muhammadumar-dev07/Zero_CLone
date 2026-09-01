import React, { useState } from 'react';
import { Cpu, Shield, Droplets, Layers, Award, Check, Sparkles, Activity, Clock, Compass } from 'lucide-react';

interface StoryTechnologyScreenProps {
  initialTab?: 'technology' | 'story';
  onExploreProducts: () => void;
  onOpenWhitepaper: () => void;
}

export const StoryTechnologyScreen: React.FC<StoryTechnologyScreenProps> = ({
  initialTab = 'technology',
  onExploreProducts,
  onOpenWhitepaper,
}) => {
  const [activeTab, setActiveTab] = useState<'technology' | 'story'>(initialTab);
  const [pressureAtm, setPressureAtm] = useState(100);
  const [chamberTesting, setChamberTesting] = useState(false);

  const runChamberTest = () => {
    setChamberTesting(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setPressureAtm(p);
      if (p >= 125) {
        clearInterval(interval);
        setTimeout(() => {
          setPressureAtm(100);
          setChamberTesting(false);
        }, 1500);
      }
    }, 150);
  };

  return (
    <main className="w-full max-w-[1440px] mx-auto px-5 md:px-20 py-12 md:py-16 flex-grow">
      {/* Header & Sub-Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-[#4c4546]/20 pb-8">
        <div>
          <span className="font-['JetBrains_Mono'] text-xs text-[#4b8eff] uppercase tracking-widest block mb-2">
            The Zero Engineering Archive
          </span>
          <h1 className="font-['Hanken_Grotesk'] text-4xl sm:text-5xl md:text-[64px] font-bold text-[#e5e2e1] tracking-tight">
            {activeTab === 'technology' ? 'Quantum Horology' : 'The Zero Story'}
          </h1>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-[#1c1b1b] p-1 rounded-lg border border-white/10 font-['JetBrains_Mono'] text-xs uppercase">
          <button
            onClick={() => setActiveTab('technology')}
            className={`px-5 py-2.5 rounded transition-colors ${
              activeTab === 'technology'
                ? 'bg-[#4b8eff] text-[#001a41] font-bold'
                : 'text-[#cfc4c5] hover:text-white'
            }`}
          >
            Technology & Metallurgy
          </button>
          <button
            onClick={() => setActiveTab('story')}
            className={`px-5 py-2.5 rounded transition-colors ${
              activeTab === 'story'
                ? 'bg-[#4b8eff] text-[#001a41] font-bold'
                : 'text-[#cfc4c5] hover:text-white'
            }`}
          >
            Origin & Craftsmanship
          </button>
        </div>
      </div>

      {activeTab === 'technology' ? (
        <div className="space-y-16">
          {/* Section 1: The Neural Sync Architecture */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="w-12 h-12 rounded-xl bg-[#4b8eff]/10 border border-[#4b8eff]/30 flex items-center justify-center text-[#4b8eff]">
                <Cpu className="w-6 h-6" />
              </div>
              <h2 className="font-['Hanken_Grotesk'] text-3xl md:text-4xl font-bold text-white">
                3nm Neuromorphic Coprocessor
              </h2>
              <p className="font-['Inter'] text-base text-[#cfc4c5] leading-relaxed">
                Zero replaces traditional micro-controllers with a customized low-voltage neural processing node. It continuously processes 1,000Hz photoplethysmography and autonomic stress signals entirely on-device, drawing under 1.2 milliwatts.
              </p>
              <div className="grid grid-cols-2 gap-4 font-['JetBrains_Mono'] text-xs">
                <div className="p-3 bg-[#1c1b1b] rounded border border-white/5">
                  <span className="text-[#988e90] block">SAMPLING FREQUENCY</span>
                  <span className="text-white font-bold text-sm">1,000 Hz</span>
                </div>
                <div className="p-3 bg-[#1c1b1b] rounded border border-white/5">
                  <span className="text-[#988e90] block">ENCRYPTED ENCLAVE</span>
                  <span className="text-[#4b8eff] font-bold text-sm">Kyber-1024 AES</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 glass-panel p-8 rounded-2xl border border-white/10 relative overflow-hidden bg-[#0e0e0e]">
              <div className="space-y-4 font-['JetBrains_Mono'] text-xs">
                <div className="flex justify-between border-b border-white/10 pb-2 text-[#4b8eff]">
                  <span>REAL-TIME COPROCESSOR LEDGER</span>
                  <span>ONLINE • ZERO FAULT</span>
                </div>
                <div className="p-3 bg-[#131313] rounded font-mono text-[11px] text-[#adc6ff] space-y-1">
                  <div>&gt; KERNEL: ZERO-RTOS v4.2.0-RELEASE</div>
                  <div>&gt; CORE_0: TIMEKEEPING JITTER &lt; 0.002 PPM</div>
                  <div>&gt; CORE_1: NEURAL TENSOR INFERENCE (0.85 mW)</div>
                  <div>&gt; SECURE_ENCLAVE: HARDWARE LOCKED</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: 100 ATM Hydrostatic Pressure Interactive Simulator */}
          <div className="p-8 md:p-12 glass-panel rounded-2xl border border-white/10 bg-[#0e0e0e] relative">
            <div className="max-w-3xl space-y-4 mb-8">
              <div className="flex items-center gap-2 text-xs font-['JetBrains_Mono'] text-[#4b8eff] uppercase">
                <Droplets className="w-4 h-4" />
                <span>Hermetic Deep Sea Simulation</span>
              </div>
              <h2 className="font-['Hanken_Grotesk'] text-3xl font-bold text-white">
                100 ATM Pressure Hermetic Sealing
              </h2>
              <p className="font-['Inter'] text-sm text-[#cfc4c5] leading-relaxed">
                Tested to 1,000 meters of hydrostatic ocean depth. Watch the chamber gauge validate structural integrity with zero sapphire deflection.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="p-6 bg-[#131313] rounded-xl border border-white/5 text-center">
                <span className="text-xs font-['JetBrains_Mono'] text-[#988e90] block mb-1">
                  CHAMBER OVERPRESSURE
                </span>
                <span className="font-['Hanken_Grotesk'] text-4xl font-bold text-white">
                  {pressureAtm} ATM
                </span>
                <span className="text-[10px] font-['JetBrains_Mono'] text-[#4b8eff] block mt-1">
                  {(pressureAtm * 10).toLocaleString()} METERS EQUIVALENT
                </span>
              </div>

              <div className="p-6 bg-[#131313] rounded-xl border border-white/5 text-center">
                <span className="text-xs font-['JetBrains_Mono'] text-[#988e90] block mb-1">
                  SAPPHIRE DEFLECTION
                </span>
                <span className="font-['Hanken_Grotesk'] text-4xl font-bold text-emerald-400">
                  0.00 μm
                </span>
                <span className="text-[10px] font-['JetBrains_Mono'] text-emerald-400 block mt-1">
                  PASS: ZERO VAPOR INTRUSION
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={runChamberTest}
                  disabled={chamberTesting}
                  className="w-full py-4 bg-[#4b8eff] text-[#001a41] hover:bg-[#adc6ff] font-['JetBrains_Mono'] text-xs font-bold uppercase rounded tracking-widest disabled:opacity-50 transition-colors cursor-pointer"
                >
                  {chamberTesting ? 'Testing 125% Overpressure...' : 'Run Hydrostatic Test'}
                </button>
                <button
                  onClick={onOpenWhitepaper}
                  className="w-full py-3 glass-panel text-white font-['JetBrains_Mono'] text-xs uppercase rounded hover:bg-white/10 transition-colors"
                >
                  Read Whitepaper
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* The Zero Story Section */
        <div className="space-y-16 max-w-4xl mx-auto">
          <div className="space-y-6">
            <h2 className="font-['Hanken_Grotesk'] text-3xl md:text-4xl font-bold text-white">
              Born from Aerospace Engineering & Haute Horology
            </h2>
            <p className="font-['Inter'] text-base md:text-lg text-[#cfc4c5] leading-relaxed">
              Founded by aerospace metallurgists and master watchmakers from Geneva and Silicon Valley, Zero was created with a single uncompromising mission: to build a timepiece that transcends the temporary lifecycle of consumer electronics.
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-8 border-l-2 border-[#4b8eff]/30 pl-8 ml-4 font-['Inter']">
            <div className="relative">
              <span className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-[#4b8eff] border-4 border-[#131313]" />
              <span className="font-['JetBrains_Mono'] text-xs text-[#4b8eff] uppercase font-bold">2020 • THE INCEPTION</span>
              <h3 className="font-['Hanken_Grotesk'] text-xl font-semibold text-white mt-1 mb-2">Molecular Titanium Forging</h3>
              <p className="text-sm text-[#cfc4c5]">Development of our proprietary 14-stage 5-axis CNC machining sequence for Ti-6Al-4V Grade 5 alloys.</p>
            </div>

            <div className="relative">
              <span className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-[#4b8eff] border-4 border-[#131313]" />
              <span className="font-['JetBrains_Mono'] text-xs text-[#4b8eff] uppercase font-bold">2022 • QUANTUM LEAP</span>
              <h3 className="font-['Hanken_Grotesk'] text-xl font-semibold text-white mt-1 mb-2">Neural Sync™ Coprocessor</h3>
              <p className="text-sm text-[#cfc4c5]">Creation of our custom 3nm RISC-V neural engine, running micro-sampling cardiovascular AI with zero heat dissipation.</p>
            </div>

            <div className="relative">
              <span className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-[#4b8eff] border-4 border-[#131313]" />
              <span className="font-['JetBrains_Mono'] text-xs text-[#4b8eff] uppercase font-bold">2024 • THE ROYALE COLLECTION</span>
              <h3 className="font-['Hanken_Grotesk'] text-xl font-semibold text-white mt-1 mb-2">Global Launch of Zero One & Royale Series</h3>
              <p className="text-sm text-[#cfc4c5]">Unveiling of the Zero One flagship, Apex, Phantom, and Abyss timepieces to international acclaim.</p>
            </div>
          </div>

          <div className="pt-6 text-center">
            <button
              onClick={onExploreProducts}
              className="px-8 py-4 bg-[#4b8eff] text-[#001a41] hover:bg-[#adc6ff] font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-widest rounded transition-colors"
            >
              Explore Timepiece Collections
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
