/* Genera CATALOGOS.json desde catalogos.js — el espejo máquina-legible de la fuente
   firmable. Nunca se edita el JSON a mano. Uso: node generar-catalogos.js */
const fs = require("fs");
const path = require("path");
eval(fs.readFileSync(path.join(__dirname, "catalogos.js"), "utf8"));
const salida = {
  version: 1,
  fecha: new Date().toISOString().slice(0, 10),
  nota: "Generado desde catalogos.js por generar-catalogos.js — espejo de la fuente firmable de umbrales clínicos (P6). No editar a mano.",
  claves: Object.keys(CATALOGO),
  catalogo: CATALOGO
};
fs.writeFileSync(path.join(__dirname, "CATALOGOS.json"), JSON.stringify(salida, null, 2));
console.log("CATALOGOS.json regenerado — claves:", salida.claves.join(", "));
