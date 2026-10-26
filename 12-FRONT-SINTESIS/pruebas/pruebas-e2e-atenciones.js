/* Ruptura E2E del módulo de atenciones (jsdom contra http://127.0.0.1:8123).
   Busca exactamente los huecos del análisis §2 y las consideraciones nuevas. */
let JSDOM, VirtualConsole;
try { ({ JSDOM, VirtualConsole } = require("jsdom")); }
catch (e) { ({ JSDOM, VirtualConsole } = require("/tmp/kilo/domtest/node_modules/jsdom")); }
let fallos = 0;
const ok = (n, c, x) => { console.log((c ? "PASS " : "FAIL ") + n + (c ? "" : " — " + (x || ""))); if (!c) fallos++; };

(async () => {
  const vc = new VirtualConsole();
  const errores = [];
  vc.on("jsdomError", e => errores.push(String(e.message || e)));
  vc.on("error", (...a) => errores.push(a.join(" ")));
  const dom = await JSDOM.fromURL("http://127.0.0.1:8123/atenciones.html", {
    runScripts: "dangerously", resources: "usable", virtualConsole: vc, pretendToBeVisual: true
  });
  await new Promise(r => setTimeout(r, 700));
  const win = dom.window, doc = win.document;
  const J = win.Jornada;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const texto = id => doc.getElementById(id).textContent;

  ok("sin errores JS", errores.length === 0, errores.slice(0, 3).join(" | "));

  /* §2 · las tres invisibilidades de la semilla ahora se ven */
  const lista = texto("lista");
  ok("María (pausada) visible con retomar", lista.includes("García Luna") && !!doc.querySelector("button[data-retomar]"), lista.slice(0, 80));
  ok("Estela (estación a mitad) visible con borrador", lista.includes("Sandoval Ruiz") && lista.includes("borrador conservado"));
  ok("Gabriela (urgente) visible con su chip", lista.includes("Peña Sandoval") && doc.querySelector("#lista .chip.rojo"));

  /* métrica y bitácora (M7/M8) */
  ok("métrica presente con desglose", texto("metrica-panel").includes("abiertas") && texto("metrica-panel").includes("medias:"), texto("metrica-panel").slice(0, 100));
  ok("bitácora con movimientos reales", texto("bitacora").includes("estacion mitad") || texto("bitacora").includes("estacion_mitad") || texto("bitacora").includes("retomada"), texto("bitacora").slice(0, 80));

  /* C15 en UI: la urgencia no es opción para abrir */
  const opcionesTipos = Array.from(doc.getElementById("p-tipo").options).map(o => o.value);
  ok("select de tipos sin urgencia", opcionesTipos.length >= 1 && !opcionesTipos.includes("urgencia"), opcionesTipos.join(","));

  /* M9 · rechazo con salida concreta */
  const estelaId = J.estado().pacientes.find(p => p.nombre.indexOf("Sandoval") === 0).id;
  const selPac = doc.getElementById("p-nueva");
  selPac.value = estelaId;
  doc.getElementById("btn-abrir").click();
  await sleep(50);
  ok("rechazo con salida accionable", texto("salida-rechazo").includes("abrir su pantalla y retomarla"), texto("salida-rechazo").slice(0, 90));
  ok("rechazo no navega", win.location.pathname === "/atenciones.html", win.location.pathname);

  /* M5 · pausar SIN navegar (Rosa está en uso) */
  const btnPausar = doc.querySelector("button[data-pausar]");
  ok("hay fila en uso pausable", !!btnPausar);
  const antesPid = btnPausar.getAttribute("data-pausar");
  btnPausar.click();
  await sleep(50);
  ok("pausa directa sin salir de la pantalla", win.location.pathname === "/atenciones.html", win.location.pathname);
  ok("pausa con pausadaEn registrado", J.atencionAbiertaDe(J.estado().atenciones.find(a => a.id === antesPid).pid).pausadaEn != null);
  ok("la fila ahora muestra pausada", doc.querySelector("button[data-retomar]") && texto("lista").includes("pausada"));

  /* M1 · ruptura forzada: quitar el objeto de María ⇒ chip rojo ⇒ sincronizar repara */
  const S = J.estado();
  const maria = S.pacientes.find(p => p.nombre.indexOf("García") === 0);
  const atM = S.atenciones.find(a => a.pid === maria.id && a.abierta);
  ok("María con objeto en la semilla nueva", !!atM);
  atM.abierta = false;
  win.pinta();
  await sleep(50);
  ok("divergencia «sin objeto» visible con reparación", texto("lista").includes("sin objeto de atención") && !!doc.querySelector("button[data-sinc]"), texto("metrica-panel").includes("desincronizada") ? "chip en métrica" : "");
  ok("métrica cuenta la desincronización", texto("metrica-panel").includes("1 desincronizada"), texto("metrica-panel").slice(0, 140));
  doc.querySelector("button[data-sinc]").click();
  await sleep(50);
  ok("sincronizar repara en un clic", !texto("lista").includes("sin objeto de atención") && J.conciliarAtenciones().divergencias.length === 0);
  ok("reparación registrada en bitácora", texto("bitacora").includes("sincronizada") || texto("bitacora").includes("atencion_sincronizada"), texto("bitacora").slice(0, 120));

  ok("sin errores JS al final", errores.length === 0, errores.slice(0, 3).join(" | "));
  console.log(fallos === 0 ? "\nTODO OK" : "\n" + fallos + " FALLOS");
  process.exit(fallos ? 1 : 0);
})();
