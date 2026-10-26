# CONTRATO · CANAL DE URGENCIA — órgano 5

> **Estado: EXPLORACIÓN** (v1 · 2026-10-23). No es ley; cambia gratis. Fuentes: doctrina
> pilar 5, flujos 3, 4 y 5, dibujos TABLERO y EMERGENCIA.

## 1 · Qué garantiza

- **Toda urgencia —sea de donde sea— pone a la paciente al frente, en el mismo segundo
  de su marcado**, visible para todo el equipo.
- **Una urgencia no se cierra sin resolver:** llevar estado, dueño y motivo de cierre.
- **La urgencia puede saltarse la fila** de quien esté esperando, y el sistema lo
  registra — sin borrar la espera de nadie.
- **La urgencia más la interrumpe, no la borra:** lo que la paciente pausada tenía
  queda intacto.
- **El registro nunca frena la urgencia:** quien llega en crisis sin expediente se
  registra en el mínimo y entra por la puerta roja del tablero.

## 2 · Lógica total

**Fuentes de urgencia (tres, y solo tres):** (a) **marca manual** de un profesional
(el juicio manda: «esto es ahora»); (b) **regla clínica de catálogo** (las banderas del
control y cualquier regla que el médico firme: condiciones de disparo escritas en datos,
nunca en código); (c) **llegada en trabajo de parto o situación de crisis** (la
emergencia de registro la activa su propia creación).

**Estados de la urgencia:** `activa` (tarjeta al frente, rojo, no se oculta) →
`resuelta` (con acción: atendida en el día, referida con nota, o cerrada con motivo).
**Ningún estado intermedio sin dueño:** toda urgencia activa tiene a quién se le asignó
(el rol que la marcó, o la médica si vino de regla).

**Transiciones:** marcar (manual, con hora y autor) · disparar (regla evaluada ⇒ evento
de urgencia) · tomar (alguien la atiende: queda quién) · resolver (atendida / referida
/ motivo de baja con confirmación que nombra qué se descarta). **Reordenación:** al
marcarse, la tarjeta sube a la columna urgente; el orden dentro de la columna es por
hora de marcado (la más vieja arriba — la que esperó más, primero).

**Invariantes:** (i) de marca a tablero, en el mismo segundo; (ii) urgencia activa al
cierre del día ⇒ imposible: el cierre la lista con dueño y motivo (y si no se resolvió,
pasa al traspaso); (iii) toda urgencia deja bitácora (marca, tomador, resolución); (iv)
la urgencia no borra estados: solo se superpone.

**Casos borde:** dos urgencias a la vez (orden por hora; ambas al frente; la columna las
muestra juntas) · falsa alarma (resolución con motivo: «se descartó por…» —registrado,
no borrado) · la paciente sin registrar (la emergencia crea la tarjeta con folio: la
urgencia precede a la ficha completa) · la médica en quirófano con la urgencia abierta
(el dueño de la urgencia está en «equipo fuera» —el tablero lo dice—) · regla clínica
que dispara por error de captura (la bandera se corrige con motivo; la urgencia se
resuelve como falsa alarma, con rastro).

**Errores:** marca que no llega al tablero (invariante (i) con prueba) · resolución
sin motivo (imposible: la confirmación lo exige y nombra lo que se descarta) · urgencia
que se pierde entre pantallas (no puede: es estado de la tarjeta, no de la pantalla).

## 3 · Por qué esta lógica

Descartado: que la urgencia viva solo en la pantalla de quien la marcó (el error de mi
primer flujo —«el chip se escucha solo»—; la urgencia necesita equipo y voz: el sistema
ordena, la persona llama). Descartado: cierre silencioso (toda resolución deja motivo).
Descartado: prioridad calculada por puntaje (algoritmo que decide sobre el juicio
clínico); aquí manda quien marca, y las reglas que marca el médico con su firma.

## 4 · Cómo se implementa

**Símbolos nacituras:** `marcar_urgencia`, `disparar_regla` (evaluación contra catálogo
firmado), `resolver_urgencia` (con motivo), `orden_urgencias` — y su presentación: la
columna urgente del tablero, el chip de la tarjeta, y la ventana de «en uso por X»
cuando la urgencia toma una atención. **Encaje:** es el canal que el sistema de alertas
usa para el tipo 4; comparte su bitácora de avisos.

## 5 · Cuadre: promesa ↔ prueba

Números: urgente al frente en el mismo segundo · 0 urgencias activas al cierre sin
dueño · 0 resoluciones sin motivo. **Pruebas al construir:**
`test_urgencia_marca_y_salta`, `test_urgencia_no_se_cierra_sin_motivo`,
`test_urgencia_orden_por_hora`, `test_urgencia_regla_de_catalogo` (disparo y
falsa-alarma con rastro), `test_urgencia_toma_atencion` (robo registrado).

## 6 · Prevención de problemas (posibles e improbables)

- **Alarma que nadie ve** — respuesta: no vive en una pantalla: vive en la columna
  delantera de **la** pantalla de arranque, más en la tarjeta, más en la bitácora; y la
  regla de «todo aviso con dueño» le asigna responsable.
- **Falsa alarma generando desconfianza** — respuesta: resolución con motivo obligatoria
  y contador en la bitácora de fatiga: si una regla dispara de más, su médico ajusta el
  umbral (catálogo, no código).
- **Cierre apresurado para «limpiar» el rojo** — respuesta: cerrar exige nombrar qué se
  descartó; el cierre entra al traspaso del día: se ve.
- **La urgencia «robando» pacientes sin registro** — respuesta: la toma queda en
  bitácora con quién; y la atención robada pausa la anterior con todo lo suyo.
- **Alguien marca urgencia por costumbre** (rojo de uso cotidiano) — respuesta: el
  contador de disparos por tipo lo muestra en administración; el vicio se ve con número
  y se corrige con su dueño.
- **Pantalla mínima donde la columna urgente no cabe** — respuesta: la columna urgente
  tiene precedencia de espacio (su regla: nada crítico bajo el pliegue); si la ventana
  está al mínimo, ella es lo primero que se ve.
- **Se marca urgencia con la ficha de otra abierta** — respuesta: la marca se hace
  desde la tarjeta del tablero (con su paciente visible), no desde dentro de un
  formulario; imposible marcar a ciegas.
- **La regla clínica dispara mientras el catálogo está en borrador** — respuesta: solo
  lo firmado dispara; sin firma, el sistema dice «reglas sin firmar», nunca adivina.
- **Interrupción del sistema a mitad de la marca** — respuesta: la marca es una
  escritura atómica como cualquier evento; o quedó, o no quedó —nunca a medias—, y el
  tablero la reconstruye si hizo falta.
- **Equipo mal informado** (la urgencia de una no es la de otra) — respuesta: la
  tarjeta lleva caso y hora de marca; el traspaso y la bitácora cuentan la secuencia
  completa del día.

## 7 · Estado y bitácora

**EXPLORACIÓN** · v1 2026-10-23 — primera tanda. Pendiente: con su equipo, la lista de
las **reglas clínicas** que quieren disparar (hoy solo existen las nueve banderas del
control); ellos firman el resto — aquí solo está el mecanismo.
