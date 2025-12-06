// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
// import { defineConfig, globalIgnores } from 'eslint/config'

// export default defineConfig([
//   globalIgnores(['dist']),
//   {
//     files: ['**/*.{js,jsx}'],
//     extends: [
//       js.configs.recommended,
//       reactHooks.configs.flat.recommended,
//       reactRefresh.configs.vite,
//     ],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//       parserOptions: {
//         ecmaVersion: 'latest',
//         ecmaFeatures: { jsx: true },
//         sourceType: 'module',
//       },
//     },
//     rules: {
//       'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
//     },
//   },
// ])


import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", "node_modules"]),

  {
    files: ["**/*.{js,jsx}"],

    extends: [
      js.configs.recommended,              // Base JS rules
      react.configs.flat.recommended,      // React rules
      reactHooks.configs.flat.recommended, // Hooks rules
      reactRefresh.configs.vite,           // Fast refresh rules for Vite
    ],

    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },

    settings: {
      react: {
        version: "detect", // auto detect installed React version
      },
    },

    rules: {
      // FIXES "motion is defined but never used" & JSX tag false warnings
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "motion", // ignore framer-motion usage in JSX
          argsIgnorePattern: "^_",     // ignore unused args starting with _
        },
      ],

      // Optional: Remove warning for React import in JSX (React 18+)
      "react/react-in-jsx-scope": "off",

      // Improves accessibility
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",

      // Optional: allow JSX in .js files
      "react/jsx-filename-extension": ["off"],
    },
  },
]);
