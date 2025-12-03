/* =========================================================
   Competencies + Big Five Test (50 Questions / 5 Modules)
   - Bilingual ES/EN
   - Timer global
   - Restart on tab leave / visibility change
========================================================= */

const COMPETENCIES = ["innovation","leadership","adaptability","communication","workstyle"];
const BIG5 = ["openness","conscientiousness","extraversion","agreeableness","neuroticism"];

const competencyInfo = {
  innovation: {
    es: {
      title: "Innovación",
      desc: "Capacidad de generar mejoras reales, cuestionar supuestos y convertir ideas en valor."
    },
    en: {
      title: "Innovation",
      desc: "Ability to create real improvements, question assumptions, and turn ideas into value."
    }
  },
  leadership: {
    es: {
      title: "Liderazgo",
      desc: "Influencia positiva para movilizar personas, decidir con claridad y sostener la responsabilidad."
    },
    en: {
      title: "Leadership",
      desc: "Positive influence to mobilize people, decide clearly, and sustain accountability."
    }
  },
  adaptability: {
    es: {
      title: "Adaptación",
      desc: "Flexibilidad ante cambios, tolerancia a la ambigüedad y aprendizaje rápido sin perder foco."
    },
    en: {
      title: "Adaptability",
      desc: "Flexibility in change, tolerance for ambiguity, and fast learning without losing focus."
    }
  },
  communication: {
    es: {
      title: "Comunicación",
      desc: "Claridad, escucha activa y capacidad de ajustar el mensaje según el contexto y el público."
    },
    en: {
      title: "Communication",
      desc: "Clarity, active listening, and ability to adapt the message to context and audience."
    }
  },
  workstyle: {
    es: {
      title: "Estilo de trabajo",
      desc: "Forma de planear, ejecutar, colaborar y sostener la calidad bajo presión."
    },
    en: {
      title: "Work Style",
      desc: "How you plan, execute, collaborate, and maintain quality under pressure."
    }
  }
};

const big5Info = {
  openness: {
    es: "Apertura: curiosidad intelectual, gusto por explorar lo nuevo y pensar diferente.",
    en: "Openness: intellectual curiosity, exploring novelty, and thinking differently."
  },
  conscientiousness: {
    es: "Responsabilidad: orden, disciplina, constancia y enfoque en la calidad.",
    en: "Conscientiousness: organization, discipline, consistency, and quality focus."
  },
  extraversion: {
    es: "Extroversión: energía social, asertividad y preferencia por interacción.",
    en: "Extraversion: social energy, assertiveness, and preference for interaction."
  },
  agreeableness: {
    es: "Amabilidad: cooperación, empatía, confianza y orientación al equipo.",
    en: "Agreeableness: cooperation, empathy, trust, and team orientation."
  },
  neuroticism: {
    es: "Neuroticismo (inverso = estabilidad emocional): sensibilidad al estrés y reactividad emocional.",
    en: "Neuroticism (inverse = emotional stability): stress sensitivity and emotional reactivity."
  }
};

/* ----------------------------
   QUESTIONS (50)
   10 per module
   - competency: which competence it scores
   - big5: optional big five trait scored too
   - reverse: if true, big5 score is reversed
   Likert 1..5
----------------------------- */

