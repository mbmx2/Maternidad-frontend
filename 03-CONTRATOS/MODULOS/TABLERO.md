# CONTRATO · TABLERO DEL DÍA — órgano 1

> **Estado: EXPLORACIÓN** (v1 · 2026-10-23 · creado en la primera tanda de contratos).
> No es ley; cambia gratis. Al aplicarse, gobierna la construcción. Fuentes: doctrina
> pilar 1 (con su enmienda de eventos), flujos capas D–F, dibujo `PROPUESTAS/TABLERO.html`.

## 1 · Qué garantiza

- **Nada del día se pierde de vista:** toda entidad del día (paciente, atención, estudio,
  plazo) tiene estado visible y hora de entrada.
- **Los estados se mueven solos:** el tablero cambia por hechos reales, no por clics de
  buena voluntad.
- **La espera tiene reloj:** 30 minutos tiñe la tarjeta de ámbar; 45, de rojo.
- **Lo urgente nunca está abajo:** la urgencia vive al frente, en su propia columna, sea
  cual sea el momento del día.
- **El tablero es una vista, no una verdad doble:** se deriva de los hechos guardados;
  si se pierde, se recalcula sin pérdida.

## 2 · Lógica total

**Estados de paciente en el día:** `por registrar` → `llegó` (o `no llegó`, pasado el
tiempo de su cita con su tolerancia) → `en espera` (estación de constantes o espera de
consulta) → `estación hecha` → `en atención` → `pausada` (sub-estado de quien abrió la
atención) → `atendida`. Estados extra declarados: `falta completar` (registrada de
emergencia con ficha incompleta — convive con cualquier otro), `estación a medias`
(interrupción del carril de enfermería).

**Orden dentro de las zonas:** lo pone el equipo —la enfermera o la médica— con la marca
«prioritaria» (juicio manual, como la urgencia); el software **jamás ordena por hora de
llegada** ni calcula quién sigue: los relojes informan, no ordenan. Dictamen del dueño,
2026-10-25.

**Transiciones por evento (automático):** cita creada ⇒ nace `por registrar` (mostrado como «falta registrar») con hora de
cita · llegada registrada ⇒ `llegó` · estación guardada ⇒ `estación hecha` · atención
abierta desde el tablero ⇒ `en atención` · pausa ⇒ `pausada` · control/nota cerrada ⇒
`atendida` · hora de cita + tolerancia sin llegada ⇒ `no llegó`. **Transiciones manuales
(solo juicio humano):** marcar urgencia · pausar/retomar · mover a `no llegó` antes de
la tolerancia · completar ficha pendiente.

**Relojes:** solo corre el reloj de **espera** (no corre en atención ni en pausa);
umbrales 30/45 minutos, como constantes en un solo lugar (ajustables por decisión, no
por código disperso).

**Columnas (orden de mirada):** urgente · por registrar · en espera · en atención ·
pausada · atendidas · con cita después (las que aún no son de hoy). Chips que acompañan
a cualquier tarjeta: `chequeo vencido` (plazo vencido), `estudio pendiente`,
`falta completar`.

**Reglas de tarjeta:** nombre completo + fecha de nacimiento siempre (contra homónimas)
+ caso/protocolo + reloj + color propio de la atención abierta.

**Invariantes (las que ninguna vista puede romper):** (i) toda tarjeta tiene estado y
hora; (ii) toda transición viene de un evento válido — transición inválida = aviso en
bitácora, jamás cambio silencioso; (iii) `urgente` sobrevive a cualquier reordenación de
columnas; (iv) al cierre del día, cada tarjeta está en `atendida`, `no llegó` o arrastra
un estado con dueño y motivo (nunca un estado sin dueño al final).

**Casos borde:** agenda vacía (el tablero muestra «sin agenda de hoy» con acción de
crear, no un vacío mudo) · 2 pacientes con el mismo nombre (la fecha de nacimiento en la
tarjeta es obligatoria) · más pacientes que pantalla (scroll por columna con barra
visible) · evento duplicado (idempotente: el segundo no cambia nada) · cierre de día
(salida: quiénes quedaron, qué venció, qué falta completar —el traspaso—).

