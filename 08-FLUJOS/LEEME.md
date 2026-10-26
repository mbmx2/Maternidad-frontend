# 08-FLUJOS — todos los flujos dibujados, para la comparativa

> **Qué es:** el dibujo de **todos los flujos de trabajo y flujos lógicos** que viven en la
> documentación —la norma del día, los ocho cortes de estrés, los diecisiete requerimientos
> de interacción FL, los circuitos lógicos (cálculo → alerta → continuidad) y los tres
> recorridos por rol—, puestos en un solo lugar para poder compararlos contra las dos
> rondas de pantallas y construir a partir de ahí el siguiente frontend. Fecha:
> 2026-10-25.

## Qué contiene y de dónde sale cada cosa

- **`INDICE.html`** — el índice comparativo: cada flujo con su cobertura en la ronda 1
  (las 33) y en la ronda 2 (las 9), y el hueco exacto que queda. **Empiece por aquí.**
- **`FLUJO-NORMA.html`** — la norma vigente (capa D de `FLUJOS-TRABAJO.md`): la jornada de
  la enfermera paso por paso (físico → digital → pantalla → estado), la consulta de la
  médica, la visita (H-039) y una-verdad-muchos-equipos.
- **`FLUJO-CORTES.html`** — los ocho flujos con cortes (capa C): mañana base, cesárea,
  parto en la puerta, urgencia obstétrica, urgencia sin embarazo, se va la luz, el equipo
  falla, el ecógrafo falla.
- **`FLUJO-INTERACCION.html`** — los FL-01…FL-17 de `REQ-FLUJO.md` dibujados como cadenas:
  paso del día → pantallas → funciones/módulos → estructura de código.
- **`FLUJO-CIRCUITOS.html`** — los circuitos lógicos: los cuatro latidos
  (captura → chip → regla → aviso → continuidad), el sistema de alertas con sus seis tipos
  y entrega T1–T3, los recordatorios y las calculadoras con prefill.
- **Los recorridos por rol** no se copian: ya están dibujados en
  `01-DIBUJOS/EDICION/PROPUESTAS/RUTAS/` (enfermera 8 paradas, médica 7, dueño 7) y desde
  el índice se enlazan.
- **El día de las18** tampoco se copia: vive dibujado en `…/PROPUESTAS/TABLERO.html`
  (ronda 1) y en `07-FRONT-NUEVO/hoy.html` (ronda 2).

## Cómo leer las cadenas

Cada caja es un paso: el **borde morado** es lo que hace el cuerpo en la sala, el **azul** lo
que hace el software, el **verde** es una pantalla (con su enlace), el **ámbar** un estado o
evento que queda registrado. Las flechas son el orden real. Al final de cada flujo, su
**cobertura**: qué pantalla de la ronda 1 lo cubría, cuál de la ronda 2, y qué sigue
faltando.

## Reglas de esta familia

Papel de análisis, no pantallas (no llevan veredicto: quien veredicta es una pantalla) ·
toda cadena cita su casa (capa C, capa D, FL-xx, circuito) · y el destino de todo esto es
uno solo: la **comparativa** que alimente el siguiente frontend con **todos** los flujos
incluidos, como pidió el dueño.
