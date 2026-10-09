import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#F4EFEA] border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B85D0D]">
            <span>Trusted in Thousands of Pots</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#153823] tracking-tight">
            Loved By Chefs, Mothers & Caterers
          </h2>
          <p className="text-sm sm:text-base text-[#5C554B]">
            From bustling buka kitchens in Lagos to family dinner tables in Abuja and London, see what people say when they taste pure Nigerian honesty.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-2xl p-6 border border-[#E0D7CC] shadow-xs flex flex-col justify-between space-y-4 hover:shadow-lg transition-shadow"
            >
              <div className="space-y-3">
                {/* Star rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-[#E07A1E]">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#E0D7CC]" />
                </div>

                {/* Content */}
                <p className="text-xs sm:text-sm text-[#484238] leading-relaxed italic">
                  "{test.content}"
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-3 border-t border-[#F0EBE1] space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif font-bold text-sm text-[#153823]">{test.name}</span>
                  {test.verifiedPurchase && (
                    <span title="Verified Buyer" className="inline-flex">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#786E63] font-medium">{test.role}</p>
                <p className="text-[10px] text-[#A89F91]">{test.location}</p>
                <div className="mt-1 text-[10px] text-[#B85D0D] font-medium">
                  Signature Dish: {test.favoriteDish}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
