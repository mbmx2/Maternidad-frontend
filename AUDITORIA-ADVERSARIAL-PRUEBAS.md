# AUDITORIA ADVERSARIAL — lógica del repositorio y comparativa: carpetas 10/11 vs. lo que ya ofrecemos

> **Qué es:** auditoría adversarial de la lógica de todo el repositorio, con foco en las dos
> carpetas añadidas (`10-PRUEBA-ENFERMERIA/`, `11-PRUEBA-MEDICA/`) contrastadas contra
> **lo que ya ofrecemos** en `07-FRONT-NUEVO/` y contra la verdad declarada
> (`02-LOGICA-DE-DISENO/`, `03-CONTRATOS/`, `05-LEY/ACTA_FRONTEND.md`,
> `06-FUENTE-BACKEND/`, `04-METODO-Y-ACEPTACION/`). Fecha: 2026-10-25.
> Método: lectura completa de `motor.js` (513 líneas, idéntico por md5 en ambas carpetas),
> de las 12 pantallas de las carpetas 10/11, de `puente.js` (1251 líneas) y de las casas
> de verdad. Los defectos se registran **antes** de repararlos (regla del repo). Los IDs
> **H-067…H-092 son propuestas de alta** en `04-METODO-Y-ACEPTACION/HALLAZGOS.md`
> (buzón vigente: H-001…H-066); no se tocó ese archivo.

---

## 1 · Veredicto ejecutivo

1. **Las carpetas 10/11 traen el mejor motor que tiene hoy el repo.** `motor.js` es una
   máquina de estados **derivada de eventos** (los estados se recalculan replayando la
   bitácora, `motor.js:168-193`), **persistente en `localStorage`** (`motor.js:140-150`) y
   con reglas de flujo vivas que en `07-FRONT-NUEVO` solo existían como promesa: «no llegó»
   que se enciende solo (`motor.js:190`), borrador de estación que se restaura
   (`03-ESTACION.html:102-116`), dueño y toma por emergencia de una atención
   (`05-PAUSA.html:129-143`), semáforo de laboratorio con banda y «escrito tardío»
   (`04-LABORATORIO.html:81-105`), HOMA-IR con 0 tecleos (`05-CALCULADORES.html:61-79`),
   fecha de próximo control derivada (`motor.js:241-249`) y recordatorios con entrega,
   anulación y estado deducido (`motor.js:353-374`). **Eso es lo rescatable y debe
   absorberse hacia el frontend real.**
2. **Pero las carpetas también introducen regresiones duras contra la doctrina que
   predican**: el cierre de alertas **perdió la firma (nombre y cédula)** que `puente.js`
   sí exige (`puente.js:383-385` vs `motor.js:260-271`); una alerta **tipo 4 no mueve la
   tarjeta al frente** (§3, P-06); el «ESCALADO» de recordatorios es **camino muerto**
   (P-05); la prescripción **bloquea** el guardado pese a que la ley R-37 dice «aviso no
   bloqueante» (P-13); y hay defectos funcionales duros: origen del HOMA **invertido**
   (P-01), cita creada «con 1 clic» **a una hora en el pasado que no sale de «por
   recuperar»** (P-02) y la restauración de estación **rota por uno de sus dos caminos**
   (P-03).
3. **`07-FRONT-NUEVO` sigue cargando su propia deuda** (H-061/062/063 ya registrados,
   más las nuevas P-15…P-22): nada persiste entre páginas, `puente.contexto()` revienta,
   la nota de consulta se desecha, media docena de operaciones nadie las llama.
4. **El repo quedó con dos sistemas de diseño y dos motores paralelos sin costura entre
   sí** (`estilo.css` ≠ `front.css`; `motor.js` ≠ `puente.js`), y **INDEX.md ni siquiera
   menciona las carpetas 10/11** (P-23): la traza flujo→lógica→contrato→dibujo que la
   casa predica no cubre los entregables nuevos.
5. **Recomendación:** (a) reparar P-01…P-14 en 10/11 **antes** de cualquier sesión con el
   oficio — dos de ellas harían fallar la prueba en vivo tal como el LEEME la programa;
   (b) trasladar el patrón de `motor.js` (eventos + estados derivados + persistencia) al
   `puente.js` del frontend real; (c) **no** arrastrar a 07 las regresiones (cierre sin
   firma, tipo 4 estático); (d) unificar catálogos clínicos como **borrador firmable**,
   hoy están sembrados dentro del código en ambas rondas (P-14).

---

## 2 · Qué ofrecen las carpetas 10 y 11 (inventario de lógica)

