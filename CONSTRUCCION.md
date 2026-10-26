# CONSTRUCCION — la bitácora única de nuestras interacciones

> **Qué es:** el libro vivo donde queda escrito, en orden, todo lo que se decidió,
> acordó o entregó en nuestras conversaciones —con su fecha, su estado y su puntero a la
> casa donde vive la regla—. Es la respuesta a su pedido: **una sola fuente a la que en
> cada interacción le añadimos los agregados**, para que el futuro no reabra lo cerrado ni
> existan documentos-verdad desacuerdados. Creada: 2026-10-24 · vive en la raíz de la
> carpeta (fuera de las carpetas que el refresco borra).
>
> **Qué NO es:** no contiene reglas ni estado duplicado. La regla vive en su casa (ley,
> doctrina, contrato, `REQUISITOS-DEL-DISENO.md`); el estado de cada módulo vive en el
> menú de `06-FUENTE-BACKEND/FUENTE-DE-VERDAD.md`. Aquí solo viven **los hechos de
> nuestra interacción** con puntero a esas casas. Si esta bitácora y una casa chocan,
> manda la casa.

## §0 · Las reglas de esta bitácora (siete)

1. **Mismo turno** — toda decisión, edición o acuerdo que cierre una conversación entra
   aquí en ese turno; lo que no entra, no ocurrió.
2. **Punteros, no copias** — cada entrada guarda el QUÉ (una frase), el POR QUÉ (una o
   dos) y el **puntero** a su casa; el texto completo de una regla jamás se escribe en dos
   lugares.
3. **Solo avance** — cada entrada avanza en su estado (`vivo → escrito → verificado →
   portado a su casa → código → prueba verde → cerrado`) y cada transición se anota con
   fecha debajo; nada se borra: una corrección es una entrada nueva que anula a la
   anterior.
4. **Portada por ritual** — cuando una entrada junta doble veredicto, su regla se porta a
   la casa (ley o contrato), la casa refresca su huella, y la entrada queda «portada».
5. **Sin duplicar el estado** — el estado de los módulos no se lleva aquí: se lee en el
   menú de `FUENTE-DE-VERDAD.md` (un solo reloj); esta bitácora solo registra las
   **transiciones con fecha**.
6. **Primero el hallazgo** — lo malo descubierto va con número al buzón
   (`04-METODO-Y-ACEPTACION/HALLAZGOS.md`) y la entrada lo enlaza.
7. **Foto al cerrar bloque** — solo al terminar un bloque se refrescan huellas, índice y
   mapa; entre bloque y bloque, nadie los toca.

## §1 · Cómo se vuelve código (el puente, igual para toda entrada)

Papel estabilizado con doble veredicto → la entrada se **porta** a su casa → en la
maestra, la ley toma su secuencia normal (fila `R-xx` → su FND → **su prueba escrita
antes que el código** → compuerta verde → commit) → la entrada gana `código` con el commit
y `prueba verde` con la salida del comando. Esta bitácora no contiene código: contiene la
**promesa** de código con su guarda.

## §2 · La bitácora (entradas B-001…)

**B-001 · 2026-10-24 · estructura de la verdad · estado: escrito**
**QUÉ:** nace la familia `06-FUENTE-BACKEND/` — `FUENTE-DE-VERDAD.md` con el menú de los
17 módulos, el formato de diez campos por función, las siete secciones de cada hoja de
módulo y las ocho reglas de la familia.
**POR QUÉ:** su pedido — una sola fuente de verdad construible (qué hace cada función, su
porqué, su cómo en humano, sus relaciones, sus datos y su par frontal) para mandar a
construir el software con un agente de IA, sin documentos-verdad en desacuerdo.
**Punteros:** derivado de la ley (micro-formato), de los contratos, de
`IMPLEMENTACION-DESDE-LA-VERDAD.md` (paquete-verdad) · **Dibujo:** navegación añadida en
`INDEX.md` y `LEEME.md` · **Código futuro:** entrada principal del agente constructor.
**Veredicto:** pendiente de su revisión.

**B-002 · 2026-10-24 · DOCUMENTOS · estado: escrito (v1)**
**QUÉ:** `MOD-DOCUMENTOS.md` con 22 funciones en seis partes que integran las dos caras
del módulo: la nuestra (ley R-05…R-09, R-23, dibujos C-05/DOCUMENTOS, hallazgo H-018) y
la del análisis de ingeniería que usted entregó (motor de relleno de plantillas +
anonimización), con sus deudas traducidas a estado real: unas ya son ley y solo esperan
ejecución (R-05, R-08, R-23), otras quedan marcadas como candidatas.
**Punteros:** casas citadas en la cabecera del archivo · **Veredicto:** pendiente.

**B-003 · 2026-10-24 · DOCUMENTOS y formato · estado: escrito (v2)**
**QUÉ:** su verificación de cobertura («¿se explica qué es cada módulo, por qué estas
funciones, sus relaciones con funciones, otros módulos, la interfaz y la base de datos?»)
dio parcial: se añadieron los campos **RELACIONES** y **DATOS** a las 22 funciones, y a
la hoja las secciones **§1 Qué es el módulo · §2 Esqueleto · §3 Relación con otros
módulos · §4 Capa de datos · §5 Pantallas**; el formato de la fuente pasó a diez campos y
ocho reglas.
**SUPUESTOS nuevos:** 14 (ruta de los documentos generados), 15 (destino real de los
adjuntos), 16 (archivo del registro de consentimientos) — rutas por verificar en la
maestra.

**B-004 · 2026-10-24 · propuestas de mejora · estado: ESPERA SU ELECCIÓN**
**QUÉ:** ocho propuestas no disruptivas (rutas intactas), entregadas en conversación y
aquí registradas: P1 chip que lleva del aviso a la pantalla que lo resuelve · P2 bloque
«antes de sentar a la paciente» en CONSULTA · P3 favoritos de la médica en
DOCUMENTOS/HISTORIA · P4 «copiar del control anterior» con marca honesta · P5 acciones de
enfermería bajo orden firmada por la médica · P6 contingencia «si–entonces» en el CIERRE ·
P7 indicador de modo de estreno (día 1) · P8 tarjeta impresa de atajos por rol.
**POR QUÉ:** investigación externa de la sesión (carga de documentación, handoff,
favoritos) montada dentro de paradas que ya existen.
**Estado:** ninguna se dibuja hasta su elección y veredicto.

**B-005 · 2026-10-24 · señalizaciones · estado: ESPERA SU ELECCIÓN**
**QUÉ:** siete señalizaciones verificadas como faltantes en los dibujos: campo
obligatorio vs opcional (H-009 sigue abierto) · aviso de trabajo sin guardar · autoría y
hora del último guardado · motivo del botón gris (permiso / faltan datos / no aplica) ·
«en uso de X» en la atención pausada · «sin señal — se enviará al volver» en la terminal
del celular · hora actual en la barra.
**Estado:** registradas; al elegir, cada una entra a su pantalla con su banda de pregunta.

**B-006 · 2026-10-24 · métricas · estado: ESPERA SU ELECCIÓN**
**QUÉ:** tres métricas propuestas con su regla filosófica —**miden al sistema, nunca a la
persona**—: pulso del día (espera promedio, no llegaron, atendidas, avisos vencidos) ·
carga de aviso por visita con su tasa de descarte (la medición de fatiga que pide la
literatura) · tiempo real de estación y de consulta (para saber si el «3 minutos» y el
«12–15» son ciertos o son suposición).
**SUPUESTO:** se muestran al equipo completo y nunca por persona.

