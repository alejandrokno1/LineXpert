# LineXpert · Procesos de Pensamiento

Plataforma web para practicar **Matemáticas** y **Lectura Crítica** con actividades guiadas tipo ICFES.

Actualmente es una página **estática** (HTML + CSS + JS) publicada con GitHub Pages.  
Más adelante se integrará autenticación y guardado de progreso (Firebase u otro backend ligero).

---

## 🌐 Demo

> 🔗 **Producción:** `https://alejandrokno1.github.io/LineXpert/`  
> (portada principal con tarjetas de Matemáticas, Lectura y módulos futuros)

---

## 🏗 Estructura actual del proyecto (v1)

En la raíz del repositorio:

- `index.html`  
  Página principal con:
  - barra superior (logo LineXpert + “Beta”, pestañas Lectura / Matemáticas, estado de sesión y botón *Entrar / Registrarse*),
  - sección “Bienvenido a Procesos de Pensamiento”,
  - cuadrícula 2×2 de módulos:
    - **Matemáticas** (activo),
    - **Lectura** (activo),
    - **Pensamiento Lógico** (próximamente),
    - **Conocimientos Policiales** (próximamente),
  - tarjeta lateral de **Actualizaciones**.

- `index.css`  
  Estilos de la portada:
  - layout con topbar redondeada y *glassmorphism*,
  - gradientes de fondo,
  - tarjetas con sombras y bordes redondeados,
  - diseño responsive (ajuste a una columna en pantallas pequeñas).

- `index.js`  
  Lógica básica:
  - lectura (opcional) del nombre de usuario desde `localStorage` para mostrar “Hola, Invitado 👋” o el nombre guardado,
  - carga de la lista de **Actualizaciones** desde un arreglo de JS,
  - placeholder para el botón *Entrar / Registrarse* (en el futuro abrirá la pantalla de autenticación).

> Nota técnica: en producción se recomienda versionar los assets estáticos para evitar problemas de caché:
> `index.css?v=1`, `index.js?v=1`.

---

## 🧠 Visión general del proyecto

La idea de LineXpert es ofrecer prácticas cortas, cronometradas y con retroalimentación para:

- **Matemáticas:** razonamiento cuantitativo tipo Saber 11 / Saber Pro.
- **Lectura:** comprensión lectora, análisis de textos, reflexión y evaluación crítica.

Cada área se organizará en **niveles** con:
- objetivo claro,
- duración (por ejemplo, 60 segundos),
- métricas como **aciertos**, **APM (aciertos por minuto)** y **precisión**,
- alineación con las **competencias y evidencias oficiales** de los lineamientos ICFES.

---

## 📚 Diseño de niveles de Lectura (versión 1)

La subprueba de Lectura se estructura a partir de las tres afirmaciones del ICFES:

1. **Identifica y entiende los contenidos locales que conforman un texto.**  
2. **Comprende cómo se articulan las partes de un texto para darle un sentido global.**  
3. **Reflexiona a partir de un texto y evalúa su contenido.**

Además, se consideran los tipos de texto usados en Lectura Crítica:

- **Continuos:** novela, cuento, poesía, canción, dramaturgia; ensayo, columna de opinión, crónica, etc.
- **Discontinuos:** caricatura, cómic, etiqueta, infografía, tabla, diagrama, aviso publicitario, manual, reglamento, etc.

Sobre esta base se diseñó un plan de **30 niveles** distribuidos en tres bloques:

---

### 🔹 Bloque A (Niveles 1–10)  
**Afirmación 1 – Contenidos locales**  
Enfocado en identificar significados, referencias y eventos explícitos.

Ejemplos de niveles:

1. **Palabras clave en oraciones**  
   - Evidencia 1.1: significado de elementos locales.  

2. **Sinónimos y expresiones equivalentes**  
   - Parafraseo de palabras/expresiones dentro de oraciones simples.  

3. **Referentes (“él”, “ella”, “eso”)**  
   - Localizar a qué se refieren pronombres y expresiones deícticas.  

4. **Información explícita: qué, quién, dónde, cuándo**  
   - Preguntas literales sobre datos concretos del texto.  

5. **Eventos y personajes en textos narrativos (continuos literarios)**  
   - Identificación de sucesos y personajes en cuentos breves.  

6. **Eventos en textos informativos**  
   - Noticias, crónicas cortas, relatos de experiencias.  

7. **Orden temporal de los sucesos**  
   - Organizar eventos (antes/después) según lo narrado.  

8. **¿Qué pasa en la caricatura o el cómic?** (discontinuos literarios)  
   - Reconocer qué ocurre y quiénes participan combinando imagen + texto.  

9. **Localizar detalles específicos**  
   - Búsqueda de datos puntuales en textos breves (continuos o discontinuos).  

10. **Integrador local**  
    - Mezcla de cuento breve, noticia, caricatura, aviso, aplicando 1.1–1.2.

---

