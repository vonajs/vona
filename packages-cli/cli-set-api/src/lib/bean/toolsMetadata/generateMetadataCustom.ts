import { globBeanFiles } from './utils.js';
//import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import { OnionSceneMeta } from '@cabloy/module-info';
import path from 'node:path';

export async function generateMetadataCustom(
  sceneName: string,
  sceneMeta: OnionSceneMeta,
  moduleName: string,
  modulePath: string,
) {
  //const sceneNameCapitalize = toUpperCaseFirstChar(sceneName);
  const globFiles = await globBeanFiles(sceneName, sceneMeta, moduleName, modulePath);
  if (globFiles.length === 0) return '';
  // custom
  const jsFile = path.join(modulePath, sceneMeta.metadataCustom!);
  const js = await import(jsFile);
  console.log(js);
  return '';
}
