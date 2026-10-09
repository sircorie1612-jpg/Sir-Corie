import React from 'react';
import { DROP_ABOUT_OIL_IMAGE, DROP_LOGO_IMAGE, PLANTATION_IMAGE, STUDIO_BOTTLE_IMAGE } from '../data/mockData';
import { ArrowRight, CheckCircle2, ShieldCheck, HeartHandshake, Sparkles, Award } from 'lucide-react';

interface AboutPageProps {
  setActiveTab: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-0 bg-[#FAF7F2]">
      
      {/* 1. Hero with the new Palm Oil image from https://ibb.co/Mk15cz7p */}
      <section className="relative min-h-[480px] lg:min-h-[540px] flex items-center justify-center overflow-hidden border-b border-[#E8DFD5]">
        <img
          src={DROP_ABOUT_OIL_IMAGE}
          alt="Drop Palm Oil - Pure Authentic Nigerian Palm Oil"
          className="absolute inset-0 w-full h-full object-cover object-center"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/CK9sbjQv/drop1.png';
          }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D2216] via-[#153823]/85 to-black/50" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-5 py-20">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E07A1E] bg-black/40 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/10">
            <img
              src={DROP_LOGO_IMAGE}
              alt="Drop"
              className="w-4 h-4 object-contain inline-block"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/Y7vQLWph/Whats-App-Image-2026-09-28-at-5-17-47-PM-1-removebg-preview.png';
              }}
            />
            <span>Our Founding Story</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            MORE THAN PALM OIL. <br />
            <span className="italic text-[#E07A1E]">IT'S A PART OF WHO WE ARE.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#CAD9CA] max-w-xl mx-auto leading-relaxed">
            Born from a personal quest to restore purity and pride to the golden oil that anchors our mothers' cooking.
          </p>
        </div>
      </section>

      {/* 2. Narrative Section: Where We Started & Why We Started */}
      <section className="py-16 md:py-24 bg-[#FAF7F2] border-b border-[#E8DFD5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B85D0D]">
              Chapter 01 · The Turning Point
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#153823]">
              The Crisis in the Open Market
            </h2>
            <div className="prose text-sm sm:text-base text-[#484238] leading-relaxed space-y-4">
              <p>
                In 2021, a concerning health headline spread across Nigeria: lab tests conducted by university researchers on open-market palm oil in Lagos, Onitsha, and Abuja revealed widespread adulteration. To maximize weight and give stale or rancid fats a misleadingly radiant red color, unscrupulous traders were blending hazardous industrial dyes—most notoriously <strong>Sudan IV</strong>, a known carcinogen banned globally in food production.
              </p>
              <p>
                For our founder, this was not just an agricultural scandal; it struck at the heart of home and family. Like millions of Nigerians, every joyful weekend began with the sound of red oil simmering in a pot—for Egusi, Banga, Ayamase, and Native Jollof. How could mothers feed their children with oil whose origins they could no longer verify?
              </p>
            </div>
          </div>

          {/* Visual Break with Quote */}
          <div className="bg-[#153823] text-white p-8 sm:p-10 rounded-3xl border border-[#1C4B2F] shadow-lg relative overflow-hidden">
            <p className="font-serif text-xl sm:text-2xl italic leading-relaxed text-[#F4EFEA]">
              "If you cannot trust the oil in your pot, you cannot celebrate your culture with pride. We built Drop Palm Oil to make sure every family knows exactly which tree their food came from."
            </p>
            <p className="text-xs font-semibold text-[#E07A1E] uppercase tracking-wider mt-4">
              — The Drop Palm Oil Founding Team
            </p>
          </div>

          {/* Featured Bottle Showcase Card with the new Palm Oil image */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-3xl border border-[#E0D7CC] shadow-md">
            <div className="md:col-span-5 relative flex items-center justify-center p-6 bg-[#FAF7F2] rounded-2xl border border-[#F0EBE1] overflow-hidden group">
              <img
                src={DROP_ABOUT_OIL_IMAGE}
                alt="Drop Palm Oil Signature Bottle"
                className="max-h-72 w-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 ease-out"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/CK9sbjQv/drop1.png';
                }}
              />
              <div className="absolute top-3 left-3 bg-[#153823] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                Authentic Bottle
              </div>
            </div>
            
            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B85D0D]">
                <span>Pure Product Standard</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#153823]">
                The Bottle That Restored Purity
              </h3>
              <p className="text-xs sm:text-sm text-[#484238] leading-relaxed">
                Every bottle of Drop Palm Oil is filled with virgin, steam-pressed red palm oil. Retaining high concentrations of natural beta-carotenes and Vitamin E without synthetic dyes, heavy residues, or artificial fragrances.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-semibold text-[#153823]">
                <span className="bg-[#E7F3EC] px-2.5 py-1 rounded-md">Zero Sudan Dye</span>
                <span className="bg-[#E7F3EC] px-2.5 py-1 rounded-md">100% Unadulterated</span>
                <span className="bg-[#E7F3EC] px-2.5 py-1 rounded-md">&lt; 1.8% FFA</span>
              </div>
            </div>
          </div>

          {/* Chapter 02 · Rebuilding The Chain */}
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B85D0D]">
              Chapter 02 · The Solution
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#153823]">
              Rebuilding The Chain
            </h2>

            <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-[#E0D7CC] space-y-6">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#153823] mb-3">
                  Why This Must Stop
                </h3>
                <p className="text-sm sm:text-base text-[#484238] leading-relaxed mb-3">
                  The cost of adulteration is not only personal. It is a slow drain on trust, health systems, and a national industry that Nigeria can not afford to keep bleeding.
                </p>
                <p className="text-sm sm:text-base text-[#484238] leading-relaxed">
                  It would be easy to treat palm oil adulteration as one more inconvenience in a difficult economy. It is not. It is a public health emergency wearing the disguise of a grocery item, and it deserves to be treated with the same urgency as any other threat to the food supply.
                </p>
              </div>

              <div className="border-t border-[#E8DFD5] pt-5 space-y-4">
                <div className="p-4 bg-white rounded-2xl border border-[#E8DFD5]">
                  <h4 className="font-serif text-base font-bold text-[#153823] mb-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E07A1E]" />
                    A Tax on Trust
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5C554B] leading-relaxed">
                    Every adulterated bottle sold chips away at something larger than one family's health. It chips away at trust, in the market trader, in the supply chain, in the idea that food sold in good faith is actually what it claims to be. Once that trust breaks down, everyone pays for it, including the honest farmers and processors who never cut corners, yet now compete against cheaper, faked product and watch buyers grow suspicious of the entire category.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-[#E8DFD5]">
                  <h4 className="font-serif text-base font-bold text-[#153823] mb-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E07A1E]" />
                    A Burden the Health System Did Not Budget For
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5C554B] leading-relaxed">
                    Every case of liver damage, every emergency visit for chest pain or sudden illness traced back to contaminated cooking oil, lands on a health system already stretched thin. What looks like a bargain at the market becomes a far more expensive bill later, paid in hospital fees, lost workdays, and in the worst cases, lives that did not need to be lost at all.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-[#E8DFD5]">
                  <h4 className="font-serif text-base font-bold text-[#153823] mb-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E07A1E]" />
                    A Threat to Food Security and National Reputation
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5C554B] leading-relaxed">
                    Palm oil is one of Nigeria's most important agricultural products, feeding households and generating income for farmers and exporters alike. Industry leaders have warned that the adulteration crisis is already damaging the country's reputation as a reliable source of palm produce, at real cost to an economy that can not afford it.
                  </p>
                </div>
              </div>

              <div className="bg-[#153823] text-white p-5 sm:p-6 rounded-2xl space-y-3">
                <p className="text-xs sm:text-sm text-[#CAD9CA] leading-relaxed">
                  Stopping this requires more than complaints. It requires regulators enforcing the standards already on the books, traders held accountable for what they sell, and consumers who know how to protect themselves while that enforcement catches up.
                </p>
                <p className="text-xs sm:text-sm font-semibold text-[#E07A1E] leading-relaxed">
                  But it also requires something more immediate: a trustworthy alternative that people can choose right now, without waiting for the whole system to fix itself.
                </p>
              </div>
            </div>
          </div>

          {/* 3 Pillars of Quality: SCIENTIFIC PURITY, FARMER PROSPERITY, CULINARY PRIDE (Hovering & Floating) */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B85D0D]">
                Our Three Unshakable Pillars
              </span>
              <span className="text-[11px] text-[#786E63] italic hidden sm:block">
                Hover to explore each pillar
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Pillar 1: Scientific Purity */}
              <div className="hover-float-card animate-hover-float-1 group p-6 rounded-2xl bg-white border border-[#E0D7CC] shadow-md hover:shadow-2xl hover:border-[#153823] hover:ring-2 hover:ring-[#E07A1E]/30 transition-all duration-500 ease-out cursor-pointer flex flex-col justify-between space-y-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#153823] to-[#E07A1E] opacity-70 group-hover:opacity-100 group-hover:h-1.5 transition-all" />
                
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-[#E7F3EC] flex items-center justify-center group-hover:bg-[#153823] transition-colors duration-300">
                    <ShieldCheck className="w-6 h-6 text-[#153823] group-hover:text-[#E07A1E] group-hover:scale-115 group-hover:rotate-6 transition-transform duration-300" />
                  </div>
                  
                  <h4 className="font-serif font-bold text-lg text-[#153823] group-hover:text-[#B85D0D] transition-colors">
                    Scientific Purity
                  </h4>

                  <div className="w-8 h-0.5 bg-[#E07A1E] group-hover:w-16 transition-all duration-300 rounded-full" />
                  
                  <p className="text-xs sm:text-sm text-[#5C554B] leading-relaxed">
                    Independent chemical validation for zero chemical dyes, minimal moisture (&lt;0.12%), and high thermal resilience up to 232°C.
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F0EBE1] flex items-center justify-between text-[11px]">
                  <span className="font-mono font-bold text-[#153823]">0% Sudan Dyes</span>
                  <span className="text-[#B85D0D] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Lab Verified →
                  </span>
                </div>
              </div>

              {/* Pillar 2: Farmer Prosperity */}
              <div className="hover-float-card animate-hover-float-2 group p-6 rounded-2xl bg-white border border-[#E0D7CC] shadow-md hover:shadow-2xl hover:border-[#153823] hover:ring-2 hover:ring-[#E07A1E]/30 transition-all duration-500 ease-out cursor-pointer flex flex-col justify-between space-y-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#153823] to-[#E07A1E] opacity-70 group-hover:opacity-100 group-hover:h-1.5 transition-all" />
                
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-[#E7F3EC] flex items-center justify-center group-hover:bg-[#153823] transition-colors duration-300">
                    <HeartHandshake className="w-6 h-6 text-[#153823] group-hover:text-[#E07A1E] group-hover:scale-115 group-hover:rotate-6 transition-transform duration-300" />
                  </div>
                  
                  <h4 className="font-serif font-bold text-lg text-[#153823] group-hover:text-[#B85D0D] transition-colors">
                    Farmer Prosperity
                  </h4>

                  <div className="w-8 h-0.5 bg-[#E07A1E] group-hover:w-16 transition-all duration-300 rounded-full" />
                  
                  <p className="text-xs sm:text-sm text-[#5C554B] leading-relaxed">
                    Guaranteed harvest purchase contracts that pay smallholders above fluctuating spot-market rates with sustainable agroforestry training.
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F0EBE1] flex items-center justify-between text-[11px]">
                  <span className="font-mono font-bold text-[#153823]">450+ Families</span>
                  <span className="text-[#B85D0D] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Fair Trade →
                  </span>
                </div>
              </div>

              {/* Pillar 3: Culinary Pride */}
              <div className="hover-float-card animate-hover-float-3 group p-6 rounded-2xl bg-white border border-[#E0D7CC] shadow-md hover:shadow-2xl hover:border-[#153823] hover:ring-2 hover:ring-[#E07A1E]/30 transition-all duration-500 ease-out cursor-pointer flex flex-col justify-between space-y-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#153823] to-[#E07A1E] opacity-70 group-hover:opacity-100 group-hover:h-1.5 transition-all" />
                
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-[#E7F3EC] flex items-center justify-center group-hover:bg-[#153823] transition-colors duration-300">
                    <Sparkles className="w-6 h-6 text-[#153823] group-hover:text-[#E07A1E] group-hover:scale-115 group-hover:rotate-6 transition-transform duration-300" />
                  </div>
                  
                  <h4 className="font-serif font-bold text-lg text-[#153823] group-hover:text-[#B85D0D] transition-colors">
                    Culinary Pride
                  </h4>

                  <div className="w-8 h-0.5 bg-[#E07A1E] group-hover:w-16 transition-all duration-300 rounded-full" />
                  
                  <p className="text-xs sm:text-sm text-[#5C554B] leading-relaxed">
                    Honoring Nigerian food traditions with an ingredient packaged cleanly enough for the world's most prestigious dining rooms and everyday pots.
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F0EBE1] flex items-center justify-between text-[11px]">
                  <span className="font-mono font-bold text-[#153823]">Taste Of Home</span>
                  <span className="text-[#B85D0D] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Our Promise →
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Chapter 03 · Where We Are Headed, The Drop Oil Promise */}
          <div className="space-y-6 pt-6 border-t border-[#E8DFD5]">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B85D0D]">
              Chapter 03 · The Commitment
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#153823]">
              WHERE WE ARE HEADED, THE DROP OIL PROMISE
            </h2>

            <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-[#E0D7CC] space-y-6">
              
              {/* Introduction Banner */}
              <div className="border-b border-[#E8DFD5] pb-5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#153823] mb-2">
                  The DROP PALM OIL Promise
                </h3>
                <p className="text-sm sm:text-base text-[#484238] leading-relaxed">
                  A trusted standard for a market that has lost its way, from a producer built on leaving nothing hidden in the bottle. <strong>This is where DROP PALM OIL comes in.</strong>
                </p>
              </div>

              {/* PUCO Food & Farm Ltd Foundation */}
              <div className="p-5 bg-white rounded-2xl border border-[#E8DFD5] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B85D0D]">
                  Produced by PUCO Food & Farm Ltd
                </span>
                <p className="text-sm text-[#484238] leading-relaxed">
                  <strong>DROP PALM OIL</strong>, produced by <strong>PUCO Food & Farm Ltd</strong>, exists because families deserve to trust what they pour into the pot. No water added to stretch the volume. No industrial dye added to fake the colour. No transformer fluid, no lard, no shortcuts of any kind. Just palm oil, processed the way palm oil is meant to be processed.
                </p>
              </div>

              {/* From fruit to bottle, nothing hidden */}
              <div className="p-5 bg-white rounded-2xl border border-[#E8DFD5] space-y-2">
                <h4 className="font-serif text-base font-bold text-[#153823]">
                  From Fruit to Bottle, Nothing Hidden
                </h4>
                <p className="text-xs sm:text-sm text-[#5C554B] leading-relaxed">
                  Every batch of DROP PALM OIL is traceable back to its source. We process under strict quality control, in hygienic conditions, so that the deep natural red on your shelf is the colour palm fruit actually produces, not a colour manufactured by a chemical additive. What you see in the bottle is what nature put in the fruit, nothing more.
                </p>
              </div>

              {/* A brand built on what it leaves out */}
              <div className="p-5 bg-white rounded-2xl border border-[#E8DFD5] space-y-2">
                <h4 className="font-serif text-base font-bold text-[#153823]">
                  A Brand Built on What It Leaves Out
                </h4>
                <p className="text-xs sm:text-sm text-[#5C554B] leading-relaxed">
                  In a market where adulteration has become common enough to expect, DROP PALM OIL is built on a simple promise: honesty in every litre. That means no compromise on purity, no cutting corners to chase a lower price, and no substance in the bottle that was not meant to be eaten.
                </p>
              </div>

              {/* The choice in your hands */}
              <div className="p-5 bg-[#E7F3EC] rounded-2xl border border-[#C5E2D1] space-y-2">
                <h4 className="font-serif text-base font-bold text-[#153823]">
                  The Choice in Your Hands
                </h4>
                <p className="text-xs sm:text-sm text-[#25653F] leading-relaxed">
                  You cannot personally inspect every mill, trader, or market stall selling palm oil across Nigeria. But you can choose, every time you shop, to put a trusted name in your basket instead of a gamble.
                </p>
                <p className="text-xs sm:text-sm text-[#25653F] leading-relaxed">
                  Choosing DROP PALM OIL is choosing to take adulteration off your own table, one bottle at a time, and to support a producer that built its name on doing this the right way.
                </p>
              </div>

              {/* Conclusion Callout */}
              <div className="bg-[#153823] text-white p-5 sm:p-6 rounded-2xl">
                <p className="text-xs sm:text-sm font-medium leading-relaxed text-[#CAD9CA]">
                  The adulteration crisis will not end with one article, one brand, or one purchase. It will end when enough households refuse to accept it, and when trusted alternatives become the obvious, easy choice. <strong className="text-[#E07A1E]">That change starts at the point of purchase, and it starts today.</strong>
                </p>
              </div>

            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setActiveTab('products')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#153823] hover:bg-[#0D2216] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
              >
                <span>Shop Our Palm Oil</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('recipes')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#EAE2D7] hover:bg-[#DECFC0] text-[#153823] text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                <span>Explore Recipes</span>
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
