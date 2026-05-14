/** @type {import("prettier").Config} */
module.exports = {
  // ── Formatage de base ───────────────────────
  semi: true,
  singleQuote: true,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "all",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  endOfLine: "lf",

  // ── Plugins ─────────────────────────────────
  // Trie automatiquement les classes Tailwind dans l'ordre canonique
  plugins: ["prettier-plugin-tailwindcss"],

  // ── Overrides par type de fichier ───────────
  overrides: [
    {
      files: ["*.json"],
      options: { printWidth: 80 },
    },
    {
      files: ["*.md"],
      options: { proseWrap: "always" },
    },
    {
      files: ["*.css"],
      options: { singleQuote: false },
    },
  ],
};
