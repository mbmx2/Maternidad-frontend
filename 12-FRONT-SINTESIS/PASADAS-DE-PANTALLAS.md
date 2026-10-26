# PASADAS DE PANTALLAS — el registro de cada pantalla que pasa a `verificado`

> Una línea por pantalla, con su fecha, los patrones del estándar que absorbió, sus
> pruebas y su evidencia. Este archivo es lo que el registro cita; si una pantalla
> retrocede, aquí queda la nota. (Formato de ancla: cada pantalla es una sección `§<nombre>`.)

## §hoy — verificada el 2026-10-26 (Tramo B, primera del tramo)

- **Qué absorbió:** ML-05 (la vista del día se deduce de hechos, no se pinta) ·
  ML-09 (la métrica informa y no bloquea) · ML-12 (fecha y reloj reales) ·
  MT-01 (el tablero ya no toca el estado: su mutación directa se cerró con
  `alternarEquipo`) · MT-06 (relojes con umbrales 30/45 y color con palabra) ·
  MT-11 (sin `prompt`/`alert`) · MG-09 (banda de veredicto persistente).
- **Pruebas:** la de las 18 pantallas (estructura: riel, banda, h1 único, cero errores) ·
  su ruptura propia (`pruebas-ruptura-hoy.js`: el equipo sale y vuelve con evento,
  las columnas se calculan, el resumen cuenta la urgencia al frente, el veredicto se
  guarda) · la del libro (huella, sello, conteos) · la del motor.
- **Cierre:** mutación directa eliminada (hallazgo G-02) · huella actualizada ·
  fila del registro en `verificado` con conteos reales.

## §CUMPLIMIENTO — verificada el 2026-10-26 (DoD completo: núcleo + «además»)

- **Criterio específico:** cada requisito con su pantalla y estado honesto
- **Pruebas:** las 18 pantallas (estructura) + `pruebas-do-pantallas.js` (núcleo estático sin mutaciones ni restos + criterios de motor de esta pantalla).
- **Cierre:** cero mutación directa en su script · sello V4·S1 · huella al día · fila en `verificado` con conteos reales.

## §HOJA-DE-VEREDICTO — verificada el 2026-10-26 (DoD completo: núcleo + «además»)

- **Criterio específico:** imprimible de una página, con banda persistente y
- **Pruebas:** las 18 pantallas (estructura) + `pruebas-do-pantallas.js` (núcleo estático sin mutaciones ni restos + criterios de motor de esta pantalla).
- **Cierre:** cero mutación directa en su script · sello V4·S1 · huella al día · fila en `verificado` con conteos reales.

## §agenda — rehecha desde cero el 2026-10-26 (primera pantalla del DoD v2)

- **Por qué:** tu rechazo + los criterios nuevos: calendarios, lenguaje útil, agenda con
  el módulo completo de mensajes integrado, y acople contra las operaciones del enchufe.
- **Qué trae nueva:** pestaña **Calendario** con el mes pintado (clic en un día = sus
  citas; hoy con borde y hora en grande), citas de la jornada y de la agenda de mensajes
  **juntas y etiquetadas** por origen; mensajes de continuidad con lenguaje claro
  («ESCALADO — venía ayer y nadie lo entregó: resuélvalo hoy» en vez del lema viejo);
  controles sin cita con 1 clic; y las seis pestañas del módulo de mensajes completo
  (citas con sugerencia y fuente, disponibilidad con huecos que **juntan las dos fuentes**,
  92 plantillas con buscador/vista previa/copiar-editar/guardar-propia, semanas 1–40,
  mis plantillas, bitácora de entregas con dedupe y examen de inocuidad en vivo).
- **Acople:** `crearCita` · `entregarRecordatorio` · `anularRecordatorio` (motor) +
  `agendar`/`reprogramar`/`cancelar`/`entregar`/`plantillas` (copia canónica de mensajes).
- **Pruebas:** las 18 pantallas (estructura) · `pruebas-do-pantallas.js` (7 checks nuevos:
  pestañas, calendario, copia enlazada, lema viejo ausente, frases de la lista ausentes,
  batería ≥90, 40 semanas) · flujo de agenda en el e2e (6 checks: pestañas, celdas,
  citas de hoy, listado completo, huecos de doble fuente, agendar visible en el calendario).
- **Cierre:** huella actualizada · copia canónica `mensajes.js` con guardia de deriva en
  `autoauditoria.sh` (probada con fuego) · fila del registro con conteos vivos ·
  DoD v2: D-2a/D-2c/D-2d cumplidos; D-2b cumplido para esta pantalla (ninguna de tus 25
  frases vive en ella — ver `FRASES-A-TRADUCIR.md`).

## §atenciones — verificada el 2026-10-26 (DoD completo: núcleo + «además»)

- **Criterio específico:** dueño y «en uso» visibles; toma por emergencia con
- **Pruebas:** las 18 pantallas (estructura) + `pruebas-do-pantallas.js` (núcleo estático sin mutaciones ni restos + criterios de motor de esta pantalla).
- **Cierre:** cero mutación directa en su script · sello V4·S1 · huella al día · fila en `verificado` con conteos reales.

## §calculadoras — verificada el 2026-10-26 (DoD completo: núcleo + «además»)

- **Criterio específico:** las 18 con sus entradas del catálogo; prefill con origen
- **Pruebas:** las 18 pantallas (estructura) + `pruebas-do-pantallas.js` (núcleo estático sin mutaciones ni restos + criterios de motor de esta pantalla).
- **Cierre:** cero mutación directa en su script · sello V4·S1 · huella al día · fila en `verificado` con conteos reales.

## §cierre — verificada el 2026-10-26 (DoD completo: núcleo + «además»)

