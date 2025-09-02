import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import nextPlugin from '@next/eslint-plugin-next';
import globals from 'globals';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
    {
        ignores: [
            'node_modules',
            '.next',
        ],
    },

    // base rules JS
    js.configs.recommended,
    jsxA11y.flatConfigs.recommended,

    // TS/TSX + React + Next
    {
        files: [ '**/*.{ts,tsx}' ],
        plugins: {
            '@typescript-eslint': tsPlugin,
            react: reactPlugin,
            'react-hooks': reactHooks,
            next: nextPlugin,
        },
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 2025,
                sourceType: 'module',
                ecmaFeatures: { jsx: true },
                project: './tsconfig.json',
            },
            globals: {
                ...globals.browser,
                ...globals.es2025,
                ...globals.node,
                React: 'readonly',
            },
        },
        rules: {
            // Stylistic rules
            'indent': [ 'error', 4 ], // 4 пробела
            'semi': [ 'error', 'always' ], // точки с запятой
            'quotes': [ 'error', 'single', { avoidEscape: true } ], // одинарные кавычки
            'jsx-quotes': [ 'error', 'prefer-double' ], // двойные в JSX
            'comma-dangle': [ 'error', 'always-multiline' ], // запятые в конце списков/объектов
            'object-curly-spacing': [ 'error', 'always' ], // пробелы внутри объектов
            'array-bracket-spacing': [ 'error', 'always' ], // пробелы в массивах
            'computed-property-spacing': [ 'error', 'always' ], // пробелы в computed свойствах
            'space-in-parens': [ 'error', 'never' ], // без пробелов внутри скобок функций
            'space-before-blocks': 'error',
            'space-before-function-paren': [ 'error', 'never' ],
            'keyword-spacing': [ 'error', { before: true, after: true } ],
            'max-len': [ 'error', { code: 500, ignoreComments: true } ],
            'no-trailing-spaces': 'error',
            'eol-last': [ 'error', 'always' ],
            'no-unused-vars': 'warn',

            // React
            'react/react-in-jsx-scope': 'off',
            'react/jsx-curly-spacing': [ 'error', { when: 'always', children: true } ],
            'react/jsx-wrap-multilines': [ 'error', { declaration: 'parens-new-line', assignment: 'parens-new-line' } ],

            // React Hooks
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // Next
            'next/no-html-link-for-pages': 'off',

        },
        settings: {
            react: { version: 'detect' },
        },
    },
];