const questions = [
  // MODULE 1 — INNOVATION (10)
  {
    module: 1, competency: "innovation",
    es:"Tu equipo insiste en un proceso lento “porque siempre ha funcionado”. Tú propones un cambio aunque no haya garantía total de éxito.",
    en:"Your team insists on a slow process “because it has always worked.” You propose a change even without full guarantees.",
  },
  {
    module: 1, competency: "innovation",
    es:"Si una nueva herramienta promete ahorrar tiempo, prefieres probarla en pequeño antes de descartar lo actual.",
    en:"If a new tool could save time, you prefer piloting it on a small scale before dismissing current methods.",
  },
  {
    module: 1, competency: "innovation",
    es:"Cuando algo sale bien, sueles preguntarte qué parte podría ser todavía mejor.",
    en:"When something works well, you usually ask what could still be improved.",
  },
  {
    module: 1, competency: "innovation",
    es:"En un proyecto crítico, priorizas ideas seguras sobre ideas que podrían duplicar resultados pero también fallar.",
    en:"In a critical project, you prioritize safe ideas over ideas that could double results but might fail.",
  },
  {
    module: 1, competency: "innovation",
    es:"Si no entiendes una tendencia nueva, te incomoda hasta que la investigas por tu cuenta.",
    en:"If you don’t understand a new trend, it bothers you until you research it yourself.",
    big5:"openness"
  },
  {
    module: 1, competency: "innovation",
    es:"Te entusiasma trabajar con conceptos abstractos aunque no sepas cómo se aplicarán todavía.",
    en:"You enjoy working with abstract concepts even if their application isn’t clear yet.",
    big5:"openness"
  },
  {
    module: 1, competency: "innovation",
    es:"Cuando alguien cuestiona tu idea, tiendes a defenderla más que a rediseñarla.",
    en:"When someone challenges your idea, you tend to defend it more than redesign it.",
    big5:"agreeableness", reverse:true
  },
  {
    module: 1, competency: "innovation",
    es:"Te parece valioso experimentar incluso si el resultado es solo aprendizaje.",
    en:"You see experimentation as valuable even if the only outcome is learning.",
  },
  {
    module: 1, competency: "innovation",
    es:"Prefieres que tu trabajo tenga reglas claras antes de proponer variantes creativas.",
    en:"You prefer clear rules before proposing creative variants.",
    big5:"conscientiousness", reverse:false
  },
  {
    module: 1, competency: "innovation",
    es:"Si tu idea no es adoptada al inicio, buscas otra forma de validarla sin rendirte.",
    en:"If your idea isn’t adopted at first, you look for another way to validate it instead of giving up.",
  },

  // MODULE 2 — LEADERSHIP (10)
  {
    module: 2, competency: "leadership",
    es:"Ante un conflicto entre dos compañeros clave, intervienes aunque no te lo pidan para evitar fricción futura.",
    en:"When two key teammates conflict, you step in even if not asked to prevent future friction.",
  },
  {
    module: 2, competency: "leadership",
    es:"Cuando hay duda, prefieres decidir con información incompleta antes que esperar demasiado.",
    en:"When there’s uncertainty, you prefer deciding with incomplete information rather than waiting too long.",
  },
  {
    module: 2, competency: "leadership",
    es:"Si un objetivo no se cumple, primero revisas qué parte del sistema falló antes de señalar a alguien.",
    en:"If a goal is missed, you first review what failed in the system before blaming someone.",
  },
  {
    module: 2, competency: "leadership",
    es:"Te sientes cómodo dando feedback directo aunque pueda incomodar.",
    en:"You’re comfortable giving direct feedback even if it may feel uncomfortable.",
    big5:"extraversion"
  },
  {
    module: 2, competency: "leadership",
    es:"En reuniones, hablas solo cuando tienes certeza total, no cuando tienes hipótesis.",
    en:"In meetings, you speak only when totally certain, not when you have hypotheses.",
    big5:"extraversion", reverse:true
  },
  {
    module: 2, competency: "leadership",
    es:"Si una persona no rinde, te enfocas más en entrenarla que en reemplazarla rápido.",
    en:"If someone underperforms, you focus more on coaching them than replacing them quickly.",
    big5:"agreeableness"
  },
  {
    module: 2, competency: "leadership",
    es:"Te cuesta delegar tareas importantes porque sientes que nadie las hará igual que tú.",
    en:"You struggle to delegate important tasks because you feel no one will do them like you would.",
  },
  {
    module: 2, competency: "leadership",
    es:"Con presión alta, mantienes la calma y priorizas sin levantar la voz.",
    en:"Under high pressure, you stay calm and prioritize without raising your voice.",
    big5:"neuroticism", reverse:true
  },
  {
    module: 2, competency: "leadership",
    es:"Cuando lideras, haces explícito el “por qué” antes del “qué”.",
    en:"When leading, you make the “why” clear before the “what.”",
  },
  {
    module: 2, competency: "leadership",
    es:"Si algo no sale, asumes públicamente la responsabilidad aunque no haya sido solo tu culpa.",
    en:"If something goes wrong, you take public responsibility even if it wasn’t only your fault.",
  },

  // MODULE 3 — ADAPTABILITY (10)
  {
    module: 3, competency: "adaptability",
    es:"Te asignan un proyecto con reglas cambiantes. Ajustas tu plan sin frustrarte demasiado.",
    en:"You’re assigned a project with changing rules. You adjust your plan without getting too frustrated.",
  },
  {
    module: 3, competency: "adaptability",
    es:"Cuando algo cambia a última hora, piensas primero en alternativas posible antes de reclamar.",
    en:"When something changes last-minute, you think of possible alternatives before complaining.",
  },
  {
    module: 3, competency: "adaptability",
    es:"Si no entiendes una tarea nueva, prefieres aprenderla solo antes de pedir ayuda.",
    en:"If you don’t understand a new task, you prefer learning it alone before asking for help.",
    big5:"conscientiousness", reverse:true
  },
  {
    module: 3, competency: "adaptability",
    es:"En entornos inciertos, sueles sentir ansiedad que te dificulta actuar.",
    en:"In uncertain environments, you often feel anxiety that makes it hard to act.",
    big5:"neuroticism"
  },
  {
    module: 3, competency: "adaptability",
    es:"Te adaptas rápido porque te interesa más el resultado que la forma original.",
    en:"You adapt quickly because you care more about results than the original method.",
  },
  {
    module: 3, competency: "adaptability",
    es:"Cuando hay nuevas prioridades, cambias de foco sin necesitar mucha validación.",
    en:"When priorities shift, you change focus without needing much validation.",
  },
  {
    module: 3, competency: "adaptability",
    es:"Tiendes a mantener rutinas fijas, incluso si el contexto sugiere que ya no sirven.",
    en:"You tend to keep fixed routines even when the context suggests they no longer work.",
  },
  {
    module: 3, competency: "adaptability",
    es:"Te sientes estimulado por problemas nuevos más que intimidado.",
    en:"You feel energized by new problems more than intimidated.",
    big5:"openness"
  },
  {
    module: 3, competency: "adaptability",
    es:"Si recibes críticas, puedes ajustar tu enfoque sin tomarlo personal.",
    en:"If you receive criticism, you can adjust your approach without taking it personally.",
    big5:"agreeableness"
  },
  {
    module: 3, competency: "adaptability",
    es:"Te cuesta trabajar sin instrucciones claras al inicio.",
    en:"You find it hard to work without clear instructions at first.",
  },

  // MODULE 4 — COMMUNICATION (10)
  {
    module: 4, competency: "communication",
    es:"En una reunión, prefieres preguntar para confirmar antes de asumir que entendiste.",
    en:"In a meeting, you prefer asking to confirm before assuming you understood.",
  },
  {
    module: 4, competency: "communication",
    es:"Cuando explicas algo complejo, lo haces con ejemplos simples aunque parezca obvio.",
    en:"When explaining something complex, you use simple examples even if they seem obvious.",
  },
  {
    module: 4, competency: "communication",
    es:"Si alguien no está de acuerdo contigo, intentas entender su lógica antes de responder.",
    en:"If someone disagrees with you, you try to understand their logic before responding.",
    big5:"agreeableness"
  },
  {
    module: 4, competency: "communication",
    es:"Tiendes a decir lo que la gente quiere oír para evitar tensión.",
    en:"You tend to say what people want to hear to avoid tension.",
    big5:"agreeableness", reverse:true
  },
  {
    module: 4, competency: "communication",
    es:"Te gusta hablar en público o liderar la conversación con facilidad.",
    en:"You enjoy public speaking or naturally leading conversations.",
    big5:"extraversion"
  },
  {
    module: 4, competency: "communication",
    es:"Cuando te dan feedback, lo recibes con mente abierta sin justificarte de inmediato.",
    en:"When you get feedback, you receive it openly without immediately explaining yourself away.",
    big5:"neuroticism", reverse:true
  },
  {
    module: 4, competency: "communication",
    es:"En chats escritos, confirmas acuerdos para evitar interpretaciones.",
    en:"In written chats, you confirm agreements to avoid misinterpretations.",
    big5:"conscientiousness"
  },
  {
    module: 4, competency: "communication",
    es:"Si un mensaje es ambiguo, prefieres esperar a que la otra persona aclare.",
    en:"If a message is ambiguous, you prefer waiting for the other person to clarify.",
  },
  {
    module: 4, competency: "communication",
    es:"Eres capaz de ser firme sin sonar agresivo.",
    en:"You can be firm without sounding aggressive.",
  },
  {
    module: 4, competency: "communication",
    es:"Sueles notar emociones en otras personas aunque no las expresen claramente.",
    en:"You usually notice other people’s emotions even if they don’t express them clearly.",
  },

  // MODULE 5 — WORK STYLE (10)
  {
    module: 5, competency: "workstyle",
    es:"Antes de ejecutar, organizas prioridades y tiempos incluso si nadie te lo pide.",
    en:"Before executing, you organize priorities and timelines even if no one asks you to.",
    big5:"conscientiousness"
  },
  {
    module: 5, competency: "workstyle",
    es:"Te resulta fácil mantener calidad alta aunque haya presión de tiempo.",
    en:"You find it easy to keep high quality even under time pressure.",
  },
  {
    module: 5, competency: "workstyle",
    es:"Cuando terminas una tarea, revisas detalles aunque ya esté “bien”.",
    en:"When you finish a task, you review details even if it’s already “good enough.”",
    big5:"conscientiousness"
  },
  {
    module: 5, competency: "workstyle",
    es:"Si hay demasiadas tareas, eliges una sola y la terminas antes de tocar otra.",
    en:"If there are too many tasks, you pick one and finish it before starting another.",
  },
  {
    module: 5, competency: "workstyle",
    es:"Trabajar con otras personas te da energía más que agotarte.",
    en:"Working with others gives you energy more than draining you.",
    big5:"extraversion"
  },
  {
    module: 5, competency: "workstyle",
    es:"Te frustras si no controlas un resultado importante.",
    en:"You get frustrated if you can’t control an important outcome.",
    big5:"neuroticism"
  },
  {
    module: 5, competency: "workstyle",
    es:"Prefieres procesos claros y repetibles incluso si reducen creatividad.",
    en:"You prefer clear and repeatable processes even if they reduce creativity.",
  },
  {
    module: 5, competency: "workstyle",
    es:"Cambias tu forma de trabajar según con quién colaboras.",
    en:"You change your work approach depending on who you collaborate with.",
    big5:"openness"
  },
  {
    module: 5, competency: "workstyle",
    es:"Cuando no estás de acuerdo con un plan, lo dices aunque sea impopular.",
    en:"When you disagree with a plan, you say it even if it’s unpopular.",
  },
  {
    module: 5, competency: "workstyle",
    es:"Prefieres entregar rápido algo aceptable que tarde algo excelente.",
    en:"You prefer delivering something acceptable fast over something excellent later.",
    big5:"conscientiousness", reverse:true
  },
];

