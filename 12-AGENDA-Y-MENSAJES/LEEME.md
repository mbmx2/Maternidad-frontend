# LEEME — carrera 12: agenda y mensajes (versión 2 · 2026-10-25)

> **Qué es:** la carpeta dedicada al sistema de continuidad — **auditoría adversarial
> incluida, en dos rondas nuevas (4 y 5)**. La v2 absorbe la crítica del dueño entera:
> batería completa de mensajes/alertas/recordatorios/tips por dimensión clínica,
> administrativa, fisiológica y de alarma; editor real de plantillas; agenda que sugiere
> con su fuente y **respeta la disponibilidad**; preguntar a la paciente y agendar con su
> respuesta; dedupe y métrica verificables. **Papel usable (DEC-19):** no es el software;
> es la forma de decidirlo sin costo.

## Qué hay aquí (v2)

- **`AGENDA.html`** — la pantalla funcional con 5 pestañas:
  **Citas y disponibilidad** (sugerencia con fuente + huecos ocupados/libres del día +
  pedidos L03 con respuesta + citas con confirmar + composer de cancelación/reprogramación
  **vinculado a la cita**) · **Plantillas (92)** (buscador + filtros + *recomendadas para
  esta paciente* por defecto + vista previa con **textarea editable** en modo
  *Mensaje listo* / *Plantilla con marcadores* + copiar/entregar/guardar como mía +
  **+ Nueva plantilla desde cero** validada por el motor) · **Semanas 1–40** (grid con
  estado, edición del equipo con autor, y el S00 resuelto con la paciente) ·
  **Mis plantillas** (re-resolubles vs TEXTO FIJO, editar, copiar de verdad, eliminar) ·
  **Entregados** (bitácora con clave, métrica de mensajes, examen de inocuidad en vivo
  sobre las 92, reinicio).
- **`mensajes.js`** — el motor v2: **16 marcadores públicos** resolubles (más 5 `{{interno_*}}` que jamás salen de la ficha interna) y **92 plantillas en 6 familias** (logística 14 ·
  laboratorio 16 · semana 6 · diagnóstico 24 · cuidado 18 · alarma 14) + **40 filas de
  semana** con contenido · semana derivada por cálculo `(280 − días) ÷ 7` · 9
  diagnósticos estructurados · disponibilidad con huecos y rechazo de conflictos ·
  pedidos de disponibilidad · entrega que se **niega** en 4 frentes (marcadores vivos,
  inocuidad, consentimiento, dedupe `sem-N`) · recomendadas por capas · métrica ·
  ediciones de semana con overlay.
- **`FLUJOS.html`** — los seis circuitos dibujados: plantilla→entrega · sugerencia→
  cita con disponibilidad · cancelación vinculada · acompañamiento semanal con dedupe
  verificable · **pedir disponibilidad → respuesta → cita** · **los tres niveles de
  edición + crear desde cero**, más la frontera de lo que nunca viaja.
