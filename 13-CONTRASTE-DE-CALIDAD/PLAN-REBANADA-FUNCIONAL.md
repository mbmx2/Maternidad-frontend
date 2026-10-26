# Plan de la rebanada funcional — que frontend y backend funcionen juntos, y que eso valide (o refute) las plantillas

> **Qué es:** el plan mínimo para que el producto **se pruebe de verdad**: cinco
> operaciones del enchufe servidas por un backend real con archivos como base de
> datos, cableadas al frontend activo **sin tocar una sola pantalla**, y un número
> que responde la pregunta del dueño: ¿las plantillas sirven como fuente de verdad?
> Pedido del dueño el 2026-10-26 («espero que frontend y backend funcionen… al menos
> el backend en las funciones más básicas… para entender la lógica real detrás del
> producto»). Registro: `CHECKLIST-DE-PETICIONES.md` A19.

## 0 · Cómo está hoy (medido, no opinado)

- Las 18 pantallas no se hablan por red: **cero llamadas HTTP** (`grep` de
  `fetch|XMLHttpRequest` = 0). Se hablan por tres cosas: enlaces, el paciente en
  contexto (guardado compartido) y un mismo estado en el almacenamiento del
  navegador.
- El «backend» de hoy es el motor dentro del navegador; la «base de datos» es el
  almacenamiento del navegador (una sola llave con todo el día en JSON).
- El enchufe de 25 operaciones está **declarado y mapeado** (21 cubiertas, 3 a medias,
  1 falta) pero ningún servidor lo implementa.

## 1 · La decisión de stack — opción por defecto declarada (corrección M-06)

- **Por defecto: Python.** Consecuencia: mismo lenguaje que el hogar del producto
  (`app.py`/`nucleo.py`), cero dependencias nuevas (biblioteca estándar: servidor
  HTTP propio + archivos JSON), y el port al hogar es casi mecánico.
- **Alternativa descartada por ahora:** Node (integración más cómoda con las suites
  actuales, pero crea un segundo linaje de lenguaje en el proyecto — exactamente lo
  que las reglas de deriva prohíben).
- **Reversible hasta el primer commit del servidor:** si el dueño prefiere Node, se
  cambia antes de escribir el servidor, no después.
- **Registro:** si el dueño confirma el default, se anota como decisión del
  inventario con su consecuencia; no bloquea la obra (default declarado).

## 2 · Los seis pasos (en orden, cada uno con su puerta)

1. **Cinco operaciones del enchufe primero, no las 25:** `registro_rapido` o
   `buscar` → `listar_dia` → `guardar_control` → `nacer_alerta` → `atender_alerta`.
   Elegidas porque son la espina completa: identidad → día → control → alerta →
   cierre (flujos FL-01, FL-05, FL-08).
   *Puerta:* el catálogo de `COMUNICACION.md` se lee como contrato; cada operación
   implementada se marca en su mapa de acople.
2. **Servidor local mínimo con las tres piezas que la estructura ya exige**
   (`COMUNICACION.md` §1): dominio puro, persistencia con **un solo escritor** y
   escrituras atómicas (temporal + renombrado), y canal de eventos del que todo se
   deriva.
   *Puerta:* las cinco operaciones responden con pruebas propias del servidor
   (incluida la ruptura: escritura interrumpida no corrompe el archivo).
3. **Base de datos = árbol de archivos JSON** (ya es la ley del proyecto: el sistema
   de archivos es la base de datos): `DATOS/pacientes/`, `DATOS/controles/`,
   `DATOS/eventos/diario.jsonl`. Sin motor de bases todavía — el diseño ya decidió
   que no hace falta.
   *Puerta:* corte simulado de luz a mitad de escritura → el archivo queda entero o
   la siguiente lectura lo descarta con aviso; nunca a medias.
4. **Un solo punto de cambio en el motor:** la capa de guardado y lectura del motor
   (hoy habla con el almacenamiento del navegador) gana dos modos — **papel** (hoy) y
   **enchufe** (por red). **Las 18 pantallas no se tocan.** Ése es el contrato del
   enchufe puesto a prueba en carne propia.
   *Puerta:* modo enchufe activado, jornada completa recorrida sin una sola edición
   de pantalla. Si alguna pantalla obliga a editarla, se registra el hueco: es
   exactamente el dato que falta para juzgar las plantillas.
5. **La prueba de la fuente de verdad (el número que pide el dueño):** el servidor
   se construye **solo con los documentos** (`FUENTE-DE-VERDAD.md` con sus diez
   campos, `COMUNICACION.md` con sus ocho, los contratos) y **con prohibición de
   abrir los HTML**. Cada ambigüedad que obligue a mirar una pantalla = **un hueco
   de especificación**, registrado con número. Al final: contratos que sostuvieron
   la construcción sin dibujo ÷ total. **Ese cociente es la respuesta falsable a
   «¿son las plantillas fuente de verdad?»** — si da bajo, se sabe exactamente qué
   spec reescribir.
6. **Puerta de aceptación humana:** la rebanada se muestra recorriendo una jornada
   real — llegar paciente, anotar control, ver nacer la alerta, cerrarla con firma,
   cerrar el día — con el equipo del consultorio delante. Pruebas verdes no bastan;
   el criterio de terminado real es el recorrido en vivo (RQ-F).

## 3 · Qué NO se hace (límites ya decididos que esto respeta)

- No se fusionan los tres motores · no se importa el paquete de acoplamiento del
  backend ajeno · no se tocan los espejos 01–05 · no se sube la versión de la
  síntesis por apéndice · no se traslada este experimento al hogar del producto hasta
  que el plan de regreso lo diga (primero congelar, volver, construir allá).

## 4 · Riesgos y amortiguadores

- **El servidor crece:** se parte por operación; cinco es el tope de esta rebanada,
  no es un marco.
- **El frontend pide ajustes:** cada ajuste se registra como hueco de especificación
  (paso 5), no se hace en silencio — el experimento pierde valor si el enchufe se
  contamina mirando el dibujo.
- **Dos verdades durante el experimento:** el modo papel sigue funcionando; el enchufe
  es un añadido reversible hasta su puerta de aceptación.
- **Duración:** sin servidores complejos ni dependencias; la puerta de iteración
  sigue siendo la verificación rápida del repo.

## 5 · Definición de terminado de esta rebanada

- **Positivos:** cinco operaciones sirviendo · modo enchufe recorriendo la jornada
  sin edición de pantallas · número del paso 5 publicado con su cuenta · acta de la
  sesión del oficio (aunque sea «observado», no «aprobado»).
- **Negativos:** cero pantallas editadas para que el enchufe funcione · cero
  dependencias nuevas sin declarar · cero cifras de este plan sin comando · ningún
  hueco de especificación registrado sin su corrección en la casa que le corresponde.
