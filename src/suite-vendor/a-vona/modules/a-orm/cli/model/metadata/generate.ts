import type { IMetadataCustomGenerateOptions } from '@cabloy/cli';
import { types as t } from '@babel/core';

export default async function (options: IMetadataCustomGenerateOptions): Promise<string> {
  const { sceneName, moduleName, globFiles, cli } = options;
  const contentRelations: string[] = [];
  const contentRecords: string[] = [];
  const contentModels: string[] = [];
  // const contentModelsOptions: string[] = [];
  for (const globFile of globFiles) {
    const { className, beanName, fileContent, beanNameCapitalize } = globFile;
    const ast = cli.helper.gogocode(fileContent);
    const astNodes = ast.find(`@Model<$$$0>({$$$1})export class ${className} extends $$$2 {}`).match.$$$1;
    const entityName = __parseEntityName(__getAstNode(astNodes as any, 'entity'));
    const relations = __parseRelations(__getAstNode(astNodes as any, 'relations'));
    const entityMetaName = `${entityName}Meta`;
    const opionsName = `IModelOptions${beanNameCapitalize}`;
    if (relations.length > 0) {
      contentRelations.push(`export interface ${opionsName} {
        relations: {
          ${relations.join('\n')}
        };
      }`);
    }
    contentRecords.push(`export interface ${className} {
      [SymbolKeyEntity]: ${entityName};
      [SymbolKeyEntityMeta]: ${entityMetaName};
      [SymbolKeyModelOptions]: ${opionsName};
      get<T extends IModelGetOptions<${entityName},${className}>>(where: TypeModelWhere<${entityName}>, options?: T): Promise<TypeModelRelationResult<${entityName}, ${className}, T> | undefined>;
      mget<T extends IModelGetOptions<${entityName},${className}>>(ids: TableIdentity[], options?: T): Promise<TypeModelRelationResult<${entityName}, ${className}, T>[]>;
      select<T extends IModelSelectParams<${entityName},${className},ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelRelationResult<${entityName}, ${className}, T>[]>;
      count<T extends IModelCountParams<${entityName},${className},ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined>(params?: T, options?: IModelMethodOptionsGeneral, modelJoins?: ModelJoins): Promise<BigNumber>;
      insert<T extends IModelInsertOptions<${entityName},${className}>>(data?: TypeModelMutateRelationData<${entityName},${className}, T>, options?: T): Promise<Required<TypeModelMutateRelationData<${entityName},${className}, T>>>;
      insertBulk<T extends IModelInsertOptions<${entityName},${className}>>(items: TypeModelMutateRelationData<${entityName},${className}, T>[], options?: T): Promise<Required<TypeModelMutateRelationData<${entityName},${className}, T>>[]>;
      update<T extends IModelUpdateOptions<${entityName},${className}>>(data: TypeModelMutateRelationData<${entityName},${className}, T>, options?: T): Promise<TypeModelMutateRelationData<${entityName},${className}, T>>;
      updateBulk<T extends IModelUpdateOptions<${entityName},${className}>>(items: TypeModelMutateRelationData<${entityName},${className}, T>[], options?: T): Promise<TypeModelMutateRelationData<${entityName},${className}, T>[]>;
      delete<T extends IModelDeleteOptions<${entityName},${className}>>(where?: TypeModelWhere<${entityName}>, options?: T): Promise<void>;
      deleteBulk<T extends IModelDeleteOptions<${entityName},${className}>>(ids: TableIdentity[], options?: T): Promise<void>;
      mutate<T extends IModelMutateOptions<${entityName},${className}>>(data?: TypeModelMutateRelationData<${entityName},${className}, T>, options?: T): Promise<TypeModelMutateRelationData<${entityName},${className}, T>>;
      mutateBulk<T extends IModelMutateOptions<${entityName},${className}>>(items: TypeModelMutateRelationData<${entityName},${className}, T>[], options?: T): Promise<TypeModelMutateRelationData<${entityName},${className}, T>[]>;
      aggregate<T extends IModelSelectAggrParams<${entityName},${className},ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelAggrRelationResult<T>>;
      group<T extends IModelSelectGroupParams<${entityName},${className},ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelGroupRelationResult<${entityName}, T>[]>;
    }`);
    contentModels.push(`'${moduleName}:${beanName}': ${className};`);
    // only override cache.keyAux which not enough
    // contentModelsOptions.push(`export interface ${opionsName} {
    //   cache?: {
    //     keyAux?: keyof ${entityName};
    //   };
    // }`);
  }
  if (contentRelations.length === 0 && contentRecords.length === 0 && contentModels.length === 0) return '';
  // combine
  const content = `/** ${sceneName}: begin */
import type { IModelCountParams, IModelGetOptions, IModelMethodOptions, IModelMethodOptionsGeneral, IModelClassRecord, IModelSelectParams, TableIdentity, TypeModelRelationResult, TypeModelWhere, IModelInsertOptions, TypeModelMutateRelationData, IModelDeleteOptions, IModelUpdateOptions, IModelMutateOptions, IModelSelectAggrParams, TypeModelAggrRelationResult, IModelSelectGroupParams, TypeModelGroupRelationResult } from 'vona-module-a-orm';
import { SymbolKeyEntity, SymbolKeyEntityMeta, SymbolKeyModelOptions } from 'vona-module-a-orm';
declare module 'vona-module-${moduleName}' {
  ${contentRelations.join('\n')}
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

function __getAstNode(astNodes: Array<t.ObjectProperty>, name: string) {
  return astNodes.find(node => (node.key as t.Identifier).name === name) as t.ObjectProperty;
}

function __parseEntityName(node: t.ObjectProperty): string {
  return (node.value as t.Identifier).name;
  // const matched = fileContent.match(/@Model<.*?>\(\{[\s\S]*?entity: (Entity\S+)[\s\S]*?\}[\s\S]*?\)\s*export class/);
  // if (!matched) return false;
  // const entityName = matched[1];
  // if (entityName === '') return '';
  // return entityName.split(',')[0];
}

function __parseRelations(node: t.ObjectProperty) {
  const relations: string[] = [];
  const nodeRelations = node.value as t.ObjectExpression;
  for (const nodeRelation of nodeRelations.properties) {
    relations.push(__parseRelation(nodeRelation as t.ObjectProperty));
  }
  return relations;
}

function __parseRelation(nodeRelation: t.ObjectProperty) {
  const relationName = (nodeRelation.key as t.Identifier).name;
  const callExpression = nodeRelation.value as t.CallExpression;
  const relationType = ((callExpression.callee as t.MemberExpression).property as t.Identifier).name;
  const args: t.Node[] = callExpression.arguments;
  // hasMany
  if (relationType === 'hasMany') {
    return `${relationName}: ${__parseRelationHasMany(args)}`;
  }
  return '';
}

function __parseRelationHasMany(args: t.Node[]) {
  // classModel
  const classModel = __parseRelation_classModel(args[0]);
  // key
  const key = __parseRelation_key(args[1]);
  // options
  const options = __parseRelation_options(args[2]);
}

function __parseRelation_classModel(node: t.Node) {
  if (t.isArrowFunctionExpression(node)) {
    return (node.body as t.Identifier).name;
  } else if (t.isIdentifier(node)) {
    return node.name;
  } else if (t.isStringLiteral(node)) {
    return node.value;
  }
  throw new Error('invalid classModel');
}

function __parseRelation_key(node: t.Node) {
  if (t.isStringLiteral(node)) {
    return node.value;
  }
  throw new Error('invalid support key');
}

function __parseRelation_options(node: t.Node) {
  if (!node) return undefined;
  if (!t.isObjectExpression(node)) throw new Error('invalid support options');
  let autoload;
  for (const _nodeProperty of node.properties) {
    const nodeProperty = _nodeProperty as t.ObjectProperty;
    const key = (nodeProperty.key as t.Identifier).name;
    if (key === 'autoload') {
      autoload = (nodeProperty.value as t.BooleanLiteral).value;
    }
  }
  console.log(autoload);
  return { autoload };
}
