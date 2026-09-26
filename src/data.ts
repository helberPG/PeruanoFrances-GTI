/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Reference,
  CanvasData,
  Photo,
  Stakeholder,
  ActorZone,
  MonitoreoActor,
  Factor,
  PersonaEmpatia,
  HowMightWe,
  EncuestaPregunta,
  Modulo,
  TocChapter,
  TocSection
} from "./types";

export const REFERENCIAS: Reference[] = [
  { clave: "PMI, 2017", texto: "Project Management Institute. (2017). Guía de los Fundamentos para la Dirección de Proyectos (Guía del PMBOK®), 6.ª ed. Newton Square, PA: Project Management Institute." },
  { clave: "Osterwalder & Pigneur, 2010", texto: "Osterwalder, A., & Pigneur, Y. (2010). Business Model Generation: A Handbook for Visionaries, Game Changers, and Challengers. Hoboken, NJ: John Wiley & Sons." },
  { clave: "Romero & Ventura, 2010", texto: "Romero, C., & Ventura, S. (2010). Educational data mining: A review of the state of the art. IEEE Transactions on Systems, Man, and Cybernetics, Part C, 40(6), 601–618. https://doi.org/10.1109/TSMCC.2010.2053532" },
  { clave: "Márquez-Vera et al., 2013", texto: "Márquez-Vera, C., Morales, C. R., & Soto, S. V. (2013). Predicting school failure and dropout by using data mining techniques. IEEE Revista Iberoamericana de Tecnologías del Aprendizaje, 8(1), 7–14. https://doi.org/10.1109/RITA.2013.2244695" },
  { clave: "UNESCO, 2022", texto: "UNESCO. (2022). Informe de Seguimiento de la Educación en el Mundo 2022: No dejar a nadie atrás. París: Organización de las Naciones Unidas para la Educación, la Ciencia y la Cultura." },
  { clave: "MINEDU, 2023", texto: "Ministerio de Educación del Perú — MINEDU. (2023). Estadísticas de la Calidad Educativa (ESCALE). Lima: MINEDU. Recuperado de http://escale.minedu.gob.pe" },
  { clave: "Ley 29733, 2011", texto: "Congreso de la República del Perú. (2011). Ley N° 29733 — Ley de Protección de Datos Personales y su Reglamento (D.S. N° 003-2013-JUS). Lima: El Peruano." },
  { clave: "CEPAL/ILPES, 2005", texto: "Comisión Económica para América Latina y el Caribe — CEPAL/ILPES. (2005). Metodología del Marco Lógico para la planificación, el seguimiento y la evaluación de proyectos y programas. Santiago de Chile: Naciones Unidas." },
];

export const CANVAS: CanvasData = {
  socios: ["UNTELS — equipo de desarrollo del sistema", "Cubicol — plataforma educativa existente", "Proveedor WIN — conectividad 1000 Mbps", "Ministerio de Educación — marco normativo"],
  actividades: ["Recolección e integración de datos académicos", "Entrenamiento y actualización de modelos ML", "Generación de alertas tempranas automáticas", "Mantenimiento, soporte y capacitación del personal"],
  recursos: ["Datos históricos: asistencia, notas e incidencias", "Infraestructura TI del colegio (Cubicol, internet)", "Equipo de desarrollo UNTELS", "Personal TI de la institución"],
  propuesta: ["Alerta temprana del bajo rendimiento académico mediante ML", "Alertas automáticas para intervención oportuna", "Dashboard visual para toma de decisiones directivas", "Reducción del bajo rendimiento y mejora de resultados académicos"],
  relacion: ["Capacitación presencial al personal docente y administrativo", "Soporte técnico continuo por el área TI de la institución", "Actualizaciones periódicas del sistema ML", "Comunicación mensual de reportes a dirección"],
  canales: ["Plataforma web responsive (móvil y escritorio)", "Lectura QR para registro de asistencia", "Integración directa con Cubicol", "Notificaciones vía correo y WhatsApp"],
  segmentos: ["Director y docentes de la IE Peruano Francés", "Psicólogo escolar", "Personal administrativo y área TI", "Padres de familia (200 alumnos)"],
  costos: ["Desarrollo del sistema — costo mínimo (equipo universitario)", "Hosting cloud — tier gratuito (Vercel / Supabase)", "Capacitación del personal docente", "Mantenimiento y actualizaciones anuales"],
  ingresos: ["Reducción de deserción → matrícula estable → ingresos sostenidos", "Ahorro en procesos manuales de seguimiento estudiantil", "Potencial licenciamiento a otras IEP del distrito de VES", "Mejora de imagen institucional y competitividad"],
};

