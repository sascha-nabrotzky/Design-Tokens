#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const sourcePath = path.resolve(process.cwd(), 'tokens/tokens.json');
const minimumContrast = {
    text: 4.5,
    focusIndicator: 3,
};

function isPlainObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function collectTokens(value, tokenPath = [], result = {}) {
    if (isPlainObject(value) && '$value' in value && '$type' in value) {
        result[tokenPath.join('.')] = value;
        return result;
    }

    if (!isPlainObject(value)) {
        return result;
    }

    for (const [key, child] of Object.entries(value)) {
        if (!key.startsWith('$')) {
            collectTokens(child, [...tokenPath, key], result);
        }
    }

    return result;
}

function resolveValue(value, tokens, resolving = []) {
    if (typeof value !== 'string') {
        return value;
    }

    const reference = value.match(/^\{(.+)}$/);
    if (!reference) {
        return value;
    }

    const tokenPath = reference[1];
    if (resolving.includes(tokenPath)) {
        throw new Error(
            `Alias cycle: ${[...resolving, tokenPath].join(' -> ')}`,
        );
    }

    const token = tokens[tokenPath];
    if (!token) {
        throw new Error(`Unknown token reference: ${tokenPath}`);
    }

    return resolveValue(token.$value, tokens, [...resolving, tokenPath]);
}

function parseHexColor(value, tokenPath) {
    const match = typeof value === 'string' && value.match(/^#([\da-f]{6})$/i);
    if (!match) {
        throw new Error(`${tokenPath} must resolve to a six-digit hex color.`);
    }

    return [0, 2, 4].map((offset) =>
        Number.parseInt(match[1].slice(offset, offset + 2), 16),
    );
}

function relativeLuminance(rgb) {
    const channels = rgb.map((channel) => {
        const value = channel / 255;
        return value <= 0.04045
            ? value / 12.92
            : ((value + 0.055) / 1.055) ** 2.4;
    });

    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(foreground, background) {
    const foregroundLuminance = relativeLuminance(foreground);
    const backgroundLuminance = relativeLuminance(background);
    const lighter = Math.max(foregroundLuminance, backgroundLuminance);
    const darker = Math.min(foregroundLuminance, backgroundLuminance);
    return (lighter + 0.05) / (darker + 0.05);
}

function assertContrast(
    tokens,
    foregroundPath,
    backgroundPath,
    minimum,
    label,
) {
    const foreground = parseHexColor(
        resolveValue(tokens[foregroundPath].$value, tokens),
        foregroundPath,
    );
    const background = parseHexColor(
        resolveValue(tokens[backgroundPath].$value, tokens),
        backgroundPath,
    );
    const ratio = contrastRatio(foreground, background);

    if (ratio < minimum) {
        throw new Error(
            `${label}: ${foregroundPath} on ${backgroundPath} is ${ratio.toFixed(2)}:1; requires ${minimum}:1.`,
        );
    }
}

function assertTypography(
    tokens,
    tokenPath,
    minimumFontSize,
    minimumLineHeight,
) {
    const typography = tokens[tokenPath];
    if (!typography || typography.$type !== 'typography') {
        throw new Error(`Missing typography token: ${tokenPath}`);
    }

    const fontSize = Number(resolveValue(typography.$value.fontSizes, tokens));
    const lineHeight = Number(
        resolveValue(typography.$value.lineHeights, tokens),
    );
    if (!Number.isFinite(fontSize) || fontSize < minimumFontSize) {
        throw new Error(
            `${tokenPath} needs a font size of at least ${minimumFontSize}px.`,
        );
    }
    if (!Number.isFinite(lineHeight) || lineHeight < minimumLineHeight) {
        throw new Error(
            `${tokenPath} needs a line height of at least ${minimumLineHeight}.`,
        );
    }
}

function main() {
    const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
    const tokens = collectTokens({ ...source.primitive, ...source.semantic });
    const surfaces = [
        'sem.color.surface.0-lowest',
        'sem.color.surface.1-low',
        'sem.color.surface.2-mid',
        'sem.color.surface.3-high',
        'sem.color.surface.4-highest',
    ];

    assertContrast(
        tokens,
        'sem.color.content.primary',
        'sem.color.surface.0-lowest',
        minimumContrast.text,
        'Text contrast',
    );
    assertContrast(
        tokens,
        'sem.color.content.secondary',
        'sem.color.surface.0-lowest',
        minimumContrast.text,
        'Text contrast',
    );
    for (const surfacePath of surfaces) {
        assertContrast(
            tokens,
            'sem.color.focus.ring',
            surfacePath,
            minimumContrast.focusIndicator,
            'Focus indicator contrast',
        );
    }

    assertTypography(tokens, 'sem.typography.body-text', 16, 1.5);
    assertTypography(tokens, 'sem.typography.body-small-text', 14, 1.4);

    console.log('Accessibility token validation passed.');
}

try {
    main();
} catch (error) {
    console.error(`Accessibility token validation failed: ${error.message}`);
    process.exitCode = 1;
}
