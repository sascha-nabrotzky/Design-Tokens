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

Die Style-Dictionary-Konfiguration liegt in `config.json`. Sie verwendet die Flatten-Datei als Quelle und schreibt CSS nach `build/css/`.

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

Nach Änderungen an Tokens, `config.json` oder Generator- und Validierungsskripten:

```bash
npm run build
```

Anschließend nur die betroffenen Variablen in `build/css/_variables.css` kontrollieren.
