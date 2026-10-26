# ORDEN DE TRABAJO — presentar todos los prototipos actualizados y optimizados según toda la lógica

> **Para una sesión nueva del agente.** Este archivo es la orden completa: qué leer, qué
> hacer, con qué reglas y con qué se da por terminado. **Objetivo final:** que las
> pantallas dibujadas (las 30 propuestas + sus 3 recorridos) queden **actualizadas y
> optimizadas contra TODA la lógica desarrollada**, con los prototipos que faltan, listas
> para la entrevista con el equipo del centro. Fecha de emisión: 2026-10-23. Emisor:
> sesión que cerró el checkpoint v1.

---

## PASO 0 · Antes de trabajar: verificar que la lógica sigue siendo la que crees

1. Lee `GUIAS/CHECKPOINT-LOGICA.md` —es el mapa completo (niveles, capas, módulos,
   estados)—.
2. **Corre la verificación de huellas** (el comando de su cabecera: `sha256sum` de la
   lista de la sección 9 y compara los primeros 12 caracteres). Si todo coincide, la
   lógica que leerás abajo es la vigente. Si algo difiere, **para y decláralo** en tu
   primera entrega: la fotografía del checkpoint quedó vieja y corresponde refrescar sus
   huellas con fecha nueva.
3. Lee el protocolo general de sesión (`AGENTS.md`) —el contrato P9 rige todas tus
   entregas al dueño: **caja de resumen de 3 líneas, un tema por párrafo, cada término
   técnico traducido con analogía, cero tablas de markdown (orden del dueño), y cierre
   con «Dónde revisar usted»**.

## PASO 1 · La lectura obligatoria, en este orden (y por qué cada una)

1. `GUIAS/EVALUACION-PANTALLAS.md` — el método: **se defiende el valor, nunca la forma**;
   ante una contradicción de un dibujo, la crítica es diagnóstico y se reestructura.
2. `GUIAS/LOGICAS/DOCTRINA-DE-DISENO.md` — los 10 pilares con sus números de aceptación:
   son la medida de todo lo que toques.
3. `GUIAS/LOGICAS/PRESENTACION-EN-PANTALLA.md` — las 10 reglas de ventana (primer vistazo
   manda, nada crítico bajo el pliegue, rollo dentro de la ventana, ventana mínima
   1024×660, texto con «…», nunca solo color, repintado corto).
4. `GUIAS/LOGICAS/SISTEMA-DE-ALERTAS.md` — los seis tipos de aviso con dueño; incluye el
   contrato de datos fundamentales (alergias, tipo de sangre, medicación, crónicas).
5. `GUIAS/FLUJOS-TRABAJO.md` — **solo las capas D, E y F** (norma); A–C son historia. De
   ahí salen las optimizaciones O1–O10: varias ya aplicadas (O1/O2/O10 en la doctrina,
   O3/O4 en alertas), **O5–O9 pendientes de dibujar o de confirmar**.
6. `GUIAS/CONTRATOS/MAPA-DE-IMPLEMENTACION.md` + los 7 contratos de
   `GUIAS/CONTRATOS/MODULOS/` — **la lógica destino**: lo que cada pantalla debe mostrar
   para ser fiel a sus módulos (estados del tablero, reglas de pausa, urgencia con
   resolución, prevención de problemas).
7. `GUIAS/KIT-ENTREVISTA.md` + `GUIAS/PLANTILLA-REVISION.md` — cómo se recolectan los
   veredictos: todo tu trabajo termina frente a esas dos herramientas.
8. `GUIAS/HALLAZGOS.md` (24 hallazgos) y `GUIAS/ACUERDOS.md` — la historia: no repitas
   errores ya corregidos ni contradigas acuerdos ya cerrados.

## PASO 2 · Los procesos que faltan (el trabajo concreto)

**Tarea A · Auditoría de las 30 páginas contra la lógica.** Recorre cada página de
`GUIAS/EDICION/PROPUESTAS/` con esta lista (una página por pasada): ¿cumple la regla del
primer vistazo y la de nada crítico bajo el pliegue? ¿usa la cinta de identidad con sus
contextos donde la lógica la exige? ¿todo color va acompañado de palabra? ¿los estados
del tablero coinciden con el contrato TABLERO? ¿los avisos muestran acción y dueño? ¿hay
alguna frase que contradiga un acuerdo o una crítica previa del dueño (revisa el buzón)?
Cada defecto encontrado: **corrígelo en el dibujo** (papel, gratis) y **regístralo** en
`GUIAS/HALLAZGOS.md` con el formato de 8 columnas (el contador va solo; hoy hay 24,
siguiente número H-025). Si el defecto es de fondo (no de dibujo), regístralo y propón en
tu entrega, sin ejecutar la decisión.

**Tarea B · Actualizar el Tablero a la norma nueva.** La página `TABLERO.html` fue
dibujada antes de la autocrítica final; ahora debe mostrar: columna o chip de
**«no llegó»** (cita pasada sin aparecer, con acción de reagendar), chip de
**«estación a mitad»** (pausa del carril de enfermería), chip de **«equipo fuera»**
(la médica en sala), el **dueño** de cada tarjeta por rol (quién cuida llegadas,
quién atiende), y la mención del **traspaso/cierre de día** (O5). Sin tope rígido de
atenciones (ya se retiró —verifica que no haya reaparecido en ninguna página—).

