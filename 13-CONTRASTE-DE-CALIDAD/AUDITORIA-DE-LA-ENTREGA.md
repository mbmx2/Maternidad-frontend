# Auditoría de las entregas — hallazgos F-01 a F-08, con su comando y su estado

> **Qué es:** la auditoría adversarial de las entregas del constructor (definición del
> proyecto, verificaciones, libros de gobierno), hecha el 2026-10-26 con comandos sobre
> el disco. Cada hallazgo trae: qué se midió, con qué comando, y su estado al cierre
> de esta carpeta. **Regla de esta auditoría:** un hallazgo sin comando es una opinión;
> un hallazgo sin estado vivo es un souvenir. Los conteos vivos no se escriben aquí:
> el vivo es `./autoauditoria.sh` (reglas R1/R11).

## Cómo se auditaron las entregas

- **Método:** comandos de solo lectura sobre   el disco (`grep`, `rg`, `wc`, `ls`,
  `git status/log`) contrastando cada afirmación de los libros de gobierno contra el
  archivo real. Sin ejecutar suites ajenas hasta tener permiso; después de obtener
  permiso de escritura se corrió `./autoauditoria.sh` como línea base (238 PASS · 0 FALLO,
  corte 2026-10-25 23:50, coincide con K-02 del `KPIS-Y-DOD.md`; el conteo vivo no se
  escribe aquí, el vivo es el comando).
- **Alcance:** `CHECKLIST-DE-PETICIONES.md`, `KPIS-Y-DOD.md`, `INDICE-BACKEND.md`,
  `PLAN-DE-REGRESO.md`, `SINTESIS-SUMATORIA.md`, `SINTESIS-REGISTRO.json`,
  `MENSAJES-MAESTRO.json`, `motor.js`, `HUELLAS.txt`, `REGISTRO-CONVERSACION.md` y la
  estructura de carpetas.
- **Lo que NO se audita aquí:** la corrección clínica de los umbrales (eso le toca al
  médico responsable, decisión D-5 del inventario).

## Lo que se CONFIRMÓ (afirmaciones ciertas al medir)

- 92 plantillas en 6 familias (14·16·6·24·18·14) · 40 semanas · 9 diagnósticos →
  `MENSAJES-MAESTRO.json` y `grep -c '"id"'` = 92.
- 18 pantallas en estado verificado y 22 filas con huella → `SINTESIS-REGISTRO.json`.
- 18 pacientes en la semilla → conteo línea por línea de `motor.js` (función semilla).
- 48 requisitos (26 de pantalla + 22 de fondo) · 17 flujos (FL-01…FL-17 únicos) ·
  7 contratos · 11 documentos de lógica · 5 del backend · MOD-DOCUMENTOS con 667 líneas.
- 7 suites de la síntesis y 4 de la agenda · 30 hallazgos (P-01…P-30) · 6 rondas.
- 36 mensajes del dueño y 154.288 bytes en el volcado · 171 líneas de huellas.
- El balance del enchufe **ya cuadra**: 21 cubiertas + 3 parciales + 1 falta = 25. El
  propio archivo documenta que decía «2 faltantes» (= 26, imposible) y lo corrigió:
  ejemplo de auto-detección funcionando.
- K-05 concuerda con el checklist al medir (55 cumplidos / 34 pendientes / 89 total,
  corte 2026-10-25 23:55).

## Hallazgos

### F-01 · Numeración duplicada en el checklist — **ABIERTO**
- **Qué se midió:** dos secciones tituladas A11 en el mismo archivo.
- **Comando:** `grep -n '^## A11' CHECKLIST-DE-PETICIONES.md` → líneas 176 y 198.
- **Por qué importa:** quien responda una petición futura no sabe a cuál responde; la
  colisión A8 que se corrigió antes generó ésta al corregirse.
- **Corrección esperada:** renumerar la segunda A11 (o etiquetarla A11b) y registrar
  el cambio en la bitácora del propio checklist.

### F-02 · «30 entradas» sigue vivo donde había 25 — **ABIERTO**
- **Qué se midió:** el checklist (A7, línea 91) sigue diciendo «30 entradas»; el
  registro real tiene 25 (`grep -c '^- «' FRASES-A-TRADUCIR.md` = 25). El propio A11
  (línea 192) ya lo había declarado «corrección pendiente».
- **Por qué importa:** incumple las leyes L-2/L-3: al tocar un documento se corrige
  lo que él mismo declaró roto. Una cifra falsa que sobrevive a su propia auditoría
  es la clase de mentira que más caro cuesta.
- **Corrección esperada:** 30 → 25 en la línea 91, y el A11 (segundo) queda como
  registro histórico del hallazgo.

### F-03 · La «guardia de las 25 frases» — **PARCIALMENTE CERRADO (mejoró durante la auditoría)**
- **Qué se midió al inicio:** ninguna suite leía `FRASES-A-TRADUCIR.md`; el único
  guard era un patrón con 5 frases contra 1 pantalla (`pruebas-do-pantallas.js:93`).
- **Qué cambió:** se construyó `buscar-lenguaje.js` (pedido A17), que **sí lee las 25
  frases del registro como fuente única** y las busca en todo el texto visible;
  corre en cada T1 como informe y detecta 5 frases vivas (la palabra «analito» en 5
  lugares). La puerta `--exigir` existe pero **no está encendida**: sale en rojo solo
  cuando el dueño fije sus sustitutos.
