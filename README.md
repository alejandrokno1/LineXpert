# LineXpert · Procesos de Pensamiento (Beta)

LineXpert es una plataforma web estática (HTML/CSS/JS) para practicar **Procesos de Pensamiento** con módulos por área (Lectura / Matemáticas) y niveles (n1, n2, …, n30).
El objetivo es crecer por niveles, guardando progreso y mostrando estado (Aprobado / No aprobado).

---

## Demo y repositorio

Demo (GitHub Pages):
https://alejandrokno1.github.io/LineXpert/

Repositorio:
https://github.com/alejandrokno1/LineXpert

---

## Estado actual (lo que ya funciona)

✅ Home (`index.html`)
- Tabs superiores (Lectura / Matemáticas).
- Cards de módulos (Lectura y Matemáticas).
- Card “Actualizaciones” se carga desde `updates.js` (sin hardcode).
- Saludo/estado de sesión desde `localStorage` (clave opcional: `lx_nombre`).

✅ Módulo Lectura (`/Lectura/`)
- Página principal: `/Lectura/lectura.html`
- Render de niveles en “cards”: se trata de, reglas, puntuación, estado.

✅ Nivel n1 (Lectura) - Quiz real
- Ruta: `/Lectura/niveles/n1/n1.html`
- Reglas: **5 preguntas**, **60 segundos**, **+20 por correcta**, **0 por incorrecta**, aprueba desde **70/100**.
- Banco: `n1banco.js` (usa `window.LX_N1_BANK`).
- Guarda mejor puntaje e info de intentos en `localStorage`.

---

## Arquitectura de carpetas

> Importante: GitHub Pages es **case-sensitive** (respeta mayúsculas/minúsculas).  
> Ej: `Lectura/` NO es lo mismo que `lectura/`.

### Estructura futura completa (30 niveles por módulo)

Regla: cada nivel nX vive en `/niveles/nX/` y tiene 4 archivos:
- `nX.html`, `nX.css`, `nX.js`, `nXbanco.js`

```
LineXpert/
  index.html
  index.css
  index.js
  updates.js

  Lectura/
    lectura.html
    lectura.css
    lectura.js
    niveles/
      n1/ ... n30/

  Matematicas/
    matematicas.html
    matematicas.css
    matematicas.js
    niveles/
      n1/ ... n30/
```

---

## Plan pedagógico: 30 niveles de Lectura (qué trae cada nivel)

> Objetivo general: avanzar de **comprensión literal → inferencial → crítica → síntesis**, con formatos tipo ICFES.
> Cada nivel tendrá su carpeta: `Lectura/niveles/nX/` con `nX.html`, `nX.css`, `nX.js`, `nXbanco.js`.

### Reglas sugeridas (base)
- Niveles n1–n10: 5 preguntas · 60s · +20 correcta · 0 incorrecta · aprueba 70/100
- Niveles n11–n20: 6–8 preguntas · 90–120s · puntaje proporcional · aprueba 70/100
- Niveles n21–n30: 8–12 preguntas (o simulacros) · 2–12 min · aprueba 70/100

> Nota: estas reglas se pueden ajustar por nivel sin romper la estructura.

---

### n1 · Comprensión literal (detalle explícito)
- En qué consiste: ubicar información textual exacta (qué, quién, cuándo, dónde).
- Ítems: 5 preguntas de “dato literal”.

### n2 · Vocabulario en contexto (sinónimos)
- En qué consiste: elegir el sinónimo correcto según el contexto.
- Ítems: palabras resaltadas + opción equivalente.

### n3 · Vocabulario en contexto (antónimos / oposición)
- En qué consiste: identificar la palabra/expresión opuesta según el contexto.
- Ítems: antónimos y contrastes.

### n4 · Referencias (pronombres y sustituciones)
- En qué consiste: a quién/qué se refiere “él”, “ella”, “esto”, “aquello”, “dicho”.
- Ítems: preguntas de antecedente.

### n5 · Conectores y relaciones (básico)
- En qué consiste: interpretar “porque, aunque, sin embargo, por lo tanto”.
- Ítems: escoger el conector correcto o la relación que expresa.

### n6 · Idea principal (oración temática)
- En qué consiste: identificar el tema o idea central de un párrafo.
- Ítems: “¿de qué trata principalmente…?”

### n7 · Ideas secundarias / soporte
- En qué consiste: reconocer ejemplos, datos y detalles que apoyan la idea principal.
- Ítems: “¿qué enunciado apoya mejor…?”

### n8 · Secuencia / orden temporal
- En qué consiste: ordenar eventos o reconocer “antes/después/luego”.
- Ítems: cronología.

### n9 · Causa y efecto (directo)
- En qué consiste: identificar causa explícita y consecuencia explícita.
- Ítems: “¿qué provocó…?” “¿qué ocurrió como resultado?”

### n10 · Comparación y contraste
- En qué consiste: hallar semejanzas/diferencias entre dos enunciados o párrafos.
- Ítems: “se parecen en…” “difieren en…”

---

