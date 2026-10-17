---
name: typography
description: "Verwende diesen Skill bei Änderungen an Typografie-Design-Tokens,
  Schriftgrößen, Schriftarten, Zeilenhöhen oder semantischen Typografie-Rollen."
argument-hint: "Beschreibe das gewünschte Token oder die zu ändernde Ausgabe"
---

# Arbeitsablauf fuer Typografie-Design-Tokens

Nutze diesen Skill nur für Schriftgrößen, Zeilenhöhen, Schriftfamilien oder Schriftgewichte. Für allgemeine Token- oder Build-Änderungen gilt zusätzlich der `token-workflow`.

## Aktuelle Struktur

- Primitive Schriftgroessen liegen unter `primitive.font-size` und verwenden den Typ `fontSizes`: `sm` 14, `base` 18, `lg` 23, `xl` 28, `2xl` 35, `3xl` 44, `4xl` 55, `5xl` 69 und `6xl` 120.
- Semantische Rollen liegen unter `semantic.sem.font-size`. Vorhanden sind `hero`, `hero-accent`, `intro-text`, `body`, `body-small`, `label`, `label-small`, `caption`, `button` sowie `headline.01` bis `.05`.
- `body`, `label` und `button` referenzieren `base`; `body-small`, `label-small` und `caption` referenzieren `sm`. `headline.01` bis `.05` referenzieren der Reihe nach `4xl`, `3xl`, `2xl`, `xl` und `lg`. `hero` referenziert `5xl`, `hero-accent` `6xl`, `intro-text` `lg`.
- Schriftfamilien sind `primitive.serif` und `primitive.sans-serif`; Gewichte sind `primitive.regular` und `primitive.bold`.

## Nicht modellierte Eigenschaften

Die aktuelle Quelle enthaelt keine Zeilenhoehen und keine zusammengesetzten `typography`-Tokens. Keine bestehenden `lineHeights` oder `semantic.sem.typography`-Rollen voraussetzen. Neue Eigenschaften erst bei konkretem Bedarf und mit passendem DTCG-Typ ergaenzen; Zeilenhoehen nicht aus Schriftgroessen ableiten.

## Validierung

1. Pruefen, ob die neue typografische Rolle bereits durch einen vorhandenen Alias abgedeckt ist.
2. Auf kompatible Token-Typen achten: `fontSizes` fuer Schriftgroessen, `fontFamilies` fuer Schriftfamilien und `fontWeights` fuer Schriftgewichte.
3. Nach Aenderungen `npm run build` ausfuehren.
4. Nur die betroffenen CSS-Variablen und die Alias-Referenz kontrollieren.
