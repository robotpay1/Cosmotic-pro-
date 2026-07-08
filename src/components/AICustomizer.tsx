import React, { useState } from "react";
import { Sparkles, Compass, Lightbulb, Zap, HelpCircle, ShoppingBag, Loader2, RefreshCw } from "lucide-react";
import { Product } from "../types";

interface AICustomizerProps {
  onAddToCart: (product: Product) => void;
  setCurrentTab: (tab: string) => void;
}

const ZODIACS = [
  { name: "Bélier", element: "Feu", emoji: "♈" },
  { name: "Taureau", element: "Terre", emoji: "♉" },
  { name: "Gémeaux", element: "Air", emoji: "♊" },
  { name: "Cancer", element: "Eau", emoji: "♋" },
  { name: "Lion", element: "Feu", emoji: "♌" },
  { name: "Vierge", element: "Terre", emoji: "♍" },
  { name: "Balance", element: "Air", emoji: "♎" },
  { name: "Scorpion", element: "Eau", emoji: "♏" },
  { name: "Sagittaire", element: "Feu", emoji: "♐" },
  { name: "Capricorne", element: "Terre", emoji: "♑" },
  { name: "Verseau", element: "Air", emoji: "♒" },
  { name: "Poissons", element: "Eau", emoji: "♓" }
];

const EMOTIONS = [
  { id: "stress", label: "Stress & Surcharge Mentale", desc: "Besoin de calme et de recentrage" },
  { id: "fatigue", label: "Fatigue Cosmique", desc: "Besoin de vitalité et d'élixir de feu" },
  { id: "block", label: "Blocage Créatif", desc: "Besoin d'inspiration stellaire" },
  { id: "focus", label: "Dispersion d'Attention", desc: "Besoin d'alignement et d'hyperfocus" },
  { id: "harmony", label: "Désalignement Spirituel", desc: "Besoin d'harmonie vibratoire" }
];

const SPECTRUNS = [
  { name: "Aura Cosmique (Ultra-Violet)", color: "#8B5CF6", bg: "bg-purple-600" },
  { name: "Or Solaire (Jaune Doré)", color: "#F59E0B", bg: "bg-amber-500" },
  { name: "Bleu Néon Céleste (Proton)", color: "#3B82F6", bg: "bg-blue-500" },
  { name: "Feu Cosmique (Crimson)", color: "#EF4444", bg: "bg-red-500" }
];

