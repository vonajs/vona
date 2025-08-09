import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../../bean/bean.model/bean.model_meta.ts';
import type { IDtoMutateParams, TypeDtoMutateResult } from '../../types/dto/dtoMutate.ts';
import type { IModelClassRecord } from '../../types/onion/model.ts';
import { _DtoMutate_raw } from './dtoMutate.ts';

export function DtoUpdate<
  T extends IDtoMutateParams<ModelLike>,
  ModelLike extends BeanModelMeta | (keyof IModelClassRecord),
>(
  modelLike: ModelLike extends BeanModelMeta ? ((() => Constructable<ModelLike>) | Constructable<ModelLike>) : ModelLike,
  params?: T,
): Constructable<TypeDtoMutateResult<ModelLike, T, 'update', 'id' | 'iid' | 'deleted' | 'createdAt' | 'updatedAt', true>> {
  return _DtoMutate_raw(modelLike, params, 'update', ['id', 'iid', 'deleted', 'createdAt', 'updatedAt'] as any, true);
}

// not use Partial/$Class.partial, for form render at frontend
