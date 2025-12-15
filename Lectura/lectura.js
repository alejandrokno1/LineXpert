// lectura.js

// =====================
// Sesión / saludo
// =====================
const storedName = localStorage.getItem("lx_nombre");
const heroNameSpan = document.getElementById("hero-name");
const sessionStatusSpan = document.querySelector(".session-status");

const displayName = storedName || "Invitado";
if (heroNameSpan) heroNameSpan.textContent = displayName;
if (sessionStatusSpan) sessionStatusSpan.textContent = storedName ? displayName : "anónima";

// Tabs: Matemáticas (placeholder)
const navMath = document.getElementById("nav-math");
if (navMath) {
  navMath.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Matemáticas estará disponible próximamente 🙂");
  });
}

// Auth placeholder
const authBtn = document.getElementById("btn-auth");
if (authBtn) {
  authBtn.addEventListener("click", () => {
    alert("Aquí irá la pantalla de inicio de sesión / registro más adelante 🙂");
  });
}

// =====================
// Reglas base (según README)
// =====================
const RULES_N1_10 = [
  "5 preguntas (opción múltiple).",
  "Tiempo: 60 segundos.",
  "+20 por correcta · 0 por incorrecta.",
  "Aprueba: 70/100.",
];

const RULES_N11_20 = [
  "7 preguntas (opción múltiple).",
  "Tiempo: 120 segundos.",
  "Puntaje proporcional (se escala a 100).",
  "Aprueba: 70/100.",
];

const RULES_N21_29 = [
  "10 preguntas (opción múltiple).",
  "Tiempo: 5 minutos.",
  "Aprueba: 70/100.",
];

const RULES_N30 = [
  "15–20 preguntas (mixto).",
  "Tiempo mayor (simulacro).",
  "Reporte final (puntaje + áreas a mejorar).",
  "Aprueba: 70/100.",
];

function rulesForLevel(n) {
  if (n <= 10) return RULES_N1_10;
  if (n <= 20) return RULES_N11_20;
  if (n <= 29) return RULES_N21_29;
  return RULES_N30;
}

// =====================
// Contenido de niveles (títulos + “se trata de”) según README
// =====================
const LEVEL_META = {
  1:  { title: "Nivel n1 · Comprensión literal", about: "Ubicar información textual exacta (qué, quién, cuándo, dónde)." },
  2:  { title: "Nivel n2 · Vocabulario en contexto (sinónimos)", about: "Elegir el sinónimo correcto según el contexto." },
  3:  { title: "Nivel n3 · Vocabulario en contexto (antónimos / oposición)", about: "Identificar la palabra/expresión opuesta según el contexto." },
  4:  { title: "Nivel n4 · Referencias (pronombres y sustituciones)", about: "Determinar a quién/qué se refiere “él/ella/esto/aquello/dicho”." },
  5:  { title: "Nivel n5 · Conectores y relaciones (básico)", about: "Interpretar conectores como “porque”, “aunque”, “sin embargo”, “por lo tanto”." },
  6:  { title: "Nivel n6 · Idea principal (oración temática)", about: "Identificar el tema o idea central de un párrafo." },
  7:  { title: "Nivel n7 · Ideas secundarias / soporte", about: "Reconocer ejemplos, datos y detalles que apoyan la idea principal." },
  8:  { title: "Nivel n8 · Secuencia / orden temporal", about: "Ordenar eventos o reconocer relaciones “antes/después/luego”." },
  9:  { title: "Nivel n9 · Causa y efecto (directo)", about: "Identificar causa explícita y consecuencia explícita." },
  10: { title: "Nivel n10 · Comparación y contraste", about: "Hallar semejanzas y diferencias entre enunciados o párrafos." },

  11: { title: "Nivel n11 · Propósito comunicativo", about: "Reconocer para qué se escribió (informar, persuadir, narrar, instruir)." },
  12: { title: "Nivel n12 · Tono y actitud del autor", about: "Identificar el tono (crítico, neutral, irónico, entusiasta, etc.)." },
  13: { title: "Nivel n13 · Punto de vista / narrador", about: "Distinguir voz narrativa (1ra/3ra persona; testigo; omnisciente, etc.)." },
  14: { title: "Nivel n14 · Inferencia simple (implícitos directos)", about: "Deducir algo no dicho literalmente pero evidente por pistas." },
  15: { title: "Nivel n15 · Inferencia con evidencia (citar la frase)", about: "Elegir conclusión y la evidencia textual que la sustenta." },
  16: { title: "Nivel n16 · Predicción / consecuencia probable", about: "Anticipar qué pasaría si continúa el texto (coherente con lo leído)." },
  17: { title: "Nivel n17 · Relaciones lógicas (condición, concesión, finalidad)", about: "Interpretar “si…, entonces…”, “aunque…”, “para…”, etc." },
  18: { title: "Nivel n18 · Coherencia local (oración intrusa)", about: "Detectar una oración que no encaja en un párrafo." },
  19: { title: "Nivel n19 · Coherencia global (estructura del texto)", about: "Reconocer introducción, desarrollo, conclusión y función de cada parte." },
  20: { title: "Nivel n20 · Título y resumen (precisión)", about: "Elegir mejor título/resumen sin agregar información." },

  21: { title: "Nivel n21 · Identificar tesis/afirmación (argumentación)", about: "Ubicar la idea defendida (tesis/posición)." },
  22: { title: "Nivel n22 · Razones y evidencias (argumentación)", about: "Distinguir razón vs ejemplo vs evidencia." },
  23: { title: "Nivel n23 · Supuestos / implicaciones", about: "Identificar qué debe ser cierto para que el argumento funcione." },
  24: { title: "Nivel n24 · Contraargumento y refutación", about: "Reconocer objeciones y cómo responderlas con base en el texto." },
  25: { title: "Nivel n25 · Falacias comunes (introducción)", about: "Reconocer errores típicos (generalización, falsa causa, ad hominem, etc.)." },
  26: { title: "Nivel n26 · Credibilidad de la fuente (lectura crítica)", about: "Evaluar confiabilidad: datos, sesgo, evidencia." },
  27: { title: "Nivel n27 · Recursos retóricos (metáfora, ironía, hipérbole)", about: "Identificar recursos y su efecto en el lector." },
  28: { title: "Nivel n28 · Lectura multimodal (texto + tabla/gráfico)", about: "Integrar información del texto con tabla o gráfico simple." },
  29: { title: "Nivel n29 · Síntesis entre dos textos (comparativa)", about: "Comparar dos textos: acuerdos, diferencias y propósito." },
  30: { title: "Nivel n30 · Simulacro (mixto)", about: "Mezcla habilidades n1–n29 (literal, inferencial, crítica, multimodal)." },
};

