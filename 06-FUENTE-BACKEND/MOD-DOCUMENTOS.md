# MOD-DOCUMENTOS — especificación construible: los papeles del consultorio

> **Estado:** SEGUNDA VERSIÓN · 2026-10-24 · en exploración (cambia el mismo día que el
> dueño dicta). **Qué integra:** las dos caras del mismo módulo — la nuestra (ley
> R-05…R-09 + dibujos + su hallazgo H-018) y la del análisis de ingeniería que usted
> entregó (motor de relleno de plantillas y anonimización).
>
> **Fuentes (casas):** ley `05-LEY/ACTA_FRONTEND.md` — R-05, R-06, R-07, R-08, R-09, R-23
> (más R-04 de derivados, P3 soberanía del formato, P5 una-sola-casa, P4 un-clic,
> DEC-01 filesystem = verdad, DEC-09 falla visible) · `02-LOGICA-DE-DISENO/
> REQUISITOS-DEL-DISENO.md` · `04-METODO-Y-ACEPTACION/ANALISIS-PANTALLAS.md` C-05 + buzón
> H-018 · el análisis de ingeniería de los dos subsistemas (entregado 2026-10-24) ·
> dibujos: réplica `01-DIBUJOS/EDICION/C-05.html`, propuesta
> `01-DIBUJOS/EDICION/PROPUESTAS/DOCUMENTOS.html`, hogar candidato del compartir
> `.../PROPUESTAS/IMPORTAR.html`.
>
> **Regla de este archivo:** si algo choca con su casa, manda la casa. Los invariantes
> globales (cinta, ventana, alertas) no se repiten aquí: viven en sus contratos y se citan.
>
> **Verificación pendiente que abre el módulo** [SUPUESTO 0]: el análisis dice *«el
> formato es del médico»* (igual que su H-018 y la R-07) y nuestro análisis C-05 dice
> *«la pantalla usa plantillas propias del programa»* — hay que confirmar en la maestra si
> el motor ya acepta los .docx de la carpeta y solo la interfaz no los ofrecía (brecha de
> pantalla) o si aún es brecha de código. H-018 está **nuevo** en el buzón: nada de esto
> está cerrado.

---

## 1 · QUÉ ES ESTE MÓDULO

**Definición:** el módulo de documentos es **el taller de papeles del consultorio**: todo
lo que el software saca escrito del expediente —o lo que recibe y custodia dentro de él—
para que una persona lo firme, lo entregue, lo archive o lo mande. Su oficio es convertir
**datos clínicos + formatos del médico** en papeles con valor clínico o legal, sellados,
rastreados y, cuando se comparte, **sin identidad**.

**Su frontera — qué NO es este módulo:** no redacta contenido clínico (lo escribe la
persona o sale de la historia: el software solo rellena y sella) · no interpreta imágenes
(copia, sella y verifica — sin PACS, sin IA: tope declarado) · no imprime él (abre el
archivo con Word/Excel y quien imprime es la persona) · no es la historia clínica (el
camino es historia → papel, nunca al revés: este módulo jamás escribe en `HISTORIA.json`)
· no transmite por red (el archivo lo lleva la persona en USB o correo — la red es fase
de otra decisión) · no sustituye al tablero ni a la agenda: solo produce y custodia
papeles.

**Por qué todo vive bajo un mismo techo:** las dos caras —nuestra y la del análisis— son
la misma fábrica: usan las mismas plantillas, el mismo traductor de datos, el mismo
sellado y la misma bitácora; la anonimización es simplemente **otra salida de esa fábrica**
(un papel más, con una puerta de verificación más). Separarlas en dos módulos obligaría a
duplicar la máquina.

**Su valor para el centro:** el documento del día en 30 segundos con las plantillas que el
médico ya usa (H-018) · consentimientos y aviso de privacidad en un clic, con evidencia
de que no se alteraron (R-08) · custodia de lo adjunto con huella (R-09) · y un canal
**legal y seguro** para compartir casos con colegas o para una tesis, que es lo que
reconcilia su primera ley (nada sale del equipo) con la necesidad real de compartir.

## 2 · ESQUELETO (de dónde salen estas funciones y cómo se ordenan)

**De qué acto se descompone.** El centro hace con papeles **dos actos**, y de ahí salen
todos los caminos:

- **Acto 1 · GENERAR:** elegir datos → elegir formato → rellenar → verificar → guardar y
  abrir. Cinco etapas, cinco grupos de funciones (Partes A, B, C, D, E).
- **Acto 2 · COMPARTIR:** identificar sin identidad → decidir qué se permite → limpiar lo
  libre → verificar → entregar rotulado. Cinco etapas (Parte F: DOC-17 a DOC-22).

**Criterio de corte (por qué *estas* funciones):** cada función es **una responsabilidad
que puede cambiar sin abrir las demás** — si mañana cambian las reglas de enmascarado
(DOC-19) o la lista de campos del export (DOC-18), el relleno de Word (DOC-04) y el
sellado (DOC-12) no se tocan. Si una función hiciera dos cosas, se partiría; si dos
hicieran lo mismo, se unificarían (así nació el traductor DOC-02: eran varios cálculos
repetidos).

**El orden, en texto:**

- **Generar:** paciente + episodio → **DOC-02** (construye el mapa de marcadores) ←
  **DOC-09** (trae la plantilla) → **DOC-06** (nombre con hora y colisión) → **DOC-03**
  (si es .txt) o **DOC-04** (si es .docx/.xlsx) → **DOC-05** (verifica que nada quedó sin
  rellenar) → **DOC-08** (escritura atómica + bitácora) → abre con el programa nativo.
  La variante sin paciente (**DOC-07**) recorre lo mismo con mapa mínimo y destino
  aparte.
- **Compartir:** **DOC-22** (rotula y elige) → **DOC-17** (chapita anónima) → **DOC-18**
  (arma solo lo permitido) → **DOC-19** (enmascara párrafos libres) → **DOC-20** (la
  puerta verifica; si falla, no se escribe nada) → **DOC-21** (el mismo motor emite cada
  formato) → archivo listo o error humano.
