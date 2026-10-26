# Puente al LCL — el mapa entre el documento 21 (lengua clínica común) y este repositorio

> **Qué es:** el mapa uno a uno entre el documento 21 del dueño (`INVESTIGACION_.../
> 21_LENGUAJE_COMUN_LOGICA_MEDICA.md` — la lengua clínica común: el idioma de la
> práctica como modelo de referencia, del cual los demás lenguajes son traducciones)
> y este repositorio. **Para qué sirve:** para que no existan **dos leyes de
> lenguaje** — el LCL gobierna el idioma del producto; la síntesis gobierna la
> construcción; se apoyan, no se pisan. Registro del pedido del dueño: A15 del
> checklist.

## 1 · Lo que el LCL aporta y aquí falta (los cambios concretos)

- **La alerta con conducta.** Los contratos de aquí dicen «aviso con acción y
  dueño»; el LCL (§0.3) exige cuatro campos visibles: **qué hacer · quién lo hace ·
  para cuándo · cómo se cierra**. Traducción operativa:
  - Criterio nuevo de los criterios de terminado de pantalla (ampliar el D-2b).
  - Comprobación escribible: ninguna alerta en ningún HTML sin sus cuatro campos.
  - Donde vive el cambio: `KPIS-Y-DOD.md` (criterios) + una aserción en la suite de
    presentación.
- **El control anti-calco (§0.2).** El LCL prohíbe anglicismos y calcos de sintaxis
  inglesa en el idioma del producto. Aquí ya existe `buscar-lenguaje.js` con su
  lista de anglicismos de veto; lo que falta es que **el diccionario de candidatos**
  (`LENGUAJE-CANDIDATOS.json`) se gobiernne como el LCL manda: con médico responsable
  por término y fecha de revisión — hoy es una lista de candidatos sin firma.
- **La última prueba del espejo.** El LCL exige: «un médico hispanohablante lee el
  documento y lo corrige». Aquí el equivalente es la sesión del oficio (RQ-F): sin
  esa lectura humana, ningún lenguaje se da por bueno. El LCL le pone nombre a lo
  que el proyecto ya intuía: **la traducción no es un detalle técnico, es una
  puerta humana**.

## 2 · Lo que aquí ya cumple el LCL (para no duplicar ley)

- **Axioma A2 («se anota una vez, lo usa todo el mundo»)** = patrón ML-01 de la
  síntesis («derivar, nunca capturar»). Mismo principio, dos nombres; manda el de la
  casa de construcción, el LCL lo ratifica.
- **Axioma A5 («todo criterio dice de dónde salió»)** = la ley P6 y el catálogo
  firmable con fuente y fecha (RQ-B).
- **Axioma A6 (semáforo común)** = el semáforo de la raíz del producto (NORMAL /
  ALERTA / ALARMA / CRÍTICO) — ya es palabra común a todos los roles.
- **Prueba del espejo (§0)** = la lista de frases del dueño
  (`FRASES-A-TRADUCIR.md`) más `buscar-lenguaje.js`: el registro local de la misma
  prueba, ya con máquina.

## 3 · El glosario N0 — dónde vive y quién es la autoridad

- **Hoy:** `FRASES-A-TRADUCIR.md` (las 25 frases del dueño, fuente única de vetos) +
  `LENGUAJE-CANDIDATOS.json` (los candidatos del agente, 54 en la última medición).
- **Como lo pide el LCL:** la autoridad final de cada término es **el dueño** (su
  traducción), y el diccionario debe llevar **médico responsable y fecha** por
  término — eso es lo que convierte una lista en un glosario firmado.
- **Mecanismo de gobierno:** el mismo del catálogo de umbrales (borrador → vigente,
  firma, fecha) — una sola maquinaria de firma sirve a umbrales clínicos y a
  palabras.
- **Cuando el LCL entre a este repo como documento:** se convierte a listas al entrar
  (decreto D-1 del proyecto: cero tablas en los archivos) o se declara exento como
  documento de investigación — **decisión del dueño, con default: convertirlo**.

## 4 · Qué corrige el LCL a las entregas de este repo (lo ya aplicado)

- «Alerta con dueño» → **alerta con conducta** (en los textos visibles; los nombres
  internos de campo del motor se quedan y van entre paréntesis como nota técnica,
  según el propio LCL §0.3).
- «Capturar datos» → **anotar / registrar**.
- «Trazabilidad» → **procedencia: que se vea de dónde salió el número**.
- «DoD / dimensiones de terminado» → **criterios de terminado** (la clave técnica
  viaja entre paréntesis la primera vez).
- Estas correcciones ya rigen en esta carpeta (13); el resto del repo las absorbe en
  el re-pase de lenguaje (RQ-C), nunca por renombrado masivo — la autoridad es la
  traducción del dueño, no la del agente.

## 5 · El contrato LCL ↔ construcción (una sola frase)

> **El LCL dice cómo se habla; la síntesis dice cómo se construye; el catálogo firmado
> dice con qué números; y la puerta humana del oficio dice si está bien. Ninguno de
> los cuatro manda sobre los otros: cada cual gobierna su dimensión — y cuando un
> concepto nace arriba (facturación o calidad lo pide), pasa por su médico
> responsable antes de entrar al núcleo.**
