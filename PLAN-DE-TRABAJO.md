# PLAN DE TRABAJO — dejar el modelo listo: todas las pantallas implementadas y ediciones protocolizadas

> **Meta:** el frontend con las 18 pantallas implementadas al estándar (18/18 en estado
> `verificado` o mejor, con la verificación completa en verde), y un **protocolo de
> ediciones** para que tocar una pantalla ya implementada sea siempre una edición
> correcta y optimizada — nunca una regresión. Complementa (no duplica) al
> `PLAN-DE-IMPLEMENTACION.md` (los frentes y hitos) y se rige por `AGENTS.md`.
> Sin tablas (decreto D-1). Estado: 2026-10-26.

## 0 · La condición de «listo» (única y medible)

El modelo está listo cuando, en el mismo día:

1. El registro dice **18/18 pantallas en `verificado` o `auditado`** (cero pendientes,
   cero a medias colgados).
2. `./autoauditoria.sh --completo` sale en verde con conteos en vivo.
3. El paquete de firmas del `INVENTARIO-DECISIONES.md` se puede abrir (§3 ahí).

Mientras falte cualquiera de los tres, no se declara listo — aunque todo lo demás esté.

## 1 · La regla de ritmo (aplica a todo el plan)

- **Una pantalla por pasada**, con el protocolo de 7 pasos de la síntesis: leer estándar
  → auditar la pantalla → aplicar → probar en cuatro planos → registrar con huella y
  conteos → verificación rápida en verde → nota en el LEEME.
- **T1 después de cada cambio; T2 antes de declarar cualquier estado.**
- **Nada se declara sin la salida de un comando** que lo pruebe.

## 2 · Los cuatro tramos de ejecución (en este orden, por dependencia)

**Tramo A · Fundamentos compartidos (primero — todo lo demás los hereda):**
- A1 · Sacar los umbrales clínicos del código a archivos firmables, con generador de
  resguardo y suite que exige que el resguardo esté al día.
- A2 · Fecha estimada y diagnóstico estructurado en la ficha; próxima fecha por cálculo
  (hoy se adivina del texto del caso).
- A3 · Integrar el sistema de mensajes (con tu decisión D-2 y su default) con su
  chequeo de desincronización entre las dos copias. **HECHO 2026-10-26**: copia canónica
  en `12-FRONT-SINTESIS/mensajes.js`, guardia de deriva en `autoauditoria.sh` probada con
  fuego, y el módulo completo dentro de la pantalla de agenda (checklist A11).
- A4 · Ampliar la suite de presentación (los cuatro chequeos actuales por pantalla
  crecen a: barra completa con reloj real, banda persistente, color siempre con palabra,
  sin `prompt`/`alert`, sello de versión) — para que **todas** las pantallas siguientes
  nazcan ya auditadas en presentación.

**Tramo B · Lógica clínica viva (la que más daño causa si falla):**
- `hoy` (pasada completa; su mutación directa ya se cerró hoy) → `estacion` (remate:
  cierra la deuda del autoguardado) → `laboratorio` → `pendientes` → `consulta` →
  `urgencia`.
- Qué exige cada pasada: los patrones del estándar aplicados a esa pantalla, su prueba
  de ruptura diseñada y su fila de registro al día.

**Tramo C · Cierre de jornada:**
- `llegada` → `agenda` → `atenciones` (de aplicado a verificado: cierra su deuda de
  autoguardado) → `cierre`.

**Tramo D · Complementos:**
- `calculadoras` (de 2 a 18 con prefill) → `historia` → `ficha` → `documentos` →
  `falla` → `sistema` → `CUMPLIMIENTO` → `HOJA-DE-VEREDICTO`.

*Regla de los lotes:* no se empieza un tramo con el anterior sin cerrar; dentro de un
tramo, el orden es el escrito. Cada pantalla lleva sus cuatro planos de prueba; las que
tocan el motor llevan además sus pruebas de unidad.

## 3 · Protocolo de ediciones optimizadas sobre pantallas YA implementadas

Este es el protocolo permanente a partir de que cada pantalla quede lista. Cinco pasos,
obligatorios en orden:

- **E1 · Antes de tocar:** verificación rápida en verde **y** leer la fila del registro
  de esa pantalla (qué patrones la hicieron `verificada`, con qué pruebas y evidencia).
  Editar a ciegas de la fila es editar a ciegas del estándar.
- **E2 · Definir el cambio y SU prueba antes que el código:** si el cambio altera un
  comportamiento, se escribe primero la prueba de ruptura (la que debe fallar contra el
  defecto viejo). Si no se puede escribir la prueba, el cambio no está entendido.
- **E3 · Editar por una sola capa:** una pantalla por pasada; si el cambio toca el motor,
  se actualiza también la fila de `componentes` y corren las pruebas del motor. Prohibido
  cambiar motor y pantalla juntos sin pruebas de ambos lados.
- **E4 · Verificar y re-registrar:** verificación rápida → pruebas de esa pantalla →
  actualizar **huella y conteos** en su fila (el estado sigue `verificado`: la edición
  no lo baja, pero tampoco lo salta sin evidencia nueva).
- **E5 · Si el cambio altera un patrón del estándar:** es candidato a subir de versión
  de la síntesis (S1 → S2). No se sube por un apéndice: se junta con los cambios de
  patrón pendientes (A1/A2) en un solo golpe, y la subida obliga a re-pasar las filas
  con versión anterior (la anti-regresión ya está cableada).

**Prohibiciones del protocolo:** dos pantallas en una misma pasada · dejar huella vieja
después de editar · marcar estado sin conteos · declarar «listo» un T1 solo (el estado
se declara con T2).

## 4 · Gates (puertas) y ritmo de medición

- **Puerta de iteración:** verificación rápida en verde (segundos) — después de cada cambio.
- **Puerta de transición:** verificación completa en verde — antes de cada fila que
  cambia de estado.
- **Puerta de entrega:** la condición completa de la sección 0 — antes de pedir firmas.
- **Avance medible:** el registro (estados) + el checklist (pedidos) + la autoauditoría
  (verdes). Los tres deben decir lo mismo; si difieren, manda el registro.

## 5 · Riesgos conocidos y sus amortiguadores

- **Duración de la verificación completa:** si pasa de ~5 minutos, se divide por carpeta
  (ya está previsto como mejora pendiente).
- **Decisiones abiertas con default:** las cuatro decisiones estructurales siguen con su
  default declarado — ningún tramo se detiene esperando; si cambian, se re-planifica el
  tramo afectado, no el plan entero.
- **Duplicación de motores:** prohibida; el duplicado 10/11 solo se mantiene con su
  chequeo de deriva.
- **Fatiga de la cola:** si una pantalla crece demasiado, se parte en dos pasadas
  (auditoría primero, aplicación después) — nunca en dos pantallas a la vez.

## 6 · Comandos del día a día

- `./autoauditoria.sh` — puerta de iteración.
- `./autoauditoria.sh --completo` — puerta de transición.
- `./autoauditoria.sh --pantalla <archivo>` — chequeo quirúrgico de una pantalla.
- `node pruebas/<suite>` — las cuatro planos de una pasada.

## 7 · Cómo se lleva este plan

- El avance de este plan se lee en `SINTESIS-REGISTRO.json` (estados) y en
  `CHECKLIST-DE-PETICIONES.md` (pedidos).
- Cada tramo cerrado se anota en el LEEME de la carpeta con una línea y su salida de
  comando. Al cerrar el Tramo D, se ejecuta la condición de la sección 0 y se abre el
  paquete de firmas.
