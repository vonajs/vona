import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../../bean/bean.model/bean.model_meta.ts';
import type { IModelClassRecord } from '../../types/onion/model.ts';

export function DtoGet<
  T extends IDtoAggrParams<ModelLike>,
  ModelLike extends BeanModelMeta | (keyof IModelClassRecord),
>(
  modelLike: ModelLike extends BeanModelMeta ? ((() => Constructable<ModelLike>) | Constructable<ModelLike>) : ModelLike,
  params?: T,
): Constructable<TypeDtoAggrResult<ModelLike, T>> {
  // return _DtoGet_raw(modelLike, params);
}
