# ACUERDOS — el entendimiento alcanzado hasta hoy, registrado

> Hoja viva (no es ley; la ley es `ACTA_CONSTITUTIVA.md`). Aquí queda escrito **qué nos
> hemos entendido** y **dónde vive cada acuerdo** — para que ninguna sesión futura, de
> usted o de cualquier agente, tenga que repetir esta conversación. Se añade acuerdo nuevo
> cuando se cierra en el diálogo. Fecha de la última entrada: 2026-10-25.

## 1 · Cómo me entrego (reglas de comunicación — su H-001 y H-003)

| Acuerdo | En dónde vive |
|---|---|
| Toda entrega empieza con **caja de resumen de 3 líneas** sin palabras técnicas | P9a de la ley (v4.2) — aplicado desde la sesión 2026-10-23 |
| **Explicación más profunda y más sencilla**, un tema por párrafo, cada término técnico traducido al lado | P9a + H-001 (buzón de hallazgos) |
| **No tomar sus peticiones literales:** analizarlas y entregar varias opciones viables comparadas con recomendación, salvo orden explícita de implementar tal cual | H-003 — pendiente de elevar a ley en la enmienda v4.3 |
| Usted nunca toca el código para revisar; si algo se le pierde en las capas, pide «explica otra vez» | regla viva de sesión |

## 2 · Cómo se gobierna (los 5 rituales + sus derechos)

| Acuerdo | En dónde vive |
|---|---|
| 5 citas fijas: ventana semanal 30 min · revisión de 1 pantalla 20–30 min · retrospectiva quincenal 15 min · entregar/verificar con «dónde revisar» · revisión del contrato cada 3 semanas | §4.13 de la ley |
| Zonas de decisión 🟢🟡🔴 (usted firma lo rojo siempre) · presupuesto de atención ≤60 min/semana · **el proceso se adapta al dueño, nunca al revés** | §4.13 de la ley |
| Sus 5 preguntas para revisar cualquier enmienda | `GUIAS/DUEÑO-GOBIERNO.md` §3 |
| Sus hallazgos van al buzón con número y estado (H-001…H-004 hoy); perdidos = 0 | DEC-39 + `GUIAS/HALLAZGOS.md` + `tools/hallazgos.py` |

## 3 · Cómo se construye (el modelo de capas y los contratos)

| Acuerdo | En dónde vive |
|---|---|
| El proyecto tiene capa 0 (misión: madre y bebé) y capas A–F; hay columnas que atraviesan todo: trazabilidad, auditoría, claridad, validación, automatización, gestión, seguridad clínica | §4.14 de la ley |
| **Contratos de diseño en `CONTRATOS/`: dos familias** — `PANTALLAS/C-xx.md` y `MODULOS/X-n.md` — con **bitácora de cambios** (qué cambió, cuándo, por qué) | propuesto a ley en la enmienda v4.3 (esperando su «v4.3 ratificada») |
| **Dos estados del contrato:** *exploración* (se cambia el mismo día, mil veces, gratis — no toca el programa) y *aplicado* (citado por una tarea: cambiarlo cuesta trabajo o enmienda) | propuesto a ley en la enmienda v4.3 |
| Diseñar en papel antes de construir cuesta 10–100× menos (su propia medición de la ronda cara) | principio S4 de sus auditorías + esta hoja |

## 4 · La estrategia de exploración que está sobre la mesa (su propuesta — ANÁLISIS EN CURSO)

Su idea, registrada como **H-004**: (a) **checkpoint** del grado actual de construcción;
(b) en una copia, **jugar** editando todas las capas sin miedo; (c) si la implementación
vieja no da, **empezar uno nuevo con las directrices** y ver si cumple lo requerido.
**Estado:** analizada por el agente con 5 opciones comparadas (sesión 2026-10-23);
decisión pendiente de su frase. Las opciones y la recomendación viven en la conversación
de esa fecha y se escribirán aquí cuando usted elija.

## 5 · Lo que ya está implementado de todo esto (fecha 2026-10-23)

