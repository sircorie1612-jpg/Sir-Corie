import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Flame } from 'lucide-react';
import { HERO_IMAGE, DROP_LOGO_IMAGE, DROP_BOTTLE_NEW_IMAGE } from '../data/mockData';

interface HeroProps {
  onShopNow: () => void;
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow, onExplore }) => {
  return (
    <section className="relative bg-[#FAF7F2] overflow-hidden border-b border-[#E8DFD5]">
      {/* Background Subtle Warm Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/90 to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Official Brand Logo Identifier and Kicker without 'Direct From Edo State' */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2.5 bg-black text-white border border-black rounded-full pl-1.5 pr-4 py-1 shadow-md">
                <div className="w-8 h-8 rounded-full bg-black p-1 flex items-center justify-center shrink-0">
                  <img
                    src={DROP_LOGO_IMAGE}
                    alt="Drop Palm Oil Official Logo"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/Y7vQLWph/Whats-App-Image-2026-09-28-at-5-17-47-PM-1-removebg-preview.png';
                    }}
                  />
                </div>
                <span className="font-bold text-xs text-white tracking-wide">
                  DROP PALM OIL™
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B85D0D]">
                <span className="w-2 h-2 rounded-full bg-[#E07A1E] animate-pulse" />
                <span>100% Virgin Extraction</span>
                <span aria-hidden="true">·</span>
                <span>Unadulterated Quality</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#153823] leading-[1.08] text-balance">
              PURE PALM OIL. <br />
              <span className="text-[#B85D0D] italic font-serif">RICH FLAVOUR.</span> <br />
              THE TASTE OF HOME.
            </h1>

            {/* Short Supporting Text */}
            <p className="text-base sm:text-lg text-[#5C554B] leading-relaxed max-w-xl">
              Carefully produced palm oil made for delicious meals, trusted kitchens, and authentic Nigerian cooking. Unbleached, unadulterated, and bottled with integrity.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onShopNow}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-[#153823] hover:bg-[#0D2216] rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExplore}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#153823] bg-[#EAE2D7] hover:bg-[#DECFC0] rounded-xl border border-[#D5C6B5] transition-all cursor-pointer"
              >
                <span>Explore Our Products</span>
              </button>
            </div>

            {/* Trust Proof Micro-Badges */}
            <div className="pt-8 border-t border-[#E8DFD5] grid grid-cols-3 gap-4 max-w-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#153823]">
                  <ShieldCheck className="w-4 h-4 text-[#E07A1E]" />
                  <span>Zero Dye</span>
                </div>
                <p className="text-[11px] text-[#786E63] leading-tight">No Sudan IV or artificial additives</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#153823]">
                  <Sparkles className="w-4 h-4 text-[#E07A1E]" />
                  <span>&lt;1.8% FFA</span>
                </div>
                <p className="text-[11px] text-[#786E63] leading-tight">Extra grade low acidity freshness</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#153823]">
                  <Flame className="w-4 h-4 text-[#E07A1E]" />
                  <span>232°C Smoke</span>
                </div>
                <p className="text-[11px] text-[#786E63] leading-tight">High heat resilience for soups & frying</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase with new bottle & Hovering beautifully */}
          <div className="lg:col-span-5 relative">
            <div className="hover-float-card animate-hover-float-1 group relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-b from-[#FAF7F2] to-[#F4EFEA] hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer p-6 flex flex-col items-center justify-center">
              
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-radial from-[#E07A1E]/15 via-transparent to-transparent pointer-events-none" />

              {/* Product bottle photo from link https://ibb.co/S7sT3gSX */}
              <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[460px] flex items-center justify-center py-4">
                <img
                  src={DROP_BOTTLE_NEW_IMAGE}
                  alt="Drop Palm Oil bottle - Pure unadulterated Nigerian palm oil"
                  className="max-h-full max-w-[90%] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.25)] group-hover:scale-108 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/Pzmp6ykZ/drop2.png';
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Bottom Card Over Image */}
              <div className="w-full bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#E0D7CC] shadow-lg flex items-center justify-between group-hover:border-[#153823] transition-colors">
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-[#B85D0D]">Featured Reserve</p>
                  <p className="font-serif font-bold text-base text-[#153823]">Drop Pure Palm Oil 1L</p>
                  <p className="text-xs text-[#5C554B]">In stock · Dispatched within 24 hours</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-base text-[#153823] tabular-nums block">₦4,500</span>
                  <button
                    onClick={onShopNow}
                    className="block text-[11px] font-bold text-[#B85D0D] hover:underline cursor-pointer"
                  >
                    Order Now →
                  </button>
                </div>
              </div>

              {/* Official Logo Brand Seal - Pure Black Background */}
              <div className="absolute -top-3 -right-3 w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-black text-white flex flex-col items-center justify-center p-2 text-center shadow-2xl border-4 border-black group-hover:scale-110 transition-transform z-30">
                <img
                  src={DROP_LOGO_IMAGE}
                  alt="Drop Palm Oil"
                  className="w-11 h-11 object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/Y7vQLWph/Whats-App-Image-2026-09-28-at-5-17-47-PM-1-removebg-preview.png';
                  }}
                />
                <span className="text-[8px] font-bold uppercase tracking-widest text-[#E07A1E] -mt-0.5">Original</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