- **Actos sueltos con la misma máquina:** **DOC-12** consentimiento · **DOC-13** aviso de
  privacidad · **DOC-14** veto de fotos (hacia DOC-15 y hacia INGESTA) · **DOC-15**
  adjuntos · **DOC-16** progreso químico.

**Servicios compartidos** (los tres que más de un camino usa): **DOC-02** el traductor ·
**DOC-05** el verificador de marcadores · **DOC-08** el guardado con bitácora.

**Puntos de entrada (botones reales):** generar con paciente · generar sin paciente ·
plantillas · consentimientos y aviso · adjuntar/verificar · compartir · export con
identidad (variante de DOC-22 en SISTEMA).

## 3 · RELACIÓN CON OTROS MÓDULOS

- **IDENTIDAD** — *Recibe:* la paciente en contexto (nombre, expediente, fundamentales) y
  la cinta que toda pantalla con paciente debe llevar (pilar 3; excepción declarada:
  DOC-07 y las pantallas que crean pacientes). *Entrega:* nada — solo lee identidad.
- **PROTOCOLOS (el episodio)** — *Recibe:* el episodio activo (cambiarlo mueve todo el
  destino: DOC-01, DOC-08, DOC-16) y los derivados FUM → FPP/EG de R-04 (DOC-02).
- **CONTROLES** — *Recibe:* la serie de controles para «último valor con número válido»
  (DOC-02) y para las columnas clínicas del export (DOC-18).
- **ULTRASONIDO · INGESTA** — *Entrega:* la puerta de consentimiento de imagen (DOC-14)
  que ambos deben consultar al subir una foto; y comparte el patrón de custodia (DOC-15):
  el estudio es adjunto con manifiesto (R-31).
- **LABORATORIO · GRAFICOS** — *Entrega:* el progreso químico en modo solo lectura
  (DOC-16), de donde salen las series de tendencias (R-38/R-21).
- **HISTORIA-Y-NOTAS** — *Recibe (solo al compartir):* sus párrafos de texto libre, que
  DOC-19 barre antes de entregar. **Jamás escribe historia.**
- **BUSQUEDA-Y-MOVIMIENTO** — hogar candidato de la salida COMPARTIR (DOC-22 en
  `IMPORTAR.html`).
- **SISTEMA · ACCESO** — *Recibe:* la autoría de sesión (quién generó, con cédula — R-36)
  para bitácora; *muestra:* bitácora verificable (DOC-08) y export con identidad.
- **Que NO toca:** TABLERO, ALERTAS, ATENCIONES, AGENDA, URGENCIA — ninguna función de
  este módulo los lee ni los escribe; al compartir, todo sale de expediente y episodio,
  nunca del estado del día.

## 4 · CAPA DE DATOS (qué guarda y dónde)

Aquí «base de datos» = el árbol de archivos de `DATOS/` (su DEC-01: el sistema de
archivos **es** la base de datos; formatos abiertos y legibles sin el software).

**Mapa de lecturas y escrituras:**

- **Plantillas:** `DATOS/_PLANTILLAS/` (y sus `textos/` para lo legal) — R-07/R-08. El
  módulo lee para rellenas; escribe solo en CRUD de .txt; el original siempre intacto.
- **Documentos generados:** se escriben en la carpeta del episodio activo, bajo
  `DATOS/PACIENTES/…/<uuid>/` — nombre exacto de la subcarpeta: [SUPUESTO 14] (la
  auditoría dice «carpeta del episodio», la ley no la nombra: verificar en la maestra).
- **Adjuntos:** `ADJUNTOS/` con su fila en `MANIFIESTO.json` — R-09. [SUPUESTO 15] si
  además se copian junto al episodio (así lo describe la auditoría): reconciliar ley con
  código.
- **Consentimientos y aviso:** registro en el expediente con estado vigente/revocado —
  R-08. Archivo exacto: [SUPUESTO 16] (la ley declara el registro, no la ruta).
- **Progreso químico:** un .xlsx por episodio, en su carpeta [SUPUESTO 14]; el sistema
  solo lo lee.
- **Sal del export anónimo:** archivo nuevo con el ID de DOC-17 en su nombre; la **sal**
  vive en un archivo de configuración y jamás viaja [SUPUESTO 6] (nombre por verificar).
- **Bitácora:** diario del sistema con autor y evento (R-08/R-13); las abortaciones de la
  puerta, por tipo de hallazgo y sin contenido [SUPUESTO 10].
- **Que solo lee, jamás escribe:** `HISTORIA.json`, `EPISODIO.json`, expediente de
  identidad, controles. Este módulo escribe en **su** terreno y nada más.

**Invariantes de almacenamiento:** escritura atómica en todo archivo generado (temporal +
renombrar: un corte de luz deja el viejo o el nuevo, nunca uno a medias) · plantilla
original byte-idéntica siempre · un solo escritor (por la cola del escritor único,
decisión 15 de `IMPLEMENTACION-DESDE-LA-VERDAD.md`) · `MANIFIESTO.json` es la verdad de
los adjuntos (toda vista de verificación se calcula de él, sin índice espejo) · la sal
nunca aparece en ninguna salida.

## 5 · PANTALLAS QUE LO EXponEN (el mapa inverso)

- **`DOCUMENTOS.html`** (propuesta) y **`C-05.html`** (réplica de hoy) — verificado por
  lectura: contienen plantillas, .docx, consentimiento y «verificación». **Muestran:**
  DOC-01, DOC-03/04, DOC-09, DOC-12, DOC-15. **Les faltan:** el índice/lint de
  marcadores (DOC-11), el aviso de privacidad (DOC-13), el diálogo de colisión
  (DOC-06), el progreso químico (DOC-16) y todo el bloque compartir (DOC-17…22) — todos
  con `FALTA DIBUJO`.
- **`IMPORTAR.html`** — candidato a hogar de DOC-22 (el rotulado de salidas); hoy solo
  dibuja «previsualizar» del import → `FALTA DIBUJO`.
- **`SISTEMA.html`** — la variante con identidad de DOC-22 (export de respaldo) y la
  verificación de bitácora (DOC-08); «export» aparece dos veces en el dibujo.
