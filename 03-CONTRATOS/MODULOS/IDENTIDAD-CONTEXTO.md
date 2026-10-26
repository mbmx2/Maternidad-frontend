# CONTRATO · IDENTIDAD Y CONTEXTO (la cinta) — el módulo que sostiene a todos

> **Estado: EXPLORACIÓN** (v1 · 2026-10-23). No es ley; cambia gratis. Fuentes: doctrina
> pilar 3 (cinta) y pilar 10 (contextos), contrato de datos fundamentales en
> `SISTEMA-DE-ALERTAS.md`, dibujos CONSULTA, CONTROL y FICHA.

## 1 · Qué garantiza

- **En toda pantalla donde se escribe o se decide, está quién es:** nombre completo,
  fecha de nacimiento y —si hay riesgo— el aviso de homónima, en la cinta, arriba de
  todo.
- **El color acompaña:** cada atención abierta tiene su color y ese color es el mismo
  en el tablero, en la cinta y en el botón de guardar.
- **Los datos que salvan viajan siempre:** alergias, tipo de sangre, medicación actual
  y condiciones crónicas, presentes como contexto permanente.
- **Los fundamentales tienen reglas de llenado:** obligatorios con su «no lo sé»
  permitido; el hueco nunca se lee como «no aplica».
- **La identidad está dentro del acto de guardar:** el botón nombra a la paciente; la
  escritura lleva la clave de su atención.

## 2 · Lógica total

**Composición de la cinta:** paciente (apellidos, nombres, fecha, expediente) +
protocolo activo si lo hay (o «sin seguimiento activo») + color de la atención +
contextos (alergia · sangre · medicación · crónica) + homónima si la hay. Nunca
información diagnóstica larga en la cinta: es un brazalete, no una ficha.

**Detección de homónima:** la misma lógica que hoy advierte parecidas en registro,
ahora también en escritura: si dos pacientes de la base son parecidas y **ambas tienen
actividad reciente**, el aviso acompaña ambas cintas (el aviso correcto en el lugar
donde se equivoca uno).

**Campos fundamentales (regla por campo —el contrato completo vive en el sistema de
alertas):** alergias: obligatorio con respuesta explícita de «sin alergias conocidas»
· tipo de sangre: obligatorio si se conoce, con «sin dato» que genera pedido en el
próximo control · medicación: se actualiza en cada atención que la modifica ·
crónicas: obligatorias si el personal las conoce · cada campo: su pantalla de edición
(ficha), su dueño, su presencia en cinta.

**Regla de guardado:** toda escritura al expediente lleva (paciente, atención si la
hay, quién, cuándo); el nombre dentro del botón es la lectura obligatoria previa.

**Invariantes:** (i) pantalla de escritura sin cinta = defecto (ratchet: examen) — con una **excepción declarada**: la pantalla que *crea* a la paciente (registro de emergencia) no tiene cinta, porque aún no existe; su identidad mínima es nombre y fecha, y la cinta completa nace con la ficha (hallazgo L-02, 2026-10-23) ·
(ii) contexto en el 100 % de escrituras (número de la doctrina) · (iii) homónimas con
actividad ⇒ aviso en ambas cintas · (iv) el color es idéntico en tablero, cinta y
botón (un color, un paciente) · (v) ningún fundamental se guarda sin pantalla que lo
edite, ni se pide dos veces.

**Casos borde:** nombre muy largo (corte con «…» y completo al cursor —contrato de
presentación) · homónimas idénticas (la fecha de nacimiento nunca se recorta: es la
diferencia) · paciente edita sus fundamentales mientras otra atención está abierta (la
cinta se refresca para todas: es dato vivo del expediente, no copia de la atención) ·
paciente sin ningún fundamental (chip «sin tipo de sangre» que pide dato, sin regaño) ·
atención pausada de una paciente cuyos datos cambiaron al retomar (la copia de la
atención solo guarda lo no guardado: los fundamentales se leen del expediente al
retomar) · emergencia sin ficha completa (la cinta muestra «falta completar» con el
folio — la identidad mínima ya está: nombre y fecha).