export const PHOTOS: Photo[] = [
  { src: "/img6.jpeg", caption: "Fachada principal de la I.E.P. Peruano Francés, Villa el Salvador" },
  { src: "/img7.jpeg", caption: "Vista frontal del edificio institucional (3 pisos)" },
  { src: "/img1.jpeg", caption: "Equipo de investigación en la entrada del colegio" },
  { src: "/img2.jpeg", caption: "Visita de campo al colegio — equipo UNTELS" },
  { src: "/img3.jpeg", caption: "Con la directora del colegio en la entrada de la institución" },
  { src: "/img5.jpeg", caption: "Reunión de entrevista con la directora en su oficina" },
  { src: "/img4.jpeg", caption: "Reporte de Incidencia Escolar actual — proceso 100% físico/manual" },
];

export const STAKEHOLDERS: Stakeholder[] = [
  { nombre: "Promotora Directora", cargo: "Promotora Directora — Directora General", contacto: "Oficina de Dirección — IE Peruano Francés", rol: "Toma de decisiones estratégicas", interes: "Alto", poder: "Alto", estrategia: "Gestionar de cerca", estado: "Comprometida", estadoColor: "emerald" },
  { nombre: "Subdirector", cargo: "Subdirector Académico", contacto: "Oficina de Dirección — reuniones académicas", rol: "Supervisión académica", interes: "Alto", poder: "Alto", estrategia: "Gestionar de cerca", estado: "Identificado", estadoColor: "blue" },
  { nombre: "Área de TI", cargo: "Encargado de Tecnología y Gestora Cubicol", contacto: "Laboratorio de cómputo — IE Peruano Francés", rol: "Implementación y soporte técnico", interes: "Alto", poder: "Alto", estrategia: "Gestionar de cerca", estado: "Comprometida", estadoColor: "emerald" },
  { nombre: "Docentes", cargo: "Docentes y Auxiliares (16 personas)", contacto: "Aulas y plataforma digital interna Cubicol", rol: "Uso del sistema y seguimiento estudiantil", interes: "Alto", poder: "Medio", estrategia: "Mantener involucrados", estado: "Identificados", estadoColor: "blue" },
  { nombre: "Jefa de Normas y Coordinadores", cargo: "Jefa de Normas — Coordinadores de CC. y LL.", contacto: "Oficina académica — IE Peruano Francés", rol: "Gestión académica y coordinación curricular", interes: "Alto", poder: "Medio", estrategia: "Mantener involucrados", estado: "Identificados", estadoColor: "blue" },
  { nombre: "Psicólogo Escolar", cargo: "Psicólogo de la institución", contacto: "Área de psicología — IE Peruano Francés", rol: "Apoyo en casos de riesgo detectados", interes: "Alto", poder: "Medio", estrategia: "Mantener involucrados", estado: "Identificado", estadoColor: "blue" },
  { nombre: "Padres de Familia", cargo: "Apoderados de los 200 alumnos", contacto: "WhatsApp institucional / Plataforma Cubicol", rol: "Seguimiento del desempeño de sus hijos", interes: "Alto", poder: "Bajo", estrategia: "Mantener satisfechos", estado: "Informados", estadoColor: "amber" },
  { nombre: "Estudiantes", cargo: "Alumnos de Inicial, Primaria y Secundaria", contacto: "Aulas — Plataforma educativa Cubicol", rol: "Beneficiarios directos del sistema", interes: "Alto", poder: "Bajo", estrategia: "Monitorear", estado: "Monitoreados", estadoColor: "slate" },
  { nombre: "Personal Administrativo", cargo: "Área administrativa del colegio", contacto: "Oficina administrativa — IE Peruano Francés", rol: "Gestión de datos institucionales", interes: "Medio", poder: "Bajo", estrategia: "Mantener informados", estado: "Informados", estadoColor: "slate" },
];

