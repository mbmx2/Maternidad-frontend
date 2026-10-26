# CONTRATO · MOTOR DE ALERTAS — el corazón de la propuesta de valor

> **Estado: EXPLORACIÓN** (v1 · 2026-10-23). No es ley; cambia gratis. Fuentes:
> `GUIAS/LOGICAS/SISTEMA-DE-ALERTAS.md` (la doctrina de los seis tipos), doctrina pilar
> 10, dibujo `PROPUESTAS/ALERTAS.html`. Este contrato traduce esa doctrina en lógica
> ejecutable.

## 1 · Qué garantiza

- **Ningún aviso sale sin acción, dueño y —si aplica— plazo.**
- **Los números se vuelven palabras:** todo cálculo entrega resultado + rango +
  interpretación, nunca un suelto de laboratorio.
- **Las reglas son de ustedes:** umbrales, rangos e interacciones viven en catálogos
  firmados; el código solo ejecuta, jamás decide lo clínico.
- **Los datos fundamentales acompañan siempre:** alergias, tipo de sangre, medicación y
  condiciones crónicas, presentes en toda escritura.
- **La prescripción se verifica antes de guardarse** —alergia e interacción—; ese es el
  único aviso que puede detener.
- **Los plazos se convierten en pendientes fechados** —0 plazos huérfanos—, y la fatiga
  se mide: cuántos avisos, de cuál tipo, cuántos atendidos.

## 2 · Lógica total

**Tipos (los seis, cerrados):** `verde` (está bien —también se dice) · `plazo`
(repetir/check en fecha ⇒ crea pendiente con dueño) · `problema` (fuera de lo esperado,
con acción, después de guardar) · `urgencia` (además, sube al canal de urgencia) ·
`contexto` (permanente: alergia, sangre, medicación, crónicas — no dispara: está) ·
`interacción` (al prescribir; el único que puede detener).

**El circuito (una sola fábrica):** entrada (signos, laboratorio, prescripción,
autohistoria futura) → **cálculo automático cuando sus entradas existen** (el cálculo no
es una pantalla a la que se va: ocurre con los datos) → evaluación contra **catálogo
vigente firmado** (rangos por analito y semana, umbrales, interacciones, alergias
cruzadas) → **evento de aviso** (tipo, texto con acción, plazo, dueño por rol, paciente,
protocolo si aplica) → presentación (panel post-guardado · cinta para contexto ·
tablero para urgencia · agenda para plazos) → seguimiento (estado: mostrado → atendido |
vencido) → bitácora (disparos por tipo: la fatiga, medida).

**Reglas de disparo:** solo lo **firmado y vigente** dispara (catálogo borrador ⇒
el sistema anuncia «reglas sin firmar», nunca un verde falso) · el mismo aviso sin
cambio **no se repite** en la siguiente visita hasta su plazo (deduplicación por
(paciente, regla, ventana)) · toda regla que dispara sin acción escrita es **rechazada
al firmarse** (plantilla con campos obligatorios) · el tipo urgencia entrega su evento
al canal de urgencia (módulo separado, mismo suceso) · la interacción se evalúa **antes**
de que el guardado de la prescripción complete: choca ⇒ se detiene con salida nombrada
(elegir otro · forzar con confirmación que nombra el riesgo y queda en bitácora).

**Invariantes:** (i) 0 avisos sin acción; (ii) 0 umbrales en el código (ratchet
existente, extendido); (iii) 0 prescripciones guardadas sin verificación; (iv) todo
plazo ⇒ pendiente con fecha y dueño; (v) la misma regla con los mismos datos no produce
dos avisos en la misma ventana; (vi) los contextos (alergia/sangre/medicación) están en
el 100 % de las escrituras; (vii) toda emisión queda en la bitácora con su estado final.

**Casos borde:** paciente con dos protocolos y un aviso de los dos (el aviso lleva el
protocolo al que pertenece; si es de la paciente entera, va sin protocolo — no se
inventa uno) · laboratorio repetido el mismo día (deduplicación por análisis+fecha) ·
límite exacto del umbral (148 de 148: definido en el catálogo, con su operador —nunca
supuesto por el código) · catálogo de interacciones vacío (el sistema anuncia
«verificación incompleta» en la prescripción, no un «todo bien») · texto de aviso mal
escrito (al firmarlo, la plantilla exige acción; si falta, no se firma) · alergia
desconocida («sin alergias conocidas» es una respuesta explícita; el hueco no cuenta
como «no aplica») · urgencia capturada con error (falsa alarma: resolución con motivo,
contador de fatiga).