| Pieza | Qué ofrece | Cómo lo hace |
|---|---|---|
| `config.js` + `motor.js` | Sesión independiente por rol, con su propia clave de jornada y su propio día de 18 pacientes | `JORNADA_KEY` distinta por carpeta (`config.js:2`); semilla fija de 18 (`motor.js:54-137`) |
| 10 · `01-TABLERO` | 9 columnas, relojes 30/45, resumen derivado, equipo fuera, reinicio | Filtros por estado (`01-TABLERO.html:37-47`); `resumenDia` (`motor.js:329-339`) |
| 10 · `02-LLEGADA` | Registro de paciente (una vez) + visita de hoy (6 datos), homónimas con pregunta, reagendar no-llegados, completar ficha de urgencia | Modal que nunca fusiona solo (`02-LLEGADA.html:107-118`); evento `reagendada` (`:75-82`) |
| 10 · `03-ESTACION` | R-14 completo: 10 campos + 9 banderas explicadas, chips al llenar, guardar nunca bloquea con confirmación, pausa con borrador | `restaurarBorrador` (`:102-116`); tríada dispara tipo 4 + urgencia (`:155-161`) |
| 10 · `04-LABORATORIO` | 5 analitos de catálogo, banda, alerta nacida, «escrito tardío» honesto | `evaluarBandaLab` (`motor.js:213-223`); `nacerAlerta` en crítico/alerta (`04-LABORATORIO.html:93-99`) |
| 10 · `05-PAUSA` | Atenciones con dueño, pausa/retorno, «en uso de X», toma por emergencia con registro | `S.atenciones` + eventos (`:116-143`) |
| 10 · `06-CIERRE` | Traspaso calculado e imprimible, recordatorios con entrega/anulación, drill de respaldo | `cierreData` (`motor.js:340-352`); `window.print()` (`06-CIERRE.html:100-129`) |
| 11 · `01-TABLERO` | Mismo tablero filtrado al rol + métrica de fatiga + chip de avisos por tarjeta | `metricaFatiga` (`motor.js:281-286`); `alertasDe` por tarjeta (`01-TABLERO.html:54-56`) |
| 11 · `02-CONSULTA` | Cinta con datos que salvan, chips auto-calculados, semáforo, prescripción verificada, nota que cierra avisos anclados y deriva próximo control | `resolverChips` (`motor.js:293-319`); cierre anclado (`02-CONSULTA.html:147-168`) |
| 11 · `03-ALERTAS` | Los 6 tipos declarados, pendientes con acción/dueño/reloj, detalle clínico a un clic, fatiga | `avisoHTML` con `details` (`motor.js:482-495`) |
| 11 · `04-URGENCIA` | Marcar urgencia solo con pacientes presentes (reparación C-3), resolución referida/anclada, limpia el chip | Filtro de presencia (`04-URGENCIA.html:68-81`); `cierra()` borra marcador (`:60-67`) |
| 11 · `05-CALCULADORES` | HOMA-IR con prefill 0 tecleos, lista cerrada de 18, cálculo guardado con origen | `pintaHoma` (`:61-87`); `homa()` (`motor.js:231-240`) |
| 11 · `06-AGENDA` | Fecha derivada del protocolo, recordatorio sin cifras con entrega/anulación/escalado, «por recuperar» con cita 1 clic | `recordatorios()` (`motor.js:353-367`); `proximaFechaControl` (`:241-249`) |
| Ambas | Banda de veredicto por pantalla + hoja imprimible de una página por rol + frase de apertura y límites leídos en voz alta | `bandaVeredicto` (`motor.js:427-455`); `HOJA-DE-VEREDICTO.html`; `INDICE.html:29-35` |

---

## 3 · Hallazgos adversariales — carpetas 10/11 (propuesta de alta H-067…)

**P-01 (ALTO) · H-067 — El origen del HOMA queda invertido.** El flag se calcula como
`conPrefill = !readOnly` (`05-CALCULADORES.html:104`): si los campos venían del expediente
(readonly = true) guarda origen «calculado (entradas a mano)»; si el usuario tecleó a
mano (readonly = false) guarda «capturado (prefill del expediente)» (`:105,:111`). El
expediente miente sobre de dónde salió el número —justo lo que R-43 (`ACTA_FRONTEND.md:349`)
exige registrar bien.

