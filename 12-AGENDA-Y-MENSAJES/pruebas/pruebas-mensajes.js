global.localStorage = { getItem: () => null, setItem: () => {} };
const fs = require("fs");
const path = require("path");
let fallos = 0;
const ok = (n, c, x) => { console.log((c ? "PASS " : "FAIL ") + n + (c ? "" : " — " + (x || ""))); if (!c) fallos++; };
eval(fs.readFileSync(path.join(__dirname, "..", "mensajes.js"), "utf8"));
// 1) Conteo de la batería
const porFam = {};
AgendaMsg.CATALOGO.forEach(t => porFam[t.familia] = (porFam[t.familia] || 0) + 1);
console.log("BATERÍA:", JSON.stringify(porFam), "total:", AgendaMsg.CATALOGO.length, "semanas:", AgendaMsg.SEMANAS.length);
ok("≥90 plantillas", AgendaMsg.CATALOGO.length >= 90, String(AgendaMsg.CATALOGO.length));
ok("6 familias", Object.keys(porFam).length === 6, Object.keys(porFam).join(","));
ok("40 semanas con contenido", AgendaMsg.SEMANAS.length === 40 && AgendaMsg.SEMANAS.every(s => s.desarrollo && s.cuidado));

// 2) Examen de inocuidad resolviendo con una paciente embarazada (ctx completo)
const p1 = AgendaMsg.paciente("p1");
const ctx = { fechaCita: "2026-11-01", horaCita: "10:00", fechaOriginal: "2026-11-05", fechaCierre: "2026-12-20", opciones: "lunes 9 o miércoles 11", documento: "INE" };
let viol = [], sinResolver = [];
AgendaMsg.CATALOGO.forEach(t => {
  const r = AgendaMsg.resolver(t.texto, p1, ctx);
  const mal = AgendaMsg.examenInocuidad(r.texto);
  if (mal.length) viol.push(t.id + ":" + mal.join("|"));
  if (!r.listo) sinResolver.push(t.id + "(" + r.faltantes.join(",") + ")");
});
ok("inocuidad: 0 violaciones en el catálogo", viol.length === 0, viol.slice(0,5).join(" · "));
ok("resolución: 0 marcadores faltantes con ctx completo", sinResolver.length === 0, sinResolver.slice(0,5).join(" · "));

// 3) Semana derivada (R-48): cálculo desde fecha estimada, no captura
const eg = AgendaMsg.semanaDerivada(p1);
ok("semana derivada de María = 28", eg === 28, String(eg));
const pSin = AgendaMsg.paciente("p4");
ok("sin fecha estimada ⇒ semana null (bloquea)", AgendaMsg.semanaDerivada(pSin) === null);
const rSem = AgendaMsg.resolver(AgendaMsg.plantilla("S00").texto, p1, {});
ok("S00 resuelve con semana derivada", rSem.listo && rSem.texto.indexOf("semana 28") >= 0, rSem.faltantes.join(","));
const rSem2 = AgendaMsg.resolver(AgendaMsg.plantilla("S00").texto, pSin, {});
ok("S00 bloqueada sin fecha estimada", !rSem2.listo && rSem2.faltantes.indexOf("semana") >= 0);

// 4) Inocuidad bloquea valores y enfermedades
ok("bloquea HOMA", AgendaMsg.examenInocuidad("Su HOMA es 3.3").length > 0);
ok("bloquea hemoglobina 9.2", AgendaMsg.examenInocuidad("su hemoglobina es 9.2 g/dL").length > 0);
ok("bloquea preeclampsia", AgendaMsg.examenInocuidad("tiene preeclampsia").length > 0);
ok("bloquea decimal suelto", AgendaMsg.examenInocuidad("el valor dio 9.2 ayer").length > 0);
ok("permite fecha con día", AgendaMsg.examenInocuidad("su cita es el 27 de octubre").length === 0);

// 5) Disponibilidad: conflicto y siguiente libre
const hoy = AgendaMsg.hoyISO();
ok("10:00 ocupada hoy (cita sembrada)", AgendaMsg.horaOcupada(hoy, "10:00"));
const rechazo = AgendaMsg.agendar("p2", hoy, "10:00", "prueba");
ok("agendar en hora ocupada se niega", rechazo.ok === false, rechazo.mensaje);
const libre = AgendaMsg.siguienteLibre(hoy, "09:00");
ok("siguiente libre existe y está desocupada", libre && !AgendaMsg.horaOcupada(hoy, libre), String(libre));
const rOk = AgendaMsg.agendar("p2", hoy, libre, "prueba libre");
ok("agendar en hueco libre funciona", rOk.ok === true);

