# FLUJOS DE TRABAJO — la raíz del árbol (hipótesis, contraste y escenario cargado)

> Registro vivo (2026-10-23). **La raíz de las siete lógicas** (`GUIAS/LOGICAS/`): todo
> diseño, requerimiento e interfaz nace de aquí. Trae tres capas: (A) lo que el agente se
> imaginó del flujo —hipótesis—; (B) el contraste de esa hipótesis contra el software
> real; (C) los ocho flujos con cortes y el escenario de 18 pacientes que son la norma de
> diseño. **Marca honesta: la validación con el personal del centro (guion de 20 minutos
> por persona) está pendiente — hasta entonces, esto es hipótesis informada.**

> **NORMA VIGENTE — Capas D, E y F** (flujo replanteado · autocrítica ·
> optimizaciones). **Capas A, B y C = historia** (hipótesis, contraste y
> escenario): se conservan como registro, no mandan sobre la norma.


## Capa A · La hipótesis del agente (tres recorridos imaginados)

**Enfermera:** entra con su PIN → busca o registra a la paciente → estación de constantes
(3 min) → consentimiento si lo piden → agenda la próxima cita → respaldo semanal. **Médica:**
busca → ficha → estado de salud de un vistazo → estudio de ultrasonido → calculadoras con
prellenado → apoyo clínico → episodio si hay embarazo → historia y nota firmada →
interconsulta → siguiente control. **Dueño:** alta de personas con rol → firma de catálogos
→ bitácora → respaldos por cadencia. **Seis dudas declaradas con la hipótesis:** inicio del
día sin lista de citas · hilo de la paciente mal declarado · el oficio separa pantallas más
de lo que la realidad separa personas · todo el relato contaminado por el embarazo · no
existe atajo de urgencia · se reabre demasiado en demasiadas pantallas.

## Capa B · El contraste contra el software real (once puntos, por tipo)

**Tipo 1 — el paso existe pero se hace peor de lo que el flujo pide:** (1) el hilo de la
paciente no se ve en la pantalla de controles (H-012); (2) el inicio no muestra el día
(H-010); (3) los filtros del inicio están anunciados en la ayuda y sin construir; (4) el
rol apenas modifica la experiencia. **Tipo 2 — planeado y pendiente:** (5) recuperar acceso
no existe (H-008); (6) los catálogos completos esperan su obra (el panel sale gris); (7)
la admisión del teléfono espera el servidor de la fase con hardware. **Tipo 3 — nunca
contemplado, requiere decisión:** (8) no hay atajo de urgencia; (9) la paciente no
embarazada no tiene dónde vivir su seguimiento; (10) los protocolos múltiples no caben en
el modelo (H-014); (11) cambiar de paciente a mitad de consulta no está pensado.
**Advertencia estructural:** todo este contraste es papel contra papel —el flujo real
solo se mide cuando el personal ejecuta el recorrido frente al programa, que es justamente
la conversación pendiente.

## Capa C · Los ocho flujos con cortes (la norma de diseño)

**Flujo 1 · Mañana base 9–3 sin cortes:** cuatro pacientes de casos distintos (embarazo de
28 semanas, VPH en su 2.ª aplicación, tumoración en revisión, primera visita derivada) con
tablero, registro rápido y médico derivador en lista. **Valor:** nadie se pierde; las
distintas necesidades caben cada una en su calendario.

**Flujo 2 · Cesárea a las 10:30:** el control se corta → pausa de la atención con clic →
parto registrado (fecha, vía, bebés, peso) y episodio cerrado → el tablero libera el cupo
visiblemente. **Valor:** nada de lo de María se pierde y el día sigue sin recomponerse a
mano.

**Flujo 3 · Parto en la puerta sin expediente (11:00):** registro de emergencia desde el
teléfono (identidad mínima, folio, rojo al frente) → parto → ficha completada después sin
duplicar. **Valor:** la urgencia no depende de que el registro esté completo.

