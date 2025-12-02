/* script.js
   Sienva — Executive Assessment
   - 5 modules (A..E), 10 items each = 50 items
   - Forced order A→B→C→D→E
   - Timer: 7 minutes per module (420s), visible
   - Minimalist professional UI
   - Results: percentages (competencies + Big Five)
   - PDF/CSV/JSON exports, localStorage save
*/

// -------------------- CONFIG --------------------
const MODULES = [
  { id: "A", key: "A", title: "Module A — Executive Logic (10 items)", type: "competency", compKey: "Executive Logic" },
  { id: "B", key: "B", title: "Module B — Performance Orientation (10 items)", type: "competency", compKey: "Performance Orientation" },
  { id: "C", key: "C", title: "Module C — Leadership Decision-Making (10 items)", type: "competency", compKey: "Leadership Decision-Making" },
  { id: "D", key: "D", title: "Module D — Innovation & Problem Solving (10 items)", type: "competency", compKey: "Innovation & Problem Solving" },
  { id: "E", key: "E", title: "Module E — Big Five Personality (10 items)", type: "personality", compKey: "Big Five" }
];

const TIME_PER_MODULE_SECONDS = 7 * 60; // 7 minutes
const PASS_THRESHOLD = 90; // percent on competencies average
const MAX_SCORE_PER_ITEM = 5; // Likert 1..5

// -------------------- QUESTIONS (50) --------------------
// 10 items per module. Competency modules focus on their competency.
// Module E contains personality items (2 items per trait to make 10).
const QUESTIONS = [
  // Module A (1-10) - Executive Logic
  { id: 1, text: "I examine data and assumptions before forming a conclusion.", module: "A" },
  { id: 2, text: "I break complex problems into smaller, manageable pieces.", module: "A" },
  { id: 3, text: "I test multiple hypotheses when uncertain about a decision.", module: "A" },
  { id: 4, text: "I evaluate trade-offs clearly when choosing an option.", module: "A" },
  { id: 5, text: "I verify the reliability of sources before using their data.", module: "A" },
  { id: 6, text: "I use simple models (pros/cons, decision trees) to guide decisions.", module: "A" },
  { id: 7, text: "I notice patterns in information that others may miss.", module: "A" },
  { id: 8, text: "I prioritize based on impact and probability.", module: "A" },
  { id: 9, text: "I re-check assumptions after receiving new evidence.", module: "A" },
  { id:10, text: "I remain calm and systematic when facing ambiguous problems.", module: "A" },

  // Module B (11-20) - Performance Orientation
  { id:11, text: "I set clear targets for what I need to achieve each day.", module: "B" },
  { id:12, text: "I manage my time to focus on the highest-impact tasks.", module: "B" },
  { id:13, text: "I follow through on tasks even when motivation dips.", module: "B" },
  { id:14, text: "I deliver work on time without frequent reminders.", module: "B" },
  { id:15, text: "I continuously look for ways to make processes more efficient.", module: "B" },
  { id:16, text: "I track results, not just activity, and adjust accordingly.", module: "B" },
  { id:17, text: "I balance speed and quality effectively.", module: "B" },
  { id:18, text: "I proactively escalate blockers to keep delivery on track.", module: "B" },
  { id:19, text: "I set personal routines that help me achieve consistent outcomes.", module: "B" },
  { id:20, text: "I ask for help early to ensure deadlines are met.", module: "B" },

  // Module C (21-30) - Leadership Decision-Making
  { id:21, text: "I communicate clear expectations to my team.", module: "C" },
  { id:22, text: "I delegate appropriately to develop others.", module: "C" },
  { id:23, text: "I provide feedback that helps people improve.", module: "C" },
  { id:24, text: "I make timely decisions even with incomplete data.", module: "C" },
  { id:25, text: "I build trust through consistent behavior.", module: "C" },
  { id:26, text: "I help teams resolve conflict productively.", module: "C" },
  { id:27, text: "I create alignment between team activities and strategy.", module: "C" },
  { id:28, text: "I remain composed and model calm under pressure.", module: "C" },
  { id:29, text: "I coach and mentor team members to grow.", module: "C" },
  { id:30, text: "I take responsibility for team outcomes, good and bad.", module: "C" },

  // Module D (31-40) - Innovation & Problem Solving
  { id:31, text: "I propose creative ideas to improve results.", module: "D" },
  { id:32, text: "I run quick experiments to validate assumptions.", module: "D" },
  { id:33, text: "I challenge the status quo when there is a better way.", module: "D" },
  { id:34, text: "I incorporate diverse perspectives when solving problems.", module: "D" },
  { id:35, text: "I learn from failed experiments and iterate quickly.", module: "D" },
  { id:36, text: "I look for emerging trends that may affect our work.", module: "D" },
  { id:37, text: "I design simple tests to measure the value of a new idea.", module: "D" },
  { id:38, text: "I balance novelty with practical implementation.", module: "D" },
  { id:39, text: "I enjoy working on ambiguous problems to find a solution.", module: "D" },
  { id:40, text: "I encourage my team to try small risky bets with guardrails.", module: "D" },

  // Module E (41-50) - Big Five Personality (2 items per trait)
  { id:41, text: "I enjoy exploring new ideas and experiences. (Openness)", module: "E", trait: "Openness" },
  { id:42, text: "I like to learn about different perspectives and art. (Openness)", module: "E", trait: "Openness" },

  { id:43, text: "I keep my tasks and workspace organized. (Conscientiousness)", module: "E", trait: "Conscientiousness" },
  { id:44, text: "I plan ahead and follow routines consistently. (Conscientiousness)", module: "E", trait: "Conscientiousness" },

  { id:45, text: "I feel energized by social interactions. (Extraversion)", module: "E", trait: "Extraversion" },
  { id:46, text: "I enjoy speaking up and being visible in groups. (Extraversion)", module: "E", trait: "Extraversion" },

  { id:47, text: "I try to be helpful and cooperative with others. (Agreeableness)", module: "E", trait: "Agreeableness" },
  { id:48, text: "I prefer collaborative solutions and avoid harsh conflict. (Agreeableness)", module: "E", trait: "Agreeableness" },

  { id:49, text: "I remain calm and recover quickly after stressful events. (Emotional Stability)", module: "E", trait: "Emotional Stability" },
  { id:50, text: "I manage anxiety effectively and stay focused. (Emotional Stability)", module: "E", trait: "Emotional Stability" }
];

