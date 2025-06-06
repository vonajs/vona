import path from 'node:path';
import fse from 'fs-extra';
import { globby } from 'globby';

export async function generateConfig(modulePath: string) {
  const configFile = path.join(modulePath, 'src/config/config.ts');
  if (!fse.existsSync(configFile)) return '';
  // combine
  const content = `/** config: begin */
export * from '../config/config.ts';
import type { config } from '../config/config.ts';
/** config: end */
`;
  return content;
}

export async function generateConstant(modulePath: string) {
  const constantFile = path.join(modulePath, 'src/config/constants.ts');
  if (!fse.existsSync(constantFile)) return '';
  // combine
  const content = `/** constant: begin */
export * from '../config/constants.ts';
import { constants } from '../config/constants.ts';
/** constant: end */
`;
  return content;
}

export async function generateLocale(modulePath: string) {
  const files = await globby('src/config/locale/*.ts', { cwd: modulePath });
  if (files.length === 0) return '';
  files.sort();
  const contentImports: string[] = [];
  const contentLocales: string[] = [];
  for (const file of files) {
    const localeName = path.basename(file, '.ts');
    const className = `locale_${localeName.replace('-', '_')}`;
    contentImports.push(`import ${className} from '../config/locale/${localeName}.ts';`);
    contentLocales.push(`'${localeName}': ${className},`);
  }
  // combine
  const content = `/** locale: begin */
${contentImports.join('\n')}
export const locales = {
  ${contentLocales.join('\n')}
};
/** locale: end */
`;
  return content;
}

export async function generateError(modulePath: string) {
  const errorFile = path.join(modulePath, 'src/config/errors.ts');
  if (!fse.existsSync(errorFile)) return '';
  // combine
  const content = `/** error: begin */
export * from '../config/errors.ts';
import type { Errors } from '../config/errors.ts';
/** error: end */
`;
  return content;
}
