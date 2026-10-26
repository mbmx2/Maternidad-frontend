# CONTRATO · CATÁLOGO DE DEGRADACIÓN — órgano 6

> **Estado: EXPLORACIÓN** (v1 · 2026-10-23). No es ley; cambia gratis. Fuentes: doctrina
> pilar 6, flujos 6, 7 y 8, su principio de que la falla no daña, no calla y no pierde
> el día.

## 1 · Qué garantiza

- **Toda falla termina en una frase humana que dice qué hacer ahora** — jamás en vacío,
  en error técnico o en ventana muerta.
- **La falla no daña datos:** los guardados son atómicos y el diario reconstruye el
  orden; o se escribió completo, o no se escribió.
- **Mientras la máquina no puede, el puente de papel sostiene el día** —y lo escrito en
  papel se transcribe con su hora real, no con la del tecleo.
- **Al volver, el sistema se verifica y muestra lo que quedó a medias** —con dueño de
  lo pendiente— en vez de fingir continuidad.
- **Lo previsible se avisa antes** (capacidad de disco, respaldos viejos): la degradación
  también tiene prevención.

## 2 · Lógica total

**Catálogo de fallas (declaradas, cada una con su guion):**
(1) **Corte de luz** → los guardados íntegros, lo no guardado se pierde **dicho**;
puente de papel con los campos mínimos; al volver: verificación de integridad + el
tablero muestra las atenciones «a medias» + transcripción con hora real.
(2) **Falla del equipo** (trabado, pantalla muerta, disco lleno) → al reabrir: último
guardado entero, mensaje humano («último guardado a las HH:MM; repita el control que no
completó»), bitácora de lo escrito; **prevención**: aviso de capacidad antes del llenado
(umbral de disco vigilado, publicado en administración).
(3) **Red local caída o intermitente** (con el teléfono del personal o formularios
futuros) → cola diferida con estado visible («pendiente de enviar»), reintento, y jamás
dato perdido ni enviado dos veces.
(4) **Estudio de imagen incompleto o memoria ilegible** → previsualizar, verificar,
rechazar con aviso en el tablero («estudio pendiente — reintento»); nada se tira ni se
escribe a medias.
(5) **Programa cerrado a la fuerza** (el que cierra la ventana en plena captura) → al
abrir de nuevo: mismo camino del (2); la sesión se repone con su pantalla y paciente.
(6) **Ventana demasiado pequeña o pantalla rota** → contrato de ventana mínima (1024×660
y el aviso de mínimo) — la degradación de presentación también está declarada.

**Principio transversal:** toda falla produce tres escrituras: **qué pasó** (mensaje
humano) · **qué se conservó** (lo íntegro, con hora) · **qué falta** (lista con dueño).
Ninguna falla se archiva sin las tres.

**Invariantes:** (i) cero corrupciones tras corte simulado (prueba de recuperación
periódica, ya existe el simulacro); (ii) 0 mensajes con palabra técnica (criba); (iii)
todo «a medias» visible en el tablero con dueño; (iv) transcripción del papel con la
fecha del hecho, bitácora que dice «escrito tardío» con su motivo.

**Casos borde:** dos caídas seguidas (la segunda no daña lo que la primera dejó:
atómico es idempotente) · luz que cae **en plena escritura** (la escritura se completa
o no existe) · papel extraviado (queda el hueco en el tablero «falta completar» con
dueño; no se inventa) · disco lleno en la peor hora (prevención antes; si ocurre,
mensaje + liberación asistida: borrar temporales viejos es del sistema, nunca del
usuario) · restauración de un respaldo viejo sobre datos nuevos (su simulacro ya lo
ensaya; la restauración exige confirmación con fecha de la copia).

**Errores:** mensaje de error crudo que escapa a la pantalla (criba y captura: toda
excepción visible pasa por la plantilla humana —regla ya existente de claridad—) ·
verificación de recuperación que falla en silencio (si la verificación falla, es rojo
del pulso, no una palomita automática).

## 3 · Por qué esta lógica

