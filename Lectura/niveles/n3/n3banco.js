// n3banco.js
// Banco nivel n3: Antónimos / oposición en contexto (≥250 palabras + 5 preguntas)
// Estructura educativa: target + prompt + explain + difficulty
// Compatibilidad: se mantiene q/options/correct para tu n3.js actual.

window.N3_CONTEXTS = [
  {
    id: "c01",
    title: "La entrega del informe",
    difficulty: "M",
    text: `El miércoles en la mañana, Valentina llegó a la oficina con la intención de terminar un informe que debía entregar ese mismo día. Había trabajado varios días en el documento y quería revisarlo con calma antes de enviarlo. En su libreta tenía una lista de pendientes: corregir títulos, revisar una tabla y confirmar un dato final. Al abrir el archivo notó que, aunque el informe se veía ordenado, faltaban algunos datos que un compañero debía confirmar. Valentina decidió escribirle un mensaje y, mientras esperaba la respuesta, organizó el resto del contenido: ajustó subtítulos, corrigió errores de ortografía, unificó el formato de las tablas y revisó que las fechas estuvieran correctas.

A las diez, el jefe pasó por su puesto y preguntó si el informe estaba listo. Valentina respondió que iba avanzado, pero que aún no estaba completo porque faltaba una cifra final. El jefe dijo que era importante evitar retrasos y que necesitaba el documento antes del mediodía para presentarlo en una reunión. Valentina entendió la urgencia y se concentró: cerró el chat, dejó el celular en silencio y se dedicó solo al informe. También verificó que las fuentes citadas fueran consistentes, porque la precisión era clave.

Cuando su compañero respondió, le confirmó el dato faltante y Valentina lo incluyó de inmediato. Luego comparó el número con otra fuente para asegurarse de que fuera correcto. Después revisó el resumen ejecutivo, porque allí debía quedar la idea principal en pocas líneas. Al final guardó el documento, lo exportó a PDF y lo envió por correo con un asunto claro. Se sintió aliviada porque pudo entregar a tiempo y porque el informe quedó ordenado. Más tarde, el jefe la felicitó por la rapidez y la precisión, y Valentina pensó que trabajar con anticipación había sido mejor que correr a última hora.`,
    questions: [
      {
        id: "c01_q1",
        target: "terminar",
        difficulty: "E",
        prompt:
          "En el texto, “terminar” significa finalizar el informe. ¿Cuál opción expresa lo contrario en ese sentido?",
        q:
          "En el texto, “terminar” significa finalizar el informe. ¿Cuál opción expresa lo contrario en ese sentido?",
        options: ["Empezar", "Revisar", "Imprimir", "Enviar"],
        correct: 0,
        explain:
          "Aquí “terminar” es finalizar. Lo contrario es “empezar”, porque implica iniciar en vez de cerrar una tarea.",
      },
      {
        id: "c01_q2",
        target: "faltaban",
        difficulty: "M",
        prompt:
          "En el texto, “faltaban algunos datos” indica ausencia de información. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “faltaban algunos datos” indica ausencia de información. ¿Cuál opción expresa lo contrario?",
        options: ["Sobraban datos", "Había datos completos", "Había datos confusos", "Había datos nuevos"],
        correct: 1,
        explain:
          "Si “faltaban datos”, la idea opuesta es que los datos estaban completos (no había ausencia).",
      },
      {
        id: "c01_q3",
        target: "evitar",
        difficulty: "M",
        prompt:
          "En el texto, “evitar retrasos” significa impedir demoras. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “evitar retrasos” significa impedir demoras. ¿Cuál opción expresa lo contrario?",
        options: ["Provocar demoras", "Acelerar el trabajo", "Revisar más", "Reducir errores"],
        correct: 0,
        explain:
          "“Evitar” es impedir. Lo contrario es “provocar demoras”, es decir, causar retrasos.",
      },
      {
        id: "c01_q4",
        target: "urgencia",
        difficulty: "M",
        prompt:
          "En el texto, “urgencia” indica presión por poco tiempo. ¿Cuál opción expresa lo contrario en ese sentido?",
        q:
          "En el texto, “urgencia” indica presión por poco tiempo. ¿Cuál opción expresa lo contrario en ese sentido?",
        options: ["Prisa", "Tranquilidad", "Precisión", "Orden"],
        correct: 1,
        explain:
          "La urgencia implica prisa y presión. Lo contrario es tranquilidad: trabajar sin apuro.",
      },
      {
        id: "c01_q5",
        target: "a tiempo",
        difficulty: "E",
        prompt:
          "En el texto, “entregar a tiempo” significa cumplir la hora límite. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “entregar a tiempo” significa cumplir la hora límite. ¿Cuál opción expresa lo contrario?",
        options: ["Entregar tarde", "Entregar completo", "Entregar en PDF", "Entregar con asunto"],
        correct: 0,
        explain:
          "Si se entrega a tiempo, se cumple el plazo. Lo contrario es entregar tarde, después del límite.",
      }
    ]
  },

  {
    id: "c02",
    title: "El paseo bajo la lluvia",
    difficulty: "E",
    text: `El viernes en la tarde, Santiago salió a caminar con su hermana por un parque cercano. Al principio, el cielo estaba gris, pero no llovía. Ellos avanzaron por un sendero de tierra y conversaron sobre la semana. Santiago caminaba despacio porque quería observar los árboles, escuchar los sonidos del lugar y mirar cómo se movían las hojas con el viento. Su hermana llevaba una botella de agua y una chaqueta delgada “por si acaso”, aunque Santiago pensó que no sería necesaria.

De repente, una brisa fría apareció y, pocos minutos después, comenzaron a caer gotas pequeñas. La hermana de Santiago sugirió regresar, pero Santiago dijo que podían esperar un poco, ya que la lluvia era suave. Se detuvieron cerca de un lago pequeño y vieron que el agua hacía círculos cuando caían las gotas. Sin embargo, la lluvia aumentó rápidamente y las gotas se volvieron más fuertes. Ellos buscaron refugio bajo un techo pequeño que había cerca de una cancha. Desde allí miraron cómo el parque se iba quedando vacío: algunas personas corrieron hacia la salida y otras se cubrieron con chaquetas. Santiago se dio cuenta de que su ropa estaba mojada y que era mejor no seguir caminando así.

Cuando la lluvia bajó un poco, decidieron volver a casa. Caminaron más rápido para llegar antes de que la tormenta regresara. Al llegar, Santiago se cambió de ropa y tomó algo caliente. Su hermana dijo que, a pesar del mal clima, el paseo fue interesante porque vieron el parque de una manera distinta. Santiago estuvo de acuerdo, pero concluyó que la próxima vez era mejor llevar paraguas y revisar el pronóstico para no depender de la suerte.`,
    questions: [
      {
        id: "c02_q1",
        target: "despacio",
        difficulty: "E",
        prompt:
          "En el texto, caminar “despacio” significa avanzar sin prisa. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, caminar “despacio” significa avanzar sin prisa. ¿Cuál opción expresa lo contrario?",
        options: ["Rápido", "Lejos", "Suave", "Gris"],
        correct: 0,
        explain:
          "Despacio = sin prisa. Lo contrario es rápido, avanzar con velocidad.",
      },
      {
        id: "c02_q2",
        target: "suave",
        difficulty: "E",
        prompt:
          "En el texto, la lluvia “suave” es ligera. ¿Cuál opción expresa lo contrario en intensidad?",
        q:
          "En el texto, la lluvia “suave” es ligera. ¿Cuál opción expresa lo contrario en intensidad?",
        options: ["Lluvia fuerte", "Lluvia corta", "Lluvia lenta", "Lluvia limpia"],
        correct: 0,
        explain:
          "Suave es poca intensidad. Lo contrario es fuerte: mucha intensidad.",
      },
      {
        id: "c02_q3",
        target: "vacío",
        difficulty: "E",
        prompt:
          "En el texto, el parque se fue quedando “vacío” (con poca gente). ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, el parque se fue quedando “vacío” (con poca gente). ¿Cuál opción expresa lo contrario?",
        options: ["Parque grande", "Parque lleno", "Parque húmedo", "Parque oscuro"],
        correct: 1,
        explain:
          "Vacío = sin gente. Lo contrario es lleno: con mucha gente.",
      },
      {
        id: "c02_q4",
        target: "refugio",
        difficulty: "M",
        prompt:
          "En el texto, “refugio” es un lugar protegido de la lluvia. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “refugio” es un lugar protegido de la lluvia. ¿Cuál opción expresa lo contrario?",
        options: ["Protección", "Exposición", "Calor", "Camino"],
        correct: 1,
        explain:
          "Refugio = protección. Lo contrario es exposición: quedar sin cobertura.",
      },
      {
        id: "c02_q5",
        target: "depender",
        difficulty: "M",
        prompt:
          "En el texto, no quieren “depender de la suerte”. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, no quieren “depender de la suerte”. ¿Cuál opción expresa lo contrario?",
        options: ["Depender de la suerte", "Caminar con calma", "Salir temprano", "Mirar los árboles"],
        correct: 0,
        explain:
          "No depender implica planear. Lo contrario es depender de la suerte (dejarlo al azar).",
      }
    ]
  },

  {
    id: "c03",
    title: "La biblioteca y el silencio",
    difficulty: "M",
    text: `El martes, Mariana fue a la biblioteca del barrio para estudiar. Había una mesa disponible cerca de una ventana, así que se sentó allí y sacó sus cuadernos. En la biblioteca se respiraba un ambiente tranquilo: casi no se escuchaban voces y la mayoría de las personas estaba leyendo o escribiendo en silencio. Mariana abrió su libro y comenzó a subrayar ideas importantes. Cada cierto tiempo miraba el reloj para organizar su tiempo, porque quería avanzar en varios capítulos y preparar un resumen para el día siguiente.

A los pocos minutos, entró un grupo de estudiantes y se sentó en una mesa cercana. Al inicio hablaron en voz baja, pero poco a poco comenzaron a reír y a conversar con más volumen. Mariana se distrajo y levantó la mirada. En la biblioteca había un aviso que pedía mantener el silencio, así que Mariana decidió esperar un momento para ver si se calmaban. Sin embargo, el ruido continuó. Ella intentó concentrarse de nuevo, pero cada risa la sacaba de su idea y le costaba volver a la lectura.

Como el ruido seguía, Mariana se levantó y habló con la bibliotecaria. La bibliotecaria se acercó al grupo y les recordó la regla con firmeza, pero con respeto. Los estudiantes se disculparon y bajaron el volumen. El ambiente volvió a ser silencioso y Mariana pudo retomar su lectura sin interrupciones. Después de dos horas guardó sus cosas y se fue satisfecha. Pensó que el silencio era clave para concentrarse y que, cuando alguien lo rompe, el estudio se vuelve más difícil. Por eso valoró que existieran lugares donde se respetaran reglas simples para ayudar a todos.`,
    questions: [
      {
        id: "c03_q1",
        target: "tranquilo",
        difficulty: "E",
        prompt:
          "En el texto, “ambiente tranquilo” significa sin ruido ni tensión. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “ambiente tranquilo” significa sin ruido ni tensión. ¿Cuál opción expresa lo contrario?",
        options: ["Ruidoso", "Lento", "Cercano", "Correcto"],
        correct: 0,
        explain:
          "Tranquilo es sin ruido. Lo contrario es ruidoso: con mucho sonido.",
      },
      {
        id: "c03_q2",
        target: "baja",
        difficulty: "E",
        prompt:
          "En el texto, “voz baja” es hablar con poco volumen. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “voz baja” es hablar con poco volumen. ¿Cuál opción expresa lo contrario?",
        options: ["Voz clara", "Voz alta", "Voz fina", "Voz rápida"],
        correct: 1,
        explain:
          "Baja = poco volumen. Lo contrario es alta: mucho volumen.",
      },
      {
        id: "c03_q3",
        target: "se disculparon",
        difficulty: "M",
        prompt:
          "En el texto, “se disculparon” significa pedir perdón. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “se disculparon” significa pedir perdón. ¿Cuál opción expresa lo contrario?",
        options: ["Agradecieron", "Se enojaron", "No pidieron perdón", "Se sentaron"],
        correct: 2,
        explain:
          "Disculparse es reconocer el error. Lo contrario aquí es no pedir perdón.",
      },
      {
        id: "c03_q4",
        target: "interrupciones",
        difficulty: "E",
        prompt:
          "En el texto, leer “sin interrupciones” es leer sin cortes. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, leer “sin interrupciones” es leer sin cortes. ¿Cuál opción expresa lo contrario?",
        options: ["Con pausas", "Con interrupciones", "Con respeto", "Con ayuda"],
        correct: 1,
        explain:
          "Sin interrupciones significa continuidad. Lo contrario es con interrupciones.",
      },
      {
        id: "c03_q5",
        target: "bajaron",
        difficulty: "E",
        prompt:
          "En el texto, “bajaron el volumen” significa reducirlo. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “bajaron el volumen” significa reducirlo. ¿Cuál opción expresa lo contrario?",
        options: ["Subieron el volumen", "Cambiaron de mesa", "Cerraron el libro", "Salieron rápido"],
        correct: 0,
        explain:
          "Bajar es reducir. Lo contrario es subir: aumentar el volumen.",
      }
    ]
  },

  {
    id: "c04",
    title: "Un pedido en línea",
    difficulty: "M",
    text: `El sábado por la noche, Andrés hizo un pedido en línea porque necesitaba comprar un cargador nuevo para su celular. Entró a una tienda virtual, comparó modelos y revisó comentarios de otros compradores. Eligió un cargador que parecía resistente y que tenía buena calificación. Antes de pagar, verificó el precio, el tiempo estimado de entrega y la política de devoluciones, porque quería evitar problemas si el producto no funcionaba. También revisó si el cable era lo suficientemente largo y si el cargador incluía garantía.

Al día siguiente recibió un correo de confirmación con el número de pedido. El mensaje decía que el paquete saldría en dos días y que podría rastrear el envío. Andrés se sintió tranquilo, ya que la información era clara y el proceso se veía ordenado. Sin embargo, cuando revisó el estado del pedido en la noche, vio un aviso de “demora por alta demanda”. Eso significaba que el paquete tardaría más de lo previsto y que la fecha estimada había cambiado.

Andrés se molestó un poco, pero decidió esperar. Aun así, guardó el correo y anotó el número del pedido para tener evidencia. Dos días después, la empresa actualizó el estado y señaló que el paquete ya estaba en camino. Cuando finalmente llegó, Andrés abrió la caja, probó el cargador y comprobó que funcionaba bien. Se sintió satisfecho porque, aunque la entrega fue lenta, el producto cumplió. Pensó que en compras en línea era importante ser paciente, pero también exigir información precisa para tomar buenas decisiones y no perder tiempo.`,
    questions: [
      {
        id: "c04_q1",
        target: "resistente",
        difficulty: "E",
        prompt:
          "En el texto, “resistente” se refiere a algo que no se daña fácil. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “resistente” se refiere a algo que no se daña fácil. ¿Cuál opción expresa lo contrario?",
        options: ["Frágil", "Caro", "Nuevo", "Rápido"],
        correct: 0,
        explain:
          "Resistente es duro o fuerte ante daños. Lo contrario es frágil: se rompe fácil.",
      },
      {
        id: "c04_q2",
        target: "evitar",
        difficulty: "M",
        prompt:
          "En el texto, “evitar problemas” significa impedir que ocurran. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “evitar problemas” significa impedir que ocurran. ¿Cuál opción expresa lo contrario?",
        options: ["Buscar ofertas", "Provocar problemas", "Comparar modelos", "Revisar comentarios"],
        correct: 1,
        explain:
          "Evitar es impedir. Lo contrario es provocar: causar problemas.",
      },
      {
        id: "c04_q3",
        target: "clara",
        difficulty: "E",
        prompt:
          "En el texto, “información clara” se entiende fácil. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “información clara” se entiende fácil. ¿Cuál opción expresa lo contrario?",
        options: ["Información rápida", "Información confusa", "Información barata", "Información corta"],
        correct: 1,
        explain:
          "Clara es fácil de entender. Lo contrario es confusa: difícil de comprender.",
      },
      {
        id: "c04_q4",
        target: "demora",
        difficulty: "E",
        prompt:
          "En el texto, “demora” significa tardanza. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “demora” significa tardanza. ¿Cuál opción expresa lo contrario?",
        options: ["Entrega", "Puntualidad", "Rastreo", "Demanda"],
        correct: 1,
        explain:
          "Demora es tardanza. Lo contrario es puntualidad: llegar/entregar a tiempo.",
      },
      {
        id: "c04_q5",
        target: "funcionaba",
        difficulty: "E",
        prompt:
          "En el texto, “funcionaba bien” indica que el cargador servía correctamente. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “funcionaba bien” indica que el cargador servía correctamente. ¿Cuál opción expresa lo contrario?",
        options: ["Era bonito", "Se veía nuevo", "No funcionaba", "Llegó tarde"],
        correct: 2,
        explain:
          "Si funcionaba bien, servía. Lo contrario es no funcionaba (no servía).",
      }
    ]
  },

  {
    id: "c05",
    title: "El entrenamiento del equipo",
    difficulty: "M",
    text: `El lunes, un entrenador reunió a su equipo para practicar antes de un partido importante. Dijo que esa semana debían trabajar con disciplina porque el rival era fuerte. Primero hicieron calentamiento y luego una serie de ejercicios de velocidad. El entrenador pidió que cada jugador se esforzara y que mantuviera la concentración, ya que en los partidos un error pequeño puede costar caro. Para reforzar la idea, explicó que el entrenamiento no era solo correr, sino repetir movimientos correctos hasta que salieran casi sin pensar.

Durante la práctica, algunos jugadores estaban motivados y seguían las instrucciones con atención. Otros, en cambio, se distraían y hablaban mientras el entrenador explicaba. El entrenador notó la diferencia y decidió detener el ejercicio para corregir. Con tono serio, explicó que la práctica no era un juego y que el objetivo era mejorar. También dijo que quien no se comprometiera iba a jugar menos minutos, porque un equipo necesita responsabilidad.

Después de ese llamado de atención, el grupo se organizó mejor. Hicieron ejercicios de pases cortos, control del balón y movimientos para defender. El entrenador felicitó a quienes mejoraron y corrigió a quienes repetían errores. Al final cerró la práctica con una frase clara: el éxito se construye con constancia y con respeto al equipo. Los jugadores se fueron cansados, pero más conscientes. Algunos comentaron que el entrenador había sido duro, aunque justo. En general, entendieron que trabajar unidos era más útil que actuar cada uno por su lado.`,
    questions: [
      {
        id: "c05_q1",
        target: "fuerte",
        difficulty: "E",
        prompt:
          "En el texto, el rival es “fuerte” (difícil). ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, el rival es “fuerte” (difícil). ¿Cuál opción expresa lo contrario?",
        options: ["Rival débil", "Rival rápido", "Rival nuevo", "Rival local"],
        correct: 0,
        explain:
          "Fuerte implica difícil de enfrentar. Lo contrario es débil: más fácil de enfrentar.",
      },
      {
        id: "c05_q2",
        target: "concentración",
        difficulty: "E",
        prompt:
          "En el texto, mantener la “concentración” es estar atento. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, mantener la “concentración” es estar atento. ¿Cuál opción expresa lo contrario?",
        options: ["Orden", "Distracción", "Cansancio", "Respeto"],
        correct: 1,
        explain:
          "Concentración es enfocarse. Lo contrario es distracción: perder el enfoque.",
      },
      {
        id: "c05_q3",
        target: "esforzara",
        difficulty: "M",
        prompt:
          "En el texto, “se esforzara” implica trabajar con intensidad. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “se esforzara” implica trabajar con intensidad. ¿Cuál opción expresa lo contrario?",
        options: ["Se relajara", "Se escondiera", "Se durmiera", "Se cansara"],
        correct: 0,
        explain:
          "Esforzarse es poner energía. Lo contrario aquí es relajarse: no exigir esfuerzo.",
      },
      {
        id: "c05_q4",
        target: "unidos",
        difficulty: "E",
        prompt:
          "En el texto, “trabajar unidos” es trabajar como equipo. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “trabajar unidos” es trabajar como equipo. ¿Cuál opción expresa lo contrario?",
        options: ["Trabajar tarde", "Trabajar solos", "Trabajar rápido", "Trabajar suave"],
        correct: 1,
        explain:
          "Unidos es en conjunto. Lo contrario es solos: cada uno por su lado.",
      },
      {
        id: "c05_q5",
        target: "constancia",
        difficulty: "M",
        prompt:
          "En el texto, “constancia” significa mantener el esfuerzo con regularidad. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “constancia” significa mantener el esfuerzo con regularidad. ¿Cuál opción expresa lo contrario?",
        options: ["Irregularidad", "Fuerza", "Velocidad", "Silencio"],
        correct: 0,
        explain:
          "Constancia es continuidad y regularidad. Lo contrario es irregularidad: hacerlo a veces sí y a veces no.",
      }
    ]
  },

  {
    id: "c06",
    title: "Un día de mucho calor",
    difficulty: "E",
    text: `El domingo, Laura se levantó temprano porque quería hacer varias cosas antes del mediodía. Sin embargo, desde la mañana sintió que el clima estaba pesado. El sol era intenso y el aire se sentía caliente incluso dentro de la casa. Laura abrió las ventanas para que entrara algo de brisa, pero no ayudó demasiado. Decidió vestirse con ropa ligera y tomar agua con frecuencia para no sentirse mal. También bajó las cortinas para que no entrara tanta luz directa.

Más tarde salió a hacer compras. En la calle, la gente caminaba más lento y buscaba sombra. Laura notó que algunos preferían quedarse en lugares con ventilador o aire acondicionado. Ella entró a una tienda, compró lo necesario y volvió rápido a casa. Al llegar se dio una ducha y se quedó descansando un rato. Pensó que en días así era mejor evitar actividades pesadas, porque el cuerpo se cansa más y la cabeza se siente lenta.

En la tarde, el calor empezó a bajar un poco y el ambiente se volvió más agradable. Laura aprovechó para lavar ropa y ordenar su habitación. Ya con menos calor, pudo moverse con más energía y terminar lo que le faltaba. Al final del día, se sintió tranquila porque logró hacer lo que necesitaba sin agotarse demasiado. También concluyó que planear el horario según el clima era una buena estrategia para cuidar su salud y sentirse mejor.`,
    questions: [
      {
        id: "c06_q1",
        target: "temprano",
        difficulty: "E",
        prompt:
          "En el texto, levantarse “temprano” es hacerlo a primera hora. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, levantarse “temprano” es hacerlo a primera hora. ¿Cuál opción expresa lo contrario?",
        options: ["Rápido", "Tarde", "Suave", "Lejos"],
        correct: 1,
        explain:
          "Temprano es antes. Lo contrario es tarde: después, a última hora.",
      },
      {
        id: "c06_q2",
        target: "ligera",
        difficulty: "E",
        prompt:
          "En el texto, “ropa ligera” es ropa poco pesada. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “ropa ligera” es ropa poco pesada. ¿Cuál opción expresa lo contrario?",
        options: ["Ropa pesada", "Ropa bonita", "Ropa cara", "Ropa limpia"],
        correct: 0,
        explain:
          "Ligera es poco peso. Lo contrario es pesada: con más peso o más abrigo.",
      },
      {
        id: "c06_q3",
        target: "lento",
        difficulty: "E",
        prompt:
          "En el texto, caminar “más lento” es ir despacio. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, caminar “más lento” es ir despacio. ¿Cuál opción expresa lo contrario?",
        options: ["Caminar más rápido", "Caminar con sombra", "Caminar con agua", "Caminar con calma"],
        correct: 0,
        explain:
          "Lento es poca velocidad. Lo contrario es más rápido.",
      },
      {
        id: "c06_q4",
        target: "evitar",
        difficulty: "M",
        prompt:
          "En el texto, “evitar actividades pesadas” significa no hacerlas. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “evitar actividades pesadas” significa no hacerlas. ¿Cuál opción expresa lo contrario?",
        options: ["Hacer actividades pesadas", "Hacer compras pequeñas", "Tomar agua", "Abrir ventanas"],
        correct: 0,
        explain:
          "Evitar es no hacer. Lo contrario es hacer actividades pesadas.",
      },
      {
        id: "c06_q5",
        target: "agradable",
        difficulty: "E",
        prompt:
          "En el texto, “más agradable” significa más cómodo. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “más agradable” significa más cómodo. ¿Cuál opción expresa lo contrario?",
        options: ["Más ruidoso", "Más incómodo", "Más bonito", "Más temprano"],
        correct: 1,
        explain:
          "Agradable es cómodo. Lo contrario es incómodo.",
      }
    ]
  },

  {
    id: "c07",
    title: "La decisión del profesor",
    difficulty: "M",
    text: `El jueves, un profesor revisó los resultados de una evaluación y notó que varios estudiantes tuvieron dificultades con una parte del tema. En lugar de seguir adelante como si nada, decidió cambiar el plan de la clase. Primero explicó que era normal equivocarse cuando un concepto aún no está claro, y que lo importante era aprender del error. Luego propuso una actividad para repasar desde lo básico. Los estudiantes se sorprendieron porque esperaban una clase normal, pero el profesor dijo que era mejor reforzar antes de avanzar.

Durante la actividad, el profesor dio ejemplos sencillos, hizo preguntas y pidió que los estudiantes explicaran con sus propias palabras. Algunos respondieron con seguridad, mientras otros se mostraron inseguros. El profesor escuchó con paciencia y corrigió con respeto. También pidió que trabajaran en parejas para que se ayudaran entre sí, y circuló por el salón para ver cómo iban. Poco a poco, el ambiente se volvió más participativo y los estudiantes comenzaron a entender mejor.

Al final, el profesor anunció que no habría un castigo por los errores de esa evaluación, sino una oportunidad para mejorar. Dijo que la próxima semana harían una nueva actividad y que lo importante era ver progreso. Los estudiantes se sintieron más tranquilos y agradecieron que el profesor no fuera rígido. El profesor concluyó que enseñar también implica adaptarse a lo que el grupo necesita y ajustar el ritmo para que todos avancen de forma sólida.`,
    questions: [
      {
        id: "c07_q1",
        target: "cambiar",
        difficulty: "M",
        prompt:
          "En el texto, “cambiar el plan” significa modificar lo previsto. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “cambiar el plan” significa modificar lo previsto. ¿Cuál opción expresa lo contrario?",
        options: ["Mantener el plan", "Explicar el tema", "Hacer preguntas", "Trabajar en parejas"],
        correct: 0,
        explain:
          "Cambiar es modificar. Lo contrario es mantener: dejar igual el plan.",
      },
      {
        id: "c07_q2",
        target: "paciencia",
        difficulty: "M",
        prompt:
          "En el texto, escuchar “con paciencia” es hacerlo sin apuro. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, escuchar “con paciencia” es hacerlo sin apuro. ¿Cuál opción expresa lo contrario?",
        options: ["Con prisa", "Con detalle", "Con respeto", "Con ayuda"],
        correct: 0,
        explain:
          "Paciencia implica calma. Lo contrario es prisa: apuro por terminar rápido.",
      },
      {
        id: "c07_q3",
        target: "inseguros",
        difficulty: "E",
        prompt:
          "En el texto, algunos estudiantes se muestran “inseguros” (dudan). ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, algunos estudiantes se muestran “inseguros” (dudan). ¿Cuál opción expresa lo contrario?",
        options: ["Confusión", "Seguridad", "Curiosidad", "Alegría"],
        correct: 1,
        explain:
          "Inseguro es dudar. Lo contrario es seguridad: confiar en la respuesta.",
      },
      {
        id: "c07_q4",
        target: "participativo",
        difficulty: "M",
        prompt:
          "En el texto, “participativo” significa que intervienen y hablan. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “participativo” significa que intervienen y hablan. ¿Cuál opción expresa lo contrario?",
        options: ["Activo", "Silencioso", "Cercano", "Formal"],
        correct: 1,
        explain:
          "Participativo implica intervenir. Lo contrario aquí es silencioso: no participar.",
      },
      {
        id: "c07_q5",
        target: "rígido",
        difficulty: "M",
        prompt:
          "En el texto, “no fuera rígido” significa que no era estricto e inflexible. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “no fuera rígido” significa que no era estricto e inflexible. ¿Cuál opción expresa lo contrario?",
        options: ["Flexible", "Fuerte", "Serio", "Inflexible"],
        correct: 3,
        explain:
          "Rígido se entiende como inflexible. Lo contrario sería flexible; aquí piden el opuesto de “no rígido”: inflexible.",
      }
    ]
  },

  {
    id: "c08",
    title: "La subida y bajada de precios",
    difficulty: "E",
    text: `El sábado, Natalia fue al mercado del barrio a comprar frutas y verduras. Ella acostumbra comparar precios antes de elegir, porque quiere cuidar su presupuesto. Al llegar, vio que algunos productos estaban más caros que la semana anterior. El vendedor le explicó que había menos oferta por el clima y que eso causó que ciertos precios subieran. Natalia escuchó y decidió comprar solo lo necesario. También preguntó por productos más baratos para reemplazar algunos ingredientes de su lista, como usar otra fruta para el jugo o cambiar una verdura por una parecida.

En otro puesto, Natalia encontró que el precio del tomate había bajado. El vendedor dijo que esa semana llegó más producto y que, por lo tanto, el costo se redujo. Natalia aprovechó y compró más tomates porque le convenía. Después, al pagar, notó que el total era parecido al de semanas anteriores, aunque algunos precios habían cambiado. Ella pensó que la clave era adaptarse: si un producto sube mucho, se puede reemplazar; si otro baja, se puede aprovechar.

De camino a casa, Natalia recordó que comprar con calma evita decisiones impulsivas. También concluyó que no siempre un precio alto significa mejor calidad, y que un precio bajo no necesariamente significa algo malo. Por eso decidió seguir observando y comparando, y hacer una lista clara antes de salir, para gastar de forma responsable.`,
    questions: [
      {
        id: "c08_q1",
        target: "caros",
        difficulty: "E",
        prompt:
          "En el texto, “más caros” significa de mayor precio. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “más caros” significa de mayor precio. ¿Cuál opción expresa lo contrario?",
        options: ["Más frescos", "Más baratos", "Más grandes", "Más rojos"],
        correct: 1,
        explain:
          "Caros es alto precio. Lo contrario es baratos: menor precio.",
      },
      {
        id: "c08_q2",
        target: "subieran",
        difficulty: "E",
        prompt:
          "En el texto, que los precios “subieran” significa que aumentaron. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, que los precios “subieran” significa que aumentaron. ¿Cuál opción expresa lo contrario?",
        options: ["Aumentaran", "Bajaran", "Cambiaran", "Aparecieran"],
        correct: 1,
        explain:
          "Subir es aumentar. Lo contrario es bajar: disminuir.",
      },
      {
        id: "c08_q3",
        target: "menos",
        difficulty: "E",
        prompt:
          "En el texto, “menos oferta” indica poca disponibilidad. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “menos oferta” indica poca disponibilidad. ¿Cuál opción expresa lo contrario?",
        options: ["Más demanda", "Más oferta", "Menos precio", "Más calidad"],
        correct: 1,
        explain:
          "Menos oferta es poca disponibilidad. Lo contrario es más oferta.",
      },
      {
        id: "c08_q4",
        target: "necesario",
        difficulty: "M",
        prompt:
          "En el texto, “comprar solo lo necesario” significa no excederse. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “comprar solo lo necesario” significa no excederse. ¿Cuál opción expresa lo contrario?",
        options: ["Comprar de inmediato", "Comprar de más", "Comprar barato", "Comprar rápido"],
        correct: 1,
        explain:
          "Lo necesario es lo justo. Lo contrario es comprar de más: excederse.",
      },
      {
        id: "c08_q5",
        target: "evita",
        difficulty: "M",
        prompt:
          "En el texto, comparar precios “evita gastar de más”. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, comparar precios “evita gastar de más”. ¿Cuál opción expresa lo contrario?",
        options: ["Gastó de más", "Compró tomates", "Pagó en efectivo", "Miró con calma"],
        correct: 0,
        explain:
          "Evitar gastar de más significa controlar el gasto. Lo contrario es gastar de más.",
      }
    ]
  },

  {
    id: "c09",
    title: "El transporte a tiempo",
    difficulty: "M",
    text: `El lunes, Juan debía llegar a una entrevista a las nueve de la mañana. Para no correr riesgos, se levantó temprano y revisó dos rutas de transporte. La primera era más corta, pero pasaba por una avenida donde suele haber tráfico. La segunda era un poco más larga, aunque normalmente era más estable. Juan decidió salir con anticipación y eligió la segunda ruta para estar seguro. Antes de salir, cargó su celular, revisó la dirección y preparó los documentos, porque no quería olvidar nada.

En el camino, el bus avanzó con normalidad durante los primeros minutos. Sin embargo, más adelante hubo una congestión por una obra en la vía. El conductor redujo la velocidad y el trayecto se volvió lento. Juan miró el reloj y calculó cuánto faltaba. Para no llegar tarde, decidió bajarse unas cuadras antes y caminar rápido. Así logró llegar a tiempo a la entrevista, aunque llegó un poco cansado.

Después de la entrevista, Juan pensó que su decisión fue acertada. Salir temprano le dio margen para reaccionar ante el imprevisto. Concluyó que, cuando una actividad es importante, es mejor prevenir que lamentar y contar con tiempo extra para resolver problemas. También se prometió revisar rutas alternativas con más frecuencia, porque la ciudad cambia y el tráfico puede variar.`,
    questions: [
      {
        id: "c09_q1",
        target: "corta",
        difficulty: "E",
        prompt:
          "En el texto, una ruta “más corta” tiene menos distancia. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, una ruta “más corta” tiene menos distancia. ¿Cuál opción expresa lo contrario?",
        options: ["Ruta más larga", "Ruta más rápida", "Ruta más barata", "Ruta más vacía"],
        correct: 0,
        explain:
          "Corta es menos distancia. Lo contrario es larga: más distancia.",
      },
      {
        id: "c09_q2",
        target: "anticipación",
        difficulty: "M",
        prompt:
          "En el texto, salir “con anticipación” es salir antes. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, salir “con anticipación” es salir antes. ¿Cuál opción expresa lo contrario?",
        options: ["Salir tarde", "Salir seguro", "Salir rápido", "Salir lejos"],
        correct: 0,
        explain:
          "Anticipación = antes del tiempo. Lo contrario es tarde: después, sin margen.",
      },
      {
        id: "c09_q3",
        target: "normalidad",
        difficulty: "M",
        prompt:
          "En el texto, avanzar “con normalidad” es sin problemas. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, avanzar “con normalidad” es sin problemas. ¿Cuál opción expresa lo contrario?",
        options: ["Con prisa", "Con dificultad", "Con calma", "Con sueño"],
        correct: 1,
        explain:
          "Normalidad es fluidez. Lo contrario aquí es dificultad: con obstáculos o problemas.",
      },
      {
        id: "c09_q4",
        target: "a tiempo",
        difficulty: "E",
        prompt:
          "En el texto, llegar “a tiempo” es cumplir la hora. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, llegar “a tiempo” es cumplir la hora. ¿Cuál opción expresa lo contrario?",
        options: ["Llegar tarde", "Llegar cansado", "Llegar caminando", "Llegar seguro"],
        correct: 0,
        explain:
          "A tiempo = dentro del plazo. Lo contrario es tarde: fuera del plazo.",
      },
      {
        id: "c09_q5",
        target: "prevenir",
        difficulty: "D",
        prompt:
          "En el texto, “prevenir” significa anticiparse al problema. ¿Cuál opción expresa lo contrario en ese sentido?",
        q:
          "En el texto, “prevenir” significa anticiparse al problema. ¿Cuál opción expresa lo contrario en ese sentido?",
        options: ["Ignorar", "Lamentar", "Resolver", "Caminar"],
        correct: 1,
        explain:
          "Prevenir es actuar antes. Lo contrario es lamentar: reaccionar después cuando ya ocurrió.",
      }
    ]
  },

  {
    id: "c10",
    title: "El acuerdo entre vecinos",
    difficulty: "M",
    text: `En un edificio, varios vecinos tuvieron una reunión para hablar sobre el ruido en las noches. Algunas personas dijeron que era difícil dormir porque en ciertos apartamentos ponían música alta. Otras comentaron que entendían que la gente quisiera celebrar, pero que también era importante respetar el descanso. La administradora propuso buscar una solución que fuera justa para todos. Para iniciar, pidió que cada vecino explicara su punto sin atacar a nadie, porque el objetivo era mejorar la convivencia.

Durante la conversación, los vecinos acordaron establecer un horario: después de las diez de la noche, el volumen debía ser bajo. También se acordó que, si alguien planeaba una reunión especial, debía avisar con anticipación para evitar sorpresas. Un vecino sugirió colocar un aviso en el ascensor para recordar la norma, y otro propuso hablar primero con respeto antes de presentar quejas formales. La administradora dijo que así se podía resolver el problema de manera directa, sin convertirlo en un conflicto.

Al final, la mayoría estuvo de acuerdo. La administradora explicó que el objetivo no era castigar, sino mejorar la convivencia. Los vecinos se fueron más tranquilos, porque había una regla clara. Algunos comentaron que el ambiente del edificio podía ser mejor si todos cooperaban. Concluyeron que ceder un poco era preferible a vivir en conflicto constante y que, con comunicación, era posible convivir sin problemas.`,
    questions: [
      {
        id: "c10_q1",
        target: "alta",
        difficulty: "E",
        prompt:
          "En el texto, “música alta” es música con mucho volumen. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “música alta” es música con mucho volumen. ¿Cuál opción expresa lo contrario?",
        options: ["Música nueva", "Música suave", "Música larga", "Música vieja"],
        correct: 1,
        explain:
          "Alta es mucho volumen. Lo contrario es suave: bajo volumen.",
      },
      {
        id: "c10_q2",
        target: "respetar",
        difficulty: "M",
        prompt:
          "En el texto, “respetar el descanso” significa no molestar. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “respetar el descanso” significa no molestar. ¿Cuál opción expresa lo contrario?",
        options: ["Ignorar el descanso", "Avisar con tiempo", "Hablar con respeto", "Mejorar la convivencia"],
        correct: 0,
        explain:
          "Respetar el descanso es cuidarlo. Lo contrario es ignorarlo: no tenerlo en cuenta.",
      },
      {
        id: "c10_q3",
        target: "anticipación",
        difficulty: "E",
        prompt:
          "En el texto, “avisar con anticipación” es avisar antes. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “avisar con anticipación” es avisar antes. ¿Cuál opción expresa lo contrario?",
        options: ["Avisar tarde", "Avisar claro", "Avisar formal", "Avisar en persona"],
        correct: 0,
        explain:
          "Anticipación es antes. Lo contrario es tarde: avisar después o muy encima del evento.",
      },
      {
        id: "c10_q4",
        target: "mejorar",
        difficulty: "M",
        prompt:
          "En el texto, “mejorar la convivencia” significa hacerla más sana y tranquila. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “mejorar la convivencia” significa hacerla más sana y tranquila. ¿Cuál opción expresa lo contrario?",
        options: ["Crear conflicto", "Bajar el volumen", "Poner un aviso", "Llegar temprano"],
        correct: 0,
        explain:
          "Mejorar convivencia implica armonía. Lo contrario es crear conflicto: empeorarla.",
      },
      {
        id: "c10_q5",
        target: "cooperaban",
        difficulty: "M",
        prompt:
          "En el texto, “cooperaban” significa colaborar. ¿Cuál opción expresa lo contrario?",
        q:
          "En el texto, “cooperaban” significa colaborar. ¿Cuál opción expresa lo contrario?",
        options: ["Competían", "No colaboraban", "Ordenaban", "Descansaban"],
        correct: 1,
        explain:
          "Cooperar es colaborar. Lo contrario es no colaborar: actuar sin ayudar al grupo.",
      }
    ]
  }
];
