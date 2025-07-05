import type { IMetadataCustomGenerateOptions } from '@cabloy/cli';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';

export default async function (options: IMetadataCustomGenerateOptions): Promise<string> {
  const { sceneName, moduleName, globFiles } = options;
  const contentRecords: string[] = [];
  for (const globFile of globFiles) {
    const { className, beanName, fileContent } = globFile;
    const entityName = __parseEntityName(fileContent);
    const entityMetaName = `${entityName}Meta`;
    const opionsName = `IModelOptions${toUpperCaseFirstChar(beanName)}`;
    console.log(className, opionsName);
    contentRecords.push(`export interface ${className} {
      $entity: ${entityName};
      $entityMeta: ${entityMetaName};
    }`);
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

function __parseEntityName(fileContent: string): string | false {
  const matched = fileContent.match(/@Model<.*?>\(\{[\s\S]*?entity: (Entity\S+)[\s\S]*?\}[\s\S]*?\)\s*export class/);
  if (!matched) return false;
  const entityName = matched[1];
  if (entityName === '') return '';
  return entityName.split(',')[0];
}
