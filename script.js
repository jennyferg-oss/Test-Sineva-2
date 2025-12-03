const likertScale = [
  { value: 5, label: "Totalmente de acuerdo" },
  { value: 4, label: "De acuerdo" },
  { value: 3, label: "Neutral" },
  { value: 2, label: "En desacuerdo" },
  { value: 1, label: "Totalmente en desacuerdo" },
];

const modules = [
  {
    id: "innovacion",
    title: "Módulo 1 — Innovación",
    competency: "Innovación",
    description:
      "Evalúa tu capacidad para generar soluciones, experimentar con pocos recursos y convertir ideas en entregables tangibles.",
    questions: [
      {
        id: "IN1",
        moduleId: "innovacion",
        prompt:
          "El equipo recibe un reto ambiguo y con poco contexto. ¿Cuál es tu primera reacción?",
        style: "scenario",
        trait: "apertura",
        options: [
          {
            value: 5,
            label:
              "Convocar a dos personas clave, prototipar en 48 horas y validar con usuarios tempranos",
          },
          {
            value: 4,
            label:
              "Pedir datos mínimos, lanzar una versión reducida y ajustar en paralelo",
          },
          {
            value: 3,
            label:
              "Organizar una lluvia de ideas extensa antes de construir algo concreto",
          },
          { value: 2, label: "Esperar lineamientos completos de dirección antes de actuar" },
          { value: 1, label: "Frenar cualquier acción hasta que el riesgo esté totalmente acotado" },
        ],
      },
      {
        id: "IN2",
        moduleId: "innovacion",
        prompt:
          "Transformo feedback de usuarios en prototipos accionables en menos de 72 horas.",
        style: "likert",
        options: likertScale,
      },
      {
        id: "IN3",
        moduleId: "innovacion",
        prompt:
          "Si un experimento fracasa, documentas aprendizajes y propones el siguiente experimento en:",
        style: "scenario",
        options: [
          { value: 5, label: "Menos de 48 horas" },
          { value: 4, label: "Dentro de la misma semana" },
          { value: 3, label: "En el siguiente sprint" },
          { value: 2, label: "Cuando haya tiempo libre" },
          { value: 1, label: "Evito proponer otro experimento" },
        ],
      },
      {
        id: "IN4",
        moduleId: "innovacion",
        prompt:
          "Combino datos y observación cualitativa antes de decidir si escalar una idea piloto.",
        style: "likert",
        options: likertScale,
      },
      {
        id: "IN5",
        moduleId: "innovacion",
        prompt:
          "En un hackatón interno priorizas:",
        style: "scenario",
        options: [
          { value: 5, label: "Crear un demo funcional que resuelva un pain real" },
          { value: 4, label: "Probar una tecnología emergente aplicada a un flujo" },
          { value: 3, label: "Presentar un concepto inspirador bien narrado" },
          { value: 2, label: "Optimizar algo pequeño para obtener un quick win" },
          { value: 1, label: "Evitar riesgos y replicar algo que ya existe" },
        ],
      },
      {
        id: "IN6",
        moduleId: "innovacion",
        prompt:
          "Cuando un supuesto clave es incierto, diseñas pruebas A/B o pilotos controlados en lugar de decidir por intuición.",
        style: "likert",
        options: likertScale,
      },
      {
        id: "IN7",
        moduleId: "innovacion",
        prompt:
          "Buscas activamente referencias de otras industrias para inspirar soluciones.",
        style: "likert",
        trait: "apertura",
        options: likertScale,
      },
      {
        id: "IN8",
        moduleId: "innovacion",
        prompt:
          "Al evaluar incorporar IA a un proceso, qué haces primero?",
        style: "scenario",
        options: [
          { value: 5, label: "Mapear casos de uso, medir impacto y hacer una prueba pequeña" },
          { value: 4, label: "Consultar con expertos y definir criterios de éxito" },
          { value: 3, label: "Leer tendencias y esperar a que otro equipo pruebe" },
          { value: 2, label: "Posponer hasta que haya presupuesto amplio" },
          { value: 1, label: "Descartar por complejo" },
        ],
      },
      {
        id: "IN9",
        moduleId: "innovacion",
        prompt:
          "Te sientes cómodo desafiando supuestos de negocio frente a líderes senior.",
        style: "likert",
        options: likertScale,
      },
      {
        id: "IN10",
        moduleId: "innovacion",
        prompt:
          "Si solo tuvieras una semana para entregar valor, qué priorizas?",
        style: "scenario",
        options: [
          { value: 5, label: "Una versión mínima que resuelva un dolor crítico" },
          { value: 4, label: "Un flujo usable aunque no sea perfecto" },
          { value: 3, label: "Un informe con hipótesis y roadmap" },
          { value: 2, label: "Un benchmark detallado" },
          { value: 1, label: "Esperar a tener el alcance completo" },
        ],
      },
    ],
  },
  {
    id: "liderazgo",
    title: "Módulo 2 — Liderazgo",
    competency: "Liderazgo",
    description:
      "Explora cómo movilizas equipos, tomas decisiones difíciles y mantienes accountability sin perder empatía.",
    questions: [
      {
        id: "LI1",
        moduleId: "liderazgo",
        prompt:
          "Cuando un proyecto se desvía, ¿cómo reaccionas con el equipo?",
        style: "scenario",
        trait: "responsabilidad",
        options: [
          { value: 5, label: "Reencuadro prioridades, asigno dueños claros y marco hitos semanales" },
          { value: 4, label: "Solicito un plan de recuperación consensuado y doy seguimiento" },
          { value: 3, label: "Pido explicaciones y espero el siguiente sprint" },
          { value: 2, label: "Escalo el problema y delego totalmente la solución" },
          { value: 1, label: "Dejo que el equipo lo resuelva solo" },
        ],
      },
      {
        id: "LI2",
        moduleId: "liderazgo",
        prompt:
          "Doy feedback difícil de manera directa y respetuosa, incluso bajo presión.",
        style: "likert",
        options: likertScale,
      },
      {
        id: "LI3",
        moduleId: "liderazgo",
        prompt:
          "En foros ejecutivos, ¿cómo presentas los riesgos?",
        style: "scenario",
        options: [
          { value: 5, label: "Con métricas, planes de mitigación y dueños específicos" },
          { value: 4, label: "Con estimaciones y necesidades de soporte" },
          { value: 3, label: "Solo si me preguntan, de forma general" },
          { value: 2, label: "Prefiero no mencionar riesgos para no frenar la decisión" },
          { value: 1, label: "Evito foros ejecutivos" },
        ],
      },
      {
        id: "LI4",
        moduleId: "liderazgo",
        prompt:
          "Impulsas que cada persona entienda cómo su trabajo conecta con el impacto del negocio.",
        style: "likert",
        trait: "extraversión",
        options: likertScale,
      },
      {
        id: "LI5",
        moduleId: "liderazgo",
        prompt:
          "Ante un conflicto entre dos áreas, priorizas:",
        style: "scenario",
        options: [
          { value: 5, label: "Facilitar un acuerdo basado en datos y prioridades comunes" },
          { value: 4, label: "Definir reglas mínimas y pedir que las áreas las cumplan" },
          { value: 3, label: "Pedir al jefe directo que resuelva" },
          { value: 2, label: "Tomar partido por la relación más cercana" },
          { value: 1, label: "No intervenir" },
        ],
      },
      {
        id: "LI6",
        moduleId: "liderazgo",
        prompt:
          "Reconozco logros en público y corrijo en privado.",
        style: "likert",
        options: likertScale,
      },
      {
        id: "LI7",
        moduleId: "liderazgo",
        prompt:
          "Si un entregable clave falla, ¿qué haces en la retrospectiva?",
        style: "scenario",
        options: [
          { value: 5, label: "Busco causas raíz, co-diseño acciones y asigno dueños" },
          { value: 4, label: "Documentar aprendizajes y acordar un plan" },
          { value: 3, label: "Registrar incidentes sin profundizar" },
          { value: 2, label: "Culpar al atraso externo" },
          { value: 1, label: "Evitar retrospectivas" },
        ],
      },
      {
        id: "LI8",
        moduleId: "liderazgo",
        prompt:
          "Te consideras la persona que energiza y da dirección en momentos de ambigüedad.",
        style: "likert",
        trait: "extraversión",
        options: likertScale,
      },
      {
        id: "LI9",
        moduleId: "liderazgo",
        prompt:
          "Cuando delegas, sueles:",
        style: "scenario",
        trait: "responsabilidad",
        options: [
          { value: 5, label: "Clarificar éxito, límites y checkpoints de seguimiento" },
          { value: 4, label: "Asignar tareas y revisar al final" },
          { value: 3, label: "Dar libertad total sin métricas" },
          { value: 2, label: "Retomar control en cuanto algo se complica" },
          { value: 1, label: "Evitar delegar" },
        ],
      },
      {
        id: "LI10",
        moduleId: "liderazgo",
        prompt:
          "Tomar decisiones impopulares te resulta manejable cuando protegen la estrategia.",
        style: "likert",
        options: likertScale,
      },
    ],
  },
  {
    id: "adaptacion",
    title: "Módulo 3 — Adaptación",
    competency: "Adaptación",
    description:
      "Mide cómo respondes a cambios, manejas presión y ajustas planes sin perder calidad.",
    questions: [
      {
        id: "AD1",
        moduleId: "adaptacion",
        prompt:
          "Te cambian prioridades a mitad del sprint. ¿Cómo respondes?",
        style: "scenario",
        trait: "estabilidad",
        options: [
          { value: 5, label: "Replanifico, comunico impactos y cuido al equipo" },
          { value: 4, label: "Reordeno tareas y anoto riesgos" },
          { value: 3, label: "Cumplo con lo que pueda sin replanificar" },
          { value: 2, label: "Sigo el plan inicial sin cambios" },
          { value: 1, label: "Entro en bloqueo o frustración" },
        ],
      },
      {
        id: "AD2",
        moduleId: "adaptacion",
        prompt:
          "Eres capaz de mantener la calma cuando varias cosas fallan a la vez.",
        style: "likert",
        trait: "estabilidad",
        options: likertScale,
      },
      {
        id: "AD3",
        moduleId: "adaptacion",
        prompt:
          "Cuando un proceso cambia, actualizas a stakeholders y propones ajustes de inmediato.",
        style: "likert",
        options: likertScale,
      },
      {
        id: "AD4",
        moduleId: "adaptacion",
        prompt: "Si un proveedor clave falla, ¿qué haces?",
        style: "scenario",
        options: [
          { value: 5, label: "Activas plan B, comunicas y proteges entregables críticos" },
          { value: 4, label: "Buscas alternativas y renegocias" },
          { value: 3, label: "Esperas a que el proveedor resuelva" },
          { value: 2, label: "Detienes todo hasta nuevo aviso" },
          { value: 1, label: "Escalas sin plantear solución" },
        ],
      },
      {
        id: "AD5",
        moduleId: "adaptacion",
        prompt:
          "Cambiar de contexto varias veces al día afecta la calidad de mis decisiones.",
        style: "likert",
        options: [
          { value: 1, label: "Totalmente de acuerdo" },
          { value: 2, label: "De acuerdo" },
          { value: 3, label: "Neutral" },
          { value: 4, label: "En desacuerdo" },
          { value: 5, label: "Totalmente en desacuerdo" },
        ],
      },
      {
        id: "AD6",
        moduleId: "adaptacion",
        prompt: "Ante una regulación nueva, ¿qué haces primero?",
        style: "scenario",
        trait: "apertura",
        options: [
          { value: 5, label: "Interpretar implicaciones y rediseñar el flujo con expertos" },
          { value: 4, label: "Convocar a legal y producto para alinear ajustes" },
          { value: 3, label: "Esperar un instructivo oficial" },
          { value: 2, label: "Asumir que no aplica" },
          { value: 1, label: "Ignorar hasta que sea urgente" },
        ],
      },
      {
        id: "AD7",
        moduleId: "adaptacion",
        prompt:
          "Puedes cambiar de decisión al ver nueva evidencia sin perder credibilidad.",
        style: "likert",
        options: likertScale,
      },
      {
        id: "AD8",
        moduleId: "adaptacion",
        prompt: "Si el tiempo se reduce a la mitad, ¿cómo aseguras calidad?",
        style: "scenario",
        options: [
          { value: 5, label: "Recortas alcance, mantienes estándares críticos y defines checklist" },
          { value: 4, label: "Pides apoyo extra y priorizas" },
          { value: 3, label: "Haces horas extra sin replantear" },
          { value: 2, label: "Entregas igual aunque baje la calidad" },
          { value: 1, label: "Renuncias al entregable" },
        ],
      },
      {
        id: "AD9",
        moduleId: "adaptacion",
        prompt:
          "Disfrutas aprender herramientas nuevas aunque implique salir de tu zona de confort.",
        style: "likert",
        trait: "apertura",
        options: likertScale,
      },
      {
        id: "AD10",
        moduleId: "adaptacion",
        prompt: "Cuando surgen crisis, ¿cómo comunicas?",
        style: "scenario",
        options: [
          { value: 5, label: "Compartes hechos, planes y tiempos de manera transparente" },
          { value: 4, label: "Informas lo necesario y pides paciencia" },
          { value: 3, label: "Comunicas solo internamente" },
          { value: 2, label: "Evitas comunicar hasta resolver" },
          { value: 1, label: "No comunicas" },
        ],
      },
    ],
  },
  {
    id: "comunicacion",
    title: "Módulo 4 — Comunicación",
    competency: "Comunicación",
    description:
      "Analiza tu claridad para transmitir decisiones, escuchar activamente y adaptar el mensaje a distintas audiencias.",
    questions: [
      {
        id: "CO1",
        moduleId: "comunicacion",
        prompt: "Antes de una presentación ejecutiva, ¿qué priorizas?",
        style: "scenario",
        options: [
          { value: 5, label: "Estructura clara, una decisión y datos de respaldo" },
          { value: 4, label: "Diseño visual pulido y narrativa" },
          { value: 3, label: "Revisar ortografía y anexos" },
          { value: 2, label: "Improvisar" },
          { value: 1, label: "No presentar" },
        ],
      },
      {
        id: "CO2",
        moduleId: "comunicacion",
        prompt:
          "Practicas la escucha activa repitiendo y clarificando lo que escuchas.",
        style: "likert",
        trait: "amabilidad",
        options: likertScale,
      },
      {
        id: "CO3",
        moduleId: "comunicacion",
        prompt: "Recibes feedback defensivamente cuando cuestionan tu trabajo.",
        style: "likert",
        options: [
          { value: 1, label: "Totalmente de acuerdo" },
          { value: 2, label: "De acuerdo" },
          { value: 3, label: "Neutral" },
          { value: 4, label: "En desacuerdo" },
          { value: 5, label: "Totalmente en desacuerdo" },
        ],
      },
      {
        id: "CO4",
        moduleId: "comunicacion",
        prompt: "Si detectas que alguien no entiende, ¿qué haces?",
        style: "scenario",
        trait: "amabilidad",
        options: [
          { value: 5, label: "Cambias el formato (visual, ejemplo) y verificas comprensión" },
          { value: 4, label: "Pides preguntas y sigues" },
          { value: 3, label: "Envías un correo luego" },
          { value: 2, label: "Asumes que eventualmente entenderá" },
          { value: 1, label: "Ignoras la señal" },
        ],
      },
      {
        id: "CO5",
        moduleId: "comunicacion",
        prompt:
          "Adaptas el nivel de detalle según la audiencia (técnica, negocio, cliente).",
        style: "likert",
        options: likertScale,
      },
      {
        id: "CO6",
        moduleId: "comunicacion",
        prompt: "Te sientes cómodo facilitando workshops o discusiones grandes.",
        style: "likert",
        trait: "extraversión",
        options: likertScale,
      },
      {
        id: "CO7",
        moduleId: "comunicacion",
        prompt: "¿Cómo manejas desacuerdos en reuniones?",
        style: "scenario",
        options: [
          { value: 5, label: "Nombras el desacuerdo, resumes puntos y guías a una decisión" },
          { value: 4, label: "Pides aparcar el tema y retomarlo con datos" },
          { value: 3, label: "Dejas que la discusión siga" },
          { value: 2, label: "Evitas intervenir" },
          { value: 1, label: "Terminas la reunión abruptamente" },
        ],
      },
      {
        id: "CO8",
        moduleId: "comunicacion",
        prompt:
          "Prefieres escribir resúmenes ejecutivos de máximo una página para alinear decisiones.",
        style: "likert",
        options: likertScale,
      },
      {
        id: "CO9",
        moduleId: "comunicacion",
        prompt: "Cuando hay malas noticias, ¿cómo las compartes?",
        style: "scenario",
        options: [
          { value: 5, label: "Con hechos, impacto y el plan inmediato" },
          { value: 4, label: "Con empatía y sin detalles duros" },
          { value: 3, label: "Por correo masivo" },
          { value: 2, label: "Lo comunico tarde" },
          { value: 1, label: "No lo comunico" },
        ],
      },
      {
        id: "CO10",
        moduleId: "comunicacion",
        prompt:
          "La comunicación asíncrona (documentación, chats) es tu canal principal para avanzar.",
        style: "likert",
        trait: "extraversión",
        options: likertScale,
      },
    ],
  },
  {
    id: "estilo",
    title: "Módulo 5 — Estilo de trabajo",
    competency: "Estilo de trabajo",
    description:
      "Revisa cómo organizas tu día, colaboras, priorizas y mantienes foco personal sin descuidar el equipo.",
    questions: [
      {
        id: "ES1",
        moduleId: "estilo",
        prompt: "Planificas tu semana con bloques de foco y espacios para colaborar.",
        style: "likert",
        trait: "responsabilidad",
        options: likertScale,
      },
      {
        id: "ES2",
        moduleId: "estilo",
        prompt: "Si te interrumpen constantemente, ¿qué haces?",
        style: "scenario",
        options: [
          { value: 5, label: "Negocias horarios, defines acuerdos y proteges tiempo crítico" },
          { value: 4, label: "Pides reagendar" },
          { value: 3, label: "Aceptas todas las interrupciones" },
          { value: 2, label: "Muestras molestia pero no cambias nada" },
          { value: 1, label: "Te resignas y bajas el ritmo" },
        ],
      },
      {
        id: "ES3",
        moduleId: "estilo",
        prompt:
          "Prefieres trabajar con tableros visibles (Kanban/roadmap) para que todos sigan el progreso.",
        style: "likert",
        options: likertScale,
      },
      {
        id: "ES4",
        moduleId: "estilo",
        prompt: "Cuando recibes feedback, ¿cómo lo incorporas?",
        style: "scenario",
        options: [
          { value: 5, label: "Lo priorizo, defino acciones y aviso cuándo estará listo" },
          { value: 4, label: "Lo aplico si no afecta el plan" },
          { value: 3, label: "Lo guardo para después" },
          { value: 2, label: "Lo minimizo" },
          { value: 1, label: "Lo ignoro" },
        ],
      },
      {
        id: "ES5",
        moduleId: "estilo",
        prompt:
          "Te mantienes estable y productivo aun con presión externa o plazos ajustados.",
        style: "likert",
        trait: "estabilidad",
        options: likertScale,
      },
      {
        id: "ES6",
        moduleId: "estilo",
        prompt: "¿Cómo manejas la documentación?",
        style: "scenario",
        options: [
          { value: 5, label: "Creo guías accionables y las mantengo al día" },
          { value: 4, label: "Actualizo cuando hay cambios relevantes" },
          { value: 3, label: "Solo documento al final" },
          { value: 2, label: "Dejo notas personales" },
          { value: 1, label: "No documento" },
        ],
      },
      {
        id: "ES7",
        moduleId: "estilo",
        prompt: "Ser autodidacta y probar nuevas formas de trabajar te resulta natural.",
        style: "likert",
        options: likertScale,
      },
      {
        id: "ES8",
        moduleId: "estilo",
        prompt: "Si trabajas remoto, ¿cómo garantizas visibilidad?",
        style: "scenario",
        trait: "responsabilidad",
        options: [
          { value: 5, label: "Compartes avances diarios y riesgos con entregables claros" },
          { value: 4, label: "Respondes rápido y mantienes estado en el tablero" },
          { value: 3, label: "Te conectas a todas las reuniones" },
          { value: 2, label: "Solo contestas cuando te buscan" },
          { value: 1, label: "No das visibilidad" },
        ],
      },
      {
        id: "ES9",
        moduleId: "estilo",
        prompt: "Prefieres colaborar en pareja para resolver retos complejos.",
        style: "likert",
        options: likertScale,
      },
      {
        id: "ES10",
        moduleId: "estilo",
        prompt: "Si detectas una mejor forma de trabajar, ¿qué haces?",
        style: "scenario",
        trait: "estabilidad",
        options: [
          { value: 5, label: "Piloto el cambio, mido impacto y propongo adoptarlo" },
          { value: 4, label: "Lo pruebo con mi equipo" },
          { value: 3, label: "Espero a que otros lo prueben" },
          { value: 2, label: "Lo comento pero no actúo" },
          { value: 1, label: "Prefiero no cambiar" },
        ],
      },
    ],
  },
];