// -------------------- STATE --------------------
const state = {
  participant: { name: "", email: "", startedAt: null, finishedAt: null },
  moduleStatus: MODULES.map((m, i) => ({ id: m.id, unlocked: (i === 0), completed: false, score: null })),
  answers: Array(QUESTIONS.length).fill(null), // store numeric 1..5
  currentModuleIndex: null,
  timer: { intervalId: null, secondsLeft: TIME_PER_MODULE_SECONDS }
};

// -------------------- DOM REFS --------------------
const el = {
  entry: document.getElementById("entry"),
  participantNameInput: document.getElementById("participant-name-input"),
  participantEmailInput: document.getElementById("participant-email-input"),
  btnBegin: document.getElementById("btn-begin"),
  moduleChooser: document.getElementById("module-chooser"),
  modulesList: document.getElementById("modules-list"),
  modulePage: document.getElementById("module-page"),
  moduleTitle: document.getElementById("module-title"),
  timerMin: document.getElementById("timer-min"),
  timerSec: document.getElementById("timer-sec"),
  moduleQuestions: document.getElementById("module-questions"),
  btnModulePrev: document.getElementById("btn-module-prev"),
  btnModuleComplete: document.getElementById("btn-module-complete"),
  resultsPage: document.getElementById("results-page"),
  reportName: document.getElementById("report-name"),
  overallPercentEl: document.getElementById("overall-percent"),
  overallMeaningEl: document.getElementById("overall-meaning"),
  competencyResultsEl: document.getElementById("competency-results"),
  oceanResultsEl: document.getElementById("ocean-results"),
  interpretationBlock: document.getElementById("interpretation-block"),
  btnDownloadPdf: document.getElementById("btn-download-pdf"),
  btnDownloadCsv: document.getElementById("btn-download-csv"),
  btnDownloadJson: document.getElementById("btn-download-json"),
  btnRestart: document.getElementById("btn-restart")
};

// -------------------- BOOT / MODULE CHOOSER --------------------
function initModuleChooser(){
  el.modulesList.innerHTML = "";
  MODULES.forEach((m, idx) => {
    const status = state.moduleStatus[idx];
    const card = document.createElement("div");
    card.className = "module-card" + (status.unlocked ? "" : " locked");
    card.innerHTML = `
      <h4>Module ${m.id}</h4>
      <p>${m.title}</p>
      <p class="muted">${status.completed ? "Completed" : (status.unlocked ? "Unlocked" : "Locked")}</p>
      <div style="margin-top:8px">
        <button class="btn-open-module" data-idx="${idx}" ${status.unlocked ? "" : "disabled"}>${status.completed ? "Review" : "Start"}</button>
      </div>
    `;
    el.modulesList.appendChild(card);
  });

  // attach handlers
  document.querySelectorAll(".btn-open-module").forEach(btn=>{
    btn.addEventListener("click", (e)=>{
      const idx = Number(btn.dataset.idx);
      openModule(idx);
    });
  });
}

