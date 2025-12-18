(function () {
  "use strict";

  const storedName = localStorage.getItem("lx_nombre");
  const heroNameSpan = document.getElementById("hero-name");
  const sessionStatusSpan = document.querySelector(".session-status");

  const displayName = storedName || "Invitado";
  if (heroNameSpan) heroNameSpan.textContent = displayName;
  if (sessionStatusSpan) sessionStatusSpan.textContent = storedName ? displayName : "anónima";

  const navMath = document.getElementById("nav-math");
  if (navMath) {
    navMath.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Matemáticas estará disponible próximamente 🙂");
    });
  }

  const authBtn = document.getElementById("btn-auth");
  if (authBtn) {
    authBtn.addEventListener("click", () => {
      alert("Aquí irá la pantalla de inicio de sesión / registro más adelante 🙂");
    });
  }

  const DEFAULT_RULES = [
    "5 preguntas (opción múltiple).",
    "Tiempo: 60 segundos.",
    "+20 por correcta · 0 por incorrecta.",
    "Aprueba: 70/100.",
  ];

  const ENABLED_LEVELS = new Set(["r1"]);

  function getBestScore(levelId) {
    const raw = localStorage.getItem(`lx_logic_${levelId}_best`);
    const val = Number(raw);
    return Number.isFinite(val) ? val : 0;
  }

  function getStatusLabel(best, pass) {
    return best >= pass ? "Aprobado" : "No aprobado";
  }

  function escapeHtml(str) {
    return String(str ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  const META = {
    r1:  { t: "Nivel r1 · Series numéricas", a: "Completa secuencias identificando el patrón (sumas, restas, multiplicación, alternancias).", rules: DEFAULT_RULES },
    r2:  { t: "Nivel r2 · Series alfanuméricas", a: "Patrones con letras y números (saltos, ciclos, posiciones).", rules: DEFAULT_RULES },
    r3:  { t: "Nivel r3 · Analogías", a: "A es a B como C es a __ (relación lógica: función, parte-todo, causa-efecto).", rules: DEFAULT_RULES },
    r4:  { t: "Nivel r4 · Clasificación (intruso)", a: "Elige el elemento que NO pertenece según una regla común.", rules: DEFAULT_RULES },
    r5:  { t: "Nivel r5 · Ordenamientos", a: "Determina orden correcto con pistas (mayor/menor, antes/después).", rules: DEFAULT_RULES },
    r6:  { t: "Nivel r6 · Relaciones y comparaciones", a: "Deducción con relaciones (A > B, B = C, etc.).", rules: DEFAULT_RULES },
    r7:  { t: "Nivel r7 · Lógica de proposiciones", a: "Verdadero/falso según conectores (y, o, si… entonces).", rules: DEFAULT_RULES },
    r8:  { t: "Nivel r8 · Silogismos", a: "Conclusiones válidas a partir de premisas (todos/algunos/ninguno).", rules: DEFAULT_RULES },
    r9:  { t: "Nivel r9 · Conjuntos (Venn)", a: "Unión/intersección/complemento con situaciones sencillas.", rules: DEFAULT_RULES },
    r10: { t: "Nivel r10 · Secuencias de figuras", a: "Identifica el patrón visual (repetición, crecimiento, alternancia).", rules: DEFAULT_RULES },
    r11: { t: "Nivel r11 · Rotaciones y simetrías", a: "Reconoce giros, reflejos y simetría axial/central.", rules: DEFAULT_RULES },
    r12: { t: "Nivel r12 · Figuras en cuadrícula", a: "Traslaciones, conteo y patrones en mallas.", rules: DEFAULT_RULES },
    r13: { t: "Nivel r13 · Matrices 2×2 (figuras)", a: "Completa la casilla faltante por regla de filas/columnas.", rules: DEFAULT_RULES },
    r14: { t: "Nivel r14 · Matrices 3×3 (intro)", a: "Reglas simples para completar matrices visuales.", rules: DEFAULT_RULES },
    r15: { t: "Nivel r15 · Plegado de papel (intro)", a: "Predice perforaciones o formas tras doblar/desdoblar.", rules: DEFAULT_RULES },
    r16: { t: "Nivel r16 · Cubos y caras (desarrollos)", a: "Asocia redes de cubos con el cubo armado.", rules: DEFAULT_RULES },
    r17: { t: "Nivel r17 · Conteo lógico", a: "Conteos cortos sin fórmulas pesadas: casos posibles.", rules: DEFAULT_RULES },
    r18: { t: "Nivel r18 · Probabilidad básica", a: "Probabilidad en eventos simples (equiprobables).", rules: DEFAULT_RULES },
    r19: { t: "Nivel r19 · Patrones con reglas", a: "Encuentra la regla exacta que genera una serie o figura.", rules: DEFAULT_RULES },
    r20: { t: "Nivel r20 · Deducción con pistas", a: "Rompecabezas tipo ‘quién vive dónde’ (tabla de pistas).", rules: DEFAULT_RULES },
    r21: { t: "Nivel r21 · Direcciones y recorridos", a: "Norte/sur/este/oeste, giros y ubicación final.", rules: DEFAULT_RULES },
    r22: { t: "Nivel r22 · Parentescos", a: "Deducción con relaciones familiares (tío, primo, suegro).", rules: DEFAULT_RULES },
    r23: { t: "Nivel r23 · Cronología", a: "Ordena eventos por fechas/tiempos con información parcial.", rules: DEFAULT_RULES },
    r24: { t: "Nivel r24 · Tablas y reglas", a: "Completa celdas siguiendo una regla de tabla.", rules: DEFAULT_RULES },
    r25: { t: "Nivel r25 · Inferencia corta", a: "Elige la conclusión que sí se deduce (sin suposiciones).", rules: DEFAULT_RULES },
    r26: { t: "Nivel r26 · Supuestos (intro)", a: "Identifica qué debe ser cierto para que el argumento funcione.", rules: DEFAULT_RULES },
    r27: { t: "Nivel r27 · Errores comunes", a: "Detecta generalización, confusión causa-correlación, etc.", rules: DEFAULT_RULES },
    r28: { t: "Nivel r28 · Patrones mixtos", a: "Series que mezclan dos reglas o dos subsecuencias.", rules: DEFAULT_RULES },
    r29: { t: "Nivel r29 · Velocidad y precisión", a: "Ejercicios cortos para responder rápido sin perder exactitud.", rules: DEFAULT_RULES },
    r30: { t: "Nivel r30 · Mini-reto Abstracto", a: "Combinación de patrones y deducción (repaso del bloque).", rules: DEFAULT_RULES },

    r31: { t: "Nivel r31 · ICFES: patrones en contexto", a: "Series y patrones aplicados a situaciones (tiempo, turnos, cantidades).", rules: DEFAULT_RULES },
    r32: { t: "Nivel r32 · ICFES: tablas (lectura)", a: "Lee tablas y elige conclusiones directas (sin cálculos largos).", rules: DEFAULT_RULES },
    r33: { t: "Nivel r33 · ICFES: gráficos (lectura)", a: "Interpreta barras/líneas: máximos, mínimos, tendencias.", rules: DEFAULT_RULES },
    r34: { t: "Nivel r34 · ICFES: proporcionalidad", a: "Razones, proporciones y comparaciones (regla de tres mental).", rules: DEFAULT_RULES },
    r35: { t: "Nivel r35 · ICFES: porcentajes", a: "Descuentos, aumentos y comparaciones porcentuales.", rules: DEFAULT_RULES },
    r36: { t: "Nivel r36 · ICFES: promedio y mediana", a: "Interpreta medidas de tendencia central en contexto.", rules: DEFAULT_RULES },
    r37: { t: "Nivel r37 · ICFES: dispersión (básico)", a: "Rango, variación y lectura general de datos.", rules: DEFAULT_RULES },
    r38: { t: "Nivel r38 · ICFES: probabilidad en contexto", a: "Eventos simples con urnas, rifas, encuestas.", rules: DEFAULT_RULES },
    r39: { t: "Nivel r39 · ICFES: combinaciones simples", a: "Conteo de opciones (menús, rutas, selecciones) sin fórmulas largas.", rules: DEFAULT_RULES },
    r40: { t: "Nivel r40 · ICFES: lógica de enunciados", a: "Condicionales y negaciones en lenguaje natural.", rules: DEFAULT_RULES },
    r41: { t: "Nivel r41 · ICFES: argumentos (conclusión)", a: "Identifica conclusión y premisas en un texto corto.", rules: DEFAULT_RULES },
    r42: { t: "Nivel r42 · ICFES: supuestos", a: "Encuentra la idea que el argumento da por sentada.", rules: DEFAULT_RULES },
    r43: { t: "Nivel r43 · ICFES: fortalecer/debilitar", a: "Elige la opción que fortalece o debilita una conclusión.", rules: DEFAULT_RULES },
    r44: { t: "Nivel r44 · ICFES: causa vs correlación", a: "Diferencia relación estadística de causalidad.", rules: DEFAULT_RULES },
    r45: { t: "Nivel r45 · ICFES: extrapolación cuidadosa", a: "Conclusiones válidas sin ir más allá de los datos.", rules: DEFAULT_RULES },
    r46: { t: "Nivel r46 · ICFES: interpretación de reglas", a: "Aplica una regla (norma, condición) a casos.", rules: DEFAULT_RULES },
    r47: { t: "Nivel r47 · ICFES: comparación de escenarios", a: "¿Qué cambia si…? analiza efectos de una modificación.", rules: DEFAULT_RULES },
    r48: { t: "Nivel r48 · ICFES: lectura multi-paso", a: "Interpretación con 2 pasos (dato → cálculo corto → decisión).", rules: DEFAULT_RULES },
    r49: { t: "Nivel r49 · ICFES: unidades y magnitudes", a: "Conversiones simples e interpretación de unidades.", rules: DEFAULT_RULES },
    r50: { t: "Nivel r50 · ICFES: geometría en contexto", a: "Perímetro/área básicos aplicados a situaciones.", rules: DEFAULT_RULES },
    r51: { t: "Nivel r51 · ICFES: funciones (idea)", a: "Relación variable→variable: lectura de tablas y gráficas.", rules: DEFAULT_RULES },
    r52: { t: "Nivel r52 · ICFES: tendencia y predicción", a: "Lee tendencia y estima valores razonables.", rules: DEFAULT_RULES },
    r53: { t: "Nivel r53 · ICFES: consistencia", a: "Detecta contradicciones entre enunciados/datos.", rules: DEFAULT_RULES },
    r54: { t: "Nivel r54 · ICFES: selección de estrategia", a: "Elige el método más eficiente para resolver (sin hacer todo).", rules: DEFAULT_RULES },
    r55: { t: "Nivel r55 · ICFES: trampas típicas", a: "Distingue opciones distractoras frecuentes.", rules: DEFAULT_RULES },
    r56: { t: "Nivel r56 · ICFES: razonamiento con condiciones", a: "Si A entonces B; si no A… casos y consecuencias.", rules: DEFAULT_RULES },
    r57: { t: "Nivel r57 · ICFES: diagramas y rutas", a: "Interpretación de mapas/diagramas para decidir.", rules: DEFAULT_RULES },
    r58: { t: "Nivel r58 · ICFES: síntesis de información", a: "Combina 2 fuentes (tabla+texto / gráfico+texto).", rules: DEFAULT_RULES },
    r59: { t: "Nivel r59 · ICFES: mini-simulacro", a: "Mezcla de ítems tipo examen (tiempo, datos, argumento).", rules: DEFAULT_RULES },
    r60: { t: "Nivel r60 · Cierre: simulacro global", a: "Repaso general (Abstracto + ICFES) con enfoque en decisiones.", rules: DEFAULT_RULES },
  };

  function defaultAction(id) {
    alert(`${id} aún está en construcción.`);
  }

  const ACTIONS = {
    r1: () => (window.location.href = "./Niveles/r1/r1.html"),
  };

  const LEVELS = Array.from({ length: 60 }, (_, idx) => {
    const n = idx + 1;
    const id = `r${n}`;
    const meta = META[id] || {};

    const enabled = ENABLED_LEVELS.has(id);
    const action = enabled ? (ACTIONS[id] || (() => defaultAction(id))) : (() => defaultAction(id));

    return {
      id,
      number: n,
      block: n <= 30 ? "abstracto" : "icfes",
      title: meta.t || `Nivel ${id} · Próximamente`,
      about: meta.a || "Este nivel aparecerá aquí y lo activamos cuando esté listo.",
      rules: meta.rules || DEFAULT_RULES,
      maxScore: 100,
      passScore: 70,
      enabled,
      action,
    };
  });

  const grid = document.getElementById("levels-grid");
  if (!grid) return;

  function ensureFilterBar() {
    const existing = document.getElementById("rx-filter");
    if (existing) return existing;

    const bar = document.createElement("div");
    bar.id = "rx-filter";
    bar.className = "rx-filter";
    bar.setAttribute("role", "group");
    bar.setAttribute("aria-label", "Filtros de niveles");

    grid.parentElement.insertBefore(bar, grid);
    return bar;
  }

  const filterBar = ensureFilterBar();

  const FILTERS = [
    { key: "all" },
    { key: "abstracto" },
    { key: "icfes" },
  ];

  let currentFilter = "all";

  function filterLabel(key) {
    const total = LEVELS.length;
    const a = LEVELS.filter((x) => x.block === "abstracto").length;
    const b = LEVELS.filter((x) => x.block === "icfes").length;

    if (key === "all") return `Todos (${total})`;
    if (key === "abstracto") return `Abstracto (${a})`;
    if (key === "icfes") return `ICFES (${b})`;
    return key;
  }

  function insertBlockHeader(title, subtitle, countText) {
    const header = document.createElement("div");
    header.className = "levels-header";
    header.innerHTML = `
      <div class="levels-header-top">
        <h3 class="levels-header-title">${escapeHtml(title)}</h3>
        <span class="badge badge--muted">${escapeHtml(countText)}</span>
      </div>
      <p class="levels-header-sub">${escapeHtml(subtitle)}</p>
    `;
    grid.appendChild(header);
  }

  function shouldShowLevel(lvl) {
    return currentFilter === "all" ? true : lvl.block === currentFilter;
  }

  function renderCard(lvl) {
    const best = getBestScore(lvl.id);
    const status = getStatusLabel(best, lvl.passScore);
    const statusClass = status === "Aprobado" ? "badge--ok" : "badge--no";
    const blockLabel = lvl.block === "abstracto" ? "Abstracto" : "ICFES";

    const card = document.createElement("article");
    card.className = `level-card${lvl.enabled ? "" : " is-disabled"}`;

    card.setAttribute("data-level", lvl.id);
    if (lvl.enabled) {
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `Abrir ${lvl.id}`);
    } else {
      card.setAttribute("aria-disabled", "true");
    }

    card.innerHTML = `
      <div class="level-top">
        <div>
          <h3 class="level-name">${escapeHtml(lvl.title)}</h3>
          <div class="badges">
            <span class="badge ${statusClass}">${escapeHtml(status)}</span>
            <span class="badge badge--muted">${escapeHtml(blockLabel)}</span>
            <span class="badge badge--muted">Meta: ${lvl.passScore}/${lvl.maxScore}</span>
          </div>
        </div>
        <span class="badge">${escapeHtml(lvl.id)}</span>
      </div>

      <p class="level-about"><strong>Se trata de:</strong> ${escapeHtml(lvl.about)}</p>

      <div class="level-block">
        <p class="level-block-title">Reglas del nivel</p>
        <ul class="level-rules">
          ${lvl.rules.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}
        </ul>
      </div>

      <div class="level-block">
        <p class="level-block-title">Puntuación del nivel</p>
        <div class="level-score">
          <span class="score-pill"><strong>Mejor:</strong> ${best}/${lvl.maxScore}</span>
          <span class="score-pill"><strong>Aprobar:</strong> ${lvl.passScore}/${lvl.maxScore}</span>
        </div>
      </div>

      <div class="level-actions">
        <button class="btn btn-dark" type="button" ${lvl.enabled ? "" : "disabled"} data-level="${escapeHtml(lvl.id)}">
          ${lvl.enabled ? "Entrar" : "Próximamente"}
        </button>
      </div>
    `;

    grid.appendChild(card);
  }

  function renderFilterBarUI() {
    if (!filterBar) return;

    filterBar.innerHTML = FILTERS.map((f) => {
      const isActive = f.key === currentFilter;
      return `
        <button type="button"
          class="rx-filter-btn ${isActive ? "is-active" : ""}"
          data-filter="${f.key}"
          aria-pressed="${isActive ? "true" : "false"}">
          ${escapeHtml(filterLabel(f.key))}
        </button>
      `;
    }).join("");
  }

  function renderLevels() {
    grid.innerHTML = "";

    const visible = LEVELS.filter(shouldShowLevel);
    if (!visible.length) {
      grid.innerHTML = `<div class="levels-header"><b>No hay niveles para mostrar.</b></div>`;
      return;
    }

    const abstracto = visible.filter((x) => x.block === "abstracto");
    const icfes = visible.filter((x) => x.block === "icfes");

    if (abstracto.length) {
      insertBlockHeader(
        "Bloque A · Razonamiento Abstracto",
        "Patrones, deducción y visual (base del pensamiento lógico).",
        `${abstracto.length} niveles`
      );
      abstracto.forEach(renderCard);
    }

    if (icfes.length) {
      insertBlockHeader(
        "Bloque B · Estilo ICFES",
        "Interpretación, argumentos y decisiones tipo examen.",
        `${icfes.length} niveles`
      );
      icfes.forEach(renderCard);
    }
  }

  function bindFilterOnce() {
    if (!filterBar) return;
    if (filterBar.dataset.bound === "1") return;
    filterBar.dataset.bound = "1";

    filterBar.addEventListener("click", (e) => {
      const btn = e.target && e.target.closest && e.target.closest("button[data-filter]");
      if (!btn) return;

      currentFilter = btn.getAttribute("data-filter") || "all";

      filterBar.querySelectorAll(".rx-filter-btn").forEach((b) => {
        const k = b.getAttribute("data-filter");
        const active = k === currentFilter;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", active ? "true" : "false");
      });

      renderLevels();
    });
  }

  function openLevelById(id) {
    const lvl = LEVELS.find((x) => x.id === id);
    if (!lvl || !lvl.enabled) return;
    lvl.action();
  }

  function bindGridOnce() {
    if (!grid) return;
    if (grid.dataset.bound === "1") return;
    grid.dataset.bound = "1";

    grid.addEventListener("click", (e) => {
      const btn = e.target && e.target.closest && e.target.closest("button[data-level]");
      if (btn) {
        openLevelById(btn.getAttribute("data-level"));
        return;
      }

      const card = e.target && e.target.closest && e.target.closest("[data-level]");
      if (!card) return;

      openLevelById(card.getAttribute("data-level"));
    });

    grid.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;

      const card = e.target && e.target.closest && e.target.closest("[data-level]");
      if (!card) return;

      e.preventDefault();
      openLevelById(card.getAttribute("data-level"));
    });
  }

  renderFilterBarUI();
  bindFilterOnce();
  bindGridOnce();
  renderLevels();
})();
