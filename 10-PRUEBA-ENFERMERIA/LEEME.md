# LEEME — Prueba de piso: enfermería (carpeta de entrega para su equipo)

> **Qué es:** un entregable de sesión listo para entregar a las enfermeras: 6 pantallas
> funcionales navegables en el navegador, con el día de las 18 pacientes precargado, la
> lógica optimizada completa y la hoja de veredicto imprimible de una página. **No es el
> software** — es papel usable para decidir (DEC-19): nada se construye hasta su doble
> veredicto. Motor v3 con las reparaciones de la auditoría adversarial aplicadas.

## Cómo llevar la sesión (25–30 minutos con una enfermera)

1. **Abra `INDICE.html`** en el navegador de la computadora de prueba (Chrome, Edge o
   Firefox; si sirve por servidor local mejor, `python3 -m http.server` en esta carpeta).
2. **Diga la frase de apertura**: «esto es un dibujo que se puede tocar; no es el software
   ni guarda datos de pacientes reales; si algo no le sirve, dígalo y se cambia en papel,
   gratis».
3. **Recorran juntos las 6 pantallas en orden** (el índice las lista en el orden de su
   mañana): tablero → puerta → estación → laboratorio → pausa → cierre. Pídale que haga de
   verdad: que registre, que capture un control con una bandera, que pause, que imprima el
   traspaso.
4. **En cada pantalla** contesten la banda de pregunta que está abajo, o anoten en la
   **Hoja de veredicto** (`HOJA-DE-VEREDICTO.html` — imprima una copia de una página al
   principio; al final, que firme).
5. Para repetir: **Tablero → «Reiniciar la jornada»**. Cada sesión empieza igual.

## Qué probar específicamente (las reparaciones de la auditoría, en vivo)

- **Glucosa 130 en laboratorio** debe decir CRÍTICA (antes decía «en rango» — el bug del
  verde falso ya está corregido).
- **Marcar una urgencia** solo ofrece pacientes **presentes** en la sala.
- **Reagendar a la que no llegó** la saca de «no llegó» y la pone en «con cita».
- **Pausar y retomar la estación** regresa exactamente a donde estaba, y su tarjeta nunca
  dice «en atención» (eso es de consulta).
- **Cerrar una urgencia** limpia el chip «urgente» de la tarjeta.
- **Registrar un nombre parecido** pregunta antes de fusionar — nunca fusiona solo.

## Las reglas de esta carpeta

- **Obra propia:** nació aquí, no viene de la maestra; el script de refresco de
  `FRONTEND/` no la toca.
- **La maestra manda:** si algo choca con `GUIAS/` o la ley, manda la maestra.
- **Catálogos de demostración:** rangos e interacciones sembrados «como si firmados»;
  los reales los firma el médico (P6 intacto).
- **Cero datos reales:** en la prueba se usan solo los nombres ficticios que vienen
  precargados o inventados por el equipo.
- **Veredicto doble:** con dos personas del oficio marcando «apruebo» es que una pantalla
  avanza; una sola opinión es insumo, no aprobación.

## Qué NO es esta carpeta

No hay disco real, escritor único ni red: el estado vive en el navegador de esta sesión.
No es la entrega de software ni sustituye pruebas del programa. La validación con su
personal que se viva aquí **sustituye la hipótesis informada** por flujo validado: ese es
todo su valor.
