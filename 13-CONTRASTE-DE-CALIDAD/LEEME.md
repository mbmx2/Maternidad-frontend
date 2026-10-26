# 13-CONTRASTE-DE-CALIDAD — la auditoría externa, viva y con dientes

> **Qué es:** la carpeta dedicada que pidió el dueño el 2026-10-26 («Genera una carpeta
> dedicada a esto específicamente»): aquí viven (1) la auditoría adversarial de las
> entregas del constructor, (2) la auditoría de las propias propuestas del evaluador —
> quien audita también se audita —, (3) las preguntas que siguen vivas, (4) los
> requerimientos con su comprobación que puede fallar, (5) los criterios de terminado
> por módulo, (6) el plan de la rebanada funcional (que el producto se pruebe de
> verdad), y (7) el puente al lenguaje clínico común (documento 21).
> **No crea reglas nuevas del proyecto:** aplica las que ya existen (`AGENTS.md`,
> `CADENA-DE-VERDAD.md`) y entrega evidencia con su comando. Fecha de nacimiento:
> 2026-10-26. Registro del pedido: `CHECKLIST-DE-PETICIONES.md` A21 (numerada A21 por
> colisión: el constructor ya había registrado A19 y A20 con parte de estas órdenes —
> el propio hallazgo F-01 de esta auditoría, reproducido y corregido en la misma hora).

## Cómo usarla (orden de lectura)

1. `AUDITORIA-DE-LA-ENTREGA.md` — qué se midió de las entregas, con qué comando y en
   qué quedó (abierto / cerrado / retractado).
2. `AUDITORIA-PROPIA.md` — la misma vara aplicada al evaluador: qué de sus propuestas
   no sobrevivió la medición.
3. `PREGUNTAS-VIVAS.md` — las preguntas de investigación, cada una con su estado y su
   dueño. Ninguna se silencia.
4. `REQUISITOS-CON-DIENTES.md` — los diez requerimientos (RQ-A…RQ-J) ya traducidos a
   lenguaje de la práctica, cada uno con **el comando que lo cierra** — si el comando no
   puede fallar, no es un requerimiento, es un deseo.
5. `DOD-POR-MODULO.md` — qué significa «terminado» para cada pieza, con comprobaciones
   positivas **y negativas** (lo que NO debe existir).
6. `PLAN-REBANADA-FUNCIONAL.md` — el plan para que frontend y backend funcionen
   juntos en una rebanada mínima, y la prueba que valida (o refuta) que las plantillas
   sirven como fuente de verdad.
7. `PUENTE-LCL.md` — el mapa entre el documento 21 (lengua clínica común) y este
   repositorio, para que no existan dos leyes de lenguaje.

## Las tres reglas de esta carpeta

1. **Toda cifra sale de un comando fechado.** Si el disco cambia, se re-mide: nada se
   hereda de una medición anterior sin repetirlo (reglas R1/R11 de `AGENTS.md`).
2. **Quien audita se audita.** Todo hallazgo contra una entrega tiene su contrapartida
   en `AUDITORIA-PROPIA.md`. Un hallazgo sin autocrítica es mitad de hallazgo.
3. **Todo proceso de esta carpeta tiene su comprobación que puede fallar o su firma
   registrada.** Si no puede fallar, no está verificado (marco propio del dueño,
   meta-DoD). Ejemplo vivo: la comprobación de frases del dueño existía como promesa
   y hoy ya corre como herramienta (`buscar-lenguaje.js`) — ese es el salto que esta
   carpeta exige a todo lo demás.

## Cómo se audita esta propia carpeta (marco del dueño, aplicado aquí)

- **Comprobaciones negativas obligatorias:** cada documento dice también qué NO debe
  tener (por ejemplo: este archivo no lleva totales de comprobación escritos a mano —
  el vivo es `./autoauditoria.sh`).
- **Una comprobación con dientes por proceso:** los comandos de cada archivo se corren
  antes de entregar; si no corren, el archivo no se entrega.
- **Auditoría cruzada por muestreo:** una vez al mes se toma al azar un hallazgo de
  esta carpeta y se pregunta: ¿sigue abierto? ¿sigue siendo cierto? ¿sigue sin comando?
  Si alguna respuesta es no, el hallazgo se corrige o se cierra con su evidencia.

## Qué NO hay aquí

- No hay código del producto (ese vive en `12-FRONT-SINTESIS/` y en el hogar del
  producto).
- No hay reglas nuevas de gobernanza (esas viven en `AGENTS.md` y en la ley).
- No hay decisiones del dueño: las que se necesitan se listan con su consecuencia y
  su opción por defecto, y se registran en `INVENTARIO-DECISIONES.md` con su número.
