# FUENTE DE VERDAD DEL BACKEND — el menú a la carta de todo lo que hay que construir

> **Qué es:** el lugar único donde, módulo por módulo, están declaradas las funciones del
> software —qué hacen, por qué existen, cómo se implementan explicado en lenguaje humano,
> y cómo se ven en la interfaz para que la persona entienda qué pasó— escrito para que lo
> lean igual de bien un humano y un agente de IA: el agente de construcción entra aquí y
> replica el software sin adivinar. Fecha de creación: 2026-10-24 · carpeta
> `06-FUENTE-BACKEND/`.
>
> **Qué NO es:** no es ley y no crea reglas nuevas. Es la **traducción construible** de lo
> ya decidido —ley, contratos, decisiones de diseño, auditoría de código, dibujos—. Si esta
> fuente y alguna de sus casas originales chocan, **gana la casa** (regla de casa canónica).
> Su puesto en la cadena de verdad: después de los contratos y los dibujos, **antes del
> código** — la última parada antes de construir.
>
> **Para quién:** (1) para usted: en un solo lugar, todo lo que se va a mandar construir,
> con su porqué y su pantalla; (2) para el agente constructor: su entrada a la obra — lee
> el módulo, sus casas citadas y su dibujo, y escribe el código con su prueba; (3) para el
> agente de interfaz: el **PAR FRONTAL** de cada función le dice exactamente qué debe
> mostrar la pantalla para que la UX explique el trabajo del backend.

## Cómo usarla

- **Usted, en 2 minutos:** abre EL MENÚ (más abajo), elige un módulo, abre su
  `MOD-<módulo>.md`, y por cada función lee QUÉ · POR QUÉ · PAR FRONTAL — y comprueba que
  el dibujo muestre lo que la función promete.
- **El agente constructor, en cada fila:** regla dura — **no inventa**. Toda función trae
  su CASA (de dónde sale la regla) y su GUARDA (cómo se prueba). Si algo no está declarado,
  se detiene y pregunta; no decide en el silencio.
- **El agente de interfaz:** todo dibujo nuevo se contrasta contra los PAR FRONTAL de su
  módulo: si la función promete un mensaje y el dibujo no lo muestra, falta dibujo.
- **Los requerimientos de interacción** — `REQ-FLUJO.md` (FL-01…FL-17): cada paso del
  flujo declarado de enfermera y médica traducido a interfaz ↔ función ↔ módulo y a su
  estructura de código — es el puente entre este menú y el día real, y marca el orden en
  que conviene escribir los módulos que faltan.
- **La costura con el frontend** — `COMUNICACION.md`: la estructura del backend, el puente
  con sus dos implementaciones (maqueta del papel usable / puente real del futuro), el
  catálogo de operaciones de la espina con su formato de ocho campos, y los pedidos contra
  los eventos. Toda pantalla llama solo a ese enchufe.

## El formato de cada función (diez campos fijos)

1. **QUÉ** — qué hace, en una frase de consultorio.
2. **POR QUÉ** — la necesidad real, el principio o el hallazgo que la originó, y qué se
   descartó si aplica.
3. **CÓMO (implementación en humano)** — los pasos concretos en lenguaje llano: qué entra,
   qué reglas aplican, qué decisiones toma, qué devuelve y **qué NO hace**. Tan completo
   que un agente pueda replicarlo sin ver este archivo otra vez.
4. **RELACIONES** — con quién se enlaza: qué otras funciones de su módulo la invocan o a
   cuáles llama ella, y de qué otros módulos recibe o a cuáles entrega. Una función sin
   lugar en el mapa es una función suelta.
5. **DATOS** — su contrato con la base: **qué lee** y **qué escribe**, con el nombre del
   archivo o registro de `DATOS/` (aquí «base de datos» = árbol de archivos JSON del
   expediente, su DEC-01: el sistema de archivos es la base de datos).
6. **PAR FRONTAL** — la pantalla que la explica: qué acciona la persona, qué responde la
   interfaz y en qué momento, qué mensaje humano ve (nunca un error técnico) y qué pasa si
   falla.
7. **GUARDA** — el número o la prueba que demuestra que funciona (la prueba se nombra
   antes que el código: spec-first).
8. **CASA** — de dónde sale: ley `R-xx`, contrato, decisión de `REQUISITOS-DEL-DISENO.md`,
   dibujo, auditoría de código.
9. **ESTADO** — `DECIDIDO` · `FALTA DIBUJO` · `ESPERA VEREDICTO` · `CANDIDATO` (todavía
   sin casa) · `[SUPUESTO n]` (espera la frase del dueño).
