# LÓGICA DE MENSAJES — la lógica completa, en humano (v2)

> **Qué es:** la lógica detrás de Agenda y mensajes, escrita en lenguaje humano, tal como
> la pidió el dueño: la batería completa por dimensión, marcadores con su fuente, niveles
> de edición, frontera paciente/personal, disponibilidad, y los cálculos que disparan
> mensajes **sin revelar cifras**. **Precedencia:** vista de diseño, no ley; si choca con
> la maestra (DEC-32, R-48, P6), manda la maestra. Fecha: 2026-10-25 · versión 2.

## 1 · La batería: 92 plantillas + 40 semanas, ordenadas por dimensión

El mensaje que necesita el equipo no es una lista de textos sueltos: es una **matriz**
que se recorre por la razón que lo dispara. Por eso el catálogo tiene **seis familias**
con subfamilia y población:

| Familia | Cuántas | Cubre |
|---|---|---|
| **Logística (L01–L14)** | 14 | Administración pura: recordatorio, confirmación, disponibilidad, reprogramación, cancelación, inasistencia, bienvenida, seguimiento de respuesta, cambios de horario, ausencias, vacaciones, documentos, espera larga |
| **Laboratorio (B01–B16)** | 16 | Cada control y estudio con su disparo (banda en alerta, plazo vencido, resultado capturado, preparación con ayuno) — **el mensaje llama a la acción, nunca revela el valor** |
| **Semana (S00–S05)** | 6 | El mensual semanal + las cinco etapas (trimestres, preparación, primeros días) — con **40 filas de contenido por semana** |
| **Diagnóstico (D01–D24)** | 24 | Cada estado gineco-obstétrico con protocolo: puerperio, tratamiento, fertilidad, seguimiento sensible, revisión, planificación, vacunación, acompañamientos, indicaciones, múltiple, postquirúrgico, especialista, medicación crónica, ánimo, lactancia |
| **Cuidado (F01–F18)** | 18 | Necesidades fisiológicas: hidratación, alimentación, descanso, actividad, suplementos (prenatal, hierro, calcio), preparación, higiene, boca, sexualidad, trabajo, viajes, peso, ánimo, bolsa, náuseas, respiración |
| **Alarma (A01–A14)** | 14 | Cada señal de alarma con su mensaje de acción inmediata — las nueve del R-14 más crisis, pérdida de líquido, herida, pierna |

**Por qué así y no «cientos de textos»:** una plantilla × marcadores × instancia. 92
filas auditables y firmables en lugar de 500 textos ingobernables. El `MENSAJES-MAESTRO.json`
es la constancia máquina y sale de `generar-maestro.js` — nadie lo escribe a mano.

## 2 · Los marcadores y su fuente (por qué cada uno es confiable)

- `{{nombre}}`, `{{nombre_completo}}` — del registro (se guarda una vez).
- `{{semana}}` — **calculada**: `EG = (280 − días hasta la fecha estimada) ÷ 7`, rango
  1–42. Sin fecha estimada o con EG incierta ⇒ **faltante ⇒ el mensaje se bloquea**.
  Jamás se captura (R-48).
- `{{trimestre}}` — derivado de la semana (1–13 / 14–27 / 28–40).
- `{{fecha_cita}}`, `{{hora_cita}}` — de la cita que se confirma o crea.
- `{{fecha_original}}` — de la cita que se cancela o mueve (la real, vinculada).
- `{{fecha_cierre}}` — del cierre programado (vacaciones).
- `{{opciones_reprogramacion}}` — compuestas por el personal: dos fechas concretas.
- `{{motivo_general}}` — de lo que el equipo escribe en el compositor; sin texto usa
  «causas imprevistas del consultorio» (siempre general, nunca detalle clínico).
- `{{documento}}` — de lo que falta en el expediente.
- `{{desarrollo_bebe}}`, `{{cuidado_semana}}` — de la fila de la semana; fila vacía
  ⇒ bloqueo: el sistema prefiere no enviar contenido no validado.