Ley v4.2 aplicada (P9, §4.13–§4.16, R-53, DEC-39) · `GUIAS/` con 7 guías · `CONTRATOS/`
**aún no existe** (espera la v4.3) · herramientas `pulso`/`digesto`/`hallazgos` verdes ·
buzón con H-001…H-004 · Menú de Revisión y Mapa web **pendientes** (esperan la v4.3) ·
sesión piloto C-03 pendiente de usted.

## 6 · Acuerdos de la sesión 2026-10-23 (noche) — sin tablas, y el paquete imprimible

**Regla de formato (H-005):** a partir de ahora ninguna entrega al dueño usa tablas de
markdown. Solo párrafos y listas que se explican solos y no ocupan espacio de más. Vale
también para esta hoja hacia adelante: las entradas nuevas se escriben en texto corrido.

**El problema de fondo que resolvió esta sesión (H-006 + H-004 juntos):** el dueño lleva
meses intentando construir software sin poder usarlo, porque cada cambio toca código y
arrastra regresiones — se itera en la capa cara. Acordamos iterar en la capa barata:
primero la imagen de cada pantalla y su lógica escrita (el contrato), editable mil veces
sin tocar el programa; recién cuando el diseño se estabiliza, se aplica al código una vez
con su prueba. Y esa imagen + lógica se imprimen o se envían para que médicos y enfermeras
marquen «falta esto / quita esto / lo quiero así» — personas que hoy no pueden interactuar
con el software de ninguna manera.

**Estado:** la propuesta completa (ficha imprimible por pantalla con imagen + contrato +
espacio de anotación, y su circuito con los interesados) está analizada con opciones en la
entrega del 2026-10-23; pendiente de su confirmación para entrar al digesto de la enmienda
v4.3 junto con: contratos de las dos familias, Menú de Revisión, Mapa web, regla de
análisis de opciones (H-003) y regla de ventana para ramas de juego (H-004).

## 7 · Entrega directa de las fichas (orden del dueño, 2026-10-23)

Orden explícita: «no deberte estar rogando… obedece». Se entregó en el mismo turno el
paquete completo de fichas imprimibles: `GUIAS/FICHAS/` con 24 fichas (una por pantalla,
salvo C-11 que no existe) generadas desde el programa real —títulos, casillas y ayudas
salen del código de hoy— y `MAPA.html` como índice con el orden sugerido de revisión.
Cada ficha lleva los tres espacios de anotación (falta esto · quítenselo · así lo quiero)
y las instrucciones de devolución. Los prototipos de `Maternidad_PROTOTIPOS/` quedan
declarados desactualizados y reemplazados por estas fichas como material de decisión.
Regla viva asociada (H-007): cuando un pedido sea claro, se entrega sin pedir permiso.

## 9 · Registro del entendimiento sobre pantallas + edición en papel (2026-10-23)

**Orden del dueño:** registrar el entendimiento, la crítica y el análisis de pantallas
para que quede vivo y mejorable, y que toda edición de aquí en adelante se haga **en
papel** — réplicas HTML idénticas a las pantallas del programa donde se dictan los
cambios — sin tocar el código hasta que una pantalla quede estabilizada.

**Qué quedó registrado:**
- `GUIAS/EVALUACION-PANTALLAS.md` — el método de evaluación: regla madre (se defiende el
  valor, nunca la forma), ciclo de edición en papel, vocabulario de 30 categorías, modelo
  clínico de protocolos múltiples, hilo conductor, y cómo se actualiza.
- `GUIAS/ANALISIS-PANTALLAS.md` — las 24 pantallas explicadas: qué valor prometía cada
  una, cómo funciona hoy y con qué se conecta; es la base contra la que se contrastan sus
  próximas críticas.
- `GUIAS/EDICION/` — réplicas visuales de las 24 pantallas + índice + reglas (el
  generador solo crea lo que falta: nunca pisa lo dictado).
- Buzón: 7 críticas de su revisión de hoy registradas — H-008 (acceso: registrar y
  recuperar), H-009 (registro: nombre, campos, médico derivador), H-010 (inicio no se
  explica), H-011 (ficha: explicar su valor), H-012 (control prenatal: nombre e hilo
  conductor), H-013 (FUM: ¿pantalla propia?), H-014 (modelo de protocolos múltiples).
  Total en buzón: 14 hallazgos, perdidos 0.
