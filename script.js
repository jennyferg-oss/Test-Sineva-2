// script.js — Fixed, consistent IDs and module flow
// 5 modules (A..E), 10 questions each, 7 minutes per module, strict order

// ---------- CONFIG ----------
const MODULES = [
  { id: "A", title: "Module A — Logic (10)", type: "competency", compKey: "Logic" },
  { id: "B", title: "Module B — Performance (10)", type: "competency", compKey: "Performance" },
  { id: "C", title: "Module C — Leadership (10)", type: "competency", compKey: "Leadership" },
  { id: "D", title: "Module D — Innovation (10)", type: "competency", compKey: "Innovation" },
  { id: "E", title: "Module E — Big Five (10)", type: "personality", compKey: "Big Five" }
];
const TIME_PER_MODULE_SECONDS = 7 * 60; // 7 minutes
const PASS_THRESHOLD = 90; // percent for admin use

// ---------- QUESTIONS (50 total, 10 per module) ----------
const QUESTIONS = [
  // Module A (Logic) 1-10
  { id: 1, text: "I examine data and assumptions before forming a conclusion.", module: "A" },
  { id: 2, text: "I break complex problems into smaller, manageable parts.", module: "A" },
  { id: 3, text: "I test multiple hypotheses when unsure.", module: "A" },
  { id: 4, text: "I evaluate trade-offs clearly when choosing options.", module: "A" },
  { id: 5, text: "I verify the reliability of sources before using their data.", module: "A" },
  { id: 6, text: "I use simple decision models to guide my choices.", module: "A" },
  { id: 7, text: "I notice patterns that help explain results.", module: "A" },
  { id: 8, text: "I prioritize based on impact and probability.", module: "A" },
  { id: 9, text: "I re-check assumptions after new evidence arrives.", module: "A" },
  { id:10, text: "I remain systematic when facing ambiguous problems.", module: "A" },

  // Module B (Performance) 11-20
  { id:11, text: "I set clear daily priorities and follow them.", module: "B" },
  { id:12, text: "I manage my time to focus on high-impact tasks.", module: "B" },
  { id:13, text: "I follow through on tasks even when motivation dips.", module: "B" },
  { id:14, text: "I deliver work on time without frequent reminders.", module: "B" },
  { id:15, text: "I continuously look for ways to improve processes.", module: "B" },
  { id:16, text: "I track outcomes rather than mere activity.", module: "B" },
  { id:17, text: "I balance speed with acceptable quality.", module: "B" },
  { id:18, text: "I escalate blockers early to avoid delays.", module: "B" },
  { id:19, text: "I use routines that help me stay productive.", module: "B" },
  { id:20, text: "I ask for help early to meet deadlines.", module: "B" },

  // Module C (Leadership) 21-30
  { id:21, text: "I communicate expectations clearly to my team.", module: "C" },
  { id:22, text: "I delegate tasks to develop others.", module: "C" },
  { id:23, text: "I provide feedback that helps people improve.", module: "C" },
  { id:24, text: "I make timely decisions despite incomplete info.", module: "C" },
  { id:25, text: "I build trust through consistent behavior.", module: "C" },
  { id:26, text: "I help resolve team conflicts constructively.", module: "C" },
  { id:27, text: "I align team activities with broader strategy.", module: "C" },
  { id:28, text: "I remain composed under pressure.", module: "C" },
  { id:29, text: "I coach team members to grow professionally.", module: "C" },
  { id:30, text: "I take responsibility for team outcomes.", module: "C" },

  // Module D (Innovation) 31-40
  { id:31, text: "I propose new ideas to improve results.", module: "D" },
  { id:32, text: "I run quick experiments to validate assumptions.", module: "D" },
  { id:33, text: "I challenge the status quo when better options exist.", module: "D" },
  { id:34, text: "I include diverse perspectives when solving problems.", module: "D" },
  { id:35, text: "I learn from small failures and iterate.", module: "D" },
  { id:36, text: "I spot early trends that may affect our work.", module: "D" },
  { id:37, text: "I design simple tests to measure new ideas.", module: "D" },
  { id:38, text: "I balance creativity with measurable outcomes.", module: "D" },
  { id:39, text: "I enjoy working on ambiguous problems to find solutions.", module: "D" },
  { id:40, text: "I encourage small, safe experiments in my team.", module: "D" },

  // Module E (Big Five) 41-50 (two items per trait)
  { id:41, text: "I enjoy exploring new ideas and experiences. (Openness)", module: "E", trait: "Openness" },
  { id:42, text: "I like creative tasks and diverse perspectives. (Openness)", module: "E", trait: "Openness" },

  { id:43, text: "I keep my tasks and workspace organized. (Conscientiousness)", module: "E", trait: "Conscientiousness" },
  { id:44, text: "I plan ahead and follow routines consistently. (Conscientiousness)", module: "E", trait: "Conscientiousness" },

  { id:45, text: "I feel energized by social interactions. (Extraversion)", module: "E", trait: "Extraversion" },
  { id:46, text: "I enjoy being visible and speaking up in groups. (Extraversion)", module: "E", trait: "Extraversion" },

  { id:47, text: "I try to be helpful and cooperative with others. (Agreeableness)", module: "E", trait: "Agreeableness" },
  { id:48, text: "I prefer collaborative solutions and avoiding harsh conflict. (Agreeableness)", module: "E", trait: "Agreeableness" },

  { id:49, text: "I remain calm after stressful events. (Emotional Stability)", module: "E", trait: "Emotional Stability" },
  { id:50, text: "I recover quickly after setbacks and stay focused. (Emotional Stability)", module: "E", trait: "Emotional Stability" }
];

