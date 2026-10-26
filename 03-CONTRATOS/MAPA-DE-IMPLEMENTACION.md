# MAPA DE IMPLEMENTACIÓN — contraste: flujos de trabajo ↔ módulos ↔ dibujos

> Registro vivo (2026-10-23 · **refresco v2: 2026-10-25**, reparando H-049). El contraste que pide el dueño, en tres preguntas: ¿qué
> lógica total sostienen los flujos? ¿qué se necesita para que **primero** estén los
> ejemplos reales de imagen? ¿y en qué orden va el código cuando el papel se estabilice?
> Los dibujos ya existen (33 páginas + 3 recorridos en la ronda 1, y la ronda completa de
> 25 piezas en `../07-FRONT-NUEVO/`); este mapa dice **qué módulo hace
> real cada dibujo y con qué precedencia**.

## Parte 1 · Del flujo al módulo — qué lógica sostiene cada escenario

Los 8 flujos con cortes y el escenario de 18 pacientes, visto desde abajo —qué órganos
usan—, sin repeticiones encubiertas:

- **Flujo 1 (mañana mixta) y el escenario cargado:** TABLERO (estados y relojes) ·
  IDENTIDAD-CONTEXTO (cinta y datos fundamentales en cada estación) · PROTOCOLOS (los
  calendarios distintos de cada paciente) · ATENCIONES-CONCURRENTES (las estaciones del
  carril) · ALERTAS (los chips de plazo y vencido).
- **Flujo 2 (cesárea) y 7 (fallo del equipo):** ATENCIONES-CONCURRENTES (pausa y retorno)
  · PROTOCOLOS (cierre del embarazo con su parte) · DEGRADACION (puente y recuperación).
- **Flujo 3 (parto sin expediente):** IDENTIDAD (registro de emergencia con lo mínimo) ·
  TABLERO (rojo al frente) · URGENCIA (prioridad real).
- **Flujo 4 (banderas) y 5 (urgencia ginecológica):** ALERTAS (tipo problema/urgencia) ·
  URGENCIA (salto al frente y no se cierra sin resolver) · TABLERO (la ordenación).
- **Flujo 6 (luz) y 8 (estudio fallido):** DEGRADACION (catálogo de fallas con mensajes)
  · TABLERO (estados «a medias» y «pendiente» visibles).
- **El valor central (avisos de la propuesta de valor):** ALERTAS completo, alimentado por
  IDENTIDAD-CONTEXTO (alergias, sangre, medicación) y por los cálculos que corren cuando
  los datos entran.

Ningún módulo es de un solo flujo: ésa es la prueba de que son órganos y no parches.

## Parte 2 · La primera pregunta: los ejemplos de imagen, ya entregados

Los ejemplos reales de frontend **ya están disponibles y funcionando como dibujos**:
las 33 páginas de `../EDICION/PROPUESTAS/` con sus 3 recorridos por rol, su banda de
pregunta y su veredicto. Lo que este mapa aclara: **ningún dibujo necesita código para
cumplir su propósito actual** —su propósito es decidir con el equipo—; y cuando el equipo
hable, de sus veredictos saldrá la lista de cambios que **primero** se aplican al dibujo
(papel, gratis) y solo después al módulo. El contraste completo queda así:

**Papel primero (hoy):** dibujos → veredictos del equipo → correcciones al dibujo →
estabilización. **Código después (cuando la raíz esté validada):** contrato aplicado →
módulo construido con su prueba → el dibujo se vuelve pantalla real → se mide su número.
**El error que este mapa evita:** construir un módulo que el equipo aún no ha visto
representado — por eso los siete contratos se escriben **en paralelo a la entrevista, no
antes de ella**: son exploración, y lo que el equipo diga los corrige en el día.

## Parte 3 · El orden de implementación (cuando se pise el papel)

Cuatro fases con su precedencia real —cada fase produce algo que usted puede ver y medir—:

**Fase I · Identidad y datos fundamentales** (IDENTIDAD-CONTEXTO). Sin esto, nada: la
cinta, los colores, alergias, tipo de sangre, medicación y homónimas sostienen a todas
las pantallas de escritura. Al cerrarse, **el dibujo de Consulta y de Control ya son
reales en su parte de identidad**. Números: 100 % de escrituras con cinta; cero
prescripciones sin verificación.

**Fase II · El día visible** (TABLERO + URGENCIA). Estados por eventos, relojes, dueños,
urgente al frente. Al cerrarse, **el dibujo del Tablero y el de la urgencia son reales**.
Números: 18 pacientes en <0,5 s; urgente al frente en el mismo segundo; 0 estados por
clic de buena voluntad.

**Fase III · El día trabajable** (ATENCIONES-CONCURRENTES + ALERTAS). Pausa con retorno,
los seis tipos de aviso con dueño y plazo, y **LABORATORIO** (captura del papel en treinta
segundos —O8— que alimenta el semáforo). Al cerrarse, **los dibujos de Pausa, Alertas,
Laboratorio y los chips de todo el tablero son reales**. Números: cero campos perdidos en
diez alternancias; 0 avisos sin acción; fatiga medida.

**Fase IV · El seguimiento** (PROTOCOLOS + DEGRADACION). Calendarios por diagnóstico,
múltiples por paciente, el catálogo de fallas con sus puentes —el dibujo **FALLA**—, y
**CIERRE + RESPALDO** (O5: traspaso en un clic y drill con sentinela). Al cerrarse, **los
dibujos de Protocolos, Falla y Cierre son reales**. Números: dos
protocolos juntos sin pisarse; 0 mensajes de error con palabra técnica; base íntegra tras
corte simulado.

**Fase V (posterior, con su decisión):** autohistoria por QR sobre el servidor de la fase
pendiente —contrato pendiente de escribir—, y los contratos retrospectivos de los módulos
ya construidos.

## El criterio que gobierna todo el mapa

**Nota de equipos (reparando H-049):** este mapa asumía laptop de estación y computadora
de consultorio; hoy declara además **la terminal del celular (Android) y el servidor de
red de la fase con hardware (G3 / Fase 8)** — el flujo y la pantalla son los mismos en
todos los equipos: una sola verdad que se estrecha (H-042), no dos versiones.

Ninguna fase empieza con dos de sus contratos sin estabilizar; ningún dibujo se toma por
aprobado sin doble veredicto del oficio; y todo módulo nace con su número ya escrito —
la construcción es la última etapa, no la primera.
