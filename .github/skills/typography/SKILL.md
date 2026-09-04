---
name: typography
description: 'Verwende diesen Skill bei Änderungen an Typografie-Design-Tokens,
    Schriftgrößen, Schriftarten, Zeilenhöhen oder semantischen Typografie-Rollen.'
argument-hint: 'Beschreibe das gewünschte Token oder die zu ändernde Ausgabe'
---

# Arbeitsablauf fuer Typografie-Design-Tokens

Nutze diesen Skill nur für Schriftgrößen, Zeilenhöhen, Schriftfamilien oder Schriftgewichte. Für allgemeine Token- oder Build-Änderungen gilt zusätzlich der `token-workflow`.

## Token-Ebenen

- Primitive Typografie-Tokens liegen unter `primitive.font.size`.
- Semantische Typografie-Tokens liegen unter `semantic.sem.font.size` und beschreiben die Verwendung, nicht die konkrete Groesse.
- Komponentenbezogene Typografie-Tokens sollen erst angelegt werden, wenn eine Komponente eigene typografische Anforderungen hat.

## Groessenskala

Die aktuelle primitive Skala umfasst folgende Groessen:

- `small`: 14
- `base`: 18
- `lg`: 23
- `xl`: 28
- `2xl`: 35
- `3xl`: 44
- `4xl`: 55
- `hero`: 69
- `hero-accent`: 120

Die Werte sind als `fontSizes` typisiert. Bei neuen Groessen ist die bestehende Skala zu pruefen, bevor ein neuer Token angelegt wird. Bereits vorhandene Groessen duerfen nicht unter einem zweiten Namen dupliziert werden.

## Semantische Verwendung

Semantische Tokens sollen die Textrolle ausdruecken. Die Headline-Aliase sind wie folgt zugeordnet:

- `headline.01`: `4xl` (H1)
- `headline.02`: `3xl` (H2)
- `headline.03`: `2xl` (H3)
- `headline.04`: `xl` (H4)
- `headline.05`: `lg` (H5)
- `headline.06`: `base` (H6)

Fuer typische Textarten stehen die semantischen Tokens `body`, `body-small`, `label`, `label-small`, `caption` und `button` zur Verfuegung. `body`, `label` und `button` referenzieren `base`; `body-small`, `label-small` und `caption` referenzieren `small`.

`base` ist fuer normalen Lesetext vorgesehen, `small` fuer kleinere UI-Texte und `lg` bis `4xl` fuer gestufte Ueberschriften. `hero` und `hero-accent` sind ausschliesslich fuer besonders prominente Hero-Inhalte zu verwenden.

## Zeilenhoehe

Zeilenhoehen kommen aus PenPot und werden dort im Bereich `Typography` der Tokens behandelt. Sie sind eine typografische Eigenschaft und kein allgemeiner Abstand aus dem `space`-Raster. Sie sollen deshalb unter einer eigenen Typografie-Hierarchie definiert und semantisch nach Textrolle verwendet werden.

- `body-text` verwendet eine Zeilenhoehe von `1.5`.
- Darauf achten, dass Schriftgrößen und Zeilenabstände im Sinne der Barrierefreiheit passend sind, insbesondere für Menschen mit Sehbehinderungen.
- Kleine UI-Texte benoetigen meist eine etwas kompaktere, aber weiterhin gut lesbare Zeilenhoehe.
- Ueberschriften und Display-Texte benoetigen in der Regel eine kompaktere Zeilenhoehe, etwa `1.05` bis `1.25` der Schriftgroesse.
- Mehrzeilige Texte muessen auf Lesbarkeit geprueft werden; die Zeilenhoehe darf nicht allein aus der Schriftgroesse abgeleitet werden.
- Wenn moeglich, sind dimensionslose Faktoren gegenueber festen Pixelwerten zu bevorzugen, damit die Zeilenhoehe mit der Schriftgroesse skaliert.

Semantische Zeilenhoehen sollen die Textrolle ausdruecken, zum Beispiel `body`, `body-small`, `headline` oder `display`. Eine einzelne globale Zeilenhoehe fuer alle Schriftgroessen ist zu vermeiden.

## Abbildung in den Tokens

Neue Typografie-Eigenschaften nur bei konkretem Bedarf ergänzen. Zeilenhöhen verwenden den Token-Typ `lineHeights`; Schriftfamilien und Schriftgewichte erhalten bei einer Erweiterung eigene primitive Skalen.

## Validierung

1. Pruefen, ob die neue typografische Rolle bereits durch einen vorhandenen Alias abgedeckt ist.
2. Auf kompatible Token-Typen achten, insbesondere `fontSizes` fuer Groessen und `lineHeights` fuer Zeilenhoehen.
3. Nach Aenderungen `npm run build` ausfuehren.
4. Nur die betroffenen CSS-Variablen und die Alias-Referenz kontrollieren.
