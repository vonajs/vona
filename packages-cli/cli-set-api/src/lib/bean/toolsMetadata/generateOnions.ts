import { extractBeanInfo, getScopeModuleName, globBeanFiles } from './utils.js';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import { OnionSceneMeta } from '@cabloy/module-info';

export async function generateOnions(
  sceneName: string,
  sceneMeta: OnionSceneMeta,
  moduleName: string,
  modulePath: string,
) {
  const scopeModuleName = getScopeModuleName(moduleName);
  const sceneNameCapitalize = toUpperCaseFirstChar(sceneName);
  const globFiles = await globBeanFiles(sceneName, sceneMeta, moduleName, modulePath);
  if (globFiles.length === 0) return '';
  //
  const contentExports: string[] = [];
  const contentScopes: string[] = [];
  const contentImports: string[] = [];
  const contentRecordsGlobal: string[] = [];
  const contentRecordsLocal: string[] = [];
  let needImportOptionsGlobalInterface;
  for (const globFile of globFiles) {
    const { file, fileNameJSRelative, className, beanNameFull, isIgnore } = globFile;
    contentExports.push(`export * from '${fileNameJSRelative}';`);
    if (isIgnore) continue;
    // get scope() also can be ignored
    if (!['entity', 'dto'].includes(sceneName)) {
      contentScopes.push(`
        export interface ${className} {
          /** @internal */
          get scope(): ${scopeModuleName};
        }`);
    }
    const fileInfo = extractBeanInfo(sceneName, file, sceneMeta);
    // import options
    if (fileInfo.optionsCustomInterface) {
      contentImports.push(
        `import { ${fileInfo.optionsCustomInterface} } from '${fileInfo.optionsCustomInterfaceFrom || fileNameJSRelative}';`,
      );
    }
    // record
    if (fileInfo.isGlobal) {
      if (fileInfo.optionsCustomInterface) {
        contentRecordsGlobal.push(`'${beanNameFull}': ${fileInfo.optionsCustomInterface};`);
      } else {
        if (sceneMeta.optionsGlobalInterfaceName) {
          contentRecordsGlobal.push(`'${beanNameFull}': ${sceneMeta.optionsGlobalInterfaceName};`);
          needImportOptionsGlobalInterface = true;
        } else {
          contentRecordsGlobal.push(`'${beanNameFull}': never;`);
        }
      }
    } else {
      if (fileInfo.optionsCustomInterface) {
        contentRecordsLocal.push(`'${beanNameFull}': ${fileInfo.optionsCustomInterface};`);
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
  const content = `/** ${sceneName}: begin */
${contentExports.join('\n')}
${contentImports.join('\n')}
${needImportOptionsGlobalInterface ? `import { ${sceneMeta.optionsGlobalInterfaceName} } from '${sceneMeta.optionsGlobalInterfaceFrom || 'vona'}';` : "import 'vona';"}
declare module '${sceneMeta.optionsGlobalInterfaceFrom || 'vona'}' {
  ${contentRecordsGlobal.length > 0 ? exportRecordsMiddlewareGlobal : ''}
  ${contentRecordsLocal.length > 0 ? exportRecordsMiddlewareLocal : ''}
}
declare module 'vona-module-${moduleName}' {
  ${contentScopes.join('\n')} 
}
/** ${sceneName}: end */
`;
  return content;
}