- **`INGESTA.html` · `ULTRASONIDO.html`** — deberían mostrar el rechazo por consentimiento
  de imagen (DOC-14); «consentimiento» no aparece en ellos → `FALTA DIBUJO`.
- **Regla:** cada `FALTA DIBUJO` es una deuda que entra a la bitácora de construcción el
  día que se toque ese dibujo; ninguna función de esta hoja se da por construida mientras
  su pantalla falte o mienta.

---

## 6 · FUNCIONES (22, en seis partes)

### PARTE A · Generar el documento (el acto)

#### DOC-01 · Generar un documento con paciente (el de treinta segundos)

- **QUÉ:** con la paciente elegida, un clic y su documento sale abierto, ya relleno con
  sus datos y con la plantilla del médico.
- **POR QUÉ:** P4 (documento en 1 clic) + su hallazgo H-018 (que sean *sus* plantillas) +
  la evidencia externa: la documentación repetida es la que más cansa al personal
  (encuesta AMIA 2024: 7 de cada 10 terminan tarde por captura).
- **CÓMO:** 1) confirma paciente y episodio activo · 2) carga la plantilla elegida · 3)
  construye el mapa de marcadores (DOC-02) · 4) calcula el nombre de salida (DOC-06) · 5)
  pregunta si ya existe ese archivo (DOC-06) · 6) rellena sobre copia (DOC-03 o DOC-04) ·
  7) verifica que ningún marcador quedó sin resolver (DOC-05) · 8) escribe de forma
  atómica y registra (DOC-08) · 9) abre con el programa nativo. **NO hace:** no modifica
  la plantilla, no imprime solo, no redacta contenido clínico.
- **RELACIONES:** es la entrada del pipeline GENERAR; invoca en orden DOC-02 → DOC-06 →
  DOC-03/04 → DOC-05 → DOC-08 · recibe paciente de IDENTIDAD y episodio de PROTOCOLOS ·
  su variante sin paciente es DOC-07.
- **DATOS:** lee plantilla de `DATOS/_PLANTILLAS/`, datos del expediente y `EPISODIO.json`
  (derivados) · escribe el documento generado en la carpeta del episodio [SUPUESTO 14] y
  su fila en bitácora · **nunca** escribe en la plantilla.
- **PAR FRONTAL:** `DOCUMENTOS.html` / C-05: identidad a la vista, tira FUM | FPP | EG
  (según la auditoría — *por verificar en el dibujo local*), lista de plantillas a pantalla
  completa, barra de acciones anclada. Al abrir: «Edita, guarda con Ctrl+S y cierra».
- **GUARDA:** `test_documentos` (marcador irresoluto ⇒ error visible · plantilla
  byte-idéntica) · número: listo en ≤1 clic (R-05).
- **CASA:** R-05, P4, DEC-08 · dibujos DOCUMENTOS/C-05.
- **ESTADO:** DECIDIDO · ESPERA VEREDICTO (banda en el dibujo).

#### DOC-02 · El mapa de marcadores (el traductor único)

- **QUÉ:** convierte los datos crudos del expediente en los valores listos que la
  plantilla espera (`{{NOMBRE}}`, `{{FPP}}`, `{{EDAD}}`…).
- **POR QUÉ:** P5 una-sola-casa: si cada pantalla recalcula la FPP por su cuenta, una
  tarde una pantalla dice una cosa y el impreso otra — y en obstetricia eso no es feo, es
  peligroso.
- **CÓMO:** se alimenta del **episodio activo**. Tres tipos de valor: **directos** (nombre,
  CURP, teléfono, médico, fecha de hoy) · **derivados** (edad desde la fecha de nacimiento;
  FPP y EG desde la FUM — nunca se capturan a mano, R-04) · **último valor con número
  válido** (peso, presión, útero, latido fetal: el control más reciente que tenga ese
  número; si la visita de hoy no lo trae, el anterior — un campo sin capturar no vacía el
  documento). Si no hay dato: no se inventa.
- **RELACIONES:** la usan DOC-01/07 (generar), DOC-11 (índice de marcadores) y DOC-16
  (marcadores del progreso base) · bebe de CONTROLES y del episodio (R-04).
- **DATOS:** lee expediente, `EPISODIO.json` (derivados) y serie de controles · escribe:
  ninguno — es un traductor de solo lectura.
- **PAR FRONTAL:** la tira FUM | FPP | EG con trimestre y cuenta regresiva; el campo
  ausente se muestra honesto.
- **GUARDA:** paridad de derivados: misma FPP en documento, pantalla y gráfica (ratchets
  de R-04).
- **CASA:** R-04, R-14/R-39, P5, auditoría (regla del último valor válido).
- **ESTADO:** DECIDIDO · forma de mostrar el dato ausente [SUPUESTO 1].

#### DOC-03 · Rellenar un .txt

- **QUÉ:** sustituye cada marcador por su valor en texto plano.
- **POR QUÉ:** cartas y formatos simples no necesitan más maquinaria; lo simple es rápido
  de probar.
- **CÓMO:** por cada marcador del mapa, busca `{{CLAVE}}` y lo reemplaza. Si la plantilla
  no se puede leer, manda a DOC-05 (nunca copia sin rellenar).
- **RELACIONES:** la llama DOC-01 cuando la plantilla es .txt · su salida pasa siempre por
  DOC-05 antes de DOC-08.
- **DATOS:** lee plantilla .txt · escribe solo el archivo generado.
- **PAR FRONTAL:** misma que DOC-01 — la persona no distingue el formato, ve su documento.
- **GUARDA:** `test_documentos` (parte txt).
- **CASA:** R-05/R-07 · auditoría.
- **ESTADO:** DECIDIDO.

#### DOC-04 · Rellenar Word y Excel sobre copia (el truco del sobre)

- **QUÉ:** copia el archivo del médico, cambia solo los marcadores de adentro y entrega la
  copia; el original jamás se abre en escritura.
- **POR QUÉ:** P3 — el formato es del médico (logotipo, letra, cláusulas): regenerarlo
  desde cero lo perdería todo. Un .docx es un sobre con archivos de adentro: se abre y se
  toca solo el texto.
