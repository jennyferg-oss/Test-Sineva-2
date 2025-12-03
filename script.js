/* =========================
   DATA: 50 QUESTIONS TOTAL
   5 MODULES x 10 QUESTIONS
   + Embedded Big Five tags
   ========================= */

const MODULES = [
  {
    id: "innovation",
    title: "Module 1 — Innovation",
    desc: "How you explore ideas, challenge assumptions, and create value.",
    questions: [
      { text: "Your team is stuck using a process that works 'well enough' but wastes time. What do you do first?", type:"scenario", competency:"innovation", bigFive:["O"], reverse:false },
      { text: "I often notice patterns or opportunities others miss, even if they aren’t obvious at first.", type:"likert", competency:"innovation", bigFive:["O"], reverse:false },
      { text: "A client asks for a solution you’ve never built before and the timeline is tight. You:", type:"scenario", competency:"innovation", bigFive:["C"], reverse:false },
      { text: "I prefer improving existing ideas rather than proposing something totally new. (Subtle)", type:"likert", competency:"innovation", bigFive:["O"], reverse:true },
      { text: "You discover a new tool that could help, but others are skeptical. What’s your move?", type:"scenario", competency:"innovation", bigFive:[], reverse:false },
      { text: "When facing a problem, I enjoy experimenting with multiple approaches before choosing one.", type:"likert", competency:"innovation", bigFive:["O"], reverse:false },
      { text: "You’re offered two paths: a safe option with predictable results, or a bold option with bigger upside. You choose:", type:"scenario", competency:"innovation", bigFive:["N"], reverse:false },
      { text: "I get energized by ambiguity because it gives room for creativity.", type:"likert", competency:"innovation", bigFive:["O"], reverse:false },
      { text: "When someone says 'that’s how we’ve always done it', I usually accept it without pushing much. (Subtle)", type:"likert", competency:"innovation", bigFive:["A"], reverse:true },
      { text: "You need a fresh idea, but data is incomplete. You:", type:"scenario", competency:"innovation", bigFive:[], reverse:false }
    ]
  },
  {
    id: "leadership",
    title: "Module 2 — Leadership",
    desc: "How you influence, take ownership, and move people toward outcomes.",
    questions: [
      { text: "Two teammates disagree strongly in front of the client. In the moment you:", type:"scenario", competency:"leadership", bigFive:["A"], reverse:false },
      { text: "I naturally step up to coordinate when no one is clearly leading.", type:"likert", competency:"leadership", bigFive:["E"], reverse:false },
      { text: "A high-stakes task is late and everyone is stressed. You:", type:"scenario", competency:"leadership", bigFive:["N"], reverse:false },
      { text: "I avoid giving direct feedback because it can create tension. (Subtle)", type:"likert", competency:"leadership", bigFive:["A"], reverse:true },
      { text: "A junior colleague is underperforming but very motivated. Your first step is:", type:"scenario", competency:"leadership", bigFive:["A","C"], reverse:false },
      { text: "I set clear expectations and check progress without micromanaging.", type:"likert", competency:"leadership", bigFive:["C"], reverse:false },
      { text: "Your idea is rejected by the team. You:", type:"scenario", competency:"leadership", bigFive:["E"], reverse:false },
      { text: "I can stay calm and decisive when others feel uncertain.", type:"likert", competency:"leadership", bigFive:["N"], reverse:false },
      { text: "I prefer to wait for formal authority before acting. (Subtle)", type:"likert", competency:"leadership", bigFive:["E"], reverse:true },
      { text: "A project is failing. You realize your plan contributed to it. You:", type:"scenario", competency:"leadership", bigFive:["C"], reverse:false }
    ]
  },
  {
    id: "adaptability",
    title: "Module 3 — Adaptability",
    desc: "How you respond to change, uncertainty, and new constraints.",
    questions: [
      { text: "A priority changes suddenly after you’ve invested days of work. You:", type:"scenario", competency:"adaptability", bigFive:["N"], reverse:false },
      { text: "I can let go of old plans quickly if a better direction appears.", type:"likert", competency:"adaptability", bigFive:["O"], reverse:false },
      { text: "You join a project midstream with little documentation. Your approach is:", type:"scenario", competency:"adaptability", bigFive:["C"], reverse:false },
      { text: "When routines break, I tend to feel blocked and less productive. (Subtle)", type:"likert", competency:"adaptability", bigFive:["N"], reverse:true },
      { text: "A client adds an unexpected legal constraint. You:", type:"scenario", competency:"adaptability", bigFive:[], reverse:false },
      { text: "I enjoy learning new systems even when it slows me down temporarily.", type:"likert", competency:"adaptability", bigFive:["O"], reverse:false },
      { text: "Your plan fails due to external factors. You:", type:"scenario", competency:"adaptability", bigFive:["N"], reverse:false },
      { text: "I stay effective even when instructions are incomplete.", type:"likert", competency:"adaptability", bigFive:["C"], reverse:false },
      { text: "If rules change, I usually resist until I’m forced to adapt. (Subtle)", type:"likert", competency:"adaptability", bigFive:["A"], reverse:true },
      { text: "You move to a role that requires a skill you don’t yet master. You:", type:"scenario", competency:"adaptability", bigFive:[], reverse:false }
    ]
  },
  {
    id: "communication",
    title: "Module 4 — Communication",
    desc: "How clearly you share ideas, listen, and handle tough conversations.",
    questions: [
      { text: "A client misunderstands your message and gets upset. You:", type:"scenario", competency:"communication", bigFive:["A"], reverse:false },
      { text: "I ask clarifying questions before assuming I understand someone.", type:"likert", competency:"communication", bigFive:["A"], reverse:false },
      { text: "In a meeting, a senior person dominates and others go silent. You:", type:"scenario", competency:"communication", bigFive:["E"], reverse:false },
      { text: "I sometimes say less to avoid conflict, even if clarity suffers. (Subtle)", type:"likert", competency:"communication", bigFive:["N"], reverse:true },
      { text: "You must explain a complex topic to a non-expert. You:", type:"scenario", competency:"communication", bigFive:["O"], reverse:false },
      { text: "I adapt my communication style depending on who I’m speaking to.", type:"likert", competency:"communication", bigFive:["A"], reverse:false },
      { text: "A teammate gives you blunt feedback that feels unfair. You:", type:"scenario", competency:"communication", bigFive:["N"], reverse:false },
      { text: "I can disagree strongly while still making the other person feel respected.", type:"likert", competency:"communication", bigFive:["A"], reverse:false },
      { text: "I assume people will 'get it' without much context. (Subtle)", type:"likert", competency:"communication", bigFive:["C"], reverse:true },
      { text: "You notice a silent issue hurting performance, but no one talks about it. You:", type:"scenario", competency:"communication", bigFive:["E"], reverse:false }
    ]
  },
  {
    id: "workstyle",
    title: "Module 5 — Work Style",
    desc: "How you organize yourself, collaborate, and sustain results.",
    questions: [
      { text: "You have 3 urgent tasks and limited time. You:", type:"scenario", competency:"workstyle", bigFive:["C"], reverse:false },
      { text: "I prefer clear structure and timelines over flexible improvisation.", type:"likert", competency:"workstyle", bigFive:["C"], reverse:false },
      { text: "A teammate consistently delivers late but with high quality. You:", type:"scenario", competency:"workstyle", bigFive:["A"], reverse:false },
      { text: "I work best when I can decide priorities on the fly. (Subtle)", type:"likert", competency:"workstyle", bigFive:["O"], reverse:true },
      { text: "You’re asked to support two teams with different expectations. You:", type:"scenario", competency:"workstyle", bigFive:[], reverse:false },
      { text: "I follow through reliably, even on tasks that don’t excite me.", type:"likert", competency:"workstyle", bigFive:["C"], reverse:false },
      { text: "Work becomes repetitive for months. You:", type:"scenario", competency:"workstyle", bigFive:["O"], reverse:false },
      { text: "I feel comfortable working independently for long periods.", type:"likert", competency:"workstyle", bigFive:["E"], reverse:false },
      { text: "I sometimes miss details because I move fast. (Subtle)", type:"likert", competency:"workstyle", bigFive:["C"], reverse:true },
      { text: "A critical deadline is tomorrow and new info appears today. You:", type:"scenario", competency:"workstyle", bigFive:["N"], reverse:false }
    ]
  }
];

