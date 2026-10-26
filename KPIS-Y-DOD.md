# KPIS Y DoD — los indicadores del proyecto y la definición de terminado de cada pantalla

> **Glosario:** **KPI** = indicador clave del proyecto (un número que diga si vamos bien,
> sin interpretación). **DoD** = *Definition of Done*, la definición de terminado: la lista
> de criterios que algo debe cumplir para poder llamarse «hecho». Este archivo es la
> fuente de verdad de ambos; los números viven en comandos y archivos, nunca en prosa
> suelta (regla propia anti-cifras-muertas). Sin tablas (decreto D-1). 2026-10-26.

## 1 · KPIs del proyecto (10 indicadores)

- **K-01 · Pantallas terminadas.** Estado mecánico: **18 de 18 bajo el DoD v1** —
  pero **el dueño las RECHAZÓ el 2026-10-26** (veredicto completo en el registro y
  motivos en el checklist A7). El DoD v1 resultó **insuficiente**: no cubría el lenguaje
  útil al usuario, los calendarios, la agenda integrada ni el acople con el backend.
  Bajo **DoD v2**: **1 de 18** (la agenda, rehecha desde cero el 2026-10-26).
  Meta real: las 18 reconstruidas o re-pasadas bajo v2. *Fuente:* `SINTESIS-REGISTRO.json`.
- **K-02 · Verificaciones en verde.** Corte del cierre 2026-10-26: **238 rápidas y 433
  completas, 0 rojas** (el vivo manda `./autoauditoria.sh`). Meta: ningún día con rojo
  sin cerrar. *Fuente:* `./autoauditoria.sh`.
- **K-03 · Estándar aplicado.** Hoy: **17 de 35 patrones** aplicados al menos en una
  pieza. Meta: 35 de 35 antes de abrir firmas. *Fuente:* filas del registro.
- **K-04 · Decisiones tuyas abiertas.** Hoy: **15** (3 activas con default declarado —
  D-2 se ejecutó por su default el 2026-10-26 —, 4 de A13 con default (D-5…D-8),
  1 de A15 con default (D-10 semáforo), 1 de proceso, 6 firmas al final). Meta: 0
  activas sin respuesta cuando se abran las firmas. *Fuente:* `INVENTARIO-DECISIONES.md` §5
  (conciliado 2026-10-26: la composición «4 activas» era de antes de ejecutarse D-2).
- **K-05 · Pedidos cumplidos.** Hoy: **55 cumplidos, 34 pendientes** (89 en total).
  Meta: 8 en 0. *Fuente:* `CHECKLIST-DE-PETICIONES.md` (conteo con
  `grep -c` de casillas `[x]` y `[ ]`).
- **K-06 · Acople del enchufe.** Hoy: **21 de 25 operaciones** del futuro backend
  con pareja en el motor (movidas hoy: crear paciente y las dos de mensajes).
  Meta: 25 de 25 cuando se construya el enchufe real.
  *Fuente:* sección 4 de `INDICE-BACKEND.md`.
- **K-07 · Integridad de archivos.** Hoy: **22 con huella al día** (18 pantallas +
  4 componentes) con trampa automática activa. Meta: 100% siempre.
  *Fuente:* la trampa de la suite del libro.
- **K-08 · Avance del plan.** Hoy: **Tramo A 2 de 4** (catálogos fuera del código ✓;
  mensaje integrado en la agenda ✓; fechas calculadas y revisión de presentación
  pendientes). Meta: 4 de 4 antes de terminar la cola. *Fuente:* `PLAN-DE-TRABAJO.md` + registro.
- **K-09 · Mejoras ejecutadas.** Hoy: **5 de 18** (las cuatro de la ronda de hoy más la
  de catálogos de hoy; el libro de mejoras se alinea en su conversión de tablas pendiente
  — declaración honesta para que nadie lea dos cifras distintas). Meta: 18 de 18 o
  descartadas con decisión. *Fuente:* `PROPUESTAS-DE-MEJORA.md` §8 + checklist A4.
- **K-10 · Ritmo de la verificación.** Hoy: la prueba rápida ronda el minuto y la
  completa el par de minutos. Techo: 5 minutos (si lo pasa, se divide por carpeta —
  riesgo ya previsto en el plan). *Fuente:* tiempos de `./autoauditoria.sh`.

## 2 · DoD de pantalla — el núcleo (aplica a las 18)