const traitLabels = {
  apertura: "Apertura a la experiencia",
  responsabilidad: "Responsabilidad (Conscientiousness)",
  extraversión: "Extraversión",
  amabilidad: "Amabilidad",
  estabilidad: "Estabilidad emocional",
};

const traitDescriptions = {
  apertura:
    "Explora qué tan curioso, creativo y dispuesto estás a probar ideas nuevas y aprender de contextos distintos.",
  responsabilidad:
    "Mide organización personal, sentido de accountability y disciplina para cumplir compromisos.",
  extraversión: "Evalúa tu energía social, visibilidad en foros y la facilidad para movilizar a otros.",
  amabilidad: "Refleja tu empatía, disposición a colaborar y capacidad de construir relaciones positivas.",
  estabilidad:
    "Observa cómo gestionas estrés, presión y cambios inesperados manteniendo la calma y el foco.",
};

const competencyDescriptions = {
  Innovación:
    "Capacidad para experimentar, aprender rápido y convertir ideas en entregables que generen valor tangible.",
  Liderazgo:
    "Habilidad para movilizar equipos, tomar decisiones con claridad y responsabilizarse de los resultados.",
  Adaptación: "Flexibilidad para ajustar planes frente a cambios y responder con resiliencia.",
  Comunicación:
    "Claridad para transmitir decisiones, escuchar activamente y adaptar el mensaje a cada audiencia.",
  "Estilo de trabajo":
    "Forma en que organizas tu día, priorizas y colaboras para sostener productividad personal y colectiva.",
};

