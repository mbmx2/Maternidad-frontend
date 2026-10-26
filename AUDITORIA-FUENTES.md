# AUDITORIA-FUENTES — auditoría viva de todas las casas de verdad

> **Qué es:** la revisión de conjunto de **todas las fuentes de verdad** de esta carpeta
> —ley, lógica, contratos, fuente de construcción, dibujos, método, bitácora y
> herramientas— contra cuatro preguntas: ¿cada fuente explica **qué es** lo que declara? ·
> ¿está **construida su lógica** (módulos, funciones, interfaces)? · ¿las fuentes **coinciden
> entre sí** (mismo número, mismo puntero, mismo término)? · ¿lo que declara **se puede
> verificar por comando** y **cubre el flujo declarado** de enfermera y médica? ·
> Fecha: 2026-10-24 · primera ronda completa.
>
> **Regla de esta auditoría:** los defectos nuevos van al buzón con número **antes** que a
> este informe (H-056 a H-060, registrados en esta ronda). Este archivo es informe, no
> casa: si contradice a una fuente, manda la fuente.

## Cómo reverificar (un comando por afirmación)

`sha256sum -c HUELLAS.txt` (integridad: hoy 124 archivos en verde) ·
`grep -c "^| H-0" 04-METODO-Y-ACEPTACION/HALLAZGOS.md` (hoy **64**) ·
`grep -c "^\*\*R-" 05-LEY/ACTA_FRONTEND.md` (hoy **53**) ·
`grep -c "Pilar 9\|Pilar 10" 02-LOGICA-DE-DISENO/DOCTRINA-DE-DISENO.md` (hoy **2**) ·
`grep -c "no llegó\|equipo fuera\|estación a medias" 01-DIBUJOS/EDICION/PROPUESTAS/TABLERO.html`
(hoy **4**: falta «estación a medias») · contar `MOD-*.md` en `06-FUENTE-BACKEND/`
(hoy **1 de 17**).

## El resultado, fuente por fuente

### 05-LEY (ACTA_FRONTEND) — **sólida**
53 requisitos con el micro-formato completo (QUÉ · POR QUÉ · DECISIÓN · CÓMO con su
secuencia de FND · GUARDA con su prueba), verificados por comando: R-45, R-48, R-51, R-52
y R-53 —los que el menú cita— están todos escritos. Cubre los trece bloques de alcance.
**Deudas declaradas por la propia ley:** la enmienda v4.3 sin ratificar (con ella los
pilares ganan rango), los contratos retrospectivos (D-*, B-*) por escribir, y los aparcados
con gatillo (dictado R-25).

### 02-LOGICA · DOCTRINA — **parcial**
Los diez pilares están escritos con sus números y su enmienda de la noche (O1/O2/O10
aplicados). **Dos defectos de forma registrados:** la cabecera y el encabezado dicen
«ocho pilares» y el cuerpo tiene diez (**H-056**), y el número de aceptación del pilar 1
está duplicado (**H-057**) — dos textos del mismo número es el principio de una futura
desincronía, la misma enfermedad de H-046.

### 02-LOGICA · FLUJOS-TRABAJO — **sólida, con su marca honesta**
Capa D (día físico+digital) como norma, E (25 errores) y F (O1–O10); A–C declaradas
historia. Su cabecera mantiene la marca correcta: *validación con el personal pendiente —
hasta entonces, hipótesis informada*. Es la casa de la que nacen los requerimientos FL de
`REQ-FLUJO.md`.

### 02-LOGICA · REQUISITOS-DEL-DISENO — **sólida con dos huecos**
Decisiones A–M con sus cinco campos y anclaje a página; §5 con las diez abiertas suyas;
§6 con la regla viva (enmienda pendiente: B-009). **Hueco:** ninguna decisión sobre el
export anónimo (**H-051**); su §6.8 choca con la bitácora nueva hasta que se enmiende.

### 02-LOGICA · SISTEMA-DE-ALERTAS, PRESENTACIONES, SISTEMA-DE-LOGICAS — **casas declaradas, auditoría de contenido pendiente**
Verificadas su cabecera, su fecha (2026-10-23) y su rol: ALERTAS es casa canónica de los
números del pilar 10 (§8) y de los seis tipos; PRESENTACION-EN-PANTALLA de las 10 reglas
de ventana; SISTEMA-DE-LOGICAS de la precedencia (seguridad > flujo > diseño > código).
**Alcance honesto:** esta ronda auditó su estructura y vigencia, no su contenido línea a
línea — queda como segunda ronda.

