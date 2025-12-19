/* r1.js v8 - 30 sets + quiz robusto + "Ver ejemplo" en MODAL (X/backdrop/ESC) + fallback demo-box */
(() => {
  const CONFIG = {
    levelId: "r1",
    totalQuestions: 5,
    durationSec: 60,
    pointsCorrect: 20,
    passScore: 70,
    sets: Array.from({ length: 30 }, (_, i) => `s${i + 1}`),
    lsPrefix: "lx_logic_r1_",
  };

  const $id = (id) => document.getElementById(id);
  const $all = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const el = {
    bestBadge: $id("best-badge"),
    timerBadge: $id("timer-badge"),

    viewPick: $id("view-pick"),
    viewQuiz: $id("view-quiz"),
    viewResult: $id("view-result"),

    demoBox: $id("demo-box"),
    bankWarning: $id("bank-warning"),

    stage: $id("questions"),
    qProgressText: $id("q-progress-text"),
    qIdBadge: $id("q-id-badge"),
    qSetBadge: $id("q-set-badge"),
    qProgressFill: $id("q-progress-fill"),

    btnPrev: $id("btn-prev"),
    btnNext: $id("btn-next"),
    btnSubmit: $id("btn-submit"),
    btnFinish: $id("btn-finish"),
    btnRetry: $id("btn-retry"),
    btnBackSets: $id("btn-back-sets"),

    resultSummary: $id("result-summary"),
    resultReview: $id("result-review"),

    bottom: $id("rx-bottom"),
    bSet: $id("b-set"),
    bProgress: $id("b-progress"),
    bScore: $id("b-score"),
    bBest: $id("b-best"),
    bTimer: $id("b-timer"),
    bPrev: $id("b-prev"),
    bNext: $id("b-next"),
    bSubmit: $id("b-submit"),

    // Modal (si existe en tu HTML)
    exampleModal: $id("rx-example-modal"),
    exampleBody: $id("rx-example-body"),
  };

  const state = {
    bank: { all: [], sets: {} },
    selectedSetId: null,
    quiz: {
      questions: [],
      answers: [],
      idx: 0,
      score: 0,
      remaining: CONFIG.durationSec,
      timerId: null,
      started: false,
      finished: false,
    },
  };

  function show(node) { if (node) node.classList.remove("hidden"); }
  function hide(node) { if (node) node.classList.add("hidden"); }

  function mmss(sec) {
    const s = Math.max(0, sec | 0);
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (m) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[m]);
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // =========================
  // LocalStorage helpers
  // =========================
  function keyBestGlobal() { return `${CONFIG.lsPrefix}best_global`; }
  function keyBestSet(setId) { return `${CONFIG.lsPrefix}best_${setId}`; }
  function keyPassedSet(setId) { return `${CONFIG.lsPrefix}passed_${setId}`; }

  function loadNum(k, fallback = 0) {
    const v = Number(localStorage.getItem(k));
    return Number.isFinite(v) ? v : fallback;
  }

  function loadBool(k) {
    return localStorage.getItem(k) === "1";
  }

  function saveNum(k, n) {
    localStorage.setItem(k, String(Number(n) || 0));
  }

  function saveBool(k, b) {
    localStorage.setItem(k, b ? "1" : "0");
  }

  function bestGlobal() { return loadNum(keyBestGlobal(), 0); }
  function bestSet(setId) { return loadNum(keyBestSet(setId), 0); }

  // =========================
  // UI: top/bottom
  // =========================
  function setTopBadges() {
    const bg = bestGlobal();
    if (el.bestBadge) el.bestBadge.textContent = `Mejor r1: ${bg}/100`;
    if (el.bBest) el.bBest.textContent = `${bg}`;
  }

  function setTimerUI() {
    const t = mmss(state.quiz.remaining);
    if (el.timerBadge) el.timerBadge.textContent = `⏱️ ${t}`;
    if (el.bTimer) el.bTimer.textContent = t;

    if (!el.bTimer) return;
    el.bTimer.classList.remove("rx-timer--ok", "rx-timer--warn", "rx-timer--crit");
    if (state.quiz.remaining <= 10) el.bTimer.classList.add("rx-timer--crit");
    else if (state.quiz.remaining <= 20) el.bTimer.classList.add("rx-timer--warn");
    else el.bTimer.classList.add("rx-timer--ok");
  }

  function setScoreUI() {
    if (el.bScore) el.bScore.textContent = String(state.quiz.score);
  }

  function setProgressUI() {
    const x = state.quiz.idx + 1;
    const n = CONFIG.totalQuestions;
    const pct = Math.round((x / n) * 100);

    if (el.qProgressText) el.qProgressText.textContent = `${x}/${n}`;
    if (el.bProgress) el.bProgress.textContent = `${x}/${n}`;
    if (el.qProgressFill) el.qProgressFill.style.width = `${pct}%`;

    const q = state.quiz.questions[state.quiz.idx];
    if (el.qIdBadge) el.qIdBadge.textContent = q?.id || "r1q--";

    if (el.bPrev) el.bPrev.disabled = state.quiz.idx === 0;
    if (el.btnPrev) el.btnPrev.disabled = state.quiz.idx === 0;

    const isLast = state.quiz.idx === n - 1;
    if (el.bNext) el.bNext.classList.toggle("hidden", isLast);
    if (el.bSubmit) el.bSubmit.classList.toggle("hidden", !isLast);

    if (el.btnNext) el.btnNext.classList.toggle("hidden", isLast);
    if (el.btnSubmit) el.btnSubmit.classList.toggle("hidden", !isLast);
  }

  function setSetUI(setId) {
    if (el.qSetBadge) el.qSetBadge.textContent = `Set: ${setId || "--"}`;
    if (el.bSet) el.bSet.textContent = setId || "--";
  }

  // =========================
  // Bank detection + normalize
  // =========================
  function getBankSource() {
    const w = window;
    const direct =
      w.R1_SETS || w.R1_SETS_BANK || w.R1_BANK || w.R1_BANCO ||
      w.r1bank || w.r1banco || w.BANCO_R1 || w.bankR1 || null;

    if (direct) return direct;

    for (const k of Object.keys(w)) {
      if (!/r1/i.test(k)) continue;
      const v = w[k];
      if (Array.isArray(v)) return v;
      if (v && typeof v === "object") return v;
    }
    return null;
  }

  function normalizeQuestion(q, i) {
    if (!q || typeof q !== "object") return null;

    const id = String(q.id || q.qid || q.code || `r1q${String(i + 1).padStart(2, "0")}`);
    const series = String(q.series || q.prompt || q.serie || q.statement || "").trim();

    const optionsRaw = q.options || q.choices || q.opciones || q.alternativas || [];
    const options = Array.isArray(optionsRaw) ? optionsRaw.map(x => String(x)) : [];

    if (!series || options.length < 2) return null;

    let answerIndex = -1;
    if (Number.isInteger(q.answerIndex)) answerIndex = q.answerIndex;
    else if (Number.isInteger(q.answer)) answerIndex = q.answer;
    else if (Number.isInteger(q.correct)) answerIndex = q.correct;

    if (answerIndex >= 1 && answerIndex <= options.length) answerIndex = answerIndex - 1;

    if (answerIndex < 0 || answerIndex >= options.length) {
      const av = (q.answerValue ?? q.answer ?? q.correctValue ?? q.correct ?? q.correctAnswer);
      if (av !== undefined && av !== null) {
        const as = String(av);
        answerIndex = options.findIndex(o => String(o) === as);
      }
    }

    if (answerIndex < 0 || answerIndex >= options.length) return null;

    const explanation = String(q.explanation || q.explicacion || q.exp || "").trim();
    return { id, series, options, answerIndex, explanation };
  }

  function normalizeBank(src) {
    const out = { all: [], sets: {} };
    if (!src) return out;

    if (Array.isArray(src)) {
      out.all = src.map(normalizeQuestion).filter(Boolean);
      return out;
    }

    if (src && Array.isArray(src.questions)) {
      out.all = src.questions.map(normalizeQuestion).filter(Boolean);
      return out;
    }

    const container =
      (src && src.sets && typeof src.sets === "object") ? src.sets :
      (src && src.packs && typeof src.packs === "object") ? src.packs :
      src;

    if (!container || typeof container !== "object") return out;

    for (const sid of CONFIG.sets) {
      const candidates = [
        sid,
        sid.toUpperCase(),
        `r1${sid}`,
        `r1${sid}`.toUpperCase(),
        `r1${sid.replace("s", "S")}`,
        `r1s${sid.replace("s", "")}`,
        `r1S${sid.replace("s", "")}`,
        `set${sid.replace("s", "")}`,
        `pack${sid.replace("s", "")}`,
      ];

      let arr = null;
      for (const k of candidates) {
        if (Array.isArray(container[k])) { arr = container[k]; break; }
      }

      if (Array.isArray(arr) && arr.length) {
        const items = arr.map(normalizeQuestion).filter(Boolean);
        if (items.length) out.sets[sid] = items;
      }
    }

    const entries = Object.entries(container)
      .filter(([_, v]) => Array.isArray(v) && v.length)
      .filter(([k]) => /^r1s\d+$/i.test(k) || /^set\d+$/i.test(k) || /^pack\d+$/i.test(k));

    if (entries.length && Object.keys(out.sets).length === 0) {
      entries.forEach(([k, arr]) => {
        const m = String(k).match(/(\d+)/);
        const n = m ? m[1] : null;
        const sid = n ? `s${n}` : null;
        if (sid && CONFIG.sets.includes(sid)) {
          const items = arr.map(normalizeQuestion).filter(Boolean);
          if (items.length) out.sets[sid] = items;
        }
      });
    }

    const setsAll = Object.values(out.sets).flat();
    if (setsAll.length) {
      out.all = setsAll.slice();
      return out;
    }

    const fallback = Object.entries(container).find(([_, v]) => Array.isArray(v) && v.length >= 5);
    if (fallback) out.all = fallback[1].map(normalizeQuestion).filter(Boolean);

    return out;
  }

  // =========================
  // Cards UI (status/best)
  // =========================
  function updateCardsUI() {
    CONFIG.sets.forEach((sid) => {
      const best = bestSet(sid);
      const passed = loadBool(keyPassedSet(sid));

      const statusEl = document.querySelector(`[data-set-status="${sid}"]`);
      const bestEl = document.querySelector(`[data-set-best="${sid}"]`);

      if (statusEl) statusEl.textContent = passed ? "Aprobado" : "No aprobado";
      if (bestEl) bestEl.textContent = `Mejor: ${best}/100`;
    });

    setTopBadges();
  }

  // =========================
  // Example modal + demo fallback
  // =========================
  function hasExampleModal() {
    return !!(el.exampleModal && el.exampleBody);
  }

  function isExampleOpen() {
    if (!hasExampleModal()) return false;
    return !el.exampleModal.classList.contains("hidden");
  }

  function openExampleModal() {
    if (!hasExampleModal()) return;
    el.exampleModal.classList.remove("hidden");
    el.exampleModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeExampleModal() {
    if (!hasExampleModal()) return;
    el.exampleModal.classList.add("hidden");
    el.exampleModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (el.exampleBody) el.exampleBody.innerHTML = "";
  }

  function toggleDemo(showIt = null) {
    if (!el.demoBox) return;
    const willShow = (showIt === null) ? el.demoBox.classList.contains("hidden") : !!showIt;
    el.demoBox.classList.toggle("hidden", !willShow);
    el.demoBox.setAttribute("aria-hidden", willShow ? "false" : "true");
  }

  function closeExampleEverywhere() {
    closeExampleModal();
    toggleDemo(false);
  }

  function matchesCloseTarget(target) {
    if (!target) return false;
    const sel = [
      '[data-modal-close="1"]',
      ".rx-modal-close",
      ".rx-modal-x",
      "#rx-example-close",
      '[aria-label="Cerrar"]',
      '[aria-label="Close"]',
      '[aria-label="Cerrar modal"]',
    ].join(", ");
    return !!target.closest?.(sel);
  }

  function renderExample(setId) {
    const bySet = state.bank.sets?.[setId];
    const pool = (Array.isArray(bySet) && bySet.length) ? bySet : (state.bank.all || []);

    if (!pool.length) {
      const html = `
        <div class="rx-card">
          <div class="rx-q-title">
            <h3>Ejemplo</h3>
            <span class="badge badge--muted">${escapeHtml(setId || "--")}</span>
          </div>
          <p class="muted" style="margin:0;">No se encontró banco válido para este set.</p>
        </div>
      `;

      if (hasExampleModal()) {
        el.exampleBody.innerHTML = html;
        openExampleModal();
      } else if (el.demoBox) {
        el.demoBox.innerHTML = html;
        toggleDemo(true);
      }
      return;
    }

    const q = pool[Math.floor(Math.random() * pool.length)];
    const correctText = q?.options?.[q.answerIndex] ?? "—";

    const cardHtml = `
      <div class="rx-card">
        <div class="rx-q-title">
          <h3>Ejemplo · ${escapeHtml(setId)}</h3>
          <span class="badge badge--muted">${escapeHtml(q?.id || "r1q--")}</span>
        </div>

        <div class="rx-series">${escapeHtml(q?.series || "")}</div>
        <p class="rx-prompt">Respuesta correcta: <strong>${escapeHtml(correctText)}</strong></p>

        ${q?.explanation ? `<p class="muted" style="margin:8px 0 0;">${escapeHtml(q.explanation)}</p>` : ""}

        <div class="panel-actions" style="margin-top:12px;">
          <button class="btn btn--primary rx-start-set" type="button" data-set="${escapeHtml(setId)}">
            Iniciar este set
          </button>
          <button class="btn" type="button" data-modal-close="1">
            Cerrar
          </button>
        </div>
      </div>
    `;

    if (hasExampleModal()) {
      el.exampleBody.innerHTML = cardHtml;
      openExampleModal();
      return;
    }

    if (el.demoBox) {
      el.demoBox.innerHTML = cardHtml;
      toggleDemo(true);
    }
  }

  // =========================
  // Timer
  // =========================
  function stopTimer() {
    if (state.quiz.timerId) clearInterval(state.quiz.timerId);
    state.quiz.timerId = null;
  }

  function startTimer() {
    stopTimer();
    state.quiz.timerId = setInterval(() => {
      if (state.quiz.finished) return;
      state.quiz.remaining -= 1;
      setTimerUI();
      if (state.quiz.remaining <= 0) finishQuiz(true);
    }, 1000);
  }

  // =========================
  // Quiz render/logic
  // =========================
  function recomputeScore() {
    let s = 0;
    for (let i = 0; i < state.quiz.questions.length; i++) {
      const q = state.quiz.questions[i];
      const a = state.quiz.answers[i];
      if (a === q.answerIndex) s += CONFIG.pointsCorrect;
    }
    state.quiz.score = s;
  }

  function renderQuestion() {
    const q = state.quiz.questions[state.quiz.idx];
    if (!q || !el.stage) return;

    const selected = state.quiz.answers[state.quiz.idx];

    el.stage.innerHTML = `
      <article class="rx-q-card" role="group" aria-label="Pregunta ${state.quiz.idx + 1}">
        <div class="rx-q-title">
          <h3>Pregunta ${state.quiz.idx + 1}</h3>
          <span class="badge badge--muted">${escapeHtml(q.id)}</span>
        </div>

        <div class="rx-series">${escapeHtml(q.series)}</div>
        <p class="rx-prompt muted">Selecciona la opción que completa la serie.</p>

        <div class="rx-options">
          ${q.options.map((opt, i) => {
            const isSel = selected === i;
            return `
              <label class="rx-opt ${isSel ? "rx-opt--selected" : ""}" data-opt="${i}">
                <input type="radio" name="q_${state.quiz.idx}" value="${i}" ${isSel ? "checked" : ""}/>
                <span class="rx-opt-text">${escapeHtml(opt)}</span>
              </label>
            `;
          }).join("")}
        </div>
      </article>
    `;
  }

  function applyAnswer(i) {
    if (!Number.isFinite(i)) return;
    const q = state.quiz.questions[state.quiz.idx];
    if (!q) return;
    if (i < 0 || i >= q.options.length) return;

    state.quiz.answers[state.quiz.idx] = i;

    if (el.stage) {
      $all(".rx-opt", el.stage).forEach(x => x.classList.remove("rx-opt--selected"));
      const lab = el.stage.querySelector(`[data-opt="${i}"]`);
      if (lab) lab.classList.add("rx-opt--selected");
    }

    recomputeScore();
    setScoreUI();
  }

  function goTo(idx) {
    state.quiz.idx = Math.max(0, Math.min(CONFIG.totalQuestions - 1, idx));
    setProgressUI();
    renderQuestion();
  }

  function finishQuiz(fromTimeout) {
    if (state.quiz.finished) return;
    state.quiz.finished = true;
    stopTimer();

    hide(el.viewQuiz);
    show(el.viewResult);
    hide(el.bottom);

    recomputeScore();
    const score = state.quiz.score;
    const pass = score >= CONFIG.passScore;

    const correct = state.quiz.questions.reduce((acc, q, i) =>
      acc + ((state.quiz.answers[i] === q.answerIndex) ? 1 : 0), 0
    );

    const sid = state.selectedSetId || "s1";

    const prevBestSet = bestSet(sid);
    if (score > prevBestSet) saveNum(keyBestSet(sid), score);
    if (pass) saveBool(keyPassedSet(sid), true);

    const prevGlobal = bestGlobal();
    if (score > prevGlobal) saveNum(keyBestGlobal(), score);

    updateCardsUI();

    if (el.resultSummary) {
      el.resultSummary.innerHTML = `
        <div class="result-summary">
          <p style="margin:0;"><strong>${pass ? "✅ Aprobado" : "❌ No aprobado"}</strong></p>
          <p style="margin:6px 0 0;">Set: <strong>${escapeHtml(sid)}</strong></p>
          <p style="margin:6px 0 0;">Puntaje: <strong>${score}/100</strong></p>
          <p style="margin:6px 0 0;" class="muted">
            Correctas: ${correct}/${CONFIG.totalQuestions}
            ${fromTimeout ? "· Se envió por tiempo." : ""}
          </p>
        </div>
      `;
    }

    if (el.resultReview) {
      el.resultReview.innerHTML = state.quiz.questions.map((q, i) => {
        const a = state.quiz.answers[i];
        const user = (typeof a === "number" && q.options[a] !== undefined) ? q.options[a] : "—";
        const corr = q.options[q.answerIndex];
        const ok = (a === q.answerIndex);

        return `
          <div class="rx-q-card" style="margin:10px 0;">
            <div class="rx-q-title">
              <h3 style="font-size:16px;">Pregunta ${i + 1}</h3>
              <span class="badge badge--muted">${escapeHtml(q.id)}</span>
            </div>
            <div class="rx-series">${escapeHtml(q.series)}</div>
            <p style="margin:10px 0 0;" class="muted">Tu respuesta: <strong>${escapeHtml(user)}</strong> ${ok ? "✅" : "❌"}</p>
            <p style="margin:6px 0 0;" class="muted">Correcta: <strong>${escapeHtml(corr)}</strong></p>
            ${q.explanation ? `<p style="margin:10px 0 0;" class="muted">${escapeHtml(q.explanation)}</p>` : ""}
          </div>
        `;
      }).join("");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function pickPoolForSet(setId) {
    const bySet = state.bank.sets[setId];
    if (Array.isArray(bySet) && bySet.length) return bySet.slice();
    return state.bank.all.slice();
  }

  function startSet(setId) {
    closeExampleEverywhere();

    state.selectedSetId = setId;
    setSetUI(setId);
    hide(el.bankWarning);

    const pool = pickPoolForSet(setId);

    if (pool.length < CONFIG.totalQuestions) {
      show(el.bankWarning);
      if (el.bankWarning) {
        el.bankWarning.innerHTML = `No hay suficientes preguntas válidas para iniciar este set. Revisa <code>r1banco.js</code>.`;
      }
      return;
    }

    state.quiz.questions = shuffle(pool).slice(0, CONFIG.totalQuestions);
    state.quiz.answers = new Array(CONFIG.totalQuestions).fill(undefined);
    state.quiz.idx = 0;
    state.quiz.score = 0;
    state.quiz.remaining = CONFIG.durationSec;
    state.quiz.started = true;
    state.quiz.finished = false;

    hide(el.viewPick);
    hide(el.viewResult);
    show(el.viewQuiz);
    show(el.bottom);

    setScoreUI();
    setTopBadges();
    setTimerUI();
    setProgressUI();
    renderQuestion();
    startTimer();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function backToSets() {
    closeExampleEverywhere();

    stopTimer();
    state.quiz.started = false;
    state.quiz.finished = false;
    state.quiz.remaining = CONFIG.durationSec;
    setTimerUI();

    hide(el.viewQuiz);
    hide(el.viewResult);
    hide(el.bottom);
    show(el.viewPick);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // =========================
  // Bind events
  // =========================
  function bind() {
    show(el.viewPick);
    hide(el.viewQuiz);
    hide(el.viewResult);
    hide(el.bottom);

    const src = getBankSource();
    const norm = normalizeBank(src);

    state.bank.all = norm.all;
    state.bank.sets = norm.sets;

    if (!state.bank.all.length && Object.keys(state.bank.sets).length === 0) {
      show(el.bankWarning);
      if (el.bankWarning) {
        el.bankWarning.innerHTML = `No se detectó banco (o no hay preguntas válidas). Revisa <code>r1banco.js</code>.`;
      }
    } else {
      hide(el.bankWarning);
    }

    updateCardsUI();
    setTimerUI();

    // Modal: X / backdrop / botones close
    if (hasExampleModal()) {
      el.exampleModal.addEventListener("click", (ev) => {
        // Click en backdrop (contenedor)
        if (ev.target === el.exampleModal) {
          closeExampleModal();
          return;
        }
        // Click en X u otro close
        if (matchesCloseTarget(ev.target)) {
          ev.preventDefault();
          closeExampleModal();
        }
      });
    }

    // Delegación para escoger opción
    if (el.stage) {
      el.stage.addEventListener("click", (ev) => {
        if (!state.quiz.started || state.quiz.finished) return;
        const lab = ev.target?.closest?.("[data-opt]");
        if (!lab) return;
        const i = Number(lab.getAttribute("data-opt"));
        applyAnswer(i);
      });
    }

    document.addEventListener("click", (e) => {
      // Cerrar modal (botones dentro del body renderizado)
      if (matchesCloseTarget(e.target)) {
        closeExampleModal();
        toggleDemo(false);
        return;
      }

      const btnStart = e.target?.closest?.(".rx-start-set");
      if (btnStart) {
        const sid = btnStart.getAttribute("data-set") || "s1";
        startSet(sid);
        return;
      }

      const btnExample = e.target?.closest?.(".rx-view-example");
      if (btnExample) {
        const sid = btnExample.getAttribute("data-set") || "s1";
        renderExample(sid);
        return;
      }

      const btnHideExample = e.target?.closest?.(".rx-hide-example");
      if (btnHideExample) {
        toggleDemo(false);
        return;
      }
    });

    el.btnRetry?.addEventListener("click", () => {
      if (!state.selectedSetId) return backToSets();
      startSet(state.selectedSetId);
    });

    el.btnBackSets?.addEventListener("click", backToSets);

    const prev = () => goTo(state.quiz.idx - 1);
    const next = () => goTo(state.quiz.idx + 1);
    const submit = () => finishQuiz(false);

    el.btnPrev?.addEventListener("click", prev);
    el.bPrev?.addEventListener("click", prev);

    el.btnNext?.addEventListener("click", next);
    el.bNext?.addEventListener("click", next);

    el.btnSubmit?.addEventListener("click", submit);
    el.btnFinish?.addEventListener("click", submit);
    el.bSubmit?.addEventListener("click", submit);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isExampleOpen()) {
        closeExampleModal();
        return;
      }

      if (!state.quiz.started || state.quiz.finished) return;

      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Enter" && state.quiz.idx === CONFIG.totalQuestions - 1) submit();
      if (e.key === "Escape") backToSets();
    });

    window.__R1_READY = true;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }
})();
