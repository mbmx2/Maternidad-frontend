# REQUISITOS-FRONT-BACK — la lógica de requerimientos, de los flujos dibujados a la construcción

> **Qué es:** la estructura de **requerimientos de frontend y de backend** derivada de los
> flujos ya dibujados (`08-FLUJOS/`), **actualizada con toda la información nueva de esta
> ronda**: la comparativa de las dos rondas, los hallazgos H-061/062/063, las correcciones
> B-013 del circuito de alertas, la costura de `COMUNICACION.md`, la ronda 2 y sus13
> pantallas faltantes. Fecha: 2026-10-25 · familia `06-FUENTE-BACKEND/`.
>
> **Qué NO es — su precedencia:** no crea ley ni sustituye a `05-LEY/ACTA_FRONTEND.md`
> (R-01…R-53), ni a `REQUISITOS-DEL-DISENO.md` (decisiones de presentación), ni a
> `REQ-FLUJO.md` (las cadenas FL). Es la **vista derivada de los flujos**: RF = lo que la
> **pantalla** debe mostrar o hacer; RB = lo que el **fondo** debe operar. Cada uno cita su
> casa; si esta vista y la casa chocan, **manda la casa**.

## Cómo se lee cada exigencia

**RF-xx / RB-01** · **nace de** (el flujo que la exige) · **exige** · **casa** · **estado**.

Estados posibles: `ACTUAL` (exigencia nueva de esta ronda, aún sin casa previa explícita) ·
`REFUERZA` (la casa ya la manda; aquí se reafirma y se le da pantalla u operación) ·
`PRIORIDAD 0` (bloquea veredictos y construcción) · `CANDIDATO` (espera su frase y entonces
entra a su casa) · `[SUPUESTO]`.

**Dos ratchets de esta familia** (para que tres numeraciones no se contradigan en silencio):
(1) ninguna entrega al dueño usa RF o RB **sin su casa al lado** — el número siempre aparece
junto a su R-xx, FL-xx, pilar o contrato; (2) RF/RB no se corrige a escondidas: si un RF
cambia, primero se revisa su casa — si la casa no cambia, el RF tampoco.

## 1 · Por qué se actualizaron los requisitos (los deltas de esta ronda)

1. **H-061**: el puente declaró24 operaciones y6 no existen → exigencia nueva: **toda
   operación del catálogo está cableada o declara su estado** (antes no estaba escrita).
2. **H-062**: guardar una presión crítica no prendió la alerta → el circuito insignia quedó
   sin cablear → **PRIORIDAD 0** en fondo y frente.
3. **H-063**: la estación dibujó9 campos contra los10 de R-14 → la exigencia vieja ya
   existía; lo nuevo es que **el dibujo debe veredictear contra el número real**.
4. **B-013** (auditoría de la propuesta de circuito): dedupe solo mientras pendiente ·
   recaída = alerta nueva · alerta mayor sustituye a la menor · **todo estado de alerta con
   reloj** (tablero → cierre → agenda siguiente) · **cierre anclado a la nota firmada**
   (cero doble captura) · métricas del circuito. Son CANDIDATOS para contrato ALERTAS
   (exploración: se cambia con su frase, sin enmienda de ley).
5. **La comparativa** (ronda1 vs ronda2):13 pantallas exigidas por flujos que ninguna
   ronda tiene completas en la ronda2 → cada una ya era RF de un FL; ahora van con estado
   y hueco marcados.
6. **COMUNICACION**: el catálogo de operaciones convierte cada exigencia de fondo en una
   operación con forma (entrada, salida, error humano, eventos).

## 2 · RF — los requerimientos de FRONTEND (por orden de jornada)

**De la norma (capa D):**

- **RF-01** · *nace de* FL-01 · **exige** que encender sea ver el día: pantalla de inicio =
  tablero de hoy, sin pasar por índice ni menú · *casa* pilar1, R-01 · **REFUERZA**
  (rondas 1 y 2 cubiertas).
