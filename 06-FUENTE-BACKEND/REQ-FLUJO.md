# REQ-FLUJO — requerimientos de interacción: del paso del día a la estructura de código

> **Qué es:** diecisiete requerimientos **FL-01…FL-17** tomados del flujo declarado —la
> mañana de la enfermera y la consulta de la médica de las capas D–F de
> `02-LOGICA-DE-DISENO/FLUJOS-TRABAJO.md`, con sus ocho cortes y sus optimizaciones
> O1–O10—. Cada uno traduce un **paso del día** a la cadena **interfaz ↔ función ↔
> módulo** y a su **estructura en código**, para que los módulos, funciones e interfaces
> no se describan sueltos sino **accionándose juntos**, y para que al construir se sepa
> cómo debe quedar cada cosa de código. Fecha: 2026-10-24 · familia
> `06-FUENTE-BACKEND/`.
>
> **Qué no es:** no crea reglas clínicas ni decide diseño — cita casas (flujo, ley,
> contratos, doctrina). Si un FL choca con su casa, manda la casa.

## El formato de cada requerimiento FL (siete campos)

1. **PASO** — el momento del día, con su minuto y su flujo de origen.
2. **QUÉ EXIGE** — el requerimiento en una frase construible.
3. **CADENA** — en orden: qué **interfaces** (dibujos) participan, qué **funciones** de
   qué **módulos** (del menú de `FUENTE-DE-VERDAD.md`) se accionan y con qué dato pasan
   de una a otra.
4. **ESTRUCTURA EN CÓMIGO** — cómo debe quedar: qué es **presentación**, qué es
   **dominio** (reglas puras), qué se **persiste**, qué es **vista derivada** (fold de
   hechos con prueba de igualdad) y qué **evento** lo mueve — en la dirección de
   dependencias que ya decretó `IMPLEMENTACION-DESDE-LA-VERDAD.md`: presentación →
   dominio → persistencia, jamás al revés.
5. **GUARDA** — el número o prueba que lo verifica (o su candidatura).
6. **CASA** — flujo (capa/paso), ley `R-xx`, contrato, optimización `On`.
7. **ESTADO** — `DECIDIDO` · `FALTA DIBUJO` · `ESPERA VEREDICTO` · `[SUPUESTO n]`.

## El orden en que conviene escribir los módulos (lo que este archivo descubre)

Los FL ordenan la obra: **IDENTIDAD y TABLERO** primero (FL-01/03/04 los piden desde el
minuto 0) · **CONTROLES + ATENCIONES** después (FL-05/06, el carril) · **URGENCIA y
ALERTAS** (FL-08/13, mueven el día) · **LABORATORIO** (FL-07) · **PROTOCOLOS/PARTO**
(FL-11/12) · **CIERRE** (FL-15) · y **DOCUMENTOS** ya está escrito (FL-17 lo usa). El
orden de fases del mapa (I→IV) y este coinciden salvo en un punto: el flujo exige
CONTROLES antes que la fase II lo declara — decisión que queda anotada para su mapa.

---

## La mañana de la enfermera

### FL-01 · Abrir y ver el día (9:50)

- **PASO:** 9:50 abrir — capa D, mañana de la enfermera.
- **QUÉ EXIGE:** el software abre **solo en el tablero de hoy**, con el estado heredado
  de ayer, sin que nadie navegue: encender es ver el día.
- **CADENA:** interfaz `TABLERO.html` (pantalla de arranque) ← función *arrancar-día* del
  módulo **TABLERO** ← lee eventos y agenda heredados (**AGENDA**) y los entrega ya
  ordenados. En la cabecera, los **tres botones de acción** (registrar llegada · paciente
  nueva · urgencia) y los **chips del resumen**; el orden dentro del día **lo pone el
  equipo** (decisión B6), nunca el software.