// -------------------- OPEN MODULE --------------------
function openModule(idx){
  // require participant data
  const name = el.participantNameInput.value.trim();
  const email = el.participantEmailInput.value.trim();
  if(!name || !email){
    alert("Please enter name and email before starting.");
    return;
  }
  // set participant if first time
  if(!state.participant.startedAt){
    state.participant.name = name;
    state.participant.email = email;
    state.participant.startedAt = new Date().toISOString();
  }
  // enforce order: cannot open if previous not completed
  if(idx > 0 && !state.moduleStatus[idx-1].completed){
    alert("Please complete previous module first.");
    return;
  }

  state.currentModuleIndex = idx;
  const module = MODULES[idx];
  el.moduleTitle.textContent = module.title;
  // render questions for this module
  renderModuleQuestions(module.id);
  // show module page
  hide(el.entry);
  hide(el.moduleChooser);
  show(el.modulePage);
  // init timer
  startModuleTimer();
}

// -------------------- RENDER QUESTIONS --------------------
function renderModuleQuestions(moduleId){
  el.moduleQuestions.innerHTML = "";
  const moduleQuestions = QUESTIONS.filter(q => q.module === moduleId);
  moduleQuestions.forEach((q, localIdx) => {
    const globalIdx = QUESTIONS.indexOf(q);
    const card = document.createElement("div");
    card.className = "question-row";
    card.innerHTML = `
      <div class="q-num">Q${q.id}. <strong>${escapeHtml(q.text)}</strong></div>
      <div class="options-row" id="opts-${globalIdx}">
        <label><input type="radio" name="q${globalIdx}" value="5"> Strongly Agree</label>
        <label><input type="radio" name="q${globalIdx}" value="4"> Agree</label>
        <label><input type="radio" name="q${globalIdx}" value="3"> Neutral</label>
        <label><input type="radio" name="q${globalIdx}" value="2"> Disagree</label>
        <label><input type="radio" name="q${globalIdx}" value="1"> Strongly Disagree</label>
      </div>
    `;
    // if previously answered, set radio
    const prev = state.answers[globalIdx];
    if(prev !== null){
      setTimeout(()=>{ // allow DOM
        const radios = card.querySelectorAll(`input[name="q${globalIdx}"]`);
        radios.forEach(r => { if(Number(r.value) === prev) r.checked = true; });
      }, 0);
    }
    el.moduleQuestions.appendChild(card);
  });
}

// -------------------- TIMER --------------------
function startModuleTimer(){
  stopModuleTimer();
  state.timer.secondsLeft = TIME_PER_MODULE_SECONDS;
  updateTimerUI();
  state.timer.intervalId = setInterval(()=>{
    state.timer.secondsLeft--;
    updateTimerUI();
    if(state.timer.secondsLeft <= 0){
      stopModuleTimer();
      alert("Time is up for this module — the module will be marked complete and you'll return to the module list.");
      completeCurrentModule();
    }
  }, 1000);
}
function stopModuleTimer(){
  if(state.timer.intervalId) clearInterval(state.timer.intervalId);
  state.timer.intervalId = null;
}
function updateTimerUI(){
  const mm = String(Math.floor(state.timer.secondsLeft / 60)).padStart(2,'0');
  const ss = String(state.timer.secondsLeft % 60).padStart(2,'0');
  el.timerMin.textContent = mm;
  el.timerSec.textContent = ss;
}

// -------------------- COMPLETE / SAVE MODULE --------------------
el.btnModulePrev.addEventListener("click", ()=>{
  // go back to module chooser without completing
  stopModuleTimer();
  show(el.moduleChooser);
  hide(el.modulePage);
  initModuleChooser();
});

el.btnModuleComplete.addEventListener("click", ()=>{
  // ask confirm
  if(!confirm("Mark this module as complete? You can still review it later but moving forward will lock this module as completed.")) return;
  completeCurrentModule();
});

