#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");

const RAIZ = __dirname;
const NOM_PROPIO = "buscar-lenguaje.js";
const FRASES_MD = path.join(RAIZ, "12-FRONT-SINTESIS", "FRASES-A-TRADUCIR.md");
const DICC_JSON = path.join(RAIZ, "LENGUAJE-CANDIDATOS.json");

function uso() {
  console.log([
    "Uso: node buscar-lenguaje.js [opciones]",
    "  (sin opciones)  informe completo del texto visible; sale en verde aunque haya hallazgos",
    "  --resumen       una sola línea de conteos (para la autoauditoría)",
    "  --json          hallazgos en JSON crudo",
    "  --exigir        sale en rojo si hay vetos vivos (frases del dueño, placeholders, anglicismos)",
    "  --ruta DIR      escanea SOLO esa carpeta (ensayos y prueba de fuego)",
    "  --historico     añade 07-FRONT-NUEVO, 10-PRUEBA-ENFERMERIA y 11-PRUEBA-MEDICA",
    "Fuentes: frases = FRASES-A-TRADUCIR.md (fuente única) · diccionario = LENGUAJE-CANDIDATOS.json"
  ].join("\n"));
}

const args = process.argv.slice(2);
if (args.includes("--ayuda") || args.includes("-h")) { uso(); process.exit(0); }
const EXIGIR = args.includes("--exigir");
const HISTORICO = args.includes("--historico");
const RESUMEN = args.includes("--resumen");
const JSONMODE = args.includes("--json");
const iRuta = args.indexOf("--ruta");
const RUTA = iRuta >= 0 ? args[iRuta + 1] : null;

function normalizar(s) {
  return String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
function escapar(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function decodificar(s) {
  return String(s)
    .replace(/&nbsp;/g, " ").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function baseLineas(texto) {
  const pos = [0];
  for (let i = 0; i < texto.length; i++) if (texto[i] === "\n") pos.push(i + 1);
  return pos;
}
function lineaDe(pos, idx) {
  let lo = 0, hi = pos.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (pos[mid] <= idx) lo = mid; else hi = mid - 1;
  }
  return lo + 1;
}

let dirs = [];
if (RUTA) {
  dirs = [path.resolve(RUTA)];
} else {
  dirs = [path.join(RAIZ, "12-FRONT-SINTESIS"), path.join(RAIZ, "12-AGENDA-Y-MENSAJES")];
  if (HISTORICO) {
    ["07-FRONT-NUEVO", "10-PRUEBA-ENFERMERIA", "11-PRUEBA-MEDICA"].forEach(d => dirs.push(path.join(RAIZ, d)));
  }
}

function listar(dir) {
  const fuera = [];
  if (!fs.existsSync(dir)) return fuera;
  for (const nom of fs.readdirSync(dir)) {
    const p = path.join(dir, nom);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (nom === "pruebas" || nom === "node_modules") continue;
      fuera.push(...listar(p));
    } else if (/\.(html|js)$/.test(nom) && nom !== NOM_PROPIO) {
      fuera.push(p);
    }
  }
  return fuera;
}

let frases = [];
let frasesOk = false;
if (fs.existsSync(FRASES_MD)) {
  const t = fs.readFileSync(FRASES_MD, "utf8");
  frases = [...new Set([...t.matchAll(/^\s*-\s*«([^»]+)»/gm)].map(m => m[1].trim()))];
  frasesOk = true;
}

let entradas = [];
try {
  entradas = JSON.parse(fs.readFileSync(DICC_JSON, "utf8")).entradas || [];
} catch (e) {
  console.error("FAIL  no se pudo leer el diccionario: " + e.message);
  process.exit(1);
}

function literales(code) {
  const out = [];
  const re = /"((?:[^"\\\n]|\\.)*)"|'((?:[^'\\\n]|\\.)*)'|`((?:[^`\\]|\\.)*)`/g;
  let m;
  while ((m = re.exec(code)) !== null) {
    out.push({ texto: m[1] !== undefined ? m[1] : (m[2] !== undefined ? m[2] : m[3]), idx: m.index + m[0].indexOf(m[1] !== undefined ? m[1] : (m[2] !== undefined ? m[2] : m[3])) });
  }
  return out;
}

function lineasEnBlanco(code) {
  return code.split(/(?<=\n)/).map(l => (/^\s*(\/\/|\*|\/\*)/.test(l) ? " ".repeat(l.length) : l)).join("");
}

