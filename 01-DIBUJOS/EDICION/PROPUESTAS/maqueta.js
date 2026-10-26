(function () {
  "use strict";

  var CLAVE_CONTEXTO = "mk_contexto";
  var relojes = [];

  function parametroPaciente() {
    try {
      return new URLSearchParams(window.location.search).get("paciente");
    } catch (e) {
      return null;
    }
  }

  function leerContexto() {
    var porUrl = parametroPaciente();
    if (porUrl) {
      guardarContexto(porUrl);
      return porUrl;
    }
    try {
      return window.localStorage.getItem(CLAVE_CONTEXTO);
    } catch (e) {
      return null;
    }
  }

  function guardarContexto(nombre) {
    try {
      window.localStorage.setItem(CLAVE_CONTEXTO, nombre);
    } catch (e) { }
  }

  function elegirPaciente(nombre) {
    if (!nombre) return null;
    guardarContexto(nombre);
    return nombre;
  }

  function aviso(texto) {
    var a = document.getElementById("aviso");
    if (!a) {
      a = document.createElement("div");
      a.id = "aviso";
      document.body.appendChild(a);
    }
    a.textContent = texto;
    a.style.display = "block";
    window.clearTimeout(a._mkTimer);
    a._mkTimer = window.setTimeout(function () {
      a.style.display = "none";
    }, 3400);
  }

  function nombreDeTarjeta(el) {
    var tarjeta = el.closest ? el.closest(".tarjeta") : null;
    if (!tarjeta) return null;
    var campo = tarjeta.querySelector(".nombre");
    return campo ? campo.textContent.trim() : null;
  }

  function alElegir(ev) {
    var nombre = nombreDeTarjeta(ev.target);
    if (!nombre) return;
    elegirPaciente(nombre);
    aviso("Paciente en contexto: " + nombre + " · cambie con clic en su tarjeta");
  }

  function prepararRelojes() {
    var etiquetas = document.querySelectorAll(".reloj");
    for (var i = 0; i < etiquetas.length; i++) {
      var texto = etiquetas[i].textContent.trim();
      var m = texto.match(/^(\d+) min$/);
      var ahora = texto === "ahora";
      if (!m && !ahora) continue;
      relojes.push({
        el: etiquetas[i],
        base: m ? parseInt(m[1], 10) : 0,
        inicio: Date.now()
      });
    }
    if (relojes.length) {
      pintarRelojes();
      window.setInterval(pintarRelojes, 20000);
    }
  }

  function pintarRelojes() {
    for (var i = 0; i < relojes.length; i++) {
      var r = relojes[i];
      var pasaron = Math.floor((Date.now() - r.inicio) / 60000);
      var total = r.base + pasaron;
      if (total < 1 && r.base === 0) {
        r.el.textContent = "ahora";
        continue;
      }
      r.el.textContent = total + " min";
      r.el.classList.remove("min30", "min45");
      if (total >= 45) r.el.classList.add("min45");
      else if (total >= 30) r.el.classList.add("min30");
    }
  }

  function sinCablear(operacion) {
    return {
      ok: false,
      mensaje: "La operación " + operacion + " aún no está cableada en la maqueta: sigue siendo un dibujo. El paso siguiente es conectarla."
    };
  }

  var puente = {
    buscar_paciente: function () { return sinCablear("buscar_paciente"); },
    registrar_llegada: function () { return sinCablear("registrar_llegada"); },
    registro_rapido: function () { return sinCablear("registro_rapido"); },
    elegir_paciente: function (id) {
      elegirPaciente(id);
      return { ok: true, contexto: id };
    },
    listar_dia: function () { return sinCablear("listar_dia"); },
    marcar_no_llego: function () { return sinCablear("marcar_no_llego"); },
    marcar_urgencia: function () { return sinCablear("marcar_urgencia"); },
    equipo_fuera: function () { return sinCablear("equipo_fuera"); },
    pausar: function () { return sinCablear("pausar"); },
    retomar: function () { return sinCablear("retomar"); },
    guardar_control: function () { return sinCablear("guardar_control"); },
    ultimos_valores: function () { return sinCablear("ultimos_valores"); },
    calcular: function () { return sinCablear("calcular"); },
    listar_pendientes: function () { return sinCablear("listar_pendientes"); },
    nacer_alerta: function () { return sinCablear("nacer_alerta"); },
    atender_alerta: function () { return sinCablear("atender_alerta"); },
    alertas_del_episodio: function () { return sinCablear("alertas_del_episodio"); },
    listar_llamadas: function () { return sinCablear("listar_llamadas"); },
    reagendar: function () { return sinCablear("reagendar"); },
    capturar_laboratorio: function () { return sinCablear("capturar_laboratorio"); },
    obtener_traspaso: function () { return sinCablear("obtener_traspaso"); },
    listar_plantillas: function () { return sinCablear("listar_plantillas"); },
    generar_documento: function () { return sinCablear("generar_documento"); }
  };

  function iniciar() {
    var contexto = leerContexto();
    document.addEventListener("click", alElegir, true);
    prepararRelojes();
    if (contexto) {
      aviso("Paciente en contexto: " + contexto + " · cambie con clic en su tarjeta");
    }
  }

  window.MK = {
    puente: puente,
    contexto: leerContexto,
    elegir: elegirPaciente,
    aviso: aviso
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