**B-007 · 2026-10-24 · hallazgos · estado: registrado en el buzón**
**QUÉ:** seis hallazgos nuevos numerados en `HALLAZGOS.md`: **H-050** el puntero de
IMPORTAR apunta a R-23 en vez de R-24 · **H-051** el export anónimo sin dibujo en ninguna
página · **H-052** los marcadores de plantilla sin dibujar · **H-053** el aviso de
privacidad sin dibujar · **H-054** el veto de consentimiento de imagen sin señalar donde
la foto entra · **H-055** el contraste «formato es del médico» (auditoría) contra C-05
(H-018), verificación pendiente en la maestra.
**Regla:** registro primero; reparación el día que se toque cada dibujo.

**B-008 · 2026-10-24 · entrevista · estado: PENDIENTE DE AGREGAR AL KIT**
**QUÉ:** pregunta candidata para la entrevista con el equipo: *«¿ha compartido un caso
este año? ¿cómo lo hizo la última vez? ¿qué le faltaría para atreverse?»* — valida el
bloque de compartir (DOC-22) antes de darle prominencia.
**Destino:** al portarse esta carpeta a la maestra, se suma a
`GUIAS/KIT-ENTREVISTA.md` (aquí ese archivo se refresca desde allá, no se edita).

**B-009 · 2026-10-24 · gobernanza · estado: ESPERA SU FRASE**
**QUÉ:** enmiendas de proceso pendientes que esta bitácora deja listas: (1) mover la
«regla viva» de `REQUISITOS-DEL-DISENO.md` §6.8 a esta bitácora (las decisiones en vivo
entran aquí) · (2) congelar `ACUERDOS.md` como historia y declarar cerrada la
`ORDEN-TRABAJO-PROTOTIPOS.md` · (3) corregir el puntero de `INDEX.md` (H-050) · (4) los
SUPUESTO 0–16 de `MOD-DOCUMENTOS.md` · (5) el puntero del menú en `INDEX.md` hacia esta
familia.

**B-010 · 2026-10-24 · lo heredado · estado: abierto con puntero (no se copia)**
**QUÉ:** decisiones que siguen vivas en sus casas y aquí solo se apuntan: las diez
abiertas de `REQUISITOS-DEL-DISENO.md` §5 · las optimizaciones O5–O9 con el tablero dibujado
aún sin los estados nuevos · la enmienda v4.3 esperando su «ratificada» · la entrevista
sin fecha (cero dobles veredictos) · H-047, H-048 y H-049 sin reparar.
**Punteros:** sus propios archivos; nada de esto se decide aquí.

**B-011 · 2026-10-24 · auditoría de fuentes · estado: informe escrito**
**QUÉ:** primera ronda completa de auditoría de **todas** las casas de verdad → archivo
`AUDITORIA-FUENTES.md` en la raíz, con su método y sus comandos de reverificación (buzón
60, ley 53, doctrina, tablero, huellas 124). **Cinco hallazgos nuevos al buzón:**
**H-056** la cabecera de la doctrina dice «ocho pilares» y hay diez · **H-057** el número
del pilar 1 está duplicado · **H-058** el puntero de NOM004 apunta a C-18 (el diálogo es
C-19) y omite R-18 · **H-059** las herramientas (checkpoint, kit, generador) citan rutas
de la maestra que no existen en esta copia · **H-060** falta «estación a medias» en el
TABLERO dibujado (los otros dos estados sí están).
**Síntesis de la auditoría:** ley y doctrina sólidas (con defectos de forma) · contratos el
eslabón más flojo (10 de 17 módulos sin casa de lógica) · buzón con 60 filas y 0 cerrados
(deuda de gestión) · integridad sana.
**Plan:** reparación inmediata de lo decidido, su frase para índices y cierre de orden,
refresco de checkpoint y mapa al cerrar bloque.

**B-012 · 2026-10-24 · requerimientos de flujo · estado: escrito**
**QUÉ:** `06-FUENTE-BACKEND/REQ-FLUJO.md` con **FL-01…FL-17**: cada paso del flujo
declarado —mañana de la enfermera (abrir, llamadas, puerta, no llegó, carril,
interrupción, laboratorio), urgencia, consulta de la médica, equipo fuera, cesárea,
emergencia, avisos con dueño, fallas, cierre, alertas en paralelo, documentos— traducido
a **cadena interfaz ↔ función ↔ módulo** y a **estructura de código** (presentación ·
dominio · persistencia · eventos, en la dirección de dependencias ya decretada), con su
guarda, su casa y su estado.
**Descubrimiento del archivo:** el orden de construcción de los módulos pendientes
(IDENTIDAD y TABLERO primero; CONTROLES y ATENCIONES después) y que la decisión abierta
§5.3 (cruce de roles) bloquea FL-13.
**Estado:** escrito, espera su revisión · FL-16 queda [SUPUESTO] técnico de ingeniería.

**B-013 · 2026-10-25 · auditoría adversarial de la propuesta «circuito cerrado de
alertas» · estado: auditada; integración propuesta, NO ejecutada**
**QUÉ:** la propuesta eligió el circuito de alertas como función núcleo (detectores puros ·
registro con dedupe · cierre firmado · visibilidad · escaneo de lab) y se le pasó la
auditoría adversarial P9c contra nuestra lógica aplicada.
**Veredicto:** ~70 % de la propuesta **ya vive en nuestras casas** (pilar 10 · REQUISITOS
§E/§F · R-14/R-15/R-16 · O3/O4 · FL-05/07/08/13/15) — confirma que el producto y la
lógica coinciden; lo nuevo y útil: **dedupe solo mientras pendiente (recaída = alerta
nueva)** · **«todo estado de alerta lleva reloj»** mapeado a nuestras tres paradas
(tablero → cierre/traspaso → agenda del día siguiente) · **evaluar al momento de la
escritura** (ya es E1: deuda de código, no de diseño) · **métricas del circuito**
(tiempo medio de cierre, duplicados evitados — se suman a B-006) · **motor declarativo**
`condición → severidad → mensaje → catálogo` que da forma concreta a la decisión abierta
§5.1 · **fail-silencioso anunciado** («catálogos sin firmar» en el panel) ·
**tests del ciclo completo** como guarda candidata.
**Rechazos con razón:** cierre binario pendiente/atendida (contradice J1: son tres cierres —
atendida · referida con nota · cerrada con motivo) · texto obligatorio en todo cierre
(doble captura contra la nota ya firmada: anclar a la nota, texto solo si no hay nota) ·
SLA 24/72 h de hospital (en consultorio el reloj ya tiene dueño en tablero, cierre y
agenda) · eje de severidad de tres niveles paralelo (se funde con el semáforo DEC-27 y el
perfil embarazada de R-15, no crea vocabulario nuevo) · circuito aplicable al contexto
permanente (una alergia no «se atiende»: fuera de alcance del ciclo) · segundo panel «Hoy»
(el tablero ES el panel: segunda verdad prohibida) · olvida la voz (O4) y la audiencia de
la paciente (F3) — se importan al integrar · dueño = solo médico (H-042: el dueño declara
QUIÉN debe; el firmante puede ser quien ejecuta — [SUPUESTO] clínico).
**SUPUESTOS de integración (A1…A7):** cierre anclado a nota · máquina de estados con
reloj y sus tres paradas · mapeo severidad↔semáforo · dedupe/recaída/sustituida ·
alcance solo con ciclo de vida · dueño≠firmante · motor declarativo a decisión §5.1.
**Alimenta:** decisión abierta §5.1 (combinaciones) con forma concreta · contrato ALERTAS
(cuando toque) · B-006 (métricas) · FL-08/13 (sin cambios: la propuesta los confirma).
**Siguiente paso propuesto:** convertir esta auditoría + sus A1…A7 en `MOD-ALERTAS.md`
(segunda hoja de la fuente, el módulo que es el corazón clínico) — **pendiente de su
«proceda».**

