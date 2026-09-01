import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Diamond, BatteryCharging, Cpu, Droplets, Shield, Activity, Sparkles } from 'lucide-react';
import { WatchProduct } from '../types';

interface HomeScreenProps {
  onSelectWatch: (watchId: string) => void;
  onExploreCollection: () => void;
  onOpenFilm: () => void;
  onOpenWhitepaper: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectWatch,
  onExploreCollection,
  onOpenFilm,
  onOpenWhitepaper,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hrvLive, setHrvLive] = useState(98);
  const [activeTabTelemetry, setActiveTabTelemetry] = useState<'neural' | 'deepsea' | 'aero'>('neural');

  // Subtle mouse parallax for hero watch
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 15;
    const y = (clientY / innerHeight - 0.5) * 15;
    setMousePos({ x, y });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setHrvLive(97 + Math.floor(Math.random() * 3));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div onMouseMove={handleMouseMove} className="w-full relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center px-5 md:px-20 max-w-[1440px] mx-auto overflow-hidden">
        <div className="hero-glow" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center z-10 pt-10 md:pt-16">
          {/* Left Column: Headline & Action */}
          <div className="md:col-span-5 flex flex-col gap-6 md:gap-8">
            <p className="font-['JetBrains_Mono'] text-xs text-[#4b8eff] tracking-widest uppercase font-medium">
              The Next Evolution
            </p>

            <h1 className="font-['Hanken_Grotesk'] text-4xl sm:text-5xl md:text-[72px] font-bold text-gradient leading-[1.08] tracking-tight">
              Precision
              <br />
              Redefined
            </h1>

            <p className="font-['Inter'] text-base md:text-lg text-[#cfc4c5] max-w-md leading-relaxed">
              Experience the convergence of horological mastery and quantum-level neural sync capabilities. Engineered for those who command time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <button
                onClick={onExploreCollection}
                className="px-8 py-4 bg-[#4b8eff] text-[#00285c] font-['JetBrains_Mono'] text-xs uppercase font-bold tracking-widest hover:bg-[#adc6ff] transition-all rounded-[2px] shadow-[0_0_25px_rgba(75,142,255,0.35)] cursor-pointer text-center"
              >
                Explore Collection
              </button>

              <button
                onClick={onOpenFilm}
                className="px-8 py-4 glass-panel text-[#e5e2e1] font-['JetBrains_Mono'] text-xs uppercase font-medium tracking-widest hover:bg-[#353535]/50 transition-colors rounded-[2px] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current text-[#4b8eff]" />
                <span>Watch Film</span>
              </button>
            </div>
          </div>

          {/* Right Column: Floating Hero Watch Image with Dynamic Floating Specs */}
          <div className="md:col-span-7 relative flex justify-center items-center mt-8 md:mt-0 min-h-[420px] md:min-h-[580px]">
            {/* Ambient Backlight Diffusion */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#4b8eff]/15 to-transparent rounded-full filter blur-3xl" />

            <div
              className="relative z-10 transition-transform duration-300 ease-out"
              style={{
                transform: `rotate(-12deg) translate3d(${mousePos.x}px, ${mousePos.y}px, 0px)`,
              }}
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8qPqV8TxiEt9VktOgmEperj5HXwvNdxdXxKkHKXuY06zX7rc7lbybd-LEqboXamcGsHsKoGenZsevWhXDYDTGdKpE6qZiHVVAI0B91iBx42ejnGvzMTryj7DAib8ry_z3SL3dKtCpoxAsotrA6P0VYOThE_tKr11gOr6IxDAOAPEsQ1YzQZYs43sQ0qSgl3kUuUvhplw5Si5_X0G7_BLLq3m9VhwbofIB7qSBFcI4u8RysGgxi-SmoA"
                alt="Zero Precision Titanium Timepiece"
                className="w-full max-w-lg md:max-w-xl object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] cursor-pointer hover:rotate-6 transition-transform duration-700 ease-out"
                onClick={() => onSelectWatch('zero-one')}
              />
            </div>

            {/* Floating Tech Spec - Top Right */}
            <div className="absolute top-8 md:top-1/4 right-0 glass-panel p-4 rounded-lg hidden md:block animate-pulse border border-[#adc6ff]/20 shadow-lg">
              <p className="font-['JetBrains_Mono'] text-xs text-[#988e90] uppercase tracking-wider">
                Neural Sync
              </p>
              <p className="font-['Hanken_Grotesk'] text-2xl font-bold text-[#e5e2e1] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Active
              </p>
            </div>

            {/* Floating Tech Spec - Bottom Left */}
            <div className="absolute bottom-8 md:bottom-1/4 left-0 glass-panel p-4 rounded-lg hidden md:block border border-[#adc6ff]/20 shadow-lg">
              <p className="font-['JetBrains_Mono'] text-xs text-[#988e90] uppercase tracking-wider">
                Power Reserve
              </p>
              <p className="font-['Hanken_Grotesk'] text-2xl font-bold text-[#e5e2e1]">
                336 Hrs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Section: The Royale Collection */}
      <section className="py-24 md:py-32 px-5 md:px-20 max-w-[1440px] mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-[#4c4546]/20 pb-8">
          <div>
            <h2 className="font-['Hanken_Grotesk'] text-3xl md:text-5xl font-semibold text-[#e5e2e1] tracking-tight">
              The Royale Collection
            </h2>
            <p className="font-['Inter'] text-sm md:text-base text-[#cfc4c5] mt-2">
              Flagship models engineered for distinct environments.
            </p>
          </div>
          <button
            onClick={onExploreCollection}
            className="font-['JetBrains_Mono'] text-xs text-[#4b8eff] hover:text-[#adc6ff] transition-colors hidden md:flex items-center gap-2 uppercase tracking-wider cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Watch Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Watch Card 1: Apex */}
          <div
            onClick={() => onSelectWatch('apex')}
            className="glass-panel p-8 group cursor-pointer rounded-xl flex flex-col h-full hover:bg-[#353535]/30 transition-all duration-300 relative border border-white/10 glow-hover"
          >
            <div className="flex justify-between items-start mb-8">
              <span className="font-['JetBrains_Mono'] text-xs px-2.5 py-1 bg-[#2a2a2a] rounded text-[#cfc4c5]">
                01
              </span>
              <span className="w-2 h-2 rounded-full bg-[#4b8eff] shadow-[0_0_8px_rgba(75,142,255,0.8)]" />
            </div>

            <div className="flex-grow flex items-center justify-center mb-8 relative min-h-[260px]">
              <div className="absolute inset-0 bg-[#4b8eff]/5 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoLsDxzHKDIlWOqInvd2d8zbgatY4nYmKXiFCF4bmTA9-YK5SkwC_Nbdh3Nl_VX1yTQSTqgizKzP0hVVJLyJAdJMEMpf1EqwYb5e-DJO-zd8Ha3ElA_tYIi9GDwUJbyEPjLtJ5gnF7d2L5Id3h7s1RVGL-P671EyYLau5d7ieFkAlQpBbfRPiZkk3wY00I4IZCybbyb14IyXNtCeJEW0tqhNtpstgNVOsthf2sx_vegMa1ULjIpizZWQ"
                alt="Zero Apex"
                className="h-64 object-contain group-hover:scale-105 transition-transform duration-500 relative z-10 drop-shadow-2xl"
              />
            </div>

            <div>
              <h3 className="font-['Hanken_Grotesk'] text-2xl font-medium text-[#e5e2e1] mb-2">
                Apex
              </h3>
              <p className="font-['Inter'] text-sm text-[#cfc4c5] mb-4">
                Aerospace grade titanium chassis.
              </p>
              <p className="font-['JetBrains_Mono'] text-sm text-[#4b8eff] font-semibold">
                $2,400 USD
              </p>
            </div>
          </div>

          {/* Watch Card 2: Phantom */}
          <div
            onClick={() => onSelectWatch('phantom')}
            className="glass-panel p-8 group cursor-pointer rounded-xl flex flex-col h-full hover:bg-[#353535]/30 transition-all duration-300 relative border border-white/10 glow-hover"
          >
            <div className="flex justify-between items-start mb-8">
              <span className="font-['JetBrains_Mono'] text-xs px-2.5 py-1 bg-[#2a2a2a] rounded text-[#cfc4c5]">
                02
              </span>
              <span className="font-['JetBrains_Mono'] text-[10px] px-2 py-1 border border-[#988e90]/30 rounded text-[#e5e2e1] tracking-wider font-medium">
                LIMITED
              </span>
            </div>

            <div className="flex-grow flex items-center justify-center mb-8 relative min-h-[260px]">
              <div className="absolute inset-0 bg-[#4b8eff]/5 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1PkZM6OScbx7Htu95ZFf24lUyTLPOa8Eah8cRWTed7IMt3iCkV5KHjtfxAjeSdeAz2VwxA9R4xq2Tkk1uC2tC4DBYtedK1KXVMxcANjl5EjsWCYEsH8MjUsFICirIAVjfLbFoHZp_HZ5uOqJof4ba8HtGlILbSViuUk5hFV9wJmEUgWhZi2delu9xBnovH9So_wxQXyHoqS4oKMF804ynqKiqLqqKYW58dIHRO0_yYL_3Vw6BJ_lqLQ"
                alt="Zero Phantom"
                className="h-64 object-contain group-hover:scale-105 transition-transform duration-500 relative z-10 drop-shadow-2xl"
              />
            </div>

            <div>
              <h3 className="font-['Hanken_Grotesk'] text-2xl font-medium text-[#e5e2e1] mb-2">
                Phantom
              </h3>
              <p className="font-['Inter'] text-sm text-[#cfc4c5] mb-4">
                Sapphire crystal unibody construct.
              </p>
              <p className="font-['JetBrains_Mono'] text-sm text-[#4b8eff] font-semibold">
                $3,100 USD
              </p>
            </div>
          </div>

          {/* Watch Card 3: Abyss */}
          <div
            onClick={() => onSelectWatch('abyss')}
            className="glass-panel p-8 group cursor-pointer rounded-xl flex flex-col h-full hover:bg-[#353535]/30 transition-all duration-300 relative border border-white/10 glow-hover"
          >
            <div className="flex justify-between items-start mb-8">
              <span className="font-['JetBrains_Mono'] text-xs px-2.5 py-1 bg-[#2a2a2a] rounded text-[#cfc4c5]">
                03
              </span>
              <span className="w-2 h-2 rounded-full bg-[#4b8eff] shadow-[0_0_8px_rgba(75,142,255,0.8)]" />
            </div>

            <div className="flex-grow flex items-center justify-center mb-8 relative min-h-[260px]">
              <div className="absolute inset-0 bg-[#4b8eff]/5 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlQuwN5RUDcbF9SPMS57pR7pckstcn7yaxpj6nw9dfSi7YVwJpp-r0pd2T1p2WiudXuoTbtVa2EhxNUjYwU1yX1jzlDqc7Nn4Ml7SbXJl3m0wECui18qJRwgHzij9N1AWoiwlBmh9ZAXFX7u5DZYapgsDkwcY_gKIulpKgb3Rych4NDX1oa2wAEEMZAotMm1BAJ6TWa_fFNFCPRTrmA3D4aI644kpdqJfqbpcFPYimu2wbpImR9AzCkw"
                alt="Zero Abyss"
                className="h-64 object-contain group-hover:scale-105 transition-transform duration-500 relative z-10 drop-shadow-2xl"
              />
            </div>

            <div>
              <h3 className="font-['Hanken_Grotesk'] text-2xl font-medium text-[#e5e2e1] mb-2">
                Abyss
              </h3>
              <p className="font-['Inter'] text-sm text-[#cfc4c5] mb-4">
                Deep sea pressure resistant up to 100ATM.
              </p>
              <p className="font-['JetBrains_Mono'] text-sm text-[#4b8eff] font-semibold">
                $2,800 USD
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Excellence / Spec Grid Section */}
      <section className="py-24 md:py-32 bg-[#0e0e0e] relative overflow-hidden border-t border-[#4c4546]/20">
        {/* Subtle Engineering Blueprint Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="px-5 md:px-20 max-w-[1440px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left Column: Manifesto & Whitepaper Button */}
            <div className="md:col-span-5 mb-8 md:mb-0">
              <h2 className="font-['Hanken_Grotesk'] text-3xl md:text-5xl font-bold text-[#e5e2e1] mb-6 leading-tight">
                Engineering
                <br />
                Excellence
              </h2>
              <p className="font-['Inter'] text-base md:text-lg text-[#cfc4c5] mb-8 leading-relaxed">
                We tore down traditional horology and rebuilt it around advanced neuro-kinetic processors. Every micrometer serves a purpose.
              </p>
              <button
                onClick={onOpenWhitepaper}
                className="font-['JetBrains_Mono'] text-xs uppercase font-semibold text-[#e5e2e1] border border-[#4c4546] px-6 py-3.5 hover:bg-[#353535] hover:border-[#4b8eff] transition-all rounded-[2px] tracking-wider cursor-pointer"
              >
                Read the Whitepaper
              </button>
            </div>

            {/* Right Column: Spec Grid Specialty Component */}
            <div className="md:col-span-6 md:col-start-7">
              <div className="grid grid-cols-2 gap-px bg-[#4c4546]/30 glass-panel rounded-xl overflow-hidden border border-white/10">
                {/* 01. Display Armor */}
                <div className="bg-[#131313]/85 p-6 md:p-8 hover:bg-[#353535]/40 transition-colors">
                  <Diamond className="text-[#4b8eff] mb-4 w-8 h-8" />
                  <h4 className="font-['Inter'] text-sm text-[#cfc4c5] mb-1">
                    Display Armor
                  </h4>
                  <p className="font-['Hanken_Grotesk'] text-xl md:text-2xl font-bold text-[#e5e2e1]">
                    Sapphire Glass
                  </p>
                  <p className="font-['JetBrains_Mono'] text-[10px] text-[#988e90] mt-2 uppercase tracking-widest">
                    MOHS 9 HARDNESS
                  </p>
                </div>

                {/* 02. Endurance */}
                <div className="bg-[#131313]/85 p-6 md:p-8 hover:bg-[#353535]/40 transition-colors">
                  <BatteryCharging className="text-[#4b8eff] mb-4 w-8 h-8" />
                  <h4 className="font-['Inter'] text-sm text-[#cfc4c5] mb-1">
                    Endurance
                  </h4>
                  <p className="font-['Hanken_Grotesk'] text-xl md:text-2xl font-bold text-[#e5e2e1]">
                    14-Day Cell
                  </p>
                  <p className="font-['JetBrains_Mono'] text-[10px] text-[#988e90] mt-2 uppercase tracking-widest">
                    QUANTUM CORE
                  </p>
                </div>

                {/* 03. Processing */}
                <div className="bg-[#131313]/85 p-6 md:p-8 hover:bg-[#353535]/40 transition-colors">
                  <Cpu className="text-[#4b8eff] mb-4 w-8 h-8" />
                  <h4 className="font-['Inter'] text-sm text-[#cfc4c5] mb-1">
                    Processing
                  </h4>
                  <p className="font-['Hanken_Grotesk'] text-xl md:text-2xl font-bold text-[#e5e2e1]">
                    Neural Sync
                  </p>
                  <p className="font-['JetBrains_Mono'] text-[10px] text-[#988e90] mt-2 uppercase tracking-widest">
                    BIOMETRIC AI
                  </p>
                </div>

                {/* 04. Resistance */}
                <div className="bg-[#131313]/85 p-6 md:p-8 hover:bg-[#353535]/40 transition-colors">
                  <Droplets className="text-[#4b8eff] mb-4 w-8 h-8" />
                  <h4 className="font-['Inter'] text-sm text-[#cfc4c5] mb-1">
                    Resistance
                  </h4>
                  <p className="font-['Hanken_Grotesk'] text-xl md:text-2xl font-bold text-[#e5e2e1]">
                    100 ATM
                  </p>
                  <p className="font-['JetBrains_Mono'] text-[10px] text-[#988e90] mt-2 uppercase tracking-widest">
                    HERMETIC SEAL
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
