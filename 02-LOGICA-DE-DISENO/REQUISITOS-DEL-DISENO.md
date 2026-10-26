# REQUISITOS DEL DISEÑO — fuente de verdad del frontend HTML (registro vivo)

> Registro vivo (2026-10-24, orden del dueño: recopilar toda la lógica de las sesiones
> 2026-10-23 y 2026-10-24 y estructurarla en una sola documentación clara). **Para qué
> sirve:** explicar, decisión por decisión, **qué** se presenta en cada pantalla, **por
> qué** se presenta, **cómo** se presenta y **por qué se presenta así y no de otra forma**
> —y anclar cada decisión a la página HTML que la demuestra—, de modo que las muestras
> sirvan para explicar todas las necesidades y requisitos del sistema y que **ninguna
> decisión se pierda entre sesiones**.
>
> **Qué no es:** no es ley (la ley es `ACTA_CONSTITUTIVA.md` v4.2) y no duplica los
> documentos canónicos: los **cita** con su casa, según la regla de casa canónica de
> `LOGICAS/AUDITORIA-DE-LA-LOGICA.md` §5. Los 33 dibujos siguen siendo **dibujos de
> decisión**: muestran la necesidad, no son el software, y esperan doble veredicto.
>
> **Última actualización:** 2026-10-24 · **Alcance:** 33 páginas de propuesta + 3
> recorridos = 36 archivos en `GUIAS/EDICION/PROPUESTAS/`.

---

## 1 · La cadena de verdad (dónde vive cada cosa, para no buscarla dos veces)

De mayor a menor autoridad, y qué gana si dos chocan —regla de precedencia de
`SISTEMA-DE-LOGICAS.md`:

1. **La ley** — `ACTA_CONSTITUTIVA.md` v4.2. Gobierna principios, no formas: papel antes
   que código, ventana legible, veredicto humano. Un error jamás se arregla aquí.
2. **La raíz del flujo** — `FLUJOS-TRABAJO.md` capas D–F (norma; A–C = historia). Manda
   sobre el diseño: si el flujo choca con la realidad del personal, cambia el diseño.
3. **La lógica de diseño** — `LOGICAS/`: pilares (`DOCTRINA-DE-DISENO.md`) · alertas
   (`SISTEMA-DE-ALERTAS.md`) · ventana (`PRESENTACION-EN-PANTALLA.md`) · entrega de
   mensajes (`PRESENTACION-DE-CONTENIDO.md`) · las siete lógicas
   (`SISTEMA-DE-LOGICAS.md`). **Aquí viven las decisiones que este documento resume.**
4. **Este documento** — el registro de decisiones con sus cuatro campos y su página HTML.
5. **Los contratos** (`CONTRATOS/MODULOS/`) — la traducción a máquina. **Hoy van
   desfasados detrás de este registro** (hallazgo H-047: trece mecanismos sin contrato);
   se actualizarán para alinearse, no al revés.
6. **Los dibujos HTML** — evidencia de la necesidad, esperan veredicto.
7. **El veredicto del equipo** — el juez final. Todavía no se ha sentado.

**El checkpoint** (`CHECKPOINT-LOGICA.md`) **no es verdad: solo señala** con huella. Si su
huella difiere de la realidad, el checkpoint dejó de ser la verdad de esa capa.

---

## 2 · El formato de cada decisión

Cada entrada responde cuatro preguntas fijas:

- **QUÉ** — la decisión en una frase, sin rodeos.
- **POR QUÉ** — la necesidad o requisito real que responde (de dónde salió: un hallazgo,
  un error autocrítico, una ley, o la física del consultorio).
- **CÓMO** — su mecánica concreta en la pantalla: qué hay, dónde está, qué pasa.
- **POR QUÉ ASÍ y no de otra** — la alternativa descartada y la razón.
- **DÓNDE SE VE** — la página HTML que lo demuestra.

---

## 3 · Las decisiones, por tema

### A · El armazón — la estructura común que cuelga todo

**A1 · QUÉ:** una sola barra superior y una sola navegación izquierda en todas las
páginas.
**POR QUÉ:** descubrí que cada dibujo traía su propia copia de la barra y su propio menú,
que cambiaban entre pantallas y que al menos 15 enlaces apuntaban al índice en vez de a
una pantalla real. Eso no es un detalle feo: es que **no existía el esqueleto** del que
colgaran las pantallas.
**CÓMO:** barra fija arriba (marca · pantalla actual · aviso de que es propuesta · ayuda);
menú fijo a la izquierda con solo enlaces vivos; el contenido rueda dentro de su marco.
**POR QUÉ ASÍ:** la alternativa —cada pantalla autocontenida— es lo que produjo el
desorden; con un armazón único, corregir el menú una vez lo corrige en todas.
**DÓNDE SE VE:** las 33 páginas (todas comparten `.barra` y `.lateral` en `estilo.css`).

