/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Coins,
  Scale,
  Target,
  Activity,
  FileText,
  CheckCircle,
  AlertTriangle,
  Calendar,
  ArrowUpRight,
  Layers,
  Briefcase,
  ShieldAlert,
  Compass,
  Clock,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Percent,
  HelpCircle,
  TrendingDown,
  Info
} from "lucide-react";
import Cite from "./Cite";

interface HighRiskPackage {
  id: string;
  nombre: string;
  riesgo: string;
  co: number;
  cm: number;
  cp: number;
  ce: number;
  sigma: number;
  var: number;
}

interface CostCategory {
  num: number;
  categoria: string;
  monto: number;
  detalle: string;
}

export default function CostBaseline() {
  const [activeTab, setActiveTab] = useState<"planificacion" | "estimacion" | "presupuesto" | "comparacion">("planificacion");

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash) return;
      
      let matchedTab: "planificacion" | "estimacion" | "presupuesto" | "comparacion" | null = null;
      if (hash === "#p07-gestion-costos") {
        matchedTab = "planificacion";
      } else if (hash === "#p07-estimacion-pert") {
        matchedTab = "estimacion";
      } else if (hash === "#p07-presupuesto" || hash === "#p07-curva-s") {
        matchedTab = "presupuesto";
      } else if (hash === "#p07-alineacion-scrum") {
        matchedTab = "comparacion";
      }

      if (matchedTab) {
        setActiveTab(matchedTab);
        setTimeout(() => {
          const targetId = hash.replace("#", "");
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 50);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  const [selectedVersion, setSelectedVersion] = useState<"v1" | "v2">("v2");
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Excel Link (Google Sheets Drive) provided by the user
  const EXCEL_URL = "https://docs.google.com/spreadsheets/d/1MrJt52Cv53s4PazFc3bmZujWSj2RAK3N/edit?usp=sharing&ouid=107121906244921513138&rtpof=true&sd=true";

  // Data for High Risk Packages (PERT) - Page 4
  const HIGH_RISK_PACKAGES: HighRiskPackage[] = [
    { id: "1.2.1", nombre: "ETL Cubicol → PostgreSQL", riesgo: "Acceso a API/BD de Cubicol no otorgado a tiempo; red interna inestable.", co: 1593.75, cm: 1875.00, cp: 3281.25, ce: 2062.50, sigma: 281.25, var: 79101.56 },
    { id: "1.3.1", nombre: "Entrenamiento del modelo ML", riesgo: "Dataset histórico insuficiente o de baja calidad.", co: 1275.00, cm: 1500.00, cp: 2625.00, ce: 1650.00, sigma: 225.00, var: 50625.00 },
    { id: "1.3.3", nombre: "Validación cruzada (5 pliegues)", riesgo: "El modelo no alcanza el 75% de precisión mínima.", co: 637.50, cm: 750.00, cp: 1312.50, ce: 825.00, sigma: 112.50, var: 12656.25 },
    { id: "1.6.2", nombre: "Piloto real (3 docentes, 2 semanas)", riesgo: "Baja disponibilidad de docentes o datos insuficientes.", co: 3400.00, cm: 4000.00, cp: 7000.00, ce: 4400.00, sigma: 600.00, var: 360000.00 }
  ];

  // Data for Cost Categories (v1) - Page 5
  const CATEGORIES_V1: CostCategory[] = [
    { num: 1, categoria: "Recursos Humanos", monto: 20000.00, detalle: "Costo de oportunidad de las horas de los 4 integrantes en sus 14 roles, valorizado con tarifas de mercado de Lima 2026. Única categoría con costo monetario relevante." },
    { num: 2, categoria: "Materiales", monto: 0.00, detalle: "No hay materiales consumibles significativos (proyecto 100% digital). Los impresos de la capacitación son de costo despreciable (< S/. 20)." },
    { num: 3, categoria: "Equipamiento", monto: 0.00, detalle: "Laptops de los 4 integrantes (activos personales) y servidor local institucional cedido por el colegio. No se compra ni alquila hardware nuevo." },
    { num: 4, categoria: "Servicios", monto: 0.00, detalle: "Servidor SMTP institucional y hosting web en plan gratuito de Vercel. Software usado (Python, PostgreSQL, Next.js, Figma, etc.) es de licencia libre." },
    { num: 5, categoria: "Instalaciones", monto: 0.00, detalle: "Sala de reuniones y proyector cedidos sin costo de alquiler por la institución educativa para capacitación y reuniones semanales." },
    { num: 6, categoria: "Reserva para Contingencias", monto: 1658.79, detalle: "Método híbrido: 8% sobre los 16 paquetes de riesgo normal + desviación estándar del proyecto (σ, método PERT) sobre los 4 paquetes de alto riesgo." },
    { num: 7, categoria: "Ajustes Inflacionarios", monto: 0.00, detalle: "No aplica por tratarse de un proyecto de corta duración (~6 meses) y expresado en soles corrientes de 2026; inflación proyectada de 2-3% anual es despreciable." }
  ];

  // Data for Cost Categories (v2) - Aligned to SCRUM 6 months - Page 9
  const CATEGORIES_V2: CostCategory[] = [
    { num: 1, categoria: "Recursos Humanos (v2)", monto: 54417.42, detalle: "Costo de oportunidad recalculado a jornada de 8h/día (jornada completa en vez de part-time de 4h/día) y asignación simultánea de los 4 integrantes en ceremonias SCRUM, piloto real y pruebas UAT formal." },
    { num: 2, categoria: "Materiales", monto: 0.00, detalle: "Sin variaciones. Proyecto 100% digital con activos existentes." },
    { num: 3, categoria: "Equipamiento", monto: 0.00, detalle: "Sin variaciones. Laptops del equipo y servidor del colegio sin costo adicional." },
    { num: 4, categoria: "Servicios", monto: 0.00, detalle: "Sin variaciones. Hosting gratuito (Vercel) y licencias Open Source." },
    { num: 5, categoria: "Instalaciones", monto: 0.00, detalle: "Sin variaciones. Espacios cedidos sin costo de alquiler." },
    { num: 6, categoria: "Reserva para Contingencias (v2)", monto: 5441.74, detalle: "Alineada con el plan de cronograma: 10% explícito sobre la duración y costo de cada Sprint (10% de S/. 54,417.42)." },
    { num: 7, categoria: "Ajustes Inflacionarios", monto: 0.00, detalle: "Sin variaciones. Escala de tiempo de 6 meses no amerita ajustes inflacionarios relevantes." }
  ];

  // Curva S v1 Data - Page 8
  const CURVA_S_V1 = [
    { mes: "Mes 1 (Jul)", costo: 3106.25, acumulado: 3106.25 },
    { mes: "Mes 2 (Ago)", costo: 3118.75, acumulado: 6225.00 },
    { mes: "Mes 3 (Sep)", costo: 3168.75, acumulado: 9393.75 },
    { mes: "Mes 4 (Oct)", costo: 2556.25, acumulado: 11950.00 },
    { mes: "Mes 5 (Nov)", costo: 2656.25, acumulado: 14606.25 },
    { mes: "Mes 6 (Dic)", costo: 7393.75, acumulado: 21658.79 }
  ];

  // Curva S v2 Data - Page 9 (Alineado al cronograma con duraciones Te y costos proporcionales de S/. 54,417.42 + 10% contingencia = S/. 59,859.17)
  const CURVA_S_V2 = [
    { mes: "Sprint 1 (Mar)", costo: 6542.39, acumulado: 6542.39, detalle: "S1–S4: Análisis y diseño previo (17.4 días PERT)" },
    { mes: "Sprint 2 (Abr)", costo: 11919.19, acumulado: 18461.58, detalle: "S5–S8: Gestión + Base de datos PostgreSQL (31.7 días)" },
    { mes: "Sprint 3 (May)", costo: 10979.20, acumulado: 29440.78, detalle: "S9–S12: Modelamiento ML Scikit-learn (29.2 días)" },
    { mes: "Sprint 4 (Jun)", costo: 11768.79, acumulado: 41209.57, detalle: "S13–S16: Panel Web Next.js y alertas (31.3 días)" },
    { mes: "Sprint 5 (Jul)", costo: 7745.60, acumulado: 48955.17, detalle: "S17–S20: Pruebas de integración y piloto (20.6 días)" },
    { mes: "Sprint 6 (Ago)", costo: 10904.00, acumulado: 59859.17, detalle: "S21–S24: Implantación en produccion y cierre (29.0 días)" }
  ];

  // Comparative Data v1 vs v2 - Page 9
  const BASELINE_COMPARISON = {
    costoEdt: { v1: 20000.00, v2: 54417.42, cambio: "+172.1%", desc: "Dedicación subió a 8h/día; mayor cantidad de recursos concurrentes." },
    contingencia: { v1: 1658.79, v2: 5441.74, cambio: "+228.0%", desc: "Se adoptó el 10% plano del cronograma por Sprint en lugar del método híbrido v1." },
    lineaBase: { v1: 21658.79, v2: 59859.17, cambio: "+176.4%", desc: "Costo total autorizado para medir el desempeño (Línea Base oficial)." },
    gestion: { v1: 1082.94, v2: 3636.36, cambio: "+235.8%", desc: "Colchón de cierre de 1 semana (S6) valorizado con tarifas y roles reales." },
    presupuestoTotal: { v1: 22741.73, v2: 63495.53, cambio: "+179.2%", desc: "Financiamiento total estimado (desembolso de oportunidad)." }
  };

  const activeCategories = selectedVersion === "v1" ? CATEGORIES_V1 : CATEGORIES_V2;
  const activeCurvaData = selectedVersion === "v1" ? CURVA_S_V1 : CURVA_S_V2;
  const maxAcumulado = selectedVersion === "v1" ? 22000 : 61000;

  return (
    <div className="animate-fade-in text-slate-800">
      {/* ── SECCIÓN DE INTRODUCCIÓN ── */}
      <section id="p07-gestion-costos" className="py-12 bg-white border-b border-slate-200">
        <div className="px-6 sm:px-10 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <span className="font-mono text-xs text-[#0d7377] uppercase tracking-wider block mb-2">
                07 · Línea Base de Costos del Proyecto · PMBOK 6
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
                Línea Base de los Costos del Proyecto
              </h2>
            </div>
            
            <a 
              href={EXCEL_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#0d7377]/10 hover:bg-[#0d7377]/20 text-[#0d7377] px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-colors border border-[#0d7377]/20 self-start md:self-auto cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              VER EXCEL EN DRIVE (TRACABLE)
            </a>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed text-justify mb-8 max-w-4xl">
            La gestión de costos según el estándar PMBOK <Cite r="PMI, 2017" /> engloba los procesos para planificar, estimar, presupuestar y controlar los costos de modo que el proyecto se complete dentro del presupuesto aprobado. Esta sección presenta la <strong>Línea Base de Costos (v2)</strong>, ajustada y alineada de manera rígida con las <strong>24 semanas (6 Sprints)</strong> de ejecución y la dedicación a jornada completa (8 horas/día) del equipo de desarrollo, sumando un costo total de oportunidad de <strong>S/. 59,859.17</strong>.
          </p>

          {/* TAB NAVIGATION */}
          <div className="border-b border-slate-200 mb-8 overflow-x-auto">
            <div className="flex gap-6 min-w-[500px] pb-1">
              <button
                onClick={() => setActiveTab("planificacion")}
                className={`pb-3 text-xs uppercase tracking-wider font-bold transition-all border-b-2 font-mono cursor-pointer ${
                  activeTab === "planificacion"
                    ? "border-[#0d7377] text-[#0d7377]"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                1. Planificación Financiera
              </button>
              <button
                onClick={() => setActiveTab("estimacion")}
                className={`pb-3 text-xs uppercase tracking-wider font-bold transition-all border-b-2 font-mono cursor-pointer ${
                  activeTab === "estimacion"
                    ? "border-[#0d7377] text-[#0d7377]"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                2. Estimación de Costos (PERT)
              </button>
              <button
                onClick={() => setActiveTab("presupuesto")}
                className={`pb-3 text-xs uppercase tracking-wider font-bold transition-all border-b-2 font-mono cursor-pointer ${
                  activeTab === "presupuesto"
                    ? "border-[#0d7377] text-[#0d7377]"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                3. Presupuesto & Curva S
              </button>
              <button
                onClick={() => setActiveTab("comparacion")}
                className={`pb-3 text-xs uppercase tracking-wider font-bold transition-all border-b-2 font-mono cursor-pointer ${
                  activeTab === "comparacion"
                    ? "border-[#0d7377] text-[#0d7377]"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                4. Alineación SCRUM (v1 vs v2)
              </button>
            </div>
          </div>

          <div className="max-w-5xl">
            {/* ── TAB 1: PLANIFICACIÓN FINANCIERA ── */}
            <div className={activeTab === "planificacion" ? "space-y-6 animate-fade-in" : "hidden"}>
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-900 text-white font-mono text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">1</span>
                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    Planificar la Gestión Financiera
                  </h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed text-justify">
                  Este proceso establece las políticas, los procedimientos y la documentación para planificar, gestionar, gastar y controlar los costos del proyecto. Como el proyecto es autofinanciado por el equipo universitario, todos los gastos representan <strong>costos de oportunidad</strong> valorizados según las tarifas del mercado de Lima 2026.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Left Column: Entradas & Alternativas */}
                  <div className="md:col-span-2 space-y-4">
                    <h4 className="font-serif text-base font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-indigo-600" />
                      Marco de Planificación y Entradas
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4 text-xs">
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                        <span className="font-mono text-[9px] uppercase font-black text-indigo-700 block mb-1">Acta de Constitución</span>
                        <p className="text-slate-700 leading-normal">
                          Equivale al encargo académico de formulación TI. Determina que el desarrollo del sistema de alerta temprana sea autofinanciado para la IE Peruano Francés.
                        </p>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                        <span className="font-mono text-[9px] uppercase font-black text-indigo-700 block mb-1">Plan de Dirección</span>
                        <p className="text-slate-700 leading-normal">
                          Alineado con las duraciones y riesgos declarados por el cronograma y EDT (20 paquetes de trabajo en 6 cuentas de control).
                        </p>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                        <span className="font-mono text-[9px] uppercase font-black text-indigo-700 block mb-1">Análisis de Alternativas</span>
                        <p className="text-slate-700 leading-normal">
                          Se evaluó construir el motor ETL y sistema de alertas con tecnologías Open Source (Python, Cron Jobs, PostgreSQL y SMTP institucional) para evitar contratar costosos servicios SaaS recurrentes de terceros.
                        </p>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                        <span className="font-mono text-[9px] uppercase font-black text-indigo-700 block mb-1">Factores del Entorno (FAEs)</span>
                        <p className="text-slate-700 leading-normal">
                          Se recopiló información del mercado laboral de Lima 2026 (Computrabajo, Indeed, Talently) para fijar tarifas por hora justas para los roles profesionales asumidos por los integrantes.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Highlights box */}
                  <div className="bg-[#0d7377]/5 border border-[#0d7377]/10 p-5 rounded-2xl flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Coins className="w-5 h-5 text-[#0d7377]" />
                        Métricas de Control
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4 text-justify">
                        Las reglas para medir el desempeño financiero se integran con el <strong>Análisis del Valor Ganado (EVA)</strong>. Se calcularán mensualmente métricas críticas como el CPI (Índice de Desempeño de Costo) y SPI (Índice de Desempeño de Cronograma) para medir la eficiencia y el uso correcto de las reservas.
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between border-b pb-1 text-slate-700">
                          <span>Unidad:</span>
                          <span className="font-bold">Horas-Hombre / Soles (S/.)</span>
                        </div>
                        <div className="flex justify-between border-b pb-1 text-slate-700">
                          <span>Precisión:</span>
                          <span className="font-bold">Céntimo (S/. 0.01)</span>
                        </div>
                        <div className="flex justify-between border-b pb-1 text-slate-700">
                          <span>Exactitud:</span>
                          <span className="font-bold">±15% (Presupuesto)</span>
                        </div>
                        <div className="flex justify-between text-slate-700">
                          <span>Umbral de Desvío:</span>
                          <span className="font-bold text-red-600">Alerta si &gt; ±15%</span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-slate-200/50 mt-4">
                      <span className="font-mono text-[10px] text-slate-400 block">Metodología Aplicada</span>
                      <span className="text-xs font-bold text-[#0d7377]">PMBOK Capítulo 7 - Costos</span>
                    </div>
                  </div>
                </div>

                {/* TABLE OF PLAN COMPONENT DETAILS */}
                <div className="space-y-4 pt-4">
                  <h4 className="font-serif text-base font-bold text-slate-900">
                    Definición de Componentes del Plan de Gestión Financiera
                  </h4>
                  <div className="border border-slate-200 bg-white rounded-xl overflow-hidden shadow-xs text-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left divide-y divide-slate-150">
                        <thead className="bg-slate-50 text-[10px] font-mono font-bold text-slate-500 uppercase">
                          <tr>
                            <th className="px-4 py-2.5 w-1/4">Componente</th>
                            <th className="px-4 py-2.5">Definición aplicada al proyecto</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-150 text-slate-650">
                          <tr>
                            <td className="px-4 py-3 font-semibold text-slate-900 bg-slate-50/20">Unidades de medida</td>
                            <td className="px-4 py-3">Horas-hombre para medir el esfuerzo de cada recurso; Soles peruanos (S/.) para todos los montos monetarios.</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-semibold text-slate-900 bg-slate-50/20">Enlaces con procedimientos</td>
                            <td className="px-4 py-3">El registro de costos se alinea con el cronograma de entregas académicas de la UNTELS (informes quincenales, paquete 1.1.2) y con la sustentación ante el docente asesor.</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-semibold text-slate-900 bg-slate-50/20">Formatos de informes</td>
                            <td className="px-4 py-3">Informe quincenal de avance (Word/PDF) por cada uno de los 6 informes de gestión definidos, detallando gastos por cuenta de control.</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-semibold text-slate-900 bg-slate-50/20">Estrategia de Financiamiento</td>
                            <td className="px-4 py-3">Esquema de <strong>autofinanciación de oportunidad</strong> al 100% por los 4 integrantes del equipo de desarrollo, sin fuente externa de fondos ni financiamiento bancario.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── TAB 2: ESTIMACIÓN DE COSTOS (PERT) ── */}
            <div className={activeTab === "estimacion" ? "space-y-6 animate-fade-in" : "hidden"}>
              <div id="p07-estimacion-pert" className="space-y-6">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-900 text-white font-mono text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">2</span>
                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    Estimar los Costos del Proyecto
                  </h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed text-justify">
                  Consiste en estimar los recursos monetarios aproximados requeridos para completar las actividades del proyecto. Se combinó la técnica de <strong>Estimación Ascendente (Bottom-Up)</strong> para todos los paquetes de la EDT con la técnica <strong>PERT (Estimación por Tres Valores)</strong> para los paquetes críticos que involucran mayor incertidumbre de cara al alcance, los datos y la disposición de terceros.
                </p>

                {/* PERT ESTIMATION TABLE */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-base font-bold text-slate-900 flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-amber-600" />
                      Estimación PERT para Paquetes de Alto Riesgo
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">
                      Fórmula: $Ce = (Co + 4Cm + Cp) / 6$
                    </span>
                  </div>
                  <div className="border border-slate-200 bg-white rounded-xl overflow-hidden shadow-xs text-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left divide-y divide-slate-150">
                        <thead className="bg-slate-50 text-[10px] font-mono font-bold text-slate-500 uppercase text-center">
                          <tr>
                            <th className="px-3 py-2.5 text-left w-12">ID</th>
                            <th className="px-3 py-2.5 text-left w-1/4">Paquete de Trabajo</th>
                            <th className="px-3 py-2.5 text-left">Riesgo Asociado</th>
                            <th className="px-2 py-2.5">Co (S/.)</th>
                            <th className="px-2 py-2.5">Cm (S/.)</th>
                            <th className="px-2 py-2.5">Cp (S/.)</th>
                            <th className="px-3 py-2.5 font-bold text-indigo-700">Ce (S/.)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-150 text-slate-650">
                          {HIGH_RISK_PACKAGES.map((pkg) => (
                            <tr key={pkg.id} className="hover:bg-slate-50/50">
                              <td className="px-3 py-3 text-center font-mono font-bold text-slate-900">{pkg.id}</td>
                              <td className="px-3 py-3 font-semibold text-slate-800 text-left">{pkg.nombre}</td>
                              <td className="px-3 py-3 text-slate-500 text-justify text-[11px] leading-snug">{pkg.riesgo}</td>
                              <td className="px-2 py-3 text-center font-mono">{pkg.co.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</td>
                              <td className="px-2 py-3 text-center font-mono">{pkg.cm.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</td>
                              <td className="px-2 py-3 text-center font-mono">{pkg.cp.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</td>
                              <td className="px-3 py-3 text-center font-mono font-bold text-indigo-700 bg-indigo-50/40">
                                {pkg.ce.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs space-y-2">
                    <p className="text-slate-700 leading-normal">
                      <strong>Cálculo de Desviación Estándar y Varianza:</strong> Sumando las varianzas individuales de estos 4 paquetes de alto riesgo, obtenemos una varianza acumulada de $\Sigma \sigma^2 = 502,382.81$, lo que resulta en una <strong>Desviación Estándar del Proyecto $\sigma_p = S/. 708.79$</strong>.
                    </p>
                    <p className="text-slate-500 text-[10px] leading-normal font-mono">
                      * Este análisis estadístico proporciona un nivel de confianza del 68% (1 sigma) de que el costo real del proyecto fluctuará de forma natural entre S/. 19,291.21 y S/. 20,708.79 en el diseño inicial de 132 días de ejecución.
                    </p>
                  </div>
                </div>

                {/* DESGLOSE GRANULAR POR CATEGORIA */}
                <div className="space-y-4 pt-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h4 className="font-serif text-base font-bold text-slate-900 flex items-center gap-2">
                      <Scale className="w-5 h-5 text-[#0d7377]" />
                      Estimaciones de Costos por Categoría
                    </h4>
                    
                    {/* Version Selector */}
                    <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs font-mono self-start sm:self-auto">
                      <button
                        onClick={() => setSelectedVersion("v1")}
                        className={`px-3 py-1 rounded-md cursor-pointer transition-all ${
                          selectedVersion === "v1" ? "bg-white text-slate-900 font-bold shadow-xs" : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        V1 (Original)
                      </button>
                      <button
                        onClick={() => setSelectedVersion("v2")}
                        className={`px-3 py-1 rounded-md cursor-pointer transition-all ${
                          selectedVersion === "v2" ? "bg-white text-slate-900 font-bold shadow-xs" : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        V2 (Alineada SCRUM)
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500">
                    Siga el desglose granular exigido por la metodología. Tenga en cuenta que varias categorías se listan en S/. 0.00 debido a la cesión de activos preexistentes o aportaciones sin desembolso por la institución escolar:
                  </p>

                  <div className="border border-slate-200 bg-white rounded-xl overflow-hidden shadow-xs text-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left divide-y divide-slate-150">
                        <thead className="bg-slate-50 text-[10px] font-mono font-bold text-slate-500 uppercase">
                          <tr>
                            <th className="px-4 py-2.5 w-12 text-center">N°</th>
                            <th className="px-4 py-2.5 w-1/4">Categoría del Costo</th>
                            <th className="px-4 py-2.5 text-right w-32">Monto (S/.)</th>
                            <th className="px-4 py-2.5">Detalle Aplicado al Proyecto</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-150 text-slate-650">
                          {activeCategories.map((cat) => (
                            <tr key={cat.num} className="hover:bg-slate-50/50">
                              <td className="px-4 py-3.5 text-center font-mono font-bold text-slate-400">{cat.num}</td>
                              <td className="px-4 py-3.5 font-bold text-slate-800">{cat.categoria}</td>
                              <td className="px-4 py-3.5 text-right font-mono font-bold text-slate-900">
                                S/. {cat.monto.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                              </td>
                              <td className="px-4 py-3.5 text-justify leading-relaxed text-slate-600 text-[11px]">{cat.detalle}</td>
                            </tr>
                          ))}
                          <tr className="bg-slate-50/60 font-bold border-t-2 border-slate-200">
                            <td className="px-4 py-3.5 text-right uppercase font-mono text-[10px]" colSpan={2}>
                              TOTAL LÍNEA BASE DE COSTOS:
                            </td>
                            <td className="px-4 py-3.5 text-right font-mono text-[#0d7377] text-sm">
                              S/. {activeCategories.reduce((sum, item) => sum + item.monto, 0).toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                            </td>
                            <td className="px-4 py-3.5 text-slate-400 font-normal text-[10px] font-mono">
                              * Suma de la línea base + reservas de contingencia.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* DOCUMENTO DE RESPALDO (BASE DE ESTIMACIONES) */}
                <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
                  <h4 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#0d7377]" />
                    Documento de Respaldo — Base de las Estimaciones
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-2">
                      <span className="font-mono text-[9px] uppercase font-black text-[#0d7377] block border-b pb-1">Supuestos Clave</span>
                      <ul className="list-disc pl-4 space-y-1 text-slate-600 leading-relaxed">
                        <li>Dedicación estándar del equipo: 4h/día en v1 y 8h/día en v2 para tareas de desarrollo.</li>
                        <li>Duración total del proyecto: 132 días hábiles (v1) o 159.2 días hábiles (v2).</li>
                        <li>Se asume que la IEP provee sin costo: acceso a datos, servidor SMTP, proyector, sala de reuniones.</li>
                        <li>Tarifas por hora corresponden a costos de oportunidad reales de Lima en 2026.</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <span className="font-mono text-[9px] uppercase font-black text-[#0d7377] block border-b pb-1">Restricciones de Costo</span>
                      <ul className="list-disc pl-4 space-y-1 text-slate-600 leading-relaxed">
                        <li><strong>Presupuesto Cero:</strong> No hay financiamiento institucional externo ni desembolso de efectivo de la IEP.</li>
                        <li><strong>Equipo Fijo:</strong> 4 integrantes estables, sin posibilidad de contratar personal de apoyo externo.</li>
                        <li><strong>Alcance Tecnológico:</strong> Solo herramientas de licencia libre o planes gratuitos (Vercel, Supabase).</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── TAB 3: PRESUPUESTO & CURVA S ── */}
            <div className={activeTab === "presupuesto" ? "space-y-6 animate-fade-in" : "hidden"}>
              <div id="p07-presupuesto" className="space-y-6">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-900 text-white font-mono text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">3</span>
                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    Determinar el Presupuesto y la Curva "S"
                  </h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed text-justify">
                  El presupuesto del proyecto consiste en sumar los costos estimados de cada paquete de trabajo y añadir las reservas para contingencias y de gestión. En un entorno PMBOK, la <strong>Línea Base de Costos</strong> contiene las contingencias, mientras que el <strong>Presupuesto del Proyecto</strong> incorpora adicionalmente la Reserva de Gestión.
                </p>

                {/* BUDGET TABLE */}
                <div className="grid md:grid-cols-2 gap-6 items-start">
                  <div className="space-y-3">
                    <h4 className="font-serif text-base font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                      <Coins className="w-5 h-5 text-[#0d7377]" />
                      Estructura Financiera del Proyecto
                    </h4>
                    <div className="border border-slate-200 bg-white rounded-xl overflow-hidden shadow-xs text-xs">
                      <table className="w-full text-left divide-y divide-slate-150">
                        <thead className="bg-slate-50 text-[10px] font-mono font-bold text-slate-500 uppercase">
                          <tr>
                            <th className="px-4 py-2">Concepto Financiero</th>
                            <th className="px-4 py-2 text-right">v1 (Original)</th>
                            <th className="px-4 py-2 text-right text-indigo-700">v2 (Alineado)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-150 text-slate-650">
                          <tr>
                            <td className="px-4 py-3 font-semibold">Costo del EDT (Trabajo Directo)</td>
                            <td className="px-4 py-3 text-right font-mono">S/. 20,000.00</td>
                            <td className="px-4 py-3 text-right font-mono font-semibold text-slate-800">S/. 54,417.42</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-amber-700 font-semibold">(+) Reserva de Contingencia</td>
                            <td className="px-4 py-3 text-right font-mono text-amber-600">S/. 1,658.79 (8.3%)</td>
                            <td className="px-4 py-3 text-right font-mono font-semibold text-amber-700">S/. 5,441.74 (10.0%)</td>
                          </tr>
                          <tr className="bg-emerald-50/30 font-bold">
                            <td className="px-4 py-3 text-[#0d7377]">= LÍNEA BASE DE COSTOS</td>
                            <td className="px-4 py-3 text-right font-mono text-[#0d7377]">S/. 21,658.79</td>
                            <td className="px-4 py-3 text-right font-mono text-emerald-800 text-sm">S/. 59,859.17</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-indigo-700 font-semibold">(+) Reserva de Gestión</td>
                            <td className="px-4 py-3 text-right font-mono text-indigo-600">S/. 1,082.94 (5.0%)</td>
                            <td className="px-4 py-3 text-right font-mono font-semibold text-indigo-700">S/. 3,636.36 (1 sem)</td>
                          </tr>
                          <tr className="bg-slate-100 font-extrabold text-sm border-t-2 border-slate-300">
                            <td className="px-4 py-3.5 text-slate-900">= PRESUPUESTO DEL PROYECTO</td>
                            <td className="px-4 py-3.5 text-right font-mono text-slate-700">S/. 22,741.73</td>
                            <td className="px-4 py-3.5 text-right font-mono text-slate-900 text-base">S/. 63,495.53</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Highlights Card */}
                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl text-xs space-y-4">
                    <h4 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Info className="w-5 h-5 text-indigo-600" />
                      Reglas para el Uso de Reservas (PMBOK)
                    </h4>
                    <p className="text-slate-600 leading-relaxed text-justify">
                      La <strong>Reserva de Contingencia</strong> está destinada a riesgos identificados ("conocidos-desconocidos") y forma parte de la Línea Base de Costos. Puede ser aprobada y gestionada de forma directa por el <strong>Líder de Proyecto</strong> ante contingencias operativas en los Sprints.
                    </p>
                    <p className="text-slate-600 leading-relaxed text-justify">
                      La <strong>Reserva de Gestión</strong> atiende riesgos no previstos ("desconocidos-desconocidos") o solicitudes de cambio de alcance mayores. No forma parte de la Línea Base de Costos, y su uso requiere una aprobación formal externa del <strong>Docente Asesor / Product Owner</strong>.
                    </p>
                  </div>
                </div>

                {/* THE CURVA S CHART - CUSTOM SVG VISUALIZATION */}
                <div id="p07-curva-s" className="space-y-4 pt-6 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h4 className="font-serif text-base font-bold text-slate-900 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-emerald-600" />
                      Curva "S" de los Costos Acumulados (Línea Base)
                    </h4>

                    {/* Toggle for Chart Version */}
                    <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs font-mono self-start sm:self-auto">
                      <button
                        onClick={() => setSelectedVersion("v1")}
                        className={`px-3 py-1 rounded-md cursor-pointer transition-all ${
                          selectedVersion === "v1" ? "bg-[#0d7377] text-white font-bold shadow-xs" : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        Curva S (V1)
                      </button>
                      <button
                        onClick={() => setSelectedVersion("v2")}
                        className={`px-3 py-1 rounded-md cursor-pointer transition-all ${
                          selectedVersion === "v2" ? "bg-[#0d7377] text-white font-bold shadow-xs" : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        Curva S (V2 - Aligned)
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500">
                    {selectedVersion === "v1" 
                      ? "La curva v1 muestra una distribución simplificada y uniforme de S/. 21,658.79 distribuidos a lo largo del periodo ficticio de Julio a Diciembre 2026."
                      : "La curva v2 muestra una distribución adaptada a los periodos de los 6 Sprints ágiles con un costo total de S/. 59,859.17 en base a los días PERT reales (Marzo a Agosto 2026)."}
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 items-center">
                    {/* SVG Curve chart */}
                    <div className="md:col-span-2 bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden">
                      {/* Grid background */}
                      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
                      
                      <div className="relative h-60 w-full flex items-end justify-between">
                        {/* Custom SVG Line Drawing */}
                        <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="curveGradient" x1="0" y1="1" x2="0" y2="0">
                              <stop offset="0%" stopColor="#0d7377" stopOpacity="0.1" />
                              <stop offset="100%" stopColor="#0d7377" stopOpacity="0.8" />
                            </linearGradient>
                          </defs>

                          {/* Grid Lines */}
                          <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                          <line x1="0" y1="40%" x2="100%" y2="40%" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                          <line x1="0" y1="60%" x2="100%" y2="60%" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                          <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />

                          {/* SVG Path */}
                          {selectedVersion === "v1" ? (
                            <>
                              <path
                                d="M 10 220 L 100 190 L 190 160 L 280 130 L 370 100 L 460 70 L 550 40"
                                fill="none"
                                stroke="#14b8a6"
                                strokeWidth="3"
                                strokeLinecap="round"
                                className="transition-all duration-500"
                              />
                              <path
                                d="M 10 220 L 100 190 L 190 160 L 280 130 L 370 100 L 460 70 L 550 40 L 550 240 L 10 240 Z"
                                fill="url(#curveGradient)"
                                className="transition-all duration-500"
                              />
                            </>
                          ) : (
                            <>
                              {/* Exponentially shaped Curva S for Sprint-by-Sprint v2 */}
                              <path
                                d="M 10 220 L 100 200 L 190 160 L 280 120 L 370 80 L 460 55 L 550 30"
                                fill="none"
                                stroke="#0d7377"
                                strokeWidth="4"
                                strokeLinecap="round"
                                className="transition-all duration-500"
                              />
                              <path
                                d="M 10 220 L 100 200 L 190 160 L 280 120 L 370 80 L 460 55 L 550 30 L 550 240 L 10 240 Z"
                                fill="url(#curveGradient)"
                                className="transition-all duration-500"
                              />
                            </>
                          )}
                        </svg>

                        {/* Interactive Nodes over the SVG Path */}
                        {activeCurvaData.map((pt, i) => {
                          const pointsCount = activeCurvaData.length;
                          const leftPct = (i / (pointsCount - 1)) * 90 + 5;
                          // Custom Y values approximating coordinates
                          const yValuesV1 = [220, 190, 160, 130, 100, 70, 40];
                          const yValuesV2 = [220, 200, 160, 120, 80, 55, 30];
                          const activeY = selectedVersion === "v1" ? yValuesV1[i] : yValuesV2[i];

                          return (
                            <div
                              key={i}
                              className="absolute group z-10 cursor-pointer"
                              style={{ left: `${leftPct}%`, bottom: `${240 - activeY}px` }}
                              onMouseEnter={() => setHoveredPoint(i)}
                              onMouseLeave={() => setHoveredPoint(null)}
                            >
                              <div className={`w-3.5 h-3.5 rounded-full transition-transform ${
                                hoveredPoint === i 
                                  ? "bg-amber-400 scale-150 ring-4 ring-amber-400/20" 
                                  : "bg-white border-2 border-[#0d7377]"
                              }`} />
                              
                              {/* Hover Tooltip */}
                              <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-white font-mono text-[10px] w-40 shadow-xl transition-all pointer-events-none ${
                                hoveredPoint === i ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                              }`}>
                                <p className="font-bold border-b border-slate-800 pb-1 mb-1 text-amber-400">{pt.mes}</p>
                                <p className="flex justify-between">
                                  <span>Mensual:</span>
                                  <span className="font-bold">S/. {pt.costo.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
                                </p>
                                <p className="flex justify-between text-emerald-400 font-bold mt-0.5">
                                  <span>Acumulado:</span>
                                  <span>S/. {pt.acumulado.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* X-Axis labels */}
                      <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-4 border-t border-slate-900 pt-2 px-1">
                        {activeCurvaData.map((pt, i) => (
                          <span key={i}>{pt.mes.split(" ")[0]}</span>
                        ))}
                      </div>
                    </div>

                    {/* Cost data table column */}
                    <div className="space-y-3">
                      <h5 className="font-mono text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Distribución de Costo por Mes
                      </h5>
                      <div className="space-y-2">
                        {activeCurvaData.map((pt, i) => (
                          <div 
                            key={i} 
                            className={`p-2.5 rounded-xl border text-xs transition-all ${
                              hoveredPoint === i 
                                ? "bg-amber-50/50 border-amber-200 shadow-xs" 
                                : "bg-slate-50/40 border-slate-100"
                            }`}
                            onMouseEnter={() => setHoveredPoint(i)}
                            onMouseLeave={() => setHoveredPoint(null)}
                          >
                            <div className="flex justify-between font-semibold mb-1">
                              <span className="text-slate-800">{pt.mes}</span>
                              <span className="font-mono text-emerald-700">S/. {pt.acumulado.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                              <span>Mensual: S/. {pt.costo.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
                              {selectedVersion === "v2" && (pt as any).detalle && (
                                <span className="truncate max-w-[120px]" title={(pt as any).detalle}>{(pt as any).detalle.split(":")[0]}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── TAB 4: COMPARACIÓN & ALINEACIÓN ── */}
            <div className={activeTab === "comparacion" ? "space-y-6 animate-fade-in" : "hidden"}>
              <div id="p07-alineacion-scrum" className="space-y-6">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-900 text-white font-mono text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">4</span>
                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    Alineación con el Cronograma Ágil (v1 vs v2)
                  </h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed text-justify">
                  Al consolidar la planificación temporal del proyecto mediante el <strong>Cronograma SCRUM de 6 meses</strong>, se detectaron discrepancias entre las asunciones del modelo financiero inicial (v1) y la realidad operativa. Se refinó el modelo de costos para generar la versión <strong>v2 Alerter-SIA-T</strong>, que representa un presupuesto más realista y trazable.
                </p>

                {/* CHANGES HIGHLIGHT CARDS */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs space-y-1.5">
                    <span className="bg-indigo-100 text-indigo-800 font-mono text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Jornada Laboral
                    </span>
                    <h5 className="font-serif font-bold text-slate-900 text-sm">Cambio de 4h a 8h/día</h5>
                    <p className="text-slate-600 leading-normal text-justify">
                      La dedicación de los 4 desarrolladores se ajustó de part-time (4h) a jornada laboral estándar (8h/día) para cumplir estrictamente con los plazos críticos y ceremonias ágiles.
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs space-y-1.5">
                    <span className="bg-amber-100 text-amber-800 font-mono text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Días de Ejecución
                    </span>
                    <h5 className="font-serif font-bold text-slate-900 text-sm">Ampliación a 159.2 días</h5>
                    <p className="text-slate-600 leading-normal text-justify">
                      Se adoptaron los <strong>159.2 días hábiles</strong> del método PERT en lugar de la estimación supuesta de 132 días, reflejando de forma exacta la suma del esfuerzo de las actividades.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs space-y-1.5">
                    <span className="bg-emerald-100 text-emerald-800 font-mono text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Roles y Concurrencia
                    </span>
                    <h5 className="font-serif font-bold text-slate-900 text-sm">Asignaciones Colectivas</h5>
                    <p className="text-slate-600 leading-normal text-justify">
                      En v2, los 4 integrantes participan simultáneamente en pruebas UAT, despliegues y el piloto con docentes, en vez de costearse con un solo recurso por tarea.
                    </p>
                  </div>
                </div>

                {/* COMPARATIVE METRICS TABLE */}
                <div className="space-y-4 pt-4">
                  <h4 className="font-serif text-base font-bold text-slate-900 flex items-center gap-2">
                    <Scale className="w-5 h-5 text-indigo-600" />
                    Tabla Comparativa de Líneas Base v1 vs v2
                  </h4>
                  
                  <div className="border border-slate-200 bg-white rounded-xl overflow-hidden shadow-xs text-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left divide-y divide-slate-150">
                        <thead className="bg-slate-50 text-[10px] font-mono font-bold text-slate-500 uppercase">
                          <tr>
                            <th className="px-4 py-3">Concepto / Cuenta de Costo</th>
                            <th className="px-4 py-3 text-right">v1 (EDT Original)</th>
                            <th className="px-4 py-3 text-right text-indigo-700">v2 (SCRUM Aligned)</th>
                            <th className="px-3 py-3 text-center">Desviación (%)</th>
                            <th className="px-4 py-3">Impacto / Justificación del Refinamiento</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-150 text-slate-650">
                          <tr className="hover:bg-slate-50/50">
                            <td className="px-4 py-3.5 font-semibold text-slate-800">Costo del EDT (Directo)</td>
                            <td className="px-4 py-3.5 text-right font-mono text-slate-500">S/. 20,000.00</td>
                            <td className="px-4 py-3.5 text-right font-mono font-bold text-slate-900">S/. 54,417.42</td>
                            <td className="px-3 py-3.5 text-center font-mono text-red-600 font-bold bg-red-50/20">{BASELINE_COMPARISON.costoEdt.cambio}</td>
                            <td className="px-4 py-3.5 text-[11px] leading-snug text-slate-500 text-justify">{BASELINE_COMPARISON.costoEdt.desc}</td>
                          </tr>
                          <tr className="hover:bg-slate-50/50">
                            <td className="px-4 py-3.5 font-semibold text-slate-800">Reserva de Contingencia</td>
                            <td className="px-4 py-3.5 text-right font-mono text-slate-500">S/. 1,658.79</td>
                            <td className="px-4 py-3.5 text-right font-mono font-bold text-slate-900">S/. 5,441.74</td>
                            <td className="px-3 py-3.5 text-center font-mono text-red-600 font-bold bg-red-50/20">{BASELINE_COMPARISON.contingencia.cambio}</td>
                            <td className="px-4 py-3.5 text-[11px] leading-snug text-slate-500 text-justify">{BASELINE_COMPARISON.contingencia.desc}</td>
                          </tr>
                          <tr className="bg-emerald-50/30 font-bold">
                            <td className="px-4 py-3.5 text-emerald-850">LÍNEA BASE DE COSTOS</td>
                            <td className="px-4 py-3.5 text-right font-mono text-slate-500">S/. 21,658.79</td>
                            <td className="px-4 py-3.5 text-right font-mono text-[#0d7377]">S/. 59,859.17</td>
                            <td className="px-3 py-3.5 text-center font-mono text-red-700 font-bold">{BASELINE_COMPARISON.lineaBase.cambio}</td>
                            <td className="px-4 py-3.5 text-[11px] leading-snug text-[#0d7377] font-normal text-justify">{BASELINE_COMPARISON.lineaBase.desc}</td>
                          </tr>
                          <tr className="hover:bg-slate-50/50">
                            <td className="px-4 py-3.5 font-semibold text-slate-800">Reserva de Gestión</td>
                            <td className="px-4 py-3.5 text-right font-mono text-slate-500">S/. 1,082.94</td>
                            <td className="px-4 py-3.5 text-right font-mono font-bold text-slate-900">S/. 3,636.36</td>
                            <td className="px-3 py-3.5 text-center font-mono text-red-600 font-bold bg-red-50/20">{BASELINE_COMPARISON.gestion.cambio}</td>
                            <td className="px-4 py-3.5 text-[11px] leading-snug text-slate-500 text-justify">{BASELINE_COMPARISON.gestion.desc}</td>
                          </tr>
                          <tr className="bg-slate-100 font-extrabold text-slate-900">
                            <td className="px-4 py-4 uppercase">Presupuesto del Proyecto</td>
                            <td className="px-4 py-4 text-right font-mono">S/. 22,741.73</td>
                            <td className="px-4 py-4 text-right font-mono text-sm">S/. 63,495.53</td>
                            <td className="px-3 py-4 text-center font-mono text-red-800 font-black">{BASELINE_COMPARISON.presupuestoTotal.cambio}</td>
                            <td className="px-4 py-4 text-[11px] leading-snug text-slate-700 font-normal text-justify">{BASELINE_COMPARISON.presupuestoTotal.desc}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN DE CONCLUSIONES ── */}
      <section id="p07-conclusiones" className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="px-6 sm:px-10 lg:px-12">
          <div className="max-w-5xl space-y-6">
            <h3 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-6 h-6 text-[#0d7377]" />
              Conclusiones Financieras de la Línea Base
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed text-justify">
              Al finalizar el proceso de Gestión de los Costos para el proyecto <strong>Sistema ML Alerter-SIA-T</strong>, el equipo de desarrollo determina las siguientes directrices y conclusiones fundamentales:
            </p>

            <div className="grid sm:grid-cols-2 gap-6 text-xs text-slate-700 leading-relaxed">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs space-y-3">
                <span className="font-mono text-[9px] uppercase font-black text-[#0d7377] block border-b pb-1">
                  Garantía de Consistencia y Trazabilidad
                </span>
                <p className="text-justify">
                  La <strong>validación cruzada</strong> rigurosa entre el Cronograma del proyecto (BAC = 159.2 días hábiles) y el modelo de costos refinado (suma de Te de las 44 actividades) confirma una correspondencia matemática perfecta. Se garantiza la consistencia exacta en la duración, plazos, hitos y asignaciones de recursos financieros en ambas líneas base.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs space-y-3">
                <span className="font-mono text-[9px] uppercase font-black text-[#0d7377] block border-b pb-1">
                  Justificación del Sobrecosto de Oportunidad
                </span>
                <p className="text-justify">
                  El incremento en el presupuesto final estimado (de S/. 22,741.73 a <strong>S/. 63,495.53</strong>) se justifica técnicamente por dos factores metodológicos: la adopción de una jornada completa de 8 horas/día en lugar de 4 horas/día parcial, y el costeo real de actividades críticas en las cuales participan los 4 integrantes de manera colaborativa simultánea (ceremonias, piloto y capacitaciones).
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs space-y-3">
                <span className="font-mono text-[9px] uppercase font-black text-[#0d7377] block border-b pb-1">
                  Mitigación de Incertidumbre y Reservas
                </span>
                <p className="text-justify">
                  Los métodos de <strong>Reserva de Contingencia (10% por Sprint)</strong> y la <strong>Reserva de Gestión (1 semana de colchón en S6)</strong> quedan perfectamente alineados con la holgura del cronograma. Esto facilita el control integrado de plazos y costos mediante el Análisis de Valor Ganado (EVA), reduciendo el riesgo financiero operativo ante desviaciones por falta de datos o indisponibilidad de docentes.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs space-y-3">
                <span className="font-mono text-[9px] uppercase font-black text-[#0d7377] block border-b pb-1">
                  Recomendaciones para el Control Continuo
                </span>
                <p className="text-justify">
                  Se recomienda actualizar de manera paralela la Línea Base de Costos al cierre de cada Sprint Review (cada 4 semanas). Cualquier variación de plazos o solicitud de cambio aprobada (SC-01 a SC-04) debe analizarse mediante un control integrado de cambios bajo la responsabilidad del Product Owner y Scrum Master, manteniendo el equilibrio de la triple restricción del proyecto.
                </p>
              </div>
            </div>

            {/* General End Quote Card */}
            <div className="bg-indigo-900 text-indigo-100 p-6 rounded-2xl border border-indigo-800 shadow-lg space-y-2 mt-4">
              <h4 className="font-serif font-bold text-white text-base">
                Aprobación Formal de la Línea Base de Costos (v2)
              </h4>
              <p className="text-xs leading-relaxed text-justify opacity-90">
                La presente Línea Base de Costos y Presupuesto del Proyecto v2 queda formalizada como documento oficial de control financiero. Será el estándar comparativo para contrastar los costos reales devengados (AC) contra el valor ganado real (EV) del proyecto, garantizando la transparencia, trazabilidad y control de costos según los lineamientos metodológicos establecidos por la dirección de proyectos del PMBOK 6.
              </p>
              <div className="pt-2 flex flex-wrap justify-between text-[10px] font-mono text-indigo-300">
                <span>Fecha de Aprobación: 14 de Julio, 2026</span>
                <span>Aprobado por: Mg. MBA. Antonio Arqque Pantigozo (Docente Asesor / Product Owner)</span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
