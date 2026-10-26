# SÍNTESIS SUMATORIA — S1 · lo adquirido, y cómo se aplica gradualmente a cada pantalla

> **Qué es:** el destilado de todo lo aprendido en las iteraciones 07 · 10/11 ·
> 12-FRONT-SINTESIS · 12-AGENDA-Y-MENSAJES y sus **6 rondas de auditoría + la
> reauditoría + la aplicación piloto de Atenciones**, organizado en **tres modelos**
> (lógico · técnico · gubernamental) como **lista de patrones con ID**, más el
> **protocolo gradual** para aplicarlos pantalla por pantalla con registro, verificación
> y auditoría **antirregresión**. Versión del documento: **S1**. Fecha: 2026-10-25.
>
> **Regla de oro:** esta síntesis **se versiona, no se edita en silencio**. Cada pantalla
> del registro declara **qué versión absorbió**; cuando este documento pasa a S2, el
> registro dice de un vistazo qué pantallas están desactualizadas. Eso es lo que impide
> regresiones y obliga a aplicar la sumatoria constantemente.

---

## 1 · Los tres modelos y dónde vive cada uno

- **---|---|---|---** — 
- ****Lógico** (ML)** — *Qué* es verdad en el sistema: reglas de la casa (FL/RF/DEC/R/B/P) convertidas en comportamiento — `05-LEY`, `06-FUENTE-BACKEND`, `LOGICA-*.md` — Un patrón aplicado = una regla citable + su prueba
- ****Técnico** (MT)** — *Cómo* está construido para que no se rompa: motor, estados, persistencia, pruebas — `motor.js`, `mensajes.js`, `MODELO-REPLICABLE.md`, `pruebas/` — Un patrón aplicado = mecanismo en código + suite que lo vigila
- ****Gubernamental** (MG)** — *Quién lo atestigua*: registro, versiones, decisiones, auditoría, mapa — `SINTESIS-REGISTRO.json`, auditorías, `INDEX.md`, `LEEME.md` — Un patrón aplicado = evidencia con conteo de comandos
---

## 2 · Lista de patrones (el checklist de la síntesis S1)

Formato de cada fila: **ID · patrón — origen — «aplicado cuando» — prueba que lo vigila**.

### 2.1 · Modelo lógico (ML-01…ML-13)

- **---|---|---|---|---** — 
- **ML-01** · **Derivar, nunca capturar**: fechas, semanas y estados salen de cálculo o eventos — origen: R-48 · 10/11 · agenda — aplicado cuando: Toda fecha sin fuente rechaza o bloquea — prueba: bordes del cálculo (hoy ⇒ 40, imposible ⇒ null)
- **ML-02** · **Sugerir con fuente, nunca decidir** — origen: agenda · R-37 — aplicado cuando: Toda propuesta muestra de dónde sale y se edita antes de ejecutar — prueba: fuente visible + agendar manual
- **ML-03** · **Frontera DEC-32 ejecutable**: lo prohibido es una lista que corre en editar · crear · entregar — origen: agenda — aplicado cuando: La regla vive en código, no solo en el PDF — prueba: inocuidad bloquea en vivo
- **ML-04** · **Cero huecos**: marcador sin resolver se conserva, jamás vacío — origen: Ronda 6 · CV — aplicado cuando: Un mensaje incompleto es visible e in copiable — prueba: bloqueo por `{{`
- **ML-05** · **Estado deducido; la vista = hechos + objetos, con divergencia visible y reparable** — origen: atenciones M1/CV4 — aplicado cuando: Toda lista se calcula; lo desincronizado se muestra con «Sincronizar/Cerrar» — prueba: conciliación: 0 divergencias en semilla
- **ML-06** · **Identidad correcta**: el mensaje/fila siempre es del sujeto actual — origen: Ronda 6 B1 — aplicado cuando: Cambiar de sujeto reconstruye o avisa — prueba: ruptura: nombre tras cambiar
- **ML-07** · **La edición propia no se pisa en silencio** — origen: Ronda 6 B3 · agenda — aplicado cuando: Estado con `editado`; cambios ajenos avisan — prueba: edición sobrevive repintados
- **ML-08** · **Dedupe verificable por clave** (no por promesa) — origen: agenda · RB — aplicado cuando: La entrega guarda `clave` y el motor rechaza repetida — prueba: duplicado rechazado
- **ML-09** · **Sin tope rígido: la métrica informa, no bloquea** — origen: FL-06 — aplicado cuando: Ningún chip rojo deshabilita una acción de atención — prueba: botón activo con chip ámbar
- **ML-10** · **El clínico vive en catálogo firmable, no en código** (P6) — origen: ley · agenda — aplicado cuando: Umbrales/textos solo en `CATALOGO`/config con `borrador` — prueba: HTML sin literales clínicos
- **ML-11** · **Firma donde la casa la exige** (alerta: nombre+cédula; nota: autor+cédula) — origen: B-013 · R-17 — aplicado cuando: Sin firma no se cierra — prueba: rechazo sin firma
- **ML-12** · **Fechas y reloj reales** (nada pegado a mano) — origen: P-19 — aplicado cuando: `hoyISO` = sistema; encabezado con `toLocaleDateString` — prueba: hoyISO contra `Date()`
- **ML-13** · **Mensaje al paciente: sin cifras ni diagnósticos, motivo general, plantilla con disparo** — origen: DEC-32/33 — aplicado cuando: Toda plantilla declara por qué llega — prueba: examen + campo de disparo no vacío
### 2.2 · Modelo técnico (MT-01…MT-12)