export const MAPA_ACTORES: ActorZone[] = [
  { zona: "Zona de Gestión Directa", color: "border-blue-600 bg-blue-50", colorTexto: "text-blue-800", colorBadge: "bg-blue-600 text-white", descripcion: "Alta influencia y alto interés — decisores clave del proyecto", actores: [{ nombre: "Promotora Directora", relacion: "Entrevistada · Comprometida" }, { nombre: "Área de TI", relacion: "Entrevistada · Comprometida" }, { nombre: "Subdirector", relacion: "Identificado · Por contactar" }] },
  { zona: "Zona de Involucramiento Activo", color: "border-indigo-500 bg-indigo-50", colorTexto: "text-indigo-800", colorBadge: "bg-indigo-500 text-white", descripcion: "Usuarios directos del sistema — su adopción determina el éxito", actores: [{ nombre: "Docentes y Auxiliares", relacion: "Identificados · Capacitación pendiente" }, { nombre: "Coordinadores Académicos", relacion: "Identificados · Por involucrar" }, { nombre: "Psicólogo Escolar", relacion: "Identificado · Por contactar" }] },
  { zona: "Zona de Seguimiento y Satisfacción", color: "border-amber-500 bg-amber-50", colorTexto: "text-amber-800", colorBadge: "bg-amber-500 text-white", descripcion: "Beneficiarios indirectos — deben ser informados y satisfechos", actores: [{ nombre: "Padres de Familia", relacion: "Informados vía Cubicol y WhatsApp" }, { nombre: "Estudiantes (200)", relacion: "Beneficiarios finales del sistema" }, { nombre: "Personal Administrativo", relacion: "Informados periódicamente" }] },
];

export const MONITOREO: MonitoreoActor[] = [
  { nombre: "Promotora Directora", estado: "Comprometida", nivel: 90, accion: "Entrevista realizada en Abril 2026. Ofrece acceso a datos institucionales. Próximo paso: presentación formal de la propuesta.", color: "bg-emerald-500" },
  { nombre: "Encargada de Cubicol / TI", estado: "Comprometida", nivel: 85, accion: "Entrevistada junto con la directora. Receptiva a integración técnica. Próximo paso: análisis de API de Cubicol.", color: "bg-emerald-500" },
  { nombre: "Subdirector", estado: "Identificado", nivel: 40, accion: "Identificado en la estructura organizacional. Pendiente de contacto formal para presentarle el proyecto.", color: "bg-blue-500" },
  { nombre: "Docentes y Auxiliares", estado: "Identificados", nivel: 35, accion: "Identificados como usuarios primarios. Pendiente taller de sensibilización sobre el sistema y sus beneficios.", color: "bg-blue-500" },
  { nombre: "Psicólogo Escolar", estado: "Identificado", nivel: 30, accion: "Identificado como actor clave para validar alertas críticas. Pendiente de reunión específica sobre casos de riesgo.", color: "bg-blue-500" },
  { nombre: "Coordinadores Académicos", estado: "Identificados", nivel: 30, accion: "Identificados por nivel (inicial, primaria, secundaria). Pendiente de sesión de trabajo con el sistema de reportes.", color: "bg-blue-500" },
  { nombre: "Padres de Familia", estado: "Informados", nivel: 20, accion: "Identificados como destinatarios de alertas. Se comunicará a través de Cubicol y WhatsApp institucional.", color: "bg-amber-500" },
  { nombre: "Estudiantes", estado: "Monitoreados", nivel: 15, accion: "Beneficiarios finales. El sistema los monitoreará de forma automática sin requerir su participación activa.", color: "bg-slate-400" },
];

