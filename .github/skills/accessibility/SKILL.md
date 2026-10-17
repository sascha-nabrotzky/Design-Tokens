---
name: accessibility
description: "Nutze diesen Skill bei Aenderungen an barrierefreien Farb-, Typografie- oder Fokus-Design-Tokens und ihrer Validierung."
argument-hint: "Beschreibe das betroffene Token oder die A11y-Anforderung"
---

# Accessibility-Token-Workflow

Nutze diesen Skill fuer Aenderungen an den barrierefreien Eigenschaften von Farb-, Typografie- und Fokus-Tokens. Fuer allgemeine Token-Aenderungen gilt zusaetzlich der `token-workflow`; bei Farb- oder Typografie-Werten auch der jeweilige Fach-Skill.

## Zustaendige Dateien

- Quelle: `tokens/tokens.json`
- Validator: `scripts/validate-a11y-tokens.js`
- Build-Einbindung: `package.json`
- Generierte Ausgabe: `build/css/_variables.css`

Die generierten Dateien werden nie manuell bearbeitet.

## Aktuelle Tokenstruktur

- Semantische Farb-Tokens liegen unter `semantic.sem.color`: aktuell `surface.01` bis `.05`, `soft-ui.01` bis `.05` sowie `alternative.05`, `spot.05` und `accent.05`.
- Semantische Schriftgroessen liegen unter `semantic.sem.font-size`. Fuer Lesetext prueft der Validator `body` mit mindestens `16px` und `body-small` mit mindestens `14px`.
- Die Farb-Tokens referenzieren Primitive unter `primitive.color`; Typografie-Aliase referenzieren `primitive.font-size`.

## Grenzen der aktuellen Pruefung

- Es gibt derzeit keine semantischen Vordergrund-/Hintergrund-Paare (`content`), keinen Fokus-Ring-Token und keine Zeilenhoehen-Tokens. Der Validator kann deshalb weder Kontrastverhaeltnisse noch Fokuskontrast oder Zeilenhoehen bewerten.
- Keine solchen Rollen oder Werte erfinden. Wenn sie in `tokens/tokens.json` eingefuehrt werden, die konkreten vorgesehenen Paare beziehungsweise Rollen dokumentieren und erst dann passende Kontrast- oder Zeilenhoehenregeln ergaenzen.
- Der Validator prueft aktuell, dass alle semantischen Farb-Aliase auf sechsstellige Hex-Farben aufloesen und die beiden Lesetext-Schriftgroessen ihre Mindestwerte einhalten.

## Validierung

1. Den konkreten Pfad in `tokens/tokens.json` und die dazu passende vorhandene Pruefung identifizieren.
2. Nur Quelle oder Validator bearbeiten; keine generierten Dateien manuell aendern.
3. `npm run tokens:validate-a11y` ausfuehren.
4. Danach `npm run build` ausfuehren und die betroffenen CSS-Variablen kontrollieren.
