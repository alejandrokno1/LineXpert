/* ===== Nivel 2 · Restas con signo (3 enteros, 3 decimales) =====
   - Siempre aparece un “−” (operador o signo de un operando)
   - Persistencia en Firestore (math_n2)
*/
(function () {
  // ----- DOM -----
  const $eq = document.getElementById('equation');
  const $ans = document.getElementById('answer');
  const $btnMinus = document.getElementById('btnMinus'); // botón para insertar "−"
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
  const LIMIT = 60; // s
  let running = false, t0 = 0, tickId = null;
  let current = null; // {aInt, bInt, op: '+'|'-', showA, showB, sumInt}
  let ok = 0, tries = 0;

  // ----- Utils -----
  const SCALE = 1000; // 3 decimales
  const recKey = (id) => `lx_math_record_${id}`;
  const n2Key = recKey('n2');

  const randInt = (min, max) => Math.floor(Math.random()*(max-min+1))+min;

  function genMagInt3() {
    // 3 enteros (100..999) + 3 decimales (000..999)
    const intPart = randInt(100, 999);
    const decPart = randInt(0, 999);
    return intPart * SCALE + decPart;
  }
  function fmtFixed3FromIntSigned(x) {
    const sgn = x < 0 ? '-' : '';
    x = Math.abs(x);
    const intPart = Math.floor(x / SCALE);
    const dec = String(x % SCALE).padStart(3, '0');
    return `${sgn}${intPart}.${dec}`;
  }

  // Normaliza cualquier variante de "menos" a '-'
  function normalizeMinus(str) {
    // \u2212 minus, \u2010-\u2015 guiones tipográficos, \uFE58 \uFE63 \uFF0D variantes fullwidth
    return String(str).replace(/[-\u2212\u2010-\u2015\uFE58\uFE63\uFF0D]/g, '-');
  }

  // Acepta negativos escritos con distintas variantes de "menos"
  function parseAnswerToInt3(str) {
    if (!str) return NaN;
    const s = normalizeMinus(str)
      .trim()
      .replace(',', '.')
      .replace(/\s+/g, '');
    const v = Number(s);
    if (!Number.isFinite(v)) return NaN;
    return Math.round(v * SCALE);
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

  function updateBestBadge() {
    try {
      const rec = JSON.parse(localStorage.getItem(n2Key) || 'null') || {};
      if (rec.passed || rec.bestApm || rec.precision) {
        const bestApm = rec.bestApm ?? 0;
        const precision = rec.precision ?? 0;
        $bestBadge.textContent =
          `✓ Superado · Mejor APM: ${bestApm.toFixed(2)} · Precisión: ${(precision*100).toFixed(0)}%`;
      } else {
        $bestBadge.textContent = 'Sin récord';
      }
    } catch {
      $bestBadge.textContent = 'Sin récord';
    }
  }
  function putRecord(data){ localStorage.setItem(n2Key, JSON.stringify(data)); }

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

  // --------- SIEMPRE CON “−” ---------
  function newProblem() {
    const A = genMagInt3();
    const B = genMagInt3();

    // 0: (-A) + B     1: (-A) - B     2: A - B  (siempre hay "−" como signo u operador)
    const mode = randInt(0, 2);

    let aInt, bInt, op;
    if (mode === 0) {
      aInt = -A; bInt =  B; op = '+';
    } else if (mode === 1) {
      aInt = -A; bInt =  B; op = '-';
    } else {
      aInt =  A;  bInt =  B; op = '-';
    }

    const showA = fmtFixed3FromIntSigned(aInt);
    const showB = fmtFixed3FromIntSigned(bInt);
    const sumInt = (op === '+') ? (aInt + bInt) : (aInt - bInt);

    current = { aInt, bInt, op, showA, showB, sumInt };
    $eq.textContent = `${showA} ${op} ${showB}`;
  }

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

  async function persistProgressToCloud({ bestApm, acc, tries, ok, passed }) {
    const payload = { apm: bestApm, acc, tries, ok, passed: !!passed, points: 10 };
    const doSave = async () => {
      try {
        if (window.LX?.saveProgress) {
          await window.LX.saveProgress('math_n2', payload);
          window.dispatchEvent(new CustomEvent('lx-progress-updated', {
            detail: { levelId: 'math_n2', payload }
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
    const passed = ok >= 2;

    const prev = JSON.parse(localStorage.getItem(n2Key) || 'null') || {};
    putRecord({
      bestApm: Math.max(prev.bestApm || 0, bestApm),
      precision: p,
      passed: prev.passed || passed,
      ts: Date.now()
    });
    updateBestBadge();

    if (typeof window.updateMathRecord === 'function') {
      window.updateMathRecord('n2', { bestApm, precision: p, passed });
    }
    persistProgressToCloud({ bestApm, acc: p, tries, ok, passed }).catch(()=>{});
  }

  function submitAnswer() {
    if (!running) return;
    const user = parseAnswerToInt3($ans.value);
    tries++;
    if (Number.isFinite(user) && user === current.sumInt) {
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

  // Botón “−” para iPhone/teclados sin menos
  if ($btnMinus) {
    $btnMinus.addEventListener('click', () => {
      const v = $ans.value || '';
      $ans.value = v.startsWith('-') ? v.slice(1) : '-' + v;
      $ans.focus();
      $ans.selectionStart = $ans.selectionEnd = $ans.value.length;
    });
  }

  // Inicio
  updateBestBadge();
  $eq.textContent = '— — —';
  $timerPill.textContent = '01:00';
  $timerFill.style.width = '0%';
  paintStats();
})();
