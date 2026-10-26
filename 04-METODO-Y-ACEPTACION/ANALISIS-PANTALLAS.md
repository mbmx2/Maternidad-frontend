# ANÁLISIS DE PANTALLAS — qué prometía entregar cada una (punto de contraste)

> Documento vivo. **Para qué sirve:** aquí queda escrito, pantalla por pantalla, qué valor
> prometía entregar, cómo funciona hoy de verdad y con qué se conecta — para que las
> críticas siguientes del dueño se **contrasten** contra esto: si lo que la pantalla
> prometía y lo que la crítica pide coinciden, el valor se conserva y se reestructura la
> forma; si la crítica demuestra que la promesa no vale, se retira sin apego. Se actualiza
> con fecha en cada cambio. Fuentes: las descripciones que viven en el programa y las
> guías de ayuda del propio software. Fecha de esta versión: 2026-10-23.

---

## A · Entrada y cuentas

### C-14 · Acceso
**Valor prometido:** que solo personas con cuenta entren al expediente, y que el equipo
recién estrenado pueda crear su primera cuenta sin ayuda. **Cómo funciona hoy:** dos
casillas —usuario y PIN— y el botón Entrar; si el equipo no tiene ninguna cuenta, la
misma pantalla ofrece «Crear al dueño» (nombre y PIN dos veces). Quien falla varias veces
espera unos minutos antes de volver a intentar. **Conexiones:** desde aquí se entra al
Inicio; es la única pantalla visible sin sesión. **Ya criticado (H-008):** faltan «registrar
usuario nuevo» y «recuperar usuario o contraseña» — la recuperación existe planeada en la
ley (código impreso de un solo uso + dueño que repone) pero no está construida.

### C-13 · Sistema (administración)
**Valor prometido:** un solo lugar para administrar: cuentas de las personas con su rol
(datos del consultorio, catálogos por firmar, reportes y bitácora). **Cómo funciona hoy:**
da de alta usuarios con PIN cifrado y rol (rol = permisos), guarda los datos del
consultorio (nombre, dirección, responsable, casilla de respaldo, cadencia), registra
equipos, firma catálogos (las listas clínicas solo deciden firmadas), exporta reporte sin
nombres ni CURP y permite ver la bitácora. **Conexiones:** solo visible con sesión
abierta y rol administrador. **Estado:** sin crítica abierta; es además el lugar donde,
hoy, se da de alta a las personas —lo que su crítica H-008 pide mover hacia la puerta de
acceso—.

---

## B · El camino de la paciente (encontrar, registrar, abrir)

### C-01 · Inicio
**Valor prometido:** que abrir el programa sea estar a una acción de la paciente:
buscador por apellido o CURP con filtros (con adjunto, con alerta), y las salidas de
Registrar y Respaldos. **Cómo funciona hoy:** una casilla de búsqueda que filtra al
instante sin borrar lo escrito; doble clic sobre un resultado abre su expediente; el
lateral muestra las pantallas. **Conexiones:** llega de Acceso; lleva a C-03 (registrar),
C-08 (respaldos) y a la ficha C-04. **Ya criticado (H-010):** la pantalla no explica su
propuesta; hay que explicarla desde cero — si el concepto de buscador-primeiro es bueno,
no está comunicado en la interfaz. Falta además la conexión con la agenda del día.

### C-03 · Registro
**Valor prometido:** alta de paciente en dos pasos con protección real contra duplicados.
**Cómo funciona hoy:** paso 1 —apellidos, nombres y fecha de nacimiento (con calendario)—;
paso 2 —CURP, teléfono, correo, médico y notas—; al registrar, si hay parecidas, se abre
C-02 antes de escribir nada. **Conexiones:** desde Inicio (botón Registrar) o el lateral;
sale hacia la ficha C-04 o hacia C-02. **Ya criticada y aprobada en lo esencial (H-009):**
conservar el valor; cambiar el nombre del módulo a «Nueva paciente», dejar explícito lo
obligatorio frente a lo opcional, y volver «médico» una lista seleccionable de los
derivadores (15-20 nombres que envían para ultrasonido).

