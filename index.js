// index.js

// 1) Nombre del usuario (por ahora, solo localStorage opcional)
const storedName = localStorage.getItem("lx_nombre");
const heroNameSpan = document.getElementById("hero-name");
const sessionStatusSpan = document.querySelector(".session-status");

const displayName = storedName || "Invitado";
heroNameSpan.textContent = displayName;
sessionStatusSpan.textContent = storedName ? displayName : "anónima";

// 2) Lista de actualizaciones (puedes mover esto luego a un JSON)
const updates = [
  {
    fecha: "21 ago 2025",
    descripcion:
      "Portada con título 3D, cuadrícula 2×2 y barra lateral de novedades.",
  },
  {
    fecha: "15 ago 2025",
    descripcion: "Optimización de estilos y rendimiento.",
  },
  {
    fecha: "01 ago 2025",
    descripcion:
      "Lanzamiento beta de Matemáticas y Lectura.",
  },
];

// 3) Renderizar actualizaciones en la tarjeta derecha
const updatesList = document.getElementById("updates-list");

updates.forEach((u) => {
  const li = document.createElement("li");
  li.className = "update-item";

  const bullet = document.createElement("div");
  bullet.className = "update-bullet";

  const textWrapper = document.createElement("div");
  textWrapper.className = "update-text";
  textWrapper.innerHTML = `<strong>${u.fecha}</strong> — ${u.descripcion}`;

  li.appendChild(bullet);
  li.appendChild(textWrapper);

  updatesList.appendChild(li);
});

// 4) Botón de autenticación (placeholder)
const authBtn = document.getElementById("btn-auth");
authBtn.addEventListener("click", () => {
  alert("Aquí irá la pantalla de inicio de sesión / registro más adelante 🙂");
});
