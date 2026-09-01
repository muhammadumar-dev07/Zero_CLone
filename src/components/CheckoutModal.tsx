import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Download, Award, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'details' | 'confirmed'>('details');
  const [formData, setFormData] = useState({
    fullName: 'Alexander Vance',
    email: 'a.vance@horology.com',
    shippingAddress: '450 Sutter Street, Suite 1200',
    city: 'San Francisco, CA 94108',
    country: 'United States',
    paymentMethod: 'concierge_wire',
  });
  const [serialCode, setSerialCode] = useState('');

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.selectedPrice * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedSerial = `ZR-2024-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(100 + Math.random() * 900)}`;
    setSerialCode(generatedSerial);
    setStep('confirmed');
    onOrderSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#131313] border border-[#4c4546]/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-5 border-b border-[#4c4546]/20 bg-[#0e0e0e]">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#4b8eff]" />
            <h2 className="font-['Hanken_Grotesk'] text-xl font-semibold text-white">
              {step === 'details' ? 'Privé Timepiece Allocation' : 'Reservation Confirmed'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#988e90] hover:text-white p-1 rounded-md hover:bg-[#2a2a2a] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 overflow-y-auto space-y-6">
          {step === 'details' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4b8eff] mb-4">
                  01. Allocation Recipient
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-['JetBrains_Mono'] text-[#988e90] mb-1 uppercase">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#1c1b1b] border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-[#4b8eff] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-['JetBrains_Mono'] text-[#988e90] mb-1 uppercase">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#1c1b1b] border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-[#4b8eff] outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4b8eff] mb-4">
                  02. Armored Delivery Address
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Street Address"
                    value={formData.shippingAddress}
                    onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                    className="w-full bg-[#1c1b1b] border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-[#4b8eff] outline-none"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="City, State / Postal Code"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#1c1b1b] border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-[#4b8eff] outline-none"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-[#1c1b1b] border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-[#4b8eff] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="p-4 bg-[#1c1b1b] rounded-xl border border-white/5 font-['JetBrains_Mono'] text-xs space-y-2">
                <div className="flex justify-between text-[#988e90]">
                  <span>RESERVED PIECES</span>
                  <span className="text-white">{cartItems.length} Timepiece(s)</span>
                </div>
                <div className="flex justify-between text-[#988e90]">
                  <span>PRIORITY ALLOCATION DEPOSIT</span>
                  <span className="text-[#4b8eff] font-bold">
                    ${totalAmount.toLocaleString()} USD
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#4b8eff] text-[#001a41] hover:bg-[#adc6ff] transition-colors font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-widest rounded flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(75,142,255,0.3)]"
              >
                <span>Authorize & Stamp Reservation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-['Hanken_Grotesk'] text-2xl font-bold text-white mb-2">
                  Zero Ingot Stamped & Secured
                </h3>
                <p className="font-['Inter'] text-sm text-[#cfc4c5] max-w-md mx-auto leading-relaxed">
                  Your timepiece allocation has been officially registered with the Geneva Atelier ledger. Our senior horology concierge will contact you with tracking and hand-delivery scheduling.
                </p>
              </div>

              {/* Digital Certificate Box */}
              <div className="glass-panel p-6 rounded-xl border border-white/15 max-w-md mx-auto text-left font-['JetBrains_Mono'] text-xs space-y-3 bg-[#0e0e0e]">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2 text-[#4b8eff]">
                    <Award className="w-4 h-4" />
                    <span className="font-bold">GENEVA DIGITAL CERTIFICATE</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold">VERIFIED</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#988e90]">ISSUED TO:</span>
                  <span className="text-white font-medium">{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#988e90]">ALLOCATION ID:</span>
                  <span className="text-[#adc6ff] font-bold">{serialCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#988e90]">NEURAL LEDGER:</span>
                  <span className="text-white">Block #884,912</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[#4b8eff] text-[#001a41] hover:bg-[#adc6ff] font-['JetBrains_Mono'] text-xs uppercase font-bold rounded transition-colors"
                >
                  Return to Atelier
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
