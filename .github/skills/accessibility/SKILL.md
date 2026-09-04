---
name: accessibility
description: 'Nutze diesen Skill bei Aenderungen an barrierefreien Farb-, Typografie- oder Fokus-Design-Tokens und ihrer Validierung.'
argument-hint: 'Beschreibe das betroffene Token oder die A11y-Anforderung'
---

# Accessibility-Token-Workflow

Nutze diesen Skill fuer Aenderungen an den barrierefreien Eigenschaften von Farb-, Typografie- und Fokus-Tokens. Fuer allgemeine Token-Aenderungen gilt zusaetzlich der `token-workflow`; bei Farb- oder Typografie-Werten auch der jeweilige Fach-Skill.

## Zustaendige Dateien

- Quelle: `tokens/tokens.json`
- Validator: `scripts/validate-a11y-tokens.js`
- Build-Einbindung: `package.json`
- Generierte Ausgabe: `build/css/_variables.css`

Die generierten Dateien werden nie manuell bearbeitet.

## Farbkontrast

- Kontrast nur fuer bewusst definierte semantische Vordergrund-/Hintergrund-Paare pruefen, nie fuer jede moegliche Kombination primitiver Farben.
- Normaler Lesetext braucht mindestens `4.5:1` Kontrast.
- Fokusindikatoren brauchen mindestens `3:1` Kontrast gegen alle Oberflaechen, auf denen sie vorgesehen sind.
- Neue Content-, Surface- oder Fokusrollen als semantische Aliase modellieren und die zugehoerigen Paare im Validator ergaenzen.

## Fokusindikator

- Interaktive Komponenten duerfen einen Tastaturfokus nicht allein ueber eine Hintergrundfarbaenderung vermitteln.
- Der gemeinsame Token `sem.color.focus.ring` ist fuer den sichtbaren Fokus-Ring auf hellen Oberflaechen vorgesehen.
- Fuer abweichende Hintergruende eine fachlich begruendete Gegenrolle anlegen und gegen diese Hintergruende validieren.

## Typografie

- `sem.typography.body-text` braucht mindestens `16px` und eine dimensionslose Zeilenhoehe von `1.5`.
- `sem.typography.body-small-text` braucht mindestens `14px` und eine dimensionslose Zeilenhoehe von `1.4`.
- Labels, Buttons und Ueberschriften werden nicht pauschal wie Lesetext bewertet; ihre Anforderung wird erst bei einer konkreten, dokumentierten Verwendung in den Validator aufgenommen.

## Validierung

1. Den konkreten Token-Pfad in `tokens/tokens.json` und die betroffene Regel im Validator pruefen.
2. Nur die Quelle oder den Validator bearbeiten.
3. `npm run tokens:validate-a11y` fuer die direkte Pruefung ausfuehren.
4. Anschliessend `npm run build` ausfuehren und die betroffenen CSS-Variablen kontrollieren.
