# LEEME — el frontend nuevo, desde cero (ronda 2)

> **Qué es:** la reconstrucción completa del frontend —nuevos archivos, nuevo diseño,
> cero reutilización de la ronda anterior— derivada del flujo declarado (mañana de la
> enfermera, consulta de la médica, capa D de `FLUJOS-TRABAJO.md`) y de los requerimientos
> FL-01…FL-17. Es papel: dibujos con puente simulado para poder usarlos, sin código de
> producto. Fecha: 2026-10-25.

## Los ocho principios con los que se dibujó (y por qué no copia la ronda 1)

1. **Inicio = el día.** La primera pantalla es el tablero de hoy; nada de índice general
   al encender (pilar 1, FL-01).
2. **El riel izquierdo solo con lo que se BUSCA.** Siete destinos de jornada —El día ·
   Llegadas · Pendientes · Documentos · Agenda · Cierre · Sistema— y nada más. Lo que se
   **está** atendendo no va en el riel: va en la barra superior con su nombre («en
   atención:…»), porque el oficio no navega hacia su trabajo, lo tiene enfrente.
3. **Una paciente en contexto, que viaja sola.** La cinta de identidad la lleva el puente
   entre pantallas; ninguna pantalla la reimagina.
4. **Los estados se mueven solos.** Las pantallas se pintan desde los hechos del día en
   memoria: registrar, pausar o cerrar **mueve** la tarjeta; nadie escribe estados a mano
   en el HTML (error de raíz de la ronda 1: estados congelados que prometían moverse).
5. **Vocabulario de sala:** «falta + verbo», palabras en lugar de jerga (H-041), y color
   **siempre** acompañado de palabra.
6. **Todo aviso con dueño y reloj; nunca bloquea la captura** (O3, P2) — y la alerta cierra
   con nombre y cédula (B-013).
7. **Cero mensajes técnicos** en la cara de la persona.
8. **Cada pantalla pregunta y pide veredicto** — con el kit de revisión, como siempre.

## Qué se descarta de la ronda 1 (los errores que NO cargamos)

- **La barra de 15 enlaces**, con la mitad apuntando a un índice-placeholder: ruido de
  navegación; el riel nuevo trae **dos grupos con destinos reales** (Jornada: ocho ·
  Del consultorio: tres).
- **La navegación por índice de 33 páginas:** el flujo nuevo va por jornada —quién llegó,
  estación, consulta, pendientes, papeles, agenda, cierre— en sus **9 pantallas
  iniciales, hoy 30 piezas con sus 4 propuestas**.
- **Estados escritos a mano** («5 atendidas» pegado en el HTML): aquí se calculan.
- **Pantallas por insumo** (ficha, protocolo, cálculos como islas) en vez de **pantallas
  por momento del día**.
- Las páginas de la ronda 1 **no se borran**: quedan en `01-DIBUJOS/EDICION/PROPUESTAS/`
  como memoria de la primera ronda, con sus bandas de veredicto pendientes.

## La ronda completa (2026-10-25) — de9 a25, cumpliendo los requisitos

Con todo lo comentado hasta la fecha (flujos dibujados, `REQUISITOS-FRONT-BACK`, la
comparativa y el repaso del checklist), la familia pasó de9 pantallas a **21 pantallas de
jornada + `CUMPLIMIENTO.html` (índice y prueba de cumplimiento, RF por RF) + 3 recorridos
por rol** — los12 nacieron con el mismo sistema, sin copiar errores de la ronda1:
**acceso** (PIN) · **ficha** (fundamentales + plazo de «falta completar») · **emergencia**
(tres campos en un minuto) · **laboratorio** (tres datos en30 segundos) · **parto** (cierra
episodio y libera el cupo) · **protocolos** (calendarios múltiples + catálogo) ·
**historia** (notas firmadas, NOM-004) · **estudios** (verificar/rechazar/consentimiento) ·
**calculadoras** (las18 con prefill) · **fallas** (los guiones en humano) · **respaldo**
(guardar/verificar/ensayar) · **atenciones** («en uso de X» sin tope rígido).

