# EVALUACIÓN DE PANTALLAS — cómo juzgamos cada pantalla (documento vivo)

> Hoja de método (no es ley). **Siempre mejorable y actualizable:** cuando nuestro modo
> de evaluar cambie, se cambia aquí, con fecha y el motivo. Cualquier sesión de agente que
> toque pantallas debe leer este archivo antes de opinar — es nuestra forma acordada de
> mirar. Última actualización: 2026-10-23.

## 1 · La regla madre: se defiende el VALOR, nunca la forma

Toda pantalla existe para **entregar un valor** a alguien de la consulta (paciente,
médico, enfermera, administrativa). Cuando el dueño critica una pantalla, su crítica es
un **diagnóstico de valor no entregado**, no un ataque personal a quien la construyó.
Por eso, ante cada crítica se responden exactamente tres cosas y nada más:

1. **Qué valor debía entregar** — esto se defiende y se conserva, aunque la pantalla se
   rehaga por completo.
2. **Por qué la forma actual no lo entrega** — se acepta la crítica como diagnóstico;
   nunca se discute, nunca se justifica la forma.
3. **Cómo se reestructura** — por separado, la **lógica de funcionamiento** (qué hace,
   con quién se conecta, en qué orden) y la **lógica de presentación** (cómo se llama,
   qué se ve primero, qué rótulo lo explica).

La medida única de si una reestructuración sirve: **¿la persona de la consulta hace su
trabajo más rápido y con menos equivocación que ayer?**

## 2 · El ciclo de edición en papel (decreto del dueño, 2026-10-23)

**No se toca el código del software en esta etapa.** Toda edición se dicta y aplica sobre
**réplicas HTML** en `GUIAS/EDICION/` — páginas con la apariencia de cada pantalla real —
de esta forma: el dueño dicta («agregar esto aquí», «mover esto allá», «transformar esto
para que el flujo sea este») → el agente edita la réplica el mismo día → el dueño revisa
y dicta otra vez → se repite las veces que haga falta. **Solo cuando una pantalla queda
«estabilizada» en su réplica**, su diseño baja al código del programa, una vez, con su
prueba verde. Motivo: cambiar de opinión en papel es gratis y no rompe nada; cambiar
dentro del programa cuesta días y arrastra regresiones (medido en este proyecto).

## 3 · De dónde salen los datos de cada réplica

Las réplicas y las fichas se generan **del programa real** (de las descripciones de
pantalla que vive en `app.py`), nunca de memoria ni de un dibujo viejo — para que la
imagen no miente. Si el programa cambia, las réplicas se regeneran. Etiqueta que lleva
toda réplica: «réplica de apariencia — lo funcional lo manda el programa».

## 4 · El vocabulario de la crítica (el menú de 30 categorías)

Las críticas del dueño y de los interesados se anotan con el **menú de categorías** de
`GUIAS/PLANTILLA-REVISION.md` (lo bien · lo mal presentado · lo mal de uso · lo que
falta · lo que sobra · lo clínico · ideas). El menú crece: si aparece algo que no está,
se añade una categoría nueva **aquí y allá**, con fecha. Categoría especial: **30 · idea
mía** — sirve cuando el dueño dice algo que aún no tiene nombre; entonces el análisis le
da nombre y lo registra.

## 5 · Modelo clínico que manda sobre las pantallas (declaración del dueño, 2026-10-23)

Antes de juzgar cualquier pantalla de seguimiento, vale esta declaración: **no todas las
pacientes son pacientes de embarazo.** El centro atiende casos gineco-obstétricos
distintos — embarazo, infecciones de transmisión sexual, tumoraciones, fertilidad,
planificación —, cada uno con su **protocolo de fechas** (el tratamiento de verrugas del
VPH tiene su calendario; la búsqueda de embarazo, otro; el embarazo en curso, otro), y
**una misma paciente puede llevar varios protocolos a la vez**. Consecuencia de diseño:
la pantalla no es «control de embarazo» sino **seguimiento de la paciente por sus
protocolos activos**; la FUM y el control prenatal pertenecen al protocolo de embarazo,
no a la interfaz general. **Pendiente de investigación con el dueño y sus colegas: la
lista cerrada de casos de consulta del centro** — de ahí salen los protocolos que el
programa debe ofrecer.

## 6 · El hilo conductor (declarado tras la crítica a C-16)

Las pantallas no son habitaciones sueltas: deben ser **estaciones de un mismo recorrido**
(llegar → buscar o registrar → atender → guardar → volver). Toda pantalla nueva declara:
de dónde se llega a ella y a dónde lleva. Una pantalla sin hilo se juzga incompleta, por
buena que sea su idea.

## 7 · Registro de las críticas (para que nada se pierda)

Cada crítica del dueño entra al buzón `GUIAS/HALLAZGOS.md` con número H-xxx, pantalla,
capa (la letra del modelo de la ley) y estado. Lo que se aprueba como «valor a conservar»
y lo que se manda a edición en papel queda además en `GUIAS/ANALISIS-PANTALLAS.md`,
sección por pantalla — ese archivo es el **punto de contraste**: cada nueva crítica se
compara con lo que esa pantalla decía entregar cuando se analizó.

## 8 · Cómo se actualiza este documento

El agente puede ampliarlo (método, categorías, modelos) en cualquier sesión; cada cambio
lleva fecha. Lo que **no** se puede hacer sin el dueño: borrar una crítica suya, quitarle
valor a un hallazgo, o cambiar la regla madre de la sección 1.

---

**Estado del proceso (fecha de esta versión):** 14 hallazgos en el buzón (H-001…H-014) ·
24 pantallas analizadas en `ANALISIS-PANTALLAS.md` · réplicas de edición generadas en
`GUIAS/EDICION/` · ninguna edición tocada al código · primera tanda de críticas suyas
del 2026-10-23 registradas y pendientes de su dictamen sobre las réplicas.
