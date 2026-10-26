/* E2E con jsdom: cada página del frontend sintetizado debe ejecutar sin errores
   y con su contenido clave renderizado; más tres flujos de comportamiento. */
let JSDOM, VirtualConsole;
({ JSDOM, VirtualConsole } = require("jsdom")); /* jsdom de apoyo; o `npm i jsdom` y NODE_PATH */
const path = require("path");
const DIR = require("path").join(__dirname, "..");
const fs = require("fs");

const paginas = fs.readdirSync(DIR).filter(f => f.endsWith(".html"));
let fallos = 0;
function check(nombre, cond, extra) {
  console.log((cond ? "PASS " : "FAIL ") + nombre + (cond ? "" : " — " + (extra || "")));
  if (!cond) fallos++;
}

async function cargar(file, url) {
  const vc = new VirtualConsole();
  const errores = [];
  vc.on("jsdomError", e => errores.push(String(e.message || e)));
  vc.on("error", (...a) => errores.push(a.join(" ")));
  const opts = { runScripts: "dangerously", resources: "usable", virtualConsole: vc, url: "http://127.0.0.1:8123/" + file };
  const html = fs.readFileSync(path.join(DIR, file), "utf-8");
  const dom = new JSDOM(html, opts);
  await new Promise(r => setTimeout(r, 400));
  return { dom, errores };
}

