# CONTRATO · ATENCIONES CONCURRENTES — órgano 2

> **Estado: EXPLORACIÓN** (v1 · 2026-10-23). No es ley; cambia gratis. Fuentes: doctrina
> pilar 2, dibujo `PROPUESTAS/PAUSA.html`, escenario de 18 pacientes con 3–4 simultáneas.

## 1 · Qué garantiza

- **Varias consultas abiertas a la vez, sin que ninguna se pise:** cada atención tiene
  su copia de trabajo aislada.
- **Pausa y retorno exactos:** lo que se dejó a medio escribir vuelve campo por campo.
- **Cambio seguro:** de paciente se cambia solo desde el tablero, nunca por tecleo
  accidental dentro de un formulario.
- **Cero pérdida bajo interrupción:** cerrar, cambiar o apagar a mitad de una atención
  no pierde lo ya guardado ni mezcla lo no guardado con otra paciente.
- **Sin tope rígido:** el sistema admite las que el equipo abra; cuántas aguanta la
  práctica es dato de la entrevista, no constante del software.

## 2 · Lógica total

**Modelo:** una atención = (paciente, copia de campos de la pantalla, pantalla donde
estaba, color, abierta por quién, abierta a qué hora, última modificación). La clave de
toda copia es **(atención, paciente)** — jamás solo la pantalla: ése es el candado que
hace imposible escribir en la ficha equivocada por mezcla de contextos.

**Estados:** `abierta` ⇄ `pausada`; terminal: `atendida` (se cierra y libera su color) ·
`abandonada` (cierre con motivo, con confirmación que nombra qué se descarta).

**Transiciones:** abrir (solo desde la tarjeta del tablero o desde la ficha) · pausar
(cualquier momento, incluido a mitad de tecleo) · retomar (restaura pantalla, campos y
scroll) · escribir (solo la atención en primer plano responde; las demás, en pausa,
ignoran el teclado — por diseño) · cerrar (acción de la atención, con su resultado).

**Regla de doble mano (dos personas sobre la misma atención):** la atención lleva dueño
—quien la abrió—; si otra persona intenta escribir en ella desde su estación, el sistema
muestra «en uso de X desde las HH:MM» y no admite la escritura concurrente (no hay dos
manos en un mismo borrador; la espera es visible, no un bloqueo mudo). La urgencia puede
**robársela** —la prioridad manda— y al hacerlo queda registrado quién la tomó.

**Campos:** las copias solo contienen lo no guardado; cada «guardar» de una atención
escribe al expediente con su paciente correcto (por la clave) y limpia esa copia.

**Invariantes:** (i) cero campos perdidos en diez alternancias; (ii) ninguna pantalla de
escritura ofrece cambio de paciente fuera del tablero; (iii) toda escritura al
expediente lleva la identidad de la copia que la originó; (iv) al cerrar atención, su
copia queda vacía — no hay borradores fantasma consumiendo memoria.

**Casos borde:** emergencia que toma una atención en uso (regla de robo con registro) ·
retomar dos a la vez desde dos estaciones (imposible: cada estación con su primer
plano) · abrir una cuarta mientras tres siguen (admitida; si el equipo abre muchas, el
tablero lo muestra —la señal es informativa, no bloqueante) · paciente que fallece o se
deriva (cierre con motivo → `abandonada` con nota) · apagón con cuatro abiertas (las
copias no guardadas se pierden: eso es papel —el puente—; lo guardado, íntegro).

**Errores:** copia que al retomar no coincide con su paciente (imposible por clave +
prueba); doble retomar (idempotente); cierre sin guardar (diálogo que nombra qué se
pierde y ofrece guardar primero).

## 3 · Por qué esta lógica

Descartado: memoria única del sistema («la paciente actual») —ése fue mi error original
de flujo (autocrítica): con 3–4 simultáneas, un solo hilo pierde gente y cruce fichas.
Descartado: cambio de paciente dentro del formulario (receta de error en consulta
concurrida). Descartado: tope de 4 (número inventado, retirado del dibujo). La regla de
doble mano nace de la duda que usted planteó: enfermera y médica tocando la misma
atención a la vez (error 12 de los 25).

## 4 · Cómo se implementa

**Estado:** memoria de atención en el estado de la aplicación (no en disco —son borradores
efímeros—), con su clave (atención, paciente). **Símbolos nacituras:**
`gestionar_atencion` (abrir/pausar/retomar/cerrar), `copia_atencion` (campos por clave),
`dueno_atencion`. **Presentación:** banda de atenciones abiertas con colores (dibujo
PAUSA) + el tablero como entrada. **En el expediente:** solo los guardados, con
identidad verificada (sección de cinta).

## 5 · Cuadre: promesa ↔ prueba

Números: cero campos perdidos en 10 alternancias · escritura concurrente rechazada con
aviso nombrado · copias vacías tras cerrar. **Pruebas al construir:**
`test_atencion_alternancia` (4 abiertas, 10 idas y vueltas, campo por campo) ·
`test_atencion_clave` (la escritura va siempre a su paciente) ·
`test_atencion_dueno` (doble mano rechazada con mensaje) ·
`test_atencion_robo_urgente` (el robo queda en bitácora).

## 6 · Prevención de problemas (posibles e improbables)

- **Pérdida de lo no guardado al pausar** — respuesta: la pausa conserva la copia en
  memoria; si el equipo se apaga, lo no guardado se pierde **y eso se dice**: el flujo
  de lápiz y papel (puente) cubre ese tramo; el sistema nunca finge conservar lo que no
  guardó.
- **Escritura en paciente equivocado** — respuesta: clave compuesta (i), cinta visible
  (iii), cambio solo por tablero (ii); tres defensas para un error caro.
- **La atención que nadie cierra** (abierta toda la mañana) — respuesta: el tablero
  muestra sus minutos abiertos como informativo; al cierre de día, el invariante de
  traspaso la lista con dueño.
- **Memoria inflada con muchas copias** — respuesta: invariante (iv) + cada copia pesa
  solo campos de texto (kilobytes); 10 abiertas no son carga.
- **Confusión de colores con daltonismo** — respuesta: color + nombre de dueño + etiqueta
  de estado en palabra (nunca solo color).
- **Robo de atención sin registro** — respuesta: queda en bitácora con quién y cuándo
  (ya es norma: todo cambio con rastro).
- **Retomar y encontrar otra paciente** — imposible: la copia lleva su paciente en la
  clave; prueba que lo verifica.
- **Emergencia con cuatro abiertas** — respuesta: la urgencia se abre al frente y su
  atención anterior queda pausada automáticamente con el resto del tablero; nadie pierde
  nada.
- **El sistema aguanta en un equipo viejo** — respuesta: las copias son baratas; la
  métrica de rendimiento (10 alternancias) se mide también en el equipo real de
  recepción, no solo en el del desarrollo.

## 7 · Estado y bitácora

**EXPLORACIÓN** · v1 2026-10-23 — primera tanda de contratos. Pendiente: veredicto del
equipo en el dibujo PAUSA (la regla de doble mano es la más sensible a su realidad —
cómo trabajan hoy a dos manos sobre un mismo caso), y su decisión sobre el robo de
atención por urgencia.