/* ----------------------------
   UI references
----------------------------- */
const startScreen = document.getElementById("startScreen");
const testScreen = document.getElementById("testScreen");
const resultsScreen = document.getElementById("resultsScreen");
const questionCard = document.getElementById("questionCard");
const moduleTitle = document.getElementById("moduleTitle");
const moduleDesc = document.getElementById("moduleDesc");
const moduleProgressText = document.getElementById("moduleProgressText");
const overallProgressText = document.getElementById("overallProgressText");
const progressFill = document.getElementById("progressFill");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const timerEl = document.getElementById("timer");
const timerLabel = document.getElementById("timerLabel");
const langToggle = document.getElementById("langToggle");

const restartOverlay = document.getElementById("restartOverlay");
const overlayRestart = document.getElementById("overlayRestart");

const resultsSub = document.getElementById("resultsSub");
const competencyResults = document.getElementById("competencyResults");
const bigFiveResults = document.getElementById("bigFiveResults");
const restartBtn = document.getElementById("restartBtn");
const downloadBtn = document.getElementById("downloadBtn");

/* ----------------------------
   State
----------------------------- */
let lang = "es";
let currentIndex = 0;
let answers = new Array(questions.length).fill(null);
let startedAt = null;
let timerInterval = null;
let userData = { name:"", role:"", email:"" };

