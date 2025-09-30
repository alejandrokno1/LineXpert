/* ===== Nivel 3 · Multiplicación (parametrizable) =====
   - Siempre hay al menos un número decimal (decimal×entero o decimal×decimal)
   - Acepta resultados con DEC u 2*DEC decimales (se normaliza internamente)
   - Se aprueba con 1 acierto (PASS_OK = 1)
   - Persistencia: math_n3 (+10 puntos si es la 1ª aprobación del grupo)
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

  // ----- Estado / Config -----
  const LIMIT = 60;           // segundos
  const PASS_OK = 1;          // 1 acierto para superar

  // === CONFIGURABLES ===
  const DEC = 3;              // <<---- decimales de cada número (ej: 3 => 178.789)
  const INT_DIGITS = 3;       // <<---- dígitos de la parte entera (ej: 3 => 100..999)
  // ======================

  const SCALE  = 10 ** DEC;        // escala para DEC decimales (p.ej. 1_000)
  const SCALE2 = SCALE * SCALE;     // escala para 2*DEC decimales (p.ej. 1_000_000)

  const INT_MIN = 10 ** (INT_DIGITS - 1);
  const INT_MAX = (10 ** INT_DIGITS) - 1;

  let running = false, t0 = 0, tickId = null;
  let current = null;         // { aInt, bInt, showA, showB, isDecDec, prodInt2 }
  let ok = 0, tries = 0;

  // ----- Local record -----
  const recKey = (id) => `lx_math_record_${id}`;
  const n3Key = recKey('n3');
  function updateBestBadge() {
    try {
      const rec = JSON.parse(localStorage.getItem(n3Key) || 'null') || {};
      if (rec.bestApm) {
        $bestBadge.textContent =
          `✓ Superado · Mejor APM: ${Number(rec.bestApm).toFixed(2)} · Precisión: ${((rec.precision || 0)*100).toFixed(0)}%`;
      } else {
        $bestBadge.textContent = 'Sin récord';
      }
    } catch { $bestBadge.textContent = 'Sin récord'; }
  }
  function putRecord(data) { localStorage.setItem(n3Key, JSON.stringify(data)); }

  // ----- Utils -----
  const ri = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  function genDecInt() {
    // INT_MIN..INT_MAX y decimales 000..SCALE-1, evitando .000... si quieres:
    // Si prefieres permitir .000, cambia el 1 por 0:
    const intPart = ri(INT_MIN, INT_MAX);
    const decPart = ri(1, SCALE - 1);  // 1..(SCALE-1) => nunca .000
    return intPart * SCALE + decPart;  // entero escalado
  }
  function genIntAsScaled() {
    // entero INT_MIN..INT_MAX representado en escala DEC (termina en .000…)
    const intPart = ri(INT_MIN, INT_MAX);
    return intPart * SCALE;
  }

  function fmtFixedFromInt(intX) {
    const intPart = Math.floor(Math.abs(intX) / SCALE);
    const dec = String(Math.abs(intX) % SCALE).padStart(DEC, '0');
    const sgn = intX < 0 ? '-' : '';
    return `${sgn}${intPart}.${dec}`;
  }
  function fmtIntFromInt(intX) {
    const sgn = intX < 0 ? '-' : '';
    const val = Math.floor(Math.abs(intX) / SCALE);
    return `${sgn}${val}`;
  }

  // Normaliza la respuesta del usuario a escala 10^(2*DEC) (acepta DEC o 2*DEC decimales, y en general cualquiera)
  function parseToInt2DEC(str) {
    if (!str) return NaN;
    const s = String(str).trim()
      .replace(',', '.')      // coma → punto
      .replace(/\s+/g, '');   // sin espacios
    const v = Number(s);
    if (!Number.isFinite(v)) return NaN;

    const m = s.match(/\.(\d+)/);
    const decs = m ? m[1].length : 0;
    const targetDec = 2 * DEC;  // 6 si DEC=3
    if (decs >= targetDec) return Math.round(v * (10 ** targetDec));
    return Math.round(v * (10 ** decs)) * (10 ** (targetDec - decs));
  }

  function precision() { return tries ? ok / tries : 0; }
  function elapsedSec() { return running ? Math.max(0, (Date.now() - t0) / 1000) : 0; }
  function apm() { const s = Math.max(1e-6, elapsedSec()); return ok / (s/60); }

  function paintStats() {
    $ok.textContent = String(ok);
    $tries.textContent = String(tries);
    $prec.textContent = `${(precision()*100).toFixed(2)}%`;
    $apm.textContent = apm().toFixed(2);
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
    const mm = String(Math.floor(s/60)).padStart(2,'0');
    const ss = String(s%60).padStart(2,'0');
    return `${mm}:${ss}`;
  }

  // ----- Problemas (siempre hay decimales) -----
  function newProblem() {
    // A siempre decimal. B a veces entero (en escala), a veces decimal.
    const aInt = genDecInt();
    const decDec = Math.random() < 0.5; // true => decimal×decimal; false => decimal×entero

    const bInt = decDec ? genDecInt() : genIntAsScaled();

    const showA = fmtFixedFromInt(aInt);
    const showB = decDec ? fmtFixedFromInt(bInt) : fmtIntFromInt(bInt);

    // Producto en escala 10^(2*DEC)  (SCALE * SCALE)
    const prodInt2 = aInt * bInt;

    current = { aInt, bInt, showA, showB, isDecDec: decDec, prodInt2 };
    $eq.textContent = `${showA} × ${showB}`;
  }

  // ----- Timer -----
  function tick() {
    const e = elapsedSec();
    const left = Math.max(0, LIMIT - e);
    const pct = Math.min(100, (e / LIMIT) * 100);
    $timerPill.textContent = formatTime(left);
    $timerFill.style.width = `${pct}%`;
    if (left <= 0) endRound();
  }

  function startRound() {
    ok = 0; tries = 0; paintStats();
    setRunningUI(true);
    t0 = Date.now();
    newProblem();
    tick();
    tickId = setInterval(tick, 100);
  }

  // ----- Persistencia -----
  async function persistProgressToCloud({ bestApm, acc, tries, ok, passed }) {
    const payload = { apm: bestApm, acc, tries, ok, passed: !!passed, points: 10 };
    const doSave = async () => {
      try {
        if (window.LX?.saveProgress) {
          await window.LX.saveProgress('math_n3', payload);
          window.dispatchEvent(new CustomEvent('lx-progress-updated', {
            detail: { levelId: 'math_n3', payload }
          }));
        }
      } catch {}
    };
    if (window.LX?.saveProgress) await doSave();
    else {
      const once = () => { window.removeEventListener('lx-auth-ready', once); doSave(); };
      window.addEventListener('lx-auth-ready', once, { once: true });
    }
  }

  function endRound() {
    if (tickId) clearInterval(tickId);
    setRunningUI(false);

    const p = precision();
    const bestApm = apm();
    const passed = ok >= PASS_OK;

    const prev = JSON.parse(localStorage.getItem(n3Key) || 'null') || {};
    putRecord({
      bestApm: Math.max(prev.bestApm || 0, bestApm),
      precision: p,
      passed: prev.passed || passed,
      ts: Date.now()
    });
    updateBestBadge();

    if (typeof window.updateMathRecord === 'function') {
      window.updateMathRecord('n3', { bestApm, precision: p, passed });
    }
    persistProgressToCloud({ bestApm, acc: p, tries, ok, passed }).catch(()=>{});
  }

  // ----- Respuesta -----
  function submitAnswer() {
    if (!running) return;
    const userInt2 = parseToInt2DEC($ans.value);
    tries++;

    if (Number.isFinite(userInt2) && userInt2 === current.prodInt2) {
      ok++;
      $eq.classList.add('ok'); setTimeout(() => $eq.classList.remove('ok'), 120);
      newProblem();
      $ans.value = '';
    } else {
      $eq.classList.add('bad'); setTimeout(() => $eq.classList.remove('bad'), 160);
    }
    paintStats();
  }

  // ----- Eventos -----
  $btnStart.addEventListener('click', startRound);
  $btnSend.addEventListener('click', submitAnswer);
  $ans.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); submitAnswer(); }
  });
  $btnSkip.addEventListener('click', () => {
    if (!running) return;
    tries++; newProblem(); $ans.value=''; paintStats();
  });
  $btnReset.addEventListener('click', () => {
    if (tickId) clearInterval(tickId);
    setRunningUI(false);
    $timerPill.textContent = '01:00';
    $timerFill.style.width = '0%';
    ok = 0; tries = 0; paintStats();
    $eq.textContent = '— — —';
    $ans.value = '';
  });

  // ----- Inicio -----
  updateBestBadge();
  $eq.textContent = '— — —';
  $timerPill.textContent = '01:00';
  $timerFill.style.width = '0%';
  paintStats();
})();