**Flujo 4 · Urgencia obstétrica con banderas (12:00):** cefalea + visión borrosa +
hinchazón al guardar → alerta que **reordena el tablero** al frente en rojo → decisión e
interconsulta firmada. **Valor:** la alerta mueve al equipo, no solo a la pantalla.

**Flujo 5 · Urgencia ginecológica sin embarazo (13:00):** sangrado de tumoración → el
software hoy solo puede ofrecer ficha, historia y nota —**aquí se expone la carencia**:
falta protocolo de tumoración y falta urgencia que no pregunte por embarazo. **Valor:**
convierte el problema en requisito.

**Flujo 6 · Se va la luz (12:15):** guardados atómicos conservan lo escrito; puente de
papel con los campos mínimos; al volver se transcribe con la hora real; el tablero muestra
quedó a medias. **Valor:** la confianza de que un apagón no daña el expediente de nadie.

**Flujo 7 · El equipo falla (13:10):** disco lleno o pantalla congelada → al reabrir, el
último guardado está entero, la bitácora dice qué se escribió y un mensaje humano dice qué
hacer; el tablero muestra quién quedó a mitad. **Valor:** la falla no cuesta datos ni
confianza.

**Flujo 8 · Ecógrafo o memoria fallida (13:30):** previsualizar, verificar, rechazar sin
escribir a medias → el estado «estudio pendiente — reintento» aparece **en el tablero**.
**Valor:** un estudio que no llega no se vuelve el problema número diecinueve.

## El escenario cargado — la norma, no la excepción

**18 pacientes entre 10:00 y 13:50** (personal asumido: una médica titular, dos enfermeras,
recepcionista —**el dueño debe corregirlo si el centro trabaja distinto**): embarazadas en
varias semanas · una con urgencia · duelo obstétrico · VPH e infección con sus calendarios ·
fertilidad día 6 · tumoración ovárica y tumoración uterina · post-quirúrgica ·
planificación · menopausia · adolescentes con regla de confidencialidad · una derivada sin
cita · una que llega en trabajo de parto sin expediente. Ritmo: carril de registro y
estaciones de 3 minutos contra bloques de consulta de 12–15; **la cola se gestiona con
relojes en la tarjeta** (30 min amarillo, 45 rojo), no con memoria. Los siete cortes
(clínicos y técnicos) ocurren **sobre este día lleno** —por eso el diseño se exige así.

## Lo que la raíz exige construir (se une a la doctrina)

Cuatro requisitos de diseño que de estos flujos salen: **el tablero con estados y
atenciones pausables** (flujos 1, 2, 3, 4, 7) · **la identidad a la vista en toda
escritura** (flujos 2, 3, 5) · **los protocolos por diagnóstico con el embarazo como uno
más** (flujos 1, 5) · **el puente humano cuando la máquina falla** (flujos 6, 7, 8 —
papel, mensajes humanos, reintentos visibles). El software ya tiene construidos los
ingredientes de casi todo —alertas, parte de parto, verificación de estudios, guardados
atómicos, bitácora, agenda, tarjeta de estado—; **le falta la receta que los une**: el
tablero, la cinta de identidad y los protocolos.

## Próximo paso de esta raíz (el que manda)

Llevar a las personas de la consulta los seis dibujos de `GUIAS/EDICION/PROPUESTAS/` con
el guion de 20 minutos y la plantilla de marcado (`../PLANTILLA-REVISION.md`), y sustituir
esta hipótesis por **flujo validado**: veredicto por pantalla (aprobar / aprobar con
cambios / rediseñar) y correcciones con número. Solo lo validado baja al código.

---

## Capa D · El flujo replanteado con todo integrado (2026-10-23 noche) — físico y digital

Replanteo completo del día, con todo lo ya integrado (tablero, cinta de identidad,
pausa, protocolos, sistema de alertas, registro de emergencia), **empezando por lo
físico** —lo que el cuerpo hace en la sala— y después lo digital —lo que el software
hace—. Énfasis en la enfermera, como pidió el dueño.

### La mañana de la enfermera — física primero, después el software

