/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Cite from "./Cite";
import {
  STAKEHOLDERS,
  MAPA_ACTORES,
  MONITOREO,
  FACTORES_INTERNOS,
  FACTORES_EXTERNOS,
  ACTIVOS,
  CANVAS,
} from "../data";

export default function StakeholderAnalysis() {
  const getBadgeClass = (nivel: string) => {
    if (nivel === "Alto") return "bg-red-100 text-red-700 border border-red-200";
    if (nivel === "Medio") return "bg-yellow-100 text-yellow-700 border border-yellow-200";
    return "bg-green-100 text-green-700 border border-green-200";
  };

  const getEstrategiaClass = (est: string) => {
    if (est === "Gestionar de cerca") return "bg-blue-600 text-white font-semibold";
    if (est === "Mantener involucrados") return "bg-indigo-500 text-white font-semibold";
    if (est === "Mantener satisfechos") return "bg-amber-500 text-white font-semibold";
    return "bg-slate-400 text-white font-semibold";
  };

  const powerBlocks = [
    {
      zona: "Alto Poder · Alto Interés",
      bg: "bg-blue-700 border border-blue-600",
      est: "GESTIONAR DE CERCA",
      actores: ["Promotora Directora", "Subdirector", "Área de TI"],
    },
    {
      zona: "Alto Poder · Medio Interés",
      bg: "bg-indigo-600 border border-indigo-550",
      est: "MANTENER INVOLUCRADOS",
      actores: ["Docentes", "Jefa de Normas y Coordinadores", "Psicólogo Escolar"],
    },
    {
      zona: "Bajo Poder · Alto Interés",
      bg: "bg-amber-600 border border-amber-550",
      est: "MANTENER SATISFECHOS",
      actores: ["Padres de Familia", "Estudiantes"],
    },
    {
      zona: "Bajo Poder · Bajo Interés",
      bg: "bg-slate-500 border border-slate-450",
      est: "MANTENER INFORMADOS",
      actores: ["Personal Administrativo"],
    },
  ];

  const expectations = [
    {
      q: "Promotora Directora",
      a: "Mejorar la toma de decisiones estratégicas y reducir la deserción escolar para mantener una matrícula estable.",
    },
    {
      q: "Docentes",
      a: "Herramientas que faciliten el seguimiento de estudiantes sin incrementar su carga de trabajo diaria.",
    },
    {
      q: "Psicólogo Escolar",
      a: "Identificar temprana y confiablemente a los estudiantes en riesgo para intervenir con efectividad.",
    },
    {
      q: "Padres de Familia",
      a: "Recibir información oportuna y comprensible sobre el desempeño y asistencia de sus hijos.",
    },
    {
      q: "Estudiantes",
      a: "Recibir acompañamiento personalizado antes de llegar a una situación de abandono escolar.",
    },
    {
      q: "Área de TI",
      a: "Implementar una solución funcional, compatible con Cubicol y sostenible a largo plazo con recursos propios.",
    },
  ];

  const communicationPlan = [
    ["Promotora Directora", "Reuniones formales presenciales", "Semanal"],
    ["Docentes", "Reuniones / Plataforma digital interna", "Semanal"],
    ["Área de TI", "Reuniones técnicas y reportes", "Semanal"],
    ["Padres de Familia", "Comunicados / Plataforma Cubicol", "Semanal"],
    ["Estudiantes", "Plataforma educativa", "Continua"],
  ];

  return (
    <div className="animate-fade-in">
      {/* ── CASO DE NEGOCIO (CANVAS) ── */}
      <section id="canvas" className="py-14 bg-white border-b border-slate-200">
        <div className="px-6 sm:px-10 lg:px-12">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2">
            01 · Análisis de Stakeholders · Entrada
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Caso de Negocio
          </h2>
          <p className="text-slate-650 text-sm font-mono mb-2">Business Model Canvas</p>
          <p className="text-slate-700 text-sm mb-8 leading-relaxed max-w-4xl">
            Modelo de negocio estratégico estructurado para el despliegue del sistema inteligente de alerta temprana, resguardando la autosuficiencia técnica del colegio
            <Cite r="Osterwalder & Pigneur, 2010" />.
          </p>

          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs text-sm max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              <div className="bg-blue-50/50 p-5">
                <p className="font-mono text-[10px] font-black text-blue-700 uppercase tracking-wider mb-3">
                  Socios Clave
                </p>
                <ul className="space-y-2">
                  {CANVAS.socios.map((i) => (
                    <li key={i} className="text-xs text-slate-800 flex gap-1.5 leading-snug">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-1 divide-y divide-slate-200">
                <div className="bg-indigo-50/50 p-5">
                  <p className="font-mono text-[10px] font-black text-indigo-700 uppercase tracking-wider mb-3">
                    Actividades Clave
                  </p>
                  <ul className="space-y-2">
                    {CANVAS.actividades.map((i) => (
                      <li key={i} className="text-xs text-slate-800 flex gap-1.5 leading-snug">
                        <span className="text-indigo-400 font-bold">•</span>
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-violet-50/50 p-5">
                  <p className="font-mono text-[10px] font-black text-violet-700 uppercase tracking-wider mb-3">
                    Recursos Clave
                  </p>
                  <ul className="space-y-2">
                    {CANVAS.recursos.map((i) => (
                      <li key={i} className="text-xs text-slate-800 flex gap-1.5 leading-snug">
                        <span className="text-violet-400 font-bold">•</span>
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-[#0d7377] p-5 text-white shadow-inner">
                <p className="font-mono text-[10px] font-black text-[#8fecec] uppercase tracking-wider mb-3">
                  Propuesta de Valor
                </p>
                <ul className="space-y-2.5">
                  {CANVAS.propuesta.map((i) => (
                    <li key={i} className="text-xs text-white/95 flex gap-1.5 leading-relaxed font-medium">
                      <span className="text-[#8fecec] font-bold">•</span>
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-1 divide-y divide-slate-200">
                <div className="bg-amber-50/50 p-5">
                  <p className="font-mono text-[10px] font-black text-amber-700 uppercase tracking-wider mb-3">
                    Relación con Clientes
                  </p>
                  <ul className="space-y-2">
                    {CANVAS.relacion.map((i) => (
                      <li key={i} className="text-xs text-slate-800 flex gap-1.5 leading-snug">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-orange-50/50 p-5">
                  <p className="font-mono text-[10px] font-black text-orange-700 uppercase tracking-wider mb-3">
                    Canales
                  </p>
                  <ul className="space-y-2">
                    {CANVAS.canales.map((i) => (
                      <li key={i} className="text-xs text-slate-800 flex gap-1.5 leading-snug">
                        <span className="text-orange-400 font-bold">•</span>
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-emerald-50/50 p-5">
                <p className="font-mono text-[10px] font-black text-emerald-700 uppercase tracking-wider mb-3">
                  Segmentos de Clientes
                </p>
                <ul className="space-y-2">
                  {CANVAS.segmentos.map((i) => (
                    <li key={i} className="text-xs text-slate-800 flex gap-1.5 leading-snug">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-t border-slate-200">
              <div className="bg-slate-100 p-5">
                <p className="font-mono text-[10px] font-black text-slate-700 uppercase tracking-wider mb-3">
                  Estructura de Costos
                </p>
                <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
                  {CANVAS.costos.map((i) => (
                    <li key={i} className="text-xs text-slate-800 flex gap-1.5 items-start leading-snug">
                      <span className="text-slate-500 font-bold">•</span>
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-teal-50/50 p-5">
                <p className="font-mono text-[10px] font-black text-teal-700 uppercase tracking-wider mb-3">
                  Fuentes de Ingresos / Valor
                </p>
                <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
                  {CANVAS.ingresos.map((i) => (
                    <li key={i} className="text-xs text-slate-800 flex gap-1.5 items-start leading-snug">
                      <span className="text-teal-400 font-bold">•</span>
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FACTORES AMBIENTALES ── */}
      <section id="factores" className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="px-6 sm:px-10 lg:px-12">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2">
            01 · Stakeholders · Factores Ambientales
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Factores Ambientales de la Empresa
          </h2>
          <p className="text-slate-705 text-sm mb-8 leading-relaxed max-w-4xl">
            Análisis de las variables ambientales y organizacionales externas e internas que inciden en la factibilidad técnica y adopción del software
            <Cite r="PMI, 2017" />.
          </p>

          <div className="grid lg:grid-cols-2 gap-8 mb-12 max-w-5xl">
            <div>
              <h3 className="font-serif font-bold text-slate-900 text-base sm:text-lg mb-4 flex items-center gap-2">
                <span className="font-mono w-6 h-6 rounded-full bg-teal-600 text-white text-[10px] font-bold flex items-center justify-center">
                  I
                </span>
                Factores Internos (Capacidad Instalada)
              </h3>
              <div className="space-y-3">
                {FACTORES_INTERNOS.map((f) => (
                  <div
                    key={f.factor}
                    className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs"
                  >
                    <h4 className="font-bold text-teal-850 text-sm mb-1">{f.factor}</h4>
                    <p className="text-slate-700 text-xs leading-relaxed">{f.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-serif font-bold text-slate-900 text-base sm:text-lg mb-4 flex items-center gap-2">
                <span className="font-mono w-6 h-6 rounded-full bg-orange-600 text-white text-[10px] font-bold flex items-center justify-center">
                  E
                </span>
                Factores Externos (Condiciones del Entorno)
              </h3>
              <div className="space-y-3">
                {FACTORES_EXTERNOS.map((f) => (
                  <div
                    key={f.factor}
                    className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs"
                  >
                    <h4 className="font-bold text-orange-850 text-sm mb-1">{f.factor}</h4>
                    <p className="text-slate-700 text-xs leading-relaxed">{f.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8 max-w-5xl">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 mb-2">
              Activos de los Procesos de la Organización
            </h3>
            <p className="text-slate-700 text-sm mb-6 leading-relaxed">
              Base documental y de procesos acumulados en la IEP que actúan como aceleradores para el desarrollo
              <Cite r="PMI, 2017" />.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ACTIVOS.map((a) => (
                <div
                  key={a.titulo}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-[#0d7377] transition-colors"
                >
                  <h4 className="font-serif font-bold text-slate-900 text-xs sm:text-sm mb-3 pb-2 border-b border-slate-100 uppercase tracking-wider font-mono">
                    {a.titulo}
                  </h4>
                  <ul className="space-y-2">
                    {a.items.map((item) => (
                      <li key={item} className="flex items-start gap-1.5 text-xs text-slate-800 leading-snug">
                        <span className="text-[#0d7377] font-bold mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ENTREVISTA SEMI-ESTRUCTURADA ── */}
      <section id="entrevista" className="py-14 bg-white border-b border-slate-200">
        <div className="px-6 sm:px-10 lg:px-12">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2">
            01 · Stakeholders · Herramientas y Técnicas
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Entrevista a la Dirección General
          </h2>
          <p className="text-slate-705 text-sm mb-8 leading-relaxed max-w-4xl">
            Instrumento de recogida e interactivo administrado de manera directa en las instalaciones a las decisores de nivel ejecutivo de la IEP.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-5xl">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h3 className="font-serif font-bold text-slate-900 text-sm uppercase font-mono tracking-wider mb-4 text-[#0d7377]">
                Ficha Técnica del Proceso
              </h3>
              <dl className="space-y-3.5 text-xs sm:text-sm">
                {[
                  ["Participantes", "Promotora Directora y Gestora de Plataforma Cubicol / TI"],
                  ["Fecha", "Abril de 2026"],
                  ["Lugar", "Oficina de dirección — I.E.P. Peruano Francés, VES"],
                  ["Asignación", "Presencial — entrevista semi-estructurada interactiva"],
                  ["Estructura", "12 preguntas divididas en 8 dimensiones diagnósticas"],
                  ["Medio", "Video, audio digitalizado y transcripción codificada"],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-4 border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                    <dt className="font-mono font-bold text-slate-550 min-w-[100px] flex-shrink-0 text-[10px] sm:text-[11px] uppercase tracking-wider self-center">
                      {k}
                    </dt>
                    <dd className="text-slate-800 font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h3 className="font-serif font-bold text-slate-900 text-sm uppercase font-mono tracking-wider mb-4 text-[#0d7377]">
                Dimensiones Indagadas
              </h3>
              <ol className="space-y-2 text-xs sm:text-sm">
                {[
                  "Datos demográficos y matrícula",
                  "Experiencias críticas con deserción estudiantil",
                  "Métodos manuales actuales de control",
                  "Costo de licenciamiento y hardware activo",
                  "Requisitos esenciales de alertas para tutores",
                  "Factibilidad de adopción organizativa",
                  "Herramientas alternativas contempladas",
                  "Expectativas de interoperabilidad con Cubicol",
                ].map((b, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-800">
                    <span className="font-mono w-5 h-5 rounded-full bg-[#e8f5f5] text-[#0d7377] text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="font-medium">{b}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 mb-8 max-w-5xl shadow-xs">
            <h3 className="font-serif font-bold text-slate-900 text-base sm:text-lg mb-4">
              Hallazgos Relevantes Diagnósticos
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  num: "1",
                  t: "Cuaderno Físico",
                  d: "Auxiliares de Inicial, Primaria y Secundaria anotan inasistencias a mano, aumentando carga operacional.",
                },
                {
                  num: "2",
                  t: "Padres Inalcanzables",
                  d: "40% aproximado de apoderados posee nulo o escaso hábito de revisar el portal oficial Cubicol.",
                },
                {
                  num: "3",
                  t: "Apertura QR",
                  d: "Interés prioritario de la dirección en sistemas de control asistencial ágiles y visuales.",
                },
                {
                  num: "4",
                  t: "Deserción Atípica",
                  d: "Se identifican retiros mayormente por traslados, mudanzas fuera del distrito de VES o presiones financieras.",
                },
                {
                  num: "5",
                  t: "Colaboración UNTELS",
                  d: "Directiva provee total soporte y autorización para el acceso controlado de información académica de prueba.",
                },
                {
                  num: "6",
                  t: "Alarma Preventiva",
                  d: "Necesidad explícita de recibir avisos de alumnos críticos de forma continua.",
                },
              ].map((h) => (
                <div key={h.t} className="bg-white border border-slate-200 rounded-xl p-4 shadow-xxs">
                  <div className="font-mono w-7 h-7 rounded-lg bg-[#e8f5f5] text-[#0a5c5f] text-[11px] font-bold flex items-center justify-center mb-2.5">
                    {h.num}
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-1">{h.t}</h4>
                  <p className="text-slate-650 text-[11px] sm:text-xs leading-relaxed">{h.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-850 rounded-2xl p-6 text-white mb-8 max-w-5xl">
            <h3 className="font-serif font-bold text-base sm:text-lg mb-3">
              Conclusión de la Entrevistadora
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed text-justify">
              Se confirma un entorno con madurez tecnológica media-alta debido al uso de Cubicol por más de 7 años y al servicio de internet de alta velocidad de fibra óptica. No obstante, los flujos preventivos son inexistentes por carencia de una base consolidada y analítica inteligente. Esto garantiza un escenario ideal para la adopción del sistema SIA-T.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h3 className="font-serif font-bold text-slate-900 text-sm sm:text-base mb-1">
                Video Documental del Diagnóstico
              </h3>
              <p className="font-mono text-slate-550 text-[10px] mb-4">
                Entrevista registrada en campo con la Directora General
              </p>
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-xs border bg-slate-900 flex items-center justify-center">
                <video
                  controls
                  className="w-full h-full object-cover"
                  preload="metadata"
                >
                  <source src="/entrevista.mp4" type="video/mp4" />
                  Reproducción no disponible.
                </video>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-xs">
              <div>
                <h3 className="font-serif font-bold text-slate-900 text-sm sm:text-base mb-1">
                  Repositorio de Documentación Completo
                </h3>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 mt-2">
                  Accede a la carpeta de Cloud Storage (Google Drive) donde reposan las transcripciones firmadas, el instrumento de encuesta impreso, las grabaciones completas en alta definición y los materiales fotográficos del proyecto.
                </p>
              </div>
              <a
                href="https://drive.google.com/drive/folders/1z33A6WEsA_c8dG4UWaxbnaLNTMgPQo2S?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0d7377] hover:bg-[#0a5c5f] text-white font-semibold px-5 py-3 rounded-xl transition-all shadow-xs text-xs sm:text-sm cursor-pointer"
              >
                Abrir Carpeta en Google Drive ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── STAKEHOLDERS (REGISTRO Y SALIDAS) ── */}
      <section id="stakeholders" className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="px-6 sm:px-10 lg:px-12">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2">
            01 · Stakeholders · Salidas
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Registro de Interesados
          </h2>
          <p className="text-slate-705 text-sm mb-8 leading-relaxed max-w-4xl">
            Mapeo analítico y categorización de todos los actores estratégicos y comunitarios, aplicando metodologías formales de direccionamiento de interesados
            <Cite r="PMI, 2017" />.
          </p>

          <h3 className="font-serif font-bold text-slate-900 text-sm sm:text-base mb-4 flex items-center gap-2">
            <span className="font-mono w-6 h-6 rounded-lg bg-teal-650 text-white text-[10px] font-bold flex items-center justify-center">
              1
            </span>
            Matriz de Registro Oficial
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs mb-12 max-w-6xl bg-white">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-800 text-white font-mono text-[10px] sm:text-[11px] uppercase tracking-wider">
                  <th className="px-4 py-3 text-left">Interesado / Cargo</th>
                  <th className="px-4 py-3 text-left hidden lg:table-cell">Ubicación / Contacto</th>
                  <th className="px-4 py-3 text-left hidden sm:table-cell">Rol Clave</th>
                  <th className="px-4 py-3 text-center">Nivel Interés</th>
                  <th className="px-4 py-3 text-center">Nivel Poder</th>
                  <th className="px-4 py-3 text-center hidden md:table-cell">Estrategia PMBOK</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150">
                {STAKEHOLDERS.map((s, i) => (
                  <tr key={s.nombre} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="px-4 py-3">
                      <p className="font-bold text-slate-900">{s.nombre}</p>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">{s.cargo}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-650 text-xs hidden lg:table-cell">
                      {s.contacto}
                    </td>
                    <td className="px-4 py-3 text-slate-750 text-xs hidden sm:table-cell">
                      {s.rol}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full ${getBadgeClass(s.interes)}`}>
                        {s.interes}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full ${getBadgeClass(s.poder)}`}>
                        {s.poder}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center hidden md:table-cell">
                      <span className={`text-[10px] px-2 py-1 rounded-lg ${getEstrategiaClass(s.estrategia)}`}>
                        {s.estrategia}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 id="mapa-actores" className="font-serif font-bold text-slate-900 text-sm sm:text-base mb-4 flex items-center gap-2 mt-8">
            <span className="font-mono w-6 h-6 rounded-lg bg-teal-650 text-white text-[10px] font-bold flex items-center justify-center">
              2
            </span>
            Mapeo de Actores por Niveles de Intervención
          </h3>

          <div className="mb-12 max-w-5xl">
            <div className="relative flex flex-col items-center gap-4">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center justify-center w-20 h-20 rounded-full bg-slate-900 text-white text-center shadow-lg border-4 border-white">
                <span className="font-serif text-base font-black leading-none">SIA-T</span>
                <span className="font-mono text-[8px] font-bold mt-0.5 leading-none">Vigilante</span>
              </div>
              {MAPA_ACTORES.map((zona) => (
                <div key={zona.zona} className={`w-full border-2 rounded-2xl p-5 ${zona.color} shadow-xxs`}>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${zona.colorBadge}`}>
                      {zona.zona}
                    </span>
                    <span className={`text-xs ${zona.colorTexto} font-medium`}>
                      {zona.descripcion}
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {zona.actores.map((a) => (
                      <div key={a.nombre} className="bg-white/80 rounded-xl p-3 flex gap-3 items-center border border-slate-200 shadow-xxs">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs text-white ${zona.colorBadge}`}>
                          {a.nombre.charAt(0)}
                        </span>
                        <div>
                          <p className={`font-bold text-xs ${zona.colorTexto}`}>{a.nombre}</p>
                          <p className="text-slate-600 text-[10px] font-mono mt-0.5">{a.relacion}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h3 id="matriz-poder" className="font-serif font-bold text-slate-900 text-sm sm:text-base mb-4 flex items-center gap-2 mt-8">
            <span className="font-mono w-6 h-6 rounded-lg bg-teal-650 text-white text-[10px] font-bold flex items-center justify-center">
              3
            </span>
            Matriz de Segmentación de Influencia
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 max-w-5xl">
            {powerBlocks.map((z) => (
              <div key={z.zona} className={`${z.bg} rounded-2xl p-5 text-white shadow-xs`}>
                <p className="font-mono text-[9px] font-semibold opacity-75 uppercase tracking-widest mb-1">
                  {z.zona}
                </p>
                <p className="font-black text-xs sm:text-sm tracking-wider mb-4 border-b border-white/20 pb-1.5">
                  {z.est}
                </p>
                <div className="flex flex-wrap gap-2">
                  {z.actores.map((a) => (
                    <span key={a} className="bg-white/20 hover:bg-white/30 text-white text-[10px] sm:text-xs px-3 py-1 rounded-full font-medium transition-colors">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h3 id="expectativas" className="font-serif font-bold text-slate-900 text-sm sm:text-base mb-4 flex items-center gap-2 mt-8">
            <span className="font-mono w-6 h-6 rounded-lg bg-teal-650 text-white text-[10px] font-bold flex items-center justify-center">
              4
            </span>
            Análisis de Expectativas Principales
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 max-w-5xl">
            {expectations.map((e) => (
              <div key={e.q} className="bg-amber-50/60 border border-amber-200/70 rounded-2xl p-4 shadow-xxs">
                <p className="font-serif font-bold text-amber-900 text-xs sm:text-sm mb-1.5">
                  {e.q}
                </p>
                <p className="text-slate-800 text-xs leading-relaxed text-justify">
                  {e.a}
                </p>
              </div>
            ))}
          </div>

          <h3 id="comunicacion" className="font-serif font-bold text-slate-900 text-sm sm:text-base mb-4 flex items-center gap-2 mt-8">
            <span className="font-mono w-6 h-6 rounded-lg bg-teal-650 text-white text-[10px] font-bold flex items-center justify-center">
              5
            </span>
            Plan de Comunicación Consolidado
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs mb-12 max-w-4xl bg-white">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-800 text-white font-mono text-[10px] sm:text-[11px] uppercase tracking-wider">
                  <th className="px-4 py-3 text-left">Stakeholder decisor</th>
                  <th className="px-4 py-3 text-left">Medio / Canal prioritario</th>
                  <th className="px-4 py-3 text-center">Frecuencia de contacto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150">
                {communicationPlan.map(([s, m, f], i) => (
                  <tr key={s} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="px-4 py-3.5 font-bold text-slate-900">{s}</td>
                    <td className="px-4 py-3.5 text-slate-700 font-medium">{m}</td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="font-mono bg-[#e8f5f5] text-[#0a5c5f] border border-[#c0e0e0] text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                        {f}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 id="seguimiento" className="font-serif font-bold text-slate-900 text-sm sm:text-base mb-4 flex items-center gap-2 mt-8">
            <span className="font-mono w-6 h-6 rounded-lg bg-teal-650 text-white text-[10px] font-bold flex items-center justify-center">
              6
            </span>
            Registro y Progreso de Involucramiento Actual
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 max-w-5xl">
            {MONITOREO.map((m) => (
              <div
                key={m.nombre}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-bold text-slate-900 text-xs sm:text-sm">{m.nombre}</p>
                      <span className={`inline-block mt-0.5 text-[9px] font-bold px-2 py-0.5 rounded-full text-white uppercase font-mono ${m.color}`}>
                        {m.estado}
                      </span>
                    </div>
                    <span className="font-mono text-xl sm:text-2xl font-black text-slate-700">
                      {m.nivel}%
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-full ${m.color} rounded-full transition-all duration-500`}
                      style={{ width: `${m.nivel}%` }}
                    />
                  </div>
                </div>
                <p className="text-[11px] text-slate-650 leading-relaxed font-medium">
                  {m.accion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
