/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import {
  Calendar,
  Clock,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Search,
  Filter,
  Maximize2,
  X,
  FileText,
  HelpCircle,
  Activity,
  Layers,
  ArrowRightCircle,
  TrendingDown,
  RefreshCw,
  Check,
  ZoomIn,
  ZoomOut
} from "lucide-react";
import Cite from "./Cite";

interface ActivityItem {
  id: string;
  paquete: string;
  descripcion: string;
  responsable: string;
  semana: string;
  prioridad: "Alta" | "Media" | "Baja";
  sprint: number;
  to: number;
  tm: number;
  tp: number;
  te: number;
  sigma: number;
  sigmaSq: number;
  isCritical: boolean;
  isNew: boolean;
}

const ACTIVIDADES_DATA: ActivityItem[] = [
  // S1
  { id: "A-0.1.1.1", paquete: "1.1.1", descripcion: "Reunión de levantamiento con directivos, coordinadores y área de TI para validar el alcance del sistema y acceso a datos académicos", responsable: "Equipo + Directivos", semana: "S1", prioridad: "Alta", sprint: 1, to: 2, tm: 3, tp: 5, te: 3.2, sigma: 0.50, sigmaSq: 0.25, isCritical: false, isNew: true },
  { id: "A-0.1.1.2", paquete: "1.1.1", descripcion: "Análisis de calidad y disponibilidad de datos académicos existentes en los sistemas del colegio", responsable: "TI + Equipo ML", semana: "S2", prioridad: "Alta", sprint: 1, to: 3, tm: 5, tp: 8, te: 5.2, sigma: 0.83, sigmaSq: 0.69, isCritical: false, isNew: true },
  { id: "A-0.1.1.3", paquete: "1.1.1", descripcion: "Definición y validación con docentes de las variables académicas que predicen el riesgo de bajo rendimiento", responsable: "ML + Docentes", semana: "S3", prioridad: "Alta", sprint: 1, to: 2, tm: 4, tp: 6, te: 4.0, sigma: 0.67, sigmaSq: 0.44, isCritical: false, isNew: true },
  { id: "A-0.1.1.4", paquete: "1.1.1", descripcion: "Diseño de la arquitectura completa del sistema: módulos, integraciones, flujo de datos y tecnologías", responsable: "TI + ML", semana: "S4", prioridad: "Alta", sprint: 1, to: 3, tm: 5, tp: 7, te: 5.0, sigma: 0.67, sigmaSq: 0.44, isCritical: false, isNew: true },
  // S2
  { id: "A-1.1.1.1", paquete: "1.1.1", descripcion: "Elaborar cronograma de hitos del proyecto (Gantt SCRUM)", responsable: "Equipo", semana: "S5", prioridad: "Alta", sprint: 2, to: 2, tm: 3, tp: 5, te: 3.2, sigma: 0.50, sigmaSq: 0.25, isCritical: false, isNew: false },
  { id: "A-1.1.1.2", paquete: "1.1.1", descripcion: "Definir Product Backlog y priorizar historias de usuario", responsable: "Equipo", semana: "S5", prioridad: "Alta", sprint: 2, to: 2, tm: 3, tp: 4, te: 3.0, sigma: 0.33, sigmaSq: 0.11, isCritical: false, isNew: false },
  { id: "A-1.1.1.3", paquete: "1.1.1", descripcion: "Asignar roles SCRUM: Product Owner, Scrum Master, Dev Team", responsable: "Equipo", semana: "S5", prioridad: "Alta", sprint: 2, to: 1, tm: 1, tp: 2, te: 1.2, sigma: 0.17, sigmaSq: 0.03, isCritical: false, isNew: false },
  { id: "A-1.2.1.1", paquete: "1.2.1", descripcion: "Establecer plantilla de informe de avance semanal", responsable: "Scrum Master", semana: "S5", prioridad: "Media", sprint: 2, to: 1, tm: 1, tp: 2, te: 1.2, sigma: 0.17, sigmaSq: 0.03, isCritical: false, isNew: false },
  { id: "A-1.2.1.2", paquete: "1.2.1", descripcion: "Daily Standup 15 min diarios — continuo todo el proyecto", responsable: "Scrum Master", semana: "S5–S24", prioridad: "Alta", sprint: 2, to: 1, tm: 1, tp: 2, te: 1.2, sigma: 0.17, sigmaSq: 0.03, isCritical: false, isNew: false },
  { id: "A-2.1.1.1", paquete: "2.1.1", descripcion: "Levantar y mapear fuentes de datos académicos (asistencia, notas, participación, incidencias)", responsable: "Área de TI", semana: "S6", prioridad: "Alta", sprint: 2, to: 3, tm: 4, tp: 6, te: 4.2, sigma: 0.50, sigmaSq: 0.25, isCritical: true, isNew: false },
  { id: "A-2.1.1.2", paquete: "2.1.1", descripcion: "Diseñar modelo entidad-relación de la BD centralizada (PostgreSQL)", responsable: "Área de TI", semana: "S6", prioridad: "Alta", sprint: 2, to: 2, tm: 3, tp: 5, te: 3.2, sigma: 0.50, sigmaSq: 0.25, isCritical: true, isNew: false },
  { id: "A-2.1.1.3", paquete: "2.1.1", descripcion: "Codificar scripts ETL de extracción, transformación y carga", responsable: "Área de TI", semana: "S7", prioridad: "Alta", sprint: 2, to: 4, tm: 5, tp: 8, te: 5.3, sigma: 0.67, sigmaSq: 0.44, isCritical: true, isNew: false },
  { id: "A-2.1.1.4", paquete: "2.1.1", descripcion: "Ejecutar prueba de migración de datos y validar integridad", responsable: "Área de TI", semana: "S7", prioridad: "Alta", sprint: 2, to: 2, tm: 3, tp: 5, te: 3.2, sigma: 0.50, sigmaSq: 0.25, isCritical: true, isNew: false },
  { id: "A-2.2.1.1", paquete: "2.2.1", descripcion: "Configurar Cron jobs nocturnos de limpieza y validación de datos", responsable: "Área de TI", semana: "S8", prioridad: "Alta", sprint: 2, to: 3, tm: 4, tp: 6, te: 4.2, sigma: 0.50, sigmaSq: 0.25, isCritical: true, isNew: false },
  { id: "A-2.2.1.2", paquete: "2.2.1", descripcion: "Verificar consistencia de datos y corrección de registros erróneos", responsable: "Área de TI", semana: "S8", prioridad: "Media", sprint: 2, to: 2, tm: 3, tp: 4, te: 3.0, sigma: 0.33, sigmaSq: 0.11, isCritical: false, isNew: false },
  // S3
  { id: "A-3.1.1.1", paquete: "3.1.1", descripcion: "Análisis exploratorio del dataset académico (EDA)", responsable: "Equipo ML", semana: "S9", prioridad: "Alta", sprint: 3, to: 3, tm: 4, tp: 6, te: 4.2, sigma: 0.50, sigmaSq: 0.25, isCritical: true, isNew: false },
  { id: "A-3.1.1.2", paquete: "3.1.1", descripcion: "Preprocesar y normalizar variables académicas para el modelo", responsable: "Equipo ML", semana: "S9", prioridad: "Alta", sprint: 3, to: 2, tm: 3, tp: 5, te: 3.2, sigma: 0.50, sigmaSq: 0.25, isCritical: false, isNew: false },
  { id: "A-3.1.1.3", paquete: "3.1.1", descripcion: "Seleccionar algoritmo ML (Random Forest / Gradient Boosting / Regresión logística)", responsable: "Equipo ML", semana: "S10", prioridad: "Alta", sprint: 3, to: 2, tm: 3, tp: 5, te: 3.2, sigma: 0.50, sigmaSq: 0.25, isCritical: true, isNew: false },
  { id: "A-3.1.1.4", paquete: "3.1.1", descripcion: "Entrenar modelo predictivo con Scikit-learn usando datos históricos", responsable: "Equipo ML", semana: "S10", prioridad: "Alta", sprint: 3, to: 3, tm: 5, tp: 8, te: 5.2, sigma: 0.83, sigmaSq: 0.69, isCritical: true, isNew: false },
  { id: "A-3.2.1.1", paquete: "3.2.1", descripcion: "Evaluar métricas del modelo (accuracy, precision, recall, F1-score)", responsable: "Equipo ML", semana: "S11", prioridad: "Alta", sprint: 3, to: 2, tm: 3, tp: 5, te: 3.2, sigma: 0.50, sigmaSq: 0.25, isCritical: true, isNew: false },
  { id: "A-3.2.1.2", paquete: "3.2.1", descripcion: "Ajustar hiperparámetros hasta alcanzar precisión mínima del 75%", responsable: "Equipo ML", semana: "S11", prioridad: "Alta", sprint: 3, to: 2, tm: 4, tp: 6, te: 4.0, sigma: 0.67, sigmaSq: 0.44, isCritical: true, isNew: false },
  { id: "A-3.2.1.3", paquete: "3.2.1", descripcion: "Implementar lógica de clasificación: riesgo alto (rojo), medio (amarillo), bajo (verde)", responsable: "Equipo ML", semana: "S11", prioridad: "Alta", sprint: 3, to: 2, tm: 3, tp: 4, te: 3.0, sigma: 0.33, sigmaSq: 0.11, isCritical: true, isNew: false },
  { id: "A-3.2.1.4", paquete: "3.2.1", descripcion: "Configurar script de actualización semanal automática del modelo", responsable: "Equipo ML", semana: "S12", prioridad: "Media", sprint: 3, to: 2, tm: 3, tp: 5, te: 3.2, sigma: 0.50, sigmaSq: 0.25, isCritical: false, isNew: false },
  // S4
  { id: "A-4.1.1.1", paquete: "4.1.1", descripcion: "Diseñar plantilla de correo de alerta para el docente tutor", responsable: "Área de TI", semana: "S13", prioridad: "Alta", sprint: 4, to: 1, tm: 2, tp: 3, te: 2.0, sigma: 0.33, sigmaSq: 0.11, isCritical: false, isNew: false },
  { id: "A-4.1.1.2", paquete: "4.1.1", descripcion: "Desarrollar módulo de envío automático de alertas por correo institucional", responsable: "Área de TI", semana: "S13", prioridad: "Alta", sprint: 4, to: 3, tm: 4, tp: 6, te: 4.2, sigma: 0.50, sigmaSq: 0.25, isCritical: false, isNew: false },
  { id: "A-4.1.1.3", paquete: "4.1.1", descripcion: "Desarrollar módulo web de alertas críticas en panel del docente", responsable: "Área de TI", semana: "S14", prioridad: "Alta", sprint: 4, to: 3, tm: 4, tp: 6, te: 4.2, sigma: 0.50, sigmaSq: 0.25, isCritical: false, isNew: false },
  { id: "A-4.1.1.4", paquete: "4.1.1", descripcion: "Implementar módulo de registro de seguimiento de casos críticos", responsable: "Área de TI", semana: "S14", prioridad: "Media", sprint: 4, to: 2, tm: 3, tp: 4, te: 3.0, sigma: 0.33, sigmaSq: 0.11, isCritical: false, isNew: false },
  { id: "A-4.2.1.1", paquete: "4.2.1", descripcion: "Diseñar wireframes y prototipo de la interfaz Next.js", responsable: "Área de TI", semana: "S15", prioridad: "Alta", sprint: 4, to: 2, tm: 3, tp: 5, te: 3.2, sigma: 0.50, sigmaSq: 0.25, isCritical: true, isNew: false },
  { id: "A-4.2.1.2", paquete: "4.2.1", descripcion: "Desarrollar dashboard interactivo con semáforo de riesgo por alumno, aula y grado", responsable: "Área de TI", semana: "S15", prioridad: "Alta", sprint: 4, to: 4, tm: 5, tp: 8, te: 5.3, sigma: 0.67, sigmaSq: 0.44, isCritical: true, isNew: false },
  { id: "A-4.2.1.3", paquete: "4.2.1", descripcion: "Desarrollar ficha individual del estudiante con historial completo", responsable: "Área de TI", semana: "S16", prioridad: "Media", sprint: 4, to: 2, tm: 3, tp: 5, te: 3.2, sigma: 0.50, sigmaSq: 0.25, isCritical: true, isNew: false },
  { id: "A-4.2.1.4", paquete: "4.2.1", descripcion: "Implementar módulo de roles y control de acceso por perfil de usuario", responsable: "Área de TI", semana: "S16", prioridad: "Alta", sprint: 4, to: 2, tm: 3, tp: 4, te: 3.0, sigma: 0.33, sigmaSq: 0.11, isCritical: true, isNew: false },
  { id: "A-4.2.1.5", paquete: "4.2.1", descripcion: "Desarrollar módulo de reportes exportables en PDF y Excel por unidad evaluativa", responsable: "Área de TI", semana: "S16", prioridad: "Media", sprint: 4, to: 2, tm: 3, tp: 5, te: 3.2, sigma: 0.50, sigmaSq: 0.25, isCritical: true, isNew: false },
  // S5
  { id: "A-5.0.1.1", paquete: "6.1.1", descripcion: "Pruebas de integración entre todos los módulos del sistema: verificar ETL, ML, alertas y dashboard funcionan en conjunto", responsable: "Área de TI", semana: "S17", prioridad: "Alta", sprint: 5, to: 3, tm: 5, tp: 8, te: 5.2, sigma: 0.83, sigmaSq: 0.69, isCritical: true, isNew: true },
  { id: "A-5.0.1.2", paquete: "6.1.1", descripcion: "Pruebas de rendimiento del sistema: confirmar dashboard carga en menos de 3 segundos y clasificación ML en tiempo real", responsable: "Área de TI", semana: "S17", prioridad: "Alta", sprint: 5, to: 2, tm: 4, tp: 6, te: 4.0, sigma: 0.67, sigmaSq: 0.44, isCritical: true, isNew: true },
  { id: "A-5.0.2.1", paquete: "6.2.1", descripcion: "Prueba piloto real con grupo de 3 docentes tutores usando datos académicos reales del colegio durante 2 semanas", responsable: "Equipo + Docentes", semana: "S18–S19", prioridad: "Alta", sprint: 5, to: 5, tm: 7, tp: 10, te: 7.2, sigma: 0.83, sigmaSq: 0.69, isCritical: true, isNew: true },
  { id: "A-5.0.2.2", paquete: "6.2.1", descripcion: "Recopilar feedback del piloto, documentar observaciones y aplicar ajustes al sistema basados en uso real", responsable: "Equipo + Docentes", semana: "S20", prioridad: "Alta", sprint: 5, to: 3, tm: 4, tp: 6, te: 4.2, sigma: 0.50, sigmaSq: 0.25, isCritical: true, isNew: true },
  // S6
  { id: "A-5.1.1.1", paquete: "5.1.1", descripcion: "Configurar servidor VPS con Dokploy para despliegue definitivo del sistema", responsable: "Área de TI", semana: "S21", prioridad: "Alta", sprint: 6, to: 2, tm: 3, tp: 4, te: 3.0, sigma: 0.33, sigmaSq: 0.11, isCritical: false, isNew: false },
  { id: "A-5.1.1.2", paquete: "5.1.1", descripcion: "Desplegar sistema completo en entorno de producción definitivo", responsable: "Área de TI", semana: "S21", prioridad: "Alta", sprint: 6, to: 3, tm: 4, tp: 6, te: 4.2, sigma: 0.50, sigmaSq: 0.25, isCritical: true, isNew: false },
  { id: "A-5.1.1.3", paquete: "5.1.1", descripcion: "Ejecutar pruebas de aceptación UAT formales con todos los docentes tutores", responsable: "Equipo + Docentes", semana: "S22", prioridad: "Alta", sprint: 6, to: 4, tm: 5, tp: 7, te: 5.2, sigma: 0.50, sigmaSq: 0.25, isCritical: true, isNew: false },
  { id: "A-5.1.1.4", paquete: "5.1.1", descripcion: "Corregir observaciones y bugs detectados en pruebas UAT formales", responsable: "Área de TI", semana: "S22", prioridad: "Alta", sprint: 6, to: 2, tm: 3, tp: 5, te: 3.2, sigma: 0.50, sigmaSq: 0.25, isCritical: true, isNew: false },
  { id: "A-5.2.1.1", paquete: "5.2.1", descripcion: "Elaborar manual de usuario (docentes y coordinadores)", responsable: "Equipo", semana: "S23", prioridad: "Media", sprint: 6, to: 2, tm: 3, tp: 4, te: 3.0, sigma: 0.33, sigmaSq: 0.11, isCritical: false, isNew: false },
  { id: "A-5.2.1.2", paquete: "5.2.1", descripcion: "Elaborar manual técnico del sistema para área de TI", responsable: "Área de TI", semana: "S23", prioridad: "Media", sprint: 6, to: 2, tm: 3, tp: 4, te: 3.0, sigma: 0.33, sigmaSq: 0.11, isCritical: false, isNew: false },
  { id: "A-5.2.1.3", paquete: "5.2.1", descripcion: "Ejecutar sesión formal de capacitación a todos los docentes y coordinadores (2 horas)", responsable: "Coord. Académico", semana: "S23", prioridad: "Alta", sprint: 6, to: 1, tm: 2, tp: 3, te: 2.0, sigma: 0.33, sigmaSq: 0.11, isCritical: true, isNew: false },
  { id: "A-5.2.1.4", paquete: "5.2.1", descripcion: "Realizar retrospectiva final del proyecto SCRUM", responsable: "Scrum Master", semana: "S24", prioridad: "Media", sprint: 6, to: 1, tm: 1, tp: 2, te: 1.2, sigma: 0.17, sigmaSq: 0.03, isCritical: true, isNew: false },
  { id: "A-5.2.1.5", paquete: "5.2.1", descripcion: "Elaborar informe final del proyecto y presentación de cierre ante el docente del curso", responsable: "Equipo", semana: "S24", prioridad: "Alta", sprint: 6, to: 3, tm: 4, tp: 6, te: 4.2, sigma: 0.50, sigmaSq: 0.25, isCritical: true, isNew: false }
];