**9:50 — abrir.** Físico: encender, acomodar la sala, revisar quiénes llamaron ayer.
Digital: el software abre **solo en el tablero de hoy** con el estado heredado de ayer.
Aquí hay una verdad que mi flujo anterior escondía: **el software no sabe quién llamó**;
la que contestó el teléfono ya lo sabe — el sistema de recordatorios preparó los mensajes
ayer, y esa conversación sucede **antes** de encender. El orden real es: llamadas →
agenda de hoy → encender. *(Error corregido: mi flujo anterior empezaba «encender y ver
el tablero», como si el día naciera en la pantalla.)*

**10:00 — la puerta.** Físico: «buenos días, ¿con cita?». Digital: si estaba en agenda,
su tarjeta cambia de *con cita* a **llegó**; si vino sin cita, registro rápido en la
puerta — con sus cuatro datos de la libreta (nombre, fecha de nacimiento, ciudad de dónde
viene, teléfono) y, si son varias seguidas, el registro **encadena** («¿siguiente?») sin
saltar de pantalla. Aparece aquí un estado que mi tablero anterior no tenía: **la cita que pasó y no
llegó** —a las 11:30, quien tenía las 10:15 y no apareció no puede seguir en «espera»;
su tarjeta se apaga con «no llegó» y ofrece reagendar. *(Error: mi tablero solo veía a
los que estaban.)*

#### La visita — un hecho del día, no un dato de la paciente (añadido 2026-10-24, H-039)

Lo que descubrí al revisar la puerta: **confundí a la paciente con su visita**. La
paciente es quien es (nombre, fecha, CURP — eso se guarda una sola vez y no cambia). La
**visita** es lo que pasó **hoy**: que llegó a tal hora, desde tan lejos, sin desayunar,
en caminando, y por esto y no por aquello. Son dos cosas distintas y el software anterior
solo guardaba una.

**La visita lleva cinco datos de llegada** (todos del día, se borran solos mañana):
**hora de llegada** (el reloj de espera nace aquí, no de la cita) · **procedencia** —de
dónde viene, porque hay pacientes foráneas que tardan horas en volver y eso cambia cuándo
se les agenda— · **si ya desayunó** —importa en clínica: hay estudios y procedimientos
que piden ayuno— · **cómo llegó** —caminando, en camión, derivada en camilla: dice de su
estado al entrar— · **acompañante o quién la trajo**.

**Y la razón de la visita, que no es fija.** Ella dice al entrar por qué viene; pero a
veces viene **solo a recoger un estudio**, otras **a entregar su laboratorio en papel**,
y otras **por una cosa que en la plática o la exploración se vuelve otra**. Por eso la
razón se guarda **en dos capas**: la **declarada** (lo que dijo al entrar) y la
**resultante** (lo que al final fue); si cambian, la declaración original **no se borra**,
queda bajo la resultante. Una razón que cambia es información clínica —cuenta cómo se
descubrió el problema—, no un error a corregir.

**Razones de llegada (lista firmada, no es código):** control programado · recoger
estudio · entregar laboratorio · una molestia nueva · derivada de otro centro · urgencia
declarada. Cualquier razón que cambia durante la visita deja las dos capas visibles en su
ficha.

*(Esto aún es hipótesis informada: la lista de razones y si el ayuno se pregunta siempre
o solo antes de ciertos estudios lo decide su equipo en la entrevista, no yo.)*

#### Una verdad, muchos equipos — y las alertas en paralelo (añadido 2026-10-24, H-041, H-042)

Corrección del dueño a mi propuesta de roles, y es mejor que lo que yo había dibujado.
Yo había repartido **pantallas distintas por rol** —una casa para la médica, otra para
enfermería— y había dejado el celular **solo para capturar**. Ambas cosas están mal, y
por dos razones de verdad.

