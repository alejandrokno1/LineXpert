// index.js

// 1) Nombre del usuario (por ahora, solo localStorage opcional)
const storedName = localStorage.getItem("lx_nombre");
const heroNameSpan = document.getElementById("hero-name");
const sessionStatusSpan = document.querySelector(".session-status");

const displayName = storedName || "Invitado";
if (heroNameSpan) heroNameSpan.textContent = displayName;
if (sessionStatusSpan) sessionStatusSpan.textContent = storedName ? displayName : "anónima";

// =====================
// 2) Actualizaciones (desde updates.js)
// =====================
function formatDateES(iso) {
  // iso esperado: "YYYY-MM-DD"
  if (!iso) return "";
  const parts = iso.split("-");
  if (parts.length !== 3) return iso;

  const y = Number(parts[0]);
  const m = Number(parts[1]);
  const d = Number(parts[2]);

  const meses = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
  if (!y || !m || !d || m < 1 || m > 12) return iso;

  // Ej: "21 ago 2025"
  return `${String(d).padStart(2, "0")} ${meses[m - 1]} ${y}`;
}

function renderUpdatesFromWindow() {
  const updatesList = document.getElementById("updates-list");
  if (!updatesList) return;

  // Limpia primero
  updatesList.innerHTML = "";

  // Lee desde updates.js
  const updates = Array.isArray(window.LX_UPDATES) ? window.LX_UPDATES.slice() : [];

  // Si no cargó updates.js o está vacío
  if (updates.length === 0) {
    const li = document.createElement("li");
    li.className = "update-item";

    const bullet = document.createElement("div");
    bullet.className = "update-bullet";

    const textWrapper = document.createElement("div");
    textWrapper.className = "update-text";
    textWrapper.innerHTML = `<strong>Sin novedades</strong> — Aún no hay actualizaciones.`;

    li.appendChild(bullet);
    li.appendChild(textWrapper);
    updatesList.appendChild(li);
    return;
  }

  // Ordena por fecha descendente (más reciente arriba)
  updates.sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  // Renderiza (máximo 6)
  updates.slice(0, 6).forEach((u) => {
    const li = document.createElement("li");
    li.className = "update-item";

    const bullet = document.createElement("div");
    bullet.className = "update-bullet";

    const textWrapper = document.createElement("div");
    textWrapper.className = "update-text";

    const fecha = formatDateES(u.date);
    const desc = u.text || "";

    textWrapper.innerHTML = `<strong>${fecha}</strong> — ${desc}`;

    li.appendChild(bullet);
    li.appendChild(textWrapper);

    updatesList.appendChild(li);
  });
}

// Renderiza actualizaciones
renderUpdatesFromWindow();

// =====================
// 3) Botón de autenticación (placeholder)
// =====================
const authBtn = document.getElementById("btn-auth");
if (authBtn) {
  authBtn.addEventListener("click", () => {
    alert("Aquí irá la pantalla de inicio de sesión / registro más adelante 🙂");
  });
}
