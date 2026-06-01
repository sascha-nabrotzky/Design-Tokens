#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const inputArg = process.argv[2] || "tokens/tokens.json";
const outputArg = process.argv[3] || "tokens/tokens.flattened.json";

const inputPath = path.resolve(process.cwd(), inputArg);
const outputPath = path.resolve(process.cwd(), outputArg);

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function main() {
  const raw = fs.readFileSync(inputPath, "utf8");
  const tokens = JSON.parse(raw);

  if (!isPlainObject(tokens)) {
    throw new Error("Input JSON must be an object at top level.");
  }

  const result = {};

  for (const [topLevelKey, topLevelValue] of Object.entries(tokens)) {
    if (topLevelKey === "$themes" || topLevelKey === "$metadata") {
      continue;
    }

    if (!isPlainObject(topLevelValue)) {
      continue;
    }

    for (const [childKey, childValue] of Object.entries(topLevelValue)) {
      if (Object.prototype.hasOwnProperty.call(result, childKey)) {
        console.warn(
          `Warning: key "${childKey}" already exists and will be overwritten by "${topLevelKey}".`,
        );
      }

      result[childKey] = childValue;
    }
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");

  console.log(`Created: ${path.relative(process.cwd(), outputPath)}`);
}

main();
