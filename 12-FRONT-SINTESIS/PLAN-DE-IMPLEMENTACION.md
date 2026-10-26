# PLAN DE IMPLEMENTACIÓN — lo que sigue hasta que toda la lógica esté aplicada en todas las pantallas

> **Qué es:** el mapa de trabajo pendiente desde el estado verificado de hoy hacia la meta
> del dueño: *toda configuración de lógica bien aplicada y disponible en todas nuestras
> pantallas*. No sustituye al registro (que sigue siendo la verdad del avance): lo
> complementa con lo que **el registro todavía no puede ver** — el trabajo por delante.
> Base: síntesis **S1** · fecha: 2026-10-25 · se actualiza con cada hito cerrado.

---

## 0 · Estado verificado de partida (cifras vivas, no deseos)

- **S1:** 35 patrones (13 ML · 12 MT · 10 MG) con protocolo de 7 pasos.
- **Registro:** 18 pantallas → **1 verificada** (atenciones) · **1 aplicada** (estacion,
  deuda G-14) · **16 en cola**.
- **Verificación:** 5 suites en verde; el total vivo lo da `../autoauditoria.sh`
  (T1/T2) — este documento no hardcodea PASS: el número vive en la salida del comando.
- **Configuración de lógica hoy:** los catálogos clínicos **ya están estructurados**
  (`CATALOGO` en `motor.js:53-65`: laboratorio, TA 160/110 y 140/90, FCF 110–160,
  HOMA 2.5/4.0, controles) — pero **dentro del `.js`**, sin archivo firmable ni espejo
  JSON; `proximaFechaControl` aún olfatea el texto de `caso` (`motor.js:476-482`);
  `fechaEstimada` tiene 0 apariciones en la ficha; `agenda.html` solo tiene
  recordatorios (el modelo de 92 plantillas vive en la otra carpeta).
- **Registro hoy:** cubre **solo `.html`** — el motor ya fue tocado dos veces en esta
  sesión (alternarEquipo, guard C1) y el libro no lo ve.
- **Decisiones sin resolver:** N-S1 · N-S2 · N-S3 (más N-S3b del mensaje) · N1…N7 de
  carrera 12 · y el destino de `07-FRONT-NUEVO` (N-S4, nuevo aquí).

---

## 1 · Los cinco frentes (por naturaleza del trabajo)

### Frente A — Configuración compartida: se hace UNA vez y todas las pantallas la heredan
*Esto es exactamente «la configuración de lógica disponible para todas las pantallas».*

| ID | Qué falta | Evidencia del hueco | Resultado al cerrarlo |
|---|---|---|---|
| **A1** | Sacar los catálogos clínicos del `.js` a **archivo firmable** (`CATALOGOS/…`) + `generar-catalogos.js` → espejo `CATALOGOS.json` | umbrales viven en `motor.js:53-65` sin generador (no existe `generar-*.js` en la carpeta) | ML-10 completo + MT-08; el médico firma archivos, no código; suite exige regeneración idéntica |
| **A2** *(técnico + dato: la **captura** del diagnóstico pertenece a la pasada de ficha, no a esta)* | **Diagnóstico estructurado + semana derivada** en la ficha de síntesis (portar de carrera 12: `DIAGNOSTICOS`, `fechaEstimada`, `semanaDerivada`) | `proximaFechaControl` usa `indexOf` sobre `caso` (P-09); `fechaEstimada` = 0 | ML-01 a toda la jornada: próxima cita, recordatorios y semáforo derivan, no adivinan |
| **A3** | **Decisión N-S3b primero:** traer el módulo de mensajes (92 plantillas, marcadores, inocuidad) a esta carpeta o servirlo desde `12-AGENDA` | `agenda.html` solo tiene recordatorios | DEC-32 y plantillas disponibles en todas las pantallas que avisan |
| **A4** | Regla de la suite del libro: `CATALOGOS.json` regenerado = byte-idéntico (mismo patrón que `generar-maestro.js`) | ausente | el catálogo firmable no puede envejecer en silencio |

