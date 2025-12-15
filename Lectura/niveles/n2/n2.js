// n2.js
(function () {
  "use strict";

  // ============================
  // Config
  // ============================
  const PASS_SCORE = 70;
  const MAX_SCORE = 100;
  const TIME_SECONDS = 60;
  const QUESTIONS_COUNT = 5;
  const MIN_WORDS = 250;

  // Bloquea "Terminar lectura" durante los primeros N segundos
  const MIN_READING_SECONDS_BEFORE_FINISH = 15;

  // ============================
  // Datos
  // ============================
  const contexts = Array.isArray(window.N2_CONTEXTS) ? window.N2_CONTEXTS : [];

  // ============================
  // DOM
  // ============================
  const viewSelector = document.getElementById("view-selector");
  const viewReading = document.getElementById("view-reading");
  const viewQuiz = document.getElementById("view-quiz");

  const contextsGrid = document.getElementById("contexts-grid");
  const levelBestBadge = document.getElementById("level-best-badge");

  const readingTitle = document.getElementById("reading-title");
  const ctxIdLabel = document.getElementById("ctx-id-label");
  const ctxWordsLabel = document.getElementById("ctx-words-label");
  const ctxTextEl = document.getElementById("ctx-text");

  const timerEl = document.getElementById("timer");
  const btnFinishReading = document.getElementById("btn-finish-reading");

  const quizCtxLabel = document.getElementById("quiz-ctx-label");
  const questionsEl = document.getElementById("questions");
  const btnSubmit = document.getElementById("btn-submit");
  const btnBackSelector = document.getElementById("btn-back-selector");

  const resultEl = document.getElementById("result");
  const btnReset = document.getElementById("btn-reset");

  // ============================
  // Estado
  // ============================
  let currentCtx = null;
  let remaining = TIME_SECONDS;
  let timerHandle = null;
  let hasGraded = false;

  // Evita doble finishReading por click + timeout
  let finishing = false;

  const wordCountCache = new Map();

  // ============================
  // Storage
  // ============================
  function getNumber(key, fallback = 0) {
    const raw = localStorage.getItem(key);
    const val = Number(raw);
    return Number.isFinite(val) ? val : fallback;
  }

  function setNumber(key, value) {
    localStorage.setItem(key, String(value));
  }

  function keyCtxBest(ctxId) {
    return `lx_lectura_n2_${ctxId}_best`;
  }

  function keyLevelBest() {
    return `lx_lectura_n2_best`;
  }

  // ============================
  // Word count robusto
  // ============================
  function computeWords(text) {
    const s = String(text || "")
      .replace(/\u00A0/g, " ")
      .replace(/[\u200B-\u200D\uFEFF]/g, "")
      .trim();

    if (!s) return 0;

    try {
      // Letras/Números unicode, soporta contracciones tipo "del", "l’" etc.
      const m = s.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)?/gu);
      return m ? m.length : 0;
    } catch {
      return s.split(/\s+/).filter(Boolean).length;
    }
  }

  function getWordCountFor(ctx) {
    const id = String(ctx?.id || "");
    if (!id) return computeWords(ctx?.text);

    if (wordCountCache.has(id)) return wordCountCache.get(id);

    const wc = computeWords(ctx?.text);
    wordCountCache.set(id, wc);
    return wc;
  }

  // ============================
  // UI helpers
  // ============================
  function mmss(seconds) {
    const s = Math.max(0, seconds);
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  }

  function show(viewEl) {
    [viewSelector, viewReading, viewQuiz].forEach((v) => {
      if (!v) return;
      v.classList.toggle("hidden", v !== viewEl);
    });
    // opcional: llevar arriba
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function statusLabel(best) {
    return best >= PASS_SCORE ? "Aprobado" : "No aprobado";
  }

  function statusClass(best) {
    return best >= PASS_SCORE ? "badge--ok" : "badge--no";
  }

  function updateLevelBestBadge() {
    if (!levelBestBadge) return;
    const best = getNumber(keyLevelBest(), 0);
    levelBestBadge.textContent = `${best}/${MAX_SCORE}`;
  }

  function clearQuizUI() {
    if (questionsEl) questionsEl.innerHTML = "";
    if (resultEl) {
      resultEl.classList.add("hidden");
      resultEl.innerHTML = "";
    }
    if (btnSubmit) btnSubmit.disabled = false;
    hasGraded = false;
  }

  function setFinishButtonState() {
    if (!btnFinishReading) return;

    // habilitar cuando ya han pasado MIN_READING_SECONDS_BEFORE_FINISH
    const elapsed = TIME_SECONDS - remaining;
    const canFinish = elapsed >= MIN_READING_SECONDS_BEFORE_FINISH;

    btnFinishReading.disabled = !canFinish;
    btnFinishReading.title = canFinish
      ? ""
      : `Espera ${Math.max(
          0,
          MIN_READING_SECONDS_BEFORE_FINISH - elapsed
        )}s para terminar.`;
  }

  // ============================
  // Render selector (tarjetas)
  // ============================
  function renderSelector() {
    if (!contextsGrid) return;
    contextsGrid.innerHTML = "";

    if (!contexts.length) {
      contextsGrid.innerHTML = `
        <div class="result">
          <b>No hay contextos cargados.</b>
          <div class="small muted">
            Revisa que <code>n2banco.js</code> se cargue antes que <code>n2.js</code>
            y que defina <code>window.N2_CONTEXTS</code>.
          </div>
        </div>`;
      return;
    }

    contexts.forEach((ctx) => {
      const best = getNumber(keyCtxBest(ctx.id), 0);
      const words = getWordCountFor(ctx);
      const okMinWords = words >= MIN_WORDS;

      const card = document.createElement("article");
      card.className = "card";

      card.innerHTML = `
        <div class="badges">
          <span class="badge">${escapeHtml(ctx.id)}</span>
          <span class="badge ${statusClass(best)}">${statusLabel(best)}</span>
          <span class="badge badge--muted">Mejor: ${best}/${MAX_SCORE}</span>
          <span class="badge ${okMinWords ? "badge--ok" : "badge--no"}">
            Palabras: ${words} / ${MIN_WORDS}
          </span>
        </div>

        <h3>${escapeHtml(ctx.title)}</h3>
        <p class="meta">Sinónimos + equivalencias en contexto (sin cambiar el sentido).</p>

        <div class="row">
          <button class="btn btn--accent" type="button" data-start="${escapeHtml(
            ctx.id
          )}" ${okMinWords ? "" : "disabled"}>
            ${okMinWords ? "Iniciar" : `Texto < ${MIN_WORDS} palabras`}
          </button>
        </div>
      `;

      contextsGrid.appendChild(card);
    });
  }

  // ============================
  // Lectura → quiz
  // ============================
  function stopTimer() {
    if (timerHandle) {
      clearInterval(timerHandle);
      timerHandle = null;
    }
  }

  function startReading(ctx) {
    stopTimer();
    finishing = false;
    hasGraded = false;
    currentCtx = ctx;

    remaining = TIME_SECONDS;
    if (timerEl) timerEl.textContent = mmss(remaining);

    if (readingTitle) readingTitle.textContent = ctx.title || "";
    if (ctxIdLabel) ctxIdLabel.textContent = ctx.id || "";

    const words = getWordCountFor(ctx);
    if (ctxWordsLabel) ctxWordsLabel.textContent = String(words);

    if (ctxTextEl) ctxTextEl.textContent = ctx.text || "";

    clearQuizUI();
    show(viewReading);

    // Bloqueo inicial del botón terminar
    setFinishButtonState();

    timerHandle = setInterval(() => {
      remaining -= 1;
      if (timerEl) timerEl.textContent = mmss(remaining);

      setFinishButtonState();

      if (remaining <= 0) finishReading(true); // forzado por timeout
    }, 1000);
  }

  function finishReading(force = false) {
    if (finishing) return;
    if (!currentCtx) return;

    // Si no es forzado por timeout, exige lectura mínima
    if (!force) {
      const elapsed = TIME_SECONDS - remaining;
      if (elapsed < MIN_READING_SECONDS_BEFORE_FINISH) return;
    }

    finishing = true;
    stopTimer();

    // Oculta el texto para el quiz
    if (ctxTextEl) ctxTextEl.textContent = "";

    if (quizCtxLabel) quizCtxLabel.textContent = currentCtx.id || "";

    renderQuestions(currentCtx);

    if (resultEl) {
      resultEl.classList.add("hidden");
      resultEl.innerHTML = "";
    }
    if (btnSubmit) btnSubmit.disabled = false;

    show(viewQuiz);
  }

  // ============================
  // Quiz
  // ============================
  function renderQuestions(ctx) {
    if (!questionsEl) return;

    questionsEl.innerHTML = "";

    const qs = Array.isArray(ctx?.questions)
      ? ctx.questions.slice(0, QUESTIONS_COUNT)
      : [];

    if (qs.length !== QUESTIONS_COUNT) {
      questionsEl.innerHTML = `
        <div class="result">
          <b>Faltan preguntas.</b>
          <div class="small muted">
            Este contexto no tiene exactamente ${QUESTIONS_COUNT} preguntas.
          </div>
        </div>`;
      if (btnSubmit) btnSubmit.disabled = true;
      return;
    }

    // Validación mínima de opciones
    for (let i = 0; i < qs.length; i++) {
      const item = qs[i];
      const opts = Array.isArray(item?.options) ? item.options : [];
      if (opts.length < 2 || !Number.isInteger(item?.correct)) {
        questionsEl.innerHTML = `
          <div class="result">
            <b>Preguntas mal configuradas.</b>
            <div class="small muted">
              Revisa que cada pregunta tenga <b>options</b> (>=2) y <b>correct</b> (índice).
            </div>
          </div>`;
        if (btnSubmit) btnSubmit.disabled = true;
        return;
      }
    }

    qs.forEach((item, i) => {
      const box = document.createElement("div");
      box.className = "qbox";

      const optsHtml = (item.options || [])
        .map((opt, j) => {
          const id = `q${i}_o${j}`;
          return `
            <label class="opt" for="${id}">
              <input type="radio" name="q${i}" id="${id}" value="${j}">
              <span>${escapeHtml(opt)}</span>
            </label>
          `;
        })
        .join("");

      box.innerHTML = `
        <h4>${i + 1}. ${escapeHtml(item.q)}</h4>
        <div>${optsHtml}</div>
      `;

      questionsEl.appendChild(box);
    });
  }

  function grade() {
    if (!currentCtx || hasGraded) return;

    const qs = Array.isArray(currentCtx?.questions)
      ? currentCtx.questions.slice(0, QUESTIONS_COUNT)
      : [];
    if (qs.length !== QUESTIONS_COUNT) return;

    let correctCount = 0;

    qs.forEach((q, i) => {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      const val = selected ? Number(selected.value) : NaN;
      if (Number.isFinite(val) && val === q.correct) correctCount += 1;
    });

    // Puntaje proporcional exacto a MAX_SCORE (siempre 0..100)
    const score = Math.round((correctCount / QUESTIONS_COUNT) * MAX_SCORE);

    // Guardar mejor por contexto
    const ctxBestKey = keyCtxBest(currentCtx.id);
    const prevCtxBest = getNumber(ctxBestKey, 0);
    if (score > prevCtxBest) setNumber(ctxBestKey, score);

    // Guardar mejor del nivel n2 (para tarjeta en lectura.html)
    const prevLevelBest = getNumber(keyLevelBest(), 0);
    if (score > prevLevelBest) setNumber(keyLevelBest(), score);

    updateLevelBestBadge();
    renderSelector();

    const passed = score >= PASS_SCORE;

    if (resultEl) {
      resultEl.classList.remove("hidden");
      resultEl.innerHTML = `
        <div class="badges" style="margin-bottom:10px">
          <span class="badge ${passed ? "badge--ok" : "badge--no"}">${
        passed ? "Aprobado" : "No aprobado"
      }</span>
          <span class="badge">Correctas: <b>${correctCount}/${QUESTIONS_COUNT}</b></span>
          <span class="badge">Puntaje: <b>${score}/${MAX_SCORE}</b></span>
        </div>
        <div class="small muted">
          En n2, la clave es elegir la opción equivalente <b>sin cambiar el sentido</b> del texto.
        </div>
      `;
    }

    hasGraded = true;
    if (btnSubmit) btnSubmit.disabled = true;
  }

  // ============================
  // Reset
  // ============================
  function resetN2() {
    contexts.forEach((ctx) => localStorage.removeItem(keyCtxBest(ctx.id)));
    localStorage.removeItem(keyLevelBest());
    updateLevelBestBadge();
    renderSelector();
    alert("Progreso de n2 borrado (solo en este navegador).");
  }

  // ============================
  // Eventos
  // ============================
  if (contextsGrid) {
    contextsGrid.addEventListener("click", (e) => {
      const btn = e.target?.closest?.("button[data-start]");
      if (!btn || btn.disabled) return;

      const id = btn.getAttribute("data-start");
      const ctx = contexts.find((c) => String(c.id) === String(id));
      if (!ctx) return;

      const words = getWordCountFor(ctx);
      if (words < MIN_WORDS) return;

      startReading(ctx);
    });
  }

  if (btnFinishReading) {
    btnFinishReading.addEventListener("click", () => finishReading(false));
  }

  if (btnSubmit) btnSubmit.addEventListener("click", grade);

  if (btnBackSelector) {
    btnBackSelector.addEventListener("click", () => {
      stopTimer();
      finishing = false;
      currentCtx = null;
      remaining = TIME_SECONDS;

      // Limpieza completa al volver
      if (ctxTextEl) ctxTextEl.textContent = "";
      if (readingTitle) readingTitle.textContent = "";
      if (ctxIdLabel) ctxIdLabel.textContent = "";
      if (ctxWordsLabel) ctxWordsLabel.textContent = "";
      if (quizCtxLabel) quizCtxLabel.textContent = "";

      clearQuizUI();
      show(viewSelector);
    });
  }

  if (btnReset) btnReset.addEventListener("click", resetN2);

  // ============================
  // Init
  // ============================
  function init() {
    const invalid = contexts.filter((c) => getWordCountFor(c) < MIN_WORDS);
    if (invalid.length) {
      console.warn(
        `Contextos n2 < ${MIN_WORDS} palabras:`,
        invalid.map((x) => x.id)
      );
    }

    updateLevelBestBadge();
    renderSelector();
    show(viewSelector);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
