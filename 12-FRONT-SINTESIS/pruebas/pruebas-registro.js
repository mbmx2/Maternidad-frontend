/* Suite del LIBRO DE SÍNTESIS (MG-01…MG-07) — Ronda S-1 endurecida:
   el registro, los archivos, el documento de síntesis y LAS PROPIAS SUITES
   deben decir lo mismo, en vivo. Si el libro miente o envejece, esto cae. */
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const crypto = require("crypto");
const huella = f => crypto.createHash("sha256").update(fs.readFileSync(path.join(RAIZ, f))).digest("hex");
const RAIZ = path.join(__dirname, "..");
let fallos = 0;
const ok = (n, c, x) => { console.log((c ? "PASS " : "FAIL ") + n + (c ? "" : " — " + (x || ""))); if (!c) fallos++; };
const lee = f => fs.readFileSync(path.join(RAIZ, f), "utf8");

/* 1 · Registro: parsea y su versión es la del documento */
let reg;
try { reg = JSON.parse(lee("SINTESIS-REGISTRO.json")); ok("registro JSON parsea", true); }
catch (e) { ok("registro JSON parsea", false, e.message); process.exit(1); }
const sint = lee("SINTESIS-SUMATORIA.md");
ok("sintesis_version = versión del documento",
  !!reg.sintesis_version && sint.includes("Versión del documento: **" + reg.sintesis_version + "**"),
  "registro=" + reg.sintesis_version);

/* 2 · 1:1 disco ↔ registro, sin duplicados */
const archivos = fs.readdirSync(RAIZ).filter(f => f.endsWith(".html")).sort();
const enReg = reg.pantallas.map(p => p.archivo).sort();
const dup = reg.pantallas.map(p => p.archivo).filter((a, i, arr) => arr.indexOf(a) !== i);
ok("sin filas duplicadas", dup.length === 0, dup.join(","));
ok("cada .html del disco está en el registro", archivos.filter(a => !enReg.includes(a)).length === 0,
  "faltan: " + archivos.filter(a => !enReg.includes(a)).join(","));
ok("sin pantallas inexistentes en el registro", enReg.filter(a => !archivos.includes(a)).length === 0,
  "sobran: " + enReg.filter(a => !archivos.includes(a)).join(","));
ok("conteo registro = disco (" + archivos.length + ")", archivos.length === enReg.length);
/* ME-02/ME-03: toda pantalla DECLARA su síntesis en el artejo (meta) y en su barra (chip) —
   la rastreabilidad viaja con el archivo, no solo en el JSON */
let sinMeta = [], sinChip = [];
archivos.forEach(f => {
  const t = fs.readFileSync(path.join(RAIZ, f), "utf8");
  if (!t.includes('<meta name="sintesis" content="' + reg.sintesis_version + '">')) sinMeta.push(f);
  const m = t.match(/class="propuesta">([^<]*)/);
  const fv = reg.frontend_version || "";
  if (!m || !m[1].includes(reg.sintesis_version) || (fv && !m[1].includes(fv))) sinChip.push(f);
});
ok("ME-02: toda pantalla declara su síntesis en <meta> (S1)", sinMeta.length === 0, sinMeta.join(","));
ok("ME-03: toda pantalla muestra síntesis y frontend (S1·V4) en su chip", sinChip.length === 0, sinChip.join(","));

/* TRAMPA DE HUELLA: disco ≠ registro ⇒ «modificada sin registrar» (G-01 automático) */
let tocadas = [];
reg.pantallas.forEach(p => {
  if (!p.huella) tocadas.push(p.archivo + ": sin huella");
  else if (p.huella !== huella(p.archivo)) tocadas.push(p.archivo + ": MODIFICADA SIN REGISTRAR");
});
ok("trampa de huella: ninguna pantalla modificada sin registrar", tocadas.length === 0, tocadas.join(" | "));

