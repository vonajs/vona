import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../../bean/bean.model/bean.model_meta.ts';
import type { IDtoMutateParams, TypeDtoMutateResult } from '../../types/dto/dtoMutate.ts';
import type { IModelClassRecord } from '../../types/onion/model.ts';
import { $Class } from 'vona';
import { _DtoMutate_raw } from './dtoMutate.ts';

export function DtoUpdate<
  T extends IDtoMutateParams<ModelLike>,
  ModelLike extends BeanModelMeta | (keyof IModelClassRecord),
>(
  modelLike: ModelLike extends BeanModelMeta ? ((() => Constructable<ModelLike>) | Constructable<ModelLike>) : ModelLike,
  params?: T,
): Constructable<Partial<TypeDtoMutateResult<ModelLike, T>>> {
  return $Class.partial(_DtoMutate_raw(modelLike, params, ['id', 'iid', 'deleted', 'createdAt', 'updatedAt'] as any));
}
