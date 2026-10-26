# ACTA ÚNICA — Sistema de Expedientes Maternidad · fuente única de verdad (v4.2)

| Campo | Valor |
|-------|-------|
| Fecha | 2026-10-23 |
| Versión | **4.2** — enmienda pedida y ratificada por el dueño («gobernanza dueño↔agente: contrato de entrega P9 + §4.13–§4.16, guías `GUIAS/` R-53, DEC-39, F22, frenos por punto ciego de la IA, Fase 7.13 FND-178…185», ratificada 2026-10-23 con encargo de mejorar todo punto ciego conocido de la IA hasta que la gobernanza sea completamente aplicable): **P9** (lenguaje llano con «Dónde revisar usted» · solución en 6 capas · auditoría adversarial permanente) · **§4.13** zonas de decisión, requisitos R-D/R-A, ciclo del hallazgo, 5 números M1–M5, ceremonias y registro de riesgos (riesgo de proyecto | peligro clínico) · **§4.14** misión clínica + modelo de capas A–F + `[SUPUESTO]` + palabras clave optimizar/automatizar + 5 preguntas clínicas · **§4.15** inventario de procesos · **§4.16** frenos por punto ciego de la IA · **R-53** carpeta `GUIAS/` · **DEC-39** plantilla de hallazgo y ventana de ratificación · **F22** · **Fase 7.13**. Historial: **4.1** enmienda pedida y aprobada por el dueño («auditoría lógica de todos los actas: deficiencias, brechas y vacíos lógicos, bien claros y con su resolución», 2026-10-23): **vacíos lógicos cerrados** — PIN mínimo 6 decretado en R-26 · alta de usuario existente ⇒ error visible (R-13/FND-174) · código de recuperación sin caracteres confusos y su huella en `CONFIG/recuperacion.json` (R-51) · catálogos base **jamás pisan existentes ni firmados** y viajan en las actualizaciones (R-52/R-28) · **DEC-11 con presupuestos honestos** (núcleo ≤3 700, app ≤3 300: los Must de la Fase 7.12 no cabían en 3 500 y la medición del dueño vetó el ritual de compactación) · **cierre v0.2** con W-20…W-23 (FND-176) y DEMO con su nota de estreno · **L13**: toda guarda cita pruebas que existen (FND-177) · cabecera del acta frontend a F-23 · contratos `app` con sus utilidades públicas · glosario con la diferencia entre versión de la ley y `VERSION` del producto. Historial: **4.0** corrección total del acta de backend (auditoría de 32 hallazgos; R-51/R-52, DEC-37/38, ronda por orden del dueño, Fase 7.12); **3.13** entrada y explicación legibles (R-50, DEC-36, Fase 7.11, W-21); **3.12** alta del dueño sin cédula; **3.11** primer uso (R-49, DEC-35, Fase 7.10, W-20); **3.10** agenda (R-48, C-25, W-19); **3.9** equipo rojo/negro; **3.8** claridad; **3.7** terminal; **3.6** operación; **3.5** QA previa; **3.1** citas re-mapeadas |
| Vigencia | **Este archivo es la ÚNICA ley.** `ACTA_BACKEND.md`, `ACTA_FRONTEND.md`, `ACTA_SYNC.md` y `ACTA_VERIFICACION.md` son extractos GENERADOS de solo lectura; `AGENTS.md` es un router NO VINCULANTE |
| Dueños | Humano (Approver) + IA asistente (Driver) — DACI en §4.11 |
| Formato de toda ley nueva | Micro-formato de 5 campos (§4.1): sin los 5 campos **no es ley** (DEC-20) |

---

## 0 · PRÓLOGO — cómo se lee y se obedece este acta

1. **Único import.** Si este acta choca con cualquier otro archivo, **gana este acta**.
2. **Dos modos de lectura:** *marco* = leer este archivo completo **una vez por sesión**; *táctico* = durante el trabajo, navegar por IDs (`R-14`, `DEC-06`, `FND-020`) sin releerlo todo.
3. **Tu memoria vive en `ESTADO.md`** — un archivo de **datos** (formato en Anexo A): al empezar la sesión se lee; al cerrar cada tarea se escribe. No es ley, no se discute, no se salta.
4. **La verdad final es una salida de comando.** Toda obligación de este acta cierra en un comando cuya salida copias en tu respuesta. *Claim sin comando = no hecho.* **Un rojo jamás se arregla cambiando la ley:** primero se repara el código; si la ley impide lo correcto → plantilla `[ESCALA]` (§4.6) con matriz y decisión del Approver; hasta que la enmienda se apruebe, el rojo permanece.
5. **Nada externo.** Este repositorio arranca con estos documentos y nada más: código, `tools/`, `pruebas/` y `ESTADO.md` los crean las filas del Libro V con sus DoD. Ningún paso depende de archivos, rutas, versiones ni artefactos ajenos a este acta.
6. **Orden de los libros:** I Leyes → II Requisitos → III Decisiones → IV Operación → V Orden de ejecución → VI Aceptación humana → Anexos A–F.
7. **Antes de actuar, pregunta el alcance.** Si hay duda sobre a qué se refiere el dueño o qué alcance busca, **el agente pregunta antes de editar o ejecutar**: suponer está prohibido (orden del dueño, 2026-10-23; una suposición costó tokens, tiempo y generó regresiones).
8. **Toda entrega al dueño cumple P9 y §4.13.** Si un mensaje no explica un término, no dice «Dónde revisar usted» ni publica su auditoría adversarial, el dueño lo rechaza con «rehacer por P9» y el agente lo rehace en el mismo turno (enmienda v4.2, 2026-10-23).

---

## LIBRO I · LEYES (P1–P9 — inviolables)

**P1 · Offline-first, red local desde el diseño.** Cero nube, cero internet, cero telemetría **para operar**: el programa funciona siempre sin conexión — el consultorio puede tener internet y el programa no lo usa. LAN/USB permitidos solo entre equipos de ESTE consultorio. **Única excepción opcional y desactivable por el dueño:** enviar el **respaldo ligero sellado** de `nucleo::S-5` a la casilla propia cuando hay internet; nunca es requisito de operación. *Por qué:* un consultorio sin internet no puede depender de nada remoto; prohibir la red por diseño es lo único que hace verificable que los datos no salen. *Se verifica:* 0 imports de red fuera de `nucleo.py::S-*` (`S-5` es la única sección con `smtplib`); chequeo estático en la compuerta; los W-01…W-21 se corren sin internet.

**P2 · El usuario primero, superficie mínima.** Workflows reales W-01…W-14 + 6 principios de UI: 1 pantalla = 1 decisión clínica · ≤3 acciones primarias visibles · Enter siempre avanza · un solo camino por acto · confirmar-nunca-bloquear (salvo seguridad) · todo aviso nombra su acción. *Por qué:* un inicio con muchas acciones y la captura doble de un mismo dato consumen la atención del personal en cada turno. *Se verifica:* walkthrough W + conteo de acciones (F9).

**P3 · El médico es dueño de datos y de vistas.** Formatos abiertos en sus carpetas (`.json`, `.txt`, `.docx`), legibles sin el software. **Toda vista derivada = `fold(fuente)` con test de igualdad**; sin test no existe. *Por qué:* un índice manual crea un segundo estado que se desincroniza; solo `fold` con test evita dos verdades. *Se verifica:* `test_fold` + chequeo "solo `nucleo::D-*` hace I/O" en la compuerta.

**P4 · Autonomía, soberanía, eficiencia MEDIBLE.** Licencia 0 · datos nunca salen del equipo · registro ≤2 pasos · documento 1 clic · búsqueda ≤3 clics · Home ≤3 acciones · alta <30 s. *Se verifica:* F9/F10 de §4.8 — lo que no tiene número no es P4.

**P5 · Una sola casa por concepto.** Identidad, derivados gestacionales (FUM/FPP/EG), `nombre_unico`, bloque 1.b NOM-004, validación de FUM, parsers, puerta de anonimización: **una sola definición**. La 2.ª copia = refactor obligatorio con **ratchet en la gate desde el commit 1**. *Por qué:* sin esta guarda nacen copias divergentes de un mismo concepto (los derivados llegaron a existir en 7 copias y la homónimia en 3). *Se verifica:* greps-ratchet en la gate (F3).

**P6 · El dato clínico nace sin firma.** Todo umbral, banda, rango o tabla = **borrador → firma del médico → vigente**. El software informa, nunca diagnostica. **Ningún dato configurable vive en código Python** — *excepción única: la SEMILLA inicial de una instalación nueva (matriz DEC-35, catálogos de R-48/R-50, catálogos base de R-52) puede escribirse una sola vez en el producto y nace siempre como archivo borrador editable en `DATOS/`; después de abierto el equipo, solo por archivo y firma.* *Por qué:* umbrales incrustados en el código obligan a un programador para cambiar una guía clínica; la semilla no decide nada: deja el borrador listo para que una persona firme. *Se verifica:* `test_tablas_clinicas` (0 literales clínicos duros) + catálogos con estado en `DATOS/CATALOGOS/`.

**P7 · Ninguna promesa sin guarda.** Toda promesa (requisito, contrato, decisión) lleva su guarda automática **antes de redactarse**; entrada de ley sin trigger o sin guarda = incompleta. *Se verifica:* lint de campos (§4.9, reglas L3 y L4).

**P8 · Profundidad ante todo (Ousterhout).** (a) interfaces profundas: operaciones a nivel de caso de uso, cero passthrough, cero CRUD expuesto; (b) la complejidad es incremental y **prohibida**: cada `if` especial, flag, fallback mudo o 2.ª copia se paga para siempre; (c) decisiones de diseño ocultas en su módulo (formato de archivo, protocolo, layout); (d) errores **definidos fuera de existencia**: fall-fast en el borde, escrituras atómicas (reintentar es seguro), nunca salida muda; (e) **el diseño incluye sus pruebas**. *Se verifica:* checklist de 11 antipatrónes (§4.5) antes de cada ✅.

**P9 · Entrega al dueño: lenguaje llano, solución en capas, auditoría adversarial.** Toda entrega al dueño —análisis, auditoría, plan, gestión, resultado de pruebas— se rige por tres cláusulas. **(9a) Lenguaje llano con explicación profunda:** cada punto se explica en palabras de consultorio; toda palabra técnica se define la primera vez que aparece y lleva su analogía (p. ej. «examen automático = el revisor que no se cansa»); toda cita interna (`R-xx`, `DEC-xx`, archivo, pantalla) va con su explicación, nunca solo el código; toda entrega cierra con **«Dónde revisar usted»**: qué archivo, pantalla o comando abrir, qué debe ver en palabras y qué decirle al agente si no lo ve. **(9b) Solución en todas las capas:** ante cualquier situación —error, hueco, decisión, hallazgo— el agente entrega soluciones en todas las capas disponibles (definición/ley · diseño/flujo humano · código · verificación/prueba · operación/guía · gobernanza/registro), cada una con su costo y su responsable; si una capa no aplica, dice por qué. **(9c) Auditoría adversarial permanente:** todo artefacto antes de darse por terminado —diseño, plano, enmienda, fila, código no trivial— recibe auditoría adversarial del propio agente que publica qué intentó romper, qué encontró con severidad y las alternativas comparadas; los hallazgos van al dueño en humano. *Por qué:* evidencia del dueño 2026-10-23 («no entiendo a plenitud lo que se está planteando»; las auditorías previas del agente no cazaron lo que una lectura adversarial del código cazó en una hora) · P2. *Se verifica:* el dueño rechaza cualquier entrega con «rehacer por P9» (prólogo regla 8) · el checklist §4.13 cierra cada entrega · un mensaje sin «Dónde revisar» = proceso rojo registrado en `REGISTRO.md`.

---

## LIBRO II · REQUISITOS (el QUÉ con su CÓMO)

### Alcance 100 % (inventario)

**Dentro (bloques):** A registro/expediente (incluye parto y egreso, R-35; barra de pestañas y estados vacíos, R-42) · B historia NOM-004 A–M (incluye notas firmadas, R-36/R-37) · C controles/alertas/cálculos (incluye laboratorio estructurado, panel de estado, HOMA-IR y cálculos enlazados, R-38/R-43) · D apoyo clínico y continuidad (guía, tamizajes, puerperio, CIE-10, curvas; agenda de citas y recordatorios preparados, R-48) · E documentos/consentimientos/adjuntos (incluye imágenes y estudios de ultrasonido, R-30…R-32) · F gráficos/línea de tiempo/tendencias · G integridad/respaldo/analítica · H búsqueda/movimiento de datos (export/import) · I dictado (aparcado, ver R-25) · J seguridad/roles (incluye primer uso del equipo, R-49, y recuperación de credenciales, R-51) · K sync LAN/USB + terminal celular + ingesta de equipos de imagen · L operación (actualización de carpeta, dos lanzadores, `VERSION`, instalación con catálogos de fábrica, R-52) · M gobernanza (compuerta, contratos del Anexo F, control de decisiones).
**Parked (con trigger):** batch · HL7/FHIR solo con spec · sello de tiempo · MEWS/NEWS obstétricas sin firma · perfiles de rol personalizados · dictado (R-25). La agenda/citas pertenece al Alcance por R-48.
**Fuera (inviolable):** certificación · nube o servicio externo · prescripción automática (incluye dosis de fármacos) · diagnóstico automatizado · IA diagnóstica · PKI · app móvil nativa (la terminal web cubre registrar/calcular desde la camilla).

> Cada requisito cierra con su **secuencia de FND** (Libro V) y su **aceptación humana** (Libro VI). El micro-formato es obligatorio: `[QUÉ]` con número · `[POR QUÉ]` principio+evidencia · `[DECISIÓN]` con DEC-x o P-x y descartado · `[CÓMO]` con pasos/FND/aceptación · `[GUARDA]` con test o "se crea ANTES — FND-xxx".

**R-01 · Inicio (llegada y búsqueda)**
- [QUÉ] `C-01` con buscador siempre visible y **exactamente 3 acciones primarias**: `Nuevo paciente` (→ C-03), `Continuar reciente` (→ 3 últimos expedientes), `Documentos` (→ C-05 sin paciente). **Exactamente 12 filtros**, los mismos predicados tabulares del dominio: 1 apellido · 2 nombre · 3 CURP · 4 fecha de nacimiento (rango) · 5 FUM (rango) · 6 EG actual (rango) · 7 fecha de último control (rango) · 8 médico responsable · 9 teléfono · 10 estado del episodio · 11 con alerta activa · 12 con adjunto en `ADJUNTOS/`. Paciente en contexto en ≤3 clics.
- [POR QUÉ] P2/P4; evidencia: una búsqueda que recorre todo el parque congela el arranque en discos lentos, y un inicio con 12 acciones competía por la atención del usuario en cada sesión.
- [DECISIÓN] DEC-03 (fold con test) · DEC-08 (casos de uso profundos). Descartado: índice manual de pacientes.
- [CÓMO] FND-062 (predicados + fold en el núcleo — los 12 ya viven en `Filtros`) → FND-066 (Home con 3 acciones) → FND-173 (los 12 predicados **visibles** en `C-01`, para que W-06 sea ejecutable). Aceptación: escribir "luna" aparece al instante; filtrar por CURP y por rango de FUM achica la lista sin perder la búsqueda.
- [GUARDA] `test_busqueda_fold` (búsqueda == fold del parque) + `test_home` (acción primaria == 3) + `test_filtros_home` (las 12 casillas presentes y funcionales).

**R-02 · Registro paso 1 (identidad)**
- [QUÉ] Alta en ≤2 pasos en `C-03`: apellidos, nombres y fecha de nacimiento en una pantalla; **Enter** valida en vivo; **segundo Enter** da de alta; **sin signos vitales en el paso 1**; homónimia por tabla de casos con retorno tipado `ESTADOS_ALTA = ("OK", "EXISTE", "CANDIDATO")`.
- [POR QUÉ] P2/W-01; evidencia: clasificar resultados por fragmentos de mensajes de texto falló ante cambios de redacción, y dos homónimas idénticas convivieron sin aviso.
- [DECISIÓN] DEC-04 (identidad UUID + match key) · DEC-08 (casos de uso profundos). Descartado: clave = CURP (llega tarde); vitales en el paso 1.
- [CÓMO] FND-020 (identidad) → FND-023 (matching) → FND-030 (alta) → FND-041 (pantalla). Aceptación: repetir el alta de MARIA GARCIA LUNA 15-MAR-1990 muestra candidatos y espera; nunca escribe un segundo expediente.
- [GUARDA] `test_identidad` con exactamente 4 casos: (a) mismo nombre y misma fecha → `CANDIDATO`; (b) mismo nombre con fecha distinta → expedientes distintos; (c) CURP idéntica → `EXISTE`; (d) variación de mayúsculas/acentos/espacios con la misma fecha → `CANDIDATO`. Más `test_alta` (alta OK, homónima, campo faltante → error accionable) y `grep -c '"msg" in' nucleo.py` = 0 con `grep -c '"msg" in' app.py` = 0.

**R-03 · Registro paso 2 (secundarios)**
- [QUÉ] Teléfono, correo, médico y notas se capturan **una sola vez** en la vida del sistema; después solo se editan en `C-04`.
- [POR QUÉ] P2 y P5; evidencia: la ficha volvía a pedir datos que el sistema ya conocía.
- [DECISIÓN] DEC-08 (casos de uso profundos). Descartado: segundo formulario paralelo que re-pide.
- [CÓMO] FND-041 (alta) → FND-065 (ficha muestra-editable). Aceptación: abrir la ficha y encontrar escrito lo que ya se sabe.
- [GUARDA] `test_pantalla_ficha`: campo existente nunca se presenta vacío ni se vuelve a pedir.

**R-04 · Episodios y FUM**
- [QUÉ] FUM = única entrada; FPP y EG **nunca** se capturan (derivadas de `semanas_desde_eg` y `fecha_parto_fum`); validación de FUM en una sola casa.
- [POR QUÉ] P5; evidencia: los derivados gestacionales llegaron a existir en 7 copias y la validación de FUM en 2.
- [DECISIÓN] P5 (una sola casa) · DEC-16 (ratchet en la gate). Descartado: captura manual de derivados.
- [CÓMO] FND-021 (fechas) → FND-071 (derivados del episodio) → FND-072 (pantallas C-09/C-10). Aceptación: capturar FUM → FPP y EG salen solas.
- [GUARDA] `test_fechas` + `test_embarazo` + ratchets: `grep -c 'def semanas_desde_eg' nucleo.py` = 1 y `grep -c 'def validar_fum' nucleo.py` = 1.

**R-05 · Documentos con paciente (1 clic)**
- [QUÉ] 1 clic hasta el documento abierto; **jamás** sale un archivo con `{{}}` sin aviso; la plantilla original en `DATOS/_PLANTILLAS/` nunca se edita.
- [POR QUÉ] P2/W-02; evidencia: una plantilla ilegible generó un documento con los marcadores sin sustituir (papel roto para el paciente).
- [DECISIÓN] DEC-09 (errores fall-fast). Descartado: copia silenciosa sin sustituir.
- [CÓMO] FND-060 (lógica) → FND-069 (pantalla C-05). Aceptación: plantilla dañada → **me avisa**, no sale papel roto.
- [GUARDA] `test_documentos`: marcador irresoluto ⇒ error visible; plantilla byte-idéntica tras generar.

**R-06 · Documentos sin paciente** — [QUÉ] mismo camino de 1 clic sin contexto en C-05 · [POR QUÉ] hereda R-05 · [DECISIÓN] DEC-08 (casos de uso profundos) · [CÓMO] FND-060 → FND-069 · [GUARDA] hereda `test_documentos`.

**R-07 · Plantillas (el formato es del médico)**
- [QUÉ] CRUD sobre `DATOS/_PLANTILLAS/` desde C-05: el sistema solo copia y rellena; el archivo original queda intacto; los textos legales viven en `DATOS/_PLANTILLAS/textos/`.
- [POR QUÉ] P3: el formato lo posee el médico; su editor de documentos es su herramienta.
- [DECISIÓN] DEC-01 (filesystem = verdad). Descartado: editor de plantillas dentro del software.
- [CÓMO] FND-060 (lógica de plantillas) → FND-069 (CRUD en pantalla). Aceptación: agregar una plantilla al directorio y verla aparecer.
- [GUARDA] `test_documentos`: plantilla original byte-idéntica tras generar y tras un CRUD fallido.

**R-08 · Consentimiento y textos legales**
- [QUÉ] SHA del **cuerpo previo** al pie; texto editable en `DATOS/_PLANTILLAS/textos/` con aviso "texto modificado" y hash del texto en la bitácora; aviso de privacidad; vigencia y revocación.
- [POR QUÉ] P3 del texto + trazabilidad; evidencia: el SHA autoincluido anulaba su propia verificación, y los textos legales vivían incrustados en el código fuente.
- [DECISIÓN] DEC-01 (filesystem = verdad) · DEC-09 (degradación visible). Descartado: textos literales en Python.
- [CÓMO] FND-061 (lógica) → FND-069 (pantalla en Documentos). Aceptación: verificar el consentimiento recién generado → OK; modificar el .txt → aparece el aviso.
- [GUARDA] `test_consentimiento` (verificación post-generación + aviso de modificación).

**R-09 · Adjuntos con manifiesto y consentimiento de imagen**
- [QUÉ] PDF y fotos en `ADJUNTOS/` con SHA-256 por archivo en `MANIFIESTO.json`; foto solo con consentimiento de imagen vigente; verificación en 1 clic.
- [POR QUÉ] integridad clínica + P6.
- [DECISIÓN] P5 (un solo `sha256_archivo`) · DEC-06 (escritor único). Descartado: hashing en línea duplicado en varias pantallas.
- [CÓMO] FND-068 (verificación) → FND-069 (pantalla en Documentos). Aceptación: verificar y recibir OK/falta sin tecnicismos.
- [GUARDA] `test_adjuntos` (manifiesto vs disco).

**R-10 · Ficha (editar sin re-pedir)**
- [QUÉ] Un solo camino de edición por campo en `C-04`; la ficha es muestra-editable: lo que sabe el sistema aparece escrito.
- [POR QUÉ] P2 + P5 (captura doble = dos verdades).
- [DECISIÓN] DEC-08 (casos de uso profundos). Descartado: segundo formulario paralelo.
- [CÓMO] FND-065 (pantalla). Aceptación: R-03 cumplida.
- [GUARDA] `test_pantalla_ficha` (unicidad de edición por campo).

**R-11 · Calendario (eligiendo, no tecleando)**
- [QUÉ] elegir fecha a 1 clic o 1 Enter en **toda** casilla de fecha del sistema (no solo el registro): ventana con **año editable, mes navegable y rejilla de 28-31 días**; teclado y ratón dan **exactamente el mismo resultado**; sin fechas futuras donde el workflow lo prohíbe (FUM). El parser único acepta además lo que escribe la persona (`1999 02 01`, puntos, `01-ENE-1999`).
- [POR QUÉ] P2/W-01; evidencia del dueño (2026-10-23): «`1999 02 01` fue rechazada» y ningún campo tenía calendario — la promesa de elegir con ratón existía en la ley desde v1 y **nunca se construyó**.
- [DECISIÓN] P8 (interfaz profunda) · DEC-36 (lo que se escribe, se facilita con calendario); el componente vive en `app::F-3` y lo consumen todas las pantallas.
- [CÓMO] FND-041 (el registro ya acepta la fecha) → FND-162 (componente calendario + botón en toda casilla de fecha; formatos de persona en `B-3`). Aceptación: misma fecha capturada con teclado y con ratón; la FUM nunca ofrece mañana.
- [GUARDA] `test_calendario_campos` (toda spec con fecha ⇒ calendario; elegir día ⇒ ISO; año y mes navegables; FUM sin futuro) + `test_formatos_fecha` (los formatos de las personas se aceptan).

**R-12 · Respaldos y drill (el P0 humano)**
- [QUÉ] `respaldar / verificar / drill(→temporal) / restaurar_en`; **el drill jamás toca el parque vivo por construcción**; restauración atómica (temporal + swap); recordatorio de respaldo pendiente en C-01; **dos destinos**: la carpeta que el dueño elige (ZIP completo **legible a propósito** — una clave olvidada costaría más datos que un USB perdido; consejo operativo: guardar el USB dentro del consultorio) y, **opcional**, el **perfil ligero** por correo (JSON + bitácora + manifiesto comprimidos en ZIP deflate, **0 binarios** = lo menos pesado posible) hacia la casilla configurada una sola vez (R-44), **sellado con la PSK** (flujo HMAC-SHA256 del syncpack) y con cola de reintento cuando no hay internet.
- [POR QUÉ] evidencia: un drill con parámetro por defecto restauró sobre el parque vivo en un ensayo previo y estuvo a punto de costar los datos del consultorio.
- [DECISIÓN] DEC-05 (conceptos separados = funciones separadas: `restaurar_en` ≠ `restaurar_en_sitio`) · DEC-09 (degradación visible: el correo fallido queda en cola con aviso, nunca bloquea el respaldo local). Descartado: una función con parámetro opcional de default destructivo; mandar el ZIP completo con binarios por correo (peso y límites SMTP); mandarlo sin sellar (datos clínicos salen del consultorio sin protección).
- [CÓMO] FND-050 (lógica) → FND-054 (perfil ligero sellado por correo en `S-5`) → FND-055 (diálogo C-08) → FND-066 (recordatorio en Home) → FND-084 (botón en C-13). Aceptación: correr el drill y ver los datos intactos; con internet, el correo ligero llega sellado; sin internet, queda en cola sin bloquear.
- [GUARDA] `test_drill` con sentinel (falla si el drill toca el parque) + `test_respaldo` + `test_correo_ligero` (sellado ⇄ PSK; 0 binarios; cola sin red) + `test_pantalla_respaldo`.

**R-13 · Sistema (Admin)**
- [QUÉ] RBAC con **los 4 roles que decreta DEC-35** (`ADMIN` todo · `MEDICO` clínica · `ENFERMERA` admisión+controles+laboratorio · `AUDITOR` solo lectura): la matriz **se siembra sola** en la primera apertura (R-49), es editable a mano en `DATOS/PERMISOS.json`, la lista de roles **nunca está vacía** y el alta valida el rol **aunque la matriz esté vacía**; en Personas, el **ciclo de vida completo de la cuenta**: además del alta, **editar** (nombre, cédula), **cambiar de rol** y **dar de baja** — la baja solo cierra el acceso (retira el archivo de `USUARIOS/` con rastro en el journal) y **nunca toca expedientes**; con **al menos 1 dueño siempre** (no se puede dejar al equipo sin dueño); **el alta rechaza un nombre de usuario ya existente con error visible** (para cambiar datos está el ciclo de vida, no una segunda alta). Verificación de bitácora en 1 clic; fusiones con rastro; export/import; panel de sync; alta y edición de dispositivos (`DATOS/CONFIG/DISPOSITIVOS.json`, R-34); drill como botón — todo desde `C-13` con su sección **Personas** primero.
- [POR QUÉ] operar el consultorio sin consola ni código (P3/P4); evidencia: en equipo nuevo la lista de roles salió vacía porque nadie sembraba la matriz (primera corrida real, 2026-10-22), y el dueño quedó con una cuenta huérfana imposible de editar o dar de baja por la interfaz (2026-10-23).
- [DECISIÓN] P3/P4 · DEC-35 (matriz por defecto sembrada) · DEC-08 (casos de uso profundos). Descartado: motor de perfiles; ajustes por consola; 3 roles cuando la matriz tiene 4.
- [CÓMO] FND-013 (bitácora) → FND-082 (permisos y sesión) → FND-150 (siembra de la matriz y validación siempre) → FND-084 (pantalla Admin) → FND-126 (sección Dispositivos) → FND-152 (sección Personas primero) → FND-174/FND-175 (editar, cambiar rol y dar de baja con rastro). Aceptación: el dueño verifica la bitácora en 1 clic y encuentra la matriz sin huecos y con los 4 roles; puede editar y dar de baja la cuenta huérfana sin tocar ningún expediente.
- [GUARDA] `test_permisos` (matriz sin huecos) + `test_primer_uso` (instalación nueva ⇒ matriz con los 4 roles; rol inventado ⇒ error) + `test_cuentas_vida` (editar/rol/baja con rastro · nunca 0 dueños · expedientes intactos) + `test_bitacora` + `test_admin`.

**R-14 · Controles prenatales (C-16)**
- [QUÉ] `C-16` con **exactamente 10 campos**: 1 fecha · 2 peso · 3 PA sistólica · 4 PA diastólica · 5 altura uterina · 6 frecuencia cardiaca fetal · 7 presentación · 8 proteinuria · 9 edema · 10 síntoma (**texto libre**: el refiere de la paciente, no es lista cerrada — DEC-30 lista solo campos cerrados y el síntoma no está). **Exactamente 9 banderas** de alarma: dolor de cabeza intenso · epigastralgia · visión borrosa · hinchazón súbita de cara o manos · sangrado genital · disnea · fiebre · contracciones · movimiento fetal disminuido — **cada bandera con su explicación en palabras humanas** (catálogo `BANDERAS`, R-50). Guardar en ≤5 toques; **guardar nunca bloquea** (valor fuera de banda = confirmación, no rechazo); alertas **después** de que el control quedó escrito.
- [POR QUÉ] P2 + confirmar-nunca-bloquear; evidencia: la validación de rangos estaba copiada dentro de la pantalla.
- [DECISIÓN] DEC-08 (la UI solo confirma). Descartado: validación clínica en la pantalla.
- [CÓMO] FND-031 (caso de uso) → FND-042 (pantalla). Aceptación: peso 62 / TA 110-70 → "Control registrado ✓"; valor fuera de banda → pregunta, no regaña.
- [GUARDA] `test_control` (alerta solo si el control quedó escrito) + `test_pantalla_controles` (conteo de 10 campos y 9 banderas).

**R-15 · Signos vitales, alertas de laboratorio y preeclampsia**
- [QUÉ] evaluación de signos vitales y laboratorio **por tablas firmadas del médico** con perfil embarazada; qSOFA/NEWS solo con tabla firmada; los valores de laboratorio viven en la historia (`C-18`) y en el último control (`C-16`).
- [POR QUÉ] P6; evidencia: los umbrales se modificaban editando el código fuente, y una excepción de perfil vivía incrustada en la interfaz.
- [DECISIÓN] P6 · DEC-01 (filesystem = verdad). Descartado: umbrales en código Python.
- [CÓMO] FND-022 (tablas como dato) + FND-076 (catálogos firmables). Aceptación: las cifras que firma el médico son las que deciden.
- [GUARDA] `test_tablas_clinicas` (0 literales clínicos duros).

**R-16 · Banderas rojas, tarjeta roja, anti-D y traslado**
- [QUÉ] bandera roja → 1 alerta crítica con dedupe; tarjeta roja a 1 clic; recordatorio de profilaxis anti-D para paciente Rh− sin dosis registrada (las dosis se registran en la historia; el catálogo está firmado; solo informa); hoja de traslado de 1 página con datos separados del formato.
- [POR QUÉ] clínica de apoyo; evidencia: el resumen y la hoja de traslado duplicaron el mismo formateo y divergieron.
- [DECISIÓN] P5 · DEC-01 (filesystem = verdad). Descartado: formateo duplicado y umbrales incrustados.
- [CÓMO] FND-067 (alertas) + FND-076 (tarjeta roja, anti-D y traslado). Aceptación: ver el riesgo sin buscar; el anti-D no se olvida.
- [GUARDA] `test_tarjeta_roja` (alerta crítica, anti-D y paridad del texto del bloque 1.b).

**R-17 · Historia clínica NOM-004 A–M (estructurada)**
- [QUÉ] esquema declarativo, tri-state (`"" = sin investigar` ≠ `"no"`), notas por `id`, versiones al editar, progreso auditable, render por dispatch de tipos, bloque 1.b en una sola función.
- [POR QUÉ] alcance constitucional (bloques A–M de la historia); evidencia: las notas se indexaban por posición (al reordenar se corrompían) y el render alcanzó complejidad cicломática 42.
- [DECISIÓN] P5 · DEC-07 (vistas derivadas con test). Descartado: render imperativo monolítico.
- [CÓMO] FND-064 (estructura y render) → FND-087 (pantalla C-18). Aceptación: reordenar notas no cambia nada mal; el % de progreso refleja lo llenado.
- [GUARDA] `test_historia` (reordenar ⇒ 0 diffs) + `test_esquemas_parity`.

