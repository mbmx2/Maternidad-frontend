# CONTRASTE DEL DISEÑO LÓGICO — auditoría de la fuente de verdad

> **Qué se audita aquí:** la **fuente de verdad real** del proyecto —los flujos de
> trabajo con sus capas D–F, toda la lógica derivada (doctrina, presentación, alertas,
> flujos) y las imágenes HTML que la representan—. **El código `.py` NO es la fuente de
> verdad** (está desactualizado respecto a ella): es el sistema B, que se audita **contra**
> la lógica, no al revés —para eso está `PREGUNTAS-DE-AUDITORIA-TECNICA.md`, reencuadrado
> como instrumento de contraste código↔verdad. **Uso:** una ronda por sesión (dimensión
> por dimensión); cada hallazgo queda numerado **L-xx** con su estado; lo de fondo, al
> dueño; lo de consistencia, se repara en el acto (los documentos de lógica son vivos y
> se corrigen con fecha, salvo la ley). Emisión: 2026-10-23 · **Primera ronda incluida.**

---

## Las seis dimensiones del contraste (el checklist permanente)

**Dimensión 1 · Consistencia interna entre documentos de lógica.** ¿Dos casas definen lo
mismo con cifras distintas? ¿Un pilar contradice un contrato? ¿Un flujos-norma contradice
a una doctrina? ¿Los números de una promesa coinciden en todas sus casas?
**Dimensión 2 · Completitud de la lógica.** ¿Toda promesa tiene casa, número y
prevención? ¿Todo módulo tiene contrato? ¿Todo flujo se mapea a módulos? ¿Toda
optimización O1–O10 tiene destino (dibujo, fila o decisión)? ¿Todo tipo de aviso existe
en dibujo? ¿Toda ambigüedad está resuelta o declarada como pendiente de decisión?
**Dimensión 3 · Trazabilidad del diseño** (cadena de diseño, no de código): flujo →
lógica → contrato → dibujo → número → futura prueba. ¿Qué eslabones faltan hoy?
**Dimensión 4 · Decidibilidad** (¿un constructor puede construir sin preguntar?): cada
«con su tolerancia», «el dueño», «cuando se decida» sin valor = deuda de decisión con
nombre.
**Dimensión 5 · Fidelidad de las imágenes** (¿el HTML representa la lógica, ni más ni
menos?): dibujo que omite una regla = verdad incompleta; dibujo que muestra algo sin
regla = invención.
**Dimensión 6 · Contraste del código contra la verdad** (el `.py` como sistema B): ¿qué
en el código contradice la lógica declarada? —con ese listo, se construye el delta.

---

## Primera ronda (2026-10-23) — ejecutada, con hallazgos

### Hallazgos

**L-01 · Dos casas de los números de alertas [reparado].** La doctrina (pilar 10) y el
sistema de alertas (§8) declaraban conjuntos distintos de números para el mismo
contrato (6 frente a 8) —viola la regla de casa canónica que ya habíamos acordado.
**Reparado hoy:** el pilar 10 ahora **cita** la casa canónica (`SISTEMA-DE-ALERTAS.md`
§8) en vez de listar su propia versión; la corrección quedó fechada en la doctrina.

**L-02 · El contrato de identidad no contemplaba a la pantalla que crea pacientes
[reparado].** La regla «cinta en toda escritura» choca con el registro de emergencia:
quién aún no existe no puede mostrarse. **Reparado hoy:** el contrato (en exploración,
editable) declara su excepción —la identidad mínima de quien nace es nombre y fecha, y
la cinta completa empieza cuando la ficha existe—.

**L-03 · El rol «recepción» no existe [pendiente de decisión suya].** Los flujos y el
tablero le dan el cuidado de llegadas y ausencias a «recepción»; la matriz de permisos
del software no tiene ese rol (solo dueño, administración, médica y enfermería).
Decisión que es de su consultorio, no del diseño: **¿rol nuevo de recepción, o ese
oficio lo ejerce enfermería/administración con su cuenta?** Mientras se decida, todo
lugar que nombre «recepción» es deuda de decidibilidad (dimensión 4).

**L-04 · La meta «menos de 2 avisos por visita» existe en mis instrucciones y no en el
contrato de números [pendiente suyo].** El umbral de fatiga fue mi propuesta, no su
acuerdo: o la aprueba y entra al §8 de números, o se retira. Sin decisión, es una cifra
huérfana.