Una pantalla está **terminada** solo si cumple los ocho:

1. **Nace del molde:** meta de síntesis, sello V4 en la barra, un solo h1, riel con
   grupos, banda de veredicto.
2. **Cero mutación directa de estado:** todo pasa por el motor; sin `prompt`/`alert`/
   `TODO`/textos de plantilla sin rellenar.
3. **Reloj y fechas reales** (nada pegado a mano); color siempre acompañado de palabra;
   enlaces estáticos sin rotos.
4. **Patrones del estándar aplicados** y anotados en su fila del registro.
5. **Pruebas en cuatro planos:** unidad (si toca el motor) · de página (estructura) ·
   **ruptura diseñada** (que falle contra el defecto que busca) · documental.
6. **Registro al día:** estado `verificado`, huella viva, pruebas reales con conteos,
   evidencia con su ancla.
7. **Las dos puertas en verde:** verificación rápida después de cada edición, completa
   antes de marcar estado.
8. **Nota escrita** en `PASADAS-DE-PANTALLAS.md` con patrones, pruebas y cierres.

## 2.5 · DoD v2 — los criterios que faltaron (en vigor para la reconstrucción)

Además del núcleo, toda pantalla nueva o rehecha deberá cumplir:

- **D-2a · Calendarios:** todo campo de fecha con calendario utilizable (no solo
  números), empezando por la agenda.
- **D-2b · Lenguaje útil:** ninguna frase de la pantalla sin pasar por
  `FRASES-A-TRADUCIR.md` y la traducción aprobada; el texto debe decir a la persona
  qué verá, qué le pasa y qué puede hacer.
- **D-2c · Agenda integrada:** la pantalla de agenda usa el módulo completo trabajado
  en `12-AGENDA-Y-MENSAJES` (plantillas, composer con opciones, disponibilidad con
  huecos, dedupe con clave), no una versión reducida.
- **D-2d · Acople aplicado:** las acciones de la pantalla se construyen contra las
  operaciones del enchufe (`INDICE-BACKEND.md` §4), no contra nombres inventados.

## 3 · DoD específico de cada pantalla (lo que va además del núcleo)

- **hoy** — *terminada:* la vista se deriva de hechos; el equipo sale y vuelve con
  evento; el veredicto persiste. (Hecha 2026-10-26.)
- **llegada** — *además:* homónimas preguntan antes de unir y nunca fusionan solas;
  registrar a quien llega sin cita termina en espera con reloj; nadie inserta pacientes
  desde la pantalla (el motor lo hace).
- **estacion** — *además:* pausa y retorno conservan los campos uno por uno
  (incluye el autoguardado); guardar nunca bloquea y los avisos salen después.
- **consulta** — *además:* nota firmada con nombre y cédula; cierre de avisos anclado a
  esa nota sin marcas por defecto; próximo control calculado, no capturado.
- **urgencia** — *además:* las tres salidas (atendida, referida, motivo) firmadas;
  referida nunca cuenta como atendida; chip de la tarjeta y alerta siempre juntos.
- **laboratorio** — *además:* banda con semáforo; lo que llegó tarde se marca honesto;
  la alerta nace con dueño; sin catálogo firmado, gris y nada se señala.
- **pendientes** — *además:* cerrar exige nombre y cédula (o ancla a nota firmada);
  urgencias primero; lo vencido sube al tablero y al cierre.
- **atenciones** — *además:* dueño y «en uso» visibles; toma por emergencia con
  registro de quién y de quién; sin tope rígido. (Piloto, verificada.)
- **agenda** — *además:* recordatorio sin valores clínicos ni diagnósticos; entrega con clave que
  no se repite; la cancelación sale vinculada a su cita real.
- **calculadoras** — *además:* las 18 con sus entradas del catálogo; prefill con origen
  registrado (0 tecleos donde el expediente ya sabe).
- **historia** — *además:* la nota es inmutable con autor y cédula; editar crea versión
  nueva sin tocar la original; el asistente NOM vive dentro de la nota.
- **ficha** — *además:* los datos que salvan viajan en la cinta de todas las pantallas;
  «falta completar» tiene dueño y plazo visibles.
- **documentos** — *además:* la plantilla se llena con lo que ya existe (cero captura
  doble); el aviso de privacidad se genera una vez por expediente.
- **falla** — *además:* seis guiones en humano de degradación; el ensayo del respaldo
  queda marcado como verificado en el cierre.
