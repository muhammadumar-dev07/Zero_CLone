import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Shield, Activity, Radio } from 'lucide-react';

interface WatchFilmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WatchFilmModal: React.FC<WatchFilmModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [telemetryValue, setTelemetryValue] = useState(14200);

  const scenes = [
    {
      title: 'ACT I: MOLECULAR FORGING',
      subtitle: 'Aerospace Grade 5 Titanium under 4,000 tons of isotropic pressure',
      timecode: '00:04.82',
      signal: 'STRUCTURAL DENSITY 99.98%'
    },
    {
      title: 'ACT II: THE QUANTUM CORE',
      subtitle: 'Micro-lithography of the Neural Sync™ coprocessor at 3nm architecture',
      timecode: '00:18.45',
      signal: 'CLOCK PULSE 4.2 GHz'
    },
    {
      title: 'ACT III: 100 ATM HERMETIC SEAL',
      subtitle: 'Hydrostatic pressure simulation in the Marianas Trench chamber',
      timecode: '00:32.10',
      signal: 'ZERO DEFLECTION'
    },
    {
      title: 'ACT IV: SYNCHRONICITY',
      subtitle: 'Human biometric interface meets timeless horological craftsmanship',
      timecode: '00:46.90',
      signal: 'HRV COHERENCE 99%'
    }
  ];

  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const sceneInterval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % scenes.length);
    }, 4500);

    const telemetryInterval = setInterval(() => {
      setTelemetryValue((prev) => prev + Math.floor(Math.random() * 20 - 10));
    }, 800);

    return () => {
      clearInterval(sceneInterval);
      clearInterval(telemetryInterval);
    };
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const scene = scenes[currentScene];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-2xl animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#0e0e0e] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,122,255,0.25)] flex flex-col">
        {/* Top Control Bar */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-[#131313]/90">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#e5e2e1]">
              CINEMATIC MANIFESTO: PRECISION REDEFINED
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#988e90] hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas / Synthetic Film Renderer */}
        <div className="relative aspect-video w-full bg-[#080808] flex items-center justify-center overflow-hidden">
          {/* Animated Atmospheric Glows & Scanlines */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(75,142,255,0.18)_0%,transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.6)_51%)] bg-[length:100%_4px] opacity-30 pointer-events-none"></div>

          {/* Central Animated Watch Hologram & Photography */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center p-8 max-w-2xl">
            <div className="relative mb-6">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8qPqV8TxiEt9VktOgmEperj5HXwvNdxdXxKkHKXuY06zX7rc7lbybd-LEqboXamcGsHsKoGenZsevWhXDYDTGdKpE6qZiHVVAI0B91iBx42ejnGvzMTryj7DAib8ry_z3SL3dKtCpoxAsotrA6P0VYOThE_tKr11gOr6IxDAOAPEsQ1YzQZYs43sQ0qSgl3kUuUvhplw5Si5_X0G7_BLLq3m9VhwbofIB7qSBFcI4u8RysGgxi-SmoA"
                alt="Zero Precision Film"
                className="w-72 md:w-96 object-contain drop-shadow-[0_0_50px_rgba(75,142,255,0.4)] animate-pulse transition-all duration-1000"
              />
              {/* Telemetry Reticle */}
              <div className="absolute -top-4 -left-4 border-t-2 border-l-2 border-[#4b8eff] w-8 h-8"></div>
              <div className="absolute -bottom-4 -right-4 border-b-2 border-r-2 border-[#4b8eff] w-8 h-8"></div>
            </div>

            {/* Scene Narrative */}
            <div className="glass-panel p-4 rounded-lg max-w-lg mx-auto backdrop-blur-md">
              <div className="flex justify-between items-center text-[10px] font-['JetBrains_Mono'] text-[#4b8eff] tracking-widest uppercase mb-1">
                <span>{scene.title}</span>
                <span>{scene.timecode}</span>
              </div>
              <p className="font-['Hanken_Grotesk'] text-lg md:text-xl font-medium text-white mb-1">
                {scene.subtitle}
              </p>
              <div className="flex items-center justify-center gap-2 text-xs font-['JetBrains_Mono'] text-[#adc6ff]">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                <span>{scene.signal}</span>
              </div>
            </div>
          </div>

          {/* Floating Live Telemetry HUD inside film */}
          <div className="absolute top-6 left-6 font-['JetBrains_Mono'] text-[11px] text-[#988e90] space-y-1 hidden md:block">
            <div className="flex items-center gap-2 text-[#4b8eff]">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>LIVE TRANSMISSION: GENEVA 4K</span>
            </div>
            <div>BAROMETRIC ALTITUDE: {telemetryValue.toLocaleString()} FT</div>
            <div>NEURAL SYNC CARRIER: 1,024 BIT AES</div>
          </div>

          <div className="absolute top-6 right-6 font-['JetBrains_Mono'] text-[11px] text-[#988e90] text-right hidden md:block">
            <div>ASPECT RATIO: 2.39:1 ANAMORPHIC</div>
            <div>COLOR SPACE: DCI-P3 TITANIUM MASTER</div>
          </div>
        </div>

        {/* Bottom Timeline Controls */}
        <div className="p-5 bg-[#131313] border-t border-white/10 flex flex-col gap-3">
          {/* Progress Bar */}
          <div className="w-full bg-[#2a2a2a] h-1 rounded-full overflow-hidden flex cursor-pointer">
            {scenes.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentScene(idx)}
                className={`h-full flex-1 border-r border-black/40 transition-all duration-300 ${
                  idx === currentScene
                    ? 'bg-[#4b8eff]'
                    : idx < currentScene
                    ? 'bg-[#c6c6c6]'
                    : 'bg-[#2a2a2a]'
                }`}
              />
            ))}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-full bg-[#4b8eff] text-[#001a41] hover:bg-[#adc6ff] transition-colors"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-[#988e90] hover:text-white p-1"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="font-['JetBrains_Mono'] text-xs text-[#cfc4c5]">
                Scene {currentScene + 1} of {scenes.length}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentScene((prev) => (prev + 1) % scenes.length)}
                className="font-['JetBrains_Mono'] text-xs uppercase text-[#4b8eff] hover:text-[#adc6ff] tracking-wider"
              >
                Next Act →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
