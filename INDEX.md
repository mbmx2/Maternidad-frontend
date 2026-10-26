# INDEX — mapa de trazabilidad: cada dibujo ↔ su lógica ↔ su contrato ↔ su requisito

> **Para qué sirve:** cadenas en un solo lugar la cadena de diseño que pide el contraste
> (flujo → lógica → contrato → dibujo → número), para que al construir un frontend no se
> adivine de dónde sale cada regla. **Mapa orientativo:** la casa de cada regla es el
> documento citado; si algo se contradice, manda esa casa (y en última instancia la ley
> en `05-LEY/`). Fecha del mapa: 2026-10-24, desde el commit `ffe19eb`.

## Las tres familias de dibujos

## Orden del repo (índice maestro)

- **Control y gobierno** (raíz): `AGENTS.md` (reglas del agente) · `autoauditoria.sh`
  (verificación en 3 modos) · `CHECKLIST-DE-PETICIONES.md` (pedidos y su estado) ·
  `INVENTARIO-DECISIONES.md` (decisiones con consecuencias) · `HUELLAS.txt` (integridad).
- **Índices de capas y registro maestro** (raíz): `REGISTRO-DEL-SOFTWARE.md` (fuente de
  verdad de la construcción: alcance, requerimientos, decisiones de diseño y mapa de
  mapas) · `INDICE-FRONTEND.md` (elementos y acoples del lado de las pantallas) ·
  `INDICE-BACKEND.md` (lo planteado del lado de detrás + mapa de acople motor↔operación).
- **Mapa y verdad** (raíz): `INDEX.md` (este mapa) · `LEEME.md` (cómo usar la carpeta) ·
  `COMPARATIVA.md` · `CONSTRUCCION.md` · `BANDEJA-DECISIONES.md` · `AUDITORIA-FUENTES.md`.
- **Auditoría** (raíz): `AUDITORIA-ADVERSARIAL-PRUEBAS.md` · `PROPUESTAS-DE-MEJORA.md`.
- **Espejos de la maestra** (no editar aquí): `01-DIBUJOS` a `05-LEY`.
- **Fuente del backend** (documentos, no código): `06-FUENTE-BACKEND`.
- **Flujos dibujados**: `08-FLUJOS`.
- **Entregables de sesión por rol**: `10-PRUEBA-ENFERMERIA` · `11-PRUEBA-MEDICA`.
- **Carrera de continuidad**: `12-AGENDA-Y-MENSAJES`.
- **Frontend activo (versión V4)**: `12-FRONT-SINTESIS` con `VERSIONES.md` (genealogía),
  `SINTESIS-SUMATORIA.md` (la lógica), `SINTESIS-REGISTRO.json` (el avance),
  `PLAN-DE-IMPLEMENTACION.md` (qué sigue) · `PLAN-DE-TRABAJO.md` (tramos para
  dejar el modelo listo y el protocolo permanente de ediciones sobre pantallas
  ya implementadas).

- **`01-DIBUJOS/EDICION/PROPUESTAS/`** — lo que VENDRÁ: el software completo como si
  estuviera terminado. Cada página con su banda de «Pregunta para el equipo» y su casilla
  de veredicto. Empiece por `RUTAS/` (enfermera, médica, dueño): presentar la jornada,
  no 33 páginas sueltas.
- **`01-DIBUJOS/EDICION/`** (C-01…C-25, sin C-11) — lo de HOY: réplicas del programa
  real donde se dictan cambios en papel. Su `INDICE.html` las lista; su generador
  (`generar_base.py`) solo crea lo que falta, jamás pisa lo dictado.
- **`01-DIBUJOS/FICHAS/`** — las fichas imprimibles del estado actual del programa, para
  marcar con el equipo; `MAPA.html` es su índice.
- **`07-FRONT-NUEVO/`** — **la ronda completa del frontend desde cero** (2026-10-25), sin
  heredar errores de la ronda 1: **21 pantallas de jornada + `CUMPLIMIENTO.html` (índice y
  prueba RF por RF) + `PROPUESTAS.html` con sus 4 propuestas + 3 recorridos por rol**, riel de dos grupos reales y menú de contexto
  para las pantallas de la paciente, estados que se mueven solos de verdad, y `puente.js`
  que las hace usables. Su `LEEME.md` es el manifiesto; las páginas de la ronda 1 quedan
  como memoria.