- **ESTRUCTURA EN CÓMIGO:** arranque = presentación que pinta una **vista derivada**;
  el tablero es `fold(hechos del día)` con prueba de igualdad; cero estado guardado en la
  interfaz; la presentación no calcula: solo pinta lo que el dominio devuelve.
- **GUARDA:** pilar 1 (18 pacientes pintados <0,5 s; ninguna tarjeta sin estado ni hora)
  + ratchet candidato «inicio = tablero» (`IMPLEMENTACION…` §30).
- **CASA:** FLUJOS capa D · pilar 1 · R-01.
- **ESTADO:** DECIDIDO · dibujo TABLERO con estados incompletos (ver H-060).

### FL-02 · Las llamadas antes de encender

- **PASO:** antes de 9:50 — la conversación del teléfono sucede **antes** de prender (el
  error que la capa D corrigió).
- **QUÉ EXIGE:** el software **prepara** los recordatorios de mañana; el aviso telefónico
  es humano — nada se envía solo (offline-first).
- **CADENA:** **AGENDA** genera la lista «a quién llamar y qué decirle» (recordatorio
  listo para copiar) → la persona llama → el resultado de la llamada (vino / no vino) se
  refleja en agenda antes de encender.
- **ESTRUCTURA EN CÓMIGO:** recordatorios = vista derivada de la agenda (fold), salida a
  pantalla o impresión; **cero red** (P1) — cualquier envío automático fuera de alcance.
- **GUARDA:** R-48 (agenda y recordatorios) · prueba: la lista de llamadas del día existe
  sin que nadie la escriba a mano.
- **CASA:** FLUJOS capa D («llamadas → agenda → encender») · R-48 · DEC-32/33/34.
- **ESTADO:** DECIDIDO · FALTA DIBUJO de la lista de llamadas en `AGENDA.html`.

### FL-03 · La puerta: llegó con cita, o llegó sin cita

- **PASO:** 10:00 la puerta — «buenos días, ¿con cita?».
- **QUÉ EXIGE:** si estaba en agenda, un gesto cambia su tarjeta a **llegó**; si vino sin
  cita, registro rápido en la puerta con sus cuatro datos de la libreta (nombre,
  nacimiento, ciudad, teléfono) —encadenado si son varias, «¿siguiente?»— en menos de un
  minuto — y en ambos casos la tarjeta nace en
  el tablero con su reloj **desde la hora real de llegada**.
- **CADENA:** interfaz `TABLERO.html` (acción *registrar llegada*) o `REGISTRO.html`
  (sin cita) → función *registrar-llegada* / *registro-rápido* de **IDENTIDAD** (alta
  mínima) → **evento `llegada`** → **TABLERO** reordena la tarjeta y arranca su reloj.
- **ESTRUCTURA EN CÓMIGO:** la llegada es un **evento persistido en el canal único**
  (idempotente: repetir no duplica); la tarjeta es `fold(eventos)` — el estado **nunca** lo
  pone un clic de buena voluntad; el reloj de espera nace de `hora_llegada`, no de la cita
  (decisión B3).
- **GUARDA:** R-01 (paciente en contexto ≤3 clics) · R-02 (alta nunca duplica) · pilar 8
  (registrar ≤3 acciones).
- **CASA:** FLUJOS capa D · R-01/R-02 · contrato IDENTIDAD-CONTEXTO · optimización O9.
- **ESTADO:** DECIDIDO · FALTA DIBUJO del «llegó» verificado en REGISTRO (por verificar).

### FL-04 · La cita que pasó y no llegó (11:30)

- **PASO:** 11:15 en punto — quien tenía la 10:15 no apareció.
- **QUÉ EXIGE:** el estado **no llegó** se enciende **solito** al vencer la cita, apaga la
  tarjeta de espera y ofrece reagendar — sin que nadie lo marque.
- **CADENA:** reloj de la cita vencida (**AGENDA**) → regla de eventos → **TABLERO**
  (tarjeta «no llegó» con acción) → la acción abre **AGENDA** (reagendar).
