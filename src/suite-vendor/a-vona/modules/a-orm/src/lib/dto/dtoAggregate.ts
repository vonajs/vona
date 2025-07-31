import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../../bean/bean.model/bean.model_meta.ts';
import type { IDtoComposeParams, TypeDtoComposeResult } from '../../types/dto.ts';
import type { IModelClassRecord } from '../../types/index.ts';

export function DtoAggregate<
  T extends IDtoComposeParams<ModelLike>,
  ModelLike extends BeanModelMeta | (keyof IModelClassRecord),
>(
  modelLike: ModelLike extends BeanModelMeta ? ((() => Constructable<ModelLike>) | Constructable<ModelLike>) : ModelLike,
  params?: T,
): Constructable<TypeDtoComposeResult<ModelLike, T>> {
  return _DtoGet_raw(modelLike, params);
}
