# -*- coding: utf-8 -*-
"""Genera las réplicas base de GUIAS/EDICION/ desde el programa real.

Regla: solo crea las que FALTAN — jamás sobrescribe (las editadas a mano por dictamen
del dueño viven ahí). Uso:  python3 generar_base.py [--forzar]
"""
import html
import importlib.util
import os
import sys

RAIZ = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
sys.path.insert(0, RAIZ)
SALIDA = os.path.dirname(os.path.abspath(__file__))
FZ = "--forzar" in sys.argv

spec = importlib.util.spec_from_file_location("app_mod", os.path.join(RAIZ, "app.py"))
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)
cat = m.catalogo_pantallas()
NOMBRES = m.NOMBRES_PANTALLA
AYUDAS = m.AYUDAS
LATERAL = list(getattr(m, "ORDEN_LATERAL", ()))
VERSION = open(os.path.join(RAIZ, "VERSION")).read().strip()

CSS = """
* { box-sizing: border-box; }
body { margin:0; font-family: Arial, Helvetica, sans-serif; background:#eef2f5; color:#222; }
.barra { background:#1b4f72; color:#fff; display:flex; align-items:center; gap:14px;
         padding:10px 16px; }
.barra .marca { font-size:20px; font-weight:bold; }
.barra .pantalla { color:#cfe0ec; font-size:15px; }
.barra .ayuda { margin-left:auto; background:#fff; color:#1b4f72; border:none;
                padding:8px 26px; font-size:14px; border-radius:2px; }
.cuerpo { display:flex; min-height:92vh; }
.lateral { width:190px; background:#f7f9fb; padding-top:14px; }
.lateral div { padding:11px 16px; font-size:14px; color:#333; }
.lateral div.activo { background:#d6e6f3; color:#1b4f72; font-weight:bold; }
.zona { flex:1; padding:20px 26px; }
.replica-top { background:#fff6d8; border:1px solid #e0cf8a; padding:8px 12px;
               font-size:13px; margin-bottom:14px; color:#5a4a10; }
h1 { font-size:22px; margin:0 0 6px 0; color:#12263a; }
.sub { color:#445; font-size:14px; margin-bottom:16px; max-width:760px; line-height:1.45; }
.tarjeta { background:#fff; border:1px solid #dde5ea; padding:18px 20px; max-width:640px;
           border-radius:2px; }
.campo { margin-bottom:12px; }
.campo label { display:block; font-size:13px; color:#334; margin-bottom:4px; }
.campo input, .campo select, .campo textarea { width:100%; padding:7px 9px; font-size:14px;
           border:1px solid #b9c8d4; border-radius:2px; background:#fbfdff; }
.campo input:disabled { color:#333; }
.campo .ob { color:#8a1c1c; font-weight:bold; font-size:11px; margin-left:6px; }
.botones { margin-top:14px; display:flex; gap:10px; flex-wrap:wrap; }
.boton { background:#1b6ca8; color:#fff; border:none; padding:9px 26px; font-size:14px;
         border-radius:2px; }
.boton.sec { background:#e8eef3; color:#1b4f72; }
.resultado { background:#fff; border:1px solid #dde5ea; margin-top:16px; padding:12px 16px;
             max-width:640px; font-size:13px; color:#445; }
.dictamen { max-width:900px; background:#f2fff2; border:1px solid #9fd49f; margin:26px auto;
            padding:14px 16px; font-size:14px; }
.dictamen b { color:#1d5c1d; }
footer { text-align:center; font-size:12px; color:#667; padding:18px; }
.cambio { border:2px solid #2e9e4f; background:#eefaf0; padding:8px 12px; margin:10px 0;
          font-size:14px; }
"""

TIPO_INPUT = {"clave": "password", "fecha": "text", "texto": "text", "cifra": "text",
              "numero": "text", "ruta": "text"}


def lateral_html(activo):
    items = []
    for cid in LATERAL:
        if cid not in cat:
            continue
        cls = ' class="activo"' if cid == activo else ""
        items.append('<div%s>%s</div>' % (cls, html.escape(NOMBRES.get(cid, cid))))
    return '<div class="lateral">%s</div>' % "".join(items)


