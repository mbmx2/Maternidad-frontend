# INVENTARIO DE DECISIONES Y FIRMAS — versión 2 (sin tablas · 2026-10-26)

> **Regla de orden (del dueño):** primero se construye completo, después el oficio da
> los visto buenos. Las firmas no frenan la obra: son el producto de la entrega.
> Este documento estructura **cada decisión pendiente suya** con su propuesta, sus
> consecuencias y las decisiones que esas consecuencias desencadenan.

## 0 · Estado verificado de hoy

- Las dos verificaciones automáticas pasan: **151 comprobaciones rápidas** y
  **337 completas**, todas buenas.
- El registro del avance: **1 pantalla verificada, 1 a medias, 16 sin empezar**.
- El frontend se declaró **versión V4** (su genealogía está en `VERSIONES.md`); cada
  pantalla lleva el sello V4·S1 y la verificación lo exige.
- El documento de la lógica se convirtió a **listas sin tablas** (decreto del dueño) y
  la suite de verificación se adaptó a ese formato sin perder fuerza.

## 1 · Tus decisiones con tarjeta (8 · D-1…D-8 — D-2 ejecutada; las demás activas con default)

### D-1 · Qué cuenta como «paquete completo»

- **Propuesta:** el paquete es: las 18 pantallas llevadas a verificado · los umbrales
  clínicos fuera del código en archivos firmables · fechas de control calculadas, no
  adivinadas · el sistema de mensajes integrado · las 18 calculadoras · el mínimo de
  análisis de laboratorio que pide el estándar · la pantalla de acceso · y la
  presentación unificada.
- **Consecuencias de aceptarla:** el tiempo de entrega es el de la cola de pantallas;
  al terminar, se abre el paquete de firmas (§3); nadie firma nada antes.
- **Consecuencia de no decidir:** se procede igual con esa definición (ya es el default).
- **Decisiones derivadas que conlleva:** (a) si más adelante quiere recortar alcance
  (por ejemplo, menos calculadoras), surgirá una decisión de **firma parcial** — qué se
  firma y qué se difiere; (b) si decide que «completo» exige también servidor real, eso
  ya no es frontend y nace un proyecto aparte con su propio plan.

### D-2 · Dónde vive el sistema de mensajes

- **Propuesta:** copiar el motor de mensajes a esta carpeta como copia canónica, con un
  chequeo automático que avise si las dos copias se desincronizan.
- **Consecuencias:** la carpeta principal se puede copiar y llevar sola; el precio es
  mantener dos copias vigiladas (el chequeo ya está instalado para el caso de los
  motores duplicados).
- **Alternativa:** servirlo desde la otra carpeta: sin copia, pero la carpeta deja de
  ser portable y el paquete de firmas tendría que entregar dos carpetas juntas.
- **Decisiones derivadas:** si acepta la copia → hay que decidir **cuál carpeta recibe
  primero las mejoras del mensaje** (regla propuesta: siempre la canónica, la otra solo
  actualiza); si elige el enlace → hay que decidir si el oficio recibe las dos carpetas
  en el mismo sobre.

### D-3 · Cuál hoja de estilo es la canónica

- **Propuesta:** la de la carpeta principal; las otras dos carpetas la adoptan cuando
  les toque su pase de revisión.
- **Consecuencias:** todas las pantallas nuevas se ven igual; al firmar el paquete, el
  equipo ve **un** estilo; las carpetas viejas conviven con su estilo hasta que se toquen.
- **Alternativa (no adoptarla):** el equipo firmaría pantallas con **tres apariencias
  distintas** — lo que confunde el veredicto: pueden rechazar por estilo lo que es
  correcto en lógica.
- **Decisiones derivadas:** si acepta → decidir si las carpetas viejas se migran en su
  pase o se declaran «con estilo propio cerrado»; y decidir si existe revisión de
  contraste (accesibilidad de color) antes de la firma.

### D-4 · Qué pasa con el frontend de la segunda ronda (la carpeta 07)

- **Propuesta:** memoria histórica: fuera de la cola, declarado en el índice del repo.
- **Consecuencias:** un solo frente de construcción; el mapa deja de decir dos verdades;
  su lógica ya fue absorbida por la síntesis.
- **Alternativa:** meterlo a la cola: 25 piezas más con deuda conocida; retrasa las
  firmas semanas.
- **Decisiones derivadas:** si acepta memoria → decidir si se **archiva físicamente**
  (moverla a una carpeta de archivo) o se conserva donde está con su aviso; y decidir
  si sus 4 propuestas de producto pendientes se descartan o viajan al nuevo proyecto.

### D-5 · Firma nominal y fecha por familia de umbrales (nacida en A13, 2026-10-26)

- **Propuesta:** cada familia de catálogo clínico (tensión · FCF · laboratorio ·
  semanas · controles) tiene un dueño nominal y una fecha límite de firma.
- **Consecuencia de aceptarla:** la firma deja de ser «la del paquete cuando llegue» y
  se vuelve un acto con nombre y fecha, exigible por familia.
