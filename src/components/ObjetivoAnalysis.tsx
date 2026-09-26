/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import Cite from "./Cite";

export default function ObjetivoAnalysis() {
  const smartCriteria = [
    {
      letra: "S",
      nombre: "Específico (Specific)",
      estado: "corregido",
      cumple: [
        "Nombra la institución: IE Peruano Francés",
        "Define la herramienta: Machine Learning predictivo",
        "Especifica las variables evaluadas: asistencia, notas e incidencias",
        "Delimita los beneficiarios directos: docentes y directivos",
      ],
      mejora: "Se agregaron explícitamente las variables de entrada del algoritmo y los actores involucrados — que estaban implícitos originalmente.",
    },
    {
      letra: "M",
      nombre: "Medible (Measurable)",
      estado: "corregido",
      cumple: [
        "Establece una métrica clara: reducir el reporte tardío en al menos un 30%",
        "Alineado con el reclamo del 100% de la P7 de la encuesta docente",
        "Se contrastará contra los registros tradicionales del año previo",
      ],
      mejora: "Se agregó la meta numérica de reducción de un 30% — originalmente el objetivo era cualitativo ('mejorar').",
    },
    {
      letra: "A",
      nombre: "Alcanzable (Achievable)",
      estado: "cumple",
      cumple: [
        "Infraestructura e internet WIN de fibra óptica 1000 Mbps disponible",
        "Bases históricas consistentes de 7 años acumuladas en Cubicol",
        "Aceptación masiva docente: 83.3% favorable al uso de ML predictivo",
      ],
      mejora: null,
    },
    {
      letra: "R",
      nombre: "Relevante (Relevant)",
      estado: "cumple",
      cumple: [
        "Alineación total con la meta estratégica de retención escolar de la dirección",
        "Ataca la causa raíz central: dispersión y manualidad del cuaderno auxiliar",
        "Resuelve el retraso de tutorías preventivas",
      ],
      mejora: null,
    },
    {
      letra: "T",
      nombre: "Temporal (Time-bound)",
      estado: "corregido",
      cumple: [
        "Acotado al horizonte temporal del ciclo lectivo escolar del año 2026",
      ],
      mejora: "Se agregó la acotación temporal 'durante el año escolar 2026' — omitida en el Marco Lógico original.",
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* ── ENTRADA: PROBLEMA A OBJETIVO ── */}
      <section id="p03-entradas" className="py-14 bg-white border-b border-slate-200">
        <div className="px-6 sm:px-10 lg:px-12">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2">
            03 · Análisis del Objetivo · Entrada
          </span>
          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-2">
            Inversión del Enunciado del Problema
          </h2>
          <p className="text-slate-650 text-sm mb-8 leading-relaxed max-w-4xl text-justify">
            Siguiendo las pautas de formulación de la metodología del Marco Lógico, las relaciones negativas de causas y efectos se invierten positivamente para dar paso a las relaciones instrumentales de medios y fines
            <Cite r="CEPAL/ILPES, 2005" />.
          </p>

          <div className="max-w-4xl">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="border border-red-250 bg-red-50/40 rounded-2xl p-5 shadow-xxs">
                <p className="font-mono text-[9px] text-red-700 uppercase tracking-widest font-black mb-1.5">
                  Problema Central (Entrada)
                </p>
                <p className="text-sm sm:text-base font-serif font-bold text-slate-900 leading-snug">
                  "Deficiente detección temprana del bajo rendimiento académico estudiantil."
                </p>
              </div>

              <div className="border border-emerald-200 bg-emerald-50/40 rounded-2xl p-5 shadow-xxs">
                <p className="font-mono text-[9px] text-emerald-800 uppercase tracking-widest font-black mb-1.5">
                  Objetivo General Correspondiente
                </p>
                <p className="text-sm sm:text-base font-serif font-bold text-slate-900 leading-snug">
                  "Mejorar la detección temprana del bajo rendimiento académico académico estudiantil."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ÁRBOL DE OBJETIVOS (MEDIOS Y FINES) ── */}
      <section id="p03-herramientas" className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="px-6 sm:px-10 lg:px-12">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2">
            03 · Análisis del Objetivo · Herramientas y Técnicas
          </span>
          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-2">
            Árbol de Objetivos (Estructura de Medios y Fines)
          </h2>
          <p className="text-slate-700 text-sm mb-8 leading-relaxed max-w-4xl text-justify">
            La transformación lógica permite concebir los entregables del sistema como medios instrumentales que inciden directamente en los fines educativos de retención
            <Cite r="CEPAL/ILPES, 2005" />.
          </p>

          <div className="mb-12 max-w-5xl">
            <h3 className="font-mono text-[10px] text-slate-550 uppercase tracking-widest font-black mb-4">
              Medios Instrumentales — Líneas de Acción
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-xs sm:text-sm">
              <div className="border border-emerald-250 bg-white p-5 rounded-2xl shadow-xxs">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2 border-b pb-2">
                  <span className="text-emerald-700 font-mono text-[10px] bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-100">
                    Medios Directos (Entregables)
                  </span>
                </h4>
                <ul className="space-y-2 text-slate-700 font-medium">
                  <li>• Análisis integrado automatizado de datos escolares multidimensionales.</li>
                  <li>• Control logístico asistencial diario con QR (asistente ágil).</li>
                  <li>• Modelos de Machine Learning entrenados predictivamente</li>
                  <li>• Dashboard bento de indicadores predictivos directivos.</li>
                </ul>
              </div>

              <div className="border border-emerald-250 bg-white p-5 rounded-2xl shadow-xxs">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2 border-b pb-2">
                  <span className="text-emerald-700 font-mono text-[10px] bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-100">
                    Medios Indirectos (Facilitadores)
                  </span>
                </h4>
                <ul className="space-y-2 text-slate-700 font-medium">
                  <li>• Interoperabilidad de bases de datos relacionales privadas.</li>
                  <li>• Reportaje modular automatizado de incidencias conductuales.</li>
                  <li>• Sensibilización y capacitación del equipo docente tutor.</li>
                  <li>• Integración del portal consultivo seguro para apoderados.</li>
                </ul>
              </div>

              <div className="border border-blue-200 bg-blue-50/30 p-5 rounded-2xl shadow-xxs">
                <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2 border-b border-blue-100 pb-2">
                  <span className="text-blue-700 font-mono text-[10px] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-150">
                    Fines directos (Resultados a corto plazo)
                  </span>
                </h4>
                <ul className="space-y-2 text-slate-750 font-medium">
                  <li>• Habilitación de tutorías preventivas ágiles e inmediatas.</li>
                  <li>• Retorno dinámico de promedios ponderados estudiantiles.</li>
                  <li>• Disminución del fracaso e inasistencias acumulativas.</li>
                </ul>
              </div>

              <div className="border border-blue-200 bg-blue-50/30 p-5 rounded-2xl shadow-xxs">
                <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2 border-b border-blue-100 pb-2">
                  <span className="text-blue-700 font-mono text-[10px] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-150">
                    Fin último (Impacto sistémico institucional)
                  </span>
                </h4>
                <ul className="space-y-2 text-slate-750 font-medium">
                  <li>• Incremento del estándar de calidad académica de la IEP.</li>
                  <li>• Modelo tecnológico replicable y escalable en VES</li>
                  <li>• Sostenibilidad del presupuesto anual por retención de matrículas.</li>
                </ul>
              </div>
            </div>

            <div className="border border-slate-200 rounded-2xl bg-white p-5 shadow-xs">
              <h4 className="font-serif font-bold text-slate-800 text-xs sm:text-sm mb-3">
                Diagrama Positivo de Medios y Fines (Árbol de Objetivos)
              </h4>
              <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center p-3">
                <img
                  src="/arbol-objetivos.png"
                  alt="Árbol de Objetivos escolar"
                  referrerPolicy="no-referrer"
                  className="w-full max-w-2xl h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALIDACIÓN DEL CRITERIO SMART ── */}
      <section id="p03-smart" className="py-14 bg-white border-b border-slate-200">
        <div className="px-6 sm:px-10 lg:px-12">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2">
            03 · Análisis del Objetivo · Pruebas de Calidad
          </span>
          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-2">
            Ajuste SMART de los Enunciados
          </h2>
          <p className="text-slate-650 text-sm mb-8 leading-relaxed max-w-4xl text-justify">
            Para blindar metodológicamente el objetivo derivado del Marco Lógico, se cruzó minuciosamente por las cinco dimensiones regulatorias del estándar SMART
            <Cite r="PMI, 2017" />.
          </p>

          <div className="space-y-4 max-w-4xl">
            {smartCriteria.map((c) => (
              <div
                key={c.letra}
                className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs"
              >
                <div className="flex items-center gap-4 px-5 py-3.5 border-b border-slate-100 bg-slate-50/50">
                  <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-black font-serif text-base sm:text-lg flex-shrink-0 ${
                      c.estado === "cumple" ? "bg-emerald-600 text-white" : "bg-blue-600 text-white"
                    }`}
                  >
                    {c.letra}
                  </span>
                  <p className="font-bold text-slate-800 text-xs sm:text-sm flex-1">{c.nombre}</p>
                  <span
                    className={`font-mono text-[9px] sm:text-[10px] px-2.5 py-1 rounded-full font-bold ${
                      c.estado === "cumple"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {c.estado === "cumple" ? "✓ Directo" : "✓ Refinado"}
                  </span>
                </div>
                <div className="px-5 py-4">
                  <ul className="space-y-1.5 mb-2.5">
                    {c.cumple.map((item, i) => (
                      <li key={i} className="text-xs text-slate-700 flex items-start gap-2 font-medium">
                        <span className="text-emerald-600 font-bold mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {c.mejora && (
                    <div className="text-xs text-blue-800 bg-blue-50/70 border border-blue-200 rounded-xl p-3 mt-3 font-medium">
                      <strong className="text-blue-900 font-bold uppercase font-mono text-[10px] block mb-1">
                        Ajuste del alineamiento:
                      </strong>
                      <span className="italic">"{c.mejora}"</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENUNCIADO DE OBJETIVO CENTRAL CON TEMPORE ── */}
      <section id="p03-salidas" className="py-14 bg-white border-b border-slate-200">
        <div className="px-6 sm:px-10 lg:px-12">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2">
            03 · Análisis del Objetivo · Salida
          </span>
          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8">
            Enunciado Consolidado del Objetivo Temporalizado
          </h2>

          <div className="max-w-4xl">
            <div className="border-l-4 border-emerald-600 bg-emerald-50/70 p-6 rounded-r-2xl mb-6 shadow-xxs">
              <h3 className="text-[10px] font-mono text-emerald-750 uppercase tracking-widest font-black mb-1.5">
                Objetivo General Invertido
              </h3>
              <p className="text-lg sm:text-xl font-serif font-bold text-slate-905 leading-relaxed text-justify italic">
                "Mejorar la detección temprana del bajo rendimiento académico estudiantil mediante un sistema inteligente basado en Machine Learning en la IE Peruano Francés."
              </p>
            </div>

            <div className="border border-emerald-250 rounded-2xl p-5 bg-white shadow-xxs mb-6">
              <h3 className="text-[10px] font-mono text-emerald-700 uppercase tracking-widest font-black mb-4">
                Objetivos Específicos Instrumentales
              </h3>
              <ul className="space-y-3">
                {[
                  "Implementar la ingesta unificada de datos (asistencia en QR más historial académico parcial) de los 200 estudiantes activos del plantel.",
                  "Formular modelos predictivos supervisados de Machine Learning para estimar la probabilidad de bajo rendimiento escolar de forma semanal.",
                  "Integrar alertas automatizadas preventivas dirigidas a docentes de forma inmediata según escala de criticidad.",
                  "Diseñar un Bento-Dashboard directivo visual con analíticas de evolución académica agregadas por grados y aulas.",
                ].map((o, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-750 font-medium">
                    <span className="font-mono text-[9px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.5 rounded">
                      OE.{i + 1}
                    </span>
                    <span className="leading-normal">{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-l-4 border-blue-600 bg-blue-50/75 p-6 rounded-r-2xl shadow-xxs">
              <h3 className="text-[10px] font-mono text-blue-700 uppercase tracking-widest font-black mb-2">
                Enunciado Oficial del Objetivo SMART Refinado
              </h3>
              <p className="text-xl sm:text-2xl font-serif font-bold text-slate-900 leading-snug text-justify">
                "Reducir en al menos un <strong className="text-blue-800">30%</strong> la detección tardía del bajo rendimiento académico estudiantil en la <strong className="text-blue-800">IE Peruano Francés</strong>, mediante un sistema inteligente consolidado basado en Machine Learning que asocie <strong className="text-blue-800">asistencias, notas e incidencias</strong> de los <strong className="text-blue-800">200 alumnos</strong>, emitiendo alarmas inmediatas a docentes y directores, <strong className="text-blue-800">durante el año escolar 202Cycle 2026</strong>."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
