# Requerimientos con dientes — RQ-A…RQ-J traducidos a práctica, cada uno con su comprobación

> **Qué es:** los diez requerimientos de la evaluación externa (A13 del checklist),
> reformulados en lenguaje de la práctica (documento 21) y — la corrección importante
> — **cada uno con el comando que lo cierra**. Si un comando no puede fallar, no es
> requerimiento: es deseo con buena redacción. Estado de cada uno: ejecutado /
> en curso / pendiente. Registro del avance: `CHECKLIST-DE-PETICIONES.md` A13.

## RQ-A · Cuando dos libros dicen distinto, manda uno solo y se corrige el otro el mismo día
- **Qué exige:** una cadena de precedencia escrita en un solo lugar, y un
  procedimiento de conciliación cuando dos libros de cifras se contradigan.
- **Comprobación que puede fallar:** abrir `CADENA-DE-VERDAD.md` (la casa) y
  comprobar que existe; la prueba de fuego (inducir un choque de cifras y ver caer la
  suite) **falta**: es RQ-A parte 2, pendiente.
- **Estado:** parte 1 ejecutada (el archivo existe y fue pedido como RQ-A).
- **Dueño:** proyecto. **Dispara:** antes de la siguiente subida de estado.

## RQ-B · Ninguna regla clínica vive en el código: vive en una lista firmada con fuente y fecha
- **Qué exige:** umbrales, rangos y textos clínicos en archivos firmables con estado
  (borrador → vigente), firma del médico y fecha; el código solo aplica lo firmado.
- **Comprobación que puede fallar:** regenerar el espejo y comparar (`node
  12-FRONT-SINTESIS/generar-catalogos.js` y comparar `CATALOGOS.json` antes/después);
  más la comprobación de que el motor no contiene literales clínicos (ya existe en la
  suite del libro: «motor sin umbrales embebidos»).
- **Estado:** mecanismo construido (catálogo + generador + espejo); **falta el
  contenido firmado** — decisión D-5 del inventario (dueño nominal y fecha de firma
  por familia de umbrales).

## RQ-C · El lenguaje del usuario se gobierna como un umbral clínico
- **Qué exige:** las frases del dueño y sus traducciones aprobadas viven en un
  archivo versionado; ninguna pantalla muestra un texto vetado; el agente propone
  candidatos, el dueño es la autoridad final.
- **Comprobación que puede fallar:** `node buscar-lenguaje.js --exigir` — sale en
  rojo si hay frases vetadas vivas, placeholders o anglicismos de la lista. Hoy corre
  como informe en cada T1; **la puerta --exigir está construida pero apagada**.
- **Estado:** en curso — la máquina lee las 25 frases como fuente única y detecta 5
  vivas; falta el encendido de la puerta (dispara: traducciones del dueño).

## RQ-D · Toda acción visible de una pantalla tiene su operación del enchufe, y la pareja se comprueba sola
- **Qué exige:** la tabla de parejas pantalla ↔ operación (las 25 del enchufe) se
  convierte en comprobación automática: si aparece una acción sin pareja, la suite
  falla.
- **Comprobación que puede fallar:** aún no existe como suite; se escribiría
  comparando el catálogo de `06-FUENTE-BACKEND/COMUNICACION.md` contra las funciones
  públicas del motor.
- **Estado:** pendiente (ya registrado en A13). El mapa manual de `INDICE-BACKEND.md`
  §4 es la materia prima.

## RQ-E · Toda pantalla declara qué ve cuando algo falta o falla
- **Qué exige:** cada pantalla declara y prueba su modo degrado: datos vacíos,
  reloj malo, almacenamiento corrupto; y «falta de dato ≠ valor normal» en cada chip
  numérico.
- **Comprobación que puede fallar:** las pruebas de ruptura existentes ya inducen
  semilla alterada (ruptura de hoy y de atenciones); falta extenderlas pantalla por
  pantalla — parte del re-pase bajo DoD v2 (17 pantallas).
- **Estado:** en curso (dos rupturas construidas, 16 pantallas sin su ruptura).

## RQ-F · Nada se declara terminado sin que el oficio lo toque
- **Qué exige:** recorrido guiado por rol (enfermera, médica, dueño) sobre el
  frontend activo, con acta por pantalla y — ideal — ritmo medido por acto.
- **Comprobación que puede fallar:** no hay acta = no hay veredicto. La comprobación
  es binaria y humana: existe el acta firmada o no existe.
- **Estado:** pendiente — kit de entrevista y plantilla de revisión listos en
  `04-METODO-Y-ACEPTACION`; la sesión no se ha hecho.

## RQ-G · El enchufe se especifica como contrato ejecutable, no como prosa
- **Qué exige:** las 25 operaciones con sus ocho campos en un esquema validable;
  toda llamada se valida contra él; media página de «cómo implementar el enchufe
  real» (atomicidad, canal de eventos, identificadores).
- **Comprobación que puede fallar:** aún no existe; sería un validador de esquema
  corriendo contra el catálogo.
- **Estado:** pendiente. La rebanada funcional (su plan) es el momento natural.

## RQ-H · Un agente nuevo puede operar este repo solo con sus documentos
- **Qué ejercicio lo cierra:** ronda de auditoría: agente fresco, solo `AGENTS.md` y
  los documentos, construye una pantalla desde el molde; cada punto donde se detuvo a
  preguntar se vuelve requisito de documentación.
- **Estado:** pendiente — esta carpeta (13) es el primer eslabón: ya consolida
  preguntas, comprobaciones y estados en un solo lugar legible.

## RQ-I · Cero datos reales: la semilla se niega a parecerse a una paciente verdadera
- **Qué exige:** regla de comprobación: la semilla no contiene patrones de datos
  personales reales (teléfonos de 10 dígitos, CURP con forma, nacimientos plausibles).
- **Comprobación que puede fallar:** barrido de patrones sobre la semilla de
  `motor.js` — se escribiría como aserción en la suite del motor.
- **Estado:** pendiente de escritura; el barrido preliminar de esta auditoría no
  encontró CURP ni teléfonos, pero eso es un vistazo, no una comprobación.

## RQ-J · Las alertas se miden: sin objetivo numérico de fatiga, el sistema se apaga en la práctica
- **Qué exige:** métricas del circuito de alertas (abiertas por día, tiempo a
  cierre, reabiertas, vencidas) **con objetivo acordado con el oficio**.
- **Comprobación que puede fallar:** la métrica es vista calculada de eventos ya
  guardados; la comprobación sería un informe que compare contra el objetivo.
- **Estado:** pendiente — el contrato de alertas promete fatiga medida; sin objetivo
  numérico, medir es coleccionar números.

## Resumen de estados (sin vivos)

- Ejecutados: RQ-A parte 1.
- En curso con máquina: RQ-B (falta firma), RQ-C (falta encender puerta), RQ-E (en el
  re-pase de las 17).
- Pendientes con plan: RQ-D, RQ-G (ambos con la rebanada como momento natural), RQ-I,
  RQ-J.
- Pendientes humanos: RQ-F (sesión del oficio).
- Pendientes de documento: RQ-H (ronda de agente fresco).
