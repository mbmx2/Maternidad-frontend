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

## 1 · Decisiones ACTIVAS ahora (4) — con propuesta, consecuencias y árbol derivado

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

## 5 · Tus decisiones pendientes, resumidas (10 en total)

- **Cuatro activas ahora** (D-1 alcance, D-2 hogar de mensajes, D-3 estilo, D-4 destino
  de 07): ninguna frena la obra — todas tienen default declarado.
- **Una de proceso** (quién autoriza las transiciones del registro): se decide con la
  entrega; provisional: la verificación con evidencia.
- **Seis clínicas o de producto**, todas después de la obra: firma del catálogo de
  semanas y umbrales, tono del duelo, frecuencia de los avisos semanales, difusión de
  resultados, disponibilidad con servidor real.

## 6 · Faltantes de construcción (medidos hoy, sin decisión suya)

- 16 pantallas sin empezar y 2 a medio camino.
- Los umbrales clínicos siguen dentro del programa, sin archivo firmable ni resguardo.
- Las fechas de control se adivinan del texto (la ficha no guarda fecha estimada).
- El sistema de mensajes no está integrado en esta carpeta.
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
