import React, { useState } from "react";
import { X, Trash2, ShoppingBag, Plus, Minus, Tag, Sparkles } from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: (discount: number, code: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState<string>("");
  const [activeDiscount, setActiveDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState<string>("");

  if (!isOpen) return null;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "COSMIC10") {
      setActiveDiscount({ code: "COSMIC10", percent: 10 });
      setPromoError("");
    } else {
      setPromoError("Code invalide. Essayez COSMIC10 !");
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = activeDiscount ? Math.round((subtotal * activeDiscount.percent) / 100) : 0;
  const total = subtotal - discountAmount;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-gray-100">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-gray-900 font-sans">Votre Panier</h2>
              <span className="px-2 py-0.5 text-xs font-mono font-bold bg-indigo-50 text-indigo-600 rounded-full">
                {cartItems.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 -mr-2 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="font-bold text-gray-800 text-sm">Le panier est vide</h3>
                <p className="text-gray-400 text-xs mt-1 max-w-[240px]">Explorez notre collection et acquérez vos premiers artéfacts sacrés.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={item.product.id}
                  className="flex gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100 transition-colors hover:bg-gray-50"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 relative bg-gray-100">
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="text-xs font-bold text-gray-900 font-sans line-clamp-1">{item.product.name}</h4>
                        <span className="text-xs font-bold text-gray-900 ml-2">{item.product.price} €</span>
                      </div>
                      <p className="text-[10px] font-mono text-gray-400 mt-0.5">{item.product.category}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 bg-white border border-gray-100 rounded-lg p-0.5">
                        <button
                          onClick={() => item.quantity > 1 ? onUpdateQuantity(item.product.id, item.quantity - 1) : onRemoveItem(item.product.id)}
                          className="p-1 rounded text-gray-400 hover:text-gray-900 hover:bg-gray-50"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-gray-800">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 rounded text-gray-400 hover:text-gray-900 hover:bg-gray-50"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Footer Summary */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-gray-100 space-y-4 bg-gray-50/30">
              {/* Promo code block */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Code promo (ex: COSMIC10)"
                    className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-gray-200 outline-none focus:border-indigo-500 bg-white"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl font-bold text-xs transition-colors shrink-0"
                >
                  Appliquer
                </button>
              </div>
              {promoError && <p className="text-[10px] text-rose-500 font-medium pl-1">{promoError}</p>}
              {activeDiscount && (
                <div className="flex items-center justify-between text-xs font-semibold bg-emerald-50 border border-emerald-100 text-emerald-800 p-2.5 rounded-xl">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Promo {activeDiscount.code} active
                  </span>
                  <span>-{activeDiscount.percent}% (-{discountAmount} €)</span>
                </div>
              )}

              {/* Price calculations */}
              <div className="space-y-1.5 text-xs font-medium pt-2">
                <div className="flex justify-between text-gray-500">
                  <span>Sous-total</span>
                  <span>{subtotal} €</span>
                </div>
                {activeDiscount && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Réduction</span>
                    <span>-{discountAmount} €</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-500">
                  <span>Expédition cosmique</span>
                  <span className="text-emerald-600 font-semibold">Gratuit</span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-150 pt-2.5">
                  <span>Total</span>
                  <span>{total} €</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                id="btn-checkout-trigger"
                onClick={() => onCheckout(discountAmount, activeDiscount?.code || "")}
                className="w-full py-3.5 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-150 text-center text-xs"
              >
                Passer la Commande
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
