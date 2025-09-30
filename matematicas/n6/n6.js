/* ===== Nivel 6 · Notación científica =====
   - Convierte entre número decimal y notación científica.
   - Acepta formatos: "a×10^n", "a x 10^n", "a*10^n", "a e n", "aEn" y número decimal.
   - Modo estricto: exige forma canónica a×10^n con 1 ≤ a < 10 y n ∈ Z.
   - Aprobación por defecto: 3 aciertos en 1:00.
   - Persistencia: math_n6 (+10 pts si es la primera aprobación del grupo).
*/
(function () {
  // ----- DOM -----
  const $eq        = document.getElementById('equation');
  const $ans       = document.getElementById('answer');
  const $btnStart  = document.getElementById('btnStart');
  const $btnSend   = document.getElementById('btnSend');
  const $btnSkip   = document.getElementById('btnSkip');
  const $btnReset  = document.getElementById('btnReset');
  const $timerPill = document.getElementById('timerPill');
  const $timerFill = document.getElementById('timerFill');
  const $ok        = document.getElementById('ok');
  const $tries     = document.getElementById('tries');
  const $prec      = document.getElementById('prec');
  const $apm       = document.getElementById('apm');
  const $bestBadge = document.getElementById('bestBadge');

  // Checkbox de modo estricto (varios ids posibles para ser compatible)
  const $strict =
    document.getElementById('strictMode') ||
    document.getElementById('strictToggle') ||
    document.querySelector('input[type=checkbox][data-strict]') ||
    null;

  // ----- Estado -----
  const LIMIT   = 60; // segundos
  const PASS_OK = 3;  // aciertos para aprobar
  let running = false, t0 = 0, tickId = null;
  let current = null; // { mode: 'toSci'|'toDec', value, mant, exp, prompt }
  let ok = 0, tries = 0;

  // ----- Local record (para la chapa) -----
  const recKey = (id) => `lx_math_record_${id}`;
  const n6Key = recKey('n6');

  function updateBestBadge() {
    try {
      const rec = JSON.parse(localStorage.getItem(n6Key) || 'null') || {};
      let best = Number(rec.bestApm) || 0;
      // Sanea récords corruptos (p.ej. APM gigantes)
      if (!Number.isFinite(best) || best > 1000 || best < 0) {
        best = 0;
        localStorage.setItem(n6Key, JSON.stringify({
          bestApm: 0,
          precision: rec.precision || 0,
          passed: rec.passed || false,
          ts: Date.now()
        }));
      }
      if (best > 0) {
        $bestBadge.textContent =
          `✓ Superado · Mejor APM: ${best.toFixed(2)} · Precisión: ${((rec.precision || 0) * 100).toFixed(0)}%`;
      } else {
        $bestBadge.textContent = 'Sin récord';
      }
    } catch {
      $bestBadge.textContent = 'Sin récord';
    }
  }
  function putRecord(data) { localStorage.setItem(n6Key, JSON.stringify(data)); }

  // ----- Utilidades comunes -----
  const ri = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

  // Tiempo transcurrido independiente de "running"
  function elapsedSec() {
    if (!t0) return 0;
    return Math.max(0, (Date.now() - t0) / 1000);
  }
  function apmLive() {
    const s = elapsedSec();
    if (s <= 0) return 0;
    return ok / (s / 60);
  }

  function precision() { return tries ? ok / tries : 0; }
  function paintStats() {
    $ok.textContent    = String(ok);
    $tries.textContent = String(tries);
    $prec.textContent  = `${(precision() * 100).toFixed(2)}%`;
    $apm.textContent   = apmLive().toFixed(2);
  }
  function setRunningUI(on) {
    running = on;
    $ans.disabled     = !on;
    $btnSend.disabled = !on;
    $btnSkip.disabled = !on;
    $btnStart.disabled=  on;
    if (on) $ans.focus();
  }
  function formatTime(s) {
    s = Math.max(0, Math.ceil(s));
    const mm = String(Math.floor(s / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  }

  // ----- Notación científica -----
  // Devuelve {mant, exp} en forma canónica (1 ≤ |mant| < 10, exp ∈ Z) para v ≠ 0
  function toCanonicalMantExp(v) {
    if (v === 0) return { mant: 0, exp: 0 };
    const sign = v < 0 ? -1 : 1;
    let av = Math.abs(v);
    let exp = 0;
    while (av >= 10) { av /= 10; exp++; }
    while (av > 0 && av < 1) { av *= 10; exp--; }
    return { mant: sign * av, exp };
  }

  // Formatea "a×10^n" con n entero
  function sciString(mant, exp, digits = 6) {
    return `${mant.toFixed(digits).replace(/\.?0+$/, '')}×10^${exp}`;
  }

  // Parsing de respuesta del usuario → valor numérico (no estricto)
  function parseUserValue(str) {
    if (!str) return null;
    const s = String(str).trim()
      .replace(',', '.')
      .replace(/\s+/g, '');

    if (!s) return null;

    // Formato con "e" o "E"
    if (/e/i.test(s)) {
      const v = Number(s);
      return Number.isFinite(v) ? v : null;
    }

    // Formatos tipo a×10^n, a x 10^n, a*10^n
    const m = s.match(/^([+-]?\d+(?:\.\d+)?)(?:x|×|\*)?10\^([+-]?\d+)$/i);
    if (m) {
      const a = Number(m[1]);
      const n = parseInt(m[2], 10);
      if (!Number.isFinite(a) || !Number.isFinite(n)) return null;
      return a * Math.pow(10, n);
    }

    // Número decimal directo
    const v = Number(s);
    return Number.isFinite(v) ? v : null;
  }

  // Parsing a {mant, exp} para comparar en estricto
  function parseMantExp(str) {
    if (!str) return null;
    const s = String(str).trim()
      .replace(',', '.')
      .replace(/\s+/g, '');

    // e/E
    if (/e/i.test(s)) {
      const v = Number(s);
      if (!Number.isFinite(v)) return null;
      return toCanonicalMantExp(v);
    }

    // a×10^n
    const m = s.match(/^([+-]?\d+(?:\.\d+)?)(?:x|×|\*)?10\^([+-]?\d+)$/i);
    if (m) {
      const a = Number(m[1]);
      const n = parseInt(m[2], 10);
      if (!Number.isFinite(a) || !Number.isFinite(n)) return null;
      return toCanonicalMantExp(a * Math.pow(10, n));
    }

    // número decimal
    const v = Number(s);
    if (!Number.isFinite(v)) return null;
    return toCanonicalMantExp(v);
  }

  // ----- Generación de problemas -----
  function newProblem() {
    // Rango acotado para que sea cómodo (evita overflow y formatos raros)
    const exp = ri(-6, 6);
    // mantisa con 3-6 cifras significativas
    const mant = (ri(1000, 999999) / 10 ** ri(3, 6)); // ~[0.001 .. 999.999]
    // Llévalo a canónica y reconstruye el valor
    const can = toCanonicalMantExp(mant * Math.pow(10, exp));
    const value = can.mant * Math.pow(10, can.exp);

    // 50/50: decimal→científica o científica→decimal
    const toSci = Math.random() < 0.5;

    if (toSci) {
      // Muestra decimal → pide científica
      current = {
        mode: 'toSci',
        value,
        mant: can.mant,
        exp:  can.exp,
        prompt: `${Number(value.toPrecision(8)).toString()} = ?`
      };
    } else {
      // Muestra científica → pide decimal
      current = {
        mode: 'toDec',
        value,
        mant: can.mant,
        exp:  can.exp,
        prompt: `${sciString(can.mant, can.exp)} = ?`
      };
    }
    $eq.textContent = current.prompt;
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

  // ----- Persistencia (Firestore) -----
  async function persistProgressToCloud({ bestApm, acc, tries, ok, passed }) {
    const payload = { apm: bestApm, acc, tries, ok, passed: !!passed, points: 10 };
    const doSave = async () => {
      try {
        if (window.LX?.saveProgress) {
          await window.LX.saveProgress('math_n6', payload);
          window.dispatchEvent(new CustomEvent('lx-progress-updated', {
            detail: { levelId: 'math_n6', payload }
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

    // === Cálculo de APM previo al apagado (evita APM enormes) ===
    const secsNow = Math.max(1, (Date.now() - t0) / 1000); // mínimo 1s
    const apmEnd  = ok / (secsNow / 60);

    setRunningUI(false); // ahora sí apagamos UI

    const p       = precision();
    const passed  = ok >= PASS_OK;

    // Sanea APM
    const safeApm = Number.isFinite(apmEnd) ? Math.min(apmEnd, 999) : 0;

    const prev = JSON.parse(localStorage.getItem(n6Key) || 'null') || {};
    const best = Math.max(Number(prev.bestApm) || 0, safeApm);

    putRecord({
      bestApm: best,
      precision: p,
      passed: prev.passed || passed,
      ts: Date.now()
    });
    updateBestBadge();

    if (typeof window.updateMathRecord === 'function') {
      window.updateMathRecord('n6', { bestApm: best, precision: p, passed });
    }
    persistProgressToCloud({ bestApm: best, acc: p, tries, ok, passed }).catch(() => {});
  }

  // ----- Corrección de respuestas -----
  function submitAnswer() {
    if (!running) return;
    tries++;

    const strict = !!($strict && $strict.checked);

    let isCorrect = false;

    if (strict) {
      // Comparación canónica exacta (con pequeña tolerancia en mantisa)
      const u = parseMantExp($ans.value);
      if (u) {
        const target = { mant: current.mant, exp: current.exp };
        const sameExp = (u.exp === target.exp);
        const sameMant = Math.abs(u.mant - target.mant) <= 1e-9 * Math.max(1, Math.abs(target.mant));
        isCorrect = sameExp && sameMant;
      }
    } else {
      // Comparación por valor numérico (equivalencias válidas)
      const uVal = parseUserValue($ans.value);
      if (uVal !== null) {
        const ref = current.value;
        const tol = Math.max(1e-9, Math.abs(ref) * 1e-9);
        isCorrect = Math.abs(uVal - ref) <= tol;
      }
    }

    if (isCorrect) {
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
    tries++; newProblem(); $ans.value = ''; paintStats();
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
