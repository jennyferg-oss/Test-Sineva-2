const likertScale = [
  { value: 5, label: "Strongly agree" },
  { value: 4, label: "Agree" },
  { value: 3, label: "Neutral" },
  { value: 2, label: "Disagree" },
  { value: 1, label: "Strongly disagree" },
];

const modules = [
  {
    id: "innovacion",
    title: "Module 1 — Innovation",
    competency: "Innovation",
    description:
      "Looks at how you move from ideas to tangible pilots, keep experiments lean, and learn quickly from user signals.",
    questions: [
      {
        id: "IN1",
        moduleId: "innovacion",
        prompt:
          "Your squad receives an ambiguous challenge with minimal context. What do you do first?",
        style: "scenario",
        trait: "apertura",
        options: [
          {
            value: 5,
            label:
              "Pull in two key people, ship a prototype in 48 hours, and validate with early users",
          },
          {
            value: 4,
            label:
              "Ask for minimal data, release a slim version, and iterate in parallel",
          },
          {
            value: 3,
            label:
              "Run a broad brainstorm before building anything tangible",
          },
          { value: 2, label: "Wait for full leadership guidance before acting" },
          { value: 1, label: "Pause everything until the risk is fully contained" },
        ],
      },
      {
        id: "IN2",
        moduleId: "innovacion",
        prompt:
          "I turn user feedback into actionable prototypes in under 72 hours.",
        style: "likert",
        options: likertScale,
      },
      {
        id: "IN3",
        moduleId: "innovacion",
        prompt:
          "If an experiment fails, you document learnings and propose the next test within:",
        style: "scenario",
        options: [
          { value: 5, label: "Under 48 hours" },
          { value: 4, label: "Within the same week" },
          { value: 3, label: "During the next sprint" },
          { value: 2, label: "When there's spare time" },
          { value: 1, label: "I avoid proposing another experiment" },
        ],
      },
      {
        id: "IN4",
        moduleId: "innovacion",
        prompt:
          "I mix data and qualitative observation before deciding whether to scale a pilot idea.",
        style: "likert",
        options: likertScale,
      },
      {
        id: "IN5",
        moduleId: "innovacion",
        prompt:
          "In an internal hackathon you prioritize:",
        style: "scenario",
        options: [
          { value: 5, label: "Building a functional demo that solves a real pain" },
          { value: 4, label: "Testing an emerging technology applied to a flow" },
          { value: 3, label: "Presenting an inspiring, well-told concept" },
          { value: 2, label: "Optimizing something small to get a quick win" },
          { value: 1, label: "Avoiding risks and replicating something that already exists" },
        ],
      },
      {
        id: "IN6",
        moduleId: "innovacion",
        prompt:
          "When a key assumption is fuzzy, you design A/B tests or controlled pilots instead of deciding by intuition.",
        style: "likert",
        options: likertScale,
      },
      {
        id: "IN7",
        moduleId: "innovacion",
        prompt:
          "You actively look for references from other industries to inspire solutions.",
        style: "likert",
        trait: "apertura",
        options: likertScale,
      },
      {
        id: "IN8",
        moduleId: "innovacion",
        prompt:
          "When evaluating adding AI to a process, what do you do first?",
        style: "scenario",
        options: [
          { value: 5, label: "Map use cases, estimate impact, and run a small test" },
          { value: 4, label: "Consult experts and define success criteria" },
          { value: 3, label: "Read trends and wait for another team to try" },
          { value: 2, label: "Postpone until there's a big budget" },
          { value: 1, label: "Dismiss it because it's complex" },
        ],
      },
      {
        id: "IN9",
        moduleId: "innovacion",
        prompt:
          "You feel comfortable challenging business assumptions in front of senior leaders.",
        style: "likert",
        options: likertScale,
      },
      {
        id: "IN10",
        moduleId: "innovacion",
        prompt:
          "If you only had one week to deliver value, what would you prioritize?",
        style: "scenario",
        options: [
          { value: 5, label: "A minimum version that solves a critical pain" },
          { value: 4, label: "A usable flow even if it's not perfect" },
          { value: 3, label: "A report with hypotheses and a roadmap" },
          { value: 2, label: "A detailed benchmark" },
          { value: 1, label: "Waiting until full scope is defined" },
        ],
      },
    ],
  },
  {
    id: "liderazgo",
    title: "Module 2 — Leadership",
    competency: "Leadership",
    description:
      "Explores how you mobilize teams, hold accountability with empathy, and navigate tough calls with clarity.",
    questions: [
      {
        id: "LI1",
        moduleId: "liderazgo",
        prompt:
          "When a project drifts off-track, how do you respond with the team?",
        style: "scenario",
        trait: "responsabilidad",
        options: [
          { value: 5, label: "Reframe priorities, assign clear owners, and set weekly checkpoints" },
          { value: 4, label: "Request a recovery plan we all agree on and follow up" },
          { value: 3, label: "Ask for explanations and wait for the next sprint" },
          { value: 2, label: "Escalate the problem and delegate the solution entirely" },
          { value: 1, label: "Let the team figure it out alone" },
        ],
      },
      {
        id: "LI2",
        moduleId: "liderazgo",
        prompt:
          "I deliver tough feedback directly and respectfully, even under pressure.",
        style: "likert",
        options: likertScale,
      },
      {
        id: "LI3",
        moduleId: "liderazgo",
        prompt:
          "In executive forums, how do you present risks?",
        style: "scenario",
        options: [
          { value: 5, label: "With metrics, mitigation plans, and specific owners" },
          { value: 4, label: "With estimates and the support we need" },
          { value: 3, label: "Only if asked, in a general way" },
          { value: 2, label: "I avoid mentioning risks to not slow the decision" },
          { value: 1, label: "I avoid executive forums" },
        ],
      },
      {
        id: "LI4",
        moduleId: "liderazgo",
        prompt:
          "You push for everyone to understand how their work connects to business impact.",
        style: "likert",
        trait: "extraversion",
        options: likertScale,
      },
      {
        id: "LI5",
        moduleId: "liderazgo",
        prompt:
          "When two areas collide, you prioritize:",
        style: "scenario",
        options: [
          { value: 5, label: "Facilitating an agreement using data and shared priorities" },
          { value: 4, label: "Setting ground rules and asking teams to follow them" },
          { value: 3, label: "Asking the direct manager to solve it" },
          { value: 2, label: "Taking sides with the closest relationship" },
          { value: 1, label: "Not intervening" },
        ],
      },
      {
        id: "LI6",
        moduleId: "liderazgo",
        prompt:
          "I recognize wins publicly and correct in private.",
        style: "likert",
        options: likertScale,
      },
      {
        id: "LI7",
        moduleId: "liderazgo",
        prompt:
          "If a critical deliverable fails, what do you do in the retrospective?",
        style: "scenario",
        options: [
          { value: 5, label: "Find root causes, co-design actions, and assign owners" },
          { value: 4, label: "Document lessons and agree on a plan" },
          { value: 3, label: "Log incidents without going deep" },
          { value: 2, label: "Blame the external delay" },
          { value: 1, label: "Avoid retrospectives" },
        ],
      },
      {
        id: "LI8",
        moduleId: "liderazgo",
        prompt:
          "You see yourself as the person who energizes and gives direction when things are ambiguous.",
        style: "likert",
        trait: "extraversion",
        options: likertScale,
      },
      {
        id: "LI9",
        moduleId: "liderazgo",
        prompt:
          "When you delegate, you usually:",
        style: "scenario",
        trait: "responsabilidad",
        options: [
          { value: 5, label: "Clarify success, boundaries, and follow-up checkpoints" },
          { value: 4, label: "Assign tasks and review at the end" },
          { value: 3, label: "Give full freedom with no metrics" },
          { value: 2, label: "Take back control as soon as it gets hard" },
          { value: 1, label: "Avoid delegating" },
        ],
      },
      {
        id: "LI10",
        moduleId: "liderazgo",
        prompt:
          "Making unpopular decisions feels manageable when they protect the strategy.",
        style: "likert",
        options: likertScale,
      },
    ],
  },
  {
    id: "adaptacion",
    title: "Module 3 — Adaptability",
    competency: "Adaptability",
    description:
      "Measures how you adjust to change, manage pressure, and rebalance plans without losing quality.",
    questions: [
      {
        id: "AD1",
        moduleId: "adaptacion",
        prompt:
          "Priorities shift mid-sprint. How do you respond?",
        style: "scenario",
        trait: "estabilidad",
        options: [
          { value: 5, label: "Replan, communicate impacts, and protect the team" },
          { value: 4, label: "Reshuffle tasks and note risks" },
          { value: 3, label: "Do what I can without re-planning" },
          { value: 2, label: "Stick to the initial plan with no changes" },
          { value: 1, label: "Freeze or get frustrated" },
        ],
      },
      {
        id: "AD2",
        moduleId: "adaptacion",
        prompt:
          "I can stay calm when several things break at the same time.",
        style: "likert",
        trait: "estabilidad",
        options: likertScale,
      },
      {
        id: "AD3",
        moduleId: "adaptacion",
        prompt:
          "When a process changes, you update stakeholders and propose adjustments immediately.",
        style: "likert",
        options: likertScale,
      },
      {
        id: "AD4",
        moduleId: "adaptacion",
        prompt: "If a critical vendor fails, what do you do?",
        style: "scenario",
        options: [
          { value: 5, label: "Activate plan B, communicate, and protect critical deliverables" },
          { value: 4, label: "Search alternatives and renegotiate" },
          { value: 3, label: "Wait for the vendor to solve it" },
          { value: 2, label: "Stop everything until further notice" },
          { value: 1, label: "Escalate without proposing a solution" },
        ],
      },
      {
        id: "AD5",
        moduleId: "adaptacion",
        prompt:
          "Switching contexts several times a day hurts the quality of my decisions.",
        style: "likert",
        options: [
          { value: 1, label: "Strongly agree" },
          { value: 2, label: "Agree" },
          { value: 3, label: "Neutral" },
          { value: 4, label: "Disagree" },
          { value: 5, label: "Strongly disagree" },
        ],
      },
      {
        id: "AD6",
        moduleId: "adaptacion",
        prompt: "When a new regulation hits, what do you do first?",
        style: "scenario",
        trait: "apertura",
        options: [
          { value: 5, label: "Interpret implications and redesign the flow with experts" },
          { value: 4, label: "Bring legal and product together to align adjustments" },
          { value: 3, label: "Wait for an official playbook" },
          { value: 2, label: "Assume it doesn't apply" },
          { value: 1, label: "Ignore it until it's urgent" },
        ],
      },
      {
        id: "AD7",
        moduleId: "adaptacion",
        prompt:
          "You can change your decision when new evidence appears without losing credibility.",
        style: "likert",
        options: likertScale,
      },
      {
        id: "AD8",
        moduleId: "adaptacion",
        prompt: "If available time is cut in half, how do you protect quality?",
        style: "scenario",
        options: [
          { value: 5, label: "Cut scope, keep critical standards, and define checklists" },
          { value: 4, label: "Ask for extra help and re-prioritize" },
          { value: 3, label: "Work extra hours without rethinking" },
          { value: 2, label: "Deliver anyway even if quality drops" },
          { value: 1, label: "Give up on the deliverable" },
        ],
      },
      {
        id: "AD9",
        moduleId: "adaptacion",
        prompt:
          "You enjoy learning new tools even if it pushes you out of your comfort zone.",
        style: "likert",
        trait: "apertura",
        options: likertScale,
      },
      {
        id: "AD10",
        moduleId: "adaptacion",
        prompt: "When crises surface, how do you communicate?",
        style: "scenario",
        options: [
          { value: 5, label: "Share facts, plans, and timelines transparently" },
          { value: 4, label: "Share essentials with empathy and ask for patience" },
          { value: 3, label: "Communicate only internally" },
          { value: 2, label: "Avoid communicating until it's solved" },
          { value: 1, label: "Don't communicate it" },
        ],
      },
    ],
  },
  {
    id: "comunicacion",
    title: "Module 4 — Communication",
    competency: "Communication",
    description:
      "Reviews how clearly you transmit decisions, listen actively, and adapt the message to each audience.",
    questions: [
      {
        id: "CO1",
        moduleId: "comunicacion",
        prompt: "Before an executive presentation, what do you prioritize?",
        style: "scenario",
        options: [
          { value: 5, label: "Clear structure, a decision, and supporting data" },
          { value: 4, label: "Polished visuals and narrative" },
          { value: 3, label: "Checking spelling and appendices" },
          { value: 2, label: "Improvising" },
          { value: 1, label: "Not presenting" },
        ],
      },
      {
        id: "CO2",
        moduleId: "comunicacion",
        prompt:
          "You practice active listening by repeating back and clarifying what you hear.",
        style: "likert",
        trait: "amabilidad",
        options: likertScale,
      },
      {
        id: "CO3",
        moduleId: "comunicacion",
        prompt: "You get defensive when feedback questions your work.",
        style: "likert",
        options: [
          { value: 1, label: "Strongly agree" },
          { value: 2, label: "Agree" },
          { value: 3, label: "Neutral" },
          { value: 4, label: "Disagree" },
          { value: 5, label: "Strongly disagree" },
        ],
      },
      {
        id: "CO4",
        moduleId: "comunicacion",
        prompt: "If you notice someone is lost, what do you do?",
        style: "scenario",
        trait: "amabilidad",
        options: [
          { value: 5, label: "Change the format (visual, example) and check for understanding" },
          { value: 4, label: "Invite questions and keep going" },
          { value: 3, label: "Send an email later" },
          { value: 2, label: "Assume they'll eventually get it" },
          { value: 1, label: "Ignore the signal" },
        ],
      },
      {
        id: "CO5",
        moduleId: "comunicacion",
        prompt:
          "You adapt the level of detail based on the audience (technical, business, client).",
        style: "likert",
        options: likertScale,
      },
      {
        id: "CO6",
        moduleId: "comunicacion",
        prompt: "You feel comfortable facilitating workshops or large discussions.",
        style: "likert",
        trait: "extraversion",
        options: likertScale,
      },
      {
        id: "CO7",
        moduleId: "comunicacion",
        prompt: "How do you handle disagreements in meetings?",
        style: "scenario",
        options: [
          { value: 5, label: "Name the disagreement, summarize points, and guide to a decision" },
          { value: 4, label: "Park the topic and revisit with data" },
          { value: 3, label: "Let the discussion run" },
          { value: 2, label: "Avoid intervening" },
          { value: 1, label: "End the meeting abruptly" },
        ],
      },
      {
        id: "CO8",
        moduleId: "comunicacion",
        prompt:
          "You prefer writing one-page executive summaries to align decisions.",
        style: "likert",
        options: likertScale,
      },
      {
        id: "CO9",
        moduleId: "comunicacion",
        prompt: "When there's bad news, how do you share it?",
        style: "scenario",
        options: [
          { value: 5, label: "With facts, impact, and the immediate plan" },
          { value: 4, label: "With empathy and lighter details" },
          { value: 3, label: "Via mass email" },
          { value: 2, label: "I communicate late" },
          { value: 1, label: "I don't share it" },
        ],
      },
      {
        id: "CO10",
        moduleId: "comunicacion",
        prompt:
          "Async communication (docs, chats) is your primary channel to move work forward.",
        style: "likert",
        trait: "extraversion",
        options: likertScale,
      },
    ],
  },
  {
    id: "estilo",
    title: "Module 5 — Work style",
    competency: "Work style",
    description:
      "Checks how you organize your day, collaborate, prioritize, and keep personal focus without losing the team.",
    questions: [
      {
        id: "ES1",
        moduleId: "estilo",
        prompt: "You plan your week with focus blocks and windows to collaborate.",
        style: "likert",
        trait: "responsabilidad",
        options: likertScale,
      },
      {
        id: "ES2",
        moduleId: "estilo",
        prompt: "If you're constantly interrupted, what do you do?",
        style: "scenario",
        options: [
          { value: 5, label: "Negotiate hours, set agreements, and protect critical time" },
          { value: 4, label: "Ask to reschedule" },
          { value: 3, label: "Accept every interruption" },
          { value: 2, label: "Show frustration but change nothing" },
          { value: 1, label: "Resign and slow down" },
        ],
      },
      {
        id: "ES3",
        moduleId: "estilo",
        prompt:
          "You prefer visible boards (kanban/roadmap) so everyone can follow progress.",
        style: "likert",
        options: likertScale,
      },
      {
        id: "ES4",
        moduleId: "estilo",
        prompt: "When you receive feedback, how do you incorporate it?",
        style: "scenario",
        options: [
          { value: 5, label: "Prioritize it, set actions, and share when it'll be ready" },
          { value: 4, label: "Apply it if it doesn't affect the plan" },
          { value: 3, label: "Save it for later" },
          { value: 2, label: "Downplay it" },
          { value: 1, label: "Ignore it" },
        ],
      },
      {
        id: "ES5",
        moduleId: "estilo",
        prompt:
          "You stay steady and productive even with external pressure or tight deadlines.",
        style: "likert",
        trait: "estabilidad",
        options: likertScale,
      },
      {
        id: "ES6",
        moduleId: "estilo",
        prompt: "How do you handle documentation?",
        style: "scenario",
        options: [
          { value: 5, label: "Create actionable guides and keep them current" },
          { value: 4, label: "Update when there are relevant changes" },
          { value: 3, label: "Document only at the end" },
          { value: 2, label: "Leave personal notes" },
          { value: 1, label: "Don't document" },
        ],
      },
      {
        id: "ES7",
        moduleId: "estilo",
        prompt: "Being self-taught and trying new ways of working feels natural to you.",
        style: "likert",
        options: likertScale,
      },
      {
        id: "ES8",
        moduleId: "estilo",
        prompt: "If you work remotely, how do you guarantee visibility?",
        style: "scenario",
        trait: "responsabilidad",
        options: [
          { value: 5, label: "Share daily progress and risks with clear deliverables" },
          { value: 4, label: "Respond quickly and keep the board updated" },
          { value: 3, label: "Join every meeting" },
          { value: 2, label: "Only respond when people ask" },
          { value: 1, label: "Give no visibility" },
        ],
      },
      {
        id: "ES9",
        moduleId: "estilo",
        prompt: "You prefer pairing to solve complex challenges.",
        style: "likert",
        options: likertScale,
      },
      {
        id: "ES10",
        moduleId: "estilo",
        prompt: "If you spot a better way of working, what do you do?",
        style: "scenario",
        trait: "estabilidad",
        options: [
          { value: 5, label: "Pilot the change, measure impact, and propose adopting it" },
          { value: 4, label: "Test it with my team" },
          { value: 3, label: "Wait for others to try it" },
          { value: 2, label: "Mention it but don't act" },
          { value: 1, label: "Prefer not to change" },
        ],
      },
    ],
  },
];

