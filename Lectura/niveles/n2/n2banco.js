// n2banco.js
// Banco de contextos para Nivel 2 (Sinónimos y equivalencias)
// Condición: texto >= 250 palabras + 5 preguntas (sinónimos / conectores / reemplazos)

window.N2_CONTEXTS = [
  {
    id: "c01",
    title: "Reunión de trabajo en la oficina",
    text:
`El lunes en la mañana, el equipo de una oficina tuvo una reunión para organizar las tareas de la semana. A las nueve en punto, el jefe llegó con una carpeta, saludó y pidió que todos se sentaran alrededor de la mesa grande. En la pantalla del salón aparecía una lista de pendientes y un calendario con fechas. El jefe explicó que era necesario distribuir responsabilidades de manera clara para evitar confusiones, y que el objetivo era avanzar de forma ordenada. También dijo que cada persona debía reportar su progreso al final del día para que el grupo no perdiera el rumbo.

Mientras hablaba, algunos empleados tomaban notas y otros revisaban documentos en sus computadores. Una compañera comentó que el proyecto estaba atrasado y que era urgente completar una parte antes del miércoles. El jefe respondió que entendía la situación y que, sin embargo, podían recuperar el tiempo si se trabajaba con disciplina. Para evitar demoras, propuso revisar primero lo que faltaba y luego dividir el trabajo en partes pequeñas.

Después pidió propuestas para mejorar la coordinación. Un empleado sugirió establecer un canal único de mensajes para que no se repitiera la misma información en varios chats. Otra persona propuso cerrar cada jornada con un resumen breve: qué se logró, qué quedó pendiente y cuál será el siguiente paso. El jefe estuvo de acuerdo y anotó las ideas en una hoja. Además, recordó que si aparecía un problema, debían avisar de inmediato, porque era mejor corregir a tiempo que esperar hasta el final.

Al terminar, el jefe resumió la decisión principal: cada integrante tendría una tarea específica y un plazo definido. El ambiente quedó más tranquilo, porque el plan era concreto y porque cada quien sabía qué debía hacer antes del próximo encuentro.`,
    questions: [
      { q: "En el texto, “distribuir responsabilidades” se puede reemplazar por:", options: ["Repartir tareas", "Esconder tareas", "Ignorar tareas", "Eliminar tareas"], correct: 0 },
      { q: "La palabra “urgente” en el texto es equivalente a:", options: ["Necesario de inmediato", "Sin importancia", "Muy lento", "Difícil de entender"], correct: 0 },
      { q: "En el texto, “sin embargo” significa lo mismo que:", options: ["No obstante", "Por eso", "Antes", "Después"], correct: 0 },
      { q: "En el texto, “resumió” se puede reemplazar por:", options: ["Sintetizó", "Desordenó", "Olvidó", "Confundió"], correct: 0 },
      { q: "En el texto, “avisar de inmediato” es equivalente a:", options: ["Informar al instante", "Guardar silencio", "Esperar un mes", "Cambiar de tema"], correct: 0 }
    ]
  },

  {
    id: "c02",
    title: "La compra en la farmacia",
    text:
`El martes en la tarde, Paula entró a una farmacia porque necesitaba comprar un medicamento para el dolor de cabeza. Eran las cinco y quince y el lugar estaba iluminado con luces blancas. Paula caminó por los pasillos, observando productos organizados por categorías: cuidado personal, vitaminas, artículos para bebés y medicamentos de uso común. En el fondo, un farmacéutico atendía a una persona y revisaba una receta. Paula esperó su turno en una fila corta y aprovechó para leer algunos avisos pegados cerca del mostrador, donde hablaban de horarios y servicios.

Cuando llegó al mostrador, Paula explicó que buscaba algo que le ayudara a aliviar el dolor y que prefería una opción habitual, porque ya había tomado medicamentos similares antes. El farmacéutico le preguntó si tenía alergias o si estaba tomando otro producto. Paula respondió que no, y añadió que el dolor había comenzado esa mañana. Entonces, el farmacéutico le mostró dos opciones, explicó las diferencias con calma y señaló la dosis adecuada. Paula eligió una caja pequeña y preguntó cada cuántas horas debía tomarla. El farmacéutico le indicó la frecuencia y le recomendó leer las instrucciones del empaque para no exceder la cantidad.

Además, le sugirió tomar agua y descansar si el malestar continuaba. También mencionó que, si el dolor empeoraba o duraba varios días, sería conveniente consultar a un médico. Paula agradeció la explicación porque fue clara y porque el farmacéutico usó palabras sencillas. Después pagó en la caja, guardó el recibo y revisó que el medicamento estuviera bien cerrado en la bolsa. Se sintió tranquila porque consiguió lo que necesitaba y entendió cómo usarlo de manera correcta.`,
    questions: [
      { q: "En el texto, “aliviar” es equivalente a:", options: ["Disminuir", "Aumentar", "Romper", "Esconder"], correct: 0 },
      { q: "En el texto, “opción habitual” se entiende como:", options: ["Opción común", "Opción imposible", "Opción secreta", "Opción peligrosa"], correct: 0 },
      { q: "En el texto, “frecuencia” se puede reemplazar por:", options: ["Cada cuánto", "Cuánto cuesta", "Dónde queda", "Con quién"], correct: 0 },
      { q: "En el texto, “le recomendó” es equivalente a:", options: ["Le sugirió", "Le prohibió", "Le negó", "Le escondió"], correct: 0 },
      { q: "En el texto, “explicó con calma” es equivalente a:", options: ["Explicó tranquilamente", "Explicó con enojo", "Explicó muy rápido", "No explicó"], correct: 0 }
    ]
  },

  {
    id: "c03",
    title: "La visita al museo",
    text:
`El sábado en la mañana, Andrés fue a un museo de la ciudad con dos amigos. Llegaron a las diez, compraron las entradas en la taquilla y recibieron un folleto con el mapa de las salas. Una guía les explicó que podían comenzar por la muestra principal y que el recorrido era libre, aunque había horarios para visitas guiadas. Andrés miró el folleto y vio que el museo tenía varias secciones: historia, arte y ciencia. Decidieron iniciar por la sala de historia porque estaba cerca de la entrada y porque querían entender primero el contexto del lugar.

En esa sala había vitrinas con objetos antiguos, fotografías y textos explicativos. Andrés se detuvo a leer un panel que describía una época específica y señaló una fecha importante. También observó una maqueta pequeña de una construcción antigua y comparó sus detalles con una imagen en el folleto. Más adelante, pasaron a la sala de arte. Allí había cuadros de diferentes tamaños, retratos, paisajes y una escultura en el centro. La guía comentó que algunas obras eran representativas de un movimiento artístico y que ese estilo se distinguía por ciertos colores y formas.

Luego fueron a la sala de ciencia, donde había modelos y pantallas interactivas. Un panel les indicaba que podían presionar botones para ver demostraciones y cambiar variables en una simulación. Andrés probó una actividad, leyó la explicación en la pantalla y se sorprendió con los resultados. Al final, caminaron hasta la tienda del museo. Andrés compró una postal y un pequeño libro para recordar la visita. Salieron cerca del mediodía y comentaron que la experiencia fue placentera y que les permitió aprender mientras recorrían las salas.`,
    questions: [
      { q: "En el texto, “muestra principal” se puede reemplazar por:", options: ["Exposición principal", "Salida principal", "Puerta principal", "Entrada principal"], correct: 0 },
      { q: "En el texto, “se detuvo” es equivalente a:", options: ["Se paró", "Se escondió", "Se cayó", "Se perdió"], correct: 0 },
      { q: "En el texto, “representativas” significa:", options: ["Que representan", "Que se dañan", "Que se pierden", "Que se esconden"], correct: 0 },
      { q: "En el texto, “interactivas” es equivalente a:", options: ["Con participación del visitante", "Muy silenciosas", "Muy pesadas", "Muy antiguas"], correct: 0 },
      { q: "En el texto, “placentera” se puede reemplazar por:", options: ["Agradable", "Peligrosa", "Confusa", "Urgente"], correct: 0 }
    ]
  },

  {
    id: "c04",
    title: "La reparación del computador",
    text:
`El jueves, Daniela notó que su computador se apagaba sin razón aparente. A veces sucedía mientras escribía un documento, y otras veces cuando abría varias aplicaciones al mismo tiempo. Como necesitaba el equipo para estudiar, decidió llevarlo a un técnico. Llegó al local a las cuatro y veinte, explicó el problema con detalle y comentó que el computador también hacía un ruido leve cuando trabajaba por varios minutos. El técnico la escuchó atentamente y le pidió que describiera con precisión cuándo ocurría el apagado y si aparecía algún mensaje en pantalla.

Daniela dijo que el apagado era repentino, sin aviso previo. El técnico respondió que era posible que el equipo se estuviera calentando demasiado o que hubiera un fallo en la batería. Encendió el computador, revisó el sistema, observó la temperatura en un programa y verificó el uso de memoria. Luego apagó el equipo, lo abrió con cuidado y limpió el ventilador, porque había polvo acumulado. También revisó los cables internos y comprobó que todo estuviera bien conectado.

Después probó el computador con varias aplicaciones abiertas para comprobar si el problema se repetía. Mientras tanto, Daniela esperaba sentada y miraba cómo el técnico trabajaba con calma. El técnico explicó que, además, era recomendable actualizar el sistema y ciertos controladores para evitar errores. Daniela estuvo de acuerdo y autorizó la actualización. Al final, el técnico le entregó el computador y le dijo que debía observar el comportamiento durante dos días. Si el problema continuaba, debía regresar para una revisión más detallada. Daniela agradeció y se fue con la sensación de que el técnico fue claro y que le dio una solución razonable.`,
    questions: [
      { q: "En el texto, “sin razón aparente” es equivalente a:", options: ["Sin causa visible", "Con causa clara", "Con aviso previo", "Con ayuda externa"], correct: 0 },
      { q: "En el texto, “atentamente” se puede reemplazar por:", options: ["Con atención", "Con prisa", "Sin mirar", "Con sueño"], correct: 0 },
      { q: "En el texto, “comprobar” es equivalente a:", options: ["Verificar", "Esconder", "Romper", "Evitar"], correct: 0 },
      { q: "En el texto, “recomendable” significa:", options: ["Conveniente", "Imposible", "Peligroso", "Innecesario"], correct: 0 },
      { q: "En el texto, “más detallada” se puede reemplazar por:", options: ["Más profunda", "Más rápida", "Más corta", "Más simple"], correct: 0 }
    ]
  },

  // ✅ c05 ampliado
  {
    id: "c05",
    title: "El trámite en el banco",
    text:
`El lunes en la tarde, Javier fue a un banco para realizar un trámite. Al entrar, tomó un turno en una máquina y se sentó a esperar. En una pantalla aparecían números y una voz llamaba a los clientes. Javier revisó los documentos que llevaba en una carpeta y confirmó que tenía su cédula, un formulario y el número de su cuenta. Mientras esperaba, observó que algunas personas preguntaban por créditos y otras por transferencias. El lugar estaba ordenado, había sillas disponibles y el personal atendía con paciencia.

Cuando lo llamaron, Javier se acercó a la ventanilla y saludó al asesor. Explicó que necesitaba actualizar un dato en su cuenta porque había cambiado de dirección. El asesor le pidió la cédula, revisó en el sistema y confirmó los datos actuales. Luego le indicó que debía firmar un documento para autorizar el cambio. Javier leyó el documento con calma para asegurarse de que la información estuviera correcta y que no faltara ningún detalle. Después firmó en el espacio indicado y preguntó si el cambio afectaba la correspondencia.

El asesor agradeció y dijo que el cambio quedaría registrado de inmediato. Además, informó que Javier recibiría una notificación por correo electrónico como confirmación. Javier preguntó si era necesario hacer algo más. El asesor respondió que no, pero que era importante guardar el comprobante por cualquier inconveniente futuro. También sugirió revisar la bandeja de entrada más tarde, porque a veces los correos tardan unos minutos en llegar.

Javier guardó el comprobante, se levantó y salió del banco. Se sintió satisfecho porque la gestión fue rápida y porque el asesor fue cordial y claro al explicar los pasos.`,
    questions: [
      { q: "En el texto, “realizar un trámite” se puede reemplazar por:", options: ["Hacer una gestión", "Evitar un pago", "Cerrar una puerta", "Cambiar de tema"], correct: 0 },
      { q: "En el texto, “autorizar” es equivalente a:", options: ["Permitir", "Prohibir", "Esconder", "Olvidar"], correct: 0 },
      { q: "En el texto, “de inmediato” significa:", options: ["Al instante", "Dentro de un año", "Con mucha demora", "En secreto"], correct: 0 },
      { q: "En el texto, “inconveniente” se puede reemplazar por:", options: ["Problema", "Alegría", "Premio", "Juego"], correct: 0 },
      { q: "En el texto, “cordial” es equivalente a:", options: ["Amable", "Agresivo", "Apurado", "Confuso"], correct: 0 }
    ]
  },

  // ✅ c06 ampliado
  {
    id: "c06",
    title: "La caminata por el barrio",
    text:
`El domingo en la mañana, Camila salió a caminar por su barrio para despejarse. Primero caminó por una calle tranquila con árboles y luego cruzó hacia un parque donde había personas haciendo ejercicio. Camila avanzó a paso constante y observó que el clima era fresco. En una esquina, vio a un vecino barriendo la acera y lo saludó. El vecino respondió con una sonrisa y siguió trabajando. Camila decidió dar una vuelta completa al parque, porque quería caminar un poco más antes de regresar.

Mientras caminaba, escuchó a dos personas conversando sobre una actividad de la comunidad y vio a un grupo de niños jugando cerca de los columpios. También notó a una señora paseando un perro pequeño con una correa azul. Camila pensó que el ambiente era agradable, ya que el parque estaba limpio, había buena iluminación y las bancas estaban en buen estado. Más adelante, se detuvo un momento para tomar agua, revisar el reloj y respirar profundo. Notó que eran las ocho y diez. Luego continuó por otra calle y pasó frente a una tienda donde un vendedor acomodaba cajas de productos en la entrada.

En el camino de regreso, Camila eligió una ruta distinta para variar. Pasó por una cuadra con casas antiguas, donde algunas ventanas tenían macetas con flores. Vio un letrero de “se arrienda” y escuchó música suave que salía de una casa. Esa mezcla de detalles la hizo sentirse más tranquila. Cuando llegó a su calle, caminó más lento y estiró los hombros.

Después de varios minutos, Camila regresó a su casa. Se sintió renovada porque pudo respirar aire fresco y porque la caminata le ayudó a relajarse. Antes de entrar, decidió estirar un poco las piernas para evitar molestias y para soltar la tensión. Finalmente, guardó la botella de agua y se preparó para desayunar con calma.`,
    questions: [
      { q: "En el texto, “despejarse” se puede reemplazar por:", options: ["Relajarse", "Enojarse", "Cansarse", "Perderse"], correct: 0 },
      { q: "En el texto, “a paso constante” es equivalente a:", options: ["A ritmo regular", "Muy lento", "Saltando", "Sin caminar"], correct: 0 },
      { q: "En el texto, “agradable” significa:", options: ["Placentero", "Peligroso", "Ruidoso", "Inseguro"], correct: 0 },
      { q: "En el texto, “renovada” se puede reemplazar por:", options: ["Con energía", "Asustada", "Enferma", "Molesta"], correct: 0 },
      { q: "En el texto, “molestias” es equivalente a:", options: ["Dolores", "Premios", "Risas", "Secretos"], correct: 0 }
    ]
  },

  // ✅ c07 ampliado
  {
    id: "c07",
    title: "La preparación de una receta",
    text:
`El sábado en la tarde, Laura decidió preparar una receta sencilla para su familia. Primero revisó los ingredientes: arroz, verduras, aceite y sal. Luego lavó las verduras con cuidado y las cortó en trozos pequeños sobre una tabla. Laura encendió la estufa y colocó una olla con agua. Cuando el agua comenzó a hervir, agregó el arroz y bajó un poco el fuego para que se cocinara sin derramarse. Mientras el arroz se cocinaba, Laura calentó una sartén, añadió un poco de aceite y colocó las verduras. Las revolvió con una cuchara para que no se pegaran.

Laura observó el color de las verduras y notó que cambiaban lentamente. Entonces agregó una pizca de sal y siguió mezclando. Después decidió agregar un poco de ajo picado para dar más sabor, y esperó unos minutos mientras el olor se extendía por la cocina. Cuando el arroz estuvo listo, lo escurrió y lo mezcló con las verduras. Probó un poco para verificar el sabor y decidió agregar un poco más de sal. La familia se acercó a la cocina y dijo que el olor era agradable. Laura sirvió la comida en platos y se sentó con ellos a comer.

Mientras cenaban, Laura explicó qué verduras había usado y comentó que la próxima vez podría incluir zanahoria o arvejas para cambiar el color y la textura. También dijo que era mejor cocinar con calma para evitar que el arroz quedara pegado. Su familia estuvo de acuerdo y pidió repetir la receta otro día. Laura sonrió porque sintió que el esfuerzo valió la pena.

Al final, Laura lavó los utensilios, limpió la mesa y guardó lo que sobró en un recipiente. Se sintió satisfecha porque la receta fue fácil y porque todos quedaron contentos. Además, pensó que podría repetirla otro día con diferentes verduras para variar el sabor.`,
    questions: [
      { q: "En el texto, “revisó los ingredientes” se puede reemplazar por:", options: ["Verificó los ingredientes", "Escondió los ingredientes", "Rompió los ingredientes", "Olvidó los ingredientes"], correct: 0 },
      { q: "En el texto, “trozos pequeños” es equivalente a:", options: ["Pedazos pequeños", "Pedazos enormes", "Pedazos invisibles", "Pedazos fríos"], correct: 0 },
      { q: "En el texto, “verificar el sabor” significa:", options: ["Comprobar el sabor", "Olvidar el sabor", "Cambiar el sabor", "Guardar el sabor"], correct: 0 },
      { q: "En el texto, “satisfecha” se puede reemplazar por:", options: ["Contenta", "Enojada", "Confundida", "Asustada"], correct: 0 },
      { q: "En el texto, “variar” significa:", options: ["Cambiar", "Detener", "Romper", "Esconder"], correct: 0 }
    ]
  },

  // ✅ c08 ampliado
  {
    id: "c08",
    title: "El aviso en la escuela",
    text:
`El miércoles, en una escuela, la directora reunió a los estudiantes en el patio para dar un aviso importante. A las siete y cuarenta, los cursos se formaron en filas y guardaron silencio. La directora sostuvo un micrófono y explicó que al día siguiente habría una actividad especial. Dijo que la participación era obligatoria y que todos debían traer una camiseta blanca. También mencionó que el evento comenzaría temprano y que era necesario llegar puntuales para evitar retrasos y para organizar bien la entrada.

Después, la directora aclaró que algunos estudiantes ayudarían con la organización. Esos estudiantes debían presentarse en la oficina al terminar la primera clase para recibir instrucciones. Además, la directora recordó que la escuela debía mantenerse limpia y que no se debía botar basura en el patio, especialmente durante la actividad. Varios docentes estaban cerca y observaban que los estudiantes escucharan con atención. Cuando la directora terminó, los estudiantes regresaron a sus salones y comentaron el aviso, repitiendo lo de la camiseta y la hora.

En clase, un profesor volvió a explicar las instrucciones para asegurarse de que todos entendieran. Dijo nuevamente lo de la camiseta blanca y la hora de llegada, y pidió que anotaran la información en sus cuadernos. También agregó que, si alguien olvidaba la camiseta, debía informar temprano para buscar una solución. El profesor recordó que el orden era importante para que la actividad saliera bien.

Al finalizar la jornada, muchos se fueron pensando en lo que debían preparar y en cómo llegar a tiempo. Algunos estudiantes hablaron con sus compañeros para acordar un punto de encuentro y así entrar juntos al colegio al día siguiente.`,
    questions: [
      { q: "En el texto, “aviso importante” se puede reemplazar por:", options: ["Anuncio importante", "Juego importante", "Castigo importante", "Ruido importante"], correct: 0 },
      { q: "En el texto, “obligatoria” es equivalente a:", options: ["Forzosa", "Opcional", "Prohibida", "Secreta"], correct: 0 },
      { q: "En el texto, “puntuales” significa:", options: ["A tiempo", "Con sueño", "Con hambre", "Muy lejos"], correct: 0 },
      { q: "En el texto, “aclaró” se puede reemplazar por:", options: ["Explicó", "Escondió", "Confundió", "Rompió"], correct: 0 },
      { q: "En el texto, “repetir las instrucciones” es equivalente a:", options: ["Decirlas de nuevo", "Borrarlas", "Ignorarlas", "Inventarlas"], correct: 0 }
    ]
  },

  {
    id: "c09",
    title: "La espera en la terminal",
    text:
`El viernes en la noche, Diego llegó a una terminal de transporte para viajar a otra ciudad. Eran las siete y veinte cuando entró y vio muchas personas esperando. Diego caminó hacia una pantalla donde aparecían los horarios y buscó el número de su bus. Encontró la hora de salida, el destino y el número de la plataforma. Luego se dirigió a esa plataforma y se sentó en una silla metálica. Cerca de él, una familia hablaba en voz baja y un vendedor ofrecía café y galletas.

Diego revisó su tiquete para confirmar el destino y la hora. También revisó que su maleta tuviera el nombre escrito, por si se perdía durante el viaje. El ambiente era ruidoso porque se escuchaban anuncios por altavoz y porque la gente se movía con prisa. En uno de esos anuncios, mencionaron un retraso para otra ruta. Diego pensó que, sin embargo, su bus saldría a tiempo porque aún faltaban varios minutos y porque en la pantalla no aparecía cambio de horario. Para pasar el tiempo, Diego tomó agua, miró su celular y respondió un mensaje.

A las siete y cincuenta, un empleado de la empresa llamó a los pasajeros y pidió que se formaran. Diego se levantó, tomó su maleta y se colocó en la fila. Cuando el bus llegó, el conductor revisó los tiquetes y dejó subir a los pasajeros. Diego subió, buscó su asiento y guardó la maleta en el compartimento superior. Se sentó y respiró tranquilo porque estaba listo para salir.`,
    questions: [
      { q: "En el texto, “terminal de transporte” se puede reemplazar por:", options: ["Estación de buses", "Parque de juegos", "Hospital", "Biblioteca"], correct: 0 },
      { q: "En el texto, “confirmar” es equivalente a:", options: ["Verificar", "Olvidar", "Inventar", "Romper"], correct: 0 },
      { q: "En el texto, “anuncios por altavoz” significa:", options: ["Mensajes por parlante", "Mensajes por carta", "Mensajes por silencio", "Mensajes por dibujo"], correct: 0 },
      { q: "En el texto, “sin embargo” se puede reemplazar por:", options: ["No obstante", "Por eso", "Entonces", "Antes"], correct: 0 },
      { q: "En el texto, “se colocó en la fila” es equivalente a:", options: ["Se ubicó en la fila", "Se escondió", "Se fue corriendo", "Se acostó"], correct: 0 }
    ]
  },

  // ✅ c10 ampliado
  {
    id: "c10",
    title: "El mensaje del vecino",
    text:
`El martes, Ana recibió un mensaje de su vecino en el celular. El vecino le escribió para avisar que había llegado un recibo a su puerta por error. Ana leyó el mensaje con atención y respondió que pasaría a recogerlo en la tarde. El vecino indicó que estaría en casa después de las seis. Ana agradeció la amabilidad y siguió con sus actividades. Durante el día, Ana recordó varias veces que debía pasar por el recibo, porque era un documento importante y no quería perderlo. Además, pensó que era mejor resolverlo pronto para no tener problemas con fechas o pagos.

En la tarde, Ana terminó su trabajo, guardó sus cosas y salió de su casa. Caminó hasta el edificio del vecino y tocó el timbre. El vecino abrió la puerta, la saludó y le entregó el recibo doblado dentro de un sobre. Ana revisó el nombre, confirmó que era suyo y verificó que no estuviera roto. El vecino explicó que lo encontró en el piso cerca de su puerta y que por eso decidió escribirle de inmediato. Ana dijo que fue un buen gesto y que le ayudó a resolver el problema rápidamente.

Antes de irse, Ana conversó un momento con el vecino sobre el clima y sobre la administración del edificio. El vecino comentó que esa semana habían hecho mantenimiento a la entrada y que por eso había más movimiento. Ana respondió que había notado el cambio y que el edificio se veía más ordenado. Luego se despidió, guardó el recibo en su bolso y regresó a casa.

Se sintió tranquila porque recuperó el documento y porque la comunicación fue clara y respetuosa. Al llegar, dejó el recibo en un lugar visible para no olvidarlo y se preparó para revisar el pago con calma.`,
    questions: [
      { q: "En el texto, “avisar” se puede reemplazar por:", options: ["Informar", "Esconder", "Confundir", "Romper"], correct: 0 },
      { q: "En el texto, “con atención” significa:", options: ["Con cuidado", "Con enojo", "Sin mirar", "Con miedo"], correct: 0 },
      { q: "En el texto, “documento importante” es equivalente a:", options: ["Papel relevante", "Juego divertido", "Objeto roto", "Ruido fuerte"], correct: 0 },
      { q: "En el texto, “de inmediato” se puede reemplazar por:", options: ["Al instante", "En un año", "Muy tarde", "Nunca"], correct: 0 },
      { q: "En el texto, “gesto” significa:", options: ["Acción amable", "Grito fuerte", "Error grave", "Secreto"], correct: 0 }
    ]
  }
];
