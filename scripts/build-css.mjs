import StyleDictionary from "style-dictionary";
import { register } from "@tokens-studio/sd-transforms";

register(StyleDictionary);

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

      if (
        node.$type === "typography" &&
        node.$value &&
        typeof node.$value === "object"
      ) {
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

StyleDictionary.registerTransform({
  name: "size/px-to-rem",
  type: "value",
  filter: (token) => {
    const type = token.$type ?? token.type;
    const isLineHeight = [type, ...(token.path ?? [])].some((part) =>
      String(part)
        .toLowerCase()
        .replace(/[^a-z]/g, "")
        .match(/^lineheights?$/),
    );
    const value = token.$value ?? token.value;
    const pixelTypes = [
      "spacing",
      "dimension",
      "fontSize",
      "fontSizes",
      "letterSpacing",
      "borderRadius",
    ];
    const isPixelValue =
      (typeof value === "string" &&
        /^(?:-?\d+(?:\.\d+)?|\.\d+)px$/.test(value)) ||
      (pixelTypes.includes(type) &&
        /^-?(?:\d+(?:\.\d+)?|\.\d+)$/.test(String(value)));

    return !isLineHeight && isPixelValue;
  },
  transform: (token) => {
    const value = token.$value ?? token.value;
    const pixels = typeof value === "string" ? Number.parseFloat(value) : value;

    return `${pixels / 16}rem`;
  },
});

const sd = new StyleDictionary({
  source: ["tokens/tokens.flattened.json"],
  preprocessors: ["typography-property-names", "tokens-studio"],
  platforms: {
    css: {
      transformGroup: "tokens-studio",
      transforms: ["name/kebab", "size/px-to-rem"],
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
