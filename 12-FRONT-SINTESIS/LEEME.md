# LEEME — el frontend sintetizado (ronda 3, 12-FRONT-SINTESIS)

> **Qué es:** la tercera ronda de frontend, **sintetizada desde todo el repo**: absorbe lo
> útil de la ronda 1 (cobertura y kit de veredicto), de la ronda 2 (`07-FRONT-NUEVO`: costura,
> cierre firmado, riel de contexto, cumplimiento), de las pruebas de piso (`10-` y `11-`:
> motor de eventos, persistencia, semáforo, prefill, recordatorios) y de **cada crítica
> registrada** en `COMPARATIVA.md`, `HALLAZGOS.md` y `AUDITORIA-ADVERSARIAL-PRUEBAS.md`.
> Es papel con motor (DEC-19): nada se vuelve software sin doble veredicto. Fecha: 2026-10-25.

## Cómo se lleva la sesión (25–30 minutos)

1. Abra `hoy.html` (o `INDICE` no existe aquí: el día es el índice). Sirva con
   `python3 -m http.server` en esta carpeta si quiere clipboard de recordatorios.
2. Frase de apertura: «esto es un dibujo que se puede tocar; no es el software ni guarda
   datos de pacientes reales; si algo no le sirve, dígalo y se cambia en papel».
3. Recorran el **orden del día** en 10 pasos: Hoy → Llegadas → Estación →
   Laboratorio → Consulta → La urgencia → Pendientes → Atenciones → Agenda → Cierre.
   Cada pantalla tiene su banda de pregunta y su casilla.
4. Al final, impriman la `HOJA-DE-VEREDICTO.html`: **veredicto doble**, dos firmas del oficio.
5. Para repetir: **Hoy → «Reiniciar la jornada»**.

## Las críticas a los previos frontend — y dónde vive cada respuesta

### A · Las que dijo el dueño («mal e incompleto», ver `COMPARATIVA.md`)

| Crítica | Respuesta en esta ronda |
|---|---|
| «Estados escritos a mano que prometen moverse y no se mueven» | **Ningún estado está en el HTML.** Todo se deriva replayando eventos (`motor.js`, `estadoDe`); los contadores del tablero se calculan en vivo |
| «Nada se persiste: al navegar se pierde todo» (H-089) | El día completo vive en `localStorage` con clave propia: registrar, pausar, firmar y navegar **no pierde nada**; «Reiniciar» es el único que borra |
| «La barra de 15 enlaces / navegación por organigrama» | Riel de **dos grupos reales** (Jornada · Del consultorio) + **menú de contexto** de la paciente en la barra superior: buscar ≠ estar |
| «Cobertura corta: faltan laboratorio, urgencia, ficha, historia, protocolos, calculadoras, acceso, falla…» | Pantallas nuevas completas: **laboratorio, la urgencia, ficha, historia, calculadoras, documentos, falla, sistema** — con `CUMPLIMIENTO.html` diciendo con honestidad qué RF queda PARCIAL o DECLARADO |
| «Sin instrumento de veredicto por rol» | `HOJA-DE-VEREDICTO.html` imprimible de una página con **veredicto doble** (dos firmas), más la banda en cada pantalla |
| «El circuito insignia sin cablear: guardar control no genera alerta» (H-062) | `guardarControl` nace alertas **después** de guardar: TA, tríada de banderas, bandera por bandera — y una alerta tipo 4 **mueve la tarjeta al frente** (P-06) |
| «La estación dibuja 9 campos y R-14 exige 10» (H-063) | 10 campos y 9 banderas reales, contados en la propia pantalla |
| «El puente no implementa su catálogo» (H-061) | El motor es **la única puerta**: las pantallas no calculan ni escriben estado propio; `CUMPLIMIENTO.html` mapea cada RF a la página que lo ejercita |

### B · Las de la auditoría adversarial a 10/11 y 07 (`AUDITORIA-ADVERSARIAL-PRUEBAS.md`)

