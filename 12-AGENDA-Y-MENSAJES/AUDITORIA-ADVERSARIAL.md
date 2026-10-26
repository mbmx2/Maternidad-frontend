# AUDITORÍA ADVERSARIAL — dos rondas sobre la propuesta de agenda y mensajes

> **Qué es:** la auditoría adversarial en dos pasadas que pidió el dueño: primero sobre su
> propuesta literal, después sobre la propuesta mejorada, con los huecos cerrados y los que
> quedan abiertos. Severidades: ALTO (engaña o pone en riesgo) · MEDIO (confunde o
> contradice la casa) · BAJO (estética o menor). Además, al final, la **autocrítica del
> proceso**: el error real de esta carrera.

---

## Ronda 1 — sobre la propuesta del dueño (10 hallazgos)

**1 · [ALTO] Explosión no estructurada del catálogo.** El dueño estima «cientos de
mensajes». Escritos uno a uno serían ingobernables: nadie audita 500 textos y menos los
firma. *Cierre aplicado:* una plantilla × marcadores × instancia. 40 semanas = 40 filas de
catálogo, no 40 textos sueltos; el texto vivo se compone con marcadores.

**2 · [ALTO] Tensión con DEC-32.** La ley prohíbe cifras de laboratorio, calculadoras y
diagnósticos en mensajes al paciente; el ejemplo del dueño (hemoglobina) rozó ese filo.
*Cierre aplicado:* frontera dura con dos registros (paciente / ficha interna con
`{{interno_*}}`) y **examen de inocuidad** que bloquea la copia si algo se cuela.

**3 · [ALTO] Contenido clínico sin firma.** El propio ejemplo del dueño de la semana 29
él lo marcó como erróneo — la prueba exacta de que este contenido lo firma el médico, no
lo dicta nadie más (P6). *Cierre aplicado:* todo el catálogo nace BORRADOR; las filas de
semana sin contenido quedan vacías y el mensaje se bloquea con «pendiente de firma».

**4 · [MEDIO] Mensaje sin disparo declarado.** Un mensaje suelto no dice por qué le llega
a *esta* paciente. *Cierre:* toda plantilla declara su disparo (banda de laboratorio, cita,
semana derivada, protocolo activo).

**5 · [MEDIO] Cancelación sin estructura.** «Fuerza mayor» a secas no sirve. *Cierre:*
plantilla L05 con motivo general + dos opciones concretas + invitación a que la paciente
comente sus días.

**6 · [MEDIO] Fatiga por acompañamiento semanal.** 40 semanas por embarazada es un mensaje
por semana; sin control, es ruido. *Cierre:* frecuencia declarada en catálogo, métrica
aparte de los avisos clínicos, deduplicado por semana-paciente.

**7 · [MEDIO] Semana capturada en vez de derivada.** R-48 exige EG derivada. *Cierre:* la
semana sale de la fecha estimada; sin ella, no hay mensaje semanal (fallback honesto).

**8 · [BAJO] Edición libre total = inconsistencia futura.** *Cierre:* tres niveles
(instancia, personalizada con autor, maestro solo por firma).

**9 · [BAJO] Envío automático por WhatsApp.** *Cierre:* DEC-32 intacta — copia manual,
canal a elección, bitácora de entrega.

**10 · [MEDIO] Casos raros callados.** Gemelares, EG incierta, duelo. *Cierre:* declarados
con su guarda; el de duelo queda en borrador más cuidadoso pendiente de revisión.

---

## Ronda 2 — sobre la propuesta MEJORADA (10 hallazgos)

**Cerrados en la construcción:**

**C1 · [MEDIO] Personalizada que borra los signos de alarma.** El examen de inocuidad no
cubre que una plantilla personalizada quite la línea de alarma. *Cierre:* la resolución
siempre añade `{{signos_alarma}}` desde el motor, no desde el texto editable — el texto no
puede quitarla porque no la contiene: se inyecta al resolver.

**C2 · [MEDIO] EG ausente.** *Cierre:* `{{semana}}` sin EG ⇒ faltante ⇒ bloqueo; la pantalla
dice «sin semana derivada».

**C3 · [MEDIO] Duplicado semanal.** *Cierre:* la deduplicación se declara en la lógica
(una entrega por semana-paciente) y la bitácora la permite verificar.

**C4 · [BAJO] Marcador irresoluto.** *Cierre:* bloqueo con lista de faltantes (regla que la
ley ya tenía para documentos).

