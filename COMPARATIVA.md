# COMPARATIVA — las dos rondas de pantallas: sus lógicas de flujo y el rescate

> **Qué es:** la comparación estructurada entre la **ronda 1** (las 33 páginas de
> `01-DIBUJOS/EDICION/PROPUESTAS/`) y la **ronda 2** (las 9 de `07-FRONT-NUEVO/`),
> pedida para que una misma lectura explique **la lógica del flujo de las pantallas
> nuevas** y **la lógica del flujo de los prototipos anteriores** —y para dejar escrita,
> ante su crítica de que lo actual está *mal e incompleto*, **qué es lo que sí se rescata**.
> Fecha: 2026-10-25 · los defectos que reconozco de la ronda 2 ya están en el buzón:
> **H-061** (el puente no implementa todo su catálogo), **H-062** (el circuito cerrado no
> cierra el círculo: guardar control no genera alerta), **H-063** (la estación dibuja 9
> campos y R-14 exige 10).

## 1 · La lógica del flujo de la ronda 1 (los prototipos previos)

**Cómo se organiza:** por **objeto** — 33 páginas que son las piezas del software
(consultas, cálculos, documentos, historia, sistema…), presentadas primero por un índice
general y acompañadas de tres recorridos por rol (`RUTAS/`) que cuentan la jornada.

**Dónde vive su flujo:** **fuera de las pantallas**. El día de la enfermera y el de la
médica existen como relato en las rutas; las páginas no lo ejecutan — un recorrido es un
paseo narrado por un conjunto de dibujos. El flujo se **describe**, no se **corre**.

**Cómo trata los estados:** los escribe **a mano en el HTML** («5 atendidas», «1 urgente»
como texto pegado). La pantalla promete estados que se mueven solos y en realidad está
congelada: el error de raíz que su propio cierre anunciaba —«nadie arrastra tarjetas»— no
se puede demostrar porque nada se arranca.

**Su navegación:** riel de **15 enlaces**, con más de la mitad apuntando a un índice
placeholder — se navega por organigrama del software, no por jornada.

**Su fortaleza (que hay que reconocer):** **cobertura total** — todo el alcance está
dibujado, hasta pantalla de fallas, respaldo, importación y acceso; cada página con su
banda de pregunta y veredicto; las réplicas C-01…C-25 ancladas al programa real; y las
rutas como instrumento de presentación ante el equipo.

## 2 · La lógica del flujo de la ronda 2 (las pantallas nuevas)

**Cómo se organiza:** por **momento de la jornada** — 9 pantallas en el orden en que el
día sucede (llegada → estación → consulta → pendientes → papeles → agenda → cierre),
con el inicio = El día (FL-01). *(Actualización del mismo día: la familia creció a **25
piezas** — ver el LEEME de `07-FRONT-NUEVO/`; esta comparación conserva el número con el
que se escribió.)*

**Dónde vive su flujo:** **dentro de las pantallas** — el `puente.js` tiene los hechos del
día en memoria, registra eventos y las pantallas se pintan de ahí: registrar, pausar o
cerrar **mueve** la tarjeta de verdad. El flujo no se narra: se ejecuta (con datos de
mentiras, pero se ejecuta).

**Cómo trata los estados:** son **derivados** — la columna y el contador se calculan de
los hechos; nadie escribió «5 atendidas» en el HTML.

**Su navegación:** riel de **7 destinos reales** (lo que se *busca*) + la paciente en
contexto en la barra superior (lo que se *está* atendiendo). Una sola paciente viaja entre
pantallas.

**Su deuda:** **cobertura corta** — ver §4.

## 3 · La comparación, eje por eje

- **Organización:** ronda 1 = catálogo de piezas (objeto); ronda 2 = jornada (momento).
- **Flujo:** ronda 1 = relato en rutas, fuera de las pantallas; ronda 2 = ejecución en el
  puente, dentro de las pantallas.
- **Estados:** ronda 1 = texto congelado; ronda 2 = cálculo desde hechos.
- **Navegación:** ronda 1 = 15 enlaces de organigrama; ronda 2 = 7 destinos + contexto.
- **Cobertura:** ronda 1 = todo el alcance (33); ronda 2 = la espina del día (9) y nada
  más — **aquí pierde la ronda 2**.
- **Veredicto:** ambas con banda en cada pantalla; la ronda 1 además tiene las rutas como
  instrumento de presentación que a la ronda 2 le falta — **la ronda 2 pierde otra**.
- **Vínculo con la verdad:** la ronda 1 cita contratos y requisitos en sus pies; la ronda 2
  cita los FL-xx (el flujo declarado) y su costura en `COMUNICACION.md`.
- **Verificabilidad:** la ronda 1 solo se mira; la ronda 2 se **corre** (registrar cambió
  la tarjeta, la alerta sin cédula se niega).

## 4 · Lo que está incompleto en la ronda 2 (lista honesta)

**Pantallas que faltan y que el flujo declarado exige** (con su FL o casa):

