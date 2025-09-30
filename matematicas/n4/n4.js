/* ===== Nivel 4 · Divisiones (rápidas, exactas) =====
   - 1:00 y se aprueba con 8 aciertos
   - Dividendo: ≤ 3 enteros ; Divisor: ≤ 2 enteros
   - Variedad: con/sin decimales en ambos, uno o ninguno
   - Siempre exactas (sin periódicos) y divisor ≠ 0
   - Persistencia: math_n4 (+10 pts si es 1ª aprobación del grupo)
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
  const LIMIT   = 60;  // s
  const PASS_OK = 2;   // aciertos para superar
  const MAX_DEC = 2;   // aceptamos 0–2 decimales de respuesta

  let running = false, t0 = 0, tickId = null;
  // current: {aInt, aPow, bInt, bPow, qInt, qPow, showA, showB}
  let current = null;
  let ok = 0, tries = 0;

  // ----- Local record -----
  const recKey = (id) => `lx_math_record_${id}`;
  const n4Key = recKey('n4');
  function updateBestBadge() {
    try {
      const rec = JSON.parse(localStorage.getItem(n4Key) || 'null') || {};
      if (rec.bestApm) {
        $bestBadge.textContent =
          `✓ Superado · Mejor APM: ${Number(rec.bestApm).toFixed(2)} · Precisión: ${((rec.precision || 0)*100).toFixed(0)}%`;
      } else {
        $bestBadge.textContent = 'Sin récord';
      }
    } catch { $bestBadge.textContent = 'Sin récord'; }
  }
  function putRecord(data){ localStorage.setItem(n4Key, JSON.stringify(data)); }

  // ----- Utils -----
  const ri = (min, max) => Math.floor(Math.random()*(max-min+1))+min;
  const P10 = [1,10,100,1000,10000,100000,1000000];

  // cuenta dígitos de la parte entera de (int / 10^pow)
  function intDigits(intVal, pow){
    const entero = Math.floor(intVal / P10[pow]);
    return String(entero).length;
  }
  function fmtScaled(intVal, pow, fixedDec){ // imprime (intVal / 10^pow) con fixedDec decimales exactos
    const s = (intVal / P10[pow + 0]).toFixed(fixedDec); // usa toFixed para formateo rápido
    // Evitar notación científica en casos extremos (no debería ocurrir con rangos actuales)
    return s;
  }
  // Normaliza la entrada del usuario a escala 10^qPow (acepta , . y espacios)
  function parseToScaled(str, qPow){
    if (!str) return NaN;
    const s = String(str).trim().replace(',', '.').replace(/\s+/g, '');
    const v = Number(s);
    if (!Number.isFinite(v)) return NaN;
    return Math.round(v * P10[qPow]);
  }

  // ----- Generador de problemas -----
  // Reglas: dividendo ≤ 3 enteros ; divisor ≤ 2 enteros ; exactas ; variedad de decimales
  function newProblem(){
    for (let guard=0; guard<200; guard++){
      // 1) Elegimos divisor: 1..99 (≤2 enteros); con 0..2 decimales
      let bPow = ri(0,2);
      let bInt = ri(1, 99 * P10[bPow]); // evita cero
      // normalizamos para que realmente tenga <=2 enteros
      const bIntDigits = intDigits(bInt, bPow); // enteros de B
      if (bIntDigits > 2) continue;

      // 2) Cociente “bonito”: 0..2 decimales (exacto)
      const qPow = ri(0,2);
      const qInt = ri(1, 999 * P10[qPow] / P10[qPow]); // valor razonable

      // 3) Construimos dividendo exacto: A = Q * B
      const aIntFull = bInt * qInt;         // enteros
      const aPowFull = bPow + qPow;         // decimales acumulados

      // Queremos variedad en la representación del dividendo:
      // podemos “quitar” ceros finales para bajar decimales (si los hay)
      let drop = 0;
      let tmp = aIntFull;
      while (tmp % 10 === 0 && drop < aPowFull) { tmp /= 10; drop++; }
      // aPow puede ser 0..2 (pero no mayor a aPowFull)
      const candidates = [];
      for (let p = 0; p <= Math.min(2, aPowFull); p++){
        // factible si 10^(aPowFull - p) divide aIntFull
        const need = aPowFull - p;
        if (aIntFull % P10[need] === 0) candidates.push(p);
      }
      if (!candidates.length) continue;
      const aPow = candidates[ri(0, candidates.length-1)];
      const aInt = Math.round(aIntFull / P10[aPowFull - aPow]);

      // 4) Validar dígitos del dividendo (≤3 enteros)
      const aDigits = intDigits(aInt, aPow);
      if (aDigits > 3) continue;

      // 5) Construir strings (variedad: 0..2 decimales fijos para impresión)
      const showA = fmtScaled(aInt, aPow, aPow);
      const showB = fmtScaled(bInt, bPow, bPow);

      current = {
        aInt, aPow,
        bInt, bPow,
        qInt, qPow,
        showA, showB
      };
      $eq.textContent = `${showA} ÷ ${showB}`;
      return;
    }
    // fallback muy raro
    current = null;
    $eq.textContent = '— — —';
  }

  // ----- Timer -----
  function precision(){ return tries ? ok/tries : 0; }
  function elapsedSec(){ return running ? Math.max(0,(Date.now()-t0)/1000) : 0; }
  function apm(){ const s=Math.max(1e-6, elapsedSec()); return ok/(s/60); }

  function paintStats(){
    $ok.textContent   = String(ok);
    $tries.textContent= String(tries);
    $prec.textContent = `${(precision()*100).toFixed(2)}%`;
    $apm.textContent  = apm().toFixed(2);
  }
  function formatTime(s){
    s = Math.max(0, Math.ceil(s));
    const mm = String(Math.floor(s/60)).padStart(2,'0');
    const ss = String(s%60).padStart(2,'0');
    return `${mm}:${ss}`;
  }
  function tick(){
    const e = elapsedSec();
    const left = Math.max(0, LIMIT - e);
    const pct  = Math.min(100, (e / LIMIT) * 100);
    $timerPill.textContent = formatTime(left);
    $timerFill.style.width = `${pct}%`;
    if (left <= 0) endRound();
  }

  function setRunningUI(on){
    running = on;
    $ans.disabled   = !on;
    $btnSend.disabled = !on;
    $btnSkip.disabled = !on;
    $btnStart.disabled= on;
    if (on) $ans.focus();
  }

  function startRound(){
    ok = 0; tries = 0; paintStats();
    setRunningUI(true);
    t0 = Date.now();
    newProblem();
    tick();
    tickId = setInterval(tick, 100);
  }

  // ----- Persistencia (Firestore) -----
  async function persistProgressToCloud({ bestApm, acc, tries, ok, passed }){
    const payload = { apm: bestApm, acc, tries, ok, passed: !!passed, points: 10 };
    const doSave = async () => {
      try {
        if (window.LX?.saveProgress) {
          await window.LX.saveProgress('math_n4', payload);
          window.dispatchEvent(new CustomEvent('lx-progress-updated', {
            detail: { levelId: 'math_n4', payload }
          }));
        }
      } catch {}
    };
    if (window.LX?.saveProgress) await doSave();
    else {
      const once = () => { window.removeEventListener('lx-auth-ready', once); doSave(); };
      window.addEventListener('lx-auth-ready', once, { once:true });
    }
  }

  function endRound(){
    if (tickId) clearInterval(tickId);
    setRunningUI(false);

    const p = precision();
    const bestApm = apm();
    const passed  = ok >= PASS_OK;

    const prev = JSON.parse(localStorage.getItem(n4Key) || 'null') || {};
    putRecord({
      bestApm: Math.max(prev.bestApm || 0, bestApm),
      precision: p,
      passed: prev.passed || passed,
      ts: Date.now()
    });
    updateBestBadge();

    if (typeof window.updateMathRecord === 'function') {
      window.updateMathRecord('n4', { bestApm, precision: p, passed });
    }
    persistProgressToCloud({ bestApm, acc: p, tries, ok, passed }).catch(()=>{});
  }

  // ----- Respuesta -----
  function submitAnswer(){
    if (!running || !current) return;
    const want = current.qInt;              // respuesta en escala 10^qPow
    const got  = parseToScaled($ans.value, current.qPow);
    tries++;
    if (Number.isFinite(got) && got === want){
      ok++;
      $eq.classList.add('ok'); setTimeout(()=> $eq.classList.remove('ok'), 120);
      newProblem();
      $ans.value = '';
    } else {
      $eq.classList.add('bad'); setTimeout(()=> $eq.classList.remove('bad'), 160);
    }
    paintStats();
  }

  // ----- Eventos -----
  $btnStart.addEventListener('click', startRound);
  $btnSend .addEventListener('click', submitAnswer);
  $ans.addEventListener('keydown', (e)=>{ if (e.key==='Enter'){ e.preventDefault(); submitAnswer(); } });
  $btnSkip .addEventListener('click', ()=>{ if(!running) return; tries++; newProblem(); $ans.value=''; paintStats(); });
  $btnReset.addEventListener('click', ()=>{
    if (tickId) clearInterval(tickId);
    setRunningUI(false);
    $timerPill.textContent='01:00';
    $timerFill.style.width='0%';
    ok=0; tries=0; paintStats();
    $eq.textContent='— — —';
    $ans.value='';
  });

  // ----- Inicio -----
  updateBestBadge();
  $eq.textContent = '— — —';
  $timerPill.textContent = '01:00';
  $timerFill.style.width = '0%';
  paintStats();
})();
