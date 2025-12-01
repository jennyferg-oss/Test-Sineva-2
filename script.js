// ===========================
// QUESTIONS DATABASE
// ===========================

const questions = [
  {
    id: 1,
    title: "Managing a Resistant Team Member",
    scenario: "You’re leading a new project and one team member resists all changes...",
    options: [
      {
        text: "Schedule a private meeting to understand their concerns.",
        weights: { Logic: 4, Performance: 5, Leadership: 5, Innovation: 1, Executive: 4, Openness: 3, Conscientiousness: 5, Extraversion: 3 }
      },
      {
        text: "Ignore the resistance and move forward quickly.",
        weights: { Logic: 2, Performance: 5, Leadership: 1, Innovation: 2, Executive: 2, Openness: 1, Conscientiousness: 2, Extraversion: 1 }
      },
      {
        text: "Publicly confront the team member during the meeting.",
        weights: { Logic: 1, Performance: 2, Leadership: 1, Innovation: 1, Executive: 1, Openness: 1, Conscientiousness: 1, Extraversion: 4 }
      },
      {
        text: "Ask another colleague to deal with the issue.",
        weights: { Logic: 2, Performance: 3, Leadership: 1, Innovation: 1, Executive: 1, Openness: 1, Conscientiousness: 1, Extraversion: 1 }
      }
    ]
  },

  {
    id: 2,
    title: "Tight Deadline Problem",
    scenario: "Your project deadline was moved up unexpectedly...",
    options: [
      {
        text: "Re-evaluate priorities and redistribute workload.",
        weights: { Logic: 5, Performance: 5, Leadership: 4, Innovation: 2, Executive: 5, Openness: 4, Conscientiousness: 5, Extraversion: 2 }
      },
      {
        text: "Work overtime alone to finish everything.",
        weights: { Logic: 2, Performance: 4, Leadership: 2, Innovation: 1, Executive: 2, Openness: 1, Conscientiousness: 5, Extraversion: 1 }
      },
      {
        text: "Ask your boss for deadline extension immediately.",
        weights: { Logic: 3, Performance: 2, Leadership: 2, Innovation: 1, Executive: 2, Openness: 2, Conscientiousness: 2, Extraversion: 1 }
      },
      {
        text: "Delegate everything regardless of team capacity.",
        weights: { Logic: 1, Performance: 2, Leadership: 1, Innovation: 1, Executive: 1, Openness: 1, Conscientiousness: 1, Extraversion: 3 }
      }
    ]
  },

  {
    id: 3,
    title: "Communication Breakdown",
    scenario: "Multiple misunderstandings are delaying your project...",
    options: [
      {
        text: "Establish clear communication protocols immediately.",
        weights: { Logic: 5, Performance: 4, Leadership: 4, Innovation: 2, Executive: 4, Openness: 3, Conscientiousness: 5, Extraversion: 3 }
      },
      {
        text: "Hold daily check-ins to align tasks and updates.",
        weights: { Logic: 4, Performance: 4, Leadership: 4, Innovation: 1, Executive: 3, Openness: 3, Conscientiousness: 4, Extraversion: 4 }
      },
      {
        text: "Allow team members to resolve issues individually.",
        weights: { Logic: 2, Performance: 3, Leadership: 1, Innovation: 1, Executive: 2, Openness: 2, Conscientiousness: 2, Extraversion: 1 }
      },
      {
        text: "Ignore the breakdown and hope it stabilizes.",
        weights: { Logic: 1, Performance: 1, Leadership: 1, Innovation: 1, Executive: 1, Openness: 1, Conscientiousness: 1, Extraversion: 1 }
      }
    ]
  },

  {
    id: 4,
    title: "Innovation Opportunity",
    scenario: "You discover a new tool that could increase productivity...",
    options: [
      {
        text: "Pilot the tool with a small group before adopting it fully.",
        weights: { Logic: 4, Performance: 4, Leadership: 4, Innovation: 5, Executive: 4, Openness: 5, Conscientiousness: 4, Extraversion: 3 }
      },
      {
        text: "Implement the tool immediately across the entire team.",
        weights: { Logic: 3, Performance: 3, Leadership: 3, Innovation: 5, Executive: 3, Openness: 4, Conscientiousness: 3, Extraversion: 4 }
      },
      {
        text: "Wait until other companies validate its usefulness.",
        weights: { Logic: 2, Performance: 2, Leadership: 2, Innovation: 2, Executive: 2, Openness: 1, Conscientiousness: 3, Extraversion: 1 }
      },
      {
        text: "Ignore the tool and stick with traditional methods.",
        weights: { Logic: 1, Performance: 2, Leadership: 1, Innovation: 1, Executive: 1, Openness: 1, Conscientiousness: 2, Extraversion: 1 }
      }
    ]
  },

  {
    id: 5,
    title: "Conflict Between Coworkers",
    scenario: "Two high-performing colleagues are in conflict...",
    options: [
      {
        text: "Mediate a conversation focusing on shared goals.",
        weights: { Logic: 4, Performance: 5, Leadership: 5, Innovation: 2, Executive: 4, Openness: 3, Conscientiousness: 4, Extraversion: 3 }
      },
      {
        text: "Separate them permanently into different tasks.",
        weights: { Logic: 3, Performance: 3, Leadership: 2, Innovation: 1, Executive: 3, Openness: 2, Conscientiousness: 3, Extraversion: 1 }
      },
      {
        text: "Allow the conflict to continue until it resolves naturally.",
        weights: { Logic: 1, Performance: 1, Leadership: 1, Innovation: 1, Executive: 1, Openness: 1, Conscientiousness: 1, Extraversion: 1 }
      },
      {
        text: "Take sides with the more productive coworker.",
        weights: { Logic: 1, Performance: 3, Leadership: 1, Innovation: 1, Executive: 1, Openness: 1, Conscientiousness: 1, Extraversion: 2 }
      }
    ]
  },

  {
    id: 6,
    title: "Team Motivation Drop",
    scenario: "Your team feels unmotivated after a failed project...",
    options: [
      {
        text: "Hold a meeting to acknowledge the setback and refocus goals.",
        weights: { Logic: 4, Performance: 4, Leadership: 5, Innovation: 1, Executive: 4, Openness: 3, Conscientiousness: 4, Extraversion: 4 }
      },
      {
        text: "Give everyone time off to decompress.",
        weights: { Logic: 2, Performance: 1, Leadership: 2, Innovation: 1, Executive: 1, Openness: 2, Conscientiousness: 2, Extraversion: 1 }
      },
      {
        text: "Ignore the low morale and push harder for results.",
        weights: { Logic: 1, Performance: 2, Leadership: 1, Innovation: 1, Executive: 1, Openness: 1, Conscientiousness: 1, Extraversion: 1 }
      },
      {
        text: "Replace underperforming team members immediately.",
        weights: { Logic: 1, Performance: 3, Leadership: 1, Innovation: 1, Executive: 1, Openness: 1, Conscientiousness: 1, Extraversion: 2 }
      }
    ]
  },

  {
    id: 7,
    title: "Unexpected Crisis",
    scenario: "A critical error threatens the success of your project...",
    options: [
      {
        text: "Assemble the team immediately and create a recovery plan.",
        weights: { Logic: 5, Performance: 5, Leadership: 5, Innovation: 1, Executive: 5, Openness: 3, Conscientiousness: 5, Extraversion: 3 }
      },
      {
        text: "Try to fix the error on your own.",
        weights: { Logic: 3, Performance: 3, Leadership: 2, Innovation: 1, Executive: 2, Openness: 1, Conscientiousness: 4, Extraversion: 1 }
      },
      {
        text: "Report the issue and wait for instructions.",
        weights: { Logic: 3, Performance: 2, Leadership: 1, Innovation: 1, Executive: 2, Openness: 1, Conscientiousness: 2, Extraversion: 1 }
      },
      {
        text: "Blame team members for the error.",
        weights: { Logic: 1, Performance: 1, Leadership: 1, Innovation: 1, Executive: 1, Openness: 1, Conscientiousness: 1, Extraversion: 2 }
      }
    ]
  },

  {
    id: 8,
    title: "High-Value Client Decision",
    scenario: "A major client is requesting a risky customization...",
    options: [
      {
        text: "Analyze risks and present alternatives to the client.",
        weights: { Logic: 5, Performance: 4, Leadership: 4, Innovation: 3, Executive: 5, Openness: 3, Conscientiousness: 5, Extraversion: 3 }
      },
      {
        text: "Approve the customization to keep the client satisfied.",
        weights: { Logic: 2, Performance: 4, Leadership: 2, Innovation: 2, Executive: 2, Openness: 3, Conscientiousness: 2, Extraversion: 3 }
      },
      {
        text: "Reject the request immediately.",
        weights: { Logic: 3, Performance: 2, Leadership: 1, Innovation: 1, Executive: 3, Openness: 1, Conscientiousness: 3, Extraversion: 1 }
      },
      {
        text: "Delay answering the client as long as possible.",
        weights: { Logic: 1, Performance: 1, Leadership: 1, Innovation: 1, Executive: 1, Openness: 1, Conscientiousness: 1, Extraversion: 1 }
      }
    ]
  },

  {
    id: 9,
    title: "Performance Review Challenge",
    scenario: "You must evaluate a long-time employee who has been underperforming...",
    options: [
      {
        text: "Give constructive feedback and set clear performance goals.",
        weights: { Logic: 4, Performance: 5, Leadership: 4, Innovation: 1, Executive: 4, Openness: 3, Conscientiousness: 5, Extraversion: 2 }
      },
      {
        text: "Give a positive review to avoid hurting feelings.",
        weights: { Logic: 1, Performance: 2, Leadership: 1, Innovation: 1, Executive: 1, Openness: 2, Conscientiousness: 1, Extraversion: 2 }
      },
      {
        text: "Recommend termination immediately.",
        weights: { Logic: 2, Performance: 3, Leadership: 1, Innovation: 1, Executive: 2, Openness: 1, Conscientiousness: 2, Extraversion: 1 }
      },
      {
        text: "Postpone the review indefinitely.",
        weights: { Logic: 1, Performance: 1, Leadership: 1, Innovation: 1, Executive: 1, Openness: 1, Conscientiousness: 1, Extraversion: 1 }
      }
    ]
  },

  {
    id: 10,
    title: "Delegation Dilemma",
    scenario: "Your workload is overwhelming but you’re unsure what to delegate...",
    options: [
      {
        text: "Identify tasks that match team strengths and delegate intentionally.",
        weights: { Logic: 5, Performance: 4, Leadership: 5, Innovation: 2, Executive: 4, Openness: 3, Conscientiousness: 5, Extraversion: 3 }
      },
      {
        text: "Delegate everything quickly to relieve pressure.",
        weights: { Logic: 2, Performance: 3, Leadership: 2, Innovation: 1, Executive: 2, Openness: 2, Conscientiousness: 2, Extraversion: 2 }
      },
      {
        text: "Avoid delegating because it takes too much time.",
        weights: { Logic: 1, Performance: 1, Leadership: 1, Innovation: 1, Executive: 1, Openness: 1, Conscientiousness: 1, Extraversion: 1 }
      },
      {
        text: "Delegate only administrative tasks.",
        weights: { Logic: 2, Performance: 4, Leadership: 1, Innovation: 1, Executive: 2, Openness: 1, Conscientiousness: 2, Extraversion: 1 }
      }
    ]
  }
];

// END OF QUESTIONS
