import React from "react";
import { Product } from "../types";
import { Sparkles, ArrowRight, Star } from "lucide-react";

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails, onAddToCart }: ProductCardProps) {
  return (
    <div 
      className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-100/50 flex flex-col h-full"
    >
      {/* Energy Index and Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <span className="px-3 py-1 text-xs font-semibold bg-white/90 backdrop-blur-md text-gray-800 rounded-full shadow-sm border border-gray-100/50">
          {product.category}
        </span>
        <span className="px-2.5 py-1 text-[10px] font-mono bg-indigo-900 text-indigo-100 rounded-full shadow-sm flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-indigo-300" />
          Résonance {product.energyIndex}
        </span>
      </div>

      {/* Image Container with zoom effects */}
      <div 
        onClick={() => onViewDetails(product)}
        className="relative pt-[80%] overflow-hidden bg-gray-50 cursor-pointer"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 
          onClick={() => onViewDetails(product)}
          className="font-sans text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200 cursor-pointer"
        >
          {product.name}
        </h3>
        <p className="font-mono text-[11px] tracking-wide text-indigo-600 uppercase mt-1">
          {product.tagline}
        </p>
        <p className="text-gray-500 text-xs mt-3 line-clamp-3 leading-relaxed flex-grow">
          {product.description}
        </p>

        {/* Action area */}
        <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-gray-400 block">Prix initié</span>
            <span className="text-xl font-bold text-gray-900">{product.price} €</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onViewDetails(product)}
              className="px-3 py-2 text-xs font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200"
            >
              Détails
            </button>
            <button
              onClick={() => onAddToCart(product)}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl transition-all duration-200 flex items-center gap-1.5 shadow-md shadow-indigo-200 hover:shadow-indigo-300"
            >
              Acquérir
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
