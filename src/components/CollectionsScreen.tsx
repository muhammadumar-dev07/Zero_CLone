import React, { useState, useMemo } from 'react';
import { ChevronDown, Search, Filter, Sparkles, Check } from 'lucide-react';
import { WATCH_PRODUCTS } from '../data/products';
import { WatchProduct } from '../types';

interface CollectionsScreenProps {
  onSelectWatch: (watchId: string) => void;
  onAddToCart: (product: WatchProduct) => void;
}

export const CollectionsScreen: React.FC<CollectionsScreenProps> = ({
  onSelectWatch,
  onAddToCart,
}) => {
  const [materialFilter, setMaterialFilter] = useState('all');
  const [connectivityFilter, setConnectivityFilter] = useState('all');
  const [styleFilter, setStyleFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const [showAllLoaded, setShowAllLoaded] = useState(false);

  // Filter logic
  const filteredProducts = useMemo(() => {
    return WATCH_PRODUCTS.filter((product) => {
      // Search
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Material
      if (materialFilter !== 'all' && product.filterTags.material !== materialFilter) {
        return false;
      }

      // Connectivity
      if (
        connectivityFilter !== 'all' &&
        product.filterTags.connectivity !== connectivityFilter
      ) {
        return false;
      }

      // Style
      if (styleFilter !== 'all' && product.filterTags.style !== styleFilter) {
        return false;
      }

      return true;
    });
  }, [materialFilter, connectivityFilter, styleFilter, searchQuery]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(WATCH_PRODUCTS.length);
    setShowAllLoaded(true);
  };

  return (
    <main className="flex-grow w-full max-w-[1440px] mx-auto px-5 md:px-20 py-12 md:py-16 flex flex-col gap-12 md:gap-16">
      {/* Page Header & Filter Toolbar */}
      <section className="flex flex-col gap-8 md:flex-row md:justify-between md:items-end w-full">
        <div className="flex flex-col gap-4 max-w-2xl">
          <h1 className="font-['Hanken_Grotesk'] text-4xl sm:text-5xl md:text-[72px] font-bold text-[#e5e2e1] tracking-tighter leading-none">
            Collections
          </h1>
          <p className="font-['Inter'] text-base md:text-lg text-[#cfc4c5] leading-relaxed">
            Precision engineering meets high-fashion luxury. Explore our range of technologically expressive timepieces designed for the modern professional.
          </p>
        </div>

        {/* Filter Dropdowns matching design */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* Material Select */}
          <div className="relative">
            <select
              value={materialFilter}
              onChange={(e) => setMaterialFilter(e.target.value)}
              className="glass-panel text-[#e5e2e1] font-['JetBrains_Mono'] text-xs uppercase px-4 py-3 rounded-[2px] appearance-none pr-10 focus:outline-none focus:border-[#4b8eff] transition-colors cursor-pointer bg-[#1c1b1b]"
            >
              <option value="all">Material: All</option>
              <option value="titanium">Titanium Grade 5</option>
              <option value="sapphire">Sapphire Crystal</option>
              <option value="carbon">Carbon Fiber</option>
              <option value="ceramic">DLC Ceramic</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#cfc4c5] w-4 h-4" />
          </div>

          {/* Connectivity Select */}
          <div className="relative">
            <select
              value={connectivityFilter}
              onChange={(e) => setConnectivityFilter(e.target.value)}
              className="glass-panel text-[#e5e2e1] font-['JetBrains_Mono'] text-xs uppercase px-4 py-3 rounded-[2px] appearance-none pr-10 focus:outline-none focus:border-[#4b8eff] transition-colors cursor-pointer bg-[#1c1b1b]"
            >
              <option value="all">Connectivity: All</option>
              <option value="lte">LTE Cellular</option>
              <option value="gps">GPS + Glonass</option>
              <option value="bluetooth">Bluetooth 5.3</option>
              <option value="neural">Neural Sync Mesh</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#cfc4c5] w-4 h-4" />
          </div>

          {/* Style Select */}
          <div className="relative">
            <select
              value={styleFilter}
              onChange={(e) => setStyleFilter(e.target.value)}
              className="glass-panel text-[#e5e2e1] font-['JetBrains_Mono'] text-xs uppercase px-4 py-3 rounded-[2px] appearance-none pr-10 focus:outline-none focus:border-[#4b8eff] transition-colors cursor-pointer bg-[#1c1b1b]"
            >
              <option value="all">Style: All</option>
              <option value="diver">Deep Sea Diver</option>
              <option value="aero">Aeronautics</option>
              <option value="minimal">Minimalist</option>
              <option value="cyber">Cyber Skeletal</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#cfc4c5] w-4 h-4" />
          </div>
        </div>
      </section>

      {/* Active Filter Tags Bar */}
      {(materialFilter !== 'all' || connectivityFilter !== 'all' || styleFilter !== 'all' || searchQuery) && (
        <div className="flex items-center gap-3 font-['JetBrains_Mono'] text-xs">
          <span className="text-[#988e90]">ACTIVE FILTERS:</span>
          {materialFilter !== 'all' && (
            <span className="px-2.5 py-1 bg-[#2a2a2a] text-[#adc6ff] rounded flex items-center gap-1">
              Material: {materialFilter}
              <button onClick={() => setMaterialFilter('all')} className="ml-1 text-white hover:text-red-400">×</button>
            </span>
          )}
          {connectivityFilter !== 'all' && (
            <span className="px-2.5 py-1 bg-[#2a2a2a] text-[#adc6ff] rounded flex items-center gap-1">
              Conn: {connectivityFilter}
              <button onClick={() => setConnectivityFilter('all')} className="ml-1 text-white hover:text-red-400">×</button>
            </span>
          )}
          {styleFilter !== 'all' && (
            <span className="px-2.5 py-1 bg-[#2a2a2a] text-[#adc6ff] rounded flex items-center gap-1">
              Style: {styleFilter}
              <button onClick={() => setStyleFilter('all')} className="ml-1 text-white hover:text-red-400">×</button>
            </span>
          )}
          <button
            onClick={() => {
              setMaterialFilter('all');
              setConnectivityFilter('all');
              setStyleFilter('all');
              setSearchQuery('');
            }}
            className="text-xs text-[#988e90] underline hover:text-white ml-2"
          >
            Reset All
          </button>
        </div>
      )}

      {/* Product Grid (Matches Screen 2 exact cards) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
        {displayedProducts.map((product) => (
          <article
            key={product.id}
            className="glass-panel rounded-xl overflow-hidden flex flex-col group glow-hover transition-all duration-300 h-[600px] border border-white/10 relative"
          >
            {/* Image Container Area */}
            <div
              onClick={() => onSelectWatch(product.id)}
              className="h-2/3 w-full relative p-8 flex items-center justify-center bg-[#0e0e0e]/50 cursor-pointer overflow-hidden"
            >
              {/* Subtle ambient glow behind product */}
              <div className="absolute inset-0 bg-[#4b8eff]/5 rounded-full blur-[60px] transform scale-50 group-hover:scale-75 transition-transform duration-700" />
              
              <img
                src={product.image}
                alt={product.name}
                className="object-contain w-full h-full relative z-10 transition-transform duration-500 group-hover:scale-105 drop-shadow-2xl"
              />

              {/* Status Badge in Top Left */}
              <div className="absolute top-4 left-4 flex gap-2 z-20">
                {product.badge === 'IN STOCK' ? (
                  <span className="font-['JetBrains_Mono'] text-xs uppercase text-[#4b8eff] flex items-center gap-1.5 bg-[#4b8eff]/10 border border-[#4b8eff]/20 px-2.5 py-1 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4b8eff] animate-pulse" />
                    In Stock
                  </span>
                ) : (
                  <span className="font-['JetBrains_Mono'] text-xs uppercase text-[#cfc4c5] border border-[#4c4546]/40 px-2.5 py-1 rounded bg-[#1c1b1b]">
                    Limited Run
                  </span>
                )}
              </div>
            </div>

            {/* Content & Action Area */}
            <div className="flex-grow p-6 flex flex-col justify-between border-t border-[#4c4546]/20 bg-[#131313]/60">
              <div>
                <h3
                  onClick={() => onSelectWatch(product.id)}
                  className="font-['Hanken_Grotesk'] text-2xl font-medium text-[#e5e2e1] mb-1 cursor-pointer hover:text-white transition-colors"
                >
                  {product.name}
                </h3>
                <p className="font-['Inter'] text-sm text-[#cfc4c5]">
                  {product.subtitle}
                </p>
              </div>

              <div className="flex justify-between items-end mt-4 pt-2">
                <span className="font-['Hanken_Grotesk'] text-2xl font-bold text-[#e5e2e1]">
                  ${product.price.toLocaleString()}
                </span>
                
                <button
                  onClick={() => onSelectWatch(product.id)}
                  className="bg-transparent border border-[#4c4546] hover:border-[#4b8eff] hover:text-[#4b8eff] text-[#e5e2e1] font-['JetBrains_Mono'] text-xs uppercase px-6 py-2.5 rounded-[2px] transition-colors duration-300 cursor-pointer tracking-wider"
                >
                  View Details
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Pagination / Load More */}
      <div className="w-full flex justify-center py-8">
        {!showAllLoaded && filteredProducts.length > visibleCount ? (
          <button
            onClick={handleLoadMore}
            className="bg-transparent border-b border-[#4c4546] hover:border-[#4b8eff] hover:text-[#4b8eff] text-[#cfc4c5] font-['JetBrains_Mono'] text-xs uppercase px-4 py-2 transition-colors duration-300 cursor-pointer tracking-widest"
          >
            Load More Models
          </button>
        ) : (
          <p className="font-['JetBrains_Mono'] text-xs text-[#988e90] uppercase tracking-widest">
            Showing all {filteredProducts.length} certified models
          </p>
        )}
      </div>
    </main>
  );
};