/* ----------------------------
   Language strings
----------------------------- */
const UI = {
  es:{
    startTitle:"Antes de empezar",
    startDesc:"Este test mide competencias clave y personalidad. Si sales de la pestaña o cambias de aplicación, el test se reinicia.",
    nameLabel:"Nombre completo",
    roleLabel:"Cargo al que aplica",
    emailLabel:"Email",
    startBtn:"Iniciar test",
    timeLabel:"Tiempo total",
    prev:"← Anterior",
    next:"Siguiente →",
    resultsTitle:"Resultados",
    bigFiveTitle:"Big Five de personalidad",
    restart:"Reiniciar test",
    download:"Descargar resultados (.txt)",
    moduleWord:"Módulo",
    overlayTitle:"Test reiniciado",
    overlayDesc:"Saliste de la página. Por integridad del test, debes comenzar de nuevo.",
    overlayRestart:"Volver a iniciar",
    scaleLabels:[
      "Totalmente en desacuerdo",
      "En desacuerdo",
      "Ni de acuerdo ni en desacuerdo",
      "De acuerdo",
      "Totalmente de acuerdo"
    ]
  },
  en:{
    startTitle:"Before you start",
    startDesc:"This assessment measures key competencies and personality. If you leave the tab or switch apps, the test restarts.",
    nameLabel:"Full name",
    roleLabel:"Role applied for",
    emailLabel:"Email",
    startBtn:"Start test",
    timeLabel:"Total time",
    prev:"← Previous",
    next:"Next →",
    resultsTitle:"Results",
    bigFiveTitle:"Big Five personality",
    restart:"Restart test",
    download:"Download results (.txt)",
    moduleWord:"Module",
    overlayTitle:"Test restarted",
    overlayDesc:"You left the page. For test integrity, you must start again.",
    overlayRestart:"Start again",
    scaleLabels:[
      "Strongly disagree",
      "Disagree",
      "Neither agree nor disagree",
      "Agree",
      "Strongly agree"
    ]
  }
};

