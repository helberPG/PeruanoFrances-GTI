/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Clock,
  Search,
  List,
  MessageSquare,
  Sparkles,
  Award,
  ChevronRight,
  TrendingUp,
  Cpu,
  Monitor,
  ShieldCheck,
  Zap,
  RotateCcw,
  BookOpen,
  FileVideo,
  Bookmark,
  Info,
  Layers,
  Sliders
} from "lucide-react";

interface VideoSegment {
  id: number;
  chapter: string;
  title: string;
  start: number; // in seconds
  end: number; // in seconds
  slideTitle: string;
  description: string;
  bullets: string[];
  transcript: string[];
  visualTheme: "orange" | "slate" | "green" | "purple";
  badge: string;
}

export default function VideoPresentation() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"visualizer" | "transcript" | "info">("visualizer");
  const [playerView, setPlayerView] = useState<"video" | "slides">("video");
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1); // value between 0 and 1
  const [videoError, setVideoError] = useState<boolean>(false);
  const [videoDuration, setVideoDuration] = useState<number>(479); // Default fallback duration

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // Video Path configured for easy local placement
  const VIDEO_SRC = "/SIA-T__Alerta_TempranaVIDEOSOLUCION.mp4";

  // Data for Video Segments (0:00 - 7:59)
  const SEGMENTS: VideoSegment[] = [
    {
      id: 1,
      chapter: "Sección 1",
      title: "El Reto Académico",
      start: 0,
      end: 102, // 0:00 - 1:42
      slideTitle: "El Reto Académico: Reactivo a Predictivo",
      badge: "EL PROBLEMA",
      description: "El gran obstáculo en el seguimiento escolar tradicional es el tiempo. Las alertas de bajo rendimiento usualmente se conocen cuando ya se imprimen las libretas al final del trimestre, impidiendo actuar oportunamente.",
      bullets: [
        "4 de cada 43 alumnos en la base de datos de prueba se encuentran en riesgo inminente de reprobación.",
        "El modelo tradicional oculta este riesgo: ningún profesor ni directivo lo sabe hasta que es demasiado tarde.",
        "Costo de la inacción: desmotivación severa y aumento en la tasa de repetición escolar.",
        "Estado deseado: pasar de la reacción tardía a un modelo automatizado, predictivo y preventivo."
      ],
      transcript: [
        "Hola a todos y bienvenidos a este análisis. Hoy vamos a explorar una propuesta verdaderamente transformadora para el equipo directivo del colegio particular Peruano Francés. Vamos a echar un vistazo a fondo a SIA-T, un sistema inteligente de alerta temprana.",
        "Y os aseguro que lo que vamos a desgranar en los próximos minutos tiene el potencial de cambiar de forma radical la manera en que entendemos y aplicamos el seguimiento académico en la institución, así que ¡vamos a ello!",
        "Cuatro. Quedaos con este número un segundo porque es vital. En la base de datos de prueba actual del colegio, que tiene a 43 estudiantes registrados, hay exactamente cuatro alumnos que ahora mismo están en un riesgo inminente de bajar su rendimiento o reprobar el curso.",
        "¿Y sabéis cuál es el verdadero problema del modelo tradicional? Que en este preciso instante, absolutamente nadie lo sabe. Ningún profesor, ningún coordinador se va a dar cuenta de esto hasta que se impriman las libretas de notas al final del trimestre.",
        "Y para entonces, la oportunidad de intervenir a tiempo simplemente se ha esfumado. Vale, entremos en la primera sección: El reto del seguimiento académico, de reactivo a predictivo. El gran obstáculo al que nos enfrentamos a nivel institucional es, ni más ni menos, que el tiempo."
      ],
      visualTheme: "orange"
    },
    {
      id: 2,
      chapter: "Sección 2",
      title: "La Solución: SIA-T",
      start: 102,
      end: 176, // 1:42 - 2:56
      slideTitle: "SIA-T: Anticipar el Riesgo Académico",
      badge: "PROPUESTA DE VALOR",
      description: "Presentamos SIA-T (Sistema de Alerta Temprana), una solución basada en Inteligencia Artificial y Machine Learning diseñada no para recargar de trabajo a los docentes, sino para automatizar la detección del riesgo.",
      bullets: [
        "SIA-T es un motor inteligente que analiza datos históricos para prever desvíos de rendimiento.",
        "Ofrece una radiografía precisa en tiempo real para todos los estamentos de la comunidad escolar.",
        "Coordinador Académico: Seguimiento automatizado del avance general de las aulas.",
        "Psicólogo & Docentes: Alertas tempranas accionables que permiten tutorías focalizadas antes de los exámenes."
      ],
      transcript: [
        "A ver, seamos sinceros. El contraste es clarísimo. La realidad actual del colegio es que hacemos un seguimiento manual que siempre llega tarde y que es puramente reactivo. Básicamente dependemos de la observación de cada profe y de cruzar los dedos hasta las evaluaciones finales.",
        "El coste de hacer esto, pues, intervenciones supertardías que acaban con alumnos desmotivados o, en el peor de los casos, repitiendo curso. El estado deseado, al que tenemos que apuntar sí o sí, es un modelo automatizado, predictivo y sobre todo temprano.",
        "Se trata de actuar antes de que el bache se convierta en una mala calificación irreversible. Sección dos: La solución. Conoce SIA-T, anticipando el bajo rendimiento. Y bueno, para cerrar esa enorme brecha, exactamente para lo que se ha creado esta solución.",
        "Ojo, el objetivo no es pedirle al equipo docente que eche más horas revisando interminables hojas de cálculo. ¡Para nada! Se trata de darles herramientas para trabajar de forma mucho más inteligente.",
        "Entonces, ¿qué es SIA? Básicamente es un sistema inteligente de alerta temprana impulsado por Machine Learning o aprendizaje automático. Pero bueno, quitando toda la jerga técnica, el beneficio real es fascinante.",
        "Es un sistema que no para de aprender de los datos históricos del colegio para literalmente prever el futuro. Analiza lo que pasó y lo que está pasando para lanzar una alerta de riesgo académico muchísimo antes de que ese suspenso llegue a la libreta de notas.",
        "Y os preguntaréis, ¿quién le saca partido a esto? Pues prácticamente toda la estructura del colegio. El coordinador académico tiene una radiografía perfecta, día a día, del estado de los chavales.",
        "Los profes reciben información superprecisa para ajustar sus clases sobre la marcha. El psicólogo escolar puede intervenir de forma proactiva si ve riesgos por faltas de asistencia o comportamiento. Y por supuesto, la dirección obtiene datos 100% fiables para tomar decisiones estratégicas. Un win-win de manual."
      ],
      visualTheme: "slate"
    },
    {
      id: 3,
      chapter: "Sección 3",
      title: "Demo del Prototipo",
      start: 176,
      end: 307, // 2:56 - 5:07
      slideTitle: "Evidencia en Vivo: Prototipo Funcional",
      badge: "PROTOTIPO FUNCIONAL",
      description: "El prototipo web real de SIA-T ya se encuentra desarrollado y operativo. Cuenta con un Panel Principal dinámico, gestión por alumnos, alertas automáticas de ML y un simulador interactivo.",
      bullets: [
        "Panel de Control: KPIs de riesgo e inasistencias consolidados de forma gráfica en tiempo real.",
        "Gestión Escolar: Clasificación inteligente (Riesgo Alto, Medio, Bajo, Sin Riesgo) basada en datos objetivos.",
        "Buzón de Alertas de ML: Explicaciones claras sobre el motivo de riesgo del estudiante (ej. caída en calificaciones).",
        "Simulador con Random Forest: Permite simular escenarios hipotéticos cambiando notas y ver el impacto predictivo instantáneo."
      ],
      transcript: [
        "Pasamos a la sección tres: Demostración del prototipo SIA-T. Evidencia en tiempo real. Lo que ven ahora es lo más interesante de todo este análisis, porque pasamos de la teoría a la acción pura y dura. No estamos hablando de un proyecto en papel ni de una promesa a tres años vista.",
        "Vamos a hablar del prototipo que está totalmente funcional y operando ahora mismo. Imaginad por un momento que el coordinador académico se sienta por la mañana y abre su portátil. En cuestión de segundos, sin mandar ni un solo correo y sin revisar papeles, el panel principal le muestra a los 43 estudiantes y le levanta una bandera roja sobre esas cuatro alertas activas que requieren acción inmediata.",
        "Además, puede ver visualmente cómo evoluciona la tendencia de riesgo a lo largo del tiempo. Es literalmente tomarle el pulso en vivo a la salud académica del colegio. ¡Una pasada! Si avanzamos hacia la gestión de estudiantes, es brutal ver cómo se organiza todo.",
        "Y esto ilustra perfectamente la magia de la automatización. El nivel de riesgo de cada alumno (sin riesgo, bajo, medio o alto) no se mete a mano, no depende de lo que opine alguien. El algoritmo lo calcula automáticamente cruzando siete variables distintas: notas de cuadernos, exámenes, conducta, inasistencias... todo.",
        "Es un análisis completamente objetivo y riguroso que elimina de golpe el sesgo humano que tiene el seguimiento manual. Y llegamos a la joya de la corona a nivel operativo: las alertas activas de Machine Learning.",
        "El sistema no te suelta una estadística general y se queda tan ancho, no. Te da nombres y apellidos, te dice qué estudiante es, en qué curso está y lo más crucial, el motivo exacto por el que el modelo predictivo ha detectado un riesgo crítico.",
        "Por ejemplo, que la nota proyectada está cayendo en picado. Esto le da al profe exactamente el contexto que necesita para acercarse hoy mismo a ese alumno y ponerle remedio. Pero esperad, porque para llevar la prevención al siguiente nivel, hay algo más.",
        "El sistema incluye un simulador de riesgo impulsado por un modelo llamado Random Forest. Esto es el gran diferenciador. Imagina poder introducir notas o faltas hipotéticas para un alumno y que el sistema te simule en tiempo real cómo cambiaría su nivel de riesgo.",
        "Y todo esto en un entorno de pruebas totalmente seguro, sin tocar ni un solo dato oficial. Es, sencillamente, pura inteligencia al servicio de la estrategia docente."
      ],
      visualTheme: "green"
    },
    {
      id: 4,
      chapter: "Sección 4",
      title: "Análisis Predictivo",
      start: 307,
      end: 405, // 5:07 - 6:45
      slideTitle: "Análisis Predictivo & Viabilidad del Sistema",
      badge: "VIABILIDAD Y DISEÑO",
      description: "El paso de un control manual a uno predictivo impacta directamente las métricas de eficiencia. La arquitectura híbrida garantiza confidencialidad y costos nulos en la nube.",
      bullets: [
        "Segmentación óptima: 42% Sin Riesgo, 49% Riesgo Bajo, 5% Riesgo Medio, 5% Riesgo Alto.",
        "Focalización de recursos: El colegio concentra sus recursos intensivos únicamente en el 10% del alumnado con riesgo.",
        "Arquitectura Híbrida: Soberanía total de datos locales sin comprometer la privacidad estudiantil.",
        "Sostenibilidad financiera: Costos recurrentes de servidor en la nube de S/. 0.00 aprovechando la infraestructura preexistente."
      ],
      transcript: [
        "Sección cuatro: Del análisis manual al predictivo. Transformación y viabilidad. Entonces, el punto clave aquí es entender el impacto de dar este salto tecnológico. Pasamos de ir a ciegas a tener inteligencia predictiva. Pero claro, toda esta innovación tiene que tener sentido y ser viable para la institución.",
        "Y para demostrar que esto funciona solo hay que echar un ojo a los datos reales del prototipo. El sistema ya es capaz de segmentar a los alumnos de manera impecable. Resulta que un 42% está sin ningún riesgo, y un 49% con riesgo bajo.",
        "¿Qué significa esto? Pues que el colegio puede coger todos sus recursos intensivos y enfocarlos exclusivamente en ese 10% que suma el riesgo medio y alto. Focalizar los esfuerzos donde de verdad hacen falta. Esa es la definición exacta de eficiencia escolar.",
        "Si comparamos el antes y el ahora frente a frente, la decisión se toma sola, de verdad. En velocidad, pasamos de llegar siempre tarde a tener notificaciones en tiempo real. En el método, dejamos atrás el análisis humano subjetivo y pasamos a un escrutinio automatizado basado puramente en datos.",
        "Y en el resultado final, abandonamos de una vez por todas la educación reactiva para abrazar una cultura que es 100% preventiva. Dar el salto a SIA-T no es un capricho tecnológico, es una evolución necesaria.",
        "Además, y esto es superimportante para la tranquilidad de la dirección y del equipo técnico, la arquitectura es brillante. Es un modelo híbrido que garantiza total soberanía de los datos a nivel local. La información de los estudiantes no sale del colegio, está superprotegida.",
        "Y al usar servidores locales, los costes de la nube son cero, aprovechando lo que el colegio ya tiene. Y por si fuera poco, el modelo se actualiza y se entrena solo cada fin de semana. Una maravilla."
      ],
      visualTheme: "purple"
    },
    {
      id: 5,
      chapter: "Sección 5",
      title: "Próximos Pasos & Adopción",
      start: 405,
      end: 479, // 6:45 - 7:59 (Total 479 seconds)
      slideTitle: "Próximos Pasos: Adopción del Sistema SIA-T",
      badge: "HOJA DE RUTA",
      description: "El éxito de SIA-T reside en su correcta adopción. Definimos tres pasos clave y rápidos para que el colegio particular Peruano Francés empiece a salvar el éxito escolar de sus estudiantes.",
      bullets: [
        "Paso 1 - Acceso Web: Ingreso inmediato al prototipo web funcional en la nube (prototipo-peruano-frances.vercel.app).",
        "Paso 2 - Revisar Datos: Evaluar y explorar las alertas cargadas con datos de prueba reales de forma interactiva.",
        "Paso 3 - Programa Piloto: Iniciar un piloto controlado de 2 semanas con un par de profesores seleccionados.",
        "Filosofía Central: SIA-T no reemplaza la empatía, mirada o vocación del docente; potencia su rol dándole información clave a tiempo."
      ],
      transcript: [
        "Sección cinco: Próximos pasos y cierre. De la propuesta a la acción. Bueno, vamos a ver cómo aterrizamos esto. Porque tener la mejor herramienta del universo no sirve absolutamente de nada si no se usa en las aulas, ¿verdad? Es hora de ponerse en marcha.",
        "Y los pasos son clarísimos y súper rápidos. Primero, podéis acceder hoy mismo al sistema desde cualquier navegador entrando en prototipo-peruano-frances.vercel.app.",
        "Segundo, navegad por ahí, trastead con el panel y comprobad lo rápido que va con los datos de prueba. Y tercero, lanzar un programa piloto de solo dos semanas con un par de profes seleccionados. Es la manera más segura de validar que esta herramienta va a valer su peso en oro en el día a día.",
        "Para ir cerrando, quiero que nos quedemos con una idea que es el corazón absoluto de todo esto: SIA-T no reemplaza al docente, le da la información a tiempo para actuar. Seamos claros, ninguna tecnología va a sustituir jamás la empatía, la vocación o la mirada de un buen profesor.",
        "Pero darle al profesorado el superpoder de predecir el futuro académico de sus alumnos, ¡buf! eso sí que cambia las reglas del juego. La herramienta para evitar el fracaso escolar ya está construida y lista.",
        "Así que os dejo con esta pregunta: ¿Es este el momento exacto para transformar los datos del colegio en el éxito garantizado de vuestros estudiantes? Muchísimas gracias por acompañarme en este análisis."
      ],
      visualTheme: "orange"
    }
  ];

  const TOTAL_DURATION = videoDuration;

  // Find active segment
  const activeSegment = SEGMENTS.find(
    (seg) => currentTime >= seg.start && currentTime < seg.end
  ) || SEGMENTS[SEGMENTS.length - 1];

  // Sync state transitions from the video element
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration || 479);
    }
  };

  // Wire controls to html5 video element
  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {
        // Fallback for auto-play block or missing file
        setIsPlaying(false);
      });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
    }
  };

  const handleSpeedChange = () => {
    let nextSpeed = 1;
    if (playbackSpeed === 1) nextSpeed = 1.5;
    else if (playbackSpeed === 1.5) nextSpeed = 2;
    else nextSpeed = 1;

    setPlaybackSpeed(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  };

  const handleMuteToggle = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (videoRef.current) {
      videoRef.current.muted = nextMute;
      if (!nextMute && volume === 0) {
        setVolume(0.5);
        videoRef.current.volume = 0.5;
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val === 0) {
        setIsMuted(true);
        videoRef.current.muted = true;
      } else {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
  };

  const resetPlayer = () => {
    setCurrentTime(0);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  };

  const jumpToTime = (seconds: number) => {
    setCurrentTime(seconds);
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play().catch(() => {});
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Filter transcript lines based on search query
  const allTranscriptLines = SEGMENTS.flatMap((seg) => 
    seg.transcript.map((line) => ({
      line,
      start: seg.start,
      chapter: seg.title
    }))
  );

  const filteredLines = searchQuery
    ? allTranscriptLines.filter((item) =>
        item.line.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allTranscriptLines;

  return (
    <div className="animate-fade-in text-slate-800">
      <section id="p08-video-solucion" className="py-12 bg-white border-b border-slate-200">
        <div className="px-6 sm:px-10 lg:px-12">
          {/* HEADER DE CAPÍTULO */}
          <div className="mb-4">
            <span className="font-mono text-xs text-[#0d7377] uppercase tracking-wider block mb-2">
              08 · Presentación en Video de la Solución · Pitch Académico
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Video de la Solución SIA-T
            </h2>
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-between mb-8 max-w-6xl">
            <p className="text-slate-600 text-sm leading-relaxed text-justify max-w-4xl flex-1">
              A continuación se presenta el pitch de sustentación oficial de la propuesta <strong>SIA-T</strong>. El reproductor de video está integrado de forma directa con el documento de respaldo. Utilice los controles interactivos para reproducir el video, sincronizar las diapositivas de soporte técnico, o buscar términos dentro de la transcripción en tiempo real.
            </p>
            <div className="w-full sm:w-auto">
              <a
                href="https://prototipo-peruano-frances.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0d7377] hover:bg-[#0d7377]/90 text-white font-mono text-xs font-bold px-5 py-3 rounded-2xl shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                Ir al Software (SIA-T Web)
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl">
            {/* COLUMNA IZQUIERDA Y CENTRAL: REPRODUCTOR DE VIDEO REAL / VISTA DIAPOSITIVAS */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* VISTAS DE REPRODUCTOR */}
              <div className="flex justify-between items-center bg-slate-50 border p-2 rounded-2xl">
                <span className="text-xs font-bold text-slate-600 font-mono ml-2">Modo de visualización:</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setPlayerView("video")}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      playerView === "video" 
                        ? "bg-[#0d7377] text-white shadow-xs" 
                        : "text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Video Integrado
                  </button>
                  <button
                    onClick={() => setPlayerView("slides")}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      playerView === "slides" 
                        ? "bg-[#0d7377] text-white shadow-xs" 
                        : "text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Resumen de Diapositivas
                  </button>
                </div>
              </div>

              {/* THE PLAYER CONTAINER */}
              <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col justify-between aspect-video relative group select-none">
                
                {/* VIDEO TOP BAR */}
                <div className="absolute top-0 inset-x-0 p-4 bg-gradient-to-b from-slate-950/90 via-slate-950/40 to-transparent flex items-center justify-between z-15">
                  <div className="flex items-center gap-2">
                    <span className="animate-pulse w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-mono text-[10px] text-slate-300 font-bold tracking-wider uppercase">
                      {activeSegment.badge} · PITCH EN VIVO
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#0d7377] bg-white px-2.5 py-0.5 rounded-full font-bold">
                    {activeSegment.chapter}
                  </span>
                </div>

                {/* THE MAIN SCREEN AREA */}
                <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-slate-950">
                  
                  {/* Vista 1: VIDEO (Real HTML5 Video tag) */}
                  <div className={`absolute inset-0 w-full h-full transition-opacity duration-300 flex items-center justify-center ${
                    playerView === "video" ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
                  }`}>
                    <video
                      ref={videoRef}
                      src={VIDEO_SRC}
                      className="w-full h-full object-contain"
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleLoadedMetadata}
                      onError={() => setVideoError(true)}
                    />

                    {/* OVERLAY: PLACEHOLDER & INSTRUCTIONS IF VIDEO NOT INSTALLED */}
                    {videoError && (
                      <div className="absolute inset-0 bg-slate-950/95 p-6 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                          <FileVideo className="w-8 h-8" />
                        </div>
                        <div className="max-w-md space-y-2">
                          <h4 className="font-serif text-base font-bold text-white">Video Listo para Cargar</h4>
                          <p className="text-slate-400 text-xs leading-relaxed">
                            Para reproducir tu video personalizado de sustentación, crea una carpeta llamada <code className="bg-slate-900 px-1.5 py-0.5 rounded text-amber-400 text-[11px]">public</code> en la raíz de tu proyecto local y coloca tu archivo MP4 nombrado como:
                          </p>
                          <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 font-mono text-xs text-white">
                            /public/video_presentacion.mp4
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setVideoError(false);
                            if (videoRef.current) videoRef.current.load();
                          }}
                          className="bg-[#0d7377] hover:bg-[#0d7377]/90 text-white font-mono text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
                        >
                          Reintentar Carga
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Vista 2: SLIDES SUMMARY (Sincronizado) */}
                  <div className={`absolute inset-0 w-full h-full p-6 sm:p-10 transition-opacity duration-300 flex items-center justify-center bg-slate-950 ${
                    playerView === "slides" ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
                  }`}>
                    {/* Grid overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:14px_14px] opacity-20" />
                    
                    <div className="relative z-10 w-full max-w-lg mx-auto text-left space-y-4">
                      <div className="animate-fade-in space-y-4">
                        <div className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full text-[9px] font-mono text-white tracking-widest font-bold uppercase">
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          DIAPOSITIVA SINCRONIZADA
                        </div>

                        <h4 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
                          {activeSegment.slideTitle}
                        </h4>

                        <div className="grid sm:grid-cols-5 gap-4 py-2 items-center">
                          <div className="sm:col-span-3 space-y-2">
                            <p className="text-slate-300 text-xs text-justify leading-relaxed">
                              {activeSegment.description}
                            </p>
                            <div className="space-y-1">
                              {activeSegment.bullets.slice(0, 2).map((b, idx) => (
                                <div key={idx} className="flex gap-1.5 text-[11px] text-slate-400 items-start">
                                  <span className="text-[#0d7377] font-bold">✔</span>
                                  <span>{b}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="sm:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center h-28 text-center relative hover:bg-white/10 transition-colors">
                            {activeSegment.id === 1 && (
                              <div className="space-y-2 animate-pulse">
                                <span className="font-mono text-4xl font-black text-red-500">4 / 43</span>
                                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Alumnos en Riesgo</p>
                              </div>
                            )}
                            {activeSegment.id === 2 && (
                              <div className="space-y-1 flex flex-col items-center">
                                <Cpu className="w-8 h-8 text-indigo-400 animate-spin" style={{ animationDuration: "8s" }} />
                                <span className="text-xs font-bold text-white font-mono mt-1">SIA-T Engine</span>
                                <p className="text-[9px] text-slate-400">Random Forest v1.2</p>
                              </div>
                            )}
                            {activeSegment.id === 3 && (
                              <div className="space-y-1 flex flex-col items-center">
                                <Monitor className="w-8 h-8 text-emerald-400 animate-bounce" />
                                <span className="text-xs font-bold text-white font-mono mt-1">PROTOTIPO WEB</span>
                                <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-mono font-bold">vercel.app</span>
                              </div>
                            )}
                            {activeSegment.id === 4 && (
                              <div className="space-y-1 flex flex-col items-center">
                                <TrendingUp className="w-8 h-8 text-purple-400" />
                                <span className="text-xs font-bold text-white font-mono mt-1">EFICIENCIA</span>
                                <p className="text-[9px] text-slate-400">100% Preventiva</p>
                              </div>
                            )}
                            {activeSegment.id === 5 && (
                              <div className="space-y-1 flex flex-col items-center">
                                <ShieldCheck className="w-8 h-8 text-amber-400 animate-pulse" />
                                <span className="text-xs font-bold text-white font-mono mt-1">DOCENTE + IA</span>
                                <p className="text-[9px] text-slate-400">Soberanía de Datos</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* PLAYER CONTROLS BAR */}
                <div className="bg-slate-950/95 border-t border-slate-800 p-4 space-y-3 z-10">
                  
                  {/* PROGRESS BAR */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-slate-400 w-10 text-right">
                      {formatTime(currentTime)}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max={TOTAL_DURATION}
                      step="0.1"
                      value={currentTime}
                      onChange={handleSeek}
                      className="flex-1 accent-[#0d7377] bg-slate-800 h-1.5 rounded-full appearance-none cursor-pointer hover:bg-slate-700 transition-colors [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0d7377] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md"
                    />
                    <span className="font-mono text-[11px] text-slate-400 w-10 text-left">
                      {formatTime(TOTAL_DURATION)}
                    </span>
                  </div>

                  {/* BUTTONS ROW */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Play/Pause Button */}
                      <button
                        onClick={handlePlayPause}
                        className="w-10 h-10 rounded-full bg-white hover:bg-slate-100 text-slate-950 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5 fill-slate-950 text-slate-950" />
                        ) : (
                          <Play className="w-5 h-5 fill-slate-950 text-slate-950 translate-x-0.5" />
                        )}
                      </button>

                      {/* Restart/Reset Button */}
                      <button
                        onClick={resetPlayer}
                        className="text-slate-400 hover:text-white p-2 transition-colors cursor-pointer"
                        title="Reiniciar reproducción"
                      >
                        <RotateCcw className="w-4.5 h-4.5" />
                      </button>

                      {/* Volume Indicator & Slider */}
                      <div className="flex items-center gap-2 group/volume">
                        <button
                          onClick={handleMuteToggle}
                          className="text-slate-400 hover:text-white p-2 transition-colors cursor-pointer flex items-center justify-center"
                          title={isMuted ? "Activar sonido" : "Silenciar"}
                        >
                          {isMuted || volume === 0 ? (
                            <VolumeX className="w-4.5 h-4.5 text-red-500" />
                          ) : (
                            <Volume2 className="w-4.5 h-4.5 text-slate-300" />
                          )}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="w-16 sm:w-20 accent-[#0d7377] bg-slate-800 h-1.5 rounded-full appearance-none cursor-pointer hover:bg-slate-700 transition-all opacity-70 group-hover/volume:opacity-100 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md"
                          title="Ajustar volumen"
                        />
                        <span className="font-mono text-[9px] text-slate-400 w-8">
                          {Math.round((isMuted ? 0 : volume) * 100)}%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Speeds Selector */}
                      <button
                        onClick={handleSpeedChange}
                        className="font-mono text-[11px] font-bold text-slate-300 hover:text-white border border-slate-800 px-3 py-1 rounded-xl bg-slate-900 transition-colors cursor-pointer"
                      >
                        Velocidad: {playbackSpeed}x
                      </button>

                      <span className="font-mono text-[11px] text-slate-500 hidden sm:inline">
                        1080p HD
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* SLIDES BULLET DETAILED BREAKDOWN */}
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 border-b pb-2">
                  <BookOpen className="w-5 h-5 text-[#0d7377]" />
                  <h4 className="font-serif text-base font-bold text-slate-900">
                    Contenido Detallado de la Diapositiva Activa
                  </h4>
                </div>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="sm:col-span-1 space-y-1">
                    <span className="font-mono text-[9px] uppercase font-black text-slate-400 block">Capítulo Actual</span>
                    <span className="text-sm font-bold text-[#0d7377] block">{activeSegment.title}</span>
                    <span className="font-mono text-[11px] text-slate-500 block">
                      Rango: {formatTime(activeSegment.start)} - {formatTime(activeSegment.end)}
                    </span>
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <span className="font-mono text-[9px] uppercase font-black text-slate-400 block">Aspectos Clave Tratados</span>
                    <ul className="space-y-1.5 text-xs">
                      {activeSegment.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex gap-2 text-slate-700 leading-normal text-justify">
                          <span className="text-[#0d7377] font-bold">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>

            {/* COLUMNA DERECHA: SECTORES INTERACTIVOS Y TRANSCRIPCIÓN */}
            <div className="space-y-6">
              
              {/* VIDEO TABS */}
              <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm space-y-4">
                <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs font-mono">
                  <button
                    onClick={() => setActiveTab("visualizer")}
                    className={`flex-1 py-1.5 rounded-md cursor-pointer transition-all flex items-center justify-center gap-1 ${
                      activeTab === "visualizer" ? "bg-[#0d7377] text-white font-bold shadow-xs" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
                    Segmentos
                  </button>
                  <button
                    onClick={() => setActiveTab("transcript")}
                    className={`flex-1 py-1.5 rounded-md cursor-pointer transition-all flex items-center justify-center gap-1 ${
                      activeTab === "transcript" ? "bg-[#0d7377] text-white font-bold shadow-xs" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Transcripción
                  </button>
                </div>

                {/* TAB 1: LIST OF SEGMENTS / CHAPTERS */}
                {activeTab === "visualizer" && (
                  <div className="space-y-2.5">
                    <span className="font-mono text-[10px] text-slate-400 block uppercase tracking-wider">Navegación por Capítulos</span>
                    <div className="space-y-1.5">
                      {SEGMENTS.map((seg) => {
                        const isCurrent = currentTime >= seg.start && currentTime < seg.end;
                        return (
                          <button
                            key={seg.id}
                            onClick={() => jumpToTime(seg.start)}
                            className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex justify-between items-center ${
                              isCurrent
                                ? "bg-amber-50 border-amber-300 shadow-xs"
                                : "bg-slate-50/50 border-slate-150 hover:bg-slate-50"
                            }`}
                          >
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? "bg-amber-500 animate-pulse" : "bg-slate-300"}`} />
                                <span className="font-mono text-[9px] uppercase font-black text-slate-400">{seg.chapter}</span>
                              </div>
                              <p className="text-xs font-bold text-slate-900 leading-tight">{seg.title}</p>
                            </div>
                            <span className="font-mono text-[10px] text-slate-500 bg-white border px-2 py-0.5 rounded-lg flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {formatTime(seg.start)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* TAB 2: FULL TRANSCRIPT SEARCHABLE */}
                {activeTab === "transcript" && (
                  <div className="space-y-3">
                    {/* Search Field */}
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Buscar palabras..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full text-xs font-mono pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0d7377] focus:border-transparent"
                      />
                    </div>

                    {/* Scrollable Script Area */}
                    <div className="h-64 overflow-y-auto divide-y divide-slate-100 pr-1 text-xs space-y-2">
                      {filteredLines.length > 0 ? (
                        filteredLines.map((item, idx) => {
                          const isLineActive = currentTime >= item.start && (idx === filteredLines.length - 1 || currentTime < filteredLines[idx + 1]?.start);
                          return (
                            <div
                              key={idx}
                              onClick={() => jumpToTime(item.start)}
                              className={`py-2 text-justify cursor-pointer rounded px-2 transition-all hover:bg-slate-50 ${
                                isLineActive ? "bg-amber-50/60 border-l-2 border-amber-500 font-medium text-slate-900" : "text-slate-600"
                              }`}
                            >
                              <div className="flex justify-between text-[9px] font-mono text-slate-400 mb-0.5">
                                <span className="font-bold text-[#0d7377]">{item.chapter}</span>
                                <span>{formatTime(item.start)}</span>
                              </div>
                              <p className="leading-relaxed">{item.line}</p>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-center text-slate-400 font-mono py-8">No se encontraron coincidencias.</p>
                      )}
                    </div>
                  </div>
                )}

              </div>

              {/* ENLACE DIRECTO AL SOFTWARE */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-5 rounded-3xl space-y-3 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                  <Monitor className="w-20 h-20 text-white" />
                </div>
                <div className="relative z-10 space-y-3">
                  <span className="font-mono text-[9px] uppercase font-black text-amber-400 block tracking-widest">SOFTWARE OFICIAL</span>
                  <h5 className="font-serif text-sm font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                    Plataforma Web SIA-T
                  </h5>
                  <p className="text-slate-300 text-xs text-justify leading-relaxed">
                    Accede directamente al prototipo web completamente funcional en producción para evaluar el simulador de riesgo y la gestión escolar:
                  </p>
                  <a
                    href="https://prototipo-peruano-frances.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#0d7377] hover:bg-[#0d7377]/90 text-white font-mono text-xs font-bold py-2.5 px-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <span>Abrir SIA-T en Vercel</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                  <div className="text-center">
                    <code className="text-[10px] text-slate-500 font-mono">
                      prototipo-peruano-frances.vercel.app
                    </code>
                  </div>
                </div>
              </div>

              {/* FICHA TÉCNICA DEL VIDEO */}
              <div className="bg-[#0d7377]/5 border border-[#0d7377]/10 p-5 rounded-3xl space-y-3">
                <span className="font-mono text-[9px] uppercase font-black text-[#0d7377] block tracking-widest">FICHA TÉCNICA DEL PITCH</span>
                <h5 className="font-serif text-sm font-bold text-slate-950 flex items-center gap-1.5">
                  <Award className="w-4.5 h-4.5 text-amber-500" />
                  Sustentación Virtual SIA-T
                </h5>
                <p className="text-slate-700 text-xs text-justify leading-relaxed">
                  Este video recopila de forma estructurada los resultados de la formulación estratégica del sistema. Representa el documento final de sustentación ante el jurado calificador y la alta dirección del colegio Peruano Francés.
                </p>
                <div className="space-y-1.5 text-[11px] border-t border-slate-200/50 pt-3">
                  <div className="flex justify-between text-slate-600">
                    <span>Duración Oficial:</span>
                    <span className="font-mono font-bold">7:59 Minutos</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Formato original:</span>
                    <span className="font-mono font-bold">MP4 Full HD (1080p)</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Herramientas de Voz:</span>
                    <span className="font-mono font-bold">NotebookLM AI Cast</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Estructura de la solución:</span>
                    <span className="font-mono font-bold">5 Secciones Clave</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ── GUÍA DE UBICACIÓN LOCAL PARA EL USUARIO ── */}
          <div className="mt-8 bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 max-w-6xl">
            <h4 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <Info className="w-5 h-5 text-amber-400" />
              Guía de Configuración del Archivo del Video
            </h4>
            <div className="grid sm:grid-cols-3 gap-6 text-xs text-slate-300">
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase font-black text-amber-400 block border-b border-slate-850 pb-1">1. Dónde colocarlo</span>
                <p className="leading-relaxed">
                  Crea una carpeta llamada <code className="bg-slate-900 px-1 py-0.5 rounded text-white">public</code> en el directorio raíz de tu proyecto local si aún no existe.
                </p>
              </div>
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase font-black text-amber-400 block border-b border-slate-850 pb-1">2. Cómo nombrarlo</span>
                <p className="leading-relaxed">
                  Nombra tu archivo de video exactamente como <code className="bg-slate-900 px-1 py-0.5 rounded text-white">video_presentacion.mp4</code>.
                </p>
              </div>
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase font-black text-amber-400 block border-b border-slate-850 pb-1">3. Ruta de reproducción</span>
                <p className="leading-relaxed">
                  El sistema buscará el video en la ruta raíz <code className="bg-slate-900 px-1 py-0.5 rounded text-white">/video_presentacion.mp4</code> y se reproducirá automáticamente.
                </p>
              </div>
            </div>
          </div>

          {/* ── ESTRUCTURA DETALLADA DEL PITCH ACADÉMICO ── */}
          <div id="p08-estructura-pitch" className="mt-14 space-y-6 max-w-5xl">
            <h3 className="font-serif text-2xl font-bold text-slate-900 border-b pb-2">
              Estructura de Contenido del Pitch Académico
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed text-justify">
              El guion audiovisual del proyecto fue diseñado para cumplir con los estándares de una sustentación de proyectos de innovación tecnológica, estructurando un mensaje claro y de alto impacto:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              
              {/* CARD: Estructura del Reto y la Solución */}
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
                <span className="font-mono text-[9px] uppercase font-black text-indigo-700 block">Capítulos 1 y 2</span>
                <h4 className="font-serif text-base font-bold text-slate-900 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-indigo-600" />
                  Justificación Estratégica & Alineación por Roles
                </h4>
                <p className="text-slate-700 text-xs leading-relaxed text-justify">
                  El pitch inicia capturando la atención con un dato crítico real: <strong>4 alumnos de cada 43</strong> están en riesgo y la organización se encuentra ciega a esa realidad bajo el paradigma manual. Tras definir los impactos organizacionales negativos de la reacción tardía, se introduce SIA-T. 
                </p>
                <p className="text-slate-700 text-xs leading-relaxed text-justify">
                  Se detalla meticulosamente el valor agregado para cada integrante de la comunidad educativa, asegurando que la solución sea comprendida como un facilitador y no como una carga burocrática adicional.
                </p>
              </div>

              {/* CARD: Demostración técnica y Viabilidad */}
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
                <span className="font-mono text-[9px] uppercase font-black text-emerald-700 block">Capítulos 3, 4 y 5</span>
                <h4 className="font-serif text-base font-bold text-slate-900 flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-emerald-600" />
                  Evidencia en Vivo & Modelo Híbrido de Privacidad
                </h4>
                <p className="text-slate-700 text-xs leading-relaxed text-justify">
                  La sustentación avanza con la <strong>demostración en vivo</strong> del prototipo web desarrollado sobre Vercel. Se exponen los KPIs del panel principal, las alertas predictivas con nombres y apellidos, y se resalta el simulador impulsado por <strong>Random Forest</strong> como la herramienta de mayor valor estratégico para el profesorado.
                </p>
                <p className="text-slate-700 text-xs leading-relaxed text-justify">
                  Finalmente, se sustenta la viabilidad financiera del proyecto demostrando el <strong>costo en nube de S/. 0.00</strong> mediante una arquitectura híbrida de servidores locales, concluyendo con una hoja de ruta ágil de adopción rápida.
                </p>
              </div>

            </div>

            {/* CONCURRENCIA FINAL */}
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 text-justify">
              <h4 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2">
                <Bookmark className="w-4.5 h-4.5 text-[#0d7377]" />
                Filosofía de Adopción de SIA-T
              </h4>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                <strong>Conclusión:</strong> El pitch reafirma un principio fundamental de la tecnología en la educación: <strong>la inteligencia artificial no reemplaza al docente, le da la información a tiempo para actuar</strong>. El éxito del proyecto reside en utilizar la potencia predictiva de la tecnología para devolverle al profesorado el tiempo valioso que hoy pierden en el cruce manual de datos, permitiéndoles enfocar toda su empatía, mirada y vocación pedagógica exclusivamente en el 10% de estudiantes que necesitan un apoyo inmediato.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
