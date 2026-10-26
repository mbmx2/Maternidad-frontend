# MODELO REPLICABLE — la agenda como arquitectura, explicada para volverla a construir

> **Qué es este documento:** la explicación completa del modelo implementado en
> `12-AGENDA-Y-MENSAJES/` — teórica (por qué está así), técnica (cómo está construido),
> lógica (qué invariantes lo gobiernan) y práctica (la receta para replicarlo en otro
> módulo de este software o en otro software). Escrito para quien vaya a **construir**,
> no para quien vaya a usar. Precedencia: si algo de aquí choca con la maestra del repo
> (`05-LEY/ACTA_FRONTEND.md`), manda la maestra. Fecha: 2026-10-25 · versión 2 del motor.

---

## 1 · TEORÍA — los principios que sostienen el sistema

Todo lo que sigue se reduce a **diez decisiones teóricas**. Cada una existe porque una
regla del proyecto la exige, y cada una tiene su mecanismo (sección 3) y su prueba
(sección 4).

**1.1 · Tres capas estrictas: datos · lógica · presentación.** El catálogo (datos) no
sabe de pantallas; el motor (`mensajes.js`) no sabe de HTML; la pantalla no calcula nada
propio — solo llama a la API. *Por qué:* la misma lógica debe poder servir a una pantalla
de papel, a la app real y a un futuro servicio de mensajería, sin reescribirse.

**1.2 · El umbral no vive en el código: vive en un catálogo firmable.** Rangos,
horarios, patrones y textos son **datos con estado de borrador** (`borrador: true`), no
literales de lógica. *Por qué:* P6 del proyecto — lo clínico lo firma el médico; si
estuviera en el código, cada firma sería un redeploy.

**1.3 · El motor es la única puerta.** La interfaz puede olvidar una validación: el
motor no. `entregar()` se niega por cuatro motivos (texto sin resolver, inocuidad,
sin consentimiento, dedupe); la UI solo *muestra* lo mismo. *Por qué:* defensa en
profundidad — el chip rojo es educación, el `return {ok:false}` es seguridad.

**1.4 · Derivar, nunca capturar.** La semana se **calcula** de la fecha estimada; el
horario sale de un catálogo; la fecha de un recordatorio se deduce de los hechos. *Por
qué:* R-48 — un dato derivado no se pide dos veces, no se olvida y no se contradice.

**1.5 · El sistema sugiere; el humano decide.** `sugerir()` devuelve una **propuesta con
su fuente**; agendar, mover y cancelar son botones con persona detrás; no existe ninguna
ruta automática que cree una cita. *Por qué:* la agenda toca actos clínicos y
administrativos: el software informa, nunca ejecuta por el equipo (tensión heredada
R-37/decisión del dueño: informar, no bloquear).

**1.6 · Borrador → firma → vigencia.** Todo contenido (plantillas, 40 semanas, ediciones
del equipo) nace con `borrador: true` y nombre de autor cuando alguien lo edita. *Por
qué:* P6 de nuevo, y porque «preferible no enviar» es mejor que «enviar no validado»:
la fila sin contenido **bloquea** el mensaje en vez de inventar desarrollo fetal.

**1.7 · Las reglas legales se vuelven ejecutables.** DEC-32 («el mensaje al paciente no
lleva cifras clínicas ni diagnósticos») no es un párrafo: es `PROHIBIDO`, una lista de
regex que **corre antes de copiar y antes de entregar**. *Por qué:* una regla que solo
está escrita en un PDF eventualmente se rompe; una regla que es código, no.

**1.8 · Trazabilidad por diseño.** Cada entrega guarda plantilla, paciente, canal, fecha,
hora y — cuando aplica — una **clave de dedupe** (`sem-28`). La bitácora permite
verificar el «una vez por semana» en vez de creerlo. *Por qué:* RB/B-013 de la casa:
lo no verificable no está implementado.

**1.9 · Edición en capas.** Instancia (esta paciente, este mensaje) · personalizada (con
autor, re-resoluble) · maestra (solo con firma). *Por qué:* la libertad total de edición
vuelve ingobernable el catálogo; la prohibición total de edición no sirve en la sala.

**1.10 · El papel es un prototipo ejecutable.** La pantalla de esta carrera es «papel con
motor» (DEC-19): corre en el navegador, no toca disco ni red, y su función es que el
oficio veredicto **antes** de que exista el software. *Por qué:* decidir un dibujo cuesta
cero; decidir código cuesta una iteración.

---

## 2 · TÉCNICA — cómo está construido, pieza por pieza

