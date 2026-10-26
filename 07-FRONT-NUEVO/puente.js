(function () {
  "use strict";

  var MODO_VERDADERO = false;
  try { MODO_VERDADERO = window.localStorage.getItem("fn_verdadero") === "1"; } catch (e) { }
  if (MODO_VERDADERO) document.documentElement.classList.add("verdadero");

  function tv(papel, verdadero) { return MODO_VERDADERO ? verdadero : papel; }

  var CLAVE = "fn_contexto";
  var ordenEstados = [
    "urgente", "no_llego", "por_registrar", "espera",
    "estacion_a_medias", "en_consulta", "pusada", "con_cita", "atendida"
  ];
  var titulos = {
    urgente: "⚠ Urgente",
    no_llego: "No llegó",
    por_registrar: "falta registrar",
    espera: "En espera",
    estacion_a_medias: "Estación a medias",
    en_consulta: "En atención",
    pusada: "Pausada",
    con_cita: "Con cita después",
    atendida: "Atendidas hoy"
  };

  var dia = {
    fecha: "jueves 25 de octubre",
    pacientes: [
      { id: "p1", nombre: "Peña Sandoval, Gabriela", nacimiento: "14 mar 1991", exp: "M-1042", caso: "Cefalea + visión borrosa al guardar · embarazo 34 semanas", estado: "urgente", reloj: 0, dueño: "la médica", color: "rojo", extra: "en atención con la médica", fund: { alergia: "alergia a penicilina", rh: "RH negativo — nota de anti-D", medicacion: "sin medicación actual", cronicas: "ninguna conocida" } },
      { id: "p2", nombre: "Ochoa Trejo, Perla", nacimiento: "02 ago 1994", exp: "M-0987", caso: "Cita de las 10:15 · pasó su tiempo sin aparecer", estado: "no_llego", dueño: "recepción", color: "gris", accionReagendar: true },
      { id: "p3", nombre: "Mata Solís, Yolanda", nacimiento: "19 ene 1997", exp: "nuevo", caso: "Llegó 12:03 · sin cita · registrada en 1 min", estado: "por_registrar", reloj: 0, dueño: "recepción", color: "gris", accionRegistrar: true },
      { id: "p4", nombre: "Bernal Cruz, Rocío", nacimiento: "07 jun 1989", exp: "nuevo", caso: "Primera visita · derivada por el centro de salud · llegó 12:04", estado: "por_registrar", reloj: 0, dueño: "recepción", color: "gris", accionRegistrar: true },
      { id: "p5", nombre: "Herrera Luz, Brenda", nacimiento: "21 dic 1990", exp: "M-0771", caso: "Fertilidad · día 6 del protocolo de ovulación", estado: "espera", reloj: 47, dueño: "recepción", color: "azul", extra: "pasó su tiempo" },
      { id: "p6", nombre: "Torres Vega, Lucía", nacimiento: "11 may 1986", exp: "M-0655", caso: "Tumoración ovárica · esperando su estudio de imagen", estado: "espera", reloj: 34, dueño: "quien captura", color: "azul", extra: "estudio pendiente — reintento" },
      { id: "p7", nombre: "Sandoval Ruiz, Estela", nacimiento: "30 sep 1988", exp: "M-0512", caso: "La estación se interrumpió a mitad · control post-quirúrgico día 21", estado: "estacion_a_medias", reloj: 22, dueño: "enfermería", color: "ambar", extra: "todo conservado", accionEstacion: true },
      { id: "p8", nombre: "Luna Gómez, Rosa", nacimiento: "03 abr 1993", exp: "M-0433", caso: "VPH · aplicación 2 de 4 · con la médica desde 11:58", estado: "en_consulta", reloj: 26, dueño: "quien atiende (la médica)", color: "verde", accionPausar: true },
      { id: "p9", nombre: "García Luna, María", nacimiento: "27 jul 1995", exp: "M-0398", caso: "Control empezado 11:20 · embarazo 28 semanas", estado: "pusada", reloj: 45, dueño: "quien la abrió", color: "azul", accionRetomar: true },
      { id: "p15", nombre: "Mendoza Rojas, Carmen", nacimiento: "05 feb 1993", exp: "M-0451", caso: "Registrada de urgencia a las 11:02 · parto atendido", estado: "espera", reloj: 14, dueño: "enfermería", color: "ambar", extra: "falta completar su ficha", faltaCompletar: true, fund: { alergia: "sin alergias conocidas", rh: "RH positivo", medicacion: "sin medicación actual", cronicas: "ninguna conocida" } },
      { id: "p10", nombre: "Leal Fuentes, Julieta", nacimiento: "16 feb 1982", exp: "M-0301", caso: "Revisión de duelo obstétrico", estado: "con_cita", cita: "12:20", dueño: "recepción", color: "gris" },
      { id: "p11", nombre: "Serrano Dávila, Fernanda", nacimiento: "08 oct 1979", exp: "M-0288", caso: "Tumoración uterina · revisión programada", estado: "con_cita", cita: "12:30", dueño: "recepción", color: "gris" },
      { id: "p12", nombre: "Díaz Paredes, Carolina", nacimiento: "22 nov 1996", exp: "M-0502", caso: "Embarazo 12 semanas · primer control", estado: "atendida", dueño: "quien atiende", color: "verde" },
      { id: "p13", nombre: "Klein Ortiz, Ivonne", nacimiento: "09 ene 1987", exp: "M-0466", caso: "Embarazo 30 semanas · laboratorio de hoy entregado", estado: "atendida", dueño: "quien atiende", color: "verde" },
      { id: "p14", nombre: "Navarrete Sol, Gloria", nacimiento: "13 jun 1992", exp: "M-0410", caso: "Infección · control semana 2 · confidencial", estado: "atendida", dueño: "quien atiende", color: "verde" }
    ],
    eventos: [],
    contexto: null,
    control: null,
    alertas: [
      { id: "ALT-25-001", origen: "control", paciente: "Peña Sandoval, Gabriela", texto: "Presión 160/105 al guardar el control — preeclampsia por combinación (TA + orina grado 2)", nivel: "crítico", estado: "pendiente", dueño: "la médica", nacio: 14, vence: 46 },
      { id: "ALT-25-002", origen: "laboratorio", paciente: "Klein Ortiz, Ivonne", texto: "Potasio 6.8 en el laboratorio en papel — notificar al solicitante y registrar la respuesta", nivel: "crítico", estado: "pendiente", dueño: "enfermería", nacio: 33, vence: 12 },
      { id: "ALT-25-003", origen: "protocolo", paciente: "Herrera Luz, Brenda", texto: "Tamizaje de anemia del trimestre vencido — revisar", nivel: "problema", estado: "pendiente", dueño: "recepción", nacio: 55, vence: 5 },
      { id: "ALT-25-000", origen: "banderas", paciente: "Navarrete Sol, Gloria", texto: "qSOFA incompleto: falta conciencia — se avisó al cerrar la consulta", nivel: "informativo", estado: "atendida", dueño: "la médica", nacio: 90, vence: 0, respuesta: { texto: "Se evaluó con el equipo en la sala", quien: "Dra. Silvia Rentería", cedula: "9821144", hora: "11:42" } }
    ],
    plantillas: [
      { nombre: "Consentimiento de ecografía", tipo: "txt" },
      { nombre: "Consentimiento de cesárea", tipo: "txt" },
      { nombre: "Control prenatal (formato del doctor)", tipo: "docx" },
      { nombre: "Interconsulta", tipo: "docx" },
      { nombre: "Hoja de traslado", tipo: "txt" },
      { nombre: "Aviso de privacidad", tipo: "txt" }
    ],
    llamadas: [
      { quien: "Torres Vega, Lucía", que: "Resultado de laboratorio pendiente desde ayer", texto: "Buenos días de parte de la maternidad: su laboratorio ya está listo, ¿puede pasar hoy?" },
      { quien: "Herrera Luz, Brenda", que: "Día 7 del protocolo — recordar ovulación", texto: "Buenos días: le recuerda su siguiente paso del protocolo de fertilidad." },
      { quien: "Ochoa Trejo, Perla", que: "No llegó a su cita de las 10:15", texto: "Buenos días: notamos que no pudo llegar a su cita. ¿Le reagendamos?" },
      { quien: "Ríos Aguilar, Daniela", que: "Falta contacto tras su derivación", texto: "Buenos días: queríamos saber cómo se encuentra tras su estudio.", estado: "escalado" }
    ],
    citas: [
      { hora: "12:20", quien: "Leal Fuentes, Julieta", que: "Revisión de duelo obstétrico" },
      { hora: "12:30", quien: "Serrano Dávila, Fernanda", que: "Tumoración uterina · revisión" },
      { hora: "13:00", quien: "Peralta Cruz, Nadia", que: "Primer control prenatal" }
    ],
    notas: [
      { fecha: "2026-10-08", tipo: "Control prenatal", quien: "Dra. Silvia Rentería", cedula: "9821144", texto: "Control de las 12 semanas. Sin hallazgos de alarma. Se programa tamizaje de anemia." },
      { fecha: "2026-09-24", tipo: "Primera atención", quien: "Dra. Silvia Rentería", cedula: "9821144", texto: "Ingreso al programa de control prenatal. Antecedentes sin riesgo agregado." }
    ],
    protocolos: [
      { nombre: "Control prenatal", estado: "activo", proximo: "Control en 6 días (35 semanas)", vencido: false, dueno: "quien captura" },
      { nombre: "Tamizaje de anemia", estado: "vencido", proximo: "Hemoglobina del tercer trimestre vencida ayer", vencido: true, dueno: "recepción" },
      { nombre: "Infección de transmisión sexual", estado: "activo", proximo: "2ª dosis en 10 días", vencido: false, dueno: "la médica" }
    ],
    catalogoCasos: ["Embarazo y puerperio", "Tumoración ovárica y uterina", "Infección de transmisión sexual", "Fertilidad y ovulación", "Planificación familiar", "Adolescente con confidencialidad", "Menopausia", "Duelo obstétrico"],
    estudio: { nombre: "US obstétrico — biometría", estado: "pendiente_verificacion", consentimiento: "vigente" },
    parecidasLibres: [
      { nombre: "Torres Vega, Lucia María", exp: "M-0656", caso: "Registro antiguo con variante de nombre — existe en el archivo", estado: "parecida", parecida: true },
      { nombre: "Herrera Luz, Brenda E.", exp: "M-0772", caso: "Registro duplicado histórico del archivo", estado: "parecida", parecida: true }
    ]
  };

  var relojes = [];

  function paciente(idONombre) {
    for (var i = 0; i < dia.pacientes.length; i++) {
      var p = dia.pacientes[i];
      if (p.id === idONombre || p.nombre === idONombre) return p;
    }
    return null;
  }

  function registrarEvento(tipo, detalle) {
    dia.eventos.push({ tipo: tipo, detalle: detalle, minuto: new Date().getHours() * 60 + new Date().getMinutes() });
  }

  function leerContexto() {
    var porUrl = null;
    try { porUrl = new URLSearchParams(window.location.search).get("paciente"); } catch (e) { }
    if (porUrl) { guardarContexto(porUrl); return porUrl; }
    try { return window.localStorage.getItem(CLAVE); } catch (e) { return null; }
  }

  function guardarContexto(nombre) {
    try { window.localStorage.setItem(CLAVE, nombre || ""); } catch (e) { }
    dia.contexto = nombre || null;
  }

  function elegir(idONombre) {
    var p = typeof idONombre === "string" ? (paciente(idONombre) || { nombre: idONombre }) : idONombre;
    if (!p) return null;
    guardarContexto(p.nombre);
    registrarEvento("contexto_cambiado", p.nombre);
    pintarContexto();
    return p;
  }

  function aviso(texto) {
    var a = document.getElementById("aviso");
    if (!a) { a = document.createElement("div"); a.id = "aviso"; document.body.appendChild(a); }
    a.textContent = texto;
    a.style.display = "block";
    window.clearTimeout(a._t);
    a._t = window.setTimeout(function () { a.style.display = "none"; }, 3600);
  }

  function errorHumano(operacion) {
    return { ok: false, mensaje: tv("«" + operacion + "» todavía no está cableada en esta pantalla del papel. Sigue siendo un dibujo: el siguiente paso es conectarla.", "«" + operacion + "»: esta versión de ejemplo aún no la conecta.") };
  }

  function pintarContexto() {
    var el = document.getElementById("contexto");
    if (!el) return;
    var c = leerContexto();
    if (c) {
      el.className = "";
      el.innerHTML = "Paciente abierta: <b></b> — cambie con clic en su tarjeta";
      el.querySelector("b").textContent = c;
    } else {
      el.className = "vacio";
      el.textContent = "Sin paciente abierta — elija una desde Hoy";
    }
  }

  function pintarCuenta() {
    var el = document.getElementById("cuenta-pend");
    if (!el) return;
    var n = 0;
    dia.alertas.forEach(function (a) { if (a.estado === "pendiente") n++; });
    el.textContent = String(n);
    el.className = n ? "cuenta" : "cuenta cero";
  }

  function pintarRelojes() {
    var etiquetas = document.querySelectorAll("[data-reloj]");
    relojes = [];
    for (var i = 0; i < etiquetas.length; i++) {
      var base = parseInt(etiquetas[i].getAttribute("data-reloj"), 10);
      if (isNaN(base)) continue;
      relojes.push({ el: etiquetas[i], base: base, inicio: Date.now() });
    }
    correrRelojes();
    if (relojes.length) window.setInterval(correrRelojes, 20000);
  }

  function correrRelojes() {
    for (var i = 0; i < relojes.length; i++) {
      var r = relojes[i];
      var total = r.base + Math.floor((Date.now() - r.inicio) / 60000);
      if (total < 1 && r.base === 0) { r.el.textContent = "ahora"; r.el.className = "reloj"; continue; }
      r.el.textContent = total + " min";
      r.el.className = "reloj" + (total >= 45 ? " min45" : total >= 30 ? " min30" : "");
    }
  }

  function esc(t) {
    return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function tarjetaHTML(p) {
    var h = '<div class="tarjeta ' + esc(p.color || "gris") + (p.estado === "no_llego" ? " apagada" : "") + '" data-id="' + p.id + '" tabindex="0">';
    if (typeof p.reloj === "number") h += '<span class="reloj" data-reloj="' + p.reloj + '"></span>';
    else if (p.cita) h += '<span class="reloj">' + esc(p.cita) + '</span>';
    h += '<div class="nombre">' + esc(p.nombre) + ' <span class="nac">' + esc(p.nacimiento || "") + "</span></div>";
    h += '<div class="caso" title="' + esc(p.caso) + '">' + esc(p.caso) + "</div>";
    if (p.prioridad) h += '<div class="fila-extra"><span class="chip morado">★ prioritaria</span></div>';
    if (p.extra) h += '<div class="fila-extra"><span class="chip ' + esc(p.color || "gris") + '">' + esc(p.extra) + "</span></div>";
    var principal = "";
    if (p.accionRegistrar) principal = '<a class="btn sec mini" href="llegada.html?paciente=' + encodeURIComponent(p.nombre) + '">Registrar</a>';
    else if (p.accionEstacion) principal = '<a class="btn sec mini" href="estacion.html?paciente=' + encodeURIComponent(p.nombre) + '">Pasar a estación</a>';
    else if (p.accionRetomar) principal = '<a class="btn sec mini" href="consulta.html?paciente=' + encodeURIComponent(p.nombre) + '">Retomar</a>';
    else if (p.accionPausar) principal = '<button class="btn sec mini" data-pausar="' + p.id + '">Pausar</button>';
    else if (p.accionReagendar) principal = '<a class="btn sec mini" href="agenda.html?paciente=' + encodeURIComponent(p.nombre) + '">Reagendar</a>';
    else if (p.estado === "espera") principal = '<a class="btn sec mini" href="estacion.html?paciente=' + encodeURIComponent(p.nombre) + '">Pasar a estación</a>';
    var marcas = "";
    if (["espera", "por_registrar", "con_cita", "estacion_a_medias"].indexOf(p.estado) >= 0) {
      marcas = '<button class="accion-icona" title="Marcar urgencia" data-urgir="' + p.id + '">⚠</button>' +
        '<button class="accion-icona" title="' + (p.prioridad ? "Quitar prioridad" : "Prioritaria — la marca el equipo") +
        '" data-priori="' + p.id + '">' + (p.prioridad ? "★" : "☆") + "</button>";
    }
    if (principal || marcas) h += '<div class="fila-extra acciones-tarjeta">' + principal + marcas + "</div>";
    if (p.dueño) h += '<div class="dueno">Dueño: ' + esc(p.dueño) + "</div>";
    h += "</div>";
    return h;
  }

  function renderDia() {
    var zona = document.getElementById("zona-dia");
    if (!zona) return;
    var porEstado = {};
    ordenEstados.forEach(function (e) { porEstado[e] = []; });
    dia.pacientes.forEach(function (p) { (porEstado[p.estado] || (porEstado[p.estado] = [])).push(p); });
    var html = "";
    ordenEstados.forEach(function (estado) {
      var lista = porEstado[estado];
      if (!lista || !lista.length) return;
      lista = lista.slice().sort(function (a, b) { return (b.prioridad ? 1 : 0) - (a.prioridad ? 1 : 0); });
      html += '<div id="col-' + estado + '" class="columna' + (estado === "urgente" ? " urgente" : "") + '">';
      html += "<h2><span>" + esc(titulos[estado] || estado) + "</span><span>" + lista.length + "</span></h2>";
      lista.forEach(function (p) { html += tarjetaHTML(p); });
      html += "</div>";
    });
    zona.innerHTML = html;
    var chips = document.getElementById("chips-dia");
    if (chips) {
      var n = function (e) { return (porEstado[e] || []).length; };
      var conReloj = 0;
      dia.alertas.forEach(function (a) { if (a.estado === "pendiente" && a.vence <= 15) conReloj++; });
      var sigue = null;
      dia.pacientes.forEach(function (p) { if (!sigue && p.prioridad && p.estado !== "urgente" && p.estado !== "atendida") sigue = p; });
      chips.innerHTML =
        (sigue ? '<button class="chip morado" data-col="' + esc(sigue.estado) + '">★ sigue: ' + esc(sigue.nombre) + "</button> " : "") +
        (n("urgente") ? '<button class="chip rojo" data-col="urgente">⚠ urgente: ' + n("urgente") + "</button> " : "") +
        '<button class="chip gris" data-col="por_registrar">falta registrar: ' + n("por_registrar") + "</button> " +
        '<button class="chip azul" data-col="espera">en espera: ' + n("espera") + "</button> " +
        (conReloj ? '<a class="chip rojo" href="pendientes.html">' + conReloj + " avisos por vencer o vencidos</a> " : "") +
        '<span class="chip verde">' + n("atendida") + " atendidas</span>";
    }
    pintarRelojes();
  }

  function renderCinta() {
    var cinta = document.getElementById("cinta");
    if (!cinta) return;
    var c = leerContexto();
    var p = c ? paciente(c) : null;
    if (!p) {
      cinta.innerHTML = '<span class="vacio">Sin paciente abierta — entre desde Hoy o regístrela en Llegadas.</span>';
      return;
    }
    var f = p.fund || {};
    var conAlergia = !!(f.alergia && f.alergia !== "sin alergias conocidas");
    cinta.innerHTML = '<span class="quien"></span>' +
      '<span class="dato">Nacimiento: ' + esc(p.nacimiento || "—") + "</span>" +
      '<span class="dato">Expediente: ' + esc(p.exp || "—") + "</span>" +
      '<span class="fund' + (conAlergia ? " alarma" : "") + '">' + (conAlergia ? "⚠ " : "") + esc(f.alergia || "sin alergias conocidas") + "</span>" +
      '<span class="fund">' + esc(f.rh || "RH positivo") + "</span>" +
      '<span class="fund">' + esc(f.medicacion || "sin medicación actual") + "</span>" +
      (f.cronicas ? '<span class="fund">' + esc(f.cronicas) + "</span>" : "");
    cinta.querySelector(".quien").textContent = p.nombre;
  }

  function exigirContexto() {
    var c = leerContexto();
    if (!c) {
      aviso("Primero elija a la paciente: haga clic en su tarjeta desde Hoy.");
      return null;
    }
    return c;
  }

  var puente = {
    listar_dia: renderDia,
    elegir_paciente: function (x) { elegir(x); return { ok: true }; },
    registrar_llegada: function (id) {
      var p = paciente(id);
      if (!p) return { ok: false, mensaje: "No aparece esa paciente en el día." };
      p.estado = "espera"; p.reloj = 0; p.color = "azul";
      registrarEvento("llegada_registrada", p.nombre);
      return { ok: true };
    },
    registro_rapido: function (datos) {
      var nombre = ((datos && datos.nombre) || "").trim();
      if (!nombre) return { ok: false, mensaje: "Falta el nombre: con apellidos y nombres ya se puede registrar." };
      var id = "p" + (dia.pacientes.length + 1) + "-" + Math.floor(Math.random() * 99);
      dia.pacientes.push({
        id: id, nombre: nombre, nacimiento: (datos && datos.fecha) || "—", exp: "nuevo",
        caso: ((datos && datos.motivo) || "sin cita") + ((datos && datos.ciudad) ? " · de " + datos.ciudad : "") + " · registrada · falta completar su ficha",
        estado: "espera", reloj: 0, color: "azul", dueño: "recepción",
        extra: "falta completar ficha",
        ciudad: (datos && datos.ciudad) || "", tel: (datos && datos.tel) || "",
        fund: { telefono: (datos && datos.tel) || "", ciudad: (datos && datos.ciudad) || "", curp: (datos && datos.curp) || "" }
      });
      registrarEvento("paciente_creada", nombre);
      elegir(nombre);
      return { ok: true, id: id, nombre: nombre };
    },
    marcar_no_llego: function (id) {
      var p = paciente(id);
      if (!p) return { ok: false, mensaje: "No aparece esa cita en el día." };
      p.estado = "no_llego"; p.color = "gris"; p.extra = "el estado cambió solo al vencer su hora";
      registrarEvento("estado_cambiado", p.nombre + " → no llegó");
      return { ok: true };
    },
    pausar: function (id) {
      var p = paciente(id);
      if (!p) return { ok: false, mensaje: "No se encontró la atención." };
      p.estado = "pusada"; p.color = "azul"; p.extra = "todo conservado";
      p.accionPausar = false; p.accionRetomar = true;
      registrarEvento("pausa_abierta", p.nombre);
      return { ok: true };
    },
    retomar: function (id) {
      var p = paciente(id);
      if (!p) return { ok: false, mensaje: "No se encontró la pausa." };
      p.estado = "en_consulta"; p.color = "verde"; p.extra = null;
      p.accionRetomar = false; p.accionPausar = true;
      registrarEvento("pausa_cerrada", p.nombre);
      return { ok: true };
    },
    empezar_atencion: function () {
      var c = exigirContexto(); if (!c) return { ok: false, mensaje: "Sin paciente en contexto." };
      var p = paciente(c);
      p.estado = "en_consulta"; p.color = "verde"; p.extra = null;
      registrarEvento("atencion_abierta", p.nombre);
      return { ok: true };
    },
    guardar_control: function (datos) {
      var c = exigirContexto(); if (!c) return { ok: false, mensaje: "Sin paciente en contexto: el control no se guarda a ciegas." };
      var s = parseInt(datos.ta_s, 10);
      var band = (datos.banderas || []).length;
      if (!datos.peso && isNaN(s) && !datos.fcf && !band) {
        return { ok: true, nacidas: 0, chips: [{ t: "sin datos", c: "gris", m: "Todavía no hay nada que calcular — llene los campos y vuelva a intentarlo" }] };
      }
      dia.control = datos;
      var p = paciente(c);
      if (p && p.estado === "estacion_a_medias") { p.estado = "espera"; p.color = "azul"; p.extra = "control guardado"; }
      registrarEvento("control_guardado", c);
      var nacidas = 0;
      var r1 = null, r2 = null, r3 = null;
      if (!isNaN(s) && s >= 160) r1 = puente.nacer_alerta("Presión " + datos.ta_s + "/" + (datos.ta_d || "?") + " al guardar el control — nivel crítico: actuar ya", "crítico", "control", "la médica", c);
      if (!isNaN(s) && s >= 140 && (datos.proteina === "2" || datos.proteina === "3")) r2 = puente.nacer_alerta("Combinación: presión " + datos.ta_s + " + orina grado " + datos.proteina + " — preeclampsia por combinación, no por tensión sola", "crítico", "control", "la médica", c);
      if (band >= 3) r3 = puente.nacer_alerta(band + " banderas al guardar: " + datos.banderas.join(" · "), "crítico", "control", "la médica", c);
      [r1, r2, r3].forEach(function (r) { if (r && r.ok && !r.duplicado) nacidas++; });
      return { ok: true, chips: chipsDeControl(datos), nacidas: nacidas };
    },
    pausar_estacion: function () {
      var c = exigirContexto(); if (!c) return { ok: false, mensaje: "Sin paciente en contexto." };
      var p = paciente(c);
      p.estado = "estacion_a_medias"; p.color = "ambar"; p.extra = "todo conservado";
      registrarEvento("estacion_pausada", p.nombre);
      return { ok: true };
    },
    cerrar_consulta: function (nota) {
      var c = exigirContexto(); if (!c) return { ok: false, mensaje: "Sin paciente en contexto." };
      var p = paciente(c);
      p.estado = "atendida"; p.color = "verde"; p.extra = null;
      p.caso = p.caso.split(" · con la médica")[0] + " · nota firmada " + horaAhora();
      registrarEvento("consulta_cerrada", c);
      return { ok: true };
    },
    listar_alertas: function () { return dia.alertas.slice(); },
    nacer_alerta: function (contenido, nivel, origen, dueno, paciente) {
      var ya = null;
      dia.alertas.forEach(function (a) { if (a.estado === "pendiente" && a.texto === contenido) ya = a; });
      if (ya) return { ok: true, duplicado: true, mensaje: "Ya hay una alerta pendiente idéntica: no se duplica." };
      dia.alertas.unshift({
        id: "ALT-25-" + String(dia.alertas.length + 10).padStart(3, "0"),
        origen: origen || "control", paciente: paciente || "", texto: contenido, nivel: nivel || "problema",
        estado: "pendiente", dueño: dueno || "la médica", nacio: 0, vence: 60
      });
      registrarEvento("alerta_nacida", contenido);
      return { ok: true, duplicado: false };
    },
    atender_alerta: function (id, cierre, texto, quien, cedula) {
      if (!quien || !quien.trim() || !cedula || !String(cedula).trim())
        return { ok: false, mensaje: "Falta su nombre y cédula: la alerta no se cierra a ciegas — quien responde queda con nombre y número." };
      var al = null;
      dia.alertas.forEach(function (a) { if (a.id === id) al = a; });
      if (!al) return { ok: false, mensaje: "Esa alerta no existe." };
      if (al.estado !== "pendiente") return { ok: false, mensaje: "Ya no está pendiente: solo se atiende una vez." };
      al.estado = "atendida";
      al.respuesta = { texto: (cierre === "referida" && !texto ? "Referida a otro centro" : texto || cierre), quien: quien.trim(), cedula: String(cedula).trim(), hora: horaAhora() };
      registrarEvento("alerta_cerrada", al.id);
      return { ok: true };
    },
    listar_llamadas: function () { return dia.llamadas.slice(); },
    reagendar: function (nombre) {
      var p = paciente(nombre);
      if (!p) return { ok: false, mensaje: "No aparece esa paciente." };
      p.estado = "con_cita"; p.cita = "mañana"; p.caso = "Reagendada desde su no-llegó";
      p.color = "gris"; p.extra = null; p.accionReagendar = false;
      registrarEvento("cita_creada", p.nombre);
      return { ok: true };
    },
    listar_plantillas: function () { return dia.plantillas.slice(); },
    generar_documento: function (plantilla) {
      var c = leerContexto();
      return { ok: true, mensaje: tv("Maqueta: en el producto real, «" + plantilla + "»" + (c ? " de " + c : "") + " sale abierto en Word, relleno y sellado. Aquí solo dibujamos ese momento.", "«" + plantilla + "»" + (c ? " de " + c : "") + " abierta en Word: edita, guarda con Ctrl+S y cierra.") };
    },
    marcar_urgencia: function (id) {
      var p = paciente(id);
      if (!p) return { ok: false, mensaje: "No aparece esa paciente en el día." };
      var anterior = p.estado;
      p.estado = "urgente"; p.color = "rojo";
      p.extra = "urgencia marcada";
      p.dueño = "la médica";
      p.accionPausar = false; p.accionRetomar = false;
      registrarEvento("urgencia_marcada", p.nombre);
      return { ok: true, anterior: anterior };
    },
    marcar_prioridad: function (id) {
      var p = paciente(id);
      if (!p) return { ok: false, mensaje: "No aparece esa paciente en el día." };
      p.prioridad = !p.prioridad;
      registrarEvento("prioridad_" + (p.prioridad ? "marcada" : "quitada"), p.nombre);
      return { ok: true, prioridad: !!p.prioridad };
    },
    equipo_fuera: function (fuera) {
      dia.equipoFuera = !!fuera;
      registrarEvento("equipo_estado", fuera ? "en sala" : "de vuelta");
      return { ok: true, fuera: !!fuera };
    },
    ultimos_valores: function () {
      if (!dia.control) return { ok: true, valores: null, nota: "Sin control guardado hoy — los cálculos esperan sus datos." };
      return { ok: true, valores: dia.control, nota: "Último control guardado hoy." };
    },
    calcular: function (cual, datos) {
      if (cual === "ta" && datos && datos.s) {
        var s = parseInt(datos.s, 10);
        if (isNaN(s)) return { ok: false, resultado: null, mensaje: "Falta la presión — no se inventa el número." };
        var nivel = s >= 160 ? ["crítico", "rojo", "fuera del umbral de peligro: actuar ya"] : s >= 140 ? ["alerta", "ambar", "fuera de lo normal: revisar"] : ["normal", "verde", "en rango"];
        return { ok: true, resultado: s + "/" + (datos.d || "?"), nivel: nivel[0], color: nivel[1], mensaje: nivel[2] };
      }
      if (cual === "imc" && datos && datos.peso && datos.talla) {
        var pe = parseFloat(String(datos.peso).replace(",", "."));
        var ta = parseFloat(String(datos.talla).replace(",", "."));
        var imc = pe / (ta * ta);
        if (isNaN(imc)) return { ok: false, resultado: null, mensaje: "Faltan peso o talla — no se inventa el número." };
        return { ok: true, resultado: imc.toFixed(1).replace(".", ","), nivel: imc >= 30 ? "alerta" : "normal", color: imc >= 30 ? "ambar" : "verde", mensaje: imc >= 30 ? "sobre peso —valorarlo con la paciente" : "en rango" };
      }
      return { ok: false, resultado: null, mensaje: "Faltan datos para este cálculo — sin datos no se calcula." };
    },
    capturar_laboratorio: function (analito, valor, fecha) {
      if (!analito || !valor) return { ok: false, mensaje: "Faltan analito o valor: son los tres datos del papel, en treinta segundos." };
      dia.laboratorio = dia.laboratorio || [];
      dia.laboratorio.push({ analito: analito, valor: valor, fecha: fecha || "hoy" });
      registrarEvento("resultado_capturado", analito + " = " + valor);
      return { ok: true, banda: tv("pendiente de catálogo firmado — en la maqueta no hay rangos firmados, y sin firma no se señala", "pendiente de catálogo firmado — sin firma no se señala") };
    },
    alertas_del_episodio: function () {
      var c = leerContexto();
      var lista = c ? dia.alertas.filter(function (a) { return a.texto.indexOf(c) >= 0; }) : [];
      return { ok: true, alertas: lista.length ? lista : dia.alertas.slice(), nota: lista.length ? "" : tv("La maqueta no separa por episodio todavía: se muestra todo lo del día.", "") };
    },
    preparacion_consulta: function () {
      var c = leerContexto();
      var laboratorio = (dia.laboratorio || []).map(function (x) { return x.analito + " = " + x.valor; });
      var vencidos = dia.protocolos.filter(function (p) { return p.vencido; }).map(function (p) { return p.nombre + " — " + p.proximo; });
      var pendientes = dia.alertas.filter(function (a) { return a.estado === "pendiente" && (!c || (a.paciente && a.paciente.indexOf(c) >= 0)); }).map(function (a) { return a.texto; });
      return { ok: true, paciente: c, laboratorio: laboratorio, vencidos: vencidos, pendientes: pendientes, nota: c ? "" : "Sin paciente abierta: ábrala desde Hoy." };
    },
    copiar_control_anterior: function () {
      if (!dia.control) return { ok: false, mensaje: "Sin control anterior que copiar: no hay datos previos capturados en este día de ejemplo." };
      return { ok: true, control: dia.control, nota: "Copiado del control anterior — edítelo si algo cambió: lo copiado queda marcado y nunca se hace pasar por medido hoy." };
    },
    obtener_traspaso: function () {
      var cuenta = {};
      dia.pacientes.forEach(function (p) { cuenta[p.estado] = (cuenta[p.estado] || 0) + 1; });
      var pend = 0, venc = 0;
      dia.alertas.forEach(function (a) { if (a.estado === "pendiente") { pend++; if (a.vence <= 15) venc++; } });
      var faltanFichas = 0;
      dia.pacientes.forEach(function (p) { if (p.faltaCompletar) faltanFichas++; });
      return { porEstado: cuenta, pendientes: pend, vencidas: venc, eventos: dia.eventos.length, disparadas: dia.alertas.length, cerradas: dia.alertas.filter(function (a) { return a.estado !== "pendiente"; }).length, faltanFichas: faltanFichas, llamadas: dia.llamadas.length, citas: dia.citas.length };
    },
    buscar: function (texto) {
      var t = (texto || "").toLowerCase().trim();
      if (!t) return [];
      var enDia = dia.pacientes.filter(function (p) { return p.nombre.toLowerCase().indexOf(t) >= 0; }).slice(0, 6);
      var fuera = (dia.parecidasLibres || []).filter(function (p) { return p.nombre.toLowerCase().indexOf(t) >= 0; }).slice(0, 3);
      return enDia.concat(fuera);
    },
    guardar_ficha: function (datos) {
      var c = exigirContexto(); if (!c) return { ok: false, mensaje: "Sin paciente en contexto: la ficha no se guarda a ciegas." };
      var p = paciente(c);
      p.fund = p.fund || {};
      ["alergia", "rh", "medicacion", "cronicas", "telefono", "ciudad"].forEach(function (k) {
        if (datos[k]) p.fund[k] = datos[k];
      });
      registrarEvento("ficha_guardada", c);
      return { ok: true };
    },
    completar_ficha: function () {
      var c = exigirContexto(); if (!c) return { ok: false, mensaje: "Sin paciente en contexto." };
      var p = paciente(c);
      p.faltaCompletar = false;
      p.extra = "ficha completada";
      registrarEvento("ficha_completada", c);
      return { ok: true };
    },
    registrar_parto: function (datos) {
      var c = exigirContexto(); if (!c) return { ok: false, mensaje: "Sin paciente en contexto: el parto no se registra a ciegas." };
      if (!datos.fecha || !datos.via) return { ok: false, mensaje: "Falta la fecha o la vía del parto: son campos obligatorios." };
      var p = paciente(c);
      p.estado = "atendida"; p.color = "verde"; p.extra = null;
      p.caso = p.caso.split(" · ")[0] + " · parto registrado y episodio cerrado";
      registrarEvento("parto_registrado", c + " — episodio cerrado, puerperio activo");
      return { ok: true };
    },
    guardar_nota: function (texto, tipo) {
      var c = exigirContexto(); if (!c) return { ok: false, mensaje: "Sin paciente en contexto." };
      if (!texto || !texto.trim()) return { ok: false, mensaje: "La nota está vacía: nada que firmar." };
      dia.notas.unshift({ fecha: "2026-10-25", tipo: tipo || "Evolución", quien: "Dra. Silvia Rentería", cedula: "9821144", texto: texto.trim() });
      registrarEvento("nota_firmada", c);
      return { ok: true };
    },
    verificar_estudio: function () {
      dia.estudio.estado = "verificado";
      registrarEvento("estudio_verificado", dia.estudio.nombre);
      return { ok: true, mensaje: "Huella correcta: el archivo está intacto desde que se recibió." };
    },
    rechazar_estudio: function () {
      dia.estudio.estado = "pendiente_verificacion";
      registrarEvento("estudio_rechazado", dia.estudio.nombre);
      return { ok: true, mensaje: "Rechazado sin escribir nada a medias — en el tablero queda «estudio pendiente — reintento»." };
    },
    intentar_foto: function () {
      if (dia.estudio.consentimiento !== "vigente") return { ok: false, mensaje: "Consentimiento de imagen revocado: no se puede adjuntar la foto. Pídale uno nuevo para poder guardarla." };
      return { ok: true, mensaje: "Consentimiento vigente: la foto entra con su huella al manifiesto del episodio." };
    },
    metricas_sistema: function () {
      var disparadas = dia.alertas.length, cerradas = 0, pendientes = 0;
      dia.alertas.forEach(function (a) { if (a.estado === "pendiente") pendientes++; else cerradas++; });
      return { disparadas: disparadas, cerradas: cerradas, pendientes: pendientes, descartes: tv("la maqueta no registra descartes todavía", "") };
    }
  };

  function chipsDeControl(d) {
    var chips = [];
    var s = parseInt(d.ta_s, 10);
    var band = (d.banderas || []).length;
    if (!isNaN(s) && s >= 160) chips.push({ t: "Presión crítica: actuar ya", c: "rojo", m: "fuera del umbral de peligro — registre la respuesta (circuito cerrado)" });
    else if (!isNaN(s) && s >= 140) chips.push({ t: "Presión fuera de lo normal: revisar", c: "ambar", m: "confirme con orina: la preeclampsia es por combinación, no por tensión sola" });
    else if (!isNaN(s)) chips.push({ t: "Presión en rango", c: "verde", m: "" });
    if (!isNaN(s) && s >= 140 && (d.proteina === "2" || d.proteina === "3")) chips.push({ t: "Combinación presión + orina: confirmar hoy", c: "rojo", m: "TA " + d.ta_s + " con orina grado " + d.proteina + " — la combinación dispara, no cada dato solo" });
    if (d.fcf) {
      var f = parseInt(d.fcf, 10);
      if (f >= 160 || f <= 110) chips.push({ t: "FC fetal fuera de rango — valorar", c: "ambar", m: "compare con la vez pasada" });
      else chips.push({ t: "FC fetal en rango", c: "verde", m: "" });
    }
    if (band) chips.push({ t: band === 1 ? "1 bandera marcada" : band + " banderas marcadas", c: band >= 3 ? "rojo" : "ambar", m: band >= 3 ? "suficientes para nacer alerta crítica al guardar" : "avísele a la médica al terminar" });
    if (!chips.length) chips.push({ t: "sin datos", c: "gris", m: "aún no hay nada que calcular" });
    return chips;
  }

  function horaAhora() {
    var h = new Date();
    return String(h.getHours()).padStart(2, "0") + ":" + String(h.getMinutes()).padStart(2, "0");
  }

  function montarRiel() {
    var riel = document.querySelector(".riel");
    if (!riel) return;
    var pag = document.body.getAttribute("data-pag");
    if (pag === "emergencia") pag = "llegada";
    var items = [
      ["grupo", "Jornada"],
      ["hoy", "▦ Hoy", "hoy.html"],
      ["llegada", "⤷ Llegadas", "llegada.html"],
      ["pendientes", "⚑ Pendientes", "pendientes.html", true],
      ["laboratorio", "⚕ Laboratorio", "laboratorio.html"],
      ["atenciones", "✂ Atenciones", "atenciones.html"],
      ["documentos", "✎ Documentos", "documentos.html"],
      ["agenda", "▤ Agenda", "agenda.html"],
      ["cierre", "⏻ Cierre", "cierre.html"],
      ["grupo", "Del consultorio"],
      ["respaldo", "⛃ Respaldo", "respaldo.html"],
      ["sistema", "⚙ Sistema (dueño)", "sistema.html", false, true]
    ];
    var h = '<span class="marca">Maternidad</span>';
    items.forEach(function (it, idx) {
      if (it[0] === "grupo") { h += '<span class="grupo' + (idx === 0 ? " primera" : "") + '">' + it[1] + "</span>"; return; }
      h += '<a' + (it[4] ? ' class="piso"' : "") + ' href="' + it[2] + '" data-pag="' + it[0] + '">' + it[1] +
        (it[3] ? ' <span class="cuenta" id="cuenta-pend">–</span>' : "") + "</a>";
    });
    riel.innerHTML = h;
    riel.querySelectorAll("a[data-pag]").forEach(function (a) {
      a.classList.toggle("activo", a.getAttribute("data-pag") === pag);
    });
  }

  function montarMenuContexto() {
    var barra = document.querySelector(".barra");
    var ctx = document.getElementById("contexto");
    if (!barra || !ctx || ctx.classList.contains("vacio")) return;
    var menu = document.createElement("div");
    menu.className = "menu-ctx";
    menu.innerHTML = '<div class="tit">Paciente abierta</div>' +
      '<a href="ficha.html">Ficha y fundamentales</a>' +
      '<a href="historia.html">Historia y notas</a>' +
      '<a href="protocolos.html">Protocolos</a>' +
      '<a href="estudios.html">Estudios</a>' +
      '<a href="calculadoras.html">Calculadoras</a>' +
      '<div class="separador"></div>' +
      '<a href="parto.html">Parto y cierre de episodio</a>';
    barra.appendChild(menu);
    ctx.addEventListener("click", function (ev) {
      ev.stopPropagation();
      menu.classList.toggle("abierto");
    });
    document.addEventListener("click", function () { menu.classList.remove("abierto"); });
  }

  function cablearHoy() {
    renderDia();
    var btnEq = document.getElementById("btn-equipo");
    var chipEq = document.getElementById("equipo-chip");
    var chipsDia = document.getElementById("chips-dia");
    if (chipsDia) chipsDia.addEventListener("click", function (ev) {
      var b = ev.target.closest("[data-col]");
      if (!b) return;
      var destino = document.getElementById("col-" + b.getAttribute("data-col"));
      if (destino) destino.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    var fuera = true;
    if (btnEq) btnEq.addEventListener("click", function () {
      fuera = !fuera;
      puente.equipo_fuera(fuera);
      if (chipEq) {
        chipEq.textContent = fuera ? "EQUIPO FUERA — la médica está en sala de parto" : "EQUIPO EN SALA — de vuelta: la fila sigue con normalidad";
        chipEq.className = fuera ? "chip ambar" : "chip verde";
      }
      aviso(fuera ? "Equipo marcado fuera — la espera se explica sola" : "Equipo de vuelta de sala");
    });
    document.getElementById("zona-dia").addEventListener("click", function (ev) {
      var pausa = ev.target.closest("[data-pausar]");
      if (pausa) {
        ev.stopPropagation();
        puente.pausar(pausa.getAttribute("data-pausar"));
        aviso("Atención pausada con todo lo suyo — retómela desde su tarjeta");
        renderDia();
        return;
      }
      var urgi = ev.target.closest("[data-urgir]");
      if (urgi) {
        ev.stopPropagation();
        var ru = puente.marcar_urgencia(urgi.getAttribute("data-urgir"));
        aviso(ru.ok ? "Urgencia marcada con juicio — su tarjeta se fue al frente sola" : ru.mensaje);
        renderDia();
        return;
      }
      var pri = ev.target.closest("[data-priori]");
      if (pri) {
        ev.stopPropagation();
        var rp = puente.marcar_prioridad(pri.getAttribute("data-priori"));
        aviso(rp.ok ? (rp.prioridad ? "Marcada como prioritaria — flota al frente de su zona. La definen ustedes; el software no ordena." : "Prioridad quitada — vuelve al orden del día") : rp.mensaje);
        renderDia();
        return;
      }
      if (ev.target.closest("a")) return;
      var tarjeta = ev.target.closest(".tarjeta");
      if (!tarjeta) return;
      var p = paciente(tarjeta.getAttribute("data-id"));
      if (!p) return;
      elegir(p.nombre);
      aviso("Paciente en contexto: " + p.nombre);
      if (p.estado === "estacion_a_medias") window.location.href = "estacion.html?paciente=" + encodeURIComponent(p.nombre);
      else if (p.estado === "en_consulta" || p.estado === "pusada") window.location.href = "consulta.html?paciente=" + encodeURIComponent(p.nombre);
      else if (p.estado === "por_registrar") window.location.href = "llegada.html?paciente=" + encodeURIComponent(p.nombre);
      else window.location.href = "estacion.html?paciente=" + encodeURIComponent(p.nombre);
    });
  }

  function cablearLlegada() {
    var entrada = document.getElementById("buscar");
    var sal = document.getElementById("resultados");
    function apellido(n) { return (n.split(" ")[0] || n).toLowerCase(); }
    function pintarBusqueda() {
      if (!sal || !entrada) return;
      var lista = puente.buscar(entrada.value);
      if (!entrada.value.trim()) { sal.innerHTML = ""; return; }
      if (!lista.length) {
        sal.innerHTML = '<div class="nota">No aparece. ¿La registramos en la puerta, en tres campos? ' +
          '¿O es urgencia? <a href="emergencia.html">Registro de emergencia →</a></div>';
        return;
      }
      var apellidos = {};
      lista.forEach(function (p) { var a = apellido(p.nombre); apellidos[a] = (apellidos[a] || 0) + 1; });
      var hayParecidas = Object.keys(apellidos).some(function (a) { return apellidos[a] >= 2 && a.length > 4; });
      var avisoParecidas = hayParecidas
        ? '<div class="panel" style="border-left:5px solid var(--rojo);margin-bottom:8px"><b>⚠ Parecidas:</b> hay nombres iguales o ' +
          'muy cercanos — confirme con <b>fecha de nacimiento y expediente</b> antes de elegir (R-10).</div>'
        : "";
      var filas = lista.map(function (p) {
        var etiqueta = "<b>" + esc(p.nombre) + "</b> — " + esc(p.caso) +
          ' · <span class="chip gris">' + esc(titulos[p.estado] || p.estado) + "</span>";
        if (p.parecida) {
          return '<div class="linea">' + etiqueta + ' <span class="chip rojo">parecida — no se elige sin confirmar</span></div>';
        }
        var puedeLlegar = p.estado === "por_registrar" || p.estado === "con_cita";
        return '<div class="linea"><a href="estacion.html?paciente=' + encodeURIComponent(p.nombre) + '">' +
          etiqueta + "</a>" +
          (puedeLlegar ? ' <button class="btn sec" style="padding:2px 12px;font-size:12px" data-llegar="' +
            esc(p.id || p.nombre) + '">✓ Registrar llegada</button>' : "") +
          "</div>";
      }).join("");
      sal.innerHTML = avisoParecidas +
        '<div class="nota">Toque el nombre para abrir su visita de hoy; «✓ Marcar llegada» solo marca que ya llegó.</div>' +
        filas;
    }
    if (entrada) {
      entrada.addEventListener("input", pintarBusqueda);
      var pre = leerContexto();
      if (pre) { entrada.value = pre; pintarBusqueda(); }
    }
    if (sal) sal.addEventListener("click", function (ev) {
      var b = ev.target.closest("[data-llegar]");
      if (!b) return;
      var r = puente.registrar_llegada(b.getAttribute("data-llegar"));
      if (!r.ok) { aviso(r.mensaje); return; }
      aviso("Llegada registrada — complete ahora los datos de la visita de hoy");
      var pasoVisita = document.getElementById("paso-visita");
      if (pasoVisita) {
        sal.innerHTML = "";
        pasoVisita.style.display = "block";
        var quien = pasoVisita.querySelector("#visita-quien");
        if (quien) quien.textContent = puente.contexto() || "";
        pasoVisita.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        window.location.href = "hoy.html";
      }
    });
    var form = document.getElementById("form-registro");
    if (form) form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var apP = form.ap_p.value.trim();
      var apM = form.ap_m.value.trim();
      var nom = form.nombres.value.trim();
      if (!apP || !nom) { aviso("Faltan apellidos o nombres: con eso ya se puede registrar."); return; }
      var nombre = (apP + (apM ? " " + apM : "")) + ", " + nom;
      var r = puente.registro_rapido({ nombre: nombre, fecha: form.fecha.value, ciudad: form.ciudad.value, tel: form.telefono.value, curp: form.curp.value, motivo: "sin cita" });
      if (!r.ok) { aviso(r.mensaje); return; }
      var exito = document.getElementById("exito");
      if (exito) {
        form.style.display = "none";
        exito.style.display = "block";
        exito.innerHTML = '<b>✓ Registrada: ' + esc(nombre) + "</b> — quedó en Hoy como «falta registrar» hasta completar su ficha." +
          '<div class="acciones"><a class="btn" href="ficha.html?paciente=' + encodeURIComponent(nombre) + '">Llenar más datos de la paciente</a>' +
          '<button class="btn sec" id="btn-qr">QR para que ella complete</button></div>' +
          '<div class="acciones" style="margin-top:6px"><button class="btn sec" id="btn-otra">Registrar otra</button>' +
          '<a class="btn sec" href="hoy.html">Ir a Hoy</a>' +
          '<span class="nota">Los botones de arriba son los de ahora; los de abajo, cuando quiera.</span></div>';
        var qr = document.getElementById("btn-qr");
        if (qr) qr.addEventListener("click", function () {
          aviso("QR de autohistoria: abre un cuestionario en el celular de la paciente para que llene sus datos — requiere la fase con hardware (servidor local) y su contrato sigue pendiente (fase V). Aquí queda declarado el paso.");
        });
        var otra = document.getElementById("btn-otra");
        if (otra) otra.addEventListener("click", function () {
          form.reset();
          exito.style.display = "none";
          form.style.display = "block";
          if (form.ap_p) form.ap_p.focus();
        });
      } else {
        aviso("Registrada — complete sus datos cuando pueda.");
      }
    });
    var visita = document.getElementById("form-visita");
    if (visita) visita.addEventListener("submit", function (ev) {
      ev.preventDefault();
      aviso("Visita de hoy guardada — se borra sola mañana. Vamos a Hoy.");
      window.location.href = "hoy.html";
    });
  }

  function cablearEstacion() {
    renderCinta();
    var form = document.getElementById("form-control");
    var sal = document.getElementById("respuesta");
    if (form) form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var datos = {};
      ["fecha", "peso", "ta_s", "ta_d", "altura_uterina", "fcf", "presentacion", "proteina", "edema", "sintoma"].forEach(function (k) {
        datos[k] = form[k] ? form[k].value : "";
      });
      datos.banderas = [];
      Array.prototype.forEach.call(form.querySelectorAll('input[name="bandera"]:checked'), function (b) {
        datos.banderas.push(b.value);
      });
      var r = puente.guardar_control(datos);
      if (!r.ok) { aviso(r.mensaje); return; }
      sal.innerHTML = r.chips.map(function (c) {
        return '<span class="chip ' + c.c + '">' + esc(c.t) + "</span>";
      }).join("");
      var detalle = document.getElementById("detalle-chips");
      if (detalle) detalle.textContent = r.chips.map(function (c) { return c.m; }).filter(Boolean).join(" · ");
      var msg = "Control guardado — guardar nunca bloquea: las respuestas salen después de guardado.";
      if (r.nacidas) msg += " " + r.nacidas + (r.nacidas === 1 ? " alerta nació en Pendientes" : " alertas nacieron en Pendientes") + " — con dueño, reloj y circuito por cerrar.";
      aviso(msg);
    });
    var pausar = document.getElementById("btn-pausar");
    if (pausar) pausar.addEventListener("click", function () {
      var r = puente.pausar_estacion();
      aviso(r.ok ? "Estación pausada con todo conservado — retómela desde su tarjeta" : r.mensaje);
      if (r.ok) window.location.href = "hoy.html";
    });
  }

  function cablearConsulta() {
    renderCinta();
    var ult = document.getElementById("ultimos");
    if (ult) {
      if (dia.control) {
        ult.innerHTML = '<div class="linea"><b>Último control guardado hoy:</b> peso ' +
          esc(dia.control.peso || "—") + " · TA " + esc(dia.control.ta_s || "—") + "/" + esc(dia.control.ta_d || "—") +
          " · pulso " + esc(dia.control.pulso || "—") + " — se calcula con lo que la enfermera capturó</div>";
      } else {
        ult.innerHTML = '<div class="nota">Sin control guardado hoy — los cálculos corren en el segundo en que sus datos existan.</div>';
      }
    }
    var abrir = document.getElementById("btn-abrir");
    if (abrir) abrir.addEventListener("click", function () {
      var r = puente.empezar_atencion();
      aviso(r.ok ? "Atención abierta — su cinta y lo capturado ya están en pantalla" : r.mensaje);
      if (r.ok) renderCinta();
    });
    var form = document.getElementById("form-nota");
    if (form) form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var r = puente.cerrar_consulta(form.nota.value);
      aviso(r.ok ? "Consulta cerrada con nota firmada — la paciente pasó a «atendidas» y la agenda propone su siguiente cita" : r.mensaje);
      if (r.ok) window.location.href = "hoy.html";
    });
  }

  function htmlAlerta(a) {
    var h = '<div class="panel" data-alerta="' + a.id + '">';
    h += '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">';
    h += '<span class="chip ' + (a.nivel === "crítico" ? "rojo" : a.nivel === "problema" ? "ambar" : "azul") + '">' + esc(a.nivel) + "</span>";
    if (a.paciente) h += '<b style="font-size:15px">' + esc(a.paciente) + "</b>";
    h += "</div>";
    h += '<div style="margin-top:4px">' + esc(a.texto) + "</div>";
    h += '<div class="nota" style="margin-top:6px">Origen: ' + esc(a.origen) + " · <b>Le toca a: " + esc(a.dueño) + "</b>";
    if (a.estado === "pendiente") h += ' · <span class="chip ambar">pendiente — vence en ' + a.vence + " min</span>";
    else h += ' · <span class="chip verde">cerrada</span>';
    h += "</div>";
    if (a.respuesta) {
      h += '<div class="linea" style="margin-top:6px">«' + esc(a.respuesta.texto) + "» — <b>" + esc(a.respuesta.quien) +
        "</b> (céd. " + esc(a.respuesta.cedula) + ") · " + esc(a.respuesta.hora) + "</div>";
    }
    if (a.estado === "pendiente") {
      h += '<div class="acciones" style="margin-top:8px"><button class="btn sec" data-abrir-cierre="' + a.id + '">Cerrar con firma…</button></div>';
      h += '<form class="cerrar" data-form="' + a.id + '" style="display:none;margin-top:10px">' +
        '<div class="formulario">' +
        '<div class="campo"><label>Cómo se resolvió</label><select name="cierre">' +
        '<option value="atendida">Atendida aquí mismo</option>' +
        '<option value="referida">Referida con nota</option>' +
        '<option value="motivo">Cerrada con motivo</option></select></div>' +
        '<div class="campo"><label>Qué se hizo</label><input name="texto" placeholder="Ej.: se ajustó y se repitió la toma"></div>' +
        '<div class="campo"><label>Quién responde (nombre)</label><input name="quien" placeholder="Dra. / Enf."></div>' +
        '<div class="campo"><label>Cédula</label><input name="cedula" inputmode="numeric" placeholder="solo dígitos"></div>' +
        "</div>" +
        '<div class="acciones"><button class="btn" type="submit">Firmar cierre</button>' +
        '<span class="nota">Sin nombre y cédula no se cierra — queda en la historia con su respuesta.</span></div></form>';
    }
    h += "</div>";
    return h;
  }

  function cablearPendientes() {
    var zona = document.getElementById("lista-alertas");
    function pintar() { zona.innerHTML = dia.alertas.map(htmlAlerta).join(""); }
    pintar();
    zona.addEventListener("click", function (ev) {
      var abrir = ev.target.closest("[data-abrir-cierre]");
      if (abrir) {
        var f = zona.querySelector('form[data-form="' + abrir.getAttribute("data-abrir-cierre") + '"]');
        f.style.display = f.style.display === "none" ? "block" : "none";
      }
    });
    zona.addEventListener("submit", function (ev) {
      var f = ev.target.closest("form[data-form]");
      if (!f) return;
      ev.preventDefault();
      var r = puente.atender_alerta(f.getAttribute("data-form"), f.cierre.value, f.texto.value, f.quien.value, f.cedula.value);
      aviso(r.ok ? "Alerta cerrada con firma — queda en la historia y en el tablero se libera" : r.mensaje);
      if (r.ok) { pintar(); pintarCuenta(); }
    });
  }

  function cablearDocumentos() {
    var zona = document.getElementById("lista-plantillas");
    if (zona) {
      zona.innerHTML = puente.listar_plantillas().map(function (pl) {
        return '<div class="linea"><b>' + esc(pl.nombre) + '</b> <span class="chip gris">.' + esc(pl.tipo) +
          (pl.tipo === "txt" ? " · editable aquí" : " · se abre con Word/Excel") + "</span> " +
          '<button class="btn sec" style="padding:2px 12px;font-size:12px" data-gen="' + esc(pl.nombre) + '">Generar</button></div>';
      }).join("");
      zona.addEventListener("click", function (ev) {
        var b = ev.target.closest("[data-gen]");
        if (b) aviso(puente.generar_documento(b.getAttribute("data-gen")).mensaje);
      });
    }
    [["btn-aviso", "Aviso de privacidad: se genera una vez por expediente y jamás se reescribe."],
     ["btn-consent", "Consentimiento: cuerpo sellado primero, pie con la huella después."],
     ["btn-compartir", "Compartir sin identidad: la puerta revisa el documento entero; si encuentra un dato personal, no se escribe el archivo."]].forEach(function (par) {
      var b = document.getElementById(par[0]);
      if (b) b.addEventListener("click", function () { aviso(par[1]); });
    });
  }

  function cablearAgenda() {
    var ll = document.getElementById("lista-llamadas");
    if (ll) {
      ll.innerHTML = puente.listar_llamadas().map(function (l, i) {
        return '<div class="linea"><b>' + esc(l.quien) + "</b> — " + esc(l.que) +
          (l.estado === "escalado" ? ' <span class="chip rojo">ESCALADO — ventana cerrada sin entregar</span>' : "") +
          '<div class="nota">«' + esc(l.texto) + '»</div>' +
          '<button class="btn sec" style="padding:2px 12px;font-size:12px;margin-top:4px" data-copiar="' + i + '">Copiar para llamar</button></div>';
      }).join("");
      ll.addEventListener("click", function (ev) {
        var b = ev.target.closest("[data-copiar]");
        if (!b) return;
        var l = dia.llamadas[parseInt(b.getAttribute("data-copiar"), 10)];
        if (navigator.clipboard) navigator.clipboard.writeText(l.texto);
        aviso("Recordatorio copiado — la llamada es humana: el software solo prepara.");
      });
    }
    var ci = document.getElementById("lista-citas");
    if (ci) ci.innerHTML = dia.citas.map(function (c) {
      return '<div class="linea"><b>' + esc(c.hora) + "</b> · " + esc(c.quien) + " — " + esc(c.que) + "</div>";
    }).join("");
    var re = document.getElementById("reagendar");
    if (re) {
      var pend = dia.pacientes.filter(function (p) { return p.estado === "no_llego"; });
      if (!pend.length) re.innerHTML = '<div class="nota">Sin no-llegados: nada que reagendar.</div>';
      else re.innerHTML = pend.map(function (p) {
        return '<div class="linea">' + esc(p.nombre) + " — su cita venció <button class=\"btn sec\" style=\"padding:2px 12px;font-size:12px\" data-re=\"" +
          esc(p.nombre) + '">Proponer nueva cita →</button></div>';
      }).join("");
      re.addEventListener("click", function (ev) {
        var b = ev.target.closest("[data-re]");
        if (!b) return;
        var r = puente.reagendar(b.getAttribute("data-re"));
        aviso(r.ok ? "Reagendada — su tarjeta dejó de estar apagada" : r.mensaje);
        if (r.ok) re.innerHTML = '<div class="nota">Sin no-llegados: nada que reagendar.</div>';
      });
    }
  }

  function cablearCierre() {
    var t = puente.obtener_traspaso();
    var zona = document.getElementById("resumen");
    var cuenta = t.porEstado;
    function n(e) { return cuenta[e] || 0; }
    zona.innerHTML =
      '<div class="linea"><b>Quedaron atendidas:</b> ' + n("atendida") + " de " + dia.pacientes.length + "</div>" +
      '<div class="linea"><b>En atención o pausadas al cierre:</b> ' + (n("en_consulta") + n("pusada") + n("estacion_a_medias")) + " — van en el traspaso con su dueño</div>" +
      '<div class="linea"><b>No llegaron:</b> ' + n("no_llego") + " — con su reagendar hecho</div>" +
      '<div class="linea"><b>Fichas de emergencia sin completar:</b> ' + t.faltanFichas +
      " — con dueño y plazo de hoy</div>" +
      '<div class="linea"><b>Agenda de mañana:</b> ' + t.llamadas +
      " recordatorios preparados y " + t.citas + " próximas citas — todo visible en Agenda</div>" +
      '<div class="linea"><b>Alertas pendientes:</b> ' + t.pendientes + " (" + t.vencidas + " por vencer o vencidas) — con dueño declarado</div>" +
      '<div class="linea"><b>Hechos del día registrados:</b> ' + t.eventos + " eventos — de ellos salió todo lo que se ve</div>" +
      '<div class="linea"><b>Alertas de hoy:</b> ' + t.disparadas + " disparadas · " + t.cerradas + " cerradas · " +
      t.pendientes + " pendientes" + tv(" · descartes: la maqueta aún no los registra", "") + "</div>" +
      '<div class="linea"><b>Respaldo de la tarde:</b> listo para ejecutar — el respaldo jamás toca el parque vivo</div>';
    var btn = document.getElementById("btn-imprimir");
    if (btn) btn.addEventListener("click", function () { window.print(); });
  }

  function cablearAcceso() {
    var form = document.getElementById("form-acceso");
    if (form) form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      aviso(tv("PIN correcto (demo: en el papel entra cualquier dígito) — bienvenida", "PIN correcto — bienvenida"));
      window.location.href = "hoy.html";
    });
    var rec = document.getElementById("btn-recuperar");
    if (rec) rec.addEventListener("click", function () {
      aviso("Recuperación sin red: el dueño responde sus preguntas de seguridad y usted entra de nuevo — nadie queda fuera de su equipo (R-51).");
    });
  }

  function cablearFicha() {
    renderCinta();
    var banner = document.getElementById("banner-falta");
    var form = document.getElementById("form-ficha");
    function pintar() {
      var c = leerContexto(); var p = c ? paciente(c) : null;
      if (banner) {
        if (p && p.faltaCompletar) {
          banner.style.display = "block";
          banner.innerHTML = '<span class="chip rojo">falta completar ficha</span> Dueño: quien captura · plazo: hoy a las 13:50 — la urgencia no espera a la ficha, pero la ficha tiene fecha límite.';
        } else banner.style.display = "none";
      }
      if (form && p) {
        var f = p.fund || {};
        ["alergia", "rh", "medicacion", "cronicas", "telefono", "ciudad"].forEach(function (k) { if (form[k]) form[k].value = f[k] || ""; });
      }
    }
    pintar();
    if (form) form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var r = puente.guardar_ficha({ alergia: form.alergia.value, rh: form.rh.value, medicacion: form.medicacion.value, cronicas: form.cronicas.value, telefono: form.telefono.value, ciudad: form.ciudad.value });
      aviso(r.ok ? "Ficha guardada — los fundamentales viajan en la cinta de todas las pantallas" : r.mensaje);
      if (r.ok) renderCinta();
    });
    var comp = document.getElementById("btn-completar");
    if (comp) comp.addEventListener("click", function () {
      var r = puente.completar_ficha();
      aviso(r.ok ? "Ficha completada — el plazo se cerró y la marca de la tarjeta se apaga" : r.mensaje);
      if (r.ok) pintar();
    });
  }

  function cablearEmergencia() {
    var form = document.getElementById("form-emergencia");
    if (form) form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var r = puente.registro_rapido({ nombre: form.nombre.value, fecha: form.fecha.value, motivo: "urgencia declarada" });
      if (!r.ok) { aviso(r.mensaje); return; }
      puente.marcar_urgencia(r.id);
      aviso("Registrada en menos de un minuto: rojo al frente de Hoy y «falta completar ficha» con plazo — la urgencia no espera a la ficha.");
      window.location.href = "hoy.html";
    });
  }

  function cablearLaboratorio() {
    renderCinta();
    var form = document.getElementById("form-lab");
    var lista = document.getElementById("lista-lab");
    function pintar() {
      var l = dia.laboratorio || [];
      lista.innerHTML = l.length ? l.map(function (x) {
        return '<div class="linea"><b>' + esc(x.analito) + " = " + esc(x.valor) + "</b> · muestra " + esc(x.fecha) +
          (x.tarde ? ' <span class="chip ambar">escrito tardío</span>' : "") +
          ' <span class="chip gris">banda: pendiente de catálogo firmado</span></div>';
      }).join("") : '<div class="nota">Todavía no se ha capturado papel hoy — tres datos, treinta segundos.</div>';
    }
    pintar();
    if (form) form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var r = puente.capturar_laboratorio(form.analito.value, form.valor.value, form.fecha.value);
      if (!r.ok) { aviso(r.mensaje); return; }
      if (form.tarde.checked && dia.laboratorio.length) dia.laboratorio[dia.laboratorio.length - 1].tarde = true;
      aviso("Capturado — la banda la da el catálogo firmado del médico: sin firma, no se señala.");
      form.reset();
      pintar();
    });
  }

  function cablearParto() {
    renderCinta();
    var form = document.getElementById("form-parto");
    if (form) form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var r = puente.registrar_parto({ fecha: form.fecha.value, via: form.via.value, bebes: form.bebes.value, peso: form.peso.value });
      aviso(r.ok ? "Parto registrado y episodio cerrado — el tablero libera el cupo solo y el puerperio queda activo" : r.mensaje);
      if (r.ok) window.location.href = "hoy.html";
    });
  }

  function cablearHistoria() {
    renderCinta();
    var zona = document.getElementById("lista-notas");
    function pintar() {
      zona.innerHTML = dia.notas.map(function (n) {
        return '<div class="linea"><b>' + esc(n.fecha) + " · " + esc(n.tipo) + "</b> — " + esc(n.quien) + " (céd. " + esc(n.cedula) + ")" +
          '<div class="nota">' + esc(n.texto) + "</div></div>";
      }).join("");
    }
    pintar();
    var form = document.getElementById("form-nota-historia");
    if (form) form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var r = puente.guardar_nota(form.texto.value, form.tipo.value);
      aviso(r.ok ? "Nota firmada e inmutable — autor y cédula quedaron dentro" : r.mensaje);
      if (r.ok) { form.reset(); pintar(); }
    });
    [["btn-nom004", "NOM-004: el formato oficial asiste dentro de la nota — nunca es una pantalla aparte que se olvida (R-17/R-18)."],
     ["btn-interconsulta", "Interconsulta: se firma con nota y queda en pendientes hasta su respuesta."]].forEach(function (par) {
      var b = document.getElementById(par[0]);
      if (b) b.addEventListener("click", function () { aviso(par[1]); });
    });
  }

  function cablearEstudios() {
    renderCinta();
    var zona = document.getElementById("estado-estudio");
    function pintar() {
      var e = dia.estudio;
      zona.innerHTML = '<span class="chip ' + (e.estado === "verificado" ? "verde" : "ambar") + '">' +
        (e.estado === "verificado" ? "verificado — huella intacta" : "pendiente de verificación") + "</span> " +
        "<b>" + esc(e.nombre) + "</b> · consentimiento de imagen: <b>" + esc(e.consentimiento) + "</b>";
    }
    pintar();
    [["btn-verificar", function () { aviso(puente.verificar_estudio().mensaje); pintar(); }],
     ["btn-rechazar", function () { aviso(puente.rechazar_estudio().mensaje); pintar(); }]].forEach(function (par) {
      var b = document.getElementById(par[0]);
      if (b) b.addEventListener("click", par[1]);
    });
    var consent = document.getElementById("select-consent");
    if (consent) consent.addEventListener("change", function () { dia.estudio.consentimiento = consent.value; pintar(); });
    var foto = document.getElementById("btn-foto");
    if (foto) foto.addEventListener("click", function () { aviso(puente.intentar_foto().mensaje); });
  }

  function cablearAtenciones() {
    var zona = document.getElementById("lista-atenciones");
    function pintar() {
      var abiertas = dia.pacientes.filter(function (p) {
        return p.estado === "en_consulta" || p.estado === "pusada" || p.estado === "estacion_a_medias";
      });
      zona.innerHTML = abiertas.length ? abiertas.map(function (p) {
        var uso = p.estado === "en_consulta" ? "en uso de quien la abrió" :
          p.estado === "pusada" ? "pausada por quien la abrió" : "estación a medias — de enfermería";
        var destino = p.estado === "estacion_a_medias" ? "estacion.html?paciente=" : "consulta.html?paciente=";
        var texto = p.estado === "estacion_a_medias" ? "Retomar estación" : p.estado === "pusada" ? "▶ Retomar donde quedó" : "Ir a su consulta";
        return '<div class="panel"><b>' + esc(p.nombre) + '</b> <span class="chip ' + esc(p.color) + '">' +
          esc(titulos[p.estado] || p.estado) + '</span>' + (p.prioridad ? ' <span class="chip morado">★ prioritaria</span>' : "") +
          '<div class="nota">' + esc(uso) + " · dueño: " + esc(p.dueño || "—") +
          '</div><div class="acciones" style="margin-top:8px"><a class="btn sec" style="padding:4px 12px;font-size:12px" href="' +
          destino + encodeURIComponent(p.nombre) + '">' + texto + "</a></div></div>";
      }).join("") : '<div class="nota">Ninguna atención abierta — el día está limpio.</div>';
    }
    pintar();
    var nota = document.getElementById("nota-concurrencia");
    if (nota) nota.textContent = "Sin tope rígido: cuántas aguanta lo dice el equipo, no el software — el tope de 4 era un número inventado y se retiró. Si dos personas tocan la misma atención, la prioridad se puede tomar, pero queda registrado quién la tomó.";
  }

  function montarModo() {
    var barra = document.querySelector(".barra");
    if (barra) {
      var enlace = document.createElement("a");
      enlace.href = "#";
      enlace.className = "cambio-modo";
      enlace.textContent = MODO_VERDADERO ? "Volver a la versión papel" : "Ver versión verdadera";
      enlace.title = MODO_VERDADERO
        ? "Recupera las bandas de pregunta, los pies con los FL y las notas de demostración"
        : "Deja solo lo que dicen las guías escritas: sin bandas de revisión, sin citas de flujos, sin frases de demo";
      enlace.addEventListener("click", function (ev) {
        ev.preventDefault();
        try { window.localStorage.setItem("fn_verdadero", MODO_VERDADERO ? "0" : "1"); } catch (e) { }
        window.location.reload();
      });
      barra.appendChild(enlace);
    }
    if (MODO_VERDADERO) {
      var pantalla = document.querySelector(".barra .pantalla");
      if (pantalla && (pantalla.textContent.indexOf("El día") === 0 || pantalla.textContent.indexOf("Hoy") === 0)) {
        pantalla.textContent = "Hoy — " + new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
      }
    }
    var relojHoy = document.getElementById("hora-hoy");
    if (relojHoy) {
      var pintarHora = function () {
        relojHoy.textContent = new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
      };
      pintarHora();
      window.setInterval(pintarHora, 20000);
    }
  }

  function cablearPagina() {
    montarModo();
    montarRiel();
    pintarContexto();
    montarMenuContexto();
    pintarCuenta();
    var pag = document.body.getAttribute("data-pag");
    if (pag === "hoy") cablearHoy();
    if (pag === "llegada") cablearLlegada();
    if (pag === "estacion") cablearEstacion();
    if (pag === "consulta") cablearConsulta();
    if (pag === "pendientes") cablearPendientes();
    if (pag === "documentos") cablearDocumentos();
    if (pag === "agenda") cablearAgenda();
    if (pag === "cierre") cablearCierre();
    if (pag === "ficha") cablearFicha();
    if (pag === "laboratorio") cablearLaboratorio();
    if (pag === "emergencia") cablearEmergencia();
    if (pag === "parto") cablearParto();
    if (pag === "historia") cablearHistoria();
    if (pag === "estudios") cablearEstudios();
    if (pag === "atenciones") cablearAtenciones();
    if (pag === "acceso") cablearAcceso();
    if (pag === "protocolos") cablearProtocolos();
    if (pag === "calculadoras") cablearCalculadoras();
  }

  function cablearProtocolos() {
    renderCinta();
    var zona = document.getElementById("lista-protocolos");
    if (zona) zona.innerHTML = dia.protocolos.map(function (p) {
      return '<div class="panel"><b>' + esc(p.nombre) + '</b> <span class="chip ' + (p.vencido ? "rojo" : "verde") + '">' +
        esc(p.estado) + "</span><div class=\"nota\">" + esc(p.proximo) + " · <b>dueño: " + esc(p.dueno) + "</b></div></div>";
    }).join("");
    var cat = document.getElementById("catalogo-casos");
    if (cat) cat.innerHTML = dia.catalogoCasos.map(function (c) {
      return '<span class="chip azul" style="margin:3px">' + esc(c) + "</span>";
    }).join("");
  }

  function cablearCalculadoras() {
    renderCinta();
    var pre = document.getElementById("prefill");
    var u = puente.ultimos_valores();
    pre.innerHTML = u.valores
      ? "Prefill desde lo ya capturado: peso <b>" + esc(u.valores.peso || "—") + " kg</b> del control de hoy — lo que ya existe no se teclea (R-43)."
      : "Sin control guardado todavía — con datos en la estación, el prefill llega solo.";
    var form = document.getElementById("form-imc");
    var sal = document.getElementById("sal-imc");
    if (form) form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var r = puente.calcular("imc", { peso: form.peso.value, talla: form.talla.value });
      sal.innerHTML = r.ok
        ? '<span class="chip ' + r.color + '">IMC ' + esc(r.resultado) + " — " + esc(r.mensaje) + "</span>"
        : '<span class="chip gris">' + esc(r.mensaje) + "</span>";
    });
    var q = document.getElementById("form-qsofa");
    var salq = document.getElementById("sal-qsofa");
    if (q) q.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var fr = parseInt(q.fr.value, 10);
      var pas = parseInt(q.pa.value, 10);
      if (isNaN(fr) || isNaN(pas)) { salq.innerHTML = '<span class="chip gris">Sin datos suficientes — un puntaje incompleto es una mentira: se devuelve «incompleto», no cero.</span>'; return; }
      var puntos = 0;
      if (fr >= 22) puntos++;
      if (pas <= 100) puntos++;
      if (q.mente.value === "alterada") puntos++;
      salq.innerHTML = puntos >= 2
        ? '<span class="chip rojo">qSOFA ' + puntos + "/3 — mal pronóstico: evaluar hoy (tabla firmada)</span>"
        : '<span class="chip verde">qSOFA ' + puntos + "/3 — por debajo del umbral</span>";
    });
  }

  window.MK = { puente: puente, dia: dia, contexto: leerContexto, elegir: elegir, aviso: aviso, renderCinta: renderCinta };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", cablearPagina);
  else cablearPagina();
})();