**R-18 · Diálogo NOM-004 (fuente única con R-17)**
- [QUÉ] el diálogo `C-19` **se prellena** de `HISTORIA.json`; pide solo lo faltante; cero captura doble.
- [POR QUÉ] evidencia: dos historias paralelas que llenar.
- [DECISIÓN] P5 (una sola fuente) · DEC-08 (casos de uso profundos). Descartado: segundo editor independiente.
- [CÓMO] FND-073. Aceptación: abrir NOM-004 y encontrar ya lleno lo que se sabe.
- [GUARDA] `test_pantalla_nom004`: 0 campos conocidos re-pedidos.

**R-19 · Calculadoras y prioridad de workflow**
- [QUÉ] **exactamente 18 calculadoras** (lista completa y cerrada en Anexo E) embebidas; prioridad acoplada al motivo mediante la tabla `MOTIVO→CÁLCULO` del catálogo firmable; perfil embarazada persistido en el episodio; paridad catálogo↔código; rangos de alerta no bloqueantes en catálogo firmable.
- [POR QUÉ] P6 + evidencia: los umbrales vivían en el código y la prioridad de calculadoras no estaba acoplada al motivo de consulta.
- [DECISIÓN] P6 · DEC-08 (casos de uso profundos). Descartado: cifras desfasadas entre pantallas.
- [CÓMO] FND-074 (lógica y catálogo) → FND-075 (pantalla C-06). Aceptación: abrir una calculadora con el último control precargado.
- [GUARDA] `test_calculadoras` (paridad catálogo↔código y prefill).

**R-20 · Consulta guiada, tamizajes, puerperio, CIE-10, curvas**
- [QUÉ] en `C-07`: F6 + chips ordenan sin mandar (nunca ocultan); tamizajes/OGTT/anemia por trimestre con recordatorio; puerperio 42 días + PHQ-9; CIE-10 en combobox (`DATOS/CATALOGOS/CIE10.json`); indicador de peso fetal en banda (sin diagnóstico); al guardar un control en C-16 queda 1 acción para anexar evolución en la historia.
- [POR QUÉ] carga cognitiva (pedido del dueño: restar carga) + P6 en todo.
- [DECISIÓN] P6 (catálogo firmable) · P2 (ordenar sin mandar). Descartado: guías duras en código; interpretación automática del peso fetal.
- [CÓMO] FND-076 (catálogos) → FND-077 (pantalla C-07). Aceptación: elegir "dolor abdominal" y ver ordenado lo que se revisa; tamizajes pendientes a la vista.
- [GUARDA] `test_catalogos` (0 umbrales sin firma) + `test_pantalla_apoyo`.

**R-21 · Gráficos honestos y línea de tiempo**
- [QUÉ] hueco = corte de línea (nunca tendencia falsa); estados vacíos accionables; `C-17` **lee, nunca escribe**; línea de tiempo = fold de fuentes con hitos de lectura (sin micro-eventos).
- [POR QUÉ] evidencia: un gráfico que conectó a través de un hueco mostró una tendencia falsa; la línea de tiempo como tabla de eventos espejo crea un segundo estado.
- [DECISIÓN] DEC-03 (fold) · P8 (errores definidos fuera de existencia: el hueco es un corte, no una suposición). Descartado: tabla de eventos espejo.
- [CÓMO] FND-078 (gráfica C-17) → FND-079 (timeline) → FND-088 (pantalla C-22). Aceptación: la gráfica corta donde no hay datos.
- [GUARDA] `test_ondas` (corte de huecos) + `test_timeline` (== fold).

**R-22 · Búsqueda profunda en historia/evoluciones**
- [QUÉ] buscar dentro de historia y evoluciones con carga única por ciclo, **sin índice que no sea fold verificado**.
- [POR QUÉ] P3; evidencia: un índice manual de notas se vetó dos veces por crear un segundo estado.
- [DECISIÓN] DEC-03 (fold con test). Descartado: caché persistente de notas.
- [CÓMO] FND-062 (extensión de la búsqueda). Aceptación: encontrar una palabra en evoluciones viejas.
- [GUARDA] `test_busqueda_fold` (contador de lecturas por ciclo).

**R-23 · Export anonimizado (MD y CSV)**
- [QUÉ] **misma puerta anti-reidentificación para `.md` y `.csv`**; `csv.writer`; ID estable SHA+sal; export de listados sin rutas locales.
- [POR QUÉ] evidencia: la puerta cubrió solo al .md y el CSV salió con identidades; unir columnas sin escaping rompió el archivo.
- [DECISIÓN] P5 (una sola puerta) · DEC-09 (errores fall-fast: si la puerta falla, no se publica). Descartado: gate solo al .md.
- [CÓMO] FND-063 (lógica) → FND-084 (botón en Admin). Aceptación: el CSV abre limpio en hoja de cálculo sin nombres ni CURP.
- [GUARDA] `test_anonimo` (identificador en cualquier celda ⇒ el CSV no se publica).

**R-24 · Import CSV**
- [QUÉ] **dry-run por defecto**: resumen "se crearían N / existentes M / candidatos K / errores E" antes de cualquier escritura; clasificación por `CODIGOS_IMPORT = ("CREAR", "EXISTE", "CANDIDATO", "ERROR")` (nunca por mensaje).
- [POR QUÉ] evidencia: clasificar por fragmentos de mensajes de texto falló, y escribir sobre un CSV sucio cuesta datos.
- [DECISIÓN] DEC-08 (retorno tipado). Descartado: import directo sin resumen previo.
- [CÓMO] FND-080 (lógica dry-run) → FND-081 (diálogo C-12). Aceptación: ver el resumen completo antes de cualquier escritura.
- [GUARDA] `test_import_dryrun` (0 `"msg" in`) + `test_pantalla_import`.

**R-25 · Dictado offline (APARCADO)**
- [QUÉ] voz → borrador con revisión humana antes de persistir; 100 % sin red; sin motor local → degradación con aviso. **APARCADO: sin fila FND** hasta su trigger.
- [POR QUÉ] P1 absoluto: la voz no sale del consultorio.
- [DECISIÓN] DEC-09 (degradación visible). Descartado: dictado en la nube.
- [CÓMO] trigger: pedido explícito del Approver; al aprobarlo se añade su fila en una fase nueva; mientras tanto esta entrada queda APARCADA y fuera de los actas elementales con tarea asignada.
- [GUARDA] `test_dictado_offline` (0 red) — se crea ANTES de codificar, en la fila nueva.

**R-26 · Seguridad (PIN, usuarios, roles)**
- [QUÉ] auth por usuario con PBKDF2-HMAC-SHA256 (200 000 iteraciones, sal de 16 bytes) y **PIN de 6 caracteres como mínimo** — la regla se enseña en la pantalla antes del error, no después; PIN con **backoff persistente**: intentos 1–4 libres, 5.º → 30 s, 6.º → 60 s, 7.º en adelante → 120 s (tope); contador y próximo desbloqueo en `DATOS/CONFIG/SESION.json` (cerrar la app no lo reinicia); espera mostrada como cuenta regresiva con la ventana operativa (**sin `time.sleep` en UI**); lock de instancia `O_EXCL` liberado en `finally`. **Nadie puede quedar fuera de su propio equipo:** toda credencial olvidada se recupera por R-51 (código de un solo uso, restablecimiento por otro dueño, o respaldo de presencia física) — sin red y sin correo.
- [POR QUÉ] evidencia: una espera con `time.sleep` congelaba la ventana, y los intentos vivos en memoria se reiniciaban al cerrar la aplicación; evidencia del dueño (2026-10-23): creó una cuenta con un PIN que no iba a recordar y **quedó bloqueado de su propia instalación** — R-26 no contemplaba el olvido.
- [DECISIÓN] P8-d · DEC-22 (backoff persistente sin sleep en la UI) · DEC-37 (recuperación física, sin red). Descartado: castigo en memoria; espera congelando la ventana; recuperación por correo o preguntas secretas (P1).
- [CÓMO] FND-082 (lógica y sesión) → FND-083 (pantalla C-14) → FND-170/FND-171 (recuperación de PIN, R-51). Aceptación: fallar 5 veces → cuenta regresiva visible; reabrir no da intentos gratis; olvidar el PIN → se recupera con el código en 1 minuto.
- [GUARDA] `test_pin_backoff` (persistencia) + `test_pantalla_pin` + `test_recuperacion_pin` (código de un solo uso ⇒ PIN nuevo; código reusado ⇒ rechazado) + `grep -c 'time.sleep' app.py` = 0.

**R-27 · Sincronización y terminal celular (K)**
- [QUÉ] eventos append-only firmados con HMAC-SHA256 y **HLC** `(físico, contador, device_id)`; cadenas por nodo; **5 barreras verificadas por lote**: 1 firma HMAC · 2 secuencia por dispositivo sin huecos · 3 pertenencia a la PSK · 4 orden causal por paciente · 5 versión de esquema compatible; **PSK de 32 bytes** escrita por el dueño en ambos equipos (`DATOS/CONFIG/PSK.txt`); `syncpack` = paquete cifrado con flujo HMAC-SHA256 en modo contador y autenticación del paquete completo (solo stdlib) que incluye el **inventario de binarios** (`SHA-256 → ruta` de `ADJUNTOS/`): solo viajan los hashes faltantes, cero duplicados; reconstrucción por paciente con dirty-set (1 reconstrucción/paciente, 1 lectura de usuarios/lote); **el celular = terminal web del nodo** (reto-respuesta, catálogos servidos, cola diferida, **tarjeta prioritaria de lectura** de la paciente en contexto, R-39) — requisito de la Fase 8, no propuesta.
- [POR QUÉ] P1 (LAN autorizada entre equipos del consultorio); evidencia: la reconstrucción evento a evento multiplicó las lecturas de usuarios por lote.
- [DECISIÓN] DEC-03 (eventos como verdad) · DEC-08 (reconstrucción por paciente) · DEC-21 (celular = terminal web). Descartado: sync como remiendo posterior; celular como nodo con estado propio.
- [CÓMO] FND-032 (esquema de eventos) → FND-084 (panel en Admin) → Fase 8 ⛔ FND-090/091/092 (Approver + hardware). Aceptación: **exactamente 8 escenarios sin eventos perdidos**: (1) ida y vuelta simple · (2) ambos nodos editan al mismo paciente · (3) nodo apagado con cola y reconexión · (4) paquete con firma inválida → rechazo total · (5) reconstrucción en nodo vacío · (6) colisión de HLC del mismo dispositivo con desempate determinista · (7) transferencia por USB sin red · (8) binario presente en A y ausente en B ⇒ B lo recibe 1 sola vez por hash.
- [GUARDA] `test_eventos` · `test_sync_escenarios` (los 8 escenarios) · contadores F8 (1 reconstrucción/paciente, 1 lectura usuarios/lote).

**R-28 · Operación del consultorio (L)**
- [QUÉ] copiar la carpeta = instalar; **requisito de máquina: Python 3.8+ con tkinter**, que `Iniciar.sh`/`Iniciar.bat` verifican (`python3 -c "import tkinter"`) y, si falta, imprimen una instrucción accionable y salen ≠0 (nunca falla muda); actualización = reemplazar **solo artefactos de producto** (`nucleo.py`, `app.py`, `VERSION`, `Iniciar.sh`, `Iniciar.bat`, `icono.png`, `tools/`, `pruebas/`, `CATALOGOS_BASE/`), nunca `DATOS/`, con verificación de versión y rollback; `VERSION` de una línea en la raíz; ícono PNG 256×256 escrito con stdlib; distribución = copia de carpeta por USB (sin repositorios ni servicios externos, P1).
- [POR QUÉ] evidencia: una actualización sin probar desde el primer release convirtió el "actualizar después" en deuda que puso los datos en riesgo.
- [DECISIÓN] DEC-10 (operación = requisito de v1). Descartado: ritual documentado al final.
- [CÓMO] FND-085 (lógica de actualización). Aceptación: actualizar con datos presentes → datos intactos.
- [GUARDA] `test_actualizacion` (datos intactos ante una actualización y ante un fallo a mitad).

**R-29 · Gobernanza (M)**
- [QUÉ] 1 entrada = 1 salida · este acta como única ley con micro-formato · compuerta única con lista versionada dentro · control de decisiones (matriz + trigger) para todo cambio de ley.
- [POR QUÉ] evidencia: promesas de diseño sin trigger ni guarda se enunciaron y nunca se construyeron.
- [DECISIÓN] DEC-16 (gate y lint) · DEC-20 (micro-formato). Descartado: promesas sin guarda.
- [CÓMO] FND-002 (lint del acta) → FND-003 (compuerta). Aceptación: `python3 tools/compuerta.py` = un comando = la red completa.
- [GUARDA] lint L1–L12 (§4.9) + compuerta.

**R-30 · Expediente de ultrasonido (estudio importable, diccionario de ítems)**
- [QUÉ] 1 estudio = `DATOS/PACIENTES/…/<uuid>/ULTRASONIDO/<estudio_id>.json` con: metadatos (paciente, examen, sonda, feto A–D, LMP/EDD/EG tal como vienen), mediciones (ítem, valor, unidad, feto, lateridad, autor de tabla, EG, EDD, percentil o z), trazos Doppler, cuantificaciones 3D/4D, checklist de anatomía y reporte; los ítems sin código en el catálogo se conservan en `sin_mapear[]` (nunca se descartan); códigos y vasos en `CATALOGOS/US_ITEMS.json` y `US_VASOS.json` con estado borrador→firmado; los valores importados se **muestran**, no se recalculan (importar un dato no crea calculadoras: el Anexo E solo crece por enmienda).
- [POR QUÉ] P6 + P3; evidencia: el Voluson E8 entrega decenas de parámetros que cambian por versión de software; un esquema fijo perdería datos y obligaría a una enmienda por cada herramienta nueva.
- [DECISIÓN] DEC-26 (dispositivo = dato; lo nuevo es fila) · DEC-03 (estudio = fold de lo recibido). Descartado: columnas fijas por cada medición.
- [CÓMO] FND-101 (parseo y catálogo) → FND-104 (pantallas C-15/C-20). Aceptación: importar un estudio con un ítem jamás visto lo muestra y el catálogo lista la fila a firmar.
- [GUARDA] `test_us_diccionario` (ítem desconocido ⇒ fila nueva sin tocar código; paridad catálogo↔parser).

**R-31 · Imágenes de ultrasonido: originales, deduplicadas, visibles**
- [QUÉ] binarios en `ADJUNTOS/US/<estudio_id>/` byte-idénticos con nombre = SHA-256 (mismo archivo ⇒ 1 copia), entrada en `MANIFIESTO.json`, consentimiento de imagen vigente heredado de R-09; preview derivada (`fold`, BMP/PGM/PNG) con carga perezosa; `.4dv` propietario se guarda sellado como adjunto y jamás se parsea.
- [POR QUÉ] integridad clínica + P3 + P5; evidencia: sin dedup cada estudio duplica megabytes y el manifiesto crece sin cota; tkinter no decodifica JPEG.
- [DECISIÓN] DEC-23 (binario abierto: estándar = fuente; derivado = fold con test) · DEC-06 (escritor único). Descartado: convertir el original (pierde fidelidad) y guardar la copia sin original.
- [CÓMO] FND-103 (`guardar_adjunto`) → previews en FND-104. Aceptación: subir el mismo archivo dos veces ⇒ 1 copia; sin consentimiento ⇒ rechazo visible.
- [GUARDA] `test_adjuntos` (hereda R-09) + `test_us_dedup` (SHA único) + `test_preview` (preview == fold del original).

**R-32 · Ingesta del Voluson: un solo camino, dos puertos**
- [QUÉ] 1 única puerta `nucleo::S-4::ingresar_estudio(ctx, origen, payloads)` con `ORIGENES_INGESTA = ("usb", "dicom")`: (a) USB — DICOMDIR/DICOM/JPEG/BMP/AVI/4dv desde memoria; (b) red — Storage SCP stdlib que acepta US Image, US Multi-frame, Secondary Capture y Comprehensive SR (TID 5000), `Explicit/Implicit VR Little Endian`, PDU ≤28 872, `ISO_IR 100`, tags privados conservados; SR ⇒ R-30 y binarios ⇒ R-31; cola de recepción con estado y temporizador (DEC-22); cero nube (P1: Tricefy y servicios GE quedan fuera).
- [POR QUÉ] P1 + §4.7.8 (doble captura prohibida); evidencia: dos flujos por origen = 2.ª copia del mismo acto.
- [DECISIÓN] DEC-24 (pipeline único agnóstico del origen) · DEC-02 (stdlib: `socket`/`struct` solo en `S-4`). Descartado: parser por marca de equipo; librería DICOM externa.
- [CÓMO] FND-101 → FND-102 → FND-104. Aceptación: el mismo estudio llegado por USB y por red ⇒ JSON byte idéntico.
- [GUARDA] `test_ingest` (roundtrip byte idéntico + SR plegado) + ratchet `grep -c 'import socket' app.py` = 0.

**R-33 · Eficiencia de binarios medida (fitness F15–F18)**
- [QUÉ] 4 umbrales nuevos en §4.8 con demo rojo/verde en la compuerta: **F15** ingest de 100 MB ≤30 s (USB) y ≤60 s (red) · **F16** manifiesto de 2 000 adjuntos verificado ≤2 s · **F17** respaldo incremental de 1 000 archivos (500 MB) ≤60 s · **F18** vista derivada ≤400 ms con 100 000 eventos (checkpoint ≥10 000).
- [POR QUÉ] §4.10 (no descubrir el rendimiento en producción); evidencia: F4–F7 miden solo texto y ningún umbral cubre megabytes.
- [DECISIÓN] DEC-25 (fold con checkpoint: misma verdad, sin recomputar desde cero) · DEC-16 (salida de comando). Descartado: caché de negocio persistente; medir en producción.
- [CÓMO] FND-100 (fitness en la compuerta) → FND-106 (checkpoint del fold). Aceptación: `--demo F15..F18` → exit ≠0 y la gate completa → 0.
- [GUARDA] 4 demos + `test_fold_checkpoint` (snapshot == fold exacto).

**R-34 · Extensibilidad por diccionario (nada futuro obliga a integración)**
- [QUÉ] toda variante futura es fila, no código: ítems/vasos/modos ⇒ catálogos `US_*` firmados · equipos ⇒ `DATOS/CONFIG/DISPOSITIVOS.json` (AE Title, IP, puerto, ruta USB: alta de otro equipo = 1 fila) · SOPs y formatos aceptados ⇒ tabla dentro de `S-4` · pantallas nuevas ⇒ C-21 sigue reservada · aparcados (R-25 dictado, HL7/FHIR, agenda, MEWS) se activan solo con spec por §4.6, sin rediseño.
- [POR QUÉ] P6 + antipatrónes 6 y 7; evidencia: históricamente los umbrales y las variantes nacieron como `if` en el código.
- [DECISIÓN] DEC-26 (dispositivo y norma son datos) · DEC-14 (fuente única). Descartado: `if` por modelo de equipo.
- [CÓMO] FND-101 + FND-105 (alta de dispositivos). Aceptación: dar de alta un equipo ajeno sin tocar `.py`.
- [GUARDA] `test_us_diccionario` + `test_dispositivos` (alta/edición solo con fila).

**R-35 · Parto, recién nacido y egreso (el episodio completo)**
- [QUÉ] bloque `PARTO` en `EPISODIO.json`: fecha/hora, vía (espontánea, instrumentada, cesárea), duración del trabajo y del parto, complicaciones maternas/fetales, número de producto(s) nacido(s), y por cada RN: peso, talla, Apgar 1 y 5 min, estado al alta (alojamiento conjunto / UCIN / traslado); egreso materno con fecha, indicaciones y próxima revisión; vínculo `rn_ids` (UUID del expediente del RN si se crea con R-02).
- [POR QUÉ] alcance de maternidad; evidencia: sin parto registrado el expediente corta el arco embarazo→parto→puerperio, y Apgar/Ballard hoy solo existen como calculadoras sin que el nacimiento quede como dato fechado.
- [DECISIÓN] DEC-06 (escritor único) · DEC-08 (casos de uso: `registrar_parto`). Descartado: el parto como texto libre de evolución.
- [CÓMO] FND-113 (lógica) → FND-120 (bloque en C-10). Aceptación: registrar un parto con Apgar 8/9 queda en el episodio y en la línea de tiempo.
- [GUARDA] `test_parto` (campos obligatorios, vínculo RN y error visible si falta la vía).

**R-36 · Notas clínicas con autoría y firma + interconsulta/referencia (NOM-004)**
- [QUÉ] toda nota (evolución, interconsulta, referencia, urgencias, hospitalización) lleva fecha/hora, autor = usuario en sesión con `cedula_profesional` de `USUARIOS/` y estado `borrador|firmado`; **firmar** cierra la nota (inmutable; editar ⇒ versión nueva, la original no cambia); tipos de nota en `CATALOGOS/NOTAS.json`; interconsulta con estado `pendiente|atendida` cerrada por la nota del especialista; referencia con emisor, receptor y resumen (motivo, impresión, terapéutica) — NOM-004-SSA3-2012 §5.10, §6.2, §6.3 y §6.4.
- [POR QUÉ] norma vigente + práctica: una nota sin firma ni autor no sirve como respaldo, y una interconsulta impresa que nadie sigue se pierde.
- [DECISIÓN] DEC-03 (eventos como verdad del versionado) · DEC-06 (escritor único). Descartado: firma como texto libre editable; interconsulta como PDF sin estado.
- [CÓMO] FND-110 (notas) → FND-111 (interconsulta/referencia) → FND-118 (C-23). Aceptación: firmar una evolución la vuelve inmutable con autor y cédula impresos; la interconsulta pendiente aparece en pendientes (R-41).
- [GUARDA] `test_notas` (firmada inmutable + autor/cédula) + `test_interconsulta` (estado tipado, sin mensajes que clasifiquen).

**R-37 · Problemas activos, alergias visibles y medicamentos actuales**
- [QUÉ] (a) `problemas_activos` = **fold** de los diagnósticos codificados de las notas con estado `activo|resuelto`; (b) alergias como campo estructurado de la historia con **banda visible en toda pantalla con paciente en contexto**; (c) medicamentos actuales (fármaco, vía, dosis, periodicidad) capturados a mano y solo informativos; al agregar un medicamento que coincide con una alergia registrada ⇒ aviso no bloqueante que nombra la alergia.
- [POR QUÉ] seguridad clínica básica de todo expediente y NOM-004 §6.1.4 (diagnósticos/problemas); evidencia: la alergia es el dato que se consulta antes de cualquier indicación y hoy vive enterrada en la historia.
- [DECISIÓN] DEC-03 (problemas = fold, cero índice espejo) · P6 (el aviso informa, nunca bloquea). Descartado: lista de problemas editable a mano (segundo estado); bloqueo de indicación (fuera: prescripción automática).
- [CÓMO] FND-112 → banda en FND-117 (tarjeta prioritaria). Aceptación: abrir cualquier pantalla con paciente alérgica ⇒ banda visible; agregar penicilina ⇒ aviso con la alergia, sin regañar.
- [GUARDA] `test_problemas_alergias` (problemas == fold de notas; banda presente; aviso no bloqueante).