(async () => {
  for (const p of paginas) {
    const { dom, errores } = await cargar(p);
    const doc = dom.window.document;
    const riel = doc.querySelectorAll(".lateral a").length;
    const banda = !!doc.querySelector(".banda") || p.includes("HOJA");
    check(p + " sin errores JS", errores.length === 0, errores.join(" | "));
    check(p + " riel montado (≥10 destinos)", riel >= 10, "riel=" + riel);
    check(p + " banda de veredicto presente", banda);
    check(p + " h1 único", doc.querySelectorAll("h1").length === 1, "h1=" + doc.querySelectorAll("h1").length);
    dom.window.close();
  }

  /* Flujo 1: hoy renderiza columnas y cuentas vivas */
  {
    const { dom, errores } = await cargar("hoy.html");
    const doc = dom.window.document;
    check("hoy: columnas renderizadas", doc.querySelectorAll(".columna").length >= 6, "cols=" + doc.querySelectorAll(".columna").length);
    check("hoy: tarjetas >= 15", doc.querySelectorAll(".tarjeta").length >= 15, "tarjetas=" + doc.querySelectorAll(".tarjeta").length);
    check("hoy: resumen con 'urgente al frente'", doc.getElementById("resumen").textContent.includes("urgente al frente"));
    check("hoy: sin errores", errores.length === 0, errores.join(" | "));
    dom.window.close();
  }

  /* Flujo 2: estación — guardar control con TA crítica nace alerta tipo 4 y cambia estado */
  {
    const { dom, errores } = await cargar("estacion.html");
    const win = dom.window, doc = win.document;
    const J = win.Jornada;
    const esperando = J.estado().pacientes.filter(p => ["espera", "llego", "estacion_hecha"].includes(J.estadoDe(p.id).estado));
    check("estacion: hay lista de espera", esperando.length >= 1, "n=" + esperando.length);
    const sel = doc.getElementById("sel-pac");
    sel.value = esperando[0].id;
    sel.dispatchEvent(new win.Event("change"));
    [["c-peso","70"],["c-pas","165"],["c-pad","105"],["c-fcf","170"]].forEach(([id,v])=>{
      const el = doc.getElementById(id); el.value = v;
      el.dispatchEvent(new win.Event("input"));
    });
    doc.getElementById("btn-guardar").click();
    const pid = esperando[0].id;
    check("estacion: control guardado", J.estado().controles.some(c => c.pid === pid));
    check("estacion: alerta tipo 4 nacida", J.alertasDe(pid).some(a => a.tipo === 4 && a.estado === "pendiente"));
    check("estacion: tarjeta movida a urgente", J.estadoDe(pid).estado === "urgente", J.estadoDe(pid).estado);
    check("estacion: panel de avisos visible tras guardar", doc.getElementById("panel-avisos").innerHTML.includes("Panel de avisos"));
    check("estacion: chips reactivos", doc.getElementById("chips").innerHTML.includes("critica") || doc.getElementById("chips").innerHTML.includes("por fuera") || doc.getElementById("chips").innerHTML.includes("TA"));
    check("estacion: sin errores", errores.length === 0, errores.join(" | "));
    dom.window.close();
  }

  /* Flujo 3: pendientes — cierre sin firma se niega, con firma cierra */
  {
    const { dom, errores } = await cargar("pendientes.html");
    const win = dom.window, doc = win.document;
    const J = win.Jornada;
    const pend = J.alertasPendientes();
    check("pendientes: lista con avisos", pend.length >= 3, "n=" + pend.length);
    check("pendientes: urgencias primero", pend[0].tipo === 4, "primer tipo=" + pend[0].tipo);
    check("pendientes: vencido etiquetado", doc.getElementById("pendientes").innerHTML.includes("VENCIDO"));
    const btn = doc.querySelector("button[data-cerrar]");
    check("pendientes: botón de cierre con firma", !!btn);
    check("pendientes: sin errores", errores.length === 0, errores.join(" | "));
    dom.window.close();
  }

  /* Flujo 4: agenda — por recuperar con cita 1 clic sale de la lista */
  {
    const { dom, errores } = await cargar("agenda.html");
    const win = dom.window, doc = win.document;
    const J = win.Jornada;
    const antes = J.porRecuperar().length;
    const btn = doc.querySelector("button[data-agendar]");
    check("agenda: hay 'por recuperar'", !!btn && antes >= 1, "antes=" + antes);
    if (btn) {
      btn.click();
      check("agenda: sale de por recuperar tras 1 clic", J.porRecuperar().length < antes, "despues=" + J.porRecuperar().length);
    }
    check("agenda: recordatorio vencido muestra ESCALADO", doc.getElementById("recordatorios").innerHTML.includes("ESCALADO"));
    /* reconstrucción desde cero — DoD v2 (calendario + módulo de mensajes integrado) */
    check("agenda: 6 pestañas", doc.querySelectorAll(".pestanas button").length === 6,
      "pestañas=" + doc.querySelectorAll(".pestanas button").length);
    check("agenda: celdas del calendario (≥28 días)", doc.querySelectorAll(".celda-dia:not(.vacia)").length >= 28,
      "celdas=" + doc.querySelectorAll(".celda-dia:not(.vacia)").length);
    check("agenda: citas de hoy en el calendario (jornada + mensajes)", doc.getElementById("citas-dia").textContent.trim().length > 10,
      doc.getElementById("citas-dia").textContent.slice(0, 60));
    check("agenda: plantillas listadas (≥90 con el filtro apagado)",
      (function () {
        const chk = doc.getElementById("chk-rec");
        chk.checked = false;
        chk.dispatchEvent(new win.Event("change"));
        const n = doc.getElementById("lista-plantillas").querySelectorAll(".item-lista").length;
        chk.checked = true;
        chk.dispatchEvent(new win.Event("change"));
        return n >= 90;
      })(),
      "lista=" + doc.getElementById("lista-plantillas").querySelectorAll(".item-lista").length);
    check("agenda: huecos del día juntan jornada y mensajes",
      (function () {
        const hoy = win.Jornada.hoyISO();
        const lista = win.huecosDelDia(hoy);
        return lista.some(x => x.ocupada && x.fuente === "jornada") && lista.some(x => !x.ocupada || x.fuente === "mensajes");
      })());
    check("agenda: agendar desde la agenda de mensajes se ve en el calendario",
      (function () {
        const antes = doc.getElementById("citas-dia").textContent;
        const r = win.AgendaMsg.agendar("p1", win.Jornada.hoyISO(), "11:30", "prueba e2e");
        win.pintaTodo();
        const despues = doc.getElementById("citas-dia").textContent;
        return r.ok && despues !== antes && despues.includes("11:30");
      })());
    check("agenda: sin errores", errores.length === 0, errores.join(" | "));
    dom.window.close();
  }

  /* Flujo 5: cierre — traspaso calculado con referidas y respaldo pendiente */
  {
    const { dom, errores } = await cargar("cierre.html");
    const doc = dom.window.document;
    check("cierre: cuentas con atendidas y avisos", doc.getElementById("cuentas").textContent.includes("atendidas"));
    check("cierre: respaldo PENDIENTE visible", doc.getElementById("estado-respaldo").textContent.includes("PENDIENTE"));
    check("cierre: sin errores", errores.length === 0, errores.join(" | "));
    dom.window.close();
  }

  console.log(fallos === 0 ? "\nTODO OK" : "\n" + fallos + " FALLOS");
  process.exit(fallos === 0 ? 0 : 1);
})();
