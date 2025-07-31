import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../../bean/bean.model/bean.model_meta.ts';
import type { IDtoAggrParams, TypeDtoAggrResult } from '../../types/dto/dtoAggregate.ts';
import type { IModelClassRecord } from '../../types/onion/model.ts';
import { ensureArray } from '@cabloy/utils';
import { Api, v } from 'vona-module-a-openapi';

export function DtoAggregate<
  T extends IDtoAggrParams<ModelLike>,
  ModelLike extends BeanModelMeta | (keyof IModelClassRecord),
>(
  modelLike: ModelLike extends BeanModelMeta ? ((() => Constructable<ModelLike>) | Constructable<ModelLike>) : ModelLike,
  params: T,
): Constructable<TypeDtoAggrResult<T>> {
  return _DtoAggregate_raw(modelLike, params);
}

function _DtoAggregate_raw<
  T extends IDtoAggrParams<ModelLike>,
  ModelLike extends BeanModelMeta | (keyof IModelClassRecord),
>(
  _modelLike: ModelLike extends BeanModelMeta ? ((() => Constructable<ModelLike>) | Constructable<ModelLike>) : ModelLike,
  params: T,
): Constructable<TypeDtoAggrResult<T>> {
  abstract class TargetClass {}
  const aggrs = params.aggrs;
  for (const key in aggrs) {
    const columns = ensureArray(aggrs[key]);
    if (!columns) continue;
    for (const column of columns) {
      const column2 = `${key}_${column === '*' ? 'all' : column}`;
      Api.field(v.optional(), v.bigNumber())(TargetClass.prototype, column2);
    }
  }
  return TargetClass as any;
}