- **---|---|---|---|---** — 
- **MT-01** · **Motor único IIFE = única puerta**; la pantalla no muta estado directo — origen: síntesis — aplicado cuando: Toda mutación pasa por `Jornada.*`/`AgendaMsg.*` — prueba: grep de `S.*push` fuera del motor
- **MT-02** · **Validación en el motor** (la UI puede olvidar): `{ok:false, mensaje humano}` — origen: agenda · CV — aplicado cuando: Todo rechazo existe en dos lados — prueba: motor rechaza aunque la UI no
- **MT-03** · **Estado persistido con versión; migración por reconciliación, nunca por reset** — origen: CV5 — aplicado cuando: Cambios de semilla se reparan con conciliador — prueba: semilla conciliada + «Sincronizar»
- **MT-04** · **Preview con estado propio** (`sujeto, contexto, modo, editado`) — 3 garantías — origen: agenda R6 — aplicado cuando: Reconstrucción forzada en sujeto/cambio base — prueba: B1/B2/B3
- **MT-05** · **Autosave de borradores** (400 ms): nada se pierde al pausar — origen: agenda · FL-05 — aplicado cuando: Al teclear, el borrador vive en el objeto — prueba: roundtrip pausa/retoma conserva campos
- **MT-06** · **Relojes con umbrales 30/45 y color+palabra**; `pausadaEn` con ciclo de vida — origen: tarjeta · 10/11 — aplicado cuando: Toda espera/pausa con minutos reales y chip con palabra — prueba: fila con `min45`; `pausadaEn=null` al retomar
- **MT-07** · **Métricas honestas**: clamp de reloj cruzado y `null` sin muestras — origen: CV7 — aplicado cuando: Se muestra «—», no «0» — prueba: media con `abiertaEn` futuro ≥ 0
- **MT-08** · **Catálogo como dato + espejo JSON generado** (nunca a mano) — origen: agenda — aplicado cuando: `generar-*.js` regenera sin cambiar — prueba: regeneración idéntica
- **MT-09** · **Las suites cargan el código desde disco** — cero copias embebidas — origen: CV6 — aplicado cuando: `readFileSync` en toda suite — prueba: suite del motor no contiene `function semilla`
- **MT-10** · **Dependencias declaradas** (`pruebas/package.json`), nada en `/tmp` — origen: C9 — aplicado cuando: `npm install` reproduce la verificación — prueba: jsdom local resuelve
- **MT-11** · **Sin `prompt`/`alert`**: modal/toast propios; sin modales que estorben (P-30) — origen: rondas — aplicado cuando: Confirmar solo actos complejos — prueba: grep de `prompt(`
- **MT-12** · **Toda acción visible invoca API existente; enlaces estáticos 0 rotos** — origen: 07 H-092 — aplicado cuando: Acciones y `<a>` verificados — prueba: link-check + E2E
### 2.3 · Modelo gubernamental (MG-01…MG-10)

