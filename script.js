// Sienva Executive Test - Full implementation with 50 questions, enhanced reporting and improvement plan
// Paste this file exactly as script.js

// --------------------------- CONFIG
const TOTAL_QUESTIONS = 50;
const COMPETENCIES = ["Executive Logic","Leadership Decision-Making","Innovation & Problem Solving","Performance Orientation","Communication & Executive Influence"];
const OCEAN = ["Openness","Conscientiousness","Extraversion","Agreeableness","Emotional Stability"];
const MAX_OPTION_WEIGHT = 5; // weights in questions (0-5)
const MAX_SCORE_PER_COMPETENCY = MAX_OPTION_WEIGHT * TOTAL_QUESTIONS;
const TOTAL_MAX_COMPETENCY_SCORE = MAX_SCORE_PER_COMPETENCY * COMPETENCIES.length;
const PASS_THRESHOLD_PERCENT = 90;

// --------------------------- QUESTIONS ARRAY (50 questions)
// Each option has weights (w) using keys similar to earlier file: Logic, Performance, Leadership, Innovation, Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism
// The getWeightValue mapper will adapt those keys into COMPETENCIES & OCEAN labels.
const questions = [
  { id:1, title:"Unforeseen Market Shift", scenario:"Your primary market abruptly adopts a new technology you haven't invested in. You must decide whether to pivot resources immediately or wait for clear data.",
    options:[
      { text:"Allocate 70% of R&D to adopt the new tech while monitoring competitor response and risk.", w:{Logic:4,Performance:4,Leadership:3,Innovation:3,Executive:4,Openness:4,Conscientiousness:4,Extraversion:3,Agreeableness:3,Neuroticism:1} },
      { text:"Wait 6 months for concrete performance data from early adopters before committing significant capital.", w:{Logic:5,Performance:2,Leadership:1,Innovation:1,Executive:3,Openness:2,Conscientiousness:5,Extraversion:1,Agreeableness:4,Neuroticism:0} },
      { text:"Ignore the shift; continue optimizing the current product, trusting your existing loyal customer base.", w:{Logic:1,Performance:1,Leadership:1,Innovation:0,Executive:0,Openness:0,Conscientiousness:3,Extraversion:1,Agreeableness:2,Neuroticism:2} },
      { text:"Immediately halt all projects and command a full pivot to the new technology, maximizing speed.", w:{Logic:2,Performance:5,Leadership:4,Innovation:4,Executive:2,Openness:5,Conscientiousness:2,Extraversion:5,Agreeableness:1,Neuroticism:3} }
    ]
  },
  { id:2, title:"The Project Crisis", scenario:"You lead a critical project facing a major, unexpected roadblock. The team is demoralized and the deadline is tomorrow.",
    options:[
      { text:"Call an urgent 15-minute huddle. Ask the team for their immediate and best proposed solutions, facilitate a quick decision, and delegate execution immediately.", w:{Logic:3,Performance:5,Leadership:5,Innovation:3,Executive:5,Openness:3,Conscientiousness:5,Extraversion:4,Agreeableness:3,Neuroticism:0} },
      { text:"Immediately take control, assign specific tasks to team members without debate, and personally oversee the most complex part to ensure compliance.", w:{Logic:1,Performance:3,Leadership:4,Innovation:1,Executive:3,Openness:1,Conscientiousness:4,Extraversion:3,Agreeableness:1,Neuroticism:1} },
      { text:"Postpone the deadline immediately. Inform stakeholders and spend the next hour analyzing the root cause of the roadblock before planning the next steps.", w:{Logic:4,Performance:1,Leadership:2,Innovation:2,Executive:1,Openness:2,Conscientiousness:2,Extraversion:1,Agreeableness:4,Neuroticism:3} },
      { text:"Research external solutions and best practices from competitors before making any internal decisions or disturbing the team's concentration.", w:{Logic:5,Performance:1,Leadership:1,Innovation:4,Executive:2,Openness:5,Conscientiousness:3,Extraversion:1,Agreeableness:2,Neuroticism:2} }
    ]
  },
  { id:3, title:"Conflicting Data Sources", scenario:"Two equally reliable reports show contradictory results regarding customer acquisition ROI. You need a budget decision today.",
    options:[
      { text:"Average the results and proceed with a conservative budget based on the mean.", w:{Logic:2,Performance:2,Leadership:1,Innovation:1,Executive:2,Openness:1,Conscientiousness:3,Extraversion:1,Agreeableness:4,Neuroticism:1} },
      { text:"Quickly identify the underlying assumptions and methodologies of both reports to reconcile the difference before deciding.", w:{Logic:5,Performance:4,Leadership:3,Innovation:3,Executive:5,Openness:4,Conscientiousness:5,Extraversion:2,Agreeableness:2,Neuroticism:0} },
      { text:"Trust the report that supports the strategy you were already leaning toward, as time is running out.", w:{Logic:1,Performance:3,Leadership:2,Innovation:1,Executive:1,Openness:1,Conscientiousness:1,Extraversion:4,Agreeableness:1,Neuroticism:4} },
      { text:"Delay the budget decision and launch a third, external audit to definitively resolve the contradiction.", w:{Logic:4,Performance:1,Leadership:2,Innovation:2,Executive:3,Openness:3,Conscientiousness:4,Extraversion:1,Agreeableness:3,Neuroticism:2} }
    ]
  },
  { id:4, title:"Delegation Dilemma", scenario:"You have a high-stakes task that you know you can do perfectly, but it's an excellent development opportunity for a promising junior manager.",
    options:[
      { text:"Do the task yourself to ensure 100% success, and mentor the junior manager on a less critical, future project.", w:{Logic:3,Performance:4,Leadership:2,Innovation:1,Executive:3,Openness:2,Conscientiousness:5,Extraversion:1,Agreeableness:2,Neuroticism:1} },
      { text:"Delegate the task completely, providing only high-level goals and letting the junior manager learn through independent challenge.", w:{Logic:2,Performance:2,Leadership:4,Innovation:3,Executive:4,Openness:4,Conscientiousness:2,Extraversion:3,Agreeableness:3,Neuroticism:2} },
      { text:"Delegate the task but schedule frequent, detailed check-ins and offer significant resources, prioritizing development over risk mitigation.", w:{Logic:4,Performance:3,Leadership:5,Innovation:4,Executive:5,Openness:5,Conscientiousness:4,Extraversion:4,Agreeableness:5,Neuroticism:0} },
      { text:"Redefine the task into smaller, lower-risk parts, delegating only the parts that pose minimal threat to the overall project.", w:{Logic:5,Performance:1,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:3,Extraversion:1,Agreeableness:2,Neuroticism:1} }
    ]
  },
  { id:5, title:"Ethical Gray Area", scenario:"Your legal team informs you that a new product feature, though technically legal, exploits a loophole that could harm a small segment of vulnerable users.",
    options:[
      { text:"Proceed with the feature, as legal compliance is the standard and the loophole will eventually be closed by regulators.", w:{Logic:3,Performance:4,Leadership:1,Innovation:2,Executive:2,Openness:1,Conscientiousness:1,Extraversion:3,Agreeableness:0,Neuroticism:3} },
      { text:"Immediately halt the feature launch, regardless of the competitive impact, and work to redesign it to eliminate the risk to vulnerable users.", w:{Logic:4,Performance:1,Leadership:5,Innovation:3,Executive:5,Openness:4,Conscientiousness:5,Extraversion:2,Agreeableness:5,Neuroticism:0} },
      { text:"Launch the feature with a stern public disclosure about the loophole, shifting responsibility to the user.", w:{Logic:2,Performance:3,Leadership:2,Innovation:1,Executive:3,Openness:2,Conscientiousness:3,Extraversion:4,Agreeableness:1,Neuroticism:2} },
      { text:"Consult with a specialized ethics board for external guidance before making the final decision.", w:{Logic:5,Performance:2,Leadership:3,Innovation:4,Executive:4,Openness:5,Conscientiousness:4,Extraversion:1,Agreeableness:4,Neuroticism:1} }
    ]
  },
  // ... (we include all questions up to 50) 
  // For brevity in this message I will include all previously prepared questions (6-50) exactly as in the working version you had.
  // The remainder 6..50 are the same as in the earlier working script and include weights for Logic, Performance, Leadership, Innovation, Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism
  // --- BEGIN Remaining questions (6-50) ---
  { id:6, scenario:"Handling a Star Performer", title:"Handling a Star Performer", 
    options:[
      { text:"Meet privately with the employee, clearly stating the behavioral expectations and the negative impact on team morale, offering coaching.", w:{Logic:4,Performance:3,Leadership:5,Innovation:3,Executive:5,Openness:3,Conscientiousness:4,Extraversion:3,Agreeableness:3,Neuroticism:0} },
      { text:"Ignore the behavior, prioritizing their superior output and ensuring their work environment remains comfortable.", w:{Logic:1,Performance:4,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:2,Extraversion:2,Agreeableness:4,Neuroticism:2} },
      { text:"Address the disruption publicly in the meeting to set an immediate example for the rest of the team.", w:{Logic:2,Performance:2,Leadership:3,Innovation:1,Executive:2,Openness:1,Conscientiousness:3,Extraversion:5,Agreeableness:0,Neuroticism:4} },
      { text:"Restructure the team to isolate the star performer, allowing them to work independently.", w:{Logic:3,Performance:1,Leadership:2,Innovation:2,Executive:3,Openness:2,Conscientiousness:5,Extraversion:1,Agreeableness:1,Neuroticism:1} }
    ]
  },
  { id:7, scenario:"Budget Allocation for R&D",
    options:[
      { text:"Allocate 80% to the safe project and 20% to the high-risk initiative for minimal exploratory work.", w:{Logic:4,Performance:3,Leadership:2,Innovation:1,Executive:4,Openness:2,Conscientiousness:5,Extraversion:1,Agreeableness:3,Neuroticism:1} },
      { text:"Fund the revolutionary initiative fully, cutting the safe project, believing 'go big or go home' is necessary for market leadership.", w:{Logic:2,Performance:5,Leadership:4,Innovation:5,Executive:4,Openness:5,Conscientiousness:2,Extraversion:4,Agreeableness:1,Neuroticism:3} },
      { text:"Split the budget 50/50, ensuring both security and a reasonable chance at disruption.", w:{Logic:3,Performance:3,Leadership:3,Innovation:3,Executive:3,Openness:3,Conscientiousness:3,Extraversion:3,Agreeableness:3,Neuroticism:3} },
      { text:"Invest 60% in the revolutionary idea, conditional on the team providing clear, quantifiable 'kill points' to stop investment if progress stalls.", w:{Logic:5,Performance:4,Leadership:5,Innovation:4,Executive:5,Openness:4,Conscientiousness:4,Extraversion:2,Agreeableness:2,Neuroticism:0} }
    ]
  },
  { id:8, scenario:"Managing Fear of Failure",
    options:[
      { text:"Implement a 'Fail Forward' system: publicly reward the *learning* derived from failures and protect the team from blame.", w:{Logic:4,Performance:3,Leadership:5,Innovation:5,Executive:5,Openness:5,Conscientiousness:4,Extraversion:4,Agreeableness:4,Neuroticism:0} },
      { text:"Only approve low-risk, incremental improvements until the team regains its confidence and sense of security.", w:{Logic:2,Performance:2,Leadership:1,Innovation:1,Executive:3,Openness:1,Conscientiousness:5,Extraversion:1,Agreeableness:3,Neuroticism:1} },
      { text:"Bring in a new external team specifically tasked with high-risk innovation, leaving the existing team focused on execution.", w:{Logic:3,Performance:4,Leadership:2,Innovation:4,Executive:3,Openness:4,Conscientiousness:3,Extraversion:2,Agreeableness:2,Neuroticism:1} },
      { text:"Run a company-wide campaign reminding employees that innovation is mandatory for long-term survival.", w:{Logic:1,Performance:1,Leadership:2,Innovation:2,Executive:1,Openness:2,Conscientiousness:1,Extraversion:3,Agreeableness:1,Neuroticism:4} }
    ]
  },
  { id:9, scenario:"The Unpopular Decision",
    options:[
      { text:"Implement the change swiftly and decisively, then focus on post-implementation communication and training.", w:{Logic:4,Performance:5,Leadership:4,Innovation:3,Executive:5,Openness:2,Conscientiousness:5,Extraversion:3,Agreeableness:1,Neuroticism:1} },
      { text:"Conduct a series of one-on-one meetings to personally explain the rationale, seeking specific feedback to mitigate minor concerns before the launch.", w:{Logic:5,Performance:3,Leadership:5,Innovation:4,Executive:4,Openness:4,Conscientiousness:4,Extraversion:2,Agreeableness:4,Neuroticism:0} },
      { text:"Delay the change until a crisis forces the staff to see the need for reorganization.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1,Executive:0,Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:3,Neuroticism:5} },
      { text:"Allow the teams to propose alternative structures, accepting a slightly less optimal but more socially acceptable plan.", w:{Logic:3,Performance:2,Leadership:3,Innovation:2,Executive:2,Openness:3,Conscientiousness:3,Extraversion:3,Agreeableness:5,Neuroticism:1} }
    ]
  },
  { id:10, scenario:"Crisis of Public Trust",
    options:[
      { text:"Issue a highly detailed public report immediately, outlining the root cause, remedial actions, and offering proactive compensation, regardless of cost.", w:{Logic:4,Performance:4,Leadership:5,Innovation:3,Executive:5,Openness:4,Conscientiousness:5,Extraversion:3,Agreeableness:5,Neuroticism:0} },
      { text:"Downplay the breach in the media, emphasizing the minimal financial loss and legal compliance.", w:{Logic:1,Performance:2,Leadership:1,Innovation:1,Executive:2,Openness:1,Conscientiousness:1,Extraversion:2,Agreeableness:0,Neuroticism:4} },
      { text:"Hire a PR firm to manage the narrative and redirect public attention to the company's other positive achievements.", w:{Logic:2,Performance:3,Leadership:2,Innovation:2,Executive:3,Openness:2,Conscientiousness:3,Extraversion:5,Agreeableness:2,Neuroticism:3} },
      { text:"Address the breach internally, focusing 100% on preventing future events before making any public statement.", w:{Logic:5,Performance:1,Leadership:3,Innovation:4,Executive:4,Openness:3,Conscientiousness:4,Extraversion:1,Agreeableness:3,Neuroticism:1} }
    ]
  },
  { id:11, scenario:"Underperforming Veteran",
    options:[
      { text:"Initiate the formal performance improvement process (PIP) immediately, adhering strictly to HR protocol for a clean separation if necessary.", w:{Logic:4,Performance:5,Leadership:3,Innovation:2,Executive:5,Openness:2,Conscientiousness:5,Extraversion:2,Agreeableness:1,Neuroticism:1} },
      { text:"Redefine the veteran's role to a non-performance-critical position, leveraging their institutional knowledge without demanding high output.", w:{Logic:3,Performance:1,Leadership:4,Innovation:1,Executive:3,Openness:3,Conscientiousness:3,Extraversion:1,Agreeableness:5,Neuroticism:1} },
      { text:"Transfer the employee to a new department, hoping a fresh start and different manager will resolve the issue.", w:{Logic:2,Performance:2,Leadership:2,Innovation:2,Executive:1,Openness:3,Conscientiousness:1,Extraversion:4,Agreeableness:4,Neuroticism:2} },
      { text:"Fire the employee immediately to set a clear precedent for performance standards across the company.", w:{Logic:1,Performance:4,Leadership:1,Innovation:1,Executive:2,Openness:1,Conscientiousness:4,Extraversion:3,Agreeableness:0,Neuroticism:4} }
    ]
  },
  { id:12, scenario:"Resource Scarcity",
    options:[
      { text:"Assign the equipment to the team whose project aligns most directly with the company's highest-level strategic goal.", w:{Logic:5,Performance:4,Leadership:4,Innovation:3,Executive:5,Openness:2,Conscientiousness:4,Extraversion:1,Agreeableness:3,Neuroticism:1} },
      { text:"Split time equally between both teams and rotate usage.", w:{Logic:3,Performance:3,Leadership:2,Innovation:2,Executive:3,Openness:2,Conscientiousness:3,Extraversion:1,Agreeableness:3,Neuroticism:2} },
      { text:"Allocate to the team with higher historical ROI.", w:{Logic:4,Performance:5,Leadership:2,Innovation:1,Executive:4,Openness:1,Conscientiousness:4,Extraversion:1,Agreeableness:2,Neuroticism:1} },
      { text:"Postpone one team's project until another vendor is found.", w:{Logic:2,Performance:2,Leadership:1,Innovation:1,Executive:2,Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:2,Neuroticism:3} }
    ]
  },
  { id:13, scenario:"A senior leader resists a cultural shift you champion.",
    options:[
      { text:"Engage them privately, present data and allies.", w:{Logic:4,Performance:3,Leadership:5,Innovation:3,Executive:4,Openness:3,Conscientiousness:4,Extraversion:3,Agreeableness:3,Neuroticism:1} },
      { text:"Bypass them and implement change anyway.", w:{Logic:2,Performance:4,Leadership:2,Innovation:2,Executive:2,Openness:2,Conscientiousness:2,Extraversion:1,Agreeableness:1,Neuroticism:2} },
      { text:"Abandon the change to keep harmony.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:5,Neuroticism:2} },
      { text:"Force decision via executive committee.", w:{Logic:3,Performance:3,Leadership:3,Innovation:2,Executive:3,Openness:2,Conscientiousness:3,Extraversion:2,Agreeableness:1,Neuroticism:1} }
    ]
  },
  { id:14, scenario:"You must cut 10% of budget. Choice?",
    options:[
      { text:"Carefully trim low-impact programs with analytics.", w:{Logic:5,Performance:4,Leadership:3,Innovation:1,Executive:4,Openness:3,Conscientiousness:5,Extraversion:1,Agreeableness:2,Neuroticism:1} },
      { text:"Cut across-the-board evenly.", w:{Logic:2,Performance:3,Leadership:1,Innovation:1,Executive:2,Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:2,Neuroticism:2} },
      { text:"Delay big investments but keep operational spend.", w:{Logic:3,Performance:2,Leadership:2,Innovation:2,Executive:3,Openness:2,Conscientiousness:3,Extraversion:1,Agreeableness:2,Neuroticism:2} },
      { text:"Raise prices to offset cuts.", w:{Logic:4,Performance:5,Leadership:2,Innovation:1,Executive:4,Openness:2,Conscientiousness:3,Extraversion:2,Agreeableness:1,Neuroticism:2} }
    ]
  },
  { id:15, scenario:"A promising idea lacks immediate ROI but could be strategic. You:",
    options:[
      { text:"Fund a small experiment and measure outcomes.", w:{Logic:4,Performance:3,Leadership:3,Innovation:5,Executive:4,Openness:5,Conscientiousness:3,Extraversion:2,Agreeableness:3,Neuroticism:1} },
      { text:"Reject due to short-term constraints.", w:{Logic:2,Performance:4,Leadership:1,Innovation:1,Executive:2,Openness:1,Conscientiousness:4,Extraversion:1,Agreeableness:2,Neuroticism:2} },
      { text:"Delay until more data appears.", w:{Logic:3,Performance:2,Leadership:2,Innovation:2,Executive:3,Openness:2,Conscientiousness:3,Extraversion:1,Agreeableness:2,Neuroticism:2} },
      { text:"Fully back it with a big budget.", w:{Logic:1,Performance:5,Leadership:4,Innovation:4,Executive:4,Openness:4,Conscientiousness:2,Extraversion:3,Agreeableness:2,Neuroticism:1} }
    ]
  },
  { id:16, scenario:"An internal tool slows teams. Action?",
    options:[
      { text:"Prioritize tool rewrite with cross-team input.", w:{Logic:4,Performance:4,Leadership:3,Innovation:3,Executive:3,Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:1} },
      { text:"Patch it with quick fixes.", w:{Logic:3,Performance:3,Leadership:2,Innovation:2,Executive:2,Openness:2,Conscientiousness:3,Extraversion:1,Agreeableness:2,Neuroticism:2} },
      { text:"Remove the tool and use manual workarounds.", w:{Logic:2,Performance:1,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:2,Neuroticism:3} },
      { text:"Hire consultants to audit and propose plan.", w:{Logic:4,Performance:3,Leadership:2,Innovation:2,Executive:2,Openness:3,Conscientiousness:3,Extraversion:2,Agreeableness:2,Neuroticism:1} }
    ]
  },
  { id:17, scenario:"Key vendor shows poor reliability. Choose:",
    options:[
      { text:"Find alternatives and prepare migration plan.", w:{Logic:5,Performance:4,Leadership:3,Innovation:2,Executive:3,Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:2,Neuroticism:1} },
      { text:"Renegotiate terms and hope for improvement.", w:{Logic:3,Performance:3,Leadership:2,Innovation:1,Executive:2,Openness:2,Conscientiousness:3,Extraversion:2,Agreeableness:3,Neuroticism:2} },
      { text:"Ignore shortfalls due to switching cost.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:3,Neuroticism:3} },
      { text:"Bring vendor onsite to jointly fix issues.", w:{Logic:4,Performance:3,Leadership:3,Innovation:2,Executive:3,Openness:3,Conscientiousness:3,Extraversion:3,Agreeableness:3,Neuroticism:1} }
    ]
  },
  { id:18, scenario:"Your team proposes a risky acquisition. You:",
    options:[
      { text:"Run rigorous due diligence and stress tests.", w:{Logic:5,Performance:4,Leadership:4,Innovation:2,Executive:3,Openness:3,Conscientiousness:5,Extraversion:2,Agreeableness:2,Neuroticism:1} },
      { text:"Approve quickly to seize market momentum.", w:{Logic:2,Performance:5,Leadership:3,Innovation:4,Executive:4,Openness:4,Conscientiousness:2,Extraversion:3,Agreeableness:2,Neuroticism:2} },
      { text:"Reject due to integration risk.", w:{Logic:3,Performance:2,Leadership:2,Innovation:1,Executive:1,Openness:1,Conscientiousness:3,Extraversion:1,Agreeableness:2,Neuroticism:2} },
      { text:"Partner instead of acquiring.", w:{Logic:4,Performance:3,Leadership:3,Innovation:3,Executive:3,Openness:4,Conscientiousness:3,Extraversion:3,Agreeableness:3,Neuroticism:1} }
    ]
  },
  { id:19, scenario:"A regulatory change affects your product roadmap. You:",
    options:[
      { text:"Adjust roadmap and communicate tradeoffs.", w:{Logic:4,Performance:3,Leadership:3,Innovation:2,Executive:3,Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:2,Neuroticism:1} },
      { text:"Ignore and continue until forced to change.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:1,Neuroticism:3} },
      { text:"Pivot product focus immediately.", w:{Logic:3,Performance:4,Leadership:3,Innovation:3,Executive:3,Openness:4,Conscientiousness:2,Extraversion:2,Agreeableness:2,Neuroticism:1} },
      { text:"Engage stakeholders to lobby for exemptions.", w:{Logic:3,Performance:2,Leadership:3,Innovation:1,Executive:2,Openness:2,Conscientiousness:3,Extraversion:4,Agreeableness:2,Neuroticism:2} }
    ]
  },
  { id:20, scenario:"Your team requires deeper skills. Best approach?",
    options:[
      { text:"Invest in targeted training and mentors.", w:{Logic:4,Performance:4,Leadership:4,Innovation:2,Executive:4,Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:1} },
      { text:"Hire externally for speed.", w:{Logic:3,Performance:5,Leadership:3,Innovation:2,Executive:3,Openness:3,Conscientiousness:3,Extraversion:3,Agreeableness:2,Neuroticism:2} },
      { text:"Outsource tasks entirely.", w:{Logic:2,Performance:2,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:2,Neuroticism:2} },
      { text:"Do nothing and accept lower quality.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:1,Neuroticism:4} }
    ]
  },
  { id:21, scenario:"A product defect reaches a major client. You:",
    options:[
      { text:"Own the mistake, fix quickly and compensate.", w:{Logic:4,Performance:4,Leadership:5,Innovation:1,Executive:4,Openness:3,Conscientiousness:5,Extraversion:2,Agreeableness:4,Neuroticism:1} },
      { text:"Minimize publicly and silently fix.", w:{Logic:2,Performance:3,Leadership:2,Innovation:1,Executive:2,Openness:1,Conscientiousness:3,Extraversion:1,Agreeableness:1,Neuroticism:3} },
      { text:"Delay response until more info is available.", w:{Logic:3,Performance:2,Leadership:2,Innovation:1,Executive:2,Openness:2,Conscientiousness:2,Extraversion:1,Agreeableness:2,Neuroticism:2} },
      { text:"Blame vendor and push responsibility.", w:{Logic:1,Performance:2,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:2,Extraversion:2,Agreeableness:1,Neuroticism:3} }
    ]
  },
  { id:22, scenario:"You must decide between two leaders for promotion. You:",
    options:[
      { text:"Use structured data and interviews to decide.", w:{Logic:5,Performance:4,Leadership:5,Innovation:2,Executive:4,Openness:3,Conscientiousness:5,Extraversion:2,Agreeableness:3,Neuroticism:0} },
      { text:"Pick the one you’re closer to personally.", w:{Logic:1,Performance:2,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:2,Extraversion:2,Agreeableness:4,Neuroticism:3} },
      { text:"Rotate the role as experiment.", w:{Logic:3,Performance:3,Leadership:3,Innovation:3,Executive:3,Openness:4,Conscientiousness:3,Extraversion:3,Agreeableness:3,Neuroticism:1} },
      { text:"Ask external consultant to recommend.", w:{Logic:4,Performance:3,Leadership:3,Innovation:2,Executive:3,Openness:3,Conscientiousness:3,Extraversion:1,Agreeableness:2,Neuroticism:1} }
    ]
  },
  { id:23, scenario:"Team morale dips after layoffs. You:",
    options:[
      { text:"Hold open forums and transparent Q&A.", w:{Logic:4,Performance:3,Leadership:5,Innovation:1,Executive:4,Openness:4,Conscientiousness:4,Extraversion:3,Agreeableness:4,Neuroticism:1} },
      { text:"Keep communications minimal to avoid panic.", w:{Logic:2,Performance:2,Leadership:1,Innovation:1,Executive:2,Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:1,Neuroticism:3} },
      { text:"Offer benefits and time off to those affected.", w:{Logic:3,Performance:2,Leadership:3,Innovation:1,Executive:3,Openness:2,Conscientiousness:3,Extraversion:2,Agreeableness:4,Neuroticism:1} },
      { text:"Ignore and focus on business metrics.", w:{Logic:1,Performance:4,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:1,Neuroticism:3} }
    ]
  },
  { id:24, scenario:"A breakthrough tech could obsolete your core product. You:",
    options:[
      { text:"Invest in a research arm to explore it.", w:{Logic:4,Performance:3,Leadership:4,Innovation:5,Executive:4,Openness:5,Conscientiousness:3,Extraversion:2,Agreeableness:2,Neuroticism:1} },
      { text:"Ignore and defend existing market.", w:{Logic:2,Performance:2,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:3,Extraversion:1,Agreeableness:2,Neuroticism:3} },
      { text:"Partner with startups developing it.", w:{Logic:3,Performance:3,Leadership:3,Innovation:4,Executive:3,Openness:4,Conscientiousness:3,Extraversion:3,Agreeableness:3,Neuroticism:1} },
      { text:"License technology and adapt product.", w:{Logic:4,Performance:4,Leadership:3,Innovation:3,Executive:3,Openness:4,Conscientiousness:3,Extraversion:2,Agreeableness:2,Neuroticism:1} }
    ]
  },
  { id:25, scenario:"You notice bias in hiring patterns. You:",
    options:[
      { text:"Audit process and implement blind screening.", w:{Logic:5,Performance:3,Leadership:4,Innovation:2,Executive:3,Openness:4,Conscientiousness:5,Extraversion:1,Agreeableness:3,Neuroticism:1} },
      { text:"Ignore; current hires perform well.", w:{Logic:1,Performance:2,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:2,Neuroticism:3} },
      { text:"Train hiring managers and adjust metrics.", w:{Logic:4,Performance:3,Leadership:3,Innovation:2,Executive:3,Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:1} },
      { text:"Outsource hiring to third party.", w:{Logic:3,Performance:3,Leadership:2,Innovation:1,Executive:2,Openness:2,Conscientiousness:3,Extraversion:2,Agreeableness:2,Neuroticism:2} }
    ]
  },
  { id:26, scenario:"Customer feedback contradicts executive view. You:",
    options:[
      { text:"Prioritize direct customer research and adjust strategy.", w:{Logic:5,Performance:4,Leadership:4,Innovation:3,Executive:4,Openness:4,Conscientiousness:4,Extraversion:3,Agreeableness:3,Neuroticism:1} },
      { text:"Favor executive judgment and continue.", w:{Logic:2,Performance:2,Leadership:2,Innovation:1,Executive:2,Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:2,Neuroticism:3} },
      { text:"Run A/B tests to reconcile differences.", w:{Logic:4,Performance:4,Leadership:3,Innovation:3,Executive:3,Openness:4,Conscientiousness:4,Extraversion:2,Agreeableness:2,Neuroticism:1} },
      { text:"Ignore feedback as noise.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:1,Neuroticism:4} }
    ]
  },
  { id:27, scenario:"A technology vendor offers a risky but enticing roadmap. You:",
    options:[
      { text:"Negotiate clear SLAs and pilot first.", w:{Logic:4,Performance:3,Leadership:3,Innovation:3,Executive:3,Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:2,Neuroticism:1} },
      { text:"Trust vendor and sign long contract.", w:{Logic:2,Performance:4,Leadership:2,Innovation:3,Executive:3,Openness:3,Conscientiousness:2,Extraversion:3,Agreeableness:3,Neuroticism:2} },
      { text:"Avoid vendor due to risk.", w:{Logic:3,Performance:2,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:3,Extraversion:1,Agreeableness:1,Neuroticism:2} },
      { text:"Build in-house alternative over time.", w:{Logic:4,Performance:3,Leadership:3,Innovation:4,Executive:3,Openness:4,Conscientiousness:3,Extraversion:2,Agreeableness:2,Neuroticism:1} }
    ]
  },
  { id:28, scenario:"Your product's UX causes high drop-off. Reaction?",
    options:[
      { text:"Fund rapid UX improvements and test.", w:{Logic:4,Performance:4,Leadership:3,Innovation:4,Executive:3,Openness:4,Conscientiousness:3,Extraversion:2,Agreeableness:2,Neuroticism:1} },
      { text:"Focus on features instead; UX later.", w:{Logic:2,Performance:3,Leadership:1,Innovation:2,Executive:2,Openness:2,Conscientiousness:2,Extraversion:1,Agreeableness:2,Neuroticism:2} },
      { text:"Hire UX agency to redesign.", w:{Logic:3,Performance:3,Leadership:2,Innovation:3,Executive:2,Openness:3,Conscientiousness:2,Extraversion:2,Agreeableness:2,Neuroticism:1} },
      { text:"Accept drop-off as inevitable.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:1,Neuroticism:3} }
    ]
  },
  { id:29, scenario:"A remote office wants autonomy that could fragment brand. You:",
    options:[
      { text:"Create clear guardrails and local freedom within them.", w:{Logic:4,Performance:3,Leadership:4,Innovation:2,Executive:3,Openness:3,Conscientiousness:4,Extraversion:3,Agreeableness:3,Neuroticism:1} },
      { text:"Centralize control immediately.", w:{Logic:3,Performance:4,Leadership:2,Innovation:1,Executive:2,Openness:1,Conscientiousness:4,Extraversion:1,Agreeableness:1,Neuroticism:2} },
      { text:"Allow full autonomy to encourage innovation.", w:{Logic:2,Performance:2,Leadership:3,Innovation:4,Executive:2,Openness:5,Conscientiousness:2,Extraversion:3,Agreeableness:3,Neuroticism:1} },
      { text:"Close the remote office.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:1,Neuroticism:4} }
    ]
  },
  { id:30, scenario:"Your competitor offers free trials that attract users. You:",
    options:[
      { text:"Offer limited trials and focus on retention.", w:{Logic:4,Performance:4,Leadership:3,Innovation:3,Executive:3,Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:1} },
      { text:"Match free trials and spend heavily on acquisition.", w:{Logic:2,Performance:5,Leadership:2,Innovation:2,Executive:2,Openness:2,Conscientiousness:2,Extraversion:3,Agreeableness:2,Neuroticism:2} },
      { text:"Differentiate with premium features instead.", w:{Logic:3,Performance:3,Leadership:3,Innovation:4,Executive:3,Openness:4,Conscientiousness:3,Extraversion:2,Agreeableness:2,Neuroticism:1} },
      { text:"Ignore competitor and focus on existing base.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:1,Neuroticism:3} }
    ]
  },
  { id:31, scenario:"Remote work productivity seems lower for some teams. You:",
    options:[
      { text:"Measure outputs and adjust expectations per team.", w:{Logic:4,Performance:4,Leadership:3,Innovation:2,Executive:3,Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:1} },
      { text:"Mandate return to office for those teams.", w:{Logic:2,Performance:3,Leadership:2,Innovation:1,Executive:2,Openness:1,Conscientiousness:3,Extraversion:2,Agreeableness:1,Neuroticism:2} },
      { text:"Offer remote productivity training and support.", w:{Logic:3,Performance:3,Leadership:3,Innovation:2,Executive:3,Openness:3,Conscientiousness:3,Extraversion:2,Agreeableness:3,Neuroticism:1} },
      { text:"Accept variance and move on.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:2,Neuroticism:3} }
    ]
  },
  { id:32, scenario:"You must choose between two product visions: safe or bold. You:",
    options:[
      { text:"Split roadmap to pursue both in stages.", w:{Logic:4,Performance:3,Leadership:3,Innovation:4,Executive:4,Openness:4,Conscientiousness:3,Extraversion:2,Agreeableness:2,Neuroticism:1} },
      { text:"Pick safe to protect revenue.", w:{Logic:3,Performance:4,Leadership:2,Innovation:1,Executive:3,Openness:2,Conscientiousness:4,Extraversion:1,Agreeableness:2,Neuroticism:2} },
      { text:"Go bold to capture market differentiation.", w:{Logic:2,Performance:3,Leadership:3,Innovation:5,Executive:3,Openness:5,Conscientiousness:2,Extraversion:3,Agreeableness:1,Neuroticism:1} },
      { text:"Survey customers then decide.", w:{Logic:5,Performance:3,Leadership:2,Innovation:3,Executive:3,Openness:4,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:0} }
    ]
  },
  { id:33, scenario:"Leadership styles clash in an acquisition integration. You:",
    options:[
      { text:"Define shared principles and clear decision rights.", w:{Logic:5,Performance:4,Leadership:5,Innovation:2,Executive:4,Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:1} },
      { text:"Let each team operate independently forever.", w:{Logic:1,Performance:2,Leadership:1,Innovation:2,Executive:1,Openness:2,Conscientiousness:1,Extraversion:2,Agreeableness:3,Neuroticism:3} },
      { text:"Replace leaders who block integration.", w:{Logic:3,Performance:4,Leadership:2,Innovation:1,Executive:3,Openness:1,Conscientiousness:3,Extraversion:2,Agreeableness:1,Neuroticism:2} },
      { text:"Use external mediator to build alignment.", w:{Logic:4,Performance:3,Leadership:3,Innovation:2,Executive:3,Openness:3,Conscientiousness:3,Extraversion:3,Agreeableness:3,Neuroticism:1} }
    ]
  },
  { id:34, scenario:"A crucial metric unexpectedly spikes. You:",
    options:[
      { text:"Investigate root cause and validate data.", w:{Logic:5,Performance:4,Leadership:3,Innovation:2,Executive:3,Openness:4,Conscientiousness:5,Extraversion:1,Agreeableness:2,Neuroticism:0} },
      { text:"Celebrate and assume progress.", w:{Logic:1,Performance:3,Leadership:2,Innovation:1,Executive:2,Openness:1,Conscientiousness:2,Extraversion:3,Agreeableness:3,Neuroticism:1} },
      { text:"Pause decisions until you analyze further.", w:{Logic:4,Performance:2,Leadership:2,Innovation:1,Executive:2,Openness:2,Conscientiousness:4,Extraversion:1,Agreeableness:2,Neuroticism:1} },
      { text:"Publish results internally without checks.", w:{Logic:1,Performance:2,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:1,Extraversion:3,Agreeableness:2,Neuroticism:2} }
    ]
  },
  { id:35, scenario:"Your team requests flexible hours but customers require 24/7 coverage. You:",
    options:[
      { text:"Implement staggered shifts to meet both needs.", w:{Logic:4,Performance:4,Leadership:4,Innovation:2,Executive:4,Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:4,Neuroticism:1} },
      { text:"Deny flexibility due to coverage.", w:{Logic:2,Performance:3,Leadership:1,Innovation:1,Executive:2,Openness:1,Conscientiousness:3,Extraversion:1,Agreeableness:1,Neuroticism:2} },
      { text:"Outsource 24/7 ops to vendor.", w:{Logic:3,Performance:3,Leadership:2,Innovation:2,Executive:3,Openness:2,Conscientiousness:3,Extraversion:1,Agreeableness:2,Neuroticism:1} },
      { text:"Offer remote flexible options for part of team.", w:{Logic:3,Performance:3,Leadership:3,Innovation:2,Executive:3,Openness:3,Conscientiousness:3,Extraversion:2,Agreeableness:3,Neuroticism:1} }
    ]
  },
  { id:36, scenario:"A new CEO asks to cut product lines. You:",
    options:[
      { text:"Use data and customer impact to recommend cuts.", w:{Logic:5,Performance:4,Leadership:4,Innovation:1,Executive:4,Openness:3,Conscientiousness:5,Extraversion:2,Agreeableness:2,Neuroticism:1} },
      { text:"Support CEO and cut quickly without analysis.", w:{Logic:2,Performance:5,Leadership:2,Innovation:1,Executive:2,Openness:1,Conscientiousness:2,Extraversion:2,Agreeableness:2,Neuroticism:2} },
      { text:"Resist cuts to protect teams.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:2,Extraversion:2,Agreeableness:4,Neuroticism:3} },
      { text:"Negotiate phased cuts with safeguards.", w:{Logic:4,Performance:3,Leadership:3,Innovation:2,Executive:3,Openness:2,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:1} }
    ]
  },
  { id:37, scenario:"You need a quick technical decision you don't fully understand. You:",
    options:[
      { text:"Consult trusted engineers and make informed call.", w:{Logic:5,Performance:4,Leadership:3,Innovation:2,Executive:3,Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:2,Neuroticism:0} },
      { text:"Decide by instinct to move fast.", w:{Logic:2,Performance:5,Leadership:2,Innovation:3,Executive:2,Openness:3,Conscientiousness:2,Extraversion:3,Agreeableness:2,Neuroticism:1} },
      { text:"Defer decision until you learn more.", w:{Logic:4,Performance:2,Leadership:2,Innovation:1,Executive:2,Openness:2,Conscientiousness:3,Extraversion:1,Agreeableness:2,Neuroticism:1} },
      { text:"Ask external consultant and follow recommendation.", w:{Logic:4,Performance:3,Leadership:2,Innovation:2,Executive:2,Openness:3,Conscientiousness:3,Extraversion:1,Agreeableness:2,Neuroticism:1} }
    ]
  },
  { id:38, scenario:"You plan to expand to a new country with unknown regulation. You:",
    options:[
      { text:"Pilot in a small city and learn quickly.", w:{Logic:4,Performance:4,Leadership:3,Innovation:3,Executive:3,Openness:4,Conscientiousness:3,Extraversion:2,Agreeableness:2,Neuroticism:1} },
      { text:"Launch at scale to gain market share fast.", w:{Logic:2,Performance:5,Leadership:3,Innovation:3,Executive:3,Openness:3,Conscientiousness:2,Extraversion:3,Agreeableness:2,Neuroticism:2} },
      { text:"Partner with local firm to mitigate risk.", w:{Logic:4,Performance:3,Leadership:3,Innovation:2,Executive:3,Openness:3,Conscientiousness:3,Extraversion:3,Agreeableness:3,Neuroticism:1} },
      { text:"Wait until regulations are stable.", w:{Logic:3,Performance:1,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:4,Extraversion:1,Agreeableness:2,Neuroticism:2} }
    ]
  },
  { id:39, scenario:"A major outage exposed insecure customer data. Public trust is falling. You:",
    options:[
      { text:"Full disclosure, remediation plan and compensation.", w:{Logic:5,Performance:4,Leadership:5,Innovation:1,Executive:4,Openness:5,Conscientiousness:5,Extraversion:2,Agreeableness:4,Neuroticism:0} },
      { text:"Minimize communication to control PR.", w:{Logic:1,Performance:2,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:2,Extraversion:3,Agreeableness:1,Neuroticism:3} },
      { text:"Fix quietly and resume normal ops.", w:{Logic:3,Performance:2,Leadership:2,Innovation:1,Executive:2,Openness:2,Conscientiousness:3,Extraversion:1,Agreeableness:1,Neuroticism:2} },
      { text:"Hire external security auditors and announce plan.", w:{Logic:4,Performance:3,Leadership:3,Innovation:2,Executive:3,Openness:4,Conscientiousness:4,Extraversion:2,Agreeableness:2,Neuroticism:1} }
    ]
  },
  { id:40, scenario:"Your retention program works for customers but increases costs. You:",
    options:[
      { text:"Measure lifetime value and justify retention spend.", w:{Logic:5,Performance:4,Leadership:3,Innovation:2,Executive:4,Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:1} },
      { text:"Cut retention to protect short-term margins.", w:{Logic:2,Performance:5,Leadership:2,Innovation:1,Executive:2,Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:1,Neuroticism:3} },
      { text:"Test lower-cost retention tactics.", w:{Logic:4,Performance:3,Leadership:3,Innovation:3,Executive:3,Openness:4,Conscientiousness:3,Extraversion:2,Agreeableness:3,Neuroticism:1} },
      { text:"Keep program unchanged for stability.", w:{Logic:3,Performance:2,Leadership:2,Innovation:1,Executive:2,Openness:2,Conscientiousness:3,Extraversion:1,Agreeableness:3,Neuroticism:2} }
    ]
  },
  { id:41, scenario:"An aggressive new entrant undercuts price. You:",
    options:[
      { text:"Differentiate with service and quality rather than price.", w:{Logic:5,Performance:3,Leadership:4,Innovation:3,Executive:4,Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:1} },
      { text:"Engage in price war to defend market share.", w:{Logic:2,Performance:5,Leadership:2,Innovation:1,Executive:3,Openness:1,Conscientiousness:2,Extraversion:3,Agreeableness:1,Neuroticism:2} },
      { text:"Seek strategic partnerships to expand value.", w:{Logic:4,Performance:3,Leadership:3,Innovation:2,Executive:3,Openness:3,Conscientiousness:3,Extraversion:3,Agreeableness:3,Neuroticism:1} },
      { text:"Exit that market segment.", w:{Logic:2,Performance:1,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:1,Neuroticism:3} }
    ]
  },
  { id:42, scenario:"You find a top performer is taking shortcuts with data quality to meet KPIs. You:",
    options:[
      { text:"Address behavior, retrain and adjust KPIs.", w:{Logic:5,Performance:4,Leadership:4,Innovation:1,Executive:4,Openness:3,Conscientiousness:5,Extraversion:2,Agreeableness:2,Neuroticism:1} },
      { text:"Ignore because metrics remain high.", w:{Logic:1,Performance:5,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:1,Extraversion:2,Agreeableness:1,Neuroticism:3} },
      { text:"Fire the employee immediately.", w:{Logic:3,Performance:3,Leadership:2,Innovation:1,Executive:3,Openness:1,Conscientiousness:4,Extraversion:1,Agreeableness:1,Neuroticism:2} },
      { text:"Reassign them to non-data role.", w:{Logic:2,Performance:2,Leadership:1,Innovation:1,Executive:2,Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:2,Neuroticism:2} }
    ]
  },
  { id:43, scenario:"A long-term vendor proposes better terms for loyalty. You:",
    options:[
      { text:"Negotiate improved terms while keeping contingency plans.", w:{Logic:4,Performance:4,Leadership:3,Innovation:2,Executive:3,Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:1} },
      { text:"Switch to a cheaper vendor immediately.", w:{Logic:2,Performance:4,Leadership:2,Innovation:1,Executive:2,Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:1,Neuroticism:2} },
      { text:"Keep existing contract out of loyalty.", w:{Logic:1,Performance:2,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:4,Neuroticism:2} },
      { text:"Open bidding to test market price.", w:{Logic:3,Performance:3,Leadership:3,Innovation:2,Executive:3,Openness:2,Conscientiousness:3,Extraversion:2,Agreeableness:2,Neuroticism:1} }
    ]
  },
  { id:44, scenario:"Your product requires compliance training for users; low uptake expected. You:",
    options:[
      { text:"Make training brief and incentivize completion.", w:{Logic:4,Performance:3,Leadership:3,Innovation:2,Executive:3,Openness:3,Conscientiousness:3,Extraversion:3,Agreeableness:3,Neuroticism:1} },
      { text:"Make training mandatory without incentives.", w:{Logic:2,Performance:4,Leadership:2,Innovation:1,Executive:2,Openness:1,Conscientiousness:4,Extraversion:1,Agreeableness:1,Neuroticism:2} },
      { text:"Offer optional deep-dive resources instead.", w:{Logic:3,Performance:2,Leadership:1,Innovation:2,Executive:2,Openness:3,Conscientiousness:2,Extraversion:2,Agreeableness:2,Neuroticism:1} },
      { text:"Ignore training and risk non-compliance.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:1,Neuroticism:4} }
    ]
  },
  { id:45, scenario:"Your analytics team offers a new predictive model reducing costs. You:",
    options:[
      { text:"Pilot and validate model before release.", w:{Logic:5,Performance:4,Leadership:3,Innovation:4,Executive:4,Openness:4,Conscientiousness:4,Extraversion:1,Agreeableness:2,Neuroticism:0} },
      { text:"Deploy immediately to capture savings.", w:{Logic:2,Performance:5,Leadership:2,Innovation:3,Executive:3,Openness:3,Conscientiousness:2,Extraversion:2,Agreeableness:2,Neuroticism:1} },
      { text:"Delay until further review.", w:{Logic:3,Performance:2,Leadership:2,Innovation:1,Executive:2,Openness:2,Conscientiousness:3,Extraversion:1,Agreeableness:2,Neuroticism:1} },
      { text:"Ignore due to trust concerns.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:1,Neuroticism:3} }
    ]
  },
  { id:46, scenario:"Two teams claim credit for same success. You:",
    options:[
      { text:"Recognize both and clarify roles for next time.", w:{Logic:4,Performance:3,Leadership:4,Innovation:2,Executive:3,Openness:3,Conscientiousness:3,Extraversion:3,Agreeableness:4,Neuroticism:1} },
      { text:"Give credit to the larger team.", w:{Logic:2,Performance:2,Leadership:1,Innovation:1,Executive:2,Openness:1,Conscientiousness:2,Extraversion:2,Agreeableness:2,Neuroticism:2} },
      { text:"Pick one team and make example.", w:{Logic:1,Performance:3,Leadership:2,Innovation:1,Executive:2,Openness:1,Conscientiousness:2,Extraversion:2,Agreeableness:1,Neuroticism:2} },
      { text:"Ignore and leave ambiguous.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:1,Neuroticism:3} }
    ]
  },
  { id:47, scenario:"A promising vendor requests exclusive terms. You:",
    options:[
      { text:"Negotiate non-exclusive pilot and data share.", w:{Logic:4,Performance:3,Leadership:3,Innovation:3,Executive:3,Openness:3,Conscientiousness:3,Extraversion:2,Agreeableness:2,Neuroticism:1} },
      { text:"Accept exclusivity to secure advantage.", w:{Logic:2,Performance:4,Leadership:2,Innovation:3,Executive:3,Openness:2,Conscientiousness:2,Extraversion:3,Agreeableness:2,Neuroticism:2} },
      { text:"Reject exclusivity to preserve options.", w:{Logic:3,Performance:2,Leadership:2,Innovation:1,Executive:2,Openness:2,Conscientiousness:3,Extraversion:1,Agreeableness:1,Neuroticism:1} },
      { text:"Delay and evaluate further vendors.", w:{Logic:4,Performance:3,Leadership:2,Innovation:2,Executive:3,Openness:3,Conscientiousness:3,Extraversion:1,Agreeableness:2,Neuroticism:1} }
    ]
  },
  { id:48, scenario:"Board asks for faster growth but you lack resources. You:",
    options:[
      { text:"Propose realistic phased growth with KPIs.", w:{Logic:5,Performance:4,Leadership:4,Innovation:2,Executive:4,Openness:3,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:1} },
      { text:"Promise growth and scramble resources.", w:{Logic:2,Performance:5,Leadership:2,Innovation:2,Executive:3,Openness:2,Conscientiousness:2,Extraversion:3,Agreeableness:2,Neuroticism:2} },
      { text:"Refuse and defend current plan.", w:{Logic:3,Performance:2,Leadership:1,Innovation:1,Executive:2,Openness:1,Conscientiousness:3,Extraversion:1,Agreeableness:1,Neuroticism:2} },
      { text:"Seek mergers to accelerate growth.", w:{Logic:4,Performance:3,Leadership:3,Innovation:3,Executive:4,Openness:3,Conscientiousness:3,Extraversion:3,Agreeableness:2,Neuroticism:1} }
    ]
  },
  { id:49, scenario:"A public leader criticizes your company. You:",
    options:[
      { text:"Respond factually, propose conversation.", w:{Logic:4,Performance:3,Leadership:4,Innovation:1,Executive:3,Openness:3,Conscientiousness:3,Extraversion:2,Agreeableness:3,Neuroticism:1} },
      { text:"Ignore to avoid fueling controversy.", w:{Logic:2,Performance:2,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:2,Extraversion:1,Agreeableness:1,Neuroticism:2} },
      { text:"Defend aggressively in public.", w:{Logic:1,Performance:2,Leadership:2,Innovation:1,Executive:2,Openness:1,Conscientiousness:2,Extraversion:4,Agreeableness:1,Neuroticism:3} },
      { text:"Engage neutral third party to mediate.", w:{Logic:4,Performance:2,Leadership:3,Innovation:1,Executive:3,Openness:2,Conscientiousness:3,Extraversion:2,Agreeableness:3,Neuroticism:1} }
    ]
  },
  { id:50, scenario:"Your leadership team lacks diversity of thought. You:",
    options:[
      { text:"Intentionally recruit diverse perspectives and measure impact.", w:{Logic:5,Performance:3,Leadership:5,Innovation:4,Executive:5,Openness:5,Conscientiousness:4,Extraversion:2,Agreeableness:3,Neuroticism:0} },
      { text:"Keep current team because they deliver.", w:{Logic:2,Performance:4,Leadership:2,Innovation:1,Executive:2,Openness:1,Conscientiousness:3,Extraversion:1,Agreeableness:2,Neuroticism:2} },
      { text:"Rotate external advisors to add viewpoints.", w:{Logic:4,Performance:3,Leadership:3,Innovation:3,Executive:3,Openness:4,Conscientiousness:3,Extraversion:3,Agreeableness:3,Neuroticism:1} },
      { text:"Ignore diversity concerns for now.", w:{Logic:1,Performance:1,Leadership:1,Innovation:1,Executive:1,Openness:1,Conscientiousness:1,Extraversion:1,Agreeableness:1,Neuroticism:4} }
    ]
  }
]; // end questions array

// --------------------------- UI references
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
const overallPercentEl = document.getElementById("overall-percent");
const overallMeaningEl = document.getElementById("overall-meaning");
const competencyList = document.getElementById("competency-list");
const oceanList = document.getElementById("ocean-list");
const strengthsEl = document.getElementById("strengths");
const opportunitiesEl = document.getElementById("opportunities");
const coachingNoteEl = document.getElementById("coaching-note");
const planShortEl = document.getElementById("plan-short");
const planMediumEl = document.getElementById("plan-medium");
const planLongEl = document.getElementById("plan-long");

const downloadCSVBtn = document.getElementById("download-csv");
const downloadJSONBtn = document.getElementById("download-json");
const restartBtn = document.getElementById("restart-button");

// --------------------------- STATE
let currentIndex = 0;
let answers = new Array(questions.length).fill(null);
let participant = { name:"", email:"", module:"", startedAt:null, finishedAt:null, scorePercent:0, passed:false, competencyPercent:{} , oceanPercent:{} };

// show/hide helpers
function show(el){ el.classList.remove("hidden"); }
function hide(el){ el.classList.add("hidden"); }

// helper: map many weight key variants to our labels
function getWeightValue(weightsObj, keyLabel){
  if(!weightsObj) return 0;
  if(weightsObj[keyLabel] !== undefined) return Number(weightsObj[keyLabel]);
  // small mapping table
  const map = {
    "Executive Logic":["Logic","Executive","ExecutiveLogic","Executive Logic"],
    "Leadership Decision-Making":["Leadership","LeadershipDecisionMaking","Leadership Decision-Making"],
    "Innovation & Problem Solving":["Innovation","InnovationProblemSolving","Innovation & Problem Solving","Innovation & Problem Solving"],
    "Performance Orientation":["Performance","PerformanceOrientation","Performance Orientation"],
    "Communication & Executive Influence":["Communication","CommunicationInfluence","Communication & Executive Influence","Communication & Executive Influence"],
    "Openness":["Openness"],
    "Conscientiousness":["Conscientiousness"],
    "Extraversion":["Extraversion"],
    "Agreeableness":["Agreeableness"],
    "Emotional Stability":["Neuroticism","EmotionalStability","Emotional Stability"]
  };
  const cand = map[keyLabel] || [];
  for(const k of cand){
    if(weightsObj[k] !== undefined) return Number(weightsObj[k]);
  }
  // last attempt: find prop with similar words
  const tokens = keyLabel.toLowerCase().split(/\W+/).filter(Boolean);
  for(const prop in weightsObj){
    const pname = prop.toLowerCase();
    if(tokens.every(t => pname.includes(t) || pname.includes(t.replace("&","")))) return Number(weightsObj[prop]);
  }
  return 0;
}

// --------------------------- START FLOW
qTotalEl.textContent = questions.length;

startBtn.addEventListener("click", ()=>{
  const name = usernameInput.value.trim();
  const email = emailInput.value.trim();
  if(!name || !email){ alert("Please enter name and email to begin."); return; }
  participant.name = name; participant.email = email;
  participant.module = moduleSelect.value;
  participant.startedAt = new Date().toISOString();

  loginSection.classList.add("hidden");
  testSection.classList.remove("hidden");
  currentIndex = 0;
  loadQuestion(currentIndex);
});

// --------------------------- RENDER QUESTION
function loadQuestion(index){
  const q = questions[index];
  qIndexEl.textContent = index+1;
  scenarioTitleEl.textContent = `Scenario ${q.id}`;
  scenarioTextEl.textContent = q.scenario || q.title || "";
  optionsContainer.innerHTML = "";
  nextButton.disabled = true;

  q.options.forEach((opt, idx)=>{
    const div = document.createElement("div");
    div.className = "option";
    div.dataset.idx = idx;
    div.innerHTML = `<div class="opt-text">${opt.text}</div>`;
    if(answers[index] === idx) div.classList.add("selected");
    div.addEventListener("click", ()=>{
      document.querySelectorAll("#options-container .option").forEach(o=>o.classList.remove("selected"));
      div.classList.add("selected");
      answers[index] = idx;
      nextButton.disabled = false;
    });
    optionsContainer.appendChild(div);
  });

  prevButton.disabled = (index === 0);
}

// NAV
prevButton.addEventListener("click", ()=>{
  if(currentIndex>0){ currentIndex--; loadQuestion(currentIndex); }
});
nextButton.addEventListener("click", ()=>{
  if(answers[currentIndex] === null){ alert("Select an option to continue."); return; }
  if(currentIndex < questions.length - 1){ currentIndex++; loadQuestion(currentIndex); }
  else { participant.finishedAt = new Date().toISOString(); computeResults(); showResults(); }
});

// --------------------------- COMPUTE RESULTS
function computeResults(){
  const competencyTotals = {}; COMPETENCIES.forEach(c=>competencyTotals[c]=0);
  const oceanTotals = {}; OCEAN.forEach(o=>oceanTotals[o]=0);

  for(let i=0;i<questions.length;i++){
    const sel = answers[i];
    if(sel === null) continue;
    const weights = questions[i].options[sel].w || questions[i].options[sel].weights || {};
    // competencies
    COMPETENCIES.forEach(c=>{
      const v = getWeightValue(weights, c);
      competencyTotals[c] += Number(v||0);
    });
    // ocean
    OCEAN.forEach(o=>{
      const v = getWeightValue(weights, o);
      oceanTotals[o] += Number(v||0);
    });
  }

  // convert totals to percentages
  const competencyPercent = {};
  COMPETENCIES.forEach(c=>{
    const p = (competencyTotals[c] / MAX_SCORE_PER_COMPETENCY) * 100;
    competencyPercent[c] = +p.toFixed(1);
  });

  const oceanPercent = {};
  OCEAN.forEach(o=>{
    const p = (oceanTotals[o] / (MAX_OPTION_WEIGHT * questions.length)) * 100;
    oceanPercent[o] = +p.toFixed(1);
  });

  const totalCompScore = COMPETENCIES.reduce((acc,c)=>acc + competencyTotals[c], 0);
  const overallPercent = (totalCompScore / TOTAL_MAX_COMPETENCY_SCORE) * 100;

  participant.scorePercent = +overallPercent.toFixed(1);
  participant.passed = participant.scorePercent >= PASS_THRESHOLD_PERCENT;
  participant.competencyTotals = competencyTotals;
  participant.oceanTotals = oceanTotals;
  participant.competencyPercent = competencyPercent;
  participant.oceanPercent = oceanPercent;
  participant.answers = answers.map((a,i)=> ({ questionId: questions[i].id, selected: a, optionText: a===null?null:questions[i].options[a].text }) );
}

// --------------------------- SHOW RESULTS (friendly + coaching)
function showResults(){
  testSection.classList.add("hidden");
  resultsSection.classList.remove("hidden");

  resName.textContent = participant.name;
  overallPercentEl.textContent = participant.scorePercent + "%";
  overallMeaningEl.textContent = overallMeaning(participant.scorePercent);

  // list competencies
  competencyList.innerHTML = "";
  COMPETENCIES.forEach(c=>{
    const li = document.createElement("li");
    li.textContent = `${c}: ${participant.competencyPercent[c]}% — ${competencyInterpretation(participant.competencyPercent[c])}`;
    competencyList.appendChild(li);
  });

  // list ocean
  oceanList.innerHTML = "";
  OCEAN.forEach(o=>{
    const li = document.createElement("li");
    li.textContent = `${o}: ${participant.oceanPercent[o]}% — ${oceanInterpretation(o, participant.oceanPercent[o])}`;
    oceanList.appendChild(li);
  });

  // strengths & opportunities
  const { strengths, opportunities } = extractInsights();
  strengthsEl.innerHTML = `<h4>Strengths</h4><ul>${strengths.map(s=>`<li>${s}</li>`).join("")}</ul>`;
  opportunitiesEl.innerHTML = `<h4>Opportunities</h4><ul>${opportunities.map(s=>`<li>${s}</li>`).join("")}</ul>`;

  coachingNoteEl.innerHTML = `<p><strong>Friendly note:</strong> Thank you for completing this assessment. The percentage above summarizes how your current decision-style and behaviors align with our executive competency model. Below you will find practical, empathetic guidance designed for immediate action and long-term growth.</p>`;

  generatePlan(participant.competencyPercent, participant.oceanPercent);
  saveLocalResult(participant);
}

// --------------------------- Interpretations
function overallMeaning(percent){
  if(percent >= 95) return "Outstanding executive readiness — you demonstrate exceptional competence across the measured areas.";
  if(percent >= 85) return "Strong executive capability with targeted areas to refine for larger strategic impact.";
  if(percent >= 70) return "Solid foundations and promising strengths. Focused development will lift you into higher readiness.";
  if(percent >= 50) return "Developing executive skills. Consider focused practice and structured feedback cycles.";
  return "Early-stage development — this is an opportunity to build core competencies and habits deliberately.";
}

function competencyInterpretation(p){
  if(p >= 85) return "High — consistent strength.";
  if(p >= 65) return "Moderate — reliable but can be sharpened.";
  if(p >= 45) return "Developing — targeted improvement recommended.";
  return "Needs attention — build foundational habits.";
}

function oceanInterpretation(trait, p){
  if(trait === "Openness"){
    if(p>=70) return "High openness: creative, adaptable.";
    if(p>=45) return "Balanced openness: practical and occasionally inventive.";
    return "Low openness: prefers structure; can benefit from experimentation.";
  }
  if(trait === "Conscientiousness"){
    if(p>=70) return "Highly conscientious: dependable and disciplined.";
    if(p>=45) return "Moderately conscientious: generally reliable.";
    return "Low conscientiousness: focus on routines and follow-through.";
  }
  if(trait === "Extraversion"){
    if(p>=70) return "Outgoing and action-oriented.";
    if(p>=45) return "Comfortable in social settings when needed.";
    return "Reserved; may prefer reflective leadership.";
  }
  if(trait === "Agreeableness"){
    if(p>=70) return "Highly collaborative and team-focused.";
    if(p>=45) return "Balanced collaborator.";
    return "Direct and task-focused; consider empathy cues.";
  }
  if(trait === "Emotional Stability"){
    if(p>=70) return "Emotionally steady under pressure.";
    if(p>=45) return "Generally calm with occasional stress.";
    return "More sensitive to stress; practices for resilience will help.";
  }
  return "";
}

// --------------------------- Extract insights
function extractInsights(){
  const strengths = [];
  const opportunities = [];

  for(const c of COMPETENCIES){
    const p = participant.competencyPercent[c];
    if(p >= 85) strengths.push(`${c}: strong performance (${p}%).`);
    else if(p >= 65) strengths.push(`${c}: reliable ability (${p}%).`);
    else if(p >= 50) opportunities.push(`${c}: developing skill — consider targeted training (${p}%).`);
    else opportunities.push(`${c}: needs focused improvement (${p}%).`);
  }

  for(const o of OCEAN){
    const p = participant.oceanPercent[o];
    if(o === "Emotional Stability" && p < 50){
      opportunities.push(`Emotional Stability: consider stress-management routines (${p}%).`);
    }
    if(o === "Conscientiousness" && p < 50){
      opportunities.push(`Conscientiousness: strengthen task routines and accountability (${p}%).`);
    }
    if(participant.oceanPercent[o] >= 70){
      strengths.push(`${o}: ${oceanInterpretation(o, participant.oceanPercent[o])} (${participant.oceanPercent[o]}%).`);
    }
  }

  return { strengths, opportunities };
}

// --------------------------- Improvement plan
function generatePlan(compPercents, oceanPercents){
  planShortEl.innerHTML = ""; planMediumEl.innerHTML = ""; planLongEl.innerHTML = "";

  const compSorted = Object.entries(compPercents).sort((a,b)=>a[1]-b[1]);
  const weakest = compSorted.slice(0,2).map(x=>x[0]);

  const shortActions = [
    `Schedule two focused 30-min sessions this week to practice scenario decision-making for: ${weakest.join(", ")}.`,
    `Use a simple decision checklist: Goal → Constraints → Risks → Next Steps — follow it for 3 decisions this week.`,
    `Ask a peer/manager for rapid feedback after two real decisions this month.`
  ];
  planShortEl.innerHTML = shortActions.map(i=>`<li>${i}</li>`).join("");

  const mediumActions = [
    `Enroll in a practical 4–8 week course or workshop relevant to ${weakest[0]}.`,
    `Run monthly mini-experiments (design → measure → iterate) to build Innovation & Problem Solving muscles.`,
    `Implement a weekly 30-min planning & reflection session to strengthen Performance Orientation.`
  ];
  planMediumEl.innerHTML = mediumActions.map(i=>`<li>${i}</li>`).join("");

  const longActions = [
    `Work with a mentor or coach for 6–12 months focusing on leadership decision-making and executive presence.`,
    `Lead a cross-functional project each quarter to develop influence, communication and strategic impact.`,
    `Create a personal dashboard (KPIs + reflections) and review monthly to track decisions, outcomes and learning.`
  ];
  planLongEl.innerHTML = longActions.map(i=>`<li>${i}</li>`).join("");
}

// --------------------------- Download CSV/JSON (CSV includes 'passed' boolean)
function downloadCSV(){
  const header = ["name","email","module","startedAt","finishedAt","scorePercent","passed"];
  COMPETENCIES.forEach(c => header.push(`C_${c.replace(/\s+/g,"_")}`));
  OCEAN.forEach(o => header.push(`O_${o.replace(/\s+/g,"_")}`));
  header.push("answers");

  const row = [
    participant.name,
    participant.email,
    participant.module,
    participant.startedAt,
    participant.finishedAt,
    participant.scorePercent,
    participant.passed ? "TRUE" : "FALSE"
  ];
  COMPETENCIES.forEach(c => row.push(participant.competencyPercent[c] || 0));
  OCEAN.forEach(o => row.push(participant.oceanPercent[o] || 0));
  row.push(participant.answers.map(a=> `${a.questionId}:${a.selected}`).join("|"));

  const csv = `${header.join(",")}\n${row.map(cell => `"${String(cell).replace(/"/g,'""')}"`).join(",")}`;
  downloadBlob(csv, `sienva-result-${participant.name.replace(/\s+/g,'_')}-${Date.now()}.csv`, "text/csv");
}

function downloadJSON(){
  downloadBlob(JSON.stringify(participant, null, 2), `sienva-result-${participant.name.replace(/\s+/g,'_')}-${Date.now()}.json`, "application/json");
}

function downloadBlob(content, filename, mime){
  const blob = new Blob([content], {type: mime});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; document.body.appendChild(a); a.click();
  setTimeout(()=>{ URL.revokeObjectURL(url); a.remove(); }, 500);
}

// --------------------------- Local storage append
function saveLocalResult(part){
  try {
    const key = "sienva_results_v1";
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.push(part);
    localStorage.setItem(key, JSON.stringify(existing));
  } catch(e){ console.warn("Failed saving local result", e); }
}

// --------------------------- Restart
restartBtn.addEventListener("click", ()=>{
  answers = new Array(questions.length).fill(null);
  participant = { name:"", email:"", module:"", startedAt:null, finishedAt:null, scorePercent:0, passed:false, competencyPercent:{}, oceanPercent:{} };
  currentIndex = 0;
  usernameInput.value = "";
  emailInput.value = "";
  resultsSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
});

// bind downloads
downloadCSVBtn.addEventListener("click", downloadCSV);
downloadJSONBtn.addEventListener("click", downloadJSON);

// warn before leaving mid-test
window.addEventListener("beforeunload", (e)=>{
  if(participant.startedAt && !participant.finishedAt){ e.preventDefault(); e.returnValue = ''; }
});

/* --------------------------
 Optional: Firebase storage (UNCOMMENT & configure)
 -----------------------------
 If you want to store results remotely, create a Firebase project, enable Firestore, add web app,
 then replace the following config with yours and uncomment code. This is optional.

 // 1) add Firebase SDK scripts to index.html head:
 // <script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js"></script>
 // <script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-compat.js"></script>

 const firebaseConfig = {
   apiKey: "YOUR_API_KEY",
   authDomain: "YOUR_PROJECT.firebaseapp.com",
   projectId: "YOUR_PROJECT_ID",
   // ...
 };

 function saveToFirebase(payload){
   try{
     firebase.initializeApp(firebaseConfig);
     const db = firebase.firestore();
     db.collection("sienva_results").add(payload).then(()=> console.log("saved to firebase")).catch(e=>console.error(e));
   }catch(e){ console.warn("firebase save error",e); }
 }

 // call saveToFirebase(participant) inside showResults() if you enable Firebase
*/
