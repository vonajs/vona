import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../../bean/bean.model/bean.model_meta.ts';
import type { IDtoMutateParams, TypeDtoMutateResult } from '../../types/dto/dtoMutate.ts';
import type { IModelRelationIncludeWrapper } from '../../types/model.ts';
import type { TypeModelColumnsStrict } from '../../types/modelWhere.ts';
import type { IDecoratorModelOptions, IModelClassRecord } from '../../types/onion/model.ts';
import type { TypeModelOfModelLike, TypeSymbolKeyEntity } from '../../types/relations.ts';
import { ensureArray, hashkey } from '@cabloy/utils';
import { $Class, appResource, deepExtend } from 'vona';
import { addSchemaDynamic, Api, getSchemaDynamic, SymbolSchemaDynamicRefId, v } from 'vona-module-a-openapi';
import { getClassEntityFromClassModel, prepareClassModel, prepareColumns } from '../../common/utils.ts';
import { DtoAggregate } from './dtoAggregate.ts';
import { DtoGroup } from './dtoGroup.ts';

export function DtoMutate<
  T extends IDtoMutateParams<ModelLike>,
  ModelLike extends BeanModelMeta | (keyof IModelClassRecord),
>(
  modelLike: ModelLike extends BeanModelMeta ? ((() => Constructable<ModelLike>) | Constructable<ModelLike>) : ModelLike,
  params?: T,
): Constructable<TypeDtoMutateResult<ModelLike, T>> {
  return _DtoMutate_raw(modelLike, params);
}

export function _DtoMutate_raw<
  T extends IDtoMutateParams<ModelLike>,
  ModelLike extends BeanModelMeta | (keyof IModelClassRecord),
  ColumnsOmitDefault extends TypeModelColumnsStrict<TypeModelOfModelLike<ModelLike>[TypeSymbolKeyEntity]> | undefined = undefined,
>(
  modelLike: ModelLike extends BeanModelMeta ? ((() => Constructable<ModelLike>) | Constructable<ModelLike>) : ModelLike,
  params?: T,
  columnsOmitDefault?: ColumnsOmitDefault,
): Constructable<TypeDtoMutateResult<ModelLike, T>> {
  // model
  const modelClass = prepareClassModel(modelLike);
  // entity
  let entityClass = getClassEntityFromClassModel(modelClass);
  // columns
  if (params?.columns) {
    entityClass = $Class.pick(entityClass, prepareColumns(params?.columns) as any);
  } else {
    entityClass = $Class.omit(entityClass, prepareColumns(columnsOmitDefault ?? ['iid', 'createdAt', 'updatedAt'] as any) as any);
  }
  // relations
  _DtoGet_relations(modelClass, entityClass, params as any);
  return entityClass as any;
}

function _DtoGet_relations<TRecord extends {}, TModel extends BeanModelMeta>(
  modelClass: Constructable<TModel>,
  entityClass: Constructable<TRecord>,
  includeWrapper?: IModelRelationIncludeWrapper,
) {
  // relations
  const relations = _DtoGet_relations_collection(modelClass, includeWrapper);
  if (!relations) return;
  for (const relation of relations) {
    _DtoGet_relation_handle(entityClass, relation);
  }
}

function _DtoGet_relation_handle<TRecord extends {}>(entityClass: Constructable<TRecord>, relation: [string, any, any, any, boolean]) {
  const [relationName, relationReal, includeReal, withReal, autoload] = relation;
  const { type, model, options } = relationReal;
  const modelTarget = prepareClassModel(model);
  const optionsReal = Object.assign({}, options, { include: includeReal, with: withReal });
  const schemaLazy = _DtoGet_relation_handle_schemaLazy(modelTarget, optionsReal, autoload);
  let schema;
  if ((type === 'hasOne' || type === 'belongsTo')) {
    schema = v.lazy(v.optional(), schemaLazy);
  } else {
    if (optionsReal.groups) {
      schema = v.array(v.lazy(schemaLazy));
    } else if (optionsReal.aggrs) {
      schema = v.lazy(v.optional(), schemaLazy);
    } else {
      schema = v.array(v.lazy(schemaLazy));
    }
  }
  Api.field(schema)(entityClass.prototype, relationName);
}

function _DtoGet_relation_handle_schemaLazy(modelTarget, optionsReal, autoload) {
  return () => {
    if (!autoload) {
      return _DtoGet_relation_handle_schemaLazy_raw(modelTarget, optionsReal);
    }
    // dynamic
    const entityClass = getClassEntityFromClassModel(modelTarget);
    const beanFullName = appResource.getBeanFullName(entityClass);
    const _hashkey = _DtoGet_relation_handle_schemaLazy_hashkey(optionsReal);
    const dynamicName = `${beanFullName}_${_hashkey}`;
    let entityTarget = getSchemaDynamic(dynamicName);
    if (!entityTarget) {
      entityTarget = _DtoGet_relation_handle_schemaLazy_raw(modelTarget, optionsReal);
      entityTarget[SymbolSchemaDynamicRefId] = dynamicName;
      addSchemaDynamic(dynamicName, entityTarget);
    }
    return entityTarget;
  };
}

function _DtoGet_relation_handle_schemaLazy_raw(modelTarget, optionsReal) {
  if (optionsReal.groups) {
    return DtoGroup(modelTarget, optionsReal.groups, optionsReal.aggrs, optionsReal.columns);
  } else if (optionsReal.aggrs) {
    return DtoAggregate(modelTarget, optionsReal.aggrs);
  } else {
    return _DtoGet_raw(modelTarget, optionsReal);
  }
}

function _DtoGet_relation_handle_schemaLazy_hashkey(optionsReal) {
  const columns = prepareColumns(optionsReal.columns);
  const aggrs = ensureArray(optionsReal.aggrs);
  const groups = ensureArray(optionsReal.groups);
  return (columns || aggrs || groups) ? hashkey({ columns, aggrs, groups }) : 'none';
}

function _DtoGet_relations_collection<TModel extends BeanModelMeta>(
  modelClass: Constructable<TModel>,
  includeWrapper?: IModelRelationIncludeWrapper,
) {
  const beanOptions = appResource.getBean(modelClass);
  const options: IDecoratorModelOptions = beanOptions!.options!;
  // collect
  const relations: [string, any, any, any, boolean][] = [];
  // include
  if (options.relations) {
    for (const key in options.relations) {
      const relationDef = options.relations[key];
      const relationCur: any = includeWrapper?.include?.[key];
      let relationReal;
      let includeReal;
      let withReal;
      let autoload;
      if (relationCur === false) {
        continue;
      } else if (relationCur === true) {
        relationReal = relationDef;
        autoload = relationDef.options?.autoload;
      } else if (typeof relationCur === 'object') {
        relationReal = deepExtend({}, relationDef, { options: relationCur });
        includeReal = relationCur.include;
        withReal = relationCur.with;
      } else if (relationDef.options?.autoload) {
        relationReal = relationDef;
        autoload = relationDef.options?.autoload;
      } else {
        continue;
      }
      relations.push([key, relationReal, includeReal, withReal, autoload]);
    }
  }
  // with
  if (includeWrapper?.with) {
    for (const key in includeWrapper.with) {
      const relationReal: any = includeWrapper.with[key];
      if (!relationReal) continue;
      relations.push([key, relationReal, relationReal.options?.include, relationReal.options?.with, false]);
    }
  }
  return relations;
}