| Hallazgo | Reparación viva en este frontend |
|---|---|
| P-01 origen del HOMA invertido | El origen se calcula del estado real del campo: `readOnly ⇒ capturado`, editable ⇒ `calculado` |
| P-02 la cita «1 clic» caía en el pasado y no salía de «por recuperar» | `crearCita` guarda **fecha real**; «por recuperar» compara por `fechaISO >= hoy` |
| P-03 «retomar» destruía el borrador | `borradorEstacionDe` busca el borrador **por evento/aten­ción**, no por el estado actual: retomar desde Atenciones o desde la estación restaura igual |
| P-04 cierre de alerta sin firma (regresión de B-013) | `cerrarAlerta` **exige nombre y cédula**, o anclaje a nota firmada. Sin firma no se cierra, en Pendientes y en La urgencia |
| P-05 VENCIDO y ESCALADO eran camino muerto | La semilla trae un plazo vencido y la semántica de tipo 2 crea plazo: **VENCIDO** se ve en Pendientes y **ESCALADO** en Agenda y Cierre |
| P-06 alerta tipo 4 no movía la tarjeta | `nacerAlerta(tipo 4)` dispara el evento `urgencia`: tensión crítica o glucosa 130 **suben al frente solas** |
| P-11 «referida» contaba como atendida | Nuevo estado **`referida`**, columna propia en el tablero y bloque propio en el traspaso |
| P-12 marcas por defecto en el cierre anclado | Ningún checkbox viene marcado: marcar es un gesto afirmativo |
| P-13 la prescripción bloqueaba contra la ley R-37 | **Informa y nombra el riesgo, nunca bloquea solo**: modal con el riesgo por su nombre y «mantengo (queda registrado)» |
| P-14 umbrales dentro del código | Todos los clínicos viven en **`CATALOGO`** como *borrador firmable*, declarados en `sistema.html`; la firma del médico es la que los vuelve reales |
| P-15 `motor.js` duplicado en dos carpetas | **Un solo motor** para las 18 pantallas |
| P-16 nombres sin coma rompían recordatorios | Helpers `nombrePropio`/`apellido` toleran cualquier formato |
| P-17 «reparaciones» sin trazabilidad | El pie de cada pantalla cita FL/RF/B y `CUMPLIMIENTO.html` los audita |
| P-19 fecha y día escritos a mano y equivocados | **Fecha y reloj reales**: el encabezado usa `toLocaleDateString`, el reloj corre en tiempo real |
| P-20 las urgencias se enterraban al final | Orden de pendientes: **tipo 4 primero**, y el tablero con urgente al frente |
| P-23…P-28 de 07 (nota desechada, `puente.contexto()` inexistente, API muerta, riel sin Fallas, enlace muerto, prefill decorativo) | La nota **se guarda firmada con autor y cédula**; el contexto viaja por helper propio; toda operación usada existe; el riel apunta a pantallas que existen todas; el prefill **rellena de verdad** (HOMA 0 tecleos, IMC desde el control); sin enlaces muertos |
| P-29 el paseo sin cita se quedaba atrapado | `visita_completa ⇒ espera`: registrar a quien llega sin cita siempre termina en la espera, con reloj, y de ahí a la estación |

### C · Las doctrinarias (casas de verdad)

| Regla de la casa | Cómo se ejercita aquí |
|---|---|
| FL-01 encender es ver el día | `hoy.html` es la primera pantalla; nada de índice inicial |
| FL-04 «no llegó» solo al vencer la cita | Derivado en `estadoDe` (`cita + 45`), nadie lo marca |
| FL-05 guardar nunca bloquea; alertas después | El control se escribe primero; el panel de avisos sale después |
| FL-06 pausa con retorno exacto, «en uso de X», sin tope | `atenciones.html` con dueño, borrador y toma por emergencia registrada |
| FL-08 la urgencia sube al frente y termina en voz | Manual o automática; «llame de VOZ» en la propia tarjeta de aviso |
| O3 todo aviso nace con dueño | `nacerAlerta` no acepta avisos sin dueño |
| B-013 / RB-05 | Firma obligatoria o ancla a nota; dedupe `(paciente, texto)` solo pendiente |
| DEC-27 semáforo informa, nunca dictamina | Estados normal/alerta/crítica/sin dato; sin catálogo ⇒ gris |
| DEC-32/33 recordatorios sin cifras, estado deducido, entrega humana | Plantillas sin valores; copiar/entregar/anular; ESCALADO por fecha, no por botón |
| R-41 lo derivable nunca se captura | Próximo control desde el catálogo de situaciones; «por recuperar» con cita 1 clic |
| R-43 prefill, cero captura doble | HOMA desde el laboratorio con 0 tecleos; IMC desde el último control; el origen del cálculo queda registrado |
| Ley R-37 el aviso informa, nunca bloquea | La única salida que detiene es la interacción, y aquí **ni esa**: informa, pide lectura del riesgo y registra lo forzado |

## El nuevo flujo de trabajo (así se construyó y así se sigue)

1. **Absorber** — de cada casa lo que ya está decidido: la ley (`05-LEY`), los FL
   (`REQ-FLUJO.md`), los RF/RB (`REQUISITOS-FRONT-BACK.md`), los contratos (`03-CONTRATOS`).
2. **Sintetizar** — un solo motor (`motor.js`) con la costura declarada en
   `COMUNICACION.md`: las pantallas solo llaman al motor; el motor es el único que guarda.
3. **Reparar antes de mostrar** — cada hallazgo abierto (H-061…H-095, P-01…P-29) tiene su
   reparación viva en este HTML: la prueba es la reparación, no la promesa.
