# Auditoría propia — quien audita también se audita

> **Qué es:** la misma vara que `AUDITORIA-DE-LA-ENTREGA.md` aplicada a las propias
> propuestas del evaluador externo (las 20 preguntas, los 10 requerimientos RQ-A…RQ-J
> y los DoD por módulo entregados el 2026-10-26). Regla de esta carpeta: **un hallazgo
> sin autocrítica es mitad de hallazgo.** Todo lo que sigue se midió con el mismo
> criterio que la auditoría de las entregas.

## M-01 · Los diez requerimientos llegaron sin su comprobación que puede fallar — **CORREGIDO AQUÍ**
- **Qué se midió:** los RQ-A…RQ-J se entregaron como exigencias en prosa; ninguno
  traía el comando que lo cierra. Eso viola el meta-DoD del marco propio del dueño
  (§4: «un proceso sin comprobación con dientes no está verificado») — es decir, el
  evaluador exigió dientes y entregó goma.
- **Corrección:** en `REQUISITOS-CON-DIENTES.md` cada RQ nace con su comando que
  falla hoy (o se declara honestamente «sin comprobación todavía» con su dueño).

## M-02 · Se citaron cifras ajenas sin re-medirlas — **PARCIALMENTE CORREGIDO**
- **Qué se midió:** se escribió «273 archivos» (medido: 274) y se tomó por buena la
  «guardia de las 25 frases» sin verificar su máquina (era 5 frases × 1 pantalla;
  ver hallazgo F-03 de la auditoría de entregas).
- **Corrección:** toda cifra de esta carpeta trae comando propio con fecha. La lección
  es la regla R1 aplicada al auditor: **la regla no es del constructor, es del repo.**

## M-03 · El lenguaje de las propuestas no pasaba la prueba del espejo — **CORREGIDO AQUÍ**
- **Qué se midió:** se usaron sin traducir «DoD», «huella», «dueño de la alerta»,
  «operaciones del enchufe» — el documento 21 (LCL) corrige todo eso: criterios de
  terminado, sello, alerta con conducta, enchufe va entre paréntesis como nota
  técnica.
- **Corrección:** esta carpeta escribe «criterios de terminado (DoD)», «alerta con
  conducta» y traduce cada clave en su primera aparición. El traductor es la prueba
  del espejo del §0 del documento 21.

## M-04 · Se acusó sin verificar la propiedad del archivo — **CORREGIDO (hallazgo F-06 retractado)**
- **Qué se midió:** se señaló a `ACUERDOS.md` por tener tablas fuera del backlog de
  conversión, sin verificar que vive en un **espejo de la maestra** (`04-METODO`,
  carpetas 01–05 que no se editan aquí, ley R14). La acusación era imposible de
  cumplir legalmente.
- **Lección:** antes de acusar, preguntar «¿es obra propia o es copia?». Auditoría de
  un repo de espejos sin esa pregunta produce falsos positivos con olor de rigor.

## M-05 · Se afirmó «0 campos de fecha sin calendario» como pendiente sin medir — **CORREGIDO**
- **Qué se midió:** se tomó del plan la cifra de calendarios pendientes sin barrer
  los HTML. Al barrer: 11 campos con etiqueta de fecha en 5 pantallas, **todos** con
  calendario nativo (`type="date"`). El requisito D-2a de la agenda está cumplido en
  lo medible.
- **Lección:** una cifra ajena citada sin barrido propio es deuda, no dato.

## M-06 · El plan de rebanada se entregó con la decisión de stack sin tomar — **DECLARADO, NO RESUELTO**
- **Qué se midió:** el plan de la sección funcional dejó «Python si…, Node si…» como
  pregunta abierta sin opción por defecto — eso traslada al dueño una decisión
  técnica que es del oficio.
- **Corrección parcial:** en `PLAN-REBANADA-FUNCIONAL.md` se declara **opción por
  defecto (Python)** con su consecuencia y su reversibilidad, para que la decisión
  sea un clic, no un estudio. La decisión final sigue siendo del dueño (número por
  registrar en el inventario si él la confirma).

## Lo que SÍ resistió la re-medición

- «1 de 17 módulos backend escrito» → confirmado en el menú de `FUENTE-DE-VERDAD.md`.
- «25 frases en el registro» → confirmado por conteo (`grep -c '^- «'` = 25).
- «16 de 17 pantallas bajo DoD v2» → coherente con el registro del libro.
- La estructura de los RQ y de los DoD por módulo → sigue siendo el esqueleto que el
  constructor ya está ejecutando (RQ-A ejecutado como `CADENA-DE-VERDAD.md`,
  decisiones D-5…D-8 registradas del A13).

## Conclusión de la autocrítica

Los defectos del evaluador fueron de tres clases, y las tres se corrigen con el mismo
mecanismo que el proyecto ya tiene: **cifra con comando** (M-02, M-05), **promesa con
máquina** (M-01) y **palabra con traducción** (M-03). La clase restante — acusar sin
verificar la propiedad del archivo (M-04) — se corrige con una pregunta al empezar
toda auditoría: ¿este archivo es obra propia o es copia de la maestra?