**A2 · QUÉ:** existe **una sola paciente en contexto** en toda la aplicación.
**POR QUÉ:** clicabas a García Luna en el tablero y Ficha te mostraba a Solís Vega. Cada
dibujo inventaba su propia paciente: no había una seleccionada que todas las pantallas
respetaran.
**CÓMO:** se elige con un clic en el tablero o con el buscador; se muestra siempre en la
cinta de identidad; **al cambiar de pantalla ella se queda elegida**; y si nadie está
elegida, las pantallas de paciente muestran «elija una paciente» —**jamás una de
mentiras**.
**POR QUÉ ASÍ:** la alternativa —paciente precargada por pantalla— obliga a que cada
nueva pantalla decida qué paciente muestra y garantiza el error de mostrar la equivocada.
Con una sola en contexto, el error es estructuralmente imposible.
**DÓNDE SE VE:** la cinta en `CONTROL`, `CONSULTA`, `PROTOCOLOS`, `LABORATORIO`; el estado
vacío en `FICHA`.

### B · El tablero — la pantalla de arranque

**B1 · QUÉ:** el tablero es una **lista priorizada en cinco zonas**, no nueve columnas.
**POR QUÉ:** nueve columnas de 250 px son 2.250 px y no caben en una ventana normal —en
tu pantalla se veían 4 y 5 quedaban escondidas tras el borde (H-026, H-040). Además, las
nueve columnas son los estados **del sistema**, no la pregunta **de la persona**: la
enfermera no se pregunta «¿en cuál de mis columnas está?» sino «¿a quién atiendo, a quién
le pasa algo, quién sigue?».
**CÓMO:** cinco zonas de arriba a abajo — **urgencia** (si la hay; pesa, no grita) ·
**atención inmediata** (la que más espera, la sin registrar, la estación interrumpida;
cada fila con un solo botón) · **en curso** (con la médica o pausada; **sin reloj**) ·
**espera tranquila** (dentro del plazo; reloj chiquito gris) · **cerradas y próximas**
(plegadas y buscables). La lista se reordena sola desde los hechos.
**POR QUÉ ASÍ:** descartada la tira horizontal por no caber, y descartado el tablero de
columnas porque modela al sistema. La lista se acomoda a cualquier ancho **sin dibujar una
versión aparte** —las columnas habrían exigido dos diseños; la lista se estrecha y ya—.
**DÓNDE SE VE:** `TABLERO.html`.

**Actualización B6 (2026-10-25):** el **mecanismo de orden** de esta propuesta queda
subordinado al dictamen **B6** — el equipo marca con «★ prioritaria» y el software **nunca
ordena por hora de llegada**: la zona «la que más espera» no puede existir como orden
automático (los relojes informan, no ordenan). Lo único que sigue pendiente de su frase en
esta propuesta es el **molde** (lista vs columnas, decisión abierta 10); el criterio de
orden ya no depende de ella: lo pone el equipo.

**B2 · QUÉ:** la tarjeta trae **exactamente cuatro cosas**.
**POR QUÉ:** el tablero estaba «muy cargado»: no encontrabas a una paciente atendida hoy
en dos segundos, y había que leer mucho. El tablero sirve para **triage, no para leer**.
**CÓMO:** nombre **con fecha de nacimiento del mismo tamaño** (separa homónimas de un
vistazo) · por qué vino hoy · estado en palabras de sala · **un solo botón** si hay
siguiente paso obvio. Todo lo demás —alergias, caso, notas, historial— es **un clic
adentro**.
**POR QUÉ ASÍ:** la alternativa —meter todo en la tarjeta— es exactamente lo que
saturaba; al meter solo lo que decide en un segundo, el resto se gana con un clic y nada
se pierde, solo se aplaza.
**DÓNDE SE VE:** `TABLERO.html`.

**B3 · QUÉ:** el reloj **solo corre mientras la paciente espera ayuda**.
**POR QUÉ:** «47 minutos» sin significado es ruido —¿bueno o malo?—. Y «pasó su tiempo»
en rojo gritaba más que el rótulo «En espera», desviando la mirada de la lista.
**CÓMO:** nace en su **hora de llegada** (la real, no la de la cita); **se para** cuando
está con la médica y en pausa; en espera tranquila es chiquito y gris; escala a ámbar/rojo
solo cuando cruza el umbral. La atendida no lleva reloj.
**POR QUÉ ASÍ:** la alternativa —mostrar el número todo el tiempo— convierte el dato en
ruido y en jerarquía al revés; con reloj de espera real, «47 min» siempre significa
«lleva 47 sin que la atiendan», lo único que significa algo.
**DÓNDE SE VE:** `TABLERO.html`.

**B4 · QUÉ:** hay **buscador** en el tablero.
**POR QUÉ:** tu regla dura —encontrar a cualquier paciente en dos segundos y actuar en uno
o dos clics—, incluida una que **ya se atendió hoy** y sale con un detalle.
**CÓMO:** un campo arriba; se teclea el apellido y salta la paciente; busca también entre
las cerradas de hoy.
**POR QUÉ ASÍ:** sin buscador, buscar en la lista es lectura minuciosa —exactamente lo
que pediste evitar.
**DÓNDE SE VE:** `TABLERO.html`. *[SUPUESTO: alcance —¿solo hoy o también históricas?]*

