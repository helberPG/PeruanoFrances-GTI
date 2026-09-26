/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { PHOTOS } from "../data";

export default function VisitaCampo() {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhoto !== null) {
      setActivePhoto((activePhoto - 1 + PHOTOS.length) % PHOTOS.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhoto !== null) {
      setActivePhoto((activePhoto + 1) % PHOTOS.length);
    }
  };

  return (
    <section id="visita" className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="px-6 sm:px-10 lg:px-12">
        <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2">
          00 · Introducción · La Institución en Campo
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
          La Institución en Campo
        </h2>
        <p className="text-slate-700 text-sm mb-8 leading-relaxed max-w-4xl">
          El equipo realizó una visita presencial a la I.E.P. Peruano Francés en Abril de 2026. Se recorrieron las instalaciones, se aplicó la entrevista y se recopiló evidencia fotográfica y documental de los flujos de trabajo tradicionales.
        </p>
        
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {PHOTOS.map((p, i) => (
            <div
              key={i}
              className="break-inside-avoid cursor-pointer overflow-hidden rounded-2xl shadow-xs border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all bg-white"
              onClick={() => setActivePhoto(i)}
            >
              <div className="overflow-hidden bg-slate-100">
                <img
                  src={p.src}
                  alt={p.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover hover:scale-[1.03] transition-transform duration-300"
                />
              </div>
              <div className="p-3 bg-white">
                <p className="text-[11px] sm:text-xs text-slate-700 leading-snug font-medium">
                  {p.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 transition-opacity duration-300"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-2xl relative">
              <img
                src={PHOTOS[activePhoto].src}
                alt={PHOTOS[activePhoto].caption}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[80vh] object-contain mx-auto"
              />
              <div className="p-4 bg-slate-900 text-white text-center">
                <p className="text-xs sm:text-sm font-medium">{PHOTOS[activePhoto].caption}</p>
              </div>
            </div>
            
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute -top-4 -right-4 bg-white text-slate-800 hover:bg-slate-100 w-9 h-9 rounded-full flex items-center justify-center font-bold shadow-lg cursor-pointer transition-colors"
              aria-label="Cerrar modal"
            >
              ✕
            </button>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePrev}
                className="bg-white/20 hover:bg-white/30 text-white font-semibold px-4 py-2 rounded-xl text-xs sm:text-sm transition-all cursor-pointer backdrop-blur-xs"
              >
                ← Anterior
              </button>
              <span className="text-white/60 font-mono text-xs">
                {activePhoto + 1} / {PHOTOS.length}
              </span>
              <button
                onClick={handleNext}
                className="bg-white/20 hover:bg-white/30 text-white font-semibold px-4 py-2 rounded-xl text-xs sm:text-sm transition-all cursor-pointer backdrop-blur-xs"
              >
                Siguiente →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
