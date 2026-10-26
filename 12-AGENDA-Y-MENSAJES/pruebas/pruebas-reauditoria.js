/* Reauditoría motor + documentos: la documentación debe decir lo mismo que el código. */
global.localStorage = { getItem: () => null, setItem: () => {} };
const fs = require("fs");
const path = require("path");
const raiz = path.join(__dirname, "..");
eval(fs.readFileSync(path.join(raiz, "mensajes.js"), "utf8"));
let fallos = 0;
const ok = (n, c, x) => { console.log((c ? "PASS " : "FAIL ") + n + (c ? "" : " — " + (x || ""))); if (!c) fallos++; };
const lee = f => fs.readFileSync(path.join(raiz, f), "utf8");

/* 1 · Conteos: documento = motor = JSON */
const json = JSON.parse(lee("MENSAJES-MAESTRO.json"));
ok("motor=JSON en plantillas (92)", AgendaMsg.CATALOGO.length === 92 && json.plantillas.length === 92, AgendaMsg.CATALOGO.length + "/" + json.plantillas.length);
ok("motor=JSON en semanas (40)", AgendaMsg.SEMANAS.length === 40 && json.semanas.length === 40);
ok("motor=JSON en diagnósticos (9)", Object.keys(AgendaMsg.DIAGNOSTICOS).length === 9 && json.conteo.diagnosticos === 9);
const leme = lee("LEEME.md"), logica = lee("LOGICA-DE-MENSAJES.md"), aud = lee("AUDITORIA-ADVERSARIAL.md");
ok("LEEME dice 92 plantillas", leme.includes("92 plantillas"));
ok("LEEME dice 40 semanas/filas", leme.includes("40 filas") || leme.includes("40 semanas"));
const mEnDocs = (leme.match(/(\d+) marcadores/)||[])[1];
ok("LEEME: conteo de marcadores = 16 (+5 internos)", mEnDocs === "16", "LEEME dice " + mEnDocs);
ok("LOGICA: la lista de familias cuadra (14·16·6·24·18·14)", logica.includes("| **Logística (L01–L14)** | 14 |") && logica.includes("| **Alarma (A01–A14)** | 14 |"));
const enf = (logica.match(/catorce|quince|catorce nombres|quince nombres/) || [])[0];
const totalEnf = AgendaMsg.examenInocuidad.length; // no expone PROHIBIDO; contamos por fuente
const src = lee("mensajes.js");
const bloque = src.slice(src.indexOf("var PROHIBIDO"), src.indexOf("function examenInocuidad"));
const nEnf = (bloque.match(/\/(preeclampsia|vph|diabetes|anemia|colpitis|tiroides|neoplasia|sepsis|eclampsia|duelo)/g)||[]).length
           + (bloque.match(/hipertensi|c\[áa\]ncer|tumoraci|infecci|depresi/g)||[]).length;
const numEnEspanol = { 15: "quince", 14: "catorce", 16: "dieciséis" };
ok("LOGICA: cuadra el número de enfermedades de la lista negra", logica.includes(nEnf + " enfermedades") || logica.includes((numEnEspanol[nEnF = nEnf] || "?") + " enfermedades"), "código tiene " + nEnf + " y LOGICA dice «" + enf + "»");
const passAudit = (aud.match(/(\d+) PASS/g)||[]).join(",");
ok("AUDITORIA: los conteos de PASS cuadran (35 y 28)", aud.includes("35 PASS") && aud.includes("28 PASS"), "encuentra: " + passAudit);

/* 2 · El mapa del repo debe cubrir esta carpeta (crítica P-23) */
const idx = fs.readFileSync(path.join(raiz, "..", "INDEX.md"), "utf8");
ok("INDEX.md raíz menciona 12-AGENDA-Y-MENSAJES", idx.includes("12-AGENDA-Y-MENSAJES"));

/* 3 · Marcador sin resolver debe PERMANECER en el texto (cero huecos silenciosos) */
const L05 = AgendaMsg.plantilla("L05");
const p1 = AgendaMsg.paciente("p1");
const rHueco = AgendaMsg.resolver(L05.texto, p1, {});
ok("sin contexto: el marcador se conserva (no se convierte en hueco vacío)",
  rHueco.texto.includes("{{fecha_original}}") && rHueco.texto.includes("{{opciones_reprogramacion}}"),
  rHueco.texto.slice(0, 90));
