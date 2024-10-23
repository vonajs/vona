import path from 'path';
import eggBornUtils from 'egg-born-utils';

export async function generateAtoms(_moduleName: string, modulePath: string) {
  const pattern = `${modulePath}/src/atom/*.ts`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  if (files.length === 0) return '';
  files.sort();
  const contentExports: string[] = [];
  for (const file of files) {
    const fileName = path.basename(file);
    const parts = fileName.split('.').slice(0, -1);
    if (parts.length !== 1) continue;
    contentExports.push(`export * from '../atom/${parts[0]}.js';`);
  }
  // combine
  const content = `/** atoms: begin */
${contentExports.join('\n')}
/** atoms: end */
`;
  return content;
}