**B5 · QUÉ:** la urgencia ocupa el **primer lugar y más ancho**, y explica la espera.
**POR QUÉ:** la urgencia manda sobre la fila (pilar 5); y si la médica se fue a sala, la
espera de las pacientes debe **explicarse sola** en vez de solo mostrarse quieta.
**CÓMO:** zona superior con más ancho y borde rojo; si el equipo está fuera, una línea que
dice **dónde** está («la médica está en sala de parto») en vez de un término técnico.
**POR QUÉ ASÍ:** descartado «esconder la urgencia en una columna más» (rompe el pilar 5) y
descartado el término «equipo fuera» como etiqueta suelta (no significa nada en la sala).
**DÓNDE SE VE:** `TABLERO.html`.

**B6 · QUÉ:** la prioridad de paso la define **el equipo** —la enfermera o la médica— con
una marca manual; el software **jamás ordena por quién llegó primero** ni calcula quién
sigue: los relojes informan, no ordenan.
**POR QUÉ:** dictamen del dueño (2026-10-25): «el paso de las pacientes muchas veces no
tiene que ver con el viejo primero sino con una prioridad que solo las enfermeras y el
médico saben entregar; ni siquiera me gustaría entregarle esa facultad al software».
**CÓMO:** en la tarjeta, un botón **«★ Prioritaria»** —tercera excepción manual del pilar 1,
igual que urgencia y pausa—; la marcada **flota al frente de su zona** con el chip «★
prioritaria — la definió el equipo»; el mismo botón la quita. **Sin arrastrar** (nadie
arrastra tarjetas: O1); el reloj sigue corriendo como información y **nunca reordena**.
**POR QUÉ ASÍ:** descartado el orden automático por hora de llegada («el viejo primero» no
es el criterio de la sala), descartado el algoritmo de prioridad (eso entregaría la
facultad al software) y descartado el arrastre manual (muere en dos semanas).
**DÓNDE SE VE:** `TABLERO.html`.

### C · El vocabulario — qué dicen los mensajes

**C1 · QUÉ:** todo mensaje de tarea se escribe **«falta + [verbo]»**.
**POR QUÉ:** tú lo dijiste con claridad: «estación a mitad» no significa nada en el
consultorio. El error de fondo: yo nombraba **lo que le pasó al sistema** en vez de **lo
que le falta a la paciente** (H-041).
**CÓMO:** «falta registrar» · «falta pasar a consulta» · «falta entregarle estudios» ·
«falta recibirle estudios» · «faltan signos vitales» · «falta retomar» · «falta
completar la ficha». Lo que ya está bien no pide nada y se dice llano: «con la médica»,
«atendida», «en espera».
**POR QUÉ ASÍ:** descartada la jerga de sistema («dueño: recepción», «estudio pendiente
— reintento», «en uso de X»): no dice nada a quien lo lee. Y descartado que todo sea
«falta X»: el ojo aprende que «falta» = hay algo que hacer, palabra llana = no toques nada.
**DÓNDE SE VE:** `TABLERO.html`, `PAUSA.html`, `PENDIENTES.html`.

**C2 · QUÉ:** hay **dos gramaturas de mensaje** y no se mezclan.
**POR QUÉ:** una tarea pendiente y un hallazgo clínico son cosas distintas; tratarlos igual
empobrece a los dos.
**CÓMO:** **tarea** = «falta + verbo» (empieza por la acción, no hay hallazgo) ·
**hallazgo clínico** = qué se encontró → qué puede significar → qué hacer → quién actúa
(empieza por el hallazgo, porque es la razón de actuar; termina en la acción).
**POR QUÉ ASÍ:** una gramatura única o embotaría las tareas con hallazgos de más, o
escondería el hallazgo detrás de la acción.
**DÓNDE SE VE:** `TABLERO.html` (tarea) · `ALERTAS.html`, `CONTROL.html` (hallazgo).

### D · La visita — un hecho del día, no un dato de la paciente

**D1 · QUÉ:** la **paciente** (quien es, se guarda una vez) y la **visita** (lo que pasó
hoy) son dos cosas distintas.
**POR QUÉ:** confundí a la paciente con su visita: el registro solo pedía identidad y
contacto, y ningún dato de la llegada (H-039).
**CÓMO:** la visita lleva **hora de llegada** (pone el reloj, no la cita) · **procedencia**
(hay foráneas que tardan horas en volver y eso cambia cuándo se les agenda) · **si ya
desayunó** (hay estudios que piden ayuno) · **cómo llegó** (caminando, camión, derivada,
camilla) · **quién la acompaña**. Todo es del día y se borra solo mañana.
**POR QUÉ ASÍ:** la alternativa —guardarlo todo como si fuera de la paciente— mezcla lo
que no cambia con lo que cambia cada visita y llena la ficha de datos obsoletos.
**DÓNDE SE VE:** `REGISTRO.html`.

**D2 · QUÉ:** la razón de la visita se guarda **en dos capas: declarada y resultante**.
**POR QUÉ:** unas vienen **solo a recoger un estudio**, otras **a entregar su laboratorio**,
y otras **por una cosa que en la plática se vuelve otra**. Una razón que cambia es
información clínica —cuenta cómo se descubrió el problema—, no un error a corregir.
**CÓMO:** al entrar se elige la **declarada** de una lista firmada; si cambia, se anota la
**resultante** debajo y **la declarada no se borra**: las dos quedan visibles en la ficha.
**POR QUÉ ASÍ:** descartado sobreescribir la razón (se pierde el origen del hallazgo) y
descartado un solo campo (no distingue «vino por esto» de «terminó siendo esto»).
**DÓNDE SE VE:** `REGISTRO.html`.