- **CÓMO:** 1) copia el archivo completo · 2) abre solo el texto visible (en Excel, la
  hoja de textos compartidos) · 3) sustituye el marcador; si Word lo partió en trozos
  (`{{PACI`…`ENTE}}`), lo busca con una expresión que **tolera etiquetas de formato entre
  cada letra** — lo reconoce aunque venga roto en diez pedazos · 4) **escapa** el valor
  antes de insertarlo (`<`, `&`, comillas romperían el archivo) · 5) guarda la copia.
- **RELACIONES:** la llama DOC-01 cuando la plantilla es .docx/.xlsx · su salida pasa por
  DOC-05 antes de DOC-08 · reutiliza plantillas de DOC-09.
- **DATOS:** lee el sobre de la plantilla (solo lectura del original) · escribe la copia
  con su texto modificado.
- **PAR FRONTAL:** invisible por diseño: el documento abre en Word con todo su formato; la
  falla cae en DOC-05.
- **GUARDA:** plantilla original byte-idéntica tras generar + prueba del marcador partido
  (existe en la suite de la auditoría).
- **CASA:** R-07, DEC-01, auditoría (mecanismo).
- **ESTADO:** DECIDIDO.

#### DOC-05 · Un marcador sin resolver = error visible (nunca papel mudo)

- **QUÉ:** si al terminar queda algún `{{…}}` sin sustituir, el documento **no se entrega**
  y la persona recibe un aviso que nombra el marcador.
- **POR QUÉ:** evidencia R-05: «una plantilla ilegible generó un documento con los
  marcadores sin sustituir — papel roto para el paciente». La auditoría confirma la deuda:
  el código actual copia sin rellenar si no puede leer (deuda #1, con su guarda ya escrita
  en la ley).
- **CÓMO:** al cerrar el relleno, recorrer el resultado; si aparece un marcador: no escribir
  el archivo y mostrar «La plantilla *X* tiene un marcador que no se pudo completar:
  `{{QUE}}`. Revísela en Word y vuelva a intentarlo.» — cero error técnico, cero salida
  silenciosa.
- **RELACIONES:** verificador obligatorio entre DOC-03/04 y DOC-08 — si falla, no hay
  escritura · también valida las plantillas de DOC-07.
- **DATOS:** lee el archivo ya rellenado **antes** de la escritura final · escribe: nada —
  su fallo es no-escribir.
- **PAR FRONTAL:** diálogo en DOCUMENTOS con el nombre humano del marcador; el botón
  principal no avanza hasta resolver (aquí sí se bloquea: es seguridad).
- **GUARDA:** `test_documentos`: marcador irresoluto ⇒ error visible (escrita en la ley;
  falta ejecutar su FND).
- **CASA:** R-05 · DEC-09 (nunca salida muda).
- **ESTADO:** DECIDIDO en ley · incumplido en código → deuda de ejecución.

#### DOC-06 · Nombre con hora, y pregunta en vez de pisar

- **QUÉ:** cada documento nace con fecha y hora en el nombre; si ya existe, se pregunta:
  ¿abrir el existente o crear otro con `_1`?
- **POR QUÉ:** dos generaciones nunca se pisan, el orden cronológico es el nombre, y un
  documento ya editado o firmado no puede ser sobrescrito por un clic.
- **CÓMO:** nombre `AAAAAAMMDD_HHMMSS_NOMBRE_DE_LA_PLANTILLA.ext` · si el archivo existe:
  diálogo con las dos opciones, **nunca** sobrescribir en silencio.
- **RELACIONES:** la usa DOC-01 antes del relleno · su diálogo protege la escritura de
  DOC-08.
- **DATOS:** lee la lista de nombres del destino (colisión) · escribe: solo decide el
  nombre; el contenido lo escribe DOC-08.
- **PAR FRONTAL:** «Ya existe un documento con este nombre de hoy — ¿abrirlo (no se toca)
  o generar una copia?». *Verificado: «colisión» no aparece en `DOCUMENTOS.html` →
  FALTA DIBUJO.*
- **GUARDA:** prueba de colisión (existe en la suite de la auditoría).
- **CASA:** auditoría · DEC-09.
- **ESTADO:** DECIDIDO · FALTA DIBUJO.

#### DOC-07 · Documentos sin paciente (la papelería separada)

- **QUÉ:** la misma máquina para actos administrativos, con paciente «(sin paciente)» y
  fecha de hoy.
- **POR QUÉ:** hay papeles que no son de nadie; **estos documentos nunca entran a un
  expediente** — separa clínica de papelería (R-06).
- **CÓMO:** mapa mínimo (fecha y etiqueta) · destino: carpeta general · mismo relleno y
  mismas verificaciones (DOC-03/04/05/06/08).
- **RELACIONES:** variante de DOC-01 sin IDENTIDAD (por diseño) · usa los mismos
  servicios del pipeline.
- **DATOS:** lee plantilla y fecha · escribe en la carpeta general — **jamás** bajo un
  expediente.
- **PAR FRONTAL:** pestaña «sin paciente» (las tres pestañas existen en el programa según
  la auditoría — *por verificar en el dibujo local*).
- **GUARDA:** `test_documentos` (hereda R-05) + prueba de que no aparece en el historial
  de nadie.
- **CASA:** R-06.
- **ESTADO:** DECIDIDO.

#### DOC-08 · Destino por episodio, escritura atómica y bitácora

- **QUÉ:** todo documento nace en la carpeta del episodio activo, se escribe sin dejarse
  cortar a media, y queda registrado quién lo generó.
- **POR QUÉ:** lo del embarazo de este año no cae en el de hace dos · un corte de luz no
  debe dejar un archivo clínico roto · la bitácora con autor es evidencia (auditoría: cadena
  de hashes).
- **CÓMO:** escribir en temporal, vaciar y renombrar (el corte solo deja viejo o nuevo,
  nunca roto) · registrar autor, documento, paciente y hora · listar los documentos del
  episodio en su historial.