**L-05 · Dibujo contra contrato: los contextos de la cinta en Consulta [registrado —
tarea de la orden].** El contrato pide alergia, sangre y medicación **en la cinta**; el
dibujo de Consulta los pone en la tarjeta de abajo. Corrección en el papel, ya encargada
a la Tarea A de `ORDEN-TRABAJO-PROTOTIPOS.md` (auditar dibujos contra lógica) — aquí
queda como hallazgo del contraste para que no se pierda.

**L-06 · Estructural: la ley aún no ha sido contrastada contra la verdad nueva
[pendiente — enmienda].** El acta tiene filas de pantalla escritas para el mundo viejo
(por ejemplo: los 12 filtros del inicio), y la verdad de papel dice **inicio = tablero**.
Falta un contraste fila-por-fila del Libro V contra la verdad de los flujos: algunas
filas siguen en pie, otras cambian de forma, otras se retiran. Ese contraste es material
de la **enmienda v4.3** (que además declara pilares y filas nuevas) — sin él, se
construiría código de filas que la verdad ya superó.

**L-07 · Estructural: la trazabilidad vigente traza hacia el código viejo
[confirmado — ya tiene fila].** `TRAZABILIDAD.md` encadena requisito→tarea→prueba del
mundo del código; con la verdad en el papel, la cadena debe llegar de la necesidad al
**dibujo y al contrato**. Eso ya está decretado en la fila FND-185 (trazabilidad
vertical, ⬜): este hallazgo lo **prioriza** —antes de construir código nuevo, la
trazabilidad debe estar del lado de la verdad.

**L-08 · El checkpoint confunde documentos vivos con estables [se resuelve en su
propia regla].** Las huellas del checkpoint incluyen HALLAZGOS y ACUERDOS, que cambian
en cada sesión: cualquier trabajo rompe su huella y «v4.1 desfasada» se vuelve ruido
habitual. Su propia regla ya lo cubre (refrescar huellas con fecha = v1.1), pero la
regla de diseño correcta es separar: **estables** (definiciones: se huellan) vs
**vivos** (registros: se citan sin huella o con fecha de último barrido).

**L-09 · Ambigüedades decidibles inventariadas (dimensión 4).** Las que quedaron:
tolerancia de «no llegó» (¿cuántos minutos?) · rol dueño de los estados (depende de
L-03) · meta de fatiga (L-04) · fecha de la entrevista (el cuello de botella ya
declarado) · y el contenido clínico de los catálogos (rangos, interacciones, tipos de
nota, casos de consulta: todos firmados por su médico, no decidibles por diseño).

**L-10 · Dibujos anteriores a normas posteriores [ya encargados].** Estados nuevos sin
dibujar, O5–O9 sin dibujo, tres páginas faltantes: está íntegro en las tareas B, C y D
de la orden de trabajo — registrado aquí para que el contraste los verifique al cerrar.

### Aciertos de la ronda (también se auditan)

La regla de precedencia resuelve choques sin negociación · **todo contrato lleva sus
invariantes y su sección de prevención** (nadie escribió lógica decorativa) · los seis
tipos de aviso tienen casa, dueño y dibujo · el «error sube de capa» está escrito en la
misma ley de errores · y el propio mecanismo de esta auditoría —huellas, buzón,
casa canónica— demostró funcionar: L-01 y L-02 se hallaron y repararon en la misma ronda.

---

## Próximas rondas (por dimensión, 10 preguntas por sesión)

**Ronda 2 · Decidibilidad completa:** caminar cada contrato marcando toda expresión sin
valor («su tolerancia», «cuando se decida», «por rol») y producir la lista cerrada de
decisiones suyas con su casilla — incluida L-03 y L-04 ya abiertas.
**Ronda 3 · Trazabilidad del diseño:** tomar los 8 flujos y el escenario, y verificar
que cada paso del relato encuentre su regla en la lógica y su imagen en un dibujo —
cadena de 5 eslabones, contando faltantes.
**Ronda 4 · Fidelidad:** dibujo por dibujo contra su contrato (esto es lo que la Tarea A
de la orden ejecuta; aquí se registran sus resultados como contraste).
**Ronda 5 · Completitud de números:** cada promesa de cada documento con su número y su
casa única (tras L-01, debe cerrar sin duplicados).
**Ronda 6 · Delta del código:** con la verdad consolidada, el `.py` se audita **contra
ella** (las 78 preguntas del instrumento de código, ahora con la verdad como patrón): de
ahí sale la lista de «qué se conserva, qué se corrige, qué se tira».