### E · Las alertas — cuándo y cómo nacen

**E1 · QUÉ:** el cálculo corre **en el segundo en que sus datos existen**, sin que nadie
vaya a la pantalla de calculadoras.
**POR QUÉ:** tu tesis de valor: los avisos sobre los estados de salud son la mayor
propuesta, y deben calcularse y mostrarse **en cuanto esté disponible** (pilar 10).
**CÓMO:** datos → catálogo firmado → número con rango e interpretación. Sin sus entradas,
**no corre** y el chip dice «sin datos» en gris honesto.
**POR QUÉ ASÍ:** descartado «ir a una pantalla de cálculo» (nadie va; el cálculo se
olvida) y descartado imputar valores faltantes (da cálculos falsos y confianza falsa).
**DÓNDE SE VE:** `CALCULADORES.html`, `CONTROL.html`, `GRAFICOS.html`.

**E2 · QUÉ:** existen **cinco capas** de lo que se evalúa.
**POR QUÉ:** «alerta» es una palabra sola para cosas muy distintas; sin capas, todo
dispara igual y todo cansa igual.
**CÓMO:** **1 estado permanente** (alergia, sangre, medicación, crónicas — no dispara:
está siempre en la cinta) · **2 un valor fuera de rango** (se evalúa al teclear) · **3
combinación** (varias señales juntas; dispara cuando entra la **última pieza**) · **4
plazo** (venció un tamizaje) · **5 urgencia** (cruza a peligro: sube al frente y lo ve
todo el equipo).
**POR QUÉ ASÍ:** descartado un solo disparador genérico (no distingue lo que espera de lo
que mata) y descartado que la capa 3 se dispare con datos incompletos (avisaría a media
historia y el ojo deja de creerle).
**DÓNDE SE VE:** `ALERTAS.html` (los seis tipos), `FALLA.html` (capas de falla).

**E3 · QUÉ:** una **combinación diagnóstica dispara completa o no dispara**.
**POR QUÉ:** es la capa que hace que el software **piense** y no solo muestre —tu énfasis:
la combinación debe calcularse y mostrarse al instante.
**CÓMO:** necesita todas sus piezas; si solo hay una, espera. Al completarse, entrega el
mensaje de las cuatro partes.
**POR QUÉ ASÍ:** descartado disparar con lo que haya (falsos avisos a medias = fatiga).
**DÓNDE SE VE:** `ALERTAS.html`. *[SUPUESTO: cómo se definen —mi propuesta: híbrido: las
combinaciones comunes vienen listas, tú ajustas los números, qué señales se combinan viene
fijo—. Es criterio clínico: lo decides tú.]*

### F · Las alertas — cómo llegan sin interrumpir

**F1 · QUÉ (T1):** el aviso **nunca roba la pantalla de nadie** — antipatrón explícito.
**POR QUÉ:** lo dijiste tú: si dos enfermeras capturan a la vez y el cálculo de la de una
le roba la pantalla a la otra, eso **pierde lo tecleado** y convierte al valor en enemigo
del flujo.
**CÓMO:** cero ventana modal por cálculo de fondo · cero robo de foco a mitad de
escritura · cero reemplazo de la pantalla donde se trabaja · cero borrado de lo capturado.
**POR QUÉ ASÍ:** descartada la ventana emergente (es el antipatrón) y descartado «esperar
a que alguien abra la pantalla» (la alerta se pierde). La respuesta es **acumular y
entregar**, nunca secuestrar.
**DÓNDE SE VE:** `ALERTAS.html`, `CONTROL.html`.

**F2 · QUÉ (T2):** «instantáneo» quiere decir **disponible**, no **en cualquier momento**:
el mensaje espera su **punto de entrega**.
**POR QUÉ:** un aviso a mitad de captura es una agresión; al terminar de registrar, es
bienvenido.
**CÓMO:** el cálculo corre ya; la **presentación prominente** espera el corte natural más
cercano: fin del registro de paciente, fin de la visita, o guardado. Excepción: lo que
**detiene** (interacción que choca con alergia) sí interrumpe — es seguridad, es el único
caso.
**POR QUÉ ASÍ:** descartado «mostrar en cuanto calcula» (interrumpe) y descartado «mostrar
al final del día» (tarde). El corte del trabajo es el momento en que la persona ya dejó de
teclear y puede mirar.
**DÓNDE SE VE:** `REGISTRO.html`, `CONTROL.html`, `EMERGENCIA.html`.