**Uno: los equipos muestran las mismas realidades y tienen las mismas funciones.** No hay
"versión de enfermera" y "versión de médica": hay **un solo sistema**. La médica usará
sobre todo **documentos** —informes del ultrasonido, recetas, permisos, aceptaciones de
cirugía—, y eso manda cómo se organiza lo suyo; las enfermeras también hacen documentos;
y todos usan casi todo lo demás **mientras sea útil**. El rol no decide qué funciones
existen —solo qué uso es más frecuente—. Si una enfermera necesita abrir un informe, lo
abre; si la médica necesita capturar una constante, la captura. **Esconder funciones por
rol es perder capacidades**, y en un centro chico la persona que falta hoy deja un hueco
que nadie puede tapar. *(Error mío: diseñé segregando cuando la realidad es que todos
hacen de todo.)*

**Dos: la misma verdad, en todos los equipos a la vez.** El tablero, la cinta, los
cálculos y las alertas **son idénticos** en la laptop de la estación, en la computadora
del consultorio y en el celular de la enfermera. No hay "datos del celular" distintos:
es **la misma verdad vista en equipos de distinto tamaño**. Y eso, que suena a
complejidad, en realidad **simplifica**: como el tablero ya es una **lista priorizada**
—no columnas—, se acomoda sola a una pantalla chica sin que nadie dibuje una versión
aparte. Las columnas habrían exigido dos diseños; la lista se estrecha y ya.

**Las alertas, en paralelo en todos lados.** Cuando un cálculo dictamina —el HOMA sale
de rango, la tensión enciende una bandera, un valor se vuelve urgente—, el aviso
**enciende al mismo tiempo en la computadora y en los celulares de las enfermeras**. No
es "primero la laptop y después el teléfono"; es **a la par**. La razón es física y la
dio el dueño: la enfermera casi siempre está **junto a la paciente, con el celular en la
mano**, no pegada a la computadora. Si el aviso solo vive en la computadora, pueden
pasar **minutos** antes de que alguien lo vea, porque el flujo de la sala está lleno.
Pero si el mismo aviso vibra en el celular de la que está en el pasillo, ella lo ve
**al instante** y se lo comunica a la médica —de viva voz, que es como se resuelve de
verdad una urgencia—.

**Y el valor no es solo mostrar: es que alcance.** El software calcula solo y rápido —eso
ya se resolvió—; lo caro es **que el cálculo llegue a un ojo humano en segundos**. Por
eso la alerta no espera a que alguien abra una pantalla: se empuja a todos los equipos,
y el celular es la pieza que **corta la distancia** entre el cálculo y la persona que
está junto a la paciente. Es más fácil que cualquier enfermera la vea en su teléfono y
la reporte, que esperar a que pase por la estación.

*(Lo que esto complejiza, y es honesto decirlo: exige que varios equipos reciban la misma
alerta al instante —sincronía en red local, sin depender de internet—, y que un celular
apagado o sin señal no haga perder el aviso: debe recuperarlo al volver. Ese es el costo
técnico real, y está por confirmar con ingeniería: cómo se reparte el aviso entre
equipos y qué pasa si uno está caído.)*

**10:10 — el carril de constantes.** Físico: silla, tensiómetro, tres minutos, y la
paciente que pregunta diez minutos aunque solo traiga una. Digital: estación con la cinta
de identidad, los diez campos del control (R-14); los cálculos corren con cada dato y los chips salen al guardar, con la entrega (T2).
Ahí también se **revisan los estudios que la paciente trae en mano** y se **prepara a la
que pasa a ultrasonido — según el tipo (ginecológico, gineco-obstétrico, de embarazo o
pélvico)**. Interrupción real:
el teléfono, la médica que necesita algo — la estación se **pausa** con su micro-estado
*estación a medias* (otro estado que no existía: mi pausa solo contemplaba consultas
médicas). *(Error: diseñé pausa para una sola de las dos carriles.)*

**10:40 — quien llegó con papel.** Físico: Ivonne trae en mano su laboratorio impreso.
Digital: captura rápida *laboratorio recibido* —tres datos en treinta segundos— que
alimenta el semáforo. Otra verdad que el flujo anterior ignoraba: **en el centro real
gran parte del laboratorio llega en papel**, y sin ese paso digital, el semáforo se
queda gris por diseño. *(Error: asumí laboratorio que ya vive en el sistema.)*

