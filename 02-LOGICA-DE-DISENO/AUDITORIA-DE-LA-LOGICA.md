# AUDITORÍA DE LA LÓGICA — segunda ronda sobre el propio sistema de pensamiento

> Registro vivo (2026-10-23, pedido del dueño — H-023). Esta vez la auditoría no mira el
> software ni los flujos: **mira al sistema de lógica mismo** —las 7 lógicas, la doctrina,
> el sistema de alertas, la presentación en pantalla, los flujos—, con las cuatro
> categorías que pidió: **aciertos** (lo que está bien y se protege), **aspectos
> mejorables**, **añadidos necesarios que nadie había pensado**, y **retiros o cambios de
> presentación que dan más valor**. Cada ítem trae su estado: aplicado / pendiente de su
> visto bueno.

---

## 1 · Aciertos — lo que funciona y NO se toca (protégerlo es parte del diseño)

**A1 · La regla madre valor-verso-forma.** Corrigió en un turno mi defensividad de
autor: su crítica dejó de ser ataque y pasó a ser diagnóstico de valor no entregado.
Funciona con evidencia: desde que existe, ninguna discusión de diseño se ha perdido
defendiendo pantallas.

**A2 · Papel antes que código, con su ciclo de edición.** La intuición suya de que
cambiar de opinión en papel es gratis —y dentro del programa, caro— se volvió procedimiento
y produjo 30 páginas de alcance completo en un día, con **cero regresiones**, contra los
meses de «editar pantalla y romper algo» que usted vivió. Es el activo más económico del
proyecto.

**A3 · El buzón con contador.** 22 hallazgos numerados, cero perdidos, formato validado
por máquina: su queja original —«mis hallazgos se pierden en la conversación»— quedó
resuelta con mecanismo, no con buena voluntad.

**A4 · La regla de precedencia.** «Seguridad de la paciente > flujo validado > diseño >
comodidad del código» resuelve choques sin negociarlos cada vez: es la frase que evita
mil reuniones futuras.

**A5 · Los números como contrato.** Todas las doctrinas cierran con cifras verificables
(ventana mínima 1024×660, cero campos perdidos en el resize, cero umbrales en el código,
0 avisos sin acción) — coherente con su principio viejo de que «lo que no tiene número no
es meta»; la lógica nueva y la ley vieja hablan el mismo idioma.

**A6 · La tipología de seis tipos de aviso con dueño.** El corazón de su tesis de valor
quedó modelado completo —y el defecto que yo mismo detecté (avisos sin dueño) se reparó
en la misma noche, lo que demuestra que el sistema de auditorías **atrapa a su autor**.

**A7 · La taxonomía de errores por capa con «el error sube».** Impide el vicio más caro
de cualquier equipo: tapar un error de flujo con un parche de código. Escrito y vigente.

**A8 · Lo físico primero.** El replanteamiento empezó por la silla, el tensiómetro y la
voz —no por la pantalla—. Raro en un proyecto de software y exactamente lo que separa un
flujo real de un diagrama bonito.

**A9 · La máquina de consistencia.** Índice (`LEEME`), registro de acuerdos, buzón con
números, documentos que se citan entre sí: una sesión nueva de agente puede entrar al
corpus sin adivinar. Su diseño de continuidad original, ahora extendido al pensamiento.

**A10 · La autocrítica obligatoria.** 25 errores propios encontrados y publicados en una
ronda, sin que nadie los pidiera uno por uno: el sistema ya audita a su propio autor —
que era, literalmente, lo que usted pidió en su enmienda de frenos de IA.

---

## 2 · Aspectos mejorables — lo que está bien pero puede estar mejor

**M1 · Duplicación de un mismo concepto en varios documentos (aplicado).** La regla
valor-verso-forma, la precedencia y el circuito de errores aparecen descritas en más de un
archivo —la enfermedad de «dos casas por un concepto» que su ley prohíbe. **Aplicado:**
queda declarada la casa canónica de cada concepto al pie de este documento (§5).

**M2 · Densidad de lectura (aplicado parcialmente).** Varias guías largas sin su caja de
resumen. **Aplicado:** este documento y los nuevos llevan resumen arriba; queda como regla
viva: *toda guía nueva nace con sus 5 líneas de resumen ejecutivo*.

**M3 · Los números sin verificación futura (pendiente).** Los 26+ números de aceptación
son promesas sin plan de medición: cuando el código exista, cada número debe volverse
**medida del examen automático** (fitness) o **comprobación manual en la entrevista** si
es de pantalla. **Pendiente:** mapeo número→medida, candidato a fila cuando usted ratifique.

**M4 · El documento de flujos quedó pesado (aplicado).** Seis capas (A–F) en un solo
archivo confunde al lector nuevo sobre qué es norma y qué es historia. **Aplicado:** banner
al inicio de `FLUJOS-TRABAJO.md` declarando A–C como historia y D–F como norma.

**M5 · La raíz sigue siendo hipótesis (pendiente — el riesgo mayor).** Todo el árbol
hereda que el flujo real aún no se validó con su personal. **Pendiente:** el paso humano
—véase el añadido N1—.

**M6 · Sin métrica de salud del diseño (pendiente).** Los indicadores del digesto miden
código y proyecto; falta el indicador de la fase actual: **hallazgos de diseño abiertos
vs cerrados por semana** (candidate M6, fila futura con el próximo lote).

**M7 · La descripción «3–4 atenciones» de la doctrina vs el tope fijo del dibujo
(aplicado).** Mi crítica declaró inventado el tope de 4, pero la página de pausa seguía
diciendo «solo caben hasta 4 abiertas» — contradicción entre crítica y dibujo.
**Aplicado:** la página ahora dice lo que la crítica exige: sin tope rígido, la capacidad
real la dicta el equipo, a decidir en la entrevista.