### C-02 · Parecidas
**Valor prometido:** que jamás nazcan dos fichas de la misma mujer. **Cómo funciona hoy:**
no pide datos; pregunta «¿es esta otra paciente o la misma?» con las parecidas encontradas
y dos salidas claras: elegir la que sí es, o volver. **Conexiones:** solo se abre desde
C-03; elegir lleva a la ficha de la elegida. **Estado:** sin crítica abierta; forma parte
del valor que su crítica de C-03 confirmó como bueno.

### C-04 · Ficha
**Valor prometido:** la portada del expediente —quién es esta paciente y de dónde se
entra a su atención— siempre visible durante la consulta. **Cómo funciona hoy:** identidad
y contacto (apellidos, nombres, CURP, teléfono, correo, médico, talla para IMC, notas) con
editar/guardar; de aquí se abren las pestañas del resto del expediente. **Conexiones:**
llega de Inicio, Parecidas o Registro; sus pestañas abren controles, historia, estudios,
gráficos, estado, línea de tiempo. **Ya criticada (H-011):** exige que quede escrita la
explicación de su valor —este documento es esa respuesta—; su rediseño propuesto la
ordena en tres bloques: quién es · qué tiene activo ahora (protocolos) · a dónde se entra.

### C-12 · Importar
**Valor prometido:** dar de alta muchas pacientes de una vez sin riesgo. **Cómo funciona
hoy:** pega las filas de un archivo CSV; primero previsualiza (cuántas se crearían, cuáles
existen, cuáles traen error) y solo después importa. **Conexiones:** desde el lateral;
al terminar, las pacientes quedan listas en Inicio. **Estado:** sin crítica abierta.

---

## C · La atención: visitas, historia, pendientes

### C-16 · Controles (nombre real: Control prenatal)
**Valor prometido:** capturar los signos de una visita en el flujo de la consulta y
disparar las alertas correspondientes. **Cómo funciona hoy:** fecha (obligatoria), peso,
tensión, altura uterina, frecuencia cardiaca fetal, presentación, proteinuria y edema
(listas firmadas), síntoma, y nueve banderas de alarma (cefalea intensa, epigastralgia,
visión borrosa, hinchazón súbita, sangrado genital, disnea, fiebre, contracciones,
movimiento fetal disminuido); guarda sin regañar —si algo está fuera de rango lo confirma
y recién guarda— y las alertas aparecen después de guardar. **Conexiones:** se llega con
paciente elegida; guarda en su expediente y alimenta gráficos, estado y línea de tiempo.
**Ya criticada (H-012):** nombre real «Control prenatal» en el menú; **falta el hilo
conductor** — buscar paciente registrada o recién registrada y guardar su visita sin
perder el camino; nadie escribió hasta ahora la lógica del recorrido.

### C-18 · Historia
**Valor prometido:** la historia clínica completa con notas firmadas según el formato
oficial NOM-004. **Cómo funciona hoy:** elige el tipo de nota de la lista aprobada,
escribe en borrador, edita (añade versión —una nota firmada no se cambia—) y firma, lo
que cierra la nota con la sesión y la cédula del autor impresas. **Conexiones:** desde la
ficha; se complementa con C-19 (apartados oficiales) y C-23 (lo que quedó sin cerrar).
**Estado:** sin crítica abierta.

### C-19 · Nota NOM-004
**Valor prometido:** cumplir la norma del expediente sin trabajar dos veces: llenar
apartado por apartado (A1, A2…) con lo que ya existe traído y una lista de lo que falta.
**Cómo funciona hoy:** eliges apartado, prellenas, preguntas faltantes, guardas.
**Conexiones:** compañero de C-18; ambas escriben a la misma historia. **Estado:** sin
crítica abierta.

### C-23 · Notas, interconsultas y pendientes
**Valor prometido:** un solo lugar para todo lo que quedó sin cerrar. **Cómo funciona
hoy:** lista notas a la espera, interconsultas con su estado y tamizajes vencidos, cada
uno con su acción lista (atender, crear interconsulta con especialidad y motivo).
**Conexiones:** alimenta y vacía lo que otras pantallas dejan pendiente. **Estado:** sin
crítica abierta; candidata natural a vivir dentro del seguimiento por protocolos.

