import React, { useEffect, useState } from "react";
import { Analytics, LiveSale } from "../types";
import { DollarSign, Eye, ShoppingBag, ArrowUpRight, Award, RefreshCw, Sparkles, MapPin } from "lucide-react";

interface DashboardProps {
  analytics: Analytics | null;
  liveFeed: LiveSale[];
  onRefresh: () => void;
}

export default function Dashboard({ analytics, liveFeed, onRefresh }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "live">("overview");

  if (!analytics) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Dashboard header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-gray-100 gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600">Atelier Live Hub</span>
          </div>
          <h1 className="text-3xl font-sans font-black text-gray-900 tracking-tight mt-1">Console d'Affaires Célestes</h1>
          <p className="text-gray-500 text-xs mt-0.5">Analytics de rentabilité et suivi des commandes cosmiques en temps réel.</p>
        </div>

        <button
          onClick={onRefresh}
          className="px-4 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Actualiser la Matrice
        </button>
      </div>

      {/* Analytics stats bento-grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total revenue */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-md shadow-gray-50/50 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-gray-400 block uppercase">Chiffre d'Affaires</span>
            <span className="text-xl sm:text-2xl font-black text-gray-900 block mt-1">{analytics.totalSales} €</span>
            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded mt-2 inline-flex items-center gap-0.5">
              <ArrowUpRight className="w-2.5 h-2.5" />
              +14.2% ce mois
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Total orders */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-md shadow-gray-50/50 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-gray-400 block uppercase">Commandes Initiées</span>
            <span className="text-xl sm:text-2xl font-black text-gray-900 block mt-1">{analytics.ordersCount}</span>
            <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded mt-2 inline-flex items-center gap-0.5">
              +100% de conversion
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Average cart basket */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-md shadow-gray-50/50 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-gray-400 block uppercase">Panier Moyen</span>
            <span className="text-xl sm:text-2xl font-black text-gray-900 block mt-1">{analytics.averageBasket} €</span>
            <span className="text-[9px] font-mono font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded mt-2 inline-flex">
              Premium tier
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Award className="w-6 h-6" />
          </div>
        </div>

        {/* Live users */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-md shadow-gray-50/50 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-gray-400 block uppercase">Utilisateurs en Ligne</span>
            <span className="text-xl sm:text-2xl font-black text-gray-900 block mt-1">{analytics.activeUsers}</span>
            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded mt-2 inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Temps réel
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Eye className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts & Graphical insights (2 columns) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-6 shadow-xl shadow-gray-50/50">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
            <h3 className="text-sm font-bold text-gray-800">Courbe d'Activité de Rentabilité (Ventes)</h3>
            <span className="px-2.5 py-1 text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
              ROI : +420%
            </span>
          </div>

          {/* Premium visual SVG chart to demonstrate high-end professional data presentation */}
          <div className="relative h-64 w-full flex items-end justify-between px-4 pb-2 border-b border-gray-100">
            {/* Grid background lines */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gray-50" />
            <div className="absolute inset-x-0 top-1/4 h-[1px] bg-gray-50" />
            <div className="absolute inset-x-0 top-2/4 h-[1px] bg-gray-50" />
            <div className="absolute inset-x-0 top-3/4 h-[1px] bg-gray-50" />

            {/* Custom crafted SVG bars for revenue tracking */}
            {[
              { label: "Jan", revenue: 2300 },
              { label: "Fév", revenue: 3800 },
              { label: "Mar", revenue: 4200 },
              { label: "Avr", revenue: 6400 },
              { label: "Mai", revenue: 7800 },
              { label: "Jui", revenue: analytics.totalSales }
            ].map((d, idx) => {
              const max = 15000;
              const heightPercent = Math.min(100, (d.revenue / max) * 100);
              return (
                <div key={idx} className="flex flex-col items-center flex-1 group">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow transition-opacity font-mono z-10 pointer-events-none">
                    {d.revenue} €
                  </div>
                  {/* Visual Bar */}
                  <div 
                    className="w-12 sm:w-16 bg-gradient-to-t from-indigo-900 to-indigo-500 rounded-t-lg transition-all duration-1000 ease-out shadow-lg hover:to-purple-500 cursor-pointer"
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="text-[10px] font-mono font-bold text-gray-400 mt-2">{d.label}</span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 mt-4 px-2">
            <span>Projection du chiffre d'affaires cumulatif (Semestre de lancement)</span>
            <span>Source : Matrice de l'Atelier</span>
          </div>
        </div>

        {/* Live global sales feed ticker (1 column) */}
        <div className="lg:col-span-1 bg-white rounded-3xl border border-gray-100 p-6 shadow-xl shadow-gray-50/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <h3 className="text-sm font-bold text-gray-800">Flux de Transmission Live</h3>
              <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-rose-50 text-rose-600 rounded animate-pulse">
                LIVE
              </span>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {liveFeed.map((sale, idx) => (
                <div key={idx} className="p-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-100 rounded-xl flex items-start justify-between transition-colors">
                  <div className="flex gap-2">
                    <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-gray-800 block leading-none">{sale.city}</span>
                      <span className="text-[10px] text-gray-500 block mt-1">{sale.item}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-indigo-900 block font-mono">+{sale.amount} €</span>
                    <span className="text-[9px] text-gray-400 font-mono block mt-0.5">{sale.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business guidance */}
          <div className="mt-6 pt-4 border-t border-gray-100 bg-gradient-to-tr from-indigo-50 to-purple-50/50 p-4 rounded-2xl flex items-start gap-2.5">
            <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-indigo-950 block">Conseil d'expansion</span>
              <span className="text-[10px] text-indigo-800/80 leading-relaxed block mt-0.5">
                La personnalisation par l'IA montre un taux d'acquisition supérieur de 48%. Boostez la campagne 'Artéfact de l'Âme' pour optimiser vos flux de trésorerie de l'Atelier.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
