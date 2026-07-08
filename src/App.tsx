import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import ProductDetails from "./components/ProductDetails";
import AICustomizer from "./components/AICustomizer";
import CartDrawer from "./components/CartDrawer";
import Checkout from "./components/Checkout";
import OrderTracker from "./components/OrderTracker";
import Reviews from "./components/Reviews";
import Dashboard from "./components/Dashboard";

import { PRODUCTS } from "./data";
import { Product, CartItem, Order, Review, Analytics, LiveSale } from "./types";
import { Sparkles, Compass, Volume2, VolumeX, ShieldCheck, Heart, AlertCircle } from "lucide-react";

export default function App() {
  // Navigation & tabs state
  const [currentTab, setCurrentTab] = useState<string>("shop");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [checkoutDiscount, setCheckoutDiscount] = useState<number>(0);
  const [checkoutPromoCode, setCheckoutPromoCode] = useState<string>("");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // Detail Modal product state
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  // Core fullstack data synchronized from endpoints
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [liveFeed, setLiveFeed] = useState<LiveSale[]>([]);

  // Ambient soundwave visualizer simulator state
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [ambientTrack, setAmbientTrack] = useState<string>("Onde Thêta Universelle");

  // Load cart from localStorage on init
  useEffect(() => {
    const savedCart = localStorage.getItem("aura-cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (err) {
        console.error(err);
      }
    }
    // Fetch orders, reviews, analytics initially
    fetchOrders();
    fetchReviews();
    fetchAnalytics();
  }, []);

  // Save cart to localStorage
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("aura-cart", JSON.stringify(items));
  };

  // 1. API fetchers
  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error("Erreur de récupération des commandes", err);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (err) {
      console.error("Erreur de récupération des avis", err);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("/api/analytics");
      const data = await res.json();
      if (data.success) {
        setAnalytics(data.stats);
        setLiveFeed(data.liveFeed);
      }
    } catch (err) {
      console.error("Erreur de récupération des analytics", err);
    }
  };

  // 2. Cart mutations
  const handleAddToCart = (product: Product) => {
    const existingIndex = cartItems.findIndex(item => item.product.id === product.id);
    let updatedCart = [...cartItems];
    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart.push({ product, quantity: 1 });
    }
    saveCart(updatedCart);
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    const updatedCart = cartItems.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity };
      }
      return item;
    });
    saveCart(updatedCart);
  };

  const handleRemoveCartItem = (productId: string) => {
    const updatedCart = cartItems.filter(item => item.product.id !== productId);
    saveCart(updatedCart);
  };

  // 3. Checkout orchestration
  const handleInitCheckout = (discount: number, promo: string) => {
    setCheckoutDiscount(discount);
    setCheckoutPromoCode(promo);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (newOrder: Order) => {
    // Clear cart
    saveCart([]);
    setIsCheckoutOpen(false);
    // Refresh all streams
    fetchOrders();
    fetchAnalytics();
    // Redirect to orders tab for visual tracking
    setCurrentTab("orders");
  };

  // 4. Order tracking operations (Accelerating production steps)
  const handleSimulateStep = async (orderId: string) => {
    try {
      const res = await fetch("/api/orders/simulate-step", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId })
      });
      const data = await res.json();
      if (data.success) {
        fetchOrders();
        fetchAnalytics();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 5. Testimonial submission
  const handleSubmitReview = async (reviewData: { author: string; rating: number; comment: string; productName: string }) => {
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData)
      });
      const data = await res.json();
      if (data.success) {
        fetchReviews();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered Products helper
  const filteredProducts = PRODUCTS.filter(prod => {
    const matchesCategory = selectedCategory === "Tous" || prod.category === selectedCategory;
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50/40 text-gray-800 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Visual Ambient Sound Wave Bar / Mute Toggle */}
      <div className="bg-indigo-950 text-indigo-200 px-4 py-2.5 text-xs font-medium flex items-center justify-between shadow-inner">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span className="font-mono tracking-wide text-[10px]">COSMIC SOUNDWAVE INFUSION ACTIVE</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline font-mono text-[9px] bg-white/10 px-2 py-0.5 rounded text-white tracking-widest uppercase">
            {ambientTrack}
          </span>
          <button 
            onClick={() => {
              setIsMuted(!isMuted);
              if (isMuted) {
                // cycle track list
                const tracks = ["Onde Thêta Universelle", "Poussière stellaire (12Hz)", "Fréquence Céleste", "Aura Harmonics"];
                setAmbientTrack(tracks[Math.floor(Math.random() * tracks.length)]);
              }
            }}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-gray-400" />
                <span className="font-mono text-[9px]">SON OFF</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400 animate-bounce" />
                <span className="font-mono text-[9px] text-emerald-300">STREAMING</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Header navigation */}
      <Header 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        setIsCartOpen={setIsCartOpen}
      />

      {/* Content Renderer */}
      <main className="flex-grow">
        {currentTab === "shop" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            
            {/* Elegant Hero Visual Section */}
            <div className="relative rounded-3xl overflow-hidden bg-indigo-950 text-white p-8 sm:p-12 md:p-16 mb-12 shadow-2xl shadow-indigo-950/20 border border-indigo-900">
              {/* Absctract visual glow balls */}
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-indigo-500/20 filter blur-[80px]" />
              <div className="absolute bottom-0 left-1/3 w-60 h-60 rounded-full bg-purple-600/10 filter blur-[60px]" />
              
              <div className="relative z-10 max-w-xl">
                <span className="px-3 py-1 text-[10px] font-mono bg-indigo-600/50 rounded-full border border-indigo-500 uppercase tracking-widest font-semibold text-indigo-200">
                  Le Cabinet de Curiosités Modernes
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black tracking-tight text-white mt-4 leading-tight">
                  Artéfacts Célestes & Énergies Sensoriels
                </h1>
                <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                  Notre atelier conçoit des objets de prestige uniques combinant science moléculaire, métaux précieux et énergies cristallines pour ancrer votre bien-être dans le quotidien.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => setCurrentTab("customizer")}
                    className="px-5 py-3 font-semibold bg-white text-indigo-950 hover:bg-gray-100 rounded-xl text-xs transition-all shadow-md flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    Forger mon Artéfact (IA)
                  </button>
                  <button
                    onClick={() => {
                      const el = document.getElementById("collection-section");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-5 py-3 font-semibold bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs transition-all border border-white/20"
                  >
                    Parcourir la Galerie
                  </button>
                </div>
              </div>
            </div>

            {/* Filtering and Search controls */}
            <div id="collection-section" className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              {/* Category tabs */}
              <div className="flex flex-wrap gap-1.5">
                {["Tous", "Focus", "Calm", "Energy", "Lucidity"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                      selectedCategory === cat
                        ? "bg-indigo-900 text-white shadow-sm"
                        : "bg-white text-gray-600 border border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Real-time search bar */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un artéfact..."
                className="px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-xs bg-white w-full md:max-w-xs transition-all"
              />
            </div>

            {/* Product Display Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border p-12 text-center text-gray-400">
                <AlertCircle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-xs">Aucun artéfact ne correspond à vos critères de recherche.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onViewDetails={setDetailProduct}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Dynamic subcomponents pages */}
        {currentTab === "customizer" && (
          <AICustomizer onAddToCart={handleAddToCart} setCurrentTab={setCurrentTab} />
        )}

        {currentTab === "orders" && (
          <OrderTracker orders={orders} onSimulateStep={handleSimulateStep} onRefresh={fetchOrders} />
        )}

        {currentTab === "reviews" && (
          <Reviews reviews={reviews} onSubmitReview={handleSubmitReview} />
        )}

        {currentTab === "dashboard" && (
          <Dashboard analytics={analytics} liveFeed={liveFeed} onRefresh={fetchAnalytics} />
        )}
      </main>

      {/* Cart Drawer Drawer Overlay */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleInitCheckout}
      />

      {/* Detailed Product Modal overlay */}
      {detailProduct && (
        <ProductDetails
          product={detailProduct}
          onClose={() => setDetailProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Secure Checkout Form Overlay */}
      {isCheckoutOpen && (
        <Checkout
          cartItems={cartItems}
          discount={checkoutDiscount}
          promoCode={checkoutPromoCode}
          onClose={() => setIsCheckoutOpen(false)}
          onOrderSuccess={handleOrderSuccess}
        />
      )}

      {/* Modern minimal footer */}
      <footer className="bg-white border-t border-gray-100 py-10 mt-16 text-center text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex items-center justify-center gap-4 text-[10px] uppercase font-mono tracking-wider font-semibold text-gray-500">
            <span>Cryptage bancaire SSL</span>
            <span>•</span>
            <span>Matériaux Sacrés d'Origine</span>
            <span>•</span>
            <span>Service Clientèle Initié</span>
          </div>
          <p>© {new Date().getFullYear()} L'Atelier Cosmique. Tous droits de transmutation réservés.</p>
        </div>
      </footer>
    </div>
  );
}
