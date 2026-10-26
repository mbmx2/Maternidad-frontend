let JSDOM, VirtualConsole;
try { ({ JSDOM, VirtualConsole } = require("jsdom")); }
catch (e) { ({ JSDOM, VirtualConsole } = require("/tmp/kilo/domtest/node_modules/jsdom")); } /* o `npm i jsdom` + NODE_PATH */
/* Requiere el servidor: python3 -m http.server 8124 en esta carpeta. */
let fallos = 0;
const ok = (n, c, x) => { console.log((c ? "PASS " : "FAIL ") + n + (c ? "" : " — " + (x || ""))); if (!c) fallos++; };

(async () => {
  const vc = new VirtualConsole();
  const errores = [];
  vc.on("jsdomError", e => errores.push(String(e.message || e)));
  vc.on("error", (...a) => errores.push(a.join(" ")));
  const dom = await JSDOM.fromURL("http://127.0.0.1:8124/AGENDA.html", {
    runScripts: "dangerously", resources: "usable", virtualConsole: vc, pretendToBeVisual: true
  });
  await new Promise(r => setTimeout(r, 800));
  const win = dom.window, doc = win.document;
  const A = win.AgendaMsg;

  ok("sin errores JS al cargar", errores.length === 0, errores.slice(0,3).join(" | "));
  ok("riel con documentos", doc.querySelectorAll("#lateral a").length >= 5, String(doc.querySelectorAll("#lateral a").length));
  const hoy = new Date();
  const txtReloj = doc.getElementById("reloj").textContent;
  ok("reloj con fecha real de hoy", txtReloj.indexOf(String(hoy.getDate())) >= 0 && txtReloj.indexOf("octubre") >= 0, txtReloj);

  // Pestaña plantillas: recomendadas por defecto y buscador
  doc.getElementById("tab-plantillas").click();
  await new Promise(r => setTimeout(r, 50));
  const items = doc.querySelectorAll("#lista-plantillas .item-lista");
  ok("lista de plantillas con recomendadas activas", items.length >= 15, String(items.length));
  ok("conteo visible", /de 92/.test(doc.getElementById("conteo-lista").textContent), doc.getElementById("conteo-lista").textContent);

  // Seleccionar B01 → preview resuelto con nombre
  doc.querySelector("#lista-plantillas .item-lista").click();
  // elegir explícitamente B01
  const b01 = Array.from(doc.querySelectorAll("#lista-plantillas .item-lista")).find(el => el.getAttribute("data-t") === "B01");
  if (b01) { b01.click(); } else { doc.getElementById("chk-rec").click(); 
    const b01b = Array.from(doc.querySelectorAll("#lista-plantillas .item-lista")).find(el => el.getAttribute("data-t") === "B01");
    if (b01b) b01b.click(); }
  await new Promise(r => setTimeout(r, 50));
  const vta = doc.getElementById("vta-texto");
  ok("preview con nombre resuelto", vta.value.indexOf("María") >= 0 && vta.value.indexOf("{{") < 0, vta.value.slice(0,60));
  ok("copiar habilitado en mensaje resuelto", !doc.getElementById("btn-copiar").disabled);

  // Modo plantilla conserva marcadores
  doc.getElementById("modo-tpl").click();
  await new Promise(r => setTimeout(r, 30));
  ok("modo plantilla muestra {{nombre}}", doc.getElementById("vta-texto").value.indexOf("{{nombre}}") >= 0);
  ok("copiar bloqueado en modo plantilla", doc.getElementById("btn-copiar").disabled);
  doc.getElementById("modo-msg").click();
  await new Promise(r => setTimeout(r, 30));

  // Inocuidad en vivo: escribir texto prohibido bloquea
  doc.getElementById("btn-copiar").disabled = false;
  doc.getElementById("vta-texto").value = "Hola María, su hemoglobina es 9.2 g/dL";
  doc.getElementById("vta-texto").dispatchEvent(new win.Event("input"));
  ok("inocuidad bloquea copia en vivo", doc.getElementById("btn-copiar").disabled === true);
  ok("estado explica el bloqueo", doc.getElementById("vista-estado").textContent.indexOf("inocuidad") >= 0, doc.getElementById("vista-estado").textContent.slice(0,80));

  // Nueva plantilla en blanco validada
  doc.getElementById("btn-nueva").click();
  doc.getElementById("b-nombre").value = "Prueba e2e";
  doc.getElementById("b-texto").value = "Hola {{nombre}}, le escribimos con gusto.";
  doc.querySelector("#panel-blancas .btn").click();
  await new Promise(r => setTimeout(r, 30));
  ok("blanca creada con validación", doc.getElementById("b-estado").textContent.indexOf("Creada") >= 0, doc.getElementById("b-estado").textContent);
  doc.getElementById("b-nombre").value = "Mala";
  doc.getElementById("b-texto").value = "Hola {{nombre}}, tiene diabetes";
  doc.querySelector("#panel-blancas .btn").click();
  ok("blanca con enfermedad rechazada", doc.getElementById("b-estado").textContent.indexOf("inocuidad") >= 0);

  // Semanas: grid 40, edición con overlay
  doc.getElementById("tab-semanas").click();
  await new Promise(r => setTimeout(r, 50));
  ok("grid de 40 semanas", doc.querySelectorAll(".celda-sem").length === 40, String(doc.querySelectorAll(".celda-sem").length));
  doc.querySelector(".celda-sem[data-s='29']").click();
  await new Promise(r => setTimeout(r, 30));
  ok("panel de semana 29 abierto", doc.getElementById("panel-sem").textContent.indexOf("Semana 29") >= 0);
  doc.getElementById("sem-desarrollo").value = "Desarrollo editado e2e";
  doc.getElementById("sem-cuidado").value = "Cuidado editado e2e";
  doc.querySelector("#panel-sem .btn").click();
  await new Promise(r => setTimeout(r, 30));
  ok("edición de semana guardada en grid", doc.querySelector(".celda-sem[data-s='29']").textContent.indexOf("equipo") >= 0);
  // preview semanal de María (28) resuelto
  ok("preview semanal resuelve semana 28", doc.getElementById("sem-preview").textContent.indexOf("semana 28") >= 0, doc.getElementById("sem-preview").textContent.slice(0,100));

  // Citas: composer vinculado
  doc.getElementById("tab-citas").click();
  await new Promise(r => setTimeout(r, 50));
  const mover = doc.querySelector("#lista-citas button[data-mover]");
  ok("citas con botón mover con mensaje", !!mover);
  mover.click();
  await new Promise(r => setTimeout(r, 30));
  ok("contexto de cita vinculado", doc.getElementById("cancel-contexto").textContent.indexOf("vinculada") >= 0);
  doc.getElementById("motivo-cancel").value = "";
  doc.querySelector("button[onclick*=\"compone('cancelar')\"]").click();
  await new Promise(r => setTimeout(r, 30));
  const vtaC = doc.getElementById("vta-cancel");
  ok("cancelación compuesta con fecha original y opciones", vtaC && vtaC.value.indexOf("no podremos atenderle el") >= 0 && vtaC.value.indexOf("Le ofrecemos") >= 0, vtaC ? vtaC.value.slice(0,80) : "sin textarea");
  ok("inocuidad del compositor pasa", vtaC && A.examenInocuidad(vtaC.value).length === 0);
  // ejecutar cancelación real
  doc.querySelector("input[name=modo-ejec][value=cancelar]").checked = true;
  doc.getElementById("cc-ejecutar").click();
  await new Promise(r => setTimeout(r, 30));
  ok("ejecutar cancela la cita con rastro", A.estado().citas.some(c => c.estado === "cancelada"));

  // Disponibilidad
  ok("huecos de disponibilidad pintados", doc.querySelectorAll("#disp-huecos .hueco").length >= 5, String(doc.querySelectorAll("#disp-huecos .hueco").length));
  doc.querySelector("#contenido-citas .btn.sec[onclick='pedirDisp()']").click();
  await new Promise(r => setTimeout(r, 30));
  ok("pedido de disponibilidad creado", A.pedidosPendientes().length === 1, String(A.pedidosPendientes().length));

  // Entregados: métrica y examen verdes
  doc.getElementById("tab-entregas").click();
  await new Promise(r => setTimeout(r, 50));
  ok("examen de inocuidad verde en vivo", doc.getElementById("examen").textContent.indexOf("✓") >= 0, doc.getElementById("examen").textContent.slice(0,120));
  ok("métricas con catálogo 92", doc.getElementById("metricas").textContent.indexOf("92") >= 0);

  // Veredicto persistente
  const radio = doc.querySelector("input[name=ver][value='0']");
  radio.checked = true; radio.dispatchEvent(new win.Event("change"));
  ok("veredicto guardado", (win.localStorage.getItem("ver_agenda_v2") || "").indexOf('"opcion":"0"') >= 0);

  ok("sin errores JS al final", errores.length === 0, errores.slice(0,3).join(" | "));
  console.log(fallos === 0 ? "\nTODO OK" : "\n" + fallos + " FALLOS");
  process.exit(fallos ? 1 : 0);
})();
