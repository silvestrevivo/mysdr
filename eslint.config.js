import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import perfectionist from 'eslint-plugin-perfectionist';
import svelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';

import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

const sortImportsRule = [
  'warn',
  {
    groups: [
      ['builtin', 'external'],
      'internal',
      'unknown',
      'parent',
      'sibling',
      'index',
      'object',
      [
        'builtin-type',
        'external-type',
        'type',
        'internal-type',
        'parent-type',
        'sibling-type',
        'index-type',
      ],
      'side-effect',
      'style',
    ],
    newlinesBetween: 'always',
    order: 'asc',
    type: 'natural',
  },
];

export default defineConfig(
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs.recommended,
  perfectionist.configs['recommended-natural'],
  prettier,
  ...svelte.configs.prettier,
  {
    // temporary solution till Svelte team fixes the issue
    rules: {
      'svelte/no-navigation-without-resolve': [
        'error',
        {
          ignoreGoto: false,
          ignoreLinks: true,
          ignorePushState: false,
          ignoreReplaceState: false,
        },
      ],
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTaggedTemplates: true,
          allowTernary: true,
        },
      ],
      'perfectionist/sort-imports': sortImportsRule,
    },
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      // typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
      // see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
      'no-undef': 'off',
    },
  },
  {
    files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
    languageOptions: {
      parserOptions: {
        extraFileExtensions: ['.svelte'],
        parser: ts.parser,
        projectService: true,
        svelteConfig,
      },
    },

    rules: {
      'perfectionist/sort-imports': sortImportsRule,
    },
  },
  {
    ignores: ['build/', '.svelte-kit/', 'dist/'],
  },
);