// Big Five labels
const BIG5 = {
  O: "Openness",
  C: "Conscientiousness",
  E: "Extraversion",
  A: "Agreeableness",
  N: "Emotional Stability (low Neuroticism)"
};

// Explanations
const COMP_EXPLAIN = {
  innovation:
    "Innovation measures how you explore new ideas, challenge norms, and turn uncertainty into value. High scores suggest you actively seek improvements and creative paths. Lower scores indicate a preference for proven methods and stability.",
  leadership:
    "Leadership measures ownership, influence, and how you guide people toward outcomes. High scores indicate proactive direction, calm decision-making, and accountability. Lower scores may reflect a more individual-contributor or support-focused style.",
  adaptability:
    "Adaptability measures how you respond to change, new constraints, and shifting priorities. High scores suggest flexibility and learning agility. Lower scores can mean you thrive best with stable plans and predictable environments.",
  communication:
    "Communication measures clarity, listening, emotional tone, and how you handle tough conversations. High scores reflect effective alignment and trust-building. Lower scores might indicate you communicate more cautiously or indirectly.",
  workstyle:
    "Work Style measures organization, collaboration rhythm, and consistency under pressure. High scores indicate structured follow-through and sustainable execution. Lower scores may point to a more fluid, spontaneous, or speed-first approach."
};