function completeCurrentModule(){
  // save selected answers of this module
  const idx = state.currentModuleIndex;
  const module = MODULES[idx];
  const moduleQs = QUESTIONS.filter(q => q.module === module.id);
  moduleQs.forEach(q => {
    const globalIdx = QUESTIONS.indexOf(q);
    const radios = document.getElementsByName(`q${globalIdx}`);
    let found = false;
    for(const r of radios){
      if(r.checked){
        state.answers[globalIdx] = Number(r.value);
        found = true;
        break;
      }
    }
    // unanswered remain null
  });

  // compute module score (sum of answered values; if items unanswered count as 1)
  let sum = 0, count = 0;
  moduleQs.forEach(q=>{
    const v = state.answers[QUESTIONS.indexOf(q)];
    sum += (v === null ? 1 : v); // treat null as minimum response to avoid NaN
    count++;
  });
  const maxPossible = count * MAX_SCORE_PER_ITEM;
  const pct = Math.round((sum / maxPossible) * 100);
  state.moduleStatus[idx].completed = true;
  state.moduleStatus[idx].score = pct;

  stopModuleTimer();
  // unlock next module if exists
  if(idx + 1 < state.moduleStatus.length){
    state.moduleStatus[idx+1].unlocked = true;
  }

  // show chooser again or results if last
  show(el.moduleChooser);
  hide(el.modulePage);
  initModuleChooser();

  // if last module completed → compute results and show report
  const allCompleted = state.moduleStatus.every(s => s.completed);
  if(allCompleted){
    computeAndShowResults();
  }
}

// -------------------- COMPUTE FINAL RESULTS --------------------
function computeAndShowResults(){
  // Participant finish time
  state.participant.finishedAt = new Date().toISOString();

  // Competency scoring: modules A..D correspond to 4 competencies; convert each module's sum to percent 0..100
  const compMap = {}; // name -> percent
  for(let i=0;i<4;i++){
    const mod = MODULES[i];
    const moduleQs = QUESTIONS.filter(q => q.module === mod.id);
    let sum = 0;
    moduleQs.forEach(q=>{
      const v = state.answers[QUESTIONS.indexOf(q)];
      sum += (v === null ? 1 : v); // treat no answer as 1
    });
    const max = moduleQs.length * MAX_SCORE_PER_ITEM;
    compMap[mod.compKey] = Math.round((sum / max) * 100);
  }

  // Personality: Module E has 10 items, 2 per trait
  const traitSums = { "Openness":0, "Conscientiousness":0, "Extraversion":0, "Agreeableness":0, "Emotional Stability":0 };
  QUESTIONS.filter(q=>q.module==="E").forEach(q=>{
    const v = state.answers[QUESTIONS.indexOf(q)];
    const val = (v === null ? 1 : v);
    // map trait (we stored trait in question text by parentheses, but we also added trait property to those entries)
    const trait = q.trait;
    if(trait && traitSums.hasOwnProperty(trait)){
      traitSums[trait] += val;
    }
  });
  // convert to percent (each trait has 2 items => max 10)
  const traitPct = {};
  Object.keys(traitSums).forEach(t=>{
    const max = 2 * MAX_SCORE_PER_ITEM;
    traitPct[t] = Math.round((traitSums[t] / max) * 100);
  });

  // overall competency percent: average of the 4 competencies
  const overallCompetencyPercent = Math.round(Object.values(compMap).reduce((a,b)=>a+b,0) / Object.values(compMap).length);

  // store in state
  state.final = {
    competencies: compMap,
    personality: traitPct,
    overallCompetencyPercent,
    passed: overallCompetencyPercent >= PASS_THRESHOLD
  };

  // show results page
  showResultsPage();
}

// -------------------- SHOW RESULTS PAGE --------------------
function showResultsPage(){
  hide(el.entry);
  hide(el.moduleChooser);
  hide(el.modulePage);
  show(el.resultsPage);

  el.reportName.textContent = state.participant.name || el.participantNameInput.value;
  el.overallPercentEl.textContent = state.final.overallCompetencyPercent + "%";
  el.overallMeaningEl.textContent = overallMeaningText(state.final.overallCompetencyPercent);

  // competencies section
  el.competencyResultsEl.innerHTML = "";
  Object.entries(state.final.competencies).forEach(([k,v])=>{
    el.competencyResultsEl.innerHTML += competencyBlockHTML(k, v);
  });

  // personality section
  el.oceanResultsEl.innerHTML = "";
  Object.entries(state.final.personality).forEach(([t,v])=>{
    el.oceanResultsEl.innerHTML += oceanBlockHTML(t, v);
  });

  // interpretation & plan
  el.interpretationBlock.innerHTML = generatePlanAndInterpretation();
  // save local
  saveLocalResult();
}

// -------------------- HELPERS: TEXT TEMPLATES --------------------
function overallMeaningText(pct){
  if(pct >= 95) return "Outstanding executive readiness — exceptional across measured competencies.";
  if(pct >= 85) return "Strong executive capability with focused areas to refine.";
  if(pct >= 70) return "Solid foundations; structured development will improve readiness.";
  if(pct >= 50) return "Developing: consistent practice and feedback recommended.";
  return "Early-stage development — coaching and habit-building will help accelerate growth.";
}

