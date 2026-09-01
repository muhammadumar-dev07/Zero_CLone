import React, { useState } from 'react';
import { X, FileText, Download, Check, Cpu, Shield, Layers, BatteryCharging, ArrowRight } from 'lucide-react';

interface WhitepaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhitepaperModal: React.FC<WhitepaperModalProps> = ({ isOpen, onClose }) => {
  const [downloaded, setDownloaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'abstract' | 'architecture' | 'materials' | 'benchmarks'>('abstract');

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#131313] border border-[#4c4546]/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-5 border-b border-[#4c4546]/20 bg-[#0e0e0e]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#4b8eff]/10 border border-[#4b8eff]/30 flex items-center justify-center text-[#4b8eff]">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-['Hanken_Grotesk'] text-lg font-semibold text-white">
                Zero Technical Whitepaper — Rev 4.2
              </h2>
              <p className="font-['JetBrains_Mono'] text-[11px] text-[#988e90]">
                ZERO HOROLOGICAL ARCHITECTURE & QUANTUM NEURAL SYNC
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#988e90] hover:text-white p-1 rounded-md hover:bg-[#2a2a2a] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#4c4546]/20 px-8 bg-[#1c1b1b]/50 gap-4 overflow-x-auto font-['JetBrains_Mono'] text-xs uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('abstract')}
            className={`py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'abstract'
                ? 'border-[#4b8eff] text-white font-medium'
                : 'border-transparent text-[#988e90] hover:text-[#cfc4c5]'
            }`}
          >
            1. Executive Abstract
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'border-[#4b8eff] text-white font-medium'
                : 'border-transparent text-[#988e90] hover:text-[#cfc4c5]'
            }`}
          >
            2. Neural Sync™ Coprocessor
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'materials'
                ? 'border-[#4b8eff] text-white font-medium'
                : 'border-transparent text-[#988e90] hover:text-[#cfc4c5]'
            }`}
          >
            3. Metallurgy & Hermetic Seal
          </button>
          <button
            onClick={() => setActiveTab('benchmarks')}
            className={`py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'benchmarks'
                ? 'border-[#4b8eff] text-white font-medium'
                : 'border-transparent text-[#988e90] hover:text-[#cfc4c5]'
            }`}
          >
            4. Empirical Benchmarks
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 overflow-y-auto space-y-6 text-[#cfc4c5] font-['Inter'] text-sm leading-relaxed">
          {activeTab === 'abstract' && (
            <div className="space-y-4">
              <h3 className="font-['Hanken_Grotesk'] text-xl font-semibold text-white">
                Rebuilding Horology for the Neuro-Kinetic Era
              </h3>
              <p>
                Traditional horological crafts have historically relied on mechanical gear trains to measure physical intervals of Earth's rotational cycle. Zero reimagines the watch not as a passive counter, but as a bi-directional neural and biological telemetry node.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div className="p-4 bg-[#1c1b1b] rounded-lg border border-white/5">
                  <span className="font-['JetBrains_Mono'] text-xs text-[#4b8eff] block mb-1">01. FREQUENCY</span>
                  <p className="font-['Hanken_Grotesk'] text-xl font-bold text-white">1,000 Hz</p>
                  <p className="text-xs text-[#988e90] mt-1">Optical cardiovascular micro-sampling</p>
                </div>
                <div className="p-4 bg-[#1c1b1b] rounded-lg border border-white/5">
                  <span className="font-['JetBrains_Mono'] text-xs text-[#4b8eff] block mb-1">02. PRESSURE</span>
                  <p className="font-['Hanken_Grotesk'] text-xl font-bold text-white">100 ATM</p>
                  <p className="text-xs text-[#988e90] mt-1">Hydrostatic resistance to 1,000 meters</p>
                </div>
                <div className="p-4 bg-[#1c1b1b] rounded-lg border border-white/5">
                  <span className="font-['JetBrains_Mono'] text-xs text-[#4b8eff] block mb-1">03. EFFICIENCY</span>
                  <p className="font-['Hanken_Grotesk'] text-xl font-bold text-white">14 Days</p>
                  <p className="text-xs text-[#988e90] mt-1">Graphene solid-state cell endurance</p>
                </div>
              </div>
              <p>
                By binding an ultra-low power neuromorphic coprocessor with an aerospace-grade Grade 5 titanium chassis, Zero delivers micro-second timing accuracy while mapping cognitive stress, autonomic nervous system rhythm, and altitude variance in real time.
              </p>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <h3 className="font-['Hanken_Grotesk'] text-xl font-semibold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#4b8eff]" />
                Neural Sync™ 3nm RISC-V Coprocessor
              </h3>
              <p>
                The Neural Sync™ engine runs a bespoke deterministic kernel capable of running quantized neural networks in under 1.2 milliwatts of active power envelope.
              </p>
              <div className="p-5 bg-[#1c1b1b] rounded-lg border border-[#4c4546]/30 font-['JetBrains_Mono'] text-xs space-y-2">
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-[#988e90]">CORE ARCHITECTURE</span>
                  <span className="text-white">Custom 64-bit Dual-Cluster RISC-V</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-[#988e90]">NEURAL TENSOR ENGINE</span>
                  <span className="text-[#4b8eff]">2.4 TOPS INT8 Matrix Acceleration</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-[#988e90]">LOCAL CRYPTOGRAPHIC VAULT</span>
                  <span className="text-white">Quantum-Resistant Kyber-1024 Enclave</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#988e90]">POWER DISSIPATION</span>
                  <span className="text-emerald-400">0.85 mW (Standby), 4.2 mW (Peak AI Inference)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'materials' && (
            <div className="space-y-4">
              <h3 className="font-['Hanken_Grotesk'] text-xl font-semibold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#4b8eff]" />
                Titanium Grade 5 (Ti-6Al-4V) Unibody Forging
              </h3>
              <p>
                Each Zero casing undergoes a 14-stage 5-axis CNC machining sequence from a solid forged ingot, followed by robotic micro-bead blasting and a 3-micron Diamond-Like Carbon (DLC) coating that yields 9.0+ Mohs surface hardness.
              </p>
              <p>
                Hermetic sealing is achieved through laser-welded sapphire crystal interfaces and dual fluoroelastomer gaskets, guaranteeing zero vapor penetration across 100 atmospheres of hydrostatic depth.
              </p>
            </div>
          )}

          {activeTab === 'benchmarks' && (
            <div className="space-y-4">
              <h3 className="font-['Hanken_Grotesk'] text-xl font-semibold text-white">
                Laboratory Validation & Shock Immunity
              </h3>
              <div className="space-y-3 font-['JetBrains_Mono'] text-xs">
                <div className="p-3 bg-[#1c1b1b] rounded border border-white/5 flex justify-between items-center">
                  <span>ISO 6425 DIVER'S CERTIFICATION</span>
                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded">PASSED 125% OVERPRESSURE</span>
                </div>
                <div className="p-3 bg-[#1c1b1b] rounded border border-white/5 flex justify-between items-center">
                  <span>MIL-STD-810H THERMAL SHOCK (-40°C to +85°C)</span>
                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded">PASSED ZERO DRIFT</span>
                </div>
                <div className="p-3 bg-[#1c1b1b] rounded border border-white/5 flex justify-between items-center">
                  <span>MAGNETIC IMMUNITY (4,800 A/m)</span>
                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded">PASSED NON-FERROUS</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center px-8 py-4 border-t border-[#4c4546]/20 bg-[#0e0e0e]">
          <span className="font-['JetBrains_Mono'] text-xs text-[#988e90]">
            DOCUMENT REF: ZERO-WP-2024-V4
          </span>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#4b8eff] text-[#001a41] hover:bg-[#adc6ff] transition-colors rounded font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-wider"
          >
            {downloaded ? (
              <>
                <Check className="w-4 h-4" />
                Downloaded PDF
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download Full Paper (PDF)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
