# IMPLEMENTACIÓN DESDE LA VERDAD — la forma del entregable y sus decisiones técnicas

> Registro vivo (2026-10-23). Responde a la pregunta del dueño: **si el agente tuviera
> que escribir de cero partiendo de la fuente de verdad (flujos + lógicas + contratos +
> HTML), ¿cuál es la mejor forma del entregable y qué decisiones técnicas hay que tomar
> para que sea mantenible en el tiempo y fiel a la verdad?** Marcas: **[d]** decisión ya
> tomada por la ley o por la verdad (no se renegocia) · **[r]** recomendación con su
> porqué (ratificable) · **[o]** decisión suya (dueño/consultorio).

---

## Parte 1 · La forma del entregable — el paquete-verdad

**Principio:** el entregable no es «el código». Es un **paquete-verdad** en el que cada
pieza trae su cadena de fidelidad visible. Seis componentes, ninguno opcional:

1. **El programa** — donde la verdad vive ejecutable. Con sus límites conocidos
   (dos archivos hoy; la estructura interna es la decisión 1 abajo) y su disciplina de
   secciones (≤500 líneas, función ≤60, complejidad ≤10 con fila) **[d]**.
2. **Las pruebas como especificación ejecutable** — no «pruebas del código»: pruebas que
   **son** la verdad traducida. Cada invariante de un contrato lleva, en su sección 5,
   el nombre de la prueba que lo verifica; el nombre existe antes que el código
   (spec-first) **[d]** (su regla de contrato con cuadre).
3. **El examen extendido con los números** — la compuerta suma, módulo a módulo, las
   medidas de la doctrina (las 26+): lo que la verdad dijo que mediría, se mide en cada
   cierre **[r — es la reparación M3: números → medidas]**.
4. **Los contratos aplicados** — de EXPLORACIÓN a APLICADO solo cuando el dibujo
   correspondiente tiene doble veredicto del oficio; el contrato aplicado es la **ley
   del módulo**: sin él, la fila no arranca **[d por la familia de contratos; la
   obligatoriedad total se decreta en la enmienda v4.3]**.
5. **La trazabilidad vertical generada** — necesidad → lógica → contrato → fila →
   código → prueba → dibujo verificado, generada por herramienta (FND-185) con regla
   «toda pieza de la verdad aparece en la cadena» **[d por decreto; sin construir]**.
6. **La entrega con formato P9 y su VERSION** — código de versión, notas de versión en
   humano, y «dónde revisar» en cada cierre **[d]**.

**Regla de enlazamiento (lo que hace mantenible el paquete):** nombres que se reconocen
entre sí —la prueba `test_<modulo>_<invariante>` cita al contrato; la fila cita al
dibujo; la trazabilidad los une—. Un cambio en la verdad deja **rastro en los tres
lados** (contrato, código, prueba) o el examen se pone rojo.

**La arquitectura de forma (las capas internas que la verdad exige):** dominio puro
(protocolos, alertas, urgencia —reglas sin pantallas, sin disco, sin reloj del sistema
fácil de probar) · persistencia (un solo escritor, atómico, con diario —ya es verdad
**[d]**) · eventos del día (el canal único del que el tablero se deriva —**[r]**: los
eventos se **persisten**, porque el tablero es fold de hechos y un fold se reconstruye)
· presentación (SPEC declarativo para lo estándar + pintores para lo complejo, con el
SPEC como fuente de las pruebas de contrato —**[r]**) · y servidor local (solo cuando
abra su fase) — todo dentro de los límites de la ley.

**La decisión de ruta (la honesta, antes que las técnicas):** ¿de cero absoluto o de
cero verdad? Tres caminos:
**(A) Cero absoluto** — reescribir todo: pagaría de nuevo la armadura que hoy tienen 510
pruebas (los casos raros que ya se ganaron: discos llenos, journal, actualizaciones a
mitad). Rápido para la forma, caro para la armadura.
**(B) Cero de verdad — recomendado:** reconstruir **desde cero la capa de presentación
y los cinco órganos nuevos** con sus contratos, **conservando el núcleo de integridad
(D-*, B-*) con sus pruebas como historia ejecutable** —cero de verdad, no cero de
memoria—. Es lo que el mapa de 5 fases ya implica **[r]**.
**(C) Evolución fila por fila** — el camino actual de la ley: válido para las filas
viejas que sobrevivan al contraste L-06.
Los tres caminos comparten el paquete-verdad; lo que cambia es cuánta armadura se
hereda.