/* componentes[] (E1): motor/config/css también viven en el libro */
const compDisk = ["motor.js", "config.js", "front.css"].filter(f => fs.existsSync(path.join(RAIZ, f)));
const compReg = (reg.componentes || []).map(c => c.archivo);
let compProblemas = [];
compDisk.forEach(f => { if (!compReg.includes(f)) compProblemas.push("falta componente " + f); });
compReg.forEach(f => { if (!compDisk.includes(f)) compProblemas.push("componente inexistente " + f); });
(reg.componentes || []).forEach(c => {
  if (!fs.existsSync(path.join(RAIZ, c.archivo))) { compProblemas.push(c.archivo + ": archivo ausente"); return; }
  if (!c.huella) compProblemas.push(c.archivo + ": sin huella");
  else if (c.huella !== huella(c.archivo)) compProblemas.push(c.archivo + ": MODIFICADO SIN REGISTRAR");
  if (c.estado === "pendiente") return;
  if (c.sintesis !== reg.sintesis_version) compProblemas.push(c.archivo + ": DESACTUALIZADO (" + c.sintesis + ")");
  if (!c.fecha || !Array.isArray(c.pruebas) || !c.pruebas.length ||
      !c.checks || !Object.values(c.checks).every(v => typeof v === "number" && v > 0) ||
      !c.evidencia || !fs.existsSync(path.join(RAIZ, c.evidencia.split("#")[0])))
    compProblemas.push(c.archivo + ": evidencia incompleta");
  (c.patrones_aplicados || []).forEach(id => { if (!sint.includes("**" + id + "**")) compProblemas.push(c.archivo + ": patrón inexistente " + id); });
  if (c.estado === "auditado" && (!c.auditoria || !fs.existsSync(path.join(RAIZ, c.auditoria.split("#")[0]))))
    compProblemas.push(c.archivo + ": auditado sin auditoría");
});
ok("componentes registrados, con huella y evidencia", compProblemas.length === 0, compProblemas.join(" | "));

/* 3 · Evidencia obligatoria + ANTI-REGRESIÓN por versión + auditoría si auditado */
const ESTADOS = ["pendiente", "aplicado", "verificado", "auditado"];
let problemas = [];
reg.pantallas.forEach(p => {
  if (!ESTADOS.includes(p.estado)) { problemas.push(p.archivo + ": estado inválido"); return; }
  if (p.estado === "pendiente") return;
  if (p.sintesis !== reg.sintesis_version)
    problemas.push(p.archivo + ": DESACTUALIZADA (sintesis " + p.sintesis + " ≠ " + reg.sintesis_version + ")");
  if (!p.fecha) problemas.push(p.archivo + ": sin fecha");
  if (!Array.isArray(p.pruebas) || !p.pruebas.length) problemas.push(p.archivo + ": sin pruebas[]");
  if (!p.checks || !Object.values(p.checks).every(v => typeof v === "number" && v > 0))
    problemas.push(p.archivo + ": checks vacíos/cero");
  if (!p.evidencia) problemas.push(p.archivo + ": sin evidencia");
  else {
    const [archivoEvid, frag] = p.evidencia.split("#");
    if (!fs.existsSync(path.join(RAIZ, archivoEvid))) problemas.push(p.archivo + ": evidencia inexistente " + archivoEvid);
    else if (frag && !lee(archivoEvid).includes("§" + frag)) problemas.push(p.archivo + ": ancla §" + frag + " no existe en " + archivoEvid);
  }
  if (!Array.isArray(p.patrones_aplicados) || !p.patrones_aplicados.length)
    problemas.push(p.archivo + ": sin patrones_aplicados[]");
  (p.patrones_aplicados || []).forEach(id => {
    if (!/^(ML|MT|MG)-\d{2}$/.test(id)) problemas.push(p.archivo + ": ID mal formado " + id);
    else if (!sint.includes("**" + id + "**")) problemas.push(p.archivo + ": patrón " + id + " no existe en la síntesis");
  });
  (p.pruebas || []).forEach(s => { if (!fs.existsSync(path.join(RAIZ, "pruebas", s))) problemas.push(p.archivo + ": suite inexistente " + s); });
  if (p.estado === "auditado" && (!p.auditoria || !fs.existsSync(path.join(RAIZ, p.auditoria.split("#")[0]))))
    problemas.push(p.archivo + ": auditado sin archivo de auditoría");
});
ok("toda fila activa: versión vigente + evidencia + ancla § + patrones + suites",
  problemas.length === 0, problemas.join(" | "));

