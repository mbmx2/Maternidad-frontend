# ÍNDICE DE BACKEND — qué está planteado, con qué se acopla al frontend, y qué decisión de capas queda

> **Para qué sirve:** inventariar la capa de detrás tal como está **planteada** (ojo: es
> documentación, no hay ni una línea de código de backend en todo el repo), mostrar su
> acople con el frontend, y dar elementos para juzbar la gestión de capas. Sin tablas.
> Fecha: 2026-10-26 · familia `06-FUENTE-BACKEND` (5 documentos).

## 1 · Los elementos planteados

**A · La estructura declarada** (en `COMUNICACION.md`, con puntero a la casa de lógica):
- **Dominio puro** — reglas clínicas sin pantallas ni disco: se prueban solas.
- **Persistencia** — un solo escritor, escrituras atómicas con diario: sobrevive a cortes.
- **Eventos del día** — un canal único del que todo se deriva: tablero, agenda y alertas
  son vistas calculadas de los hechos (la regla que ya cumplen las pantallas nuevas).
- **Presentación del backend** — se compone desde un SPEC declarativo; pinta lo que el
  dominio devuelve, nunca al revés.
- **Catálogos firmados** — los números clínicos en archivos con firma de borrador a
  vigente; el código solo aplica lo firmado. (Esta es la misma meta que tiene hoy el
  frontend con sus umbrales: una decisión, dos lados.)
- **Servidor local** — fase pendiente con hardware (terminal/celular); no bloquea nada.

**B · El enchufe (el puente):**
- **25 operaciones** con forma fija, agrupadas en **10 áreas**: identidad · tablero ·
  atenciones · controles · calculadores · alertas · agenda · laboratorio · cierre ·
  documentos. Cada operación tiene ocho campos de formato y lleva su etiqueta de flujo
  (los 17 flujos FL-01…FL-17 que ambas capas comparten).
- **Regla de oro:** las pantallas solo hablan con operaciones — como una lámpara: no
  sabe si la luz viene de la batería o de la red. Cuando el backend real llegue,
  **las pantallas no cambian: solo cambia el enchufe**.
- **Dos enchufes previstos:** la **maqueta** (hoy: los motores con datos de mentiras —
  `puente.js` de la versión 2 y los motores actuales) y el **real** (futuro, implementa
  el mismo catálogo).
- **Eventos vs pedidos:** los pedidos son órdenes que alguien da; los eventos son avisos
  que nacen solos de un hecho — las pantallas nuevas ya viven así, así que la futura
  costura encaja sin reescribirlas.

**C · Los requisitos que viven en esta capa:**
- **26 exigencias de pantalla (RF)** + **22 de fondo (RB)** — 48 claves en total, con su
  estado; el mapa de cumplimiento de las pantallas está en `CUMPLIMIENTO.html`.
- **17 flujos (FL-01…FL-17)** que cruzan ambas capas: cada flujo es el contrato de cómo
  debe comportarse una interacción, venga del lado que venga.

**D · Los módulos construibles:**
- Solo **uno** está especificado: `MOD-DOCUMENTOS.md` (667 líneas: qué es el módulo, su
  esqueleto, sus datos, sus pantallas y cada función con su porqué). Los demás módulos
  están anunciados como familia pero **faltan**.

**E · La verdad de esta capa:** `FUENTE-DE-VERDAD.md` (qué es verdad, qué es propuesta).

## 2 · Cómo se acopla al frontend (el mapa de pareja)

- **Identidad ↔** `llegada` y `ficha` · **Tablero ↔** `hoy` · **Atenciones ↔**
  `atenciones` · **Controles ↔** `estacion` · **Calculadores ↔** `calculadoras` ·
  **Alertas ↔** `pendientes` y `urgencia` · **Agenda ↔** `agenda` · **Laboratorio ↔**
  `laboratorio` · **Cierre ↔** `cierre` · **Documentos ↔** `documentos`.
- Los **17 flujos** son el puente compartido: una pantalla nueva del frontend y una
  operación futura del backend se citan al mismo flujo para no contradecirse.
- **El acople real de hoy:** ninguno. La costura está declarada; quien la hace de
  interina son los motores locales (maqueta). Por eso existe `INDICE-FRONTEND.md`:
  para ver las dos mitades juntas.
- **El hueco de acople (medido):** el motor del frontend expone **76 funciones** y el
  backend declara **25 operaciones**, con nombres **prácticamente distintos** — no existe
  un mapa «función del motor ↔ operación del enchufe». Sin él, al construir el backend
  real se decidiría caso por caso, a ciegas. **Propuesta:** construir ese mapa en este
  mismo documento (una lista: función del motor, operación declarada, qué cambia),
  antes de la primera línea de código de backend.

## 3 · Evaluación de gestión de capas (para tu pregunta)

**Decisiones de capa que ya están bien tomadas:**
- Un solo enchufe: las pantallas no se enteran de dónde viene el dato — el cambio de
  capa futuro no las toca.
- Requisitos de pantalla (26) separados de requisitos de fondo (22): se puede exigir
  uno sin arrastrar al otro.
- Los flujos son el contrato compartido: ninguna capa puede reclamar una regla que el
  flujo no diga.
- Los catálogos firmados están declarados **en la capa de datos**, no en la lógica:
  coinciden con lo que el frontend también quiere hacer (una sola decisión sirve a los dos).

