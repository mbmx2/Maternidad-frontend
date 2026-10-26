# CHECKPOINT DE LÓGICA — fotografía analizable de todo el sistema (v1.2)

> **Qué es:** un solo documento que define, capa por capa y nivel por nivel, **toda la
> lógica implicada en el software tal como está declarada hoy** — para analizarla,
> contrastarla y saber, en cualquier momento, si sigue vigente. **No reemplaza** a los
> documentos canónicos: los **señala** con su definición-núcleo y su huella (así usted
> analiza desde aquí sin que este documento envejezca en silencio). **Fecha de la
> fotografía:** 2026-10-23 · **v1.2 — actualización completa:** 2026-10-25 ·
> **etiqueta de git:** `checkpoint-logica-v1` (v1) · `checkpoint-logica-v1.1` (v1.1) ·
> v1.2 sin etiqueta (la copia taller no es repo). **En la copia taller** la reverificación
> es `sha256sum -c HUELLAS.txt` (171 archivos: incluye las familias 06/07/08 y la raíz).
>
> **Cómo reverificar la vigencia en un comando** (desde la raíz del proyecto):
> `sha256sum ACTA_CONSTITUTIVA.md ESTADO.md GUIAS/*.md GUIAS/LOGICAS/*.md GUIAS/CONTRATOS/*.md`
> y comparar los primeros 12 caracteres con los de la sección final. Si una huella difiere,
> **este checkpoint ya no es la verdad de esa capa** — y usted lo sabe con un comando,
> sin confiar en nadie.

---

## 1 · El nivel 0 — la ley (qué manda sobre todo)

**Definición-núcleo:** un solo archivo de reglas (`ACTA_CONSTITUTIVA.md`, v4.2) que todo
agente lee al arrancar; lo que no está aquí no existe; un error jamás se arregla
cambiándola, sino reparando el código o escalando con matriz y su decisión. Contiene hoy:
P1–P9 (las nueve leyes inviolables, con P9 = contrato de entrega al dueño) · 53
requisitos · 39 decisiones · el capítulo de operación (§4.1–§4.16: tarjetas de tarea,
examen automático, escalado, **zonas de decisión, requisitos R-D/R-A, ciclo del
hallazgo, 5 números, ceremonias, riesgos**, modelo de capas con `[SUPUESTO]` y palabras
clave, inventario de procesos, **frenos por punto ciego de IA**) · el orden de fases
(Fase 7.13 vigente: FND-178…185) · la aceptación humana (Libro VI) · y los anexos de
estructura. **Estado:** vigente y verificada hoy (lint 12/12, examen completo verde).
**Casa:** `ACTA_CONSTITUTIVA.md` · huella `215e9f02fbff`.

## 2 · Los siete niveles de pensamiento (el sistema de lógicas)

Cada nivel con su definición-núcleo —lo que manda—, su estado y su casa con huella.
La regla de choque entre niveles (precedencia): **seguridad de la paciente > flujo
validado por el personal > diseño de interfaz y experiencia > comodidad del código.**

**Nivel 1 · Política.** Cómo una IA puede construir software médico sin volverse dueño
de nada: zonas de decisión (verde/amarilla/roja), ley única, aceptación humana
irrenunciable, frenos contra sus puntos ciegos conocidos (suponer, agradar, construir de
más), cada freno con vigilancia mecánica. **Estado:** vigente en la ley v4.2.
**Casa:** la ley (sección anterior) + `LOGICAS/SISTEMA-DE-LOGICAS.md` · huella
`142d59010e87`.

**Nivel 2 · Raíz: flujo de trabajo real del personal.** Lo que manda sobre todo lo
dependiente: quiénes trabajan y en qué carriles · el ritmo como norma (18 pacientes en
4 horas, cortes clínicos y técnicos) · los casos reales con protocolos distintos y
múltiples por paciente · el ciclo llegar→registrarse→esperar→atenderse→cerrarse→volver.
**Estado: HIPÓTESIS INFORMADA** — la validación con el personal (kit armado) está
pendiente; hasta entonces, manda sobre el diseño pero no sobre su realidad. **Casa:**
`FLUJOS-TRABAJO.md` (capas D–F = norma; A–C = historia) · huella `ccdabf99202f`.

