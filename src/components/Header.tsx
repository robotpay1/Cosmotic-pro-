import React from "react";
import { ShoppingBag, Sparkles, Compass, Truck, BarChart2, Star } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cartCount: number;
  setIsCartOpen: (open: boolean) => void;
}

export default function Header({ currentTab, setCurrentTab, cartCount, setIsCartOpen }: HeaderProps) {
  const navItems = [
    { id: "shop", label: "Collection", icon: Compass },
    { id: "customizer", label: "Artéfact de l'Âme (IA)", icon: Sparkles },
    { id: "orders", label: "Mes Commandes", icon: Truck },
    { id: "reviews", label: "Témoignages", icon: Star },
    { id: "dashboard", label: "Tableau de Bord Vendeur", icon: BarChart2 },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            onClick={() => setCurrentTab("shop")}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-900 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200 transition-transform group-hover:rotate-12 duration-500">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-sans text-xl font-bold tracking-tight text-gray-900 block leading-tight">
                L'Atelier Cosmique
              </span>
              <span className="font-mono text-[10px] tracking-wider text-indigo-600 uppercase">
                Épicerie Sensorielle
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-indigo-600" : "text-gray-400"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Cart Trigger */}
          <div className="flex items-center space-x-4">
            <button
              id="cart-trigger"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-gray-100 text-gray-700 transition-colors duration-200"
            >
              <ShoppingBag className="w-6 h-6 text-gray-800" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/3 -translate-y-1/3 bg-indigo-600 rounded-full shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
