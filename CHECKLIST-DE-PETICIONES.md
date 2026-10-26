# CHECKLIST DE PETICIONES DEL DUEÑO — verificación uno por uno

> Cada petición del dueño queda aquí con su estado y su prueba. El agente lo revisa
> antes de empezar cualquier turno y al cerrarlo (decreto D-2 de `AGENTS.md`).
> Sin tablas: viñetas y casillas.

## A · Leyes y decretos (2026-10-26)

- [x] **L-1** · Reconfigurar `AGENTS.md` cuando una petición lo exija → ley escrita en AGENTS.
  *Se verifica:* abrir `AGENTS.md` y buscar «Leyes y decretos».
- [x] **L-2** · Reconfigurar las fuentes de verdad (índice, registro, catálogos, huellas)
  cuando una petición lo exija → ley escrita.
- [x] **L-3** · Reconfigurar documentación cuando una petición lo exija → ley escrita.
- [x] **L-4** · Reconfigurar archivos cuando una petición lo exija → ley escrita.
- [x] **D-1** · Cero tablas en chat y en `.md` → decreto activo; `SINTESIS-SUMATORIA.md`
  e `INVENTARIO-DECISIONES.md` ya convertidos a listas.
  *Pendiente de conversión (tocarán al tocarse):* `PROPUESTAS-DE-MEJORA.md`,
  `PLAN-DE-IMPLEMENTACION.md`, `ANALISIS-ATENCIONES.md`, `MODELO-REPLICABLE.md`,
  `LOGICA-DE-MENSAJES.md` (carpeta 12-AGENDA).
- [x] **D-2** · Checklist de peticiones → este archivo existe y se mantiene.

## A2 · Petición del 2026-10-26 00:47 (registro completo + mapas + frontend final)

- [x] **Verificar los dos índices recién creados** y decir qué tan bien/mal quedaron, y
  mejorarlos. *Se verifica:* cada cifra medida contra disco + nota de calidad escrita.
- [x] **Mapa «función del motor ↔ operación del enchufe»** dentro de `INDICE-BACKEND.md`
  (aprobado por el dueño). *Se verifica:* las 25 operaciones con su pareja y su estado.
  → Sección 4 de ese índice: 25/25 parejadas (18 cubiertas · 3 parciales · 2 faltan · 2 en otra carpeta).
- [x] **Registro completo del software** (alcance + requerimientos + la lógica detrás de
  las decisiones de diseño y las decisiones por diseño) → `REGISTRO-DEL-SOFTWARE.md`.
- [x] **Todos los mapas estructurados** con su constancia como fuente de verdad de la
  construcción del código. *Se verifica:* el registro lista cada mapa, qué cubre y dónde vive.
  → `REGISTRO-DEL-SOFTWARE.md` §4 (mapa de mapas) y §3 (decisiones de diseño).
- [x] **Frontend nuevo entregado en estado final de presentación** (lo más que se pueda):
  cierre del defecto conocido del tablero + barrido de restos en las 18 pantallas +
  verificación completa en verde. *Se verifica:* barrido sin hallazgos y T2 en verde.
  → Cerradas hoy las TRES mutaciones directas de estado (tablero, cierre, fallas) con
  funciones del motor; barrido prompt/alert/TODO sin hallazgos; **T2: 337 PASS · 0 FAIL**
  (y de paso se cazó y arregló un colgón real en el propio script de verificación:
  el arranque de servidores desde un subshell — corregido con `--directory`).

## A3 · Petición del 2026-10-26 02:04 (commit + plan de trabajo)

- [x] **Commit** del estado actual del repositorio (es la primera vez que se versiona:
  `git init` + `.gitignore` sin dependencias + commit inicial).
  *Se verifica:* `git log -1` y `git status` limpio.
- [x] **Plan de trabajo** para dejar el modelo listo con todas las pantallas
  implementadas y con **protocolo de ediciones** para tocarlas después de listas →
  `PLAN-DE-TRABAJO.md` (tramos A–D, pasos E1–E5, puertas y riesgos).
  *Se verifica:* abrir el archivo y ver los cuatro tramos y los cinco pasos E.

## A4 · Petición del 2026-10-26 02:13 (aislamiento + arranque de la nueva versión de ejemplos)

- [x] **NO importar el paquete de acoplamiento del agente de backend** — decisión del
  dueño: proteger el repositorio del ruido ajeno; la construcción de backend solo se
  toca con trabajo en papel de pantallas. Registrado como **declinado**, no ignorado:
  si más adelante se necesita una pieza concreta de ese paquete, se pide pieza por pieza
  y entra por las leyes L-1…L-4 como cualquier otra. *(Dato verificado al evaluarlo:
  el paquete afirma que aquí no hay `.git` — ya no es cierto: existe desde el commit
  683a038; otra razón para no importarlo sin filtrar.)*
