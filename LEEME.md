# LEEME — carpeta exportable de diseño del frontend (Maternidad)

> **Qué es esta carpeta:** una **copia sellada y portátil** de toda la construcción de
> los dibujos HTML del software y de toda la lógica de diseño que los gobierna, armada
> para que usted pueda trabajar en el frontend **sin el ruido del resto del proyecto**:
> sin código Python, sin pruebas, sin herramientas de verificación, sin actas de otros
> roles y sin gestión. Es su mesa de trabajo de diseño; la sala de máquinas se quedó
> atrás.
>
> **Qué NO es:** no es el software, no guarda datos y no hay pacientes reales. Es
> **papel de diseño**: la capa barata donde se itera mil veces sin romper nada (su
> acuerdo H-006), de donde lo estabilizado baja después al programa real.
>
> **Fecha de armado:** 2026-10-24 · **commit de origen:** `ffe19eb` · **última
> actualización:** 2026-10-25 · **archivos: 166** (verifique con `wc -l < HUELLAS.txt`).
> **Dos tipos de casa conviven aquí:** (1) las carpetas `01`–`05` son espejo de la maestra —
> el refresco las recrea desde `GUIAS/`; (2) la familia `06`, `07`, `08` y los archivos de
> raíz (`CONSTRUCCION`, `COMPARATIVA`, `AUDITORIA-FUENTES`, `BANDEJA-DECISIONES`) son
> **obra propia nacida aquí**: el refresco no las borra ni las trae — se portan de vuelta a
> la maestra cuando se estabilicen (regla 5). El buzón local (H-050…H-063) y la bitácora
> fueron portados a `GUIAS/` el 2026-10-25. Si la maestra avanzó después del sello, esta
> carpeta está detrás — véalo en «Cómo refrescar».

## Estado general — checkpoint fijo (2026-10-25)

- **Integridad:** `sha256sum -c HUELLAS.txt` → **171 archivos** · buzón **66 hallazgos**
  (perdidos 0) · bitácora `CONSTRUCCION.md` **B-001…B-028** · `node --check
  07-FRONT-NUEVO/puente.js` en verde.
- **Familias:** `01`–`05` espejo de la maestra · `06` fuente de verdad (5 archivos) ·
  `07` frontend ronda 2 (30 piezas: 21 pantallas + 2 índices + 4 propuestas + 3 recorridos) · `08` flujos (7) · raíz (AUDITORIA ·
  BANDEJA · COMPARATIVA · CONSTRUCCION · INDEX).
- **Checkpoint de lógica: v1.2** en `02-LOGICA-DE-DISENO/CHECKPOINT-LOGICA.md` — huellas
  maestras recalculadas, método de conjuntos declarado y verificado, portado a `GUIAS/`.
- **Síntesis narrativa del bloque:** `CONSTRUCCION.md` **B-028** — qué se ha hecho, qué
  está implementado, por qué, cómo se presenta, la lógica y el flujo actual.
- **Lo único que espera su frase para seguir:** la BANDEJA (prioridades I–III) y la
  entrevista con el kit.

## Cómo usarla

1. Copie esta carpeta a donde quiera trabajar. Funciona sola: no necesita el proyecto.
2. Verifique que llegó intacta: dentro de la carpeta, `sha256sum -c HUELLAS.txt`
   (debe listar «OK» en todos los archivos; si algo falló en el camino, vuelva a copiar).
3. Abra en el navegador `01-DIBUJOS/EDICION/PROPUESTAS/INDICE.html` — ahí están los
   dibujos completos del software como si estuviera terminado.
4. Para saber qué dice cada dibujo y de dónde sale su regla, abra `INDEX.md`
   (el mapa: cada página ↔ su lógica ↔ su contrato ↔ su requisito).

## Las cinco reglas de la casa (escritas para no olvidarse)

1. **Esto es papel, no el producto.** El software real es el programa de escritorio
   offline; los HTML son dibujos descartables que sirven para decidir (DEC-19 de la ley).
   Si algún día usted decide que el producto debe ser web, eso es una decisión roja que
   se escala antes de construir — no se decide en una carpeta.
2. **La maestra manda.** Las casas canónicas de cada documento viven en el proyecto
   (`GUIAS/`, `ACTA_CONSTITUTIVA.md`). Esta carpeta es un espejo fechado: si algo se
   contradice, gana la maestra, no la copia.