---

## Parte 2 · Catálogo de decisiones técnicas (todo lo que hay que decidir)

### A · Estructura del código

1. **Archivos: monolito o paquete.** Opciones: mantener `nucleo.py`+`app.py` con
   disciplina de secciones; o paquete `nucleo/` + `app/` (módulos por órgano). La
   verdad nueva añade5 órganos y el choque de límites ya está medido (núcleo al 94,6 %).
   **[r]** decidir ANTES del primer órgano: enmienda con matriz si se paqueta —dejar de
   decidirlo en caliente, que fue el error ya vivido con DEC-11.
2. **Presupuestos numéricos** (sección ≤500, método ≤60, cc ≤10, total): **[d]** — F-1
   ya está en 498/500: la decisión 1 lo libera o lo parte.
3. **Dirección de dependencias:** presentación → dominio → persistencia; jamás al
   revés; solo persistencia hace E/S de archivos (hoy: solo `D-*`) **[d]**, con su
   chequeo automático existente.
4. **Estado:** estado de sesión global mínimo; **estado por atención con clave
   (atención, paciente)** para lo concurrente **[r, del contrato de atenciones]**.
5. **Canal de eventos:** un canal de eventos del día, **persistido**, del que tablero,
   agenda y urgencia se derivan **[r]**; eventos idempotentes (repetir no duplica).
6. **SPEC vs pintor:** SPEC declarativo es fuente de verdad de lo estándar (genera
   pantallas y pruebas de contrato); pintor solo donde el SPEC no alcanza; **la
   superficie pública de cada módulo es el Anexo F** **[d]**.
7. **Superficie pública:** solo lo probado es público (su regla ya existente) **[d]**.

### B · Datos y verdad

8. **Sistema de archivos con JSON legible + diario** como verdad **[d]** — no se cambia
   por SQLite: los formatos abiertos son un valor suyo (el expediente se lee con un
   editor).
9. **Versionado de esquema:** cada documento con `version`; **migradores puros** que
   avanzan sin retroceder, con prueba de migración **sobre datos vivos** (hoy declarado
   hueco, hoy decisión): **[r]** declararlo obligatorio en cada fila que toque formato.
10. **Catálogos:** archivos con versión y firma (borrador→firma→vigente); el programa
    lee solo vigentes; migración de catálogos = borrador aparte, jamás pisar firma
    **[d]**.
11. **Idempotencia:** uuid para identidad, contador de tiempo para orden (su diseño
    actual) **[d]**; claves de idempotencia en toda entrada externa futura (QR, cola
    diferida) **[r]**.
12. **Vistas:** toda vista derivada = cálculo de hechos con prueba de igualdad; nada de
    estado guardado dos veces **[d]** — la materialización para rendimiento solo con su
    prueba de equivalencia **[r]**.
13. **Documentos generados:** `.docx` con la plantilla del médico y relleno del programa
    (su verdad de documentos) **[o contenido / r mecanismo: fusión de campos sobre zip
    con la librería estándar]**; CSV anónimo **[d]**.
14. **Borrado y derechos ARCO:** política de supresión de paciente con límites clínicos
    — sigue sin decretarse **[o — hueco normativo abierto]**.

### C · Concurrencia y rendimiento

15. **Un solo escritor con cola:** todo lo que llega de estaciones, teléfonos o
    futuros formularios entra por **cola al escritor único**; los hilos solo aceptan y
    responden **[d en espíritu, r en diseño de cola]**.
16. **Presupuestos como constantes en un solo lugar** (umbrales de reloj del tablero,
    tamaños de ventana, colores) — jamás escritos en el cuerpo del código **[r]** — es
    el mismo principio que sus catálogos clínicos.
17. **Medición:** decidir qué números viven en el examen y cuáles en la DEMO —hoy 10 de
    22 están dormidas: F4, F5, F6, F7, F10, F14, F21, F22 **[r — reparación M3]**—.
18. **Crecimiento a 10 años:** rotación de diario y bitácora ya decidida **[d]**; falta
    declarar el techo de crecimiento (¿cuánto dura un expediente de 10 años en disco?)
    **[r]**.
19. **Repintado:** trabajo pesado fuera del hilo de dibujo; repintado <0,1 s **[r, de
    la doctrina de ventana]**.

### D · Seguridad

20. **Dato en reposo:** cifrado por el sistema operativo de las máquinas (O3) **[o —
    pendiente de activarse]**; el programa no cifra su propio árbol **[d]**.