- **RELACIONES:** cierre de los pipelines de DOC-01 y DOC-07 · su bitácora la lee SISTEMA
  (verificación en 1 clic, R-13) y el dueño.
- **DATOS:** escribe el documento en la carpeta del episodio [SUPUESTO 14] (atómico) y la
  fila en bitácora · lista (lectura) para el historial.
- **PAR FRONTAL:** el documento aparece en el historial de la paciente; la bitácora es
  visible y verificable en SISTEMA.
- **GUARDA:** prueba de escritura atómica (corte simulado ⇒ nunca archivo a medias) +
  `test_bitacora`.
- **CASA:** R-08/R-09, DEC-01, P8 (escritura atómica).
- **ESTADO:** DECIDIDO.

### PARTE B · Las plantillas (el formato es del médico)

#### DOC-09 · Las plantillas viven en la carpeta

- **QUÉ:** plantillas como archivos normales en `DATOS/_PLANTILLAS/` (.txt, .docx,
  .xlsx), visibles con el explorador.
- **POR QUÉ:** DEC-01 — el sistema de archivos es la base de datos: el médico las copia de
  USB, las respalda, las abre en Word; si el software desaparece, sus formatos siguen
  siendo suyos (P3 formatos abiertos) · su H-018: **sus** plantillas, no las del programa.
- **CÓMO:** el programa solo lee la carpeta · crea solo si no existe el archivo de
  instrucciones con los marcadores disponibles · al generar, copia (DOC-04) — jamás edita
  el original.
- **RELACIONES:** insumo de DOC-01, DOC-07, DOC-11 (lint) y DOC-16 (progreso base) · CRUD
  tocado desde la pestaña de plantillas.
- **DATOS:** lee `DATOS/_PLANTILLAS/` · escribe solo en CRUD de .txt y en la creación de
  `textos/` si falta · nunca sale de esa carpeta.
- **PAR FRONTAL:** lista con indicador de tipo — `[.txt · editable aquí]` (verde) vs
  `[DOCX · solo abrir con Word/Excel]` (gris) — *por verificar en el dibujo local*.
- **GUARDA:** plantilla byte-idéntica tras generar y tras cualquier operación (R-07).
- **CASA:** R-07, P3, DEC-01, H-018.
- **ESTADO:** DECIDIDO · verificación [SUPUESTO 0].

#### DOC-10 · CRUD asimétrico: crear y editar sí, borrar no

- **QUÉ:** se crean y editan plantillas de texto desde la interfaz; **no hay botón de
  borrar**; los .docx/.xlsx solo se abren con Word/Excel.
- **POR QUÉ:** borrar una plantilla usada en actos clínicos es un riesgo — se borra a
  mano, por el dueño; y un binario rico solo se modifica con su programa nativo.
- **CÓMO:** crear/editar .txt dentro de la pantalla · para .docx/.xlsx, «abrir con
  Word/Excel» y nada más · sin acción de borrado en la interfaz.
- **RELACIONES:** regla que acompaña al CRUD de DOC-09 · el indicador de tipo de DOC-09
  la explica en pantalla.
- **DATOS:** mismos de DOC-09; la interfaz no emite la orden de borrado.
- **PAR FRONTAL:** indicadores de tipo junto a cada plantilla.
- **GUARDA:** prueba de que la interfaz no ofrece borrado y de que un CRUD .txt no toca
  archivos ajenos.
- **CASA:** R-07 (CRUD) · la regla «sin borrado» viene de la auditoría: [SUPUESTO 2],
  candidata a `REQUISITOS-DEL-DISENO.md`.
- **ESTADO:** CANDIDATO [SUPUESTO 2].

#### DOC-11 · Lint al importar e índice de marcadores (la ayuda que falta)

- **QUÉ:** al agregar una plantilla, lista sus marcadores — cuáles conoce y cuáles no —; y
  en la pantalla de documentos, «marcadores disponibles» muestra el diccionario.
- **POR QUÉ:** auditoría, deudas #8 y #9: un `{{PACIENT}}` mal escrito pasa desapercibido
  hasta el render, y el médico debe adivinar qué puede usar. Verificado en esta sesión:
  **ni «marcador» ni `{{` existen en ningún dibujo**.
- **CÓMO:** al importar, comparar los `{{…}}` de la plantilla contra el diccionario de
  DOC-02 y listar «reconocidos / desconocidos» · índice: ese mismo diccionario, como lista.
- **RELACIONES:** se ejecuta al importar (sobre DOC-09), consulta el diccionario de
  DOC-02 y protege el flujo de DOC-01 (el error se ve antes, no al render).
- **DATOS:** lee la plantilla recién agregada · escribe: ninguno — es diagnóstico.
- **PAR FRONTAL:** diálogo al importar + botón «ver marcadores disponibles» junto a la
  lista de plantillas.
- **GUARDA:** prueba de lint: marcador inventado ⇒ aviso al importar.
- **CASA:** auditoría (#8/#9) — sin fila de ley: [SUPUESTO 3].
- **ESTADO:** CANDIDATO [SUPUESTO 3].

### PARTE C · Consentimientos, aviso y consentimiento de imagen

#### DOC-12 · Consentimiento informado (cuerpo sellado, pie después)

- **QUÉ:** documento con identidad, procedimiento escrito por el médico, cláusulas
  estándar (naturaleza, riesgos, alternativas, derecho a retirar), líneas de firma,
  identificador propio y huella de seguridad al pie; queda registrado con su estado.
- **POR QUÉ:** evidencia R-08: «el SHA autoincluido anulaba su propia verificación» — por
  eso **se firma el cuerpo primero y el pie va después**. Y los textos legales viven en
  `DATOS/_PLANTILLAS/textos/` porque «vivían incrustados en el código»: cambiar una
  cláusula no debe pedirle permiso a un programador.
- **CÓMO:** 1) armar texto · 2) huella del cuerpo · 3) pie con esa huella · 4) registro en
  expediente (tipo, fecha, estado) · 5) verificación en 1 clic: «intacto» o «alterado».
- **RELACIONES:** usa textos y plantillas de DOC-09 · su registro es leído por DOC-14
  (consentimiento de imagen) · misma máquina de sellado que DOC-15.