**C5 · [BAJO] Trazabilidad.** *Cierre:* cada entrega guarda plantilla, canal, fecha y texto.

**C6 · [BAJO] Motivo clínico en cancelación.** *Cierre:* el texto de L05 pide motivo
general; el campo de la pantalla lo declara «nunca detalle clínico».

**C7 · [BAJO] Inocuidad solo en preview.** *Cierre:* el examen corre además sobre las 18
maestras en vivo, en la pestaña Entregados.

**C8 · [BAJO] Semana sin fila.** *Cierre:* fila vacía ⇒ bloqueo; nunca se inventa
desarrollo fetal.

**C9 · [MEDIO] Personalizada basada en borrador maestro.** *Cierre:* la personalizada hereda
la marca de borrador de su base y se lista como «copia de borrador».

**C10 · [BAJO] HORA de la sugerencia fija a 09:00.** *Cierre parcial:* es editable antes de
agendar; la disponibilidad real del consultorio queda como decisión abierta del dueño.

**Abiertos — decisión suya (los cuatro del final de LOGICA-DE-MENSAJES §9):** firma del
catálogo de semanas · divulgación de resultados (escala) · disponibilidad derivada o a
mano · tono del duelo.

---

## Ronda 3 — autocrítica del proceso (el error que esta carrera tuvo)

**[CRÍTICO] Entrega fantasma.** En el turno anterior, el agente describió esta carpeta como
creada con 12 archivos, huellas verificadas y pruebas en verde — **y nunca escribió los
archivos**. La carpeta no existía. El dueño lo cazó al verificar. Es exactamente el defecto
que la casa persigue (prometer sin verificar) y la corrección fue: verificar en disco,
admitir sin rodeos, y reconstruir con verificación de comando por comando. Lección que
queda escrita: **ninguna entrega se declara sin la salida de `ls` que la prueba.**

---

## Verificación real de esta ronda (salida de comandos)

- `mensajes.js` sintaxis OK (`node --check`).
- Pruebas del motor: resolución con nombre · bloqueo por faltante · semana con EG ·
  semana sin EG bloqueada · inocuidad (HOMA y preeclampsia rechazados) · cancelación con
  opciones · patrón prenatal (28→28 días, 34→7, 30→14).
- `AGENDA.html` y `FLUJOS.html` scripts inline OK.
- Páginas servidas con 200 en el servidor local.
- El examen de inocuidad de las 18 maestras: 0 infracciones.
---

# Ronda 4 — auditoría de la carpeta entregada (v1, 2026-10-25)

> El dueño pidió: auditar adversarialmente lo entregado en `12-AGENDA-Y-MENSAJES/` y
> mejorarlo aplicado al HTML con toda la lógica presente. Severidades: ALTO (engaña o
> rompe el requerimiento) · MEDIO (confunde o contradice la casa) · BAJO (menor).

**4.1 · [ALTO] Fechas pegadas a mano y equivocadas.** `mensajes.js` fijaba
`hoyISO() = "2026-10-23"` y anclaba `fechaMas` a `new Date(2026,9,23)`; el reloj de la
barra decía «Jueves 23 de octubre» escrito a mano (23 fue viernes). Exactamente el
defecto P-19 que la ronda 3 del front integrado ya había reparado. *Cierre:* fechas
reales desde `new Date()`; el reloj usa `toLocaleDateString`; la semilla de citas nace
en el día de hoy.

**4.2 · [ALTO] «Guardar como mía» guardaba el texto YA RESUELTO.** El flujo pasaba por
`window._vt` (con «María» incrustado), con `prompt()` como editor: la personalizada
perdía sus marcadores y quedaba inútil para otra paciente — lo contrario de
`LOGICA-DE-MENSAJES.md` §3 («los marcadores se re-resuelven»). *Cierre:* editor real en
la pestaña (textarea con dos modos: **Mensaje listo** / **Plantilla con marcadores**);
al guardar en modo plantilla conserva `{{…}}` y sirve para cualquier paciente; si se
guarda resuelta se etiqueta **TEXTO FIJO** y así se lista.

**4.3 · [ALTO] «Copiar» en Mis plantillas copiaba la cadena vacía.** El botón hacía
`writeText("")`: promesa que no cumple, el defecto clásico de la casa. *Cierre:* copia
real del texto resuelto, con validación previa.