**B-014 · 2026-10-25 · decisión del dueño: el camino del papel · estado: decidido y en
ejecución**
**QUÉ decidió usted:** el frontend nuevo se hace **únicamente en papel** (dibujos HTML,
cero código de producto), pero **con toda la lógica de backend involucrada detrás**;
idealmente las pantallas **sí se deben de poder usar si es económico**; y **toda la
estructura del backend y su forma de comunicarse con el frontend debe quedar declarada y
bien estructurada**. Es el camino (a) de la línea roja de la sesión anterior: sin código de
producto antes de veredictos.
**Qué se entregó en el mismo turno:** `06-FUENTE-BACKEND/COMUNICACION.md` — la costura:
estructura del backend (con puntero a su casa), el puente con sus dos implementaciones
(maqueta / real), el formato de ocho campos por operación, el catálogo de operaciones de
la espina con sus FL, pedidos vs eventos, formato de datos, economía y camino a producto ·
`01-DIBUJOS/EDICION/PROPUESTAS/maqueta.js` — el PUENTE-MAQUETA (contexto de paciente que
viaja entre páginas, relojes vivos con umbrales 30/45, aviso humano, y las operaciones del
catálogo declaradas con error humano donde falta cablear) · y el cableado del **paso 1 de
5** de la espina: `TABLERO.html` usa la maqueta (sigue siendo dibujo sin ella: progresivo).
**Orden de cableado que queda:** 2) CONTROL + PAUSA · 3) CONSULTA + ALERTAS ·
4) EMERGENCIA + REGISTRO · 5) CIERRE + AGENDA.

**B-015 · 2026-10-25 · decisión del dueño: frontend desde CERO (ronda 2) · estado:
decidido y entregado**
**QUÉ decidió usted:** reconstruir el frontend **desde cero**, sin reutilizar la ronda 1,
porque «hay varias cosas que se pueden hacer mejor y que no necesitamos de las versiones
anteriores» — barra vertical izquierda **solo con lo que de verdad se busca**, y un flujo de
pantallas que tenga más sentido para el flujo descrito; sin cargar errores previos ni malas
prácticas.
**Qué se descarta (errores de la ronda 1 que NO se cargan):** barra de 15 enlaces con
mitad apuntando a índice-placeholder (ruido de navegación) · navegación por índice de 33
páginas en vez de por jornada · estados escritos a mano en el HTML que prometían moverse y
no se movían · pantallas por insumo en vez de por momento del día. La ronda 1 **no se
borra**: queda como memoria con sus veredictos pendientes.
**Qué se entregó (familia nueva `07-FRONT-NUEVO/`, 12 archivos):** `LEEME.md` (manifiesto:
ocho principios, errores descartados, mapa FL→pantallas) · `front.css` (sistema de diseño
desde cero: riel de 7 destinos, cinta, retícula que se acomoda sin scroll, chips siempre
color+palabra, relojes con umbrales, banda de veredicto en cada pantalla, estilo de
impresión para el traspaso) · `puente.js` (el PUENTE-MAQUETA de esta ronda: día con
14 pacientes y eventos en memoria, estados que se mueven solos de verdad, contexto que
viaja, relojes vivos, chips de control con los tres niveles —incluido «esperado en
embarazo»—, circuito de alertas con los tres cierres y firma obligatoria, dedupe, y
operaciones con error humano donde aún no se cablea) · **9 pantallas**: `hoy` (FL-01/04/10)
· `llegada` (FL-02/03/12 con los 5 datos de visita de H-039) · `estacion` (FL-05/06) ·
`consulta` (FL-09/17) · `pendientes` (FL-08/13 con B-013 dibujada) · `documentos`
(FL-17) · `agenda` (FL-02/04) · `cierre` (FL-15) · `sistema` (dueño) — cada una con su
banda de pregunta y veredicto del kit.
**Navegación:** `COMUNICACION.md` actualizado (la maqueta vigente es la de la ronda 2) ·
índices y este libro actualizados.

**B-016 · 2026-10-25 · veredicto del dueño sobre la ronda 2 + comparativa · estado:
crítica recibida, comparativa entregada**
**Su veredicto:** lo de la ronda 2 está «mal e incompleto».
**Reconocido y registrado el mismo turno (registro primero):** **H-061** el puente no
implementa seis operaciones de su propio catálogo · **H-062** el circuito insignia no
cierra el círculo: guardar un control con presión crítica no genera la alerta · **H-063**
la estación dibuja 9 campos contra los 10 exactos de R-14.
**Entregado:** `COMPARATIVA.md` (raíz) — estructura la lógica de flujo de **ambas**
 rondas (ronda 1: catálogo de objetos con el flujo narrado en rutas y estados congelados ·
ronda 2: jornada ejecutada con estados derivados y costura) · lista completa de lo
**incompleto** (13 pantallas y 4 cableados faltantes, con su FL o casa) · y el **rescate**
del flujo actual en10 puntos (costura puente-eventos · riel7+contexto · estados derivados
· cinta-contexto · seguridad dibujada de punta a punta · puerta con visita de 5 datos ·
cierre imprimible calculado · agenda honesta · bandas de veredicto · sistema de diseño).
**Decisión de camino (recomendada, esperando su frase):** conservar el rescate y las 9 como
espina, completar los13 faltantes sobre la misma costura, cerrar H-061/062/063 antes de
cualquier veredicto del equipo; si su «mal» apunta a la forma de una pantalla concreta, se
rehace esa pantalla sin tocar el rescate.

**B-017 · 2026-10-25 · pedido del dueño: dibujar TODOS los flujos para la comparativa ·
estado: familia creada**
**QUÉ pidió:** dibujar cada flujo propuesto y todos los flujos lógicos guardados en la
documentación, para poder comparar todo y así construir después un frontend nuevo desde cero
**bien construido y con todos los flujos incluidos**.
**Entregado — familia `08-FLUJOS/` (7 archivos):** `LEEME.md` (qué contiene y cómo leer las
cadenas) · `flujos.css` (primitivas de diagrama: cajas físico/digital/pantalla/evento,
flechas, cadenas) · **`INDICE.html` — el mapa comparativo**: cada flujo con su cobertura en
la ronda1, en la ronda2 y su hueco abierto (el insumo directo del próximo frontend) ·
**`FLUJO-NORMA.html`** (capa D dibujada: jornada de la enfermera paso a paso, consulta de la
médica, visita H-039, una-verdad-muchos-equipos) · **`FLUJO-CORTES.html`** (los8 cortes de
estrés con su secuencia y cobertura) · **`FLUJO-INTERACCION.html`** (los17 FL-01…FL-17 como
cadenas paso→pantalla→función→código) · **`FLUJO-CIRCUITOS.html`** (los4 circuitos: cuatro
latidos, alertas6 tipos+T1–T3+cierre, recordatorios, calculadoras con prefill).
**Sin copiar (ya dibujados, enlazados):** los3 recorridos de `RUTAS/`, el día de18
(`TABLERO.html` r1 · `hoy.html` r2), las fases de `MAPA-DE-IMPLEMENTACION.md`.
**Conclusión comparativa que deja el índice:** ambas rondas cubren el día-puerta-estación-
consulta-pendientes-agenda-cierre; solo la ronda1 tiene los3 cortes técnicos, estudios,
historia, calculadoras, protocolos, acceso y recorridos; y ningún hueco cerrado en: alerta
sin disparo (H-062), urgencia sin marcador, ficha de emergencia, laboratorio de r2, FL-16
celular y protocolo de tumoración.

