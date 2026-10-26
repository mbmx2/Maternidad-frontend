# LEEME — Prueba de consulta: médica (carpeta de entrega para su equipo)

> **Qué es:** un entregable de sesión listo para entregar a la médica (o al médico):
> 6 pantallas funcionales navegables en el navegador, con el día de las 18 pacientes
> precargado, la lógica optimizada completa (los seis tipos de aviso, el cierre anclado a
> la nota, las 18 calculadoras con prefill, los recordatorios sin cifras) y la hoja de
> veredicto imprimible de una página. **No es el software** — es papel usable para decidir
> (DEC-19). Motor v3 con las reparaciones de la auditoría adversarial aplicadas.

## Cómo llevar la sesión (25–30 minutos)

1. **Abra `INDICE.html`** en el navegador (Chrome, Edge o Firefox; mejor si sirve por
   servidor local: `python3 -m http.server` en esta carpeta).
2. **Frase de apertura**: «esto es un dibujo que se puede tocar; no es el software ni
   guarda datos de pacientes reales; si algo no le sirve, dígalo y se cambia en papel».
3. **Recorran las 6 pantallas en orden.** Tres tareas concretas que la ponen a prueba:
   - **C2**: abrir la consulta de **María García Luna** (está pausada) — ver la cinta, el
     semáforo y cerrar la nota marcando sus avisos.
   - **C3**: prescribir **amoxicilina** a María — es alérgica a penicilina: la
     prescripción debe negarse nombrando el riesgo.
   - **C5**: en calculadoras, elegir a María — **HOMA-IR sale con 0 tecleos** porque
     glucosa e insulina ya están en su laboratorio.
4. **En cada pantalla** contesten la banda de pregunta, o anoten en la **Hoja de
   veredicto** (imprima una copia al principio; al final, que firme).
5. Para repetir: **Tablero → «Reiniciar la jornada»**.

## Qué probar específicamente (las reparaciones y mejoras, en vivo)

- En el tablero, la **métrica de fatiga** (avisos por visita, meta <2) aparece en la
  línea de resumen — se mide al sistema, nunca a la persona.
- En alertas, cada pendiente trae **acción, dueño y reloj**; el detalle clínico está
  «a un clic» (desplegable), la superficie se lee con calma.
- La **urgencia de Gabriela** viene pendiente en la semilla: ciérrela y su chip
  «urgente» desaparece de la tarjeta.
- Marcar urgencia **solo ofrece pacientes presentes** en la sala (reparación C-3).
- La **fecha del próximo control sale derivada** del protocolo (+28 días, o +14 si
  infección/puerperio, +7 si fertilidad) — nunca se captura a mano.
- En agenda, **entregar un recordatorio** lo saca de disponible para cualquiera que abra
  la lista; «anular entrega» lo devuelve. Sin entrega ⇒ ESCALADO en el cierre.

## Las reglas de esta carpeta

- **Obra propia:** nació aquí; el script de refresco de `FRONTEND/` no la toca.
- **La maestra manda:** si algo choca con `GUIAS/` o la ley, manda la maestra.
- **Catálogos de demostración:** rangos, interacciones y la tabla HOMA sembrados «como
  si firmados» — los reales los firma el médico (P6 intacto). Si su criterio clínico
  discrepa de un rango de la prueba, anótelo en la hoja: eso es hallazgo valioso.
- **Cero datos reales:** solo los nombres ficticios precargados o inventados en sesión.
- **Veredicto doble:** una sola opinión es insumo; dos personas del oficio marcando
  «apruebo» es aprobación.

## Qué NO es esta carpeta

No hay disco real, escritor único ni red: el estado vive en el navegador de la sesión.
No es la entrega de software ni sustituye las pruebas del programa. Lo que esta sesión
valide **sustituye la hipótesis informada por flujo validado** — ese es todo su valor.
