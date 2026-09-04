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

Ohne diese Anpassungen ignoriert Style Dictionary die Werte stillschweigend, statt einen Fehler zu werfen: Typografie-Tokens fallen alle auf denselben Standardwert (`16px sans-serif`) zurück, und Rechenausdrücke landen unausgewertet und damit als ungültiges CSS in der Ausgabe (z. B. `var(--space-01)*var(--scale)`). Die Accessibility-Prüfung merkt das nicht, weil sie ihre Werte direkt aus `tokens/tokens.json` liest statt aus dem generierten CSS.

`scripts/build-css.mjs` behebt das: Ein eigener Preprocessor benennt die Plural-Eigenschaften der Typografie-Tokens in die von Style Dictionary erwartete Einzahl um, `@tokens-studio/sd-transforms` wertet die Rechenausdrücke aus, und `outputReferences` ist so konfiguriert, dass nur echte 1:1-Aliase als `var(--x)` erhalten bleiben – berechnete Werte werden vollständig aufgelöst. Beim Bearbeiten von `scripts/build-css.mjs` sollte diese Logik erhalten bleiben; ein Wechsel zurück auf die reine Style-Dictionary-CLI reproduziert den ursprünglichen Fehler.

## Accessibility-Pruefung

Die Accessibility-Validierung läuft automatisch vor jedem vollständigen Build. Sie kann auch einzeln ausgeführt werden:

```bash
npm run tokens:validate-a11y
```

Der Check löst Alias-Referenzen auf und prüft die bewusst festgelegten semantischen Kombinationen:

- Text-Kontrast von `sem.color.content.primary` und `sem.color.content.secondary` auf `sem.color.surface.0-lowest` mit mindestens `4.5:1`
- Kontrast des sichtbaren Fokus-Rings `sem.color.focus.ring` auf allen definierten `sem.color.surface`-Stufen mit mindestens `3:1`
- Lesetext: `sem.typography.body-text` mit mindestens `16px` Schriftgröße und `1.5` Zeilenhöhe
- Kleiner Lesetext: `sem.typography.body-small-text` mit mindestens `14px` Schriftgröße und `1.4` Zeilenhöhe

Neue semantische Content-, Surface- oder Fokusrollen müssen mit ihren vorgesehenen Paaren in `scripts/validate-a11y-tokens.js` ergänzt werden. Die Detailregeln stehen in `.github/skills/accessibility/SKILL.md`.

## Tokenstruktur

- `primitive`: Rohwerte, Skalen und Farbwerte
- `semantic`: Rollen und Aliase für konkrete Verwendungen

Semantische Tokens sollen auf vorhandene primitive Tokens verweisen. Vor einem neuen Token daher prüfen, ob bereits ein fachlich passender Wert oder Alias existiert.

## Änderungen prüfen

Nach Änderungen an Tokens, `scripts/build-css.mjs` oder Generator- und Validierungsskripten:

```bash
npm run build
```

Anschließend nur die betroffenen Variablen in `build/css/_variables.css` kontrollieren.
