// n1.js

// ===== Config del nivel =====
const LEVEL_ID = "n1";
const TOTAL_QUESTIONS = 5;
const TOTAL_TIME_SEC = 60;
const POINTS_PER_CORRECT = 20;
const PASS_SCORE = 70;
const MAX_SCORE = 100;

// ===== Sesión / UI top =====
const storedName = localStorage.getItem("lx_nombre");
const heroNameSpan = document.getElementById("hero-name");
const sessionStatusSpan = document.querySelector(".session-status");
const displayName = storedName || "Invitado";
if (heroNameSpan) heroNameSpan.textContent = displayName;
if (sessionStatusSpan) sessionStatusSpan.textContent = storedName ? displayName : "anónima";

// Tabs
const navMath = document.getElementById("nav-math");
if (navMath) {
  navMath.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Matemáticas estará disponible próximamente 🙂");
  });
}

// Auth placeholder
const authBtn = document.getElementById("btn-auth");
if (authBtn) {
  authBtn.addEventListener("click", () => {
    alert("Aquí irá la pantalla de inicio de sesión / registro más adelante 🙂");
  });
}

// ===== Screens =====
const screenIntro = document.getElementById("screen-intro");
const screenQuiz = document.getElementById("screen-quiz");
const screenResult = document.getElementById("screen-result");

// Intro buttons
const btnStart = document.getElementById("btn-start");

// Quiz UI
const qProgress = document.getElementById("q-progress");
const qScore = document.getElementById("q-score");
const qTimer = document.getElementById("q-timer");
const qText = document.getElementById("q-text");
const qQuestion = document.getElementById("q-question");
const qChoices = document.getElementById("q-choices");
const qFeedback = document.getElementById("q-feedback");
const btnNext = document.getElementById("btn-next");
const btnQuit = document.getElementById("btn-quit");

// Result UI
const rScore = document.getElementById("r-score");
const rStatus = document.getElementById("r-status");
const rCorrect = document.getElementById("r-correct");
const rBest = document.getElementById("r-best");
const btnRetry = document.getElementById("btn-retry");

// ===== State =====
let selectedSet = [];
let idx = 0;
let correctCount = 0;
let score = 0;

let timeLeft = TOTAL_TIME_SEC;
let timerId = null;

let locked = false;

// ===== localStorage helpers =====
function keyBest() { return `lx_lectura_${LEVEL_ID}_best`; }
function keyLast() { return `lx_lectura_${LEVEL_ID}_last`; }
function keyAttempts() { return `lx_lectura_${LEVEL_ID}_attempts`; }
function keyLastDate() { return `lx_lectura_${LEVEL_ID}_lastDate`; }
function keyLastCorrect() { return `lx_lectura_${LEVEL_ID}_lastCorrect`; }

function getBestScore() {
  const v = Number(localStorage.getItem(keyBest()));
  return Number.isFinite(v) ? v : 0;
}

function setResultStorage(finalScore, finalCorrect) {
  localStorage.setItem(keyLast(), String(finalScore));
  localStorage.setItem(keyLastCorrect(), String(finalCorrect));
  localStorage.setItem(keyLastDate(), new Date().toISOString());

  const attempts = Number(localStorage.getItem(keyAttempts()));
  const nextAttempts = Number.isFinite(attempts) ? attempts + 1 : 1;
  localStorage.setItem(keyAttempts(), String(nextAttempts));

  const best = getBestScore();
  if (finalScore > best) {
    localStorage.setItem(keyBest(), String(finalScore));
  }
}

