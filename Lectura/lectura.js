/* ===== Lectura · Lógica =====
   Mantiene misma API/estilo que Matemáticas.
   Guardamos intentos, mejor WPM, precisión y si pasó el nivel.
*/
(function () {
  const $levels = document.getElementById('levels');
  const $greeting = document.getElementById('lx-greeting');
  const $session  = document.getElementById('lx-session');

  // Greeting / sesión (ajusta si tienes auth real)
  const userName = localStorage.getItem('lx_user_name') || 'Invitado';
  const isLogged = !!localStorage.getItem('lx_user_id');
  $greeting.textContent = `Hola, ${userName} 👋`;
  $session.textContent = isLogged ? 'iniciada' : 'anónima';

  // ---------- Config de niveles ----------
  // time: tiempo total de la práctica (lectura + preguntas)
  // route: a dónde navega el botón "Inicio"
  const LEVELS = [
    {
      id: 'l1',
      title: 'Nivel 1 · Velocidad literal',
      subtitle: '1 párrafo (150–180 palabras) → 1:00 de lectura + 1:00 para 4 preguntas.',
      rule: '',
      time: '2:00',
      details: {
        obj: 'Leer rápido información explícita.',
        dyn: 'Lectura cronometrada y 4 preguntas literales.',
        texts: 'Divulgación breve.'
      },
      route: './n1/index.html',
      enabled: true
    },
    {
      id: 'l2',
      title: 'Nivel 2 · Lectura Superficial/Velocidad',
      subtitle: '1 párrafo (≈200–260 palabras) → 1:00 de lectura + 1:00 para 4 preguntas.',
      rule: 'Meta de aprobación: ≥ 200 WPM y ≥ 75% de precisión.',
      time: '2:00',
      details: {
        obj: 'Captar datos visibles con mayor ritmo.',
        dyn: 'Lectura con tiempo y control de WPM + precisión.',
        texts: 'Expositivo breve.'
      },
      route: './n2/index.html',
      enabled: true
    },
    {
      id: 'l3',
      title: 'Nivel 3 · Idea principal & estructura (Skimming)',
      subtitle: '',
      rule: '',
      time: '',
      details: {
        obj: 'Captar la idea general y macroestructura.',
        dyn: 'Lectura con tiempo + selección de idea central.',
        texts: 'Expositivo breve, reseñas.'
      },
      route: '#',
      enabled: false
    },
    {
      id: 'l4',
      title: 'Nivel 4 · Búsqueda puntual (Scanning)',
      subtitle: '',
      rule: '',
      time: '',
      details: {
        obj: 'Localizar datos específicos con rapidez.',
        dyn: 'Preguntas de dato y subrayado guiado.',
        texts: 'Noticias, notas técnicas.'
      },
      route: '#',
      enabled: false
    },
    { id: 'l5',
      title: 'Nivel 5 · Vocabulario en contexto',
      subtitle: '',
      rule: '',
      time: '',
      details: {
        obj: 'Inferir significados por contexto.',
        dyn: 'Opción múltiple de sinónimos/frases.',
        texts: 'Divulgación, relatos.'
      },
      route: '#', enabled:false
    },
    { id: 'l6',
      title: 'Nivel 6 · Inferencias',
      subtitle: '',
      rule: '',
      time: '',
      details: {
        obj: 'Deducir información no explícita.',
        dyn: 'Conclusiones a partir de pistas del texto.',
        texts: 'Narraciones, noticias.'
      },
      route: '#', enabled:false
    },
    { id: 'l7',
      title: 'Nivel 7 · Múltiples textos (síntesis básica)',
      subtitle: '',
      rule: '',
      time: '',
      details: {
        obj: 'Integrar dos fuentes sobre un tema.',
        dyn: 'Matriz de evidencias + mini síntesis.',
        texts: 'Dos notas breves.'
      },
      route: '#', enabled:false
    },
    { id: 'l8',
      title: 'Nivel 8 · Síntesis y evaluación',
      subtitle: '',
      rule: '',
      time: '',
      details: {
        obj: 'Resumir y valorar lo leído.',
        dyn: 'Resumen guiado + justificación.',
        texts: 'Ensayos cortos.'
      },
      route: '#', enabled:false
    }
  ];

  // ---------- Persistencia ----------
  const KEY = id => `lx_read_record_${id}`;
  function getRecord(id){
    try { return JSON.parse(localStorage.getItem(KEY(id)) || 'null'); }
    catch { return null; }
  }
  function setRecord(id, data){ localStorage.setItem(KEY(id), JSON.stringify(data)); }

  // API pública para que cada subpágina reporte resultados:
  // window.updateReadingRecord('l2', { attempts: 3, bestWpm: 230, precision: 0.80, passed: true })
  window.updateReadingRecord = function(id, stats){
    const prev = getRecord(id) || {};
    const attempts = Number(prev.attempts || 0) + Number(stats.attempts || 0 || 1);
    const bestWpm = Math.max(prev.bestWpm || 0, Number(stats.bestWpm || 0));
    const precision = Number(stats.precision ?? prev.precision ?? 0);
    const passed = Boolean(stats.passed || prev.passed);
    setRecord(id, { attempts, bestWpm, precision, passed, ts: Date.now() });
  };

  // ---------- Render ----------
  const fmtPct = x => `${(Number(x)*100).toFixed(0)}%`;
  const fmtWpm = x => `${Number(x).toFixed(0)} WPM`;

  function card(level){
    const rec = getRecord(level.id);
    const passed = !!(rec && rec.passed);
    const disabled = !level.enabled;

    const el = document.createElement('article');
    el.className = `level-card${passed ? ' passed' : ''}${disabled ? ' disabled' : ''}`;
    el.setAttribute('data-level', level.id);

    el.innerHTML = `
      <div class="level-top">
        ${passed ? `<span class="badge success">✓ Superado</span>` : `<span class="badge">Intentos ${rec?.attempts ?? 0}</span>`}
        <span class="level-title">${level.title}</span>
      </div>

      ${level.subtitle ? `<div class="level-sub">${level.subtitle}</div>` : '' }
      ${level.rule ? `<div class="level-rule">${level.rule}</div>` : '' }

      <div class="kv">
        ${level.details?.obj ? `<p><b>Objetivo:</b> ${level.details.obj}</p>` : '' }
        ${level.details?.dyn ? `<p><b>Dinámica:</b> ${level.details.dyn}</p>` : '' }
        ${level.details?.texts ? `<p><b>Textos:</b> ${level.details.texts}</p>` : '' }
      </div>

      ${rec ? `
        <div class="level-record" title="Mejor rendimiento">
          ${rec.bestWpm ? `<span>${fmtWpm(rec.bestWpm)}</span>` : ''}
          ${rec.bestWpm && (rec.precision ?? 0) ? '<span>·</span>' : ''}
          ${(rec.precision ?? 0) ? `<span>Precisión ${fmtPct(rec.precision)}</span>` : '<span>Sin precisión</span>'}
        </div>
      ` : `<div class="level-record" style="opacity:.6">Intentos 0</div>`}

      <div class="level-foot">
        ${disabled ? `<span class="pill">Próximamente</span>`
                   : `<a class="btn btn-primary" href="${level.route}">Inicio</a>`}
        ${level.time ? `<span class="level-time">Tiempo total: ${level.time}</span>` : '<span></span>'}
      </div>
    `;

    return el;
  }

  const frag = document.createDocumentFragment();
  LEVELS.forEach(l => frag.appendChild(card(l)));
  $levels.innerHTML = '';
  $levels.appendChild(frag);
})();