**P-02 (ALTO) · H-068 — «Crear cita con 1 clic» crea la cita a las 10:00 de la mañana y
no sale de «por recuperar».** `S.agenda.push({ min: 600, … })` (`06-AGENDA.html:84`) fija
la hora a 600 (10:00), que con el reloj de la sesión (arranca 12:05) es **pasada**: la cita
recién creada aparece en «citas ya atendidas hoy» (`:37-39`) y el filtro «por recuperar»
exige `a.min > ahoraMin()` (`:71`) —nunca se cumple—, así que el paciente **sigue** en
«por recuperar» pese al toast «ya no aparece en por recuperar». La prueba C del LEEME de
la médica falla en vivo.

**P-03 (ALTO) · H-069 — La restauración del borrador tiene caminos contradictorios: el
botón «▶ Retomar» la destruye.** `05-PAUSA.html:91-100` dispara `estacion_retomada`, que
pone el estado en `espera` (`motor.js:178`); al llegar a `03-ESTACION`, `restaurarBorrador`
solo restaura si el estado **es** `estacion_mitad` (`03-ESTACION.html:107`) ⇒ **no restaura
ni avisa**. En cambio el enlace «Retomar estación →» de la misma lista (`05-PAUSA.html:67`)
es un `<a>` que no dispara el evento y **sí** restaura. Dos affordances «retomar» con
comportamiento opuesto. Contradice el invariante (i) de `ATENCIONES-CONCURRENTES.md:42`
(cero campos perdidos en alternancias).

**P-04 (ALTO) · H-070 — Regresión B-013: el cierre de alertas ya no pide nombre ni cédula.**
`cerrarAlerta(id, forma)` solo guarda el motivo (`motor.js:260-271`); `03-ALERTAS.html:50-60`
y `04-URGENCIA.html:44-51` cierran sin ninguna firma, y el modal afirma «queda en la
bitácora con quién lo vio» —**no guarda quién**. `puente.js:383-385` sí lo exigía; la ley
B-013 (`CONSTRUCCION.md:164-196`), RF-13 y `COMUNICACION.md:124-127` también. Además las
notas de 11 no llevan autor ni cédula (`02-CONSULTA.html:154`), pese a que la pantalla
habla de «nota firmada».

**P-05 (ALTO) · H-071 — «VENCIDO — sube al tablero» y «ESCALADO» son camino muerto en
sesión.** Ninguna llamada a `nacerAlerta` pasa `plazo` (`motor.js:250-258`; todas las
llamadas en `03-ESTACION`, `04-LABORATORIO`, `02-CONSULTA`, `05-CALCULADORES`, `04-URGENCIA`
usan 5 argumentos), luego `vencida()` (`motor.js:280`) siempre es falsa y el chip
«VENCIDO — sube al tablero» (`03-ALERTAS.html:46`) nunca aparece. Los recordatorios de
control derivan fechas siempre futuras (+7/+14/+28, `motor.js:241-249`), así que el
«ESCALADO» (`06-AGENDA.html:56`) es inalcanzable en una sesión. El LEEME de la médica
promete ambas conductas (`LEEME.md:39`) —RB-06 (`REQUISITOS-FRONT-BACK.md:155-158`) queda
sin demostrar.

**P-06 (MEDIO) · H-072 — Una alerta tipo 4 no mueve la tarjeta al frente.** La semántica
declarada del tipo 4 es «mueve al equipo: sube al frente del tablero»
(`SISTEMA-DE-ALERTAS.md:37-39`). En el motor, `nacerAlerta` no toca el estado del paciente;
solo la tríada de banderas (`03-ESTACION.html:158`) y el botón de urgencias
(`04-URGENCIA.html:89`) disparan el evento `urgencia`. Una glucosa 130 (crítica ⇒ tipo 4,
`04-LABORATORIO.html:93-95`) o una TA 165/105 sin tríada (`03-ESTACION.html:152`) genera
la alerta roja pero **la tarjeta no sube al frente**. La LEEME de enfermería programa
probar justamente «Glucosa 130 ⇒ CRÍTICA» (`LEEME.md:27-28`) sin advertir que la mitad
de la respuesta (mover al equipo) no ocurre.

**P-07 (MEDIO) · H-073 — El LEEME de enfermería promete dos pruebas que su carpeta no
contiene.** `10-PRUEBA-ENFERMERIA/LEEME.md:29` («Marcar una urgencia solo ofrece
pacientes presentes») y `:31` («Cerrar una urgencia limpia el chip urgente») describen
pantallas de la carpeta **11**; la 10 no tiene pantalla de urgencias. El facilitador de
sesión seguirá el guion y no hallará dónde hacerlo.