3. **Nada se construye sin doble veredicto.** Ningún dibujo se vuelve software hasta que
   dos personas del oficio le pongan veredicto (apruebo / apruebo con cambios / no sirve),
   con el kit de entrevista de `04-METODO-Y-ACEPTACION/KIT-ENTREVISTA.md`.
4. **La ley copiada es copia fechada.** `05-LEY/` trae la ley del proyecto del día del
   armado. La ley viva se lee en la maestra; aquí sirve para no perder la referencia.
5. **Lo estabilizado se porta de vuelta.** Cuando un dibujo o una reglas queden
   firmes, se llevan a la maestra (o se dictan allá) — así el trabajo de esta carpeta
   no se pierde ni nace una segunda verdad.

## El orden de lectura para construir frontend sin ruido

Un bloque por sesión, en este orden — es el mismo que manda la orden de trabajo de
prototipos, recortado a lo que viaja aquí:

1. `02-LOGICA-DE-DISENO/DOCTRINA-DE-DISENO.md` — los pilares y sus números: la medida de todo.
2. `02-LOGICA-DE-DISENO/REQUISITOS-DEL-DISENO.md` — qué se presenta en cada pantalla, por qué y cómo.
3. `02-LOGICA-DE-DISENO/PRESENTACION-EN-PANTALLA.md` — la ventana real manda (1024×660 mínimo).
4. `02-LOGICA-DE-DISENO/PRESENTACION-DE-CONTENIDO.md` — la mecánica de entrega de mensajes.
5. `02-LOGICA-DE-DISENO/SISTEMA-DE-ALERTAS.md` — el mayor valor del software, de punta a punta.
6. `03-CONTRATOS/` — la lógica total de cada módulo (léase el `LEEME.md` de ahí).
7. `01-DIBUJOS/EDICION/PROPUESTAS/INDICE.html` — los dibujos, empezando por los
   recorridos por rol (`PROPUESTAS/RUTAS/`): la forma de presentar 33 páginas es
   presentar la jornada.
8. `04-METODO-Y-ACEPTACION/ACUERDOS.md` y `HALLAZGOS.md` — la historia: no repita
   errores ya corregidos ni contradiga acuerdos ya cerrados.

## Qué NO hay aquí, y dónde vive

El código del producto (`nucleo.py`, `app.py`), las pruebas, las herramientas de
verificación, el estado de gestión, las actas de backend/sync/verificación y los
prototipos viejos declarados desactualizados (`Maternidad_PROTOTIPOS/`) se quedaron
fuera a propósito: son ruido para el trabajo de diseño. Los hallazgos del buzón y los
acuerdos viajan aquí como copia; el buzón vivo y las herramientas del dueño
(`DUEÑO-GOBIERNO.md`, `DUEÑO-RECURSOS.md`, `DUEÑO-LEXICO.md`) siguen en el proyecto.
Algunas guías traen enlaces internos a la estructura original de `GUIAS/`; en esta
carpeta el mapa es este LEEME y el `INDEX.md`.

## Cómo refrescar (cuando la maestra avance)

Estando **dentro del proyecto**, corra `./refrescar-desde-la-maestra.sh` desde esta
carpeta: **vuelve a copiar las cinco carpetas (`01`–`05`) desde la maestra** —las familias
`06`/`07`/`08` y los archivos de raíz no se tocan: son obra propia— y regenera
`HUELLAS.txt`. Copiada la
carpeta fuera del proyecto, el script se niega con un mensaje claro: el refresco se
hace siempre desde la maestra. Después de refrescar, lea de nuevo este LEEME: la fecha
y el commit del sello cambian.

## Índice de la carpeta

- `INDEX.md` — el mapa de trazabilidad de cada dibujo.
- `HUELLAS.txt` — la prueba de integridad de la copia (`sha256sum -c HUELLAS.txt`).
- `CONSTRUCCION.md` — la bitácora única de nuestras interacciones: qué se decidió, cuándo,
  en qué estado queda y hacia dónde va, con sus reglas en la cabecera (el «cuándo» vive
  aquí; el «qué» vive en `06-FUENTE-BACKEND/`).
- `refrescar-desde-la-maestra.sh` — el refresco de un renglón.
- `01-DIBUJOS/` — las tres familias: `EDICION/PROPUESTAS/` (lo que vendrá, 33 archivos
  con su `estilo.css`, índice y 3 recorridos por rol; más `maqueta.js` — el puente
  simulado que hace usable el papel sin tocar lógica real, hoy cableado en TABLERO) ·
  `EDICION/` (las 24 réplicas
  C-01…C-25 de lo de hoy, con su índice y su generador) · `FICHAS/` (las 24 fichas
  imprimibles con su mapa).