- **sistema** — *además:* roles y catálogos con su estado de firma; cuentas de bitácora
  vivas; sin edición de umbrales fuera del archivo firmable.
- **cierre** — *además:* traspaso imprimible con referidas separadas de atendidas,
  avisos vencidos y recordatorios escalados; respaldo ensayado antes de apagar.
- **CUMPLIMIENTO** — *además:* cada requisito con su pantalla y estado honesto
  (cubierto / parcial / declarado) — sin adornar lo parcial.
- **HOJA-DE-VEREDICTO** — *además:* imprimible de una página, con banda persistente y
  espacio de doble firma.

## 4 · Cómo se usan juntos

- **DoD** decide el estado de una fila: sin sus ocho puntos del núcleo y su específico,
  la pantalla no pasa a `verificado`, aunque la verificación esté en verde.
- **KPI** decide el estado del proyecto: cuando K-01 diga 18/18, K-04 diga 0 activas y
  K-02 siga en 0 rojos, se abre el paquete de firmas.
- Los tres viven medidos: el registro (pantallas y huellas), la autoauditoría (verdes)
  y el checklist (pedidos) — si uno miente, los otros dos lo delatan.

## 5 · DoD de módulos y piezas (familia completa — evaluación externa 2026-10-26, A13)

> **Qué es:** el DoD existente (§2 núcleo, §2.5 v2, §3 específico) gobierna **pantallas**;
> esta sección gobierna las **demás clases de módulo** del proyecto — los 17 módulos
> funcionales del menú de `06-FUENTE-BACKEND/FUENTE-DE-VERDAD.md` y las piezas de
> soporte que los sostienen. Cada uno hereda el espíritu del DoD de pantalla: nace
> moldeado, tiene guarda, deja evidencia y pasa sus dos puertas. Origen: la evaluación
> del consultor externo registrada en `CHECKLIST-DE-PETICIONES.md` A13; todos sus
> números citados fueron verificados contra la casa correspondiente el día de la
> integración. Sin tablas (decreto D-1).

### 5.1 · DoD base de todo módulo funcional (aplica a los 17 del menú)

Un módulo (IDENTIDAD, TABLERO, …, OPERACION) está «terminado como especificación» solo si:

1. **Hoja completa:** sus 7 secciones fijas escritas (qué es / qué no es · esqueleto ·
   relación con otros módulos · capa de datos con lecturas y escrituras · pantallas que
   lo exponen · funciones · bitácora). *Por qué:* la regla 8 de la familia lo dice —
   sin capa de datos es «lista de deseos», no especificación; hoy solo 1 de 17 hojas
   existe (`MOD-DOCUMENTOS.md`), así que este punto es también el checklist de la obra
   que falta.
2. **Funciones con los 10 campos**, y en especial **GUARDA** (número o prueba nombrada
   antes que el código) y **PAR FRONTAL** (qué ve la persona). *Por qué:* P7 — ninguna
   promesa sin guarda — es lo que separa este proyecto de un wireframe; el par frontal
   evita la función huérfana que nadie sabrá que existe.
3. **Casa citada** en cada función (ley R-xx, contrato, decisión de diseño), y estado
   sin `[SUPUESTO]` sin resolver o, si lo hay, con la pregunta explícita al dueño.
   *Por qué:* «no inventa» es la regla de oro del constructor; los supuestos silenciosos
   es donde un software clínico se inventa reglas.
4. **Cobertura de flujos:** cada función etiquetada con su FL-xx (los 17 flujos de
   `06-FUENTE-BACKEND/REQ-FLUJO.md`) y verificado contra `08-FLUJOS` que el flujo queda
   cubierto de punta a punta. *Por qué:* los flujos son el contrato compartido entre
   capas; un módulo sin etiqueta de flujo no se puede acoplar al enchufe.
5. **Mínimo de pruebas de diseño escritas** (no ejecutadas: no hay backend): para cada
   función, su caso feliz y sus dos casos borde más probables, en el formato de las
   suites actuales. *Por qué:* spec-first declarado; escribir la prueba hoy = el
   constructor del futuro solo la implementa.
6. **Acople declarado:** sus operaciones de enchufe mapeadas en `INDICE-BACKEND.md` §4
   con su estado (cubierto / parcial / falta). *Por qué:* así el menú de 17 módulos y
   el enchufe de 25 operaciones dejan de ser dos listas paralelas y se vuelven un solo
   mapa.

