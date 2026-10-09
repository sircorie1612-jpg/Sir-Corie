import React from 'react';
import { Star, Plus, Eye, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  justAdded?: boolean;
  animClass?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
  justAdded = false,
  animClass = 'animate-hover-float-1'
}) => {
  return (
    <div className={`hover-float-card ${animClass} group bg-white rounded-3xl border border-[#E0D7CC] hover:border-[#153823] hover:ring-2 hover:ring-[#E07A1E]/30 shadow-md hover:shadow-[0_25px_50px_-12px_rgba(21,56,35,0.25)] hover:-translate-y-4 transition-all duration-500 ease-out flex flex-col justify-between overflow-hidden cursor-pointer`}>
      
      {/* Product Image Slot: Clean neutral background, front-facing studio bottle */}
      <div className="relative h-64 sm:h-72 bg-gradient-to-b from-[#FAF7F2] to-[#F4EFEA] flex items-center justify-center p-6 overflow-hidden border-b border-[#F0EBE1]">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-[85%] object-contain group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-700 ease-out drop-shadow-xl"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/Pzmp6ykZ/drop2.png';
          }}
          referrerPolicy="no-referrer"
        />

        {/* Bestseller or Quality Tag - clean unboxed or subtle tag */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isBestseller && (
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#153823] text-white px-2 py-0.5 rounded-md shadow-xs">
              Popular Choice
            </span>
          )}
          <span className="text-[10px] font-semibold text-[#5C554B] bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md border border-[#E8DFD5]">
            {product.size}
          </span>
        </div>

        {/* Quick View Button overlay on hover */}
        <button
          onClick={() => onViewDetails(product)}
          className="absolute bottom-3 right-3 p-2 bg-white/95 text-[#153823] hover:bg-[#153823] hover:text-white rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
          title="Quick preview details"
          aria-label="View product details"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Rating & Review Count */}
          <div className="flex items-center gap-1.5 text-xs text-[#5C554B] mb-1.5">
            <div className="flex items-center text-[#E07A1E]">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-bold text-[#153823]">{product.rating}</span>
            <span className="text-[#8C8274]">({product.reviewCount} reviews)</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-700 font-medium">In Stock</span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onViewDetails(product)}
            className="font-serif text-lg font-bold text-[#153823] hover:text-[#B85D0D] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Short tagline */}
          <p className="text-xs text-[#5C554B] mt-1 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Ideal for note */}
          <p className="text-[11px] text-[#8C8274] mt-2 italic">
            Best for: {product.idealFor}
          </p>
        </div>

        {/* Price Baseline and CTA - Hovering Beautifully */}
        <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between gap-3">
          <div className="group/price relative transition-all duration-300 hover:-translate-y-1 p-1 rounded-xl hover:bg-[#FAF7F2]">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C8274] block">Price</span>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-xl sm:text-2xl font-black text-[#153823] tabular-nums group-hover/price:text-[#B85D0D] transition-colors">
                ₦{product.priceNgn.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewDetails(product)}
              className="px-2.5 py-2 text-xs font-semibold text-[#153823] hover:bg-[#F4EFEA] rounded-lg transition-colors cursor-pointer"
            >
              Details
            </button>

            <button
              onClick={() => onAddToCart(product)}
              disabled={justAdded}
              className={`inline-flex items-center justify-center gap-1 px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer shadow-xs ${
                justAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#153823] hover:bg-[#0D2216] text-white hover:shadow'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
