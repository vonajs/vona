import type { IMetadataCustomGenerateOptions } from '@cabloy/cli';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';

export default async function (options: IMetadataCustomGenerateOptions): Promise<string> {
  const { sceneName, moduleName, globFiles } = options;
  const contentRecords: string[] = [];
  for (const globFile of globFiles) {
    const { className, beanName } = globFile;
    const opionsName = `IModelOptions${toUpperCaseFirstChar(beanName)}`;
    console.log(className, opionsName);
    // contentRecords.push(`'${tableName}': never;`);
  }
  if (contentRecords.length === 0) return '';
  // combine
  const content = `/** ${sceneName}: begin */
declare module 'vona-module-${moduleName}' {
  ${contentRecords.join('\n')}
}
/** ${sceneName}: end */
`;
  return content;
}

function __parseTableName(fileContent: string): string | false {
  let matched = fileContent.match(/@Entity<.*?>\(\{[\s\S]*?table: ('[^']*')[\s\S]*?\}[\s\S]*?\)\s*export class/);
  if (!matched) {
    matched = fileContent.match(/@Entity<.*?>\(([^)]*)\)/);
  }
  if (!matched) return false;
  const tableName = matched[1];
  if (tableName === '') return '';
  return tableName.split(',')[0].replaceAll("'", '');
}
