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
// Datos de niveles (por ahora solo n1; luego agregamos n2, n3...)
// =====================
const levels = [
  {
    id: "n1",
    title: "Nivel n1 · Comprensión literal",
    about: "Identificar información explícita y palabras clave en oraciones cortas.",
    rules: [
      "5 preguntas (opción múltiple).",
      "Tiempo: 60 segundos.",
      "Cada pregunta vale 20 puntos.",
      "Sin penalización por error.",
    ],
    maxScore: 100,
    passScore: 70,
    enabled: true,
    // Más adelante podemos hacer que esto abra tu práctica real
    action: () => window.location.href = "./niveles/n1/n1.html"
  },

  // Ejemplo listo para cuando actives n2 (por ahora deshabilitado)
  {
    id: "n2",
    title: "Nivel n2 · Sinónimos y equivalencias",
    about: "Reconocer expresiones equivalentes y sinónimos en contexto.",
    rules: [
      "5 preguntas (opción múltiple).",
      "Tiempo: 60 segundos.",
      "Cada pregunta vale 20 puntos.",
    ],
    maxScore: 100,
    passScore: 70,
    enabled: false,
    action: () => alert("n2 aún está en construcción.")
  },
];

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
