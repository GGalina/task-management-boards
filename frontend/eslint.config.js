import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";

export default [
  {
    ignores: ["dist/", "build/", "node_modules/"],
  },

  // JavaScript recommended rules
  js.configs.recommended,

  // TypeScript recommended rules
  ...tseslint.configs.recommended,

  // React + Hooks plugins
  {
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
    settings: {
      react: { version: "detect" },
    },
  },

  // Prettier integration (disables formatting rules from ESLint)
  prettier,
];
