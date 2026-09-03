---
name: spacing
description: 'Verwende diesen Skill bei Änderungen an Abstands-Design-Tokens,
    Abstandsgrößen, Rändern, Auffüllungen oder semantischen Abstandsrollen.'
argument-hint: 'Beschreibe das gewünschte Token oder die zu ändernde Ausgabe'
---

# Arbeitsablauf fuer Abstands-Design-Tokens

Nutze diesen Skill nur für Abstände, Dimensionen, Border-Radius oder deren semantische Rollen. Für allgemeine Token- oder Build-Änderungen gilt zusätzlich der `token-workflow`.

## Token-Ebenen

- Primitive Abstands-Tokens liegen unter `primitive.space`.
- Primitive Grundmasse liegen unter `primitive.dimension`.
- Semantische Abstands-Tokens liegen unter `semantic.sem.space` und beschreiben die Verwendung in einer Komponente.
- Komponentenbezogene Tokens sind zu bevorzugen, wenn ein Abstand nur fuer eine konkrete Komponente gilt.

## Abstands-Raster

Das Raster basiert auf `primitive.dimension.base` mit dem Wert `4`. `primitive.scale` hat den Wert `2` und wird zur Skalierung der folgenden Stufen verwendet. Die primitive Skala reicht von `space.01` bis `space.07`:

- `space.01` ist die Basiseinheit.
- `space.02` bis `space.07` bauen jeweils auf der vorherigen Stufe auf.
- Neue Abstaende sollen sich in dieses Raster einordnen und nicht als beliebige Einzelwerte angelegt werden.

Die konkrete Verwendung wird ueber semantische Aliase beschrieben. Fuer Buttons sind aktuell `semantic.sem.space.button.padding.inline.default` und `semantic.sem.space.button.padding.block.default` definiert. Inline- und Blockrichtung bleiben getrennt, damit die Dimensionen unabhaengig angepasst werden koennen.

## Border Radius

Border-Radius-Tokens liegen als primitive Werte unter `primitive.br-xs`, `primitive.br-sm`, `primitive.br-md` und `primitive.br-lg`. Sie beziehen sich auf `dimension.base` und `scale` und sollen nach ihrer Groesse statt nach einzelnen Komponenten verwendet werden.

Komponenten verwenden semantische Radius-Aliase. Der vorhandene Button-Alias `semantic.sem.border-radius.btn.primary.default` verweist auf `primitive.br-lg`. Bei einer Aenderung des Button-Radius ist daher der semantische Alias zu pruefen, bevor ein weiterer Radius angelegt wird.

## Regeln fuer neue Tokens

- Primitive Tokens enthalten die Rasterwerte oder deren Berechnung.
- Semantische Tokens verweisen per Alias auf primitive Tokens.
- Abstaende nach ihrer Richtung und Funktion benennen, zum Beispiel `padding.inline`, `padding.block`, `gap` oder `margin`, statt nach ihrer optischen Wirkung.
- Keine duplizierten Werte mit abweichenden Namen anlegen.
- Bei neuen semantischen Zuständen die bestehende Benennung mit `default` beibehalten und weitere Zustände nur bei konkretem Bedarf ergänzen.

## Validierung

1. Pruefen, ob die benoetigte Stufe oder ein fachlich passender Alias bereits vorhanden ist.
2. Alias-Ziel und Token-Typ `spacing` beziehungsweise `borderRadius` kontrollieren.
3. Nach Änderungen `npm run build` ausführen.
4. Nur die betroffenen CSS-Variablen und resultierenden Referenzen prüfen.