function competencyBlockHTML(name, pct){
  // choose level
  const level = pct >= 85 ? "High" : pct >= 65 ? "Moderate" : pct >= 45 ? "Developing" : "Lower";
  const templates = competencyTemplates();
  const tmpl = templates[name][level];
  return `
    <div class="detailed-block">
      <div class="detailed-header">${escapeHtml(name)} — ${pct}% (${level})</div>
      <div class="detailed-sub">${escapeHtml(tmpl.summary)}</div>
      <div><strong>Work style:</strong> ${escapeHtml(tmpl.style)}</div>
      <div><strong>Strengths:</strong> ${escapeHtml(tmpl.strengths)}</div>
      <div><strong>Risks / blind spots:</strong> ${escapeHtml(tmpl.risks)}</div>
      <div><strong>Recommendations:</strong> ${escapeHtml(tmpl.tips)}</div>
    </div>
  `;
}

function oceanBlockHTML(trait, pct){
  const level = pct >= 70 ? "High" : pct >= 45 ? "Balanced" : "Lower";
  const templates = oceanTemplates();
  const t = templates[trait][level];
  return `
    <div class="detailed-block">
      <div class="detailed-header">${escapeHtml(trait)} — ${pct}% (${level})</div>
      <div class="detailed-sub">${escapeHtml(t.summary)}</div>
      <div><strong>How this shows up at work:</strong> ${escapeHtml(t.style)}</div>
      <div><strong>Strengths:</strong> ${escapeHtml(t.strengths)}</div>
      <div><strong>Challenges:</strong> ${escapeHtml(t.risks)}</div>
      <div><strong>Practical habits:</strong> ${escapeHtml(t.tips)}</div>
    </div>
  `;
}

function competencyTemplates(){
  return {
    "Executive Logic": {
      High: {
        summary: "You demonstrate strong structured thinking and clear analytical frameworks.",
        style: "You prefer evidence-driven decisions, break problems into parts, and verify assumptions.",
        strengths: "Pattern detection, causal reasoning, persuasive rationale.",
        risks: "Possible over-analysis delaying action; may underweight human signals.",
        tips: "Use short time-boxed analyses and a stakeholder check to balance speed and rigor."
      },
      Moderate: {
        summary: "Solid analytical ability with practical judgment.",
        style: "You combine data and experience to reach reasonable decisions.",
        strengths: "Explainable reasoning and reliable conclusions.",
        risks: "Occasionally miss edge cases.",
        tips: "Adopt quick hypothesis tests to validate key assumptions."
      },
      Developing: {
        summary: "Developing structured reasoning and decision templates.",
        style: "May favor intuition; benefits from frameworks.",
        strengths: "Action-oriented and pragmatic.",
        risks: "Important assumptions might be overlooked.",
        tips: "Use simple decision templates (goal/options/risks) regularly."
      },
      Lower: {
        summary: "Strongly intuitive; prefers adaptability over formal analysis.",
        style: "You rely on speed and learning-by-doing.",
        strengths: "Flexible in ambiguity and fast in iteration.",
        risks: "May miss systemic problems without reflection.",
        tips: "Use peer pre-checks and short checklists on big decisions."
      }
    },
    "Performance Orientation": {
      High: {
        summary: "Highly results-focused and consistently delivers.",
        style: "Sets clear targets, tracks outcomes, and optimizes for impact.",
        strengths: "Reliable delivery and operational excellence.",
        risks: "Burnout risk if not balancing wellbeing.",
        tips: "Pair high expectations with recognition rituals and recovery time."
      },
      Moderate: {
        summary: "Balances delivery with team health and pragmatic goals.",
        style: "Sets realistic targets and reviews progress.",
        strengths: "Steady outcomes and situational awareness.",
        risks: "May underutilize stretch goals.",
        tips: "Introduce quarterly stretch objectives and feedback loops."
      },
      Developing: {
        summary: "Working to increase consistency in outcomes.",
        style: "Task-oriented; needs clearer KPI routines.",
        strengths: "Thorough execution on assigned work.",
        risks: "Outcomes can vary without routine.",
        tips: "Implement weekly reviews and simple KPIs."
      },
      Lower: {
        summary: "Prefers stability and process over strict targets.",
        style: "Collaborative and steady, but less outcome-driven.",
        strengths: "Team cohesion and process reliability.",
        risks: "Results may lag without accountability systems.",
        tips: "Adopt short accountability routines and a visible outcome board."
      }
    },
    "Leadership Decision-Making": {
      High: {
        summary: "Decisive and trusted leader who mobilizes others.",
        style: "Creates clarity, communicates purpose, and drives execution.",
        strengths: "Inspires confidence and aligns teams.",
        risks: "May under-delegate or over-control.",
        tips: "Delegate end-goals and invest time in coaching direct reports."
      },
      Moderate: {
        summary: "Adaptable leader who balances inclusion and decisiveness.",
        style: "Seeks buy-in yet acts when necessary.",
        strengths: "Builds alignment and shared ownership.",
        risks: "May vacillate under extreme pressure.",
        tips: "Set clear decision rules and practice assertive communication."
      },
      Developing: {
        summary: "Leadership skills are emerging and can be accelerated.",
        style: "Supportive and collaborative but may avoid tough calls.",
        strengths: "Empathy and team-building.",
        risks: "Delays in making difficult decisions.",
        tips: "Role-play difficult conversations and set escalation paths."
      },
      Lower: {
        summary: "Prefers consensus; may defer strategic choices.",
        style: "Supportive but sometimes passive at organizational crossroads.",
        strengths: "Relational and trustworthy.",
        risks: "Ambiguity and slow progress.",
        tips: "Practice firm decision-making on low-risk items to build confidence."
      }
    },
    "Innovation & Problem Solving": {
      High: {
        summary: "Consistently seeks novel solutions and encourages experimentation.",
        style: "Promotes learning culture and measured risk-taking.",
        strengths: "Uncovers new opportunities and energizes teams.",
        risks: "May prioritize novelty over delivery.",
        tips: "Define metrics and kill criteria for experiments to protect execution."
      },
      Moderate: {
        summary: "Balances creativity with practical execution.",
        style: "Pilots ideas and scales what works.",
        strengths: "Pragmatic innovation and risk awareness.",
        risks: "Sometimes too conservative for breakthroughs.",
        tips: "Run monthly time-boxed experiments to stretch innovation."
      },
      Developing: {
        summary: "Building an experimental mindset with structured support.",
        style: "Leans on proven methods but open to guided innovation.",
        strengths: "Operational stability and cautious improvement.",
        risks: "May miss disruptive shifts.",
        tips: "Use design sprints and cross-functional brainstorming."
      },
      Lower: {
        summary: "Strong focus on operations and reliability rather than novelty.",
        style: "Prefers established processes.",
        strengths: "Minimizes surprises, ensures consistent output.",
        risks: "At risk of falling behind innovators.",
        tips: "Start with micro-experiments and measure outcomes to build confidence."
      }
    }
  };
}

