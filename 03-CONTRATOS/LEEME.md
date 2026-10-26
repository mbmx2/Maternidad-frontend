# CONTRATOS DE IMPLEMENTACIÓN — la lógica total, módulo por módulo (familia viva)

> **Qué es esto:** la lógica escrita de cada módulo del software que el flujo final y la
> propuesta de valor exigen —antes de que exista el código—, con su **prevención de
> problemas posibles e improbables**. Material de diseño **no es ley**; vive en exploración:
> se cambia el mismo día que el dueño dicta, sin ceremonia; recién cuando un contrato se
> declara **«aplicado»** gobierna la construcción (y eso, cuando llegue, se decreta en la
> ley). Última actualización: 2026-10-23.

## Las dos familias

- **`MODULOS/`** — la lógica de cada órgano nuevo del software (estas hojas).
- **`PANTALLAS/`** — la lógica de cada pantalla cuando su contrato se estabilice (va
  después: primero los módulos que las sostienen).

## El formato de todo contrato (7 secciones fijas)

1. **Qué garantiza** — sus promesas, en humano, como frases.
2. **Lógica total** — estados, reglas, transiciones, casos borde y errores, sin código.
3. **Por qué esta lógica** — decisiones y alternativas descartadas.
4. **Cómo se implementa** — a qué secciones y símbolos del programa apunta (sin números
   de línea; si aún no existen, se nombran los que nacerán).
5. **Cuadre: promesa ↔ prueba** — qué número la verifica hoy y qué prueba se creará al
   construir (ninguna promesa queda sin su medida).
6. **Prevención de problemas** — lo pedido por el dueño: los problemas **posibles y los
   improbables**, cada uno con su respuesta escrita de antemano.
7. **Estado y bitácora** — `EXPLORACIÓN` o `APLICADO`, con fecha y qué cambió.

## Reglas de la familia

- **Cambiador gratis mientras esté en exploración** — esa es su libertad de mil iteraciones.
- **Sin contrato aplicado, no hay módulo nuevo en el código** (la regla se vuelve
  obligatoria de ley cuando usted lo ratifique).
- **Toda promesa con número** — la doctrina no acepta promesas sin medida.
- **Toda prevención que descubra un problema nuevo lo manda al buzón** con número, y se
  añade a la sección 6 del contrato correspondiente.
- **Ningún contrato crea una segunda verdad** — los estados del tablero, por ejemplo, se
  *derivan* de los hechos guardados, no se guardan dos veces.

## Estado de esta familia (fecha)

Escritos en esta tanda: **TABLERO · ATENCIONES-CONCURRENTES · PROTOCOLOS · URGENCIA ·
ALERTAS · DEGRADACION · IDENTIDAD-CONTEXTO** (siete módulos: los cinco órganos nuevos,
el motor de la propuesta de valor, y el módulo de identidad que sostiene a todos).
Mapa de orden: `MAPA-DE-IMPLEMENTACION.md`. **Pendiente por decidir con el dueño:**
contrato de autohistoria por QR (su propuesta, aún sin validar con el equipo) y los
contratos retrospectivos de los módulos ya construidos (D-*, B-* — extracción sobre lo
existente, ronda siguiente).

**Mecanismos transversales (H-047):** las reglas que gobiernan a todos los contratos —
vocabulario «falta + verbo», reglas de entrega T1/T2/T3, la visita como hecho del día, el
armazón de ventana, el buscador, la combinación diagnóstica, la paciente en contexto y la
**prioridad humana (B6)** — viven en sus casas: `REQUISITOS-DEL-DISENO.md` y
`PRESENTACION-DE-CONTENIDO.md`. Cada contrato los aplica en su sección correspondiente y
los cita; la incrustación textual de los trece, al estabilizar cada contrato. (Actualizado
2026-10-25.)
