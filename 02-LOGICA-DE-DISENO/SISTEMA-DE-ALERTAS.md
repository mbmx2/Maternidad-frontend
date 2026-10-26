# SISTEMA DE ALERTAS — la mayor propuesta de valor, de punta a punta

> Registro vivo (2026-10-23, declaración del dueño — H-021). **Tesis:** la mayor propuesta
> de valor del software, para médicos y enfermeras, son **los avisos y alarmas sobre los
> estados de salud que salen del análisis de los signos**; las calculadoras son su activo
> más valioso porque entregan instantáneamente alertas claras, precisas y directas. Este
> documento aplica esa tesis **en todas las capas** —de la política a los datos— y declara
> cómo se muestra en cada pantalla. Como trabajamos en papel, la presentación puede
> reestructurarse desde cero sin costo.

## 1 · La capa más alta — qué promete este sistema (política y principio)

El software **informa, nunca diagnostica** (ese es su principio ya escrito, y aquí es
donde cobra sangre): cada aviso dice **qué pasó, qué significa en palabras de consulta y
qué hacer ahora**, y deja la decisión a la persona. La regla de oro de sus propios
principios se aplica completa: **todo aviso nombra su acción** —un aviso sin acción no
sale—, y la seguridad es la única razón para detener (por ejemplo, no guardar una
prescripción que choca con una alergia, sin confirmación expresa). Y porque su
investigación dice que las alertas son lo peor evaluado por los profesionales, el sistema
se diseña contra la **fatiga de alerta**: poquitas, con plazo, con seguimiento y medibles.

## 2 · Los seis tipos de aviso — la tipología completa (capa de requerimiento)

**1 · Aviso verde — está bien.** El raro y valioso: «peso en rango, tensión normal».
Se muestra al guardar el control, en verde, para que lo normal también se diga —validar
lo bueno es parte del cuidado—.

**2 · Aviso de chequeo con plazo.** «Repetir urocultivo en 7 días» · «repetir glucosa en
2 semanas» · «tamizaje vencido». Característica decisiva: **crea solo un pendiente con
fecha** en la agenda —sin eso, el plazo se olvida, y un aviso que no se sigue no es un
aviso—.

**3 · Aviso de problema de salud.** El rojo de bandera: «cefalea intensa + visión
borrosa — evaluar preeclampsia hoy». Sale **después de guardar** (nunca antes de que la
persona decida, que ya es su diseño), con la acción escrita.

**4 · Aviso de urgencia.** Además del rojo, **mueve al equipo**: la tarjeta sube al frente
del tablero y la alerta no se cierra hasta que se atiende. Una urgencia que solo vive en
la pantalla de quien la marcó no es urgencia.

**5 · Aviso permanente de contexto.** No «se dispara»: **está siempre presente** —
alergias, tipo de sangre, medicación actual, condiciones crónicas—, en la cinta de
identidad y en la tarjeta de consulta. Es el colchón que evita el error antes de que
alguien calcule nada.

**6 · Aviso de interacción (al prescribir).** Al guardar una medicación: «choca con lo
que ya toma» o «alergia conocida: contraindicado». Es de los pocos que **sí puede
detener** el guardado —su principio lo permite cuando es seguridad—, siempre con salida
clara (cambiar medicamento, o forzar con confirmación que nombra el riesgo).

## 3 · El circuito vertical — cómo se produce un aviso, capa por capa

**Capa de datos (lo más bajo):** entran signos vitales, laboratorio, prescripciones, y
los **datos fundamentales del paciente**: alergias (ya existen), **tipo de sangre
(falta: se agrega a la ficha)**, medicación actual (ya existe), condiciones crónicas,
antecedentes.

