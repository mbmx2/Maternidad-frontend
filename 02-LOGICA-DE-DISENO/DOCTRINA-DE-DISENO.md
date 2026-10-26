# DOCTRINA DE DISEÑO — los diez pilares y sus pruebas (contrato de aceptación)

> Registro vivo (2026-10-23). Esta doctrina responde a la pregunta: **¿qué debe tener el
> software para sobrellevar la realidad compleja del centro —18 pacientes, cortes clínicos
> y técnicos—?** Cada pilar lleva su principio, lo que ya existe, lo que falta y **su
> número de aceptación**: en este proyecto, lo que no tiene número no se cree. Ningún
> pilar baja al código sin que su número se cumpla con salida de comando.

## El cambio de categoría que ordena todo

Un expediente clásico responde «¿qué le pasó a esta paciente?». Este centro necesita,
además, «¿quién viene, quién espera, quién está en peligro, qué se cayó y qué sigue?».
El primero es un archivo; el segundo es una **sala de control**. La doctrina le pone al
expediente que ya existe el sistema nervioso de sala de control que le falta —sobre los
huesos sanos ya construidos (guardados atómicos, diario de operaciones, base única, modo
sin internet, alertas, homónimas).

## Los diez pilares

**Pilar 1 · Lo que no se ve, se pierde: todo estado visible y con reloj.** El tablero del
día es la pantalla de arranque con sus columnas (por registrar · en espera · en atención ·
pausada · atendida · urgente); cada tarjeta lleva reloj de espera (30 min ⇒ amarillo,
45 ⇒ rojo). Existe: la agenda como materia prima. Falta: el tablero con estados y relojes.
**Número:** con 18 pacientes, el tablero se calcula y pinta en menos de 0,5 s; ninguna
tarjeta existe sin estado ni hora de entrada.

**Pilar 2 · La concurrencia es el modo normal.** Varias atenciones abiertas a la vez
(3–4), cada una con pausa y retorno exacto; el cambio de paciente ocurre **solo desde el
tablero**, nunca desde un formulario. Existe: el motor de campos que sobrevive a la
navegación. Falta: la gestión de varias abiertas con pausa y el candado del cambio
consciente. **Número:** con 4 abiertas y datos escritos en cada una, diez alternancias
conservan el 100 % de lo escrito (cero campos perdidos); ninguna pantalla de escritura
ofrece cambio de paciente que no sea el tablero.

**Pilar 3 · La paciente manda sobre la pantalla: cinta de identidad.** Nombre, fecha de
nacimiento y —si hay riesgo de homónima— un segundo dato, en cinta visible arriba de toda
escritura, con color propio de cada paciente abierta. Existe: homónimas en registro y la
tarjeta prioritaria. Falta: la cinta universal. **Número:** pantalla de escritura sin cinta
= defecto del examen; con dos homónimas abiertas, el aviso está visible en ambas.

**Pilar 4 · Protocolos, no pantallas de embarazo.** Una paciente es un conjunto de
protocolos activos (embarazo, infección, tumoración, fertilidad, puerperio, planificación,
menopausia); cada protocolo es un calendario de pasos con alertas; una mujer puede llevar
varios a la vez. Existe: cálculo del embarazo, controles con banderas, tamizajes con
vencimiento. Falta: el concepto de protocolo y la pantalla de seguimiento multi-protocolo.
**Número:** una paciente con embarazo de 20 semanas e infección en tratamiento muestra
ambos calendarios juntos sin que uno tape al otro; una paciente sin embarazo tiene dónde
vivir su seguimiento.

**Pilar 5 · La urgencia manda sobre la fila; el registro no detiene la urgencia.** Toda
urgencia (clínica, operativa o declarada) reordena el tablero al frente en rojo, en el
mismo segundo del marcado; para quien llega en trabajo de parto sin expediente existe el
registro de emergencia (identidad mínima <1 min, folio, atención inmediata, expediente
completo después sobre la misma ficha). Existe: banderas con aviso, registro en dos pasos,
anti-duplicados. Falta: salto al frente, registro de emergencia, completar después.
**Número:** urgente al frente en el mismo segundo; registro de emergencia en <1 min; cero
expedientes duplicados al completar después.

**Pilar 6 · La falla no daña, no calla y no pierde el día.** Todo modo de falla tiene
comportamiento humano declarado: luz → guardados atómicos + puente de papel + transcripción
con hora real; equipo → último guardado entero + mensaje que dice qué hacer; disco → aviso
antes; estudio incompleto → rechazo visible en el tablero. Existe: atómico, diario,
verificación de estudios, simulacro. Falta: catálogo de mensajes humanos, puente de papel
escrito, atenciones a medias visibles tras la falla. **Número:** corte simulado a mitad de
guardado deja la base íntegra y el último guardado idéntico; ningún mensaje de error
contiene palabra que un médico no entienda.

**Pilar 7 · Un solo reloj, una sola verdad, dos instrumentos.** Una base; el teléfono de
enfermería y el monitor de la médica son ventanas al mismo día. Existe: base única; el
teléfono en la fase pendiente. Falta: el tablero como **vista derivada** del día (una
fórmula calcula los estados desde los hechos, con prueba de igualdad, como toda vista
derivada de este proyecto). **Número:** el mismo estado calculado desde monitor y desde
teléfono devuelve byte a byte lo mismo.

