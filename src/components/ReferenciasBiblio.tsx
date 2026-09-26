/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { REFERENCIAS } from "../data";

export default function ReferenciasBiblio() {
  return (
    <section
      id="referencias"
      className="py-14 bg-white border-t border-slate-200 animate-fade-in"
    >
      <div className="px-6 sm:px-10 lg:px-12">
        <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2">
          Bibliografía
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
          Referencias Bibliográficas
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm mb-8 max-w-2xl text-justify font-medium">
          Fuentes académicas, normativas distritales y regulaciones ministeriales consultadas para la formulación y evaluación de este proyecto TI. Formato estándar APA 7.ª edición.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-5xl">
          <ol className="space-y-6">
            {REFERENCIAS.map((ref, i) => (
              <li key={ref.clave} className="flex gap-4">
                <span className="font-mono flex-shrink-0 w-7 h-7 rounded-full bg-[#e8f5f5] text-[#0a5c5f] font-bold text-[10px] flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <span className="font-mono inline-block bg-[#e8f5f5] border border-[#c0e0e0] text-[#0a5c5f] text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded mb-1.5 shadow-xxs">
                    {ref.clave}
                  </span>
                  <p className="text-slate-850 text-xs sm:text-sm leading-relaxed text-justify">
                    {ref.texto}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