### 02-LOGICA · IMPLEMENTACION-DESDE-LA-VERDAD — **sólida**
El paquete-verdad (6 componentes), el catálogo de 40 decisiones técnicas con sus marcas
[d]/[r]/[o] y la pipeline verdad→código. Es la casa que RESPALDA la sección de estructura
de código de `REQ-FLUJO.md`; sus tres huecos por decidir (forma de archivo, decisión de
ruta, mediciones M3) siguen abiertos con su marca.

### 02-LOGICA · CHECKPOINT — **mecanismo sano, foto vieja, comando no ejecutable aquí**
El diseño de huellas es correcto y su §10 ya descartó duplicar carpetas. Estado: su foto
muestra la huella vieja del buzón (`020aad…`; hoy `0591cc…`) y **no conoce** la familia 06
ni `CONSTRUCCION.md` — esperado: se refresca al cerrar bloque. **Defecto de herramienta
(H-059):** su comando de verificación usa rutas de la maestra (`ESTADO.md`, `GUIAS/*.md`)
que no existen en esta copia.

### 03-CONTRATOS (7 + mapa) — **parcial, es el eslabón más flojo**
Los siete contratos tienen su formato de 7 secciones (verificado a fondo en
IDENTIDAD-CONTEXTO). **Tres deudas conocidas sin cerrar:** H-047 (trece mecanismos
decididos sin contrato), H-048 (el contrato TABLERO aún contiene «estación a mitad» y
«Columnas» —confirmado por comando: 2 apariciones—), y el MAPA desactualizado (H-049).
**Hueco estructural:** de los 17 módulos del menú de construcción, solo 6 tienen contrato
y 1 tiene especificación; **10 módulos no tienen ni lo uno ni lo otro** (CONTROLES,
LABORATORIO, CALCULADORES, HISTORIA, ULTRASONIDO, AGENDA, ACCESO, BUSQUEDA, OPERACION, y
DOCUMENTOS con especificación pero sin contrato).

### 06-FUENTE-BACKEND — **nueva y cumple su propio formato**
`FUENTE-DE-VERDAD.md` (menú de 17, diez campos, siete secciones, ocho reglas) y
`MOD-DOCUMENTOS.md` v2 (22 funciones con RELACIONES y DATOS, seis supuestos de ruta por
verificar). Autoverificable contra sus propias reglas. **Estado de servicio: 1 de 17
módulos escritos.**

### 01-DIBUJOS (33 + 3 rutas + 24 réplicas + 24 fichas) — **sólida en forma, con huecos de contenido**
Armazón compartido, bandas de pregunta y veredicto, rutas intactas. **Huecos abiertos:**
anonimización sin dibujar (H-051), marcadores (H-052), aviso de privacidad (H-053),
consentimiento de imagen en el ingreso (H-054), y el tercer estado del tablero
(H-060: «no llegó» y «equipo fuera» están, falta «estación a medias»).

### 04-METODO (buzón, acuerdos, análisis, evaluación, kit, plantilla, orden) — **sólida en diseño, con deuda de gestión y de enlaces**
El buzón cumple su formato de 8 columnas: **60 filas, perdidos 0** — pero **todas en
estado «nuevo»: cero verificados/cerrados** (deuda de gestión, no de registro). El kit y
la plantilla están completos y son usables, **salvo sus enlaces relativos** que no
resuelven en la copia (**H-059**). La orden de trabajo está **sin estado de ejecución
declarado**: Tarea D hecha (CIERRE/LABORATORIO/FALLA existen), Tarea B a dos de tres
(H-060), Tareas C/E/F sin marcar — de ahí la propuesta B-009 de cerrarla y dejar el
seguimiento en la bitácora.

### INDEX y LEEME — **parciales**
El índice es navegable y su conteo de páginas ya es único (H-046 reparado), pero acumula
**dos punteros erróneos**: IMPORTAR→R-23 cuando es R-24 (**H-050**) y NOM004→C-18 cuando
el diálogo es C-19 y falta R-18 (**H-058**). El LEEME describe correctamente la carpeta y
sus herramientas.

### Herramientas (HUELLAS, refresco, generador) — **una sana, dos de maestra**
`HUELLAS.txt` funciona: **124/124 en verde** tras esta sesión. El script de refresco es
correcto y declara sus cinco carpetas (por eso la familia 06, `CONSTRUCCION.md` y este
archivo viven en la raíz: no los borra). El generador de réplicas y el comando del
checkpoint pertenecen a la maestra (**H-059**).

### CONSTRUCCION (la bitácora) — **nueva y al día**
Doce entradas tras esta ronda; cumple sus siete reglas; el estado de módulos no lo duplica:
se lee del menú.

## La síntesis en cuatro renglones

