# COMUNICACION — la costura entre el papel y el backend

> **Qué es:** la declaración de **cómo se hablan el frontend (el papel) y el backend (la
> lógica de detrás)**: la estructura del backend, el enchufe único por donde las pantallas
> lo tocan, el formato de cada operación, el catálogo de operaciones de la primera espina,
> y las dos implementaciones del enchufe —la **maqueta** que hace usable el papel hoy, y el
> **puente real** que vendrá con el código—. Fecha: 2026-10-25 · familia
> `06-FUENTE-BACKEND/`.
>
> **La regla de la casa, en una frase:** las pantallas solo hablan con **operaciones del
> puente** — jamás tocan archivos, jamás calculan su propio estado, jamás guardan solas.
> Como una lámpara enchufada a la pared: no sabe si la luz viene de la batería o de la
> red; solo sabe del enchufe. Por eso, cuando el backend real llegue, **las pantallas no
> cambian: solo cambia el enchufe.**

## 1 · La estructura del backend (declarada, con su casa)

Esta familia no duplica: la estructura completa ya está decretada en
`02-LOGICA-DE-DISENO/IMPLEMENTACION-DESDE-LA-VERDAD.md`. Aquí su resumen operativo con
puntero:

- **Dominio puro** — las reglas clínicas y de negocio (protocolos, alertas, urgencia,
  cálculos) viven sin pantallas, sin disco y sin relojes escondidos: se prueban solas.
- **Persistencia** — un solo escritor con cola, escrituras atómicas (temporal y renombrar)
  y diario: todo lo que se guarda sobrevive a un corte de luz y tiene autor.
- **Eventos del día** — un canal único, persistido, del que todo se **deriva**: el
  tablero, la agenda y las alertas son vistas calculadas de los hechos, no estados
  guardados dos veces (si dos casas guardan lo mismo, se desincronizan).
- **Presentación** — las pantallas se componen desde un SPEC declarativo (lo estándar) y
  pintores (lo raro), y **pintan lo que el dominio devuelve**: presentación → dominio →
  persistencia, jamás al revés.
- **Catálogos firmados** — los números clínicos (rangos, escalas, protocolos) viven en
  archivos con firma de borrador a vigente: el código solo aplica lo firmado.
- **Servidor local** — fase pendiente con hardware (la terminal del celular); no bloquea
  nada de lo anterior.

## 2 · El puente (el enchufe)

**Qué es:** el conjunto de **operaciones** —órdenes cortas con forma fija— que expone el
backend y que son lo único que una pantalla puede llamar.

**Las dos implementaciones, misma forma:**

- **PUENTE-MAQUETA** — el que hace usable el papel **hoy**. De la familia nueva (la ronda 2,
  desde cero): **`07-FRONT-NUEVO/puente.js`**, con los mismos datos de mentiras en memoria
  y las operaciones del catálogo implementadas en lo que es cableado. La maqueta de la ronda
  1 (`01-DIBUJOS/EDICION/PROPUESTAS/maqueta.js`, cableada en su TABLERO) quedó como pieza
  de esa ronda y no se usa en la nueva. En ambos casos: dibujo con motor, descartable como
  todo dibujo (DEC-19).
- **PUENTE-REAL** — el del futuro producto: implementará este mismo catálogo envolviendo
  el núcleo real, con su prueba por operación (spec-first: el nombre de la prueba ya puede
  existir antes que el código).

**La promesa que compra:** el papel prueba el flujo y la UX **contra el contrato**, no
contra una mentira ad-hoc; el día del código, la pantalla ni se entera.

## 3 · El formato de cada operación (ocho campos)

1. **Nombre humano** — verbos de consultorio (`registrar_llegada`, `guardar_control`).
2. **Módulo** — de qué parte del menú es (identidad, tablero, controles…).
3. **Función de la fuente** — qué función declara (`MOD-…` / `FL-…`): la operación **expone**
   la función; no repite su lógica (puntero, nunca copia).
4. **Entrada** — los datos que pide, en formas simples (los mismos nombres de campo que
   tendrán los archivos del expediente).
5. **Salida** — lo que devuelve para que la pantalla lo pinte.
6. **Error** — siempre **mensaje humano + qué hacer**; jamás texto técnico en la cara
   (ratchet: cero mensajes técnicos).