const traitLabels = {
  apertura: "Openness to experience",
  responsabilidad: "Conscientiousness",
  extraversion: "Extraversion",
  amabilidad: "Agreeableness",
  estabilidad: "Emotional stability",
};

const traitDescriptions = {
  apertura:
    "Explores curiosity, creativity, and willingness to test new ideas and learn from different contexts.",
  responsabilidad:
    "Measures personal organization, accountability, and discipline to honor commitments.",
  extraversion: "Looks at your social energy, presence in forums, and ability to mobilize others.",
  amabilidad: "Reflects empathy, collaboration, and capacity to build positive relationships.",
  estabilidad:
    "Observes how you handle stress, pressure, and unexpected change while staying calm and focused.",
};

const competencyDescriptions = {
  Innovation:
    "Ability to experiment, learn fast, and turn ideas into deliverables that generate tangible value.",
  Leadership:
    "Skill to mobilize teams, make clear decisions, and take responsibility for results.",
  Adaptability: "Flexibility to adjust plans in the face of change and respond with resilience.",
  Communication:
    "Clarity to share decisions, listen actively, and tailor the message to each audience.",
  "Work style":
    "How you organize your day, prioritize, and collaborate to sustain personal and team productivity.",
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
      <div class="stat-label">Candidate</div>
      <div class="stat-value">${state.user.nombre || "Pending"}</div>
      <p class="helper">${state.user.cargo || "Role"} · ${state.user.email || "Email"}</p>
    </div>
    <div class="stat-card">
      <div class="stat-label">Time remaining</div>
      <div class="stat-value">${formatTime(state.timeLeft)}</div>
      <p class="helper">20-minute global timer</p>
    </div>
    <div class="stat-card">
      <div class="stat-label">Overall progress</div>
      <div class="stat-value">${overallProgress}%</div>
      <div class="progress"><div class="progress__bar" style="width:${overallProgress}%"></div></div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Module progress</div>
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
      <div class="stat-label">${module.questions.length} questions · advance only after completing</div>
    </div>
    <p class="module__desc">${module.description}</p>
    <div>${moduleQuestions}</div>
    <div class="module__footer">
      <button class="ghost" ${state.currentModule === 0 ? "disabled" : ""} id="prev-btn">Previous</button>
      <div style="flex:1"></div>
      <span class="stat-label">${moduleProgress}% answered</span>
      <button class="secondary" id="next-btn">${
        state.currentModule === modules.length - 1 ? "Submit and view results" : "Next module"
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
      alert("Please answer every question in this module before moving forward.");
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
    extraversion: { score: 0, count: 0 },
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
        <p class="tag">Results</p>
        <h2>Full summary</h2>
      </div>
      <button class="secondary" id="restart-btn">Restart</button>
    </div>
    <div class="result-grid">${competenciesHtml}</div>
    <h3>Big Five personality profile</h3>
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
    alert("Please fill in your name, role, and email to begin.");
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