### 2.1 · Anatomía del módulo

```
mensajes.js     → un IIFE: var AgendaMsg = (function(){ … return {API}; })();
                  Cero dependencias, cero imports, cero globals además del nombre público.
config de datos → SEMANAS[], CATALOGO[], DIAGNOSTICOS{}, HORARIO{}, PATRONES{}
estado          → S {version, pacientes[], citas[], pedidos[], propias[], entregas[], semanasPropias[]}
persistencia    → localStorage["agenda_mensajes_v2"]; guardar() en cada mutación;
                  cargar() sólo acepta version === 2 (cambio de versión ⇒ semilla nueva)
generador       → generar-maestro.js  lee el motor y escribe MENSAJES-MAESTRO.json (espejo)
pantalla        → AGENDA.html: 5 pestañas; todo el HTML que muta estado lo hace vía API
flujos          → FLUJOS.html dibuja los 6 circuitos (el diagrama del diseño)
documentación   → LOGICA (humanos) · AUDITORIA (6 rondas) · este documento
verificación    → pruebas/ (4 suites, 102 checks)
```

**Regla de la capa:** la pantalla jamás hace `S.citas.push(…)` a mano — llama
`AgendaMsg.agendar(…)`. Si mañana el estado vive en un servidor, solo cambia la mitad
interna del IIFE.

### 2.2 · El pipeline de un mensaje (el corazón del modelo)

```
 DISPARO                SELECCIÓN            RESOLUCIÓN            EXAMEN
 un hecho de   →   elegir plantilla   →   {{marcador}} ⇒ dato  →   regex DEC-32
 la agenda         (buscador /            de una fuente            sobre el TEXTO
                   recomendadas             confiable                 final
                   / composer)
                                              │                        │
                                    faltante ⇒ MARCADOR SE CONSERVA     │
                                    (copia bloqueada, jamás hueco)      │
                                              ▼                        ▼
                              COPIA (botón)  ◄── validación en vivo ──►  ENTREGA (motor)
                                                        │              4 puertas:
                                                        ▼              resolución · inocuidad
                                              BITÁCORA con clave        · consentimiento ·
                                              (quién, cuándo, canal,     dedupe
                                               clave sem-N)
```

Cada etapa es una función nombrable: `plantillas()/recomendadas()` → `resolver()` →
`examenInocuidad()` → `entregar()`. Ese nombre es el contrato con cualquier UI futura.

### 2.3 · El algoritmo del `resolver` (marcadores)

```
resolver(texto, paciente, ctx) → { texto, faltantes[], listo }
por cada {{m}} del texto:
    fuente = { nombre: paciente.nombre, semana: cálculo(…), fecha_cita: ctx.fechaCita,
               motivo_general: ctx.motivo || "causas imprevistas…", … }
    si la fuente NO tiene dato:
        faltantes.push(m);  texto_reemplazado = {{m}}   // SE CONSERVA (nunca vacío)
    si no:
        texto_reemplazado = fuente
listo = faltantes vacío && no queda "{{" en el texto
```

Dos detalles que son **el modelo entero**:
- *Conservar el no resuelto* convierte «mensaje incompleto» en algo visible que tanto la
  UI como el motor rechazan (era el hallazgo 6.2.4: vaciarlo producía huecos silenciosos).
- *Cada marcador declara su fuente* (tabla del LOGICA §2): dato del registro, cálculo,
  contexto de la pantalla o catálogo. Un marcador sin fuente confiable no existe.

**Bordes del cálculo de semana** (el mismo patrón para cualquier derivación):
`EG = (280 − días(hoy, fechaEstimada)) / 7`; si `EG ∉ [1,42]` o `egIncerta` ⇒ `null` ⇒
mensaje bloqueado. Siempre hay guarda de rango: **un cálculo fuera de rango devuelve
«sin dato», nunca un número plausible** (regla general para toda derivación clínica).

### 2.4 · El examen de inocuidad (frontera como código)

```js
var PROHIBIDO = [ /mg\/dL/i, /g\/dL/i, … /HOMA/i,
  /(hemoglobina|glucosa|…)\s*(del|de|en)?\s*\d/i,   // analito + cifra
  /\d+[.,]\d+/ ,                                     // cualquier decimal
  /preeclampsia|vph|diabetes|…/i ,                    // 15 nombres de enfermedad
  /\{\{interno/ ];                                    // datos de ficha interna
examenInocuidad(texto) → lista de infracciones   // vacía ⇒ pasa
```