function segmentosHtml(bruto) {
  const seg = [];
  const re = /<!--[\s\S]*?-->|<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>|<[^>]+>/g;
  let pos = 0;
  let m;
  while ((m = re.exec(bruto)) !== null) {
    if (m.index > pos) seg.push({ tipo: "texto", texto: bruto.slice(pos, m.index), idx: pos });
    const tok = m[0];
    if (/^<!--/.test(tok)) {
      // omitido
    } else if (/^<script/i.test(tok)) {
      const apertura = /^<script\b[^>]*>/i.exec(tok)[0];
      const cuerpo = tok.slice(apertura.length, tok.length - "</script>".length);
      literales(cuerpo).forEach(l => seg.push({ tipo: "cadena", texto: l.texto, idx: m.index + apertura.length + l.idx }));
    } else if (/^<style/i.test(tok)) {
      // omitido
    } else {
      const attrs = tok.matchAll(/(?:placeholder|title|alt|aria-label|value)\s*=\s*"([^"]*)"|(?:placeholder|title|alt|aria-label|value)\s*=\s*'([^']*)'/gi);
      for (const a of attrs) {
        const val = a[1] !== undefined ? a[1] : a[2];
        const rel = a.index + a[0].indexOf(val);
        seg.push({ tipo: "atributo", texto: val, idx: m.index + rel });
      }
    }
    pos = m.index + tok.length;
  }
  if (pos < bruto.length) seg.push({ tipo: "texto", texto: bruto.slice(pos), idx: pos });
  return seg;
}

