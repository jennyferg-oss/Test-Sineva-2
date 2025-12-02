// script.js — Full, final, with 50 questions, modules A..E, 7min timer, scoring, PDF/CSV

// ---------- CONFIG ----------
const MODULES = [
  { id: "A", title: "Module A — Logic (10)", compKey: "Executive Logic" },
  { id: "B", title: "Module B — Performance (10)", compKey: "Performance Orientation" },
  { id: "C", title: "Module C — Leadership (10)", compKey: "Leadership Decision-Making" },
  { id: "D", title: "Module D — Innovation (10)", compKey: "Innovation & Problem Solving" },
  { id: "E", title: "Module E — Big Five (10)", compKey: "Big Five" }
];
const TIME_PER_MODULE_SECONDS = 7 * 60; // 7 minutes
const PASS_THRESHOLD = 90;
const MAX_SCORE_PER_ITEM = 5;

// ---------- QUESTIONS (50 total) ----------
const QUESTIONS = [
  // Module A (1-10) - Executive Logic
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

  // Module B (11-20) - Performance Orientation
  { id:11, text: "I set clear daily priorities and follow them.", module: "B" },
  { id:12, text: "I manage my time to focus on high-impact tasks.", module: "B" },
  { id:13, text: "I follow through on tasks even when motivation dips.", module: "B" },
  { id:14, text: "I deliver work on time without frequent reminders.", module: "B" },
  { id:15, text: "I continuously look for ways to improve processes.", module: "B" },
  { id:16, text: "I track outcomes rather than mere activity.", module: "B" },
  { id:17, text: "I balance speed with acceptable quality.", module: "B" },
  { id:18, text: "I escalate blockers early to avoid delays.", module: "B" },
  { id:19, text: "I use routines that help me stay productive.", module: "B" },
  { id:20, text: "I ask for help early to meet important deadlines.", module: "B" },

  // Module C (21-30) - Leadership Decision-Making
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

  // Module D (31-40) - Innovation & Problem Solving
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

  // Module E (41-50) - Big Five Personality (2 items per trait)
  { id:41, text: "I enjoy exploring new ideas and experiences. (Openness)", module: "E", trait: "Openness" },
  { id:42, text: "I like creative tasks and diverse perspectives. (Openness)", module: "E", trait: "Openness" },

  { id:43, text: "I keep my tasks and workspace organized. (Conscientiousness)", module: "E", trait: "Conscientiousness" },
  { id:44, text: "I plan ahead and follow routines consistently. (Conscientiousness)", module: "E", trait: "Conscientiousness" },

  { id:45, text: "I feel energized by social interactions. (Extraversion)", module: "E", trait: "Extraversion" },
  { id:46, text: "I enjoy being visible and speaking up in groups. (Extraversion)", module: "E", trait: "Extraversion" },

  { id:47, text: "I try to be helpful and cooperative with others. (Agreeableness)", module: "E", trait: "Agreeableness" },
  { id:48, text: "I prefer collaborative solutions and avoid harsh conflict. (Agreeableness)", module: "E", trait: "Agreeableness" },

  { id:49, text: "I remain calm after stressful events. (Emotional Stability)", module: "E", trait: "Emotional Stability" },
  { id:50, text: "I recover quickly after setbacks and stay focused. (Emotional Stability)", module: "E", trait: "Emotional Stability" }
];

// ---------- STATE ----------
const state = {
  participant: { name: "", email: "", startedAt: null, finishedAt: null },
  answers: Array(QUESTIONS.length).fill(null),
  moduleStatus: MODULES.map((m, i) => ({ id: m.id, unlocked: i === 0, completed: false })),
  currentModuleIndex: null,
  timerId: null,
  secondsLeft: TIME_PER_MODULE_SECONDS,
  final: null
};

// ---------- DOM HELPERS ----------
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

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

  $$(".start-module").forEach(btn=>{
    btn.addEventListener("click", (e)=>{
      const idx = Number(btn.dataset.idx);
      startModule(idx);
    });
  });
}