**Tarea C · Actualizar las demás páginas con lo aplicado desde su dibujo.** Como
mínimo: `PAUSA.html` (regla de doble mano del contrato ATENCIONES: «en uso de X») ·
`ALERTAS.html` (meta de fatiga visible: menos de 2 avisos por visita) ·
`EMERGENCIA.html` y `CONTROL.html` (verifica cinta y contextos completos según el
contrato IDENTIDAD-CONTEXTO) · `PROTOCOLOS.html` (que sus pasos digan lo que dice el
contrato PROTOCOLOS: vencido que genera aviso, cierre con motivo).

**Tarea D · Crear los prototipos que faltan** (páginas nuevas en la misma carpeta, con
el mismo `estilo.css`, con banda de pregunta y veredicto):
1. **`CIERRE.html` — el cierre de día y el traspaso** (O5): pantalla con lo que queda
   (atendidas, no llegadas, plazos vencidos, fichas de emergencia sin completar, aviso
   de respaldo de la tarde) con botón «imprimir traspaso» y su banda de pregunta
   («¿así entrega su turno la mañana a la tarde?»).
2. **`LABORATORIO.html` — captura de laboratorio recibido en papel** (O8): tres datos
   en treinta segundos que alimentan el semáforo, con la bandera de «escrito tardío»
   honesto.
3. **`FALLA.html` — cómo se ve una falla** (degradación): los mensajes humanos de los
   seis guiones (luz, equipo, disco, red, imagen, cierre forzado) tal como los vería la
   persona, con el puente de papel y el «último guardado a las HH:MM».
Cada una nueva lleva su banda de «PREGUNTA PARA EL EQUIPO» y su casilla de veredicto.

**Tarea E · Reconstruir los recorridos y el índice.** `RUTAS/ENFERMERA.html` debe
incluir las paradas nuevas (laboratorio, cierre/traspaso); `RUTAS/MEDICA.html` y
`RUTAS/DUENO.html` si conviene (cierre para el dueño); `INDICE.html` suma las páginas
nuevas a sus grupos. Mantén la frase clave: la forma de presentar 30+ páginas es
presentar la jornada.

**Tarea F · Refrescar el checkpoint.** Al terminar, recalcula las huellas de la sección 9
de `GUIAS/CHECKPOINT-LOGICA.md`, actualízalas con la fecha nueva y sube su versión en la
cabecera (v1.1). No reescribas las definiciones (es fotografía, no ensayo): solo la
vigencia. Si además quieres crear etiqueta de git nueva (`checkpoint-logica-v1.1`),
créala al cerrar el commit.

## PASO 3 · Reglas duras de esta orden

1. **Cero cambios en `nucleo.py` y `app.py`** — todo es papel hasta que el equipo dé
   veredictos y usted ratifique.
2. **Cero tablas de markdown** en cualquier cosa dirigida al dueño (su orden H-005).
3. **Formato P9 en cada entrega**: caja de resumen, lenguaje llano con analogías,
   «Dónde revisar usted», autochequeo.
4. **Toda suposición no trivial se etiqueta `[SUPUESTO N]` y espera confirmación**
   antes de ejecutarse (si es construcción de dibujo nuevo dentro de esta orden, avisa
   pero continúa; si es decisión de fondo, espera).
5. **Hallazgos al buzón en el mismo turno** (registro primero, reparación después) —
   incluidos los tuyos.
6. **Los contratos están en EXPLORACIÓN**: si al dibujar descubres que un contrato se
   equivoca, corrígelo con fecha en su bitácora y regístralo —es su libertad—; si la
   corrección cambia un **pilar o la ley**, no la ejecutes: escala con propuesta.
7. **Commit por bloque** con mensaje que nombre lo que hizo (Tarea A, Tarea B…), y
   verificación final: `python3 -m unittest pruebas.test_guias_dueno pruebas.test_hallazgos pruebas.test_lenguaje_dueno`
   en verde antes de cada commit.

## PASO 4 · Definición de terminado (cuándo dar la orden por cumplida)

- Las 30 páginas auditadas contra la lista de la Tarea A, con sus correcciones aplicadas
  y sus hallazgos numerados.
- El Tablero (y las demás de la Tarea C) mostrando la norma nueva completa.
- Las 3 páginas nuevas creadas (`CIERRE`, `LABORATORIO`, `FALLA`).
- Recorridos e índice actualizados con todo lo anterior.
- Checkpoint con huellas refrescadas (v1.1) y su etiqueta de git.
- Todo commiteado, pruebas verdes, y **una sola entrega final al dueño en formato P9**
  que termine con: dónde revisar cada cosa, qué minutos le pide (la entrevista con el
  kit), y la lista de lo que quedó esperando su veredicto o su decisión.

**Primera frase que debe decirle al dueño cuando arranque la sesión** (para que él
sepa que la orden se entendió): «Arranco la orden de `GUIAS/ORDEN-TRABAJO-PROTOTIPOS.md`:
primero verifico las huellas del checkpoint, y le entrego el plan en 3 líneas antes de
tocar un dibujo.»