const totalDurationSeconds = 20 * 60;
const state = {
  started: false,
  finished: false,
  currentModule: 0,
  responses: {},
  timeLeft: totalDurationSeconds,
  timerId: null,
  user: { nombre: "", cargo: "", email: "" },
};

const statusPanel = document.getElementById("status-panel");
const modulePanel = document.getElementById("module-panel");
const resultsPanel = document.getElementById("results-panel");

const allQuestions = modules.flatMap((module) => module.questions);

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function updateStatus() {
  const answered = Object.keys(state.responses).length;
  const overallProgress = Math.round((answered / allQuestions.length) * 100);
  const currentModule = modules[state.currentModule];
  const moduleQuestions = currentModule.questions;
  const moduleProgress = Math.round(
    (moduleQuestions.filter((q) => state.responses[q.id] !== undefined).length / moduleQuestions.length) *
      100,
  );

  statusPanel.innerHTML = `
    <div class="stat-card">
      <div class="stat-label">Candidato</div>
      <div class="stat-value">${state.user.nombre || "Pendiente"}</div>
      <p class="helper">${state.user.cargo || "Cargo"} · ${state.user.email || "Email"}</p>
    </div>
    <div class="stat-card">
      <div class="stat-label">Tiempo restante</div>
      <div class="stat-value">${formatTime(state.timeLeft)}</div>
      <p class="helper">Cronómetro total de 20 minutos</p>
    </div>
    <div class="stat-card">
      <div class="stat-label">Progreso del test</div>
      <div class="stat-value">${overallProgress}%</div>
      <div class="progress"><div class="progress__bar" style="width:${overallProgress}%"></div></div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Progreso del módulo</div>
      <div class="stat-value">${moduleProgress}%</div>
      <div class="progress"><div class="progress__bar" style="width:${moduleProgress}%"></div></div>
    </div>
  `;
}

