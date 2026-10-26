# EDICIÓN EN PAPEL — réplicas para dictar cambios sin tocar el código

> **Qué es esto:** réplicas HTML con la apariencia de cada pantalla del programa real.
> Aquí —y solo aquí— se dictan y aplican las ediciones de diseño hasta que las pantallas
> queden «estabilizadas». **El programa no se toca en esta etapa** (decreto del dueño,
> 2026-10-23, registrado en `GUIAS/EVALUACION-PANTALLAS.md`).

## Cómo trabaja el dueño aquí

1. Abra la réplica de la pantalla (`INDICE.html` lista todas) — se ve como la pantalla
   real: barra azul, menú lateral, tarjeta con sus casillas y botones.
2. **Dicta sus cambios** con sus palabras: «agregar esto aquí» · «esto va a otra
   parte» · «renombrar esto a …» · «transformar esto para que el flujo sea …».
3. El agente los aplica el mismo día sobre **esta réplica** y le avisa.
4. Usted revisa y dicta otra vez. Se repite las veces que haga falta —cambiar aquí es
   gratis y no rompe nada—.
5. Cuando usted diga **«estabilizado»**, ese diseño baja al programa real una vez,
   con su prueba verde.

## Reglas de la casa (para el agente)

- **Nunca regenerar encima de lo dictado:** el generador (`generar_base.py`) solo crea
  réplicas que **faltan**; jamás sobrescribe una existente — ahí viven los cambios del
  dueño. Si el programa real cambia y hace falta una base nueva, se consulta primero.
- Toda réplica lleva su etiqueta: «réplica de apariencia — lo funcional lo manda el
  programa». No es una copia del programa: es el dibujo sobre el que se decide.
- Los cambios dictados se marcan con la clase `cambio` (recuadro verde) para que en la
  revisión se distinga lo nuevo de lo que siempre estuvo.
- Cada pantalla también se contrasta contra `../ANALISIS-PANTALLAS.md` (qué prometía
  entregar) y su crítica vive en `../HALLAZGOS.md` con número H-xxx.