- `{{signos_alarma}}` — lista fija de los nueve signos del R-14 en palabras de
  paciente. **Va siempre al final y el texto editable no puede quitarla**: se inyecta al
  resolver, no vive en el texto maestro.
- `{{unidad}}`, `{{telefono_unidad}}`, `{{horario_unidad}}` — del catálogo de
  instalación (el horario es catálogo borrador, no código de lógica).
- `{{interno_*}}` (analito, valor, rango, diagnóstico, HOMA) — **solo ficha interna**;
  si quedan sin resolver en un mensaje de paciente, el motor bloquea. **Regla v2: el
  marcador sin resolver SE CONSERVA en el texto (nunca se convierte en hueco vacío)** —
  así un mensaje incompleto es imposible de copiar sin verlo.

## 3 · Diagnóstico estructurado, no olfateo de texto

El patrón de la cita sale del **código de diagnóstico de la ficha** (9 códigos:
embarazo normal/múltiple, puerperio, infección, fertilidad, tumoración, duelo,
planificación, vacunación), no de `indexOf` sobre la descripción libre. La sugerencia
**siempre muestra su fuente**: «semana derivada de la fecha estimada»,
«diagnóstico estructurado (…)» o —si la ficha solo tiene texto— «texto de la ficha
(capturar diagnóstico)». El sistema nunca finge una precisión que no tiene.

## 4 · Las cuatro rutas de edición (y por qué no se rompe la consistencia)

1. **Instancia** — en modo *Mensaje listo*, usted edita el texto de **esta** paciente
   antes de copiar (cambia la hora, añade una línea). De un solo uso; no toca el catálogo.
2. **Plantilla personalizada** — en modo *Plantilla* (con marcadores), «Guardar como
   mía» crea una copia que **sirve para cualquier paciente**: los marcadores se
   re-resuelven. Con autor y fecha.
3. **Texto fijo** — si guardó una copia ya resuelta, se etiqueta TEXTO FIJO y se usa
   sabiendo que no se re-resuelve. El sistema no oculta la diferencia: la etiqueta está.
4. **Desde cero** — «+ Nueva plantilla»: nombre, familia, disparo, texto. El motor
   valida antes de crear: pasa inocuidad, usa solo marcadores soportados y contiene
   `{{nombre}}` (un mensaje sin nombre no sale).
5. **Maestro clínico** — solo el médico modifica y firma el catálogo (P6: borrador →
   firma → vigente). Las personalizadas heredan la marca de borrador de su base.

Las **40 semanas** admiten ediciones del equipo (con autor y fecha), que quedan como
borrador encima de la fila maestra: la vigencia sigue siendo la firma.

## 5 · La agenda: sugiere, no decide — y respeta la disponibilidad

- **Patrón:** hasta semana 28, cada 4 semanas · 29–35, cada 2 · 36+, cada semana ·
  infección y puerperio cada 2 · fertilidad semanal · tumoración cada 2 meses · duelo
  mensual · planificación trimestral · vacunación cada 2 meses.
- **Disponibilidad:** el horario es catálogo (9:00–13:00, pasos de 30 min en la demo).
  El día se pinta con **huecos ocupados/libres reales**; `agendar` y `reprogramar`
  **se niegan en hora ocupada** y ofrecen el siguiente libre; la sugerencia se mueve
  sola si choca. El software **nunca llena un hueco solo** ni pisa una cita.
- **Preguntar también es un flujo:** «Pedir disponibilidad» (L03) crea un pedido
  pendiente con su autor; cuando la paciente contesta, el personal registra día y hora
  y el motor agenda en su hueco — con rastro completo de quién pidió y qué contestó.
- El software jamás cierra una cita por su cuenta: mover, cancelar y confirmar son
  botones con persona detrás.

## 6 · La frontera DEC-32 (el examen de inocuidad, ahora en el motor)

