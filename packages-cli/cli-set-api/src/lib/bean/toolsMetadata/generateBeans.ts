import path from 'path';
import eggBornUtils from 'egg-born-utils';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import { checkIgnoreOfParts } from './utils.js';

export async function generateBeans(moduleName: string, modulePath: string) {
  const pattern = `${modulePath}/src/bean/*.ts`;
  const files = await eggBornUtils.tools.globbyAsync(pattern, {
    ignore: [
      '**/middleware.*.ts',
      '**/guard.*.ts',
      '**/interceptor.*.ts',
      '**/pipe.*.ts',
      '**/filter.*.ts',
      '**/socketConnection.*.ts',
      '**/socketPacket.*.ts',
      '**/aop.*.ts',
      '**/meta.*.ts',
      '**/summerCache.*.ts',
      '**/startup.*.ts',
      '**/queue.*.ts',
      '**/schedule.*.ts',
    ],
  });
  if (files.length === 0) return '';
  files.sort();
  const contentExports: string[] = [];
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
    const fileNameJS = fileName.replace('.ts', '.js');
    let className = parts.map(item => toUpperCaseFirstChar(item)).join('');
    const beanFullName = isBeanGlobal ? parts[1] : `${moduleName}.${parts.join('.')}`;
    if (className === 'BeanBase') className = 'BeanBase2';
    contentExports.push(`export * from '../bean/${fileNameJS}';`);
    if (isBeanGlobal || !isIgnore) {
      contentImports.push(`import { ${className} } from '../bean/${fileNameJS}';`);
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
/** beans: end */
`;
  return content;
}
