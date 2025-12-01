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
      {text:"Minimize publicly and silently fix.", w:{Logic:2,Performance:3,Leadership:2,Innovation:1, Openness:1,Conscientiousness:3,Extraversion:1,Agreeableness:1,Neuroticism:3}},
      {text:"Delay response until more info is available.", w:{Logic:3,Performance:2,Leadership:2,Innovation:1, Openness:2,Conscientiousness:2,Extraversion:1,Agreeableness:2,Neuroticism:2}},
      {text:"Blame vendor and push responsibility.", w:{Logic:1,Performance:2,Leadership:1,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:2,Agreeableness:1,Neuroticism:3}}
    ]
  },
  // 22
  { id:22, scenario:"You must decide between two leaders for promotion. You:",
    options:[
      {text:"Use structured data and interviews to decide.", w:{Logic:5,Performance:4,Leadership:5,Innovation:2, Openness:3,Conscientiousness:5,Extraversion:2,Agreeableness:3,Neuroticism:0}},
      {text:"Pick the one you’re closer to personally.", w:{Logic:1,Performance:2,Leadership:1,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:2,Agreeableness:4,Neuroticism:3}},
      {text:"Rotate the role as experiment.", w:{Logic:3,Performance:3,Leadership:3,Innovation:3, Openness:4,Conscientiousness:3,Extraversion:3,Agreeableness:3,Neuroticism:1}},
      {text:"Ask external consultant to recommend.", w:{Logic:4,Performance:3,Leadership:3,Innovation:2, Openness:3,Conscientiousness:3,Extraversion:1,Agreeableness:2,Neuroticism:1}}
    ]
  },
  // 23
  { id:23, scenario:"Team morale dips after layoffs. You:",
    options:[
      {text:"Hold open forums and transparent Q&A.", w:{Logic:4,Performance:3,Leadership:5,Innovation:1, Openness:4,Conscientiousness:4,Extraversion:3,Agreeableness:4,Neuroticism:1}},
      {text:"Keep communications minimal to avoid panic.", w:{Logic:2,Performance:2,Leadership:1,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:1,Neuroticism:3}},
      {text:"Offer benefits and time off to those affected.", w:{Logic:3,Performance:2,Leadership:3,Innovation:1, Openness:2,Conscientiousness:3,Extraversion:2,Agreeableness:4,Neuroticism:1}},
      {text:"Ignore and focus on business metrics.", w:{Logic:1,Performance:4,Leadership:1,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:1,Neuroticism:3}}
    ]
  },
  // 24
  { id:24, scenario:"A breakthrough tech could obsolete your core product. You:",
    options:[
      {text:"Invest in a research arm to explore it.", w:{Logic:4,Performance:3,Leadership:4,Innovation:5, Openness:5,Conscientiousness:3,Extraversion:2,Agreeableness:2,Neuroticism:1}},
      {text:"Ignore and defend existing market.", w:{Logic:2,Performance:2,Leadership:1,Innovation:1, Openness:1,Conscientiousness:3,Extraversion:1,Agreeableness:2,Neuroticism:3}},
      {text:"Partner with startups developing it.", w:{Logic:3,Performance:3,Leadership:3,Innovation:4, Openness:4,Conscientiousness:3,Extraversion:3,Agreeableness:3,Neuroticism:1}},
      {text:"License technology and adapt product.", w:{Logic:4,Performance:4,Leadership:3,Innovation:3, Openness:4,Conscientiousness:3,Extraversion:2,Agreeableness:2,Neuroticism:1}}
    ]
  },
  // 25
  { id:25, scenario:"You notice bias in hiring patterns. You:",
    options:[
      {text:"Audit process and implement blind screening.", w:{Logic:5,Performance:3,Leadership:4,Innovation:2, Openness:4,Conscientiousness:5,Extraversion:1,Agreeableness:3,Neuroticism:1}},
      {text:"Ignore; current hires perform well.", w:{Logic:1,Performance:2,Leadership:1,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:2,Neuroticism:3}},
      {text:"Train hiring managers and adjust metrics.", w:{Logic:4,Performance:3,Leadership:3,Innovation:2, Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:1}},
      {text:"Outsource hiring to third party.", w:{Logic:3,Performance:3,Leadership:2,Innovation:1, Openness:2,Conscientiousness:3,Extraversion:2,Agreeableness:2,Neuroticism:2}}
    ]
  },
  // 26
  { id:26, scenario:"Customer feedback contradicts executive view. You:",
    options:[
      {text:"Prioritize direct customer research and adjust strategy.", w:{Logic:5,Performance:4,Leadership:4,Innovation:3, Openness:4,Conscientiousness:4,Extraversion:3,Agreeableness:3,Neuroticism:1}},
      {text:"Favor executive judgment and continue.", w:{Logic:2,Performance:2,Leadership:2,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:2,Neuroticism:3}},
      {text:"Run A/B tests to reconcile differences.", w:{Logic:4,Performance:4,Leadership:3,Innovation:3, Openness:4,Conscientiousness:4,Extraversion:2,Agreeableness:2,Neuroticism:1}},
      {text:"Ignore feedback as noise.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1, Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:1,Neuroticism:4}}
    ]
  },
  // 27
  { id:27, scenario:"A technology vendor offers a risky but enticing roadmap. You:",
    options:[
      {text:"Negotiate clear SLAs and pilot first.", w:{Logic:4,Performance:3,Leadership:3,Innovation:3, Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:2,Neuroticism:1}},
      {text:"Trust vendor and sign long contract.", w:{Logic:2,Performance:4,Leadership:2,Innovation:3, Openness:3,Conscientiousness:2,Extraversion:3,Agreeableness:3,Neuroticism:2}},
      {text:"Avoid vendor due to risk.", w:{Logic:3,Performance:2,Leadership:1,Innovation:1, Openness:1,Conscientiousness:3,Extraversion:1,Agreeableness:1,Neuroticism:2}},
      {text:"Build in-house alternative over time.", w:{Logic:4,Performance:3,Leadership:3,Innovation:4, Openness:4,Conscientiousness:3,Extraversion:2,Agreeableness:2,Neuroticism:1}}
    ]
  },
  // 28
  { id:28, scenario:"Your product's UX causes high drop-off. Reaction?",
    options:[
      {text:"Fund rapid UX improvements and test.", w:{Logic:4,Performance:4,Leadership:3,Innovation:4, Openness:4,Conscientiousness:3,Extraversion:2,Agreeableness:2,Neuroticism:1}},
      {text:"Focus on features instead; UX later.", w:{Logic:2,Performance:3,Leadership:1,Innovation:2, Openness:2,Conscientiousness:2,Extraversion:1,Agreeableness:2,Neuroticism:2}},
      {text:"Hire UX agency to redesign.", w:{Logic:3,Performance:3,Leadership:2,Innovation:3, Openness:3,Conscientiousness:2,Extraversion:2,Agreeableness:2,Neuroticism:1}},
      {text:"Accept drop-off as inevitable.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1, Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:1,Neuroticism:3}}
    ]
  },
  // 29
  { id:29, scenario:"A remote office wants autonomy that could fragment brand. You:",
    options:[
      {text:"Create clear guardrails and local freedom within them.", w:{Logic:4,Performance:3,Leadership:4,Innovation:2, Openness:3,Conscientiousness:4,Extraversion:3,Agreeableness:3,Neuroticism:1}},
      {text:"Centralize control immediately.", w:{Logic:3,Performance:4,Leadership:2,Innovation:1, Openness:1,Conscientiousness:4,Extraversion:1,Agreeableness:1,Neuroticism:2}},
      {text:"Allow full autonomy to encourage innovation.", w:{Logic:2,Performance:2,Leadership:3,Innovation:4, Openness:5,Conscientiousness:2,Extraversion:3,Agreeableness:3,Neuroticism:1}},
      {text:"Close the remote office.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1, Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:1,Neuroticism:4}}
    ]
  },
  // 30
  { id:30, scenario:"Your competitor offers free trials that attract users. You:",
    options:[
      {text:"Offer limited trials and focus on retention.", w:{Logic:4,Performance:4,Leadership:3,Innovation:3, Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:1}},
      {text:"Match free trials and spend heavily on acquisition.", w:{Logic:2,Performance:5,Leadership:2,Innovation:2, Openness:2,Conscientiousness:2,Extraversion:3,Agreeableness:2,Neuroticism:2}},
      {text:"Differentiate with premium features instead.", w:{Logic:3,Performance:3,Leadership:3,Innovation:4, Openness:4,Conscientiousness:3,Extraversion:2,Agreeableness:2,Neuroticism:1}},
      {text:"Ignore competitor and focus on existing base.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1, Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:1,Neuroticism:3}}
    ]
  },
  // 31
  { id:31, scenario:"Remote work productivity seems lower for some teams. You:",
    options:[
      {text:"Measure outputs and adjust expectations per team.", w:{Logic:4,Performance:4,Leadership:3,Innovation:2, Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:1}},
      {text:"Mandate return to office for those teams.", w:{Logic:2,Performance:3,Leadership:2,Innovation:1, Openness:1,Conscientiousness:3,Extraversion:2,Agreeableness:1,Neuroticism:2}},
      {text:"Offer remote productivity training and support.", w:{Logic:3,Performance:3,Leadership:3,Innovation:2, Openness:3,Conscientiousness:3,Extraversion:2,Agreeableness:3,Neuroticism:1}},
      {text:"Accept variance and move on.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1, Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:2,Neuroticism:3}}
    ]
  },
  // 32
  { id:32, scenario:"You must choose between two product visions: safe or bold. You:",
    options:[
      {text:"Split roadmap to pursue both in stages.", w:{Logic:4,Performance:3,Leadership:3,Innovation:4, Openness:4,Conscientiousness:3,Extraversion:2,Agreeableness:2,Neuroticism:1}},
      {text:"Pick safe to protect revenue.", w:{Logic:3,Performance:4,Leadership:2,Innovation:1, Openness:2,Conscientiousness:4,Extraversion:1,Agreeableness:2,Neuroticism:2}},
      {text:"Go bold to capture market differentiation.", w:{Logic:2,Performance:3,Leadership:3,Innovation:5, Openness:5,Conscientiousness:2,Extraversion:3,Agreeableness:1,Neuroticism:1}},
      {text:"Survey customers then decide.", w:{Logic:5,Performance:3,Leadership:2,Innovation:3, Openness:4,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:0}}
    ]
  },
  // 33
  { id:33, scenario:"Leadership styles clash in an acquisition integration. You:",
    options:[
      {text:"Define shared principles and clear decision rights.", w:{Logic:5,Performance:4,Leadership:5,Innovation:2, Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:1}},
      {text:"Let each team operate independently forever.", w:{Logic:1,Performance:2,Leadership:1,Innovation:2, Openness:2,Conscientiousness:1,Extraversion:2,Agreeableness:3,Neuroticism:3}},
      {text:"Replace leaders who block integration.", w:{Logic:3,Performance:4,Leadership:2,Innovation:1, Openness:1,Conscientiousness:3,Extraversion:2,Agreeableness:1,Neuroticism:2}},
      {text:"Use external mediator to build alignment.", w:{Logic:4,Performance:3,Leadership:3,Innovation:2, Openness:3,Conscientiousness:3,Extraversion:3,Agreeableness:3,Neuroticism:1}}
    ]
  },
  // 34
  { id:34, scenario:"A crucial metric unexpectedly spikes. You:",
    options:[
      {text:"Investigate root cause and validate data.", w:{Logic:5,Performance:4,Leadership:3,Innovation:2, Openness:4,Conscientiousness:5,Extraversion:1,Agreeableness:2,Neuroticism:0}},
      {text:"Celebrate and assume progress.", w:{Logic:1,Performance:3,Leadership:2,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:3,Agreeableness:3,Neuroticism:1}},
      {text:"Pause decisions until you analyze further.", w:{Logic:4,Performance:2,Leadership:2,Innovation:1, Openness:2,Conscientiousness:4,Extraversion:1,Agreeableness:2,Neuroticism:1}},
      {text:"Publish results internally without checks.", w:{Logic:1,Performance:2,Leadership:1,Innovation:1, Openness:1,Conscientiousness:1,Extraversion:3,Agreeableness:2,Neuroticism:2}}
    ]
  },
  // 35
  { id:35, scenario:"Your team requests flexible hours but customers require 24/7 coverage. You:",
    options:[
      {text:"Implement staggered shifts to meet both needs.", w:{Logic:4,Performance:4,Leadership:4,Innovation:2, Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:4,Neuroticism:1}},
      {text:"Deny flexibility due to coverage.", w:{Logic:2,Performance:3,Leadership:1,Innovation:1, Openness:1,Conscientiousness:3,Extraversion:1,Agreeableness:1,Neuroticism:2}},
      {text:"Outsource 24/7 ops to vendor.", w:{Logic:3,Performance:3,Leadership:2,Innovation:2, Openness:2,Conscientiousness:3,Extraversion:1,Agreeableness:2,Neuroticism:1}},
      {text:"Offer remote flexible options for part of team.", w:{Logic:3,Performance:3,Leadership:3,Innovation:2, Openness:3,Conscientiousness:3,Extraversion:2,Agreeableness:3,Neuroticism:1}}
    ]
  },
  // 36
  { id:36, scenario:"A new CEO asks to cut product lines. You:",
    options:[
      {text:"Use data and customer impact to recommend cuts.", w:{Logic:5,Performance:4,Leadership:4,Innovation:1, Openness:3,Conscientiousness:5,Extraversion:2,Agreeableness:2,Neuroticism:1}},
      {text:"Support CEO and cut quickly without analysis.", w:{Logic:2,Performance:5,Leadership:2,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:2,Agreeableness:2,Neuroticism:2}},
      {text:"Resist cuts to protect teams.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:2,Agreeableness:4,Neuroticism:3}},
      {text:"Negotiate phased cuts with safeguards.", w:{Logic:4,Performance:3,Leadership:3,Innovation:2, Openness:2,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:1}}
    ]
  },
  // 37
  { id:37, scenario:"You need a quick technical decision you don't fully understand. You:",
    options:[
      {text:"Consult trusted engineers and make informed call.", w:{Logic:5,Performance:4,Leadership:3,Innovation:2, Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:2,Neuroticism:0}},
      {text:"Decide by instinct to move fast.", w:{Logic:2,Performance:5,Leadership:2,Innovation:3, Openness:3,Conscientiousness:2,Extraversion:3,Agreeableness:2,Neuroticism:1}},
      {text:"Defer decision until you learn more.", w:{Logic:4,Performance:2,Leadership:2,Innovation:1, Openness:2,Conscientiousness:3,Extraversion:1,Agreeableness:2,Neuroticism:1}},
      {text:"Ask external consultant and follow recommendation.", w:{Logic:4,Performance:3,Leadership:2,Innovation:2, Openness:3,Conscientiousness:3,Extraversion:1,Agreeableness:2,Neuroticism:1}}
    ]
  },
  // 38
  { id:38, scenario:"You plan to expand to a new country with unknown regulation. You:",
    options:[
      {text:"Pilot in a small city and learn quickly.", w:{Logic:4,Performance:4,Leadership:3,Innovation:3, Openness:4,Conscientiousness:3,Extraversion:2,Agreeableness:2,Neuroticism:1}},
      {text:"Launch at scale to gain market share fast.", w:{Logic:2,Performance:5,Leadership:3,Innovation:3, Openness:3,Conscientiousness:2,Extraversion:3,Agreeableness:2,Neuroticism:2}},
      {text:"Partner with local firm to mitigate risk.", w:{Logic:4,Performance:3,Leadership:3,Innovation:2, Openness:3,Conscientiousness:3,Extraversion:3,Agreeableness:3,Neuroticism:1}},
      {text:"Wait until regulations are stable.", w:{Logic:3,Performance:1,Leadership:1,Innovation:1, Openness:1,Conscientiousness:4,Extraversion:1,Agreeableness:2,Neuroticism:2}}
    ]
  },
  // 39
  { id:39, scenario:"A major outage exposed insecure customer data. Public trust is falling. You:",
    options:[
      {text:"Full disclosure, remediation plan and compensation.", w:{Logic:5,Performance:4,Leadership:5,Innovation:1, Openness:5,Conscientiousness:5,Extraversion:2,Agreeableness:4,Neuroticism:0}},
      {text:"Minimize communication to control PR.", w:{Logic:1,Performance:2,Leadership:1,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:3,Agreeableness:1,Neuroticism:3}},
      {text:"Fix quietly and resume normal ops.", w:{Logic:3,Performance:2,Leadership:2,Innovation:1, Openness:2,Conscientiousness:3,Extraversion:1,Agreeableness:1,Neuroticism:2}},
      {text:"Hire external security auditors and announce plan.", w:{Logic:4,Performance:3,Leadership:3,Innovation:2, Openness:4,Conscientiousness:4,Extraversion:2,Agreeableness:2,Neuroticism:1}}
    ]
  },
  // 40
  { id:40, scenario:"Your retention program works for customers but increases costs. You:",
    options:[
      {text:"Measure lifetime value and justify retention spend.", w:{Logic:5,Performance:4,Leadership:3,Innovation:2, Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:1}},
      {text:"Cut retention to protect short-term margins.", w:{Logic:2,Performance:5,Leadership:2,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:1,Neuroticism:3}},
      {text:"Test lower-cost retention tactics.", w:{Logic:4,Performance:3,Leadership:3,Innovation:3, Openness:4,Conscientiousness:3,Extraversion:2,Agreeableness:3,Neuroticism:1}},
      {text:"Keep program unchanged for stability.", w:{Logic:3,Performance:2,Leadership:2,Innovation:1, Openness:2,Conscientiousness:3,Extraversion:1,Agreeableness:3,Neuroticism:2}}
    ]
  },
  // 41
  { id:41, scenario:"An aggressive new entrant undercuts price. You:",
    options:[
      {text:"Differentiate with service and quality rather than price.", w:{Logic:5,Performance:3,Leadership:4,Innovation:3, Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:1}},
      {text:"Engage in price war to defend market share.", w:{Logic:2,Performance:5,Leadership:2,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:3,Agreeableness:1,Neuroticism:2}},
      {text:"Seek strategic partnerships to expand value.", w:{Logic:4,Performance:3,Leadership:3,Innovation:2, Openness:3,Conscientiousness:3,Extraversion:3,Agreeableness:3,Neuroticism:1}},
      {text:"Exit that market segment.", w:{Logic:2,Performance:1,Leadership:1,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:1,Neuroticism:3}}
    ]
  },
  // 42
  { id:42, scenario:"You find a top performer is taking shortcuts with data quality to meet KPIs. You:",
    options:[
      {text:"Address behavior, retrain and adjust KPIs.", w:{Logic:5,Performance:4,Leadership:4,Innovation:1, Openness:3,Conscientiousness:5,Extraversion:2,Agreeableness:2,Neuroticism:1}},
      {text:"Ignore because metrics remain high.", w:{Logic:1,Performance:5,Leadership:1,Innovation:1, Openness:1,Conscientiousness:1,Extraversion:2,Agreeableness:1,Neuroticism:3}},
      {text:"Fire the employee immediately.", w:{Logic:3,Performance:3,Leadership:2,Innovation:1, Openness:1,Conscientiousness:4,Extraversion:1,Agreeableness:1,Neuroticism:2}},
      {text:"Reassign them to non-data role.", w:{Logic:2,Performance:2,Leadership:1,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:2,Neuroticism:2}}
    ]
  },
  // 43
  { id:43, scenario:"A long-term vendor proposes better terms for loyalty. You:",
    options:[
      {text:"Negotiate improved terms while keeping contingency plans.", w:{Logic:4,Performance:4,Leadership:3,Innovation:2, Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:1}},
      {text:"Switch to a cheaper vendor immediately.", w:{Logic:2,Performance:4,Leadership:2,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:1,Neuroticism:2}},
      {text:"Keep existing contract out of loyalty.", w:{Logic:1,Performance:2,Leadership:1,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:4,Neuroticism:2}},
      {text:"Open bidding to test market price.", w:{Logic:3,Performance:3,Leadership:3,Innovation:2, Openness:2,Conscientiousness:3,Extraversion:2,Agreeableness:2,Neuroticism:1}}
    ]
  },
  // 44
  { id:44, scenario:"Your product requires compliance training for users; low uptake expected. You:",
    options:[
      {text:"Make training brief and incentivize completion.", w:{Logic:4,Performance:3,Leadership:3,Innovation:2, Openness:3,Conscientiousness:3,Extraversion:3,Agreeableness:3,Neuroticism:1}},
      {text:"Make training mandatory without incentives.", w:{Logic:2,Performance:4,Leadership:2,Innovation:1, Openness:1,Conscientiousness:4,Extraversion:1,Agreeableness:1,Neuroticism:2}},
      {text:"Offer optional deep-dive resources instead.", w:{Logic:3,Performance:2,Leadership:1,Innovation:2, Openness:3,Conscientiousness:2,Extraversion:2,Agreeableness:2,Neuroticism:1}},
      {text:"Ignore training and risk non-compliance.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1, Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:1,Neuroticism:4}}
    ]
  },
  // 45
  { id:45, scenario:"Your analytics team offers a new predictive model reducing costs. You:",
    options:[
      {text:"Pilot and validate model before release.", w:{Logic:5,Performance:4,Leadership:3,Innovation:4, Openness:4,Conscientiousness:4,Extraversion:1,Agreeableness:2,Neuroticism:0}},
      {text:"Deploy immediately to capture savings.", w:{Logic:2,Performance:5,Leadership:2,Innovation:3, Openness:3,Conscientiousness:2,Extraversion:2,Agreeableness:2,Neuroticism:1}},
      {text:"Delay until further review.", w:{Logic:3,Performance:2,Leadership:2,Innovation:1, Openness:2,Conscientiousness:3,Extraversion:1,Agreeableness:2,Neuroticism:1}},
      {text:"Ignore due to trust concerns.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1, Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:1,Neuroticism:3}}
    ]
  },
  // 46
  { id:46, scenario:"Two teams claim credit for same success. You:",
    options:[
      {text:"Recognize both and clarify roles for next time.", w:{Logic:4,Performance:3,Leadership:4,Innovation:2, Openness:3,Conscientiousness:3,Extraversion:3,Agreeableness:4,Neuroticism:1}},
      {text:"Give credit to the larger team.", w:{Logic:2,Performance:2,Leadership:1,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:2,Agreeableness:2,Neuroticism:2}},
      {text:"Pick one team and make example.", w:{Logic:1,Performance:3,Leadership:2,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:2,Agreeableness:1,Neuroticism:2}},
      {text:"Ignore and leave ambiguous.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1, Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:1,Neuroticism:3}}
    ]
  },
  // 47
  { id:47, scenario:"A promising vendor requests exclusive terms. You:",
    options:[
      {text:"Negotiate non-exclusive pilot and data share.", w:{Logic:4,Performance:3,Leadership:3,Innovation:3, Openness:3,Conscientiousness:3,Extraversion:2,Agreeableness:2,Neuroticism:1}},
      {text:"Accept exclusivity to secure advantage.", w:{Logic:2,Performance:4,Leadership:2,Innovation:3, Openness:2,Conscientiousness:2,Extraversion:3,Agreeableness:2,Neuroticism:2}},
      {text:"Reject exclusivity to preserve options.", w:{Logic:3,Performance:2,Leadership:2,Innovation:1, Openness:2,Conscientiousness:3,Extraversion:1,Agreeableness:1,Neuroticism:1}},
      {text:"Delay and evaluate further vendors.", w:{Logic:4,Performance:3,Leadership:2,Innovation:2, Openness:3,Conscientiousness:3,Extraversion:1,Agreeableness:2,Neuroticism:1}}
    ]
  },
  // 48
  { id:48, scenario:"Board asks for faster growth but you lack resources. You:",
    options:[
      {text:"Propose realistic phased growth with KPIs.", w:{Logic:5,Performance:4,Leadership:4,Innovation:2, Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:1}},
      {text:"Promise growth and scramble resources.", w:{Logic:2,Performance:5,Leadership:2,Innovation:2, Openness:2,Conscientiousness:2,Extraversion:3,Agreeableness:2,Neuroticism:2}},
      {text:"Refuse and defend current plan.", w:{Logic:3,Performance:2,Leadership:1,Innovation:1, Openness:1,Conscientiousness:3,Extraversion:1,Agreeableness:1,Neuroticism:2}},
      {text:"Seek mergers to accelerate growth.", w:{Logic:4,Performance:3,Leadership:3,Innovation:3, Openness:3,Conscientiousness:3,Extraversion:3,Agreeableness:2,Neuroticism:1}}
    ]
  },
  // 49
  { id:49, scenario:"A public leader criticizes your company. You:",
    options:[
      {text:"Respond factually, propose conversation.", w:{Logic:4,Performance:3,Leadership:4,Innovation:1, Openness:3,Conscientiousness:3,Extraversion:2,Agreeableness:3,Neuroticism:1}},
      {text:"Ignore to avoid fueling controversy.", w:{Logic:2,Performance:2,Leadership:1,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:1,Neuroticism:2}},
      {text:"Defend aggressively in public.", w:{Logic:1,Performance:2,Leadership:2,Innovation:1, Openness:1,Conscientiousness:2,Extraversion:4,Agreeableness:1,Neuroticism:3}},
      {text:"Engage neutral third party to mediate.", w:{Logic:4,Performance:2,Leadership:3,Innovation:1, Openness:2,Conscientiousness:3,Extraversion:2,Agreeableness:3,Neuroticism:1}}
    ]
  },
  // 50
  { id:50, scenario:"Your leadership team lacks diversity of thought. You:",
    options:[
      {text:"Intentionally recruit diverse perspectives and measure impact.", w:{Logic:5,Performance:3,Leadership:5,Innovation:4, Openness:5,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:0}},
      {text:"Keep current team because they deliver.", w:{Logic:2,Performance:4,Leadership:2,Innovation:1, Openness:1,Conscientiousness:3,Extraversion:1,Agreeableness:2,Neuroticism:2}},
      {text:"Rotate external advisors to add viewpoints.", w:{Logic:4,Performance:3,Leadership:3,Innovation:3, Openness:4,Conscientiousness:3,Extraversion:3,Agreeableness:3,Neuroticism:1}},
      {text:"Ignore diversity concerns for now.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1, Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:1,Neuroticism:4}}
    ]
  }
]; // end questions

// ---------------------------
// APPLICATION STATE
// ---------------------------
let currentIndex = 0;
let answers = new Array(questions.length).fill(null); // store selected option index
let competencyTotals = { Logic:0, Performance:0, Leadership:0, Innovation:0 };
let oceanTotals = { Openness:0, Conscientiousness:0, Extraversion:0, Agreeableness:0, Neuroticism:0 };
let participant = { name:"", email:"", module:"", startedAt:null, finishedAt:null, scorePercent:0, passed:false };

// ---------------------------
// UI Helpers
// ---------------------------
function show(el){ el.classList.remove("hidden"); }
function hide(el){ el.classList.add("hidden"); }

// ---------------------------
// START TEST
// ---------------------------
startBtn.addEventListener("click", ()=>{
  const name = usernameInput.value.trim();
  const email = emailInput.value.trim();

  if(!name || !email){
    alert("Please enter name and email to begin.");
    return;
  }

  participant.name = name;
  participant.email = email;
  participant.module = moduleSelect.value;
  participant.startedAt = new Date().toISOString();

  loginSection.classList.add("hidden");
  testSection.classList.remove("hidden");
  qTotalEl.textContent = questions.length;
  loadQuestion(currentIndex);
});

// ---------------------------
// RENDER QUESTION
// ---------------------------
function loadQuestion(index){
  const q = questions[index];
  qIndexEl.textContent = index+1;
  scenarioTitleEl.textContent = `Scenario ${q.id}`;
  scenarioTextEl.textContent = q.scenario;

  optionsContainer.innerHTML = "";
  nextButton.disabled = true;

  q.options.forEach((opt, idx) => {
    const div = document.createElement("div");
    div.className = "option";
    div.dataset.idx = idx;
    div.innerHTML = `<div class="opt-text">${opt.text}</div>`;
    if(answers[index] === idx) div.classList.add("selected");

    div.addEventListener("click", ()=>{
      // deselect previous option for this question
      document.querySelectorAll("#options-container .option").forEach(o=>o.classList.remove("selected"));
      div.classList.add("selected");
      nextButton.disabled = false;
      answers[index] = idx;
    });

    optionsContainer.appendChild(div);
  });

  prevButton.disabled = (index===0);
}

// NAV buttons
prevButton.addEventListener("click", ()=>{
  if(currentIndex>0){
    currentIndex--;
    loadQuestion(currentIndex);
  }
});

nextButton.addEventListener("click", ()=>{
  // ensure selected
  if(answers[currentIndex] === null){
    alert("Select an option to continue.");
    return;
  }
  if(currentIndex < questions.length-1){
    currentIndex++;
    loadQuestion(currentIndex);
  } else {
    // finish
    participant.finishedAt = new Date().toISOString();
    computeResults();
    showResults();
  }
});

// ---------------------------
// COMPUTE RESULTS
// ---------------------------
function computeResults(){
  // reset totals
  competencyTotals = { Logic:0, Performance:0, Leadership:0, Innovation:0 };
  oceanTotals = { Openness:0, Conscientiousness:0, Extraversion:0, Agreeableness:0, Neuroticism:0 };

  for(let i=0;i<questions.length;i++){
    const optIndex = answers[i];
    if(optIndex === null) continue; // unanswered
    const weights = questions[i].options[optIndex].w;
    // sum competency weights
    COMPETENCIES.forEach(c=>{
      if(weights[c] !== undefined) competencyTotals[c] += Number(weights[c]);
    });
    // sum OCEAN
    OCEAN.forEach(o=>{
      if(weights[o] !== undefined) oceanTotals[o] += Number(weights[o]);
    });
  }

  // total composite competency score
  const totalCompetencyScore = COMPETENCIES.reduce((acc,c)=>acc + competencyTotals[c], 0);
  // percent (0-100)
  const percent = (totalCompetencyScore / TOTAL_MAX_COMPETENCY_SCORE) * 100;
  participant.scorePercent = +(percent.toFixed(2));
  participant.passed = participant.scorePercent >= PASS_THRESHOLD_PERCENT;
  participant.competencyTotals = competencyTotals;
  participant.oceanTotals = oceanTotals;
  participant.answers = answers.map((a,i)=> ({ questionId: questions[i].id, selected: a, optionText: a===null ? null : questions[i].options[a].text }) );
}

// ---------------------------
// SHOW RESULTS
// ---------------------------
function showResults(){
  testSection.classList.add("hidden");
  resultsSection.classList.remove("hidden");

  resName.textContent = participant.name;
  summaryEl.innerHTML = `<p>Module: ${participant.module} — Score: ${participant.scorePercent}%</p>
                         <p>Started: ${participant.startedAt} — Finished: ${participant.finishedAt}</p>`;

  competenceRender();
  oceanRender();

  passFailEl.textContent = participant.passed ? `PASSED (>= ${PASS_THRESHOLD_PERCENT}%)` : `FAILED (requires ${PASS_THRESHOLD_PERCENT}%)`;
  passFailEl.className = participant.passed ? "pass-fail pass" : "pass-fail fail";

  // store locally (append)
  saveLocalResult(participant);
}

// render lists
function competenceRender(){
  competencyList.innerHTML = "";
  COMPETENCIES.forEach(c=>{
    const li = document.createElement("li");
    const val = competencyTotals[c] || 0;
    const percent = +((val / MAX_SCORE_PER_COMPETENCY) * 100).toFixed(1);
    li.textContent = `${c}: ${val} (${percent}%)`;
    competencyList.appendChild(li);
  });
}

function oceanRender(){
  oceanList.innerHTML = "";
  OCEAN.forEach(o=>{
    const li = document.createElement("li");
    const v = oceanTotals[o] || 0;
    li.textContent = `${o}: ${v}`;
    oceanList.appendChild(li);
  });
}

// ---------------------------
// DOWNLOAD helpers
// ---------------------------
function downloadCSV(){
  // create single-row CSV with meta + competency totals + OCEAN + answers summary
  const header = ["name","email","module","startedAt","finishedAt","scorePercent","passed"];
  COMPETENCIES.forEach(c=> header.push(`C_${c}`));
  OCEAN.forEach(o=> header.push(`O_${o}`));
  // answers as questionId:selectedIndex
  header.push("answers");

  const row = [
    participant.name,
    participant.email,
    participant.module,
    participant.startedAt,
    participant.finishedAt,
    participant.scorePercent,
    participant.passed ? "TRUE":"FALSE"
  ];
  COMPETENCIES.forEach(c=> row.push(competencyTotals[c] || 0));
  OCEAN.forEach(o=> row.push(oceanTotals[o] || 0));
  row.push(participant.answers.map(a=> `${a.questionId}:${a.selected}`).join("|"));

  const csv = `${header.join(",")}\n${row.map(cell => `"${String(cell).replace(/"/g,'""')}"`).join(",")}`;
  downloadBlob(csv, `sienva-result-${participant.name.replace(/\s+/g,'_')}-${Date.now()}.csv`, "text/csv");
}

function downloadJSON(){
  const payload = participant;
  downloadBlob(JSON.stringify(payload,null,2), `sienva-result-${participant.name.replace(/\s+/g,'_')}-${Date.now()}.json`, "application/json");
}

function downloadBlob(content, filename, mime){
  const blob = new Blob([content], {type: mime});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(()=>{ URL.revokeObjectURL(url); a.remove(); }, 500);
}

// ---------------------------
// LOCAL STORAGE (append)
function saveLocalResult(part){
  try {
    const key = "sienva_results_v1";
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.push(part);
    localStorage.setItem(key, JSON.stringify(existing));
  } catch(e){ console.warn("Failed saving local result", e); }
}
// ---------------------------

// restart
restartBtn.addEventListener("click", ()=>{
  // reset
  answers = new Array(questions.length).fill(null);
  competencyTotals = { Logic:0, Performance:0, Leadership:0, Innovation:0 };
  oceanTotals = { Openness:0, Conscientiousness:0, Extraversion:0, Agreeableness:0, Neuroticism:0 };
  participant = { name:"", email:"", module:"", startedAt:null, finishedAt:null, scorePercent:0, passed:false };
  currentIndex = 0;

  // UI
  usernameInput.value = "";
  emailInput.value = "";
  loginSection.classList.remove("hidden");
  resultsSection.classList.add("hidden");
});

// download handlers
downloadCSVBtn.addEventListener("click", downloadCSV);
downloadJSONBtn.addEventListener("click", downloadJSON);

// quick guard: prevent accidental navigation without finishing
window.addEventListener("beforeunload", (e)=>{
  // if started and not finished
  if(participant.startedAt && !participant.finishedAt){
    e.preventDefault();
    e.returnValue = '';
  }
});

/* --------------------------
 OPTIONAL: Firebase storage (UNCOMMENT & configure)
 -----------------------------
 If you want to store results remotely, create a Firebase project, enable Firestore, add web app,
 then replace the following config with yours and uncomment code. This is optional.

 // 1) add Firebase SDK scripts to index.html head:
 // <script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js"></script>
 // <script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-compat.js"></script>

 // 2) configure below & call saveToFirebase(participant) in showResults()

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  // ...
};

// function saveToFirebase(payload){
//   try{
//     firebase.initializeApp(firebaseConfig);
//     const db = firebase.firestore();
//     db.collection("sienva_results").add(payload).then(()=> console.log("saved to firebase")).catch(e=>console.error(e));
//   }catch(e){ console.warn("firebase save error",e); }
//}

*/

