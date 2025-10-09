# LineXpert · Matemáticas

Plataforma web con **niveles de práctica cronometrada** y **feedback inmediato** para fortalecer el Razonamiento Cuantitativo según el marco ICFES:
- **Competencias:** Interpretación y representación (IR), Formulación y ejecución (FE), Argumentación (ARG)
- **Ejes de contenido:** Estadística, Geometría, Álgebra & Cálculo

---

## ⚙️ Estructura del proyecto



> Sugerencia: cada nivel de `matematicas/` expone su **config** (metadatos) + **banco de ítems**.  
> `actualizaciones.json` registra cambios (fecha, autor, nivel, nota).

---

## 🧭 Guía pedagógica (ICFES)

**Evidencias por competencia**
- **IR:** 1.1 (lee/extrae información), 1.2 (transforma representaciones)
- **FE:** 2.1 (diseña plan), 2.2 (ejecuta procedimiento), 2.3 (resuelve)
- **ARG:** 3.1 (sustenta/refuta), 3.2 (argumenta a favor/en contra), 3.3 (valida pertinencia)

**Métricas en UI**
- **APM** = aciertos por minuto
- **Precisión** = aciertos / respuestas
- **Aprobación sugerida:** IR (≥2–3 aciertos), FE (≥3), ARG (≥3–4) en 1:00

---

## 🎯 Plan de 30 niveles (resumen)

| # | Nivel | Comp. | Eje | Evid. | Objetivo breve |
|---|---|:--:|---|---|---|
| 1 | **Sumas** | IR | Álgebra & Cálculo | 1.1–1.2 | Sumas mentales rápidas. |
| 2 | **Sumas y Restas** | IR | Álgebra & Cálculo | 1.1–1.2 | Agilidad con signo. |
| 3 | **Multiplicación** | IR | Álgebra & Cálculo | 1.1–1.2 | Productos básicos (decimales incluidos). |
| 4 | **División** | IR | Álgebra & Cálculo | 1.1–1.2 | Divisiones exactas (enteros/decimales). |
| 5 | **Potenciación** | IR | Álgebra & Cálculo | 1.1–1.2 | Potencias pequeñas, suma/producto sencillos. |
| 6 | **Notación científica** | IR | Álgebra & Cálculo | 1.1–1.2 | Convertir decimal ↔ científica. |
| 7 | **Fracciones: simplificar** | IR | Álgebra & Cálculo | 1.1–1.2 | Reducir a/b a forma irreducible. |
| 8 | **Decimal ↔ Fracción** | IR | Álgebra & Cálculo | 1.2 | Convertir finitos ↔ fracción irreducible. |
| 9 | **Elegir la operación correcta** | IR | Álgebra & Cálculo | 1.2 | Decidir +, −, ×, ÷ según contexto. |
| 10 | **Estimación y redondeo** | IR | Álgebra & Cálculo | 1.1–1.2 | Aprox. razonables e intervalos. |
| 11 | **Porcentajes en contexto I** | IR | Álgebra & Cálculo | 1.2 | Rebajas, propinas, impuestos. |
| 12 | **Tablas y gráficos I** | IR | Estadística | 1.1 | Leer barras/líneas/tablas simples. |
| 13 | **Conjuntos básico (∪, ∩, ⊂)** | IR | Estadística | 1.1 | Pertenencia, unión, intersección. |
| 14 | **Plano cartesiano** | IR | Geometría | 1.1 | Ubicar y leer puntos/cuadrantes. |
| 15 | **Tendencias y comparaciones** | IR | Estadística | 1.1–1.2 | Detectar tendencias/cambios. |
| 16 | **Proporciones y razón de cambio** | FE | Álgebra & Cálculo | 2.1–2.3 | Regla de tres; tasas por unidad. |
| 17 | **Conversiones de unidades** | FE | Álgebra & Cálculo | 2.1–2.2 | Longitud, tiempo, moneda (factor). |
| 18 | **Ecuación lineal en contexto** | FE | Álgebra & Cálculo | 2.1–2.3 | Modelo costo = c·x + b. |
| 19 | **Perímetro y área compuestas** | FE | Geometría | 2.1–2.3 | Descomponer/combinar figuras. |
| 20 | **Probabilidad básica** | FE | Estadística | 2.2–2.3 | Evento simple/complemento. |
| 21 | **Tendencia y dispersión + muestra/población** | FE | Estadística | 2.1–2.3 | Media/mediana/moda/rango + nociones de muestreo. |
| 22 | **Recta: pendiente e intercepto** | FE | Álgebra & Cálculo | 2.1–2.3 | m, b, predicciones y significado. |
| 23 | **Sistemas 2×2 en contexto** | FE | Álgebra & Cálculo | 2.1–2.3 | Sustitución/suma (mezclas, precios). |
| 24 | **Propiedades de las operaciones** | ARG | Álgebra & Cálculo | 3.2 | Justificar conmutativa/asociativa/distributiva. |
| 25 | **¿Es proporcional?** | ARG | Álgebra & Cálculo | 3.1–3.3 | Linealidad vs no linealidad (tabla/gráfico). |
| 26 | **Gráficas engañosas** | ARG | Estadística | 3.1–3.3 | Criticar escalas y visualizaciones. |
| 27 | **Paralelismo, ángulos y semejanza** | ARG | Geometría | 3.1–3.2 | Razones de semejanza; ángulos con paralelas. |
| 28 | **Desigualdad triangular** | ARG | Geometría | 3.1–3.3 | Verificar posibilidad de triángulo. |
| 29 | **Juegos y estrategias de probabilidad** | ARG | Estadística | 3.1–3.3 | Comparar reglas y defender elección. |
| 30 | **Integrador: validez y pertinencia** | ARG | Integrado | 3.3 | Presentar, defender y verificar solución. |

> Los **niveles 1–8** ya están implementados.  
> Los **niveles 9–30** siguen la misma tarjeta: *Título, Objetivo, Dinámica, Texto, Aprobación*.

---

## 🧱 Esquema de metadatos por ítem (sugerido)

```json
{
  "id": "M09-Q03",
  "nivel": 9,
  "competencia": "IR",
  "evidencias": ["1.2"],
  "eje": "Álgebra & Cálculo",
  "enunciado": "Con $12$ manzanas a $1,8$ cada una y $5$ plátanos a $1,2$...",
  "opciones": ["sumar totales", "restar", "multiplicar el mayor", "dividir"],
  "respuesta": 0,
  "explicacion": "Se requiere sumar los subtotales: 12×1,8 + 5×1,2.",
  "tiempo_s": 8,
  "tags": ["operaciones", "contexto-mercado"]
}
