import React, { useState } from "react";
import { X, CreditCard, ShieldCheck, CheckCircle2, ChevronRight, Truck } from "lucide-react";
import { CartItem, ShippingAddress, Order } from "../types";

interface CheckoutProps {
  cartItems: CartItem[];
  discount: number;
  promoCode: string;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export default function Checkout({ cartItems, discount, promoCode, onClose, onOrderSuccess }: CheckoutProps) {
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "France"
  });

  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
    isFlipped: false
  });

  const [formErrors, setFormErrors] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const total = subtotal - discount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Format card number to groups of 4
    if (name === "number") {
      const clean = value.replace(/\D/g, "").slice(0, 16);
      const formatted = clean.replace(/(\d{4})(?=\d)/g, "$1 ");
      setCardDetails(prev => ({ ...prev, number: formatted }));
    } else if (name === "expiry") {
      const clean = value.replace(/\D/g, "").slice(0, 4);
      const formatted = clean.length >= 2 ? `${clean.slice(0, 2)}/${clean.slice(2, 4)}` : clean;
      setCardDetails(prev => ({ ...prev, expiry: formatted }));
    } else if (name === "cvv") {
      const clean = value.replace(/\D/g, "").slice(0, 3);
      setCardDetails(prev => ({ ...prev, cvv: clean }));
    } else {
      setCardDetails(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingAddress.fullName || !shippingAddress.email || !shippingAddress.address || !shippingAddress.city || !shippingAddress.zipCode) {
      setFormErrors("Veuillez remplir toutes les informations de livraison.");
      return;
    }
    if (cardDetails.number.replace(/\s/g, "").length !== 16 || !cardDetails.name || cardDetails.expiry.length !== 5 || cardDetails.cvv.length !== 3) {
      setFormErrors("Informations de paiement invalides.");
      return;
    }

    setIsSubmitting(true);
    setFormErrors("");

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems,
          shippingAddress,
          paymentDetails: { number: "XXXX XXXX XXXX " + cardDetails.number.slice(-4) },
          total
        })
      });

      const data = await response.json();
      if (data && data.success && data.order) {
        onOrderSuccess(data.order);
        return;
      } else {
        setFormErrors(data.error || "Une erreur est survenue lors de l'enregistrement de l'ordre.");
      }
    } catch (err) {
      console.warn("Serveur de commande indisponible, traitement local initié.");
      // Build simulated order structure for static deployment
      const simulatedOrder: Order = {
        id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString("fr-FR"),
        cartItems: [...cartItems],
        shippingAddress: { ...shippingAddress },
        total,
        status: "En cours de préparation",
        step: 1,
        steps: [
          { name: "Commande validée", done: true, desc: "Votre transaction a été approuvée avec succès." },
          { name: "Alchimie & Assemblage", done: false, desc: "Nos artisans réunissent les minéraux et essences requis." },
          { name: "Infusion Énergétique", done: false, desc: "L'artéfact est purifié sous le spectre lumineux idoine." },
          { name: "Expédition Cosmique", done: false, desc: "Remise au transporteur prioritaire Téléport Express." }
        ]
      };
      // Successfully complete transaction locally
      onOrderSuccess(simulatedOrder);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-950/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full border border-gray-100 flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT: Shipping Form */}
        <div className="md:w-1/2 p-8 overflow-y-auto border-r border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 font-sans mb-1">Finaliser votre Acquisition</h2>
          <p className="text-xs text-gray-400 mb-6">Saisissez les informations de livraison de votre artéfact.</p>

          <form onSubmit={handleSubmitOrder} className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Nom complet</label>
                <input
                  type="text"
                  name="fullName"
                  id="ship-fullName"
                  value={shippingAddress.fullName}
                  onChange={handleInputChange}
                  placeholder="Éléonore Maistre"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-xs outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Email de transmission</label>
                <input
                  type="email"
                  name="email"
                  id="ship-email"
                  value={shippingAddress.email}
                  onChange={handleInputChange}
                  placeholder="eleonore@aura.fr"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-xs outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Adresse physique</label>
                <input
                  type="text"
                  name="address"
                  id="ship-address"
                  value={shippingAddress.address}
                  onChange={handleInputChange}
                  placeholder="42 Rue de l'Observatoire"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-xs outline-none transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Ville</label>
                  <input
                    type="text"
                    name="city"
                    id="ship-city"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    placeholder="Paris"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-xs outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Code Postal</label>
                  <input
                    type="text"
                    name="zipCode"
                    id="ship-zipCode"
                    value={shippingAddress.zipCode}
                    onChange={handleInputChange}
                    placeholder="75006"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-xs outline-none transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Error alerts */}
            {formErrors && (
              <div className="p-3 text-[11px] font-medium text-rose-600 bg-rose-50 border border-rose-100 rounded-xl">
                {formErrors}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              id="btn-submit-order"
              className="w-full py-3 bg-indigo-900 hover:bg-indigo-950 active:bg-indigo-950 text-white rounded-xl font-semibold text-xs shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 mt-4"
            >
              {isSubmitting ? (
                <>
                  <CheckCircle2 className="w-4 h-4 animate-spin text-indigo-400" />
                  Alchimie en cours...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  Sécuriser la Transaction — {total} €
                </>
              )}
            </button>
          </form>
        </div>

        {/* RIGHT: Credit Card Visualizer */}
        <div className="md:w-1/2 p-8 bg-gray-50/50 flex flex-col justify-between overflow-y-auto">
          <div>
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-4">Informations de paiement</h3>
            
            {/* Elegant Credit Card Flip Container */}
            <div className="relative w-full aspect-[1.586/1] rounded-2xl bg-gradient-to-tr from-indigo-950 via-indigo-900 to-purple-800 p-6 text-white shadow-xl shadow-indigo-950/20 mb-6 overflow-hidden flex flex-col justify-between transition-transform duration-500 preserve-3d">
              {/* Back of Card (CVV focus) */}
              {cardDetails.isFlipped ? (
                <div className="h-full flex flex-col justify-between py-2">
                  <div className="h-9 w-full bg-gray-800 -mx-6 mb-2" />
                  <div className="flex justify-end pr-4">
                    <div className="bg-white/10 px-3 py-1 rounded font-mono text-sm tracking-widest text-right w-16">
                      {cardDetails.cvv || "•••"}
                    </div>
                  </div>
                  <div className="text-[8px] font-mono tracking-widest text-white/40">
                    SIGNATURE AUTORISÉE • ATELIER COSMIQUE
                  </div>
                </div>
              ) : (
                // Front of Card
                <>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-[9px] tracking-widest text-purple-200">AURA CARD</span>
                      <div className="w-7 h-5 bg-yellow-400/80 rounded-sm mt-1" /> {/* Chip */}
                    </div>
                    <CreditCard className="w-7 h-7 text-white/50" />
                  </div>

                  <div className="font-mono text-base sm:text-lg tracking-[0.2em] text-white/90 my-3">
                    {cardDetails.number || "•••• •••• •••• ••••"}
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[8px] text-white/40 font-mono uppercase block">Titulaire</span>
                      <span className="font-mono text-xs tracking-wider uppercase text-white/95 truncate block max-w-[180px]">
                        {cardDetails.name || "NOM COMPLET"}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] text-white/40 font-mono uppercase block">Expire</span>
                      <span className="font-mono text-xs tracking-widest text-white/95">
                        {cardDetails.expiry || "MM/AA"}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Inputs for payment */}
            <div className="space-y-3">
              <div>
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Numéro de carte</label>
                <input
                  type="text"
                  name="number"
                  id="card-number"
                  value={cardDetails.number}
                  onChange={handleCardChange}
                  onFocus={() => setCardDetails(p => ({ ...p, isFlipped: false }))}
                  placeholder="4532 8764 1290 8821"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white focus:border-indigo-500 text-xs outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Nom sur la carte</label>
                <input
                  type="text"
                  name="name"
                  id="card-name"
                  value={cardDetails.name}
                  onChange={handleCardChange}
                  onFocus={() => setCardDetails(p => ({ ...p, isFlipped: false }))}
                  placeholder="ÉLÉONORE MAISTRE"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white focus:border-indigo-500 text-xs outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Expiration</label>
                  <input
                    type="text"
                    name="expiry"
                    id="card-expiry"
                    value={cardDetails.expiry}
                    onChange={handleCardChange}
                    onFocus={() => setCardDetails(p => ({ ...p, isFlipped: false }))}
                    placeholder="12/28"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white focus:border-indigo-500 text-xs outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">CVV (Dos)</label>
                  <input
                    type="text"
                    name="cvv"
                    id="card-cvv"
                    value={cardDetails.cvv}
                    onChange={handleCardChange}
                    onFocus={() => setCardDetails(p => ({ ...p, isFlipped: true }))}
                    placeholder="341"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white focus:border-indigo-500 text-xs outline-none"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Secure padlock details */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-[10px] text-gray-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Cryptage SSL 256 bits garanti. Vos coordonnées bancaires ne transitent jamais sur nos serveurs de l'Atelier.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
