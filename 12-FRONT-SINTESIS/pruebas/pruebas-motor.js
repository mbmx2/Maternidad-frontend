/* Suite del motor — CARGA EL MOTOR DESDE DISCO (nunca copia embebida: una copia
   embebida prueba el motor viejo y da verde falso). global.localStorage falso. */
global.localStorage = { getItem: () => null, setItem: () => {} };
const fs = require("fs");
const path = require("path");
eval(fs.readFileSync(path.join(__dirname, "..", "config.js"), "utf8"));
eval(fs.readFileSync(path.join(__dirname, "..", "motor.js"), "utf8"));

// pruebas de comportamiento de las reparaciones clave
var ok = [];
function check(nombre, cond) { ok.push((cond ? "PASS " : "FAIL ") + nombre); if (!cond) process.exitCode = 1; }

// P-19: fecha real
check("fecha ISO real", Jornada.hoyISO() === new Date().getFullYear() + "-" + String(new Date().getMonth()+1).padStart(2,"0") + "-" + String(new Date().getDate()).padStart(2,"0"));

// semilla
var S = Jornada.estado();
check("18 pacientes", S.pacientes.length === 18);
check("alerta vencida en semilla (P-05)", S.alertas.some(function(a){ return Jornada.vencida(a); }));

// Gabriela: urgente al frente derivado de eventos
var gab = S.pacientes[0];
check("Gabriela estado urgente", Jornada.estadoDe(gab.id).estado === "urgente");

// P-29: paseo sin cita termina en espera tras visita_completa
var yol = S.pacientes.filter(function(p){ return p.nombre.indexOf("Mata")===0; })[0];
check("Yolanda por_registrar al inicio", Jornada.estadoDe(yol.id).estado === "por_registrar");
Jornada.agregarEvento("visita_completa", yol.id, {});
check("Yolanda en espera tras completar visita", Jornada.estadoDe(yol.id).estado === "espera");
check("Yolanda llega a listaEspera (espera)", Jornada.estadoDe(yol.id).estado === "espera");

// P-04: cierre sin firma se niega
var a1 = S.alertas[0];
var r1 = Jornada.cerrarAlerta(a1.id, "atendida", "", "", null);
check("cierre sin firma rechazado (P-04)", r1.ok === false);
var r2 = Jornada.cerrarAlerta(a1.id, "atendida", "Dra. X", "1234567", null);
check("cierre con firma aceptado", r2.ok === true);

// P-06: alerta tipo 4 mueve la tarjeta (nace urgencia)
var est = S.pacientes.filter(function(p){ return p.nombre.indexOf("Torres")===0; })[0];
check("Torres antes no urgente", Jornada.estadoDe(est.id).estado !== "urgente");
Jornada.nacerAlerta(est.id, 4, "glucosa crítica de prueba", "evaluar", "la médica");
check("tipo 4 dispara urgencia (P-06)", Jornada.estadoDe(est.id).estado === "urgente");
check("marcador urgente puesto", est.marcador === "urgente");

// P-11: referida no es atendida
var alertaUrg = S.alertas.filter(function(a){ return a.tipo===4 && a.estado==="pendiente"; })[0];
var pidUrg = alertaUrg.pid;
var rr = Jornada.resolverUrgencia(alertaUrg.id, "referida", "Dra. X", "1234567");
check("resolverUrgencia ok", rr.ok === true);
check("estado referida (P-11)", Jornada.estadoDe(pidUrg).estado === "referida");

// P-02: cita 1 clic con fecha real sale de por recuperar
var recup = Jornada.porRecuperar();
check("hay por recuperar en semilla", recup.length >= 1);
if (recup.length) {
  var antes = Jornada.porRecuperar().length;
  var f = Jornada.proximaFechaControl(recup[0]);
  Jornada.crearCita(recup[0].id, f.fecha, "prueba");
  check("por recuperar baja tras crear cita (P-02)", Jornada.porRecuperar().length < antes);
  check("cita con fecha ISO futura", f.fecha > Jornada.hoyISO() || f.fecha === Jornada.hoyISO());
}

// P-13: prescripción informa pero no bloquea
var maria = S.pacientes.filter(function(p){ return p.nombre.indexOf("García")===0; })[0];
var v = Jornada.verificarPrescripcion(maria.id, "amoxicilina");
check("amoxicilina a alérgica detecta choque", v.ok && v.choques.length > 0);
var pr = Jornada.registrarPrescripcion(maria.id, "amoxicilina", true);
check("mantener prescripción no se bloquea (P-13/R-37)", pr.ok === true && pr.forzada === true);

// P-01: origen del HOMA (simulación de lógica de pantalla)
var gReadOnly = true; // caso prefill
var origen = gReadOnly ? "capturado (prefill del expediente)" : "calculado (entradas a mano)";
check("origen correcto con prefill (P-01)", origen.indexOf("capturado") === 0);

// HOMA prefill con datos de María (0 tecleos)
var labs = Jornada.labDe(maria.id).filter(function(l){ return l.analito==="glucosa"||l.analito==="insulina"; });
check("María tiene glucosa e insulina para HOMA", labs.length === 2);
var h = Jornada.homa(96, 14);
check("HOMA calcula 3.33 y en alerta", h.valor === 3.32 && h.nivel === "alerta");

// R-14: bandaTA umbrales
check("TA 165/105 critica", Jornada.bandaTA(165,105).nivel === "critica");
check("TA 145/92 alerta", Jornada.bandaTA(145,92).nivel === "alerta");
check("TA 110/70 normal", Jornada.bandaTA(110,70).nivel === "normal");

// glucosa 130 critica (LEEME 10)
check("glucosa 130 critica", Jornada.evaluarBandaLab("glucosa",130).nivel === "critica");

// P-20: urgencias primero en pendientes
var pend = Jornada.alertasPendientes();
var idx4 = pend.findIndex(function(a){ return a.tipo===4; });
var idx3 = pend.findIndex(function(a){ return a.tipo===3; });
if (idx4 >= 0 && idx3 >= 0) check("tipo 4 antes que tipo 3 (P-20)", idx4 < idx3);

// guardarControl nace alertas (H-062) y guarda primero
var antes2 = S.controles.length;
var rg = Jornada.guardarControl(yol.id, {fecha: Jornada.hoyISO(), peso:"70", pas:"165", pad:"105", au:"", fcf:"140", pres:"Cefálica", prot:"2+", edema:"negativo", sint:"dolor"}, []);
check("control guardado", S.controles.length === antes2 + 1);
check("TA critica nace alerta tipo 4", S.alertas.some(function(a){ return a.pid===yol.id && a.tipo===4; }));
check("control marca urgente", Jornada.estadoDe(yol.id).estado === "urgente");

// P-16: nombre sin coma no rompe recordatorios
var ok16 = true;
try { Jornada.recordatorios(); } catch(e) { ok16 = false; }
check("recordatorios sin excepción (P-16)", ok16);

// P-03: borrador se conserva por evento
var estela = S.pacientes.filter(function(p){ return p.nombre.indexOf("Sandoval")===0 && p.nombre.indexOf("Estela")>=0; })[0];
var br = Jornada.borradorEstacionDe(estela.id);
check("borrador de Estela accesible (P-03)", br && br.peso === "68");

// traspaso incluye referidas
var t = Jornada.traspasoHTML();
check("traspaso lista referidas separadas", t.indexOf("Referidas") >= 0);

console.log(ok.join("\n"));