**P-08 (MEDIO) · H-074 — «Copiar / entregar» no copia nada.** El botón solo marca
`S.entregados` (`06-CIERRE.html:87`, `06-AGENDA.html:63`); no hay `navigator.clipboard`
(como sí lo tiene el frontend real: `puente.js:932-934`). Etiqueta que promete y no cumple.

**P-09 (MEDIO) · H-075 — La derivación del próximo control es texto libre, no catálogo.**
`proximaFechaControl` decide por `indexOf("infección")`/`indexOf("puerperio")` /
`indexOf("fertilidad")` sobre el campo narrativo `caso` (`motor.js:244-247`). Cambiar la
descripción del caso silencia la derivación. La casa R-41 exige «catálogo de controles
por EG» (`ACTA_FRONTEND.md:331`); el intervalo +28/+14/+7 **no está declarado en ningún
documento del repo** —es una regla clínica inventada para la demo presentada como «del
protocolo» (`06-AGENDA.html:55`).

**P-10 (MEDIO) · H-076 — Doble riel de verdad de atenciones sin sincronía.** La pausa
vive a la vez en `S.atenciones` (objetos con dueño) y en eventos de paciente
(`estacion_mitad`/`pausada`); `05-PAUSA.html:84-85` crea eventos **sin borrador** y
`a.borrador` queda `null` para siempre (`:123`), mientras que la estación guarda su
borrador solo en el evento (`03-ESTACION.html:134`). Dos fuentes que pueden discrepar
(la lista dice «pausada», el estado del paciente dice otra cosa) —contrario al contrato
«la clave de toda copia es (atención, paciente)» (`ATENCIONES-CONCURRENTES.md:22`).

**P-11 (MEDIO) · H-077 — Cerrar una urgencia «referida» marca a la paciente «atendida».**
`cierra()` agrega siempre evento `atendida` (`04-URGENCIA.html:62`), también en la salida
«Referida a urgencias hospitalarias». Una referida **no** está atendida: contamina el
tablero (columna «Atendidas hoy») y el traspaso del cierre (`cierreData` la lista en
`atendidas`, `motor.js:344`). Los tres cierres legales de la casa (`REQUISITOS-DEL-DISENO.md:401-403`)
son atendida / referida / con motivo —el motor solo sabe una.

**P-12 (MEDIO) · H-078 — La nota-cierra-avisos marca todos los avisos «checked» por
defecto.** `02-CONSULTA.html:74` pone `checked` en todos los pendientes ≠4: cerrar la
consulta **cierra en bloque** lo que el médico no desmarque. Anclar el cierre a la nota es
correcto (RB-05), pero el default invierte la carga de la prueba: debería abrirse sin
marcar y exigir el gesto afirmativo.

**P-13 (MEDIO) · H-079 — La prescripción bloquea el guardado, contra la ley R-37.**
`02-CONSULTA.html:134-143` impide guardar y ofrece «Forzar igual». Eso sigue
`SISTEMA-DE-ALERTAS.md:46-49` (tipo 6 «único que puede detener»), pero la ley dice «al
agregar un medicamento que coincide con una alergia registrada ⇒ **aviso no bloqueante**»
y «P6 (el aviso informa, nunca bloquea)» (`ACTA_FRONTEND.md:303-305`). La casa del repo
declara precedencia de la ley (`REQUISITOS-FRONT-BACK.md:9-13`). La carpeta toma partido
por un lado de una tensión **abierta** sin registrarlo como decisión.

**P-14 (MEDIO) · H-080 — Catálogos clínicos completos dentro del código, contra P6.**
La ley exige «Ningún dato configurable vive en código… 0 umbrales sin firma»
(`ACTA_FRONTEND.md:35`); el pilar 4 de aceptación prohíbe umbrales en código
(`SISTEMA-DE-ALERTAS.md:155-156`). `motor.js` siembra TA 160/110 y 140/90 (`:224-227`),
FCF 110–160 (`:303`, `03-ESTACION.html:92`), rangos de 5 analitos (`:36-42`), HOMA
2.5/4.0 (`:45`) e intervalos de control (`:241-249`). Los LEEMES avisan que son «como si
firmados» (`10/LEEME.md:42`, `11/LEEME.md:45`) —eso salva la honestidad de la sesión, pero
el código de la ronda 2 (`puente.js:349-351, 550-556`) tiene **el mismo problema**: es un
defecto de repo, no solo de las carpetas nuevas. Las dos rondas comparten la deuda.