Todo mensaje de paciente pasa el examen **antes de copiarse y antes de entregarse**:
unidades clínicas (mg/dL, g/dL, µU/mL, mmHg, mmol…), cualquier **decimal** pegado
(«9.2»), analito seguido de cifra, el nombre de quince enfermedades (preeclampsia, VPH,
diabetes, anemia, hipertensión…) o un marcador interno sin resolver ⇒ **bloqueado con el
motivo a la vista**. La novedad de v2: **la validación vive en `entregar()`**, no solo
en la pantalla — la UI no es la única puerta. El examen corre en vivo sobre las 92
maestras en la pestaña Entregados. Ojo (hallazgo N1): es una **lista negra, no
semántica** — la barrera final sigue siendo la revisión humana antes de vigencia.

## 7 · Los cálculos que disparan mensajes (sin revelar cifras)

Circuito: el laboratorio captura → la banda del catálogo firmado evalúa → si es alerta o
plazo vencido, nace la **situación** («control de hemoglobina») → la plantilla se resuelve
con nombre y unidad → la persona entrega. **La cifra se queda en el expediente**; el
paciente recibe la acción. Mismo patrón para HOMA («su control de resistencia a la
insulina», jamás el número), el tamizaje, y cualquier diagnóstico: el texto del paciente
dice «su control», «su seguimiento», «su tratamiento» — nunca la enfermedad.

## 8 · Deduplicado y métrica (implementados, no prometidos)

- **Semana:** la entrega de S00 guarda la clave `sem-<n>`; `entregar()` se **niega** a
  repetir la misma clave para la misma paciente. La bitácora muestra la clave: el
  dedupe es verificable, no una frase.
- **Consentimiento:** sin consentimiento de whatsapp para la paciente, `entregar()`
  rechaza el canal y sugiere otro.
- **Métrica:** total, por canal, con clave y «evitados por dedupe» — se mide al sistema,
  nunca a las personas; y se mide **aparte** de la fatiga de los avisos clínicos (son
  canales distintos: el aviso tiene dueño y plazo; el acompañamiento es un acuerdo
  semanal con la paciente).

## 9 · Recomendadas: la capa «no se rompan la cabeza»

Con 92 plantillas, navegar es el error. La pestaña abre con **«solo las recomendadas
para la paciente seleccionada»** y estas se calculan por capas de prioridad:
① alarmas de su población → ② las que su disparo evidencia (banda de hemoglobina,
tamizaje vencido, documento faltar) → ③ semana/etapa → ④ logística de su cita →
⑤ diagnósticos de su etiqueta → ⑥ cuidado. El buscador libre y los filtros siguen
ahí para lo demás.

## 10 · Cancelaciones: motivo general, opciones concretas, cita vinculada

El motivo es **siempre general** (lo que usted escriba en el campo de motivo — o
«causas imprevistas del consultorio» si lo deja vacío —) — nunca detalle
clínico de nadie. El compositor trabaja **sobre la cita elegida**: su fecha real entra
como `{{fecha_original}}`, usted propone dos fechas concretas (o invita a que ella
comente sus días), el mensaje se compone y edita, y el botón ejecuta el mover/cancelar
con la misma validación de hueco. Mensaje y cambio de agenda salen juntos, con rastro.

## 11 · Lo que queda abierto (decisiones del dueño)

1. **Quién y dónde firma** las 40 semanas y las plantillas nuevas: hoy todo es
   BORRADOR y el equipo puede editar, pero **no hay pantalla de firma** (hallazgo N1).
2. **El diagnóstico estructurado de la ficha** — quién lo captura y si vive en la
   historia clínica del front integrado (N2).
3. **Pacientes de prueba** para infección y embarazo múltiple: sus filas existen pero
   nadie las dispara en vivo (N3).
4. **El horario** — editable por el dueño en Sistema, o derivado de una agenda real
   con servidor (N4 y decisión heredada).
5. **Intentos bloqueados** — ¿se bitacoran los rechazos del motor o eso es ruido? (N5).
6. Y siguen de la ronda anterior: divulgación de resultados por mensaje · tono del
   duelo · frecuencia exacta del semanal.
