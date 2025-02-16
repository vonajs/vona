import antfu from '@antfu/eslint-config';
import globals from 'globals';
import { rules } from '../common/rules.js';

export default function eslintConfig(config, ...args) {
  config = Object.assign({
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: true,
      jsx: true,
    },
    typescript: true,
    gitignore: false,
  }, config);
  return antfu(config, {
    files: ['**/*.ts', '**/*.tsx'],
    rules,
    languageOptions: {
      parserOptions: {
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  }, ...args);
}

// export default function eslintConfig(config, ...args) {
//   return [
//     ...tseslint.configs.recommended,
//     stylistic.configs.customize({
//       flat: true,
//       indent: 2,
//       quotes: 'single',
//       semi: true,
//       jsx: true,
//     }),
//     {
//       files,
//       languageOptions: {
//         parser: parserTs,
//         parserOptions: {
//           ecmaFeatures: {
//             jsx: true,
//             tsx: true,
//           },
//           ecmaVersion: 'latest',
//           useJSXTextNode: true,
//           sourceType: 'module',
//         },
//         globals: {
//           ...globals.node,
//           ...globals.jest,
//         },
//       },
//       rules,
//     },
//     {
//       files: ['**/*.json'],
//       ignores: ['package-lock.json'],
//       language: 'json/json',
//       ...json.configs.recommended,
//     },
//   ];
// }
