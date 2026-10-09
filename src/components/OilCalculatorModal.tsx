import React, { useState } from 'react';
import { X, Calculator, Plus, Check } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { Product } from '../types';

interface OilCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const OilCalculatorModal: React.FC<OilCalculatorModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const [dish, setDish] = useState<'egusi' | 'banga' | 'ofada' | 'rice' | 'mixed'>('egusi');
  const [guests, setGuests] = useState<number>(30);
  const [added, setAdded] = useState(false);

  // Litres per guest estimate based on standard Nigerian culinary formulas
  const dishFactors: Record<string, number> = {
    egusi: 0.035, // ~35ml per serving of soup
    banga: 0.05,  // ~50ml for rich Delta Banga
    ofada: 0.045, // ~45ml for designer Ayamase
    rice: 0.025,  // ~25ml for native jollof
    mixed: 0.04,  // average across multiple dishes
  };

  const calculatedLiters = Math.ceil(guests * (dishFactors[dish] || 0.035) * 10) / 10;

  // Determine best product recommendation
  let recommendedProduct = PRODUCTS[0]; // 1L
  let recommendedQty = 1;

  if (calculatedLiters <= 1.2) {
    recommendedProduct = PRODUCTS.find(p => p.id === 'drop-palm-oil-1l') || PRODUCTS[0];
    recommendedQty = 1;
  } else if (calculatedLiters <= 2.5) {
    recommendedProduct = PRODUCTS.find(p => p.id === 'drop-palm-oil-2l') || PRODUCTS[1];
    recommendedQty = 1;
  } else if (calculatedLiters <= 7) {
    recommendedProduct = PRODUCTS.find(p => p.id === 'drop-palm-oil-5l') || PRODUCTS[2];
    recommendedQty = Math.ceil(calculatedLiters / 5);
  } else {
    recommendedProduct = PRODUCTS.find(p => p.id === 'drop-palm-oil-25l') || PRODUCTS[3];
    recommendedQty = Math.max(1, Math.round(calculatedLiters / 25));
  }

  const handleAdd = () => {
    onAddToCart(recommendedProduct, recommendedQty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-[#FAF7F2] rounded-3xl max-w-xl w-full border border-[#E8DFD5] shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white text-[#153823] hover:bg-[#153823] hover:text-white transition-colors cursor-pointer"
          aria-label="Close calculator"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E7F3EC] text-[#153823] flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#153823]">
              Palm Oil Requirement Calculator
            </h3>
            <p className="text-xs text-[#5C554B]">
              Calculates the exact litres of pure Drop Palm Oil needed for your feast or restaurant.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#153823] uppercase tracking-wider mb-1.5">
              1. Primary Dish Being Cooked:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'egusi', label: 'Egusi Soup' },
                { id: 'banga', label: 'Banga / Ofe Akwu' },
                { id: 'ofada', label: 'Designer Ofada Stew' },
                { id: 'rice', label: 'Native Jollof Rice' },
                { id: 'mixed', label: 'Assorted Party Soups' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setDish(item.id as any)}
                  className={`p-2.5 rounded-xl font-semibold border transition-all cursor-pointer text-left ${
                    dish === item.id
                      ? 'border-[#153823] bg-[#153823] text-white shadow-xs'
                      : 'border-[#E0D7CC] bg-white text-[#241F17] hover:bg-[#F4EFEA]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-bold text-[#153823] uppercase tracking-wider">
                2. Number of Guests / Servings:
              </label>
              <span className="font-serif text-base font-bold text-[#153823] tabular-nums">
                {guests} Guests
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="500"
              step="5"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="w-full accent-[#153823] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#8C8274] mt-1">
              <span>Family dinner (5-10)</span>
              <span>Sunday Feast (30-50)</span>
              <span>Wedding / Caterer (200-500)</span>
            </div>
          </div>
        </div>

        {/* Calculation Result Box */}
        <div className="bg-white p-5 rounded-2xl border border-[#E0D7CC] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#786E63]">Estimated Pure Oil Needed:</span>
            <span className="font-serif text-2xl font-bold text-[#153823] tabular-nums">
              ~{calculatedLiters} Litres
            </span>
          </div>

          <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#B85D0D] block">Recommended Purchase</span>
              <p className="font-serif font-bold text-sm text-[#153823]">
                {recommendedQty} × {recommendedProduct.name}
              </p>
              <p className="text-xs text-[#786E63] tabular-nums">
                Total: ₦{(recommendedProduct.priceNgn * recommendedQty).toLocaleString()}
              </p>
            </div>

            <button
              onClick={handleAdd}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#153823] hover:bg-[#0D2216] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-xs"
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Recommended</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
