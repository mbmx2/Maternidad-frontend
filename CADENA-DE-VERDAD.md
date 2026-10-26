# CADENA DE VERDAD — quién manda cuando dos libros dicen distinto

> **Qué es:** la precedencia escrita en un solo lugar, pedida como **RQ-A** en la
> evaluación externa del 2026-10-26 (registrada en `CHECKLIST-DE-PETICIONES.md` A13).
> **No crea reglas nuevas:** consolida las que ya estaban escritas en casas distintas
> («la maestra manda» del `LEEME.md`, la «regla de casa canónica» de `INDEX.md` y
> `06-FUENTE-BACKEND/FUENTE-DE-VERDAD.md`, la precedencia de lógicas de diseño de
> `02-LOGICA-DE-DISENO/SISTEMA-DE-LOGICAS.md`, y las reglas R1/R11 de cifras vivas en
> `AGENTS.md`). Fecha: 2026-10-26.

## 1 · Para las REGLAS (qué es verdad del producto)

1. **La maestra manda sobre los espejos.** Las carpetas `01`–`05` son copia fechada de
   `GUIAS/` del proyecto; si un espejo contradice a la maestra, gana la maestra
   (`LEEME.md`, regla 2). Los espejos no se editan aquí.
2. **Cada regla tiene una sola casa.** Si este repo y la casa citada chocan, gana la
   casa; si la casa es la ley (`05-LEY/`), no se discute: se escala con su matriz
   (`INDEX.md`; `FUENTE-DE-VERDAD.md`, regla 1).
3. **Orden de precedencia dentro de esta carpeta** (de mayor a menor): ley → contratos
   de módulo (`03-CONTRATOS`) → fuente de backend (`06-FUENTE-BACKEND`) → patrones de
   la síntesis (`12-FRONT-SINTESIS/SINTESIS-SUMATORIA.md`) → pantallas → registro de
   estado (`SINTESIS-REGISTRO.json`). En choque entre dos niveles gana el superior: la
   pantalla contradice un patrón ⇒ manda el patrón; el patrón contradice un contrato ⇒
   manda el contrato; la fuente contradice su casa ⇒ manda la casa.
4. **Para las lógicas de diseño ya existe precedencia propia:** seguridad de la
   paciente > flujo validado > diseño > forma
   (`02-LOGICA-DE-DISENO/SISTEMA-DE-LOGICAS.md` §regla de precedencia). Este documento
   no la cambia, solo la apunta.

## 2 · Para las CIFRAS (qué es verdad numérica)

- **Toda cifra tiene una sola casa que la produce con un comando.** Los demás libros la
  **citan con su fuente**, no la redefinen. Reparto vigente:
  - **Vivos (solo en salida de comando, nunca en prosa):** conteos de suites y trampas →
    `./autoauditoria.sh` (T1/T2). Reglas R1/R11 de `AGENTS.md`.
  - **Estado de pantallas, componentes y huellas:** `12-FRONT-SINTESIS/SINTESIS-REGISTRO.json`.
  - **Indicadores del proyecto y DoD:** `KPIS-Y-DOD.md`.
  - **Pedidos del dueño:** `CHECKLIST-DE-PETICIONES.md` (el detalle con trío y evidencia
    vive en `CHECKLIST-MAESTRO.md`).
  - **Mejoras del repo:** `PROPUESTAS-DE-MEJORA.md` §8.
  - **Acople del enchufe (25 operaciones):** `INDICE-BACKEND.md` §4.
  - **Alcance y decisiones:** `REGISTRO-DEL-SOFTWARE.md` · `INVENTARIO-DECISIONES.md`.
- **Regla de oro:** si dos libros dicen cifras distintas de lo mismo, **ninguno manda
  por antigüedad**: manda el comando de la casa del dato, y en el mismo turno se
  corrige el libro que copiaba mal.

## 3 · El procedimiento de conciliación (qué hacer al detectar un choque)

1. Correr **el comando de la casa del dato** (la fila 2 de arriba).
2. Corregir el libro **copia** en esa misma iteración. La **casa** solo se toca si el
   comando demuestra que ella está mal — entonces se refrescan también sus dependientes
   (ley L-2 de `AGENTS.md`).
3. Dejar el hallazgo con su evidencia (formato de la auditoría A11: afirmación,
   comando, corrección).
4. **Automatización pendiente:** la prueba de conciliación en la suite (comparar cifras
   clave entre libros) está registrada como **RQ-A parte 2** en
   `CHECKLIST-DE-PETICIONES.md` A13; al instalarse exige su prueba de fuego (regla R12:
   inducir la falla → rojo → restaurar → verde).

## 4 · Instancias conciliadas (libro vivo de la conciliación)

- **2026-10-26 04:40 · acople del enchufe** (`INDICE-BACKEND.md` §4): el balance decía
  «21 cubiertas · 3 parciales · 2 faltantes · 0 en otra carpeta» — suma 26, imposible en
  25 operaciones. Recuento por estado sobre la propia sección 4 (21 + 3 + 1 = 25;
  la única falta es `generar_documento`) → **corregido a «1 falta»** en el mismo turno.
  Evidencia: recuento con expresión regular por estado sobre `INDICE-BACKEND.md`.
- **Pendiente secuenciado (no olvidado):** `PROPUESTAS-DE-MEJORA` §8 («4 de 18») contra
  `KPIS-Y-DOD` K-09 («5 de 18»). El orden ya está escrito en `PLAN-DE-REGRESO.md`
  fase 2, paso 3 (marcar ME-08 con su evidencia y conciliar de paso); aquí solo queda
  anotado para que el choque no se pierda: **si hoy alguien pregunta «¿cuántas mejoras?»,
  la respuesta es: el libro de mejoras manda con su cifra conservadora, y K-09 se
  alinea al cierre del fase 2.**
- **2026-10-26 04:46 · composición de decisiones** (`KPIS-Y-DOD.md` K-04): decía
  «4 activas» cuando el inventario (su casa) §5 ya contaba 3 — D-2 se había ejecutado
  por su default el mismo día → corregida la composición; y al registrarse las
  decisiones nuevas D-5…D-8 de la evaluación A13, el total de K-04 y del inventario §5
  subió de 10 a **14** en el mismo turno. *Lección:* la composición de un agregado
  caduca cuando se ejecuta una decisión; la casa (inventario §5) manda.
