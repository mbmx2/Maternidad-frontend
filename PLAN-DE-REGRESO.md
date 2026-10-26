# PLAN DE REGRESO — dos frentes: el 60% del libro de honestidad y el hogar del software

> **Qué es:** los pasos verificados hoy (2026-10-26) para (1) llevar
> `PROPUESTAS-DE-MEJORA.md` §8 del 22% al 60% y (2) regresar este trabajo a
> `/home/agente/Documentos/Maternidad/`, donde vive el producto que le da valor y desde
> donde se genera el software. Cada cifra trae el comando que la produce; los totales
> vivos no se escriben aquí (regla R1): el vivo es `./autoauditoria.sh`.
>
> **Por qué este orden:** congelar lo hecho → volver al hogar → ejecutar las mejoras y la
> obra **desde allí**. Así las huellas, los espejos y las suites nacen una sola vez, en el
> lugar donde van a vivir — el refresco desde la maestra solo funciona dentro del proyecto,
> así que hacerlo al revés obligaría a rehacer.

---

## 0 · Verificaciones de partida (comandos, no memoria)

- **Meta del 60%:** `PROPUESTAS-DE-MEJORA.md` §8 declara **18 mejoras y 4 ejecutadas
  (22%)**. El 60% de 18 = 10.8 → hacen falta **11 ejecutadas (61.1%)**; con la base de 4,
  **faltan 7**. (El indicador K-09 de `KPIS-Y-DOD.md` dice «5 de 18» porque cuenta ME-17,
  instalada como proceso; el plan usa la cifra conservadora del libro: faltan 7.)
- **El hogar existe y está vivo:** `/home/agente/Documentos/Maternidad/` → `app.py`
  (133,966 bytes) y `nucleo.py` (143,651 bytes); `find pruebas -name 'test_*.py'` = **109
  pruebas**; `git log --oneline | wc -l` = **143 commits**; `ESTADO.md` = gate y lint
  verdes al 2026-10-23, enmienda v4.2.
- **Este repo vive FUERA de ese hogar:** `ls ../GUIAS` → no existe; el
  `refrescar-desde-la-maestra.sh` de esta carpeta se niega a correr («esta carpeta está
  copiada fuera del proyecto»). Allá, `git ls-files FRONTEND` = **0**: la copia hermana no
  está versionada por el git del proyecto.
- **Las dos carpetas `FRONTEND/` divergieron** (`diff -rq`): solo aquí hay
  `06-FUENTE-BACKEND`, `07-FRONT-NUEVO`, `08-FLUJOS`, `12-FRONT-SINTESIS` (V4) y toda la
  gobernanza; solo allá hay `09-PROPUESTAS-FUNCIONALES`, `FLUJOS-LOGICOS.md` y
  `favicon.ico`; los espejos `01-05` difieren en 3/5/3/3/0 archivos y `12-AGENDA-Y-MENSAJES`
  difiere en 11.
- **Congelado pendiente:** `git status --short | wc -l` = **50** archivos sin commitear
  aquí (2 commits). Allá: 14 sin commitear y **22 filas FND en ⬜** (de 128), Fase 7.12 y
  7.13 sin empezar, DEMO y W-01…W-23 pendientes de humano, Fase 8 bloqueada.
- **Obra pendiente en este repo:** `CHECKLIST-MAESTRO.md` = 79 casillas → **45 hechas ·
  14 a medias · 19 pendientes · 1 declinado** = **33 sin cerrar** (contado hoy tras
  poner al día el maestro: la agenda se reconstruyó a las 22:00 bajo DoD v2).
- **Ya no es deuda:** los calendarios (0 campos de fecha sin calendario en las 18) y la
  integración de la agenda en el frontend (92 plantillas, cancelaciones, huecos, dedupe)
  — ambos cerrados con evidencia hoy. **Bajo DoD v2: 1 de 18** (la agenda); faltan 17.

---

## 1 · Fase 0 — Congelar (aquí, antes de mover nada)

1. Correr `./autoauditoria.sh` y `./autoauditoria.sh --completo` en verde como corte.
2. Commit de los 49 archivos con mensaje de estado — es el punto de retorno si algo sale
   mal en el merge. *No se ejecuta sin tu orden: commitear solo cuando tú lo pides.*
3. Nada se mueve todavía.

## 2 · Fase 1 — El regreso al hogar (pasos, en orden)

1. **Confirmar el destino** (decisión tuya; default recomendado:
   `/home/agente/Documentos/Maternidad/FRONTEND/` — es la copia que el propio script de
   refresco llama «proyecto»).
2. **Merge con `diff -rq` a la vista, no a ciego:** copiar lo que solo existe aquí
   (`12-FRONT-SINTESIS`, `06/07/08`, gobernanza, suites de agenda con `pruebas/`),
   conservar lo que solo existe allá (`09-PROPUESTAS-FUNCIONALES`, `FLUJOS-LOGICOS.md`,
   `favicon.ico`); para los 11 archivos divergentes de la agenda y los de los espejos:
   gana la versión cuya suite esté en verde (obra propia) o la maestra (espejos).
3. **Refrescar desde adentro:** `./refrescar-desde-la-maestra.sh` dentro del proyecto
   (ahora sí corre) → los espejos `01-05` se realinean con `GUIAS/`. Si cambia algo, eso
   prueba que había divergencia local ilegítima en espejos (los espejos no se editan aquí).