- Cero cambios en el código del software en toda esta etapa.

## 10 · Registro del sistema lógico + propuestas de frontend (2026-10-23)

**Orden del dueño:** dejar estructurada la lógica de todo (política · flujo raíz ·
requerimientos · interfaz · experiencia · construcción · mantenimiento de errores) antes
de pasar a código; y generar las pantallas propuestas como páginas de frontend reales —
colores, disposición, botones, funciones— que se presenten al equipo como si el software
estuviera terminado, para que ellas acepten, rechacen o transformen; el código se escribe
recién después, y solo de lo que el equipo acepta como propio.

**Quedó registrado:**
- `GUIAS/LOGICAS/SISTEMA-DE-LOGICAS.md` — las 7 lógicas con su regla de precedencia
  (seguridad de la paciente > flujo validado > diseño > comodidad del código) y su
  circuito de retorno de errores.
- `GUIAS/LOGICAS/DOCTRINA-DE-DISENO.md` — 8 pilares con número de aceptación cada uno +
  los 5 órganos nuevos y los 6 refuerzos sobre lo existente.
- `GUIAS/FLUJOS-TRABAJO.md` — la raíz: hipótesis de flujos, contraste de 11 puntos contra
  el software real, 8 flujos con cortes clínicos y técnicos, y el escenario de 18
  pacientes (marca de pendiente: validación con el personal del centro).
- `GUIAS/EDICION/PROPUESTAS/` — 6 páginas de frontend real + índice: Tablero del día ·
  Modo consulta · Control prenatal protegido · Registro de emergencia · Seguimiento por
  protocolos · Atenciones pausadas. Cada una con su banda de «Pregunta para el equipo» y
  su casilla de veredicto (aprobar / aprobar con cambios / rediseñar).
- Regla de oro repetida en cada entrega: **ninguna pantalla propuesta se construye hasta
  que dos personas del oficio le pongan veredicto.**

## 11 · Presentación en ventana limitada (H-020, 2026-10-23)

El dueño encontró que las propuestas pedían scroll de página y recordó dos verdades del
producto final: **es un programa autocontenido** (sin zoom de navegador) y **quien lo usa
puede no maximizar**. Acuerdos: nueva doctrina `GUIAS/LOGICAS/PRESENTACION-EN-PANTALLA.md`
(10 reglas, 29 variables inventariadas, 8 números de aceptación —incluido el contrato de
ventana mínima 1024×660 y el «redimensionar no borra nada»—); **pilar 9 añadido a la
doctrina de diseño**; y corrección estructural aplicada a las 29 propuestas: barra y menú
fijos, el contenido que rueda **dentro** de la ventana como en el programa real, tablero
con rollo por columna, impresión completa. Hallazgo H-020 en el buzón.

## 12 · Tesis de valor: alertas y calculadoras (H-021, 2026-10-23)

El dueño declaró la mayor propuesta de valor del software: **avisos y alarmas sobre los
estados de salud que salen del análisis de los signos**, con las calculadoras como activo
más valioso (alertas instantáneas, claras y directas). Quedó de punta a punta en
`GUIAS/LOGICAS/SISTEMA-DE-ALERTAS.md`: 6 tipos de aviso (verde · plazo · problema ·
urgencia · contexto permanente · interacción) · circuito vertical (datos → cálculo solo
cuando hay datos → reglas en catálogos firmados → evento con acción y plazo →
presentación por pantalla → bitácora y deduplicación) · datos fundamentales declarados
(alergias, **tipo de sangre —nuevo en la ficha—**, medicación actual, condiciones
crónicas, tabla de interacciones como catálogo firmable) · 8 números de aceptación
(0 avisos sin acción · 0 umbrales en código · 100 % de escrituras con contexto · 0
prescripciones sin verificación · 0 plazos huérfanos…). **Pilar 10** añadido a la
doctrina de diseño. Demostración viva: `EDICION/PROPUESTAS/ALERTAS.html` (con la prueba
interactiva de la interacción que detiene el guardado), y parches en CONSULTA (sangre y
medicación en la tarjeta), CALCULADORES (resultado interpretado con los avisos), FICHA
(bloque «Datos que salvan») e INDICE.


