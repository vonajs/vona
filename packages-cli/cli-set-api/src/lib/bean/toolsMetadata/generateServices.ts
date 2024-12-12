import path from 'path';
import eggBornUtils from 'egg-born-utils';
import { checkIgnoreOfParts, getScopeModuleName } from './utils.js';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';

export async function generateServices(moduleName: string, modulePath: string) {
  const scopeModuleName = getScopeModuleName(moduleName);
  const pattern = `${modulePath}/src/service/*.ts`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  if (files.length === 0) return '';
  files.sort();
  const contentExports: string[] = [];
  const contentScopes: string[] = [];
  const contentImports: string[] = [];
  const contentRecords: string[] = [];
  const contentRecords2: string[] = [];
  for (const file of files) {
    const fileName = path.basename(file);
    const parts = fileName.split('.').slice(0, -1);
    if (parts.length !== 1) continue;
    const isIgnore = checkIgnoreOfParts(parts);
    const fileNameJS = fileName.replace('.ts', '.js');
    const className = 'Service' + parts.map(item => toUpperCaseFirstChar(item)).join('');
    const beanFullName = `${moduleName}.service.${parts.join('.')}`;
    contentExports.push(`export * from '../service/${fileNameJS}';`);
    contentScopes.push(`
      export interface ${className} {
        get scope(): ${scopeModuleName};
      }`);
    if (isIgnore) continue;
    contentImports.push(`import { ${className} } from '../service/${fileNameJS}';`);
    contentRecords.push(`'${parts[0]}': ${className};`);
    contentRecords2.push(`'${beanFullName}': ${className};`);
  }
  // combine
  const content = `/** services: begin */
${contentExports.join('\n')}
${contentImports.join('\n')}
export interface IModuleService {
  ${contentRecords.join('\n')}
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    ${contentRecords2.join('\n')}
  }
}
declare module 'vona-module-${moduleName}' {
  ${contentScopes.join('\n')} 
}
/** services: end */
`;
  return content;
}