21. **Respaldo por correo:** jamás incluye llave, usuarios ni expedientes — la enmienda
    que lo decreta, sin firmar **[o — la más urgente de las firmas pendientes]**.
22. **PSK:** en papel, en caja (O5) **[o — 10 minutos de su tiempo]**.
23. **PIN:** largo y espera ya **[d]**; **¿lista de PINs débiles rechazados?** — sin
    decretar **[r]**.
24. **Permisos:** matriz por rol **[d]**; falta el mapa pantalla×acción×rol como
    examen **[r]**, y primero: el rol «recepción» (L-03) **[o]**.
25. **Auditoría de lecturas:** ¿registrarse quién abrió qué expediente? Decide usted
    (costo: más escrituras); su auditoría normativa lo pidió **[o]**.
26. **Validación centralizada:** toda casilla pasa por su casa de parsers (donde ya
    vive para fechas) — extenderla a CURP, teléfono, longitud de notas **[r]**.
27. **Diagnósticos sin dato clínico:** los registros de técnico no llevan nombres de
    pacientes (si algo sale del consultorio, no lleve PHI) **[r]**.
28. **Servidor local (fase pendiente):** enlazar solo a la red del consultorio, llave de
    un solo uso con caducidad para lo de paciente, sin caché en el teléfono **[r, del
    análisis de QR — contrato pendiente]**.

### E · Calidad y verificación

29. **Spec-first:** invariante del contrato → nombre de prueba → código; el examen
    exige que la prueba exista antes del ✅ **[d — su regla; se vuelve automática con
    L13, que sigue sin construir]**.
30. **Ratchets de la verdad nueva** — proteger lo nuevo como se protege lo viejo:
    cinta en toda escritura · umbrales fuera del código · inicio = tablero (una vez
    construido) · cero mensajes técnicos en la interfaz · estado por evento (no por
    clic). Cada ratchet es una prueba que solo puede empeorar en verde **[r — se
    escriben con cada fila]**.
31. **Cobertura medida:** porcentaje de líneas ejecutadas, con la librería estándar de
    Python (sin instalar nada) **[r]** — hoy no se mide.
32. **Propiedad y casos raros:** la batería de casos raros **dentro del examen**, con
    su cadencia decidida (hoy: roja con 1 hallazgo y sin ventana) **[o — decidir
    cadencia; fila FND-146]**.
33. **Migraciones:** prueba de actualización con datos reales de prueba, no solo
    simulacro de respaldo **[r]**.
34. **La verdad como patrón:** el código se audita **contra** la verdad
    (`CONTRASTE-DEL-DISENO-LOGICO.md` → delta), nunca al revés **[d por su declaración]**.

### F · Proceso y mantenibilidad en el tiempo

35. **Pipeline verdad→código:** veredicto del equipo → dibujo estabilizado → contrato
    APLICADO → **fila de la ley (enmienda v4.3, con las filas viejas contrastadas —
    hallazgo L-06)** → código con prueba → examen → entrega P9. Ningún salto **[d en su
    diseño; v4.3 pendiente de su ratificación]**.
36. **Decisión de ruta:** la 3 de la Parte 1 (recomendación: cero de verdad) **[o — su
    llamado sobre cómo se construye]**.
37. **Convención única de nombres** (ya decretada: ortografía, formato de cita, sin
    jerga en salida) **[d]** — y un solo archivo de este tipo (esta bitácora de
    decisiones) para que el futuro no reabra lo cerrado.
38. **Actualización del programa:** artefacto con verificación de huella + reversión
    probada (reversión ✓ **[d]**; **huella del artefacto [r]** — hueco técnico
    abierto).
39. **Continuidad:** toda sesión nueva entra por `AGENTS.md` → checkpoint → orden de
    trabajo; el entregable incluye su propio «cómo verificarme» (pulso) **[d en
    diseño]**.
40. **Mantenibilidad documental:** los documentos de verdad viven en `GUIAS/`, con
    casa canónica, huellas y fechas; el código **no duplica** la verdad: la **cita**
    (una sola casa por concepto) **[d]**.

---

## Lo que este documento no decide (lo declara para que no se confunda)

No decide el contenido clínico (rangos, protocolos, interacciones, textos de aviso: los
firma su médico) · no decide las decisiones suyas abiertas (L-03, L-04, O3, O5, O5–O9,
v4.3, la entrevista) · no decide cuándo empieza la obra (la raíz sigue esperando
validación: el orden es entrevista → dibujos estabilizados → contratos aplicados →
código).
