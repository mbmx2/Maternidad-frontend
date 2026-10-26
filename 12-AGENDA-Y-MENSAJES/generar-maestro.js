/* Genera MENSAJES-MAESTRO.json desde el motor — nunca se escribe a mano.
   Uso: node generar-maestro.js */
const fs = require("fs");
const path = require("path");
global.localStorage = { getItem: () => null, setItem: () => {} };
const dir = __dirname;
eval(fs.readFileSync(path.join(dir, "mensajes.js"), "utf8"));

const familias = {};
AgendaMsg.CATALOGO.forEach(t => { familias[t.familia] = (familias[t.familia] || 0) + 1; });

const salida = {
  version: 2,
  fecha: AgendaMsg.hoyISO(),
  nota: "Generado desde mensajes.js por generar-maestro.js — constancia máquina-legible de la batería. BORRADORES: requieren firma del médico antes de vigencia (P6).",
  familias: Object.keys(familias),
  conteo: { plantillas: AgendaMsg.CATALOGO.length, semanas: AgendaMsg.SEMANAS.length, por_familia: familias, diagnosticos: Object.keys(AgendaMsg.DIAGNOSTICOS).length },
  marcadores_soportados: ["nombre", "nombre_completo", "unidad", "telefono_unidad", "horario_unidad", "fecha_cita", "hora_cita", "fecha_original", "fecha_cierre", "opciones_reprogramacion", "motivo_general", "documento", "semana", "trimestre", "signos_alarma", "desarrollo_bebe", "cuidado_semana"],
  horario_catalogo: AgendaMsg.HORARIO,
  plantillas: AgendaMsg.CATALOGO.map(t => ({ id: t.id, familia: t.familia, subfamilia: t.subfamilia, nombre: t.nombre, disparo: t.disparo, poblacion: t.poblacion, canales: t.canales, borrador: t.borrador, texto: t.texto })),
  semanas: AgendaMsg.SEMANAS.map(s => ({ semana: s.semana, desarrollo: s.desarrollo, cuidado: s.cuidado, borrador: s.borrador, fuente: s.fuente })),
  diagnosticos: AgendaMsg.DIAGNOSTICOS,
  frontera_DEC32: { regla: "El mensaje al paciente nunca lleva cifras clínicas, valores ni nombres de enfermedad.", examen: "examenInocuidad corre en el motor antes de copiar y antes de entregar." }
};
fs.writeFileSync(path.join(dir, "MENSAJES-MAESTRO.json"), JSON.stringify(salida, null, 2));
console.log("MENSAJES-MAESTRO.json regenerado:", salida.conteo);
