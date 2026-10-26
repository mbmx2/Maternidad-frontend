# ANÁLISIS — `atenciones.html`: aplicar toda la lógica destilada del repo

> **Qué es:** el análisis del módulo de atenciones concurrentes de `12-FRONT-SINTESIS/`
> contra **toda** la lógica destilada — agenda (carrera 12), las iteraciones 07/10/11,
> la propia síntesis, y las 6 rondas de auditoría. Cada mejora se declara con su origen,
> su cambio concreto y la prueba que la vigilará. Fecha: 2026-10-25.

---

## 0 · Método (y por qué este análisis arranca con evidencia ejecutada)

1. Lectura línea por línea del módulo (`atenciones.html`, 136 líneas) y de las
   funciones del motor que lo gobiernan (`abrirAtencion:482`, `pausarAtencion:491`,
   `retomarAtencion:502`, `tomarPorEmergencia:511`, `borradorEstacionDe:521`).
2. **Prueba de conciliación ejecutada contra la semilla** (no una opinión):

```
--- Conciliación estado ↔ objeto de atención (semilla) ---
Sandoval Ruiz, Estela → estado 'estacion_mitad' SIN objeto de atención
García Luna, María    → estado 'pausada'        SIN objeto de atención
--- Relevancia para la pantalla ---
Estela  estado=estacion_mitad  visible-en-atenciones=NO
Rosa    estado=en_atencion     visible-en-atenciones=SÍ
María   estado=pausada         visible-en-atenciones=NO
--- ¿María pausada es retomable desde Atenciones? ---
estado: pausada | atención: no | borrador: no
```

---

## 1 · Qué el módulo ya cumple (lo que no se toca)

| Cumplimiento | Evidencia |
|---|---|
| FL-06: dueño y «en uso de X» | `atenciones.html:60` — chip + dueño por fila |
| FL-06: **sin tope rígido** | `:71` — «el equipo decide cuántas aguanta» |
| Toma por emergencia **con registro** | `:117-130` modal → `tomarPorEmergencia` → evento `atencion_tomada` con antes/ahora (`motor.js:511-519`) |
| Apertura validada por el motor | `abrirAtencion` rechaza duplicada (`motor.js:482-489`) |
| Banda de veredicto persistente (DEC-19) | `:134` `bandaVeredicto("pausa", …)` |
| Hora de apertura visible | `:60` `abierta a las HH:MM` |
| Equipo fuera (FL-10) | `:39-50` con evento |
| Retomar navega a la pantalla que restaura | `:88-94` → `retomarAtencion` → estación/consulta (el borrador lo restaura allá: P-03 ya reparado en el motor) |
| Cero `prompt()`/`alert()`; mensajes en humano | todo el módulo |

**Conclusión parcial:** la columna vertebral (dueño, pausa, toma, veredicto) es correcta;
los huecos están en **de dónde sale la lista**, en **los catálogos** y en **la prueba**.

---

## 2 · El hallazgo estructural: el doble riel divergió y la pantalla lo esconde

**(Origen: hallazgo P-10 de `AUDITORIA-ADVERSARIAL-PRUEBAS.md` — «dos fuentes que pueden
discrepar» — hoy materializado y sin vigilancia.)**

La lista itera **solo los objetos** de atención (`atenciones.html:53`
`S.atenciones.filter(abierta)`), mientras que la verdad clínica del paciente es el
**estado derivado de eventos**. Cuando ambas fuentes discrepan, la pantalla no miente:
**se queda muda**. La salida ejecutada (§0) lo prueba:

- **Estela** está en `estacion_mitad` (su borrador vive en el evento) → **invisible** en
  la pantalla que existe precisamente para mostrarla.
- **María** está `pausada` con borrador de consulta → **invisible y sin ningún camino de
  retoma** en esta pantalla (el único retomar que existe itera objetos).
- **Gabriela** está `urgente` (atención de urgencia en curso) → **fuera del modelo**: la
  semilla solo conoce tipos `estacion|consulta`.