- **ESTRUCTURA EN CÓMIGO:** regla en dominio puro: `cita vencida ∧ sin evento de llegada
  ⇒ estado no_llego` — evaluada por el canal de eventos, no por temporizador de pantalla;
  el estado es derivado, se recalcula, no se guarda dos veces.
- **GUARDA:** enmienda del pilar 1 (0 estados por clic de buena voluntad) — prueba: con
  una cita vencida simulada, el estado aparece sin interacción.
- **CASA:** FLUJOS capa D (el estado que faltaba) · O1/O2 · pilar 1.
- **ESTADO:** DECIDIDO · dibujado en TABLERO («no llegó» ×3) · dueño del estado:
  recepción.

### FL-05 · El carril de constantes (10:10)

- **PASO:** 10:10 — tensiómetro, tres minutos, los diez campos del control (R-14).
- **QUÉ EXIGE:** estación con la cinta de identidad arriba, campos cortos, chips de
  cálculo **al llenar**, botón con el nombre de la paciente dentro; guardar **nunca
  bloquea**; la estación se pausa con su micro-estado *a medias* si la interrumpen.
- **CADENA:** `CONTROL.html` (escritura) con cinta de **IDENTIDAD-CONTEXTO** → al llenar
  campos, **CALCULADORES** corren chips (sin ir a su pantalla) → al guardar,
  **ATENCIONES** registra la pausa si la hay y **ALERTAS** entrega su aviso **después**
  de que el control quedó escrito.
- **ESTRUCTURA EN CÓMIGO:** escritura con clave `(atención, paciente)` en persistencia
  atómica (un solo escritor, cola) · cálculos en **dominio puro** que se disparan con el
  dato (E1) · la entrega de alerta espera el corte natural (T2) · los campos se capturan
  una sola vez (R-14: exactamente 10 campos, 9 banderas).
- **GUARDA:** R-14 (≤5 toques; alerta solo si el control quedó escrito; conteo 10/9) ·
  ratchet «cinta en todo» (IDENTIDAD invariante i).
- **CASA:** FLUJOS capa D · R-14/R-15 · contrato ATENCIONES · pilar 3.
- **ESTADO:** DECIDIDO · `FALTA DIBUJO` del estado *a medias* en el tablero (H-060).

### FL-06 · La interrupción: doble mano (el teléfono, la médica)

- **PASO:** a mitad de cualquier estación — suena el teléfono.
- **QUÉ EXIGE:** la estación o la consulta se **pausa** con retorno exacto —nada de lo
  escrito se pierde—; si otra persona toca lo suyo, ve «en uso de X»; sin tope rígido de
  abiertas.
- **CADENA:** `PAUSA.html` → módulo **ATENCIONES** (pausa/retorno con clave de atención)
  → al retomar, **IDENTIDAD-CONTEXTO** relee los fundamentales vivos del expediente (no
  la copia vieja).
- **ESTRUCTURA EN CÓMIGO:** estado **por atención**, no global · todo llega al **escritor
  único por cola** (decisión 15 de IMPLEMENTACION) · la pausa persiste solo lo no
  guardado; lo guardado se relee («la copia solo guarda lo no guardado»).
- **GUARDA:** pilar 2 (10 alternancias con 4 abiertas ⇒ 100 % de lo escrito) · contrato
  ATENCIONES (doble mano; ya sin tope — verificado retirado).
- **CASA:** FLUJOS capa D · pilar 2 · contrato ATENCIONES-CONCURRENTES.
- **ESTADO:** DECIDIDO · ESPERA VEREDICTO en la entrevista («¿así las interrumpen?»).

### FL-07 · La que llegó con papel: laboratorio (10:40)

- **PASO:** 10:40 — entrega su laboratorio impreso.
- **QUÉ EXIGE:** captura *laboratorio recibido* de tres datos en treinta segundos que
  alimenta el semáforo, con la bandera honesta de «escrito tardío» si el papel llegó
  después.