*Nota:* la fórmula HOMA (`/405`, `motor.js:383`) es **fórmula, no umbral** — no entra en
A1 salvo decisión del dueño.

### Frente B — La cola de 16 filas, una pantalla por pasada (protocolo S1 §3)
Orden = orden del registro (fuente única), **recomendado por riesgo**: primero
las que tocan lógica clínica viva (hoy, estacion, laboratorio, pendientes,
consulta, urgencia) y al final las de documento (CUMPLIMIENTO, HOJA). Hoy es la primera (y en su pasada cierra **G-02**: su
`S.equipoFuera` directo). `estacion` pasa de `aplicado → verificado` al cerrar **G-14**.
Cada pasada: auditar vs. los 35 patrones → aplicar → 4 planos → registrar con conteos →
libro en verde → nota.

### Frente C — Verificación dedicada por pantalla (el hueco de calidad)
Hoy las pantallas de la cola solo tienen el e2e genérico (4 checks por página). El
protocolo exige **unidad (si toca motor) · E2E · ruptura diseñada · documental**: cada
pantalla que suba a `verificado` debe entregar **su** suite de ruptura. Deuda viva:
G-14 (autosave de estacion).

### Frente D — Decisiones del dueño (orden corregido: **construir primero, firmar después**)
> Regla del dueño (2026-10-25): las firmas médicas y de aceptación **no bloquean** la
> construcción — son el producto de la entrega. Ver `../INVENTARIO-DECISIONES.md`:
> **§1** = 4 puntos estructurales con default (los únicos que condicionan cómo se
> construye) · **§2** = lo que el agente construye sin preguntar (incluye los N
> técnicos: N-S2, N-S3, N3, N4) · **§3** = el paquete de firmas que se activa con
> 18/18 ≥ verificado. Las decisiones clínicas (N1, N6, N7) viajan **dentro** del
> paquete de firmas, no antes de él.
- **N-S1** · ¿quién firma las transiciones del libro (auto con evidencia vs firma)?
  Sin ella, `auditado` no se usa a escala.
- **N-S2** · Ruptura del autosave: en la pasada de estacion (recomendado) o ya.
- **N-S3 / N-S3b** · Alcance del registro (uno por carpeta vs maestro) y hogar del
  módulo de mensajes (Frente A3).
- **N-S4 (nuevo)** · Destino de `07-FRONT-NUEVO`: memoria histórica o carpeta sujeta a
  cola — el `INDEX` raíz aún lo anuncia como «ronda completa» mientras la síntesis ya
  absorbió su lógica; el mapa debe elegir.
- **N1…N7** (carrera 12): se reparten — N3 (semilla) y N4 (horario como catálogo)
  **se construyen** aquí; N1, N6, N7 y la firma de catálogos **se firman** en el
  paquete §3 del INVENTARIO.

### Frente E — Extensión del mecanismo (para que «todas» sea literal)
- **E1 · Esquema del registro v2: `componentes[]`** (motor.js, config.js, front.css) con
  los mismos estados y evidencia — hoy el libro solo mira `.html` y el motor ya se tocó
  dos veces sin fila propia. Regla nueva en `pruebas-registro.js` + migración del JSON.
- **E2 ·** Ampliar registro y suites a `12-AGENDA-Y-MENSAJES` (AGENDA, FLUJOS) según §5
  del protocolo, con `path` relativos ya soportados.

---

## 2 · Orden sugerido (hitos con criterio de terminado)

```
Hito 1a · Esquema:  E1 (registro con componentes + huella) + autoauditoría de iteración
          ✅ HECHO (2026-10-25): registro v2 (18 pantallas + 3 componentes con sha256),
          `../autoauditoria.sh` (T1 y T2 en verde — número vivo en su salida), prueba de trampa:
          tocar config.js sin registrar ⇒ «MODIFICADO SIN REGISTRAR» ⇒ al restaurar, verde
Hito 1b · Catálogos:  A1 + A4 (+ suite del catálogo)
          termina cuando: ningún umbral clínico en .js · JSON al día
Hito 1c · Derivación:  A2 (diagnóstico/semana estructurados; su captura es pasada de ficha)
          termina cuando: ninguna próxima fecha por indexOf sobre texto
Hito 2 · Cola:  16 filas + 2 remates (hoy, estacion→verificado) con su suite por pantalla
          termina cuando: 18/18 ≥ verificado y cada una con ruptura propia
Hito 3 · Mensajes:  A3 tras N-S3b
          termina cuando: una pantalla de cita/recordatorio usa plantillas con examen
Hito 4 · Decisiones:  N-S1 (habilita auditado) · N-S2 · N4 · N1…N7 en su bandeja
          termina cuando: 0 decisiones N abiertas sin dueño ni fecha
Hito 5 · Alcance:  E2 (12-AGENDA) + INDEX/LEEME cuadrados al final de cada hito
```

