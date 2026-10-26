# VERSIONES — la genealogía del frontend (bajo qué lógica y flujo se construyó cada versión)

> Registro de las versiones del producto frontend de Maternidad, para que quien lo
> reciba sepa, sin preguntar, de qué viene, con qué lógica y bajo qué flujo fue hecho.

**V1 · Maqueta de pinceles (carpeta 01-DIBUJOS).** Pinceles y fichas de dibujo;
el software no existía todavía. Flujo: dibujo a mano que la maestra aprueba.

**V2 · Front desde cero (carpeta 07-FRONT-NUEVO).** 25 piezas navegables con un
puente simulado; absorbió los errores de la V1 (barra de enlaces, estados congelados).
Su lección fue la cobertura y el instrumento de veredicto; su deuda fue que nada
persistía y parte del puente estaba muerto.

**Pruebas de piso (carpetas 10 y 11).** Entregables de sesión por rol con motor de
eventos; su lección fue que los estados se deducen de hechos; su deuda fue la firma
de cierres y defectos de sesión (auditoría con 30 hallazgos).

**V3 · Síntesis (carpeta 12-FRONT-SINTESIS, nace 2026-10-25).** Un solo motor,
estados derivados y persistentes, veredicto por pantalla, 18 pantallas, 9 suites,
registro con huella y autoauditoría. Lógica aplicada: la síntesis S1 (35 patrones de
modelo lógico, técnico y gubernamental). Flujo: protocolo de 7 pasos por pantalla
(auditar → aplicar → probar en 4 planos → registrar con evidencia).

**V4 · Re-emisión gobernada (2026-10-26).** Mismo motor y mismas pantallas, con el
marco de gobierno nuevo del dueño: leyes de reconfiguración activas (agents, fuentes
de verdad, documentación, archivos), decretos de cero tablas y de checklist de
peticiones, inventario de decisiones con árboles de consecuencias, y el sello V4 en
cada pantalla. No se duplica en otra carpeta a propósito: una sola fuente evita que
las dos versiones diverjan (lección de los dos motores duplicados de10 y 11).

*Cómo se versiona de aquí en adelante: la lógica (S1 → S2) se versiona cuando cambian
sus patrones; el frontend (V4 → V5) se versiona cuando cambia su marco de gobierno.
Ambos quedan escritos aquí y en el registro.*