ok("y la copia queda bloqueada por marcadores", AgendaMsg.examenInocuidad(rHueco.texto).length === 0 && rHueco.texto.indexOf("{{") >= 0);
const rMotivo = AgendaMsg.resolver(L05.texto, p1, { fechaOriginal: "2026-11-05", opciones: "lunes 9", motivo: "falta de personal" });
ok("el motivo general llega al mensaje", rMotivo.texto.includes("falta de personal"), rMotivo.texto.slice(0, 100));
const rSinMotivo = AgendaMsg.resolver(L05.texto, p1, { fechaOriginal: "2026-11-05", opciones: "lunes 9" });
ok("sin motivo escrito usa el general por defecto", rSinMotivo.texto.includes("causas imprevistas del consultorio"), rSinMotivo.texto.slice(0, 100));

/* 4 · Funciones exportadas: todas invocables (incluidas las 9 sin consumidor) */
const args = {
  diasEntre: ["2026-01-01", "2026-01-11"], patrones: [12], patronDe: [p1], fuenteDe: [p1],
  citasPorFecha: [AgendaMsg.hoyISO()], plantillas: [], pedidosPendientes: [], SIGNOSALARMA: [], CANALES: [], PATRONES: []
};
let rotas = [];
Object.keys(AgendaMsg).forEach(k => {
  try {
    const f = AgendaMsg[k];
    if (typeof f !== "function") return;
    if (args[k] !== undefined) f.apply(null, args[k]);
    else if (k === "PATRONES") {} else f();
  } catch (e) { rotas.push(k + ": " + e.message); }
});
ok("las 9 funciones sin consumidor externo y el resto se invocan sin romper", rotas.length === 0, rotas.join(" | "));

/* 5 · Derivación: bordes del cálculo */
function pacCon(fecha) { return { fechaEstimada: fecha, egIncerta: false, caso: "Embarazo" }; }
ok("parto estimado HOY ⇒ semana 40", AgendaMsg.semanaDerivada(pacCon(AgendaMsg.hoyISO())) === 40);
ok("parto en +154 días ⇒ semana 18", AgendaMsg.semanaDerivada(pacCon(AgendaMsg.fechaMas(154))) === 18);
ok("parto en +300 días (imposible) ⇒ null", AgendaMsg.semanaDerivada(pacCon(AgendaMsg.fechaMas(300))) === null);
ok("EG incierta ⇒ null", AgendaMsg.semanaDerivada({ fechaEstimada: AgendaMsg.fechaMas(84), egIncerta: true }) === null);
ok("hoyISO es la fecha real", AgendaMsg.hoyISO() === new Date().getFullYear() + "-" + String(new Date().getMonth() + 1).padStart(2, "0") + "-" + String(new Date().getDate()).padStart(2, "0"));

/* 6 · El JSON maestro está al día: regenerarlo no lo cambia */
const fs2 = require("fs");
const rutaJson = path.join(raiz, "MENSAJES-MAESTRO.json");
const antes = fs2.readFileSync(rutaJson, "utf8");
require("child_process").execSync("node generar-maestro.js", { cwd: raiz, stdio: "ignore" });
const despues = fs2.readFileSync(rutaJson, "utf8");
ok("regenerar el JSON no lo cambia (está al día)", antes === despues);
const json2 = JSON.parse(despues);
ok("el JSON regenerado trae motivo_general en marcadores", json2.marcadores_soportados.includes("motivo_general"));

/* 7 · Consentimiento por canal en la misma paciente */
const p5 = AgendaMsg.paciente("p5"); // whatsapp: false
const e5w = AgendaMsg.entregar("L01", "p5", "whatsapp", "Hola Julieta, texto seguro.", null);
const e5i = AgendaMsg.entregar("L01", "p5", "impreso", "Hola Julieta, texto seguro.", null);
ok("sin consentimiento de whatsapp se niega, impreso pasa", e5w.ok === false && e5i.ok === true, (e5w.mensaje||"ok") + " / " + (e5i.mensaje||"ok"));

/* 8 · Marcadores internos jamás salen resueltos */
const rInt = AgendaMsg.resolver("Su valor {{interno_valor}} es…", p1, {});
ok("marcador interno bloquea y no se revela", !rInt.listo && rInt.texto.includes("{{interno_valor}}") && rInt.texto.indexOf("valor") < 0 || rInt.faltantes.includes("interno_valor"), rInt.texto.slice(0, 40));

console.log(fallos === 0 ? "\nTODO OK" : "\n" + fallos + " FALLOS");
process.exit(fallos ? 1 : 0);
