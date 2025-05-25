import type { IMetadataCustomGenerateOptions } from '@cabloy/cli';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';

export default async function (options: IMetadataCustomGenerateOptions): Promise<string> {
  const { sceneName, moduleName, globFiles } = options;
  const contentColumns: string[] = [];
  const contentFields: string[] = [];
  for (const globFile of globFiles) {
    const { className, beanName } = globFile;
    const opionsName = `IEntityOptions${toUpperCaseFirstChar(beanName)}`;
    contentColumns.push(`
    export interface ${className} {
      $column: <K extends keyof Omit<${className}, '$column' | '$columns' | '$table'>>(column: K) => K;
      $columns: <K extends keyof Omit<${className}, '$column' | '$columns' | '$table'>>(...columns: K[]) => K[];
    }`);
    contentFields.push(`
    export interface ${opionsName} {
      fields?: TypeEntityOptionsFields<${className}, ${opionsName}['fieldsMore']>;
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
