import type { IMetadataCustomGenerateOptions } from '@cabloy/cli';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';

export default async function (options: IMetadataCustomGenerateOptions): Promise<string> {
  const { sceneName, moduleName, globFiles } = options;
  const contentRecords: string[] = [];
  const contentModels: string[] = [];
  // const contentModelsOptions: string[] = [];
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
      get<T extends IModelGetOptions<${entityName},${className}>>(where: TypeModelWhere<${entityName}>, options?: T): Promise<TypeModelRelationResult<${entityName}, ${className}, T> | undefined>;
      mget<T extends IModelGetOptions<${entityName},${className}>>(ids: TableIdentity[], options?: T): Promise<TypeModelRelationResult<${entityName}, ${className}, T>[]>;
      select<T extends IModelSelectParams<${entityName},${className},ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelRelationResult<${entityName}, ${className}, T>[]>;
      selectGeneral<T extends IModelSelectParams<${entityName},${className},ModelJoins,Aggregate>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined, Aggregate extends boolean | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins, aggregate?: Aggregate): Promise<TypeModelRelationResult<${entityName}, ${className}, T>[]>;
      count<T extends IModelCountParams<${entityName},${className},ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined>(params?: T, options?: IModelMethodOptionsGeneral, modelJoins?: ModelJoins): Promise<BigNumber>;
      insert<T extends IModelInsertOptions<${entityName},${className}>>(data?: TypeModelMutateRelationData<${entityName},${className}, T>, options?: T): Promise<Required<TypeModelMutateRelationData<${entityName},${className}, T>>>;
      insertBulk<T extends IModelInsertOptions<${entityName},${className}>>(items: TypeModelMutateRelationData<${entityName},${className}, T>[], options?: T): Promise<Required<TypeModelMutateRelationData<${entityName},${className}, T>>[]>;
      update<T extends IModelUpdateOptions<${entityName},${className}>>(data: TypeModelMutateRelationData<${entityName},${className}, T>, options?: T): Promise<TypeModelMutateRelationData<${entityName},${className}, T>>;
      updateBulk<T extends IModelUpdateOptions<${entityName},${className}>>(items: TypeModelMutateRelationData<${entityName},${className}, T>[], options?: T): Promise<TypeModelMutateRelationData<${entityName},${className}, T>[]>;
      delete<T extends IModelDeleteOptions<${entityName},${className}>>(where?: TypeModelWhere<${entityName}>, options?: T): Promise<void>;
      deleteBulk<T extends IModelDeleteOptions<${entityName},${className}>>(ids: TableIdentity[], options?: T): Promise<void>;
      mutate<T extends IModelMutateOptions<${entityName},${className}>>(data?: TypeModelMutateRelationData<${entityName},${className}, T>, options?: T): Promise<TypeModelMutateRelationData<${entityName},${className}, T>>;
      mutateBulk<T extends IModelMutateOptions<${entityName},${className}>>(items: TypeModelMutateRelationData<${entityName},${className}, T>[], options?: T): Promise<TypeModelMutateRelationData<${entityName},${className}, T>[]>;
    }`);
    contentModels.push(`'${moduleName}:${beanName}': ${className};`);
    // only override cache.keyAux which not enough
    // contentModelsOptions.push(`export interface ${opionsName} {
    //   cache?: {
    //     keyAux?: keyof ${entityName};
    //   };
    // }`);
  }
  if (contentRecords.length === 0 && contentModels.length === 0) return '';
  // combine
  const content = `/** ${sceneName}: begin */
import type { IModelCountParams, IModelGetOptions, IModelMethodOptions, IModelMethodOptionsGeneral, IModelClassRecord, IModelSelectParams, TableIdentity, TypeModelRelationResult, TypeModelWhere, IModelInsertOptions, TypeModelMutateRelationData, IModelDeleteOptions, IModelUpdateOptions, IModelMutateOptions } from 'vona-module-a-orm';
import { SymbolKeyEntity, SymbolKeyEntityMeta, SymbolKeyModelOptions } from 'vona-module-a-orm';
declare module 'vona-module-${moduleName}' {
  ${contentRecords.join('\n')}
}
declare module 'vona-module-a-orm' {
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