- [x] **Poner en marcha la nueva versión de ejemplos de pantallas finales, todos con la
  lógica integrada** → Tramo A del `PLAN-DE-TRABAJO.md` arrancado hoy: catálogos
  clínicos fuera del motor a archivo firmable (`catalogos.js` + espejo `CATALOGOS.json`
  + regla en la suite) y primera pantalla llevada a `verificado` con sus pruebas.
  *Se verifica:* T2 en verde + registro con la primera fila del tramo.

## A5 · Petición del 2026-10-26 02:20 (KPIs y DoD)

- [x] **KPIs del proyecto y DoD por pantalla definidos** → `KPIS-Y-DOD.md`: 10
  indicadores con valor actual, fuente y meta; los 8 criterios del núcleo de
  terminado; y el criterio específico de cada una de las 18 pantallas.
  *Se verifica:* abrir el archivo — cada KPI con su número medible y cada pantalla con
  su «además».

## A6 · Petición del 2026-10-26 02:23 (genera todas las pantallas)

- [x] **Generar todas las pantallas** → las **18 de 18 en `verificado`** con su DoD
  completo: núcleo (molde, cero mutación directa, reloj real, patrones, cuatro planos,
  registro con huella, dos puertas, nota de evidencia) y su criterio específico de
  KPIS-Y-DOD §3. De paso: 6 funciones nuevas de motor (la puerta única), frontera
  DEC-32 portada al motor, y 2 bugs cazados por la propia suite (recordatorios sin
  campo de caso; una regla que ponía rojo al objetivo cumplido).
  *Se verifica:* registro 18/18 · `./autoauditoria.sh --completo` en verde.

## A7 · Petición del 2026-10-26 02:50 (RECHAZO TOTAL + correcciones exigidas)

- [x] **Dejar registrado el rechazo total** a las pantallas y a la gestión de la pasada,
  con sus cinco motivos → en `SINTESIS-REGISTRO.json` (campo `veredicto_dueno`), en
  `AUDITORIA-SINTESIS.md` (Ronda S-2) y en `KPIS-Y-DOD.md` (nota en K-01).
- [x] **Registrar tus frases sin sentido para el usuario** →
  `12-FRONT-SINTESIS/FRASES-A-TRADUCIR.md` con las 30 entradas tal cual (con sus
  repetencias y errores originales conservados), en espera de traducciones útiles.
- [ ] **Pantallas DESDE CERO** (no refrito): reconstrucción nueva de las pantallas
  exigida por el rechazo. *Estado:* pendiente — se planifica en cuanto cierre el
  registro de frases que estás alistando.
  *Trío de capas:* **lógica** = se reconstruye desde patrón y acople, no se parchea lo
  viejo · **técnica** = molde + motor + pruebas nuevas por pantalla · **gobernanza** =
  registro con `veredicto_dueno` y puerta DoD v2.
- [ ] **Calendarios en la agenda** (todo campo de fecha con su calendario, no solo un
  cuadro de texto) — pedido explícito incumplido. *Estado:* pendiente.
  *Trío de capas:* **lógica** = la fecha se elige con calendario y se valida (regla de
  superficie heredada) · **técnica** = componente reutilizable + prueba que cuenta
  calendarios en toda fecha · **gobernanza** = criterio D-2a del DoD v2.
- [ ] **Integrar todo lo trabajado en `12-AGENDA-Y-MENSAJES`** (92 plantillas, composer
  de cancelaciones con opciones, disponibilidad con huecos, dedupe) en la pantalla de
  agenda del frontend. *Estado:* pendiente.
  *Trío de capas:* **lógica** = plantillas/disponibilidad/dedupe como reglas vivas en la
  agenda del frontend · **técnica** = motor de mensajes con guardia de desincronización
  + pruebas de entrega con clave · **gobernanza** = tu decisión D-2 (hogar del módulo)
  y criterio D-2c del DoD v2.
- [ ] **Reescribir el lenguaje de TODAS las pantallas** para que le digan algo útil a la
  persona que usa el software — con tu registro `FRASES-A-TRADUCIR.md` como base y tus
  traducciones como autoridad. *Estado:* pendiente (tú alistando frases primero).
  *Trío de capas:* **lógica** = ninguna frase es texto libre: solo traducciones
  aprobadas · **técnica** = prueba de que ninguna frase de la lista aparece en el HTML
  (el registro se vuelve red para la pantalla que la use) · **gobernanza** = tu
  traducción es la autoridad; criterio D-2b y el KPI de lenguaje.
- [ ] **Aplicar el acople backend↔frontend firmado** (`INDICE-BACKEND.md` §4, las 25
  operaciones) en la construcción de las pantallas, no solo tenerlo mapeado.
  *Estado:* pendiente.
  *Trío de capas:* **lógica** = cada acción de pantalla corresponde a una operación del
  enchufe · **técnica** = prueba de paridad pantalla↔operación · **gobernanza** = K-06
  avanza a 25 de 25 parejas cubiertas.