- **RF-02** · *nace de* manifiesto de la ronda2 · **exige** riel de navegación **solo con lo
  que se busca** (7 destinos) y la paciente en contexto en la barra superior —buscar vs
  estar—, igual en todos los roles (un solo sistema, H-042) · *casa* `REQUISITOS-DEL-DISENO`
  (§9 navegación) · **CANDIDATO** — se vuelve decisión de diseño con su frase.
- **RF-03** · *nace de* FL-01/04 · **exige** estados dibujados como estados reales: palabra
  siempre junto al color, «falta + verbo», nunca jerga («estación a medias», no «a mitad») ·
  *casa* H-041, pilar1 · **REFUERZA** + **PRIORIDAD de reparación** (H-060: el tablero de
  la ronda1 aún trae el término rechazado).
- **RF-04** · *nace de* toda escritura · **exige** cinta de identidad con fundamentales
  (alergia · sangre · medicación · crónica) en toda pantalla que escribe o decide;
  excepción: las pantallas que **crean** pacientes (llegada — bloque 2 — y emergencia) · *casa* pilar3, contrato IDENTIDAD ·
  **REFUERZA** (r2: cinta presente en estación y consulta; falta en historia futura).
- **RF-05** · *nace de* FL-05 · **exige** estación con **exactamente10 campos y9 banderas**
  (R-14), «guardar nunca bloquea» y chips de resultado **después** de guardado · *casa*
  R-14/R-15 · **REFUERZA + ACTUAL**: el dibujo actual tiene9 (H-063) — arreglar antes de
  todo veredicto.
- **RF-06** · *nace de* cortes4 y FL-08/13 · **exige** que al guardar con banderas la
  **alerta nazca visible en Pendientes** con dueño y reloj (el circuito se ve de punta a
  punta en pantalla) · *casa* FL-08/13, SISTEMA-DE-ALERTAS · **PRIORIDAD 0** (H-062: hoy no
  se ve porque no se cablea).
- **RF-07** · *nace de* FL-08 · **exige** marcador de urgencia en la pantalla donde se
  decide, y el **salto automático al frente** en el mismo segundo (manual solo lo que exige
  juicio) · *casa* pilar5 · **ACTUAL**: la ronda2 no tiene marcador (H-061).
- **RF-08** · *nace de* FL-07 (10:40) · **exige** pantalla de laboratorio en papel: tres
  datos en treinta segundos, bandera «escrito tardío», semáforo contra catálogo · *casa*
  R-38, O8 · **REFUERZA — sin pantalla en ronda2**.
- **RF-09** · *nace de* corte3 (FL-12) · **exige** emergencia: tres campos en menos de un
  minuto, tarjeta roja al frente, marca «falta completar» con **dueño y fecha límite**, y
  completar ficha después sin duplicar · *casa* pilar5, R-02 · **REFUERZA — parcial en
  ronda2** (registra, falta rojo/plazo/ficha).
- **RF-10** · *nace de* corte2 (FL-11) · **exige** pantalla de parto: campos obligatorios,
  cierra episodio y el tablero libera el cupo solo · *casa* R-35 · **REFUERZA — sin
  pantalla en ronda2**.
- **RF-11** · *nace de* cortes6/7 (FL-14) · **exige** pantalla de falla con los guiones en
  humano, puente de papel y «último guardado a las HH:MM» · *casa* contrato DEGRADACION,
  pilar6 · **REFUERZA — sin pantalla en ronda2**.
- **RF-12** · *nace de* corte8 · **exige** estudios: previsualizar, verificar, rechazar sin
  escribir a medias y el chip «estudio pendiente — reintento» en el tablero · *casa* R-31 ·
  **REFUERZA — sin pantalla en ronda2**.
- **RF-13** · *nace de* FL-13 y B-013 · **exige** pendientes con dueño, reloj y **cierre de
  tres salidas** (atendida · referida · cerrada con motivo) con nombre y cédula —o anclado a
  la nota firmada—, sin doble texto · *casa* J1, B-013 · **REFUERZA** (r2 dibuja el cierre;
  falta el anclaje a nota: CANDIDATO de B-013).
