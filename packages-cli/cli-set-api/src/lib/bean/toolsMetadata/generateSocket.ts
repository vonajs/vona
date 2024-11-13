import path from 'path';
import eggBornUtils from 'egg-born-utils';
import { checkIgnoreOfParts } from './utils.js';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';

export async function generateSocket(sceneName: string, moduleName: string, modulePath: string) {
  const sceneNameCapitalize = toUpperCaseFirstChar(sceneName);
  const pattern = `${modulePath}/src/bean/${sceneName}.*.ts`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  if (files.length === 0) return '';
  files.sort();
  const contentExports: string[] = [];
  const contentImports: string[] = [];
  const contentRecordsGlobal: string[] = [];
  for (const file of files) {
    const fileName = path.basename(file);
    const parts = fileName.split('.').slice(0, -1);
    if (parts.length < 2) continue;
    const isIgnore = checkIgnoreOfParts(parts);
    const fileNameJS = fileName.replace('.ts', '.js');
    // const className = parts.map(item => toUpperCaseFirstChar(item)).join('');
    const beanName = parts[parts.length - 1];
    const beanNameCapitalize = toUpperCaseFirstChar(beanName);
    const beanNameFull = `${moduleName}:${beanName}`;
    contentExports.push(`export * from '../bean/${fileNameJS}';`);
    if (isIgnore) continue;
    contentImports.push(`import { I${sceneNameCapitalize}Options${beanNameCapitalize} } from '../bean/${fileNameJS}';`);
    contentRecordsGlobal.push(`'${beanNameFull}': I${sceneNameCapitalize}Options${beanNameCapitalize};`);
  }
  // middlewareGlobal
  const exportRecordsMiddlewareGlobal = `
    export interface I${sceneNameCapitalize}Record {
      ${contentRecordsGlobal.join('\n')}
    }
`;
  // combine
  const content = `/** ${sceneName}s: begin */
${contentExports.join('\n')}
${contentImports.join('\n')}
import 'vona';
declare module 'vona' {
  ${contentRecordsGlobal.length > 0 ? exportRecordsMiddlewareGlobal : ''}
}
/** ${sceneName}s: end */
`;
  return content;
}