**B-018 · 2026-10-25 · pedido del dueño: estructurar la lógica de requerimientos frontend
+ backend desde los flujos, actualizada · estado: registro creado**
**QUÉ pidió:** a partir de los flujos ya dibujados, estructurar los requerimientos de
frontend y de backend, «porque seguro los requisitos se han actualizado con toda la nueva
información gestionada».
**Entregado:** `06-FUENTE-BACKEND/REQUISITOS-FRONT-BACK.md` — **25 RF** (frontal) y **22 RB**
(fondo), cada uno con su flujo de origen, su exigencia, su casa y su estado, más: la sección
de **deltas** (por qué se actualizaron: H-061/062/063 · B-013 · comparativa · COMUNICACION),
el **orden de construcción** por requisito (huecos rojos primero) y la sección de **qué NO
cambia** (ley intacta; los CANDIDATOS van a contratos en exploración y a REQUISITOS-DEL-DISENO
con su frase).
**Regla declarada en el archivo:** es vista derivada de los flujos, no nueva ley — RF/RB
citan su casa y si chocan, manda la casa.

**B-019 · 2026-10-25 · integración de dos auditorías externas + reparaciones + portación ·
estado: ejecutado**
**Qué se integró de las dos entregas del dueño («integra todo lo que te aporte valor»):**
**(a) Auditoría de la pieza REQUISITOS-FRONT-BACK (6 hallazgos) → reparado todo:** el
hallazgo alto —la verdad partida entre maestra y copia— se reparó con **portación**: buzón
**H-050…H-063** (14 filas) + esta bitácora (`GUIAS/CONSTRUCCION.md`) + renglón en
`GUIAS/ACUERDOS.md` declarando esta copia como taller de diseño con sus familias 06/07/08 ·
sello y afirmación de refresco del LEEME corregidos (150 archivos; «el refresco recrea
01–05») · el «13» cerrado con su enumeración en `08-FLUJOS/INDICE.html` · los dos ratchets
RF/RB añadidos a `REQUISITOS-FRONT-BACK.md` · la regla de lectura «ronda2 = papel;
construir = dibujar» escrita en el índice · el conteo del sello original (118) declarado
y corregido. **(b) Las nueve órdenes de la propuesta externa → integradas así:** Orden3
**ejecutada** (nació `BANDEJA-DECISIONES.md`:19 decisiones en tres bandas con opciones,
recomendación, qué bloquea y minutos) · Orden9 **ejecutada** (la portación de arriba) ·
Orden «arregle» **ejecutada**: H-061 (seis operaciones cableadas en `puente.js`), H-062
(guardar control ≥160 o combinación o3 banderas **prende la alerta** en Pendientes — el
circuito insignia cerrado), H-063 (estación con los **10 campos y9 banderas reales** de la
réplica C-16), H-060 (TABLERO con «estación a medias»), término del contrato TABLERO
(local y maestra), H-056/H-057 (doctrina: «diez pilares» y párrafo duplicado — local y
maestra), H-050/H-058 (punteros del índice) · Órdenes 1/2/4/5/6/7/8 **quedan en cola** con
su secuencia (semana A: bandeja+evidencia · B: entrevista con demo · C: medición y casos),
a la espera de sus insumos (entrevista, muestra, máquina) o del turno siguiente.
**Verificación:** `node --check` verde en `puente.js` tras las reparaciones · la reparación
del circuito se prueba entrando a `07-FRONT-NUEVO/estacion.html` con una paciente en
contexto, poniendo160+ de sistólica y guardando: nace la alerta en Pendientes.

**B-020 · 2026-10-25 · repaso del checklist de SEO que comentó el dueño · estado: analizado,
límites declarados**
**Qué entregó:** su transcripción de una sesión de SEO (Google Analytics y alternativas,
lógica de encabezados, sitemaps XML/HTML, robots.txt, datos estructurados/schema.org,
links prev/next).
**Veredicto para nuestro producto — NO aplica, y por principio (no por capricho):** el
producto es escritorio **offline** (P1: nada sale del equipo; los datos clínicos no van a
Google ni a ningún tercero) y el HTML es **papel descartable** (DEC-19): Analytics /
Plausible / Matomo / Tag Manager, `sitemap.xml`, `robots.txt`, sitemap HTML y prev/next son
herramientas de **web pública rastreable**, y este software no lo es (el terminal de la
fase con hardware es intranet, no internet). Si algún día se decide que el **producto** sea
web, eso es decisión roja que se escala (LEEME regla 1) — y ahí el checklist entero entra.
**Qué SÍ aporta y ya se integró:** (1) **jerarquía de encabezados** → verificación hecha:
las 9 pantallas tienen título y, tras reparar hoy `consulta.html`, **exactamente un h1
cada una**; el salto de niveles (h1→h3/h4) queda como **H-064** para el pulido sin cambiar
diseño; (2) el patrón **mapa del sitio** → ya lo cumplimos (`INDICE.html` de propuestas,
`08-FLUJOS/INDICE.html`, `INDEX.md`, el riel): toda familia de pantallas nace con su índice
navegable — si algún día se publica la documentación como web, de ahí sale su
`sitemap.xml`; (3) **métricas locales** → la charla valida nuestra vía: medir en casa y no
enviar datos a terceros, que es exactamente B-006/RF-24 con su regla «miden al sistema,
nunca a la persona»; (4) **datos estructurados ≈ declarar en datos** → eco de
P6/catálogos/SPEC/eventos, sin acción nueva. **Dónde sí aplica el checklist completo:** en
sus páginas de documentación (su fuerte: HTML/JS/SS posicionados) si algún día las publica
— ahí valen h1 único, `sitemap.xml` desde el índice, `robots.txt` y schema de artículo.

**B-021 · 2026-10-25 · pedido del dueño: el frontend desde cero que SÍ cumple · estado:
entregado y verificado**
**QUÉ pidió:** con todo lo comentado, crear el frontend desde cero que cumpla requisitos y
especificaciones.
**Qué se entregó — la ronda completa en `07-FRONT-NUEVO/` (+16 archivos):** **12 pantallas
nuevas** (acceso · ficha · emergencia · laboratorio · parto · protocolos · historia ·
estudios · calculadoras · falla · respaldo · atenciones) construidas sobre la costura
rescatada —mismo sistema de diseño, mismo puente, banda de veredicto en todas— · **3
recorridos por rol** sobre las pantallas nuevas (RF-20) · **`CUMPLIMIENTO.html`**: el índice
que mapea **RF por RF contra su pantalla y su estado** (la prueba de cumplimiento) ·
**navegación en su forma final**: riel canónico de dos grupos reales (Jornada8 · Del
consultorio3) construido desde una sola definición en el puente (todas las páginas
convergen), y **menú del contexto** en la barra para las pantallas de la paciente (ficha,
historia, protocolos, estudios, calculadoras, documentos, parto) · **H-064 cerrado**:
jerarquía sin saltos en las25 pantallas (verificado: `rg -c "<h1"` =1 en cada una; los
paneles de la ronda previa aplanados a h2 sin cambiar su diseño) · circuitos cableados:
homónimas en la búsqueda (RF-15), recordatorio escalado en agenda (RF-22), métricas del día
en el cierre (RF-24 como candidato), consentimiento de imagen con rechazo real (RF-12),
qSOFA e IMC vivos con «sin datos ⇒ sin cálculo» (RF-16/RB-20), «falta completar ficha» con
plazo que se cierra desde la ficha (RF-09/RF-14).
**Verificación:** `node --check` verde en `puente.js` ·25/25 con un solo h1 · sello de la
carpeta regenerado.
**Lo que sigue intacto:** todos los candidatos y supuestos en la `BANDEJA-DECISIONES` —
el papel ya está completo; lo que falta es su frase y la entrevista (RF-20 preparada).