- **RF-14** · *nace de* fase I · **exige** ficha con fundamentales **y contacto (teléfono
  y ciudad de origen)** editables, y su «falta completar ficha» con plazo · *casa* R-03 ·
  **REFUERZA — dibujada hoy en `ficha.html`**.
- **RF-15** · *nace de* FL-03 · **exige** aviso de homónima en la búsqueda y en toda
  escritura · *casa* R-10, contrato IDENTIDAD · **REFUERZA — la búsqueda de r2 no avisa**.
- **RF-16** · *nace de* circuito4 · **exige** pantalla de calculadoras:18 exactas con
  prefill doble e interpretación (número · rango · qué significa · acción) · *casa* Anexo E,
  R-19/R-43 · **REFUERZA — sin pantalla en ronda2**.
- **RF-17** · *nace de* FL-09 · **exige** historia: evoluciones previas, NOM-004 dentro de
  la nota, interconsulta y pendientes con vencimiento · *casa* R-17/R-18/R-36/R-41 ·
  **REFUERZA — parcial en ronda2** (solo un cuadro de nota).
- **RF-18** · *nace de* apertura del día · **exige** acceso con PIN y recuperación sin red ·
  *casa* R-26/R-51 · **REFUERZA — sin pantalla en ronda2**.
- **RF-19** · *nace de* FL-15 · **exige** traspaso imprimible + respaldo con drill · *casa*
  O5, R-12 · **REFUERZA** (traspaso en r2; respaldo solo una línea en Sistema).
- **RF-20** · *nace de* recorridos del kit · **exige** que exista recorrido por rol para
  veredicto (enfermera8, médica7, dueño7) sobre las pantallas nuevas · *casa*
  KIT-ENTREVISTA · **ACTUAL**: la ronda2 no tiene rutas — crear cuando haya ronda que
  veredictar.
- **RF-21** · *nace de* FL-06 · **exige** pantalla de atenciones abiertas con pausa/retorno
  y «en uso de X» · *casa* pilar2 · **REFUERZA — parcial en ronda2** (botón por tarjeta).
- **RF-22** · *nace de* circuito3 · **exige** recordatorios: lista personalizada con copiar,
  ventana con escalado si no se entregó · *casa* R-48, DEC-32/33 · **REFUERZA — r2 sin
  escalado**.
- **RF-23** · *nace de* R-23/FL-17 · **exige** dos rótulos de salida: «exportar para
  archivar (con identidad)» y «compartir sin identidad» · *casa* R-23 · **REFUERZA**
  [SUPUESTO 12 del hogar en pantalla].
- **RF-24** · *nace de* B-006/B-013 · **exige** métricas visibles del sistema (pulso del
  día · carga de avisos con tasa de descarte · tiempo de estación) sin nunca medir
  personas · *casa* B-006 (propuesta suya) · **CANDIDATO**.
- **RF-25** · *nace de* FL-16 · **exige** señal en la terminal: «sin señal — se enviará al
  volver» · *casa* G3 · **[SUPUESTO]** (fase con hardware; el diseño no depende de ella).
- **RF-26** · *nace de* su dictamen (decisión **B6**) · **exige** que la prioridad de paso
  se marque en la tarjeta («★ Prioritaria») y **flote al frente** de su zona; el software
  **nunca ordena por hora de llegada** ni calcula quién sigue — los relojes informan, no
  ordenan · *casa* `REQUISITOS-DEL-DISENO` B6 · pilar1 (tercera excepción manual) ·
  **REFUERZA — dibujada hoy en `hoy.html`**.

## 3 · RB — los requerimientos de FONDO (por orden de jornada)

- **RB-01** · *nace de* H-061 · **exige** que **toda operación** de `COMUNICACION.md` §4
  exista en el puente o declare honestamente «sin cablear» — el enchufe declarado y el
  enchufe real son el mismo · *casa* COMUNICACION · **ACTUAL · PRIORIDAD de reparación**.
- **RB-02** · *nace de* FL-01 · **exige** canal de eventos persistido del que todo se
  deriva: tablero, agenda y alertas son vistas calculadas; estado por hecho, jamás por clic ·
  *casa* IMPLEMENTACION §5, O1 · **REFUERZA** (r2 lo cumple en memoria: probar que el
  producto real lo cumple con su prueba de igualdad).