- **Default mientras no decidas:** todo queda en el paquete §3 (firma médica) hasta
  18/18 — es lo que ya está escrito; no se frena nada.
- **Derivada:** al firmarse la primera familia, nace el acta de firma (quién, cuándo,
  qué versión).

### D-6 · Umbral cambiante en día activo: congelar vs reevaluar (nacida en A13)

- **Propuesta:** cuando el médico cambia un rango firmado a mitad de jornada, **lo ya
  evaluado se congela con la versión con la que se evaluó** y solo lo nuevo se evalúa
  con el rango vigente; nada se reevalúa solo.
- **Consecuencia de aceptarla:** cada alerta/control guarda `version` de catálogo — se
  puede responder «¿con qué criterio de la época salió esta alerta?».
- **Default mientras no decidas:** mismo comportamiento (congelar), pero **hoy no está
  implementado** ni escrito: construirlo con ese default es el RQ-B de A13.
- **Derivada:** si prefieres reevaluación automática, nace la decisión de qué se
  muestra en lo ya cerrado (marca «reevaluado el…») y qué ve el usuario de la alerta
  vieja.

### D-7 · Objetivo numérico de fatiga de alertas (nacida en A13)

- **Propuesta:** el oficio fija el número (por ejemplo: ninguna alerta clínica más de
  45 minutos sin dueño, y tope de avisos por jornada por paciente).
- **Consecuencia de aceptarla:** RB-15 se cierra en diseño y la métrica que ya existe
  en el motor pasa a vigilarse contra una meta, no a coleccionarse.
- **Default mientras no decidas:** meta provisional de 2 avisos por jornada (la que hoy
  trae el motor, declarada cifra huérfana), con rótulo de provisional.
- **Derivada:** al fijarse el número, nace su KPI o su fila de suite.

### D-8 · ¿La ley L-5 tiene filtro de «ruido vs capa»? (nacida en A13, pregunta 20)

- **Propuesta:** un criterio para que no todo comentario genere obra nueva (por
  ejemplo: el trío solo aplica a comentarios que tocan una capa ya existente; los
  demás quedan como nota).
- **Consecuencia de aceptarla:** el backlog de capas deja de crecer con cada frase.
- **Default mientras no decidas:** **sin filtro** — la ley L-5 tal como está: todo
  comentario del dueño genera su trío (es más trabajo, nunca menos control).
- **Derivada:** tocar L-5 es tocar `AGENTS.md`; el cambio se hace con tu frase y su
  prueba de fuego, nunca de oficio.

### D-10 · Las etiquetas del semáforo: ley propia vs propuesta LCL (nacida en A15)

- **Choque:** la ley DEC-27 de este proyecto (`05-LEY`) fija
  `normal · alerta · crítica · sin dato`; el documento 21 (LCL) con su README raíz pide
  `NORMAL · ALERTA · ALARMA · CRÍTICO`. Dos casas, dos etiquetados.
- **Propuesta (si adoptas la del LCL):** enmienda de la ley en la maestra + ajuste de
  rangos, chips y pantallas, conservando **siempre** «sin dato» (lo exige RB-20: falta
  de dato ≠ valor normal) — es decir, serían cinco, o ALARMA reemplaza a una franja
  existente: eso también hay que decidirlo.
- **Consecuencia de no decidir:** se queda la ley actual (el default de abajo).
- **Default mientras no decidas:** **manda DEC-27** — por la cadena de verdad, si la
  casa es la ley no se discute desde una carpeta (mientras tanto, la etiqueta «alarma»
  solo existe como familia de mensajes, no como estado del semáforo).
- **Derivadas:** si cambia → enmienda en la maestra (no aquí) · versión de glosario N0
  del LCL · prueba de las cuatro (o cinco) etiquetas en cada pantalla con semáforo.

*Numeración abierta:* D-5…D-8 nacieron en A13 y D-10 en A15. El **destino del merge
del plan de regreso** (Fase 1 de `PLAN-DE-REGRESO.md`) espera tu frase con su default
recomendado allí anotado: si quieres número propio, entra como **D-9**. Las rondas
siguientes siguen desde **D-11**.

## 2 · Lo que el agente construye sin preguntar

- La cola de 16 pantallas y los dos remates (el tablero de hoy y la estación).
- Sacar los umbrales clínicos del código a archivos firmables, con su generador y su
  copia de resguardo automática.
- Calcular las fechas de control en vez de adivinarlas del texto del caso.
- Integrar el sistema de mensajes (con la decisión D-2 y su default).
- Las 18 calculadoras y el mínimo de análisis de laboratorio.
- La pantalla de acceso y la semilla con los casos que hoy no se demuestran
  (infección y embarazo múltiple) y el horario como archivo, no como código.
- Las mejoras pendientes de trazabilidad (archivo de versiones —ya hecho en V4—,
  huellas locales, tablero de decisiones, suite de presentación ampliada).
- La ruptura de la prueba del autoguardado, en la pasada de la estación.
- Formalizar el enchufe con esquema validable y pasar el mapa de paridad
  pantalla ↔ operación a prueba automática (A13: RQ-G y RQ-D — son de construcción,
  no clínicas; default reversible: esquema JSON y mapa viviendo en la §4 del índice).

