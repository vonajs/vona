import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import eggBornUtils from 'egg-born-utils';
import { OnionMetaMeta, OnionSceneMeta } from 'vona';

export async function generateScopeResourcesMeta(
  metaName: string,
  _metaMeta: OnionMetaMeta,
  _sceneName: string,
  _sceneMeta: OnionSceneMeta,
  _moduleName: string,
  modulePath: string,
) {
  const pattern = `${modulePath}/src/bean/meta.${metaName}.ts`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  if (files.length === 0) return '';
  // combine
  const content = `/** meta ${metaName}: begin */
import { Meta${toUpperCaseFirstChar(metaName)} } from '../bean/meta.${metaName}.js';
/** meta ${metaName}: end */
`;
  return content;
}
