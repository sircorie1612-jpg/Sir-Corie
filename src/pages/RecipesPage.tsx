import React, { useState } from 'react';
import { RecipesSection } from '../components/RecipesSection';
import { RECIPES } from '../data/mockData';
import { Recipe } from '../types';
import { Flame, Clock, Users, ArrowRight, BookOpen, Lightbulb, ChefHat } from 'lucide-react';

interface RecipesPageProps {
  onShopOil: () => void;
}

export const RecipesPage: React.FC<RecipesPageProps> = ({ onShopOil }) => {
  return (
    <div className="py-12 md:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B85D0D]">
            <Flame className="w-4 h-4 text-[#E07A1E]" />
            <span>The Kitchen Companion</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#153823] tracking-tight">
            Cook With Us
          </h1>
          <p className="text-base text-[#5C554B] leading-relaxed">
            Step-by-step masterclasses for the most cherished Nigerian culinary dishes. Each recipe is developed to highlight the natural golden aroma, velvety texture, and vivid color of Drop Palm Oil.
          </p>
        </div>

        {/* Master Culinary Tips Banner */}
        <div className="bg-[#153823] text-white rounded-3xl p-8 sm:p-10 border border-[#1C4B2F] shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#E07A1E]/20 text-[#E07A1E] flex items-center justify-center">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold">The Palm Oil Masterclass</h3>
              <p className="text-xs text-[#CAD9CA]">3 essential rules from veteran Nigerian culinary masters</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="bg-[#0D2216]/60 p-5 rounded-2xl border border-[#25653F] space-y-2">
              <strong className="text-[#E07A1E] block font-serif text-base">1. Never Bleach for Soups</strong>
              <p className="text-[#CAD9CA] leading-relaxed">
                For Egusi, Ogbono, and Banga, keep the oil unbleached over low to medium heat. The red carotenoids provide both the iconic vibrant color and natural antioxidant richness.
              </p>
            </div>

            <div className="bg-[#0D2216]/60 p-5 rounded-2xl border border-[#25653F] space-y-2">
              <strong className="text-[#E07A1E] block font-serif text-base">2. Controlled Bleaching for Ofada</strong>
              <p className="text-[#CAD9CA] leading-relaxed">
                When bleaching for Ayamase, always keep the pot tightly covered on low flame for 10-12 minutes. Never open until fully cooled to avoid noxious smoke or oil flares.
              </p>
            </div>

            <div className="bg-[#0D2216]/60 p-5 rounded-2xl border border-[#25653F] space-y-2">
              <strong className="text-[#E07A1E] block font-serif text-base">3. Sauté Onions for Sweetness</strong>
              <p className="text-[#CAD9CA] leading-relaxed">
                Slowly sweating red onions in Drop Palm Oil creates natural sweet caramel compounds that meld into beans (Ewa Riro) and concoction rice.
              </p>
            </div>
          </div>
        </div>

        {/* Recipes Grid Component */}
        <RecipesSection onShopOil={onShopOil} />

        {/* Community Recipe Submission Card */}
        <div className="bg-white rounded-3xl p-8 border border-[#E0D7CC] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-2 max-w-xl">
            <h4 className="font-serif text-2xl font-bold text-[#153823]">
              Have a Treasured Family Palm Oil Recipe?
            </h4>
            <p className="text-xs sm:text-sm text-[#5C554B]">
              Share your mother's secret soup technique with our cooking community and get featured in our next harvest newsletter plus a free 2L bottle of Drop!
            </p>
          </div>

          <a
            href="mailto:pucofoodsofficial@gmail.com?subject=My%20Family%20Palm%20Oil%20Recipe"
            className="px-6 py-3.5 bg-[#153823] hover:bg-[#0D2216] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-sm"
          >
            Submit A Recipe (Gmail)
          </a>
        </div>

      </div>
    </div>
  );
};