- **Acceso con PIN** (R-26) — el día no puede empezar sin ella.
- **Ficha de la paciente** con sus fundamentales editables (R-03) y el **«completar ficha»**
  de la emergencia con su plazo (FL-12) — la cinta los muestra pero no se pueden completar.
- **Urgencia/emergencia real** (FL-08/FL-12): banderas rojas, marcar urgencia desde la
  pantalla, tarjeta roja, la hoja de traslado — hoy solo existe la tarjeta ya urgente.
- **Laboratorio** (FL-07): captura de tres datos en treinta segundos, semáforo, escrito
  tardío — pantalla **entera ausente**.
- **Protocolos y calendarios** (FL-13 completo, contratos PROTOCOLOS): vencidos con dueño
  sí (Pendientes), pero calendario por diagnóstico, puerperio y varios protocolos a la vez:
  **ausentes**.
- **Calculadoras** (R-19): las 18 con prefill e interpretación — solo hay dos chips sueltos
  en la estación.
- **Historia clínica** (R-17/18/36/41): evoluciones previas, NOM-004 dentro de la nota,
  interconsulta, pendientes con vencimiento — la consulta solo tiene un cuadro de texto.
- **Estudios y adjuntos** (R-30…R-32, R-09): ultrasonido, ingestación, consentimiento de
  imagen — ausentes.
- **Falla y puente de papel** (FL-14): los seis guiones en humano — ausentes.
- **Respaldo con drill** (R-12): hoy solo una línea de texto en Sistema.
- **Homónimas en la búsqueda** (R-10): la búsqueda de Llegadas no avisa de parecidas.
- **Atenciones abiertas** (pantalla de pausa con «en uso de X»): solo hay un botón de
  pausa por tarjeta.
- **Rutas/recorrido por rol** como instrumento de veredicto con el kit.

**Cableados que faltan dentro de lo dibujado** (defectos registrados): las seis operaciones
sin implementar del puente (**H-061**), el circuito alerta sin cerrar desde el control
(**H-062**), los 9 campos de la estación contra los 10 de R-14 (**H-063**); más: los botones
de Documentos solo avisan (no simulan el camino completo) y la nota de consulta no lista
evoluciones previas.

## 5 · Lo que se rescata del flujo actual (incluso si está mal e incompleto)

1. **La costura** — que las pantallas hablen solo con operaciones del puente, con eventos
   registrados y estado en un solo lugar (`COMUNICACION.md` + `puente.js`). Es el hueso:
   cualquier rediseño vuelve a montarse sobre esto sin reescribirlo. Quedó probada: un clic
   cambió una tarjeta sin tocar el HTML.
2. **El principio del riel** — buscar (7 destinos) separado de estar (contexto en la
   barra). El error de los 15 enlaces no vuelve aunque cambie todo lo demás.
3. **Los estados derivados** — pintar desde los hechos, jamás texto pegado. Es el antídoto
   exacto del error de raíz de la ronda 1.
4. **Una paciente en contexto con cinta** — el viaje del contexto entre pantallas y la
   identidad siempre visible antes de escribir (pilar 3, contrato IDENTIDAD-CONTEXTO).
5. **Las reglas de seguridad ya dibujadas, de punta a punta**: guardar nunca bloquea con
   chips después de guardado y los tres niveles (incluido «esperado en embarazo»); la
   alerta que **no se cierra sin nombre y cédula**, con sus tres cierres legales y el
   dedupe — B-013 hecha pantalla.
6. **La puerta con los cinco datos de la visita** (H-039) y el registro de tres campos con
   «falta completar ficha» — la forma que usted pidió del día 1.
7. **El cierre como pliegue calculado e imprimible** (FL-15): nada de capturar el resumen
   a mano; la impresión funciona de verdad.
8. **La agenda honesta** — recordatorios listos para copiar y llamada humana, cero envío
   automático (FL-02, P1).
9. **Las bandas de pregunta y veredicto en cada pantalla** — el kit de revisión intacto.
10. **`front.css` como sistema de diseño** — retícula que se acomoda sin scroll (el defecto
    H-040 ya no puede existir), chips siempre color **y** palabra, relojes con umbrales
    30/45, y estilo de impresión para el traspaso.

## 6 · Recomendación (lo que se hace con esto)

**Se conserva sin tocar** todo el §5 —costura, principios y reglas dibujadas— y las 9
pantallas sobreviven como **espina de la jornada**. **Se completa** la lista del §4 como
trabajo siguiente sobre esa misma costura (las pantallas faltantes entran en orden FL:
laboratorio, urgencia, ficha, historia, protocolos, calculadoras, acceso, falla…) y se
cierran los tres defectos H-061/062/063 antes de pedir cualquier veredicto — un equipo no
debe votar un dibujo con el circuito insignia sin cablear. Si su «mal» apunta a la forma de
una pantalla concreta —diseño, distribución, lenguaje—, esa se rehace sobre la misma
costura, sin tocar el rescate: basta que nombre la pantalla.

---

**Bitácora:** 2026-10-25 — comparativa pedida por el dueño tras su veredicto de «mal e
incompleto»; defectos propios registrados como H-061/062/063 (registro primero, reparación
después) y entrada B-016 en `CONSTRUCCION.md`.
