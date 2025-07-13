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
        NodeJS: true,
        BigNumber: true,
      },
    },
  }, ...args);
}
