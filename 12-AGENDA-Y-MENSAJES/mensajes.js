/* Motor de mensajes y agenda v2 — 12-AGENDA-Y-MENSAJES.
   Batería completa de mensajes, alertas, recordatorios y tips por dimensión:
   logística (L) · laboratorio (B) · semana de embarazo (S + 40 filas) ·
   estado/diagnóstico gineco-obstétrico (D) · cuidado fisiológico (F) · alarma (A).
   Reglas duras:
   - DEC-32: el mensaje al paciente NUNCA lleva cifras clínicas, valores ni nombres de
     enfermedad. El examen de inocuidad lo vigila y el MOTOR se niega a entregar si falla.
   - P6: todo el catálogo nace BORRADOR; el contenido clínico lo firma el médico.
   - R-48: la semana se DERIVA de la fecha estimada (cálculo), jamás se captura.
   - El sistema SUGIERE; el equipo DECIDE. Disponibilidad con huecos reales.
   - Cero envío automático; la persona copia y entrega; la bitácora registra con
     deduplicado verificable por semana-paciente. */
var AgendaMsg = (function () {
  "use strict";
  var KEY = "agenda_mensajes_v2";

  /* ——— Fechas reales (nada pegado a mano) ——— */
  function hoyISO() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function fechaMas(dias) {
    var d = new Date(); d.setDate(d.getDate() + dias);
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function fechaLarga(iso) {
    var meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    var p = String(iso || "").split("-");
    if (p.length !== 3) return iso || "";
    return parseInt(p[2], 10) + " de " + meses[parseInt(p[1], 10) - 1];
  }
  function diasEntre(aISO, bISO) {
    var a = new Date(aISO + "T00:00:00"), b = new Date(bISO + "T00:00:00");
    return Math.round((b - a) / 86400000);
  }
  function uid() { return "t" + Math.random().toString(36).slice(2, 9); }
  function esc(t) { return String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  var SIGNOSALARMA = "cefalea intensa, visión borrosa, hinchazón súbita de cara o manos, sangrado genital, falta de aire, fiebre, contracciones o movimiento fetal disminuido";
  var CANALES = ["whatsapp", "llamada", "impreso"];
  /* Horario del consultorio — CATÁLOGO borrador firmable (no está escrito en la lógica). */
  var HORARIO = { abre: "09:00", cierra: "13:00", pasoMin: 30 };

  /* ——— SEMANAS 1–40: desarrollo y cuidado (ciencia en borrador; firma pendiente).
     Sin fila de contenido ⇒ el mensaje semanal se bloquea. ——— */
  var SEMANAS = [
    { semana: 1, desarrollo: "Su cuerpo ya está preparando el embarazo, aunque todavía no lo note", cuidado: "Tome su vitamina prenatal con ácido fólico y evite alcohol, tabaco y medicamentos sin indicación" },
    { semana: 2, desarrollo: "El embarazo apenas está comenzando dentro de usted", cuidado: "Descanse y comience a llevar una lista de sus preguntas para el primer control" },
    { semana: 3, desarrollo: "Su bebé empieza a formarse desde las primeras semanas", cuidado: "Siga tomando su vitamina prenatal todos los días" },
    { semana: 4, desarrollo: "La vida de su bebé ya está en marcha", cuidado: "Si tiene sangrado o dolor fuerte, avísenos de inmediato" },
    { semana: 5, desarrollo: "Su bebé es todavía muy pequeño y crece muy rápido", cuidado: "Puede empezar con mareos matutinos: coma poquito y seguido" },
    { semana: 6, desarrollo: "Su bebé ya tiene forma temprana y late su corazón primitivo", cuidado: "Evite olores fuertes y no se quede en ayunas" },
    { semana: 7, desarrollo: "Se están formando los brazos y las piernas de su bebé", cuidado: "Descanse cuando sienta cansancio; es normal en estas semanas" },
    { semana: 8, desarrollo: "Su bebé ya tiene formados los dedos de manos y pies", cuidado: "Elija alimentos sencillos si le dan asco los olores" },
    { semana: 9, desarrollo: "Su bebé ya puede moverse, aunque usted aún no lo siente", cuidado: "Tome su vitamina y tome agua durante el día" },
    { semana: 10, desarrollo: "Los órganos de su bebé ya están formándose", cuidado: "Evite frituras y refrescos; coma fruta y verdura cada día" },
    { semana: 11, desarrollo: "Su bebé ya tiene formadas sus manos y puede abrir y cerrar los dedos", cuidado: "Tome suficiente agua durante el día y acuda a su control programado" },
    { semana: 12, desarrollo: "Su bebé ya mueve los brazos y las piernas con más fuerza", cuidado: "Si las náuseas son fuertes, coma seguido en porciones pequeñas" },
    { semana: 13, desarrollo: "Su bebé ya tiene formada su cara y sus dientes primitivos", cuidado: "Termine su primer trimestre con su control y sus estudios al día" },
    { semana: 14, desarrollo: "Su bebé ya se mueve aunque usted todavía no lo siente bien", cuidado: "Comience a caminar unos minutos al día si se siente bien" },
    { semana: 15, desarrollo: "Los huesos de su bebé se están fortaleciendo", cuidado: "Tome su calcio y su hierro en horarios separados" },
    { semana: 16, desarrollo: "Su bebé ya oye y puede responder a los sonidos suaves", cuidado: "Hable con su bebé: lo que usted siente, él también" },
    { semana: 17, desarrollo: "Su bebé ya puede hacer muecas con su cara", cuidado: "No falte a su control; ya sentirá más seguido los movimientos" },
    { semana: 18, desarrollo: "Su bebé ya tiene oídos formados y empieza a escuchar", cuidado: "Duerma del lado izquierdo si le resulta cómodo" },
    { semana: 19, desarrollo: "A mitad de su embarazo su bebé ya se mueve y usted puede sentirlo", cuidado: "Camine unos minutos al día si su médico lo autoriza" },
    { semana: 20, desarrollo: "Su bebé ya tiene su piel delicada y sus movimientos son más fuertes", cuidado: "Cuente los movimientos de su bebé casi todos los días" },
    { semana: 21, desarrollo: "Su bebé ya parpadea y crece a buen ritmo", cuidado: "Si su bebé mueve menos de lo habitual, avísenos hoy" },
    { semana: 22, desarrollo: "Su bebé ya tiene cejas y pestañas primitivas", cuidado: "Tome agua y coma variedad; su piel necesita cuidado" },
    { semana: 23, desarrollo: "Su bebé ya puede responder a la luz y al sonido", cuidado: "Acuda a su control del segundo trimestre aunque se sienta bien" },
    { semana: 24, desarrollo: "Su bebé ya prueba los sabores del líquido que lo rodea", cuidado: "Cuide su alimentación: coma variedad y camine después de comer" },
    { semana: 25, desarrollo: "Su bebé ya mueve los brazos y las piernas con fuerza", cuidado: "Si siente hinchazón repentina de cara o manos, avísenos hoy" },
    { semana: 26, desarrollo: "Sus ojos ya están formados y empiezan a abrirse", cuidado: "Prepare su lista de preguntas para el tercer trimestre" },
    { semana: 27, desarrollo: "Su bebé ya reconoce su voz y su ritmo", cuidado: "Descanse del lado izquierdo unos minutos varias veces al día" },
    { semana: 28, desarrollo: "Su bebé ya abre los ojos y su cara tiene contornos visibles", cuidado: "Tome suficiente agua y no falte a su control prenatal" },
    { semana: 29, desarrollo: "Su bebé ya puede abrir los ojos y su cara tiene contornos visibles", cuidado: "Tome suficiente agua y no falte a su control prenatal" },
    { semana: 30, desarrollo: "Su bebé ya tiene uñas y su piel es más suave", cuidado: "Vigile los movimientos de su bebé cada día" },
    { semana: 31, desarrollo: "Su bebé ya gira y busca la posición más cómoda", cuidado: "Prepare su bolsa del hospital en estos días" },
    { semana: 32, desarrollo: "Su bebé ya puede sostener la cabeza con más control", cuidado: "No falte a su control de estas semanas: son más seguidos" },
    { semana: 33, desarrollo: "Su bebé ya está ganando peso y se ve más lleno", cuidado: "Duerma lo que pueda y evite esfuerzos pesados" },
    { semana: 34, desarrollo: "Los pulmones de su bebé ya están casi listos", cuidado: "Practique la respiración profunda todos los días" },
    { semana: 35, desarrollo: "Su bebé ya está de cabeza hacia abajo preparándose", cuidado: "Si siente presión o contracciones seguidas, avísenos" },
    { semana: 36, desarrollo: "Su bebé está casi listo para nacer y ocupa ya casi todo el espacio", cuidado: "Prepare su bolsa del hospital y descanse lo que necesite" },
    { semana: 37, desarrollo: "Su bebé ya se considera a término y sigue creciendo", cuidado: "Cuente los movimientos de su bebé y tenga su expediente listo" },
    { semana: 38, desarrollo: "Su bebé ya está en posición y con buena energía", cuidado: "Si pierde líquido o tiene contracciones seguidas, venga de inmediato" },
    { semana: 39, desarrollo: "Su cuerpo y su bebé ya están listos para el trabajo de parto", cuidado: "Descanse, coma ligero y no se aleje del consultorio" },
    { semana: 40, desarrollo: "Su bebé ya llegó a su fecha estimada de nacimiento", cuidado: "Si pasa la fecha sin señales, llámenos: revisamos juntos el plan" }
  ];
  SEMANAS.forEach(function (s) { s.borrador = true; s.fuente = "borrador científico pendiente de firma"; });

  /* ——— Diagnósticos/estados de la ficha: ESTRUCTURADOS (no texto libre) ——— */
  var DIAGNOSTICOS = {
    embarazo_normal: { nombre: "Embarazo de bajo riesgo", etiqueta: "embarazo", patron: "embarazo" },
    embarazo_multiple: { nombre: "Embarazo múltiple", etiqueta: "gemelar", patron: { dias: 14, motivo: "embarazo múltiple — control cada 2 semanas" } },
    puerperio: { nombre: "Puerperio", etiqueta: "puerperio", patron: { dias: 14, motivo: "puerperio — control de recuperación" } },
    infeccion: { nombre: "Infección en seguimiento", etiqueta: "infeccion", patron: { dias: 14, motivo: "seguimiento de infección (cada 2 semanas)" } },
    fertilidad: { nombre: "Protocolo de fertilidad", etiqueta: "fertilidad", patron: { dias: 7, motivo: "protocolo de fertilidad (semanal durante el protocolo)" } },
    tumoracion: { nombre: "Tumoración en revisión", etiqueta: "tumoracion", patron: { dias: 56, motivo: "revisión de tumoración (cada 2 meses)" } },
    duelo: { nombre: "Duelo obstétrico", etiqueta: "duelo", patron: { dias: 28, motivo: "revisión de duelo obstétrico" } },
    planificacion: { nombre: "Planificación familiar", etiqueta: "planificacion", patron: { dias: 84, motivo: "planificación (cada 3 meses)" } },
    vacunacion_vph: { nombre: "Esquema de vacunación", etiqueta: "vacunacion", patron: { dias: 60, motivo: "esquema de vacunación (cada 2 meses)" } }
  };

  /* ——— Batería: id, familia, subfamilia, nombre, disparo, población, canales, texto ——— */
  function T(id, familia, subfamilia, nombre, disparo, poblacion, canales, texto) {
    return { id: id, familia: familia, subfamilia: subfamilia, nombre: nombre, disparo: disparo, poblacion: poblacion, canales: canales, borrador: true, texto: texto };
  }
  var CATALOGO = [
    /* — LOGÍSTICA Y ADMINISTRACIÓN (14) — */
    T("L01", "logistica", "citas", "Recordatorio de cita", "cita programada 1 día antes", "general", ["whatsapp", "llamada", "impreso"],
      "Hola {{nombre}}, le recordamos su cita mañana {{fecha_cita}} a las {{hora_cita}} en {{unidad}}. Si no puede acudir, avísenos para reagendar."),
    T("L02", "logistica", "citas", "Confirmación de cita", "cita creada o reprogramada", "general", ["whatsapp", "llamada"],
      "Hola {{nombre}}, ¿nos confirma su cita el {{fecha_cita}} a las {{hora_cita}}? Responda por este medio o llámenos al {{telefono_unidad}}."),
    T("L03", "logistica", "disponibilidad", "Solicitud de disponibilidad", "control derivado sin cita", "general", ["whatsapp", "llamada"],
      "Hola {{nombre}}, para agendar su próxima visita: ¿qué días y horarios le acomodan esta semana? Con gusto la esperamos en {{unidad}}."),
    T("L04", "logistica", "disponibilidad", "Reprogramación ofrecida", "cita debe moverse", "general", ["whatsapp", "llamada", "impreso"],
      "Hola {{nombre}}, su cita del {{fecha_original}} no está disponible. Le ofrecemos: {{opciones_reprogramacion}}. ¿Le acomoda alguna? Disculpe las molestias."),
    T("L05", "logistica", "disponibilidad", "Cancelación por causa imprevista", "fuerza mayor del consultorio", "general", ["whatsapp", "llamada", "impreso"],
      "Hola {{nombre}}, por {{motivo_general}} no podremos atenderle el {{fecha_original}}. Le ofrecemos: {{opciones_reprogramacion}} — o indíquenos sus días disponibles para la próxima semana y la reprogramamos. Disculpe las molestias."),
    T("L06", "logistica", "inasistencia", "Seguimiento de inasistencia", "no llegó sin avisar", "general", ["whatsapp", "llamada"],
      "Hola {{nombre}}, no pudimos atenderle el día de su cita. Queremos acompañarle: indíquenos cuándo puede acudir y le agendamos."),
    T("L07", "logistica", "bienvenida", "Bienvenida — primera visita", "registro nuevo", "general", ["impreso", "whatsapp"],
      "Hola {{nombre}}, bienvenida a {{unidad}}. Su ficha ya está lista; en su próxima visita la esperamos {{fecha_cita}} a las {{hora_cita}}."),
    T("L08", "logistica", "disponibilidad", "Seguimiento de respuesta", "disponibilidad pedida sin respuesta en 48 horas", "general", ["whatsapp", "llamada"],
      "Hola {{nombre}}, le escribimos para su próxima cita: ¿qué día y hora le acomodan? Con su respuesta la agendamos en {{unidad}}."),
    T("L09", "logistica", "horarios", "Cambio de horario del consultorio", "horario general publicado por el dueño", "general", ["whatsapp", "impreso"],
      "Hola {{nombre}}, le informamos un cambio de horario de {{unidad}}: atenderemos {{horario_unidad}}. Sus citas se mantienen; cualquier duda, llámenos."),
    T("L10", "logistica", "horarios", "Ausencia de la médica", "agenda médica fuera del consultorio ese día", "general", ["whatsapp", "llamada"],
      "Hola {{nombre}}, su cita del {{fecha_cita}} no se puede atender por un imprevisto de la agenda. Le ofrecemos: {{opciones_reprogramacion}} — o díganos sus días disponibles."),
    T("L11", "logistica", "horarios", "Cierre por vacaciones", "cierre programado del consultorio", "general", ["whatsapp", "impreso"],
      "Hola {{nombre}}, {{unidad}} cerrará por vacaciones del {{fecha_original}} al {{fecha_cierre}}. Si necesita atención antes, avísenos y la reprogramamos con tiempo."),
    T("L12", "logistica", "citas", "Confirmación de cambio", "reprogramación aceptada por la paciente", "general", ["whatsapp", "llamada"],
      "Hola {{nombre}}, quedó confirmada su nueva cita: {{fecha_cita}} a las {{hora_cita}} en {{unidad}}. Si algo cambia, avísenos con tiempo, por favor."),
    T("L13", "logistica", "documentos", "Documentos pendientes", "ficha con documentos faltantes", "general", ["whatsapp", "impreso"],
      "Hola {{nombre}}, para completar su expediente le falta: {{documento}}. Puede traerlo en su próxima visita. Si tiene dudas, llámenos."),
    T("L14", "logistica", "horarios", "Aviso de espera larga", "espera mayor a 30 minutos en sala", "general", ["whatsapp"],
      "Hola {{nombre}}, estamos con una espera mayor a la prevista en {{unidad}}. Gracias por su paciencia; le avisaremos en cuanto podamos atenderle."),

    /* — LABORATORIO Y ESTUDIOS (16) — */
    T("B01", "laboratorio", "controles", "Control de hemoglobina", "banda de hemoglobina en alerta o plazo vencido (el mensaje no lleva el valor)", "embarazo", ["whatsapp", "llamada"],
      "Hola {{nombre}}, le toca su control de hemoglobina. Cite en recepción cuando le acomode; si siente mareo o cansancio excesivo, acuda antes."),
    T("B02", "laboratorio", "controles", "Tamizaje de glucosa", "plazo de tamizaje vencido", "embarazo", ["whatsapp", "llamada"],
      "Hola {{nombre}}, le toca su tamizaje de glucosa. Recuerde que algunos estudios piden ayuno — avísenos si tiene dudas antes de acudir."),
    T("B03", "laboratorio", "resultados", "Resultados listos para recoger", "resultados capturados hoy", "general", ["whatsapp", "llamada"],
      "Hola {{nombre}}, sus resultados de laboratorio de hoy ya están listos. Pase a recogerlos en {{unidad}} o coméntenos si prefiere otra forma."),
    T("B04", "laboratorio", "estudios", "Estudio de imagen pendiente", "estudio sin capturar", "general", ["whatsapp", "llamada"],
      "Hola {{nombre}}, le recordamos que su estudio de imagen sigue pendiente. Tráigalo cuando pueda y lo integraremos a su expediente."),
    T("B05", "laboratorio", "estudios", "Preparación de estudio con ayuno", "estudio agendado que pide ayuno", "general", ["whatsapp", "impreso"],
      "Hola {{nombre}}, para su estudio del {{fecha_cita}}: acuda en ayuno (sin comer desde 8 horas antes) y tome agua si se lo indicaron. Si tiene dudas, llámenos."),
    T("B06", "laboratorio", "controles", "Control de plaquetas", "plazo de control de plaquetas vencido", "embarazo", ["whatsapp", "llamada"],
      "Hola {{nombre}}, le toca su control de plaquetas. Cite en recepción cuando le acomode y traiga sus estudios previos."),
    T("B07", "laboratorio", "controles", "Panel de laboratorio del trimestre", "control trimestral de laboratorio", "embarazo", ["whatsapp", "llamada"],
      "Hola {{nombre}}, le toca su control de laboratorio del trimestre. Avísenos cuándo le acomoda acudir en ayuno si su médico lo indicó."),
    T("B08", "laboratorio", "controles", "Estudio de orina pendiente", "urocultivo por repetir o sin entregar", "embarazo", ["whatsapp", "llamada"],
      "Hola {{nombre}}, le falta entregar su estudio de orina. Tráigalo cuando pueda; la primera muestra la toma en casa y la recibe en frasco estéril."),
    T("B09", "laboratorio", "resultados", "Repetición de estudio", "resultado que pide repetición (sin cifra en el mensaje)", "general", ["whatsapp", "llamada"],
      "Hola {{nombre}}, su médico le indicó repetir un estudio. Acuda cuando le acomode; con gusto le imprimimos la indicación."),
    T("B10", "laboratorio", "controles", "Control hormonal", "plazo de control hormonal vencido", "general", ["whatsapp", "llamada"],
      "Hola {{nombre}}, le toca su control hormonal programado. Tome su pastilla en ayuno si así se lo indicaron y traiga la dosis actual."),
    T("B11", "laboratorio", "controles", "Control de ácido úrico", "plazo de ácido úrico vencido", "embarazo", ["whatsapp", "llamada"],
      "Hola {{nombre}}, le toca su control de ácido úrico. Cite en recepción cuando le acomode."),
    T("B12", "laboratorio", "controles", "Control de creatinina", "plazo de función renal vencido", "general", ["whatsapp", "llamada"],
      "Hola {{nombre}}, le toca su control de creatinina (función de sus riñones). Acuda en ayuno si así se lo indicaron."),
    T("B13", "laboratorio", "controles", "Perfil de colesterol y triglicéridos", "plazo de perfil de lípidos vencido", "general", ["whatsapp", "llamada"],
      "Hola {{nombre}}, le toca su control de colesterol y triglicéridos. Acuda en ayuno y traiga su lista de alimentos de la semana."),
    T("B14", "laboratorio", "resultados", "Ultrasonido listo", "estudio de ultrasonido capturado", "embarazo", ["whatsapp", "llamada"],
      "Hola {{nombre}}, su estudio de ultrasonido ya está listo: pase a recogerlo o coméntenos cómo prefiere recibirlo."),
    T("B15", "laboratorio", "controles", "Grupo y Rh", "control de grupo y Rh del embarazo", "embarazo", ["whatsapp", "llamada"],
      "Hola {{nombre}}, le toca su control de grupo y Rh en el próximo control. Traiga sus papeles previos si los tiene."),
    T("B16", "laboratorio", "estudios", "Serologías de control", "serologías del embarazo pendientes", "embarazo", ["whatsapp", "llamada"],
      "Hola {{nombre}}, le toca entregar sus estudios de sangre de control. Avísenos si necesita la hoja de indicaciones."),

    /* — SEMANA Y ETAPAS DEL EMBARAZO (6) — */
    T("S00", "semana", "semanal", "Acompañamiento por semana de embarazo", "semana derivada de la fecha estimada (una vez por semana, deduplicado)", "embarazo", ["whatsapp", "impreso"],
      "Hola {{nombre}}, está en la semana {{semana}} de su embarazo ({{trimestre}}). {{desarrollo_bebe}}. {{cuidado_semana}}. Si presenta {{signos_alarma}}, comuníquese de inmediato o acuda: no deje que avance."),
    T("S01", "semana", "etapas", "Etapa — primer trimestre (semanas 1 a 13)", "semana derivada 1–13", "embarazo", ["whatsapp", "impreso"],
      "Hola {{nombre}}, está en su {{trimestre}}. Cuide su descanso, tome su vitamina prenatal todos los días y acuda a su primer control. Si presenta dolor fuerte, sangrado o mucho mareo, comuníquese de inmediato."),
    T("S02", "semana", "etapas", "Etapa — segundo trimestre (semanas 14 a 27)", "semana derivada 14–27", "embarazo", ["whatsapp", "impreso"],
      "Hola {{nombre}}, está en su {{trimestre}}: ya pasaron las primeras náuseas. Camine unos minutos al día, mantenga su alimentación variada y no falte a su control. Si siente los movimientos de su bebé menos de lo habitual, avísenos."),
    T("S03", "semana", "etapas", "Etapa — tercer trimestre (semanas 28 a 40)", "semana derivada 28–40", "embarazo", ["whatsapp", "impreso"],
      "Hola {{nombre}}, está en su {{trimestre}}, la recta final: prepare su bolsa, descanse del lado izquierdo si se lo recomienda su médica y vigile los movimientos de su bebé cada día. Si algo la preocupa, llámenos."),
    T("S04", "semana", "preparacion", "Preparación para el parto (semana 36 en adelante)", "semana derivada 36+", "embarazo", ["whatsapp", "impreso"],
      "Hola {{nombre}}, ya está en semana de preparación: tenga lista la bolsa, el camino al hospital y sus acompañantes. Si pierde líquido, tiene contracciones seguidas o sangrado, venga de inmediato."),
    T("S05", "semana", "postparto", "Primeros días de recuperación", "recién dada de alta del parto", "puerperio", ["whatsapp", "llamada"],
      "Hola {{nombre}}, estos días su cuerpo se está recuperando: descanse, tome agua y vigile fiebre, sangrado o dolor fuerte — si aparece alguno, avísenos de inmediato. Cuente con nosotros para su bebé.")
  ];
  CATALOGO = CATALOGO.concat([
    /* — ESTADOS Y DIAGNÓSTICOS GINECO-OBSTÉTRICOS (24) — */
    T("D01", "diagnostico", "seguimiento", "Puerperio — control de seguimiento", "episodio de puerperio activo", "puerperio", ["whatsapp", "llamada"],
      "Hola {{nombre}}, estamos acompañando su recuperación. Su control es el {{fecha_cita}} a las {{hora_cita}}; si tiene fiebre, sangrado o dolor fuerte, acuda antes."),
    T("D02", "diagnostico", "seguimiento", "Seguimiento de tratamiento", "protocolo de tratamiento activo en la ficha", "infeccion", ["whatsapp", "llamada"],
      "Hola {{nombre}}, le recordamos su control de seguimiento el {{fecha_cita}} a las {{hora_cita}}. Termine su tratamiento y traiga sus papeles al consultorio."),
    T("D03", "diagnostico", "seguimiento", "Acompañamiento de fertilidad", "protocolo de fertilidad activo", "fertilidad", ["whatsapp", "llamada"],
      "Hola {{nombre}}, su siguiente paso del protocolo es el {{fecha_cita}} a las {{hora_cita}}. Cualquier duda sobre el proceso, llámenos a {{unidad}}."),
    T("D04", "diagnostico", "seguimiento", "Seguimiento sensible", "revisión sensible programada (duelo)", "duelo", ["llamada", "impreso"],
      "Hola {{nombre}}, le recordamos su cita de seguimiento el {{fecha_cita}} a las {{hora_cita}}. Estamos para acompañarle; si prefiere otro día, díganos con calma."),
    T("D05", "diagnostico", "seguimiento", "Revisión programada", "revisión de tumoración en agenda", "tumoracion", ["whatsapp", "llamada"],
      "Hola {{nombre}}, su revisión programada es el {{fecha_cita}} a las {{hora_cita}} en {{unidad}}. Si presenta dolor fuerte o sangrado, acuda antes."),
    T("D06", "diagnostico", "seguimiento", "Planificación — próxima visita", "planificación con próxima visita", "planificacion", ["whatsapp", "llamada"],
      "Hola {{nombre}}, su próxima cita de planificación es el {{fecha_cita}} a las {{hora_cita}}. Cualquier duda, con gusto la atendemos en {{unidad}}."),
    T("D07", "diagnostico", "vacunacion", "Vacunación — siguiente aplicación", "esquema de vacunación activo", "vacunacion", ["whatsapp", "llamada"],
      "Hola {{nombre}}, toca su siguiente aplicación del esquema de vacunación. Le esperamos el {{fecha_cita}} a las {{hora_cita}}; si ese día tiene fiebre, avísenos para reprogramar."),
    T("D08", "diagnostico", "acompanamiento", "Acompañamiento en el embarazo adolescente", "paciente menor de 20 años", "embarazo", ["whatsapp", "llamada"],
      "Hola {{nombre}}, su control es el {{fecha_cita}} a las {{hora_cita}}. Puede venir acompañada de la persona que elija; aquí la atendemos con confidencialidad y sin juicios."),
    T("D09", "diagnostico", "acompanamiento", "Acompañamiento a partir de los 35 años", "paciente mayor de 35 años", "embarazo", ["whatsapp", "llamada"],
      "Hola {{nombre}}, por su edad su control incluye estudios extra: su próxima cita es el {{fecha_cita}} a las {{hora_cita}}. Traiga sus papeles previos."),
    T("D10", "diagnostico", "indicaciones", "Control de descanso", "indicación de descanso en la ficha", "embarazo", ["whatsapp", "impreso"],
      "Hola {{nombre}}, siga su indicación de descanso: evite esfuerzos y mantenga sus controles. Si siente contracciones o sangrado, avísenos de inmediato."),
    T("D11", "diagnostico", "seguimiento", "Control del crecimiento de su bebé", "seguimiento por estudios de crecimiento", "embarazo", ["whatsapp", "llamada"],
      "Hola {{nombre}}, su control del crecimiento es el {{fecha_cita}} a las {{hora_cita}}. No falte: después de cada estudio le explicamos todo con calma."),
    T("D12", "diagnostico", "nutricion", "Acompañamiento nutricional", "control de peso o nutrición", "embarazo", ["whatsapp", "llamada"],
      "Hola {{nombre}}, su cita de nutrición es el {{fecha_cita}} a las {{hora_cita}}. Traiga su libreta de alimentos si la tiene; haremos un plan a su medida."),
    T("D13", "diagnostico", "seguimiento", "Control de su tensión", "control por tensión elevada en la ficha", "embarazo", ["whatsapp", "llamada"],
      "Hola {{nombre}}, le toca su control de tensión. Tome su medicamento si lo tiene indicado y acuda con sus papeles el {{fecha_cita}} a las {{hora_cita}}."),
    T("D14", "diagnostico", "seguimiento", "Control hormonal", "seguimiento hormonal de la ficha", "general", ["whatsapp", "llamada"],
      "Hola {{nombre}}, su control hormonal es el {{fecha_cita}} a las {{hora_cita}}. Tome su pastilla en ayuno si así se lo indicaron, y traiga la dosis actual."),
    T("D15", "diagnostico", "tratamientos", "Cierre de tratamiento con hierro", "tratamiento de hierro por terminar", "embarazo", ["whatsapp", "llamada"],
      "Hola {{nombre}}, está por terminar su tratamiento con hierro: su control de cierre es el {{fecha_cita}} a las {{hora_cita}}. No suspenda la pastilla sin indicación."),
    T("D16", "diagnostico", "tratamientos", "Fin de su tratamiento", "tratamiento con antibióticos por terminar", "infeccion", ["whatsapp", "llamada"],
      "Hola {{nombre}}, está por terminar su tratamiento: termínelo completo, aunque se sienta bien, y acuda a su control el {{fecha_cita}} a las {{hora_cita}}."),
    T("D17", "diagnostico", "seguimiento", "Embarazo múltiple — controles seguidos", "embarazo gemelar en la ficha", "gemelar", ["whatsapp", "llamada"],
      "Hola {{nombre}}, su embarazo requiere controles más seguidos: su próxima cita es el {{fecha_cita}} a las {{hora_cita}}. Cuente con más tiempo de consulta; llámenos ante cualquier cambio."),
    T("D18", "diagnostico", "postquirurgico", "Recuperación después de cirugía", "cesárea u otra cirugía reciente", "puerperio", ["whatsapp", "llamada"],
      "Hola {{nombre}}, vigile su herida: si enrojece, supura o le duele mucho, avísenos. Su control de recuperación es el {{fecha_cita}} a las {{hora_cita}}."),
    T("D19", "diagnostico", "referencia", "Control con su médica especialista", "referencia a control de alto riesgo", "embarazo", ["whatsapp", "llamada"],
      "Hola {{nombre}}, su control con la especialista es el {{fecha_cita}} a las {{hora_cita}}. Lleve todos sus estudios; aquí seguimos acompañándole."),
    T("D20", "diagnostico", "tratamientos", "Seguimiento de medicación crónica", "medicación crónica en la ficha", "general", ["whatsapp", "llamada"],
      "Hola {{nombre}}, revise que tenga su medicación para la semana. Su control es el {{fecha_cita}} a las {{hora_cita}}; traiga la lista actual de sus pastillas."),
    T("D21", "diagnostico", "acompanamiento", "Acompañamiento de su ánimo", "tamizaje de ánimo en consulta", "general", ["whatsapp", "llamada"],
      "Hola {{nombre}}, su cita de acompañamiento es el {{fecha_cita}} a las {{hora_cita}}. Si estos días se siente muy triste o muy ansiosa, avísenos: acompañarse ayuda."),
    T("D22", "diagnostico", "vacunacion", "Vacunación del embarazo", "esquema de vacunación en el embarazo", "embarazo", ["whatsapp", "llamada"],
      "Hola {{nombre}}, le toca su vacuna del embarazo en la próxima visita. Avísenos si ese día tiene fiebre."),
    T("D23", "diagnostico", "lactancia", "Seguimiento de lactancia", "control de lactancia materna", "puerperio", ["whatsapp", "llamada"],
      "Hola {{nombre}}, su control de lactancia es el {{fecha_cita}} a las {{hora_cita}}. Si le cuesta el amamantamiento o hay dolor, venga o llámenos: se puede resolver."),
    T("D24", "diagnostico", "planificacion", "Planificación de la próxima gestación", "planificación tras un desenlace", "planificacion", ["whatsapp", "llamada"],
      "Hola {{nombre}}, su control de planificación es el {{fecha_cita}} a las {{hora_cita}}. Haremos un plan con calma para su próxima gestación.")
  ]);
  CATALOGO = CATALOGO.concat([
    /* — CUIDADO FISIOLÓGICO Y NECESIDADES DIARIAS (18) — */
    T("F01", "cuidado", "hidratacion", "Hidratación diaria", "tip de acompañamiento o indicación del personal", "embarazo", ["whatsapp", "impreso"],
      "Hola {{nombre}}, recuerde tomar agua durante el día: un vaso cada vez que pueda, más si hace calor. Si orina poco o siente mareo, avísenos."),
    T("F02", "cuidado", "alimentacion", "Alimentación variada", "tip de acompañamiento nutricional", "embarazo", ["whatsapp", "impreso"],
      "Hola {{nombre}}, coma variado: fruta, verdura, frijol y proteína cada día; evite frituras y refrescos. En su control revisamos su plan."),
    T("F03", "cuidado", "descanso", "Descanso y sueño", "tip de acompañamiento o indicación de descanso", "embarazo", ["whatsapp", "impreso"],
      "Hola {{nombre}}, descanse lo que pueda: duerma del lado izquierdo con una almohada entre las piernas si le resulta cómodo. Si no puede dormir por dolor o preocupación, coméntenos."),
    T("F04", "cuidado", "actividad", "Actividad física autorizada", "tip de acompañamiento", "embarazo", ["whatsapp", "impreso"],
      "Hola {{nombre}}, camine 20 a 30 minutos al día si su médico lo autoriza; pare si siente dolor, mareo o contracciones."),
    T("F05", "cuidado", "suplementos", "Prenatal diario", "indicación de suplemento", "embarazo", ["whatsapp", "impreso"],
      "Hola {{nombre}}, tome su pastilla prenatal todos los días, preferiblemente a la misma hora. Si le produce malestar, tómela con comida y avísenos."),
    T("F06", "cuidado", "suplementos", "Cómo tomar su hierro", "indicación de hierro", "embarazo", ["whatsapp", "impreso"],
      "Hola {{nombre}}, tome su hierro con algo de vitamina C (un limón o una fruta) y evite tomarlo con café o leche. En su control revisamos cómo le va."),
    T("F07", "cuidado", "suplementos", "Cómo tomar su calcio", "indicación de calcio", "embarazo", ["whatsapp", "impreso"],
      "Hola {{nombre}}, tome su calcio en horarios separados de su hierro; ayuda a sus huesos y a los de su bebé."),
    T("F08", "cuidado", "preparacion", "Preparación del pecho", "semana 36 en adelante o indicación", "embarazo", ["whatsapp", "impreso"],
      "Hola {{nombre}}, ya puede preparar su pecho: lave con agua y jabón neutro y no pele la piel; el calostro sale solo. Si se agrieta, avísenos."),
    T("F09", "cuidado", "higiene", "Higiene y cambios normales", "tip de acompañamiento", "embarazo", ["whatsapp", "impreso"],
      "Hola {{nombre}}, use ropa cómoda y transpirable, lávese con jabón neutro y vigile cualquier olor o picazón fuerte: si aparece, avísenos."),
    T("F10", "cuidado", "bucal", "Salud bucal", "orientación bucal del embarazo", "embarazo", ["whatsapp", "impreso"],
      "Hola {{nombre}}, cuide sus encías: lávese después de cada comida y acuda al dentista en el segundo trimestre si le sangran."),
    T("F11", "cuidado", "sexualidad", "Sexualidad en el embarazo", "orientación íntima del embarazo", "embarazo", ["whatsapp"],
      "Hola {{nombre}}, si mantiene relaciones y está cómoda, no hay problema mientras no haya sangrado ni dolor. Si aparece alguno, avísenos y suspenda."),
    T("F12", "cuidado", "laboral", "Trabajo y embarazo", "orientación laboral", "embarazo", ["whatsapp", "impreso"],
      "Hola {{nombre}}, si su trabajo exige esfuerzo o estar mucho tiempo de pie, pida su adaptación con este documento. Levántese y camine un rato cada hora."),
    T("F13", "cuidado", "viajes", "Viajes y traslados", "viaje programado o indicación", "embarazo", ["whatsapp", "impreso"],
      "Hola {{nombre}}, si va a viajar: lleve su expediente, hidratése y muévase cada hora. Después de la semana 34, evite viajes largos sin consultarnos."),
    T("F14", "cuidado", "peso", "Ganancia de peso saludable", "control de peso por trimestre", "embarazo", ["whatsapp", "impreso"],
      "Hola {{nombre}}, su ganancia de peso se revisa en cada control: no se preocupe por un solo número; cuidamos la tendencia juntos."),
    T("F15", "cuidado", "emocional", "Estrés y acompañamiento emocional", "solicitud del personal o de la paciente", "general", ["whatsapp", "llamada"],
      "Hola {{nombre}}, si siente mucho estrés, hablemos: en su próxima cita podemos buscar apoyo. Pedir ayuda también es cuidarse."),
    T("F16", "cuidado", "preparacion", "Qué llevar a su cita", "semana 36 en adelante o primera visita", "general", ["whatsapp", "impreso"],
      "Hola {{nombre}}, lleve siempre su expediente y una lista de sus preguntas; en la bolsa del hospital: documentación, ropa para usted y para su bebé, y lo que le guste para el parto."),
    T("F17", "cuidado", "malestares", "Malestares comunes — náuseas", "orientación por náuseas", "embarazo", ["whatsapp", "impreso"],
      "Hola {{nombre}}, para las náuseas: coma poquito y seguido, evite olores fuertes y no se quede en ayunas. Si vomita mucho y no puede tomar líquidos, avísenos."),
    T("F18", "cuidado", "preparacion", "Respiración para el trabajo de parto", "preparación para el parto", "embarazo", ["whatsapp", "impreso"],
      "Hola {{nombre}}, practique respiración profunda 5 minutos al día: inhalar por la nariz y exhalar por la boca. Le servirá en el trabajo de parto."),

    /* — ALARMAS: señales de alarma, uso inmediato (14) — */
    T("A01", "alarma", "inmediato", "Alarma — cefalea intensa", "señal de alarma: decisión del personal o aviso de la paciente", "embarazo", ["llamada", "whatsapp", "impreso"],
      "Hola {{nombre}}, la cefalea intensa es una señal de alarma: no tome medicamento por su cuenta y acuda hoy. Si es muy fuerte o viene con visión borrosa, venga de inmediato."),
    T("A02", "alarma", "inmediato", "Alarma — visión borrosa", "señal de alarma", "embarazo", ["llamada", "whatsapp", "impreso"],
      "Hola {{nombre}}, la visión borrosa es una señal de alarma: acuda hoy o llámenos; si además tiene cefalea, venga de inmediato."),
    T("A03", "alarma", "inmediato", "Alarma — hinchazón súbita", "señal de alarma", "embarazo", ["llamada", "whatsapp", "impreso"],
      "Hola {{nombre}}, la hinchazón repentina de cara o manos es señal de alarma: acuda hoy sin faltar."),
    T("A04", "alarma", "inmediato", "Alarma — sangrado genital", "señal de alarma", "embarazo", ["llamada", "whatsapp", "impreso"],
      "Hola {{nombre}}, cualquier sangrado es señal de alarma: venga de inmediato o llame a emergencias; no se quede en casa a esperar."),
    T("A05", "alarma", "inmediato", "Alarma — falta de aire", "señal de alarma", "embarazo", ["llamada", "whatsapp", "impreso"],
      "Hola {{nombre}}, la dificultad para respirar es señal de alarma: venga de inmediato o llame a emergencias."),
    T("A06", "alarma", "inmediato", "Alarma — fiebre", "señal de alarma", "puerperio", ["llamada", "whatsapp"],
      "Hola {{nombre}}, la fiebre es señal de alarma: tómese líquidos y avísenos hoy; si es alta o viene con escalofríos, acuda ya."),
    T("A07", "alarma", "inmediato", "Alarma — contracciones seguidas", "señal de alarma", "embarazo", ["llamada", "whatsapp", "impreso"],
      "Hola {{nombre}}, si siente el vientre duro seguido y con dolor, anote cada cuánto vienen y avísenos; si son seguidas, venga de inmediato."),
    T("A08", "alarma", "inmediato", "Alarma — movimiento fetal disminuido", "señal de alarma", "embarazo", ["llamada", "whatsapp"],
      "Hola {{nombre}}, si su bebé mueve menos que lo habitual: tome agua, acuéstese del lado izquierdo y avísenos hoy; si no responde, venga de inmediato."),
    T("A09", "alarma", "inmediato", "Alarma — dolor en la boca del estómago", "señal de alarma", "embarazo", ["llamada", "whatsapp"],
      "Hola {{nombre}}, el dolor fuerte en la parte alta del abdomen es señal de alarma: acuda hoy."),
    T("A10", "alarma", "inmediato", "Alarma — dolor abdominal intenso", "señal de alarma", "embarazo", ["llamada", "whatsapp"],
      "Hola {{nombre}}, el dolor fuerte y continuo del vientre es señal de alarma: venga de inmediato."),
    T("A11", "alarma", "inmediato", "Alarma — pérdida de líquido", "señal de alarma", "embarazo", ["llamada", "whatsapp"],
      "Hola {{nombre}}, si siente que perdió líquido: no se bañe ni tenga relaciones, y venga de inmediato con su expediente."),
    T("A12", "alarma", "inmediato", "Alarma — crisis o convulsión", "señal de alarma", "embarazo", ["llamada"],
      "Hola {{nombre}}, si presenta una crisis: proteja su cabeza, no le meta nada en la boca y llame a emergencias de inmediato; después avísenos."),
    T("A13", "alarma", "inmediato", "Alarma — herida con señales de alarma", "postparto o postquirúrgico", "puerperio", ["llamada", "whatsapp"],
      "Hola {{nombre}}, si su herida enrojece, supura o huele mal, avísenos hoy: a tiempo se trata."),
    T("A14", "alarma", "inmediato", "Alarma — hinchazón o dolor en una pierna", "señal de alarma", "general", ["llamada", "whatsapp"],
      "Hola {{nombre}}, la hinchazón o el dolor en una sola pierna es señal de alarma: acuda hoy.")
  ]);

  /* ——— Marcadores: se resuelven con lo que el expediente ya sabe ——— */
  function semanaDerivada(p) {
    if (!p || p.egIncerta || !p.fechaEstimada) return null;
    var dias = diasEntre(hoyISO(), p.fechaEstimada); /* días hasta el parto estimado */
    var eg = Math.floor((280 - dias) / 7);
    return (eg >= 1 && eg <= 42) ? eg : null;
  }
  function trimestreDe(s) { return s == null ? null : s <= 13 ? "primer trimestre" : s <= 27 ? "segundo trimestre" : "tercer trimestre"; }

  function resolver(texto, p, ctx) {
    ctx = ctx || {};
    var faltantes = [];
    var r = String(texto).replace(/\{\{(\w+)\}\}/g, function (todo, m) {
      switch (m) {
        case "nombre": return p ? p.nombre : "";
        case "nombre_completo": return p ? p.completo : "";
        case "unidad": return (p && p.unidad) || ctx.unidad || "el consultorio";
        case "telefono_unidad": return ctx.telefonoUnidad || "el teléfono del consultorio";
        case "horario_unidad": return "de " + HORARIO.abre + " a " + HORARIO.cierra;
        case "fecha_cita": if (ctx.fechaCita) return fechaLarga(ctx.fechaCita); faltantes.push(m); return todo;
        case "hora_cita": if (ctx.horaCita) return ctx.horaCita; faltantes.push(m); return todo;
        case "fecha_original":
          if (ctx.fechaOriginal) return fechaLarga(ctx.fechaOriginal);
          if (ctx.fechaOriginalTexto) return ctx.fechaOriginalTexto;
          faltantes.push(m); return todo;
        case "fecha_cierre": if (ctx.fechaCierre) return fechaLarga(ctx.fechaCierre); faltantes.push(m); return todo;
        case "opciones_reprogramacion": if (ctx.opciones) return ctx.opciones; faltantes.push(m); return todo;
        case "motivo_general": return ctx.motivo || "causas imprevistas del consultorio";
        case "documento": if (ctx.documento) return ctx.documento; faltantes.push(m); return todo;
        case "semana": { var s = semanaDerivada(p); if (s) return String(s); faltantes.push(m); return todo; }
        case "trimestre": { var t = trimestreDe(semanaDerivada(p)); if (t) return t; faltantes.push(m); return todo; }
        case "signos_alarma": return SIGNOSALARMA;
        case "desarrollo_bebe": {
          var sd = semanaDerivada(p);
          var fila = sd ? SEMANAS[sd - 1] : null;
          if (fila && fila.desarrollo) return fila.desarrollo;
          faltantes.push(m); return todo;
        }
        case "cuidado_semana": {
          var sc = semanaDerivada(p);
          var fila2 = sc ? SEMANAS[sc - 1] : null;
          if (fila2 && fila2.cuidado) return fila2.cuidado;
          faltantes.push(m); return todo;
        }
        case "interno_analito": case "interno_valor": case "interno_rango":
        case "interno_diagnostico": case "interno_homa":
          faltantes.push(m); return todo;
        default: faltantes.push(m); return todo;
      }
    });
    var limpio = faltantes.length === 0 && r.indexOf("{{") < 0;
    return { texto: r, faltantes: faltantes, listo: limpio };
  }

  /* ——— Examen de inocuidad (frontera DEC-32). El MOTOR se niega a entregar. ——— */
  var PROHIBIDO = [
    /mg\/dL/i, /g\/dL/i, /µU\/mL/i, /mmHg/i, /mmol/i, /µg\/(dl|l|mL)/i,
    /HOMA/i,
    /(hemoglobina|glucosa|plaquetas|insulina|bilirrubina|creatinina|colesterol|triglic[ée]ridos|[áa]cido [úu]rico|ldh|hematocrito)\s*(del|de|en|:)?\s*\d/i,
    /\d+[.,]\d+/,
    /\b\d+\s*(mg|mcg|µg|g|ml|cm|mm|kg|lpm|lat)\b/i,
    /preeclampsia/i, /vph/i, /diabetes/i, /anemia/i, /colpitis/i, /hipertensi[óo]n/i,
    /tiroides/i, /neoplasia/i, /c[áa]ncer/i, /tumoraci[óo]n/i, /duelo/i,
    /infecci[óo]n/i, /sepsis/i, /eclampsia/i, /depresi[óo]n/i, /diagn[óo]stico\s*:/i,
    /\{\{interno/
  ];
  function examenInocuidad(texto) {
    var malos = [];
    PROHIBIDO.forEach(function (re) { if (re.test(String(texto))) malos.push(String(re)); });
    return malos;
  }

  /* ——— Semilla: diagnóstico ESTRUCTURADO por paciente, consentimientos, disparos ——— */
  function semilla() {
    function feDesdeEg(eg) { return fechaMas(280 - eg * 7); }
    return {
      version: 2,
      pacientes: [
        { id: "p1", nombre: "María", completo: "García Luna, María", nacimiento: "1994-08-08", caso: "Embarazo 28 semanas", diagnostico: "embarazo_normal", fechaEstimada: feDesdeEg(28), egIncerta: false, telefono: "951 123 4567", unidad: "Consultorio Maternidad", consentimiento: { whatsapp: true }, etiquetas: ["embarazo"], disparos: ["hemoglobina_alerta"] },
        { id: "p2", nombre: "Gabriela", completo: "Peña Sandoval, Gabriela", nacimiento: "1993-04-12", caso: "Embarazo 34 semanas", diagnostico: "embarazo_normal", fechaEstimada: feDesdeEg(34), egIncerta: false, telefono: "951 234 5678", unidad: "Consultorio Maternidad", consentimiento: { whatsapp: true }, etiquetas: ["embarazo"], disparos: [] },
        { id: "p3", nombre: "Ivonne", completo: "Klein Ortiz, Ivonne", nacimiento: "1993-06-17", caso: "Embarazo 30 semanas", diagnostico: "embarazo_normal", fechaEstimada: feDesdeEg(30), egIncerta: false, telefono: "951 345 6789", unidad: "Consultorio Maternidad", consentimiento: { whatsapp: true }, etiquetas: ["embarazo"], disparos: ["tamizaje_vencido"] },
        { id: "p4", nombre: "Rosa", completo: "Luna Gómez, Rosa", nacimiento: "1987-05-11", caso: "VPH — aplicación 2 de 4", diagnostico: "vacunacion_vph", fechaEstimada: null, egIncerta: false, telefono: "951 456 7890", unidad: "Consultorio Maternidad", consentimiento: { whatsapp: true }, etiquetas: ["vacunacion"], disparos: [] },
        { id: "p5", nombre: "Julieta", completo: "Leal Fuentes, Julieta", nacimiento: "1986-12-12", caso: "Revisión de duelo obstétrico", diagnostico: "duelo", fechaEstimada: null, egIncerta: false, telefono: "951 567 8901", unidad: "Consultorio Maternidad", consentimiento: { whatsapp: false }, etiquetas: ["duelo"], disparos: [] },
        { id: "p6", nombre: "Fernanda", completo: "Serrano Dávila, Fernanda", nacimiento: "1976-08-29", caso: "Tumoración uterina — revisión programada", diagnostico: "tumoracion", fechaEstimada: null, egIncerta: false, telefono: "951 678 9012", unidad: "Consultorio Maternidad", consentimiento: { whatsapp: true }, etiquetas: ["tumoracion"], disparos: [] },
        { id: "p7", nombre: "Brenda", completo: "Herrera Luz, Brenda", nacimiento: "1990-09-15", caso: "Fertilidad — día 6 del protocolo", diagnostico: "fertilidad", fechaEstimada: null, egIncerta: false, telefono: "951 789 0123", unidad: "Consultorio Maternidad", consentimiento: { whatsapp: true }, etiquetas: ["fertilidad"], disparos: [] },
        { id: "p8", nombre: "Carolina", completo: "Díaz Paredes, Carolina", nacimiento: "1998-10-14", caso: "Puerperio día 15 — control", diagnostico: "puerperio", fechaEstimada: null, egIncerta: false, telefono: "951 890 1234", unidad: "Consultorio Maternidad", consentimiento: { whatsapp: true }, etiquetas: ["puerperio"], disparos: ["falta_documento"] }
      ],
      citas: [
        { id: "c1", pid: "p1", fecha: hoyISO(), hora: "10:00", motivo: "control prenatal", estado: "agendada" },
        { id: "c2", pid: "p5", fecha: hoyISO(), hora: "12:20", motivo: "revisión sensible", estado: "agendada" },
        { id: "c3", pid: "p6", fecha: hoyISO(), hora: "12:30", motivo: "revisión programada", estado: "agendada" }
      ],
      pedidos: [],
      propias: [],
      entregas: [],
      semanasPropias: []
    };
  }

  var S = null;
  function cargar() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) { S = JSON.parse(raw); if (S && S.version === 2) return S; }
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
  function plantillas() { return CATALOGO.slice(); }
  function plantilla(id) {
    for (var i = 0; i < CATALOGO.length; i++) if (CATALOGO[i].id === id) return CATALOGO[i];
    for (var j = 0; j < S.propias.length; j++) if (S.propias[j].id === id) return S.propias[j];
    return null;
  }
  function semanaFila(n) { return SEMANAS[n - 1] || null; }
  function editarSemana(n, desarrollo, cuidado, autor) {
    var previa = null;
    S.semanasPropias.forEach(function (x) { if (x.semana === n) previa = x; });
    if (previa) { previa.desarrollo = desarrollo; previa.cuidado = cuidado; previa.autor = autor; previa.editada = hoyISO(); }
    else S.semanasPropias.push({ semana: n, desarrollo: desarrollo, cuidado: cuidado, autor: autor || "equipo", editada: hoyISO(), borrador: true });
    guardar();
    return true;
  }
  function filaViva(n) {
    var propia = null;
    S.semanasPropias.forEach(function (x) { if (x.semana === n) propia = x; });
    return propia || SEMANAS[n - 1] || null;
  }

  /* ——— Patrones: el sistema propone, el equipo decide ——— */
  var PATRONES = {
    embarazo: function (semana) {
      var s = semana || null;
      var dias = (s == null) ? 28 : s <= 28 ? 28 : s <= 35 ? 14 : 7;
      var cad = dias === 28 ? "4 semanas" : dias === 14 ? "2 semanas" : "1 semana";
      return { dias: dias, motivo: s == null ? "control prenatal — sin semana derivada, patrón inicial (cada 4 semanas)" : "control prenatal — patrón de la semana " + s + " (cada " + cad + ")" };
    }
  };
  function patronDe(p) {
    var dx = p && p.diagnostico && DIAGNOSTICOS[p.diagnostico];
    if (dx) {
      if (dx.patron === "embarazo") return PATRONES.embarazo(semanaDerivada(p));
      return { dias: dx.patron.dias, motivo: dx.patron.motivo };
    }
    var c = ((p && p.caso) || "").toLowerCase();
    if (c.indexOf("embarazo") >= 0) return PATRONES.embarazo(semanaDerivada(p));
    if (c.indexOf("puerperio") >= 0) return { dias: 14, motivo: "puerperio (por texto de la ficha — capturar diagnóstico)" };
    if (c.indexOf("fertilidad") >= 0) return { dias: 7, motivo: "fertilidad (por texto de la ficha — capturar diagnóstico)" };
    return { dias: 28, motivo: "control general (patrón por defecto: cada 4 semanas)" };
  }
  function fuenteDe(p) {
    if (p && p.diagnostico && DIAGNOSTICOS[p.diagnostico]) {
      if (DIAGNOSTICOS[p.diagnostico].patron === "embarazo") {
        return semanaDerivada(p) ? "semana derivada de la fecha estimada" : "embarazo sin semana derivada — patrón inicial";
      }
      return "diagnóstico estructurado de la ficha (" + DIAGNOSTICOS[p.diagnostico].nombre + ")";
    }
    return "texto de la ficha (capturar diagnóstico estructurado)";
  }

  /* ——— Disponibilidad: huecos reales del consultorio ——— */
  function minAHora(min) { var h = Math.floor(min / 60), m = min % 60; return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m; }
  function horaAMin(hora) { var p = String(hora || "").split(":"); return parseInt(p[0], 10) * 60 + (parseInt(p[1], 10) || 0); }
  function citasPorFecha(fecha) {
    return S.citas.filter(function (c) { return c.fecha === fecha && c.estado !== "cancelada"; })
      .sort(function (a, b) { return horaAMin(a.hora) - horaAMin(b.hora); });
  }
  function horaOcupada(fecha, hora) {
    return citasPorFecha(fecha).some(function (c) { return c.hora === hora; });
  }
  function horasOcupadas(fecha) { return citasPorFecha(fecha).map(function (c) { return c.hora; }); }
  function siguienteLibre(fecha, desdeHora) {
    var ini = horaAMin(desdeHora || HORARIO.abre), fin = horaAMin(HORARIO.cierra);
    var ocupadas = horasOcupadas(fecha);
    for (var m = ini; m <= fin - HORARIO.pasoMin; m += HORARIO.pasoMin) {
      var h = minAHora(m);
      if (ocupadas.indexOf(h) < 0) return h;
    }
    return null;
  }
  function sugerir(p) {
    var pr = patronDe(p);
    var f = fechaMas(pr.dias);
    var conflicto = horaOcupada(f, "09:00");
    var hora = conflicto ? (siguienteLibre(f, "09:00") || HORARIO.abre) : "09:00";
    return {
      fecha: f, hora: hora, motivo: pr.motivo, fuente: fuenteDe(p),
      conflictoResuelto: conflicto, ocupadas: horasOcupadas(f),
      huecoLibre: siguienteLibre(f, HORARIO.abre)
    };
  }
  function agendar(pid, fecha, hora, motivo) {
    if (!fecha || !hora) return { ok: false, mensaje: "Faltan fecha u hora: nada se agenda a medias." };
    if (horaOcupada(fecha, hora)) {
      var libre = siguienteLibre(fecha, hora);
      return { ok: false, mensaje: "Ese horario ya está ocupado. Le sugerimos: " + (libre || "otro horario del catálogo") + (libre ? "" : " (revise el horario del consultorio).") };
    }
    var c = { id: "c" + uid(), pid: pid, fecha: fecha, hora: hora, motivo: motivo, estado: "agendada" };
    S.citas.push(c);
    guardar();
    return { ok: true, cita: c };
  }
  function reprogramar(citaId, fecha, hora) {
    for (var i = 0; i < S.citas.length; i++) {
      var c = S.citas[i];
      if (c.id === citaId) {
        if (horaOcupada(fecha, hora)) return { ok: false, mensaje: "Ese horario ya está ocupado: elija otro hueco." };
        c.fechaOriginal = c.fecha; c.horaOriginal = c.hora;
        c.fecha = fecha; c.hora = hora; c.estado = "reprogramada";
        guardar();
        return { ok: true, cita: c };
      }
    }
    return { ok: false, mensaje: "No aparece esa cita." };
  }
  function cancelar(citaId) {
    for (var i = 0; i < S.citas.length; i++) {
      if (S.citas[i].id === citaId) { S.citas[i].estado = "cancelada"; guardar(); return S.citas[i]; }
    }
    return null;
  }
  function confirmar(citaId) {
    for (var i = 0; i < S.citas.length; i++) {
      if (S.citas[i].id === citaId) { S.citas[i].estado = "confirmada"; guardar(); return S.citas[i]; }
    }
    return null;
  }

  /* ——— Preguntar a la paciente y registrar su respuesta (disponibilidad) ——— */
  function pedirDisponibilidad(pid, quien) {
    var d = { id: "d" + uid(), pid: pid, plantilla: "L03", fecha: hoyISO(), estado: "pendiente", quien: quien || "equipo", respuesta: null };
    S.pedidos.push(d);
    guardar();
    return d;
  }
  function responderDisponibilidad(pedidoId, fecha, hora) {
    for (var i = 0; i < S.pedidos.length; i++) {
      var d = S.pedidos[i];
      if (d.id === pedidoId) {
        var r = agendar(d.pid, fecha, hora, "cita por disponibilidad pedida");
        if (!r.ok) return r;
        d.estado = "respondida";
        d.respuesta = { fecha: fecha, hora: hora };
        guardar();
        return { ok: true, cita: r.cita };
      }
    }
    return { ok: false, mensaje: "No aparece ese pedido." };
  }
  function pedidosPendientes() { return S.pedidos.filter(function (d) { return d.estado === "pendiente"; }); }

  /* ——— Plantillas personalizadas: se guardan CON sus marcadores (re-resolubles) ——— */
  function crearPropia(baseId, texto, autor) {
    var base = plantilla(baseId);
    var t = {
      id: "P" + uid(), familia: base ? base.familia : "logistica", subfamilia: base ? base.subfamilia : "propia",
      nombre: base ? base.nombre + " (copia)" : "Plantilla", disparo: base ? "personalizada de " + base.id : "personalizada",
      poblacion: base ? base.poblacion : "general", canales: base ? base.canales : ["whatsapp"],
      borrador: true, propia: true, baseId: baseId, autor: autor || "equipo", creada: hoyISO(), texto: texto
    };
    if (!base) t.borrador = base && base.borrador;
    else t.borrador = base.borrador;
    S.propias.push(t);
    guardar();
    return t;
  }
  function crearBlanca(datos, autor) {
    if (!datos || !datos.nombre || !String(datos.nombre).trim()) return { ok: false, mensaje: "La plantilla necesita un nombre." };
    if (!datos.texto || !String(datos.texto).trim()) return { ok: false, mensaje: "La plantilla necesita un texto." };
    var malos = examenInocuidad(datos.texto);
    if (malos.length) return { ok: false, mensaje: "El texto no pasa el examen de inocuidad: contiene elementos prohibidos para el paciente — edítenlo." };
    if (String(datos.texto).indexOf("{{") >= 0) {
      var r = resolver(datos.texto, null, {});
      if (r.faltantes.length) return { ok: false, mensaje: "Marcadores sin resolver: " + r.faltantes.join(", ") + ". Use solo marcadores soportados." };
    }
    if (String(datos.texto).indexOf("{{nombre}}") < 0) return { ok: false, mensaje: "Sin {{nombre}} el mensaje sale sin nombre: agréguelo (o guárdela como recordatorio interno)." };
    var t = {
      id: "N" + uid(), familia: datos.familia || "logistica", subfamilia: datos.subfamilia || "propia",
      nombre: String(datos.nombre).trim(), disparo: datos.disparo || "personal (definida por el equipo)",
      poblacion: datos.poblacion || "general", canales: datos.canales && datos.canales.length ? datos.canales : ["whatsapp"],
      borrador: true, propia: true, origen: "blanca", autor: autor || "equipo", creada: hoyISO(), texto: datos.texto
    };
    S.propias.push(t);
    guardar();
    return { ok: true, plantilla: t };
  }
  function eliminarPropia(id) {
    S.propias = S.propias.filter(function (t) { return t.id !== id; });
    guardar();
  }

  /* ——— Entrega: el motor VALIDA (inocuidad + resolución + dedupe semanal) ——— */
  function yaEntregada(plantillaId, pid, clave) {
    return S.entregas.some(function (e) {
      if (e.plantillaId !== plantillaId || e.pid !== pid) return false;
      return clave ? e.clave === clave : true;
    });
  }
  function entregar(plantillaId, pid, canal, texto, clave) {
    if (!texto || String(texto).indexOf("{{") >= 0) return { ok: false, mensaje: "El mensaje no está resuelto: no se entrega con marcadores vivos." };
    var malos = examenInocuidad(texto);
    if (malos.length) return { ok: false, mensaje: "Examen de inocuidad: contiene elementos prohibidos para el paciente. No se entrega." };
    var p = paciente(pid);
    if (p && p.consentimiento && p.consentimiento[canal] === false)
      return { ok: false, mensaje: "Sin consentimiento de " + canal + " para esta paciente: use otro canal o la hoja impresa." };
    if (clave && yaEntregada(plantillaId, pid, clave))
      return { ok: false, mensaje: "Ya se entregó esa plantilla con la misma clave (" + clave + ") — deduplicado." };
    var e = { id: "e" + uid(), plantillaId: plantillaId, pid: pid, canal: canal, fecha: hoyISO(), hora: minAHora(new Date().getHours() * 60 + new Date().getMinutes()), texto: texto, clave: clave || null };
    S.entregas.push(e);
    guardar();
    return { ok: true, entrega: e };
  }
  function anularEntrega(eid) {
    S.entregas = S.entregas.filter(function (e) { return e.id !== eid; });
    guardar();
  }
  function metricaMensajes() {
    var semanaClaves = {};
    var duplicadosEvitados = 0;
    S.entregas.forEach(function (e) {
      if (e.clave) {
        var k = e.plantillaId + "|" + e.pid + "|" + e.clave;
        if (semanaClaves[k]) duplicadosEvitados++;
        else semanaClaves[k] = 1;
      }
    });
    var porCanal = { whatsapp: 0, llamada: 0, impreso: 0 };
    S.entregas.forEach(function (e) { if (porCanal[e.canal] != null) porCanal[e.canal]++; });
    return { total: S.entregas.length, porCanal: porCanal, conClave: S.entregas.filter(function (e) { return !!e.clave; }).length, enEsperaDedupe: duplicadosEvitados, catalogo: CATALOGO.length, semanas: SEMANAS.length };
  }

  /* ——— Recomendadas para una paciente: no navegue 100+ a ciegas ——— */
  function recomendadas(pid) {
    var p = paciente(pid);
    if (!p) return [];
    var sem = semanaDerivada(p);
    var et = (p.etiquetas || []).slice();
    if (sem) et.push("t" + (sem <= 13 ? "1" : sem <= 27 ? "2" : "3"));
    var disp = p.disparos || [];
    var tieneCita = S.citas.some(function (c) { return c.pid === pid && c.estado !== "cancelada"; });
    var orden = { alarma: 0, laboratorio: 1, semana: 2, logistica: 3, diagnostico: 4, cuidado: 5 };
    var res = CATALOGO.filter(function (t) {
      if (t.familia === "laboratorio") {
        if (t.id === "B01") return disp.indexOf("hemoglobina_alerta") >= 0;
        if (t.id === "B02") return disp.indexOf("tamizaje_vencido") >= 0;
        return false;
      }
      if (t.id === "L13") return disp.indexOf("falta_documento") >= 0;
      if (t.id === "L06") return false; /* solo tras una inasistencia registrada */
      if (t.poblacion !== "general") return et.indexOf(t.poblacion) >= 0;
      if (t.familia === "logistica" && t.id === "L01") return tieneCita;
      if (t.familia === "logistica" && t.id === "L02") return tieneCita;
      if (t.familia === "logistica" && t.id === "L12") return tieneCita;
      return true;
    });
    res.sort(function (a, b) {
      var fa = a.familia === "laboratorio" ? 1 : orden[a.familia];
      var fb = b.familia === "laboratorio" ? 1 : orden[b.familia];
      return fa - fb;
    });
    return res;
  }

  cargar();

  return {
    hoyISO: hoyISO, fechaMas: fechaMas, fechaLarga: fechaLarga, diasEntre: diasEntre, esc: esc,
    SIGNOSALARMA: SIGNOSALARMA, CANALES: CANALES, HORARIO: HORARIO,
    SEMANAS: SEMANAS, CATALOGO: CATALOGO, PATRONES: PATRONES, DIAGNOSTICOS: DIAGNOSTICOS,
    estado: estado, paciente: paciente, plantillas: plantillas, plantilla: plantilla,
    semanaFila: semanaFila, filaViva: filaViva, editarSemana: editarSemana,
    semanaDerivada: semanaDerivada, trimestreDe: trimestreDe,
    patronDe: patronDe, fuenteDe: fuenteDe, sugerir: sugerir,
    citasPorFecha: citasPorFecha, horaOcupada: horaOcupada, horasOcupadas: horasOcupadas,
    siguienteLibre: siguienteLibre, agendar: agendar, reprogramar: reprogramar,
    cancelar: cancelar, confirmar: confirmar,
    pedirDisponibilidad: pedirDisponibilidad, responderDisponibilidad: responderDisponibilidad, pedidosPendientes: pedidosPendientes,
    resolver: resolver, examenInocuidad: examenInocuidad,
    crearPropia: crearPropia, crearBlanca: crearBlanca, eliminarPropia: eliminarPropia,
    yaEntregada: yaEntregada, entregar: entregar, anularEntrega: anularEntrega,
    metricaMensajes: metricaMensajes, recomendadas: recomendadas,
    reiniciar: reiniciar, guardar: guardar
  };
})();
