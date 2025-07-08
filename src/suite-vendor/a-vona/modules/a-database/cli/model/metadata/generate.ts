import type { IMetadataCustomGenerateOptions } from '@cabloy/cli';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';

export default async function (options: IMetadataCustomGenerateOptions): Promise<string> {
  const { sceneName, moduleName, globFiles } = options;
  const contentRecords: string[] = [];
  const contentModels: string[] = [];
  for (const globFile of globFiles) {
    const { className, beanName, fileContent } = globFile;
    const beanNameCapitalize = toUpperCaseFirstChar(beanName);
    const entityName = __parseEntityName(fileContent);
    const entityMetaName = `${entityName}Meta`;
    const opionsName = `IModelOptions${beanNameCapitalize}`;
    contentRecords.push(`export interface ${className} {
      [SymbolKeyEntity]: ${entityName};
      [SymbolKeyEntityMeta]: ${entityMetaName};
      [SymbolKeyModelOptions]: ${opionsName};
      select<ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[], T extends IModelSelectParams<${entityName},${opionsName},ModelJoins>>(modelJoins: ModelJoins, params?: T, options?: IModelMethodOptions): Promise<TypeModelRelationResult<${entityName}, ${opionsName}, T>[]>;
      select<T extends IModelSelectParams<${entityName},${opionsName}>>(params?: T, options?: IModelMethodOptions): Promise<TypeModelRelationResult<${entityName}, ${opionsName}, T>[]>;
    }`);
    contentModels.push(`'${moduleName}:${beanName}': ${className};`);
    // contentRecords.push(`'${tableName}': never;`);
  }
  if (contentRecords.length === 0 && contentModels.length === 0) return '';
  // combine
  const content = `/** ${sceneName}: begin */
import type { IModelMethodOptions, IModelClassRecord, IModelSelectParams, TypeModelRelationResult } from 'vona-module-a-database';
import { SymbolKeyEntity, SymbolKeyEntityMeta, SymbolKeyModelOptions } from 'vona-module-a-database';
declare module 'vona-module-${moduleName}' {
  ${contentRecords.join('\n')}
}
declare module 'vona-module-a-database' {
  export interface IModelClassRecord {
    ${contentModels.join('\n')}
  }
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
