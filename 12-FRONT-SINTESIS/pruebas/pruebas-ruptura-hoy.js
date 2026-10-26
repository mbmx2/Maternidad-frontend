/* Ruptura del tablero (Tramo B · pantalla hoy): la vista debe derivarse de los hechos,
   el equipo cambiar con registro, y el veredicto persistir. Servidor 8123. */
({ JSDOM, VirtualConsole } = require("jsdom"));
let fallos = 0;
const ok = (n, c, x) => { console.log((c ? "PASS " : "FAIL ") + n + (c ? "" : " — " + (x || ""))); if (!c) fallos++; };
(async () => {
  const vc = new VirtualConsole();
  const errores = [];
  vc.on("jsdomError", e => errores.push(String(e.message || e)));
  const dom = await JSDOM.fromURL("http://127.0.0.1:8123/hoy.html", {
    runScripts: "dangerously", resources: "usable", virtualConsole: vc, pretendToBeVisual: true
  });
  await new Promise(r => setTimeout(r, 700));
  const win = dom.window, doc = win.document;
  const J = win.Jornada;

  ok("hoy sin errores JS", errores.length === 0, errores.slice(0, 2).join(" | "));
  ok("columnas calculadas de hechos (≥6 con contenido)", doc.querySelectorAll(".columna").length >= 6, String(doc.querySelectorAll(".columna").length));
  ok("tarjetas derivadas (≥15)", doc.querySelectorAll(".tarjeta").length >= 15, String(doc.querySelectorAll(".tarjeta").length));
  ok("resumen cuenta la urgencia al frente", doc.getElementById("resumen").textContent.includes("urgente al frente"));
  ok("chip de equipo presente", doc.getElementById("chip-equipo").textContent.includes("Equipo"));

  /* ruptura 1: el equipo sale y vuelve — vía MOTOR (sin mutación directa) */
  const antes = JSON.parse(win.localStorage.getItem(J.clave()) || "null");
  doc.getElementById("btn-sala").click();
  await new Promise(r => setTimeout(r, 50));
  const chip = doc.getElementById("chip-equipo").textContent;
  ok("salir a sala cambia el chip y registra el evento", chip.includes("EQUIPO FUERA") &&
     J.estado().eventos.some(e => e.tipo === "equipo_estado" && e.fuera === true), chip.slice(0, 40));
  doc.getElementById("btn-sala").click();
  await new Promise(r => setTimeout(r, 50));
  ok("volver de sala lo restaura con su evento", doc.getElementById("chip-equipo").textContent.includes("Equipo completo") &&
     J.estado().eventos.filter(e => e.tipo === "equipo_estado").length >= 2);

  /* ruptura 2: el veredicto persiste en el navegador */
  const radio = doc.querySelector("input[name=ver][value='1']");
  radio.checked = true;
  radio.dispatchEvent(new win.Event("change"));
  const guardado = JSON.parse(win.localStorage.getItem("ver_" + J.clave() + "_hoy") || "null");
  ok("veredicto del tablero persistido", guardado && guardado.opcion === "1", JSON.stringify(guardado));

  ok("cero mutaciones directas en la página", !/S\.[a-zA-Z]+ = [^=]/.test(
      doc.querySelector("script:not([src])").textContent.split("btn-sala")[0] || ""), "patrón detectado");
  ok("sin errores al final", errores.length === 0, errores.slice(0, 2).join(" | "));
  console.log(fallos === 0 ? "\nTODO OK" : "\n" + fallos + " FALLOS");
  process.exit(fallos ? 1 : 0);
})();
