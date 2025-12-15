// n1banco.js
// Banco del Nivel n1: cada contexto = 1 texto (>=250 palabras) + 5 preguntas literales (explicitas)

window.N1_CONTEXTS = [
  {
    id: "c1",
    title: "El metro y la rutina",
    text:
`En una ciudad de montaña, el metro se convirtió en una rutina silenciosa para miles de personas. Cada mañana, antes de que el sol caliente las paredes, los pasajeros llegan a las estaciones con el mismo objetivo: moverse rápido y sin complicaciones. En los vagones, el sonido dominante no es la conversación sino el roce de las puertas, el anuncio de la siguiente parada y el rumor constante de las ruedas. Aun así, en ese trayecto repetido aparecen pequeñas escenas: un estudiante revisa sus apuntes, una mujer sostiene una caja con cuidado, un adulto mayor se apoya en el pasamanos mientras mira el túnel como si fuera un paisaje.

La línea principal tiene estaciones identificadas por colores y símbolos, y el mapa se repite en cada punto de acceso. En la entrada, un guardia indica por dónde caminar cuando hay filas, y un aviso recuerda que no se debe correr en las escaleras. Los trenes pasan con una frecuencia marcada por el reloj: cada seis minutos en horas de mayor demanda. Cuando el vagón se llena, las personas acomodan sus mochilas y se giran para permitir que otros entren. En una estación céntrica, se escucha a un músico tocar una melodía corta. Algunos dejan una moneda; otros solo miran.

Al final de la jornada, el metro vuelve a vaciarse. Las luces permanecen encendidas y el personal limpia los pasillos. Un anuncio informa el horario del día siguiente y la última salida. Para muchos, el metro no es solo transporte: es un lugar de encuentros breves y de hábitos que se repiten con precisión.`,
    questions: [
      {
        q: "¿Cada cuánto pasan los trenes en horas de mayor demanda, según el texto?",
        options: ["Cada dos minutos", "Cada cuatro minutos", "Cada seis minutos", "Cada diez minutos"],
        correct: 2
      },
      {
        q: "¿Qué se escucha en una estación céntrica, según el texto?",
        options: ["Un discurso político", "Un músico tocando una melodía corta", "Un partido de fútbol", "Un vendedor gritando ofertas"],
        correct: 1
      },
      {
        q: "¿Qué objeto sostiene una mujer en una de las escenas descritas?",
        options: ["Un paraguas", "Una caja", "Un balón", "Un ramo de flores"],
        correct: 1
      },
      {
        q: "¿Qué recuerda un aviso en la entrada del metro?",
        options: ["No comer en los vagones", "No correr en las escaleras", "No usar audífonos", "No hablar por teléfono"],
        correct: 1
      },
      {
        q: "¿Qué se menciona que hace el personal al final de la jornada?",
        options: ["Cierra el mapa de la línea", "Limpia los pasillos", "Apaga todas las luces", "Pinta las paredes"],
        correct: 1
      }
    ]
  },

  {
    id: "c2",
    title: "La biblioteca del barrio",
    text:
`La biblioteca del barrio abre a las ocho en punto y mantiene un cartel con el horario a la vista de todos. En la entrada hay un mostrador donde se registran los préstamos y una mesa pequeña para dejar folletos. El espacio no es grande, pero está organizado por secciones: literatura, historia, ciencias y una zona infantil con cojines. Cada estantería tiene una etiqueta en letras claras. En una pared, una cartelera anuncia actividades: club de lectura los jueves, taller de escritura un sábado al mes y una charla sobre autores locales.

A media mañana llegan estudiantes que buscan un lugar tranquilo para repasar. La bibliotecaria, que usa gafas y un suéter azul, pide que los celulares estén en modo silencioso. En la zona infantil, una madre lee en voz baja mientras su hijo señala dibujos. Cerca de la ventana, un hombre consulta un diccionario y toma notas en un cuaderno. La luz entra por los vidrios y cae sobre las mesas, donde hay lámparas para quienes prefieren un foco directo. En la esquina del salón, un afiche pequeño invita a cuidar los libros y devolverlos a tiempo.

En la tarde, la biblioteca presta computadoras por turnos de treinta minutos. Un aviso explica que no se permite comer cerca del teclado. Antes de cerrar, se hace un recorrido para recoger libros olvidados en las mesas. A las seis, la bibliotecaria apaga algunas luces y guarda el sello en un cajón. Al salir, los visitantes ven nuevamente el cartel del horario y la invitación a regresar. En la puerta, un aviso pequeño recuerda que los préstamos se renuevan presentando el carnet.`,
    questions: [
      {
        q: "¿A qué hora abre la biblioteca, según el texto?",
        options: ["A las siete", "A las ocho", "A las nueve", "A las diez"],
        correct: 1
      },
      {
        q: "¿Qué día se menciona para el club de lectura?",
        options: ["Lunes", "Martes", "Jueves", "Domingo"],
        correct: 2
      },
      {
        q: "¿De qué color es el suéter de la bibliotecaria?",
        options: ["Rojo", "Azul", "Verde", "Negro"],
        correct: 1
      },
      {
        q: "¿Cuánto dura el turno de las computadoras en la tarde?",
        options: ["15 minutos", "20 minutos", "30 minutos", "60 minutos"],
        correct: 2
      },
      {
        q: "¿Qué hace la bibliotecaria a las seis, según el texto?",
        options: ["Abre la zona infantil", "Apaga algunas luces", "Imprime folletos", "Ordena la cartelera"],
        correct: 1
      }
    ]
  },

  {
    id: "c3",
    title: "Un huerto en casa",
    text:
`En el patio de una casa pequeña, un huerto comenzó con tres materas y una bolsa de tierra negra. La dueña colocó las materas en un lugar donde el sol llegaba en la mañana y la sombra aparecía en la tarde. En la primera matera sembró tomate; en la segunda, albahaca; y en la tercera, cebollín. Antes de plantar, mezcló la tierra con cáscaras trituradas y un poco de compost. Luego regó con una botella perforada para no dañar las semillas.

Durante la primera semana, revisó la humedad cada día. Si la tierra se veía seca, añadía agua lentamente. En un cuaderno anotaba la fecha y una observación corta: “brotes pequeños”, “hojas nuevas”, “tallo más firme”. A los diez días, la albahaca mostró las primeras hojas definidas. El cebollín creció recto y delgado, y el tomate tardó un poco más en aparecer. Para evitar plagas, limpió las materas y retiró hojas amarillas. También movió un poco la tierra de la superficie para que el agua entrara mejor.

Un sábado, instaló una malla para sostener el tomate cuando creciera. También colocó una etiqueta en cada matera con el nombre de la planta. Con el tiempo, el huerto se volvió parte de la rutina: regar, observar y anotar. Al cocinar, cortaba unas hojas de albahaca o un poco de cebollín, y sentía que el patio tenía un propósito adicional. Incluso guardó la botella perforada en el mismo lugar para no olvidarla al día siguiente.`,
    questions: [
      {
        q: "¿En qué sembró la dueña el tomate, según el texto?",
        options: ["En la primera matera", "En la segunda matera", "En la tercera matera", "En una caja de madera"],
        correct: 0
      },
      {
        q: "¿Qué usó para regar sin dañar las semillas?",
        options: ["Una manguera", "Un balde", "Una botella perforada", "Un vaso de vidrio"],
        correct: 2
      },
      {
        q: "¿A los cuántos días la albahaca mostró las primeras hojas definidas?",
        options: ["A los cinco días", "A los diez días", "A los quince días", "A los veinte días"],
        correct: 1
      },
      {
        q: "¿Qué instaló un sábado para sostener el tomate?",
        options: ["Una lámpara", "Una malla", "Un ventilador", "Un techo de plástico"],
        correct: 1
      },
      {
        q: "¿Qué colocó en cada matera para identificar la planta?",
        options: ["Una piedra", "Una etiqueta con el nombre", "Un dibujo", "Una cinta roja"],
        correct: 1
      }
    ]
  },

  {
    id: "c4",
    title: "La feria de ciencia del colegio",
    text:
`El colegio organizó una feria de ciencia en el coliseo principal un viernes por la mañana. Desde las siete y media, los estudiantes comenzaron a llevar carteles, maquetas y cajas con materiales para sus experimentos. En la entrada había una mesa de registro con dos docentes que anotaban el nombre del curso y el número del stand asignado. Cada stand estaba marcado con una cinta de color en el piso y una hoja pegada en la pared que mostraba el tema. Algunos grupos eligieron temas de biología, como la germinación de semillas, y otros prefirieron química, con demostraciones simples usando indicadores de color.

A las nueve, la rectora dio un mensaje corto por el micrófono y recordó que los visitantes debían caminar despacio para evitar golpes con los modelos. Los jurados, identificados con un gafete, pasaron por los stands con una planilla en la mano. Un grupo de décimo explicó su proyecto sobre reciclaje y mostró una tabla con la cantidad de botellas recolectadas en dos semanas. Cerca de ellos, un equipo de noveno presentó un circuito con luces LED y una batería pequeña. En el centro del coliseo, había un afiche grande con la programación del día y el horario de descanso. En un pasillo lateral, varios estudiantes esperaban su turno para explicar, acomodando los carteles para que se vieran derechos.

Al finalizar la jornada, los estudiantes guardaron los materiales en bolsas y recogieron papeles del suelo. En la salida, el colegio entregó un certificado de participación a cada grupo y anunció que los tres mejores proyectos serían presentados en una actividad municipal. Antes de irse, algunos tomaron fotos de sus stands para recordarlos.`,
    questions: [
      {
        q: "¿En qué lugar se realizó la feria de ciencia, según el texto?",
        options: ["En la biblioteca", "En el coliseo principal", "En el patio de comidas", "En el laboratorio de informática"],
        correct: 1
      },
      {
        q: "¿Qué día y momento se menciona para la feria de ciencia?",
        options: ["Un lunes en la tarde", "Un viernes por la mañana", "Un sábado en la noche", "Un domingo al mediodía"],
        correct: 1
      },
      {
        q: "¿A qué hora dio la rectora el mensaje corto por el micrófono?",
        options: ["A las ocho", "A las nueve", "A las diez", "A las once"],
        correct: 1
      },
      {
        q: "¿Con qué estaban marcados los stands en el piso?",
        options: ["Con tiza blanca", "Con una cinta de color", "Con conos naranjas", "Con pintura azul"],
        correct: 1
      },
      {
        q: "¿Qué entregó el colegio en la salida al final de la jornada?",
        options: ["Un cuaderno", "Un certificado de participación", "Un uniforme", "Un libro de texto"],
        correct: 1
      }
    ]
  },

  {
    id: "c5",
    title: "El envío de un paquete",
    text:
`María necesitaba enviar un paquete a otra ciudad, así que fue a la oficina de mensajería que quedaba a dos cuadras de su casa. Al llegar, tomó un turno de una máquina que imprimía números en un papel pequeño. En la pared había un aviso con las tarifas según el peso y el tipo de envío. Mientras esperaba, observó que algunas personas llevaban sobres y otras cargaban cajas grandes con cinta transparente. Cuando su número apareció en una pantalla, se acercó al mostrador y saludó al asesor.

El asesor le pidió el documento de identidad y le preguntó el destino. Luego colocó la caja en una balanza digital y anotó el peso en el sistema. María confirmó la dirección completa, incluyendo barrio y código postal. Después, el asesor le ofreció dos opciones: envío estándar, con entrega en cuatro días hábiles, o envío exprés, con entrega en dos días hábiles. María eligió el estándar porque era más económico. El asesor imprimió una guía con un código de barras y la pegó en la parte superior de la caja, cuidando de no cubrir la etiqueta del destinatario. También revisó que la caja estuviera bien sellada y que las esquinas no estuvieran abiertas.

Antes de finalizar, María revisó el recibo y pagó con tarjeta. El asesor le explicó que podía hacer seguimiento con el código en la página web de la empresa. Al salir, María guardó el recibo en su cartera y miró el reloj, satisfecha de haber terminado el trámite antes del mediodía. En la puerta, un aviso recordaba conservar la guía para cualquier reclamo.`,
    questions: [
      {
        q: "¿Qué sacó María de la máquina al llegar a la oficina de mensajería?",
        options: ["Un formulario", "Un turno con un número", "Un sobre", "Un recibo de pago"],
        correct: 1
      },
      {
        q: "¿Qué instrumento usó el asesor para medir el peso del paquete?",
        options: ["Una regla", "Una balanza digital", "Un reloj", "Un escáner de huellas"],
        correct: 1
      },
      {
        q: "¿Cuánto tarda el envío estándar, según el texto?",
        options: ["Un día hábil", "Dos días hábiles", "Cuatro días hábiles", "Siete días hábiles"],
        correct: 2
      },
      {
        q: "¿Dónde pegó el asesor la guía con código de barras?",
        options: ["En la parte inferior de la caja", "En la parte superior de la caja", "En el costado derecho", "En el interior de la caja"],
        correct: 1
      },
      {
        q: "¿Con qué pagó María el envío?",
        options: ["Con efectivo", "Con tarjeta", "Con cheque", "Con transferencia bancaria"],
        correct: 1
      }
    ]
  },

  {
    id: "c6",
    title: "La práctica de fútbol",
    text:
`El equipo del barrio se reunía dos veces por semana en la cancha sintética para entrenar. Los martes y los jueves, a las seis de la tarde, los jugadores llegaban con uniforme, guayos y una botella de agua. El entrenador, que llevaba un silbato colgado al cuello, los organizaba en una fila para iniciar con calentamiento. Primero hacían trote suave alrededor de la cancha y luego estiramientos de piernas y espalda. Después, el entrenador dividía al grupo en parejas para practicar pases cortos y control del balón. En esa parte, repetían el ejercicio varias veces hasta que el pase saliera recto.

En la segunda parte del entrenamiento, el equipo trabajaba jugadas por las bandas. Colocaban conos naranjas para marcar una ruta y ensayaban centros hacia el área. El arquero practicaba atajadas con disparos desde diferentes distancias. Cada cierto tiempo, el entrenador detenía la actividad para corregir la posición de los jugadores y recordaba que debían comunicarse con señales claras. A las siete y media, hacían un partido corto de diez minutos por tiempo, con dos equipos mezclados. Los que no estaban jugando animaban desde la línea, esperando su turno.

Al final, el entrenador reunía a todos en el centro para dar instrucciones sobre el próximo partido del fin de semana. También revisaba la lista de asistencia y anotaba quiénes habían llegado tarde. Antes de irse, los jugadores recogían los conos y guardaban los balones en una malla. La luz de la cancha se apagaba cuando el encargado cerraba la reja.`,
    questions: [
      {
        q: "¿Qué días entrenaba el equipo del barrio, según el texto?",
        options: ["Lunes y miércoles", "Martes y jueves", "Miércoles y viernes", "Sábado y domingo"],
        correct: 1
      },
      {
        q: "¿A qué hora llegaban los jugadores a entrenar?",
        options: ["A las cinco", "A las seis", "A las siete", "A las ocho"],
        correct: 1
      },
      {
        q: "¿Qué llevaba el entrenador colgado al cuello?",
        options: ["Una medalla", "Un silbato", "Un radio", "Una linterna"],
        correct: 1
      },
      {
        q: "¿Qué color tenían los conos usados para marcar la ruta?",
        options: ["Verdes", "Azules", "Naranjas", "Negros"],
        correct: 2
      },
      {
        q: "¿Qué hacía el entrenador al final con la lista?",
        options: ["La rompía", "La publicaba", "Revisaba la asistencia y anotaba tardanzas", "La guardaba sin mirarla"],
        correct: 2
      }
    ]
  },

  {
    id: "c7",
    title: "El bus de la mañana",
    text:
`Carlos toma el bus todas las mañanas para llegar a su trabajo. Sale de su casa a las seis y veinte y camina hasta la esquina donde está el paradero. Allí hay un letrero con el número de la ruta y una banca metálica. Cuando el bus se acerca, Carlos levanta la mano para hacer la señal de parada. El conductor abre la puerta delantera y Carlos sube con su tarjeta de transporte. Al pasarla por el lector, se escucha un sonido corto que confirma el pago.
El bus suele ir lleno en las primeras paradas, pero en la mitad del recorrido se libera un poco de espacio. Carlos se sostiene de la barra mientras observa por la ventana. En algunas estaciones, suben estudiantes con morrales y personas con bolsas de mercado. En la cabina, un aviso recuerda ceder el asiento a adultos mayores y mujeres embarazadas. Un día, el bus se retrasó porque había obras en una avenida, y el conductor explicó por el parlante que tomarían un desvío. Algunos pasajeros miraron sus relojes y comentaron el cambio de ruta, pero el conductor mantuvo la calma y siguió la ruta alternativa.
Cuando Carlos llega a su destino, presiona un botón rojo que indica la próxima parada. El bus se detiene y él baja por la puerta trasera. Luego cruza la calle con cuidado y entra al edificio donde trabaja. Aunque el trayecto es el mismo casi todos los días, Carlos prefiere salir temprano para evitar llegar tarde si ocurre algún retraso.` ,

    questions: [
      {
        q: "¿A qué hora sale Carlos de su casa, según el texto?",
        options: ["A las seis y veinte", "A las seis y treinta", "A las siete", "A las cinco y cincuenta"],
        correct: 0
      },
      {
        q: "¿Con qué paga Carlos el transporte al subir al bus?",
        options: ["Con efectivo", "Con una tarjeta de transporte", "Con un ticket de papel", "Con una aplicación del celular"],
        correct: 1
      },
      {
        q: "¿Qué color es el botón que presiona Carlos para indicar la próxima parada?",
        options: ["Azul", "Verde", "Rojo", "Amarillo"],
        correct: 2
      },
      {
        q: "¿Por qué se retrasó el bus un día, según el texto?",
        options: ["Por lluvia fuerte", "Por un accidente", "Por obras en una avenida", "Por falta de gasolina"],
        correct: 2
      },
      {
        q: "¿Por cuál puerta baja Carlos del bus?",
        options: ["Por la puerta delantera", "Por la puerta trasera", "Por la ventana", "Por una puerta lateral"],
        correct: 1
      }
    ]
  },

  {
    id: "c8",
    title: "Un día en el taller de bicicletas",
text:
`El taller de bicicletas abre a las nueve y está ubicado en una esquina con una vitrina llena de cascos y luces. En la puerta cuelga un aviso que indica los servicios: cambio de cadena, ajuste de frenos, alineación de ruedas y revisión general. Andrés llegó con su bicicleta porque notaba que el freno delantero chirriaba. El mecánico, con manos manchadas de grasa, le pidió que dejara la bicicleta en un soporte metálico y le preguntó cuándo fue el último mantenimiento. Andrés respondió que llevaba varias semanas sin revisarla y que el sonido aparecía sobre todo cuando frenaba con fuerza.

El mecánico revisó las pastillas del freno y comprobó que estaban desgastadas. Luego ajustó el cable y giró la rueda para comprobar el contacto. Mientras trabajaba, explicó que el chirrido podía aumentar cuando llovía por la humedad y por la suciedad acumulada. Andrés observó cómo el mecánico sacaba una herramienta, apretaba los tornillos y limpiaba el área del freno con un paño. En una mesa cercana, había llaves, destornilladores y un paño adicional para secar piezas. Después del freno, el mecánico revisó la cadena y aplicó un lubricante, indicando que era importante limpiar la cadena cada dos semanas si se usaba la bicicleta a diario. También recomendó revisar la presión de las llantas antes de salir y evitar guardar la bicicleta mojada.

Antes de entregar la bicicleta, el mecánico hizo una prueba en la acera: frenó dos veces y comprobó que la rueda se detenía sin ruido. Luego escribió el costo en una hoja y Andrés pagó. Al salir, Andrés se colocó el casco y se fue pedaleando, sintiendo que la bicicleta respondía mejor en las bajadas.` ,

    questions: [
      {
        q: "¿A qué hora abre el taller de bicicletas, según el texto?",
        options: ["A las ocho", "A las nueve", "A las diez", "A las once"],
        correct: 1
      },
      {
        q: "¿Qué problema tenía el freno delantero de Andrés?",
        options: ["No frenaba", "Chirriaba", "Se soltaba la rueda", "Se rompió el cable"],
        correct: 1
      },
      {
        q: "¿Qué parte del freno encontró desgastada el mecánico?",
        options: ["Las pastillas", "La palanca", "El manubrio", "La llanta"],
        correct: 0
      },
      {
        q: "¿Cada cuánto recomendó limpiar la cadena si se usa a diario?",
        options: ["Cada dos semanas", "Cada dos meses", "Cada seis meses", "Cada año"],
        correct: 0
      },
      {
        q: "¿Dónde hizo el mecánico la prueba final de frenado?",
        options: ["En la calle principal", "En la acera", "En el interior del taller", "En el parque"],
        correct: 1
      }
    ]
  },

  {
    id: "c9",
    title: "La compra en el supermercado",
text:
`El sábado en la tarde, Laura fue al supermercado con una lista en el celular. Al entrar, tomó un carrito y revisó el pasillo de frutas y verduras. Escogió tomates, bananos y un paquete de espinaca. Luego fue al pasillo de lácteos, donde compró leche y yogur. En el área de panadería, el olor a pan recién horneado la hizo detenerse y elegir una bolsa de pan integral. Antes de seguir, verificó en su lista que aún faltaban arroz, atún y jabón para la loza, y decidió avanzar por los pasillos en el orden más cercano para no devolverse.

En la sección de granos, Laura comparó precios y eligió un paquete de arroz de dos kilos. Después tomó dos latas de atún y pasó por el pasillo de aseo para buscar el jabón. Encontró una promoción en la que el segundo producto tenía descuento, así que agregó un detergente. También miró rápidamente otras marcas para confirmar que la oferta era conveniente. Al final, se dirigió a las cajas y se ubicó en una fila corta. La cajera escaneó los productos y Laura pagó con una tarjeta. Al recibir el recibo, Laura revisó el total y guardó las bolsas en el carrito. En ese momento, pensó que la lista le ayudó a comprar sin olvidar nada y a controlar el gasto, porque solo tomó lo que estaba anotado.

Al salir, caminó hacia el parqueadero y cargó las compras en el baúl del carro. Antes de irse, miró el reloj: eran las cinco y diez. Laura se alegró de haber comprado todo lo necesario en una sola visita, siguiendo la lista para no olvidar nada.` ,
    questions: [
      {
        q: "¿Qué día y momento fue Laura al supermercado?",
        options: ["Un lunes en la mañana", "Un sábado en la tarde", "Un viernes en la noche", "Un domingo al mediodía"],
        correct: 1
      },
      {
        q: "¿Qué tipo de pan eligió Laura en panadería?",
        options: ["Pan dulce", "Pan integral", "Pan de ajo", "Pan sin sal"],
        correct: 1
      },
      {
        q: "¿De qué peso era el paquete de arroz que compró?",
        options: ["Un kilo", "Dos kilos", "Tres kilos", "Cinco kilos"],
        correct: 1
      },
      {
        q: "¿Con qué pagó Laura en la caja?",
        options: ["Con efectivo", "Con tarjeta", "Con cheque", "Con monedas"],
        correct: 1
      },
      {
        q: "¿Qué hora marcaba el reloj al salir, según el texto?",
        options: ["4:10", "5:10", "6:10", "7:10"],
        correct: 1
      }
    ]
  },

  {
    id: "c10",
    title: "El almuerzo en la cafetería",
text:
`En la cafetería de la esquina, el menú del día estaba escrito con marcador en un tablero negro. Ese jueves ofrecían sopa de verduras, arroz, pechuga a la plancha, ensalada y una bebida de panela con limón. Julián entró a las doce y cinco, saludó a la señora del mostrador y pidió el menú completo. La señora le entregó una ficha y le indicó que se sentara en una mesa libre. La cafetería tenía música baja y varias mesas con manteles plásticos, y en el fondo se veía una puerta que conectaba con la cocina.

Mientras Julián esperaba, observó que un mesero llevaba platos a una mesa grande cerca de la ventana. En la cocina se escuchaba el sonido de ollas y cucharones. A los pocos minutos, el mesero trajo la sopa en un plato hondo. Luego llegó el plato principal con la pechuga y el arroz. Julián agregó sal a la ensalada y bebió un poco de la panela con limón. En una pared, un reloj redondo mostraba el paso del tiempo, y el calor del lugar se sentía por la cantidad de personas almorzando. Algunos clientes hablaban en voz baja y otros comían rápido porque debían regresar al trabajo. El mesero caminaba entre mesas y retiraba platos vacíos, dejando servilletas limpias.

Al terminar, Julián llevó la ficha a la caja para pagar. La señora revisó el valor, recibió el dinero y entregó un recibo pequeño. Antes de salir, Julián agradeció y miró nuevamente el tablero del menú. Pensó que volvería otro día porque el servicio había sido rápido y la comida estaba caliente.` ,
    questions: [
      {
        q: "¿Qué día de la semana se menciona en el texto para el menú del día?",
        options: ["Lunes", "Martes", "Jueves", "Domingo"],
        correct: 2
      },
      {
        q: "¿A qué hora entró Julián a la cafetería?",
        options: ["11:05", "12:05", "12:50", "1:05"],
        correct: 1
      },
      {
        q: "¿En qué estaba escrito el menú del día?",
        options: ["En un cuaderno", "En un tablero negro", "En un afiche blanco", "En una pantalla digital"],
        correct: 1
      },
      {
        q: "¿Qué bebida incluía el menú del día?",
        options: ["Jugo de naranja", "Café con leche", "Panela con limón", "Agua con gas"],
        correct: 2
      },
      {
        q: "¿Qué le entregó la señora del mostrador a Julián al pedir el menú?",
        options: ["Una ficha", "Un periódico", "Un vaso", "Una tarjeta de descuento"],
        correct: 0
      }
    ]
  },

  {
    id: "c11",
    title: "La cita médica",
text:
`Andrea tenía una cita médica programada para el martes a las tres de la tarde en un centro de salud del barrio. Llegó quince minutos antes y se acercó a la recepción para confirmar su atención. La auxiliar le pidió el documento y verificó el nombre en el sistema. Luego le entregó un papel con el número de consultorio y le indicó que esperara en la sala. En la sala había sillas plásticas, un dispensador de agua y un televisor con volumen bajo, que mostraba noticias sin interrumpir el silencio del lugar.

Mientras esperaba, Andrea revisó su celular y guardó una lista de síntomas que quería mencionar para no olvidarlos. Vio que en una pared había un cartel que recordaba el uso de tapabocas en caso de gripa. También observó un aviso con recomendaciones de lavado de manos. Unos minutos después, una enfermera abrió la puerta y llamó el nombre de Andrea. La enfermera la condujo a un consultorio pequeño, le midió la presión arterial y registró el peso. Después, Andrea regresó a la sala hasta que el médico la llamó. En el pasillo, una línea en el piso indicaba por dónde caminar para mantener el orden, y varias personas esperaban mirando hacia la puerta del consultorio.

Cuando entró al consultorio del médico, Andrea explicó sus síntomas con calma. El médico escuchó, hizo algunas preguntas y escribió notas en el computador. Al final, le entregó una fórmula y una orden para un examen. Andrea salió, se despidió y guardó los documentos en su bolso antes de irse a casa.` ,
    questions: [
      {
        q: "¿Para qué día y hora estaba programada la cita médica de Andrea?",
        options: ["Lunes a las 3:00", "Martes a las 3:00", "Miércoles a las 4:00", "Viernes a las 2:00"],
        correct: 1
      },
      {
        q: "¿Cuánto tiempo antes llegó Andrea al centro de salud?",
        options: ["Diez minutos", "Quince minutos", "Treinta minutos", "Una hora"],
        correct: 1
      },
      {
        q: "¿Qué le midió la enfermera a Andrea?",
        options: ["La temperatura", "La presión arterial", "La estatura", "La visión"],
        correct: 1
      },
      {
        q: "¿Qué había en la sala de espera además de sillas plásticas?",
        options: ["Una nevera", "Un dispensador de agua", "Un computador", "Un espejo grande"],
        correct: 1
      },
      {
        q: "¿Qué le entregó el médico al final de la consulta?",
        options: ["Una boleta de salida", "Una fórmula y una orden para un examen", "Un cupón de descuento", "Un certificado deportivo"],
        correct: 1
      }
    ]
  },

  {
    id: "c12",
    title: "La reunión de trabajo",
text:
`En la oficina, el equipo de proyectos tenía una reunión programada para el miércoles a las diez de la mañana. La reunión se haría en una sala con una mesa grande y una pantalla para presentaciones. A las nueve y cincuenta, algunas personas ya estaban conectando sus computadores y revisando documentos. La coordinadora colocó una carpeta en el centro de la mesa y repartió una hoja con la agenda del día. En la agenda aparecían tres puntos: revisión de avances, definición de tareas y fecha de entrega. También dejó un marcador sobre el tablero blanco para escribir acuerdos.

A las diez en punto, la coordinadora inició la reunión y pidió que cada persona informara su progreso. Un analista mostró una diapositiva con un gráfico de barras y explicó el estado de los indicadores. Luego, el equipo discutió un problema con un proveedor y acordó enviar un correo de confirmación antes del final de la tarde. En la segunda parte, se asignaron tareas específicas: uno revisaría el presupuesto, otra persona prepararía el informe y un tercero actualizaría el cronograma. Para no perder detalles, alguien anotó en un cuaderno los compromisos y los nombres responsables. En un momento, revisaron el calendario y confirmaron que aún había tiempo para ajustar el plan si surgía un cambio.

Antes de terminar, la coordinadora escribió la fecha de entrega en un tablero blanco y repitió los compromisos. La reunión concluyó a las once menos cuarto. Al salir, cada miembro del equipo se llevó su hoja de agenda y volvió a su puesto para continuar con las actividades.` ,
    questions: [
      {
        q: "¿Para qué día y hora estaba programada la reunión?",
        options: ["Martes a las 9:00", "Miércoles a las 10:00", "Jueves a las 10:00", "Viernes a las 11:00"],
        correct: 1
      },
      {
        q: "¿A qué hora había personas conectando sus computadores, según el texto?",
        options: ["A las 9:30", "A las 9:50", "A las 10:10", "A las 11:00"],
        correct: 1
      },
      {
        q: "¿Cuántos puntos tenía la agenda del día?",
        options: ["Dos", "Tres", "Cuatro", "Cinco"],
        correct: 1
      },
      {
        q: "¿Qué tipo de gráfico mostró un analista?",
        options: ["Gráfico circular", "Gráfico de barras", "Gráfico de líneas", "Tabla de texto"],
        correct: 1
      },
      {
        q: "¿A qué hora concluyó la reunión?",
        options: ["A las 10:45", "A las 11:15", "A las once menos cuarto", "A las doce"],
        correct: 2
      }
    ]
  },

  {
    id: "c13",
    title: "La clase de laboratorio",
text:
`En la clase de laboratorio, el profesor explicó que ese día harían una práctica de medición con instrumentos sencillos. Los estudiantes entraron al aula con batas blancas y se ubicaron por grupos en mesas largas. En cada mesa había una regla, un calibrador y una balanza pequeña. El profesor pidió que primero anotaran los nombres de los integrantes del grupo y luego entregó una hoja con instrucciones paso a paso. La primera indicación era medir la longitud de un objeto usando la regla y registrar el valor en centímetros. Además, el profesor recordó que debían escribir el número de la mesa en la parte superior de la hoja para evitar confusiones al recoger los trabajos.

Después, los estudiantes debían usar el calibrador para medir el diámetro de una moneda y anotar el resultado. El profesor caminaba entre las mesas, revisando que el calibrador estuviera bien ajustado. En una mesa, un grupo tenía dudas sobre dónde colocar la moneda, y el profesor les mostró cómo cerrar suavemente las puntas del instrumento. Luego, la tercera parte de la práctica consistía en medir la masa de un borrador usando la balanza. El profesor recordó que la balanza debía estar en cero antes de iniciar. También insistió en escribir los datos con letra clara, porque al final compararían resultados entre grupos y necesitaban leerlos sin errores.

Al final de la sesión, cada grupo entregó su hoja con los datos y guardó los instrumentos en una caja plástica. El profesor indicó que la próxima clase revisarían los resultados y hablarían de errores de medición. Los estudiantes salieron dejando las mesas limpias y con las batas dobladas en sus mochilas.` ,
    questions: [
      {
        q: "¿Qué llevaban los estudiantes al entrar al aula?",
        options: ["Guantes negros", "Batas blancas", "Uniforme deportivo", "Chaquetas azules"],
        correct: 1
      },
      {
        q: "¿Qué instrumentos había en cada mesa, según el texto?",
        options: ["Regla, calibrador y balanza pequeña", "Microscopio y probetas", "Termómetro y pipetas", "Computador y proyector"],
        correct: 0
      },
      {
        q: "¿En qué unidad se registraba la longitud medida con la regla?",
        options: ["Milímetros", "Centímetros", "Metros", "Pulgadas"],
        correct: 1
      },
      {
        q: "¿Qué objeto medían en la balanza en la tercera parte de la práctica?",
        options: ["Una moneda", "Un borrador", "Un lápiz", "Una piedra"],
        correct: 1
      },
      {
        q: "¿Qué indicó el profesor sobre la próxima clase?",
        options: ["Que habría un examen", "Que revisarían los resultados y hablarían de errores de medición", "Que cambiarían de laboratorio", "Que harían una salida"],
        correct: 1
      }
    ]
  },


  {
    id: "c14",
    title: "La fila del banco",
    text:
`El lunes por la mañana, Diana fue al banco para hacer un trámite en la ventanilla. Llegó a las ocho y diez y encontró una fila corta en la entrada. Un vigilante le indicó que tomara un turno en una pantalla táctil. Diana presionó la opción “Caja” y la máquina imprimió un papel con un número y una letra. En la sala había sillas grises, un dispensador de gel antibacterial y un tablero digital que anunciaba los turnos. Mientras esperaba, Diana revisó los documentos en su carpeta: llevaba su cédula y una hoja con el número de referencia del pago.

El tablero mostró varios turnos antes del suyo. Cada vez que llamaban un turno, se escuchaba un sonido y aparecía el número en la pantalla. Diana observó que algunas personas se acercaban a la ventanilla equivocada y el asesor les pedía volver a la fila. A las ocho y treinta, el tablero mostró el turno de Diana y una flecha indicó la ventanilla número tres. Ella caminó hasta allí y saludó al cajero. El cajero pidió la cédula, revisó el sistema y le solicitó la referencia del pago. Diana entregó la hoja y el cajero confirmó el valor en el monitor.

Después, Diana firmó un comprobante y recibió un recibo impreso. El cajero le recordó guardar el recibo por si necesitaba soporte más adelante. Al salir del banco, Diana miró el reloj: eran las ocho y cuarenta y cinco. Se fue tranquila porque completó el trámite sin contratiempos y con todos los documentos en orden.`,
    questions: [
      { q: "¿Qué día por la mañana fue Diana al banco?", options: ["Lunes", "Martes", "Jueves", "Sábado"], correct: 0 },
      { q: "¿A qué hora llegó Diana al banco?", options: ["8:10", "8:20", "8:30", "8:45"], correct: 0 },
      { q: "¿Qué opción seleccionó Diana en la pantalla táctil?", options: ["Información", "Caja", "Créditos", "Apertura"], correct: 1 },
      { q: "¿A qué ventanilla la enviaron cuando llamaron su turno?", options: ["Ventanilla 1", "Ventanilla 2", "Ventanilla 3", "Ventanilla 4"], correct: 2 },
      { q: "¿Qué hora marcaba el reloj al salir del banco?", options: ["8:35", "8:40", "8:45", "9:00"], correct: 2 }
    ]
  },

  {
    id: "c15",
    title: "La visita al museo",
    text:
`Un domingo, Andrés y su hermana fueron al museo de la ciudad. Llegaron a las diez de la mañana y se ubicaron en la taquilla para comprar las entradas. En la entrada había un afiche grande con las exposiciones del mes y un mapa del edificio. La persona de la taquilla les entregó dos boletas y les explicó que la exposición de historia estaba en el segundo piso. También les indicó que no se podía ingresar con bebidas a las salas.

Al entrar, pasaron por un arco de seguridad y guardaron sus mochilas en un casillero. Andrés anotó el número del casillero en su celular para no olvidarlo. La primera sala que visitaron fue una exposición de fotografías antiguas. En una vitrina, había cámaras viejas y una placa con el nombre del autor. En otra sala, observaron una colección de monedas. Cada vitrina tenía una etiqueta con el año y el país de origen. Andrés se detuvo frente a una moneda grande y leyó que era de 1920.

A las once y media, escucharon un anuncio por parlante que invitaba a un recorrido guiado. Decidieron unirse y caminaron con un grupo pequeño. La guía explicó datos sobre una escultura y pidió no tocarla. Al final del recorrido, Andrés y su hermana fueron a la tienda del museo y compraron una postal. Antes de irse, regresaron al casillero, recogieron sus mochilas y salieron por la puerta principal. Afuera, el sol estaba fuerte y ambos comentaron que el museo fue una buena salida para el domingo.`,
    questions: [
      { q: "¿Qué día fueron Andrés y su hermana al museo?", options: ["Sábado", "Domingo", "Lunes", "Viernes"], correct: 1 },
      { q: "¿A qué hora llegaron al museo?", options: ["9:00", "10:00", "11:00", "12:00"], correct: 1 },
      { q: "¿En qué piso estaba la exposición de historia?", options: ["Primer piso", "Segundo piso", "Tercer piso", "Sótano"], correct: 1 },
      { q: "¿Qué año leyó Andrés en la moneda grande?", options: ["1902", "1910", "1920", "1930"], correct: 2 },
      { q: "¿Qué compraron en la tienda del museo?", options: ["Un libro", "Una postal", "Un cuadro", "Un reloj"], correct: 1 }
    ]
  },

  {
    id: "c16",
    title: "El partido en el parque",
    text:
`El sábado en la mañana, un grupo de amigos se reunió en el parque para jugar un partido de baloncesto. La cancha estaba al lado de una zona de juegos infantiles y tenía dos tableros con aros metálicos. A las nueve, comenzaron a calentar: corrieron alrededor de la cancha y practicaron tiros libres. Uno de los amigos, llamado Mateo, llevó el balón principal y una botella grande de agua. Antes de empezar, dividieron los equipos contando del uno al cuatro para que quedaran parejos. También acordaron una regla simple: si el balón salía de la cancha, se reanudaba desde la línea lateral sin discutir.

El partido se jugó a veinte puntos. Cada vez que un equipo anotaba, el otro sacaba desde la línea de fondo. Alrededor de la cancha se fueron acercando algunas personas a mirar, especialmente cuando hubo una jugada rápida que terminó en una bandeja. Un niño que pasaba con su familia se quedó un momento viendo los tiros, y luego siguió caminando hacia los columpios. A la mitad del partido, hicieron una pausa corta para tomar agua. Mateo miró el celular y dijo que eran las nueve y treinta y cinco. Algunos aprovecharon para ajustar los cordones de los tenis y secarse el sudor con la camiseta.

Luego continuaron con más energía, y uno de los equipos logró remontar gracias a dos triples seguidos. Hubo un rebote largo que terminó en un pase rápido, y todos gritaron cuando el balón entró en el aro. Cuando el marcador llegó a veinte, los jugadores se detuvieron y chocaron las manos. Después se sentaron en una banca a descansar y comentaron las mejores jugadas. Antes de irse, recogieron una bolsa con basura que había cerca y la llevaron al cesto del parque. Finalmente, caminaron hacia la salida mientras planeaban repetir el partido el próximo fin de semana.`,
    questions: [
      { q: "¿Qué día se reunieron los amigos a jugar?", options: ["Sábado", "Domingo", "Martes", "Jueves"], correct: 0 },
      { q: "¿A qué hora comenzaron a calentar?", options: ["8:30", "9:00", "9:30", "10:00"], correct: 1 },
      { q: "¿Cómo se jugó el partido según el texto?", options: ["A 10 puntos", "A 15 puntos", "A 20 puntos", "A 30 puntos"], correct: 2 },
      { q: "¿Cómo se llama el amigo que llevó el balón principal?", options: ["Carlos", "Mateo", "Julián", "Sergio"], correct: 1 },
      { q: "¿Qué hora dijo Mateo que era durante la pausa?", options: ["9:15", "9:25", "9:35", "9:45"], correct: 2 }
    ]
  },

  {
    id: "c17",
    title: "La estación de gasolina",
    text:
`Camila iba en el carro camino a casa cuando notó que el indicador de gasolina estaba cerca de la reserva. Decidió entrar a una estación de servicio ubicada en una avenida principal. Eran las seis y diez de la tarde. Un trabajador con chaleco reflectivo se acercó y le preguntó cuánto quería cargar. Camila respondió que quería llenar el tanque. El trabajador abrió la tapa, colocó la manguera y activó el surtidor. Mientras tanto, Camila bajó la ventana y revisó su billetera para tener lista la forma de pago. También miró por el espejo para asegurarse de que el carro estuviera bien ubicado junto al surtidor.

En la estación había un letrero con los precios por galón y una pequeña tienda donde vendían agua y snacks. Camila miró el letrero por curiosidad y vio que el precio estaba escrito en números grandes. El trabajador le indicó que el proceso tardaría un momento y le pidió que apagara el motor. Camila confirmó que el motor estaba apagado y esperó, escuchando el sonido del combustible entrando. En ese tiempo, vio a otra persona inflando las llantas en una zona cercana y a un empleado organizando productos en la tienda.

Al terminar, el trabajador retiró la manguera con cuidado y cerró la tapa del tanque. Luego le dijo el valor final y le entregó un comprobante. Camila pagó con tarjeta y guardó el recibo en la guantera. Antes de salir, verificó por el espejo que no venía ningún vehículo y encendió las luces. Al incorporarse a la avenida, se sintió tranquila porque ya no tendría que preocuparse por quedarse sin gasolina en el camino.`,
    questions: [
      { q: "¿A qué hora entró Camila a la estación de servicio?", options: ["5:10", "6:10", "7:10", "8:10"], correct: 1 },
      { q: "¿Qué dijo Camila que quería hacer con el tanque?", options: ["Cargar la mitad", "Llenar el tanque", "Cargar solo un galón", "No cargar"], correct: 1 },
      { q: "¿Qué pidió el trabajador que hiciera Camila durante el proceso?", options: ["Abrir las puertas", "Apagar el motor", "Subir el volumen", "Encender el aire"], correct: 1 },
      { q: "¿Con qué pagó Camila al final?", options: ["Efectivo", "Tarjeta", "Monedas", "Transferencia"], correct: 1 },
      { q: "¿Dónde guardó Camila el recibo?", options: ["En el bolsillo", "En la guantera", "En el asiento", "En la puerta"], correct: 1 }
    ]
  },

  {
    id: "c18",
    title: "La clase de cocina",
    text:
`En un centro cultural del barrio, se realizó una clase de cocina para principiantes. La sesión comenzó a las cuatro de la tarde y el instructor saludó a los asistentes frente a una mesa larga. Ese día enseñarían a preparar una ensalada con aderezo casero. Cada estudiante recibió una tabla de cortar, un cuchillo y un delantal. El instructor explicó que primero debían lavar bien las verduras y secarlas con papel de cocina para que no quedaran húmedas. En una pizarra, escribió los ingredientes: lechuga, tomate, pepino, limón, aceite de oliva y sal. También recordó lavarse las manos antes de empezar y mantener la mesa ordenada.

Luego, el instructor mostró cómo cortar el pepino en rodajas delgadas. Los estudiantes lo imitaron y dejaron las rodajas en un recipiente. Después, cortaron el tomate en cubos y lo mezclaron con la lechuga. Para el aderezo, el instructor pidió exprimir un limón en un tazón pequeño, agregar dos cucharadas de aceite de oliva y una pizca de sal. Todos revolvieron con una cuchara hasta que el líquido se viera uniforme. El instructor caminó entre las mesas para revisar que las porciones fueran correctas y recordó no acercar los dedos al filo del cuchillo. Además, explicó que si el aderezo quedaba muy ácido, podían mezclarlo mejor para equilibrar el sabor.

Al final, cada participante sirvió su ensalada en un plato y la probó. El instructor indicó que la próxima clase sería el martes siguiente y trataría sobre una receta caliente. Los estudiantes limpiaron sus mesas, lavaron los utensilios y guardaron los delantales antes de salir.`,
    questions: [
      { q: "¿A qué hora comenzó la clase de cocina?", options: ["3:00", "4:00", "5:00", "6:00"], correct: 1 },
      { q: "¿Qué ingrediente escribió el instructor en la pizarra, según el texto?", options: ["Arroz", "Lechuga", "Carne", "Harina"], correct: 1 },
      { q: "¿Cómo pidió cortar el pepino?", options: ["En tiras largas", "En rodajas delgadas", "En cubos grandes", "En mitades"], correct: 1 },
      { q: "¿Cuántas cucharadas de aceite de oliva se agregan al aderezo?", options: ["Una", "Dos", "Tres", "Cuatro"], correct: 1 },
      { q: "¿Qué día sería la próxima clase, según el instructor?", options: ["El lunes siguiente", "El martes siguiente", "El jueves siguiente", "El sábado siguiente"], correct: 1 }
    ]
  },

{
  id: "c19",
  title: "El corte de luz en el edificio",
  text:
`En un edificio de apartamentos, un corte de luz ocurrió una noche de lluvia. A las ocho y veinte, los pasillos quedaron oscuros y algunas personas abrieron sus puertas para mirar qué pasaba. En varios pisos se escucharon voces preguntando si la falla era solo en un apartamento o en todo el edificio. El administrador del edificio bajó al primer piso para revisar el tablero eléctrico y confirmar si algún interruptor se había bajado. En la entrada, varios vecinos se reunieron cerca de la recepción. Uno de ellos encendió la linterna del celular y señaló que el ascensor se había detenido justo cuando iba a subir. Otro vecino comentó que su sala quedó a oscuras y que por eso salió al pasillo para buscar información.

Mientras esperaban, la recepción sacó una vela de emergencia y la colocó sobre el mostrador para tener luz mínima. En el lobby, se escuchaba la lluvia golpeando los vidrios y el sonido de carros pasando por la calle. Un vecino comentó que había visto un relámpago antes del apagón y otro dijo que en su cuadra también se había ido la luz. El administrador pidió calma y explicó que llamaría a la empresa de energía para reportar el problema y pedir un tiempo estimado. A los diez minutos, el administrador regresó y dijo que la empresa informó una falla en la zona. También indicó que el servicio podría tardar en restablecerse y recomendó no usar el ascensor hasta que volviera la energía de forma estable.

Algunas personas subieron por las escaleras con cuidado, usando la luz del celular para iluminar los escalones y sosteniéndose del pasamanos. Cerca de las nueve, la luz volvió de repente y el ascensor reinició con un sonido suave. Los vecinos se despidieron y regresaron a sus apartamentos. El administrador pidió que revisaran si algún electrodoméstico se había apagado y recomendó desconectar cargadores si ocurría otro apagón. Esa noche, la mayoría se fue a dormir tranquila al ver que el edificio volvió a la normalidad.`,
  questions: [
    { q: "¿A qué hora ocurrió el corte de luz?", options: ["7:20", "8:20", "9:20", "10:20"], correct: 1 },
    { q: "¿Qué revisó el administrador en el primer piso?", options: ["El correo", "El tablero eléctrico", "La cocina", "El parqueadero"], correct: 1 },
    { q: "¿Qué objeto usó un vecino para iluminar, según el texto?", options: ["Un farol", "Una linterna del celular", "Una lámpara de mesa", "Una vela grande"], correct: 1 },
    { q: "¿Qué sacó la recepción como emergencia?", options: ["Un extintor", "Una vela", "Una radio", "Un ventilador"], correct: 1 },
    { q: "¿Cerca de qué hora volvió la luz?", options: ["Cerca de las ocho", "Cerca de las nueve", "Cerca de las diez", "Cerca de las once"], correct: 1 }
  ]
},

{
  id: "c20",
  title: "El trámite en la oficina de correos",
  text:
`Sofía necesitaba enviar una carta certificada, así que fue a la oficina de correos del centro. Llegó a las once y quince y se encontró con una fila que avanzaba lentamente. En una pared, un aviso indicaba que para envíos certificados era obligatorio presentar documento de identidad. Sofía tenía la carta dentro de un sobre y llevaba su cédula en la mano. Mientras esperaba, revisó que el sobre estuviera bien cerrado y que el nombre del destinatario estuviera escrito con letra clara. También miró a su alrededor y vio un mostrador con formularios, un dispensador de turnos y un tablero donde llamaban a las personas.

Cuando le tocó el turno, se acercó al mostrador y saludó al funcionario. El funcionario le pidió la cédula, revisó el destino y preguntó si el sobre contenía documentos. Sofía respondió que sí y que necesitaba constancia de envío. El funcionario pesó el sobre en una balanza pequeña y registró el dato en el sistema. Luego imprimió una etiqueta con un código y la pegó en el sobre, cuidando que quedara recta. Le explicó a Sofía que con ese código podía rastrear el envío por internet. Sofía confirmó el nombre del destinatario y la dirección completa, incluyendo la ciudad, y corrigió una letra que estaba confusa en la primera línea.

Después, Sofía pagó el valor del servicio y recibió un comprobante. El funcionario le recomendó guardar el comprobante hasta confirmar la entrega y no perderlo, porque era el soporte del envío. Sofía revisó por última vez el código impreso, agradeció y guardó el comprobante en su billetera. Al salir de la oficina, sintió alivio porque el trámite quedó completo y ahora podía hacer seguimiento a la carta desde su casa.`,
  questions: [
    { q: "¿A qué hora llegó Sofía a la oficina de correos?", options: ["10:15", "11:15", "12:15", "1:15"], correct: 1 },
    { q: "¿Qué tipo de envío necesitaba Sofía?", options: ["Envío internacional", "Carta certificada", "Paquete exprés", "Envío en moto"], correct: 1 },
    { q: "¿Qué documento era obligatorio presentar según el aviso?", options: ["Pasaporte", "Documento de identidad", "Licencia", "Carnet deportivo"], correct: 1 },
    { q: "¿Qué pegó el funcionario en el sobre?", options: ["Una estampilla antigua", "Una etiqueta con un código", "Un papel en blanco", "Una cinta roja"], correct: 1 },
    { q: "¿Qué recomendó el funcionario que hiciera Sofía con el comprobante?", options: ["Botarlo", "Guardarlo hasta confirmar la entrega", "Dejarlo en el mostrador", "Pegarlo en el sobre"], correct: 1 }
  ]
},
  {
    id: "c21",
    title: "La jornada de limpieza",
    text:
`En el barrio se organizó una jornada de limpieza comunitaria un sábado. A las siete y cuarenta y cinco, los vecinos se reunieron en el parque principal con guantes, bolsas negras y escobas. La líder del comité de convivencia llevó una lista para registrar a los participantes. Al iniciar, explicó que se dividirían en tres grupos: uno recogería basura en las zonas verdes, otro barrería los andenes y el tercero limpiaría alrededor del canasto de la cancha. También recordó que debían separar vidrio y plástico si lo encontraban.

El grupo de zonas verdes caminó por los senderos y encontró botellas, papeles y envolturas. Cada vez que llenaban una bolsa, la amarraban y la dejaban en un punto de acopio junto a una banca. El grupo de andenes barrió hojas secas y polvo. Varias personas usaron recogedores para juntar la basura y depositarla en bolsas. En la cancha, el tercer grupo retiró residuos alrededor del canasto y limpió una zona donde había latas. Algunos vecinos comentaron que el parque se veía mejor a medida que avanzaban y que era importante no tirar basura en la calle.

A las nueve y diez, la líder del comité reunió a todos para contar las bolsas y revisar que no quedara basura suelta. Después, tomaron una foto grupal y agradecieron la participación. Al terminar, un vecino llamó al servicio de recolección para que recogiera las bolsas del punto de acopio. La jornada dejó el parque más limpio y motivó a la gente a cuidar mejor los espacios comunes.`,
    questions: [
      { q: "¿Qué día se organizó la jornada de limpieza?", options: ["Sábado", "Domingo", "Lunes", "Miércoles"], correct: 0 },
      { q: "¿A qué hora se reunieron los vecinos en el parque principal?", options: ["7:15", "7:45", "8:15", "9:10"], correct: 1 },
      { q: "¿Cuántos grupos se formaron según la líder?", options: ["Dos", "Tres", "Cuatro", "Cinco"], correct: 1 },
      { q: "¿Dónde dejaban las bolsas llenas según el texto?", options: ["En la entrada del barrio", "En un punto de acopio junto a una banca", "En la cancha", "En una casa"], correct: 1 },
      { q: "¿A qué hora reunió la líder a todos para contar las bolsas?", options: ["8:40", "9:10", "9:40", "10:10"], correct: 1 }
    ]
  },

  {
    id: "c22",
    title: "El viaje en taxi",
    text:
`Paula salió de su casa para ir a una cita y decidió tomar un taxi porque tenía poco tiempo. Eran las dos y veinte de la tarde. En la esquina levantó la mano y un taxi amarillo se detuvo. El conductor bajó el vidrio y preguntó el destino. Paula respondió la dirección y se acomodó en el asiento trasero. Antes de arrancar, el conductor encendió el taxímetro y revisó el espejo para incorporarse al tráfico. Paula se ajustó el cinturón y revisó en su celular la hora exacta de la cita.

El recorrido comenzó por una avenida con semáforos. Paula miró por la ventana y vio que había un pequeño trancón por una obra. El conductor comentó que tomaría una calle alterna para avanzar más rápido. En el tablero del taxi, el taxímetro mostraba el valor subiendo lentamente. Paula observó a peatones cruzando por la cebra y a buses parando en una estación. A mitad del camino, el conductor frenó en un semáforo en rojo y luego continuó cuando cambió a verde. En un punto, Paula notó una estación de buses y varios vendedores ambulantes cerca de la entrada.

Al llegar a la dirección, el conductor detuvo el taxi junto al andén. Paula miró el taxímetro, pagó el valor y recibió el cambio. El conductor le entregó un recibo pequeño y le deseó buena tarde. Paula bajó, cerró la puerta con cuidado y caminó hacia la entrada del edificio. Se sintió aliviada porque llegó a tiempo gracias a la ruta alterna.`,
    questions: [
      { q: "¿A qué hora decidió Paula tomar un taxi?", options: ["1:20", "2:20", "3:20", "4:20"], correct: 1 },
      { q: "¿De qué color era el taxi, según el texto?", options: ["Rojo", "Amarillo", "Azul", "Verde"], correct: 1 },
      { q: "¿Qué encendió el conductor antes de arrancar?", options: ["La radio", "El taxímetro", "Las luces altas", "El aire acondicionado"], correct: 1 },
      { q: "¿Por qué el conductor dijo que tomaría una calle alterna?", options: ["Porque había un trancón por una obra", "Porque se perdió", "Porque quería parar a comer", "Porque el semáforo dañó"], correct: 0 },
      { q: "¿Qué le entregó el conductor a Paula al final?", options: ["Una tarjeta", "Un recibo pequeño", "Un mapa", "Un cupón"], correct: 1 }
    ]
  },

{
  id: "c23",
  title: "El taller de lectura",
  text:
`En el colegio, el profesor de lengua organizó un taller de lectura para los estudiantes de octavo. La actividad comenzó a las siete y cincuenta en el salón 204. Sobre el escritorio, el profesor dejó una pila de fotocopias con un texto corto y cinco preguntas. Antes de repartirlas, explicó que debían leer en silencio y subrayar palabras clave. También indicó que el tiempo de lectura sería de quince minutos y que luego harían una puesta en común. El profesor insistió en que el ejercicio era de comprensión literal, así que las respuestas debían salir de información explícita del texto, sin inventar datos.

A las ocho en punto, el profesor entregó las fotocopias y pidió que nadie hablara. Los estudiantes se acomodaron en sus puestos y comenzaron a leer. Algunos usaron resaltador para marcar fechas y nombres, y otros tomaron notas al margen para recordar detalles importantes. En el salón se escuchaba solo el sonido de hojas moviéndose. Cuando pasaron los quince minutos, el profesor pidió que dejaran el texto a un lado y respondieran las preguntas en la misma hoja. También recordó que era mejor escribir con letra clara y revisar las opciones antes de marcar una respuesta.

Después, invitó a dos estudiantes a leer sus respuestas en voz alta. El profesor corrigió una respuesta y explicó por qué debía citar una frase exacta del texto cuando la pregunta pedía un dato concreto. Al final del taller, el profesor recogió las hojas y dijo que daría la retroalimentación el jueves. Los estudiantes guardaron los útiles y salieron al descanso. En la puerta, el profesor volvió a recordar que el objetivo era mejorar la comprensión literal, identificando información explícita sin inventar datos.`,
  questions: [
    { q: "¿A qué hora comenzó el taller de lectura?", options: ["7:30", "7:50", "8:10", "8:30"], correct: 1 },
    { q: "¿En qué salón se realizó la actividad?", options: ["Salón 102", "Salón 204", "Salón 305", "Salón 401"], correct: 1 },
    { q: "¿Cuánto tiempo indicó el profesor para la lectura en silencio?", options: ["10 minutos", "15 minutos", "20 minutos", "30 minutos"], correct: 1 },
    { q: "¿Qué pidió el profesor que hicieran con palabras clave?", options: ["Borrarlas", "Subrayarlas", "Copiarlas en otro cuaderno", "Ignorarlas"], correct: 1 },
    { q: "¿Qué día dijo el profesor que daría la retroalimentación?", options: ["Lunes", "Martes", "Jueves", "Viernes"], correct: 2 }
  ]
},




  {
    id: "c24",
    title: "La visita a la biblioteca",
    text:
`El miércoles en la tarde, Valeria fue a la biblioteca del barrio para buscar un libro de historia. Salió de su casa después de almorzar y llegó a las tres y diez. En la entrada había un letrero que decía “Silencio” y un mostrador donde una bibliotecaria atendía a las personas. Valeria saludó y preguntó dónde estaban los libros de historia. La bibliotecaria le explicó que debía subir al segundo piso y buscar la sección marcada con la letra H. También le recordó que podía llevar máximo dos libros en préstamo por una semana.

Valeria subió por las escaleras y caminó entre estanterías altas. En cada estante había etiquetas con letras y números. Encontró la sección de historia y comenzó a revisar los lomos de los libros. Se detuvo en un libro que tenía un mapa en la portada y lo abrió para ver el índice. Luego comparó ese libro con otro que tenía capítulos más cortos. Cerca de ella, un estudiante tomaba apuntes en una mesa, y en el fondo se escuchaba un ventilador suave. Valeria decidió escoger un libro con ilustraciones porque le parecía más fácil de leer. También tomó otro libro pequeño para complementar.

Cuando bajó al primer piso, la bibliotecaria registró los libros en el sistema y pidió la cédula. Valeria entregó el documento y recibió un comprobante con la fecha de devolución. La bibliotecaria indicó que debía devolverlos el miércoles siguiente. Valeria guardó el comprobante dentro de la carpeta y metió los libros en su mochila. Antes de salir, se sentó cinco minutos en una banca de la biblioteca para revisar la primera página. Luego salió tranquila, pensando que con esos libros podría preparar su tarea sin apuro.`,
    questions: [
      { q: "¿Qué día en la tarde fue Valeria a la biblioteca?", options: ["Lunes", "Martes", "Miércoles", "Viernes"], correct: 2 },
      { q: "¿A qué hora llegó Valeria a la biblioteca?", options: ["2:10", "3:10", "4:10", "5:10"], correct: 1 },
      { q: "¿En qué piso estaban los libros de historia?", options: ["Primer piso", "Segundo piso", "Tercer piso", "Sótano"], correct: 1 },
      { q: "¿Cuántos libros máximo podía llevar en préstamo?", options: ["Uno", "Dos", "Tres", "Cuatro"], correct: 1 },
      { q: "¿Qué día debía devolverlos, según la bibliotecaria?", options: ["El lunes siguiente", "El martes siguiente", "El miércoles siguiente", "El viernes siguiente"], correct: 2 }
    ]
  },

  {
    id: "c25",
    title: "El simulacro de evacuación",
    text:
`En una empresa, se realizó un simulacro de evacuación el jueves en la mañana. A las diez en punto, sonó una alarma fuerte y continua en los pasillos. Los empleados dejaron lo que estaban haciendo y se levantaron de sus puestos. La coordinadora de seguridad, que llevaba un chaleco naranja, indicó en voz alta que debían caminar sin correr y seguir las flechas verdes de salida. En la pared se veían señales con el dibujo de una persona corriendo hacia una puerta. Algunos empleados tomaron su bolso y otros solo llevaron el celular para comunicarse.

El grupo del segundo piso salió por la escalera principal. Un supervisor contaba a las personas para asegurarse de que nadie se quedara atrás. En el primer piso, la puerta de emergencia estaba abierta y un guardia ayudaba a mantener el paso ordenado. Afuera, en el punto de encuentro, había un cartel que decía “Zona segura” y un espacio marcado con conos. La coordinadora pidió que todos se reunieran en ese lugar y no se dispersaran. Al mismo tiempo, otra persona verificaba los baños para confirmar que estuvieran vacíos.

Cuando todos llegaron al punto de encuentro, la coordinadora pasó lista y revisó el número total de empleados. Luego explicó que el objetivo era practicar la salida y medir el tiempo. Informó que el edificio se evacuó en cuatro minutos. Después de la explicación, la alarma se detuvo y el personal regresó a sus oficinas en orden. Antes de subir, la coordinadora recordó que en una evacuación real no se debe usar el ascensor y que es importante mantener la calma. Varios empleados comentaron que el simulacro fue útil para identificar por dónde salir y dónde reunirse.`,
    questions: [
      { q: "¿Qué día se realizó el simulacro de evacuación?", options: ["Martes", "Miércoles", "Jueves", "Sábado"], correct: 2 },
      { q: "¿A qué hora sonó la alarma?", options: ["9:00", "10:00", "11:00", "12:00"], correct: 1 },
      { q: "¿De qué color era el chaleco de la coordinadora de seguridad?", options: ["Azul", "Naranja", "Rojo", "Verde"], correct: 1 },
      { q: "¿Qué decía el cartel del punto de encuentro?", options: ["Entrada principal", "Zona segura", "Recepción", "Salida norte"], correct: 1 },
      { q: "¿En cuánto tiempo se evacuó el edificio, según la coordinadora?", options: ["Dos minutos", "Tres minutos", "Cuatro minutos", "Cinco minutos"], correct: 2 }
    ]
  },

  {
    id: "c26",
    title: "La cita en la peluquería",
    text:
`Camilo tenía una cita en la peluquería el sábado en la tarde. Llegó a las cuatro y cinco y encontró dos personas esperando. La peluquería tenía un espejo grande en la pared, varias sillas negras y una mesa con peines y tijeras. Una pantalla mostraba música suave, y al lado del mostrador había un frasco con gel para el cabello. Camilo saludó y dijo que tenía cita para corte. La peluquera revisó una libreta y le pidió que tomara asiento hasta que quedara libre una silla.

Mientras esperaba, Camilo miró un póster con estilos de corte y observó que la peluquería estaba limpia. En una esquina, un secador colgaba de un soporte. A los pocos minutos, la peluquera lo llamó y le colocó una capa negra. Le preguntó cómo quería el corte y Camilo explicó que lo quería corto a los lados y un poco más largo arriba. La peluquera tomó una máquina y empezó por los lados con cuidado. Luego usó tijeras en la parte superior y peinó el cabello hacia adelante para revisar la forma. En el proceso, le mostró con el espejo pequeño cómo iba quedando el corte.

Cuando terminó, la peluquera sacudió la capa para retirar el cabello suelto y aplicó un poco de gel. Camilo se miró en el espejo y dijo que estaba bien. Pagó en el mostrador y recibió una factura pequeña. Al salir, miró el reloj: eran las cuatro y cuarenta y cinco. Caminó hacia su casa contento porque el corte quedó como lo pidió y porque la atención fue rápida.`,
    questions: [
      { q: "¿Qué día en la tarde fue Camilo a la peluquería?", options: ["Jueves", "Viernes", "Sábado", "Domingo"], correct: 2 },
      { q: "¿A qué hora llegó Camilo?", options: ["3:05", "4:05", "5:05", "6:05"], correct: 1 },
      { q: "¿Qué le colocó la peluquera a Camilo antes de cortar?", options: ["Una gorra", "Una capa negra", "Un delantal blanco", "Un abrigo"], correct: 1 },
      { q: "¿Qué pidió Camilo sobre el corte?", options: ["Largo a los lados", "Corto a los lados y más largo arriba", "Todo rapado", "Solo flequillo"], correct: 1 },
      { q: "¿Qué hora era cuando Camilo salió?", options: ["4:25", "4:35", "4:45", "4:55"], correct: 2 }
    ]
  },

{
  id: "c27",
  title: "La entrega del paquete",
  text:
`El martes, Natalia esperaba un paquete en su apartamento. Desde la mañana revisó el estado del envío en el celular y vio que decía “en ruta”. Para no distraerse, dejó la puerta principal sin seguro y mantuvo a la vista la mesa de la sala donde pensaba abrir la caja. También preparó unas tijeras pequeñas y un esfero, porque quería guardar cualquier papel importante que viniera dentro. Durante el día, Natalia escuchó varios ruidos del pasillo, como puertas abriéndose y cerrándose, pero no era el mensajero. A ratos revisaba el celular para confirmar que la entrega seguía programada y para no perder la visita.

A las dos y treinta, sonó el timbre. Natalia se acercó a la puerta y preguntó quién era. Un mensajero respondió su nombre y dijo que traía el paquete. Natalia abrió y vio que el mensajero llevaba una chaqueta con el logo de la empresa y una caja mediana en las manos. El mensajero le pidió confirmar el número de apartamento y mostrar un documento para la entrega. Natalia buscó su cédula en la billetera, la sacó con cuidado y se la mostró. El mensajero miró la información, sacó un dispositivo y pidió una firma en la pantalla. Natalia firmó con el dedo, revisó que el nombre apareciera correcto y el mensajero le entregó la caja. También le dijo que en el correo electrónico llegaría la confirmación.

Natalia agradeció y cerró la puerta con cuidado. Luego llevó la caja a la mesa de la sala y tomó las tijeras para abrirla. Cortó la cinta adhesiva en una sola línea y levantó las solapas. Adentro encontró el producto envuelto en plástico de burbujas y una hoja con instrucciones. Natalia revisó la hoja para confirmar el contenido y comprobó que el modelo coincidía con el que había pedido. Para no ensuciar, separó el plástico y lo dobló. Después guardó la caja vacía y el plástico para reciclarlos. Miró el reloj y notó que eran las dos y cuarenta y cinco. Se sintió tranquila porque el paquete llegó completo y porque el proceso de entrega fue claro y rápido.`,
  questions: [
    { q: "¿Qué día esperaba Natalia el paquete, según el texto?", options: ["Lunes", "Martes", "Jueves", "Sábado"], correct: 1 },
    { q: "¿A qué hora sonó el timbre?", options: ["1:30", "2:30", "3:30", "4:30"], correct: 1 },
    { q: "¿Qué le pidió el mensajero a Natalia para la entrega?", options: ["Una foto", "Un documento", "Un recibo viejo", "Una carta"], correct: 1 },
    { q: "¿Dónde firmó Natalia?", options: ["En papel", "En la pantalla de un dispositivo", "En la pared", "En una libreta"], correct: 1 },
    { q: "¿Qué hora vio Natalia después de abrir el paquete?", options: ["2:35", "2:40", "2:45", "2:50"], correct: 2 }
  ]
},

  {
    id: "c28",
    title: "La caminata por el sendero",
    text:
`El domingo en la mañana, Luis decidió hacer una caminata por un sendero ecológico. Salió temprano y llegó a la entrada del sendero a las siete y veinte. En la entrada había un mapa con las rutas y un aviso que decía que no se debía dejar basura. Luis llevaba una botella de agua, una gorra y una mochila pequeña con una fruta. Antes de entrar, ajustó los cordones de sus zapatos y revisó que el celular tuviera batería.

El sendero comenzaba con un camino de tierra y luego se volvía más estrecho. A los lados se veían árboles altos y algunas flores. Luis caminó a paso constante, escuchando pájaros y el sonido del viento. En un punto, encontró un letrero que indicaba “Mirador” y decidió seguir esa dirección. Después de varios minutos, llegó a un lugar alto donde se veía parte de la ciudad y unas montañas. Se quedó allí un momento, tomó agua y comió la fruta. También tomó una foto del paisaje. Luego continuó la caminata con más calma, cuidando de no resbalar en una parte con piedras.

A las ocho y quince, Luis pasó por una zona donde el camino estaba un poco húmedo por la lluvia de la noche anterior. Caminó despacio y evitó pisar charcos profundos. Más adelante, vio a dos personas caminando en sentido contrario y se saludaron con un gesto. Al final, regresó a la entrada del sendero y revisó que no dejara basura. Se sintió bien porque hizo ejercicio y disfrutó la naturaleza en un ambiente tranquilo.`,
    questions: [
      { q: "¿Qué día hizo Luis la caminata?", options: ["Sábado", "Domingo", "Lunes", "Martes"], correct: 1 },
      { q: "¿A qué hora llegó Luis a la entrada del sendero?", options: ["6:20", "7:20", "8:20", "9:20"], correct: 1 },
      { q: "¿Qué decía el aviso en la entrada sobre la basura?", options: ["Dejar basura en bolsas", "No se debía dejar basura", "Quemar basura", "Tirar basura al río"], correct: 1 },
      { q: "¿Qué dirección siguió Luis según el letrero?", options: ["Cascada", "Mirador", "Salida", "Cafetería"], correct: 1 },
      { q: "¿A qué hora pasó Luis por la zona húmeda?", options: ["7:45", "8:15", "8:45", "9:15"], correct: 1 }
    ]
  },

{
  id: "c29",
  title: "La clase virtual",
  text:
`Mariana tenía una clase virtual programada para el lunes y quería conectarse con tiempo para evitar problemas. Se conectó desde su casa usando un computador portátil. A las seis y cincuenta, abrió la plataforma y verificó el enlace de la reunión. Luego conectó los audífonos y probó el micrófono diciendo una frase corta para confirmar que se escuchaba. También cerró otras pestañas del navegador para que el computador estuviera más rápido. En la pantalla apareció el nombre del curso y el botón de “Unirse”. Mariana hizo clic y entró a la sala virtual. Vio que ya había varios estudiantes conectados y que el profesor estaba compartiendo una diapositiva inicial con el tema del día.

El profesor comenzó la clase a las siete en punto. Saludó, explicó el objetivo y pidió que los estudiantes escribieran su nombre en el chat para registrar asistencia. Mariana escribió su nombre y luego escuchó la explicación. En la diapositiva se veía un título en grande y tres puntos principales. El profesor habló lentamente y dio un ejemplo con un caso cotidiano, para que todos entendieran. Después pidió responder una pregunta corta en el chat. Mariana respondió y vio que otros compañeros también participaban. Para no perderse, Mariana anotó dos ideas clave en un cuaderno: el tema central y el ejemplo que mencionó el profesor. También revisó que su conexión siguiera estable y que el audio no se cortara.

A mitad de la sesión, el profesor hizo una pausa de dos minutos para que todos estiraran las piernas y tomaran agua. Mariana aprovechó para levantarse, mirar por la ventana y volver a sentarse. Luego la clase continuó con una explicación final y un recordatorio de lo más importante. Cuando la clase terminó, el profesor recordó la tarea y dijo que el material quedaría disponible en la plataforma. Mariana tomó nota de la fecha de entrega en un cuaderno y guardó el archivo de la diapositiva. Luego cerró la sesión y apagó los audífonos. Se sintió satisfecha porque la clase fue clara y porque pudo participar sin problemas de conexión.`,
  questions: [
    { q: "¿Qué día tenía Mariana la clase virtual?", options: ["Lunes", "Miércoles", "Jueves", "Domingo"], correct: 0 },
    { q: "¿A qué hora abrió la plataforma Mariana?", options: ["6:30", "6:50", "7:10", "7:30"], correct: 1 },
    { q: "¿A qué hora comenzó la clase el profesor?", options: ["6:45", "7:00", "7:15", "7:30"], correct: 1 },
    { q: "¿Qué pidió el profesor para registrar asistencia?", options: ["Enviar un correo", "Escribir el nombre en el chat", "Prender la cámara", "Subir una foto"], correct: 1 },
    { q: "¿Cuánto duró la pausa que dio el profesor?", options: ["Un minuto", "Dos minutos", "Tres minutos", "Cinco minutos"], correct: 1 }
  ]
},

{
  id: "c30",
  title: "La visita al mercado",
  text:
`El viernes por la mañana, Sergio fue al mercado a comprar frutas y verduras. Llegó a las nueve y cinco y caminó por los pasillos donde había puestos con cajas de productos. En un puesto vio mangos, piñas y papayas. Sergio preguntó el precio de los mangos y el vendedor respondió señalando un cartel pequeño. Sergio escogió cuatro mangos y los puso en una bolsa. Luego caminó a otro puesto para comprar tomates y cebolla. Allí comparó el tamaño de los tomates y eligió los más rojos. Para no olvidar nada, Sergio revisó mentalmente lo que le hacía falta y se movió despacio para no chocar con otras personas, porque el pasillo estaba lleno.

Más adelante, Sergio se detuvo en un puesto de hierbas y compró un manojo de cilantro. El vendedor le ofreció también perejil, pero Sergio dijo que solo necesitaba cilantro. En el mercado había mucha gente, y se escuchaban voces de vendedores anunciando ofertas. Sergio avanzó con cuidado, esquivando carritos pequeños y bolsas en el suelo. En una esquina, vio una balanza donde pesaban las compras. El vendedor del puesto de tomates pesó la bolsa y dijo el total. Sergio pagó en efectivo y guardó el cambio en un bolsillo para no perderlo. Luego revisó las bolsas para asegurarse de que estuvieran bien cerradas.

Antes de irse, Sergio compró una bolsa de naranjas en una promoción. Revisó que las naranjas no estuvieran golpeadas y aceptó la bolsa. También ajustó el peso de las bolsas para cargarlas más cómodo. Al salir del mercado, miró el reloj y vio que eran las nueve y cuarenta. Caminó hacia su casa pensando en preparar jugo con las naranjas y ensalada con las verduras que compró. Se alegró porque compró todo en una sola vuelta y porque encontró productos frescos.`,
  questions: [
    { q: "¿Qué día fue Sergio al mercado?", options: ["Martes", "Jueves", "Viernes", "Sábado"], correct: 2 },
    { q: "¿A qué hora llegó Sergio al mercado?", options: ["8:05", "9:05", "10:05", "11:05"], correct: 1 },
    { q: "¿Cuántos mangos escogió Sergio?", options: ["Dos", "Tres", "Cuatro", "Cinco"], correct: 2 },
    { q: "¿Qué hierba compró Sergio?", options: ["Albahaca", "Cilantro", "Romero", "Tomillo"], correct: 1 },
    { q: "¿Qué hora vio Sergio al salir del mercado?", options: ["9:20", "9:30", "9:40", "9:50"], correct: 2 }
  ]
},

{
  id: "c31",
  title: "El entrenamiento de fútbol",
  text:
`El martes en la tarde, un equipo juvenil tuvo entrenamiento de fútbol en una cancha del barrio. El entrenador llegó primero y colocó conos naranjas para marcar un circuito. Revisó que el terreno estuviera en buenas condiciones y que no hubiera piedras cerca del arco. A las cinco, los jugadores comenzaron a llegar con sus uniformes y botellas de agua. El entrenador reunió al grupo y explicó que harían calentamiento, ejercicios de pase y un partido corto. También recordó que debían escuchar instrucciones y respetar los turnos. Algunos jugadores se ajustaron las canilleras y otros amarraron bien los cordones para evitar caídas.

El calentamiento incluyó trote suave alrededor de la cancha y estiramientos. Después, los jugadores formaron parejas para practicar pases cortos. El entrenador corregía la postura y pedía que usaran el interior del pie para controlar mejor el balón. Luego pasaron al circuito con conos: debían correr en zigzag y al final dar un pase preciso a un compañero. Algunos jugadores fallaban al principio, pero el entrenador les pidió calma y repetición. Les explicó que el objetivo era mejorar la precisión y el control, no solo correr rápido. Varios intentaron de nuevo y lograron pasar el balón sin que se desviara.

A mitad del entrenamiento, el entrenador dijo que era momento de hidratarse y dio tres minutos para tomar agua. Los jugadores se acercaron a sus botellas, bebieron y respiraron profundo. Al final, organizaron un partido corto. El entrenador dividió a los jugadores en dos equipos y puso la regla de máximo dos toques antes de pasar el balón. El partido fue intenso, con varios intentos de gol. Cuando terminó el tiempo, el entrenador reunió al grupo, felicitó el esfuerzo y recordó el próximo entrenamiento. Los jugadores guardaron los conos, recogieron la basura y se despidieron. Salieron cansados, pero contentos por haber practicado con disciplina.`,
  questions: [
    { q: "¿Qué día fue el entrenamiento de fútbol?", options: ["Lunes", "Martes", "Jueves", "Sábado"], correct: 1 },
    { q: "¿A qué hora comenzaron a llegar los jugadores, según el texto?", options: ["4:00", "5:00", "6:00", "7:00"], correct: 1 },
    { q: "¿De qué color eran los conos que colocó el entrenador?", options: ["Azules", "Naranjas", "Verdes", "Negros"], correct: 1 },
    { q: "¿Cuánto tiempo dio el entrenador para hidratarse?", options: ["Dos minutos", "Tres minutos", "Cinco minutos", "Diez minutos"], correct: 1 },
    { q: "¿Qué regla puso el entrenador en el partido corto?", options: ["Solo un toque", "Máximo dos toques antes de pasar", "Sin pases", "Solo tiros al arco"], correct: 1 }
  ]
},

{
  id: "c32",
  title: "La pérdida del celular",
  text:
`El jueves en la noche, Andrés se dio cuenta de que no encontraba su celular. Eran las nueve y diez y él estaba en la sala de su casa. Primero revisó el sofá, levantó los cojines y miró entre las cobijas. Luego buscó en la mesa del comedor y en la cocina, pero no estaba. Andrés recordó que había usado el celular por última vez cuando revisó un mensaje. Para estar seguro, trató de llamarlo desde un teléfono fijo, pero no escuchó el sonido en la casa. En ese momento pensó que tal vez el teléfono estaba en silencio o con el volumen muy bajo.

Entonces decidió revisar su cuarto y el baño con calma. En el cuarto, miró en el escritorio, en la cama y dentro de una mochila. También revisó debajo de la cama, por si el celular se había caído. Tampoco lo encontró. En el baño, revisó cerca del lavamanos y en una repisa. Andrés empezó a pensar que tal vez lo había dejado en el carro. Se puso una chaqueta, bajó al parqueadero y revisó el asiento del conductor y la guantera. No estaba. Volvió a subir y decidió ordenar la sala para buscar mejor. Puso algunos objetos en su lugar, movió una mesa pequeña y revisó detrás del televisor.

Mientras movía una silla, vio que el celular estaba en el suelo, entre la silla y la pared. Andrés lo tomó y vio que estaba en silencio. Eso explicaba por qué no había escuchado el timbre cuando trató de llamarlo. Andrés suspiró aliviado. Miró el reloj y vio que eran las nueve y veinticinco. Decidió activar el sonido del teléfono y dejarlo siempre en el mismo lugar cuando llegara a casa. Luego se sentó en el sofá y respondió el mensaje que había recibido.`,
  questions: [
    { q: "¿Qué día en la noche se dio cuenta Andrés de que no encontraba el celular?", options: ["Martes", "Miércoles", "Jueves", "Sábado"], correct: 2 },
    { q: "¿A qué hora estaba Andrés en la sala cuando empezó a buscar?", options: ["8:10", "9:10", "10:10", "11:10"], correct: 1 },
    { q: "¿Qué hizo Andrés para intentar ubicar el celular al inicio?", options: ["Lo apagó", "Trató de llamarlo", "Compró otro", "Salió a caminar"], correct: 1 },
    { q: "¿Dónde encontró el celular finalmente?", options: ["En la cocina", "En el carro", "En el suelo entre una silla y la pared", "En el baño"], correct: 2 },
    { q: "¿Qué hora vio Andrés cuando lo encontró?", options: ["9:15", "9:20", "9:25", "9:30"], correct: 2 }
  ]
},

{
  id: "c33",
  title: "La feria del colegio",
  text:
`En el colegio se realizó una feria académica el viernes. Desde temprano, los estudiantes decoraron los stands con carteles y colores, y algunos pegaron hojas con dibujos para llamar la atención. A las ocho y treinta, los visitantes comenzaron a entrar al patio principal. En la entrada, un docente entregaba un programa con el orden de las presentaciones y explicaba por dónde debían caminar. Sofía estaba en el stand de ciencias, donde su grupo presentaba un experimento sencillo con agua y colorante. En la mesa tenían vasos, una cucharita y papel absorbente. El cartel del stand decía “Capilaridad” en letras grandes. Sofía repasó mentalmente qué iba a decir, porque quería explicar claro y sin confundirse.

Cuando llegaron los primeros visitantes, Sofía explicó que el papel absorbente podía transportar el agua de un vaso a otro. Mostró cómo el papel se humedecía y cómo el color avanzaba poco a poco. Un compañero anotaba preguntas en una hoja para responderlas después, y otro acomodaba los vasos para que el experimento se viera mejor. Cerca del stand de ciencias, había un stand de matemáticas con rompecabezas y otro de historia con fotografías. Los visitantes caminaban por el patio y escuchaban las explicaciones. A las nueve y quince, un profesor anunció por micrófono que comenzaría una ronda de presentaciones en la tarima. Varias personas se acercaron a escuchar y luego volvieron a recorrer los stands.

Después de presentar el experimento varias veces, Sofía tomó agua y revisó el programa para ver cuánto faltaba. Al final, el docente felicitó a los estudiantes y dijo que la feria ayudaba a aprender explicando a otros. Sofía guardó los materiales, limpió la mesa y se sintió orgullosa porque pudo explicar con claridad lo que hicieron.`,
  questions: [
    { q: "¿Qué día se realizó la feria académica?", options: ["Jueves", "Viernes", "Sábado", "Domingo"], correct: 1 },
    { q: "¿A qué hora comenzaron a entrar los visitantes al patio principal?", options: ["8:00", "8:30", "9:00", "9:30"], correct: 1 },
    { q: "¿Qué palabra decía el cartel del stand de ciencias?", options: ["Energía", "Capilaridad", "Gravedad", "Fuerza"], correct: 1 },
    { q: "¿Qué entregaba un docente en la entrada?", options: ["Un balón", "Un programa", "Un cuaderno", "Un mapa"], correct: 1 },
    { q: "¿A qué hora anunció el profesor por micrófono la ronda de presentaciones?", options: ["9:05", "9:15", "9:25", "9:35"], correct: 1 }
  ]
},






];