4. **Veredicto doble** — banda por pantalla + hoja imprimible con dos firmas. Una sola
   opinión es insumo; dos del oficio son aprobación (DEC-19).
5. **Lo que queda abierto se dice en voz** — ver abajo.

## Los límites honestos (léalos en voz alta)

- **No es el software.** Sin JavaScript, cada página vuelve a su cara de dibujo. No hay
  disco, red, ni escritor único: el estado vive en este navegador.
- **Datos de mentiras.** 18 pacientes ficticios precargados. Cero datos reales.
- **Catálogos de demostración.** Rangos, umbrales e interacciones están sembrados «como si
  firmados» (viven en `CATALOGO`, no en la lógica); los reales los firma el médico.
- **Lo que esta sesión NO ejercita** (y `CUMPLIMIENTO.html` lo marca DECLARADO): PIN de
  acceso (R-26), las 16 calculadoras restantes, los analitos de R-38 que faltan, la apertura
  real de documentos, y el cruce de dos roles sobre el mismo día (enfermería y médica
  comparten motor y jornada: esta ronda sí es **una sola** jornada compartida, no dos
  carpetas aisladas).
- **Decisiones abiertas que no se tomaron aquí** (pertenecen al dueño): la prioridad de la
  lista de avisos (urgencias primero sí, pero «primero lo verde» era una propuesta de 11);
  la meta de fatiga <2 (cifra huérfana); columnas vs. lista priorizada en el tablero.

## Cómo probarlo en 4 minutos (las reparaciones, en vivo)

1. **Hoy** — vea el reloj real y los contadores solos. Filtre en mente: Gabriela está al
   frente porque su alerta es tipo 4; la tarjeta de Perla dice «no llegó» **sin que
   nadie la marcara**.
2. **Llegadas** — registre a «Ruiz Castro, Ana»: si su apellido parece a otro, pregunta
   antes. Después de guardar, la tarjeta aparece **en espera con su reloj corriendo**.
3. **Estación** — elija a Brenda, ponga TA 165/105 y las banderas cefalea + visión +
   hinchazón: al guardar (sin bloqueos) nace la alerta roja **y su tarjeta sube al frente**.
4. **Laboratorio** — ponga glucosa 130 a quien quiera: **CRÍTICA** y aviso tipo 4 de una vez.
5. **Consulta (María)** — prescriba amoxicilina: es alérgica a penicilina; el aviso nombra
   el riesgo y **no bloquea solo**: o cambia, o mantiene y queda registrado. Cierre la nota
   sin escribir dos veces: los avisos se cierran **anclados** a su firma.
6. **Pendientes** — intente cerrar un aviso sin nombre y cédula: **no cierra**. Vea la
   hemoglobina con plazo vencido: **VENCIDO — sube al tablero**.
7. **Agenda** — «por recuperar» con 1 clic crea la cita en **su fecha derivada**; copie un
   recordatorio: sale sin cifras ni diagnósticos.
8. **Cierre** — imprima el traspaso: verá referidas separadas de atendidas, avisos
   vencidos, recordatorios escalados y el respaldo marcado PENDIENTE si no se ensayó en
   Fallas.

## Análisis previo del módulo de Atenciones

`ANALISIS-ATENCIONES.md` — el análisis del módulo de atenciones concurrentes contra toda
la lógica destilada del repo (agenda + 07/10/11 + auditorías): hallazgo estructural
reproducido con salida de comando (doble riel estado↔objeto divergente: Estela y María
invisibles en la pantalla), inventario de 14 mejoras con su origen por iteración y
backlog M1…M10 con prueba asignada a cada una. **Aplicado en §7**: módulo
reescrito (lista fusionada, relojes, métrica, bitácora, catálogo) + las 8
consideraciones vitales CV1…CV8 que la implementación destapó (borradores que
cruzaban tipos, urgencia con atención propia, migración por reconciliación y no
por reset, suites embebidas = verde falso).

**Versión del frontend: V4** (genealogía en `VERSIONES.md`; sello V4·S1 en cada pantalla, exigido por la suite).

## Las pruebas de esta ronda (en verde el 2026-10-25)

- `pruebas/pruebas-motor.js` — 32 pruebas de comportamiento; **carga el motor desde
  disco** (una copia embebida daría verde falso): `node pruebas/pruebas-motor.js`
- `pruebas/pruebas-atenciones.js` — 33 pruebas del módulo de atenciones: conciliación
  hechos↔objetos, reparación de huérfanos y faltantes, roundtrip pausa/retoma campo por
  campo, métrica con clamps, catálogo de tipos y las consideraciones CV1/CV2/CV3/CV4
- `pruebas/pruebas-e2e.js` — 95 checks de las 18 pantallas con jsdom (sin errores,
  riel, banda, h1 único, y los 5 flujos completos)
