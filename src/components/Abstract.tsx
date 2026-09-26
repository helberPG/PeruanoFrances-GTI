/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Cite from "./Cite";

export default function Abstract() {
  const keywords = [
    "Machine Learning",
    "Bajo rendimiento académico",
    "PMBOK 6",
    "Gestión de proyectos TI",
    "Alertas tempranas",
    "IEP Peruano Francés",
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-100 animate-fade-in">
      <div className="px-6 sm:px-10 lg:px-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider font-mono">
              Resumen / Abstract
            </span>
            <span className="font-mono text-slate-700 text-[10px] sm:text-[11px]">
              Metodología: PMBOK® 6.ª edición <Cite r="PMI, 2017" />
            </span>
          </div>
          <p className="text-slate-800 leading-relaxed text-xs sm:text-sm text-justify">
            El presente trabajo formula y evalúa un proyecto de tecnología de información orientado a la detección temprana del riesgo de deserción escolar en la Institución Educativa Privada I.E.P. Peruano Francés, ubicada en Villa el Salvador, Lima, Perú. Siguiendo los lineamientos del{" "}
            <strong className="text-slate-900">PMBOK® 6.ª edición</strong>
            <Cite r="PMI, 2017" />, se identificaron los factores ambientales de la empresa, los activos de los procesos de la organización y se realizó un análisis exhaustivo de interesados. El diagnóstico se fundamenta en una entrevista semi-estructurada aplicada en abril de 2026, que evidenció procesos 100&nbsp;% manuales de registro de asistencia e incidencias, y una tasa de acceso del 60&nbsp;% de los padres de familia a la plataforma institucional Cubicol
            <Cite r="MINEDU, 2023" />. La solución propuesta es un sistema web inteligente basado en técnicas de{" "}
            <strong className="text-slate-900">Machine Learning</strong>
            <Cite r="Romero & Ventura, 2010" /> que procesa variables de asistencia, rendimiento académico e incidencias conductuales para generar alertas tempranas de intervención. El modelo de negocio fue estructurado mediante el{" "}
            <strong className="text-slate-900">Business Model Canvas</strong>
            <Cite r="Osterwalder & Pigneur, 2010" />.
          </p>
          <div className="mt-5 pt-4 border-t border-slate-200 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] sm:text-[11px] text-slate-700 font-bold">
              Palabras clave:
            </span>
            {keywords.map((k) => (
              <span
                key={k}
                className="bg-[#e8f5f5] text-[#0a5c5f] border border-[#c0e0e0] text-[10px] sm:text-xs px-2 px-2.5 py-0.5 rounded-full font-medium"
              >
                {k}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
