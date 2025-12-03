/* =========================
   DATA: 50 QUESTIONS TOTAL
   5 MODULES x 10 QUESTIONS
   Mixed: scenarios (with real options) + Likert items
   Big Five embedded
   ========================= */

const MODULES = [
  {
    id: "innovation",
    title: "Module 1 — Innovation",
    desc: "How you explore ideas, challenge assumptions, and create value.",
    questions: [
      {
        text: "Your team uses a process that works 'well enough' but wastes time weekly. What do you do first?",
        type:"scenario",
        competency:"innovation",
        bigFive:["O"],
        options: [
          { label:"Map the process, identify 1–2 bottlenecks, and propose a small pilot improvement.", score:4 },
          { label:"Ask others to suggest fixes and wait to see if leadership wants to change it.", score:2 },
          { label:"Keep using it; changing processes usually creates more problems.", score:0 },
          { label:"Quietly create your own workaround without telling the team.", score:1 },
          { label:"Replace the whole process immediately with a new one you prefer.", score:3 }
        ],
        idealIndex:0,
        reverse:false
      },
      {
        text: "I often notice opportunities others miss, even if they aren’t obvious at first.",
        type:"likert", competency:"innovation", bigFive:["O"], reverse:false
      },
      {
        text: "A client asks for a solution you’ve never built before and the deadline is tight. You:",
        type:"scenario",
        competency:"innovation",
        bigFive:["C","O"],
        options: [
          { label:"Clarify the goal, prototype a quick version, test early, then scale.", score:4 },
          { label:"Tell them it's too risky and push only known solutions.", score:0 },
          { label:"Say yes and start building without validating the approach.", score:2 },
          { label:"Research similar cases, present 2–3 options with tradeoffs, then decide together.", score:3 },
          { label:"Ask another teammate to lead it; you support only.", score:1 }
        ],
        idealIndex:0,
        reverse:false
      },
      {
        text: "I prefer improving existing ideas rather than proposing something totally new. (Subtle)",
        type:"likert", competency:"innovation", bigFive:["O"], reverse:true
      },
      {
        text: "You discover a tool that could help the company, but others are skeptical. What’s your move?",
        type:"scenario",
        competency:"innovation",
        bigFive:["E","A"],
        options: [
          { label:"Show a short demo with a real use-case and invite feedback.", score:4 },
          { label:"Use it alone until people notice it works.", score:2 },
          { label:"Drop it; if people doubt it, it’s not worth pushing.", score:0 },
          { label:"Argue strongly until they accept it.", score:1 },
          { label:"Ask your manager to mandate it for everyone.", score:3 }
        ],
        idealIndex:0,
        reverse:false
      },
      {
        text: "When facing a problem, I enjoy experimenting with multiple approaches before choosing one.",
        type:"likert", competency:"innovation", bigFive:["O"], reverse:false
      },
      {
        text: "You must choose between a safe option with predictable results vs. a bold option with higher upside. You:",
        type:"scenario",
        competency:"innovation",
        bigFive:["N","O"],
        options: [
          { label:"Pick bold only if downside is contained by a pilot or clear fallback.", score:4 },
          { label:"Always choose safe; upside isn't worth uncertainty.", score:0 },
          { label:"Choose bold immediately—big wins require risk.", score:3 },
          { label:"Let someone else decide to avoid blame.", score:1 },
          { label:"Split resources unevenly: most safe, small bold experiment.", score:2 }
        ],
        idealIndex:0,
        reverse:false
      },
      {
        text: "I get energized by ambiguity because it gives room for creativity.",
        type:"likert", competency:"innovation", bigFive:["O"], reverse:false
      },
      {
        text: "When someone says 'that’s how we’ve always done it', I usually accept it without pushing much. (Subtle)",
        type:"likert", competency:"innovation", bigFive:["A"], reverse:true
      },
      {
        text: "You need a fresh idea but data is incomplete. You:",
        type:"scenario",
        competency:"innovation",
        bigFive:["O","C"],
        options: [
          { label:"State assumptions, test quickly with users/data, iterate.", score:4 },
          { label:"Wait until full data is available before moving.", score:0 },
          { label:"Follow intuition and proceed without checking anything.", score:2 },
          { label:"Ask peers for opinions and choose the one most people like.", score:1 },
          { label:"Design two alternatives: one data-based, one creative, then compare.", score:3 }
        ],
        idealIndex:0,
        reverse:false
      }
    ]
  },

  {
    id: "leadership",
    title: "Module 2 — Leadership",
    desc: "How you influence, take ownership, and move people toward outcomes.",
    questions: [
      {
        text: "Two teammates disagree strongly in front of a client. In the moment you:",
        type:"scenario",
        competency:"leadership",
        bigFive:["A","E"],
        options: [
          { label:"Step in calmly, align on the goal, and park debate for after the call.", score:4 },
          { label:"Let them argue; conflict helps clients see realism.", score:0 },
          { label:"Side with the stronger voice to end it quickly.", score:1 },
          { label:"Apologize to the client and take full blame yourself.", score:2 },
          { label:"Ask the client what they prefer and follow that instantly.", score:3 }
        ],
        idealIndex:0,
        reverse:false
      },
      { text:"I naturally step up to coordinate when no one is clearly leading.",
        type:"likert", competency:"leadership", bigFive:["E"], reverse:false },
      {
        text: "A high-stakes task is late and everyone is stressed. You:",
        type:"scenario",
        competency:"leadership",
        bigFive:["N","C"],
        options: [
          { label:"Re-prioritize, clarify who owns what, and communicate the new plan clearly.", score:4 },
          { label:"Push everyone harder without changing the plan.", score:1 },
          { label:"Wait for your manager to give direction.", score:0 },
          { label:"Take over everything yourself to ensure delivery.", score:2 },
          { label:"Pause work until emotions cool down.", score:3 }
        ],
        idealIndex:0,
        reverse:false
      },
      { text:"I avoid giving direct feedback because it can create tension. (Subtle)",
        type:"likert", competency:"leadership", bigFive:["A"], reverse:true },
      {
        text: "A junior colleague is underperforming but motivated. Your first step is:",
        type:"scenario",
        competency:"leadership",
        bigFive:["A","C"],
        options: [
          { label:"Have a private coaching talk, clarify expectations, and set check-ins.", score:4 },
          { label:"Do their work for them to protect the deadline.", score:1 },
          { label:"Report them immediately to leadership.", score:0 },
          { label:"Ignore it; they’ll improve over time.", score:2 },
          { label:"Give them simpler tasks only.", score:3 }
        ],
        idealIndex:0,
        reverse:false
      },
      { text:"I set clear expectations and check progress without micromanaging.",
        type:"likert", competency:"leadership", bigFive:["C"], reverse:false },
      {
        text: "Your idea is rejected by the team. You:",
        type:"scenario",
        competency:"leadership",
        bigFive:["E","A"],
        options: [
          { label:"Ask what concerns exist, refine the idea, and try again later.", score:4 },
          { label:"Drop it completely and disengage.", score:1 },
          { label:"Push aggressively until they accept it.", score:0 },
          { label:"Find a small experiment to prove value before relaunching.", score:3 },
          { label:"Assume they don’t understand and keep it to yourself.", score:2 }
        ],
        idealIndex:0,
        reverse:false
      },
      { text:"I can stay calm and decisive when others feel uncertain.",
        type:"likert", competency:"leadership", bigFive:["N"], reverse:false },
      { text:"I prefer to wait for formal authority before acting. (Subtle)",
        type:"likert", competency:"leadership", bigFive:["E"], reverse:true },
      {
        text: "A project is failing and your plan contributed to it. You:",
        type:"scenario",
        competency:"leadership",
        bigFive:["C","N"],
        options: [
          { label:"Own the miss, explain what you learned, and reset the plan fast.", score:4 },
          { label:"Blame external factors so confidence stays high.", score:0 },
          { label:"Quietly fix it without mentioning your part.", score:2 },
          { label:"Ask someone else to take over.", score:1 },
          { label:"Wait until leadership notices then respond.", score:3 }
        ],
        idealIndex:0,
        reverse:false
      }
    ]
  },

  {
    id: "adaptability",
    title: "Module 3 — Adaptability",
    desc: "How you respond to change, uncertainty, and new constraints.",
    questions: [
      {
        text: "A priority changes suddenly after days of work. You:",
        type:"scenario",
        competency:"adaptability",
        bigFive:["N"],
        options: [
          { label:"Adjust quickly, reuse what you can, and shift focus to the new target.", score:4 },
          { label:"Keep pushing the old plan; change wastes work.", score:0 },
          { label:"Pause until someone explains exactly what to do.", score:1 },
          { label:"Complain about the change, then adapt slowly.", score:2 },
          { label:"Ask for the reason, then co-plan the transition.", score:3 }
        ],
        idealIndex:0,
        reverse:false
      },
      { text:"I can let go of old plans quickly if a better direction appears.",
        type:"likert", competency:"adaptability", bigFive:["O"], reverse:false },
      {
        text: "You join a project midstream with little documentation. Your approach is:",
        type:"scenario",
        competency:"adaptability",
        bigFive:["C","O"],
        options: [
          { label:"Ask for context, map what’s missing, and start contributing while learning.", score:4 },
          { label:"Wait until documentation is provided.", score:0 },
          { label:"Assume you understand and act fast without checking.", score:1 },
          { label:"Only do small tasks until you feel 100% confident.", score:2 },
          { label:"Shadow a teammate briefly, then take a clear workstream.", score:3 }
        ],
        idealIndex:0,
        reverse:false
      },
      { text:"When routines break, I tend to feel blocked and less productive. (Subtle)",
        type:"likert", competency:"adaptability", bigFive:["N"], reverse:true },
      {
        text: "A client adds an unexpected legal constraint. You:",
        type:"scenario",
        competency:"adaptability",
        bigFive:["C"],
        options: [
          { label:"Re-scope, explain impacts, and propose revised options.", score:4 },
          { label:"Say it’s impossible and stop.", score:0 },
          { label:"Ignore the constraint to keep speed.", score:1 },
          { label:"Ask the client to decide, you’ll follow.", score:2 },
          { label:"Escalate to legal, then adjust plan with them.", score:3 }
        ],
        idealIndex:0,
        reverse:false
      },
      { text:"I enjoy learning new systems even when it slows me down temporarily.",
        type:"likert", competency:"adaptability", bigFive:["O"], reverse:false },
      {
        text: "Your plan fails due to external factors. You:",
        type:"scenario",
        competency:"adaptability",
        bigFive:["N"],
        options: [
          { label:"Regroup, identify what changed, and pivot fast.", score:4 },
          { label:"Stick to the same plan; it should still work.", score:0 },
          { label:"Freeze until someone tells you a new plan.", score:1 },
          { label:"Blame others and disengage.", score:2 },
          { label:"Try a smaller version of the plan to recover.", score:3 }
        ],
        idealIndex:0,
        reverse:false
      },
      { text:"I stay effective even when instructions are incomplete.",
        type:"likert", competency:"adaptability", bigFive:["C"], reverse:false },
      { text:"If rules change, I usually resist until I’m forced to adapt. (Subtle)",
        type:"likert", competency:"adaptability", bigFive:["A"], reverse:true },
      {
        text: "You move into a role requiring a skill you don’t yet master. You:",
        type:"scenario",
        competency:"adaptability",
        bigFive:["O","C"],
        options: [
          { label:"Build a learning plan, ask for feedback early, and improve fast.", score:4 },
          { label:"Hope you learn naturally as time passes.", score:1 },
          { label:"Avoid tasks that expose the gap.", score:0 },
          { label:"Overwork silently until you catch up.", score:2 },
          { label:"Find a mentor and practice on low-risk tasks first.", score:3 }
        ],
        idealIndex:0,
        reverse:false
      }
    ]
  },

  {
    id: "communication",
    title: "Module 4 — Communication",
    desc: "How clearly you share ideas, listen, and handle tough conversations.",
    questions: [
      {
        text: "A client misunderstands your message and gets upset. You:",
        type:"scenario",
        competency:"communication",
        bigFive:["A","N"],
        options: [
          { label:"Acknowledge their view, clarify calmly, and confirm alignment.", score:4 },
          { label:"Explain again the same way; they should catch up.", score:0 },
          { label:"Let your manager handle it.", score:1 },
          { label:"Apologize quickly even if unclear, then move on.", score:2 },
          { label:"Ask what they heard first, then correct precisely.", score:3 }
        ],
        idealIndex:0,
        reverse:false
      },
      { text:"I ask clarifying questions before assuming I understand someone.",
        type:"likert", competency:"communication", bigFive:["A"], reverse:false },
      {
        text: "In a meeting, a senior person dominates and others go silent. You:",
        type:"scenario",
        competency:"communication",
        bigFive:["E","A"],
        options: [
          { label:"Invite quieter voices in respectfully and summarize shared points.", score:4 },
          { label:"Say nothing; hierarchy should decide.", score:0 },
          { label:"Interrupt the senior person bluntly.", score:1 },
          { label:"Message others privately after the meeting.", score:2 },
          { label:"Ask a neutral question that re-opens the floor.", score:3 }
        ],
        idealIndex:0,
        reverse:false
      },
      { text:"I sometimes say less to avoid conflict, even if clarity suffers. (Subtle)",
        type:"likert", competency:"communication", bigFive:["N"], reverse:true },
      {
        text: "You must explain a complex topic to a non-expert. You:",
        type:"scenario",
        competency:"communication",
        bigFive:["O"],
        options: [
          { label:"Use simple language, examples, and check understanding often.", score:4 },
          { label:"Give all technical details; it’s their job to follow.", score:0 },
          { label:"Explain quickly so the meeting ends faster.", score:1 },
          { label:"Send a long document instead of speaking.", score:2 },
          { label:"Explain in layers: overview first, then details if needed.", score:3 }
        ],
        idealIndex:0,
        reverse:false
      },
      { text:"I adapt my communication style depending on who I’m speaking to.",
        type:"likert", competency:"communication", bigFive:["A"], reverse:false },
      {
        text: "A teammate gives blunt feedback that feels unfair. You:",
        type:"scenario",
        competency:"communication",
        bigFive:["N","A"],
        options: [
          { label:"Ask for examples, listen fully, then respond calmly.", score:4 },
          { label:"Defend yourself immediately in the same tone.", score:0 },
          { label:"Ignore it because they were rude.", score:1 },
          { label:"Apologize even if you don’t agree.", score:2 },
          { label:"Take a pause, then discuss privately later.", score:3 }
        ],
        idealIndex:0,
        reverse:false
      },
      { text:"I can disagree strongly while still making the other person feel respected.",
        type:"likert", competency:"communication", bigFive:["A"], reverse:false },
      { text:"I assume people will 'get it' without much context. (Subtle)",
        type:"likert", competency:"communication", bigFive:["C"], reverse:true },
      {
        text: "You notice a silent issue hurting performance, but no one talks about it. You:",
        type:"scenario",
        competency:"communication",
        bigFive:["E"],
        options: [
          { label:"Raise it respectfully with evidence and propose a solution.", score:4 },
          { label:"Wait until someone else brings it up.", score:0 },
          { label:"Vent privately to one person only.", score:1 },
          { label:"Fix it alone without mentioning it.", score:2 },
          { label:"Ask the team a neutral question to surface it safely.", score:3 }
        ],
        idealIndex:0,
        reverse:false
      }
    ]
  },

  {
    id: "workstyle",
    title: "Module 5 — Work Style",
    desc: "How you organize yourself, collaborate, and sustain results.",
    questions: [
      {
        text: "You have three urgent tasks and limited time. You:",
        type:"scenario",
        competency:"workstyle",
        bigFive:["C"],
        options: [
          { label:"Rank by impact/deadline, communicate tradeoffs, then execute.", score:4 },
          { label:"Start with the easiest to feel progress.", score:1 },
          { label:"Do them in the order received without thinking.", score:0 },
          { label:"Work on all at once and hope it balances out.", score:2 },
          { label:"Ask your manager to choose priorities, then follow.", score:3 }
        ],
        idealIndex:0,
        reverse:false
      },
      { text:"I prefer clear structure and timelines over flexible improvisation.",
        type:"likert", competency:"workstyle", bigFive:["C"], reverse:false },
      {
        text: "A teammate delivers late but high quality consistently. You:",
        type:"scenario",
        competency:"workstyle",
        bigFive:["A","C"],
        options: [
          { label:"Discuss expectations kindly and co-design a realistic timeline.", score:4 },
          { label:"Accept it; quality matters more than timelines.", score:2 },
          { label:"Complain to others instead of telling them.", score:0 },
          { label:"Take over their tasks.", score:1 },
          { label:"Escalate immediately to leadership.", score:3 }
        ],
        idealIndex:0,
        reverse:false
      },
      { text:"I work best when I can decide priorities on the fly. (Subtle)",
        type:"likert", competency:"workstyle", bigFive:["O"], reverse:true },
      {
        text: "You’re asked to support two teams with different expectations. You:",
        type:"scenario",
        competency:"workstyle",
        bigFive:["C","A"],
        options: [
          { label:"Clarify goals with both, align a joint plan, then communicate schedules.", score:4 },
          { label:"Pick one team and ignore the other until later.", score:0 },
          { label:"Say yes to both without thinking about capacity.", score:1 },
          { label:"Let them fight it out; you follow the winner.", score:2 },
          { label:"Ask your manager which team is more important.", score:3 }
        ],
        idealIndex:0,
        reverse:false
      },
      { text:"I follow through reliably, even on tasks that don’t excite me.",
        type:"likert", competency:"workstyle", bigFive:["C"], reverse:false },
      {
        text: "Work becomes repetitive for months. You:",
        type:"scenario",
        competency:"workstyle",
        bigFive:["O"],
        options: [
          { label:"Look for small optimizations or challenges to keep improving.", score:4 },
          { label:"Do the minimum; repetition kills motivation.", score:0 },
          { label:"Ask to be moved immediately regardless of timing.", score:1 },
          { label:"Keep doing it quietly, but feel disengaged.", score:2 },
          { label:"Create a personal system to make it faster and cleaner.", score:3 }
        ],
        idealIndex:0,
        reverse:false
      },
      { text:"I feel comfortable working independently for long periods.",
        type:"likert", competency:"workstyle", bigFive:["E"], reverse:false },
      { text:"I sometimes miss details because I move fast. (Subtle)",
        type:"likert", competency:"workstyle", bigFive:["C"], reverse:true },
      {
        text: "A critical deadline is tomorrow and new information appears today. You:",
        type:"scenario",
        competency:"workstyle",
        bigFive:["N","C"],
        options: [
          { label:"Re-prioritize, update stakeholders, and integrate changes fast.", score:4 },
          { label:"Ignore the new info to protect the deadline.", score:0 },
          { label:"Panic and work without a plan.", score:1 },
          { label:"Ask someone else to decide what to do.", score:2 },
          { label:"Add only what fits; document the rest for after delivery.", score:3 }
        ],
        idealIndex:0,
        reverse:false
      }
    ]
  }
];