- **---|---|---|---|---** — 
- **MG-01** · **Registro por pantalla** con estados `pendiente → aplicado → verificado → auditado` — origen: este documento — aplicado cuando: Toda pantalla aparece en `SINTESIS-REGISTRO.json` — prueba: `pruebas-registro.js` exige 1:1
- **MG-02** · **Cada transición con evidencia**: comandos + conteos + archivo de detalle — origen: anti-fantasma — aplicado cuando: `checks` > 0 y `evidencia` con archivo existente — prueba: validador del registro
- **MG-03** · **Suite documental del libro**: registro = archivos = síntesis — origen: 12-AGENDA reauditoría — aplicado cuando: El registro cae si un archivo falta o sobra — prueba: `pruebas-registro.js`
- **MG-04** · **Síntesis versionada (S1…)**; cada pantalla declara la versión que absorbió — origen: este documento — aplicado cuando: Campo `sintesis` obligatorio ≠ vacío — prueba: validador + conteo de S1 vs S2
- **MG-05** · **Auditoría por rondas**: hallazgo numerado + cierre declarado (técnico o decisión) — origen: 6 rondas — aplicado cuando: Ningún hallazgo se archiva sin cierre — prueba: `pruebas-registro`: AUDITORIA-SINTESIS con «Ronda S-1» + auditoría 12-AGENDA con «Ronda 6»
- **MG-06** · **Decisiones abiertas declaradas** (N-list): nunca silenciadas — origen: Ronda 5 — aplicado cuando: Viven en LOGICA/auditoría con su N — prueba: `pruebas-registro`: LOGICA con su lista de decisiones + AUDITORIA-SINTESIS con «Decisión abierta»
- **MG-07** · **Mapa completo**: INDEX y LEEME cubren toda carpeta nueva — origen: P-23 — aplicado cuando: Entrada escrita en ambos — prueba: `pruebas-registro`: INDEX raíz y LEEME raíz mencionan `SINTESIS-SUMATORIA`
- **MG-08** · **Ninguna entrega sin salida de comando** — origen: lección «entrega fantasma» — aplicado cuando: Todo «verde» va con su `PASS`/`ls` — prueba: este registro exige conteos
- **MG-09** · **Veredicto doble por pantalla** (banda persistente + hoja) — origen: DEC-19 — aplicado cuando: Cada pantalla con banda y casilla — prueba: E2E: banda presente
- **MG-10** · **Escuela de anti-patrones**: revisar los 12 del MODELO antes de aplicar — origen: MODELO §6 — aplicado cuando: Checklist leído en cada pasada — prueba: nota en la auditoría de la pantalla
---

## 3 · El protocolo gradual (una pantalla por pasada)

```
① LEER      la síntesis S vigente + los anti-patrones del MODELO §6
② AUDITAR   la pantalla contra ML/MT/MG → hallazgos numerados (continuar la serie)
③ APLICAR   los patrones que falten (código en la pantalla ± motor)
④ PROBAR    4 planos: unidad (si toca motor) · E2E de la página · RUPTURA (diseñada
            para fallar) · documental (los números del doc = los del código)
⑤ REGISTRAR la pantalla en SINTESIS-REGISTRO.json: estado + sintesis + fecha +
            pruebas[] + checks{} + evidencia (archivo §N)
⑥ LIBRO     node pruebas/pruebas-registro.js  → debe quedar en verde
⑦ NOTA      una línea en el LEEME de la carpeta (si la pasada abre decisión,
            se declara con su N)
```

**Transiciones de estado (reglas duras):**

- **---|---|---** — 
- **`pendiente`** — `aplicado` — código escrito + `pruebas[]` declaradas + `sintaxis` OK
- **`aplicado`** — `verificado` — **todas** las suites citadas en verde con conteos reales en `checks`
- **`verificado`** — `auditado` — ronda de auditoría con hallazgos de la pantalla **cerrados** + `evidencia`
- **cualquiera** — retroceso — si la síntesis sube a S2, `sintesis` queda viejo ⇒ la pantalla aparece **desactualizada** y debe re-pasarse (eso es la anti-regresión)
**Cola:** el orden de trabajo es el orden de las filas de `SINTESIS-REGISTRO.json` —
**fuente única**; este documento ya no lo duplica (dos colas = una mentira futura).
El dueño reordenando el registro reordena el trabajo.

---

## 4 · Los tres modelos aplicados al propio mecanismo (coherencia)

- **Lógico:** cada fila de §2 es una regla con ID — ya no se discute «si está bien»;
  se discute `ML-05`.
- **Técnico:** el mecanismo de verificación existe antes que la aplicación (paso ④
  exigido por ⑤): no hay pantalla «aplicada» sin prueba escrita.
- **Gubernamental:** el registro es máquina-legible y **tiene su propia suite** (MG-03):
  el libro miente ⇒ rojo. Y el campo `sintesis` versiona la deuda.

## 5 · Cómo se amplía este mecanismo a otras carpetas

Cuando la cola llegue a otra carpeta (p. ej. `12-AGENDA-Y-MENSAJES`): los `path` del
registro soportan rutas relativas al directorio de las pruebas; se añaden sus pantallas
con el mismo formato y `pruebas-registro.js` las valida igual. Una sola síntesis, un
solo registro, todas las pantallas del repo — esa es la meta del mecanismo.

---

## 6 · Historial de versiones de la síntesis

- **S1** (2026-10-25) — versión inicial: 13 patrones ML + 12 MT + 10 MG, protocolo de
  7 pasos, estados con evidencia y anti-regresión por versión. Piloto: **atenciones
  verificado**; estacion tocada (aplicado). Auditoría de la propia propuesta: ver
  `AUDITORIA-SINTESIS.md` (Ronda S-1).

*Regla del historial: una versión nueva **nunca reescribe la anterior en silencio**; se
añade una línea aquí y el registro marca como desactualizada a toda pantalla que
declaró una versión anterior (la suite del libro lo pone en rojo).*
