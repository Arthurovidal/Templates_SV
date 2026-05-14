/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "next/core-web-vitals",
    "next/typescript",
    "plugin:jsx-a11y/recommended",
  ],
  plugins: ["@typescript-eslint", "jsx-a11y"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  rules: {
    // ── TypeScript ──────────────────────────────
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports" },
    ],
    "@typescript-eslint/no-non-null-assertion": "warn",

    // ── React ───────────────────────────────────
    "react/self-closing-comp": "error",
    "react/jsx-sort-props": [
      "warn",
      { callbacksLast: true, shorthandFirst: true },
    ],

    // ── Accessibilité ───────────────────────────
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/aria-props": "error",

    // ── Import ──────────────────────────────────
    "no-duplicate-imports": "error",

    // ── Sécurité ────────────────────────────────
    "no-eval": "error",
    "no-implied-eval": "error",

    // ── Qualité ─────────────────────────────────
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "prefer-const": "error",
    "no-var": "error",
  },
  ignorePatterns: [
    "node_modules/",
    ".next/",
    "dist/",
    ".turbo/",
    "*.config.js",
    "*.config.ts",
  ],
};