function renderModule() {
  if (!state.started || state.finished) {
    modulePanel.innerHTML = "";
    return;
  }

  const module = modules[state.currentModule];
  const moduleQuestions = module.questions.map((q) => renderQuestion(q)).join("");
  const moduleProgress = Math.round(
    (module.questions.filter((q) => state.responses[q.id] !== undefined).length / module.questions.length) * 100,
  );

  modulePanel.innerHTML = `
    <div class="module__meta">
      <div>
        <p class="tag">${module.competency}</p>
        <h2>${module.title}</h2>
      </div>
      <div class="stat-label">${module.questions.length} preguntas · bloquea avance al completar</div>
    </div>
    <p class="module__desc">${module.description}</p>
    <div>${moduleQuestions}</div>
    <div class="module__footer">
      <button class="ghost" ${state.currentModule === 0 ? "disabled" : ""} id="prev-btn">Anterior</button>
      <div style="flex:1"></div>
      <span class="stat-label">${moduleProgress}% respondido</span>
      <button class="secondary" id="next-btn">${
        state.currentModule === modules.length - 1 ? "Enviar y ver resultados" : "Siguiente módulo"
      }</button>
    </div>
  `;

  document.getElementById("prev-btn").onclick = () => {
    if (state.currentModule > 0) {
      state.currentModule -= 1;
      renderModule();
      updateStatus();
    }
  };

  document.getElementById("next-btn").onclick = () => {
    const module = modules[state.currentModule];
    const answeredAll = module.questions.every((q) => state.responses[q.id] !== undefined);
    if (!answeredAll) {
      alert("Completa todas las preguntas del módulo antes de avanzar.");
      return;
    }
    if (state.currentModule < modules.length - 1) {
      state.currentModule += 1;
      renderModule();
      updateStatus();
    } else {
      finishAssessment();
    }
  };
}

