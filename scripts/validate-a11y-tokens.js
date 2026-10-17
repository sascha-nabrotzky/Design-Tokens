#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const sourcePath = path.resolve(process.cwd(), "tokens/tokens.json");
const minimumFontSizes = {
  "sem.font-size.body": 16,
  "sem.font-size.body-small": 14,
};

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function collectTokens(value, tokenPath = [], result = {}) {
  if (isPlainObject(value) && "$value" in value && "$type" in value) {
    result[tokenPath.join(".")] = value;
    return result;
  }

  if (!isPlainObject(value)) {
    return result;
  }

  for (const [key, child] of Object.entries(value)) {
    if (!key.startsWith("$")) {
      collectTokens(child, [...tokenPath, key], result);
    }
  }

  return result;
}

function resolveValue(value, tokens, resolving = []) {
  if (typeof value !== "string") {
    return value;
  }

  const reference = value.match(/^\{(.+)}$/);
  if (!reference) {
    return value;
  }

  const tokenPath = reference[1];
  if (resolving.includes(tokenPath)) {
    throw new Error(`Alias cycle: ${[...resolving, tokenPath].join(" -> ")}`);
  }

  const token = tokens[tokenPath];
  if (!token) {
    throw new Error(`Unknown token reference: ${tokenPath}`);
  }

  return resolveValue(token.$value, tokens, [...resolving, tokenPath]);
}

function parseHexColor(value, tokenPath) {
  const match = typeof value === "string" && value.match(/^#([\da-f]{6})$/i);
  if (!match) {
    throw new Error(`${tokenPath} must resolve to a six-digit hex color.`);
  }

  return [0, 2, 4].map((offset) =>
    Number.parseInt(match[1].slice(offset, offset + 2), 16),
  );
}

function assertSemanticColors(tokens) {
  const colors = Object.entries(tokens).filter(([tokenPath]) =>
    tokenPath.startsWith("sem.color."),
  );
  if (colors.length === 0) {
    throw new Error("Missing semantic color tokens.");
  }

  for (const [tokenPath, token] of colors) {
    if (token.$type !== "color") {
      throw new Error(`${tokenPath} must have type color.`);
    }
    parseHexColor(resolveValue(token.$value, tokens), tokenPath);
  }
}

function assertMinimumFontSize(tokens, tokenPath, minimumFontSize) {
  const token = tokens[tokenPath];
  if (!token || token.$type !== "fontSizes") {
    throw new Error(`Missing font size token: ${tokenPath}`);
  }

  const fontSize = Number(resolveValue(token.$value, tokens));
  if (!Number.isFinite(fontSize) || fontSize < minimumFontSize) {
    throw new Error(
      `${tokenPath} needs a font size of at least ${minimumFontSize}px.`,
    );
  }
}

function main() {
  const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
  const tokens = collectTokens({ ...source.primitive, ...source.semantic });

  assertSemanticColors(tokens);
  for (const [tokenPath, minimumFontSize] of Object.entries(minimumFontSizes)) {
    assertMinimumFontSize(tokens, tokenPath, minimumFontSize);
  }

  console.log("Accessibility token validation passed.");
}

try {
  main();
} catch (error) {
  console.error(`Accessibility token validation failed: ${error.message}`);
  process.exitCode = 1;
}
