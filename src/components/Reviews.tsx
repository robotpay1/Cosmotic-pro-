import React, { useState } from "react";
import { Review } from "../types";
import { Star, MessageSquarePlus, Sparkles, AlertCircle } from "lucide-react";

interface ReviewsProps {
  reviews: Review[];
  onSubmitReview: (review: { author: string; rating: number; comment: string; productName: string }) => void;
}

export default function Reviews({ reviews, onSubmitReview }: ReviewsProps) {
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [productName, setProductName] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;

    onSubmitReview({ author, rating, comment, productName: productName || "Artéfact Céleste" });
    
    setAuthor("");
    setRating(5);
    setComment("");
    setProductName("");
    setIsFormOpen(false);
    
    setSuccessMsg("Témoignage transmis avec succès à l'Atelier !");
    setTimeout(() => setSuccessMsg(""), 3500);
  };

  const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Page header */}
      <div className="text-center mb-10">
        <span className="px-3 py-1 text-xs font-semibold bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100 uppercase tracking-wider font-mono">
          Paroles d'initiés
        </span>
        <h1 className="text-3xl font-sans font-black text-gray-900 mt-2 tracking-tight">Témoignages & Vibrations</h1>
        <p className="text-gray-500 text-sm mt-1 max-w-md mx-auto">
          Découvrez les ressentis énergétiques et retours d'expériences de la communauté sur nos artéfacts célestes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Global review stats card */}
        <div className="md:col-span-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-lg shadow-gray-100/20 text-center">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Score de Résonance</h3>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-5xl font-black text-gray-900">{averageRating}</span>
            <span className="text-sm font-mono text-gray-400">/ 5.0</span>
          </div>
          
          <div className="flex justify-center gap-1 text-amber-400 my-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 fill-current" />
            ))}
          </div>
          
          <p className="text-xs text-gray-500 mb-6">Basé sur {reviews.length} transmissions d'ondes positives.</p>

          <button
            id="btn-open-review-form"
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="w-full py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <MessageSquarePlus className="w-4 h-4" />
            Déposer mon témoignage
          </button>
        </div>

        {/* Reviews list and submit review form */}
        <div className="md:col-span-2 space-y-4">
          {successMsg && (
            <div className="p-3.5 text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-150 rounded-xl flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
              {successMsg}
            </div>
          )}

          {/* New Review Form drawer style/card */}
          {isFormOpen && (
            <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-150 shadow-inner space-y-4 animate-fade-in">
              <h3 className="text-sm font-bold text-gray-800">Transmettre vos impressions sensorielles</h3>
              
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Votre Nom</label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Jean-Marc L."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-white outline-none focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Artéfact acquis</label>
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="Ex: Le Sablier de Chronos"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-white outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Note énergétique :</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        id={`rating-star-${star}`}
                        onClick={() => setRating(star)}
                        className={`p-1 transition-colors ${rating >= star ? "text-amber-400" : "text-gray-200"}`}
                      >
                        <Star className="w-5 h-5 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Votre Commentaire</label>
                  <textarea
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Décrivez comment l'objet résonne dans votre quotidien..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-white outline-none focus:border-indigo-500 resize-none"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-800"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    id="btn-submit-review"
                    className="px-5 py-2 bg-indigo-900 text-white font-bold text-xs rounded-xl hover:bg-indigo-950 transition-colors"
                  >
                    Transmettre
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* List of customer testimonials */}
          <div className="space-y-3">
            {reviews.map((review) => (
              <div 
                key={review.id}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-md shadow-gray-100/10 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={review.avatar} 
                      alt={review.author} 
                      className="w-9 h-9 rounded-full object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="text-xs font-bold text-gray-900 block">{review.author}</span>
                      <span className="text-[9px] font-mono font-medium text-indigo-600 block mt-0.5">Acquéreur de : {review.productName}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400">{review.date}</span>
                </div>

                {/* Rating stars */}
                <div className="flex text-amber-400 gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? "fill-current" : "text-gray-100"}`} />
                  ))}
                </div>

                <p className="text-gray-600 text-xs leading-relaxed font-sans">
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
