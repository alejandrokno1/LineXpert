/* ===== Matemáticas · Lógica de la página =====
   - Genera tarjetas desde una config (LEVELS)
   - Cache local para feedback instantáneo
   - Hidrata con Firestore (canónico + legacy)
   - Chip "Mis puntos"
   - Leaderboard Top 10
   - API pública: window.updateMathRecord(id, { bestApm, precision, passed })
*/
(() => {
  // ------- Helpers DOM -------
  const qs  = (s, r = document) => r.querySelector(s);
  const $levels    = qs('#levels');
  const $greeting  = qs('#lx-greeting');
  const $session   = qs('#lx-session');
  const $metaBar   = qs('.meta-bar');
  const $lbList    = qs('#lbList');
  const $lbEmpty   = qs('#lbEmpty');

  if (!$levels) return;

  // ------- Saludo / sesión (fallback local) -------
  const fallbackName   = localStorage.getItem('lx_user_name') || 'Invitado';
  const fallbackLogged = !!localStorage.getItem('lx_user_id');
  if ($greeting) $greeting.textContent = `Hola, ${fallbackName} 👋`;
  if ($session)  $session.textContent  = fallbackLogged ? 'iniciada' : 'anónima';

  // ------- Esperar a LX (auth.js) -------
  function whenLXReady() {
    return new Promise(resolve => {
      if (window.LX?.auth) return resolve(window.LX);
      const once = () => { window.removeEventListener('lx-auth-ready', once); resolve(window.LX); };
      window.addEventListener('lx-auth-ready', once, { once: true });
    });
  }
  (async () => {
    const LX = await whenLXReady();
    try {
      const name = LX.auth.currentUser?.displayName || 'Invitado';
      if ($greeting) $greeting.textContent = `Hola, ${name} 👋`;
      if ($session)  $session.textContent  = LX.auth.currentUser ? 'iniciada' : 'anónima';
    } catch {}
  })();

  // ------- Config de niveles -------
  const LEVELS = Object.freeze([
    {
      id: 'n1',
      title: 'Nivel 1 · Sumas',
      subtitle: 'Operaciones básicas → 1:00.',
      rule: 'Apruebas con 2 aciertos.',
      time: '1:00',
      route: './n1/n1.html',
      enabled: true,
      details: {
        obj: 'Practicar sumas mentales rápidas.',
        dyn: 'Ítems de respuesta única con cronómetro (feedback inmediato).',
        texts: 'Operaciones'
      }
    },
    {
      id: 'n2',
      title: 'Nivel 2 · Sumas y Restas',
      subtitle: 'Enteros y decimales con signos (presentación limpia).',
      rule: 'Apruebas con 2 aciertos en 1:00.',
      time: '1:00',
      route: './n2/n2.html',
      enabled: true,
      details: {
        obj: 'Consolidar agilidad con sumas y restas con signo.',
        dyn: 'Problemas cortos y cálculo mental cronometrado.',
        texts: 'Operaciones'
      }
    },

    
{
  id: 'n3',
  title: 'Nivel 3 · Multiplicación',
  subtitle: 'Enteros y decimales positivos; sin negativos.',
  rule: 'Apruebas con 1 acierto en 1:00.',
  time: '1:00',
  route: './n3/n3.html',   // <-- importante
  enabled: true,           // <-- de false a true
  details: {
    obj: 'Agilizar productos básicos.',
    dyn: 'Multiplicaciones decimal×entero o decimal×decimal (sin entero×entero).',
    texts: 'Operaciones'
  }
},



{
  id: 'n4',
  title: 'Nivel 4 · División',
  subtitle: 'Enteros y decimales; resultados exactos.',
  rule: 'Apruebas con 2 aciertos en 1:00.',
  time: '1:00',
  route: './n4/n4.html',   // ← importante: apunta al archivo que creaste
  enabled: true,           // ← esto activa el botón
  details: {
    obj: 'Agilidad en divisiones exactas.',
    dyn: 'Variedad: con/sin decimales en ambos o uno solo.',
    texts: 'Operaciones'
  }
},



{
  id: 'n5',
  title: 'Nivel 5 · Potenciación',
  subtitle: 'Exponentes positivos hasta 4. Sumas y productos sencillos.',
  rule: 'Apruebas con 3 aciertos en 1:00.',
  time: '1:00',
  route: './n5/n5.html',
  enabled: true,
  details: {
    obj: 'Manejar potencias pequeñas mentalmente.',
    dyn: 'Ítems de potencia simple, suma y producto.',
    texts: 'Operaciones'
  }
},
{
  id: 'n6',
  title: 'Nivel 6 · Notación científica',
  subtitle: 'Convierte entre decimal y científica (modo estricto opcional).',
  rule: 'Apruebas con 3 aciertos en 1:00.',
  time: '1:00',
  route: './n6/n6.html',
  enabled: true,
  details: {
    obj: 'Comprender y practicar la notación científica.',
    dyn: 'Conversiones decimal↔científica con equivalencias válidas.',
    texts: 'Números reales'
  }
},


{
  id: 'n7',
  title: 'Nivel 7 · Fracciones: simplificar',
  subtitle: 'Reduce a la mínima expresión.',
  rule: 'Apruebas con 4 aciertos en 1:00.',
  time: '1:00',
  route: './n7/n7.html',   // ← RUTA AL HTML DEL NIVEL (desde matematicas.html)
  enabled: true,           // ← ESTO ACTIVA EL BOTÓN "Inicio"
  details: {
    obj: 'Reducir fracciones a su forma irreducible.',
    dyn: 'Respuesta en formato a/b; signo en el numerador.',
    texts: 'Operaciones'
  }
},
   
{
  id: 'n8',
  title: 'Nivel 8 · Decimal ↔ Fracción',
  subtitle: 'Convierte entre decimal finito y fracción irreducible.',
  rule: 'Apruebas con 2 aciertos en 1:00.',
  time: '1:00',
  route: './n8/n8.html',   // ← ruta al HTML del nivel (desde matematicas.html)
  enabled: true,           // ← esto activa el botón "Inicio"
  details: {
    obj: 'Reconocer y convertir decimales finitos a fracciones irreducibles y viceversa.',
    dyn: 'Escribe "a/b" para fracción o un decimal con punto/coma. Se acepta equivalencia exacta; signo en el numerador y denominador positivo.',
    texts: 'Equivalencias'
  }
}
  
  ]);

  // Mapa Firestore (canónico + legacy)
const FS_IDS = Object.freeze({
  n1: ['math_n1', 'math_l1'],
  n2: ['math_n2', 'math_l2'],
  n3: ['math_n3', 'math_l3'],
  n4: ['math_n4', 'math_l4'],
  n5: ['math_n5', 'math_l5'],
  n6: ['math_n6', 'math_l6'],
  n7: ['math_n7', 'math_l7'],
  n8: ['math_n8', 'math_l8'],   // ← añade esta línea
});

  // ------- Persistencia local -------
  const STORAGE_PREFIX = 'lx_math_record_';
  const key       = (id) => `${STORAGE_PREFIX}${id}`;
  const safeParse = (s) => { try { return JSON.parse(s); } catch { return null; } };
  const getRecord = (id)   => safeParse(localStorage.getItem(key(id))) || null;
  const setRecord = (id,o) => localStorage.setItem(key(id), JSON.stringify(o));

  // API pública (la usan los subniveles para reportar resultados)
  window.updateMathRecord = function (id, stats = {}) {
    const prev = getRecord(id) || {};
    const bestApm   = Math.max(Number(prev.bestApm) || 0, Number(stats.bestApm) || 0);
    const precision = Number.isFinite(stats.precision) ? Number(stats.precision) : (Number(prev.precision) || 0);
    const passed    = Boolean(stats.passed) || Boolean(prev.passed);
    setRecord(id, { bestApm, precision, passed, ts: Date.now() });
    try { refreshCard(id); } catch {}
  };

  // ------- UI helpers -------
  const fmtPct = (x) => `${(Number(x) * 100 || 0).toFixed(0)}%`;
  const fmtApm = (x) => (Number(x) || 0).toFixed(2);

  function createCard(level){
    const rec      = getRecord(level.id);
    const passed   = !!rec?.passed;
    const disabled = !level.enabled;

    const el = document.createElement('article');
    el.className = `level-card${passed ? ' passed' : ''}${disabled ? ' disabled' : ''}`;
    el.dataset.level = level.id;

    const recordHtml = rec
      ? `<div class="level-record" title="Mejor registro">
           <span>Mejor: APM ${fmtApm(rec.bestApm)}</span>
           <span>·</span>
           <span>Precisión ${fmtPct(rec.precision)}</span>
         </div>`
      : `<div class="level-record" style="opacity:.6">Sin récord</div>`;

    el.innerHTML = `
      <div class="level-top">
        ${passed ? `<span class="badge success">✓ Superado</span>` : `<span class="badge">•</span>`}
        <span class="level-title">${level.title}</span>
      </div>

      ${level.subtitle ? `<div class="level-sub">${level.subtitle}</div>` : ''}
      ${level.rule     ? `<div class="level-rule">${level.rule}</div>`       : ''}

      <div class="kv">
        <p><b>Objetivo:</b> ${level.details?.obj   ?? '—'}</p>
        <p><b>Dinámica:</b> ${level.details?.dyn   ?? '—'}</p>
        <p><b>Texto:</b>    ${level.details?.texts ?? 'Operaciones'}</p>
      </div>

      ${recordHtml}

      <div class="level-foot">
        ${disabled
          ? `<span class="pill">Próximamente</span>`
          : `<a class="btn btn-primary" href="${level.route}">Inicio</a>`}
        ${level.time ? `<span class="level-time">Tiempo total: ${level.time}</span>` : '<span></span>'}
      </div>
    `;
    return el;
  }

  function markPassed(card, on = true) {
    if (!card) return;
    card.classList.toggle('passed', !!on);
    const badge = card.querySelector('.level-top .badge');
    if (badge) {
      badge.classList.toggle('success', !!on);
      badge.textContent = on ? '✓ Superado' : '•';
    }
  }
  function setRecordUI(card, { bestApm, precision } = {}) {
    if (!card) return;
    const recEl = card.querySelector('.level-record');
    if (!recEl) return;
    if (Number.isFinite(bestApm) || Number.isFinite(precision)) {
      recEl.style.opacity = '';
      recEl.innerHTML =
        `<span>Mejor: APM ${fmtApm(bestApm)}</span><span>·</span><span>Precisión ${fmtPct(precision ?? 0)}</span>`;
    } else {
      recEl.style.opacity = '.6';
      recEl.textContent = 'Sin récord';
    }
  }

  // ------- Insertar tarjetas -------
  const frag = document.createDocumentFragment();
  LEVELS.forEach(l => frag.appendChild(createCard(l)));
  $levels.textContent = '';
  $levels.appendChild(frag);

  // ------- Hidratar con Firestore -------
  function normalizeAcc(x) {
    const v = Number(x);
    if (!Number.isFinite(v)) return null;
    if (v > 1 && v <= 100) return v / 100; // si viene en %
    return v; // 0..1 esperado
  }
  function progressToBest(data) {
    if (!data) return { apm: null, acc: null, passed: false };
    const apm = Number.isFinite(+data.best_apm) ? +data.best_apm
              : Number.isFinite(+data.last_result?.apm) ? +data.last_result.apm
              : null;
    const acc = Number.isFinite(+data.best_acc) ? normalizeAcc(+data.best_acc)
              : Number.isFinite(+data.last_result?.acc) ? normalizeAcc(+data.last_result.acc)
              : null;
    const passed = (data.passes_count || 0) > 0 || !!data.last_result?.passed;
    return { apm, acc, passed };
  }
  async function fetchCloudInfoFor(levelId) {
    const ids = FS_IDS[levelId];
    const LX = window.LX;
    if (!LX?.loadProgress || !ids) return null;
    const [d1, d2] = await Promise.all([
      LX.loadProgress(ids[0]),
      LX.loadProgress(ids[1]),
    ]);
    const b1 = progressToBest(d1);
    const b2 = progressToBest(d2);
    const bestApm = Math.max(b1.apm || 0, b2.apm || 0) || null;
    const bestAcc = (b1.acc ?? 0) >= (b2.acc ?? 0) ? b1.acc : b2.acc;
    const passed = !!(b1.passed || b2.passed);
    return { bestApm, precision: bestAcc ?? 0, passed };
  }

  async function refreshCard(levelId) {
    const card = qs(`.level-card[data-level="${levelId}"]`);
    if (!card) return;

    // Local primero (instantáneo)
    const local = getRecord(levelId);
    if (local) {
      setRecordUI(card, { bestApm: local.bestApm, precision: local.precision });
      if (local.passed) markPassed(card, true);
    }

    // Cloud sobreescribe si está disponible
    if (window.LX?.loadProgress) {
      try {
        const cloud = await fetchCloudInfoFor(levelId);
        if (cloud) {
          setRecord(levelId, { ...local, ...cloud, ts: Date.now() });
          setRecordUI(card, { bestApm: cloud.bestApm, precision: cloud.precision });
          markPassed(card, !!cloud.passed);
        }
      } catch {}
    }
  }

  function refreshAll() { ['n1','n2','n3','n4'].forEach(id => refreshCard(id)); }

  // ------- Chip "Mis puntos" -------
  function ensurePointsChip() {
    if (!$metaBar) return null;
    let chip = qs('.points-chip');
    if (chip) return chip;
    chip = document.createElement('div');
    chip.className = 'session-chip points-chip';
    chip.innerHTML = `Mis puntos: <strong id="lx-points">0</strong>`;
    // Insertar antes del botón "Volver" si existe
    const backBtn = $metaBar.querySelector('a.btn');
    $metaBar.insertBefore(chip, backBtn ?? null);
    return chip;
  }
  async function refreshPoints() {
    await whenLXReady();
    ensurePointsChip();
    try {
      const total = await (window.LX?.recalcMyPoints?.() ?? Promise.resolve(0));
      const el = qs('#lx-points');
      if (el) el.textContent = String(total);
    } catch {}
  }
  // Pequeño debounce para no spamear recálculos
  let ptsTimeout = null;
  function scheduleRefreshPoints(ms = 400) {
    clearTimeout(ptsTimeout);
    ptsTimeout = setTimeout(refreshPoints, ms);
  }

  // ------- Leaderboard Top 10 -------
  let unsubLB = null;
  async function startLeaderboard() {
    const LX = await whenLXReady();
    if (!LX?.subscribeLeaderboard || !$lbList) return null;

    if ($lbEmpty) { $lbEmpty.textContent = 'Cargando...'; $lbEmpty.classList.remove('hidden'); }
    $lbList.innerHTML = '';

    const unsub = LX.subscribeLeaderboard((rows) => {
      $lbList.innerHTML = '';
      if (!rows.length) {
        if ($lbEmpty) { $lbEmpty.textContent = 'Aún no hay puntajes.'; $lbEmpty.classList.remove('hidden'); }
        return;
      }
      $lbEmpty?.classList.add('hidden');

      rows.forEach((r, i) => {
        const li = document.createElement('li');
        li.className = 'lb-row';
        const name = (r.public_name || r.displayName || 'Invitado') + '';
        const trimmed = name.length > 30 ? name.slice(0, 27) + '…' : name;
        li.innerHTML = `
          <span class="pos">${i + 1}</span>
          <span class="name" title="${name}">${trimmed}</span>
          <span class="pts">${r.total_points ?? 0}</span>
        `;
        $lbList.appendChild(li);
      });
    }, 10);

    return unsub;
  }

  // ------- Wiring -------
  (async () => {
    await whenLXReady();
    refreshAll();
    ensurePointsChip();
    scheduleRefreshPoints(0);
    if (!unsubLB) unsubLB = await startLeaderboard();
  })();

  document.addEventListener('DOMContentLoaded', async () => {
    refreshAll();
    ensurePointsChip();
    scheduleRefreshPoints(0);
    if (window.LX?.subscribeLeaderboard && !unsubLB) unsubLB = await startLeaderboard();
  });

  // Refrescar al terminar un nivel
  window.addEventListener('lx-progress-updated', (ev) => {
    const { levelId } = ev.detail || {};
    for (const cardId of Object.keys(FS_IDS)) {
      if (FS_IDS[cardId].includes(levelId)) {
        refreshCard(cardId);
        break;
      }
    }
    scheduleRefreshPoints();
  });

  // Limpieza del listener del ranking
  window.addEventListener('beforeunload', () => { try { unsubLB?.(); } catch {} });
})();
