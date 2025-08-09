import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../../bean/bean.model/bean.model_meta.ts';
import type { IDtoGetParams, TypeDtoGetResult } from '../../types/dto/dtoGet.ts';
import type { TypeDtoMutateType } from '../../types/dto/dtoMutate.ts';
import type { IModelRelationIncludeWrapper } from '../../types/model.ts';
import type { IDecoratorModelOptions, IModelClassRecord } from '../../types/onion/model.ts';
import { ensureArray, hashkey } from '@cabloy/utils';
import { $Class, appResource, deepExtend } from 'vona';
import { addSchemaDynamic, Api, getSchemaDynamic, SymbolSchemaDynamicRefId, v } from 'vona-module-a-openapi';
import { getClassEntityFromClassModel, prepareClassModel, prepareColumns } from '../../common/utils.ts';
import { DtoAggregate } from './dtoAggregate.ts';
import { DtoGroup } from './dtoGroup.ts';
import { _DtoMutate_raw } from './dtoMutate.ts';

export function DtoGet<
  T extends IDtoGetParams<ModelLike>,
  ModelLike extends BeanModelMeta | (keyof IModelClassRecord),
>(
  modelLike: ModelLike extends BeanModelMeta ? ((() => Constructable<ModelLike>) | Constructable<ModelLike>) : ModelLike,
  params?: T,
): Constructable<TypeDtoGetResult<ModelLike, T>> {
  return _DtoGet_raw(modelLike, params);
}

function _DtoGet_raw<
  T extends IDtoGetParams<ModelLike>,
  ModelLike extends BeanModelMeta | (keyof IModelClassRecord),
>(
  modelLike: ModelLike extends BeanModelMeta ? ((() => Constructable<ModelLike>) | Constructable<ModelLike>) : ModelLike,
  params?: T,
): Constructable<TypeDtoGetResult<ModelLike, T>> {
  // model
  const modelClass = prepareClassModel(modelLike);
  // entity
  let entityClass = getClassEntityFromClassModel(modelClass);
  // columns
  const columns = prepareColumns(params?.columns);
  // always create a new class, no matter if columns empty
  entityClass = $Class.pick(entityClass, columns as any);
  // relations
  _DtoGet_relations(modelClass, entityClass, params as any);
  return entityClass as any;
}

export function _DtoGet_relations<TRecord extends {}, TModel extends BeanModelMeta>(
  modelClass: Constructable<TModel>,
  entityClass: Constructable<TRecord>,
  includeWrapper?: IModelRelationIncludeWrapper,
  mutateTypeTopLevel?: TypeDtoMutateType,
) {
  // relations
  const relations = _DtoGet_relations_collection(modelClass, includeWrapper);
  if (!relations) return;
  for (const relation of relations) {
    _DtoGet_relation_handle(entityClass, relation, mutateTypeTopLevel);
  }
}

function _DtoGet_relation_handle<TRecord extends {}>(
  entityClass: Constructable<TRecord>,
  relation: [string, any, any, any, boolean],
  mutateTypeTopLevel?: TypeDtoMutateType,
) {
  const [relationName, relationReal, includeReal, withReal, autoload] = relation;
  const { type, model, options } = relationReal;
  const modelTarget = prepareClassModel(model);
  const optionsReal = Object.assign({}, options, { include: includeReal, with: withReal });
  const schemaLazy = _DtoGet_relation_handle_schemaLazy(modelTarget, optionsReal, autoload, mutateTypeTopLevel);
  if (mutateTypeTopLevel) {
    if(type==='belongsTo' || type==='belongsToMany'){
      // donot mutate
      return;
    }
    let schema;
    if ((type === 'hasOne' || type === 'belongsTo')) {
      schema = v.lazy(v.optional(), schemaLazy);
    } else {
      schema = v.array(v.lazy(schemaLazy));
    }
    Api.field(v.optional(), schema)(entityClass.prototype, relationName);
  } else {
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
}

function _DtoGet_relation_handle_schemaLazy(modelTarget, optionsReal, autoload, mutateTypeTopLevel?: TypeDtoMutateType) {
  return () => {
    if (!autoload) {
      return _DtoGet_relation_handle_schemaLazy_raw(modelTarget, optionsReal, mutateTypeTopLevel);
    }
    // dynamic
    const entityClass = getClassEntityFromClassModel(modelTarget);
    const beanFullName = appResource.getBeanFullName(entityClass);
    const _hashkey = _DtoGet_relation_handle_schemaLazy_hashkey(optionsReal, mutateTypeTopLevel);
    const dynamicName = `${beanFullName}_${_hashkey}`;
    let entityTarget = getSchemaDynamic(dynamicName);
    if (!entityTarget) {
      entityTarget = _DtoGet_relation_handle_schemaLazy_raw(modelTarget, optionsReal, mutateTypeTopLevel);
      entityTarget[SymbolSchemaDynamicRefId] = dynamicName;
      addSchemaDynamic(dynamicName, entityTarget);
    }
    return entityTarget;
  };
}

function _DtoGet_relation_handle_schemaLazy_raw(modelTarget, optionsReal, mutateTypeTopLevel?: TypeDtoMutateType) {
  if (mutateTypeTopLevel) {
    return _DtoMutate_raw(modelTarget, optionsReal, mutateTypeTopLevel, undefined, false); // columnsOmitDefault: undefined
  } else {
    if (optionsReal.groups) {
      return DtoGroup(modelTarget, optionsReal.groups, optionsReal.aggrs, optionsReal.columns);
    } else if (optionsReal.aggrs) {
      return DtoAggregate(modelTarget, optionsReal.aggrs);
    } else {
      return _DtoGet_raw(modelTarget, optionsReal);
    }
  }
}

function _DtoGet_relation_handle_schemaLazy_hashkey(optionsReal, mutateTypeTopLevel?: TypeDtoMutateType) {
  const columns = prepareColumns(optionsReal.columns);
  const aggrs = ensureArray(optionsReal.aggrs);
  const groups = ensureArray(optionsReal.groups);
  return (columns || aggrs || groups || mutateTypeTopLevel) ? hashkey({ columns, aggrs, groups, mutate: mutateTypeTopLevel }) : 'none';
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