Causas raíz: (a) la pantalla deriva de objetos, no de hechos; (b) la semilla crea
estados de evento **sin** su objeto de atención; (c) los tipos están pegados en un
`<select>` (`atenciones.html:24`), no en un catálogo.

> **Principio destilado que aplica (agenda):** *el estado se deduce, no se captura — y la
> vista también*. Si `12-AGENDA` dedujo sus listas de hechos, aquí lo mismo: la lista de
> «lo que está abierto» debe ser **calculada** de `estadoDe` **y** de los objetos, y la
> divergencia debe **mostrarse con su reparación**, no taparse.

---

## 3 · Inventario: lógica destilada por iteración → mejora directa

| # | Origen (iteración / regla) | Lógica destilada | Mejora directa en el módulo | Alcance |
|---|---|---|---|---|
| A1 | **Agenda** · «estado deducido» | La vista se calcula de hechos | **Lista unificada**: estados `en_atencion/pausada/estacion_mitad/urgente` ∪ objetos; si divergen, chip rojo «desincronizado» + acción de reparación | pantalla |
| A2 | **Agenda** · `CATALOGO` + P6 | Catálogo declarado, no literales | **`TIPOS_ATENCION`** en el motor: `{estacion, consulta, urgencia, …}` con dueño por defecto, pantalla asociada, si lleva borrador, si es tomable; el `<select>` y los `if` del módulo leen el catálogo | motor + pantalla |
| A3 | **Agenda** · `metricaMensajes` + R-20 | Métrica del sistema, no de personas | **`metricaAtenciones()`**: abiertas/pausadas, minutos medio abierto/pausado, tomas del día; panel con chip verde/rojo | motor + pantalla |
| A4 | **Agenda** · pestaña Entregados | Bitácora visible de lo que pasó | **Panel «Quién tomó qué»**: eventos `atencion_tomada/pausada/retomada` con hora y de quién — la toma por emergencia deja de estar «guardada en invisible» | pantalla |
| A5 | **Agenda** · `siguienteLibre` (rechazo con salida) | Un rechazo siempre ofrece el siguiente paso | `abrirAtencion` rechaza → además del toast, botones concretos («Pausar la de X y abrir la mía», «Ir a su pantalla») | pantalla |
| A6 | **Agenda** · `preview` con estado | La edición no se pierde por repintado | **Autosave del borrador**: `estacion.html` escribe en el objeto de atención al teclear (`a.borrador` en `input`), con su `editado` — así «Pausar» desde Atenciones conserva lo último escrito aunque nadie haya pulsado «Pausar» en estación | estacion + motor |
| A7 | **Agenda** · las 4 suites | Verificación en 4 planos | **`pruebas/` para este módulo**: unidad (conciliación) · E2E (pantalla) · **ruptura** (María retomable, Estela visible, toma con rastro) · documental (números del doc = código) | pruebas |
| A8 | **10/11** · `05-PAUSA` (C-list) | Mostraba «estación a mitad» derivada de estados | Recuperar lo perdido en la síntesis: las mitades sin objeto vuelven a la lista (lo da A1 de gratis) | pantalla |
| A9 | **10/11** · Ronda 4 hallazgo P-30 | «≤5 toques»: sin modales que estorben | El «Pausar» de estación **hoy navega a otra pantalla en vez de pausar** (`:78-81`) — con A6 pasa a pausar **directo** con su borrador | pantalla |
| A10 | **Síntesis** · `tarjetaHTML` | Relojes con umbrales 30/45 y color+palabra | **Reloj por fila**: «abierta 12 min» / «pausada 40 min» con chips `min30/min45` — el reloj de la pausa importa tanto como el de la espera | pantalla + motor (`pausadaEn`) |
| A11 | **07** · lecciones H-092/H-094 | API invocada y riel honesto | Auditoría de acciones: toda acción visible toca una función del motor que existe; los enlaces solo apuntan a pantallas que existen (verificado: ya cumple — se conserva como prueba) | pruebas |
| A12 | **P-03** (síntesis) | Borrador por evento, no por estado | `borradorEstacionDe` cubre también el evento `pausada` con borrador de estación (hoy solo `estacion_mitad` + objeto, `motor.js:521-531`) — cierre del hueco del roundtrip | motor |
| A13 | **FL-06 + `ATENCIONES-CONCURRENTES`** | Invariantes (i) cero campos perdidos · (ii) toma registrada · (iii) en uso | **Invariante (i) como prueba**: roundtrip pausar→retomar restaura campo por campo — hoy **no existe ninguna prueba** de ese roundtrip | pruebas |
| A14 | **Auditoría Ronda 6** · anti-patrón 9 | El mapa cubre todo | Registrar este análisis en el LEEME del módulo y sus números en la suite documental | docs |

