import React, { useState } from 'react';
import { Product } from '../../types';
import {
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Search,
  Check,
  X,
  Package,
  RotateCcw,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface ProductManagementTableProps {
  products: Product[];
  onDeleteProduct: (productId: string) => void;
  onToggleStock: (productId: string) => void;
  onResetDefaultProducts: () => void;
  onViewProduct: (product: Product) => void;
}

export const ProductManagementTable: React.FC<ProductManagementTableProps> = ({
  products,
  onDeleteProduct,
  onToggleStock,
  onResetDefaultProducts,
  onViewProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [deleteSuccessNotice, setDeleteSuccessNotice] = useState<string | null>(null);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.size.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const confirmDelete = () => {
    if (productToDelete) {
      const name = productToDelete.name;
      onDeleteProduct(productToDelete.id);
      setProductToDelete(null);
      setDeleteSuccessNotice(`Successfully deleted "${name}" from the store catalog.`);
      setTimeout(() => {
        setDeleteSuccessNotice(null);
      }, 3000);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E8DFD5] p-6 sm:p-8 shadow-xs space-y-6">
      
      {/* Top Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F0EBE1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B85D0D] mb-1">
            <Package className="w-4 h-4" />
            <span>Store Products Catalogue</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153823]">
            Manage & Delete Products
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6154] mt-1">
            Remove discontinued items, manage stock availability, and view current listings ({products.length} products).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onResetDefaultProducts}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#5C554B] bg-[#FAF7F2] hover:bg-[#EAE2D7] border border-[#E0D7CC] transition-colors cursor-pointer"
            title="Reset store to original default products"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {deleteSuccessNotice && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center justify-between gap-3 animate-in fade-in duration-150">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-rose-600 shrink-0" />
            <p className="text-xs sm:text-sm font-semibold">{deleteSuccessNotice}</p>
          </div>
          <button
            onClick={() => setDeleteSuccessNotice(null)}
            className="text-rose-600 hover:text-rose-900 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#8C8274] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter products by bottle title, volume, or size..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl text-xs sm:text-sm text-[#153823] focus:outline-none focus:border-[#153823] focus:bg-white transition-all"
        />
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-[#E8DFD5]">
        <table className="w-full text-left text-xs text-[#241F17]">
          <thead className="bg-[#FAF7F2] text-[11px] font-bold uppercase tracking-wider text-[#6B6154] border-b border-[#E8DFD5]">
            <tr>
              <th className="py-3.5 px-4">Product</th>
              <th className="py-3.5 px-4">Size & Volume</th>
              <th className="py-3.5 px-4">Price (₦)</th>
              <th className="py-3.5 px-4">Stock Status</th>
              <th className="py-3.5 px-4">Badges</th>
              <th className="py-3.5 px-4 text-right">Delete Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0EBE1] bg-white">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-[#8C8274]">
                  No products found matching &quot;{searchQuery}&quot;.
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                  {/* Thumbnail & Name */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#E0D7CC] p-1 flex items-center justify-center shrink-0 overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/Pzmp6ykZ/drop2.png';
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-[#153823] truncate max-w-xs">{p.name}</p>
                        <p className="text-[11px] text-[#8C8274] truncate max-w-xs">{p.tagline}</p>
                      </div>
                    </div>
                  </td>

                  {/* Size & Liters */}
                  <td className="py-3.5 px-4 font-semibold text-[#5C554B]">
                    <span>{p.size}</span>
                    <span className="block text-[10px] text-[#8C8274]">({p.volumeLiters} Litres)</span>
                  </td>

                  {/* Price */}
                  <td className="py-3.5 px-4 font-bold text-[#153823] tabular-nums">
                    ₦{p.priceNgn.toLocaleString()}
                  </td>

                  {/* Stock Toggle */}
                  <td className="py-3.5 px-4">
                    <button
                      type="button"
                      onClick={() => onToggleStock(p.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        p.inStock
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                      }`}
                      title="Click to toggle in-stock / out-of-stock"
                    >
                      {p.inStock ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      <span>{p.inStock ? 'In Stock' : 'Out of Stock'}</span>
                    </button>
                  </td>

                  {/* Badges */}
                  <td className="py-3.5 px-4">
                    {p.isBestseller ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#153823] text-white">
                        <Sparkles className="w-2.5 h-2.5 text-[#E07A1E]" />
                        <span>Popular</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#8C8274]">Standard</span>
                    )}
                  </td>

                  {/* Delete Button */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onViewProduct(p)}
                        className="p-2 text-[#5C554B] hover:text-[#153823] hover:bg-[#F0EBE1] rounded-lg transition-colors cursor-pointer"
                        title="View details"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setProductToDelete(p)}
                        className="p-2 text-rose-600 hover:text-white hover:bg-rose-600 rounded-lg transition-colors cursor-pointer"
                        title={`Delete ${p.name}`}
                        aria-label={`Delete ${p.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full border border-rose-200 shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="font-serif text-xl font-bold text-[#153823]">
                Delete Product?
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6154] leading-relaxed">
                Are you sure you want to delete <strong className="text-[#153823]">&ldquo;{productToDelete.name}&rdquo;</strong> ({productToDelete.size})? This will immediately remove it from the online store catalogue.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="flex-1 py-2.5 px-4 bg-[#FAF7F2] hover:bg-[#EAE2D7] text-[#5C554B] rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="flex-1 py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Yes, Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