*Por qué es prioridad alta:* hoy solo conversación y papel acoplan el diseño con el
producto real; **16 de 17 hojas sin escribir es el mayor riesgo de derivación**: el
constructor del backend real, sin hojas, decidirá caso por caso.

### 5.2 · DoD específico por módulo (lo que cada uno exige además del base)

- **IDENTIDAD** — alta en ≤ 3 campos para la emergencia con tiempo medido en el guion;
  homónimas: decisión humana registrada (nunca fusión automática); cinta de identidad
  presente en el 100 % de las escrituras (número de la Fase I del mapa de implementación).
  *Por qué:* identidad equivocada en un expediente clínico contamina todo lo demás.
- **TABLERO** — 0 estados escritos a mano (todo derivado de eventos); 18 pacientes en
  < 0,5 s (número de la Fase I del mapa de implementación); urgente al frente al
  instante; dueño visible por tarjeta. *Por qué:* es la primera pantalla del producto
  (FL-01) y donde la derivación de hechos se demuestra o se cae.
- **URGENCIA** — registro de emergencia en 3 campos y menos de un minuto (RF-09); la
  urgencia nunca se cierra sin salida firmada; referida ≠ atendida. *Por qué:* es el
  módulo donde el retraso daña; su DoD es de tiempo, no solo de estructura.
- **ATENCIONES** — 0 campos perdidos en 10 alternancias pausa/retoma (número de la
  doctrina: pilar 2); «en uso de X» visible; cambio de paciente solo desde el tablero.
  *Por qué:* su riesgo es la pérdida silenciosa de lo capturado.
- **ALERTAS** — 0 avisos sin acción ni dueño; ciclo completo (nace → dueño → plazo →
  cierre firmado → ancla a nota) con prueba de cada transición; métricas de fatiga con
  objetivo acordado (RQ-J). *Por qué:* un sistema de alertas sin fatiga medida se
  apaga en la práctica.
- **CONTROLES** — exactamente 10 campos y 9 banderas (RF-05 — el número es la norma);
  guardar nunca bloquea y es atómico (RB-07); el autoguardado sobrevive a recarga
  (deuda conocida de la estación). *Por qué:* es el acto de tres minutos repetido 20
  veces al día; cada fricción se multiplica.
- **PROTOCOLOS** — vencidos con dueño y reloj; varios protocolos por paciente sin
  pisarse (Fase IV del mapa de implementación); el embarazo como protocolo más, no
  como caso especial. *Por qué:* el seguimiento que depende de la memoria se pierde.
- **LABORATORIO-Y-ESTADO** — semáforo solo con catálogo firmado (sin catálogo: gris);
  «escrito tardío» honesto; curvas que se cortan donde no hay datos; referencia citada
  por analito (los 9 analitos de hoy no traen fuente en su catálogo — hueco del propio
  DoD). *Por qué:* un semáforo sin firma es una opinión médica empañetada de autoridad.
- **CALCULADORES** — las 18 exactas (RF-16) con casa citada por fórmula; prefill con
  origen registrado (0 captura doble); el cálculo corre en el segundo en que sus datos
  existen; resultado con interpretación en lenguaje de la persona. *Por qué:* un
  cálculo erróneo es daño directo; la casa citada es lo que permite auditarlo.
- **HISTORIA-Y-NOTAS** — notas inmutables con autor y cédula; editar crea versión
  nueva; NOM-004 como asistente dentro de la nota; interconsultas con vencimiento y
  dueño. *Por qué:* la nota es el documento legal de la consulta.
- **DOCUMENTOS** — las 22 funciones de `MOD-DOCUMENTOS.md` con su guarda; 0 captura
  doble; aviso de privacidad una vez por expediente; compartir sin identidad con sus
  dos rótulos de salida (RF-23). *Por qué:* es el único módulo ya especificado; su DoD
  es el ejemplo que los otros 16 deben copiar.
- **ULTRASONIDO** — importación que conserva parámetros nuevos sin perder los previos;
  una sola copia de imágenes; ingestación por USB y red con simulacro; consentimiento
  de imagen. *Por qué:* es donde más fácil es duplicar y corromper archivos pesados.
