#!/usr/bin/env bash
# Autoauditoría del repositorio de lógica — PLAN-DE-IMPLEMENTACION.md §5 · Frente F.
#
# Regla del dueño: en cada mínima iteración el repo se autoaudiciona para registrar,
# implementar e integrar cualquier avance. Hace tres niveles de costo distinto:
#
#   ./autoauditoria.sh              → TIER 1 (iteración): sintaxis de todos los .js,
#                                      suites de nodo (motor, atenciones, LIBRO con
#                                      trampa de huella, agenda), enlaces estáticos.
#                                      Segundos. Correrlo tras CADA cambio.
#   ./autoauditoria.sh --completo   → TIER 2 (transición): T1 + TODAS las e2e con
#                                      servidores propios (los levanta y mata) y
#                                      conteos en vivo. Antes de declarar un estado
#                                      en SINTESIS-REGISTRO.json.
#   Ronda                           → cuando T1/T2 fallan o cierra un hito: auditoría
#                                      con hallazgos numerados y cierre (MG-05).
#
# Sale con código != 0 si algo rojo: ninguna iteración se da por buena en rojo.
set -uo pipefail
RAIZ="$(cd "$(dirname "$0")" && pwd)"
SIN="$RAIZ/12-FRONT-SINTESIS"
AG="$RAIZ/12-AGENDA-Y-MENSAJES"
COMPLETO=0
[ "${1:-}" = "--completo" ] && COMPLETO=1

# --pantalla <archivo.html> · chequeo quirúrgico de una pantalla: sintaxis inline,
# fila+huella+meta+chip en el registro, y sus enlaces. Para iterar de a una.
if [ "${1:-}" = "--pantalla" ]; then
  archivo="$(basename "${2:-}")"
  ruta="$SIN/$archivo"
  [ -f "$ruta" ] || { echo "FAIL  no existe $ruta"; exit 1; }
  fallos=0
  python3 - "$ruta" > /tmp/_inline.js 2>/dev/null <<'PY'
import re, sys
html = open(sys.argv[1], encoding="utf-8").read()
sys.stdout.write("\n".join(re.findall(r"<script>(.*?)</script>", html, re.S)))
PY
  if [ -s /tmp/_inline.js ] && node --check /tmp/_inline.js >/dev/null 2>&1; then
    echo "ok    sintaxis inline de $archivo"
  else
    echo "FAIL  sintaxis inline de $archivo"; fallos=$((fallos+1))
  fi
  while IFS= read -r h; do
    case "$h" in *"+"*) continue ;; esac
    [ -f "$SIN/$h" ] || { echo "FAIL  enlace roto en $archivo: $h"; fallos=$((fallos+1)); }
  done < <(grep -oE "href='[^'#?]+" "$ruta" | sed "s/href='//" | sort -u)
  if python3 - "$SIN/SINTESIS-REGISTRO.json" "$archivo" <<'PY'
import json, hashlib, sys
reg = json.load(open(sys.argv[1], encoding="utf-8")); arch = sys.argv[2]
fila = next((p for p in reg["pantallas"] if p["archivo"] == arch), None)
if not fila: print("FAIL  sin fila en el registro (regístrala con huella)"); sys.exit(1)
h = hashlib.sha256(open(sys.argv[1].replace("SINTESIS-REGISTRO.json", arch), "rb").read()).hexdigest()
if fila.get("huella") != h: print("FAIL  huella: MODIFICADA SIN REGISTRAR"); sys.exit(1)
t = open(sys.argv[1].replace("SINTESIS-REGISTRO.json", arch), encoding="utf-8").read()
v = reg["sintesis_version"]
if f'<meta name="sintesis" content="{v}">' not in t: print("FAIL  sin meta de síntesis " + v); sys.exit(1)
import re
m = re.search(r'class="propuesta">([^<]*)', t)
if not m or v not in m.group(1): print("FAIL  sin chip de versión en la barra"); sys.exit(1)
print("ok    registro: fila · huella · meta · chip")
PY
  then
    :
  else
    fallos=$((fallos+1))
  fi
  [ "$fallos" -eq 0 ] && { echo "PANTALLA OK — $archivo"; exit 0; } || { echo "PANTALLA EN ROJO — $fallos fallo(s)"; exit 1; }
fi

fallos=0; total_pass=0; arrancados=()

correr() {
  local etiqueta="$1"; local dir="$2"; shift 2
  local salida cod pass fail
  salida=$(cd "$dir" && "$@" 2>&1); cod=$?
  pass=$(printf '%s' "$salida" | grep -c "PASS " || true)
  fail=$(printf '%s' "$salida" | grep -c "FAIL " || true)
  if [ "$cod" -ne 0 ] || [ "$fail" -gt 0 ]; then
    echo "FAIL  $etiqueta  (pass=$pass fail=$fail)"
    printf '%s\n' "$salida" | grep "FAIL " | head -6 | sed 's/^/        /'
    fallos=$((fallos + 1))
  else
    echo "ok    $etiqueta  ($pass PASS)"
  fi
  total_pass=$((total_pass + pass))
}

