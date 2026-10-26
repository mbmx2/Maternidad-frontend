# PRESENTACIÓN DE CONTENIDO — qué se muestra, por qué y cómo (doctrina viva del frontend)

> Registro vivo (2026-10-24, pedido del dueño — H-043, H-044, H-045). **El problema que
> resuelve:** `PRESENTACION-EN-PANTALLA.md` dice **dónde** cabe (la ventana manda) y
> `SISTEMA-DE-ALERTAS.md` dice **qué significa** un aviso (los seis tipos, acción, dueño),
> pero ninguno de los dos declaraba **la mecánica de entrega**: cuándo aparece un mensaje,
> cómo llega sin secuestrar la pantalla de quien está escribiendo, y con qué lenguaje para
> que la paciente —que está mirando la misma pantalla— no salga angustiada. Ese hueco es el
> que este documento cierra, y cubre **todo el alcance del frontend HTML**.
>
> **Decisión central de este documento:** separar **calcular** de **entregar**. El cálculo
> corre en el segundo en que los datos existen; el mensaje se entrega en el momento en que
> la persona puede recibirlo. «Lo más rápido posible» y «sin interrumpir» no se pelean
> cuando se entienden como dos cosas distintas.

---

## 1 · Las tres reglas de entrega (lo que este documento declara por primera vez)

**Regla T1 · El aviso no roba la pantalla de nadie — antipatrón explícito.**
Si dos enfermeras capturan a la vez en equipos distintos, el cálculo que dispara por la
paciente de una **no toca la sesión de la otra**: no abre ventana que se ponga al frente,
no borra ni desplaza lo que se está tecleando, no roba el foco, no cambia de pantalla. Un
aviso que secuestra el formulario es **peor que no aviso**: pierde el trabajo capturado y
convierte el valor del software en enemigo del flujo. El aviso **se recibe, no secuestra**.
Esto aplica incluso dentro de la misma sesión: un cálculo que corre en segundo plano
mientras se escribe no interrumpe la escritura.

**Regla T2 · «Instantáneo» no es «en cualquier momento»: el aviso espera su punto de
entrega.** El cálculo es inmediato; **la presentación espera un corte natural del
trabajo** —el más cercano a los datos que lo produjeron—: al terminar el **registro de la
paciente**, al terminar la **visita**, al **guardar** el control o la prescripción. En ese
punto la persona ya dejó de teclear y puede mirar. A mitad de captura, el resultado no se
muestra: **se acumula y se entrega al corte**. (Excepción: lo que **detiene** —interacción
que choca con alergia— sí interrumpe, porque es seguridad; es el único caso autorizado a
hablar antes de tiempo, y ya estaba así.)

**Regla T3 · Toda pantalla tiene audiencia declarada: el personal y la paciente.**
La misma superficie la lee quien actúa **y** quien está sentada enfrente. Por eso todo
mensaje lleva **dos registros**: uno de **superficie** (visible por defecto, calmado, hecho
para cualquiera que lo alcance a ver) y uno **clínico** (interpretación completa, a un clic
del profesional). La regla de lenguaje de superficie es dura: **cero lenguaje de
catástrofe** —ni «EMERGENCIA CLÍNICA» en mayúsculas, ni «PELIGRO», ni un diagnóstico
sustantivo gritado como titular—. Se dice **el hecho y la acción**: «tensión 148/94 —
evaluar hoy». La paciente lee una tarea pendiente; el profesional lee lo mismo y sabe qué
significa. **La interpretación diagnóstica completa está a un clic**, en su registro
clínico. *(Punto abierto para el equipo: si en modo consulta —paciente enfrente— el
registro clínico arranca plegado o visible. Mi propuesta: plegado en la vista de la
paciente, visible en la vista de la médica. `[SUPUESTO]`)*

---

## 2 · POR QUÉ se presenta así — las razones, una por regla

