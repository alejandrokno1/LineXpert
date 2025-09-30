/* =======================================================
   cabecera.js  (MÓDULO)
   - Estado compacto de cabecera con scroll
   - Marca enlace activo en la navegación
   - Mejora "saltar al contenido"
   - 🔐 Muestra saludo y estado de sesión (Auth)
   👉 El botón Entrar/Salir y el modal los gestiona modal-auth.js
   ======================================================= */

import { warm, onAuth, checkRedirectResult } from './servicios/auth.js';

// Utils DOM
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* ----------------- Navegación activa ----------------- */
function setActivoNav() {
  const enlaces = $$(".navegacion .enlace");
  if (!enlaces.length) return;

  const current = new URL(location.href);
  const segs = current.pathname.split("/").filter(Boolean);
  const top = (segs[0] || "").toLowerCase(); // ej: "lectura", "matematicas"

  enlaces.forEach(a => a.classList.remove("enlace--activo"));
  const match = enlaces.find(a => {
    const p = new URL(a.getAttribute("href") || "", location.href).pathname;
    return (p.split("/").filter(Boolean)[0] || "").toLowerCase() === top && top.length;
  });
  if (match) match.classList.add("enlace--activo");
}

/* ----------------- Cabecera compacta ----------------- */
function setCabeceraCompacta() {
  const cabecera = $(".cabecera");
  const hero = $(".hero-3d");
  if (!cabecera) return;

  if (hero && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) cabecera.classList.remove("compacta");
          else cabecera.classList.add("compacta");
        });
      },
      { root: null, rootMargin: "-48px 0px 0px 0px", threshold: 0 }
    );
    io.observe(hero);
  } else {
    const onScroll = () => {
      if (window.scrollY > 60) cabecera.classList.add("compacta");
      else cabecera.classList.remove("compacta");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
}

/* ----------------- Accesibilidad ----------------- */
function mejorarSkipLink() {
  const link = $(".saltar");
  const destino = $("#contenido");
  if (!link || !destino) return;
  link.addEventListener("click", () => {
    setTimeout(() => destino.focus({ preventScroll: true }), 0);
  });
}

function focusAlCargar() {
  if (location.hash) {
    const el = document.getElementById(location.hash.slice(1));
    if (el) el.focus({ preventScroll: true });
  }
}

/* ----------------- Vista de AUTH (solo UI, sin clicks) ----------------- */
/*  👉 No registramos listeners en #btn-auth aquí para evitar conflictos
    con modal-auth.js. Este módulo solo actualiza saludo y estado. */
async function initAuthView() {
  // Inicializa Firebase y procesa posible retorno de redirect (Google)
  await warm();
  await checkRedirectResult();

  const $session  = $("#lx-session");   // <span id="lx-session">iniciada|anónima</span>
  const $greeting = $("#lx-greeting");  // <span id="lx-greeting">Hola, …</span>

  const render = (user) => {
    const isLogged = !!user && !user.isAnonymous;
    const name = user?.displayName || "Invitado";

    if ($greeting) $greeting.textContent = `Hola, ${name} 👋`;
    if ($session)  $session.textContent  = isLogged ? "iniciada" : "anónima";

    // Compat con UI existente
    try {
      localStorage.setItem("lx_user_name", name);
      localStorage.setItem("lx_user_id", user?.uid || "");
    } catch {}
  };

  // Mantiene sesión anónima cuando no hay usuario
  onAuth(render, { ensureAnonymous: true });

  // Log útil para depuración (puedes comentar esta línea si no lo quieres ver)
  window.addEventListener("lx-auth-ready", () => {
    console.log("Auth listo. uid:", window?.LX?.uid ?? null);
  });
}

/* ----------------- Main ----------------- */
async function main() {
  setActivoNav();
  setCabeceraCompacta();
  mejorarSkipLink();
  focusAlCargar();
  await initAuthView(); // 🔐 solo actualiza UI; los clicks los maneja modal-auth.js
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main, { once: true });
} else {
  main();
}
