# LineXpert · Procesos de Pensamiento (Beta)

LineXpert es una plataforma web estática (HTML/CSS/JS) para practicar **Procesos de Pensamiento** con módulos por área (Lectura / Matemáticas / Razonamiento) y niveles (n1, n2, …).
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

✅ Módulo Razonamiento (`/Razonamiento/`)
- Página principal: `/Razonamiento/razonamiento.html`
- Render de niveles por bloques: **Abstracto (r1–r30)** e **ICFES (r31–r60)**.
- Filtros: Todos / Abstracto / ICFES.
- Convención de progreso: `lx_logic_rX_best` (mejor puntaje por nivel).

---

## Arquitectura de carpetas

> Importante: GitHub Pages es **case-sensitive** (respeta mayúsculas/minúsculas).  
> Ej: `Lectura/` NO es lo mismo que `lectura/`.

### Estructura futura completa (niveles por módulo)

Regla: cada nivel vive en `/niveles/<id>/` y tiene 4 archivos:
- `<id>.html`, `<id>.css`, `<id>.js`, `<id>banco.js`

## Arquitectura de carpetas

> Importante: GitHub Pages es **case-sensitive** (respeta mayúsculas/minúsculas).  
> Ej: `Lectura/` NO es lo mismo que `lectura/`.

### Estructura futura completa (niveles por módulo)

Regla: cada nivel vive en `/niveles/<id>/` y tiene 4 archivos:
- `<id>.html`, `<id>.css`, `<id>.js`, `<id>banco.js`

```txt
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

  Razonamiento/
    razonamiento.html
    razonamiento.css
    razonamiento.js
    niveles/
      r1/ ... r60/

  Matematicas/
    matematicas.html
    matematicas.css
    matematicas.js
    niveles/
      n1/ ... n30/ ```

``````

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

## Plan pedagógico: 60 niveles de Razonamiento (Abstracto + ICFES)

> Objetivo general: fortalecer pensamiento lógico desde **patrones y deducción abstracta** → **interpretación y toma de decisiones tipo ICFES**.
> Cada nivel tendrá su carpeta: `Razonamiento/niveles/rX/` con `rX.html`, `rX.css`, `rX.js`, `rXbanco.js`.

### Reglas sugeridas (base)
- r1–r20: 5 preguntas · 60s · +20 correcta · 0 incorrecta · aprueba 70/100
- r21–r40: 6–8 preguntas · 90–120s · aprueba 70/100
- r41–r60: 8–12 preguntas (mini-simulacros) · 2–8 min · aprueba 70/100

> Nota: se puede ajustar por nivel manteniendo el render y la estructura.

---

### Bloque A · Razonamiento Abstracto (r1–r30)

**r1 · Series numéricas**
- Completar secuencias identificando patrón (sumas, restas, multiplicación, alternancias).

**r2 · Series alfanuméricas**
- Patrones con letras y números (saltos, ciclos, posiciones).

**r3 · Analogías**
- A es a B como C es a __ (función, parte-todo, causa-efecto, etc.).

**r4 · Clasificación (intruso)**
- Elegir el elemento que NO pertenece según una regla.

**r5 · Ordenamientos**
- Orden correcto con pistas (mayor/menor, antes/después).

**r6 · Relaciones y comparaciones**
- Deducción con relaciones (A > B, B = C, etc.).

**r7 · Lógica de proposiciones**
- Verdadero/falso según conectores (y, o, si… entonces).

**r8 · Silogismos**
- Conclusiones válidas a partir de premisas (todos/algunos/ninguno).

**r9 · Conjuntos (Venn)**
- Unión/intersección/complemento con situaciones sencillas.

**r10 · Secuencias de figuras**
- Patrones visuales (repetición, crecimiento, alternancia).

**r11 · Rotaciones y simetrías**
- Giros, reflejos y simetría axial/central.

**r12 · Figuras en cuadrícula**
- Traslaciones, conteo y patrones en mallas.

**r13 · Matrices 2×2 (figuras)**
- Completar casilla faltante por regla de filas/columnas.

**r14 · Matrices 3×3 (intro)**
- Reglas simples para completar matrices visuales.

**r15 · Plegado de papel (intro)**
- Predicción tras doblar/desdoblar.

**r16 · Cubos y caras (desarrollos)**
- Redes de cubo y correspondencia de caras.

**r17 · Conteo lógico**
- Conteo de casos posibles sin fórmulas pesadas.

**r18 · Probabilidad básica**
- Probabilidad en eventos simples equiprobables.

