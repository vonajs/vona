import path from 'path';
import fse from 'fs-extra';
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
  const contentRecordsGlobal: string[] = [];
  const contentRecordsLocal: string[] = [];
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
    if (isIgnore) continue;
    const fileInfo = _extractInfo(file);
    if (!fileInfo.hasInterface) continue;
    contentImports.push(`import { IMiddlewareOptions${beanNameCapitalize} } from '../bean/${fileNameJS}';`);
    if (fileInfo.isGlobal) {
      contentRecordsGlobal.push(`'${beanNameFull}': IMiddlewareOptions${beanNameCapitalize};`);
    } else {
      contentRecordsLocal.push(`'${beanNameFull}': IMiddlewareOptions${beanNameCapitalize};`);
    }
  }
  // middlewareGlobal
  const exportRecordsMiddlewareGlobal = `
    export interface IMiddlewareRecordGlobal {
      ${contentRecordsGlobal.join('\n')}
    }
`;
  // middlewareLocal
  const exportRecordsMiddlewareLocal = `
export interface IMiddlewareRecordLocal {
  ${contentRecordsLocal.join('\n')}
}
`;
  // combine
  const content = `/** middlewares: begin */
${contentExports.join('\n')}
${contentImports.join('\n')}
import 'vona';
declare module 'vona' {
  ${contentRecordsGlobal.length > 0 ? exportRecordsMiddlewareGlobal : ''}
  ${contentRecordsLocal.length > 0 ? exportRecordsMiddlewareLocal : ''}
}
/** middlewares: end */
`;
  return content;
}

function _extractInfo(file: string) {
  const content = fse.readFileSync(file).toString();
  const hasInterface = content.includes('IMiddlewareOptions');
  const isGlobal = content.match(/@Middleware.*?\(\{([\s\S]*?)global: true([\s\S]*?)\}([\s\S]*?)\)\s*?export class/);
  return { hasInterface, isGlobal };
}