Se corre en **tres** lugares: preview (botón se deshabilita), `crearBlanca` (no crea la
plantilla) y `entregar()` (no entrega). **Límite honesto (hallazgo N1):** es una lista
negra, no comprensión semántica — la barrera final sigue siendo la revisión humana
antes de «vigente». Un modelo replicado debe decir su límite en voz alta.

### 2.5 · Disponibilidad (agenda que no pisa)

```
HORARIO = {abre:"09:00", cierra:"13:00", pasoMin:30}      // catálogo, no lógica
citasPorFecha(f)      → citas no canceladas de ese día, ordenadas
horaOcupada(f,h)      → ¿existe cita en esa hora?
siguienteLibre(f,d)   → primer paso del catálogo sin ocupar (o null)
agendar/reprogramar   → si horaOcupada ⇒ RECHAZO + sugiere siguienteLibre
sugerir(p)            → patrón(p) + fecha; si 09:00 ocupada ⇒ se mueve sola y lo dice
```

*Clave teórica:* el conflicto de agenda es un **invariante de integridad**, no una
decisión — por eso el motor lo rechaza en seco. Lo que sí es decisión (a qué hora,
si mover la cita) se deja como propuesta editable.

### 2.6 · Estado de la vista previa (el patrón del editor)

```js
preview = {tid, pid, ck, modo, texto, faltantes, editado}
reconstruir si:  tid cambió · modo cambió · pid cambió (si hay edición ⇒ AVISO)
re-resolver si:  ck (contexto) cambió Y no está editado
si editado:      el texto del usuario manda; los cambios ajenos no lo pisan
```

Invariantes que garantiza: **(i)** el mensaje nunca muestra el nombre de otra paciente;
**(ii)** una edición suya nunca desaparece sin un aviso; **(iii)** el texto validado es
exactamente el texto copiado. Cualquier UI de edición en cualquier módulo necesita estas
tres garantías — este es el patrón reutilizable.

### 2.7 · Recomendadas por capas (usabilidad de catálogos grandes)

Con 92 plantillas, navegar es el error. `recomendadas(pid)` ordena por **prioridad**
(alarma → laboratorio evidenciado → semana → logística de su cita → diagnóstico de su
etiqueta → cuidado) usando `etiquetas[]` de la paciente + `disparos[]` declarados
(`hemoglobina_alerta` ⇒ B01) + si tiene cita. La UI lo muestra activado por defecto y el
buscador libre queda para lo demás. **Patrón replicable:** catálogo grande = filtro
por defecto «lo que aplica a este sujeto», nunca «todo».

### 2.8 · Dedupe por clave y métricas

`entregar(tienda, pid, canal, texto, clave)` — la clave es compuesta y **se deduce de
los hechos** (`sem-<n>` = semana derivada). `yaEntregada()` la consulta; la bitácora la
muestra; `metricaMensajes()` reporta total/por canal/con clave/evitados. La métrica se
mide **al sistema**, nunca a las personas, y aparte de la fatiga de los avisos clínicos
(son canales distintos).

### 2.9 · Espejo máquina-legible

`generar-maestro.js` **lee** el motor y **escribe** `MENSAJES-MAESTRO.json` (conteos,
marcadores, horario, texto exacto de cada plantilla). Nunca se edita a mano; una suite
verifica que regenerarlo no lo cambia. *Por qué:* el catálogo debe poder firmarse,
versionarse y compararse fuera del navegador (y eventualmente cargarse como archivo en
el producto).

---

## 3 · LÓGICA — la tabla regla → mecanismo → prueba

Cada regla de la casa tiene **un mecanismo nombrable y una prueba que cae si se rompe**.
Esto es lo que hace al modelo auditable y es lo primero que hay que replicar:

| Regla (casa) | Mecanismo en este modelo | Prueba que la vigila |
|---|---|---|
| DEC-32: sin cifras ni dx en el mensaje | `examenInocuidad` + 3 llamadas (preview/blanca/entregar) | reauditoria · e2e B6/inocuidad-en-vivo |
| «Marcador sin resolver ⇒ bloqueo, cero huecos» | `resolver` conserva `{{m}}` | reauditoria «se conserva» · e2e B6 |
| R-48: la semana se deriva | `semanaDerivada` con guarda de rango | reauditoria bordes (40/18/null/null) |
| P6: todo nace borrador | `borrador:true` en T() · overlay de semanas con autor | motor · conteo de familias |
| El sistema sugiere, no decide | `sugerir()` con fuente · agendar es botón | e2e sugerencia/fuente |
| Nunca pisa una cita (integridad) | `agendar/reprogramar` rechazan hora ocupada | motor (rechazo + siguiente libre) |
| Preguntar también es flujo | `pedirDisponibilidad → responder → agendar` | e2e pedidos |
| Un mensual por semana-paciente | clave `sem-N` en `entregar` | motor dedupe · e2e sem-28 |
| Consentimiento por canal | gate en `entregar` | reauditoria (p5 whatsapp vs impreso) |
| Motivo de cancelación siempre general | `{{motivo_general}}` con defecto seguro | reauditoria motivo · e2e B4 |
| Identidad correcta del mensaje | `preview.pid` ⇒ reconstrucción | e2e-rotura B1 |
| La edición no se pisa en silencio | `preview.editado` + avisos | e2e-rotura B3/B3b |
| Documentos = código | `pruebas-reauditoria` (contenidos) | la propia suite |
| Trazabilidad de entrega | registro con clave/canal/fecha/hora | e2e bitácora |
| API completa e invocable | inventario de exportes + invocación | reauditoria «9 sin consumidor» |
| Fechas reales (nada pegado) | `hoyISO()` de `Date()` | reauditoria hoyISO · reloj |

---

## 4 · PRÁCTICA I — la capa de verificación (el patrón de las 4 suites)

Un modelo replicable se **prueba en cuatro planos distintos**, no uno:

1. **Unitarias del motor** (`pruebas-mensajes`, 35): ¿la lógica pura hace lo que dice?
   resolución, bordes del cálculo, rechazos, dedupe. Sin DOM, sin servidor.
2. **Documental** (`pruebas-reauditoria`, 24): ¿los documentos dicen **exactamente** lo
   que el código hace? (92=92, «quince»=15, «28 PASS»=28, el INDEX cubre la carpeta).
   *Esta suite nació de su desconfianza: impide que la documentación vuelva a mentir.*
3. **E2E de pantalla** (`pruebas-e2e-agenda`, 28): con `jsdom` contra un
   `http.server` local: pestañas, edición, compositor, grid, examen en vivo.
4. **De ruptura** (`pruebas-e2e-rotura`, 15): escritas **para fallar** — nombre de otra
   paciente, contexto ignorado, edición destruida, motivo tirado, label desfasado, las 92
   listas una por una. *Regla: si una prueba de ruptura no ha fallado alguna vez, no está
   probando nada.*

**Protocolo no negociable** (de la lección «entrega fantasma»): ninguna declaración sin
la salida de comando que la respalda — `node --check`, los conteos PASS, `ls` en disco.

---

## 5 · PRÁCTICA II — receta de replicación para otro módulo

Caso modelo: *«Módulo de Estudios: catálogo de estudios, preparación, recordatorios de
preparación y resultados»*. Los 10 pasos valen para cualquier módulo con catálogo +
derivaciones + avisos (Laboratorio, Documentos, Parto, Fichas de egreso…):

**Paso 1 · Escribir las reglas de la casa del módulo** (antes que una línea de código):
qué está prohibido revelar, qué se deriva, qué decide el humano, quién firma. Salen de
`05-LEY` y `06-FUENTE-BACKEND`, no de la imaginación.

**Paso 2 · Diseñar el catálogo con sus familias** — cada fila:
`{id, familia, subfamilia, nombre, disparo, poblacion, canales[], borrador, texto}`.
El `disparo` es obligatorio: un mensaje sin «por qué le llega» no entra.
Ej.: `T("E03","estudios","preparacion","Preparación para ultrasonido","estudio agendado…","embarazo",["whatsapp"],"…")`.

**Paso 3 · Listar marcadores y su fuente** en una tabla antes de escribir textos. Si un
marcador no tiene fuente, no existe. Si un dato se captura dos veces, está mal (Paso 4).

**Paso 4 · Marcar qué se deriva**: fórmula + rango + guarda de null (patrón §2.3).

**Paso 5 · Escribir la frontera ejecutable** del módulo: la lista de lo que nunca viaja,
como `PROHIBIDO` propio, y llamarla en los tres puntos (editar · crear · entregar).

**Paso 6 · El motor IIFE** con seis bloques, en este orden: catálogos (datos) →
estado y `cargar/guardar` con `version` → helpers puros (resolver, derivar, examinar) →
mutadores con validación (`return {ok:false,mensaje}` en texto humano) → consultas →
`return {API}`. **Ninguna mutación sin puerta.**

**Paso 7 · La pantalla patrón**: pestañas (contexto · catálogo+editor · lo derivado ·
personalizables · bitácora+métricas+examen), estado de preview §2.6, recomended-by-default
§2.7, banda de veredicto persistente, fecha real en la barra.