7. **Eventos que emite** — qué se entera el resto (tablero, alertas, agenda).
8. **Estado** — maqueta: sí/no · real: futuro con su prueba candidata.

## 4 · Catálogo de operaciones de la primera espina

Son las que la maqueta necesita para cablear las primeras pantallas, en el orden que marca
`REQ-FLUJO.md`. Cada operación con su FL. (Cada `MOD-*.md` futuro suma su bloque con este
mismo formato.)

**IDENTIDAD (FL-03, FL-12)**
- `buscar(texto) → lista breve` — busca por nombre o clave; error humano: «no
  aparece — ¿la registramos?» con enlace a registro.
- `registrar_llegada(paciente) → tarjeta` — cambia la cita a *llegó*; emite
  `llegada_registrada`.
- `registro_rapido({nombre, fecha, ciudad, tel, curp, motivo}) → expediente mínimo` — los
  campos de la libreta (nombre = apellidos juntos, con coma antes de los nombres; ciudad,
  teléfono y CURP opcionales), en un minuto y **encadenado** («¿siguiente?»); emite
  `paciente_creada` y `llegada_registrada`; después marca «falta completar» con dueño y
  fecha límite.
- `elegir_paciente(id) → contexto` — pone la paciente en contexto **para todas las
  pantallas** (la cinta la lleva el puente, no cada página); emite `contexto_cambiado`.

**TABLERO (FL-01, FL-04, FL-10)**
- `listar_dia() → tarjetas` — el día completo ya ordenado (vista derivada: nada la
  guarda, todo la calcula) con estados, relojes, dueños y urgencia al frente.
- `marcar_no_llego(cita) → tarjeta apagada` — acción de recepción sobre la cita vencida
  (el estado automático es del futuro; en el papel se ofrece la acción); emite
  `estado_cambiado`.
- `marcar_urgencia(paciente) → tarjeta al frente` — manual con juicio (pilar 5);
   emite `urgencia_marcarda`.
- `equipo_fuera(en_sala) → frase` — «la médica está en sala de parto»; emite
   `equipo_estado`.

**ATENCIONES (FL-06, FL-11)**
- `pausar(atencion) → pausa` — conserva todo lo no guardado; emite `pausa_abierta`.
- `retomar(atencion) → atención viva` — retorno exacto con «en uso de X» para los demás;
  emite `pausa_cerrada`.

**CONTROLES (FL-05)**
- `guardar_control(datos) → control guardado` — con la paciente abierta en el contexto
  (sin ella: «no se guarda a ciegas»); los 10 campos, atómico,
   **nunca bloquea**; emite `control_guardado` → salen los chips y las alertas **después**
   de guardado (T2), nunca antes.
- `ultimos_valores() → valores` — el «último valor con número válido» de la paciente
   abierta: DOC-02 y de la estación.

**CALCULADORES (FL-05, FL-09)**
- `calcular(calculadora, datos) → resultado | sin_datos` — corre en el segundo en que sus
  datos existen (E1); con datos incompletos devuelve `sin_datos`, nunca inventa.

**ALERTAS (FL-08, FL-13 · con las correcciones de B-013)**
- `listar_alertas() → alertas con reloj y paciente` — cada una con su paciente,
   estado, quién debe y cuánto falta para vencer.
- `nacer_alerta(texto, nivel, origen, dueño, paciente) → alerta | ya_pendiente` — dedupe: idéntica mientras
   está pendiente no duplica; **recaída tras cerrar = alerta nueva**; si hay una menor del
   mismo origen, la nueva la sustituye.
- `atender_alerta(id, cierre, texto, quien, cédula) → alerta cerrada` — tres cierres legales
  (atendida · referida con nota · cerrada con motivo) y la firma es **de quien ejecuta**
  con su cédula; si hay nota firmada que la resuelve, el cierre se ancla a ella y no pide
  texto doble (cero doble captura). Transiciones ilegales: error humano.
- `alertas_del_episodio(paciente) → lista con respuesta` — para la historia y la tarjeta
   roja.
- `preparacion_consulta() → {resultados, vencidos, pendientes}` — lo compilado antes de
   sentar a la paciente (propuesta P2): laboratorio capturado, pasos vencidos del protocolo
   y pendientes de la paciente abierta; sin contexto, lo dice.
