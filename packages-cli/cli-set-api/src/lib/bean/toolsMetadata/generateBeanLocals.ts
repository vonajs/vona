import { globBeanFiles } from './utils.js';
import { OnionSceneMeta } from '@cabloy/module-info';

export async function generateBeanLocals(
  sceneName: string,
  sceneMeta: OnionSceneMeta,
  moduleName: string,
  modulePath: string,
) {
  const globFiles = await globBeanFiles(sceneName, sceneMeta, moduleName, modulePath);
  if (globFiles.length === 0) return '';
  //
  const contentImports: string[] = [];
  const contentRecords: string[] = [];
  for (const globFile of globFiles) {
    const { fileNameJSRelative, className, beanName, isIgnore } = globFile;
    const beanFullName = `${moduleName}.service.${beanName}`;
    if (isIgnore) continue;
    if (!sceneMeta.scopeResource) {
      contentImports.push(`import { ${className} } from '${fileNameJSRelative}';`);
    }
    contentRecords.push(`'${beanFullName}': ${className};`);
  }
  if (contentRecords.length === 0) return '';
  // combine
  const content = `/** ${sceneName}: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    ${contentRecords.join('\n')}
  }
}
/** ${sceneName}: end */
`;
  return content;
}