## 13 · Replanteamiento de flujos físicos con autocrítica (H-022, 2026-10-23)

El dueño pidió redefinir el flujo con todo integrado, **sin optimismo**, encontrando lo
no útil, no aplicable y no real. Resultado en `GUIAS/FLUJOS-TRABAJO.md` Capas D–F: el
flujo físico+digital replanteado (enfermera primero: llamadas → agenda → puerta →
carril → urgencia con voz → cierre con traspaso), **25 errores autocríticos en 5
grupos** (supuestos falsos: día maduro, teléfono inexistente, dos enfermeras · errores
del tablero: sin regla de eventos, estados faltantes · avisos sin dueño · continuidad
sin cierre · realismo del carril), y **10 optimizaciones O1–O10** con el documento que
cada una edita. Ya aplicadas: DOCTRINA pilar 1 (regla de eventos, dueño del tablero,
estados no llegó / estación a medias / equipo fuera) y SISTEMA-DE-ALERTAS (aviso con
dueño + la urgencia cierra en voz). **Norma nueva:** la Capa D sustituye a la Capa C
como diseño; las Capas A–C quedan como historia. Pendiente del dueño: aprobar O5–O9
(traspaso, día 1, personal mínimo, captura de laboratorio, fuente única) para volcarlos
a las propuestas dibujadas.

## 14 · Auditoría del sistema de lógica — 4 categorías (H-023, 2026-10-23)

Segunda ronda de auditoría, esta vez sobre el propio corpus de lógica, con las cuatro
categorías del dueño: **aciertos (10)** · **mejorables (8)** · **añadidos (5)** ·
**retiros/cambios de presentación (6)** — todo escrito en
`GUIAS/LOGICAS/AUDITORIA-DE-LA-LOGICA.md` con su estado por ítem. **Aplicados en la
misma sesión:** casa canónica de conceptos (M1) · banner norma/historia en FLUJOS (M4) ·
retiro del tope de 4 atenciones de la página PAUSA (R1/M7) · recorridos por rol en
`PROPUESTAS/RUTAS/` (N4/R3) · contrato de datos fundamentales en SISTEMA-DE-ALERTAS (N2) ·
sección «lo que NO se construye» en DOCTRINA (N3) · tres carriles visuales aclarados en
LEEME (R4) · **KIT-ENTREVISTA.md** armado (N1). **Incidencia de ejecución:** el primer generador de RUTAS falló (cadenas partidas) y el commit `6c079e9` quedó sin los archivos; se corrigió en el commit siguiente — registro por transparencia. **Pendientes de visto bueno:** M3
(números→medidas), M6 (métrica de diseño M6), M8 (dueños de documento), N5 (día 1, con
O5–O9), R5 (mensaje de fatiga en la demo de alertas), R6 (retiro de la página de
embarazo).


## 15 · Contratos de implementación — primera tanda (H-024, 2026-10-23)

El dueño ordenó empezar a escribir **toda la lógica necesaria de los módulos del flujo
final**, previniendo los problemas posibles e improbables. Nacieron
`GUIAS/CONTRATOS/` con su formato de 7 secciones (el que manda: **prevención de
problemas**), el **MAPA-DE-IMPLEMENTACION** (contraste flujos ↔ módulos ↔ dibujos, con
las 5 fases: identidad → día visible → día trabajable → seguimiento → post-entrevista) y
los **7 contratos de la primera tanda**, todos en estado EXPLORACIÓN (cambian gratis
hasta su estabilización): **TABLERO · ATENCIONES-CONCURRENTES · PROTOCOLOS · URGENCIA ·
ALERTAS · DEGRADACION · IDENTIDAD-CONTEXTO**. Cada uno con sus invariantes, sus casos
borde, sus números de aceptación y su prevención escrita. **Pendientes declarados:**
contrato de autohistoria por QR (su propuesta, aún sin validar con el equipo) ·
contratos retrospectivos de los módulos ya construidos (D-*, B-*) · y la validación de
los 7 con el personal (cada contrato menciona qué pregunta de la entrevista lo corrige).
