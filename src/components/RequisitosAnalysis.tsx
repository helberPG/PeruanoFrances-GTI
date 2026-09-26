/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import {
  FileText,
  Database,
  Layers,
  CheckCircle2,
  ExternalLink,
  Search,
  Filter,
  Clock,
  Shield,
  Table,
  ChevronDown,
  ChevronUp,
  Info,
  Sliders,
  Users,
  Award,
  BookOpenCheck,
  Briefcase,
  Layers3,
  ListFilter,
  Check,
  Calendar,
  TrendingUp,
  Settings,
  Cpu,
  Gauge,
  Bell,
  Rocket,
  Server,
  BookOpen,
  Code2,
  Presentation,
  Palette,
  UserCheck,
  Monitor,
  Mail
} from "lucide-react";
import Cite from "./Cite";

interface Requirement {
  id: string; // REQ-01, RNF-01
  tipo: "Funcional" | "No Funcional";
  caso: string; // CU-01
  titulo: string;
  descripcion: string;
  justificacion: string;
  fuente: string;
  unidad: string;
  criterios: string;
  satisfaccion: number; // 1-5
  insatisfaccion: number; // 1-5
  dependencias: string;
  conflictos: string;
  soporte: string;
  categoria: "Recolección" | "Algoritmo" | "Alertas" | "Dashboard" | "Usabilidad" | "Seguridad" | "Cumplimiento" | "Rendimiento" | "Infraestructura";
}

interface EDTWorkPackage {
  id: string; // 1.1.1
  controlAccount: string; // 1.1
  titulo: string;
  responsable: string;
  fecha: string;
  descripcion: string;
  criterioAceptacion: string;
  entregables: string;
  supuestos: string;
  recursos: string;
  duracion: string;
  categoria: "Gestión" | "Datos" | "Modelado ML" | "Alertas" | "Despliegue" | "Capacitación";
}