4. **Volver a verde allá:** llevar `autoauditoria.sh` y sus suites, y correr T1 y T2 **en
   el hogar** — esa es la puerta de cierre del regreso.
5. **Este repo queda como archivo** con su git (2 commits): no se borra; es la evidencia
   de la etapa y el histórico de la discusión.
6. **Portar lo estabilizado a `GUIAS/`** (regla 5 del LEEME): lo que ya esté firme —
   modelo de mensajes, DoD v2, criterios de medición — se lleva a la maestra con tu visto
   bueno sobre qué entra, para que no queden dos verdades.

## 3 · Fase 2 — Del 22% al 61% (las 7 mejoras, en este orden)

1. **ME-16** = excluir `node_modules` de toda huella futura (minutos). Hoy la exclusión
   solo está escrita en `.md`; ningún script de huellas la aplica.
2. **ME-06** = crear `huellas-propias.sh` que selle la obra propia con esa exclusión.
   Hoy `HUELLAS.txt` tiene 171 líneas y **0** cubren `12-FRONT`/`12-AGENDA`.
3. **ME-08** = la prueba de idempotencia del catálogo **ya existe y pasa**
   (`pruebas-registro.js:66`, «espejo CATALOGOS.json idéntico al regenerar»; regenerado
   hoy, md5 idéntico). Solo falta marcarlo en §8 con su salida: evidencia antes que cifra.
4. **ME-05** = clasificar las fuentes de verdad en 4 clases con su regla y meter la regla
   en T1. Se completa **después del regreso**: exige la maestra al lado.
5. **ME-04** = registro v3 con campo `flujo` ①-⑦ con fecha por fila. Hoy **0 de 18**
   filas lo traen; el validador exige flujo completo para `verificado`.
6. **ME-10** = ampliar la suite de presentación (barra completa, banda persistente, chips
   con color y palabra, sin prompt/alert, h2 sin salto, meta de versión).
7. **ME-13b** = suite de paridad de API mínima entre los 3 linajes de motor (`estadoDe`,
   `paciente`, `guardar`, `nacerAlerta`). **Sin fusión** — límite §6 del libro.

Cada una pasa de ⬜ a ✅ en §8 solo con comando + conteo (su propia regla). Al cierre:
**11 de 18 = 61.1% ≥ 60%**. De paso se concilia K-09 (dice 5) con §8 (dice 4).

*Después, rumbo a 100%:* ME-07 = bandeja central de decisiones · ME-09 = cuál hoja de
estilo hereda (tu decisión) · ME-14 = destino de `07-FRONT-NUEVO` (tu decisión, ya con
propuesta D-4) · ME-01/ME-11/ME-12 = manifiesto de iteración, plantilla e impresión
unificadas, al refactor de presentación · ME-15 = sharding solo si T2 pasa de ~5 minutos
(hoy ~1-2).

## 4 · Fase 3 — La obra que falta (ya en el hogar)

- Los **33 renglones sin cerrar del maestro**: las **17 pantallas restantes** bajo DoD v2
  (1 de 18 ya cerró: la agenda) · reescritura del lenguaje con tus frases (hoy **1 de 25**
  frases vive en HTML activo: «analito») · recorrido guiado pantalla por pantalla (hoy
  **1 análisis**: `ANALISIS-ATENCIONES.md`) · tus **12 puntos de crítica** (el de agenda
  ya cerró; restan 11) · los **4 flujos nuevos** · el tour 1 a 1 del bloque 7. Siempre
  con los 4 planos, la cola por riesgo (ME-17) y T1 tras cada cambio / T2 antes de
  declarar estado.
- **Lo que ya no entra en esta fase** (cerrado hoy con evidencia): calendarios (0 campos
  de fecha sin calendario en las 18) y la integración de la agenda (92 plantillas +
  cancelaciones + huecos + dedupe en `agenda.html`).

## 5 · Fase 4 — Generar el software (allá)

- El producto tiene **22 filas FND abiertas** (FND-052, 089-092, 107, 122, 127, 134, 146,
  170-177, 179-180, 184-185), Fase 7.12 y 7.13 sin empezar, y DEMO + W-01…W-23
  pendientes de humano; 109 pruebas, lint 12/12, gate verde al 2026-10-23.
- **Protocolo de allá** (distinto del nuestro): reclamar la fila en `ESTADO.md` → test
  primero → verde → commit → fila ✅. Nuestro valor entra como diseño y reglas: el HTML es
  papel de decisión, la demo real del producto es la ventana del programa (DEC-19).
- **Las decisiones que solo tú das** (D-1…D-4 del inventario + N-S1…N-S4 y N1…N7)
  desbloquean el paquete de firmas, que se abre con 18/18 ≥ verificado.

## 6 · Límites que no se tocan

- No fusionar los 3 motores · no sellar `node_modules` · no editar los espejos `01-05` a
  mano (manda la maestra) · no subir la versión de síntesis por un apéndice · no borrar
  este repo hasta que el hogar quede en verde.

## 7 · Riesgos y amortiguadores

- **El merge pierde una versión mejor:** se hace con `diff -rq` a la vista; gana la que
  tenga su suite en verde; el commit de la Fase 0 es el punto de retorno.
- **El refresco borra trabajo de espejos:** si pasa, ese trabajo no era legítimo aquí (los
  espejos no se editan); se realinea desde la maestra.
- **Dos verdades durante la transición:** un solo lado manda por archivo — el hogar; este
  repo solo archiva.