- **Criterio específico:** traspaso imprimible con referidas separadas de atendidas,
- **Pruebas:** las 18 pantallas (estructura) + `pruebas-do-pantallas.js` (núcleo estático sin mutaciones ni restos + criterios de motor de esta pantalla).
- **Cierre:** cero mutación directa en su script · sello V4·S1 · huella al día · fila en `verificado` con conteos reales.

## §consulta — verificada el 2026-10-26 (DoD completo: núcleo + «además»)

- **Criterio específico:** nota firmada con nombre y cédula; cierre de avisos anclado a
- **Pruebas:** las 18 pantallas (estructura) + `pruebas-do-pantallas.js` (núcleo estático sin mutaciones ni restos + criterios de motor de esta pantalla).
- **Cierre:** cero mutación directa en su script · sello V4·S1 · huella al día · fila en `verificado` con conteos reales.

## §documentos — verificada el 2026-10-26 (DoD completo: núcleo + «además»)

- **Criterio específico:** la plantilla se llena con lo que ya existe (cero captura
- **Pruebas:** las 18 pantallas (estructura) + `pruebas-do-pantallas.js` (núcleo estático sin mutaciones ni restos + criterios de motor de esta pantalla).
- **Cierre:** cero mutación directa en su script · sello V4·S1 · huella al día · fila en `verificado` con conteos reales.

## §estacion — verificada el 2026-10-26 (DoD completo: núcleo + «además»)

- **Criterio específico:** pausa y retorno conservan los campos uno por uno
- **Pruebas:** las 18 pantallas (estructura) + `pruebas-do-pantallas.js` (núcleo estático sin mutaciones ni restos + criterios de motor de esta pantalla).
- **Cierre:** cero mutación directa en su script · sello V4·S1 · huella al día · fila en `verificado` con conteos reales.

## §falla — verificada el 2026-10-26 (DoD completo: núcleo + «además»)

- **Criterio específico:** seis guiones en humano de degradación; el ensayo del respaldo
- **Pruebas:** las 18 pantallas (estructura) + `pruebas-do-pantallas.js` (núcleo estático sin mutaciones ni restos + criterios de motor de esta pantalla).
- **Cierre:** cero mutación directa en su script · sello V4·S1 · huella al día · fila en `verificado` con conteos reales.

## §ficha — verificada el 2026-10-26 (DoD completo: núcleo + «además»)

- **Criterio específico:** los datos que salvan viajan en la cinta de todas las pantallas;
- **Pruebas:** las 18 pantallas (estructura) + `pruebas-do-pantallas.js` (núcleo estático sin mutaciones ni restos + criterios de motor de esta pantalla).
- **Cierre:** cero mutación directa en su script · sello V4·S1 · huella al día · fila en `verificado` con conteos reales.

## §historia — verificada el 2026-10-26 (DoD completo: núcleo + «además»)

- **Criterio específico:** la nota es inmutable con autor y cédula; editar crea versión
- **Pruebas:** las 18 pantallas (estructura) + `pruebas-do-pantallas.js` (núcleo estático sin mutaciones ni restos + criterios de motor de esta pantalla).
- **Cierre:** cero mutación directa en su script · sello V4·S1 · huella al día · fila en `verificado` con conteos reales.

## §laboratorio — verificada el 2026-10-26 (DoD completo: núcleo + «además»)

- **Criterio específico:** banda con semáforo; lo que llegó tarde se marca honesto;
- **Pruebas:** las 18 pantallas (estructura) + `pruebas-do-pantallas.js` (núcleo estático sin mutaciones ni restos + criterios de motor de esta pantalla).
- **Cierre:** cero mutación directa en su script · sello V4·S1 · huella al día · fila en `verificado` con conteos reales.

## §llegada — verificada el 2026-10-26 (DoD completo: núcleo + «además»)

- **Criterio específico:** homónimas preguntan antes de unir y nunca fusionan solas;
- **Pruebas:** las 18 pantallas (estructura) + `pruebas-do-pantallas.js` (núcleo estático sin mutaciones ni restos + criterios de motor de esta pantalla).
- **Cierre:** cero mutación directa en su script · sello V4·S1 · huella al día · fila en `verificado` con conteos reales.

## §pendientes — verificada el 2026-10-26 (DoD completo: núcleo + «además»)

- **Criterio específico:** cerrar exige nombre y cédula (o ancla a nota firmada);
- **Pruebas:** las 18 pantallas (estructura) + `pruebas-do-pantallas.js` (núcleo estático sin mutaciones ni restos + criterios de motor de esta pantalla).
- **Cierre:** cero mutación directa en su script · sello V4·S1 · huella al día · fila en `verificado` con conteos reales.

## §sistema — verificada el 2026-10-26 (DoD completo: núcleo + «además»)

- **Criterio específico:** roles y catálogos con su estado de firma; cuentas de bitácora
- **Pruebas:** las 18 pantallas (estructura) + `pruebas-do-pantallas.js` (núcleo estático sin mutaciones ni restos + criterios de motor de esta pantalla).
- **Cierre:** cero mutación directa en su script · sello V4·S1 · huella al día · fila en `verificado` con conteos reales.

## §urgencia — verificada el 2026-10-26 (DoD completo: núcleo + «además»)

- **Criterio específico:** las tres salidas (atendida, referida, motivo) firmadas;
- **Pruebas:** las 18 pantallas (estructura) + `pruebas-do-pantallas.js` (núcleo estático sin mutaciones ni restos + criterios de motor de esta pantalla).
- **Cierre:** cero mutación directa en su script · sello V4·S1 · huella al día · fila en `verificado` con conteos reales.