const BIG5 = {
  O: "Openness",
  C: "Conscientiousness",
  E: "Extraversion",
  A: "Agreeableness",
  N: "Emotional Stability (low Neuroticism)"
};

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

// still numeric 0–4
let answers = {};
// store chosen option index for scenarios
let answerChoiceIdx = {};

let candidate = null;

let startTime = null;
let timerInterval = null;

// module break control
let inModuleBreak = false;
let pendingModuleIndex = null;

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
  answerChoiceIdx = {};
  currentIndex = 0;
  inModuleBreak = false;
  pendingModuleIndex = null;

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
  if (document.hidden && startTime) hardResetDueToLeave();
});
window.addEventListener("blur", () => {
  if (startTime) hardResetDueToLeave();
});
modalOkBtn.addEventListener("click", ()=> resetModal.classList.add("hidden"));

/* =========================
   MODULE BREAK SCREEN
   ========================= */
function renderModuleBreak(nextModuleIndex){
  inModuleBreak = true;
  pendingModuleIndex = nextModuleIndex;

  const nextModule = MODULES[nextModuleIndex];
  const finishedModule = MODULES[nextModuleIndex - 1];

  moduleTitle.textContent = finishedModule.title;
  moduleDesc.textContent = finishedModule.desc;

  questionWrap.innerHTML = `
    <div class="q-card" style="text-align:center;">
      <div class="q-text" style="font-size:18px;font-weight:800;margin-bottom:8px;">
        ✅ You completed ${finishedModule.title}
      </div>
      <p class="muted" style="margin-top:0;">
        Great job. When you're ready, start the next module.
      </p>

      <div class="card" style="margin-top:12px; text-align:left;">
        <h3 style="margin-top:0;">Up next:</h3>
        <p style="margin:0 0 6px;"><strong>${nextModule.title}</strong></p>
        <p class="muted" style="margin:0;">${nextModule.desc}</p>
      </div>

      <div class="actions" style="justify-content:center;margin-top:14px;">
        <button id="startNextModuleBtn" class="btn primary">
          Start Next Module
        </button>
      </div>
    </div>
  `;

  prevBtn.disabled = true;
  nextBtn.textContent = "Next";
  nextBtn.disabled = true;

  document.getElementById("startNextModuleBtn").addEventListener("click", () => {
    inModuleBreak = false;
    pendingModuleIndex = null;
    renderQuestion();
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  });
}