**Decisiones de capa que faltan (por orden de importancia):**
1. **El mapa de nombres** entre motor y enchufe (arriba, propuesto) — sin él, la costura
   se improvisa.
2. **Construir el backend módulo por módulo** empezando por el único que está
   especificado (documentos) — el resto de módulos necesita su especificación primero:
   hoy solo hay una.
3. **Cuál maqueta sobrevive** mientras no hay backend real (los tres motores actuales
   son maquetas en paralelo) — se solapa con tus decisiones D-2 y D-4 sobre mensajes y
   frontend antiguo.
4. **El servidor local con hardware** — decisión de producto, fuera del papel.

*Conclusión en lenguaje llano: la capa de detrás está **bien pensada y mal habitada** —
los planos están completos para empezar, pero no hay muros. La mejor decisión de capas
posible hoy es exactamente la que sigue el plan: terminar el frontend (capa de
presentación y lógica ya sanas) mientras se escribe el mapa de acople, para que el día
que se construya el enchufe real, ninguna pantalla se entere.*

## 4 · Mapa de acople: función del motor ↔ operación del enchufe (aprobado por el dueño)

> Para que el día que exista el backend real, cada conexión esté **decidida** y no
> improvisada. Estado por pareja: **cubierto** (el motor ya hace el trabajo, aunque con
> otro nombre) · **parcial** (existe la mitad) · **falta** (no hay función) · **en otra
> carpeta** (vive en el sistema de mensajes, pendiente de tu decisión D-2).
> Las pantallas indicadas son las de la versión V4.

**Identidad:**
- `buscar` → `porNombre` / `porAparecidas` → pantalla `llegada` → **cubierto** (otro nombre).
- `registrar_llegada` → eventos `llego` y `visita_completa` → `llegada` → **cubierto** por eventos.
- `registro_rapido` → **falta**: no hay función de crear paciente en el motor; la pantalla
  empuja el arreglo directamente — deuda conocida y anotada en la cola de revisión.
- `elegir_paciente` → `leerContexto` + `irA` → todas las pantallas con paciente →
  **cubierto** con otro modelo (contexto recordado en vez de elección repetida).

**Tablero:**
- `listar_dia` → `hoy` deriva de `estadoDe` → **cubierto** por derivación (sin función
  llamada listar: la vista se calcula, no se pide).
- `marcar_no_llego` → automático dentro de `estadoDe` (vencida la cita + 45 minutos) →
  **cubierto y mejorado**: nadie lo marca a dedo.
- `marcar_urgencia` → `nacerAlerta` de tipo 4 + evento de urgencia → `urgencia`, `hoy` → **cubierto**.
- `equipo_fuera` → `alternarEquipo` → `hoy` → **cubierto** (se cerró hoy su mutación directa).

**Atenciones:**
- `pausar` → `pausarAtencion` (con borrador) → `atenciones`, `estacion` → **cubierto**.
- `retomar` → `retomarAtencion` → `atenciones` → **cubierto**.

**Controles:**
- `guardar_control` → `guardarControl` (nunca bloquea; avisos después) → `estacion` → **cubierto**.
- `ultimos_valores` → `controlMasReciente` + `resolverChips` → `estacion`, `consulta` → **cubierto**.

**Calculadores:**
- `calcular` → `homa`, `bandaTA`, `evaluarBandaLab` → `calculadoras` → **parcial**:
  el cálculo existe, pero solo dos de las dieciocho calculadoras están vivas (el resto
  es la lista esperando construcción).

**Alertas:**
- `listar_alertas` → `alertasPendientes` / `alertasDe` → `pendientes` → **cubierto**.
- `nacer_alerta` → `nacerAlerta` → `estacion`, `laboratorio`, `urgencia` → **cubierto**.
- `atender_alerta` → `cerrarAlerta` exigiendo nombre y cédula → `pendientes`, `urgencia`,
  `consulta` → **cubierto** (con la regla de firma de B-013).
- `alertas_del_episodio` → `alertasDe(pid)` → `consulta` → **cubierto** (otro nombre).
- `preparacion_consulta` → **parcial**: la cinta de consulta ya muestra lo que esta
  operación prepararía; no existe la función con ese nombre.
- `copiar_control_anterior` → **parcial**: `controlMasReciente` existe; falta la acción
  «copiar» dentro de la estación.

**Agenda:**
- `listar_llamadas` → **en otra carpeta** (el motor de mensajes, con tus 92 plantillas).
- `reagendar` → `reagendar` → `llegada` → **cubierto**.

**Laboratorio:**
- `capturar_laboratorio` → `capturarLab` (con banda y alerta) → `laboratorio` → **cubierto**.

**Cierre:**
- `obtener_traspaso` → `traspasoHTML` + `registrarTraspasoImpreso` → `cierre` → **cubierto**.

**Documentos:**
- `listar_plantillas` → **en otra carpeta** (las 92 plantillas; pendiente D-2).
- `generar_documento` → **falta**: la pantalla dibuja el papel, pero no hay función que
  genere el documento — deuda de construcción.

**Balance (medido): 18 de 25 cubiertas · 3 parciales · 2 faltantes · 2 en otra carpeta.**
La lectura para la gestión: **el enchufe está casi todo cableado del lado de las pantallas**;
los huecos son concretos y pocos — crear paciente, generar documentos, completar las dos
parciales, y resolver el hogar de los mensajes.