---

## D · El embarazo (hoy, un protocolo con pantalla propia)

### C-09 · Embarazo (Episodio de embarazo)
**Valor prometido:** un número fiable del que depende todo el control: con la fecha de
última regla se calculan semanas y fecha probable de parto. **Cómo funciona hoy:** una
casilla —la fecha de última menstruación, con calendario que no ofrece días futuros— y el
botón Abrir episodio, que crea el registro del embarazo. **Conexiones:** desde la ficha o
el lateral; alimenta controles, gráficos, estudios y alertas. **Ya criticada (H-013 y
H-014):** cuestionada como pantalla exclusiva — FUM sin paciente puede ir a Calculadoras;
con paciente, va al seguimiento; y bajo el modelo de protocolos múltiples, el embarazo es
un protocolo entre varios, no la naturaleza del software.

### C-10 · Embarazo (vista) — vista y parte del parto
**Valor prometido:** ver el embarazo en curso y cerrarlo con su parte de nacimiento.
**Cómo funciona hoy:** muestra las semanas recalculadas con la fecha de hoy; el parte pide
fecha del parto, vía (vaginal o cesárea, obligatorias), números de expediente de los
bebés y peso en gramos; registrar parte cierra el episodio. **Conexiones:** no está en el
menú lateral: se abre desde la ficha del embarazo. **Estado:** sin crítica abierta; con
H-014 queda señalada como pieza del **protocolo de embarazo** — candidata a la pantalla
única de seguimiento junto con C-09 y C-16.

---

## E · Apoyo al criterio clínico (cálculos, resúmenes, historial)

### C-06 · Calculadoras
**Valor prometido:** 18 cálculos clínicos (IMC, HOMA-IR, dosis y más) con su rango de
referencia, como apoyo —nunca como diagnóstico—. **Cómo funciona hoy:** eliges la
calculadora, puedes prellenar con los últimos valores guardados, calculas y ves el
resultado con su rango. **Conexiones:** lee de controles, laboratorio y ultrasonido;
bajo H-013 es la casa natural de la FUM suelta. **Estado:** sin crítica abierta.

### C-07 · Apoyo clínico
**Valor prometido:** respuesta rápida frente a un síntoma y control de tamizajes.
**Cómo funciona hoy:** busca en la tabla de diagnósticos CIE-10, y registra que un
tamizaje del catálogo se hizo hoy. **Conexiones:** catálogos firmados en Sistema; su
resultado alimenta pendientes (C-23). **Estado:** sin crítica abierta.

### C-21 · Estado de salud
**Valor prometido:** el resumen de la paciente de un vistazo —tarjeta con alergias,
alertas y últimos signos, más el semáforo de laboratorio (verde normal, ámbar alerta,
rojo crítico, gris sin dato)—. **Cómo funciona hoy:** no captura nada; recalcula todo
desde el expediente con un botón. **Conexiones:** resumen de controles, laboratorio y
notas. **Estado:** sin crítica abierta; bajo el modelo nuevo sería el resumen de todos
sus protocolos activos.

### C-22 · Línea de tiempo
**Valor prometido:** la vida clínica en orden real —controles, embarazos y notas en su
fecha— sin inventar lo que no tiene fecha. **Cómo funciona hoy:** solo presenta hechos
guardados; recarga con un botón. **Conexiones:** de la ficha; misma fuente que C-21.
**Estado:** sin crítica abierta.

### C-17 · Gráficos
**Valor prometido:** ver la evolución (peso, tensión y demás) a lo largo del tiempo sin
embellecer los datos: donde no hay punto, la línea se corta. **Cómo funciona hoy:** eliges
el campo y refrescas; dibuja solo datos reales. **Conexiones:** lee los controles de
C-16; se abre desde el embarazo. **Estado:** sin crítica abierta.

---

## F · Estudios de imagen