**Pilar 8 · El carril manda: cada oficio, su pantalla y su ritmo.** Modos por carril —
registro rápido de una pantalla, estación de constantes que ahorra clics, vista de consulta
que trae lo clínico sin navegar—. Existe: permisos por rol, teléfono, prellenado.
Falta: los modos y sus cuentas. **Número:** registrar ≤ 3 acciones · constantes ≤ 6 ·
abrir la vista de consulta ≤ 2.

**Pilar 9 · La ventana es del usuario: todo cabe o se organiza (v4.2 — H-020).** El
programa es autocontenido y la ventana puede no estar maximizada: el primer vistazo lleva
lo crítico sin desplazamiento; lo demás se organiza en pestañas y bloques con rollo
**dentro** de la ventana; la ventana mínima de trabajo es 1024×660 y no baja de ahí;
redimensionar no borra ni un campo; el texto no se encoge (base ≥13 pt con opción ≥16);
nunca hay información codificada solo por color. **Números:** 29 variables de uso y
tamaño inventariadas y con respuesta (`GUIAS/LOGICAS/PRESENTACION-EN-PANTALLA.md`);
acción primaria alcanzable sin scroll de página en el mínimo; resize 1024→1920→1024 con
cero campos perdidos; repintado <0,1 s.

**Pilar 10 · El aviso es el activo (tesis de valor del dueño — H-021).** La mayor
propuesta de valor son los avisos y alarmas sobre los estados de salud que salen del
análisis de los signos, con las calculadoras como activo más valioso: resultado con
interpretación, seis tipos de aviso (verde · plazo · problema · urgencia · contexto
permanente · interacción), reglas en catálogos firmados —nunca en código—, datos
fundamentales (alergias, tipo de sangre, medicación) siempre en la cinta, y todo plazo
convertido en pendiente fechado. Sistema completo: `SISTEMA-DE-ALERTAS.md`.
**Números:** casa canónica en `SISTEMA-DE-ALERTAS.md` §8 — aquí solo se cita
(reparado 2026-10-23, hallazgo L-01: dos listas propias habrían sido dos verdades).

## Las consecuencias estructurales — cinco órganos nuevos, seis refuerzos

**Nuevos:** el tablero (pilar 1) · el gestor de atenciones concurrentes (pilar 2) · el
motor de protocolos (pilar 4 —el mayor, dominio clínico puro—) · el canal de urgencia
(pilar 5) · el catálogo de degradación (pilar 6). **Reforzados sobre lo existente:** la
cinta sobre la tarjeta prioritaria (pilar 3) · el tablero como vista derivada de la agenda
(pilar 7) · los modos por carril sobre permisos y teléfono (pilar 8) · y la base de
integridad —atómico, diario, verificación— que **no se toca**, porque es lo que permite
prometer todo lo demás. Disciplina que gobierna a los cinco nuevos: **ninguno inventa una
segunda verdad**; el tablero se calcula de los hechos guardados, como toda vista derivada,
para no repetir la enfermedad que la ley ya conoce: dos versiones de la realidad que se
contradicen.

## El orden de aplicación

Papel antes que código: los pilares se dictan sobre las réplicas de `GUIAS/EDICION/` (el
dueño dibuja, corrige, itera), lo dictado se estabiliza con su visto bueno, y recién
entonces baja al programa una vez, con sus pruebas numéricas. La lista de números es el
contrato de aceptación de esta doctrina: tablero <0,5 s con 18 · cero campos perdidos en
10 alternancias · cinta en 100 % de escrituras · urgente al frente al instante ·
emergencia <1 min sin duplicado · base íntegra tras corte simulado · estados idénticos
entre instrumentos · 3/6/2 acciones por carril.

**Enmienda del 2026-10-23 noche (autocrítica del flujo — O1, O2, O10):** el tablero sin
dueño y sin eventos muere en dos semanas, y es peor que no tenerlo. Por eso el pilar se
completa con tres reglas: **regla de eventos** — los estados cambian **solos** desde
hechos reales (cita creada → llegada registrada → estación guardada → consulta cerrada →
atendida); lo manual es solo lo que exige juicio (urgencia, pausa y la prioridad de paso —esta la definen las personas: el software nunca ordena por quién llegó primero) —; **dueño declarado**
— recepción cuida llegadas y ausencias, quien atiende mueve lo suyo —; y **estados
nuevos obligatorios**: *no llegó* (la cita que pasó sin aparecer), *estación a medias*
(la pausa del carril de enfermería), *equipo fuera* (la médica en sala de parto: el
tablero explica la espera en vez de solo mostrarla). Números añadidos: 0 estados que
dependan de clics de buena voluntad · 0 pacientes sin estado a las 2 horas de abierta
la puerta.


## Lo que NO se construye (añadido N3 — disuasivo de la fase de papel)

En la etapa donde todo se puede dibujar, el riesgo es dibujar de más. Reglas de negativa:

1. **Sin flujo validado por el personal, no hay pantalla nueva** — la raíz manda sobre
   el dibujo caprichoso.
2. **Sin doble veredicto del oficio, no hay código** — una aprobación no es adopción.
3. **Sin número de aceptación, no hay pilar** — lo que no se mide no entra a la doctrina.
4. **Sin disparador, no hay candidato** — los pendientes llevan la condición que los
   activa; lo que no la trae, no se promete.
5. **Sin fila en la ley, no se toca herramienta del examen** — el papel es gratis, las
   herramientas de verificación no se editan al margen del proceso.
