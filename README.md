# Design Tokens

Design Tokens werden aus einer JSON-Quelle in eine flache JSON-Datei und anschließend in CSS-Variablen umgewandelt. Die Tokenquelle liegt unter `tokens/tokens.json`.

## Voraussetzungen

- Node.js und npm

Abhängigkeiten installieren:

```bash
npm install
```

## Build

Der vollständige Build führt beide Schritte in der richtigen Reihenfolge aus:

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

Die Style-Dictionary-Konfiguration liegt in `config.json`. Sie verwendet die Flatten-Datei als Quelle und schreibt CSS nach `build/css/`.

## Tokenstruktur

- `primitive`: Rohwerte, Skalen und Farbwerte
- `semantic`: Rollen und Aliase für konkrete Verwendungen

Semantische Tokens sollen auf vorhandene primitive Tokens verweisen. Vor einem neuen Token daher prüfen, ob bereits ein fachlich passender Wert oder Alias existiert.

## Änderungen prüfen

Nach Änderungen an Tokens, `config.json` oder `scripts/flatten-tokens.js`:

```bash
npm run build
```

Anschließend nur die betroffenen Variablen in `build/css/_variables.css` kontrollieren.
