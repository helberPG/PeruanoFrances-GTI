/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  GitFork,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Search,
  BookOpen,
  Award,
  ArrowRight,
  Database,
  Cloud,
  Home,
  ShieldAlert,
  Server,
  Layers,
  HelpCircle,
  TrendingDown,
  LineChart,
  UserCheck,
  ZoomIn,
  ZoomOut,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from "lucide-react";
import Cite from "./Cite";

interface ActionItem {
  id: string; // e.g., A1.1a
  tipo: "Tradicional" | "Innovadora Nube" | "Híbrida Local";
  nombre: string;
  descripcion: string;
}

interface MedioIndirecto {
  id: string; // MI1.1
  titulo: string;
  acciones: ActionItem[];
}

interface MedioDirectoItem {
  id: string; // MD1
  titulo: string;
  mediosIndirectos: MedioIndirecto[];
}

const designThinkingImages = [
  { src: "/Mapa de empatia.png", alt: "Mapa de Empatía del Docente", phase: "Fase 1: Empatizar - Perfil Docente" },
  { src: "/Mapa de Empatia Padres.png", alt: "Mapa de Empatía de la Familia", phase: "Fase 1: Empatizar - Perfil Familia" },
  { src: "/Buyer Persona Principal Docente.png", alt: "Luis Ramírez - Docente Tutor Coordinador", phase: "Fase 2: Definición - Buyer Persona" },
  { src: "/Diagrama de Afinidad.png", alt: "Diagrama de Afinidad / Brainstorming", phase: "Fase 3: Idear - Mapa de Afinidad" },
  { src: "/SCAMPER.png", alt: "Matriz de Estimulación SCAMPER", phase: "Fase 3: Idear - SCAMPER Loop" },
  { src: "/PROTOTIPO.jpeg", alt: "Maqueta Digital del Dashboard SIA-T", phase: "Fase 4: Prototipar - Mockup" },
  { src: "/Customer Journey Docente.png", alt: "Customer Journey del Docente Tutor", phase: "Fase 5: Evaluar - Customer Journey" },
  { src: "/ESTRELLA DE MAR.png", alt: "Retrospectiva Estrella de Mar", phase: "Fase 5: Evaluar - Retrospectiva" },
];

interface CriterionItem {
  num: number;
  nombre: string;
  peso: number;
  alt1: { puntaje: number; ponderado: number };
  alt2: { puntaje: number; ponderado: number };
  alt3: { puntaje: number; ponderado: number };
  descripcion: string;
  justificacion: string;
}

const CRITERIOS_EVALUACION: CriterionItem[] = [
  {
    num: 1,
    nombre: "Suficiencia Tecnológica y Capacidad Predictiva",
    peso: 25,
    alt1: { puntaje: 2, ponderado: 0.50 },
    alt2: { puntaje: 5, ponderado: 1.25 },
    alt3: { puntaje: 4, ponderado: 1.00 },
    descripcion: "Mide el nivel de certeza preventiva de los modelos frente al descarte o mitigación del fracaso escolar prematuro.",
    justificacion: "El Enfoque Cloud (Alt. 2) posee la máxima capacidad predictiva continua (5.0), mientras que el Híbrido (Alt. 3) garantiza un desempeño excelente (4.0) mediante cómputo local offline semanal. El Tradicional BI (Alt. 1) es reactivo (2.0)."
  },
  {
    num: 2,
    nombre: "Viabilidad Económica y Costos de Operación",
    peso: 20,
    alt1: { puntaje: 4, ponderado: 0.80 },
    alt2: { puntaje: 2, ponderado: 0.40 },
    alt3: { puntaje: 5, ponderado: 1.00 },
    descripcion: "Analiza el costo total de propiedad (TCO) balanceando costos variables recurrentes (en dólares) frente a infraestructura existente.",
    justificacion: "La Alt. 3 minimiza costos recurrentes a cero (5.0) usando hardware existente del colegio. La Alt. 2 es fuertemente penalizada (2.0) por cargos variables de nube pública por procesamiento secuencial continuo."
  },
  {
    num: 3,
    nombre: "Facilidad de Integración e Interoperabilidad",
    peso: 20,
    alt1: { puntaje: 3, ponderado: 0.60 },
    alt2: { puntaje: 4, ponderado: 0.80 },
    alt3: { puntaje: 5, ponderado: 1.00 },
    descripcion: "Evalúa el grado de acoplamiento para consumir datos de Cubicol, registros de auxilio académico e incidencias vigentes.",
    justificacion: "La Alt. 3 ofrece una integración local óptima directa (5.0) mediante réplicas lógicas de las bases de datos de producción asociadas a los sistemas de notas de la institución, reduciendo latencias externas."
  },
  {
    num: 4,
    nombre: "Seguridad y Gobernanza de Datos Sensibles",
    peso: 15,
    alt1: { puntaje: 4, ponderado: 0.60 },
    alt2: { puntaje: 2, ponderado: 0.30 },
    alt3: { puntaje: 5, ponderado: 0.75 },
    descripcion: "Cumplimiento de la Ley N° 29733 de Protección de Datos Personales, manteniendo resguardada la información de menores.",
    justificacion: "El resguardo local en servidores de la universidad (Alt. 3) reduce drásticamente las brechas de exfiltración (5.0). La nube comercial (Alt. 2) exige auditorías complejas y expone datos sensibles a terceros (2.0)."
  },
  {
    num: 5,
    nombre: "Sostenibilidad Operativa y Mantenimiento",
    peso: 20,
    alt1: { puntaje: 4, ponderado: 0.80 },
    alt2: { puntaje: 3, ponderado: 0.60 },
    alt3: { puntaje: 4, ponderado: 0.80 },
    descripcion: "Facilidad con que el equipo técnico interno puede administrar de forma autónoma el ciclo de vida de la solución.",
    justificacion: "La Alt. 3 utiliza orquestación local vía Dokploy con Docker, simplificando la administración mediante lenguajes de amplio mercado como Python y Next.js, evitando requerir un costoso equipo permanente de ingenieros MLOps."
  }
];

