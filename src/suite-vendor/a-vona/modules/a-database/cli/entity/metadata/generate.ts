import type { IMetadataCustomGenerateOptions } from '@cabloy/cli';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';

export default async function (options: IMetadataCustomGenerateOptions): Promise<string> {
  const { sceneName, moduleName, globFiles } = options;
  const contentColumns: string[] = [];
  const contentFields: string[] = [];
  for (const globFile of globFiles) {
    const { className, beanName, fileContent } = globFile;
    const opionsName = `IEntityOptions${toUpperCaseFirstChar(beanName)}`;
    const tableName = __parseTableName(fileContent);
    contentColumns.push(`
    export interface ${className} {
      get $table(): '${tableName}';
    }`);
    contentFields.push(`
    export interface ${opionsName} {
      fields?: TypeEntityOptionsFields<${className}, ${opionsName}['_fieldsMore_']>;
    }`);
  }
  if (contentColumns.length === 0 && contentFields.length === 0) return '';
  // combine
  const content = `/** ${sceneName}: begin */
declare module 'vona-module-${moduleName}' {
  ${contentColumns.join('\n')}
  ${contentFields.join('\n')}
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
  const controllerPath = matched[1];
  if (controllerPath === '') return '';
  return controllerPath.split(',')[0].replaceAll("'", '');
}