**M8 · Mantenimiento de los documentos (pendiente como declaración).** Los documentos
sufren la misma muerte silenciosa que el tablero sin dueño. **Pendiente de su visto
bueno:** cada guía declara su dueño y su disparador de actualización (ley: agente; flujos:
cada retrospectiva; propuestas: cada veredicto).

---

## 3 · Añadidos necesarios que nadie había pensado

**N1 · El kit de entrevista (aplicado).** El paso más crítico del proyecto —validar la
raíz con su personal— estaba prometido pero **sin armar**: los dibujos, la plantilla, el
guion de 20 minutos y las preguntas vivían repartidos. **Aplicado:** `GUIAS/KIT-ENTREVISTA.md`
—una sola hoja de instrucciones que convierte la promesa en trámite de un clic.

**N2 · El contrato de datos fundamentales del paciente (aplicado).** El sistema de
alertas declaró que faltan tipo de sangre, condiciones crónicas e interacciones —pero
nadie escribió **cuáles son obligatorios, quién los llena, en qué pantalla y con qué
visibilidad**. **Aplicado:** contrato explícito al pie de `SISTEMA-DE-ALERTAS.md`
(campo · obligatorio · dueño · pantalla · cinta).

**N3 · La lista de «lo que NO se construye» (aplicado).** En la fase de papel, donde
todo se puede dibujar, faltaba el disuasivo: qué se niega a construir y por qué.
**Aplicado:** sección en `DOCTRINA-DE-DISENO.md` — sin flujo validado no hay pantalla
nueva · sin veredicto doble no hay código · sin número no hay pilar · sin disparador no
hay candidato.

**N4 · Recorridos por rol (aplicado).** Ver 30 páginas sueltas no es cómo aprende un
equipo: cada oficio camina su ruta. **Aplicado:** tres recorridos guiados
(`RUTAS/ENFERMERA.html`, `RUTAS/MEDICA.html`, `RUTAS/DUENO.html`) que abren las
propuestas **en el orden de su jornada**, con la narración entre pantalla y pantalla —
presentación distinta del mismo contenido, con más valor.

**N5 · Plan de estreno día 1 (pendiente — con O5–O9).** El día 18 necesita un día 1:
estreno con pocas pacientes, acompañamiento, y las6 preguntas de la primera semana.
Se suma al grupo de optimizaciones pendiente de su visto bueno.

---

## 4 · Retiros y cambios de presentación — lo que vale más de otra forma

**R1 · Retirar el tope fijo de 4 atenciones abiertas (aplicado).** Número inventado,
criticado por mí y no obstante presente en el dibujo. Retirado: el sistema admite varias
abiertas; la capacidad real es pregunta de la entrevista.

**R2 · De historia a archivo: las capas A–C de los flujos (aplicado).** Ya no se leen
como si mandaran: banner al inicio que declara norma D–F, historia A–C.

**R3 · De «30 páginas sueltas» a «3 recorridos por rol» (aplicado).** El índice completo
sigue existiendo como referencia, pero la forma de presentación al equipo pasa a ser la
ruta: enfermera, médica, dueño. Menos páginas en la mano, más comprensión.

**R4 · De tres carpetas visuales a tres carriles con destino claro (aplicado).**
`FICHAS/` = imprimir y marcar lo de hoy · `EDICION/` = dictar cambios sobre lo de hoy ·
`PROPUESTAS/` = veredicto sobre lo que vendrá. Aclarado en el índice para que no se abra
la hoja equivocada.

**R5 · La demo de alertas con «47 avisos» — cambiar de presentación (pendiente).**
Actualmente el número grande de la demo puede leerse como logro; debería presentarse como
**lo que se combate**: acompañar la cifra con la frase de fatiga y la meta (objetivo: menos
de 2 avisos por visita, el resto a plazos). Pendiente de aplicar a `ALERTAS.html` con su
visto bueno (es cambio de mensaje en su material de entrevista).

**R6 · Candidato a retirar completo (pendiente de decisión suya): la página C-09
«Embarazo» como pantalla independiente.** Bajo el modelo de protocolos, el episodio
disuelto quedó descrito como retirable —convendría retirarlo también del índice de
propuestas para que nadie lo apruebe sin leer el porqué, o presentarlo ya integrado en el
seguimiento. Decisión suya en la entrevista.

---

## 5 · La casa canónica de cada concepto (aplicado — contra la duplicación)

Valor-verso-forma y el método de evaluación viven en `EVALUACION-PANTALLAS.md` · las 7
lógicas y la precedencia en `SISTEMA-DE-LOGICAS.md` · los pilares y números en
`DOCTRINA-DE-DISENO.md` · la raíz de flujos y su autocrítica en `FLUJOS-TRABAJO.md` ·
los avisos en `SISTEMA-DE-ALERTAS.md` · la ventana y sus variables en
`PRESENTACION-EN-PANTALLA.md` · los acuerdos en `ACUERDOS.md` · sus hallazgos en
`HALLAZGOS.md`. Los demás documentos **citan**, no reescriben.

## Estado de esta ronda

Aplicados en esta sesión: R1, R2, R3, R4, N1, N2, N3, N4, M1, M2, M4, M7 (con sus
archivos). **Pendientes de su visto bueno:** M3 (números→medidas), M6 (métrica de
diseño), M8 (dueños de documento), N5 (día 1, junto a O5–O9), R5 (mensaje de la demo de
alertas), R6 (retiro de la página de embarazo).