/* 4 · Conteos VIVOS: los checks del registro deben ser la salida real de las suites
      (las suites de nodo corren siempre; las e2e solo con servidor 8123). */
function cuentaPassthrough(script) {
  const r = spawnSync("node", [path.join(RAIZ, "pruebas", script)], { encoding: "utf8", timeout: 120000 });
  if (r.status !== 0 && r.status !== 1) throw new Error(script + " no corrió: " + (r.error ? r.error.message : r.status));
  return { pass: ((r.stdout || "").match(/PASS /g) || []).length, fail: ((r.stdout || "").match(/FAIL /g) || []).length, status: r.status };
}
const piloto = reg.pantallas.find(p => p.archivo === "atenciones.html");
try {
  const m = cuentaPassthrough("pruebas-motor.js");
  ok("check en vivo: motor PASS = checks.motor (" + piloto.checks.motor + ")", m.pass === piloto.checks.motor && m.fail === 0,
    "vivo=" + m.pass + " fail=" + m.fail);
  const u = cuentaPassthrough("pruebas-atenciones.js");
  ok("check en vivo: unidad PASS = checks.unidad (" + piloto.checks.unidad + ")", u.pass === piloto.checks.unidad && u.fail === 0,
    "vivo=" + u.pass + " fail=" + u.fail);
} catch (e) { ok("suites de nodo corren", false, e.message); }

function hayServidor() {
  const r = spawnSync("curl", ["-s", "-o", "/dev/null", "-m", "2", "http://127.0.0.1:8123/"], { encoding: "utf8" });
  return r.status === 0;
}
if (process.env.TIER1) {
  console.log("SKIP e2e en vivo: TIER1 (iteración rápida) — conteos e2e verificables con --completo");
} else if (hayServidor()) {
  try {
    const e1 = cuentaPassthrough("pruebas-e2e.js");
    ok("check en vivo: e2e PASS = checks.e2e_paginas (" + piloto.checks.e2e_paginas + ")", e1.pass === piloto.checks.e2e_paginas && e1.fail === 0,
      "vivo=" + e1.pass + " fail=" + e1.fail);
    const e2 = cuentaPassthrough("pruebas-e2e-atenciones.js");
    ok("check en vivo: ruptura PASS = checks.ruptura (" + piloto.checks.ruptura + ")", e2.pass === piloto.checks.ruptura && e2.fail === 0,
      "vivo=" + e2.pass + " fail=" + e2.fail);
  } catch (e) { ok("suites e2e corren", false, e.message); }
} else {
  console.log("SKIP e2e en vivo: sin servidor 8123 (arranque: python3 -m http.server 8123) — conteos e2e NO verificados en esta corrida");
}

/* 4b · Los docs operativos NO hardcodean totales PASS: el vivo es autoauditoria.sh */
["LEEME.md", "PLAN-DE-IMPLEMENTACION.md"].forEach(doc => {
  const t = lee(doc);
  const duros = [...t.matchAll(/\d+\s+PASS/g)].map(m => m[0]);
  ok(doc + ": sin totales PASS hardcodeados (vivo = autoauditoria.sh)", duros.length === 0, duros.join(","));
});

/* 5 · Anti-regresión del piloto */
ok("piloto (atenciones) sigue verificado con versión vigente",
  piloto && piloto.estado === "verificado" && piloto.sintesis === reg.sintesis_version,
  piloto ? piloto.estado + "/" + piloto.sintesis : "ausente");

/* 6 · Ningún documento miente sobre el conteo de pantallas (MG-03 en vivo) */
/* Documentos locales: todo "N pantallas/páginas" = 18 (su alcance es esta carpeta).
   Documentos raíz: solo el BLOQUE que habla de 12-FRONT-SINTESIS (el raíz describe
   muchas carpetas con sus propios conteos: 21, 25, 6… son legítimos). */