/* =========================
   RENDER QUESTION
   ========================= */
function renderQuestion(){
  const q = flatQuestions[currentIndex];
  const module = MODULES[q.moduleIndex];

  moduleTitle.textContent = module.title;
  moduleDesc.textContent = module.desc;

  const answeredScore = answers[currentIndex];
  const chosenIdx = answerChoiceIdx[currentIndex];

  // Likert labels
  const scaleLabels = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree"
  ];

  let optionsHTML = "";

  if (q.type === "likert") {
    optionsHTML = `
      <div class="scale">
        ${scaleLabels.map((lab, i) => `
          <button type="button"
                  class="${answeredScore === i ? "selected" : ""}"
                  data-score="${i}">
             ${lab}
          </button>
        `).join("")}
      </div>
      <p class="muted small">
        Choose the option that best reflects your true behavior, not what feels “ideal.”
      </p>
    `;
  } else {
    // scenario options
    optionsHTML = `
      <div class="scenario-options" style="display:grid; gap:8px;">
        ${q.options.map((opt, i) => `
          <button type="button"
            class="btn ghost scenario-btn ${chosenIdx === i ? "selected" : ""}"
            data-score="${opt.score}"
            data-idx="${i}"
            style="text-align:left;">
            ${opt.label}
          </button>
        `).join("")}
      </div>
      <p class="muted small" style="margin-top:10px;">
        Pick the response you would most naturally choose under real pressure.
      </p>
    `;
  }

  questionWrap.innerHTML = `
    <div class="q-card">
      <div class="q-meta">
        <span class="q-num">Q ${currentIndex + 1} of ${flatQuestions.length}</span>
        <span class="q-tag">${capitalize(q.competency)}${q.bigFive?.length ? " · Big Five" : ""}</span>
      </div>
      <div class="q-text">${q.text}</div>
      ${optionsHTML}
    </div>
  `;

  if (q.type === "likert") {
    document.querySelectorAll(".scale button").forEach(btn => {
      btn.addEventListener("click", () => {
        const val = Number(btn.dataset.score);
        answers[currentIndex] = val;
        document.querySelectorAll(".scale button").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        updateProgress();
      });
    });
  } else {
    document.querySelectorAll(".scenario-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const score = Number(btn.dataset.score);
        const idx = Number(btn.dataset.idx);

        answers[currentIndex] = score;
        answerChoiceIdx[currentIndex] = idx;

        document.querySelectorAll(".scenario-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        updateProgress();
      });
    });
  }

  prevBtn.disabled = currentIndex === 0;
  nextBtn.textContent = currentIndex === flatQuestions.length - 1 ? "Finish" : "Next";
  nextBtn.disabled = false;

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
  if (inModuleBreak) return;

  if (currentIndex > 0){
    currentIndex--;
    renderQuestion();
  }
});