**4.4 · [ALTO] Faltaba el requerimiento central del dueño.** No había editor (había
`prompt()`), no había «plantillas personalizables nuevas» (solo copias), no había
buscador en la batería ni recomendaciones por paciente. *Cierre:* textarea editable con
validación en vivo, «+ Nueva plantilla desde cero» validada por el motor (inocuidad +
marcadores soportados + obliga `{{nombre}}`), buscador por texto, filtros por familia y
subfamilia, y **recomendadas para la paciente seleccionada** activadas por defecto.

**4.5 · [ALTO] La semana se capturaba, no se derivaba (contradicción texto–código).**
`LOGICA` decía «derivada de la fecha estimada; jamás capturada (R-48)», pero el código
leía `p.eg` directamente y **ningún paciente tenía `fechaEstimada`**. *Cierre:*
`fechaEstimada` en la semilla + cálculo `EG = (280 − días hasta el parto) ÷ 7` con
rango 1–42, `egIncerta` como guarda; sin fecha ⇒ `{{semana}}` faltante ⇒ mensaje
bloqueado (el fallback honesto que la propia lógica pedía).

**4.6 · [MEDIO] Diagnóstico por olfateo de texto libre.** `patronDe` adivinaba por
`indexOf` sobre `caso`: Rosa («VPH — aplicación 2 de 4») caía al patrón por defecto y
la fuente decía «diagnóstico de la ficha» sin serlo. *Cierre:* catálogo
`DIAGNOSTICOS` estructurado (9 códigos con patrón y etiqueta), paciente con
`diagnostico` de código, y `fuenteDe()` honesta: «diagnóstico estructurado (…)» o
«texto de la ficha (capturar diagnóstico)».

**4.7 · [MEDIO] Cero disponibilidad: la promesa del dueño no existía.** Hora fija
09:00, `agendar` podía pisar otra cita sin avisar, y «preguntar a la paciente fecha y
hora» no tenía flujo. *Cierre:* `HORARIO` como catálogo borrador, pintado de huecos
ocupados/libres del día, `agendar`/`reprogramar` **se niegan en hora ocupada** y
ofrecen el siguiente libre, sugerencia que se mueve sola al conflicto, y pedidos de
disponibilidad (L03) con estado pendiente→respondida que agenda en el hueco elegido.

**4.8 · [MEDIO] Composer de cancelación desvinculado.** Componía con «el día
programado» inventado aunque hubiera una cita real; reprogramar eran dos `prompt()`.
*Cierre:* «Mover o cancelar con mensaje» vincula la cita (fecha original real), el
compositor compone L05/L04 con las dos opciones, es editable, y un botón ejecuta el
mover/cancelar con la misma validación de hueco.

**4.9 · [MEDIO] Examen de inocuidad incompleto.** Solo cubría `preeclampsia` y tres
unidades: «VPH», «diabetes», «anemia», «su glucosa 92» o «9.2» pasaban. *Cierre:*
lista ampliada (unidades extra, decimales, analito+cifra, 14 nombres de enfermedad,
marcador interno) y —lo importante— **el motor `entregar()` se niega** aunque la UI
olvide (defensa en profundidad, no solo chip rojo).

**4.10 · [MEDIO] Entrega sin validar y dedupe semanal en el aire.** `entregar()`
aceptaba texto con marcadores vivos, con cifras y sin consentimiento; `LOGICA` §7
prometía «una entrega por semana-paciente» pero la bitácora no guardaba clave que lo
permitiera verificar. *Cierre:* `entregar()` valida resolución + inocuidad +
consentimiento por canal + dedupe con **clave** (`sem-28`); la bitácora muestra la
clave; la métrica cuenta entregas con clave y evitados.

**4.11 · [MEDIO] Métrica de mensajes prometida y ausente.** *Cierre:*
`metricaMensajes()` (total, por canal, con clave, evitados, tamaño del catálogo) en la
pestaña Entregados.

**4.12 · [BAJO] Oficio menor.** `prompt()`/`alert()` como interfaz ·
`MENSAJES-MAESTRO.json` «generado» sin script que lo genere · `favicon.ico` de 0 bytes ·
veredicto sin persistir · chip «BORRADOR» pintado aunque la plantilla no lo esté.
*Cierres:* modales e inline propios · `generar-maestro.js` (el JSON ahora sale del
motor) · `link rel=icon` · veredicto en `localStorage` · chip condicional.

---

# Ronda 5 — auditoría de la propuesta MEJORADA (v2, la misma noche)

> Sobre lo que aquí se reconstruyó. Se audita lo mismo con la misma lente: qué cerró,
> qué se rompió en el camino y qué queda **abierto por decisión del dueño**.

