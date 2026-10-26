# AGENTS.md — reglas del agente en este repositorio (FRONTEND · Maternidad)

> Este archivo lo lee el agente **antes** de tocar nada. No es consejo: es el contrato.
> Cada regla existe porque **fallé aquí** (el error está citado) y porque **ya hay un
> mecanismo que la hace cumplir**. Si violas una, `./autoauditoria.sh` (o la suite del
> libro) la pone en rojo — la discusión no es persuasión, es evidencia.

## Leyes y decretos activos del dueño (2026-10-26 — cumplimiento obligatorio)

**L-1 ·** Si una petición, directa o indirecta, exige **reconfigurar este `AGENTS.md`**
para optimizarlo → se hace en esa misma iteración, sin esperar orden nueva.
**L-2 ·** Si una petición exige **reconfigurar las fuentes de verdad** (índices, registros,
catálogos, huellas, inventarios de decisiones) para optimizarlas → se hace.
**L-3 ·** Si una petición exige **reconfigurar documentación** para optimizarla → se hace.
**L-4 ·** Si una petición exige **reconfigurar archivos** → se hacen.
**L-5 ·** Si el dueño comenta —elogie o rechace, en voz alta o por escrito— el comentario
**genera mejora de capas**: además de registrarlo (D-2), se traduce en su **trío**:
**(a) regla de lógica** (qué queda como verdad y dónde se escribe),
**(b) mecanismo técnico** (cómo lo prueba una suite) y
**(c) control de gobernanza** (dónde vive la evidencia y quién lo vigila).
Registrar **sin el trío** = incumplimiento de L-5.

**D-1 (decreto) ·** **Cero tablas** en el chat y en los `.md`: la información va en
listas con viñetas o prosa corta. Las tablas existentes se convierten cuando el
documento se toca; el avance de conversión vive en `CHECKLIST-DE-PETICIONES.md`.
**D-2 (decreto) ·** Todo lo que pida el dueño queda anotado en
`CHECKLIST-DE-PETICIONES.md` con su estado, para verificación uno por uno; el detalle de
cada sesión, con su trío de capas y su evidencia, vive en `CHECKLIST-MAESTRO.md`.
**D-3 (decreto) ·** Toda entrega de frontend se entrega **en estado final presentable**
(no boceto, no «versión a medias»): pantallas completas, verificadas y con su banda de
veredicto, para que el dueño ajuste sobre algo completo — «siempre se tiene que entregar
como si ya estuviera finalizado».

## 0.5 · Cómo se habla en el chat (obligatorio — precede a todo lo demás)

Toda entrega en el chat va en **lenguaje humano, sencillo, no enredado y bien
estructurado**. El dueño no debe descifrar el texto: debe **entenderlo y aprender de
gestión del proyecto** con él. Reglas concretas:

1. **Frases cortas**, una idea por párrafo, secciones con títulos que se entienden solos.
2. **Prohibido soltar claves sueltas** (ME-02, N-S1, RF-13, T1, G-05…) **sin traducirlas
   en el mismo renglón**: «ME-02 = registrar en qué versión se hizo cada pantalla».
3. Si algo se puede explicar sin el nombre técnico, **se explica sin él**.
4. Cada entrega **enseña gestión**: qué se hizo, por qué conviene, qué riesgo evita y qué
   viene después — el objetivo no es solo informar, es que el dueño aprenda a dirigir.
5. Los documentos internos **sí** usan claves (son para auditoría); **el chat los traduce**.
   Al citar un archivo: su nombre + una frase de qué contiene, sin siglas huérfanas.
6. Formato base de cada respuesta: **1) qué pasó · 2) qué significa en palabras simples ·
   3) qué sigue.**
7. **Sin tablas en el chat** (decreto D-1): viñetas o prosa, nunca filas y columnas.

## 0 · Lee primero (2 minutos que ahorran 30)

1. `INDEX.md` (mapa) → 2. `PLAN-DE-IMPLEMENTACION.md` (qué sigue y qué NO se hace) →
3. `12-FRONT-SINTESIS/SINTESIS-SUMATORIA.md` §2 (los 35 patrones ML/MT/MG) →
4. `SINTESIS-REGISTRO.json` (la verdad del avance) · `INDICE-FRONTEND.md` +
   `INDICE-BACKEND.md` (las capas y cómo se acoplan) → 5. `PROPUESTAS-DE-MEJORA.md` §8
(libro de honestidad: qué está hecho y qué es solo propuesta).
Si tu tarea es una pantalla: `12-FRONT-SINTESIS/ANALISIS-ATENCIONES.md` es el ejemplo
de pasada ya hecha; `pruebas/PLANTILLA-PANTALLA.html` es el molde.

## 1 · Reglas duras (error que las motivó · mecanismo que las vigila)

**R1 · Cuenta antes de afirmar.** «19 pantallas»×5, «201 PASS», «18 marcadores» — escribí
cifras de memoria y eran falsas. Toda cifra sale de un comando ejecutado **antes** de la
frase. Los docs operativos (LEEME/PLAN) **no** llevan `\d+ PASS`: el vivo es
`./autoauditoria.sh` (la suite del libro lo prohíbe).

**R2 · Nada declarado sin salida.** Lección «entrega fantasma» (10/11): describí archivos
que no existían. Toda entrega va con `ls`/conteo/suite a la vista. La huella en el
registro y `pruebas-registro` son el ojo; tú pones la prueba.