const BIG5_EXPLAIN = {
  O:
    "Openness reflects curiosity, imagination, and comfort with new ideas. Higher scores mean you enjoy novelty and abstract thinking. Lower scores suggest practical focus and preference for tried-and-true approaches.",
  C:
    "Conscientiousness reflects reliability, planning, and self-discipline. Higher scores mean you naturally organize, follow through, and track details. Lower scores suggest flexibility and a preference for adapting as you go.",
  E:
    "Extraversion reflects social energy, assertiveness, and outward engagement. Higher scores mean you gain energy from interaction and speak up easily. Lower scores suggest you recharge privately and communicate more selectively.",
  A:
    "Agreeableness reflects cooperation, empathy, and trust. Higher scores mean you prioritize harmony and support others. Lower scores suggest you’re more direct, skeptical, or challenge ideas strongly.",
  N:
    "Emotional Stability reflects calmness under stress. Higher scores mean you manage pressure well and recover quickly. Lower scores suggest you feel stress more intensely and may need more certainty to stay at your best."
};

/* =========================
   STATE
   ========================= */
const startScreen = document.getElementById("startScreen");
const testScreen = document.getElementById("testScreen");
const resultsScreen = document.getElementById("resultsScreen");
const questionWrap = document.getElementById("questionWrap");
const moduleTitle = document.getElementById("moduleTitle");
const moduleDesc = document.getElementById("moduleDesc");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const timerEl = document.getElementById("timer");
const timerWrap = document.getElementById("timerWrap");

const resetModal = document.getElementById("resetModal");
const modalOkBtn = document.getElementById("modalOkBtn");

const startBtn = document.getElementById("startBtn");
const previewBtn = document.getElementById("previewBtn");
const modulesPreview = document.getElementById("modulesPreview");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const downloadHtmlBtn = document.getElementById("downloadHtmlBtn");
const downloadJsonBtn = document.getElementById("downloadJsonBtn");
const restartBtn = document.getElementById("restartBtn");
const candidateSummary = document.getElementById("candidateSummary");
const competencyResults = document.getElementById("competencyResults");
const personalityResults = document.getElementById("personalityResults");

let flatQuestions = [];
let currentIndex = 0;
let answers = {}; // {qIndex: 0..4}
let candidate = null;

// Timer
let startTime = null;
let timerInterval = null;

/* =========================
   INIT
   ========================= */
function buildFlatQuestions(){
  flatQuestions = [];
  MODULES.forEach((m, mi) => {
    m.questions.forEach((q, qi) => {
      flatQuestions.push({
        ...q,
        moduleId: m.id,
        moduleTitle: m.title,
        moduleIndex: mi,
        questionIndexInModule: qi
      });
    });
  });
}
buildFlatQuestions();

function showScreen(screen){
  [startScreen, testScreen, resultsScreen].forEach(s => s.classList.add("hidden"));
  screen.classList.remove("hidden");
}

/* =========================
   PREVIEW
   ========================= */
previewBtn.addEventListener("click", () => {
  modulesPreview.classList.toggle("hidden");
  if (!modulesPreview.innerHTML){
    modulesPreview.innerHTML = MODULES.map(m =>
      `<div class="pill"><strong>${m.title}</strong><br>${m.desc}</div>`
    ).join("");
  }
});

/* =========================
   START
   ========================= */
startBtn.addEventListener("click", () => {
  const fullName = document.getElementById("fullName").value.trim();
  const role = document.getElementById("role").value.trim();
  const email = document.getElementById("email").value.trim();
  const consent = document.getElementById("consent").checked;

  if (!fullName || !role || !email || !consent) {
    alert("Please complete all fields and confirm consent.");
    return;
  }

  candidate = { fullName, role, email };
  answers = {};
  currentIndex = 0;

  startTimer();
  renderQuestion();
  showScreen(testScreen);
});