sintaxis() {
  local dir="$1"; shift
  for f in "$@"; do
    if [ -f "$dir/$f" ]; then
      if node --check "$dir/$f" >/dev/null 2>&1; then
        echo "ok    sintaxis $f"
      else
        echo "FAIL  sintaxis $f"; fallos=$((fallos + 1))
      fi
    fi
  done
}

enlaces() {
  local dir="$1" rotos=0 f
  while IFS= read -r h; do
    case "$h" in *"+"*) continue ;; esac
    [ -f "$dir/$h" ] || rotos=$((rotos + 1))
  done < <(grep -ohE "href='[^'#?]+" "$dir"/*.html 2>/dev/null | sed "s/href='//" | sort -u)
  if [ "$rotos" -eq 0 ]; then echo "ok    enlaces estáticos $dir (0 rotos)"
  else echo "FAIL  enlaces estáticos $dir ($rotos rotos)"; fallos=$((fallos + 1)); fi
}

asegurar_puerto() {
  local puerto="$1" dir="$2"
  if curl -s -o /dev/null -m 2 "http://127.0.0.1:$puerto/" 2>/dev/null; then return 0; fi
  # Nunca arrancar desde dentro de $( ): el subshell espera al servidor con el pipe
  # abierto y eso colgaba la verificación completa (bug cazado con bash -x, 2026-10-26).
  nohup python3 -m http.server "$puerto" --directory "$dir" >/dev/null 2>&1 &
  arrancados+=($!)
  sleep 1
}
matar_propios() {
  local pid
  for pid in "${arrancados[@]:-}"; do [ -n "$pid" ] && kill "$pid" 2>/dev/null; done
}
trap matar_propios EXIT

echo "══ AUTOAUDITORÍA $( [ "$COMPLETO" -eq 1 ] && echo 'TIER 2 · transición' || echo 'TIER 1 · iteración' ) · $(date '+%F %T') ══"

echo "— sintaxis —"
sintaxis "$SIN" motor.js config.js mensajes.js
sintaxis "$AG" mensajes.js generar-maestro.js

echo "— suites de nodo (T1) —"
correr "sintesis · motor"      "$SIN/pruebas" node pruebas-motor.js
correr "sintesis · atenciones" "$SIN/pruebas" node pruebas-atenciones.js
correr "sintesis · do-pantallas" "$SIN/pruebas" node pruebas-do-pantallas.js
correr "sintesis · libro (huella+conteos)" "$SIN/pruebas" env TIER1=1 node pruebas-registro.js
correr "agenda · mensajes"     "$AG/pruebas"  node pruebas-mensajes.js
correr "agenda · documental"   "$AG/pruebas"  node pruebas-reauditoria.js

echo "— lenguaje del usuario (informe; la puerta --exigir se enciende cuando el dueño fije sustitutos · A17) —"
if _lang=$(node "$RAIZ/buscar-lenguaje.js" --resumen 2>&1); then
  echo "ok    lenguaje  $_lang"
else
  echo "FAIL  lenguaje  $_lang"
  fallos=$((fallos + 1))
fi

echo "— deriva de duplicados (ME-13a) —"
if cmp -s "$RAIZ/10-PRUEBA-ENFERMERIA/motor.js" "$RAIZ/11-PRUEBA-MEDICA/motor.js"; then
  echo "ok    10=11 · motor sin deriva (copias idénticas)"
else
  echo "FAIL  10=11 · motor DIVERGIDO (una sola fuente rota)"; fallos=$((fallos + 1))
fi
if cmp -s "$RAIZ/12-AGENDA-Y-MENSAJES/mensajes.js" "$RAIZ/12-FRONT-SINTESIS/mensajes.js"; then
  echo "ok    mensajes · copia canónica sin deriva (12-AGENDA = FRONT-SINTESIS)"
else
  echo "FAIL  mensajes · copias DIVERGIDAS (la canónica y la del frontend no coinciden)"; fallos=$((fallos + 1))
fi

echo "— enlaces —"
enlaces "$SIN"
enlaces "$AG"

if [ "$COMPLETO" -eq 1 ]; then
  echo "— e2e completas (servidores propios) —"
  asegurar_puerto 8123 "$SIN"
  asegurar_puerto 8124 "$AG"
  correr "sintesis · libro CON conteos en vivo" "$SIN/pruebas" node pruebas-registro.js
  correr "sintesis · 18 pantallas"             "$SIN/pruebas" node pruebas-e2e.js
  correr "sintesis · ruptura atenciones"        "$SIN/pruebas" node pruebas-e2e-atenciones.js
  correr "agenda · pantalla completa"           "$AG/pruebas"  node pruebas-e2e-agenda.js
  correr "agenda · ruptura"                     "$AG/pruebas"  node pruebas-e2e-rotura.js
fi

echo "══════════════════════════════════════════"
echo "TOTAL: $total_pass PASS · $fallos FALLO(S)"
if [ "$fallos" -eq 0 ]; then
  echo "AUTOAUDITORÍA OK — la iteración es buena."
  exit 0
else
  echo "AUTOAUDITORÍA EN ROJO — nada se registra ni se declara hasta ponerla verde."
  exit 1
fi
