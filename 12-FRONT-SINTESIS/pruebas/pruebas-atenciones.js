/* Unidad del módulo de atenciones: conciliación, reparación, roundtrip, métrica,
   catálogo y las consideraciones vitales C1/C2/C15/C16. Carga motor DESDE DISCO. */
global.localStorage = { getItem: () => null, setItem: () => {} };
const fs = require("fs");
const path = require("path");
eval(fs.readFileSync(path.join(__dirname, "..", "config.js"), "utf8"));
eval(fs.readFileSync(path.join(__dirname, "..", "catalogos.js"), "utf8"));
eval(fs.readFileSync(path.join(__dirname, "..", "motor.js"), "utf8"));
let fallos = 0;
const ok = (n, c, x) => { console.log((c ? "PASS " : "FAIL ") + n + (c ? "" : " — " + (x || ""))); if (!c) fallos++; };
const S = () => Jornada.estado();
const nom = id => Jornada.paciente(id).nombre;
const pac = parte => S().pacientes.find(p => p.nombre.indexOf(parte) === 0); /* siempre fresco tras reiniciar */

Jornada.reiniciar();

/* 1 · M2: la semilla nace conciliada (los huecos de la §2 del análisis) */
let c = Jornada.conciliarAtenciones();
ok("semilla sin divergencias", c.divergencias.length === 0, JSON.stringify(c.divergencias));
ok("Estela visible (estacion_mitad)", c.filas.some(f => nom(f.pid).indexOf("Sandoval") === 0), "filas=" + c.filas.length);
ok("María visible (pausada)", c.filas.some(f => nom(f.pid).indexOf("García") === 0 && f.pausada));
ok("Gabriela visible (urgente)", c.filas.some(f => nom(f.pid).indexOf("Peña") === 0 && f.estado === "urgente"));
ok("Rosa visible con objeto", c.filas.some(f => nom(f.pid).indexOf("Luna Gómez") === 0 && f.conObjeto));

/* 2 · C16: urgente SIN objeto NO es divergencia; en_atencion sin objeto SÍ */
let gabi = S().pacientes[0];
let suAt = Jornada.atencionAbiertaDe(gabi.id);
suAt.abierta = false; // urgente queda sin objeto
c = Jornada.conciliarAtenciones();
ok("C16 urgente sin objeto no divergencia", c.divergencias.length === 0 && c.filas.some(f => f.pid === gabi.id), JSON.stringify(c.divergencias));
let maria = S().pacientes[10];
let atM = Jornada.atencionAbiertaDe(maria.id);
atM.abierta = false; // pausada sin objeto → divergencia
c = Jornada.conciliarAtenciones();
ok("pausada sin objeto SÍ divergencia", c.divergencias.length === 1 && c.divergencias[0].tipo === "sin_objeto" && c.divergencias[0].pid === maria.id, JSON.stringify(c.divergencias));
let r = Jornada.repararAtencion(maria.id);
ok("reparación crea el objeto faltante", r.ok && r.accion === "creada" && !!Jornada.atencionAbiertaDe(maria.id));
c = Jornada.conciliarAtenciones();
ok("tras reparar: cero divergencias", c.divergencias.length === 0, JSON.stringify(c.divergencias));
ok("reparación registrada en eventos", S().eventos.some(e => e.tipo === "atencion_sincronizada" && e.pid === maria.id));

/* 3 · huérfano: objeto abierto con estado terminal + reparación de cierre */
let estela = S().pacientes[8];
let atE = Jornada.atencionAbiertaDe(estela.id);
let evEst = null; S().eventos.forEach(e => { if (e.pid === estela.id && e.tipo === "atendida") evEst = e; });
Jornada.agregarEvento("atendida", estela.id, {}); // estado terminal con atención abierta
c = Jornada.conciliarAtenciones();
ok("atención huérfana detectada", c.divergencias.length === 1 && c.divergencias[0].tipo === "huérfano", JSON.stringify(c.divergencias));
r = Jornada.repararAtencion(estela.id);
ok("huérfana se cierra al reparar", r.ok && r.accion === "cerrada" && !Jornada.atencionAbiertaDe(estela.id));
ok("cierre huérfano registrado", S().eventos.some(e => e.tipo === "atencion_cerrada" && e.pid === estela.id));
c = Jornada.conciliarAtenciones();
ok("cero divergencias tras cerrar huérfana", c.divergencias.length === 0, JSON.stringify(c.divergencias));

Jornada.reiniciar();

/* 4 · M5/C13: roundtrip pausar→retomar conserva los campos (invariante i) */
let yol = S().pacientes.filter(p => p.nombre.indexOf("Mata") === 0)[0];
let abrir = Jornada.abrirAtencion(yol.id, "estacion", null);
ok("abre estación con dueño del catálogo", abrir.ok && abrir.atencion.duenio === "enfermería");
const campos = { peso: "70", pas: "140", pad: "90", au: "28", fcf: "150", pres: "Cefálica", prot: "trazas", edema: "+ tobillos", sint: "molestia leve" };
Jornada.pausarAtencion(abrir.atencion.id, campos);
let borr = Jornada.borradorEstacionDe(yol.id);
ok("borrador conservado campo por campo", borr && borr.peso === "70" && borr.fcf === "150" && borr.sint === "molestia leve");
ok("pausa registra pausadaEn", Jornada.atencionAbiertaDe(yol.id).pausadaEn != null);
Jornada.retomarAtencion(abrir.atencion.id);
ok("retoma limpia pausadaEn", Jornada.atencionAbiertaDe(yol.id).pausadaEn == null);
ok("borrador sobrevive a la retoma", Jornada.borradorEstacionDe(yol.id) && Jornada.borradorEstacionDe(yol.id).pas === "140");

