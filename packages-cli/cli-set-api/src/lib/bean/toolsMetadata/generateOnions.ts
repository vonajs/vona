import path from 'path';
import fse from 'fs-extra';
import eggBornUtils from 'egg-born-utils';
import { checkIgnoreOfParts } from './utils.js';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import { OnionSceneMeta, onionScenesMeta } from 'vona-shared';

export async function generateOnions(sceneName: string, moduleName: string, modulePath: string) {
  const sceneMeta = onionScenesMeta[sceneName];
  const sceneNameCapitalize = toUpperCaseFirstChar(sceneName);
  const pattern = `${modulePath}/src/bean/${sceneName}.*.ts`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  if (files.length === 0) return '';
  files.sort();
  const contentExports: string[] = [];
  const contentImports: string[] = [];
  const contentRecordsGlobal: string[] = [];
  const contentRecordsLocal: string[] = [];
  let needImportOptionsGlobalInterface;
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
    const fileInfo = _extractInfo(sceneName, file, sceneMeta);
    // import options
    if (fileInfo.hasOptionsInterface) {
      contentImports.push(
        `import { I${sceneNameCapitalize}Options${beanNameCapitalize} } from '../bean/${fileNameJS}';`,
      );
    }
    // record
    if (fileInfo.isGlobal) {
      if (fileInfo.hasOptionsInterface) {
        contentRecordsGlobal.push(`'${beanNameFull}': I${sceneNameCapitalize}Options${beanNameCapitalize};`);
      } else {
        contentRecordsGlobal.push(`'${beanNameFull}': ${sceneMeta.optionsGlobalInterfaceName};`);
        needImportOptionsGlobalInterface = true;
      }
    } else {
      if (fileInfo.hasOptionsInterface) {
        contentRecordsLocal.push(`'${beanNameFull}': I${sceneNameCapitalize}Options${beanNameCapitalize};`);
      } else {
        contentRecordsLocal.push(`'${beanNameFull}': never;`);
      }
    }
  }
  // middlewareGlobal
  const exportRecordsMiddlewareGlobal = `
    export interface I${sceneNameCapitalize}Record${sceneMeta.hasLocal ? 'Global' : ''} {
      ${contentRecordsGlobal.join('\n')}
    }
`;
  // middlewareLocal
  const exportRecordsMiddlewareLocal = `
export interface I${sceneNameCapitalize}RecordLocal {
  ${contentRecordsLocal.join('\n')}
}
`;
  // combine
  const content = `/** ${sceneName}s: begin */
${contentExports.join('\n')}
${contentImports.join('\n')}
${needImportOptionsGlobalInterface ? "import { IDecoratorGuardOptionsGlobal } from 'vona';" : "import 'vona';"}
declare module 'vona' {
  ${contentRecordsGlobal.length > 0 ? exportRecordsMiddlewareGlobal : ''}
  ${contentRecordsLocal.length > 0 ? exportRecordsMiddlewareLocal : ''}
}
/** ${sceneName}s: end */
`;
  return content;
}

function _extractInfo(sceneName: string, file: string, sceneMeta: OnionSceneMeta) {
  const sceneNameCapitalize = toUpperCaseFirstChar(sceneName);
  const content = fse.readFileSync(file).toString();
  const hasOptionsInterface = content.includes(`I${sceneNameCapitalize}Options`);
  const isGlobal = sceneMeta.hasLocal
    ? content.match(/@.*?\(\{([\s\S]*?)global: true([\s\S]*?)\}([\s\S]*?)\)\s*?export class/)
    : true;
  return { hasOptionsInterface, isGlobal };
}