### C-15 · Ultrasonido
**Valor prometido:** la sala de estudios: abrir lo que llegó del ecógrafo con sus
mediciones e imágenes, incluido lo que el sistema no supo clasificar —nada se tira—.
**Cómo funciona hoy:** eliges el estudio de la lista y lo abres. **Conexiones:** lo que
entra por C-20 se ve aquí; pertenece al interés de la paciente y de su seguimiento.
**Estado:** sin crítica abierta.

### C-20 · Ingesta
**Valor prometido:** la recepción de estudios por memoria USB o red del consultorio, con
previsualización antes de escribir y verificación de que llegaron completos. **Cómo
funciona hoy:** eliges origen, encolas, verificas, previsualizas. **Conexiones:** su
destino es C-15. **Estado:** sin crítica abierta.

---

## G · Documentos, seguridad y continuidad

### C-05 · Documentos
**Valor prometido:** generar consentimientos y hojas desde sus plantillas, y poder
detectar si un consentimiento guardado fue alterado. **Cómo funciona hoy:** eliges
plantilla, nombras el documento, escribes el texto, guardas (queda sellado) y verificas
el sello cuando quieras. **Conexiones:** plantillas guardadas en el sistema; los
generados se asocian a la paciente. **Estado:** sin crítica abierta.

### C-08 · Respaldo
**Valor prometido:** copias de seguridad que se prueban: guardar, verificar íntegro,
ensayar la recuperación sin tocar datos reales y restaurar (solo administrador).
**Cómo funciona hoy:** carpeta destino, respaldar, verificar, probar, restaurar.
**Conexiones:** desde Inicio (botón Respaldos) o el lateral. **Estado:** sin crítica
abierta; el envío por correo de este respaldo tiene además un hallazgo de seguridad
abierto en la auditoría (excluir la llave y los expedientes del paquete).

### C-25 · Agenda
**Valor prometido:** lo que viene y a quién conviene avisar, con el recordatorio ya
redactado. **Cómo funciona hoy:** citas en su fecha; preparar recordatorios personalizados
(nombre y semana); canal de entrega elegido por usted (WhatsApp, llamada o hoja impresa)
con copiar-y-entregar en mano. **Conexiones:** de ella salen las citas; bajo el análisis
de C-01 su contenido debería alimentar el Inicio del día. **Estado:** sin crítica abierta
directa, pero su desconexión con Inicio formó parte de H-010.

### C-24 · Admisión (teléfono)
**Valor prometido:** la admisión del consultorio desde el teléfono de la sala —alta,
constantese y laboratorio— con sesión de enfermera, sin listar cuentas de nadie.
**Cómo funciona hoy:** entra con usuario y PIN; después, los mismos campos de alta,
vitales y laboratorio. **Conexiones:** es la cara del terminal de la Fase 8 (pendiente);
escribe a la misma base de datos. **Estado:** sin crítica abierta; pertenece a la fase
que espera hardware y su aprobación.

### (C-11 — no existe)
La numeración salta de C-10 a C-12: la pantalla C-11 fue retirada del catálogo en su
momento y no hay pantalla con ese número. Queda declarado para que ninguna revisión la
eche de menos.

---

## Cierre de este análisis — lo que el contraste ya reveló

De sus críticas de 2026-10-23 contra estas promesas: **valor confirmado** en el registro
de pacientes y su anti-duplicados (C-03/C-02) y en la base de datos única · **valor
prometido pero no entregado** en el acceso (C-14: registro y recuperación), en la
explicación de la propia Inicio (C-01) y en el hilo conductor general (C-16) · **valor
por redefinir bajo el modelo de protocolos múltiples** en todo el bloque del embarazo
(C-09/C-10/C-16) y en la portada (C-04). Ninguna promesa se ha retirado todavía; la
decisión de retiro —si la hay— corresponde al contraste de sus próximas críticas con
este documento, en el ciclo de edición en papel.

---

## Contrastes solicitados por el dueño (2026-10-23, noche) — valor, presentación, experiencia, flujo

Las cinco pantallas que el dueño marcó sin valor real reciben aquí su explicación completa
(y la versión propuesta vive en `EDICION/PROPUESTAS/`):

