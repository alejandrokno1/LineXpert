// Razonamiento/niveles/r1/r1banco.js
// Banco r1: Series numéricas (opción múltiple)
// Compatible con r1.js v4 (usa series + options + answerIndex + explanation)
// Incluye 30 sets: s1..s30 (10 preguntas por set)
// ✅ Regla nueva: cada set tiene su propia selección y NO se repiten preguntas entre sets

(function () {
  "use strict";

  // =========================
  // Sets originales s1..s6 (SIN CAMBIOS)
  // =========================
  const s1 = [
    { id:"r1q01", series:"2, 4, 6, 8, __", options:["9","10","12","14"], answerIndex:1, explanation:"Progresión aritmética: suma +2." },
    { id:"r1q02", series:"5, 10, 20, 40, __", options:["70","80","90","60"], answerIndex:1, explanation:"Progresión geométrica: multiplica ×2." },
    { id:"r1q03", series:"1, 4, 9, 16, __", options:["24","25","20","36"], answerIndex:1, explanation:"Cuadrados perfectos: 1²,2²,3²,4²,5² → 25." },
    { id:"r1q04", series:"3, 6, 12, 24, __", options:["48","36","60","40"], answerIndex:0, explanation:"Progresión geométrica: multiplica ×2." },
    { id:"r1q05", series:"20, 18, 16, 14, __", options:["11","12","13","10"], answerIndex:1, explanation:"Progresión aritmética: resta −2." },
    { id:"r1q06", series:"1, 3, 6, 10, 15, __", options:["21","20","22","18"], answerIndex:0, explanation:"Diferencias: +2,+3,+4,+5,+6 → 15+6=21." },
    { id:"r1q07", series:"2, 6, 18, 54, __", options:["162","108","216","270"], answerIndex:0, explanation:"Multiplica ×3 cada vez." },
    { id:"r1q08", series:"7, 14, 21, 28, __", options:["35","32","30","36"], answerIndex:0, explanation:"Suma +7." },
    { id:"r1q09", series:"100, 50, 25, 12.5, __", options:["7.5","6.25","8.25","10"], answerIndex:1, explanation:"Divide entre 2." },
    { id:"r1q10", series:"1, 2, 4, 7, 11, __", options:["16","15","14","17"], answerIndex:0, explanation:"Diferencias: +1,+2,+3,+4,+5 → 11+5=16." },
  ];

  const s2 = [
    { id:"r1q11", series:"9, 7, 8, 6, 7, 5, __", options:["5","7","6","4"], answerIndex:2, explanation:"Alterna: −2, +1. Entonces 5+1=6." },
    { id:"r1q12", series:"4, 9, 19, 39, __", options:["79","69","89","59"], answerIndex:0, explanation:"Regla: ×2 +1. 39×2+1=79." },
    { id:"r1q13", series:"2, 3, 5, 8, 12, __", options:["18","16","17","15"], answerIndex:2, explanation:"Diferencias: +1,+2,+3,+4,+5 → 12+5=17." },
    { id:"r1q14", series:"10, 9, 7, 4, 0, __", options:["-6","-5","-4","-3"], answerIndex:1, explanation:"Resta −1,−2,−3,−4,−5 → 0−5=−5." },
    { id:"r1q15", series:"1, 1, 2, 3, 5, 8, __", options:["13","11","14","12"], answerIndex:0, explanation:"Fibonacci: suma de los dos anteriores → 5+8=13." },
    { id:"r1q16", series:"6, 11, 16, 21, __", options:["25","27","26","24"], answerIndex:2, explanation:"Suma +5. Entonces 21+5=26." },
    { id:"r1q17", series:"3, 9, 27, __", options:["90","81","72","54"], answerIndex:1, explanation:"Multiplica ×3. Entonces 27×3=81." },
    { id:"r1q18", series:"8, 13, 18, 23, __", options:["29","27","28","26"], answerIndex:2, explanation:"Suma +5. Entonces 23+5=28." },
    { id:"r1q19", series:"2, 5, 10, 17, 26, __", options:["37","35","38","36"], answerIndex:0, explanation:"Suma impares: +3,+5,+7,+9,+11 → 26+11=37." },
    { id:"r1q20", series:"1, 2, 6, 24, __", options:["96","144","60","120"], answerIndex:3, explanation:"Factoriales: 1!,2!,3!,4!,5! → 120." },
  ];

  const s3 = [
    { id:"r1q21", series:"11, 22, 44, 88, __", options:["154","176","132","121"], answerIndex:1, explanation:"Multiplica ×2. Entonces 88×2=176." },
    { id:"r1q22", series:"30, 27, 21, 12, __", options:["2","3","0","6"], answerIndex:2, explanation:"Resta −3,−6,−9,−12 → 12−12=0." },
    { id:"r1q23", series:"5, 6, 8, 11, 15, __", options:["19","21","20","18"], answerIndex:2, explanation:"Diferencias: +1,+2,+3,+4,+5 → 15+5=20." },
    { id:"r1q24", series:"1, 3, 7, 15, __", options:["31","29","33","23"], answerIndex:0, explanation:"Regla: ×2 +1. 15×2+1=31." },
    { id:"r1q25", series:"12, 10, 13, 11, 14, 12, __", options:["16","15","14","13"], answerIndex:1, explanation:"Alterna −2, +3. Entonces 12+3=15." },
    { id:"r1q26", series:"4, 8, 7, 14, 13, 26, __", options:["27","25","24","28"], answerIndex:1, explanation:"Alterna ×2, −1. Entonces 26−1=25." },
    { id:"r1q27", series:"2, 4, 8, 16, 32, __", options:["64","72","56","48"], answerIndex:0, explanation:"Multiplica ×2. Entonces 32×2=64." },
    { id:"r1q28", series:"9, 12, 16, 21, 27, __", options:["34","35","33","32"], answerIndex:0, explanation:"Diferencias: +3,+4,+5,+6,+7 → 27+7=34." },
    { id:"r1q29", series:"6, 5, 7, 6, 8, 7, __", options:["9","8","11","10"], answerIndex:0, explanation:"Alterna −1, +2. Entonces 7+2=9." },
    { id:"r1q30", series:"1, 4, 10, 20, 35, __", options:["56","54","58","52"], answerIndex:0, explanation:"Suma +3,+6,+10,+15,+21 → 35+21=56." },
  ];

  const s4 = [
    { id:"r1q31", series:"2, 7, 12, 17, __", options:["21","22","23","20"], answerIndex:1, explanation:"Suma +5." },
    { id:"r1q32", series:"1, 8, 27, 64, __", options:["125","121","144","100"], answerIndex:0, explanation:"Cubos: 1³,2³,3³,4³,5³ → 125." },
    { id:"r1q33", series:"3, 5, 9, 17, 33, __", options:["57","65","67","49"], answerIndex:1, explanation:"Diferencias doblándose: +2,+4,+8,+16,+32 → 33+32=65." },
    { id:"r1q34", series:"15, 14, 12, 9, 5, __", options:["0","-1","1","2"], answerIndex:0, explanation:"Resta −1,−2,−3,−4,−5 → 5−5=0." },
    { id:"r1q35", series:"1, 3, 6, 10, 15, 21, __", options:["29","28","27","30"], answerIndex:1, explanation:"Triangulares: suma +2,+3,+4,+5,+6,+7 → 21+7=28." },
    { id:"r1q36", series:"2, 4, 3, 6, 5, 10, __", options:["7","14","12","15"], answerIndex:0, explanation:"Primo y su doble: 2,4; 3,6; 5,10; 7,14 → falta 7." },
    { id:"r1q37", series:"10, 20, 19, 38, 37, __", options:["72","73","74","75"], answerIndex:2, explanation:"Alterna ×2, −1. Entonces 37×2=74." },
    { id:"r1q38", series:"4, 6, 9, 13, 18, __", options:["25","24","23","22"], answerIndex:1, explanation:"Diferencias: +2,+3,+4,+5,+6 → 18+6=24." },
    { id:"r1q39", series:"81, 27, 9, 3, __", options:["2","1","0","3"], answerIndex:1, explanation:"Divide entre 3." },
    { id:"r1q40", series:"1, 2, 3, 5, 8, 13, __", options:["21","20","22","18"], answerIndex:0, explanation:"Fibonacci: 8+13=21." },
  ];

  const s5 = [
    { id:"r1q41", series:"5, 9, 17, 33, __", options:["64","66","65","63"], answerIndex:2, explanation:"Regla: ×2 −1. 33×2−1=65." },
    { id:"r1q42", series:"0, 1, 3, 6, 10, __", options:["15","14","16","17"], answerIndex:0, explanation:"Diferencias: +1,+2,+3,+4,+5 → 10+5=15." },
    { id:"r1q43", series:"2, 9, 28, 65, __", options:["127","126","125","124"], answerIndex:1, explanation:"n³+1: 1³+1=2,..., 5³+1=126." },
    { id:"r1q44", series:"1, 5, 14, 30, 55, __", options:["90","91","92","89"], answerIndex:1, explanation:"Diferencias cuadradas: +4,+9,+16,+25,+36 → 55+36=91." },
    { id:"r1q45", series:"50, 45, 41, 38, 36, __", options:["34","35","36","33"], answerIndex:1, explanation:"Resta −5,−4,−3,−2,−1 → 36−1=35." },
    { id:"r1q46", series:"3, 4, 6, 9, 13, __", options:["19","18","17","20"], answerIndex:1, explanation:"Diferencias: +1,+2,+3,+4,+5 → 13+5=18." },
    { id:"r1q47", series:"2, 10, 12, 60, 62, __", options:["312","310","305","300"], answerIndex:1, explanation:"Alterna ×5, +2. Entonces 62×5=310." },
    { id:"r1q48", series:"14, 12, 15, 13, 16, 14, __", options:["17","16","18","19"], answerIndex:0, explanation:"Alterna −2, +3. Entonces 14+3=17." },
    { id:"r1q49", series:"1, 4, 7, 10, 13, __", options:["17","16","15","18"], answerIndex:1, explanation:"Suma +3." },
    { id:"r1q50", series:"2, 3, 6, 7, 14, 15, __", options:["31","29","30","28"], answerIndex:2, explanation:"Alterna +1, ×2. Entonces 15×2=30." },
  ];

  const s6 = [
    { id:"r1q51", series:"9, 16, 25, 36, __", options:["49","47","45","50"], answerIndex:0, explanation:"Cuadrados: 3²,4²,5²,6²,7² → 49." },
    { id:"r1q52", series:"3, 12, 48, 192, __", options:["768","720","640","576"], answerIndex:0, explanation:"Multiplica ×4." },
    { id:"r1q53", series:"1, 2, 5, 10, 17, __", options:["26","25","24","27"], answerIndex:0, explanation:"Diferencias impares: +1,+3,+5,+7,+9 → 17+9=26." },
    { id:"r1q54", series:"12, 6, 3, 1.5, __", options:["1","0.5","0.75","1.25"], answerIndex:2, explanation:"Divide entre 2: 12→6→3→1.5→0.75." },
    { id:"r1q55", series:"2, 4, 9, 19, 39, __", options:["80","78","79","81"], answerIndex:2, explanation:"Regla: ×2 +1. 39×2+1=79." },
    { id:"r1q56", series:"1, 6, 15, 28, 45, __", options:["67","66","65","64"], answerIndex:1, explanation:"Diferencias: +5,+9,+13,+17,+21 → 45+21=66." },
    { id:"r1q57", series:"7, 11, 18, 29, 47, __", options:["75","77","76","74"], answerIndex:2, explanation:"Cada término es la suma de los dos anteriores: 29+47=76." },
    { id:"r1q58", series:"4, 3, 6, 5, 10, 9, __", options:["17","18","19","16"], answerIndex:1, explanation:"Alterna −1, ×2. Entonces 9×2=18." },
    { id:"r1q59", series:"1, 10, 2, 9, 3, 8, __", options:["4","5","6","7"], answerIndex:0, explanation:"Intercalada: 1,2,3,4… y 10,9,8… → falta 4." },
    { id:"r1q60", series:"2, 5, 11, 23, __", options:["46","47","48","45"], answerIndex:1, explanation:"Regla: ×2 +1. 23×2+1=47." },
  ];

  // =========================
  // Generador s7..s30 (10 por set, SIN REPETICIONES entre sets)
  // =========================

  // series únicas globales (solo la cadena "series" cuenta como pregunta)
  const usedSeries = new Set();
  function seedUsedFrom(arr) {
    for (const q of arr) usedSeries.add(String(q.series).trim());
  }
  seedUsedFrom(s1); seedUsedFrom(s2); seedUsedFrom(s3);
  seedUsedFrom(s4); seedUsedFrom(s5); seedUsedFrom(s6);

  // RNG determinista (mulberry32)
  function mulberry32(a) {
    return function () {
      let t = (a += 0x6D2B79F5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function rint(rng, min, max) {
    return Math.floor(rng() * (max - min + 1)) + min;
  }
  function choice(rng, arr) {
    return arr[rint(rng, 0, arr.length - 1)];
  }
  function shuffle(rng, arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  function fmt(n) {
    // compacta 12.50 -> 12.5, 6.00 -> 6
    if (Number.isInteger(n)) return String(n);
    const s = n.toFixed(2);
    return s.replace(/\.?0+$/, "");
  }
  function seriesStr(nums, blankLast = true) {
    const parts = nums.map(fmt);
    return blankLast ? parts.join(", ") + ", __" : parts.join(", ");
  }
  function makeOptions(rng, correct, mode) {
    // mode controla dispersión de distractores
    const opts = new Set([fmt(correct)]);
    const mk = () => {
      if (mode === "mul") {
        const factors = [0.5, 0.75, 1.25, 1.5, 2, 3];
        const f = choice(rng, factors);
        const v = correct * f;
        return Math.round(v * 100) / 100;
      }
      if (mode === "near") {
        const d = choice(rng, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15]);
        const sign = rng() < 0.5 ? -1 : 1;
        return correct + sign * d;
      }
      // mixed
      if (rng() < 0.6) {
        const d = choice(rng, [1,2,3,4,5,6,7,8,9,10,12,15,20]);
        return correct + (rng() < 0.5 ? -d : d);
      }
      const f = choice(rng, [0.5, 0.75, 1.25, 1.5, 2]);
      const v = correct * f;
      return Math.round(v * 100) / 100;
    };

    let guard = 0;
    while (opts.size < 4 && guard++ < 200) {
      const v = mk();
      if (Number.isFinite(v)) opts.add(fmt(v));
    }

    const arr = Array.from(opts);
    // si por alguna razón faltan, rellena con offsets simples
    while (arr.length < 4) arr.push(fmt(correct + arr.length + 1));
    shuffle(rng, arr);
    const answerIndex = arr.indexOf(fmt(correct));
    return { options: arr.slice(0, 4), answerIndex: answerIndex >= 0 ? answerIndex : 0 };
  }

  // ---- Templates (cada una devuelve {nums, answer, explanation, mode})
  function t_arith(rng) {
    const d = rint(rng, 2, 15);
    const aMax = 180 - 4 * d;
    const a = rint(rng, 1, Math.max(10, aMax));
    const nums = [a, a + d, a + 2*d, a + 3*d];
    const ans = a + 4*d;
    return { nums, answer: ans, explanation: `Progresión aritmética: suma +${d}.`, mode:"near" };
  }
  function t_arith_down(rng) {
    const d = rint(rng, 2, 15);
    const a = rint(rng, 40, 180);
    const nums = [a, a - d, a - 2*d, a - 3*d];
    const ans = a - 4*d;
    return { nums, answer: ans, explanation: `Progresión aritmética: resta −${d}.`, mode:"near" };
  }
  function t_geom(rng) {
    const r = choice(rng, [2, 3, 4]);
    const aMax = Math.floor(180 / Math.pow(r, 4));
    const a = rint(rng, 1, Math.max(2, aMax));
    const nums = [a, a*r, a*r*r, a*r*r*r];
    const ans = a*r*r*r*r;
    return { nums, answer: ans, explanation: `Progresión geométrica: multiplica ×${r}.`, mode:"mul" };
  }
  function t_double_plus(rng) {
    // x -> 2x + c
    const c = rint(rng, 1, 5);
    let x = rint(rng, 1, 15);
    const nums = [x];
    for (let i=0;i<3;i++) {
      x = 2*x + c;
      nums.push(x);
    }
    const ans = 2*x + c;
    return { nums: nums.slice(0,4), answer: ans, explanation: `Regla: ×2 + ${c}.`, mode:"near" };
  }
  function t_squares_shift(rng) {
    const c = rint(rng, -3, 7);
    const n0 = rint(rng, 2, 12);
    const nums = [
      (n0*n0 + c),
      ((n0+1)**2 + c),
      ((n0+2)**2 + c),
      ((n0+3)**2 + c),
    ];
    const ans = ((n0+4)**2 + c);
    return { nums, answer: ans, explanation: `Cuadrados con ajuste: n² ${c>=0?"+":"−"} ${Math.abs(c)}.`, mode:"near" };
  }
  function t_triangular_shift(rng) {
    const c = rint(rng, -2, 6);
    const n0 = rint(rng, 2, 12);
    const T = (n)=> (n*(n+1))/2;
    const nums = [T(n0)+c, T(n0+1)+c, T(n0+2)+c, T(n0+3)+c];
    const ans = T(n0+4)+c;
    return { nums, answer: ans, explanation: `Números triangulares (suma 1..n) con ajuste ${c>=0?"+":"−"}${Math.abs(c)}.`, mode:"near" };
  }
  function t_alt_add_sub(rng) {
    // alterna +p, -q
    const p = rint(rng, 3, 12);
    const q = rint(rng, 1, 9);
    let a = rint(rng, 10, 90);
    const nums = [a];
    a = a + p; nums.push(a);
    a = a - q; nums.push(a);
    a = a + p; nums.push(a);
    const ans = a - q;
    return { nums, answer: ans, explanation: `Patrón alternado: +${p}, −${q}.`, mode:"near" };
  }
  function t_inc_diffs(rng) {
    // diferencias crecientes: +k, +(k+1), +(k+2)...
    const k = rint(rng, 1, 6);
    let a = rint(rng, 1, 40);
    const nums = [a];
    a += k; nums.push(a);
    a += (k+1); nums.push(a);
    a += (k+2); nums.push(a);
    const ans = a + (k+3);
    return { nums, answer: ans, explanation: `Diferencias crecientes: +${k}, +${k+1}, +${k+2}, +${k+3}.`, mode:"near" };
  }
  function t_odd_diffs(rng) {
    // suma impares consecutivos
    const start = rint(rng, 1, 20);
    const o = rint(rng, 1, 9) * 2 - 1; // odd
    let a = start;
    const nums = [a];
    a += o; nums.push(a);
    a += (o+2); nums.push(a);
    a += (o+4); nums.push(a);
    const ans = a + (o+6);
    return { nums, answer: ans, explanation: `Suma impares: +${o}, +${o+2}, +${o+4}, +${o+6}.`, mode:"near" };
  }
  function t_dec_halves(rng) {
    // divide entre 2 con decimales
    const a = choice(rng, [96, 80, 72, 60, 48, 36, 24, 18]);
    const nums = [a, a/2, a/4, a/8];
    const ans = a/16;
    return { nums, answer: ans, explanation: "Divide entre 2 en cada paso.", mode:"mul" };
  }
  function t_interleaved(rng) {
    // intercalada: sube y baja (6 términos, blank como 7mo)
    const up0 = rint(rng, 1, 5);
    const down0 = rint(rng, 12, 20);
    const a1 = up0, a2 = down0, a3 = up0+1, a4 = down0-1, a5 = up0+2, a6 = down0-2;
    const ans = up0+3;
    const series = `${a1}, ${a2}, ${a3}, ${a4}, ${a5}, ${a6}, __`;
    return {
      customSeries: series,
      answer: ans,
      explanation: `Intercalada: sube ${a1},${a3},${a5},${ans}… y baja ${a2},${a4},${a6}…`,
      mode:"near"
    };
  }
  function t_primes_double(rng) {
    // primo y doble: p,2p,p2,2p2,... -> pide el siguiente primo
    const primes = [2,3,5,7,11,13,17,19,23,29];
    const idx = rint(rng, 1, 6); // para que el siguiente exista
    const p1 = primes[idx];
    const p2 = primes[idx+1];
    const nums = [p1, 2*p1, p2, 2*p2];
    const ans = primes[idx+2]; // el siguiente primo
    return { nums, answer: ans, explanation: `Pares (primo, doble): (${p1},${2*p1}), (${p2},${2*p2})... Luego viene el siguiente primo.`, mode:"near" };
  }

  const TEMPLATES = [
    t_arith,
    t_arith_down,
    t_geom,
    t_double_plus,
    t_squares_shift,
    t_triangular_shift,
    t_alt_add_sub,
    t_inc_diffs,
    t_odd_diffs,
    t_dec_halves,
    t_interleaved,
    t_primes_double
  ];

  function buildQuestion(rng, id, payload) {
    const correct = payload.answer;
    const opt = makeOptions(rng, correct, payload.mode || "mixed");

    return {
      id,
      series: payload.customSeries ? payload.customSeries : seriesStr(payload.nums, true),
      options: opt.options,
      answerIndex: opt.answerIndex,
      explanation: payload.explanation
    };
  }

  function makeSet(setKey, seedBase) {
    const rng = mulberry32(seedBase);
    const questions = [];
    let q = 0;
    let attemptsGlobal = 0;

    while (questions.length < 10) {
      if (attemptsGlobal++ > 2000) break; // guardia extrema

      const tmpl = TEMPLATES[(setKey.charCodeAt(1) + questions.length + attemptsGlobal) % TEMPLATES.length];
      const localRng = mulberry32(seedBase + attemptsGlobal * 97 + questions.length * 31);

      // intenta varias veces evitar colisión por "series"
      let made = null;
      for (let t = 0; t < 80; t++) {
        const payload = tmpl(localRng);
        const id = `r1_${setKey}_q${String(q + 1).padStart(2, "0")}`;
        const candidate = buildQuestion(localRng, id, payload);
        const sig = String(candidate.series).trim();

        if (!usedSeries.has(sig)) {
          usedSeries.add(sig);
          made = candidate;
          break;
        }
      }

      if (made) {
        questions.push(made);
        q++;
      }
    }

    return questions;
  }

  // crea s7..s30 (deterministas)
  const s7  = makeSet("s7",  7007);
  const s8  = makeSet("s8",  8008);
  const s9  = makeSet("s9",  9009);
  const s10 = makeSet("s10", 1010);
  const s11 = makeSet("s11", 1111);
  const s12 = makeSet("s12", 1212);
  const s13 = makeSet("s13", 1313);
  const s14 = makeSet("s14", 1414);
  const s15 = makeSet("s15", 1515);
  const s16 = makeSet("s16", 1616);
  const s17 = makeSet("s17", 1717);
  const s18 = makeSet("s18", 1818);
  const s19 = makeSet("s19", 1919);
  const s20 = makeSet("s20", 2020);
  const s21 = makeSet("s21", 2121);
  const s22 = makeSet("s22", 2222);
  const s23 = makeSet("s23", 2323);
  const s24 = makeSet("s24", 2424);
  const s25 = makeSet("s25", 2525);
  const s26 = makeSet("s26", 2626);
  const s27 = makeSet("s27", 2727);
  const s28 = makeSet("s28", 2828);
  const s29 = makeSet("s29", 2929);
  const s30 = makeSet("s30", 3030);

  // ✅ Fuente principal por sets
  window.R1_SETS = {
    sets: {
      s1, s2, s3, s4, s5, s6,
      s7, s8, s9, s10, s11, s12,
      s13, s14, s15, s16, s17, s18,
      s19, s20, s21, s22, s23, s24,
      s25, s26, s27, s28, s29, s30
    }
  };

  // ✅ Compatibilidad: banco plano (unión de todo)
  window.LX_R1_BANK = [].concat(
    s1, s2, s3, s4, s5, s6,
    s7, s8, s9, s10, s11, s12,
    s13, s14, s15, s16, s17, s18,
    s19, s20, s21, s22, s23, s24,
    s25, s26, s27, s28, s29, s30
  );

})();