/* ----------------------------
   Initialize
----------------------------- */
applyLanguage();
bindStart();
bindNav();
bindRestartRules();

/* ----------------------------
   Start Form
----------------------------- */
function bindStart(){
  document.getElementById("startForm").addEventListener("submit",(e)=>{
    e.preventDefault();
    userData.name = document.getElementById("fullName").value.trim();
    userData.role = document.getElementById("roleApplied").value.trim();
    userData.email = document.getElementById("email").value.trim();

    if(!userData.name || !userData.role || !userData.email) return;

    startScreen.classList.add("hidden");
    testScreen.classList.remove("hidden");

    startedAt = Date.now();
    startTimer();
    renderQuestion();
  })
}

/* ----------------------------
   Navigation
----------------------------- */
function bindNav(){
  prevBtn.addEventListener("click",()=>{
    if(currentIndex>0){
      currentIndex--;
      renderQuestion();
    }
  });

  nextBtn.addEventListener("click",()=>{
    if(answers[currentIndex]==null){
      flashRequired();
      return;
    }
    if(currentIndex < questions.length-1){
      currentIndex++;
      renderQuestion();
    } else {
      finishTest();
    }
  });

  langToggle.addEventListener("click",()=>{
    lang = (lang==="es") ? "en" : "es";
    applyLanguage();
    if(!testScreen.classList.contains("hidden")) renderQuestion();
    if(!resultsScreen.classList.contains("hidden")) renderResults();
  });
}