export default function AICustomizer({ onAddToCart, setCurrentTab }: AICustomizerProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedZodiac, setSelectedZodiac] = useState<string>("");
  const [selectedEmotion, setSelectedEmotion] = useState<string>("");
  const [selectedLight, setSelectedLight] = useState<string>("");
  const [intention, setIntention] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const [generatedArtifact, setGeneratedArtifact] = useState<Product | null>(null);

  const simulateLoading = async () => {
    const messages = [
      "Interrogation de la carte céleste...",
      "Alignement des ondes de résonance...",
      "Calibrage des lentilles de quartz...",
      "Fusion de la lumière spectrale...",
      "Gravure des métaux sacrés...",
      "L'artéfact se matérialise..."
    ];

    for (let i = 0; i < messages.length; i++) {
      setLoadingMessage(messages[i]);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
  };

  const handleGenerate = async () => {
    if (!selectedZodiac || !selectedEmotion || !selectedLight) return;
    
    setIsGenerating(true);
    setStep(4); // Loading step
    
    // Start message cycle concurrently
    const loadingPromise = simulateLoading();

    try {
      const response = await fetch("/api/personalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          zodiac: selectedZodiac,
          emotion: selectedEmotion,
          light: selectedLight,
          intention: intention || "Alignement global de l'esprit"
        })
      });

      const data = await response.json();
      
      // Wait for loading simulation to finalize smoothly
      await loadingPromise;

      if (data.success && data.artifact) {
        // Build product structure from generated details
        const art = data.artifact;
        const mappedProduct: Product = {
          id: "custom-" + Date.now(),
          name: art.name,
          tagline: art.tagline,
          description: art.description,
          price: Number(art.price) || 119,
          category: "Energy", // Custom category or Dynamic
          imageUrl: art.imageUrl, // Needs key word matching on client
          energyIndex: art.energyIndex || "95%",
          components: art.components || ["Éléments de comètes", "Quartz sacré"],
          primaryColor: art.primaryColor || "#6366F1"
        };
        setGeneratedArtifact(mappedProduct);
        setStep(5); // Completion step
      }
    } catch (err) {
      console.error(err);
      // Fallback handled gracefully in API, but if network error:
      setStep(1);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedZodiac("");
    setSelectedEmotion("");
    setSelectedLight("");
    setIntention("");
    setGeneratedArtifact(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Visual background header */}
      <div className="text-center mb-10">
        <span className="px-3 py-1 text-xs font-semibold bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100 uppercase tracking-wider font-mono">
          Propulsé par Gemini AI
        </span>
        <h1 className="text-3xl sm:text-4xl font-sans font-black text-gray-900 mt-3 tracking-tight">
          L'Alchimiste d'Artéfacts Célestes
        </h1>
        <p className="text-gray-500 text-sm mt-2 max-w-lg mx-auto">
          Répondez à notre diagnostic sensoriel et laissez l'intelligence artificielle concevoir un objet physique d'exception parfaitement harmonisé avec vos énergies actuelles.
        </p>
      </div>

      {/* Main interactive area card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/40 overflow-hidden min-h-[480px] flex flex-col">
        {/* Progress indicators */}
        {step < 4 && (
          <div className="flex border-b border-gray-50 bg-gray-50/50 p-4 justify-around text-xs font-mono text-gray-400">
            <span className={`flex items-center gap-1.5 font-semibold ${step === 1 ? "text-indigo-600" : "text-gray-500"}`}>
              <Compass className="w-4 h-4" /> 1. Ciel Astral ({selectedZodiac || "En attente"})
            </span>
            <span className={`flex items-center gap-1.5 font-semibold ${step === 2 ? "text-indigo-600" : "text-gray-500"}`}>
              <Zap className="w-4 h-4" /> 2. Alignement Sensoriel ({selectedEmotion ? "Défini" : "En attente"})
            </span>
            <span className={`flex items-center gap-1.5 font-semibold ${step === 3 ? "text-indigo-600" : "text-gray-500"}`}>
              <Lightbulb className="w-4 h-4" /> 3. Spectre & Intention
            </span>
          </div>
        )}

        {/* STEP 1: Zodiac selection */}
        {step === 1 && (
          <div className="p-8 flex flex-col flex-grow justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Sélectionnez votre signe astrologique</h2>
              <p className="text-gray-400 text-xs mb-6">La position des astres influe sur la polarité de votre artéfact.</p>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {ZODIACS.map((zodiac) => (
                  <button
                    key={zodiac.name}
                    id={`zodiac-${zodiac.name}`}
                    onClick={() => setSelectedZodiac(zodiac.name)}
                    className={`p-4 rounded-2xl border text-center transition-all duration-300 ${
                      selectedZodiac === zodiac.name
                        ? "border-indigo-600 bg-indigo-50/40 shadow-sm"
                        : "border-gray-100 hover:border-gray-200 hover:bg-gray-50/50"
                    }`}
                  >
                    <span className="text-2xl block mb-1">{zodiac.emoji}</span>
                    <span className="text-xs font-semibold text-gray-800 block">{zodiac.name}</span>
                    <span className="text-[9px] font-mono text-gray-400">{zodiac.element}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                id="btn-next-step-1"
                disabled={!selectedZodiac}
                onClick={() => setStep(2)}
                className={`px-6 py-3 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all duration-200 ${
                  !selectedZodiac ? "opacity-50 cursor-not-allowed" : "shadow-md shadow-indigo-150"
                }`}
              >
                Suivant
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Emotion / Vibe selection */}
        {step === 2 && (
          <div className="p-8 flex flex-col flex-grow justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Quel état émotionnel souhaitez-vous cibler ?</h2>
              <p className="text-gray-400 text-xs mb-6">L'objet sera imprégné de fréquences compensatoires adaptées.</p>

              <div className="space-y-3">
                {EMOTIONS.map((emotion) => (
                  <button
                    key={emotion.id}
                    id={`emotion-${emotion.id}`}
                    onClick={() => setSelectedEmotion(emotion.label)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all duration-300 ${
                      selectedEmotion === emotion.label
                        ? "border-indigo-600 bg-indigo-50/40 shadow-sm"
                        : "border-gray-100 hover:border-gray-200 hover:bg-gray-50/50"
                    }`}
                  >
                    <div>
                      <span className="text-sm font-bold text-gray-800 block">{emotion.label}</span>
                      <span className="text-xs text-gray-400 mt-0.5 block">{emotion.desc}</span>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      selectedEmotion === emotion.label ? "border-indigo-600 bg-indigo-600" : "border-gray-200"
                    }`}>
                      {selectedEmotion === emotion.label && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between mt-8 pt-5 border-t border-gray-50">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 font-semibold text-gray-500 hover:text-gray-800 transition-colors"
              >
                Retour
              </button>
              <button
                id="btn-next-step-2"
                disabled={!selectedEmotion}
                onClick={() => setStep(3)}
                className={`px-6 py-3 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all duration-200 ${
                  !selectedEmotion ? "opacity-50 cursor-not-allowed" : "shadow-md shadow-indigo-150"
                }`}
              >
                Suivant
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Light & Intention inputs */}
        {step === 3 && (
          <div className="p-8 flex flex-col flex-grow justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Configurez la polarisation énergétique</h2>
              <p className="text-gray-400 text-xs mb-6 font-sans">Choisissez votre spectre lumineux et spécifiez une intention d'harmonisation personnelle.</p>

              <div className="space-y-6">
                {/* Light Spectrum select */}
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-3">Spectre Lumineux Majeur</label>
                  <div className="grid grid-cols-2 gap-3">
                    {SPECTRUNS.map((spec) => (
                      <button
                        key={spec.name}
                        id={`light-${spec.name.replace(/\s+/g, '')}`}
                        onClick={() => setSelectedLight(spec.name)}
                        className={`p-4 rounded-2xl border flex items-center gap-3 transition-all duration-300 ${
                          selectedLight === spec.name
                            ? "border-indigo-600 bg-indigo-50/40 shadow-sm"
                            : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full ${spec.bg} shrink-0`} />
                        <span className="text-xs font-bold text-gray-800 text-left">{spec.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Intention Text */}
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">Votre Intention Spirituelle (Facultatif)</label>
                  <input
                    type="text"
                    id="input-intention"
                    value={intention}
                    onChange={(e) => setIntention(e.target.value)}
                    placeholder="Ex: Rester calme sous la pression, Libérer l'écriture..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm outline-none transition-all"
                  />
                  <span className="text-[10px] text-gray-400 mt-1.5 block">L'IA Gemini liera cette phrase aux caractéristiques moléculaires de votre objet.</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8 pt-5 border-t border-gray-50">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 font-semibold text-gray-500 hover:text-gray-800 transition-colors"
              >
                Retour
              </button>
              <button
                id="btn-trigger-fusion"
                disabled={!selectedLight}
                onClick={handleGenerate}
                className={`px-6 py-3 font-semibold text-white bg-indigo-900 hover:bg-indigo-950 rounded-xl transition-all duration-200 flex items-center gap-2 ${
                  !selectedLight ? "opacity-50 cursor-not-allowed" : "shadow-lg shadow-indigo-200"
                }`}
              >
                <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
                Lancer la Fusion d'Artéfact
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Loader animation */}
        {step === 4 && (
          <div className="p-12 flex flex-col flex-grow items-center justify-center text-center">
            <div className="relative w-24 h-24 mb-6">
              {/* Spinning particle lines */}
              <div className="absolute inset-0 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
              <div className="absolute inset-2 rounded-full border-4 border-dashed border-purple-100 border-b-purple-500 animate-spin duration-3000" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-indigo-600 animate-pulse" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 font-sans">{loadingMessage}</h3>
            <p className="text-gray-400 text-xs mt-2 max-w-sm">Veuillez patienter pendant que nos algorithmes alchimiques couplent la sagesse stellaire à la matière physique.</p>
          </div>
        )}

        {/* STEP 5: Generated Artifact Display! */}
        {step === 5 && generatedArtifact && (
          <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-stretch flex-grow bg-gradient-to-tr from-indigo-950/5 via-transparent to-transparent">
            {/* Visual Pedestal */}
            <div className="md:w-1/2 rounded-2xl overflow-hidden relative border border-gray-100 bg-gray-50 flex items-center justify-center min-h-[280px]">
              {/* Dynamic matching image keyword */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 text-[10px] font-mono bg-indigo-900 text-indigo-100 rounded-full shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                  RÉSONANCE : {generatedArtifact.energyIndex}
                </span>
              </div>

              {/* Pedestal glows */}
              <div 
                className="absolute w-48 h-48 rounded-full filter blur-[40px] opacity-20 animate-pulse" 
                style={{ backgroundColor: generatedArtifact.primaryColor }}
              />

              <div className="relative z-10 p-6 text-center">
                {/* Fallback to keyword icons if dynamic URL loading issues */}
                <div 
                  className="w-32 h-32 mx-auto rounded-full bg-white/95 border shadow-xl flex items-center justify-center transition-transform hover:scale-105 duration-500"
                  style={{ borderColor: generatedArtifact.primaryColor + "33" }}
                >
                  <Sparkles className="w-12 h-12 animate-pulse" style={{ color: generatedArtifact.primaryColor }} />
                </div>
                <div className="mt-4 font-mono text-[10px] uppercase text-gray-400 tracking-wider">
                  Matérialisation stabilisée
                </div>
              </div>
            </div>

            {/* Generated description & Add to cart */}
            <div className="md:w-1/2 flex flex-col justify-between">
              <div>
                <span className="px-2.5 py-1 text-[9px] font-mono font-bold tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full uppercase">
                  Artéfact Sur Mesure
                </span>
                <h2 className="text-2xl font-black text-gray-900 mt-2 font-sans leading-tight">
                  {generatedArtifact.name}
                </h2>
                <p className="font-mono text-xs text-indigo-600 mt-1 uppercase tracking-wide">
                  "{generatedArtifact.tagline}"
                </p>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 leading-relaxed italic">
                    {generatedArtifact.description}
                  </p>
                </div>

                {/* Simulated Chemical parts */}
                <div className="mt-5">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Composants Alchimiques Générés</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {generatedArtifact.components.map((comp, idx) => (
                      <span key={idx} className="px-2.5 py-1 text-[10px] font-semibold bg-gray-50 border border-gray-100 rounded-lg text-gray-600 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: generatedArtifact.primaryColor }} />
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Checkout actions */}
              <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-gray-400 block">Investissement requis</span>
                  <span className="text-2xl font-black text-gray-900">{generatedArtifact.price} €</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleReset}
                    className="p-3 text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                    title="Recommencer"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    id="btn-add-custom-to-cart"
                    onClick={() => {
                      onAddToCart(generatedArtifact);
                      setCurrentTab("shop");
                    }}
                    className="px-5 py-3 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-150 flex items-center gap-2 text-xs"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Acquérir cet Artéfact unique
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
