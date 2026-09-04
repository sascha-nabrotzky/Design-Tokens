import StyleDictionary from "style-dictionary";
import { register } from "@tokens-studio/sd-transforms";

register(StyleDictionary);

// The token source models typography composites with Tokens Studio's plural
// property names (fontFamilies, fontSizes, lineHeights, fontWeights). Style
// Dictionary's typography shorthand transform only recognizes the singular
// DTCG names (fontFamily, fontSize, lineHeight, fontWeight); anything else is
// silently ignored, which previously collapsed every typography token to a
// "16px sans-serif" fallback in the generated CSS.
StyleDictionary.registerPreprocessor({
  name: "typography-property-names",
  preprocessor: (dictionary) => {
    const RENAME = {
      fontFamilies: "fontFamily",
      fontSizes: "fontSize",
      lineHeights: "lineHeight",
      fontWeights: "fontWeight",
    };

    const walk = (node) => {
      if (node === null || typeof node !== "object") {
        return;
      }

      if (node.$type === "typography" && node.$value && typeof node.$value === "object") {
        for (const [from, to] of Object.entries(RENAME)) {
          if (from in node.$value) {
            const value = node.$value[from];
            node.$value[to] = Array.isArray(value) ? value.join(", ") : value;
            delete node.$value[from];
          }
        }
      }

      for (const value of Object.values(node)) {
        walk(value);
      }
    };

    walk(dictionary);
    return dictionary;
  },
});

const sd = new StyleDictionary({
  source: ["tokens/tokens.flattened.json"],
  preprocessors: ["typography-property-names", "tokens-studio"],
  platforms: {
    css: {
      transformGroup: "tokens-studio",
      transforms: ["name/kebab"],
      buildPath: "build/css/",
      files: [
        {
          destination: "_variables.css",
          format: "css/variables",
          options: {
            // Keep `var(--x)` only for tokens whose raw value is a single
            // alias reference. Math expressions like "{a}*{b}" must be
            // fully evaluated instead, since `var(--a)*var(--b)` is not
            // valid CSS.
            outputReferences: (token) => {
              const raw = token.original?.$value ?? token.original?.value;
              return typeof raw === "string" && /^\{[^{}]+\}$/.test(raw);
            },
          },
        },
      ],
    },
  },
});

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();
