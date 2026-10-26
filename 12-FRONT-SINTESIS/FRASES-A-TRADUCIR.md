# FRASES A TRADUCIR — mensajes de pantalla que no le dicen nada útil a quien las usa

> **Qué es:** registro abierto de las frases de las pantallas que el dueño está recopilando
> porque **no significan nada (o nada lógico) para la persona final del software**.
> Cada frase entra **tal cual la escribió el dueño** (con sus originales y repetencias:
> aquí se conservan literalmente). El proceso: el dueño va alistando frases → se busca
> una traducción realmente útil para el usuario → se aplica en la pantalla → la frase
> sale de esta lista con su fecha. Cero tablas (decreto D-1). Registro abierto:
> 2026-10-26.

## Frases recibidas el 2026-10-26 (25 entradas, tal cual, con sus duplicados)

**Bloque 1 — estados y navegación:**
- «estación a medias» — probable pantalla: hoy/atenciones — *pendiente de traducción*.
- «estación a medias» (repetida por el dueño) — *pendiente*.
- «paciente abierta» — probable: atenciones/consulta — *pendiente*.
- «paciente abierta» (repetida) — *pendiente*.
- «cambie con clic en su tarjeta» — probable: hoy — *pendiente*.
- «cambie con clic en su tarjeta» (repetida) — *pendiente*.
- «sin paciente abierto» — probable: barra de contexto — *pendiente*.
- «cómo se pausa y se retoma» — probable: atenciones — *pendiente*.

**Bloque 2 — puerta y registro de llegada:**
- «registrar la puerta de la mañana» — probable: llegada — *pendiente*.
- «marque que llegó o abra su visita de hoy» — probable: llegada — *pendiente*.
- «la registramos en la puerta en tres campos» — probable: llegada — *pendiente*.

**Bloque 3 — laboratorio y papel:**
- «en el laboratorio en papel» — probable: laboratorio — *pendiente*.
- «captura de laboratorio recibido» — probable: laboratorio — *pendiente*.
- «analito» — probable: laboratorio — *pendiente*.
- «el papel llegó tarde» — probable: laboratorio (escrito tardío) — *pendiente*.
- «el papel que llega en la mano» — probable: laboratorio — *pendiente*.
- «la banda La da el catálogo firmado del médico» (sic) — probable: laboratorio (semáforo) — *pendiente*.

**Bloque 4 — avisos, urgencias y consulta:**
- «avisos por vencer o vencidos» — probable: pendientes — *pendiente*.
- «el circuito cerrado» — probable: pendientes/consulta — *pendiente*.
- «preclampsia por combinación» (sic) — probable: estación/urgencia — *pendiente*.
- «notifical solicitante y registrar la respuesta» (sic) — probable: pendientes — *pendiente*.
- «qs o f a incompleto falta conciencia se avisó al cerrar consulta» (sic) — probable:
  consulta (qSOFA) — *pendiente*.
- «escalado ventanas cerradas sin entregar» (sic) — probable: agenda (ESCALADO de
  recordatorios) — *pendiente*.

**Bloque 5 — atenciones y llamadas:**
- «atenciones abiertas varias manos nada pisado» (sic) — probable: atenciones — *pendiente*.
- «las llamadas se preparan aquí el teléfono lo contesta una persona» — probable:
  agenda/llamadas — *pendiente*.

## Reglas de este registro

1. La frase original **nunca se borra**: se marca como traducida con fecha y se añade la
   nueva (el dueño debe poder comparar).
2. Una traducción es «útil» si la persona del software entiende **qué verá, qué le pasa
   y qué puede hacer**, sin jerga interna.
3. Mientras una frase esté aquí, su pantalla no puede considerarse aceptada por el
   oficio: el lenguaje forma parte del DoD de la pantalla (nuevo criterio D-2 de
   `KPIS-Y-DOD.md`).

## Estado medido de las 25 frases en las pantallas (barrido con comando, 2026-10-26)

Se buscó cada frase en **todos** los `.html` del repositorio (sin importar mayúsculas):

- **1 en pantallas activas** (12-FRONT-SINTESIS): «analito» — vive en `consulta`,
  `calculadoras`, `laboratorio` y `CUMPLIMIENTO`. Única pendiente de traducción con
  impacto en pantalla de hoy.
- **10 solo en rondas de memoria** (07-FRONT-NUEVO, 01-DIBUJOS, 08-FLUJOS): «estación a
  medias», «paciente abierta», «cómo se pausa y se retoma», «marque que llegó o abra su
  visita de hoy», «captura de laboratorio recibido», «el papel llegó tarde», «el papel
  que llega en la mano», «el circuito cerrado» y sus repeticiones.
- **14 en ninguna pantalla** (ya no existen en ningún archivo): «cambie con clic en su
  tarjeta» (×2), «sin paciente abierto», «registrar la puerta de la mañana», «la
  registramos en la puerta en tres campos», «en el laboratorio en papel», «la banda La da
  el catálogo firmado del médico», «avisos por vencer o vencidos», «preclampsia por
  combinación», «notifical solicitante y registrar la respuesta», «qs o f a incompleto…»,
  «escalado ventanas cerradas sin entregar», «atenciones abiertas varias manos nada
  pisado», «las llamadas se preparan aquí…».

**Lectura para la gestión:** el nombre de este registro sigue siendo «frases a traducir»,
pero el barrido demuestra que **el frontend V4 ya no usa 24 de las 25**; lo que sí pides
— que ninguna frase sin sentido aparezca — se vigila ahora con prueba (criterio D-2b del
DoD v2 y check de la suite: las frases de la lista no pueden entrar a una pantalla).
Cuando traduzcas «analito», queda el registro cerrado con su fecha.
