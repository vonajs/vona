import path from 'path';
import eggBornUtils from 'egg-born-utils';

export async function generateModels(_moduleName: string, modulePath: string) {
  const pattern = `${modulePath}/src/model/*.ts`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  if (files.length === 0) return '';
  files.sort();
  const contentExports: string[] = [];
  const contentImports: string[] = [];
  const contentRecords: string[] = [];
  for (const file of files) {
    const fileName = path.basename(file);
    const parts = fileName.split('.').slice(0, -1);
    if (parts.length !== 1) continue;
    const resourceName = parts[0];
    const className = 'Model' + resourceName.charAt(0).toUpperCase() + resourceName.substring(1);
    contentExports.push(`export * from '../model/${resourceName}.js';`);
    contentImports.push(`import { ${className} } from '../model/${resourceName}.js';`);
    contentRecords.push(`'${resourceName}': ${className};`);
  }
  // combine
  const content = `/** models: begin */
${contentExports.join('\n')}
${contentImports.join('\n')}
export interface IModuleModel {
  ${contentRecords.join('\n')}
}
/** models: end */
`;
  return content;
}