**Por qué T1 (no robar pantalla):** porque la captura es el momento más frágil del sistema
—ahí se escribe con una mano, con la paciente hablando, con prisa—. Cualquier interrupción
ahí no solo estorba: **pierde datos reales**. Y porque hay varias personas a la vez en la
misma verdad; lo que le pasa a un equipo no puede congelar a otro. La regla existe para
que el software sea predecible: **nunca te quita lo que estás haciendo**.

**Por qué T2 (punto de entrega):** porque «al instante» mal entendido produce exactamente
T1. El valor no está en que el aviso aparezca a los 0,2 segundos, sino en que **esté
disponible en el momento en que alguien puede actuar sobre él** —al terminar de registrar,
al guardar—. Ahí el aviso es bienvenido; a media palabra es una agresión. Además, entregar
al corte agrupa los resultados de la visita en **un solo lugar coherente** (el panel de
avisos de la consulta), en vez de esparcirlos por el camino.

**Por qué T3 (doble registro):** porque la pantalla de la consulta es semipública —la
paciente ve el monitor desde enfrente y el celular de la enfermera queda a su alcance—, y
un mensaje que la asusta **daña**. La ansiedad anticipada empeora la experiencia clínica y
a veces hasta cambia cómo cuenta la paciente sus síntomas. Pero **suavizar hasta borrar el
aviso sería otro defecto**: el profesional necesita el hallazgo claro y directo. La salida
no es elegir entre los dos, sino **dos registros del mismo mensaje**: superficie calmada,
detalle clínico a un clic.

---

## 3 · CÓMO llega — la escalera de entrega (sin secuestrar)

Un aviso sube por escalones, y **ninguno de ellos roba el foco ni mueve lo que se está
escribiendo**:

1. **Llegada (fondo):** el cálculo corre al haber datos; el resultado **se acumula** en la
   zona fija de avisos de esa sesión, como contador. Nadie es interrumpido.
2. **Entrega (al corte):** al terminar registro / visita / guardado, los avisos acumulados
   **se muestran en su panel**, en su pantalla, con acción y dueño. Se ven porque la persona
   ya miró.
3. **Permanencia:** un aviso no atendido **no desaparece**; queda en su zona y en su
   bitácora, y si vence sube al tablero. No se cierra solo.
4. **Prioridad sin gritar:** lo urgente ocupa **el primer lugar** de su panel y su tarjeta
   sube al frente del tablero —posición, no escándalo—. **El color nunca va solo**
   (palabra junto al rojo). Y la urgencia **cierra la voz humana**: el software ordena y
   posiciona; llamar al equipo es palabra dicha en alto, no un chip.
5. **Cruzado entre equipos (H-042):** el mismo aviso queda disponible **a la par** en la
   computadora y en el celular de enfermería —misma verdad, varios equipos—, y cada equipo
   lo muestra **sin interrumpir su propia sesión**. Un celular sin señal **no pierde el
   aviso**: lo recupera al volver.
6. **Cierre:** todo aviso queda registrado —quién lo vio, si se atendió—; sin eso no hay
   auditoría ni medición de fatiga.

**Lo que queda prohibido en cualquier pantalla:** ventana modal que aparezca por un cálculo
de fondo · robo de foco a mitad de escritura · reemplazo de la pantalla donde se está
trabajando · aviso que borre lo capturado · mensaje con lenguaje de catástrofe en su
superficie · color sin palabra · aviso sin acción ni dueño.

---

## 4 · QUÉ se presenta, por familia de pantalla — el inventario del alcance HTML

Regla de fondo: **cada pantalla responde una sola pregunta**, y su contenido se ordena
para responderla en el primer vistazo (Regla 1 de la ventana). Lo clínico, lo largo o lo
histórico va **a un clic** (Regla 2).

- **Tablero (inicio):** lista priorizada de la verdad del día —zona de urgencia, atención
  inmediata, en curso, espera tranquila, cerradas/próximas—. Tarjeta de **cuatro cosas**:
  nombre con fecha de nacimiento, por qué vino hoy, estado en palabras de sala, un botón.
  Mensajes de tarea en **«falta + verbo»**. Reloj **solo en espera** (no corre con la
  médica ni en pausa).