**Paso 8 · Generador del espejo JSON** (una función `generar-maestro.js` por módulo).

**Paso 9 · Las 4 suites** — copiar la estructura, no el texto: unitarias del módulo,
documental (contenidos del módulo), E2E, y **romper-diseñadas** (al menos: identidad
sujeto correcto, edición que sobrevive, dato derivado en su borde, frontera que bloquea).

**Paso 10 · Auditoría por rondas** en `AUDITORIA-ADVERSARIAL.md`: Ronda 1 la propuesta,
Ronda 2 la propuesta mejorada, Ronda 3 autocrítica de proceso, y luego cada pasada del
dueño con hallazgos numerados y **cierre declarado** (técno o decisión). Cerrar un
hallazgo = código + prueba + número actualizado en los tres documentos.

**Encajes ya previstos en este repo:**
- **Laboratorio (semáforo):** mismo esquema catálogo `LAB_RANGOS` → `evaluarBanda` →
  alerta con dueño (existe en `12-FRONT-SINTESIS/motor.js`; le falta su generador JSON).
- **Documentos:** plantillas con marcadores ya viven en `07-FRONT-NUEVO/generar_documento`;
  migrarlas al patrón `T()/resolver()/entregar()` les da examen y bitácora gratis.
- **Pendientes/alertas:** `nacerAlerta` con tipos y firma de cierre (B-013) es el mismo
  patrón con otra frontera.
- **Parto/egreso:** checklist por etapas = las «semanas» con overlay y firma.
- **Este software en otros módulos:** cualquier catálogo que un día cargará el dueño desde
  un archivo firmado ⇒ hoy se siembra como borrador + se genera el JSON.

**Qué NO copiar de aquí (decisiones abiertas, §11 del LOGICA):** la pantalla de firma del
médico (N1 — no existe aún), la captura del diagnóstico estructurado (N2), el horario
editable en Sistema (N4), la lista negra como sustituto de revisión humana (N1/N2 de
§6.2) — esas son las deudas declaradas, no el modelo.

---

## 6 · Los anti-patrones de esta casa (escuela de las 6 rondas)

Defectos que **ya aparecieron** y que el modelo ahora previene con mecanismo propio —
úsalos como checklist al replicar:

1. *Estado escrito a mano que no se movía* → derivar de hechos, nunca pintar.
2. *Función que la UI prometía y no hacía* («copiar» que copiaba `""`) → toda acción
   tiene prueba de ruptura.
3. *Validación solo en la pantalla* → repetirla en el motor.
4. *Contador en un documento ≠ código* → suite documental.
5. *Fecha pegada a mano* → `Date()` siempre; la prueba lo compara con el sistema.
6. *Texto resuelto guardado como plantilla* → niveles de edición con etiqueta visible.
7. *Input que nadie leía* (motivo de cancelación) → prueba de extremo a extremo que
   teclea y verifica el resultado.
8. *Rótulo desfasado de su acción* → una sola fuente de verdad para el rótulo + listener.
9. *Carpeta nueva fuera del mapa* → la suite documental exige la entrada en INDEX/LEEME.
10. *Entrega declarada sin ejecutar* → sin salida de comando, no hay entrega.
11. *Suite que embebía una copia del motor* (probaba el motor viejo, verde para siempre)
    → toda suite carga el código desde disco; una copia es un espejo, no una prueba.
12. *Vista que solo mira una de las dos fuentes de verdad* (objetos ↔ hechos) → fusionar
    y mostrar la divergencia con su reparación; y reglas finas: no todo estado exige
    objeto (la urgencia nace del aviso, no de la atención).

---

## 7 · Mapa de lectura para quien replice

| Quién | Leia primero | Luego |
|---|---|---|
| Arquitecto | este documento | `LOGICA-DE-MENSAJES.md` + `FLUJOS.html` |
| Constructor del módulo | §2 y §5 | `mensajes.js` completo + `pruebas/` |
| Auditor | §3 y §6 | `AUDITORIA-ADVERSARIAL.md` (6 rondas) |
| El dueño | §1 y §3 | la banda de veredicto de `AGENDA.html` |

Archivos, en orden: `mensajes.js` (el motor) → `AGENDA.html` (la pantalla) →
`generar-maestro.js` + `MENSAJES-MAESTRO.json` (el espejo) → `pruebas/` (102 checks) →
`LOGICA` → `FLUJOS` → `AUDITORIA` → `LEEME`.

*Este documento es la constancia de que el conocimiento del módulo no vive en la cabeza
de quien lo construyó: vive aquí, con su prueba al lado.*
