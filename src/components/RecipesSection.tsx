import React, { useState } from 'react';
import { Clock, Users, ChefHat, ArrowRight, X, Check, ShoppingBag, Flame } from 'lucide-react';
import { RECIPES } from '../data/mockData';
import { Recipe } from '../types';

interface RecipesSectionProps {
  onShopOil: () => void;
}

const RECIPE_FALLBACK_IMAGES: Record<string, string> = {
  'ofada-stew': 'https://i.ibb.co/n8Pz2Srw/RED-OIL-STEW.png',
  'native-rice': 'https://i.ibb.co/TDvpvLcS/FISH-STEW.png',
  'banga-soup': 'https://i.ibb.co/vvK25d6f/ofe-akwu-3.png',
};

export const RecipesSection: React.FC<RecipesSectionProps> = ({ onShopOil }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

  const toggleIngredient = (ing: string) => {
    setCheckedIngredients(prev => ({ ...prev, [ing]: !prev[ing] }));
  };

  return (
    <section className="py-16 md:py-24 bg-[#FAF7F2] border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B85D0D]">
              <Flame className="w-4 h-4 text-[#E07A1E]" />
              <span>Nigerian Culinary Masterclasses</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#153823] tracking-tight">
              Cook With Us
            </h2>
            <p className="text-sm sm:text-base text-[#5C554B]">
              Discover authentic Nigerian delicacies that come alive with the nutty fragrance and deep golden red finish of Drop Palm Oil.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-[#8C8274] block">Tested by Nigerian home cooks & chefs</span>
          </div>
        </div>

        {/* Recipe Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {RECIPES.map((recipe) => (
            <div
              key={recipe.id}
              className="group bg-white rounded-2xl border border-[#E0D7CC] hover:border-[#153823]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Recipe Food Photography */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-[#F4EFEA]">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  onError={(e) => {
                    const fb = RECIPE_FALLBACK_IMAGES[recipe.id];
                    if (fb) (e.currentTarget as HTMLImageElement).src = fb;
                  }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Category & Difficulty */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#153823] text-white px-2.5 py-1 rounded-md">
                    {recipe.category}
                  </span>
                  <span className="text-[10px] font-semibold bg-white/90 text-[#241F17] px-2 py-0.5 rounded-md">
                    {recipe.difficulty}
                  </span>
                </div>

                {/* Timing Badge on Bottom Right of Image */}
                <div className="absolute bottom-3 right-3 text-white text-xs font-semibold flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md">
                  <Clock className="w-3.5 h-3.5 text-[#E07A1E]" />
                  <span>{recipe.cookTime}</span>
                </div>
              </div>

              {/* Recipe Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#153823] group-hover:text-[#B85D0D] transition-colors leading-snug">
                    {recipe.title}
                  </h3>

                  <p className="text-xs text-[#5C554B] mt-2 line-clamp-3 leading-relaxed">
                    {recipe.summary}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[#F0EBE1] flex items-center justify-between text-xs text-[#786E63]">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#E07A1E]" />
                      <span>{recipe.servings}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#B85D0D] font-medium">
                      <span>Uses: {recipe.oilQuantity}</span>
                    </div>
                  </div>
                </div>

                {/* View Recipe Button */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSelectedRecipe(recipe);
                      setCheckedIngredients({});
                    }}
                    className="w-full inline-flex items-center justify-between px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#153823] bg-[#E7F3EC] hover:bg-[#D5EADF] rounded-xl transition-colors cursor-pointer group/btn"
                  >
                    <span>View Recipe</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="relative bg-[#FAF7F2] rounded-3xl max-w-3xl w-full border border-[#E8DFD5] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 text-[#153823] hover:bg-[#153823] hover:text-white shadow-md transition-colors cursor-pointer"
              aria-label="Close recipe modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              
              {/* Header with image */}
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-[#E0D7CC]">
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const fb = RECIPE_FALLBACK_IMAGES[selectedRecipe.id];
                    if (fb) (e.currentTarget as HTMLImageElement).src = fb;
                  }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#E07A1E]">
                    {selectedRecipe.category} · {selectedRecipe.difficulty}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
                    {selectedRecipe.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-xs text-white/90">
                    <span>Prep: {selectedRecipe.prepTime}</span>
                    <span>·</span>
                    <span>Cook: {selectedRecipe.cookTime}</span>
                    <span>·</span>
                    <span>Yield: {selectedRecipe.servings}</span>
                  </div>
                </div>
              </div>

              {/* Chef Tip Callout */}
              <div className="bg-[#E7F3EC] border border-[#C5E2D1] rounded-2xl p-4 flex items-start gap-3">
                <ChefHat className="w-5 h-5 text-[#153823] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#153823]">
                    Chef's Palm Oil Technique
                  </h4>
                  <p className="text-xs sm:text-sm text-[#25653F] mt-1 leading-relaxed">
                    {selectedRecipe.chefTip}
                  </p>
                </div>
              </div>

              {/* Ingredients Checklist */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-bold text-[#153823]">
                    Ingredients Checklist
                  </h4>
                  <span className="text-xs font-semibold text-[#B85D0D]">
                    Required: {selectedRecipe.oilQuantity}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedRecipe.ingredients.map((ing, i) => {
                    const isChecked = !!checkedIngredients[ing];
                    return (
                      <div
                        key={i}
                        onClick={() => toggleIngredient(ing)}
                        className={`p-2.5 rounded-xl border text-xs flex items-center gap-2.5 cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-[#E7F3EC] border-[#C5E2D1] text-[#153823] line-through opacity-80'
                            : 'bg-white border-[#E0D7CC] text-[#241F17] hover:border-[#153823]'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-[#153823] border-[#153823] text-white' : 'border-[#A89F91]'
                        }`}>
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span>{ing}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="space-y-4">
                <h4 className="font-serif text-lg font-bold text-[#153823]">
                  Preparation Instructions
                </h4>

                <ol className="space-y-3 text-xs sm:text-sm text-[#484238]">
                  {selectedRecipe.instructions.map((step, idx) => (
                    <li key={idx} className="flex gap-3 bg-white p-3.5 rounded-xl border border-[#E0D7CC]">
                      <span className="w-6 h-6 rounded-full bg-[#153823] text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed flex-1">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Bottom CTA to buy oil */}
              <div className="pt-4 border-t border-[#E8DFD5] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-[#153823]">Ready to prepare this dish?</p>
                  <p className="text-xs text-[#786E63]">Order pure Drop Palm Oil delivered straight to your door.</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedRecipe(null);
                    onShopOil();
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#153823] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#0D2216] transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop Drop Palm Oil</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