**F3 · QUÉ (T3):** toda pantalla tiene **audiencia declarada**: personal **y** paciente.
**POR QUÉ:** la paciente está mirando la misma pantalla —desde enfrente en la consulta, o
el celular que la enfermera le acerca para el QR—, y un mensaje que la asusta **daña**.
**CÓMO:** **dos registros** del mismo mensaje: **superficie** (visible por defecto, calmado,
hecho para cualquiera que lo alcance a ver: **hecho + acción**) y **clínico** (interpretación
completa, a un clic del profesional). Regla dura de superficie: **cero lenguaje de
catástrofe** —ni «EMERGENCIA CLÍNICA» en mayúsculas, ni «peligro», ni diagnóstico como
titular—.
**POR QUÉ ASÍ:** descartado suavizar hasta borrar el aviso (el profesional necesita el
hallazgo claro) y descartado mostrarlo crudo (angustia a la paciente y puede cambiar cómo
cuenta sus síntomas). No es elegir entre los dos: son **dos registros del mismo mensaje**.
**DÓNDE SE VE:** `ALERTAS.html`, `CONSULTA.html`.
*[SUPUESTO: en modo consulta con la paciente enfrente, ¿el registro clínico arranca
plegado o visible? Mi propuesta: plegado en su vista, visible en la de la médica.]*

**F4 · QUÉ:** la escalera de entrega sube sin secuestrar.
**POR QUÉ:** para que «disponible en todos lados» no se convierta en «interrumpe en todos
lados».
**CÓMO:** **1 llegada** (corre y se acumula en su zona, nadie es interrumpido) → **2
entrega** (al corte, en su panel, con acción y dueño) → **3 permanencia** (no atendido no
desaparece: queda y si vence sube al tablero) → **4 prioridad sin gritar** (lo urgente va
primero por **posición**, no por escándalo; color siempre con palabra; **la urgencia la
cierra la voz humana**) → **5 paralelo entre equipos** (lo mismo en computadora y celular,
cada uno **sin interrumpir su sesión**) → **6 cierre** (todo queda en bitácora con quién lo
vio).
**POR QUÉ ASÍ:** descartado el sonido/parpadeo como mecanismo principal (asusta a la
paciente y enerva al personal) y descartado «solo la computadora» (la enfermera está junto
a la paciente con el celular).
**DÓNDE SE VE:** `ALERTAS.html`, `CIERRE.html`, `FALLA.html`.

### G · Los equipos — una verdad, muchos instrumentos

**G1 · QUÉ:** los equipos muestran **las mismas realidades y tienen las mismas funciones**.
**POR QUÉ:** tú lo corregiste —mi propuesta segregaba por rol y dejaba al celular solo
para capturar (H-042): eso esconde funciones y en centro chico, si falta la persona de
turno, deja un hueco que nadie tapa.
**CÓMO:** **un solo sistema**. El rol decide qué uso es **más frecuentes** —la médica:
documentos; las enfermeras: también documentos y captura—, **nunca qué existe**. Si una
enfermera necesita un informe, lo abre; si la médica necesita una constante, la captura.
**POR QUÉ ASÍ:** descartada la app por rol (dos verdades, funciones huerfanas) y descartado
ocultar por permisos (mata la operación real de un equipo pequeño).
**DÓNDE SE VE:** las 33 páginas —ninguna dice «esto es solo de enfermería».

**G2 · QUÉ:** **una sola verdad** en todos los equipos; el celular no tiene datos propios.
**POR QUÉ:** «misma realidad» no complica: **simplifica**. Y es la pieza que hace que el
diseño quepa en pantalla chica.
**CÓMO:** tablero, cinta, cálculos y alertas idénticos en laptop, computadora y celular;
la diferencia es el **tamaño y el dedo**, no el contenido. Como el tablero ya es **lista**,
se estrecha solo a pantalla chica sin dibujar una versión aparte.
**POR QUÉ ASÍ:** descartado «versión móvil» aparte (serían dos verdades que se
desincronizan) y descartado el tablero de columnas (habría exigido dos diseños).
**DÓNDE SE VE:** `TABLERO.html` (lista que se acomoda) y su hoja de estilo.

**G3 · QUÉ:** las alertas van **a la par** en todos los equipos.
**POR QUÉ:** la enfermera está junto a la paciente con el celular, no pegada a la
computadora; si el aviso vive solo en la computadora, pueden pasar **minutos** con el flujo
lleno.
**CÓMO:** el mismo aviso queda disponible al mismo tiempo en computadora y celular de
enfermería; **cada equipo lo muestra sin interrumpir su propia sesión** (F1 aplica a cada
uno); un celular sin señal **recupera el aviso** al volver.
**POR QUÉ ASÍ:** descartado «primero la laptop, después el teléfono» (retrasa) y descartado
«el celular interrumpe su sesión» (es F1 en otro equipo).
**DÓNDE SE VE:** `ALERTAS.html`, `TABLERO.html`.
*[SUPUESTO: la sincronía en red local y el modo sin señal es pendiente técnico de
ingeniería — declarado, no resuelto.]*

### H · La ventana — dónde cabe todo

**H1 · QUÉ:** la ventana manda: todo cabe o se organiza; nada crítico bajo el pliegue; el
rollo vive **dentro** de la ventana; mínimo 1024×660; redimensionar no borra nada; texto
nunca se encoge; nunca solo color.
**POR QUÉ:** el programa es autocontenido y la ventana puede no estar maximizada (tu
hallazgo H-020). Y lo viste otra vez con el tablero: si el diseño no respeta el tamaño, la
información **se corta y desaparece**.
**CÓMO:** barra y menú fijos; el contenido rueda en su marco; listas largas ruedan en su
columna con barra visible; texto largo se corta con «…» y el detalle al cursor; base ≥13 pt
con opción ≥16; color siempre acompañado de palabra.
**POR QUÉ ASÍ:** descartado el zoom de navegador (el programa real no lo tiene) y descartado
«encoger la fuente para que quepa» (si no cabe, se organiza).
**DÓNDE SE VE:** las 33 páginas. **Casa canónica:** `LOGICAS/PRESENTACION-EN-PANTALLA.md`
(10 reglas, 29 variables, 8 números) — aquí solo se cita.

