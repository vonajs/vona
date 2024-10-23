import path from 'path';
import eggBornUtils from 'egg-born-utils';

export async function generateServices(moduleName: string, modulePath: string) {
  const pattern = `${modulePath}/src/service/*.ts`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  if (files.length === 0) return '';
  files.sort();
  const contentExports: string[] = [];
  const contentImports: string[] = [];
  const contentRecords: string[] = [];
  const contentRecords2: string[] = [];
  for (const file of files) {
    const fileName = path.basename(file);
    const parts = fileName.split('.').slice(0, -1);
    if (parts.length !== 1) continue;
    const resourceName = parts[0];
    const className = 'Service' + resourceName.charAt(0).toUpperCase() + resourceName.substring(1);
    const beanFullName = `${moduleName}.service.${resourceName}`;
    contentExports.push(`export * from '../service/${resourceName}.js';`);
    contentImports.push(`import { ${className} } from '../service/${resourceName}.js';`);
    contentRecords.push(`'${resourceName}': ${className};`);
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
  export interface IBeanRecord {
    ${contentRecords2.join('\n')}
  }
}
/** services: end */
`;
  return content;
}