- **`10-PRUEBA-ENFERMERIA/` y `11-PRUEBA-MEDICA/`** — **entregables de sesión por rol**
  (2026-10-25): 6+6 pantallas navegables con el día de las 18 pacientes precargado, motor
  v3 de eventos con reparaciones aplicadas, banda de veredicto por pantalla y hoja
  imprimible de una página por rol. Obra propia: el refresco desde la maestra no las toca.
  Su auditoría adversarial y la comparativa con lo demás viven en
  `AUDITORIA-ADVERSARIAL-PRUEBAS.md`.
- **`12-AGENDA-Y-MENSAJES/`** — **carrera dedicada: agenda y mensajes** (2026-10-25,
  v2): batería de **92 plantillas en 6 familias + 40 filas de semana** (logística,
  laboratorio, semana, diagnóstico, cuidado, alarma) con diagnóstico estructurado,
  semana derivada por cálculo, disponibilidad con huecos, editor de plantillas
  personalizables, dedupe `sem-N` y métrica. Trae `LOGICA-DE-MENSAJES.md`,
  `FLUJOS.html`, `AUDITORIA-ADVERSARIAL.md` (5 rondas) y `pruebas/`. **Protocolo de síntesis sumatoria gradual** (S1): `SINTESIS-SUMATORIA.md` (35 patrones ML/MT/MG versionados + protocolo de 7 pasos por pantalla), `SINTESIS-REGISTRO.json` (libro-verdad por pantalla: pendiente→aplicado→verificado→auditado con evidencia) y `pruebas/pruebas-registro.js` (suite del libro: registro=disco=síntesis, trampa de huella sha256 y conteos en vivo) y **`autoauditoria.sh`** en la raíz (T1 iteración / T2 transición: toda la lógica del repo autoauditada en un comando). Modo **`--pantalla <archivo>`** para iterar una sola pantalla.
- **`INVENTARIO-DECISIONES.md`** — qué decide el dueño (4 puntos estructurales con
  default), qué construye el agente sin preguntar (lista de ejecución) y el **paquete de
  firmas** (médicas · del equipo · del dueño) que se activa solo con 18/18 en `verificado`:
  *primero obra completa, después visto bueno*.
- **`AGENTS.md`** — el contrato del agente (configuración de proyecto): 14 reglas duras
  con el error que las motivó y el mecanismo que las vigila, el orden de lectura inicial,
  el flujo canónico por pantalla y el autocheck antes de decir «listo».
- **`12-FRONT-SINTESIS/`** — **la ronda 3 sintetizada** (2026-10-25): absorbe lo útil de
  las tres rondas anteriores —costura de 07, motor de eventos de 10/11, cobertura y kit de
  la ronda 1— y repara por código cada crítica registrada (H-061…H-095, P-01…P-29): una
  sola jornada compartida, un solo `motor.js`, estados derivados y persistentes, cierre de
  alertas firmado (B-013), urgencia que nace sola de dato crítico, `referida` separada de
  `atendida`, recordatorios con ESCALADO vivo, fecha y reloj reales. Su `LEEME.md` mapea
  **crítica por crítica** dónde vive cada respuesta; `CUMPLIMIENTO.html` dice con honestidad
  qué RF queda PARCIAL o DECLARADO.

- **`08-FLUJOS/`** — **todos los flujos dibujados**: la norma (capa D), los8 cortes, los17
  FL y los circuitos lógicos, con su **índice comparativo** de cobertura por ronda — la
  base del próximo frontend.

## Propuestas — página por página

Grupo 1 · la mañana cargada (el escenario de 18 pacientes):

- `TABLERO.html` — la nueva inicio: estados por eventos, relojes, urgente al frente.
  Contrato `TABLERO` · doctrina pilar 1 (tablero con relojes) · flujos 1, 3, 4.
- `CONSULTA.html` — con la paciente enfrente: identidad grande, estado, protocolos,
  datos fundamentales. Contrato `IDENTIDAD-CONTEXTO` · alertas (el aviso como activo).