// ---------- STATE ----------
const state = {
  participant: { name: "", email: "", startedAt: null, finishedAt: null },
  answers: Array(QUESTIONS.length).fill(null), // 1..5
  moduleStatus: MODULES.map((m, i) => ({ id: m.id, unlocked: i === 0, completed: false })),
  currentModuleIndex: null,
  timerId: null,
  secondsLeft: TIME_PER_MODULE_SECONDS,
  final: null
};

// ---------- DOM ----------
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

const el = {
  entry: $("#entry"),
  inputName: $("#input-name"),
  inputEmail: $("#input-email"),
  btnOpenChooser: $("#btn-open-chooser"),
  chooser: $("#chooser"),
  modulesList: $("#modules-list"),
  modulePage: $("#module-page"),
  moduleTitle: $("#module-title"),
  timerMin: $("#timer-min"),
  timerSec: $("#timer-sec"),
  questionsArea: $("#questions-area"),
  btnBack: $("#btn-back-chooser"),
  btnComplete: $("#btn-complete-module"),
  results: $("#results"),
  reportName: $("#report-name"),
  overallPercent: $("#overall-percent"),
  overallText: $("#overall-text"),
  competencyOutput: $("#competency-output"),
  oceanOutput: $("#ocean-output"),
  improvementOutput: $("#improvement-output"),
  btnDownloadPdf: $("#btn-download-pdf"),
  btnDownloadCsv: $("#btn-download-csv"),
  btnRestart: $("#btn-restart")
};

// ---------- BOOT ----------
function boot(){
  // wire
  el.btnOpenChooser.addEventListener("click", openChooser);
  el.btnBack.addEventListener("click", backToChooser);
  el.btnComplete.addEventListener("click", completeModule);
  el.btnDownloadPdf.addEventListener("click", downloadPDF);
  el.btnDownloadCsv.addEventListener("click", downloadCSV);
  el.btnRestart.addEventListener("click", ()=> location.reload());

  renderChooser();
}
boot();

// ---------- RENDER MODULE CHOOSER ----------
function renderChooser(){
  // ensure chooser visible
  hide(el.entry);
  show(el.chooser);
  el.modulesList.innerHTML = "";
  MODULES.forEach((m, idx) => {
    const status = state.moduleStatus[idx];
    const card = document.createElement("div");
    card.className = "module-card" + (status.unlocked ? "" : " locked");
    card.innerHTML = `
      <h4>Module ${m.id}</h4>
      <p>${m.title}</p>
      <p class="muted">${status.completed ? "Completed" : (status.unlocked ? "Unlocked" : "Locked")}</p>
      <div class="action">
        <button ${status.unlocked ? "" : "disabled"} data-idx="${idx}" class="start-module">${status.completed ? "Review" : "Start"}</button>
      </div>
    `;
    el.modulesList.appendChild(card);
  });

  // attach handlers
  $$(".start-module").forEach(btn=>{
    btn.addEventListener("click", (e)=>{
      const idx = Number(btn.dataset.idx);
      startModule(idx);
    });
  });
}

// ---------- OPEN CHOOSER (Entry -> chooser) ----------
function openChooser(){
  const name = el.inputName.value.trim();
  const email = el.inputEmail.value.trim();
  if(!name || !email){ alert("Please enter name and email."); return; }
  state.participant.name = name;
  state.participant.email = email;
  state.participant.startedAt = new Date().toISOString();

  hide(el.entry);
  renderChooser();
}