export const FACTORES_INTERNOS: Factor[] = [
  { factor: "Cultura Organizacional", descripcion: "Valores de responsabilidad, disciplina, trabajo en equipo e innovación que favorecen la adopción de nuevas tecnologías." },
  { factor: "Estructura Organizacional", descripcion: "Jerarquía clara: Directora, Subdirector, Coordinadores, Docentes, Psicólogo Escolar, Administrativos y Área TI." },
  { factor: "Infraestructura Tecnológica", descripcion: "Internet WIN 1000 Mbps (fibra óptica), plataforma Cubicol activa, base de datos institucional, 1 técnico de laboratorio." },
  { factor: "Experiencia en Proyectos TI", descripcion: "7 años usando Cubicol; implementaron matrícula digital y plataformas virtuales. Demuestran madurez tecnológica favorable." },
  { factor: "Recursos Humanos", descripcion: "16 docentes/auxiliares, psicólogo, técnico de TI y gestora de Cubicol. Capital humano disponible para el proyecto." },
  { factor: "Procesos Actuales", descripcion: "Asistencia física por cuadernos. Incidencias notificadas por WhatsApp/correo. Sin trazabilidad centralizada ni alertas automáticas." },
];

export const FACTORES_EXTERNOS: Factor[] = [
  { factor: "Regulaciones y Normas", descripcion: "Cumplimiento obligatorio: Ministerio de Educación, Ley General de Educación y Ley N° 29733 de Protección de Datos Personales." },
  { factor: "Proveedores Tecnológicos", descripcion: "Dependencia de WIN (internet), Cubicol (plataforma educativa) y equipos informáticos. Condicionan disponibilidad del servicio." },
  { factor: "Condiciones Económicas", descripcion: "Presupuesto limitado como colegio privado pequeño. Requiere soluciones de bajo costo con tecnología open-source y cloud." },
  { factor: "Competencia Educativa", descripcion: "Otras instituciones en VES incorporan tecnología, generando presión para innovar y mantener la matrícula competitiva." },
  { factor: "Avances Tecnológicos", descripcion: "IA y analítica de datos ofrecen oportunidad real para mejorar gestión educativa con herramientas accesibles y escalables." },
];

export const ACTIVOS = [
  { titulo: "Sistemas Existentes", items: ["Plataforma Cubicol (notas, matrícula)", "Base de datos institucional", "Control de asistencia", "Plataforma virtual educativa"] },
  { titulo: "Documentación", items: ["Registro de estudiantes", "Historial académico", "Reportes de asistencia", "Formatos de incidencias físicos", "Manuales de procedimientos"] },
  { titulo: "Experiencia Previa", items: ["7 años operando Cubicol", "Matrícula digital implementada", "Plataformas virtuales gestionadas", "Capacidad organizacional TI"] },
  { titulo: "Capital Humano", items: ["1 técnico de laboratorio TI", "1 gestora de Cubicol", "Directora con apertura TI", "Docentes capacitados"] },
];

export const MAPA_EMPATIA: PersonaEmpatia[] = [
  {
    usuario: "Directora",
    cargo: "Promotora Directora — Decisora estratégica",
    color: "border-blue-500",
    colorBg: "bg-blue-50",
    colorLabel: "bg-blue-600",
    piensa: [
      "Quiere que la matrícula sea estable y creciente.",
      "Preocupada por alumnos que reprueban sin que nadie lo detecte a tiempo.",
      "Confía en la tecnología: 7 años usando Cubicol.",
    ],
    ve: [
      "Reportes académicos llegando tarde o incompletos.",
      "Docentes haciendo seguimiento en cuadernos físicos.",
      "Padres que no pueden acceder a Cubicol (40%).",
    ],
    dice: [
      "\"Necesitamos un sistema que nos ayude a tomar decisiones.\"",
      "Le interesa el QR para asistencia (confirmado en entrevista).",
      "Ofrece acceso a datos institucionales para el proyecto.",
    ],
    frustraciones: [
      "No tiene visión global del rendimiento en tiempo real.",
      "Las intervenciones llegan cuando el problema ya es grave.",
      "Comunicación con padres limitada a WhatsApp/correo.",
    ],
    motivaciones: [
      "Mejorar indicadores académicos institucionales.",
      "Posicionar la IE como referente tecnológico en VES.",
      "Estabilizar y hacer crecer la matrícula.",
    ],
  },
  {
    usuario: "Docente",
    cargo: "Docente/Auxiliar — Usuario primario del sistema",
    color: "border-indigo-500",
    colorBg: "bg-indigo-50",
    colorLabel: "bg-indigo-600",
    piensa: [
      "Quiere ayudar a sus alumnos pero le falta tiempo.",
      "Siente que detecta los problemas tarde (P7: 100% lo reconoce).",
      "Está dispuesto a adoptar tecnología si no aumenta su carga (P10: 83.3%).",
    ],
    ve: [
      "25+ alumnos por aula con información dispersa en varios sistemas.",
      "Asistencia registrada en papel sin trazabilidad digital.",
      "Incidencias reportadas por WhatsApp sin historial consolidado.",
    ],
    dice: [
      "Necesita control de notas y asistencia continuo (P11).",
      "Los factores del bajo rendimiento son múltiples (P5).",
      "Considera útil o muy útil tener alertas tempranas (P9: 100%).",
    ],
    frustraciones: [
      "Seguimiento manual consume tiempo sin generar alertas.",
      "Información académica dispersa en Cubicol, papel y WhatsApp.",
      "Sin indicadores en tiempo real para actuar oportunamente.",
    ],
    motivaciones: [
      "Intervenir a tiempo antes de que el alumno repruebe.",
      "Tener una herramienta que centralice la información académica.",
      "Mejorar el rendimiento de sus estudiantes con menos esfuerzo manual.",
    ],
  },
];