/* ----------------------------
   Render Question
----------------------------- */
function renderQuestion(){
  const q = questions[currentIndex];
  const moduleNum = q.module;
  const moduleQs = questions.filter(x=>x.module===moduleNum);
  const moduleIndex = moduleQs.indexOf(q);

  moduleTitle.textContent = `${UI[lang].moduleWord} ${moduleNum} · ${competencyInfo[q.competency][lang].title}`;
  moduleDesc.textContent = competencyInfo[q.competency][lang].desc;

  moduleProgressText.textContent = `${moduleIndex+1}/${moduleQs.length}`;
  overallProgressText.textContent = `${currentIndex+1}/${questions.length}`;
  progressFill.style.width = `${((currentIndex)/questions.length)*100}%`;

  prevBtn.textContent = UI[lang].prev;
  nextBtn.textContent = (currentIndex===questions.length-1)
    ? (lang==="es" ? "Finalizar test" : "Finish test")
    : UI[lang].next;

  questionCard.innerHTML = `
    <div class="q-meta">
      <span>${competencyInfo[q.competency][lang].title}</span>
      <span>${currentIndex+1} / ${questions.length}</span>
    </div>
    <div class="q-title">${q[lang]}</div>
    <div class="scale" role="radiogroup" aria-label="Likert scale">
      ${UI[lang].scaleLabels.map((label, i)=>`
        <button class="scale-btn ${answers[currentIndex]===(i+1)?"selected":""}" 
                data-val="${i+1}" role="radio" aria-checked="${answers[currentIndex]===(i+1)}">
          ${i+1}
          <small>${label}</small>
        </button>
      `).join("")}
    </div>
  `;

  questionCard.querySelectorAll(".scale-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{
      const val = Number(btn.dataset.val);
      answers[currentIndex] = val;
      renderQuestion();
    });
  });
}

/* ----------------------------
   Required flash
----------------------------- */
function flashRequired(){
  questionCard.animate(
    [{transform:"translateX(0)"},{transform:"translateX(-6px)"},{transform:"translateX(6px)"},{transform:"translateX(0)"}],
    {duration:220}
  );
}

/* ----------------------------
   Timer
----------------------------- */
function startTimer(){
  timerLabel.textContent = UI[lang].timeLabel;
  timerInterval = setInterval(()=>{
    const s = Math.floor((Date.now()-startedAt)/1000);
    const mm = String(Math.floor(s/60)).padStart(2,"0");
    const ss = String(s%60).padStart(2,"0");
    timerEl.textContent = `${mm}:${ss}`;
  },1000);
}

/* ----------------------------
   Finish & scoring
----------------------------- */
function finishTest(){
  clearInterval(timerInterval);
  testScreen.classList.add("hidden");
  resultsScreen.classList.remove("hidden");
  renderResults();
}

function renderResults(){
  document.getElementById("resultsTitle").textContent = UI[lang].resultsTitle;
  document.getElementById("bigFiveTitle").textContent = UI[lang].bigFiveTitle;

  const totalTime = timerEl.textContent;
  resultsSub.textContent =
    (lang==="es")
      ? `${userData.name} · ${userData.role} · ${userData.email} · Tiempo: ${totalTime}`
      : `${userData.name} · ${userData.role} · ${userData.email} · Time: ${totalTime}`;

  // Competency scoring
  const compScores = {};
  COMPETENCIES.forEach(c=>{
    const idxs = questions
      .map((q,i)=> q.competency===c ? i : -1)
      .filter(i=>i>-1);

    const avg = idxs.reduce((a,i)=>a+answers[i],0)/idxs.length; // 1..5
    compScores[c] = toPercent(avg);
  });

  competencyResults.innerHTML = COMPETENCIES.map(c=>{
    return `
      <div class="result-item">
        <h4>${competencyInfo[c][lang].title}</h4>
        <div class="percent">${compScores[c]}%</div>
        <p>${competencyInfo[c][lang].desc}
        ${(lang==="es")
          ? ` Un porcentaje cercano a 100% indica dominio consistente en esta competencia.`
          : ` A percentage close to 100% indicates consistent mastery of this competence.`}
        </p>
      </div>
    `;
  }).join("");

  // Big Five scoring (only questions with big5)
  const big5Scores = {};
  BIG5.forEach(t=>{
    const items = questions
      .map((q,i)=> (q.big5===t ? {i,q} : null))
      .filter(Boolean);

    if(items.length===0){ big5Scores[t]=null; return; }

    const vals = items.map(({i,q})=>{
      let v = answers[i]; //1..5
      if(q.reverse) v = 6 - v; // reverse
      return v;
    });

    const avg = vals.reduce((a,b)=>a+b,0)/vals.length;
    big5Scores[t] = toPercent(avg);
  });

  bigFiveResults.innerHTML = BIG5.map(t=>{
    const pct = big5Scores[t];
    const title = (lang==="es")
      ? ({
          openness:"Apertura",
          conscientiousness:"Responsabilidad",
          extraversion:"Extroversión",
          agreeableness:"Amabilidad",
          neuroticism:"Neuroticismo"
        }[t])
      : ({
          openness:"Openness",
          conscientiousness:"Conscientiousness",
          extraversion:"Extraversion",
          agreeableness:"Agreeableness",
          neuroticism:"Neuroticism"
        }[t]);

    return `
      <div class="result-item">
        <h4>${title}</h4>
        <div class="percent">${pct}%</div>
        <p>${big5Info[t][lang]}
        ${(lang==="es")
          ? ` Un puntaje alto representa mayor presencia de este rasgo en tu estilo natural.`
          : ` A higher score means this trait is more present in your natural style.`}
        </p>
      </div>
    `;
  }).join("");

  bindResultButtons(compScores, big5Scores, totalTime);
}

