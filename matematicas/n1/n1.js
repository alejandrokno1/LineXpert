/* ===== Nivel 1 · Sumas: 4 cifras con 4 decimales =====
   - No muestra ejercicio hasta presionar "Iniciar".
   - Lógica de juego + persistencia en Firestore (math_n1).
*/
(function () {
  // ----- DOM -----
  const $eq = document.getElementById('equation');
  const $ans = document.getElementById('answer');
  const $btnStart = document.getElementById('btnStart');
  const $btnSend  = document.getElementById('btnSend');
  const $btnSkip  = document.getElementById('btnSkip');
  const $btnReset = document.getElementById('btnReset');
  const $timerPill = document.getElementById('timerPill');
  const $timerFill = document.getElementById('timerFill');
  const $ok = document.getElementById('ok');
  const $tries = document.getElementById('tries');
  const $prec = document.getElementById('prec');
  const $apm = document.getElementById('apm');
  const $bestBadge = document.getElementById('bestBadge');

  // ----- Estado -----
  const LIMIT = 60;               // segundos
  let running = false;
  let t0 = 0;
  let tickId = null;
  let current = null;             // {a,b,sumInt}
  let ok = 0, tries = 0;

  // ----- Persistencia local para feedback inmediato -----
  const recKey = (id) => `lx_math_record_${id}`;
  const n1Key = recKey('n1');

  function getRecord() {
    try { return JSON.parse(localStorage.getItem(n1Key) || 'null'); }
    catch { return null; }
  }
  function putRecord(data) { localStorage.setItem(n1Key, JSON.stringify(data)); }

  // Sanea récords viejos (por el bug del APM enorme)
  function sanitizeRecord(rec){
    if (!rec) return null;
    const out = {...rec};
    if (!Number.isFinite(out.bestApm) || out.bestApm > 300) out.bestApm = 0; // umbral razonable
    if (!Number.isFinite(out.precision) || out.precision < 0 || out.precision > 1) out.precision = 0;
    return out;
  }

  function updateBestBadge() {
    const recRaw = getRecord();
    const rec = sanitizeRecord(recRaw);
    if (rec !== recRaw) putRecord(rec); // guarda saneado

    if (!rec) {
      $bestBadge.textContent = 'Sin récord';
      return;
    }
    const bestApm = rec.bestApm ?? 0;
    const precision = rec.precision ?? 0;
    const passedTxt = rec.passed ? '✓ Superado · ' : '';
    $bestBadge.textContent = `${passedTxt}Mejor APM: ${bestApm.toFixed(2)} · Precisión: ${(precision*100).toFixed(0)}%`;
  }

  // ----- Utilidades numéricas -----
  function randInt(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min; }

  // Números en diezmilésimos para exactitud
  function genOperandInt() {
    const intPart = randInt(1000, 9999);
    const decPart = randInt(0, 9999);
    return intPart * 10000 + decPart;
  }
  function fmtFixed4FromInt(x) {
    const sgn = x < 0 ? "-" : "";
    x = Math.abs(x);
    const intPart = Math.floor(x / 10000);
    const dec = (x % 10000).toString().padStart(4, '0');
    return `${sgn}${intPart}.${dec}`;
  }
  function parseAnswerToInt(str) {
    if (!str) return NaN;
    const s = String(str).trim().replace(',', '.');
    const v = Number(s);
    if (!Number.isFinite(v)) return NaN;
    return Math.round(v * 10000);
  }

  function newProblem() {
    const a = genOperandInt();
    const b = genOperandInt();
    current = { a, b, sumInt: a + b };
    $eq.textContent = `${fmtFixed4FromInt(a)} + ${fmtFixed4FromInt(b)}`;
  }

  function precision() { return tries ? ok / tries : 0; }

  // tiempo transcurrido en segundos (vivo, sin depender de running)
  function elapsedSecNow() {
    return t0 ? Math.max(0, (Date.now() - t0) / 1000) : 0;
  }

  // APM robusto (clamp de segundos a [1..LIMIT] para evitar explosiones)
  function computeAPM(okCount, secs) {
    const s = Math.min(LIMIT, Math.max(1, secs));
    return okCount / (s / 60);
  }

  function apmLive() {
    return computeAPM(ok, elapsedSecNow());
  }

  function paintStats() {
    $ok.textContent = String(ok);
    $tries.textContent = String(tries);
    $prec.textContent = `${(precision()*100).toFixed(2)}%`;
    $apm.textContent = apmLive().toFixed(2);
  }

  function setRunningUI(on) {
    running = on;
    $ans.disabled = !on;
    $btnSend.disabled = !on;
    $btnSkip.disabled = !on;
    $btnStart.disabled = on;
    if (on) $ans.focus();
  }

  function formatTime(s) {
    s = Math.max(0, Math.ceil(s));
    const mm = String(Math.floor(s / 60)).padStart(2,'0');
    const ss = String(s % 60).padStart(2,'0');
    return `${mm}:${ss}`;
  }

  function startRound() {
    ok = 0; tries = 0;
    paintStats();

    setRunningUI(true);
    t0 = Date.now();
    newProblem();                      // <-- primera operación aparece aquí
    tick();
    tickId = setInterval(tick, 100);
  }

  // ----- Persistencia en Firestore -----
  async function persistProgressToCloud({ bestApm, acc, tries, ok, passed }) {
    const payload = {
      apm: bestApm,
      acc,              // 0..1
      tries,
      ok,
      passed: !!passed,
      points: 10        // auth.js decidirá si otorga (anti-doble)
    };

    const doSave = async () => {
      try {
        if (window.LX?.saveProgress) {
          await window.LX.saveProgress('math_n1', payload);
          // Notifica a la pantalla de niveles (para pintar “✓ Superado”)
          window.dispatchEvent(new CustomEvent('lx-progress-updated', {
            detail: { levelId: 'math_n1', payload }
          }));
        }
      } catch (e) {/* opcional: console.warn(e) */}
    };

    if (window.LX?.saveProgress) {
      await doSave();
    } else {
      const once = () => { window.removeEventListener('lx-auth-ready', once); doSave(); };
      window.addEventListener('lx-auth-ready', once, { once: true });
    }
  }

  function endRound() {
    if (tickId) clearInterval(tickId);

    // ⬅️ Calcula métricas ANTES de desactivar UI y con tiempo real
    const secs = elapsedSecNow();
    const p = precision();
    const apmNow = computeAPM(ok, secs);
    const passed = ok >= 2;

    setRunningUI(false);

    // Record local (con saneo del bug previo)
    const prevRaw = getRecord() || {};
    const prev = sanitizeRecord(prevRaw) || {};
    const bestApm = Math.max(prev.bestApm || 0, apmNow);

    const newRec = {
      bestApm,
      precision: p,
      passed: prev.passed || passed,
      ts: Date.now()
    };
    putRecord(newRec);
    updateBestBadge();

    // UI legacy de la página de niveles (si existe)
    if (typeof window.updateMathRecord === 'function') {
      window.updateMathRecord('n1', { bestApm: apmNow, precision: p, passed });
    }

    // Persistencia en Firestore (canónico math_n1)
    persistProgressToCloud({ bestApm: apmNow, acc: p, tries, ok, passed }).catch(()=>{});
  }

  function tick() {
    const e = elapsedSecNow();
    const left = Math.max(0, LIMIT - e);
    const pct = Math.min(100, (e / LIMIT) * 100);
    $timerPill.textContent = formatTime(left);
    $timerFill.style.width = `${pct}%`;
    if (left <= 0) endRound();
  }

  // ----- Eventos -----
  $btnStart.addEventListener('click', () => startRound());

  $btnReset.addEventListener('click', () => {
    if (tickId) clearInterval(tickId);
    setRunningUI(false);
    $timerPill.textContent = "01:00";
    $timerFill.style.width = "0%";
    ok = 0; tries = 0;
    paintStats();
    $eq.textContent = "— — —";       // <-- sin operación
    $ans.value = "";
  });

  function submitAnswer() {
    if (!running) return;
    const user = parseAnswerToInt($ans.value);
    tries++;
    if (Number.isFinite(user) && user === current.sumInt) {
      ok++;
      $eq.classList.add('ok'); setTimeout(() => $eq.classList.remove('ok'), 120);
      newProblem();
      $ans.value = "";
    } else {
      $eq.classList.add('bad'); setTimeout(() => $eq.classList.remove('bad'), 160);
    }
    paintStats();
  }

  $btnSend.addEventListener('click', submitAnswer);
  $ans.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); submitAnswer(); } });

  $btnSkip.addEventListener('click', () => {
    if (!running) return;
    tries++; newProblem(); $ans.value = ""; paintStats();
  });

  // ----- Inicio (sin ejercicio visible) -----
  updateBestBadge();                    // mostrará "✓ Superado · ..." si ya pasó
  $eq.textContent = "— — —";
  $timerPill.textContent = "01:00";
  $timerFill.style.width = "0%";
  paintStats();
})();
