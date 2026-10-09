import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, BookOpen, Gift, Bell, Sparkles } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="py-16 md:py-20 bg-[#FAF7F2] border-b border-[#E8DFD5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#153823] text-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#1C4B2F] shadow-2xl relative overflow-hidden">
          
          {/* Subtle palm leaf decorative background overlay */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#E07A1E]/10 blur-2xl pointer-events-none" />
          <div className="absolute -left-12 -top-12 w-64 h-64 rounded-full bg-[#318252]/20 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Copy */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E07A1E]">
                <Sparkles className="w-4 h-4 text-[#E07A1E]" />
                <span>Culinary Heritage & Updates</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                STAY IN THE LOOP
              </h2>

              <p className="text-sm sm:text-base text-[#CAD9CA] leading-relaxed max-w-xl">
                Get tested Nigerian recipes, traditional cooking secrets, fresh harvest announcements, and behind-the-scenes stories directly from our palm groves.
              </p>

              {/* What subscribers receive */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#E7F3EC]">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#E07A1E] shrink-0" />
                  <span>Curated recipe cards</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#E07A1E] shrink-0" />
                  <span>Harvest discounts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#E07A1E] shrink-0" />
                  <span>Zero spam ever</span>
                </div>
              </div>
            </div>

            {/* Subscription Form */}
            <div className="lg:col-span-5">
              {submitted ? (
                <div className="bg-[#1C4B2F] border border-[#25653F] p-6 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-[#E07A1E] mx-auto" />
                  <h4 className="font-serif text-lg font-bold text-white">Welcome To Our Kitchen!</h4>
                  <p className="text-xs text-[#CAD9CA]">
                    Check your inbox shortly for our complimentary "10 Traditional Nigerian Soups" digital cookbook guide.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-[#0D2216]/80 p-6 rounded-2xl border border-[#25653F] space-y-3 shadow-inner">
                  <label className="block text-xs font-semibold text-[#CAD9CA]">
                    Join 12,000+ Nigerian Food Lovers
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3 text-xs sm:text-sm bg-white text-[#241F17] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E07A1E] placeholder-[#8C8274]"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider bg-[#E07A1E] hover:bg-[#B85D0D] text-white rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-md"
                    >
                      <span>Subscribe</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[11px] text-[#A8BFA8]">
                    We respect your privacy. No marketing clutter, just good food.
                  </p>
                </form>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