function toPercent(avg1to5){
  return Math.round(((avg1to5-1)/4)*100);
}

/* ----------------------------
   Restart buttons + download
----------------------------- */
function bindResultButtons(compScores, big5Scores, totalTime){
  restartBtn.textContent = UI[lang].restart;
  downloadBtn.textContent = UI[lang].download;

  restartBtn.onclick = hardRestart;

  downloadBtn.onclick = ()=>{
    const lines = [];
    lines.push("=== Competencies & Personality Results ===");
    lines.push(`Name: ${userData.name}`);
    lines.push(`Role: ${userData.role}`);
    lines.push(`Email: ${userData.email}`);
    lines.push(`Time: ${totalTime}`);
    lines.push("");

    lines.push("--- Competencies ---");
    COMPETENCIES.forEach(c=>{
      lines.push(`${competencyInfo[c].en.title}: ${compScores[c]}%`);
    });

    lines.push("");
    lines.push("--- Big Five ---");
    BIG5.forEach(t=>{
      lines.push(`${t}: ${big5Scores[t]}%`);
    });

    const blob = new Blob([lines.join("\n")], {type:"text/plain"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${userData.name.replace(/\s+/g,"_")}_results.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
}

/* ----------------------------
   Page leave reset rules
----------------------------- */
function bindRestartRules(){
  const triggerRestart = ()=>{
    if(startedAt && !resultsScreen.classList.contains("hidden")){
      // already finished, don't restart
      return;
    }
    if(startedAt){
      showRestartOverlay();
    }
  };

  document.addEventListener("visibilitychange", ()=>{
    if(document.hidden) triggerRestart();
  });

  window.addEventListener("blur", triggerRestart);

  overlayRestart.addEventListener("click", hardRestart);
}

function showRestartOverlay(){
  restartOverlay.classList.remove("hidden");
}

function hardRestart(){
  // reset state
  currentIndex = 0;
  answers = new Array(questions.length).fill(null);
  startedAt = null;
  clearInterval(timerInterval);
  timerEl.textContent = "00:00";

  // reset screens
  restartOverlay.classList.add("hidden");
  resultsScreen.classList.add("hidden");
  testScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");

  // clear form
  document.getElementById("startForm").reset();
}

/* ----------------------------
   Apply Language
----------------------------- */
function applyLanguage(){
  // start
  document.getElementById("startTitle").textContent = UI[lang].startTitle;
  document.getElementById("startDesc").textContent = UI[lang].startDesc;
  document.getElementById("nameLabel").textContent = UI[lang].nameLabel;
  document.getElementById("roleLabel").textContent = UI[lang].roleLabel;
  document.getElementById("emailLabel").textContent = UI[lang].emailLabel;
  document.getElementById("startBtn").textContent = UI[lang].startBtn;
  timerLabel.textContent = UI[lang].timeLabel;

  // overlay
  document.getElementById("overlayTitle").textContent = UI[lang].overlayTitle;
  document.getElementById("overlayDesc").textContent = UI[lang].overlayDesc;
  document.getElementById("overlayRestart").textContent = UI[lang].overlayRestart;

  // buttons if in test
  prevBtn.textContent = UI[lang].prev;
  nextBtn.textContent = UI[lang].next;
}
