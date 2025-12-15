// n3.js
(function () {
  "use strict";

  const PASS_SCORE = 70;
  const MAX_SCORE = 100;
  const TIME_SECONDS = 60;
  const QUESTIONS_COUNT = 5;
  const MIN_WORDS = 250;

  const MIN_READING_SECONDS_BEFORE_FINISH = 15;

  const contexts = Array.isArray(window.N3_CONTEXTS) ? window.N3_CONTEXTS : [];

  // DOM
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

  // Estado
  let currentCtx = null;
  let remaining = TIME_SECONDS;
  let timerHandle = null;
  let hasGraded = false;
  let finishing = false;

  const wordCountCache = new Map();

  // Storage keys
  const keyCtxBest = (ctxId) => `lx_lectura_n3_${ctxId}_best`;
  const keyLevelBest = () => `lx_lectura_n3_best`;

  function getNumber(key, fallback = 0) {
    const raw = localStorage.getItem(key);
    const val = Number(raw);
    return Number.isFinite(val) ? val : fallback;
  }
  function setNumber(key, value) {
    localStorage.setItem(key, String(value));
  }

  // Word count robusto
  function computeWords(text) {
    const s = String(text || "")
      .replace(/\u00A0/g, " ")
      .replace(/[\u200B-\u200D\uFEFF]/g, "")
      .trim();
    if (!s) return 0;
    try {
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
    try { window.scrollTo({ top: 0, behavior: "smooth" }); }
    catch { window.scrollTo(0, 0); }
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
    const elapsed = TIME_SECONDS - remaining;
    const canFinish = elapsed >= MIN_READING_SECONDS_BEFORE_FINISH;
    btnFinishReading.disabled = !canFinish;
    btnFinishReading.title = canFinish
      ? ""
      : `Espera ${Math.max(0, MIN_READING_SECONDS_BEFORE_FINISH - elapsed)}s para terminar.`;
  }

  // Render selector
  function renderSelector() {
    if (!contextsGrid) return;
    contextsGrid.innerHTML = "";

    if (!contexts.length) {
      contextsGrid.innerHTML = `
        <div class="result">
          <b>No hay contextos cargados.</b>
          <div class="muted small">Revisa que n3banco.js cargue antes que n3.js y defina window.N3_CONTEXTS.</div>
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
          <span class="badge ${okMinWords ? "badge--ok" : "badge--no"}">Palabras: ${words} / ${MIN_WORDS}</span>
        </div>

        <h3>${escapeHtml(ctx.title)}</h3>
        <p class="meta">Antónimos / oposición en contexto (elige la opción opuesta según el texto).</p>

        <div class="row">
          <button class="btn btn--accent" type="button" data-start="${escapeHtml(ctx.id)}" ${okMinWords ? "" : "disabled"}>
            ${okMinWords ? "Iniciar" : `Texto < ${MIN_WORDS} palabras`}
          </button>
        </div>
      `;

      contextsGrid.appendChild(card);
    });
  }

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

    setFinishButtonState();

    timerHandle = setInterval(() => {
      remaining -= 1;
      if (timerEl) timerEl.textContent = mmss(remaining);
      setFinishButtonState();
      if (remaining <= 0) finishReading(true);
    }, 1000);
  }

  function finishReading(force = false) {
    if (finishing) return;
    if (!currentCtx) return;

    if (!force) {
      const elapsed = TIME_SECONDS - remaining;
      if (elapsed < MIN_READING_SECONDS_BEFORE_FINISH) return;
    }

    finishing = true;
    stopTimer();

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

  function renderQuestions(ctx) {
    if (!questionsEl) return;
    questionsEl.innerHTML = "";

    const qs = Array.isArray(ctx?.questions) ? ctx.questions.slice(0, QUESTIONS_COUNT) : [];

    if (qs.length !== QUESTIONS_COUNT) {
      questionsEl.innerHTML = `
        <div class="result">
          <b>Faltan preguntas.</b>
          <div class="muted small">Este contexto no tiene exactamente ${QUESTIONS_COUNT} preguntas.</div>
        </div>`;
      if (btnSubmit) btnSubmit.disabled = true;
      return;
    }

    // Validación básica
    for (const item of qs) {
      const opts = Array.isArray(item?.options) ? item.options : [];
      if (opts.length < 2 || !Number.isInteger(item?.correct)) {
        questionsEl.innerHTML = `
          <div class="result">
            <b>Preguntas mal configuradas.</b>
            <div class="muted small">Cada pregunta debe tener options (>=2) y correct (índice).</div>
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

    const qs = Array.isArray(currentCtx?.questions) ? currentCtx.questions.slice(0, QUESTIONS_COUNT) : [];
    if (qs.length !== QUESTIONS_COUNT) return;

    let correctCount = 0;

    qs.forEach((q, i) => {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      const val = selected ? Number(selected.value) : NaN;
      if (Number.isFinite(val) && val === q.correct) correctCount += 1;
    });

    const score = Math.round((correctCount / QUESTIONS_COUNT) * MAX_SCORE);

    // best por contexto
    const ctxBestKey = keyCtxBest(currentCtx.id);
    const prevCtxBest = getNumber(ctxBestKey, 0);
    if (score > prevCtxBest) setNumber(ctxBestKey, score);

    // best del nivel
    const prevLevelBest = getNumber(keyLevelBest(), 0);
    if (score > prevLevelBest) setNumber(keyLevelBest(), score);

    updateLevelBestBadge();
    renderSelector();

    const passed = score >= PASS_SCORE;

    if (resultEl) {
      resultEl.classList.remove("hidden");
      resultEl.innerHTML = `
        <div class="badges" style="margin-bottom:10px">
          <span class="badge ${passed ? "badge--ok" : "badge--no"}">${passed ? "Aprobado" : "No aprobado"}</span>
          <span class="badge">Correctas: <b>${correctCount}/${QUESTIONS_COUNT}</b></span>
          <span class="badge">Puntaje: <b>${score}/${MAX_SCORE}</b></span>
        </div>
        <div class="muted small">
          Recuerda: no es “antónimo de diccionario” siempre, sino la opción que se opone <b>en esa frase</b>.
        </div>
      `;
    }

    hasGraded = true;
    if (btnSubmit) btnSubmit.disabled = true;
  }

  function resetN3() {
    contexts.forEach((ctx) => localStorage.removeItem(keyCtxBest(ctx.id)));
    localStorage.removeItem(keyLevelBest());
    updateLevelBestBadge();
    renderSelector();
    alert("Progreso de n3 borrado (solo en este navegador).");
  }

  // Eventos
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

  if (btnFinishReading) btnFinishReading.addEventListener("click", () => finishReading(false));
  if (btnSubmit) btnSubmit.addEventListener("click", grade);

  if (btnBackSelector) {
    btnBackSelector.addEventListener("click", () => {
      stopTimer();
      finishing = false;
      currentCtx = null;
      remaining = TIME_SECONDS;

      if (ctxTextEl) ctxTextEl.textContent = "";
      if (readingTitle) readingTitle.textContent = "";
      if (ctxIdLabel) ctxIdLabel.textContent = "";
      if (ctxWordsLabel) ctxWordsLabel.textContent = "";
      if (quizCtxLabel) quizCtxLabel.textContent = "";

      clearQuizUI();
      show(viewSelector);
    });
  }

  if (btnReset) btnReset.addEventListener("click", resetN3);

  function init() {
    const invalid = contexts.filter((c) => getWordCountFor(c) < MIN_WORDS);
    if (invalid.length) console.warn(`Contextos n3 < ${MIN_WORDS} palabras:`, invalid.map((x) => x.id));

    updateLevelBestBadge();
    renderSelector();
    show(viewSelector);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
