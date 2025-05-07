import js from "@eslint/js";
import globals from "globals";
// import pluginReact from "eslint-plugin-react";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.{js,mjs,cjs}"],
		plugins: { js },
		extends: ["js/recommended"],
		rules: {
			indent: ["error", "tab"], // tab for indentation
			quotes: ["error", "double"], // Enforce single quotes
			semi: ["error", "always"], // Enforce semicolons at the end of statements
			"no-unused-vars": "warn", // Show warning for unused variables
			"no-console": "off", // Allow console logs
			"no-debugger": "warn", // Warn about debugger statements
			"arrow-body-style": ["error", "always"],
			"require-await": "error", // Enforce await in async functions
			"no-const-assign": "error",
		},
	},
	{
		files: ["**/*.{js,mjs,cjs}"],
		languageOptions: { globals: globals.browser },
	},
	eslintPluginPrettier,
	// pluginReact.configs.flat.recommended,
]);
