# PROPUESTAS DE MEJORA DEL REPOSITORIO — reauditoría + optimización (2026-10-25)

> **Qué es:** la reauditoría ejecutada hoy con el mecanismo de autoauditoría, y las
> mejoras disponibles al repositorio completo, con ID (**ME-01…ME-18**) para que cada
> una se registre, se ejecute y se verifique igual que las pantallas. Cubre lo pedido
> por el dueño —(1) versionado rastreable de cada iteración del frontend, (2) gestión
> de las fuentes de verdad, (3) estructura de presentación por pantalla— y añade lo que
> esta reauditoría encontró. Cada mejora declara su verificación: nada entra aquí como
> deseo.

---

## 0 · Reauditoría ejecutada (salida de comandos, no opinión)

```
*(cortes fechados de esa pasada — el vivo siempre está en `./autoauditoria.sh`)*
./autoauditoria.sh --completo        → 329 PASS · 0 FALLO(S)   (T2 de ese corte)
HUELLAS.txt                          → 171 selladas: 169 coinciden; INDEX y LEEME difieren
                                       (edición legítima de obra propia)
cobertura de HUELLAS                 → 0 entradas de 12-FRONT / 12-AGENDA · 71 archivos
                                       de obra propia ACTUALES sin sellar
refresco de HUELLAS                  → refrescar-desde-la-maestra.sh inutilizable aquí (sin ../GUIAS)
motores vivos                        → 5 archivos / 3 linajes: puente (07), motor (10=11,
                                       copias idénticas), motor (sintesis), mensajes (agenda)
hojas de estilo                      → 3: front.css sintesis (100 selectores) ·
                                       front.css 07 (92, ¡solo 32 en común pese al mismo
                                       nombre!) · estilo.css agenda (8,9 KB)
meta de versión en pantallas         → 0 de 18 (la rastreabilidad vive solo en el JSON)
decisiones N dispersas               → en 4 documentos; la BANDEJA central no las tiene
```

**Lectura:** el mecanismo interno (suites, registro, huella) está sano; la deuda está en
**los bordes**: integridad total del repo, unificación de activos y trazabilidad dentro
del propio artejo.

---

## 1 · Versionado y trazabilidad de iteraciones (pedido 1)

| ID | Mejora | Por qué | Verificación |
|---|---|---|---|
| **ME-01** | **`VERSIONES.md` por carpeta de frontend**: una entrada por iteración con `id · fecha · síntesis (Sx) · huella del motor · suites con las que se construyó · flujo (protocolo de 7 pasos) · decisiones con las que se construyó (N-xx)` | Hoy la historia se reconstruye leyendo 4 docs; el dueño pregunta «bajo qué lógica y flujo se construyó» y la respuesta no está en un solo lugar | la suite del libro exige que `VERSIONES.md` cite la Sx vigente |
| **ME-02** | **Meta en cada pantalla**: `<meta name="sintesis" content="S1">` + `<meta name="motor" content="sha256:…">` en los 18 HTML | la rastreabilidad debe viajar **dentro del artejo**: copias una pantalla suelta y sigue diciendo de qué síntesis y motor viene | regla nueva en `pruebas-registro.js`: meta presente y = registro |
| **ME-03** | **Chip de versión en la barra** («S1 · 25-10») visible en cada pantalla, no solo en el JSON | quien abre el navegador ve la versión sin inspeccionar nada | e2e de páginas: barra contiene la Sx vigente |
| **ME-04** | **Registro v3**: por fila, campo `flujo` con los pasos ①-⑦ ejecutados y su fecha | «qué flujo de trabajo la construyó» deja de ser memoria y queda en el libro | validador: fila `verificado` exige flujo completo |

*Base ya construida (no repetir):* el registro v2 ya guarda síntesis por fila + huellas
sha256 + conteos en vivo; ME-01…04 son su continuación natural, no su reemplazo.

## 2 · Fuentes de verdad y su gestión (pedido 2)

**ME-05 · Clasificar y poner regla por clase** (hoy se confunden):

| Clase | Ejemplos | Regla |
|---|---|---|
| **Espejo de maestra** | `01-DIBUJOS`…`05-LEY` (refrescables) | **Nunca editar aquí**: el refresco lo borra; cambios → maestra |
| **Verdad de obra** | `INDEX`, `LEEME`, `COMPARATIVA`, `CONSTRUCCION`, `BANDEJA`, auditorías y planes | Editable + autoauditoría T1/T2; huellas propias (ME-06) |
| **Verdad máquina** | `MENSAJES-MAESTRO.json`, futuro `CATALOGOS.json`, `SINTESIS-REGISTRO.json` | **Solo generador**; suite de idempotencia (regenerar ≠ cambiar) |
| **Decisiones** | N-S1…N-S4, N1…N7 | Solo en la **BANDEJA** con dueño y estado; los demás docs citan por ID (ME-07) |