**R3 · Tocaste = registraste.** Editar un `.html` o componente sin actualizar
`SINTESIS-REGISTRO.json` (huella) ⇒ rojo (trampa G-01). La fila se actualiza en el mismo
paso del cambio, no después.

**R4 · T1 tras cada cambio; T2 antes de declarar estado.**
`./autoauditoria.sh` (segundos) · `--completo` (transiciones del registro).

**R5 · Escribe en trozos.** Un `write` de ~55KB me truncó el JSON a mitad (`mensajes.js`).
Divide en bloques con append y `node --check` por bloque.

**R6 · Pruebas que fallen primero.** Mis tests verdes eran a veces falsos: B6 «pasaba»
por huecos vacíos; aserciones con ids viejos tras `reiniciar()` pasaban por `!null`. Reglas:
diseñar el test para que **falle** contra el bug; re-resuelve fixtures tras reset; si una
prueba nunca ha fallado, no prueba nada (rótulo «ruptura» obligatorio para eso).

**R7 · Parches con assert de ancla.** `replace` a ciego me falló varías veces y una vez
pegó la cláusula en la entrada equivocada del LEEME. Siempre: `assert viejo in s` antes de
reemplazar, y leer el ancla (grep) si no estás seguro de dónde cae. Tras un heredoc de
python, `then/else/fi` en **líneas separadas**: el one-liner no evaluó y el contador
mintió (cae R2 — probado con fuego).

**R8 · Salida completa al auditar.** Los `tail`/`grep FAIL` pueden ocultar. En rondas de
auditoría: corre y lee **todo** el output; solo resumes al final.

**R9 · Dependencias declaradas, nunca en `/tmp`.** jsdom en `/tmp` desapareció y mató
dos suites. Todo vive en `pruebas/package.json`.

**R10 · «Hecho» solo con evidencia en su libro.** ME-16/13a los presenté como «ya mismo»
sin hacerlos; el §8 de `PROPUESTAS-DE-MEJORA.md` es el registro: ⬜→✅ = comando + conteo.
Nunca empaquetes un plan como si estuviera ejecutado.

**R11 · Histórico vs vivo.** Números de una ronda pasada = «corte fechado» con su fecha;
números de hoy = solo en `./autoauditoria.sh`. (Me atraparon cuatro totales caducos.)

**R12 · Fuego a toda guardia nueva.** Toda barrera nueva se prueba induciendo la falla
(tamper → FAIL → restaurar → verde) como hicimos con la huella, la deriva 10=11 y la
pantalla nueva. Sin prueba de fuego, la guardia es una promesa.

**R13 · Pantallas nuevas desde el molde.** Copia `pruebas/PLANTILLA-PANTALLA.html`
(meta `sintesis` + chip de versión + riel + banda incluidos), regístrala con huella, y
T1 antes de seguir. Páginas fuera del molde caen en ME-02/03 y en el e2e.

**R14 · Límites ya decididos** (no los reabras en cada turno): no fusionar los 3 motores
· no subir S2 por un apéndice · no editar espejos de maestra (`01`–`05`) localmente ·
no hardcodear totales · cola por riesgo (PLAN §3); decisiones nuevas → su N y su
mención, jamás silenciadas.

## 2 · Lo que SÍ funcionó (repítelo siempre)

- **Ruptura diseñada para fallar** antes que más asserts verdes (B1–B6 cazaron 7 bugs).
- **Suite documental** docs=código (cazó «catorce/quince», «26/28», «19/18»).
- **Evidencia primero**: ejecuta la conciliación/el conteo **antes** de escribir el hallazgo.
- **Libro con conteos vivos** y trampas (huella, meta, chip, deriva): el repo se audita solo.
- **Ledgers honestos** (§8): declara tu % real de cumplimiento antes de que te lo pidan.
- **Trocear archivos grandes** y `node --check` por parte.

## 3 · Flujo canónico por pantalla (protocolo S1 §3)

Leer S1 → auditar vs ML/MT/MG → aplicar → 4 planos (unidad/e2e/ruptura/documental) →
registrar fila con huella+conteos+evidencia → `T1` verde (y `T2` para el estado) →
nota en LEEME. Cambios de motor ⇒ fila de `componentes[]` también.

## 4 · Antes de decir «listo» (autocheck)

1. `./autoauditoria.sh` en verde · 2. filas/huellas al día · 3. sin `\d+ PASS` en
LEEME/PLAN · 4. cifras dichas = salida de un comando que acabas de ver · 5. lo «hecho»
está ✅ en PROPUESTAS §8 y lo pendiente ⬜ · 6. decisiones nuevas con su N ·
7. salida de auditoría leída completa, no recortada · 8. si tocaste una barrera,
tiene su prueba de fuego · 9. la respuesta al dueño pasó por §0.5: sin claves sin
traducir y en el formato «qué pasó / qué significa / qué sigue».
10. las leyes L-1…L-5 de esta petición fueron aplicadas en la misma iteración ·
10b. el comentario del dueño quedó con su trío (lógica · técnica · gobernanza) ·
11. sin tablas ni en el chat ni en el .md que se tocó · 12. el pedido del dueño quedó
en `CHECKLIST-DE-PETICIONES.md` con su estado.

## 5 · Cómo se ejecuta

```
./autoauditoria.sh                    # T1 · iteración
./autoauditoria.sh --completo         # T2 · transición (levanta sus servidores)
./autoauditoria.sh --pantalla <file>  # una sola pantalla (molde+huella+meta+enlaces)
```
