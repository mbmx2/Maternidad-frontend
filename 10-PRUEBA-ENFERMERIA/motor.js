/* Motor de prueba v3 — jornada con la lógica optimizada y las reparaciones de la
   auditoría adversarial (C-1…C-9 + A-5/A-6/A-7). Cada carpeta define JORNADA_KEY
   y NAVEGACION en su config.js antes de cargar este archivo. */
var Jornada = (function () {
  var KEY = (typeof JORNADA_KEY !== "undefined") ? JORNADA_KEY : "maternidad_prueba_v3";
  var AHORA_INICIO = 725;
  var t0 = Date.now();

  function ahoraMin() { return AHORA_INICIO + Math.floor((Date.now() - t0) / 60000); }
  function hm(min) { var h = Math.floor(min / 60) % 24, m = min % 60; return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m; }
  function uid() { return "id" + Math.random().toString(36).slice(2, 9); }
  function hoyISO() { return "2026-10-23"; }
  function fechaMas(dias) {
    var d = new Date(2026, 9, 23);
    d.setDate(d.getDate() + dias);
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function fechaLarga(iso) {
    var meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    var p = iso.split("-");
    return parseInt(p[2], 10) + " de " + meses[parseInt(p[1], 10) - 1];
  }

  var BANDERAS = [
    { id: "cefalea", nombre: "Dolor de cabeza intenso", explica: "Cefalea intensa o distinta a las habituales; puede ser señal de tensión alta." },
    { id: "epigastralgia", nombre: "Dolor en la boca del estómago", explica: "Dolor en la parte alta del abdomen; se asocia a problemas de hígado en el embarazo." },
    { id: "vision", nombre: "Visión borrosa", explica: "Ver confuso o con luces; junto con cefalea pide evaluar hoy." },
    { id: "hinchazon", nombre: "Hinchazón súbita de cara o manos", explica: "Inflamarse de pronto, no la hinchazón lenta de la tarde." },
    { id: "sangrado", nombre: "Sangrado genital", explica: "Cualquier sangrado por vía vaginal durante la visita." },
    { id: "disnea", nombre: "Falta de aire", explica: "Dificultad para respirar estando en reposo o al hablar." },
    { id: "fiebre", nombre: "Fiebre", explica: "Calentura medida o referida en las últimas horas." },
    { id: "contracciones", nombre: "Contracciones", explica: "Dureza del vientre repetida; anotar cada cuántas vienen." },
    { id: "movimiento", nombre: "Movimiento fetal disminuido", explica: "La paciente refiere que el bebé mueve menos que lo habitual." }
  ];

  var LAB_RANGOS = {
    hemoglobina: { nombre: "Hemoglobina", unidad: "g/dL", bandas: [{ max: 9.9, nivel: "critica", texto: "por debajo del mínimo" }, { max: 10.9, nivel: "alerta", texto: "por debajo del rango del trimestre" }], normalTexto: "en rango del trimestre" },
    glucosa: { nombre: "Glucosa en ayuno", unidad: "mg/dL", bandas: [{ max: 91, nivel: "normal", invertido: true }, { max: 125, nivel: "alerta", texto: "por arriba del rango en ayuno" }], fuera: "critica", fueraTexto: "muy por arriba del rango — evaluar hoy", normalTexto: "en rango en ayuno" },
    insulina: { nombre: "Insulina en ayuno", unidad: "µU/mL", bandas: [{ max: 24, nivel: "normal", invertido: true }, { max: 35, nivel: "alerta", texto: "por arriba del rango en ayuno" }], fuera: "alerta", fueraTexto: "por arriba del rango en ayuno", normalTexto: "en rango en ayuno" },
    plaquetas: { nombre: "Plaquetas", unidad: "mil/µL", bandas: [{ max: 149999, nivel: "critica", texto: "por debajo del mínimo" }, { max: 169999, nivel: "alerta", texto: "por debajo del rango" }], normalTexto: "en rango" },
    ldh: { nombre: "LDH", unidad: "U/L", bandas: [{ max: 250, nivel: "normal", invertido: true }, { max: 450, nivel: "alerta", texto: "por arriba del rango" }], fuera: "alerta", fueraTexto: "por arriba del rango", normalTexto: "en rango" }
  };

  var CALCULADORAS_18 = ["Peso fetal estimado (Hadlock)", "Talla fetal estimada", "Percentil de peso fetal", "Media ponderal al nacer", "Ballard de madurez", "IMC pregestacional", "Ganancia de peso (IOM)", "Superficie corporal (du Bois)", "Riesgo tromboembólico (Caprini)", "PHQ-9", "qSOFA", "NEWS2 obstétrico", "Hemoglobina por trimestre", "Criterios OGTT 75 g", "EG por biometría fetal", "Screening de preeclampsia", "Apgar", "Resistencia a la insulina (HOMA-IR)"];
  var HOMA_BANDAS = { bandas: [{ max: 2.5, nivel: "normal", invertido: true }, { max: 4.0, nivel: "alerta", texto: "índice por arriba del rango — sugiere resistencia a la insulina" }], fuera: "critica", fueraTexto: "índice muy por arriba del rango", normalTexto: "índice en rango" };

  var INTERACCIONES = [
    { droga: "amoxicilina", chocaCon: ["alergia:penicilina"], aviso: "choca con alergia registrada: penicilina" },
    { droga: "ampicilina", chocaCon: ["alergia:penicilina"], aviso: "choca con alergia registrada: penicilina" },
    { droga: "ibuprofeno", chocaCon: ["alergia:ibuprofeno", "med:warfarina"], aviso: "choca con su medicación actual: warfarina" },
    { droga: "sulfametoxazol", chocaCon: ["alergia:sulfa"], aviso: "choca con alergia registrada: sulfa" }
  ];

  function semilla() {
    var p = [];
    function pac(o) {
      o.id = o.id || uid();
      o.alergias = o.alergias || [];
      o.sangre = o.sangre || "sin dato";
      o.medicacion = o.medicacion || "sin dato";
      o.cronica = o.cronica || "sin dato";
      p.push(o);
      return o;
    }
    pac({ nombre: "Peña Sandoval, Gabriela", nacimiento: "1993-04-12", caso: "Embarazo 34 semanas", estadoSemilla: "en_atencion", desde: 720, sangre: "O+", eg: 34, marcador: "urgente", detalle: "cefalea + visión borrosa al guardar constantes" });
    pac({ nombre: "Ochoa Trejo, Perla", nacimiento: "1988-11-02", caso: "Cita de las 10:15", estadoSemilla: "no_llego", cita: 615, duenioEstado: "recepción" });
    pac({ nombre: "Mata Solís, Yolanda", nacimiento: "1996-01-20", caso: "Sin cita — llegó a las 12:03", estadoSemilla: "por_registrar", llegada: 723, procedencia: "Tlaxiaco", sinCita: true, duenioEstado: "recepción" });
    pac({ nombre: "Bernal Cruz, Rocío", nacimiento: "2001-06-30", caso: "Primera visita — derivada por el centro de salud", estadoSemilla: "por_registrar", llegada: 724, procedencia: "Pinotepa", sinCita: true, duenioEstado: "recepción" });
    pac({ nombre: "Herrera Luz, Brenda", nacimiento: "1990-09-15", caso: "Fertilidad — día 6 del protocolo de ovulación", estadoSemilla: "espera", llegada: 678 });
    pac({ nombre: "Torres Vega, Lucía", nacimiento: "1979-03-08", caso: "Tumoración ovárica — esperando estudio de imagen", estadoSemilla: "espera", llegada: 691, marcador: "estudio pendiente — reintento" });
    pac({ nombre: "Iturbe Cano, Herminia", nacimiento: "1995-12-01", caso: "40 semanas — inducción confirmada", estadoSemilla: "espera", llegada: 719, eg: 40, marcador: "lista para sala de parto" });
    pac({ nombre: "Mendoza Rojas, Carmen", nacimiento: "1992-07-19", caso: "Registrada de urgencia 11:02 — parto atendido", estadoSemilla: "falta_completar", llegada: 662, duenioEstado: "quien captura (enfermería)" });
    pac({ nombre: "Sandoval Ruiz, Estela", nacimiento: "1985-02-25", caso: "Post-quirúrgica de miomectomía — día 21", estadoSemilla: "estacion_mitad", llegada: 703, borradorEstacion: { peso: "68", pas: "118", pad: "76" }, duenioEstado: "quien captura (enfermería)" });
    pac({ nombre: "Luna Gómez, Rosa", nacimiento: "1987-05-11", caso: "VPH — aplicación 2 de 4", estadoSemilla: "en_atencion", desde: 718, tipoAtencion: "consulta" });
    pac({ nombre: "García Luna, María", nacimiento: "1994-08-08", caso: "Embarazo 28 semanas — control empezado 11:20", estadoSemilla: "pausada", desde: 710, tipoAtencion: "consulta", alergias: ["penicilina"], sangre: "O+", medicacion: "prenatales", eg: 28, borradorConsulta: { nota: "Control prenatal: refiere buen estado general." } });
    pac({ nombre: "Díaz Paredes, Carolina", nacimiento: "1998-10-14", caso: "Embarazo 12 semanas — primer control", estadoSemilla: "atendida", eg: 12 });
    pac({ nombre: "Ríos Aguilar, Daniela", nacimiento: "1991-01-05", caso: "Derivada — ultrasonido hecho", estadoSemilla: "atendida" });
    pac({ nombre: "Vega Moreno, Alejandra", nacimiento: "1989-04-22", caso: "Puerperio día 15", estadoSemilla: "atendida" });
    pac({ nombre: "Klein Ortiz, Ivonne", nacimiento: "1993-06-17", caso: "Embarazo 30 semanas — laboratorio de hoy entregado", estadoSemilla: "atendida", eg: 30 });
    pac({ nombre: "Navarrete Sol, Gloria", nacimiento: "1983-09-30", caso: "Infección — control semana 2 — confidencial", estadoSemilla: "atendida" });
    pac({ nombre: "Leal Fuentes, Julieta", nacimiento: "1986-12-12", caso: "Revisión de duelo obstétrico", estadoSemilla: "con_cita", cita: 740 });
    pac({ nombre: "Serrano Dávila, Fernanda", nacimiento: "1976-08-29", caso: "Tumoración uterina — revisión programada", estadoSemilla: "con_cita", cita: 750 });

    var eventos = [];
    function ev(tipo, pid, extra) {
      var e = { t: eventos.length, tipo: tipo, pid: pid, min: 725 };
      if (extra) for (var k in extra) if (k !== "tipo" && k !== "pid" && k !== "t") e[k] = extra[k];
      eventos.push(e);
      return e;
    }
    p.forEach(function (x) {
      ev("creado", x.id);
      if (x.estadoSemilla === "no_llego") ev("no_llego", x.id);
      if (x.llegada) ev("llego", x.id, { min: x.llegada });
      if (x.estadoSemilla === "estacion_mitad") ev("estacion_mitad", x.id, { min: x.llegada + 5, borrador: x.borradorEstacion, duenio: "enfermería" });
      if (x.estadoSemilla === "en_atencion" && x.tipoAtencion === "consulta") ev("en_atencion", x.id, { min: x.desde, tipoAtencion: "consulta", duenio: "médica" });
      if (x.estadoSemilla === "en_atencion" && x.marcador === "urgente") ev("urgencia", x.id, { min: 715, motivo: x.detalle });
      if (x.estadoSemilla === "en_atencion" && x.marcador === "urgente") ev("en_atencion", x.id, { min: 720, tipoAtencion: "urgencia", duenio: "médica" });
      if (x.estadoSemilla === "pausada") {
        ev("en_atencion", x.id, { min: x.desde, tipoAtencion: "consulta", duenio: "médica" });
        ev("pausada", x.id, { min: x.desde + 8, duenio: "médica", borrador: x.borradorConsulta });
      }
      if (x.estadoSemilla === "falta_completar") {
        ev("urgencia", x.id, { min: 662, motivo: "parto en la puerta sin expediente" });
        ev("parto", x.id, { min: 675 });
        ev("falta_completar", x.id, { min: 676 });
      }
      if (x.estadoSemilla === "atendida") ev("atendida", x.id, { min: 650 + (x.t || eventos.length) % 60 });
    });

    var maria = p[10], gabriela = p[0];
    return {
      version: 3,
      pacientes: p,
      eventos: eventos,
      atenciones: [],
      alertas: [
        { id: uid(), pid: gabriela.id, tipo: 4, texto: "cefalea intensa + visión borrosa + hinchazón", accion: "evaluar preeclampsia hoy", duenio: "médica", estado: "pendiente", nacida: 715, cerrada: null }
      ],
      laboratorio: [
        { pid: p[14].id, analito: "hemoglobina", valor: 11.2, fecha: hoyISO(), escritaTardio: false },
        { pid: maria.id, analito: "glucosa", valor: 96, fecha: hoyISO(), escritaTardio: false },
        { pid: maria.id, analito: "insulina", valor: 14, fecha: hoyISO(), escritaTardio: false }
      ],
      controles: [{ pid: maria.id, t: Date.now(), fecha: hoyISO(), peso: "74", pas: "118", pad: "74", au: "26", fcf: "145", presentacion: "Cefálica", proteinuria: "negativo", edema: "negativo", sintoma: "sin cambios", banderas: [] }],
      calculos: [],
      notas: [],
      entregados: [],
      agenda: [
        { min: 740, pid: p[16].id, motivo: "revisión de duelo obstétrico" },
        { min: 750, pid: p[17].id, motivo: "revisión programada" }
      ],
      equipoFuera: false,
      respaldoTarde: false,
      traspasoImpreso: false
    };
  }

  var S = null;
  function cargar() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) { S = JSON.parse(raw); if (S && S.version === 3) return S; }
    } catch (e) {}
    S = semilla();
    guardar();
    return S;
  }
  function guardar() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function reiniciar() { S = semilla(); guardar(); }
  function estado() { return S; }

  function paciente(id) {
    for (var i = 0; i < S.pacientes.length; i++) if (S.pacientes[i].id === id) return S.pacientes[i];
    return null;
  }
  function porNombre(nom) {
    var t = nom.trim().toLowerCase();
    for (var i = 0; i < S.pacientes.length; i++) if (S.pacientes[i].nombre.toLowerCase().indexOf(t) === 0) return S.pacientes[i];
    return null;
  }
  function eventosDe(pid) { return S.eventos.filter(function (e) { return e.pid === pid; }); }
  function ultimoEventoSatisfactorio(pid, tipos) {
    var ult = null;
    eventosDe(pid).forEach(function (e) { if (tipos.indexOf(e.tipo) >= 0) ult = e; });
    return ult;
  }
  function estadoDe(pid) {
    var evs = eventosDe(pid);
    var est = "con_cita";
    var duenio = null, desde = null, tipo = null;
    evs.forEach(function (e) {
      if (e.tipo === "no_llego") est = "no_llego";
      if (e.tipo === "llego") { est = "llego"; desde = e.min; }
      if (e.tipo === "registrada") est = "espera";
      if (e.tipo === "estacion_guardada") est = "estacion_hecha";
      if (e.tipo === "estacion_mitad") { est = "estacion_mitad"; duenio = e.duenio || "enfermería"; }
      if (e.tipo === "estacion_retomada") est = "espera";
      if (e.tipo === "en_atencion") { est = "en_atencion"; duenio = e.duenio; tipo = e.tipoAtencion || "consulta"; desde = e.min; }
      if (e.tipo === "pausada") { est = "pausada"; duenio = e.duenio; }
      if (e.tipo === "retomada") { est = "en_atencion"; }
      if (e.tipo === "urgencia") est = "urgente";
      if (e.tipo === "reagendada") { est = "con_cita"; duenio = "recepción"; }
      if (e.tipo === "falta_completar") { est = "falta_completar"; duenio = "quien captura (enfermería)"; }
      if (e.tipo === "ficha_completa") est = "atendida";
      if (e.tipo === "parto") est = "parto";
      if (e.tipo === "atendida") { est = "atendida"; duenio = null; }
    });
    var pac = paciente(pid);
    if (est === "con_cita" && pac && pac.cita != null && ahoraMin() > pac.cita + 45) est = "no_llego";
    if (est === "llego" && pac && pac.sinCita) est = "por_registrar";
    return { estado: est, duenio: duenio, desde: desde, tipo: tipo };
  }
  function esperaMin(pid) {
    var d = estadoDe(pid);
    if (d.estado === "espera" || d.estado === "llego" || d.estado === "estacion_hecha" || d.estado === "urgente") {
      var ev = ultimoEventoSatisfactorio(pid, ["llego", "registrada"]);
      if (ev) return Math.max(0, ahoraMin() - ev.min);
    }
    return null;
  }
  function agregarEvento(tipo, pid, extra) {
    var e = { t: S.eventos.length, tipo: tipo, pid: pid, min: ahoraMin() };
    if (extra) for (var k in extra) if (k !== "tipo" && k !== "pid" && k !== "t") e[k] = extra[k];
    S.eventos.push(e);
    guardar();
    return e;
  }
  function banderaInfo(id) {
    for (var i = 0; i < BANDERAS.length; i++) if (BANDERAS[i].id === id) return BANDERAS[i];
    return null;
  }
  function evaluarBandaLab(analito, valor) {
    var r = LAB_RANGOS[analito];
    if (!r) return { nivel: "sin_dato", texto: "sin catálogo" };
    for (var i = 0; i < r.bandas.length; i++) {
      var b = r.bandas[i];
      if (b.invertido) { if (valor <= b.max) return { nivel: b.nivel, texto: b.texto || r.normalTexto }; }
      else if (valor <= b.max) return { nivel: b.nivel, texto: b.texto || r.normalTexto };
    }
    if (r.fuera) return { nivel: r.fuera, texto: r.fueraTexto || "por arriba del rango" };
    return { nivel: "normal", texto: r.normalTexto };
  }
  function bandaTA(pas, pad) {
    if (pas >= 160 || pad >= 110) return { nivel: "critica", texto: "tensión muy por arriba — evaluar hoy" };
    if (pas >= 140 || pad >= 90) return { nivel: "alerta", texto: "tensión por arriba del rango" };
    if (pas && pad && (pas < 90 || pad < 60)) return { nivel: "alerta", texto: "tensión por debajo del rango" };
    if (pas && pad) return { nivel: "normal", texto: "tensión en rango" };
    return { nivel: "sin_dato", texto: "sin dato" };
  }
  function homa(glucosa, insulina) {
    var v = Math.round((glucosa * insulina / 405) * 100) / 100;
    var r = HOMA_BANDAS;
    for (var i = 0; i < r.bandas.length; i++) {
      var b = r.bandas[i];
      if (b.invertido) { if (v <= b.max) return { valor: v, nivel: b.nivel, texto: b.texto || r.normalTexto }; }
      else if (v <= b.max) return { valor: v, nivel: b.nivel, texto: b.texto || r.normalTexto };
    }
    return { valor: v, nivel: r.fuera, texto: r.fueraTexto };
  }
  function proximaFechaControl(p) {
    var dias = 28;
    var c = p.caso.toLowerCase();
    if (c.indexOf("infección") >= 0) dias = 14;
    else if (c.indexOf("puerperio") >= 0) dias = 14;
    else if (c.indexOf("fertilidad") >= 0) dias = 7;
    else if (p.eg && p.eg >= 36) dias = 7;
    return { fecha: fechaMas(dias), dias: dias };
  }
  function nacerAlerta(pid, tipo, texto, accion, duenio, plazo) {
    for (var i = 0; i < S.alertas.length; i++) {
      var a = S.alertas[i];
      if (a.pid === pid && a.texto === texto && a.estado === "pendiente") return a;
    }
    var nueva = { id: uid(), pid: pid, tipo: tipo, texto: texto, accion: accion, duenio: duenio || "a quien atiende", plazo: plazo || null, estado: "pendiente", nacida: ahoraMin(), cerrada: null };
    S.alertas.push(nueva);
    agregarEvento("alerta_nacida", pid, { alertaId: nueva.id });
    return nueva;
  }
  function cerrarAlerta(id, forma) {
    for (var i = 0; i < S.alertas.length; i++) {
      if (S.alertas[i].id === id) {
        S.alertas[i].estado = "atendida";
        S.alertas[i].cerrada = ahoraMin();
        S.alertas[i].cierre = forma || "atendida";
        guardar();
        return S.alertas[i];
      }
    }
    return null;
  }
  function alertasDe(pid) {
    var lista = S.alertas.filter(function (a) { return a.pid === pid; });
    var orden = { 1: 0, 5: 1, 2: 2, 3: 3, 6: 4, 4: 5 };
    var pend = lista.filter(function (a) { return a.estado === "pendiente"; }).sort(function (x, y) { return (orden[x.tipo] || 0) - (orden[y.tipo] || 0); });
    var cerr = lista.filter(function (a) { return a.estado !== "pendiente"; });
    return pend.concat(cerr);
  }
  function alertasPendientes() { return S.alertas.filter(function (a) { return a.estado === "pendiente"; }); }
  function vencida(a) { return a.plazo && a.plazo < hoyISO(); }
  function metricaFatiga() {
    var hoy = S.alertas.filter(function (a) { return a.tipo !== 5; });
    var visitas = S.controles.length + S.notas.length || 1;
    var media = Math.round((hoy.length / visitas) * 10) / 10;
    return { avisos: hoy.length, visitas: visitas, media: media, meta: 2 };
  }
  function labDe(pid) { return S.laboratorio.filter(function (l) { return l.pid === pid; }); }
  function controlMasReciente(pid) {
    var c = null;
    S.controles.forEach(function (x) { if (x.pid === pid && (!c || x.t >= c.t)) c = x; });
    return c;
  }
  function resolverChips(pid) {
    var chips = [];
    var c = controlMasReciente(pid);
    if (c) {
      var bta = bandaTA(parseInt(c.pas, 10), parseInt(c.pad, 10));
      chips.push({ texto: "TA " + c.pas + "/" + c.pad + " — " + bta.texto, nivel: bta.nivel });
      if (c.proteinuria && c.proteinuria !== "negativo" && c.proteinuria !== "trazas")
        chips.push({ texto: "proteinuria " + c.proteinuria + " — anotar en banderas", nivel: "alerta" });
      if (c.fcf) {
        var f = parseInt(c.fcf, 10);
        if (f < 110 || f > 160) chips.push({ texto: "FCF " + f + " — por fuera del rango 110–160", nivel: "alerta" });
        else chips.push({ texto: "FCF " + f + " — en rango", nivel: "normal" });
      }
    }
    labDe(pid).forEach(function (l) {
      var b = evaluarBandaLab(l.analito, l.valor);
      var r = LAB_RANGOS[l.analito];
      chips.push({ texto: (r ? r.nombre : l.analito) + " " + l.valor + " — " + b.texto, nivel: b.nivel });
    });
    S.calculos.forEach(function (x) {
      if (x.pid === pid && x.homa != null) {
        var bb = evaluarBandaHoma(x.homa);
        chips.push({ texto: "HOMA-IR " + x.homa + " — " + bb.texto, nivel: bb.nivel });
      }
    });
    return chips;
  }
  function evaluarBandaHoma(v) {
    var r = HOMA_BANDAS;
    for (var i = 0; i < r.bandas.length; i++) {
      var b = r.bandas[i];
      if (b.invertido) { if (v <= b.max) return { nivel: b.nivel, texto: b.texto || r.normalTexto }; }
      else if (v <= b.max) return { nivel: b.nivel, texto: b.texto || r.normalTexto };
    }
    return { nivel: r.fuera, texto: r.fueraTexto };
  }
  function resumenDia() {
    var cuentas = { urgente: 0, no_llego: 0, por_registrar: 0, espera: 0, estacion_mitad: 0, en_atencion: 0, pausada: 0, atendida: 0, falta_completar: 0, con_cita: 0, estacion_hecha: 0 };
    S.pacientes.forEach(function (p) {
      var e = estadoDe(p.id).estado;
      if (e === "urgente" || e === "en_atencion") { if (p.marcador === "urgente" && e !== "atendida") cuentas.urgente++; else cuentas.en_atencion++; }
      else if (e === "llego" || e === "espera" || e === "estacion_hecha") cuentas.espera++;
      else if (cuentas[e] != null) cuentas[e]++;
      else cuentas.espera++;
    });
    return cuentas;
  }
  function cierreData() {
    var atendidas = [], noLlegaron = [], mitad = [], incompletas = [], enCurso = [], esperan = [];
    S.pacientes.forEach(function (p) {
      var d = estadoDe(p.id).estado;
      if (d === "atendida") atendidas.push(p);
      else if (d === "no_llego") noLlegaron.push(p);
      else if (d === "estacion_mitad") mitad.push(p);
      else if (d === "falta_completar") incompletas.push(p);
      else if (d === "en_atencion" || d === "urgente" || d === "pausada") enCurso.push(p);
      else if (d === "espera" || d === "llego" || d === "estacion_hecha" || d === "por_registrar") esperan.push(p);
    });
    return { atendidas: atendidas, noLlegaron: noLlegaron, mitad: mitad, incompletas: incompletas, enCurso: enCurso, esperan: esperan, vencidas: alertasPendientes() };
  }
  function recordatorios() {
    var out = [];
    alertasPendientes().forEach(function (a) {
      if (!a.plazo) return;
      out.push({ rid: "a:" + a.id, pid: a.pid, situacion: a.texto, plantilla: "Hola " + paciente(a.pid).nombre.split(",")[1].trim() + ", es el consultorio: toca " + a.accion + ". Cite en recepción — le esperamos." , fecha: a.plazo, entregado: S.entregados.indexOf("a:" + a.id) >= 0 });
    });
    S.pacientes.forEach(function (p) {
      if (estadoDe(p.id).estado !== "atendida") return;
      if (!p.eg && p.caso.toLowerCase().indexOf("embarazo") < 0 && p.caso.toLowerCase().indexOf("fertilidad") < 0 && p.caso.toLowerCase().indexOf("infección") < 0) return;
      var f = proximaFechaControl(p);
      var rid = "c:" + p.id;
      out.push({ rid: rid, pid: p.id, situacion: "próximo control derivado del protocolo", plantilla: "Hola " + p.nombre.split(",")[1].trim() + ", su próximo control es el " + fechaLarga(f.fecha) + ". Si nota cefalea intensa, visión borrosa o hinchazón súbita, acuda antes.", fecha: f.fecha, entregado: S.entregados.indexOf(rid) >= 0 });
    });
    return out;
  }
  function entregarRecordatorio(rid) {
    if (S.entregados.indexOf(rid) < 0) { S.entregados.push(rid); guardar(); }
  }
  function anularRecordatorio(rid) {
    var i = S.entregados.indexOf(rid);
    if (i >= 0) { S.entregados.splice(i, 1); guardar(); }
  }

  function toast(msg) {
    var viejo = document.querySelector(".toast");
    if (viejo) viejo.remove();
    var t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { if (t.parentNode) t.remove(); }, 3600);
  }
  function modal(titulo, html, acciones) {
    var f = document.createElement("div");
    f.className = "modal-fondo";
    var m = document.createElement("div");
    m.className = "modal";
    m.innerHTML = "<h3></h3><div class='cuerpo-modal'></div><div class='acciones'></div>";
    m.querySelector("h3").textContent = titulo;
    m.querySelector(".cuerpo-modal").innerHTML = html;
    var cont = m.querySelector(".acciones");
    (acciones || [{ txt: "Cerrar", cls: "sec" }]).forEach(function (a) {
      var b = document.createElement("button");
      b.className = "btn chico " + (a.cls || "sec");
      b.textContent = a.txt;
      b.onclick = function () { f.remove(); if (a.fn) a.fn(); };
      cont.appendChild(b);
    });
    f.appendChild(m);
    document.body.appendChild(f);
  }
  function nombrePac(pid) { var p = paciente(pid); return p ? p.nombre : "—"; }

  function pintarRelojBarra() {
    var el = document.querySelector(".reloj-dia");
    if (el) el.textContent = "Jueves 23 de octubre · " + hm(ahoraMin()) + (S.equipoFuera ? " · EQUIPO FUERA" : "");
  }
  function nav(actual) {
    var items = (typeof NAVEGACION !== "undefined") ? NAVEGACION : [];
    var html = "<div class='grupo'>" + ((typeof ROL_PRUEBA !== "undefined") ? ROL_PRUEBA : "Prueba") + "</div>";
    items.forEach(function (it) {
      html += "<a href='" + it[0] + "' class='" + (it[0] === actual ? "activo" : "") + "'>" + it[1] + "</a>";
    });
    html += "<div class='grupo'>Utilidad</div><a href='INDICE.html'>Índice de la prueba</a><a href='HOJA-DE-VEREDICTO.html'>Hoja de veredicto</a>";
    var lat = document.querySelector(".lateral");
    if (lat) lat.innerHTML = html;
    pintarRelojBarra();
  }
  function contextoPaciente() {
    var q = new URLSearchParams(location.search);
    return q.get("p");
  }
  function irA(pagina, pid) { location.href = pagina + (pid ? "?p=" + pid : ""); }

  function bandaVeredicto(id, pregunta) {
    var guardada = null;
    try { guardada = localStorage.getItem("ver_" + KEY + "_" + id); } catch (e) {}
    var val = guardada ? JSON.parse(guardada) : { opcion: "", nota: "" };
    var opciones = ["Así está bien, lo apruebo", "Así está bien, pero con cambios", "Esto no sirve así, hay que rediseñarlo"];
    var html = "<div class='banda'><span class='rotulo'>PREGUNTA PARA EL EQUIPO — conteste aquí o en la hoja de veredicto</span>" + pregunta +
      "<div class='veredicto'><b>Veredicto:</b>";
    opciones.forEach(function (o, i) {
      html += "<label><input type='radio' name='ver' value='" + i + "' " + (val.opcion === String(i) ? "checked" : "") + "> " + o + "</label>";
    });
    html += "</div><div class='campo'><label>Sus cambios (opcional)</label><textarea id='ver-nota' rows='2' style='max-width:640px'>" + (val.nota || "") + "</textarea></div>" +
      "<div class='linea' id='ver-estado' style='color:#2e9e4f'></div></div>";
    var host = document.getElementById("veredicto-host");
    if (!host) {
      host = document.createElement("div");
      host.id = "veredicto-host";
      document.querySelector(".zona").appendChild(host);
    }
    host.innerHTML = html;
    function salvar() {
      var sel = document.querySelector("input[name=ver]:checked");
      var obj = { opcion: sel ? sel.value : "", nota: document.getElementById("ver-nota").value };
      try { localStorage.setItem("ver_" + KEY + "_" + id, JSON.stringify(obj)); } catch (e) {}
      document.getElementById("ver-estado").textContent = obj.opcion !== "" ? "Veredicto guardado en este navegador — pase la hoja impresa para el expediente de la prueba." : "";
    }
    host.querySelectorAll("input[name=ver]").forEach(function (r) { r.onchange = salvar; });
    document.getElementById("ver-nota").oninput = salvar;
    if (val.opcion !== "") document.getElementById("ver-estado").textContent = "Veredicto guardado en este navegador — pase la hoja impresa para el expediente de la prueba.";
  }

  function tarjetaHTML(p, extra) {
    var d = estadoDe(p.id);
    var reloj = esperaMin(p.id);
    var cls = "", relojCls = "";
    if (d.estado === "urgente" || d.estado === "falta_completar") cls = "rojo";
    else if (d.estado === "atendida") cls = "verde";
    else if (d.estado === "no_llego" || d.estado === "con_cita") cls = "gris";
    else if (d.estado === "pausada" || d.estado === "estacion_mitad") cls = "ambar";
    if (reloj != null && reloj >= 45) relojCls = "min45"; else if (reloj != null && reloj >= 30) relojCls = "min30";
    var etiquetas = {
      urgente: "EN ATENCIÓN — urgencia", en_atencion: "en atención", pausada: "pausada", espera: "en espera",
      llego: "llegó", por_registrar: "por registrar", no_llego: "no llegó", estacion_mitad: "estación a mitad",
      falta_completar: "falta completar su ficha", atendida: "atendida", con_cita: "con cita", estacion_hecha: "estación hecha"
    };
    var h = "<div class='tarjeta " + cls + "' data-pid='" + p.id + "'>";
    if (reloj != null) h += "<span class='reloj " + relojCls + "'>" + reloj + " min</span>";
    h += "<div class='nombre'>" + p.nombre + "</div><div class='caso'>nacida " + p.nacimiento + " · " + p.caso + "</div>";
    h += "<div class='pies'><span class='chip " + (cls || "azul") + "'>" + (etiquetas[d.estado] || d.estado) + "</span>";
    if (p.marcador) h += "<span class='chip ambar'>" + p.marcador + "</span>";
    if (d.duenio) h += " Dueño: " + d.duenio;
    if (extra) h += extra;
    h += "</div></div>";
    return h;
  }

  function avisoHTML(a, conClinico) {
    var cls = a.tipo === 4 ? "rojo" : a.tipo === 3 ? "rojo" : a.tipo === 2 ? "ambar" : a.tipo === 6 ? "rojo" : "verde";
    var tipos = { 1: "verde — está bien", 2: "chequeo con plazo", 3: "problema de salud", 4: "urgencia", 5: "contexto permanente", 6: "interacción" };
    var h = "<div class='aviso " + cls + "'><b>" + a.texto + "</b>" +
      "<span class='accion'>Acción: " + a.accion + "</span>" +
      "<span class='duenio'>Dueño: " + a.duenio + " · nació a las " + hm(a.nacida) +
      (a.plazo ? " · plazo: " + fechaLarga(a.plazo) + (vencida(a) ? " — VENCIDO (sube al tablero)" : "") : "") + "</span>";
    if (conClinico) {
      h += "<details style='margin-top:6px'><summary style='cursor:pointer;font-size:12px;color:#14507d'>Detalle clínico (para el profesional)</summary>" +
        "<div class='linea' style='font-size:12px'>Tipo de aviso: " + (tipos[a.tipo] || a.tipo) + " · estado: " + a.estado + (a.cierre ? " (cierre: " + a.cierre + ")" : "") + " · identificador de bitácora: " + a.id + "</div></details>";
    }
    h += "</div>";
    return h;
  }

  cargar();

  return {
    ahoraMin: ahoraMin, hm: hm, uid: uid, hoyISO: hoyISO, fechaMas: fechaMas, fechaLarga: fechaLarga,
    BANDERAS: BANDERAS, LAB_RANGOS: LAB_RANGOS, INTERACCIONES: INTERACCIONES, CALCULADORAS_18: CALCULADORAS_18,
    estado: estado, paciente: paciente, porNombre: porNombre, estadoDe: estadoDe, esperaMin: esperaMin,
    agregarEvento: agregarEvento, banderaInfo: banderaInfo, evaluarBandaLab: evaluarBandaLab, bandaTA: bandaTA,
    homa: homa, evaluarBandaHoma: evaluarBandaHoma, proximaFechaControl: proximaFechaControl,
    nacerAlerta: nacerAlerta, cerrarAlerta: cerrarAlerta, alertasDe: alertasDe, alertasPendientes: alertasPendientes,
    vencida: vencida, metricaFatiga: metricaFatiga, labDe: labDe, controlMasReciente: controlMasReciente,
    resolverChips: resolverChips, resumenDia: resumenDia, cierreData: cierreData,
    recordatorios: recordatorios, entregarRecordatorio: entregarRecordatorio, anularRecordatorio: anularRecordatorio,
    toast: toast, modal: modal, nombrePac: nombrePac, pintarRelojBarra: pintarRelojBarra, nav: nav,
    contextoPaciente: contextoPaciente, irA: irA, bandaVeredicto: bandaVeredicto, tarjetaHTML: tarjetaHTML,
    avisoHTML: avisoHTML, reiniciar: reiniciar, guardar: guardar, clave: function () { return KEY; }
  };
})();
