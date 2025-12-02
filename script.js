// --- DATA: 50 QUESTIONS, 4 MODULES (10 each) ---
const modules = [
  { id: "Module A", questions: [] },
  { id: "Module B", questions: [] },
  { id: "Module C", questions: [] },
  { id: "Module D", questions: [] }
];

// Fake 50 questions auto-generated (REAL YOU CAN REPLACE THEM)
let questionCount = 1;
modules.forEach(module => {
  for (let i = 0; i < 10; i++) {
    module.questions.push({
      q: `Question ${questionCount}: Choose the option that fits best.`,
      options: ["A", "B", "C", "D"]
    });
    questionCount++;
  }
});

// FORM INITIAL
document.getElementById("startBtn").addEventListener("click", () => {
  const name = candidateName.value.trim();
  const email = candidateEmail.value.trim();

  if (!name || !email) {
    alert("Please enter both name and email.");
    return;
  }

  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("module-screen").classList.remove("hidden");

  generateModuleButtons();
});

let currentModuleIndex = 0;
let timerInterval;

// Create Module Buttons
function generateModuleButtons() {
  const container = document.getElementById("moduleButtons");
  container.innerHTML = "";

  modules.forEach((mod, index) => {
    const btn = document.createElement("button");
    btn.textContent = mod.id;

    if (index !== currentModuleIndex) {
      btn.disabled = true;
    }

    btn.addEventListener("click", () => startModule(index));
    container.appendChild(btn);
  });
}

function startModule(index) {
  currentModuleIndex = index;

  document.getElementById("module-screen").classList.add("hidden");
  document.getElementById("question-screen").classList.remove("hidden");

  document.getElementById("module-title").textContent = modules[index].id;

  loadQuestions(index);
  startTimer(7 * 60); // 7 minutes
}

function loadQuestions(index) {
  const form = document.getElementById("questionForm");
  form.innerHTML = "";

  modules[index].questions.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "question";

    div.innerHTML = `
      <p>${item.q}</p>
      ${item.options
        .map(opt => `<label><input type="radio" name="q${i}" value="${opt}"> ${opt}</label><br>`)
        .join("")}
    `;

    form.appendChild(div);
  });

  document.getElementById("nextModuleBtn").classList.add("hidden");
}

function startTimer(seconds) {
  const timer = document.getElementById("timer");

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;

    timer.textContent = `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;

    if (seconds <= 0) {
      clearInterval(timerInterval);
      finishModule();
    }

    seconds--;
  }, 1000);
}

function finishModule() {
  document.getElementById("nextModuleBtn").classList.remove("hidden");
}

document.getElementById("nextModuleBtn").addEventListener("click", () => {
  if (currentModuleIndex < modules.length - 1) {
    currentModuleIndex++;
    document.getElementById("question-screen").classList.add("hidden");
    document.getElementById("module-screen").classList.remove("hidden");
    generateModuleButtons();
  } else {
    showResults();
  }
});

function showResults() {
  document.getElementById("question-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");

  document.getElementById("resultName").textContent =
    "Candidate: " + candidateName.value;
  document.getElementById("resultEmail").textContent =
    "Email: " + candidateEmail.value;

  // Fake analytics — you will replace with your real scoring
  document.getElementById("competencyResult").innerHTML =
    "<h3>Competency Score: 78%</h3>";
  document.getElementById("personalityResult").innerHTML =
    "<h3>Personality Match: 84%</h3>";
}
