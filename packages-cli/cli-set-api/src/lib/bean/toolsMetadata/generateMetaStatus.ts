import path from 'path';
import eggBornUtils from 'egg-born-utils';
import { checkIgnoreOfParts } from './utils.js';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';

export async function generateMetaStatus(_moduleName: string, modulePath: string) {
  const pattern = `${modulePath}/src/bean/summerCache.*.ts`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  if (files.length === 0) return '';
  files.sort();
  const contentImports: string[] = [];
  const contentRecords: string[] = [];
  for (const file of files) {
    const fileName = path.basename(file);
    if (fileName.startsWith('_')) continue;
    const parts = fileName.split('.').slice(0, -1);
    if (parts.length !== 2) continue;
    const isIgnore = checkIgnoreOfParts(parts);
    if (isIgnore) continue;
    const resourceName = parts[1];
    const className = 'SummerCache' + toUpperCaseFirstChar(resourceName);
    contentImports.push(`import { ${className} } from '../bean/summerCache.${resourceName}.js';`);
    contentRecords.push(`'${resourceName}': ${className};`);
  }
  if (contentImports.length === 0) return '';
  // combine
  const content = `/** summerCaches: begin */
${contentImports.join('\n')}
export interface IModuleSummerCache {
  ${contentRecords.join('\n')}
}
/** summerCaches: end */
`;
  return content;
}
