// script.js
// Full Question Bank (50 Questions Across Modules A–D)

const questions = {
  A: [
    { q: "When starting a new project with ambiguous instructions, what is your first instinct?", a: ["Clarify expectations immediately", "Begin and adjust along the way", "Request detailed guidelines", "Research previous similar work"] },
    { q: "How do you organize your priorities during high-pressure weeks?", a: ["Impact-based ranking", "Urgency only", "Follow manager direction", "Detailed weekly planning"] },
    { q: "A teammate frequently delivers late. What do you do?", a: ["Ask privately what is happening", "Escalate to your manager", "Let it continue unless it affects you", "Send reminders and follow-up"] },
    { q: "You receive feedback contradicting your initial approach. Your reaction:", a: ["Analyze and adjust", "Defend your method", "Ask for a deeper explanation", "Redo your work fully"] },
    { q: "Your team disagrees on how to solve a problem. You:", a: ["Host a decision session", "Select the best option yourself", "Involve leadership", "Test multiple ideas"] },
    { q: "A repetitive task is assigned to you for several weeks. You:", a: ["Look for process improvements", "Complete it as expected", "Request rotation", "Propose automation"] },
    { q: "You must learn a new software quickly. You:", a: ["Take a structured course", "Explore freely", "Request a colleague to guide you", "Study documentation in detail"] },
    { q: "How do you typically plan your work?", a: ["Calendar blocking", "Go with the flow", "Focus only on urgent tasks", "Create a structured checklist"] },
    { q: "A stakeholder expresses dissatisfaction. You:", a: ["Schedule a meeting to align", "Send a detailed written explanation", "Propose alternative solutions", "Apologize and fix immediately"] },
    { q: "You notice a recurring mistake in a workflow. You:", a: ["Propose an improvement", "Adapt only your own method", "Ignore it", "Ask the team for ideas"] }
  ],

  B: [
    { q: "Scenario: Your team’s productivity drops unexpectedly by 30%. What is your immediate approach?", a: ["Investigate root causes individually", "Increase monitoring", "Request HR support", "Introduce daily checkpoints"] },
    { q: "Scenario: A major client threatens to leave due to dissatisfaction. What is your priority?", a: ["Rebuild communication", "Offer compensation", "Review contractual commitments", "Escalate to senior management"] },
    { q: "Scenario: A conflict escalates between two senior colleagues. You:", a: ["Mediate calmly", "Split responsibilities", "Refer both to HR", "Let them resolve it themselves"] },
    { q: "Scenario: Your project is 2 weeks behind. You:", a: ["Reevaluate the timeline", "Request additional resources", "Remove low-priority items", "Report delay immediately"] },
    { q: "Scenario: A regulation change disrupts your strategy. You:", a: ["Assess impact deeply", "Freeze the project", "Consult legal immediately", "Rebuild the plan from scratch"] },
    { q: "Scenario: A core process suddenly fails. You:", a: ["Check data validity", "Fix immediately", "Notify the team", "Stop the operation until reviewed"] },
    { q: "Scenario: Your team resists a new workflow. You:", a: ["Highlight benefits clearly", "Impose compliance", "Extend deadlines", "Offer additional training"] },
    { q: "Scenario: A new employee performs far above expectations. You:", a: ["Strengthen collaboration", "Raise performance standards", "Adjust workload distribution", "Reassign complex tasks"] },
    { q: "Scenario: You receive 3 urgent tasks at once. You:", a: ["Evaluate impact and choose", "Go in sequence", "Request reprioritization", "Delegate the least risky"] },
    { q: "Scenario: The budget is reduced 20%. You:", a: ["Protect essentials", "Cut non-critical initiatives", "Negotiate adjustments", "Pause projects"] }
  ],

  C: [
    { q: "Scenario: A senior leader challenges your proposal publicly. You:", a: ["Explain your logic calmly", "Request private discussion", "Defend your idea strongly", "Ask clarifying questions"] },
    { q: "Scenario: You must choose between a fast flawed solution or a slower safe one. You choose based on:", a: ["Long-term risk", "Immediate pressure", "Team preference", "Stakeholder expectations"] },
    { q: "Scenario: An employee becomes emotional during feedback. You:", a: ["Pause and support", "Reschedule", "Continue gently", "Escalate to HR"] },
    { q: "Scenario: A critical file disappears hours before a deadline. You:", a: ["Recreate it", "Search with the team", "Ask for deadline extension", "Notify leadership immediately"] },
    { q: "Scenario: A partner refuses responsibility for an error. You:", a: ["Show evidence tactfully", "Escalate diplomatically", "Let it slide temporarily", "Request an alignment meeting"] },
    { q: "Scenario: You must choose an employee for leadership potential. You choose based on:", a: ["Potential", "Performance", "Commitment", "Team culture fit"] },
    { q: "Scenario: A client mistreats your staff. You:", a: ["Protect the employee", "De-escalate", "Call a supervisor", "Remove the staff member temporarily"] },
    { q: "Scenario: You find information contradicting leadership’s direction. You:", a: ["Ask for clarification", "Follow orders anyway", "Show evidence constructively", "Stay silent"] },
    { q: "Scenario: Your ideas are constantly dismissed. You:", a: ["Change how you pitch", "Seek allies", "Drop the topic", "Insist more firmly"] },
    { q: "Scenario: Two teammates compete aggressively. You:", a: ["Set boundaries", "Let them compete", "Redefine roles", "Hold mediated conversation"] },
    { q: "Scenario: Choosing between a loyal employee vs. a high performer. You choose:", a: ["High performer", "Loyal employee", "Split responsibilities", "Analyze risks first"] },
    { q: "Scenario: Your team fails an audit. You:", a: ["Analyze root causes", "Defend your process", "Fix documentation", "Escalate concern"] },
    { q: "Scenario: Leadership demands unrealistic results. You:", a: ["Negotiate", "Do your best", "Request staff", "Focus on essentials"] },
    { q: "Scenario: You detect bias in a decision. You:", a: ["Address respectfully", "Ignore it", "Suggest criteria", "Document everything"] },
    { q: "Scenario: You detect tension between team members. You:", a: ["Address privately", "Discuss openly", "Ignore it", "Bring mediator"] },
    { q: "Scenario: Motivation drops suddenly. You:", a: ["Talk one-on-one", "Hold a reset meeting", "Provide incentives", "Adjust workload"] },
    { q: "Scenario: Your team causes financial loss. You:", a: ["Take responsibility", "Identify responsible party", "Report immediately", "Solve the issue first"] },
    { q: "Scenario: You must redesign a workflow. You:", a: ["Review end-to-end", "Start small", "Use best practices", "Involve stakeholders"] },
    { q: "Scenario: You lead a multicultural team with communication gaps. You:", a: ["Clarify structures", "Adapt your style", "Provide tools", "Hold workshops"] },
    { q: "Scenario: A team member challenges your authority. You:", a: ["Stay firm calmly", "Seek mediation", "Ignore it", "Set boundaries immediately"] }
  ],

  D: [
    { q: "How do you approach innovation in routine tasks?", a: ["Reinvent regularly", "Small improvements", "Only when required", "Let others propose first"] },
    { q: "How do you react to ambiguity in leadership requests?", a: ["Clarify proactively", "Interpret creatively", "Wait for direction", "Follow previous patterns"] },
    { q: "How do you encourage creativity in your team?", a: ["Brainstorm rituals", "Open feedback", "Tools & resources", "Autonomy"] },
    { q: "Your team fears failure. You:", a: ["Normalize experimentation", "Set safe boundaries", "Make learning spaces", "Reduce pressure"] },
    { q: "You must lead a major change. You:", a: ["Communicate vision", "Choose champions", "Create roadmap", "Train team"] },
    { q: "A demotivated employee appears disengaged. You:", a: ["Ask about drivers", "Set goals", "Offer support", "Celebrate wins"] },
    { q: "You lead a cross-functional team. You:", a: ["Align expectations", "Define roles", "Set rituals", "Measure progress"] },
    { q: "How do you handle resistance to new ideas?", a: ["Listen", "Provide evidence", "Pilot test", "Reward adopters"] },
    { q: "How do you cultivate long-term excellence?", a: ["Development plans", "Coaching", "Clear expectations", "Culture building"] },
    { q: "A bold idea fails. You:", a: ["Extract learnings", "Reassure team", "Adjust strategy", "Celebrate effort"] }
  ]
};