// ---------- OPEN CHOOSER ----------
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
  if(idx > 0 && !state.moduleStatus[idx-1].completed){ alert("Please complete previous module first."); return; }
  state.currentModuleIndex = idx;
  state.secondsLeft = TIME_PER_MODULE_SECONDS;
  renderModulePage(idx);
  startTimer();
}

// ---------- RENDER MODULE PAGE ----------
function renderModulePage(idx){
  const module = MODULES[idx];
  show(el.modulePage);
  hide(el.chooser);
  el.moduleTitle.textContent = module.title;

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
  clearInterval(state.timerId);
  show(el.chooser);
  hide(el.modulePage);
  renderChooser();
}

// ---------- COMPLETE MODULE ----------
function completeModule(){
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
    if(!found && state.answers[globalIdx] === null) state.answers[globalIdx] = 1;
  });

  state.moduleStatus[idx].completed = true;
  if(idx + 1 < state.moduleStatus.length) state.moduleStatus[idx+1].unlocked = true;

  clearInterval(state.timerId);
  const allDone = state.moduleStatus.every(s=>s.completed);
  if(allDone){ computeResults(); showResults(); return; }

  show(el.chooser);
  hide(el.modulePage);
  renderChooser();
}

// ---------- COMPUTE RESULTS ----------
function computeResults(){
  const compPercent = {};
  for(let i=0;i<4;i++){
    const m = MODULES[i];
    const moduleQs = QUESTIONS.filter(q=>q.module === m.id);
    let sum = 0;
    moduleQs.forEach(q=>{
      const g = QUESTIONS.indexOf(q);
      sum += (state.answers[g] === null ? 1 : state.answers[g]);
    });
    compPercent[m.compKey] = Math.round((sum / (moduleQs.length * MAX_SCORE_PER_ITEM)) * 100);
  }

  const traitTotals = { "Openness":0, "Conscientiousness":0, "Extraversion":0, "Agreeableness":0, "Emotional Stability":0 };
  QUESTIONS.filter(q=>q.module==="E").forEach(q=>{
    const g = QUESTIONS.indexOf(q);
    const val = (state.answers[g] === null ? 1 : state.answers[g]);
    traitTotals[q.trait] += val;
  });
  const traitPct = {};
  Object.keys(traitTotals).forEach(t=>{
    traitPct[t] = Math.round((traitTotals[t] / (2 * MAX_SCORE_PER_ITEM)) * 100);
  });

  const overall = Math.round(Object.values(compPercent).reduce((a,b)=>a+b,0) / 4);
  state.final = { competencies: compPercent, personality: traitPct, overallPercent: overall, passed: overall >= PASS_THRESHOLD };
}

// ---------- SHOW RESULTS ----------
function showResults(){
  hide(el.modulePage);
  hide(el.chooser);
  show(el.results);

  el.reportName.textContent = state.participant.name;
  el.overallPercent.textContent = state.final.overallPercent + "%";
  el.overallText.textContent = overallMeaning(state.final.overallPercent);

  el.competencyOutput.innerHTML = "";
  Object.entries(state.final.competencies).forEach(([k,v])=>{
    el.competencyOutput.innerHTML += competencyHTML(k,v);
  });

  el.oceanOutput.innerHTML = "";
  Object.entries(state.final.personality).forEach(([k,v])=>{
    el.oceanOutput.innerHTML += oceanHTML(k,v);
  });

  el.improvementOutput.innerHTML = generatePlan();
  saveLocalResult();
}

// ---------- TEMPLATES & PLANS ----------
function overallMeaning(p){
  if(p >= 95) return "Outstanding readiness — exceptional across measured areas.";
  if(p >= 85) return "Strong capability with focused areas to refine.";
  if(p >= 70) return "Solid foundations; structured development will improve readiness.";
  if(p >= 50) return "Developing: practice and coaching will help.";
  return "Early-stage development — opportunity for focused growth.";
}

