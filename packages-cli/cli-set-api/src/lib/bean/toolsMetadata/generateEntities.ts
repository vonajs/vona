import path from 'path';
import eggBornUtils from 'egg-born-utils';
import { checkIgnoreOfParts } from './utils.js';

export async function generateEntities(_moduleName: string, modulePath: string) {
  const pattern = `${modulePath}/src/entity/*.ts`;
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
    const className = 'Entity' + resourceName.charAt(0).toUpperCase() + resourceName.substring(1);
    contentImports.push(`import { ${className} } from '../entity/${resourceName}.js';`);
    contentRecords.push(`'${resourceName}': ${className};`);
  }
  if (contentImports.length === 0) return '';
  // combine
  const content = `/** entities: begin */
${contentImports.join('\n')}
export interface IModuleEntity {
  ${contentRecords.join('\n')}
}
/** entities: end */
`;
  return content;
}