export const HMW: HowMightWe[] = [
  {
    pregunta: "¿Cómo podríamos centralizar asistencia, notas e incidencias sin aumentar la carga del docente?",
    insight: "83.3% de docentes hace seguimiento diario pero de forma manual (P2). 66.7% necesita datos integrados (P6).",
    vinculo: "Módulo A — Recolección automatizada desde Cubicol + QR",
  },
  {
    pregunta: "¿Cómo podríamos alertar al docente antes de que el alumno ya esté en situación crítica?",
    insight: "100% reconoce que los problemas se detectan tardíamente (P7: Algunas veces o Frecuentemente).",
    vinculo: "Módulo D — Alertas tempranas automáticas por nivel de riesgo",
  },
  {
    pregunta: "¿Cómo podríamos darle a la directora visibilidad del riesgo académico en tiempo real?",
    insight: "Directora carece de reportes consolidados. Necesita base para decisiones estratégicas (entrevista).",
    vinculo: "Módulo E — Dashboard con indicadores por aula y grado",
  },
  {
    pregunta: "¿Cómo podríamos mantener informados a los padres que no pueden acceder a Cubicol?",
    insight: "40% de padres no puede ingresar a Cubicol (entrevista con directora).",
    vinculo: "Notificaciones vía WhatsApp/correo — canales ya utilizados por la institución",
  },
];

