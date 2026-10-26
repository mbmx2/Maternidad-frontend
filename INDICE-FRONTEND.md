# ÍNDICE DE FRONTEND — qué hay hoy, cómo se acopla y qué decisión de capas está abierta

> **Para qué sirve este documento:** tener a la vista todos los elementos de frontend
> planteados hasta hoy, ver cómo se relacionan entre sí, y con eso juzgar si las
> decisiones de capas (quién hace qué, quién depende de quién) son las correctas.
> Sin tablas (decreto D-1). Fecha: 2026-10-26 · estado: versión V4.

## 1 · Los elementos que existen hoy

**A · El frontend activo — carpeta `12-FRONT-SINTESIS` (versión V4 del producto):**

- **18 pantallas**, en el orden del día: `hoy` (tablero con estados que se mueven solos) ·
  `llegada` (puerta: registro y visita) · `estacion` (10 campos + 9 banderas) ·
  `consulta` (con la paciente enfrente: cinta, aviso, nota firmada) · `urgencia` (la que
  no se cierra hasta resolver) · `laboratorio` (tres datos, semáforo) · `pendientes`
  (avisos con acción, dueño y reloj) · `atenciones` (varias a la vez, pausa y retorno) ·
  `agenda` (recordatorios y citas) · `calculadoras` (catálogo de 18, hoy dos activas) ·
  `historia` (notas firmadas) · `ficha` (datos que salvan) · `documentos` (plantillas) ·
  `falla` (guiones de degradación) · `sistema` (dueño: roles y catálogos) · `cierre`
  (traspaso imprimible) · `CUMPLIMIENTO` (qué requisito cubre cada pantalla) ·
  `HOJA-DE-VEREDICTO` (la hoja imprimible con firma doble).
- **Un motor de 76 funciones públicas** (`motor.js`): es la única puerta — las pantallas
  no calculan ni guardan por su cuenta. Sus grupos: estados derivados de hechos ·
  alertas con cierre firmado · atención y estación con borradores · laboratorio con
  bandas · agenda con citas · notas · métricas · interfaz (modos, bandas, tarjetas).
- **Catálogos clínicos** (rangos, tensión, controles) — hoy **dentro** del motor; la
  decisión conocida es sacarlos a archivos firmables (es el primer paso del plan).
- **Una hoja de estilo propia** (`front.css`) y un **molde de pantalla** para las nuevas.

**B · El sistema de continuidad — carpeta `12-AGENDA-Y-MENSAJES`:**
- Un segundo motor: **92 plantillas de mensaje en 6 familias + 40 filas de semana**,
  con examen que bloquea mensajes con cifras o diagnósticos (la regla de no mandar
  datos clínicos al paciente).
- Pantalla de agenda con cinco pestañas, sus flujos dibujados y sus documentos.

**C · La capa de control (trabaja sobre las otras, no en las pantallas):**
- `autoauditoria.sh` con tres modos: iteración, transición y pantalla única.
- `SINTESIS-REGISTRO.json`: el avance real — 18 pantallas + 3 componentes, cada uno
  con su huella (huella = huella digital del archivo; si cambia sin registrarse, rojo).
- **9 suites de pruebas** (5 aquí, 4 en la de mensajes) · **5 trampas** vivas: huella,
  meta de versión, sello en la barra, deriva de duplicados, pantalla nueva sin registrar.
- `AGENTS.md` (reglas del agente) · `CHECKLIST-DE-PETICIONES.md` (tus pedidos y estados) ·
  `INVENTARIO-DECISIONES.md` (decisiones con consecuencias) · `VERSIONES.md` (de dónde
  viene cada versión) · `PLAN-DE-IMPLEMENTACION.md` (qué sigue) · las síntesis y
  auditorías (35 patrones, rondas de hallazgos con cierre).

**D · Herencia (carpetas que ya cumplieron su papel):**
- `01-DIBUJOS` = versión 1 (maqueta de pinceles).
- `07-FRONT-NUEVO` = versión 2 (su lógica ya fue absorbida; su destino es tu decisión D-4).
- `10` y `11` = pruebas de piso por rol (su motor es el ancestro del actual).

## 2 · Cómo se acoplan los elementos (las relaciones de verdad)

- **Pantalla → motor → catálogo:** toda pantalla llama al motor; el motor aplica los
  catálogos. Cuando los catálogos salgan del código a archivos, la cadena queda en
  tres eslabones limpios: presentación → lógica → datos firmados.
- **Pantalla → banda de veredicto → registro:** lo que el equipo aprueba en cada pantalla
  queda en su banda, y la evidencia de construcción queda en el registro con su huella.
- **Motor → memoria del navegador con versión:** lo que cambia, se guarda; si cambia la
  versión, se re-semilla o se reconcilia (nunca se borra lo del usuario).
- **Carpeta principal ↔ carpeta de mensajes:** aún **no acopladas** — esa es tu decisión
  D-2 (copiar el motor de mensajes con vigilancia, o enlazarlo).
- **Frontend ↔ backend:** el acople está **declarado** en el documento del backend (el
  «enchufe» de operaciones) y **hoy no está conectado**: los motores locales hacen de
  maqueta. Detalle en `INDICE-BACKEND.md`.
- **Capa de control sobre todo:** ninguna pantalla se declara terminada sin que la
  verificación automática lo confirme con conteos; ninguna edición pasa sin huella.

## 3 · Evaluación de gestión de capas (para responder tu pregunta)

**Lo que está bien decidido:**
- La lógica no vive en las pantallas (motor único) — cambiar una regla no toca 18 archivos.
- La presentación no decide nada (solo pinta lo que el motor devuelve).
- La verificación es una capa aparte: puede revisar el resto sin permiso de nadie.
- El gobierno (reglas, pedidos, decisiones) está fuera del código: se cambia sin recompilar nada.

**Lo que está fragmentado o abierto (los riesgos de capa actuales):**
- **Datos dentro de la lógica:** los umbrales clínicos están en el motor. Mientras eso
  dure, la capa «datos firmados» no existe de verdad. Ya está en el plan (paso 1).
- **Presentación en tres estilos:** la capa de apariencia está partida en tres carpetas
  con dos archivos del mismo nombre distintos. Es tu decisión D-3.
- **Funcionalidad partida entre dos carpetas:** mensajes en una, jornada en otra. Es tu
  decisión D-2.
- **Sin mapa de nombres hacia el backend:** el motor tiene 76 funciones y el backend
  declara 25 operaciones, y **casi ningún nombre coincide** (medido: solo tres palabras
  sueltas aparecen en ambos lados, y ni siquiera como función igual). Sin ese mapa, la
  futura conexión será adivinanzas. Corresponde construirlo como parte del índice de
  backend — lo dejó anotado ahí.
