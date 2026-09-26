/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Reference {
  clave: string;
  texto: string;
}

export interface CanvasData {
  socios: string[];
  actividades: string[];
  recursos: string[];
  propuesta: string[];
  relacion: string[];
  canales: string[];
  segmentos: string[];
  costos: string[];
  ingresos: string[];
}

export interface Photo {
  src: string;
  caption: string;
}

export interface Stakeholder {
  nombre: string;
  cargo: string;
  contacto: string;
  rol: string;
  interes: string;
  poder: string;
  estrategia: string;
  estado: string;
  estadoColor: string;
}

export interface ActorItem {
  nombre: string;
  relacion: string;
}

export interface ActorZone {
  zona: string;
  color: string;
  colorTexto: string;
  colorBadge: string;
  descripcion: string;
  actores: ActorItem[];
}

export interface MonitoreoActor {
  nombre: string;
  estado: string;
  nivel: number;
  accion: string;
  color: string;
}

export interface Factor {
  factor: string;
  descripcion: string;
}

export interface PersonaEmpatia {
  usuario: string;
  cargo: string;
  color: string;
  colorBg: string;
  colorLabel: string;
  piensa: string[];
  ve: string[];
  dice: string[];
  frustraciones: string[];
  motivaciones: string[];
}

export interface HowMightWe {
  pregunta: string;
  insight: string;
  vinculo: string;
}

export interface SurveyRow {
  opcion: string;
  n: number;
  pct: number;
}

export interface EncuestaPregunta {
  num: number;
  img: string;
  texto: string;
  tipo: "nominal" | "likert";
  filas: SurveyRow[];
  hallazgo: string;
  color: string;
}

export interface Modulo {
  letra: string;
  nombre: string;
  color: string;
  descripcion: string;
}

export interface TocSection {
  label: string;
  href: string;
}

export interface TocGroup {
  label: string;
  color: string;
  sections: TocSection[];
}

export interface TocChapter {
  num: string;
  label: string;
  sections?: TocSection[];
  groups?: TocGroup[];
}
