# Preguntas vivas — las 20 de la evaluación, con su estado y su dueño

> **Qué es:** las preguntas de investigación del 2026-10-26 (bloques A a F), cada una
> con su estado al cierre de esta carpeta: **abierta** (espera respuesta), **en curso**
> (tiene máquina trabajando) o **cerrada** (respondida con evidencia). Regla: ninguna
> se silencia; una respuesta «no lo sé con comando» es más honesta que una respuesta
> de memoria. El dueño de cada pregunta es el dueño del proyecto salvo indicación.

## Bloque A — Ontología (qué es el objeto)

1. **¿Qué cuenta como plano, y dónde termina el dibujo y empieza la especificación
   construible?** — **CERRADA parcialmente:** la frontera hoy está escrita en el menú
   de `06-FUENTE-BACKEND/FUENTE-DE-VERDAD.md` (diez campos por función, con guarda y
   par frontal). Un dibujo sin esos diez campos es dibujo; con ellos es especificación.
2. **¿Fuente de verdad de qué dimensión?** — **CERRADA:** `CADENA-DE-VERDAD.md`
   separa verdad de reglas (precedencia ley → contratos → fuente → patrones →
   pantallas) de verdad de cifras (cada número con su casa y su comando). Una sola
   fuente para todo era contradicción; ahora son dos cadenas.
3. **¿Cuál es la escalera de fidelidad mínima por capa?** — **ABIERTA:** existe la
   escalera dibujo → especificación → código, pero no está escrita la altura mínima
   exigida por capa (por ejemplo: ¿el backend necesita plano de pantallas antes que
   especificación de funciones?). Dueño: proyecto. Dispara: antes de empezar el
   backend real.

## Bloque B — Epistemología (cómo se sabe que el plano es correcto sin código)

4. **¿Qué se puede verificar sin implementar?** — **EN CURSO:** consistencia interna
   (suites del libro), trazabilidad requisito→pantalla→función (índices + registro),
   y la nueva conciliación entre libros (RQ-A parte 2, pendiente de su prueba de
   fuego).
5. **¿Qué queda fuera de verificación hasta la ejecución en vivo, y dónde se declara?**
   — **ABIERTA:** hoy lo no-verificable se infiere (los comprobadores de E2E) pero no
   existe la sección «esto solo se sabe en vivo» dentro de cada pantalla ni de cada
   contrato. Dueño: proyecto. Dispara: con la rebanada funcional.
6. **¿Quién juzga «suficiente»: el humano, el agente o el chequeo determinista?**
   — **CERRADA parcialmente:** la doble veredicto (banda persistente + hoja) ya es la
   respuesta del proyecto; falta el veredicto humano del equipo del consultorio
   (sesión pendiente, kit de entrevista listo en `04-METODO-Y-ACEPTACION`).

## Bloque C — Economía (cuándo deja de rentar el plano)

7. **¿En qué punto el costo del plano supera el error que evita? ¿Se mide o se
   asume?** — **ABIERTA:** no hay métrica de tiempo por fase (medir con reloj, no con
   sensación). Dueño: proyecto. Dispara: cuando exista al menos una pantalla
   construida por el backend real, comparar su tiempo de ida y vuelta.
8. **¿Qué fracción del plano sobrevive al código real?** — **ABIERTA, y es la pregunta
   central de la rebanada funcional:** el plan de `PLAN-REBANADA-FUNCIONAL.md` la
   convierte en número (contratos que sostuvieron la construcción sin mirar el
   dibujo ÷ total). Dueño: el experimento mismo.
9. **¿Es más caro el plano que el rework en un código maduro?** — **ABIERTA
   delegada:** la investigación del dueño (METR y demás) ya la discute; este repo no
   tiene código maduro propio aún, así que la respuesta se posterga con honestidad.

## Bloque D — Causalidad (la evidencia soporta la tesis o solo la acompaña)

10. **¿Qué fracción de la evidencia es RCT, caso de estudio u opinión?** — **EN
    CURSO:** la investigación del dueño separa niveles; en este repo, las pruebas son
    caso de estudio (un solo proyecto). Declarado, no mezclado.