**P-15 (BAJO) · H-081 — Duplicación de `motor.js` y `estilo.css`.** Ambas carpetas
transportan copias byte-a-byte idénticas (mismo md5); cualquier reparación hay que
aplicarla dos veces y divergirán. Sin costura compartida ni directorio común.

**P-16 (BAJO) · H-082 — `recordatorios()` revienta con nombres sin coma.**
`nombre.split(",")[1].trim()` (`motor.js:357,364`) asume el formato «Apellidos, Nombres»;
un nombre registrado sin coma (el formulario de 02 lo permite) lanza TypeError al abrir
Cierre o Agenda si esa paciente queda atendida con caso clínico. Latente hoy, roto mañana.

**P-17 (BAJO) · H-083 — Las «reparaciones de la auditoría adversarial» citadas no existen
en el buzón.** Ambos LEEMEs adscriben el motor a «C-1…C-9 + A-5/A-6/A-7»
(`10/LEEME.md:7`, `11/LEEME.md:8`); esos IDs no están en `HALLAZGOS.md` (H-001…H-066) ni
en `CONSTRUCCION.md`. Trazabilidad rota: no se puede verificar qué se reparó.

**P-18 (BAJO) · H-084 — Dos jornadas aisladas: el circuito cerrado cruzando roles no se
puede demostrar.** `JORNADA_KEY` distinta por carpeta; lo que captura enfermería (control,
laboratorio) **nunca** llega a la consulta de la médica. La promesa del circuito
dato→cálculo→alerta→consulta solo se puede mostrar dentro de una carpeta con datos
sembrados. No es un bug de código, pero sí una limitación del instrumento que debe decirse
en la frase de apertura de la sesión.

**P-19 (BAJO) · H-085 — Semilla compartida con errores de continuidad.** Gabriela nace
con `urgencia` a las 715 y `en_atencion` a las 720 **sin evento `llego`**, luego no tiene
reloj de espera (`esperaMin` ⇒ null, `motor.js:194-201`); y el resumen puede contar una
tarjeta «urgente» como «en atención» si `marcador` no está puesto (`motor.js:333`).
Además el H1 de ambas dice «jueves 23 de octubre» y 2026-10-23 fue **viernes** (el
frontend real dice «jueves 25» y el 25 fue domingo: los tres se equivocan de día).

**P-20 (BAJO) · H-086 — La prioridad de la lista de avisos entierra las urgencias.**
Tanto `alertasDe` (`motor.js:274`, orden `{…, 4:5}`) como el sort de `03-ALERTAS.html:41`
ponen el tipo 4 **al final** de la lista, contra «la urgencia cierra la voz / sube al
frente» (O4, `FLUJOS-TRABAJO.md:318`). La pantalla incluso lo declara («primero lo verde,
después lo rojo») — es una decisión de diseño que choca con la doctrina y debe resolverse,
no coexistir en silencio.

**P-21 (BAJO) · H-087 — Filtro de homónimas demasiado laxo y renombre sin confirmación.**
`02-LLEGADA.html:89` compara el **primer apellido** con `indexOf` en ambos sentidos (cualquier
apellido que sea substring dispara); y al guardar con `?p=` el formulario **sobrescribe
nombre y nacimiento** de la paciente existente sin preguntar (`:121-125`). R-02 exige
retomo tipado con 4 casos (`ACTA_FRONTEND.md:62-67`); esto es un aviso de vitrina.

**P-22 (BAJO) · H-088 — Subcadena de alergia frágil.** La verificación usa
`droga.indexOf(alergia.slice(0,5))` más un caso especial penicilina↔amoxicilina/ampicilina
(`02-CONSULTA.html:122-133`). Falla para cefalosporinas, mezclas y nombres en otro idioma;
funciona para el guion de la sesión y para nada más. El catálogo de interacciones es
demo, pero la lógica de matcheo no debe viajar al producto.

---

## 4 · Hallazgos adversariales — `07-FRONT-NUEVO` (lo que ya ofrecemos; P-23…P-28)

**P-23 (ALTO) · H-089 — Nada persiste entre páginas: el «flujo completo» se resetea al
navegar.** `dia` se reconstruye desde la semilla en cada carga (`puente.js:27-89`); solo
`fn_contexto` y `fn_veradero` usan `localStorage` (`:105-115,1153`). Registrar en
Llegadas y volver a Hoy **borra** al paciente nuevo, las pausas, las alertas nacidas, el
laboratorio, las notas y los partos. El LEEME declara probado justo ese flujo
(`LEEME.md:102-109`). Es el defecto que `motor.js` ya resolvió y que 07 debe copiar.