**Fortalezas:** la ley y la doctrina están construidas con número y prueba; los flujos
tienen norma y autocrítica; el buzón no pierde nada; la integridad se verifica con un
comando; y la nueva fuente de construcción nace cumpliendo su propio formato.
**El eslabón más flojo:** los contratos y la capa de traducción —diez módulos sin casa de
lógica y trece mecanismos sin contrato (H-047). **La deuda de gestión:** sesenta hallazgos
sin cerrar y una entrevista sin fecha: todo el sistema espera **doble veredicto humano**.
**Los defectos de esta ronda:** cinco de forma, todos registrados (H-056…H-060) y
reparables en papel sin decisión suya, salvo los que tocan índice (H-050/H-058) que reparo
cuando usted lo diga.

## Plan de reparación (qué va en qué orden)

1. **Inmediato, sin decisión suya:** reparar en los dibujos lo que ya está decidido —
   «estación a medias» en TABLERO (H-060) cuando se toque esa página; la cabecera de la
   doctrina (H-056) y el párrafo duplicado (H-057) son de la maestra — se dictan allá.
2. **Con su frase:** puntero de INDEX H-050 y H-058 · cerrar la orden de trabajo · congelar
   acuerdos · enmienda de §6.8.
3. **Al cerrar bloque:** refrescar checkpoint (huellas nuevas: buzón, familia 06,
   bitácora) y mapa de implementación (H-049).
4. **Estructurales:** escribir los 16 módulos restantes de la fuente siguiendo el orden
   que ahora marca `REQ-FLUJO.md` (los FL-xx priorizan los módulos que el flujo primero
   toca), y los contratos que falten en la maestra.
5. **Siempre:** la entrevista con el kit — es lo que convierte «hipótesis informada» en
   «flujo validado» y mueve los estados de «nuevo» a «verificado».

## El puente a los requerimientos de flujo

Esta auditoría confirmó que **la capa que falta es la de la interacción**: la ley declara
requisitos sueltos, los contratos declaran módulos, los dibujos declaran pantallas, pero
**la cadena «paso del día ↔ interfaz ↔ función ↔ módulo ↔ estructura de código» solo
existía en la conversación**. Ese vacío lo cierra
`06-FUENTE-BACKEND/REQ-FLUJO.md`: diecisiete requerimientos FL-01…FL-17 tomados del flujo
declarado (mañana de la enfermera, consulta de la médica, cortes clínicos y técnicos),
cada uno con su cadena de interacción y su estructura de código.

## Estado al checkpoint (segunda pasada — 2026-10-25)

La primera auditoría dejó un plan; esta sección cierra el bloque con **qué cambió desde
entonces, fuente por fuente**, y manda sobre los estados escritos arriba cuando difieran:

- **El checkpoint de lógica se refrescó: v1.2.** Fechas, conteos (buzón **64**, no 49) y
  **todas las huellas maestras que cambiaron** con la portación (FLUJOS · DOCTRINA ·
  REQUISITOS · HALLAZGOS · ACUERDOS · conjunto de contratos · conjunto de recorridos),
  más la **declaración del método de conjuntos** — verificado: reproduce exactos los dos
  valores v1.1 (`5fdfef042c4a` y `fe04fdde682c`) — y la huella de la bitácora nueva
  `GUIAS/CONSTRUCCION.md`. Portado a la maestra el mismo día.
- **Doctrina:** H-056/H-057 reparados en ambas casas («diez pilares», sin párrafo
  duplicado) + la regla nueva del pilar 1 (prioridad humana, decisión B6).
- **Flujos:** H-060 reparado (tablero de la ronda 1) · capa D actualizada con los cuatro
  datos de libreta + encadenado y la estación de 10 campos con revisión de estudios y
  preparación de ultrasonido · el «seis campos» corregido también en la ruta de
  enfermera (ambas casas).
- **REQUISITOS-DEL-DISENO:** decisión **B6** añadida (la prioridad la define el equipo;
  el software nunca ordena por llegada).
- **Contrato TABLERO:** el término rechazado quedó fuera y el párrafo de orden humano
  dentro; sigue abierto lo de «columnas vs lista» (decisión §5.10 de la bandeja).
- **Buzón:** de 60 a **64** — H-061/062/063 (puente incompleto, circuito sin cerrar, 9
  campos) reparados en su turno; H-064 (encabezados) reparado al completar la ronda; los
  punteros H-050/H-058 reparados. **Siguen abiertos:** H-047 (13 mecanismos sin
  contrato), H-049 (mapa), H-051…H-054 (dibujos faltantes), H-055 (verificación en la
  maestra), H-059 (enlaces del kit).
