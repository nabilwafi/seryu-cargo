import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import ts_eslint from '@typescript-eslint/eslint-plugin'
import ts_parser from '@typescript-eslint/parser'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores: [
      'src/databases/queries/*',
      '**/node_modules/*',
      '**/dist/*',
      '**/public/*',
      '**/tsconfig.json',
      '.prettierignore',
      '.prettierrc'
    ],
    plugins: {
      ts_eslint
    },
    rules: {
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  },
  {
    languageOptions: {
      globals: globals.node,
      parser: ts_parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
]