- **RB-03** · *nace de* FL-05→FL-08 · **exige** que `guardar_control` dispare los
  detectores (perfil embarazada, combinación TA+orina, deltas) y que de ahí nazca
  `alerta_nacida` · *casa* E1, R-15, FL-08 · **PRIORIDAD 0** (H-062).
- **RB-04** · *nace de* B-013 · **exige** ciclo de alerta completo: dedupe solo mientras
  pendiente · recaída tras cerrar = alerta nueva · la mayor sustituye a la menor del mismo
  origen · transiciones ilegales con error humano · *casa* contrato ALERTAS · **CANDIDATO**
  (se escribe en el contrato con su frase; sin enmienda de ley).
- **RB-05** · *nace de* B-013 · **exige** cierre anclado: si la nota firmada resolvió la
  urgencia, la alerta cierra con esa firma y **no pide texto doble** · *casa* R-36 + J1 ·
  **CANDIDATO** (cero doble captura).
- **RB-06** · *nace de* B-013 y pilar1 · **exige** que todo estado de alerta lleve reloj y
  escale por nuestras tres paradas: vencido ⇒ sube al tablero ⇒ entra al traspaso ⇒ abre el
  día siguiente en él · *casa* O3, FL-13/01/15 · **REFUERZA + CANDIDATO** de escalera
  intermedia (24 h) solo si su equipo la pide.
- **RB-07** · *nace de* FL-05 · **exige** `guardar_control` con los10 campos, atómico, con
  clave (atención, paciente) y cola al escritor único · *casa* R-14, decisión15 ·
  **REFUERZA** (H-063 obliga a que el dibujo y la operación coincidan en10).
- **RB-08** · *nace de* FL-07 · **exige** `capturar_laboratorio` (3 datos, «escrito tardío»)
  que alimente el semáforo al momento de escritura —evaluar donde el dato entra, no bajo
  demanda— · *casa* O8, E1 · **REFUERZA — operación sin cablear**.
- **RB-09** · *nace de* FL-03/12 · **exige** `registro_rapido` atómico que crea expediente
  con marca de plazo y **nunca duplica** al completar · *casa* R-02, pilar5 · **REFUERZA**.
- **RB-10** · *nace de* FL-09 · **exige** `cerrar_consulta` que emita
  `consulta_cerrada` → la agenda propone la siguiente cita desde el protocolo · *casa*
  R-35/R-48, FL-09 · **REFUERZA — sin cablear**.
- **RB-11** · *nace de* corte2 · **exige** `registrar_parto` con campos obligatorios que
  **cierra el episodio** y dispara los eventos (tablero libera, puerperio activo) · *casa*
  R-35/R-40 · **REFUERZA — sin operación en la espina**.
- **RB-12** · *nace de* FL-16 · **exige** reparto de alertas en paralelo a todos los
  equipos con recuperación al volver · *casa* H-042, R-27 · **[SUPUESTO]** — fase de
  hardware; mientras, la PC es la verdad.
- **RB-13** · *nace de* circuito1/2 · **exige**0 umbrales clínicos en el código: rangos,
  escalas y combinaciones solo en catálogos firmados; sin firma ⇒ silencio **anunciado**
  en el panel («catálogos sin firmar: sin alertas de X») · *casa* P6,
  `test_tablas_clinicas` + mejoroma de la auditoría (fail-silencioso visible) ·
  **REFUERZA + CANDIDATO** (el aviso persistente es nuevo).
- **RB-14** · *nace de* decisión11 · **exige** identificadores estables (uuid) para eventos
  y alertas —nunca contadores locales si puede haber dos escritores— · *casa*
  IMPLEMENTACION decisión11 · **REFUERZA** (puerto pendiente al código, con fase de sync).
- **RB-15** · *nace de* B-006/B-013 · **exige** métricas del circuito: tiempo medio de
  cierre, duplicados evitados, disparos por tipo — miden al sistema, nunca a personas ·
  *casa* B-006 · **CANDIDATO**.