- **AGENDA** — integración completa del módulo de mensajes (D-2c en vigor); recordatorio
  sin cifras ni diagnósticos (DEC-32, frontera en tres puntos); dedupe con clave; el
  «no llegó» reagenda con vínculo a la cita real. *Por qué:* es la frontera legal con
  la paciente fuera del consultorio.
- **ACCESO** — los cuatro roles con su matriz sembrada y probada; PIN con espera
  persistente; recuperación sin red; bitácora de quién vio qué expediente. *Hoy no
  existe pantalla ni módulo:* su DoD empieza por existir. *Por qué:* sin acceso no hay
  privacidad real.
- **CIERRE-Y-DEGRADACION** — los seis guiones en humano (sin palabra técnica);
  traspaso imprimible con referidas separadas; respaldo con simulacro verificado y
  registrado; el ensayo del respaldo visible en el cierre. *Por qué:* en un consultorio
  con cortes de luz, el día se pierde o no en este módulo.
- **BUSQUEDA-Y-MOVIMIENTO** — los 12 filtros del buscador; import con simulacro antes
  de tocar la base (nunca import a ciegas); export con identidad para respaldo (los dos
  rótulos de RF-23); corregir el puntero R-24/R-23 donde quede viejo en la fuente.
  *Por qué:* migrar sin simulacro es la forma más rápida de perder un expediente entero.
- **OPERACION** — instalar copiando la carpeta (sin instalador); actualizar sin dañar
  datos (con simulacro de actualización); versión visible en pantalla; aplica también
  al propio repo: un paquete portable que arranque en limpio. *Por qué:* el usuario
  real no tiene técnico.

### 5.3 · DoD de las piezas de soporte (las que sostienen a los 17)

- **Módulo de motor (lógica viva):** API pública documentada · toda función con prueba
  de unidad **y** prueba de ruptura diseñada para fallar contra su defecto (R6) ·
  validación en el motor aunque la UI la olvide (MT-02) · estado persistido con
  versión · 0 literals clínicos (ML-10) · fila de `componentes[]` al día con huella.
  *Por qué:* el motor es la única puerta; un defecto ahí se multiplica por 18 pantallas.
- **Catálogo firmable:** fuera del código · generador · espejo idempotente · estado de
  firma y firmante · versión sellada · suite que prohíbe literales clínicos en HTML/JS
  de pantallas. *Por qué:* los números clínicos cambian con criterio médico, no con
  despliegue; tienen que poder firmarse sin tocar código.
- **Módulo de mensajes:** examen de inocuidad en editar / crear / entregar (tres
  puntos) · dedupe con clave probado · plantilla con disparo no vacío y motivo general
  · 0 cifras y 0 diagnósticos (DEC-32). *Por qué:* aquí un fallo no es un bug, es una
  violación de confianza.
- **Mejora ME-xx:** ⬜ → ✅ solo con comando + conteo en `PROPUESTAS-DE-MEJORA.md` §8 ·
  si agrega guardia, tiene su prueba de fuego (R12). *Por qué:* la lección del 22 %:
  «propuesta presentada como hecho» fue lo que el dueño castigó.
- **Decisión abierta:** propuesta + consecuencias + default declarado + árbol de
  decisiones derivadas + plazo o disparador. *Por qué:* 10 decisiones abiertas con
  default no bloquean la obra; 10 sin default la paralizan el día que se necesiten.
- **Iteración del agente:** los 12 puntos del autocheck de `AGENTS.md` §4, incluida la
  traducción al lenguaje humano del dueño (§0.5). *Por qué:* es el freno contra la
  «entrega fantasma» y contra el rechazo por lenguaje.
- **Prueba/suite:** carga el código desde disco (MT-09) · dependencias declaradas
  (MT-10) · puede fallar contra el defecto que busca (si nunca falló, no prueba nada) ·
  imprime conteos. *Por qué:* los tests verdes falsos ya costaron ciclos; el DoD de la
  prueba es lo que evita repetirlo.
- **Paquete de firmas (§3 del inventario):** 18/18 verificadas + T2 verde + veredicto
  humano doble por rol + acta (RQ-F de A13). *Por qué:* una firma sobre lo que nadie
  del oficio tocó no es una firma, es un trámite.

*Estado de esta familia:* en vigor como definición desde hoy; su **verificación
automática** (suites que cuenten hojas completas, casas citadas y acoples) queda
pendiente en A13 junto con cada RQ — ningún punto de esta sección se declara «hecho»
sin su comando.
