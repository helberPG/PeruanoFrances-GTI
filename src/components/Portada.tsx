/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface PortadaProps {
  onStartClick: () => void;
}

export default function Portada({ onStartClick }: PortadaProps) {
  const team = [
    "Henry B. Nuñez Figueroa",
    "Helber J. Perez Gutierrez",
    "Fernando Medina Ccangri",
    "Jhostin J. Galarza Camarena",
  ];

  const stats = [
    { stat: "200", label: "Estudiantes" },
    { stat: "16", label: "Docentes / Auxiliares" },
    { stat: "25", label: "Años de trayectoria" },
    { stat: "3", label: "Niveles educativos" },
  ];

  return (
    <section className="bg-white border-b border-slate-200 min-h-[calc(100vh-3.5rem)] flex items-center">
      <div className="px-6 sm:px-10 lg:px-20 text-center w-full py-12">
        <div className="inline-flex items-center gap-2 font-mono text-[11px] text-slate-700 border border-slate-200 rounded-full px-4 py-1.5 mb-4 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0d7377]" />
          UNTELS · Escuela de Ingeniería de Sistemas · ISR0832 · 2026
        </div>

        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm flex items-center justify-center">
            <img
              src="/logo.jpeg"
              alt="Logo IE Peruano Francés"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <p className="font-mono text-[11px] text-[#0d7377] uppercase tracking-widest mb-2 font-bold">
          Proyecto de Formulación y Evaluación TI
        </p>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-4">
          Sistema Inteligente usando Machine Learning
          <br />
          <span className="text-[#0d7377]">
            para Alerta Temprana del Bajo Rendimiento Académico
          </span>
        </h1>

        <p className="text-slate-850 text-base mb-1">
          Aplicado al <strong>Colegio Particular I.E.P. Peruano Francés</strong>
        </p>
        <p className="font-mono text-slate-750 text-[11px] mb-6">
          Av. Pastor Sevilla · Villa el Salvador · Lima, Perú
        </p>

        <div className="w-12 h-px bg-slate-300 mx-auto mb-6" />

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 text-xs sm:text-sm text-slate-700 font-medium">
          {team.map((nombre) => (
            <span key={nombre} className="border-r border-slate-200 last:border-0 pr-4 last:pr-0">
              {nombre}
            </span>
          ))}
        </div>

        <p className="font-mono text-slate-600 text-[10px] mb-8">
          Docente: <span className="font-semibold text-slate-800">Arqque Pantigozo Antonio</span>
          &nbsp;·&nbsp; Formulación y Evaluación de Proyectos TI &nbsp;·&nbsp; Lima, 2026
        </p>

        <div className="inline-flex items-center gap-2 bg-[#e8f5f5] border border-[#c0e0e0] rounded-full px-4 py-1.5 mb-8">
          <span className="font-mono text-[#0a5c5f] text-[10px] font-semibold">
            Metodología: PMBOK® 6.ª edición
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-center shadow-xs hover:border-[#0d7377] transition-colors"
            >
              <div className="font-serif text-2xl sm:text-3xl font-bold text-slate-800">
                {s.stat}
              </div>
              <div className="font-mono text-slate-650 text-[10px] sm:text-[11px] mt-1 leading-snug">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={onStartClick}
            className="inline-flex items-center gap-2 bg-[#0d7377] hover:bg-[#0a5c5f] text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-md hover:shadow-lg text-sm cursor-pointer"
          >
            Ver proyecto ↓
          </button>
          <a
            href="https://prototipo-peruano-frances.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#e8f5f5] hover:bg-[#d8eded] border border-[#a6d7d9] text-[#0a5c5f] font-semibold px-8 py-3 rounded-xl transition-all shadow-xs text-sm cursor-pointer"
          >
            Prototipo en Vivo (SIA-T Web) ↗
          </a>
        </div>
      </div>
    </section>
  );
}
