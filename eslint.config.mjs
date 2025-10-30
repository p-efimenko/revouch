import { defineConfig } from 'eslint/config'

import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'
import stylistic from '@stylistic/eslint-plugin'

const eslintConfig = defineConfig([
  // Next.js Core Web Vitals configuration
  ...nextVitals,
  
  // Next.js TypeScript configuration
  ...nextTs,
  
  // Prettier configuration to avoid conflicts
  prettier,
  
  // Custom stylistic rules
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/max-len': [
        'error',
        {
          code: 100,
          ignoreUrls: true,
          ignoreTemplateLiterals: true,
          ignoreStrings: true,
          ignoreComments: true,
          ignoreRegExpLiterals: true,
        },
      ],
      // Enable auto-fix for stylistic rules
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      // '@stylistic/padding-line-between-statements': [
      //   'error',
      //   { blankLine: 'always', prev: '*', next: 'return' },
      //   { blankLine: 'any', prev: 'import', next: 'import' },
      // ],
    },
  },
  
  // Custom rules
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn',
    },
  },
  
  // Generated API files override - Prettier can't break long union types
  {
    files: ['src/api/**/*.ts'],
    rules: {
      '@stylistic/max-len': 'off',
    },
  },
  
  // Global ignores
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      '**/*.d.ts',
      '**/*.mjs',
      '**/*.mts',
      'node_modules/**',
    ],
  },
])

export default eslintConfig