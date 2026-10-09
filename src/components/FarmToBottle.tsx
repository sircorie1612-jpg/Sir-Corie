import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import {
  FARM_TO_BOTTLE_STEPS,
  PLANTATION_IMAGE,
  HARVEST_BUNCHES_IMAGE,
  MILL_PROCESSING_IMAGE,
  DROP_BOTTLE_NEW_IMAGE,
  EGUSI_SOUP_IMAGE
} from '../data/mockData';

export const FarmToBottle: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const current = FARM_TO_BOTTLE_STEPS[activeStep] || FARM_TO_BOTTLE_STEPS[0];
  const isBottleStep = activeStep === 3 || current.number === '05';

  return (
    <section className="py-16 md:py-24 bg-[#FAF7F2] border-b border-[#E8DFD5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B85D0D]">
            <span>Complete Traceability</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#153823] tracking-tight text-balance">
            From Farm to Bottle to Your Kitchen
          </h2>
          <p className="text-sm sm:text-base text-[#5C554B] leading-relaxed">
            Every drop of our palm oil carries a transparent story of care, artisanal stewardship, and scientific rigor. Here is how your oil journeys to your table.
          </p>
        </div>

        {/* Horizontal Steps Nav / Stepper Bar for 4 production phases */}
        <div className="relative mb-8">
          <div className="hidden lg:grid grid-cols-4 gap-4 border-b border-[#E0D7CC] pb-4">
            {FARM_TO_BOTTLE_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`text-left p-4 rounded-2xl transition-all duration-300 cursor-pointer group ${
                    isActive
                      ? 'bg-white border-2 border-[#153823] shadow-md -translate-y-1'
                      : 'hover:bg-white/80 border border-transparent hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-mono font-bold block ${isActive ? 'text-[#E07A1E]' : 'text-[#8C8274]'}`}>
                      {step.phaseLabel || `Phase ${step.number}`}
                    </span>
                    {idx === 3 && (
                      <span className="text-[9px] font-bold uppercase bg-[#E7F3EC] text-[#153823] px-2 py-0.5 rounded-full">
                        Drop Bottle
                      </span>
                    )}
                  </div>
                  <span className={`text-sm font-bold block ${isActive ? 'text-[#153823]' : 'text-[#5C554B]'}`}>
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile Step Navigator */}
          <div className="flex lg:hidden items-center justify-between bg-white p-3.5 rounded-2xl border border-[#E0D7CC] mb-4 shadow-sm">
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className="p-2 rounded-lg text-[#153823] disabled:opacity-30 cursor-pointer"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-center">
              <span className="text-xs font-mono font-bold text-[#E07A1E]">
                {current.phaseLabel || `Phase ${current.number}`} of 04
              </span>
              <p className="text-sm font-bold text-[#153823]">{current.title}</p>
            </div>
            <button
              onClick={() => setActiveStep(Math.min(FARM_TO_BOTTLE_STEPS.length - 1, activeStep + 1))}
              disabled={activeStep === FARM_TO_BOTTLE_STEPS.length - 1}
              className="p-2 rounded-lg text-[#153823] disabled:opacity-30 cursor-pointer"
              aria-label="Next step"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Step Spotlight Card - Hovering beautifully */}
        <div className="hover-float-card group bg-white rounded-3xl border border-[#E0D7CC] hover:border-[#153823] hover:ring-2 hover:ring-[#E07A1E]/30 shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Visual slot */}
          <div className="lg:col-span-6 relative h-72 sm:h-80 lg:h-[440px] bg-gradient-to-b from-[#FAF7F2] to-[#F4EFEA] overflow-hidden flex items-center justify-center p-2">
            <img
              src={current.image}
              alt={current.title}
              className={`w-full h-full ${isBottleStep ? 'object-contain p-6 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]' : 'object-cover'} group-hover:scale-105 transition-transform duration-700 ease-out`}
              onError={(e) => {
                if (isBottleStep) {
                  (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/Pzmp6ykZ/drop2.png';
                }
              }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute top-4 left-4 bg-[#153823] text-white text-xs font-bold px-3 py-1 rounded-md shadow-md z-10 flex items-center gap-1.5">
              <span>{current.badge}</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white z-10">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#E07A1E] block">
                {current.phaseLabel || `Phase ${current.number}`}
              </span>
              <h3 className="font-serif text-2xl font-bold">
                {current.title}
              </h3>
            </div>
          </div>

          {/* Editorial slot */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B85D0D]">
                <span>Phase Description</span>
                <span aria-hidden="true">·</span>
                <span>Verified Traceability</span>
              </div>

              <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#153823]">
                {current.shortDesc}
              </h4>

              <p className="text-sm sm:text-base text-[#5C554B] leading-relaxed">
                {current.details}
              </p>

              <div className="pt-2 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#153823]">
                  <CheckCircle2 className="w-4 h-4 text-[#E07A1E] shrink-0" />
                  <span>Harvested at optimal ripeness to minimize free fatty acids</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#153823]">
                  <CheckCircle2 className="w-4 h-4 text-[#E07A1E] shrink-0" />
                  <span>Zero industrial additives, zero artificial dyes, and zero dilution</span>
                </div>
              </div>
            </div>

            {/* Step navigation controls */}
            <div className="pt-6 border-t border-[#E8DFD5] flex items-center justify-between">
              <div className="flex items-center gap-2">
                {FARM_TO_BOTTLE_STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeStep === i ? 'w-8 bg-[#153823]' : 'w-2 bg-[#D5C6B5] hover:bg-[#8C8274]'
                    }`}
                    aria-label={`Go to phase ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveStep((activeStep + 1) % FARM_TO_BOTTLE_STEPS.length)}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#153823] hover:text-[#B85D0D] transition-colors cursor-pointer group/btn"
              >
                <span>Next Phase</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