- **DATOS:** lee `DATOS/_PLANTILLAS/textos/` e identidad del expediente · escribe el
  consentimiento y su registro con estado [SUPUESTO 16] + bitácora · nunca escribe en la
  plantilla.
- **PAR FRONTAL:** pestaña de consentimientos; al verificar, «intacto/alterado» en humano;
  si el texto legal fue tocado: aviso «el texto fue modificado desde la plantilla».
- **GUARDA:** `test_consentimiento` (verificación + aviso de modificación).
- **CASA:** R-08 · DEC-01 · auditoría (mecanismo del pie).
- **ESTADO:** DECIDIDO.

#### DOC-13 · Aviso de privacidad en un clic (una vez por expediente)

- **QUÉ:** se genera una vez por paciente con finalidades, base legal, derechos ARCO y
  «no hay transferencia a la nube»; si ya existe, no se reescribe.
- **POR QUÉ:** cumplimiento en un clic (LFPDPPP) y es la prueba que se le puede mostrar a
  la paciente de que sus datos no salen a internet (P1).
- **CÓMO:** idempotente — si el archivo existe, se abre; solo se crea si falta. Texto
  desde `DATOS/_PLANTILLAS/textos/`.
- **RELACIONES:** hermano de DOC-12 (mismos textos legales, misma carpeta) · sin
  dependencia del episodio (es del expediente, no de la visita).
- **DATOS:** lee `textos/` y expediente · escribe una sola vez el aviso en el expediente ·
  segunda vez: no reescribe.
- **PAR FRONTAL:** botón en DOCUMENTOS. *Verificado: «privacidad» no aparece en ningún
  dibujo → FALTA DIBUJO.*
- **GUARDA:** R-08 + prueba de idempotencia (segunda generación no reescribe).
- **CASA:** R-08.
- **ESTADO:** DECIDIDO en ley · FALTA DIBUJO.

#### DOC-14 · El consentimiento de imagen manda sobre las fotos

- **QUÉ:** una foto clínica solo se adjunta si el consentimiento de imagen está vigente;
  revocado ⇒ deja de permitirse.
- **POR QUÉ:** R-09 — la imagen viaja más lejos que el texto; la revocación debe cortar el
  grifo donde la foto entra, no donde se mira.
- **CÓMO:** al intentar adjuntar foto: leer el estado en el expediente · vigente ⇒ deja
  pasar · ausente o revocado ⇒ rechazo con mensaje humano, sin guardar.
- **RELACIONES:** **veto** que comparten ULTRASONIDO/INGESTA y DOC-15 (adjuntar foto) ·
  lee el registro de consentimientos que alimentan DOC-12.
- **DATOS:** lee registro de consentimientos del expediente [SUPUESTO 16] · escribe:
  ninguno — es solo veto.
- **PAR FRONTAL:** «Falta el consentimiento de imagen de [nombre] — pídaselo y firmándolo
  podrá guardar la foto.» *Verificado: falta señalarlo en INGESTA y ULTRASONIDO →
  FALTA DIBUJO.*
- **GUARDA:** `test_adjuntos` (foto sin consentimiento ⇒ rechazo; revocada ⇒ también).
- **CASA:** R-09, R-31.
- **ESTADO:** DECIDIDO · FALTA DIBUJO en ingreso.

### PARTE D · Custodia documental

#### DOC-15 · Adjuntos con manifiesto (cadena de custodia)

- **QUÉ:** al agregar un PDF o una foto: se copia, se calcula su huella, queda registrada
  (nombre, fecha, autor, huella, tamaño, tipo) y la verificación en 1 clic recalcula todo.
- **POR QUÉ:** R-09 — un papel alterado debe detectarse: la huella convierte «me aseguro»
  en algo que se comprueba. **Tope declarado:** copia, sella y verifica — **no interpreta**
  (sin PACS, sin IA).
- **CÓMO:** copiar → huella SHA-256 → fila en el manifiesto → verificación recalculando y
  comparando · límite de MB por episodio, configurable (auditoría, sin fila).
- **RELACIONES:** entrada de adjuntos de todo el sistema (foto ⇒ veto DOC-14; estudio ⇒
  ULTRASONIDO) · su verificación es la misma que expone SISTEMA · misma máquina de sellado
  que DOC-12.
- **DATOS:** lee el archivo subido · escribe la copia en `ADJUNTOS/` y la fila en
  `MANIFIESTO.json` (R-09) [SUPUESTO 15] · al verificar, solo lectura (recalcula).
- **PAR FRONTAL:** adjuntar + «verificar documentos»: «todos intactos» o «alterado o
  faltante: *nombre*».
- **GUARDA:** `test_adjuntos` (manifiesto vs disco).
- **CASA:** R-09 · auditoría (límite).
- **ESTADO:** DECIDIDO · [SUPUESTO 4] el límite.

### PARTE E · Caso especial del laboratorio

#### DOC-16 · Progreso Químico (el Excel vivo del embarazo)

- **QUÉ:** un .xlsx por embarazo, creado una sola vez; después **solo se lee**: jamás se
  pisa, tolera que Excel o LibreOffice lo reescriban, convierte sus fechas y alimenta las
  gráficas.
- **POR QUÉ:** en el centro real el laboratorio se vive en hoja de cálculo: re-capturar
  sería doble captura (prohibida) y quitarle al médico su libro.
- **CÓMO:** al primer uso del episodio: crear si no existe (desde `PROGRESO_BASE*` con
  marcadores de DOC-02, o con solo encabezados) · después: leer · fechas de hoja → fechas
  legibles · series hacia GRAFICOS y LABORATORIO.
- **RELACIONES:** reutiliza plantillas de DOC-09 y marcadores de DOC-01/02 · entrega
  series a LABORATORIO y GRAFICOS.
- **DATOS:** crea una vez el .xlsx en la carpeta del episodio [SUPUESTO 14] · después
  **solo lectura** (jamás escribe) · alimenta lecturas de R-38.
- **PAR FRONTAL:** «abrir progreso químico» desde DOCUMENTOS — *no aparece en ningún
  dibujo → FALTA DIBUJO*.