def campos_html(cid, sp):
    bloques = []
    for c in (sp.campos or ()):
        etiqueta = html.escape(str(c.get("etiqueta", "")))
        ob = '<span class="ob">(obligatorio)</span>' if c.get("obligatorio") else ""
        tipo = c.get("tipo", "texto")
        if tipo == "bandera":
            entrada = '<input type="checkbox" disabled> <span style="font-size:13px">%s</span>' % etiqueta
            bloques.append('<div class="campo">%s</div>' % entrada)
            continue
        itipo = TIPO_INPUT.get(tipo, "text")
        extra = ' placeholder="📅 elegir"' if tipo == "fecha" else ""
        if c.get("tipo") == "opcion":
            entrada = '<select disabled><option>— elegir de la lista —</option></select>'
        else:
            entrada = '<input type="%s" disabled%s>' % (itipo, extra)
        bloques.append('<div class="campo"><label>%s %s</label>%s</div>'
                       % (etiqueta, ob, entrada))
    return "".join(bloques) or '<div class="campo"><i>(esta pantalla no tiene casillas)</i></div>'


def botones_html(cid, sp):
    try:
        from app import etiqueta_accion
        etq = etiqueta_accion
    except Exception:
        etq = lambda a: a.capitalize()
    botones = ['<button class="boton">%s</button>' % html.escape(etq(a))
               for a in (sp.acciones_primarias or ())]
    return '<div class="botones">%s</div>' % "".join(botones)


def pagina(cid):
    sp, _ = cat[cid]
    nombre = NOMBRES.get(cid, cid)
    ayuda = AYUDAS.get(cid, {})
    resumen = html.escape(ayuda.get("resumen", ""))
    return f"""<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">
<title>Edición {cid} — {html.escape(nombre)}</title><style>{CSS}</style></head><body>
<div class="barra"><span class="marca">Maternidad</span>
<span class="pantalla">{html.escape(nombre)}</span>
<button class="ayuda">Ayuda</button></div>
<div class="cuerpo">{lateral_html(cid)}
<div class="zona">
<div class="replica-top">RÉPLICA DE EDICIÓN (no es el programa) — versión {VERSION} ·
base generada del código real · aquí se dictan los cambios en papel antes de tocar el
código. Lo funcional lo manda el programa.</div>
<h1>{html.escape(sp.titulo)}</h1>
<div class="sub">{resumen}</div>
<div class="tarjeta">{campos_html(cid, sp)}{botones_html(cid, sp)}</div>
<div class="resultado"><b>Resultado</b><br><i>(aquí el programa muestra sus mensajes;
en la réplica se queda este espacio para ver cómo se vería)</i></div>
<div class="dictamen"><b>CAMBIOS DICTADOS PARA ESTA PANTALLA</b>
<div class="cambio">(aún sin cambios dictados — el dueño dicta y el agente los aplica
aquí, marcados con recuadro verde)</div></div>
</div></div>
<footer>Réplica de edición · contraste: <code>../ANALISIS-PANTALLAS.md</code> ·
críticas: <code>../HALLAZGOS.md</code> · índice: <a href="INDICE.html">INDICE</a></footer>
</body></html>"""


def indice():
    filas = []
    for cid in sorted(cat.keys()):
        nombre = NOMBRES.get(cid, cid)
        resumen = html.escape(AYUDAS.get(cid, {}).get("resumen", ""))
        filas.append('<div class="cambio" style="border-color:#1b6ca8;background:#fff">'
                     '<a href="%s.html" style="color:#1b4f72;font-weight:bold;'
                     'text-decoration:none">%s · %s</a><br><span style="font-size:13px;'
                     'color:#445">%s</span></div>' % (cid, cid, html.escape(nombre), resumen))
    return f"""<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">
<title>Índice de edición en papel</title><style>{CSS}</style></head><body>
<div class="barra"><span class="marca">Maternidad</span>
<span class="pantalla">Edición en papel — índice</span></div>
<div class="zona" style="max-width:960px;margin:0 auto">
<div class="replica-top">Pantallas reales del programa, en réplica, para dictar cambios
sin tocar el código. Una pantalla por sesión. Regla: aquí se cambia todo lo que haga
falta; el programa solo se toca cuando una pantalla queda «estabilizada».</div>
{''.join(filas)}
</div>
<footer>Generado del código real · versión {VERSION}</footer>
</body></html>"""


creadas = 0
for cid in sorted(cat.keys()):
    ruta = os.path.join(SALIDA, cid + ".html")
    if os.path.exists(ruta) and not FZ:
        continue
    with open(ruta, "w", encoding="utf-8") as f:
        f.write(pagina(cid))
    creadas += 1
idx = os.path.join(SALIDA, "INDICE.html")
if FZ or not os.path.exists(idx):
    with open(idx, "w", encoding="utf-8") as f:
        f.write(indice())
    creadas += 1
print("réplicas en EDICION:", len([x for x in os.listdir(SALIDA) if x.endswith('.html')]),
      "(creadas ahora:", creadas, ")")
