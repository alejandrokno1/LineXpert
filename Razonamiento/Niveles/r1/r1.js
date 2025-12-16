// Razonamiento/niveles/r1/r1.js
(function () {
  "use strict";

  // =====================
  // Config
  // =====================
  const LEVEL_ID = "r1";
  const PASS_SCORE = 70;
  const MAX_SCORE = 100;
  const TIME_SECONDS = 60;
  const QUESTIONS_COUNT = 5;

  // =====================
  // DOM
  // =====================
  const storedName = localStorage.getItem("lx_nombre");
  const heroNameSpan = document.getElementById("hero-name");
  const sessionStatusSpan = document.querySelector(".session-status");
  const authBtn = document.getElementById("btn-auth");

  const bestBadge = document.getElementById("best-badge");
  const timerBadge = document.getElementById("timer-badge");

  const viewStart = document.getElementById("view-start");
  const viewQuiz = document.getElementById("view-quiz");
  const viewResult = document.getElementById("view-result");

  const btnStart = document.getElementById("btn-start");
  const btnStartDemo = document.getElementById("btn-start-demo");
  const demoBox = document.getElementById("demo-box");
  const bankWarning = document.getElementById("bank-warning");

  const questionsEl = document.getElementById("questions");
  const btnSubmit = document.getElementById("btn-submit");
  const btnFinish = document.getElementById("btn-finish");

  const resultSummary = document.getElementById("result-summary");
  const resultReview = document.getElementById("result-review");
  const btnRetry = document.getElementById("btn-retry");

  // =====================
  // Sesión / saludo
  // =====================
  const displayName = storedName || "Invitado";
  if (heroNameSpan) heroNameSpan.textContent = displayName;
  if (sessionStatusSpan) sessionStatusSpan.textContent = storedName ? displayName : "anónima";

  if (authBtn) {
    authBtn.addEventListener("click", () => {
      alert("Aquí irá la pantalla de inicio de sesión / registro más adelante 🙂");
    });
  }

  // =====================
  // Banco
  // =====================
  const rawBank = Array.isArray(window.LX_R1_BANK) ? window.LX_R1_BANK : [];

  function isValidItem(it) {
    if (!it || typeof it !== "object") return false;
    if (!it.id || !it.seq || !Array.isArray(it.options)) return false;
    if (it.options.length < 3) return false;
    if (!Number.isInteger(it.answer)) return false;
    if (it.answer < 0 || it.answer >= it.options.length) return false;
    return true;
  }

  const bank = rawBank.filter(isValidItem);

  // =====================
  // Estado
  // =====================
  let remaining = TIME_SECONDS;
  let timerHandle = null;
  let quizItems = [];
  let hasSubmitted = false;

  // =====================
  // Storage helpers
  // =====================
  function keyLevelBest() {
    return `lx_logic_${LEVEL_ID}_best`; // convención del módulo razonamiento
  }

  function getNumber(key, fallback = 0) {
    const raw = localStorage.getItem(key);
    const n = Number(raw);
    return Number.isFinite(n) ? n : fallback;
  }

  function setNumber(key, value) {
    localStorage.setItem(key, String(value));
  }

  // =====================
  // UI helpers
  // =====================
  function show(view) {
    viewStart.classList.add("hidden");
    viewQuiz.classList.add("hidden");
    viewResult.classList.add("hidden");
    view.classList.remove("hidden");
  }

  function mmss(seconds) {
    const s = Math.max(0, seconds);
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  }

  function updateBadges() {
    const best = getNumber(keyLevelBest(), 0);
    if (bestBadge) bestBadge.textContent = `Mejor r1: ${best}/${MAX_SCORE}`;
    if (timerBadge) timerBadge.textContent = `⏱️ ${mmss(remaining)}`;
  }

  function escapeHtml(str) {
    return String(str || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // =====================
  // Random helpers
  // =====================
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function sample(arr, n) {
    return shuffle(arr).slice(0, n);
  }

  // =====================
  // Render quiz
  // =====================
  function renderQuiz(items) {
    if (!questionsEl) return;
    questionsEl.innerHTML = "";

    items.forEach((it, idx) => {
      const card = document.createElement("article");
      card.className = "q-card";

      const qNumber = idx + 1;
      const name = `q_${idx}`;

      const optionsHtml = it.options
        .map((opt, k) => {
          const id = `${name}_${k}`;
          return `
            <label class="opt" for="${id}">
              <input type="radio" id="${id}" name="${name}" value="${k}" />
              <span>${escapeHtml(opt)}</span>
            </label>
          `;
        })
        .join("");

      card.innerHTML = `
        <div class="q-top">
          <div>
            <h3 class="q-title">Pregunta ${qNumber}</h3>
            <p class="q-seq">${escapeHtml(it.seq)}</p>
          </div>
          <span class="badge badge--muted">${escapeHtml(it.id)}</span>
        </div>
        <p class="muted" style="margin:0 0 10px;">${escapeHtml(it.question || "Selecciona la respuesta correcta.")}</p>
        <div class="options">${optionsHtml}</div>
      `;

      questionsEl.appendChild(card);
    });
  }

  function readAnswers() {
    const answers = [];
    for (let i = 0; i < quizItems.length; i++) {
      const picked = document.querySelector(`input[name="q_${i}"]:checked`);
      answers.push(picked ? Number(picked.value) : null);
    }
    return answers;
  }

  // =====================
  // Timer
  // =====================
  function stopTimer() {
    if (timerHandle) clearInterval(timerHandle);
    timerHandle = null;
  }

  function startTimer() {
    stopTimer();
    remaining = TIME_SECONDS;
    updateBadges();

    timerHandle = setInterval(() => {
      remaining -= 1;
      updateBadges();
      if (remaining <= 0) {
        stopTimer();
        submitQuiz(true);
      }
    }, 1000);
  }

  // =====================
  // Submit + Results
  // =====================
  function computeScore(userAnswers) {
    let correct = 0;
    quizItems.forEach((it, i) => {
      if (userAnswers[i] === it.answer) correct += 1;
    });
    return {
      correct,
      total: quizItems.length,
      score: correct * 20, // 5 preguntas => 100
    };
  }

  function submitQuiz(isAuto = false) {
    if (hasSubmitted) return;
    hasSubmitted = true;
    stopTimer();

    const userAnswers = readAnswers();
    const { correct, total, score } = computeScore(userAnswers);

    // actualizar mejor puntaje
    const prevBest = getNumber(keyLevelBest(), 0);
    if (score > prevBest) setNumber(keyLevelBest(), score);
    updateBadges();

    const passed = score >= PASS_SCORE;

    // resumen
    resultSummary.innerHTML = `
      <p><strong>Puntaje:</strong> ${score}/${MAX_SCORE} · <strong>Correctas:</strong> ${correct}/${total}</p>
      <p><strong>Estado:</strong> <span class="badge ${passed ? "badge--ok" : "badge--no"}">${passed ? "Aprobado" : "No aprobado"}</span></p>
      <p class="muted">${isAuto ? "Se envió automáticamente porque se terminó el tiempo." : "Enviado correctamente."}</p>
    `;

    // revisión
    resultReview.innerHTML = "";
    quizItems.forEach((it, i) => {
      const ua = userAnswers[i];
      const ok = ua === it.answer;

      const userText = ua === null ? "(sin responder)" : it.options[ua];
      const correctText = it.options[it.answer];

      const box = document.createElement("div");
      box.className = `review-item ${ok ? "review-ok" : "review-no"}`;
      box.innerHTML = `
        <div class="badges">
          <span class="badge">${escapeHtml(it.id)}</span>
          <span class="badge ${ok ? "badge--ok" : "badge--no"}">${ok ? "Correcta" : "Incorrecta"}</span>
        </div>
        <p><strong>Serie:</strong> ${escapeHtml(it.seq)}</p>
        <p><strong>Tu respuesta:</strong> ${escapeHtml(String(userText))}</p>
        <p><strong>Correcta:</strong> ${escapeHtml(String(correctText))}</p>
        <p class="muted"><strong>Explicación:</strong> ${escapeHtml(it.explain || "—")}</p>
      `;
      resultReview.appendChild(box);
    });

    show(viewResult);
  }

  // =====================
  // Start
  // =====================
  function startQuiz() {
    if (bank.length < QUESTIONS_COUNT) {
      bankWarning.classList.remove("hidden");
      return;
    }
    bankWarning.classList.add("hidden");

    hasSubmitted = false;
    quizItems = sample(bank, QUESTIONS_COUNT);

    renderQuiz(quizItems);
    show(viewQuiz);
    startTimer();
  }

  // =====================
  // Events
  // =====================
  if (btnStart) btnStart.addEventListener("click", startQuiz);

  if (btnStartDemo) {
    btnStartDemo.addEventListener("click", () => {
      const isHidden = demoBox.classList.contains("hidden");
      demoBox.classList.toggle("hidden");
      demoBox.setAttribute("aria-hidden", String(!isHidden));
    });
  }

  if (btnSubmit) btnSubmit.addEventListener("click", () => submitQuiz(false));
  if (btnFinish) btnFinish.addEventListener("click", () => submitQuiz(false));
  if (btnRetry) btnRetry.addEventListener("click", () => {
    // volver a inicio
    stopTimer();
    remaining = TIME_SECONDS;
    hasSubmitted = false;
    quizItems = [];
    if (questionsEl) questionsEl.innerHTML = "";
    if (resultReview) resultReview.innerHTML = "";
    if (resultSummary) resultSummary.innerHTML = "";
    updateBadges();
    show(viewStart);
  });

  // =====================
  // Init
  // =====================
  updateBadges();
  show(viewStart);
})();
