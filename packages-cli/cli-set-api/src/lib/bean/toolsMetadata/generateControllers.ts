import path from 'path';
import eggBornUtils from 'egg-born-utils';

export async function generateControllers(_moduleName: string, modulePath: string) {
  const pattern = `${modulePath}/src/controller/*.ts`;
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
    const controllerName = parts[0];
    const className = 'Controller' + controllerName.charAt(0).toUpperCase() + controllerName.substring(1);
    contentExports.push(`export * from '../controller/${controllerName}.js';`);
    contentImports.push(`import { ${className} } from '../controller/${controllerName}.js';`);
    contentRecords.push(`'${controllerName}': ${className},`);
  }
  // combine
  const content = `/** controllers: begin */
${contentExports.join('\n')}
${contentImports.join('\n')}
export const controllers = {
  ${contentRecords.join('\n')}
};
/** controllers: end */
`;
  return content;
}