**B-022 · 2026-10-25 · veredicto del dueño: «¿editaste las primeras pantallas para que
reflejen los flujos dibujados?» · estado: verificado con comando y reparado en el turno**
**Respuesta honesta:** en parte. Lo que **sí** traían las primeras pantallas de la ronda
anterior (y quedó): el riel convergido y el menú del contexto, la cinta alimentada desde la
ficha, los estados derivados, el chip ESCALADO en agenda, las métricas del cierre y el
aplanado de encabezados. Pero la verificación con comando destapó **cuatro huecos entre lo
declarado y lo cableado**, y uno de ellos era **mío y serio**: **RF-15 (homónimas) estaba
declarado CUBIERTO en `CUMPLIMIENTO.html` y no estaba cableado en ninguna parte** —
declaración sin hecho. **Reparado hoy, todo en el mismo turno:** (1) **homónimas reales** —
`buscar` ahora consulta además un archivo de registros parecidos, muestra el aviso rojo
«confirme con fecha y expediente (R-10)» cuando los apellidos se parecen, y las filas
parecidas **no se eligen sin confirmar**; (2) **FL-03 sin su acción** — no existía el botón
«✓ Registrar llegada» (la cita no podía pasar a llegó): cableado en la búsqueda, con
prefill desde el contexto y enlace a emergencia; (3) **FL-15 del cierre incompleto** —
faltaban las líneas de «fichas de emergencia sin completar» y «agenda de mañana», que el
flujo exige: añadidas con sus conteos; (4) **FL-13 sin «sube al tablero»** — el vencido no
aparecía en El día: el resumen ahora muestra el chip rojo de avisos por vencer o vencidos.
**Verificación:** `node --check` verde · sello regenerado.
**Lección registrada:** una casilla verde en el mapa de cumplimiento exige **comando que la
pruebe**, no memoria — regla que se añade al uso de `CUMPLIMIENTO.html`: toda fila
CUBIERTO debe tener su verificación ejecutable.

**B-023 · 2026-10-25 · pedido del dueño: «el ejemplo que solo tiene las guías reales
escritas — el que será exactamente igual al verdadero» · estado: entregado como modo, no
como copia**
**Qué se construyó:** la **versión verdadera dentro de esta misma versión** — un
interruptor en la barra de cada pantalla («Ver versión verdadera», persistente en el
navegador) que deja **solo lo que dicen las guías escritas**: sin bandas de pregunta/
veredicto, sin pies con códigos FL/RF, sin rótulos de revisión; el lenguaje de demo
cambia por el del producto («PIN correcto — bienvenida», «abierta en Word: edita, guarda
y cierra», «sin firma no se señala»); y la fecha de El día pasa a ser **la fecha real**.
**Por qué modo y no carpeta nueva:** duplicar25 archivos sería crear la segunda verdad que
esta casa prohíbe — mismo archivo, dos caras, cero deriva.
**Tres límites declarados** (en `07-FRONT-NUEVO/LEEME.md`): los datos siguen de mentiras
(no hay pacientes reales en papel) · `CUMPLIMIENTO.html` y `RUTAS/` son instrumentos de
revisión y siempre llevan andamio · sin JavaScript la página vuelve a su cara de dibujo
(DEC-19).
**Verificación:** `node --check` verde; se probó el interruptor en al menos una pantalla de
cada bloque y el sello quedó en verde.

**B-024 · 2026-10-25 · dictamen del dueño sobre El día + Propuesta «las enfermeras dejan
la libreta» · estado: propuesta entregada, espera su «proceda»**
**Sus cuatro observaciones (texto suyo, registradas):** (1) el subtítulo con los conteos de
El día es «mucha información mal gestionada»; (2) «dos por registrar» no se entiende —aunque
acepta que si la función existe y es lo viable, se quede—; (3) El día debería tener **botones
de acción** (registrar paciente nueva · registrar nueva consulta de una paciente ya
registrada); (4) la pantalla «llegada» no deja claro que es «acaba de llegar una nueva
paciente y se va a registrar», y cada espacio debe **nombrarse con letras claras** de qué es
y qué contiene. **Y su mañana real, que ahora conocemos:** a las9:00 llegan tres foráneas
(Altotonga, Tlapacoyan, Atzlán); la libreta solo anota **nombre, edad, de dónde viene y
teléfono** —lo mínimo, porque no hay tiempo—; después pesar, constantes, revisar estudios,
preparar para ultrasonido (ginecológico / pélvico / de embarazo según la paciente) y
**definir quién pasa primero con la médica**; y siguen llegando más mientras tanto, en
Android y en la computadora.
**Propuesta entregada en esta conversación:** El día de estadísticas a **acciones** (botones
fijos + franja de chips en lugar del párrafo, y el estado renombrado **«falta registrar»**
—falta + verbo, H-041— que sí significa «registro incompleto»); la pantalla de llegada
re-titulada **«Registrar a quien acaba de llegar»** con tres bloques rotulados: **A · venía
con cita → marcar llegó** · **B · paciente nueva → sus cuatro datos de libreta** (nombre,
nacimiento, ciudad, teléfono) · **C · ya está registrada → registrar su visita de hoy**, y
al guardar B **se queda en pantalla con «Registrada ✓ — ¿siguiente?»** para las tres seguidas
sin saltar; y dos candidatos nuevos que **esperan su frase**: «**siguiente a la médica**»
(excepción manual nueva del juicio de enfermería — toca la lista de excepciones del pilar 1)
y «**preparada para US**» (chip de tipo de estudio).
**Qué confirma:** el botón «✓ Registrar llegada» (FL-03) existe desde B-022 — él no lo
sabía porque nació ayer; se queda y pasa a ser el corazón del bloque A.

**B-025 · 2026-10-25 · dictamen: la prioridad la definen las personas, nunca el software ·
estado: regla escrita en sus casas y pantallas reconstruidas**
**Texto suyo:** «el paso de las pacientes muchas veces no tiene que ver con el viejo primero
sino con una prioridad que solo las enfermeras y el médico saben entregar; ni siquiera me
gustaría entregarle esa facultad al software — preferiría que las enfermeras y el médico
pudieran seguir definiendo cuáles son las pacientes prioritarias».
**Dónde quedó escrita la regla (ambas casas, local y maestra):** **DOCTRINA pilar1** — la
lista de excepciones manuales pasó a «urgencia, pausa **y la prioridad de paso —esta la
definen las personas: el software nunca ordena por quién llegó primero**» · **FLUJOS O1**
(mismo addition) · **contrato TABLERO** — párrafo nuevo: el orden dentro de las zonas lo
pone el equipo con la marca «prioritaria»; los relojes informan, no ordenan ·
**REQUISITOS-DEL-DISENO B6** — la decisión completa con lo descartado (orden automático por
llegada · algoritmo de prioridad · arrastre manual).
**Cómo quedó dibujado (pantallas reconstruidas el mismo turno):** **El día** — los conteos
que usted juzgó «mucha información mal gestionada» desaparecieron: ahora son **chips
clicables** (urgente · falta registrar · en espera · avisos por vencidos) que llevan a su
columna · los **tres botones de acción** arriba (Registrar llegada · Paciente nueva ·
Urgencia) · el estado se llama ahora **«falta registrar»** (falta + verbo: dos tarjetas de
eso sí significan «dos registros a completar») · y cada tarjeta de espera/estación trae
**«★ Prioritaria»**: la marcada **flota al frente de su zona** con el chip «la definió el
equipo», y el reloj sigue corriendo solo como información. **Registrar** (antes
«llegada») — re-titulada «Registrar a quien acaba de llegar», con bloques numerados y
rotulados: **1 · ¿ya está registrada? — marque llegó o abra su visita** (con la pista
clara de qué hace cada cosa) · **2 · ¿es paciente nueva? — sus cuatro datos de la
libreta** (nombre, nacimiento, ciudad con sus pueblos, teléfono) y al guardar **«✓
Registrada — ¿siguiente?»** sin saltar de pantalla · **3 · ¿urgencia?** · **4 · datos de
la visita de hoy**.
**Verificación:** `node --check` verde · sello regenerado.