- `02-LOGICA-DE-DISENO/` — las 8 guías de lógica más flujos, checkpoint y contraste.
- `03-CONTRATOS/` — el mapa de implementación y los 7 contratos de módulos.
- `04-METODO-Y-ACEPTACION/` — método de evaluación, análisis de pantallas, orden de
  trabajo, kit de entrevista, plantilla de revisión, acuerdos y buzón de hallazgos.
- `05-LEY/` — la ley del proyecto (`ACTA_CONSTITUTIVA.md`) y el acta del frontend.
- `06-FUENTE-BACKEND/` — la fuente de verdad del backend: `FUENTE-DE-VERDAD.md` (el menú
  de los 17 módulos con su estado, el formato de diez campos y las ocho reglas) y
  `MOD-<módulo>.md` (la especificación construible: qué es el módulo, su esqueleto, sus
  relaciones con otros módulos, su capa de datos, sus pantallas, y cada función con porqué,
  cómo en humano, relaciones, datos y par frontal de interfaz) — lo que un agente
  constructor lee para replicar el software sin adivinar. Incluye `REQ-FLUJO.md`
  (FL-01…FL-17: los requerimientos de interacción del flujo declarado, del paso del día a
  la estructura de código) y `COMUNICACION.md` (la costura con el frontend: estructura del
  backend, puente maqueta/real, catálogo de operaciones y eventos). Incluye
  `REQUISITOS-FRONT-BACK.md` (26 exigencias de pantalla y 22 de fondo, derivadas de los
  flujos y actualizadas con la ronda, con su casa y su estado).
- `07-FRONT-NUEVO/` — **la ronda completa del frontend, desde cero** (2026-10-25): su
  `LEEME.md` (manifiesto y errores descartados), `front.css` (sistema de diseño),
  `puente.js` (puente simulado que lo hace usable) y **25 pantallas y recorridos** — 21 de
  jornada + `CUMPLIMIENTO.html` (índice con el cumplimiento RF por RF) + 3 rutas por rol —,
  todos con banda de veredicto.
- `COMPARATIVA.md` — la comparación de las dos rondas: la lógica de flujo de cada una, la
  lista de lo que falta en la ronda 2, y los 10 puntos que se rescatan del flujo actual.
- `08-FLUJOS/` — todos los flujos de la documentación dibujados (la norma del día, los 8
  cortes, los 17 FL y los circuitos lógicos) con su `INDICE.html` comparativo de cobertura —
  la base para el próximo frontend.
- `AUDITORIA-FUENTES.md` — la auditoría viva de todas las casas de verdad: método, estado
  por fuente, comandos de reverificación y plan de reparación (ronda: 2026-10-24).
- `10-PRUEBA-ENFERMERIA/` y `11-PRUEBA-MEDICA/` — entregables de sesión por rol (6+6
  pantallas navegables con el día de 18 pacientes y motor de eventos; obra propia).
- `AUDITORIA-ADVERSARIAL-PRUEBAS.md` — la auditoría adversarial de la lógica del repo
  con la comparativa 10/11 vs. lo ofrecido (30 hallazgos P-01…P-30 / H-067…H-096).
- `12-FRONT-SINTESIS/` — ronda 3 sintetizada (18 pantallas, un solo motor, estados
  derivados y persistentes, cierre de alertas firmado) con `pruebas/` en verde.

  **Protocolo de síntesis sumatoria gradual (S1):** `SINTESIS-SUMATORIA.md` (35 patrones
  ML/MT/MG) · `SINTESIS-REGISTRO.json` (libro-verdad por pantalla, huella sha256) ·
  `pruebas/pruebas-registro.js` (suite del libro). **Piezas del ciclo:** su
  `AUDITORIA-SINTESIS.md` (Ronda S-1) · `PLAN-DE-IMPLEMENTACION.md` (5 frentes + hitos) ·
  `../autoauditoria.sh` (T1 por iteración / T2 por transición) · y, en la raíz,
  `MODELO-REPLICABLE.md` (manual, en 12-AGENDA) y `PROPUESTAS-DE-MEJORA.md` (ME-01…ME-18).
- `12-AGENDA-Y-MENSAJES/` — carrera dedicada de continuidad (v2): batería de 92
  plantillas en 6 familias + 40 semanas, agenda con disponibilidad, editor de
  plantillas, dedupe con clave; su `AUDITORIA-ADVERSARIAL.md` tiene 6 rondas y sus
  `pruebas/` suman 102 checks en verde.