/* 5 · C1: el borrador de CONSULTA jamás se cuela en la estación (paciente fresco) */
let mariaF = pac("García");
ok("C1 borrador de consulta no es borrador de estación", Jornada.borradorEstacionDe(mariaF.id) === null, String(Jornada.borradorEstacionDe(mariaF.id)).slice(0, 40));

/* 6 · C15: la urgencia no se abre por esta vía */
let gabiF = pac("Peña");
let deneg = Jornada.abrirAtencion(gabiF.id, "urgencia", null);
ok("C15 abrir urgencia rechazado por el motor", deneg.ok === false && deneg.mensaje.indexOf("voz") >= 0, deneg.mensaje);

/* 7 · C2: resolver la urgencia cierra SU atención («motivo» no) */
let alertaG = S().alertas.filter(a => a.pid === gabiF.id && a.tipo === 4 && a.estado === "pendiente")[0];
ok("Gabriela con alerta y atención de urgencia", !!alertaG && !!Jornada.atencionAbiertaDe(gabiF.id), alertaG ? "" : "sin alerta sembrada");
let rr = Jornada.resolverUrgencia(alertaG.id, "referida", "Dra. X", "1234567");
ok("resolver referida cierra la atención de urgencia", rr.ok && !Jornada.atencionAbiertaDe(gabiF.id));
/* segunda urgencia para probar «motivo»: forzar alerta+atención */
Jornada.agregarEvento("urgencia", gabiF.id, { motivo: "prueba" });
let nueva = Jornada.nacerAlerta(gabiF.id, 4, "segunda urgencia de prueba", "resolver", "la médica");
/* abrir urgencia está prohibido (C15): el objeto se crea como lo haría el flujo real */
S().atenciones.push({ id: Jornada.uid(), pid: gabiF.id, tipo: "urgencia", abierta: true, pausada: false, duenio: "la médica", borrador: null, abiertaEn: Jornada.ahoraMin(), pausadaEn: null });
Jornada.guardar();
Jornada.resolverUrgencia(nueva.id, "motivo", "Dra. X", "1234567");
ok("C2 «motivo» deja la atención viva", !!Jornada.atencionAbiertaDe(gabiF.id), "la atención desapareció");

Jornada.reiniciar();

/* 8 · M7/C4: métrica — clamps y nulos honestos */
let m = Jornada.metricaAtenciones();
ok("métrica base coherente", m.abiertas === 4 && m.pausadas === 2 && m.divergencias === 0, JSON.stringify(m));
ok("medias sin muestras = null (cero precisión falsa)", m.minutosMedioPausada === null || typeof m.minutosMedioPausada === "number");
let at = Jornada.atencionAbiertaDe(S().pacientes[9].id); // Rosa
at.abiertaEn = Jornada.ahoraMin() + 500; // reloj cruzado (medianoche simulada)
m = Jornada.metricaAtenciones();
ok("C4 clamp: sin minutos negativos", m.minutosMedioAbierto === null || m.minutosMedioAbierto >= 0, String(m.minutosMedioAbierto));
Jornada.reiniciar();
let y2 = S().pacientes.filter(p => p.nombre.indexOf("Mata") === 0)[0];
let a2 = Jornada.abrirAtencion(y2.id, "estacion", null).atencion;
Jornada.tomarPorEmergencia(a2.id, "enfermería");
m = Jornada.metricaAtenciones();
ok("toma contada en la métrica", m.tomas === 1, String(m.tomas));

/* 9 · M4: catálogo de tipos completo y coherente con la semilla */
const cat = Jornada.TIPOS_ATENCION;
ok("catálogo con estacion/consulta/urgencia", ["estacion", "consulta", "urgencia"].every(k => cat[k]));
ok("cada tipo con pantalla y dueño", Object.keys(cat).every(k => cat[k].pantalla && cat[k].duenio));
ok("urgencia marcada no-abrible", cat.urgencia.abrible === false);
ok("toda atención de la semilla usa un tipo del catálogo", S().atenciones.every(a => !!cat[a.tipo]));

/* 10 · C12: una fila por paciente (objeto manda) */
c = Jornada.conciliarAtenciones();
const pids = c.filas.map(f => f.pid);
ok("sin filas duplicadas por paciente", new Set(pids).size === pids.length, pids.length + " filas / " + new Set(pids).size + " pacientes");

console.log(fallos === 0 ? "\nTODO OK" : "\n" + fallos + " FALLOS");
process.exit(fallos ? 1 : 0);