10. **Notas** — casos borde, deuda conocida, vínculos.

## El formato de cada hoja de módulo (siete secciones fijas)

Antes de listar funciones, toda hoja `MOD-<módulo>.md` define a su módulo:

1. **QUÉ ES ESTE MÓDULO** — definición en humano, su frontera (qué incluye y **qué NO es**)
   y por qué todas sus partes viven bajo un mismo techo.
2. **ESQUELETO** — de dónde salen sus funciones (el acto o actos que se descomponen), el
   orden de ejecución y quién invoca a quién, en texto.
3. **RELACIÓN CON OTROS MÓDULOS** — qué recibe, qué entrega y de quién, módulo por
   módulo — y qué módulos **no** toca.
4. **CAPA DE DATOS** — el mapa completo de lecturas y escrituras: qué archivos de `DATOS/`
   usa, con sus invariantes de almacenamiento (atómico, un solo escritor, original
   intacto…).
5. **PANTALLAS QUE LO EXponEN** — el mapa inverso: cada dibujo, qué funciones muestra y
   cuáles le faltan.
6. **FUNCIONES** — con sus diez campos de la sección anterior.
7. **BITÁCORA de la hoja** — qué cambió y cuándo.

## Las reglas de la familia (ocho)

1. **No crea reglas: las cita.** Toda declaración lleva su CASA; si esta fuente y la casa
   chocan, gana la casa (y si la casa es la ley, no se toca: se escala con matriz).
2. **Toda función con guarda** — sin número o prueba no entra a la construcción (principio
   P7: ninguna promesa sin guarda).
3. **Toda función con par frontal** — una función sin cara para la persona es una función
   que nadie sabrá que existe; si no tiene pantalla, lo declara con su porqué.
4. **Lo no decidido va etiquetado** — `[SUPUESTO n]` espera el dueño; nada supuesto se
   construye.
5. **Un solo archivo por módulo** — una casa por concepto; este menú solo apunta.
6. **Portada por ritual** — cuando una función junte doble veredicto y se porta a su casa
   (ley o contrato), su ESTADO queda `PORTADO` con fecha; de ahí en adelante manda la casa.
7. **Estado y secuencia no se duplican** — esta fuente declara **qué** hay que construir;
   **cuándo y en qué orden** (y las decisiones cerradas en cada conversación) lo lleva la
   bitácora `CONSTRUCCION.md`, de la raíz: dos oficios distintos, ningún contenido en
   común.
8. **Sin las siete secciones de la hoja, el módulo no está declarado** — definir el módulo
   antes que sus funciones (qué es, qué no es), su esqueleto antes que sus detalles, y su
   capa de datos siempre: una especificación sin lecturas ni escrituras no es construible,
   es una lista de deseos.

## EL MENÚ — todos los módulos (estado: 2026-10-24 · escritos: 1 de 17)

Ordenado por el sostén de la obra: primero lo que sostiene a todo, después lo clínico,
después los papeles, al final operación.

1. **IDENTIDAD** — *por escribir* — alta en dos pasos, homónimas, ficha, los cinco datos de
   la visita, registro de emergencia · casas: R-01/R-02/R-03/R-10, contrato
   IDENTIDAD-CONTEXTO · dibujos: REGISTRO, PARECIDAS, FICHA, EMERGENCIA · fase I.
2. **TABLERO** — *por escribir* — estados que se mueven solos desde los hechos, relojes de
   espera, buscador, urgente al frente, dueño por tarjeta · casas: R-01, contrato TABLERO
   (con el reparo pendiente H-048), pilar 1 con su enmienda O1/O2/O10 · dibujo: TABLERO ·
   fase II.
3. **URGENCIA** — *por escribir* — quien llega sin expediente se registra en menos de un
   minuto, la urgencia salta al frente en el mismo segundo y no se cierra sin resolverse ·
   casas: pilar 5, contrato URGENCIA · dibujos: EMERGENCIA, ALERTAS · fase II.
4. **ATENCIONES** — *por escribir* — pausa con retorno exacto, «en uso de X», cambio de
   paciente solo desde el tablero · casas: pilar 2, contrato ATENCIONES-CONCURRENTES ·
   dibujo: PAUSA · fase III.
5. **ALERTAS** — *por escribir* — seis tipos de aviso con acción y dueño, entrega sin robar
   pantalla a nadie, fatiga medida · casas: R-14/R-15/R-37/R-38, contrato ALERTAS ·
   dibujo: ALERTAS · fase III.