**La navegación, en su forma final:** el riel tiene dos grupos reales — **Jornada** (ocho
destinos) y **Del consultorio** (fallas, respaldo, sistema) — y las pantallas **de la
paciente cuelgan del menú del contexto** (clic en «En contexto:…» en la barra: ficha,
historia, protocolos, estudios, calculadoras, documentos, parto). Cero enlaces muertos. Y
**H-064 quedó cerrado**: jerarquía de encabezados sin saltos (h1 → h2) en las25.

## La versión verdadera — el mismo archivo, sin andamio

En la barra de cualquier pantalla hay un interruptor: **«Ver versión verdadera»** (guarda su
preferencia en el navegador y la respeta en todas las páginas). En ese modo —**sin duplicar
nada: mismo archivo, otra cara**— solo queda lo que dicen las guías escritas:

- **Se ocultan** las bandas de pregunta y veredicto, los pies con los códigos FL/RF y todo
  rótulo de revisión (es andamio de entrevista, no del producto).
- **Cambia el lenguaje de demo por el real**: «demo/maqueta/papel» → el texto que el
  producto diría («PIN correcto — bienvenida», «abierta en Word: edita, guarda y cierra»,
  «sin firma no se señala»); los avisos de «esta función es un dibujo» se vuelven
  «esta versión aún no la conecta».
- **La fecha de El día es la fecha de hoy**, no la del escenario dibujado.

**Tres límites honestos** (lo que la versión verdadera no puede ser, porque sería mentir):
(1) **los datos siguen siendo de mentiras** — no hay pacientes reales en papel, y esa es la
regla del LEEME de la carpeta; (2) **`CUMPLIMIENTO.html` y las `RUTAS/` son instrumentos de
revisión**, no del producto: ahí siempre hay andamio (y las rutas, además, no cargan el
puente); (3) sin JavaScript, cualquier página vuelve a su cara de dibujo —DEC-19: esto es
papel con motor, nunca el programa.

## El flujo completo de pantallas (y sus FL)

`hoy.html` (FL-01,04,10) → clic en tarjeta → `estacion.html` (FL-05,06) o `consulta.html`
(FL-09,17) · la puerta vive en `llegada.html` (FL-02,03,12) con `emergencia.html` (FL-12) al
lado · `pendientes.html` (FL-08,13) · `laboratorio.html` (FL-07) · `atenciones.html`
(FL-06) · `protocolos.html` + `parto.html` (FL-11,13) · `calculadoras.html` (R-19) ·
`historia.html` (RF-17) · `estudios.html` (corte8) · `documentos.html` (FL-17) ·
`agenda.html` (FL-02,04) · `cierre.html` + `respaldo.html` (FL-15) · `falla.html` (FL-14) ·
`ficha.html` (RF-14) · `acceso.html` (antes del riel) · `sistema.html` (dueño). El riel y el
menú del contexto los apuntan; el flujo es la jornada, no el organigrama — y el mapa de
cumplimiento está en `CUMPLIMIENTO.html`.

## Cómo probarlo

**Las cuatro propuestas a juicio** (¿convienen?): `PROPUESTAS.html` es su índice —
P1 del aviso a la acción · P2 antes de sentar · P4 copiar control anterior · P6 traspaso
con «si–entonces» —, cada una como flujo completo con su banda **¿conviene?**. Evalúen en
versión papel; si alguna conviene, entra a `REQUISITOS-DEL-DISENO.md` con su número.

1. Abra `hoy.html` en el navegador: el día se pinta solo, los relojes corren y el umbral
   de 30/45 se enciende con el tiempo.
2. Haga clic en una tarjeta de «por registrar» → llegada → registre en tres campos →
   vuelva a El día: la tarjeta ya cambió de columna (los estados se movieron solos).
3. Elija una paciente en espera → estación → llene → **Guardar nunca bloquea**: aparecen
   los chips con su interpretación.
4. En `pendientes.html`, cierre una alerta: pide nombre y cédula — sin firma no cierra.
5. Al final, `cierre.html` → Imprimir traspaso.

## Reglas de esta carpeta

Papel, no producto (DEC-19) · sin red, sin disco, datos de mentiras en memoria · el puente
es `puente.js` (misma costura declarada en `06-FUENTE-BACKEND/COMUNICACION.md`: las
pantallas solo hablan con operaciones) · nada se vuelve software sin doble veredicto.
