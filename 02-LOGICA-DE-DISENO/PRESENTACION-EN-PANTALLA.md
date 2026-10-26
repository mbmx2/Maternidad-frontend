# PRESENTACIÓN EN PANTALLA LIMITADA — la ventana real manda (doctrina viva)

> Registro vivo (2026-10-23, tras la crítica H-020). **El problema que resuelve:** el
> software final es un programa **autocontenido de escritorio** —sin zoom de navegador,
> sin fuente que se encoge con Ctrl+rueda— y quien lo usa puede **no tener la ventana
> maximizada**. Toda la información tiene que seguir siendo alcanzable, y el programa debe
> seguir aportando valor cuando el médico le cambia el tamaño. Aquí queda el inventario de
> variables que pueden romperlo, trabarlo o perder información a la vista, y las reglas con
> sus números.

## Las reglas (lo que todo dibujo y todo código deben cumplir)

**Regla 1 · El primer vistazo manda.** Lo que la consulta necesita en el primer segundo —
identidad de la paciente, su estado crítico, las 2–3 acciones principales— cabe **sin
ningún desplazamiento** en la ventana mínima. Lo demás se organiza, no se apila.

**Regla 2 · Nada crítico debajo del primer pliegue.** Lo que queda fuera de la primera
vista nunca es crítico: es secundario, histórico o de configuración — y siempre tiene
puerta visible (pestaña, botón, flecha).

**Regla 3 · El desplazamiento vive dentro de la ventana, nunca en la página.** La
estructura imita el programa real: barra fija arriba, menú fijo a la izquierda, y **la
zona de contenido es la que rueda dentro de su marco** —como en una aplicación de
escritorio—. Las listas largas (el tablero) ruedan **en su propia columna**, con barra o
flecha visibles; la página entera no crece.

**Regla 4 · La ventana mínima es un contrato.** Mínimo de trabajo: **1024 × 660**. Por
debajo, el programa no permite bajar más (el marco se queda en el mínimo y avisa), porque
garantizar que no se rompa es mejor que dejar que se rompa. Recomendado: maximizada o
1280 × 800.

**Regla 5 · Cambiar el tamaño no borra nada.** De 1024×660 a 1920×1080 y vuelta: la
pantalla, la paciente activa, lo tecleado y la lista con su posición **se conservan**.
Redimensionar es mirar distinto, no empezar de nuevo.

**Regla 6 · Los diálogos caben en cualquier ventana.** Toda ventana emergente mide menos
que la ventana principal menos un margen, y **sus botones siempre están a la vista** —
nunca un «Aceptar» bajo el borde de la pantalla.

**Regla 7 · El texto se corta con respeto.** Nombres largos, CURP de 18 caracteres, notas
extensas: se cortan con puntos suspensivos y **el texto completo siempre está a un clic
o al pasar el cursor** — la información no desaparece, se aplaza.

**Regla 8 · La fuente no se encoge.** Tamaño base del programa: 13–14 puntos reales, con
una opción de **texto grande** (16) para luz regular y visión cansada. No existe «encoger
para que quepa»: si no cabe, se organiza (Regla 1–3).

**Regla 9 · Nunca solo color.** Todo color va acompañado de palabra («URGENTE» escrito,
no solo rojo): hay personas con daltonismo y hay pantallas con reflejo.

**Regla 10 · El repintado no puede trabar.** Redimensionar o cambiar de pestaña repinta
en menos de 0,1 s; si una operación pesada corre mientras tanto, espera a terminar su
trabajo en segundo plano antes de repintar — la ventana no se congela, ni parpadea, ni
muestra contenido a medias.

## Las variables — todo lo que puede romper, trabar o perder información a la vista

**Grupo A · Ventana y monitor (8 variables):** (1) ventana no maximizada, hecha muy
pequeña a mano; (2) resolución baja heredada (1024×768 o 1366×768, aún comunes en
consultorios); (3) escala de Windows al 125 % o 150 % (la fuente dibujada crece y lo que
cabe ya no cabe); (4) dos monitores con resoluciones distintas y la ventana arrastrada de
uno a otro; (5) cambio de resolución al conectar un proyector o al entrar al modo de
espera; (6) barra de tareas y ventanas encima que recortan la vista; (7) monitor lejos
en el mostrador (la distancia de mirada hace pequeño todo lo pequeño); (8) ventana
restaurada desde el inicio del sistema con un tamaño que nadie recuerda.