// ===== Utils =====
function show(el) { el.classList.remove("is-hidden"); }
function hide(el) { el.classList.add("is-hidden"); }

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ===== Quiz flow =====
function resetState() {
  selectedSet = [];
  idx = 0;
  correctCount = 0;
  score = 0;
  timeLeft = TOTAL_TIME_SEC;
  locked = false;

  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

function startTimer() {
  qTimer.textContent = formatTime(timeLeft);

  timerId = setInterval(() => {
    timeLeft -= 1;
    if (timeLeft < 0) timeLeft = 0;
    qTimer.textContent = formatTime(timeLeft);

    if (timeLeft === 0) {
      clearInterval(timerId);
      timerId = null;
      finishQuiz(true); // por tiempo
    }
  }, 1000);
}

function pickQuestions() {
  const bank = Array.isArray(window.LX_N1_BANK) ? window.LX_N1_BANK : [];
  if (bank.length < TOTAL_QUESTIONS) {
    alert("El banco de preguntas es muy pequeño. Agrega más preguntas a n1banco.js.");
    return [];
  }
  return shuffle(bank).slice(0, TOTAL_QUESTIONS);
}

function renderQuestion() {
  const q = selectedSet[idx];
  if (!q) return;

  locked = false;
  btnNext.disabled = true;

  qProgress.textContent = `Pregunta ${idx + 1}/${TOTAL_QUESTIONS}`;
  qScore.textContent = `Puntaje: ${score}`;

  qText.textContent = q.texto;
  qQuestion.textContent = q.pregunta;

  qFeedback.classList.add("is-hidden");
  qFeedback.classList.remove("feedback--ok", "feedback--no");
  qFeedback.textContent = "";

  // choices
  qChoices.innerHTML = "";
  const letters = ["A", "B", "C", "D"];

  q.choices.forEach((choiceText, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice-btn";
    btn.setAttribute("role", "listitem");

    btn.innerHTML = `<span class="choice-letter">${letters[i]}</span>${choiceText}`;

    btn.addEventListener("click", () => onSelect(i));
    qChoices.appendChild(btn);
  });
}

function lockChoices() {
  qChoices.querySelectorAll("button.choice-btn").forEach(b => b.disabled = true);
}

function onSelect(selectedIndex) {
  if (locked) return;
  locked = true;

  const q = selectedSet[idx];
  const isCorrect = selectedIndex === q.answerIndex;

  lockChoices();

  // Mark correct/wrong
  const buttons = Array.from(qChoices.querySelectorAll("button.choice-btn"));
  const correctBtn = buttons[q.answerIndex];
  if (correctBtn) correctBtn.classList.add("choice-correct");

  const selectedBtn = buttons[selectedIndex];
  if (selectedBtn && !isCorrect) selectedBtn.classList.add("choice-wrong");

  // Score
  if (isCorrect) {
    correctCount += 1;
    score = Math.min(MAX_SCORE, score + POINTS_PER_CORRECT);
  }

  // Feedback
  qFeedback.classList.remove("is-hidden");
  qFeedback.classList.add(isCorrect ? "feedback--ok" : "feedback--no");
  qFeedback.textContent = isCorrect
    ? `Correcto ✅ ${q.exp ? "· " + q.exp : ""}`
    : `Incorrecto ❌ La correcta era: ${["A","B","C","D"][q.answerIndex]}. ${q.exp ? "· " + q.exp : ""}`;

  btnNext.disabled = false;
}

function nextQuestion() {
  if (idx < TOTAL_QUESTIONS - 1) {
    idx += 1;
    renderQuestion();
  } else {
    finishQuiz(false);
  }
}

function finishQuiz(byTimeout) {
  // Evitar dobles finales
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }

  // Guardar resultados
  setResultStorage(score, correctCount);

  const best = getBestScore();
  const passed = score >= PASS_SCORE;

  rScore.textContent = `${score}/${MAX_SCORE}`;
  rStatus.textContent = passed ? "Aprobado" : "No aprobado";
  rCorrect.textContent = `${correctCount}/${TOTAL_QUESTIONS}`;
  rBest.textContent = `${best}/${MAX_SCORE}`;

  // UI
  hide(screenIntro);
  hide(screenQuiz);
  show(screenResult);

  if (byTimeout) {
    // pequeño aviso visual (opcional)
    // (sin alert para no molestar)
  }
}

// ===== Events =====
if (btnStart) {
  btnStart.addEventListener("click", () => {
    resetState();
    selectedSet = pickQuestions();
    if (selectedSet.length === 0) return;

    hide(screenIntro);
    hide(screenResult);
    show(screenQuiz);

    renderQuestion();
    startTimer();
  });
}

if (btnNext) btnNext.addEventListener("click", nextQuestion);

if (btnQuit) {
  btnQuit.addEventListener("click", () => {
    // salir sin guardar como intento
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
    window.location.href = "../../lectura.html";
  });
}

if (btnRetry) {
  btnRetry.addEventListener("click", () => {
    // reinicia directo
    resetState();
    selectedSet = pickQuestions();
    if (selectedSet.length === 0) return;

    hide(screenIntro);
    hide(screenResult);
    show(screenQuiz);

    renderQuestion();
    startTimer();
  });
}
