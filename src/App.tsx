/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Portada from "./components/Portada";
import Abstract from "./components/Abstract";
import ChapterIntro from "./components/ChapterIntro";
import Introduccion from "./components/Introduccion";
import StakeholderAnalysis from "./components/StakeholderAnalysis";
import ProblemaAnalysis from "./components/ProblemaAnalysis";
import ObjetivoAnalysis from "./components/ObjetivoAnalysis";
import AlternativesAnalysis from "./components/AlternativesAnalysis";
import RequisitosAnalysis from "./components/RequisitosAnalysis";
import ScheduleBaseline from "./components/ScheduleBaseline";
import CostBaseline from "./components/CostBaseline";
import VideoPresentation from "./components/VideoPresentation";
import ReferenciasBiblio from "./components/ReferenciasBiblio";
import { TOC_SECTIONS } from "./data";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for tracking active sections & applying fade effects
  useEffect(() => {
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    TOC_SECTIONS.forEach(({ href }) => {
      const el = document.getElementById(href.replace("#", ""));
      if (el) {
        activeObserver.observe(el);
        fadeObserver.observe(el);
      }
    });

    return () => {
      activeObserver.disconnect();
      fadeObserver.disconnect();
    };
  }, []);

  const handleStartProject = () => {
    const el = document.getElementById("problema");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 relative antialiased">
      {/* Real-time scroll indicator */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-1 transition-all duration-100 ease-out"
        style={{
          width: `${scrollProgress}%`,
          background: "linear-gradient(90deg, #0d7377, #1e3a8a)",
        }}
      />

      {/* Header bar */}
      <Header onOpenSidebar={() => setSidebarOpen(true)} />

      <div className="flex pt-14">
        {/* Navigation Sidebar Drawer */}
        <Sidebar
          activeSection={activeSection}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Core Layout Content */}
        <main className="flex-1 lg:ml-64 min-w-0 transition-all duration-200">
          
          {/* Main Cover Section */}
          <Portada onStartClick={handleStartProject} />

          {/* Research Summary Abstract */}
          <Abstract />

          {/* CHAPTER 00 — INTRODUCCIÓN */}
          <ChapterIntro
            num="00"
            title="Introducción al Diagnóstico"
            subtitle="Análisis de motivación académica, perfil del IEP Peruano Francés, organigrama estratégico y propuesta de valor del sistema inteligente."
            subheading="Capítulo 00 · Introducción"
          />
          <Introduccion />

          {/* CHAPTER 01 — ANÁLISIS DE STAKEHOLDERS */}
          <ChapterIntro
            id="inicio"
            num="01"
            title="Análisis de Stakeholders"
            subtitle="Identificación y priorización de interesados institucionales utilizando las matrices de poder e interés recomendadas por el PMBOK 6."
            subheading="Capítulo 01 · Proceso de Inicio"
            inputs={[
              "Caso de negocio (Business Model Canvas)",
              "Factores ambientales de la empresa",
              "Activos de los procesos de la organización",
              "Planificación del proyecto escolar",
            ]}
            tools={[
              "Lluvia de ideas",
              "Entrevista semi-estructurada",
              "Análisis de interesados (Poder e Interés)",
              "Juicio de expertos escolares",
            ]}
            outputs={[
              "Registro de interesados de la IEP",
              "Estrategia de comunicación y plan de involucramiento",
              "Sintonización de expectativas iniciales",
            ]}
          />
          <StakeholderAnalysis />

          {/* CHAPTER 02 — ANÁLISIS DEL PROBLEMA */}
          <ChapterIntro
            num="02"
            title="Análisis del Problema"
            subtitle="Evaluación lógica de la brecha mediante la recopilación de datos primarios en encuestas y el desarrollo de talleres adaptativos con design thinking."
            subheading="Capítulo 02 · Diagnóstico Crítico"
            inputs={[
              "Percepciones docentes",
              "Fórmulas físicas de reportes escolares",
              "Registros tradicionales de auxilio",
            ]}
            tools={[
              "Marco Lógico (Árbol de problemas)",
              "Encuestas diagnósticas digitales (Forms)",
              "Design Thinking (Empatizar, Definir, Idear, Prototipar, Evaluar)",
            ]}
            outputs={[
              "Enunciado formal del problema central",
              "Foco y específico de causas deterministas",
              "Métricas cuantitativas del cuello de botella",
            ]}
          />
          <ProblemaAnalysis />

          {/* CHAPTER 03 — ANÁLISIS DEL OBJETIVO */}
          <ChapterIntro
            num="03"
            title="Análisis del Objetivo"
            subtitle="Inversión lógica para formular las metas instrumentales preventivas, estructurar el árbol de medios y fines, y validar con el criterio SMART."
            subheading="Capítulo 03 · Metas y Cierre"
            inputs={[
              "Enunciado del problema de riesgo",
              "Árbol de problemas causa-efecto",
              "Análisis de factibilidad técnica",
            ]}
            tools={[
              "Árbol de objetivos instrumentales (Marco Lógico)",
              "Cribado y sintonización de metas SMART",
              "Mapeo de objetivos específicos",
            ]}
            outputs={[
              "Objetivo SMART oficial centralizado",
              "Objetivos específicos funcionales (Medios directos)",
              "Impacto y fin último del software de tutoría",
            ]}
          />
          <ObjetivoAnalysis />

          {/* CHAPTER 04 — ANÁLISIS DE ALTERNATIVA DE SOLUCIÓN */}
          <ChapterIntro
            num="04"
            title="Análisis de Alternativa de Solución"
            subtitle="Agrupamiento de acciones complementarias para definir alternativas tecnológicas integrales viables e implantación del portafolio UX mediante la metodología Design Thinking."
            subheading="Capítulo 04 · Soluciones Viables"
            inputs={[
              "Árbol de Objetivos Fines/Medios (Cap. 03)",
              "Metodologías ágiles participativas",
              "Investigación de soluciones tecnológicas homólogas",
            ]}
            tools={[
              "Matriz de mutua exclusión de acciones",
              "Evaluación cualitativa de suficiencia de la alternativa",
              "Taller Design Thinking (Fases 1 a 5 relocalizado)",
            ]}
            outputs={[
              "Fórmula teórica ajustada del modelo analítico",
              "Mockups y Prototipos de bento-grid de experiencia",
              "Selección de la alternativa idónea recomendada",
            ]}
          />
          <AlternativesAnalysis />

          {/* CHAPTER 05 — LÍNEA BASE DEL ALCANCE DEL PROYECTO */}
          <ChapterIntro
            num="05"
            title="Línea Base del Alcance del Proyecto"
            subtitle="Planificación del alcance, matriz de trazabilidad RTM de 20 requisitos de software y estructuración jerárquica mediante la EDT y su Diccionario técnico."
            subheading="Capítulo 05 · Alcance Completo"
            inputs={[
              "Alternativa recomendada (Software SIA-T)",
              "Registros tradicionales de la mesa de asistencia",
              "Plataforma Cubicol de notas e incidencias",
            ]}
            tools={[
              "Especificación de requisitos de software (IEEE 830)",
              "Requirements Traceability Matrix (RTM)",
              "Desglose jerárquico del Proyecto (EDT / WBS)",
            ]}
            outputs={[
              "Matriz interactiva de requisitos (Acceso Google Drive)",
              "Diagrama interactivo de EDT del Sistema ML",
              "Diccionario de la EDT completo (18 paquetes de trabajo)",
            ]}
          />
          <RequisitosAnalysis />

          {/* CHAPTER 06 — LÍNEA BASE DEL CRONOGRAMA DEL PROYECTO */}
          <ChapterIntro
            num="06"
            title="Línea Base del Cronograma del Proyecto"
            subtitle="Planificación del tiempo de ejecución estructurada en 6 Sprints ágiles, estimación estadística por valores PERT, secuenciación lógica y control del desempeño por Valor Ganado."
            subheading="Capítulo 06 · Control de Plazos"
            inputs={[
              "Diccionario de la EDT del Software SIA-T (Cap. 05)",
              "Metodología Agile SCRUM y estimaciones técnicas",
              "Parámetros de tolerancia institucionales de la IEP",
            ]}
            tools={[
              "Estimación PERT por Tres Valores (Optimista, Probable, Pesimista)",
              "Diagramación de Red por Precedencia (Método PDM)",
              "Análisis de Valor Ganado (Earned Value Analysis - EVA)",
            ]}
            outputs={[
              "Plan de Gestión del Cronograma base y reservas de contingencia",
              "Lista de 40 actividades acopladas por Sprints",
              "Ruta crítica e indicadores de desviación con plan de respuestas",
            ]}
          />
          <ScheduleBaseline />

          {/* CHAPTER 07 — LÍNEA BASE DE COSTOS DEL PROYECTO */}
          <ChapterIntro
            num="07"
            title="Línea Base de Costos del Proyecto"
            subtitle="Planificación financiera, estimaciones de costos por categoría y método PERT para paquetes de alto riesgo, agregación de costos de Línea Base y distribución temporal mediante la Curva S."
            subheading="Capítulo 07 · Línea Base de Costos"
            inputs={[
              "Diccionario de la EDT del Software SIA-T (Cap. 05)",
              "Cronograma SCRUM de 6 meses (Cap. 06)",
              "Tarifas de mercado laboral TI de Lima 2026",
            ]}
            tools={[
              "Estimación Ascendente (Bottom-Up)",
              "Estimación PERT por Tres Valores (Alto Riesgo)",
              "Análisis de reserva (Contingencia y Gestión)",
              "Curva S acumulativa por Sprints",
            ]}
            outputs={[
              "Plan de Gestión Financiera y métricas",
              "Estimación granular de costos por categoría",
              "Línea Base de Costos v2 (S/. 59,859.17) y Presupuesto Total",
            ]}
          />
          <CostBaseline />

          {/* CHAPTER 08 — VIDEO DE PRESENTACIÓN DE LA SOLUCIÓN */}
          <ChapterIntro
            num="08"
            title="Video de Presentación de la Solución"
            subtitle="Sustentación oficial en video de la propuesta estratégica SIA-T, incluyendo el reto académico, justificación, demostración en vivo del prototipo y próximos pasos de adopción."
            subheading="Capítulo 08 · Video de Presentación"
            inputs={[
              "Propuesta técnica de los Capítulos 01 al 05",
              "Planificaciones y Líneas Base de los Capítulos 06 y 07",
              "Prototipo web funcional de SIA-T (Sustentación)",
            ]}
            tools={[
              "Pitch de impacto y comunicación estratégica",
              "Audio Cast inteligente multirrol de NotebookLM",
              "Sincronización de diapositivas en tiempo real",
              "Buscador predictivo de la transcripción oficial",
            ]}
            outputs={[
              "Video interactivo oficial de la solución SIA-T",
              "Guion y transcripción oficial del pitch alineada",
              "Hoja de ruta pedagógica de adopción e impacto",
            ]}
          />
          <VideoPresentation />

          {/* SYSTEM BIBLIOGRAPHY */}
          <ReferenciasBiblio />

          {/* Persistent global footer */}
          <footer className="bg-slate-900 py-8 text-center text-slate-400 text-xs border-t border-slate-800">
            <p className="font-mono">
              © 2026 · Sistema ML Alerta Temprana del Bajo Rendimiento Académico · IEP Peruano Francés · UNTELS · ISR0832
            </p>
          </footer>

        </main>
      </div>
    </div>
  );
}
