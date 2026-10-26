/* Motor sintético v4 — 12-FRONT-SINTESIS.
   Absorbe lo mejor de todo el repo y repara lo criticado:
   · de 10/11 (motor.js v3): estados DERIVADOS de eventos, persistencia en localStorage,
     no-llegó automático (FL-04), borrador de estación, dueño y toma por emergencia,
     semáforo de laboratorio, HOMA con prefill, recordatorios con entrega/anulación,
     los seis tipos de aviso, métrica de fatiga, banda de veredicto por pantalla.
   · de 07 (puente.js): cierre de alerta FIRMADO con nombre y cédula (B-013), cinta de
     identidad con datos que salvan, riel de dos grupos + menú de contexto, cierre
     imprimible, drill de respaldo.
   · reparaciones sobre lo anterior (auditoría H-089…H-095, P-01…P-29):
     P-01 origen del HOMA correcto · P-02 cita con fecha real que sale de «por recuperar» ·
     P-03 retomar restaura el borrador por el evento, no por el estado actual ·
     P-04 toda alerta cierra con nombre y cédula o anclada a nota firmada ·
     P-05 plazos sembrados: VENCIDO y ESCALADO son camino vivo ·
     P-06 una alerta tipo 4 MUEVE la tarjeta al frente ·
     P-11 referida NO es atendida · P-12 sin marcas por defecto en el cierre anclado ·
     P-16 nombres sin coma no rompen · P-19 fecha y reloj REALES (nada escrito a mano) ·
     P-20 urgencias primero en la lista de avisos · P-29 un paseo sin cita siempre
     encuentra el camino a la estación (visita_completa ⇒ espera).
   La ley manda: R-37 — el aviso de interacción NUNCA bloquea: informa, nombra el riesgo,
   pide confirmación y registra lo forzado. La P6 prohíbe umbrales en código: los
   catálogos clínicos viven en CATALOGO (borrador firmable) y el producto los lee de ahí. */
