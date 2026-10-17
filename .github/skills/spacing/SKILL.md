---
name: spacing
description: "Verwende diesen Skill bei Änderungen an Abstands-Design-Tokens,
  Abstandsgrößen, Rändern, Auffüllungen oder semantischen Abstandsrollen."
argument-hint: "Beschreibe das gewünschte Token oder die zu ändernde Ausgabe"
---

# Arbeitsablauf fuer Abstands-Design-Tokens

Nutze diesen Skill nur für Abstände, Dimensionen, Border-Radius oder deren semantische Rollen. Für allgemeine Token- oder Build-Änderungen gilt zusätzlich der `token-workflow`.

## Aktuelle Struktur

- Primitive Abstaende liegen unter `primitive.space` mit den Schluesseln `2`, `4`, `8`, `12`, `16`, `24`, `32`, `48`, `64`, `96` und `128` und dem Typ `spacing`.
- Primitive Dimensionen fuer Groessen liegen unter `primitive.size` mit den vorhandenen Schluesseln `12` bis `48` und dem Typ `dimension`.
- Semantische Icon-Groessen liegen unter `semantic.sem.size.icon.sm`, `.md` und `.lg`; sie referenzieren `primitive.size.12`, `.16` und `.20`.
- Primitive Radien liegen unter `primitive.border-radius`; semantische Aliase liegen unter `semantic.sem.border-radius` (`xs`, `sm`, `md`, `lg`, `xl`, `full`).
- Aktuell gibt es keine semantischen Abstands-Tokens unter `semantic.sem.space`, keine `dimension.base` und keine `scale`.

## Regeln fuer neue Tokens

- Vor neuen Werten die vorhandene `primitive.space`-Skala pruefen; keine nicht vorhandene Rasterbasis oder Berechnungsregel voraussetzen.
- Semantische Aliase nur fuer konkrete, wiederverwendete Rollen ergaenzen. Richtungsnamen wie `padding.inline`, `padding.block`, `gap` oder `margin` nur dann einfuehren, wenn die entsprechende Rolle tatsaechlich benoetigt wird.
- Aliase muessen auf passende Typen verweisen: Abstaende auf `spacing`, Groessen auf `dimension`, Radien auf `borderRadius`.
- Keine zusaetzliche `default`-Ebene oder Zustandsstruktur anlegen, wenn der konkrete Token keine Zustaende modelliert.
- Keine duplizierten Werte mit abweichenden Namen anlegen.

## Validierung

1. Den konkreten Pfad in `tokens/tokens.json` pruefen.
2. Alias-Ziel und Token-Typ `spacing`, `dimension` beziehungsweise `borderRadius` kontrollieren.
3. Nach Änderungen `npm run build` ausführen.
4. Nur die betroffenen CSS-Variablen und resultierenden Referenzen prüfen.
