import path from 'path';
import eggBornUtils from 'egg-born-utils';

export async function generateBeans(moduleName: string, modulePath: string) {
  const pattern = `${modulePath}/src/bean/*.ts`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  if (files.length === 0) return '';
  files.sort();
  const contentExports: string[] = [];
  const contentImports: string[] = [];
  const contentRecordsGlobal: string[] = [];
  const contentRecordsGeneral: string[] = [];
  for (const file of files) {
    const fileName = path.basename(file);
    const parts = fileName.split('.').slice(0, -1);
    if (parts.length < 2) continue;
    const isIgnore = checkIgnoreOfParts(parts);
    const isBeanGlobal = parts[0] === 'bean';
    const fileNameJS = fileName.replace('.ts', '.js');
    let className = parts.map(item => item.charAt(0).toUpperCase() + item.substring(1)).join('');
    const beanFullName = isBeanGlobal ? parts[1] : `${moduleName}.${parts.join('.')}`;
    if (className === 'BeanBase') className = 'BeanBase2';
    contentExports.push(`export * from '../bean/${fileNameJS}';`);
    contentImports.push(`import { ${className} } from '../bean/${fileNameJS}';`);
    if (isBeanGlobal && !isIgnore) {
      contentRecordsGlobal.push(`'${beanFullName}': ${className};`);
    } else {
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

function checkIgnoreOfParts(parts: string[]) {
  const indexLast = parts.length - 1;
  if (parts[indexLast].endsWith('_')) {
    parts[indexLast] = parts[indexLast].substring(0, parts[indexLast].length - 1);
    return true;
  }
  return false;
}
