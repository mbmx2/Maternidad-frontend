# AUDITORÍA DE LA SÍNTESIS — Ronda S-1 (2026-10-25)

> **Qué se audita:** todo lo que la propuesta de «síntesis sumatoria gradual» involucra —
> su **lógica** (los patrones ML/MT/MG), su **gobernanza** (registro, estados,
> versiones, evidencia), su **propuesta** (protocolo y documento S1), su **aplicación**
> (piloto atenciones + estacion tocada) y su **verificación** (las suites y el mapa del
> repo). Severidades: ALTO (engaña el libro o rompe la anti-regresión) · MEDIO (contradice
> su propia regla) · BAJO (menor). Cada hallazgo con **cierre declarado** (técnico o
> decisión). Máxima del round: *el auditor auditado por su propio mecanismo* — la suite
> del libro corrió desde su primera versión y fue la que cazó la mitad de esto.

---

## G-01 · [ALTO] El libro mintió: `estacion.html` estaba tocada y figuraba `pendiente`

**Hallazgo:** `estacion.html` se modificó a las 15:03 de hoy (M5: autosave del
borrador — parte del piloto) y el registro la mantenía `pendiente`. El mecanismo
recién nacido ya incumplía su regla madre (MG-01: una fila por pantalla con lo que le
pasó). **Cierre técnico:** fila pasada a `aplicado` con `sintesis S1`, pruebas que la
cubren, `checks {e2e_paginas: 95}`, evidencia `ANALISIS-ATENCIONES.md§7` y **nota
explícita de la deuda** (su ruptura dedicada de autosave, G-14). **Regla derivada:** el
validador exige evidencia completa desde `aplicado`, y toda pantalla cuya mtime supere
a la de su fila debe aparecer tocada — lo primero ya lo exige; lo segundo se vigila con
la costumbre del paso ⑤ del protocolo.

## G-02 · [MEDIO] `atenciones.html` mutaba estado directo reclamando MT-01

**Hallazgo:** `S.equipoFuera = !S.equipoFuera` en la pantalla (`atenciones.html:53`)
mientras su fila reclamaba `MT-01` (motor = única puerta). La pantalla probada no cumplía
el patrón que decía tener. **Cierre técnico:** `Jornada.alternarEquipo()` en el motor
(con su evento) y la pantalla lo usa; `node --check` y suites en verde. **Declarado:**
`hoy.html:111` arrastra el mismo defecto — su fila está `pendiente` y debe cerrarlo en
su pasada (quedó escrito aquí para que no se olvide).

## G-03 · [MEDIO] Doble fuente de la cola: el documento duplicaba el orden del registro

**Hallazgo:** `SINTESIS-SUMATORIA§3` enumeraba la cola completa mientras decía «el
registro es la verdad»: dos fuentes para el mismo orden = mentira futura garantizada.
**Cierre técnico:** la enumeración se eliminó; el registro es la **fuente única** y el
documento apunta a él.

## G-04 · [MEDIO] MG-05/06/07 anunciaban pruebas que no existían

**Hallazgo:** «recuento de rondas», «presencia de la lista N» y «suite documental del
repo» eran aspiraciones en la columna Prueba — justo lo que esta casa castiga. **Cierre
técnico:** las tres celdas ahora apuntan a reglas **implementadas** en
`pruebas-registro.js` (§7): existencia de `AUDITORIA-SINTESIS` con «Ronda S-1», de la
escuela con «Ronda 6», de decisiones abiertas en `LOGICA` y aquí, y de la mención del
protocolo en `INDEX` y `LEEME` raíz. La prueba de la promesa, no la promesa.

## G-05 · [ALTO] La anti-regresión por versión NO estaba cableada

**Hallazgo:** el validador comprobaba que `sintesis_version` del registro igualara al
documento, pero **jamás comparaba `fila.sintesis` con la versión vigente**: al pasar a
S2, todas las filas dirían «S1» y el libro seguiría en verde — la promesa central del
mecanismo era decorativa. **Cierre técnico:** regla nueva: toda fila no-pendiente con
versión ≠ vigente ⇒ **FAIL «DESACTUALIZADA»** (la pantalla vuelve a la cola en rojo).

## G-06 · [ALTO] Los `checks` registrados no se comparaban con la salida viva

**Hallazgo:** el registro guardaba `32/33/95/19` y nadie los volvía a medir: si una
suite cambia, el número envejece en silencio. **Cierre técnico:** conteos **en vivo** en
la suite del libro: motor y unidad corren siempre y su PASS real debe igualar al
registrado; las e2e corren cuando responde el servidor `8123` y si no, **SKIP declarado**
(«conteos e2e NO verificados en esta corrida» — nunca un verde callado).

## G-07 · [MEDIO] El schema no tenía dónde registrar una auditoría

**Hallazgo:** MG-05 exige que `auditado` traiga su ronda con hallazgos cerrados, pero
la fila no tenía campo ni regla. **Cierre técnico:** `auditoria` documentado como
obligatorio para `auditado` en la nota del registro + regla que falla sin archivo
existente. **Decisión abierta N-S1** (ver §Decisiones): quién autoriza la transición.

## G-08 · [BAJO] Filas duplicadas pasaban en verde

**Cierre técnico:** regla de unicidad de `archivo` en el validador.