**Capa de cálculo:** las calculadoras (las 18 existentes y las que se añadan) toman esos
datos —con prellenado— y devuelven **número + rango + interpretación**: no «145 mg/dl»
sino «145 — por arriba de su rango». Cuando sus entradas existen, el cálculo **corre
solo**, sin que nadie vaya a la pantalla de calculadoras: ese es el principio de
integración —**el cálculo no es un lugar al que se va: es algo que ocurre cuando los
datos entran**—.

**Capa de reglas (aquí está el corazón):** el aviso nace de **catálogos firmados por el
médico**, no de código —rangos por analito y semana, umbrales de tensión, calendario de
tamizajes, tabla de interacciones medicamentosas, lista de alergias cruzadas—. Es el
mismo principio que su ley ya defiende (ningún dato clínico vive dentro de Python; todo
es borrador → firma → vigente). Consecuencia práctica: **cada consultorio puede ajustar
sus umbrales sin programador**, y el sistema nunca se vuelve una caja negra clínica.

**Capa de evento:** la regla evaluada produce un aviso con **tipo (1–6), texto humano,
acción sugerida, plazo si aplica, y a quién le toca**. Ese evento se registra en la
bitácora (qué se disparó, quién lo vio, si se atendió) —sin registro no hay auditoría
ni medición de fatiga—.

**Capa de presentación (lo más alto):** el aviso aparece en el lugar donde está la
persona que actúa (véase §5), **una sola vez por contexto** —la misma alerta sin cambios
no se repite en cada visita (deduplicación por plazo)—, y todo lo que tenga plazo deja su
pendiente fechado.

## 4 · Los datos fundamentales que el sistema exige (capa de datos, lo que falta declarar)

**Ya existen:** alergias en banda visible (y en la tarjeta), medicación actual, signos
con sus nueve banderas, laboratorio con semáforo, tamizajes con vencimiento. **Faltan y
este sistema los declara:** **tipo de sangre** (con su importancia en embarazo —RH
negativo y profilaxis—), **condiciones crónicas** (hipertensión, diabetes…), **antecedentes
de relevancia** y **la tabla de interacciones** (catálogo firmable). Todos entran a la
ficha y, una vez escritos, **viven en la cinta de identidad**: son el contexto que
acompaña cada pantalla de escritura.

## 5 · Cómo se muestra en la realidad de cada pantalla (capa de interfaz)

**Control prenatal (y toda captura de signos):** al llenar, los cálculos automáticos
aparecen como **chips de resultado con interpretación** (peso → índice de masa, tensión →
rango); al guardar: **panel de avisos de la visita** —verde, plazo, problema, urgencia— y
los plazos se vuelven pendientes con fecha.

**Modo consulta (la vista de la médica):** la cinta lleva los **permanentes** (alergia,
tipo de sangre, medicación); la tarjeta de estado muestra semáforo y última alerta; y si
hay alerta activa, ocupa la primera línea de la vista, con su acción.

**Tablero del día:** chip rojo en la tarjeta de quien tiene urgencia —«al frente,
visible para todo el equipo»—; chip ámbar de «chequeo vencido» en quien trae plazo
pasado.

**Calculadoras:** el resultado ya no es un número suelto: **número + rango + interpretación
+ botón «guardar en su expediente»**, y si queda fuera, el mismo aviso de tipo 3 con su
acción.

**Ficha:** bloque nuevo **«Datos que salvan»** —alergias, tipo de sangre, medicación,
condiciones— siempre arriba, editable con su forma.

**Prescripción (donde se escribe la medicación):** al guardar, verificación contra
interacciones y alergias **antes** de que el guardado se complete: verde si no choca,
o confirmación obligatoria si choca, nombrando el riesgo.

**Agenda y pendientes:** todos los plazos del sistema viven aquí con su fecha —«quién
debe repetir qué, y cuándo»—; el aviso de plazo vencido entra al tablero.

**Historia/nota:** el contexto (alergias, tipo de sangre, medicación) queda como encabezado
de la nota, para que firmar sin mirarlo sea imposible.

## 6 · Reglas de experiencia (la capa que lo hace soportable)