- **`MODELO-REPLICABLE.md`** — la explicación teórica, técnica, lógica y práctica del
  modelo (10 principios, pipeline del mensaje, algoritmos, tabla regla→mecanismo→prueba,
  las 4 suites y la **receta de 10 pasos** para replicarlo en otros módulos o software.
- **`LOGICA-DE-MENSAJES.md`** — la lógica v2 completa en humano (batería por dimensión,
  marcadores con fuente, diagnóstico estructurado, cuatro rutas de edición, dedupe,
  recomendadas, abiertos).
- **`AUDITORIA-ADVERSARIAL.md`** — rondas 1–3 (heredadas) + **Ronda 4** (los 12
  hallazgos sobre lo entregado) + **Ronda 5** (los cierres, los 7 hallazgos nuevos de
  la v2 y lo que queda abierto por su decisión).
- **`MENSAJES-MAESTRO.json`** — constancia máquina-legible, **generado** por
  `generar-maestro.js` (ya no se escribe a mano).
- **`pruebas/`** — 4 suites, **102 checks**: `pruebas-mensajes.js` (35: motor),
  `pruebas-reauditoria.js` (24: los documentos deben decir lo que el código dice),
  `pruebas-e2e-agenda.js` (28: la pantalla completa) y `pruebas-e2e-rotura.js`
  (15: pruebas de ruptura de la Ronda 6 — identidad al cambiar de paciente, contexto,
  huecos, motivo, label, las 92 listas). Las e2e necesitan jsdom declarado en
  `pruebas/package.json` (`cd pruebas && npm install`) y un servidor local
  (`python3 -m http.server 8124` en esta carpeta).

## Las reglas de esta carpeta

1. **El mensaje al paciente jamás lleva cifras clínicas, calculadoras ni nombres de
   enfermedad** (DEC-32). El examen corre antes de copiar **y antes de entregar**, en
   el motor.
2. **Todo el catálogo es BORRADOR** (P6): filas de semana, plantillas y ediciones del
   equipo esperan la firma del médico; sin contenido validado, el mensaje se bloquea.
3. **El sistema sugiere; el equipo decide.** La sugerencia muestra su fuente y la
   agenda muestra sus huecos; nada se agenda pisando otra cita ni solito.
4. **La semana se calcula, nunca se captura** (R-48). Sin fecha estimada ⇒ sin mensaje
   semanal.
5. **Nunca envío automático** (DEC-32): la persona copia y entrega; la bitácora registra
   con clave de dedupe y métrica del sistema.

## Qué cambió de la v1 a la v2 (por su crítica)

Fechas reales (la v1 tenía «23 de octubre» pegado) · diagnóstico estructurado en vez de
olfateo de texto (Rosa ya no cae al patrón por defecto) · semana derivada de verdad con
fecha estimada (la v1 capturaba `eg`) · disponibilidad con huecos y rechazo de
conflictos · composer de cancelación vinculado a la cita real · editor de plantillas y
nueva plantilla desde cero (antes solo `prompt()`) · «Copiar» de Mis plantillas que
**copia** (la v1 copiaba cadena vacía) · motor que se niega a entregar inseguro ·
inocuidad ampliada · dedupe semanal con clave verificable · métrica · recomendadas por
paciente · JSON maestro con su generador.

## Cómo probarla en 8 minutos

1. Abra `AGENDA.html` (servidor: `python3 -m http.server 8124` en esta carpeta).
2. **Citas:** vea la sugerencia de María con su fuente («semana derivada…») y los huecos
   del día. Pulse «Pedir disponibilidad», registre una respuesta y vea cómo agenda en el
   hueco libre. En una cita: «Mover o cancelar con mensaje» → componga → ejecute.
3. **Plantillas:** con «solo recomendadas» activo, elija **B01 Control de hemoglobina**:
   el mensaje sale con su nombre, editable; escriba «hemoglobina 9.2» y vea cómo se
   bloquea la copia (inocuidad en vivo). Cambie a modo **Plantilla** y vea los
   marcadores. Cree una nueva desde cero con una enfermedad y vea el rechazo.
4. **Semanas:** clic en la 29 → su contenido; proponga una edición y vea el borde
   naranja en el grid; abajo, el S00 con María resuelve a «semana 28» y el botón de
   entrega se bloquea si ya se entregó (`sem-28`).
5. **Entregados:** bitácora con claves, métrica, y el examen en verde sobre las 92.
6. Para repetir: botón «Reiniciar la jornada de mensajes» (o borre el almacenamiento).

## Protocolo de iteración

Cada auditoría del dueño: (1) hallazgo en `AUDITORIA-ADVERSARIAL.md` como «Ronda N+1» ·
(2) cierre técnico o declaración de decisión · (3) re-correr `pruebas/` y el examen ·
(4) actualizar este LEEME con la versión. Rondas registradas: 1–3 (v1) · 4–5 (v2) · 6 (reauditoría completa tras la desconfianza del dueño).