// ---------- START MODULE ----------
function startModule(idx){
  // enforce order
  if(idx > 0 && !state.moduleStatus[idx-1].completed){ alert("Please complete previous module first."); return; }
  state.currentModuleIndex = idx;
  state.secondsLeft = TIME_PER_MODULE_SECONDS;
  renderModulePage(idx);
  startTimer();
}

// ---------- RENDER MODULE PAGE (10 questions) ----------
function renderModulePage(idx){
  const module = MODULES[idx];
  show(el.modulePage);
  hide(el.chooser);
  el.moduleTitle.textContent = module.title;

  // render questions for this module (10)
  el.questionsArea.innerHTML = "";
  const moduleQs = QUESTIONS.filter(q => q.module === module.id);
  moduleQs.forEach((q, localIdx) => {
    const globalIdx = QUESTIONS.indexOf(q);
    const card = document.createElement("div");
    card.className = "question-card";
    card.innerHTML = `
      <div class="q-title">${q.id}. ${escapeHtml(q.text)}</div>
      <div class="options-row" id="opts-${globalIdx}">
        <label><input type="radio" name="q${globalIdx}" value="5"> Strongly Agree</label>
        <label><input type="radio" name="q${globalIdx}" value="4"> Agree</label>
        <label><input type="radio" name="q${globalIdx}" value="3"> Neutral</label>
        <label><input type="radio" name="q${globalIdx}" value="2"> Disagree</label>
        <label><input type="radio" name="q${globalIdx}" value="1"> Strongly Disagree</label>
      </div>
    `;
    // if previously answered, set
    const prev = state.answers[globalIdx];
    if(prev !== null){
      setTimeout(()=> {
        const radios = card.querySelectorAll(`input[name="q${globalIdx}"]`);
        radios.forEach(r => { if(Number(r.value) === prev) r.checked = true; });
      }, 0);
    }
    el.questionsArea.appendChild(card);
  });
}

// ---------- TIMER ----------
function startTimer(){
  clearInterval(state.timerId);
  updateTimerUI();
  state.timerId = setInterval(()=>{
    state.secondsLeft--;
    updateTimerUI();
    if(state.secondsLeft <= 0){
      clearInterval(state.timerId);
      alert("Time is up for this module. Module will be marked complete.");
      completeModule();
    }
  }, 1000);
}
function updateTimerUI(){
  const mm = String(Math.floor(state.secondsLeft/60)).padStart(2,'0');
  const ss = String(state.secondsLeft%60).padStart(2,'0');
  document.getElementById("timer-min").textContent = mm;
  document.getElementById("timer-sec").textContent = ss;
}

// ---------- BACK TO CHOOSER (without completing) ----------
function backToChooser(){
  if(!confirm("Return to module list? Your answers for this module will be saved but module not marked complete.")) return;
  stopTimerAndShowChooser();
}
function stopTimerAndShowChooser(){
  clearInterval(state.timerId);
  show(el.chooser);
  hide(el.modulePage);
  renderChooser();
}

// ---------- COMPLETE MODULE ----------
function completeModule(){
  // save answers for current module
  const idx = state.currentModuleIndex;
  const module = MODULES[idx];
  const moduleQs = QUESTIONS.filter(q => q.module === module.id);
  moduleQs.forEach(q=>{
    const globalIdx = QUESTIONS.indexOf(q);
    const radios = document.getElementsByName(`q${globalIdx}`);
    let found = false;
    for(const r of radios){
      if(r.checked){ state.answers[globalIdx] = Number(r.value); found = true; break; }
    }
    if(!found && state.answers[globalIdx] === null) state.answers[globalIdx] = 1; // treat unanswered as min
  });

  // mark completed and unlock next
  state.moduleStatus[idx].completed = true;
  if(idx + 1 < state.moduleStatus.length) state.moduleStatus[idx+1].unlocked = true;

  clearInterval(state.timerId);
  // if last module completed -> compute results
  const allDone = state.moduleStatus.every(s=>s.completed);
  if(allDone){ computeResults(); showResults(); return; }

  // else return to chooser
  show(el.chooser);
  hide(el.modulePage);
  renderChooser();
}