nextBtn.addEventListener("click", () => {
  if (inModuleBreak) return;

  if (answers[currentIndex] == null){
    alert("Please select an answer before continuing.");
    return;
  }

  const isLastOverall = currentIndex === flatQuestions.length - 1;
  if (isLastOverall){
    finishTest();
    return;
  }

  // Check module boundary
  const currentQ = flatQuestions[currentIndex];
  const nextQ = flatQuestions[currentIndex + 1];

  currentIndex++;

  if (nextQ.moduleIndex !== currentQ.moduleIndex){
    renderModuleBreak(nextQ.moduleIndex);
  } else {
    renderQuestion();
  }
});

/* =========================
   SCORING
   ========================= */
function finishTest(){
  stopTimer();
  const elapsed = formatTime(Date.now() - startTime);

  const compScores = {innovation: [], leadership: [], adaptability: [], communication: [], workstyle: []};
  const bigScores = {O: [], C: [], E: [], A: [], N: []};

  flatQuestions.forEach((q, idx) => {
    let raw = answers[idx];

    // Reverse only applies to Likert items
    if (q.type === "likert" && q.reverse) raw = 4 - raw;

    compScores[q.competency].push(raw);

    (q.bigFive || []).forEach(trait => {
      bigScores[trait].push(raw);
    });
  });

  const compPct = {};
  for (const k in compScores){
    compPct[k] = average(compScores[k]) / 4 * 100;
  }

  const bigPct = {};
  for (const t in bigScores){
    bigPct[t] = bigScores[t].length ? average(bigScores[t]) / 4 * 100 : null;
  }

  candidateSummary.textContent =
    `${candidate.fullName} · Applying for: ${candidate.role} · ${candidate.email} · Time: ${elapsed}`;

  competencyResults.innerHTML = Object.keys(compPct).map(key =>
    resultCard(capitalize(key), compPct[key], COMP_EXPLAIN[key])
  ).join("");

  personalityResults.innerHTML = Object.keys(BIG5).map(t =>
    resultCard(BIG5[t], bigPct[t], BIG5_EXPLAIN[t], true)
  ).join("");

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
      type: q.type,
      question: q.text,
      score: answers[i],
      chosenOptionIndex: q.type === "scenario" ? (answerChoiceIdx[i] ?? null) : null,
      idealOptionIndex: q.type === "scenario" ? (q.idealIndex ?? null) : null
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

restartBtn.addEventListener("click", () => location.reload());