**P-24 (ALTO) · H-090 — `puente.contexto()` no existe: TypeError al registrar llegada.**
`puente.js:735` invoca `puente.contexto()`; el objeto no lo define (solo `MK.contexto`).
El panel de «visita» posterior a «✓ Registrar llegada» revienta.

**P-25 (ALTO) · H-091 — La nota de consulta se desecha y la firma es falsa.**
`cerrar_consulta(nota)` ignora el parámetro (`puente.js:362-368`): la evolución escrita en
`consulta.html` nunca llega a `dia.notas`; solo `historia.html` guarda notas, y
`guardar_nota` escribe autora y cédula **fijas de mentiras** (`:521`). R-36/R-17 quedan
sin demostrar.

**P-26 (MEDIO) · H-092 — API muerta y pantallas truchas de 07.** `marcar_no_llego`,
`retomar`, `alertas_del_episodio`, `metricas_sistema`, `calcular("ta")` y `elegir_paciente`
no las invoca ninguna pantalla; el formulario de «visita de hoy» (`llegada.html:48-67`)
nunca envía sus 5 campos; el «faltaCompletar» de emergencia jamás se prende
(`registro_rapido` no lo setea) y el cierre cuenta `p.faltaCompletar` ⇒ miente en 0;
`reagendar` no crea cita en `dia.citas`; el estado del modelo está tipeado **«pusada»**
(`puente.js:13`) y ya se propagó a la propuesta P6.

**P-27 (MEDIO) · H-093 — El riel miente y hay enlace muerto.** `montarRiel` monta solo
respaldo y sistema «Del consultorio» —`falla.html` queda fuera del riel remontado— contra
el LEEME que promete tres (`LEEME.md:32,56`); `CUMPLIMIENTO.html:123` apunta a
`../FLUJO-CIRCUITOS.html`, que no existe.

**P-28 (BAJO) · H-094 — Contradicciones menores de 07.** El LEEME dice a la vez «siete
destinos de jornada» (`:15`) y «Jornada: ocho» (`:57`); el prefill de calculadoras es
decorativo (escribe un texto pero no rellena el form, `puente.js:1218-1220`) contra R-43;
`consulta.html` muestra «pulso» que ningún campo captura; `pendientes.html` muestra
asteriscos Markdown crudos como texto literal.

---

## 5 · Comparativa eje por eje — lo que ofrecen 10/11 vs. lo que ofrecemos en 07

| Eje | 10/11 (motor.js v3) | 07-FRONT-NUEVO (puente.js) | Gana hoy |
|---|---|---|---|
| Modelo de estado | Eventos + estados **derivados** por replay (`motor.js:168-193`) | Campos mutados a mano en la semilla (`puente.js:286-365`) | **10/11** |
| Persistencia | `localStorage` por jornada: navegar no pierde nada | Memoria volátil: navegar resetea todo | **10/11** (H-089) |
| No llegó automático (FL-04) | `cita+45 ⇒ no_llego` derivado (`motor.js:190`) | Operación existe, nadie la llama; semilla congelada | **10/11** |
| Borrador / pausa (FL-05/06) | Borrador en evento + restauración (con el bug P-03) | Sin snapshot: «retoma campo por campo» es texto | **10/11** (tras P-03) |
| Dueño y toma por emergencia | Botón que registra quién tomó y de quién (`05-PAUSA.html:129-143`) | Solo texto en `atenciones.html:44` | **10/11** |
| Laboratorio (FL-07/O8) | Banda, alerta nacida, escrito tardío, semáforo | Captura sin banda («catálogo pendiente») | **10/11** |
| Circuito dato→alerta | Cerrado en estación, laboratorio y HOMA | Cerrado solo en control (H-062) | **10/11** |
| Seis tipos de aviso | Declarados y usados 1–6 (11) | Niveles libres crítico/problema/informativo | **10/11** |
| **Cierre de alerta firmado (B-013)** | **Sin nombre ni cédula** (P-04) | Exige nombre y cédula (`puente.js:383-385`) | **07** |
| Firma de nota | Sin autor ni cédula | Autor fijo de mentiras (mejor, aún no firma real) | **07** (leve) |
| Dedupe de alerta | `(pid, texto)` solo pendiente (`motor.js:252-253`) — coincide con B-013 parcial | `(texto)` solo pendiente, sin pid | **10/11** |
| Reloj / vencimiento de alerta | Existe `plazo` pero nunca se siembra (P-05) | `vence` congelado en minutos estáticos | Empate malo |
| Fatiga medida (<2/visita) | Sí, en tablero y alertas (`metricaFatiga`) | No existe | **10/11** |
| Prefill calculadoras (R-43) | HOMA real con 0 tecleos (origen invertido: P-01) | Texto decorativo, no rellena | **10/11** |
| Agenda / recordatorios (DEC-32/33) | Derivación + entrega + anular + plantilla sin cifras; escalado muerto (P-05); «1 clic» roto (P-02) | Lista de llamadas estáticas + copiar al portapapeles | **10/11** (con reparaciones) |
| Cierre / traspaso (FL-15) | Calculado, imprimible, con recordatorios y drill | Calculado e imprimible, más completo en fichas/llamadas | Empate |
| Homónimas (R-02) | Aviso con modal que nunca fusiona; regex laxa (P-21) | Aviso «parecidas» con chip «no se elige sin confirmar» | 07 (leve) |
| Cobertura de pantallas | 6+6 (una jornada por rol) | 21 pantallas + cumplimiento + propuestas + rutas + modo verdadero | **07** |
| Ficha, documentos, historia, parto, estudios, falla, respaldo, sistema, acceso | Ausentes (excepto completar ficha mínimo) | Presentes (con deudas P-25…P-28) | **07** |
| Kit de sesión (hoja imprimible por rol, frase de apertura, límites) | Completo | Bandas por pantalla, sin hoja por rol | **10/11** |
| Costura con la verdad (citas FL/RF/R) | Pies mínimas; sin CUMPLIMIENTO | CUMPLIMIENTO RF por RF, pies por FL | **07** |
| Mantenimiento | motor.js duplicado ×2 (P-15) | puente.js único | **07** |