### I · La identidad — quién es la paciente en cada pantalla

**I1 · QUÉ:** la **cinta de identidad** está arriba de toda pantalla de escritura y de
decisión, con los datos que salvan.
**POR QUÉ:** el error más caro es atender a la paciente equivocada; los datos que salvan
—alergia, tipo de sangre, medicación— son el colchón **antes** de que nadie calcule nada
(pilar 3, pilar 10).
**CÓMO:** nombre completo · fecha de nacimiento · aviso de homónima si la hay · **alergia**
· **tipo de sangre** · **medicación actual** · condiciones crónicas · el color propio de la
paciente. Visible en el 100 % de las escrituras.
**POR QUÉ ASÍ:** descartado «los datos en un panel abajo de la pantalla» (no acompañan la
escritura; ya falló así: H-036) y descartado «solo cuando hay riesgo» (el riesgo se
descubre tarde).
**DÓNDE SE VE:** `CONTROL`, `CONSULTA`, `PROTOCOLOS`, `LABORATORIO`, `EMBARAZO`, `FICHA`.

**I2 · QUÉ:** la pantalla que **crea** a la paciente no lleva cinta — excepción declarada.
**POR QUÉ:** aún no existe; su identidad mínima es nombre y fecha, y la cinta nace con la
ficha. Es el hallazgo L-02 de la sesión paralela, coincidente con lo que yo había verificado.
**CÓMO:** en `EMERGENCIA` y `REGISTRO` no hay cinta; al registrar, nace.
**POR QUÉ ASÍ:** forzar una cinta de paciente inexistente exigiría inventar datos.
**DÓNDE SE VE:** `EMERGENCIA.html`, `REGISTRO.html`.

**I3 · QUÉ:** cuatro pacientes con el mismo nombre se separan **por fecha de nacimiento**.
**POR QUÉ:** lo pediste para que la enfermera encuentre rápido a la ya registrada.
**CÓMO:** la fecha de nacimiento va en la tarjeta **del mismo tamaño** que el nombre (no
como texto chiquito), en la cinta, y en el buscador.
**POR QUÉ ASÍ:** descartado «fecha chiquita al costado» (con prisa no se lee; y recortar el
nombre puede eliminar justo la diferencia).
**DÓNDE SE VE:** `TABLERO.html`, `PARECIDAS.html`, `PARECIDAS` con su pregunta anteduplicados.
*[SUPUESTO: si coincidiera nombre **y** fecha (madre e hija), el desempate es el número de
expediente, siempre visible chiquito.]*

### J · La urgencia — el orden que salva

**J1 · QUÉ:** la urgencia **reordena el tablero al frente en el mismo segundo**, y **se
resuelve en voz**.
**POR QUÉ:** una urgencia que solo ve quien la marcó no es urgencia (pilar 5). Y tu propio
replanteamiento: **primero la voz** —se llama, se grita—, después la pantalla. El software
ordena; **no sustituye el grito**.
**CÓMO:** la tarjeta sube al frente en rojo con palabra («URGENTE») · la alerta no se cierra
hasta **resolverse** (atendida, referida con nota, o cerrada con motivo) · el equipo la ve
en todos los equipos · y en la sala se llama con una palabra dicha en alto.
**POR QUÉ ASÍ:** descartado «mostrar la urgencia resuelta con un chip» (mi error original:
como si en una sala el aviso digital se escuchara solo) y descartado «solo al frente en la
propia pantalla» (nadie más la ve).
**DÓNDE SE VE:** `TABLERO.html` (zona urgente), `ALERTAS.html` (tipo 4), `URGENCIA` en
`CONTRATOS/MODULOS/URGENCIA.md`.

**J2 · QUÉ:** quien llega **sin expediente** se registra en menos de un minuto.
**POR QUÉ:** en trabajo de parto el registro no puede detener la atención (pilar 5).
**CÓMO:** tres campos y un botón · rojo al frente del tablero · ficha completa **después**
sobre la misma ficha, con aviso de «falta completar» y su fecha límite.
**POR QUÉ ASÍ:** descartado «exigir la ficha completa antes de atender» (detiene la
urgencia) y descartado «dejarla sin plazo» (queda huérfana para siempre).
**DÓNDE SE VE:** `EMERGENCIA.html`.

### K · La degradación — la falla no daña, no calla y no pierde