/* =========================
   TIMER
   ========================= */
function startTimer(){
  startTime = Date.now();
  timerWrap.classList.remove("hidden");
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    const ms = Date.now() - startTime;
    timerEl.textContent = formatTime(ms);
  }, 250);
}

function stopTimer(){
  clearInterval(timerInterval);
}

function formatTime(ms){
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60).toString().padStart(2,"0");
  const sec = (totalSec % 60).toString().padStart(2,"0");
  return `${min}:${sec}`;
}

/* =========================
   LEAVE PAGE => RESET
   ========================= */
function hardResetDueToLeave(){
  stopTimer();
  showScreen(startScreen);
  resetModal.classList.remove("hidden");
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden && startTime) {
    hardResetDueToLeave();
  }
});
window.addEventListener("blur", () => {
  if (startTime) hardResetDueToLeave();
});
modalOkBtn.addEventListener("click", ()=> resetModal.classList.add("hidden"));

/* =========================
   RENDER QUESTION
   ========================= */
function renderQuestion(){
  const q = flatQuestions[currentIndex];
  const module = MODULES[q.moduleIndex];

  moduleTitle.textContent = module.title;
  moduleDesc.textContent = module.desc;

  const answeredValue = answers[currentIndex];

  const scaleLabels = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree"
  ];

  questionWrap.innerHTML = `
    <div class="q-card">
      <div class="q-meta">
        <span class="q-num">Q ${currentIndex + 1} of ${flatQuestions.length}</span>
        <span class="q-tag">${capitalize(q.competency)}${q.bigFive?.length ? " · Big Five" : ""}</span>
      </div>
      <div class="q-text">${q.text}</div>
      <div class="scale">
        ${scaleLabels.map((lab, i) => `
          <button type="button"
                  class="${answeredValue === i ? "selected" : ""}"
                  data-score="${i}">
             ${lab}
          </button>
        `).join("")}
      </div>
      <p class="muted small">
        Choose the option that best reflects your true behavior, not what feels “ideal.”
      </p>
    </div>
  `;

  // attach events
  document.querySelectorAll(".scale button").forEach(btn => {
    btn.addEventListener("click", () => {
      const val = Number(btn.dataset.score);
      answers[currentIndex] = val;
      document.querySelectorAll(".scale button").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      updateProgress();
    });
  });

  // nav state
  prevBtn.disabled = currentIndex === 0;
  nextBtn.textContent = currentIndex === flatQuestions.length - 1 ? "Finish" : "Next";

  updateProgress();
}

function updateProgress(){
  const done = Object.keys(answers).length;
  const total = flatQuestions.length;
  const pct = Math.round((done/total)*100);
  progressFill.style.width = pct + "%";
  progressText.textContent = `${done}/${total}`;
}

/* =========================
   NAV
   ========================= */
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0){
    currentIndex--;
    renderQuestion();
  }
});

nextBtn.addEventListener("click", () => {
  if (answers[currentIndex] == null){
    alert("Please select an answer before continuing.");
    return;
  }

  if (currentIndex === flatQuestions.length - 1){
    finishTest();
  } else {
    currentIndex++;
    renderQuestion();
  }
});

/* =========================
   SCORING
   ========================= */
function finishTest(){
  stopTimer();
  const elapsed = formatTime(Date.now() - startTime);

  // competency buckets
  const compScores = {innovation: [], leadership: [], adaptability: [], communication: [], workstyle: []};
  const bigScores = {O: [], C: [], E: [], A: [], N: []};

  flatQuestions.forEach((q, idx) => {
    let raw = answers[idx]; // 0..4
    if (q.reverse) raw = 4 - raw;

    compScores[q.competency].push(raw);

    (q.bigFive || []).forEach(trait => {
      bigScores[trait].push(raw);
    });
  });

  const compPct = {};
  for (const k in compScores){
    compPct[k] = average(compScores[k]) / 4 * 100; // normalize to 100
  }

  const bigPct = {};
  for (const t in bigScores){
    if (bigScores[t].length === 0) bigPct[t] = null;
    else bigPct[t] = average(bigScores[t]) / 4 * 100;
  }

  // Render results
  candidateSummary.textContent =
    `${candidate.fullName} · Applying for: ${candidate.role} · ${candidate.email} · Time: ${elapsed}`;

  competencyResults.innerHTML = Object.keys(compPct).map(key =>
    resultCard(capitalize(key), compPct[key], COMP_EXPLAIN[key])
  ).join("");

  personalityResults.innerHTML = Object.keys(BIG5).map(t =>
    resultCard(BIG5[t], bigPct[t], BIG5_EXPLAIN[t], true)
  ).join("");

  // Save latest results for download
  const resultPayload = {
    candidate,
    elapsed,
    competencies: compPct,
    bigFive: bigPct,
    answers: flatQuestions.map((q, i) => ({
      module: q.moduleId,
      competency: q.competency,
      bigFive: q.bigFive,
      reverse: q.reverse,
      question: q.text,
      score: answers[i]
    }))
  };
  window.__LATEST_RESULTS__ = resultPayload;

  showScreen(resultsScreen);
}

