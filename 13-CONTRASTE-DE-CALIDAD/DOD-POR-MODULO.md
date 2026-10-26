# Criterios de terminado por módulo — el DoD mínimo, con checks positivos y negativos

> **Qué es:** qué significa «terminado» para cada pieza del proyecto, escrito con el
> marco del dueño: **toda definición de terminado tiene comprobaciones positivas (lo
> que debe existir) Y negativas (lo que NO debe existir)** — los positivos se pueden
> cumplir con el mínimo; los negativos solo si alguien mira de verdad. Aplica a los
> 17 módulos funcionales del backend declarado y a las clases de artefacto de este
> repo. No duplica `KPIS-Y-DOD.md` (que define terminado **por pantalla**): esto es
> terminado **por módulo y por artefacto**.

## 1 · Base común — todo módulo funcional (los 17 del menú) antes de llamarse «especificado»

- **Positivos:** sus siete secciones escritas (qué es / qué no es, esqueleto,
  relación con otros, capa de datos con lecturas y escrituras, pantallas que lo
  exponen, funciones, bitácora) · cada función con sus diez campos, en particular
  GUARDA (número o prueba nombrada antes del código) y PAR FRONTAL (qué ve la
  persona) · casa citada en cada función (ley, contrato o decisión) · etiqueta de
  flujo (FL-xx) por función · para cada función al menos su caso feliz y sus dos
  casos borde escritos como prueba · sus operaciones del enchufe mapeadas en el
  índice de acople.
- **Negativos:** ninguna función sin guarda · ningún supuesto silencioso (todo
  `[SUPUESTO]` con su pregunta al dueño) · ninguna contradicción con su casa sin
  escalar · ninguna función huérfana (sin pantalla ni declaración de por qué no la
  tiene) · ninguna capa de datos sin invariantes de escritura.
- **Por qué:** solo 1 de 17 hojas está escrita hoy; sin esta base, el backend real
  decidirá caso por caso y el enchufe se improvisa.

## 2 · Terminado por clase de artefacto (las piezas que sostienen a los 17)

- **Módulo de lógica viva (motor):** API pública documentada · toda función con
  prueba de unidad **y** prueba de ruptura diseñada para fallar contra su defecto ·
  validación en el motor aunque la pantalla la olvide · estado con versión y
  migración por reconciliación · cero literales clínicos · fila del registro al día
  con sello. *Negativos:* cero mutaciones directas desde pantallas · cero errores
  silenciosos (todo rechazo con mensaje humano).
- **Catálogo firmable:** fuera del código · generador · espejo idempotente · estado
  de firma con firmante y fecha · versión sellada · comprobación que prohíbe
  literales clínicos en pantallas. *Negativo:* ningún umbral vivo en el motor.
- **Módulo de mensajes:** examen de inocuidad en editar/crear/entregar · dedupe con
  clave probado · plantilla con disparo no vacío y motivo general · cero cifras y
  cero nombres de enfermedad hacia la paciente. *Negativos:* cero mensajes entregados
  sin examen · cero plantillas sin disparo.
- **Mejora del repo (libro de honestidad):** pasa de pendiente a hecha solo con
  comando y conteo en su sección · si agrega guardia, tiene su prueba de fuego.
  *Negativo:* nada marcado «hecha» sin salida.
- **Decisión del dueño:** consecuencia escrita · opción por defecto declarada ·
  árbol de decisiones derivadas · plazo o disparador. *Negativo:* ninguna decisión
  silenciada ni esperada sin default.
- **Iteración del agente:** los doce puntos del autocheck antes de cada entrega,
  incluida la traducción al lenguaje del dueño. *Negativo:* nada declarado sin
  salida de comando.
- **Prueba (suite):** carga el código desde disco · dependencias declaradas · puede
  fallar contra el defecto que busca (si nunca falló, no prueba nada) · imprime
  conteos. *Negativo:* cero pruebas con copia embebida del código.
- **Paquete de firmas:** se abre solo con 18/18 pantallas en verificado o mejor +
  verificación completa en verde + veredicto humano doble por rol con acta.
  *Negativo:* ninguna firma sin sesión del oficio.

## 3 · Terminado por módulo funcional — lo específico de cada uno (además de la base)

- **IDENTIDAD:** alta de emergencia en tres campos y menos de un minuto, con tiempo
  medido en el guion · homónimas con decisión humana registrada, nunca fusión
  automática · cinta de identidad en el cien por ciento de las escrituras.
  *Por qué:* identidad equivocada contamina todo lo demás.
