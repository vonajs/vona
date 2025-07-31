import type { BeanModelMeta } from '../../bean/bean.model/bean.model_meta.ts';
import type { TypeModelSelectAggrParamsAggrs } from '../modelAggr.ts';
import type { IModelClassRecord } from '../onion/model.ts';
import type { TypeModelOfModelLike, TypeSymbolKeyEntity } from '../relations.ts';
import type { TypeModelAggrRelationResult } from '../relationsAggr.ts';

export type IDtoAggrParams<
  ModelLike extends BeanModelMeta | (keyof IModelClassRecord),
> = IBuildDtoAggrParams<
  TypeModelOfModelLike<ModelLike>[TypeSymbolKeyEntity],
  TypeModelOfModelLike<ModelLike>
>;

export interface IBuildDtoAggrParams<
  TRecord,
  _Model extends BeanModelMeta,
> extends IBuildDtoAggrParamsBasic<TRecord> {}

export interface IBuildDtoAggrParamsBasic<TRecord> {
  aggrs: TypeModelSelectAggrParamsAggrs<TRecord>;
}

export type TypeDtoAggrResult<TOptions> = TypeModelAggrRelationResult<TOptions>;