| ID | Mejora | Evidencia del hueco |
|---|---|---|
| **ME-06** | **HUELLAS por clase**: sellar espejos tal cual y crear `huellas-propias.sh` local (obra propia, **excluye `node_modules`**) | 71 archivos sin sellar + 2 desfasadas legítimamente + sin maestra no hay refresco |
| **ME-07** | **BANDEJA central** de decisiones: volcar N-S1…N-S4 y N1…N7 con dueño/fecha/estado; los 4 docs que hoy las guardan pasan a citarlas | dispersión en 4 archivos verificada por grep |
| **ME-08** | Ampliar la regla «JSON = generado» a `CATALOGOS.json` (Hito 1b/A1) con prueba de idempotencia (ya existe el patrón: `generar-maestro.js`) | agenda lo cumple; sintesis aún no tiene generador |

## 3 · Estructura de presentación del frontend (pedido 3)

| ID | Mejora | Evidencia del hueco |
|---|---|---|
| **ME-09** | **Un solo sistema de diseño**: los dos `front.css` comparten nombre y **solo 32 selectores en común** — dos sistemas distintos con el mismo nombre es una bomba al copiar pantallas entre carpetas; unificar a una raíz + tokens (colores, chips, relojes 30/45, 1024) y decisión del dueño de cuál hereda | md5 distinto + comm = 32/100 vs 92 |
| **ME-10** | **Suite de invariantes de presentación**: hoy el e2e exige 4 cosas por página (riel, banda, h1, sin errores); ampliar: barra completa (marca/pantalla/reloj con fecha real), banda **persistente**, chips siempre color+palabra, sin `prompt`/`alert`, h2 sin salto de nivel, `meta` de versión (ME-02) | los checks actuales están en `pruebas-e2e.js`; los nuevos se agregan ahí y suben los conteos registrados |
| **ME-11** | **Patrón de plantilla único** por pantalla (barra · riel · zona con h1+subtítulo · contenido · banda · pie) — `12-AGENDA` usa pestañas y estilos propios; estandarizar el esqueleto para que toda pantalla nueva nazca igual | divergencia visible entre carpetas |
| **ME-12** | Impresión/imprimibles coherentes (hoja de traspaso y veredicto con las mismas reglas `@media print`) | hoy cada carpeta improvisa |

## 4 · Más mejoras disponibles (halladas en esta reauditoría)

| ID | Mejora | Por qué |
|---|---|---|
| **ME-13** | **Economía de motores**: (a) matar ya el duplicado 10/11 (una sola fuente — mismo md5, dos copias); (b) **suite de paridad de API** mínima para los 3 linajes (`estadoDe`, `paciente`, `guardar`, `nacerAlerta`…) — *no* fusionarlos hoy (riesgo > valor hasta que 07 y las pruebas decidan su destino) | 5 archivos / 3 linajes verificados |
| **ME-14** | **Resolver N-S4** (destino de `07-FRONT-NUEVO`): memoria histórica o sujeto a cola — el `INDEX` anuncia hoy la ronda 2 como «completa» mientras la síntesis absorbió su lógica: dos verdades en el mapa | dispersión + contradicción de mapa |
| **ME-15** | **Umbral de runtime**: si T2 pasa de ~5 minutos ⇒ sharding de e2e por carpeta (hoy ~1-2 min: medido, no urgente) | prevenir el día en que «cada iteración» sea lenta |
| **ME-16** | Declarar en toda huella futura la exclusión de `node_modules` (3 carpetas lo tienen ya) | sellar basura de dependencias = huellas inservibles |
| **ME-17** | **Cola por riesgo** (ya en PLAN): lógica clínica viva primero; `calculadoras.html` (pantalla activa) entra cuando le toque — no saltársela por estar abierta | disciplina de cola |
| **ME-18** | **Hub documental único** en el `LEEME` raíz con todas las piezas nuevas (`AUDITORIA-SINTESIS`, `PLAN`, `MODELO-REPLICABLE`, `PROPUESTAS-DE-MEJORA`) | hoy el raíz lista hasta un punto del tiempo pasado |

---

## 5 · Prioridad (impacto × esfuerzo) y orden propuesto

- **Ya mismo (minutos):** ME-16 (declarar exclusión) · ME-18 (hub) · ME-13a (duplicado 10/11).
- **Siguiente iteración de síntesis (con Hito 1b):** ME-08 (con A1) · ME-06 (huellas locales).
- **Antes del Hito 2 (cola grande):** ME-02 · ME-03 · ME-10 (rastreabilidad visible + invariantes: cada pantalla de la cola nace ya auditada en presentación).
- **Con decisiones del dueño:** ME-09 (cuál CSS hereda) · ME-07 (BANDEJA) · ME-14 (07).
- **Cuando el repo lo pida:** ME-01/04 (manifiesto de iteración completo al cerrar S1→S2) · ME-15 (umbral) · ME-11/12 (plantilla e impresión unificados al refactor de presentación).

