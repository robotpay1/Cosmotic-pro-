import React from "react";
import { Product } from "../types";
import { X, Sparkles, Shield, Compass, Heart } from "lucide-react";

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductDetails({ product, onClose, onAddToCart }: ProductDetailsProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-950/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col md:flex-row border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Visual Container */}
        <div className="md:w-1/2 bg-gray-50 relative min-h-[300px] md:min-h-0">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <span className="px-2.5 py-1 text-[10px] font-mono bg-indigo-600 rounded-full flex items-center gap-1 w-max mb-2">
              <Sparkles className="w-3 h-3" />
              Harmonisé à 100%
            </span>
            <p className="text-xs text-gray-200">Indice énergétique : {product.energyIndex}</p>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <span className="text-[10px] font-mono tracking-wider text-indigo-600 uppercase font-semibold">
              Collection • {product.category}
            </span>
            <h2 className="font-sans text-2xl font-bold text-gray-900 mt-1 leading-tight">
              {product.name}
            </h2>
            <p className="font-mono text-xs text-gray-500 tracking-wide italic mt-1">
              "{product.tagline}"
            </p>

            <div className="mt-5 pt-5 border-t border-gray-100">
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Components & Ingredients */}
            <div className="mt-6">
              <h4 className="font-sans text-xs font-bold text-gray-800 uppercase tracking-wider mb-2.5">
                Alchimie de Composition
              </h4>
              <ul className="space-y-1.5">
                {product.components.map((comp, idx) => (
                  <li key={idx} className="text-xs text-gray-500 flex items-center gap-2">
                    <span 
                      className="w-1.5 h-1.5 rounded-full" 
                      style={{ backgroundColor: product.primaryColor || "#6366F1" }} 
                    />
                    {comp}
                  </li>
                ))}
              </ul>
            </div>

            {/* Guarantees */}
            <div className="mt-6 flex items-center gap-4 text-[10px] text-gray-400 border-t border-gray-50 pt-4">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-indigo-500" />
                Pureté Certifiée
              </span>
              <span className="flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-indigo-500" />
                Origine Céleste
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-indigo-500" />
                Fait Main (Atelier)
              </span>
            </div>
          </div>

          {/* Pricing & Checkout Buttons */}
          <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-gray-400 block">Investissement spirituel</span>
              <span className="text-2xl font-black text-gray-900">{product.price} €</span>
            </div>
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="px-6 py-3 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-150 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Acquérir l'Artéfact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