- [ ] **DoD v2 de pantalla:** añadir los cuatro criterios anteriores al
  `KPIS-Y-DOD.md` y re-pasar las pantallas bajo él. *Estado:* en curso
  (los cuatro criterios ya están escritos en `KPIS-Y-DOD.md` §2.5; falta el re-pase).
  *Trío de capas:* **lógica** = qué es verdad de una pantalla terminada · **técnica** =
  suite de DoD v2 · **gobernanza** = K-01 solo cuenta bajo v2.

## A8 · Petición del 2026-10-26 03:02 (checklist maestro de toda la ronda)

- [x] **Checklist detallado de todo lo pedido en esta ronda, para checar uno por uno qué
  está instaurado** → `CHECKLIST-MAESTRO.md` (verificado hoy contra disco: casillas con
  estado real, archivo o comando de evidencia, y trío de capas por petición).
- [x] **Regla: cada comentario del dueño genera mejoras en lógica y gobernanza** → ya
  estaba como L-5 en `AGENTS.md`; cumplida en cada casilla del maestro con su trío.
- [x] **«Siempre entregar como si ya estuviera finalizado»** → hoy como **decreto D-3**
  en `AGENTS.md`.
- [x] **Abrir los documentos con registro y ser honesto** → tres deshonestidades reales
  encontradas y arregladas hoy: recuento del registro de frases (decía 30, había 25),
  números caducos y estado falso en `REGISTRO-DEL-SOFTWARE.md` §5 (arreglado), y el
  avance real de mejoras confirmado (4 de 18, 22%).
- [ ] **Los pendientes del maestro** (bloques 2, 7, 9, 10, 11, 12 y 13: pantallas desde
  cero, calendarios, integración de la agenda, lenguaje, tour 1 a 1, plantillas en
  pantalla, edición de pantalla por pantalla, tu retroalimentación detallada y los 4
  flujos nuevos) → van entrando por el plan vigente, cada uno con su trío.

## A8 · Petición del 2026-10-26 03:10/03:11 (registro de la conversación)

- [x] **Guardar todos y cada uno de los mensajes, tal y como están** →
  `REGISTRO-CONVERSACION.md` (raíz): **volcado completo desde la base de datos del
  sistema** (sesión `ses_e8dd2705…`): 36 mensajes tuyos + 164 del agente, 154,288
  bytes, texto crudo sin procesar — elegido `.md` por ser el más ligero con igual
  contenido. Método sin lectura intermedia: `sqlite3` vuelca directo al archivo.
  *Se verifica:* `grep -c "^## User"` = 36 · primer mensaje = «Añadí 2 carpetas» ·
  sin avisos del sistema ni resultados de herramienta colados.

## B · Peticiones vivas de todo el proyecto

- [x] **Hablar en lenguaje humano** en el chat, sin siglas sin traducir, con la forma
  «qué pasó / qué significa / qué sigue» (regla §0.5 de AGENTS).
- [x] **Verificar y reauditar cuando lo pide** — con salida de comandos, no con palabra.
- [x] **Primero construir completo, después las firmas** — orden invertido respecto de
  antes; escrito en el inventario de decisiones y en el plan.
- [x] **Registrar todo cambio** con huella y conteos; trampa automática instalada.
- [x] **Autoauditoría en cada iteración** — comando rápido / completo / pantalla única.
- [x] **Las decisiones pendientes nunca se silencian** — inventario con propuesta y
  consecuencias (10 decisiones listadas).
- [x] **Versión rastreable del frontend** — V4 con su genealogía (`VERSIONES.md`),
  sello en cada pantalla y regla que lo exige.
- [x] **Números vivos solo en la salida del comando**, nunca hardcodeados en los
  documentos operativos (regla de la suite).
- [x] **Nada declarado sin salida de comando** (lección de la entrega fantasma).
- [x] **Índice de frontend y de backend** (capas y acoples) → `INDICE-FRONTEND.md` e
  `INDICE-BACKEND.md` en la raíz, con evaluación de gestión de capas.
  *Se verifica:* abrirlos y ver los acoples y los huecos medidos (76 funciones vs 25 operaciones).
- [ ] **Ordenar el repositorio** — en curso: índice maestro reordenado hoy; la
  conversión de tablas de los documentos listados en D-1 sigue abajo.
  *Se verifica:* `./autoauditoria.sh` en verde y ninguna tabla en los .md.

## C · Obra pendiente (no son decisiones: son trabajo)

- [ ] 16 pantallas sin empezar + 2 remates (el tablero de hoy y la estación).
- [ ] Umbrales clínicos fuera del código, con archivo firmable y resguardo.
- [ ] Fechas de control calculadas desde la ficha.
- [ ] Sistema de mensajes integrado (con la decisión D-2).
- [ ] 18 calculadoras · laboratorio completo · pantalla de acceso.
- [ ] Mejoras pendientes: tablero de decisiones, huellas locales, suite de presentación.
- [ ] 18/18 pantallas verificadas ⇒ se abre el paquete de firmas.
