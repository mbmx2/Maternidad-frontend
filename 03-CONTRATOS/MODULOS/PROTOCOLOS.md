# CONTRATO · MOTOR DE PROTOCOLOS — órgano 4 (el mayor: dominio clínico puro)

> **Estado: EXPLORACIÓN** (v1 · 2026-10-23). No es ley; cambia gratis. Fuentes: doctrina
> pilar 4, declaración clínica del dueño (H-014), dibujo `PROPUESTAS/PROTOCOLOS.html`.

## 1 · Qué garantiza

- **Una paciente puede llevar varios protocolos a la vez**, cada uno con su calendario,
  sin que uno tape al otro.
- **El embarazo es un protocolo entre varios**, no la naturaleza del software —la
  paciente que no está embarazada tiene dónde vivir su seguimiento.
- **Cada paso de cada protocolo tiene fecha, estado y, al vencer, su aviso con dueño** —
  el calendario no es decoración: es la máquina de los plazos del sistema de alertas.
- **Cerrar un protocolo es un hecho clínico registrado** (parto, alta, cambio de
  diagnóstico), no un borrado.

## 2 · Lógica total

**Modelo:** protocolo = **tipo** (catálogo firmado: ITS, embarazo, tumoración,
fertilidad, puerperio, planificación…) + **activación** en una paciente (fecha, motivo) +
**pasos** (relativos a hitos: día/semana del protocolo o fecha fija) + **estados por
paso**: `pendiente` → `hecho` (con fecha y quién) | `vencido` (sin hecha ⇒ aviso) |
`anulado` (con motivo). Datos propios por tipo: embarazo lleva FUM y semana; infección
lleva su fármaco y duración; fertilidad, su día de ciclo. **Las reglas de cada tipo son
catálogo firmado —el software ejecuta el calendario, no inventa la medicina.**

**Reglas de convivencia:** dos protocolos con paso el mismo día ⇒ dos pendientes
independientes (nunca se fusionan: son decisiones distintas); los pasos de un protocolo
no bloquean los del otro; el semáforo y la ficha muestran **todos** los protocolos
activos con su próximo paso.

**Transiciones:** activar (con motivo) · marcar paso hecho (queda con autor y hora) ·
cerrar protocolo (resultado: alta, parto, cambio de diagnóstico —con motivo—) ·
desactivar sin cerrar (paciente que se va: queda con fecha de interrupción).

**Invariantes:** (i) toda paciente con seguimiento tiene ≥0 protocolos activos y su
próximo paso visible en la portada; (ii) un paso vencido **siempre** genera (o ya
generó) su aviso — jamás hay un vencido silencioso; (iii) el mismo paso no genera dos
pendientes iguales (deduplicación por (paciente, paso, fecha), no por texto); (iv) el
protocolo cerrado no se reabre: un nuevo episodio es un protocolo nuevo (historia
intacta); (v) FUM y semana solo existen dentro del protocolo de embarazo (si no hay
embarazo, ese dato no existe en el expediente —la pregunta de la pantalla C-09 se
resuelve así—).

**Casos borde:** duelo obstétrico (cerrar embarazo con resultado de pérdida + ofrecer
protocolo de revisión, si el catálogo lo trae) · parto (cierra embarazo y activa
puerperio en la misma transacción) · embarazo nuevo tras otro (episodios separados) ·
cambio de diagnóstico a mitad (cierre con motivo + activación del nuevo: dos en la
bitácora, nunca reescritura) · protocolo con pasos sin fecha definida por el catálogo
(rechazo al firmar: un catálogo incompleto no se activa) · la urgente que interrumpe
(un vencido no se pierde: sigue vencido, ahora en el tablero).

**Errores:** paso marcado hecho sin fecha (imposible: la transacción lo pone) ·
catálogo borrador usado como vigente (su disciplina: solo lo firmado decide —
y mientras tanto, el sistema dice «protocolos sin firmar», nunca inventa) · doble
marcado del mismo paso (idempotente).

## 3 · Por qué esta lógica

Descartado: pantallas por embarazo como estructura (fue el nacimiento embarazo-céntrico
que usted corrigió —H-014—). Descartado: un solo protocolo por paciente (imposible con
la realidad de su centro). Descartado: calendarios escritos en el código (rompería el
principio de que el contenido clínico lo firma el médico). Descartado: fusionar pasos
del mismo día (borraría la diferencia clínica entre dos decisiones).

## 4 · Cómo se implementa

**Símbolos nacituras:** `activar_protocolo`, `pasos_de`, `marcar_paso`,
`cerrar_protocolo`, `protocolos_vigentes` (para la portada y la cinta) — en la capa de
dominio del programa, con sus datos en los catálogos firmados (junto a rangos y tipos de
nota). **Presentación:** sección de seguimiento de la ficha y la pantalla de protocolos
(dibujo PROTOCOLOS); los vencidos alimentan la agenda y el tablero.

## 5 · Cuadre: promesa ↔ prueba

Números: dos protocolos juntos sin pisarse (embarazo 20 sem + infección, con sus dos
calendarios completos) · 0 vencidos silenciosos · 0 dobles pendientes · FUM solo con
embarazo activo. **Pruebas al construir:** `test_protocolos_multiples`,
`test_pasos_vencidos_generan_aviso` (invariante ii), `test_cierre_con_motivo`,
`test_fum_solo_en_embarazo`, `test_catalogo_borrador_no_decide`.

## 6 · Prevención de problemas (posibles e improbables)

- **La paciente no embarazada sin donde vivir** — respuesta: el motor es por tipo, no
  por embarazo; la lista de tipos la da su centro (pendiente de la entrevista: su
  catálogo de casos).
- **Vencido que nadie ve** — respuesta: invariante (ii) con prueba; el vencido además
  sube al tablero (chip ámbar) y tiene dueño por tipo de paso.
- **Dos protocolos peleando por la misma cita** — respuesta: pasos independientes; si
  su equipo prefiere coordinarlos («hoy tocan las dos cosas»), eso es agrupar
  pendientes en la agenda, no fusionar protocolos.
- **Catálogo mal escrito** (paso sin fecha) — respuesta: rechazo al firmar; el que
  firma es responsable del calendario.
- **Protocolo que se vuelve jaula** (la paciente mejora y el calendario sigue) —
  respuesta: cierre con motivo siempre disponible, y desactivación con fecha.
- **Historia borrada por reactivación** — respuesta: invariante (iv): nunca se
  reabre; se crea otro.
- **Semáforo mostrando datos de un protocolo cerrado** — respuesta: los cálculos
  leen solo protocolos vigentes; los cerrados quedan en historia.
- **Dato clínico del catálogo en el código** — respuesta: ratchet existente de cero
  literales clínicos; se extiende a los calendarios (el mismo examen que ya corre).
- **Incompatibilidad entre protocolos** (ej. un fármaco prohibido en embarazo según su
  catálogo) — respuesta: eso no es este motor: es la verificación de interacciones del
  módulo de alertas, y se le pasa el contexto de embarazo vigente (los módulos se hablan
  por datos, no se mezclan).
- **Reloj del equipo desalineado** (pasos vencidos mal calculados) — respuesta: fechas
  calculadas contra la fecha guardada del evento, y el pulso vigila la salud del equipo.

## 7 · Estado y bitácora

**EXPLORACIÓN** · v1 2026-10-23 — primera tanda. **Pendiente crítico:** la lista de
tipos de su centro (la entrevista la recolecta con la pregunta de la lista de casos);
hasta entonces, los tipos nombrados aquí son ejemplos de trabajo, no catálogo.
