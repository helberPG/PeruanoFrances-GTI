/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ENCUESTA_PREGUNTAS, ENCUESTA_P11 } from "../data";
import Cite from "./Cite";

export default function ProblemaAnalysis() {
  const encuestas = [
    { num: 1, title: "Primer docente" },
    { num: 2, title: "Segundo docente" },
    { num: 3, title: "Tercer docente" },
    { num: 4, title: "Cuarto docente" },
    { num: 5, title: "Quinto docente" },
    { num: 6, title: "Sexto docente" },
  ];

  const highlights = [
    { pct: "100%", desc: "reconoce detección tardía de bajo rendimiento (P7)", color: "bg-red-500" },
    { pct: "83.3%", desc: "acepta incorporación de modelos ML (P8)", color: "bg-emerald-550" },
    { pct: "100%", desc: "valora las alertas de riesgo preventivas como clave (P9)", color: "bg-emerald-550" },
    { pct: "83.3%", desc: "usaría contundentemente la nueva plataforma (P10)", color: "bg-blue-550" },
    { pct: "50%", desc: "confirma herramientas actuales insuficientes (P3)", color: "bg-amber-550" },
    { pct: "66.7%", desc: "demanda integración total de variables críticas (P6)", color: "bg-purple-550" },
  ];

  const specificProblems = [
    "Falta de herramientas de análisis predictivo del rendimiento académico (causes directas).",
    "Seguimiento manual y disperso del desempeño estudiantil (asistencia física).",
    "Información académica fragmentada en distintos canales (Cubicol, papel, WhatsApp).",
    "Ausencia de alertas tempranas automatizadas para los docentes y auxiliares.",
  ];

  return (
    <div className="animate-fade-in">
      {/* ── DESCRIPCIÓN DE LA PROBLEMÁTICA ── */}
      <section id="p02-entradas" className="py-14 bg-white border-b border-slate-200">
        <div className="px-6 sm:px-10 lg:px-12">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2">
            02 · Análisis del Problema · Entrada
          </span>
          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-2">
            Descripción de la Problemática
          </h2>
          <p className="text-slate-650 text-sm mb-8 leading-relaxed max-w-4xl">
            Fundamentos empíricos de la vulnerabilidad ante el bajo rendimiento en escuelas secundarias de Lima Metropolitana
            <Cite r="UNESCO, 2022" />.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 max-w-5xl">
            <div className="space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed text-justify">
              <p>
                En América Latina, el seguimiento tradicional del rendimiento escolar se realiza habitualmente de manera segregada o reactiva. Se registran asistencias en un papel de notas, inasistencias en auxiliares y notas al final de cada periodo bimestral, omitiendo el poder predictivo de los datos agregados
                <Cite r="UNESCO, 2022" />.
              </p>
              <p>
                Esta situación en la <strong>IE Peruano Francés</strong> es crítica: por falta de integradores, los coordinadores se percatan de alumnos con bajo rendimiento cuando ya transcurrieron bimestres de reprobación acumulada, imposibilitando un reenganche preventivo efectivo
                <Cite r="Márquez-Vera et al., 2013" />.
              </p>
              <p>
                Centralizar y procesar multivariablemente la evolución del estudiante (inasistencias, incidentes, promedios) en una red inteligente habilitará la detección precoz del declive escolar antes de la pérdida de matrícula
                <Cite r="Romero & Ventura, 2010" />.
              </p>
            </div>

            <div className="space-y-4">
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs bg-white">
                <div className="bg-slate-800 px-4 py-3">
                  <p className="font-mono text-[10px] text-slate-300 uppercase tracking-widest text-center font-bold">
                    IEP Peruano Francés — Foco Crítico
                  </p>
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  {[
                    { label: "Universo Matrícula", val: "200 alumnos", sub: "Inicial, Primaria y Secundaria" },
                    { label: "Personal Tutor", val: "16 Docentes/Auxiliares", sub: "Responsables del seguimiento diario" },
                    { label: "Registro de Asistencia", val: "Cuaderno manual", sub: "Sujeto a pérdida y demoras de digitalización" },
                    { label: "Incidencias Conductuales", val: "Flujos de WhatsApp", sub: "Nula centralización o búsquedas históricas" },
                    { label: "Core Académico", val: "Cubicol estándar", sub: "Almacenador estático, sin alarmas de riesgo" },
                  ].map((r) => (
                    <div key={r.label} className="flex items-center justify-between px-4 py-2.5">
                      <p className="text-slate-500 font-medium">{r.label}</p>
                      <div className="text-right">
                        <p className="font-bold text-slate-900">{r.val}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{r.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-amber-200 rounded-xl p-4 bg-amber-50/60 shadow-xxs">
                <p className="font-mono text-[9px] text-amber-800 uppercase tracking-wider font-bold mb-2">
                  Fracturas de integración actuales (datos dispersos)
                </p>
                <ul className="space-y-1.5 text-xs text-amber-900">
                  {[
                    "Asistencias en papel y carpetas de auxiliares",
                    "Calificaciones estáticas bimestrales",
                    "Falta de seguimiento de tareas enviadas",
                    "Anotaciones de indisciplina archivadas físicamente",
                  ].map((v) => (
                    <li key={v} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-2xl max-w-4xl shadow-xxs">
            <p className="text-xs sm:text-sm font-semibold text-slate-900 mb-1">
              Desafío Metodológico
            </p>
            <p className="text-xs sm:text-sm text-slate-750 leading-relaxed text-justify">
              Construir un puente analítico mediante modelos de aprendizaje automático supervisados. El comportamiento escolar (asistencia acumulada en QR) junto con el historial de rendimiento (descarga Cubicol) alimentarán un estimador de probabilidad de bajo rendimiento escolar continuo
              <Cite r="Márquez-Vera et al., 2013" />.
            </p>
          </div>
        </div>
      </section>

      {/* ── METODOLOGÍA DEL MARCO LÓGICO & ENCUESTA ── */}
      <section id="p02-herramientas" className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="px-6 sm:px-10 lg:px-12">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2">
            02 · Análisis del Problema · Herramientas y Técnicas
          </span>
          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4">
            Análisis de Diagnóstico (Marco Lógico + Encuesta)
          </h2>
          <p className="text-slate-700 text-sm mb-8 leading-relaxed max-w-4xl text-justify">
            Para la estructuración exhaustiva del problema, se aplicaron de manera convergente dos herramientas formales:
          </p>

          <div className="mb-12 max-w-5xl">
            <h3 className="font-serif font-bold text-slate-900 text-base sm:text-lg mb-3">
              1. Estructura de Causas y Efectos (Árbol de Problemas)
            </h3>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 text-justify">
              De acuerdo con las bases del Marco Lógico, se construyeron los nexos deterministas entre causas subyacentes, el problema nodal y las consecuencias académicas visibles
              <Cite r="CEPAL/ILPES, 2005" />.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-xs sm:text-sm">
              <div className="border border-slate-300 rounded-xl p-5 bg-white shadow-xxs">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2 border-b pb-2">
                  <span className="text-blue-600 font-mono text-[10px] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    Causas Directas
                  </span>
                </h4>
                <ul className="space-y-2 text-slate-700">
                  <li>• Carencia absoluta de herramientas de predicción escolar.</li>
                  <li>• Seguimiento tradicional manual de notas e indisciplinas.</li>
                  <li>• Dispersión extrema de datos del alumno en Cubicol y papel.</li>
                  <li>• Falta de alarmas unificadas a tiempo para los directivos.</li>
                </ul>
              </div>

              <div className="border border-slate-300 rounded-xl p-5 bg-white shadow-xxs">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2 border-b pb-2">
                  <span className="text-blue-600 font-mono text-[10px] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    Causas Indirectas
                  </span>
                </h4>
                <ul className="space-y-2 text-slate-700">
                  <li>• Nula explotación de analítica e Inteligencia Artificial.</li>
                  <li>• Inercia laboral en flujos de reporte bimestral.</li>
                  <li>• Falta de base de datos relacional escolar unificada.</li>
                  <li>• Inexistencia de reportería en tiempo real para tutorías.</li>
                </ul>
              </div>

              <div className="border border-red-300 rounded-xl p-5 bg-red-50/50 shadow-xxs">
                <h4 className="font-bold text-red-900 mb-3 flex items-center gap-2 border-b border-red-100 pb-2">
                  <span className="text-red-600 font-mono text-[10px] bg-red-100 px-2 py-0.5 rounded border border-red-200">
                    Efectos Directos
                  </span>
                </h4>
                <ul className="space-y-2 text-slate-750">
                  <li>• Gestión reactiva: la tutoría actúa tardíamente.</li>
                  <li>• Mayor número de estudiantes con devaluación de promedio escolar.</li>
                  <li>• Dificultad severa para realizar toma de datos correctivos.</li>
                </ul>
              </div>

              <div className="border border-red-300 rounded-xl p-5 bg-red-50/50 shadow-xxs">
                <h4 className="font-bold text-red-900 mb-3 flex items-center gap-2 border-b border-red-100 pb-2">
                  <span className="text-red-600 font-mono text-[10px] bg-red-100 px-2 py-0.5 rounded border border-red-200">
                    Efectos Indirectos
                  </span>
                </h4>
                <ul className="space-y-2 text-slate-750">
                  <li>• Desmotivación o deserción estudiantil progresiva.</li>
                  <li>• Aumento del índice de alumnos desaprobados en VES.</li>
                  <li>• Deterioro general de los indicadores oficiales de calidad.</li>
                </ul>
              </div>
            </div>
            
            <div className="border border-slate-200 rounded-2xl bg-white p-5 shadow-xs">
              <h4 className="font-serif font-bold text-slate-800 text-xs sm:text-sm mb-3">
                Diagrama Lógico de Causas y Efectos (Árbol de Problemas)
              </h4>
              <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center p-3">
                <img
                  src="/arbol-problemas.png"
                  alt="Árbol de Problemas escolar"
                  referrerPolicy="no-referrer"
                  className="w-full max-w-2xl h-auto object-contain"
                />
              </div>
            </div>
          </div>

          <hr className="border-slate-250 my-10 max-w-5xl" />

          {/* ── ENCUESTA DOCENTE SECCIÓN ── */}
          <div id="p02-encuesta" className="max-w-5xl">
            <h3 className="font-serif font-bold text-slate-900 text-base sm:text-lg mb-3">
              2. Encuesta Digital diagnóstica a Profesores
            </h3>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 text-justify">
              Se diseñó y aplicó un instrumento estructurado en Google Forms a docentes y auxiliares encargadas del dictado de clases en los 3 niveles. Las 11 preguntas abarcan prácticas de monitoreo diario y medir el apetito por la incorporación de Inteligencia Artificial preventiva
              <Cite r="Márquez-Vera et al., 2013" />.
            </p>

            <div className="bg-white border border-slate-250 rounded-2xl p-6 mb-6 shadow-xxs">
              <h4 className="font-mono text-[10px] sm:text-[11px] font-black text-slate-700 uppercase tracking-widest mb-4">
                Dominios Evaluados en el Instrumento
              </h4>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                {[
                  "Años de trayectoria en aula",
                  "Periodicidad del monitoreo académico",
                  "Insuficiencia de herramientas diagnósticas",
                  "Complejidad de detección antes del bimestral",
                  "Agente causante principal del bajo promedio",
                  "Requerimiento de datos unificados",
                  "Alineado: Detección habitual tardía",
                  "Recepción de utilidades con algoritmos ML",
                  "Utilidad percibida de alertas automáticas",
                  "Predisposición al uso de software",
                ].map((item, i) => (
                  <p key={item} className="flex gap-2">
                    <span className="text-[#0d7377] font-bold">{i + 1}.</span>
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="bg-[#e8f5f5] border border-[#c0e0e0] rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 justify-between">
              <div>
                <p className="font-bold text-slate-900 text-xs sm:text-sm">
                  ¿Deseas examinar el cuestionario original?
                </p>
                <p className="text-slate-650 text-[11px] sm:text-xs">
                  Accede al portal interactivo oficial de Google Forms administrado para el colegio.
                </p>
              </div>
              <a
                href="https://docs.google.com/forms/d/1LN6uAT6pnceHI7a77IrxZnJov6myUH3BFOSWjrWxHdU/viewform?chromeless=1&edit_requested=true"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors shadow-xs flex-shrink-0 cursor-pointer text-center"
              >
                Ingresar a Formulario →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── EVIDENCIAS: CAPTURAS DE GOOGLE FORMS ── */}
      <section id="p02-evidencias" className="py-14 bg-white border-b border-slate-200">
        <div className="px-6 sm:px-10 lg:px-12">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2">
            02 · Análisis del Problema · Evidencia
          </span>
          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4">
            Evidencia Documental del Proceso de Captura
          </h2>
          <p className="text-slate-700 text-xs sm:text-sm mb-8 leading-relaxed max-w-4xl text-justify font-medium">
            Respuestas recopiladas en tiempo real de los profesores de la institución. Estas fichas escaneadas sustentan individualmente el apetito por la incorporación de herramientas tecnológicas inteligentes en las IE.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
            {encuestas.map((encuesta) => (
              <div
                key={encuesta.num}
                className="border border-slate-250 rounded-2xl overflow-hidden shadow-xs bg-white hover:border-[#0d7377] transition-all"
              >
                <div className="bg-slate-100 p-3.5 border-b border-slate-200 flex justify-between items-center">
                  <h4 className="font-semibold text-slate-950 text-xs">{encuesta.title}</h4>
                  <span className="font-mono text-[9px] bg-white border px-1.5 py-0.5 rounded text-slate-650">
                    N° {encuesta.num}
                  </span>
                </div>
                <div className="relative w-full h-56 bg-slate-50 border-b overflow-hidden">
                  <img
                    src={`/Encuesta${encuesta.num}.jpg`}
                    alt={`Cuestionario de respuesta ${encuesta.title}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <div className="p-3 bg-white text-center">
                  <p className="text-[10px] text-slate-500 font-mono">Encuesta{encuesta.num}.jpg</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTADOS CUALITATIVOS POR PREGUNTAS ── */}
      <section id="p02-resultados" className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="px-6 sm:px-10 lg:px-12">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2">
            02 · Análisis del Problema · Métricas de Respuestas
          </span>
          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-2">
            Análisis de Resultados de la Encuesta
          </h2>
          <p className="text-slate-655 text-sm mb-8 max-w-4xl">
            Análisis descriptivo de las respuestas consolidadas de la IE Peruano Francés.
          </p>

          <div className="space-y-10 max-w-5xl">
            {ENCUESTA_PREGUNTAS.map((p) => (
              <div
                key={p.num}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs"
              >
                <div className="bg-slate-800 px-5 py-3.5 flex items-center gap-3">
                  <span className="font-mono text-[10px] sm:text-[11px] bg-slate-600 text-slate-250 px-2 py-0.5 rounded font-bold">
                    P{p.num}
                  </span>
                  <p className="text-white text-xs sm:text-sm font-semibold leading-normal">
                    {p.texto}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                  <div className="p-4 flex items-center justify-center bg-white">
                    <div className="relative w-full max-w-[320px] p-2 border rounded-xl hover:border-[#0d7377] transition-all">
                      <img
                        src={p.img}
                        alt={`Métrica gráfico pregunta ${p.num}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-auto object-contain mx-auto"
                      />
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between text-xs sm:text-sm bg-slate-50/50">
                    <table className="w-full mb-4">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left text-[10px] text-slate-500 font-mono uppercase pb-2">
                            Alternativa
                          </th>
                          <th className="text-center text-[10px] text-slate-500 font-mono uppercase pb-2">
                            n
                          </th>
                          <th className="text-right text-[10px] text-slate-500 font-mono uppercase pb-2">
                            %
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {p.filas.map((f) => (
                          <tr key={f.opcion}>
                            <td className="py-2 text-slate-755">{f.opcion}</td>
                            <td className="py-2 text-center text-slate-900 font-mono">{f.n}</td>
                            <td className="py-2 text-right text-slate-900 font-mono">{f.pct}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 mt-2">
                      <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest font-mono mb-1">
                        Hallazgo crítico
                      </p>
                      <p className="text-slate-700 text-xs leading-normal italic font-medium">
                        "{p.hallazgo}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pregunta Abierta (Codificación) */}
          <div className="mt-10 bg-white border border-slate-250 rounded-2xl overflow-hidden shadow-xs max-w-5xl">
            <div className="bg-slate-800 px-5 py-3.5 flex items-center gap-3">
              <span className="font-mono text-[10px] sm:text-[11px] bg-slate-600 text-slate-250 px-2.5 py-0.5 rounded font-bold">
                P11
              </span>
              <p className="text-white text-xs sm:text-sm font-semibold">
                ¿Qué mejoras considera indispensables para optimizar el control académico?
              </p>
            </div>
            <div className="p-6">
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-4">
                Pregunta cualitativa abierta — Agrupación semántica de respuestas
              </p>
              <ul className="space-y-3">
                {ENCUESTA_P11.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-750 font-medium leading-relaxed">
                    <span className="font-mono text-[9px] bg-[#e8f5f5] text-[#0d7377] border border-[#b8e2e2] px-2 py-0.5 rounded font-bold flex-shrink-0 mt-0.5">
                      R{i + 1}
                    </span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-xs text-slate-800 font-medium">
                  <strong>Síntesis Diagnóstica:</strong> Al unificar cualitativamente los reclamos de los docentes, resalta la necesidad de una plataforma automatizada que evite ingresar datos repetidamente en planillas manuales, respaldando la dirección de desarrollo del SIA-T.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 bg-slate-900 rounded-2xl p-6 text-white max-w-5xl shadow-md border border-slate-750">
            <h3 className="font-serif text-base sm:text-lg font-bold mb-4">
              Síntesis de Validación — Muestra Docente
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((h) => (
                <div key={h.desc} className="flex items-start gap-3 bg-white/5 rounded-xl p-3 border border-white/5">
                  <span className={`${h.color} text-white font-black text-xs px-2 py-0.5 rounded font-mono`}>
                    {h.pct}
                  </span>
                  <p className="text-slate-300 text-xs font-semibold">{h.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-slate-450 text-[10px] mt-4 font-mono font-bold uppercase tracking-wider text-center">
              Tamaño muestral: N=6 (37.5% de participación sobre un plantel tutor total de 16 docentes)
            </p>
          </div>
        </div>
      </section>

      {/* ── ENUNCIADO DE CONCLUSIÓN REDACTADO ── */}
      <section id="p02-salidas" className="py-14 bg-white border-b border-slate-200">
        <div className="px-6 sm:px-10 lg:px-12">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2">
            02 · Análisis del Problema · Salida
          </span>
          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8">
            Enunciado Formal del Problema
          </h2>
          <div className="max-w-4xl">
            <div className="border-l-4 border-red-600 bg-red-50/70 p-6 rounded-r-2xl mb-6 shadow-xxs">
              <h3 className="text-[10px] font-mono text-red-700 uppercase tracking-widest font-black mb-1.5">
                Definición del Problema Central
              </h3>
              <p className="text-xl sm:text-2xl font-serif font-bold text-slate-905 leading-snug">
                "Deficiente detección temprana del bajo rendimiento académico estudiantil."
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div className="border border-red-200 rounded-2xl p-5 bg-white shadow-xxs">
                <h3 className="text-[10px] font-mono text-red-700 uppercase tracking-widest font-black mb-4">
                  Causas raíz específicas
                </h3>
                <ul className="space-y-3">
                  {specificProblems.map((p, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-750 font-medium">
                      <span className="font-mono text-[9px] bg-red-105 text-red-700 font-bold px-1.5 py-0.5 rounded">
                        C.{i + 1}
                      </span>
                      <span className="leading-normal">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-slate-250 bg-slate-50/30 rounded-2xl p-5">
                <h3 className="text-[10px] font-mono text-slate-650 uppercase tracking-widest font-bold mb-4">
                  Efecto e Impacto Total
                </h3>
                <p className="text-slate-800 text-xs sm:text-sm leading-relaxed text-justify font-medium">
                  <strong>Afectación sostenida de la calidad educativa institucional.</strong> Esta brecha analítica provoca que las reprobaciones sean descubiertas cuando el alumno ya está frustrado y devaluado académicamente, con alta probabilidad de deserción escolar acumulada.
                </p>
                <ul className="text-xs text-slate-650 space-y-1.5 border-t border-slate-200 pt-3.5 mt-3.5 font-mono">
                  <li>↓ Inefectividad de tutorías remediales tardías.</li>
                  <li>↓ Reprobación del año escolar bimestral sostenido.</li>
                  <li>↓ Retraso de decisiones directivas preventivas.</li>
                  <li>↓ Descenso de competitividad de I.E.S. en el distrito.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