- `pruebas/pruebas-e2e-atenciones.js` — 19 checks de RUPTURA del módulo: las tres
  invisibilidades de la semilla, rechazo accionable, pausa sin navegar, y la
  desincronización forzada → «Sincronizar» en un clic

- `pruebas/pruebas-registro.js` — 22 checks de la **suite del libro** (Ronda S-1
  endurecida): registro = disco = síntesis = patrones = suites, evidencia con ancla `§`,
  anti-regresión por versión (fila vieja ⇒ «DESACTUALIZADA»), **conteos EN VIVO** de las
  cuatro suites (motor/unidad siempre; e2e con servidor 8123 y si no, SKIP declarado),
  piloto sin retrocesos, cifras de pantallas = 18 en locales y por bloque en el raíz, y
  las pruebas reales de MG-05/MG-06/MG-07.

**El total vivo manda `../autoauditoria.sh`** (T1 por iteración / T2 completo): las suites de esta carpeta no hardcodean totales — el número vive en la salida del comando, no en la prosa. Las e2e necesitan jsdom (`cd pruebas && npm install`,
declarado en `pruebas/package.json`) y servidor local (`python3 -m http.server 8123`).

## Síntesis sumatoria gradual (protocolo S1)

Todo lo adquirido en las iteraciones y auditorías quedó destilado en tres artefactos que
**gobiernan el trabajo de aquí en adelante**, pantalla por pantalla:

- **`SINTESIS-SUMATORIA.md`** (S1) — la síntesis versionada: 13 patrones de **modelo
  lógico** (ML), 12 de **técnico** (MT), 10 de **gubernamental** (MG), cada uno con
  origen, «aplicado cuando» y su prueba; más el **protocolo de 7 pasos** por pantalla y
  las reglas de transición de estado.
- **`SINTESIS-REGISTRO.json`** — el libro-verdad: una fila por pantalla con
  `pendiente → aplicado → verificado → auditado`, versión de síntesis absorbida,
  pruebas, conteos y evidencia. Hoy: **atenciones verificado (S1)** · 17 en cola.
- **`pruebas/pruebas-registro.js`** — la suite del libro: registro = disco = síntesis;
  exige evidencia completa desde «aplicado», piloto sin retrocesos, y que **ningún
  documento mienta sobre el conteo de pantallas** (su primera corrida ya cazó tres
  cifras falsas de «19» y dos de «15»).

**Autoauditoría en cada iteración (regla del dueño):** `../autoauditoria.sh` —
`./autoauditoria.sh` (T1, segundos: sintaxis + suites de nodo + **libro con trampa de
huella** + enlaces; correr tras cada cambio) · `./autoauditoria.sh --completo` (T2: + todas
las e2e con servidores propios y conteos en vivo; antes de declarar un estado). El
registro **v2** guarda `sha256` de las 18 pantallas **y** de `motor.js`/`config.js`/
`front.css`: editar sin registrar cae en rojo solo (probado). Ronda de hallazgos: solo
cuando T1/T2 rompen o cierra un hito.

**Qué sigue (plan registrado):** `PLAN-DE-IMPLEMENTACION.md` — cinco frentes
(configuración compartida en el motor · cola de 16 filas · verificación dedicada por
pantalla · decisiones N del dueño · extensión del registro a componentes y otras
carpetas) con hitos y su definición de «terminado».

**Auditoría del propio mecanismo:** `AUDITORIA-SINTESIS.md` (Ronda S-1: 14 hallazgos
G-01…G-14 con cierre — libro que mintió, anti-regresión sin cablear, conteos que no se
medían, cinco cifras muertas —, verificación negativa G-15 y decisiones N-S1…N-S3).

**Anti-regresión:** la síntesis se versiona, no se edita en silencio. Al pasar a **S2**,
toda fila con `sintesis: S1` queda marcada como desactualizada y vuelve a la cola.
Al aplicar a una pantalla: leer S1 §2 → auditar → aplicar → probar (4 planos) →
registrar con conteos → `node pruebas/pruebas-registro.js` en verde → nota en el LEEME.

## El mapa

`hoy` (FL-01,04,10) → `llegada` (FL-03) → `estacion` (FL-05, R-14) → `laboratorio` (FL-07) →
`consulta` (FL-09, R-17/36) → `urgencia` (FL-08) → `pendientes` (FL-13, B-013) →
`atenciones` (FL-06) → `agenda` (FL-02, R-48/41) → `cierre` (FL-15) · con `ficha` (RF-03),
`historia` (RF-17), `calculadoras` (R-43), `documentos` (FL-17), `falla` (FL-14),
`sistema` (dueño) y `CUMPLIMIENTO` (el mapa RF por RF) colgando del riel y del menú de
contexto. Un motor (`motor.js`), una costura (`COMUNICACION.md`), un veredicto (doble).
