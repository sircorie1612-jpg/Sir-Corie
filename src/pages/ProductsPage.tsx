import React, { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/mockData';
import { Product } from '../types';
import { Filter, ArrowUpDown, Calculator, Truck, ShieldCheck, Sparkles } from 'lucide-react';

interface ProductsPageProps {
  products?: Product[];
  onAddToCart: (product: Product, quantity?: number) => void;
  onViewDetails: (product: Product) => void;
  openCalculator: () => void;
  justAddedId: string | null;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products = PRODUCTS,
  onAddToCart,
  onViewDetails,
  openCalculator,
  justAddedId,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Filter logic
  const filteredProducts = products.filter((p) => {
    if (selectedFilter === 'household') return p.volumeLiters <= 2 && p.id !== 'drop-gift-duo';
    if (selectedFilter === 'bulk') return p.volumeLiters === 5;
    if (selectedFilter === 'commercial') return p.volumeLiters === 25;
    if (selectedFilter === 'gift') return p.id === 'drop-gift-duo';
    return true;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.priceNgn - b.priceNgn;
    if (sortBy === 'price-desc') return b.priceNgn - a.priceNgn;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
  });

  return (
    <div className="py-12 md:py-20 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B85D0D]">
            <span>100% Pure Virgin Extraction</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#153823] tracking-tight">
            Our Products
          </h1>
          <p className="text-base text-[#5C554B] leading-relaxed">
            Discover our range of quality palm oil products made for homes, restaurants, caterers, and food businesses. Laboratory tested, unbleached, and naturally rich in beta-carotenes.
          </p>

          {/* Quick value banner */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-[#153823]">
            <span className="flex items-center gap-1.5 font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#E07A1E]" />
              Zero Sudan Dyes or Additives
            </span>
            <span className="flex items-center gap-1.5 font-semibold">
              <Truck className="w-4 h-4 text-[#E07A1E]" />
              Same-day Dispatch Lagos · 2-Day Nationwide
            </span>
            <span className="flex items-center gap-1.5 font-semibold">
              <Sparkles className="w-4 h-4 text-[#E07A1E]" />
              Extra Grade FFA &lt; 1.8%
            </span>
          </div>
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-[#E0D7CC] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Segmented Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <Filter className="w-4 h-4 text-[#8C8274] mr-1 shrink-0 hidden sm:block" />
            {[
              { id: 'all', label: 'All Sizes' },
              { id: 'household', label: 'Household (1L & 2L)' },
              { id: 'bulk', label: 'Family Pack (5L)' },
              { id: 'commercial', label: 'Commercial (25L)' },
              { id: 'gift', label: 'Gift Sets' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setSelectedFilter(btn.id)}
                className={`px-3 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                  selectedFilter === btn.id
                    ? 'bg-[#153823] text-white shadow-xs'
                    : 'text-[#5C554B] hover:bg-[#F4EFEA]'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Right Toolbar: Sort & Oil Calculator */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 w-full md:w-auto justify-between md:justify-end">
            <button
              onClick={openCalculator}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#153823] bg-[#E7F3EC] hover:bg-[#D5EADF] px-3 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-[#153823]" />
              <span className="hidden xs:inline">Event Volume</span> Calculator
            </button>

            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#8C8274]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-semibold bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl px-2 py-2 text-[#153823] cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(p) => onAddToCart(p, 1)}
              onViewDetails={onViewDetails}
              justAdded={justAddedId === product.id}
            />
          ))}
        </div>

        {/* Commercial & Bulk Order Callout Card */}
        <div className="bg-[#153823] text-white rounded-3xl p-8 sm:p-10 border border-[#1C4B2F] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E07A1E]">
              B2B / Restaurant Supply
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Need 50+ Litres Weekly for Your Restaurant or Catering Company?
            </h3>
            <p className="text-xs sm:text-sm text-[#CAD9CA]">
              We supply top bukas, culinary schools, luxury hotels, and event caterers with scheduled pallet deliveries and wholesale discounts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="https://wa.me/2348127826671?text=Hello%20Drop%20Palm%20Oil!%20I%20am%20interested%20in%20wholesale%20restaurant%20supply."
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center shadow-md transition-colors"
            >
              Wholesale WhatsApp Desk (08127826671)
            </a>
            <button
              onClick={openCalculator}
              className="px-6 py-3.5 bg-[#E7F3EC] hover:bg-[#D5EADF] text-[#153823] font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Calculate Consumption
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