function renderQuestion(question) {
  const selected = state.responses[question.id];
  const optionsHtml = question.options
    .map(
      (opt) => `
      <label class="option ${selected === opt.value ? "selected" : ""}">
        <input type="radio" name="${question.id}" value="${opt.value}" ${
        selected === opt.value ? "checked" : ""
      } />
        <div>
          <p class="question__choice">${opt.label}</p>
          ${opt.helper ? `<p class="helper">${opt.helper}</p>` : ""}
        </div>
      </label>
    `,
    )
    .join("");

  return `
    <div class="question">
      <div class="question__title">${question.id}. ${question.prompt}</div>
      <div class="options" data-question="${question.id}">${optionsHtml}</div>
      ${
        question.trait
          ? `<p class="helper">Big Five asociado: ${traitLabels[question.trait]}</p>`
          : ""
      }
    </div>
  `;
}

function attachOptionHandlers() {
  modulePanel.addEventListener("change", (event) => {
    const target = event.target;
    if (target.matches("input[type='radio']")) {
      const questionId = target.getAttribute("name");
      const value = Number(target.value);
      state.responses[questionId] = value;
      renderModule();
      updateStatus();
    }
  });
}

function calculateModuleSummaries() {
  return modules.map((module) => {
    const obtained = module.questions.reduce((sum, q) => sum + (state.responses[q.id] || 0), 0);
    const max = module.questions.length * 5;
    const score = Math.round((obtained / max) * 100);
    return { ...module, score };
  });
}

