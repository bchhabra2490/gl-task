const tsParser = require("@typescript-eslint/parser");

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    rules: {
      "no-console": "off"
    }
  }
];