export const ENCUESTA_PREGUNTAS: EncuestaPregunta[] = [
  {
    num: 1,
    img: "/pregunta1.png",
    texto: "¿Cuántos años de experiencia tiene como docente?",
    tipo: "nominal",
    filas: [
      { opcion: "Más de 7 años", n: 3, pct: 50 },
      { opcion: "4 a 7 años",    n: 1, pct: 16.7 },
      { opcion: "1 a 3 años",    n: 1, pct: 16.7 },
      { opcion: "Menos de 1 año",n: 1, pct: 16.7 },
    ],
    hallazgo: "Equipo docente mayoritariamente experimentado (50% con más de 7 años).",
    color: "blue",
  },
  {
    num: 2,
    img: "/pregunta2.png",
    texto: "¿Con qué frecuencia realiza seguimiento al rendimiento académico de sus estudiantes?",
    tipo: "nominal",
    filas: [
      { opcion: "Diariamente",  n: 5, pct: 83.3 },
      { opcion: "Mensualmente", n: 1, pct: 16.7 },
    ],
    hallazgo: "83.3% realiza seguimiento diario, pero de forma manual e individualizada.",
    color: "indigo",
  },
  {
    num: 3,
    img: "/pregunta3.png",
    texto: "¿Considera que actualmente la institución cuenta con herramientas suficientes para detectar estudiantes con bajo rendimiento académico?",
    tipo: "nominal",
    filas: [
      { opcion: "Sí",           n: 3, pct: 50.0 },
      { opcion: "No",           n: 2, pct: 33.3 },
      { opcion: "Parcialmente", n: 1, pct: 16.7 },
    ],
    hallazgo: "50% reconoce carencia o insuficiencia de herramientas (No + Parcialmente).",
    color: "amber",
  },
  {
    num: 4,
    img: "/pregunta4.png",
    texto: "¿Qué tan difícil considera identificar oportunamente a estudiantes con problemas académicos?",
    tipo: "likert",
    filas: [
      { opcion: "Regular", n: 5, pct: 83.3 },
      { opcion: "Fácil",   n: 1, pct: 16.7 },
      { opcion: "Difícil", n: 0, pct: 0 },
    ],
    hallazgo: "83.3% califica la identificación oportuna de complejidad moderada.",
    color: "orange",
  },
  {
    num: 5,
    img: "/pregunta5.png",
    texto: "¿Cuáles son los principales factores que afectan el rendimiento académico de los estudiantes?",
    tipo: "nominal",
    filas: [
      { opcion: "Uso excesivo de redes sociales",  n: 2, pct: 33.3 },
      { opcion: "Bajo hábito de estudio",           n: 1, pct: 16.7 },
      { opcion: "Bajo acompañamiento familiar",     n: 1, pct: 16.7 },
      { opcion: "Problemas familiares",             n: 1, pct: 16.7 },
      { opcion: "Todas las anteriores",             n: 1, pct: 16.7 },
    ],
    hallazgo: "Factores múltiples y combinados — justifica un sistema multivariable.",
    color: "red",
  },
  {
    num: 6,
    img: "/pregunta6.png",
    texto: "¿Qué información considera más importante para detectar estudiantes con bajo rendimiento académico?",
    tipo: "nominal",
    filas: [
      { opcion: "Todas las anteriores", n: 4, pct: 66.7 },
      { opcion: "Entrega de tareas",    n: 1, pct: 16.7 },
      { opcion: "Conducta",             n: 1, pct: 16.7 },
    ],
    hallazgo: "66.7% necesita datos integrados — valida el diseño multivariable del sistema.",
    color: "purple",
  },
  {
    num: 7,
    img: "/pregunta7.png",
    texto: "¿Considera que los problemas académicos suelen detectarse tardíamente?",
    tipo: "likert",
    filas: [
      { opcion: "Algunas veces",  n: 4, pct: 66.7 },
      { opcion: "Frecuentemente", n: 2, pct: 33.3 },
      { opcion: "Raramente",      n: 0, pct: 0 },
    ],
    hallazgo: "100% reconoce detección tardía — valida directamente el problema central.",
    color: "red",
  },
  {
    num: 8,
    img: "/pregunta8.png",
    texto: "¿Cree que un sistema inteligente basado en Machine Learning ayudaría a mejorar el seguimiento académico?",
    tipo: "likert",
    filas: [
      { opcion: "Totalmente de acuerdo", n: 3, pct: 50.0 },
      { opcion: "De acuerdo",            n: 2, pct: 33.3 },
      { opcion: "Neutral",               n: 1, pct: 16.7 },
      { opcion: "En desacuerdo",         n: 0, pct: 0 },
    ],
    hallazgo: "83.3% favorable a la solución ML (De acuerdo + Totalmente de acuerdo).",
    color: "emerald",
  },
  {
    num: 9,
    img: "/pregunta9.png",
    texto: "¿Qué tan útil considera la implementación de alertas tempranas para identificar estudiantes en riesgo académico?",
    tipo: "likert",
    filas: [
      { opcion: "Muy útil",   n: 4, pct: 66.7 },
      { opcion: "Útil",       n: 2, pct: 33.3 },
      { opcion: "Poco útil",  n: 0, pct: 0 },
    ],
    hallazgo: "100% considera útiles las alertas tempranas — validación total de la funcionalidad core.",
    color: "emerald",
  },
  {
    num: 10,
    img: "/pregunta10.png",
    texto: "¿Estaría dispuesto(a) a utilizar una plataforma tecnológica que ayude a monitorear el rendimiento académico estudiantil?",
    tipo: "nominal",
    filas: [
      { opcion: "Sí",      n: 5, pct: 83.3 },
      { opcion: "Tal vez", n: 1, pct: 16.7 },
      { opcion: "No",      n: 0, pct: 0 },
    ],
    hallazgo: "0% de rechazo — alta disposición tecnológica del equipo docente.",
    color: "teal",
  },
];

