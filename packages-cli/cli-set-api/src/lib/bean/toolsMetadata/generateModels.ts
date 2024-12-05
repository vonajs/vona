import path from 'path';
import eggBornUtils from 'egg-born-utils';
import { checkIgnoreOfParts } from './utils.js';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';

export async function generateModels(_moduleName: string, modulePath: string) {
  const pattern = `${modulePath}/src/model/*.ts`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  if (files.length === 0) return '';
  files.sort();
  const contentImports: string[] = [];
  const contentRecords: string[] = [];
  for (const file of files) {
    const fileName = path.basename(file);
    if (fileName.startsWith('_')) continue;
    const parts = fileName.split('.').slice(0, -1);
    if (parts.length !== 1) continue;
    const isIgnore = checkIgnoreOfParts(parts);
    if (isIgnore) continue;
    const resourceName = parts[0];
    const className = 'Model' + toUpperCaseFirstChar(resourceName);
    contentImports.push(`import { ${className} } from '../model/${resourceName}.js';`);
    contentRecords.push(`'${resourceName}': ${className};`);
  }
  if (contentImports.length === 0) return '';
  // combine
  const content = `/** models: begin */
${contentImports.join('\n')}
export interface IModuleModel {
  ${contentRecords.join('\n')}
}
/** models: end */
`;
  return content;
}