const NEXOS = /(?:^|[\s—·:;,'\"(])(y|e|o|u|de|del|la|el|los|las|un|una|en|con|por|para|que|se|lo|al)$/i;

function detectar(segmento, esHtml, archivoBruto) {
  const bruto = segmento.texto;
  const texto = decodificar(bruto);
  const norm = normalizar(texto);
  const base = segmento.idx;
  const esIdent = segmento.tipo === "cadena" && /^[a-zA-Z0-9_\-.#\/]+$/.test(texto);
  const hall = [];
  const placeholders = [/\b(TODO|FIXME|XXX)\b/, /lorem ipsum/i, /texto de plantilla/i];
  for (const re of placeholders) {
    const mm = re.exec(texto);
    if (mm) hall.push({ sev: "veto", cat: "placeholder / texto sin rellenar", match: mm[0], sug: "quitar o rellenar", idx: base + mm.index });
  }
  if (!esIdent) {
    for (const f of frases) {
      const nf = normalizar(f);
      const p = norm.indexOf(nf);
      if (p >= 0) hall.push({ sev: "veto", cat: "frase registrada del dueño", match: f, sug: "traducción pendiente (FRASES-A-TRADUCIR.md → catálogo de lenguaje RQ-C)", idx: base + p });
    }
    for (const e of entradas) {
      let mm = null;
      if (e.tipo === "palabra") {
        const re = new RegExp("\\b" + escapar(e.patron) + "\\b", "i");
        mm = re.exec(texto);
      } else {
        const p = norm.indexOf(normalizar(e.patron));
        if (p >= 0) mm = { 0: texto.substr(p, e.patron.length), index: p };
      }
      if (mm) hall.push({ sev: e.severidad, cat: "palabra de desarrollador", match: mm[0], sug: e.sustituto, fuente: e.fuente, idx: base + mm.index });
    }
  }
  const fin = base + bruto.length;
  const siguiente = archivoBruto.slice(fin, fin + 14);
  const esConcat = segmento.tipo === "cadena" && /^["'`]\s*\+/.test(siguiente);
  const corteDeBloque = /^\s*$/.test(siguiente) || /^<\s*(<\/(p|div|li|h[1-6]|section|ul|ol|tr)\b|<br\b)/i.test(siguiente);
  const permiteCortar = !esConcat && (segmento.tipo !== "texto" || corteDeBloque);
  if (permiteCortar) {
    const limpio = texto.replace(/\s+/g, " ").trim();
    if (limpio.length >= 15 && NEXOS.test(limpio)) {
      hall.push({ sev: "candidato", cat: "posible frase cortada", match: limpio.slice(-28), sug: "la frase termina en nexo: revisar si quedó incompleta", idx: base + Math.max(0, bruto.length - 28) });
    }
  }
  return hall;
}

const archivos = dirs.flatMap(listar);
if (archivos.length === 0) {
  console.error("FAIL  nada que escanear en: " + dirs.join(" · "));
  process.exit(1);
}

const hallazgos = [];
for (const archivo of archivos) {
  const bruto = fs.readFileSync(archivo, "utf8");
  let segmentos;
  if (archivo.endsWith(".html")) {
    segmentos = segmentosHtml(bruto);
  } else {
    const code = lineasEnBlanco(bruto);
    segmentos = literales(code).map(l => ({ tipo: "cadena", texto: l.texto, idx: l.idx }));
  }
  const pos = baseLineas(bruto);
  const vistos = new Set();
  for (const s of segmentos) {
    if (!s.texto || s.texto.length < 2) continue;
    for (const h of detectar(s, archivo.endsWith(".html"), bruto)) {
      const linea = lineaDe(pos, h.idx);
      const clave = archivo + "|" + linea + "|" + h.cat + "|" + normalizar(h.match);
      if (vistos.has(clave)) continue;
      vistos.add(clave);
      hallazgos.push({
        archivo: path.relative(RAIZ, archivo),
        linea,
        severidad: h.sev,
        categoria: h.cat,
        encontrado: h.match,
        sustituto: h.sug || "",
        fuente: h.fuente || ""
      });
    }
  }
}

hallazgos.sort((a, b) => a.archivo.localeCompare(b.archivo) || a.linea - b.linea);
const veto = hallazgos.filter(h => h.severidad === "veto");
const candidatos = hallazgos.filter(h => h.severidad === "candidato");
const frasesVivas = hallazgos.filter(h => h.categoria === "frase registrada del dueño");
const placeholders = hallazgos.filter(h => h.categoria.indexOf("placeholder") === 0);
const anglicismos = veto.filter(h => h.categoria === "palabra de desarrollador");
const conteo = {
  archivos: archivos.length,
  frasesRegistradas: frases.length,
  frasesVivas: frasesVivas.length,
  placeholders: placeholders.length,
  vetoTotal: veto.length,
  anglicismosVeto: anglicismos.length,
  candidatos: candidatos.length,
  hallazgos: hallazgos.length
};

if (JSONMODE) {
  console.log(JSON.stringify({ conteos: conteo, hallazgos }, null, 2));
} else if (RESUMEN) {
  console.log("archivos " + conteo.archivos + " · frases del dueño vivas " + conteo.frasesVivas +
    " · placeholders " + conteo.placeholders + " · anglicismos veto " + conteo.anglicismosVeto +
    " · candidatos " + conteo.candidatos + " · total " + conteo.hallazgos);
} else {
  console.log("BÚSQUEDA DE LENGUAJE — texto visible de las pantallas · " + new Date().toISOString().slice(0, 10));
  console.log("Alcance: " + dirs.map(d => path.relative(RAIZ, d) || d).join(" · ") + " → " + archivos.length + " archivos (.html/.js; sin pruebas/ ni " + NOM_PROPIO + ")");
  console.log("Frases del dueño cargadas: " + (frasesOk ? frases.length + " desde FRASES-A-TRADUCIR.md (fuente única)" : "ARCHIVO NO ENCONTRADO"));
  function bloque(titulo, lista) {
    console.log("");
    console.log(titulo + " — " + lista.length);
    for (const h of lista) {
      let linea = "  " + h.archivo + ":" + h.linea + "  «" + h.encontrado + "»";
      if (h.sustituto) linea += "  →  " + h.sustituto;
      if (h.fuente) linea += "  (" + h.fuente + ")";
      console.log(linea);
    }
  }
  bloque("[VETO] frases registradas del dueño vivas", frasesVivas);
  bloque("[VETO] placeholders / textos sin rellenar", placeholders);
  bloque("[VETO] anglicismos (sin alternativa)", anglicismos);
  bloque("[CANDIDATO] palabras de desarrollador esperando tu sustituto", candidatos.filter(h => h.categoria === "palabra de desarrollador"));
  bloque("[CANDIDATO] posibles frases cortadas", candidatos.filter(h => h.categoria === "posible frase cortada"));
  console.log("");
  console.log("TOTAL: " + conteo.hallazgos + " hallazgos · veto " + conteo.vetoTotal + " · candidatos " + conteo.candidatos);
  console.log("Vivo = informe. Puerta (--exigir, sale en rojo): " + (EXIGIR ? "SÍ" : "no") +
    " — se enciende cuando el dueño fije sustitutos (A17).");
}

if (EXIGIR && (veto.length > 0)) process.exit(1);
process.exit(0);
