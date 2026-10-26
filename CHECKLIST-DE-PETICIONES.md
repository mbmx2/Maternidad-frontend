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