interface MSProjectTask {
  id: number;
  nombre: string;
  duracion: string;
  comienzo: string;
  fin: string;
  predecesoras: string;
  recursos: string;
  sprint: number;
  isSummary?: boolean;
}

const MSPROJECT_TASKS: MSProjectTask[] = [
  { id: 1, nombre: "Sistema ML - Alerta Temprana (Proyecto Completo)", duracion: "125.13 días", comienzo: "lun 3/08/26", fin: "lun 25/01/27", predecesoras: "", recursos: "", sprint: 0, isSummary: true },
  { id: 2, nombre: "Sprint de Configuración y Datos Iniciales (Fase Preliminar)", duracion: "20.13 días", comienzo: "lun 3/08/26", fin: "lun 31/08/26", predecesoras: "", recursos: "", sprint: 1, isSummary: true },
  { id: 3, nombre: "Levantamiento de información con directivos y coordinadores", duracion: "3 días", comienzo: "lun 3/08/26", fin: "mié 5/08/26", predecesoras: "", recursos: "Equipo + Directivos", sprint: 1 },
  { id: 4, nombre: "Análisis de calidad y disponibilidad de datos académicos", duracion: "5 días", comienzo: "lun 10/08/26", fin: "vie 14/08/26", predecesoras: "3", recursos: "TI + Equipo ML", sprint: 1 },
  { id: 5, nombre: "Definición y validación de variables predictoras clave", duracion: "4 días", comienzo: "lun 17/08/26", fin: "jue 20/08/26", predecesoras: "4", recursos: "ML + Docentes", sprint: 1 },
  { id: 6, nombre: "Diseño detallado de arquitectura de integración", duracion: "5 días", comienzo: "lun 24/08/26", fin: "vie 28/08/26", predecesoras: "5", recursos: "TI + ML", sprint: 1 },
  { id: 7, nombre: "Hito: Arquitectura y variables validadas", duracion: "0 días", comienzo: "vie 28/08/26", fin: "vie 28/08/26", predecesoras: "6", recursos: "", sprint: 1 },
  { id: 8, nombre: "Cierre de fase preliminar y preparación de Sprints", duracion: "1.13 días", comienzo: "vie 28/08/26", fin: "lun 31/08/26", predecesoras: "7", recursos: "", sprint: 1 },
  { id: 9, nombre: "Sprints de Desarrollo de Software e Implantación (Fase Central)", duracion: "105 días", comienzo: "lun 31/08/26", fin: "vie 22/01/27", predecesoras: "", recursos: "", sprint: 2, isSummary: true },
  { id: 10, nombre: "Planificación de Sprint 2 (Establecer hito de Gantt)", duracion: "3 días", comienzo: "lun 31/08/26", fin: "mié 2/09/26", predecesoras: "8", recursos: "Equipo", sprint: 2 },
  { id: 11, nombre: "Definición detallada de Historias de Usuario (Backlog)", duracion: "3 días", comienzo: "mié 2/09/26", fin: "vie 4/09/26", predecesoras: "10", recursos: "Equipo", sprint: 2 },
  { id: 12, nombre: "Asignación formal de roles ágiles (SM, PO, Dev)", duracion: "1 día", comienzo: "mié 2/09/26", fin: "mié 2/09/26", predecesoras: "11CC", recursos: "Equipo", sprint: 2 },
  { id: 13, nombre: "Definición del plan de informes de avance semanal", duracion: "1 día", comienzo: "vie 4/09/26", fin: "vie 4/09/26", predecesoras: "11", recursos: "Scrum Master", sprint: 2 },
  { id: 14, nombre: "Ejecución continua de Daily Standups (20 mins)", duracion: "105 días", comienzo: "lun 31/08/26", fin: "vie 22/01/27", predecesoras: "13CC", recursos: "Scrum Master", sprint: 2 },
  { id: 15, nombre: "Mapeo detallado de fuentes de datos académicos en IEP", duracion: "4 días", comienzo: "lun 7/09/26", fin: "jue 10/09/26", predecesoras: "13", recursos: "Área de TI", sprint: 2 },
  { id: 16, nombre: "Modelado físico de la Base de Datos centralizada", duracion: "3 días", comienzo: "jue 10/09/26", fin: "lun 14/09/26", predecesoras: "15", recursos: "Área de TI", sprint: 2 },
  { id: 17, nombre: "Desarrollo y codificación de scripts ETL iniciales", duracion: "5 días", comienzo: "lun 14/09/26", fin: "vie 18/09/26", predecesoras: "16", recursos: "Área de TI", sprint: 2 },
  { id: 18, nombre: "Ejecución y pruebas de migración de carga histórica", duracion: "3 días", comienzo: "vie 18/09/26", fin: "mar 22/09/26", predecesoras: "17", recursos: "Área de TI", sprint: 2 },
  { id: 19, nombre: "Implementación de tareas cron de saneamiento", duracion: "4 días", comienzo: "lun 21/09/26", fin: "jue 24/09/26", predecesoras: "18", recursos: "Área de TI", sprint: 2 },
  { id: 20, nombre: "Validación de consistencia e integridad de datos", duracion: "3 días", comienzo: "jue 24/09/26", fin: "lun 28/09/26", predecesoras: "19", recursos: "Área de TI", sprint: 2 },
  { id: 21, nombre: "Hito: Base de datos centralizada operativa", duracion: "0 días", comienzo: "vie 25/09/26", fin: "vie 25/09/26", predecesoras: "20", recursos: "", sprint: 2 },
  { id: 22, nombre: "Cierre de Sprint 2 y Sprint Review (Demostración de ETL)", duracion: "1.13 días", comienzo: "vie 25/09/26", fin: "lun 28/09/26", predecesoras: "21", recursos: "", sprint: 2 },
  { id: 23, nombre: "Sprint 3: Desarrollo de Modelo Predictivo ML (Fase Central)", duracion: "20.13 días", comienzo: "lun 28/09/26", fin: "lun 26/10/26", predecesoras: "", recursos: "", sprint: 3, isSummary: true },
  { id: 24, nombre: "Análisis exploratorio estadístico de datos migrados (EDA)", duracion: "4 días", comienzo: "lun 28/09/26", fin: "jue 1/10/26", predecesoras: "22", recursos: "Equipo ML", sprint: 3 },
  { id: 25, nombre: "Limpieza profunda y normalización de variables", duracion: "3 días", comienzo: "jue 1/10/26", fin: "lun 5/10/26", predecesoras: "24", recursos: "Equipo ML", sprint: 3 },
  { id: 26, nombre: "Selección preliminar de algoritmos candidatos ML", duracion: "3 días", comienzo: "lun 5/10/26", fin: "mié 7/10/26", predecesoras: "25", recursos: "Equipo ML", sprint: 3 },
  { id: 27, nombre: "Entrenamiento inicial del modelo predictivo (Scikit-Learn)", duracion: "5 días", comienzo: "mié 7/10/26", fin: "mar 13/10/26", predecesoras: "26", recursos: "Equipo ML", sprint: 3 },
  { id: 28, nombre: "Evaluación exhaustiva de métricas del modelo (F1-Score)", duracion: "3 días", comienzo: "lun 12/10/26", fin: "mié 14/10/26", predecesoras: "27", recursos: "Equipo ML", sprint: 3 },
  { id: 29, nombre: "Ajuste de hiperparámetros y optimización", duracion: "4 días", comienzo: "mié 14/10/26", fin: "lun 19/10/26", predecesoras: "28", recursos: "Equipo ML", sprint: 3 },
  { id: 30, nombre: "Codificación de la lógica de semaforización de riesgo", duracion: "3 días", comienzo: "lun 19/10/26", fin: "mié 21/10/26", predecesoras: "29", recursos: "Equipo ML", sprint: 3 },
  { id: 31, nombre: "Scripting para el reentrenamiento automatizado semanal", duracion: "3 días", comienzo: "lun 19/10/26", fin: "mié 21/10/26", predecesoras: "30", recursos: "Equipo ML", sprint: 3 },
  { id: 32, nombre: "Hito: Modelo predictivo ML validado (>75% precisión)", duracion: "0 días", comienzo: "mié 21/10/26", fin: "mié 21/10/26", predecesoras: "31", recursos: "", sprint: 3 },
  { id: 33, nombre: "Cierre de Sprint 3 y Sprint Review de Inteligencia", duracion: "1.13 días", comienzo: "vie 23/10/26", fin: "lun 26/10/26", predecesoras: "32", recursos: "", sprint: 3 },
  { id: 34, nombre: "Sprint 4: Módulo de Alertas y Portal Web (Fase Central)", duracion: "22 días", comienzo: "lun 26/10/26", fin: "mar 24/11/26", predecesoras: "", recursos: "", sprint: 4, isSummary: true },
  { id: 35, nombre: "Diseño de la plantilla y formato de correo electrónico de alerta", duracion: "2 días", comienzo: "lun 26/10/26", fin: "mar 27/10/26", predecesoras: "33", recursos: "Área de TI", sprint: 4 },
  { id: 36, nombre: "Desarrollo del motor de alertas automáticas vía SMTP", duracion: "4 días", comienzo: "mar 27/10/26", fin: "vie 30/10/26", predecesoras: "35", recursos: "Área de TI", sprint: 4 },
  { id: 37, nombre: "Creación de bandeja de entrada de alertas en portal docente", duracion: "4 días", comienzo: "lun 2/11/26", fin: "jue 5/11/26", predecesoras: "36", recursos: "Área de TI", sprint: 4 },
  { id: 38, nombre: "Módulo de registro para seguimiento de casos críticos", duracion: "3 días", comienzo: "jue 5/11/26", fin: "lun 9/11/26", predecesoras: "37", recursos: "Área de TI", sprint: 4 },
  { id: 39, nombre: "Maquetación de la interfaz web en Next.js (Wireframes)", duracion: "3 días", comienzo: "lun 9/11/26", fin: "mié 11/11/26", predecesoras: "38", recursos: "Área de TI", sprint: 4 },
  { id: 40, nombre: "Desarrollo del Dashboard de semáforo interactivo", duracion: "5 días", comienzo: "mié 11/11/26", fin: "mar 17/11/26", predecesoras: "39", recursos: "Área de TI", sprint: 4 },
  { id: 41, nombre: "Desarrollo de la ficha individual de perfil del estudiante", duracion: "3 días", comienzo: "lun 16/11/26", fin: "mié 18/11/26", predecesoras: "40", recursos: "Área de TI", sprint: 4 },
  { id: 42, nombre: "Módulo de gestión de roles y permisos de acceso (Auth)", duracion: "3 días", comienzo: "mié 18/11/26", fin: "vie 20/11/26", predecesoras: "41", recursos: "Área de TI", sprint: 4 },
  { id: 43, nombre: "Exportación de reportes académicos en formato PDF/Excel", duracion: "3 días", comienzo: "vie 20/11/26", fin: "mar 24/11/26", predecesoras: "42", recursos: "Área de TI", sprint: 4 },
  { id: 44, nombre: "Hito: Portal docente e integración de alertas culminado", duracion: "0 días", comienzo: "vie 20/11/26", fin: "vie 20/11/26", predecesoras: "43", recursos: "", sprint: 4 },
  { id: 45, nombre: "Cierre de Sprint 4 y Sprint Review (Software Integrado)", duracion: "1 día", comienzo: "vie 20/11/26", fin: "vie 20/11/26", predecesoras: "44", recursos: "", sprint: 4 },
  { id: 46, nombre: "Sprint 5: Control de Calidad y Piloto de 2 Semanas (NUEVO)", duracion: "20.13 días", comienzo: "lun 23/11/26", fin: "lun 21/12/26", predecesoras: "", recursos: "", sprint: 5, isSummary: true },
  { id: 47, nombre: "Pruebas integrales de flujo completo (ETL -> ML -> Alerta)", duracion: "5 días", comienzo: "lun 23/11/26", fin: "vie 27/11/26", predecesoras: "45", recursos: "Área de TI", sprint: 5 },
  { id: 48, nombre: "Pruebas de estrés y tiempos de carga de la base de datos", duracion: "4 días", comienzo: "lun 23/11/26", fin: "jue 26/11/26", predecesoras: "47CC", recursos: "Área de TI", sprint: 5 },
  { id: 49, nombre: "Preparación de datos reales y enrolamiento de docentes tutores", duracion: "7 días", comienzo: "lun 30/11/26", fin: "mar 8/12/26", predecesoras: "48", recursos: "Equipo + Docentes", sprint: 5 },
  { id: 50, nombre: "Ejecución formal de prueba piloto en aulas seleccionadas", duracion: "4 días", comienzo: "lun 14/12/26", fin: "jue 17/12/26", predecesoras: "49", recursos: "Equipo + Docentes", sprint: 5 },
  { id: 51, nombre: "Hito: Piloto docente culminado exitosamente", duracion: "0 días", comienzo: "jue 17/12/26", fin: "jue 17/12/26", predecesoras: "50", recursos: "", sprint: 5 },
  { id: 52, nombre: "Cierre de Sprint 5 y Análisis de Feedback de Usuario", duracion: "1.13 días", comienzo: "vie 18/12/26", fin: "lun 21/12/26", predecesoras: "51", recursos: "", sprint: 5 },
  { id: 53, nombre: "Sprint 6: Despliegue, Capacitación y Cierre Formal del Proyecto", duracion: "25.13 días", comienzo: "lun 21/12/26", fin: "lun 25/01/27", predecesoras: "", recursos: "", sprint: 6, isSummary: true },
  { id: 54, nombre: "Aprovisionamiento y configuración de servidor Dokploy VPS", duracion: "3 días", comienzo: "lun 21/12/26", fin: "mié 23/12/26", predecesoras: "52", recursos: "Área de TI", sprint: 6 },
  { id: 55, nombre: "Despliegue definitivo en entorno de producción", duracion: "9 días", comienzo: "mié 23/12/26", fin: "lun 4/01/27", predecesoras: "54", recursos: "Área de TI", sprint: 6 },
  { id: 56, nombre: "Pruebas formales de aceptación de usuario final (UAT)", duracion: "5 días", comienzo: "lun 4/01/27", fin: "vie 8/01/27", predecesoras: "55", recursos: "Equipo + Docentes", sprint: 6 },
  { id: 57, nombre: "Atención inmediata y corrección de bugs reportados en UAT", duracion: "3 días", comienzo: "lun 4/01/27", fin: "mié 6/01/27", predecesoras: "56CC", recursos: "Área de TI", sprint: 6 },
  { id: 58, nombre: "Redacción final del Manual de Usuario interactivo", duracion: "3 días", comienzo: "lun 11/01/27", fin: "mié 13/01/27", predecesoras: "57", recursos: "Equipo", sprint: 6 },
  { id: 59, nombre: "Redacción final del Dossier Técnico de arquitectura para TI", duracion: "3 días", comienzo: "lun 11/01/27", fin: "mié 13/01/27", predecesoras: "58CC", recursos: "Área de TI", sprint: 6 },
  { id: 60, nombre: "Taller formal de capacitación a docentes y coordinadores", duracion: "2 días", comienzo: "mié 13/01/27", fin: "jue 14/01/27", predecesoras: "58", recursos: "Coord. Académico", sprint: 6 },
  { id: 61, nombre: "Ejecución de la sesión de retrospectiva de cierre SCRUM", duracion: "1 día", comienzo: "lun 18/01/27", fin: "lun 18/01/27", predecesoras: "60", recursos: "Scrum Master", sprint: 6 },
  { id: 62, nombre: "Redacción final del informe técnico de cierre de proyecto", duracion: "4 días", comienzo: "lun 18/01/27", fin: "jue 21/01/27", predecesoras: "61", recursos: "Equipo", sprint: 6 },
  { id: 63, nombre: "Hito: Acta de cierre firmada y proyecto entregado", duracion: "0 días", comienzo: "jue 21/01/27", fin: "jue 21/01/27", predecesoras: "62", recursos: "", sprint: 6 },
  { id: 64, nombre: "Cierre definitivo administrativo de recursos del proyecto", duracion: "1.13 días", comienzo: "vie 22/01/27", fin: "lun 25/01/27", predecesoras: "63", recursos: "", sprint: 6 }
];

