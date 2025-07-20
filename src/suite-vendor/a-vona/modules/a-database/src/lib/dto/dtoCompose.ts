import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../../bean/bean.model/bean.model_meta.ts';
import type { IDtoComposeParams, TypeDtoComposeResult } from '../../types/dto.ts';
import type { IModelRelationIncludeWrapper } from '../../types/model.ts';
import type { IDecoratorModelOptions, IModelClassRecord } from '../../types/onion/model.ts';
import { $Class, appResource, deepExtend } from 'vona';
import { Api } from 'vona-module-a-openapi';
import z from 'zod';
import { prepareClassModel, prepareColumns } from '../../common/utils.ts';

export function DtoCompose<
  T extends IDtoComposeParams<ModelLike>,
  ModelLike extends BeanModelMeta | (keyof IModelClassRecord),
>(
  modelLike: ModelLike extends BeanModelMeta ? ((() => Constructable<ModelLike>) | Constructable<ModelLike>) : ModelLike,
  params?: T,
): Constructable<TypeDtoComposeResult<ModelLike, T>> {
  return _DtoCompose_raw(modelLike, params);
}

function _DtoCompose_raw<
  T extends IDtoComposeParams<ModelLike>,
  ModelLike extends BeanModelMeta | (keyof IModelClassRecord),
>(
  modelLike: ModelLike extends BeanModelMeta ? ((() => Constructable<ModelLike>) | Constructable<ModelLike>) : ModelLike,
  params?: T,
): Constructable<TypeDtoComposeResult<ModelLike, T>> {
  // model
  const modelClass = prepareClassModel(modelLike);
  // entity
  let entityClass = getClassEntityFromClassModel(modelClass);
  // columns
  const columns = prepareColumns(params?.columns);
  // always create a new class, no matter if columns empty
  entityClass = $Class.pick(entityClass, columns as any);
  // relations
  _DtoCompose_relations(modelClass, entityClass, params as any);
  return entityClass as any;
}

function _DtoCompose_relations<TRecord extends {}, TModel extends BeanModelMeta>(
  modelClass: Constructable<TModel>,
  entityClass: Constructable<TRecord>,
  includeWrapper?: IModelRelationIncludeWrapper,
) {
  // relations
  const relations = _DtoCompose_relations_collection(modelClass, includeWrapper);
  if (!relations) return;
  for (const relation of relations) {
    _DtoCompose_relation_handle(entityClass, relation);
  }
}

function _DtoCompose_relation_handle<TRecord extends {}>(entityClass: Constructable<TRecord>, relation: [string, any, any, any]) {
  const [relationName, relationReal, includeReal, withReal] = relation;
  const { type, modelMiddle, model, keyFrom, keyTo, key, options } = relationReal;
  const optionsReal = Object.assign({}, options, { include: includeReal, with: withReal });
  if (type === 'hasOne') {
    Api.field(z.number())(entityClass.prototype, relationName);
  } else if (type === 'belongsTo') {

  } else if (type === 'hasMany') {

  } else if (type === 'belongsToMany') {

  }
}

function _DtoCompose_relations_collection<TModel extends BeanModelMeta>(
  modelClass: Constructable<TModel>,
  includeWrapper?: IModelRelationIncludeWrapper,
) {
  const beanOptions = appResource.getBean(modelClass);
  const options: IDecoratorModelOptions = beanOptions!.options!;
  // collect
  const relations: [string, any, any, any][] = [];
  // include
  if (options.relations) {
    for (const key in options.relations) {
      const relationDef = options.relations[key];
      const relationCur: any = includeWrapper?.include?.[key];
      let relationReal;
      let includeReal;
      let withReal;
      if (relationCur === false) {
        continue;
      } else if (relationCur === true) {
        relationReal = relationDef;
      } else if (typeof relationCur === 'object') {
        relationReal = deepExtend({}, relationDef, { options: relationCur });
        includeReal = relationCur.include;
        withReal = relationCur.with;
      } else if (relationDef.options?.autoload) {
        relationReal = relationDef;
      } else {
        continue;
      }
      relations.push([key, relationReal, includeReal, withReal]);
    }
  }
  // with
  if (includeWrapper?.with) {
    for (const key in includeWrapper.with) {
      const relationReal: any = includeWrapper.with[key];
      if (!relationReal) continue;
      relations.push([key, relationReal, relationReal.options?.include, relationReal.options?.with]);
    }
  }
  return relations;
}

function getClassEntityFromClassModel<T>(modelClass: Constructable<T>) {
  const beanOptions = appResource.getBean(modelClass);
  const options: IDecoratorModelOptions = beanOptions!.options!;
  return options.entity!;
}