**11:00 — la urgencia.** Físico: **primero la voz** —se llama, se grita si hace falta—,
después la pantalla: la tarjeta se mueve al frente. El software ordena; **no sustituye
el grito**. *(Error de mi flujo anterior: mostraba la urgencia resuelta con un chip,
como si en una sala el aviso digital se escuchara solo.)*

**11:30 — las llegadas y las ausencias.** Físico: cola fantasma —la que llega sin cita,
la que pregunta si aún hay lugar. Digital: registro rápido y *no llegó* para las ausentes.
*(Error: mi tablero solo contemplaba lo agendado; el consultorio real tiene cola.)*

**12:15 — la mañana encima, con avisos.** Digital: los chips de plazo y vencimiento
aparecen en las tarjetas. Pregunta que el flujo anterior no respondía: **¿quién hace cada
aviso?** Sin respuesta, los avisos son el nuevo papel tirado. La regla nueva: **todo aviso
y todo plazo nace con su dueño** —tamizaje ⇒ quien toma constantes; chequeo de laboratorio
⇒ quien captura; banda roja ⇒ la médica, de voz—. *(Error: diseñé 47 avisos por semana
sin diseñar a nadie que los cobre.)*

**13:50 — el cierre, que tampoco existía.** Mi flujo anterior terminaba en «16 de 18
atendidas» —y ahí se acababa, como si el día no tuviera final. El cierre real necesita:
quiénes quedaron y por qué · plazos vencidos sin atender · la paciente de emergencia sin
ficha completa · el respaldo de la tarde · la agenda de mañana con lo que se reagendó —
**en una pantalla de traspaso, imprimible**, que entrega el turno de la tarde a quien
venga. *(Error: diseñé mañanas y nunca diseñé cómo terminan.)*

### La consulta de la médica — con lo integrado

Entra, el tablero le dice quién está y quién es urgente; elige, su cinta lleva los
permanentes (alergia, sangre, medicación); los cálculos ya corrieron con lo que la
enfermera capturó; al guardar, los avisos salen con su acción; la urgencia se confirma
**en voz con el equipo y en tarjeta con el tablero**; la nota cierra la consulta; la
agenda propone la siguiente cita desde el protocolo. **Su propio corte**: si ella va a
sala de parto —la cesárea de las 10:30—, el tablero necesita un estado que no le puse:
**equipo fuera / en sala**, para que la espera de las pacientes se explique sola. *(Error:
mi tablero vigilaba pacientes y olvidó al equipo.)*

## Capa E · Autocrítica del flujo imaginado — los errores que encontré (sin optimismo)

**Grupo 1 · Supuestos que no son ciertos:** (1) dibujé el día maduro —el día 1 real es
lento y caótico, con la mitad de pacientes y el doble de dudas—; (2) usé el teléfono de
la enfermera que **todavía no existe** (espera hardware): mi flujo dependía de algo no
construido; (3) asumí dos enfermeras; el flujo debe ser válido con **1 médica + 1
enfermera**; (4) asumí la agenda ya cargada cuando alguien la carga; (5) asumí WiFi
disponible y PC rápido —nada está medido con 18 pacientes de ráfaga—; (6) asumí personal
que ya sabe usarlo: sin capacitación, el día 18 es mentira.

**Grupo 2 · Errores de diseño de mi tablero:** (7) **sin regla de mantenimiento** —
no declaré quién lo mueve ni desde qué evento: un tablero que depende de clics de buena
voluntad muere en dos semanas y es peor que no tenerlo; (8) faltó el estado *no llegó*;
(9) faltó el estado *estación a medias*; (10) faltó *equipo fuera*; (11) el tope de 4
atenciones abiertas es un número inventado, sin base; (12) no definí **quién controla
la misma atención cuando dos personas** (enfermera y médica) la tocan a la vez;
(13) la fuente de verdad al principio de la mañana es ambigua: ¿la hoja de recepción o
el tablero? —mientras haya dos, hay dos verdades.