6. **CONTROLES** — *por escribir* — la estación de tres minutos: 10 campos, 9 banderas,
   guardar nunca bloquea, alertas después de que el control quedó escrito · casas: R-14,
   R-15 · dibujo: CONTROL · fase II.
7. **PROTOCOLOS** — *por escribir* — calendarios por diagnóstico, varios por paciente,
   vencidos con dueño, el embarazo como uno más · casas: R-04/R-35/R-40, contrato
   PROTOCOLOS · dibujos: PROTOCOLOS, EMBARAZO, PARTO · fase IV.
8. **LABORATORIO-Y-ESTADO** — *por escribir* — captura del papel en treinta segundos,
   semáforo por analito con rangos firmados, curvas que se cortan donde no hay datos ·
   casas: R-38/R-33 · dibujos: LABORATORIO, ESTADO, GRAFICOS · fase III.
9. **CALCULADORES** — *por escribir* — los 18 cálculos con prefill e interpretación, que
   corren en el segundo en que sus datos existen · casas: R-19/R-43 · dibujo: CALCULADORES.
10. **HISTORIA-Y-NOTAS** — *por escribir* — NOM-004 como asistente dentro de la nota, notas
    firmadas e inmutables con autor, interconsultas y pendientes con vencimiento · casas:
    R-17/R-18/R-36/R-41 · dibujos: HISTORIA, NOM004, PENDIENTES.
11. **DOCUMENTOS** — **ESCRITO HOY** → `MOD-DOCUMENTOS.md` — plantillas del médico,
    generación del documento del día, consentimientos sellados, aviso de privacidad,
    adjuntos con custodia, y compartir sin identidad · casas: R-05…R-09, R-23 · dibujos:
    DOCUMENTOS (réplica C-05) · el export espera hogar: IMPORTAR [SUPUESTO 12].
12. **ULTRASONIDO** — *por escribir* — estudios importables sin perder parámetros nuevos,
    imágenes con una sola copia, ingestación por USB y por red, consentimiento de imagen ·
    casas: R-30/R-31/R-32 · dibujos: ULTRASONIDO, INGESTA.
13. **AGENDA** — *por escribir* — citas, recordatorios de continuidad, el «no llegó» que
    reagenda, la admisión por teléfono con la misma verdad · casas: R-48/R-45 · dibujos:
    AGENDA, ADMISION.
14. **ACCESO** — *por escribir* — PIN con espera persistente, recuperación sin red,
    los cuatro roles con su matriz sembrada · casas: R-13/R-26/R-49/R-51 · dibujos:
    ACCESO, SISTEMA.
15. **CIERRE-Y-DEGRADACION** — *por escribir* — los seis guiones de falla en humano, el
    puente de papel, el traspaso imprimible, el respaldo con simulacro · casas: R-12,
    contrato DEGRADACION, optimización O5 · dibujos: FALLA, CIERRE, RESPALDO.
16. **BUSQUEDA-Y-MOVIMIENTO** — *por escribir* — buscador con 12 filtros, import con
    simulacro antes de tocar la base, export con identidad para respaldo · casas: R-01,
    R-24 (ojo: `INDEX.md` apunta hoy a R-23, que es el export anónimo — corrección
    pendiente de registrar) · dibujo: IMPORTAR.
17. **OPERACION** — *por escribir, sin dibujo propio* — instalar copiando la carpeta,
    actualizar sin dañar datos, versión visible · casa: R-28 · se representa dentro de
    SISTEMA cuando entre a la entrevista.

**Fuera de este menú, declarados:** dictado por voz — `APARCADO` hasta su gatillo (R-25) ·
fuera de alcance inviolable — certificación, nube, prescripción automática, diagnóstico
automatizado, IA diagnóstica, app móvil nativa (inventario de la ley).

## Cómo se completa esta fuente

- **Un módulo por entrega**, en el orden de las fases de implementación (I identidad →
  II día visible → III día trabajable → IV seguimiento → resto por bloques) y con la
  entrevista del equipo delante: lo que el equipo diga corrige la función el mismo día.
- Al escribir un módulo, en el **mismo turno** se anota su archivo y se marca el menú de
  arriba (un solo movimiento, dos caras de un mismo dato).
- Al cerrar bloque: las casas que hayan cambiado refrescan su huella en el checkpoint, y
  esta fuente queda citada entre las piezas del paquete-verdad
  (`IMPLEMENTACION-DESDE-LA-VERDAD.md`, componente 5: trazabilidad).
- Esta carpeta es espejo portátil: al portarse lo estabilizado a la maestra, esta familia
  viaja con él (regla 5 del LEEME) para que el refresco no la borre.