export const ENCUESTA_P11: string[] = [
  "Control digital de notas y asistencia de forma continua.",
  "Mayor apoyo y comunicación con las familias.",
  "Fomento de hábitos de estudio desde el hogar.",
  "Tutorías personalizadas por alumno.",
  "Uso de datos y tecnología para monitoreo académico.",
  "Estrategias dinámicas que motiven el aprendizaje.",
];

export const MODULOS: Modulo[] = [
  { letra: "A", nombre: "Recolección de Datos", color: "bg-blue-700", descripcion: "Integra asistencia, notas e incidencias desde Cubicol y nuevos registros digitales." },
  { letra: "B", nombre: "Procesamiento", color: "bg-indigo-700", descripcion: "Limpieza, normalización e integración de datos para el análisis." },
  { letra: "C", nombre: "Analítica ML", color: "bg-purple-700", descripcion: "Modelos de Machine Learning calculan el nivel de riesgo de bajo rendimiento académico de cada alumno." },
  { letra: "D", nombre: "Alertas Tempranas", color: "bg-red-700", descripcion: "Notificaciones automáticas a docentes y directivos sobre estudiantes en riesgo crítico." },
  { letra: "E", nombre: "Dashboard", color: "bg-emerald-700", descripcion: "Paneles visuales con reportes e indicadores clave para la toma de decisiones." },
];