- **CADENA:** `LABORATORIO.html` (captura: analito, valor, fecha) → escribe en la historia
  del episodio (**HISTORIA** como hogar del dato) → **LABORATORIO-Y-ESTADO** evalúa
  contra el catálogo firmado → semáforo en `ESTADO.html` y, si vence un chequeo,
  chip **ALERTAS** sube al **TABLERO**.
- **ESTRUCTURA EN CÓMIGO:** rangos en **catálogo firmado** (`LAB_RANGOS`, borrador→firma;
  jamás en código) · semáforo = `fold(datos, catálogo)` (DEC-27) · «escrito tardío» =
  diferencia entre fecha de la muestra y hora de captura, marcada en el dato, no
  preguntada después · captura doble prohibida.
- **GUARDA:** R-38 (panel = fold; `sin dato` = gris; 0 umbrales sin firma) · O8.
- **CASA:** FLUJOS capa D (10:40) · R-38 · O8.
- **ESTADO:** DECIDIDO en regla · dibujo `LABORATORIO.html` existe (ESPERA VEREDICTO).

## La urgencia y el equipo

### FL-08 · La urgencia: primero la voz (11:00)

- **PASO:** 11:00 — cefalea + visión borrosa + hinchazón (o la que grita en la puerta).
- **QUÉ EXIGE:** al marcarse, la tarjeta **sube al frente en el mismo segundo** con
  palabra; el aviso llega **a la par** a todos los equipos **sin robar pantalla** a
  nadie; la resolución es **en voz con el equipo**, y en pantalla no se cierra hasta que
  se resuelva (atendida, referida con nota, o cerrada con motivo).
- **CADENA:** `CONTROL.html`/`ALERTAS.html` (bandera o dictamen) → módulo **URGENCIA**
  (evento urgencia) + **ALERTAS** (tipo urgencia, dueño, entrega T1–T4) → **TABLERO**
  (zona urgente al frente) → cierre: acción tipada en `ALERTAS.html`.
- **ESTRUCTURA EN CÓMIGO:** la urgencia es **evento persistido** que reordena la vista
  (la reordenación es `fold`, no posición guardada) · dedupe de la alerta · entrega sin
  modal, al corte de trabajo, en paralelo, con cierre en bitácora (escalera F4) · **el
  grito es del dominio humano: el software ordena, no sustituye la voz** (O4).
- **GUARDA:** pilar 5 (urgente al frente en el mismo segundo) · SISTEMA-DE-ALERTAS §8 ·
  contrato URGENCIA (no se cierra sin resolución).
- **CASA:** FLUJOS flujo 4 + capa D (11:00) · pilar 5 · contratos URGENCIA/ALERTAS · O4.
- **ESTADO:** DECIDIDO · ESPERA VEREDICTO.

### FL-09 · La consulta de la médica (con lo integrado)

- **PASO:** la consulta — el segundo carril, con la paciente enfrente.
- **QUÉ EXIGE:** elige **solo desde el tablero**; su cinta lleva los permanentes
  (alergia, sangre, medicación); los cálculos ya corrieron con lo de la enfermera; al
  guardar, los avisos salen con acción y dueño; la nota cierra la consulta; la agenda
  propone la siguiente cita **desde el protocolo**.
- **CADENA:** `TABLERO.html` (elegir) → `CONSULTA.html` con cinta de
  **IDENTIDAD-CONTEXTO** → datos de **CONTROLES** ya capturados + **CALCULADORES**
  (prefill) → al guardar: **HISTORIA** (nota versión inmutable) + **ALERTAS** (entrega
  T2) → **PROTOCOLOS** propone plazo → **AGENDA** (siguiente cita).
- **ESTRUCTURA EN CÓMIGO:** cambio de paciente **solo desde el tablero** (ratchet: ninguna
  escritura ofrece cambio de paciente) · derivados de la FUM una sola casa (R-04) · la
  nota firmada es inmutable: editar crea versión (R-36) · los cálculos corren con el dato
  (E1), la presentación espera el corte (T2).
