import path from 'path';
import eggBornUtils from 'egg-born-utils';
import { checkIgnoreOfParts } from './utils.js';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';

export async function generateScopeResources(sceneName: string, _moduleName: string, modulePath: string) {
  //const sceneMeta = onionScenesMeta[sceneName];
  const sceneNameCapitalize = toUpperCaseFirstChar(sceneName);
  const pattern = `${modulePath}/src/bean/${sceneName}.*.ts`;
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
    const className = sceneNameCapitalize + toUpperCaseFirstChar(resourceName);
    contentImports.push(`import { ${className} } from '../bean/${sceneName}.${resourceName}.js';`);
    contentRecords.push(`'${resourceName}': ${className};`);
  }
  if (contentImports.length === 0) return '';
  // combine
  const content = `/** ${sceneName}: begin */
${contentImports.join('\n')}
export interface IModule${sceneNameCapitalize} {
  ${contentRecords.join('\n')}
}
/** ${sceneName}: end */
`;
  return content;
}