- **Sello de la copia:** `sha256sum -c HUELLAS.txt` = **171 archivos** — familias 06 (5),
  07 (30 piezas con sus propuestas), 08 (7) y los de raíz, todos cubiertos.
- **Números de construcción:** 26 RF / 22 RB · 22 funciones en `MOD-DOCUMENTOS` · 17 FL ·
  1 módulo escrito de 17 en el menú (DOCUMENTOS) — el menú sigue mandando en profundidad.
- **Síntesis narrativa completa del bloque:** `CONSTRUCCION.md` **B-028** (qué se ha hecho,
qué está implementado, por qué, cómo se presenta, la lógica y el flujo actual).

## Auditoría adversarial completa del repositorio (2026-10-25 — segunda ronda extrema)

**Qué intenté romper:** (1) las **cifras vivas** de cada documento —¿los números que afirman
son los reales?· (2) la **sincronía local↔maestra** —¿siguen iguales los dos hogares?· (3)
los **conteos cruzados** (RF+RB · FL · piezas · pantallas · h1) · (4) el **orden cronológico**
del buzón y la bitácora · (5) los **enlaces** de las familias nuevas · (6) el **sello mismo**
—¿prueba lo que dice probar? · (7) el estado de las reparaciones prometidas (H-064).

**Qué encontró, con severidad:**

- **ALTO-1 · El sello mintió durante dos rondas.** El LEEME decía «166 archivos» y hay
  **171** — las cuatro propuestas y su índice entraron sin actualizarlo — y el CHECKPOINT
  v1.2 repetía166 y «64 hallazgos» cuando eran **66**. Un sello que miente es peor que no
  sello: es el que manda cuando nadie puede mirar adentro. **Reparado en el turno:** sellos
  a **171/66** en LEEME, CHECKPOINT (sus dos apariciones), la reverificación de B-028 y
  `REQUISITOS-DEL-DISENO`.
- **ALTO-2 · La maestra se quedó atrás otra vez.** `GUIAS/CONSTRUCCION.md` terminaba en
  **B-028** —le faltaban B-029, B-030 y B-031 (dictámenes, verificación y propuestas)—.
  **Reparado:** re-sincronía completa (bitácora, checkpoint, requisitos y buzón — cuatro
  puertos) en este mismo turno.
- **MEDIO-1 · Orden invertido en la cola del buzón.** H-066 y H-065 entraron **antes** que
  H-064 por la línea ancla que usé: el apéndice dejó de ser cronológico. **Reparado:**
  reordenados064 → 065 → 066.
- **MEDIO-2 · H-064 prometía un pulido que ya se había hecho.** Su fila decía «aplanado
  pendiente» cuando ya estaba aplicado (h3→h2 con estilos conservados, h4→h3).
  **Reparado:** fila actualizada con la verificación (27 pantallas con un h1).
- **MEDIO-3 · El conteo de «25 piezas» de la familia07 quedó corto** en LEEME, índice,
  checkpoint y esta auditoría: hoy son **30** (21 pantallas +2 índices +4 propuestas +3
  recorridos). **Reparado** en los cuatro documentos.
- **BAJO · Crónicas con cifras viejas** (B-021 y su «25 piezas» de aquel día): **no se
  tocaron** — la crónica se anota, no se edita; esa diferencia entre «estado actual» y
  «historia» es precisamente lo que distingue un sello de una memoria.

**Los ataques que PASARON sin daño (lo que sí aguantó):** **RF+RB =48** — cuadra exacto
con26+22 · **FL =17** ✓ · **un h1 en cada una de las27 pantallas de la familia07** ✓ ·
**buzón real =66 en ambos hogares** (el «88» de un conteo fue artefacto de mi propio grep
con la barra sin escapar — el patrón `^\| H-` da66, y los rangos lo confirman:49+10+7) ·
`node --check` verde en el puente · los enlaces de las cuatro propuestas apuntan a páginas
que existen ✓ · y `sha256sum -c` vuelve a verde tras las reparaciones.

**Alternativas comparadas:** (a) **reparar y devolver el sello a la verdad** — elegida: es
la regla de verdad por comando de esta casa; (b) dejar los sellos como crónica fechada —
descartada: rompería la única prueba que corre sin leer; (c) congelar la carpeta para que
no vuelva a desfasarse — descartada: la obra sigue viva hasta la entrevista, y el desfase
se caza con este mismo tipo de auditoría, no con el miedo.

**Lo que NO es defecto y se declara:** la bitácora y el buzón crecen por diseño (cada
interacción añade), por eso sus números deben leerse con la fecha al lado; y las familias
06/07/08 viven solo en la copia hasta la portación total, ya declarada en `GUIAS/ACUERDOS.md`.