["LEEME.md", "ANALISIS-ATENCIONES.md", "SINTESIS-SUMATORIA.md", "PLAN-DE-IMPLEMENTACION.md"].forEach(doc => {
  const ruta = path.join(RAIZ, doc);
  if (!fs.existsSync(ruta)) return;
  const t = fs.readFileSync(ruta, "utf8");
  const malos = [...t.matchAll(/(\d+)\s+(pantallas|páginas)/g)].map(m => parseInt(m[1], 10)).filter(n => n !== archivos.length);
  ok(doc + ": cifras de pantallas/páginas = " + archivos.length, malos.length === 0, "dice: " + [...new Set(malos)].join(","));
});
["../LEEME.md", "../INDEX.md"].forEach(doc => {
  const ruta = path.join(RAIZ, doc);
  if (!fs.existsSync(ruta)) return;
  const t = fs.readFileSync(ruta, "utf8");
  const malos = [];
  let idx = 0;
  while ((idx = t.indexOf("12-FRONT-SINTESIS", idx)) >= 0) {
    /* cada mención se audita en su propio bullet: de aquí a la siguiente viñeta */
    const fin = t.indexOf("\n- ", idx + 5);
    const bloque = t.slice(idx, fin > 0 ? fin : idx + 600);
    [...bloque.matchAll(/(\d+)\s+(pantallas|páginas)/g)]
      .map(m => parseInt(m[1], 10))
      .filter(n => n !== archivos.length)
      .forEach(n => malos.push(n));
    idx += 17;
  }
  ok(doc + ": cifras del bloque 12-FRONT-SINTESIS = " + archivos.length, malos.length === 0, "dice: " + [...new Set(malos)].join(","));
});

/* 7 · MG-05 · MG-06 · MG-07: las pruebas anunciadas, ejecutadas */
const audS = path.join(RAIZ, "AUDITORIA-SINTESIS.md");
const aud12 = path.join(RAIZ, "..", "12-AGENDA-Y-MENSAJES", "AUDITORIA-ADVERSARIAL.md");
const log12 = path.join(RAIZ, "..", "12-AGENDA-Y-MENSAJES", "LOGICA-DE-MENSAJES.md");
const idxRaiz = path.join(RAIZ, "..", "INDEX.md");
const lemeRaiz = path.join(RAIZ, "..", "LEEME.md");
ok("MG-05: existe esta auditoría con su Ronda S-1 y hallazgos con cierre",
  fs.existsSync(audS) && fs.readFileSync(audS, "utf8").includes("Ronda S-1"));
ok("MG-05: la escuela de rondas sigue viva (12-AGENDA con Ronda 6)",
  fs.existsSync(aud12) && fs.readFileSync(aud12, "utf8").includes("Ronda 6"));
ok("MG-06: decisiones abiertas declaradas en LOGICA y en esta auditoría",
  fs.existsSync(log12) && fs.readFileSync(log12, "utf8").includes("decisiones") &&
  fs.existsSync(audS) && fs.readFileSync(audS, "utf8").includes("Decisión abierta"));
ok("MG-07: INDEX raíz y LEEME raíz mencionan el protocolo",
  fs.existsSync(idxRaiz) && fs.readFileSync(idxRaiz, "utf8").includes("SINTESIS-SUMATORIA") &&
  fs.existsSync(lemeRaiz) && fs.readFileSync(lemeRaiz, "utf8").includes("SINTESIS-SUMATORIA"));

/* 8 · La cola existe y hay trabajo hecho y trabajo pendiente */
const pend = reg.pantallas.filter(p => p.estado === "pendiente").length;
ok("libro con piloto hecho y cola viva", pend > 0 && pend < reg.pantallas.length, "pendientes=" + pend);
console.log("\nLibro: " + (reg.pantallas.length - pend) + " aplicadas/verificadas/auditadas · " + pend + " en cola · síntesis " + reg.sintesis_version);
console.log(fallos === 0 ? "TODO OK" : fallos + " FALLOS");
process.exit(fallos ? 1 : 0);
