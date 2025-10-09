/* Nivel 9 • Elegir la operación (IR 1.2)
   - Banco externo: banco9.json
   - Cronómetro 1:00, aprueba con ≥2 aciertos
   - Local: guarda récord/estado para que la grilla pinte "✓ Superado"
   - Cloud: LX.saveProgress('math_n9', { apm, acc, passed, points:10 })
*/

(() => {
  // ===== Config =====
  const LEVEL_ID   = 'n9';
  const CANON_ID   = 'math_n9';
  const PASS_HITS  = 11;
  const TOTAL_TIME = 60; // s
  const ONE_TIME_POINTS = 10;

  // ===== DOM =====
  const $ = (s) => document.querySelector(s);
  const $timer = $("#timer");
  const $hits  = $("#hits");
  const $acc   = $("#accuracy");
  const $apm   = $("#apm");
  const $bestApm = $("#bestApm");
  const $bestAcc = $("#bestAcc");

  const $startCard = $("#startCard");
  const $playCard  = $("#playCard");
  const $endCard   = $("#endCard");

  const $problemText = $("#problemText");
  const $choices = Array.from(document.querySelectorAll(".choice"));
  const $feedback = $("#feedback");
  const $progressBar = $("#progressBar");

  const $btnStart = $("#btnStart");
  const $btnRetry = $("#btnRetry");
  const $endSummary = $("#endSummary");
  const $endHits = $("#endHits");
  const $endAcc  = $("#endAcc");
  const $endApm  = $("#endApm");

  // ===== Estado =====
  let BANK = [];
  let lastIdx = -1;
  let timeLeft = TOTAL_TIME;
  let timerId = null;
  let hits = 0;
  let total = 0;
  let startedAt = 0;

  // ===== Utils =====
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const fmtPct = (x) => `${(x*100).toFixed(0)}%`;

  // ——— almacenamiento local compatible con la grilla
  const LOCAL_KEY = `lx_math_record_${LEVEL_ID}`;
  const readLocal = () => {
    try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || 'null'); }
    catch { return null; }
  };
  function writeLocal({ bestApm, precision, passed }) {
    const prev = readLocal() || {};
    const merged = {
      bestApm: Math.max(Number(prev.bestApm) || 0, Number(bestApm) || 0),
      precision: Number.isFinite(precision) ? precision : (Number(prev.precision) || 0),
      passed: Boolean(passed) || Boolean(prev.passed),
      ts: Date.now(),
    };
    localStorage.setItem(LOCAL_KEY, JSON.stringify(merged));
  }
  function refreshBestUI() {
    const rec = readLocal();
    $bestApm.textContent = rec?.bestApm != null ? Number(rec.bestApm).toFixed(2) : '—';
    $bestAcc.textContent = rec?.precision != null ? `${Math.round(rec.precision*100)}%` : '—';
  }

  function setTimerText(s) {
    const m = Math.floor(s / 60);
    const sec = String(s % 60).padStart(2, "0");
    $timer.textContent = `${m}:${sec}`;
  }

  function updateMeta() {
    const acc = total ? hits / total : 0;
    $hits.textContent = hits;
    $acc.textContent = fmtPct(acc);
    const elapsed = Math.max(1e-6, (TOTAL_TIME - timeLeft) / 60);
    const apmVal = hits / elapsed;
    $apm.textContent = apmVal.toFixed(2);
    return { acc, apmVal };
  }

  function tick() {
    timeLeft--;
    setTimerText(timeLeft);
    const progress = clamp((TOTAL_TIME - timeLeft) / TOTAL_TIME, 0, 1);
    $progressBar.style.width = `${progress*100}%`;
    if (timeLeft <= 0) { clearInterval(timerId); finish(); }
  }

  // ===== Banco (JSON) =====
  async function loadBankJson() {
    if (BANK.length) return;
    try {
      const res = await fetch("./banco9.json", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data) || !data.length) throw new Error("Banco vacío");
      BANK = data;
    } catch (err) {
      console.warn("No se pudo cargar banco9.json. Usando fallback.", err);
      BANK = [
        { texto: "Compras 3 cuadernos y 2 libros. ¿Qué operación usas?", opCorrecta: "+", explicacion: "Total → Suma." },
        { texto: "Tienes 20 y gastas 6. ¿Qué operación usas para saber cuánto queda?", opCorrecta: "-", explicacion: "Faltante → Resta." },
        { texto: "Cada caja trae 8 vasos y compras 4. ¿Qué operación da el total?", opCorrecta: "*", explicacion: "Repetición → Multiplicación." },
        { texto: "Repartes 30 dulces entre 5. ¿Qué operación te dice cuántos a cada uno?", opCorrecta: "/", explicacion: "Partes iguales → División." }
      ];
    }
  }

  function nextProblem() {
    if (!BANK.length) {
      $problemText.textContent = "Banco vacío. Verifica banco9.json.";
      $problemText.dataset.answer = "+";
      $problemText.dataset.exp = "Agrega ítems al JSON.";
      return;
    }
    let idx = Math.floor(Math.random() * BANK.length);
    if (BANK.length > 1 && idx === lastIdx) idx = (idx + 1) % BANK.length;
    lastIdx = idx;

    const p = BANK[idx];
    $problemText.textContent = p.texto;
    $problemText.dataset.answer = p.opCorrecta;
    $problemText.dataset.exp = p.explicacion || "";
    $feedback.textContent = " ";
    $feedback.className = "feedback";
    $choices.forEach(c => c.classList.remove("is-correct","is-wrong"));
  }

  // ===== Juego =====
  async function start() {
    await loadBankJson();
    hits = 0; total = 0; timeLeft = TOTAL_TIME; lastIdx = -1;
    setTimerText(timeLeft);
    startedAt = performance.now();

    $startCard.classList.add("is-hidden");
    $endCard.classList.add("is-hidden");
    $playCard.classList.remove("is-hidden");

    refreshBestUI();
    updateMeta();
    nextProblem();

    clearInterval(timerId);
    timerId = setInterval(tick, 1000);
  }

  function choose(op) {
    if ($playCard.classList.contains("is-hidden")) return;
    total++;

    const correct = $problemText.dataset.answer;
    const exp = $problemText.dataset.exp;
    const clicked = $choices.find(c => c.dataset.op === op);
    $choices.forEach(c => c.classList.remove("is-correct","is-wrong"));

    if (op === correct) {
      hits++;
      clicked?.classList.add("is-correct");
      $feedback.textContent = "¡Bien! " + exp;
      $feedback.classList.add("feedback--ok");
    } else {
      clicked?.classList.add("is-wrong");
      const rightBtn = $choices.find(c => c.dataset.op === correct);
      rightBtn?.classList.add("is-correct");
      $feedback.textContent = "Ups… " + exp;
      $feedback.classList.add("feedback--bad");
    }

    updateMeta();
    setTimeout(nextProblem, 600);
  }

  async function finish() {
    $playCard.classList.add("is-hidden");
    $endCard.classList.remove("is-hidden");

    const acc = total ? hits/total : 0;
    const elapsedMin = Math.max(1e-6, (performance.now() - startedAt) / 60000);
    const apmVal = hits / elapsedMin;
    const passed = hits >= PASS_HITS;

    // Resumen en pantalla
    $endSummary.textContent = passed
      ? `¡Aprobaste! (${hits} aciertos en 1:00).`
      : `No alcanzaste el mínimo. Lograste ${hits} aciertos.`;
    $endHits.textContent = String(hits);
    $endAcc.textContent  = `${Math.round(acc*100)}%`;
    $endApm.textContent  = apmVal.toFixed(2);

    // 1) Guardar local (para que la grilla pinte ✓ y muestre récord)
    writeLocal({ bestApm: apmVal, precision: acc, passed });
    // (si la grilla expuso la API pública, úsala también)
    try { window.updateMathRecord?.(LEVEL_ID, { bestApm: apmVal, precision: acc, passed }); } catch {}

    // 2) Guardar en nube y otorgar puntos (saveProgress ya deduplica)
    await saveCloud({ apm: +apmVal.toFixed(2), acc, passed, tries: total, ok: hits });

    // 3) Actualizar "mejores" mostrados
    refreshBestUI();
  }

  // ===== Cloud (usa LX.saveProgress) =====
  async function saveCloud({ apm, acc, passed, tries, ok }) {
    const LX = window.LX;
    if (!LX?.saveProgress) return;
    try {
      // points:10 -> saveProgress otorga +10 si es la primera aprobación del grupo
      const res = await LX.saveProgress(CANON_ID, { apm, acc, passed, tries, ok, points: ONE_TIME_POINTS });
      // Notifica a la UI contenedora (grilla) para refrescar tarjetas y puntos
      try {
        window.dispatchEvent(new CustomEvent('lx-progress-updated', { detail: { levelId: CANON_ID } }));
      } catch {}
      return res;
    } catch (e) {
      console.warn('No se pudo guardar progreso en nube:', e);
    }
  }

  // ===== Wire-up =====
  $btnStart?.addEventListener("click", start);
  $btnRetry?.addEventListener("click", start);
  $choices.forEach(btn => btn.addEventListener("click", () => choose(btn.dataset.op)));

  // Atajos de teclado: + - * / x
  window.addEventListener('keydown', (ev) => {
    const map = { '+': '+', '-': '-', '*': '*', '/': '/', 'x': '*', 'X': '*' };
    const op = map[ev.key];
    if (op) { ev.preventDefault(); choose(op); }
  });

  // Precarga de banco y “mejor” visible
  loadBankJson();
  refreshBestUI();
})();
