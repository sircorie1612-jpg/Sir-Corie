import React from 'react';
import { Sparkles, ShieldCheck, Flame, Sprout, ArrowRight } from 'lucide-react';
import { DROP_BOTTLE_NEW_IMAGE, EGUSI_SOUP_IMAGE, PLANTATION_IMAGE, HERO_IMAGE } from '../data/mockData';

interface WhyChooseUsProps {
  onLearnMore?: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onLearnMore }) => {
  const cards = [
    {
      title: 'Naturally Rich',
      tagline: 'Deep vibrant color and unadulterated flavor.',
      description: 'Extracted from ripe Nigerian palm fruit bunches, bursting with natural beta-carotenes and Vitamin E. Never chemically bleached or diluted with cheaper neutral oils.',
      icon: Sparkles,
      image: DROP_BOTTLE_NEW_IMAGE,
      isBottle: true,
      detail: 'Rich beta-carotene retention',
      anim: 'animate-hover-float-1'
    },
    {
      title: 'Quality You Can Trust',
      tagline: 'Carefully processed and laboratory certified.',
      description: 'Every production run is tested for low Free Fatty Acid (FFA < 1.8%) and 0.00% Sudan IV dyes. Induction-sealed in food-grade, UV-protected containers.',
      icon: ShieldCheck,
      image: DROP_BOTTLE_NEW_IMAGE,
      isBottle: true,
      detail: '0.00% Sudan IV Dyes guaranteed',
      anim: 'animate-hover-float-2'
    },
    {
      title: 'Made for Nigerian Cooking',
      tagline: 'Perfect for traditional and modern meals.',
      description: 'Crafted specifically to withstand the heat demanded by authentic soups, slow-bleached Ofada stews, native concoction rice, and velvety Delta Banga.',
      icon: Flame,
      image: EGUSI_SOUP_IMAGE,
      isBottle: false,
      detail: '232°C High Smoke Point',
      anim: 'animate-hover-float-3'
    },
    {
      title: 'From Farm to Kitchen',
      tagline: 'We care about every stage of the journey.',
      description: 'Direct relationships with over 450 smallholder palm farmers in the agricultural belt. Fair trade pricing, zero deforestation, and complete tree-to-table traceability.',
      icon: Sprout,
      image: PLANTATION_IMAGE,
      isBottle: false,
      detail: '450+ Smallholder Farmers',
      anim: 'animate-hover-float-4'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F4EFEA] border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B85D0D]">
            <span>Why Discerning Cooks Choose Drop</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#153823] tracking-tight text-balance">
            The Golden Standard of Nigerian Palm Oil
          </h2>
          <p className="text-sm sm:text-base text-[#5C554B] leading-relaxed">
            Unlike open-market bulk oils prone to hazardous dyes and rancid fats, Drop is harvested, cold-filtered, and sealed with relentless standards.
          </p>
        </div>

        {/* 4 Large Visual Cards - Hovering Beautifully */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div
                key={idx}
                className={`hover-float-card ${card.anim} group bg-white rounded-3xl overflow-hidden border border-[#E0D7CC] hover:border-[#153823] hover:ring-2 hover:ring-[#E07A1E]/30 shadow-md hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 ease-out flex flex-col justify-between cursor-pointer`}
              >
                {/* Visual Imagery Slot (Takes 50% height with subtle zoom) */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-gradient-to-b from-[#FAF7F2] to-[#F4EFEA] flex items-center justify-center">
                  <img
                    src={card.image}
                    alt={card.title}
                    className={`w-full h-full ${card.isBottle ? 'object-contain p-3 drop-shadow-lg' : 'object-cover'} group-hover:scale-110 transition-transform duration-700 ease-out`}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/Pzmp6ykZ/drop2.png';
                    }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Icon badge on image */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10">
                    <div className="w-8 h-8 rounded-xl bg-[#153823] text-white flex items-center justify-center shadow-md group-hover:bg-[#E07A1E] group-hover:scale-110 transition-all duration-300">
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[11px] font-semibold text-white/95 drop-shadow-sm">
                      {card.detail}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#153823] group-hover:text-[#B85D0D] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#B85D0D] mt-1 mb-2">
                      {card.tagline}
                    </p>
                    <p className="text-xs text-[#5C554B] leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#F0EBE1] flex items-center justify-between text-[11px]">
                    <span className="text-[#8C8274] font-medium">Standard Guaranteed</span>
                    <span className="text-[#E07A1E] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn More →
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Editorial Callout */}
        {onLearnMore && (
          <div className="mt-12 text-center">
            <button
              onClick={onLearnMore}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#153823] hover:text-[#B85D0D] hover:underline cursor-pointer"
            >
              <span>Read About Our Zero-Adulteration Extraction Process</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
