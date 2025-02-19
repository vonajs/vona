import type { OnionSceneMeta } from '@cabloy/module-info';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import { globBeanFiles } from './utils.ts';

export async function generateScopeResources(
  sceneName: string,
  sceneMeta: OnionSceneMeta,
  moduleName: string,
  modulePath: string,
) {
  const sceneNameCapitalize = toUpperCaseFirstChar(sceneName);
  const globFiles = await globBeanFiles(sceneName, sceneMeta, moduleName, modulePath);
  if (globFiles.length === 0) return '';
  //
  const contentImports: string[] = [];
  const contentRecords: string[] = [];
  for (const globFile of globFiles) {
    const { fileNameJSRelative, className, beanName, isIgnore } = globFile;
    if (isIgnore) continue;
    contentImports.push(`import { ${className} } from '${fileNameJSRelative}';`);
    contentRecords.push(`'${beanName}': ${className};`);
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
