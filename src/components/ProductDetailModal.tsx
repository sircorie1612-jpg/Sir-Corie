import React, { useState } from 'react';
import { X, Star, ShieldCheck, Truck, RefreshCw, Check, Plus, Minus, Heart } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/mockData';

interface ProductDetailModalProps {
  product: Product | null;
  allProducts?: Product[];
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  allProducts = PRODUCTS,
  onClose,
  onAddToCart,
  onSelectProduct
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [activeImageTab, setActiveImageTab] = useState<'studio' | 'lifestyle'>('studio');
  const [addedNotice, setAddedNotice] = useState(false);
  const [activeTabSection, setActiveTabSection] = useState<'overview' | 'ingredients' | 'storage' | 'delivery' | 'reviews'>('overview');

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  const handleSizeChange = (targetProduct: Product) => {
    onSelectProduct(targetProduct);
    setQuantity(1);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative bg-[#FAF7F2] rounded-3xl max-w-4xl w-full border border-[#E8DFD5] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 text-[#153823] hover:bg-[#153823] hover:text-white shadow-md transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left Column: Image Gallery (Studio vs In-Use) */}
            <div className="space-y-4">
              <div className="relative h-80 sm:h-96 rounded-2xl bg-white border border-[#E0D7CC] flex items-center justify-center overflow-hidden p-6 shadow-inner">
                <img
                  src={activeImageTab === 'studio' ? product.image : (product.lifestyleImage || product.image)}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain transition-all duration-300 drop-shadow-lg"
                  referrerPolicy="no-referrer"
                />

                <span className="absolute top-3 left-3 bg-[#153823] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                  {activeImageTab === 'studio' ? 'Front-Facing Studio View' : 'Culinary In-Use'}
                </span>
              </div>

              {/* Dual image switcher tabs */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setActiveImageTab('studio')}
                  className={`p-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    activeImageTab === 'studio'
                      ? 'border-[#153823] bg-[#E7F3EC] text-[#153823] shadow-xs'
                      : 'border-[#E0D7CC] bg-white text-[#5C554B] hover:bg-[#F4EFEA]'
                  }`}
                >
                  <span>1. Front Bottle Shot</span>
                </button>
                <button
                  onClick={() => setActiveImageTab('lifestyle')}
                  className={`p-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    activeImageTab === 'lifestyle'
                      ? 'border-[#153823] bg-[#E7F3EC] text-[#153823] shadow-xs'
                      : 'border-[#E0D7CC] bg-white text-[#5C554B] hover:bg-[#F4EFEA]'
                  }`}
                >
                  <span>2. Product In Use / Food</span>
                </button>
              </div>

              {/* Chemical-Free Certification Stamp */}
              <div className="bg-[#E7F3EC] border border-[#C5E2D1] rounded-xl p-3.5 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#153823] shrink-0" />
                <p className="text-xs text-[#153823]">
                  <strong>NAFDAC Reg. Compliant Standard:</strong> 100% Pure Virgin Palm Fruit. Zero Sudan IV Dye, Zero Bleaching Solvents.
                </p>
              </div>
            </div>

            {/* Right Column: Contiguous Purchase Module */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                
                {/* Product Title */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B85D0D] mb-1">
                    <span>Pure Nigerian Palm Oil</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-700">In Stock</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153823] tracking-tight">
                    {product.name}
                  </h2>
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-[#E07A1E]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#153823]">{product.rating}</span>
                  <span className="text-xs text-[#786E63]">({product.reviewCount} customer reviews)</span>
                </div>

                {/* Price */}
                <div className="bg-white p-3.5 rounded-xl border border-[#E0D7CC] flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] text-[#786E63] uppercase tracking-wider font-semibold block">
                      Price (Naira)
                    </span>
                    <span className="font-serif text-3xl font-bold text-[#153823] tabular-nums">
                      ₦{product.priceNgn.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-xs text-[#153823] bg-[#E7F3EC] px-2.5 py-1 rounded-md font-medium">
                    {product.size} Volume
                  </span>
                </div>

                {/* Key Summary */}
                <p className="text-sm text-[#484238] leading-relaxed">
                  Rich, authentic palm oil made to bring deep colour, warm aroma, and unforgettable flavour to your favourite traditional and modern meals.
                </p>

                {/* Available Sizes Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#153823]">
                    Select Size:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {allProducts.filter(p => p.id !== 'drop-gift-duo').map((variant) => {
                      const isSelected = variant.id === product.id;
                      return (
                        <button
                          key={variant.id}
                          onClick={() => handleSizeChange(variant)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                            isSelected
                              ? 'border-[#153823] bg-[#153823] text-white shadow-xs'
                              : 'border-[#E0D7CC] bg-white text-[#241F17] hover:bg-[#F4EFEA]'
                          }`}
                        >
                          <span className="block">{variant.size}</span>
                          <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-[#FAF7F2]/80' : 'text-[#8C8274]'}`}>
                            ₦{variant.priceNgn.toLocaleString()}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity Stepper & Add to Cart */}
                <div className="pt-2 flex items-center gap-3">
                  <div className="flex items-center border border-[#D5C6B5] rounded-xl bg-white p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-[#153823] hover:bg-[#F4EFEA] rounded-lg transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-[#153823] tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-[#153823] hover:bg-[#F4EFEA] rounded-lg transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    className="flex-1 py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-xs bg-[#153823] hover:bg-[#0D2216] text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {addedNotice ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Added to Cart ({quantity})</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add To Cart · ₦{(product.priceNgn * quantity).toLocaleString()}</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

              {/* Delivery Micro-Perk */}
              <div className="pt-4 border-t border-[#E8DFD5] flex items-center gap-3 text-xs text-[#5C554B]">
                <Truck className="w-4 h-4 text-[#E07A1E] shrink-0" />
                <span>Same-day pickup / delivery in Ifite, Awka & Anambra State. Fast dispatch nationwide.</span>
              </div>

            </div>

          </div>

          {/* Tabbed Info Section: Description, Ingredients, Storage, Delivery, Reviews */}
          <div className="mt-10 pt-6 border-t border-[#E8DFD5]">
            <div className="flex items-center gap-1 border-b border-[#E0D7CC] overflow-x-auto pb-px">
              {[
                { id: 'overview', label: 'Product Description' },
                { id: 'ingredients', label: 'Ingredients & Specs' },
                { id: 'storage', label: 'Storage Information' },
                { id: 'delivery', label: 'Delivery Information' },
                { id: 'reviews', label: `Customer Reviews (${product.reviewCount})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabSection(tab.id as any)}
                  className={`px-4 py-2.5 text-xs font-bold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                    activeTabSection === tab.id
                      ? 'border-[#153823] text-[#153823]'
                      : 'border-transparent text-[#786E63] hover:text-[#153823]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="py-5 text-xs sm:text-sm text-[#484238] leading-relaxed">
              {activeTabSection === 'overview' && (
                <div className="space-y-3">
                  <p>{product.description}</p>
                  <p>
                    Every batch of Drop Palm Oil is cold-settled and gently filtered to eliminate fruit pulp grit without damaging the heat-sensitive natural beta-carotenes and tocotrienols (Vitamin E). It gives soups their characteristic radiant red-golden finish and fragrant aroma without greasy heaviness.
                  </p>
                </div>
              )}

              {activeTabSection === 'ingredients' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-[#153823] mb-1">Ingredients:</h4>
                    <p>100% Pure Virgin Red Palm Oil (derived from fresh fruits of <em>Elaeis guineensis</em>). Zero Sudan IV dye, zero artificial colors, zero preservatives, zero chemical hexane solvents.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-white rounded-lg border border-[#E0D7CC]">
                      <span className="text-[#786E63] text-xs block">Free Fatty Acid (FFA)</span>
                      <strong className="text-[#153823] text-sm">{product.specifications.freeFattyAcids}</strong>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-[#E0D7CC]">
                      <span className="text-[#786E63] text-xs block">Moisture Content</span>
                      <strong className="text-[#153823] text-sm">{product.specifications.moistureContent}</strong>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-[#E0D7CC]">
                      <span className="text-[#786E63] text-xs block">Smoke Point</span>
                      <strong className="text-[#153823] text-sm">{product.specifications.smokePoint}</strong>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-[#E0D7CC]">
                      <span className="text-[#786E63] text-xs block">Origin & Harvest</span>
                      <strong className="text-[#153823] text-sm">{product.specifications.origin}</strong>
                    </div>
                  </div>
                </div>
              )}

              {activeTabSection === 'storage' && (
                <div className="space-y-3">
                  <p>
                    <strong>Storage Instructions:</strong> Store in a cool, dry pantry away from direct heat and direct sunlight. Keep the lid tightly sealed after every pour to prevent natural air oxidation.
                  </p>
                  <p>
                    <strong>Note on Solidification:</strong> In colder weather or air-conditioned kitchens (below 24°C / 75°F), natural unadulterated red palm oil may thicken or form a semi-solid golden paste. This is completely natural and is physical proof that the oil is unrefined and contains no chemical anti-solidifying agents. Simply place the bottle in a bowl of warm water for a few minutes to restore its liquid pour.
                  </p>
                </div>
              )}

              {activeTabSection === 'delivery' && (
                <div className="space-y-3">
                  <p>
                    <strong>Anambra State & Awka Hub:</strong> Orders placed before 2:00 PM are dispatched for same-day delivery or pickup from our HQ at Puco and Partners complex, Ifite, Awka, Anambra State.
                  </p>
                  <p>
                    <strong>Lagos & South-West:</strong> 1 to 2 business days via dedicated express temperature-controlled logistics partners.
                  </p>
                  <p>
                    <strong>Abuja, Port Harcourt & Nationwide:</strong> 2 to 3 business days. All containers are double-boxed and induction-sealed to prevent transit damage or spillage.
                  </p>
                </div>
              )}

              {activeTabSection === 'reviews' && (
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-xl border border-[#E0D7CC] space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-[#153823]">Aisha B. (Victoria Island, Lagos)</strong>
                      <span className="text-xs text-[#786E63]">Verified Buyer · 2 days ago</span>
                    </div>
                    <div className="flex items-center text-[#E07A1E]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-[#5C554B]">
                      "My Banga soup had that authentic deep Delta aroma that usually takes hours of sourcing to achieve. The oil is clean, zero sand at the bottom of the bottle, and the color is gorgeous."
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-[#E0D7CC] space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-[#153823]">Emeka N. (Garki, Abuja)</strong>
                      <span className="text-xs text-[#786E63]">Verified Buyer · 1 week ago</span>
                    </div>
                    <div className="flex items-center text-[#E07A1E]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-[#5C554B]">
                      "Ordered two 5L containers. Packaging was spotless and delivery arrived right to my door in Abuja. Highly recommend Drop for anyone who cares about clean eating."
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
