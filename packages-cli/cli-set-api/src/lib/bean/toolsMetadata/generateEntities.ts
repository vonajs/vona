import path from 'path';
import eggBornUtils from 'egg-born-utils';
import { checkIgnoreOfParts } from './utils.js';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';

export async function generateEntities(moduleName: string, modulePath: string) {
  const pattern = `${modulePath}/src/entity/*.ts`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  if (files.length === 0) return '';
  files.sort();
  const contentImports: string[] = [];
  const contentRecords: string[] = [];
  const contentColumns: string[] = [];
  for (const file of files) {
    const fileName = path.basename(file);
    if (fileName.startsWith('_')) continue;
    const parts = fileName.split('.').slice(0, -1);
    if (parts.length !== 1) continue;
    const isIgnore = checkIgnoreOfParts(parts);
    if (isIgnore) continue;
    const resourceName = parts[0];
    const className = 'Entity' + toUpperCaseFirstChar(resourceName);
    contentImports.push(`import { ${className} } from '../entity/${resourceName}.js';`);
    contentRecords.push(`'${resourceName}': ${className};`);
    contentColumns.push(`
    export interface ${className} {
      column: <K extends keyof Omit<${className}, 'column' | 'columns' | 'table'>>(column: K) => K;
      columns: <K extends keyof Omit<${className}, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
    }`);
  }
  if (contentImports.length === 0) return '';
  // combine
  const content = `/** entities: begin */
${contentImports.join('\n')}
export interface IModuleEntity {
  ${contentRecords.join('\n')}
}
declare module 'vona-module-${moduleName}' {
  ${contentColumns.join('\n')} 
}
/** entities: end */
`;
  return content;
}
