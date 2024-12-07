import eggBornUtils from 'egg-born-utils';

export async function generateMetaStatus(_moduleName: string, modulePath: string) {
  const pattern = `${modulePath}/src/bean/meta.status.ts`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  if (files.length === 0) return '';
  // combine
  const content = `/** meta status: begin */
import { MetaStatus } from '../bean/meta.status.js';
/** meta status: end */
`;
  return content;
}