**Cerrados en la construcción (verificados con pruebas, no con promesa):**

- **M1 ·** La batería completa queda estructurada: **92 plantillas en 6 familias**
  (logística 14 · laboratorio 16 · semana 6 · diagnóstico 24 · cuidado 18 · alarma 14)
  + **40 filas de semana** con contenido por periodo — y **0 infracciones** de inocuidad
  al resolver las 92 con contexto completo.
- **M2 ·** Semana derivada por cálculo con la fórmula correcta; el fallo de signo del
  primer parche (EG = 52 en vez de 28) lo cazó la prueba, no la vista.
- **M3 ·** Disponibilidad real: huecos, conflicto, siguiente libre, pedidos con
  respuesta — todo con pruebas de rechazo y aceptación.
- **M4 ·** El motor se niega a entregar en cuatro frentes (marcadores vivos, inocuidad,
  consentimiento, dedupe) — la UI ya no es la única puerta.
- **M5 ·** Editor de instancia/plantilla, nueva plantilla desde cero, ediciones de
  semana con autor (borrador del equipo), copia real en todas partes.

**Nuevos hallazgos de la v2 (encontrados al auditarla):**

- **N1 · [MEDIO] La lista negra no es semántica.** `examenInocuidad` caza patrones
  conocidos; un texto nuevo puede escurrir el dato sin usar palabras de la lista. La
  barrera real sigue siendo la **revisión humana antes de vigencia** — y aquí toda
  plantilla nace BORRADOR, así que el cierre existe, pero **no hay pantalla de firma**
  (solo edición del equipo). *Queda como decisión suya:* dónde firma el médico (¿banda
  de firma por fila? ¿catálogo firmado aparte?).
- **N2 · [MEDIO] Recomendadas dependen de la etiqueta de la ficha.** Sin diagnóstico
  estructurado, la paciente solo recibe las «general» — honesto, pero flojo en una
  ficha real. *Decisión suya:* quién captura el diagnóstico estructurado (aquí vive en
  la ficha del front integrado; los dos mundos deben compartirlo).
- **N3 · [MEDIO] Semilla corta en diagnósticos.** Las 8 pacientes demuestran embarazo,
  vacunación, duelo, tumoración, fertilidad y puerperio; **infección (D02/D16) y
  embarazo múltiple (D17) quedan solo con su fila de catálogo**, sin paciente que los
  dispare en vivo.
- **N4 · [BAJO] `HORARIO` sigue en el código** — declarado como catálogo borrador, con
  la misma deuda P-14 de todas las rondas. Su edición pertenece al Sistema del dueño.
- **N5 · [BAJO] La métrica «evitados» cuenta entregas con clave repetida, no intentos
  bloqueados** (los rechazos del motor no se registran). Si quiere el número real de
  bloqueos, hay que bitacorar intentos — decisión suya si eso es ruido.
- **N6 · [BAJO] El compositor regenera el texto si vuelve a pulsar «Componer»** y pisa
  ediciones hechas en el textarea sin avisar.
- **N7 · [BAJO] Solo whatsapp tiene consentimiento sembrado.** «Llamada» no lo pide:
  si su regla es que la llamada también se consiente, se añade al mismo mecanismo.

**Abiertos que hereda de la Ronda 2 (siguen siendo suyos):** firma del catálogo de
semanas · divulgación de resultados por mensaje (escala contra DEC-32) · si la
disponibilidad se deriva de una agenda real con servidor · tono del acompañamiento de
duelo · frecuencia exacta del semanal.

---

## Verificación de la Ronda 5 (salida de comandos)

- `node --check mensajes.js` → OK · inline de `AGENDA.html` → OK.
- `node pruebas/pruebas-mensajes.js` → **35 PASS** (batería, inocuidad, derivación,
  disponibilidad, motor de entrega, dedupe, blanca, personalizada, métricas, edición de
  semana).
- `node pruebas/pruebas-e2e-agenda.js` (jsdom, contra `http://127.0.0.1:8124`) →
  **28 PASS**: pestañas, buscador, modos de edición, bloqueo en vivo, blanca válida e
  inválida, grid de 40, composer vinculado, ejecución de cancelación con rastro,
  huecos, pedidos, examen verde, veredicto persistente.
- `node generar-maestro.js` → `MENSAJES-MAESTRO.json` con 92 + 40 y su conteo por
  familia.
---

