import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import jsdoc from "eslint-plugin-jsdoc";
import unusedImports from "eslint-plugin-unused-imports";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
    {
        files: ["**/*.ts"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: "./tsconfig.json",
                ecmaVersion: "latest",
                sourceType: "module",
            },
        },
        plugins: {
            "@typescript-eslint": ts,
            jsdoc,
            "unused-imports": unusedImports,
            prettier: prettierPlugin,
        },
        rules: {
            ...ts.configs["eslint-recommended"].rules,
            ...ts.configs["recommended"].rules,

            "prettier/prettier": "warn",
        },
    },
    prettierConfig,
    {
        ignores: ["dist/**", "node_modules/**", "**/*.d.ts"],
    },
];