**B-026 · 2026-10-25 · su información de la mañana de las9:00 mapeada módulo por módulo ·
estado: lo factual ejecutado, dos cosas esperan su frase**
**Qué llegó en su relato:** registro mínimo de libreta (nombre, edad/nacimiento, ciudad,
teléfono) · a la estación se pesa, se toman constantes, **se revisan los estudios que la
paciente trae** y **se prepara para ultrasonido según su tipo** (ginecológico ·
gineco-obstétrico · de embarazo · pélvico) · después **se define quién pasa primero** ·
llegan más mientras tanto · y todo en Android y computadora.
**Módulos ACTUALIZADOS con eso (ya ejecutado):** **FLUJOS capa D ×2 hogares** — la puerta
ahora dice los cuatro datos de libreta + encadenado «¿siguiente?», y la estación corrige
«seis campos» → **los diez de R-14** y suma: revisar estudios en mano + preparación para
US con sus cuatro tipos · **RUTAS ENFERMERA ×2 hogares** — mismo corregido de seis a diez
campos (el instrumento de entrevista no puede decir un número contra la ley) ·
**estacion.html** — panel «Lo que la paciente trae en mano» con enlaces a estudios,
laboratorio y la nota «la prioridad la ponen ustedes» · **estudios.html** — el **catálogo
de los cuatro tipos** como chips «por firmar» (P6) y las preguntas de preparación ·
**ficha.html** — **teléfono y ciudad** como contacto editable (RF-14 ampliado) ·
**puente.js** — el contacto viaja desde el registro hasta la ficha, y **atenciones muestra
el ★ prioritaria** (misma verdad) · **CUMPLIMIENTO.html** — filas de RF-04 ampliado y
**RF-26** · **REQUISITOS-FRONT-BACK** — RF-04 (ahora las dos pantallas que crean
pacientes), RF-14, **RF-26 nuevo**, conteos26/22 y la v2 que declara superados los estados
«sin pantalla en ronda2» (el mapa vivo es CUMPLIMIENTO) · **REQ-FLUJO** — FL-01 (botones y
chips + orden del equipo) y FL-03 (cuatro datos + encadenado) · **LEEME/INDEX** conteos.
**Lo que ESPERA su frase:** (1) el chip **«lista para US»** —quién lo marca y dónde vive
(hoy en tarjeta o en la estación)— ya tiene su pregunta escrita en `estudios.html` y en la
banda de `estacion.html`; (2) si la **revisión de estudios traidos** es paso fijo de la
estación (como quedó en la capa D) o quiere pantalla propia con su lista.
**Lo que NO toca:** cierre, respaldo, documentos, caída y dueño — su relato de la mañana
no llegó ahí.
**Verificación:** `node --check` verde · sello regenerado.

**B-027 · 2026-10-25 · dictamen: las tarjetas «muy abarrotadas» y pedido de la vista
definitiva · estado: tarjetas alineadas a la decisión B2 y vista definitiva completa**
**Su crítica:** la columna de «la mañana de un vistazo» hasta urgente/no llegó está bien y
los tres botones también, pero la tarjeta «sigue muy abarrotada» — el caso («embarazo 34
semanas · cefalea…») tuvo que leerlo buscando qué decía; y quiere ver las pantallas
**como si ya fueran las definitivas**, sin la información extra de los ejemplos, para
juzgar espacios y tamaños.
**Lo que se reparó (era incumplimiento de una decisión propia — B2: «exactamente cuatro
cosas»):** la tarjeta ahora lleva **nombre con la fecha de nacimiento al lado del mismo
tamaño** (homónimas de un vistazo), el motivo en **una sola línea** (lo demás se ve al
pasar el cursor: `title`), **un solo botón de paso** por tarjeta (Registrar · Pasar a
estación · Retomar · Pausar · Reagendar —el que toque según su estado) y los dos juicios
como **iconos pequeños ⚠ y ☆** (urgencia y prioridad) en vez de botones grandes · los
datos de la tarjeta se acortaron a rol: dueños «recepción / enfermería / la médica /
quien la abrió», extras «falta completar ficha» · «todo conservado» · «urgencia marcada»,
y los motivos se reordenaron con **lo que importa primero** (su ejemplo quedó «Cefalea +
visión borrosa al guardar · embarazo 34 semanas»).
**La vista definitiva, completa:** en «Ver versión verdadera» se ocultan ahora también los
**subtítulos de narración** (la historia de ejemplo, la leyenda de relojes) y las notas de
ejemplo de la barra y de los botones; y el **estado del equipo** (chip FUERA + su botón)
quedó en su propia línea — porque es estado real del producto, no ejemplo—. Lo que
permanece en esa vista: riel, barra con fecha real, título, los tres botones, los chips,
el equipo, las columnas con tarjetas limpias y, adentro de las pantallas, solo campos y
acciones.
**Banda:** la pregunta nueva «¿la tarjeta, con solo lo esencial, le dice lo suficiente en
un segundo?» quedó escrita en `hoy.html`.
**Verificación:** `node --check` verde · sello regenerado.

---

**B-028 · 2026-10-25 · CHECKPOINT FIJO de la copia taller — qué se ha hecho, qué está
implementado, por qué, cómo se presenta, la lógica y el flujo actual**
**1 · Qué se ha hecho (la campaña completa, de un vistazo):** el frontend se reconstruyó
**desde cero** (ronda2, sobre la costura rescatada) y pasó de 9 a **25 piezas** (21
pantallas por jornada + índice de cumplimiento + 3 recorridos por rol); nació la familia
**`06-FUENTE-BACKEND`** (fuente de verdad con menú de módulos, `MOD-DOCUMENTOS` de 22
funciones, los FL-01…FL-17, la costura `COMUNICACION`, y los **26 RF / 22 RB**); se
dibujaron **todos los flujos** (`08-FLUJOS`); se auditaron fuentes y piezas (H-050…H-064);
se reparó todo lo reconocido (papel roto del circuito alerta, campos10, homónimas,
encabezados, doctrina duplicada, punteros del índice); y **todo se portó a la maestra**
(buzón de64 filas, doctrina, flujos, requisitos B6, contrato TABLERO, ACUERDOS con la
declaración de taller, esta bitácora).
**2 · Qué está implementado hoy (en el papel usable):** el **puente** con su costura real —
contexto que viaja, llegada encadenada («¿siguiente?»), marca de prioridad que flota,
circuito de alerta completo (detectar → nacer sin duplicar → cerrar con nombre y cédula),
cálculos con «sin datos ⇒ sin cálculo», contactos desde la puerta hasta la ficha —; **25
piezas** con riel de dos grupos, menú del contexto, chips de resumen, relojes con umbrales
y **vista definitiva** («ver versión verdadera» = sin andamio).
**3 · Por qué está así (sus dictámenes, no invenciones mías):** prioridad = facultad del
equipo y nunca del software (**B6**) · tarjeta de exactamente cuatro cosas (**B2**) ·
vocabulario «falta + verbo» (H-041) · la mañana real de las 9:00 con los cuatro datos de
libreta (su relato) · y el capítulo entero de flujos (capaD) como norma.
**4 · Cómo se presenta en el frontend:** el riel separa **buscar** de **estar** (lo
paciente cuelga del menú del contexto); los conteos se volvieron **chips clicables**; los
tres botones de acción arriba; la tarjeta = nombre+nacimiento · motivo en una línea · un
solo botón · iconos ⚠☆ · dueño corto; y en el papel —solo en el papel— cada pantalla
guarda su **banda de pregunta y veredicto** para la entrevista.
**5 · La lógica de todo:** cadena de verdad (ley → raíz → lógica → decisiones → contratos →
dibujos → **veredicto, el juez final**) · una sola casa por concepto y punteros nunca
copias · estados derivados de hechos, jamás escritos a mano · una sola costura entre
pantalla y lógica (el puente) · papel antes que código (DEC-19) · y toda cifra con su
prueba ejecutable.
**6 · El flujo de trabajo actual:** **del producto** — la capaD manda (puerta → carril →
papel → voz → cola → avisos → cierre), los FL traducen cada paso a pantalla y código, y la
prioridad la pone el equipo (B6). **De la casa** — su dictamen → registro el mismo turno
aquí → su regla baja a la casa correspondiente (en ambas copias) → la pantalla se dibuja
con banda → el equipo veredicta → lo aprobado se porta → se cierra con **checkpoint de
huellas** (CHECKPOINT-LOGICA v1.2 + `sha256sum -c HUELLAS.txt`).
**7 · Reverificación en tres comandos:** `sha256sum -c HUELLAS.txt` (171, actualizado en la
auditoría adversarial) ·
`grep -c "^| H-" 04-METODO-Y-ACEPTACION/HALLAZGOS.md` (66) ·
`node --check 07-FRONT-NUEVO/puente.js` (verde).

