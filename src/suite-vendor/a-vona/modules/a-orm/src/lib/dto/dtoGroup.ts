import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../../bean/bean.model/bean.model_meta.ts';
import type { TypeDtoAggrResult } from '../../types/dto/dtoAggregate.ts';
import type { TypeModelSelectAggrParamsAggrs } from '../../types/modelAggr.ts';
import type { IModelClassRecord } from '../../types/onion/model.ts';
import type { TypeModelOfModelLike, TypeSymbolKeyEntity } from '../../types/relations.ts';
import { ensureArray } from '@cabloy/utils';
import { Api, v } from 'vona-module-a-openapi';

export function DtoGroup<
  Aggrs extends TypeModelSelectAggrParamsAggrs<TypeModelOfModelLike<ModelLike>[TypeSymbolKeyEntity]>,
  ModelLike extends BeanModelMeta | (keyof IModelClassRecord),
>(
  modelLike: ModelLike extends BeanModelMeta ? ((() => Constructable<ModelLike>) | Constructable<ModelLike>) : ModelLike,
  aggrs: Aggrs,
): Constructable<TypeDtoAggrResult<Aggrs>> {
  return _DtoAggregate_raw(modelLike, aggrs);
}

function _DtoAggregate_raw<
  Aggrs extends TypeModelSelectAggrParamsAggrs<TypeModelOfModelLike<ModelLike>[TypeSymbolKeyEntity]>,
  ModelLike extends BeanModelMeta | (keyof IModelClassRecord),
>(
  _modelLike: ModelLike extends BeanModelMeta ? ((() => Constructable<ModelLike>) | Constructable<ModelLike>) : ModelLike,
  aggrs: Aggrs,
): Constructable<TypeDtoAggrResult<Aggrs>> {
  abstract class TargetClass {}
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