## G-09 · [BAJO] La ancla de evidencia (`archivo§7`) solo verificaba el archivo

**Cierre técnico:** ahora exige que el archivo contenga literalmente `§7` — una
evidencia que apunta a una sección inexistente es evidencia falsa.

## G-10 · [MEDIO] El LEEME raíz no mencionaba el protocolo (MG-07 incompleto)

**Cierre técnico:** cláusula añadida en la entrada de `12-FRONT-SINTESIS` del `LEEME.md`
raíz + regla de la suite que lo vigila.

## G-11 · [ALTO] El LEEME raíz decía «19 pantallas» — hay 18

**Hallazgo:** cifra heredada de la creación de la ronda, nunca verificada (la misma
clase de error que la reauditoría de 12-AGENDA cazó tres veces). **Cierre técnico:**
corregido a 18 **y** regla de cifras ampliada a los documentos raíz con alcance por
**bloque**: solo se exige 18 dentro de la entrada de `12-FRONT-SINTESIS` (el raíz
describe muchas carpetas: «21 pantallas» de 07 o «6» de 10/11 son legítimos — acotar
mal habría sido un falso positivo fabricado).

## G-12 · [MEDIO] Tres cifras falsas «19» en los documentos locales

**Hallazgo:** `LEEME.md:144` y dos en `ANALISIS-ATENCIONES.md` — cazadas por la suite
del libro en su primera corrida. **Cierre técnico:** corregidas a 18; regla de cifras
locales permanente. (Con G-11: **cinco** cifras muertas del mismo tipo, todas hoy
vigiladas.)

## G-13 · [BAJO] El schema del registro no explicaba sus propios campos

**Cierre:** `nota` del registro actualizada con la semántica de estados y del campo
`auditoria`. Además el documento ganó **Historial de versiones** (§6): la versión se
agrega, nunca se reescribe.

## G-14 · [BAJO/DECLARADO] Autosave sin ruptura dedicada

El M5 de `estacion.html` se probó por roundtrip en el motor y por E2E de página, pero
sin un caso de ruptura que teclee → autoguearde → pause desde Atenciones. **No se
arregla a escondidas:** quedó como **deuda en la fila** (`nota` de estacion) para su
pasada de `verificado`. **Decisión abierta N-S2.**

## G-15 · [VERIFICACIÓN NEGATIVA] Lo que se comprobó y SÍ está bien

Una auditoría honesta también registra lo que no falló:

- `cerrarAlerta` del motor **exige nombre y cédula** (ML-11/MT-02) y `pendientes`/`urgencia`
  los recolectan y los pasan — el cierre firmado de la ronda 3 sigue íntegro.
- Las suites de este folder **cargan el código desde disco** (MT-09): `readFileSync`,
  cero copias embebidas — la lección CV6 quedó instalada.
- Conteos vivos verificados en esta ronda: **motor 32 · unidad 33 · e2e 95 · ruptura 19**
  = exactamente lo registrado.
- Piloto `atenciones`: patrones ML-05/09/12, MT-01/02/03/05/06/07/09/10/12 — todos
  verificados con prueba (lista completa en `SINTESIS-REGISTRO.json`).
- `pruebas-e2e-atenciones` y `pruebas-atenciones` siguieron en verde tras los cambios de
  esta ronda: los cierres G-01/G-02 no rompieron nada (179+ checks de regresión).

---

## Decisión abierta (para MG-06)

- **N-S1** · ¿Quién autoriza las transiciones de estado del libro: auto-declaración con
  evidencia (hoy) o firma del dueño por cada `aplicado → verificado`? La casa exige
  doble veredicto para *pantallas* (MG-09), no para *registros* — pero conviene que el
  dueño diga si el registro también firma.
- **N-S2** · Ruptura dedicada del autosave: en la pasada de estacion (recomendado) o
  agregarla ahora al E2E de módulo.
- **N-S3** · Alcance del protocolo: ¿una sola `SINTESIS-REGISTRO` por carpeta (§5, hoy)
  o un registro maestro al inicio del repo cuando entre 12-AGENDA y 07?
- Heredadas de la carrera 12 (N1…N7, `LOGICA-DE-MENSAJES§11`): firma del catálogo,
  diagnóstico estructurado, pacientes de prueba, horario editable, intentos bloqueados,
  tono del duelo, frecuencia semanal.

---

## Verificación de la Ronda S-1 (salida de comandos)

```
node --check motor.js · pruebas/pruebas-registro.js        → OK
node pruebas/pruebas-registro.js                            → TODO OK (suite endurecida)
   · 18 pantallas disco = registro · sin duplicados
   · toda fila activa: versión vigente · evidencia · ancla § · patrones · suites
   · contadores EN VIVO: motor 32 = 32 · unidad 33 = 33 · e2e 95 = 95 · ruptura 19 = 19
   · piloto atenciones verificado/S1 · cifras = 18 en 3 locales + bloques raíz
   · MG-05/MG-06/MG-07 ejecutadas (auditorías, decisiones, mapa)
Suites del folder: motor 32 · atenciones 33 · registro (≥21 PASS) · e2e 95 · ruptura 19
Estado del libro: 2 aplicadas/verificadas (atenciones, estacion) · 16 en cola · S1
```