Ningún aviso sin acción · después de guardar, **primero lo verde, después lo rojo** (que
el resultado normal se lea primero) · el lenguaje nombra la acción y el plazo, jamás solo
el número · los permanentes no hacen ruido —están, no avisan— · cada aviso de plazo crea
su pendiente automáticamente (0 plazos huérfanos) · la misma alerta sin cambio no se
repite hasta su siguiente plazo · y la fatiga se **mide**: cuántas alertas por visita, de
cuál tipo, cuántas atendidas.

**Regla añadida (autocrítica — O3, O4):** **todo aviso y todo plazo nace con su
dueño**: al emitirse, lleva un rol responsable (tamizaje ⇒ quien toma constantes ·
chequeo de laboratorio ⇒ quien captura · banda roja ⇒ la médica) y, si vence sin
atenderse, sube al tablero —un aviso sin dueño es el nuevo papel tirado—. Y **la
urgencia termina en voz**: el software ordena, clasifica y registra; a la persona que
está en la sala la llama una palabra dicha en alto, no un chip. El aviso digital
comunica; **la urgencia la cierra el equipo humano**.

## 7 · Mantenimiento y errores (la capa que lo mantiene honesto)

Umbrales mal firmados = error del catálogo, se corrige con re-firma, nunca tocando
código · falso positivo repetido = hallazgo que baja a la raíz (¿la regla o el umbral?) ·
todo aviso que no aparece cuando debía = error de código con su prueba · y la auditoría:
bitácora de avisos con estado, revisable en administración.

## 8 · Los números de aceptación (contrato, no deseo)

1. **0 avisos sin acción** —todo aviso nombra qué hacer y cuándo (revisión humana + prueba).
2. **Alergia + tipo de sangre + medicación visibles en el 100 % de las pantallas de
   escritura** (extiende el pilar de la cinta).
3. **0 prescripciones guardadas sin verificación** de interacción y alergia (prueba con
   caso de alergia conocida).
4. **0 umbrales clínicos en el código** —el ratchet existente de «cero literales
   clínicos» cubre todo este sistema—.
5. **Todo plazo crea su pendiente fechado** (0 plazos huérfanos).
6. Resultado de cálculo con interpretación en ≤1 clic desde cualquier pantalla con
   paciente.
7. Misma alerta sin cambios no se repite en la siguiente visita (deduplicación probada).
8. Bitácora de avisos: contador semanal de disparos por tipo (la fatiga, medida).


## Contrato de datos fundamentales del paciente (añadido N2 — 2026-10-23)

Campo por campo, con su obligación y su dueño —la lista completa de lo que el sistema de
avisos necesita y nadie había escrito:

- **Alergias** — obligatorio vacío explícito («sin alergias conocidas» si no hay; el
  hueco nunca se interpreta como «no aplica»). Dueño: quien registra y quien atiende;
  visible en cinta y en toda prescripción.
- **Tipo de sangre** — obligatorio cuando se conoce (el RH− importa en embarazo).
  Dueño: captura de enfermería con la ficha; si se desconoce, queda «sin dato» y el
  sistema lo pide en el próximo control, sin regaño.
- **Medicación actual** — se actualiza en cada atención que la modifica. Dueño: quien
  prescribe; verificación de interacción obligatoria al guardar.
- **Condiciones crónicas** — obligatorio si el personal las conoce; dueño: primera
  atención con la paciente; se revisa en cada control.
- **Antecedentes de relevancia** — opcional pero visible; dueño: quien los escuche
  (historia).
- **Tabla de interacciones y alergias cruzadas** — catálogo firmado por el médico; dueño:
  el dueño del centro lo entrega, el médico lo firma; sin firma, el sistema avisa que
  la verificación está incompleta (no la finge).

Ningún campo se guarda sin pantalla que lo edite; ninguno se pide dos veces; todo lo
obligatorio tiene su «no lo sé» permitido con seguimiento.