export default function AlternativesAnalysis() {
  const [activeTab, setActiveTab] = useState<"explorer" | "matrix" | "evaluation" | "design-thinking">("explorer");

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash) return;
      
      let matchedTab: "explorer" | "matrix" | "evaluation" | "design-thinking" | null = null;
      if (hash === "#p04-acciones") {
        matchedTab = "explorer";
      } else if (hash === "#p04-alternativas") {
        matchedTab = "matrix";
      } else if (hash === "#p04-evaluacion") {
        matchedTab = "evaluation";
      } else if (hash === "#p04-design-thinking") {
        matchedTab = "design-thinking";
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
  const [selectedMD, setSelectedMD] = useState<string>("MD1");
  const [expandedDT, setExpandedDT] = useState<string | null>("empatia");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeCompDetail, setActiveCompDetail] = useState<"comp1" | "comp2" | "comp3">("comp1");
  const [selectedCriterion, setSelectedCriterion] = useState<number | null>(null);

  // Reset pan offset when lightbox image index changes or zoom resets
  React.useEffect(() => {
    setPanOffset({ x: 0, y: 0 });
    setIsDragging(false);
  }, [lightboxIndex]);

  React.useEffect(() => {
    if (zoomLevel <= 1) {
      setPanOffset({ x: 0, y: 0 });
      setIsDragging(false);
    }
  }, [zoomLevel]);

  // Drag pan handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoomLevel <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - panOffset.x,
      y: e.clientY - panOffset.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (zoomLevel <= 1) return;
    if (e.touches.length !== 1) return;
    setIsDragging(true);
    setDragStart({
      x: e.touches[0].clientX - panOffset.x,
      y: e.touches[0].clientY - panOffset.y,
    });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    if (e.touches.length !== 1) return;
    setPanOffset({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Sync active tab with hash changes to fix sidebar navigation buttons
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash) return;
      
      let targetTab: "explorer" | "matrix" | "evaluation" | "design-thinking" | null = null;
      if (hash === "#p04-marco" || hash === "#p04-acciones") {
        targetTab = "explorer";
      } else if (hash === "#p04-alternativas") {
        targetTab = "matrix";
      } else if (hash === "#p04-evaluacion") {
        targetTab = "evaluation";
      } else if (hash === "#p04-design-thinking") {
        targetTab = "design-thinking";
      }

      if (targetTab) {
        setActiveTab(targetTab);
        // Force scroll with a small delay for mounting the new DOM content
        setTimeout(() => {
          const el = document.getElementById(hash.replace("#", ""));
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 120);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    
    // Also handle direct anchor clicks across the app (including sidebar)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.hash) {
        setTimeout(handleHashChange, 20);
      }
    };
    
    document.addEventListener("click", handleAnchorClick);
    
    // Run initially in case of pages loaded on a specific hash
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  // Listen for keyboard events for the lightbox
  React.useEffect(() => {
    if (lightboxIndex === null) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null && prev < designThinkingImages.length - 1 ? prev + 1 : 0));
        setZoomLevel(1);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : designThinkingImages.length - 1));
        setZoomLevel(1);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  const goal = "Mejorar la detección temprana del rendimiento académico estudiantil mediante un sistema inteligente basado en Machine Learning.";

  const alternatives = [
    {
      id: "Alt-1",
      num: 1,
      titulo: "Enfoque Tradicional BI (Enfoque BI)",
      enfoque: "Reactivo & Descriptivo",
      infra: "Hojas de cálculo de Microsoft/Google y un almacén de datos PostgreSQL tradicional.",
      descripcion: "Se basa en la consolidación manual bimestral de datos históricos en Power BI o Excel. Permite conocer los promedios pasados, pero carece de modelos predictivos y las alertas se realizan de forma descriptiva o tardía (al final del bimestre).",
      evaluacion: "Consistente pero Insuficiente",
      motivo: "No posee capacidades operativas para actuar como un sistema de alerta temprana. Una solución puramente descriptiva basada en datos acumulativos descubre las bajas calificaciones cuando el alumno ya reprobó, omitiendo el valor predictivo que requiere la solución.",
      tagColor: "bg-red-100 text-red-800 border-red-200",
      icon: <TrendingDown className="w-6 h-6 text-red-600" />
    },
    {
      id: "Alt-2",
      num: 2,
      titulo: "Enfoque Innovador Cloud MLOps (Enfoque Nube)",
      enfoque: "Proactivo & En la Nube",
      infra: "Arquitectura Data Lakehouse (AWS/GCP/Azure) con pipelines serverless continuos y MLOps continuo.",
      descripcion: "Uso de sistemas automatizados en nube con ingestión en tiempo real (streams) de logs LMS y telemetría de interacción, gobernando un entorno robusto de MLOps en la nube que notifica de inmediato mediante notificaciones push móviles.",
      evaluacion: "Consistente y Plenamente Suficiente",
      motivo: "Satisface con nivel de excelencia técnica rigurosa el objetivo central. Sin embargo, su principal limitación es la dependencia económica por los costos mensuales recurrentes de facturación de nube pública (en dólares) y la alta complejidad de gestión de datos externos.",
      tagColor: "bg-blue-100 text-blue-800 border-blue-200",
      icon: <Cloud className="w-6 h-6 text-blue-600" />
    },
    {
      id: "Alt-3",
      num: 3,
      titulo: "Enfoque Híbrido Autohospedado (Enfoque Híbrido)",
      enfoque: "Proactivo, Local & Eficiente",
      infra: "Servidor local centralizado (VPS/WSL2 gestionado vía Dokploy), Next.js interactivo y scripts programados de Python (Scikit-learn) locales.",
      descripcion: "Combina el poder de la Inteligencia Artificial analítica local con la agilidad de una SPA (Next.js/React). El entrenamiento y predicción del modelo se ejecutan localmente por hilos automáticos una vez por semana, eliminando servidores de pago mensual recurrente.",
      evaluacion: "Consistente, Suficiente y Viable (RECOMENDADO / ÓPTIMO)",
      motivo: "Es la alternativa elegida por su alta viabilidad técnica y nulo presupuesto de mantenimiento recurrente para una IEP de VES. Permite control directo y soberanía de los datos académicos y de comportamiento sensibles de los 200 menores (Ley N° 29733) sin exponerlos a servicios en la nube de terceros.",
      tagColor: "bg-emerald-100 text-emerald-850 border-emerald-200 font-extrabold",
      icon: <Server className="w-6 h-6 text-emerald-700" />
    }
  ];

  const MDs: MedioDirectoItem[] = [
    {
      id: "MD1",
      titulo: "Análisis integrado de datos académicos y conductuales de los estudiantes",
      mediosIndirectos: [
        {
          id: "MI1.1",
          titulo: "Integración de información académica en una base de datos única y centralizada",
          acciones: [
            {
              id: "A1.1a",
              tipo: "Tradicional",
              nombre: "Scripts ETL por lotes",
              descripcion: "Diseñar, programar y ejecutar scripts de extracción, transformación y carga (pipelines ETL tradicionales por lotes) para migrar periódicamente la información de Cubicol hacia un almacén de datos PostgreSQL local de forma síncrona."
            },
            {
              id: "A1.1b",
              tipo: "Innovadora Nube",
              nombre: "Data Lakehouse automatizada",
              descripcion: "Implementar un Data Lakehouse en una plataforma de nube pública, permitiendo la ingesta concurrente y unificación de flujos estructurados y no estructurados en tiempo real."
            },
            {
              id: "A1.1c",
              tipo: "Híbrida Local",
              nombre: "VPS con réplicas locales (Recomendada)",
              descripcion: "Configurar un servidor local centralizado (VPS/WSL2 gestionado localmente con Dokploy) que implemente réplicas de lectura automatizadas y contenedores aislados de los sistemas de origen, unificando datos de forma controlada, segura y económica."
            }
          ]
        },
        {
          id: "MI1.2",
          titulo: "Calidad y actualización constante de los datos académicos",
          acciones: [
            {
              id: "A1.2a",
              tipo: "Tradicional",
              nombre: "Auditorías manuales quincenales",
              descripcion: "Establecer un marco regulatorio institucional de auditorías manuales quincenales sobre las tablas de datos, mediante el uso de formularios de rectificación coordinados con secretaría académica."
            },
            {
              id: "A1.2b",
              tipo: "Innovadora Nube",
              nombre: "Pipelines serverless de calidad",
              descripcion: "Desplegar pipelines serverless de calidad de datos en la nube que realicen validaciones sintácticas y descarte de registros nulos o inconsistentes automáticamente en tiempo de ingesta."
            },
            {
              id: "A1.2c",
              tipo: "Híbrida Local",
              nombre: "Cron Jobs nocturnos locales (Recomendada)",
              descripcion: "Programar tareas e hilos del sistema local (Cron jobs) que se ejecuten automáticamente todas las noches para auditar, limpiar, indexar y corregir inconsistencias lógicas en la base de datos centralizada."
            }
          ]
        }
      ]
    },
    {
      id: "MD2",
      titulo: "Automatización del seguimiento y monitoreo del desempeño estudiantil",
      mediosIndirectos: [
        {
          id: "MI2.1",
          titulo: "Disponibilidad de dashboards e indicadores de desempeño",
          acciones: [
            {
              id: "A2.1a",
              tipo: "Tradicional",
              nombre: "Tableros estáticos Power BI",
              descripcion: "Diseñar y publicar de forma estática tableros de control en Power BI comercial licenciado, actualizados bimestralmente mediante cargas manuales de datos consolidados."
            },
            {
              id: "A2.1b",
              tipo: "Innovadora Nube",
              nombre: "Microfrontends nube en LMS",
              descripcion: "Desarrollar una interfaz analítica modular basada en microfrontends e integrada nativamente en el LMS institucional en la nube, con renderizado dinámico."
            },
            {
              id: "A2.1c",
              tipo: "Híbrida Local",
              nombre: "Dashboard autohospedado Next.js (Recomendada)",
              descripcion: "Construir cuadros de mando web analíticos interactivos y dinámicos en Next.js, desplegados localmente sobre la infraestructura autohospedada del colegio con conexión de réplica de datos segura."
            }
          ]
        },
        {
          id: "MI2.2",
          titulo: "Generación de alertas tempranas para docentes y coordinadores",
          acciones: [
            {
              id: "A2.2a",
              tipo: "Tradicional",
              nombre: "Reportes automatizados PDF por email",
              descripcion: "Desarrollar un módulo clásico de reportes encargado de enviar listados estáticos consolidados en formato PDF por correo institucional al cierre estricto de cada bimestral."
            },
            {
              id: "A2.2b",
              tipo: "Innovadora Nube",
              nombre: "Motor predictivo reactivo móvil",
              descripcion: "Implementar un motor de eventos predictivo que dispare notificaciones push push inmediatas y personalizadas a aplicaciones móviles nativas Flutter/Dart cuando el sistema compute riesgo."
            },
            {
              id: "A2.2c",
              tipo: "Híbrida Local",
              nombre: "Sección intranet de alertas críticas (Recomendada)",
              descripcion: "Configurar un módulo web local de alertas críticas dentro del panel docente, complementado con un script de mensajería automatizada que envíe resúmenes diarios programados sin consumo de APIs externas."
            }
          ]
        }
      ]
    },
    {
      id: "MD3",
      titulo: "Fortalecimiento del monitoreo del comportamiento académico estudiantil",
      mediosIndirectos: [
        {
          id: "MI3.1",
          titulo: "Reducción de dependencia de registros manuales",
          acciones: [
            {
              id: "A3.1a",
              tipo: "Tradicional",
              nombre: "Digitalización manual de hojas",
              descripcion: "Digitalizar los partes de asistencia y conducta delegando en los docentes el llenado diario obligatorio en hojas de cálculo compartidas en la nube (Google Sheets / Excel Online)."
            },
            {
              id: "A3.1b",
              tipo: "Innovadora Nube",
              nombre: "Webhooks de telemetría continuos",
              descripcion: "Configurar el consumo inmediato de streams de datos, logs y tiempos de conectividad mediante webhooks y eventos de telemetría nativos de plataformas Cloud LMS."
            },
            {
              id: "A3.1c",
              tipo: "Híbrida Local",
              nombre: "Modelado SQL de extracción local (Recomendada)",
              descripcion: "Implementar tareas de extracción diaria automatizada mediante consultas SQL directas programadas hacia bases de datos locales para capturar inasistencias y entregas."
            }
          ]
        },
        {
          id: "MI3.2",
          titulo: "Optimización del procesamiento y análisis de datos académicos",
          acciones: [
            {
              id: "A3.2a",
              tipo: "Tradicional",
              nombre: "Módulos estadísticos manuales",
              descripcion: "Desarrollar hojas de cálculo y macros para calcular desviaciones estándar, medias móviles y correlaciones de Pearson de manera manual al cierre de cada semestre escolar."
            },
            {
              id: "A3.2b",
              tipo: "Innovadora Nube",
              nombre: "Mantenimiento automatizado MLOps",
              descripcion: "Desplegar un ciclo de vida MLOps completo en la nube (GCP Vertex/AWS Sagemaker) para gobernar redes neuronales y gradient boosting con reentrenamiento continuo automatizado."
            },
            {
              id: "A3.2c",
              tipo: "Híbrida Local",
              nombre: "Scripts locales Scikit-learn (Recomendada)",
              descripcion: "Programar scripts de Python (Scikit-learn) que se ejecuten localmente en el servidor una vez por semana, entrenando y procesando los scores de riesgo predictivo sin intervención externa."
            }
          ]
        }
      ]
    }
  ];

  return (
    <div className="animate-fade-in text-slate-805">
      {/* ── SECCIÓN 1: INTRODUCCIÓN Y MARCO METODOLÓGICO ── */}
      <section id="p04-marco" className="py-14 bg-white border-b border-slate-200">
        <div className="px-6 sm:px-10 lg:px-12">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2">
            04 · Análisis de Alternativas de Solución · Marco Teórico
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Análisis de Alternativas de Solución (Transition Stage)
          </h2>
          <p className="text-slate-650 text-sm leading-relaxed max-w-4xl text-justify mb-8 font-medium">
            El Análisis de Alternativas de Solución constituye de acuerdo can la metodología del marco lógico <Cite r="CEPAL/ILPES, 2005" /> la etapa de transición crítica. Ésta permite pasar de la estructura abstracta de los objetivos del Árbol de Objetivos a la planificación operativa del sistema real. Describe el <strong>CÓMO</strong> de las transformaciones técnicas necesarias para migrar a la situación positiva deseada orientada por el eje rector:
          </p>

          <div className="border border-indigo-150 bg-indigo-50/30 p-6 rounded-2xl max-w-4xl shadow-xxs mb-10">
            <span className="font-mono text-[10px] text-indigo-700 uppercase tracking-widest font-bold block mb-1">
              EJE RECTOR - OBJETIVO CENTRAL
            </span>
            <p className="text-base sm:text-lg font-serif font-black text-slate-900 italic">
              "{goal}"
            </p>
          </div>

          <h3 className="font-serif text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            Acciones Clave por Medio Fundamental (Tarea 1)
          </h3>
          <p className="text-slate-650 text-sm leading-relaxed max-w-4xl text-justify mb-8">
            Para cada medio fundamental que compone el Árbol de Objetivos, se define la pregunta: <em>¿Qué hacemos conceptualmente para lograr el cambio?</em> A continuación, formule el cruce con los 3 paradigmas tecnológicos considerados:
          </p>

          {/* TAB SYSTEM INNER */}
          <div className="flex border-b border-slate-200 max-w-5xl mb-6">
            <button
              onClick={() => { setActiveTab("explorer"); window.history.pushState(null, "", "#p04-acciones"); }}
              className={`pb-3 text-xs font-mono font-black uppercase tracking-wider border-b-2 px-4 cursor-pointer transition-colors ${
                activeTab === "explorer"
                  ? "border-slate-900 text-slate-900"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              Explorador de Medios (Tarea 1)
            </button>
            <button
              onClick={() => { setActiveTab("matrix"); window.history.pushState(null, "", "#p04-alternativas"); }}
              className={`pb-3 text-xs font-mono font-black uppercase tracking-wider border-b-2 px-4 cursor-pointer transition-colors ${
                activeTab === "matrix"
                  ? "border-slate-900 text-slate-900"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              Matriz de Alternativas (Tarea 2)
            </button>
            <button
              onClick={() => { setActiveTab("evaluation"); window.history.pushState(null, "", "#p04-evaluacion"); }}
              className={`pb-3 text-xs font-mono font-black uppercase tracking-wider border-b-2 px-4 cursor-pointer transition-colors ${
                activeTab === "evaluation"
                  ? "border-slate-900 text-slate-900"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              Evaluación & Selección (Tarea 3)
            </button>
            <button
              onClick={() => { setActiveTab("design-thinking"); window.history.pushState(null, "", "#p04-design-thinking"); }}
              className={`pb-3 text-xs font-mono font-black uppercase tracking-wider border-b-2 px-4 cursor-pointer transition-colors ${
                activeTab === "design-thinking"
                  ? "border-slate-900 text-slate-900"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              Portafolio Design Thinking
            </button>
          </div>

          {/* TAB 1: EXPLORER OF MEDIOS */}
          <div className={activeTab === "explorer" ? "max-w-5xl space-y-6 animate-fade-in" : "hidden"}>
            <div id="p04-acciones" className="space-y-6">
              {/* MD switcher button row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {MDs.map((md) => (
                  <button
                    key={md.id}
                    onClick={() => setSelectedMD(md.id)}
                    className={`p-4 rounded-xl text-left border transition-all text-xs cursor-pointer ${
                      selectedMD === md.id
                        ? "bg-slate-950 border-slate-950 text-white shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <p className="font-mono text-[9px] uppercase tracking-wider font-extrabold pb-1">
                      Componente {md.id}
                    </p>
                    <p className="font-serif font-bold leading-snug">
                      {md.id === "MD1" ? "MD1: Análisis Integrado" : md.id === "MD2" ? "MD2: Automatización Seg." : "MD3: Monitoreo Conducta"}
                    </p>
                  </button>
                ))}
              </div>

              {/* MD details showing MI items */}
              {MDs.filter((md) => md.id === selectedMD).map((md) => (
                <div key={md.id} className="border border-slate-200 rounded-2xl p-6 bg-slate-50/30">
                  <span className="font-mono text-[9px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold uppercase">
                    Foco de Cambio: {md.id}
                  </span>
                  <h4 className="font-serif font-bold text-slate-900 text-sm sm:text-base mt-2 mb-6">
                    {md.titulo}
                  </h4>

                  <div className="space-y-8">
                    {md.mediosIndirectos.map((mi) => (
                      <div key={mi.id} className="border-l-2 border-slate-300 pl-4 space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] bg-indigo-50 border border-indigo-200 text-indigo-700 px-2 py-0.5 rounded font-black">
                            {mi.id}
                          </span>
                          <h5 className="font-serif font-black text-slate-900 text-xs sm:text-sm">
                            {mi.titulo}
                          </h5>
                        </div>

                        {/* Traditional vs Cloud vs Hybrid cards */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-2">
                          {mi.acciones.map((acc) => {
                            let itemColor = "border-slate-200 bg-white hover:border-slate-300";
                            let badgeColor = "bg-slate-150 text-slate-700";
                            let iconEl = <Database className="w-4 h-4 text-slate-500" />;

                            if (acc.tipo === "Innovadora Nube") {
                              badgeColor = "bg-blue-105 text-blue-700 border border-blue-200";
                              iconEl = <Cloud className="w-4 h-4 text-blue-500" />;
                            } else if (acc.tipo === "Híbrida Local") {
                              itemColor = "border-emerald-300 bg-emerald-50/20";
                              badgeColor = "bg-emerald-100 text-emerald-800 border border-emerald-200 font-extrabold";
                              iconEl = <Server className="w-4 h-4 text-emerald-600" />;
                            }

                            return (
                              <div
                                key={acc.id}
                                className={`border p-4 rounded-xl flex flex-col justify-between transition-all shadow-xxs ${itemColor}`}
                              >
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-mono text-[9px] text-slate-400 font-bold">{acc.id}</span>
                                    <span className={`text-[8px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md ${badgeColor} flex items-center gap-1`}>
                                      {iconEl}
                                      {acc.tipo === "Híbrida Local" ? "HÍBRIDO / ÓPTIMO" : acc.tipo.toUpperCase()}
                                    </span>
                                  </div>
                                  <h6 className="font-serif font-black text-slate-900 text-xs mb-1.5 leading-snug">
                                    {acc.nombre}
                                  </h6>
                                  <p className="text-slate-600 text-[11px] leading-relaxed text-justify">
                                    {acc.descripcion}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TAB 2: ALTERNATIVES MATRIX TABLE */}
          <div className={activeTab === "matrix" ? "max-w-5xl space-y-6 animate-fade-in" : "hidden"}>
            <div id="p04-alternativas" className="space-y-6">
              {/* Graphic cards blocks (Page 5 summary blocks) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-slate-200 bg-slate-50/30 rounded-2xl p-5 shadow-xxs">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center mb-4 border shadow-xxs font-mono font-bold">1</div>
                  <h4 className="font-serif font-bold text-slate-950 text-xs sm:text-sm mb-1 leading-snug">PROYECTO ALTERNATIVO N° 1</h4>
                  <p className="font-serif text-[10px] text-slate-500 uppercase tracking-widest font-black">ENFOQUE BI TRADICIONAL</p>
                  <p className="text-[11px] text-slate-600 leading-normal text-justify mt-3">
                    Basado en migraciones por lotes manuales (ETL) y reportería bimestral estática en Power BI comercial.
                  </p>
                  <div className="border-t border-slate-150 pt-2.5 mt-2.5 text-[9px] font-mono text-amber-800 font-extrabold uppercase">
                    RESULTADO: Reportes reactivos al final de periodo
                  </div>
                </div>

                <div className="border border-blue-150 bg-blue-50/10 rounded-2xl p-5 shadow-xxs">
                  <div className="w-10 h-10 rounded-xl bg-blue-105 text-blue-700 flex items-center justify-center mb-4 border border-blue-150 shadow-xxs font-mono font-bold">2</div>
                  <h4 className="font-serif font-bold text-slate-950 text-xs sm:text-sm mb-1 leading-snug">PROYECTO ALTERNATIVO N° 2</h4>
                  <p className="font-serif text-[10px] text-blue-600 uppercase tracking-widest font-black">ENFOQUE ML-OPS CLOUD NUBE</p>
                  <p className="text-[11px] text-slate-600 leading-normal text-justify mt-3">
                    Arquitectura automatizada mediante Data Lakehouses en nube pública con MLOps y notificaciones Flutter en tiempo real.
                  </p>
                  <div className="border-t border-slate-150 pt-2.5 mt-2.5 text-[9px] font-mono text-blue-700 font-extrabold uppercase">
                    RESULTADO: IA altamente escalable en la nube
                  </div>
                </div>

                <div className="border border-emerald-250 bg-emerald-50/20 rounded-2xl p-5 shadow-xxs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center mb-4 border border-emerald-200 shadow-xxs font-mono font-bold">3</div>
                  <h4 className="font-serif font-bold text-slate-950 text-xs sm:text-sm mb-1 leading-snug">PROYECTO ALTERNATIVO N° 3</h4>
                  <p className="font-serif text-[10px] text-emerald-800 uppercase tracking-widest font-black">ENFOQUE HÍBRIDO AUTOHOSPEDADO</p>
                  <p className="text-[11px] text-slate-700 leading-normal text-justify mt-3 font-semibold">
                    Servidores locales administrados vía Dokploy, interfaz Next.js y cómputo predictivo local offline mediante Python/Scikit-learn.
                  </p>
                  <div className="border-t border-emerald-300 pt-2.5 mt-2.5 text-[9px] font-mono text-emerald-800 font-extrabold uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    RESULTADO: IA de bajo costo y seguridad de datos local
                  </div>
                </div>
              </div>

              {/* Matrix Table (Page 6 table schema) */}
              <div className="bg-white border rounded-2xl overflow-hidden shadow-xs border-slate-200">
                <div className="p-4 bg-slate-800 border-b">
                  <p className="font-serif font-bold text-white text-xs sm:text-sm">
                    Matriz de Componentes y Proyectos Alternativos
                  </p>
                </div>
                <div className="overflow-x-auto text-[11px] sm:text-xs">
                  <table className="w-full text-justify divide-y divide-slate-200">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="px-4 py-3 text-left font-mono font-bold text-slate-700 text-[10px] uppercase w-1/4">
                          Medio Directo (Comp.)
                        </th>
                        <th className="px-4 py-3 text-left font-mono text-slate-655 text-[10px] uppercase w-1/4">
                          Alt 1: Enfoque Tradicional BI
                        </th>
                        <th className="px-4 py-3 text-left font-mono text-blue-700 text-[10px] uppercase w-1/4">
                          Alt 2: Enfoque Innovador Cloud
                        </th>
                        <th className="px-4 py-3 text-left font-mono text-emerald-800 text-[10px] uppercase w-1/4 bg-emerald-50/40">
                          Alt 3: Enfoque Híbrido Autohospedado
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      <tr>
                        <td className="px-4 py-3 font-serif font-bold text-slate-900 border-r border-slate-150">
                          MD1: Análisis integrado de datos académicos y conductuales de los estudiantes.
                        </td>
                        <td className="px-4 py-3 text-slate-600 border-r border-slate-150 space-y-1">
                          <p><strong>- A1.1a:</strong> Scripts programados de migración por lotes hacia BD PostgreSQL.</p>
                          <p><strong>- A1.2a:</strong> Auditorías quincenales manuales con fichas físicas.</p>
                        </td>
                        <td className="px-4 py-3 text-slate-655 border-r border-slate-150 space-y-1">
                          <p><strong>- A1.1b:</strong> Data Lakehouse robusto en la nube (AWS/GCP/Azure) a tiempo real.</p>
                          <p><strong>- A1.2b:</strong> Pipelines serverless de validación sintáctica de ingesta nula.</p>
                        </td>
                        <td className="px-4 py-3 text-slate-800 space-y-1 bg-emerald-50/10 font-medium">
                          <p><strong>- A1.1c:</strong> Instancia local (VPS bajo Dokploy) con réplicas de bases de datos de producción.</p>
                          <p><strong>- A1.2c:</strong> Tareas automáticas Cron nocturnas de depuración y limpieza relacional.</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-serif font-bold text-slate-900 border-r border-slate-150">
                          MD2: Automatización del seguimiento y monitoreo del desempeño académico.
                        </td>
                        <td className="px-4 py-3 text-slate-600 border-r border-slate-150 space-y-1">
                          <p><strong>- A2.1a:</strong> Tableros de Power BI comercial estáticos bimestrales.</p>
                          <p><strong>- A2.2a:</strong> Envío masivo periódico de listados de riesgo en PDF por correo.</p>
                        </td>
                        <td className="px-4 py-3 text-slate-655 border-r border-slate-150 space-y-1 font-sans">
                          <p><strong>- A2.1b:</strong> Interfaz analítica web modular insertada directo en el LMS Cloud.</p>
                          <p><strong>- A2.2b:</strong> Disparadores automáticos de alertas mediante notificaciones push en App móvil Flutter.</p>
                        </td>
                        <td className="px-4 py-3 text-slate-800 space-y-1 bg-emerald-50/10 font-medium">
                          <p><strong>- A2.1c:</strong> Aplicación web local interactiva en Next.js conectada al servidor local analítico.</p>
                          <p><strong>- A2.2c:</strong> Módulo web local de alertas para profesores con reportes automáticos integrados.</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-serif font-bold text-slate-900 border-r border-slate-150">
                          MD3: Fortalecimiento del monitoreo del comportamiento escolar.
                        </td>
                        <td className="px-4 py-3 text-slate-600 border-r border-slate-150 space-y-1">
                          <p><strong>- A3.1a:</strong> Llenado diario de asistencia en hojas de cálculo online.</p>
                          <p><strong>- A3.2a:</strong> Análisis descriptivo estadístico tradicional ejecutado post-ciclo.</p>
                        </td>
                        <td className="px-4 py-3 text-slate-655 border-r border-slate-150 space-y-1">
                          <p><strong>- A3.1b:</strong> Telemetría inmediata conductual mediante eventos y webhooks en LMS.</p>
                          <p><strong>- A3.2b:</strong> Infraestructura robusta de MLOps para entrenamiento y servicio predictivo continuo.</p>
                        </td>
                        <td className="px-4 py-3 text-slate-800 space-y-1 bg-emerald-50/10 font-medium">
                          <p><strong>- A3.1c:</strong> Extracción diaria automatizada desde bases de datos locales.</p>
                          <p><strong>- A3.2c:</strong> Scripts semanales locales en Python (Scikit-learn) para cómputo de modelos ML.</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* TAB 3: EVALUATION & SELECTION */}
          <div className={activeTab === "evaluation" ? "max-w-5xl space-y-10 animate-fade-in" : "hidden"}>
            <div id="p04-evaluacion" className="space-y-10">
              {/* SECTION 1: MARCO METODOLÓGICO */}
              <div className="border-b border-slate-200 pb-5">
                <span className="font-mono text-[10px] text-indigo-600 uppercase tracking-wider font-extrabold block mb-1">
                  1. Marco Metodológico de la Evaluación y Selección
                </span>
                <h3 className="font-serif text-2xl font-black text-slate-900 mb-3">
                  Marco Metodológico de la Evaluación y Selección
                </h3>
                <p className="text-slate-650 text-sm leading-relaxed text-justify">
                  Conforme a las directrices de formulación y evaluación de proyectos de TI en la <strong>UNTELS</strong>, una vez establecido el instrumento formal único (Rúbrica de Selección), se procede a la calificación de las alternativas de solución planteadas. Este proceso se instrumentaliza a través de una <strong>Matriz de Decisión Multicriterio Ponderada</strong>, donde cada puntaje asignado se fundamenta estrictamente en los descriptores analíticos de la rúbrica. El proyecto con la mayor calificación final queda seleccionado y definido formalmente en su dimensión de software, arquitectura de datos y componentes operativos, constituyendo la base de ingeniería del proyecto.
                </p>
              </div>

              {/* SECTION 2: MATRIZ FORMAL DE DECISIÓN MULTICRITERIO PONDERADA */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-mono text-[10px] text-indigo-600 uppercase tracking-wider font-extrabold block">
                      2. Instrumento Cuantitativo
                    </span>
                    <h4 className="font-serif text-xl font-bold text-slate-900">
                      Matriz Formal de Decisión Multicriterio Ponderada
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-100 border px-2.5 py-1 rounded-full">
                    Haga clic en un criterio para ver detalles analíticos
                  </span>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm text-justify">
                  A continuación, se presenta la aplicación del instrumento cuantitativo para contrastar y evaluar las tres alternativas estructuradas en la Tarea 2. El procesamiento matemático sitúa al <strong>Proyecto Alternativo N° 3 (Enfoque Híbrido Autohospedado)</strong> como la opción idónea.
                </p>

                <div className="bg-white border rounded-2xl overflow-hidden shadow-xs border-slate-200">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left divide-y divide-slate-200">
                      <thead className="bg-slate-50 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                        <tr>
                          <th className="px-4 py-3.5 text-left w-[35%]">Criterios Técnicos y Operativos Estándar</th>
                          <th className="px-3 py-3.5 text-center w-[10%]">Peso</th>
                          <th className="px-3 py-3.5 text-center w-[15%] bg-slate-100/30">Alt 1: Enfoque Tradicional BI</th>
                          <th className="px-3 py-3.5 text-center w-[15%] bg-blue-50/10">Alt 2: Enfoque Innovador Cloud</th>
                          <th className="px-3 py-3.5 text-center w-[25%] bg-emerald-50/30 font-black text-emerald-900 border-l border-emerald-100">
                            Alt 3: Enfoque Híbrido (Óptimo)
                          </th>
                        </tr>
                        <tr className="bg-slate-100/50 border-t border-slate-150 text-[9px]">
                          <th className="px-4 py-1.5 text-left"></th>
                          <th className="px-3 py-1.5 text-center">%</th>
                          <th className="px-3 py-1.5 text-center bg-slate-100/30">
                            <span className="grid grid-cols-2 gap-1"><span className="text-slate-500">Puntaje</span><span>Pond</span></span>
                          </th>
                          <th className="px-3 py-1.5 text-center bg-blue-50/10 text-blue-800">
                            <span className="grid grid-cols-2 gap-1"><span className="text-slate-500">Puntaje</span><span>Pond</span></span>
                          </th>
                          <th className="px-3 py-1.5 text-center bg-emerald-50/30 text-emerald-800 border-l border-emerald-100">
                            <span className="grid grid-cols-2 gap-1"><span className="text-emerald-700">Puntaje</span><span className="font-extrabold">Pond</span></span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150 text-xs text-slate-700">
                        {CRITERIOS_EVALUACION.map((crit, idx) => (
                          <tr 
                            key={crit.num}
                            onClick={() => setSelectedCriterion(selectedCriterion === idx ? null : idx)}
                            className={`cursor-pointer transition-colors ${
                              selectedCriterion === idx 
                                ? "bg-indigo-50/40" 
                                : "hover:bg-slate-50/80"
                            }`}
                          >
                            <td className="px-4 py-3.5 font-medium text-slate-900">
                              <div className="flex items-start gap-2">
                                <span className="text-slate-400 font-mono text-[10px] mt-0.5">{crit.num}.</span>
                                <span className="leading-tight">{crit.nombre}</span>
                              </div>
                            </td>
                            <td className="px-3 py-3.5 text-center font-mono font-bold text-slate-600">
                              {crit.peso}%
                            </td>
                            <td className="px-3 py-3.5 text-center bg-slate-50/30 border-r border-slate-150">
                              <div className="grid grid-cols-2 gap-1 font-mono">
                                <span>{crit.alt1.puntaje}</span>
                                <span className="text-slate-500">{crit.alt1.ponderado.toFixed(2)}</span>
                              </div>
                            </td>
                            <td className="px-3 py-3.5 text-center bg-blue-50/5 text-blue-900 border-r border-slate-150">
                              <div className="grid grid-cols-2 gap-1 font-mono">
                                <span>{crit.alt2.puntaje}</span>
                                <span className="text-blue-700/80">{crit.alt2.ponderado.toFixed(2)}</span>
                              </div>
                            </td>
                            <td className="px-3 py-3.5 text-center bg-emerald-50/20 font-semibold text-emerald-950 border-l border-emerald-100">
                              <div className="grid grid-cols-2 gap-1 font-mono">
                                <span className="text-emerald-700">{crit.alt3.puntaje}</span>
                                <span className="text-emerald-900 font-extrabold">{crit.alt3.ponderado.toFixed(2)}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {/* TOTAL ROW */}
                        <tr className="bg-slate-900 text-white font-mono text-[11px] sm:text-xs font-bold border-t-2 border-slate-900">
                          <td className="px-4 py-4 uppercase tracking-wider font-extrabold font-serif">
                            TOTAL PONDERADO
                          </td>
                          <td className="px-3 py-4 text-center">
                            100%
                          </td>
                          <td className="px-3 py-4 text-center bg-slate-850">
                            <div className="grid grid-cols-2 gap-1">
                              <span>-</span>
                              <span className="text-red-300">3.30</span>
                            </div>
                          </td>
                          <td className="px-3 py-4 text-center bg-blue-950 text-blue-200">
                            <div className="grid grid-cols-2 gap-1">
                              <span>-</span>
                              <span className="text-blue-300">3.35</span>
                            </div>
                          </td>
                          <td className="px-3 py-4 text-center bg-emerald-950 text-emerald-100 border-l border-emerald-800">
                            <div className="grid grid-cols-2 gap-1">
                              <span>-</span>
                              <span className="text-emerald-400 font-black text-xs sm:text-sm">4.55</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* CRITERION DETAILED VIEW PANEL */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 transition-all min-h-[90px]">
                  {selectedCriterion !== null ? (
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-mono text-[9px] text-indigo-700 bg-indigo-100 border px-1.5 py-0.5 rounded font-extrabold">
                          CRITERIO {CRITERIOS_EVALUACION[selectedCriterion].num}
                        </span>
                        <h5 className="font-serif font-bold text-xs sm:text-sm text-slate-900">
                          {CRITERIOS_EVALUACION[selectedCriterion].nombre}
                        </h5>
                      </div>
                      <p className="text-slate-650 text-xs mb-2 text-justify">
                        {CRITERIOS_EVALUACION[selectedCriterion].descripcion}
                      </p>
                      <div className="bg-white border p-3 rounded-xl border-slate-150">
                        <span className="font-mono text-[8px] text-slate-400 uppercase tracking-widest font-bold block mb-1">
                          JUSTIFICACIÓN ACADÉMICA / ANÁLISIS DE LA CALIFICACIÓN:
                        </span>
                        <p className="text-slate-700 text-xs text-justify leading-relaxed">
                          {CRITERIOS_EVALUACION[selectedCriterion].justificacion}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-4 text-slate-400">
                      <HelpCircle className="w-8 h-8 text-slate-300 mb-1.5" />
                      <p className="text-xs">Haga clic sobre cualquier criterio de la matriz para desplegar el sustento analítico de los puntajes de cada alternativa.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* SECTION 3: JUSTIFICACIÓN ANALÍTICA DE LA SELECCIÓN */}
              <div className="space-y-4">
                <div>
                  <span className="font-mono text-[10px] text-indigo-600 uppercase tracking-wider font-extrabold block">
                    3. Sustento Cualitativo
                  </span>
                  <h4 className="font-serif text-xl font-bold text-slate-900">
                    Justificación Analítica de la Selección
                  </h4>
                </div>
                <p className="text-slate-650 text-xs sm:text-sm text-justify leading-relaxed">
                  El procesamiento matemático de las ponderaciones sitúa al <strong>Proyecto Alternativo N° 3 (Enfoque Híbrido Autohospedado)</strong> como la solución ganadora con una calificación de <strong>4.55 sobre 5.00 puntos</strong>. Las razones fundamentales para esta elección metodológica son:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                  <div className="border border-slate-200 bg-white p-5 rounded-2xl shadow-xxs hover:shadow-xs transition-shadow flex flex-col justify-between">
                    <div>
                      <div className="w-9 h-9 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-center text-amber-600 mb-3.5">
                        <Award className="w-5 h-5" />
                      </div>
                      <h5 className="font-serif font-extrabold text-sm text-slate-900 mb-2 leading-tight">
                        Equilibrio Analítico-Económico
                      </h5>
                      <p className="text-slate-650 text-[11px] leading-relaxed text-justify">
                        Aunque el Enfoque Cloud (Alt. 2) posee la máxima suficiencia predictiva nativa en la nube, es penalizado financieramente debido a los altos costos acumulativos y variables por el procesamiento masivo concurrente en nube pública comercial. La Alternativa 3 asegura una capacidad predictiva muy buena con un costo de infraestructura mensual tendiente a cero.
                      </p>
                    </div>
                    <div className="border-t border-slate-100 pt-3 mt-3">
                      <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                        TCO Mínimo de Hardware
                      </span>
                    </div>
                  </div>

                  <div className="border border-slate-200 bg-white p-5 rounded-2xl shadow-xxs hover:shadow-xs transition-shadow flex flex-col justify-between">
                    <div>
                      <div className="w-9 h-9 bg-indigo-50 rounded-xl border border-indigo-200 flex items-center justify-center text-indigo-600 mb-3.5">
                        <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                      </div>
                      <h5 className="font-serif font-extrabold text-sm text-slate-900 mb-2 leading-tight">
                        Soberanía de Datos Estudiantiles
                      </h5>
                      <p className="text-slate-650 text-[11px] leading-relaxed text-justify">
                        Al tratarse de información sensible sujeta a leyes estrictas de protección de datos personales (<strong>Ley N° 29733 de Perú</strong>), el almacenamiento resguardado localmente en servidores propios (Alt. 3) reduce drásticamente las brechas de exfiltración e interoperabilidad y evita auditar de forma compleja infraestructuras públicas administradas por terceros (Alt. 2).
                      </p>
                    </div>
                    <div className="border-t border-slate-100 pt-3 mt-3">
                      <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        Cumple Ley N° 29733
                      </span>
                    </div>
                  </div>

                  <div className="border border-emerald-250 bg-emerald-50/5 p-5 rounded-2xl shadow-xxs hover:shadow-xs transition-shadow flex flex-col justify-between">
                    <div>
                      <div className="w-9 h-9 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-center text-emerald-700 mb-3.5">
                        <Server className="w-5 h-5 text-emerald-600" />
                      </div>
                      <h5 className="font-serif font-extrabold text-sm text-slate-900 mb-2 leading-tight">
                        Facilidad de Implementación
                      </h5>
                      <p className="text-slate-700 text-[11px] leading-relaxed text-justify">
                        La orquestación ágil local mitiga la necesidad de mantener un equipo permanente y especializado de ingenieros MLOps, permitiendo que el área técnica interna de la institución administre de forma autónoma el ciclo de vida del software con lenguajes de mercado robustos y de curva corta (Python y Next.js).
                      </p>
                    </div>
                    <div className="border-t border-emerald-100 pt-3 mt-3">
                      <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        Docker & Python Locales
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 4: DEFINICIÓN DETALLADA DE LA SOLUCIÓN SELECCIONADA */}
              <div className="space-y-5 pt-2">
                <div>
                  <span className="font-mono text-[10px] text-indigo-600 uppercase tracking-wider font-extrabold block">
                    4. Arquitectura del Sistema Seleccionado (El Cómo)
                  </span>
                  <h4 className="font-serif text-xl font-bold text-slate-900">
                    Definición Detallada de la Solución Seleccionada
                  </h4>
                </div>
                <p className="text-slate-650 text-xs sm:text-sm text-justify leading-relaxed">
                  El <strong>Enfoque Híbrido Automatizado en Servidor Local Analítico</strong> se define operativamente a través de la integración sinérgica de los siguientes tres componentes de TI, los cuales responden de extremo a extremo al Objetivo Central del proyecto escolar:
                </p>

                {/* Sub-tab segment buttons for components */}
                <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-xl max-w-2xl border">
                  <button
                    onClick={() => setActiveCompDetail("comp1")}
                    className={`flex-1 min-w-[130px] px-3 py-2 text-xs font-mono font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                      activeCompDetail === "comp1"
                        ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Componente 1 (MD1)
                  </button>
                  <button
                    onClick={() => setActiveCompDetail("comp2")}
                    className={`flex-1 min-w-[130px] px-3 py-2 text-xs font-mono font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                      activeCompDetail === "comp2"
                        ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Componente 2 (MD3)
                  </button>
                  <button
                    onClick={() => setActiveCompDetail("comp3")}
                    className={`flex-1 min-w-[130px] px-3 py-2 text-xs font-mono font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                      activeCompDetail === "comp3"
                        ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Componente 3 (MD2)
                  </button>
                </div>

                {/* Component Details Card rendering */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xxs bg-white transition-all">
                  {activeCompDetail === "comp1" && (
                    <div className="p-6 sm:p-8 space-y-6 animate-fade-in">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b pb-4 border-slate-100">
                        <div>
                          <span className="font-mono text-[9px] text-emerald-800 bg-emerald-50 border px-2 py-0.5 rounded font-extrabold">
                            COMPONENTE 1: INFRAESTRUCTURA Y GESTIÓN INTEGRADA DE DATOS LOCALES (MD1)
                          </span>
                          <h5 className="font-serif font-black text-slate-950 text-base sm:text-lg mt-1.5">
                            Gestión Integrada de Datos Locales (MD1)
                          </h5>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black bg-slate-100 border px-3 py-1 rounded-full">
                          Cimiento de Datos
                        </span>
                      </div>

                      <div className="grid md:grid-cols-5 gap-6">
                        <div className="md:col-span-3 space-y-4">
                          <p className="text-slate-700 text-xs sm:text-sm leading-relaxed text-justify">
                            Este componente representa los cimientos del sistema inteligente. Se implementa un <strong>servidor virtual dedicado (VPS ejecutando WSL2)</strong> dentro de la infraestructura física del colegio, administrado de manera centralizada mediante la plataforma de orquestación Open Source <strong>Dokploy</strong>.
                          </p>
                          <p className="text-slate-700 text-xs sm:text-sm leading-relaxed text-justify">
                            Se configuran pipelines automatizados nocturnos (<strong>Cron jobs locales</strong>) encargados de realizar réplicas lógicas de las bases de datos de producción asociadas a los sistemas de notas académicos vigentes de la institución. Estas canalizaciones incluyen capas de limpieza automática, validación de esquemas y corrección sintáctica de registros nulos o inconsistentes en tiempo de ingesta, consolidando los datos conductuales y calificativos en una base de datos relacional PostgreSQL de réplica, altamente indexada y optimizada para la lectura analítica intensiva.
                          </p>
                        </div>

                        <div className="md:col-span-2 space-y-4">
                          <div className="border border-slate-150 p-4 rounded-xl bg-slate-50/55 space-y-3">
                            <h6 className="font-serif font-bold text-xs text-slate-900 border-b pb-1">
                              Stack Tecnológico Relacionado
                            </h6>
                            <div className="space-y-2 font-mono text-[10px]">
                              <div className="flex justify-between border-b border-dashed pb-1">
                                <span className="text-slate-500">Servidor:</span>
                                <span className="font-extrabold text-slate-800">VPS Virtual (WSL2)</span>
                              </div>
                              <div className="flex justify-between border-b border-dashed pb-1">
                                <span className="text-slate-500">Orquestador:</span>
                                <span className="font-extrabold text-slate-850">Dokploy (Open Source)</span>
                              </div>
                              <div className="flex justify-between border-b border-dashed pb-1">
                                <span className="text-slate-500">BD Analítica:</span>
                                <span className="font-extrabold text-slate-800">PostgreSQL Relacional</span>
                              </div>
                              <div className="flex justify-between border-b border-dashed pb-1">
                                <span className="text-slate-500">Programador:</span>
                                <span className="font-extrabold text-slate-800">Cron Jobs Locales (Linux)</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-emerald-50/35 border border-emerald-200 p-4 rounded-xl">
                            <span className="font-mono text-[9px] text-emerald-800 uppercase font-black block mb-1">
                              VALOR PARA EL PROYECTO
                            </span>
                            <p className="text-slate-700 text-[11px] leading-relaxed text-justify font-medium">
                              Garantiza la disponibilidad inmediata y a bajo costo de los datos unificados, eliminando latencias externas y asegurando la soberanía de los registros frente a nubes públicas.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeCompDetail === "comp2" && (
                    <div className="p-6 sm:p-8 space-y-6 animate-fade-in">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b pb-4 border-slate-100">
                        <div>
                          <span className="font-mono text-[9px] text-indigo-800 bg-indigo-50 border px-2 py-0.5 rounded font-extrabold">
                            COMPONENTE 2: NÚCLEO DE INTELIGENCIA ARTIFICIAL Y PROCESAMIENTO PREDICTIVO SEMANAL (MD3)
                          </span>
                          <h5 className="font-serif font-black text-slate-950 text-base sm:text-lg mt-1.5">
                            Cerebro de Inteligencia Artificial y Procesamiento Predictivo Semanal (MD3)
                          </h5>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black bg-slate-100 border px-3 py-1 rounded-full">
                          Cerebro Analítico
                        </span>
                      </div>

                      <div className="grid md:grid-cols-5 gap-6">
                        <div className="md:col-span-3 space-y-4">
                          <p className="text-slate-700 text-xs sm:text-sm leading-relaxed text-justify">
                            Constituye el cerebro analítico del proyecto de TI. En lugar de procesar estadísticas retrospectivas al final del ciclo o desplegar costosos endpoints distribuidos en tiempo real, se programa la ejecución automática y offline de scripts avanzados desarrollados en <strong>Python</strong> utilizando la librería científica <strong>Scikit-learn</strong>.
                          </p>
                          <p className="text-slate-700 text-xs sm:text-sm leading-relaxed text-justify">
                            Cada fin de semana, el sistema lee la base de datos de réplica centralizada, preprocesa las características conductuales (asistencias, clics de navegación, entregas) y entrena algoritmos avanzados de clasificación predictiva (como Random Forest o Gradient Boosting). Este pipeline calcula y actualiza un índice o score probabilístico de riesgo académico individualizado para cada alumno matriculado. El modelo se versiona y optimiza localmente, garantizando una alta precisión analítica preventiva sin incurrir en costos fijos recurrentes de cómputo externo.
                          </p>
                        </div>

                        <div className="md:col-span-2 space-y-4">
                          <div className="border border-slate-150 p-4 rounded-xl bg-slate-50/55 space-y-3">
                            <h6 className="font-serif font-bold text-xs text-slate-900 border-b pb-1">
                              Stack Tecnológico Relacionado
                            </h6>
                            <div className="space-y-2 font-mono text-[10px]">
                              <div className="flex justify-between border-b border-dashed pb-1">
                                <span className="text-slate-500">Lenguaje:</span>
                                <span className="font-extrabold text-slate-800">Python 3.10+</span>
                              </div>
                              <div className="flex justify-between border-b border-dashed pb-1">
                                <span className="text-slate-500">Librería Científica:</span>
                                <span className="font-extrabold text-slate-850">Scikit-learn / Pandas</span>
                              </div>
                              <div className="flex justify-between border-b border-dashed pb-1">
                                <span className="text-slate-500">Algoritmos:</span>
                                <span className="font-extrabold text-slate-800">Random Forest / Boosting</span>
                              </div>
                              <div className="flex justify-between border-b border-dashed pb-1">
                                <span className="text-slate-500">Frecuencia:</span>
                                <span className="font-extrabold text-slate-800">Semanal (Fines de semana)</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-indigo-50/30 border border-indigo-200 p-4 rounded-xl">
                            <span className="font-mono text-[9px] text-indigo-800 uppercase font-black block mb-1">
                              VENTAJA ECONÓMICA CLAVE
                            </span>
                            <p className="text-slate-700 text-[11px] leading-relaxed text-justify font-medium">
                              El entrenamiento y versión local del modelo garantizan una alta precisión analítica preventiva sin incurrir en costos fijos recurrentes de cómputo en la nube comercial.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeCompDetail === "comp3" && (
                    <div className="p-6 sm:p-8 space-y-6 animate-fade-in">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b pb-4 border-slate-100">
                        <div>
                          <span className="font-mono text-[9px] text-amber-800 bg-amber-50 border px-2 py-0.5 rounded font-extrabold">
                            COMPONENTE 3: PLATAFORMA WEB MODULAR ANALÍTICA Y NOTIFICACIONES DE ALERTA (MD2)
                          </span>
                          <h5 className="font-serif font-black text-slate-950 text-base sm:text-lg mt-1.5">
                            Plataforma Web Modular Analítica y Notificaciones de Alerta (MD2)
                          </h5>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black bg-slate-100 border px-3 py-1 rounded-full">
                          Capa de Interacción
                        </span>
                      </div>

                      <div className="grid md:grid-cols-5 gap-6">
                        <div className="md:col-span-3 space-y-4">
                          <p className="text-slate-700 text-xs sm:text-sm leading-relaxed text-justify">
                            Representa la capa de interacción y entrega de valor. Se desarrolla una plataforma web a medida e interactiva programada en el framework <strong>Next.js</strong>, desplegada localmente como un contenedor Docker aislado dentro del ecosistema Dokploy de la universidad.
                          </p>
                          <p className="text-slate-700 text-xs sm:text-sm leading-relaxed text-justify">
                            Esta interfaz consume de forma segura la base de datos PostgreSQL local para renderizar dashboards dinámicos y adaptativos dirigidos exclusivamente a los docentes y directivos académicos. El sistema expone gráficamente las proyecciones de rendimiento individualizadas, mapas de calor por asignaturas y desgloses de factores conductuales de riesgo.
                          </p>
                          <p className="text-slate-700 text-xs sm:text-sm leading-relaxed text-justify">
                            Complementariamente, se integra un servicio automatizado de backend que, ante la detección semanal de desviaciones críticas en los perfiles estudiantiles, genera y almacena hilos de alertas personalizadas en el panel docente, enviando de forma complementaria resúmenes diarios e informes automatizados directo a los entornos virtuales locales mediante endpoints API internos.
                          </p>
                        </div>

                        <div className="md:col-span-2 space-y-4">
                          <div className="border border-slate-150 p-4 rounded-xl bg-slate-50/55 space-y-3">
                            <h6 className="font-serif font-bold text-xs text-slate-900 border-b pb-1">
                              Stack Tecnológico Relacionado
                            </h6>
                            <div className="space-y-2 font-mono text-[10px]">
                              <div className="flex justify-between border-b border-dashed pb-1">
                                <span className="text-slate-500">Framework Web:</span>
                                <span className="font-extrabold text-slate-800">Next.js / React</span>
                              </div>
                              <div className="flex justify-between border-b border-dashed pb-1">
                                <span className="text-slate-500">Estilos:</span>
                                <span className="font-extrabold text-slate-850">Tailwind CSS</span>
                              </div>
                              <div className="flex justify-between border-b border-dashed pb-1">
                                <span className="text-slate-500">Contenedor:</span>
                                <span className="font-extrabold text-slate-800">Docker Aislado (Dokploy)</span>
                              </div>
                              <div className="flex justify-between border-b border-dashed pb-1">
                                <span className="text-slate-500">APIs / Alertas:</span>
                                <span className="font-extrabold text-slate-800">APIs de Resumen Internas</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-amber-50/35 border border-amber-200 p-4 rounded-xl">
                            <span className="font-mono text-[9px] text-amber-800 uppercase font-black block mb-1">
                              VALOR PARA LA TUTORÍA
                            </span>
                            <p className="text-slate-700 text-[11px] leading-relaxed text-justify font-medium">
                              Empodera directamente al docente tutor permitiendo un seguimiento visual ágil y preventivo, automatizando alertas que le ayudan a intervenir antes del cierre bimestral.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* TAB 4: MIGRATED DESIGN THINKING UX PORTFOLIO */}
          <div className={activeTab === "design-thinking" ? "max-w-5xl space-y-10 animate-fade-in" : "hidden"}>
            <div id="p04-design-thinking" className="space-y-10">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
                  Metodología Design Thinking — Portafolio de Empatía & co-Diseño UX
                </h3>
                <p className="text-slate-650 text-sm leading-relaxed text-justify font-medium">
                  En sintonía con las mejores prácticas en el desarrollo de software y gestión del alcance del proyecto, implementamos dinámicas ágiles y participativas con docentes y familias para estructurar el problema desde la vivencia del usuario final.
                </p>
              </div>

              {/* Design Thinking Steps Collapsible Menu */}
              <div className="space-y-6">
                {/* 1. EMPATIZAR */}
                <div className="bg-slate-100/50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xxs">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpandedDT(expandedDT === "empatia" ? null : "empatia")}>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                      Fase 1: Empatizar — Mapas de Empatía con Stakeholders
                    </h4>
                    <span className="font-mono text-xs text-slate-500">{expandedDT === "empatia" ? "Ocultar -" : "Mostrar +"}</span>
                  </div>
                  
                  {expandedDT === "empatia" && (
                    <div className="mt-4 pt-4 border-t border-slate-200 space-y-6">
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed text-justify">
                        Permitió diseccionar las percepciones silenciosas de los usuarios esenciales: qué piensan, qué dicen, qué sensaciones albergan y qué miedos experimentan frente a la deserción u ocultación del fracaso académico.
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Mapa de Empatía Docente */}
                        <div className="bg-white border hover:border-indigo-200 transition-all duration-300 rounded-3xl p-5 shadow-xs flex flex-col justify-between group">
                          <div>
                            <span className="bg-indigo-100 text-indigo-800 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                              Perfil Docente Tutor
                            </span>
                            <h5 className="font-serif font-bold text-slate-900 text-sm sm:text-base mb-3 mt-2.5 leading-snug">
                              Visualización: Mapa de Empatía del Docente
                            </h5>
                          </div>
                          <div 
                            onClick={() => { setLightboxIndex(0); setZoomLevel(1); }}
                            className="relative w-full bg-slate-50 rounded-2xl overflow-hidden border p-2 flex justify-center cursor-zoom-in group/img shadow-xxs hover:shadow-sm transition-all duration-300"
                          >
                            <img
                              src="/Mapa de empatia.png"
                              alt="Mapa de Empatía Docente"
                              referrerPolicy="no-referrer"
                              className="w-full h-80 sm:h-96 md:h-[450px] object-contain transition-all duration-500 group-hover/img:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-slate-950/0 group-hover/img:bg-slate-950/5 transition-all duration-300 flex items-center justify-center">
                              <div className="opacity-0 group-hover/img:opacity-100 bg-slate-900/80 text-white text-[11px] font-medium px-3.5 py-2 rounded-full backdrop-blur-xs flex items-center gap-1.5 shadow-md transform translate-y-2 group-hover/img:translate-y-0 transition-all duration-300">
                                <Maximize2 className="w-3.5 h-3.5" />
                                <span>Ver en Pantalla Completa</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Mapa de Empatía Padres */}
                        <div className="bg-white border hover:border-emerald-200 transition-all duration-300 rounded-3xl p-5 shadow-xs flex flex-col justify-between group">
                          <div>
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                              Perfil Familia (Apoderados)
                            </span>
                            <h5 className="font-serif font-bold text-slate-900 text-sm sm:text-base mb-3 mt-2.5 leading-snug">
                              Visualización: Mapa de Empatía de la Familia
                            </h5>
                          </div>
                          <div 
                            onClick={() => { setLightboxIndex(1); setZoomLevel(1); }}
                            className="relative w-full bg-slate-50 rounded-2xl overflow-hidden border p-2 flex justify-center cursor-zoom-in group/img shadow-xxs hover:shadow-sm transition-all duration-300"
                          >
                            <img
                              src="/Mapa de Empatia Padres.png"
                              alt="Mapa de Empatía Familia"
                              referrerPolicy="no-referrer"
                              className="w-full h-80 sm:h-96 md:h-[450px] object-contain transition-all duration-500 group-hover/img:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-slate-950/0 group-hover/img:bg-slate-950/5 transition-all duration-300 flex items-center justify-center">
                              <div className="opacity-0 group-hover/img:opacity-100 bg-slate-900/80 text-white text-[11px] font-medium px-3.5 py-2 rounded-full backdrop-blur-xs flex items-center gap-1.5 shadow-md transform translate-y-2 group-hover/img:translate-y-0 transition-all duration-300">
                                <Maximize2 className="w-3.5 h-3.5" />
                                <span>Ver en Pantalla Completa</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. DEFINICIÓN */}
                <div className="bg-slate-100/50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xxs">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpandedDT(expandedDT === "definir" ? null : "definir")}>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                      Fase 2: Definición — Fichas de Buyer Persona
                    </h4>
                    <span className="font-mono text-xs text-slate-500">{expandedDT === "definir" ? "Ocultar -" : "Mostrar +"}</span>
                  </div>

                  {expandedDT === "definir" && (
                    <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
                      <p className="text-slate-655 text-xs sm:text-sm leading-relaxed text-justify">
                        Modelado del arquetipo de usuario de nuestra solución escolar, permitiendo definir roles precisos que sustenten luego el desarrollo de nuestra especificación tecnológica del SIA-T.
                      </p>

                      <div className="bg-white border rounded-3xl p-5 shadow-xs flex justify-center">
                        <div className="w-full max-w-2xl text-center">
                          <span className="bg-blue-100 text-blue-800 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-2.5 inline-block">
                            Arquetipo Tutor Escolar
                          </span>
                          <h5 className="font-serif font-bold text-slate-900 text-sm sm:text-base mb-4 leading-snug">
                            Ficha de Personas: Luis Ramírez - Docente Tutor Coordinador
                          </h5>
                          <div 
                            onClick={() => { setLightboxIndex(2); setZoomLevel(1); }}
                            className="relative w-full bg-slate-50 rounded-2xl overflow-hidden border p-3 flex justify-center cursor-zoom-in group/img shadow-xxs hover:shadow-sm transition-all duration-300"
                          >
                            <img
                              src="/Buyer Persona Principal Docente.png"
                              alt="Luis Ramírez - Buyer Persona Docente"
                              referrerPolicy="no-referrer"
                              className="w-full h-80 sm:h-96 md:h-[500px] object-contain transition-all duration-500 group-hover/img:scale-[1.02]"
                            />
                            <div className="absolute inset-0 bg-slate-950/0 group-hover/img:bg-slate-950/5 transition-all duration-300 flex items-center justify-center">
                              <div className="opacity-0 group-hover/img:opacity-100 bg-slate-900/80 text-white text-[11px] font-medium px-3.5 py-2 rounded-full backdrop-blur-xs flex items-center gap-1.5 shadow-md transform translate-y-2 group-hover/img:translate-y-0 transition-all duration-300">
                                <Maximize2 className="w-3.5 h-3.5" />
                                <span>Ver en Pantalla Completa</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. IDEACIÓN */}
                <div className="bg-slate-100/50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xxs">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpandedDT(expandedDT === "idear" ? null : "idear")}>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                      Fase 3: Idear — Brainstorming de Afinidad & SCAMPER
                    </h4>
                    <span className="font-mono text-xs text-slate-500">{expandedDT === "idear" ? "Ocultar -" : "Mostrar +"}</span>
                  </div>

                  {expandedDT === "idear" && (
                    <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
                      <p className="text-slate-655 text-xs sm:text-sm leading-relaxed text-justify">
                        Dinámicas grupales creativas basadas en mapas de afinidad y diagramación del método SCAMPER para depurar las mejores propuestas y definir los límites del producto final (SIA-T).
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white border hover:border-slate-300 transition-all duration-300 rounded-3xl p-5 shadow-xs flex flex-col justify-between group">
                          <h5 className="font-serif font-bold text-slate-900 text-sm sm:text-base mb-3 leading-snug">
                            Diagrama de Afinidad / Brainstorming Cruzado
                          </h5>
                          <div 
                            onClick={() => { setLightboxIndex(3); setZoomLevel(1); }}
                            className="relative w-full bg-slate-50 rounded-2xl overflow-hidden border p-2 flex justify-center cursor-zoom-in group/img shadow-xxs hover:shadow-sm transition-all duration-300"
                          >
                            <img
                              src="/Diagrama de Afinidad.png"
                              alt="Brainstorming de Afinidad"
                              referrerPolicy="no-referrer"
                              className="w-full h-80 sm:h-96 md:h-[400px] object-contain transition-all duration-500 group-hover/img:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-slate-950/0 group-hover/img:bg-slate-950/5 transition-all duration-300 flex items-center justify-center">
                              <div className="opacity-0 group-hover/img:opacity-100 bg-slate-900/80 text-white text-[11px] font-medium px-3.5 py-2 rounded-full backdrop-blur-xs flex items-center gap-1.5 shadow-md transform translate-y-2 group-hover/img:translate-y-0 transition-all duration-300">
                                <Maximize2 className="w-3.5 h-3.5" />
                                <span>Ver en Pantalla Completa</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white border hover:border-slate-300 transition-all duration-300 rounded-3xl p-5 shadow-xs flex flex-col justify-between group">
                          <h5 className="font-serif font-bold text-slate-900 text-sm sm:text-base mb-3 leading-snug">
                            Matriz Creativa de Estimulación SCAMPER
                          </h5>
                          <div 
                            onClick={() => { setLightboxIndex(4); setZoomLevel(1); }}
                            className="relative w-full bg-slate-50 rounded-2xl overflow-hidden border p-2 flex justify-center cursor-zoom-in group/img shadow-xxs hover:shadow-sm transition-all duration-300"
                          >
                            <img
                              src="/SCAMPER.png"
                              alt="SCAMPER Loop"
                              referrerPolicy="no-referrer"
                              className="w-full h-80 sm:h-96 md:h-[400px] object-contain transition-all duration-500 group-hover/img:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-slate-950/0 group-hover/img:bg-slate-950/5 transition-all duration-300 flex items-center justify-center">
                              <div className="opacity-0 group-hover/img:opacity-100 bg-slate-900/80 text-white text-[11px] font-medium px-3.5 py-2 rounded-full backdrop-blur-xs flex items-center gap-1.5 shadow-md transform translate-y-2 group-hover/img:translate-y-0 transition-all duration-300">
                                <Maximize2 className="w-3.5 h-3.5" />
                                <span>Ver en Pantalla Completa</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. PROTOTIPAR */}
                <div className="bg-slate-100/50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xxs">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpandedDT(expandedDT === "prototipar" ? null : "prototipar")}>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                      Fase 4: Prototipar — Mockup del Dashboard SIA-T
                    </h4>
                    <span className="font-mono text-xs text-slate-500">{expandedDT === "prototipar" ? "Ocultar -" : "Mostrar +"}</span>
                  </div>

                  {expandedDT === "prototipar" && (
                    <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
                      <p className="text-slate-650 text-xs sm:text-sm leading-relaxed text-justify">
                        Mockups y diagramas de bento-grid interactivos orientados a la adopción docente rápida y visualización de semáforos de riesgo del promedio de asistencia escolar por grado.
                      </p>

                      <div className="bg-white border rounded-3xl p-5 shadow-xs flex justify-center">
                        <div className="w-full max-w-3xl text-center">
                          <span className="bg-[#e8f5f5] text-[#0d7377] text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-2.5 inline-block">
                            Dashboard UI Mockup
                          </span>
                          <h5 className="font-serif font-bold text-slate-900 text-sm sm:text-base mb-4 leading-snug">
                            Maqueta Digital de Interfaz para Monitoreo de Alertas Críticas
                          </h5>
                          <div 
                            onClick={() => { setLightboxIndex(5); setZoomLevel(1); }}
                            className="relative w-full bg-slate-50 rounded-2xl overflow-hidden border p-3 flex justify-center cursor-zoom-in group/img shadow-xxs hover:shadow-sm transition-all duration-300"
                          >
                            <img
                              src="/PROTOTIPO.jpeg"
                              alt="Mockup de Interfaz SIA-T"
                              referrerPolicy="no-referrer"
                              className="w-full h-80 sm:h-96 md:h-[500px] object-contain transition-all duration-500 group-hover/img:scale-[1.02]"
                            />
                            <div className="absolute inset-0 bg-slate-950/0 group-hover/img:bg-slate-950/5 transition-all duration-300 flex items-center justify-center">
                              <div className="opacity-0 group-hover/img:opacity-100 bg-slate-900/80 text-white text-[11px] font-medium px-3.5 py-2 rounded-full backdrop-blur-xs flex items-center gap-1.5 shadow-md transform translate-y-2 group-hover/img:translate-y-0 transition-all duration-300">
                                <Maximize2 className="w-3.5 h-3.5" />
                                <span>Ver en Pantalla Completa</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. EVALUAR */}
                <div className="bg-slate-100/50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xxs">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpandedDT(expandedDT === "evaluar" ? null : "evaluar")}>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                      Fase 5: Evaluar — Customer Journey & Estrella de Mar
                    </h4>
                    <span className="font-mono text-xs text-slate-500">{expandedDT === "evaluar" ? "Ocultar -" : "Mostrar +"}</span>
                  </div>

                  {expandedDT === "evaluar" && (
                    <div className="mt-4 pt-4 border-t border-slate-200 space-y-6">
                      <p className="text-slate-655 text-xs sm:text-sm leading-relaxed text-justify">
                        Evaluación sistémica de la experiencia del docente dentro del flujo habitual y recopilación del feedback interactivo mediante retrospectivas retrospectivas formales.
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white border hover:border-slate-300 transition-all duration-300 rounded-3xl p-5 shadow-xs flex flex-col justify-between group">
                          <h5 className="font-serif font-bold text-slate-900 text-sm sm:text-base mb-3 leading-snug">
                            Customer Journey Map del Docente Tutor
                          </h5>
                          <div 
                            onClick={() => { setLightboxIndex(6); setZoomLevel(1); }}
                            className="relative w-full bg-slate-50 rounded-2xl overflow-hidden border p-2 flex justify-center cursor-zoom-in group/img shadow-xxs hover:shadow-sm transition-all duration-300"
                          >
                            <img
                              src="/Customer Journey Docente.png"
                              alt="Customer Journey del docente escolar"
                              referrerPolicy="no-referrer"
                              className="w-full h-80 sm:h-96 md:h-[400px] object-contain transition-all duration-500 group-hover/img:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-slate-950/0 group-hover/img:bg-slate-950/5 transition-all duration-300 flex items-center justify-center">
                              <div className="opacity-0 group-hover/img:opacity-100 bg-slate-900/80 text-white text-[11px] font-medium px-3.5 py-2 rounded-full backdrop-blur-xs flex items-center gap-1.5 shadow-md transform translate-y-2 group-hover/img:translate-y-0 transition-all duration-300">
                                <Maximize2 className="w-3.5 h-3.5" />
                                <span>Ver en Pantalla Completa</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white border hover:border-slate-300 transition-all duration-300 rounded-3xl p-5 shadow-xs flex flex-col justify-between group">
                          <h5 className="font-serif font-bold text-slate-900 text-sm sm:text-base mb-3 leading-snug">
                            Taller de Diagnóstico Retrospectivo Estrella de Mar
                          </h5>
                          <div 
                            onClick={() => { setLightboxIndex(7); setZoomLevel(1); }}
                            className="relative w-full bg-slate-50 rounded-2xl overflow-hidden border p-2 flex justify-center cursor-zoom-in group/img shadow-xxs hover:shadow-sm transition-all duration-300"
                          >
                            <img
                              src="/ESTRELLA DE MAR.png"
                              alt="Diagrama Estrella de Mar"
                              referrerPolicy="no-referrer"
                              className="w-full h-80 sm:h-96 md:h-[400px] object-contain transition-all duration-500 group-hover/img:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-slate-950/0 group-hover/img:bg-slate-950/5 transition-all duration-300 flex items-center justify-center">
                              <div className="opacity-0 group-hover/img:opacity-100 bg-slate-900/80 text-white text-[11px] font-medium px-3.5 py-2 rounded-full backdrop-blur-xs flex items-center gap-1.5 shadow-md transform translate-y-2 group-hover/img:translate-y-0 transition-all duration-300">
                                <Maximize2 className="w-3.5 h-3.5" />
                                <span>Ver en Pantalla Completa</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX / VISUALIZADOR INTERACTIVO PREMIUM */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex flex-col justify-between bg-slate-950/95 backdrop-blur-md p-4 text-white select-none transition-all duration-300"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Header Controls */}
          <div className="flex justify-between items-center w-full max-w-7xl mx-auto py-2 z-10" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col pr-4">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold">
                {designThinkingImages[lightboxIndex].phase}
              </span>
              <h3 className="text-xs sm:text-base font-serif font-bold text-white tracking-wide">
                {designThinkingImages[lightboxIndex].alt}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Zoom controls */}
              <button 
                onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 3.5))}
                className="p-2 sm:p-2.5 bg-slate-850 hover:bg-slate-700 active:bg-slate-600 rounded-full transition-all duration-200 border border-slate-700 flex items-center justify-center cursor-pointer text-slate-200"
                title="Acercar (+)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.5))}
                className="p-2 sm:p-2.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 rounded-full transition-all duration-200 border border-slate-700 flex items-center justify-center cursor-pointer text-slate-200"
                title="Alejar (-)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setZoomLevel(1)}
                className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 rounded-full text-[10px] font-mono font-bold transition-all duration-200 border border-slate-700 flex items-center justify-center cursor-pointer text-slate-200"
                title="Restablecer Escala"
              >
                1:1
              </button>
              <button 
                onClick={() => setLightboxIndex(null)}
                className="p-2 sm:p-2.5 bg-rose-950/60 hover:bg-rose-900/85 active:bg-rose-800 rounded-full transition-all duration-200 border border-rose-800 flex items-center justify-center cursor-pointer text-rose-200 sm:ml-2"
                title="Cerrar (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Container */}
          <div className="relative flex-1 flex items-center justify-center max-w-7xl mx-auto w-full group overflow-hidden">
            {/* Navigation - Prev */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : designThinkingImages.length - 1));
                setZoomLevel(1);
              }}
              className="absolute left-2 sm:left-4 z-10 p-3 sm:p-4 bg-slate-900/70 hover:bg-slate-800 border border-slate-700/80 hover:scale-105 active:scale-95 rounded-full text-slate-200 transition-all duration-200 flex items-center justify-center cursor-pointer shadow-lg"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Styled Image wrap */}
            <div 
              className={`relative max-h-[75vh] max-w-[90vw] overflow-hidden flex items-center justify-center p-2 select-none ${
                zoomLevel > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
              }`}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img 
                src={designThinkingImages[lightboxIndex].src}
                alt={designThinkingImages[lightboxIndex].alt}
                referrerPolicy="no-referrer"
                style={{ 
                  transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})` 
                }}
                className={`max-h-[72vh] max-w-full object-contain shadow-2xl rounded-lg border border-slate-800 origin-center select-none ${
                  isDragging ? '' : 'transition-transform duration-200'
                }`}
              />
            </div>

            {/* Navigation - Next */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev !== null && prev < designThinkingImages.length - 1 ? prev + 1 : 0));
                setZoomLevel(1);
              }}
              className="absolute right-2 sm:right-4 z-10 p-3 sm:p-4 bg-slate-900/70 hover:bg-slate-800 border border-slate-700/80 hover:scale-105 active:scale-95 rounded-full text-slate-200 transition-all duration-200 flex items-center justify-center cursor-pointer shadow-lg"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Footer Navigation and Count Indicator */}
          <div className="flex flex-col items-center gap-2 w-full py-2 z-10 bg-slate-950/60 border-t border-slate-900" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-1.5">
              {designThinkingImages.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => { setLightboxIndex(idx); setZoomLevel(1); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${lightboxIndex === idx ? 'bg-blue-500 w-5' : 'bg-slate-700 hover:bg-slate-500'}`}
                />
              ))}
            </div>
            <p className="text-[10px] sm:text-xs font-mono text-slate-500 mt-0.5">
              Imagen <span className="text-slate-300 font-bold">{lightboxIndex + 1}</span> de <span className="text-slate-400 font-bold">{designThinkingImages.length}</span> · Use flechas del teclado <span className="text-slate-400 font-mono">← / →</span> para navegar
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