- **RB-16** · *nace de* circuito1 · **exige** evaluación de laboratorio **al momento de la
  escritura** (además del botón): el dato crítico no espera a que alguien pregunte ·
  *casa* E1 · **REFUERZA — deuda de código confirmada por la auditoría**.
- **RB-17** · *nace de* FL-06 · **exige** estado por atención con clave (atención,
  paciente), pausa que conserva lo no guardado y cero campos perdidos en diez
  alternancias · *casa* pilar2, contrato ATENCIONES · **REFUERZA**.
- **RB-18** · *nace de* FL-14 · **exige** guardados atómicos (temporal+renombrar),
  bitácora con autor y transcripción del puente con la hora del hecho · *casa* P8, DEC-09,
  contrato DEGRADACION · **REFUERZA**.
- **RB-19** · *nace de* FL-15 · **exige** cierre como pliegue del día (sin captura nueva) y
  respaldo con drill que jamás toca el parque vivo · *casa* O5, R-12 · **REFUERZA**.
- **RB-20** · *nace de* circuito1 y E1/E3 · **exige** «falta de dato ≠ valor normal»: sin
  datos ⇒ `sin_datos`; combinación incompleta ⇒ no dispara; nunca imputar · *casa* E1/E3 ·
  **REFUERZA**.
- **RB-21** · *nace de* FL-17 · **exige** las22 operaciones de `MOD-DOCUMENTOS.md` con sus
  guardas (original intacto, puerta única md+csv, ID con sal) · *casa* R-05…R-09/R-23 ·
  **REFUERZA**.
- **RB-22** · *nace de* FL-03 · **exige** detección de homónimas en escritura y en
  registro, con aviso en ambas cintas · *casa* contrato IDENTIDAD (invariante iii) ·
  **REFUERZA**.

## 4 · El orden en que esto se construye (de la comparativa)

Con los RF y RB en mano, el orden es el de la espina + los huecos rojos: **(0)** cerrar
H-061, H-062 y H-063 — sin eso, ningún veredicto es honesto · **(1)** IDENTIDAD y TABLERO
(RF-01/04/15, RB-02/09/22) · **(2)** CONTROLES y ATENCIONES (RF-05/06/21, RB-03/07/17) ·
**(3)** URGENCIA y ALERTAS (RF-07/13, RB-04/05/06/13) · **(4)** LABORATORIO (RF-08,
RB-08/16) · **(5)** PROTOCOLOS/PARTO (RF-10, RB-10/11) · **(6)** CIERRE/DEGRADACIÓN
(RF-11/19, RB-18/19) · **(7)** el resto (historia, calculadoras, estudios, acceso,
documentos). El mapa de fases I–V de `MAPA-DE-IMPLEMENTACION.md` sigue gobernando el
momento; este orden dice **qué requisito entra en cada momento**.

## 5 · Qué NO cambia con esta actualización

La ley no se toca (ningún delta pide enmienda: los CANDIDATOS van a contratos en
exploración y a `REQUISITOS-DEL-DISENO` con su frase) · los FL-01…FL-17 siguen vigentes
(como cadenas) · los tres recorridos y el día de18 siguen siendo el material de entrevista ·
y **la validación con el personal sigue pendiente**: hasta su veredicto, todo esto es
hipótesis informada con orden de construcción.

---

**Bitácora de este archivo:** 2026-10-25 — creación a partir de `08-FLUJOS/` con los deltas
de la ronda (H-061/062/063, B-013, comparativa, COMUNICACION);26 RF y 22 RB · registrado
como entrada B-018 de `CONSTRUCCION.md` · **v2 (2026-10-25):** RF-26 (prioridad humana,
casa B6), RF-04 ampliado (las dos pantallas que crean pacientes), RF-14 con contacto
(teléfono y ciudad) — y los estados «sin pantalla en ronda2» de los RF ya construidos
quedan **superados por la ronda completa** (B-021): el mapa vivo de cobertura es
`07-FRONT-NUEVO/CUMPLIMIENTO.html`, no el estado escrito en cada fila.