// --------------- FORM LOGIC -----------------

document.addEventListener('DOMContentLoaded', () => {
  const steps = Array.from(document.querySelectorAll('.form-step'));
  const nextBtns = document.querySelectorAll('.btn-next');
  const prevBtns = document.querySelectorAll('.btn-prev');
  const submitBtn = document.querySelector('#submitBtn');
  const progress = document.querySelector('#progress');

  let currentStep = 0;

  function showStep(index) {
    steps.forEach((step, i) => {
      step.style.display = i === index ? 'block' : 'none';
    });
    progress.style.width = ((index + 1) / steps.length) * 100 + '%';
  }

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  submitBtn.addEventListener('click', () => {
    generatePDF();
  });

  showStep(currentStep);
});


// --------------- PDF GENERATION -----------------

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  pdf.setFontSize(18);
  pdf.text('Assessment Responses', 10, 10);

  const fields = document.querySelectorAll('input, textarea, select');
  let y = 20;

  fields.forEach(field => {
    const label = field.getAttribute('data-label');
    const value = field.value || 'No response';

    if (label) {
      pdf.setFontSize(12);
      pdf.text(`${label}: ${value}`, 10, y);
      y += 8;

      if (y > 270) {
        pdf.addPage();
        y = 10;
      }
    }
  });

  pdf.save('assessment_responses.pdf');
}
