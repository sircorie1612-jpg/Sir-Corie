import React, { useState } from 'react';
import { Product } from '../../types';
import { SaleRecord } from '../../data/salesData';
import { X, Plus, CheckCircle2, ShoppingBag, MapPin, Phone, User, CreditCard } from 'lucide-react';

interface OrderRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onRecordSale: (newSale: SaleRecord) => void;
}

export const OrderRecordModal: React.FC<OrderRecordModalProps> = ({
  isOpen,
  onClose,
  products,
  onRecordSale,
}) => {
  if (!isOpen) return null;

  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('08127826671');
  const [customerLocation, setCustomerLocation] = useState('Ifite, Awka, Anambra State');
  const [paymentMethod, setPaymentMethod] = useState<'Bank Transfer' | 'Card' | 'WhatsApp / Cash'>('Bank Transfer');
  const [status, setStatus] = useState<'Completed' | 'Dispatched' | 'Processing'>('Completed');

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  const totalAmount = selectedProduct ? selectedProduct.priceNgn * quantity : 0;
  const totalLiters = selectedProduct ? (selectedProduct.volumeLiters || 1) * quantity : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const newSale: SaleRecord = {
      id: `sale-${Date.now()}`,
      orderNumber: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      customerName: customerName.trim() || 'Walk-in Customer',
      customerPhone: customerPhone.trim() || '08127826671',
      customerLocation: customerLocation.trim() || 'Awka, Anambra State',
      productName: selectedProduct.name,
      size: selectedProduct.size,
      quantity,
      liters: totalLiters,
      totalAmountNgn: totalAmount,
      paymentMethod,
      status,
    };

    onRecordSale(newSale);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="relative bg-white rounded-3xl max-w-lg w-full border border-[#E8DFD5] shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F0EBE1]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#B85D0D] block">
              Direct Sales Log
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#153823]">
              Record New Sale Order
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#8C8274] hover:text-[#153823] hover:bg-[#FAF7F2] rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Product selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#241F17]">
              Product Purchased
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl text-xs sm:text-sm text-[#153823] focus:outline-none focus:border-[#153823] focus:bg-white"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.size}) — ₦{p.priceNgn.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity & Summary */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#241F17]">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                required
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl text-xs sm:text-sm text-[#153823] focus:outline-none focus:border-[#153823]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#241F17]">
                Total Amount (₦)
              </label>
              <div className="px-3.5 py-2.5 bg-[#E7F3EC] border border-[#C5DEC9] rounded-xl text-xs sm:text-sm font-bold text-[#153823] tabular-nums">
                ₦{totalAmount.toLocaleString()} ({totalLiters} L)
              </div>
            </div>
          </div>

          {/* Customer Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#241F17]">
              Customer / Restaurant Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Chief Emeka / Ifite Buka"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl text-xs sm:text-sm text-[#153823] focus:outline-none focus:border-[#153823]"
            />
          </div>

          {/* Customer Location & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#241F17]">
                Location / City
              </label>
              <input
                type="text"
                placeholder="e.g. Ifite, Awka, Anambra"
                value={customerLocation}
                onChange={(e) => setCustomerLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl text-xs sm:text-sm text-[#153823] focus:outline-none focus:border-[#153823]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#241F17]">
                Phone / WhatsApp
              </label>
              <input
                type="text"
                placeholder="08127826671"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl text-xs sm:text-sm text-[#153823] focus:outline-none focus:border-[#153823]"
              />
            </div>
          </div>

          {/* Payment Method & Status */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#241F17]">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl text-xs text-[#153823]"
              >
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Card">Debit Card</option>
                <option value="WhatsApp / Cash">WhatsApp / Cash</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#241F17]">
                Order Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl text-xs text-[#153823]"
              >
                <option value="Completed">Completed</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Processing">Processing</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-[#FAF7F2] hover:bg-[#EAE2D7] text-[#5C554B] rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-[#153823] hover:bg-[#0D2216] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Log Sale Record</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
