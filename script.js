// =============================
// MODULE STRUCTURE
// =============================
const modules = [
    {
        title: "Module A — Logic",
        questions: [
            { q: "You must choose the most logical next step in a workflow...", options: ["A", "B", "C"], correct: 1 },
            { q: "A sequence follows: 2, 4, 8, 16… what is next?", options: ["20", "32", "34"], correct: 1 },
            { q: "Which pattern completes the analogy?", options: ["Option A", "Option B", "Option C"], correct: 0 },
            { q: "Team A finishes in half the time of Team B. What does it imply?", options: ["...", "...", "..."], correct: 2 },
            { q: "Logical flaw detection...", options: ["...", "...", "..."], correct: 1 },
            { q: "Identify the best evidence...", options: ["...", "...", "..."], correct: 0 },
            { q: "Analyze data trend...", options: ["...", "...", "..."], correct: 1 },
            { q: "Interpret incomplete information...", options: ["...", "...", "..."], correct: 2 },
            { q: "Logic-based scenario...", options: ["...", "...", "..."], correct: 0 },
            { q: "Decision under ambiguity...", options: ["...", "...", "..."], correct: 1 }
        ]
    },
    {
        title: "Module B — Leadership",
        questions: [
            { q: "Your team is resisting change...", options: ["A", "B", "C"], correct: 2 },
            { q: "You must inspire without authority...", options: ["...", "...", "..."], correct: 1 },
            { q: "Conflict between two senior members...", options: ["...", "...", "..."], correct: 0 },
            { q: "A decision must be made urgently...", options: ["...", "...", "..."], correct: 2 },
            { q: "Delegation style...", options: ["...", "...", "..."], correct: 2 },
            { q: "Accountability scenario...", options: ["...", "...", "..."], correct: 1 },
            { q: "Leadership values...", options: ["...", "...", "..."], correct: 0 },
            { q: "Motivation scenario...", options: ["...", "...", "..."], correct: 1 },
            { q: "Ethical leadership...", options: ["...", "...", "..."], correct: 0 },
            { q: "Empowerment scenario...", options: ["...", "...", "..."], correct: 2 }
        ]
    },
    {
        title: "Module C — Innovation",
        questions: [
            { q: "You need to propose a new strategy...", options: ["...", "...", "..."], correct: 1 },
            { q: "Creativity under constraints...", options: ["...", "...", "..."], correct: 2 },
            { q: "Risk-taking scenario...", options: ["...", "...", "..."], correct: 0 },
            { q: "Market disruption...", options: ["...", "...", "..."], correct: 1 },
            { q: "New idea evaluation...", options: ["...", "...", "..."], correct: 2 },
            { q: "Innovation culture...", options: ["...", "...", "..."], correct: 0 },
            { q: "Customer-centric innovation...", options: ["...", "...", "..."], correct: 1 },
            { q: "Prototype thinking...", options: ["...", "...", "..."], correct: 2 },
            { q: "Agile experimentation...", options: ["...", "...", "..."], correct: 1 },
            { q: "Long-term innovation...", options: ["...", "...", "..."], correct: 0 }
        ]
    },
    {
        title: "Module D — Executive Presence",
        questions: [
            { q: "Your communication must influence executives...", options: ["...", "...", "..."], correct: 2 },
            { q: "Handling pressure...", options: ["...", "...", "..."], correct: 1 },
            { q: "Decision confidence...", options: ["...", "...", "..."], correct: 0 },
            { q: "High-stakes meeting...", options: ["...", "...", "..."], correct: 2 },
            { q: "Strategic framing...", options: ["...", "...", "..."], correct: 1 },
            { q: "Composure under challenge...", options: ["...", "...", "..."], correct: 0 },
            { q: "Influencing without authority...", options: ["...", "...", "..."], correct: 2 },
            { q: "Executive communication...", options: ["...", "...", "..."], correct: 1 },
            { q: "Visibility and impact...", options: ["...", "...", "..."], correct: 1 },
            { q: "High-level judgement...", options: ["...", "...", "..."], correct: 0 }
        ]
    }
];

// GLOBAL STATE
let currentModule = 0;
let questionIndex = 0;
let score = 0;
let timer;
let timeRemaining = 420; // 7 minutes

// HTML ELEMENTS
const moduleSelection = document.getElementById("module-selection");
const testContainer = document.getElementById("test-container");
const resultsContainer = document.getElementById("results-container");

const moduleTitle = document.getElementById("module-title");
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const timerDisplay = document.getElementById("timer");

// =============================
// START MODULE
// =============================
function startModule(index) {
    currentModule = index;
    questionIndex = 0;
    score = 0;

    moduleSelection.classList.add("hidden");
    testContainer.classList.remove("hidden");

    loadQuestion();
    startTimer();
}

// =============================
// TIMER
// =============================
function startTimer() {
    timeRemaining = 420; // 7 minutes

    timer = setInterval(() => {
        let min = Math.floor(timeRemaining / 60);
        let sec = timeRemaining % 60;

        timerDisplay.textContent = 
            `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            finishModule();
        }

        timeRemaining--;
    }, 1000);
}

// =============================
// LOAD QUESTION
// =============================
function loadQuestion() {
    const module = modules[currentModule];
    const q = module.questions[questionIndex];

    moduleTitle.textContent = module.title;
    questionNumber.textContent = `Question ${questionIndex + 1} of 10`;
    questionText.textContent = q.q;

    optionsContainer.innerHTML = "";
    document.getElementById("next-btn").disabled = true;

    q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => selectAnswer(i);
        optionsContainer.appendChild(btn);
    });
}

// SELECT ANSWER
function selectAnswer(choice) {
    const module = modules[currentModule];
    const q = module.questions[questionIndex];

    if (choice === q.correct) score++;

    document.querySelectorAll("#options-container button")
        .forEach(btn => btn.classList.remove("selected"));

    event.target.classList.add("selected");

    document.getElementById("next-btn").disabled = false;
}

// NEXT QUESTION
function nextQuestion() {
    questionIndex++;

    if (questionIndex >= 10) {
        finishModule();
        return;
    }

    loadQuestion();
}

// FINISH MODULE
function finishModule() {
    clearInterval(timer);

    // Unlock next module
    if (currentModule === 0) document.getElementById("m2").classList.remove("locked");
    if (currentModule === 1) document.getElementById("m3").classList.remove("locked");
    if (currentModule === 2) document.getElementById("m4").classList.remove("locked");

    if (currentModule === 3) {
        showResults();
        return;
    }

    testContainer.classList.add("hidden");
    moduleSelection.classList.remove("hidden");
}

// FINAL RESULTS
function showResults() {
    testContainer.classList.add("hidden");
    resultsContainer.classList.remove("hidden");

    document.getElementById("score-summary").innerHTML =
        `<p><strong>Total correct:</strong> ${score} / 40</p>`;
}