**R-38 · Laboratorio estructurado, tendencias y panel de estado de salud (C-21)**
- [QUÉ] resultados de laboratorio por paciente con fecha, analito, valor, unidad y banda de `CATALOGOS/LAB_RANGOS.json` (estado borrador→firmado; rangos por trimestre cuando aplica). **Analitos mínimos decretados:** glucosa (ayuno/2 h/75 g) · insulina en ayuno · hemoglobina · hematocrito · plaquetas · orina general (proteinuria y leucocituria) · bilirrubina total y directa · LDH · ácido úrico · creatinina · triglicéridos · colesterol total, HDL y LDL — más cualquier analito que el médico firme. Cálculos aplicables: criterios OGTT 75 g (Anexo E #14) y **HOMA-IR (Anexo E #18)**. `C-21` = panel de estado con semáforo `normal|alerta|crítica|sin dato` por analito y sus cálculos (fold contra catálogo, DEC-27); `C-17` añade tendencias (curva de tolerancia a la glucosa, hemoglobina, química sanguínea) con el mismo corte de huecos; **el panel informa el estado de salud a partir de los datos integrados y nunca dictamina**.
- [POR QUÉ] pedido explícito del médico (mostrar el estado de salud con los cálculos en pantalla); evidencia: hoy los resultados son texto en historia: no se comparan con rangos ni se grafican en el tiempo.
- [DECISIÓN] DEC-27 (semáforo informativo = fold) · P6 (rangos firmados, 0 umbrales en código) · P5 (`evaluar_banda` de `B-3`, una sola casa). Descartado: rangos en la interfaz; dictamen automático (fuera inviolable).
- [CÓMO] FND-108 (catálogos) → FND-109 (`B-12`) → FND-117 (C-21) → FND-119 (tendencias). Aceptación: glucosa en ayuno 95 ⇒ verde con su rango; sin resultado ⇒ gris "sin resultado"; HOMA-IR con sus 2 entradas ⇒ índice con banda.
- [GUARDA] `test_lab_rangos` (0 umbrales sin firma) + `test_panel_salud` (panel == fold; `sin dato` = gris; la salida no contiene diagnósticos) + `test_ondas` (hueco = corte de la curva).

**R-39 · Tarjeta prioritaria de la visita (vitales y datos de la paciente primero)**
- [QUÉ] **regla por bandera `en_contexto`:** toda pantalla con paciente en contexto muestra la **tarjeta prioritaria** como primer bloque y sin desplazar (hoy: C-04, C-05, C-15, C-16, C-17, C-18, C-21, C-22, C-23 — la lista crece por la bandera, nunca por enumeración manual): fecha de la visita y últimos signos vitales (peso, PA sistólica/diastólica, FC, FC fetal, presentación, síntoma — los 10 campos de R-14), EG actual derivada, banda de alergias (R-37), problemas activos (R-37) y estado del episodio; componente con `SPEC` declarativo, igual que el calendario de R-11; en la terminal Android se sirve como solo lectura (R-27).
- [POR QUÉ] pedido literal del médico (los datos de la visita y los vitales son prioritarios) + P2 (el contexto antes de la decisión) y P4 (registrar ≤2 pasos no se complica).
- [DECISIÓN] DEC-08 (la UI solo mapea) · DEC-27 (semáforo informativo). Descartado: pantalla separada que obliga a navegar; volver a pedir los vitales; enumerar pantallas requisito por requisito (cada pantalla nueva obligaría una enmienda).
- [CÓMO] FND-117 (componente) + FND-123 (bandera `en_contexto` declarada en las specs). Aceptación: abrir C-16 y ver arriba los últimos vitales con su fecha antes de tocar nada.
- [GUARDA] `test_tarjeta_prioritaria` (toda pantalla con `en_contexto` ⇒ tarjeta como primer bloque; es fold de controles/historia; nunca pide datos).

**R-40 · Tamizajes, vacunación y hospitalizaciones con vencimiento**
- [QUÉ] catálogo `CATALOGOS/SEGUIMIENTO.json` (firmado) con: tamizajes ginecológicos (Papanicolaou/HPV, mamografía), serologías del embarazo con repetición (sífilis, VIH, hepatitis B) y su próximo vencimiento; vacunación en embarazo/puerperio (influenza, Tdap, puerperal) con fecha aplicada; hospitalizaciones/urgencias del embarazo como hitos fechados en la línea de tiempo (fechas, diagnóstico de ingreso/egreso, resumen en nota §7/§8 NOM-004). Vencido ⇒ recordatorio en C-07 y en pendientes (R-41); nunca bloquea.
- [POR QUÉ] seguimiento clínico real: lo no tamizado a tiempo se pierde; evidencia: R-20 cubre solo tamizajes obstétricos por trimestre.
- [DECISIÓN] P6 (catálogo firmado) · DEC-03 (hospitalizaciones = hitos del fold de notas). Descartado: fechas de vencimiento en código; módulo de vacunas independiente del expediente.
- [CÓMO] FND-114 (catálogo y lógica) → recordatorios en FND-118. Aceptación: sífilis tomada en semana 12 ⇒ recordatorio de repetición en semana 36.
- [GUARDA] `test_seguimiento` (vencimiento derivado del catálogo; 0 fechas duras en código).

**R-41 · Pendientes por paciente y próximo control derivado**
- [QUÉ] tarjeta de **pendientes de esta paciente** en C-23 (y su resumen en C-01): próximo control derivado del catálogo de controles por EG (si es derivable **nunca** se captura), notas en borrador, interconsultas pendientes, tamizajes vencidos (R-40) y firma pendiente — todo como **fold** de sus fuentes, con 1 clic a cada acción; **los recordatorios de Home (C-01) y los pendientes de C-23 son el mismo fold** (R-12 respaldo se suma como fila, jamás como copia).
- [POR QUÉ] pedido de "seguir": hoy los recordatorios son globales (C-01) y no responden ¿qué le falta a *esta* paciente?
- [DECISIÓN] DEC-03 (fold, cero estado espejo) · DEC-08 (casos de uso con 1 clic). Descartado: tabla de pendientes editable a mano.
- [CÓMO] FND-109 (fold de pendientes) + FND-116 (próximo control) → FND-118 (C-23). Aceptación: con una interconsulta sin cerrar, pendientes la muestra con su clic.
- [GUARDA] `test_panel_salud` (pendientes == fold de sus fuentes) + `test_proximo_control` (lo derivable ⇒ nunca se pide).

**R-42 · Expediente navegable: barra de pestañas, puerta única y estados vacíos**
- [QUÉ] abrir un paciente ⇒ **siempre C-04** (puerta del expediente); barra de pestañas **persistente y de orden fijo** `PESTANAS_EXPEDIENTE` en toda pantalla con paciente: Resumen (C-04) · Controles (C-16) · Historia (C-18) · Notas (C-23) · Estudios (C-15) · Gráficos (C-17) · Línea de tiempo (C-22) · Documentos (C-05); cambiar de pestaña conserva paciente, tarjeta (R-39) y estado visible; las pestañas son navegación **secundaria** (jamás acción primaria: ≤3 acciones de R-01 siguen mandando); toda pantalla sin datos muestra **estado vacío accionable con exactamente 1 acción** (naming de P2, hereda R-21); C-20 (ingesta) y C-13 (admin) quedan fuera de la barra: accesibles por chip secundario en C-01 y desde C-13.
- [POR QUÉ] P2 (1 pantalla = 1 decisión · un solo camino por acto); evidencia: 23 pantallas y 9 en contexto de paciente sin puerta ni orden decretados = cada pantalla nueva inventaría su propia entrada.
- [DECISIÓN] DEC-28 (barra única de orden fijo, puerta C-04) · DEC-08 (la UI solo mapea). Descartado: menú lateral variable; modales de navegación; enumerar la tarjeta requisito por requisito.
- [CÓMO] FND-123 (barra + bandera `en_contexto` + estados vacíos) → W-17 (FND-127). Aceptación: abrir paciente ⇒ C-04 con tarjeta; pestaña Notas ⇒ C-23 con la misma barra y tarjeta; sin notas ⇒ estado vacío con 1 acción.
- [GUARDA] `test_navegacion_exp` (orden fijo; `en_contexto` ⇒ tarjeta; vacío ⇒ 1 acción) + fitness **F21** (cambio de pestaña ≤100 ms con tarjeta persistente).

**R-43 · Cálculos entregados y enlazados con los datos (prefill y panel ↔ calculadora)**
- [QUÉ] C-06 abre con **prefill doble**: último control (ya R-19) y **últimos resultados** cuando la calculadora los usa (HOMA-IR con glucosa e insulina del mismo día; EG por biometría con la fecha del estudio de ultrasonido); desde C-21, cada cálculo del semáforo tiene **1 clic "ver cálculo"** que abre C-06 prellenado; un cálculo guardado se persiste como resultado con `origen ∈ ("capturado", "calculado")` y el panel lo grafica con su banda igual que un resultado de laboratorio; **el cálculo nunca vuelve a pedir lo que el expediente ya tiene** (cero captura doble).
- [POR QUÉ] pedido del médico (todo cálculo debe entregarse y verse en pantalla con el estado de salud) + P2/§4.7.8; evidencia: HOMA sin prefill obliga a re-capturar glucosa e insulina que ya están en el panel.
- [DECISIÓN] P5 (los datos viven en una sola casa y el cálculo los lee) · DEC-08 (casos de uso con retorno tipado). Descartado: calculadora aislada con entradas vacías; guardar el cálculo en una tabla aparte.
- [CÓMO] FND-124 (`prefill` + `origen`) → FND-125 (enlaces C-21↔C-06). Aceptación: con glucosa e insulina ya capturadas, HOMA-IR sale con 0 tecleos y su resultado aparece en C-21 con banda.
- [GUARDA] `test_calculadoras` (prefill desde laboratorio/US y 0 captura doble) + `test_pantalla_panel` (1 clic al cálculo) + `test_pantalla_calculadoras`.

**R-44 · Configuración única de instalación (cero hardcodeo de datos del consultorio)**
- [QUÉ] todo lo que cambia entre un consultorio y otro se configura **una sola vez** desde la sección Instalación de `C-13` y vive en `DATOS/CONFIG/INSTALACION.json`: nombre, dirección y responsable del centro; casilla de respaldo; cadencia del recordatorio de respaldo. Prohibido que `nucleo.py` o `app.py` contengan valores del consultorio (correos, teléfonos, nombres del personal, textos de impresión); usuarios, roles, dispositivos, PSK y plantillas ya son dato desde sus requisitos (R-13/R-26/R-34/R-05).
- [POR QUÉ] P6/DEC-09: si el teléfono del centro viviera en el código, habría que editar Python para cambiarlo y una actualización podría pisarlo; el usuario pide expresamente configurar una vez y que quede instaurado.
- [DECISIÓN] DEC-26 (fila, no código: los datos del consultorio son filas/JSON, nunca texto en Python) · DEC-09 (degradación visible: sin configuración la app avisa, no inventa valores). Descartado: valores fijos en el programa; `config.json` en la carpeta del producto (la actualización D-8 solo debe tocar artefactos de producto y debe dejar la configuración intacta).
- [CÓMO] FND-053 (almacén `INSTALACION.json`) → FND-084 y FND-126 (sección Instalación en C-13). Aceptación: cambiar la casilla y el teléfono del centro una sola vez y verlos reflejados en el recordatorio de Inicio y en el envío de respaldo.
- [GUARDA] `test_config_instalacion` (alta única, lectura por `leer`, íntegro tras un ciclo de producto) + `test_pantalla_admin` (sección Instalación en C-13).

**R-45 · Terminal de admisión (sesión de enfermera desde el teléfono)**
- [QUÉ] un **terminal `/celular`** con sesión propia de ENFERMERA (PIN con el mismo backoff de R-26) permite, en modo admisión: registrar paciente nuevo (alta completa sin pasar por el escritorio), capturar **vitales** del día y mandar un **resultado de laboratorio** al expediente; el alta de usuarios se hace en `C-13` y el terminal **nunca enumera cuentas** (no existe pantalla que liste usuarios); el teléfono no lleva el expediente: solo admisión (DEC-21). Pantalla nueva `C-24`; walkthrough **W-18**.
- [POR QUÉ] la enfermera admite en la puerta con el teléfono del consultorio; hoy el alta exigía el escritorio y el teléfono se quedaba sin uso. El usuario aprueba explícitamente el prototipo de teléfono.
- [DECISIÓN] DEC-21 (celular = terminal web; no lleva el expediente) · DEC-22 (backoff persistente reutilizado, sin `time.sleep`) · DEC-26 (los usuarios son filas). Descartado: enumerar usuarios en el teléfono (robo de identidad en pantalla); sesión con roles inventados (solo los roles de PERMISOS.json).
- [CÓMO] fase **7.8**: FND-130 (sesión de enfermera y modo admisión en `nucleo::N-1`/`B-4`) → FND-131 (alta de usuarios como caso de uso, ya con `crear_usuario`) → FND-132 (`app::F-22` C-24: login, alta, vitales, lab) → FND-133 (sección Usuarios en C-13) → FND-134 (W-18 + cierre **v1.4**). Aceptación: W-18 — desde el teléfono, crear la paciente de la DEMO, capturar TA/peso y un resultado; el escritorio ve el expediente completo y la lista de usuarios no aparece en el terminal.
- [GUARDA] `test_terminal_admision` · `test_alta_usuarios` · `test_pantalla_terminal` · `test_pantalla_usuarios` · W-18 (Libro VI).

**R-46 · Claridad y ayuda de toda la interfaz**
- [QUÉ] **cada pantalla explica su resumen, sus campos y sus acciones** en una fuente de ayuda integrada; un botón **Ayuda** en el encabezado abre la ayuda de la pantalla actual y la acompaña al navegar; **Inicio** muestra la *Guía de funciones* con todas las pantallas y su propósito; los botones usan etiquetas en palabras humanas (`etiqueta_accion`: «Probar respaldo», «Guardar instalación»); las acciones primarias son ≤3 (P2) con las secundarias separadas; los campos de lista cerrada se eligen (DEC-30) y el rol muestra los permisos que implica. Ningún texto visible lleva códigos de este acta, jerga técnica ni palabras que preocupan (DEC-29).
- [POR QUÉ] el usuario final es médico y enfermera: una ayuda críptica no ayuda y angustia (feedback del dueño, dos rondas de auditoría); sin guía integrada, las funciones existentes eran invisibles para quien no participó en la construcción.
- [DECISIÓN] DEC-29 (lenguaje del consultorio) · DEC-30 (selección, no escritura) · P2 (≤3 acciones, Enter avanza) · DEC-19 (el prototipo es descartable: la demo real del producto es la ventana de tkinter). **Frente a R-50:** donde esta entrada y R-50 difieran, **aplica R-50** (esta es la base; R-50 la refuerza con cribas de longitud, anti-eco de título y etiquetas sin vacío). Descartado: ayuda en archivos externos al producto; tooltips crípticos; mostrar la trazabilidad en pantalla.
- [CÓMO] FND-135: fuente `AYUDAS` por pantalla (resumen/campos/acciones) + botón Ayuda contextual + Guía de funciones en C-01 + `etiqueta_accion`.
- [GUARDA] `test_guia_ui` (cobertura 100 % de ayudas, acciones explicadas, sin códigos/jerga/angustia, mensajes de error sin rutas, **más las cribas reforzadas de R-50: resumen ≥60 sin eco del título, fragmentos ≥20, sin identificadores crudos, sin etiquetas «Campo»/«Valor»**) · `test_auditoria_ui` (contratos, minimalismo, cobertura de funciones en UI, flujo humano) · gate completa → 0.

**R-47 · Pruebas exploratorias automatizadas de equipo rojo y negro (no hardcodeadas)**
- [QUÉ] una batería de ataque automatizada que **genera sus propios insumos** con RNG sembrado y verifica **invariantes** de esta acta, sin un solo caso fijo. Clases de datos: **R1** fuzz de parsers (`parsear_dicom`, `plegar_sr`, `leer`, `parser_fecha`, `verificar_cadena` con bytes/JSON/fechas corruptos), **R2** ciclos aleatorios de operaciones sobre un expediente con invariantes (fold==disco, undo restaura, excepciones solo del conjunto legal), **R3** triangulación metamórfica (respaldar⇒restaurar idéntico, export md==csv, sellado creciente, 0 `{{}}` residual, dedup por hash), **R4** autenticación (secuencias interleaved de PIN entre cuentas, matrices mutadas), **R5** frontera (rutas `..`/symlink, ZIP slip y zip-bomb, doble proceso). Clases de interfaz: **N1** fuzz de campos de toda SPEC, **N2** navegación aleatoria de 500 pasos, **N3** sesión y catálogos desde la UI, **N4** mutación de los propios textos de ayuda contra `TestAyudaClara`. Cualquier excepción cruda hacia la persona, cuelgue >2 s o escritura fuera de `DATOS/` = hallazgo.
- [POR QUÉ] las suites de ejemplo confirman lo ya pensado; el ataque dirigido por invariantes encuentra vulnerabilidades, debilidades e inconsistencias que ningún tester manual imaginó.
- [DECISIÓN] DEC-31 (property con semilla, sin hardcode) · DEC-16 (gate con salida de comando) · P7 (gate antes que confianza). Descartado: fuzz sin semilla; entradas fijas; gate con resultados aleatorios; ejecutar exploración libre dentro de la puerta.
- [CÓMO] FND-136 construye `tools/equipo_rojo.py` (`--semilla`, `--clase R1…N4`, `--explorar`) con presupuesto por clase; la compuerta lo expone como `--check equipo_rojo` con semillas fijas; los hallazgos van al registro con semilla e invariante roto.
- [GUARDA] `python3 tools/equipo_rojo.py --semilla 42` → exit 0 · `python3 tools/compuerta.py --check equipo_rojo` → 0 · salida copiada.

**R-48 · Agenda de citas y recordatorios de continuidad (C-25)**
- [QUÉ] agenda del consultorio en `DATOS/AGENDA/CITAS.json` con crear/reprogramar/cancelar trazables: estado tipado `agendada|confirmada|atendida|cancelada`, todo cambio deja rastro y **cancelar nunca borra** (R-48 se apoya en el escritor único `D-1` y el undo `B-7`); la agenda es fold de ese archivo. Al crear una cita se propone la fecha del próximo control derivado con 1 clic (R-41 sigue viva: **cita ≠ próximo control derivado** — la cita agenda cuándo viene, el catálogo deriva cuándo debe venir, y el motor compara ambas para detectar la falta de cita). **Motor de recordatorios:** catálogo `DATOS/CATALOGOS/MENSAJES.json` firmado como única casa de mensajes (filas con `situacion`, `prioridad`, `ventana_antes_dias`, `ventana_despues_dias`, `caduca_si` y `plantilla` con sintaxis `{{marcador}}` de R-05); el motor personaliza con nombre, EG derivada (nunca capturada), signos de alarma de R-14 y unidad de `INSTALACION.json`. **El estado del mensaje no se guarda: se deduce** (DEC-33) — el software ofrece "espacios" disponibles, y un `recordatorio_entregado` (paciente, situación, canal, usuario, fecha) cubre el espacio; cualquiera que abra la Agenda ve la misma lista; sin entrega al cierre de la ventana ⇒ escalado visible; caduca solo cuando su fuente desaparece (control registrado, anti-D aplicada, cita atendida). **Gate de consentimiento** de mensajes (extiende R-08): sin autorización vigente solo hoja impresa. Pantalla **C-25** con chip en C-01: citas próximas por día + diálogo "Preparar recordatorios" (vista, no pantalla nueva) con el mensaje ya personalizado y botón Copiar/entregar. Sin recurrencia compleja (P8); sin envío automático (DEC-32); los mensajes **jamás** llevan valores de laboratorio, cifras de calculadoras ni diagnósticos: solo prioridad de acudir, con frase firmada cuando el semáforo lo exige ("su médico quiere verla pronto").
- [POR QUÉ] la mortalidad materna evitable se concentra en "detectó algo tarde → no acudió → llegó tarde"; el recordatorio mental del personal es lo que hoy se pierde; evidencia: R-41 responde ¿qué le falta a *esta* paciente?, pero no ¿a quién conviene avisar mañana?, y el personal rota entre turnos sin una lista compartida.
- [DECISIÓN] DEC-32 (mensaje preparado por el software, empujado por una persona) · DEC-33 (estado = fold de eventos; ventanas, prioridad y plantilla = catálogo firmado) · DEC-34 (una sola lista de pendientes) · P6 (todo umbral o texto clínico firmado) · DEC-03 (citas y entregas como verdad; agenda = fold). Descartado: envío automático por WhatsApp/SMS/correo al paciente (servicio externo: P1 y §4.7) · tabla de mensajes con casilla "enviado" editable a mano (segundo estado) · pantalla separada de recordatorios · catálogo paralelo de cuidados por EG · mensajes con valores de laboratorio o de calculadoras.
- [CÓMO] FND-140 (alivio de `M-1` + componente único de tarjeta prioritaria) → FND-141 (catálogo `MENSAJES.json`) → FND-142 (`B-13` agenda) → FND-143 (motor de recordatorios) → FND-144 (`F-23` C-25) → FND-145 (indicadores de continuidad) → FND-146 (cierre v1.5 y W-19). Aceptación: el jueves, en C-25, "Preparar recordatorios del lunes" lista a N pacientes con su mensaje personalizado (nombre y semana de embarazo); al entregar uno deja de estar disponible para cualquiera que abra; si nadie lo entrega y se cierra la ventana, aparece escalado; una paciente con control derivado vencido y sin cita aparece en "por recuperar".
- [GUARDA] `test_agenda` (crear/reprogramar/cancelar con rastro; cancelada sigue en el archivo; agenda == fold) + `test_mensajes_catalogo` (semilla presente; borrador no decide; ventanas tipadas; toda plantilla personaliza el nombre) + `test_mensajes_pendientes` (entregar ⇒ deja de estar disponible; anular ⇒ vuelve; ventana cerrada sin entrega ⇒ escalado; fuente desaparece ⇒ caduca; marcador irresoluto ⇒ error visible; 0 envío automático) + `test_pantalla_agenda` (diálogo con 1 acción primaria; mensajes sin `{{}}` residual; manejadores solo llaman casos de uso) + `test_indicadores_continuidad` (conteos == fold de entregas; el retorno se mide solo con evento de entrega).

**R-49 · Primer uso: el equipo recién estrenado se da de alta solo (C-14/C-13)**
- [QUÉ] al abrir el programa en una instalación con **0 usuarios**, la pantalla de Acceso ofrece **exactamente 1 acción** — «Crear al dueño» (su nombre, que será su usuario, y el PIN de al menos 6 caracteres escrito dos veces; **sin cédula**: el primer uso no pide papeles) — que siembra la matriz de permisos por defecto (DEC-35), crea la cuenta de dueño `ADMIN` y deja la sesión iniciada en Inicio; creado el primer dueño, el botón **desaparece para siempre**. Con 1 o más usuarios, Acceso es el login de siempre (PIN oculto, castigo por intentos, R-26). En C-13 la sección **Personas** va primero: alta de 4 campos (nombre, PIN siempre oculto, rol elegido entre los 4 nombres humanos de la matriz con sus permisos visibles, **cédula opcional** — la pide solo quien firará notas clínicas, R-36) y la lista de roles **nunca está vacía** (nace de `DATOS/PERMISOS.json`, R-13). El menú lateral sin sesión no ofrece administración, y con sesión de ENFERMERA tampoco (W-13). El PIN se escribe siempre oculto: la tarjeta del alta lo promete («nunca en claro»).
- [POR QUÉ] P2 (estado vacío con 1 acción; el software jamás deja a la persona sin salida) + evidencia: en la primera corrida real (2026-10-22) el dueño no pudo registrarse: el alta exigía sesión y la sesión exigía cuenta, y la lista de roles salió vacía porque la matriz no existía en una instalación nueva; W-13 exige además que ENFERMERA no vea C-13 y el menú no lo cumplía. **La cédula se omite en el primer uso** (dueño, 2026-10-23): no gatea ninguna función, las firmas de notas la exigen solo de quien firma (R-36), y en un equipo sin red no existe padrón contra el cual verificarla — la verificación real del profesional la hace el consultorio, persona a persona.
- [DECISIÓN] DEC-35 (matriz por defecto sembrada en la primera apertura: `ADMIN` todo · `MEDICO` clínica · `ENFERMERA` admisión+controles+laboratorio · `AUDITOR` solo lectura) · DEC-26 (la lista de roles nace del catálogo, nunca del código) · P2 (un solo camino: el alta del dueño vive en Acceso, no en un menú ni en el terminal). Descartado: cuenta dueña fija de fábrica (credencial conocida) · alta del dueño desde el terminal (R-45 la prohíbe) · varias bases de datos seleccionables (rompería respaldo, drill y sincronización; DEC-06) · contraseña alfanumérica en vez de PIN (R-26; solo por enmienda futura si el dueño la pide).
- [CÓMO] FND-150 (núcleo: siembra de matriz + `hay_usuarios` + validación de rol siempre) → FND-151 (C-14 estado «primera vez») → FND-152 (C-13 sección Personas primero) → FND-153 (menú lateral con sesión) → W-20. Aceptación: estrenar el programa ⇒ Acceso ofrece «Crear al dueño» ⇒ crear ⇒ queda dentro con sesión iniciada y el botón ya no aparece; en C-13 los 4 roles se ven con sus permisos y el PIN queda oculto; sin sesión el menú no ofrece administración; ENFERMERA no ve Sistema.
- [GUARDA] `test_primer_uso` (instalación nueva ⇒ matriz con los 4 roles; 0 usuarios ⇒ `hay_usuarios` False; alta ⇒ True; rol inventado ⇒ error visible) + `test_pantalla_primer_uso` (0 usuarios ⇒ exactamente 1 acción · PIN oculto · alta ⇒ sesión y sin botón · ≥1 usuarios ⇒ login) + `test_pantalla_personas` (sección Personas con 4 campos · roles visibles y no vacíos · PIN oculto · alta llama a `crear_usuario`) + `test_menu_sesion` (sin sesión ⇒ sin administración · ENFERMERA ⇒ sin Sistema · ADMIN ⇒ con Sistema).

**R-50 · Entrada y explicación legibles en toda la interfaz**
- [QUÉ] (a) **fechas:** toda casilla de fecha lleva **calendario** (componente en `app::F-3`: ventana con año editable, mes navegable y rejilla de 28-31 días; elegir un día ⇒ `YYYY-MM-DD`; teclado y ratón con el mismo resultado — el calendario de R-11 clavado por prueba en todas las pantallas, no solo en el registro) y el parser único acepta lo que escribe la persona: `1999 02 01`, `1999/02/01`, `1999.02.01`, `1.2.1999`, `01-02-1999`, `01-ENE-1999` e ISO clásico; (b) **listas:** todo catálogo que alimenta una casilla de opciones viene **sembrado en borrador** en una instalación nueva (`presentacion`, `proteinuria`, `edema`, `ESPECIALIDADES`, `SEGUIMIENTO`, `NOTAS`, `BANDERAS`) y se firma una vez en Sistema → Catálogos (P6 intacto: solo la lista firmada decide el valor); hasta firmar, la casilla muestra **estado vacío accionable** con el nombre del catálogo y la acción («firme presentacion en Sistema → Catálogos»), **nunca un combo mudo**; (c) **banderas:** cada una de las 9 banderas de R-14 muestra además de su nombre su **explicación en palabras humanas** desde el catálogo `BANDERAS` (borrador informa, la firma del médico la consolida); (d) **textos de TODAS las pantallas:** cada pantalla explica **qué es, para qué sirve y cómo se usa** en lenguaje del consultorio — resumen que no repite el título, campos que dicen qué contenido van, acciones que dicen qué pasa al pulsar; la etiqueta genérica «Campo» o «Valor» y el código crudo («A1») solos no sirven de guía; la criba de claridad (R-46) se refuerza con longitudes mínimas, anti-eco de título y etiquetas sin vacío.
- [POR QUÉ] cuatro capturas del dueño usando el producto real (2026-10-23): fecha `1999 02 01` rechazada en Registro; 4 casillas de opciones vacías en Control prenatal; banderas sin explicación («Epigastralgia» no le dice nada a quien no es médico); y la pantalla NOM-004 «no tengo ni 1 idea» — con el recordatorio del dueño de que **no es solo NOM: en general varias pantallas dan poca información y la que dan es críptica**. R-46 ya lo advertía: una ayuda críptica no ayuda y angustia.
- [DECISIÓN] DEC-36 (calendario en toda fecha; lista vacía ⇒ estado accionable con su firma; término técnico ⇒ explicación; pantalla ⇒ qué es/para qué/cómo) · R-11 se cumple de verdad (el widget existía en la ley, no en el código) · P6 (solo la lista firmada decide; el borrador informa) · DEC-29/30 con criba reforzada. Descartado: precargar combos sin firma (rompería P6 y T2) · calendario del sistema operativo (distinto en cada equipo) · explicaciones clínicas improvisadas en el código (van en catálogo firmado) · sembrar rangos numéricos como `LAB_RANGOS` (umbrales ⇒ siguen en la instalación firmada, ⚪).
- [CÓMO] FND-160 (parser) → FND-161 (semillas de los catálogos de la interfaz) → FND-162 (calendario en toda fecha) → FND-163 (banderas explicadas + listas accionables, con auditoría transversal) → FND-164 (textos de todas las pantallas en humano + criba reforzada) → W-21. Aceptación: escribir `1999 02 01` ⇒ acepta; toda casilla de fecha ⇒ su calendario; en Sistema → Catálogos se firman las 7 semillas y todas las casillas de opciones quedan pobladas; cada bandera explica qué es; abrir cualquier pantalla —NOM incluida— y saber qué es, para qué sirve y qué hace cada botón sin adivinar.
- [GUARDA] `test_formatos_fecha` (acepta los formatos de las personas, rechaza fechas imposibles con error humano, un solo parser) + `test_semillas_catalogos` (7 semillas en borrador, pendientes listadas, firmar ⇒ opciones) + `test_calendario_campos` (toda spec con fecha ⇒ calendario; elegir día ⇒ ISO; año y mes navegables) + `test_claridad_transversal` (9 banderas explicadas; listas vacías accionables; fechas con calendario en toda pantalla) + `test_guia_ui` reforzado (resumen ≥60 sin eco del título; fragmentos de campos y acciones ≥20 caracteres; sin etiquetas «Campo»/«Valor»).

**R-51 · Recuperación de credenciales (nadie queda fuera de su equipo)**
- [QUÉ] **tres anillos de recuperación**, sin red y sin correo: (1) al crear cualquier usuario, el sistema genera un **código de recuperación de un solo uso** (12 caracteres **sin letras ni números confusos** — nada de 0/O ni 1/I —, se muestra **una sola vez** y se imprime para guardarlo en la caja fuerte; del código solo se guarda su **huella** en `DATOS/CONFIG/recuperacion.json`); (2) en Acceso, «¿Olvidó su PIN?» ⇒ nombre de usuario + ese código ⇒ formulario de PIN nuevo (**1 acción**, misma regla de 6+ caracteres; usado el código, queda anulado y no sirve dos veces); (3) un **dueño** puede restablecer el PIN de cualquier otra persona desde la sección Personas de C-13, y **dar de baja una cuenta mata su código de recuperación**; (4) **respaldo de presencia física documentado en la ayuda:** cerrar el programa, vaciar `USUARIOS/` y reabrir ⇒ el primer uso (R-49) vuelve a ofrecer crear al dueño — **los expedientes y catálogos no se tocan**. La vía de recuperación se muestra siempre en Acceso, sin esconderse.
- [POR QUÉ] P2 (estado accionable: nadie se queda sin salida) + evidencia del dueño (2026-10-23): creó una cuenta con un PIN que no recordaría y perdió el acceso por completo, con ninguna opción de recuperación en el producto; en un equipo sin internet (P1) el correo de recuperación no existe y la autenticación más fuerte es la presencia física en el consultorio.
- [DECISIÓN] DEC-37 (recuperación física: código de un solo uso impreso + dueño que restablece + presencia física como última red) · DEC-22 (el restablecimiento reutiliza el mismo backoff y el mismo cifrado del PIN) · P2. Descartado: correo de recuperación o preguntas secretas (P1: nada sale del consultorio) · cuentas de respaldo fijas de fábrica (credencial conocida, igual que la cuenta dueña prohibida en R-49) · borrar `DATOS/` para empezar de nuevo (costaría los datos del consultorio).
- [CÓMO] FND-170 (núcleo: código de un solo uso, restablecimiento, huella del código) → FND-171 (C-14: «¿Olvidó su PIN?» con 1 acción y aviso de qué hacer con el papel) → W-22. Aceptación: crear una cuenta ⇒ el código aparece una sola vez para imprimir; olvidar el PIN ⇒ con el código se pone uno nuevo en menos de 1 minuto; reusar el código ⇒ rechazado con error humano; con sesión de dueño ⇒ se restablece el de un compañero desde Personas; sin ningún papel ⇒ la ayuda explica el respaldo de presencia sin tocar pacientes.
- [GUARDA] `test_recuperacion_pin` (código ⇒ PIN nuevo · código reusado ⇒ rechazado · solo se guarda la huella, nunca el código · sin red) + `test_pantalla_recuperacion` («¿Olvidó su PIN?» ⇒ 1 acción · PIN nuevo oculto · la vía sigue visible en Acceso tras cerrar).

**R-52 · Instalación nueva: los catálogos de fábrica vienen con el producto**
- [QUÉ] una instalación nueva **no nace vacía**: el producto trae una **carpeta de catálogos base** (`CATALOGOS_BASE/`) con, al menos: rangos de laboratorio por analito y trimestre (`LAB_RANGOS`), tabla de diagnósticos (`CIE10`), cálculos con sus rangos (`CALCULOS`, anti-D, IMC, HOMA), curvas de crecimiento, controles por EG (`CONTROLES_POR_EG`) y motivos de consulta (`MOTIVOS`); en la **primera apertura** — **y en cada actualización (D-8, que los trae como artefacto de producto)** — se copian a `DATOS/CATALOGOS/` **en borrador y solo si aún no existen**: un catálogo existente o firmado **jamás se pisa**; aparecen en Sistema → Catálogos como pendientes de firma; el médico los revisa y **recién firmados deciden** (P6 intacto). **Prohibido** escribir ese contenido como literales en Python: R-50 solo sembró las listas cortas de la interfaz; esta R cubre los catálogos clínicos pesados. Si un catálogo base aún no tiene contenido clínico aprobado, se entrega como archivo con su fila pendiente de firma — nunca lo inventa el código.
- [POR QUÉ] evidencia: la instalación nueva real de 2026-10-23 tenía `DATOS/CATALOGOS/` con solo 7 listas de interfaz: el panel de estado sin rangos (gris), el apoyo clínico sin CIE-10 y los cálculos sin sus bandas — exactamente los huecos que el dueño viene reportando; P6 y DEC-38 exigen que ese contenido sea dato firmable, no código.
- [DECISIÓN] DEC-38 (catálogos base = archivos del producto copiados a `DATOS/` en borrador; nunca literales en Python, nunca descarga) · DEC-01 (filesystem = verdad) · P6 (borrador → firma del médico). Descartado: siembras gigantes escritas en el código (romperían P6 y el ratchet de `test_tablas_clinicas`) · pedir catálogos por internet en el arranque (P1) · dejarlos a la suerte de quien instale (como hoy).
- [CÓMO] FND-172 (carpeta `CATALOGOS_BASE/` + copia en la primera apertura + pruebas de que panel y chips los usan tras firmar) → W-23. Aceptación: abrir el equipo nuevo ⇒ Sistema lista los catálogos base como pendientes; firmar `LAB_RANGOS` ⇒ el semáforo sale del gris; firmar `CIE10` ⇒ el apoyo clínico ordena; 0 literales clínicos nuevos en el código.
- [GUARDA] `test_catalogos_instalacion` (la carpeta base existe con sus archivos · la primera apertura los copia en borrador · firmar ⇒ panel/chips los usan · `test_tablas_clinicas` sigue en 0 literales) + `test_panel_salud` (con rangos firmados, glucosa 95 ⇒ verde).

**R-53 · Guías de revisión y gobernanza del dueño (`GUIAS/`)**
- [QUÉ] la carpeta `GUIAS/` del producto (material de revisión, **no es ley**) contiene: `LEEME.md` (índice: qué guía para qué, en humano) · `DUEÑO-GOBIERNO.md` (cómo gobernar al agente: zonas de decisión, ventana de ratificación con agenda literal, cómo revisar una enmienda, cómo leer el digesto, cómo decir que no, glosario de gobernanza) · `DUEÑO-RECURSOS.md` (las mesas de trabajo, las herramientas en humano, qué archivo leer para qué, leyenda de colores, kit de continuidad: encendido, exámenes, PSK impresa, PIN perdido) · `DUEÑO-HALLAZGO.md` (la plantilla de DEC-39 explicada con un ejemplo real) · `DUEÑO-LEXICO.md` (la palabra del dueño → su término formal → qué hace el agente al oírla) · **una guía por pantalla `PANTALLA-C-xx.md`** con 7 secciones fijas: propósito en humano · cómo llegar · estado previo necesario (catálogos firmados, datos de prueba) · checklist ordenado «debería ver / debería pasar» · qué no tocar · qué hacer si algo falla (la plantilla de hallazgo) · enlace al recorrido `W-xx` si existe · y los manuales de uso por rol (`USO-ROL-DUENO.md`, `USO-ROL-MEDICO.md`, `USO-ROL-ENFERMERA.md`) para imprimir en el consultorio. Sin jerga de ingeniería; todo término técnico con su explicación; el dueño revisa **1 pantalla por sesión** con su guía en la mano.
- [POR QUÉ] evidencia del dueño 2026-10-23: «no logro explorar todo el software y siempre suelo explorar sólo 1 pantalla a la vez» y «espero que toda esta gobernanza ya haya sido implementado para no tener que volver a repetirme»; P2 (todo aviso nombra su acción) · R-46/R-50 (entrar y entender); la deuda humana invisible en el tablero (auditoría adversarial 2026-10-23).
- [DECISIÓN] P9 · §4.13 · §4.14 · DEC-39 (plantilla de hallazgo) · DEC-17 (1 tarea a la vez). Descartado: solo las ayudas dentro de la pantalla (son de uso cotidiano, no de revisión con estado previo y checklist) · guías en la mesa fuera del repositorio (sin versionado ni pruebas) · un manual único con todas las pantallas (contradice 1 pantalla por sesión).
- [CÓMO] FND-178 (núcleo de gobernanza + guía piloto C-03) → FND-179 (las 23 guías restantes + ratchet «toda SPEC del catálogo tiene su guía») → FND-180 (manuales por rol).
- [GUARDA] `test_guias_dueno` (los 5 documentos de gobernanza con sus secciones · la guía C-03 con sus 7 secciones · léxico con sus columnas · plantilla con campo de capa · sin jerga cruda) + `test_guias_pantallas` (24 guías presentes · una SPEC sin guía ⇒ rojo).

---

## LIBRO III · DECISIONES DECRETADAS (DEC-01…DEC-39)

> Cada decisión ya pasó por revisión; se reabre **solo** por su trigger o por conflicto de principios. Formato obligatorio de DEC: `[DECISIÓN]` · `[POR QUÉ]` · `[DESCARTADO]` · `[TRIGGER]` cuando la reapertura tenga condición. Las citas con paréntesis (`DEC-xx (…)`) usan las palabras clave del Anexo D.5.

### I · Del producto

**DEC-01 · Filesystem del médico = verdad (nunca una BD que exija el software)**
- [DECISIÓN] carpetas A–Z + JSON abiertos en `DATOS/` (UTF-8 sin BOM); el dueño lee todo con cualquier editor; los catálogos clínicos también son archivos con estado.
- [POR QUÉ] P3; el drill y el respaldo nacen de este formato.
- [DESCARTADO] SQLite o base embebida: "bases que requieren el software para leerse" violan P3.
- [TRIGGER] más de 2 000 pacientes con lentitud medida → matriz nueva.

**DEC-02 · Offline-first + solo stdlib (Python + tkinter)**
- [DECISIÓN] **Python 3.8+** sin sintaxis posterior a 3.8, **solo stdlib**, UI en **tkinter** (el del intérprete del sistema); cero red fuera de `S-*`; la app no instala ni descarga nada.
- [POR QUÉ] el stdlib cubre el dominio completo: `hashlib`/`hmac` (PBKDF2 y syncpack), `zipfile` (rellenar `.docx`), `csv`, `json`, `os.replace` (escrituras atómicas), `unicodedata` (normalización), `tkinter` (UI nativa); el intérprete arranca en el hardware de referencia sin runtime adicional; y Python es el lenguaje con más ejemplos públicos, lo que baja la tasa de error de implementación.
- [DESCARTADO] navegador local o Electron (cientos de MB y runtime empaquetado) · JVM/.NET (runtime de decenas de MB e instalación obligatoria) · Go/Rust (sin GUI en stdlib) · C/C++ (gestión manual de memoria innecesaria para este dominio) · Python con librerías externas (pandas, matplotlib, cryptography: peso, fallos de instalación y techo del hardware 2012) · Tcl/Tk directo (dominio y pruebas más pobres).

**DEC-03 · Eventos como verdad causal; disco = `fold()` con test**
- [DECISIÓN] log append-only firmado desde el commit 1; toda vista (índice, recientes, caché, timeline) existe solo si `== fold(fuente)`.
- [POR QUÉ] un log que nace tarde obliga a rehacer decisiones, y el índice manual crea un segundo estado.
- [DESCARTADO] "archivos nomás" sin fold; índice actualizable a mano.
- [TRIGGER] necesidad de un índice que `fold` no cubra → matriz con su costo de mantenimiento como evidencia.

**DEC-04 · Identidad UUID + match key; IDs entre nodos = `device+HLC`**
- [DECISIÓN] identidad doble desde el alta; contadores locales prohibidos.
- [POR QUÉ] los IDs con contador colisionan entre nodos; la homónimia exige una match key.
- [DESCARTADO] clave = CURP (llega tarde); contadores por nodo.
- [TRIGGER] CURP obligatoria por norma → reabrir la match key con matriz.

**DEC-05 · Conceptos separados = funciones separadas**
- [DECISIÓN] `restaurar_en(temporal)` ≠ `restaurar_en_sitio()`; el undo es un deque que restaura (nunca vacía sin restaurar).
- [POR QUÉ] un default destructivo convierte una prueba de drill en pérdida real de datos.
- [DESCARTADO] una sola función con parámetro opcional peligroso.

**DEC-06 · Un solo escritor `persistir(ctx, ruta, datos, op)` con op tipada + tabla de consecuencias**
- [DECISIÓN] atómico + journal + bak + evento + proyecciones viven en `nucleo::D-1`; añadir una consecuencia = 1 fila en `TABLA_CONSECUENCIAS`.
- [POR QUÉ] escritores repartidos producen doble lectura y journals muertos.
- [DESCARTADO] flags booleanos (combinaciones infinitas); helpers de escritura por capa.

**DEC-07 · Vistas derivadas solo como `fold()` con test** *(refuerzo de DEC-03 en el diseño de datos)*
- [DECISIÓN] índice de pacientes y cualquier proyección permitidos **solo** como fold verificable.
- [POR QUÉ] P3 + es la única vía compatible con los vetos sobre el índice manual.
- [DESCARTADO] caché o índice persistente "a mano".

**DEC-08 · Casos de uso profundos; la UI solo mapea y confirma**
- [DECISIÓN] `crear_paciente(...)`, `registrar_control(...)`, `buscar(...)` validan, persisten y emiten; retorno tipado; sin CRUD ni passthrough expuestos; la clasificación nunca mira mensajes de texto.
- [POR QUÉ] P8 + la validación copiada UI↔servicio se desincroniza, y los mensajes como código son frágiles.
- [DESCARTADO] CRUD abierto; clasificación por mensajes de texto.

**DEC-09 · Errores fall-fast; degradación con banner; cero salida muda**
- [DECISIÓN] validación en el borde con 1 error accionable; escrituras atómicas (reintentar es seguro); toda degradación es visible con causa.
- [POR QUÉ] P8-d; una plantilla ilegible que salió sin marcadores entregó papel roto.
- [DESCARTADO] `except: pass`; copia silenciosa; fallback mudo.

**DEC-10 · Operación = requisito de v1 (no apéndice)**
- [DECISIÓN] actualización de carpeta testeada, `VERSION` única, lanzadores e ícono: paquete del primer release.
- [POR QUÉ] lo no testeado desde el primer release llega tarde y se paga con datos.
- [DESCARTADO] ritual documentado al final.

### II · De la estructura del código

**DEC-11 · Monolito modular de 1–2 archivos (topología constitucional)**
- [DECISIÓN] programa = `nucleo.py` (headless: `N-1` contexto · `D-*` datos · `B-*` dominio/servicios · `S-*` sync) + `app.py` (`M-1` composición · `F-*` UI); regla de imports **`app → nucleo`** (chequeo AST), nadie importa `app`; solo `nucleo::D-*` hace I/O de archivos. Presupuestos (honestos, enmienda v4.1 con evidencia: el techo anterior quedó en 3 499 con los Must de la Fase 7.12 por construir y la medición del dueño vetó el ritual de compactación sin valor): `nucleo ≤3 700 L` · `app ≤3 300 L` · **total ≤7 000 L** · sección ≤500 L · método ≤60 L · cc ≤10 (11–15 aceptable con fila de tabla; >15 se rechaza). **3.er archivo de programa = violación** salvo enmienda que lo nombre (§4.7.12). Fuera del conteo: `pruebas/`, `tools/`, `VERSION`, lanzadores, `CATALOGOS_BASE/` (datos del producto, no programa), `GUIAS/` (material de revisión, no ley), `ESTADO.md` y todo `.md`.
- [POR QUÉ] costura mecánica de verificación (`import nucleo` sin tkinter = pruebas sin display) + navegación de 2 destinos + el dueño abre y ve cada dominio; las secciones con banner se leen y se editan por zonas sin releer el archivo entero; un monolito sin medición llegó a 7 093 líneas de solo UI.
- [DESCARTADO] 1 solo archivo (pierde la costura headless) · 5 archivos (dispersión sin necesidad) · paquetes multi-archivo.
- [TRIGGER] un archivo no cabe en su presupuesto con los Must → matriz para nombrar el 3.º archivo (nunca "más de lo mismo" a escondidas).

**DEC-12 · Interfaz por secciones con ID dentro del monolito**
- [DECISIÓN] secciones `nucleo::D-1`, `app::F-3`… con banner estable y registro en Anexo C.4; `__all__` en `nucleo`; dentro de un archivo lo privado = convención `_` + revisión por uso cruzado.
- [POR QUÉ] sin imports entre módulos, la disciplina solo existe si tiene nombre, techo y gate.
- [DESCARTADO] disciplina aspiracional sin medición.

**DEC-13 · Símbolos con una sola ortografía; símbolo sin test = no existe**
- [DECISIÓN] funciones, métodos y variables en `snake_case`; clases y dataclasses en PascalCase; **el mismo nombre** en código, acta y cualquier documento; firma no probada no se invoca.
- [POR QUÉ] dos ortografías = dos verdades para quien busque el símbolo.
- [DESCARTADO] camelCase en funciones y contratos.

### III · De la máquina de ejecución

**DEC-14 · Una sola fuente de verdad: este acta con micro-formato**
- [DECISIÓN] ley + contratos + plan + orden fusionados en 6 libros; los 4 actas elementales son fold generado; todo `.md` restante = NO VINCULANTE.
- [POR QUÉ] documentos en competencia generan precedencia ambigua entre textos que se contradicen; la unicidad por construcción elimina esa clase de conflictos.
- [DESCARTADO] conjuntos de documentos con tabla de precedencia.

**DEC-15 · Estado externo en `ESTADO.md` (datos, no ley)**
- [DECISIÓN] cursor, reclamos y marcas viven en un archivo de datos (Anexo A, protocolo §4.3); la constitución no se enmienda por un ✅.
- [POR QUÉ] progreso fuera de la conversación = reanudable en cualquier sesión.
- [DESCARTADO] estado en memoria del agente; estado dentro de la ley.

**DEC-16 · DoD = salida de comando · gate única con lista dentro · lint del acta**
- [DECISIÓN] nada se cierra sin salida verde copiada; `tools/compuerta.py` (lista de suites versionada + rojo/verde demostrados) y `tools/lint_juego.py` (vigila este acta, L1–L12).
- [POR QUÉ] es la única detección de contradicción infalible; "debería pasar" es cómo se engaña un agente.
- [DESCARTADO] promesas sin guarda; gate de folklore.

**DEC-17 · Tarjeta de 8 piezas + WIP=1 + checkpoint**
- [DECISIÓN] cada FND se ejecuta con interfaz congelada y cuerpo libre (§4.2); una tarea a la vez por elemento; `ESTADO.md` tras cada cierre.
- [POR QUÉ] libertad donde no rompe rieles, rieles donde el error es silencioso; trabajo disperso pierde el hilo.
- [DESCARTADO] instrucciones vagas; paralelismo sin estado.

**DEC-18 · Escalado de 3 líneas (el dueño como recurso escaso)**
- [DECISIÓN] conflicto P1–P8 → parar y preguntar con plantilla §4.6; todo lo demás lo decide este acta.
- [POR QUÉ] la atención del dueño es el cuello de botella.
- [DESCARTADO] preguntar por cada duda; decidir sin registrar.

**DEC-19 · Ancla humana: demo de 2 min por release + walkthrough W firmado**
- [DECISIÓN] ningún release cierra sin que el dueño ejecute su demo y, en v1.0, el recorrido W-01…W-14.
- [POR QUÉ] es el único eval que la IA no puede aprobar sola; convierte "funciona" en "sirve el lunes".
- [DESCARTADO] métricas de ingeniería como única verdad.

**DEC-20 · Enmiendas = micro-formato o no son ley**
- [DECISIÓN] toda entrada nueva o modificada de los Libros I–II lleva sus 5 campos (con matriz si cambia una decisión); lo que no los traiga lo rechaza el lint.
- [POR QUÉ] crecer sin reabrir contradicciones; P7 aplicado a la propia ley.
- [DESCARTADO] prosa adicional sin guarda.

**DEC-21 · El celular = terminal web del nodo (sin estado propio)**
- [DECISIÓN] el teléfono se sirve desde el nodo en LAN (reto-respuesta, catálogos servidos, cola diferida); no guarda verdad ni es un nodo más del log.
- [POR QUÉ] un nodo móvil añade una fuente de verdad que el consultorio no puede respaldar.
- [DESCARTADO] app nativa; celular como nodo con estado.
- [TRIGGER] necesidad de operar sin el nodo encendido → matriz nueva (y P1 lo prohibiría salvo enmienda).

**DEC-22 · Toda espera visible es estado + temporizador; nunca bloquea el hilo de UI**
- [DECISIÓN] backoff y castigos persisten en disco (`DATOS/CONFIG/`); la interfaz muestra cuenta regresiva sin `time.sleep`; el castigo sobrevive al cierre.
- [POR QUÉ] una espera en el hilo de UI congela la ventana, y el castigo en memoria se borra al cerrar.
- [DESCARTADO] `time.sleep` en la interfaz; contadores de intentos en memoria.

### IV · De la integración con equipos

**DEC-23 · Binario abierto: estándar = fuente; derivado = fold con test**
- [DECISIÓN] los binarios médicos se guardan byte-idénticos con hash (DICOM/JPEG/BMP/AVI abiertos; `.4dv` propietario sellado como adjunto con su visor oficial); toda preview o índice es `fold()` con test; el original jamás se convierte.
- [POR QUÉ] P3 sin abrir la puerta a un formato que solo este software lea: el original es estándar o adjunto con visor externo.
- [DESCARTADO] convertir todo a un formato propio; guardar `.4dv` como única copia sin hash.
- [TRIGGER] formato propietario nuevo sin visor externo → matriz §4.6.

**DEC-24 · Un solo pipeline de ingesta**
- [DECISIÓN] `ingresar_estudio` es la única puerta de entrada de datos de equipos externos; USB y red DICOM son orígenes, no flujos; nada escribe `ULTRASONIDO/` fuera de esa puerta.
- [POR QUÉ] §4.7.8 + P8: un segundo camino por origen duplica el acto y sus errores.
- [DESCARTADO] importador USB y receptor de red como código separado.
- [TRIGGER] origen que no pueda expresarse como `payloads` → matriz §4.6.

**DEC-25 · Fold con checkpoint bajo umbral**
- [DECISIÓN] las vistas de gran volumen se materializan con checkpoint (snapshot verificable `== fold`) cada ≥10 000 eventos; el checkpoint es disco derivado: se regenera y no es verdad.
- [POR QUÉ] F18: recomponer 100 000 eventos en cada lectura rebasa los 400 ms.
- [DESCARTADO] caché de negocio persistente; índice a mano (DEC-03).
- [TRIGGER] regeneración del checkpoint >1 s medida → matriz §4.6.

**DEC-26 · El dispositivo y su norma son datos (diccionario, no código)**
- [DECISIÓN] modelo de equipo, SOPs, formatos, ítems y vasos viven en tablas y catálogos con estado; el código solo itera esas filas; añadir variante = fila nueva + su test.
- [POR QUÉ] P6 + antipatrón 6: cada `if` por modelo se paga para siempre, y hay 10 aplicaciones del equipo con decenas de ítems volátiles.
- [DESCARTADO] `if` por modelo de equipo; ítems clínicos escritos en Python.
- [TRIGGER] fila que necesite lógica y no solo dato → matriz §4.6.

### V · De la interfaz y el estado clínico

**DEC-27 · El estado de salud es un semáforo informativo: fold de datos + catálogo firmado, nunca diagnóstico**
- [DECISIÓN] toda pantalla de estado (C-21 panel, tarjeta de R-39) es `fold()` de controles, resultados y notas contra catálogos firmados; estados posibles `normal|alerta|crítica|sin dato`; el software informa el estado calculado y jamás emite dictamen (P6).
- [POR QUÉ] P6 + P3: un semáforo con lógica propia en la interfaz sería un segundo estado y una frontera con el diagnóstico automatizado, que está fuera inviolable.
- [DESCARTADO] dictamen automático; rangos de analitos en la interfaz; tabla de rangos escrita en Python.
- [TRIGGER] necesidad de emitir diagnóstico → sigue prohibido (Alcance: fuera inviolable).

**DEC-28 · Navegación del expediente: una sola barra de pestañas de orden fijo (puerta = C-04)**
- [DECISIÓN] abrir paciente ⇒ siempre C-04; barra `PESTANAS_EXPEDIENTE` persistente de orden fijo (Resumen · Controles · Historia · Notas · Estudios · Gráficos · Línea de tiempo · Documentos); las pestañas son navegación secundaria, jamás acción primaria; la tarjeta prioritaria viaja por la bandera `en_contexto` (R-39) y todo vacío es estado accionable con 1 acción (R-42).
- [POR QUÉ] P2 + evidencia: con 23 pantallas y 9 en contexto, sin puerta ni orden decretados cada pantalla nueva inventaría su entrada y el médico navegaría 2 caminos por acto.
- [DESCARTADO] menú lateral variable; modales de navegación; enumerar la tarjeta pantalla por pantalla.
- [TRIGGER] pantalla nueva ⇒ se agrega a `PESTANAS_EXPEDIENTE` por enmienda (Anexo F) antes de codificarla.

**DEC-29 · Claridad de la interfaz: lenguaje del consultorio (sin códigos, sin jerga, sin angustia)**
- [DECISIÓN] toda cadena que vea la persona (ayudas, notas de pantalla, botones, confirmaciones, frases de resultado, mensajes de error) se redacta en español del consultorio: **cero códigos de este acta** (`R-…`, `DEC-…`, `Anexo …`, `§`), **cero jerga técnica** (`drill`, `CRC`, `fold`, `payload`) y **cero palabras que preocupan** (`castigo`, `sobrevive`, `prohibido`, `alterada`); los errores nombran el problema y la acción concreta sin mostrar rutas ni claves de archivo. Incumplimiento = gate roja.
- [POR QUÉ] feedback del dueño 2026-10-22 (dos rondas): la ayuda críptica no ayuda y genera angustia en médico y enfermera; la trazabilidad se vive en las actas y en la gate, no en la pantalla.
- [DESCARTADO] mostrar referencias de reglas en la interfaz; mensajes técnicos neutros tipo «ALTERADA»/«verify»; ayuda en archivos externos al producto.
- [TRIGGER] texto nuevo de interfaz ⇒ pasa por `TestAyudaClara` antes de merge.

**DEC-30 · Campos de lista cerrada = selección, no escritura**
- [DECISIÓN] todo campo con lista cerrada (rol, vía del parto, origen de ingesta, plantilla, tipo de nota, tamizaje, especialidad, calculadora, catálogo, formato de export) se elige de un desplegable alimentado por el dato (PERMISOS.json, catálogos firmados, catálogos del sistema); la persona **nunca teclea** el valor. El rol además muestra en pantalla los permisos que implica antes de dar de alta.
- [POR QUÉ] P6 + R-13: los valores de lista son dato, no código; tecleándolos se producían errores silenciosos (rol inexistente) y la persona no sabía qué implicaba cada opción.
- [DESCARTADO] campos de texto libre para valores de catálogo; listas escritas en el código.

**DEC-31 · Equipo rojo y negro: pruebas exploratorias property-based con semilla**
- [DECISIÓN] las baterías de ataque generan sus insumos con RNG sembrado (`random.Random(semilla)`), **nunca casos fijos**; los oradores son invariantes de esta acta (fold==disco, errores legales, frontera de `DATOS/`, semáforo válido, claridad DEC-29); todo hallazgo se reporta con `(clase, semilla, pasos)` y se reduce con *shrink* hasta el mínimo; en la gate solo semillas fijas y presupuesto por clase; la exploración libre (semilla aleatoria) es bajo pedido y su reporte va al registro.
- [POR QUÉ] las suites de ejemplo confirman lo ya pensado; el ataque aleatorio dirigido por invariantes descubre vulnerabilidades e inconsistencias no imaginadas por quienes construyeron el código.
- [DESCARTADO] fuzz sin semilla (no reproducible, gate intermitente) · pruebas con entradas hardcodeadas · aceptar excepciones crudas (`KeyError`, `TypeError`) como salida normal.

**DEC-32 · El recordatorio lo prepara el software; lo empuja una persona**
- [DECISIÓN] el software detecta la situación, personaliza el mensaje y registra la entrega; copiar a WhatsApp, llamar u hoja impresa lo ejecuta siempre una persona con su criterio; el software jamás toma la red para avisar a pacientes y jamás guarda credenciales de canales; ningún mensaje lleva valores de laboratorio, cifras de calculadoras ni diagnósticos: solo la prioridad de acudir, y cuando el estado lo exige una frase firmada de prioridad de cita.
- [POR QUÉ] P1 y §4.7: WhatsApp/SMS son servicios externos con los datos clínicos fuera del consultorio; y un resultado malinterpretado por mensaje daña más que el aviso de acudir.
- [DESCARTADO] envío automático por WhatsApp/SMS/correo al paciente · mensajes con valores o cifras · chatbot explicador de enfermedades · credenciales de canales en `DATOS/`.
- [TRIGGER] pedido de canal automático por el dueño → matriz §4.6 contra P1 y §4.7 (la probabilidad de que gane es baja y el costo de red es alto).

**DEC-33 · El estado del mensaje es fold: espacios menos entregas**
- [DECISIÓN] el estado de un recordatorio **no se guarda**: los espacios (situación detectada, paciente, ventana, prioridad, plantilla) se deducen como fold de sus fuentes; un evento `recordatorio_entregado` (paciente, situación, canal, usuario, fecha) cubre el espacio; anular la entrega lo devuelve; sin entrega al cierre de la ventana ⇒ escalado visible; la caducidad la dicta la desaparición de la fuente (control registrado, cita atendida, anti-D aplicada), nunca un reloj propio; ventanas (`ventana_antes_dias`, `ventana_despues_dias`, `caduca_si`), prioridad y plantilla viven en `CATALOGOS/MENSAJES.json` con estado borrador→firmado.
- [POR QUÉ] P6 + DEC-03: una tabla de estados editable a mano es un segundo estado que se desincroniza (el mismo error vetado al índice manual de notas); las ventanas son política del consultorio, no código.
- [DESCARTADO] campo `enviado` en una tabla de mensajes · plazos duros en Python · clasificar estados por mensajes de texto (DEC-08).
- [TRIGGER] necesidad de un estado adicional (p. ej. "leído") → fila de catálogo y, si cambia el contrato, enmienda.

**DEC-34 · Una sola lista de pendientes en todo el sistema**
- [DECISIÓN] todo "por hacer" del sistema — notas en borrador, interconsultas, tamizajes vencidos, mensajes pendientes y pacientes por recuperar — se expresa con el **mismo tipo `Pendiente`** y la misma casa de pintado; prohibido un segundo dataclass o una segunda lista de pendientes con lógica propia.
- [POR QUÉ] R-41 ya unificó recordatorios de Home y pendientes de C-23 por el mismo motivo: dos listas paralelas = dos verdades que se desincronizan y dos pantallas que mantener.
- [DESCARTADO] lista propia de mensajes · tarjeta de recordatorios en paralelo a pendientes · campo de prioridad duplicado en la UI.
- [TRIGGER] pendiente que no cabe en el tipo → matriz con su costo de mantenimiento y enmienda del contrato Anexo F.

**DEC-35 · La matriz de permisos por defecto se siembra en la primera apertura**
- [DECISIÓN] al abrir una instalación sin `DATOS/PERMISOS.json`, el núcleo crea la matriz con 4 roles: `ADMIN` (todo) · `MEDICO` (historia, controles, notas y firmas, catálogos clínicos) · `ENFERMERA` (admisión, controles del día, laboratorio) · `AUDITOR` (solo lectura); la matriz sigue editable a mano desde Admin (R-13 viva) y toda lista de roles de la interfaz nace de ella; el alta de usuarios valida contra la matriz **aunque esté vacía**: rol no listado ⇒ error visible.
- [POR QUÉ] R-13 sin matriz sembrada = lista de roles vacía y permisos muertos en equipo nuevo (evidencia: primera corrida real, 2026-10-22); P2: nadie puede adivinar roles que no existen en pantalla.
- [DESCARTADO] cuenta dueña fija de fábrica (credencial conocida) · matriz vacía a la espera de que alguien la escriba (la primera pantalla queda inutilizable) · permisos que crecen en el código · aceptar rol inventado cuando la matriz falta (hueco de validación).
- [TRIGGER] rol nuevo o permiso distinto por rol → fila de matriz con su prueba; cambiar quién puede qué a gran escala → matriz contra R-13.

**DEC-36 · Lo que se elige, se ve; lo que se escribe, se facilita; lo que es técnico, se explica**
- [DECISIÓN] toda casilla de fecha lleva calendario y el parser único acepta los formatos que escriben las personas (`1999 02 01` incluido); toda lista de opciones nace de un catálogo sembrado en borrador y **mientras no esté firmado la casilla muestra su estado vacío accionable con el nombre del catálogo y la acción de firma**, jamás un combo mudo; todo término técnico visible (banderas, catálogos) lleva su explicación en palabras humanas desde un catálogo; toda pantalla explica qué es, para qué sirve y cómo se usa sin repetir su título ni soltar códigos crudos.
- [POR QUÉ] el dueño usó el producto real y encontró las cuatro fallas juntas (2026-10-23): fechas rechazadas, listas vacías, banderas sin explicación y textos crípticos («varias pantallas dan poca información y la que dan es críptica»); P6/R-46/DEC-29 ya lo pedían y las pruebas no lo clavaban.
- [DESCARTADO] combos precargados sin firma de la lista (P6: solo la lista firmada decide) · calendario del sistema operativo (cada equipo distinto) · explicaciones clínicas escritas en el código (texto clínico ⇒ catálogo) · sembrar umbrales numéricos (`LAB_RANGOS`) sin firma médica.
- [TRIGGER] pantalla nueva ⇒ su calendario en las fechas, su estado accionable en las listas y su texto de qué es/para qué/cómo; catálogo nuevo que alimente una lista ⇒ sembrado en borrador y firmable.

**DEC-37 · Credencial perdida: recuperación física, sin red**
- [DECISIÓN] toda cuenta nace con un código de recuperación de un solo uso (se muestra una vez, se imprime, solo queda su huella); el acceso ofrece «¿Olvidó su PIN?» con nombre + código para poner PIN nuevo (código anulado tras usarse); un dueño restablece el PIN de otros desde Personas; la última red documentada es presencia física: vaciar `USUARIOS/` y reabrir ⇒ primer uso (R-49) — nunca se tocan expedientes ni catálogos; el restablecimiento reutiliza el mismo cifrado y backoff del PIN (DEC-22).
- [POR QUÉ] evidencia del dueño 2026-10-23: cuenta creada con PIN olvidable ⇒ acceso perdido total sin ninguna vía; P1 prohíbe correo o servicios externos para esto; P2 exige que toda pantalla tenga salida accionable.
- [DESCARTADO] correo o preguntas secretas de recuperación (P1: todo sale del consultorio) · cuenta maestra de fábrica (credencial conocida, prohibida por R-49) · borrar `DATOS/` para recuperarse (costaría los datos) · restablecer sin código ni dueño (cualquiera con la teclado sería dueño).
- [TRIGGER] multi-usuario con roles editables a gran escala → reabrir contra DEC-35 y R-13.

**DEC-38 · Los catálogos base son archivos del producto, nunca código**
- [DECISIÓN] el producto incluye `CATALOGOS_BASE/` con los catálogos clínicos pesados (rangos, CIE-10, cálculos, curvas, controles por EG, motivos); la primera apertura los copia a `DATOS/CATALOGOS/` en borrador firmable; el contenido clínico viaja como archivo, no como literal de Python; sin internet en ningún punto del camino.
- [POR QUÉ] P6 + P1: el equipo nuevo de 2026-10-23 nació con 7 listitas de interfaz y sin rangos ni CIE-10; los literales en código los prohíbe el ratchet `test_tablas_clinicas`, y descargarlos prohibiría P1.
- [DESCARTADO] siembras de miles de filas escritas en Python (rompe P6 y su ratchet) · catálogos desde la web al instalar (P1) · fabricar contenido clínico que nadie firmó (P6).
- [TRIGGER] catálogo base que necesite lógica y no solo dato → matriz §4.6; contenido clínico nuevo → fila borrador + firma del médico.

**DEC-39 · Plantilla de hallazgo humano, registro en turno y ventana de ratificación**
- [DECISIÓN] toda sesión de prueba del dueño produce hallazgos con la plantilla `Pantalla o tema · qué hice · qué esperaba · qué pasó · fecha` en `GUIAS/HALLAZGOS.md`, con número consecutivo y estado; el agente registra cada hallazgo **en el mismo turno** (fila nueva con plan o respuesta con el ID que ya lo cubre, en humano); las enmiendas pequeñas se acumulan en un **digesto semanal de una página en lenguaje llano** (qué cambia · por qué · qué arriesga si dice que no) que el dueño responde en la ventana de 30 minutos con «aprobado» / «no apruebo X porque…» / «pregunta»; lo urgente (rojos, seguridad) no espera a la ventana.
- [POR QUÉ] evidencia del dueño 2026-10-23: 14 enmiendas en 3 días = fatiga de firma; sus hallazgos llegaron siempre al margen de los canales y algunos se perdieron; P9 sin registro es solo buena intención.
- [DESCARTADO] ratificar cada mensaje (ritual caro y sin foco) · registro solo en la conversación (ya se perdió) · ventana sin fecha de revisión (ritual muerto que nadie corrige).
- [TRIGGER] un hallazgo humano perdido, o 3 semanas sin revisar el contrato §4.13 ⇒ reabrir este DEC con matriz §4.6.

---

## LIBRO IV · OPERACIÓN (el CÓMO global)

### 4.1 Micro-formato (obligatorio — DEC-20)
- **Requisito R-xx:** `[QUÉ]` con número · `[POR QUÉ]` principio+evidencia · `[DECISIÓN]` DEC-x o P-x + descartado · `[CÓMO]` pasos/FND/aceptación · `[GUARDA]` test o "se crea ANTES — FND-xxx".
- **Decisión DEC-xx:** `[DECISIÓN]` · `[POR QUÉ]` · `[DESCARTADO]` · `[TRIGGER]` cuando la reapertura tenga condición.

### 4.2 Tarjeta de 8 piezas (toda tarea FND — se compone, no se inventa)
```
[FND-xxx] Título · SENTIDO HUMANO · OBJETIVO · LEER · INTERFAZ CONGELADA ·
LIBERTAD · PROHIBIDO · DoD · DESPUÉS
```
Fuentes exactas (nada se redacta desde cero):
- **Título/Objetivo** = columna `Target` de la fila del Libro V.
- **DoD/Dep/T** = columnas `DoD`, `Dep`, `T` de esa misma fila.
- **Leer** = los `R-xx`, `DEC-xx`, `P1–P8`, `W-xx` y `C-xx` que citan ese FND (búsqueda inversa en este acta).
- **Interfaz congelada** = Anexo F (si una firma nueva es inevitable, se añade a Anexo F por enmienda §4.6 **antes** de codificarla).
- **Libertad** = el cuerpo de su sección (`nucleo::…` o `app::…`), donde el diseño es suyo.
- **Prohibido** = los 11 antipatrónes de §4.5 + §4.7 + no salir de su sección + DEC-11.
- **Sentido humano** = la fila del Libro VI para ese FND; si no la tiene, se toma la "Aceptación" del R-xx que lo cita.
- **Después** = siguiente fila de su fase por orden de dependencias + marca en `ESTADO.md`.

**Ejemplo completo (una tarjeta armada, FND-150):**
```
[FND-150] Siembra de la matriz de permisos · SENTIDO HUMANO: el equipo recién
estrenado encuentra su dueño sin ayuda · OBJETIVO: `nucleo::N-1` siembra
PERMISOS.json con la matriz DEC-35 + hay_usuarios + validación de rol siempre ·
LEER: R-49, R-13, DEC-35, P2, W-20 · INTERFAZ CONGELADA: Anexo F `N-1` (se añade
`hay_usuarios` antes de codificarla) · LIBERTAD: cuerpo de `nucleo::N-1` ·
PROHIBIDO: 11 antipatrónes + §4.7 + salir de la sección + DEC-11 · DoD:
python3 -m unittest pruebas.test_primer_uso -v → 0 (4 roles sembrados ·
0 usuarios ⇒ hay_usuarios False · alta ⇒ True · rol inventado ⇒ error) ·
DESPUÉS: cierra en ESTADO.md con Elemento=BACKEND, commit "FND-150: …", y sigue
FND-151 (Dep: 150).
```
Nada de esto se inventa: cada pieza sale de la fila, del Anexo F, del Libro VI y de este §4.2.

**Cierre vertical de toda fila (7 puntos, v4.2):** antes de marcar ✅, la fila confirma: (1) su prueba DoD verde · (2) trazabilidad regenerada · (3) guía `GUIAS/PANTALLA-C-xx.md` actualizada si tocó una pantalla · (4) resumen en humano para el dueño · (5) las 5 preguntas clínicas de §4.14 respondidas si tocó A, B o D · (6) auditoría adversarial propia publicada (P9c) · (7) «Dónde revisar usted» en la entrega.

### 4.3 Protocolo de sesión (6 pasos)
1. Lee `AGENTS.md` y tu acta elemental completa **una vez** (modo marco); la maestra táctica por IDs.
2. Abre `ESTADO.md`; si no existe o falta tu fila, créala con Anexo A (todo ID debe existir en el Libro V). **Reclama:** `Elemento` = el tuyo y `Estado` = 🔄. Si otro elemento ya reclamó esa fila (🔄/✅), elige otra fila cuyas `Dep` estén ✅. **WIP = 1 por elemento.**
3. **Baseline:** `python3 tools/lint_juego.py` y `python3 tools/compuerta.py` desde la raíz del repositorio; copia las salidas verdes como punto de partida. (Si un comando no existiera todavía — solo al inicio de la Fase 0 — empieza por la primera FND de esa fase sin `Dep` cumplidas.)
4. Ejecuta **solo** esa fila: implementa su código **y** su prueba en `pruebas/` con el nombre exacto de su DoD.
5. DoD = salida verde copiada en tu respuesta → marca ✅ y `Elemento` en `ESTADO.md` → `git add -A && git commit -m "FND-xxx: …"`.
6. Siguiente fila de tu elemento. Un rojo se repara en el código; nunca enmienda la ley (regla 4 del prólogo).

**Ronda por orden del dueño (modo lote, autorizado por frase del Approver):** cuando el
dueño ordena «sigue adelante» / «todo cuanto sea necesario», la sesión trabaja **varias
filas en secuencia** bajo estas reglas — una fila a la vez y su WIP por elemento siguen
vigentes, pero la ceremonia se agrupa: por fila basta **su prueba DoD + lint**; la
**compuerta completa** se corre al **cerrar cada fila y al cerrar la fase**; el **commit
se hace por fase** (una fase = un mensaje con todas sus filas) o por fila si la fase es
de una sola tarea; las vistas derivadas (`TRAZABILIDAD`, inventario, cronograma) se
regeneran **al cerrar la fase**, no en cada paso; la orden del dueño y las salidas van al
`REGISTRO.md` (evidencia append-only). Esta sección existe porque una ronda improvisada
costó más que construir el producto entero (medición del dueño, 2026-10-23) — el lote es
lo barato; lo caro era redescubrir cómo lotear cada vez.

### 4.4 Verificación (verdad ejecutable)
- Compuerta única `tools/compuerta.py`: orquesta `tools/lint_juego.py` + la **lista de suites versionada dentro** (la lista solo crece: quitar una suite = rojo); demos rojo/verde con `--demo`. Cada elemento agrega al cerrar su fila la entrada de su `pruebas/test_<DoD>.py` (única edición permitida en `tools/` para quien no es VERIFICACIÓN: agregar una línea a la lista; quitar = rojo). Desde FND-051 la compuerta corre además `cobertura_r` en cada corrida por defecto: toda fila ✅ de `ESTADO.md` tiene sus pruebas de DoD listadas; R-25 queda fuera por estar aparcada (sin fila).
- Citas `archivo::sección::símbolo` (nunca número de línea).
- APIs públicas = solo las que ejercitan pruebas (Anexo F).
- Sin dependencias nuevas (solo stdlib, DEC-02); cualquier cambio de ley = conflicto §4.6.

### 4.5 Los 11 antipatrónes (checklist pre-✅)
1. passthrough o configuradores expuestos (interfaz sin profundidad) · 2. CRUD expuesto en la UI · 3. excepción usada como flujo normal · 4. salida muda o silenciosa · 5. 2.ª copia de un mismo concepto (ratchet la vuelve roja) · 6. flag o `if` especial donde debería haber una fila de tabla · 7. configuración del médico escrita en código Python · 8. ley o contrato que dicte la distribución de widgets · 9. estado de negocio reconstruido después de instanciar los widgets, o refresco de widgets sin cambio de estado · 10. un nombre con dos significados · 11. promesa (requisito/contrato/decisión) sin test.

### 4.6 Escalado (DEC-18) — se detiene y pregunta SOLO si: conflicto P1–P8 · el acta prohíbe lo pedido · la gate no baja tras 2 intentos · se necesita al Approver.
```
[ESCALA] FND-xxx · conflicto <P#/DEC-x> · Opción A/B · Matriz <C1–C7, gana…> · Recomendación · Impacto de esperar
```

### 4.7 Prohibiciones (12)
1 Enviar datos a servicios externos · 2 Requerir internet · 3 Formato que solo el software lea (cifrar el árbol local lo incluye) · 4 Vender "certificación" · 5 Romper un workflow W sin enmienda con matriz (§4.6) · 6 Crear estado en disco que no sea `fold()` verificable · 7 IDs locales o contadores entre nodos · 8 Pedir dos veces el mismo dato · 9 Complejidad creciente: `if` especial contra datos, `sleep` en UI, `pass` sin rastro, 2.ª copia · 10 Entrada de ley sin trigger o sin guarda · 11 *(la lista completa de §4.5 aplica como prohibición)* · 12 **Crear un 3.er archivo de programa sin enmienda que lo nombre** (DEC-11).

### 4.8 Fitness functions (números — F4 se confirma además en la DEMO del Libro VI)
| # | Umbral | # | Umbral |
|---|---|---|---|
| F1 | presupuestos DEC-11 + sección ≤500 + método ≤60 | F8 | sync: 1 reconstrucción/paciente, 1 lectura usuarios/lote |
| F2 | cc ≤10 (11–15 con fila; >15 rechazo) | F9 | W: registro ≤2 pasos · doc 1 clic · Home ≤3 acciones |
| F3 | duplicación = 0 (ratchet) | F10 | 100 % de R con suite viva |
| F4 | arranque ≤2 s | F11 | `pass` sin rastro = 0 |
| F5 | búsqueda ≤200 ms con 1 000 pacientes | F12 | docs: 0 `app.py:\d+` |
| F6 | guardado ≤100 ms | F13 | pares de color ≥4.5:1 |
| F7 | append bitácora O(1) | F14 | 1 comando = red completa |
| F15 | ingest de 100 MB ≤30 s (USB) y ≤60 s (red) | F17 | respaldo incremental de 1 000 archivos (500 MB) ≤60 s |
| F16 | manifiesto de 2 000 adjuntos verificado ≤2 s | F18 | vista derivada ≤400 ms con 100 000 eventos (checkpoint ≥10 000) |
| F19 | panel de estado de salud ≤200 ms con 5 000 resultados | F20 | tarjeta prioritaria ≤100 ms con 500 notas |
| F21 | cambio de pestaña ≤100 ms con tarjeta persistente | F22 | 1 comando (`tools/pulso.py`) = estado de gobernanza completo en humano (exámenes, derivados, tablero, relojes, cola del dueño) |

### 4.9 Lint de este acta (`tools/lint_juego.py`, reglas L1–L12)
- **L1** — la maestra contiene exactamente los encabezados: `## 0 · PRÓLOGO`, `## LIBRO I`…`## LIBRO VI`, `## ANEXO A`…`## ANEXO F`.
- **L2** — 0 coincidencias de `app\.py:[0-9]+` en los `.md` permitidos.
- **L3** — toda entrada `**R-xx ·` contiene en su bloque los cinco campos `- [QUÉ]`, `- [POR QUÉ]`, `- [DECISIÓN]`, `- [CÓMO]`, `- [GUARDA]`.
- **L4** — entradas `**DEC-xx` consecutivas desde 01 sin huecos, cada una con `[DECISIÓN]`, `[POR QUÉ]` y `[DESCARTADO]`.
- **L5** — dentro del Libro V: filas `| FND-xxx |` únicas, con 5 columnas y `DoD` no vacío; `Target` no contiene los nombres de rechazo `main.py`, `datos.py`, `backend.py`, `frontend.py`, `sync.py` (fuera del Libro V, las filas de ejemplo del Anexo A no cuentan).
- **L6** — `ESTADO.md`: cada fila tiene ID ∈ Libro V de la maestra, estado ∈ {⬜, 🔄, ✅, ⛔} y Elemento ∈ {BACKEND, FRONTEND, SYNC, VERIFICACION, vacío}.
- **L7** — 0 nombres en camelCase (una palabra con minúscula inmediatamente seguida de mayúscula), con exemptos: `camelCase`, `qSOFA`, `vN` (la herramienta lleva el patrón exacto versionado dentro).
- **L8** — 0 palabras de la lista de vaguedad; la lista vive versionada **dentro de la herramienta** (por eso no se reproduce aquí).
- **L9** — los `.md` permitidos son exactamente: `ACTA_CONSTITUTIVA.md`, `ACTA_BACKEND.md`, `ACTA_FRONTEND.md`, `ACTA_SYNC.md`, `ACTA_VERIFICACION.md`, `AGENTS.md`, `ESTADO.md`; además `GUIAS/*.md` está permitido (guías de revisión y gobernanza del dueño, R-53 — material no-ley); los cuatro elementales contienen, en su cabecera inmediata (después del H1 y antes de la tabla de campos), exactamente una línea que empieza con `> **GENERADO — NO EDITAR A MANO.**`.
- **L10** — la maestra declara "monolito modular de 1–2 archivos" (DEC-11) y §4.7.12 prohíbe el 3.º archivo.
- **L11** — cada acta elemental == fold de la maestra según Anexo D (cuerpo byte a byte desde `## LIBRO I` con solo las filas del Libro V filtradas; cabecera y prólogo == plantillas D.3).
- **L12** — toda cita `P1–P8`, `R-xx`, `DEC-xx`, `FND-xxx`, `W-xx`, `C-xx` existe en la maestra; y si una cita `DEC-xx (…)` lleva paréntesis, este contiene una palabra clave del glosario D.5 de esa decisión.
- **L13** — toda entrada `[GUARDA]` de la maestra cita al menos una prueba que existe como `pruebas/test_*.py` y que está en la lista de suites de la compuerta (una guarda que nombra una prueba fantasma no guarda nada; la construye FND-177).

### 4.10 Riesgos (pre-mortem comprimido — 6 órdenes negativas)
No reescribir de corrido (≤10 % del código por paquete) · no omitir la gate (un rojo se repara o escala: §4.6, nunca se salta) · no migrar datos del dueño sin enmienda + respaldo + drill · no posergar la cola de decisiones del Approver · no descubrir el rendimiento en producción (F4–F7 desde la primera fase) · no improvisar alcance fuera de este acta.

### 4.11 DACI, valor y negocio (resumen)
Driver = IA (diagnóstico, implementación, verificación) · **Approver = dueño** (alcance, workflow, cambios de este acta) · Contributor = médico (firmas de catálogos, walkthrough) · Informed = filas, gate y triggers. Producción = 1 FND por commit; releases según Libro V.
**Valor humano:** el consultorio opera sin licencias, sin internet y sin suscripciones; el expediente se lee con cualquier editor; el drill garantiza que una prueba jamás cuesta datos; el CSV sale anónimo para análisis; el lunes el dueño ejecuta la DEMO y firma el walkthrough. **Coste operativo:** 0 servicios externos; el gasto recurrente es el tiempo del dueño en firmas (Contributor) y en los walkthrough.

### 4.12 · Topología de dispositivos (equipos de cómputo, Android y fuentes)

- **Nodo** = 1 equipo de cómputo del consultorio ejecutando `nucleo.py` + `app.py` con `DATOS/` completo y **un solo escritor** `persistir` (DEC-06); 1 proceso activo por equipo.
- **Equipos de cómputo (varios):** cada equipo es un nodo con copia completa de `DATOS/`; no hay nodo primario ni esclavo: ambos aceptan registro y la verdad es `DATOS/` + el log. Convergencia nodo↔nodo = **R-27**: eventos firmados, 5 barreras y `syncpack` con inventario de binarios (8.º escenario: `ADJUNTOS/` por hash, solo faltantes) sobre **LAN o USB**, activada en Fase 8 (FND-090/091). Hasta esa Fase solo hay 1 nodo activo por consultorio.
- **Android (celular o tableta)** = terminal web **sin estado** del nodo (DEC-21): el navegador local abre `http://<ip-del-nodo>:<puerto>/celular` por la Wi-Fi del consultorio; reto-respuesta con la PSK, catálogos servidos y cola diferida si la red cae (FND-092); **sin APK, sin internet, sin datos propios** (P1). El socket vive en `nucleo::S-3`; `app::F-15` solo compone páginas. Opera desde la Fase 8.
- **Voluson y equipos de imagen** = fuente externa **unidireccional, no es nodo**: entra solo por `nucleo::S-4` (memoria USB o red DICOM del consultorio) y solo al persistirse vuelve parte del nodo (R-32).
- **Matriz de transportes (los 5 caminos, nada más):** LAN del consultorio (eventos + hashes) · USB (syncpack + drill de respaldo) · red DICOM del consultorio (Voluson → nodo) · memoria USB del Voluson (nodo) · correo SMTP con el paquete ligero sellado (`S-5`; solo si el dueño lo activa; sin internet = cola, P1). Todo transporte vive en `nucleo::S-*`; la nube y el almacenamiento web (p. ej. Tricefy) quedan prohibidos; el correo es cauce de respaldo, nunca de operación.

### 4.13 Contrato de entrega y gobierno del tiempo del dueño (DEC-39, P9)

Toda entrega al dueño cierra con el checklist (a)–(h); incumplirlo = proceso rojo:

- **(a) resumen humano** en 3 renglones: qué es · por qué le importa · qué hace usted.
- **(b) explicación de cada punto** con definiciones y analogías (P9a).
- **(c) «Dónde revisar usted»**: archivo/pantalla/comando · qué debe ver (en palabras) · qué decirle al agente si no lo ve («el examen salió rojo» / «no veo X»).
- **(d) solución en capas** (P9b) para todo hallazgo o propuesta, con los **minutos del dueño** declarados.
- **(e) auditoría adversarial publicada** (P9c).
- **(f) efectos de segundo orden**: qué abre la solución y quién la cierra.
- **(g) números por comando**: los 5 indicadores M1–M5 salen de `tools/digesto.py`, nunca de cálculo a mano.
- **(h) autochequeo** del contrato al pie del mensaje.

**Zonas de decisión (quién firma qué):**

| Zona | Quién decide | Ejemplos |
|---|---|---|
| 🟢 verde | el agente decide y lo registra al cerrar | diseño interno de su sección · texto de guías · nombres de pruebas · orden de filas con `Dep` cumplidas · reparar rojos de código |
| 🟡 amarilla | el agente propone; el dueño decide en la ventana o en el digesto | enmiendas · carpetas nuevas · cambios en herramientas · alcance de una fila · pedir más de 60 min de su semana |
| 🔴 roja | solo el dueño, siempre | abrir o cerrar fases · activar funciones que mueven datos fuera (correo) · comprar hardware · aprobar versiones (DEMO, W) · alcance del producto · ratificar enmiendas |

**Requisitos del dueño (R-D):** R-D1 ventana semanal de 30 minutos con el digesto · R-D2 una sesión de revisión guiada de 15–30 minutos (1 pantalla) · R-D3 reportar hallazgos con la plantilla (o en voz: el agente transcribe) · R-D4 un cambio de alcance a mitad de fila se registra como fila nueva · R-D5 revisión de este contrato cada 3 semanas (15 minutos) · R-D6 presupuesto de atención: la gobernanza nueva consume ≤60 minutos por semana; excederlo se pide por escrito con motivo. **El proceso se adapta al dueño, no al revés.**

**Requisitos del agente (R-A):** R-A1 toda petición declara los minutos que consume · R-A2 máximo 1 decisión pendiente a la vez en el plato del dueño · R-A3 con un hallazgo: registrar > responder > proponer · R-A4 autochequeo P9 al pie · R-A5 esfuerzo en minutos del dueño + días del agente, nunca solo «S/M/L» · R-A6 toda entrega cierra con «Dónde revisar usted».

**Ciclo del hallazgo humano (7 pasos):** 1 el dueño reporta (plantilla o voz) · 2 el agente registra con ID en el mismo turno · 3 clasifica (código / diseño / ley / ya existía y no se vio) · 4 soluciona en las 6 capas · 5 ejecuta en fila con su prueba · 6 entrega con «Dónde revisar» · 7 el dueño verifica en su pantalla.

**5 números de gobernanza (los calcula `digesto.py` cada ventana):** M1 filas cerradas en la semana (tendencia) · M2 días desde la última entrega que el dueño verificó (meta ≤7) · M3 latencia de ratificación en días (meta ≤3) · M4 hallazgos recibidos vs registrados (**perdidos = 0**) · M5 pantallas revisadas con guía ÷ 24 (sube hasta 24).

**Ceremonias (frecuencia · duración · producto):** arranque/cierre de sesión del agente (cada sesión · 0 minutos del dueño · `ESTADO.md` al día + 1 renglón «qué le falta al dueño») · ventana de ratificación (semanal · 30 minutos · digesto respondido) · sesión de revisión guiada (semanal · 15–30 minutos · hallazgos en el buzón) · retrospectiva del proceso (quincenal · 15 minutos · 1 mejora adoptada) · revisión de este contrato (cada 3 semanas · 15 minutos · se confirma o se enmienda).

**Registro de riesgos:** `PENDIENTES.md` tiene la sección RIESGOS con columnas (riesgo · tipo · probable · grave · quién vigila · qué se hace) y dos tipos: **riesgo de proyecto** (afecta la entrega) y **peligro clínico** (afecta a la paciente o al bebé si el software falla); el peligro clínico lleva además su control en diseño + la prueba que lo verifica + su guía de operación segura. **Riesgo** = algo que puede pasar (se vigila) · **deuda** = algo ya dejado pendiente (T1–T8, se paga).

### 4.14 Modelo de capas, palabras clave del dueño y frenos de la IA

**Capa 0 · Misión:** mejor práctica médica · salud de la madre y del bebé. Toda propuesta declara su ganador de valor: paciente · práctica · técnica (sin ninguno de los tres, se retira o se justifica por escrito).

**Mapa vertical (imagen única del proyecto):**

```
[0] MISIÓN (paciente · práctica · técnica)
      ↕
[A] GOBERNANZA: ley P1–P9, zonas, enmiendas
      ↕ trazabilidad
[B] DISEÑO: requisitos, planos, pantallas
      ↕ trazabilidad
[C] IMPLEMENTACIÓN: código + pruebas
      ↕ trazabilidad
[D] VALIDACIÓN: dueño, guías, DEMO, W, hallazgos
      ↕
[E] LENGUAJE (P9, léxico, [SUPUESTO])     [F] DESCONOCIDOS (retrospectiva, auditoría)

COLUMNAS VERTICALES (atraviesan A–F): trazabilidad · auditoría · claridad ·
validación · automatización · gestión · seguridad clínica
```

- **PV1 · Verticalidad:** trazabilidad, auditoría, claridad, validación y automatización son columnas que atraviesan todas las capas; ninguna pieza nueva se diseña sin preguntar: ¿de dónde baja? ¿a dónde sube? ¿quién la audita?
- **PV2 · Todo proceso es auditable, incluido el del dueño:** todo proceso deja evidencia en formato máquina y tiene métrica; los datos del proceso del dueño existen para **adaptar el proceso a él**; prohibido usarlos como métrica de desempeño.
- **PV3 · Automatizar = incrustación vertical:** un proceso está automatizado cuando su regla se declara una sola vez arriba (ley) y las capas de abajo la obedecen con evidencia (herramienta → prueba → guía); si el agente detecta una instrucción repetida 2 veces, propone su incrustación.

**Protocolo de supuestos (dientes de la regla 7 del prólogo):** toda construcción no trivial se entrega antes con «Lo que entiendo que pide: X · Lo que NO voy a tocar: Y · [SUPUESTO 1] … [SUPUESTO 2] …» → el dueño confirma o corrige → recién ahí se ejecuta. Supuesto sin confirmar ≠ autorización; ejecutar sobre supuestos = proceso rojo en `REGISTRO.md`; los supuestos van en el digesto semanal.

**Palabras clave del dueño (protocolo exacto):** «optimizar / mejorar» ⇒ el agente entrega un **recorrido capa por capa (A→F)** de las implicaciones, **sin ejecutar**, hasta que el dueño cierre con «entendido» — su definición: «sin ninguna duda de qué construimos para maternidad y cómo se verá el software final». «automatizar» ⇒ identificar dónde incrustar la instrucción una sola vez (ley → herramienta → prueba → guía).

**Las 5 preguntas de implicación clínica** (toda propuesta que toca A, B o D responde en humano): 1 ¿qué gana la paciente, el bebé o el médico? · 2 ¿qué pasa si falla o se equivoca (bloquea, avisa, deja pasar)? · 3 ¿qué pasa en la consulta real: prisa, una mano, poca luz, sin internet? · 4 ¿quién lo mantiene después y con qué información? · 5 ¿toca una regla de la capa A? ¿cuál? (si la toca ⇒ enmienda antes que código).

### 4.15 Inventario de procesos (todo proceso sin evidencia de máquina y sin métrica está prometido, no implementado)

| Proceso | Cómo se ejecuta | Evidencia | Métrica | Dueño |
|---|---|---|---|---|
| auditoría | P9c + `pulso.py` + `verificar_todo`/`verificar_logica` | informe con severidad | hallazgos abiertos/cerrados | agente |
| diseño | enmienda §4.6 + restitución `[SUPUESTO]` + 5 preguntas | digesto con supuestos | confirmados vs corregidos | agente propone · dueño confirma |
| mejora | retrospectiva quincenal → sección MEJORA de `PENDIENTES.md` | 1 mejora adoptada por retro | mejoras implementadas | dueño decide |
| automatización | incrustación vertical (PV3) + F22 | herramienta nueva con prueba | repeticiones eliminadas | agente |
| trazabilidad | matriz vertical + regla «todo artefacto de la ley aparece» (FND-185) | matriz generada | cadenas rotas = 0 | agente |
| gestión | ventana + digesto + zonas + M1–M5 | `DIGESTO.md` semanal | M3 · M4 = 0 | dueño ratifica |
| validación | sesiones guiadas + W + DEMO | `HALLAZGOS.md` + firmas | M5 · M2 | dueño |
| comunicación | P9 + §4.14 | autochequeo al pie | rechazos «rehacer por P9» | ambos |

### 4.16 Frenos por punto ciego conocido de la IA (v4.2 — el pulso y la compuerta verifican los mecánicos)

| Punto ciego | Freno | Quién lo verifica |
|---|---|---|
| decir lo que el dueño quiere oír | P9c obliga a publicar hallazgos adversariales reales; un «sin hallazgos» debe nombrar qué se revisó | dueño + digesto |
| suponer sin confirmar | `[SUPUESTO]` y no ejecutar sin confirmación (§4.14) | dueño |
| tocar la ley para verdear un rojo | regla 4 del prólogo; los commits de ley deben decir «enmienda» y el digesto lista los archivos tocados por commit | dueño en la ventana |
| olvidar instrucciones entre sesiones | todo lo vinculante vive en la ley, en `GUIAS/` y en herramientas — jamás solo en la conversación | `pulso.py` confirma que la herramienta citada existe |
| autoevaluación circular (misma mente es juez y reo) | verificación independiente: `verificar_todo`, `verificar_logica`, `equipo_rojo`, fold L11; el verde de la compuerta atestigua conformidad, no aptitud clínica (solo Libro VI) | máquinas + firmas del dueño |
| construir de más de lo pedido | restitución con «Lo que NO voy a tocar» + valor triple + candidatos con disparador | dueño |
| números escritos a mano | M1–M5 solo salen de `digesto.py` (prólogo regla 4) | `digesto.py` |
| perder derivados de vista | `pulso.py` compara la huella de la maestra contra `TRAZABILIDAD`/`INVENTARIO`/`CRONOGRAMA` y la completitud de `ESTADO.md` | `pulso.py` |
| racionalizar un rojo | «un rojo jamás se arregla cambiando la ley» (prólogo 4): el rojo permanece hasta enmienda aprobada | compuerta + `REGISTRO.md` |
| fatigar al dueño | R-D6 (≤60 min/semana) y R-A2 (1 decisión pendiente) | `digesto.py` |
| modificar archivos fuera de alcance | el digesto lista los archivos tocados por cada commit de la semana | dueño en la ventana |

---

## LIBRO V · ORDEN DE EJECUCIÓN (fases y tareas)

**Regla:** fases en orden 0→8; **secuencia por dependencias (`Dep`), a igual dependencia por número**; cada cierre = ✅ en `ESTADO.md` + commit `FND-xxx: …`; tamaño S ≤½ día · M ≤2 · L ≤5; `⛔` = requiere Approver/hardware. Una fila puede depender de otra fase o de otro elemento: se espera a que su `Dep` esté ✅.

### Fase 0 · BOOTSTRAP (gate antes que código — P7)
| FND | Target | Dep | DoD | T |
|---|---|---|---|---|
| FND-001 | esqueleto: `nucleo.py` (stubs `N-1`, `D-1`, `B-1`, `S-1` con banner y `__all__`), `app.py` (stubs `M-1`, `F-1`), `pruebas/__init__.py`, `VERSION` = 0.0, `Iniciar.sh`, `Iniciar.bat` (con verificación de `import tkinter` y aviso accionable), `ESTADO.md` (Anexo A, filas de la Fase 0), `git init` + commit inicial | — | `python3 app.py` imprime `Maternidad 0.0` y sale · `ls *.py` en la raíz = `app.py nucleo.py` · `test -f ESTADO.md && test -f pruebas/__init__.py` · `git rev-parse --is-inside-work-tree` = true | S |
| FND-002 | `tools/lint_juego.py` con las reglas L1–L12 del §4.9 | 001 | `python3 tools/lint_juego.py` → exit 0 · `python3 tools/lint_juego.py --demo L3` → exit ≠0 · `python3 tools/lint_juego.py --demo L12` → exit ≠0 | M |
| FND-003 | `tools/compuerta.py` (lista de suites versionada dentro + orquesta del lint + suites) + `pruebas/test_smoke.py` | 002 | `python3 tools/compuerta.py` → exit 0 · `python3 tools/compuerta.py --demo roto` → exit ≠0 | S |
| FND-004 | `nucleo::N-1` Contexto inyectado (`Config`, `Sesion`, cachas), 0 mutables a nivel de módulo | 001 | `python3 -m unittest pruebas.test_contexto -v` → 0 (2 contextos aislados + ratchet AST) | M |
| FND-005 | fitness F1/F2/F12 en la compuerta (presupuestos DEC-11, sección ≤500, cc ≤10, imports `app → nucleo`, 0 `app.py:\d+`) + ratchets P5 desde el commit 1 (`grep -c 'def semanas_desde_eg' nucleo.py` ≤1 · `grep -c 'def validar_fum' nucleo.py` ≤1 · `grep -c '"msg" in' nucleo.py` = 0 · `grep -c '"msg" in' app.py` = 0 · `grep -c 'time.sleep' app.py` = 0 · `grep -c 'import socket' app.py` = 0) + chequeo estático P1 (0 import de red fuera de `nucleo::S-*`) + chequeo `py38` (`ast.parse` con `feature_version=(3, 8)` sobre `nucleo.py` y `app.py`: el intérprete de desarrollo puede ser más nuevo que el suelo de máquina 3.8 de R-28; Anexo F) | 003, 004 | `python3 tools/compuerta.py --demo F1` → exit ≠0 · `python3 tools/compuerta.py --demo F2` → exit ≠0 · `python3 tools/compuerta.py --demo F3` → exit ≠0 · `python3 tools/compuerta.py --demo F12` → exit ≠0 · `python3 tools/compuerta.py --check ratchets` → exit 0 · `python3 tools/compuerta.py --check sin_red` → exit 0 · `python3 tools/compuerta.py --check py38` → exit 0 · luego `python3 tools/compuerta.py` → exit 0 | M |
| FND-006 | `tools/generar_actas_elementales.py` (genera los 4 extractos y valida con `--check` según Anexo D) | 002 | `python3 tools/generar_actas_elementales.py --check` → exit 0 · `python3 tools/generar_actas_elementales.py --demo` (muta la maestra) → exit ≠0 | M |

### Fase 1 · DATOS (`nucleo::D-*`)
| FND | Target | Dep | DoD | T |
|---|---|---|---|---|
| FND-010 | `nucleo::D-1` Almacen + `TIPOS_OP` + `TABLA_CONSECUENCIAS` (DEC-06) | 004 | `python3 -m unittest pruebas.test_almacen -v` → 0 (atómico ante fallo, op→tabla, op nueva = 1 fila) | M |
| FND-011 | `nucleo::D-3` journal rotante (`JOURNAL_TOPE = 5000`) | 010 | `python3 -m unittest pruebas.test_journal -v` → 0 (5 000 escrituras ≤ tope, 0 pérdidas) | S |
| FND-012 | `nucleo::D-2` layout `DATOS/PACIENTES/A–Z/_OTROS` + `listado() == fold` | 010 | `python3 -m unittest pruebas.test_fold -v` → 0 · compuerta `--check solo_d_io` → exit 0 | M |
| FND-013 | `nucleo::D-4` bitácora O(1) con cadena verificable | 010 | `python3 -m unittest pruebas.test_bitacora -v` → 0 (cadena íntegra + append O(1)) | S |

### Fase 2 · DOMINIO (`nucleo::B-*`, cero I/O)
| FND | Target | Dep | DoD | T |
|---|---|---|---|---|
| FND-020 | `nucleo::B-2` identidad por tabla de casos + códigos tipados | 001 | `python3 -m unittest pruebas.test_identidad -v` → 0 (los 4 casos de R-02) · `grep -c '"msg" in' nucleo.py` = 0 · `grep -c '"msg" in' app.py` = 0 | M |
| FND-021 | `nucleo::B-1` fechas y derivados en una sola casa | 001 | `python3 -m unittest pruebas.test_fechas -v` → 0 · `grep -c 'def semanas_desde_eg' nucleo.py` = 1 | M |
| FND-022 | `nucleo::B-3` parsers y bandas como tablas; rangos = catálogo firmado | 001 | `python3 -m unittest pruebas.test_tablas_clinicas -v` → 0 | S |
| FND-023 | `nucleo::B-2` `identidad_exacta` / `candidatos_difusos` sobre 1 clave | 020 | `python3 -m unittest pruebas.test_matching -v` → 0 | S |

### Fase 3 · SERVICIOS (`nucleo::B-4…B-7` + `S-1`)
| FND | Target | Dep | DoD | T |
|---|---|---|---|---|
| FND-030 | `nucleo::B-4` `crear_paciente` (retorno tipado) | 012, 020 | `python3 -m unittest pruebas.test_alta -v` → 0 | M |
| FND-031 | `nucleo::B-4` `registrar_control` (alertas solo tras persistir) | 010, 022, 030 | `python3 -m unittest pruebas.test_control -v` → 0 | M |
| FND-032 | `nucleo::S-1` eventos append-only firmados (HMAC + `device+HLC` + versión de esquema) | 010 | `python3 -m unittest pruebas.test_eventos -v` → 0 (rechaza esquema vN−1) | M |
| FND-033 | `nucleo::B-7` undo con deque que restaura | 010 | `python3 -m unittest pruebas.test_undo -v` → 0 | S |

### Fase 4 · INTERFAZ (`app::F-*`, estado antes de widgets)
| FND | Target | Dep | DoD | T |
|---|---|---|---|---|
| FND-040 | `app::F-1` motor (estado en `__init__`, specs declarativos, encolado) + `app::F-2` tokens/WCAG + ícono PNG 256×256 | 004 | `python3 -m unittest pruebas.test_ui_motor pruebas.test_wcag -v` → 0 (0 `hasattr`, 0 refresco sin cambio de estado, pares ≥4.5:1) | L |
| FND-041 | `app::F-3` pantalla C-03 registro en 2 pasos + C-02 homónimos + calendario (R-02/R-11) | 040, 030 | `python3 -m unittest pruebas.test_registro pruebas.test_calendario -v` → 0 | M |
| FND-042 | `app::F-4` pantalla C-16 controles con confirmación post-guardado | 040, 031 | `python3 -m unittest pruebas.test_pantalla_controles -v` → 0 (10 campos, 9 banderas, alerta solo tras escribir) | M |

### Fase 5 · CIERRE v0.0 (esqueleto andante)
| FND | Target | Dep | DoD | T |
|---|---|---|---|---|
| FND-050 | `nucleo::D-6` respaldo / verificar / drill(→temporal) / `restaurar_en` (R-12) | 010 | `python3 -m unittest pruebas.test_drill pruebas.test_respaldo -v` → 0 (sentinel intacto; escritura atómica) | M |
| FND-051 | trazabilidad: invariantes R-02/R-12/R-14 con suite viva en la compuerta + F10 continuo (`cobertura_r`: toda fila ✅ de `ESTADO.md` con sus pruebas de DoD listadas; R-25 aparcada sin fila queda fuera) | 050 | `python3 -m unittest pruebas.test_invariantes -v` → 0 · `python3 tools/compuerta.py --check cobertura_r` → exit 0 · la compuerta lista esas suites y corre `cobertura_r` por defecto | M |
| FND-052 | cierre v0.0: gate completa + `VERSION` 0.0 verificada + presupuestos verdes | 051, 055 | `python3 tools/compuerta.py` → exit 0 + ancla humana: DEMO v0.0 (Libro VI) aprobada | S |
| FND-053 | `DATOS/CONFIG/INSTALACION.json` configuración única de instalación (datos del centro, casilla de respaldo, cadencia; alta desde C-13; en `DATOS/` sobrevive a D-8) y 0 valores del consultorio en código (R-44) | 010 | `python3 -m unittest pruebas.test_config_instalacion -v` → 0 (alta única, lectura por `leer`, íntegro tras un ciclo de producto) · `grep -c '@' nucleo.py app.py` = 0 | S |
| FND-054 | `nucleo::D-6` `respaldar_ligero` + `nucleo::S-5` respaldo por correo: perfil ligero (JSON+bitácora+manifiesto en ZIP deflate, **0 binarios**) sellado con la PSK (flujo HMAC-SHA256 del syncpack), cola con reintento sin internet y TLS (R-12) | 050, 053 | `python3 -m unittest pruebas.test_correo_ligero -v` → 0 (sellado ⇄ PSK byte a byte; 0 binarios; sin red ⇒ cola con 0 excepción) · `python3 tools/compuerta.py --check sin_red` → exit 0 | M |
| FND-055 | `app::F-14` C-08 diálogo de respaldo: destino, respaldar, verificar, drill — disponible antes de la DEMO v0.0 (R-12) | 040, 050 | `python3 -m unittest pruebas.test_pantalla_respaldo -v` → 0 (4 acciones; drill pide confirmación) | S |

### Fase 6 · v0.1 (núcleo de consulta)
| FND | Target | Dep | DoD | T |
|---|---|---|---|---|
| FND-060 | `nucleo::B-8` documentos: 1 clic, `{{}}` irresoluto → error visible, CRUD de `DATOS/_PLANTILLAS/` (R-05/R-06/R-07) | 052 | `python3 -m unittest pruebas.test_documentos -v` → 0 | M |
| FND-061 | `nucleo::B-8` consentimiento: SHA del cuerpo previo + aviso de texto modificado (R-08) | 060 | `python3 -m unittest pruebas.test_consentimiento -v` → 0 | M |
| FND-062 | `nucleo::B-4` + `D-2` + `D-5` búsqueda con 12 predicados y carga única por ciclo (R-01/R-22) | 012 | `python3 -m unittest pruebas.test_busqueda_fold pruebas.test_rendimiento -v` → 0 (búsqueda == fold; 1 000 pacientes ≤200 ms [F5]; guardado ≤100 ms [F6]) | M |
| FND-063 | `nucleo::B-8` export anónimo: misma puerta para `.md` y `.csv` (R-23) | 060 | `python3 -m unittest pruebas.test_anonimo -v` → 0 | M |
| FND-064 | `nucleo::B-5` historia A–M: esquema declarativo, tri-state, notas por id, versionado, progreso (R-17) | 010 | `python3 -m unittest pruebas.test_historia pruebas.test_esquemas_parity -v` → 0 | L |
| FND-065 | `app::F-6` pantalla C-04 ficha muestra-editable (R-10) | 040 | `python3 -m unittest pruebas.test_pantalla_ficha -v` → 0 | S |
| FND-066 | `app::F-7` pantalla C-01 Home: 3 acciones primarias, recientes, recordatorios (R-01/R-12) | 040, 050, 062, 067 | `python3 -m unittest pruebas.test_home -v` → 0 (acción primaria == 3) | M |
| FND-067 | `nucleo::B-6` alertas con dedupe `device+HLC` (R-14/R-16) | 031, 032 | `python3 -m unittest pruebas.test_alertas -v` → 0 | M |
| FND-068 | `nucleo::D-7` plausibilidad con banner + manifiesto de `ADJUNTOS/` (R-09) | 010 | `python3 -m unittest pruebas.test_adjuntos pruebas.test_banner -v` → 0 | M |
| FND-069 | `app::F-5` pantalla C-05 Documentos: 1 clic, CRUD de plantillas, verificación (R-05…R-09) | 040, 060, 061, 068 | `python3 -m unittest pruebas.test_pantalla_documentos -v` → 0 | M |
| FND-070 | cierre v0.1: gate completa + `VERSION` 0.1 | 060–069 | `python3 tools/compuerta.py` → exit 0 | S |

### Fase 7 · v1.0 (resto de Must)
| FND | Target | Dep | DoD | T |
|---|---|---|---|---|
| FND-071 | `nucleo::B-1`+`B-4` embarazo: FUM única, derivados solo (R-04) | 021 | `python3 -m unittest pruebas.test_embarazo -v` → 0 · `grep -c 'def validar_fum' nucleo.py` = 1 | M |
| FND-072 | `app::F-8` pantallas C-09/C-10 embarazo (R-04) | 040, 071 | `python3 -m unittest pruebas.test_pantalla_embarazo -v` → 0 | M |
| FND-073 | `app::F-9` diálogo C-19 NOM-004 prellenado (R-18) | 040, 064 | `python3 -m unittest pruebas.test_pantalla_nom004 -v` → 0 | M |
| FND-074 | `nucleo::B-6` calculadoras: 18 del Anexo E + catálogo `CALCULOS` + paridad (R-19) | 022 | `python3 -m unittest pruebas.test_calculadoras -v` → 0 | L |
| FND-075 | `app::F-10` pantalla C-06 calculadoras con prefill del último control (R-19) | 040, 074 | `python3 -m unittest pruebas.test_pantalla_calculadoras -v` → 0 | L |
| FND-076 | `nucleo::B-9` catálogos clínicos firmables: bandas, tarjeta roja, anti-D, tamizajes, CIE-10, curvas (R-15/R-16/R-20) | 064, 067 | `python3 -m unittest pruebas.test_catalogos pruebas.test_tarjeta_roja -v` → 0 | L |
| FND-077 | `app::F-11` pantalla C-07 apoyo clínico: F6+chips, tamizajes, puerperio, CIE-10 (R-20) | 040, 076 | `python3 -m unittest pruebas.test_pantalla_apoyo -v` → 0 | L |
| FND-078 | `app::F-12` pantalla C-17 gráficos honestos (hueco = corte) (R-21) | 062 | `python3 -m unittest pruebas.test_ondas -v` → 0 | M |
| FND-079 | `nucleo::B-10` línea de tiempo == fold de fuentes (R-21) | 032 | `python3 -m unittest pruebas.test_timeline -v` → 0 | S |
| FND-080 | `nucleo::B-4` import CSV con dry-run y códigos tipados (R-24) | 020 | `python3 -m unittest pruebas.test_import_dryrun -v` → 0 | M |
| FND-081 | `app::F-19` diálogo C-12 import con resumen antes de escribir (R-24) | 040, 080 | `python3 -m unittest pruebas.test_pantalla_import -v` → 0 | M |
| FND-082 | `nucleo::N-1` PIN backoff persistente + sesión con rol + `puede()` (R-13/R-26) | 004 | `python3 -m unittest pruebas.test_pin_backoff pruebas.test_permisos -v` → 0 · `grep -c 'time.sleep' app.py` = 0 | M |
| FND-083 | `app::F-13` pantalla C-14 acceso con cuenta regresiva visible (R-26) | 040, 082 | `python3 -m unittest pruebas.test_pantalla_pin -v` → 0 | M |
| FND-084 | `app::F-14` pantalla C-13 Admin: matriz editable, bitácora en 1 clic, panel sync, botones respaldo/export/import (R-12/R-13/R-23/R-27) | 040, 050, 063, 081, 083 | `python3 -m unittest pruebas.test_admin -v` → 0 | M |
| FND-085 | `nucleo::D-8` actualización de carpeta: solo producto + verificación de versión + rollback (R-28) | — | `python3 -m unittest pruebas.test_actualizacion -v` → 0 | M |
| FND-086 | fitness F11/F12/F13 en la compuerta (0 `pass` sin rastro, 0 `app.py:\d+`, contraste ≥4.5:1) | 005 | `python3 tools/compuerta.py --demo F11` → exit ≠0 · `--demo F13` → exit ≠0 · luego `python3 tools/compuerta.py` → exit 0 | S |
| FND-087 | `app::F-16` pantalla C-18 Historia completa con % de progreso (R-17) | 040, 064 | `python3 -m unittest pruebas.test_pantalla_historia -v` → 0 | M |
| FND-088 | `app::F-17` pantalla C-22 línea de tiempo (R-21) | 040, 079 | `python3 -m unittest pruebas.test_pantalla_timeline -v` → 0 | S |
| FND-089 | cierre v1.0: gate completa + `VERSION` 1.0 + walkthrough W con el Approver | todas las filas FND-001…FND-088 existentes (53) | `python3 tools/compuerta.py` → exit 0 + walkthrough W-01…W-14 firmado (Libro VI) | M |

### Fase 7.5 · v1.1 (ultrasonido, ingesta y eficiencia de binarios)
| FND | Target | Dep | DoD | T |
|---|---|---|---|---|
| FND-100 | `tools/compuerta.py`: fitness F15–F18 con demo rojo/verde (R-33) | 005 | `python3 tools/compuerta.py --demo F15` → exit ≠0 (igual F16, F17, F18) · luego `python3 tools/compuerta.py` → exit 0 | S |
| FND-101 | `nucleo::B-11` parseo puro DICOM/SR + `CATALOGOS/US_ITEMS.json` y `US_VASOS.json` (R-30) | 022, 076 | `python3 -m unittest pruebas.test_us_diccionario -v` → 0 (ítem desconocido ⇒ fila nueva; paridad catálogo↔parser) | M |
| FND-102 | `nucleo::S-4` `ingresar_estudio`: USB (DICOMDIR/DICOM/JPEG/BMP/AVI/4dv) y Storage SCP stdlib (R-32) | 010, 101 | `python3 -m unittest pruebas.test_ingest -v` → 0 (roundtrip byte idéntico + SR plegado) · `grep -c 'import socket' app.py` = 0 | L |
| FND-103 | `nucleo::D-7` `guardar_adjunto`: dedup SHA-256, manifiesto y consentimiento (R-31) | 068 | `python3 -m unittest pruebas.test_us_dedup -v` → 0 (misma imagen ⇒ 1 copia; sin consentimiento ⇒ rechazo visible) | M |
| FND-104 | `app::F-18` pantallas C-15 estudio y C-20 cola de ingesta con temporizador (R-30/R-32) | 040, 101, 102, 103 | `python3 -m unittest pruebas.test_pantalla_us pruebas.test_pantalla_ingesta pruebas.test_preview -v` → 0 | M |
| FND-105 | `DATOS/CONFIG/DISPOSITIVOS.json`: alta de equipo como fila, sin código (R-34) | 010 | `python3 -m unittest pruebas.test_dispositivos -v` → 0 (alta y edición solo con fila) | S |
| FND-106 | `nucleo::D-5` checkpoint del `fold` bajo el umbral F18 (R-33) | 010, 012 | `python3 -m unittest pruebas.test_fold_checkpoint -v` → 0 (snapshot == fold exacto) | M |
| FND-107 | walkthrough **W-15** Voluson→expediente, cierre v1.1 (`VERSION` 1.1) (Libro VI) | 104 | W-15 firmado por el Approver · `python3 tools/compuerta.py` → exit 0 · `cat VERSION` = 1.1 | S |

### Fase 7.6 · v1.2 (práctica médica: notas, laboratorio, estado y seguimiento)
| FND | Target | Dep | DoD | T |
|---|---|---|---|---|
| FND-108 | `nucleo::B-9` catálogos `LAB_RANGOS`, `NOTAS`, `SEGUIMIENTO` con estado (rangos por analito/trimestre, tipos de nota, vencimientos) (R-36/R-38/R-40) | 076 | `python3 -m unittest pruebas.test_lab_rangos -v` → 0 (0 umbrales sin firma; analitos mínimos de R-38 presentes) | M |
| FND-109 | `nucleo::B-12` laboratorio y seguimiento: `registrar_resultado`, `panel_salud`, `tendencias`, `pendientes` (R-38/R-41) | 108 | `python3 -m unittest pruebas.test_panel_salud -v` → 0 (panel == fold; `sin dato` = gris; pendientes == fold; 0 diagnósticos en salida) | L |
| FND-110 | `nucleo::B-5` notas con autoría, cédula, estado `borrador` o `firmado` y catálogo de tipos (R-36) | 064, 082 | `python3 -m unittest pruebas.test_notas -v` → 0 (firmada inmutable; editar ⇒ versión nueva) | M |
| FND-111 | `nucleo::B-8` interconsulta/referencia con estado `pendiente` o `atendida` + documento 1 clic (R-36) | 060, 110 | `python3 -m unittest pruebas.test_interconsulta -v` → 0 | M |
| FND-112 | `nucleo::B-5`+`B-4` problemas activos = `fold(notas)`, banda de alergias y medicamentos actuales (R-37) | 110 | `python3 -m unittest pruebas.test_problemas_alergias -v` → 0 (problemas == fold; aviso no bloqueante) | M |
| FND-113 | `nucleo::B-4` bloque `PARTO` en `EPISODIO.json` + vínculo `rn_ids` (R-35) | 071 | `python3 -m unittest pruebas.test_parto -v` → 0 (campos obligatorios; sin vía ⇒ error visible) | M |
| FND-114 | `nucleo::B-9` tamizajes/vacunación/hospitalizaciones con vencimiento derivado (R-40) | 076 | `python3 -m unittest pruebas.test_seguimiento -v` → 0 (0 fechas duras) | M |
| FND-115 | `nucleo::B-6` calculadora HOMA-IR (Anexo E #18) con banda del catálogo (R-19/R-38) | 074 | `python3 -m unittest pruebas.test_calculadoras -v` → 0 (18 == catálogo) | S |
| FND-116 | `nucleo::B-4` próximo control derivado del catálogo de controles por EG (R-41) | 021, 076 | `python3 -m unittest pruebas.test_proximo_control -v` → 0 (lo derivable ⇒ nunca se pide) | S |
| FND-117 | `app::F-20` C-21 panel de estado + tarjeta prioritaria por bandera `en_contexto` (R-38/R-39) | 040, 109, 112, 115 | `python3 -m unittest pruebas.test_pantalla_panel pruebas.test_tarjeta_prioritaria -v` → 0 (tarjeta primer bloque; semáforo con `sin dato`) | L |
| FND-118 | `app::F-21` C-23 notas, interconsultas y pendientes de la paciente (R-36/R-41) | 040, 109, 110, 111 | `python3 -m unittest pruebas.test_pantalla_notas -v` → 0 | M |
| FND-119 | `app::F-12` C-17 tendencias de laboratorio (curva de glucosa, hemoglobina, química) (R-38) | 040, 109 | `python3 -m unittest pruebas.test_ondas -v` → 0 (hueco = corte) | M |
| FND-120 | `app::F-8` C-10 bloque PARTO del episodio (R-35) | 040, 113 | `python3 -m unittest pruebas.test_pantalla_parto -v` → 0 | M |
| FND-121 | `tools/compuerta.py`: fitness F19–F20 con demo rojo/verde (R-38/R-39) | 100 | `python3 tools/compuerta.py --demo F19` → exit ≠0 · `--demo F20` → exit ≠0 · luego gate completa → 0 | S |
| FND-122 | walkthrough **W-16** estado de salud + cierre v1.2 (`VERSION` 1.2) (Libro VI) | 117, 118, 119, 120, 121 | W-16 firmado por el Approver + `python3 tools/compuerta.py` → exit 0 | S |

### Fase 7.7 · v1.3 (frontend: navegación, cálculos enlazados y admin)
| FND | Target | Dep | DoD | T |
|---|---|---|---|---|
| FND-123 | `app::M-1` barra `PESTANAS_EXPEDIENTE` + bandera `en_contexto` + estado vacío accionable (R-39/R-42) | 040, 117, 118 | `python3 -m unittest pruebas.test_navegacion_exp -v` → 0 (orden fijo; `en_contexto` ⇒ tarjeta; vacío ⇒ 1 acción) | M |
| FND-124 | `nucleo::B-6` `prefill` desde control + laboratorio/US y resultado con `origen` (R-43) | 109, 115 | `python3 -m unittest pruebas.test_calculadoras -v` → 0 (HOMA-IR prellenado; 0 captura doble) | S |
| FND-125 | `app::F-10` C-06 enlazado 1 clic desde C-21 y viceversa, con prefill (R-43) | 040, 075, 117, 124 | `python3 -m unittest pruebas.test_pantalla_calculadoras -v` → 0 (enlace + prefill) | S |
| FND-126 | `app::F-14` C-13 con secciones Dispositivos e Instalación: alta/edición solo con fila (R-13/R-34/R-44) | 105, 084, 053 | `python3 -m unittest pruebas.test_pantalla_admin -v` → 0 | S |
| FND-135 | `app::M-1` claridad: fuente `AYUDAS` por pantalla + botón Ayuda contextual + Guía de funciones en C-01 + etiquetas humanas (R-46, DEC-29/DEC-30) | 040, 117 | `python3 -m unittest pruebas.test_guia_ui pruebas.test_auditoria_ui -v` → 0 · `python3 tools/compuerta.py` → exit 0 | M |
| FND-136 | VERIFICACION `tools/equipo_rojo.py`: batería property-based de las clases R1…R5 y N1…N4 con semilla, shrink y presupuesto (R-47, DEC-31) | 003, 051 | `python3 tools/equipo_rojo.py --semilla 42` → exit 0 · `python3 tools/compuerta.py --check equipo_rojo` → 0 · salida copiada | L |
| FND-127 | walkthrough **W-17** navegación del expediente + cierre v1.3 (`VERSION` 1.3) + `--demo F21` | 123, 124, 125, 126 | W-17 firmado por el Approver · `python3 tools/compuerta.py --demo F21` → exit ≠0 · luego gate completa → 0 | S |

### Fase 7.8 · v1.4 terminal de admisión (enmienda v3.7)
| FND | Target | Dep | DoD | T |
|---|---|---|---|---|
| FND-130 | `nucleo::N-1`+`B-4` sesión de enfermera con backoff propio y modo admisión: alta de paciente sin enumerar cuentas (R-45) | 082, 030 | `python3 -m unittest pruebas.test_terminal_admision -v` → 0 (PIN de enfermera abre; sin sesión no admite; alta completa) | M |
| FND-131 | `nucleo::N-1` alta de usuarios como caso de uso con validación de rol contra PERMISOS.json (R-13/R-45) | 082 | `python3 -m unittest pruebas.test_alta_usuarios -v` → 0 (rol inexistente rechazado; PIN cifrado PBKDF2) | S |
| FND-132 | `app::F-22` C-24 terminal de admisión: login, alta de paciente, vitales del día y resultado de laboratorio; 0 enumeración de cuentas (R-45) | 040, 130, 131 | `python3 -m unittest pruebas.test_pantalla_terminal -v` → 0 (SPEC sin lista de usuarios; alta y vitales llaman a casos de uso) | M |
| FND-133 | `app::F-14` C-13 sección Usuarios: alta con PIN, 0 claves en claro, sin enumerar en el terminal (R-45) | 131 | `python3 -m unittest pruebas.test_pantalla_usuarios -v` → 0 | S |
| FND-134 | walkthrough **W-18** admisión desde el teléfono + cierre v1.4 (`VERSION` 1.4) | 130, 131, 132, 133 | W-18 firmado por el Approver · `python3 tools/compuerta.py` → exit 0 · `cat VERSION` = 1.4 | S |

### Fase 7.9 · v1.5 (agenda y recordatorios de continuidad — enmienda v3.10, R-48)
| FND | Target | Dep | DoD | T |
|---|---|---|---|---|
| FND-140 | `app::M-1` alivio: registro auto-registrado de pantallas (M-1 ≤400 L) + componente único `tarjeta_prioritaria(filas)` usado por C-21 como primer bloque; elimina la copia pintada a mano (R-39, auditoría v3.10) | — | `python3 -m unittest pruebas.test_tarjeta_prioritaria -v` → 0 (C-21 pinta con el componente · filas == fold de la tarjeta · alergia resaltada) · `python3 tools/compuerta.py` → exit 0 | M |
| FND-141 | `nucleo::B-13` catálogo `DATOS/CATALOGOS/MENSAJES.json` (estado borrador→firmado; filas con `situacion`, `prioridad`, `ventana_antes_dias`, `ventana_despues_dias`, `caduca_si`, `plantilla` con `{{marcador}}`; semilla: recordatorio de cita, control vencido, cuidados por rango de EG, resultado disponible, puerperio) (R-48) | — | `python3 -m unittest pruebas.test_mensajes_catalogo -v` → 0 (semilla presente · borrador no decide · ventanas tipadas · toda plantilla personaliza el nombre) | M |
| FND-142 | `nucleo::B-13` agenda: `crear_cita`, `reprogramar_cita`, `cancelar_cita` (estado tipado agendada/confirmada/atendida/cancelada; rastro de cambio; cancelar nunca borra) + `agenda(ctx, desde, hasta)` == fold de `AGENDA/CITAS.json` (R-48) | — | `python3 -m unittest pruebas.test_agenda -v` → 0 (crear/reprogramar/cancelar con rastro · cancelada sigue en el archivo · agenda == fold) | M |
| FND-143 | `nucleo::B-13` motor de recordatorios: `mensajes_disponibles(ctx, hoy)` (espacios con estado derivado: disponible/escalado; fold de fuentes y entregas), `personalizar_mensaje(ctx, plantilla, paciente_id, extra)` (marcador irresoluto → `DatoFaltante`; jamás valores ni diagnósticos), `entregar_recordatorio(ctx, clave, paciente_id, canal)`, `anular_entrega(ctx, entrega_id)` (R-48, DEC-32/33) | 141, 142 | `python3 -m unittest pruebas.test_mensajes_pendientes -v` → 0 (entregar ⇒ deja de estar disponible · anular ⇒ vuelve · ventana cerrada sin entrega ⇒ escalado · fuente desaparece ⇒ caduca · marcador irresoluto ⇒ error visible) | L |
| FND-144 | `app::F-23` pantalla C-25 Agenda: citas próximas por día, chip en C-01, diálogo "Preparar recordatorios" (lista por prioridad, mensaje personalizado, Copiar y entregar) con 1 acción primaria (R-48, DEC-32) | 140, 142, 143 | `python3 -m unittest pruebas.test_pantalla_agenda -v` → 0 (SPEC con ≤3 acciones · diálogo con 1 acción primaria · mensajes sin `{{}}` residual · manejadores solo llaman casos de uso) | M |
| FND-145 | `nucleo::B-13` `pacientes_por_recuperar(ctx, hoy)` (control derivado vencido sin cita, tipo `Pendiente` de DEC-34) + `indicadores_continuidad(ctx, desde, hasta)` == fold de entregas (recordadas, entregadas, escaladas, retorno tras entrega) (R-48) | 143 | `python3 -m unittest pruebas.test_indicadores_continuidad -v` → 0 (conteos == fold · retorno medido solo con evento de entrega · por_recuperar == fold del catálogo de controles) | S |
| FND-146 | cierre v1.5: gate completa sin avisos `ResourceWarning` + `VERSION` 1.5; W-19 registrada en Libro VI | 144, 145 | `python3 tools/compuerta.py` → exit 0 · `cat VERSION` = 1.5 | S |

### Fase 7.10 · primer uso del equipo (enmienda v3.11, R-49)
| FND | Target | Dep | DoD | T |
|---|---|---|---|---|
| FND-150 | `nucleo::N-1` siembra de `DATOS/PERMISOS.json` con la matriz por defecto DEC-35 en la primera apertura + `hay_usuarios(ctx)` + `crear_usuario` que valida el rol contra la matriz aunque esté vacía (R-49) | — | `python3 -m unittest pruebas.test_primer_uso -v` → 0 (instalación nueva ⇒ matriz con los 4 roles · 0 usuarios ⇒ `hay_usuarios` False · alta ⇒ True · rol inventado ⇒ error visible) | M |
| FND-151 | `app::F-13` C-14 estado «primera vez»: 0 usuarios ⇒ exactamente 1 acción «Crear al dueño» (su nombre = su usuario, PIN×2 con leyenda «mínimo 6», **sin cédula** — enmienda v3.12) que crea el dueño, inicia sesión y cae en Inicio; ≥1 usuarios ⇒ acceso normal; PIN siempre oculto; entrega W-20 (R-49, P2) | 150 | `python3 -m unittest pruebas.test_pantalla_primer_uso -v` → 0 (0 usuarios ⇒ 1 acción · PIN oculto · alta ⇒ sesión y sin botón · ≥1 usuarios ⇒ login) | M |
| FND-152 | `app::F-14` C-13 con sección **Personas** primero: alta de 4 campos (nombre, PIN oculto, rol con los 4 nombres humanos y permisos visibles, cédula opcional); Instalación, Equipos, Catálogos y Exportar sin pérdida; roles salen de la matriz (R-49, DEC-35) | 150 | `python3 -m unittest pruebas.test_pantalla_personas -v` → 0 (sección Personas con 4 campos · roles visibles y no vacíos · PIN oculto · alta llama a `crear_usuario`) | M |
| FND-153 | `app::M-1` menú lateral filtrado por sesión y rol: sin sesión ⇒ solo Acceso; con sesión ⇒ Sistema solo para `ADMIN` (cumple W-13 de R-26) (R-49/R-26) | 150 | `python3 -m unittest pruebas.test_menu_sesion -v` → 0 (sin sesión ⇒ sin administración · ENFERMERA ⇒ sin Sistema · ADMIN ⇒ con Sistema) | S |

### Fase 7.11 · entrada y explicación legibles (enmienda v3.13, R-50)
| FND | Target | Dep | DoD | T |
|---|---|---|---|---|
| FND-160 | `nucleo::B-3` `parser_fecha` ampliado: separadores `- / .` y espacio, año primero (`1999 02 01`), día primero con `/` y `.`, mes de 3 letras con cualquier separador; mensaje de error con todos los formatos (R-50) | — | `python3 -m unittest pruebas.test_formatos_fecha -v` → 0 (acepta `1999 02 01`, `1999/02/01`, `1999.02.01`, `1.2.1999`, `01-ENE-1999`, `1999-2-1` · rechaza `31/02/1999`, `1999-13-40`, basura con error humano · un solo parser) | S |
| FND-161 | `nucleo::B-9` siembra en borrador de los 7 catálogos de la interfaz: `presentacion`, `proteinuria`, `edema`, `ESPECIALIDADES`, `SEGUIMIENTO`, `NOTAS` (tipos NOM-004) y `BANDERAS` con la explicación de las 9 banderas de R-14 (R-50/P6) | — | `python3 -m unittest pruebas.test_semillas_catalogos -v` → 0 (las 7 semillas presentes en borrador con filas no vacías · `catalogos_pendientes` las lista · firmar ⇒ `opciones_catalogo`/`tipos_de_nota` devuelven opciones) | M |
| FND-162 | `app::F-3` componente calendario (ventana con año editable, mes navegable y rejilla de 28-31 días; elegir día ⇒ `YYYY-MM-DD`) + botón «Calendario» en toda casilla de fecha de specs y pintadores (C-03, C-16, C-09, C-10) (R-50, cumple R-11) | — | `python3 -m unittest pruebas.test_calendario_campos -v` → 0 (toda spec con campo fecha ⇒ su casilla pinta el botón · elegir día ⇒ var con ISO · año y mes navegables · teclado sigue aceptando los formatos) | M |
| FND-163 | `app` pintado transversal (`app::F-4`, `app::F-11`, `app::F-14`, `app::F-16`, `app::F-21`, `app::F-5`): banderas de C-16 con su explicación desde `BANDERAS` · casilla de opciones sin opciones ⇒ estado vacío accionable con el nombre del catálogo y la acción de firma (C-16, C-07, C-18, C-23, C-05) · auditoría que clava ambos en toda pantalla (R-50, R-42/R-46) | 161, 162 | `python3 -m unittest pruebas.test_claridad_transversal -v` → 0 (9 banderas explicadas · toda lista vacía muestra su acción · toda fecha con calendario en toda pantalla) | M |
| FND-164 | `app::M-1` (fuente `AYUDAS`) + subtítulos de sus secciones: textos de **todas** las pantallas: AYUDAS y subtítulos reescritos en lenguaje del consultorio (qué es, para qué sirve, qué pasa en cada acción) + etiquetas crudas corregidas (`C-19` sin «Campo (ej. A1)»/«Valor») + criba `test_guia_ui` reforzada (R-50/R-46) | — | `python3 -m unittest pruebas.test_guia_ui -v` → 0 (resumen ≥60 sin eco del título · fragmentos de campos y acciones ≥20 caracteres · sin etiquetas «Campo»/«Valor» · cobertura 100 %) | M |

### Fase 7.12 · credenciales e instalación completa (enmienda v4.0, R-51/R-52/R-01)
| FND | Target | Dep | DoD | T |
|---|---|---|---|---|
| FND-170 | `nucleo::N-1` recuperación de credenciales: `codigo_recuperacion(ctx, usuario_id) -> str` (12 caracteres sin confusos, se muestra una sola vez, solo se guarda su huella en `CONFIG/recuperacion.json`), `restablecer_pin(ctx, usuario_id, codigo, nuevo_pin)` (código anulado tras usarse; mismo cifrado y backoff del PIN) y el respaldo de presencia documentado (vaciar `USUARIOS/` ⇒ primer uso; datos intactos; la baja de una cuenta mata su código) (R-51/DEC-37) | 150 | `python3 -m unittest pruebas.test_recuperacion_pin -v` → 0 (código ⇒ PIN nuevo · código reusado ⇒ rechazado · solo la huella queda en `CONFIG/recuperacion.json` · baja ⇒ código muerto · sin red) | M |
| FND-171 | `app::F-13` C-14 con la vía «¿Olvidó su PIN?»: nombre + código ⇒ formulario de PIN nuevo con 1 acción; la vía queda visible siempre en Acceso (R-51) | 170 | `python3 -m unittest pruebas.test_pantalla_recuperacion -v` → 0 (1 acción · PIN nuevo oculto · la vía visible tras cerrar) | M |
| FND-172 | carpeta `CATALOGOS_BASE/` del producto (rangos, CIE-10, cálculos, curvas, controles por EG, motivos) + copia a `DATOS/CATALOGOS/` en borrador en la primera apertura y en cada actualización D-8 — **solo si aún no existen, jamás pisa un catálogo existente o firmado**; 0 literales clínicos nuevos (R-52/DEC-38) | — | `python3 -m unittest pruebas.test_catalogos_instalacion -v` → 0 (archivos base presentes · primera apertura ⇒ borradores en `DATOS/` · catálogo existente o firmado ⇒ intacto · firmar ⇒ panel/chips los usan · `test_tablas_clinicas` en 0 literales) | L |
| FND-173 | `app::F-7` C-01: los **12 filtros** de R-01 visibles (apellido, nombre, CURP, nacimiento, FUM, EG, último control, médico, teléfono, estado del episodio, con alerta, con adjunto) — el núcleo ya los tiene en `Filtros`; la pantalla los hace reales y W-06 ejecutable (R-01) | — | `python3 -m unittest pruebas.test_filtros_home -v` → 0 (12 casillas presentes · aplicar ⇒ la lista se achica sin perder la búsqueda · W-06 ejecutable) | M |
| FND-174 | `nucleo::N-1` ciclo de vida de cuentas: editar (nombre, cédula), cambiar rol y dar de baja (retira el archivo con rastro en el journal; mata el código de recuperación de la cuenta; nunca toca expedientes; **al menos 1 dueño siempre**; **alta de usuario existente ⇒ error visible**) (R-13) | 150 | `python3 -m unittest pruebas.test_cuentas_vida -v` → 0 (editar/rol/baja con rastro · nunca 0 dueños ⇒ error visible · alta duplicada ⇒ error visible · expedientes intactos) | M |
| FND-175 | `app::F-14` Personas con editar y dar de baja: confirmación que nombra a la cuenta y explica que solo se cierra el acceso (R-13) | 174 | `python3 -m unittest pruebas.test_pantalla_ciclo_cuentas -v` → 0 (editar habilita los campos · baja pide confirmación con el nombre · la lista refresca) | M |
| FND-176 | cierre del ciclo de brechas: gate completa + `VERSION` = **0.2** + **W-20, W-21, W-22 y W-23 firmados** por el Approver (Libro VI) — ciclo independiente del arco v1.0 (las versiones 1.x esperan sus firmas) | 171, 173, 175 | `python3 tools/compuerta.py` → exit 0 · `cat VERSION` = 0.2 | S |
| FND-177 | `tools/lint_juego.py` con regla **L13**: toda entrada `[GUARDA]` de la maestra cita al menos una prueba que existe como `pruebas/test_*.py` y en la lista de suites de la compuerta (cierra el vacío «guarda que no guarda», auditoría AB-04) | — | `python3 tools/lint_juego.py` → VERDE (13 reglas) y `python3 -m unittest pruebas.test_actas -v` → 0 | S |

### Fase 7.13 · gobernanza ejecutable (enmienda v4.2, R-53/DEC-39)
| FND | Target | Dep | DoD | T |
|---|---|---|---|---|
| FND-178 | `GUIAS/` núcleo de gobernanza: `LEEME.md` · `DUEÑO-GOBIERNO.md` · `DUEÑO-RECURSOS.md` · `DUEÑO-HALLAZGO.md` · `DUEÑO-LEXICO.md` + guía piloto `PANTALLA-C-03.md` con sus 7 secciones (R-53/§4.13/§4.14) | — | `python3 -m unittest pruebas.test_guias_dueno -v` → 0 (5 documentos con sus secciones · C-03 con sus 7 secciones · léxico con sus columnas · plantilla con campo de capa · sin jerga cruda) | M |
| FND-179 | guías de las 23 pantallas restantes + ratchet «toda SPEC del catálogo tiene su `PANTALLA-C-xx.md`» (R-53) | 178 | `python3 -m unittest pruebas.test_guias_pantallas -v` → 0 (24 guías presentes · una SPEC sin guía ⇒ rojo) | M |
| FND-180 | manuales de uso por rol `USO-ROL-DUENO.md` · `USO-ROL-MEDICO.md` · `USO-ROL-ENFERMERA.md` derivados de `AYUDAS` y los recorridos W (R-53) | 179 | `python3 -m unittest pruebas.test_uso_por_rol -v` → 0 (3 manuales presentes · cobertura de las acciones del rol) | M |
| FND-181 | `tools/pulso.py`: 1 comando = estado de gobernanza en humano — corre lint + compuerta + `verificar_todo`/`verificar_logica` (si la mesa existe), compara huella de la maestra contra `TRAZABILIDAD`/`INVENTARIO`/`CRONOGRAMA`, lista filas de la ley sin tablero, relojes de ceremonia y la cola de atención del dueño (F22/§4.15) | — | `python3 tools/pulso.py` → exit 0 (`pulso: VERDE`) · `python3 -m unittest pruebas.test_pulso -v` → 0 (derivado con huella vieja ⇒ ≠0 · fila de la ley ausente en `ESTADO.md` ⇒ listada) | M |
| FND-182 | `tools/digesto.py`: digesto semanal con M1–M5 tomadas de fuentes reales (historial de git, `ESTADO.md`, `GUIAS/HALLAZGOS.md`), cola de decisiones y archivos tocados por commit (§4.13g/§4.16) | — | `python3 -m unittest pruebas.test_digesto -v` → 0 (M1–M5 de fuentes, no literales · cola presente · archivos por commit listados) | M |
| FND-183 | buzón `GUIAS/HALLAZGOS.md` + `tools/hallazgos.py`: valida la plantilla de DEC-39, asigna número consecutivo, cuenta recibidos/registrados (base de M4) y los lista al pulso | — | `python3 -m unittest pruebas.test_hallazgos -v` → 0 (fila mal formada ⇒ rechazo en humano · 5 filas ⇒ contador 5 · el pulso los lista) | M |
| FND-184 | lanzadores `Estado.sh`/`Estado.bat` (doble clic ⇒ informe del pulso) + `respaldar_repo.sh`/`respaldar_repo.bat` (copia del repositorio a USB) + arranque de sesión con 1 comando (`pulso.py`) en §4.3 | 181 | `python3 -m unittest pruebas.test_pulso_arranque -v` → 0 (4 artefactos presentes · `Estado.sh` produce el informe del pulso) | S |
| FND-185 | trazabilidad vertical completa: migración de `generar_trazabilidad.py` a `tools/` con las 11 columnas (necesidad → principio → requisito → decisión → fila → código → prueba → tablero → validación → guía → riesgo → métrica) + regla «todo artefacto que la ley crea aparece en la cadena» (PV1) | 179 | `python3 tools/generar_trazabilidad.py` → 0 · `python3 -m unittest pruebas.test_trazabilidad_vertical -v` → 0 (artefacto de la ley sin eslabón ⇒ rojo con mensaje humano) | M |

### Fase 8 · ⛔ v2.0 DOS EQUIPOS (Approver + hardware)
| FND | Target | Dep | DoD | T |
|---|---|---|---|---|
| FND-090 | ⛔ `nucleo::S-2`+`S-3` sync completa: 5 barreras, reconstrucción por paciente, `syncpack` con inventario de binarios (R-27) | 089, 107, 122, 127 + aprobación | `python3 -m unittest pruebas.test_sync_escenarios -v` → 0 (los 8 escenarios de R-27) + contadores F8 | L |
| FND-091 | ⛔ transporte por USB + drill de 2 máquinas | 090 + hardware | `python3 tools/compuerta.py` → exit 0 tras la sesión de enlace · salida copiada del enlace real: 0 eventos perdidos | L |
| FND-092 | ⛔ `app::F-15` terminal `/celular`: reto-respuesta, catálogos servidos, cola diferida (R-27) | 090 + decisión | `python3 -m unittest pruebas.test_terminal -v` → 0 | L |

---

## LIBRO VI · ACEPTACIÓN HUMANA (lo que la IA no puede aprobar sola)

**Walkthrough y aceptaciones por versión (guiones literales):**
- **W-01 Registro con Enter:** en C-03 escribir apellidos, nombres y fecha; Enter valida; Enter da de alta; sin usar el ratón.
- **W-02 Documento en 1 clic:** en C-05 con paciente en contexto, elegir plantilla y abrirla; con la plantilla dañada, el sistema avisa antes de imprimir.
- **W-03 Búsqueda por apellido:** en C-01 teclear "luna"; el resultado aparece al instante.
- **W-04 Progreso vivo:** abrir C-18; el % refleja lo llenado y sube al completar un bloque.
- **W-05 Colisión homónima:** repetir el alta de W-01; C-02 muestra candidatos y no escribe nada.
- **W-06 Filtros:** aplicar CURP y rango de FUM en C-01; la lista se achica sin perder la búsqueda.
- **W-07 Carga de contexto:** abrir un paciente reciente; ficha, controles y últimos documentos visibles sin volver a pedir datos.
- **W-08 Alerta→respuesta:** guardar un control fuera de banda en C-16; la alerta aparece DESPUÉS, con su acción hacia C-07.
- **W-09 Respaldo:** respaldar, verificar y restaurar a carpeta temporal; salida OK en ambos pasos.
- **W-10 Drill sin miedo:** correr el drill; los datos vivos quedan intactos (sentinel).
- **W-11 Export anónimo:** exportar CSV desde Admin; sin nombre ni CURP; abre limpio en hoja de cálculo.
- **W-12 Import con dry-run:** importar un CSV; ver "se crearían N / existentes M / candidatos K / errores E" antes de cualquier escritura.
- **W-13 Roles/PIN:** fallar 5 veces el PIN; cuenta regresiva visible; cerrar y reabrir no da intentos; ENFERMERA no ve C-13.
- **W-14 Actualización:** copiar una carpeta de producto nueva con datos presentes; `VERSION` cambia y los datos quedan intactos.
- **W-15 Estudio del Voluson (v1.1):** en C-20 elegir origen USB con la memoria del equipo; la cola muestra "estudio X de N" con cuenta regresiva; al cerrar, en C-15 aparece el estudio con sus mediciones y sus imágenes; un ítem desconocado aparece en `sin_mapear` y su fila queda lista para firmar en el catálogo.
- **W-16 Estado de salud (v1.2):** abrir una paciente con controles y laboratorio; la tarjeta prioritaria aparece primero (vitales con fecha, EG, alergias); en C-21 el semáforo muestra hemoglobina verde del trimestre, glucosa/HOMA-IR con banda, orina sin proteinuria en verde y química (bilirrubina, LDH, ácido úrico, creatinina, lípidos); un analito sin resultado aparece gris "sin resultado"; en C-17 la curva de tolerancia a la glucosa se corta donde no hay muestra.
- **W-17 Navegación del expediente (v1.3):** abrir un paciente ⇒ C-04 con la tarjeta arriba y la barra de pestañas visible; pestaña Notas ⇒ C-23 conservando barra, paciente y tarjeta; pestaña Estudios ⇒ C-15 con el estudio del Voluson; con la paciente sin notas, C-23 muestra estado vacío con 1 acción "Nueva evolución"; en C-21, "ver cálculo" ⇒ C-06 con glucosa e insulina precargadas; en C-13, sección Dispositivos: alta de un equipo solo con fila.
- **W-19 Agenda y recordatorios (v1.5):** el jueves, abrir C-25 desde el chip de Inicio; ver las citas del lunes con su EG; "Preparar recordatorios del lunes" lista a N pacientes con su mensaje personalizado (nombre y semana de embarazo, signos de alarma); copiar y entregar uno ⇒ deja de aparecer disponible para cualquiera que abra la Agenda; anular la entrega ⇒ vuelve a estar disponible; sin entregarlo y pasada la ventana ⇒ aparece escalado; una paciente con control derivado vencido y sin cita aparece en "por recuperar" con su mensaje de control atrasado.
- **W-20 Primer uso (brecha v3.11, ajuste v3.12):** estrenar el programa en un equipo sin cuentas ⇒ Acceso ofrece «Crear al dueño» como única acción; crear con su nombre (que será su usuario) y PIN de 6+ caracteres escrito dos veces, **sin cédula** ⇒ queda dentro con sesión iniciada y el botón ya no aparece; en C-13, sección Personas: los 4 roles se ven con sus permisos, el PIN queda oculto, la cédula aparece como opcional y un rol inventado se rechaza; sin sesión el menú no ofrece administración y ENFERMERA no ve Sistema.
- **W-21 Entrada y explicación legibles (v3.13):** escribir `1999 02 01` en la fecha de nacimiento ⇒ se acepta y el calendario abre con año, mes y días; en Control prenatal, cada casilla de lista muestra sus opciones (tras firmar los catálogos en Sistema) o el aviso con el nombre del catálogo y la acción, nunca muda; cada bandera de alarma muestra su explicación en palabras humanas; abrir NOM-004 —y cualquier otra pantalla— y responder sin adivinar: qué es, para qué sirve y qué hace cada botón.
- **W-22 Recuperación de credenciales (v4.0):** crear una cuenta ⇒ el código de recuperación aparece **una sola vez** para imprimirlo; desde Acceso, «¿Olvidó su PIN?» con el nombre y ese código ⇒ formulario de PIN nuevo en 1 acción ⇒ se entra con el PIN nuevo; intentar reusar el mismo código ⇒ error humano que dice que ya se usó; con sesión de dueño en Personas ⇒ restablecer el PIN de otra cuenta sin tocar ninguna expediente.
- **W-23 Instalación nueva completa (v4.0):** abrir el equipo recién instalado ⇒ Sistema → Catálogos lista los catálogos base (rangos, CIE-10, cálculos…) como pendientes de firma; firmar los rangos ⇒ el panel de estado de salud sale del gris; firmar CIE-10 ⇒ el apoyo clínico ordena; ninguno de esos textos vive en el programa.

**Instrumento de revisión (v4.2):** las guías `GUIAS/PANTALLA-C-xx.md` (R-53) son la herramienta de ejecución de los W y de la exploración libre del dueño: **1 pantalla por sesión**, con su checklist en la mano; sus hallazgos van a `GUIAS/HALLAZGOS.md` con la plantilla de DEC-39 y el agente los registra en el mismo turno.

**Cierres:** v0.0 con `DEMO v0.0` (FND-052) · v0.1 con gate verde (FND-070) · **v0.2 con W-20, W-21, W-22 y W-23 firmados (FND-176 — ciclo de brechas: primer uso, entrada legible, recuperación e instalación)** · v1.0 con walkthrough **firmado por el Approver** (FND-089) · v1.1 con **W-15 firmado** (FND-107) · v1.2 con **W-16 firmado** (FND-122) · v1.3 con **W-17 firmado** (FND-127) · v1.4 con **W-18 firmado** (FND-134) · v1.5 con **W-19 firmado** (FND-146).

**DEMO v0.0 (guion literal — se ejecuta en FND-052):** *Nota v4.1: en un equipo de estreno, ejecuta primero W-20 (crear al dueño) — este guion asume un dueño con sesión.*
1 `./Iniciar.sh` (o `python3 app.py`) → la ventana «Maternidad · expedientes de maternidad» visible en ≤2 s con cronómetro (F4) · 2 GARCIA/LUNA/MARIA 15-MAR-1990, Enter, Enter → creó · 3 misma homónima → advirtió y esperó · 4 peso 62 / TA 110-70 en C-16 → "Control registrado ✓" · 5 valor fuera de banda → preguntó (no bloqueó) · 6 respaldo a carpeta destino → verificar → OK · 7 drill → OK **y datos intactos** · 8 `python3 tools/compuerta.py` → verde.

**Sentido humano por tarea visible:** FND-041 2 pasos y "ya puedes registrar" · FND-042 confirma, no regaña · FND-050 drill deja todo igual · FND-060 avisa antes de imprimir `{{}}` · FND-062 busca al instante · FND-063 CSV limpio sin identidades · FND-064 reordenar notas no rompe nada · FND-065 no re-pide · FND-066 tres botones, no doce · FND-067 alerta con acción posible · FND-071 FPP/EG solas · FND-073 NOM-004 ya viene lleno · FND-077 la guía ordena sin mandar · FND-078 la línea se corta donde no hay datos · FND-082 cerrar y reabrir no da intentos gratis · FND-089 recorrido W completo · FND-104 el estudio del equipo llega completo, sin captura doble · FND-110 la nota firmada no se edita a escondidas · FND-117 el estado de salud cabe en 1 pantalla con los vitales arriba · FND-123 una sola barra: el expediente siempre empieza igual · FND-140 la tarjeta se pinta en un solo lugar y viaja a toda pantalla con paciente · FND-141 el médico firma los mensajes antes de que salgan · FND-142 la cita deja rastro aunque se cancele · FND-143 el mensaje sale con nombre y semana, nunca con cifras · FND-144 el jueves se ve el lunes completo en una sola pantalla · FND-145 se mide al sistema, no al personal · FND-146 la versión nueva deja la gate verde · FND-150 el equipo recién estrenado encuentra su dueño sin ayuda · FND-151 crear al dueño es una sola acción y no vuelve a aparecer · FND-160 la fecha se escribe como la persona la escribe · FND-161 las listas del consultorio existen antes de que alguien las pida · FND-162 la fecha se elige con un clic en cualquier pantalla · FND-163 cada casilla dice qué le falta y cada bandera explica qué es · FND-164 cada pantalla dice qué es, para qué sirve y qué hace cada botón · FND-170 la credencial olvidada se recupera sin internet y sin llamar a nadie · FND-171 «¿Olvidó su PIN?» está donde usted olvidó el PIN · FND-172 el equipo nuevo trae sus catálogos de fábrica, firmados por el médico, no escritos en el programa · FND-173 en Inicio se filtra por lo que importa, no solo por apellido.

**Sentido humano de las filas sin R propio (§4.2):** FND-001 el programa arranca y nombra el producto · FND-004 dos sesiones no se pisan · FND-005 la ley se verifica sola (presupuestos, ratchets, red, `app → nucleo`) · FND-006 los 4 extractos se demuestran byte a byte idénticos a la maestra · FND-010 una escritura nunca corrompe el archivo · FND-011 5 000 escrituras sin pérdida · FND-012 el listado del disco es fold · FND-033 deshacer deja todo como estaba · FND-040 la ventana no refresca sin cambio de estado · FND-051 invariantes vivas y toda fila ✅ con sus suites listadas en la compuerta · FND-086 sin `pass` mudo, sin referencias a líneas, contraste legible · FND-115 la insulina del panel se lee con la misma banda que HOMA-IR · FND-121 el panel y la tarjeta responden dentro de su umbral (F19/F20).

**Red flags (auto-rechazo si aparecen):** pantalla de ajustes genéricos · jerga de ingeniería en la UI · >3 acciones primarias · abstracciones "para escalar a futuro" sin consumidor · diálogos anidados · cualquier widget sin W que lo justifique · **una enmienda redactada solo para volver verde un rojo**.

---

## ANEXO A · Formato de `ESTADO.md` (archivo de datos)

```estado
# ESTADO — datos de corrida (no es ley; se lee al empezar, se escribe al cerrar)
Estado actual: FND-001 🔄
Última gate verde: (ninguna)
Último lint verde: (ninguna)
| FND | Estado | Elemento |
| FND-001 | 🔄 | VERIFICACION |
| FND-002 | ⬜ |  |
```

Reglas de uso:
- `Estado` ∈ {⬜ pendiente, 🔄 reclamada, ✅ cerrada, ⛔ escalada}; `Elemento` ∈ {BACKEND, FRONTEND, SYNC, VERIFICACION} o vacío.
- **Reclamar** = escribir tu Elemento + 🔄. Si otro Elemento ya reclamó esa fila (🔄/✅), no la toques: elige otra con `Dep` cumplidas (WIP = 1 por elemento).
- ⛔ solo con plantilla `[ESCALA]` (§4.6) copiada en la respuesta.
- Al entrar a una fase nueva se añaden sus filas; todo ID debe existir en el Libro V (lo valida L6).
- Cierre: ✅ con tu Elemento conservado; el commit lleva `FND-xxx: …`.

---

## ANEXO B · Glosario de símbolos, términos y vocabulario

- **Símbolos:** funciones/métodos/variables en `snake_case`; clases y dataclasses en PascalCase; el mismo nombre en código, acta y documentos; sin test = no existe (DEC-13).
- **fold:** `fold(fuente)` = vista derivada reconstruible desde su fuente y verificable por test de igualdad; sin test no existe (P3).
- **ratchet:** restricción que solo puede empeorar en verde; una vez activa (p. ej. un `grep` con conteo fijo) nunca se relaja: relajarla = rojo.
- **gate / compuerta:** `tools/compuerta.py`; un solo comando = lint + suites versionadas; verde obligatorio antes de cada ✅.
- **DoD:** Definition of Done; aquí siempre = salida de comando copiada (§4.3).
- **smoke:** verificación guiada con lista literal de pasos (la DEMO y los W); complementa, nunca sustituye a las suites.
- **WIP:** una sola tarea activa por elemento (DEC-17).
- **PSK:** clave precompartida de 32 bytes que el dueño escribe en ambos equipos (`DATOS/CONFIG/PSK.txt`).
- **HLC:** reloj híbrido `(físico, contador, device_id)` que ordena eventos sin reloj central.
- **syncpack:** paquete cifrado y autenticado de eventos e inventario de binarios (`SHA-256 → ruta`) para transferencia por LAN o USB.
- **dirty-set:** conjunto de pacientes marcados como pendientes para reconstruir solo lo necesario.
- **nodo:** equipo de cómputo del consultorio con `DATOS/` completo y un solo escritor (DEC-06); los nodos convergen por R-27.
- **terminal:** celular o tableta Android que abre la página `/celular` del nodo en la LAN; sin estado propio (DEC-21, §4.12).
- **ingesta:** entrada de un estudio de equipo externo al expediente por `nucleo::S-4` (R-32); USB o red DICOM.
- **estudio de ultrasonido:** `ULTRASONIDO/<estudio_id>.json` + sus binarios en `ADJUNTOS/US/` (R-30/R-31).
- **semáforo:** estado calculado `normal|alerta|crítica|sin dato` de un analito o cálculo; fold de datos contra catálogo firmado; informa, nunca diagnostica (DEC-27).
- **tarjeta prioritaria:** primer bloque de toda pantalla con paciente: vitales de la visita, EG, alergias y problemas activos (R-39).
- **nota firmada:** nota cerrada con autor y cédula; inmutable; editar crea versión nueva (R-36).
- **pestañas del expediente:** barra `PESTANAS_EXPEDIENTE` de orden fijo; puerta del expediente = C-04 (DEC-28/R-42).
- **estado vacío accionable:** pantalla sin datos muestra exactamente 1 acción concreta (R-42; hereda R-21).
- **en_contexto:** bandera declarada en la `SPEC` de la pantalla: ⇒ tarjeta prioritaria (R-39).
- **cita:** agendamiento en `AGENDA/CITAS.json` con estado tipado; agenda ≠ próximo control derivado (R-48; R-41 sigue viva).
- **espacio de mensaje:** situación detectada sin recordatorio entregado; su estado se deduce como fold, nunca se guarda (DEC-33).
- **recordatorio de continuidad:** mensaje personalizado que el software prepara y una persona empuja por WhatsApp, llamada o hoja impresa (DEC-32).
- **tri-state:** en la historia, `"" = sin investigar` ≠ `"no"` (R-17).
- **walkthrough:** recorrido humano W-01…W-14 (v1.0), W-15 (v1.1), W-16 (v1.2), W-17 (v1.3), W-18 (v1.4), W-19 (v1.5), W-20/W-21 (primer uso y entrada legible), W-22/W-23 (recuperación e instalación nueva, v4.0); cada uno firmado por el dueño antes de su cierre (DEC-19).
- **lectura marco:** una sola lectura completa del acta al empezar la sesión (visión de todo el territorio).
- **lectura táctica:** después del marco, ir directo a los IDs que tocan (`R-49`, `FND-150`) sin releer el acta entero.
- **baseline:** la primera corrida de lint + compuerta al empezar: copia las salidas verdes como punto de partida.
- **cierre / claim:** marcar una fila ✅ en `ESTADO.md` con su salida de comando copiada; sin salida verde, no hay cierre.
- **ronda por orden del dueño:** sesión autorizada por frase del Approver para ejecutar varias filas en lote (§4.3.5).
- **versión de la ley vs `VERSION` del producto:** la **versión de la ley** (v3.x, v4.x) numera las enmiendas de este acta; **`VERSION`** es la línea de la raíz del producto y numera sus releases del software (0.1 → 0.2 → 1.0…); no son lo mismo y no se confunden: el cierre FND-176 sube `VERSION` a 0.2, no la ley.
- **Vocabulario de UI** (las palabras del médico, no las del sistema): "expediente" (no "registro de entidades") · "control prenatal" · "tamizaje" · "historia clínica" · "episodio de embarazo" · "consentimiento" · "progreso clínico" · "alerta" (siempre con su acción) · "cita" (no "turno") · "recordatorio" (no "notificación").

---

## ANEXO C · Árbol canónico, pantallas y secciones

### C.1 · Árbol del repositorio (único layout permitido; DEC-11)
```
.
├── ACTA_CONSTITUTIVA.md   ACTA_BACKEND.md   ACTA_FRONTEND.md
├── ACTA_SYNC.md           ACTA_VERIFICACION.md
├── AGENTS.md              ESTADO.md            (creado en FND-001)
├── nucleo.py  app.py      ← el único programa (2 archivos)
├── VERSION                ← una línea: 0.0 → 0.1 → 1.0 → 1.1 → 1.2 → 1.3 → 1.4 → 1.5
├── Iniciar.sh  Iniciar.bat  Estado.sh  Estado.bat  respaldar_repo.sh  respaldar_repo.bat  icono.png
├── CATALOGOS_BASE/        ← catálogos clínicos del producto, se copian a DATOS/ en borrador (R-52)
├── GUIAS/                 ← guías de revisión y gobernanza del dueño (R-53; no es ley; fuera del conteo DEC-11)
├── tools/                 ← lint_juego.py · compuerta.py · generar_actas_elementales.py · equipo_rojo.py · pulso.py · digesto.py · hallazgos.py · generar_trazabilidad.py (FND-181/182/183/185)
├── pruebas/               ← test_*.py + __init__.py
└── DATOS/                 ← creado en runtime por nucleo::D-2 (nunca dentro del conteo)
```

### C.2 · Árbol de `DATOS/` (verdad del médico, DEC-01)
```
DATOS/
├── PACIENTES/A/ … Z/            ← una carpeta por inicial de apellidos; `_OTROS` si no es letra
│   └── <uuid>/                  ← identidad UUID (DEC-04)
│       ├── FICHA.json           ← secundarios (R-03)
│       ├── HISTORIA.json        ← bloques A–M + notas versionadas (R-17)
│       ├── CONTROLES.json       ← controles prenatales (fuente de gráficos)
│       ├── EPISODIOS/<episodio_id>/EPISODIO.json   ← FUM, perfil, estado, anti-D, PARTO (R-35)
│       ├── ULTRASONIDO/<estudio_id>.json   ← estudio importado del equipo (R-30)
│       ├── DOCUMENTOS/          ← copias generadas con paciente
│       └── ADJUNTOS/ + MANIFIESTO.json  ← US/ en binarios de ultrasonido (R-31)
├── _PLANTILLAS/                 ← originales byte-idénticos + textos/ (R-07, R-08)
├── AGENDA/                      ← CITAS.json (agenda del consultorio) y ENTREGAS.json (recordatorios entregados; R-48)
├── CATALOGOS/                   ← rangos, banderas, motivos, presentacion, proteinuria, edema, especialidades, CALCULOS, CIE10, curvas, LAB_RANGOS, NOTAS, SEGUIMIENTO, MENSAJES, US_ITEMS, US_VASOS; estado borrador|firmado
├── USUARIOS/  PERMISOS.json     ← por usuario: rol, hash, `cedula_profesional` para notas (R-36)
├── BITACORA/  EVENTOS/
├── RESPALDOS/
└── CONFIG/                      ← SESION.json (backoff), recuperacion.json (huellas de códigos de un solo uso, R-51), PSK.txt, DISPOSITIVOS.json, INSTALACION.json (datos del centro, casilla, cadencia), journal
```

### C.3 · Catálogo de pantallas (`C-xx`)
| ID | Pantalla | Sección | FND |
|---|---|---|---|
| C-01 | Inicio y búsqueda (buscador de 12 filtros, recientes, recordatorios, 3 acciones) | `app::F-7` | FND-066 |
| C-02 | Desambiguación de homónimos (diálogo) | `app::F-3` | FND-041 |
| C-03 | Registro en 2 pasos | `app::F-3` | FND-041 |
| C-04 | Ficha muestra-editable y puerta del expediente (barra de pestañas, R-42) | `app::F-6` | FND-065, FND-123 |
| C-05 | Documentos (plantillas, consentimientos, adjuntos) | `app::F-5` | FND-069 |
| C-06 | Calculadoras | `app::F-10` | FND-075, FND-125 |
| C-07 | Apoyo clínico (consulta guiada, tamizajes, puerperio, CIE-10, curvas) | `app::F-11` | FND-077 |
| C-08 | Respaldo y restauración (diálogo modal) | `app::F-14` | FND-055, FND-084 |
| C-09 | Episodio de embarazo (captura de FUM) | `app::F-8` | FND-072 |
| C-10 | Vista del embarazo (FPP/EG derivadas) | `app::F-8` | FND-072, FND-120 |
| C-11 | Dictado (aparcado: R-25) | — | — |
| C-12 | Importar CSV (diálogo con dry-run) | `app::F-19` | FND-081 |
| C-13 | Sistema/Admin (Personas · Instalación · Equipos · Catálogos · Exportar) | `app::F-14` | FND-084, FND-126, FND-152 |
| C-14 | Acceso (primera vez: crear al dueño; usuarios, PIN, cuenta regresiva) | `app::F-13` | FND-083, FND-151 |
| C-15 | Estudio de ultrasonido (mediciones, imágenes, `sin_mapear`) | `app::F-18` | FND-104 |
| C-16 | Controles prenatales (10 campos, 9 banderas) | `app::F-4` | FND-042 |
| C-17 | Gráficos (solo lectura) | `app::F-12` | FND-078, FND-119 |
| C-18 | Historia clínica NOM-004 | `app::F-16` | FND-087 |
| C-19 | Diálogo NOM-004 prellenado | `app::F-9` | FND-073 |
| C-20 | Ingesta de equipos (cola USB/DICOM, verify, temporizador) | `app::F-18` | FND-104 |
| C-21 | Panel de estado de salud (semáforo de analitos y cálculos) | `app::F-20` | FND-117 |
| C-22 | Línea de tiempo | `app::F-17` | FND-088 |
| C-23 | Notas, interconsultas y pendientes de la paciente | `app::F-21` | FND-118 |
| C-24 | Terminal de admisión (login de enfermera, alta, vitales, lab) | `app::F-22` | FND-132 |
| C-25 | Agenda de citas y recordatorios (citas próximas, diálogo "Preparar recordatorios"; chip en C-01) | `app::F-23` | FND-144 |

Los datos prioritarios de la visita (tarjeta de R-39) no son pantalla propia: viven como primer bloque en C-01, C-04, C-16, C-18, C-21 y C-23. Las alertas tampoco tienen pantalla propia: viven en la tira de C-01, en C-16 tras guardar y en C-07 (su acción). Los IDs se asignan por enmienda (§4.6).

### C.4 · Registro de secciones de programa (DEC-12; una sección = una zona de libertad)
- **`nucleo.py`:** `N-1` contexto, sesión, permisos (`puede`), backoff · `D-1` escritor único · `D-2` layout y `listado` · `D-3` journal · `D-4` bitácora · `D-5` carga por ciclo y checkpoint · `D-6` respaldo/drill · `D-7` hash, manifiesto, plausibilidad, adjuntos · `D-8` actualización · `B-1` fechas/derivados · `B-2` identidad/matching · `B-3` parsers/bandas · `B-4` casos de uso de pacientes/controles/búsqueda/import · `B-5` historia y notas · `B-6` alertas y calculadoras · `B-7` undo · `B-8` documentos/export · `B-9` catálogos clínicos · `B-10` línea de tiempo · `B-11` dominio de ultrasonido (parseo puro y fold de estudio) · `B-12` laboratorio, panel de estado y pendientes · `B-13` agenda de citas y recordatorios de continuidad (R-48) · `S-1` eventos · `S-2` barreras/ordenación (Fase 8) · `S-3` transporte/`syncpack`/terminal (Fase 8) · `S-4` ingesta de equipos: USB + Storage SCP (Fase 7.5) · `S-5` respaldo por correo: paquete ligero sellado + cola (Fase 5).
- **`app.py`:** `M-1` composición y barra `PESTANAS_EXPEDIENTE` · `F-1` motor de ventana y pintado (incluye el componente único `tarjeta_prioritaria`, R-39, FND-140) · `F-2` tokens/WCAG/ícono · `F-3` C-02/C-03 registro (incluye el componente `calendario`, R-11/R-50) · `F-4` C-16 · `F-5` C-05 documentos · `F-6` C-04 ficha · `F-7` C-01 inicio (chip a C-25) · `F-8` C-09/C-10 embarazo (incluye bloque PARTO) · `F-9` C-19 diálogo NOM-004 · `F-10` C-06 calculadoras · `F-11` C-07 apoyo clínico · `F-12` C-17 gráficos y tendencias · `F-13` C-14 acceso (incluye «¿Olvidó su PIN?», R-51) · `F-14` C-08/C-13 admin (incluye sección Usuarios) · `F-15` terminal `/celular` (⛔ FND-092) · `F-16` C-18 historia · `F-17` C-22 timeline · `F-18` C-15/C-20 ultrasonido e ingesta · `F-19` C-12 import · `F-20` C-21 panel de estado + tarjeta prioritaria · `F-21` C-23 notas y pendientes · `F-22` C-24 terminal de admisión (v3.7) · `F-23` C-25 agenda y diálogo de recordatorios (v3.10).

---

## ANEXO D · Reglas de extracción (fold de los actas elementales)

### D.1 · Algoritmo exacto (lo implementa `tools/generar_actas_elementales.py`; L11 lo verifica)
1. Leer `ACTA_CONSTITUTIVA.md` como texto UTF-8.
2. Extraer el bloque con etiqueta `prologo-comun` (texto entre la línea de apertura de tres acentos graves + `prologo-comun` y su cierre de tres acentos graves).
3. Extraer el bloque `cabecera=<ID>` del elemento (`ID` ∈ {BACKEND, FRONTEND, SYNC, VERIFICACION}) y sustituir en él el marcador `{{PRÓLOGO_COMÚN}}` por el bloque del paso 2 → **cabecera final**.
4. **Cuerpo** = texto de la maestra desde la **línea** que empieza exactamente `## LIBRO I · LEYES` hasta el final del archivo.
5. Dentro del cuerpo, localizar el Libro V por **líneas** (inician `## LIBRO V ·` … `## LIBRO VI ·`) y, en ese tramo, conservar por fase (`### Fase …`) solo las filas de datos `| FND-xxx |` cuyo número (dígitos) esté en el conjunto D.4 del elemento, junto con sus filas de encabezado y separador de tabla. **Bloque de fase** = la línea en blanco que la precede (si existe y no cierra el bloque anterior) + su `### Fase …` + su tabla, terminando en la última línea antes de la línea en blanco que precede a la siguiente `### Fase` o `## `; **la última fase del Libro V se extiende hasta la línea previa a `## LIBRO VI`** (por lo tanto conserva — o elimina — sus blancos finales y el `---` final). **Regla de vacío (evaluada tras el filtrado):** si el bloque no conserva ninguna fila `| FND-xxx |` del elemento, se elimina el bloque entero. El orden de filas conservadas es el original. Consecuencias de la extensión de la última fase: fase final eliminada ⇒ el Libro V queda pegado a `## LIBRO VI`, sin línea en blanco sobrante; fase final conservada ⇒ conserva su `---` y sus blancos tal como la maestra.
6. **Salida** = cabecera final + salto de línea + cuerpo, en una sola cadena UTF-8.
7. `--check`: regenera en memoria los 4 archivos y compara byte a byte; cualquier diferencia → exit ≠0. `--demo`: muta una copia de la maestra y exige también ≠0.

### D.2 · Prólogo común del elemento (bloque `prologo-comun`)
```prologo-comun
1. **Este extracto es tu único import** para construir tu elemento. Lectura *marco* = completo una vez por sesión; *táctica* = navegar por IDs (`R-14`, `DEC-06`, `FND-020`).
2. **Si este archivo y la maestra chocan, gana la maestra** (DEC-14) — tú no editas este archivo ni la maestra: un cambio de ley es conflicto §4.6 con matriz.
3. **Estado:** `ESTADO.md` (datos, Anexo A): se lee al empezar, se escribe al cerrar cada FND; es compartido entre elementos — reclama tu fila (Elemento = el tuyo, Estado = 🔄) antes de empezar; WIP = 1 por elemento.
4. **Verdad = salida de comando** (§4.3 baseline, DoD, lint). Claim sin comando = no hecho. **Nada externo:** todo artefacto que un comando menciona lo crea el Libro V de este mismo acta.
```

### D.3 · Cabeceras por elemento (bloques `cabecera=<ID>`)
```cabecera=BACKEND
# ACTA DE BACKEND — extracto autorizado de la ACTA ÚNICA vigente (su versión es la del H1 de la maestra)

> **GENERADO — NO EDITAR A MANO.** Fuente única: `ACTA_CONSTITUTIVA.md` (única ley editable).
> Regenerar: `python3 tools/generar_actas_elementales.py` · Verificar: `--check` (lo corren el lint L11 y la compuerta).
> Si este extracto difiere de la maestra, **gana la maestra** (DEC-14) y se regenera.

| Campo | Valor |
|---|---|
| Elemento | `nucleo.py` — `N-1` contexto, usuarios y recuperación de PIN · `D-1…D-8` datos · `B-1…B-13` dominio y casos de uso (incluye agenda y recordatorios, R-48) · `S-1` esquema de eventos · `S-4` ingesta de equipos · `S-5` respaldo por correo · siembras y catálogos de instalación (R-50/R-52) |
| Fuera de tu alcance | `app.py` completo (solo lectura) · `tools/` y el armazón de `pruebas/` (`__init__.py` y suites de la compuerta) = VERIFICACIÓN · secciones `S-2/S-3` (el sync completo es del acta SYNC) |
| Contenido | Libros I–IV y VI y Anexos A–F **verbatim** de la maestra; solo el Libro V está filtrado a tus filas (Anexo D) |
| Estado compartido | `ESTADO.md` es único entre elementos: reclama tu fila (Elemento = BACKEND, Estado = 🔄) antes de empezar; WIP = 1 |

## 0 · Prólogo del elemento

{{PRÓLOGO_COMÚN}}

5. **Límites:** `app.py` completo (solo lectura) · `tools/` y el armazón de `pruebas/` (`__init__.py` y suites de la compuerta) = VERIFICACIÓN · secciones `S-2/S-3` (el sync completo es del acta SYNC) — fuera de tu alcance, solo lectura. **Excepciones (§4.3.4/§4.4):** la prueba `pruebas/test_<DoD>.py` de tu fila la escribes tú, y agregas su entrada a la lista de suites de `tools/compuerta.py` (solo agregar; quitar = rojo).

```
```cabecera=FRONTEND
# ACTA DE FRONTEND — extracto autorizado de la ACTA ÚNICA vigente (su versión es la del H1 de la maestra)

> **GENERADO — NO EDITAR A MANO.** Fuente única: `ACTA_CONSTITUTIVA.md` (única ley editable).
> Regenerar: `python3 tools/generar_actas_elementales.py` · Verificar: `--check` (lo corren el lint L11 y la compuerta).
> Si este extracto difiere de la maestra, **gana la maestra** (DEC-14) y se regenera.

| Campo | Valor |
|---|---|
| Elemento | `app.py` — `M-1` composición y barra `PESTANAS_EXPEDIENTE` · `F-1…F-23` motor de interfaz, specs y pantallas (salvo `F-15`, del acta SYNC) |
| Fuera de tu alcance | `nucleo.py` en su totalidad (llámalo, nunca lo edites) · `tools/` y el armazón de `pruebas/` (`__init__.py` y suites de la compuerta) = VERIFICACIÓN · `app::F-15` terminal `/celular` (FND-092 es del acta SYNC) |
| Contenido | Libros I–IV y VI y Anexos A–F **verbatim** de la maestra; solo el Libro V está filtrado a tus filas (Anexo D) |
| Estado compartido | `ESTADO.md` es único entre elementos: reclama tu fila (Elemento = FRONTEND, Estado = 🔄) antes de empezar; WIP = 1 |

## 0 · Prólogo del elemento

{{PRÓLOGO_COMÚN}}

5. **Límites:** `nucleo.py` en su totalidad (llámalo, nunca lo edites) · `tools/` y el armazón de `pruebas/` (`__init__.py` y suites de la compuerta) = VERIFICACIÓN · `app::F-15` terminal `/celular` (FND-092 es del acta SYNC) — fuera de tu alcance, solo lectura. **Excepciones (§4.3.4/§4.4):** la prueba `pruebas/test_<DoD>.py` de tu fila la escribes tú, y agregas su entrada a la lista de suites de `tools/compuerta.py` (solo agregar; quitar = rojo).

```
```cabecera=SYNC
# ACTA DE SYNC — extracto autorizado de la ACTA ÚNICA vigente (su versión es la del H1 de la maestra)

> **GENERADO — NO EDITAR A MANO.** Fuente única: `ACTA_CONSTITUTIVA.md` (única ley editable).
> Regenerar: `python3 tools/generar_actas_elementales.py` · Verificar: `--check` (lo corren el lint L11 y la compuerta).
> Si este extracto difiere de la maestra, **gana la maestra** (DEC-14) y se regenera.

| Campo | Valor |
|---|---|
| Elemento | `nucleo::S-2/S-3` (barreras, ordenación, transporte, `syncpack`) + `app::F-15` terminal `/celular` (única sección de `app.py` fuera de FRONTEND) |
| Fuera de tu alcance | `N-1/D-*/B-*`, `S-1`/`S-4` y `app.py` salvo `F-15` (solo lectura) · `tools/` y el armazón de `pruebas/` (`__init__.py` y suites de la compuerta) = VERIFICACIÓN. Capa ⛔: `S-2/S-3`+`F-15` arrancan solo con Approver + hardware (Fase 8) |
| Contenido | Libros I–IV y VI y Anexos A–F **verbatim** de la maestra; solo el Libro V está filtrado a tus filas (Anexo D) |
| Estado compartido | `ESTADO.md` es único entre elementos: reclama tu fila (Elemento = SYNC, Estado = 🔄) antes de empezar; WIP = 1 |

## 0 · Prólogo del elemento

{{PRÓLOGO_COMÚN}}

5. **Límites:** secciones `N-1/D-*/B-*`, `S-1`/`S-4` y `app.py` salvo `F-15` (solo lectura) · `tools/` y el armazón de `pruebas/` (`__init__.py` y suites de la compuerta) = VERIFICACIÓN. Tu capa `S-2/S-3`+`F-15` es ⛔: arranca solo con Approver + hardware (Fase 8) — fuera de tu alcance el resto, solo lectura. **Excepciones (§4.3.4/§4.4):** la prueba `pruebas/test_<DoD>.py` de tu fila la escribes tú, y agregas su entrada a la lista de suites de `tools/compuerta.py` (solo agregar; quitar = rojo).

```
```cabecera=VERIFICACION
# ACTA DE VERIFICACIÓN Y GUARDAS — extracto autorizado de la ACTA ÚNICA vigente (su versión es la del H1 de la maestra)

> **GENERADO — NO EDITAR A MANO.** Fuente única: `ACTA_CONSTITUTIVA.md` (única ley editable).
> Regenerar: `python3 tools/generar_actas_elementales.py` · Verificar: `--check` (lo corren el lint L11 y la compuerta).
> Si este extracto difiere de la maestra, **gana la maestra** (DEC-14) y se regenera.

| Campo | Valor |
|---|---|
| Elemento | `tools/compuerta.py` · `tools/lint_juego.py` · `tools/generar_actas_elementales.py` · `tools/pulso.py` · `tools/digesto.py` · `tools/hallazgos.py` · `GUIAS/` (R-53) · armazón de `pruebas/` (`__init__.py` + suites de la compuerta; cada `test_<DoD>.py` lo escribe el elemento dueño de su fila, §4.3.4) · formato de `ESTADO.md` · stubs de arranque (FND-001) y fitness functions (FND-005) |
| Fuera de tu alcance | la lógica de producto dentro de `nucleo.py`/`app.py` (salvo los stubs de FND-001): pantallas y reglas son de sus actas |
| Contenido | Libros I–IV y VI y Anexos A–F **verbatim** de la maestra; solo el Libro V está filtrado a tus filas (Anexo D) |
| Estado compartido | `ESTADO.md` es único entre elementos: reclama tu fila (Elemento = VERIFICACION, Estado = 🔄) antes de empezar; WIP = 1 |

## 0 · Prólogo del elemento

{{PRÓLOGO_COMÚN}}

5. **Límites:** la lógica de producto dentro de `nucleo.py`/`app.py` (salvo los stubs de FND-001): pantallas y reglas son de sus actas — fuera de tu alcance, solo lectura. Cada `pruebas/test_<DoD>.py` lo escribe el elemento dueño de su fila (§4.3.4); tú posees el armazón.

```

### D.4 · Conjuntos de FND por elemento
- BACKEND: 004, 010, 011, 012, 013, 020, 021, 022, 023, 030, 031, 032, 033, 050, 053, 054, 060, 061, 062, 063, 064, 067, 068, 071, 074, 076, 079, 080, 082, 085, 101, 102, 103, 105, 106, 108, 109, 110, 111, 112, 113, 114, 115, 116, 124, 130, 131, 141, 142, 143, 145, 150, 160, 161, 170, 172, 174
- FRONTEND: 040, 041, 042, 055, 065, 066, 069, 072, 073, 075, 077, 078, 081, 083, 084, 087, 088, 104, 117, 118, 119, 120, 123, 125, 126, 132, 133, 140, 144, 151, 152, 153, 162, 163, 164, 171, 173, 175
- SYNC: 090, 091, 092
- VERIFICACION: 001, 002, 003, 005, 006, 051, 052, 070, 086, 089, 100, 107, 121, 122, 127, 134, 135, 136, 146, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185

(Toda fila de la maestra pertenece a exactamente un conjunto; lo verifica L11 junto con la unicidad L5.)

### D.5 · Palabras clave de cita para L12 (una cita `DEC-xx (…)` debe contener al menos una)
- DEC-01: filesystem · verdad · formatos abiertos
- DEC-02: stdlib · dependencias
- DEC-03: fold · eventos · proyección
- DEC-04: uuid · match key · identidad · device · hlc
- DEC-05: conceptos separados · funciones separadas · default destructivo · deque
- DEC-06: escritor único · persistir · tabla de consecuencias
- DEC-07: vistas derivadas · fold · proyección
- DEC-08: casos de uso · retorno tipado · ui solo · confirma · reconstrucción
- DEC-09: fall-fast · degradación · errores · salida
- DEC-10: operación · actualización · rollback
- DEC-11: monolito · topología · presupuestos · archivo
- DEC-12: secciones · banner · interfaz
- DEC-13: ortografía · snake · pascalcase · nombre
- DEC-14: fuente única · unicidad · fold de los actas
- DEC-15: estado externo · estado.md · datos
- DEC-16: gate · compuerta · lint · ratchet · salida de comando
- DEC-17: tarjeta · wip · checkpoint · tarea a la vez
- DEC-18: escalado · atención · cuello de botella
- DEC-19: demo · walkthrough · ancla
- DEC-20: micro-formato · enmienda · campos
- DEC-21: celular · terminal · teléfono
- DEC-22: espera · backoff · sleep · cuenta regresiva · castigo
- DEC-23: binario abierto · hash · dedup · original
- DEC-24: pipeline · ingesta · origen
- DEC-25: checkpoint · fold · snapshot
- DEC-26: dispositivo · diccionario · fila · catálogo
- DEC-27: semáforo · fold · informativo · sin dato
- DEC-28: pestañas · barra · navegación · expediente
- DEC-29: claridad · ayuda · lenguaje · jerga · angustia · consultorio
- DEC-30: selección · desplegable · lista · permisos
- DEC-31: semilla · property · invariant · shrink · exploración
- DEC-32: mensaje · preparado · envio · whatsapp · continuidad
- DEC-33: fold · ventana · entregado · escalado · catalogo
- DEC-34: pendiente · lista · una sola casa · fold
- DEC-35: matriz · defecto · roles · sembrada · permisos
- DEC-36: calendario · lista · explicación · humano · pantalla
- DEC-37: credencial · código · un solo uso · presencia · recuperación
- DEC-38: catálogos base · archivo · fábrica · borrador · sin red
- DEC-39: plantilla · hallazgo · ventana · ratificación · digesto

---

## ANEXO E · Catálogo cerrado de calculadoras (exactamente 18 — R-19)

Todas son **informativas**: informan, nunca diagnostican ni prescriben (P6); las que usan umbrales leen catálogos firmados.

| # | Calculadora | Entradas | Salida |
|---|---|---|---|
| 1 | Peso fetal estimado (Hadlock) | DUM, BPD, CC, CF | gramos |
| 2 | Talla fetal estimada | BPD, CF | centímetros |
| 3 | Percentil de peso fetal | peso estimado + EG | curva del catálogo |
| 4 | Media ponderal estimada al nacer | peso + talla fetal | percentil |
| 5 | Ballard de madurez | signos físicos y neurológicos | puntaje informativo |
| 6 | IMC pregestacional | peso, talla | kg/m² + clase OMS |
| 7 | Ganancia de peso recomendada (IOM) | IMC inicial, EG | rango en kg |
| 8 | Superficie corporal (du Bois) | peso, talla | m² |
| 9 | Riesgo tromboembólico (Caprini) | factores clínicos del catálogo | puntaje informativo |
| 10 | PHQ-9 | 9 reactivos | puntaje |
| 11 | qSOFA | TA, FR, FC, estado mental | puntaje (tabla firmada) |
| 12 | NEWS2 obstétrico | signos vitales | puntaje (tabla firmada) |
| 13 | Hemoglobina por trimestre | Hb, EG | banda del catálogo |
| 14 | Criterios OGTT 75 g | 3 glucosas | comparación con catálogo |
| 15 | EG por biometría fetal | fecha del estudio, medida | semanas + días |
| 16 | Screening de preeclampsia | TA + factores del catálogo | banda informativa (tabla firmada) |
| 17 | Apgar | signos a 1 y 5 min | puntaje |
| 18 | Resistencia a la insulina (HOMA-IR) | glucosa e insulina en ayuno | índice informativo con banda del catálogo |

La prioridad visual por motivo de consulta vive en la tabla `MOTIVO→CÁLCULO` de `DATOS/CATALOGOS/CALCULOS.json` (firmable por el médico). Prohibido añadir una decimonovena calculadora sin enmienda (§4.6), y prohibido por P6 que un cálculo de fármacos entre en esta lista.

---

## ANEXO F · Contratos congelados (interfaz pública — cambiarla = enmienda §4.6)

Convenciones vinculantes: Python 3.8+ sin sintaxis posterior a 3.8 (nada de `X | None`, `dict | dict`, `match`); solo stdlib; el mismo nombre aquí, en el código y en las pruebas; resultados de dominio = dataclass con códigos tipados; errores de programación = excepciones (`ValorInvalido`, `DatoFaltante`, `FumInvalida`) y nunca mensajes que clasifiquen (DEC-08); idioma fijo es-MX (sin capa i18n: complejidad sin consumidor); hora local del equipo, sin zonas horarias; CSV de intercambio RFC 4180 (UTF-8, separador coma, decimal punto); toda función listada tiene su prueba antes del ✅ (P8-e). Las pantallas exponen `SPEC` (dato declarativo con `acciones_primarias`) y `manejadores` que solo llaman casos de uso de `nucleo.py`: sin I/O, sin lógica clínica, sin validación de rangos propios (DEC-08).

### `nucleo.py`
| Sección | Firma congelada |
|---|---|
| `N-1` | `crear_contexto(ruta: str) -> Contexto` · `Contexto` con `.cfg: Config`, `.sesion: Sesion`, `.cachas: Dict[str, Any]` · `Config(ruta_datos: str, version: str)` y `Sesion(usuario_id: Optional[str], rol: Optional[str])` como dataclass · 0 mutables a nivel de módulo · `puede(ctx, accion: str) -> bool` (matriz `DATOS/PERMISOS.json` sin huecos) · `hay_usuarios(ctx) -> bool` (0 cuentas ⇒ primer uso; FND-150) · `crear_usuario(ctx, usuario_id: str, pin: str, rol: str, cedula: str = "") -> None` (valida el rol contra la matriz aunque esté vacía; FND-131) · `verificar_pin(ctx, usuario_id: str, pin: str) -> bool` (backoff persistente DEC-22) · `estado_pin(ctx, usuario_id: str) -> Dict[str, Any]` · `codigo_recuperacion(ctx, usuario_id: str) -> str` y `restablecer_pin(ctx, usuario_id: str, codigo: str, nuevo_pin: str) -> None` (R-51/DEC-37, se declaran **antes** de codificarse) |
| `D-1` | `persistir(ctx, ruta: str, datos: Dict[str, Any], op: Op) -> ResultadoEscritura` · `Op(tipo: str, autor: str, detalle: str)` con `TIPOS_OP = ("crear", "actualizar", "fusionar", "eliminar")`; tipo fuera de la tupla → `ValorInvalido` · `ResultadoEscritura(ok: bool, ruta: str, evento_id: str, error: str)` · `leer(ctx, ruta: str) -> Dict[str, Any]` (única puerta de lectura de disco) |
| `D-2` | `inicial(nombre_unico: str) -> str` (A–Z o `_OTROS`) · `ruta_paciente(ctx, uuid: str) -> str` · `listado(ctx) -> List[Dict[str, Any]]` con invariante `listado == fold` |
| `D-3` | `estadisticas_journal(ctx) -> Dict[str, int]` con claves `entradas`, `tope`, `perdidas` · `JOURNAL_TOPE = 5000` |
| `D-4` | `registrar_bitacora(ctx, entrada: Dict[str, Any]) -> int` (offset) · `verificar_cadena(ctx) -> bool` · `lecturas_bitacora(ctx) -> int` |
| `D-5` | `con_ciclo(ctx, clave: str, cargador: Callable[[], Any]) -> Any` (carga única por ciclo) · `lecturas(ctx, clave: str) -> int` |
| `D-6` | `respaldar(ctx, destino: str) -> ResultadoRespaldo` · `respaldar_ligero(ctx) -> ResultadoRespaldo` (ZIP deflate de JSON+bitácora+manifiesto, 0 binarios) · `verificar_respaldo(ctx, origen: str) -> ResultadoVerificacion` · `drill(ctx) -> ResultadoRespaldo` (siempre a carpeta temporal) · `restaurar_en(ctx, origen: str) -> None` · `restaurar_en_sitio(ctx) -> None` (solo sesión ADMIN confirmada; temp + swap) |
| `D-7` | `sha256_archivo(ruta: str) -> str` · `verificar_manifiesto(ctx) -> ResultadoVerificacion` · `revisar_plausibilidad(ctx, datos: Dict[str, Any]) -> List[Hallazgo]` (cada hallazgo ⇒ banner visible) · `guardar_adjunto(ctx, paciente_id: str, estudio_id: str, datos: bytes) -> ResultadoAdjunto` (SHA-256 dedup + `MANIFIESTO.json` + consentimiento de imagen; `ResultadoAdjunto(ok: bool, ruta: str, sha256: str, duplicado: bool, error: str)`) |
| `D-8` | `actualizar(ctx, origen: str) -> ResultadoActualizacion` (solo artefactos de producto, `DATOS/` intacto, rollback) |
| `B-1` | `semanas_desde_eg(fum: date, hoy: date) -> int` (definición ÚNICA, ratchet) · `fecha_parto_fum(fum: date) -> date` · `derivados_gestacionales(fum: date, hoy: date) -> Derivados` · `validar_fum(fum: date, hoy: date) -> None` (única validación, ratchet) |
| `B-2` | `crear_paciente(ctx, datos: DatosAlta) -> ResultadoAlta` con `ResultadoAlta(estado: str, paciente_id: str, candidatos: List[str])` y `ESTADOS_ALTA = ("OK", "EXISTE", "CANDIDATO")` · `identidad_exacta(ctx, clave: str) -> Optional[str]` · `candidatos_difusos(ctx, clave: str) -> List[str]` · `normalizar(texto: str) -> str` · `nombre_unico(apellidos: str, nombres: str, fecha: date) -> str` |
| `B-3` | `parser_fecha(texto: str) -> date` (único parser) · `evaluar_banda(ctx, valor: float, catalogo: str, hoy: date) -> Banda` con `Banda(nivel: str, catalogo_version: str)` y `NIVELES = ("normal", "alerta", "critica")` |
| `B-4` | `registrar_control(ctx, episodio_id: str, valores: Dict[str, Any]) -> ResultadoControl` (alertas solo tras persistir) · `registrar_parto(ctx, episodio_id: str, datos: Dict[str, Any]) -> ResultadoEscritura` (bloque PARTO de R-35) · `buscar(ctx, filtros: Filtros, ciclo: str) -> List[ResumenPaciente]` con `Filtros` de los 12 campos de R-01 · `clasificar_fila(fila: Dict[str, str]) -> CodigoImport` con `CODIGOS_IMPORT = ("CREAR", "EXISTE", "CANDIDATO", "ERROR")` |
| `B-5` | `esquema_historia() -> Dict[str, Any]` (declarativo) · `historia(ctx, paciente_id: str) -> Historia` · `crear_nota(h: Historia, tipo: str, datos: Dict[str, Any]) -> Historia` (fecha/hora + autor de la sesión) · `editar_nota(h: Historia, nota_id: str, texto: str) -> Historia` (versiona) · `firmar_nota(h: Historia, nota_id: str, autor: str, cedula: str) -> Historia` (borrador→firmado; firmada inmutable) · `progreso_historia(h: Historia) -> int` (0–100) · `bloque_1b(h: Historia) -> List[TuplaBloque]` (única función del bloque 1.b) |
| `B-6` | `alertas_para(ctx, paciente_id: str) -> List[Alerta]` (dedupe por `device+HLC`) · `calculadora(ctx, nombre: str, entradas: Dict[str, Any]) -> ResultadoCalculo` (las 18 del Anexo E) · `prefill(ctx, nombre: str, paciente_id: str) -> Dict[str, Any]` (último control + resultados de laboratorio y biometría de US; R-43) |
| `B-7` | `deshacer(ctx) -> ResultadoUndo` (deque que restaura; nunca vacía sin restaurar) |
| `B-8` | `generar_documento(ctx, plantilla: str, paciente_id: Optional[str], datos: Dict[str, Any]) -> ResultadoDocumento` (marcador irresoluto → `DatoFaltante` visible; plantilla original intacta) · `plantillas(ctx) -> List[str]` · `agregar_plantilla(ctx, origen: str) -> str` · `verificar_consentimiento(ctx, ruta: str) -> ResultadoVerificacion` · `exportar_anonimo(ctx, formato: str, destino: str) -> ResultadoExport` con `formato ∈ ("md", "csv")` y la misma puerta para ambos |
| `B-9` | `catalogo(ctx, nombre: str) -> Catalogo` · `firmar_catalogo(ctx, nombre: str) -> str` (devuelve la versión vigente) · `explicaciones_banderas(ctx) -> Dict[str, str]` (texto humano por bandera; R-50) · `tarjeta_roja(ctx, paciente_id: str) -> DatosDocumento` |
| `B-10` | `linea_de_tiempo(ctx, paciente_id: str) -> List[Hito]` con invariante `== fold` de fuentes |
| `B-11` | `parsear_dicom(cuerpo: bytes) -> Dict[str, Any]` (VR explícito/implícito Little Endian, `SpecificCharacterSet` ISO_IR 100, tags privados conservados) · `plegar_sr(cuerpo: bytes) -> Dict[str, Any]` (TID 5000 → campos de R-30; desconocidos a `sin_mapear`) · `plegar_estudio(entradas: List[Dict[str, Any]]) -> DatosEstudio` |
| `B-12` | `registrar_resultado(ctx, paciente_id: str, resultado: Dict[str, Any]) -> ResultadoEscritura` · `panel_salud(ctx, paciente_id: str) -> PanelSalud` (fold semáforo `normal`, `alerta`, `crítica` o `sin dato` contra `LAB_RANGOS`; sin diagnósticos) · `tendencias(ctx, paciente_id: str, analito: str) -> List[Muestra]` · `pendientes(ctx, paciente_id: str) -> List[Pendiente]` (fold de notas/tamizajes/controles) |
| `B-13` | `crear_cita(ctx, paciente_id: str, fecha: str, motivo: str) -> str` (devuelve el id) · `reprogramar_cita(ctx, cita_id: str, fecha: str) -> None` (rastro del cambio previo) · `cancelar_cita(ctx, cita_id: str, motivo: str) -> None` (estado `cancelada`; nunca borra) · `agenda(ctx, desde: str, hasta: str) -> List[Dict[str, Any]]` (fold de `AGENDA/CITAS.json`, orden cronológico) · `mensajes_disponibles(ctx, hoy: Optional[date]) -> List[Pendiente]` (espacios con estado derivado: disponible o escalado; fold de fuentes y `AGENDA/ENTREGAS.json`) · `personalizar_mensaje(ctx, plantilla: str, paciente_id: str, extra: Dict[str, Any]) -> str` (marcador irresoluto → `DatoFaltante`; jamás valores ni diagnósticos) · `entregar_recordatorio(ctx, clave: str, paciente_id: str, canal: str) -> str` (devuelve el id de la entrega) · `anular_entrega(ctx, entrega_id: str) -> None` · `pacientes_por_recuperar(ctx, hoy: date) -> List[Pendiente]` (control derivado vencido sin cita; DEC-34) · `indicadores_continuidad(ctx, desde: str, hasta: str) -> Dict[str, int]` (fold de entregas) |
| `S-1` | `emitir_evento(ctx, tipo: str, datos: Dict[str, Any]) -> Evento` (append-only, HMAC-SHA256, `device+HLC`, versión de esquema al emitir) |
| `S-2` ⛔ | `validar_lote(ctx, paquete: bytes) -> ResultadoBarreras` (5 barreras de R-27) · `reconstruir(ctx, paciente_id: str) -> None` (dirty-set) |
| `S-3` ⛔ | `syncpack(ctx, desde: str) -> bytes` · `abrir_syncpack(ctx, paquete: bytes) -> int` · `inventario_binarios(ctx) -> Dict[str, str]` (SHA-256 → ruta) · `copiar_faltantes(ctx, inventario: Dict[str, str]) -> int` (solo hashes ausentes, 0 duplicados) · `servir_terminal(ctx, host: str, puerto: int) -> None` (socket de `/celular`; el protocolo es puro y se prueba sin red) |
| `S-4` | `ingresar_estudio(ctx, origen: str, payloads: List[bytes]) -> ResultadoIngesta` con `ResultadoIngesta(ok: bool, estudio_id: str, entradas: int, crudos: int, error: str)` y `ORIGENES_INGESTA = ("usb", "dicom")`; escribe solo vía `D-1`/`D-7`; red de ingesta solo aquí (con `S-5`, son las dos únicas secciones con red, P1) |
| `S-5` | `sellar_respald(ctx, datos: bytes) -> bytes` (HMAC-SHA256 en modo contador con la PSK, mismo flujo que el syncpack) · `enviar_respald(ctx, casilla: str, sellado: bytes) -> ResultadoEnvio` con `ResultadoEnvio(ok: bool, en_cola: bool, error: str)`; única sección con `smtplib` (TLS obligatorio; sin red ⇒ cola con reintento, jamás excepción) |

### `app.py`
| Sección | Firma congelada |
|---|---|
| `M-1` | `main(argv: Sequence[str]) -> int` (única composición; arranque = `python3 app.py`) · `PESTANAS_EXPEDIENTE: Tuple[str, ...] = ("resumen", "controles", "historia", "notas", "estudios", "graficos", "timeline", "documentos")` (orden fijo de R-42; pantalla nueva = enmienda) · `tarjeta_prioritaria(filas)` (componente único de R-39, FND-140; **vive en `app::F-1`**, véase C.4) |
| `F-1` | `Motor(estado_inicial: Estado)` con `aplicar(evento) -> None` y `pintar() -> None`; estado en `__init__` **antes** que cualquier widget; encolado de redibujos; 0 `hasattr`; todo refresco nace de un cambio de estado |
| `F-2` | `TOKENS: Dict[str, str]` con pares verificados ≥4.5:1; escribe `icono.png` (256×256) con stdlib si falta |
| `F-3…F-23` | cada pantalla: `SPEC: SpecPantalla` (campos, `acciones_primarias`, atajos) + `manejadores: Dict[str, Callable[[Estado], None]]` que solo llaman casos de uso de `nucleo.py`; y las utilidades públicas que las pruebas ejercitan: `calendario(app, var, permite_futuro=True)` y `campo_fecha_calendario(app, var, campo)` (F-3, R-11/R-50), `opciones_catalogo(ctx, nombre)`, `frase_lista_vacia(ident)`, `nota_lista_vacia(app, marco, campo)` (R-50/R-42) |

### Técnicas stdlib obligatorias (elegancia = pocas partes)
- Escrituras atómicas: `tempfile` + `os.replace` (D-1); reintentar siempre es seguro.
- `.docx`: relleno = copia del zip con `zipfile` sustituyendo `word/document.xml`; la plantilla original queda byte-idéntica (B-8).
- Normalización de identidad: `unicodedata` (B-2); sin tablas propias de acentos.
- syncpack: flujo HMAC-SHA256 en modo contador con `hmac`/`hashlib` (S-3).
- Gráficos: `Canvas` de tkinter, sin librerías de trazado; ícono PNG con `zlib` + `struct` (F-2).
- Fechas: `datetime.date` en memoria; ISO-8601 en disco; un solo parser (B-1/B-3).
- `nucleo.py` jamás importa `tkinter` (costura headless, DEC-11); `app.py` jamás toca el disco (`D-*` lo hace).

### `pruebas/`
- Archivos `pruebas/test_*.py` en paquete (con `__init__.py`); clases en PascalCase (`TestFold`); métodos `test_*`.
- Unitaria: `python3 -m unittest pruebas.test_X -v` · suite completa: `python3 -m unittest discover -s pruebas -v` (la orquesta la compuerta).
- Prueba de pantalla: las suites **sí pueden pintar ventanas reales** (en el extractor: raíz `withdraw()`; eso clava widgets y estados — `test_pantalla_*`, `test_calendario_campos`, `test_claridad_transversal` lo hacen); lo que **solo** el walkthrough humano (Libro VI) valida es el **uso real**: si la pantalla se entiende y el trabajo sale. Ni lo uno ni lo otro sustituyen al otro.

