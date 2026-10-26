/* Pruebas de RUPTURA — reauditoría. Buscan los huecos que la suite verde no tocaba.
   Requiere: python3 -m http.server 8124 en esta carpeta. */
let JSDOM, VirtualConsole;
try { ({ JSDOM, VirtualConsole } = require("jsdom")); }
catch (e) { ({ JSDOM, VirtualConsole } = require("/tmp/kilo/domtest/node_modules/jsdom")); }
let fallos = 0;
const ok = (n, c, x) => { console.log((c ? "PASS " : "FAIL ") + n + (c ? "" : " — " + (x || ""))); if (!c) fallos++; };

(async () => {
  const vc = new VirtualConsole();
  const errores = [];
  vc.on("jsdomError", e => errores.push(String(e.message || e)));
  const dom = await JSDOM.fromURL("http://127.0.0.1:8124/AGENDA.html", {
    runScripts: "dangerously", resources: "usable", virtualConsole: vc, pretendToBeVisual: true
  });
  await new Promise(r => setTimeout(r, 700));
  const win = dom.window, doc = win.document;
  const A = win.AgendaMsg;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const elegir = (id) => {
    const el = Array.from(doc.querySelectorAll("#lista-plantillas .item-lista")).find(x => x.getAttribute("data-t") === id);
    if (!el) { doc.getElementById("chk-rec").click(); }
    const el2 = Array.from(doc.querySelectorAll("#lista-plantillas .item-lista")).find(x => x.getAttribute("data-t") === id);
    if (el2) el2.click();
    return !!el2;
  };

  doc.getElementById("tab-plantillas").click(); await sleep(50);

  /* B1 · cambiar de paciente DEBE actualizar el nombre del preview */
  ok("B1a elegir B01 con María", elegir("B01"));
  await sleep(30);
  ok("B1b preview con María", doc.getElementById("vta-texto").value.includes("María"), doc.getElementById("vta-texto").value.slice(0, 50));
  const selPac = doc.getElementById("sel-pac");
  selPac.value = "p2"; // Gabriela
  win.cambiaPaciente();
  await sleep(50);
  const trasCambio = doc.getElementById("vta-texto").value;
  ok("B1c al cambiar paciente el mensaje cambia de nombre", trasCambio.includes("Gabriela") && !trasCambio.includes("María,"), trasCambio.slice(0, 60));

  /* B2 · editar el contexto (fecha) DEBE re-resolver — con plantilla que usa {{fecha_cita}} */
  ok("B2a elegir L01 (usa fecha y hora)", elegir("L01"));
  await sleep(30);
  doc.getElementById("ctx-fecha").value = "2027-03-15";
  win.pintaVista();
  await sleep(30);
  ok("B2b la fecha de contexto se refleja en el mensaje", doc.getElementById("vta-texto").value.includes("15 de marzo"), doc.getElementById("vta-texto").value.slice(0, 80));

  /* B3 · la edición del usuario NO debe destruirse con un repintado (pintaTodo) */
  doc.getElementById("vta-texto").value = "TEXTO EDITADO QUE SOBREVIVE";
  doc.getElementById("vta-texto").dispatchEvent(new win.Event("input"));
  win.pintaTodo();
  await sleep(50);
  ok("B3 la edición sobrevive a un repintado general", doc.getElementById("vta-texto").value === "TEXTO EDITADO QUE SOBREVIVE", doc.getElementById("vta-texto").value.slice(0, 60));

  /* B3b · cambiar de contexto con edición NO debe pisarla en silencio */
  doc.getElementById("ctx-hora").value = "11:45";
  win.pintaVista();
  await sleep(30);
  ok("B3b la edición sobrevive al cambio de contexto", doc.getElementById("vta-texto").value === "TEXTO EDITADO QUE SOBREVIVE", doc.getElementById("vta-texto").value.slice(0, 60));

  /* B4 · composer de cancelación: el motivo escrito DEBE llegar al mensaje */
  doc.getElementById("tab-citas").click(); await sleep(50);
  const mover = doc.querySelector("#lista-citas button[data-mover]");
  ok("B4a hay cita para vincular", !!mover);
  mover.click(); await sleep(30);
  doc.getElementById("motivo-cancel").value = "falta de personal";
  doc.querySelector("button[onclick*=\"compone('cancelar')\"]").click();
  await sleep(30);
  const vtaC = doc.getElementById("vta-cancel");
  ok("B4b el motivo general escrito aparece en el mensaje", vtaC && vtaC.value.includes("falta de personal"), vtaC ? vtaC.value.slice(0, 120) : "sin compositor");

  /* B5 · el label del botón de ejecución debe seguir al radio */
  doc.querySelector("input[name=modo-ejec][value=cancelar]").checked = true;
  doc.querySelector("input[name=modo-ejec][value=cancelar]").dispatchEvent(new win.Event("change"));
  await sleep(20);
  const lbl = doc.getElementById("cc-ejecutar").textContent;
  ok("B5 el label sigue a la opción marcada", /cancelar/i.test(lbl), lbl);

  /* B6 · las 92 plantillas deben poder quedar listas con el contexto de la UI */
  doc.getElementById("tab-plantillas").click(); await sleep(50);
  doc.getElementById("chk-rec").click(); await sleep(30); // ver todas
  doc.getElementById("ctx-fecha").value = "2027-03-15";
  doc.getElementById("ctx-hora").value = "10:30";
  doc.getElementById("ctx-doc").value = "INE";
  doc.getElementById("ctx-forig").value = "2027-03-20";
  doc.getElementById("ctx-fcierre").value = "2027-04-01";
  doc.getElementById("ctx-ops").value = "lunes 22 a las 9, o miércoles 24 a las 11";
  win.ponModo("mensaje");
  await sleep(30);
  const bloqueadas = [];
  const total = A.CATALOGO.length;
  for (let i = 0; i < total; i++) {
    win.plantillaSel = A.CATALOGO[i].id;
    win.modo = "mensaje";
    const vta = doc.getElementById("vta-texto");
    vta.dataset.origen = "";
    win.pintaVista();
    await sleep(0);
    if (doc.getElementById("btn-copiar").disabled) bloqueadas.push(A.CATALOGO[i].id);
  }
  ok("B6 las 92 plantillas quedan listas con el contexto de la pantalla", bloqueadas.length === 0, "bloqueadas: " + bloqueadas.slice(0, 8).join(",") + (bloqueadas.length > 8 ? "…" : ""));

  /* B7 · plantilla eliminada → sin botones activos con texto de otra */
  const propiasAntes = A.estado().propias.length;
  if (propiasAntes === 0) { /* crear una */ }
  win.plantillaSel = "B02"; win.modo = "mensaje";
  doc.getElementById("vta-texto").dataset.origen = "";
  win.guardaMia(); await sleep(30);
  const creada = A.estado().propias[A.estado().propias.length - 1];
  ok("B7a personalizada creada", !!creada);
  win.plantillaSel = creada.id; win.modo = "mensaje";
  doc.getElementById("vta-texto").dataset.origen = "";
  win.pintaVista(); await sleep(20);
  A.eliminarPropia(creada.id);
  win.pintaPropias(); win.pintaPlantillas(); win.pintaVista();
  await sleep(30);
  ok("B7b tras eliminar, la copia no sigue activa", doc.getElementById("btn-copiar").disabled || doc.getElementById("vista-info").textContent.includes("no existe"), doc.getElementById("vista-info").textContent.slice(0, 60));

  /* B8 · nav de FLUJOS consistente con AGENDA */
  const flu = await (await fetch("http://127.0.0.1:8124/FLUJOS.html")).text();
  ok("B8 FLUJOS navega a los documentos (LOGICA…)", flu.includes("LOGICA-DE-MENSAJES.md") && flu.includes("../12-FRONT-SINTESIS/hoy.html"), "nav vieja detectada");

  ok("sin errores JS", errores.length === 0, errores.slice(0, 3).join(" | "));
  console.log(fallos === 0 ? "\nTODO OK" : "\n" + fallos + " FALLOS");
  process.exit(fallos ? 1 : 0);
})();