**Errores:** escritura con cinta ausente (invariante (i), imposible por construcción:
la pantalla de escritura se compone de la cinta + su cuerpo) · aviso de homónima que no
aparece (prueba con dos parecidas activas) · contexto desactualizado en la cinta
(lectura del expediente al pintar, no caché de la sesión).

## 3 · Por qué esta lógica

Descartado: identidad solo en la cabecera de la ficha (a mitad de un control de otra
paciente ya no se mira). Descartado: confirmación de paciente solo al guardar (se
mira tarde; la cinta es prevención, no inspección). Descartado: los fundamentales solo
en la ficha (el colchón debe estar donde se escribe, no donde se consulta). Descartado:
color sin palabra (daltonismo, reflejo, prisa — su contrato de presentación lo prohíbe).

## 4 · Cómo se implementa

**Ya existe (se refuerza):** detección de parecidas · tarjeta prioritaria · banda de
alergias y medicación · colores por atención (en este módulo se unifican). **Símbolos
nacituros:** `componer_cinta`, `contextos_de`, `alerta_homonima_en_escritura`,
`color_de_atencion`. **Presentación:** componente único de cinta, reutilizado por toda
pantalla de escritura (Control, Historia, Notas, prescripción, autohistoria futura).

## 5 · Cuadre: promesa ↔ prueba

Números: 100 % de escrituras con cinta · homónimas con aviso visible en ambas · color
único por paciente · fundamentales con su obligación y «no lo sé». **Pruebas:**
`test_cinta_en_toda_escritura` (rasteriza el catálogo de pantallas de escritura: si
falta la cinta ⇒ rojo), `test_homonimas_activas_avisan`, `test_contextos_presentes`,
`test_color_unificado`, `test_fundamentales_obligacion` (con sus «no lo sé»).

## 6 · Prevención de problemas (posibles e improbables)

- **Escribir en la ficha equivocada** — respuesta: tres defensas encadenadas (cinta a
  la vista, cambio solo por tablero, clave de atención en el guardado) —ninguna depende
  de la otra.
- **Cinta que se vuelve ruido** (ya nadie la mira) — respuesta: tamaño y posición con
  precedencia (nada crítico bajo el pliegue), color propio, y el nombre dentro del
  botón como última lectura obligatoria.
- **Homónima que no se advierte porque una no tiene actividad** — respuesta: el aviso
  se activa con actividad reciente de ambas (si solo una vive en el sistema, no hay
  riesgo de confusión activa); con dos activas, siempre.
- **Contexto largo que hincha la cinta** — respuesta: la cinta lleva etiquetas cortas
  con el detalle al cursor; el detalle completo vive en la tarjeta de consulta.
- **Alergia que se edita mal** (tachón sin confirmar) — respuesta: edición de
  fundamentales con confirmación que muestra el antes/después (su regla: confirmar
  cuando lo destructivo; borrar una alergia es destructivo).
- **La paciente con 6 alergias** — respuesta: la cinta muestra «6 alergias» con
  clic a la lista; no se imprime todo en la banda.
- **Tipo de sangre inventado por prisa** — respuesta: opciones de lista + «sin dato»;
  no hay campo libre donde se pueda escribir cualquier cosa.
- **Cinta que no refleja un cambio hecho en otra pantalla** — respuesta: lectura del
  expediente al pintar; refresco en toda transacción que toque fundamentales.
- **Privacidad: la cinta en una pantalla compartida o proyectada** — respuesta: la
  cinta es de uso interno con la paciente presente; el caso de pantalla pública no
  existe declarado (y si llega, se diseña un modo acortado —ya está en la prevención
  del tablero).
- **Componer la cinta cuesta tiempo y traba la pantalla** — respuesta: es lectura de
  pocos campos ya cacheados por expediente; el número de repintado (<0,1 s) lo cubre.

## 7 · Estado y bitácora

**EXPLORACIÓN** · v1 2026-10-23 — primera tanda. **v1.1** 2026-10-23 — excepción de cinta en la pantalla que crea pacientes (hallazgo L-02, contraste del diseño). Pendiente: con el equipo, si los
contextos de la cinta están completos (¿falta algo que ellos siempre necesiten ver:
grupo Rh especial, vacunas, seguros?) —su entrevista añade o quita líneas de esta
lista.
