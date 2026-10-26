# REGISTRO DEL SOFTWARE — lo que estamos implementando, con alcance, requerimientos y la lógica de sus decisiones

> **Qué es este documento:** el registro completo del software en construcción, para que
> cualquier persona (o agente) abra **un solo archivo** y sepa: qué es el producto, qué
> alcance tiene, qué requerimientos gobiernan cada pieza, **por qué se decidió cada cosa
> del diseño y qué implica cada decisión**, y en qué mapa encontrar el detalle.
> Es la fuente de verdad de la construcción del código. Sin tablas (decreto D-1).
> Fecha: 2026-10-26 · versión del frontend: V4 · lógica aplicada: síntesis S1.

## 1 · Qué es el software (las piezas, con su alcance)

- **Frontend activo (versión V4)** — carpeta `12-FRONT-SINTESIS`: 18 pantallas de la
  jornada de una maternidad, un motor de 76 funciones como única puerta, catálogos
  clínicos (aún dentro del motor), verificación con 9 suites y registro con huella.
  Su genealogía completa está en `VERSIONES.md`.
- **Sistema de continuidad (mensajes)** — carpeta `12-AGENDA-Y-MENSAJES`: motor de
  92 plantillas de mensaje en 6 familias + 40 filas de semana, con examen que impide
  mandar cifras o diagnósticos al paciente. Su integración al frontend está pendiente
  de tu decisión D-2.
- **Backend (declarado, sin código)** — carpeta `06-FUENTE-BACKEND`: 5 documentos —
  la costura con 25 operaciones en 10 áreas, 48 requisitos (26 de pantalla y 22 de
  fondo), 17 flujos compartidos, la verdad del backend y un módulo especificado
  (documentos). Detalle y mapa de acople en `INDICE-BACKEND.md`.
- **Capa de control** — `autoauditoria.sh` (tres modos de verificación),
  `SINTESIS-REGISTRO.json` (avance real con huella por archivo), `CHECKLIST-DE-PETICIONES.md`
  (tus pedidos con estado), `INVENTARIO-DECISIONES.md` (tus decisiones con consecuencias),
  `AGENTS.md` (leyes del agente).
- **Herencia cumplida** — `01-DIBUJOS` (maqueta), `07-FRONT-NUEVO` (versión 2,
  absorbida), `10` y `11` (pruebas de piso).

## 2 · Los requerimientos que gobiernan el software (y dónde viven)

- **48 requisitos de interfaz** — 26 exigencias de pantalla (RF) + 22 de fondo (RB),
  con su estado, en `06-FUENTE-BACKEND/REQUISITOS-FRONT-BACK.md`; su mapa de
  cumplimiento pantalla por pantalla es `12-FRONT-SINTESIS/CUMPLIMIENTO.html`.
- **17 flujos de interacción** (FL-01…FL-17) — el contrato que comparten frontend y
  backend: cada pantalla y cada operación se citan al mismo flujo para no contradecirse.
  Viven en `06-FUENTE-BACKEND/REQ-FLUJO.md` y están dibujados en `08-FLUJOS`.
- **35 patrones de construcción** (13 de lógica, 12 de técnica, 10 de gobierno) — el
  estándar que cada pantalla debe absorber antes de pasar a verificada:
  `12-FRONT-SINTESIS/SINTESIS-SUMATORIA.md`.
- **Reglas de la casa** — la ley de configuración en catálogos (P6), los recordatorios
  sin cifras (DEC-32), el papel usable (DEC-19), la firma donde la casa la exige
  (B-013), la agenda derivada nunca capturada (R-48): documentadas en sus familias de
  origen y aplicadas por las suites.
- **Leyes y decretos del agente (2026-10-26)** — L-1 a L-4 (reconfigurar agente,
  verdades, documentación y archivos cuando una petición lo exija) y D-1 (cero tablas)
  + D-2 (checklist de pedidos): viven en `AGENTS.md` y se ejecutan con cada turno.

## 3 · La lógica detrás de las decisiones de DISEÑO (y lo que cada una implica)

Cada decisión de diseño nace de una regla; su consecuencia es lo que hoy vemos; y su
«decisión por diseño» es lo que esa elección obliga a mantener. La lista completa:

- **Nada de estados escritos a mano; todo se deriva de hechos.** Decisión: los estados
  del tablero se recalculan de eventos. Por diseño: toda pantalla nueva debe emitir
  eventos, no pintar estados; si una pantalla pinta, es un defecto (se audita).
- **La única puerta es el motor.** Decisión: la pantalla no toca datos. Por diseño:
  toda mutación nueva pasa por una función del motor (hoy hay cero mutaciones directas
  en las 18; las tres que había se cerraron con funciones).
- **Primera pantalla: el día, no un índice.** Decisión por la regla FL-01. Por diseño:
  ningún menú inicial puede ganarle al tablero.
- **Riel de dos grupos + paciente en contexto.** Decisión: buscar no es estar. Por
  diseño: toda pantalla de paciente exige contexto y lo recuerda.
- **Color siempre con palabra.** Decisión: nunca solo color. Por diseño: todo chip
  lleva texto; la prueba de presentación lo vigila.
- **Banda de veredicto persistente por pantalla.** Decisión (DEC-19): el oficio
  contesta donde mira. Por diseño: cada pantalla nueva nace con su banda y el registro
  guarda la evidencia; sin banda, no se muestra como terminada.
- **La síntesis se versiona; el frontend también.** Decisión: lógica (S1) y marco (V4)
  son ejes separados. Por diseño: cambiar patrones obliga a re-pasar pantallas;
  cambiar gobierno obliga a re-sellar.
- **Huella por archivo.** Decisión: registrar antes de declarar. Por diseño: ningún
  cambio de pantalla pasa la verificación sin actualizar su huella (y la trampa falla).
- **Los números clínicos en catálogo, no en código** (aún pendiente de ejecución).
  Decisión: P6. Por diseño: cuando salgan del motor, habrá generador de resguardo y
  la suite exigirá que el resguardo esté al día.
- **Los mensajes sin cifras ni diagnósticos.** Decisión (DEC-32): frontera ejecutable.
  Por diseño: el examen corre en tres puntos; cualquier plantilla nueva nace bloqueada
  si se sale.
- **El sistema sugiere, el humano decide** (citas, avisos). Decisión: la agenda no es
  automática. Por diseño: toda propuesta lleva su fuente visible y es editable antes
  de agendar.
- **Construir completo y después firmar.** Decisión del dueño. Por diseño: ninguna
  decisión clínica bloquea la obra; las firmas viven en un paquete que se abre con
  18/18 pantallas verificadas.
- **Cero tablas en documentos** (D-1). Decisión: legibilidad para el dueño. Por
  diseño: los documentos nuevos nacen en listas y la conversión de los viejos queda
  en el checklist.

## 4 · Mapa de mapas (dónde está cada fuente de verdad)

- **Este registro** → alcance, requerimientos y decisiones de diseño (estás aquí).
- `INDICE-FRONTEND.md` → elementos del lado de las pantallas y sus acoples internos.
- `INDICE-BACKEND.md` → elementos del lado de detrás + **mapa de acople** motor↔operación
  (25 parejas con su estado).
- `SINTESIS-REGISTRO.json` → estado real por pantalla y componente (huella, pruebas,
  evidencia, versión).
- `CUMPLIMIENTO.html` → qué requisito (RF) cubre cada pantalla.
- `SINTESIS-SUMATORIA.md` → los 35 patrones que rigen cada construcción.
- `INVENTARIO-DECISIONES.md` → tus decisiones pendientes con sus consecuencias.
- `CHECKLIST-DE-PETICIONES.md` → tus pedidos con su estado de cumplimiento.
- `VERSIONES.md` → genealogía del frontend y lógica de cada versión.
- `PLAN-DE-IMPLEMENTACION.md` → el orden de trabajo y qué no se hace.
- Auditorías (`AUDITORIA-SINTESIS.md`, `AUDITORIA-ADVERSARIAL-PRUEBAS.md`,
  `12-AGENDA…/AUDITORIA-ADVERSARIAL.md`) → historial de hallazgos con cierre.

## 5 · Estado y condición de verdad

- Verificación actual: **151 comprobaciones rápidas y 337 completas en verde**.
- Avance: 1 pantalla verificada, 1 aplicada, 16 en cola; acople del enchufe: 18 de 25
  operaciones cubiertas.
- La condición de «software completo para firmar» sigue siendo una sola: **18/18
  pantallas verificadas y la verificación completa en verde** — entonces se abre el
  paquete de firmas del inventario.