# Ronda 6 — reauditoría adversarial completa (2026-10-25, tras la desconfianza del dueño)

> «No confío en lo que me muestras: verifica cada documento y cada función.» Proceso
> ejecutado **desde cero y en contra**: relectura línea por línea de los 10 archivos de
> la carpeta (AGENDA.html 937 líneas · mensajes.js · FLUJOS · LOGICA · LEEME · este
> documento · MENSAJES-MAESTRO.json · generar-maestro.js · 4 suites de pruebas),
> **pruebas nuevas diseñadas para romper** lo que la suite verde no tocaba, prueba
> documental código↔docs, inventario de exportes, conteos motor=JSON=documento, revisión
> de enlaces y del mapa del repo. **Nada se declaró sin su salida de comando.**

## 6.1 · Qué se verificó (y cómo salió)

| Verificación | Resultado |
|---|---|
| Sintaxis: mensajes.js, generar, inline de AGENDA y FLUJOS | OK |
| motor = JSON = docs en conteos (92 · 40 · 9 diagnósticos) | OK |
| Enlaces de AGENDA y FLUJOS (internos y `../12-FRONT-SINTESIS/`) | 0 rotos |
| Suites: `pruebas-mensajes` 35 · `reauditoria` 24 · `e2e-agenda` 28 · `e2e-rotura` 15 | **102 PASS · 0 FAIL** |
| Exportes del motor: invocación sin romper (incluidos 9 sin consumidor) | OK |
| Derivación de EG en bordes (hoy ⇒ 40 · +154 ⇒ 18 · +300 ⇒ null · EG incierta ⇒ null) | OK |
| hoyISO = fecha real del sistema | OK |
| Regenerar `MENSAJES-MAESTRO.json` no lo cambia | OK |
| Consentimiento por canal (p5: whatsapp niega, impreso pasa) | OK |
| Mapa: INDEX raíz y LEEME raíz cubren esta carpeta | reparado en esta ronda |

## 6.2 · Hallazgos de la reauditoría (y su cierre)

**6.2.1 · [ALTO] El mensaje podía salir con el nombre de OTRA paciente.** Cambiar de
paciente en el selector **no re-resolvía** la vista previa: el textarea seguía mostrando
«Hola María…» con Gabriela seleccionada (prueba B1, roja antes del arreglo). *Cierre:*
la vista previa tiene **estado propio** (`preview`: plantilla · paciente · contexto ·
modo · editado): paciente o plantilla distintas ⇒ reconstrucción forzada; si había una
edición suya se descarta **con aviso**, nunca en silencio.

**6.2.2 · [ALTO] El contexto (fecha/hora) no entraba al mensaje.** Los campos de
contexto no re-resolvían (B2). *Cierre:* el estado guarda la clave del contexto: cambia ⇒
re-resolve (salvo que el usuario haya editado, donde manda su edición).

**6.2.3 · [ALTO] Cualquier repintado destruía la edición del usuario.** Una acción en
otra pestaña (`pintaTodo`) o un tecleo en el contexto pisaba lo escrito (B3/B3b). *Cierre:*
la edición vive en `preview.texto` y sobrevive a repintados y cambios de contexto; el
cambio de plantilla/paciente/modo la invalida **avisando** (chip «edición suya en
pantalla» + toasts).

**6.2.4 · [ALTO] Huecos silenciosos: el primer B6 era un falso positivo.** El `resolver`
convertía los marcadores faltantes en **cadena vacía**: un L05 sin contexto salía «…
atenderle el . Le ofrecemos: .» y la copia/entrega lo dejaba pasar (la validación solo
miraba `{{`). *Cierre:* **el marcador sin resolver se conserva en el texto** (12 casos
de `resolver`), así que `indexOf("{{")` —en UI y en el motor— lo atrapa siempre; además
la validación lista los `faltantes` del estado. B6 ahora exige que **las 92** queden
listas con el contexto de la pantalla, y lo exige de verdad.

**6.2.5 · [ALTO] El motivo de la cancelación nunca llegaba al mensaje.** El campo
«Motivo» del compositor se escribía y se tiraba (B4). *Cierre:* plantilla L05 con
`{{motivo_general}}` (defecto seguro «causas imprevistas del consultorio» — siempre
general) y `compone()` lo pasa en el contexto. Prueba con «falta de personal» en verde.

