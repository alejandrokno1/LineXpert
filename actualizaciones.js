/* =======================================================
   actualizaciones.js
   - Rellena el panel de "Actualizaciones" desde JSON o
     desde un fallback embebido (sin dependencias).
   - Ordena por fecha (desc) y respeta data-limite si existe.
   - Seguro contra XSS (usa textContent).
   ======================================================= */

const FALLBACK_ACTUALIZACIONES = [
  {
    fecha: "2025-08-21",
    contenido: "Portada con título 3D, cuadrícula 2×2 y barra lateral de novedades."
  },
  {
    fecha: "2025-08-15",
    contenido: "Optimización de estilos y rendimiento."
  },
  {
    fecha: "2025-08-01",
    contenido: "Lanzamiento beta de Matemáticas y Lectura."
  }
];

// Utilidades
const $ = (sel, ctx = document) => ctx.querySelector(sel);

function formatearFechaISO(iso) {
  // Normaliza y muestra "21 ago 2025"
  const d = new Date(`${iso}T00:00:00`);
  const fmt = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
  return fmt.format(d).replace(".", "");
}

function normalizarItems(items) {
  // Permite llaves alternativas: date/time/datetime, content/texto/contenido
  return (items || [])
    .map(it => ({
      fecha: it.fecha || it.date || it.time || it.datetime,
      contenido: it.contenido || it.texto || it.content || ""
    }))
    .filter(it => it.fecha && it.contenido);
}

async function cargarJSON(origen) {
  try {
    const res = await fetch(origen, { cache: "no-store" });
    if (!res.ok) throw new Error("No OK");
    const data = await res.json();
    return normalizarItems(data);
  } catch {
    return [...FALLBACK_ACTUALIZACIONES];
  }
}

function renderLista(lista, items, limite = 6) {
  const frag = document.createDocumentFragment();
  items
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .slice(0, limite)
    .forEach(({ fecha, contenido }) => {
      const li = document.createElement("li");
      li.className = "actualizacion";
      const time = document.createElement("time");
      time.setAttribute("datetime", fecha);
      time.textContent = formatearFechaISO(fecha);
      const dash = document.createTextNode(" — ");
      const texto = document.createElement("span");
      texto.textContent = contenido;
      li.append(time, dash, texto);
      frag.appendChild(li);
    });
  lista.innerHTML = "";
  lista.appendChild(frag);
}

async function initActualizaciones() {
  const lista = $("#lista-actualizaciones");
  if (!lista) return;

  const origen = lista.dataset.origen || "actualizaciones.json";
  const limite =
    parseInt(lista.dataset.limite || lista.getAttribute("data-limite") || "6", 10) || 6;

  const items = await cargarJSON(origen);
  renderLista(lista, items, limite);

  // Expone una API mínima por si quieres añadir desde consola o desde otras páginas
  window.actualizacionesAdd = function addActualizacion({ fecha, contenido }) {
    if (!fecha || !contenido) return;
    FALLBACK_ACTUALIZACIONES.push({ fecha, contenido });
    renderLista(lista, FALLBACK_ACTUALIZACIONES, limite);
  };
}

initActualizaciones();
