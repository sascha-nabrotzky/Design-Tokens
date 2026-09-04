# Projektregeln

## Tokenquellen

- Die maßgebliche Quelle ist `tokens/tokens.json`.
- Änderungen immer dort vornehmen; `tokens/tokens.flattened.json` ist eine generierte Zwischenstufe.

## Generierte Ausgabe

- `tokens/tokens.flattened.json` wird durch `npm run tokens:flatten` erzeugt und darf nicht manuell bearbeitet werden.
- `build/css/_variables.css` wird durch Style Dictionary erzeugt und darf nicht manuell bearbeitet werden.

## Validierung

- Nach Änderungen an Tokens, der Build-Konfiguration oder Generator-Skripten `npm run build` ausführen.
- Danach nur die betroffenen generierten Artefakte und relevanten CSS-Variablen prüfen.

## Kontext sparen

- Nur den zum Auftrag passenden Skill laden: `color`, `spacing`, `typography`, `accessibility` oder `token-workflow`.
- Zuerst den konkreten Token-Pfad in `tokens/tokens.json` prüfen; weitere Dateien nur für die notwendige Validierung öffnen.
- Bei reinen Dokumentationsänderungen keinen Token-Build ausführen.