---

## 4 · Backlog priorizado (mejoras directas, en orden de aplicación)

| ID | Pri | Cambio concreto | Archivos | Prueba que lo vigila |
|---|---|---|---|---|
| **M1** | ALTO | `conciliarAtenciones()` en el motor: devuelve `abiertas` fusionadas de hechos+objetos **y** `divergencias[]`; la pantalla las pinta con reparación | `motor.js`, `atenciones.html:51-95` | unidad: semilla sin divergencias · ruptura: Estela y María visibles |
| **M2** | ALTO | Semilla coherente: atención para Estela (estación, con borrador), María (consulta, pausada, borrador) y Gabriela (**tipo urgencia**); el conciliador vigila las futuras | `motor.js` semilla `:154-156` | unidad: `divergencias.length === 0` |
| **M3** | ALTO | `pruebas/` del módulo con las 4 planos: unit (conciliación + roundtrip pausa/retoma), E2E (lista, métrica, bitácora), ruptura (los 3 huecos de §2), documental (números) | `12-FRONT-SINTESIS/pruebas/` | las propias |
| **M4** | MEDIO | `TIPOS_ATENCION` como catálogo (incluye urgencia); `<select>` e `if` derivados de él | `motor.js`, `atenciones.html:24,59,66,113-115` | unit: tipos con dueño/pantalla |
| **M5** | MEDIO | Autosave de borrador de estación al escribir + «Pausar» directo sin navegar (cierra A6/A9) | `estacion.html`, `atenciones.html:78-81` | ruptura: escribir → pausar desde Atenciones → retomar ⇒ campo presente |
| **M6** | MEDIO | Relojes con umbrales 30/45 por fila (+`pausadaEn` al pausar) | `motor.js`, `atenciones.html:60` | E2E: fila con chip `min45` |
| **M7** | MEDIO | `metricaAtenciones()` + panel (abiertas/pausadas/medias/tomas) | `motor.js`, `atenciones.html` | unit + E2E |
| **M8** | MEDIO | Panel de bitácora visible (`atencion_tomada/pausada/retomada`) | `atenciones.html` | ruptura: tomar ⇒ aparece con hora y de quién |
| **M9** | BAJO | Rechazos con salida concretos | `atenciones.html:109-116` | E2E |
| **M10** | BAJO | `borradorEstacionDe` cubre evento `pausada` de estación (A12) | `motor.js:521` | unit |

**Orden de aplicación propuesto:** M1 → M2 → M3 (verde con los huecos cerrados) →
M5 → M6 → M7 → M8 → M4 → M9/M10. La lógica de la agenda entra en el orden en que su
verificación la sostiene: primero *que la lista diga la verdad*, después *que las
acciones no pierdan nada*, después *que se mida y se vea*, y solo al final *que todo lo
pegado salga del HTML a un catálogo*.

---

## 5 · Qué NO aplicar aquí (límites del módulo)

- **Sin tope de aperturas** (FL-06): la métrica informa, jamás bloquea un botón.
- **Sin catálogo de mensajes**: esta pantalla no compone mensajes — la lógica de
  plantillas/marcadores/examen vive donde hay destinatario (`12-AGENDA`); aquí solo se
  heredan sus *patrones* (catálogo, métrica, bitácora, verificación), no su contenido.
