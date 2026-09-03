---
name: token-workflow
description: 'Nutze diesen Skill beim Hinzufügen, Ändern, Umbenennen, Löschen oder Validieren von Design-Tokens, der Flatten-Ausgabe, der Style-Dictionary-Konfiguration oder der generierten CSS-Ausgabe in diesem Repository.'
argument-hint: 'Beschreibe das gewünschte Token oder die zu ändernde Ausgabe'
---

# Arbeitsablauf für Design-Tokens

Nutze diesen Skill für Änderungen an Token-Werten, Aliasen, Namen, Hierarchien, der Build-Konfiguration oder generierten Ausgaben. Für reine Farb-, Abstands- oder Typografieänderungen den jeweiligen Fach-Skill verwenden.

## Ablauf

1. Den konkreten Token-Pfad in `tokens/tokens.json` prüfen und vorhandene Struktur oder Aliase wiederverwenden.
2. Nur die Quelldatei ändern. `tokens/tokens.flattened.json` und `build/css/_variables.css` werden nicht manuell bearbeitet.
3. `npm run build` ausführen und nur die betroffenen generierten Variablen prüfen.
4. Umbenennungen oder Löschungen öffentlicher Tokens als kompatibilitätsbrechende Änderung nennen.

## Benennung und States

- Die verschachtelte Benennung der Quelle beibehalten; generierte CSS-Namen ergeben sich daraus.
- Semantische Namen sollen Rolle und Kontext ausdrücken, Primitive dagegen Wert oder Skala.
- `default` ist kein eigener State-Name für semantische Tokens. Wenn ein Token Zustände modelliert, müssen konkrete Zustände wie `enabled`, `hover`, `focus`, `pressed`, `selected` und `disabled` verwendet werden.
- Zustände wie `enabled`, `hover`, `focus`, `pressed`, `selected` und `disabled` nur prüfen, wenn der konkrete Token diese Zustände tatsächlich unterstützt.
- Ein Token darf nicht nur wegen eines Standardzustands als `default` benannt werden, wenn ein sachlich passenderer Zustand existiert.

## Semantische Prüfung

- Bei neuen Tokens prüfen, ob bereits ein fachlich gleichwertiges Token vorhanden ist; keine Duplikate mit abweichenden Namen anlegen.
- Sicherstellen, dass Primitive Rohwerte enthalten und semantische oder Komponenten-Tokens passende Aliase verwenden.
- Bei Aliasen auf kompatible Token-Typen achten, beispielsweise `color` nur auf `color` referenzieren.
- Neue oder geänderte Theme-Tokens auf eine fachlich passende Gegenvariante prüfen; keine Variante erfinden, wenn die Quelle keine getrennten Werte führt.
- Alias-Zyklen, Verweise auf nicht vorhandene Tokens und semantisch irreführende Referenzen als Hinweis nennen.
- Unklare fachliche Zuordnungen nicht eigenmächtig entscheiden, sondern mit konkretem Token-Pfad und einer kurzen Begründung zur Klärung markieren.
- Nach dem Build die von der Änderung betroffene generierte CSS-Ausgabe auf die erwartete CSS-Eigenschaft prüfen.