// 6) Entrega validada por el motor
const rTxt = "Hola María, mensaje de prueba seguro.";
const e1 = AgendaMsg.entregar("L01", "p1", "whatsapp", rTxt);
ok("entrega válida pasa", e1.ok === true, e1.mensaje);
const e2 = AgendaMsg.entregar("L01", "p1", "whatsapp", "le salió HOMA 3.3");
ok("entrega con cifra se niega en el motor", e2.ok === false, e2.mensaje);
const e3 = AgendaMsg.entregar("L01", "p1", "whatsapp", "con marcador {{nombre}} sin resolver");
ok("entrega con marcador vivo se niega", e3.ok === false);
const e4 = AgendaMsg.entregar("L01", "p5", "whatsapp", rTxt);
ok("sin consentimiento whatsapp se niega (p5)", e4.ok === false, e4.mensaje);
// dedupe semanal
const s1 = AgendaMsg.resolver(AgendaMsg.plantilla("S00").texto, p1, {}).texto;
const d1 = AgendaMsg.entregar("S00", "p1", "whatsapp", s1, "sem-28");
const d2 = AgendaMsg.entregar("S00", "p1", "whatsapp", s1, "sem-28");
ok("primera entrega semanal pasa", d1.ok === true);
ok("duplicado semanal se niega (dedupe)", d2.ok === false, d2.mensaje);

// 7) Sugerencia con fuente honesta y diagnóstico estructurado
const sug = AgendaMsg.sugerir(p1);
ok("fuente dice semana derivada", sug.fuente.indexOf("semana derivada") >= 0, sug.fuente);
const rosa = AgendaMsg.paciente("p4");
const sugR = AgendaMsg.sugerir(rosa);
ok("Rosa (vacunación) sugiere cada 60 días con dx estructurado", sugR.motivo.indexOf("vacunación") >= 0, sugR.motivo);
ok("fuente de Rosa es diagnóstico estructurado", sugR.fuente.indexOf("estructurado") >= 0, sugR.fuente);

// 8) Plantilla en blanco validada
const nb = AgendaMsg.crearBlanca({ nombre: "Prueba", texto: "Hola {{nombre}}, le escribimos." }, "equipo");
ok("blanca válida se crea", nb.ok === true, nb.mensaje);
const nb2 = AgendaMsg.crearBlanca({ nombre: "Prueba 2", texto: "Hola {{nombre}}, su preeclampsia mejora." }, "equipo");
ok("blanca con enfermedad se niega", nb2.ok === false, nb2.mensaje);
const nb3 = AgendaMsg.crearBlanca({ nombre: "Prueba 3", texto: "Hola, le escribimos sin nombre." }, "equipo");
ok("blanca sin {{nombre}} se niega", nb3.ok === false, nb3.mensaje);

// 9) Personalizada guarda marcadores (re-resoluble con otra paciente)
const copia = AgendaMsg.crearPropia("L01", AgendaMsg.plantilla("L01").texto, "enf. Ana");
const otraP = AgendaMsg.paciente("p2");
const rr = AgendaMsg.resolver(copia.texto, otraP, ctx);
ok("personalizada re-resuelve con otra paciente", rr.listo && rr.texto.indexOf("Gabriela") >= 0, rr.faltantes.join(","));

// 10) Métrica y recomendaciones
const met = AgendaMsg.metricaMensajes();
ok("métrica con totales", met.total > 0 && met.catalogo >= 90, JSON.stringify(met));
const rec = AgendaMsg.recomendadas("p1");
ok("recomendadas para embarazada incluye semanal y alarmas", rec.some(t => t.id === "S00") && rec.some(t => t.familia === "alarma"), String(rec.length));
const recR = AgendaMsg.recomendadas("p4");
ok("recomendadas de Rosa incluye su esquema", recR.some(t => t.id === "D07"), String(recR.length));

// 11) Edición de semana con overlay
AgendaMsg.editarSemana(29, "Texto editado por el equipo", "Cuidado editado", "dra. X");
ok("fila viva usa la edición del equipo", AgendaMsg.filaViva(29).desarrollo === "Texto editado por el equipo");

console.log(fallos === 0 ? "\nTODO OK" : "\n" + fallos + " FALLOS");
process.exit(fallos ? 1 : 0);