**Nivel 3 · Requerimientos.** La traducción del flujo en capacidades con medida: los
**10 pilares** de la doctrina (tablero con relojes · concurrencia con pausa · cinta de
identidad · protocolos por diagnóstico · urgencia y emergencia · degradación honesta ·
una sola verdad en dos instrumentos · carriles con ritmo · ventana mínima · **el aviso
como activo**), cada uno con su número de aceptación (26+ números en total). **Estado:**
declarados; **falta la enmienda** que los haga ley (su «v4.3 ratificada» pendiente).
**Casa:** `LOGICAS/DOCTRINA-DE-DISENO.md` · huella `0213434a992b`.

**Nivel 4 · Interfaz.** La pantalla como sirvienta del flujo: toda pantalla es vista de
la paciente elegida con su cinta; la arranque es el tablero; la escritura confirma de
quién es; nada crítico bajo el primer pliegue; la ventana mínima es 1024×660 y
redimensionar no borra nada; el rollo vive dentro de la ventana. **Estado:** reglas
escritas; dibujos hechos; rediseño en curso sobre papel. **Casas:**
`LOGICAS/PRESENTACION-EN-PANTALLA.md` (huella `44a4d59736e4`) + la mecánica de entrega de
mensajes `LOGICAS/PRESENTACION-DE-CONTENIDO.md` (huella `ea3391af29eb` — no robar pantalla,
punto de entrega, doble registro de lenguaje—) + **`LOGICAS/REQUISITOS-DEL-DISENO.md`
(huella `3e6ac1613fc0`) — el registro maestro de decisiones del frontend: qué / por qué /
cómo / por qué así, anclado a su página HTML, 33 páginas + 3 recorridos** + el método de
evaluación `EVALUACION-PANTALLAS.md` (huella `d7e12bfc5edf` —valor-verso-forma—).

**Nivel 5 · Experiencia.** Que el software no pelee con la persona: ritmos medidos
(3/6/2 acciones), ausencia de sorpresas (toda acción responde; todo error dice qué
hacer), legibilidad en condiciones de clínica, y humildad (la ayuda se explica sola;
lo que no tiene número no se cree). **Estado:** reglas escritas; los modos nuevos se
juegan con número, no con gusto. **Casa:** misma del nivel 4 + `LOGICAS/SISTEMA-DE-ALERTAS.md`
(en su parte de experiencia: aviso con acción, después de guardar, fatiga medida).

**Nivel 6 · Construcción.** Cómo el agente construye: papel antes que código (réplica →
estabilización → implementación con prueba) · verdad por comando (claim sin salida verde
= no hecho) · trazabilidad de punta a punta · integridad heredada que no se toca
(atómico, diario, base única, sin internet) · y los contratos de módulo con prevención
antes de que exista el código. **Estado:** el método está probado (510 pruebas verdes,
0 "to-do" en el código); los 7 contratos nuevos están en EXPLORACIÓN. **Casas:**
`CONTRATOS/LEEME.md` (huella `0868a784c40b`) · `CONTRATOS/MAPA-DE-IMPLEMENTACION.md`
(huella `e09cd50af6bb`) · los 7 contratos (conjunto `e60140cd54ed`, recalculado con el
método declarado en §9 — v1.2).

**Nivel 7 · Mantenimiento de errores.** La taxonomía por capa: error de código (se repara
con prueba; nunca cambiando la ley) · error de diseño (vuelve al papel, gratis) · error
de flujo (**sube a la raíz**, se registra, el flujo se reescribe antes que el código) ·
error de falla en producción (las tres escrituras: qué pasó, qué conservó, qué falta).
Ciclo: detectar → registrar el mismo turno → clasificar por capa → reparar donde
corresponde → verificar con comando → rastro que no se borra. **Estado:** vigente (reglas
de la ley + registro con 66 hallazgos numerados, perdidos 0). **Casa:**
`SISTEMA-DE-LOGICAS.md` + `HALLAZGOS.md` (huella `0957398dcecd`).

## 3 · Las capas del producto (de la misión al código)