**r19 · Patrones con reglas**
- Hallar la regla exacta que genera una serie/figura.

**r20 · Deducción con pistas**
- Rompecabezas tipo “quién vive dónde” (tabla de pistas).

**r21 · Direcciones y recorridos**
- Norte/sur/este/oeste, giros y ubicación final.

**r22 · Parentescos**
- Deducción con relaciones familiares (tío, primo, suegro).

**r23 · Cronología**
- Ordenar eventos por tiempos con información parcial.

**r24 · Tablas y reglas**
- Completar tablas siguiendo reglas.

**r25 · Inferencia corta**
- Elegir conclusión que sí se deduce (sin suposiciones).

**r26 · Supuestos (intro)**
- Qué debe ser cierto para que el argumento funcione.

**r27 · Errores comunes**
- Detectar generalización, falsa causa, etc.

**r28 · Patrones mixtos**
- Series que mezclan dos reglas o dos subsecuencias.

**r29 · Velocidad y precisión**
- Entrenamiento de respuesta rápida sin perder exactitud.

**r30 · Mini-reto Abstracto**
- Repaso del bloque con mezcla de habilidades.

---

### Bloque B · Estilo ICFES (r31–r60)

**r31 · Patrones en contexto**
- Patrones aplicados a situaciones (turnos, tiempos, cantidades).

**r32 · Tablas (lectura)**
- Lectura e interpretación de tablas (sin cálculos largos).

**r33 · Gráficos (lectura)**
- Interpretar barras/líneas: máximos, mínimos, tendencias.

**r34 · Proporcionalidad**
- Razones y proporciones (regla de tres mental).

**r35 · Porcentajes**
- Aumentos, descuentos y comparaciones.

**r36 · Promedio y mediana**
- Medidas de tendencia central en contexto.

**r37 · Dispersión (básico)**
- Rango y variación general de datos.

**r38 · Probabilidad en contexto**
- Eventos simples con rifas/encuestas.

**r39 · Combinaciones simples**
- Conteo de opciones (rutas, menús, selecciones).

**r40 · Lógica de enunciados**
- Condicionales y negaciones en lenguaje natural.

**r41 · Argumentos (conclusión)**
- Identificar conclusión y premisas.

**r42 · Supuestos**
- Idea que el argumento da por sentada.

**r43 · Fortalecer/debilitar**
- Opciones que fortalecen o debilitan una conclusión.

**r44 · Causa vs correlación**
- Diferenciar causalidad y correlación.

**r45 · Extrapolación cuidadosa**
- Conclusiones válidas sin ir más allá de los datos.

**r46 · Interpretación de reglas**
- Aplicar una norma/condición a casos.

**r47 · Comparación de escenarios**
- Analiza efectos de una modificación (¿qué cambia si…?).

**r48 · Lectura multi-paso**
- 2 pasos: dato → cálculo corto → decisión.

**r49 · Unidades y magnitudes**
- Conversiones simples e interpretación.

**r50 · Geometría en contexto**
- Perímetro/área básicos aplicados.

**r51 · Funciones (idea)**
- Relación variable→variable desde tabla/gráfica.

**r52 · Tendencia y predicción**
- Leer tendencia y estimar valores razonables.

**r53 · Consistencia**
- Detectar contradicciones entre datos/enunciados.

**r54 · Selección de estrategia**
- Elegir el método más eficiente (sin resolver todo).

**r55 · Trampas típicas**
- Identificar distractores frecuentes.

**r56 · Condiciones y casos**
- Razonamiento con “si A entonces B” y casos.

**r57 · Diagramas y rutas**
- Mapas/diagramas para decidir.

**r58 · Síntesis de información**
- Combina 2 fuentes (tabla+texto / gráfico+texto).

**r59 · Mini-simulacro ICFES**
- Mezcla de ítems tipo examen.

**r60 · Simulacro global**
- Repaso general (Abstracto + ICFES).

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

Convención recomendada para Razonamiento:
- `lx_logic_rX_best`, `lx_logic_rX_last`, `lx_logic_rX_attempts`, `lx_logic_rX_lastDate`, `lx_logic_rX_lastCorrect`

Convención recomendada para Matemáticas:
- `lx_mate_nX_best`, `lx_mate_nX_last`, `lx_mate_nX_attempts`, `lx_mate_nX_lastDate`, `lx_mate_nX_lastCorrect`

---

## Cómo ejecutar localmente

Opción A: VS Code + Live Server  
Opción B:
```bash
python -m http.server 5500  ```

