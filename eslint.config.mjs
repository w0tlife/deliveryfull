import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser, // Для фронтенда
        ...globals.node,    // Для Node.js
      },
    },
  },
  pluginJs.configs.recommended,
];