function calculateTraitScores() {
  const result = {
    apertura: { score: 0, count: 0 },
    responsabilidad: { score: 0, count: 0 },
    extraversión: { score: 0, count: 0 },
    amabilidad: { score: 0, count: 0 },
    estabilidad: { score: 0, count: 0 },
  };

  allQuestions.forEach((question) => {
    if (!question.trait) return;
    result[question.trait].score += state.responses[question.id] || 0;
    result[question.trait].count += 1;
  });

  return Object.keys(result).reduce((acc, trait) => {
    const data = result[trait];
    const normalized = data.count ? Math.round((data.score / (data.count * 5)) * 100) : 0;
    acc[trait] = normalized;
    return acc;
  }, {});
}

function finishAssessment() {
  state.finished = true;
  clearInterval(state.timerId);
  modulePanel.innerHTML = "";
  renderResults();
  updateStatus();
}

function renderResults() {
  const moduleSummaries = calculateModuleSummaries();
  const traitScores = calculateTraitScores();
  resultsPanel.classList.remove("hidden");

  const competenciesHtml = moduleSummaries
    .map(
      (module) => `
      <div class="card">
        <h3>${module.competency}</h3>
        <p>${competencyDescriptions[module.competency]}</p>
        <div class="stat-value">${module.score}%</div>
        <div class="progress"><div class="progress__bar" style="width:${module.score}%"></div></div>
      </div>
    `,
    )
    .join("");

  const bigFiveHtml = Object.keys(traitScores)
    .map((trait) => {
      const score = traitScores[trait];
      return `
        <div class="card">
          <h3>${traitLabels[trait]}</h3>
          <p>${traitDescriptions[trait]}</p>
          <div class="stat-value">${score}%</div>
          <div class="progress"><div class="progress__bar" style="width:${score}%"></div></div>
        </div>
      `;
    })
    .join("");

  resultsPanel.innerHTML = `
    <div class="module__meta">
      <div>
        <p class="tag">Resultados</p>
        <h2>Resumen completo</h2>
      </div>
      <button class="secondary" id="restart-btn">Reiniciar</button>
    </div>
    <div class="result-grid">${competenciesHtml}</div>
    <h3>Perfil de personalidad Big Five</h3>
    <div class="result-grid">${bigFiveHtml}</div>
  `;

  document.getElementById("restart-btn").onclick = () => {
    window.location.reload();
  };
}

function startTimer() {
  state.timerId = setInterval(() => {
    if (!state.started || state.finished) return;
    state.timeLeft -= 1;
    if (state.timeLeft <= 0) {
      state.timeLeft = 0;
      finishAssessment();
    }
    updateStatus();
  }, 1000);
}

function startAssessment() {
  const form = document.getElementById("start-form");
  const data = new FormData(form);
  state.user = {
    nombre: data.get("nombre").trim(),
    cargo: data.get("cargo").trim(),
    email: data.get("email").trim(),
  };

  if (!state.user.nombre || !state.user.cargo || !state.user.email) {
    alert("Completa nombre, cargo y email para iniciar.");
    return;
  }

  state.started = true;
  state.finished = false;
  state.currentModule = 0;
  state.responses = {};
  state.timeLeft = totalDurationSeconds;
  resultsPanel.classList.add("hidden");

  updateStatus();
  renderModule();
  startTimer();
}

function blockNavigation() {
  window.addEventListener("beforeunload", (event) => {
    if (state.started && !state.finished) {
      event.preventDefault();
      event.returnValue = "";
    }
  });
}

function init() {
  const form = document.getElementById("start-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    startAssessment();
  });

  attachOptionHandlers();
  blockNavigation();
}

init();