**Capa 0 · Misión:** mejor práctica médica · salud de la madre y del bebé — de aquí baja
el valor triple de toda propuesta (paciente · práctica · técnica).
**Capa A · Gobernanza:** la ley de la sección 1, sus zonas y frenos.
**Capa B · Diseño:** requisitos, contratos, dibujos — todo lo que decide la forma antes
del código.
**Capa C · Implementación:** el programa actual — `nucleo.py` + `app.py`, 510 pruebas,
examen completo verde, 0 to-do — más los siete órganos nuevos por construir (la
distancia entre lo que hay y lo que la doctrina pide está en el mapa de implementación).
**Capa D · Validación:** sus recorridos y veredictos (buzón con 64, kit listo, entrevista
pendiente) — la única clase de aprobación que la máquina no puede dar.
**Capa E · Lenguaje:** P9, léxico del dueño, `[SUPUESTO]`, las guías en humano.
**Capa F · Desconocidos:** retrospectiva quincenal, auditorías adversariales, y la
regla de que el error de esta capa sube a la raíz.
Columnas que atraviesan A–F: trazabilidad · auditoría · claridad · validación ·
automatización · gestión · seguridad clínica.

## 4 · Los módulos (el estado de cada órgano)

**En EXPLORACIÓN (contratos escritos, cambian gratis):** TABLERO · ATENCIONES-CONCURRENTES
· PROTOCOLOS · URGENCIA · ALERTAS · DEGRADACION · IDENTIDAD-CONTEXTO — siete contratos
con invariantes, casos borde, números y prevención de problemas posibles e improbables.
**Pendientes de declarar:** contrato de autohistoria por QR (su propuesta, sin validar
con el equipo) · contratos retrospectivos de los módulos ya construidos (las secciones
D-*/B-* del programa actual).
**Ya construidos y verificados (los cimientos que no se tocan):** escritura atómica ·
diario de operaciones con miles de escrituras · bitácora con cadena verificable · base
única · modo sin internet · registro con anti-duplicados · controles con banderas ·
cálculos con rangos · notas firmadas · agenda con recordatorios · respaldos con
simulacro.

## 5 · El sistema de valor (los avisos — la mayor propuesta declarada)

**Definición-núcleo:** los seis tipos cerrados —verde · plazo · problema · urgencia ·
contexto permanente · interacción— en una sola fábrica: datos → cálculo cuando hay
datos → regla en catálogo firmado → evento con acción, dueño y plazo → presentación en
su casa → bitácora con fatiga medida. Solo lo firmado dispara; solo la interacción
detiene; todo plazo crea su pendiente. **Estado:** doctrina escrita
(`LOGICAS/SISTEMA-DE-ALERTAS.md` · huella `bcc3656aacc0`) + demo viva
(`EDICION/PROPUESTAS/ALERTAS.html`) + su parte ya operativa en el programa (banderas,
semáforo, tamizajes, cálculos).

## 6 · Las pantallas (tres estados, sin confundirlos)

**Construidas hoy:** las 24 del programa real, analizadas una por una
(`ANALISIS-PANTALLAS.md` · huella `b804358604db` —incluye los 5 contrastes de sus
críticas—) · huella de las fichas impresas incluida en su carpeta.
**Dibujadas esperando veredicto:** 33 páginas + 3 recorridos por rol
(huella PROPUESTAS `57c1a89c723a` · RUTAS `fe04fdde682c`) — ninguna se construye sin
doble veredicto del oficio.
**Corrección de impresos:** 24 fichas para marcar (`FICHAS/`).

## 7 · Los números que gobiernan (el contrato analizable)

Si un número cambia de significado, cambió la lógica de su capa. Los grupos: tablero
(<0,5 s con 18 · 0 estados por clic de buena voluntad) · concurrencia (0 campos perdidos
en 10 alternancias) · identidad (100 % de escrituras con cinta · 0 prescripciones sin
verificación) · ventana (mínimo 1024×660 · resize sin pérdida · repintado <0,1 s) ·
avisos (0 sin acción · 0 umbrales en código · 0 plazos huérfanos · fatiga contada) ·
flujos (3/6/2 acciones por carril · emergencia <1 min sin duplicado) · degradación
(base íntegra tras corte simulado · 0 mensajes con palabra técnica). **La lista completa
con su casa vive en la doctrina de pilares** (ahí no se copia, para que no existan dos
verdades).

