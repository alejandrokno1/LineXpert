// Razonamiento/niveles/r1/r1.js
(function () {
  "use strict";

  const LEVEL_ID = "r1";
  const PASS_SCORE = 70;
  const MAX_SCORE = 100;
  const TIME_SECONDS = 60;
  const QUESTIONS_COUNT = 5;

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

  const displayName = storedName || "Invitado";
  if (heroNameSpan) heroNameSpan.textContent = displayName;
  if (sessionStatusSpan) sessionStatusSpan.textContent = storedName ? displayName : "anónima";

  if (authBtn) {
    authBtn.addEventListener("click", () => {
      alert("Aquí irá la pantalla de inicio de sesión / registro más adelante 🙂");
    });
  }

  const rawBank = Array.isArray(window.LX_R1_BANK) ? window.LX_R1_BANK : [];

  function escapeHtml(str) {
    return String(str ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalizeItem(it, idx) {
    if (!it || typeof it !== "object") return null;

    const id = it.id ?? it.code ?? `r1_${idx + 1}`;
    const seq = it.seq ?? it.serie ?? it.series ?? it.q ?? it.prompt ?? "";
    const options = it.options ?? it.opciones ?? it.o ?? it.choices ?? [];
    const answer = Number.isInteger(it.answer) ? it.answer : (Number.isInteger(it.a) ? it.a : (Number.isInteger(it.correctIndex) ? it.correctIndex : null));

    const question = it.question ?? it.text ?? it.enunciado ?? "Selecciona la respuesta correcta.";
    const explain = it.explain ?? it.exp ?? it.explicacion ?? "—";

    if (!String(seq).trim()) return null;
    if (!Array.isArray(options) || options.length < 3) return null;
    if (!Number.isInteger(answer)) return null;
    if (answer < 0 || answer >= options.length) return null;

    return {
      id: String(id),
      seq: String(seq),
      options: options.map((x) => String(x)),
      answer,
      question: String(question),
      explain: String(explain),
    };
  }

  const bank = rawBank.map(normalizeItem).filter(Boolean);

  let remaining = TIME_SECONDS;
  let timerHandle = null;
  let quizItems = [];
  let hasSubmitted = false;

  function keyLevelBest() {
    return `lx_logic_${LEVEL_ID}_best`;
  }

  function getNumber(key, fallback = 0) {
    const raw = localStorage.getItem(key);
    const n = Number(raw);
    return Number.isFinite(n) ? n : fallback;
  }

  function setNumber(key, value) {
    localStorage.setItem(key, String(value));
  }

  function show(view) {
    if (viewStart) viewStart.classList.add("hidden");
    if (viewQuiz) viewQuiz.classList.add("hidden");
    if (viewResult) viewResult.classList.add("hidden");
    if (view) view.classList.remove("hidden");
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
        <p class="muted" style="margin:0 0 10px;">${escapeHtml(it.question)}</p>
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

  function computeScore(userAnswers) {
    let correct = 0;
    quizItems.forEach((it, i) => {
      if (userAnswers[i] === it.answer) correct += 1;
    });

    const total = quizItems.length || 1;
    const score = Math.round((correct / total) * MAX_SCORE);

    return { correct, total: quizItems.length, score };
  }

  function submitQuiz(isAuto = false) {
    if (hasSubmitted) return;
    hasSubmitted = true;
    stopTimer();

    if (btnSubmit) btnSubmit.disabled = true;
    if (btnFinish) btnFinish.disabled = true;

    const userAnswers = readAnswers();
    const { correct, total, score } = computeScore(userAnswers);

    const prevBest = getNumber(keyLevelBest(), 0);
    if (score > prevBest) setNumber(keyLevelBest(), score);
    updateBadges();

    const passed = score >= PASS_SCORE;

    if (resultSummary) {
      resultSummary.innerHTML = `
        <p><strong>Puntaje:</strong> ${score}/${MAX_SCORE} · <strong>Correctas:</strong> ${correct}/${total}</p>
        <p><strong>Estado:</strong> <span class="badge ${passed ? "badge--ok" : "badge--no"}">${passed ? "Aprobado" : "No aprobado"}</span></p>
        <p class="muted">${isAuto ? "Se envió automáticamente porque se terminó el tiempo." : "Enviado correctamente."}</p>
      `;
    }

    if (resultReview) {
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
          <p class="muted"><strong>Explicación:</strong> ${escapeHtml(it.explain)}</p>
        `;
        resultReview.appendChild(box);
      });
    }

    show(viewResult);
  }

  function startQuiz() {
    if (bank.length < QUESTIONS_COUNT) {
      if (bankWarning) bankWarning.classList.remove("hidden");
      return;
    }
    if (bankWarning) bankWarning.classList.add("hidden");

    hasSubmitted = false;
    quizItems = sample(bank, QUESTIONS_COUNT);

    if (btnSubmit) btnSubmit.disabled = false;
    if (btnFinish) btnFinish.disabled = false;
    if (resultReview) resultReview.innerHTML = "";
    if (resultSummary) resultSummary.innerHTML = "";

    renderQuiz(quizItems);
    show(viewQuiz);
    startTimer();
  }

  if (btnStart) btnStart.addEventListener("click", startQuiz);

  if (btnStartDemo && demoBox) {
    btnStartDemo.addEventListener("click", () => {
      const isHidden = demoBox.classList.contains("hidden");
      demoBox.classList.toggle("hidden");
      demoBox.setAttribute("aria-hidden", String(!isHidden));
    });
  }

  if (btnSubmit) btnSubmit.addEventListener("click", () => submitQuiz(false));
  if (btnFinish) btnFinish.addEventListener("click", () => submitQuiz(false));

  if (btnRetry) {
    btnRetry.addEventListener("click", () => {
      stopTimer();
      remaining = TIME_SECONDS;
      hasSubmitted = false;
      quizItems = [];
      if (questionsEl) questionsEl.innerHTML = "";
      if (resultReview) resultReview.innerHTML = "";
      if (resultSummary) resultSummary.innerHTML = "";
      if (btnSubmit) btnSubmit.disabled = false;
      if (btnFinish) btnFinish.disabled = false;
      updateBadges();
      show(viewStart);
    });
  }

  updateBadges();
  show(viewStart);
})();