// =====================
// Activación de niveles
// =====================
// Activa aquí los niveles que ya tengan carpeta/archivos reales.
// Por ahora, para evitar links rotos, dejamos solo n1.

const ENABLED_LEVELS = new Set(["n1","n2","n3"]);
// =====================
// Construcción del array levels (n1 ... n30)
// =====================
const LEVEL_COUNT = 30;

const levels = Array.from({ length: LEVEL_COUNT }, (_, idx) => {
  const n = idx + 1;
  const id = `n${n}`;
  const meta = LEVEL_META[n];

  const enabled = ENABLED_LEVELS.has(id);

  return {
    id,
    title: meta?.title || `Nivel ${id}`,
    about: meta?.about || "Nivel en preparación.",
    rules: rulesForLevel(n),
    maxScore: 100,
    passScore: 70,
    enabled,
    action: enabled
      ? () => (window.location.href = `./niveles/${id}/${id}.html`)
      : () => alert(`${id} aún está en construcción.`),
  };
});

// =====================
// Helpers de puntaje/estado (localStorage)
// =====================
function getBestScore(levelId) {
  const key = `lx_lectura_${levelId}_best`;
  const raw = localStorage.getItem(key);
  const val = Number(raw);
  return Number.isFinite(val) ? val : 0;
}

function getStatusLabel(best, pass) {
  return best >= pass ? "Aprobado" : "No aprobado";
}

// =====================
// Render
// =====================
const grid = document.getElementById("levels-grid");

function renderLevels() {
  if (!grid) return;
  grid.innerHTML = "";

  levels.forEach((lvl) => {
    const best = getBestScore(lvl.id);
    const status = getStatusLabel(best, lvl.passScore);

    const card = document.createElement("article");
    card.className = "level-card";

    const statusClass = status === "Aprobado" ? "badge--ok" : "badge--no";

    card.innerHTML = `
      <div class="level-top">
        <div>
          <h3 class="level-name">${lvl.title}</h3>
          <div class="badges">
            <span class="badge ${statusClass}">${status}</span>
            <span class="badge badge--muted">Meta: ${lvl.passScore}/${lvl.maxScore}</span>
          </div>
        </div>
        <span class="badge">${lvl.id}</span>
      </div>

      <p class="level-about"><strong>Se trata de:</strong> ${lvl.about}</p>

      <div class="level-block">
        <p class="level-block-title">Reglas del nivel</p>
        <ul class="level-rules">
          ${lvl.rules.map(r => `<li>${r}</li>`).join("")}
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
        <button class="btn btn-dark" type="button" ${lvl.enabled ? "" : "disabled"} data-level="${lvl.id}">
          ${lvl.enabled ? "Entrar" : "Próximamente"}
        </button>
      </div>
    `;

    grid.appendChild(card);
  });

  // Click handlers
  grid.querySelectorAll("button[data-level]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-level");
      const lvl = levels.find((x) => x.id === id);
      if (!lvl) return;
      lvl.action();
    });
  });
}

renderLevels();