- **GUARDA:** pilar 2 (ninguna escritura cambia de paciente) · R-36 · R-19 (prefill) ·
  meta de fatiga (<2 avisos por visita).
- **CASA:** FLUJOS capa D (consulta) · pilar 2 · R-17/R-36/R-19 · contratos
  IDENTIDAD/ALERTAS/PROTOCOLOS.
- **ESTADO:** DECIDIDO · FALTA la verificación de la cinta en HISTORIA (por verificar).

### FL-10 · El equipo se fue a sala (equipo fuera)

- **PASO:** el corte de la médica — la cesárea de las 10:30.
- **QUÉ EXIGE:** un estado del **equipo** que explique la espera en lenguaje de sala: no
  «equipo fuera» como etiqueta, sino **«la médica está en sala de parto»** en la tarjeta.
- **CADENA:** evento de equipo (marcado por quien se va) → **TABLERO** (frase en la zona
  de espera).
- **ESTRUCTURA EN CÓMIGO:** estado del equipo en el canal de eventos (como los
  pacientes: también el equipo tiene estado — O10); la frase sale de un dato (dónde está),
  no de un texto pegado.
- **GUARDA:** candidata — «toda espera larga con el equipo fuera tiene su frase» (número
  nuevo, por escribir en la doctrina).
- **CASA:** FLUJOS capa D (error corregido: «el tablero vigilaba pacientes y olvidó al
  equipo») · O10 · decisión B5.
- **ESTADO:** DECIDIDO el estado (doctrina) · dibujado en TABLERO («equipo fuera») · la
  frase humana: por verificar en el dibujo.

## Los cortes clínicos

### FL-11 · El corte de la cesárea (flujo 2)

- **PASO:** 10:30 — se interrumpe una atención; se registra el parto y se cierra el
  episodio; el tablero libera el cupo.
- **QUÉ EXIGE:** pausa con un clic que conserva **todo** lo de la paciente; parto
  registrado (fecha, vía, bebés, peso) cierra el embarazo; el tablero **se libera solo**,
  visiblemente.
- **CADENA:** `PAUSA.html` (**ATENCIONES**) → `PARTO.html` (**PROTOCOLOS/PARTO** escribe
  el bloque del parto y cierra episodio) → evento de cierre → **TABLERO** libera la tarjeta
  y abre el puerperio como protocolo nuevo.
- **ESTRUCTURA EN CÓMIGO:** el parto es escritura de dominio con caso de uso propio
  (`registrar_parto`: campos obligatorios, vínculo RN) · el cierre del episodio dispara
  eventos (episodio cerrado ⇒ puerperio activo, R-04/R-40) · la pausa nunca toca datos
  guardados.
- **GUARDA:** R-35 (parto con Apgar queda en episodio y línea de tiempo) · pilar 2 ·
  contrato PROTOCOLOS (cierre con motivo).
- **CASA:** FLUJOS flujo 2 · R-35/R-04 · contratos ATENCIONES/PROTOCOLOS.
- **ESTADO:** DECIDIDO · dibujos PARTO/PAUSA existen (ESPERA VEREDICTO).

### FL-12 · Parto en la puerta sin expediente (flujo 3)

- **PASO:** 11:00 — llega en trabajo de parto, sin expediente.
- **QUÉ EXIGE:** registro de emergencia en **menos de un minuto** (tres campos y un
  botón), folio, tarjeta roja al frente; la ficha completa **después**, sobre la misma
  ficha, con «falta completar» y su fecha límite; cero duplicados al completar.
- **CADENA:** `EMERGENCIA.html` (**URGENCIA** + **IDENTIDAD**: alta mínima) → evento →
  **TABLERO** (rojo al frente) → `FICHA.html` (completar después, plazo) con anti-duplicado
  de **IDENTIDAD**.
