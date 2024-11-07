import path from 'path';
import eggBornUtils from 'egg-born-utils';

export async function generateDtos(_moduleName: string, modulePath: string) {
  const pattern = `${modulePath}/src/dto/*.ts`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  if (files.length === 0) return '';
  files.sort();
  const contentExports: string[] = [];
  for (const file of files) {
    const fileName = path.basename(file);
    const parts = fileName.split('.').slice(0, -1);
    if (parts.length !== 1) continue;
    contentExports.push(`export * from '../dto/${parts[0]}.js';`);
  }
  // combine
  const content = `/** dtos: begin */
${contentExports.join('\n')}
/** dtos: end */
`;
  return content;
}