- **Estado honesto:** la promesa «impide que las 25 frases vuelvan» es hoy casi
  cierta — la máquina las conoce todas — pero **no impide nada mientras el informe
  no sea puerta**. Impedir = encender `--exigir` después de las traducciones.
- **Corrección esperada:** encender la puerta cuando el dueño entregue sustitutos
  (su traducción es la autoridad, A13 RQ-C); mientras tanto, la frase del checklist
  debe decir «detecta» en vez de «impide».

### F-04 · Cifra caduca en el plan de regreso — **RETRACTADO (el libro se corrigió solo)**
- **Qué se midió al inicio:** el plan decía «la agenda tiene 0 campos de fecha»;
  la agenda tenía 6 campos `type="date"`.
- **Qué pasó:** el plan fue reescrito; hoy dice «0 campos de fecha **sin calendario**
  en las 18», y la medición lo confirma: 11 campos con etiqueta de fecha en 5
  pantallas, **todos** con `type="date"` (agenda 7 incluyendo 2 generados en código,
  estación, laboratorio, hoja de veredicto y llegada). La afirmación nueva es cierta.
- **Lección:** la cifra caduca no era mentira deliberada sino libro sin mecanismo de
  re-medición; el reescritura la arregló, la regla R1 la previene.

### F-05 · Escombros de conversión en el documento estándar — **ABIERTO**
- **Qué se midió:** `SINTESIS-SUMATORIA.md` contiene 5 líneas con restos de separador
  de tabla convertidas a viñeta: `grep -n -- '---|---'` → líneas 19, 31, 47, 62, 92.
- **Por qué importa:** el decreto D-1 (cero tablas) dejó residuos **dentro de la
  lista de los 35 patrones**, que es el archivo que rige toda construcción. El
  estándar no puede contener basura de su propia conversión.
- **Corrección esperada:** borrar las 5 líneas (no son patrones, son escombros).

### F-06 · «ACUERDOS.md tiene tablas y no está en el backlog» — **RETRACTADO (hallazgo mío erróneo)**
- **Qué se midió:** `ACUERDOS.md` tiene 18 filas de tabla y no figura en la lista de
  pendientes de conversión del checklist.
- **Por qué estaba mal:** `ACUERDOS.md` vive en `04-METODO-Y-ACEPTACION`, y las
  carpetas `01`–`05` son **espejos de la maestra que no se editan aquí** (ley R14).
  Convertir sus tablas localmente sería editar un espejo: el refresco las borraría.
  La conversión le corresponde a la maestra del proyecto. El backlog del checklist
  estaba **correcto** al excluirlo.
- **Lección para el evaluador:** auditar un repositorio de espejos exige preguntar
  siempre «¿este archivo es obra propia o es copia?» antes de acusar.

### F-07 · Todo número vivo se movió durante la auditoría — **ABIERTO (riesgo estructural, no error puntual)**
- **Qué se midió:** el checklist pasó de 43/16 a 55/34 entre mediciones; la cifra
  «273 archivos» medida dio 274. K-05 y el checklist **coinciden hoy** al medir.
- **Por qué importa:** no es un delito del constructor — es la prueba de que toda
  cifra sin fecha y sin comando tiene vida media de minutos. La regla R1 existe por
  esto, y se aplica también a los libros «de verdad».
- **Corrección esperada (ya en marcha):** `CADENA-DE-VERDAD.md` (RQ-A, ejecutado)
  institucionaliza «manda el comando de la casa del dato»; falta la **prueba de fuego
  del R12** y la conciliación automática en la suite (RQ-A parte 2, pendiente).

### F-08 · Afirmaciones sin comando reproducible — **PARCIALMENTE CERRADO**
- **Qué no se pudo verificar al inicio (solo lectura):** «238 PASS», «433 completas»,
  «81 funciones del motor», «17 de 35 patrones aplicados», «8 cortes de estrés».
- **Qué se verificó después (con permiso de ejecución):** `./autoauditoria.sh` →
  **238 PASS · 0 FALLO** (corte 2026-10-25 23:50). La cifra rápida del dueño es
  **cierta y reproducible**. La completa (433) exige `--completo` con servidores y
  queda para la puerta de transición.
- **Sin comando aún:** «81 funciones del motor» y «8 cortes» (los cortes no están
  numerados como «Corte N» en el archivo; el número vive solo en prosa).
- **Corrección esperada:** toda cifra de libro lleva su comando al pie o se declara
  corte fechado; los cortes se numeran en `FLUJO-CORTES.html` o la cifra desaparece.

## Resumen de estados (sin conteos vivos)

- Cerrados o retractados: F-04 (retractado), F-06 (retractado), F-08 (parcial).
- Mejoraron solos durante la auditoría: F-03 (herramienta construida), F-07 (K-05
  coincide con el disco al medir).
- Abiertos y con corrección esperada: F-01, F-02, F-03 (encender la puerta), F-05.

## Evidencia adicional del cierre

- Línea base verde antes de escribir esta carpeta: salida de `./autoauditoria.sh`
  (T1) el 2026-10-25 23:50, con todas las suites en ok.
- Escaneo de secretos antes de publicar el repositorio: `rg` con patrones de llaves
  privadas, tokens y contraseñas → **cero coincidencias** en todo el repo.