var Jornada = (function () {
  "use strict";
  var KEY = (typeof JORNADA_KEY !== "undefined") ? JORNADA_KEY : "sintesis_v1";

  function ahoraMin() { var d = new Date(); return d.getHours() * 60 + d.getMinutes(); }
  function hm(min) { var h = Math.floor(min / 60) % 24, m = ((min % 60) + 60) % 60; return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m; }
  function uid() { return "id" + Math.random().toString(36).slice(2, 9); }
  function iso(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function hoyISO() { return iso(new Date()); }
  function fechaMas(dias) { var d = new Date(); d.setDate(d.getDate() + dias); return iso(d); }
  function fechaLarga(isoStr) {
    var meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    var p = String(isoStr).split("-");
    return parseInt(p[2], 10) + " de " + meses[parseInt(p[1], 10) - 1] + (p[0] !== String(new Date().getFullYear()) ? " de " + p[0] : "");
  }
  function diaLargo() {
    return new Date().toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" });
  }
  function apellido(nombre) { var s = String(nombre || "").split(",")[0]; return s.trim(); }
  function nombrePropio(nombre) {
    var partes = String(nombre || "").split(",");
    return (partes[1] || partes[0] || "").trim().split(" ")[0] || "paciente";
  }
  function esc(t) { return String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  /* Catálogos clínicos — BORRADOR FIRMABLE (ley P6: el umbral vive en catálogo, no en código;
     aquí van sembrados «como si firmados» para la sesión; el médico los firma y el producto
     los leerá desde CATALOGOS/LAB_RANGOS.json y hermanas). */
  var CATALOGO = {
    LAB_RANGOS: {
      hemoglobina: { nombre: "Hemoglobina", unidad: "g/dL", bandas: [{ max: 9.9, nivel: "critica", texto: "por debajo del mínimo" }, { max: 10.9, nivel: "alerta", texto: "por debajo del rango del trimestre" }], normalTexto: "en rango del trimestre" },
      hematocrito: { nombre: "Hematocrito", unidad: "%", bandas: [{ max: 32, nivel: "critica", texto: "por debajo del mínimo" }, { max: 35.9, nivel: "alerta", texto: "por debajo del rango del trimestre" }], normalTexto: "en rango del trimestre" },
      glucosa: { nombre: "Glucosa en ayuno", unidad: "mg/dL", bandas: [{ max: 91, nivel: "normal", invertido: true }, { max: 125, nivel: "alerta", texto: "por arriba del rango en ayuno" }], fuera: "critica", fueraTexto: "muy por arriba del rango — evaluar hoy", normalTexto: "en rango en ayuno" },
      insulina: { nombre: "Insulina en ayuno", unidad: "µU/mL", bandas: [{ max: 24, nivel: "normal", invertido: true }, { max: 35, nivel: "alerta", texto: "por arriba del rango en ayuno" }], fuera: "alerta", fueraTexto: "por arriba del rango en ayuno", normalTexto: "en rango en ayuno" },
      plaquetas: { nombre: "Plaquetas", unidad: "mil/µL", bandas: [{ max: 149999, nivel: "critica", texto: "por debajo del mínimo" }, { max: 169999, nivel: "alerta", texto: "por debajo del rango" }], normalTexto: "en rango" },
      ldh: { nombre: "LDH", unidad: "U/L", bandas: [{ max: 250, nivel: "normal", invertido: true }, { max: 450, nivel: "alerta", texto: "por arriba del rango" }], fuera: "alerta", fueraTexto: "por arriba del rango", normalTexto: "en rango" },
      bilirrubina: { nombre: "Bilirrubina total", unidad: "mg/dL", bandas: [{ max: 1.1, nivel: "normal", invertido: true }, { max: 1.9, nivel: "alerta", texto: "por arriba del rango" }], fuera: "critica", fueraTexto: "muy por arriba del rango", normalTexto: "en rango" },
      acido_urico: { nombre: "Ácido úrico", unidad: "mg/dL", bandas: [{ max: 5.9, nivel: "normal", invertido: true }, { max: 6.9, nivel: "alerta", texto: "por arriba del rango" }], fuera: "alerta", fueraTexto: "por arriba del rango", normalTexto: "en rango" },
      creatinina: { nombre: "Creatinina", unidad: "mg/dL", bandas: [{ max: 0.9, nivel: "normal", invertido: true }, { max: 1.1, nivel: "alerta", texto: "por arriba del rango" }], fuera: "critica", fueraTexto: "muy por arriba del rango — evaluar hoy", normalTexto: "en rango" }
    },
    TA: { critica: { pas: 160, pad: 110, texto: "tensión muy por arriba — evaluar hoy" }, alerta: { pas: 140, pad: 90, texto: "tensión por arriba del rango" }, baja: { texto: "tensión por debajo del rango" } },
    FCF: { min: 110, max: 160 },
    HOMA: { bandas: [{ max: 2.5, nivel: "normal", invertido: true }, { max: 4.0, nivel: "alerta", texto: "índice por arriba del rango — sugiere resistencia a la insulina" }], fuera: "critica", fueraTexto: "índice muy por arriba del rango", normalTexto: "índice en rango" },
    /* Próximo control por situación (R-41: si es derivable, nunca se captura). */
    CONTROL: { base: 28, infeccion: 14, puerperio: 14, fertilidad: 7, egTardia: 7, egTardiaDesde: 36 },
    INTERACCIONES: [
      { droga: "amoxicilina", chocaCon: ["alergia:penicilina"], aviso: "choca con alergia registrada: penicilina" },
      { droga: "ampicilina", chocaCon: ["alergia:penicilina"], aviso: "choca con alergia registrada: penicilina" },
      { droga: "ibuprofeno", chocaCon: ["alergia:ibuprofeno", "med:warfarina"], aviso: "choca con su medicación actual: warfarina" },
      { droga: "sulfametoxazol", chocaCon: ["alergia:sulfa"], aviso: "choca con alergia registrada: sulfa" }
    ],
    CALCULADORAS_18: ["Peso fetal estimado (Hadlock)", "Talla fetal estimada", "Percentil de peso fetal", "Media ponderal al nacer", "Ballard de madurez", "IMC pregestacional", "Ganancia de peso (IOM)", "Superficie corporal (du Bois)", "Riesgo tromboembólico (Caprini)", "PHQ-9", "qSOFA", "NEWS2 obstétrico", "Hemoglobina por trimestre", "Criterios OGTT 75 g", "EG por biometría fetal", "Screening de preeclampsia", "Apgar", "Resistencia a la insulina (HOMA-IR)"]
  };
  var LAB_RANGOS = CATALOGO.LAB_RANGOS;

  /* Catálogo de tipos de atención (P6): la pantalla no decide tipos a mano.
     abrible:false = la urgencia se declara en SU pantalla (voz → sistema), nunca aquí. */
  var TIPOS_ATENCION = {
    estacion: { nombre: "Estación de constantes", duenio: "enfermería", pantalla: "estacion.html", conBorrador: true, tomable: true, abrible: true },
    consulta: { nombre: "Consulta", duenio: "la médica", pantalla: "consulta.html", conBorrador: true, tomable: true, abrible: true },
    urgencia: { nombre: "Urgencia", duenio: "la médica", pantalla: "urgencia.html", conBorrador: false, tomable: true, abrible: false }
  };

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

  var S = null;
  function semilla() {
    var t0 = ahoraMin();
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
    pac({ nombre: "Peña Sandoval, Gabriela", nacimiento: "1993-04-12", caso: "Embarazo 34 semanas", llegada: t0 - 20, marcador: "urgente", duenioSemilla: "la médica", detalle: "cefalea + visión borrosa al guardar constantes", sangre: "O+", eg: 34, alergias: ["sulfa"] });
    pac({ nombre: "Ochoa Trejo, Perla", nacimiento: "1988-11-02", caso: "Cita vencida — pasó su hora sin aparecer", cita: t0 - 60, duenioSemilla: "recepción" });
    pac({ nombre: "Mata Solís, Yolanda", nacimiento: "1996-01-20", caso: "Llegó sin cita — falta completar su visita", llegada: t0 - 3, sinCita: true, duenioSemilla: "recepción" });
    pac({ nombre: "Bernal Cruz, Rocío", nacimiento: "2001-06-30", caso: "Primera visita — derivada por el centro de salud", llegada: t0 - 2, sinCita: true, duenioSemilla: "recepción" });
    pac({ nombre: "Herrera Luz, Brenda", nacimiento: "1990-09-15", caso: "Fertilidad — día 6 del protocolo de ovulación", llegada: t0 - 47 });
    pac({ nombre: "Torres Vega, Lucía", nacimiento: "1979-03-08", caso: "Tumoración ovárica — esperando estudio de imagen", llegada: t0 - 34, marcador: "estudio pendiente — reintento" });
    pac({ nombre: "Iturbe Cano, Herminia", nacimiento: "1995-12-01", caso: "40 semanas — inducción confirmada", llegada: t0 - 12, eg: 40, marcador: "lista para sala de parto" });
    pac({ nombre: "Mendoza Rojas, Carmen", nacimiento: "1992-07-19", caso: "Registrada de urgencia — parto atendido, falta la ficha", llegada: t0 - 65, duenioSemilla: "quien captura (enfermería)" });
    pac({ nombre: "Sandoval Ruiz, Estela", nacimiento: "1985-02-25", caso: "Post-quirúrgica de miomectomía — día 21", llegada: t0 - 28, borradorEstacion: { peso: "68", pas: "118", pad: "76", au: "24", fcf: "142", pres: "Cefálica", prot: "negativo", edema: "negativo", sint: "" }, duenioSemilla: "quien captura (enfermería)" });
    pac({ nombre: "Luna Gómez, Rosa", nacimiento: "1987-05-11", caso: "VPH — aplicación 2 de 4", llegada: t0 - 9, tipoAtencionSemilla: "consulta", duenioSemilla: "la médica" });
    pac({ nombre: "García Luna, María", nacimiento: "1994-08-08", caso: "Embarazo 28 semanas — control empezado, pausado", llegada: t0 - 22, alergias: ["penicilina"], sangre: "O+", medicacion: "prenatales", eg: 28, tipoAtencionSemilla: "consulta", duenioSemilla: "la médica", borradorConsulta: "Control prenatal: refiere buen estado general. Niega cefalea, niega visión borrosa." });
    pac({ nombre: "Díaz Paredes, Carolina", nacimiento: "1998-10-14", caso: "Embarazo 12 semanas — primer control", eg: 12, atendidaEn: t0 - 90 });
    pac({ nombre: "Ríos Aguilar, Daniela", nacimiento: "1991-01-05", caso: "Derivada — ultrasonido hecho", atendidaEn: t0 - 80 });
    pac({ nombre: "Vega Moreno, Alejandra", nacimiento: "1989-04-22", caso: "Puerperio día 15", atendidaEn: t0 - 70 });
    pac({ nombre: "Klein Ortiz, Ivonne", nacimiento: "1993-06-17", caso: "Embarazo 30 semanas — laboratorio de hoy entregado", eg: 30, atendidaEn: t0 - 55 });
    pac({ nombre: "Navarrete Sol, Gloria", nacimiento: "1983-09-30", caso: "Infección — control semana 2 — confidencial", atendidaEn: t0 - 40 });
    pac({ nombre: "Leal Fuentes, Julieta", nacimiento: "1986-12-12", caso: "Revisión de duelo obstétrico", cita: t0 + 15 });
    pac({ nombre: "Serrano Dávila, Fernanda", nacimiento: "1976-08-29", caso: "Tumoración uterina — revisión programada", cita: t0 + 25 });

    var eventos = [];
    function ev(tipo, pid, min, extra) {
      var e = { t: eventos.length, tipo: tipo, pid: pid, min: min == null ? t0 : min };
      if (extra) for (var k in extra) if (k !== "tipo" && k !== "pid" && k !== "t" && k !== "min") e[k] = extra[k];
      eventos.push(e);
      return e;
    }
    p.forEach(function (x) {
      ev("creado", x.id, x.atendidaEn != null ? x.atendidaEn - 30 : (x.cita != null && x.cita < t0 ? x.cita - 15 : (x.llegada != null ? x.llegada - 1 : t0 - 120)));
      if (x.cita != null && x.cita < t0) ev("no_llego", x.id, x.cita + 46);
      if (x.llegada != null) ev("llego", x.id, x.llegada);
      if (x.borradorEstacion) ev("estacion_mitad", x.id, x.llegada + 4, { borrador: x.borradorEstacion, duenio: "enfermería" });
      if (x.tipoAtencionSemilla === "consulta" && x.marcador !== "urgente") {
        ev("en_atencion", x.id, x.llegada + 2, { tipoAtencion: "consulta", duenio: x.duenioSemilla || "la médica" });
        if (x.borradorConsulta) ev("pausada", x.id, x.llegada + 10, { duenio: x.duenioSemilla || "la médica", borrador: x.borradorConsulta });
      }
      if (x.marcador === "urgente") {
        ev("urgencia", x.id, x.llegada + 5, { motivo: x.detalle, duenio: "la médica" });
        ev("en_atencion", x.id, x.llegada + 10, { tipoAtencion: "urgencia", duenio: "la médica" });
      }
      if (x.caso.indexOf("parto atendido") >= 0) {
        ev("urgencia", x.id, x.llegada + 1, { motivo: "parto en la puerta sin expediente", duenio: "la médica" });
        ev("falta_completar", x.id, x.llegada + 14);
      }
      if (x.atendidaEn != null) ev("atendida", x.id, x.atendidaEn, { via: "consulta" });
    });

    var maria = p[10], gabriela = p[0], ivonne = p[14], brenda = p[4], estela = p[8], rosa = p[9];
    return {
      version: 4,
      pacientes: p,
      eventos: eventos,
      atenciones: [
        { id: uid(), pid: rosa.id, tipo: "consulta", abierta: true, pausada: false, duenio: "la médica", borrador: null, abiertaEn: t0 - 9, pausadaEn: null },
        { id: uid(), pid: maria.id, tipo: "consulta", abierta: true, pausada: true, duenio: "la médica", borrador: "Control prenatal: refiere buen estado general. Niega cefalea, niega visión borrosa.", abiertaEn: t0 - 20, pausadaEn: t0 - 12 },
        { id: uid(), pid: estela.id, tipo: "estacion", abierta: true, pausada: true, duenio: "enfermería", borrador: { peso: "68", pas: "118", pad: "76", au: "24", fcf: "142", pres: "Cefálica", prot: "negativo", edema: "negativo", sint: "" }, abiertaEn: t0 - 24, pausadaEn: t0 - 24 },
        { id: uid(), pid: gabriela.id, tipo: "urgencia", abierta: true, pausada: false, duenio: "la médica", borrador: null, abiertaEn: t0 - 10, pausadaEn: null }
      ],
      alertas: [
        { id: uid(), pid: gabriela.id, tipo: 4, texto: "cefalea intensa + visión borrosa — preeclampsia por combinación", accion: "evaluar preeclampsia hoy — la cierra la VOZ del equipo", duenio: "la médica", estado: "pendiente", plazo: null, nacida: t0 - 15, cerrada: null },
        { id: uid(), pid: ivonne.id, tipo: 2, texto: "hemoglobina del tercer trimestre — repetir en el próximo control", accion: "repetir hemoglobina y comparar con la del trimestre", duenio: "recepción", estado: "pendiente", plazo: fechaMas(-1), nacida: t0 - 55, cerrada: null },
        { id: uid(), pid: brenda.id, tipo: 3, texto: "tamizaje de anemia del trimestre vencido", accion: "revisar y agendar la repetición", duenio: "recepción", estado: "pendiente", plazo: fechaMas(3), nacida: t0 - 47, cerrada: null },
        { id: uid(), pid: estela.id, tipo: 5, texto: "post-quirúrgica día 21 — vigilar signos de infección de herida", accion: "preguntar en la consulta de hoy", duenio: "la médica", estado: "pendiente", plazo: null, nacida: t0 - 28, cerrada: null }
      ],
      laboratorio: [
        { pid: ivonne.id, analito: "hemoglobina", valor: 11.2, fecha: hoyISO(), escritaTardio: false },
        { pid: maria.id, analito: "glucosa", valor: 96, fecha: hoyISO(), escritaTardio: false },
        { pid: maria.id, analito: "insulina", valor: 14, fecha: hoyISO(), escritaTardio: false }
      ],
      controles: [{ pid: maria.id, t: Date.now(), fecha: hoyISO(), peso: "74", pas: "118", pad: "74", au: "26", fcf: "145", presentacion: "Cefálica", proteinuria: "negativo", edema: "negativo", sintoma: "sin cambios", banderas: [] }],
      calculos: [],
      notas: [],
      entregados: [],
      citas: [
        { pid: p[16].id, fechaISO: hoyISO(), min: t0 + 15, motivo: "revisión de duelo obstétrico" },
        { pid: p[17].id, fechaISO: hoyISO(), min: t0 + 25, motivo: "revisión programada" }
      ],
      equipoFuera: false,
      respaldoTarde: false,
      traspasoImpreso: false
    };
  }

  function cargar() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) { S = JSON.parse(raw); if (S && S.version === 4) return S; }
    } catch (e) { }
    S = semilla();
    guardar();
    return S;
  }
  function guardar() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }
  function reiniciar() { S = semilla(); guardar(); }
  function estado() { return S; }

  function paciente(id) {
    for (var i = 0; i < S.pacientes.length; i++) if (S.pacientes[i].id === id) return S.pacientes[i];
    return null;
  }
  function porNombre(nom) {
    var t = String(nom || "").trim().toLowerCase();
    if (!t) return null;
    for (var i = 0; i < S.pacientes.length; i++) if (S.pacientes[i].nombre.toLowerCase().indexOf(t) === 0) return S.pacientes[i];
    return null;
  }
  function porAparecidas(texto) {
    var t = String(texto || "").trim().toLowerCase();
    if (t.length < 3) return [];
    var ap = t.split(",")[0];
    return S.pacientes.filter(function (p) {
      var n = p.nombre.toLowerCase();
      return n.indexOf(ap) >= 0 || t.indexOf(apellido(p.nombre).toLowerCase()) >= 0;
    });
  }
  function eventosDe(pid) { return S.eventos.filter(function (e) { return e.pid === pid; }); }
  function ultimoEventoSatisfactorio(pid, tipos) {
    var ult = null;
    eventosDe(pid).forEach(function (e) { if (tipos.indexOf(e.tipo) >= 0) ult = e; });
    return ult;
  }
  function estadoDe(pid) {
    var evs = eventosDe(pid);
    var est = "con_cita", duenio = null, desde = null, tipo = null;
    evs.forEach(function (e) {
      if (e.tipo === "no_llego") est = "no_llego";
      if (e.tipo === "llego") { est = "llego"; desde = e.min; }
      if (e.tipo === "visita_completa" || e.tipo === "registrada") { est = "espera"; desde = e.min; }
      if (e.tipo === "estacion_guardada") est = "estacion_hecha";
      if (e.tipo === "estacion_mitad") { est = "estacion_mitad"; duenio = e.duenio || "enfermería"; }
      if (e.tipo === "estacion_retomada") est = "espera";
      if (e.tipo === "en_atencion") {
        if (e.tipoAtencion === "urgencia") { est = "urgente"; duenio = e.duenio; desde = e.min; }
        else { est = "en_atencion"; duenio = e.duenio; tipo = e.tipoAtencion || "consulta"; desde = e.min; }
      }
      if (e.tipo === "pausada") { est = "pausada"; duenio = e.duenio; }
      if (e.tipo === "retomada") { est = "en_atencion"; }
      if (e.tipo === "urgencia") { est = "urgente"; duenio = e.duenio || "la médica"; }
      if (e.tipo === "urgencia_resuelta") {
        if (e.forma === "referida") est = "referida";
        else if (e.forma === "atendida") est = "atendida";
        else if (est === "urgente") est = "en_atencion";
        duenio = null;
      }
      if (e.tipo === "reagendada") { est = "con_cita"; duenio = "recepción"; }
      if (e.tipo === "falta_completar") { est = "falta_completar"; duenio = "quien captura (enfermería)"; }
      if (e.tipo === "ficha_completa") { est = "atendida"; duenio = null; }
      if (e.tipo === "parto") est = "parto";
      if (e.tipo === "atendida") { est = "atendida"; duenio = null; }
      if (e.tipo === "referida") { est = "referida"; duenio = null; }
    });
    var pac = paciente(pid);
    if (est === "con_cita" && pac && pac.cita != null && ahoraMin() > pac.cita + 45) est = "no_llego";
    if (est === "llego" && pac && pac.sinCita) est = "por_registrar";
    return { estado: est, duenio: duenio, desde: desde, tipo: tipo };
  }
  function esperaMin(pid) {
    var d = estadoDe(pid);
    if (d.estado === "espera" || d.estado === "llego" || d.estado === "estacion_hecha" || d.estado === "urgente" || d.estado === "por_registrar") {
      var ev = ultimoEventoSatisfactorio(pid, ["llego", "registrada", "visita_completa"]);
      if (ev) return Math.max(0, ahoraMin() - ev.min);
    }
    return null;
  }
  function agregarEvento(tipo, pid, extra) {
    var e = { t: S.eventos.length, tipo: tipo, pid: pid, min: ahoraMin() };
    if (extra) for (var k in extra) if (k !== "tipo" && k !== "pid" && k !== "t" && k !== "min") e[k] = extra[k];
    S.eventos.push(e);
    guardar();
    return e;
  }
  function banderaInfo(id) {
    for (var i = 0; i < BANDERAS.length; i++) if (BANDERAS[i].id === id) return BANDERAS[i];
    return null;
  }

  /* ——— Alertas: los seis tipos, cierre firmado (B-013), dedupe solo pendiente ——— */
  function nacerAlerta(pid, tipo, texto, accion, duenio, plazo) {
    for (var i = 0; i < S.alertas.length; i++) {
      var a = S.alertas[i];
      if (a.pid === pid && a.texto === texto && a.estado === "pendiente") return a;
    }
    if (tipo === 2 && !plazo) plazo = fechaMas(7);
    var nueva = {
      id: uid(), pid: pid, tipo: tipo, texto: texto, accion: accion,
      duenio: duenio || "a quien atiende", plazo: plazo || null,
      estado: "pendiente", nacida: ahoraMin(), cerrada: null, quien: null, cedula: null, cierre: null, anclada: null
    };
    S.alertas.push(nueva);
    agregarEvento("alerta_nacida", pid, { alertaId: nueva.id, tipo: tipo });
    if (tipo === 4) {
      var pac = paciente(pid);
      if (pac && estadoDe(pid).estado !== "atendida") {
        if (!pac.marcador || pac.marcador !== "urgente") pac.marcador = "urgente";
        agregarEvento("urgencia", pid, { motivo: texto, duenio: duenio || "la médica", automatica: true });
        guardar();
      }
    }
    return nueva;
  }
  function cerrarAlerta(id, forma, quien, cedula, anclaNota) {
    var al = null;
    for (var i = 0; i < S.alertas.length; i++) if (S.alertas[i].id === id) al = S.alertas[i];
    if (!al) return { ok: false, mensaje: "Ese aviso no existe." };
    if (al.estado !== "pendiente") return { ok: false, mensaje: "Ya no está pendiente: solo se cierra una vez." };
    if (forma === "anclada") {
      if (!anclaNota) return { ok: false, mensaje: "El cierre anclado necesita la nota firmada que lo resuelve." };
      al.quien = anclaNota.autor; al.cedula = anclaNota.cedula; al.anclada = anclaNota.id;
    } else {
      if (!quien || !String(quien).trim() || !cedula || !String(cedula).trim())
        return { ok: false, mensaje: "Falta su nombre y cédula: el aviso no se cierra a ciegas — quien responde queda con nombre y número." };
      al.quien = String(quien).trim(); al.cedula = String(cedula).trim(); al.anclada = null;
    }
    al.estado = "atendida";
    al.cierre = forma;
    al.cerrada = ahoraMin();
    guardar();
    agregarEvento("alerta_cerrada", al.pid, { alertaId: al.id, forma: forma });
    return { ok: true, alerta: al };
  }
  function alertasDe(pid) {
    var lista = S.alertas.filter(function (a) { return a.pid === pid; });
    var orden = { 4: 0, 3: 1, 6: 2, 2: 3, 5: 4, 1: 5 };
    var pend = lista.filter(function (a) { return a.estado === "pendiente"; })
      .sort(function (x, y) { return (orden[x.tipo] || 0) - (orden[y.tipo] || 0) || x.nacida - y.nacida; });
    var cerr = lista.filter(function (a) { return a.estado !== "pendiente"; });
    return pend.concat(cerr);
  }
  function alertasPendientes() {
    var orden = { 4: 0, 3: 1, 6: 2, 2: 3, 5: 4, 1: 5 };
    return S.alertas.filter(function (a) { return a.estado === "pendiente"; })
      .sort(function (x, y) { return (orden[x.tipo] || 0) - (orden[y.tipo] || 0) || x.nacida - y.nacida; });
  }
  function vencida(a) { return !!(a.plazo && a.plazo < hoyISO()); }
  function metricaFatiga() {
    var hoy = S.alertas.filter(function (a) { return a.tipo !== 5; });
    var visitas = (S.controles.length + S.notas.length) || 1;
    var media = Math.round((hoy.length / visitas) * 10) / 10;
    return { avisos: hoy.length, visitas: visitas, media: media, meta: 2 };
  }

  /* ——— Laboratorio y semáforo (DEC-27: informa, nunca dictamina) ——— */
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
    var T = CATALOGO.TA;
    if (!pas && !pad) return { nivel: "sin_dato", texto: "sin dato" };
    if ((pas && pas >= T.critica.pas) || (pad && pad >= T.critica.pad)) return { nivel: "critica", texto: T.critica.texto };
    if ((pas && pas >= T.alerta.pas) || (pad && pad >= T.alerta.pad)) return { nivel: "alerta", texto: T.alerta.texto };
    if (pas && pad && (pas < 90 || pad < 60)) return { nivel: "alerta", texto: T.baja.texto };
    if (pas && pad) return { nivel: "normal", texto: "tensión en rango" };
    return { nivel: "sin_dato", texto: "sin dato" };
  }
  function labDe(pid) { return S.laboratorio.filter(function (l) { return l.pid === pid; }); }
  function evaluarBandaHoma(v) {
    var r = CATALOGO.HOMA;
    for (var i = 0; i < r.bandas.length; i++) {
      var b = r.bandas[i];
      if (b.invertido) { if (v <= b.max) return { nivel: b.nivel, texto: b.texto || r.normalTexto }; }
      else if (v <= b.max) return { nivel: b.nivel, texto: b.texto || r.normalTexto };
    }
    return { nivel: r.fuera, texto: r.fueraTexto };
  }
  function homa(glucosa, insulina) {
    var v = Math.round((glucosa * insulina / 405) * 100) / 100;
    var r = evaluarBandaHoma(v);
    return { valor: v, nivel: r.nivel, texto: r.texto };
  }
  function capturarLab(pid, analito, valor, fecha) {
    var v = parseFloat(valor);
    if (! LAB_RANGOS[analito]) return { ok: false, mensaje: "Ese analito no está en el catálogo firmado: sin catálogo no se señala." };
    if (isNaN(v)) return { ok: false, mensaje: "Falta el valor del papel: son los tres datos, en treinta segundos." };
    var f = fecha || hoyISO();
    var tardio = f < hoyISO();
    S.laboratorio.push({ pid: pid, analito: analito, valor: v, fecha: f, escritaTardio: tardio });
    guardar();
    agregarEvento("resultado_capturado", pid, { analito: analito, valor: v });
    var b = evaluarBandaLab(analito, v);
    var creada = null;
    if (b.nivel === "critica")
      creada = nacerAlerta(pid, 4, LAB_RANGOS[analito].nombre + " " + v + " — " + b.texto, "avisar a la médica ahora y no dejar pasar", "la médica");
    else if (b.nivel === "alerta")
      creada = nacerAlerta(pid, 3, LAB_RANGOS[analito].nombre + " " + v + " — " + b.texto, "anotar en la nota y comparar con el próximo control", "la médica");
    return { ok: true, banda: b, tardio: tardio, alerta: creada };
  }

  /* ——— Control prenatal: R-14 (10 campos, 9 banderas), guardar nunca bloquea ——— */
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
      if (bta.nivel !== "sin_dato") chips.push({ texto: "TA " + c.pas + "/" + c.pad + " — " + bta.texto, nivel: bta.nivel });
      if (c.proteinuria && c.proteinuria !== "negativo" && c.proteinuria !== "trazas")
        chips.push({ texto: "proteinuria " + c.proteinuria + " — anotar en banderas", nivel: "alerta" });
      if (c.fcf) {
        var f = parseInt(c.fcf, 10);
        if (f < CATALOGO.FCF.min || f > CATALOGO.FCF.max) chips.push({ texto: "FCF " + f + " — por fuera del rango " + CATALOGO.FCF.min + "–" + CATALOGO.FCF.max, nivel: "alerta" });
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
  function guardarControl(pid, b, marcadas) {
    if (!b.peso && !b.pas && !b.pad && !b.au && !b.fcf)
      return { ok: false, mensaje: "Capture al menos peso o tensión para que el control valga la pena." };
    S.controles.push({
      pid: pid, t: Date.now(), fecha: b.fecha || hoyISO(), peso: b.peso, pas: b.pas, pad: b.pad,
      au: b.au, fcf: b.fcf, presentacion: b.pres, proteinuria: b.prot, edema: b.edema, sintoma: b.sint,
      banderas: marcadas || []
    });
    agregarEvento("estacion_guardada", pid, {});
    var avisos = [];
    var bt = bandaTA(parseInt(b.pas, 10), parseInt(b.pad, 10));
    if (bt.nivel === "normal") avisos.push({ nivel: "normal", html: "Tensión " + b.pas + "/" + b.pad + " — <b>en rango</b>.", accion: "" });
    if (bt.nivel === "alerta" || bt.nivel === "critica") {
      nacerAlerta(pid, bt.nivel === "critica" ? 4 : 3, "tensión " + b.pas + "/" + b.pad + " — " + bt.texto,
        bt.nivel === "critica" ? "evaluar hoy, no dejar salir sin valorar" : "repetir tensión y anotar en la nota", "la médica");
      avisos.push({
        nivel: bt.nivel, html: "Tensión " + b.pas + "/" + b.pad + " — " + bt.texto,
        accion: bt.nivel === "critica" ? "Acción: evaluar hoy — el aviso ya subió al frente y a Pendientes." : "Acción: repetir en unos minutos y anotar."
      });
    }
    var triada = ["cefalea", "vision", "hinchazon"].every(function (x) { return marcadas.indexOf(x) >= 0; });
    if (triada) {
      nacerAlerta(pid, 4, "cefalea + visión borrosa + hinchazón — tríada de preeclampsia", "evaluar preeclampsia hoy", "la médica");
      avisos.push({ nivel: "critica", html: "Las tres banderas juntas encienden el aviso más serio del sistema.", accion: "Acción: avisar a la médica de VOZ — la urgencia se cierra en la sala." });
    } else {
      marcadas.forEach(function (idb) {
        var info = banderaInfo(idb);
        if (!info) return;
        nacerAlerta(pid, 3, "bandera: " + info.nombre, "valorar en la consulta de hoy y anotar en la nota", "la médica");
        avisos.push({ nivel: "alerta", html: "Bandera: " + info.nombre + ".", accion: "Acción: valorar en la consulta y anotar en la nota." });
      });
    }
    if (!avisos.length) avisos.push({ nivel: "normal", html: "Control registrado completo. Sin banderas ni tensiones fuera de rango.", accion: "" });
    guardar();
    return { ok: true, avisos: avisos, chips: resolverChips(pid) };
  }

  /* ——— Próximo control derivado del catálogo (R-41: lo derivable nunca se captura) ——— */
  function proximaFechaControl(p) {
    var C = CATALOGO.CONTROL;
    var c = (p.caso || "").toLowerCase();
    var dias = C.base;
    if (c.indexOf("infección") >= 0 || c.indexOf("infeccion") >= 0) dias = C.infeccion;
    else if (c.indexOf("puerperio") >= 0) dias = C.puerperio;
    else if (c.indexOf("fertilidad") >= 0) dias = C.fertilidad;
    else if (p.eg && p.eg >= C.egTardiaDesde) dias = C.egTardia;
    return { fecha: fechaMas(dias), dias: dias };
  }

  /* ——— Atenciones concurrentes: dueño, pausa con retorno, toma por emergencia ——— */
  function atencionAbiertaDe(pid) {
    var r = null;
    S.atenciones.forEach(function (a) { if (a.pid === pid && a.abierta) r = a; });
    return r;
  }
  function abrirAtencion(pid, tipo, duenio) {
    if (TIPOS_ATENCION[tipo] && TIPOS_ATENCION[tipo].abrible === false)
      return { ok: false, mensaje: "La urgencia no se abre aquí: se declara en su pantalla (voz del equipo → sistema), con su aviso tipo 4." };
    var ya = atencionAbiertaDe(pid);
    if (ya) return { ok: false, mensaje: "Esa paciente ya tiene una atención abierta — retómensela desde Atenciones." };
    var a = { id: uid(), pid: pid, tipo: tipo, abierta: true, pausada: false, duenio: duenio || (TIPOS_ATENCION[tipo] ? TIPOS_ATENCION[tipo].duenio : "equipo"), borrador: null, abiertaEn: ahoraMin(), pausadaEn: null };
    S.atenciones.push(a);
    if (tipo === "consulta") agregarEvento("en_atencion", pid, { tipoAtencion: "consulta", duenio: a.duenio });
    guardar();
    return { ok: true, atencion: a };
  }
  function registrarTraspasoImpreso() {
    S.traspasoImpreso = true;
    agregarEvento("traspaso", null, {});
    guardar();
    return true;
  }
  function marcarRespaldo() {
    S.respaldoTarde = true;
    agregarEvento("respaldo_ensayado", null, {});
    guardar();
    return true;
  }

  function alternarEquipo() {
    S.equipoFuera = !S.equipoFuera;
    agregarEvento("equipo_estado", null, { fuera: S.equipoFuera });
    guardar();
    return S.equipoFuera;
  }

  function pausarAtencion(id, borrador) {
    var a = null;
    S.atenciones.forEach(function (x) { if (x.id === id) a = x; });
    if (!a) return { ok: false, mensaje: "No se encontró la atención." };
    a.pausada = true;
    a.pausadaEn = ahoraMin();
    if (borrador) a.borrador = borrador;
    if (a.tipo === "estacion") agregarEvento("estacion_mitad", a.pid, { borrador: borrador || a.borrador, duenio: a.duenio });
    else agregarEvento("pausada", a.pid, { duenio: a.duenio, borrador: borrador || a.borrador });
    guardar();
    return { ok: true };
  }
  function retomarAtencion(id) {
    var a = null;
    S.atenciones.forEach(function (x) { if (x.id === id) a = x; });
    if (!a) return { ok: false, mensaje: "No se encontró la pausa." };
    a.pausada = false;
    a.pausadaEn = null;
    agregarEvento(a.tipo === "estacion" ? "estacion_retomada" : "retomada", a.pid, {});
    guardar();
    return { ok: true, atencion: a };
  }
  function tomarPorEmergencia(id, por) {
    var a = null;
    S.atenciones.forEach(function (x) { if (x.id === id) a = x; });
    if (!a) return { ok: false, mensaje: "No se encontró la atención." };
    var antes = a.duenio;
    a.duenio = "emergencia — tomada por " + (por || "enfermería");
    agregarEvento("atencion_tomada", a.pid, { antes: antes, ahora: a.duenio });
    guardar();
    return { ok: true, antes: antes };
  }
  /* ——— Conciliación (M1): la lista se DEDUCE de hechos + objetos, y la
     divergencia se muestra con su reparación, nunca se esconde.
     Reglas (C16): en_atencion/pausada/estacion_mitad EXIGEN objeto de atención;
     urgente NO (nace del aviso tipo 4 y su atención es opcional).
     Huérfano: objeto abierto con estado terminal del paciente. ——— */
  var ESTADOS_CON_ATENCION = ["en_atencion", "pausada", "estacion_mitad"];
  var ESTADOS_URGENTES = ["urgente"];
  var ESTADOS_FINALES = ["atendida", "referida", "no_llego", "con_cita", "falta_completar", "parto"];
  function conciliarAtenciones() {
    var filas = [], vistos = {}, divergencias = [];
    function filaPara(pid, a) {
      var d = estadoDe(pid);
      var tipo = a ? a.tipo : (d.estado === "estacion_mitad" ? "estacion" : d.estado === "urgente" ? "urgencia" : "consulta");
      var pausada = a ? a.pausada : (d.estado === "pausada" || d.estado === "estacion_mitad");
      var abiertoEn = a ? a.abiertaEn : null;
      if (abiertoEn == null) {
        var ev0 = ultimoEventoSatisfactorio(pid, ["en_atencion", "estacion_mitad", "urgencia"]);
        abiertoEn = ev0 ? ev0.min : null;
      }
      var pausadaEn = a ? (a.pausadaEn != null ? a.pausadaEn : null) : null;
      if (pausada && pausadaEn == null) {
        var evP = ultimoEventoSatisfactorio(pid, ["estacion_mitad", "pausada"]);
        pausadaEn = evP ? evP.min : null;
      }
      return {
        pid: pid, tipo: tipo, conObjeto: !!a, atencionId: a ? a.id : null,
        duenio: a ? a.duenio : (d.duenio || "—"), estado: d.estado, pausada: pausada,
        abiertaEn: abiertoEn, pausadaEn: pausadaEn,
        borrador: a && a.borrador ? a.borrador : borradorEstacionDe(pid),
        divergencia: null
      };
    }
    S.atenciones.forEach(function (a) {
      if (!a.abierta) return;
      vistos[a.pid] = true;
      var d = estadoDe(a.pid).estado;
      if (ESTADOS_FINALES.indexOf(d) >= 0) {
        var f0 = filaPara(a.pid, a);
        f0.divergencia = "huérfano";
        filas.push(f0);
        divergencias.push({ pid: a.pid, tipo: "huérfano", detalle: "atención abierta pero el paciente quedó '" + d + "'" });
      } else {
        filas.push(filaPara(a.pid, a));
      }
    });
    S.pacientes.forEach(function (p) {
      if (vistos[p.id]) return;
      var d = estadoDe(p.id).estado;
      if (ESTADOS_CON_ATENCION.indexOf(d) >= 0 || ESTADOS_URGENTES.indexOf(d) >= 0) {
        var f1 = filaPara(p.id, null);
        if (ESTADOS_CON_ATENCION.indexOf(d) >= 0) {
          f1.divergencia = "sin_objeto";
          divergencias.push({ pid: p.id, tipo: "sin_objeto", detalle: "estado '" + d + "' sin objeto de atención" });
        }
        filas.push(f1);
      }
    });
    return { filas: filas, divergencias: divergencias };
  }
  function repararAtencion(pid) {
    var a = atencionAbiertaDe(pid);
    var d = estadoDe(pid).estado;
    if (a && ESTADOS_FINALES.indexOf(d) >= 0) {
      a.abierta = false; a.pausada = false; a.pausadaEn = null;
      agregarEvento("atencion_cerrada", pid, { motivo: "conciliación: el paciente ya quedó '" + d + "'" });
      return { ok: true, accion: "cerrada" };
    }
    if (!a && ESTADOS_CON_ATENCION.indexOf(d) >= 0) {
      var tipo = d === "estacion_mitad" ? "estacion" : "consulta";
      var d0 = estadoDe(pid);
      var ev0 = ultimoEventoSatisfactorio(pid, ["en_atencion", "estacion_mitad"]);
      var evP = ultimoEventoSatisfactorio(pid, ["estacion_mitad", "pausada"]);
      var nueva = {
        id: uid(), pid: pid, tipo: tipo, abierta: true,
        pausada: (d === "pausada" || d === "estacion_mitad"),
        duenio: d0.duenio || (TIPOS_ATENCION[tipo] ? TIPOS_ATENCION[tipo].duenio : "equipo"),
        borrador: borradorEstacionDe(pid),
        abiertaEn: ev0 ? ev0.min : ahoraMin(),
        pausadaEn: (d === "pausada" || d === "estacion_mitad") && evP ? evP.min : null
      };
      S.atenciones.push(nueva);
      agregarEvento("atencion_sincronizada", pid, { tipo: tipo, motivo: "conciliación: se creó el objeto que faltaba" });
      guardar();
      return { ok: true, accion: "creada", atencion: nueva };
    }
    return { ok: false, mensaje: "No hay nada que sincronizar para esa paciente." };
  }
  function metricaAtenciones() {
    var c = conciliarAtenciones();
    var conObjeto = c.filas.filter(function (f) { return f.conObjeto; });
    var pausadas = conObjeto.filter(function (f) { return f.pausada; });
    var mins = [], minsP = [];
    conObjeto.forEach(function (f) {
      if (f.abiertaEn != null) mins.push(Math.max(0, ahoraMin() - f.abiertaEn));
      if (f.pausada && f.pausadaEn != null) minsP.push(Math.max(0, ahoraMin() - f.pausadaEn));
    });
    function media(arr) { return arr.length ? Math.round(arr.reduce(function (x, y) { return x + y; }, 0) / arr.length) : null; }
    var tomas = S.eventos.filter(function (e) { return e.tipo === "atencion_tomada"; }).length;
    return {
      abiertas: conObjeto.length, pausadas: pausadas.length,
      urgentes: c.filas.filter(function (f) { return f.estado === "urgente"; }).length,
      divergencias: c.divergencias.length,
      minutosMedioAbierto: media(mins), minutosMedioPausada: media(minsP),
      tomas: tomas
    };
  }

  /* C1 (consideración de la implementación): solo borradores de ESTACIÓN. El borrador
     de consulta vive en su atención tipo consulta / evento pausada y jamás debe volcarse
     a los campos de constantes. */
  function borradorEstacionDe(pid) {
    var a = atencionAbiertaDe(pid);
    if (a && a.borrador && a.tipo === "estacion") return a.borrador;
    var ev = null;
    eventosDe(pid).forEach(function (e) { if (e.tipo === "estacion_mitad" && e.borrador) ev = e; });
    return ev ? ev.borrador : null;
  }

  /* ——— Consulta: nota firmada, cierre anclado (RB-05), próx control ——— */
  function empezarConsulta(pid) {
    var ya = atencionAbiertaDe(pid);
    if (ya && ya.tipo === "consulta") {
      if (ya.pausada) return retomarAtencion(ya.id);
      return { ok: true, nota: "La atención ya estaba abierta." };
    }
    if (ya) return { ok: false, mensaje: "Tiene una estación abierta: ciérrela o pásela a consulta desde Atenciones." };
    return abrirAtencion(pid, "consulta", "la médica");
  }
  function cerrarConsulta(pid, datos) {
    if (!datos.texto || !datos.texto.trim()) return { ok: false, mensaje: "La nota necesita su evolución — aunque sea una línea." };
    if (!datos.autor || !datos.autor.trim() || !datos.cedula || !String(datos.cedula).trim())
      return { ok: false, mensaje: "Falta quien firma: nombre y cédula. La nota sin firma no cierra nada." };
    var nota = {
      id: uid(), pid: pid, tipo: datos.tipo || "Evolución", texto: datos.texto.trim(),
      autor: datos.autor.trim(), cedula: String(datos.cedula).trim(),
      fecha: hoyISO(), hora: hm(ahoraMin())
    };
    S.notas.unshift(nota);
    agregarEvento("nota_firmada", pid, { tipo: nota.tipo, notaId: nota.id });
    var cerradas = [];
    (datos.cerrarIds || []).forEach(function (id) {
      var r = cerrarAlerta(id, "anclada", null, null, nota);
      if (r.ok) cerradas.push(id);
    });
    var a = atencionAbiertaDe(pid);
    if (a && a.tipo === "consulta") { a.abierta = false; a.borrador = null; }
    var urgencias = S.alertas.filter(function (x) { return x.pid === pid && x.estado === "pendiente" && x.tipo === 4; });
    if (urgencias.length) {
      guardar();
      return { ok: true, nota: nota, cerradas: cerradas, estadoPendiente: true, quedanUrgencias: urgencias.length, proxima: proximaFechaControl(paciente(pid)) };
    }
    agregarEvento("atendida", pid, { via: "consulta" });
    guardar();
    return { ok: true, nota: nota, cerradas: cerradas, estadoPendiente: false, proxima: proximaFechaControl(paciente(pid)) };
  }
  function resolverUrgencia(alertaId, forma, quien, cedula) {
    var al = null;
    S.alertas.forEach(function (x) { if (x.id === alertaId) al = x; });
    if (!al) return { ok: false, mensaje: "Ese aviso no existe." };
    var r = cerrarAlerta(alertaId, forma === "referida" ? "referida" : forma === "motivo" ? "motivo" : "atendida", quien, cedula, null);
    if (!r.ok) return r;
    var p = paciente(al.pid);
    if (p) {
      delete p.marcador;
      if (forma === "referida") agregarEvento("urgencia_resuelta", al.pid, { forma: "referida" });
      else if (forma === "atendida") agregarEvento("urgencia_resuelta", al.pid, { forma: "atendida" });
      else agregarEvento("urgencia_resuelta", al.pid, { forma: "motivo" });
      /* La urgencia resuelta o referida termina SU atención; «motivo» deja la atención
         viva (la atención continúa, solo se cierra el aviso). */
      if (forma !== "motivo") {
        var at = atencionAbiertaDe(al.pid);
        if (at && at.tipo === "urgencia") {
          at.abierta = false; at.pausada = false; at.pausadaEn = null;
          agregarEvento("atencion_cerrada", al.pid, { motivo: "urgencia resuelta: " + forma });
        }
      }
      guardar();
    }
    return { ok: true };
  }

  /* ——— Prescripción: R-37 — informa, nunca bloquea; nombra el riesgo y registra lo forzado ——— */
  function verificarPrescripcion(pid, droga) {
    var p = paciente(pid);
    if (!p) return { ok: false, mensaje: "Sin paciente en contexto." };
    var d = String(droga || "").trim().toLowerCase();
    if (!d) return { ok: false, mensaje: "Escriba el medicamento." };
    var choques = [];
    (p.alergias || []).forEach(function (al) {
      var a = String(al).toLowerCase();
      if (d.indexOf(a.slice(0, 5)) >= 0 || (a === "penicilina" && (d.indexOf("amoxicilina") >= 0 || d.indexOf("ampicilina") >= 0 || d.indexOf("penicilina") >= 0)))
        choques.push("alergia registrada: " + al);
    });
    CATALOGO.INTERACCIONES.forEach(function (i) {
      if (d.indexOf(i.droga) >= 0) {
        i.chocaCon.forEach(function (c) {
          if (c.indexOf("alergia:") === 0 && (p.alergias || []).indexOf(c.split(":")[1]) >= 0) choques.push(i.aviso);
          if (c.indexOf("med:") === 0 && String(p.medicacion).toLowerCase().indexOf(c.split(":")[1]) >= 0) choques.push(i.aviso);
        });
      }
    });
    return { ok: true, choques: choques };
  }
  function registrarPrescripcion(pid, droga, forzada) {
    var v = verificarPrescripcion(pid, droga);
    if (!v.ok) return v;
    if (v.choques.length && !forzada) return { ok: true, requiereConfirmacion: true, choques: v.choques };
    if (v.choques.length && forzada) {
      nacerAlerta(pid, 6, "prescripción registrada pese al riesgo: " + v.choques.join(" · "), "revisar antes de surtir", "la médica");
    }
    guardar();
    agregarEvento("prescripcion", pid, { droga: droga, forzada: !!forzada, riesgo: v.choques.join(" · ") });
    return { ok: true, choques: v.choques, forzada: !!forzada };
  }

  /* ——— Agenda y recordatorios: DEC-32/33 — el software prepara, la persona entrega ——— */
  function crearCita(pid, fecha, motivo) {
    var f = fecha || hoyISO();
    var c = { pid: pid, fechaISO: f, min: ahoraMin(), motivo: motivo || "cita creada" };
    S.citas.push(c);
    var p = paciente(pid);
    if (p) p.cita = (f === hoyISO() ? ahoraMin() + 30 : p.cita);
    agregarEvento("cita_creada", pid, { fecha: f, motivo: c.motivo });
    guardar();
    return { ok: true, cita: c };
  }
  function reagendar(pid) {
    var p = paciente(pid);
    if (!p) return { ok: false, mensaje: "No aparece esa paciente." };
    var min = ahoraMin() + 30;
    p.cita = min;
    p.sinCita = false;
    agregarEvento("reagendada", pid, { min: min });
    crearCita(pid, hoyISO(), "reagendada desde no llegó");
    return { ok: true, min: min };
  }
  function recordatorios() {
    var out = [];
    alertasPendientes().forEach(function (a) {
      if (!a.plazo) return;
      var p = paciente(a.pid);
      if (!p) return;
      out.push({
        rid: "a:" + a.id, pid: a.pid, situacion: a.texto,
        plantilla: "Hola " + nombrePropio(p.nombre) + ", es el consultorio: toca " + a.accion + ". Cite en recepción — le esperamos.",
        fecha: a.plazo, entregado: S.entregados.indexOf("a:" + a.id) >= 0
      });
    });
    S.pacientes.forEach(function (p) {
      if (estadoDe(p.id).estado !== "atendida") return;
      if (!p.eg && p.caso.toLowerCase().indexOf("embarazo") < 0 && p.caso.toLowerCase().indexOf("fertilidad") < 0 && p.caso.toLowerCase().indexOf("infección") < 0 && p.caso.toLowerCase().indexOf("puerperio") < 0) return;
      var f = proximaFechaControl(p);
      var rid = "c:" + p.id;
      out.push({
        rid: rid, pid: p.id, situacion: "próximo control derivado del protocolo",
        plantilla: "Hola " + nombrePropio(p.nombre) + ", su próximo control es el " + fechaLarga(f.fecha) + ". Si nota cefalea intensa, visión borrosa o hinchazón súbita, acuda antes.",
        fecha: f.fecha, entregado: S.entregados.indexOf(rid) >= 0
      });
    });
    return out;
  }
  function entregarRecordatorio(rid) { if (S.entregados.indexOf(rid) < 0) { S.entregados.push(rid); guardar(); } }
  function anularRecordatorio(rid) { var i = S.entregados.indexOf(rid); if (i >= 0) { S.entregados.splice(i, 1); guardar(); } }
  function porRecuperar() {
    return S.pacientes.filter(function (p) {
      var c = (p.caso || "").toLowerCase();
      if (c.indexOf("embarazo") < 0 && c.indexOf("fertilidad") < 0 && c.indexOf("infección") < 0 && c.indexOf("puerperio") < 0) return false;
      if (estadoDe(p.id).estado !== "atendida") return false;
      var hoy = hoyISO();
      var tieneCita = S.citas.some(function (a) { return a.pid === p.id && a.fechaISO >= hoy; });
      return !tieneCita;
    });
  }

  /* ——— Cierre y traspaso (FL-15) ——— */
  function cierreData() {
    var atendidas = [], referidas = [], noLlegaron = [], mitad = [], incompletas = [], enCurso = [], esperan = [], conCita = [];
    S.pacientes.forEach(function (p) {
      var d = estadoDe(p.id).estado;
      if (d === "atendida" || d === "parto") atendidas.push(p);
      else if (d === "referida") referidas.push(p);
      else if (d === "no_llego") noLlegaron.push(p);
      else if (d === "estacion_mitad") mitad.push(p);
      else if (d === "falta_completar") incompletas.push(p);
      else if (d === "en_atencion" || d === "urgente" || d === "pausada") enCurso.push(p);
      else if (d === "con_cita") conCita.push(p);
      else esperan.push(p);
    });
    return {
      atendidas: atendidas, referidas: referidas, noLlegaron: noLlegaron, mitad: mitad,
      incompletas: incompletas, enCurso: enCurso, esperan: esperan, conCita: conCita,
      avisos: alertasPendientes()
    };
  }
  function traspasoHTML() {
    var d = cierreData();
    var h = "";
    function bloque(titulo, lista, extra) {
      if (!lista.length) return;
      h += "<h3>" + titulo + " (" + lista.length + ")</h3>";
      lista.forEach(function (p) { h += "<div>· <b>" + esc(p.nombre) + "</b> — " + esc(p.caso) + (extra ? " — " + extra(p) : "") + "</div>"; });
    }
    bloque("Atendidas", d.atendidas);
    bloque("Referidas", d.referidas, function () { return "fuera de este centro — con su nota"; });
    bloque("Quedaron esperando", d.esperan, function () { return "decidir: atender o reagendar"; });
    bloque("En atención al cierre", d.enCurso, function (p) { return "dueño: " + (estadoDe(p.id).duenio || "quien la abrió"); });
    bloque("Estación a mitad", d.mitad, function () { return "todo conservado — dueño: enfermería"; });
    bloque("Falta completar ficha", d.incompletas, function () { return "dueño: quien captura — plazo: antes de apagar"; });
    bloque("No llegaron", d.noLlegaron, function () { return "reagendar mañana"; });
    bloque("Con cita después", d.conCita);
    if (d.avisos.length) {
      h += "<h3>Avisos sin atender (" + d.avisos.length + ")</h3>";
      d.avisos.forEach(function (a) {
        h += "<div>· " + esc(Jornada.nombrePac(a.pid)) + " — " + esc(a.texto) + " (dueño: " + esc(a.duenio) + (vencida(a) ? " · VENCIDO" : "") + ")</div>";
      });
    }
    var rec = recordatorios().filter(function (r) { return !r.entregado; });
    if (rec.length) {
      h += "<h3>Recordatorios sin entregar (" + rec.length + ")</h3>";
      rec.forEach(function (r) {
        h += "<div>· " + esc(Jornada.nombrePac(r.pid)) + " — " + esc(r.situacion) + " — fecha: " + r.fecha + (r.fecha < hoyISO() ? " (ESCALADO)" : "") + "</div>";
      });
    }
    h += "<h3>Respaldo de la tarde</h3><div>· " + (S.respaldoTarde ? "Ensayado y verificado — el parque vivo quedó intacto" : "PENDIENTE — ensayar antes de apagar (pantalla Fallas)") + "</div>";
    return h;
  }

  /* ——— UI ——— */
  function toast(msg) {
    var viejo = document.querySelector(".toast");
    if (viejo) viejo.remove();
    var t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { if (t.parentNode) t.remove(); }, 3800);
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
    if (el) el.textContent = diaLargo().replace(/^./, function (c) { return c.toUpperCase(); }) + " · " + hm(ahoraMin()) + (S.equipoFuera ? " · EQUIPO FUERA" : "");
  }
  function nav(actual) {
    var riel = (typeof RIEL !== "undefined") ? RIEL : [];
    var html = "";
    riel.forEach(function (it) {
      if (it[0] === "grupo") { html += "<div class='grupo'>" + it[1] + "</div>"; return; }
      html += "<a href='" + it[2] + "' class='" + (it[1] === actual ? "activo" : "") + "'>" + it[1] +
        (it[3] ? " <span class='cuenta' id='cuenta-pend'>–</span>" : "") + "</a>";
    });
    html += "<div class='grupo'>Utilidad</div><a href='CUMPLIMIENTO.html'" + (actual === "Cumplimiento" ? " class='activo'" : "") + ">Cumplimiento</a><a href='HOJA-DE-VEREDICTO.html'" + (actual === "Hoja" ? " class='activo'" : "") + ">Hoja de veredicto</a>";
    var lat = document.querySelector(".lateral");
    if (lat) lat.innerHTML = html;
    var n = alertasPendientes().length;
    var c = document.getElementById("cuenta-pend");
    if (c) { c.textContent = String(n); c.className = n ? "cuenta" : "cuenta cero"; }
    montarMenuContexto();
    pintarRelojBarra();
  }
  function montarMenuContexto() {
    var barra = document.querySelector(".barra");
    if (!barra || document.getElementById("menu-ctx")) return;
    var ctx = leerContexto();
    var menu = document.createElement("div");
    menu.className = "menu-ctx";
    menu.id = "menu-ctx";
    var items = (typeof CONTEXTO !== "undefined") ? CONTEXTO : [];
    menu.innerHTML = "<div class='tit'>Paciente en contexto</div>" +
      (ctx ? "" : "<div class='vacio' style='padding:6px 10px'>Elija una desde Hoy</div>") +
      items.map(function (it) { return "<a href='" + it[2] + "'>" + it[1] + "</a>"; }).join("");
    barra.appendChild(menu);
    var gatillo = document.getElementById("contexto-gatillo");
    if (gatillo) {
      gatillo.addEventListener("click", function (ev) { ev.stopPropagation(); menu.classList.toggle("abierto"); });
      document.addEventListener("click", function () { menu.classList.remove("abierto"); });
    }
  }
  function leerContexto() {
    var q = null;
    try { q = new URLSearchParams(location.search).get("p"); } catch (e) { }
    if (q) { try { localStorage.setItem("ctx_" + KEY, q); } catch (e) { } return q; }
    try { return localStorage.getItem("ctx_" + KEY); } catch (e) { return null; }
  }
  function exigirContexto() {
    var c = leerContexto();
    if (!c || !paciente(c)) {
      toast("Primero elija a la paciente: haga clic en su tarjeta desde Hoy.");
      return null;
    }
    return c;
  }
  function irA(pagina, pid) { location.href = pagina + (pid ? "?p=" + pid : ""); }
  function pintarContexto() {
    var el = document.getElementById("contexto-gatillo");
    if (!el) return;
    var c = leerContexto();
    var p = c ? paciente(c) : null;
    if (p) {
      el.className = "";
      el.innerHTML = "En contexto: <b>" + esc(p.nombre) + "</b> — clic para su ficha";
    } else {
      el.className = "vacio";
      el.textContent = "Sin paciente en contexto — elija una desde Hoy";
    }
  }
  function bandaVeredicto(id, pregunta) {
    var guardada = null;
    try { guardada = localStorage.getItem("ver_" + KEY + "_" + id); } catch (e) { }
    var val = guardada ? JSON.parse(guardada) : { opcion: "", nota: "" };
    var opciones = ["Así está bien, lo apruebo", "Así está bien, pero con cambios", "Esto no sirve así, hay que rediseñarlo"];
    var html = "<div class='banda'><span class='rotulo'>PREGUNTA PARA EL EQUIPO — conteste aquí o en la hoja de veredicto</span>" + pregunta +
      "<div class='veredicto'><b>Veredicto:</b>";
    opciones.forEach(function (o, i) {
      html += "<label><input type='radio' name='ver' value='" + i + "' " + (val.opcion === String(i) ? "checked" : "") + "> " + o + "</label>";
    });
    html += "</div><div class='campo'><label>Sus cambios (opcional)</label><textarea id='ver-nota' rows='2' style='max-width:640px'>" + (esc(val.nota) || "") + "</textarea></div>" +
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
      try { localStorage.setItem("ver_" + KEY + "_" + id, JSON.stringify(obj)); } catch (e) { }
      document.getElementById("ver-estado").textContent = obj.opcion !== "" ? "Veredicto guardado en este navegador — pase la hoja impresa para el expediente de la prueba." : "";
    }
    host.querySelectorAll("input[name=ver]").forEach(function (r) { r.onchange = salvar; });
    document.getElementById("ver-nota").oninput = salvar;
    if (val.opcion !== "") document.getElementById("ver-estado").textContent = "Veredicto guardado en este navegador — pase la hoja impresa para el expediente de la prueba.";
  }

  var ETIQUETAS = {
    urgente: "EN ATENCIÓN — urgencia", en_atencion: "en atención", pausada: "pausada", espera: "en espera",
    llego: "llegó", por_registrar: "falta completar su visita", no_llego: "no llegó",
    estacion_mitad: "estación a mitad", falta_completar: "falta completar su ficha",
    atendida: "atendida", con_cita: "con cita", estacion_hecha: "estación hecha — lista para consulta",
    referida: "referida a otro centro", parto: "parto registrado"
  };
  function tarjetaHTML(p, extra) {
    var d = estadoDe(p.id);
    var reloj = esperaMin(p.id);
    var cls = "", relojCls = "";
    if (d.estado === "urgente" || d.estado === "falta_completar") cls = "rojo";
    else if (d.estado === "atendida" || d.estado === "parto") cls = "verde";
    else if (d.estado === "no_llego" || d.estado === "con_cita" || d.estado === "referida") cls = "gris";
    else if (d.estado === "pausada" || d.estado === "estacion_mitad") cls = "ambar";
    else cls = "azul";
    if (reloj != null && reloj >= 45) relojCls = "min45"; else if (reloj != null && reloj >= 30) relojCls = "min30";
    var h = "<div class='tarjeta " + cls + "' data-pid='" + p.id + "' tabindex='0'>";
    if (reloj != null) h += "<span class='reloj " + relojCls + "'>" + reloj + " min</span>";
    if (p.cita != null && (d.estado === "con_cita" || d.estado === "no_llego")) h += "<span class='reloj'>cita " + hm(p.cita) + "</span>";
    h += "<div class='nombre'>" + esc(p.nombre) + "</div><div class='caso'>nacida " + esc(p.nacimiento) + " · " + esc(p.caso) + "</div>";
    h += "<div class='pies'><span class='chip " + cls + "'>" + (ETIQUETAS[d.estado] || esc(d.estado)) + "</span>";
    if (p.marcador) h += "<span class='chip ambar'>" + esc(p.marcador) + "</span>";
    var pend = S.alertas.filter(function (a) { return a.pid === p.id && a.estado === "pendiente"; }).length;
    if (pend) h += "<span class='chip rojo'>" + pend + " aviso(s) sin atender</span>";
    if (d.duenio) h += " Dueño: " + esc(d.duenio);
    if (extra) h += extra;
    h += "</div></div>";
    return h;
  }
  function avisoHTML(a, conClinico) {
    var cls = (a.tipo === 4 || a.tipo === 3 || a.tipo === 6) ? "rojo" : a.tipo === 2 ? "ambar" : "verde";
    var tipos = { 1: "verde — está bien", 2: "chequeo con plazo", 3: "problema de salud", 4: "urgencia", 5: "contexto permanente", 6: "interacción" };
    var h = "<div class='aviso " + cls + "'><b>" + esc(a.texto) + "</b>" +
      "<span class='accion'>Acción: " + esc(a.accion) + "</span>" +
      "<span class='duenio'>Dueño: " + esc(a.duenio) + " · nació a las " + hm(a.nacida) +
      (a.plazo ? " · plazo: " + fechaLarga(a.plazo) + (vencida(a) ? " — VENCIDO (sube al tablero)" : "") : "") +
      (a.quien ? " · cerrado por " + esc(a.quien) + " (céd. " + esc(a.cedula) + ")" + (a.anclada ? " — anclado a su nota firmada" : "") : "") +
      "</span>";
    if (conClinico) {
      h += "<details style='margin-top:6px'><summary style='cursor:pointer;font-size:12px;color:#14507d'>Detalle clínico (para el profesional)</summary>" +
        "<div class='linea' style='font-size:12px'>Tipo de aviso: " + (tipos[a.tipo] || a.tipo) + " · estado: " + a.estado +
        (a.cierre ? " (cierre: " + esc(a.cierre) + ")" : "") + " · bitácora: " + a.id + "</div></details>";
    }
    h += "</div>";
    return h;
  }
  function cintaHTML(pid) {
    var p = paciente(pid);
    if (!p) return "<div class='cinta vacio'>Sin paciente en contexto — entre desde Hoy.</div>";
    var salvar = (p.alergias && p.alergias.length ? p.alergias.join(", ") : "sin alergias conocidas");
    var conAlergia = !!(p.alergias && p.alergias.length);
    return "<div class='cinta" + (conAlergia ? " alarma" : "") + "'><span class='nombre'>" + (conAlergia ? "⚠ " : "") + esc(p.nombre) + "</span> · nacida " + esc(p.nacimiento) +
      (p.eg ? " · EG: " + p.eg + " semanas (derivada)" : "") +
      "<div class='det'><span class='salvar'>Datos que salvan:</span> alergias: " + esc(salvar) +
      " · tipo de sangre: " + esc(p.sangre) + " · medicación: " + esc(p.medicacion) + " · crónicas: " + esc(p.cronica) + "</div></div>";
  }

  cargar();

  return {
    ahoraMin: ahoraMin, hm: hm, uid: uid, hoyISO: hoyISO, fechaMas: fechaMas, fechaLarga: fechaLarga, diaLargo: diaLargo,
    nombrePropio: nombrePropio, esc: esc, CATALOGO: CATALOGO, LAB_RANGOS: LAB_RANGOS, BANDERAS: BANDERAS, TIPOS_ATENCION: TIPOS_ATENCION,
    estado: estado, paciente: paciente, porNombre: porNombre, porAparecidas: porAparecidas, estadoDe: estadoDe, esperaMin: esperaMin,
    agregarEvento: agregarEvento, banderaInfo: banderaInfo, evaluarBandaLab: evaluarBandaLab, bandaTA: bandaTA,
    homa: homa, evaluarBandaHoma: evaluarBandaHoma, proximaFechaControl: proximaFechaControl,
    nacerAlerta: nacerAlerta, cerrarAlerta: cerrarAlerta, alertasDe: alertasDe, alertasPendientes: alertasPendientes,
    vencida: vencida, metricaFatiga: metricaFatiga, labDe: labDe, capturarLab: capturarLab,
    controlMasReciente: controlMasReciente, resolverChips: resolverChips, guardarControl: guardarControl,
    atencionAbiertaDe: atencionAbiertaDe, abrirAtencion: abrirAtencion, pausarAtencion: pausarAtencion, conciliarAtenciones: conciliarAtenciones, repararAtencion: repararAtencion, metricaAtenciones: metricaAtenciones,
    retomarAtencion: retomarAtencion, tomarPorEmergencia: tomarPorEmergencia, alternarEquipo: alternarEquipo, registrarTraspasoImpreso: registrarTraspasoImpreso, marcarRespaldo: marcarRespaldo, borradorEstacionDe: borradorEstacionDe,
    empezarConsulta: empezarConsulta, cerrarConsulta: cerrarConsulta, resolverUrgencia: resolverUrgencia,
    verificarPrescripcion: verificarPrescripcion, registrarPrescripcion: registrarPrescripcion,
    crearCita: crearCita, reagendar: reagendar, recordatorios: recordatorios, entregarRecordatorio: entregarRecordatorio,
    anularRecordatorio: anularRecordatorio, porRecuperar: porRecuperar,
    cierreData: cierreData, traspasoHTML: traspasoHTML,
    toast: toast, modal: modal, nombrePac: nombrePac, pintarRelojBarra: pintarRelojBarra, nav: nav,
    leerContexto: leerContexto, exigirContexto: exigirContexto, pintarContexto: pintarContexto, irA: irA,
    bandaVeredicto: bandaVeredicto, tarjetaHTML: tarjetaHTML, avisoHTML: avisoHTML, cintaHTML: cintaHTML,
    reiniciar: reiniciar, guardar: guardar, clave: function () { return KEY; }
  };
})();
