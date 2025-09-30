/* ===== Nivel 7 · Fracciones: simplificar =====
   - Genera fracciones reducibles (y algunos casos con 0)
   - Valida en mínima expresión (denominador > 0 y signo en el numerador)
   - 4 aciertos en 1:00 para aprobar
   - Guarda progreso como math_n7 (+10 puntos en 1ª aprobación)
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
  const LIMIT = 60;
  const PASS_OK = 4;
  let running = false, t0 = 0, tickId = null;
  let current = null; // {a, b, show} a/b reducible
  let ok = 0, tries = 0;

  // ----- Local record -----
  const recKey = (id) => `lx_math_record_${id}`;
  const nKey = recKey('n7');
  function updateBestBadge() {
    try {
      const rec = JSON.parse(localStorage.getItem(nKey) || 'null') || {};
      if (rec.bestApm != null) {
        $bestBadge.textContent =
          `✓ Superado · Mejor APM: ${Number(rec.bestApm).toFixed(2)} · Precisión: ${((rec.precision || 0)*100).toFixed(0)}%`;
      } else {
        $bestBadge.textContent = 'Sin récord';
      }
    } catch { $bestBadge.textContent = 'Sin récord'; }
  }
  function putRecord(data){ localStorage.setItem(nKey, JSON.stringify(data)); }

  // ----- Utils fracciones -----
  const ri = (min, max) => Math.floor(Math.random()*(max-min+1))+min;
  const gcd = (a,b) => { a=Math.abs(a); b=Math.abs(b); while(b){ const t=a%b; a=b; b=t; } return a||1; };
  function norm(n,d){
    if (d === 0) return null;
    if (n === 0) return { n:0, d:1 };
    if (d < 0){ n = -n; d = -d; }
    const g = gcd(n,d);
    return { n: n/g, d: d/g };
  }
  function fmt(n,d){
    if (n === 0) return '0';
    return `${n}/${d}`;
  }

  // parse " - 2 / -4 " or "−2/4" or "0" → normalized {n,d}
  function parseFrac(str){
    if (!str) return null;
    const s = String(str)
      .trim()
      .replace(/[−–—‒]/g, '-')   // todos los "menos" a ASCII
      .replace(/\s+/g, '');      // sin espacios

    if (s === '0') return { n:0, d:1 };

    if (!s.includes('/')){
      // Si no trae '/', permite "0" o enteros … pero aquí pedimos fracción salvo 0.
      // Aun así, si pusieron "3/1" equivalente, ya trae '/'.
      const v = Number(s);
      if (!Number.isFinite(v)) return null;
      if (v === 0) return { n:0, d:1 };
      // No aceptamos enteros no-cero (este nivel es de fracciones). Devuelve null.
      return null;
    }

    const [a,b] = s.split('/');
    if (a === '' || b === '') return null;
    const n = Number(a), d = Number(b);
    if (!Number.isFinite(n) || !Number.isFinite(d)) return null;
    const out = norm(n,d);
    return out;
  }

  // Generar fracciones reducibles
  function newProblem(){
    // Con probabilidad baja, caso con cero
    const makeZero = Math.random() < 0.12;
    if (makeZero){
      const den = ri(2, 12);
      current = { a:0, b:den, show:`0/${den}` };
      $eq.textContent = current.show;
      return;
    }

    // Tomamos una fracción base irreducible p/q
    let p = ri(1, 9) * (Math.random()<0.5 ? 1 : -1);
    let q = ri(2, 12);
    while (gcd(p,q) !== 1){ p = ri(1, 9)*(Math.random()<0.5?1:-1); q = ri(2,12); }

    // Multiplicador para hacerla reducible
    const m = ri(2, 10);
    const a = p * m;
    const b = q * m;

    current = { a, b, show:`${a}/${b}` };
    $eq.textContent = current.show;
  }

  // ----- Métricas -----
  function precision(){ return tries ? ok / tries : 0; }
  function elapsedSec(){ return running ? Math.max(0,(Date.now()-t0)/1000) : 0; }
  function apm(){ const s=Math.max(1e-6,elapsedSec()); return ok / (s/60); }
  function paintStats(){
    $ok.textContent = String(ok);
    $tries.textContent = String(tries);
    $prec.textContent = `${(precision()*100).toFixed(2)}%`;
    $apm.textContent = apm().toFixed(2);
  }

  // ----- Timer -----
  function formatTime(s){
    s = Math.max(0, Math.ceil(s));
    const mm = String(Math.floor(s/60)).padStart(2,'0');
    const ss = String(s%60).padStart(2,'0');
    return `${mm}:${ss}`;
  }
  function tick(){
    const e = elapsedSec();
    const left = Math.max(0, LIMIT - e);
    const pct = Math.min(100, (e / LIMIT) * 100);
    $timerPill.textContent = formatTime(left);
    $timerFill.style.width = `${pct}%`;
    if (left <= 0) endRound();
  }

  function setRunningUI(on){
    running = on;
    $ans.disabled = !on;
    $btnSend.disabled = !on;
    $btnSkip.disabled = !on;
    $btnStart.disabled = on;
    if (on) $ans.focus();
  }

  function startRound(){
    ok = 0; tries = 0;
    paintStats();
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
          await window.LX.saveProgress('math_n7', payload);
          window.dispatchEvent(new CustomEvent('lx-progress-updated', {
            detail: { levelId: 'math_n7', payload }
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
      window.updateMathRecord('n7', { bestApm, precision: p, passed });
    }
    persistProgressToCloud({ bestApm, acc: p, tries, ok, passed }).catch(()=>{});
  }

  // ----- Respuesta -----
  function submitAnswer(){
    if (!running) return;

    const user = parseFrac($ans.value);
    tries++;

    const target = norm(current.a, current.b); // mínima esperada
    let correct = false;
    if (user){
      // Igualdad exacta en forma normalizada (irreducible y denom>0)
      correct = (user.n === target.n && user.d === target.d);
    }

    if (correct){
      ok++;
      $eq.classList.add('ok'); setTimeout(()=> $eq.classList.remove('ok'), 120);
      newProblem(); $ans.value='';
    } else {
      $eq.classList.add('bad'); setTimeout(()=> $eq.classList.remove('bad'), 160);
    }
    paintStats();
  }

  // ----- Eventos -----
  $btnStart.addEventListener('click', startRound);
  $btnSend.addEventListener('click', submitAnswer);
  $ans.addEventListener('keydown', (e)=>{ if (e.key === 'Enter'){ e.preventDefault(); submitAnswer(); } });
  $btnSkip.addEventListener('click', ()=>{
    if (!running) return;
    tries++; newProblem(); $ans.value=''; paintStats();
  });
  $btnReset.addEventListener('click', ()=>{
    if (tickId) clearInterval(tickId);
    setRunningUI(false);
    $timerPill.textContent = '01:00';
    $timerFill.style.width = '0%';
    ok = 0; tries = 0; paintStats();
    $eq.textContent = '— — —'; $ans.value = '';
  });

  // Inicio
  updateBestBadge();
  $eq.textContent = '— — —';
  $timerPill.textContent = '01:00';
  $timerFill.style.width = '0%';
  paintStats();
})();