export default function RequisitosAnalysis() {
  // Requirement states
  const [activeTab, setActiveTab] = useState<"todos" | "funcional" | "no-funcional">("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("Todas");
  const [expandedId, setExpandedId] = useState<string | null>("REQ-01");

  // EDT Image state
  const [edtImageUri, setEdtImageUri] = useState<string>("/Sistema ML – Diagrama de Proyecto.png");
  const [useInteractiveFallback, setUseInteractiveFallback] = useState<boolean>(false);

  // EDT Dictionary states
  const [edtSearch, setEdtSearch] = useState("");
  const [edtActiveCat, setEdtActiveCat] = useState<string>("Todas");
  const [edtExpandedId, setEdtExpandedId] = useState<string | null>("1.1.1");

  // EDT Tree highlighted parent
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const googleDocUri = "https://docs.google.com/document/d/1zlgbDf6TJQEyCT0cXs2hXvkgiy9CvxvK/edit?usp=sharing&ouid=107121906244921513138&rtpof=true&sd=true";
  const googleSheetUri = "https://docs.google.com/spreadsheets/d/1O8zNQFLdGbagfmUx7dz59Y51JzoM5kqF/edit?usp=sharing&ouid=107121906244921513138&rtpof=true&sd=true";

  // The 12 Functional and 8 Non-Functional requirements compiled from the provided system analysis
  const requisitosData: Requirement[] = [
    {
      id: "REQ-01",
      tipo: "Funcional",
      caso: "CU-01",
      titulo: "Integración de datos académicos multivariable",
      descripcion: "El sistema debe integrar los datos de asistencia, calificaciones, participación e incidencias desde los sistemas académicos existentes (Cubicol y registros físicos) en una base de datos centralizada única, evitando la duplicación y dispersión de la información académica de los 200 estudiantes.",
      justificacion: "Actualmente la información académica se encuentra fragmentada entre Cubicol, cuadernos físicos de asistencia y notificaciones de incidencias por WhatsApp, sin trazabilidad centralizada (Entrevista de campo, Abril 2026). El 66.7% de los docentes señala que necesita datos unificados multivariable para detectar oportunamente el riesgo académico (Encuesta Docente P6). Este requisito es la base de todo el sistema de recolección de datos.",
      fuente: "Promotora Directora / Área de TI",
      unidad: "Dirección Académica",
      criterios: "La base de datos centralizada debe consolidar el 100% de los registros de asistencia, notas e incidencias sin pérdida de información. La integración debe completarse sin generar registros duplicados ni huérfanos. Se validará mediante pruebas de reconciliación comparando los registros de origen (Cubicol, físicos) con la base de datos centralizada en tres fechas distintas.",
      satisfaccion: 5,
      insatisfaccion: 4,
      dependencias: "REQ-02, REQ-07",
      conflictos: "Ninguno",
      soporte: "Entrevista de campo Abril 2026; Encuesta Docente P6",
      categoria: "Recolección"
    },
    {
      id: "REQ-02",
      tipo: "Funcional",
      caso: "CU-02",
      titulo: "Limpieza y validación automatizada por Cron Job",
      descripcion: "El sistema debe ejecutar procesos automáticos nocturnos (Cron jobs) de limpieza, validación y corrección de inconsistencias en los datos académicos integrados, asegurando que la información utilizada por los modelos de Machine Learning sea consistente y confiable.",
      justificacion: "Los datos provenientes de fuentes manuales (cuadernos físicos, WhatsApp) presentan inconsistencias y errores de registro propios de un proceso 100% manual (Entrevista de campo, Abril 2026). Sin un proceso de limpieza automatizado, el modelo ML entrenaría con datos de baja calidad, afectando la precisión la predicción.",
      fuente: "Área de TI / Encargada de Cubicol",
      unidad: "Área de Tecnología",
      criterios: "El proceso de limpieza debe ejecutarse diariamente en horario nocturno sin afectar la disponibilidad del sistema durante el horario escolar. Debe detectar y reportar como mínimo: registros duplicados, valores nulos críticos e inconsistencias de fechas. Se validará revisando los logs de ejecución durante 15 días continuos sin fallos críticos.",
      satisfaccion: 5,
      insatisfaccion: 4,
      dependencias: "REQ-01",
      conflictos: "Ninguno",
      soporte: "Entrevista de campo Abril 2026; Manual técnico Cubicol",
      categoria: "Recolección"
    },
    {
      id: "REQ-03",
      tipo: "Funcional",
      caso: "CU-03",
      titulo: "Entrenamiento del algoritmo clasificador de niveles de riesgo ML",
      descripcion: "El sistema debe entrenar un modelo predictivo de Machine Learning con datos históricos académicos (asistencia, calificaciones e incidencias) para clasificar a cada uno de los 200 estudiantes en niveles de riesgo de bajo rendimiento académico: alto (rojo), medio (amarillo) y bajo (verde).",
      justificacion: "El 100% de los docentes encuestados reconoce que los problemas académicos se detectan tardíamente (Encuesta Docente P7, Abril 2026). El 83.3% acepta la solución ML como herramienta de mejora (Encuesta P8). La literatura científica respalda la efectividad del ML en la predicción del bajo rendimiento académico.",
      fuente: "Directorio Lógico (Árbol de Objetivos)",
      unidad: "Científico de Datos",
      criterios: "El modelo ML debe ser entrenado usando algoritmos de clasificación de Scikit-learn (como Random Forest o Gradient Boosting). La clasificación final debe generar de forma robusta las 3 etiquetas de riesgo especificadas. Se validará mediante validación cruzada y el informe técnico de precisión debidamente firmado.",
      satisfaccion: 5,
      insatisfaccion: 5,
      dependencias: "REQ-01, REQ-02",
      conflictos: "Ninguno",
      soporte: "Árbol de Objetivos Cap. 03; Encuesta Docente P7 Y P8",
      categoria: "Algoritmo"
    },
    {
      id: "REQ-04",
      tipo: "Funcional",
      caso: "CU-04",
      titulo: "Ejecución predictiva semanal programada",
      descripcion: "El sistema debe procesar predictivamente y de forma semanal los datos consolidados acumulados de todos los estudiantes activos, actualizando sus clasificaciones académicas en la base de datos de manera automatizada y desatendida.",
      justificacion: "Para garantizar que las alertas tempranas sean oportunas, las clasificaciones no pueden depender del entrenamiento o activación manual por el personal técnico. La retroalimentación oportuna en el 83.3% de los profesores demanda que la predicción llegue con periodicidad controlada.",
      fuente: "Subdirector / Coordinadores de CC. y LL.",
      unidad: "Dirección Académica",
      criterios: "La rutina predictiva debe ejecutarse de forma semanal (los días domingos por la noche), procesando el total de la matrícula estudiantil. Debe actualizar los valores en la tabla de resultados de riesgo con una duración inferior a 5 minutos. Se validará mediante logs de base de datos.",
      satisfaccion: 5,
      insatisfaccion: 3,
      dependencias: "REQ-03",
      conflictos: "Ninguno",
      soporte: "Encuesta Docente P10; Agenda pedagógica",
      categoria: "Algoritmo"
    },
    {
      id: "REQ-05",
      tipo: "Funcional",
      caso: "CU-05",
      titulo: "Generación de alertas automáticas inmediatas",
      descripcion: "El sistema debe iniciar e inyectar notificaciones automáticas inmediatas visibles en pantalla e emails institucionales dirigidos a docentes tutores y coordinadores pedagógicos cuando un alumno pase de riesgo bajo a riesgo medio o alto.",
      justificacion: "El problema de base es la notificación ausente al docente ante el riesgo inminente del alumno (Cap. 02, Cap. 03). El envío automático de alertas es el gatillador prioritario para activar los planes de intervención y acompañamiento escolar individualizado.",
      fuente: "Docentes Tutores / Coordinador de Nivel",
      unidad: "Plan de Tutoría",
      criterios: "Las alertas predictivas deben crearse en la base de datos en menos de 5 segundos tras procesar la predicción y enviarse por correo electrónico en menos de 24 horas. Deben registrar historial con fecha, rol del alumno, nivel detectado y estado (leído/no leído). Se validará a través de pruebas de envío SMTP.",
      satisfaccion: 5,
      insatisfaccion: 5,
      dependencias: "REQ-04",
      conflictos: "Ninguno",
      soporte: "Árbol de Objetivos; Entrevista de campo, Abril 2026",
      categoria: "Alertas"
    },
    {
      id: "REQ-06",
      tipo: "Funcional",
      caso: "CU-06",
      titulo: "Dashboard interactivo con semáforos de riesgo",
      descripcion: "El sistema debe proveer un panel de control interactivo (dashboard) con gráficos descriptivos en tiempo real y semáforos de riesgo (rojo, amarillo y verde) que clasifiquen a la población estudiantil agregada por grado y sección escolar.",
      justificacion: "La directora y el subdirector académico necesitan de una visualización ejecutiva, agregada y depurada que facilite la toma de decisiones estratégicas, asignando psicólogos y recursos específicos a los grados con mayores cuellos de botella.",
      fuente: "Promotora Directora / Subdirector",
      unidad: "Dirección General",
      criterios: "La interfaz web debe presentar indicadores gráficos interactivos (en Nevers/Next.js) con distribución de riesgo porcentual por aula. La actualización debe ser reactiva tras el procesamiento semanal. Se validará mediante pruebas funcionales de usabilidad con la directiva.",
      satisfaccion: 4,
      insatisfaccion: 3,
      dependencias: "REQ-04",
      conflictos: "Ninguno",
      soporte: "Entrevista de campo con la Directora (WhatsApp bimensual)",
      categoria: "Dashboard"
    },
    {
      id: "REQ-07",
      tipo: "Funcional",
      caso: "CU-07",
      titulo: "Lectura QR para control de asistencia presencial",
      descripcion: "El sistema debe ofrecer soporte para registrar inasistencias mediante dispositivos lectores ópticos o una interfaz de cámara que escanee códigos QR asignados a los estudiantes en sus credenciales, sincronizando el flujo de inmediato a la base de datos local.",
      justificacion: "En la entrevista con la Directora (Abril 2026), se priorizó explícitamente el uso de códigos QR para agilizar la entrada y automatizar el reporte de asistencia física. La inasistencia recurrente es el factor desencadenante del 70% de casos de riesgo académico (Marco Lógico).",
      fuente: "Promotora Directora / Auxiliares de Normas",
      unidad: "Normas de Asistencia",
      criterios: "El escáner de códigos QR debe realizar la identificación y registro del alumno en menos de 1.5 segundos. En caso de fallas de lectura, la interfaz del auxiliar debe permitir la inserción del código manualmente. Se validará mediante pruebas de velocidad presenciales en puerta de ingreso.",
      satisfaccion: 5,
      insatisfaccion: 2,
      dependencias: "REQ-01",
      conflictos: "Ninguno",
      soporte: "Entrevista de Campo, Abril 2026 (QR priorizado)",
      categoria: "Recolección"
    },
    {
      id: "REQ-08",
      tipo: "Funcional",
      caso: "CU-08",
      titulo: "Ficha del estudiante unificada de trazabilidad",
      descripcion: "El sistema debe proveer una vista dedicada individual (Ficha de Estudiante) donde se exhiba la traza histórica completa del alumno: evolución de promedios, récord acumulado de inasistencias, incidencias conductuales graves y un timeline de alertas disparadas.",
      justificacion: "Para que el docente tutor o psicólogo escolar diseñe la intervención, es mandatorio examinar el panorama general del alumno y no únicamente una alerta cruda aislada. Este es el entregable integrador del expediente computado.",
      fuente: "Psicólogo Escolar / Docentes Tutores",
      unidad: "Servicio de Psicopedagogía",
      criterios: "Al hacer clic sobre un alumno alertado en el dashboard, se cargará su ficha técnica unificada completa en menos de 2 segundos. Debe presentar de manera obligatoria las variables del comportamiento histórico. Se validará con flujos funcionales UX.",
      satisfaccion: 5,
      insatisfaccion: 4,
      dependencias: "REQ-01, REQ-06",
      conflictos: "Ninguno",
      soporte: "Foco de acompañamiento psicopedagógico (Cap. 01)",
      categoria: "Dashboard"
    },
    {
      id: "REQ-09",
      tipo: "Funcional",
      caso: "CU-09",
      titulo: "Generación de reportes PDF descargables",
      descripcion: "El sistema debe permitir a coordinadores de nivel y dirección descargar reportes ejecutivos consolidados en formato PDF que contengan estadísticas del riesgo general, evolución de alertas y efectividad de las intervenciones aplicadas.",
      justificacion: "Se requieren entregables físicos/digitales portables para ser discutidos en las reuniones bimestrales del consejo pedagógico institucional o ser archivados como documentos oficiales del colegio.",
      fuente: "Coordinadores Pedagógicos",
      unidad: "Coordinación de Ciencias y Letras",
      criterios: "La exportación del reporte general en el dashboard a PDF portátil debe completarse sin deformaciones visuales en menos de 5 segundos. El archivo resultante debe ser un archivo .pdf estándar que incluya gráficos y tablas legibles. Se validará mediante descarga.",
      satisfaccion: 4,
      insatisfaccion: 2,
      dependencias: "REQ-06, REQ-08",
      conflictos: "Ninguno",
      soporte: "Reuniones de Gestión Escolar del Colegio",
      categoria: "Dashboard"
    },
    {
      id: "REQ-10",
      tipo: "Funcional",
      caso: "CU-10",
      titulo: "Registro manual de bitácoras de intervención",
      descripcion: "El sistema debe permitir a los docentes tutores y al psicólogo escolar registrar de forma escrita las acciones de intervención preventiva aplicadas al alumno alertado (e.g., cita con apoderado, refuerzo académico), actualizando de forma bidireccional el estado del riesgo.",
      justificacion: "Para evaluar la eficacia de la alerta temprana, es mandatorio registrar si la retroalimentación condujo a una acción pedagógica. Sin este registro, no es factible dar seguimiento técnico a la rehabilitación escolar.",
      fuente: "Psicólogo Escolar / Docentes de Aula",
      unidad: "Plan de Tutoría Escolar",
      criterios: "La interfaz de la ficha de estudiante debe habilitar un formulario simplificado de inserción de bitácora (máximo 500 caracteres, fecha y tipología de acción). Una vez guardado, se indexará al timeline de forma síncrona. Se validará con pruebas de guardado en base de datos.",
      satisfaccion: 5,
      insatisfaccion: 3,
      dependencias: "REQ-08",
      conflictos: "Ninguno",
      soporte: "Plan de Acción de Tutoría y Orientación Educativa (TOE)",
      categoria: "Usabilidad"
    },
    {
      id: "REQ-11",
      tipo: "Funcional",
      caso: "CU-11",
      titulo: "Módulo de gestión de accesos diferenciados por rol",
      descripcion: "El sistema debe bloquear y habilitar las vistas e información del software conforme al rol del usuario autenticado (Director, Subdirector, Docente Tutor, Psicólogo, Administrador), previniendo el acceso no autorizado de usuarios genéricos.",
      justificacion: "La protección de datos de menores exige un riguroso control donde los auxiliares únicamente puedan visualizar datos de asistencia, mientras que datos psicopedagógicos sensibles queden restringidos al psicólogo escolar y directora académica (Ley N° 29733 de Protección de Datos).",
      fuente: "Promotora Directora / Responsable de TI",
      unidad: "Tecnología y Seguridad",
      criterios: "El sistema modular debe validar las credenciales de ingreso y aplicar políticas de autorización por rol. Un docente tutor no debe visualizar la sección de reconfiguración del modelo ML o accesos ajenos a sus grados asignados. Se validará recreando accesos cruzados.",
      satisfaccion: 5,
      insatisfaccion: 5,
      dependencias: "RNF-02, RNF-08",
      conflictos: "Ninguno",
      soporte: "Cumplimiento normativo y Ley N° 29733 (Cap. 01)",
      categoria: "Seguridad"
    },
    {
      id: "REQ-12",
      tipo: "Funcional",
      caso: "CU-12",
      titulo: "Notificaciones secundarias a familias vía WhatsApp",
      descripcion: "El sistema debe permitir disparar notificaciones simplificadas de alerta constructiva mediante APIs de mensajería (WhatsApp) dirigidas directamente al número asignado del padre o madre de familia si la alerta de riesgo persistiera de forma recurrente.",
      justificacion: "La inasistencia o baja de promedio detectada se mitiga notablemente al concientizar a la familia. El WhatsApp es el canal preferencial declarado para contactar de forma oportuna a la población de apoderados (Encuesta Stakeholders Cap. 01).",
      fuente: "Padres de Familia / Auxiliares",
      unidad: "Normatividad e Inclusión",
      criterios: "El despacho de mensajes a través de WhatsApp Web con plantillas predefinidas no debe generar recargos económicos críticos para la institución. Debe ser un proceso activable mediante clics controlados en la vista docente. Se validará mediante simulación de mensajes.",
      satisfaccion: 4,
      insatisfaccion: 2,
      dependencias: "REQ-05, REQ-06",
      conflictos: "Ninguno",
      soporte: "Mapeo de Canales Críticos de Comunicación (Cap. 01)",
      categoria: "Alertas"
    },
    {
      id: "RNF-01",
      tipo: "No Funcional",
      caso: "Garantía de Precisión",
      titulo: "Precisión mínima admisible del modelo predictivo (>= 75%)",
      descripcion: "El modelo predictivo de Machine Learning implementado localmente en Python/Scikit-learn debe reportar una precisión mayor o igual al 75% en las predicciones lógicas computadas de detección de estudiantes en riesgo académico.",
      justificacion: "Una precisión reducida genera un escenario de falsos positivos o falsos negativos masivos, saturando al psicólogo escolar de intervenciones estériles o dejando estudiantes vulnerables desamparados.",
      fuente: "Área de TI / Científico de Datos",
      unidad: "Área de Tecnología",
      criterios: "El entrenamiento semanal validará que la métrica F1-score y Precisión del algoritmo sea mayor o igual que 0.75 sobre el dataset de validación del Colegio Peruano Francés. Validado por el reporte de entrenamiento emitido localmente.",
      satisfaccion: 5,
      insatisfaccion: 5,
      dependencias: "REQ-03, REQ-04",
      conflictos: "Ninguno",
      soporte: "Criterio de sintonización metodológica (Cap. 03)",
      categoria: "Rendimiento"
    },
    {
      id: "RNF-02",
      tipo: "No Funcional",
      caso: "Soberanía de Datos",
      titulo: "Soberanía de datos sensibles locales (Cumplimiento Ley N° 29733)",
      descripcion: "El sistema se desplegará localmente en un servidor de la institución o VPS administrada (bajo Dokploy) de forma que el 100% de los datos personales sensibles de los alumnos permanezcan bajo la custodia del colegio, sin ser expuestos de forma de APIs cloud de terceros.",
      justificacion: "Cumplimiento normativo riguroso con la legislación peruana vigente aplicable a la custodia y tenencia de base de datos de menores (conforme a los lineamientos declarados de la Ley N° 29733).",
      fuente: "Promotora Directora / Ministerio de Educación",
      unidad: "Cumplimiento Legal",
      criterios: "Las contraseñas de las bases de datos PostgreSQL y logs deben residir en variables de entorno locales protegidas. Ningún trigger enviará datos crudos de nombres o notas a servidores remotos internacionales. Se validará mediante auditoría técnica de red local.",
      satisfaccion: 5,
      insatisfaccion: 5,
      dependencias: "REQ-11, RNF-08",
      conflictos: "Ninguno",
      soporte: "Ley de Protección de Datos Personales N° 29733",
      categoria: "Cumplimiento"
    },
    {
      id: "RNF-03",
      tipo: "No Funcional",
      caso: "Velocidad de Carga",
      titulo: "Velocidad y latencia de carga inferior a 3 segundos",
      descripcion: "La carga inicial de la aplicación web, el refresco interactivo de las vistas y la generación del panel bento general en tiempo real debe completarse en menos de 3 segundos bajo redes de conectividad del colegio.",
      justificacion: "Garantizar una óptima experiencia del usuario y viabilidad de adopción (Next.js/React con renderizado optimizado del lado del cliente) disminuyendo la lentitud percibida.",
      fuente: "Docentes de Aula / Coordinadores",
      unidad: "Infraestructura Técnica",
      criterios: "El primer despliegue sobre el servidor local de producción reportará un tiempo inferior a los 3 segundos en el Lighthouse Speed Index. Se validará con herramientas estándar del inspector del navegador.",
      satisfaccion: 4,
      insatisfaccion: 3,
      dependencias: "REQ-06, REQ-08",
      conflictos: "Ninguno",
      soporte: "Estándares Web y optimización Next.js / Vite",
      categoria: "Rendimiento"
    },
    {
      id: "RNF-04",
      tipo: "No Funcional",
      caso: "Disponibilidad Local",
      titulo: "Disponibilidad continua del servicio local del 99.5%",
      descripcion: "El software web local debe permanecer disponible para consulta y registro del personal autorizado durante todo el transcurso del horario escolar (7:30 AM a 6:00 PM Lunes a Viernes), con tolerancia cero a caídas prolongadas.",
      justificacion: "Bajo el enfoque de uso del QR en la puerta de entrada presencial diario, una interrupción de disponibilidad detiene el ingreso de los estudiantes y el normal funcionamiento del centro educativo.",
      fuente: "Auxiliares de Normas / Promotora Directora",
      unidad: "Dirección de Escuela",
      criterios: "El sistema no debe experimentar caídas acumuladas semanales superiores a 30 minutos escolares ordinarios. Se validará mediante un script automatizado local de ping (uptime) con alertas al encargado TI.",
      satisfaccion: 5,
      insatisfaccion: 4,
      dependencias: "REQ-07",
      conflictos: "Ninguno",
      soporte: "Garantía de conectividad fibra óptica Win 1000 Mbps",
      categoria: "Infraestructura"
    },
    {
      id: "RNF-05",
      tipo: "No Funcional",
      caso: "Diseño Adaptativo",
      titulo: "Interfaz de usuario responsive móvil/escritorio (Tailwind)",
      descripcion: "La interfaz gráfica del dashboard web debe moldearse de manera adaptativa a pantallas de computadoras, pizarras interactivas, tabletas y teléfonos celulares de los profesores tutores.",
      justificacion: "Los docentes consumen la información en computadoras de laboratorio, pero las auxiliares y el director consultan alertas desde teléfonos inteligentes portables mientras circulan por las aulas escolares.",
      fuente: "Docentes de Aula / Auxiliar de Asistencia",
      unidad: "Usabilidad UI",
      criterios: "La maquetación en Tailwind CSS debe soportar la escala responsiva de visualizaciones y mantener los targets de contacto a un mínimo de 44px de tamaño táctil. Se validará mediante simulaciones dinámicas.",
      satisfaccion: 4,
      insatisfaccion: 3,
      dependencias: "REQ-06, REQ-08",
      conflictos: "Ninguno",
      soporte: "Estándares de Accesibilidad W3C e interfaces móviles",
      categoria: "Usabilidad"
    },
    {
      id: "RNF-06",
      tipo: "No Funcional",
      caso: "Facilidad de Adopción",
      titulo: "Facilidad de uso con tiempo máximo de capacitación <= 2 horas",
      descripcion: "La visualización de semáforos, listados de estudiantes y carga de fichas individuales debe estar diseñada para requerir menos de 2 horas de capacitación docente para un uso autónomo y correcto.",
      justificacion: "El personal cuenta con tiempo limitado para inducción, y algunos profesores son ajenos al uso sofisticado de datos predictivos. Se necesita una curva de aprendizaje mínima y sumamente amigable.",
      fuente: "Docentes de Primaria y Secundaria",
      unidad: "Tutoría y Normas",
      criterios: "Al menos el 90% de los docentes tutores que asistan a la capacitación de inducción de 2 horas deben manifestar dominio autónomo en dos pruebas de consulta básicas simuladas. Se validará mediante encuestas de salida.",
      satisfaccion: 5,
      insatisfaccion: 4,
      dependencias: "REQ-06, REQ-10",
      conflictos: "Ninguno",
      soporte: "Facilidad de adopción metodológica PMBOK®",
      categoria: "Usabilidad"
    },
    {
      id: "RNF-07",
      tipo: "No Funcional",
      caso: "Escalabilidad Modular",
      titulo: "Código modular reutilizable y documentado en TypeScript",
      descripcion: "La estructura de desarrollo del frontend (Next.js/TSX) y el backend debe estar formalizada y desacoplada mediante componentes limpios e interfaces de types estrictas en TypeScript.",
      justificacion: "Al ser un prototipo diseñado por estudiantes universitarios (UNTELS), el proyecto debe ser de fácil mantención y ampliación para que futuros alumnos puedan incorporar nuevos algoritmos analíticos.",
      fuente: "Equipo de Desarrollo UNTELS / Área de TI",
      unidad: "Coordinación Tecnológica",
      criterios: "La estructura del software no superará las advertencias críticas del linter (ESLint / Compile tests) y contará con tipados estrictos en todo el flujo local de datos (Types.ts). Se validará con el build compilado.",
      satisfaccion: 4,
      insatisfaccion: 2,
      dependencias: "Ninguna",
      conflictos: "Ninguno",
      soporte: "Políticas de Calidad de Software Unificado",
      categoria: "Infraestructura"
    },
    {
      id: "RNF-08",
      tipo: "No Funcional",
      caso: "Encriptación Local",
      titulo: "Cifrado local de contraseñas de accesos de TI",
      descripcion: "Las claves de acceso y contraseñas de la base de datos PostgreSQL, los secretos del API SMTP de correos y los hashes de autenticación de directores y docentes deben ser encriptadas de forma unidireccional (vía algoritmos como bcrypt) en la base de datos local.",
      justificacion: "Evitar la filtración del acceso que comprometa el historial personal, notas del Cubicol y datos reservados de los menores y docentes.",
      fuente: "Responsable de TI / Subdirector",
      unidad: "Seguridad Digital",
      criterios: "Ninguna clave de usuario o del sistema residirá expresada en texto plano legible en ninguna tabla. Toda verificación de ingreso validará el hash correspondiente. Se validará mediante revisión selecta de base de datos.",
      satisfaccion: 5,
      insatisfaccion: 5,
      dependencias: "REQ-11",
      conflictos: "Ninguno",
      soporte: "Normativa de Seguridad de la Información (MinEdu)",
      categoria: "Seguridad"
    }
  ];

  // The 18 detailed Work Package entries compiled from "Diccionario de EDT"
  const edtDictionaryData: EDTWorkPackage[] = [
    {
      id: "1.1.1",
      controlAccount: "1.1",
      titulo: "Cronograma de Hitos clave",
      responsable: "Jhostin J. Galarza Camarena",
      fecha: "Junio 2026",
      descripcion: "Elaboración y actualización periódica del cronograma general del proyecto, detallando hitos fundamentales, fechas estimadas de entrega, duraciones y lógica relacional entre requerimientos.",
      criterioAceptacion: "El cronograma debe estar formalmente visado por el docente asesor de UNTELS y ser modificado sistemáticamente ante cualquier cambio en el plan.",
      entregables: "Cronograma de hitos detallado en formato Gantt con visualización de responsables y estado de avance del software.",
      supuestos: "El equipo dispone de herramientas de gestión de proyectos (Excel / ProjectLibre / Dokploy) de forma gratuita. Los plazos generales no sufrirán ampliaciones externas.",
      recursos: "1 Líder de proyecto, 1 Computadora con herramientas de diagramación.",
      duracion: "Durante todo el ciclo del proyecto (Monitoreo y reporte semanal)",
      categoria: "Gestión"
    },
    {
      id: "1.1.2",
      controlAccount: "1.1",
      titulo: "Informes de Avance de Entregas",
      responsable: "Jhostin J. Galarza Camarena",
      fecha: "Junio 2026",
      descripcion: "Confección y emisión biquincenal de informes estructurados de avance técnico detallando hitos cumplidos, riesgos identificados y acciones correctivas aplicadas dirigidas al docente asesor.",
      criterioAceptacion: "Los reportes deben entregarse conforme al calendario académico oficial del curso y reflejar el estado actual exacto del desarrollo tecnológico.",
      entregables: "Informe de avance consolidado firmado en formato digital Word/PDF por cada entrega parcial del curso universitarias.",
      supuestos: "El docente asesor suministra los contenidos mínimos o rúbricas de control con un mínimo de anticipación de una semana calendario.",
      recursos: "1 Redactor técnico, 1 Computadora con procesador de textos.",
      duracion: "Cada 2 semanas (Biquincenal)",
      categoria: "Gestión"
    },
    {
      id: "1.1.3",
      controlAccount: "1.1",
      titulo: "Actas de Reuniones y Control de Cambios",
      responsable: "Henry B. Nuñez Figueroa",
      fecha: "Junio 2026",
      descripcion: "Redacción permanente de actas correspondientes a reuniones presenciales o virtuales del equipo y control de solicitudes de alteración sobre el alcance, cronograma y entregables del código del SIA-T.",
      criterioAceptacion: "Todas las sesiones contarán con acta firmada por los asistentes. Cualquier cambio sobre el alcance de las 20 planillas y base de datos demandará justificación y firma aprobatoria.",
      entregables: "Bitácora en Word de actas foliada y registro riguroso de solicitudes de control de cambios aprobados.",
      supuestos: "El equipo sostiene reuniones de trabajo por lo menos una vez por semana. Los desacuerdos técnicos son gestionados por mayoría simple.",
      recursos: "1 Secretario del equipo de proyecto, Documentos de control, Computadora.",
      duracion: "Durante todo el proyecto (Registro síncrono tras reunión)",
      categoria: "Gestión"
    },
    {
      id: "1.2.1",
      controlAccount: "1.2",
      titulo: "Integración de Scripts ETL",
      responsable: "Fernando Medina Ccangri",
      fecha: "Junio 2026",
      descripcion: "Planificación y desarrollo de rutinas en Python (scripts de ETL relacional y Cron jobs) para la extracción, limpieza de duplicados y migración diaria automatizada de registros académicos de Cubicol hacia PostgreSQL.",
      criterioAceptacion: "El pipeline automatizado de integración de datos debe ejecutarse en menos de 15 minutos, ofrecer consistencia bidireccional, omitir duplicados de alumnos y reportar logs de depuración.",
      entregables: "Scripts de nivel técnico en Python debidamente documentados, triggers relacionales configurados en base de datos PostgreSQL local.",
      supuestos: "El Colegio Peruano Francés provee permisos de lectura de la base de datos técnica o API local de Cubicol.",
      recursos: "1 Desarrollador Backend, Computadora local con entorno ejecutándose en Python / Docker.",
      duracion: "15 días hábiles",
      categoria: "Datos"
    },
    {
      id: "1.2.2",
      controlAccount: "1.2",
      titulo: "Limpieza y Calidad de Datos históricos",
      responsable: "Fernando Medina Ccangri",
      fecha: "Junio 2026",
      descripcion: "Análisis preliminar, minería de datos, imputación de nulos y verificación de redundancias en promedios y asistencias escolares acumuladas de los tres últimos años académicos.",
      criterioAceptacion: "El dataset pulido final no presentará valores nulos en columnas críticas (promedios, faltas). Se acompañará de informe de indicadores de completitud general.",
      entregables: "Dataset (.csv / .sql) unificado depurado histórico, Reporte de calidad y depuración formal.",
      supuestos: "La plataforma Cubicol alberga por lo menos 3 años de datos continuos detallados del comportamiento de la matrícula escolar.",
      recursos: "1 Analista de datos, Computadora personal con Jupyter / Pandas configurado.",
      duracion: "10 días hábiles",
      categoria: "Datos"
    },
    {
      id: "1.3.1",
      controlAccount: "1.3",
      titulo: "Entrenamiento del Modelo ML",
      responsable: "Helber J. Perez Gutierrez",
      fecha: "Junio 2026",
      descripcion: "Generación, experimentación, entrenamiento de algoritmos de clasificación multiclase (como SVM, Random Forest, AdaBoost) usando Scikit-learn para segmentar el riesgo predictivo.",
      criterioAceptacion: "El modelo entrenado debe guardarse en extensiones de archivo serializadas compatibles (.pkl) y discriminar de manera precisa los 3 estados de riesgo solicitados.",
      entregables: "Archivo .pkl serializado del clasificador ML capacitado, Jupyter Notebook detallado de experimentación.",
      supuestos: "El dataset pulido (paquete 1.2.2) se halla disponible antes del inicio del entrenamiento predictivo.",
      recursos: "1 Científico de datos, Jupyter Notebook, Python y Scikit-learn instalados.",
      duracion: "12 días hábiles",
      categoria: "Modelado ML"
    },
    {
      id: "1.3.2",
      controlAccount: "1.3",
      titulo: "Clasificación de Riesgo predictivo",
      responsable: "Helber J. Perez Gutierrez",
      fecha: "Junio 2026",
      descripcion: "Escritura de la API o módulo local encargado de consumir semanalmente el archivo del clasificador para procesar la matraícula vigente, grabando puntuaciones de riesgo en PostgreSQL.",
      criterioAceptacion: "La rutina clasificatoria recopilará calificaciones vigentes e inasistencias y las rotulará semanalmente sin requerimiento de activación o mediación humana.",
      entregables: "Módulo back-end de predicción indexada ejecutado en base de datos local mediante llamadas automatizadas.",
      supuestos: "El pipeline de extracción ETL opera en correspondencia alimentando la base de datos de manera previa.",
      recursos: "1 Desarrollador de Inteligencia artificial, PostgreSQL local, API backend Python.",
      duracion: "8 días hábiles",
      categoria: "Modelado ML"
    },
    {
      id: "1.3.3",
      controlAccount: "1.3",
      titulo: "Validación de Precisión de Inteligencia Artificial",
      responsable: "Helber J. Perez Gutierrez",
      fecha: "Junio 2026",
      descripcion: "Validación cruzada de 5 pliegues (K-Fold CV), cálculo formal de métricas críticas de precisión (Precision, Recall, F1-score y matriz de confusión) sobre la data de prueba.",
      criterioAceptacion: "El algoritmo propuesto debe arrojar un porcentaje de acierto de predicción mínima del 75% (0.75 de F1-score mínimo) sobre los datos históricos de validación.",
      entregables: "Ficha oficial de métricas de precisión y validez con diagramas de confusión debidamente justificados.",
      supuestos: "Contamos con datos de estudiantes retirados que fracasaron materialmente en periodos previos para sintonizar el acierto algorítmico.",
      recursos: "1 Analista IA, Python y librerías estadísticas, Base de datos históricos.",
      duracion: "6 días hábiles",
      categoria: "Modelado ML"
    },
    {
      id: "1.4.1",
      controlAccount: "1.4",
      titulo: "Desarrollo del Motor de Alertas",
      responsable: "Fernando Medina Ccangri",
      fecha: "Junio 2026",
      descripcion: "Desarrollo de los triggers lógicos encargados de disparar el envío de correos automatizados (vía SMTP de la intranet) a docentes y coordinadores al detectarse alumnos de alto riesgo.",
      criterioAceptacion: "El correo electrónico debe generarse y despacharse antes de transcurrir 24 horas del procesamiento predictivo semanal e indexar histórico de despachos.",
      entregables: "Módulo de código del motor de alertas SMTP, Historial relacional de despacho de alertas.",
      supuestos: "La dirección del colegio provee las credenciales del servidor SMTP corporativo del dominio peruanofrances.edu.pe.",
      recursos: "1 Desarrollador Backend, Servidor SMTP, Acceso a PostgreSQL.",
      duracion: "10 días hábiles",
      categoria: "Alertas"
    },
    {
      id: "1.4.2.1",
      controlAccount: "1.4.2",
      titulo: "Diseño de Interfaz UX (Mockups)",
      responsable: "Henry B. Nuñez Figueroa",
      fecha: "Junio 2026",
      descripcion: "Elaboración de la maqueta digital e interfaz de usuario del dashboard principal del SIA-T: semáforos, listados de filtrado y ficha clínica unificada del alumno.",
      criterioAceptacion: "El diseño de alta fidelidad debe ser aprobado explícitamente en taller con al menos dos integrantes docentes antes del desarrollo de software.",
      entregables: "Mockups interactivos en herramienta de diseño Figma que cumplan con la guía visual e iconografía Lucide.",
      supuestos: "El equipo tiene acceso a la plataforma Figma de manera gratuita y cuenta con la paleta tipográfica escolar.",
      recursos: "1 Diseñador de interfaces (UIX), Herramientas Figma, Internet.",
      duracion: "8 días hábiles",
      categoria: "Alertas"
    },
    {
      id: "1.4.2.2",
      controlAccount: "1.4.2",
      titulo: "Desarrollo de Dashboard interactivo",
      responsable: "Henry B. Nuñez Figueroa",
      fecha: "Junio 2026",
      descripcion: "Desarrollo frontend en React con Next.js y Tailwind CSS del panel que exhibe las semaforizaciones de alertas académicas de los 200 estudiantes del colegio.",
      criterioAceptacion: "La aplicación debe registrar Lighthouse de rendimiento superior al 90% y cargarse en un lapso absoluto inferior a los 3 segundos en red local.",
      entregables: "Código fuente frontend web modular en repositorio Git unificado, Despliegue preliminar local.",
      supuestos: "Los mockups preliminares Figma (paquete 1.4.2.1) cuentan con la aprobación firmada de la gerencia técnica.",
      recursos: "1 Desarrollador Frontend, Entorno Node.js, Librerías React / Tailwind CSS.",
      duracion: "15 días hábiles",
      categoria: "Alertas"
    },
    {
      id: "1.4.2.3",
      controlAccount: "1.4.2",
      titulo: "Pruebas de Usabilidad del Dashboard",
      responsable: "Jhostin J. Galarza Camarena",
      fecha: "Junio 2026",
      descripcion: "Ejecución de simulaciones guiadas de usuario con el personal docente real para validar la interpretación intuitiva de semáforos, clicks y carga emocional de la interfaz.",
      criterioAceptacion: "El 90% de los docentes convocados debe navegar autónomamente el software tras recibir una inducción de un lapso no superior de 2 horas.",
      entregables: "Informe de diagnóstico de usabilidad detallando correcciones funcionales aplicadas e incidentes documentados.",
      supuestos: "El colegio otorga disponibilidad para convocar por lo menos a 3 profesores de aula de primaria y secundaria.",
      recursos: "1 Tester de experiencia de usuario (UX), Docente de prueba, Computadora con versión local de pruebas.",
      duracion: "5 días hábiles",
      categoria: "Alertas"
    },
    {
      id: "1.4.3",
      controlAccount: "1.4",
      titulo: "Módulo de Roles y Autenticación",
      responsable: "Jhostin J. Galarza Camarena",
      fecha: "Junio 2026",
      descripcion: "Desarrollo del módulo de ingreso de credenciales de usuario y control fino de accesos por roles (Director, Auxiliar, Coordinador, Tutor, Psicólogo).",
      criterioAceptacion: "Cada rol tendrá acceso únicamente a las secciones de la base de datos permitidas, encriptando las contraseñas lógicas de forma obligatoria en hash (bcrypt).",
      entregables: "Módulo backend de control de ingreso, Tablas relacionales de usuarios con políticas de accesos.",
      supuestos: "El listado oficial de roles y privilegios está visado por psicología y dirección (Cap. 01) previamente.",
      recursos: "1 Desarrollador backend de seguridad, Base de datos PostgreSQL, Librería de hashing.",
      duracion: "8 días hábiles",
      categoria: "Alertas"
    },
    {
      id: "1.5.1",
      controlAccount: "1.5",
      titulo: "Instalación en la Infraestructura del Colegio",
      responsable: "Fernando Medina Ccangri",
      fecha: "Junio 2026",
      descripcion: "Montaje, instalación física/digital del servidor, base de datos local PostgreSQL y despliegue del software mediante contenedores locales de Dokploy en el colegio.",
      criterioAceptacion: "El software debe estar 100% operativo en la red local del Colegio Peruano Francés sin reportar dependencias de nubes externas remuneradas.",
      entregables: "Servidor local provisto e instalado, Reporte técnico formal de instalación unificada y logs lógicos verdes.",
      supuestos: "El colegio suministra hardware que cumpla las especificaciones mínimas (8GB RAM, procesador multi-core) y acceso.",
      recursos: "1 Especialista de redes e infraestructura, Servidor local, Red interna.",
      duracion: "5 días hábiles",
      categoria: "Despliegue"
    },
    {
      id: "1.5.2",
      controlAccount: "1.5",
      titulo: "Manual de usuario",
      responsable: "Henry B. Nuñez Figueroa",
      fecha: "Junio 2026",
      descripcion: "Elaboración del manual de usuario dirigido a docentes y coordinadores, con lenguaje accesible, capturas de pantalla y guías paso a paso para el uso del sistema.",
      criterioAceptacion: "El manual debe cubrir todas las funcionalidades del sistema accesibles para docentes y coordinadores, y ser validado por al menos un usuario representativo.",
      entregables: "Manual de usuario en formato PDF/Word, revisado y aprobado por el área de TI de la institución.",
      supuestos: "El sistema está finalizado antes de la redacción del manual. Se cuenta con acceso a capturas de pantalla reales del sistema.",
      recursos: "1 redactor técnico, 1 computadora, procesador de texto, acceso al sistema.",
      duracion: "5 días hábiles",
      categoria: "Capacitación"
    },
    {
      id: "1.5.3",
      controlAccount: "1.5",
      titulo: "Manual técnico",
      responsable: "Helber J. Perez Gutierrez",
      fecha: "Junio 2026",
      descripcion: "Elaboración del manual técnico para el área de TI de la institución, documentando la arquitectura del sistema, instrucciones de instalación, configuración y mantenimiento.",
      criterioAceptacion: "El manual debe permitir al personal de TI instalar, configurar y mantener el sistema de forma autónoma. Validado por el área de TI.",
      entregables: "Manual técnico en formato PDF/Word con diagramas de arquitectura, pasos de instalación y guía de mantenimiento.",
      supuestos: "El área de TI participa en la revisión del manual antes de la entrega final.",
      recursos: "1 redactor técnico, 1 computadora, diagramas de arquitectura del sistema.",
      duracion: "5 días hábiles",
      categoria: "Capacitación"
    },
    {
      id: "1.5.4",
      controlAccount: "1.5",
      titulo: "Planificación de Capacitación básica",
      responsable: "Jhostin J. Galarza Camarena",
      fecha: "Junio 2026",
      descripcion: "Diseño instruccional de la agenda pedagógica de 2 horas para profesores, producción de material multimedia (pantallas paso-a-paso) y formatos impresos de control.",
      criterioAceptacion: "El plan debe estar visado por tutoría y subdirección general antes de convocar a los 16 docentes de aula del colegio.",
      entregables: "Agenda estructurada del taller de inducción de 2 horas, Diapositivas explicativas y lista impresa de firmas.",
      supuestos: "La dirección general escolar asigna la sala de cómputo y horario libre coincidente para congregar al profesorado.",
      recursos: "1 Diseñador educativo, Proyector local, Computadoras del laboratorio escolar.",
      duracion: "3 días hábiles (Preparación técnica)",
      categoria: "Capacitación"
    },
    {
      id: "1.5.5",
      controlAccount: "1.5",
      titulo: "Ejecución de Inducción y Acta de Aceptación",
      responsable: "Jhostin J. Galarza Camarena",
      fecha: "Junio 2026",
      descripcion: "Despliegue del taller de inducción para docentes, psicólogo, auxiliares y firma de la Entrega Formal y Acta de Aceptación de Cierre del software por la directora.",
      criterioAceptacion: "Por lo menos el 80% de los profesores firmarán asistencia, y la promotora directora firmará formalmente el acta de conformidad de Cierre del Proyecto.",
      entregables: "Lista de asistencia certificada con firmas, Acta de conformidad y cierre de proyecto SIA-T firmada en físico.",
      supuestos: "El sistema de Alera Temprana se desempeña de modo estable durante la simulación de entrada masiva de asistencia con los alumnos.",
      recursos: "4 Integrantes del equipo UNTELS, Sala escolar, Proyector de diapositivas, Acta física de cierre.",
      duracion: "2 días hábiles (Taller de cierre)",
      categoria: "Capacitación"
    }
  ];

  // Memoized lists
  const categories = useMemo(() => {
    const cats = new Set(requisitosData.map((req) => req.categoria));
    return ["Todas", ...Array.from(cats)];
  }, []);

  const filteredRequisitos = useMemo(() => {
    return requisitosData.filter((req) => {
      if (activeTab === "funcional" && req.tipo !== "Funcional") return false;
      if (activeTab === "no-funcional" && req.tipo !== "No Funcional") return false;
      if (selectedCategoria !== "Todas" && req.categoria !== selectedCategoria) return false;

      if (searchTerm.trim() !== "") {
        const query = searchTerm.toLowerCase();
        return (
          req.id.toLowerCase().includes(query) ||
          req.titulo.toLowerCase().includes(query) ||
          req.descripcion.toLowerCase().includes(query) ||
          req.justificacion.toLowerCase().includes(query) ||
          req.fuente.toLowerCase().includes(query) ||
          req.criterios.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [activeTab, searchTerm, selectedCategoria]);

  const filteredEDT = useMemo(() => {
    return edtDictionaryData.filter((wp) => {
      if (edtActiveCat !== "Todas" && wp.categoria !== edtActiveCat) return false;

      if (edtSearch.trim() !== "") {
        const query = edtSearch.toLowerCase();
        return (
          wp.id.toLowerCase().includes(query) ||
          wp.titulo.toLowerCase().includes(query) ||
          wp.descripcion.toLowerCase().includes(query) ||
          wp.responsable.toLowerCase().includes(query) ||
          wp.criterioAceptacion.toLowerCase().includes(query) ||
          wp.entregables.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [edtSearch, edtActiveCat]);

  return (
    <div className="animate-fade-in text-slate-805">
      {/* ── SECCIÓN 5.1: REQUISITOS (ESPECIFICACIONES DEL SISTEMA) ── */}
      <section id="p05-requisitos" className="py-14 bg-white border-b border-slate-200">
        <div className="px-6 sm:px-10 lg:px-12">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2">
            05 · Línea Base del Alcance del Proyecto · Requisitos de Software
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Línea Base del Alcance: 20 Especificaciones de Sistema
          </h2>
          <p className="text-slate-650 text-sm leading-relaxed max-w-4xl text-justify mb-8 font-medium">
            Acorde al estándar del <strong>PMBOK® 6.ª edición (PMI, 2017)</strong>, la Línea Base del Alcance del proyecto está constituida directamente por el Documento de Especificación de Requisitos y su respectiva Estructura de Desglose del Trabajo (EDT). Un levantamiento exhaustivo en la <strong>IEP Peruano Francés</strong> determinó un total de <strong>12 requerimientos funcionales</strong> y <strong>8 requerimientos no funcionales</strong> que unifican el control analítico de la matrícula escolar frente al riesgo de bajo rendimiento de los 200 alumnos <Cite r="PMI, 2017" />.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mb-12">
            <div className="border border-blue-150 bg-blue-50/20 p-5 rounded-2xl shadow-xxs">
              <div className="w-10 h-10 rounded-xl bg-blue-105 text-blue-700 flex items-center justify-center mb-4 shadow-xxs">
                <FileText className="w-5 h-5 animate-pulse" />
              </div>
              <h3 className="font-serif font-bold text-slate-910 text-sm mb-2">
                Documento de Requisitos (IEEE 830)
              </h3>
              <p className="text-xs text-slate-650 leading-relaxed text-justify">
                Cada especificación contempla trazabilidad directa a su origen (Gatilladores UX del Cap. 01) y planes de mitigación de cuellos de botella del Cap 02.
              </p>
            </div>

            <div className="border border-amber-200 bg-amber-50/10 p-5 rounded-2xl shadow-xxs">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 shadow-xxs">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-slate-910 text-sm mb-2">
                Trazabilidad Bidireccional
              </h3>
              <p className="text-xs text-slate-650 leading-relaxed text-justify">
                Integración de la RTM (Requirements Traceability Matrix) en Google Sheets que asocia requerimientos funcionales con objetivos SMART de gestión escolar (Cap. 03).
              </p>
            </div>

            <div className="border border-emerald-250 bg-emerald-50/20 p-5 rounded-2xl shadow-xxs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 shadow-xxs">
                <BookOpenCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-slate-910 text-sm mb-2">
                Formatos Compartidos
              </h3>
              <p className="text-xs text-slate-650 leading-relaxed text-justify font-medium">
                Soporte de planillas unificadas y descargables alojadas en el ecosistema de Google Drive para revisión técnica remota.
              </p>
            </div>
          </div>

          {/* DOCUMENT LINKS (DRIVE & SHEETS) */}
          <div className="mb-12 max-w-5xl">
            <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-black mb-4">
              Documentación Oficial y Matriz en Google Workspace
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {/* GOOGLE DOC CARD */}
              <a
                href={googleDocUri}
                target="_blank"
                rel="noreferrer"
                className="group border border-emerald-200 bg-white rounded-2xl p-5 hover:border-emerald-500 hover:shadow-md transition-all duration-300 flex items-start gap-4 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100/70 text-emerald-750 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200 shadow-xxs">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="font-mono text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200">
                      GOOGLE DOCS
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-650 transition-colors" />
                  </div>
                  <h4 className="font-serif font-bold text-slate-900 text-sm mb-1 group-hover:text-emerald-700 transition-colors">
                    Planilla Completa de Requisitos
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed text-justify">
                    Especificación de requisitos de software unificados bajo estándar IEEE 830, visada con firmas de equipo.
                  </p>
                </div>
              </a>

              {/* GOOGLE SHEET CARD */}
              <a
                href={googleSheetUri}
                target="_blank"
                rel="noreferrer"
                className="group border border-[#0d7377]/20 bg-white rounded-2xl p-5 hover:border-[#0d7377] hover:shadow-md transition-all duration-300 flex items-start gap-4 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-[#e8f5f5] text-[#0d7377] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200 shadow-xxs">
                  <Table className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="font-mono text-[9px] bg-[#e8f5f5] text-[#0d7377] font-bold px-2 py-0.5 rounded border border-[#c0e0e0]">
                      GOOGLE SHEETS
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0d7377] transition-colors" />
                  </div>
                  <h4 className="font-serif font-bold text-slate-900 text-sm mb-1 group-hover:text-[#0d7377] transition-colors">
                    Matriz de Trazabilidad RTM
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed text-justify">
                    Trazabilidad relacional bidireccional cruzando cada ID tecnológico con objetivos, entregable y fuente interesada.
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPANDABLE INTERACTIVE DIRECTORY OF REQUIREMENTS ── */}
      <section id="p05-planillas" className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="px-6 sm:px-10 lg:px-12">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2">
            05 · Línea Base del Alcance del Proyecto · Planillas Técnicas
          </span>
          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-3">
            Explorador de Requisitos Funcionales y No Funcionales (RTM)
          </h2>
          <p className="text-slate-650 text-sm leading-relaxed max-w-4xl text-justify mb-8 font-medium">
            Explore interactivamente el catálogo detallado de requisitos unificados del SIA-T. Filtre por tipo de requerimiento, busque por coincidencia de términos claves o examine el plan de criterios de validación escolar.
          </p>

          {/* INTERACTIVE CONTROLS CONTAINER */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-8 max-w-5xl shadow-xxs">
            <div className="flex flex-col gap-4">
              {/* TAB ROW */}
              <div className="flex flex-wrap gap-2 border-b border-slate-150 pb-4">
                <button
                  onClick={() => {
                    setActiveTab("todos");
                    setSelectedCategoria("Todas");
                  }}
                  className={`px-4 py-2 text-xs font-mono font-bold uppercase rounded-xl transition-all cursor-pointer ${
                    activeTab === "todos"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-50 border border-slate-150 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Todos los Requisitos ({requisitosData.length})
                </button>
                <button
                  onClick={() => {
                    setActiveTab("funcional");
                    setSelectedCategoria("Todas");
                  }}
                  className={`px-4 py-2 text-xs font-mono font-bold uppercase rounded-xl transition-all cursor-pointer ${
                    activeTab === "funcional"
                      ? "bg-blue-700 text-white shadow-xs"
                      : "bg-slate-50 border border-slate-150 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Funcionales (12)
                </button>
                <button
                  onClick={() => {
                    setActiveTab("no-funcional");
                    setSelectedCategoria("Todas");
                  }}
                  className={`px-4 py-2 text-xs font-mono font-bold uppercase rounded-xl transition-all cursor-pointer ${
                    activeTab === "no-funcional"
                      ? "bg-[#0d7377] text-white shadow-xs"
                      : "bg-slate-50 border border-slate-150 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  No Funcionales (8)
                </button>
              </div>

              {/* SEARCH & SELECT FILTERS */}
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search field */}
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar por ID, título, justificación..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0d7377]/40 focus:border-[#0d7377] transition-all"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650 text-xs font-black"
                    >
                      Limpiar
                    </button>
                  )}
                </div>

                {/* Categories selector */}
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-550 flex-shrink-0" />
                  <span className="text-xs font-mono font-bold text-slate-500 uppercase">Categoría:</span>
                  <select
                    value={selectedCategoria}
                    onChange={(e) => setSelectedCategoria(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0d7377]/40 focus:border-[#0d7377] transition-all cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* LIST RESULTS */}
          <div className="space-y-4 max-w-5xl">
            {filteredRequisitos.length === 0 ? (
              <div className="border border-slate-200 rounded-2xl p-10 text-center bg-white max-w-md mx-auto">
                <Info className="w-10 h-10 text-slate-350 mx-auto mb-3" />
                <p className="font-serif font-bold text-slate-700 text-sm mb-1">
                  Ningún requisito coincide
                </p>
                <p className="text-xs text-slate-500">
                  Pruebe adaptando el término de búsqueda o cambiando el filtro de categoría.
                </p>
              </div>
            ) : (
              filteredRequisitos.map((req) => {
                const isOpen = expandedId === req.id;
                return (
                  <div
                    key={req.id}
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 bg-white ${
                      isOpen
                        ? "border-slate-800 shadow-xs ring-1 ring-slate-800/10"
                        : "border-slate-200 hover:border-slate-400 hover:shadow-xs shadow-xxs"
                    }`}
                  >
                    {/* REQUIREMENT ACCORDION HEADER */}
                    <div
                      onClick={() => setExpandedId(isOpen ? null : req.id)}
                      className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`font-mono text-[9px] sm:text-[10px] uppercase font-black px-2.5 py-1 rounded-md flex-shrink-0 border ${
                            req.tipo === "Funcional"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-[#e8f5f5] text-[#0d7377] border-[#c0e0e0]"
                          }`}
                        >
                          {req.id}
                        </span>
                        <div className="min-w-0">
                          <p className="font-serif font-bold text-xs sm:text-sm text-slate-900 truncate">
                            {req.titulo}
                          </p>
                          <p className="text-[9px] text-slate-500 font-mono uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
                            <span>Módulo: {req.caso}</span>
                            <span className="text-slate-300">•</span>
                            <span>Categoría: {req.categoria}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[9px] bg-slate-100 text-slate-650 px-2 py-0.5 rounded hidden sm:inline border border-slate-200">
                          Prioridad: Alta
                        </span>
                        <div className="p-1 rounded-lg hover:bg-slate-100 text-slate-400">
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-slate-700" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-500" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* EXPANDED CONTENT DETAIL */}
                    {isOpen && (
                      <div className="px-5 pb-5 border-t border-slate-100 bg-slate-50/15 text-xs sm:text-xs">
                        <div className="grid md:grid-cols-2 gap-6 pt-5">
                          <div>
                            <h4 className="font-mono text-[9px] text-slate-500 uppercase tracking-wider font-extrabold mb-1.5 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                              Descripción de Especificación
                            </h4>
                            <p className="text-slate-750 text-justify leading-relaxed font-medium">
                              {req.descripcion}
                            </p>
                          </div>

                          <div>
                            <h4 className="font-mono text-[9px] text-slate-500 uppercase tracking-wider font-extrabold mb-1.5 flex items-center gap-1">
                              <Info className="w-3.5 h-3.5 text-slate-400" />
                              Justificación e Impacto (Cierre Clínico UX)
                            </h4>
                            <p className="text-slate-750 text-justify leading-relaxed italic">
                              "{req.justificacion}"
                            </p>
                          </div>
                        </div>

                        {/* Validation Criteria */}
                        <div className="mt-5 bg-white border border-slate-200 rounded-xl p-4 shadow-xxs">
                          <h4 className="font-mono text-[9px] text-slate-800 uppercase tracking-wider font-black mb-1.5 flex items-center gap-1">
                            <Sliders className="w-3.5 h-3.5 text-slate-600" />
                            Criterio de Aceptación & Validación
                          </h4>
                          <p className="text-slate-750 text-justify leading-relaxed font-semibold">
                            {req.criterios}
                          </p>
                        </div>

                        {/* Metadata grid attributes */}
                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-5 pt-4 border-t border-slate-100 text-[10px]">
                          <div>
                            <p className="text-slate-450 font-mono text-[8px] uppercase tracking-wider">
                              Fuente interesada
                            </p>
                            <p className="font-bold text-slate-800 mt-0.5">{req.fuente}</p>
                          </div>

                          <div>
                            <p className="text-slate-450 font-mono text-[8px] uppercase tracking-wider">
                              Unidad Propietaria
                            </p>
                            <p className="font-bold text-slate-850 mt-0.5">{req.unidad}</p>
                          </div>

                          <div>
                            <p className="text-slate-450 font-mono text-[8px] uppercase tracking-wider">
                              Validez de Interés
                            </p>
                            <p className="mt-1 flex gap-2 font-mono text-[8px] font-black">
                              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded">
                                Sat: {req.satisfaccion}/5
                              </span>
                              <span className="bg-rose-50 text-rose-800 border border-rose-200 px-1.5 py-0.5 rounded">
                                Ins: {req.insatisfaccion}/5
                              </span>
                            </p>
                          </div>

                          <div>
                            <p className="text-slate-450 font-mono text-[8px] uppercase tracking-wider">
                              Trazabilidad / Documento
                            </p>
                            <p className="font-bold text-slate-700 mt-0.5 truncate" title={req.soporte}>
                              {req.soporte}
                            </p>
                          </div>
                        </div>

                        {/* Dependencies & Conflicts */}
                        <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-slate-100 text-[9px] font-mono font-bold text-slate-500">
                          <p>
                            DEPENDENCIAS REQUERIDAS:{" "}
                            <span className="text-indigo-600 font-extrabold">{req.dependencias}</span>
                          </p>
                          <p>
                            CONFLICTOS DETECTADOS:{" "}
                            <span className="text-slate-800 font-black">{req.conflictos}</span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 5.2: DIAGRAMA DEL SISTEMA ML (EDT) ── */}
      <section id="p05-diagrama-edt" className="py-14 bg-white border-b border-slate-200">
        <div className="px-6 sm:px-10 lg:px-12">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2">
            05 · Línea Base del Alcance del Proyecto · Estructura EDT
          </span>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="font-serif text-3xl font-bold text-slate-900">
              Diagrama del Sistema ML (EDT)
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setUseInteractiveFallback(false)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                  !useInteractiveFallback
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-650 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                Imagen Oficial
              </button>
              <button
                onClick={() => setUseInteractiveFallback(true)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                  useInteractiveFallback
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-650 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                Estructura Interactiva
              </button>
            </div>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed max-w-4xl text-justify mb-8">
            La Estructura de Desglose del Trabajo (EDT) organiza de forma jerárquica el alcance total del esfuerzo educativo. Cada bloque representa un entregable concreto que mitiga la detección tardía del bajo rendimiento académico en el Colegio Peruano Francés.
          </p>

          {!useInteractiveFallback ? (
            <div className="border border-slate-200 bg-slate-50 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
              <img
                src={edtImageUri}
                alt="Diagrama del Sistema ML (EDT)"
                referrerPolicy="no-referrer"
                className="max-h-[500px] max-w-full object-contain rounded-lg shadow-sm border bg-white hover:scale-[1.01] transition-transform duration-300 cursor-pointer"
                onError={(e) => {
                  const currentSrc = e.currentTarget.src;
                  if (currentSrc.includes("/Sistema%20ML%20%E2%80%93%20Diagrama%20de%20Proyecto.png") || currentSrc.includes("Sistema%20ML%20%E2%80%93%20Diagrama%20de%20Proyecto.png") || currentSrc.includes("Sistema%20ML%20-%20Diagrama%20de%20Proyecto.png")) {
                    setEdtImageUri("/Sistema ML - Diagrama de Proyecto.png");
                  } else {
                    setUseInteractiveFallback(true);
                  }
                }}
              />
              <p className="text-slate-400 text-[10px] font-mono mt-3 text-center">
                Visualizando archivo de imagen: <code className="font-mono text-[10px] bg-slate-200 px-1 py-0.5 rounded text-slate-700">{edtImageUri.substring(1)}</code>. Use los botones superiores para alternar vistas.
              </p>
            </div>
          ) : (
            /* MAIN INTERACTIVE GRAPHIC WORKSPACE WITH MINIMUM WIDTH TO GUARANTEE INTEGRITY */
            <div className="w-full overflow-x-auto border border-slate-200 rounded-3xl p-6 bg-slate-50/55 shadow-xxs">
            <div className="min-w-[1240px] select-none py-4 relative font-sans">
              
              {/* === NIVEL 1 === */}
              <div className="relative flex items-center mb-6">
                {/* Level bracket left label */}
                <div className="w-[88px] relative flex-shrink-0 flex items-center justify-between font-mono text-[10px] font-black uppercase text-slate-500 border-r border-slate-250 pr-3 mr-4">
                  <span>NIVEL 1</span>
                  <span className="text-[12px] text-slate-350 font-normal">{"{"}</span>
                </div>
                
                {/* Parent node */}
                <div className="flex-1">
                  <div className="w-[520px] mx-auto bg-slate-900 text-white rounded-2xl p-3.5 border border-slate-950 shadow-md flex items-center gap-4 transition-all duration-300 hover:ring-2 hover:ring-slate-900/30">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/15">
                      <Monitor className="w-7 h-7 text-[#22d3ee] animate-pulse" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="bg-[#22d3ee]/20 text-[#22d3ee] text-[9px] font-mono px-2 py-0.5 rounded font-black">PROYECTO</span>
                      </div>
                      <h4 className="font-serif text-[13px] font-black tracking-normal leading-tight">
                        1. Sistema ML — Alerta Temprana Académica
                      </h4>
                      <p className="font-mono text-[9.5px] text-slate-400 leading-none">
                        Colegio Peruano Francés • UNTELS 2026
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nivel 1 to Nivel 2 connecting lines */}
              <div className="relative mb-6">
                <div className="w-0.5 h-6 bg-slate-400 mx-auto"></div>
                <div className="grid grid-cols-5 h-4 relative">
                  {/* Row-span connector horizontal line across columns */}
                  <div className="border-t border-slate-400 w-1/2 ml-auto h-full"></div>
                  <div className="border-t border-slate-400 w-full h-full"></div>
                  <div className="border-t border-slate-400 w-full h-full"></div>
                  <div className="border-t border-slate-400 w-full h-full"></div>
                  <div className="border-t border-slate-400 w-1/2 mr-auto h-full"></div>
                  
                  {/* Vertical ticks pointing to Nivel 2 cards */}
                  <div className="absolute top-0 left-0 right-0 bottom-0 grid grid-cols-5 pointer-events-none">
                    {[0, 1, 2, 3, 4].map((idx) => (
                      <div key={idx} className="w-0.5 h-4 bg-slate-400 mx-auto"></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* === NIVEL 2 === */}
              <div className="relative flex items-center mb-6">
                {/* Level bracket left label */}
                <div className="w-[88px] relative flex-shrink-0 flex items-center justify-between font-mono text-[10px] font-black uppercase text-slate-500 border-r border-slate-250 pr-3 mr-4">
                  <span>NIVEL 2</span>
                  <span className="text-[12px] text-slate-350 font-normal">{"{"}</span>
                </div>
                
                {/* Component cards row */}
                <div className="flex-1 grid grid-cols-5 gap-3.5">
                  {/* 1.1 GESTIÓN */}
                  <div className="border border-blue-300 bg-white hover:bg-blue-50/20 rounded-2xl p-3 flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xs min-h-20">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center border border-blue-200 flex-shrink-0">
                      <FileText className="w-5.5 h-5.5 text-blue-800" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-mono text-[9px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-black block w-max mb-1">1.1</span>
                      <h5 className="font-serif font-black text-slate-900 text-xs leading-tight">
                        Gestión del Proyecto
                      </h5>
                    </div>
                  </div>

                  {/* 1.2 DATOS */}
                  <div className="border border-cyan-300 bg-white hover:bg-cyan-50/20 rounded-2xl p-3 flex items-center gap-3 transition-all duration-350 hover:-translate-y-0.5 hover:shadow-xs min-h-20">
                    <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center border border-cyan-200 flex-shrink-0">
                      <Database className="w-5.5 h-5.5 text-cyan-800" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-mono text-[9px] bg-cyan-50 text-cyan-750 px-2 py-0.5 rounded font-black block w-max mb-1">1.2</span>
                      <h5 className="font-serif font-black text-slate-900 text-xs leading-tight">
                        Módulo de Integración de Datos
                      </h5>
                    </div>
                  </div>

                  {/* 1.3 EXPERIMENTO */}
                  <div className="border border-emerald-300 bg-white hover:bg-emerald-50/20 rounded-2xl p-3 flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xs min-h-20">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center border border-emerald-200 flex-shrink-0">
                      <Cpu className="w-5.5 h-5.5 text-emerald-800" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-mono text-[9px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-black block w-max mb-1">1.3</span>
                      <h5 className="font-serif font-black text-slate-900 text-xs leading-tight">
                        Modelo ML Predictivo
                      </h5>
                    </div>
                  </div>

                  {/* 1.4 PORTAFOLIO */}
                  <div className="border border-red-300 bg-white hover:bg-red-50/20 rounded-2xl p-3 flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xs min-h-20">
                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center border border-red-200 flex-shrink-0">
                      <Bell className="w-5.5 h-5.5 text-red-800" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-mono text-[9px] bg-red-50 text-red-800 px-2 py-0.5 rounded font-black block w-max mb-1">1.4</span>
                      <h5 className="font-serif font-black text-slate-900 text-xs leading-tight">
                        Alertas y Dashboard
                      </h5>
                    </div>
                  </div>

                  {/* 1.5 DESPLIEGUE */}
                  <div className="border border-purple-300 bg-white hover:bg-purple-50/20 rounded-2xl p-3 flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xs min-h-20">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center border border-purple-200 flex-shrink-0">
                      <Rocket className="w-5.5 h-5.5 text-purple-800" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-mono text-[9px] bg-purple-50 text-purple-800 px-2 py-0.5 rounded font-black block w-max mb-1">1.5</span>
                      <h5 className="font-serif font-black text-slate-900 text-xs leading-tight">
                        Implantación y Cierre
                      </h5>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nivel 2 to Nivel 3 sub-connectors */}
              <div className="flex pl-[106px] pointer-events-none select-none">
                <div className="flex-1 grid grid-cols-5 gap-3.5">
                  {/* 1.1 (3 children) lines */}
                  <div>
                    <div className="w-0.5 h-3 bg-blue-300 mx-auto"></div>
                    <div className="grid grid-cols-3 h-3 relative">
                      <div className="border-t border-blue-300 w-1/2 ml-auto"></div>
                      <div className="border-t border-blue-300 w-full"></div>
                      <div className="border-t border-blue-300 w-1/2 mr-auto"></div>
                    </div>
                    <div className="grid grid-cols-3 h-3">
                      <div className="w-0.5 h-3 bg-blue-300 mx-auto"></div>
                      <div className="w-0.5 h-3 bg-blue-300 mx-auto"></div>
                      <div className="w-0.5 h-3 bg-blue-300 mx-auto"></div>
                    </div>
                  </div>

                  {/* 1.2 (2 children) lines */}
                  <div>
                    <div className="w-0.5 h-3 bg-cyan-300 mx-auto"></div>
                    <div className="grid grid-cols-2 h-3 relative">
                      <div className="border-t border-cyan-300 w-1/2 ml-auto"></div>
                      <div className="border-t border-cyan-300 w-1/2 mr-auto"></div>
                    </div>
                    <div className="grid grid-cols-2 h-3">
                      <div className="w-0.5 h-3 bg-cyan-300 mx-auto"></div>
                      <div className="w-0.5 h-3 bg-cyan-300 mx-auto"></div>
                    </div>
                  </div>

                  {/* 1.3 (2 children) lines */}
                  <div>
                    <div className="w-0.5 h-3 bg-emerald-300 mx-auto"></div>
                    <div className="grid grid-cols-2 h-3 relative">
                      <div className="border-t border-emerald-300 w-1/2 ml-auto"></div>
                      <div className="border-t border-emerald-300 w-1/2 mr-auto"></div>
                    </div>
                    <div className="grid grid-cols-2 h-3">
                      <div className="w-0.5 h-3 bg-emerald-300 mx-auto"></div>
                      <div className="w-0.5 h-3 bg-emerald-300 mx-auto"></div>
                    </div>
                  </div>

                  {/* 1.4 (2 children) lines */}
                  <div>
                    <div className="w-0.5 h-3 bg-red-300 mx-auto"></div>
                    <div className="grid grid-cols-2 h-3 relative">
                      <div className="border-t border-red-300 w-1/2 ml-auto"></div>
                      <div className="border-t border-red-300 w-1/2 mr-auto"></div>
                    </div>
                    <div className="grid grid-cols-2 h-3">
                      <div className="w-0.5 h-3 bg-red-300 mx-auto"></div>
                      <div className="w-0.5 h-3 bg-red-300 mx-auto"></div>
                    </div>
                  </div>

                  {/* 1.5 (5 children) lines */}
                  <div>
                    <div className="w-0.5 h-3 bg-purple-300 mx-auto"></div>
                    <div className="grid grid-cols-5 h-3 relative">
                      <div className="border-t border-purple-300 w-1/2 ml-auto"></div>
                      <div className="border-t border-purple-300 w-full"></div>
                      <div className="border-t border-purple-300 w-full"></div>
                      <div className="border-t border-purple-300 w-full"></div>
                      <div className="border-t border-purple-300 w-1/2 mr-auto"></div>
                    </div>
                    <div className="grid grid-cols-5 h-3">
                      {[1, 2, 3, 4, 5].map((x) => (
                        <div key={x} className="w-0.5 h-3 bg-purple-300 mx-auto"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* === NIVEL 3 === */}
              <div className="relative flex items-center mb-6">
                {/* Level bracket left label */}
                <div className="w-[88px] relative flex-shrink-0 flex items-center justify-between font-mono text-[10px] font-black uppercase text-slate-500 border-r border-slate-250 pr-3 mr-4">
                  <span>NIVEL 3</span>
                  <span className="text-[12px] text-slate-350 font-normal">{"{"}</span>
                </div>
                
                {/* Child packages row */}
                <div className="flex-1 grid grid-cols-5 gap-3.5">
                  {/* Under 1.1 (3 children) */}
                  <div className="grid grid-cols-3 gap-1.5 matches-col">
                    {/* 1.1.1 */}
                    <div className="bg-white border hover:border-blue-450 rounded-xl p-2.5 flex flex-col items-center justify-between text-center min-h-[142px] transition-all hover:shadow-xxs border-blue-200">
                      <span className="font-mono text-[8.5px] font-extrabold text-blue-700 bg-blue-50 px-1 rounded">1.1.1</span>
                      <Calendar className="w-5 h-5 text-blue-600 mt-2" />
                      <h6 className="font-sans text-[10px] font-black text-slate-900 leading-tight mt-2 flex-grow flex items-center justify-center">
                        Cronograma de Hitos
                      </h6>
                    </div>
                    {/* 1.1.2 */}
                    <div className="bg-white border hover:border-blue-450 rounded-xl p-2.5 flex flex-col items-center justify-between text-center min-h-[142px] transition-all hover:shadow-xxs border-blue-200">
                      <span className="font-mono text-[8.5px] font-extrabold text-blue-700 bg-blue-50 px-1 rounded">1.1.2</span>
                      <TrendingUp className="w-5 h-5 text-blue-600 mt-2" />
                      <h6 className="font-sans text-[10px] font-black text-slate-900 leading-tight mt-2 flex-grow flex items-center justify-center">
                        Informes de Avance
                      </h6>
                    </div>
                    {/* 1.1.3 */}
                    <div className="bg-white border hover:border-blue-450 rounded-xl p-2.5 flex flex-col items-center justify-between text-center min-h-[142px] transition-all hover:shadow-xxs border-blue-200">
                      <span className="font-mono text-[8.5px] font-extrabold text-blue-700 bg-blue-50 px-1 rounded">1.1.3</span>
                      <FileText className="w-5 h-5 text-blue-600 mt-2" />
                      <h6 className="font-sans text-[10px] font-black text-slate-900 leading-tight mt-2 flex-grow flex items-center justify-center">
                        Actas y Control de Cambios
                      </h6>
                    </div>
                  </div>

                  {/* Under 1.2 (2 children) */}
                  <div className="grid grid-cols-2 gap-2 mt-0">
                    {/* 1.2.1 */}
                    <div className="bg-white border hover:border-cyan-455 rounded-xl p-2.5 flex flex-col items-center justify-between text-center min-h-[142px] transition-all hover:shadow-xxs border-cyan-200">
                      <span className="font-mono text-[8.5px] font-extrabold text-cyan-800 bg-cyan-50 px-1 rounded">1.2.1</span>
                      <Settings className="w-5 h-5 text-cyan-600 mt-2" />
                      <h6 className="font-sans text-[10px] font-black text-slate-900 leading-tight mt-2 flex-grow flex items-center justify-center">
                        Integración ETL
                      </h6>
                    </div>
                    {/* 1.2.2 */}
                    <div className="bg-white border hover:border-cyan-455 rounded-xl p-2.5 flex flex-col items-center justify-between text-center min-h-[142px] transition-all hover:shadow-xxs border-cyan-200">
                      <span className="font-mono text-[8.5px] font-extrabold text-cyan-850 bg-cyan-50 px-1 rounded">1.2.2</span>
                      <Check className="w-5 h-5 text-cyan-600 mt-2 bg-cyan-100 rounded-full p-0.5 border border-cyan-300" />
                      <h6 className="font-sans text-[10px] font-black text-slate-900 leading-tight mt-2 flex-grow flex items-center justify-center">
                        Módulo de Integración de Datos
                      </h6>
                    </div>
                  </div>

                  {/* Under 1.3 (2 children) */}
                  <div className="grid grid-cols-2 gap-2 mt-0">
                    {/* 1.3.1 */}
                    <div className="bg-white border hover:border-emerald-450 rounded-xl p-2.5 flex flex-col items-center justify-between text-center min-h-[142px] transition-all hover:shadow-xxs border-emerald-200">
                      <span className="font-mono text-[8.5px] font-extrabold text-emerald-800 bg-emerald-50 px-1 rounded">1.3.1</span>
                      <Cpu className="w-5 h-5 text-emerald-600 mt-2" />
                      <h6 className="font-sans text-[10px] font-black text-slate-900 leading-tight mt-2 flex-grow flex items-center justify-center">
                        Entrenamiento ML
                      </h6>
                    </div>
                    {/* 1.3.2 */}
                    <div className="bg-white border hover:border-emerald-450 rounded-xl p-2.5 flex flex-col items-center justify-between text-center min-h-[142px] transition-all hover:shadow-xxs border-emerald-200">
                      <span className="font-mono text-[8.5px] font-extrabold text-emerald-850 bg-emerald-50 px-1 rounded">1.3.2</span>
                      <Gauge className="w-5 h-5 text-emerald-600 mt-2" />
                      <h6 className="font-sans text-[10px] font-black text-slate-900 leading-tight mt-2 flex-grow flex items-center justify-center">
                        Clasificación de Riesgo
                      </h6>
                    </div>
                  </div>

                  {/* Under 1.4 (2 children) */}
                  <div className="grid grid-cols-2 gap-2 mt-0">
                    {/* 1.4.1 */}
                    <div className="bg-white border hover:border-red-450 rounded-xl p-2.5 flex flex-col items-center justify-between text-center min-h-[142px] transition-all hover:shadow-xxs border-red-200">
                      <span className="font-mono text-[8.5px] font-extrabold text-red-800 bg-red-50 px-1 rounded">1.4.1</span>
                      <Mail className="w-5 h-5 text-red-600 mt-2" />
                      <h6 className="font-sans text-[10px] font-black text-slate-900 leading-tight mt-2 flex-grow flex items-center justify-center">
                        Motor de Alertas
                      </h6>
                    </div>
                    {/* 1.4.2 Dashboard Web */}
                    <div className="bg-white border-2 border-dashed border-red-400 bg-red-50/5 hover:border-solid rounded-xl p-2.5 flex flex-col items-center justify-between text-center min-h-[142px] transition-all hover:shadow-xxs">
                      <span className="font-mono text-[8.5px] font-extrabold text-red-800 bg-red-105 px-1 rounded">1.4.2</span>
                      <Monitor className="w-5 h-5 text-red-600 mt-2" />
                      <h6 className="font-sans text-[10.5px] font-black text-slate-955 leading-tight mt-2 flex-grow flex items-center justify-center">
                        Dashboard Web
                      </h6>
                    </div>
                  </div>

                  {/* Under 1.5 (5 children) */}
                  <div className="grid grid-cols-5 gap-1 mt-0">
                    {/* 1.5.1 */}
                    <div className="bg-white border hover:border-purple-450 rounded-xl p-1.5 flex flex-col items-center justify-between text-center min-h-[142px] transition-all hover:shadow-xxs border-purple-200">
                      <span className="font-mono text-[7.5px] font-extrabold text-purple-750 bg-purple-50 px-1 rounded">1.5.1</span>
                      <Server className="w-4 h-4 text-purple-600 mt-1" />
                      <p className="font-sans text-[9px] font-bold text-slate-800 leading-tight mt-2 flex-grow flex items-center justify-center">
                        Despliegue del Sistema
                      </p>
                    </div>
                    {/* 1.5.2 */}
                    <div className="bg-white border hover:border-purple-450 rounded-xl p-1.5 flex flex-col items-center justify-between text-center min-h-[142px] transition-all hover:shadow-xxs border-purple-200">
                      <span className="font-mono text-[7.5px] font-extrabold text-purple-750 bg-purple-50 px-1 rounded">1.5.2</span>
                      <BookOpen className="w-4 h-4 text-purple-600 mt-1" />
                      <p className="font-sans text-[9px] font-bold text-slate-800 leading-tight mt-2 flex-grow flex items-center justify-center">
                        Manual de Usuario
                      </p>
                    </div>
                    {/* 1.5.3 */}
                    <div className="bg-white border hover:border-purple-450 rounded-xl p-1.5 flex flex-col items-center justify-between text-center min-h-[142px] transition-all hover:shadow-xxs border-purple-200">
                      <span className="font-mono text-[7.5px] font-extrabold text-purple-750 bg-purple-50 px-1 rounded">1.5.3</span>
                      <Code2 className="w-4 h-4 text-purple-600 mt-1" />
                      <p className="font-sans text-[9px] font-bold text-slate-800 leading-tight mt-2 flex-grow flex items-center justify-center">
                        Manual Técnico
                      </p>
                    </div>
                    {/* 1.5.4 */}
                    <div className="bg-white border hover:border-purple-450 rounded-xl p-1.5 flex flex-col items-center justify-between text-center min-h-[142px] transition-all hover:shadow-xxs border-purple-200">
                      <span className="font-mono text-[7.5px] font-extrabold text-purple-750 bg-purple-50 px-1 rounded">1.5.4</span>
                      <Presentation className="w-4 h-4 text-purple-600 mt-1" />
                      <p className="font-sans text-[9px] font-bold text-slate-800 leading-tight mt-2 flex-grow flex items-center justify-center">
                        Plan de Capacitación
                      </p>
                    </div>
                    {/* 1.5.5 */}
                    <div className="bg-white border hover:border-purple-450 rounded-xl p-1.5 flex flex-col items-center justify-between text-center min-h-[142px] transition-all hover:shadow-xxs border-purple-200">
                      <span className="font-mono text-[7.5px] font-extrabold text-purple-750 bg-purple-50 px-1 rounded">1.5.5</span>
                      <Users className="w-4 h-4 text-purple-600 mt-1" />
                      <p className="font-sans text-[9px] font-bold text-slate-800 leading-tight mt-2 flex-grow flex items-center justify-center">
                        Capacitación a Docentes y Cierre
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nivel 3 to Nivel 4 red connectors under 1.4.2 */}
              <div className="flex pl-[106px] pointer-events-none select-none">
                <div className="flex-1 grid grid-cols-5 gap-3.5">
                  <div className="col-span-3"></div> {/* Empty under 1.1, 1.2, 1.3 */}
                  
                  {/* Under 1.4 */}
                  <div className="grid grid-cols-2 gap-2">
                    <div></div> {/* Under 1.4.1 */}
                    
                    {/* Under 1.4.2 Dashboard Web */}
                    <div className="relative">
                      <div className="w-0.5 h-6 bg-red-400 mx-auto"></div>
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[240px] z-10">
                        {/* Horizontal red divider */}
                        <div className="grid grid-cols-3 h-3 relative">
                          <div className="border-t-2 border-red-400 w-1/2 ml-auto"></div>
                          <div className="border-t-2 border-red-400 w-full"></div>
                          <div className="border-t-2 border-red-400 w-1/2 mr-auto"></div>
                        </div>
                        {/* Lower vertical prongs */}
                        <div className="grid grid-cols-3 h-3">
                          <div className="w-0.5 h-3 bg-red-400 mx-auto"></div>
                          <div className="w-0.5 h-3 bg-red-400 mx-auto"></div>
                          <div className="w-0.5 h-3 bg-red-400 mx-auto"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div></div> {/* Under 1.5 */}
                </div>
              </div>

              {/* === NIVEL 4 === */}
              <div className="relative flex items-center mt-6">
                {/* Level bracket left label */}
                <div className="w-[88px] relative flex-shrink-0 flex items-center justify-between font-mono text-[10px] font-black uppercase text-slate-500 border-r border-slate-250 pr-3 mr-4">
                  <span>NIVEL 4</span>
                  <span className="text-[12px] text-slate-350 font-normal">{"{"}</span>
                </div>
                
                {/* Dashboard Nivel 4 sub-grid & Legend bottom-left */}
                <div className="flex-1 grid grid-cols-5 gap-3.5 items-end">
                  
                  {/* LEYENDA BOX IN BOTTOM LEFT (Cols 1 & 2) */}
                  <div className="col-span-2 bg-white border border-slate-250 rounded-2xl p-4 shadow-xxs">
                    <span className="font-mono text-[9px] uppercase tracking-widest font-black text-slate-450 block mb-3 border-b pb-1.5 font-bold">
                      LEYENDA DEL DIAGRAMA EDT
                    </span>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10.5px]">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-slate-900 rounded border border-slate-950 flex-shrink-0 font-bold"></div>
                        <span className="text-slate-700 font-bold">Nivel 1 – Proyecto</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-white rounded border border-blue-400 flex-shrink-0"></div>
                        <span className="text-slate-700">Nivel 2 – Componentes EDT</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-105 rounded border border-blue-300 flex-shrink-0"></div>
                        <span className="text-slate-600">Nivel 3 – Paquetes (Nivel 2)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-white rounded border border-red-400 flex-shrink-0 border-2 border-dashed"></div>
                        <span className="text-slate-700 font-semibold">Nivel 4 – Paquetes (Finales)</span>
                      </div>
                    </div>
                  </div>

                  {/* Empty Spacer (Col 3) */}
                  <div></div>

                  {/* Under 1.4.2 Dashboard Sub-packages (Col 4) */}
                  <div className="relative">
                    <div className="absolute -top-[16px] left-1/2 -translate-x-1/2 w-[240px]">
                      <div className="grid grid-cols-3 gap-1.5">
                        {/* 1.4.2.1 */}
                        <div className="bg-white border hover:border-red-500 rounded-xl p-2 flex flex-col items-center justify-between text-center min-h-[142px] transition-all hover:shadow-xxs border-red-300">
                          <span className="font-mono text-[7.5px] font-extrabold text-red-800 bg-red-50 px-1 rounded">1.4.2.1</span>
                          <Palette className="w-4 h-4 text-red-500 mt-1" />
                          <p className="font-sans text-[8.5px] font-black text-slate-800 leading-snug mt-1.5 flex-grow flex items-center justify-center">
                            Diseño de Interfaz
                          </p>
                        </div>
                        {/* 1.4.2.2 */}
                        <div className="bg-white border hover:border-red-500 rounded-xl p-2 flex flex-col items-center justify-between text-center min-h-[142px] transition-all hover:shadow-xxs border-red-300">
                          <span className="font-mono text-[7.5px] font-extrabold text-red-800 bg-red-50 px-1 rounded">1.4.2.2</span>
                          <Code2 className="w-4 h-4 text-red-500 mt-1" />
                          <p className="font-sans text-[8.5px] font-black text-slate-800 leading-snug mt-1.5 flex-grow flex items-center justify-center">
                            Desarrollo Frontend
                          </p>
                        </div>
                        {/* 1.4.2.3 */}
                        <div className="bg-white border hover:border-red-500 rounded-xl p-2 flex flex-col items-center justify-between text-center min-h-[142px] transition-all hover:shadow-xxs border-red-300 font-semibold">
                          <span className="font-mono text-[7.5px] font-extrabold text-red-800 bg-red-50 px-1 rounded">1.4.2.3</span>
                          <UserCheck className="w-4 h-4 text-red-500 mt-1" />
                          <p className="font-sans text-[8.5px] font-black text-slate-800 leading-snug mt-1.5 flex-grow flex items-center justify-center">
                            Pruebas de Usuario
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Column 5 is empty */}
                  <div></div>
                </div>
              </div>

            </div>
          </div>
          )}
        </div>
      </section>

      {/* ── SECCIÓN 5.3: DICCIONARIO DE EDT (SIA-T) ── */}
      <section id="p05-diccionario" className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="px-6 sm:px-10 lg:px-12">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2">
            05 · Línea Base del Alcance del Proyecto · Diccionario de EDT
          </span>
          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-2">
            Diccionario de la EDT del SIA-T
          </h2>
          <p className="text-slate-655 text-sm leading-relaxed max-w-4xl text-justify mb-8 font-medium">
            El Diccionario de EDT describe detalladamente el trabajo técnico obligatorio para cada paquete de trabajo, incluyendo Criterios de Aceptación, Productos Entregables, Supuestos de Partida, Recursos Asignados directos y Duración estimada.
          </p>

          {/* SEARCH & FILTERS FOR EDT DICCIONARIO */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-8 max-w-5xl shadow-xxs">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-450" />
                <input
                  type="text"
                  placeholder="Buscar en Diccionario por ID, título, responsable..."
                  value={edtSearch}
                  onChange={(e) => setEdtSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-10 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0d7377]/30 transition-all font-sans"
                />
              </div>

              {/* HORIZONTAL CATEGORY SWITCHER */}
              <div className="flex flex-wrap gap-1.5">
                {["Todas", "Gestión", "Datos", "Modelado ML", "Alertas", "Despliegue", "Capacitación"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setEdtActiveCat(cat)}
                    className={`px-3 py-1.5 text-[10px] font-mono font-bold uppercase rounded-lg transition-all cursor-pointer ${
                      edtActiveCat === cat
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-slate-50 border border-slate-150 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* DICCIONARIO GRID CARDS */}
          <div className="space-y-4 max-w-5xl">
            {filteredEDT.length === 0 ? (
              <div className="border border-slate-200 rounded-2xl p-10 text-center bg-white max-w-md mx-auto">
                <Info className="w-10 h-10 text-slate-350 mx-auto mb-3" />
                <p className="font-serif font-bold text-slate-700 text-sm mb-1">
                  Ningún paquete de trabajo coincide
                </p>
                <p className="text-xs text-slate-500">
                  Pruebe reiniciando los filtros o escribiendo otros términos en la búsqueda.
                </p>
              </div>
            ) : (
              filteredEDT.map((wp) => {
                const isOpen = edtExpandedId === wp.id;
                return (
                  <div
                    key={wp.id}
                    className={`border rounded-2xl bg-white overflow-hidden transition-all duration-300 ${
                      isOpen
                        ? "border-slate-800 shadow-sm ring-1 ring-slate-800/10"
                        : "border-slate-250 hover:border-slate-350 shadow-xxs"
                    }`}
                  >
                    <div
                      onClick={() => setEdtExpandedId(isOpen ? null : wp.id)}
                      className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="font-mono text-[10px] font-black bg-slate-100 border px-2 py-0.5 rounded text-slate-700">
                          ID: {wp.id}
                        </span>
                        <div className="min-w-0">
                          <p className="font-serif font-black text-xs sm:text-sm text-slate-950">
                            {wp.titulo}
                          </p>
                          <p className="text-[9px] text-slate-500 font-mono uppercase tracking-wider mt-0.5">
                            Responsable: <span className="font-bold text-slate-700">{wp.responsable}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[9px] bg-slate-50 border border-slate-200 text-slate-650 px-2 py-0.5 rounded hidden sm:inline">
                          Duración: {wp.duracion === "15 días hábiles" ? "15d" : wp.duracion === "10 días hábiles" ? "10d" : "Fase"}
                        </span>
                        <div className="p-1 rounded-lg hover:bg-slate-100 text-slate-400">
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-slate-800" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-500" />
                          )}
                        </div>
                      </div>
                    </div>

                    {isOpen && (
                      <div className="px-5 pb-5 border-t border-slate-100 bg-slate-50/15 text-xs sm:text-xs">
                        <div className="grid md:grid-cols-2 gap-6 pt-5">
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-mono text-[9px] text-slate-450 uppercase tracking-widest font-black mb-1 flex items-center gap-1.5">
                                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                                DESCRIPCIÓN OPERATIVA DEL TRABAJO
                              </h5>
                              <p className="text-slate-750 text-justify leading-relaxed font-semibold">
                                {wp.descripcion}
                              </p>
                            </div>

                            <div>
                              <h5 className="font-mono text-[9px] text-slate-450 uppercase tracking-widest font-black mb-1 flex items-center gap-1.5">
                                <Sliders className="w-3.5 h-3.5 text-slate-400" />
                                CRITERIOS EXIGIDOS DE ACEPTACIÓN
                              </h5>
                              <p className="text-slate-700 text-justify leading-relaxed">
                                {wp.criterioAceptacion}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <h5 className="font-mono text-[9px] text-slate-450 uppercase tracking-widest font-black mb-1">
                                PRODUCTOS ENTREGABLES CLAVE
                              </h5>
                              <p className="text-slate-800 text-justify font-medium">
                                - {wp.entregables}
                              </p>
                            </div>

                            <div className="bg-white border p-3 rounded-xl shadow-xxs grid grid-cols-2 gap-3 text-[11px]">
                              <div>
                                <span className="text-slate-400 font-mono text-[8px] uppercase tracking-wider block">
                                  Cuenta Control
                                </span>
                                <span className="font-bold text-slate-800">{wp.controlAccount}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 font-mono text-[8px] uppercase tracking-wider block">
                                  Última versión
                                </span>
                                <span className="font-bold text-slate-800">{wp.fecha}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 font-mono text-[8px] uppercase tracking-wider block">
                                  Personal Asignado
                                </span>
                                <span className="font-bold text-slate-800 leading-none block mt-0.5 truncate" title={wp.recursos}>{wp.recursos.split(",")[0]}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 font-mono text-[8px] uppercase tracking-wider block">
                                  Duración del esfuerzo
                                </span>
                                <span className="font-bold text-emerald-800">{wp.duracion}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] font-mono leading-relaxed text-slate-550 italic text-justify">
                          <strong>SUPUESTOS DE ACTIVIDAD:</strong> "{wp.supuestos}"
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
