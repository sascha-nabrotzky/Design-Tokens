# Design Tokens

Design Tokens werden aus einer JSON-Quelle in eine flache JSON-Datei und anschließend in CSS-Variablen umgewandelt. Die Tokenquelle liegt unter `tokens/tokens.json`.

## Voraussetzungen

- Node.js und npm

Abhängigkeiten installieren:

```bash
npm install
```

## Build

Der vollständige Build prüft die Accessibility-Anforderungen, erzeugt die flache Token-Datei und baut anschließend die CSS-Variablen:

```bash
npm run build
```

Dabei entstehen:

- `tokens/tokens.flattened.json` als flache Zwischenstufe
- `build/css/_variables.css` als generierte CSS-Ausgabe

Die CSS-Ausgabe behält Alias-Referenzen bei, damit semantische Tokens auf ihre primitiven Tokens verweisen können.

Nur die Quelle bearbeiten. Die Flatten-Datei und die CSS-Ausgabe werden automatisch erzeugt und dürfen nicht manuell geändert werden.

## Einzelne Schritte

Nur die Flatten-Datei erzeugen:

```bash
npm run tokens:flatten
```

Die Style-Dictionary-Konfiguration liegt in `scripts/build-css.mjs`. Sie verwendet die Flatten-Datei als Quelle, registriert die Tokens-Studio-Transforms aus `@tokens-studio/sd-transforms` (für Typografie-Komposit-Werte und Math-Ausdrücke wie `{space.04}*{scale}`) und schreibt CSS nach `build/css/`.

### Warum kein reines `style-dictionary build`?

`tokens/tokens.json` ist im Tokens-Studio-Format exportiert. Das weicht in zwei Punkten vom Format ab, das Style Dictionary direkt versteht:

- Typografie-Tokens nennen ihre Eigenschaften im Plural (`fontSizes`, `lineHeights`, `fontWeights`, `fontFamilies`), Style Dictionary erwartet die Einzahl (`fontSize`, `lineHeight`, …).
- Werte können Rechenausdrücke wie `{space.04}*{scale}` sein, die vor der Ausgabe berechnet werden müssen.

Der Preprocessor haelt die Ausgabe kompatibel mit Tokens-Studio-Typografie-Kompositen, sofern solche Tokens in der Quelle vorkommen. Die aktuelle Quelle verwendet jedoch einzelne `fontSizes`-Tokens und enthaelt weder Typografie-Komposite noch `scale`-basierte Rechenausdruecke. Bei Aenderungen zuerst die tatsaechlichen Token-Typen und Werte in `tokens/tokens.json` pruefen.

`scripts/build-css.mjs` behebt das: Ein eigener Preprocessor benennt die Plural-Eigenschaften der Typografie-Tokens in die von Style Dictionary erwartete Einzahl um, `@tokens-studio/sd-transforms` wertet die Rechenausdrücke aus, und `outputReferences` ist so konfiguriert, dass nur echte 1:1-Aliase als `var(--x)` erhalten bleiben – berechnete Werte werden vollständig aufgelöst. Beim Bearbeiten von `scripts/build-css.mjs` sollte diese Logik erhalten bleiben; ein Wechsel zurück auf die reine Style-Dictionary-CLI reproduziert den ursprünglichen Fehler.

## Accessibility-Pruefung

Die Accessibility-Validierung läuft automatisch vor jedem vollständigen Build. Sie kann auch einzeln ausgeführt werden:

```bash
npm run tokens:validate-a11y
```

Der Check loest semantische Farb-Aliase auf und stellt sicher, dass sie auf sechsstellige Hex-Farben verweisen. Ausserdem prueft er `sem.font-size.body` auf mindestens `16px` und `sem.font-size.body-small` auf mindestens `14px`.

Die aktuelle Quelle enthaelt keine semantischen Content-/Hintergrund-Paare, keinen Fokus-Ring und keine Zeilenhoehen. Deshalb berechnet der Check derzeit keine Kontrastverhaeltnisse und bewertet keine Zeilenhoehen. Solche Regeln koennen erst ergaenzt werden, wenn die zugehoerigen Tokens in `tokens/tokens.json` vorhanden sind. Details stehen in `.github/skills/accessibility/SKILL.md`.

## Tokenstruktur

- Die Quell-Sets sind `primitive` und `semantic`; semantische Rollen liegen unter `semantic.sem`.
- Die aktuelle Quelle hat keine `component`-Gruppe. Light-/Dark-Metadaten waehlen derzeit dieselben beiden Sets und liefern keine unterschiedlichen Tokenwerte.

Semantische Tokens sollen auf vorhandene primitive Tokens verweisen. Vor einem neuen Token daher prüfen, ob bereits ein fachlich passender Wert oder Alias existiert.

## Änderungen prüfen

Nach Änderungen an Tokens, `scripts/build-css.mjs` oder Generator- und Validierungsskripten:

```bash
npm run build
```

Anschließend nur die betroffenen Variablen in `build/css/_variables.css` kontrollieren.