11. **¿Qué evidencia en contra se subestima?** — **EN CURSO:** el libro de honestidad
    (`PROPUESTAS-DE-MEJORA.md`) ya es un contenedor de contraevidencia; la más fuerte
    contra este repo: la verificación verde no impidió el rechazo del dueño a las 18
    pantallas — la forma pasó, el valor no. Ese hecho está registrado y es el motor
    del DoD v2.
12. **¿El artefacto causa mejores resultados o solo correlaciona con equipos buenos?**
    — **ABIERTA:** sin un segundo equipo usando estos planos, es correlación. Dueño:
    el futuro equipo del backend.

## Bloque E — Gobernanza (quién responde)

13. **¿Quién aprueba qué, con qué registro, y qué es irreversible sin firma?** —
    **CERRADA:** `AGENTS.md` + `INVENTARIO-DECISIONES.md` (consecuencia y default por
    decisión) + paquete de firmas diferidas. Lo irreversible sin firma: nada
    declarado; las firmas clínicas esperan el paquete.
14. **¿Es auditable la cadena spec → sesión → commit → producción a los 6 meses?** —
    **EN CURSO:** spec → sesión → commit sí (volcado de conversación, checklists,
    git); producción no existe aún. La cadena se completa cuando exista producto.
15. **¿Qué pasa cuando el plano y el código divergen: quién detecta, quién decide, en
    cuánto tiempo?** — **CERRADA parcialmente:** la trampa de huella detecta (quien
    modifica sin registrar, cae la suite); decidir es del dueño; el tiempo no está
    medido. El divergente restante (12-AGENDA vs copia en la síntesis) ya tiene
    guardia de deriva.

## Bloque F — Fallibilidad (qué rompe el sistema)

16. **¿Cuáles son los modos de fallo documentados de los agentes y qué control los
    cubre realmente?** — **EN CURSO:** el autocheck de `AGENTS.md` §4 cubre entrega
    fantasma, cifras inventadas, lenguaje sin traducir y trabajo fuera de alcance. El
    modo más peligroso no cubierto por máquina: **auto-reporte inexacto** («listo»
    sin haber corrido nada) — cubierto solo por la costumbre de exigir salida de
    comando (R8) y ahora por esta carpeta.
17. **¿Dónde está el sesgo del preparador de planos en este proceso?** — **CERRADO
    para la forma, abierto para el fondo:** la prueba del espejo del documento 21
    corrige el sesgo de idioma; el sesgo de apego (quien dibuja defiende su dibujo)
    sigue sin control explícito — el kit de entrevista existe pero no se ha usado
    contra estas pantallas.
18. **¿Qué incentivos hacen que un equipo produzca planos sin usarlos?** — **EN
    CURSO:** el registro con estados y el rechazo vivido del dueño son los
    frenos actuales; el incentivo perverso que queda: producir auditorías (como esta)
    que se leen pero no se ejecutan. Su antídoto: cada hallazgo de esta carpeta tiene
    dueño y comando.

## Las cuatro preguntas nuevas que abrió esta auditoría

19. **¿La puerta de lenguaje (`--exigir`) se enciende solo con las traducciones del
    dueño, o antes?** — **ABIERTA, dueño.** Mientras no se encienda, «impide» sigue
    siendo «detecta».
20. **¿La rebanada funcional se construye en este repo o en el hogar del producto?**
    — **ABIERTA, dueño:** afecta si el experimento de fuente de verdad se hace sobre
    el papel usable (aquí) o sobre el código real (allá). Default sugerido: aquí,
    porque es donde vive el enchufe declarado; el port al hogar es el paso siguiente
    del plan de regreso.
21. **¿Cuándo se usa el kit de entrevista con el equipo del consultorio?** —
    **ABIERTA, dueño:** sin ese veredicto, los criterios de terminado miden la forma.
22. **¿El repositorio se hace público con todo su historial de conversación?** —
    **CERRADA por orden del dueño** («genera el repositorio público»): se publica con
    el volcado de conversación incluido, tras escaneo de secretos sin hallazgos.
    Queda registrado que el volcado contiene el lenguaje crudo del dueño — si en el
    futuro desea privatizarlo, el retiro es su decisión y solo suya.