**K1 · QUÉ:** los **seis guiones de falla** se muestran en lenguaje de consulta, con el
puente de papel y el «último guardado a las HH:MM».
**POR QUÉ:** la falla es cuando más se necesita al software, y es cuando peor se comportan
los programas comunes: ventana de error técnico, botón «Aceptar», y a adivinar (pilar 6).
**CÓMO:** se fue la luz · se trabó el equipo · disco lleno · red caída · imagen incompleta ·
cerrado a la fuerza. Cada uno con **tres escrituras**: qué pasó · qué conservó · qué falta.
Y el puente de papel: hoja con paciente, hora del hecho, campos mínimos, quién la llenó; al
volver la luz se transcribe **con la fecha del hecho** y queda como «escrito tardío».
**POR QUÉ ASÍ:** descartada la ventana técnica (ninguna palabra que un médico no entienda)
y descartado fingir que se conservó lo que no se conservó —**lo que estaba a media
escritura se perdió, y eso se dice**.
**DÓNDE SE VE:** `FALLA.html`.

### L · El cierre — el día tiene final

**L1 · QUÉ:** el cierre de día entrega **traspaso imprimible** y respaldo de la tarde.
**POR QUÉ:** mi flujo anterior terminaba en «16 de 18 atendidas» —como si el día no
tuviera final (error autocrítico 18). Y el respaldo de la tarde: un fallo esta noche no
debe costar el día de trabajo.
**CÓMO:** lo cerrado · lo que queda con su dueño (no llegó → reagendar; estación
interrumpida → retomar; ficha de emergencia sin completar → plazo; plazos vencidos →
llamar; notas sin firmar → firmar) · lo que la tarde debe saber · aviso de respaldo ·
botón «imprimir traspaso».
**POR QUÉ ASÍ:** descartado «un número solo» (no dice a quién le falta qué) y descartado
«cierre sin respaldo» (deja el día sin proteger).
**DÓNDE SE VE:** `CIERRE.html`.

### M · Accesibilidad y legibilidad — que se lea en una clínica real

**M1 · QUÉ:** nunca solo color · contraste verificado · fuente ≥13 pt con opción ≥16 ·
objetivos táctiles ≥36×36 px · texto cortado con «…» y detalle al cursor.
**POR QUÉ:** daltonismo (~8 de cada 100 personas), reflejo de la luz de clínica, personal
mayor o con gafas, pantallas táctiles — las variables que tu doctrina de ventana inventarió.
**CÓMO:** toda etiqueta de estado lleva **palabra** junto al color; toda cadena larga se
aplaza, no desaparece; hay opción de texto grande.
**POR QUÉ ASÍ:** descartado «codificar por color» (invisible para parte del personal) y
descartado «recortar sin detalle» (la información se pierde).
**DÓNDE SE VE:** las 33 páginas. **Casa canónica:** `PRESENTACION-EN-PANTALLA.md`.

### N · Dictámenes del dueño (2026-10-25) — volcados el mismo día

**N1 · QUÉ:** la pantalla de arranque se llama **«Hoy»** y su barra lleva **la hora
grande**; la frase «las tarjetas se mueven solas desde los hechos» sale de la barra.
**POR QUÉ:** su dictamen — el nombre debe decir lo que es, y el día se lee con hora, no con
prosa. **DÓNDE SE VE:** `hoy.html`. **Casa:** bitácora B-025.
**N2 · QUÉ:** el chip de la barra dice **«Paciente abierta: X»** (nunca «En atención» — con
tres atendidas a la vez eso mentía) y el resumen muestra **«★ sigue: [nombre]»**, la que el
equipo marcó. **POR QUÉ:** su dictamen — el software no dictamina quién está ni quién sigue
(ley: B6). **DÓNDE SE VE:** `hoy.html` (barra y chips). **Casa:** B6 + B-025/B-026.
**N3 · QUÉ:** la tarjeta lleva **exactamente lo esencial** — nombre con nacimiento, motivo
en una línea, **un solo botón** de paso y los juicios como iconos ⚠ ☆. **POR QUÉ:**
«sigue muy abarrotada» + decisión B2. **DÓNDE SE VE:** todas las tarjetas del día.
**Casa:** B-027 · decisión B2.
**N4 · QUÉ:** la llegada queda en bloques que se explican solos — **buscar y marcar llegada
(con la visita dentro del flujo)** · **paciente nueva** con apellidos por separado,
calendario, CURP opcional, y al guardar los primarios son **«Llenar más datos» y «QR»**;
sin bloque de urgencia aquí. **POR QUÉ:** sus dictámenes del módulo. **DÓNDE SE VE:**
`llegada.html`. **Casa:** B-024/B-029.
**N5 · QUÉ:** pendientes se llama **«Lo que falta hacer — hoy»**, con **la paciente en cada
aviso**, «Le toca a:» y vencimiento; lenguaje de sala, sin jerga de ingeniería. **POR QUÉ:**
«no tiene sentido para enfermeras ni médicos». **DÓNDE SE VE:** `pendientes.html`.
**Casa:** B-029 (con el valor del módulo explicado).
**N6 · QUÉ:** «Fallas» **no está en el riel** —nadie lo busca a diario—; la pantalla vive y
se enlaza desde el cierre. **POR QUÉ:** su lectura del riel. **DÓNDE SE VE:** riel de todas
las pantallas + `cierre.html`. **Casa:** B-029.
**N7 · QUÉ:** registro de urgencia **fuera de la llegada** y optimizado aparte —las
urgencias reales casi nunca son trabajo de parto y no da tiempo a formularios largos.
**POR QUÉ:** su lectura clínica. **Estado:** dirección registrada, diseño pendiente.
**Casa:** B-029 · banda de `emergencia.html`.

