// Sienva Executive Aptitude & Leadership Test
// script.js - static site version
// - 50 scenario questions
// - measures Logic, Performance, Leadership, Innovation
// - measures OCEAN (openness, conscientiousness, extraversion, agreeableness, neuroticism)
// - collects name/email
// - computes % across competencies, pass >= 90%
// - exports CSV/JSON, stores a copy in localStorage
// - optional Firebase block commented at bottom for remote storage

// ---------------------------
// CONFIG
// ---------------------------
const TOTAL_QUESTIONS = 50;
const COMPETENCIES = ["Logic","Performance","Leadership","Innovation"];
const OCEAN = ["Openness","Conscientiousness","Extraversion","Agreeableness","Neuroticism"];
const MAX_SCORE_PER_COMPETENCY = 5 * TOTAL_QUESTIONS; // if max value 5 per question per competency
const TOTAL_MAX_COMPETENCY_SCORE = MAX_SCORE_PER_COMPETENCY * COMPETENCIES.length;
const PASS_THRESHOLD_PERCENT = 90; // require >= 90%

// ---------------------------
// UI ELEMENTS
// ---------------------------
const startBtn = document.getElementById("start-button");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const moduleSelect = document.getElementById("module-select");

const loginSection = document.getElementById("login-section");
const testSection = document.getElementById("test-section");
const resultsSection = document.getElementById("results-section");

const qIndexEl = document.getElementById("q-index");
const qTotalEl = document.getElementById("q-total");
const scenarioTitleEl = document.getElementById("scenario-title");
const scenarioTextEl = document.getElementById("scenario-text");
const optionsContainer = document.getElementById("options-container");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

const resName = document.getElementById("res-name");
const summaryEl = document.getElementById("summary");
const competencyList = document.getElementById("competency-list");
const oceanList = document.getElementById("ocean-list");
const passFailEl = document.getElementById("pass-fail");

const downloadCSVBtn = document.getElementById("download-csv");
const downloadJSONBtn = document.getElementById("download-json");
const restartBtn = document.getElementById("restart-button");

