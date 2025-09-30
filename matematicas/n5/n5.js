/* ===== Nivel 5 · Potenciación (exponentes positivos ≤ 4) =====
   - Tipos de ítems:
     1) a^b
     2) a^b + c^d
     3) a^e × c^e  (preferencia mismo exponente)
   - Límites para agilidad:
     • cada término ≤ 500
     • resultado final ≤ 5000
   - Aprobación: 3 aciertos en 1:00
   - Persistencia: math_n5 (+10 puntos si es la 1ª aprobación del grupo)
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
  const LIMIT = 60;    // s
  const PASS_OK = 3;   // 3 aciertos para superar
  let running = false, t0 = 0, tickId = null;
  let current = null;  // { text, answer }
  let ok = 0, tries = 0;

  // ----- Local record -----
  const recKey = (id) => `lx_math_record_${id}`;
  const nKey = recKey('n5');
  function updateBestBadge() {
    try {
      const rec = JSON.parse(localStorage.getItem(nKey) || 'null') || {};
      if (rec.bestApm) {
        $bestBadge.textContent =
          `✓ Superado · Mejor APM: ${Number(rec.bestApm).toFixed(2)} · Precisión: ${((rec.precision || 0)*100).toFixed(0)}%`;
      } else {
        $bestBadge.textContent = 'Sin récord';
      }
    } catch { $bestBadge.textContent = 'Sin récord'; }
  }
  function putRecord(data){ localStorage.setItem(nKey, JSON.stringify(data)); }

  // ----- Utils -----
  const ri = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const BASES = [2,3,4,5,6,7,8,9];
  const EXPS  = [1,2,3,4];

  function ipow(a, b){
    let r = 1;
    for (let i=0;i<b;i++) r *= a;
    return r;
  }

  function rndBase(){ return BASES[ri(0, BASES.length-1)]; }
  function rndExp(){ return EXPS[ri(0, EXPS.length-1)]; }

  // genera una potencia con límites (devuelve {b,e,val})
  function genPower(maxValEach = 500){
    for (let k=0;k<40;k++){
      const b = rndBase();
      // si la base es alta, favorece exponente <=3
      const e = (b >= 8) ? ri(1,3) : rndExp();
      const val = ipow(b,e);
      if (val <= maxValEach) return { b, e, val };
    }
    // fallback (garantizado pequeño)
    return { b:2, e:3, val:8 };
  }

  function newProblem(){
    // modos ponderados: simple 40%, suma 30%, producto 30%
    const r = Math.random();
    let text = '', answer = 0;

    if (r < 0.40) {
      // 1) a^b
      const {b,e,val} = genPower(5000);
      text = `${b}^${e}`;
      answer = val;
    } else if (r < 0.70) {
      // 2) a^b + c^d
      let A, B, sum;
      for (let t=0;t<50;t++){
        A = genPower(500); B = genPower(500);
        sum = A.val + B.val;
        if (sum <= 5000) break;
      }
      text = `${A.b}^${A.e} + ${B.b}^${B.e}`;
      answer = (A.val + B.val);
    } else {
      // 3) a^e × c^e  (preferencia mismo exponente)
      let e = rndExp();
      if (e === 4) e = 3; // evita números gigantes
      let a, c, prod;
      for (let t=0;t<60;t++){
        a = rndBase(); c = rndBase();
        const A = ipow(a, e);
        const C = ipow(c, e);
        if (A <= 500 && C <= 500){
          prod = A * C;
          if (prod <= 5000) { text = `${a}^${e} × ${c}^${e}`; answer = prod; break; }
        }
      }
      if (!answer) { // fallback simple
        const P = genPower(5000);
        text = `${P.b}^${P.e}`;
        answer = P.val;
      }
    }

    current = { text, answer };
    $eq.textContent = text;
  }

  // ----- Cálculos auxiliares -----
  function precision(){ return tries ? ok/tries : 0; }
  function elapsedSec(){ return running ? Math.max(0, (Date.now()-t0)/1000) : 0; }
  function apm(){ const s = Math.max(1e-6, elapsedSec()); return ok/(s/60); }

  function paintStats(){
    $ok.textContent = String(ok);
    $tries.textContent = String(tries);
    $prec.textContent = `${(precision()*100).toFixed(2)}%`;
    $apm.textContent = apm().toFixed(2);
  }

  function setRunningUI(on){
    running = on;
    $ans.disabled = !on;
    $btnSend.disabled = !on;
    $btnSkip.disabled = !on;
    $btnStart.disabled = on;
    if (on) $ans.focus();
  }

  function formatTime(s){
    s = Math.max(0, Math.ceil(s));
    const mm = String(Math.floor(s/60)).padStart(2,'0');
    const ss = String(s%60).padStart(2,'0');
    return `${mm}:${ss}`;
  }

  // ----- Timer -----
  function tick(){
    const e = elapsedSec();
    const left = Math.max(0, LIMIT - e);
    const pct = Math.min(100, (e / LIMIT) * 100);
    $timerPill.textContent = formatTime(left);
    $timerFill.style.width = `${pct}%`;
    if (left <= 0) endRound();
  }

  function startRound(){
    ok = 0; tries = 0; paintStats();
    setRunningUI(true);
    t0 = Date.now();
    newProblem();
    tick();
    tickId = setInterval(tick, 100);
  }

  // ----- Persistencia -----
  async function persistProgressToCloud({ bestApm, acc, tries, ok, passed }){
    const payload = { apm: bestApm, acc, tries, ok, passed: !!passed, points: 10 };
    const doSave = async () => {
      try {
        if (window.LX?.saveProgress) {
          await window.LX.saveProgress('math_n5', payload);
          window.dispatchEvent(new CustomEvent('lx-progress-updated', {
            detail: { levelId: 'math_n5', payload }
          }));
        }
      } catch {}
    };
    if (window.LX?.saveProgress) await doSave();
    else{
      const once = () => { window.removeEventListener('lx-auth-ready', once); doSave(); };
      window.addEventListener('lx-auth-ready', once, { once:true });
    }
  }

  function endRound(){
    if (tickId) clearInterval(tickId);
    setRunningUI(false);

    const p = precision();
    const bestApm = apm();
    const passed = ok >= PASS_OK;

    const prev = JSON.parse(localStorage.getItem(nKey) || 'null') || {};
    putRecord({
      bestApm: Math.max(prev.bestApm || 0, bestApm),
      precision: p,
      passed: prev.passed || passed,
      ts: Date.now()
    });
    updateBestBadge();

    if (typeof window.updateMathRecord === 'function') {
      window.updateMathRecord('n5', { bestApm, precision: p, passed });
    }
    persistProgressToCloud({ bestApm, acc: p, tries, ok, passed }).catch(()=>{});
  }

  // ----- Respuesta -----
  function parseIntAnswer(str){
    if (!str) return NaN;
    const s = String(str).trim().replace(/\s+/g,'');
    if (!/^\d+$/.test(s)) return NaN;           // solo enteros positivos
    const n = Number(s);
    return Number.isSafeInteger(n) ? n : NaN;
  }

  function submitAnswer(){
    if (!running) return;
    const user = parseIntAnswer($ans.value);
    tries++;

    if (Number.isFinite(user) && user === current.answer) {
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