## 8 · Los estados globales de este checkpoint (qué es verdad hoy)

- **Construido y verde:** el programa actual (510 pruebas, examen completo, gestión 14/14,
  pulso VERDE).
- **Dibujado y pendiente de su equipo:** las 33 páginas con su veredicto pendiente —
  la entrevista es el paso crítico (kit listo).
- **Escrito en exploración:** los 7 contratos + los documentos de lógica (cambian gratis
  hasta estabilizarse).
- **Hipótesis:** el flujo raíz (hasta la validación con personal).
- **Pendiente suyo (decisiones declaradas):** «v4.3 ratificada» (enmienda de pilares y
  filas) · optimizaciones O5–O9 · mejoras M3, M6, M8 · día 1 (N5) · R5 y R6 · contrato
  QR · contratos retrospectivos.
- **Pendiente de obra (cuando el papel se estabilice):** los 5 fases de construcción del
  mapa de implementación.
- **v1.2 — lo nuevo desde v1.1 (2026-10-25):** **ronda completa del frontend** en la copia
  taller —30 piezas (21 pantallas + índice de cumplimiento + índice de propuestas con 4 + 3 recorridos), costura
  (`06-FUENTE-BACKEND`: fuente de verdad, módulos, flujos FL, comunicación, requisitos
  RF/RB) y flujos dibujados (`08-FLUJOS`)— · **prioridad humana = regla de diseño** (B6:
  el equipo marca, el software nunca ordena por llegada; tercera excepción manual del
  pilar1) · tarjetas a la B2 (nombre+nacimiento, motivo en1 línea, un solo botón) ·
  **vista definitiva** («ver versión verdadera» oculta andamio) · portado a GUIAS: buzón
  H-050…H-064 · doctrina · flujos · requisitos B6 · contrato TABLERO · ACUERDOS (taller) ·
  CONSTRUCCION · sello de la copia: `sha256sum -c HUELLAS.txt` = **171 archivos**.

## 9 · Huellas (para reverificar con un comando)

> **Vigencia:** huellas recalculadas el **2026-10-24** (v1.1). Desde la fotografía v1
> cambiaron, por la sesión de auditoría de prototipos y la sesión de reestructuración de
> lógica: `HALLAZGOS.md` (+25 filas H-025…H-049) · el conjunto de `PROPUESTAS/`
> (30 → **33 páginas**: CIERRE, LABORATORIO, FALLA; REGISTRO rehecho con los datos de la
> visita) · `FLUJOS-TRABAJO.md` (la visita como hecho del día: llegada, procedencia,
> ayuno, razón declarada→resultante — **y** el modelo «una verdad, muchos equipos»: mismas
> funciones sin segregar por rol, alertas en paralelo en computadora y celular) ·
> **`LOGICAS/PRESENTACION-DE-CONTENIDO.md` y `LOGICAS/REQUISITOS-DEL-DISENO.md`
> (documentos nuevos)** — el primero, la mecánica de entrega; el segundo, el registro
> maestro de decisiones del frontend (qué/por qué/cómo/por qué así, anclado a cada
> página) —; la mecánica de entrega
> de mensajes que faltaba: no robar pantalla (T1), punto de entrega (T2), doble registro
> de lenguaje (T3) · el conjunto de `RUTAS/` · `DOCTRINA-DE-DISENO.md` (L-01: números del
> pilar 10 con casa canónica en ALERTAS §8) · el conjunto de `MODULOS/` (L-02: excepción
> de cinta en la pantalla que crea pacientes).
> **Defectos de forma reparados el 2026-10-24:** el tablero se salía de la ventana (H-040:
> 9 columnas de 250 px en tira horizontal → retícula que se acomoda, urgente al frente) ·
> vocabulario del tablero a «falta + verbo» (H-041) · el índice y las rutas decían 34
> páginas y hay 33 (H-046).
> **Modelo de equipos (H-042):** una sola verdad en todos los equipos; los cálculos y sus
> alertas se empujan **a la par** a computadora y celular de enfermería.
> **Alerta de auditoría (H-047/H-048/H-049):** trece mecanismos decididos en papel **aún
> no están en los contratos**; el contrato TABLERO arrastra el término `estación a mitad`
> y declara columnas mientras la lista priorizada sigue sin confirmación; el mapa dice
> 30 páginas, omite los tres prototipos nuevos y el celular.
>
> **Actualización v1.2 (2026-10-25):** recálculo tras la campaña de la copia taller —
> portación a GUIAS del buzón (**H-050…H-064:64 filas**), `CONSTRUCCION.md` (la bitácora
> de interacciones), la doctrina con «diez pilares» y sin el párrafo duplicado del pilar1,
> los flujos con la puerta de 4 datos + encadenado y la estación de 10 campos (R-14),
> `REQUISITOS-DEL-DISENO` con la decisión **B6** (la prioridad la define el equipo), el
> contrato TABLERO sin el término rechazado y con el párrafo de orden humano, y la
> declaración de taller en `ACUERDOS`. **Tres reparaciones de forma** de esta ronda
> (H-056/H-057 en doctrina, H-060 en el tablero de la ronda1) también cambiaron huellas.
> **Método de conjuntos declarado desde v1.2:** primeros 12 del sha256 de la concatenación
> de los archivos en orden alfabético de sus caminos — verificado contra los valores
> v1.1: reproduce exactos `5fdfef042c4a` (contratos originales) y `fe04fdde682c`
> (recorridos originales).

