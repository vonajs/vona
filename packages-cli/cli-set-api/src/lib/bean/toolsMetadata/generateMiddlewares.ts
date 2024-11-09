import path from 'path';
import eggBornUtils from 'egg-born-utils';
import { checkIgnoreOfParts } from './utils.js';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';

export async function generateMiddlewares(moduleName: string, modulePath: string) {
  const pattern = `${modulePath}/src/bean/middleware.*.ts`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  if (files.length === 0) return '';
  files.sort();
  const contentExports: string[] = [];
  const contentImports: string[] = [];
  const contentRecords: string[] = [];
  for (const file of files) {
    const fileName = path.basename(file);
    const parts = fileName.split('.').slice(0, -1);
    if (parts.length < 2) continue;
    const isIgnore = checkIgnoreOfParts(parts);
    const fileNameJS = fileName.replace('.ts', '.js');
    // const className = parts.map(item => toUpperCaseFirstChar(item)).join('');
    const beanName = parts[parts.length - 1];
    const beanNameCapitalize = toUpperCaseFirstChar(beanName);
    const beanNameFull = `${moduleName}:${beanName}`;
    contentExports.push(`export * from '../bean/${fileNameJS}';`);
    contentImports.push(`import { IMiddlewareOptions${beanNameCapitalize} } from '../bean/${fileNameJS}';`);
    if (!isIgnore) {
      contentRecords.push(`'${beanNameFull}': IMiddlewareOptions${beanNameCapitalize};`);
    }
  }
  // combine
  const content = `/** middlewares: begin */
${contentExports.join('\n')}
${contentImports.join('\n')}
import 'vona';
declare module 'vona' {
  export interface IMiddlewareRecord {
    ${contentRecords.join('\n')}
  }
}
/** middlewares: end */
`;
  return content;
}