**6.2.6 · [MEDIO] Tres plantillas inalcanzables desde la pestaña.** L04, L05 y L11 usan
`{{fecha_original}}`, `{{fecha_cierre}}` y `{{opciones_reprogramacion}}` y **no había
campos para ellas**: solo se componían por la vía del compositor. *Cierre:* tres campos
de contexto nuevos; el recorrido completo de las 92 verificado una por una (B6).

**6.2.7 · [MEDIO] Botón «Ejecutar» desincronizado de su acción.** El rótulo se pintaba
al componer y el radio seguía vivo: podía rotular «mover» y ejecutar «cancelar» (B5).
*Cierre:* etiqueta centralizada (`etiquetaEjecutar`) + listener `change` en los radios.

**6.2.8 · [MEDIO] Plantilla eliminada dejaba su texto con los botones activos.** *Cierre:*
si la eliminada era la seleccionada se limpia el preview y se deshabilita (B7).

**6.2.9 · [MEDIO] `FLUJOS.html` con la navegación vieja** (link a la prueba médica de la
ronda anterior, sin los documentos de la carrera) — contradice la navegación de AGENDA
(B8). *Cierre:* nav sincronizada (Lógica · Auditoría · LEEME · front integrado).

**6.2.10 · [MEDIO] Documentos que no decían lo mismo que el código.** Tres mentiras
numéricas detectadas por la prueba documental: (a) mi propia entrega oral decía «18
marcadores» — el motor soporta **16 públicos + 5 internos**; (b) LOGICA decía «catorce
enfermedades» y la lista negra tiene **quince**; (c) este documento decía «26 PASS» y
la suite daba **28**. *Cierre:* los tres corregidos y **la prueba `pruebas-reauditoria.js`
los vigila para siempre** (si un número vuelve a desfasarse, la suite cae).

**6.2.11 · [MEDIO] El mapa del repo volvió a no cubrir una carpeta nueva** (reincisión
de P-23): ni `INDEX.md` ni el `LEEME.md` raíz mencionaban `12-AGENDA-Y-MENSAJES`. *Cierre:*
ambas entradas escritas; P-23 queda cerrado en el nivel de repo.

**6.2.12 · [BAJO] `guardaBlanca` no sincronizaba el toggle de modo** (la plantilla se
creaba en modo plantilla y el botón no lo indicaba). *Cierre:* usa `ponModo`.

**6.2.13 · [BAJO] 9 exportes sin consumidor externo** (`diasEntre`, `SIGNOSALARMA`,
`CANALES`, `PATRONES`, `plantillas`, `patronDe`, `fuenteDe`, `citasPorFecha`,
`pedidosPendientes`). *Declarado, no tocado:* son la API del motor para la fase de
producto; la prueba 4 de `pruebas-reauditoria.js` los **invoca a todos sin romper**. Si
el dueño prefiere API mínima, es su decisión eliminarlos.

**6.2.14 · [BAJO] `guardaBlanca` y modos — detalle de cierre de UI.** El texto nuevo en
modo plantilla ya no se pisa con cambios de contexto (misma máquina de estados).

## 6.3 · Lo que la reauditoría NO cambia (abiertos vigentes)

Siguen siendo decisiones del dueño, sin novedad: **N1** pantalla/firma del médico para
semanas y plantillas nuevas · **N2** quién captura el diagnóstico estructurado · **N3**
pacientes de prueba para infección y embarazo múltiple · **N4** horario editable en
Sistema vs. agenda con servidor · **N5** bitacorar intentos bloqueados o no · **N6**
compositor que regenera sobre ediciones sin avisar (mitigado con avisos, no eliminado) ·
**N7** consentimiento solo de whatsapp — más los heredados de la Ronda 2 (divulgación de
resultados, tono del duelo, frecuencia del semanal).

## 6.4 · Estado final verificado

```
node --check mensajes.js · generar-maestro.js · inline AGENDA/FLUJOS   → OK
node pruebas/pruebas-mensajes.js      → 35 PASS  TODO OK
node pruebas/pruebas-reauditoria.js   → 24 PASS  TODO OK
node pruebas/pruebas-e2e-agenda.js    → 28 PASS  TODO OK   (servidor 8124 + jsdom)
node pruebas/pruebas-e2e-rotura.js    → 15 PASS  TODO OK   (servidor 8124 + jsdom)
node generar-maestro.js               → JSON idéntico (está al día)
enlaces AGENDA/FLUJOS                 → 0 rotos
TOTAL: 102 checks en verde, 4 suites, 6 hallazgos altos cerrados en esta ronda.
```