Descartado: «ocurre y se reabre» (la falla sin guion deja al personal adivinando —el
escenario peor en sala llena). Descartado: prometer que nada se pierde nunca (mentira
médica: lo no guardado se pierde, y se dice). Descartado: ventana de error técnico con
botón Aceptar (su regla: toda salida en humano). Descartado: depender de generador o
UPS para sobrevivir (puede haber, pero el diseño no depende de hardware extra: el
puente de papel es la garantía base).

## 4 · Cómo se implementa

**Ya existe (no se toca):** guardados atómicos · diario de operaciones · verificación
de estudios · simulacro de respaldo. **Símbolos nacituros:** `mensaje_de_falla`
(catálogo de los 6 guiones en lenguaje humano), `verificar_integridad` (al reabrir),
`capacidad_disponible` (aviso preventivo), `cola_diferida` (red), `puente_de_papel`
(procedimiento escrito e impreso —es una hoja de la clínica, no solo código—).
**Presentación:** los avisos de falla viven en la misma barra de resultados del sistema,
y sus «a medieses» en el tablero.

## 5 · Cuadre: promesa ↔ prueba

Números: corte simulado ⇒ base íntegra y último guardado idéntico · 0 mensajes con
palabra técnica · 0 «a medieses» sin dueño. **Pruebas:** `test_corte_en_escritura`
(ya existe el patrón: escritura a medias no corrompe —se refuerza), `test_mensajes_de_falla_humanos`
(criba), `test_cola_diferida_sin_duplicados`, `test_transcripcion_tardia_con_hora_real`,
y la **prueba de recuperación programada** (correr el simulacro dentro del examen, no
solo a mano —la deuda vieja T8: la batería y el simulacro viven en ventanas fijas).

## 6 · Prevención de problemas (posibles e improbables)

- **La falla que no tiene guion** (la imposible de imaginar) — respuesta: guion
  genérico de cierre: las tres escrituras (qué pasó / qué conservó / qué falta) + rojo
  en el pulso; todo lo no catalogado pasa por ahí **y se añade al catálogo** (el
  catálogo crece con la realidad).
- **El que borra la carpeta de datos a mano en el pánico** — respuesta: la guía de
  continuidad lo prohíbe con instrucción explícita; el sistema no necesita que nadie
  borre nada nunca (ni «limpiar para que funcione»).
- **Dos personas escribiendo desde dos equipos con la luz que vuelve** (futura fase de
  dos equipos) — respuesta: ya resuelto en su diseño de un solo escritor por equipo y
  sincronización posterior con barreras; aquí solo se declara que la caída no rompe
  eso: es el mismo camino atómico.
- **Transcripción del papel con la hora equivocada** — respuesta: campo obligatorio de
  «fecha del hecho» + bitácora «escrito tardío»; si no hay fecha del hecho, la ficha
  queda «a completar» con dueño (no se adivina).
- **Verificación de arranque que pasa en verde con la base dañada** — respuesta: la
  verificación es parte del examen (pulso): daño ⇒ rojo visible, nunca palomita.
- **Disco lleno descubierto en el peor momento** — respuesta: vigilancia de capacidad
  con umbral publicado; aviso semanas antes (prevención, no rescate).
- **El aviso de falla tapado por otra ventana** — respuesta: mensajes en la barra
  persistente + el estado «a medias» en el tablero (no viven en el centro de una
  ventana emergente que se pueda perder).
- **Batería/radio del teléfono del personal** (fase pendiente) — respuesta: la cola
  diferida vive en el teléfono hasta enviar; si el equipo se pierde, lo capturado se
  re-entra manualmente —el puente, otra vez—.
- **Restauración accidental de un respaldo** — respuesta: confirmación con la fecha de
  la copia y aviso de lo que se reemplazará (ya construido; aquí queda como promesa
  verificada).

## 7 · Estado y bitácora

**EXPLORACIÓN** · v1 2026-10-23 — primera tanda. Pendiente: imprimir el puente de papel
(hoja física de la clínica) cuando usted apruebe O5–O9; y meter el simulacro de
recuperación al examen con fecha fija (la deuda vieja conocida).