**Grupo 3 · Errores de mis avisos:** (14) avisos **sin dueño** ⇒ ruido (mi propia demo
mostró 47 por semana); (15) la urgencia **no termina en pantalla**, termina en voz —
diseñé el chip y olvidé a la persona; (16) el plazo creado «solo» también necesita
quien lo reclame al vencer; (17) contar con el color como garantía, cuando hay prisa,
reflejo y daltonismo —el color ayuda, la palabra confirma—.

**Grupo 4 · Errores de continuidad:** (18) **no diseñé el cierre de día ni el traspaso**
—el día se queda sin final; (19) la paciente de emergencia *sin ficha completa* no tiene
dueño ni fecha límite de completado; (20) el laboratorio en papel no tenía su paso de
digitalización; (21) la cola fantasma (sin cita, no agendada) no existía en mis estados;
(22) la interrupción social —la que entra a preguntar a mitad de todo— no tiene
representación.

**Grupo 5 · Errores de realismo:** (23) el carril de 3 minutos no contempla a la que
viene sin papeles ni CURP —el carril se atasca y el tablero no explica por qué; (24) si
la única enfermera está en urgencia, **todo el resto se detiene** y mi flujo no lo
mostraba; (25) confié en que «todo se guarda» en un equipo posiblemente viejo, sin
métrica de rendimiento real.

## Capa F · Las optimizaciones que de ahí salen (y qué documento editan)

- **O1 · Tablero con regla de eventos y dueño declarado:** los estados se mueven
  **automáticamente** desde hechos reales (cita creada ⇒ llegada registrada ⇒ estación
  guardada ⇒ consulta cerrada ⇒ atendida) y solo lo que exige juicio es manual (urgencia,
  pausa y la prioridad de paso —de las personas, nunca calculada por el software). Dueño: recepción cuida llegadas y ausencias; quien atiende, lo suyo.
  → edita **DOCTRINA, pilar 1**.
- **O2 · Estados nuevos:** *no llegó* · *estación a medias* · *equipo fuera*.
  → edita **DOCTRINA, pilar 1** y las propuestas del tablero.
- **O3 · Todo aviso y todo plazo nace con su dueño** (rol responsable) y al vencer sube
  al tablero. → edita **SISTEMA-DE-ALERTAS**.
- **O4 · La urgencia termina en voz** —regla de experiencia: el software ordena, la
  persona llama. → edita **SISTEMA-DE-ALERTAS**.
- **O5 · Traspaso en 1 clic** (resumen imprimible del día: quién quedó, qué venció, qué
  falta completar) y **cierre de día de 5 pasos**. → nuevo requisito de flujo.
- **O6 · Día 1 y capacitación:** estreno con pocas pacientes y acompañamiento; el día
  de 18 es la semana 3, no la jornada 1. → regla de adopción del flujo.
- **O7 · Prueba de personal mínimo:** todo flujo debe funcionar con **1 médica + 1
  enfermera** (si depende de dos enfermeras, no es un flujo, es un deseo). → regla del
  flujo.
- **O8 · Captura de laboratorio recibido en papel** (30 segundos) para que el semáforo
  no viva gris. → requisito de dato.
- **O9 · Fuente única desde el minuto cero:** la agenda se carga con la llamada; el
  papel de recepción se retira por acuerdos, no por decreto. → regla de transición.
- **O10 · El equipo también tiene estado** (en sala, fuera, de vuelta). → edita
  **DOCTRINA, pilar 1**.

**Estado:** esta Capa D–F sustituye a la Capa C como **norma de diseño**; las Capas A–C
se conservan como historia (hipótesis → contraste → escenario). Pendiente del dueño:
aprobación de O1–O10 para volcarlas a las guías de propuestas (el tablero dibujado
todavía no muestra los estados nuevos).
