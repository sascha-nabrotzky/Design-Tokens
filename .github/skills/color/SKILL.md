---
name: color
description: 'Verwende diesen Skill bei Änderungen an Farb-Design-Tokens,
    Farbrampen, semantischen Farbrollen oder Farbzuordnungen.'
argument-hint: 'Beschreibe das gewünschte Token oder die zu ändernde Ausgabe'
---

# Farb-Token-Workflow

Nutze diesen Skill nur für Farbwerte, Farbrampen, Farbrollen oder Farbzuordnungen. Für allgemeine Token- oder Build-Änderungen gilt zusätzlich der `token-workflow`.

## Zuständige Dateien

- Quelle: `tokens/tokens.json`
- Ausgabe: `build/css/_variables.css`

## Token-Kategorien

`primitive`
`semantic`
`component`

## Farben

Farben sind in der Regel in 100er-Schritten angelegt: Tints liegen unterhalb der Basisfarbe, Shades oberhalb. `500` ist die Basis, sofern die jeweilige Farbfamilie diese Stufe besitzt; Ausnahmen wie `neutral.50` bleiben erhalten.

Die bestehende 60-30-10-Regel beschreibt die sichtbare Flächenverteilung: Sand oder Eucalyptus für große Flächen, Tints für unterstützende Flächen und Shades für Akzente oder Kontrast.

Die 60-30-10 Regel beschreibt den sichtbaren Flaechenanteil, nicht die Anzahl der Farbtoken. Sand und Eucalyptus sind primaere Surface- beziehungsweise Background-Farben fuer grosse Flaechen. Das bedeutet nicht, dass sie automatisch die primaere Aktionsfarbe sind.

Die Farbfamilien werden nicht pauschal in `primary`, `secondary` und `tertiary` eingeteilt. Diese Begriffe werden nur auf der semantischen oder Komponentenebene verwendet, wenn sie eine konkrete UI-Hierarchie beschreiben, zum Beispiel bei Aktionen oder Buttons. Fuer die uebrigen Rollen sind fachlich eindeutigere Kategorien zu verwenden:

- `surface`: Sand und Eucalyptus, vor allem Tints im Bereich `100` bis `400`
- `content`: Neutral- und dunkle Green-Tokens fuer Text, Icons und Kontrast
- `border`: dezente Tints oder mittlere Neutral-Tokens fuer Konturen
- `accent`: Merlot, Blush, Rose und Slate fuer Hervorhebungen und unterstuetzende Flaechen
- `action`: semantische Aktionsfarben wie `primary`, `secondary`, `tertiary` und `cta`

Innerhalb jeder Farbfamilie bleibt `500` die Basisfarbe. Die Werte `100` bis `400` werden bevorzugt als Tints fuer Flaechen verwendet, waehrend `600` bis `900` als Shades fuer Text, starke Konturen, wichtige Aktionen und aktive Zustaende dienen. Semantische Tokens sollen Rollen statt Farbnamen ausdruecken und auf passende Primitive verweisen.

## Validierung

1. Prüfen, ob die passende Farbfamilie und Stufe bereits existiert.
2. Semantische Rollen auf fachlich passende Primitive abbilden.
3. Nach Änderungen `npm run build` ausführen und die betroffenen `--color-*`-Variablen prüfen.
