---
name: color
description: "Verwende diesen Skill bei Änderungen an Farb-Design-Tokens,
  Farbrampen, semantischen Farbrollen oder Farbzuordnungen."
argument-hint: "Beschreibe das gewünschte Token oder die zu ändernde Ausgabe"
---

# Farb-Token-Workflow

Nutze diesen Skill nur für Farbwerte, Farbrampen, Farbrollen oder Farbzuordnungen. Für allgemeine Token- oder Build-Änderungen gilt zusätzlich der `token-workflow`.

## Zuständige Dateien

- Quelle: `tokens/tokens.json`
- Ausgabe: `build/css/_variables.css`

## Aktuelle Struktur

Farben liegen unter `primitive.color`. Die vorhandenen Familien und Stufen sind:

- `sand.100` bis `.900`
- `eucalyptus.100` bis `.900`
- `neutral.50` bis `.500`
- `wood.300`, `.500` und `.700`

Semantische Farb-Tokens liegen unter `semantic.sem.color`:

- `surface.01` bis `.05` referenzieren `sand.100` bis `.500`.
- `soft-ui.01` bis `.05` referenzieren `eucalyptus.100` bis `.500`.
- `alternative.05`, `spot.05` und `accent.05` referenzieren `wood.300`, `.700` und `.500`.

Es gibt aktuell keine `component`-Gruppe und keine semantischen `content`, `border`, `action` oder Fokusrollen. Nicht so tun, als waeren solche Rollen bereits modelliert; eine neue Rolle nur bei konkretem Bedarf und mit passendem Quell-Token anlegen.

Die Quelle enthaelt Light- und Dark-Metadaten, die derzeit beide dieselben Sets `primitive` und `semantic` auswaehlen. Daraus entstehen noch keine unterschiedlichen Farbwerte pro Theme.

Die Nummern der semantischen Oberflaechen sind `01` bis `05`, nicht `0-lowest` bis `4-highest`. Primitive Familien haben nur die oben aufgelisteten Stufen; keine fehlenden Tints oder Shades voraussetzen.

## Validierung

1. Den konkreten Token in `tokens/tokens.json` pruefen und bestehende Farbwerte wiederverwenden.
2. Semantische Aliase nur fuer belegte Rollen ergaenzen und auf `$type: color` verweisen.
3. Bei Aenderungen `npm run build` ausfuehren und die betroffenen `--color-*`-Variablen pruefen.