function oceanTemplates(){
  return {
    "Openness": {
      High: { summary:"Imaginative, curious and comfortable with ambiguity.", style:"Enjoys creative work and exploring alternatives.", strengths:"Generates ideas and adapts quickly.", risks:"May overlook details.", tips:"Pair ideas with executors and scope experiments." },
      Balanced: { summary:"Curious yet pragmatic.", style:"Tries new ideas when aligned with goals.", strengths:"Responsible creativity.", risks:"May default to safer options.", tips:"Schedule blue-sky sessions periodically." },
      Lower: { summary:"Prefers structure and proven approaches.", style:"Values clarity and routine.", strengths:"Consistency and focus.", risks:"May resist change.", tips:"Try small low-risk experiments to expand comfort." }
    },
    "Conscientiousness": {
      High: { summary:"Disciplined and reliable.", style:"Organized, plans ahead.", strengths:"Delivers predictable results.", risks:"Perfectionism.", tips:"Build flexibility windows and delegate." },
      Balanced: { summary:"Organized with adaptability.", style:"Maintains routines and adapts when needed.", strengths:"Steady execution.", risks:"Occasional overload.", tips:"Use prioritization frameworks." },
      Lower: { summary:"Flexible and spontaneous.", style:"Prefers improvisation.", strengths:"Adaptable under change.", risks:"Deadlines may be missed.", tips:"Adopt daily planning and small accountability habits." }
    },
    "Extraversion": {
      High: { summary:"Outgoing and energetic.", style:"Enjoys visibility and social exchange.", strengths:"Mobilizes teams and stakeholders.", risks:"May overshadow quieter voices.", tips:"Practice active listening and invite input." },
      Balanced: { summary:"Comfortable in social settings when needed.", style:"Strategic about engagement.", strengths:"Versatile across contexts.", risks:"May need cues to lead visibility.", tips:"Volunteer for brief visibility opportunities." },
      Lower: { summary:"Reserved and reflective.", style:"Prefers deep work and one-on-one interactions.", strengths:"Thoughtful analysis.", risks:"May be overlooked for visible leadership.", tips:"Prepare concise contributions and speak up in key moments." }
    },
    "Agreeableness": {
      High: { summary:"Cooperative and empathetic.", style:"Builds harmony and trust.", strengths:"Strong teamwork and rapport.", risks:"May avoid hard decisions.", tips:"Set clear decision boundaries and practice assertiveness." },
      Balanced: { summary:"Empathetic while outcome-oriented.", style:"Balances people and tasks well.", strengths:"Constructive collaboration.", risks:"May sometimes be too conciliatory.", tips:"Use candid feedback frameworks." },
      Lower: { summary:"Direct and task-focused.", style:"Prioritizes outcomes.", strengths:"Clear expectations and swift decisions.", risks:"May appear blunt.", tips:"Add relational rituals and appreciation notes." }
    },
    "Emotional Stability": {
      High: { summary:"Calm, resilient and composed under stress.", style:"Models steady behavior in crises.", strengths:"Reliable under pressure.", risks:"May under-share strain.", tips:"Share coping strategies and rest cycles." },
      Balanced: { summary:"Generally steady with occasional stress.", style:"Mostly calm but needs recovery moments.", strengths:"Dependable under normal load.", risks:"Temporary dips when overloaded.", tips:"Adopt short resilience habits (sleep, micro-breaks)." },
      Lower: { summary:"More sensitive to stress and emotions.", style:"Experienced emotions strongly and needs recovery time.", strengths:"High emotional awareness.", risks:"Burnout risk.", tips:"Build structured stress-management routines and recovery rituals." }
    }
  };
}

