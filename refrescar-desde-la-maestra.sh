#!/usr/bin/env bash
# Refresca FRONTEND/ desde la maestra (el proyecto Maternidad).
# Solo funciona cuando esta carpeta vive DENTRO del proyecto; copiada fuera, se niega.
set -euo pipefail

CARPETA="$(cd "$(dirname "$0")" && pwd)"
RAIZ="$(cd "$CARPETA/.." && pwd)"

if [ ! -d "$RAIZ/GUIAS" ] || [ ! -f "$RAIZ/ACTA_CONSTITUTIVA.md" ]; then
  echo "Esta carpeta está copiada fuera del proyecto: el refresco se hace desde la maestra."
  echo "Vuelva a copiar FRONTEND/ desde el proyecto, o trabaje allá."
  exit 1
fi

rm -rf "$CARPETA/01-DIBUJOS" "$CARPETA/02-LOGICA-DE-DISENO" "$CARPETA/03-CONTRATOS" \
       "$CARPETA/04-METODO-Y-ACEPTACION" "$CARPETA/05-LEY"
mkdir -p "$CARPETA/01-DIBUJOS" "$CARPETA/02-LOGICA-DE-DISENO" \
         "$CARPETA/04-METODO-Y-ACEPTACION" "$CARPETA/05-LEY"

cp -r "$RAIZ/GUIAS/EDICION" "$CARPETA/01-DIBUJOS/EDICION"
cp -r "$RAIZ/GUIAS/FICHAS" "$CARPETA/01-DIBUJOS/FICHAS"
cp "$RAIZ"/GUIAS/LOGICAS/SISTEMA-DE-LOGICAS.md "$RAIZ"/GUIAS/LOGICAS/DOCTRINA-DE-DISENO.md \
   "$RAIZ"/GUIAS/LOGICAS/PRESENTACION-EN-PANTALLA.md "$RAIZ"/GUIAS/LOGICAS/PRESENTACION-DE-CONTENIDO.md \
   "$RAIZ"/GUIAS/LOGICAS/REQUISITOS-DEL-DISENO.md "$RAIZ"/GUIAS/LOGICAS/IMPLEMENTACION-DESDE-LA-VERDAD.md \
   "$RAIZ"/GUIAS/LOGICAS/SISTEMA-DE-ALERTAS.md "$RAIZ"/GUIAS/LOGICAS/AUDITORIA-DE-LA-LOGICA.md \
   "$CARPETA/02-LOGICA-DE-DISENO/"
cp "$RAIZ"/GUIAS/FLUJOS-TRABAJO.md "$RAIZ"/GUIAS/CHECKPOINT-LOGICA.md \
   "$RAIZ"/GUIAS/CONTRASTE-DEL-DISENO-LOGICO.md "$CARPETA/02-LOGICA-DE-DISENO/"
cp -r "$RAIZ/GUIAS/CONTRATOS" "$CARPETA/03-CONTRATOS"
cp "$RAIZ"/GUIAS/EVALUACION-PANTALLAS.md "$RAIZ"/GUIAS/ANALISIS-PANTALLAS.md \
   "$RAIZ"/GUIAS/ORDEN-TRABAJO-PROTOTIPOS.md "$RAIZ"/GUIAS/KIT-ENTREVISTA.md \
   "$RAIZ"/GUIAS/PLANTILLA-REVISION.md "$RAIZ"/GUIAS/ACUERDOS.md \
   "$RAIZ"/GUIAS/HALLAZGOS.md "$CARPETA/04-METODO-Y-ACEPTACION/"
cp "$RAIZ"/ACTA_CONSTITUTIVA.md "$RAIZ"/ACTA_FRONTEND.md "$CARPETA/05-LEY/"

(
  cd "$CARPETA"
  find . -type f ! -name HUELLAS.txt -print0 | sort -z | xargs -0 sha256sum > HUELLAS.txt
)

echo "Refresco listo desde el commit $(git -C "$RAIZ" rev-parse --short HEAD)."
echo "Actualice la fecha y el commit del sello en LEEME.md, y verifique con: sha256sum -c HUELLAS.txt"