// ---------------------------
// QUESTIONS (50) - each option has weights for competencies and ocean
// For readability the questions are shorter scenarios. Each option includes numeric weights 0-5
// ---------------------------
const questions = [
  // 1
  { id:1, scenario:"Your product launch faces unexpected regulatory barriers days before release. What do you do?",
    options:[
      {text:"Assemble cross-functional team, pause release and fix compliance.", w:{Logic:4,Performance:3,Leadership:4,Innovation:2, Openness:3,Conscientiousness:5,Extraversion:2,Agreeableness:3,Neuroticism:1}},
      {text:"Proceed and manage fallout later.", w:{Logic:1,Performance:5,Leadership:1,Innovation:1, Openness:1,Conscientiousness:1,Extraversion:4,Agreeableness:1,Neuroticism:4}},
      {text:"Outsource fixes to consultants and continue marketing.", w:{Logic:3,Performance:4,Leadership:2,Innovation:3, Openness:4,Conscientiousness:3,Extraversion:3,Agreeableness:2,Neuroticism:2}},
      {text:"Delay launch indefinitely until perfect.", w:{Logic:2,Performance:1,Leadership:2,Innovation:1, Openness:2,Conscientiousness:4,Extraversion:1,Agreeableness:3,Neuroticism:3}}
    ]
  },
  // 2
  { id:2, scenario:"A top employee is underperforming but is a long-time company asset. What is your approach?",
    options:[
      {text:"Run structured PIP with support and coaching.", w:{Logic:4,Performance:4,Leadership:4,Innovation:1, Openness:2,Conscientiousness:5,Extraversion:2,Agreeableness:3,Neuroticism:1}},
      {text:"Move them to less critical tasks.", w:{Logic:3,Performance:2,Leadership:2,Innovation:1, Openness:2,Conscientiousness:3,Extraversion:1,Agreeableness:4,Neuroticism:2}},
      {text:"Terminate immediately to set standard.", w:{Logic:2,Performance:5,Leadership:1,Innovation:1, Openness:1,Conscientiousness:4,Extraversion:2,Agreeableness:1,Neuroticism:3}},
      {text:"Ignore and hope performance improves.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1, Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:2,Neuroticism:4}}
    ]
  },
  // 3
  { id:3, scenario:"You receive two conflicting market reports with equal credibility. Budget decision due today.",
    options:[
      {text:"Quickly analyze methodologies and reconcile before deciding.", w:{Logic:5,Performance:4,Leadership:3,Innovation:2, Openness:4,Conscientiousness:5,Extraversion:1,Agreeableness:2,Neuroticism:0}},
      {text:"Split the budget evenly as a hedge.", w:{Logic:3,Performance:3,Leadership:2,Innovation:2, Openness:2,Conscientiousness:3,Extraversion:1,Agreeableness:3,Neuroticism:1}},
      {text:"Choose the report that supports your prior strategy.", w:{Logic:1,Performance:2,Leadership:1,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:2,Agreeableness:1,Neuroticism:3}},
      {text:"Delay decision and ask for extra time.", w:{Logic:4,Performance:1,Leadership:2,Innovation:2, Openness:3,Conscientiousness:4,Extraversion:1,Agreeableness:3,Neuroticism:2}}
    ]
  },
  // 4
  { id:4, scenario:"A competitor launches a disruptive feature — speed or caution?",
    options:[
      {text:"Move fast with a pilot and measure impact.", w:{Logic:4,Performance:4,Leadership:3,Innovation:5, Openness:5,Conscientiousness:3,Extraversion:3,Agreeableness:2,Neuroticism:1}},
      {text:"Wait for customer feedback; be conservative.", w:{Logic:3,Performance:2,Leadership:1,Innovation:2, Openness:2,Conscientiousness:5,Extraversion:1,Agreeableness:3,Neuroticism:2}},
      {text:"Ignore competitor and double down on core strengths.", w:{Logic:2,Performance:3,Leadership:2,Innovation:1, Openness:1,Conscientiousness:4,Extraversion:1,Agreeableness:2,Neuroticism:2}},
      {text:"Acquire smaller startup that excels in that feature.", w:{Logic:5,Performance:4,Leadership:4,Innovation:4, Openness:4,Conscientiousness:3,Extraversion:2,Agreeableness:2,Neuroticism:1}}
    ]
  },
  // 5
  { id:5, scenario:"Your team resists a new process because it adds short-term work. How to implement?",
    options:[
      {text:"Pilot with team leads and show success metrics.", w:{Logic:4,Performance:3,Leadership:4,Innovation:3, Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:1}},
      {text:"Mandate adoption with strict deadlines.", w:{Logic:2,Performance:5,Leadership:2,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:2,Agreeableness:1,Neuroticism:3}},
      {text:"Postpone until the team is ready.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1, Openness:1,Conscientiousness:3,Extraversion:1,Agreeableness:4,Neuroticism:2}},
      {text:"Incentivize early adopters to encourage change.", w:{Logic:3,Performance:4,Leadership:3,Innovation:2, Openness:3,Conscientiousness:3,Extraversion:4,Agreeableness:3,Neuroticism:1}}
    ]
  },
  // 6
  { id:6, scenario:"An important client asks for a customization that breaks scalability. You decide:",
    options:[
      {text:"Offer customization but charge premium and limit scope.", w:{Logic:4,Performance:4,Leadership:3,Innovation:2, Openness:3,Conscientiousness:4,Extraversion:3,Agreeableness:2,Neuroticism:1}},
      {text:"Refuse to protect product integrity.", w:{Logic:3,Performance:2,Leadership:2,Innovation:1, Openness:1,Conscientiousness:5,Extraversion:1,Agreeableness:1,Neuroticism:2}},
      {text:"Build customization quickly to keep client.", w:{Logic:2,Performance:5,Leadership:3,Innovation:3, Openness:3,Conscientiousness:2,Extraversion:3,Agreeableness:3,Neuroticism:2}},
      {text:"Propose alternative that fits current architecture.", w:{Logic:5,Performance:4,Leadership:4,Innovation:3, Openness:4,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:1}}
    ]
  },
  // 7
  { id:7, scenario:"Your data shows customer churn rising in a segment. Action?",
    options:[
      {text:"Run targeted qualitative interviews immediately.", w:{Logic:4,Performance:3,Leadership:3,Innovation:2, Openness:4,Conscientiousness:4,Extraversion:3,Agreeableness:3,Neuroticism:1}},
      {text:"Cut marketing for that segment to reduce spend.", w:{Logic:2,Performance:2,Leadership:1,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:2,Neuroticism:2}},
      {text:"Launch a rapid feature to plug churn cause.", w:{Logic:3,Performance:4,Leadership:3,Innovation:4, Openness:4,Conscientiousness:3,Extraversion:3,Agreeableness:2,Neuroticism:1}},
      {text:"Ignore; churn is normal.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1, Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:1,Neuroticism:3}}
    ]
  },
  // 8
  { id:8, scenario:"You must hire quickly for growth. Choose approach:",
    options:[
      {text:"Hire fast with shorter interviews.", w:{Logic:2,Performance:4,Leadership:2,Innovation:2, Openness:2,Conscientiousness:2,Extraversion:4,Agreeableness:2,Neuroticism:2}},
      {text:"Slow but rigorous hiring, accepting short delays.", w:{Logic:5,Performance:3,Leadership:3,Innovation:1, Openness:2,Conscientiousness:5,Extraversion:1,Agreeableness:2,Neuroticism:1}},
      {text:"Use contractors until you find perfect fits.", w:{Logic:3,Performance:3,Leadership:2,Innovation:3, Openness:3,Conscientiousness:3,Extraversion:2,Agreeableness:3,Neuroticism:1}},
      {text:"Promote internally regardless of fit.", w:{Logic:1,Performance:2,Leadership:2,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:2,Agreeableness:4,Neuroticism:2}}
    ]
  },
  // 9
  { id:9, scenario:"A new regulation increases cost; choose a response:",
    options:[
      {text:"Absorb cost short term and redesign pricing.", w:{Logic:4,Performance:3,Leadership:3,Innovation:2, Openness:2,Conscientiousness:4,Extraversion:1,Agreeableness:2,Neuroticism:1}},
      {text:"Pass cost to customers immediately.", w:{Logic:2,Performance:5,Leadership:1,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:1,Neuroticism:3}},
      {text:"Cut non-critical spend and maintain price.", w:{Logic:3,Performance:3,Leadership:2,Innovation:1, Openness:1,Conscientiousness:4,Extraversion:1,Agreeableness:2,Neuroticism:1}},
      {text:"Lobby regulators for relief.", w:{Logic:3,Performance:2,Leadership:3,Innovation:2, Openness:3,Conscientiousness:3,Extraversion:4,Agreeableness:2,Neuroticism:2}}
    ]
  },
  // 10
  { id:10, scenario:"A critical system fails at peak time. You:",
    options:[
      {text:"Assemble incident team and communicate transparently.", w:{Logic:5,Performance:5,Leadership:5,Innovation:1, Openness:3,Conscientiousness:5,Extraversion:3,Agreeableness:3,Neuroticism:0}},
      {text:"Try to fix alone to avoid alarm.", w:{Logic:2,Performance:2,Leadership:1,Innovation:1, Openness:1,Conscientiousness:3,Extraversion:1,Agreeableness:1,Neuroticism:3}},
      {text:"Take system offline and apologize without details.", w:{Logic:3,Performance:1,Leadership:2,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:2,Neuroticism:2}},
      {text:"Delegate to external vendor immediately.", w:{Logic:4,Performance:4,Leadership:3,Innovation:2, Openness:2,Conscientiousness:3,Extraversion:2,Agreeableness:2,Neuroticism:1}}
    ]
  },
  // 11
  { id:11, scenario:"Your long-term roadmap conflicts with urgent requests. You:",
    options:[
      {text:"Re-evaluate roadmap and reprioritize transparently.", w:{Logic:5,Performance:4,Leadership:4,Innovation:3, Openness:4,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:1}},
      {text:"Ignore urgents to preserve strategy.", w:{Logic:3,Performance:2,Leadership:2,Innovation:3, Openness:2,Conscientiousness:3,Extraversion:1,Agreeableness:1,Neuroticism:2}},
      {text:"Delay roadmap and handle urgents.", w:{Logic:2,Performance:3,Leadership:2,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:2,Agreeableness:2,Neuroticism:2}},
      {text:"Create a task force dedicated to urgents.", w:{Logic:4,Performance:4,Leadership:4,Innovation:2, Openness:3,Conscientiousness:3,Extraversion:3,Agreeableness:2,Neuroticism:1}}
    ]
  },
  // 12
  { id:12, scenario:"You detect fraud in a small unit. Best action?",
    options:[
      {text:"Launch confidential investigation and safeguard evidence.", w:{Logic:5,Performance:3,Leadership:4,Innovation:1, Openness:2,Conscientiousness:5,Extraversion:1,Agreeableness:1,Neuroticism:1}},
      {text:"Publicly announce and discipline quickly.", w:{Logic:3,Performance:4,Leadership:3,Innovation:1, Openness:1,Conscientiousness:4,Extraversion:2,Agreeableness:1,Neuroticism:2}},
      {text:"Ignore unless it reaches major scale.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1, Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:3,Neuroticism:4}},
      {text:"Outsource audit to an external firm.", w:{Logic:4,Performance:3,Leadership:2,Innovation:1, Openness:2,Conscientiousness:4,Extraversion:1,Agreeableness:1,Neuroticism:1}}
    ]
  },
  // 13
  { id:13, scenario:"A senior leader resists a cultural shift you champion. You:",
    options:[
      {text:"Engage them privately, present data and allies.", w:{Logic:4,Performance:3,Leadership:5,Innovation:3, Openness:3,Conscientiousness:4,Extraversion:3,Agreeableness:3,Neuroticism:1}},
      {text:"Bypass them and implement change anyway.", w:{Logic:2,Performance:4,Leadership:2,Innovation:2, Openness:2,Conscientiousness:2,Extraversion:1,Agreeableness:1,Neuroticism:2}},
      {text:"Abandon the change to keep harmony.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1, Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:5,Neuroticism:2}},
      {text:"Force decision via executive committee.", w:{Logic:3,Performance:3,Leadership:3,Innovation:2, Openness:2,Conscientiousness:3,Extraversion:2,Agreeableness:1,Neuroticism:1}}
    ]
  },
  // 14
  { id:14, scenario:"You must cut 10% of budget. Choice?",
    options:[
      {text:"Carefully trim low-impact programs with analytics.", w:{Logic:5,Performance:4,Leadership:3,Innovation:1, Openness:3,Conscientiousness:5,Extraversion:1,Agreeableness:2,Neuroticism:1}},
      {text:"Cut across-the-board evenly.", w:{Logic:2,Performance:3,Leadership:1,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:2,Neuroticism:2}},
      {text:"Delay big investments but keep operational spend.", w:{Logic:3,Performance:2,Leadership:2,Innovation:2, Openness:2,Conscientiousness:3,Extraversion:1,Agreeableness:2,Neuroticism:2}},
      {text:"Raise prices to offset cuts.", w:{Logic:4,Performance:5,Leadership:2,Innovation:1, Openness:2,Conscientiousness:3,Extraversion:2,Agreeableness:1,Neuroticism:2}}
    ]
  },
  // 15
  { id:15, scenario:"A promising idea lacks immediate ROI but could be strategic. You:",
    options:[
      {text:"Fund a small experiment and measure outcomes.", w:{Logic:4,Performance:3,Leadership:3,Innovation:5, Openness:5,Conscientiousness:3,Extraversion:2,Agreeableness:3,Neuroticism:1}},
      {text:"Reject due to short-term constraints.", w:{Logic:2,Performance:4,Leadership:1,Innovation:1, Openness:1,Conscientiousness:4,Extraversion:1,Agreeableness:2,Neuroticism:2}},
      {text:"Delay until more data appears.", w:{Logic:3,Performance:2,Leadership:2,Innovation:2, Openness:2,Conscientiousness:3,Extraversion:1,Agreeableness:2,Neuroticism:2}},
      {text:"Fully back it with a big budget.", w:{Logic:1,Performance:5,Leadership:4,Innovation:4, Openness:4,Conscientiousness:2,Extraversion:3,Agreeableness:2,Neuroticism:1}}
    ]
  },
  // 16
  { id:16, scenario:"An internal tool slows teams. Action?",
    options:[
      {text:"Prioritize tool rewrite with cross-team input.", w:{Logic:4,Performance:4,Leadership:3,Innovation:3, Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:1}},
      {text:"Patch it with quick fixes.", w:{Logic:3,Performance:3,Leadership:2,Innovation:2, Openness:2,Conscientiousness:3,Extraversion:1,Agreeableness:2,Neuroticism:2}},
      {text:"Remove the tool and use manual workarounds.", w:{Logic:2,Performance:1,Leadership:1,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:2,Neuroticism:3}},
      {text:"Hire consultants to audit and propose plan.", w:{Logic:4,Performance:3,Leadership:2,Innovation:2, Openness:3,Conscientiousness:3,Extraversion:2,Agreeableness:2,Neuroticism:1}}
    ]
  },
  // 17
  { id:17, scenario:"Key vendor shows poor reliability. Choose:",
    options:[
      {text:"Find alternatives and prepare migration plan.", w:{Logic:5,Performance:4,Leadership:3,Innovation:2, Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:2,Neuroticism:1}},
      {text:"Renegotiate terms and hope for improvement.", w:{Logic:3,Performance:3,Leadership:2,Innovation:1, Openness:2,Conscientiousness:3,Extraversion:2,Agreeableness:3,Neuroticism:2}},
      {text:"Ignore shortfalls due to switching cost.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1, Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:3,Neuroticism:3}},
      {text:"Bring vendor onsite to jointly fix issues.", w:{Logic:4,Performance:3,Leadership:3,Innovation:2, Openness:3,Conscientiousness:3,Extraversion:3,Agreeableness:3,Neuroticism:1}}
    ]
  },
  // 18
  { id:18, scenario:"Your team proposes a risky acquisition. You:",
    options:[
      {text:"Run rigorous due diligence and stress tests.", w:{Logic:5,Performance:4,Leadership:4,Innovation:2, Openness:3,Conscientiousness:5,Extraversion:2,Agreeableness:2,Neuroticism:1}},
      {text:"Approve quickly to seize market momentum.", w:{Logic:2,Performance:5,Leadership:3,Innovation:4, Openness:4,Conscientiousness:2,Extraversion:3,Agreeableness:2,Neuroticism:2}},
      {text:"Reject due to integration risk.", w:{Logic:3,Performance:2,Leadership:2,Innovation:1, Openness:1,Conscientiousness:3,Extraversion:1,Agreeableness:2,Neuroticism:2}},
      {text:"Partner instead of acquiring.", w:{Logic:4,Performance:3,Leadership:3,Innovation:3, Openness:4,Conscientiousness:3,Extraversion:3,Agreeableness:3,Neuroticism:1}}
    ]
  },
  // 19
  { id:19, scenario:"A regulatory change affects your product roadmap. You:",
    options:[
      {text:"Adjust roadmap and communicate tradeoffs.", w:{Logic:4,Performance:3,Leadership:3,Innovation:2, Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:2,Neuroticism:1}},
      {text:"Ignore and continue until forced to change.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1, Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:1,Neuroticism:3}},
      {text:"Pivot product focus immediately.", w:{Logic:3,Performance:4,Leadership:3,Innovation:3, Openness:4,Conscientiousness:2,Extraversion:2,Agreeableness:2,Neuroticism:1}},
      {text:"Engage stakeholders to lobby for exemptions.", w:{Logic:3,Performance:2,Leadership:3,Innovation:1, Openness:2,Conscientiousness:3,Extraversion:4,Agreeableness:2,Neuroticism:2}}
    ]
  },
  // 20
  { id:20, scenario:"Your team requires deeper skills. Best approach?",
    options:[
      {text:"Invest in targeted training and mentors.", w:{Logic:4,Performance:4,Leadership:4,Innovation:2, Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:1}},
      {text:"Hire externally for speed.", w:{Logic:3,Performance:5,Leadership:3,Innovation:2, Openness:3,Conscientiousness:3,Extraversion:3,Agreeableness:2,Neuroticism:2}},
      {text:"Outsource tasks entirely.", w:{Logic:2,Performance:2,Leadership:1,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:2,Neuroticism:2}},
      {text:"Do nothing and accept lower quality.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1, Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:1,Neuroticism:4}}
    ]
  },
  // 21
  { id:21, scenario:"A product defect reaches a major client. You:",
    options:[
      {text:"Own the mistake, fix quickly and compensate.", w:{Logic:4,Performance:4,Leadership:5,Innovation:1, Openness:3,Conscientiousness:5,Extraversion:2,Agreeableness:4,Neuroticism:1}},
      {text:"Minimize publicly and silently fix.", w:{Logic:2,Performance:3,Leadership:2,Inn