- **TABLERO:** cero estados escritos a mano (todo derivado de hechos) · desempeño
  declarado con 18 pacientes · dueño visible por tarjeta. *Por qué:* primera
  pantalla del producto; ahí se demuestra o se cae la derivación.
- **URGENCIA:** registro de emergencia con tiempo medido · la urgencia nunca se
  cierra sin salida firmada · referida no es atendida. *Por qué:* aquí el retraso
  daña; su criterio es de tiempo, no de estructura.
- **ATENCIONES:** cero campos perdidos en diez alternancias de pausa y retorno ·
  «en uso de» visible · cambio de paciente solo desde el tablero. *Por qué:* aquí se
  pisa el trabajo entre manos.
- **ALERTAS:** cero avisos sin acción ni conducta (qué hacer, quién, para cuándo,
  cómo se cierra — contrato del documento 21) · ciclo completo con prueba por
  transición · métricas de fatiga **con objetivo numérico acordado** (RQ-J).
  *Por qué:* un sistema de alertas sin fatiga medida se apaga en la práctica.
- **CONTROLES:** exactamente diez campos y nueve banderas (el número es la norma) ·
  guardar nunca bloquea y es atómico · autoguardado que sobrevive a recarga.
  *Por qué:* acto repetido veinte veces al día; cada fricción se multiplica.
- **PROTOCOLOS:** vencidos con dueño y reloj · varios protocolos por paciente sin
  pisarse · el embarazo como protocolo más. *Por qué:* el seguimiento que depende de
  la memoria se pierde.
- **LABORATORIO-Y-ESTADO:** semáforo solo con catálogo firmado (sin catálogo, gris)
  · escrito tardío honesto · curvas que se cortan donde no hay datos · referencia
  citada por analito. *Por qué:* un semáforo sin firma es una opinión con autoridad
  pintada.
- **CALCULADORES:** las dieciocho exactas, cada una con su casa citada (fórmula,
  guía o norma) · relleno con origen registrado · el cálculo corre en el segundo en
  que sus datos existen · resultado en lenguaje de la persona. *Por qué:* un
  cálculo erróneo es daño directo.
- **HISTORIA-Y-NOTAS:** notas inmutables con autor y cédula · editar crea versión
  nueva · la norma NOM-004 como asistente dentro de la nota · interconsultas con
  vencimiento y dueño. *Por qué:* la nota es el documento legal de la consulta.
- **DOCUMENTOS:** las 22 funciones de su especificación con su guarda · cero
  captura doble · aviso de privacidad una vez por expediente · compartir sin
  identidad con sus dos rótulos de salida. *Por qué:* es el único módulo ya
  especificado; su terminado es el ejemplo que copian los otros 16.
- **ULTRASONIDO:** importación que conserva parámetros nuevos sin perder previos ·
  una sola copia de imágenes · ingestación con simulacro · consentimiento de imagen.
  *Por qué:* aquí es más fácil duplicar y corromper archivos pesados.
- **AGENDA:** integración completa del sistema de mensajes · recordatorio sin cifras
  ni diagnósticos (frontera en tres puntos) · dedupe con clave · «no llegó» que
  reagenda con vínculo a la cita real. *Por qué:* continuidad del cuidado y frontera
  legal con la paciente.
- **ACCESO:** los cuatro roles con su matriz sembrada y probada · acceso con espera
  persistente · recuperación sin red. *Por qué:* sin acceso no hay privacidad real;
  hoy ni siquiera existe la pantalla.
- **CIERRE-Y-DEGRADACION:** los seis guiones en humano · traspaso imprimible con
  referidas separadas · respaldo con simulacro ensayado y registrado. *Por qué:* en
  un consultorio con cortes de luz, el día se pierde o no en este módulo; su
  terminado es de ensayo real.
- **BUSQUEDA-Y-MOVIMIENTO:** doce filtros · import con simulacro antes de tocar la
  base · export con identidad para respaldo con sus dos rótulos. *Por qué:*
  migrar sin simulacro es la forma más rápida de perder un expediente entero.
- **OPERACION:** instalar copiando la carpeta · actualizar sin dañar datos con
  simulacro · versión visible · **aplica también al propio repo de diseño**: un
  paquete que arranca en limpio. *Por qué:* el usuario real no tiene técnico.

## 4 · Meta-definición de terminado (cómo se evita que esto sea papel)

1. Toda fila de arriba con comprobación escrita como comando o como acta binaria.
2. Ninguna comprobación solo subjetiva («se ve bien») sin su contraparte objetiva.
3. Revisión mensual por muestreo: se toma al azar un módulo declarado terminado y se
   corren sus comprobaciones — si alguna ya no corre, el módulo vuelve a abierto.
