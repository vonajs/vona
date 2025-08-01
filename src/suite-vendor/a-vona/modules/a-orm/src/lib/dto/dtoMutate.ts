import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../../bean/bean.model/bean.model_meta.ts';
import type { IDtoMutateParams, TypeDtoMutateResult } from '../../types/dto/dtoMutate.ts';
import type { TypeModelColumnsStrict } from '../../types/modelWhere.ts';
import type { IModelClassRecord } from '../../types/onion/model.ts';
import type { TypeModelOfModelLike, TypeSymbolKeyEntity } from '../../types/relations.ts';
import { $Class } from 'vona';
import { getClassEntityFromClassModel, prepareClassModel, prepareColumns } from '../../common/utils.ts';
import { _DtoGet_relations } from './dtoGet.ts';

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
  _DtoGet_relations(modelClass, entityClass, params as any, true);
  return entityClass as any;
}