**Lectura de la tabla:** 10/11 ganan en **lógica de flujo** (justo lo que el dueño criticó
de la ronda 2: «estados que no se mueven solos»); 07 gana en **cobertura y costura con la
verdad**. Son complementarios: el camino correcto es **absorber el motor en la costura
declarada**, no elegir una carpeta contra la otra.

---

## 6 · Tensiones de repo que ninguna ronda resuelve (auditoría a la verdad declarada)

- **R-37 (ley: alergia «nunca bloquea») vs. tipo 6 (lógica: «único que puede detener»)** —
  `ACTA_FRONTEND.md:303-305` vs `SISTEMA-DE-ALERTAS.md:46-49`. 11 ya implementó el
  bloqueo (P-13); hay que decidir y enmendar una de las dos casas.
- **Umbrales en código** — ley P6 y pilar 4 prohíben umbrales sin firma; las tres rondas
  (10/11, 07 y estas auditorías) los traen sembrados (P-14). Ninguna carpeta trae un
  `CATALOGOS/LAB_RANGOS.json` borrador-firmable: es el hueco que falta para que la sesión
  «como si firmado» no se convierta en «para siempre en el código».
- **Tablero: columnas vs. lista priorizada** — contrato TABLERO aún declara columnas
  (`TABLERO.md:44-47`) y REQUISITOS pide lista con orden del equipo (decisión abierta 10,
  H-048). 10/11 y 07 ambos dibujaron columnas: la decisión abierta siguió abierta y ya hay
  dos implementaciones más en juego.
- **B-013 auditada pero no integrada** — las carpetas muestran dedupe y cierre anclado
  como hechos; la casa los tiene como CANDIDATOS (`REQUISITOS-FRONT-BACK.md:37-41`).
- **Meta de fatiga <2** — 10/11 la implementan con su número; la casa advierte que es
  cifra huérfana pendiente de aprobación (L-04, `CONTRASTE-DEL-DISENO-LOGICO.md:60-63`).
- **Mapa del repo desactualizado** — `INDEX.md`, `COMPARATIVA.md`, `AUDITORIA-FUENTES.md`
  y `LEEME.md` raíz no mencionan las carpetas 10/11 (P-23/H-089 aparte): el instrumento
  de trazabilidad no cubre los entregables de sesión.

---

## 7 · Plan de reparación recomendado (en orden)

**Antes de cualquier sesión con el oficio (arreglan la prueba en vivo):**
1. P-01 — invertir el flag de origen del HOMA (`05-CALCULADORES.html:104`).
2. P-02 — la cita «1 clic» debe usar `ahoraMin()+X` o un campo fecha real, y salir de
   «por recuperar» (`06-AGENDA.html:84,71`).
3. P-03 — que `estacion_retomada` conserve el estado `estacion_mitad` hasta guardar, o que
   `restaurarBorrador` busque el borrador por evento y no por estado actual.