## 3 · El paquete de firmas (se activa solo con 18/18 verificadas)

**3.1 · Firma médica:** 40 filas de semanas con contenido por semana · análisis de
lab completos · umbrales de tensión, FCF y tabla de resistencia a la insulina ·
catálogo de controles por situación · interacciones entre medicamentos y alergias ·
y las cuatro decisiones clínicas abiertas: frecuencia de los avisos semanales, tono
del mensaje de duelo, si algún día se pueden difundir resultados por mensaje, y el
horario real del consultorio.

**3.2 · Aceptación del equipo:** las 18 pantallas vivas con su banda de veredicto
persistente, recorridas en su orden, y la hoja impresa con **dos firmas** (una opinión
no aprueba: dos sí). Con ella van el mapa de cumplimiento (qué requisito cubre cada
pantalla) y el registro de auditoría con cada pantalla cerrada.

**3.3 · Firma del dueño (gobernanza):** el tablero de decisiones con cada asunto en
estado y dueño — incluye **quién autoriza los cambios del registro** (hoy lo autoriza
la verificación automática con evidencia, provisional); el archivo de versiones, que
responde «bajo qué lógica y flujo se construyó»; y la aceptación del protocolo.

**3.4 · Lo que NO se firma:** fórmulas de cálculo, textos de interfaz, ni nada de este
papel: cada firma es sobre el **diseño**, no sobre un software en producción — el
producto real exigirá después su propia obra (el backend), que tampoco se firma aquí.

## 4 · Condición de verdad

La sección 2 termina cuando la verificación completa está en verde **y** el registro
dice **18/18 pantallas verificadas o mejor**. Solo entonces se abre la sección 3.

## 5 · Tus decisiones pendientes, resumidas (15 en total)

- **Tres activas ahora** (D-1 alcance, D-3 estilo, D-4 destino de 07): ninguna frena la
  obra — todas tienen default declarado. **D-2 (hogar de mensajes) quedó ejecutada el
  2026-10-26 con su propuesta por defecto**: copia canónica del motor de mensajes en
  `12-FRONT-SINTESIS/mensajes.js` con guardia de deriva en la autoauditoría — reversible
  si prefieres el enlace.
- **Cuatro nuevas de la evaluación externa A13** (D-5 firma nominal de catálogos ·
  D-6 umbral cambiante en día activo · D-7 meta de fatiga de alertas · D-8 filtro de la
  ley L-5): todas con default declarado en su tarjeta (§1), ninguna frena la obra.
- **Una nueva del documento 21 (A15):** D-10 — las etiquetas del semáforo (ley DEC-27
  vs propuesta LCL), default: manda la ley.
- **Una de proceso** (quién autoriza las transiciones del registro): se decide con la
  entrega; provisional: la verificación con evidencia.
- **Seis clínicas o de producto**, todas después de la obra: firma del catálogo de
  semanas y umbrales, tono del duelo, frecuencia de los avisos semanales, difusión de
  resultados, disponibilidad con servidor real.

## 6 · Faltantes de construcción (medidos hoy, sin decisión suya)

- **17 pantallas esperan su reconstrucción bajo DoD v2** (la agenda ya se entregó el
  2026-10-26; las otras 17 siguen con su estado de la ronda anterior).
- Los umbrales clínicos ya viven en `catalogos.js` con su espejo `CATALOGOS.json` (fuera
  del motor); **falta** su firma médica y la regla de espejo al día (ME-08).
- Las fechas de control se adivinan del texto (la ficha no guarda fecha estimada).
- **Conviven dos mundos de pacientes**: la jornada clínica (motor) y la agenda de mensajes
  (sus propias demostraciones). La pantalla de agenda los **etiqueta por origen** y en el
  producto real serán una sola base — trabajo de construcción, no decisión tuya.
- Calculadoras: 2 de 18. Análisis de laboratorio: 9 (el estándar pide más).
- La pantalla de acceso no existe.
- Estándares aplicados: 12 de 35 en las filas del registro; mejoras ejecutadas: 4 de 18.
- 71 archivos sin sellar de integridad; 3 sistemas de estilo conviviendo.
- Sin backend, por diseño: esto es papel usable.

## 7 · Los mejores pasos, en orden y con su porqué

1. **Sacar los umbrales del código y calcular las fechas** — porque tres pantallas de la
   cola dependen de eso; hacerlo después es construir dos veces.
2. **Ampliar la revisión automática de presentación** — para que todas las pantallas
   siguientes nazcan ya juzgadas por ella.
3. **La cola por riesgo clínico:** tablero → estación → laboratorio → avisos → consulta
   → urgencia → … → hoja de veredicto.
4. **Integrar el mensaje** con su chequeo de desincronización.
5. **Dentro de sus pasadas:** calculadoras, laboratorio completo, acceso, semilla.
6. **A mitad de camino:** tablero de decisiones y sellado de archivos.
7. **18/18 verificadas ⇒ se abre el paquete de firmas** (sección 3).