- `CONTROL.html` — control prenatal protegido: cinta de identidad y nombre dentro del
  guardar. Requisito R-14/R-15 (10 campos, 9 banderas) · contrato `IDENTIDAD-CONTEXTO`.
- `EMERGENCIA.html` — registro de emergencia: lo mínimo para quien llega sin expediente.
  Contrato `IDENTIDAD-CONTEXTO` (excepción declarada) · `URGENCIA` · flujo 3.
- `PROTOCOLOS.html` — seguimiento por protocolos: dos juntos, múltiples por paciente.
  Contrato `PROTOCOLOS` · fase IV del mapa de implementación.
- `PAUSA.html` — atenciones pausadas: pausa con retorno sin perder nada escrito.
  Contrato `ATENCIONES-CONCURRENTES` · fase III.
- `LABORATORIO.html` — laboratorio en papel: tres datos en treinta segundos que alimentan
  el semáforo, con «escrito tardío» honesto. Optimización O8 · requisito R-38.
- `CIERRE.html` — cierre de día y traspaso: lo atendido, lo no llegado, lo vencido.
  Optimización O5 · flujo de cierre de `FLUJOS-TRABAJO.md` (capa D).
- `FALLA.html` — cómo se ve una falla: los seis guiones de degradación en lenguaje
  humano. Contrato `DEGRADACION` · fase IV.
- `ALERTAS.html` — el corazón del valor: de los signos al aviso con acción y dueño.
  `SISTEMA-DE-ALERTAS.md` (casa canónica) · doctrina pilar 10 · R-14/R-15/R-38.

Grupo 2 · las del alcance completo:

- `ACCESO.html` — la entrada: primer uso, PIN, recuperación sin red.
  R-26/R-49/R-51 · pantalla C-14.
- `REGISTRO.html` — nueva paciente y su visita: lo de la paciente (una vez) separado de
  lo de la visita de hoy. R-01…R-03 · pantalla C-03 · H-039 (datos de la visita).
- `PARECIDAS.html` — la pregunta anteduplicados: homónimia con retorno tipado. R-02.
- `FICHA.html` — la portada en tres bloques, con «datos que salvan». R-04/R-37 · C-04
  (puerta del expediente).
- `DOCUMENTOS.html` — plantillas .docx con relleno automático y verificación de
  integridad. R-05…R-09 · C-05.
- `HISTORIA.html` — la nota como cierre de consulta con tipos que ustedes siembran.
  R-17/R-36 · C-18.
- `NOM004.html` — el formato oficial como asistente dentro de la nota. R-17/R-18/R-36 · C-19
  (puntero corregido por H-058: el diálogo NOM-004 es C-19, no C-18).
- `APOYO.html` — apoyo clínico dentro de la consulta, no pantalla suelta.
  R-20/R-40 · C-07.
- `ESTADO.html` — estado de salud como cabecera de la consulta. R-15 · C-21 ·
  semáforo informativo DEC-27.
- `CALCULADORES.html` — con prefill desde control/laboratorio y resultado interpretado.
  R-43 · Anexo E de la ley · C-06.
- `GRAFICOS.html` — curvas e historial. R-33/R-38 · C-17.
- `TIEMPO.html` — línea de tiempo del expediente. R-22 · C-22.
- `EMBARAZO.html` — el protocolo con su FUM adentro y el parte que cierra y activa el
  puerperio. R-04 · C-09/C-10.
- `PARTO.html` — parto, recién nacido y egreso. R-04/R-35.
- `ULTRASONIDO.html` — estudios con chip de pendiente en el tablero. R-30…R-32 · C-15/C-20.
- `INGESTA.html` — la bandeja del Voluson. R-31 · C-20.
- `PENDIENTES.html` — lo que queda sin cerrar, con vencimiento. R-41 · C-08.
- `AGENDA.html` — citas y recordatorios de continuidad. R-48 · DEC-32/33/34 · C-25.
- `ADMISION.html` — admisión por teléfono: la misma verdad en la mano de la enfermera.
  R-45 · C-24.
- `IMPORTAR.html` — migración con simulacro antes de tocar la base. R-24 (el import —
  puntero corregido por H-050: R-23 es el export anónimo, que aún no tiene página).
- `SISTEMA.html` — administración del dueño: personas, catálogos firmados, instalación.
  R-13/R-29/R-52 · C-13.