function average(arr){
  return arr.reduce((a,b)=>a+b,0) / arr.length;
}

function capitalize(s){
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function resultCard(title, pct, explain, isPersonality=false){
  if (pct == null){
    return `
      <div class="result-card">
        <div class="result-head">
          <div class="result-title">${title}</div>
          <div class="result-score muted">n/a</div>
        </div>
        <div class="result-explain muted">Not enough items to estimate.</div>
      </div>`;
  }
  const rounded = Math.round(pct);
  const label = isPersonality
    ? `${rounded}% expression`
    : `${rounded}% of ideal benchmark`;

  return `
    <div class="result-card">
      <div class="result-head">
        <div class="result-title">${title}</div>
        <div class="result-score">${label}</div>
      </div>
      <div class="result-bar"><div style="width:${rounded}%"></div></div>
      <div class="result-explain">${explain}</div>
    </div>`;
}

/* =========================
   DOWNLOADS
   ========================= */
downloadJsonBtn.addEventListener("click", () => {
  const data = window.__LATEST_RESULTS__;
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  triggerDownload(url, `assessment_${slug(candidate.fullName)}.json`);
});

downloadHtmlBtn.addEventListener("click", () => {
  const data = window.__LATEST_RESULTS__;
  const html = buildPrintableHtml(data);
  const blob = new Blob([html], {type:"text/html"});
  const url = URL.createObjectURL(blob);
  triggerDownload(url, `assessment_${slug(candidate.fullName)}.html`);
});

function triggerDownload(url, filename){
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function slug(s){
  return s.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"");
}

function buildPrintableHtml(data){
  const {candidate, elapsed, competencies, bigFive} = data;

  const compRows = Object.keys(competencies).map(k => `
    <tr>
      <td>${capitalize(k)}</td>
      <td>${Math.round(competencies[k])}%</td>
      <td>${COMP_EXPLAIN[k]}</td>
    </tr>
  `).join("");

  const bigRows = Object.keys(BIG5).map(t => `
    <tr>
      <td>${BIG5[t]}</td>
      <td>${Math.round(bigFive[t] ?? 0)}%</td>
      <td>${BIG5_EXPLAIN[t]}</td>
    </tr>
  `).join("");

  return `
<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Assessment Results</title>
  <style>
    body{font-family:Inter,Arial,sans-serif;padding:24px;color:#111;}
    h1{margin-top:0;}
    table{width:100%;border-collapse:collapse;margin:10px 0 18px;}
    th,td{border:1px solid #ddd;padding:8px;vertical-align:top;}
    th{background:#f3f4f6;text-align:left;}
    .meta{color:#374151;margin-bottom:10px;}
    .pill{display:inline-block;background:#ecfdf5;color:#065f46;padding:4px 8px;border-radius:999px;font-weight:700;font-size:12px;}
  </style>
</head>
<body>
  <h1>Sineva Assessment Results</h1>
  <div class="meta">
    <div><strong>Name:</strong> ${candidate.fullName}</div>
    <div><strong>Role:</strong> ${candidate.role}</div>
    <div><strong>Email:</strong> ${candidate.email}</div>
    <div><strong>Elapsed time:</strong> ${elapsed}</div>
  </div>

  <h2><span class="pill">Competencies</span></h2>
  <table>
    <thead><tr><th>Competency</th><th>Score</th><th>Meaning</th></tr></thead>
    <tbody>${compRows}</tbody>
  </table>

  <h2><span class="pill">Big Five Personality</span></h2>
  <table>
    <thead><tr><th>Trait</th><th>Expression</th><th>Meaning</th></tr></thead>
    <tbody>${bigRows}</tbody>
  </table>

  <p><em>These results are indicators, not verdicts. They help us understand fit, strengths, and preferred styles.</em></p>
</body>
</html>`;
}

/* =========================
   RESTART
   ========================= */
restartBtn.addEventListener("click", () => {
  location.reload();
});