**B-029 · 2026-10-25 · dictamen del dueño sobre mensajes, pantalla Hoy, llegadas y
pendientes · estado: auditoría de lenguaje ejecutada y cambios aplicados**
**Su pedido:** checar **mensaje por mensaje** cada pantalla para determinar cuáles tienen
lógica, cuáles no y cuáles mejorar — más cuatro rediseños concretos.
**Auditoría y cambios ejecutados:** (1) **Acceso** — «Entrar al día» era ilógico: ahora es
**«Entrar»** (y el aviso: «PIN correcto — bienvenida»). (2) **Hoy** (antes «El día / La
mañana de un vistazo»): la pantalla **se llama «Hoy»** en título, barra, riel y en los 18
enlaces de vuelta; la barra lleva ahora **la hora grande, viva**; se quitó la frase inútil
«las tarjetas se mueven solas»; y el chip ya no afirma «En atención: X» —con tres
atendidas a la vez eso mentía—: ahora dice **«Paciente abierta: X»** (la de cuya pantalla
usted está), y el resumen ganó **«★ sigue: [nombre]»**, la que el equipo marcó:
**quién sigue lo decide su marca, no el software (B6)**. (3) **Llegadas**: fuera el bloque3
(urgencia aquí — usted señala que el trabajo de parto casi siempre está agendado y el rojo
vive en Hoy y Emergencia) y fuera el bloque4 suelto de la visita — **la visita ahora va
dentro del flujo**: tras «✓ Marcar llegada» se abre su paso con el nombre encabezado —; y
**paciente nueva** con **apellido paterno · materno · nombres por separado, calendario de
fecha (input nativo), de dónde viene, teléfono opcional y CURP opcional**, de modo que al
guardar la **primera prioridad** es «Llenar más datos de la paciente» y «QR para que ella
complete», con «Registrar otra» e «Ir a Hoy» como secundarios. (4) **Pendientes en lenguaje
de sala**: el «todo hallazgo tiene dueño reloj y respuesta firmada» era mi jerga — ahora
**«Lo que falta hacer — hoy»**, y **cada pendiente muestra primero la paciente en grande**,
el qué, «Le toca a:» y el vencimiento. (5) **«Fallas» fuera del riel** (nadie lo busca a diario);
la pantalla vive, enlazada desde Cierre.
**El valor de pendientes (lo que pidió explicar):** es el antídoto de la libreta — el único
lugar donde el sistema dice **de quién es, qué hay que hacer, quién le toca y cuándo
vence**, con cierre que deja nombre y hora: sin él el aviso vive en la cabeza de alguien;
con él, vive en el sistema con reloj. El rediseño no es «mostrar alertas»: es **no dejar
que nada se pierda**.
**Direcciones suyas registradas para próximos pases (no ejecutadas):** (a) **módulo
«Pacientes» con pestañas** (química de esta visita, otros datos, ficha…) que podría
reemplazar pendientes + laboratorio + atenciones — espera su «proceda» de diseño · (b)
**agenda con calendario** en vez de solo lista · (c) **cierre que lo hace solo el
programa** (sin impresión manual) · (d) **respaldo con versionado multi-nodo + correo +
repositorio cifrado** — *ojó: choca con P1 (nada sale del equipo): es decisión roja suya
si la dicta* · (e) **emergencia aún más rápida** · (f) **QR de autohistoria** declarado con
botón y aviso (fase con hardware, contrato pendiente).
**Verificación:** `node --check` verde · sello regenerado.

**B-030 · 2026-10-25 · segunda verificación, punto por punto, con su duda · estado:
un defecto real encontrado y reparado; todo lo demás con evidencia de comando**
Usted reenvió el dictamen porque dudaba de la implementación. Lo verifiqué **uno por uno**:
**1 · Acceso** — `rg` en `acceso.html`: el botón dice literalmente **«Entrar»** (línea 24);
«Entrar al día» ya no existe en la carpeta. **2 · Su duda encontró algo:** verifiqué los
llamados que nacen la alerta y **las tres llamadas traían solo cuatro argumentos — la
paciente salía vacía** (justo lo que usted señaló: «no dice de qué paciente es»): nuevo
hallazgo **H-065**, **reparado el mismo turno** con el quinto argumento (la paciente
abierta), portado al buzón maestro; las alertas de muestra ya traían su paciente. **3 ·
Hoy** — evidencia: el `h1` dice «Hoy», la barra dice «Hoy — fecha» con la **hora grande
(`#hora-hoy`, se actualiza sola)**, el chip de contexto dice **«Paciente abierta»** (nada
de «En atención: Peña» en la barra), el resumen emite **«★ sigue:»** desde la marca
humana, y la frase «las tarjetas se mueven solas» ya no está. **Declaración importante
del diseño:** el riel tiene **una sola definición —en el puente (`montarRiel`)**— que lo
construye al cargar con «Hoy», los dos grupos y **sin Fallas**; el HTML de cada página
guarda solo el respaldo sin JavaScript (DEC-19: sin motor, vuelve a dibujo) — por eso en
el **fuente** de otras páginas aún aparece «▦ El día» estático: no dupliqué el riel en 20
archivos a propósito (era el error que la ronda 1 ya pagó). **4 · Llegadas** — `rg` sin
matches de «Cruzó la puerta» ni «datos de la visita son de hoy»: **los bloques 3 y 4 están
fuera**; presentes: `ap_p`, `ap_m`, `nombres`, `type="date"` (calendario), CURP/tel
opcionales, el paso de visita dentro del flujo, y en el éxito **«Llenar más datos» y «QR»
como primarios**. **5 · Pendientes** — `rg`: el título **«Lo que falta hacer — hoy»** y
`paciente:` en las cuatro alertas + en el nacimiento de toda alerta nueva. **6 · Sus
direcciones** (módulo «Pacientes» con pestañas, agenda con calendario, cierre automático,
respaldo en red/cifrado —que choca con P1 y sería decisión roja suya—, emergencia más
rápida) están registradas en **B-029**, esperando su «proceda» de diseño.
**Verificación:** `node --check` verde · buzón en 65 (portado) · sello regenerado.