**Errores:** aviso que no dispara (caso de prueba por regla: toda regla del catálogo
tiene su disparo y su no-disparo probados) · aviso doble (invariante v) · plazo sin
pendiente (invariante iv con prueba) · texto técnico en mensaje (criba de palabras
técnicas en la plantilla de mensajes —la misma suya de claridad—).

## 3 · Por qué esta lógica

Descartado: rangos en el código (rompería el principio de que el médico firma los
umbrales —y ya hay examen que lo vigila). Descartado: avisos que solo muestran números
(sin acción = ruido; su investigación dice que las alertas son lo peor evaluado — la
cura es acción y dueño). Descartado: detener todo lo demás por seguridad (solo
detiene la prescripción peligrosa: el resto, avisa sin cortar el trabajo). Descartado:
notificaciones externas (correo/mensajería) — fuera de su primera ley.

## 4 · Cómo se implementa

**Símbolos nacituras:** `evaluar_entradas` (cálculo automático), `evaluar_reglas`
(catálogo vigente), `emitir_aviso` (evento con tipo/acción/plazo/dueño),
`verificar_prescripcion` (interacción+alergia, previo a guardar),
`bitacora_avisos` (disparos y estados). **Catálogos nuevos:** rangos con umbrales
operados · interacciones y alergias cruzadas · textos de aviso con acción obligatoria.
**Presentación:** los dibujos ya hechos (ALERTAS, CONTROL, CONSULTA, CALCULADORES) —
este contrato es su contraparte de máquina.

## 5 · Cuadre: promesa ↔ prueba

Números del sistema de alertas (los8). **Pruebas al construir:**
`test_regla_dispara` y `test_regla_no_dispara` (por cada regla, sus dos casos) ·
`test_cero_umbrales_en_codigo` (extensión del ratchet existente) ·
`test_prescripcion_detenida` (alergia conocida ⇒ guardado no completa) ·
`test_plazo_crea_pendiente` · `test_deduplicacion_de_avisos` ·
`test_contextos_en_escritura` · `test_texto_de_aviso_con_accion` (criba de plantillas).

## 6 · Prevención de problemas (posibles e improbables)

- **Fatiga de alerta** (el previsible) — respuesta: dueño por rol, deduplicación, meta
  medida (objetivo: <2 avisos por visita; más, a plazos), contador semanal por tipo y
  ajuste de umbral por firma.
- **Verde falso por catálogo sin firmar** — respuesta: invariante de «solo vigente
  dispara» + aviso visible de «reglas sin firmar».
- **El aviso correcto en la pantalla equivocada** — respuesta: cada tipo tiene su
  casa (post-guardado, cinta, tablero, agenda); un aviso nunca está solo donde nadie
  lo mira: el urgente además va al canal de urgencia.
- **Interacción sobre lista vacía dando paz falsa** — respuesta: la prescripción dice
  «verificación incompleta» hasta que el catálogo exista.
- **Números que asustan sin decir nada** — respuesta: plantilla con interpretación
  obligatoria; prueba que rechaza textos con solo cifras.
- **La misma alerta cada visita** — respuesta: deduplicación por ventana (v).
- **Plazo que se olvida** — respuesta: invariante (iv): el pendiente nace en la misma
  transacción del aviso; si falla, falla el guardado completo (atómico: o aviso con
  pendiente, o nada).
- **Regla clínica equivocada firmada** — respuesta: el culpable es el catálogo y su
  firma; la bitácora muestra qué regla produció qué (auditoría para corregir con
  número, no con sospecha).
- **Pregunta sensible que dispara un aviso incómodo a quien no corresponde** — respuesta:
  los avisos tienen dueño por rol; lo sensible pertenece al catálogo que su médico
  diseñe, con la visibilidad que él declare (el mecanismo no decide ética).
- **Cálculo que corre sin datos completos** (imputando) — respuesta: sin sus entradas,
  el cálculo no corre y el chip dice «sin datos» (gris honesto, ya existe).
- **Interacción ignorada por prisa** (forzar sin leer) — respuesta: forzar exige
  confirmación que nombra el riesgo y queda en bitácora; se puede auditar cuántas
  fuerzas pasan por semana.
- **Denegación del servicio por 15 formularios futuros** (autohistoria) — respuesta:
  los formularios alimentan esta misma fábrica por cola del escritor único (mismo
  camino que todo); la cola es kilobytes.

## 7 · Estado y bitácora

**EXPLORACIÓN** · v1 2026-10-23 — primera tanda, sobre la doctrina ya escrita. Pendiente:
los catálogos clínicos reales (rangos, interacciones, textos con acción) los firma su
médico — aquí está la máquina, no el contenido.
