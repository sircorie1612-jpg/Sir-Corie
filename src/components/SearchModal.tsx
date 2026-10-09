import React, { useState } from 'react';
import { X, Search, ArrowRight, Utensils, ShoppingBag } from 'lucide-react';
import { PRODUCTS, RECIPES } from '../data/mockData';
import { Product, Recipe } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products?: Product[];
  onSelectProduct: (product: Product) => void;
  onSelectRecipe: (recipe: Recipe) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products = PRODUCTS,
  onSelectProduct,
  onSelectRecipe,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.tagline.toLowerCase().includes(query.toLowerCase()) ||
    p.size.toLowerCase().includes(query.toLowerCase())
  );

  const filteredRecipes = RECIPES.filter(r =>
    r.title.toLowerCase().includes(query.toLowerCase()) ||
    r.category.toLowerCase().includes(query.toLowerCase()) ||
    r.summary.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-24 animate-in fade-in duration-200">
      <div className="relative bg-[#FAF7F2] rounded-3xl max-w-2xl w-full border border-[#E8DFD5] shadow-2xl overflow-hidden p-6 space-y-4">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-[#8C8274] absolute left-3.5" />
          <input
            type="text"
            autoFocus
            placeholder="Search products (1L, 5L, 25L) or dishes (Egusi, Banga, Ofada)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3.5 bg-white border border-[#D5C6B5] rounded-2xl text-sm text-[#153823] focus:outline-none focus:border-[#153823] placeholder-[#8C8274]"
          />
          <button
            onClick={onClose}
            className="absolute right-3 p-1.5 text-[#8C8274] hover:text-[#153823] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto space-y-6 pt-2">
          {/* Products Result */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#153823] flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-[#E07A1E]" />
              <span>Products ({filteredProducts.length})</span>
            </h4>
            
            {filteredProducts.length === 0 ? (
              <p className="text-xs text-[#8C8274] italic">No matching products found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredProducts.map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className="p-3 bg-white rounded-xl border border-[#E0D7CC] hover:border-[#153823] flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <p className="font-serif font-bold text-xs text-[#153823]">{p.name}</p>
                      <p className="text-[11px] text-[#786E63] tabular-nums">₦{p.priceNgn.toLocaleString()} · {p.size}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#B85D0D]" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recipes Result */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#153823] flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-[#E07A1E]" />
              <span>Recipes ({filteredRecipes.length})</span>
            </h4>
            
            {filteredRecipes.length === 0 ? (
              <p className="text-xs text-[#8C8274] italic">No matching recipes found.</p>
            ) : (
              <div className="space-y-2">
                {filteredRecipes.map(r => (
                  <div
                    key={r.id}
                    onClick={() => {
                      onSelectRecipe(r);
                      onClose();
                    }}
                    className="p-3 bg-white rounded-xl border border-[#E0D7CC] hover:border-[#153823] flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <p className="font-serif font-bold text-xs text-[#153823]">{r.title}</p>
                      <p className="text-[11px] text-[#786E63]">{r.category} · {r.cookTime}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#B85D0D]" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
