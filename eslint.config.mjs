import globals from 'globals'
import js from '@eslint/js'
import ts from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'

export default ts.config(
  js.configs.recommended,
  ts.configs.recommendedTypeChecked,
  vue.configs["flat/recommended"],
  stylistic.configs.customize({
    braceStyle: '1tbs',
  }),
  {
    files: ['**/*.ts', '**/*.vue'],
    ignores: ['**/snippets/**'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        parser: ts.parser,
        projectService: true,
        extraFileExtensions: ['.vue'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
)
