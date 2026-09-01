import React from 'react';
import { X, Trash2, Plus, Minus, ShieldCheck, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.selectedPrice * item.quantity,
    0
  );
  const complimentaryCourier = 'FedEx Priority Armored';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#131313] border-l border-[#4c4546]/30 shadow-2xl flex flex-col justify-between">
          {/* Top Header */}
          <div className="p-6 border-b border-[#4c4546]/20 flex items-center justify-between bg-[#0e0e0e]">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#4b8eff]" />
              <h2 className="font-['Hanken_Grotesk'] text-xl font-semibold text-white">
                Your Timepiece Bag
              </h2>
              <span className="font-['JetBrains_Mono'] text-xs text-[#988e90]">
                ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-[#988e90] hover:text-white p-1 rounded hover:bg-[#2a2a2a] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-[#988e90] space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-[#1c1b1b] flex items-center justify-center border border-white/5">
                  <ShoppingBag className="w-8 h-8 text-[#4c4546]" />
                </div>
                <div>
                  <p className="font-['Hanken_Grotesk'] text-lg text-white mb-1">
                    Your bag is currently empty
                  </p>
                  <p className="font-['Inter'] text-xs text-[#988e90] max-w-xs">
                    Explore our flagship Royale and Explorer timepieces to reserve your titanium serial number.
                  </p>
                </div>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="glass-panel p-4 rounded-xl border border-white/10 flex gap-4 relative group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-contain bg-[#0e0e0e]/60 rounded-lg p-2 shrink-0 border border-white/5"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-['Hanken_Grotesk'] font-semibold text-white text-base truncate">
                          {item.product.name}
                        </h4>
                        <p className="font-['JetBrains_Mono'] text-[11px] text-[#4b8eff]">
                          {item.product.subtitle}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#988e90] hover:text-red-400 p-1 transition-colors"
                        title="Remove timepiece"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {item.customization && (
                      <div className="my-2 p-2 rounded bg-[#1c1b1b] border border-white/5 font-['JetBrains_Mono'] text-[10px] text-[#cfc4c5] space-y-0.5">
                        <div>CASE: {item.customization.caseFinish}</div>
                        <div>STRAP: {item.customization.strap}</div>
                        {item.customization.engravingText && (
                          <div>ENGRAVING: &quot;{item.customization.engravingText}&quot;</div>
                        )}
                      </div>
                    )}

                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center gap-2 border border-[#4c4546]/30 rounded bg-[#1c1b1b] px-2 py-1">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="text-[#988e90] hover:text-white p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-['JetBrains_Mono'] text-xs text-white px-2">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="text-[#988e90] hover:text-white p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="font-['JetBrains_Mono'] text-sm font-semibold text-white">
                        ${(item.selectedPrice * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Summary & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-[#4c4546]/20 bg-[#0e0e0e] space-y-4">
              <div className="space-y-2 font-['JetBrains_Mono'] text-xs">
                <div className="flex justify-between text-[#988e90]">
                  <span>SUBTOTAL</span>
                  <span className="text-white">${subtotal.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between text-[#988e90]">
                  <span>ARMORED INSURED TRANSIT</span>
                  <span className="text-emerald-400">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-[#988e90]">
                  <span>5-YEAR TITANIUM CARE</span>
                  <span className="text-emerald-400">INCLUDED</span>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between text-sm font-bold text-white font-['Hanken_Grotesk']">
                  <span>TOTAL ESTIMATE</span>
                  <span className="text-[#4b8eff] font-['JetBrains_Mono']">
                    ${subtotal.toLocaleString()} USD
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-['JetBrains_Mono'] text-[#988e90] bg-[#1c1b1b] p-2.5 rounded border border-white/5">
                <ShieldCheck className="w-4 h-4 text-[#4b8eff] shrink-0" />
                <span>Individually laser-serialized & recorded to private ledger</span>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full py-4 bg-[#4b8eff] text-[#001a41] hover:bg-[#adc6ff] transition-colors rounded-none font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(75,142,255,0.3)]"
              >
                <span>Reserve Timepieces</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
