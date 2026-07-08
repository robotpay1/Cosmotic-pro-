import React, { useState } from "react";
import { Order } from "../types";
import { Truck, CheckCircle2, ChevronRight, Zap, RefreshCw, ShoppingBag, MapPin } from "lucide-react";

interface OrderTrackerProps {
  orders: Order[];
  onSimulateStep: (orderId: string) => void;
  onRefresh: () => void;
}

export default function OrderTracker({ orders, onSimulateStep, onRefresh }: OrderTrackerProps) {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const activeOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-sans font-black text-gray-900 tracking-tight">Suivi des Alchimies</h1>
          <p className="text-gray-500 text-xs mt-1">
            Visualisez le processus de purification et de fabrication de vos artéfacts célestes commandés.
          </p>
        </div>
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-gray-600 font-bold text-xs hover:bg-gray-100 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Actualiser les flux
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-lg shadow-gray-100/30">
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
            <Truck className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="font-bold text-gray-800 text-sm">Aucune commande enregistrée</h3>
          <p className="text-gray-400 text-xs mt-1 max-w-[280px] mx-auto">
            Vous n'avez pas encore passé commande. Visitez la collection pour faire vos acquisitions.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* List of orders */}
          <div className="md:col-span-1 space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">Historique d'Acquisition</h3>
            <div className="space-y-2">
              {orders.map((order) => {
                const isSelected = activeOrder?.id === order.id;
                return (
                  <button
                    key={order.id}
                    id={`order-tab-${order.id}`}
                    onClick={() => setSelectedOrderId(order.id)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50/30 shadow-sm"
                        : "border-gray-150 bg-white hover:border-gray-200"
                    }`}
                  >
                    <div>
                      <span className="font-mono text-xs font-bold text-indigo-700 block">{order.id}</span>
                      <span className="text-[10px] text-gray-400 mt-0.5 block">Passée le {order.date}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-bold text-gray-800 block">{order.total} €</span>
                      <span className="text-[9px] font-mono font-medium text-indigo-600 block bg-indigo-50 rounded px-1.5 py-0.5 mt-1">
                        {order.status}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed tracker timeline of the selected order */}
          {activeOrder && (
            <div className="md:col-span-2 bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xl shadow-gray-100/30">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-gray-100 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-indigo-600">{activeOrder.id}</span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      {activeOrder.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Date d'enregistrement : {activeOrder.date}</p>
                </div>

                {/* Simulation trigger button to accelerate alchemical state */}
                {activeOrder.step < 4 && (
                  <button
                    id={`btn-simulate-step-${activeOrder.id}`}
                    onClick={() => onSimulateStep(activeOrder.id)}
                    className="px-4 py-2.5 bg-indigo-900 text-white rounded-xl font-bold text-xs hover:bg-indigo-950 transition-colors flex items-center gap-1.5 shadow-md shadow-indigo-150 self-start sm:self-auto"
                  >
                    <Zap className="w-3.5 h-3.5 text-indigo-300 animate-bounce" />
                    Simuler l'étape suivante
                  </button>
                )}
              </div>

              {/* Steps Progress Visualizer */}
              <div className="mt-8 relative pl-8 space-y-8 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                {activeOrder.steps.map((step, idx) => {
                  const isCurrent = activeOrder.step === idx + 1;
                  const isDone = step.done;

                  return (
                    <div key={idx} className="relative">
                      {/* Step Marker */}
                      <span className={`absolute -left-8 top-0.5 w-7.5 h-7.5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isDone
                          ? "bg-indigo-600 border-indigo-600 text-white"
                          : isCurrent
                          ? "bg-white border-indigo-600 text-indigo-600 animate-pulse"
                          : "bg-white border-gray-200 text-gray-300"
                      }`}>
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        ) : (
                          <span className="text-xs font-bold">{idx + 1}</span>
                        )}
                      </span>

                      {/* Step details */}
                      <div>
                        <h4 className={`text-xs font-bold font-sans ${isCurrent ? "text-indigo-600 text-sm" : "text-gray-900"}`}>
                          {step.name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1 max-w-md">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Items summary inside details tab */}
              <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Artéfacts commandés</h4>
                <div className="space-y-2">
                  {activeOrder.cartItems.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50/50 border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                          <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-gray-800 block">{item.product.name}</span>
                          <span className="text-[10px] text-gray-400 block">Quantité : {item.quantity}</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-gray-700">{item.product.price * item.quantity} €</span>
                    </div>
                  ))}
                </div>

                {/* Delivery address details summary */}
                <div className="mt-6 pt-5 border-t border-gray-50 flex flex-col sm:flex-row gap-4 justify-between text-xs text-gray-500">
                  <div className="flex items-start gap-2 max-w-sm">
                    <MapPin className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-gray-700 block">Adresse de livraison</span>
                      <span className="block mt-0.5">
                        {activeOrder.shippingAddress.fullName}
                        <br />
                        {activeOrder.shippingAddress.address}, {activeOrder.shippingAddress.zipCode} {activeOrder.shippingAddress.city}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700 block text-left sm:text-right">Total Investi</span>
                    <span className="text-lg font-black text-indigo-900 block mt-0.5 text-left sm:text-right">{activeOrder.total} €</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