**B-031 · 2026-10-25 · verificación total de lógica + sincronización de diagramas + las4
propuestas construidas · estado: entregado**
**1 · Verificación total pedida:** barrido de frases viejas en todo el corpus (los únicos
restos son citas legítimas en crónica: bitácora, auditoría y buzón describiendo lo que
fue) · `node --check` verde · sello en verde · y **los diagramas de `08-FLUJOS/` no
reflejaban sus dictámenes** (grep sin matches de «prioridad», «cuatro datos»): nuevo
hallazgo **H-066, sincronizado el mismo turno** — la norma ahora muestra la puerta con los
cuatro datos y encadenado, el carril con10 campos + estudios + ultrasonido, la prioridad
humana (B6) en la consulta, FL-01/FL-03/FL-13 en v2, y el índice comparativo con la nota
de dictámenes. **También** `REQUISITOS-DEL-DISENO` ganó la sección **N · Dictámenes del
dueño (2026-10-25)** con N1…N7 (Hoy · «Paciente abierta» + ★ sigue · tarjeta B2 ·
llegada en4 bloques · pendientes con paciente · Fallas fuera del riel · urgencia
optimizada pendiente) — portada a la maestra, como todo lo demás de esta ronda.
**2 · Las cuatro propuestas construidas desde cero** (para que juzgue si convienen, sobre el
flujo ya optimizado): `PROPUESTAS.html` (su índice) + **P1 `propuesta-aviso.html`** (cada
pendiente con «Ir a resolver» a su pantalla — AHRQ) · **P2 `propuesta-consulta-preparada.html`**
(antes de sentar: resultados, vencidos, pendientes compilados — AAFP) · **P4
`propuesta-copiar-control.html`** (copiar y marcar «copiado — edítelo si cambió», con
guardado real y chips) · **P6 `propuesta-traspaso.html`** (hoja con «si–entonces»
sugeridos por el equipo e impresión — I-PASS). Cada una con su banda **¿CONVIENE?** y sus
tres opciones de veredicto. Operaciones nuevas en el puente: `preparacion_consulta` y
`copiar_control_anterior` (+`renderCinta` exportada).
**Mi apuesta honesta:** P2 y P1 primero (valor externo más fuerte y tocan médico y
enfermería a la vez); P4 gana minutos en el carril; P6 cierra la continuidad de la tarde.
**Las otras4 propuestas de B-004** (favoritos · orden de enfermería · modo estreno ·
tarjeta de atajos) siguen esperando su elección.
**Verificación:** `node --check` verde · sello regenerado.

**B-032 · 2026-10-25 · auditoría adversarial completa del repositorio · estado: ejecutada,
daños reparados en el turno**
**Qué intenté romper:** las cifras vivas de cada documento · la sincronía local↔maestra ·
los conteos cruzados (RF/RB/FL/piezas/h1) · el orden cronológico de buzón y bitácora ·
los enlaces de las familias nuevas · y el sello mismo (¿prueba lo que dice probar?).
**Qué encontró — severidad ALTA:** (1) **el sello mintió dos rondas** — LEEME decía
«166 archivos» y hay **171** (las4 propuestas y su índice entraron sin actualizarlo), y el
CHECKPOINT v1.2 repetía166 y «64 hallazgos» cuando eran **66** → reparado: sellos en171/66
en LEEME, CHECKPOINT (×2), la reverificación de B-028 y REQUISITOS-DEL-DISENO · (2) **la
maestra se quedó atrás otra vez** — `GUIAS/CONSTRUCCION.md` terminaba en B-028 → re-sincronizado con B-029…B-032, junto con checkpoint, requisitos y buzón (cuatro puertos).
**Severidad MEDIA:** (3) **orden invertido en la cola del buzón** (H-066 y H-065 entraron
antes que H-064 por la línea ancla) → reordenados064→065→066; (4) **H-064 decía «aplanado
pendiente» cuando ya se hizo** → fila actualizada (h3→h2 con estilos conservados, h4→h3);
(5) **conteo «25 piezas» desactualizado** en LEEME, índice, checkpoint y AUDITORIA — hoy la
familia07 tiene **30 piezas** (21 pantallas + cumplimiento + índice de propuestas +4
propuestas +3 recorridos) → corregidos.
**Severidad BAJA:** crónicas con cifras viejas que SÍ son historia (B-021) se dejaron
intactas — la crónica se anota, no se edita.
**Ataques que PASARON sin daño:** RF+RB =48 (cuadra:26+22) · FL =17 ✓ · **un h1 en cada
una de las27 pantallas** ✓ · buzón real =66 en ambos hogares (el «88» de un grep fue
artefacto mío de la barra sin escapar) · `node --check` verde · enlaces de las4 propuestas
a páginas existentes ✓ · `sha256sum -c` verde tras las reparaciones.
**Alternativas evaluadas:** (a) reparar y volver el sello a verdad — **elegida**; (b) dejar
los sellos como crónica — descartada: un sello que miente es peor que no sello (la regla de
verdad por comando de esta casa exige lo contrario); (c) congelar la carpeta — descartada:
la obra sigue viva.

**B-033 · 2026-10-25 · auditoría adversarial de la LÓGICA (no de cifras) en todas las
fuentes de verdad · estado: siete conflictos hallados, seis reparados, uno en su bandeja**
**Qué intenté romper:** que dos reglas de la casa se contradigan · que la costura declare un
enchufe que el puente no tenga · que los diagramas afirman cosas ya cambiadas · que la norma
diga un mecanismo y la construcción otro · que la bandeja se declare «todas» sin haberlas
todas.
**Hallazgos y reparaciones:** **L1 [ALTO] B1 contra B6** — la propuesta de lista ordenaba
«la que más espera a la cabeza»: orden automático por llegada, exactamente lo que su
dictamen B6 prohíbe → **reparado**: B1 lleva su anotación de subordinación a B6 (solo el
molde sigue abierto, no el criterio), en ambas casas · **L2 [ALTO] los diagramas afirmaban
lo ya cambiado** — catorce líneas de cobertura decían «SIN PANTALLA / falta marcador /
H-062 sin cablear» de pantallas que existen → **reparadas** a «cubierto: …» con su pantalla ·
**L3 [MEDIO] la costura divergió del puente** — ocho firmas viejas (`buscar_paciente`,
`listar_pendientes`, `registro_rapido` posicional, `nacer_alerta`, `atender_alerta`,
`guardar_control`, `marcar_urgencia`, `equipo_fuera`) y dos operaciones sin declarar
(`preparacion_consulta`, `copiar_control_anterior`) → **sincronizada** con la
implementación · **L4 [MEDIO] la norma decía «chips al llenar»** contra el «al guardar» de
T2/E1/diagrama/build → **reparado** en ambas casas · **L5 [MEDIO] la bandeja faltaba** de
las direcciones del 2026-10-25 → **Banda IV añadida** (Pacientes, calendario, cierre
automático, respaldo en red —choca con P1, decisión roja—, urgencia rápida, QR) · **L6
[BAJO] el panel de atenciones en crudo** → con mapa de títulos · **L7 [BAJO] B2 «cuatro
cosas» vs doctrina:** verificado que **no** es conflicto (reloj/dueño/marca son decisiones
aparte que suman piezas) — declarado, sin cambio.
**Ataques que PASARON:** §5.3 de FL-13 declarado con su parcial real · «falta registrar»
coincide en `titulos`, contrato y chips · el tablero no sortea por llegada (solo por marca,
B6) · `node --check` verde tras las reparaciones.

---

**Cómo se usa en cada conversación:** al cierre de un turno con decisión, se añade una
entrada B-0xx con su QUÉ, POR QUÉ, puntero y estado — y si es hallazgo, primero la fila
H-0xx. El estado de los módulos se lee en el menú; las reglas, en sus casas; el orden de
la obra, en este archivo.