- **ESTRUCTURA EN CÓMIGO:** alta mínima atómica que crea expediente con marca
  `falta_completar` + fecha límite (todo plazo con dueño, O3) · al completar, el match de
  homónimos evita el segundo expediente · el registro **no** espera la ficha (pilar 5).
- **GUARDA:** pilar 5 (emergencia <1 min, cero duplicados) · R-02 (candado de identidad).
- **CASA:** FLUJOS flujo 3 · pilar 5 · contratos URGENCIA/IDENTIDAD.
- **ESTADO:** DECIDIDO · dibujo EMERGENCIA (ESPERA VEREDICTO) · plazo por definir con el
  equipo [SUPUESTO].

## Avisos, fallas y cierre

### FL-13 · Los avisos con dueño (12:15)

- **PASO:** 12:15 — la mañana con chips de plazo.
- **QUÉ EXIGE:** **todo aviso y todo plazo nace con su dueño** (rol responsable); lo no
  atendido no desaparece: **al vencer sube al tablero**; cada chip con acción y persona.
- **CADENA:** **ALERTAS** crea el pendiente fechado con dueño (viniendo de controles,
  laboratorio o protocolos) → al vencer → **TABLERO** (chip vencido) → acción conduce a
  su pantalla.
- **ESTRUCTURA EN CÓMIGO:** los pendientes son **datos** en catálogo/diario (fecha,
  responsable, acción), jamás constantes de código · el chip del tablero es `fold` de
  pendientes vencidos · la fatiga se mide (avisos por visita) para ajustar catálogos, no
  personas.
- **GUARDA:** O3 · SISTEMA-DE-ALERTAS (0 avisos sin acción · 0 plazos huérfanos) ·
  meta <2 avisos por visita.
- **CASA:** FLUJOS capa D (12:15) · O3 · contrato ALERTAS.
- **ESTADO:** DECIDIDO · **cruce de quién ve qué (decisión abierta §5.3) bloquea su
  última parte** — [SUPUESTO] pendiente su frase.

### FL-14 · Se fue la luz / se trabó el equipo (flujos 6 y 7)

- **PASO:** 12:15 la luz · 13:10 el equipo.
- **QUÉ EXIGE:** lo escrito **sobrevive** (guardado atómico); puente de papel con campos
  mínimos; al volver, transcripción **con la hora del hecho** («escrito tardío»); el
  tablero muestra quién quedó **a medias**; el mensaje dice qué pasó, qué conservó y qué
  falta — **cero jerga**.
- **CADENA:** persistencia (atómica) → `FALLA.html` (los seis guiones en humano) →
  transcripción → **TABLERO** (estados a medias) → bitácora (quién escribió qué).
- **ESTRUCTURA EN CÓMIGO:** escritura en temporal + rename (reintentar seguro) ·
  bitácora encadenada con autor · puente de papel = documento de solo salida, su
  transcripción conserva `fecha_del_hecho` ≠ `hora_de_captura` · mensajes de degradación
  en catálogo de datos, no literales en código.
- **GUARDA:** pilar 6 (corte simulado ⇒ base íntegra; ningún mensaje con palabra técnica)
  · contrato DEGRADACION (seis guiones con sus tres escrituras).
- **CASA:** FLUJOS flujos 6/7 · pilar 6 · contrato DEGRADACION · DEC-09.
- **ESTADO:** DECIDIDO · dibujo FALLA existe (ESPERA VEREDICTO).

### FL-15 · El cierre y el traspaso (13:50)

- **PASO:** 13:50 — el día tiene final.
- **QUÉ EXIGE:** una pantalla de cierre imprimible: quiénes quedaron y por qué · plazos
  vencidos · fichas de emergencia sin completar · respaldo de la tarde · agenda de mañana
  con lo reagendado — y «imprimir traspaso» en un clic.