- `RESPALDO.html` — copias de seguridad con estado visible y drill. R-12 · C-13.

## La lógica que gobierna los dibujos (dónde mirar cada regla)

- **`02-LOGICA-DE-DISENO/REQUISITOS-DEL-DISENO.md`** — la fuente de verdad del frontend
  HTML: qué se presenta, por qué y cómo, decisión por decisión, anclada a su página.
- **`02-LOGICA-DE-DISENO/DOCTRINA-DE-DISENO.md`** — los pilares con su número de
  aceptación: lo que no tiene número no se cree.
- **`02-LOGICA-DE-DISENO/PRESENTACION-EN-PANTALLA.md`** — la ventana real manda:
  1024×660 mínimo, nada crítico bajo el pliegue, el contenido rueda dentro de la ventana.
- **`02-LOGICA-DE-DISENO/PRESENTACION-DE-CONTENIDO.md`** — cuándo y cómo llega un
  mensaje sin secuestrar la pantalla ni angustiar a la paciente.
- **`02-LOGICA-DE-DISENO/SISTEMA-DE-ALERTAS.md`** — los seis tipos de aviso, el circuito
  y los datos fundamentales (alergias, tipo de sangre, medicación, crónicas).
- **`02-LOGICA-DE-DISENO/FLUJOS-TRABAJO.md`** — la raíz: capas D–F son la norma.
- **`03-CONTRATOS/MODULOS/`** — la lógica total de cada módulo con sus invariantes,
  casos borde y prevención de problemas.
- **`03-CONTRATOS/MAPA-DE-IMPLEMENTACION.md`** — qué módulo hace real cada dibujo y en
  qué fase.
- **`06-FUENTE-BACKEND/FUENTE-DE-VERDAD.md`** — el menú de construcción: los 17 módulos
  con su estado, y por cada uno sus funciones (qué hace · por qué existe · cómo se
  implementa en humano · su par frontal en pantalla) — la fuente que el agente constructor
  lee para replicar el software; hoy con `MOD-DOCUMENTOS.md` escrito (22 funciones).
  **`REQ-FLUJO.md`** añade los requerimientos FL-01…FL-17: el flujo declarado traducido a
  interfaz ↔ función ↔ módulo y a estructura de código.
  **`COMUNICACION.md`** declara la costura con el frontend: estructura del backend, el
  puente (maqueta / real), el catálogo de operaciones de la espina y los eventos — con su
  puente simulado en `01-DIBUJOS/EDICION/PROPUESTAS/maqueta.js` (papel usable: paso 1,
  TABLERO).
  **`REQUISITOS-FRONT-BACK.md`** estructura la lógica de requerimientos desde los flujos
  dibujados: 26 RF de pantalla y 22 RB de fondo, con su flujo de origen, casa y estado —
  actualizada con los deltas de la ronda.
- **`AUDITORIA-FUENTES.md`** — la auditoría viva de todas las casas de verdad (método,
  estado por fuente, comandos de reverificación y plan de reparación).
- **`02-LOGICA-DE-DISENO/CHECKPOINT-LOGICA.md`** — la fotografía del sistema con sus
  huellas; si una huella difiere, la fotografía quedó vieja.
- **`04-METODO-Y-ACEPTACION/EVALUACION-PANTALLAS.md`** — el método: se defiende el valor,
  nunca la forma.
- **`04-METODO-Y-ACEPTACION/ANALISIS-PANTALLAS.md`** — qué prometía cada pantalla; la
  base contra la que se contrastan las críticas.
- **`04-METODO-Y-ACEPTACION/HALLAZGOS.md`** y **`ACUERDOS.md`** — la historia: qué ya se
  corrigió y qué ya se acordó, para no repetir ni contradecir.
- **`04-METODO-Y-ACEPTACION/ORDEN-TRABAJO-PROTOTIPOS.md`** — la orden de trabajo vigente
  sobre los prototipos (auditar, actualizar, crear los que faltan, refrescar el checkpoint).
- **`04-METODO-Y-ACEPTACION/KIT-ENTREVISTA.md`** y **`PLANTILLA-REVISION.md`** — cómo se
  recolectan los veredictos del equipo: todo dibujo termina frente a esas dos herramientas.