**Errores:** evento perdido ⇒ el estado se reconstruye de los hechos (es una vista
derivada con prueba de igualdad) · reloj atrasado ⇒ se recalcula desde la hora de
entrada guardada, no desde una memoria en pantalla.

## 3 · Por qué esta lógica

La alternativa descartada: tablero que depende de que alguien recuerde mover las
estados —muere en dos semanas y es peor que no tenerlo (autocrítica O1, error 7 de la
ronda de los 25). También se descartó el tope fijo de atenciones (número inventado) y
se descartó guardar estados como dato primario (sería la segunda verdad que su ley
prohíbe).

## 4 · Cómo se implementa

**Datos:** derivación de agenda + eventos + estados de atención (vista derivada con test
de igualdad, como toda vista de este proyecto). **Símbolos nacituras:** `tablero_del_dia`
(cálculo), `aplicar_evento_tablero` (transiciones), `umbrales_espera` (30/45 en un solo
lugar). **Presentación:** sección nueva de la pantalla de inicio (`app::F-7` ampliado),
columnas con rollo interno, tarjetas con color. **Evento:** el mismo que mueve la
atención y la urgencia —un solo canal de eventos del día—.

## 5 · Cuadre: promesa ↔ prueba

Números de la doctrina (pilar 1): 18 pacientes pinta en <0,5 s · 0 tarjetas sin estado
ni hora · 0 estados por clic de buena voluntad · urgente al frente en el mismo segundo.
**Pruebas que se crearán al construir:** `test_tablero_eventos` (cada transición con su
evento y sus inválidas rechazadas), `test_tablero_derivado` (recalculo idéntico),
`test_relojes` (umbrales), `test_tablero_rendimiento` (18 en <0,5 s), y el ratchet de
«toda tarjeta con estado y hora».

## 6 · Prevención de problemas (posibles e improbables)

- **Desactualización silenciosa** (el problema más probable): respuesta — es vista
  derivada, se recalcula; nada que desactualizar.
- **El que nunca cambia estados:** respuesta — casi no hay estados manuales; los que
  quedan tienen dueño declarado por rol (recepción: llegadas; quien atiende: lo suyo).
- **Reloj mentiroso** (espera que sigue corriendo en atención): respuesta — el reloj
  solo corre en espera, probado.
- **El que no llegó confundido con el que espera:** respuesta — tolerancia de cita con
  estado propio y acción de reagendar.
- **Urgente escondida por un reordenamiento:** respuesta — invariante (iii), con prueba.
- **Dos personas mueven la misma tarjeta:** respuesta — los manuales son por rol y con
  hora; doble marca manual = aviso, no pelea.
- **Agenda nunca cargada** (el tablero nacería vacío cada día): respuesta — estado
  «sin agenda de hoy» con acción, y el recordo: la agenda se carga con la llamada
  (transición O9, fuente única).
- **Día con 40 pacientes** (lista larga): respuesta — scroll por columna con barra;
  agrupación por cita después; ningún dato se trunca sin «…» y detalle.
- **Proyección en pantalla grande con nombres de pacientes** (privacidad en sala):
  respuesta — el tablero es de uso interno; la proyección pública no es caso de uso
  declarado (si algún día lo es, se ocultan apellidos con un modo dedicado).
- **Cierre sin traspaso:** respuesta — el invariante (iv) + la pantalla de cierre de
  día (optimización O5, pendiente de su visto bueno).
- **Evento de sistema corrupto** (hora del equipo desalineada): respuesta — relojes
  calculados contra la hora guardada del evento, no contra el reloj del equipo; si el
  equipo está desalineado, el pulso lo detecta (su chequeo de salud lo cubre).
- **La tarjeta huérfana** (atención abierta sin paciente): imposible por construcción
  —la atención nace desde la tarjeta, con su paciente dentro.

## 7 · Estado y bitácora

**EXPLORACIÓN** · v1 2026-10-23 — creado en la primera tanda de contratos (pedido del
dueño: escribir toda la lógica de los módulos del flujo final). Cambios pendientes:
veredicto del equipo en el dibujo (columnas y relojes), y decisión suya sobre la
tolerancia de «no llegó» (¿cuántos minutos?).