- **CADENA:** **TABLERO/CIERRE** (fold del día: atendidas, no llegó, a medias) →
  **ALERTAS** (vencidos con dueño) → **IDENTIDAD** (emergencias incompletas) →
  **RESPALDO** (respaldo de tarde, R-12) → **AGENDA** (mañana).
- **ESTRUCTURA EN CÓMIGO:** el cierre es **vista derivada** del día (cero captura nueva) ·
  el traspaso es documento de solo salida (impresión) · el respaldo es paso con drill que
  jamás toca el parque vivo.
- **GUARDA:** O5 (cierre de 5 pasos + traspaso en 1 clic) · R-12 (drill con sentinela).
- **CASA:** FLUJOS capa D (13:50) · O5 · R-12 · dibujo CIERRE.
- **ESTADO:** DECIDIDO · dibujado (ESPERA VEREDICTO — «¿así entrega su turno?»).

## Una verdad, muchos equipos

### FL-16 · Las alertas en paralelo (computadora y celular)

- **PASO:** todo el día — la enfermera está junto a la paciente, con el celular.
- **QUÉ EXIGE:** el mismo aviso está disponible **a la par** en computadora y celular,
  **cada equipo sin interrumpir su propia sesión**; un celular sin señal **recupera** el
  aviso al volver.
- **CADENA:** **ALERTAS** publica → estación (PC) y terminal/celular reciben — misma
  verdad, distinto tamaño (G2: la lista se estrecha sola).
- **ESTRUCTURA EN CÓMIGO:** **pendiente de ingeniería** — red local con sincronía, cola
  diferida y recuperación; la terminal es web sobre el nodo (R-27), estado del arte por
  confirmar: cómo se reparte el aviso y qué pasa con un equipo caído.
- **GUARDA:** R-27 (8 escenarios de sync) · G3 (mismo aviso en todos, sin robar sesión).
- **CASA:** FLUJOS capa D («una verdad, muchos equipos») · H-042/H-043 · R-27.
- **ESTADO:** [SUPUESTO] técnico declarado — fase con hardware; el diseño no depende de
  él (la alerta siempre está en la PC; el celular suma).

## Los papeles de la médica

### FL-17 · Los documentos con la paciente en contexto

- **PASO:** cualquier momento de la consulta — la médica papelea (su uso más frecuente,
  H-042).
- **QUÉ EXIGE:** con la paciente elegida, el documento del día sale en ≤30 segundos con
  **sus** plantillas; consentimiento y aviso en un clic; compartir caso **sin identidad**
  rotulado aparte.
- **CADENA:** `CONSULTA.html` o `DOCUMENTOS.html` → **DOCUMENTOS** (DOC-01 en adelante:
  traductor → relleno → verificación → escritura atómica) → consentimiento de imagen
  manda sobre fotos de **ULTRASONIDO/INGESTA** (DOC-14) → compartir: IMPORTAR/SISTEMA
  (DOC-17…22, R-23).
- **ESTRUCTURA EN CÓMIGO:** ya especificada en `MOD-DOCUMENTOS.md` (22 funciones con sus
  datos y relaciones); este FL solo la ata al paso del día: la puerta de entrada es el
  contexto de paciente, y la excepción (sin paciente) nunca toca expediente.
- **GUARDA:** R-05…R-09, R-23 (ya escritas con sus pruebas).
- **CASA:** FLUJOS capa D (consulta) · H-018/H-042 · `MOD-DOCUMENTOS.md`.
- **ESTADO:** DECIDIDO · dibujo parcial (huecos H-051…H-054) · **[SUPUESTO 12]** hogar
  del compartir.

---

## Bitácora de este archivo

- **2026-10-24 · v1** — creación de FL-01…FL-17 desde las capas D–F, los 8 flujos y
  O1–O10; descubrimiento del orden de construcción de módulos que este archivo impone
  (identidad y tablero primero, controles y pausa después) y de la decisión abierta que
  bloquea FL-13 (el cruce de roles, §5.3). Registrado como entrada B-012 de
  `CONSTRUCCION.md`.
