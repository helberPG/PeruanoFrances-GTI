/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Cite from "./Cite";
import VisitaCampo from "./VisitaCampo";
import { MODULOS } from "../data";

export default function Introduccion() {
  const problems = [
    {
      num: "1",
      titulo: "Registro 100% Manual",
      desc: "La asistencia se registra en papel por docentes y auxiliares. Las incidencias se reportan por WhatsApp o correo, sin trazabilidad centralizada.",
    },
    {
      num: "2",
      titulo: "Detección Tardía",
      desc: "La identificación de alumnos en riesgo depende exclusivamente de la observación individual del docente. No hay sistema de alertas tempranas.",
    },
    {
      num: "3",
      titulo: "40% de Padres No Usa la Plataforma",
      desc: "4 de cada 10 padres no tiene el hábito ni la cultura de ingresar a Cubicol. Las notificaciones por WhatsApp no garantizan respuesta inmediata.",
    },
  ];

  const infoTable = [
    ["Nombre", "I.E.P. Peruano Francés"],
    ["Tipo", "Institución Educativa Privada"],
    ["Ubicación", "Av. Pastor Sevilla con Av. Juan Velasco Alvarado, Villa el Salvador, Lima"],
    ["Niveles educativos", "Inicial · Primaria · Secundaria"],
    ["N.° de estudiantes", "Aproximadamente 200 alumnos"],
    ["N.° de docentes", "Aproximadamente 16 docentes y auxiliares"],
    ["Años de operación", "25 años de trayectoria"],
    ["Sistema académico", "Cubicol — 7 años en uso"],
    ["Conectividad", "WIN — Fibra Óptica 1000 Mbps"],
  ];

  const teamMembers = [
    { nombre: "Nuñez Figueroa, Henry Brayan", codigo: "2014101295" },
    { nombre: "Perez Gutierrez, Helber Javier", codigo: "2008100137" },
    { nombre: "Medina Ccangri, Fernando", codigo: "20a3110232" },
    { nombre: "Galarza Camarena, Jhostin Jefry", codigo: "2123010051" },
  ];

  const feasibility = [
    {
      tipo: "Viabilidad Técnica",
      nivel: 90,
      color: "bg-emerald-550",
      nota: "Infraestructura y personal disponibles",
    },
    {
      tipo: "Viabilidad Económica",
      nivel: 78,
      color: "bg-blue-550",
      nota: "Bajo costo con tecnología open-source",
    },
    {
      tipo: "Viabilidad Operativa",
      nivel: 85,
      color: "bg-purple-550",
      nota: "Integra sin cambiar flujos actuales",
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* ── MOTIVACIÓN DE PROYECTO (EL PROBLEMA) ── */}
      <section id="problema" className="py-14 bg-white border-b border-slate-200">
        <div className="px-6 sm:px-10 lg:px-12">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2">
            00 · Introducción · Motivación del Proyecto
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            El Bajo Rendimiento Académico: Un Problema Urgente
          </h2>
          <p className="text-slate-700 text-sm mb-8 leading-relaxed max-w-4xl">
            En la IE Peruano Francés, la identificación de alumnos con bajo rendimiento académico se realiza tradicionalmente de manera manual y reactiva, sin un sistema de alertas digitales consolidado que asista a los docentes para intervenir preventivamente.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {problems.map((c) => (
              <div
                key={c.titulo}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all"
              >
                <div className="font-mono w-8 h-8 rounded-full bg-red-100 text-red-700 text-sm font-bold flex items-center justify-center mb-3">
                  {c.num}
                </div>
                <h3 className="font-serif font-bold text-slate-900 text-base mb-2">
                  {c.titulo}
                </h3>
                <p className="text-slate-750 text-xs sm:text-sm leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center bg-red-50/70 border border-red-100 rounded-2xl p-6 mb-10 max-w-5xl">
            <div className="flex-shrink-0 w-full md:w-48 max-w-[200px] rounded-xl overflow-hidden border border-red-100 shadow-xs flex items-center justify-center">
              <img
                src="/reporte_incidencia.jpeg"
                alt="Reporte de Incidencia Escolar — formulario físico"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="flex-1">
              <span className="inline-block bg-red-100 text-red-700 text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-2 font-mono">
                Evidencia — Proceso Actual
              </span>
              <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg mb-2">
                Reporte de Incidencia Escolar — 100% Físico y Manual
              </h4>
              <p className="text-slate-805 text-xs sm:text-sm leading-relaxed mb-4 text-justify">
                Este es el formulario en papel utilizado actualmente por la institución para registrar cada incidencia escolar. Se completa a mano, se archiva de forma física y se notifica individualmente.{" "}
                <strong className="text-red-700 bg-red-50 px-1 py-0.5 rounded">
                  No existe trazabilidad digital, ni historial consolidado, ni analítica de alertas automáticas.
                </strong>
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Sin trazabilidad digital",
                  "Sin alertas automáticas",
                  "Sin historial centralizado",
                  "Riesgo de pérdida de información",
                ].map((t) => (
                  <span
                    key={t}
                    className="bg-white border border-red-200 text-red-600 text-[10px] font-semibold px-2.5 py-1 rounded-full font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-850 rounded-2xl p-8 text-white max-w-5xl shadow-sm border border-slate-750">
            <h3 className="font-serif text-lg sm:text-xl font-bold mb-3">
              Objetivo General de la Propuesta
            </h3>
            <p className="text-blue-100 leading-relaxed text-xs sm:text-sm">
              Formular y evaluar un{" "}
              <strong className="text-white">sistema inteligente usando Machine Learning</strong>{" "}
              que genere alertas tempranas del bajo rendimiento académico en la IE Peruano Francés, facilitando la identificación oportuna de estudiantes en riesgo y optimizando la toma de decisiones directivas a través de visualizaciones bento-dashboards unificadas.
            </p>
          </div>
        </div>
      </section>

      {/* ── INSTITUCIÓN (COLEGIO) ── */}
      <section id="institucion" className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="px-6 sm:px-10 lg:px-12">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2">
            00 · Introducción · Sobre la Institución
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            I.E.P. Peruano Francés
          </h2>
          <p className="text-slate-705 text-sm mb-8 font-mono">
            Datos consolidados para el estudio — Villa el Salvador
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs mb-8 max-w-4xl bg-white">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200">
                  <th className="px-5 py-3 text-left font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-900 w-1/3">
                    Campo de diagnóstico
                  </th>
                  <th className="px-5 py-3 text-left font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-900">
                    Detalle oficial del colegio
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150">
                {infoTable.map(([campo, desc], i) => (
                  <tr key={campo} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="px-5 py-3.5 font-semibold text-slate-900">
                      {campo}
                    </td>
                    <td className="px-5 py-3.5 text-slate-800">
                      {desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <blockquote className="border-l-4 border-[#0d7377] pl-5 py-2 mb-10 bg-white shadow-xs rounded-r-xl max-w-4xl p-4">
            <p className="font-serif text-slate-800 text-base sm:text-lg italic leading-relaxed">
              &ldquo;Formación en Valores Cristianos — Rumbo a la Universidad&rdquo;
            </p>
            <footer className="font-mono text-[10px] text-slate-550 mt-1 uppercase tracking-wider">
              Lema institucional — I.E.P. Peruano Francés
            </footer>
          </blockquote>

          <div className="pt-8 border-t border-slate-200 max-w-5xl">
            <h3 className="font-serif font-bold text-slate-900 text-lg sm:text-xl mb-1">
              Organigrama Estructural
            </h3>
            <p className="text-slate-650 text-xs sm:text-sm mb-6">
              Distribución jerárquica y canales de mando de la IEP Peruano Francés
            </p>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs bg-white text-center">
                <div className="p-3 bg-slate-50 border-b border-slate-200 font-mono text-[10px] uppercase font-bold text-slate-600">
                  Organigrama Oficial
                </div>
                <div className="bg-white p-4">
                  <img
                    src="/organigrama.jpeg"
                    alt="Organigrama Estructural oficial"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-[500px] object-contain mx-auto"
                  />
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl p-6 bg-white shadow-xs">
                <p className="font-mono text-[10px] font-black text-slate-700 uppercase tracking-widest text-center mb-6">
                  Estructura Organizativa del Sistema de Gestión
                </p>
                <div className="flex flex-col items-center text-[10px] sm:text-[11px] font-semibold select-none leading-relaxed">
                  <div className="border-2 border-dashed border-slate-350 text-slate-750 bg-slate-100 rounded-lg px-4 py-1.5 text-center leading-snug">
                    UGEL N.° 01
                  </div>
                  <div className="w-px h-3 bg-slate-300" />
                  <div className="bg-blue-800 text-white rounded-lg px-5 py-2 text-center shadow-xs">
                    Promotora Directora
                  </div>
                  <div className="w-px h-3 bg-blue-300" />
                  <div className="grid grid-cols-3 w-full items-center">
                    <div className="flex items-center justify-end">
                      <div className="border border-slate-250 bg-slate-100 text-slate-800 rounded-lg px-2.5 py-1.5 text-center font-mono text-[9px] leading-tight">
                        Personal
                        <br />
                        Admin.
                      </div>
                      <div className="w-4 h-px bg-slate-300 flex-shrink-0" />
                    </div>
                    <div className="flex justify-center">
                      <div className="bg-blue-600 text-white rounded-lg px-4 py-2 text-center shadow-xs">
                        Sub-Director
                      </div>
                    </div>
                    <div />
                  </div>
                  <div className="w-px h-3 bg-blue-300" />
                  <div className="grid grid-cols-3 w-full items-center">
                    <div />
                    <div className="flex justify-center">
                      <div className="bg-indigo-600 text-white rounded-lg px-4 py-2 text-center shadow-xs">
                        Jefa de Normas
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-px bg-slate-350 flex-shrink-0" />
                      <div className="border border-indigo-200 bg-indigo-50 text-indigo-800 rounded-lg px-2 py-1.5 text-center leading-snug text-[9px]">
                        Coordinadores
                        <br />
                        CC. y LL.
                      </div>
                    </div>
                  </div>
                  <div className="w-px h-3 bg-indigo-300" />
                  <div className="flex gap-2 w-full justify-center">
                    {["Inicial", "Primaria", "Secundaria"].map((n) => (
                      <div
                        key={n}
                        className="bg-teal-650 text-white rounded-lg px-2 py-1.5 text-center text-[10px] flex-1 max-w-[85px] shadow-xs"
                      >
                        Docentes {n}
                      </div>
                    ))}
                  </div>
                  <div className="w-px h-3 bg-teal-350" />
                  <div className="flex gap-4 justify-center">
                    <div className="bg-emerald-600 text-white rounded-lg px-4 py-2 text-center shadow-xs font-bold">
                      Estudiantes (200)
                    </div>
                    <div className="bg-amber-500 text-white rounded-lg px-3 py-2 text-center text-[9px] sm:text-[10px] shadow-xs">
                      Padres de
                      <br />
                      Familia
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 w-full flex flex-wrap gap-x-4 gap-y-1.5 justify-center">
                    {[
                      { c: "bg-blue-800", l: "Alta Dirección" },
                      { c: "bg-blue-600", l: "Dirección Académica" },
                      { c: "bg-indigo-600", l: "Gestión Curricular" },
                      { c: "bg-teal-650", l: "Cuerpo Docente" },
                      { c: "bg-emerald-600", l: "Comunidad Escolar" },
                    ].map((x) => (
                      <div key={x.l} className="flex items-center gap-1.5">
                        <div className={`w-2.5 h-2.5 rounded-full ${x.c}`} />
                        <span className="text-[10px] text-slate-700 font-mono">
                          {x.l}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROPUESTA DE VALOR / SOLUCIÓN ── */}
      <section id="solucion" className="py-14 bg-white border-b border-slate-200">
        <div className="px-6 sm:px-10 lg:px-12">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2">
            00 · Introducción · Propuesta de Valor
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Propuesta de Valor del Sistema
          </h2>
          <p className="text-slate-705 text-sm mb-8 leading-relaxed max-w-4xl">
            La arquitectura propuesta vincula la ingesta de datos académicos con analítica predictiva de Machine Learning
            <Cite r="Romero & Ventura, 2010" /> para detectar anomalías de rendimiento en fase de riesgo leve, habilitando alertas inmediatas.
          </p>

          <h3 className="font-serif font-bold text-slate-900 text-lg mb-4">
            Estructura Modular Planificada (SIA-T)
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {MODULOS.map((m) => (
              <div
                key={m.letra}
                className={`${m.color} rounded-2xl p-5 text-white hover:-translate-y-0.5 hover:shadow-md transition-all flex flex-col justify-between`}
              >
                <div>
                  <div className="font-mono w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center font-black text-sm mb-3">
                    {m.letra}
                  </div>
                  <h3 className="font-serif font-bold text-sm mb-2 leading-tight">
                    {m.nombre}
                  </h3>
                </div>
                <p className="text-white/85 text-[11px] leading-relaxed mt-2">
                  {m.descripcion}
                </p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h3 className="font-serif font-bold text-slate-900 text-base sm:text-lg mb-4">
                Funcionalidades Principales del Prototipo
              </h3>
              <ul className="space-y-3">
                {[
                  "Registro digital de asistencia con lectura de QR desde smartphone docente",
                  "Mapeo unificado con Cubicol para descargas académicas continuas",
                  "Algoritmo ML multivariable (asistencia + notas + conducta)",
                  "Clasificador de nivel de riesgo (Crítico, Medio, Estable) configurable",
                  "Notificaciones integradas automáticas vía correo o alerta móvil",
                  "Acceso exclusivo directivo para control integral del plantel",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs sm:text-sm text-slate-850">
                    <span className="text-[#0d7377] font-bold mt-0.5 flex-shrink-0">✓</span>
                    <span className="leading-normal">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h3 className="font-serif font-bold text-slate-900 text-base sm:text-lg mb-5">
                Evaluación de Viabilidad Inicial
              </h3>
              <div className="space-y-4">
                {feasibility.map((v) => (
                  <div key={v.tipo}>
                    <div className="flex justify-between text-xs sm:text-sm mb-1 font-medium">
                      <span className="text-slate-750">{v.tipo}</span>
                      <span className="font-mono text-slate-900">{v.nivel}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-1">
                      <div
                        className={`h-full ${v.color} rounded-full transition-all duration-500`}
                        style={{ width: `${v.nivel}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-550 italic">{v.nota}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#e8f5f5] border border-[#c0e0e0] rounded-2xl p-6 max-w-4xl shadow-xs">
            <p className="font-serif font-bold text-[#0a5c5f] text-base mb-1.5">
              Valor Agregado
            </p>
            <p className="text-[#0a5c5f] text-xs sm:text-sm leading-relaxed">
              Trascender del reporte tardío bimestral tradicional a una metodología de monitoreo diario y preventivo, resguardando la retención escolar y potenciando la competitividad institucional en el distrito.
            </p>
          </div>
        </div>
      </section>

      {/* ── GALERÍA DE VISITA (INTEGRADA) ── */}
      <VisitaCampo />

      {/* ── EQUIPO DE INVESTIGACIÓN ── */}
      <section id="equipo" className="py-14 bg-white border-b border-slate-200">
        <div className="px-6 sm:px-10 lg:px-12">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2">
            00 · Introducción · Equipo de Trabajo
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Equipo de Investigación
          </h2>
          <p className="text-slate-700 text-sm mb-8 leading-relaxed max-w-3xl">
            Desarrollado bajo los estándares de la Escuela Profesional de Ingeniería de Sistemas de la Universidad Nacional Tecnológica de Lima Sur (UNTELS).
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs mb-8 max-w-4xl bg-white">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200">
                  <th className="px-5 py-3 text-left font-semibold text-slate-900 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-5 py-3 text-left font-semibold text-slate-900 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider">
                    Apellidos y Nombres
                  </th>
                  <th className="px-5 py-3 text-left font-semibold text-slate-900 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider">
                    Código de Matrícula
                  </th>
                  <th className="px-5 py-3 text-left font-semibold text-slate-900 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider hidden sm:table-cell">
                    Universidad
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150">
                {teamMembers.map((m, i) => (
                  <tr key={m.codigo} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="px-5 py-3.5 font-mono text-slate-550">{i + 1}</td>
                    <td className="px-5 py-3.5 font-semibold text-slate-900">{m.nombre}</td>
                    <td className="px-5 py-3.5 font-mono text-slate-700">{m.codigo}</td>
                    <td className="px-5 py-3.5 text-slate-650 hidden sm:table-cell">UNTELS</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 max-w-4xl shadow-xs">
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              {[
                { dt: "Docente del Curso", dd: "Mg. Arqque Pantigozo Antonio" },
                { dt: "Asignatura", dd: "Formulación y Evaluación de Proyectos TI" },
                { dt: "Código oficial", dd: "ISR0832" },
                { dt: "Lugar & Fecha", dd: "Lima, Perú — 2026" },
              ].map(({ dt, dd }) => (
                <div key={dt} className="border-r border-slate-200 last:border-0 pr-2">
                  <dt className="font-mono text-[9px] text-[#0d7377] uppercase tracking-wider font-semibold mb-1">
                    {dt}
                  </dt>
                  <dd className="font-bold text-slate-900 leading-tight">{dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}
