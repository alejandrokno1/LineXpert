/* ===== Nivel 8 · Decimal ↔ Fracción (terminantes) =====
   - Alterna: decimal → fracción, fracción → decimal
   - Valida equivalencias (signo, ceros de relleno) y fracción irreducible
   - Apruebas con 2 aciertos (PASS_OK = 2)
   - Persistencia: math_n8 (+10 puntos la 1ª vez)
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
  const LIMIT = 60;     // segundos
  const PASS_OK = 2;    // aciertos para superar
  let running = false, t0 = 0, tickId = null;
  let current = null;   // {type:'d2f'|'f2d', prompt:string, check:(str)=>bool}
  let ok = 0, tries = 0;

  // ----- Local record -----
  const recKey = (id) => `lx_math_record_${id}`;
  const n8Key = recKey('n8');

  function updateBestBadge() {
    try {
      const rec = JSON.parse(localStorage.getItem(n8Key) || 'null') || {};
      if (rec.bestApm) {
        $bestBadge.textContent =
          `✓ Superado · Mejor APM: ${Number(rec.bestApm).toFixed(2)} · Precisión: ${((rec.precision || 0) * 100).toFixed(0)}%`;
      } else {
        $bestBadge.textContent = 'Sin récord';
      }
    } catch {
      $bestBadge.textContent = 'Sin récord';
    }
  }
  function putRecord(data){ localStorage.setItem(n8Key, JSON.stringify(data)); }

  // ----- Utils -----
  const randInt = (a,b)=>Math.floor(Math.random()*(b-a+1))+a;
  const replaceMinus = s => s.replace(/[−–—‒]/g, '-');

  function gcd(a,b){ a=Math.abs(a); b=Math.abs(b); while(b){ [a,b]=[b,a%b]; } return a||1; }
  function simplify(n,d){
    if (d===0) return {n:NaN,d:0};
    if (n===0) return {n:0,d:1};
    if (d<0){ n=-n; d=-d; }
    const g=gcd(n,d); return {n:n/g, d:d/g};
  }

  // Parse "a/b" (permite '+' inicial y normaliza guiones)
  function parseFraction(str){
    if (!str) return null;
    const s = replaceMinus(String(str)).trim()
                .replace(/^\+/, '')         // quita '+' inicial
                .replace(/\s+/g,'');
    if (s==='0') return {n:0,d:1};
    const m = s.match(/^(-?\d+)\/(-?\d+)$/);
    if (!m) return null;
    const n = Number(m[1]), d = Number(m[2]);
    if (!Number.isInteger(n) || !Number.isInteger(d) || d===0) return null;
    return simplify(n,d);
  }

  // Decimal string -> { value:number, decs:int, str:string }
  function normalizeDecimalString(str){
    const s = replaceMinus(String(str)).trim()
              .replace(/^\+/, '')    // quita '+' inicial
              .replace(',', '.')
              .replace(/\s+/g,'');
    // acepta "12", "12.3", ".5"
    if (!/^[-]?(?:\d+|\d+\.\d+|\.\d+)$/.test(s)) return null;
    const parts = s.split('.');
    const k = (parts[1] || '').length;
    return { value: Number(s), decs: k, str: s };
  }

  // decimal -> fracción irreducible
  function decimalToFraction(s){
    const nd = normalizeDecimalString(s);
    if (!nd) return null;
    const sign = nd.value < 0 ? -1 : 1;
    const abs = Math.abs(nd.value);
    const k = nd.decs;
    const num = Math.round(abs * Math.pow(10,k));
    const den = Math.pow(10,k);
    const {n,d} = simplify(sign*num, den);
    return {n,d};
  }

  // fracción (terminante) -> { str, k, val }
  function fractionToDecimalString(n,d){
    if (n===0) return { str:"0", k:0, val:0 };
    const {n:nn,d:dd} = simplify(n,d);
    // mínimo k tal que dd | 10^k  => k = max(v2, v5)
    let v2=0,v5=0, t=dd;
    while(t%2===0){ v2++; t/=2; }
    while(t%5===0){ v5++; t/=5; }
    if (t!==1){
      // No terminante (no debería ocurrir por cómo generamos); fallback seguro.
      const k=6; const s=(nn/dd).toFixed(k);
      return { str: s.replace(/\.?0+$/,''), k, val: Number(s) };
    }
    const k = Math.max(v2,v5);
    const s = (nn/dd).toFixed(k);
    return { str: s.replace(/\.?0+$/,''), k, val: Number((nn/dd).toFixed(k)) };
  }

  function precision(){ return tries ? ok/tries : 0; }
  function elapsedSec(){ return running ? Math.max(0,(Date.now()-t0)/1000) : 0; }
  function apm(){ const s=Math.max(1e-6,elapsedSec()); return ok/(s/60); }
  function paintStats(){
    $ok.textContent = String(ok);
    $tries.textContent = String(tries);
    $prec.textContent = `${(precision()*100).toFixed(2)}%`;
    $apm.textContent = apm().toFixed(2);
  }

  function setRunningUI(on){
    running=on;
    $ans.disabled=!on;
    $btnSend.disabled=!on;
    $btnSkip.disabled=!on;
    $btnStart.disabled=on;
    if (on) $ans.focus();
  }
  function formatTime(s){
    s=Math.max(0,Math.ceil(s));
    const mm=String(Math.floor(s/60)).padStart(2,'0');
    const ss=String(s%60).padStart(2,'0');
    return `${mm}:${ss}`;
  }

  // ----- Generación de problemas -----
  function genDecimalString(){
    // 0..2 enteros y 1..3 decimales (terminante por construcción)
    const sign = Math.random()<0.25 ? -1 : 1;
    const intPart = randInt(0, 99);
    const k = randInt(1,3);
    const decPart = String(randInt(0, Math.pow(10,k)-1)).padStart(k,'0');
    const s = `${sign<0?'-':''}${intPart}.${decPart}`;
    return s.replace(/^(-?)0+(\d)/,'$1$2'); // 01.x → 1.x
  }

  function genTerminatingFraction(){
    // denominador 2^a * 5^b (a,b <= 3)
    const a = randInt(0,3), b = randInt(0,3);
    const den = Math.pow(2,a)*Math.pow(5,b) || 1;
    let num = randInt(-999,999);
    if (den===1 && num===0) num = randInt(1,9); // evita 0/0
    const {n,d}=simplify(num,den);
    return {n,d};
  }

  function newProblem(){
    const type = Math.random()<0.5 ? 'd2f' : 'f2d';

    if (type==='d2f'){
      const decStr = genDecimalString();
      const target = decimalToFraction(decStr);   // {n,d}
      $eq.textContent = `${decStr} = ?`;
      current = {
        type,
        prompt: decStr,
        check(str){
          // Acepta "0" para 0 y "n/d" equivalente irreducible
          const f = parseFraction(str);
          if (!f){
            // permitir "0" exacto escrito como decimal
            const nd = normalizeDecimalString(str);
            if (target.n===0 && nd && Math.abs(nd.value)<1e-12) return true;
            return false;
          }
          const s1 = simplify(f.n,f.d);
          const s2 = simplify(target.n,target.d);
          return s1.n===s2.n && s1.d===s2.d;
        }
      };
      // Placeholder contextual
      $ans.placeholder = 'Escribe n/d en mínima expresión (p.ej. 7/8, -3/5, 0)';
    } else {
      const f = genTerminatingFraction();
      const {str:decStr,k,val} = fractionToDecimalString(f.n,f.d);
      $eq.textContent = `${f.n}/${f.d} = ?`;
      current = {
        type,
        prompt: `${f.n}/${f.d}`,
        check(str){
          const nd = normalizeDecimalString(str);
          if (!nd) return false;
          const tol = Math.pow(10, -Math.max(0,k)) / 2;
          return Math.abs(nd.value - val) <= tol;
        }
      };
      // Placeholder contextual
      $ans.placeholder = 'Escribe el decimal (p.ej. 0.25, .5, -1.75)';
    }
  }

  // ----- Timer -----
  function tick(){
    const e=elapsedSec();
    const left=Math.max(0, LIMIT-e);
    const pct=Math.min(100, (e/LIMIT)*100);
    $timerPill.textContent=formatTime(left);
    $timerFill.style.width=`${pct}%`;
    if (left<=0) endRound();
  }

  function startRound(){
    ok=0; tries=0; paintStats();
    setRunningUI(true);
    t0=Date.now();
    newProblem();
    tick();
    tickId=setInterval(tick,100);
  }

  // ----- Persistencia (Firestore / puntos) -----
  async function persistProgressToCloud({ bestApm, acc, tries, ok, passed }) {
    const payload = { apm: bestApm, acc, tries, ok, passed: !!passed, points: 10 };
    const doSave = async () => {
      try {
        if (window.LX?.saveProgress) {
          await window.LX.saveProgress('math_n8', payload);
          window.dispatchEvent(new CustomEvent('lx-progress-updated', {
            detail: { levelId: 'math_n8', payload }
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

    const prev = JSON.parse(localStorage.getItem(n8Key) || 'null') || {};
    putRecord({
      bestApm: Math.max(prev.bestApm || 0, bestApm),
      precision: p,
      passed: prev.passed || passed,
      ts: Date.now()
    });
    updateBestBadge();

    if (typeof window.updateMathRecord === 'function') {
      window.updateMathRecord('n8', { bestApm, precision: p, passed });
    }
    persistProgressToCloud({ bestApm, acc: p, tries, ok, passed }).catch(()=>{});
  }

  // ----- Respuesta -----
  function submitAnswer(){
    if (!running) return;
    const v = $ans.value;
    tries++;
    if (current?.check(v)){
      ok++;
      $eq.classList.add('ok'); setTimeout(()=> $eq.classList.remove('ok'),120);
      newProblem();
      $ans.value='';
    } else {
      $eq.classList.add('bad'); setTimeout(()=> $eq.classList.remove('bad'),160);
    }
    paintStats();
  }

  // ----- Eventos -----
  $btnStart.addEventListener('click', startRound);
  $btnSend.addEventListener('click', submitAnswer);
  $ans.addEventListener('keydown', (e)=>{ if (e.key==='Enter'){ e.preventDefault(); submitAnswer(); } });
  $btnSkip.addEventListener('click', ()=>{ if(!running) return; tries++; newProblem(); $ans.value=''; paintStats(); });
  $btnReset.addEventListener('click', ()=>{
    if (tickId) clearInterval(tickId);
    setRunningUI(false);
    $timerPill.textContent='01:00';
    $timerFill.style.width='0%';
    ok=0; tries=0; paintStats();
    $eq.textContent='— — —';
    $ans.value='';
    // restablece un placeholder neutro
    $ans.placeholder = 'Escribe tu respuesta…';
  });

  // Inicio
  updateBestBadge();
  $eq.textContent='— — —';
  $timerPill.textContent='01:00';
  $timerFill.style.width='0%';
  paintStats();
})();