- **Sin modales de confirmación innecesarios** (P-30): confirmar solo actos
  destructivos complejos (la toma por emergencia lo es: conserva su modal).
- **Sin roles inventados**: el módulo habla de «equipo», como su sintaxis actual.
- **Sin fechas ni horas escritas a mano** (P-19): todo `Date()`/eventos.

---

## 6 · Plan de verificación del módulo (las 4 suites, adaptadas)

1. **Unidad** (`pruebas-atenciones.js`): conciliación de semilla · roundtrip
   pausar/retomar conserva los 10 campos · toma registra antes/después · rechazo de
   apertura duplicada · `TIPOS_ATENCION` completo.
2. **E2E** (`jsdom` contra `http://127.0.0.1:8123`): lista renderizada con las fuentes
   fusionadas · métrica · bitácora · relojes · rechazo con salida.
3. **Ruptura**: Estela visible estando `estacion_mitad` sin navegar · María retomable
   desde esta pantalla · escribir en estación → pausar aquí → retomar ⇒ texto intacto ·
   tomar ⇒ el rastro aparece en pantalla.
4. **Documental**: los conteos de este documento y del LEEME = código (mismo patrón que
   `12-AGENDA/pruebas/pruebas-reauditoria.js`).

*Este análisis es la constancia previa a la reparación: los tres huecos de §2 están
reproducidos con salida de comando, y cada mejora del backlog nace con su prueba
asignada — la forma en que esta casa acepta trabajo nuevo.*
---

# §7 · Aplicación (M1…M10) y CONSIDERACIONES VITALES halladas al implementar

> Estado: **aplicado y verificado** — batería del módulo en verde:
> `pruebas-motor` 32 · `pruebas-atenciones` 33 · `pruebas-e2e` (18 páginas) 95 ·
> `pruebas-e2e-atenciones` 19 → **179 PASS · 0 FAIL**.

## 7.1 · Qué se aplicó