4. P-04 — restaurar nombre y cédula en el cierre manual de alertas y en el cierre de
   urgencias; añadir autor/cédula a las notas de 11 (copiar el patrón de `puente.js:383-385`).
5. P-07 — corregir el LEEME de 10 (las dos pruebas de urgencia no son de esa carpeta).
6. P-06 — que `nacerAlerta(tipo 4)` dispare el evento `urgencia` del paciente (o que el
   LEEME diga qué tipos mueven tarjeta y cuáles no).

**Antes de pedir veredicto doble (integridad del instrumento):**
7. P-05 — sembrar `plazo` en los nacimientos de alerta que lo llevan (chequeo con fecha)
   y hacer que el recordatorio de control use el `fecha` derivado para poder mostrar
   ESCALADO; P-08 — clipboard en «Copiar / entregar»; P-12 — sin `checked` por defecto;
   P-11 — cierre «referida» con estado propio; P-09 — la derivación sale de un catálogo
   explícito, no del texto del caso.

**Trabajo de costura (esta ronda de auditoría lo deja registrado):**
8. Absorber el patrón de `motor.js` (eventos, estados derivados, persistencia) en el
   `puente.js` de `07-FRONT-NUEVO` — repara P-23 de raíz sin romper su costura.
9. Unificar `motor.js` en un solo archivo compartido por ambas carpetas (P-15).
10. Sacar los umbrales clínicos de los `.js` a un catálogo borrador versionado que el
    médico firme (P-14, ley P6) — sirve para 10/11 y para 07.
11. Registrar en `HALLAZGOS.md` H-067…H-094 y actualizar `INDEX.md` con las carpetas
    10/11 (traza completa).
12. Elevar a decisión del dueño las tensiones de §6 (R-37 vs tipo 6; columnas vs lista;
    meta de fatiga; prioridad de urgencias en la lista de avisos, P-20).

---

## 8 · Adenda post-síntesis — dos hallazgos encontrados al construir `12-FRONT-SINTESIS/`

**P-29 (ALTO) · H-095 — En 10/11 el paseo sin cita queda atrapado: nunca llega a la
estación.** Registrar a alguien sin cita dispara `creado + llego` con `sinCita ⇒
por_registrar` (`10/…/02-LLEGADA.html:127-131` + `motor.js:191`), pero la estación solo
lista `espera|llego|estacion_hecha|estacion_mitad` (`03-ESTACION.html:47-51`) y el panel
de completar de la puerta no atiende `por_registrar` (`02-LLEGADA.html:52-83`): el flujo
titular «regístrela en tres campos y que el día avance» muere en un bucle. Reparado en
12-FRONT-SINTESIS con el evento `visita_completa ⇒ espera` (LEEME, prueba PASS
«Yolanda en espera tras completar visita»).

**P-30 (MEDIO) · H-096 — El «Guardar con hallazgo» de la estación choca con R-14 (≤5
toques).** `10/…/03-ESTACION.html:179-184` abre un modal de confirmación cuando hay
banderas o tensión fuera de rango: es un tope extra justo en el paso que la ley exige
rápido, y una lectura literal de «guardar nunca bloquea» lo incluye como bloqueo suave.
Reparado en 12: guardar es un solo toque siempre; los avisos salen **después**, sin
confirmación previa.

---

**Bitácora:** 2026-10-25 — auditoría pedida tras añadir `10-PRUEBA-ENFERMERIA/` y
`11-PRUEBA-MEDICA/` (motor v3 con `JORNADA_KEY` propia). 30 hallazgos nuevos propuestos
(P-01…P-30 ⇒ H-067…H-096). Veredicto global: **las carpetas son el mejor cimiento de lógica
del repo y a la vez traen regresiones de seguridad (firma de alertas) y defectos de sesión
que fallan en vivo; absorber lo primero, reparar lo segundo, no duplicar lo tercero.**
Síntesis ejecutada el mismo día en `12-FRONT-SINTESIS/` (ronda 3): todas las reparaciones
de §7 y §8 quedan vivas en código y verificadas por las pruebas de la propia carpeta —
`pruebas/pruebas-motor.js` (32 PASS: firma, urgencia automática, referida, cita real,
paseo sin salida, HOMA, umbrales) y `pruebas/pruebas-e2e.js` (≈85 checks E2E con jsdom:
las 19 pantallas sin errores JS con riel, banda y h1 único, más los 5 flujos completos),
ambas en verde el 2026-10-25. Su LEEME mapea cada crítica a su respuesta.
