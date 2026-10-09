import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag, CheckCircle2, MessageSquare } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [selectedState, setSelectedState] = useState<string>('Lagos');
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  });

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.priceNgn * item.quantity, 0);

  // Delivery fee logic
  let deliveryFee = 2500;
  if (selectedState === 'Anambra') {
    deliveryFee = 1500;
  } else if (selectedState === 'Lagos') {
    deliveryFee = 2000;
  } else if (selectedState === 'Abuja' || selectedState === 'Rivers (Port Harcourt)') {
    deliveryFee = 4500;
  } else {
    deliveryFee = 5500;
  }

  // Free delivery over ₦1.5 Million threshold
  if (subtotal >= 1500000) {
    deliveryFee = 0;
  }

  const grandTotal = subtotal + deliveryFee;

  const handleCheckoutSubmit = (method: 'card' | 'whatsapp') => {
    if (!customerInfo.fullName || !customerInfo.phone || !customerInfo.address) {
      alert('Please fill in your Name, Phone Number, and Delivery Address.');
      return;
    }

    if (method === 'whatsapp') {
      const orderSummaryText = items
        .map(i => `• ${i.product.name} (Qty: ${i.quantity}) - ₦${(i.product.priceNgn * i.quantity).toLocaleString()}`)
        .join('\n');
      
      const message = `Hello Drop Palm Oil! I would like to place an order:%0A%0A${encodeURIComponent(orderSummaryText)}%0A%0ASubtotal: ₦${subtotal.toLocaleString()}%0ADelivery (${selectedState}): ₦${deliveryFee.toLocaleString()}%0ATotal: ₦${grandTotal.toLocaleString()}%0A%0ACustomer Name: ${encodeURIComponent(customerInfo.fullName)}%0APhone: ${encodeURIComponent(customerInfo.phone)}%0AAddress: ${encodeURIComponent(customerInfo.address)}%0A%0APlease confirm my delivery schedule!`;

      // Open WhatsApp link to official WhatsApp line 08127826671
      window.open(`https://wa.me/2348127826671?text=${message}`, '_blank');
      setOrderSuccess(true);
      onClearCart();
    } else {
      setOrderSuccess(true);
      onClearCart();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col border-l border-[#E8DFD5] relative animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E0D7CC] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#153823]" />
            <h2 className="font-serif text-xl font-bold text-[#153823]">Your Cart</h2>
            <span className="text-xs bg-[#E7F3EC] text-[#153823] px-2 py-0.5 rounded-full font-bold">
              {items.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#786E63] hover:text-[#153823] hover:bg-[#F4EFEA] rounded-lg transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Screen */}
        {orderSuccess ? (
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#E7F3EC] text-[#153823] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#153823]">Order Received!</h3>
            <p className="text-xs sm:text-sm text-[#5C554B] max-w-xs">
              Thank you, <strong>{customerInfo.fullName || 'Valued Customer'}</strong>. Your pure Drop Palm Oil order has been queued for immediate packaging.
            </p>
            <div className="p-3 bg-white rounded-xl border border-[#E0D7CC] text-xs text-[#786E63] w-full max-w-xs text-left space-y-1">
              <p><strong>Order Ref:</strong> #DPO-{Math.floor(100000 + Math.random() * 900000)}</p>
              <p><strong>Delivery Location:</strong> {selectedState}</p>
              <p><strong>Status:</strong> Dispatched from Ovia / Lagos Hub</p>
            </div>
            <button
              onClick={() => {
                setOrderSuccess(false);
                setShowCheckout(false);
                onClose();
              }}
              className="px-6 py-3 bg-[#153823] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#0D2216] transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        ) : showCheckout ? (
          /* Checkout Step Form */
          <div className="p-6 flex-1 overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-[#E0D7CC]">
              <h3 className="font-serif text-lg font-bold text-[#153823]">Delivery Details</h3>
              <button
                onClick={() => setShowCheckout(false)}
                className="text-xs text-[#B85D0D] font-bold hover:underline cursor-pointer"
              >
                ← Back to Cart
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#153823] mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adebayo Adeleke"
                  value={customerInfo.fullName}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, fullName: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white border border-[#D5C6B5] rounded-xl focus:outline-none focus:border-[#153823]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#153823] mb-1">Phone Number (For Dispatch) *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0803 123 4567"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white border border-[#D5C6B5] rounded-xl focus:outline-none focus:border-[#153823]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#153823] mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white border border-[#D5C6B5] rounded-xl focus:outline-none focus:border-[#153823]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#153823] mb-1">Delivery State</label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-[#D5C6B5] rounded-xl focus:outline-none focus:border-[#153823]"
                >
                  <option value="Anambra">Anambra State (Awka / Ifite / Onitsha - ₦1,500)</option>
                  <option value="Lagos">Lagos (₦2,000 / Free over ₦1.5M)</option>
                  <option value="Abuja">Abuja FCT (₦4,500)</option>
                  <option value="Rivers (Port Harcourt)">Rivers / Port Harcourt (₦4,500)</option>
                  <option value="Enugu">Enugu State (₦3,500)</option>
                  <option value="Edo">Edo State (₦3,000)</option>
                  <option value="Ogun">Ogun State (₦3,500)</option>
                  <option value="Oyo">Oyo State / Ibadan (₦3,500)</option>
                  <option value="Other">Other State Nationwide (₦5,500)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#153823] mb-1">Detailed Delivery Address *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Street address, building number, landmark..."
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#D5C6B5] rounded-xl focus:outline-none focus:border-[#153823]"
                />
              </div>
            </div>

            {/* Total Summary */}
            <div className="p-3.5 bg-white rounded-xl border border-[#E0D7CC] space-y-2 text-xs">
              <div className="flex justify-between text-[#786E63]">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-[#153823] tabular-nums">₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#786E63]">
                <span>Delivery ({selectedState}):</span>
                <span className="font-semibold text-[#153823] tabular-nums">
                  {deliveryFee === 0 ? 'FREE' : `₦${deliveryFee.toLocaleString()}`}
                </span>
              </div>
              <div className="pt-2 border-t border-[#F0EBE1] flex justify-between text-sm font-bold text-[#153823]">
                <span>Total Amount Due:</span>
                <span className="tabular-nums">₦{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => handleCheckoutSubmit('whatsapp')}
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm & Pay via WhatsApp Concierge</span>
              </button>

              <button
                onClick={() => handleCheckoutSubmit('card')}
                className="w-full py-3 px-4 rounded-xl bg-[#153823] hover:bg-[#0D2216] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Complete Order (Card / Bank Transfer)</span>
              </button>
            </div>
          </div>
        ) : (
          /* Cart Item List */
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-[#786E63]">
                <ShoppingBag className="w-12 h-12 text-[#D5C6B5]" />
                <p className="font-serif text-lg font-bold text-[#153823]">Your cart is currently empty</p>
                <p className="text-xs max-w-xs">
                  Browse our range of pure, unadulterated palm oil crafted for delicious home cooking.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-white p-3.5 rounded-2xl border border-[#E0D7CC] flex gap-3 shadow-xs items-center"
                  >
                    <div className="w-16 h-16 bg-[#FAF7F2] rounded-xl flex items-center justify-center p-1 border border-[#F0EBE1] shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="max-h-full max-w-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-[#153823] truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#786E63]">{item.product.size}</p>
                      <p className="font-serif font-bold text-xs text-[#153823] mt-1 tabular-nums">
                        ₦{(item.product.priceNgn * item.quantity).toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-1 border border-[#D5C6B5] rounded-lg bg-[#FAF7F2] p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-[#153823] hover:bg-white rounded transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-[#153823] tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-[#153823] hover:bg-white rounded transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Remove Item */}
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-1.5 text-[#A89F91] hover:text-red-600 transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Drawer Bottom Bar: Subtotal, Delivery and Checkout CTA */}
        {items.length > 0 && !orderSuccess && !showCheckout && (
          <div className="p-5 border-t border-[#E0D7CC] bg-white space-y-3">
            {/* Delivery State Selector */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#786E63]">Deliver To:</span>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="text-xs font-semibold bg-[#FAF7F2] border border-[#D5C6B5] rounded-md px-2 py-1 text-[#153823]"
              >
                <option value="Anambra">Anambra (₦1,500)</option>
                <option value="Lagos">Lagos (₦2,000)</option>
                <option value="Abuja">Abuja FCT (₦4,500)</option>
                <option value="Rivers (Port Harcourt)">Rivers / Port Harcourt (₦4,500)</option>
                <option value="Other">Other States (₦5,500)</option>
              </select>
            </div>

            {/* Subtotal & Delivery Row */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[#786E63]">
                <span>Subtotal:</span>
                <span className="font-semibold text-[#153823] tabular-nums">₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#786E63]">
                <span>Delivery:</span>
                <span className="font-semibold text-[#153823] tabular-nums">
                  {deliveryFee === 0 ? 'FREE' : `₦${deliveryFee.toLocaleString()}`}
                </span>
              </div>
              <div className="pt-2 border-t border-[#F0EBE1] flex justify-between text-base font-bold text-[#153823]">
                <span>Total:</span>
                <span className="tabular-nums">₦{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={() => setShowCheckout(true)}
              className="w-full py-3.5 px-4 bg-[#153823] hover:bg-[#0D2216] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Proceed To Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#786E63]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Secure Checkout · Direct Dispatch Guarantee</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