// ---------- COMPUTE RESULTS ----------
function computeResults(){
  // Competency modules: A,B,C,D -> compute percent each (10 items per module, max 50)
  const compPercent = {};
  for(let i=0;i<4;i++){
    const m = MODULES[i];
    const moduleQs = QUESTIONS.filter(q=>q.module === m.id);
    let sum = 0;
    moduleQs.forEach(q=>{
      const g = QUESTIONS.indexOf(q);
      sum += (state.answers[g] === null ? 1 : state.answers[g]);
    });
    const pct = Math.round((sum / (moduleQs.length * 5)) * 100);
    compPercent[m.compKey] = pct;
  }

  // Personality: module E (10 items, 2 per trait)
  const traitTotals = { "Openness":0, "Conscientiousness":0, "Extraversion":0, "Agreeableness":0, "Emotional Stability":0 };
  QUESTIONS.filter(q=>q.module==="E").forEach(q=>{
    const g = QUESTIONS.indexOf(q);
    const val = (state.answers[g] === null ? 1 : state.answers[g]);
    traitTotals[q.trait] += val;
  });
  const traitPct = {};
  Object.keys(traitTotals).forEach(t=>{
    traitPct[t] = Math.round((traitTotals[t] / (2 * 5)) * 100); // 2 items * 5 max
  });

  // overall competency average
  const overall = Math.round(Object.values(compPercent).reduce((a,b)=>a+b,0) / 4);

  state.final = { competencies: compPercent, personality: traitPct, overallPercent: overall, passed: overall >= PASS_THRESHOLD };
}

// ---------- SHOW RESULTS ----------
function showResults(){
  hide(el.modulePage);
  hide(el.chooser);
  show(el.results);

  el.reportName.textContent = state.participant.name || el.inputName.value;
  el.overallPercent.textContent = state.final.overallPercent + "%";
  el.overallText.textContent = overallMeaning(state.final.overallPercent);

  // competencies
  el.competencyOutput.innerHTML = "";
  Object.entries(state.final.competencies).forEach(([k,v])=>{
    el.competencyOutput.innerHTML += competencyHTML(k,v);
  });

  // personality
  el.oceanOutput.innerHTML = "";
  Object.entries(state.final.personality).forEach(([k,v])=>{
    el.oceanOutput.innerHTML += oceanHTML(k,v);
  });

  // improvement plan
  el.improvementOutput.innerHTML = generatePlan();
}

// ---------- TEXT HELPERS ----------
function overallMeaning(p){
  if(p >= 95) return "Outstanding readiness — exceptional across measured areas.";
  if(p >= 85) return "Strong capability with focused areas to refine.";
  if(p >= 70) return "Solid foundations; focused development will improve readiness.";
  if(p >= 50) return "Developing: practice and coaching will help.";
  return "Early-stage development — opportunity for focused growth.";
}

function competencyHTML(name, pct){
  const level = pct >= 85 ? "High" : pct >= 65 ? "Moderate" : pct >=45 ? "Developing" : "Lower";
  return `<div class="detailed-block">
    <div class="detailed-header">${escapeHtml(name)}: ${pct}% — ${level}</div>
    <div class="detailed-sub">${escapeHtml(briefCompetencyDescription(name, level))}</div>
  </div>`;
}

function oceanHTML(name, pct){
  const level = pct >= 70 ? "High" : pct >=45 ? "Balanced" : "Lower";
  return `<div class="detailed-block">
    <div class="detailed-header">${escapeHtml(name)}: ${pct}% — ${level}</div>
    <div class="detailed-sub">${escapeHtml(briefOceanDescription(name, level))}</div>
  </div>`;
}

function briefCompetencyDescription(name, level){
  const map = {
    "Logic": {
      High: "Structured thinker; uses evidence and frameworks to decide.",
      Moderate: "Good analytical skill; benefits from more testing.",
      Developing: "Works well with practice and templates.",
      Lower: "Prefers intuition; add checklists to improve rigor."
    },
    "Performance": {
      High: "Reliable and results-focused.",
      Moderate: "Consistent; add stretch targets.",
      Developing: "Needs routines and KPI tracking.",
      Lower: "Add accountability systems to improve delivery."
    },
    "Leadership": {
      High: "Decisive and trusted leader.",
      Moderate: "Adapts between direction and collaboration.",
      Developing: "Grow in assertiveness and hard conversations.",
      Lower: "Practice decision-making to build confidence."
    },
    "Innovation": {
      High: "Drives experiments and learning.",
      Moderate: "Balances creativity and execution.",
      Developing: "Start small experiments to build skill.",
      Lower: "Begin with micro-experiments to build comfort."
    }
  };
  return map[name] ? map[name][level] : "";
}

