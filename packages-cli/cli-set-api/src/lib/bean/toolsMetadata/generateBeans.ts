import path from 'path';
import eggBornUtils from 'egg-born-utils';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import { checkIgnoreOfParts, getScopeModuleName } from './utils.js';
import { OnionScenesMeta } from '@cabloy/module-info';

// todo: remove
export async function generateBeans(onionScenesMeta: OnionScenesMeta, moduleName: string, modulePath: string) {
  const scopeModuleName = getScopeModuleName(moduleName);
  const pattern = `${modulePath}/src/bean/*.ts`;
  // ignore
  const ignore = Object.keys(onionScenesMeta).map(item => `**/${item}.*.ts`);
  // files
  const files = await eggBornUtils.tools.globbyAsync(pattern, { ignore });
  if (files.length === 0) return '';
  files.sort();
  const contentExports: string[] = [];
  const contentScopes: string[] = [];
  const contentImports: string[] = [];
  const contentRecordsGlobal: string[] = [];
  const contentRecordsGeneral: string[] = [];
  for (const file of files) {
    const fileName = path.basename(file);
    if (fileName.startsWith('_')) continue;
    const parts = fileName.split('.').slice(0, -1);
    if (parts.length < 2) continue;
    const isIgnore = checkIgnoreOfParts(parts);
    const isBeanGlobal = parts[0] === 'bean';
    // const sceneName = parts.slice(0, -1).join('.');
    // const beanName = parts[parts.length - 1];
    // const beanNameCapitalize = toUpperCaseFirstChar(beanName);
    const fileNameJS = fileName.replace('.ts', '.js');
    let className = parts.map(item => toUpperCaseFirstChar(item)).join('');
    const beanFullName = isBeanGlobal ? parts[1] : `${moduleName}.${parts.join('.')}`;
    if (className === 'BeanBase') className = 'BeanBase2';
    contentExports.push(`export * from '../bean/${fileNameJS}';`);
    if (!isBeanGlobal || !isIgnore) {
      // ignore virtual
      contentScopes.push(`
        export interface ${className} {
          /** @internal */
          get scope(): ${scopeModuleName};
        }`);
    }
    if (isBeanGlobal || !isIgnore) {
      contentImports.push(`import { ${className} } from '../bean/${fileNameJS}';`);
    }
    if (isBeanGlobal && !isIgnore) {
      contentRecordsGlobal.push(`'${beanFullName}': ${className};`);
    }
    if ((isBeanGlobal && isIgnore) || (!isBeanGlobal && !isIgnore)) {
      contentRecordsGeneral.push(`'${beanFullName}': ${className};`);
    }
  }
  // combine
  const content = `/** beans: begin */
${contentExports.join('\n')}
${contentImports.join('\n')}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    ${contentRecordsGlobal.join('\n')}
  }

  export interface IBeanRecordGeneral {
    ${contentRecordsGeneral.join('\n')}
  }
}
declare module 'vona-module-${moduleName}' {
  ${contentScopes.join('\n')} 
}
/** beans: end */
`;
  return content;
}