## 3 · Definición de «terminado» (la meta de la pregunta, como chequeo)

1. **18/18 filas ≥ `verificado`**, 0 `pendiente`/`aplicado` colgados.
2. **Cero umbrales clínicos en código**: todo en catálogo firmable + espejo regenerable
   (ML-10/MT-08 en verde).
3. **Diagnóstico y semana estructurados** en toda ficha: ninguna derivación por
   `indexOf` sobre texto libre (ML-01).
4. **Registro cubre pantallas y componentes**; conteos en vivo siempre; versión S
   vigente en cada fila (anti-regresión cableada).
5. **Toda pantalla con sus 4 planos** y la ruptura propia en verde.
6. **0 decisiones N silenciadas**; N-S1 resuelta (el libro tiene dueño de transición).
7. **Mapa (INDEX + LEEME) cuadra** con el disco — la suite del libro lo exige para
   siempre.

## 4 · Qué NO falta (para no rehacer lo ya hecho)

Motor única puerta y validado en dos lados · estados derivados y conciliados · cierre de
alertas con firma B-013 · catálogos ya **estructurados** (falta sacarlos del `.js`) ·
suites desde disco · registro con evidencia y conteos vivos · anti-regresión por versión
cableada · auditoría de la propuesta con 14 cierres (Ronda S-1) · 201 checks en verde.

---

## 5 · Frente F — Autoauditoría en cada iteración (la regla del dueño, hecha ejecutable)

**Regla:** *en cada mínima iteración, el repositorio se autoaudiciona para registrar,
implementar e integrar cualquier avance.* Viabilizada en **tres niveles** — porque
«auditoría con hallazgos» en cada micro-edit sería inflación de documentos y latencia
insoportable; lo que sí es viable y se instaló:

| Nivel | Cuándo | Qué corre | Costo |
|---|---|---|---|
| **T1 · iteración** | cada guardado/pasada (`./autoauditoria.sh`) | sintaxis de todos los `.js` · suites de nodo (motor, atenciones, **libro**, agenda mensajes+reauditoria) · enlaces estáticos · **trampa de huella**: cualquier archivo de pantalla o componente modificado sin registrar ⇒ rojo | segundos |
| **T2 · transición** | antes de declarar `aplicado/verificado` (`--completo`) | T1 + todas las e2e con servidores propios (los levanta y mata) + conteos en vivo | ~minutos |
| **Ronda** | cuando T1/T2 fallan o cierra un hito | auditoría con hallazgos numerados y cierre (MG-05) — como la Ronda S-1 | por suceso |

**Trampa de huella (el corazón):** el registro guarda `sha256` de cada `.html` y de los
**componentes** (`motor.js`, `config.js`, `front.css` — E1): la regla G-01 («tocada sin
registrar») deja de depender de que alguien la mire y pasa a fallar sola.

**Límite honesto:** «integrar cualquier avance disponible» es **entre carpetas de este
repo** (lo que una carpeta aprende sube a S1 y el registro marca desactualizadas a las
que no lo absorbieron). No es un sincronizador con proyectos externos — eso sería otra
herramienta y otra decisión.

**MG-11 candidato a S2:** el patrón «autoauditoría T1 en cada iteración» se añade a la
lista de la síntesis cuando A1+A2 cambien el conjunto de patrones (subir a S2 con ese
mismo golpe, no aislado — la versión no se sube por un solo apéndice).