| ID | Aplicado como | Dónde |
|---|---|---|
| M1 | `conciliarAtenciones()` (filas fusionadas + `divergencias[]`) y `repararAtencion()` (crea objeto faltante / cierra huérfano, con evento) | `motor.js` |
| M2 | Semilla coherente: 4 atenciones (Rosa, María pausada+borrador, Estación de Estela+borrador, urgencia de Gabriela) | `motor.js` semilla |
| M3 | 4 planos del módulo: `pruebas-atenciones` (33) · `pruebas-e2e-atenciones` (19) · motor desde disco · página completa | `pruebas/` |
| M4 | `TIPOS_ATENCION` con dueño/pantalla/conBorrador/tomable/**abrible**; el `<select>` y los saltos a pantallas lo leen | `motor.js` + `atenciones.html` |
| M5 | Autosave del borrador de estación al teclear (`abrirAtencion` perezosa + `guardar` con 400 ms) y **«Pausar» directo sin navegar** | `estacion.html` + `atenciones.html` |
| M6 | Reloj por fila con umbrales 30/45 («abierta N min» / «pausada N min») + `pausadaEn` con ciclo de vida | `motor.js` + `atenciones.html` |
| M7 | `metricaAtenciones()` con clamps y nulos honestos + panel de carga | `motor.js` + `atenciones.html` |
| M8 | Panel «Quién tomó qué» (tomas, pausas, retomas, sincronizaciones y cierres con hora) | `atenciones.html` |
| M9 | Rechazo con salida accionable («abrir su pantalla y retomarla») | `atenciones.html` |
| M10 | **Re-alcance: ver CV1** — el borrador de estación se limita a su tipo; el de consulta nunca se cuela | `motor.js` |

## 7.2 · Las 8 consideraciones VITALES que la implementación destapó

Estas no estaban en el backlog: aparecieron al construir y probar. Se quedan escritas
porque son las que deciden si el modelo es correcto:

**CV1 · Los borradores cruzaban tipos (bug real, hallado por la prueba).**
`borradorEstacionDe` devolvía el borrador de **cualquier** atención abierta: el texto de
la nota de consulta de María habría volcado a los campos de constantes. *Cierre:*
guard `a.tipo === "estacion"` + prueba C1 que fallaba antes de existir el guard.
(Además: M10, tal como se había propuesto, habría **ampliado** el cruce — se re-alcancó.)

**CV2 · Cerrar la urgencia sin cerrar su atención creaba huérfanos.**
El backlog añadía la atención de urgencia (M2), pero `resolverUrgencia` no la cerraba:
toda urgencia resuelta habría dejado un «atención huérfana» en la pantalla. *Cierre:*
referida y atendida cierran SU atención con evento; **«motivo» la deja viva** (solo se
cierra el aviso, la atención continúa) — matiz clínico, probado en los dos caminos.

**CV3 · El catálogo necesitaba «abrible»: la urgencia no es un tipo que se abre.**
Poner `urgencia` en el `<select>` habría invitado a crear urgencias **sin aviso tipo 4**,
bypasseando FL-08 (la urgencia nace de la voz → sistema, con su alerta). *Cierre:*
campo `abrible` en el catálogo **y gate en el motor** (`abrirAtencion` la rechaza con
mensaje que nombra la regla) — la UI no es la única puerta (prueba C15).

**CV4 · Exigir objeto a `urgente` habría inundado la pantalla de falsos rojos.**
El estado `urgente` nace de un **aviso** (`nacerAlerta` tipo 4), no de una atención:
cada laboratorio crítico habría generado una «desincronización» y la métrica se habría
vuelto ruido. *Cierre:* regla fina de conciliación — `en_atencion/pausada/estacion_mitad`
**exigen** objeto; `urgente` **no** (se lista igual, con su enlace a la urgencia). Este
es el matiz que separa «vista deducida» de «vista inquisidora».

**CV5 · Subir la versión de la semilla habría borrado datos de usuarios.**
M2 cambiaba la semilla: la solución fácil (nueva `version` ⇒ re-sembrado) destruiría la
jornada de quien ya estuviera usándola. *Cierre:* versión intacta + conciliador que
repara sesiones viejas con «Sincronizar» (la divergencia es el mecanismo de migración,
no el borrado). Migración por reconciliación, no por reset.

**CV6 · Las suites del motor estaban EMBEBIDAS: verde falso garantizado.**
`pruebas-motor.js` traía una **copia** de config+motor (0 `readFileSync`): el motor que
probaba era el anterior a cualquier arreglo, para siempre. *Cierre:* carga desde disco
(`eval(readFileSync(config|motor))`) — misma regla que la suite documental de 12-AGENDA;
y jsdom ahora es dependencia en `pruebas/package.json` (no `/tmp`, que desaparece).

**CV7 · La métrica prometía precisión que no tenía.**
Con reloj cruzado (medianoche) los minutos salen negativos; sin muestras, el promedio
de 0 miente. *Cierre:* `Math.max(0,…)` por muestra y `null` cuando no hay nulos — se
muestra «—», no «0 min». Prueba C4 con `abiertaEn` en el futuro.

**CV8 · Fila única por paciente y ciclo de vida de `pausadaEn`.**
La fusión podía duplicar (objeto + estado); `pausadaEn` podía quedarse fantasma tras
retomar. *Cierre:* pid deduplicado con el objeto como autoridad (prueba C12) y
`pausadaEn = null` en `retomarAtencion` (prueba de roundtrip).

## 7.3 · Cifras de la verificación

```
node pruebas/pruebas-motor.js            → 32 PASS  (motor vivo desde disco)
node pruebas/pruebas-atenciones.js       → 33 PASS  (conciliación, C1/C2/C4/C15/C16…)
node pruebas/pruebas-e2e.js              → 95 PASS  (18 páginas sin errores)
node pruebas/pruebas-e2e-atenciones.js   → 19 PASS  (ruptura del módulo, servidor 8123)
TOTAL                                    → 179 PASS · 0 FAIL
```