export const TOC_CHAPTERS: TocChapter[] = [
  {
    num: "00",
    label: "Introducción",
    sections: [
      { label: "Motivación del proyecto", href: "#problema" },
      { label: "Sobre la institución", href: "#institucion" },
      { label: "Propuesta de valor", href: "#solucion" },
      { label: "La institución en campo", href: "#visita" },
      { label: "Equipo de investigación", href: "#equipo" },
    ],
  },
  {
    num: "01",
    label: "Análisis de Stakeholders",
    groups: [
      {
        label: "Entradas",
        color: "text-blue-600",
        sections: [
          { label: "Caso de negocio", href: "#canvas" },
          { label: "Factores ambientales", href: "#factores" },
        ],
      },
      {
        label: "Herramientas y Técnicas",
        color: "text-amber-600",
        sections: [
          { label: "Entrevista semi-estructurada", href: "#entrevista" },
          { label: "Mapa de Actores", href: "#mapa-actores" },
          { label: "Matriz de Poder e Interés", href: "#matriz-poder" },
          { label: "Análisis de Expectativas", href: "#expectativas" },
        ],
      },
      {
        label: "Salidas",
        color: "text-emerald-600",
        sections: [
          { label: "Registro de interesados", href: "#stakeholders" },
          { label: "Plan de Comunicación", href: "#comunicacion" },
          { label: "Seguimiento de Interesados", href: "#seguimiento" },
        ],
      },
    ],
  },
  {
    num: "02",
    label: "Análisis del Problema",
    groups: [
      { label: "Entradas", color: "text-blue-600", sections: [{ label: "Descripción de la problemática", href: "#p02-entradas" }] },
      { label: "Herramientas y Técnicas", color: "text-amber-600", sections: [
        { label: "Marco Lógico", href: "#p02-herramientas" },
        { label: "Encuesta Docente", href: "#p02-encuesta" },
      ] },
      { label: "Evidencias", color: "text-purple-600", sections: [
        { label: "Respuestas de Docentes", href: "#p02-evidencias" },
        { label: "Resultados por Pregunta", href: "#p02-resultados" },
      ] },
      { label: "Salidas", color: "text-emerald-600", sections: [{ label: "Problema Central", href: "#p02-salidas" }] },
    ],
  },
  {
    num: "03",
    label: "Análisis del Objetivo",
    groups: [
      { label: "Entradas", color: "text-blue-600", sections: [{ label: "Problema Central", href: "#p03-entradas" }] },
      { label: "Herramientas y Técnicas", color: "text-amber-600", sections: [
        { label: "Árbol de Objetivos", href: "#p03-herramientas" },
        { label: "Análisis SMART", href: "#p03-smart" },
      ] },
      { label: "Salidas", color: "text-emerald-600", sections: [{ label: "Objetivo Central", href: "#p03-salidas" }] },
    ],
  },
  {
    num: "04",
    label: "Análisis de Alternativa de Solución",
    groups: [
      { label: "Marco y Acciones", color: "text-blue-600", sections: [
        { label: "Objetivo y Acciones por Medio", href: "#p04-marco" },
        { label: "Identificación de Acciones", href: "#p04-acciones" },
      ] },
      { label: "Soluciones Alternativas", color: "text-amber-600", sections: [
        { label: "Definición de Soluciones", href: "#p04-alternativas" },
        { label: "Evaluación de Suficiencia", href: "#p04-evaluacion" },
      ] },
      { label: "Fases de Diseño", color: "text-purple-600", sections: [
        { label: "Design Thinking", href: "#p04-design-thinking" },
      ] },
    ],
  },
  {
    num: "05",
    label: "Línea Base del Alcance del Proyecto",
    groups: [
      { label: "Requisitos", color: "text-blue-600", sections: [
        { label: "Especificaciones del Sistema", href: "#p05-requisitos" },
        { label: "Planillas de Requisitos", href: "#p05-planillas" },
      ] },
      { label: "Estructura EDT", color: "text-amber-600", sections: [
        { label: "Diagrama del Sistema ML", href: "#p05-diagrama-edt" },
        { label: "Diccionario de EDT (SIA-T)", href: "#p05-diccionario" },
      ] },
    ],
  },
  {
    num: "06",
    label: "Línea Base del Cronograma del Proyecto",
    groups: [
      { label: "Planificación", color: "text-blue-600", sections: [
        { label: "Plan de Gestión del Cronograma", href: "#p06-cronograma" },
        { label: "Lista de Actividades (40)", href: "#p06-lista-actividades" },
      ] },
      { label: "Secuenciación & Estimación", color: "text-amber-600", sections: [
        { label: "Diagrama de Red (PDM)", href: "#p06-diagrama-red" },
        { label: "Estimación por Método PERT", href: "#p06-estimacion-pert" },
      ] },
      { label: "Cronograma & Control", color: "text-purple-600", sections: [
        { label: "Desarrollar Cronograma (Gantt)", href: "#p06-gantt" },
        { label: "Control de Desvíos (EVA)", href: "#p06-control-desvios" },
      ] },
    ],
  },
  {
    num: "07",
    label: "Línea Base de Costos del Proyecto",
    groups: [
      { label: "Planificación & Estimación", color: "text-blue-600", sections: [
        { label: "Plan de Gestión de Costos", href: "#p07-gestion-costos" },
        { label: "Estimación de Costos (PERT)", href: "#p07-estimacion-pert" },
      ] },
      { label: "Presupuesto", color: "text-amber-600", sections: [
        { label: "Determinación de Presupuesto", href: "#p07-presupuesto" },
        { label: "Distribución Temporal (Curva S)", href: "#p07-curva-s" },
      ] },
      { label: "Alineación y Cierre", color: "text-purple-600", sections: [
        { label: "Alineación SCRUM v2", href: "#p07-alineacion-scrum" },
        { label: "Conclusiones Financieras", href: "#p07-conclusiones" },
      ] },
    ],
  },
  {
    num: "08",
    label: "Video de Presentación de la Solución",
    groups: [
      { label: "Solución SIA-T", color: "text-[#0d7377]", sections: [
        { label: "Video de la Solución SIA-T", href: "#p08-video-solucion" },
        { label: "Estructura del Pitch Académico", href: "#p08-estructura-pitch" },
      ] },
    ],
  },
  {
    num: "",
    label: "Referencias Bibliográficas",
    sections: [{ label: "Referencias Bibliográficas", href: "#referencias" }],
  },
];

export const TOC_SECTIONS: TocSection[] = TOC_CHAPTERS.flatMap((ch) =>
  ch.groups ? ch.groups.flatMap((g) => g.sections) : (ch.sections ?? [])
);