function competencyHTML(name, pct){
  const level = pct >= 85 ? "High" : pct >= 65 ? "Moderate" : pct >=45 ? "Developing" : "Lower";
  const desc = {
    "Executive Logic": {
      High:"You demonstrate structured thinking and analytical clarity.",
      Moderate:"Good analytical skills; apply more quick validations.",
      Developing:"Use frameworks and checklists to improve reasoning.",
      Lower:"Adopt decision templates and peer pre-checks."
    },
    "Performance Orientation": {
      High:"Highly results-driven and reliable in delivery.",
      Moderate:"Balances delivery and people; add stretch targets.",
      Developing:"Introduce weekly KPI reviews to build consistency.",
      Lower:"Adopt short accountability routines and visible outcomes."
    },
    "Leadership Decision-Making": {
      High:"Decisive and trusted; aligns teams to purpose.",
      Moderate:"Adaptable leader; practice assertive decisions.",
      Developing:"Use role-play and escalation rules to build confidence.",
      Lower:"Practice making firm choices on low-risk items."
    },
    "Innovation & Problem Solving": {
      High:"Drives experimentation and learning culture.",
      Moderate:"Pilots ideas and scales what works.",
      Developing:"Start with micro-experiments and cross-functional sprints.",
      Lower:"Begin with structured, low-risk experiments."
    }
  };
  return `<div class="detailed-block"><div class="detailed-header">${name}: ${pct}% — ${level}</div><div class="detailed-sub">${desc[name][level]}</div></div>`;
}

function oceanHTML(name,pct){
  const level = pct >= 70 ? "High" : pct >=45 ? "Balanced" : "Lower";
  const desc = {
    "Openness": { High:"Curious and inventive.", Balanced:"Open yet pragmatic.", Lower:"Prefers routine and clarity." },
    "Conscientiousness": { High:"Organized and reliable.", Balanced:"Structured with adaptability.", Lower:"Spontaneous; add planning." },
    "Extraversion": { High:"Outgoing and energetic.", Balanced:"Balanced social energy.", Lower:"Reflective and deep-worker." },
    "Agreeableness": { High:"Cooperative and empathetic.", Balanced:"Collaborative and pragmatic.", Lower:"Direct and task-focused." },
    "Emotional Stability": { High:"Calm and resilient.", Balanced:"Generally steady.", Lower:"Sensitive to stress; adopt resilience habits." }
  };
  return `<div class="detailed-block"><div class="detailed-header">${name}: ${pct}% — ${level}</div><div class="detailed-sub">${desc[name][level]}</div></div>`;
}

function generatePlan(){
  const comps = state.final.competencies;
  const weakest = Object.entries(comps).sort((a,b)=>a[1]-b[1]).slice(0,2).map(x=>x[0]);
  return `
    <h4>Short-term</h4><ul><li>2 x 30-min practice sessions on: ${weakest.join(", ")}</li><li>Use a decision checklist daily.</li></ul>
    <h4>Medium-term</h4><ul><li>Monthly micro-experiments and weekly KPI reviews.</li></ul>
    <h4>Long-term</h4><ul><li>Mentoring or leadership course and a cross-functional project.</li></ul>`;
}

// ---------- EXPORTS ----------
function downloadCSV(){
  const header = ["name","email","overall"];
  Object.keys(state.final.competencies).forEach(k=>header.push(`C_${k.replace(/ /g,"_")}`));
  Object.keys(state.final.personality).forEach(k=>header.push(`P_${k.replace(/ /g,"_")}`));
  header.push("answers");
  const row = [state.participant.name, state.participant.email, state.final.overallPercent];
  Object.values(state.final.competencies).forEach(v=>row.push(v));
  Object.values(state.final.personality).forEach(v=>row.push(v));
  row.push(state.answers.map((a,i)=>`${QUESTIONS[i].id}:${a===null?"":a}`).join("|"));
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

// ---------- LOCAL SAVE ----------
function saveLocalResult(){
  try{
    const key = "sienva_results_v2";
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.push({ participant: state.participant, final: state.final, answers: state.answers });
    localStorage.setItem(key, JSON.stringify(existing));
  }catch(e){ console.warn("Failed saving local result", e); }
}

// ---------- UTIL ----------
function show(el){ if(el) el.classList.remove("hidden"); }
function hide(el){ if(el) el.classList.add("hidden"); }
function escapeHtml(s){ return (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