### C-07 · Apoyo clínico
**Valor que prometía:** respuesta rápida frente a un síntoma —ubicar el diagnóstico en la
tabla CIE-10— y ver los tamizajes de la paciente con su vencimiento. **Propuesta de
presentación original:** pantalla independiente con dos casillas (buscar / aplicar
tamizaje). **Propuesta de experiencia original:** dos botones y una lista. **Por qué hoy
no aporta:** es una habitación fuera del camino —nadie «entra a apoyo clínico» mientras
atiende— y su catálogo depende de listas aún sin firmar. **Reconexión propuesta (H-015):**
deja de ser pantalla; se vuelve **panel dentro del modo consulta** (la ayuda llega a
donde el médico ya está mirando) con entrada natural: al marcar una bandera en el control,
sugerir el diagnóstico relacionado.

### C-18 · Historia clínica
**Valor que prometía:** dejar por escrito —con fecha, autor y firma— lo que pasó en la
atención, en bloques del formato oficial. **Propuesta de presentación original:**
selector de tipo de nota + editor + tres acciones (nueva, editar, firmar). **Propuesta de
experiencia original:** escribir borradores, firmar cuando está lista, versión nueva si
hay corrección. **Por qué hoy no sirve (H-016):** el selector **no tiene nada
seleccionable** —la lista de tipos de nota vive en un catálogo que nadie sembró—, y sin
tipos, no hay por dónde empezar; además no está ligado a cerrar la consulta. **Reconexión
propuesta:** primero **sembrar con ustedes los tipos de nota reales de su práctica**;
desde el modo consulta, «cerrar con nota» trae los datos de la visita; el selector muestra
su lista real; el formato oficial pasa a asistir dentro (ver C-19).

### C-19 · Diálogo NOM-004
**Valor que prometía:** cumplir la norma del expediente **sin trabajar dos veces** —elige
apartado, el programa trae lo que hay y lista lo que falta antes de firmar—.
**Propuesta de presentación original:** pantalla con casilla de apartado (A1…) y tres
botones. **Propuesta de experiencia original:** prellenar, preguntar faltantes, guardar.
**Por qué hoy no aporta (H-017):** separada de la nota, es una parada que nadie pide; sus
claves de apartado parecen códigos a descifrar. **Reconexión propuesta:** **modo asistido
dentro de Historia**, al firmar —apartados con nombre humano además de su clave—, y si su
práctica escribe sin formato, el asistente no aparece.

### C-05 · Documentos y consentimientos (contraste con la idea del dueño)
**Valor que prometía (la implementación actual):** generar documentos desde plantillas
internas del programa y **sellarlos** para detectar si alguien altera el consentimiento.
**La idea del dueño (H-018):** usar **sus** plantillas .docx —las que el médico ya usa— y
que el programa **rellene solo** los campos: nombre de la paciente, médico que la envió,
fecha del día, etcétera. **El contraste:** el mecanismo de sellado es valioso y se
conserva; la fuente de las plantillas está al revés —el programa impone las suyas en vez
de servir las del consultorio—. **Reconexión propuesta:** biblioteca con **sus .docx**,
previsualización con campos rellenados, «Generar .docx» en un clic, y la zona de
consentimientos con su verificación de integridad aparte.

### C-21 · Estado de salud
**Valor que prometía:** el resumen de la paciente de un vistazo —alergias, alertas,
últimos signos, semáforo de laboratorio—. **Propuesta de presentación original:**
pantalla propia con un botón «actualizar». **Propuesta de experiencia original:**
entrar, mirar, salir. **Por qué hoy no aporta (H-019):** no está en el camino de ninguna
consulta —nadie la llama—; sin vínculo con el flujo, no declara valor, y eso revela que
el flujo no estaba claro al dibujarla. **Reconexión propuesta:** **deja de ser parada**:
su tarjeta vive como cabecera del modo consulta (ya dibujada en la propuesta CONSULTA) y
en la tarjeta del tablero; la pantalla completa queda solo como vista ampliada para
quien la quiera imprimir o mirar entera.