```
215e9f02fbff  ACTA_CONSTITUTIVA.md
413f5883be85  ESTADO.md
d7e12bfc5edf  GUIAS/EVALUACION-PANTALLAS.md
b804358604db  GUIAS/ANALISIS-PANTALLAS.md
ccdabf99202f  GUIAS/FLUJOS-TRABAJO.md
d26a2e850f48  GUIAS/ACUERDOS.md
0957398dcecd  GUIAS/HALLAZGOS.md
3144a7d9d8b7  GUIAS/KIT-ENTREVISTA.md
142d59010e87  GUIAS/LOGICAS/SISTEMA-DE-LOGICAS.md
0213434a992b  GUIAS/LOGICAS/DOCTRINA-DE-DISENO.md
bcc3656aacc0  GUIAS/LOGICAS/SISTEMA-DE-ALERTAS.md
44a4d59736e4  GUIAS/LOGICAS/PRESENTACION-EN-PANTALLA.md
ea3391af29eb  GUIAS/LOGICAS/PRESENTACION-DE-CONTENIDO.md
3e6ac1613fc0  GUIAS/LOGICAS/REQUISITOS-DEL-DISENO.md
3b561ecda4aa  GUIAS/LOGICAS/AUDITORIA-DE-LA-LOGICA.md
adeb88a270c4  GUIAS/CONSTRUCCION.md  (nueva: bitácora de interacciones B-001…B-028)
0868a784c40b  GUIAS/CONTRATOS/LEEME.md
e09cd50af6bb  GUIAS/CONTRATOS/MAPA-DE-IMPLEMENTACION.md
e60140cd54ed  GUIAS/CONTRATOS/MODULOS/ (conjunto de los 7 contratos)
57c1a89c723a  GUIAS/EDICION/PROPUESTAS/ (conjunto de las 33 páginas)
4a340f9a3e64  GUIAS/EDICION/PROPUESTAS/RUTAS/ (conjunto de los 3 recorridos)
```

## 10 · Por qué este formato de checkpoint (las alternativas evaluadas)

Se valoraron cuatro formas de «fotografiar todo» y esta es la entregada, porque cumple
sus tres condiciones —un documento nuevo, sin editar lo previo, sin crear muchos
documentos—: **(A) este documento con huellas** —el checkpoint analizable que usted
pidió; su huella avisa solo si algo de lo señalado cambió— · **(B) etiqueta de git**
(`checkpoint-logica-v1`, creada con este commit) —la fotrograía inmutable del proyecto
entero: un comando la restaura o la compara— · **(C) duplicar la carpeta** (su idea
anterior de checkpoint) —crea segunda verdad y se desincroniza: descartada por la misma
regla que prohíbe las copias— · **(D) herramienta que genere el checkpoint** —la evolución
correcta (nada se edita: se recalcula), pero requiere su aprobación de fila; queda como
el siguiente paso cuando usted diga. **A + B hoy; D cuando usted lo decrete.**