### 🔹 Bloque B (Niveles 11–20)  
**Afirmación 2 – Sentido global y articulación de partes**  

Incluye evidencias 2.1–2.5: estructura, voces, relaciones entre partes, ideas principales y manejo de textos discontinuos.

Ejemplos de niveles:

11. **Partes de un texto continuo**  
    - Título, subtítulos, párrafos; función de cada parte (2.1).

12. **Estructura narrativa: inicio, nudo, desenlace**  
    - En cuentos breves (2.1).

13. **Título, imágenes y paratextos**  
    - Relación entre elementos paratextuales y el contenido central (2.1, 2.5).

14. **Voces en textos literarios**  
    - Diferenciar narrador, personajes, diálogos (2.2).

15. **Voces y fuentes en textos informativos**  
    - Reconocer quién habla: autor, entrevistado, experto, testigo (2.2).

16. **Conectores y relaciones lógicas I**  
    - Causa, consecuencia, contraste, adición (2.3).

17. **Coherencia entre párrafos**  
    - Orden lógico de ideas, ejemplos que corresponden a explicaciones (2.3, 2.4).

18. **Ideas principales vs. secundarias**  
    - Textos expositivos breves (2.4).

19. **Tablas, gráficos e infografías** (textos discontinuos informativos)  
    - Interpretar relaciones entre columnas, filas, ejes, íconos, etc. (2.5).

20. **Integrador de sentido global**  
    - Textos mixtos (párrafo + tabla/gráfico) con uso de 2.1–2.5.

---

### 🔹 Bloque C (Niveles 21–30)  
**Afirmación 3 – Reflexión y evaluación crítica**  

Trabaja evidencias 3.1–3.5: validez de argumentos, supuestos, relaciones con otros textos, contenido valorativo, estrategias discursivas y contextualización.

Ejemplos de niveles:

21. **Tesis y argumentos**  
    - Identificar idea defendida y razones que la sustentan (3.1).

22. **Hechos, opiniones y ejemplos**  
    - Distinguir enunciados descriptivos, valorativos y ejemplificadores (3.1, 3.3).

23. **Supuestos e implicaciones**  
    - Reconocer lo que se da por sentado y lo que se deriva del texto (3.1).

24. **Texto y experiencia del lector**  
    - Relacionar contenidos con conocimientos previos y contexto (3.2, 3.5).

25. **Comparar dos textos sobre el mismo tema**  
    - Identificar acuerdos, desacuerdos y matices (3.2).

26. **Lenguaje valorativo y tono**  
    - Detectar juicios, ironía, sarcasmo, entusiasmo, etc. (3.3).

27. **Estrategias discursivas y persuasivas**  
    - Exageración, preguntas retóricas, analogías, etc. (3.4).

28. **Recursos persuasivos en textos discontinuos**  
    - Avisos publicitarios, afiches, campañas (3.3, 3.4).

29. **Contexto de producción y circulación**  
    - Quién escribe, para quién, en qué medio/momento, y cómo eso afecta la lectura (3.5).

30. **Integrador crítico**  
    - Textos mixtos con componente argumentativo, aplicando 3.1–3.5.

---

## 🛣 Roadmap (qué se tiene y qué sigue)

### ✅ Hecho

- Limpieza completa del repositorio anterior.
- Nueva portada principal (`index.html`, `index.css`, `index.js`).
- Diseño pedagógico preliminar de **30 niveles de Lectura** alineados con las afirmaciones y evidencias ICFES.

### 🔜 Próximos pasos

1. **Crear la página de Lectura (`lectura.html`)**  
   - Reutilizar la estética de la portada.  
   - Mostrar un grid con los 30 niveles (nombre, afirmación, tipo de texto).  
   - Preparar estructura para métricas: tiempo, aciertos, APM, precisión.

2. **Definir estructura de datos para los niveles**  
   - Archivo JS/JSON del tipo:
     ```js
     const nivelesLectura = [
       {
         id: 1,
         bloque: "A",
         nombre: "Palabras clave en oraciones",
         afirmacion: 1,
         evidencias: ["1.1"],
         duracion_s: 60,
         objetivo: "Identificar el significado de palabras clave en una oración sencilla usando el contexto.",
       },
       // ...
     ];
     ```

3. **Implementar lógica de práctica para Lectura**  
   - Cargar textos y preguntas tipo ICFES por nivel.  
   - Temporizador + cálculo de aciertos, APM y precisión.  
   - Retroalimentación básica al finalizar la sesión.

4. **Diseñar sección de Matemáticas**  
   - Estructura similar de niveles y métricas, pero para razonamiento cuantitativo.

5. **Integración de autenticación y guardado de progreso**  
   - Probablemente con Firebase (Auth + Firestore):  
     - registro/inicio de sesión,  
     - almacenamiento de puntajes por nivel,  
     - panel de progreso del usuario.

---

## 🧪 Cómo ejecutar el proyecto localmente

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/alejandrokno1/LineXpert.git
   cd LineXpert