- **Registro / visita:** identidad (obligatorio, una vez) · datos de llegada del día ·
  razón declarada → resultante. Al terminar: **punto de entrega** de avisos (T2).
- **Control prenatal y toda captura de constantes:** cinta con los datos que salvan arriba ·
  campos con calendario · banderas · chips de cálculo **al llenar** (disponible) · y el
  **panel de avisos al guardar** (entregado). Botón con el nombre de la paciente dentro.
- **Modo consulta (vista de la médica):** cinta con permanentes · estado y semáforo ·
  accesos · el registro clínico de los avisos aquí **visible**; con la paciente enfrente,
  sujeto al `[SUPUESTO]` de T3.
- **Ficha:** portada en tres bloques con «datos que salvan» siempre arriba; **siempre con
  la paciente elegida** (nunca una precargada de mentiras).
- **Prescripción:** verificación de interacción y alergia **antes** de completar el
  guardado —único aviso con permiso de interrumpir—.
- **Laboratorio en papel / capturas:** tres datos, semáforo que deja de estar gris, bandera
  honesta de «escrito tardío».
- **Cálculos:** número + rango + interpretación + botón de guardar; fuera de rango ⇒ aviso
  con acción, entregado por T2, no al teclear.
- **Documentos (uso principal de la médica):** plantilla con datos ya traídos; una sola
  pregunta: producir el documento.
- **Agenda / pendientes / cierre:** los plazos con su fecha; el cierre con traspaso y
  respaldo.
- **Sistema / respaldo / acceso:** configuración y seguridad, con catálogos firmados.
- **Falla (degradación):** mensajes humanos, con «último guardado a las HH:MM» y el puente
  de papel; **jamás** ventana de error técnico como única salida.
- **Superficies del celular:** misma verdad, misma función, adaptada a dedo (objetivos ≥
  36×36 px): captura de constantes, emisión de QR, y la **zona de avisos** sin interrumpir.

---

## 5 · Los números de aceptación (se miden, no se discuten)

1. **0 cálculos que roben el foco o cambien de pantalla** —prueba: escribiendo en un
   formulario, un cálculo de otra paciente dispara y **el cursor y lo tecleado siguen
   donde estaban**.
2. **0 avisos de cálculo mostrados a mitad de captura** —se entregan en el corte (registro
   / visita / guardado), salvo interacción de seguridad.
3. **0 mensajes con lenguaje de catástrofe en superficie** —revisión de texto: ni mayúsculas
   de alarma, ni «peligro», ni diagnóstico como titular a la vista de la paciente.
4. Todo aviso de superficie se lee como **hecho + acción**; la interpretación completa, a
   ≤1 clic.
5. La misma alerta, **a la par** en computadora y celular, **sin interrumpir ninguna de
   las dos sesiones**.
6. Un celular sin señal **recupera el aviso** al reconectarse (no se pierde).
7. Cero interrupción que **pierda lo capturado** en cualquiera de las pantallas.
8. Todo aviso, sin importar cuándo se entregue, queda en **bitácora con quién lo vio**.

---

## 6 · Dónde se aplica

En las **33 páginas** de `GUIAS/EDICION/PROPUESTAS/` (el alcance HTML completo) y —lo que
manda— en el programa real cuando se construya: la no interrupción, el punto de entrega y
los dos registros de lenguaje son **requisitos de código, con su prueba**, no aspiraciones
de dibujo. Su hoja de ruta de contratos vive en `GUIAS/CONTRATOS/MAPA-DE-IMPLEMENTACION.md`;
los tipos de aviso y su significado, en `GUIAS/LOGICAS/SISTEMA-DE-ALERTAS.md`; la ventana,
en `GUIAS/LOGICAS/PRESENTACION-EN-PANTALLA.md`.