## 6 · Qué NO hacer (límites declarados)

- **No fusionar los 3 motores** hasta que la cola y el destino de 07 estén resueltos
  (ME-13a sí: eliminar el duplicado literal).
- **No subir S2 por un apéndice** (regla ya instalada: los cambios de patrón viajan juntos).
- **No sellar `node_modules`** ni editar espejos de maestra localmente.
- **No prometer** en esta propuesta conteos que aún no existan: los números nuevos
  (runtime, selectores) se vuelven a medir al ejecutar cada mejora.

## 7 · Verificación de esta ronda (corte fechado — el vivo manda `./autoauditoria.sh`)

```
./autoauditoria.sh               → 149 PASS · 0 FALLO(S)   (T1 con reglas ME-02/03)
./autoauditoria.sh --completo     → 333 PASS · 0 FALLO(S)   (T2 completo)
Afirmaciones re-medidas:          92 plantillas · 40 semanas · familias 14/16/6/24/18/14
                                  · 9 diagnósticos · 6 rondas · 35 patrones (13+12+10)
                                  · registro 18 pantallas + 3 componentes (100% con huella)
                                  · 30 hallazgos P-01…P-30 · 18 mejoras ME (únicos)
                                  · HUELLAS: 169/171 coinciden · 2 desfasadas (INDEX/LEEME)
Trampa de pantalla nueva:         _nueva.html ⇒ 3 FAIL al instante · retirada ⇒ verde
Trampa de huella:                 tocar sin registrar ⇒ «MODIFICADO SIN REGISTRAR»
```

## 8 · Estado real de las mejoras (libro de honestidad, 2026-10-25)

| Estado | Mejoras | Qué significa |
|---|---|---|
| ✅ **Ejecutadas hoy** | **ME-02** (meta `sintesis` en las 18 pantallas + regla en la suite) · **ME-03** (chip con la versión en la barra + regla) · **ME-13a** (guardia de deriva 10=11 en `autoauditoria.sh` — alcance: detección, no fusión) · **ME-18** (hub documental en LEEME raíz) | la rastreabilidad vive dentro del artejo y la suite la exige |
| ✅ **Instaladas como proceso** | **ME-17** (cola por riesgo, escrito en el PLAN §3) | |
| ⬜ **Pendientes** | **ME-01 · ME-04 · ME-05 · ME-06 · ME-07 · ME-08 · ME-09 · ME-10 · ME-11 · ME-12 · ME-13b · ME-14 · ME-15 · ME-16** | **4 de 18 ejecutadas (22%)**: eran propuesta, no hechos — este es el porcentaje verdadero detrás de la sospecha del dueño |

*Regla para el resto: cada mejora pasa de ⬜ a ✅ solo con su evidencia (comando +
conteo) en esta misma tabla — el mismo criterio que el registro de pantallas.*


## 9 · Inventario honesto (corte medido 2026-10-25 · T1 151 / T2 337)

**Sí disponible (la máquina de construir correctamente):** 9 suites · autoauditoría en
3 niveles con trampas (huella, meta, chip, deriva, pantalla nueva) · libro con conteos
vivos · 35 patrones con prueba asignada · dos motores probados (jornada de 18 +
catálogo de 92) · molde de pantalla · AGENTS.md como contrato · auditorías R1–S1 con
cierres · MODELO replicable.

**Medido que FALTA para una construcción completa bajo el estándar:**
- **Ejecución:** 2/18 pantallas tocadas (1 verificada) · **12 de 35 patrones**
  atribuidos en filas · 16 en cola.
- **Recursos:** `acceso`/PIN (R-26) **no existe** · módulo de mensajes **no integrado**
  en síntesis (vive en la otra carpeta) · calculadoras: **2 de 18** funcionales ·
  laboratorio: **9 analitos** (R-38 pide más) · `fechaEstimada`: **0** en fichas ·
  próxima fecha aún por `indexOf` · catálogos clínicos sin archivo firmable ni espejo
  en síntesis · **3 sistemas de estilos**.
- **Decisiones abiertas: 11** (N-S1…N-S4 + N1…N7) que bloquean firmas y verificados.
- **Costura:** **0** código de backend — `COMUNICACION.md` es contrato sin contra-parte
  ejecutable: el producto real (servidor, PIN real, envíos) está **fuera de este repo
  por diseño** (papel usable, DEC-19).
