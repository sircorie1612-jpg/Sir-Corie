import React from 'react';
import { PLANTATION_IMAGE, HERO_IMAGE, DROP_BOTTLE_NEW_IMAGE, EGUSI_SOUP_IMAGE, VISION_HERO_IMAGE, MISSION_TRUST_IMAGE } from '../data/mockData';
import { FarmToBottle } from '../components/FarmToBottle';
import { ArrowRight, Sprout, Heart, Shield, TrendingUp } from 'lucide-react';

interface VisionPageProps {
  setActiveTab: (tab: string) => void;
}

export const VisionPage: React.FC<VisionPageProps> = ({ setActiveTab }) => {
  const pillars = [
    {
      title: 'QUALITY',
      tagline: 'We prioritize consistent product quality.',
      description: 'Zero chemical shortcuts. We test every single processing batch for Free Fatty Acids (FFA < 1.8%), moisture levels, and zero Sudan dyes. We set the standard for African culinary purity.',
      image: DROP_BOTTLE_NEW_IMAGE,
      icon: Shield,
      stat: '< 1.8% FFA',
      statLabel: 'Extra Grade Acidity',
      anim: 'animate-hover-float-1'
    },
    {
      title: 'TRUST',
      tagline: 'We build long-term relationships with customers.',
      description: 'From open market shoppers seeking safety to restaurant head chefs demanding batch-to-batch consistency, Drop is the name you can trust in every pot of soup you cook for your family.',
      image: MISSION_TRUST_IMAGE,
      icon: Heart,
      stat: '100%',
      statLabel: 'Tree-to-Bottle Traceability',
      anim: 'animate-hover-float-2'
    },
    {
      title: 'COMMUNITY',
      tagline: 'We create value for farmers and communities.',
      description: 'We do not engage in land grabbing. We partner directly with 450+ multi-generational smallholder farming families in Edo State, providing modern hydraulic presses and guaranteed premium purchase contracts.',
      image: PLANTATION_IMAGE,
      icon: Sprout,
      stat: '450+',
      statLabel: 'Grower Families Supported',
      anim: 'animate-hover-float-3'
    },
    {
      title: 'GROWTH',
      tagline: 'We aim to build a modern African food brand.',
      description: 'Showcasing the world-class wealth of African agriculture. Expanding our processing capacity, creating rural agro-processing careers for youth, and taking Nigerian culinary prestige across the globe.',
      image: EGUSI_SOUP_IMAGE,
      icon: TrendingUp,
      stat: 'Zero',
      statLabel: 'Solvent or Hexane Extraction',
      anim: 'animate-hover-float-2'
    },
  ];

  return (
    <div className="space-y-0 bg-[#FAF7F2]">
      
      {/* 1. Large Hero with Our Vision Image */}
      <section className="relative min-h-[500px] lg:min-h-[580px] flex items-center justify-center overflow-hidden border-b border-[#E8DFD5]">
        <img
          src={VISION_HERO_IMAGE}
          alt="Our Vision - Drop Palm Oil"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/S7tMrBNn/drop-22.png';
          }}
          referrerPolicy="no-referrer"
        />
        {/* Measured Scrim for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D2216] via-[#153823]/75 to-black/40" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-6 py-20">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E07A1E] bg-black/40 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/10">
            <span>Our Driving Philosophy</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            OUR VISION
          </h1>

          <p className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#F4EFEA] font-medium leading-relaxed max-w-2xl mx-auto italic">
            "To become a trusted African palm-oil brand known for quality, authenticity, and responsible production."
          </p>

          <p className="text-sm sm:text-base text-[#CAD9CA] max-w-xl mx-auto leading-relaxed">
            Redefining red palm oil from an untraceable, risk-laden open-market commodity into a celebrated, premium staple of modern African cuisine.
          </p>
        </div>
      </section>

      {/* 2. OUR MISSION SECTION */}
      <section className="py-16 md:py-24 bg-[#FAF7F2] border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B85D0D]">
              Our Daily Mandate
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#153823] tracking-tight">
              OUR MISSION
            </h2>
            <p className="text-base sm:text-xl font-medium text-[#241F17] leading-relaxed">
              "To provide high-quality palm oil that brings authentic Nigerian flavour to homes, restaurants, and businesses while creating value throughout the palm-oil supply chain."
            </p>
          </div>

          {/* 4 Large Visual Pillars - Hovering Beautifully */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className={`hover-float-card ${pillar.anim} group bg-white rounded-3xl overflow-hidden border border-[#E0D7CC] hover:border-[#153823] hover:ring-2 hover:ring-[#E07A1E]/30 shadow-md hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 ease-out flex flex-col justify-between cursor-pointer`}
              >
                {/* Large Photograph */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-gradient-to-b from-[#FAF7F2] to-[#F4EFEA] flex items-center justify-center">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className={`w-full h-full ${idx === 0 || idx === 1 ? 'object-contain p-3' : 'object-cover'} group-hover:scale-105 transition-transform duration-700 ease-out`}
                    onError={(e) => {
                      if (idx === 0) {
                        (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/Pzmp6ykZ/drop2.png';
                      } else if (idx === 1) {
                        (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/3mbbSPT4/drop1.png';
                      }
                    }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Floating Pillar Name */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white z-10">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#E07A1E] block font-bold">
                        Pillar 0{idx + 1}
                      </span>
                      <h3 className="font-serif text-2xl font-bold">{pillar.title}</h3>
                    </div>

                    <div className="text-right bg-black/60 backdrop-blur-xs px-3.5 py-2 rounded-2xl border border-white/20 shadow-md group-hover:border-[#E07A1E] transition-colors">
                      <span className="font-bold text-base text-[#E07A1E] block tabular-nums">{pillar.stat}</span>
                      <span className="text-[10px] text-white/90">{pillar.statLabel}</span>
                    </div>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-8 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#153823] group-hover:text-[#B85D0D] transition-colors">
                      {pillar.tagline}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#5C554B] leading-relaxed mt-2">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between text-[11px]">
                    <span className="text-[#8C8274] font-medium">Core Brand Foundation</span>
                    <span className="text-[#E07A1E] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      Read Commitment →
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Sustainable Agroforestry Story */}
      <section className="py-16 md:py-20 bg-[#F4EFEA] border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B85D0D]">
                Agro-Ecological Stewardship
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#153823] tracking-tight">
                Rooted in Traditional African Agroforestry
              </h2>
              <p className="text-sm sm:text-base text-[#5C554B] leading-relaxed">
                Unlike industrial monoculture plantations that cause rainforest destruction, indigenous oil palms in Southern Nigeria have thrived for centuries in balanced agroforest mosaics alongside plantain, cassava, and wild timber.
              </p>
              <p className="text-sm sm:text-base text-[#5C554B] leading-relaxed">
                Drop works strictly within these existing agroforest ecosystems. By keeping smallholders at the heart of our harvesting network, we protect ancient biodiverse canopies while bringing sustainable prosperity to rural communities.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('products')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#153823] hover:bg-[#0D2216] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  <span>Taste The Authentic Difference</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0D7CC] shadow-md space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-xl font-bold text-[#153823]">
                    Our 2030 Community Commitments
                  </h4>
                  <span className="text-[11px] text-[#786E63] italic hidden sm:block">
                    Hover highlighted points
                  </span>
                </div>
                
                {/* Highlighted Points - Hovering Beautifully */}
                <div className="space-y-4 text-xs sm:text-sm">
                  
                  <div className="hover-float-card animate-hover-float-1 group p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD5] hover:border-[#153823] hover:ring-2 hover:ring-[#E07A1E]/30 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#153823] group-hover:bg-[#E07A1E] transition-colors" />
                    <div className="pl-3">
                      <strong className="text-[#153823] group-hover:text-[#B85D0D] block text-sm sm:text-base font-bold transition-colors">
                        1. 1,000 Smallholder Grower Network
                      </strong>
                      <span className="text-[#5C554B] block mt-1 leading-relaxed">
                        Expanding our cooperative to 1,000 family farms with guaranteed 15% above-market buying prices and direct agronomy support.
                      </span>
                    </div>
                  </div>

                  <div className="hover-float-card animate-hover-float-2 group p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD5] hover:border-[#153823] hover:ring-2 hover:ring-[#E07A1E]/30 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#153823] group-hover:bg-[#E07A1E] transition-colors" />
                    <div className="pl-3">
                      <strong className="text-[#153823] group-hover:text-[#B85D0D] block text-sm sm:text-base font-bold transition-colors">
                        2. 100% Clean Bio-energy Mill Operations
                      </strong>
                      <span className="text-[#5C554B] block mt-1 leading-relaxed">
                        Reusing empty fruit bunch biomass to power our steam boilers, achieving near-zero carbon emission processing.
                      </span>
                    </div>
                  </div>

                  <div className="hover-float-card animate-hover-float-3 group p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD5] hover:border-[#153823] hover:ring-2 hover:ring-[#E07A1E]/30 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#153823] group-hover:bg-[#E07A1E] transition-colors" />
                    <div className="pl-3">
                      <strong className="text-[#153823] group-hover:text-[#B85D0D] block text-sm sm:text-base font-bold transition-colors">
                        3. The Zero-Dye Nigerian Food Safety Initiative
                      </strong>
                      <span className="text-[#5C554B] block mt-1 leading-relaxed">
                        Providing free chemical test strips and education to local market traders to stamp out toxic dye adulteration across Nigeria.
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Complete Farm to Bottle Journey */}
      <FarmToBottle />

    </div>
  );
};