---

## 4 · El mapa requisito → página HTML

**La mañana cargada (grupo 1, 9):** `TABLERO` (estados, relojes, lista, buscador, urgencia,
vocabulario) · `CONSULTA` (vista de la médica, cinta, semáforo) · `CONTROL` (escritura
protegida, chips de cálculo, aviso al guardar) · `EMERGENCIA` (registro <1 min, sin cinta)
· `PROTOCOLOS` (multi-protocolo, paso vencido, cierre con motivo) · `PAUSA` (varias
abiertas, doble mano) · `LABORATORIO` (captura de papel, semáforo, escrito tardío) ·
`CIERRE` (traspaso y respaldo) · `FALLA` (seis guiones).

**El corazón del valor (1):** `ALERTAS` (los seis tipos, acción y dueño, fatiga medida, la
interacción que detiene).

**El resto del alcance (23):** `ACCESO` · `REGISTRO` (identidad + visita) · `PARECIDAS`
(homónimas) · `FICHA` (portada, datos que salvan) · `DOCUMENTOS` (plantillas .docx) ·
`HISTORIA` (nota como cierre) · `NOM004` (formato oficial como asistente) · `APOYO` (apoyo
dentro de la consulta) · `ESTADO` (estado integrado a la consulta) · `CALCULADORES` (18 con
interpretación) · `GRAFICOS` (curvas honestas) · `TIEMPO` (línea de tiempo) · `EMBARAZO`
(FUM en su sitio) · `PARTO` (cierre del episodio) · `ULTRASONIDO` (sala de estudios) ·
`INGESTA` (recepción de estudios) · `PENDIENTES` (lo que queda sin cerrar) · `AGENDA`
(día y recordatorios) · `ADMISION` (teléfono, misma verdad) · `IMPORTAR` (altas masivas) ·
`SISTEMA` (administración) · `RESPALDO` (copia y simulacro) · `INDICE` (el índice).

**Recorridos (3):** `RUTAS/ENFERMERA` (8 paradas) · `RUTAS/MEDICA` (7) · `RUTAS/DUENO` (7)
— el mismo contenido en el orden de la jornada de cada oficio.

**Cobertura:** las 33 páginas llevan **banda de pregunta + casilla de veredicto** (el índice,
correctamente, no la lleva: es referencia, no pantalla a aprobar); los 3 recorridos llevan
su veredicto de cierre.

---

## 5 · Decisiones abiertas — las que solo tú puedes cerrar

Ninguna de estas está resuelta; todas están etiquetadas y esperan.

1. **Cómo se definen las combinaciones diagnósticas** (E3) — mi propuesta: híbrido, con tus
   números ajustables y las señales fijas. **Criterio clínico: tuyo.**
2. **Si una alerta se retira sola cuando el dato cambia** — una alarma vieja es peligrosa,
   pero retirarla sola es arriesgado si era real y el número fue un error al teclear.
3. **Qué se cruza entre enfermera y médica** — qué ve cada rol de lo del otro; sin esto,
   una alerta que solo le importa a la médica no debe gritarle a la enfermera, ni al revés.
4. **Registro clínico plegado o visible con la paciente enfrente** (F3).
5. **Alcance del buscador** — solo hoy o también históricas (B4).
6. **Sincronía de equipos y modo sin señal** (G3) — pendiente técnico de ingeniería.
7. **Cómo llega el celular de la paciente al programa sin internet** (para el QR) —
   wifi local con página sin instalar; requiere confirmación técnica.
8. **Si el dato que llena la paciente por QR necesita confirmación de enfermería** antes de
   alimentar alertas críticas — criterio clínico, tuyo.
9. **Modelo de navegación por rol** — qué pantallas ve recepción, enfermería, médica y
   dueño; hoy el menú es igual para todos (coherente con G1, pero el orden podría variar).
10. **Lista priorizada vs columnas** — yo propongo lista (B1); **tu confirmación sigue
    pendiente**. Mientras, el contrato TABLERO aún declara columnas.

---

## 6 · Cómo se verifica que no hay regresión

Todo lo de este documento está registrado; por eso se puede revisitar sin perder nada.

- **Huellas:** `CHECKPOINT-LOGICA.md` §9 — un comando dice si alguno de los documentos
  señalados cambió. Si difiere, ese checkpoint ya no es la verdad de esa capa.
- **Buzón:** `HALLAZGOS.md` con `tools/hallazgos.py` — 66 hallazgos, 0 perdidos; cada
  decisión de este registro nace de un hallazgo numerado que puedes rastrear.
- **Acuerdos:** `ACUERDOS.md` — qué quedó entendido y dónde vive.
- **Autocrítica:** `FLUJOS-TRABAJO.md` capa E — los 25 errores que originaron estas
  decisiones, sin optimismo.
- **Contraste:** `LOGICAS/AUDITORIA-DE-LA-LOGICA.md` — aciertos que se protegen,
  mejorables, añadidos y retiros, con su estado.
- **Regla viva:** toda decisión nueva entra aquí **en el mismo turno** en que se cierra,
  con su hallazgo numerado y su página HTML. Lo que no entre aquí, no está decidido.