function briefOceanDescription(name, level){
  const map = {
    "Openness": {
      High: "Curious and creative; enjoys novelty.",
      Balanced: "Open yet pragmatic.",
      Lower: "Prefers routine and structure."
    },
    "Conscientiousness": {
      High: "Organized and reliable.",
      Balanced: "Generally structured and adaptive.",
      Lower: "Spontaneous; add planning habits."
    },
    "Extraversion": {
      High: "Outgoing and energized by people.",
      Balanced: "Comfortable in social settings when needed.",
      Lower: "Reserved and reflective; great for deep work."
    },
    "Agreeableness": {
      High: "Cooperative and empathetic.",
      Balanced: "Collaborative with outcomes in mind.",
      Lower: "Direct and task-focused."
    },
    "Emotional Stability": {
      High: "Calm and resilient.",
      Balanced: "Generally steady with occasional stress.",
      Lower: "Sensitive to stress; adopt resilience habits."
    }
  };
  return map[name] ? map[name][level] : "";
}

// ---------- IMPROVEMENT PLAN ----------
function generatePlan(){
  const comps = state.final.competencies;
  const weakest = Object.entries(comps).sort((a,b)=>a[1]-b[1]).slice(0,2).map(x=>x[0]);
  return `
    <h4>Strengths & Opportunities</h4>
    <p>Strengths: ${Object.entries(comps).filter(([k,v])=>v>=65).map(x=>x[0]).join(", ") || "None marked"}</p>
    <p>Opportunities: ${Object.entries(comps).filter(([k,v])=>v<65).map(x=>x[0]).join(", ") || "None marked"}</p>
    <h4>Short-term (2 weeks)</h4>
    <ul>
      <li>Run 2 x 30-min scenario practices focused on: ${weakest.join(", ")}</li>
      <li>Use a short decision checklist (Goal → Options → Risks → Next step) daily.</li>
    </ul>
    <h4>Medium-term (1-3 months)</h4>
    <ul>
      <li>Introduce weekly review sessions and KPI tracking.</li>
      <li>Run monthly micro-experiments to build Innovation muscle.</li>
    </ul>
    <h4>Long-term (6-12 months)</h4>
    <ul>
      <li>Consider mentoring or a short leadership course based on weakest areas.</li>
      <li>Lead a cross-functional small project to grow influence and delivery.</li>
    </ul>
  `;
}

// ---------- EXPORTS (PDF / CSV) ----------
function downloadCSV(){
  const header = ["name","email","overall"];
  Object.keys(state.final.competencies).forEach(k=> header.push(`C_${k.replace(/\s+/g,"_")}`));
  Object.keys(state.final.personality).forEach(k=> header.push(`P_${k.replace(/\s+/g,"_")}`));
  header.push("answers");
  const row = [
    state.participant.name, state.participant.email, state.final.overallPercent
  ];
  Object.values(state.final.competencies).forEach(v=>row.push(v));
  Object.values(state.final.personality).forEach(v=>row.push(v));
  row.push(state.answers.map((a,i)=> `${QUESTIONS[i].id}:${a===null?"":a}`).join("|"));
  const csv = header.join(",") + "\n" + row.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(",");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = `sienva_${Date.now()}.csv`; a.click(); URL.revokeObjectURL(url);
}

async function downloadPDF(){
  try{
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(14); doc.text("Sienva — Assessment Report", 14, 20);
    doc.setFontSize(11); doc.text(`Name: ${state.participant.name}`, 14, 40);
    doc.text(`Email: ${state.participant.email}`, 14, 54);
    doc.text(`Overall competency: ${state.final.overallPercent}%`, 14, 68);
    let y = 86;
    Object.entries(state.final.competencies).forEach(([k,v])=>{
      if(y > 760){ doc.addPage(); y = 40; }
      doc.text(`${k}: ${v}%`, 14, y); y += 12;
    });
    y += 8;
    Object.entries(state.final.personality).forEach(([k,v])=>{
      if(y > 760){ doc.addPage(); y = 40; }
      doc.text(`${k}: ${v}%`, 14, y); y += 12;
    });
    doc.save(`sienva_report_${Date.now()}.pdf`);
  }catch(e){ alert("PDF error: "+e.message); }
}

// ---------- UTIL ----------
function show(el){ el.classList.remove("hidden"); }
function hide(el){ el.classList.add("hidden"); }
function escapeHtml(str){ return (str||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