- **GUARDA:** prueba de no-reescritura (byte-idéntico tras leer y tras repetir generación)
  + prueba de lectura en ambos formatos de hoja.
- **CASA:** auditoría · sin fila de ley — candidata a R-38: [SUPUESTO 5].
- **ESTADO:** CANDIDATO [SUPUESTO 5] · FALTA DIBUJO.

### PARTE F · Compartir sin identidad (la otra cara, integrada)

#### DOC-17 · El ID anónimo (la chapita de nadie)

- **QUÉ:** convierte la clave del expediente —que lleva el nombre— en un código de 12
  caracteres que nombra el archivo compartido: `A3F9C21B7E40`.
- **POR QUÉ:** R-23 («ID estable SHA+sal») — estándar de pseudonimizado (LFPDPPP, GDPR,
  HIPAA): lo que reidentifica casi nunca es un dato suelto, es la **combinación**.
- **CÓMO:** clave + **sal** (32 caracteres aleatorios, creada **una sola vez en el
  arranque**, guardada en su archivo de configuración, jamás viaja) → SHA-256 → primeros
  12 caracteres. Mismo dato ⇒ mismo código; sin sal no hay vuelta; el código no dice nada
  clínico.
- **RELACIONES:** primer paso del pipeline COMPARTIR (DOC-22 → DOC-17 → DOC-18) · su
  código aparece en nombre y cabecera del export.
- **DATOS:** lee la clave del expediente y la sal de su configuración [SUPUESTO 6] ·
  escribe: solo el ID en el archivo exportado y en bitácora (sin identidad) · la sal
  **jamás** sale.
- **PAR FRONTAL:** nombre y cabecera del archivo con «este código identifica el caso, no a
  la paciente».
- **GUARDA:** misma paciente en dos exports ⇒ mismo código · la sal no aparece en ninguna
  salida · candidata `test_estabilidad_sal` (dos procesos el primer día ⇒ misma sal).
- **CASA:** R-23 · auditoría (pieza A).
- **ESTADO:** DECIDIDO (R-23) · [SUPUESTO 6] la mejora de la sal.

#### DOC-18 · La lista blanca de salida (solo lo permitido sale)

- **QUÉ:** el documento anónimo no se arma tachando: se arma desde una página en blanco
  donde **solo se copia lo permitido**.
- **POR QUÉ:** la única salida segura es construir desde lo permitido — tachar deja escapar
  lo olvidado (auditoría: la decisión más valiosa del módulo). Y distingue **dato clínico**
  de **dato identitario**: la FUM y las fechas de controles sí viajan; la fecha de
  nacimiento no — se convierte en **edad**.
- **CÓMO — sale:** edad derivada, sexo, ocupación, escolaridad, estado civil · alergias,
  sangre · FUM, FPP, EG, G-P-A, parto anterior · antecedentes · serie de controles con
  fechas clínicas · laboratorio · alertas · medicamentos. **Nunca:** nombre, apellidos,
  clave, CURP, teléfono, correo, domicilio, NSS, lugar de nacimiento, acompañante, notas,
  fecha de nacimiento cruda, médico remitente. **Deuda:** hoy la lista se arma desde un
  archivo incompleto (domicilio y NSS viven en la historia) — mejora: un solo **perfil
  identitario** [SUPUESTO 7].
- **RELACIONES:** recibe el ID de DOC-17 · arma el cuerpo que DOC-19 limpia y DOC-20
  verifica · lee datos de IDENTIDAD, PROTOCOLOS, CONTROLES e HISTORIA (solo campos).
- **DATOS:** lee expediente, `EPISODIO.json`, controles y `HISTORIA.json` (campos
  permitidos) · escribe: solo el cuerpo del documento anónimo en el archivo de salida ·
  **jamás copia** los campos prohibidos.
- **PAR FRONTAL:** en la pantalla de compartir, «lo que sale / lo que se queda» en palabras
  de sala (DOC-22).
- **GUARDA:** prueba genérica: datos arbitrarios ⇒ cero coincidencias del nombre en el
  resultado.
- **CASA:** R-23 · auditoría (pieza B) · regla *fecha de nacimiento ⇒ edad*:
  [SUPUESTO 13] en `REQUISITOS-DEL-DISENO.md`.
- **ESTADO:** DECIDIDO en su idea · [SUPUESTO 7] · [SUPUESTO 13].

#### DOC-19 · El enmascarador de texto libre

- **QUÉ:** barre los párrafos escritos a mano y vuelve irreconocible lo identitario:
  nombre → `[IDENTIFICADOR]`, CURP → `[CURP]`, teléfono → `[TEL]`, correo → `[EMAIL]`.
- **POR QUÉ:** los campos se arman por lista, pero los párrafos son del médico — «mamá de
  ROCÍO DEL CARMEN, tel 5512345678» la puerta no lo vería por forma.
- **CÓMO mejorado:** comparar por **palabras completas** · sin mayúsculas ni acentos
  (Rocío = ROCÍO = Rocio) · aplicar también a nombre de archivo y encabezados · NSS de 11
  dígitos enmascarar en vez de bloquear [SUPUESTO 8].
- **RELACIONES:** barre lo que DOC-18 ensambló · su salida pasa a DOC-20 · toca historia
  solo como lectura de párrafos.
- **DATOS:** lee los párrafos del documento de salida · escribe: solo reemplazos en ese
  archivo · **no toca** `HISTORIA.json`.
- **PAR FRONTAL:** si algo fue enmascarado, aviso antes de compartir: «se reemplazaron 3
  datos personales en el texto».
- **GUARDA:** prueba de que los literales no aparecen en el resultado.
- **CASA:** auditoría (pieza D) · R-23 (marco).
- **ESTADO:** DECIDIDO como función · [SUPUESTO 8].

#### DOC-20 · La puerta (el guardia que no confía en el limpiador)

- **QUÉ:** recorre el documento entero buscando CURP (18), teléfonos (10 dígitos),
  correos, NSS (11) y cualquier literal de la lista blanca; si encuentra **uno solo, no se
  escribe el archivo**.
