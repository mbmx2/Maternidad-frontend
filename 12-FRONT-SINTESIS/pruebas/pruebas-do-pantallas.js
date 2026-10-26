/* DoD de pantallas (KPIS-Y-DOD.md): núcleo comprobado por pantalla + criterios
   específicos por motor, más el cierre del G-14 (autoguardado de la estación). */
global.localStorage = { getItem: () => null, setItem: () => {} };
const fs = require("fs");
const path = require("path");
const RAIZ = path.join(__dirname, "..");
eval(fs.readFileSync(path.join(RAIZ, "config.js"), "utf8"));
eval(fs.readFileSync(path.join(RAIZ, "catalogos.js"), "utf8"));
eval(fs.readFileSync(path.join(RAIZ, "motor.js"), "utf8"));
let fallos = 0;
const ok = (n, c, x) => { console.log((c ? "PASS " : "FAIL ") + n + (c ? "" : " — " + (x || ""))); if (!c) fallos++; };
const S = () => Jornada.estado();

Jornada.reiniciar();

/* —— Núcleo por pantalla (estático: mutación cero, sin restos, sello) —— */
const pantallas = fs.readdirSync(RAIZ).filter(f => f.endsWith(".html"));
const mutaciones = /S\.(pacientes|notas|calculos|citas|alertas|controles|entregas|pedidos|propias|laboratorio)\s*\.\s*(push|unshift|splice|pop)|^\s*p\.[a-zA-Z]+\s*=[^=]/m;
pantallas.forEach(f => {
  const t = fs.readFileSync(path.join(RAIZ, f), "utf-8");
  const inline = (t.match(/<script>([\s\S]*?)<\/script>/g) || []).join("\n");
  ok("DoD·" + f + " · cero mutación directa de estado", !mutaciones.test(inline));
  ok("DoD·" + f + " · sin prompt/alert/TODO ni restos de molde", !/prompt\(|[^.\w]alert\(|TODO|FIXME|Título de la pantalla/.test(inline));
  ok("DoD·" + f + " · sello V4·S1 y meta en su cabecera", t.includes('content="S1"') && /propuesta">V4 · S1/.test(t));
});

/* —— Criterios específicos por motor —— */
/* llegada */
const r1 = Jornada.crearPaciente({ nombre: "", nacimiento: "1990-01-01" });
ok("llegada: crear paciente sin nombre se niega", r1.ok === false);
const r2 = Jornada.crearPaciente({ nombre: "Prueba DoD, Llegada", nacimiento: "1990-01-01", sinCita: true });
ok("llegada: crear paciente registra evento creado", r2.ok && S().eventos.some(e => e.tipo === "creado" && e.pid === r2.paciente.id));
const rv = Jornada.completaVisita(r2.paciente.id, { hora: "10:00", procedencia: "x", ayuno: "si", como: "caminando", acompanante: "", razonDeclarada: "Vino sin cita" }, false, false);
ok("llegada: quien llega sin cita termina en espera (no atrapado)", rv.ok && Jornada.estadoDe(r2.paciente.id).estado === "espera", Jornada.estadoDe(r2.paciente.id).estado);
Jornada.agregarEvento("falta_completar", r2.paciente.id, {});
ok("llegada: el plazo de ficha se pone (falta completar)", Jornada.estadoDe(r2.paciente.id).estado === "falta_completar");
const rc = Jornada.completarFicha(r2.paciente.id, { ciudad: "Oaxaca", curp: "SIN", tel: "951" });
ok("llegada: completar ficha guarda contacto y cierra el plazo", rc.ok && Jornada.paciente(r2.paciente.id).ciudad === "Oaxaca" &&
   Jornada.estadoDe(r2.paciente.id).estado === "atendida" && S().eventos.some(e => e.tipo === "ficha_completa" && e.pid === r2.paciente.id));

/* ficha */
const rf = Jornada.guardarFicha(r2.paciente.id, { alergias: ["sulfa"], sangre: "O+", tel: "951", cronica: "" });
ok("ficha: guardar ficha persiste fundamentales con evento", rf.ok &&
   JSON.stringify(Jornada.paciente(r2.paciente.id).alergias) === '["sulfa"]' &&
   S().eventos.some(e => e.tipo === "ficha_guardada"));
ok("ficha: los que salvan viajan en la cinta", Jornada.cintaHTML(r2.paciente.id).includes("sulfa") && Jornada.cintaHTML(r2.paciente.id).includes("Datos que salvan"));

/* historia */
const n1 = Jornada.firmarNota(r2.paciente.id, { tipo: "Evolución", texto: "nota 1", autor: "Dra. X", cedula: "123" });
ok("historia: nota sin cédula se niega", Jornada.firmarNota(r2.paciente.id, { texto: "x", autor: "Dra. X", cedula: "" }).ok === false);
ok("historia: nota firmada con autor y cédula", n1.ok && n1.nota.autor === "Dra. X" && n1.nota.cedula === "123");
Jornada.firmarNota(r2.paciente.id, { tipo: "Evolución", texto: "nota 2 (enmienda)", autor: "Dra. Y", cedula: "999" });
const notas = S().notas.filter(n => n.pid === r2.paciente.id);
ok("historia: la original queda intacta (inmutabilidad)", notas.length === 2 && notas.find(n => n.texto === "nota 1").autor === "Dra. X");
const ni = Jornada.firmarNota(r2.paciente.id, { tipo: "Interconsulta", texto: "a especialidad", autor: "Dra. X", cedula: "123" });
ok("historia: la interconsulta nace pendiente con dueño", ni.ok && S().alertas.some(a => a.pid === r2.paciente.id && a.tipo === 2 && a.estado === "pendiente"));

/* calculadoras */
const rc1 = Jornada.guardarCalculo(r2.paciente.id, { homa: 4.5, nivel: "critica", texto: "muy por arriba" });
ok("calculadoras: HOMA fuera de banda nace aviso", rc1.ok && S().alertas.some(a => a.texto.indexOf("HOMA-IR 4.5") === 0));
const alertasAntes = S().alertas.length;
Jornada.guardarCalculo(r2.paciente.id, { imc: 31, nivel: "alerta", texto: "sobre peso", origen: "calculado (IMC pregestacional)" });
ok("calculadoras: IMC no inventa aviso clínico", S().alertas.length === alertasAntes);
ok("calculadoras: cálculo queda en el expediente con origen", S().calculos.some(c => c.pid === r2.paciente.id && c.origen === "calculado (IMC pregestacional)"));

/* pendientes (cierre con firma) */
const pa = S().alertas.find(a => a.estado === "pendiente");
ok("pendientes: cerrar sin nombre y cédula se niega", Jornada.cerrarAlerta(pa.id, "atendida", "", "", null).ok === false);
ok("pendientes: cerrar con firma pasa", Jornada.cerrarAlerta(pa.id, "atendida", "Dra. F", "456", null).ok === true);

/* laboratorio (escrito tardío honesto) */
const lab = Jornada.capturarLab(r2.paciente.id, "glucosa", "130", Jornada.hoyISO());
ok("laboratorio: glucosa 130 crítica con aviso", lab.ok && lab.banda.nivel === "critica" && S().alertas.some(a => a.texto.indexOf("Glucosa") === 0 || a.texto.indexOf("glucosa") === 0));
const ayerD = new Date(); ayerD.setDate(ayerD.getDate() - 1);
const ayer = ayerD.getFullYear() + "-" + String(ayerD.getMonth() + 1).padStart(2, "0") + "-" + String(ayerD.getDate()).padStart(2, "0");
const lab2 = Jornada.capturarLab(r2.paciente.id, "hemoglobina", "11", ayer);
ok("laboratorio: lo de antes se marca escrito tardío", lab2.ok && lab2.tardio === true);

/* agenda (recordatorio sin cifras) */
const rec = Jornada.recordatorios();
ok("agenda: hay recordatorios derivados", rec.length >= 1, String(rec.length));
ok("agenda: recordatorios pasan la frontera (sin valores clínicos ni diagnósticos)", rec.length > 0 && rec.every(r => Jornada.examenInocuidad(r.plantilla).length === 0), rec.filter(r => Jornada.examenInocuidad(r.plantilla).length).map(r => r.rid).join(","));

/* agenda — reconstrucción desde cero con DoD v2 (calendario + módulo de mensajes integrado) */
const tagenda = fs.readFileSync(path.join(RAIZ, "agenda.html"), "utf-8");
ok("agenda·v2: seis pestañas con el Calendario primero",
  ["calendario", "citas", "plantillas", "semanas", "propias", "entregas"].every(t => tagenda.includes('id="tab-' + t + '"')) &&
  tagenda.indexOf('id="tab-calendario"') < tagenda.indexOf('id="tab-citas"'));
ok("agenda·v2: calendario del mes pintado por código propio", tagenda.includes('id="cal-grid"') && tagenda.includes("function pintaCalendario"));
ok("agenda·v2: motor de mensajes enlazado como copia canónica", tagenda.includes('src="mensajes.js"'));
ok("agenda·v2: sin el lema viejo «Copiar para llamar»", !tagenda.includes("Copiar para llamar"));
ok("agenda·v2: ninguna frase de la lista vive en esta pantalla",
  !/estación a medias|las llamadas se preparan|cambie con clic|avisos por vencer|el circuito cerrado|copiar para llamar/i.test(tagenda));
eval(fs.readFileSync(path.join(RAIZ, "mensajes.js"), "utf8"));
ok("agenda·v2: motor de mensajes cargado con su batería (≥90 plantillas)",
  typeof AgendaMsg !== "undefined" && AgendaMsg.CATALOGO.length >= 90, String(typeof AgendaMsg !== "undefined" ? AgendaMsg.CATALOGO.length : 0));
ok("agenda·v2: 40 filas de semana en el mismo motor",
  typeof AgendaMsg !== "undefined" && AgendaMsg.SEMANAS.length === 40, String(typeof AgendaMsg !== "undefined" ? AgendaMsg.SEMANAS.length : 0));

/* cierre (se crea primero una referida real: el bloque solo se pinta si hay) */
Jornada.agregarEvento("referida", r2.paciente.id, {});
ok("cierre: el traspaso separa referidas de atendidas", Jornada.traspasoHTML().indexOf("Referidas") >= 0 && Jornada.estadoDe(r2.paciente.id).estado === "referida");

/* fallas: el ensayo queda marcado */
Jornada.marcarRespaldo();
ok("falla: ensayo de respaldo registrado con evento", Jornada.estado().respaldoTarde === true && S().eventos.some(e => e.tipo === "respaldo_ensayado"));

/* urgencia: referida nunca es atendida (regresión-guard) */
const urg = S().alertas.find(a => a.tipo === 4 && a.estado === "pendiente");
if (urg) {
  Jornada.resolverUrgencia(urg.id, "referida", "Dra. U", "789");
  const d = Jornada.estadoDe(urg.pid).estado;
  ok("urgencia: referida no cuenta como atendida", d === "referida" || d === "no_llego" || d === "espera", d);
} else ok("urgencia: hay alerta tipo 4 en semilla para probar", false, "sin alerta de urgencia");
console.log(fallos === 0 ? "\nTODO OK" : "\n" + fallos + " FALLOS");
process.exit(fallos ? 1 : 0);