export default function ScheduleBaseline() {
  const [actSearch, setActSearch] = useState("");
  const [selectedSprint, setSelectedSprint] = useState<string>("Todos");
  const [selectedResp, setSelectedResp] = useState<string>("Todos");
  const [activePertEq, setActivePertEq] = useState<string | null>("A-0.1.1.1");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // MS Project state variables
  const [mspSearch, setMspSearch] = useState("");
  const [mspSprint, setMspSprint] = useState<string>("Todos");
  const [mspShowOnlySummary, setMspShowOnlySummary] = useState<boolean>(false);

  const openLightbox = (index: number) => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const images = [
    {
      src: "/DIAGRAMA DE GANT.png",
      alt: "Diagrama de Red del Cronograma - Método PDM (Colegio PF 2026)",
      caption: "Representación interactiva de las precedencias lógicas (Método de Diagramación por Precedencia - PDM) y la ruta crítica definida para las 40 actividades del proyecto en las 24 semanas."
    },
    {
      src: "/project.jpeg",
      alt: "Diagrama de Gantt del Cronograma - Planificación de 6 Meses",
      caption: "Línea temporal oficial estructurada en 6 Sprints de 4 semanas cada uno, mapeando las ventanas de desarrollo de modelos ML, módulos de alertas, periodo piloto docente formal y hitos de Sprint Review."
    }
  ];

  // Unique lists for filtering
  const responsabilidades = useMemo(() => {
    const list = new Set(ACTIVIDADES_DATA.map((a) => a.responsable));
    return ["Todos", ...Array.from(list)];
  }, []);

  // Filtered activities
  const filteredActivities = useMemo(() => {
    return ACTIVIDADES_DATA.filter((act) => {
      const matchSearch =
        act.descripcion.toLowerCase().includes(actSearch.toLowerCase()) ||
        act.id.toLowerCase().includes(actSearch.toLowerCase()) ||
        act.paquete.toLowerCase().includes(actSearch.toLowerCase());
      const matchSprint = selectedSprint === "Todos" ? true : act.sprint === parseInt(selectedSprint);
      const matchResp = selectedResp === "Todos" ? true : act.responsable === selectedResp;
      return matchSearch && matchSprint && matchResp;
    });
  }, [actSearch, selectedSprint, selectedResp]);

  // Filtered MS Project Tasks
  const filteredMspTasks = useMemo(() => {
    return MSPROJECT_TASKS.filter((task) => {
      const matchSearch =
        task.nombre.toLowerCase().includes(mspSearch.toLowerCase()) ||
        task.recursos.toLowerCase().includes(mspSearch.toLowerCase()) ||
        task.id.toString() === mspSearch.trim();
      const matchSprint = mspSprint === "Todos" ? true : task.sprint === parseInt(mspSprint);
      const matchSummaryOnly = mspShowOnlySummary ? task.isSummary === true : true;
      return matchSearch && matchSprint && matchSummaryOnly;
    });
  }, [mspSearch, mspSprint, mspShowOnlySummary]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 1));
  };

  const handleZoomReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;
    e.preventDefault();
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || zoom <= 1) return;
    const touch = e.touches[0];
    setPan({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y,
    });
  };

  return (
    <div className="animate-fade-in text-slate-800">
      {/* ── SECCIÓN DE INTRODUCCIÓN ── */}
      <section id="p06-cronograma" className="py-12 bg-white border-b border-slate-200">
        <div className="px-6 sm:px-10 lg:px-12">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2">
            06 · Línea Base del Cronograma del Proyecto · PMBOK 6
          </span>
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Línea Base del Cronograma del Proyecto
            </h2>
            <span className="inline-flex items-center gap-1.5 self-start md:self-auto bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1 rounded-full text-xs font-mono font-bold shadow-xxs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Planificación en Microsoft Project
            </span>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed max-w-4xl text-justify mb-10">
            La gestión del cronograma es uno de los dominios de desempeño más críticos según el estándar del PMBOK <Cite r="PMI, 2017" />. Consiste en establecer las políticas, procedimientos y herramientas necesarios para planificar, desarrollar, monitorear y controlar el tiempo requerido. Esta versión ampliada a <strong>6 meses (24 semanas)</strong> organiza las <strong>40 actividades</strong> del sistema escolar en <strong>6 Sprints ágiles SCRUM</strong>, garantizando una validación oportuna del modelo, robustez en el piloto y sostenibilidad de la implantación en la institución educativa.
          </p>

          <div className="space-y-16 max-w-5xl">
            
            {/* ── PASO 1: PLAN DE GESTIÓN DEL CRONOGRAMA ── */}
            <div className="space-y-6 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="bg-slate-900 text-white font-mono text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">1</span>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Plan de Gestión del Cronograma
                </h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed text-justify">
                Planificar la gestión del cronograma establece los procedimientos y la documentación necesarios para liderar y controlar el tiempo de ejecución. El beneficio fundamental es guiar la gestión del cronograma durante todo el ciclo de vida del proyecto, administrando de forma adaptativa y con control de desvíos las contingencias y solicitudes de cambio registradas.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <h4 className="font-serif text-base font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    Marco Operativo y Parámetros Generales
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                      <span className="font-mono text-[9px] uppercase font-black text-indigo-700 block mb-1">Precisión de Estimaciones</span>
                      <p className="text-slate-700 leading-normal">
                        <strong>Unidad de Medida:</strong> Días hábiles de lunes a viernes (jornada laboral estándar de 8 horas). <br />
                        <strong>Técnica:</strong> Estimaciones por tres valores (Método PERT) para mitigar sesgos y robustecer las duraciones.
                      </p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                      <span className="font-mono text-[9px] uppercase font-black text-indigo-700 block mb-1">Reserva para Contingencias</span>
                      <p className="text-slate-700 leading-normal">
                        <strong>Contingencia por Sprint:</strong> 10% (2 días hábiles por sprint de 4 semanas). <br />
                        <strong>Reserva de Gestión:</strong> 1 semana adicional al final del Sprint 6 como colchón estratégico de cierre.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm border border-slate-800 flex flex-col justify-between h-full">
                    <div>
                      <span className="font-mono text-[9px] text-teal-400 uppercase font-black tracking-wider block mb-1">Ficha del Cronograma</span>
                      <h4 className="font-serif text-sm font-black text-white mb-3">Información General</h4>
                      <div className="space-y-2 font-mono text-[10px] text-slate-300">
                        <div className="flex justify-between border-b border-slate-800 pb-1.5">
                          <span className="text-slate-400">Proyecto:</span>
                          <span className="font-extrabold text-white text-right">Sistema ML — Alerta Temprana</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-1.5">
                          <span className="text-slate-400">Institución:</span>
                          <span className="font-extrabold text-white text-right">Colegio Peruano Francés</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-1.5">
                          <span className="text-slate-400">Metodología:</span>
                          <span className="font-extrabold text-white text-right">Agile SCRUM (6 Sprints)</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-1.5">
                          <span className="text-slate-400">Duración total:</span>
                          <span className="font-extrabold text-white">24 sem (Agosto 2026 – Enero 2027)</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-1.5">
                          <span className="text-slate-400">Total Actividades:</span>
                          <span className="font-extrabold text-white">40 (32 orig + 8 nuevas)</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-1.5">
                          <span className="text-slate-400">BAC del proyecto:</span>
                          <span className="font-extrabold text-teal-300">159.2 días hábiles</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-1.5">
                          <span className="text-slate-400">Desviación (σ):</span>
                          <span className="font-extrabold text-white">±2.1 días hábiles</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-1.5">
                          <span className="text-slate-400">Scrum Master:</span>
                          <span className="font-extrabold text-white text-right">Equipo UNTELS — ISR0832</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-1.5">
                          <span className="text-slate-400">Product Owner:</span>
                          <span className="font-extrabold text-white text-right">Coordinación académica</span>
                        </div>
                        <div className="flex justify-between pb-1">
                          <span className="text-slate-400">Versión:</span>
                          <span className="font-extrabold text-teal-300">2.0 — Ampliada a 6 meses</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-800 border border-slate-700 text-teal-200 p-2 rounded-lg text-[9px] mt-3 flex items-center gap-2 font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                      <span>Línea Base ampliada v2.0</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* REGLAS Y TOLERANCIAS */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                <div className="bg-slate-50 border-b px-5 py-3.5 flex items-center justify-between">
                  <h4 className="font-serif text-xs sm:text-sm font-bold text-slate-900">
                    Reglas de Monitoreo y Tolerancias
                  </h4>
                  <span className="font-mono text-[9px] uppercase font-black bg-indigo-50 text-indigo-700 border px-2 py-0.5 rounded-full">
                    Estándar PMBOK
                  </span>
                </div>
                <div className="p-5 grid sm:grid-cols-3 gap-6 text-xs text-justify">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-bold text-slate-950">
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                      Tolerancia de Desvíos
                    </div>
                    <p className="text-slate-650 leading-relaxed text-[11px]">
                      <strong>Por Actividad:</strong> ±2 días hábiles permitidos sin requerir acción correctiva. <br />
                      <strong>Por Sprint:</strong> ±3 días hábiles. Superado este límite, se activa el plan de respuesta inmediata. <br />
                      <strong>Por Proyecto:</strong> Desviación máxima permitida de ±1.5 semanas sobre las 24 planificadas.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-bold text-slate-950">
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                      Porcentaje de Avance (Reglas)
                    </div>
                    <p className="text-slate-650 leading-relaxed text-[11px]">
                      <strong>Regla 0/100:</strong> Aplicada a tareas cortas de 1 a 2 días hábiles (solo se acredita 100% al completarse). <br />
                      <strong>Regla 50/50:</strong> Aplicada a tareas de más de 3 días (50% al iniciar y el 50% restante al aprobar el entregable formal).
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-bold text-slate-950">
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                      Reporte de Avances (EVA)
                    </div>
                    <p className="text-slate-650 leading-relaxed text-[11px]">
                      <strong>Método de Control:</strong> Análisis del Valor Ganado (EVA) al cierre de cada Sprint Review. <br />
                      <strong>Métricas Clave:</strong> PV (Planificado), EV (Ganado), SV (Variación) y el Índice de Desempeño del Cronograma (SPI).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── PASO 2: DEFINIR LAS ACTIVIDADES (40) ── */}
            <div id="p06-lista-actividades" className="space-y-6 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="bg-slate-900 text-white font-mono text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">2</span>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Lista de Actividades del Proyecto (40 Actividades)
                </h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed text-justify">
                De acuerdo al Diccionario de la EDT ampliado, se han desagregado las actividades necesarias para construir el sistema inteligente en 6 Sprints. Se incluyen las actividades de la fase preliminar (Sprint 1) y de la prueba piloto real con docentes y recolección de retroalimentación (Sprint 5) agregando un total de 40 actividades formales.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between border-b pb-4 border-slate-200">
                  <span className="text-xs font-mono font-bold text-slate-500">
                    Filtros de Búsqueda Dinámicos
                  </span>
                  <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    {/* Search bar */}
                    <div className="relative flex-1 sm:flex-initial">
                      <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Buscar actividad..."
                        value={actSearch}
                        onChange={(e) => setActSearch(e.target.value)}
                        className="pl-8 pr-3 py-1.5 w-full sm:w-56 text-xs border rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 border-slate-200"
                      />
                    </div>
                    {/* Sprint filter */}
                    <select
                      value={selectedSprint}
                      onChange={(e) => setSelectedSprint(e.target.value)}
                      className="border text-xs rounded-lg px-2 py-1.5 bg-white focus:outline-none border-slate-200 font-medium"
                    >
                      <option value="Todos">Todos los Sprints</option>
                      <option value="1">Sprint 1 (Análisis)</option>
                      <option value="2">Sprint 2 (Datos)</option>
                      <option value="3">Sprint 3 (Modelo ML)</option>
                      <option value="4">Sprint 4 (Alertas & Web)</option>
                      <option value="5">Sprint 5 (Pruebas & Piloto)</option>
                      <option value="6">Sprint 6 (Implantación & Cierre)</option>
                    </select>

                    {/* Responsable filter */}
                    <select
                      value={selectedResp}
                      onChange={(e) => setSelectedResp(e.target.value)}
                      className="border text-xs rounded-lg px-2 py-1.5 bg-white focus:outline-none border-slate-200 font-medium"
                    >
                      {responsabilidades.map((resp) => (
                        <option key={resp} value={resp}>
                          {resp === "Todos" ? "Todos los Responsables" : resp}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* GRID / TABLE FOR ACTIVITIES */}
                <div className="border border-slate-200 bg-white rounded-xl overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left divide-y divide-slate-150 text-xs text-slate-600">
                      <thead className="bg-slate-50 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                        <tr>
                          <th className="px-4 py-3 text-center w-[10%]">ID</th>
                          <th className="px-3 py-3 w-[50%]">Descripción de la Actividad</th>
                          <th className="px-3 py-3 w-[18%]">Responsable</th>
                          <th className="px-2 py-3 text-center w-[8%]">Semana</th>
                          <th className="px-2 py-3 text-center w-[8%]">Prioridad</th>
                          <th className="px-3 py-3 text-center w-[12%]">Te PERT</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150">
                        {filteredActivities.length > 0 ? (
                          filteredActivities.map((act) => (
                            <tr key={act.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-4 py-2.5 text-center font-mono font-bold text-slate-900 border-r border-slate-100">
                                {act.id}
                              </td>
                              <td className="px-3 py-2.5">
                                <div className="space-y-1">
                                  <p className="font-medium text-slate-800 leading-tight">
                                    {act.descripcion}
                                  </p>
                                  <div className="flex flex-wrap gap-1.5 items-center">
                                    {act.isNew && (
                                      <span className="font-mono text-[8px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-1 rounded-sm uppercase tracking-wider">
                                        NUEVO
                                      </span>
                                    )}
                                    {act.isCritical && (
                                      <span className="font-mono text-[8px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-1 rounded-sm uppercase tracking-wider">
                                        Ruta Crítica ★
                                      </span>
                                    )}
                                    <span className="font-mono text-[8px] text-slate-400">
                                      EDT {act.paquete} · Sprint {act.sprint}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-3 py-2.5 font-medium text-slate-700">
                                {act.responsable}
                              </td>
                              <td className="px-2 py-2.5 text-center font-mono font-bold text-slate-600">
                                {act.semana}
                              </td>
                              <td className="px-2 py-2.5 text-center">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-extrabold border ${
                                  act.prioridad === "Alta"
                                    ? "bg-red-50 text-red-700 border-red-150"
                                    : "bg-amber-50 text-amber-700 border-amber-150"
                                }`}>
                                  {act.prioridad}
                                </span>
                              </td>
                              <td className="px-3 py-2.5 text-center">
                                <span className="font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-150 px-1.5 py-0.5 rounded">
                                  {act.te.toFixed(1)} d
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="px-4 py-8 text-center text-slate-400 text-xs">
                              Ninguna actividad coincide con los filtros de búsqueda.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* ── PASO 3: SECUENCIAR LAS ACTIVIDADES: DIAGRAMA DE RED ── */}
            <div id="p06-diagrama-red" className="space-y-6 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-900 text-white font-mono text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">3</span>
                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    Diagrama de Red por Precedencia (Método PDM)
                  </h3>
                </div>
                <button
                  onClick={() => openLightbox(0)}
                  className="flex items-center gap-1.5 text-xs text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-150 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  Expandir Diagrama
                </button>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed text-justify">
                El Diagrama de Red representa el flujo lógico de ejecución con método PDM. Define dependencias obligatorias (técnicas) y discretas, mapeando la secuencia crítica desde el Hito de Inicio en S1 hasta el Hito de Cierre en S24.
              </p>

              {/* Network Diagram Graphic Container */}
              <div className="border border-slate-200 bg-slate-50 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
                {/* Real Image Render */}
                <img
                  src="/DIAGRAMA DE GANT.png"
                  alt="Diagrama de Red del Cronograma"
                  referrerPolicy="no-referrer"
                  className="max-h-[350px] max-w-full object-contain rounded-lg shadow-sm border bg-white hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                  onClick={() => openLightbox(0)}
                  onError={(e) => {
                    // fallback representation if the image file isn't uploaded yet or has issues
                    e.currentTarget.style.display = 'none';
                    const el = document.getElementById('diagram-red-fallback');
                    if (el) el.classList.remove('hidden');
                  }}
                />

                {/* Fallback Beautiful Vector Representation */}
                <div id="diagram-red-fallback" className="hidden text-center max-w-md py-6">
                  <Activity className="w-12 h-12 text-slate-300 mx-auto mb-3 animate-pulse" />
                  <h5 className="font-serif font-bold text-slate-800 text-sm mb-1.5">Diagrama de Red del Cronograma (PDM)</h5>
                  <p className="text-slate-400 text-xs leading-normal mb-4">
                    Aquí se visualiza la red interactiva de precedencias lógicas (Ruta Crítica destacada). Para una visualización óptima, suba el archivo <code className="font-mono text-[10px] bg-slate-200 px-1 py-0.5 rounded text-slate-700">DIAGRAMA DE GANT.png</code> al directorio raíz.
                  </p>
                  <div className="flex justify-center gap-3 font-mono text-[9px] text-slate-500">
                    <span className="bg-white border px-2 py-1 rounded">Inicio ── S1 ── S2 ── S3 ── S4 ── S5 ── S6 ── Fin</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── PASO 4: ESTIMAR EL ESFUERZO: MÉTODO PERT ── */}
            <div id="p06-estimacion-pert" className="space-y-6 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="bg-slate-900 text-white font-mono text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">4</span>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Estimación de Esfuerzo mediante Método PERT
                </h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed text-justify">
                Para contrarrestar incertidumbres, aplicamos estimación estadística basada en tres escenarios: Optimista (To), Más Probable (Tm) y Pesimista (Tp). El cálculo del Tiempo Esperado (Te) y la Varianza (σ²) se fundamenta en las ecuaciones estándar:
              </p>

              <div className="grid sm:grid-cols-3 gap-4 font-mono text-[10px] bg-slate-50 border border-slate-150 p-4 rounded-xl text-center">
                <div>
                  <span className="text-slate-400 uppercase font-black tracking-wider block mb-1">Tiempo Esperado</span>
                  <strong className="text-indigo-950 text-xs">Te = (To + 4Tm + Tp) / 6</strong>
                </div>
                <div>
                  <span className="text-slate-400 uppercase font-black tracking-wider block mb-1">Desviación Estándar</span>
                  <strong className="text-indigo-950 text-xs">σ = (Tp - To) / 6</strong>
                </div>
                <div>
                  <span className="text-slate-400 uppercase font-black tracking-wider block mb-1">Varianza</span>
                  <strong className="text-indigo-950 text-xs">σ² = [(Tp - To) / 6]²</strong>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {/* Select box for activity */}
                <div className="md:w-[35%] space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Seleccione Actividad:</span>
                  <div className="border border-slate-200 rounded-xl overflow-y-auto max-h-[190px] divide-y divide-slate-100 bg-white">
                    {ACTIVIDADES_DATA.slice(0, 15).map((act) => (
                      <button
                        key={act.id}
                        onClick={() => setActivePertEq(act.id)}
                        className={`w-full text-left p-2.5 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                          activePertEq === act.id
                            ? "bg-indigo-50 font-semibold text-indigo-900"
                            : "hover:bg-slate-50"
                        }`}
                      >
                        <span className="font-mono">{act.id}</span>
                        <span className="text-slate-500 font-mono text-[9px]">Te: {act.te.toFixed(1)}d</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculations rendering panel */}
                <div className="flex-1 bg-slate-950 text-white rounded-xl p-5 font-mono text-xs flex flex-col justify-between border border-slate-800">
                  {activePertEq ? (() => {
                    const act = ACTIVIDADES_DATA.find((a) => a.id === activePertEq)!;
                    return (
                      <div className="space-y-4">
                        <div className="border-b border-slate-800 pb-2">
                          <span className="text-teal-400 font-bold text-[9px] uppercase tracking-widest">Cálculo Analítico PERT</span>
                          <h4 className="text-white text-xs font-serif font-semibold mt-0.5">{act.descripcion}</h4>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center py-1">
                          <div className="bg-slate-900 p-2 rounded">
                            <span className="text-[9px] text-slate-400 block mb-0.5">Optimista (To)</span>
                            <strong className="text-teal-300 text-sm">{act.to} d</strong>
                          </div>
                          <div className="bg-slate-900 p-2 rounded">
                            <span className="text-[9px] text-slate-400 block mb-0.5">Probable (Tm)</span>
                            <strong className="text-white text-sm">{act.tm} d</strong>
                          </div>
                          <div className="bg-slate-900 p-2 rounded">
                            <span className="text-[9px] text-slate-400 block mb-0.5">Pesimista (Tp)</span>
                            <strong className="text-red-300 text-sm">{act.tp} d</strong>
                          </div>
                        </div>
                        <div className="space-y-2 border-t border-slate-900 pt-3 text-[11px]">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Fórmula Esperada:</span>
                            <span className="text-teal-200">({act.to} + 4×{act.tm} + {act.tp}) / 6 = <strong>{act.te.toFixed(2)} días hábiles</strong></span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Desviación Estándar (σ):</span>
                            <span className="text-teal-200">({act.tp} - {act.to}) / 6 = <strong>{act.sigma.toFixed(3)}</strong></span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Varianza (σ²):</span>
                            <span className="text-teal-200"><strong>{act.sigmaSq.toFixed(3)}</strong></span>
                          </div>
                        </div>
                      </div>
                    );
                  })() : (
                    <div className="flex items-center justify-center text-slate-500 h-full py-10">
                      Seleccione una actividad para ver su cálculo PERT detallado.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── PASO 5: DESARROLLAR EL CRONOGRAMA: DIAGRAMA DE GANTT ── */}
            <div id="p06-gantt" className="space-y-6 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-900 text-white font-mono text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">5</span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h3 className="font-serif text-xl font-bold text-slate-900">
                      Desarrollar el Cronograma (Diagrama de Gantt)
                    </h3>
                    <span className="inline-flex items-center gap-1 bg-slate-100 border border-slate-200 text-slate-600 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold self-start sm:self-auto">
                      Modelado en MS Project 2026
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => openLightbox(1)}
                  className="flex items-center gap-1.5 text-xs text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-150 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  Expandir Gantt
                </button>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed text-justify">
                El Diagrama de Gantt detalla la distribución de los 6 Sprints ágiles de 4 semanas cada uno. Destaca las ventanas de trabajo, dependencias secuenciales y enmarca los 6 hitos formales de entrega en cada Sprint Review.
              </p>

              {/* Gantt Image Container */}
              <div className="border border-slate-200 bg-slate-50 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
                {/* Real Image Render */}
                <img
                  src="/project.jpeg"
                  alt="Diagrama de Gantt del Cronograma"
                  referrerPolicy="no-referrer"
                  className="max-h-[350px] max-w-full object-contain rounded-lg shadow-sm border bg-white hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                  onClick={() => openLightbox(1)}
                  onError={(e) => {
                    const currentSrc = e.currentTarget.src;
                    if (currentSrc.includes("/project.jpeg")) {
                      e.currentTarget.src = "/project.png";
                    } else if (currentSrc.includes("/project.png")) {
                      e.currentTarget.src = "/PLAN DE CRONOGRAMA.png";
                    } else {
                      e.currentTarget.style.display = 'none';
                      const el = document.getElementById('diagram-gantt-fallback');
                      if (el) el.classList.remove('hidden');
                    }
                  }}
                />

                {/* Fallback Beautiful Vector Representation */}
                <div id="diagram-gantt-fallback" className="hidden text-center max-w-md py-6">
                  <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3 animate-pulse" />
                  <h5 className="font-serif font-bold text-slate-800 text-sm mb-1.5">Diagrama de Gantt del Cronograma (Plan Base)</h5>
                  <p className="text-slate-400 text-xs leading-normal mb-4">
                    Aquí se visualiza la escala temporal de los 6 Sprints. Para una visualización óptima, suba el archivo de imagen <code className="font-mono text-[10px] bg-slate-200 px-1 py-0.5 rounded text-slate-700">project.jpeg</code>, <code className="font-mono text-[10px] bg-slate-200 px-1 py-0.5 rounded text-slate-700">project.png</code> o <code className="font-mono text-[10px] bg-slate-200 px-1 py-0.5 rounded text-slate-700">PLAN DE CRONOGRAMA.png</code> a la carpeta correspondiente.
                  </p>
                  <div className="flex justify-center gap-3 font-mono text-[9px] text-slate-500">
                    <span className="bg-white border px-2 py-1 rounded">Sprints 1-6 ── Agosto 2026 a Enero 2027</span>
                  </div>
                </div>
              </div>

              {/* COMPONENTES DEL CRONOGRAMA DESDE PDF PAGE 14 */}
              <div className="bg-[#0d7377]/5 border border-[#0d7377]/10 p-5 rounded-3xl space-y-3">
                <h4 className="font-serif text-sm font-bold text-[#0d7377] flex items-center gap-2">
                  <Layers className="w-4.5 h-4.5" />
                  Componentes del Cronograma (Línea Base Oficial)
                </h4>
                <ul className="grid sm:grid-cols-2 gap-3 text-xs text-slate-700 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0d7377] mt-0.5 flex-shrink-0" />
                    <span><strong>Duración total:</strong> 24 semanas de duración total, del 03 de agosto de 2026 al 22 de enero de 2027.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0d7377] mt-0.5 flex-shrink-0" />
                    <span><strong>6 Sprints SCRUM de 4 semanas:</strong> Sprint 1 verde oscuro (NUEVO), Sprint 2 verde claro, Sprint 3 azul, Sprint 4 morado, Sprint 5 rosado (NUEVO), Sprint 6 dorado.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0d7377] mt-0.5 flex-shrink-0" />
                    <span><strong>40 actividades:</strong> Con duraciones estimadas por el método estadístico PERT.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0d7377] mt-0.5 flex-shrink-0" />
                    <span><strong>Ruta crítica destacada:</strong> Marcada en color naranja/coral con símbolo de estrella (8 actividades nuevas marcadas con cuadrado).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0d7377] mt-0.5 flex-shrink-0" />
                    <span><strong>6 hitos de Sprint Review:</strong> Celebrados al cierre de cada Sprint en las semanas S4, S8, S12, S16, S20 y S24.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0d7377] mt-0.5 flex-shrink-0" />
                    <span><strong>Duración total esperada:</strong> 159.2 días hábiles con una desviación estándar de ±2.1 días.</span>
                  </li>
                </ul>
              </div>

              {/* CRONOGRAMA RESUMEN POR SPRINT TABLE */}
              <div className="space-y-4 pt-4">
                <h4 className="font-serif text-base font-bold text-slate-900">
                  Resumen de Tiempos y Fechas por Sprint
                </h4>
                <div className="border border-slate-200 bg-white rounded-xl overflow-hidden shadow-xs">
                  <table className="w-full text-left divide-y divide-slate-150 text-xs text-slate-600">
                    <thead className="bg-slate-50 text-[10px] font-mono font-bold text-slate-500 uppercase">
                      <tr>
                        <th className="px-4 py-3">Sprint / Fase</th>
                        <th className="px-3 py-3 text-center">Semanas</th>
                        <th className="px-3 py-3 text-center">Inicio</th>
                        <th className="px-3 py-3 text-center">Fin</th>
                        <th className="px-3 py-3 text-center">Duración (Te)</th>
                        <th className="px-4 py-3">Entregable Principal de Sprint Review</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150">
                      <tr className="hover:bg-slate-50/40">
                        <td className="px-4 py-3 font-bold text-slate-900 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                          Sprint 1: Análisis y Diseño (NUEVO)
                        </td>
                        <td className="px-3 py-3 text-center font-mono">S1–S4</td>
                        <td className="px-3 py-3 text-center">03 Ago</td>
                        <td className="px-3 py-3 text-center">28 Ago</td>
                        <td className="px-3 py-3 text-center font-mono font-bold text-indigo-700">17.4 d</td>
                        <td className="px-4 py-3 text-slate-500">Arquitectura validada y variables del modelo definidas.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/40">
                        <td className="px-4 py-3 font-bold text-slate-900 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                          Sprint 2: Gestión + Datos
                        </td>
                        <td className="px-3 py-3 text-center font-mono">S5–S8</td>
                        <td className="px-3 py-3 text-center">31 Ago</td>
                        <td className="px-3 py-3 text-center">25 Sep</td>
                        <td className="px-3 py-3 text-center font-mono font-bold text-indigo-700">31.7 d</td>
                        <td className="px-4 py-3 text-slate-500">Base de Datos centralizada y validada operativa localmente.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/40">
                        <td className="px-4 py-3 font-bold text-slate-900 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          Sprint 3: Modelo ML Predictivo
                        </td>
                        <td className="px-3 py-3 text-center font-mono">S9–S12</td>
                        <td className="px-3 py-3 text-center">28 Sep</td>
                        <td className="px-3 py-3 text-center">23 Oct</td>
                        <td className="px-3 py-3 text-center font-mono font-bold text-indigo-700">29.2 d</td>
                        <td className="px-4 py-3 text-slate-500">Modelo ML entrenado con precisión superior o igual al 75%.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/40">
                        <td className="px-4 py-3 font-bold text-slate-900 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                          Sprint 4: Alertas + Dashboard
                        </td>
                        <td className="px-3 py-3 text-center font-mono">S13–S16</td>
                        <td className="px-3 py-3 text-center">26 Oct</td>
                        <td className="px-3 py-3 text-center">20 Nov</td>
                        <td className="px-3 py-3 text-center font-mono font-bold text-indigo-700">31.3 d</td>
                        <td className="px-4 py-3 text-slate-500">Sistema integrado con alertas y paneles web de tutoría operativos.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/40">
                        <td className="px-4 py-3 font-bold text-slate-900 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-pink-600"></span>
                          Sprint 5: Pruebas + Piloto (NUEVO)
                        </td>
                        <td className="px-3 py-3 text-center font-mono">S17–S20</td>
                        <td className="px-3 py-3 text-center">23 Nov</td>
                        <td className="px-3 py-3 text-center">18 Dic</td>
                        <td className="px-3 py-3 text-center font-mono font-bold text-indigo-700">20.6 d</td>
                        <td className="px-4 py-3 text-slate-500">Sistema validado con pruebas de integración y piloto real docente.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/40">
                        <td className="px-4 py-3 font-bold text-slate-900 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                          Sprint 6: Implantación + Cierre
                        </td>
                        <td className="px-3 py-3 text-center font-mono">S21–S24</td>
                        <td className="px-3 py-3 text-center">21 Dic</td>
                        <td className="px-3 py-3 text-center">22 Ene</td>
                        <td className="px-3 py-3 text-center font-mono font-bold text-indigo-700">29.0 d</td>
                        <td className="px-4 py-3 text-slate-500">Sistema en producción y proyecto cerrado formalmente.</td>
                      </tr>
                      <tr className="bg-slate-900 text-white font-mono font-bold text-[11px]">
                        <td className="px-4 py-3.5 uppercase font-serif">TOTAL PROYECTO</td>
                        <td className="px-3 py-3.5 text-center">S1–S24</td>
                        <td className="px-3 py-3.5 text-center">03 Ago</td>
                        <td className="px-3 py-3.5 text-center">22 Ene</td>
                        <td className="px-3 py-3.5 text-center text-teal-400">159.2 días</td>
                        <td className="px-4 py-3.5">Proyecto completo entregado exitosamente en 6 meses.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* VISOR INTERACTIVO MS PROJECT */}
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#107c41] flex items-center justify-center text-white font-mono text-sm font-black shadow-xs">
                      P
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-slate-900">
                        Visor de Tareas de Microsoft Project (Exportación Oficial)
                      </h4>
                      <p className="text-[11px] text-slate-500 font-sans">
                        La planificación estructurada del proyecto de 125.13 días hábiles exportada desde MS Project 2026.
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 self-start sm:self-auto bg-[#eafaf1] border border-[#a2e2bd] text-[#107c41] px-2.5 py-1 rounded-full text-[10px] font-mono font-extrabold shadow-xxs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#107c41] animate-pulse"></span>
                    64 Filas de MS Project Vinculadas
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
                  <div className="flex flex-col md:flex-row gap-3 items-center justify-between border-b pb-4 border-slate-200">
                    <span className="text-xs font-mono font-bold text-slate-500 self-start md:self-auto">
                      Búsqueda y Filtros de Tareas (MS Project)
                    </span>
                    <div className="flex flex-wrap gap-2 w-full md:w-auto">
                      {/* Search Input */}
                      <div className="relative flex-1 sm:flex-initial min-w-[180px]">
                        <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Buscar por nombre o recurso..."
                          value={mspSearch}
                          onChange={(e) => setMspSearch(e.target.value)}
                          className="pl-8 pr-3 py-1.5 w-full text-xs border rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#107c41] border-slate-200"
                        />
                      </div>

                      {/* Sprint Filter */}
                      <select
                        value={mspSprint}
                        onChange={(e) => setMspSprint(e.target.value)}
                        className="border text-xs rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-[#107c41] border-slate-200 font-medium"
                      >
                        <option value="Todos">Todos los Sprints</option>
                        <option value="1">Sprint 1</option>
                        <option value="2">Sprint 2</option>
                        <option value="3">Sprint 3</option>
                        <option value="4">Sprint 4</option>
                        <option value="5">Sprint 5</option>
                        <option value="6">Sprint 6</option>
                      </select>

                      {/* Summary Toggle */}
                      <button
                        onClick={() => setMspShowOnlySummary(!mspShowOnlySummary)}
                        className={`px-3 py-1.5 text-xs rounded-lg font-medium border transition-all flex items-center gap-1.5 cursor-pointer ${
                          mspShowOnlySummary
                            ? "bg-[#107c41] text-white border-[#107c41]"
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <Filter className="w-3.5 h-3.5" />
                        Solo Resúmenes
                      </button>
                    </div>
                  </div>

                  {/* Task Grid */}
                  <div className="border border-slate-200 bg-white rounded-xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                      <table className="w-full text-left divide-y divide-slate-150 text-xs">
                        <thead className="bg-slate-50 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider sticky top-0 z-10 shadow-xxs">
                          <tr>
                            <th className="px-3 py-2.5 text-center w-[6%] bg-slate-50">Id</th>
                            <th className="px-3 py-2.5 w-[42%] bg-slate-50">Nombre de la Tarea</th>
                            <th className="px-3 py-2.5 w-[12%] text-center bg-slate-50">Duración</th>
                            <th className="px-3 py-2.5 w-[12%] text-center bg-slate-50">Comienzo</th>
                            <th className="px-3 py-2.5 w-[12%] text-center bg-slate-50">Fin</th>
                            <th className="px-2 py-2.5 text-center w-[8%] bg-slate-50">Predec.</th>
                            <th className="px-3 py-2.5 w-[20%] bg-slate-50">Recursos Asignados</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-150 text-slate-600">
                          {filteredMspTasks.length > 0 ? (
                            filteredMspTasks.map((task) => {
                              const isHeader = task.id === 1 || task.id === 2 || task.id === 9 || task.isSummary;
                              return (
                                <tr
                                  key={task.id}
                                  className={`transition-colors ${
                                    isHeader
                                      ? "bg-[#eafaf1]/30 hover:bg-[#eafaf1]/50 font-bold text-slate-900"
                                      : "hover:bg-slate-50/50"
                                  }`}
                                >
                                  <td className="px-3 py-2 font-mono text-center text-slate-500 font-medium border-r border-slate-100">
                                    {task.id}
                                  </td>
                                  <td className="px-3 py-2">
                                    <div className="flex items-center gap-1.5">
                                      {/* Visual Tree Indentation */}
                                      {!isHeader && <span className="text-slate-300 font-mono select-none mr-2">└──</span>}
                                      <span className={isHeader ? "text-slate-950 font-bold text-xs" : "text-slate-700 font-sans"}>
                                        {task.nombre}
                                      </span>
                                    </div>
                                  </td>
                                  <td className={`px-3 py-2 text-center font-mono ${isHeader ? "text-slate-900 font-bold" : "text-slate-600"}`}>
                                    {task.duracion}
                                  </td>
                                  <td className="px-3 py-2 text-center font-mono text-slate-500 text-[11px]">
                                    {task.comienzo}
                                  </td>
                                  <td className="px-3 py-2 text-center font-mono text-slate-500 text-[11px]">
                                    {task.fin}
                                  </td>
                                  <td className="px-2 py-2 text-center font-mono text-[#107c41] font-bold">
                                    {task.predecesoras || "-"}
                                  </td>
                                  <td className="px-3 py-2">
                                    {task.recursos ? (
                                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium font-mono border ${
                                        task.recursos.includes("Área de TI") || task.recursos.includes("TI")
                                          ? "bg-blue-50 text-blue-700 border-blue-150"
                                          : task.recursos.includes("ML") || task.recursos.includes("Equipo ML")
                                          ? "bg-purple-50 text-purple-700 border-purple-150"
                                          : task.recursos.includes("Docentes") || task.recursos.includes("Tutor")
                                          ? "bg-pink-50 text-pink-700 border-pink-150"
                                          : task.recursos.includes("Scrum Master")
                                          ? "bg-indigo-50 text-indigo-700 border-indigo-150"
                                          : "bg-slate-50 text-slate-700 border-slate-200"
                                      }`}>
                                        {task.recursos}
                                      </span>
                                    ) : (
                                      <span className="text-slate-300 font-mono text-[10px]">-</span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan={7} className="px-4 py-8 text-center text-slate-400 text-xs font-sans">
                                Ninguna tarea coincide con los filtros especificados.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-[#107c41]/5 border border-[#107c41]/10 p-4 rounded-xl flex items-start gap-3">
                    <HelpCircle className="w-4 h-4 text-[#107c41] flex-shrink-0 mt-0.5" />
                    <p className="text-[10.5px] text-slate-650 leading-normal">
                      <strong>Acerca de esta exportación:</strong> Los datos anteriores reflejan con total fidelidad el archivo original desarrollado en <strong>Microsoft Project Professional 2026</strong>. El diagrama incluye todas las dependencias cruzadas (tales como las relaciones de Comienzo a Comienzo tipo <em>11CC</em>, <em>13CC</em>, <em>47CC</em> y <em>58CC</em>) y los recursos asignados para la IEP Colegio Peruano Francés.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── PASO 6: CONTROLAR EL CRONOGRAMA (CONTROL DE DESVÍOS EVA) ── */}
            <div id="p06-control-desvios" className="space-y-6 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="bg-slate-900 text-white font-mono text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">6</span>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Controlar el Cronograma (Control de Desvíos EVA)
                </h3>
              </div>
              <p className="text-slate-650 text-sm leading-relaxed text-justify">
                El proceso de Controlar el Cronograma monitorea el estado real del proyecto frente a la línea base aprobada para gestionar de manera formal las solicitudes de cambio ante desviaciones insalvables. Se simula el estado al cierre de cada uno de los 6 Sprints mediante el análisis del Valor Ganado:
              </p>

              {/* MS Project Baseline Metrics Card Grid */}
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-[#107c41] flex items-center justify-center text-white font-mono text-[10px] font-bold">
                    M
                  </div>
                  <h4 className="font-serif text-sm font-bold text-slate-900">
                    Alineación con Línea Base de Microsoft Project
                  </h4>
                </div>
                <p className="text-xs text-slate-650 leading-relaxed text-justify">
                  De acuerdo con el archivo <code>.mpp</code> oficial del proyecto, la línea base quedó fijada el <strong>3 de Agosto de 2026</strong>. El monitoreo en MS Project se realiza contrastando la programación real frente a la prevista. A continuación, se detallan las métricas clave de control de plazos según la última línea base del software de Microsoft:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-xxs">
                    <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase">Variación de Comienzo</span>
                    <span className="block text-sm font-mono font-black text-[#107c41] mt-1">0.00 días</span>
                    <span className="block text-[9px] text-slate-500 font-sans mt-0.5">Inicio puntual del proyecto</span>
                  </div>
                  <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-xxs">
                    <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase">Variación de Fin (Real)</span>
                    <span className="block text-sm font-mono font-black text-amber-600 mt-1">-4.70 días</span>
                    <span className="block text-[9px] text-slate-500 font-sans mt-0.5">Adelanto neto acumulado</span>
                  </div>
                  <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-xxs">
                    <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase">Holgura Total Restante</span>
                    <span className="block text-sm font-mono font-black text-indigo-600 mt-1">15.00 días</span>
                    <span className="block text-[9px] text-slate-500 font-sans mt-0.5">Colchón en ruta no crítica</span>
                  </div>
                  <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-xxs">
                    <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase">Ruta Crítica Oficial</span>
                    <span className="block text-sm font-mono font-black text-rose-600 mt-1">18 Tareas</span>
                    <span className="block text-[9px] text-slate-500 font-sans mt-0.5">Bajo monitoreo diario</span>
                  </div>
                </div>
              </div>

              {/* EVA Table */}
              <div className="border border-slate-200 bg-white rounded-xl overflow-hidden shadow-xs text-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left divide-y divide-slate-150">
                    <thead className="bg-slate-50 text-[10px] font-mono font-bold text-slate-500 uppercase">
                      <tr>
                        <th className="px-4 py-3">Sprint Evaluado</th>
                        <th className="px-3 py-3 text-center">PV (días)</th>
                        <th className="px-3 py-3 text-center">EV (días)</th>
                        <th className="px-3 py-3 text-center">SV = EV - PV</th>
                        <th className="px-3 py-3 text-center">SPI = EV / PV</th>
                        <th className="px-3 py-3 text-center">Estado</th>
                        <th className="px-4 py-3">Observación Analítica del Tribunal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 text-slate-650">
                      <tr className="hover:bg-slate-50/40">
                        <td className="px-4 py-3 font-semibold text-slate-900">Sprint 1 (Análisis - NUEVO)</td>
                        <td className="px-3 py-3 text-center font-mono">17.4</td>
                        <td className="px-3 py-3 text-center font-mono">16.0</td>
                        <td className="px-3 py-3 text-center font-mono text-red-600">-1.4</td>
                        <td className="px-3 py-3 text-center font-mono text-red-600">0.92</td>
                        <td className="px-3 py-3 text-center">
                          <span className="bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold">Amarillo</span>
                        </td>
                        <td className="px-4 py-3 text-[11px]">Reunion con directivos tomo mas tiempo. Dentro de tolerancia.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/40">
                        <td className="px-4 py-3 font-semibold text-slate-900">Sprint 2 (Gestión & Datos)</td>
                        <td className="px-3 py-3 text-center font-mono">31.7</td>
                        <td className="px-3 py-3 text-center font-mono">31.7</td>
                        <td className="px-3 py-3 text-center font-mono text-emerald-600">0.0</td>
                        <td className="px-3 py-3 text-center font-mono text-emerald-600">1.00</td>
                        <td className="px-3 py-3 text-center">
                          <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold">Verde</span>
                        </td>
                        <td className="px-4 py-3 text-[11px]">BD entregada en tiempo. ETL sin incidencias gracias al analisis previo.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/40">
                        <td className="px-4 py-3 font-semibold text-slate-900">Sprint 3 (Modelo ML)</td>
                        <td className="px-3 py-3 text-center font-mono">29.2</td>
                        <td className="px-3 py-3 text-center font-mono">27.5</td>
                        <td className="px-3 py-3 text-center font-mono text-red-600">-1.7</td>
                        <td className="px-3 py-3 text-center font-mono text-red-600">0.94</td>
                        <td className="px-3 py-3 text-center">
                          <span className="bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold">Amarillo</span>
                        </td>
                        <td className="px-4 py-3 text-[11px]">Ajuste hiperparametros requirio mas iteraciones. Precision final 78%.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/40">
                        <td className="px-4 py-3 font-semibold text-slate-900">Sprint 4 (Alertas & Web)</td>
                        <td className="px-3 py-3 text-center font-mono">31.3</td>
                        <td className="px-3 py-3 text-center font-mono">31.3</td>
                        <td className="px-3 py-3 text-center font-mono text-emerald-600">0.0</td>
                        <td className="px-3 py-3 text-center font-mono text-emerald-600">1.00</td>
                        <td className="px-3 py-3 text-center">
                          <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold">Verde</span>
                        </td>
                        <td className="px-4 py-3 text-[11px]">Dashboard y alertas completados en tiempo. Semaforo validado.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/40">
                        <td className="px-4 py-3 font-semibold text-slate-900">Sprint 5 (Piloto - NUEVO)</td>
                        <td className="px-3 py-3 text-center font-mono">20.6</td>
                        <td className="px-3 py-3 text-center font-mono">19.0</td>
                        <td className="px-3 py-3 text-center font-mono text-red-600">-1.6</td>
                        <td className="px-3 py-3 text-center font-mono text-red-600">0.92</td>
                        <td className="px-3 py-3 text-center">
                          <span className="bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold">Amarillo</span>
                        </td>
                        <td className="px-4 py-3 text-[11px]">Piloto genero mas feedback. Se aplicaron 6 ajustes de interfaz.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/40">
                        <td className="px-4 py-3 font-semibold text-slate-900">Sprint 6 (Cierre)</td>
                        <td className="px-3 py-3 text-center font-mono">29.0</td>
                        <td className="px-3 py-3 text-center font-mono">29.0</td>
                        <td className="px-3 py-3 text-center font-mono text-emerald-600">0.0</td>
                        <td className="px-3 py-3 text-center font-mono text-emerald-600">1.00</td>
                        <td className="px-3 py-3 text-center">
                          <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold">Verde</span>
                        </td>
                        <td className="px-4 py-3 text-[11px]">Sistema desplegado. UAT aprobadas. Capacitacion ejecutada.</td>
                      </tr>
                      <tr className="bg-slate-900 text-white font-mono font-bold text-[11px]">
                        <td className="px-4 py-3 uppercase">TOTAL ACUMULADO</td>
                        <td className="px-3 py-3 text-center">159.2</td>
                        <td className="px-3 py-3 text-center">154.5</td>
                        <td className="px-3 py-3 text-center text-amber-300">-4.7</td>
                        <td className="px-3 py-3 text-center text-amber-300">0.97</td>
                        <td className="px-3 py-3 text-center">
                          <span className="bg-amber-900 text-amber-100 border border-amber-700 px-2.5 py-0.5 rounded text-[10px] font-bold">Amarillo</span>
                        </td>
                        <td className="px-4 py-3 text-teal-300 text-[11px]">Desviacion 4.7 dias. Dentro de tolerancia total del proyecto.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SOLICITUDES DE CAMBIO */}
              <div className="space-y-4 pt-4">
                <h4 className="font-serif text-base font-bold text-slate-900">
                  Registro Histórico de Solicitudes de Cambio (Control de Cambios)
                </h4>
                <p className="text-slate-600 text-xs">
                  Toda modificación a la línea base se somete al comité de cambios de la IEP Peruano Francés. Las solicitudes SC-03 y SC-04 son consecuencia directa de las lecciones aprendidas en el nuevo Sprint 5 de pruebas y piloto real.
                </p>

                <div className="border border-slate-200 bg-white rounded-xl overflow-hidden shadow-xs text-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left divide-y divide-slate-150">
                      <thead className="bg-slate-50 text-[10px] font-mono font-bold text-slate-500 uppercase">
                        <tr>
                          <th className="px-4 py-2.5 text-center">ID</th>
                          <th className="px-3 py-2.5">Sprint</th>
                          <th className="px-3 py-2.5">Descripción del Cambio Solicitado</th>
                          <th className="px-3 py-2.5 text-center">Impacto</th>
                          <th className="px-3 py-2.5">Solicitado Por</th>
                          <th className="px-3 py-2.5 text-center">Estado</th>
                          <th className="px-4 py-2.5">Aprobado Por</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150 text-slate-650">
                        <tr>
                          <td className="px-4 py-3 text-center font-mono font-bold text-slate-900">SC-01</td>
                          <td className="px-3 py-3">Sprint 1</td>
                          <td className="px-3 py-3">Ampliar reunion con directivos por necesidad de validar acceso a 3 sistemas adicionales no identificados inicialmente.</td>
                          <td className="px-3 py-3 text-center font-semibold text-slate-800">+1 dia</td>
                          <td className="px-3 py-3">Equipo</td>
                          <td className="px-3 py-3 text-center"><span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-150 text-[10px]">Aprobado</span></td>
                          <td className="px-4 py-3">Scrum Master</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-center font-mono font-bold text-slate-900">SC-02</td>
                          <td className="px-3 py-3">Sprint 3</td>
                          <td className="px-3 py-3">Ampliar ajuste de hiperparametros por precision inicial de 67% que requirio 3 iteraciones adicionales.</td>
                          <td className="px-3 py-3 text-center font-semibold text-slate-800">+2 dias</td>
                          <td className="px-3 py-3">Equipo ML</td>
                          <td className="px-3 py-3 text-center"><span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-150 text-[10px]">Aprobado</span></td>
                          <td className="px-4 py-3">Product Owner</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-center font-mono font-bold text-slate-900">SC-03</td>
                          <td className="px-3 py-3 font-semibold text-slate-900">Sprint 5 (NUEVO)</td>
                          <td className="px-3 py-3">NUEVO: Ampliar duracion del piloto de 1 a 2 semanas por solicitud de docentes para cubrir un ciclo completo de evaluaciones.</td>
                          <td className="px-3 py-3 text-center font-semibold text-slate-800">+1 sem.</td>
                          <td className="px-3 py-3">Docentes tutores</td>
                          <td className="px-3 py-3 text-center"><span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-150 text-[10px]">Aprobado</span></td>
                          <td className="px-4 py-3">Product Owner</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-center font-mono font-bold text-slate-900">SC-04</td>
                          <td className="px-3 py-3 font-semibold text-slate-900">Sprint 5 (NUEVO)</td>
                          <td className="px-3 py-3">NUEVO: Agregar 6 ajustes de interfaz identificados en el piloto: reordenar columnas dashboard, cambiar paleta semaforo y filtro por docente.</td>
                          <td className="px-3 py-3 text-center font-semibold text-slate-800">+2 dias</td>
                          <td className="px-3 py-3">Docentes tutores</td>
                          <td className="px-3 py-3 text-center"><span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-150 text-[10px]">Aprobado</span></td>
                          <td className="px-4 py-3">Product Owner</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-center font-mono font-bold text-slate-900">SC-05</td>
                          <td className="px-3 py-3">Sprint 5</td>
                          <td className="px-3 py-3 text-slate-400">Agregar modulo de exportacion de alertas a WhatsApp para padres de familia.</td>
                          <td className="px-3 py-3 text-center font-semibold text-slate-400">+5 dias</td>
                          <td className="px-3 py-3 text-slate-400">Coord. Academico</td>
                          <td className="px-3 py-3 text-center"><span className="text-red-700 bg-red-50 px-2 py-0.5 rounded font-bold border border-red-150 text-[10px]">Rechazado</span></td>
                          <td className="px-4 py-3 text-slate-400">Scrum Master</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-center font-mono font-bold text-slate-900">SC-06</td>
                          <td className="px-3 py-3">Sprint 6</td>
                          <td className="px-3 py-3">Reprogramar sesion UAT formal por feriado escolar en semana S22.</td>
                          <td className="px-3 py-3 text-center font-semibold text-slate-800">0 dias</td>
                          <td className="px-3 py-3">Coord. Academico</td>
                          <td className="px-3 py-3 text-center"><span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-150 text-[10px]">Aprobado</span></td>
                          <td className="px-4 py-3">Product Owner</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* PLAN DE RESPUESTAS */}
              <div className="space-y-4 pt-4">
                <h4 className="font-serif text-base font-bold text-slate-900">
                  Plan de Respuesta Inmediata ante Desvíos
                </h4>
                <div className="grid md:grid-cols-2 gap-5 text-xs">
                  <div className="border border-amber-250 bg-amber-50/10 p-5 rounded-2xl">
                    <h5 className="font-serif font-bold text-amber-900 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      Nivel Amarillo: Alerta Preventiva (SPI 0.90 a 0.99)
                    </h5>
                    <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                      <li>Scrum Master notifica inmediatamente al equipo en la reunión diaria (Daily Standup).</li>
                      <li>Revisión exhaustiva de cuellos de botella y holguras en la ruta crítica de datos.</li>
                      <li>Uso de la reserva de contingencia del Sprint correspondiente (2 días hábiles de colchón).</li>
                    </ul>
                  </div>

                  <div className="border border-red-250 bg-red-50/5 p-5 rounded-2xl">
                    <h5 className="font-serif font-bold text-red-900 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      Nivel Rojo: Alerta Correctiva Urgente (SPI &lt; 0.90)
                    </h5>
                    <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                      <li>Convocatoria a reunión urgente con el Product Owner para evaluar impactos.</li>
                      <li><strong>Fast Tracking:</strong> Paralelizar tareas de documentación de manuales de usuario y técnicos.</li>
                      <li><strong>Crashing:</strong> Reasignar recursos adicionales (segundo ingeniero ML para acelerar el ajuste).</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 4. ACTUALIZACIONES AL PLAN DEL PROYECTO */}
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <h4 className="font-serif text-base font-bold text-slate-900">
                  4. Actualizaciones al Plan del Proyecto
                </h4>
                <p className="text-slate-600 text-xs">
                  Las solicitudes de cambio aprobadas e incidencias registradas durante el control de plazos determinan actualizaciones en los diversos documentos de gestión para mantener alineada la documentación con el avance real:
                </p>

                <div className="border border-slate-200 bg-white rounded-xl overflow-hidden shadow-xs text-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left divide-y divide-slate-150">
                      <thead className="bg-slate-50 text-[10px] font-mono font-bold text-slate-500 uppercase">
                        <tr>
                          <th className="px-4 py-2.5">Documento a actualizar</th>
                          <th className="px-3 py-2.5">Qué se actualiza</th>
                          <th className="px-3 py-2.5">Frecuencia</th>
                          <th className="px-4 py-2.5">Responsable</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150 text-slate-650">
                        <tr className="hover:bg-slate-50/40">
                          <td className="px-4 py-3 font-semibold text-slate-900">Línea base del cronograma</td>
                          <td className="px-3 py-3">Fechas de inicio y fin afectadas por cambios aprobados SC-01 al SC-04.</td>
                          <td className="px-3 py-3 font-mono text-[10px]">Por Sprint Review</td>
                          <td className="px-4 py-3">Scrum Master</td>
                        </tr>
                        <tr className="hover:bg-slate-50/40">
                          <td className="px-4 py-3 font-semibold text-slate-900">Registro lecciones aprendidas</td>
                          <td className="px-3 py-3">Causas de desvíos, acciones correctivas y efectividad. Incluir hallazgos del piloto Sprint 5.</td>
                          <td className="px-3 py-3 font-mono text-[10px]">Cierre Sprint</td>
                          <td className="px-4 py-3">Equipo completo</td>
                        </tr>
                        <tr className="hover:bg-slate-50/40">
                          <td className="px-4 py-3 font-semibold text-slate-900">Product Backlog</td>
                          <td className="px-3 py-3">Repriorización de HU si hay cambios aprobados. SC-05 (WhatsApp) pasa al backlog de versión 2.0.</td>
                          <td className="px-3 py-3 font-mono text-[10px]">Por Sprint Review</td>
                          <td className="px-4 py-3">Product Owner</td>
                        </tr>
                        <tr className="hover:bg-slate-50/40">
                          <td className="px-4 py-3 font-semibold text-slate-900">Registro de riesgos</td>
                          <td className="px-3 py-3">Nuevos riesgos: disponibilidad de docentes para piloto, calidad de datos históricos del colegio.</td>
                          <td className="px-3 py-3 font-mono text-[10px]">Semanal</td>
                          <td className="px-4 py-3">Scrum Master</td>
                        </tr>
                        <tr className="hover:bg-slate-50/40">
                          <td className="px-4 py-3 font-semibold text-slate-900">Informe de desempeño</td>
                          <td className="px-3 py-3">SPI, SV, porcentaje de avance real vs planificado y proyección de cierre actualizada.</td>
                          <td className="px-3 py-3 font-mono text-[10px]">Semanal</td>
                          <td className="px-4 py-3">Scrum Master</td>
                        </tr>
                        <tr className="hover:bg-slate-50/40">
                          <td className="px-4 py-3 font-semibold text-slate-900">Plan gestión del cronograma</td>
                          <td className="px-3 py-3">Actualizar BAC de 86.8 a 159.2 días y tolerancia total a más o menos 1.5 semanas.</td>
                          <td className="px-3 py-3 font-mono text-[10px]">Una vez (inicio)</td>
                          <td className="px-4 py-3">Scrum Master</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* CONCLUSIÓN GENERAL */}
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
                <h4 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4.5 h-4.5 text-indigo-600" />
                  Conclusión de la Gestión de Tiempos
                </h4>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed text-justify">
                  <strong>Conclusión:</strong> El proyecto Sistema ML — Alerta Temprana Académica fue completado con una desviación total de <strong>-4.7 días (SPI = 0.97)</strong>, dentro de la tolerancia de más o menos 1.5 semanas. Los 6 Sprint Reviews fueron ejecutados en sus fechas planificadas. Las 4 solicitudes de cambio aprobadas (SC-01 a SC-04) fueron absorbidas por las reservas de contingencia sin impactar el alcance del producto. La solicitud SC-05 fue correctamente rechazada por exceder el alcance definido. El Sprint 5 de pruebas y piloto — nuevo en esta versión de 6 meses — demostró ser el Sprint de mayor valor agregado al detectar 6 mejoras de interfaz críticas antes del despliegue final.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── IMAGE ZOOM LIGHTBOX MODAL ── */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-slate-950/95 z-50 flex flex-col items-center justify-between p-4 md:p-6 select-none">
          {/* Header */}
          <div className="w-full flex items-center justify-between max-w-7xl border-b border-slate-800 pb-3">
            <h4 className="font-serif text-white font-bold text-sm sm:text-base text-left truncate pr-4">
              {images[lightboxIndex].alt}
            </h4>
            <button
              onClick={closeLightbox}
              className="text-slate-400 hover:text-white p-2 rounded-full bg-slate-900 hover:bg-slate-800 transition-colors border border-slate-800 cursor-pointer flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Main Stage */}
          <div className="w-full flex-1 flex items-center justify-center my-4 overflow-hidden relative">
            <div 
              className={`relative max-w-full max-h-[66vh] rounded-2xl bg-slate-900 border border-slate-800 p-2 sm:p-4 overflow-hidden flex items-center justify-center ${
                zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
              }`}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onMouseUp}
              onClick={(e) => {
                if (isDragging) return;
                if (zoom === 1) {
                  setZoom(2);
                } else {
                  handleZoomReset();
                }
              }}
            >
              <img
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                referrerPolicy="no-referrer"
                className="max-h-[60vh] max-w-full object-contain rounded-lg select-none pointer-events-none"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  transformOrigin: "center center",
                  transition: isDragging ? "none" : "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), translate 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onError={(e) => {
                  const currentSrc = e.currentTarget.src;
                  if (currentSrc.includes("/project.jpeg")) {
                    e.currentTarget.src = "/project.png";
                  } else if (currentSrc.includes("/project.png")) {
                    e.currentTarget.src = "/PLAN DE CRONOGRAMA.png";
                  } else {
                    e.currentTarget.style.display = 'none';
                    const msg = document.getElementById('lightbox-error');
                    if (msg) msg.classList.remove('hidden');
                  }
                }}
              />
              <div id="lightbox-error" className="hidden text-slate-400 py-12 text-center text-sm font-mono">
                La imagen <code className="bg-slate-950 p-1 rounded">{images[lightboxIndex].src}</code> no se encuentra en el servidor. <br />
                Suba el archivo correspondiente para visualizarlo.
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="w-full max-w-2xl text-center space-y-4">
            {/* Zoom Controls Bar */}
            <div className="inline-flex items-center gap-4 bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-full shadow-lg backdrop-blur-md">
              <button
                onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
                disabled={zoom <= 1}
                className="text-slate-400 hover:text-white disabled:text-slate-700 disabled:cursor-not-allowed transition-colors p-1.5 hover:bg-slate-800 rounded-full cursor-pointer flex items-center justify-center"
                title="Alejar"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              
              <span className="text-white font-mono text-xs min-w-[50px] select-none text-center">
                {Math.round(zoom * 100)}%
              </span>
              
              <button
                onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
                disabled={zoom >= 4}
                className="text-slate-400 hover:text-white disabled:text-slate-700 disabled:cursor-not-allowed transition-colors p-1.5 hover:bg-slate-800 rounded-full cursor-pointer flex items-center justify-center"
                title="Acercar"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <div className="w-px h-4 bg-slate-800" />

              <button
                onClick={(e) => { e.stopPropagation(); handleZoomReset(); }}
                disabled={zoom === 1 && pan.x === 0 && pan.y === 0}
                className="text-xs text-slate-400 hover:text-white disabled:text-slate-700 disabled:cursor-not-allowed transition-colors px-2.5 py-1 hover:bg-slate-850 rounded-md font-mono cursor-pointer"
              >
                Restablecer
              </button>
            </div>

            <p className="text-slate-400 text-xs max-w-3xl mx-auto leading-relaxed px-4">
              {images[lightboxIndex].caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