- **POR QUÉ:** defensa en profundidad — el enmascarador intenta, la puerta verifica; un
  sistema que limpia y se confía tiene un solo punto de fallo silencioso. Evidencia R-23:
  «la puerta cubrió solo al .md y el CSV salió con identidades». Aquí bloquear sí
  corresponde (excepción de seguridad de P2).
- **CÓMO mejorado:** lo seguro (CURP/correo/teléfono) se **sanea** y sigue; lo ambiguo
  (números largos) se **bloquea** con mensaje que dice qué encontró [SUPUESTO 9] · cada
  aborto en bitácora por **tipo**, sin contenido [SUPUESTO 10] · prueba del **camino de
  aborto real**: que el archivo no se escriba.
- **RELACIONES:** última mano antes de DOC-21 · si falla, se corta el pipeline COMPARTIR
  completo (no hay DOC-21).
- **DATOS:** **lee el artefacto completo de salida** · escribe: nada si falla
  (fail-closed) · bitácora de abortos [SUPUESTO 10].
- **PAR FRONTAL:** «No se generó el archivo: se encontró [tipo] en el documento. Revíselo
  y vuelva a intentar.» — nunca archivo a medias, nunca error técnico.
- **GUARDA:** `test_anonimo` (identidad en cualquier celda ⇒ no se publica) + extensión
  al .md.
- **CASA:** R-23, DEC-09 · auditoría (pieza C).
- **ESTADO:** DECIDIDO · [SUPUESTO 9] · [SUPUESTO 10].

#### DOC-21 · Una sola puerta para todos los formatos, y el CSV con su librería

- **QUÉ:** .md y .csv —y toda salida futura— atraviesan la **misma** puerta; el CSV se
  arma con la librería de CSV (escapa comillas y comas), nunca concatenando a mano.
- **POR QUÉ:** R-23 literal (misma puerta para .md y .csv; `csv.writer`) — evidencia: el
  CSV salió con identidades y «unir columnas sin escaping rompió el archivo». Una política
  con varias implementaciones es una política con agujeros.
- **CÓMO:** un solo motor de pasadas (permitido → enmascarar → puerta) que recibe el
  formato de salida; el CSV pasa por el serializador estándar. Mejora: **manifiesto de
  campos permitidos por tipo** + prueba «lo exportado == lo permitido» [SUPUESTO 11].
- **RELACIONES:** recibe la salida limpia de DOC-19/20 · la ejecuta DOC-22 · mismo motor
  para .md, .csv y los futuros.
- **DATOS:** escribe el archivo final (md/csv) ya superada la puerta · el CSV, vía
  serializador · [SUPUESTO 11] manifiesto de campos.
- **PAR FRONTAL:** ninguna diferencia visible — la etiqueta la pone DOC-22.
- **GUARDA:** `test_anonimo` para ambos formatos + (si se aprueba) paridad contra el
  manifiesto.
- **CASA:** R-23 · auditoría (deuda #1 del CSV — ya es ley, falta ejecución).
- **ESTADO:** DECIDIDO en ley · [SUPUESTO 11].

#### DOC-22 · Las dos puertas de salida, rotuladas (archivar vs compartir)

- **QUÉ:** son dos actos con dos rótulos: **«Exportar expediente (con identidad — para
  respaldo)»** y **«Compartir caso (sin identidad — para colega, tesis o publicación)»**.
- **POR QUÉ:** la auditoría pide no confundirlos, y verificado en esta sesión: **ni un
  dibujo menciona anonimización**, `REQUISITOS-DEL-DISENO.md` no tiene decisión sobre
  export, y `INDEX.md` apunta IMPORTAR a R-23 (que es el export) cuando el import es R-24
  — una función real, con ley y código, **sin representación para veredicto**.
- **CÓMO:** dos botones con sus etiquetas · compartir abre pantalla con la lista de
  DOC-18, el ID de DOC-17 y la puerta de DOC-20 · el export con identidad es el ZIP de
  respaldo, rotulado aparte.
- **RELACIONES:** punto de entrada del pipeline COMPARTIR (llama DOC-17 → DOC-21) · su
  variante con identidad vive hoy en SISTEMA (botón de Admin) · hogar candidato:
  IMPORTAR.
- **DATOS:** no escribe en el expediente — solo produce archivos de salida y su fila en
  bitácora.
- **PAR FRONTAL:** bloque «movimiento de datos» en `IMPORTAR.html` (rótulo *entrar ·
  salir · compartir*) [SUPUESTO 12] — o junto al export en SISTEMA: **es su decisión**.
- **GUARDA:** `test_anonimo` · candidato ratchet: «toda salida rotulada».
- **CASA:** R-23, R-24 (el import que INDEX debe apuntar) · auditoría · dibujo:
  **FALTA DIBUJO**.
- **ESTADO:** ESPERA VEREDICTO · FALTA DIBUJO · [SUPUESTO 12].

---

## 7 · BITÁCORA de esta hoja

- **2026-10-24 · v1** — creación: 22 funciones en seis partes, integrando nuestra cara
  (ley R-05…R-09, R-23, dibujos C-05/DOCUMENTOS, H-018 **nuevo**) y la del análisis de
  ingeniería (motor de relleno y anonimización), con sus deudas traducidas a estado real.
- **2026-10-24 · v2** — verificación de cobertura contra los criterios del dueño (¿qué es
  el módulo, por qué estas funciones, relaciones entre funciones, con otros módulos, con
  la interfaz y con la base de datos?): se añaden las secciones 1–5 (definición,
  esqueleto, relaciones de módulo, capa de datos, mapa de pantallas) y los campos
  RELACIONES y DATOS en las 22 funciones; supuestos nuevos 14 (ruta de documentos
  generados), 15 (destino de adjuntos), 16 (registro de consentimientos).
- **Pendientes de este módulo:** [SUPUESTO 0] verificar motor vs interfaz (H-018) · doble
  veredicto en la entrevista · hogar del export (12) · candidatas de ley (2, 3, 4, 5, 6, 7,
  8, 9, 10, 11, 13) · rutas por verificar en la maestra (14, 15, 16).