### n11 · Propósito comunicativo
- En qué consiste: para qué se escribió (informar, persuadir, narrar, instruir).
- Ítems: intención del texto.

### n12 · Tono y actitud del autor
- En qué consiste: reconocer tono (crítico, neutral, irónico, entusiasta, etc.).
- Ítems: selección de tono + evidencia breve.

### n13 · Punto de vista / narrador
- En qué consiste: primera/tercera persona, narrador testigo, omnisciente, etc.
- Ítems: identificar voz narrativa.

### n14 · Inferencia simple (implícitos directos)
- En qué consiste: deducir algo no dicho literalmente, pero evidente por pistas.
- Ítems: “se puede concluir que…”

### n15 · Inferencia con evidencia (citar la frase)
- En qué consiste: escoger la conclusión y la evidencia textual que la sustenta.
- Ítems: conclusión + “¿qué frase lo apoya?”

### n16 · Predicción / consecuencia probable
- En qué consiste: anticipar qué pasaría si continúa el texto (con lógica del texto).
- Ítems: escenarios consistentes.

### n17 · Relaciones lógicas (condición, concesión, finalidad)
- En qué consiste: interpretar estructuras “si…, entonces…”, “aunque…”, “para…”.
- Ítems: identificar tipo de relación.

### n18 · Coherencia local (oración intrusa)
- En qué consiste: detectar una oración que “no encaja” en un párrafo.
- Ítems: cohesión/coherencia inmediata.

### n19 · Coherencia global (estructura del texto)
- En qué consiste: reconocer introducción, desarrollo, conclusión, y el rol de cada parte.
- Ítems: “¿qué función cumple este párrafo?”

### n20 · Título y resumen (precisión)
- En qué consiste: elegir el mejor título y/o el mejor resumen sin agregar información.
- Ítems: selección de título/resumen.

---

### n21 · Identificar tesis/afirmación (argumentación)
- En qué consiste: ubicar la idea defendida (tesis/posición).
- Ítems: “¿cuál es la tesis?”

### n22 · Razones y evidencias (argumentación)
- En qué consiste: distinguir razón vs ejemplo vs evidencia.
- Ítems: soporte argumentativo.

### n23 · Supuestos / implicaciones
- En qué consiste: qué debe ser cierto para que el argumento funcione.
- Ítems: supuestos.

### n24 · Contraargumento y refutación
- En qué consiste: identificar objeciones y cómo responderlas con base en el texto.
- Ítems: “¿qué refuta mejor…?”

### n25 · Falacias comunes (introducción)
- En qué consiste: reconocer errores típicos (generalización, falsa causa, ad hominem, etc.).
- Ítems: escoger la descripción del error.

### n26 · Credibilidad de la fuente (lectura crítica)
- En qué consiste: evaluar si la fuente es confiable y por qué (datos, sesgo, evidencia).
- Ítems: criterios básicos de confiabilidad.

### n27 · Recursos retóricos (metáfora, ironía, hipérbole)
- En qué consiste: identificar recursos y su efecto en el lector.
- Ítems: “¿qué recurso usa…?” “¿qué efecto produce?”

### n28 · Lectura multimodal (texto + tabla/gráfico)
- En qué consiste: integrar información textual con una tabla o gráfico simple.
- Ítems: preguntas combinadas.

### n29 · Síntesis entre dos textos (comparativa)
- En qué consiste: comparar dos textos sobre el mismo tema: acuerdos, diferencias, propósito.
- Ítems: síntesis de dos fuentes.

### n30 · Simulacro (mixto)
- En qué consiste: mezcla de habilidades n1–n29 (literal, inferencial, crítica, multimodal).
- Ítems: 15–20 preguntas · tiempo mayor · reporte final (puntaje + áreas a mejorar).

---

## Sección “Actualizaciones” (Home)

Archivo: `updates.js`
- Contiene: `window.LX_UPDATES = [...]`
- `index.js` lee `window.LX_UPDATES` y renderiza el `<ul id="updates-list">`.

Nota caché: si no se ve en producción, aumenta el `?v=` en `index.html`.

---

## Progreso / puntajes (localStorage)

Usuario:
- `lx_nombre` (opcional)

Convención recomendada para Lectura:
- `lx_lectura_nX_best`, `lx_lectura_nX_last`, `lx_lectura_nX_attempts`, `lx_lectura_nX_lastDate`, `lx_lectura_nX_lastCorrect`

Convención recomendada para Matemáticas:
- `lx_mate_nX_best`, `lx_mate_nX_last`, `lx_mate_nX_attempts`, `lx_mate_nX_lastDate`, `lx_mate_nX_lastCorrect`

---

## Cómo ejecutar localmente

Opción A: VS Code + Live Server  
Opción B:
```bash
python -m http.server 5500
```
Abrir: http://localhost:5500/

---

## Cómo publicar cambios (Git)

```bash
git status
git add .
git commit -m "Mensaje claro del cambio"
git push origin main
```

Si hay conflicto:
```bash
git pull --rebase origin main
git push origin main
```