**Grupo B · Tipografía y visión (5 variables):** (9) personal mayor o con gafas —el 13
ya es chico—; (10) luz de la clínica con reflejo sobre la pantalla; (11) monitor táctil
donde el dedo necesita objetivos grandes (mínimo 36×36 píxeles para tocar); (12) texto
del sistema en otro tamaño por costumbre del usuario; (13) nombres y apellidos largos
(María del Carmen…) que ya miden el doble en la barra.

**Grupo C · Contenido y truncamiento (6 variables):** (14) CURP de 18 caracteres que no
cabe en su casilla; (15) notas de historia larguísimas en espacios cortos; (16) listas de
18 o más pacientes que superan la altura de la columna; (17) un formulario con 20 campos
(el control prenatal real) en una ventana de 660 de alto; (18) datos opcionales que, si
se muestran todos siempre, tapan lo obligatorio; (19) dos pacientes con nombres casi
iguales donde el recorte del nombre elimina justo la diferencia.

**Grupo D · Interacción y robustez (6 variables):** (20) redimensionar rápido y repetido
(el repintado barato puede congelar si algo pesado corre en medio); (21) minimizar y
restaurar a mitad de captura (¿sigue la paciente activa?); (22) doble clic que maximiza y
luego restaura a un tamaño inesperado; (23) emergencia de sistema (pantalla de bloqueo,
cambio de usuario) a mitad de guardado; (24) ventana emergente más alta que la ventana
principal (botones inalcanzables = pantalla inútil); (25) error técnico que imprime su
mensaje largo y tapa los botones.

**Grupo E · Percepción y color (4 variables):** (26) información codificada solo por
color (daltonismo: ~8 de cada 100 personas); (27) contraste bajo entre texto y fondo en
pantallas baratas; (28) posición de scroll perdida al cambiar de pestaña («¿dónde
estaba?»); (29) contenido escondido detrás de pestañas sin indicador de que hay algo
nuevo («out of sight, out of mind»).

## Las respuestas, agrupadas (a dónde va cada variable)

- **A, D2, D3, D5, D6 → Reglas 4, 5 y 6:** mínimo de ventana, estado que sobrevive al
  resize, diálogos con margen, mensajes cortos con detalles detrás de un clic.
- **B, C → Reglas 1, 2, 7 y 8:** primer vistazo con lo crítico, texto completo a un clic,
  fuente base fija con opción grande, campos opcionales plegados.
- **C6, E1, E3, E4 → Reglas 7, 9 y 3:** corte con «…» + detalle completo, palabra junto
  al color, desplazamiento interno con indicador visible, pestañas con aviso de contenido.
- **D1, D4, E2 → Regla 10:** repintado corto, trabajo pesado fuera del hilo de dibujo,
  contraste verificado (pares ≥4.5:1 —ya es número de este proyecto).

## Los números de aceptación (se miden, no se discuten)

1. En **1024×660** toda acción primaria es alcanzable sin desplazamiento de página.
2. Cero información crítica bajo el primer pliegue de cada pantalla.
3. Todo bloque desplazable muestra su barra o flecha (visible, no al pasar el cursor
   solo).
4. Redimensionar de 1024×660 → 1920×1080 → 1024×660: **cero campos perdidos**, misma
   pantalla, misma paciente activa.
5. Ninguna ventana emergente supera la principal − 40 px; sus botones, siempre visibles.
6. Nombre o CURP largos: corte con «…» + texto completo al cursor o al clic.
7. Texto base ≥13 pt; opción ≥16 pt disponible en un clic.
8. Repintado en resize < 0,1 s, sin congelación ni contenido a medias.

## Dónde se aplica

En los dibujos de `GUIAS/EDICION/PROPUESTAS/` (la estructura de ventana fija con contenido
que rueda dentro ya está aplicada a las 29 páginas) y —lo que manda— en el programa real
cuando estas pantallas se construyan: la ventana mínima, la conservación de estado y el
repintado corto son requisitos de código, con su prueba.
