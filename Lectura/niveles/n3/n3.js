// n3.js (actualizado - enfoque educativo + retroalimentación + progreso)
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

  // Evita “terminar” de inmediato para que el usuario al menos lea un poco
  const MIN_READING_SECONDS_BEFORE_FINISH = 15;

  // “Dominio” del contexto: cuántas veces seguidas aprueba ese contexto
  const MASTERY_STREAK_TO_MASTER = 2;

  // ============================
  // Datos
  // ============================
  const contexts = Array.isArray(window.N3_CONTEXTS) ? window.N3_CONTEXTS : [];

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
  let finishing = false;

  const wordCountCache = new Map();

  // ============================
  // Storage keys
  // ============================
  const keyCtxBest = (ctxId) => `lx_lectura_n3_${ctxId}_best`;
  const keyCtxAttempts = (ctxId) => `lx_lectura_n3_${ctxId}_attempts`;
  const keyCtxStreak = (ctxId) => `lx_lectura_n3_${ctxId}_streak`;
  const keyCtxLastScore = (ctxId) => `lx_lectura_n3_${ctxId}_last`;
  const keyCtxLastPlayed = (ctxId) => `lx_lectura_n3_${ctxId}_lastPlayed`;
  const keyLevelBest = () => `lx_lectura_n3_best`;

  function getNumber(key, fallback = 0) {
    const raw = localStorage.getItem(key);
    const val = Number(raw);
    return Number.isFinite(val) ? val : fallback;
  }
  function setNumber(key, value) {
    localStorage.setItem(key, String(value));
  }

  // ============================
  // Word count robusto (igual filosofía a tu versión)
  // ============================
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
  // Progreso por contexto
  // ============================
  function getCtxStats(ctxId) {
    const best = getNumber(keyCtxBest(ctxId), 0);
    const attempts = getNumber(keyCtxAttempts(ctxId), 0);
    const streak = getNumber(keyCtxStreak(ctxId), 0);
    const last = getNumber(keyCtxLastScore(ctxId), 0);
    const lastPlayed = getNumber(keyCtxLastPlayed(ctxId), 0);
    const mastered = streak >= MASTERY_STREAK_TO_MASTER;
    return { best, attempts, streak, last, lastPlayed, mastered };
  }

  function bumpAttempt(ctxId) {
    const a = getNumber(keyCtxAttempts(ctxId), 0) + 1;
    setNumber(keyCtxAttempts(ctxId), a);
    return a;
  }

  function setLastPlayed(ctxId) {
    setNumber(keyCtxLastPlayed(ctxId), Date.now());
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
          <div class="muted small">Revisa que <code>n3banco.js</code> cargue antes que <code>n3.js</code> y defina <code>window.N3_CONTEXTS</code>.</div>
        </div>`;
      return;
    }

    // Orden educativo:
    // 1) Listos (>=250) arriba
    // 2) No dominados arriba
    // 3) Menos jugados / más antiguos arriba
    const sorted = contexts.slice().sort((a, b) => {
      const wa = getWordCountFor(a);
      const wb = getWordCountFor(b);
      const oka = wa >= MIN_WORDS ? 1 : 0;
      const okb = wb >= MIN_WORDS ? 1 : 0;
      if (okb !== oka) return okb - oka;

      const sa = getCtxStats(a.id);
      const sb = getCtxStats(b.id);
      const ma = sa.mastered ? 1 : 0;
      const mb = sb.mastered ? 1 : 0;
      if (ma !== mb) return ma - mb;

      // menos intentos primero
      if (sa.attempts !== sb.attempts) return sa.attempts - sb.attempts;

      // menos reciente primero
      return sa.lastPlayed - sb.lastPlayed;
    });

    sorted.forEach((ctx) => {
      const words = getWordCountFor(ctx);
      const okMinWords = words >= MIN_WORDS;

      const s = getCtxStats(ctx.id);

      const card = document.createElement("article");
      card.className = "card";

      const masteryBadge = s.mastered
        ? `<span class="badge badge--ok">Dominado</span>`
        : `<span class="badge badge--muted">Racha: ${s.streak}/${MASTERY_STREAK_TO_MASTER}</span>`;

      card.innerHTML = `
        <div class="badges">
          <span class="badge">${escapeHtml(ctx.id)}</span>
          <span class="badge ${statusClass(s.best)}">${statusLabel(s.best)}</span>
          <span class="badge badge--muted">Mejor: ${s.best}/${MAX_SCORE}</span>
          <span class="badge badge--muted">Intentos: ${s.attempts}</span>
          ${masteryBadge}
          <span class="badge ${okMinWords ? "badge--ok" : "badge--no"}">Palabras: ${words} / ${MIN_WORDS}</span>
        </div>

        <h3>${escapeHtml(ctx.title || ctx.id)}</h3>
        <p class="meta">Antónimos en contexto: elige la opción que <b>se opone</b> al sentido de la frase (no siempre es “antónimo de diccionario”).</p>

        <div class="row">
          <button class="btn btn--accent" type="button" data-start="${escapeHtml(ctx.id)}" ${okMinWords ? "" : "disabled"}>
            ${okMinWords ? "Iniciar" : `Texto < ${MIN_WORDS} palabras`}
          </button>
        </div>
      `;

      contextsGrid.appendChild(card);
    });
  }

  // ============================
  // Timer
  // ============================
  function stopTimer() {
    if (timerHandle) {
      clearInterval(timerHandle);
      timerHandle = null;
    }
  }

  // ============================
  // Flujo lectura → quiz
  // ============================
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

    // marca “jugado” para ordenamiento
    setLastPlayed(ctx.id);

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

    // Ocultamos el texto en quiz (como ya lo hacías)
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
  // Preguntas
  // ============================
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

    // Validación básica + soporte opcional explain/hint
    for (const item of qs) {
      const opts = Array.isArray(item?.options) ? item.options : [];
      if (opts.length < 2 || !Number.isInteger(item?.correct)) {
        questionsEl.innerHTML = `
          <div class="result">
            <b>Preguntas mal configuradas.</b>
            <div class="muted small">Cada pregunta debe tener <code>options</code> (>=2) y <code>correct</code> (índice).</div>
          </div>`;
        if (btnSubmit) btnSubmit.disabled = true;
        return;
      }
      if (item.correct < 0 || item.correct >= opts.length) {
        questionsEl.innerHTML = `
          <div class="result">
            <b>Índice <code>correct</code> fuera de rango.</b>
            <div class="muted small">Revisa el contexto <code>${escapeHtml(ctx.id)}</code>.</div>
          </div>`;
        if (btnSubmit) btnSubmit.disabled = true;
        return;
      }
    }

    // Bloque educativo (mini-recordatorio)
    questionsEl.innerHTML = `
      <div class="result" style="margin-bottom:12px">
        <b>Tip (n3):</b>
        <div class="muted small">
          Busca <b>oposición de sentido</b> en la frase: contraste (pero/sin embargo), negación, o cambio de cualidad (alto↔bajo, rápido↔lento, claro↔confuso).
          No siempre es “antónimo perfecto”; es el que <b>se opone en ese contexto</b>.
        </div>
      </div>
    `;

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

      // Nota: si el banco incluye item.hint, lo mostramos suave (sin dar la respuesta)
      const hintHtml = item.hint
        ? `<div class="muted small" style="margin-top:6px"><b>Pista:</b> ${escapeHtml(item.hint)}</div>`
        : "";

      box.innerHTML = `
        <h4>${i + 1}. ${escapeHtml(item.q)}</h4>
        <div>${optsHtml}</div>
        ${hintHtml}
      `;
      questionsEl.appendChild(box);
    });
  }

  // ============================
  // Calificar + retroalimentación detallada
  // ============================
  function grade() {
    if (!currentCtx || hasGraded) return;

    const qs = Array.isArray(currentCtx?.questions) ? currentCtx.questions.slice(0, QUESTIONS_COUNT) : [];
    if (qs.length !== QUESTIONS_COUNT) return;

    // Intento
    bumpAttempt(currentCtx.id);

    let correctCount = 0;
    const details = [];

    qs.forEach((q, i) => {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      const picked = selected ? Number(selected.value) : NaN;

      const ok = Number.isFinite(picked) && picked === q.correct;
      if (ok) correctCount += 1;

      const pickedText = Number.isFinite(picked) ? (q.options[picked] ?? "") : "(sin responder)";
      const correctText = q.options[q.correct] ?? "";

      details.push({
        idx: i + 1,
        q: q.q,
        ok,
        pickedText,
        correctText,
        explain: q.explain || "",
      });
    });

    const score = Math.round((correctCount / QUESTIONS_COUNT) * MAX_SCORE);

    // best por contexto
    const prevCtxBest = getNumber(keyCtxBest(currentCtx.id), 0);
    if (score > prevCtxBest) setNumber(keyCtxBest(currentCtx.id), score);

    // last score
    setNumber(keyCtxLastScore(currentCtx.id), score);

    // streak/mastery
    const prevStreak = getNumber(keyCtxStreak(currentCtx.id), 0);
    if (score >= PASS_SCORE) {
      setNumber(keyCtxStreak(currentCtx.id), prevStreak + 1);
    } else {
      setNumber(keyCtxStreak(currentCtx.id), 0);
    }

    // best del nivel
    const prevLevelBest = getNumber(keyLevelBest(), 0);
    if (score > prevLevelBest) setNumber(keyLevelBest(), score);

    updateLevelBestBadge();
    renderSelector();

    const passed = score >= PASS_SCORE;

    // Render resultado + retroalimentación (muy útil para aprendizaje)
    if (resultEl) {
      const reviewHtml = details
        .map((d) => {
          const cls = d.ok ? "badge--ok" : "badge--no";
          const exp = d.explain
            ? `<div class="muted small" style="margin-top:6px"><b>Explicación:</b> ${escapeHtml(d.explain)}</div>`
            : `<div class="muted small" style="margin-top:6px"><b>Explicación:</b> La opción correcta es la que <b>se opone al sentido</b> de la frase/palabra evaluada en el texto.</div>`;

          return `
            <div class="result" style="margin-top:10px">
              <div class="badges" style="margin-bottom:6px">
                <span class="badge ${cls}">${d.ok ? "Correcta" : "Incorrecta"}</span>
                <span class="badge badge--muted">Pregunta ${d.idx}</span>
              </div>
              <div><b>${escapeHtml(d.q)}</b></div>
              <div class="muted small" style="margin-top:6px"><b>Tu respuesta:</b> ${escapeHtml(d.pickedText)}</div>
              <div class="muted small"><b>Correcta:</b> ${escapeHtml(d.correctText)}</div>
              ${exp}
            </div>
          `;
        })
        .join("");

      resultEl.classList.remove("hidden");
      resultEl.innerHTML = `
        <div class="badges" style="margin-bottom:10px">
          <span class="badge ${passed ? "badge--ok" : "badge--no"}">${passed ? "Aprobado" : "No aprobado"}</span>
          <span class="badge">Correctas: <b>${correctCount}/${QUESTIONS_COUNT}</b></span>
          <span class="badge">Puntaje: <b>${score}/${MAX_SCORE}</b></span>
        </div>

        <div class="muted small" style="margin-bottom:10px">
          <b>Consejo:</b> Si fallaste, vuelve al texto e identifica la palabra/idea que cambia por contraste (pero/sin embargo), negación, o cualidad opuesta.
        </div>

        <div class="row" style="gap:10px; flex-wrap:wrap; margin: 10px 0;">
          <button class="btn btn--accent" type="button" data-action="retry">Reintentar este contexto</button>
          <button class="btn" type="button" data-action="back">Volver a contextos</button>
        </div>

        <div style="margin-top:10px">
          <b>Retroalimentación por pregunta</b>
          ${reviewHtml}
        </div>
      `;
    }

    hasGraded = true;
    if (btnSubmit) btnSubmit.disabled = true;
  }

  // ============================
  // Reset
  // ============================
  function resetN3() {
    contexts.forEach((ctx) => {
      localStorage.removeItem(keyCtxBest(ctx.id));
      localStorage.removeItem(keyCtxAttempts(ctx.id));
      localStorage.removeItem(keyCtxStreak(ctx.id));
      localStorage.removeItem(keyCtxLastScore(ctx.id));
      localStorage.removeItem(keyCtxLastPlayed(ctx.id));
    });
    localStorage.removeItem(keyLevelBest());
    updateLevelBestBadge();
    renderSelector();
    alert("Progreso de n3 borrado (solo en este navegador).");
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

  if (btnFinishReading) btnFinishReading.addEventListener("click", () => finishReading(false));
  if (btnSubmit) btnSubmit.addEventListener("click", grade);

  // Botones que se inyectan dentro del resultEl (Reintentar / Volver)
  if (resultEl) {
    resultEl.addEventListener("click", (e) => {
      const b = e.target?.closest?.("button[data-action]");
      if (!b) return;

      const action = b.getAttribute("data-action");
      if (action === "retry") {
        if (!currentCtx) return;
        // Reintenta el mismo contexto (reinicia lectura con tiempo)
        startReading(currentCtx);
      } else if (action === "back") {
        // vuelve al selector
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
      }
    });
  }

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

  // ============================
  // Init
  // ============================
  function init() {
    const invalid = contexts.filter((c) => getWordCountFor(c) < MIN_WORDS);
    if (invalid.length) {
      console.warn(`Contextos n3 < ${MIN_WORDS} palabras:`, invalid.map((x) => x.id));
    }

    updateLevelBestBadge();
    renderSelector();
    show(viewSelector);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