// -------------------- Interpretation & Plan --------------------
function generatePlanAndInterpretation(){
  // strengths / opportunities
  const strengths = [];
  const opportunities = [];
  Object.entries(state.final.competencies).forEach(([k,v])=>{
    if(v >= 85) strengths.push(`${k}: strong (${v}%).`);
    else if(v >= 65) strengths.push(`${k}: reliable (${v}%).`);
    else opportunities.push(`${k}: development (${v}%).`);
  });
  Object.entries(state.final.personality).forEach(([k,v])=>{
    if(v >= 70) strengths.push(`${k}: ${v}% — trait strength.`);
    else if(v < 45) opportunities.push(`${k}: ${v}% — consider habit changes.`);
  });

  // plans
  const compsSorted = Object.entries(state.final.competencies).sort((a,b)=>a[1]-b[1]);
  const weakest = compsSorted.slice(0,2).map(x=>x[0]);
  const short = [
    `Run 2 x 30-min focused practice sessions this week on: ${weakest.join(", ")}.`,
    "Use a short decision checklist (Goal → Options → Risks → Next step) for daily choices.",
    "Ask for quick peer feedback after 2 real decisions this month."
  ];
  const medium = [
    `Run monthly micro-experiments (design → measure → iterate) to build innovation and data habits.`,
    "Implement a weekly 30-min review to strengthen Performance Orientation.",
    `Take a short course/workshop on ${weakest[0]}.`
  ];
  const long = [
    "Engage with a mentor or coach for 6–12 months on leadership and executive presence.",
    "Lead a cross-functional project to grow influence and strategic impact.",
    "Build a personal dashboard and review monthly to track KPIs and learning."
  ];

  return `
    <h4>Strengths</h4><ul>${strengths.map(s=>`<li>${escapeHtml(s)}</li>`).join("")}</ul>
    <h4>Opportunities</h4><ul>${opportunities.map(s=>`<li>${escapeHtml(s)}</li>`).join("")}</ul>
    <h4>Improvement Plan</h4>
    <strong>Short-term (2 weeks)</strong><ul>${short.map(s=>`<li>${escapeHtml(s)}</li>`).join("")}</ul>
    <strong>Medium-term (1–3 months)</strong><ul>${medium.map(s=>`<li>${escapeHtml(s)}</li>`).join("")}</ul>
    <strong>Long-term (6–12 months)</strong><ul>${long.map(s=>`<li>${escapeHtml(s)}</li>`).join("")}</ul>
  `;
}

