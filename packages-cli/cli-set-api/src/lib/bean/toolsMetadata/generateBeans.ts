import type { OnionScenesMeta } from '@cabloy/module-info';
import path from 'node:path';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import { globby } from 'globby';
import { checkIgnoreOfParts, getScopeModuleName } from './utils.ts';

export async function generateBeans(onionScenesMeta: OnionScenesMeta, moduleName: string, modulePath: string) {
  const scopeModuleName = getScopeModuleName(moduleName);
  // ignore
  const ignore = Object.keys(onionScenesMeta).map(item => `**/${item}.*.ts`);
  // files
  const files = await globby('src/bean/*.ts', { ignore, cwd: modulePath });
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
    const fileNameJS = fileName; // fileName.replace('.ts', '.js');
    const className = parts.map(item => toUpperCaseFirstChar(item)).join('');
    const beanFullName = isBeanGlobal ? parts[1] : `${moduleName}.${parts.join('.')}`;
    contentExports.push(`export * from '../bean/${fileNameJS}';`);
    // ignore virtual
    contentScopes.push(`
        export interface ${className} {
          /** @internal */
          get scope(): ${scopeModuleName};
        }`);
    if (isBeanGlobal || !isIgnore) {
      contentImports.push(`import type { ${className} } from '../bean/${fileNameJS}';`);
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