- `copiar_control_anterior() → valores marcados` — trae el control previo **marcado como
   copiado** (nunca se hace pasar por medido hoy); sin control previo, error humano
   (propuesta P4).

**AGENDA (FL-02, FL-04)**
- `listar_llamadas() → lista para llamar` — recordatorios listos para copiar, sin envío
  automático.
- `reagendar(cita, nueva_fecha) → cita` — la acción del «no llegó» y del traspaso.

**LABORATORIO (FL-07)**
- `capturar_laboratorio(analito, valor, fecha) → resultado` — tres datos, treinta
  segundos; marca «escrito tardío» si la fecha de la muestra es vieja; emite
  `resultado_capturado` → semáforo y chips.

**CIERRE (FL-15)**
- `obtener_traspaso() → resumen imprimible` — el día como pliegue: quiénes quedaron,
  vencidos con dueño, fichas incompletas, agenda de mañana.

**DOCUMENTOS (FL-17 · la lógica completa en `MOD-DOCUMENTOS.md`)**
- `listar_plantillas() → lista con tipo` — con sus marcadores disponibles.
- `generar_documento(paciente, plantilla) → ruta del documento` — en la maqueta solo
  declara el destino y el mensaje; en el producto abre el archivo relleno.

## 5 · Eventos (los avisos) contra pedidos (las órdenes)

**Pedidos** — «haz esto»: son las operaciones de arriba; cambian la verdad y responden con
su salida. **Eventos** — «pasó esto»: no los manda nadie a dedo; nacen de un pedido
legítimo y los escuchan el tablero, las alertas y la agenda, que se **repintan desde los
hechos**. En el producto son un canal único persistido (un fold se reconstruye); en la
maqueta, la misma forma síncrona (se repinta al terminar el pedido). Lista del espina:
`llegada_registrada` · `paciente_creada` · `contexto_cambiado` · `control_guardado` ·
`pausa_abierta` · `pausa_cerrada` · `urgencia_marcarda` · `equipo_estado` ·
`resultado_capturado` · `alerta_nacida` · `alerta_cerrada` · `cita_creada` ·
`estado_cambiado` · `dia_cerrado`.

## 6 · El formato de los datos (aprendemos la forma real ya)

Los objetos de la maqueta llevan **los mismos nombres de campo** que tendrán los archivos
del futuro expediente (paciente: nombre, fecha_nacimiento, expediente · control: peso,
presion_sistolica, …los diez · alerta: estado, dueño, respuesta, firma, cedula) — en
español, como los archivos reales. Así las pantallas aprenden desde hoy la forma verdadera
y el día del código no hay que reescribirlas.

## 7 · Cómo el papel se hace usable, y dónde sí es barato

**Economía:** un solo archivo compartido (`maqueta.js`), del mismo tamaño de costo que la
hoja de estilos que ya comparten las 33 páginas — progresivo: **sin JavaScript la página
sigue siendo exactamente el mismo dibujo**. Datos de mentiras, relojes vivos, una sola
paciente en contexto que viaja entre páginas, cero disco y cero red: es papel con motor.

**No se cablean las 33 páginas.** Solo la espina del flujo, en orden FL:
1) TABLERO (hecho) · 2) CONTROL + PAUSA · 3) CONSULTA + ALERTAS · 4) EMERGENCIA +
REGISTRO · 5) CIERRE + AGENDA. Cada cableado = una etiqueta de script y ganchos mínimos
en esa página; el resto del archivo no se toca.

**Qué NO hace la maqueta (límites declarados):** no persiste nada entre sesiones (salvo el
contexto en el navegador), no valida clínica de verdad, no es el producto, no toca
`nucleo.py` ni `app.py`, y ningún número de su prueba vale como prueba de aceptación —
esas viven con el código real.

## 8 · Del papel al producto

Cuando llegue el momento de construir: cada operación de este catálogo ya trae su función
(`MOD`/`FL`), su formato de entrada y salida y su prueba candidata — el puente real solo
la implementa contra el núcleo. **La pantalla no se modifica**: lo que el papel probó con
esta maqueta es exactamente lo que correrá con la verdad adentro.

---

**Bitácora de este archivo:** 2026-10-25 — creación con la decisión del dueño encima:
frontend solo en papel, con toda la lógica de backend involucrada y pantalla usable si es
económico (entrada B-014 de `CONSTRUCCION.md`).