// -------------------- EXPORTS --------------------
function downloadCSV(){
  const header = ["name","email","startedAt","finishedAt","overall_competency_percent","passed"];
  Object.keys(state.final.competencies).forEach(k=> header.push(`C_${k.replace(/\s+/g,"_")}`));
  Object.keys(state.final.personality).forEach(k=> header.push(`P_${k.replace(/\s+/g,"_")}`));
  header.push("answers");

  const row = [
    state.participant.name || el.participantNameInput.value,
    state.participant.email || el.participantEmailInput.value,
    state.participant.startedAt || "",
    state.participant.finishedAt || "",
    state.final.overallCompetencyPercent,
    state.final.passed ? "TRUE" : "FALSE"
  ];
  Object.values(state.final.competencies).forEach(v=>row.push(v));
  Object.values(state.final.personality).forEach(v=>row.push(v));
  row.push(state.answers.map((a,i)=> `${QUESTIONS[i].id}:${a===null?"":a}`).join("|"));

  const csv = `${header.join(",")}\n${row.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(",")}`;
  downloadBlob(csv, `sienva_result_${(state.participant.name||"unknown").replace(/\s+/g,"_")}_${Date.now()}.csv`, "text/csv");
}
function downloadJSON(){
  const data = {
    participant: state.participant,
    final: state.final,
    answers: state.answers.map((a,i)=>({ questionId: QUESTIONS[i].id, answer:a }))
  };
  downloadBlob(JSON.stringify(data, null, 2), `sienva_result_${(state.participant.name||"unknown").replace(/\s+/g,"_")}_${Date.now()}.json`, "application/json");
}
function downloadPDF(){
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit:"pt", format:"a4" });
  const left = 40;
  let y = 50;
  const lh = 14;

  doc.setFontSize(14); doc.text("Sienva — Executive Assessment Report", left, y); y+=24;
  doc.setFontSize(11);
  doc.text(`Name: ${state.participant.name || el.participantNameInput.value}`, left, y); y+=lh;
  doc.text(`Email: ${state.participant.email || el.participantEmailInput.value}`, left, y); y+=lh;
  doc.text(`Overall competency score: ${state.final.overallCompetencyPercent}%`, left, y); y+=lh;
  doc.text(`${overallMeaningText(state.final.overallCompetencyPercent)}`, left, y); y+=lh*2;

  // competencies
  Object.entries(state.final.competencies).forEach(([k,v])=>{
    const block = `${k}: ${v}%\n`;
    const plain = stripHtml(competencyBlockHTML(k,v));
    const lines = doc.splitTextToSize(block + plain + "\n\n", 520);
    if(y + lines.length*lh > doc.internal.pageSize.height - 80){ doc.addPage(); y = 50; }
    doc.text(lines, left, y);
    y += lines.length * lh;
  });

  // personality
  Object.entries(state.final.personality).forEach(([k,v])=>{
    const block = `${k}: ${v}%\n`;
    const plain = stripHtml(oceanBlockHTML(k,v));
    const lines = doc.splitTextToSize(block + plain + "\n\n", 520);
    if(y + lines.length*lh > doc.internal.pageSize.height - 80){ doc.addPage(); y = 50; }
    doc.text(lines, left, y);
    y += lines.length * lh;
  });

  // interpretation
  const interpText = stripHtml(generatePlanAndInterpretation());
  const interpLines = doc.splitTextToSize("Interpretation & Improvement Plan\n" + interpText, 520);
  if(y + interpLines.length*lh > doc.internal.pageSize.height - 80){ doc.addPage(); y = 50; }
  doc.text(interpLines, left, y);

  doc.save(`sienva_report_${(state.participant.name||"unknown").replace(/\s+/g,"_")}_${Date.now()}.pdf`);
}

function downloadBlob(content, filename, mime){
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; document.body.appendChild(a); a.click();
  setTimeout(()=>{ URL.revokeObjectURL(url); a.remove(); }, 500);
}

// -------------------- LOCAL SAVE --------------------
function saveLocalResult(){
  try{
    const key = "sienva_results_v2";
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.push({
      participant: state.participant,
      final: state.final,
      answers: state.answers
    });
    localStorage.setItem(key, JSON.stringify(existing));
  }catch(e){ console.warn("Failed saving local result", e); }
}

// -------------------- UTIL --------------------
function show(el){ if(el) el.classList.remove("hidden"); }
function hide(el){ if(el) el.classList.add("hidden"); }
function escapeHtml(s){ return (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function stripHtml(html){ return html.replace(/<\/?[^>]+(>|$)/g, " ").replace(/\s+/g," ").trim(); }

// -------------------- BIND UI --------------------
el.btnBegin.addEventListener("click", ()=>{
  const name = el.participantNameInput.value.trim();
  const email = el.participantEmailInput.value.trim();
  if(!name || !email){ alert("Please enter your name and email."); return; }
  // set participant
  state.participant.name = name;
  state.participant.email = email;
  state.participant.startedAt = new Date().toISOString();
  // show chooser
  hide(el.entry);
  show(el.moduleChooser);
  initModuleChooser();
});

el.btnDownloadCsv.addEventListener("click", downloadCSV);
el.btnDownloadJson.addEventListener("click", downloadJSON);
el.btnDownloadPdf.addEventListener("click", downloadPDF);
el.btnRestart.addEventListener("click", ()=>{
  if(confirm("Restart the test and clear current responses?")){
    location.reload();
  }
});

// initialize: hide pages except entry
(function boot(){
  hide(el.moduleChooser);
  hide(el.modulePage);
  hide(el.resultsPage);
})();
