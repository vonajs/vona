import type { BeanModelMeta } from '../../bean/bean.model/bean.model_meta.ts';
import type { TypeModelSelectAggrParamsAggrs } from '../modelAggr.ts';
import type { IModelClassRecord } from '../onion/model.ts';
import type { TypeModelOfModelLike, TypeSymbolKeyEntity } from '../relations.ts';
import type { TypeModelAggrRelationResultAggrs } from '../relationsAggr.ts';

export interface IDtoAggrParamsAggrs<AggrCount = undefined, AggrSum = undefined> {
  count?: AggrCount;
  sum?: AggrSum;
}
export interface IDtoAggrParams<
  ModelLike extends BeanModelMeta | (keyof IModelClassRecord),
> {
  aggrs: TypeModelSelectAggrParamsAggrs<TypeModelOfModelLike<ModelLike>[TypeSymbolKeyEntity]>;
}

export type TypeDtoAggrResult<Aggrs> = TypeModelAggrRelationResultAggrs<Aggrs>;
